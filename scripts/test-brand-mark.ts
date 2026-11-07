/**
 * Brand-mark integrity.
 *
 * The owner asked for one thing above all: the generic four-point "AI sparkle"
 * glyph out of the site, replaced by the real URAL Ascent mark. A one-off sweep
 * would satisfy that today and fail tomorrow — the next component that wants a
 * "new / smart" accent would reach for Sparkles again. So the rule lives here.
 *
 * It also pins the thing the pixel review caught: the brand gold #F6B73C may not
 * be used as ink on a gold surface. The first attempt at the affiliate toast did
 * exactly that and the flight path and star disappeared into the chip.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");

let passed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed += 1;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(`${name}\n    ${(error as Error).message}`);
    console.log(`FAIL ${name}`);
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

/** Every .ts/.tsx file under src, recursively. */
function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const SOURCE_FILES = walk(SRC);
const rel = (file: string) => path.relative(ROOT, file);

// ---------------------------------------------------------------------------

test("the generic Sparkles glyph is not used anywhere in src", () => {
  const offenders = SOURCE_FILES.filter((file) =>
    /\bSparkles\b/.test(readFileSync(file, "utf8"))
  ).map(rel);

  assert(
    offenders.length === 0,
    `Sparkles is back in ${offenders.length} file(s): ${offenders.join(", ")}. ` +
      `Use AscentMark for brand identity, or drop the accent entirely.`
  );
});

test("no other generic 'magic accent' icon is imported as a brand stand-in", () => {
  // Wand2/WandSparkles/Stars are the same visual idea under different names.
  const suspects = /\b(Wand2|WandSparkles|Stars)\b/;
  const offenders = SOURCE_FILES.filter((file) =>
    suspects.test(readFileSync(file, "utf8"))
  ).map(rel);
  assert(offenders.length === 0, `generic accent icon found in: ${offenders.join(", ")}`);
});

test("AscentMark exists and exposes the documented variants", () => {
  const file = path.join(SRC, "components/AscentMark.tsx");
  assert(existsSync(file), "src/components/AscentMark.tsx is missing");
  const source = readFileSync(file, "utf8");
  for (const variant of ["ivory", "navy", "monoNavy", "monoIvory", "emerald", "onIvory"]) {
    assert(source.includes(`${variant}:`), `variant "${variant}" is not mapped to a source`);
  }
});

test("every asset AscentMark references exists and ships in public/", () => {
  const source = readFileSync(path.join(SRC, "components/AscentMark.tsx"), "utf8");
  const sources = [...source.matchAll(/"(\/assets\/brand\/[^"]+)"/g)].map((m) => m[1]);
  assert(sources.length >= 4, `expected at least 4 asset paths, found ${sources.length}`);
  const missing = sources.filter(
    (asset) => !existsSync(path.join(ROOT, "public", asset.replace(/^\//, "")))
  );
  assert(missing.length === 0, `referenced but not published: ${missing.join(", ")}`);
});

test("the brand gold is never used as ink on a gold surface", () => {
  // Guard the specific mistake the pixel review found: a `bg-[#F6B73C]` wrapper
  // whose AscentMark asks for the standard ivory/navy variant, which paints the
  // gold arc onto the gold chip and erases it.
  const source = readFileSync(path.join(SRC, "App.tsx"), "utf8");
  const goldChip = /bg-\[#F6B73C\][^>]*>\s*<AscentMark[^/]*variant="([a-zA-Z]+)"/g;
  const bad: string[] = [];
  for (const match of source.matchAll(goldChip)) {
    if (!match[1].startsWith("mono")) bad.push(match[1]);
  }
  assert(
    bad.length === 0,
    `a gold-surface chip renders the "${bad.join(", ")}" variant; gold-on-gold erases the arc and star — use monoNavy`
  );
});

test("AscentMark never renders an unbounded size", () => {
  const source = readFileSync(path.join(SRC, "components/AscentMark.tsx"), "utf8");
  // The mark is line art; below ~16px the arch loses its counter. The component
  // cannot know the context, so call sites are checked instead.
  const callSites = SOURCE_FILES.filter((f) => !f.endsWith("AscentMark.tsx"));
  const tooSmall: string[] = [];
  for (const file of callSites) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/<AscentMark[^>]*size=\{(\d+)\}/g)) {
      if (Number(match[1]) < 16) tooSmall.push(`${rel(file)}: ${match[1]}px`);
    }
  }
  assert(tooSmall.length === 0, `mark rendered below legibility floor: ${tooSmall.join(", ")}`);
});

// ---------------------------------------------------------------------------

if (failures.length > 0) {
  console.error(`\n${failures.length} brand-mark check(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`\n${passed} brand-mark checks passed.`);
