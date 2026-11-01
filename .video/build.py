"""Build the URAL Hajj/Umrah vertical reel.

Pipeline: AI stills -> Ken Burns motion -> brand typography (HarfBuzz-shaped
Bangla) -> ffmpeg encode with a Bangla voiceover and a synthesised ambient bed.
"""
import math
import os
import subprocess
import sys
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from textrender import ShapedFont

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, "work")
OUT = os.path.join(HERE, "out")
MASTER = os.path.join(HERE, "master")

W, H = 1080, 1920
FPS = 30
XFADE = 0.8

NAVY = (11, 20, 38)
GOLD = (246, 183, 60)
IVORY = (245, 241, 232)
EMERALD = (15, 74, 63)

FONTS = os.path.join(WORK, "fonts")


def prepare_fonts():
    """Materialise TTFs from the site's own WOFF2 files.

    Keeps the render honest: the video uses exactly the type the site ships,
    with no extra font downloads.
    """
    from fontTools.ttLib import TTFont

    src = "/home/user/URAL-Travel/public/fonts"
    os.makedirs(FONTS, exist_ok=True)
    mapping = {
        "bn600.ttf": "noto-sans-bengali-600-v1.woff2",
        "bn400.ttf": "noto-sans-bengali-400-v1.woff2",
        "serif.ttf": "source-serif-4-latin-v1.woff2",
        "inter600.ttf": "inter-600-v1.woff2",
        "inter700.ttf": "inter-700-v1.woff2",
    }
    for out, woff in mapping.items():
        dst = os.path.join(FONTS, out)
        if os.path.exists(dst):
            continue
        f = TTFont(os.path.join(src, woff))
        f.flavor = None
        f.save(dst)
    return FONTS


prepare_fonts()
BN = ShapedFont(os.path.join(FONTS, "bn600.ttf"))
SERIF = ShapedFont(os.path.join(FONTS, "serif.ttf"))
INTER7 = ShapedFont(os.path.join(FONTS, "inter700.ttf"))
INTER6 = ShapedFont(os.path.join(FONTS, "inter600.ttf"))

WORDS_PATH = "/home/user/URAL-Travel/brand-kit/png/wordmark-hero-ivory-transparent.png"


# ---------------------------------------------------------------- helpers

def ease_out(t):
    return 1 - (1 - t) ** 3


def clamp01(x):
    return max(0.0, min(1.0, x))


def ease_in_out(t):
    return t * t * (3 - 2 * t)


def text_line(font, text, size, color, tracking=0.0):
    return font.draw(text, size, color, tracking=tracking)


def vertical_scrim():
    """A feathered navy band exactly where the type sits.

    A plain bottom gradient had to be very heavy to beat the white marble and
    canopy umbrellas in the Madinah frame; this darkens 0.44-0.86 of the height
    and leaves the top and bottom of the shot clean.
    """
    g = Image.new("L", (1, H), 0)
    px = g.load()
    a0, a1 = H * 0.42, H * 0.52
    b0, b1 = H * 0.80, H * 0.94
    for y in range(H):
        if y < a0 or y > b1:
            v = 0.0
        elif y < a1:
            v = ease_in_out((y - a0) / (a1 - a0))
        elif y <= b0:
            v = 1.0
        else:
            v = 1.0 - ease_in_out((y - b0) / (b1 - b0))
        px[0, y] = int(255 * v * 0.76)
    g = g.resize((W, H))
    scrim = Image.new("RGBA", (W, H), NAVY + (0,))
    scrim.putalpha(g)
    return scrim


def top_scrim():
    g = Image.new("L", (1, H), 0)
    px = g.load()
    for y in range(int(H * 0.3)):
        px[0, y] = int(90 * (1 - y / (H * 0.3)) ** 2)
    g = g.resize((W, H))
    s = Image.new("RGBA", (W, H), (5, 10, 20, 0))
    s.putalpha(g)
    return s


