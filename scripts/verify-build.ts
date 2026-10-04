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
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT_UPDATED } from "../src/data/contentMeta";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
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

/**
 * Extract the inline affiliate loader from an HTML document.
 *
 * Anchored on `function loadEmerald` and then walked *backwards* to the nearest
 * `<script` tag: a forward-only regex starting at the first `<script>` in the
 * file would swallow every tag and comment in between (it has produced false
 * positives twice — once from a `crossorigin` mention in markup, once from the
 * word "preconnect" in a comment).
 */
function extractAffiliateLoader(html: string): string {
  const marker = html.indexOf("function loadEmerald");
  if (marker === -1) return "";
  const open = html.lastIndexOf("<script", marker);
  const bodyStart = html.indexOf(">", open);
  const close = html.indexOf("</script>", marker);
  if (open === -1 || bodyStart === -1 || close === -1) return "";
  return html.slice(bodyStart + 1, close);
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

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectSourceFiles(full, acc);
    else if (/\.(ts|tsx)$/.test(entry.name)) acc.push(full);
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

// The shell's preload points at a specific stem; name the files so a rename
// cannot leave the hero preload pointing at a 404.
const RESONSIVE_AVIF_HERO_FILES = [
  "clouds_boat_hero_1781438671378-640.avif",
  "clouds_boat_hero_1781438671378-960.avif",
  "clouds_boat_hero_1781438671378-1200.avif",
];

const heroSrc = "/assets/images/clouds_boat_hero_1781438671378-1200.webp";
const heroAvifSrcSet = buildResponsiveSrcSet(heroSrc, "avif");
check(
  distIndexHtml !== null &&
    distIndexHtml.includes(`imagesrcset="${heroAvifSrcSet}"`),
  "index.html hero imagesrcset matches buildResponsiveSrcSet(_, \"avif\") exactly"
);
// The srcset string matching is not enough: a typo in the extension would ship a
// preload pointing at a 404 and nothing else would notice.
check(
  RESONSIVE_AVIF_HERO_FILES.every((f) => fs.existsSync(path.join(responsiveImgDir, f))),
  "the 3 hero AVIF files referenced by the shell preload exist in dist"
);

// (1d) AVIF rollout guards (Appendix A.6).
//
// The <picture> upgrade is a three-way agreement: the AVIF files on disk, the
// <source> order in ResponsiveImage.tsx, and the <link rel="preload"> that both
// index.html and scripts/prerender.ts emit. A disagreement anywhere means
// supporting browsers fetch the LCP image twice — and nothing else would fail.
{
  // every WebP stem has an AVIF sibling at every breakpoint (and vice versa)
  const avifStems = new Map<string, Set<number>>();
  let avifFileCount = 0;
  if (fs.existsSync(responsiveImgDir)) {
    for (const file of fs.readdirSync(responsiveImgDir)) {
      const match = file.match(/^(.+)-(\d+)\.avif$/);
      if (!match) continue;
      avifFileCount++;
      if (!avifStems.has(match[1])) avifStems.set(match[1], new Set());
      avifStems.get(match[1])!.add(Number(match[2]));
    }
  }
  const expectedAvifFiles = stems.size * RESPONSIVE_IMAGE_BREAKPOINTS.length;
  const missingAvif = [...stems.entries()]
    .filter(([stem, widths]) => {
      const avifWidths = avifStems.get(stem);
      return !avifWidths || ![...widths].every((w) => avifWidths.has(w));
    })
    .map(([stem]) => stem);
  check(
    missingAvif.length === 0 && avifFileCount === expectedAvifFiles,
    missingAvif.length === 0 && avifFileCount === expectedAvifFiles
      ? `every responsive image also ships AVIF at all breakpoints (${avifFileCount} files)`
      : missingAvif.length > 0
        ? `${missingAvif.length} stem(s) missing AVIF breakpoints: ` + missingAvif.slice(0, 5).join(", ")
        : `expected ${expectedAvifFiles} AVIF files for ${stems.size} stems, found ${avifFileCount}`
  );

  // every emitted image preload is AVIF, offers all breakpoints, and every URL
  // in it resolves to a file that is actually in dist
  const preloadProblems: string[] = [];
  let preloadCount = 0;
  for (const file of distHtmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const rel = path.relative(DIST_DIR, file);
    const tags = [...html.matchAll(/<link rel="preload" as="image"[^>]*>/g)];
    if (tags.length > 1) {
      preloadProblems.push(`${rel}: ${tags.length} image preloads (the strip regex is non-global — A.5)`);
      continue;
    }
    for (const tag of tags) {
      preloadCount++;
      if (!tag[0].includes('type="image/avif"')) {
        preloadProblems.push(`${rel}: image preload is not type="image/avif"`);
      }
      const urls = [
        ...(tag[0].match(/imagesrcset="([^"]+)"/)?.[1] ?? "").split(",").map((part) => part.trim().split(" ")[0]),
        tag[0].match(/href="([^"]+)"/)?.[1] ?? "",
      ].filter(Boolean);
      for (const url of urls) {
        if (!url.endsWith(".avif")) {
          preloadProblems.push(`${rel}: preload references a non-AVIF URL (${url})`);
        } else if (!fs.existsSync(path.join(DIST_DIR, url.replace(/^\//, "")))) {
          preloadProblems.push(`${rel}: preload points at a missing file (${url})`);
        }
      }
    }
  }
  check(
    preloadCount > 0 && preloadProblems.length === 0,
    preloadProblems.length === 0
      ? `all ${preloadCount} image preload(s) are AVIF, complete and resolvable`
      : `${preloadProblems.length} image-preload problem(s): ` + preloadProblems.slice(0, 3).join("; ")
  );

  // no raw getResponsiveImageProps spread left in src/ — every photo must go
  // through <ResponsiveImage>, or the next feature silently ships WebP-only
  const srcFiles = collectSourceFiles(path.join(ROOT_DIR, "src"));
  const rawSpreads = srcFiles.filter((file) => {
    if (file.endsWith(path.join("utils", "imageAssets.ts"))) return false;
    const text = fs.readFileSync(file, "utf8");
    return /getResponsiveImageProps\s*\(/.test(text);
  });
  check(
    rawSpreads.length === 0,
    rawSpreads.length === 0
      ? "all photo call sites use <ResponsiveImage> (no raw getResponsiveImageProps spread)"
      : `${rawSpreads.length} file(s) still spread getResponsiveImageProps, bypassing AVIF: ` +
          rawSpreads.map((f) => path.relative(ROOT_DIR, f)).slice(0, 3).join(", ")
  );
}

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
  const hasNoto = html.includes('href="/fonts/noto-sans-bengali-400-v1.woff2"');
  const hasInter = html.includes('href="/fonts/inter-400-v1.woff2"');
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

// --- 2c. Cache-lifetime guards (Lighthouse "efficient cache lifetimes") -----
//
// Lighthouse flags every static asset whose Cache-Control max-age is under
// 30 days and estimates the transfer it considers wasted on repeat visits.
// This site shipped 7-day TTLs on /fonts/* and the brand SVGs and was reported
// for 28 KiB (fonts 212 KiB of the 266 KiB listed — the audit lists
// everything, not only the flagged rows).
//
// Raising a TTL is only safe for unhashed files if the filename changes with
// the content, so the rule below pairs the two: the header must be a
// year + immutable, AND every font the app references must carry a `-vN`
// version suffix and exist on disk. Rename the file without bumping the
// suffix, or add an unversioned font, and this fails instead of silently
// serving year-old bytes.

const headersFile = read(path.join(ROOT_DIR, "public", "_headers")) ?? "";
const ONE_YEAR_SECONDS = 31_536_000;

function hasImmutableOneYearTtl(pathPattern: string): boolean {
  const lines = headersFile.split("\n");
  const idx = lines.findIndex((l) => l.trim() === pathPattern);
  if (idx === -1) return false;
  const ttlLine = lines[idx + 1] ?? "";
  const maxAge = Number(ttlLine.match(/max-age=(\d+)/)?.[1] ?? 0);
  return maxAge >= ONE_YEAR_SECONDS && /immutable/.test(ttlLine);
}

check(
  hasImmutableOneYearTtl("/fonts/*") &&
    hasImmutableOneYearTtl("/assets/brand/svg/*"),
  "public/_headers serves /fonts/* and /assets/brand/svg/* with max-age>=1y, immutable"
);

// Every font referenced from the app shell or the prerenderer must be a
// versioned file that exists in public/fonts/. Collect references from the
// source (index.html, scripts/) rather than dist, so a typo'd rename fails
// even before the build copies anything.
const fontRefs = new Set<string>();
for (const rel of ["index.html", "scripts/prerender.ts"]) {
  const src = read(path.join(ROOT_DIR, rel)) ?? "";
  for (const m of src.matchAll(/\/fonts\/([A-Za-z0-9._-]+\.woff2)/g)) {
    fontRefs.add(m[1]);
  }
}
const unversionedFonts = [...fontRefs].filter((f) => !/-v\d+\.woff2$/.test(f));
const missingFonts = [...fontRefs].filter(
  (f) => !fs.existsSync(path.join(ROOT_DIR, "public", "fonts", f))
);
check(
  fontRefs.size > 0 && unversionedFonts.length === 0 && missingFonts.length === 0,
  unversionedFonts.length === 0 && missingFonts.length === 0
    ? `all ${fontRefs.size} referenced fonts are versioned and present in public/fonts/`
    : `font cache-safety broken — unversioned: [${unversionedFonts.join(", ")}] ` +
        `missing on disk: [${missingFonts.join(", ")}]`
);

// Brand SVG marks must carry the same version suffix, for the same reason.
const brandSvgDir = path.join(ROOT_DIR, "public", "assets", "brand", "svg");
const unversionedSvg = fs.existsSync(brandSvgDir)
  ? fs.readdirSync(brandSvgDir).filter((f) => f.endsWith(".svg") && !/-v\d+\.svg$/.test(f))
  : [];
check(
  fs.existsSync(brandSvgDir) && unversionedSvg.length === 0,
  unversionedSvg.length === 0
    ? "every brand SVG is versioned for its 1-year cache TTL"
    : `brand SVGs without a -vN suffix: ${unversionedSvg.join(", ")}`
);

// No stray unversioned font may sit in public/fonts: scripts/download-fonts.sh
// writes there, and an unversioned file is exactly what an immutable
// Cache-Control must never serve (it would be cached for a year under a name
// that never changes).
const fontsDir = path.join(ROOT_DIR, "public", "fonts");
const strayFonts = fs.existsSync(fontsDir)
  ? fs.readdirSync(fontsDir).filter((f) => f.endsWith(".woff2") && !/-v\d+\.woff2$/.test(f))
  : [];
check(
  strayFonts.length === 0,
  strayFonts.length === 0
    ? "public/fonts contains no unversioned woff2 files"
    : `unversioned woff2 in public/fonts (rename to -vN or delete): ${strayFonts.join(", ")}`
);

// Every font / brand mark referenced from shipped HTML must exist in dist.
// This is the general broken-reference guard: the versioned rename touches
// hand-written pages outside the React tree (e.g. public/travelpayouts-wl.html)
// that nothing else in this script would notice going 404.
const missingRefs = new Set<string>();
for (const file of distHtmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const m of html.matchAll(/(?:\/fonts\/[A-Za-z0-9._-]+\.woff2|\/assets\/brand\/svg\/[A-Za-z0-9._-]+\.svg)/g)) {
    if (!fs.existsSync(path.join(DIST_DIR, m[0]))) missingRefs.add(m[0]);
  }
}
check(
  missingRefs.size === 0,
  missingRefs.size === 0
    ? "every /fonts and /assets/brand/svg reference in shipped HTML resolves in dist"
    : `shipped HTML references missing files: ${[...missingRefs].join(", ")}`
);

// The affiliate origin must NOT be preconnected from the shell. The script is
// lazy and consent-gated for every visitor, so opening a connection at page load
// would be speculative for most sessions and would touch a marketing processor
// before the visitor's choice. (A previous revision preconnected here, back when
// the script loaded for every visitor without consent.)
const loaderAddsPreconnect = /preconnect/.test(
  extractAffiliateLoader(read(path.join(ROOT_DIR, "index.html")) ?? "")
);
check(
  distIndexHtml !== null &&
    !/rel="preconnect"[^>]*emrld\.ltd/.test(distIndexHtml) &&
    !loaderAddsPreconnect,
  "no preconnect to the consent-gated affiliate origin (shell or loader)"
);

// Travelpayouts widget chunk: loaded on need, not on a timer (Appendix F).
//
// The widget is a ~129 KB gzip chunk (two thirds recharts). It used to be
// fetched 260 ms after mount on every page that renders one, competing with the
// LCP image even for visitors who never scrolled to it. The owner approved
// switching to a viewport trigger; these assertions keep the new trigger honest,
// because all four paths are invisible in a green build.
{
  const appSrc = read(path.join(ROOT_DIR, "src", "App.tsx")) ?? "";
  const ceilingMatches = [...appSrc.matchAll(/setTimeout\(markReady, (\d+)\)/g)].map((m) =>
    Number(m[1])
  );
  const hasObserver =
    /IntersectionObserver/.test(appSrc) && /rootMargin: "300px"/.test(appSrc);
  const hasSkeletonTargets = (appSrc.match(/data-tp-skeleton/g) ?? []).length >= 3;
  const hasInteractionEscape = /onInteract/.test(appSrc);
  const shortTimer = ceilingMatches.some((ms) => ms < 1500);

  check(
    hasObserver && hasSkeletonTargets && !shortTimer && ceilingMatches.length > 0,
    hasObserver && hasSkeletonTargets && !shortTimer && ceilingMatches.length > 0
      ? `Travelpayouts widget loads on viewport proximity (observer + ${ceilingMatches.join("/")}ms ceiling), not a short timer`
      : [
          !hasObserver && "no IntersectionObserver/rootMargin trigger",
          !hasSkeletonTargets && "skeletons are not marked data-tp-skeleton (nothing to observe)",
          shortTimer && `a timer below 1.5s fetches the widget chunk anyway (${ceilingMatches.join(", ")}ms)`,
          ceilingMatches.length === 0 && "no ceiling timer at all (a widget could stay a skeleton forever)",
        ]
          .filter(Boolean)
          .join("; ")
  );
  check(
    hasInteractionEscape,
    hasInteractionEscape
      ? "the skeleton interaction escape still fetches the widget immediately"
      : "onInteract escape removed: touching a skeleton no longer loads the widget"
  );
}

// --- 2d. Accessibility guards (WCAG 2.1 AA contrast + the audited fixes) ----
//
// Lighthouse's Accessibility category scored 96 with two scored failures: a
// long list of color-contrast violations and undersized checkbox targets. Every
// one of them came from the same handful of class strings, so the cheapest
// durable guard is:
//   (a) assert the palette pairs the design relies on actually meet AA, and
//   (b) assert the exact patterns that failed the audit have not come back.
// The alternative — running axe in CI — needs a browser and a rendered page;
// this catches the regression at `npm run verify:build` time instead.

function srgbToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => srgbToLinear(parseInt(h.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

// Palette values read from src/index.css so the guard tracks the real theme.
const indexCss = read(path.join(ROOT_DIR, "src", "index.css")) ?? "";
function token(name: string, fallback: string): string {
  return indexCss.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1] ?? fallback;
}
const TOKEN = {
  navy: token("brand-navy", "#0B1426"),
  ivory: token("brand-ivory", "#F5F1E8"),
  gold: token("brand-gold", "#F6B73C"),
  goldInk: token("brand-gold-ink", "#8A5A00"),
  goldLight: token("brand-gold-light", "#FDF0CC"),
  emerald: token("brand-emerald", "#0F4A3F"),
};
// Tailwind's slate scale (v4 values), the only greys the site uses for text.
const SLATE = {
  300: "#CBD5E1",
  400: "#94A3B8",
  500: "#64748B",
  600: "#475569",
  900: "#0F172A",
};
const AMBER_50 = "#FFFBEB";
const AMBER_800 = "#92400E";
const WHITE = "#FFFFFF";

// Every pair below is a text-on-surface combination that ships today and must
// keep meeting WCAG AA for normal text (4.5:1).
const AA_PAIRS: Array<[string, string, string]> = [
  ["slate-400 text on brand-navy (footer/nav body)", SLATE[400], TOKEN.navy],
  ["slate-300 text on brand-navy", SLATE[300], TOKEN.navy],
  ["slate-600 text on white (cards)", SLATE[600], WHITE],
  ["slate-600 text on brand-ivory (page subtitles)", SLATE[600], TOKEN.ivory],
  ["slate-500 text on white", SLATE[500], WHITE],
  ["slate-400 text on slate-900 (dark cards)", SLATE[400], SLATE[900]],
  ["brand-gold-ink text on white (converter result, checklist note)", TOKEN.goldInk, WHITE],
  ["brand-gold-ink text on brand-ivory", TOKEN.goldInk, TOKEN.ivory],
  ["brand-gold-ink text on brand-gold-light", TOKEN.goldInk, TOKEN.goldLight],
  ["brand-gold text on brand-navy (badges, headings)", TOKEN.gold, TOKEN.navy],
  ["white text on brand-emerald", WHITE, TOKEN.emerald],
  ["amber-800 text on amber-50 (gold chip)", AMBER_800, AMBER_50],
];
const failedPairs = AA_PAIRS.filter(([, fg, bg]) => contrastRatio(fg, bg) < 4.5);
check(
  failedPairs.length === 0,
  failedPairs.length === 0
    ? `all ${AA_PAIRS.length} documented text/background token pairs meet WCAG AA (>=4.5:1)`
    : `${failedPairs.length} token pair(s) below 4.5:1: ` +
        failedPairs.map(([label, fg, bg]) => `${label} = ${contrastRatio(fg, bg).toFixed(2)}:1`).join("; ")
);

// The exact class strings behind the 2026-10-04 Lighthouse contrast failures.
// Each one is a muted/gold colour placed on a light surface, or the reverse.
const TSX_FILES: string[] = [];
(function walk(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx|jsx)$/.test(entry.name)) TSX_FILES.push(full);
  }
})(path.join(ROOT_DIR, "src"));

const BANNED_CLASS_PATTERNS: Array<[string, string]> = [
  ["text-slate-400 font-mono text-[10px]", "slate-400 on a white card is 2.56:1 — use slate-600"],
  ["text-[10px] text-slate-400 mb-2", "slate-400 on a white card is 2.56:1 — use slate-600"],
  ["line-through text-slate-400", "checked items still need 4.5:1 — use slate-600"],
  ["text-xs text-slate-500 max-w-xl mx-auto", "slate-500 on brand-ivory is 4.22:1 — use slate-600"],
  ["text-[9px] font-mono text-[#F6B73C]", "gold on white is 1.79:1 — use text-brand-gold-ink"],
  ["text-amber-600 bg-amber-50", "amber-600 on amber-50 is 3.07:1 — use amber-800"],
  ['className="text-[10px] text-slate-500"', "slate-500 on slate-900 is 3.75:1 — use slate-400 on dark"],
];
const bannedHits: string[] = [];
for (const file of TSX_FILES) {
  const text = fs.readFileSync(file, "utf8");
  for (const [pattern, why] of BANNED_CLASS_PATTERNS) {
    if (text.includes(pattern)) bannedHits.push(`${path.relative(ROOT_DIR, file)} :: ${pattern} (${why})`);
  }
}
check(
  bannedHits.length === 0,
  bannedHits.length === 0
    ? `no re-introduction of the ${BANNED_CLASS_PATTERNS.length} audited low-contrast class patterns`
    : `${bannedHits.length} banned pattern(s) found:\n      ` + bannedHits.slice(0, 6).join("\n      ")
);

// The checklist checkbox is the one audited target-size failure: 16px -> 24px
// (WCAG 2.2 SC 2.5.8). Keep the size class attached to the input.
check(
  /className="h-6 w-6 rounded text-\[#F6B73C\]/.test(
    fs.readFileSync(path.join(ROOT_DIR, "src", "App.tsx"), "utf8")
  ),
  "checklist checkbox keeps a 24px (h-6 w-6) touch target"
);

