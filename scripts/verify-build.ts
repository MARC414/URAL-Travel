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