def vignette():
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    cx, cy = W / 2, H / 2
    d = np.sqrt(((x - cx) / (W * 0.78)) ** 2 + ((y - cy) / (H * 0.78)) ** 2)
    a = np.clip((d - 0.55) / 0.75, 0, 1) ** 1.7 * 120
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[..., 0:3] = 6
    rgba[..., 3] = a.astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def gradient_lift(img):
    """Very light warm/contrast grade so the six stills sit in one palette."""
    arr = np.asarray(img).astype(np.float32)
    arr = (arr - 128.0) * 1.06 + 128.0
    arr[..., 0] *= 1.025
    arr[..., 2] *= 0.985
    # lift shadows toward navy instead of crushed black
    shadow = np.clip(1.0 - arr.mean(axis=2, keepdims=True) / 90.0, 0, 1) * 0.06
    arr = arr * (1 - shadow) + np.array(NAVY, dtype=np.float32) * shadow
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def cover_base(path):
    src = Image.open(path).convert("RGB")
    scale = (W * 1.20) / src.width
    base = src.resize((int(src.width * scale), int(src.height * scale)), Image.LANCZOS)
    if base.height < H * 1.20:
        scale = (H * 1.20) / src.height
        base = src.resize((int(src.width * scale), int(src.height * scale)), Image.LANCZOS)
    return base


# ---------------------------------------------------------------- scenes

SCENES = [
    dict(
        img="img1_kaaba.png", voice="vo1.wav", vo_pad=1.10, vo_delay=0.80,
        kicker=("হজ ও উমরাহ", GOLD),
        head=["পবিত্র ভূমির", "স্বপ্ন"],
        zoom=(1.00, 1.11), drift=(-0.10, 0.06),
        t_in=0.85,
    ),
    dict(
        img="img2_dua.png", voice="vo2.wav", vo_pad=1.00, vo_delay=0.75,
        head=["কিন্তু প্রশ্নটা", "একটাই"],
        bullets=["যাব কীভাবে?", "খরচ কত?", "প্রথমে কী করব?"],
        zoom=(1.13, 1.00), drift=(0.08, -0.05),
        t_in=0.55,
    ),
    dict(
        img="img5_plan.png", voice="vo3a.wav", vo_pad=0.95, vo_delay=0.75,
        kicker=("গাইড", GOLD),
        head=["হজ ও উমরাহর", "সম্পূর্ণ গাইড"],
        zoom=(1.00, 1.10), drift=(-0.07, 0.05),
        t_in=0.55,
    ),
    dict(
        img="img4_tawaf.png", voice="vo3b.wav", vo_pad=0.90, vo_delay=0.70,
        kicker=("ভিসা", GOLD),
        head=["চেকলিস্ট,", "ধাপে ধাপে"],
        zoom=(1.12, 1.01), drift=(0.06, 0.05),
        t_in=0.55,
    ),
    dict(
        img="img3_masjid.png", voice="vo3c.wav", vo_pad=0.95, vo_delay=0.70,
        kicker=("বাজেট", GOLD),
        head=["সব হিসাব", "টাকায়"],
        detail="ফ্লাইট · হোটেল · ভিসা · খাবার",
        zoom=(1.00, 1.12), drift=(-0.05, -0.04),
        t_in=0.55,
    ),
    dict(
        img="img6_dawn.png", voice="vo4.wav", vo_pad=1.85, vo_delay=0.95,
        zoom=(1.10, 1.00), drift=(0.05, 0.00), t_in=0.30, endcard=True,
    ),
]


def scene_duration(scene):
    d = vo_duration(scene["voice"])
    return d + scene["vo_pad"]


def vo_duration(name):
    path = os.path.join(WORK, name)
    with wave.open(path) as w:
        return w.getnframes() / w.getframerate()


def clean_alpha(im, floor=8):
    """Zero out near-transparent pixels.

    The brand wordmark PNG has alpha 1-7 in its "empty" area; any later blur
    turns that into a visible grey rectangle around the logo.
    """
    a = im.getchannel("A").point(lambda v: 0 if v < floor else v)
    out = im.copy()
    out.putalpha(a)
    return out


