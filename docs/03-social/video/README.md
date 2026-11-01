# URAL Hajj & Umrah reel — 9:16, 60s

A Bangla-first vertical short for the pilgrimage audience described in
[PRODUCT.md](../../../PRODUCT.md): a first-time traveller asking *can I go, what
does it cost in taka, and what do I do first?*

## Download

Three ways, depending on where you are:

1. **Arena** — the file is presented in the conversation; use the download
   button on the viewer.
2. **GitHub** — open
   [`docs/03-social/video/ural-hajj-umrah-reel-9x16-share.mp4`](ural-hajj-umrah-reel-9x16-share.mp4)
   on this branch (or on `main` once merged) and click **Download**. The file is
   committed to the repo, so it is also available through a normal
   `git clone` / `git pull`.
3. **Command line**

   ```bash
   git clone https://github.com/MARC414/URAL-Travel.git
   cd URAL-Travel/docs/03-social/video
   ```

## Files

| File | Use |
| --- | --- |
| `ural-hajj-umrah-reel-9x16-share.mp4` | Publish this one. ~10 MB, uploads cleanly to Reels / TikTok / Shorts / Facebook. |
| `ural-hajj-umrah-reel-poster.jpg` | Cover frame (1080×1920) for the grid thumbnail. |

The full-bitrate master (~34 MB, CRF 18) is a build artifact and is not
committed; `python3 .video/build.py` regenerates it into `.video/master/`.

## Specs

| | |
| --- | --- |
| Frame | 1080×1920 (9:16), 30 fps, H.264 High, yuv420p, faststart |
| Length | 60.0 s |
| Cuts | Dip to black, 0.8 s |
| Audio | AAC 128 kbps stereo — Bangla voiceover + synthesised ambient bed, ducked under speech |
| Safe zones | All type sits between 42% and 94% of height, inside the Reels/TikTok UI margins |

## Art direction

**Illustration, not photography.** All nine visuals are AI-generated flat
artwork — gouache and screen-print shapes, a limited navy/gold/ivory/emerald
palette, and no identifiable individuals. Nothing here can be read as
reportage from Makkah or Madinah, which is a deliberate constraint on a subject
where documentary-looking imagery of pilgrims carries real weight.

## Edit decision list

| Time | Visual | On screen | Voiceover |
| --- | --- | --- | --- |
| 0.0–7.1 | Illustrated Haram courtyard, push in | হজ ও উমরাহ / পবিত্র ভূমির স্বপ্ন | প্রতি বছর হাজারো মানুষ পবিত্র ভূমির স্বপ্ন দেখেন। |
| 6.3–14.6 | Lantern, prayer beads, dates | কিন্তু প্রশ্নটা একটাই · যাব কীভাবে? / খরচ কত? / প্রথমে কী করব? | কিন্তু প্রশ্নটা একটাই — যাব কীভাবে, খরচ কত, আর প্রথমে কী করব? |
| 13.8–21.8 | Mina tent rows at sunset | ধাপে ধাপে / মিনা · আরাফাহ মুজদালিফা | মিনা, আরাফাহ, মুজদালিফা — প্রতিটি ধাপের প্রস্তুতি আগেই জেনে নিন। |
| 21.0–28.4 | Folded ihram cloth | ইহরাম / মিকাত থেকে তালবিয়া | ইহরাম, মিকাত, তালবিয়া — কোথায় কী করবেন, তা পরিষ্কার করে। |
| 27.6–32.9 | Passport, forms, visa stamp | ভিসা / চেকলিস্ট, ধাপে ধাপে | ধাপে ধাপে ভিসা চেকলিস্ট। |
| 32.1–37.5 | Calculator, notes, rising bars | বাজেট / সব হিসাব টাকায় · ফ্লাইট · হোটেল · ভিসা · খাবার | আর বাজেট ক্যালকুলেটর, সব হিসাব টাকায়। |
| 36.7–43.6 | Prayer mat and shawl in an arch | সবার জন্য / নারী, বয়স্ক প্রথম যাত্রী | নারী, বয়স্ক ও প্রথমবার যাত্রীদের জন্য আলাদা গাইড। |
| 42.8–50.8 | Crescent over hills and minaret | গাইড / হজ ও উমরাহর বিস্তারিত গাইড | উড়াল-এ পাবেন হজ ও উমরাহর বিস্তারিত গাইড। |
| 50.0–60.0 | Makkah skyline at dawn, end card | URAL wordmark · যাত্রার আগেই জেনে নিন · uraltravel.co.uk | যাত্রার আগেই জেনে নিন। উড়াল — আপনার ভ্রমণবুদ্ধি, বাংলায়। |

## Why the copy carries no numbers

The reel deliberately names no price, no visa fee and no processing time. Those
figures change and are maintained on the site; a video that quotes them becomes
wrong silently and gets reshared long after the page has been corrected. The
reel's job is to raise the question — the BDT answer lives on
`uraltravel.co.uk`, which is the only call to action in the piece.

Every guide it promises exists on the site: Nusuk steps, ihram/miqat, visa
checklist, the Umrah budget calculator, and the women's, elderly and first-time
traveller guides.

## Production notes

- Bangla is shaped with HarfBuzz and rasterised with FreeType rather than
  Pillow's default text path, which has no libraqm here and would have broken
  conjuncts and vowel-sign placement.
- The type is the site's own: Noto Sans Bengali 600 and Source Serif 4. Palette
  is navy `#0B1426`, gold `#F6B73C`, ivory `#F5F1E8`.
- Motion is Ken Burns only, and cuts dip to black — overlapping two stills
  reads as a double exposure.
- The scrim behind the type is sized per scene from the measured brightness of
  the artwork, so the ivory pieces keep their light instead of being greyed out.
- The ambient bed is synthesised (D-minor add9 sines), so there is no music
  licence to clear. To use a licensed track instead, mute the video and drop it
  in an editor: speech sits at −15 to −20 dB and the bed at −27 dB.

## Rebuilding

Requires `ffmpeg` (or `pip install imageio-ffmpeg`), `numpy`, `pillow`,
`uharfbuzz`, `freetype-py`, `fonttools`.

```bash
python3 .video/build.py        # ~9 min; writes the master to .video/master/
```

To change copy, edit the `SCENES` table in `.video/build.py` — each scene owns
its artwork, its Bangla lines, its zoom direction and the voiceover that sets
its length. Regenerate voice clips with `generate_speech` in the same tool
session and drop them into `.video/work/` under the same `vo*.wav` names.
Durations are read from the audio and the last shot absorbs the slack, so the
timeline re-times itself and still lands on 60.0 s.
