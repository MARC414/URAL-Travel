import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  INLINE_CITATION_PATTERN,
  parseCitationNumber,
  resolveCitation,
  citationAnchorId,
  linkifyCitations,
  CITATION_LINK_CLASS,
} from "../src/utils/citations";

/**
 * Guards the two things a reader could not do before this file existed:
 * jump from a claim to its source, and get a usable preview card when the page is
 * pasted into a social network.
 *
 * Both are silent failures. A dead `[1]` looks like a citation. A page with
 * `og:image` and no dimensions looks like it has a social card — until LinkedIn
 * renders an empty box and nobody notices, because the person who would notice is
 * a stranger sharing the link.
 */

const DIST = path.join(process.cwd(), "dist");
const read = (p: string) => fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";

let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

test("citation parser reads both scripts", () => {
  assert.equal(parseCitationNumber("1"), 1);
  assert.equal(parseCitationNumber("12"), 12);
  assert.equal(parseCitationNumber("১"), 1);
  assert.equal(parseCitationNumber("১২"), 12);
  assert.equal(parseCitationNumber("৭"), 7);
  assert.equal(parseCitationNumber("abc"), null);
  assert.equal(parseCitationNumber(""), null);
});

test("a marker for a source that does not exist is left as text, not linked", () => {
  // Five references. [1] is fine, [9] is a content bug and must stay visible so
  // it can be found, rather than becoming a link to nowhere.
  assert.equal(resolveCitation("1", 5), 1);
  assert.equal(resolveCitation("5", 5), 5);
  assert.equal(resolveCitation("9", 5), null);
  assert.equal(resolveCitation("0", 5), null);
  assert.equal(resolveCitation("1", 0), null);
});

test("linkify rewrites only bare markers and never a markdown link", () => {
  const html = `See the ministry page [1] and the ruling [2]. A real link stays: <span>[1](https://example.com)</span>`;
  const out = linkifyCitations(html, 2, CITATION_LINK_CLASS);
  assert.ok(out.includes(`href="#source-1"`), "citation 1 not linked");
  assert.ok(out.includes(`href="#source-2"`), "citation 2 not linked");
  // The markdown case must survive untouched: `[1](url)` is a link the author
  // already wrote, and the citation pass must not eat its bracket.
  assert.ok(out.includes("[1](https://example.com)"), "markdown link was mangled");
});

test("linkify is a no-op when the article has no references", () => {
  const html = "No sources here [1].";
  assert.equal(linkifyCitations(html, 0, CITATION_LINK_CLASS), html);
});

test("both citation markers are still bare after a full replace pass", () => {
  INLINE_CITATION_PATTERN.lastIndex = 0;
  const matches = [..."[1] [২] [12]".matchAll(INLINE_CITATION_PATTERN)].map((m) => m[1]);
  assert.deepEqual(matches, ["1", "২", "12"]);
});

// ---------------------------------------------------------------------------
// Served HTML: what a crawler and a social scraper actually receive.
// ---------------------------------------------------------------------------

const enPost = "hajj-rites-mina-arafah-muzdalifah-day-by-day";
const enHtml = read(path.join(DIST, "blog", `${enPost}.html`));
const bnHtml = read(path.join(DIST, "bn", "blog", `${enPost}.html`));

test("dist exists for both locales", () => {
  assert.ok(enHtml.length > 1000, "EN page missing — run npm run build first");
  assert.ok(bnHtml.length > 1000, "BN page missing");
});

test("social card declares the image size, without which LinkedIn shows nothing", () => {
  for (const [label, html] of [["en", enHtml], ["bn", bnHtml]] as const) {
    const width = html.match(/<meta property="og:image:width" content="(\d+)" \/>/);
    const height = html.match(/<meta property="og:image:height" content="(\d+)" \/>/);
    assert.ok(width, `${label}: no og:image:width`);
    assert.ok(height, `${label}: no og:image:height`);
    // LinkedIn's hard minimum for a large card is 1200x627. Below that it either
    // drops the image or renders a thumbnail nobody clicks.
    assert.ok(Number(width![1]) >= 1200, `${label}: og:image only ${width![1]}px wide`);
    assert.ok(Number(height![1]) >= 627, `${label}: og:image only ${height![1]}px tall`);
  }
});

test("the og:image points at the post's own hero, not the site default", () => {
  assert.ok(
    enHtml.includes(`https://uraltravel.co.uk/img/blog/${enPost}.jpg`),
    "EN card is not using the post hero image",
  );
  assert.ok(
    !enHtml.includes('og:image" content="https://uraltravel.co.uk/og-image.jpg'),
    "EN card fell back to the generic site image",
  );
});

