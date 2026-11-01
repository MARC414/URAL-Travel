# URAL Hajj & Umrah reel — 9:16, 29s

A Bangla-first vertical short for the pilgrimage audience described in
[PRODUCT.md](../../../PRODUCT.md): a first-time traveller asking *can I go, what
does it cost in taka, and what do I do first?*

## Files

| File | Use |
| --- | --- |
| `ural-hajj-umrah-reel-9x16-share.mp4` | Publish this one. 7 MB, uploads cleanly to Reels / TikTok / Shorts / Facebook. |
| `ural-hajj-umrah-reel-poster.jpg` | Cover frame (1080×1920) for the grid thumbnail. |

The full-bitrate master (~28 MB, CRF 18) is a build artifact and is not
committed; `python3 .video/build.py` regenerates it into `.video/master/`.

## Specs

| | |
| --- | --- |
| Frame | 1080×1920 (9:16), 30 fps, H.264 High, yuv420p, faststart |
| Cuts | Dip to black, 0.8 s |
| Length | 28.9 s |
| Audio | AAC 128 kbps stereo — Bangla voiceover + synthesised ambient bed |
| Safe zones | All type sits between 42% and 94% of height, inside the Reels/TikTok UI margins |

## Edit decision list

| Time | Visual | On screen | Voiceover |
| --- | --- | --- | --- |
| 0.0–5.7 | Kaaba at blue hour, slow push in | হজ ও উমরাহ / পবিত্র ভূমির স্বপ্ন | প্রতি বছর হাজারো মানুষ পবিত্র ভূমির স্বপ্ন দেখেন। |
| 4.9–12.0 | Hands raised in dua, pull back | কিন্তু প্রশ্নটা একটাই · যাব কীভাবে? / খরচ কত? / প্রথমে কী করব? | কিন্তু প্রশ্নটা একটাই — যাব কীভাবে, খরচ কত, আর প্রথমে কী করব? |
| 11.2–16.2 | Passport, taka notes, planning desk | গাইড / হজ ও উমরাহর সম্পূর্ণ গাইড | উড়াল-এ পাবেন হজ ও উমরাহর বিস্তারিত গাইড। |
| 15.4–18.9 | Overhead tawaf, counter-zoom | ভিসা / চেকলিস্ট, ধাপে ধাপে | ধাপে ধাপে ভিসা চেকলিস্ট। |
| 18.1–22.5 | Masjid an-Nabawi at golden hour | বাজেট / সব হিসাব টাকায় · ফ্লাইট · হোটেল · ভিসা · খাবার | আর বাজেট ক্যালকুলেটর, সব হিসাব টাকায়। |
| 21.7–28.9 | Makkah skyline at dawn, end card | URAL wordmark · যাত্রার আগেই জেনে নিন · uraltravel.co.uk | যাত্রার আগেই জেনে নিন। উড়াল — আপনার ভ্রমণবুদ্ধি, বাংলায়। |

## Why the copy carries no numbers

The reel deliberately names no price, no visa fee and no processing time. Those
figures change and are maintained on the site; a video that quotes them becomes
wrong silently and gets reshared long after the page has been corrected. The
reel's job is to raise the question — the BDT answer lives on
`uraltravel.co.uk`, which is the only call to action in the piece.

## Production notes

- Every still is AI-generated for URAL. No stock licence, no third-party credit.
- Bangla is shaped with HarfBuzz and rasterised with FreeType rather than
  Pillow's default text path, which has no libraqm here and would have broken
  conjuncts and vowel-sign placement.
- The type is the site's own: Noto Sans Bengali 600 and Source Serif 4, Buro
  weight matched to the `@theme` tokens. Palette is navy `#0B1426`, gold
  `#F6B73C`, ivory `#F5F1E8`.
- Motion is Ken Burns only — a still is never asked to pretend it is footage.
  A different film-grain field per frame keeps the pans from looking frozen.
- The ambient bed is synthesised (D-minor add9 sines, slow swell), so there is
  no music licence to clear. If you'd rather use a licensed track, mute the
  video and drop it in the editor; speech sits at −15 to −20 dB and the bed at
  −27 dB, so a replacement at −25 dB sits correctly.
- **Disclosure:** these are AI illustrations of Makkah and Madinah, not
  documentary photographs of real pilgrims. If the piece runs as
  reportage-style content, caption it as AI illustration.

## Rebuilding

Requires `ffmpeg` (or `pip install imageio-ffmpeg`), `numpy`, `pillow`,
`uharfbuzz`, `freetype-py`, `fonttools`.

```bash
python3 .video/build.py        # ~5 min; writes the master to .video/master/
```

To change copy, edit the `SCENES` table in `.video/build.py` — each scene owns
its still, its Bangla lines, its zoom direction and the voiceover that sets its
length. Regenerate the voice clips with `generate_speech` in the same tool
session and drop them into `.video/work/` under the same `vo*.wav` names.
Durations are read from the audio, so the timeline re-times itself.