def build_layers(scene):
    """Pre-render every text element once: (RGBA, x, y, delay, kind)."""
    layers = []
    M = 96

    if scene.get("endcard"):
        mark = Image.open(WORDS_PATH).convert("RGBA")
        mw = 520
        mark = mark.resize((mw, int(mark.height * mw / mark.width)), Image.LANCZOS)
        mark = clean_alpha(mark)
        layers.append((mark, (W - mw) // 2, int(H * 0.285), 0.55, "logo"))

        rule_w = 132
        layers.append((gold_rule(rule_w), (W - rule_w) // 2, int(H * 0.285) + mark.height + 74, 0.95, "text"))

        bn = text_line(BN, "যাত্রার আগেই জেনে নিন", 62, IVORY + (255,))
        layers.append((bn, (W - bn.width) // 2, int(H * 0.285) + mark.height + 150, 1.15, "text"))

        url = text_line(INTER6, "uraltravel.co.uk", 46, GOLD + (255,), tracking=1.2)
        layers.append((url, (W - url.width) // 2, int(H * 0.285) + mark.height + 258, 1.45, "text"))

        tag = text_line(INTER6, "TRAVEL  INTELLIGENCE", 24, IVORY + (150,), tracking=5.5)
        layers.append((tag, (W - tag.width) // 2, int(H * 0.285) + mark.height + 336, 1.62, "text"))
        return layers

    y = int(H * 0.500)

    if scene.get("kicker"):
        txt, col = scene["kicker"]
        k = text_line(BN, txt, 40, col + (255,))
        layers.append((k, M, y, 0.0, "text"))
        bar = Image.new("RGBA", (54, 3), col + (255,))
        layers.append((bar, M, y - 26, 0.0, "text"))
        y += 82

    for line in scene.get("head", []):
        img = text_line(SERIF if is_latin(line) else BN, line, 92, IVORY + (255,))
        layers.append((img, M, y, 0.12 * len(layers), "text"))
        y += img.height + 18

    if scene.get("detail"):
        y += 8
        d = text_line(BN, scene["detail"], 40, IVORY + (205,))
        layers.append((d, M, y, 0.75, "text"))

    for i, b in enumerate(scene.get("bullets", [])):
        by = y + 18 + i * 96
        layers.append((gold_dot(14), M + 6, by + 40, 0.75 + i * 0.22, "text"))
        t = text_line(BN, b, 56, IVORY + (255,))
        layers.append((t, M + 48, by, 0.75 + i * 0.22, "text"))

    return layers


def is_latin(s):
    return all(ord(c) < 0x0980 or ord(c) > 0x09FF for c in s)


def gold_dot(d):
    im = Image.new("RGBA", (d, d), (0, 0, 0, 0))
    ImageDraw.Draw(im).ellipse((0, 0, d - 1, d - 1), fill=GOLD + (255,))
    return im


def gold_rule(w):
    im = Image.new("RGBA", (w, 3), GOLD + (255,))
    return im


# ---------------------------------------------------------------- frames

def floor_gradient():
    g = Image.new("L", (1, H), 0)
    px = g.load()
    for y in range(H):
        t = clamp01((y - H * 0.55) / (H * 0.45))
        px[0, y] = int(255 * (t ** 2.0) * 0.42)
    g = g.resize((W, H))
    f = Image.new("RGBA", (W, H), (5, 9, 18, 0))
    f.putalpha(g)
    return f


SCRIM = vertical_scrim()
FLOOR = floor_gradient()
TOP = top_scrim()
VIG = vignette()


def render_scene(scene, local_t, dur, layers, bases):
    base = bases[scene["img"]]
    z0, z1 = scene["zoom"]
    p = clamp01(local_t / dur)
    z = z0 + (z1 - z0) * ease_out(p) if z1 > z0 else z0 + (z1 - z0) * (p ** 1.6)
    dx0, dx1 = scene.get("drift", (0, 0))
    dx = dx0 + (dx1 - dx0) * p

    cw = base.width / z
    ch = cw * H / W
    cx = base.width / 2 + dx * (base.width - cw) / 2
    cy = base.height / 2
    x0 = min(max(0, cx - cw / 2), base.width - cw)
    y0 = min(max(0, cy - ch / 2), base.height - ch)

    frame = base.resize((W, H), Image.BILINEAR, box=(x0, y0, x0 + cw, y0 + ch))
    frame = gradient_lift(frame)

    if scene.get("endcard"):
        dark = Image.new("RGBA", (W, H), (5, 9, 18, 178))
        frame = Image.alpha_composite(frame.convert("RGBA"), dark).convert("RGB")
    frame = Image.alpha_composite(frame.convert("RGBA"), TOP)
    frame = Image.alpha_composite(frame, SCRIM)
    frame = Image.alpha_composite(frame, FLOOR)

    for img, x, y, delay, kind in layers:
        local = local_t - (scene["t_in"] + delay)
        if local <= 0:
            continue
        a = ease_out(clamp01(local / 0.62))
        # fade out in step with the dip to black
        out = clamp01((dur - local_t) / XFADE)
        a *= out
        if a <= 0.01:
            continue
        rise = int((1 - a) * 34)
        layer = img
        if a < 0.995:
            layer = img.copy()
            alpha = layer.getchannel("A").point(lambda v, k=a: int(v * k))
            layer.putalpha(alpha)
        if kind == "logo":
            shadow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
            shadow.putalpha(layer.getchannel("A").point(lambda v: int(v * 0.34)))
            shadow = shadow.filter(ImageFilter.GaussianBlur(16))
            frame.alpha_composite(shadow, (x, y + rise + 8))
        else:
            shadow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
            shadow.putalpha(layer.getchannel("A").point(lambda v: int(v * 0.55)))
            shadow = shadow.filter(ImageFilter.GaussianBlur(9))
            frame.alpha_composite(shadow, (x + 3, y + rise + 6))
            frame.alpha_composite(shadow, (x + 2, y + rise + 3))
        frame.alpha_composite(layer, (x, y + rise))

    frame = Image.alpha_composite(frame, VIG)

    # fine film grain, different every frame: helps the stills read as motion
    grain = np.random.default_rng(int(local_t * 1000) % 100000).integers(
        0, 255, (H // 2, W // 2), dtype=np.uint8)
    g = Image.fromarray(grain, "L").resize((W, H), Image.BILINEAR)
    g = g.convert("RGB")
    frame = Image.blend(frame.convert("RGB"), g, 0.022)
    return frame.convert("RGB")


def build_video():
    os.makedirs(MASTER, exist_ok=True)
    durations = [scene_duration(s) for s in SCENES]
    starts = []
    t = 0.0
    for d in durations:
        starts.append(t)
        t += d - XFADE
    total = t + XFADE

    bases = {s["img"]: cover_base(os.path.join(WORK, s["img"])) for s in SCENES}
    layers = [build_layers(s) for s in SCENES]

    print(f"total {total:.2f}s  scenes {[round(d,2) for d in durations]}", flush=True)

    ff = ffmpeg()
    cmd = [
        ff, "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-i", os.path.join(WORK, "audio_mix.wav"),
        "-c:v", "libx264", "-preset", "slow", "-crf", "18",
        "-pix_fmt", "yuv420p", "-profile:v", "high", "-tune", "film",
        "-c:a", "aac", "-b:a", "192k", "-shortest",
        "-movflags", "+faststart",
        os.path.join(MASTER, "ural-hajj-umrah-reel-9x16-master.mp4"),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL,
                            stderr=subprocess.PIPE)

    n_frames = int(round(total * FPS))
    for f in range(n_frames):
        gt = f / FPS
        active = [i for i, s in enumerate(starts) if s <= gt < s + durations[i]]
        if not active:
            active = [len(SCENES) - 1]
        if len(active) == 1:
            i = active[0]
            img = render_scene(SCENES[i], gt - starts[i], durations[i], layers[i], bases)
        else:
            # Dip to black rather than a straight dissolve: overlapping two
            # photographic stills reads as a double exposure and muddies the
            # type, and a fade through black suits the editorial tone.
            a_i, b_i = active[0], active[-1]
            w = clamp01((gt - starts[b_i]) / XFADE)
            if w < 0.5:
                i, k = a_i, 1.0 - ease_in_out(w / 0.5)
            else:
                i, k = b_i, ease_in_out((w - 0.5) / 0.5)
            img = render_scene(SCENES[i], gt - starts[i], durations[i], layers[i], bases)
            k = max(k, 0.02)
            img = Image.blend(Image.new("RGB", (W, H), (3, 6, 12)), img, k)

        # global fade from/to black
        if gt < 0.55:
            k = gt / 0.55
            img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, k)
        if total - gt < 0.85:
            k = clamp01((total - gt) / 0.85)
            img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, k)

        proc.stdin.write(img.tobytes())
        if f % 60 == 0:
            print(f"  frame {f}/{n_frames}", flush=True)

    proc.stdin.close()
    err = proc.stderr.read().decode()[-1500:]
    proc.wait()
    if proc.returncode != 0:
        print(err)
        sys.exit(1)
    print("video done")
    return starts, durations, total


def ffmpeg():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


# ---------------------------------------------------------------- audio

SR = 44100


def load_wav_mono(path):
    ff = ffmpeg()
    raw = subprocess.run(
        [ff, "-v", "quiet", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
        capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def ambient_bed(total):
    """Slow evolving pad: D minor add9, sines only, so nothing is harsh."""
    n = int(total * SR)
    t = np.arange(n) / SR
    notes = [73.42, 110.00, 146.83, 220.00, 293.66, 329.63]
    amps = [0.55, 0.34, 0.28, 0.17, 0.10, 0.07]
    out = np.zeros(n, dtype=np.float64)
    for f, a in zip(notes, amps):
        for det in (-0.12, 0.12):
            lfo = 0.62 + 0.38 * np.sin(2 * np.pi * (0.035 + 0.01 * a) * t + f)
            out += a * lfo * np.sin(2 * np.pi * (f + det) * t)
            out += a * 0.30 * lfo * np.sin(2 * np.pi * 2 * (f + det) * t)
    # gentle swell around the feature section, quiet under the CTA
    swell = 0.72 + 0.28 * np.sin(2 * np.pi * t / (total * 1.6) - 1.1)
    out *= swell
    out /= np.abs(out).max()
    out *= 0.085
    fade = int(1.5 * SR)
    out[:fade] *= np.linspace(0, 1, fade) ** 1.6
    out[-int(3.0 * SR):] *= np.linspace(1, 0, int(3.0 * SR)) ** 1.3
    return out.astype(np.float32)


def build_audio(starts, total):
    n = int(total * SR)
    vo_track = np.zeros(n, dtype=np.float32)
    for scene, start in zip(SCENES, starts):
        clip = load_wav_mono(os.path.join(WORK, scene["voice"]))
        peak = np.abs(clip).max()
        clip = clip / peak * 0.92
        # tiny 25ms ramp so the clip never clicks
        r = int(0.025 * SR)
        clip[:r] *= np.linspace(0, 1, r)
        clip[-r:] *= np.linspace(1, 0, r)
        at = int((start + scene["vo_delay"]) * SR)
        end = min(n, at + len(clip))
        vo_track[at:end] += clip[: end - at]

    bed = ambient_bed(total)
    mix = vo_track + bed[:n] * (1.0 - np.clip(vo_track, 0, 1) * 0.0)
    mix = np.tanh(mix * 1.05) * 0.95
    stereo = np.stack([mix, mix], axis=1)
    pcm = (stereo * 32767).astype(np.int16)
    path = os.path.join(WORK, "audio_mix.wav")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print("audio done", path)


if __name__ == "__main__":
    durations = [scene_duration(s) for s in SCENES]
    starts, t = [], 0.0
    for d in durations:
        starts.append(t)
        t += d - XFADE
    total = t + XFADE
    build_audio(starts, total)
    build_video()