// Non-failing inventory of Tailwind colour steps that do not exist, so the
// debt is visible in CI output instead of silently rendering inherited colours.
const INVALID_STEP = /\b(?:bg|text|border|divide|ring|fill)-(?:slate|emerald|amber)-(?:150|250|350|450|550|650|750|850)\b/g;
const invalidSteps = new Set<string>();
for (const file of TSX_FILES) {
  for (const m of fs.readFileSync(file, "utf8").matchAll(INVALID_STEP)) invalidSteps.add(m[0]);
}
if (invalidSteps.size > 0) {
  console.log(
    `  [warn] ${invalidSteps.size} non-existent Tailwind colour step(s) still in use ` +
      `(silently ignored today; fixing them CHANGES colours — do it as its own visual pass): ` +
      [...invalidSteps].sort().join(", ")
  );
}

// --- 2e. Security-header & source-map guards (Best Practices) ---------------
//
// Lighthouse's Best Practices category reported one scored failure (console
// errors) and five INFORMATIVE "Trust and Safety" items. Informative audits
// cannot move the score, but the headers behind them are cheap and real, so
// they are asserted here: a future edit that drops HSTS, weakens COOP to
// `unsafe-none`, or removes the clickjacking defence fails the build instead of
// quietly showing up in the next report.

