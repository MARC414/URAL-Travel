"""Build the URAL Hajj/Umrah vertical reel.

Pipeline: stills -> Ken Burns motion -> brand typography (HarfBuzz-shaped
Bangla) -> ffmpeg encode with a Bangla voiceover and a synthesised ambient bed.

Two versions share this code, selected with --program:

  photo  Photoreal, cinematic imagery. This is the cut commissioned as the
         primary reel. The frames are AI-generated, not documentary
         photographs of real pilgrims -- see docs/03-social/video/README.md.
  art    Flat illustrated artwork, no identifiable people, for placements
         where photoreal imagery of pilgrims would be inappropriate.
"""
import argparse
import os
import subprocess
import sys
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

from textrender import ShapedFont

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, "work")
MASTER = os.path.join(HERE, "master")

W, H = 1080, 1920
FPS = 30
XFADE = 0.8
TARGET = 60.0

NAVY = (11, 20, 38)
GOLD = (246, 183, 60)
IVORY = (245, 241, 232)
EMERALD = (15, 74, 63)

FONTS = os.path.join(WORK, "fonts")
WORDS_PATH = "/home/user/URAL-Travel/brand-kit/png/wordmark-hero-ivory-transparent.png"


def prepare_fonts():
    """Materialise TTFs from the site's own WOFF2 files."""
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
INTER6 = ShapedFont(os.path.join(FONTS, "inter600.ttf"))


# ---------------------------------------------------------------- programs

PHOTO = [
    dict(img="img1_kaaba.png", voice="vo1.wav", vo_pad=0.85, hold=1.7,
         kicker=("হজ ও উমরাহ", GOLD), head=["পবিত্র ভূমির", "স্বপ্ন"],
         zoom=(1.00, 1.10), drift=(-0.10, 0.05), t_in=0.95),
    dict(img="img2_dua.png", voice="vo2.wav", vo_pad=0.80, hold=1.4,
         head=["কিন্তু প্রশ্নটা", "একটাই"],
         bullets=["যাব কীভাবে?", "খরচ কত?", "প্রথমে কী করব?"],
         zoom=(1.12, 1.00), drift=(0.08, -0.05), t_in=0.60),
    dict(img="img7_mina.png", voice="vo5.wav", vo_pad=0.80, hold=1.4,
         kicker=("ধাপে ধাপে", GOLD), head=["মিনা · আরাফাহ", "মুজদালিফা"],
         detail="প্রতিটি ধাপের প্রস্তুতি",
         zoom=(1.00, 1.11), drift=(-0.07, 0.04), t_in=0.60),
    dict(img="img8_ihram.png", voice="vo6.wav", vo_pad=0.80, hold=1.4,
         kicker=("ইহরাম", GOLD), head=["মিকাত থেকে", "তালবিয়া"],
         detail="কোথায় কী করবেন, পরিষ্কার করে",
         zoom=(1.11, 1.00), drift=(0.06, 0.04), t_in=0.60),
    dict(img="img10_documents.png", voice="vo3b.wav", vo_pad=0.75, hold=2.0,
         kicker=("ভিসা", GOLD), head=["চেকলিস্ট,", "ধাপে ধাপে"],
         zoom=(1.00, 1.13), drift=(-0.05, 0.05), t_in=0.55),
    dict(img="img5_plan.png", voice="vo3c.wav", vo_pad=0.75, hold=1.2,
         kicker=("বাজেট", GOLD), head=["সব হিসাব", "টাকায়"],
         detail="ফ্লাইট · হোটেল · ভিসা · খাবার",
         zoom=(1.12, 1.00), drift=(0.05, -0.04), t_in=0.55),
    dict(img="img9_elderly.png", voice="vo7.wav", vo_pad=0.80, hold=1.2,
         kicker=("সবার জন্য", GOLD), head=["নারী, বয়স্ক", "প্রথম যাত্রী"],
         detail="আলাদা আলাদা গাইড",
         zoom=(1.00, 1.10), drift=(-0.06, 0.04), t_in=0.60),
    dict(img="img4_tawaf.png", voice="vo3a.wav", vo_pad=0.80, hold=1.6,
         kicker=("গাইড", GOLD), head=["হজ ও উমরাহর", "বিস্তারিত গাইড"],
         zoom=(1.10, 1.00), drift=(0.04, 0.03), t_in=0.60),
    dict(img="img3_masjid.png", voice=None, vo_pad=0.70, hold=4.5,
         kicker=("মদিনা", GOLD), head=["মসজিদে নববীতে", "শান্তি"],
         zoom=(1.00, 1.10), drift=(-0.05, 0.03), t_in=0.80),
    dict(img="img6_dawn.png", voice="vo4.wav", vo_pad=1.00, hold=2.4,
         zoom=(1.08, 1.00), drift=(0.04, 0.00), t_in=0.30, endcard=True),
]

