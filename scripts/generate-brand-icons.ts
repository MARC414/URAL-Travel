/**
 * Regenerate the favicon / app-icon set from the SVG sources.
 *
 * WHY THIS EXISTS
 * The brand-kit's small TRANSPARENT PNG exports are defective: at 18px, 34px and
 * 48px the ivory arch is entirely absent (measured: 0 ivory pixels), leaving only
 * the gold flight path and star. The SVGs are correct, so every icon here is
 * rasterised from the SVG rather than copied from brand-kit/png/.
 *
 * Run with:
 *   npm install --no-save sharp
 *   npx tsx scripts/generate-brand-icons.ts
 *
 * Intentionally NOT wired into CI: `sharp` is a native module kept out of the
 * committed dependencies. If it is missing this script explains what to install
 * and exits 0, so it can never break a build that does not need it.
 *
 * Bump the `-vN` suffix convention in public/_headers when the mark changes.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "assets", "brand", "favicon");

// Sources: the transparent line-art marks and the solid-field marks.
const SRC = {
  /** Navy field, ivory arch, gold arc + star. Matches /favicon.svg (the tab). */
  navyField: path.join(ROOT, "public", "favicon.svg"),
  /** Solid emerald field, ivory arch. */
  emeraldField: path.join(OUT, "ascent-emerald.svg"),
  /** Solid ivory field, navy arch. */
  ivoryField: path.join(OUT, "ascent-navy-on-ivory.svg"),
  /** Transparent: ivory ink, for dark UI surfaces. */
  inkIvory: path.join(ROOT, "public", "assets", "brand", "svg", "ural-ascent-mark-v1.svg"),
  /** Transparent: navy ink, for light UI surfaces. */
  inkNavy: path.join(ROOT, "public", "assets", "brand", "svg", "ural-ascent-mark-navy-v1.svg"),
  /** Transparent: single navy ink, for gold surfaces. */
  monoNavy: path.join(OUT, "ascent-mono-navy.svg"),
} as const;

type SrcKey = keyof typeof SRC;

interface Job {
  out: string;
  src: SrcKey;
  size: number;
  /** Maskable icons need ~20% safe padding or Android crops the arch away. */
  maskable?: boolean;
  /** Solid backdrop for maskable / app tiles. Omitted = keep SVG alpha. */
  backdrop?: string;
}

const NAVY = "#0B1426";
const EMERALD = "#0F4A3F";
const IVORY = "#FBF9F4";

const jobs: Job[] = [
  // --- Tab / browser: navy field, matches what the user already likes ---
  // favicon-16 is regenerated because the shipped copy has no arch.
  { out: "favicon-16.png", src: "navyField", size: 16 },

  // --- Installable app icons (any purpose) ---
  { out: "app-navy-192.png", src: "navyField", size: 192 },
  { out: "app-navy-512.png", src: "navyField", size: 512 },
  { out: "app-emerald-192.png", src: "emeraldField", size: 192 },
  { out: "app-emerald-512.png", src: "emeraldField", size: 512 },
  { out: "app-ivory-192.png", src: "ivoryField", size: 192 },
  { out: "app-ivory-512.png", src: "ivoryField", size: 512 },

  // --- Maskable: the mark at 60% inside a solid field, so a circular or
  //     squircle Android mask never clips the arch or the star. ---
  { out: "app-navy-maskable-192.png", src: "navyField", size: 192, maskable: true, backdrop: NAVY },
  { out: "app-navy-maskable-512.png", src: "navyField", size: 512, maskable: true, backdrop: NAVY },
  { out: "app-emerald-maskable-512.png", src: "emeraldField", size: 512, maskable: true, backdrop: EMERALD },
  { out: "app-ivory-maskable-512.png", src: "ivoryField", size: 512, maskable: true, backdrop: IVORY },

  // --- Small UI marks, correct arch, transparent. Replaces the defective
  //     brand-kit transparent exports for in-page use. ---
  { out: "ui-ivory-32.png", src: "inkIvory", size: 32 },
  { out: "ui-ivory-48.png", src: "inkIvory", size: 48 },
  { out: "ui-ivory-64.png", src: "inkIvory", size: 64 },
  { out: "ui-navy-32.png", src: "inkNavy", size: 32 },
  { out: "ui-navy-48.png", src: "inkNavy", size: 48 },
  { out: "ui-navy-64.png", src: "inkNavy", size: 64 },
  { out: "ui-mono-navy-32.png", src: "monoNavy", size: 32 },
  { out: "ui-mono-navy-48.png", src: "monoNavy", size: 48 },
  { out: "ui-mono-navy-64.png", src: "monoNavy", size: 64 },

  // --- Root app icon some crawlers and older iOS builds request directly ---
  // iOS requests /apple-touch-icon.png from the site ROOT, which in Vite means
  // public/ — a path outside public/ gets hashed into /assets/... and 404s.
  { out: "../../../apple-touch-icon.png", src: "navyField", size: 180 },
];