const securityChecks: Array<[string, RegExp]> = [
  ["Strict-Transport-Security with max-age>=1y + includeSubDomains + preload",
   /Strict-Transport-Security:\s*max-age=(\d{8,})[^\n]*includeSubDomains[^\n]*preload/i],
  ["X-Frame-Options SAMEORIGIN", /X-Frame-Options:\s*SAMEORIGIN/i],
  ["Cross-Origin-Opener-Policy (popup-safe value)",
   /Cross-Origin-Opener-Policy:\s*(same-origin-allow-popups|same-origin|noopener-allow-popups)/i],
  ["CSP with frame-ancestors (clickjacking)", /Content-Security-Policy:[^\n]*frame-ancestors/i],
  ["X-Content-Type-Options: nosniff", /X-Content-Type-Options:\s*nosniff/i],
  ["Referrer-Policy", /Referrer-Policy:\s*strict-origin-when-cross-origin/i],
];
const missingSecurity = securityChecks
  .filter(([, pattern]) => !pattern.test(headersFile))
  .map(([label]) => label);
check(
  missingSecurity.length === 0,
  missingSecurity.length === 0
    ? `public/_headers keeps all ${securityChecks.length} security headers (HSTS, XFO, COOP, CSP frame-ancestors, nosniff, referrer-policy)`
    : `missing/weakened security header(s): ${missingSecurity.join("; ")}`
);