ART = [
    dict(img="art_kaaba.png", voice="vo1.wav", vo_pad=0.85, hold=1.7,
         kicker=("হজ ও উমরাহ", GOLD), head=["পবিত্র ভূমির", "স্বপ্ন"],
         zoom=(1.00, 1.10), drift=(-0.10, 0.05), t_in=0.95),
    dict(img="art_lantern.png", voice="vo2.wav", vo_pad=0.80, hold=1.4,
         head=["কিন্তু প্রশ্নটা", "একটাই"],
         bullets=["যাব কীভাবে?", "খরচ কত?", "প্রথমে কী করব?"],
         zoom=(1.12, 1.00), drift=(0.08, -0.05), t_in=0.60),
    dict(img="art_mina.png", voice="vo5.wav", vo_pad=0.80, hold=1.0,
         kicker=("ধাপে ধাপে", GOLD), head=["মিনা · আরাফাহ", "মুজদালিফা"],
         detail="প্রতিটি ধাপের প্রস্তুতি",
         zoom=(1.00, 1.11), drift=(-0.07, 0.04), t_in=0.60),
    dict(img="art_ihram.png", voice="vo6.wav", vo_pad=0.80, hold=1.0,
         kicker=("ইহরাম", GOLD), head=["মিকাত থেকে", "তালবিয়া"],
         detail="কোথায় কী করবেন, পরিষ্কার করে",
         zoom=(1.11, 1.00), drift=(0.06, 0.04), t_in=0.60),
    dict(img="art_documents.png", voice="vo3b.wav", vo_pad=0.75, hold=2.0,
         kicker=("ভিসা", GOLD), head=["চেকলিস্ট,", "ধাপে ধাপে"],
         zoom=(1.00, 1.13), drift=(-0.05, 0.05), t_in=0.55),
    dict(img="art_budget.png", voice="vo3c.wav", vo_pad=0.75, hold=1.2,
         kicker=("বাজেট", GOLD), head=["সব হিসাব", "টাকায়"],
         detail="ফ্লাইট · হোটেল · ভিসা · খাবার",
         zoom=(1.12, 1.00), drift=(0.05, -0.04), t_in=0.55),
    dict(img="art_care.png", voice="vo7.wav", vo_pad=0.80, hold=1.2,
         kicker=("সবার জন্য", GOLD), head=["নারী, বয়স্ক", "প্রথম যাত্রী"],
         detail="আলাদা আলাদা গাইড",
         zoom=(1.00, 1.10), drift=(-0.06, 0.04), t_in=0.60),
    dict(img="art_crescent.png", voice="vo3a.wav", vo_pad=0.80, hold=3.2,
         kicker=("গাইড", GOLD), head=["হজ ও উমরাহর", "বিস্তারিত গাইড"],
         zoom=(1.10, 1.00), drift=(0.04, 0.03), t_in=0.60),
    dict(img="art_dawn.png", voice="vo4.wav", vo_pad=1.00, hold=2.6,
         zoom=(1.08, 1.00), drift=(0.04, 0.00), t_in=0.30, endcard=True),
]