type SharpInput =
  | string
  | Buffer
  | { create: { width: number; height: number; channels: number; background: string } };
type SharpFn = (input: SharpInput) => import("sharp").Sharp;

async function main() {
  let sharp: SharpFn;
  try {
    // sharp ships CJS; the callable factory is on `default` at runtime but is
    // typed inconsistently, so pin the shape we actually use.
    const mod = (await import("sharp")) as unknown as { default?: SharpFn } & SharpFn;
    sharp = (mod.default ?? mod) as SharpFn;
  } catch {
    console.log(
      "sharp is not installed. Run `npm install --no-save sharp` then re-run.\n" +
        "Skipping icon generation (this script is not part of the build)."
    );
    return;
  }

  mkdirSync(OUT, { recursive: true });

  for (const job of jobs) {
    const source = SRC[job.src];
    if (!existsSync(source)) throw new Error(`missing source: ${source}`);

    const target = job.out.includes("/")
      ? path.resolve(OUT, job.out)
      : path.join(OUT, job.out);

    if (job.maskable) {
      // Render at 60% and centre on a solid field.
      const inner = Math.round(job.size * 0.6);
      const mark = await sharp(source)
        .resize(inner, inner)
        .flatten({ background: job.backdrop })
        .png()
        .toBuffer();
      const off = Math.round((job.size - inner) / 2);
      await sharp({
        create: {
          width: job.size,
          height: job.size,
          channels: 3,
          background: job.backdrop ?? NAVY,
        },
      })
        .composite([{ input: mark, top: off, left: off }])
        .png({ compressionLevel: 9 })
        .toFile(target);
    } else {
      await sharp(source)
        .resize(job.size, job.size)
        .png({ compressionLevel: 9 })
        .toFile(target);
    }
    console.log(`  ${path.relative(ROOT, target)}  ${job.size}x${job.size}`);
  }

  // --- Root /favicon.ico: multi-resolution 16/32/48 in a single container.
  // Browsers and some crawlers request /favicon.ico by default; without it the
  // request 404s and they fall back to whatever they cached earlier. ---
  const icoSizes = [16, 32, 48];
  const pngs: Buffer[] = [];
  for (const size of icoSizes) {
    pngs.push(await sharp(SRC.navyField).resize(size, size).png().toBuffer());
  }
  writeFileSync(path.join(ROOT, "public", "favicon.ico"), buildIco(icoSizes, pngs));
  console.log("  public/favicon.ico  16/32/48");
}

/** Minimal ICO container with PNG-compressed members (Vista+ format). */
function buildIco(sizes: number[], pngs: Buffer[]): Buffer {
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries: Buffer[] = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i += 1) {
    const size = sizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngs[i].length, 8); // payload size
    entry.writeUInt32LE(offset, 12); // payload offset
    entries.push(entry);
    offset += pngs[i].length;
  }

  return Buffer.concat([header, ...entries, ...pngs]);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