// A COOP value of `unsafe-none` would pass the regex above only if the header
// were absent, but assert the negative explicitly: it is the one value that
// silently disables origin isolation while looking like a policy.
check(
  !/Cross-Origin-Opener-Policy:\s*unsafe-none/i.test(headersFile),
  "COOP is not set to unsafe-none"
);

// Source maps must actually ship for every emitted JS chunk — the config flag
// is easy to lose in a refactor, and Lighthouse only reports the symptom.
const distAssetsDir = path.join(DIST_DIR, "assets");
const jsChunks = fs.existsSync(distAssetsDir)
  ? fs.readdirSync(distAssetsDir).filter((f) => f.endsWith(".js"))
  : [];
const missingMaps = jsChunks.filter(
  (f) => !fs.existsSync(path.join(distAssetsDir, `${f}.map`))
);
check(
  jsChunks.length > 0 && missingMaps.length === 0,
  missingMaps.length === 0
    ? `every emitted JS chunk ships a source map (${jsChunks.length} chunks)`
    : `${missingMaps.length} chunk(s) without a .map: ${missingMaps.slice(0, 5).join(", ")}`
);

// Affiliate-script consent gate, scope: every visitor (Appendix D.1.5).
//
// The privacy policy lists emrld.ltd as a MARKETING processor and the consent
// banner is shown to everyone, so the gate no longer depends on the visitor's
// country. Two halves must stay true:
//   (a) functions/_middleware.js is redirect-only again - it must not read,
//       re-encode or re-emit response bodies (the `data-consent-region` stamp it
//       used to add is gone). A middleware that buffers HTML is also the thing
//       that can strip a Content-Encoding or break 304 revalidation.
//   (b) the shell loader injects the script only when marketing consent is
//       granted - for every visitor, with no region escape hatch - while keeping
//       the viewport laziness from Phase 3B.
// (b) is exercised for real below, with the loader's own source and a stub DOM.
const middlewareRaw = read(path.join(ROOT_DIR, "functions", "_middleware.js")) ?? "";
// Strip comments before scanning: the file explains *why* it no longer tags
// regions, and prose about the old behaviour must not read as the behaviour.
const middlewareSrc = middlewareRaw
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
const middlewareForbidden: Array<[string, RegExp]> = [
  ["no region tagging", /data-consent-region/],
  ["no country lookup", /request\.cf/],
  ["does not read response bodies", /response\.text\(\)/],
  ["does not rebuild responses", /new Response\(/],
  ["does not strip headers", /headers\.delete\(/],
];
const middlewareViolations = middlewareForbidden
  .filter(([, pattern]) => pattern.test(middlewareSrc))
  .map(([label]) => label);
check(
  middlewareViolations.length === 0 && /return context\.next\(\)/.test(middlewareSrc),
  middlewareViolations.length === 0
    ? `functions/_middleware.js is redirect-only (${middlewareForbidden.length} body-rewrite patterns absent)`
    : `middleware touches response bodies again: ${middlewareViolations.join("; ")}`
);

const shellHtml = read(path.join(ROOT_DIR, "index.html")) ?? "";
const gatingChecks: Array<[string, RegExp]> = [
  ["no region escape hatch", /^(?!.*data-consent-region)(?!.*consent_region)[\s\S]*$/],
  ["checks the marketing category, not just the banner choice", /cookie-consent-settings[\s\S]{0,120}marketing/],
  ["reads the consent choice before loading", /localStorage\.getItem\('cookie-consent'\)/],
  ["still defers to viewport intersection (Phase 3B)", /IntersectionObserver[\s\S]{0,200}rootMargin/],
  ["reacts to consent granted later", /ural:consent-updated/],
];
const gateProblems = gatingChecks
  .filter(([, pattern]) => !pattern.test(shellHtml))
  .map(([label]) => label);
check(
  gateProblems.length === 0,
  gateProblems.length === 0
    ? `affiliate-script gate intact for every visitor (${gatingChecks.length} properties: unconditional, marketing category, lazy-load, consent event)`
    : `consent gate broken/missing: ${gateProblems.join("; ")}`
);

// ...and the same invariant in the SHELL THAT SHIPS. The checks above read the
// source; this one reads dist/index.html, so a build step that reintroduces the
// region stamp (or drops the loader) cannot pass unnoticed.
check(
  distIndexHtml !== null &&
    !distIndexHtml.includes("data-consent-region") &&
    distIndexHtml.includes("function marketingAllowed()"),
  "the shipped dist/index.html carries the unconditional gate and no region stamp"
);

// --- 2f. Behavioural tests ---------------------------------------------------
//
// The checks above assert *shape*; these run the real code. Part 1 drives
// functions/_middleware.js with fake requests - the invariant that matters now
// is that it passes everything through untouched. Part 2 extracts the inline
// affiliate loader from index.html and executes it against a stub DOM, because
// the gate's actual decision (storage -> inject or not) is the one thing a regex
// can only pretend to verify.
const { onRequest } = await import("../functions/_middleware.js");

const SAMPLE_HTML =
  '<!doctype html><html lang="en-BD"><head><title>t</title></head><body>ok</body></html>';

function fakeContext(
  options: { url?: string; contentType?: string; status?: number; country?: string } = {}
) {
  const url = options.url ?? "https://ural-travel.pages.dev/";
  const status = options.status ?? 200;
  return {
    request: { url, cf: options.country ? { country: options.country } : undefined },
    next: async () => {
      // 304 must be constructed without a body (the runtime rejects one).
      return new Response(status === 304 ? null : SAMPLE_HTML, {
        status,
        headers: {
          "content-type": options.contentType ?? "text/html; charset=utf-8",
          etag: 'W/"abc123"',
          "last-modified": "Thu, 02 Oct 2026 00:00:00 GMT",
          "content-length": String(SAMPLE_HTML.length),
          "content-encoding": "gzip",
        },
      });
    },
  };
}

const middlewareFailures: string[] = [];
async function middlewareCase(label: string, run: () => Promise<void>) {
  try {
    await run();
  } catch (error) {
    middlewareFailures.push(`${label}: ${(error as Error).message}`);
  }
}

await middlewareCase("HTML passes through byte-identical, validators intact", async () => {
  const response = await (onRequest as any)(fakeContext({ country: "DE" }));
  const body = await response.text();
  if (body !== SAMPLE_HTML) throw new Error("body was modified");
  if (response.status !== 200) throw new Error(`status ${response.status}`);
  if (response.headers.get("etag") !== 'W/"abc123"') throw new Error("etag dropped");
  if (response.headers.get("content-encoding") !== "gzip") throw new Error("content-encoding dropped");
  if (response.headers.get("content-length") !== String(SAMPLE_HTML.length)) {
    throw new Error("content-length changed");
  }
});

await middlewareCase("a GDPR country is treated exactly like any other", async () => {
  const de = await (onRequest as any)(fakeContext({ country: "DE" }));
  const bd = await (onRequest as any)(fakeContext({ country: "BD" }));
  if ((await de.text()) !== (await bd.text())) throw new Error("response differs by country");
});

await middlewareCase("304 responses stay bodyless", async () => {
  const response = await (onRequest as any)(fakeContext({ status: 304 }));
  if (response.status !== 304) throw new Error(`status changed to ${response.status}`);
  if ((await response.text()).length > 0) throw new Error("a body was attached to a 304");
});

await middlewareCase("legacy route redirects still work", async () => {
  const response = await (onRequest as any)(
    fakeContext({ url: "https://ural-travel.pages.dev/flights?route=dhaka-bangkok" })
  );
  if (response.status !== 301) throw new Error(`expected 301, got ${response.status}`);
  const location = response.headers.get("location") ?? "";
  if (!location.endsWith("/flights/dhaka-bangkok")) throw new Error(`bad redirect target: ${location}`);
});

check(
  middlewareFailures.length === 0,
  middlewareFailures.length === 0
    ? "middleware passes responses through untouched (4 cases: byte-identical, country-independent, 304 intact, legacy redirect intact)"
    : `middleware misbehaves: ${middlewareFailures.join("; ")}`
);

// --- the affiliate loader's actual consent decision -------------------------
const loaderSource = extractAffiliateLoader(shellHtml);

interface LoaderRun {
  injected: string[];
  fireConsentUpdate: () => void;
}

function runAffiliateLoader(storage: Record<string, string>): LoaderRun {
  const injected: string[] = [];
  const listeners: Array<() => void> = [];
  const fakeWindow: any = {
    addEventListener: (name: string, callback: () => void) => {
      if (name === "ural:consent-updated") listeners.push(callback);
    },
  };
  const fakeDocument: any = {
    addEventListener: () => {},
    querySelector: () => null,
    createElement: () => ({ async: false, onerror: null, src: "" }),
    head: {
      appendChild: (element: { src: string }) => {
        injected.push(element.src);
      },
    },
  };
  const fakeLocalStorage = {
    getItem: (key: string) => (key in storage ? storage[key] : null),
  };
  // No IntersectionObserver on the stub window, so the loader takes its
  // non-observer branch and calls attempt() immediately - which is exactly the
  // decision under test.
  // eslint-disable-next-line no-new-func
  new Function("window", "document", "localStorage", "location", loaderSource)(
    fakeWindow,
    fakeDocument,
    fakeLocalStorage,
    { search: "" }
  );
  return { injected, fireConsentUpdate: () => listeners.forEach((callback) => callback()) };
}

const loaderFailures: string[] = [];
const EMRldUrl = "https://emrld.ltd/";

function loaderCase(label: string, storage: Record<string, string>, expectInjected: boolean, afterConsent?: Record<string, string>) {
  try {
    // Same object reference on purpose: the "granted later" case mutates this
    // storage after the loader has started, and localStorage is read live.
    const run = runAffiliateLoader(storage);
    if (expectInjected && !run.injected.some((url) => url.startsWith(EMRldUrl))) {
      throw new Error("script was NOT injected but should have been");
    }
    if (!expectInjected && run.injected.length > 0) {
      throw new Error(`script was injected without marketing consent (${run.injected[0]})`);
    }
    if (afterConsent) {
      Object.assign(storage, afterConsent);
      run.fireConsentUpdate();
      const injectedLater = run.injected.some((url) => url.startsWith(EMRldUrl));
      if (!injectedLater) throw new Error("script did not start after ural:consent-updated");
      if (run.injected.length !== 1) throw new Error(`script injected ${run.injected.length} times`);
    }
  } catch (error) {
    loaderFailures.push(`${label}: ${(error as Error).message}`);
  }
}

loaderCase("no consent recorded yet", {}, false, { "cookie-consent": "accepted" });
loaderCase("Accept all", { "cookie-consent": "accepted" }, true);
loaderCase("custom with marketing on", { "cookie-consent": "custom", "cookie-consent-settings": '{"marketing":true}' }, true);
loaderCase("custom with marketing off", { "cookie-consent": "custom", "cookie-consent-settings": '{"marketing":false}' }, false);
loaderCase("declined", { "cookie-consent": "declined" }, false);
loaderCase("unreadable settings", { "cookie-consent": "custom", "cookie-consent-settings": "not json" }, false);

check(
  loaderSource.length > 0 && loaderFailures.length === 0,
  loaderFailures.length === 0
    ? "affiliate loader gates on marketing consent in all cases (6: none yet -> injected on grant, accept-all, custom+marketing, custom-without, declined, unreadable)"
    : `affiliate loader misbehaves: ${loaderFailures.join("; ")}`
);

// --- 3. Sitemap: structure + the lastmod invariant --------------------------: structure + the lastmod invariant --------------------------

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

// --- 13. Blog body split (constants.ts -> lazily loaded blogContent.ts) ------
//
// The 43 English article bodies used to sit in constants.ts, which every page
// downloads eagerly. They now live in src/data/blogContent.ts and are imported
// only on blog routes, ~60 KB (gzip) lighter on every other page. The risk this
// trades for is an SEO one: the body must still be *in* the prerendered HTML,
// and the split must not silently undo itself. Both halves are asserted here.

{
  const missingBodies = BLOG_DATA.filter(
    (post) => !BLOG_BODY[post.slug] || BLOG_BODY[post.slug].trim().length === 0
  ).map((post) => post.slug);
  check(
    missingBodies.length === 0,
    missingBodies.length === 0
      ? `every blog post has a body in src/data/blogContent.ts (${BLOG_DATA.length}/${BLOG_DATA.length})`
      : `${missingBodies.length} blog post(s) have no body in blogContent.ts: ` +
          `${missingBodies.slice(0, 3).join(", ")} — the article would prerender empty`
  );

  const inlineBodies = BLOG_DATA.filter((post) => (post as { content?: string }).content).length;
  check(
    inlineBodies === 0,
    inlineBodies === 0
      ? "no English blog body is left inline in constants.ts (split still effective)"
      : `${inlineBodies} blog post(s) still carry an inline body in constants.ts, ` +
          `which puts ~${Math.round(inlineBodies * 3.7)} KB back into every page's initial download`
  );

  // Every paragraph of every body must survive into its prerendered page. The
  // HTML escapes entities, so both sides are normalised the same way first.
  const normalise = (value: string) =>
    value
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&apos;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  const emptyPrerenders: string[] = [];
  const truncatedPrerenders: string[] = [];
  for (const [slug, body] of Object.entries(BLOG_BODY)) {
    const html = read(path.join(DIST_DIR, "blog", `${slug}.html`));
    if (!html) {
      emptyPrerenders.push(slug);
      continue;
    }
    const page = normalise(html);
    const paragraphs = body.split("\n\n").map((para) => para.trim()).filter(Boolean);
    const missing = paragraphs.filter((para) => !page.includes(normalise(para)));
    if (missing.length > 0) truncatedPrerenders.push(`${slug} (${missing.length}/${paragraphs.length})`);
  }
  check(
    emptyPrerenders.length === 0,
    emptyPrerenders.length === 0
      ? `all ${Object.keys(BLOG_BODY).length} blog routes prerender to dist/blog/<slug>.html`
      : `${emptyPrerenders.length} blog route(s) have no prerendered HTML: ${emptyPrerenders.slice(0, 3).join(", ")}`
  );
  check(
    truncatedPrerenders.length === 0,
    truncatedPrerenders.length === 0
      ? `every blog paragraph survives into its prerendered HTML (${BLOG_DATA.length} articles, full text)`
      : `${truncatedPrerenders.length} prerendered blog page(s) are missing body text: ` +
          `${truncatedPrerenders.slice(0, 3).join(", ")} — Google would index a truncated article`
  );

  // The other half: the body must NOT be in what a non-blog page downloads.
  const indexHtml = read(path.join(DIST_DIR, "index.html")) ?? "";
  const eagerScripts = [
    ...indexHtml.matchAll(/<script[^>]*type="module"[^>]*src="([^"]+)"/g),
  ].map((m) => m[1]);
  const eagerPreloads = [
    ...indexHtml.matchAll(/<link rel="modulepreload"[^>]*href="([^"]+)"/g),
  ].map((m) => m[1]);
  const eagerCode = [...new Set([...eagerScripts, ...eagerPreloads])]
    .map((url) => read(path.join(DIST_DIR, url.replace(/^\//, ""))) ?? "")
    .join("");

  const probeSlug = BLOG_DATA[0]?.slug ?? "";
  const probeParagraph = (BLOG_BODY[probeSlug] ?? "")
    .split("\n\n")
    .map((para) => para.trim())
    .find((para) => para.length > 120) ?? "";
  const bodyLeakedIntoEager = probeParagraph.length > 0 && eagerCode.includes(probeParagraph.slice(0, 120));
  check(
    !bodyLeakedIntoEager,
    bodyLeakedIntoEager
      ? "blog body text is back in the eager chunks loaded by dist/index.html " +
          "(blogContent.ts must stay a dynamic import — see the warning in that file)"
      : `blog body text stays out of the ${new Set([...eagerScripts, ...eagerPreloads]).size} eager chunk(s) on non-blog pages`
  );

  // Budget guard: the whole point of this split is that non-blog pages download
  // less. The ceiling sits just above today's measured value so a legitimate new
  // feature has room, but re-inlining the article bodies (~+62 KB gzip) fails.
  const EAGER_JS_BUDGET_KB = 300;
  const eagerGzipKb =
    [...new Set([...eagerScripts, ...eagerPreloads])].reduce((total, url) => {
      const file = path.join(DIST_DIR, url.replace(/^\//, ""));
      if (!fs.existsSync(file)) return total;
      return total + zlib.gzipSync(fs.readFileSync(file), { level: 9 }).length / 1024;
    }, 0);
  check(
    eagerGzipKb <= EAGER_JS_BUDGET_KB,
    eagerGzipKb <= EAGER_JS_BUDGET_KB
      ? `eager JS stays within the ${EAGER_JS_BUDGET_KB} KB gzip budget (measured ${eagerGzipKb.toFixed(1)} KB)`
      : `eager JS is ${eagerGzipKb.toFixed(1)} KB gzip, over the ${EAGER_JS_BUDGET_KB} KB budget — ` +
          "something that belongs in a route-level chunk went back into the entry graph"
  );

  // And it must be reachable without waiting for React to mount: blog pages
  // carry a modulepreload for the body chunk, so the fetch starts at HTML parse.
  const blogHtmlSample = read(path.join(DIST_DIR, "blog", `${probeSlug}.html`)) ?? "";
  const blogHasPreload = /<link rel="modulepreload"[^>]*blog-content[^>]*>/.test(blogHtmlSample);
  check(
    blogHasPreload,
    blogHasPreload
      ? "blog pages modulepreload the body chunk (no wait for React to mount)"
      : "blog pages do not modulepreload the body chunk — a cold article load waits for hydration; " +
          "check getBlogBodyChunkPath() in scripts/prerender.ts"
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