PROGRAMS = {
    "photo": dict(scenes=PHOTO, slug="ural-hajj-umrah-reel-9x16-photo",
                  scrim=(0.76, 0.82, 0.90), grain=0.022, grade=True),
    "art": dict(scenes=ART, slug="ural-hajj-umrah-reel-9x16",
                scrim=(0.76, 0.82, 0.88), grain=0.014, grade=False),
}


# ---------------------------------------------------------------- helpers

def clamp01(x):
    return max(0.0, min(1.0, x))


def ease_out(t):
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    return t * t * (3 - 2 * t)


def vo_duration(name):
    if not name:
        return 0.0
    with wave.open(os.path.join(WORK, name)) as w:
        return w.getnframes() / w.getframerate()


def scene_durations(prog):
    """Voiceover length drives each shot; the last shot absorbs the slack so the
    piece lands on TARGET to the frame. If that would squeeze the closing
    voiceover, the slack is taken proportionally from the other shots instead."""
    scenes = prog["scenes"]
    durs = [vo_duration(s["voice"]) + s["vo_pad"] + s["hold"] for s in scenes]
    total = sum(durs) - XFADE * (len(durs) - 1)
    diff = TARGET - total
    min_last = vo_duration(scenes[-1]["voice"]) + 1.0

    if durs[-1] + diff >= min_last:
        durs[-1] += diff
    else:
        others = sum(durs[:-1])
        durs[-1] = min_last
        scale = (TARGET + XFADE * (len(durs) - 1) - min_last) / others
        for i in range(len(durs) - 1):
            need = vo_duration(scenes[i]["voice"]) + scenes[i]["vo_pad"]
            durs[i] = max(durs[i] * scale, need + 0.35)
            if durs[i] < durs[i - 1] * 0 + 0:
                pass
        # one corrective pass so rounding cannot drift the total
        slack = TARGET + XFADE * (len(durs) - 1) - (sum(durs[:-1]) + durs[-1])
        durs[-1] += slack
    return durs


def cover_base(path):
    src = Image.open(path).convert("RGB")
    scale = (W * 1.20) / src.width
    base = src.resize((int(src.width * scale), int(src.height * scale)), Image.LANCZOS)
    if base.height < H * 1.20:
        scale = (H * 1.20) / src.height
        base = src.resize((int(src.width * scale), int(src.height * scale)), Image.LANCZOS)
    return base


def band_luma(base):
    x0 = int(base.width * 0.15)
    y0 = int(base.height * 0.55)
    y1 = int(base.height * 0.80)
    crop = base.crop((x0, y0, base.width - x0, y1)).convert("L")
    return float(np.asarray(crop, dtype=np.float32).mean())


_scrim_cache = {}


def vertical_scrim(alpha):
    key = round(alpha, 2)
    if key in _scrim_cache:
        return _scrim_cache[key]
    g = Image.new("L", (1, H), 0)
    px = g.load()
    a0, a1 = H * 0.33, H * 0.60
    b0, b1 = H * 0.82, H * 0.97
    for y in range(H):
        if y < a0 or y > b1:
            v = 0.0
        elif y < a1:
            v = 0.5 - 0.5 * np.cos(np.pi * (y - a0) / (a1 - a0))
        elif y <= b0:
            v = 1.0
        else:
            v = 0.5 + 0.5 * np.cos(np.pi * (y - b0) / (b1 - b0))
        px[0, y] = int(255 * v * key)
    g = g.resize((W, H))
    scrim = Image.new("RGBA", (W, H), NAVY + (0,))
    scrim.putalpha(g)
    _scrim_cache[key] = scrim
    return scrim


def floor_gradient():
    g = Image.new("L", (1, H), 0)
    px = g.load()
    for y in range(H):
        t = clamp01((y - H * 0.55) / (H * 0.45))
        px[0, y] = int(255 * (t ** 2.0) * 0.40)
    g = g.resize((W, H))
    f = Image.new("RGBA", (W, H), (5, 9, 18, 0))
    f.putalpha(g)
    return f


