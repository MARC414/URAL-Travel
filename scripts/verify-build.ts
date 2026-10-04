/**
 * Post-build verification for the prerendered output.
 *
 * Runs after `npm run build` (vite build + scripts/prerender.ts) and asserts the
 * contract that the SEO work depends on. It exists because this project has no
 * test suite, and because the single most damaging bug found so far — sitemap
 * `<lastmod>` silently becoming the *build date* on 77 of 159 URLs — was
 * invisible to both `tsc` and a successful build. A green build was not evidence
 * of a correct sitemap.
 *
 * Run locally with `npm run verify:build`; CI runs it on every PR.
 *
 * Deliberate design choices:
 *   - Route counts are asserted as MINIMUMS, so adding content never breaks CI,
 *     while a prerender that silently emits nothing (the realistic failure) does.
 *   - The lastmod rule is asserted EXACTLY, because it is a hard invariant:
 *     every sitemap entry is either a blog post with its own ISO publish
 *     timestamp, or a data-driven page carrying the committed CONTENT_UPDATED
 *     date. This is what stops the build-date regression from returning.
 *   - Blog image count is asserted against BLOG_DATA.length, so it is
 *     self-maintaining rather than a magic number.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT_UPDATED } from "../src/data/contentMeta";
import { BLOG_DATA } from "../src/constants";
import {
  buildResponsiveSrcSet,
  RESPONSIVE_IMAGE_BREAKPOINTS,
} from "../src/utils/imageAssets";

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_DIR = path.join(ROOT_DIR, "dist");

const MIN_EN_ROUTES = 80;
const MIN_BN_ROUTES = 75;

const failures: string[] = [];
const checks: string[] = [];

function check(condition: boolean, label: string) {
  if (condition) {
    checks.push(label);
  } else {
    failures.push(label);
  }
}

function read(filePath: string): string | null {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

// --- 1. Build output exists -------------------------------------------------

check(fs.existsSync(path.join(DIST_DIR, "index.html")), "dist/index.html exists");
check(fs.existsSync(DIST_DIR), "dist/ was produced by the build");

// --- 2. Generated social/OG images (built by copyStaticSeoImages) -----------

check(fs.existsSync(path.join(DIST_DIR, "og-image.jpg")), "dist/og-image.jpg generated");

const blogImgDir = path.join(DIST_DIR, "img", "blog");
const blogImages = fs.existsSync(blogImgDir)
  ? fs.readdirSync(blogImgDir).filter((f) => f.endsWith(".jpg"))
  : [];
check(
  blogImages.length === BLOG_DATA.length,
  `dist/img/blog has one JPEG per blog post (${blogImages.length}/${BLOG_DATA.length})`
);

// --- 2b. Responsive breakpoints & Consent Mode regression guards -----------
//
// Two invariants that are silent when broken:
//
//  (1) The 960w breakpoint only pays off if every emitter of a srcset agrees:
//      src/utils/imageAssets.ts (React), scripts/prerender.ts (the LCP
//      <link rel="preload"> rewritten into ~155 prerendered routes) and the
//      hand-written copy in index.html. A half-added breakpoint would ship
//      tablets and DPR-2 phones the 1200w LCP image forever, with no error
//      anywhere — the same failure shape as the 2026-10 Google Fonts @import
//      that silently undid all of Phase 1.
//  (2) Consent Mode v2 is a legal control, not a performance one: if the
//      `consent default` block ever lands AFTER the GTM loader (a reorder, a
//      "cleanup" commit), analytics starts firing before consent with no
//      build failure at all. Assert the order in the shipped HTML.

function collectHtmlFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, acc);
    else if (entry.name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

const distHtmlFiles = collectHtmlFiles(DIST_DIR);
const distIndexHtml = read(path.join(DIST_DIR, "index.html"));

// (1a) every responsive image stem ships every breakpoint
const responsiveImgDir = path.join(DIST_DIR, "assets", "images");
const stems = new Map<string, Set<number>>();
if (fs.existsSync(responsiveImgDir)) {
  for (const file of fs.readdirSync(responsiveImgDir)) {
    const match = file.match(/^(.+)-(\d+)\.webp$/);
    if (!match) continue;
    if (!stems.has(match[1])) stems.set(match[1], new Set());
    stems.get(match[1])!.add(Number(match[2]));
  }
}
const incompleteStems = [...stems.entries()]
  .filter(([, widths]) => !RESPONSIVE_IMAGE_BREAKPOINTS.every((w) => widths.has(w)))
  .map(
    ([stem, widths]) =>
      `${stem} [${[...widths].sort((a, b) => a - b).join(",")}]`
  );
check(
  stems.size > 0 && incompleteStems.length === 0,
  incompleteStems.length === 0
    ? `every responsive image ships all breakpoints (${stems.size} stems × ${RESPONSIVE_IMAGE_BREAKPOINTS.join("/")}w)`
    : `${incompleteStems.length} image stem(s) missing breakpoint(s): ` +
        incompleteStems.slice(0, 5).join(", ")
);

// (1b) every imagesrcset in shipped HTML offers every breakpoint, and the
//      SPA shell's hand-written hero srcset still matches the TS builder
const srcsetProblems: string[] = [];
let srcsetCount = 0;
for (const file of distHtmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/imagesrcset="([^"]+)"/g)) {
    srcsetCount++;
    const missing = RESPONSIVE_IMAGE_BREAKPOINTS.filter(
      (w) => !match[1].includes(` ${w}w`)
    );
    if (missing.length > 0) {
      srcsetProblems.push(
        `${path.relative(DIST_DIR, file)} missing ${missing.join(",")}w`
      );
    }
  }
}
check(
  srcsetCount > 0 && srcsetProblems.length === 0,
  srcsetProblems.length === 0
    ? `all ${srcsetCount} shipped imagesrcset(s) offer ${RESPONSIVE_IMAGE_BREAKPOINTS.join("/")}w`
    : `${srcsetProblems.length} imagesrcset(s) missing breakpoints: ` +
        srcsetProblems.slice(0, 5).join(", ")
);

const heroSrc = "/assets/images/clouds_boat_hero_1781438671378-1200.webp";
check(
  distIndexHtml !== null &&
    distIndexHtml.includes(`imagesrcset="${buildResponsiveSrcSet(heroSrc)}"`),
  "index.html hero imagesrcset matches buildResponsiveSrcSet() exactly"
);

// (1c) locale-correct critical font preloads: bn routes must preload Noto
//      Sans Bengali (their LCP is Bengali text), en routes Inter — and
//      neither should preload the other locale's font, because an unused
//      preload competes with the LCP resource for early connections.
const fontProblems: string[] = [];
let fontChecked = 0;
for (const file of distHtmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  // Utility pages (404, search-console verification, partner whitelabel)
  // are static copies from public/ with no app shell and no font preloads —
  // out of scope. Real routes all carry the #root mount point.
  if (!html.includes('id="root"')) continue;
  fontChecked++;
  const rel = path.relative(DIST_DIR, file);
  const isBn = rel.startsWith(`bn${path.sep}`) || rel === "bn.html";
  const hasNoto = html.includes('href="/fonts/noto-sans-bengali-400.woff2"');
  const hasInter = html.includes('href="/fonts/inter-400.woff2"');
  if (isBn && !hasNoto) fontProblems.push(`${rel}: Bengali page without Noto preload`);
  if (isBn && hasInter) fontProblems.push(`${rel}: Bengali page still preloading Inter`);
  if (!isBn && !hasInter) fontProblems.push(`${rel}: English page without Inter preload`);
  if (!isBn && hasNoto) fontProblems.push(`${rel}: English page preloading unused Noto`);
}
check(
  fontChecked > 0 && fontProblems.length === 0,
  fontProblems.length === 0
    ? `all ${fontChecked} route pages preload their own locale's critical font (bn→Noto, en→Inter)`
    : `${fontProblems.length} page(s) with wrong font preload: ` +
        fontProblems.slice(0, 5).join(", ")
);

// (2) consent default precedes the GTM loader, and defaults to denied.
//     Whitespace-tolerant: the head script has been rewritten once already
//     (binary -> granular CMP), and the guard must survive formatting changes
//     while still catching a reorder or a default that stops denying.
if (distIndexHtml !== null) {
  const consentMatch = distIndexHtml.match(/gtag\(\s*'consent'\s*,\s*'default'/);
  const consentIdx = consentMatch?.index ?? -1;
  const gtmIdx = distIndexHtml.indexOf("googletagmanager.com/gtm.js");
  check(
    consentIdx !== -1 && gtmIdx !== -1 && consentIdx < gtmIdx,
    consentIdx === -1
      ? "dist/index.html has no Consent Mode v2 default block"
      : gtmIdx === -1
        ? "dist/index.html has no GTM loader"
        : consentIdx < gtmIdx
          ? "Consent Mode v2 default state ships before the GTM loader"
          : "Consent Mode default block moved AFTER the GTM loader (GDPR risk)"
  );
  check(
    /analytics_storage':[^,\n]*'denied'/.test(distIndexHtml),
    "analytics_storage can default to denied in shipped HTML"
  );
}

// --- 3. Sitemap: structure + the lastmod invariant --------------------------

const sitemap = read(path.join(DIST_DIR, "sitemap.xml"));
check(sitemap !== null, "dist/sitemap.xml generated");

if (sitemap) {
  const urlBlocks = sitemap
    .split("<url>")
    .slice(1)
    .map((block) => block.split("</url>")[0]);

  check(
    urlBlocks.length >= MIN_EN_ROUTES + MIN_BN_ROUTES,
    `sitemap URL count >= ${MIN_EN_ROUTES + MIN_BN_ROUTES} (found ${urlBlocks.length})`
  );

  // Classify by the <loc> value only. Never scan the whole block for "/bn/" —
  // English blocks legitimately contain a Bengali URL in their hreflang
  // alternates, which silently miscounts every pair as Bengali.
  const locOf = (block: string) => (block.match(/<loc>([^<]+)<\/loc>/) || [])[1] ?? "";
  const enBlocks = urlBlocks.filter((b) => !locOf(b).includes("/bn/"));
  const bnBlocks = urlBlocks.filter((b) => locOf(b).includes("/bn/"));
  check(
    enBlocks.length >= MIN_EN_ROUTES,
    `sitemap has >= ${MIN_EN_ROUTES} English URLs (found ${enBlocks.length})`
  );
  check(
    bnBlocks.length >= MIN_BN_ROUTES,
    `sitemap has >= ${MIN_BN_ROUTES} Bengali URLs (found ${bnBlocks.length})`
  );

  // The invariant that the 2026-10-02 fix established.
  const missingLastmod = urlBlocks.filter((b) => !/<lastmod>[^<]+<\/lastmod>/.test(b));
  check(missingLastmod.length === 0, `every <url> has <lastmod> (${missingLastmod.length} missing)`);

  const badLastmod: string[] = [];
  for (const block of urlBlocks) {
    const match = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (!match) continue;
    const value = match[1];
    const isBlogTimestamp = value.includes("T"); // exact ISO publish datetime
    const isContentDate = value === CONTENT_UPDATED; // committed content date
    if (!isBlogTimestamp && !isContentDate) badLastmod.push(value);
  }
  check(
    badLastmod.length === 0,
    badLastmod.length === 0
      ? `every lastmod is a blog timestamp or CONTENT_UPDATED (${CONTENT_UPDATED})`
      : `lastmod must be a blog ISO timestamp or CONTENT_UPDATED (${CONTENT_UPDATED}); ` +
          `found ${badLastmod.length} unexpected value(s): ${[...new Set(badLastmod)].slice(0, 5).join(", ")}`
  );

  // Reciprocal hreflang clusters: blog posts and their /bn twins, plus hubs.
  const bnWithoutCluster = bnBlocks.filter((b) => (b.match(/xhtml:link/g) || []).length !== 3);
  check(
    bnWithoutCluster.length === 0,
    bnWithoutCluster.length === 0
      ? "every Bengali URL carries a complete 3-link hreflang cluster"
      : `${bnWithoutCluster.length} Bengali URL(s) missing a full hreflang cluster`
  );
}

// --- 4. RSS ----------------------------------------------------------------

const rss = read(path.join(DIST_DIR, "rss.xml"));
check(rss !== null, "dist/rss.xml generated");
if (rss) {
  const itemCount = (rss.match(/<item>/g) || []).length;
  check(
    itemCount === BLOG_DATA.length,
    `rss.xml has one <item> per blog post (${itemCount}/${BLOG_DATA.length})`
  );

  // A malformed <pubDate> is the RSS equivalent of the sitemap lastmod bug:
  // `new Date("...").toUTCString()` returns the literal string "Invalid Date"
  // when the input does not parse, and nothing else in the pipeline notices.
  // Assert parseability, not a specific date, so the guard survives a
  // legitimate change of publish timestamps.
  const itemBlocks = rss
    .split("<item>")
    .slice(1)
    .map((block) => block.split("</item>")[0]);
  const badPubDates = itemBlocks.filter((block) => {
    const match = block.match(/<pubDate>([^<]*)<\/pubDate>/);
    return !match || Number.isNaN(new Date(match[1]).getTime());
  });
  check(
    badPubDates.length === 0,
    badPubDates.length === 0
      ? "every rss.xml <item> has a parseable pubDate"
      : `${badPubDates.length} rss <item>(s) have a missing or unparseable pubDate ` +
          `(e.g. "Invalid Date"); see toIsoDate() usage in scripts/prerender.ts`
  );
}

// --- Report ----------------------------------------------------------------

for (const label of checks) console.log(`  \u2713 ${label}`);
if (failures.length > 0) {
  console.error(`\n[verify:build] ${failures.length} check(s) FAILED:\n`);
  for (const label of failures) console.error(`  \u2717 ${label}`);
  console.error(
    "\nIf a lastmod check failed: content changed but CONTENT_UPDATED in\n" +
      "src/data/contentMeta.ts was not bumped, or public/sitemap.xml was not\n" +
      "rebuilt and committed. See docs/growth/01-indexing-crawling.md \u00a74.\n"
  );
  process.exitCode = 1;
} else {
  console.log(`\n[verify:build] All ${checks.length} checks passed.`);
}
