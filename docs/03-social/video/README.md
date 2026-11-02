# URAL Hajj & Umrah reel — 9:16, 60s

A Bangla-first vertical short for the pilgrimage audience described in
[PRODUCT.md](../../../PRODUCT.md): a first-time traveller asking *can I go, what
does it cost in taka, and what do I do first?*

Two cuts of the same 60-second edit are kept, so the piece can be placed
wherever it runs. Both are exactly 60.0 s, same voiceover, same typography.

| Cut | File | Visual language |
| --- | --- | --- |
| **Photographic** (primary) | `ural-hajj-umrah-reel-9x16-photo.mp4` | Cinematic photoreal imagery, graded to the brand palette |
| **Illustrated** (safe) | `ural-hajj-umrah-reel-9x16-share.mp4` | Flat gouache/screen-print artwork, no identifiable people |

## Which cut to publish

Use the **photographic** cut for normal marketing use — it is the stronger
piece and there is no rule against AI imagery. Two conditions apply:

1. **Caption it as AI illustration.** The frames are generated, not photographs
   of real pilgrims. A quiet line such as "AI illustration" in the caption or
   the first comment removes the only real risk, which is a viewer believing
   they are looking at a real event.
2. **Do not run it as news or reportage.** It must not sit in a context where
   it would be read as documentary evidence of a particular Hajj season, crowd
   size or safety condition.

Use the **illustrated** cut when the piece will appear next to real reportage,
in a news-adjacent slot, or on a platform/partner that does not accept
AI-generated photoreal imagery of people. It makes the same argument with no
photographic claim at all.

## Download

1. **Arena** — the file is presented in the conversation; use the download
   button on the viewer.
2. **GitHub** — open the file on this branch (or on `main` once merged) and
   click **Download**. Both MP4s are committed, so a normal `git clone` gets
   them too.
3. **Command line**

   ```bash
   git clone https://github.com/MARC414/URAL-Travel.git
   cd URAL-Travel/docs/03-social/video
   ```

## Files

| File | Use |
| --- | --- |
| `ural-hajj-umrah-reel-9x16-photo.mp4` | Primary cut. ~11 MB. |
| `ural-hajj-umrah-reel-9x16-share.mp4` | Illustrated cut. ~10 MB. |
| `ural-hajj-umrah-reel-9x16-photo-poster.jpg` | Cover frame for the photographic cut. |
| `ural-hajj-umrah-reel-poster.jpg` | Cover frame for the illustrated cut. |

Full-bitrate masters (CRF 18) are build artifacts and are not committed;
`python3 .video/build.py --program photo|art` regenerates them into
`.video/master/`.

## Specs

| | |
| --- | --- |
| Frame | 1080×1920 (9:16), 30 fps, H.264 High, yuv420p, faststart |
| Length | 60.0 s |
| Cuts | Dip to black, 0.8 s |
| Audio | AAC 128 kbps stereo — Bangla voiceover + synthesised ambient bed, ducked under speech |
| Safe zones | All type sits between 42% and 94% of height, inside the Reels/TikTok UI margins |

## Edit decision list — photographic cut

| Time | Visual | On screen | Voiceover |
| --- | --- | --- | --- |
| 0.0–7.1 | Kaaba at blue hour, push in | হজ ও উমরাহ / পবিত্র ভূমির স্বপ্ন | প্রতি বছর হাজারো মানুষ পবিত্র ভূমির স্বপ্ন দেখেন। |
| 6.3–14.6 | Hands raised in dua, pull back | কিন্তু প্রশ্নটা একটাই · যাব কীভাবে? / খরচ কত? / প্রথমে কী করব? | কিন্তু প্রশ্নটা একটাই — যাব কীভাবে, খরচ কত, আর প্রথমে কী করব? |
| 13.8–22.2 | Mina tent city from the hills | ধাপে ধাপে / মিনা · আরাফাহ মুজদালিফা | মিনা, আরাফাহ, মুজদালিফা — প্রতিটি ধাপের প্রস্তুতি আগেই জেনে নিন। |
| 21.4–29.1 | Folded ihram cloth, raking light | ইহরাম / মিকাত থেকে তালবিয়া | ইহরাম, মিকাত, তালবিয়া — কোথায় কী করবেন, তা পরিষ্কার করে। |
| 28.3–33.7 | Passport, visa form, glasses | ভিসা / চেকলিস্ট, ধাপে ধাপে | ধাপে ধাপে ভিসা চেকলিস্ট। |
| 32.9–38.3 | Passport, taka notes, planning desk | বাজেট / সব হিসাব টাকায় · ফ্লাইট · হোটেল · ভিসা · খাবার | আর বাজেট ক্যালকুলেটর, সব হিসাব টাকায়। |
| 37.5–44.4 | An elder's hands on a prayer mat | সবার জন্য / নারী, বয়স্ক প্রথম যাত্রী | নারী, বয়স্ক ও প্রথমবার যাত্রীদের জন্য আলাদা গাইড। |
| 43.6–50.1 | Overhead tawaf, counter-zoom | গাইড / হজ ও উমরাহর বিস্তারিত গাইড | উড়াল-এ পাবেন হজ ও উমরাহর বিস্তারিত গাইড। |
| 49.3–54.5 | Masjid an-Nabawi at golden hour | মদিনা / মসজিদে নববীতে শান্তি | (no speech — lets the image breathe) |
| 53.7–60.0 | Makkah skyline at dawn, end card | URAL wordmark · যাত্রার আগেই জেনে নিন · uraltravel.co.uk | যাত্রার আগেই জেনে নিন। উড়াল — আপনার ভ্রমণবুদ্ধি, বাংলায়। |

The illustrated cut is the same narration in nine shots (its EDL is in git
history at the first version of this file, and the scene table is the `ART`
list in `.video/build.py`).

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
  the image, so bright frames get more protection and dark ones keep their air.
- Photographic frames get a light warm grade and 2.2% grain so ten stills sit in
  one palette; the illustrated frames skip the grade and use less grain.
- The ambient bed is synthesised (D-minor add9 sines), so there is no music
  licence to clear. To use a licensed track instead, mute the video and drop it
  in an editor: speech sits at −15 to −20 dB and the bed at −27 dB.

## Rebuilding

Requires `ffmpeg` (or `pip install imageio-ffmpeg`), `numpy`, `pillow`,
`uharfbuzz`, `freetype-py`, `fonttools`.

```bash
python3 .video/build.py --program photo   # ~10 min
python3 .video/build.py --program art     # ~9 min
```

To change copy, edit the `PHOTO` or `ART` table in `.video/build.py` — each
scene owns its image, its Bangla lines, its zoom direction and the voiceover
that sets its length. Regenerate voice clips with `generate_speech` in the same
tool session and drop them into `.video/work/` under the same `vo*.wav` names.
Durations are read from the audio and the last shot absorbs the slack, so the
timeline re-times itself and still lands on 60.0 s.