def top_scrim():
    g = Image.new("L", (1, H), 0)
    px = g.load()
    for y in range(int(H * 0.28)):
        px[0, y] = int(78 * (1 - y / (H * 0.28)) ** 2)
    g = g.resize((W, H))
    s = Image.new("RGBA", (W, H), (5, 10, 20, 0))
    s.putalpha(g)
    return s


def vignette():
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((x - W / 2) / (W * 0.80)) ** 2 + ((y - H / 2) / (H * 0.80)) ** 2)
    a = np.clip((d - 0.58) / 0.72, 0, 1) ** 1.7 * 104
    rgba = np.zeros((H, W, 4), dtype=np.uint8)
    rgba[..., 0:3] = 6
    rgba[..., 3] = a.astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


TOP = top_scrim()
VIG = vignette()
FLOOR = floor_gradient()


def text_line(font, text, size, color, tracking=0.0):
    return font.draw(text, size, color, tracking=tracking)


def clean_alpha(im, floor=8):
    a = im.getchannel("A").point(lambda v: 0 if v < floor else v)
    out = im.copy()
    out.putalpha(a)
    return out


def is_latin(s):
    return all(ord(c) < 0x0980 or ord(c) > 0x09FF for c in s)


def gold_dot(d):
    im = Image.new("RGBA", (d, d), (0, 0, 0, 0))
    ImageDraw.Draw(im).ellipse((0, 0, d - 1, d - 1), fill=GOLD + (255,))
    return im


def gold_rule(w):
    return Image.new("RGBA", (w, 3), GOLD + (255,))