test("og:image:alt describes the photograph and appears exactly once", () => {
  const alts = [...enHtml.matchAll(/<meta property="og:image:alt" content="([^"]*)" \/>/g)];
  assert.equal(alts.length, 1, `expected one og:image:alt, found ${alts.length}`);
  assert.ok(
    !alts[0][1].includes("Flights, Hotels, Umrah"),
    "alt is still the site strapline — scrapers would read that instead of the photo",
  );
  assert.ok(alts[0][1].length > 20, "alt too short to describe a photograph");
});

test("Bengali cards carry Bengali alt text, not the English description", () => {
  const alt = bnHtml.match(/<meta property="og:image:alt" content="([^"]*)" \/>/)?.[1] ?? "";
  assert.ok(/[\u0980-\u09FF]/.test(alt), "BN og:image:alt is not Bengali");
  assert.ok(/[\u0980-\u09FF]/.test(
    bnHtml.match(/<meta name="twitter:image:alt" content="([^"]*)" \/>/)?.[1] ?? "",
  ), "BN twitter:image:alt is not Bengali");
});

test("blog posts are typed as articles; other pages stay websites", () => {
  assert.ok(enHtml.includes('<meta property="og:type" content="article" />'), "blog post not typed article");
  assert.ok(enHtml.includes('property="article:published_time"'), "no published_time");
  assert.ok(enHtml.includes('property="article:modified_time"'), "no modified_time");
  const visa = read(path.join(DIST, "visa", "saudi-arabia-visa.html"));
  assert.ok(visa.includes('<meta property="og:type" content="website" />'), "visa page typed as article");
});

test("inline citations are real jump links, and every target exists", () => {
  for (const [label, html] of [["en", enHtml], ["bn", bnHtml]] as const) {
    const hrefs = [...html.matchAll(/href="#source-(\d+)"/g)].map((m) => Number(m[1]));
    assert.ok(hrefs.length >= 5, `${label}: only ${hrefs.length} inline citations linked`);
    const ids = new Set([...html.matchAll(/id="source-(\d+)"/g)].map((m) => m[1]));
    for (const target of new Set(hrefs)) {
      assert.ok(ids.has(String(target)), `${label}: citation [${target}] has no target element`);
    }
  }
});

test("the sources list keeps its outbound links", () => {
  const external = [...enHtml.matchAll(/href="(https:\/\/[^"]+)" target="_blank" rel="noopener noreferrer"/g)]
    .map((m) => m[1])
    .filter((u) => u.includes("islamqa.info") || u.includes("haj.gov.sa"));
  assert.ok(external.length >= 6, `only ${external.length} outbound source links`);
});

test("citationAnchorId matches the ids the pages emit", () => {
  assert.equal(citationAnchorId(1), "source-1");
  assert.ok(enHtml.includes(`id="${citationAnchorId(1)}"`), "anchor id convention drifted");
});

/**
 * Posts whose hero photograph is physically smaller than the 1200x627 social floor.
 *
 * Both source files are 411x364 and 412x368 and no larger original exists in the
 * repo, so "fixing" them means upscaling 3x — which produces a blurry card that
 * looks worse than a small sharp one. The real fix is a replacement photograph,
 * and that is the owner's call, not a build step. Listed explicitly, with reasons,
 * the same way `CTA_EXEMPT_SLUGS` works in verify-build.ts: a genuinely new post
 * with a bad image still fails.
 */
const UNDERSIZED_COVER_EXEMPTIONS: Record<string, string> = {
  "chefchaouen-morocco-travel-guide-bangladesh":
    "source photo is 411x364; no larger original in repo — needs a replacement photograph",
  "havana-cuba-travel-guide-bangladesh":
    "source photo is 412x368; no larger original in repo — needs a replacement photograph",
};

function jpegSize(file: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    const isFrameHeader =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrameHeader) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }
  return null;
}

test("every blog cover is big enough to render a social card", () => {
  const dir = path.join(process.cwd(), "public", "img", "blog");
  const offenders: string[] = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".jpg"))) {
    const slug = file.replace(/\.jpg$/, "");
    if (UNDERSIZED_COVER_EXEMPTIONS[slug]) continue;
    const size = jpegSize(path.join(dir, file));
    if (!size) {
      offenders.push(`${slug}: unreadable JPEG`);
      continue;
    }
    if (size.width < 1200 || size.height < 627) {
      offenders.push(`${slug}: ${size.width}x${size.height}`);
    }
  }
  assert.equal(offenders.length, 0, `covers below the social floor: ${offenders.join(", ")}`);
});

test("undersized exemptions still point at real posts", () => {
  const dir = path.join(process.cwd(), "public", "img", "blog");
  const files = new Set(fs.readdirSync(dir));
  for (const slug of Object.keys(UNDERSIZED_COVER_EXEMPTIONS)) {
    assert.ok(files.has(`${slug}.jpg`), `stale cover exemption: ${slug}`);
  }
});

console.log(`\n[test:sharing-citations] ${count} checks passed.`);