def build_layers(scene):
    layers = []
    M = 96

    if scene.get("endcard"):
        mark = clean_alpha(Image.open(WORDS_PATH).convert("RGBA"))
        mw = 500
        mark = mark.resize((mw, int(mark.height * mw / mark.width)), Image.LANCZOS)
        top = int(H * 0.255)
        layers.append((mark, (W - mw) // 2, top, 0.55, "logo"))
        layers.append((gold_rule(132), (W - 132) // 2, top + mark.height + 78, 0.95, "text"))
        bn = text_line(BN, "যাত্রার আগেই জেনে নিন", 62, IVORY + (255,))
        layers.append((bn, (W - bn.width) // 2, top + mark.height + 152, 1.15, "text"))
        url = text_line(INTER6, "uraltravel.co.uk", 46, GOLD + (255,), tracking=1.2)
        layers.append((url, (W - url.width) // 2, top + mark.height + 258, 1.45, "text"))
        tag = text_line(INTER6, "TRAVEL  INTELLIGENCE", 24, IVORY + (150,), tracking=5.5)
        layers.append((tag, (W - tag.width) // 2, top + mark.height + 334, 1.62, "text"))
        return layers

    y = int(H * 0.500)

    if scene.get("kicker"):
        txt, col = scene["kicker"]
        k = text_line(BN, txt, 40, col + (255,))
        layers.append((k, M, y, 0.0, "text"))
        layers.append((Image.new("RGBA", (54, 3), col + (255,)), M, y - 26, 0.0, "text"))
        y += 82

    for i, line in enumerate(scene.get("head", [])):
        img = text_line(SERIF if is_latin(line) else BN, line, 92, IVORY + (255,))
        layers.append((img, M, y, 0.12 * i, "text"))
        y += img.height + 18

    if scene.get("detail"):
        y += 10
        d = text_line(BN, scene["detail"], 40, IVORY + (205,))
        layers.append((d, M, y, 0.72, "text"))

    for i, b in enumerate(scene.get("bullets", [])):
        by = y + 18 + i * 96
        layers.append((gold_dot(14), M + 6, by + 40, 0.75 + i * 0.22, "text"))
        t = text_line(BN, b, 56, IVORY + (255,))
        layers.append((t, M + 48, by, 0.75 + i * 0.22, "text"))

    return layers


# ---------------------------------------------------------------- frames

def grade(img):
    """Warm, slightly contrasty grade that pulls the photographic stills into
    one palette and around the navy/gold brand colours."""
    arr = np.asarray(img).astype(np.float32)
    arr = (arr - 128.0) * 1.045 + 128.0
    arr[..., 0] *= 1.022
    arr[..., 2] *= 0.985
    shadow = np.clip(1.0 - arr.mean(axis=2, keepdims=True) / 90.0, 0, 1) * 0.05
    arr = arr * (1 - shadow) + np.array(NAVY, dtype=np.float32) * shadow
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def render_scene(scene, local_t, dur, layers, bases, scrim, prog):
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
    if prog["grade"]:
        frame = grade(frame)
    frame = frame.convert("RGBA")

    if scene.get("endcard"):
        frame = Image.alpha_composite(frame, Image.new("RGBA", (W, H), (5, 9, 18, 168)))
    frame = Image.alpha_composite(frame, TOP)
    frame = Image.alpha_composite(frame, scrim)
    frame = Image.alpha_composite(frame, FLOOR)

    for img, x, y, delay, kind in layers:
        local = local_t - (scene["t_in"] + delay)
        if local <= 0:
            continue
        a = ease_out(clamp01(local / 0.62))
        a *= clamp01((dur - local_t) / XFADE)   # leave with the dip to black
        if a <= 0.01:
            continue
        rise = int((1 - a) * 34)
        layer = img
        if a < 0.995:
            layer = img.copy()
            layer.putalpha(img.getchannel("A").point(lambda v, k=a: int(v * k)))
        if kind == "logo":
            shadow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
            shadow.putalpha(layer.getchannel("A").point(lambda v: int(v * 0.34)))
            frame.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(16)), (x, y + rise + 8))
        else:
            shadow = Image.new("RGBA", layer.size, (0, 0, 0, 0))
            shadow.putalpha(layer.getchannel("A").point(lambda v: int(v * 0.55)))
            shadow = shadow.filter(ImageFilter.GaussianBlur(9))
            frame.alpha_composite(shadow, (x + 3, y + rise + 6))
            frame.alpha_composite(shadow, (x + 2, y + rise + 3))
        frame.alpha_composite(layer, (x, y + rise))

    frame = Image.alpha_composite(frame, VIG)

    grain = np.random.default_rng(int(local_t * 1000) % 100000).integers(
        0, 255, (H // 2, W // 2), dtype=np.uint8)
    g = Image.fromarray(grain, "L").resize((W, H), Image.BILINEAR).convert("RGB")
    return Image.blend(frame.convert("RGB"), g, prog["grain"])


def ffmpeg():
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def schedule(prog):
    durations = scene_durations(prog)
    starts, t = [], 0.0
    for d in durations:
        starts.append(t)
        t += d - XFADE
    return starts, durations, t + XFADE


def build_audio(prog, starts, total):
    SR = 44100
    n = int(total * SR)
    vo = np.zeros(n, dtype=np.float32)
    for scene, start in zip(prog["scenes"], starts):
        if not scene["voice"]:
            continue
        path = os.path.join(WORK, scene["voice"])
        raw = subprocess.run([ffmpeg(), "-v", "quiet", "-i", path, "-f", "f32le",
                              "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
        clip = np.frombuffer(raw, dtype=np.float32)
        clip = clip / np.abs(clip).max() * 0.92
        r = int(0.025 * SR)
        clip[:r] *= np.linspace(0, 1, r)
        clip[-r:] *= np.linspace(1, 0, r)
        at = int((start + 0.75) * SR)
        end = min(n, at + len(clip))
        vo[at:end] += clip[: end - at]

    # duck the pad under speech so the Bangla stays forward on phone speakers
    env = np.abs(vo)
    kernel = np.ones(int(0.25 * SR), dtype=np.float32) / int(0.25 * SR)
    env = np.convolve(env, kernel, mode="same")
    duck = 1.0 - np.clip(env * 2.2, 0, 1) * 0.34
    mix = vo + ambient_bed(total)[:n] * duck
    mix = np.tanh(mix * 1.05) * 0.95
    pcm = (np.stack([mix, mix], axis=1) * 32767).astype(np.int16)
    path = os.path.join(WORK, "audio_mix.wav")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print("audio done", path)


def ambient_bed(total, SR=44100):
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
    # Level by RMS, not peak: a peak-normalised pad carries almost no energy
    # and disappears between lines.
    out /= np.sqrt((out ** 2).mean())
    out *= 10 ** (-27 / 20)
    out *= 1.0 + 0.15 * np.sin(2 * np.pi * t / (total * 1.8) - 1.1)
    fade = int(1.2 * SR)
    out[:fade] *= np.linspace(0, 1, fade) ** 1.4
    out[-int(3.0 * SR):] *= np.linspace(1, 0, int(3.0 * SR)) ** 1.3
    return out.astype(np.float32)


def build_video(prog, starts, durations, total):
    os.makedirs(MASTER, exist_ok=True)
    scenes = prog["scenes"]
    bases = {s["img"]: cover_base(os.path.join(WORK, s["img"])) for s in scenes}
    layers = [build_layers(s) for s in scenes]

    scrims = {}
    lo, mid, hi = prog["scrim"]
    for s in scenes:
        luma = band_luma(bases[s["img"]])
        alpha = lo if luma < 85 else mid if luma < 120 else hi
        scrims[s["img"]] = vertical_scrim(alpha)
        print(f"  {s['img']}: band luma {luma:.0f} -> scrim {alpha}", flush=True)

    out_path = os.path.join(MASTER, f"{prog['slug']}-master.mp4")
    cmd = [
        ffmpeg(), "-y", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-i", os.path.join(WORK, "audio_mix.wav"),
        "-c:v", "libx264", "-preset", "slow", "-crf", "18",
        "-pix_fmt", "yuv420p", "-profile:v", "high", "-tune", "film",
        "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
        out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL,
                            stderr=subprocess.PIPE)

    n_frames = int(round(total * FPS))
    for f in range(n_frames):
        gt = f / FPS
        active = [i for i, s in enumerate(starts) if s <= gt < s + durations[i]]
        if not active:
            active = [len(scenes) - 1]
        if len(active) == 1:
            i = active[0]
            img = render_scene(scenes[i], gt - starts[i], durations[i], layers[i],
                               bases, scrims[scenes[i]["img"]], prog)
        else:
            # Dip to black rather than a dissolve: overlapping two stills reads
            # as a double exposure and muddies the type.
            a_i, b_i = active[0], active[-1]
            w = clamp01((gt - starts[b_i]) / XFADE)
            if w < 0.5:
                i, k = a_i, 1.0 - ease_in_out(w / 0.5)
            else:
                i, k = b_i, ease_in_out((w - 0.5) / 0.5)
            img = render_scene(scenes[i], gt - starts[i], durations[i], layers[i],
                               bases, scrims[scenes[i]["img"]], prog)
            img = Image.blend(Image.new("RGB", (W, H), (3, 6, 12)), img, max(k, 0.02))

        if gt < 0.55:
            img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img, gt / 0.55)
        if total - gt < 0.85:
            img = Image.blend(Image.new("RGB", (W, H), (0, 0, 0)), img,
                              clamp01((total - gt) / 0.85))

        proc.stdin.write(img.tobytes())
        if f % 120 == 0:
            print(f"  frame {f}/{n_frames}", flush=True)

    proc.stdin.close()
    err = proc.stderr.read().decode()[-1500:]
    proc.wait()
    if proc.returncode != 0:
        print(err)
        sys.exit(1)
    print("video done ->", out_path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--program", choices=sorted(PROGRAMS), default="photo")
    args = ap.parse_args()
    prog = PROGRAMS[args.program]

    starts, durations, total = schedule(prog)
    print(f"[{args.program}] total {total:.2f}s  scenes {[round(d, 2) for d in durations]}",
          flush=True)
    build_audio(prog, starts, total)
    build_video(prog, starts, durations, total)


if __name__ == "__main__":
    main()
