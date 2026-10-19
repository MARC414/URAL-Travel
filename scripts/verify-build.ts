import { getTravellerCheck } from "../src/utils/travellerChecks";
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
 *     every sitemap entry is either a blog post with its own ISO publication
 *     timestamp (or explicit editorial update date when available), or a
 *     data-driven page carrying the committed CONTENT_UPDATED date. This is
 *     what stops the build-date regression from returning.
 *   - Blog image count is asserted against BLOG_DATA.length, so it is
 *     self-maintaining rather than a magic number.
 */
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { validateSitemapPair } from "./sitemapValidation";
import { fileURLToPath } from "node:url";
import { CONTENT_UPDATED } from "../src/data/contentMeta";
import { BLOG_DATA, DESTINATIONS_DATA, FLIGHTS_DATA, TRIP_COSTS_DATA, VISA_DATA } from "../src/constants";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "../src/components/AffiliatePartners";
import {
  DESTINATION_AFFILIATE_PARTNERS,
  DESTINATION_PARTNER_COPY,
  DESTINATION_RELATED_BLOG_SLUGS,
} from "../src/data/destinationResources";
import { BLOG_POST_COUNT, BLOG_SLUGS } from "../src/data/blogIndex";
import { SCHEDULED_BLOG_ALT_TEXT } from "../src/data/scheduledBlogIndex.generated";
import { BLOG_BODY } from "../src/data/blogContent";
import { loadScheduledBlogPosts } from "./scheduledPosts";
import {
  BENGALI_BLOG_OVERRIDES,
  getLocalizedBlogs,
  getLocalizedCosts,
  getLocalizedDestinations,
  getLocalizedFlights,
  getLocalizedHajjFaqs,
  getLocalizedVisas,
} from "../src/data/bengaliContent";
import { EDITOR_PROFILE } from "../src/data/authorProfiles";
import {
  getVisibleBlogFaqSection,
  getVisibleBlogHowTos,
} from "../src/utils/blogStructuredData";
import { COMMONLY_MISREAD } from "../src/data/visaFreeData";
import { LANDING_DESTINATION_FAQS, LANDING_VISA_FAQS } from "../src/utils/faqSchema";
import { collectionPageSchema } from "../src/utils/schema";
import { BN_BREADCRUMB_LABELS } from "../src/utils/localeRoutes";
import {
  buildResponsiveSrcSet,
  RESPONSIVE_IMAGE_BREAKPOINTS,
  RESPONSIVE_IMAGE_HEIGHTS,
} from "../src/utils/imageAssets";
import {
  cleanBlogTitleForAlt,
  CURATED_BLOG_SCENES,
  generateBlogCoverAltText,
} from "../src/utils/blogAltText";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import App from "../src/App";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";
import { UmrahBudgetCalculator } from "../src/components/UmrahBudgetCalculator";
import { calculateUmrahBudget, emptyUmrahBudget, UMRAH_BUDGET_ITEMS } from "../src/utils/umrahBudget";
import ContactRouteView from "../src/routes/ContactRouteView";
import VisaFreeCountriesRouteView from "../src/routes/VisaFreeCountriesRouteView";

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
const blogIndexInSync =
  BLOG_POST_COUNT === BLOG_DATA.length &&
  BLOG_SLUGS.length === BLOG_DATA.length &&
  BLOG_DATA.every((post, index) => BLOG_SLUGS[index] === post.slug);
check(
  blogIndexInSync,
  blogIndexInSync
    ? `the eager blog URL index stays in sync with full metadata (${BLOG_POST_COUNT} slugs)`
    : "src/data/blogIndex.ts must match BLOG_DATA slugs and count in order"
);

const CXB_DRAFT_SLUG = "kathmandu-to-coxs-bazar-flights-route-status-booking";
const cxbScheduled = loadScheduledBlogPosts().find((post) => post.slug === CXB_DRAFT_SLUG);
const cxbHtmlRoutesExist = [
  path.join(DIST_DIR, "blog", `${CXB_DRAFT_SLUG}.html`),
  path.join(DIST_DIR, "bn", "blog", `${CXB_DRAFT_SLUG}.html`),
].every((file) => fs.existsSync(file));
const cxbFeedOutputs = [
  read(path.join(DIST_DIR, "sitemap.xml")) ?? "",
  read(path.join(DIST_DIR, "rss.xml")) ?? "",
  read(path.join(DIST_DIR, "index.html")) ?? "",
].join("\n");
const cxbIsScheduledAndPublished =
  cxbScheduled?.status === "scheduled" &&
  cxbScheduled.publishDate === "2026-10-16" &&
  cxbScheduled.englishBody.includes("no confirmed scheduled passenger service") &&
  cxbScheduled.bengaliBody.includes("নির্ধারিত যাত্রীবাহী ফ্লাইটের নিশ্চিত সময়সূচি পাওয়া যায়নি") &&
  BLOG_DATA.some((post) => post.slug === CXB_DRAFT_SLUG) &&
  cxbHtmlRoutesExist &&
  cxbFeedOutputs.includes(CXB_DRAFT_SLUG);
check(
  cxbIsScheduledAndPublished,
  cxbIsScheduledAndPublished
    ? "the bilingual Cox’s Bazar guide is scheduled for today (2026-10-16) and included in production routes, sitemap, and RSS"
    : "the Cox’s Bazar guide must be scheduled for today and present in production output",
);

const blogImgDir = path.join(DIST_DIR, "img", "blog");
const blogImages = fs.existsSync(blogImgDir)
  ? fs.readdirSync(blogImgDir).filter((f) => f.endsWith(".jpg"))
  : [];
check(
  blogImages.length === BLOG_DATA.length,
  `dist/img/blog has one JPEG per blog post (${blogImages.length}/${BLOG_DATA.length})`
);

const generatedBlogImgDir = path.join(ROOT_DIR, "public", "img", "blog");
const postSlugs = new Set(BLOG_DATA.map((post) => post.slug));
const postsMissingGeneratedImage = BLOG_DATA.filter(
  (post) => !fs.existsSync(path.join(generatedBlogImgDir, `${post.slug}.jpg`)),
).map((post) => post.slug);
const postsMissingCuratedAlt = BLOG_DATA.filter(
  (post) => !CURATED_BLOG_SCENES[post.slug] && !SCHEDULED_BLOG_ALT_TEXT[post.slug],
).map((post) => post.slug);
const orphanedCuratedAlt = Object.keys(CURATED_BLOG_SCENES).filter(
  (slug) => !postSlugs.has(slug),
);
const blogAssetMappingIsComplete =
  postsMissingGeneratedImage.length === 0 &&
  postsMissingCuratedAlt.length === 0 &&
  orphanedCuratedAlt.length === 0;
check(
  blogAssetMappingIsComplete,
  blogAssetMappingIsComplete
    ? `every blog slug has a generated cover JPEG and curated bilingual alt text (${BLOG_DATA.length}/${BLOG_DATA.length})`
    : [
        postsMissingGeneratedImage.length > 0 &&
          `missing generated cover JPEG: ${postsMissingGeneratedImage.join(", ")}`,
        postsMissingCuratedAlt.length > 0 && `missing curated alt: ${postsMissingCuratedAlt.join(", ")}`,
        orphanedCuratedAlt.length > 0 && `orphaned curated alt: ${orphanedCuratedAlt.join(", ")}`,
      ]
        .filter(Boolean)
        .join("; "),
);

const altTextIssues: string[] = [];
for (const post of BLOG_DATA) {
  for (const [locale, lang] of [["en", "en"], ["bn", "bn-BD"]] as const) {
    const alt = generateBlogCoverAltText({
      title: post.title,
      category: post.category,
      slug: post.slug,
      lang,
    });
    const hasRedundantPrefix =
      /^(?:(?:a|an)\s+)?(?:photo(?:graph)?|image|picture|graphic)\s+of\b/i.test(alt);
    const hasWrongScript =
      locale === "en"
        ? /[\u0980-\u09FF]/.test(alt)
        : !/[\u0980-\u09FF]/.test(alt);
    if (
      !alt.trim() ||
      alt.length > 125 ||
      hasRedundantPrefix ||
      !/[.!?।]$/.test(alt) ||
      hasWrongScript ||
      alt.toLowerCase().includes(post.title.toLowerCase())
    ) {
      altTextIssues.push(`${post.slug} (${locale})`);
    }
  }
}
check(
  altTextIssues.length === 0,
  `blog cover alt text is concise, localized, and scene-focused (${BLOG_DATA.length * 2 - altTextIssues.length}/${BLOG_DATA.length * 2})${
    altTextIssues.length ? `; issues: ${altTextIssues.slice(0, 5).join(", ")}` : ""
  }`,
);

const cleanedEmojiTitle = cleanBlogTitleForAlt("Bangladesh 🇧🇩 ✈️ 👨‍👩‍👧‍👦 5️⃣ travel");
const emojiOnlyTitle = cleanBlogTitleForAlt("🇧🇩 ✈️ 👨‍👩‍👧‍👦 5️⃣");
check(
  cleanedEmojiTitle === "Bangladesh travel" && emojiOnlyTitle === "",
  "title cleanup removes flag, joined, variation-selector, and keycap emoji without leftovers",
);

const localeSpecificBengaliAlt = generateBlogCoverAltText({
  slug: "nepal-vs-thailand-first-trip",
  lang: "bn-BD",
});
const localeSpecificEnglishAlt = generateBlogCoverAltText({
  slug: "nepal-vs-thailand-first-trip",
  title: "থাইল্যান্ড বনাম নেপাল",
  lang: "en-US",
});
const unsupportedLocaleBengaliAlt = generateBlogCoverAltText({
  title: "থাইল্যান্ড ভিসা নির্দেশিকা",
  lang: "fr",
});
check(
  localeSpecificBengaliAlt.includes("সূর্যোদয়ের") &&
    localeSpecificEnglishAlt.startsWith("Sunrise lights") &&
    unsupportedLocaleBengaliAlt.includes("ব্যাংককের"),
  "blog cover alt honors en/bn locale tags and detects Bengali script for unsupported locales",
);

const fallbackEnglishAlt = generateBlogCoverAltText({
  title: "Thailand visa guide [2026]",
  category: "Visa & Immigration",
});
const fallbackBengaliAlt = generateBlogCoverAltText({
  title: "থাইল্যান্ড ভিসা নির্দেশিকা",
  category: "ভিসা ও ইমিগ্রেশন",
});
check(
  fallbackEnglishAlt === "Wat Arun and the Chao Phraya riverfront in Bangkok." &&
    fallbackBengaliAlt === "ব্যাংককের চাও ফ্রায়া নদী ও ওয়াট অরুণ মন্দির।",
  "unmapped blog covers infer concise destination scenes in English and Bengali",
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

// The prerendered shells intentionally defer the React app to hydration, so
// guard the shared signup's source placement: one card after <main>, before the
// common footer, with no subscriber form nested in the footer.
const subscriptionAppSource = read(path.join(ROOT_DIR, "src", "App.tsx")) ?? "";
const subscriptionSectionPosition = subscriptionAppSource.indexOf('id="sitewide-subscription"');
const subscriptionFormPosition = subscriptionAppSource.indexOf('id="sitewide-subscription-form"');
const subscriptionEmailPosition = subscriptionAppSource.indexOf('id="sitewide-subscription-email"');
const mainClosePosition = subscriptionAppSource.lastIndexOf("</main>");
const footerPosition = subscriptionAppSource.indexOf('      <footer className=');
const footerClosePosition = subscriptionAppSource.indexOf("</footer>", footerPosition);
const subscriptionFooterSource = footerPosition === -1 || footerClosePosition === -1
  ? ""
  : subscriptionAppSource.slice(footerPosition, footerClosePosition);
const sharedSignupSourceIsValid =
  subscriptionSectionPosition > mainClosePosition &&
  subscriptionSectionPosition < footerPosition &&
  subscriptionFormPosition > subscriptionSectionPosition &&
  subscriptionFormPosition < footerPosition &&
  subscriptionEmailPosition > subscriptionFormPosition &&
  subscriptionEmailPosition < footerPosition &&
  !subscriptionFooterSource.includes("<form") &&
  !subscriptionAppSource.includes("home-deal-alert-email") &&
  !subscriptionAppSource.includes("footer-newsletter-email");
check(
  sharedSignupSourceIsValid,
  sharedSignupSourceIsValid
    ? "one shared pre-footer signup follows <main>; the footer has no signup form"
    : "shared signup should render once after <main> and before the footer, with no footer form or legacy duplicate IDs"
);

// The six tool tabs are public deep-link targets; a label or refactor must not
// silently stop `?tab=` links from selecting their corresponding tool. The
// canonical /tools/<slug> + /pre-departure URLs must stay wired end to end:
// menu links → client route table → edge 301 for legacy ?tab= → clean sitemap.
const interactiveToolsSource = read(path.join(ROOT_DIR, "src", "components", "InteractiveTools.tsx")) ?? "";
const toolsAppSource = read(path.join(ROOT_DIR, "src", "App.tsx")) ?? "";
const toolRoutesSource = read(path.join(ROOT_DIR, "src", "utils", "toolRoutes.ts")) ?? "";
const middlewareSource = read(path.join(ROOT_DIR, "functions", "_middleware.js")) ?? "";
const redirectsSource = read(path.join(ROOT_DIR, "public", "_redirects")) ?? "";
const routesConfigSource = read(path.join(ROOT_DIR, "public", "_routes.json")) ?? "";
const supportedToolTabs = ["airports", "calculator", "converter", "packing", "visa-checker", "airhelp"];
const toolDeepLinksArePreserved =
  interactiveToolsSource.includes('new URLSearchParams(window.location.search)') &&
  supportedToolTabs.every((tab) => {
    const queryChecks = interactiveToolsSource.match(new RegExp(`tab === "${tab}"`, "g")) ?? [];
    return queryChecks.length >= 2 && interactiveToolsSource.includes(`id="tool-nav-${tab}"`);
  }) &&
  // Menu / in-page links use the canonical tool paths, not query URLs.
  toolsAppSource.includes("/tools/flight-delay-claim") &&
  toolsAppSource.includes("/tools/airport-codes") &&
  toolsAppSource.includes("/tools/currency-converter") &&
  // Legacy ?tab= URLs converge in-app …
  toolsAppSource.includes("toolPathForTab") &&
  // … and at the edge (middleware rule included in _routes.json) …
  middlewareSource.includes('"/tools": { parameter: "tab"') &&
  middlewareSource.includes("LEGACY_TOOL_TAB_SLUGS") &&
  routesConfigSource.includes('"/tools"') &&
  toolRoutesSource.includes("flight-delay-claim") &&
  // … while /pre-departure is a standalone canonical page (no 301 to /sitemap).
  !redirectsSource.split("\n").some((line) => line.startsWith("/pre-departure"));
check(
  toolDeepLinksArePreserved,
  toolDeepLinksArePreserved
    ? "all six tool tabs, canonical /tools/<slug> links, legacy ?tab= edge 301s, and the standalone /pre-departure URL remain wired"
    : "tool deep links regressed: keep the six tabs, canonical /tools/<slug> menu links, the middleware ?tab= rule, and no /pre-departure→/sitemap redirect"
);

// The split routes must actually ship as prerendered static files (no SPA
// fallback exists — an unprerendered path is a hard 404 with noindex 404.html).
const expectedSplitRoutes = [
  "pre-departure.html",
  "tools/currency-converter.html",
  "tools/budget-calculator.html",
  "tools/packing-checklist.html",
  "tools/visa-checker.html",
  "tools/flight-delay-claim.html",
  "tools/airport-codes.html",
  "bn/pre-departure.html",
  "bn/tools/flight-delay-claim.html",
];
const missingSplitRoutes = expectedSplitRoutes.filter(
  (rel) => !fs.existsSync(path.join(DIST_DIR, rel))
);
check(
  missingSplitRoutes.length === 0,
  missingSplitRoutes.length === 0
    ? `all ${expectedSplitRoutes.length} split tool/pre-departure routes ship prerendered HTML (en + bn)`
    : `missing prerendered files: ${missingSplitRoutes.join(", ")}`
);

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
const staticHeroStart = distIndexHtml?.indexOf('data-pre-hydration-hero') ?? -1;
const staticHeroMainStart = distIndexHtml?.indexOf('<main', staticHeroStart) ?? -1;
const staticHeroHasPicture =
  distIndexHtml !== null &&
  staticHeroStart > distIndexHtml.indexOf('<div id="root">') &&
  staticHeroMainStart > staticHeroStart &&
  distIndexHtml.indexOf('<picture>', staticHeroStart) > staticHeroStart &&
  distIndexHtml.indexOf('<picture>', staticHeroStart) < staticHeroMainStart &&
  distIndexHtml.indexOf('class="pre-hydration-hero__image"', staticHeroStart) > staticHeroStart &&
  distIndexHtml.indexOf('class="pre-hydration-hero__image"', staticHeroStart) < staticHeroMainStart &&
  distIndexHtml.includes('width="1200" height="670" alt="Wooden sailboat deck above a sea of sunset clouds with a travel journal and camera" aria-hidden="true" loading="eager" fetchpriority="high"');
check(
  staticHeroHasPicture,
  staticHeroHasPicture
    ? "the homepage's pre-hydration hero picture/image is in #root before its SEO directory"
    : "the homepage must put a sized, high-priority hero <picture>/<img> in #root before the SEO directory"
);
const staticHeroMarkup =
  staticHeroStart >= 0 && staticHeroMainStart > staticHeroStart
    ? distIndexHtml!.slice(staticHeroStart, staticHeroMainStart)
    : "";
const staticHeroHasCopyAndCtas =
  /<h1[^>]*class="pre-hydration-hero__title"[^>]*>[\s\S]*?Plan Your Trip/.test(staticHeroMarkup) &&
  staticHeroMarkup.includes("Flights, hotels, visas, and destination guides") &&
  staticHeroMarkup.includes('href="/flights"') &&
  staticHeroMarkup.includes('href="/hotels"');
check(
  staticHeroHasCopyAndCtas,
  staticHeroHasCopyAndCtas
    ? "the pre-hydration hero includes its visible h1, description, and primary flight/hotel CTAs"
    : "the initial homepage HTML must include the hero h1, description, and primary flight/hotel CTAs"
);

// The srcset string matching is not enough: a typo in the extension would ship a
// preload pointing at a 404 and nothing else would notice.
check(
  RESONSIVE_AVIF_HERO_FILES.every((f) => fs.existsSync(path.join(responsiveImgDir, f))),
  "the 3 hero AVIF files referenced by the shell preload exist in dist"
);

// (1e) every <img> in shipped HTML carries a non-empty alt attribute.
//
// Bing Webmaster reports "Alt attribute for images is missing" for the homepage
// when the prerendered hero <img> ships alt="" — an empty alt is a missing alt to
// the crawler, even though it is the correct ARIA pattern for a purely decorative
// image. Every shipped image therefore gets descriptive alt text (kept on the
// aria-hidden decorations too, where screen readers still ignore it).
function imgsMissingAlt(html: string): string[] {
  return [...html.matchAll(/<img\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => {
      const alt = tag.match(/\balt="([^"]*)"/);
      return !alt || alt[1].trim() === "";
    });
}
{
  const offenders: string[] = [];
  for (const file of distHtmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    for (const tag of imgsMissingAlt(html)) {
      offenders.push(`${path.relative(DIST_DIR, file)} → ${tag.slice(0, 110)}`);
    }
  }
  check(
    offenders.length === 0,
    offenders.length === 0
      ? `every <img> in ${distHtmlFiles.length} shipped HTML files carries a non-empty alt attribute`
      : `${offenders.length} <img> tag(s) missing alt text: ${offenders.slice(0, 5).join(" | ")}`
  );
  const negativeControl = imgsMissingAlt(distIndexHtml ?? "");
  const emptiedHero = (distIndexHtml ?? "").replace(
    /alt="Wooden sailboat deck above a sea of sunset clouds with a travel journal and camera"/,
    'alt=""'
  );
  check(
    negativeControl.length === 0 && imgsMissingAlt(emptiedHero).length >= 1,
    "alt guard rejects the homepage hero when its alt text is emptied (negative control)"
  );
}

// (1e-2) the client-rendered images (hero background, partner logos, subscription
// background, blog hero) are not in the prerendered HTML, so guard the sources:
// an `alt=""` in JSX is exactly what Bing flags once the page hydrates.
{
  const emptyAltInSources: string[] = [];
  const scanDir = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scanDir(full);
      else if (entry.name.endsWith(".tsx")) {
        const src = fs.readFileSync(full, "utf8");
        if (/alt=\{?""\}?/.test(src)) emptyAltInSources.push(path.relative(ROOT_DIR, full));
      }
    }
  };
  scanDir(path.join(ROOT_DIR, "src"));
  check(
    emptyAltInSources.length === 0,
    emptyAltInSources.length === 0
      ? "no React source ships an empty alt=\"\" on an image (Bing: alt attribute missing)"
      : `source file(s) with empty image alt: ${emptyAltInSources.join(", ")}`
  );
  check(
    /alt=\{?""\}?/.test('<img alt="" />') && !/alt=\{?""\}?/.test('<img alt="URAL" />'),
    "source alt guard flags alt=\"\" and accepts descriptive alt (negative control)"
  );
}

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

  // every optimized photo referenced from source has intrinsic dimensions.
  // `getResponsiveImageDimensions` THROWS without an entry, and a throw inside a
  // client-rendered route view blanks the page: /contact and /bn/contact shipped
  // empty because the support-desk hero was added without its height. The
  // prerender's <link rel="preload"> path never performs that lookup, so the
  // build stayed green and only a rendered page could show it (see the footer
  // section below for the same lesson).
  const dimensionProblems: string[] = [];
  let imageReferences = 0;
  const referenceFiles = [
    ...collectSourceFiles(path.join(ROOT_DIR, "src")),
    ...collectSourceFiles(path.join(ROOT_DIR, "scripts")),
  ];
  for (const file of referenceFiles) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(
      /\/assets\/images\/([A-Za-z0-9_-]+?)-(?:640|960|1200)\.(?:webp|avif)/g
    )) {
      imageReferences += 1;
      if (!(match[1] in RESPONSIVE_IMAGE_HEIGHTS)) {
        dimensionProblems.push(`${path.relative(ROOT_DIR, file)} → ${match[1]}`);
      }
    }
  }
  check(
    imageReferences > 0 && dimensionProblems.length === 0,
    dimensionProblems.length === 0
      ? `all ${imageReferences} optimized-image references carry intrinsic dimensions`
      : `${dimensionProblems.length} image reference(s) missing from RESPONSIVE_IMAGE_HEIGHTS — the page renders blank: ` +
          dimensionProblems.slice(0, 3).join(", ")
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
  const isBn = rel.startsWith(`bn${path.sep}`) || rel === `bn${path.sep}index.html`;
  const hasNoto = html.includes('href="/fonts/noto-sans-bengali-400-v1.woff2"');
  const hasInter = html.includes('href="/fonts/inter-400-v1.woff2"');
  const hasInter700 = html.includes('href="/fonts/inter-700-v1.woff2"');
  const isEnglishHomepage = rel === "index.html";
  if (isBn && !hasNoto) fontProblems.push(`${rel}: Bengali page without Noto preload`);
  if (isBn && hasInter) fontProblems.push(`${rel}: Bengali page still preloading Inter`);
  if (!isBn && !hasInter) fontProblems.push(`${rel}: English page without Inter preload`);
  if (!isBn && hasNoto) fontProblems.push(`${rel}: English page preloading unused Noto`);
  if (isEnglishHomepage && !hasInter700) fontProblems.push(`${rel}: English homepage without Inter 700 preload`);
  if (!isEnglishHomepage && hasInter700) fontProblems.push(`${rel}: non-homepage route preloading unused Inter 700`);
}
check(
  fontChecked > 0 && fontProblems.length === 0,
  fontProblems.length === 0
    ? `all ${fontChecked} route pages preload their locale's critical fonts (bn→Noto, en→Inter; hero Inter 700 only on /)`
    : `${fontProblems.length} page(s) with wrong font preload: ` +
        fontProblems.slice(0, 5).join(", ")
);

// (1c-2) The Bengali Taka sign U+09F3 (৳) renders on English pages (prices like
//        "৳28,000"). It must NOT sit inside the Noto Sans Bengali @font-face
//        unicode-range: if it does, that single glyph pulls the 57 KiB Bengali
//        font onto every English route's critical path (Lighthouse measured a
//        4.3 s max critical-path chain from exactly this). The range is split
//        into U+0980-09F1 + U+09F4-09FF to exclude the currency marks
//        U+09F2-09F3, so ৳ falls back to the system font. Guard both the inline
//        critical CSS shipped in the shell and the standalone fonts.css copy.
const notoRangeSources: { label: string; css: string }[] = [];
if (distIndexHtml) {
  notoRangeSources.push({ label: "index.html inline @font-face", css: distIndexHtml });
}
const distFontsCssPath = path.join(DIST_DIR, "fonts", "fonts.css");
if (fs.existsSync(distFontsCssPath)) {
  notoRangeSources.push({
    label: "dist/fonts/fonts.css",
    css: fs.readFileSync(distFontsCssPath, "utf8"),
  });
}
const notoRangeProblems: string[] = [];
for (const { label, css } of notoRangeSources) {
  if (!/Noto Sans Bengali/.test(css)) continue; // only inspect sources that declare the face
  // Inspect the VALUES of `unicode-range:` declarations only — not the whole
  // file — so an explanatory comment that mentions the old contiguous range
  // (as fonts.css does, on purpose) cannot trip this guard.
  const rangeValues = [...css.matchAll(/unicode-range\s*:\s*([^;}]*)/gi)].map((m) => m[1]);
  if (rangeValues.some((v) => /U\+0980-09FF/i.test(v))) {
    notoRangeProblems.push(`${label}: contiguous U+0980-09FF present in a unicode-range (must exclude ৳ U+09F3)`);
  }
  if (!rangeValues.some((v) => /U\+0980-09F1/i.test(v) && /U\+09F4-09FF/i.test(v))) {
    notoRangeProblems.push(`${label}: split range U+0980-09F1 + U+09F4-09FF not found in any unicode-range`);
  }
}
check(
  notoRangeSources.length > 0 && notoRangeProblems.length === 0,
  notoRangeProblems.length === 0
    ? `Noto Bengali unicode-range excludes the Taka sign U+09F3 in ${notoRangeSources.length} source(s) (keeps the 57 KiB Bengali font off the English critical path)`
    : notoRangeProblems.join("; ")
);

// The deferred GTM loader is still delayed until interaction / 3 seconds, but
// its origin handshake is warmed after the LCP and font preloads. This is a
// shell-level hint that prerenderDistHtmlFiles() must carry through to every
// canonical route. Keep exactly one no-cors preconnect: gtm.js is a classic
// script without `crossorigin`, and consent defaults remain enforced below.
const gtmPreconnectProblems: string[] = [];
let gtmPreconnectRoutes = 0;
for (const file of distHtmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('id="root"')) continue;
  gtmPreconnectRoutes++;
  const gtmPreconnects = [...html.matchAll(/<link\b[^>]*>/g)]
    .map((match) => match[0])
    .filter(
      (tag) =>
        /\brel="preconnect"/.test(tag) &&
        /\bhref="https:\/\/www\.googletagmanager\.com"/.test(tag)
    );
  if (gtmPreconnects.length !== 1 || /\bcrossorigin(?:\s|=|>)/i.test(gtmPreconnects[0] ?? "")) {
    gtmPreconnectProblems.push(path.relative(DIST_DIR, file));
  }
}
const shellForPreconnectOrder = distIndexHtml ?? "";
const shellLcpPreloadIndex = shellForPreconnectOrder.indexOf('<link rel="preload" as="image"');
const shellFontPreloadIndex = shellForPreconnectOrder.indexOf('href="/fonts/inter-400-v1.woff2"');
const shellGtmPreconnectIndex = shellForPreconnectOrder.indexOf(
  'href="https://www.googletagmanager.com"'
);
const gtmPreconnectAfterCriticalPreloads =
  shellLcpPreloadIndex !== -1 &&
  shellFontPreloadIndex > shellLcpPreloadIndex &&
  shellGtmPreconnectIndex > shellFontPreloadIndex;
check(
  gtmPreconnectRoutes === fontChecked &&
    gtmPreconnectRoutes > 0 &&
    gtmPreconnectProblems.length === 0 &&
    gtmPreconnectAfterCriticalPreloads,
  gtmPreconnectProblems.length === 0 &&
    gtmPreconnectRoutes === fontChecked &&
    gtmPreconnectAfterCriticalPreloads
    ? `all ${gtmPreconnectRoutes} prerendered app routes carry one no-cors GTM preconnect after LCP/font preloads`
    : `GTM preconnect missing/duplicated/mismatched on ${gtmPreconnectProblems.length} route(s), ` +
        `wrong shell ordering, or route count differs (${gtmPreconnectRoutes} vs ${fontChecked} font-checked)`
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
// The widget shell is ~20 KB gzip; the ~110 KB gzip Recharts trend chart is
// now a separate user-triggered chunk. The shell used to be fetched 260 ms
// after mount on every page that renders one, competing with the LCP image even
// for visitors who never scrolled to it. The owner approved
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
  textPrimary: token("text-primary", "#0B1426"),
  textSecondary: token("text-secondary", "#475569"),
  textMuted: token("text-muted", "#64748B"),
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
  ["semantic text-primary on white", TOKEN.textPrimary, WHITE],
  ["semantic text-secondary on brand-ivory", TOKEN.textSecondary, TOKEN.ivory],
  ["semantic text-muted on white", TOKEN.textMuted, WHITE],
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
  ["text-[11px] font-bold uppercase tracking-wider text-slate-400", "slate-400 on white card is 2.56:1 — use slate-500"],
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

// Fail on unsupported Tailwind palette steps: these classes are silently
// ignored by Tailwind, so they can make text/borders inherit unintended colors.
// Standard palette steps are 50–900 by hundreds plus 950. Match every color
// utility family (including gradients and focus rings), not just the shades
// found in the original visual audit.
const VALID_TAILWIND_COLOR_STEPS = new Set([
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
]);
const TAILWIND_COLOR_UTILITY = /\b(?:bg|text|border|divide|ring|ring-offset|fill|stroke|placeholder|outline|decoration|shadow|accent|caret|from|via|to)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\d{1,4})(?=\b|\/)/g;
const invalidSteps = new Set<string>();
for (const file of TSX_FILES) {
  for (const match of fs.readFileSync(file, "utf8").matchAll(TAILWIND_COLOR_UTILITY)) {
    if (!VALID_TAILWIND_COLOR_STEPS.has(match[1])) invalidSteps.add(match[0]);
  }
}
check(
  invalidSteps.size === 0,
  invalidSteps.size === 0
    ? "no unsupported Tailwind color palette steps remain in source"
    : `${invalidSteps.size} unsupported Tailwind color step(s): ${[...invalidSteps].sort().join(", ")}`
);

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

// Core page views are real lazy chunks, not just React.lazy wrappers around
// modules that are still statically imported by the entry.
const routeSplitAppSrc = read(path.join(ROOT_DIR, "src", "App.tsx")) ?? "";
const splitRouteViews = [
  "FlightsRouteView",
  "HotelsRouteView",
  "VisaRouteView",
  "DestinationsRouteView",
  "CostsRouteView",
  "ToolsRouteView",
  "BlogIndexRouteView",
  "BlogPostRouteView",
  "ContactRouteView",
  "AboutRouteView",
  "NotFoundRouteView",
];
const splitRouteProblems = splitRouteViews.filter((name) => {
  const dynamicImport =
    routeSplitAppSrc.includes(`const ${name} = React.lazy(() => import("./routes/${name}"))`);
  const rendered = routeSplitAppSrc.includes(`<${name} context={routeViewContext} />`);
  const chunkExists = jsChunks.some((file) => file.startsWith(`${name}-`) && file.endsWith(".js"));
  return !dynamicImport || !rendered || !chunkExists;
});
check(
  splitRouteProblems.length === 0,
  splitRouteProblems.length === 0
    ? `${splitRouteViews.length} non-home route views ship as route-specific lazy chunks`
    : `route-level code splitting regressed for: ${splitRouteProblems.join(", ")}`
);

const widgetSrc = read(path.join(ROOT_DIR, "src", "components", "TravelpayoutsWidget.jsx")) ?? "";
const chartChunkExists = jsChunks.some(
  (file) => file.startsWith("FlightPriceTrendChart-") && file.endsWith(".js")
);
const chartOnlyLoadsOnDemand =
  /const FlightPriceTrendChart = React\.lazy\(\(\) => import\('\.\/FlightPriceTrendChart\.jsx'\)\)/.test(widgetSrc) &&
  /showPriceTrendChart, setShowPriceTrendChart\] = useState\(false\)/.test(widgetSrc) &&
  !/from ['"]recharts['"]/.test(widgetSrc) &&
  (() => {
    const trigger = widgetSrc.indexOf("{showPriceTrendChart && (");
    const chartCard = widgetSrc.indexOf("<div id={`${instanceId}-price-trend-chart`}", trigger);
    const suspense = widgetSrc.indexOf("<React.Suspense", chartCard);
    return trigger >= 0 && chartCard > trigger && suspense > chartCard && suspense - trigger < 500;
  })() &&
  chartChunkExists;
check(
  chartOnlyLoadsOnDemand,
  chartOnlyLoadsOnDemand
    ? "Travelpayouts' Recharts fare trend is a user-triggered lazy chunk (not mounted or downloaded at widget load)"
    : "fare chart must be hidden by default, dynamically imported, and emitted as its own chunk"
);

// Below-the-fold trust and booking-hub components stay out of the eager App
// module. Their named Vite chunks prove that the dynamic imports are real (a
// React.lazy declaration alongside a static import would not save entry bytes).
const appSrc = read(path.join(ROOT_DIR, "src", "App.tsx")) ?? "";
const lazyUiCandidates = ["TrustpilotReviews", "TravelEssentials"];
const lazyUiProblems = lazyUiCandidates.flatMap((name) => {
  const dynamicImport =
    appSrc.includes(`const ${name} = React.lazy(() =>`) &&
    appSrc.includes(`import("./components/${name}")`);
  const staticImport = appSrc.split("\n").some((line) =>
    line.includes(`import { ${name} } from "./components/${name}"`)
  );
  const chunkExists = jsChunks.some((file) => file.startsWith(`${name}-`) && file.endsWith(".js"));
  return dynamicImport && !staticImport && chunkExists
    ? []
    : [`${name}: dynamic-only import / isolated chunk missing`];
});
check(
  lazyUiProblems.length === 0,
  lazyUiProblems.length === 0
    ? "TrustpilotReviews and TravelEssentials are emitted as lazy-only chunks"
    : `below-fold component split regressed: ${lazyUiProblems.join("; ")}`
);

const trustpilotRenderCount = (appSrc.match(/<TrustpilotReviews\b/g) ?? []).length;
const wrappedTrustpilotCount = (
  appSrc.match(
    /<React\.Suspense\s+fallback=\{null\}>\s*<TrustpilotReviews\s*\/>\s*<\/React\.Suspense>/g
  ) ?? []
).length;
const essentialsRenderCount = (appSrc.match(/<TravelEssentials\b/g) ?? []).length;
const wrappedEssentialsCount = (
  appSrc.match(
    /<React\.Suspense\s+fallback=\{null\}>\s*<TravelEssentials\b[\s\S]*?\/>\s*<\/React\.Suspense>/g
  ) ?? []
).length;
check(
  trustpilotRenderCount > 0 &&
    wrappedTrustpilotCount === trustpilotRenderCount &&
    essentialsRenderCount > 0 &&
    wrappedEssentialsCount === essentialsRenderCount,
  wrappedTrustpilotCount === trustpilotRenderCount &&
    wrappedEssentialsCount === essentialsRenderCount
    ? `all ${trustpilotRenderCount + essentialsRenderCount} Trustpilot/TravelEssentials render sites have Suspense boundaries`
    : `lazy UI Suspense coverage is incomplete (Trustpilot ${wrappedTrustpilotCount}/${trustpilotRenderCount}, ` +
        `TravelEssentials ${wrappedEssentialsCount}/${essentialsRenderCount})`
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

// --- 3. Sitemap: structure + the lastmod invariant --------------------------

const sitemap = read(path.join(DIST_DIR, "sitemap.xml"));
check(sitemap !== null, "dist/sitemap.xml generated");
const sitemapText = read(path.join(DIST_DIR, "sitemap.txt"));
check(sitemapText !== null, "dist/sitemap.txt generated");
for (const directory of ["public", "dist"]) {
  try {
    const urls = validateSitemapPair(
      fs.readFileSync(path.join(ROOT_DIR, directory, "sitemap.xml"), "utf8"),
      fs.readFileSync(path.join(ROOT_DIR, directory, "sitemap.txt"), "utf8"),
    );
    check(true, `${directory} sitemap is well-formed protocol XML; text backup matches all ${urls.length} URLs`);
  } catch (error) {
    check(false, `${directory} sitemap validation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
const deployedHeaders = read(path.join(DIST_DIR, "_headers")) ?? "";
for (const [file, type] of [["sitemap.xml", "application/xml"], ["sitemap.txt", "text/plain"]]) {
  const block = deployedHeaders.split(/\r?\n\r?\n/).find((part) => part.split(/\r?\n/).includes(`/${file}`));
  check(!!block?.includes(`  Content-Type: ${type}; charset=utf-8`), `dist/_headers serves /${file} as ${type}`);
}
const deployedRobots = read(path.join(DIST_DIR, "robots.txt")) ?? "";
for (const file of ["sitemap.xml", "sitemap.txt"]) {
  check(deployedRobots.includes(`Sitemap: https://ural-travel.pages.dev/${file}`), `robots.txt advertises ${file}`);
}


// The Travelpayouts widget shell is an iframe/popup target, not a landing page.
// It must stay noindex and out of the sitemap so it cannot compete with /flights.
{
  const widgetShell = read(path.join(DIST_DIR, "travelpayouts-wl.html"));
  const hasNoindex = (html: string) =>
    /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const robotsTags = (html: string) => html.match(/<meta[^>]+name=["']robots["'][^>]*>/gi) ?? [];
  check(widgetShell !== null && hasNoindex(widgetShell), "travelpayouts-wl.html carries a noindex robots meta");
  check(
    sitemap === null || !sitemap.includes("travelpayouts-wl"),
    "travelpayouts-wl is not listed in sitemap.xml"
  );
  // Negative control: the detector must fail once EVERY robots directive is gone.
  // The strip is global on purpose. It used to remove only the first match, which
  // is exactly how the duplicate below slipped through: the page carried two
  // identical tags (PR #31 added one, PR #32 added the other without seeing it),
  // so stripping one left the other and the guard still called the page clean.
  const stripped = (widgetShell ?? "").replace(/<meta[^>]+name=["']robots["'][^>]*>/gi, "");
  check(!hasNoindex(stripped), "noindex detector rejects the widget shell with its tag removed (negative control)");

  // ...and the removal has to be total, or the control above is vacuous. This
  // asserts the strip really deleted every tag rather than one of two.
  check(
    robotsTags(widgetShell ?? "").length === robotsTags(stripped).length + 1,
    "negative control removes exactly the shell's one robots directive"
  );

  // Two identical directives on one page are always a merge accident, never an
  // intent, so fail on the class rather than on this one filename. That accident
  // is what turned CI red for three consecutive merges (#32, #33, #34) while
  // every "content" check kept passing.
  const robotsTagsIn = (file: string) => robotsTags(read(file) ?? "").length;
  const overDirective: string[] = [];
  (function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) {
        const count = robotsTagsIn(full);
        if (count > 1) overDirective.push(`${path.relative(DIST_DIR, full)} (${count})`);
      }
    }
  })(DIST_DIR);
  check(
    overDirective.length === 0,
    overDirective.length === 0
      ? "no prerendered page carries a duplicated robots directive"
      : `page(s) carry more than one robots meta tag, which always means a merge kept both: ${overDirective.join(", ")}`
  );

  // Negative control for the duplicate guard: a doubled document must be caught.
  check(
    robotsTags(`${widgetShell ?? ""}${widgetShell ?? ""}`).length > 1,
    "duplicate robots-directive guard rejects a doubled shell (negative control)"
  );
}

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
  const nepalEnPath = "/destinations/nepal-guide";
  const nepalBnPath = "/bn/destinations/nepal-guide";
  const nepalEnHtml = read(path.join(DIST_DIR, "destinations/nepal-guide.html"));
  const nepalBnHtml = read(path.join(DIST_DIR, "bn/destinations/nepal-guide.html"));
  const nepalEnBlock = urlBlocks.find((block) => locOf(block).endsWith(nepalEnPath));
  const nepalBnBlock = urlBlocks.find((block) => locOf(block).endsWith(nepalBnPath));
  check(
    !!nepalEnHtml && !!nepalBnHtml &&
      nepalEnHtml.includes("Nepal Destination Guide from Bangladesh: Kathmandu &amp; Pokhara") &&
      nepalEnHtml.includes("This six-day outline connects Kathmandu") &&
      nepalBnHtml.includes("নেপাল ভ্রমণ পরিকল্পনা: কাঠমান্ডু ও পোখারা") &&
      nepalBnHtml.includes("এই ছয় দিনের রূপরেখায় কাঠমান্ডু") &&
      !nepalEnHtml.includes("BDT 20,000") &&
      !nepalBnHtml.includes("BDT 20,000"),
    "Nepal destination guide is prerendered in English and Bengali without legacy fixed trip budgets"
  );
  check(
    !!nepalEnHtml && !!nepalBnHtml && !!nepalEnBlock && !!nepalBnBlock &&
      nepalEnHtml.includes(`rel="canonical" href="${locOf(nepalEnBlock)}"`) &&
      nepalBnHtml.includes(`rel="canonical" href="${locOf(nepalBnBlock)}"`) &&
      nepalEnBlock.includes(`href="${locOf(nepalBnBlock)}"`) &&
      nepalBnBlock.includes(`href="${locOf(nepalEnBlock)}"`),
    "Nepal EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!nepalEnHtml && !!nepalBnHtml &&
      nepalEnHtml.includes("/flights") &&
      nepalBnHtml.includes("/bn/flights") &&
      !nepalEnHtml.includes("/experiences") &&
      !nepalBnHtml.includes("/bn/experiences") &&
      !nepalEnHtml.includes("free 30-day Visa on Arrival") &&
      !nepalBnHtml.includes("ফ্রি Visa on Arrival"),
    "Nepal uses destination-first navigation and avoids unsupported visa and generic activity claims"
  );

  const thailandEnPath = "/destinations/thailand-guide";
  const thailandBnPath = "/bn/destinations/thailand-guide";
  const thailandEnHtml = read(path.join(DIST_DIR, "destinations/thailand-guide.html"));
  const thailandBnHtml = read(path.join(DIST_DIR, "bn/destinations/thailand-guide.html"));
  const thailandEnBlock = urlBlocks.find((block) => locOf(block).endsWith(thailandEnPath));
  const thailandBnBlock = urlBlocks.find((block) => locOf(block).endsWith(thailandBnPath));
  check(
    !!thailandEnHtml && !!thailandBnHtml &&
      thailandEnHtml.includes("Bangkok Destination Guide from Bangladesh: Four-Day Plan") &&
      thailandEnHtml.includes("This flexible four-day outline focuses on Bangkok") &&
      thailandBnHtml.includes("থাইল্যান্ড ভ্রমণ পরিকল্পনা: ব্যাংককের নমনীয় চার দিনের গাইড") &&
      thailandBnHtml.includes("এই নমনীয় চার দিনের রূপরেখায় ব্যাংকককে") &&
      !thailandEnHtml.includes("BDT 35,000") &&
      !thailandBnHtml.includes("BDT 35,000"),
    "Thailand destination guide is prerendered in English and Bengali without legacy fixed trip budgets"
  );
  check(
    !!thailandEnHtml && !!thailandBnHtml && !!thailandEnBlock && !!thailandBnBlock &&
      thailandEnHtml.includes(`rel="canonical" href="${locOf(thailandEnBlock)}"`) &&
      thailandBnHtml.includes(`rel="canonical" href="${locOf(thailandBnBlock)}"`) &&
      thailandEnBlock.includes(`href="${locOf(thailandBnBlock)}"`) &&
      thailandBnBlock.includes(`href="${locOf(thailandEnBlock)}"`),
    "Thailand EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!thailandEnHtml && !!thailandBnHtml &&
      thailandEnHtml.includes("/flights") &&
      thailandBnHtml.includes("/bn/flights") &&
      !thailandEnHtml.includes("/experiences") &&
      !thailandBnHtml.includes("/bn/experiences") &&
      !thailandEnHtml.includes("No visa on arrival") &&
      !thailandBnHtml.includes("Visa on Arrival নেই"),
    "Thailand uses destination-first navigation and avoids unsupported visa and generic activity claims"
  );

  const singaporeEnPath = "/destinations/singapore-guide";
  const singaporeBnPath = "/bn/destinations/singapore-guide";
  const singaporeEnHtml = read(path.join(DIST_DIR, "destinations/singapore-guide.html"));
  const singaporeBnHtml = read(path.join(DIST_DIR, "bn/destinations/singapore-guide.html"));
  const singaporeEnBlock = urlBlocks.find((block) => locOf(block).endsWith(singaporeEnPath));
  const singaporeBnBlock = urlBlocks.find((block) => locOf(block).endsWith(singaporeBnPath));
  check(
    !!singaporeEnHtml && !!singaporeBnHtml &&
      singaporeEnHtml.includes("Singapore Destination Guide from Bangladesh: Four-Day Plan") &&
      singaporeEnHtml.includes("This flexible four-day outline combines Singapore") &&
      singaporeBnHtml.includes("সিঙ্গাপুর ভ্রমণ পরিকল্পনা: নমনীয় চার দিনের গাইড") &&
      singaporeBnHtml.includes("এই নমনীয় চার দিনের রূপরেখায় সিঙ্গাপুরের") &&
      !singaporeEnHtml.includes("BDT 48,000") &&
      !singaporeBnHtml.includes("BDT 48,000") &&
      !singaporeEnHtml.includes("9% Tourist GST Refund") &&
      !singaporeBnHtml.includes("৯% টুরিস্ট GST রিফান্ড"),
    "Singapore destination guide is prerendered in English and Bengali without legacy fixed prices or refund promises"
  );
  check(
    !!singaporeEnHtml && !!singaporeBnHtml && !!singaporeEnBlock && !!singaporeBnBlock &&
      singaporeEnHtml.includes(`rel="canonical" href="${locOf(singaporeEnBlock)}"`) &&
      singaporeBnHtml.includes(`rel="canonical" href="${locOf(singaporeBnBlock)}"`) &&
      singaporeEnBlock.includes(`href="${locOf(singaporeBnBlock)}"`) &&
      singaporeBnBlock.includes(`href="${locOf(singaporeEnBlock)}"`),
    "Singapore EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!singaporeEnHtml && !!singaporeBnHtml &&
      singaporeEnHtml.includes("/flights") &&
      singaporeBnHtml.includes("/bn/flights") &&
      !singaporeEnHtml.includes("/experiences") &&
      !singaporeBnHtml.includes("/bn/experiences") &&
      singaporeEnHtml.includes("Entry requirements depend on the traveler, purpose and current policy") &&
      singaporeBnHtml.includes("প্রবেশের নিয়ম ভ্রমণকারী, ভ্রমণের উদ্দেশ্য ও বর্তমান নীতির ওপর নির্ভর করে"),
    "Singapore uses destination-first navigation and directs visa questions to official guidance"
  );

  const londonEnPath = "/destinations/london-guide";
  const londonBnPath = "/bn/destinations/london-guide";
  const londonEnHtml = read(path.join(DIST_DIR, "destinations/london-guide.html"));
  const londonBnHtml = read(path.join(DIST_DIR, "bn/destinations/london-guide.html"));
  const londonEnBlock = urlBlocks.find((block) => locOf(block).endsWith(londonEnPath));
  const londonBnBlock = urlBlocks.find((block) => locOf(block).endsWith(londonBnPath));
  check(
    !!londonEnHtml && !!londonBnHtml &&
      londonEnHtml.includes("London Destination Guide from Bangladesh") &&
      londonEnHtml.includes("Westminster and the Thames") &&
      londonBnHtml.includes("বাংলাদেশ থেকে লন্ডন ভ্রমণ গাইড") &&
      londonBnHtml.includes("ওয়েস্টমিনস্টার ও টেমস নদী"),
    "London destination guide is prerendered with English and Bengali content"
  );
  check(
    !!londonEnHtml && !!londonBnHtml && !!londonEnBlock && !!londonBnBlock &&
      londonEnHtml.includes(`rel="canonical" href="${locOf(londonEnBlock)}"`) &&
      londonBnHtml.includes(`rel="canonical" href="${locOf(londonBnBlock)}"`) &&
      londonEnHtml.includes('hreflang="bn-bd"') &&
      londonBnHtml.includes('hreflang="en-bd"') &&
      londonEnBlock.includes(`href="${locOf(londonBnBlock)}"`) &&
      londonBnBlock.includes(`href="${locOf(londonEnBlock)}"`),
    "London EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!londonEnHtml && !!londonBnHtml &&
      londonEnHtml.includes("/experiences?region=west&amp;city=london") &&
      londonBnHtml.includes("/bn/experiences?region=west&amp;city=london") &&
      londonBnHtml.includes('"inLanguage":"bn-BD"') &&
      londonBnHtml.includes("আপনার পছন্দের লন্ডন দর্শনীয় স্থান") &&
      !londonEnHtml.includes('"@type":"Offer"') &&
      !londonBnHtml.includes('"@type":"Offer"'),
    "London keeps filtered activities secondary, localizes TouristTrip schema and emits no unsupported trip-price Offer"
  );

  const italyEnPath = "/destinations/italy-guide";
  const italyBnPath = "/bn/destinations/italy-guide";
  const italyEnHtml = read(path.join(DIST_DIR, "destinations/italy-guide.html"));
  const italyBnHtml = read(path.join(DIST_DIR, "bn/destinations/italy-guide.html"));
  const italyEnBlock = urlBlocks.find((block) => locOf(block).endsWith(italyEnPath));
  const italyBnBlock = urlBlocks.find((block) => locOf(block).endsWith(italyBnPath));
  check(
    !!italyEnHtml && !!italyBnHtml &&
      italyEnHtml.includes("Italy Itinerary from Bangladesh: Rome, Milan &amp; Venice") &&
      italyEnHtml.includes("Transfer to Venice") &&
      italyBnHtml.includes("বাংলাদেশ থেকে ইতালি ভ্রমণ পরিকল্পনা") &&
      italyBnHtml.includes("ভেনিসে যাত্রা"),
    "Italy destination guide is prerendered with English and Bengali content"
  );
  check(
    !!italyEnHtml && !!italyBnHtml && !!italyEnBlock && !!italyBnBlock &&
      italyEnHtml.includes(`rel="canonical" href="${locOf(italyEnBlock)}"`) &&
      italyBnHtml.includes(`rel="canonical" href="${locOf(italyBnBlock)}"`) &&
      italyEnBlock.includes(`href="${locOf(italyBnBlock)}"`) &&
      italyBnBlock.includes(`href="${locOf(italyEnBlock)}"`),
    "Italy EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!italyEnHtml && !!italyBnHtml &&
      italyEnHtml.includes("/experiences?region=west&amp;city=rome-italy") &&
      italyBnHtml.includes("/bn/experiences?region=west&amp;city=rome-italy") &&
      italyBnHtml.includes('"inLanguage":"bn-BD"') &&
      !italyEnHtml.includes('"@type":"Offer"') &&
      !italyBnHtml.includes('"@type":"Offer"'),
    "Italy keeps filtered activities secondary, localizes TouristTrip schema and emits no unsupported trip-price Offer"
  );

  const parisEnPath = "/destinations/paris-guide";
  const parisBnPath = "/bn/destinations/paris-guide";
  const parisEnHtml = read(path.join(DIST_DIR, "destinations/paris-guide.html"));
  const parisBnHtml = read(path.join(DIST_DIR, "bn/destinations/paris-guide.html"));
  const parisEnBlock = urlBlocks.find((block) => locOf(block).endsWith(parisEnPath));
  const parisBnBlock = urlBlocks.find((block) => locOf(block).endsWith(parisBnPath));
  check(
    !!parisEnHtml && !!parisBnHtml &&
      parisEnHtml.includes("Paris Itinerary from Bangladesh: Landmarks &amp; Planning") &&
      parisEnHtml.includes("Eiffel Tower and Seine") &&
      parisBnHtml.includes("বাংলাদেশ থেকে প্যারিস ভ্রমণ পরিকল্পনা") &&
      parisBnHtml.includes("আইফেল টাওয়ার ও সেইন"),
    "Paris destination guide is prerendered with English and Bengali content"
  );
  check(
    !!parisEnHtml && !!parisBnHtml && !!parisEnBlock && !!parisBnBlock &&
      parisEnHtml.includes(`rel="canonical" href="${locOf(parisEnBlock)}"`) &&
      parisBnHtml.includes(`rel="canonical" href="${locOf(parisBnBlock)}"`) &&
      parisEnBlock.includes(`href="${locOf(parisBnBlock)}"`) &&
      parisBnBlock.includes(`href="${locOf(parisEnBlock)}"`),
    "Paris EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!parisEnHtml && !!parisBnHtml &&
      parisEnHtml.includes("/experiences?region=west&amp;city=paris") &&
      parisBnHtml.includes("/bn/experiences?region=west&amp;city=paris") &&
      parisBnHtml.includes('"inLanguage":"bn-BD"') &&
      !parisEnHtml.includes('"@type":"Offer"') &&
      !parisBnHtml.includes('"@type":"Offer"'),
    "Paris keeps filtered activities secondary, localizes TouristTrip schema and emits no unsupported trip-price Offer"
  );

  const newYorkEnPath = "/destinations/new-york-guide";
  const newYorkBnPath = "/bn/destinations/new-york-guide";
  const newYorkEnHtml = read(path.join(DIST_DIR, "destinations/new-york-guide.html"));
  const newYorkBnHtml = read(path.join(DIST_DIR, "bn/destinations/new-york-guide.html"));
  const newYorkEnBlock = urlBlocks.find((block) => locOf(block).endsWith(newYorkEnPath));
  const newYorkBnBlock = urlBlocks.find((block) => locOf(block).endsWith(newYorkBnPath));
  check(
    !!newYorkEnHtml && !!newYorkBnHtml &&
      newYorkEnHtml.includes("New York City Itinerary from Bangladesh: Landmarks &amp; Planning") &&
      newYorkEnHtml.includes("Harbor and Statue of Liberty planning") &&
      newYorkBnHtml.includes("বাংলাদেশ থেকে নিউ ইয়র্ক সিটি ভ্রমণ পরিকল্পনা") &&
      newYorkBnHtml.includes("বন্দর এলাকা ও স্ট্যাচু অব লিবার্টি পরিকল্পনা"),
    "New York City destination guide is prerendered with English and Bengali content"
  );
  check(
    !!newYorkEnHtml && !!newYorkBnHtml && !!newYorkEnBlock && !!newYorkBnBlock &&
      newYorkEnHtml.includes(`rel="canonical" href="${locOf(newYorkEnBlock)}"`) &&
      newYorkBnHtml.includes(`rel="canonical" href="${locOf(newYorkBnBlock)}"`) &&
      newYorkEnBlock.includes(`href="${locOf(newYorkBnBlock)}"`) &&
      newYorkBnBlock.includes(`href="${locOf(newYorkEnBlock)}"`),
    "New York City EN/BN canonical routes are included in the sitemap and linked by hreflang"
  );
  check(
    !!newYorkEnHtml && !!newYorkBnHtml &&
      newYorkEnHtml.includes("/experiences?region=west&amp;city=new-york") &&
      newYorkBnHtml.includes("/bn/experiences?region=west&amp;city=new-york") &&
      newYorkBnHtml.includes('"inLanguage":"bn-BD"') &&
      !newYorkEnHtml.includes('"@type":"Offer"') &&
      !newYorkBnHtml.includes('"@type":"Offer"'),
    "New York City keeps filtered activities secondary, localizes TouristTrip schema and emits no unsupported trip-price Offer"
  );
  const maldivesEnHtml = read(path.join(DIST_DIR, "destinations/maldives-guide.html"));
  const maldivesBnHtml = read(path.join(DIST_DIR, "bn/destinations/maldives-guide.html"));
  const dubaiEnHtml = read(path.join(DIST_DIR, "destinations/dubai-guide.html"));
  const dubaiBnHtml = read(path.join(DIST_DIR, "bn/destinations/dubai-guide.html"));
  check(
    !!maldivesEnHtml && !!maldivesBnHtml && !!dubaiEnHtml && !!dubaiBnHtml &&
      maldivesEnHtml.includes("Maldives Destination Guide from Bangladesh: Island Planning") &&
      maldivesEnHtml.includes("one island base") &&
      maldivesEnHtml.includes("No whole-trip total is quoted") &&
      maldivesEnHtml.includes("this page is not a visa decision") &&
      maldivesBnHtml.includes("মালদ্বীপ ভ্রমণ পরিকল্পনা") &&
      maldivesBnHtml.includes("দ্বীপ বাছাই") &&
      dubaiEnHtml.includes("Dubai Destination Guide from Bangladesh: Four-Day Plan") &&
      dubaiEnHtml.includes("Downtown sights") &&
      dubaiEnHtml.includes("No whole-trip total is quoted") &&
      dubaiEnHtml.includes("this page is not a visa decision") &&
      dubaiBnHtml.includes("দুবাই ভ্রমণ পরিকল্পনা") &&
      dubaiBnHtml.includes("নমনীয় চার দিনের গাইড"),
    "Maldives and Dubai guides are prerendered in English and Bengali with flexible plans, current-detail checks and no fixed trip total or visa assurance"
  );

  let destinationResourceLinksPresent = true;
  for (const destinationId of Object.keys(DESTINATION_RELATED_BLOG_SLUGS)) {
    const enHtml = read(path.join(DIST_DIR, "destinations", `${destinationId}.html`)) ?? "";
    const bnHtml = read(path.join(DIST_DIR, "bn/destinations", `${destinationId}.html`)) ?? "";
    const blogSlugs = DESTINATION_RELATED_BLOG_SLUGS[destinationId] ?? [];
    const partners = DESTINATION_AFFILIATE_PARTNERS[destinationId] ?? [];
    const blogLinksPresent = blogSlugs.every((slug) =>
      enHtml.includes(`href="/blog/${slug}"`) && bnHtml.includes(`href="/bn/blog/${slug}"`)
    );
    const partnerLinksPresent = partners.every((partner) => {
      const copy = DESTINATION_PARTNER_COPY[partner];
      const url = resolvePartnerUrl(AFFILIATE_LINKS[partner]);
      return enHtml.includes(url) && bnHtml.includes(url) &&
        enHtml.includes(copy.ctaEn) && bnHtml.includes(copy.ctaBn);
    });
    const destinationOk = !!enHtml && !!bnHtml && blogLinksPresent && partnerLinksPresent;
    if (!destinationOk) {
      destinationResourceLinksPresent = false;
      console.error(`[VERIFY] Missing destination resource link(s): ${destinationId}`);
    }
  }
  check(
    destinationResourceLinksPresent,
    "all ten English and Bengali destination landings expose curated existing blog links and content-matched affiliate partners"
  );

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
    const isBlogTimestamp = value.includes("T"); // ISO publish or explicit editorial update datetime
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

// --- 3b. Indexability: every prerendered page is either in the sitemap or noindex

{
  // A page that is crawlable, absent from the sitemap, and carries no `noindex`
  // is in the worst of all states: Google can find it (Googlebot renders JS, so
  // an <iframe src> or a window.open target is a discovered URL) but nothing
  // tells it what the page is for. public/travelpayouts-wl.html was exactly
  // that — a 22 KB flight-search shell with a real <title>, competing with
  // /flights as a thin duplicate. Absence from a sitemap is not a directive.
  //
  // The rule: a prerendered HTML page must be EITHER listed in sitemap.xml
  // (a destination) OR marked noindex (a shell). Never neither.
  const sitemapPaths = new Set(
    [...(sitemap ?? "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
      try {
        return new URL(m[1]).pathname.replace(/\/$/, "") || "/";
      } catch {
        return m[1];
      }
    })
  );

  // Google Search Console's verification file is a bare token page it fetches
  // directly; it is neither a destination nor something we control the head of.
  const EXEMPT = new Set(["/404", "/googlee50f8d327b90754c"]);

  const htmlPages: string[] = [];
  (function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) htmlPages.push(full);
    }
  })(DIST_DIR);

  const isNoindex = (html: string) =>
    /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

  const routeOf = (file: string) =>
    "/" +
    path
      .relative(DIST_DIR, file)
      .split(path.sep)
      .join("/")
      .replace(/\.html$/, "")
      .replace(/(^|\/)index$/, "");

  const ungoverned: string[] = [];
  for (const file of htmlPages) {
    const route = routeOf(file).replace(/\/$/, "") || "/";
    if (EXEMPT.has(route)) continue;
    if (sitemapPaths.has(route)) continue;
    if (isNoindex(fs.readFileSync(file, "utf8"))) continue;
    ungoverned.push(route);
  }

  check(
    ungoverned.length === 0,
    ungoverned.length === 0
      ? `all ${htmlPages.length} prerendered pages are either in sitemap.xml or marked noindex`
      : `${ungoverned.length} prerendered page(s) are crawlable, absent from sitemap.xml and not noindex ` +
          `(add a robots noindex for shells, or a sitemap entry for destinations): ` +
          ungoverned.slice(0, 5).join(", ")
  );

  // Negative control: the guard must actually fail on an ungoverned page.
  const shellHtml = read(path.join(DIST_DIR, "travelpayouts-wl.html"));
  check(
    shellHtml !== null && isNoindex(shellHtml) && !isNoindex(shellHtml.replace(/noindex/gi, "index")),
    "indexability guard detects a widget shell whose noindex was removed (negative control)"
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
      .replace(/&#(?:0?39|x0?27);|&apos;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();
  check(
    ["carrier&#39;s", "carrier&#x27;s", "carrier&apos;s"].every((sample) => normalise(sample) === "carrier's"),
    "full-body comparison decodes decimal, React hexadecimal and named apostrophes without dropping warning text"
  );
  const emptyPrerenders: string[] = [];
  const truncatedPrerenders: string[] = [];
  const umrahBudgetSlug = "umrah-hajj-guide-bangladesh-nusuk-bdt-cost";
  const umrahBudgetMarker = "[[UMRAH_BUDGET_TABLE]]";
  const hajjResourceSlug = "hajj-registration-bangladesh-government-vs-private-package-cost";
  const hajjResourceMarker = "[[HAJJ_RESOURCE_DOWNLOAD]]";
  for (const [slug, body] of Object.entries(BLOG_BODY)) {
    const html = read(path.join(DIST_DIR, "blog", `${slug}.html`));
    if (!html) {
      emptyPrerenders.push(slug);
      continue;
    }
    const page = normalise(html);
    const paragraphs = body
      .split("\n\n")
      .map((para) => para.trim())
      .filter(Boolean)
      .filter((para) => para !== "[[figure]]")
      .filter(
        (para) => !(slug === umrahBudgetSlug && para === umrahBudgetMarker)
      )
      .filter(
        (para) => !(slug === hajjResourceSlug && para === hajjResourceMarker)
      )
      .filter((para) => !getVisibleBlogFaqSection(slug, para, "en"))
      .flatMap((para) => {
        const note = getTravellerCheck(para);
        // Check both rendered parts; never drop a caution from the full-body coverage guard.
        return note ? [note.title, note.text] : [para];
      });
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

  const hajjEnglishPage =
    read(path.join(DIST_DIR, "blog", `${hajjResourceSlug}.html`)) ?? "";
  const hajjBengaliPage =
    read(path.join(DIST_DIR, "bn", "blog", `${hajjResourceSlug}.html`)) ?? "";
  const hajjDownloadPath = "/downloads/ural-hajj-preparation-checklist-2027-en.pdf";
  const hajjDownloadName = "ural-hajj-preparation-checklist-2027-en.pdf";
  const hajjDownloadAsset = path.join(DIST_DIR, "downloads", hajjDownloadName);
  const hajjDownloadIsInPosition = (html: string, answer: string, card: string, warning: string) => {
    const answerAt = html.indexOf(answer);
    const cardAt = html.indexOf(card);
    const warningAt = html.indexOf(warning);
    return (
      answerAt >= 0 && cardAt > answerAt && warningAt > cardAt &&
      html.includes(`href="${hajjDownloadPath}" download="${hajjDownloadName}"`) &&
      !html.includes(hajjResourceMarker)
    );
  };
  check(
    hajjDownloadIsInPosition(
      hajjEnglishPage,
      "Quick answer — The latest MoRA 2027 notice",
      "URAL’s Hajj preparation checklist",
      "Season note: The supplied sources do not establish"
    ) &&
      hajjDownloadIsInPosition(
        hajjBengaliPage,
        "দ্রুত উত্তর — এই গাইডের জন্য দেওয়া সর্বশেষ MoRA",
        "URAL-এর Hajj প্রস্তুতি চেকলিস্ট",
        "মৌসুম-সংক্রান্ত সতর্কতা:"
      ) &&
      fs.existsSync(hajjDownloadAsset) &&
      fs.statSync(hajjDownloadAsset).size > 1000,
    "the bilingual Hajj checklist download renders below the current-season answer and the PDF is present in dist"
  );

  const umrahEnglishPage =
    read(path.join(DIST_DIR, "blog", `${umrahBudgetSlug}.html`)) ?? "";
  const umrahBengaliPage =
    read(path.join(DIST_DIR, "bn", "blog", `${umrahBudgetSlug}.html`)) ?? "";
  const hasSemanticUmrahBudgetTable = (html: string) => {
    const tableCount = [...html.matchAll(/<table\b/g)].length;
    return (
      tableCount === 1 &&
      /<caption\b/.test(html) &&
      /<th[^>]*scope="col"/.test(html) &&
      /<th[^>]*scope="row"/.test(html) &&
      html.includes("BDT 1,16,000–1,32,000") &&
      !html.includes(umrahBudgetMarker)
    );
  };
  check(
    hasSemanticUmrahBudgetTable(umrahEnglishPage) &&
      hasSemanticUmrahBudgetTable(umrahBengaliPage),
    "the Umrah budget marker becomes one semantic table with the retained BDT estimate in both prerendered locales"
  );

  const umrahEnglishPost = BLOG_DATA.find((post) => post.slug === umrahBudgetSlug);
  const umrahBengaliPost = getLocalizedBlogs("bn").find((post) => post.slug === umrahBudgetSlug);
  const englishReferenceSection = umrahEnglishPage.match(
    /<section aria-labelledby="article-reference-links-heading">([\s\S]*?)<\/section>/
  )?.[1];
  const bengaliReferenceSection = umrahBengaliPage.match(
    /<section aria-labelledby="article-reference-links-heading">([\s\S]*?)<\/section>/
  )?.[1];
  const expectedReferenceUrls = umrahEnglishPost?.references?.map((reference) => reference.url) ?? [];
  const referencesAreLocalizedAndVisible = Boolean(
    expectedReferenceUrls.length > 0 &&
      umrahBengaliPost?.references?.length === expectedReferenceUrls.length &&
      expectedReferenceUrls.every(
        (url, index) =>
          umrahBengaliPost.references?.[index]?.url === url &&
          umrahEnglishPage.includes(`href="${url}"`) &&
          umrahBengaliPage.includes(`href="${url}"`)
      ) &&
      Boolean(englishReferenceSection && /<ol\b/.test(englishReferenceSection)) &&
      Boolean(bengaliReferenceSection && /<ol\b/.test(bengaliReferenceSection)) &&
      englishReferenceSection?.includes("[1]") &&
      bengaliReferenceSection?.includes("[১]") &&
      (englishReferenceSection?.match(/<li\b/g) ?? []).length === expectedReferenceUrls.length &&
      (bengaliReferenceSection?.match(/<li\b/g) ?? []).length === expectedReferenceUrls.length
  );
  check(
    referencesAreLocalizedAndVisible,
    referencesAreLocalizedAndVisible
      ? `the ${expectedReferenceUrls.length} numbered source/portal links are rendered and propagated to the Bengali twin`
      : "Umrah source links are missing, unordered, or not propagated to the Bengali route"
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

  // Homepage budget: keep the complete entry graph below 200 KB gzip. The
  // large content-data module must stay route-triggered, not appear in the
  // module's static script or preload list.
  const contentDataIsEager = [...new Set([...eagerScripts, ...eagerPreloads])].some((url) =>
    /content-data/i.test(url)
  );
  check(
    !contentDataIsEager,
    contentDataIsEager
      ? "content-data is in the homepage's eager script/preload graph"
      : "content-data is absent from the homepage's eager script/preload graph"
  );
  const contentDataFile = jsChunks.find((file) => /^content-data-.*\.js$/.test(file));
  const contentDataHref = contentDataFile ? `/assets/${contentDataFile}` : null;
  const routePathFromHtmlFile = (file: string): string => {
    const segments = path.relative(DIST_DIR, file).split(path.sep);
    if (segments[0] === "bn") segments.shift();
    const leaf = segments.pop() ?? "";
    if (leaf !== "index.html" && leaf.endsWith(".html")) {
      segments.push(leaf.slice(0, -".html".length));
    }
    return `/${segments.filter(Boolean).join("/")}`;
  };
  const dataRouteHtmlFiles = distHtmlFiles.filter((file) =>
    /^\/(?:flights|hotels|visa|destinations|costs|blog)(?:\/|$)/.test(routePathFromHtmlFile(file))
  );
  const missingContentDataPreloads = contentDataHref
    ? dataRouteHtmlFiles.filter((file) => {
        const html = read(file) ?? "";
        return !html.includes(`rel="modulepreload" crossorigin href="${contentDataHref}"`);
      })
    : dataRouteHtmlFiles;
  check(
    contentDataHref !== null &&
      dataRouteHtmlFiles.length > 0 &&
      missingContentDataPreloads.length === 0,
    contentDataHref !== null && missingContentDataPreloads.length === 0
      ? `all ${dataRouteHtmlFiles.length} content-backed routes modulepreload the route-data chunk`
      : `${missingContentDataPreloads.length || dataRouteHtmlFiles.length} content-backed route(s) lack the route-data modulepreload`
  );
  const EAGER_JS_BUDGET_KB = 200;
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

// --- 14. Route metadata and structured data ---------------------------------

function getSeoSchemaGraph(html: string): Record<string, unknown>[] {
  const match = html.match(
    /<script\b[^>]*data-seo-schema="true"[^>]*>([\s\S]*?)<\/script>/i
  );
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[1]) as unknown;
    const nodes: Record<string, unknown>[] = [];
    const collect = (value: unknown) => {
      if (Array.isArray(value)) {
        value.forEach(collect);
      } else if (typeof value === "object" && value !== null) {
        nodes.push(value as Record<string, unknown>);
        Object.values(value).forEach(collect);
      }
    };
    collect(parsed);
    return nodes;
  } catch {
    return [];
  }
}

function hasSchemaType(node: Record<string, unknown>, expected: string): boolean {
  const value = node["@type"];
  return (Array.isArray(value) ? value : [value]).includes(expected);
}

const prerenderedRouteFiles = distHtmlFiles.filter((file) =>
  (read(file) ?? "").includes('data-seo-schema="true"')
);
const emptyRouteDescriptions: string[] = [];
const descriptionsToRoutes = new Map<string, string[]>();
for (const file of prerenderedRouteFiles) {
  const html = read(file) ?? "";
  const description = html
    .match(/<meta name="description" content="([^"]*)"\s*\/>/)
    ?.[1]
    ?.trim();
  if (!description) {
    emptyRouteDescriptions.push(path.relative(DIST_DIR, file));
    continue;
  }
  const routes = descriptionsToRoutes.get(description) ?? [];
  routes.push(path.relative(DIST_DIR, file));
  descriptionsToRoutes.set(description, routes);
}
const duplicateRouteDescriptions = [...descriptionsToRoutes.entries()]
  .filter(([, routes]) => routes.length > 1)
  .map(([description, routes]) => `${routes.length} pages: ${description.slice(0, 70)}`);
check(
  emptyRouteDescriptions.length === 0,
  emptyRouteDescriptions.length === 0
    ? `all ${prerenderedRouteFiles.length} prerendered routes have a non-empty meta description`
    : `${emptyRouteDescriptions.length} prerendered route(s) have no meta description: ` +
        emptyRouteDescriptions.slice(0, 3).join(", ")
);
check(
  duplicateRouteDescriptions.length === 0,
  duplicateRouteDescriptions.length === 0
    ? `all ${prerenderedRouteFiles.length} route meta descriptions are distinct`
    : `${duplicateRouteDescriptions.length} duplicate meta description(s): ` +
        duplicateRouteDescriptions.slice(0, 3).join("; ")
);


const missingArticleSchema: string[] = [];
const requiredArticleFields = [
  "headline",
  "image",
  "datePublished",
  "dateModified",
  "author",
  "publisher",
  "mainEntityOfPage",
];
for (const post of BLOG_DATA) {
  const html = read(path.join(DIST_DIR, "blog", `${post.slug}.html`)) ?? "";
  const article = getSeoSchemaGraph(html).find(
    (node) => hasSchemaType(node, "Article") || hasSchemaType(node, "BlogPosting")
  );
  if (!article || requiredArticleFields.some((field) => !article[field])) {
    missingArticleSchema.push(post.slug);
  }
}
check(
  missingArticleSchema.length === 0,
  missingArticleSchema.length === 0
    ? `all ${BLOG_DATA.length} English blog pages emit Article/BlogPosting JSON-LD with the required fields`
    : `${missingArticleSchema.length} English blog page(s) have missing/incomplete Article JSON-LD: ` +
        missingArticleSchema.slice(0, 3).join(", ")
);

const bengaliBlogHtmlFiles = collectHtmlFiles(path.join(DIST_DIR, "bn", "blog"));
const missingBengaliArticleSchema = bengaliBlogHtmlFiles.filter((file) => {
  const article = getSeoSchemaGraph(read(file) ?? "").find(
    (node) => hasSchemaType(node, "Article") || hasSchemaType(node, "BlogPosting")
  );
  return !article || requiredArticleFields.some((field) => !article[field]);
});
const bengaliArticleSchemasAreComplete =
  bengaliBlogHtmlFiles.length === BLOG_DATA.length && missingBengaliArticleSchema.length === 0;
check(
  bengaliArticleSchemasAreComplete,
  bengaliArticleSchemasAreComplete
    ? `all ${BLOG_DATA.length} Bengali blog pages emit Article/BlogPosting JSON-LD with the required fields`
    : `Bengali blog Article JSON-LD coverage is incomplete ` +
        `(${bengaliBlogHtmlFiles.length}/${BLOG_DATA.length} pages, ` +
        `${missingBengaliArticleSchema.length} missing/incomplete)`
);

const normalizeStructuredText = (value: string) =>
  value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(?:0?39|x0?27);|&apos;/gi, "'")
    .replace(/\*/g, "")
    .replace(/(^|\s)[-•]\s+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

check(
  ["<p>carrier&#39;s rule</p>", "<p>carrier&#x27;s rule</p>", "<p>carrier&apos;s rule</p>"].every((sample) =>
    normalizeStructuredText(sample) === "carrier's rule"),
  "structured-text comparison preserves complete words across static and React apostrophe encodings"
);

const faqSlugs = [
  "travel-creator-resources",
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
  "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide",
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
] as const;
const faqCoverageIssues: string[] = [];
for (const faqSlug of faqSlugs) {
  for (const locale of ["en", "bn"] as const) {
    const content =
      locale === "en"
        ? BLOG_BODY[faqSlug] || ""
        : BENGALI_BLOG_OVERRIDES[faqSlug]?.content || "";
    const expectedFaq = getVisibleBlogFaqSection(faqSlug, content, locale);
    const routeFile =
      locale === "en"
        ? path.join(DIST_DIR, "blog", `${faqSlug}.html`)
        : path.join(DIST_DIR, "bn", "blog", `${faqSlug}.html`);
    const html = read(routeFile) ?? "";
    const faqNode = getSeoSchemaGraph(html).find((node) => hasSchemaType(node, "FAQPage"));
    const mainEntity = Array.isArray(faqNode?.mainEntity)
      ? (faqNode.mainEntity as Record<string, unknown>[])
      : [];
    const exactSchemaPairs =
      expectedFaq &&
      mainEntity.length === expectedFaq.questions.length &&
      expectedFaq.questions.every((faq, index) => {
        const answer = mainEntity[index]?.acceptedAnswer as Record<string, unknown> | undefined;
        return mainEntity[index]?.name === faq.question && answer?.text === faq.answer;
      });
    const visibleText = normalizeStructuredText(html);
    const faqIsVisible =
      expectedFaq &&
      expectedFaq.questions.every(
        (faq) =>
          visibleText.includes(normalizeStructuredText(faq.question)) &&
          visibleText.includes(normalizeStructuredText(faq.answer))
      );
    if (!expectedFaq || !exactSchemaPairs || !faqIsVisible) {
      faqCoverageIssues.push(`${faqSlug} (${locale})`);
    }
  }
}
check(
  faqCoverageIssues.length === 0,
  faqCoverageIssues.length === 0
    ? "the visible Travel Creator Resources and DIY Umrah Q&As match FAQPage JSON-LD in English and Bengali"
    : `FAQ content/schema mismatch for page(s): ${faqCoverageIssues.join(", ")}`
);

const howToCases = [
  "dual-currency-card-endorsement-bangladesh",
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
  "hajj-registration-bangladesh-government-vs-private-package-cost",
];
const howToCoverageIssues: string[] = [];
for (const locale of ["en", "bn"] as const) {
  for (const slug of howToCases) {
    const content =
      locale === "en"
        ? BLOG_BODY[slug] || ""
        : BENGALI_BLOG_OVERRIDES[slug]?.content || "";
    const expectedHowTos = getVisibleBlogHowTos(slug, content, locale);
    const routeFile =
      locale === "en"
        ? path.join(DIST_DIR, "blog", `${slug}.html`)
        : path.join(DIST_DIR, "bn", "blog", `${slug}.html`);
    const html = read(routeFile) ?? "";
    const howToNodes = getSeoSchemaGraph(html).filter((node) => hasSchemaType(node, "HowTo"));
    const pageText = normalizeStructuredText(html);
    const matchesAll =
      expectedHowTos.length > 0 &&
      expectedHowTos.every((expected) => {
        const node = howToNodes.find((candidate) =>
          String(candidate["@id"] || "").endsWith(`#${expected.idSuffix}`)
        );
        const steps = Array.isArray(node?.step)
          ? (node.step as Record<string, unknown>[])
          : [];
        return (
          node?.name === expected.name &&
          steps.length === expected.steps.length &&
          expected.steps.every((step, index) => {
            const schemaStep = steps[index];
            return (
              schemaStep?.name === step.name &&
              schemaStep?.text === step.text &&
              pageText.includes(normalizeStructuredText(step.name)) &&
              pageText.includes(normalizeStructuredText(step.text))
            );
          })
        );
      });
    if (!matchesAll) howToCoverageIssues.push(`${locale}:${slug}`);
  }
}
check(
  howToCoverageIssues.length === 0,
  howToCoverageIssues.length === 0
    ? "HowTo JSON-LD steps match the visible bilingual instructions on the selected procedural guides"
    : `HowTo content/schema mismatch for route(s): ${howToCoverageIssues.join(", ")}`
);

// The Nusuk review must survive prerendering, not merely exist in a body file.
const nusukReviewSlug = "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit";
for (const locale of ["en", "bn"] as const) {
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === nusukReviewSlug);
  const html = read(path.join(DIST_DIR, ...(locale === "bn" ? ["bn"] : []), "blog", `${nusukReviewSlug}.html`)) ?? "";
  const text = normalizeStructuredText(html);
  const graph = getSeoSchemaGraph(html);
  const howTos = graph.filter((node) => hasSchemaType(node, "HowTo"));
  const faq = graph.find((node) => hasSchemaType(node, "FAQPage"));
  check(
    !!post && post.references?.length === 11 &&
      post.references.every((reference) => html.includes(`href="${reference.url}"`)) &&
      post.updatedAt === "2026-10-19",
    `${locale} Nusuk page renders all eleven reviewed sources with its truthful update date`
  );
  check(
    howTos.length === 3 &&
      ["howto-saudi-visa-bio", "howto-nusuk-visitor-registration", "howto-rawdah-booking"].every(
        (id, index) => howTos[index]?.["@id"] === `https://ural-travel.pages.dev${locale === "bn" ? "/bn" : ""}/blog/${nusukReviewSlug}#${id}`
      ) &&
      [4, 4, 5].every((steps, index) => Array.isArray(howTos[index]?.step) && (howTos[index].step as unknown[]).length === steps) &&
      Array.isArray(faq?.mainEntity) && faq.mainEntity.length === 8,
    `${locale} Nusuk page emits three complete visible HowTos (4/4/5 steps) and eight matching FAQs`
  );
  const noteKeys = [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]);
  const sourceBody = (locale === "bn" ? post?.content : BLOG_BODY[nusukReviewSlug]) ?? "";
  const notes = sourceBody.split(/\n{2,}/).map(getTravellerCheck).filter((note) => note !== null);
  const noteTextIsPresent = (candidate: string) => notes.length === 5 && notes.every(
    (note) => candidate.includes(normalizeStructuredText(note.title)) && candidate.includes(normalizeStructuredText(note.text))
  );
  check(
    noteTextIsPresent(text) &&
      JSON.stringify(noteKeys) === JSON.stringify(["services", "biometrics", "registration", "rawdah", "network"]) &&
      [...html.matchAll(/<aside role="note"/g)].length === 5 &&
      !text.includes(locale === "bn" ? "যাত্রীর যাচাই (" : "Traveller check ("),
    `${locale} Nusuk static page renders all five localized accessible caution boxes in order, not raw author syntax`
  );
  check(
    notes.length === 5 && !noteTextIsPresent(text.replace(normalizeStructuredText(notes[2].text), "")),
    `${locale} caution completeness guard rejects an omitted registration warning (negative control)`
  );
  const required = locale === "en"
    ? ["once a year", "48 hours", "2 hours", "all ten fingerprints", "not a test of an authenticated app account"]
    : ["বছরে একবার", "৪৮ ঘণ্টা", "২ ঘণ্টা", "দশ আঙুল", "লগইন করা অ্যাপ অ্যাকাউন্ট পরীক্ষা"];
  check(
    required.every((phrase) => text.includes(phrase)) &&
      !/every visa holder can book 1 Rawdah permit every 30 days|প্রতি ৩০ দিনে ১টি পারমিট বুক করা যায়|tiny drop of lotion|ভ্যাসলিন|4-digit OTP|৪ সংখ্যার OTP/i.test(text),
    `${locale} Nusuk output retains the corrected booking, biometric and evidence-limit guidance without retired hacks`
  );
}

// Independent expectations: a missing main-guide procedure must not pass a self-derived count.
const diyReviewSlug = "umrah-hajj-guide-bangladesh-nusuk-bdt-cost";
for (const locale of ["en", "bn"] as const) {
  const html = read(path.join(DIST_DIR, ...(locale === "bn" ? ["bn"] : []), "blog", `${diyReviewSlug}.html`)) ?? "";
  const graph = getSeoSchemaGraph(html);
  const procedures = graph.filter((node) => hasSchemaType(node, "HowTo"));
  const faq = graph.find((node) => hasSchemaType(node, "FAQPage"));
  check(
    procedures.length === 1 &&
      procedures[0]["@id"] === `https://ural-travel.pages.dev${locale === "bn" ? "/bn" : ""}/blog/${diyReviewSlug}#howto-diy-umrah-sequence` &&
      Array.isArray(procedures[0].step) && procedures[0].step.length === 6 &&
      Array.isArray(faq?.mainEntity) && faq.mainEntity.length === 5,
    `${locale} DIY guide renders one six-step application-to-permit procedure and five visible FAQs`
  );
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === diyReviewSlug);
  const text = normalizeStructuredText(html);
  check(
    post?.updatedAt === "2026-10-19" && post.references?.length === 26 &&
      post.references.every((reference) => html.includes(`href="${reference.url}"`)) &&
      text.includes("SAR 4,000") && text.includes("SAR 1,000") &&
      text.includes(locale === "bn" ? "সর্বশেষ revision date নিশ্চিত হয়নি" : "does not establish its latest revision date") &&
      text.includes(locale === "bn" ? "নতুন দাম যাচাই করা হয়নি" : "not re-priced on 19 October 2026"),
    `${locale} DIY output retains all sources, Package Visa conditions, fine-print limit and historical budget basis`
  );
  const body = (locale === "bn" ? post?.content : BLOG_BODY[diyReviewSlug]) ?? "";
  const visaNote = body.split(/\n{2,}/).map(getTravellerCheck).find((note) => note?.key === "visaEligibility");
  const hasVisaCaution = (visible: string) => Boolean(visaNote &&
    visible.includes(normalizeStructuredText(visaNote.title)) &&
    visible.includes(normalizeStructuredText(visaNote.text)));
  const requiredVisaCriteria = locale === "bn"
    ? ["tourist বা business", "অন্তত একবার", "temporary residence", "নির্দিষ্ট পেশার শর্ত ছাড়া"]
    : ["tourist or business", "used at least once", "temporary residence", "without specific professions"];
  check(
    [...html.matchAll(/data-traveller-check="visaEligibility"/g)].length === 1 &&
      hasVisaCaution(text) && requiredVisaCriteria.every((phrase) => text.includes(phrase)) &&
      !JSON.stringify(procedures).includes(visaNote?.text ?? "visaEligibility"),
    `${locale} DIY output renders the full point-of-payment visa caution and qualified foreign-document criteria`
  );
  check(
    Boolean(visaNote) && !hasVisaCaution(text.replace(normalizeStructuredText(visaNote!.text), "")),
    `${locale} DIY visa caution guard rejects an omitted warning body (negative control)`
  );
}

const authorBioSlug = "dual-currency-card-endorsement-bangladesh";
const authorBioIssues: string[] = [];
for (const locale of ["en", "bn"] as const) {
  const routeFile =
    locale === "en"
      ? path.join(DIST_DIR, "blog", `${authorBioSlug}.html`)
      : path.join(DIST_DIR, "bn", "blog", `${authorBioSlug}.html`);
  const html = read(routeFile) ?? "";
  const article = getSeoSchemaGraph(html).find((node) => hasSchemaType(node, "Article"));
  const author = article?.author as Record<string, unknown> | undefined;
  const expectedBio = locale === "en" ? EDITOR_PROFILE.bioEn : EDITOR_PROFILE.bioBn;
  const visibleText = normalizeStructuredText(html);
  const alternateNames = Array.isArray(author?.alternateName)
    ? (author.alternateName as string[])
    : [];
  const linkedWorks = Array.isArray(author?.subjectOf)
    ? (author.subjectOf as Record<string, unknown>[])
    : [];
  const worksMatch = EDITOR_PROFILE.creativeWorks.every((work) => {
    const expectedTitle = locale === "en" ? work.titleEn : work.titleBn;
    const schemaWork = linkedWorks.find((item) => item.url === work.url);
    return (
      schemaWork?.name === expectedTitle &&
      html.includes(work.url) &&
      visibleText.includes(normalizeStructuredText(expectedTitle))
    );
  });
  const portfolioMatches = EDITOR_PROFILE.portfolioUrl
    ? author?.url === EDITOR_PROFILE.portfolioUrl &&
      html.includes(EDITOR_PROFILE.portfolioUrl)
    : author?.url === undefined && !html.includes("https://github.com/MARC414");
  const sameAsMatches =
    EDITOR_PROFILE.sameAs.length > 0
      ? Array.isArray(author?.sameAs) &&
        EDITOR_PROFILE.sameAs.every((url) => (author.sameAs as string[]).includes(url))
      : author?.sameAs === undefined;
  if (
    !author ||
    author.name !== EDITOR_PROFILE.name ||
    author.description !== expectedBio ||
    !portfolioMatches ||
    !sameAsMatches ||
    !EDITOR_PROFILE.alternateNames.every((name) => alternateNames.includes(name)) ||
    !worksMatch ||
    !visibleText.includes(normalizeStructuredText(expectedBio))
  ) {
    authorBioIssues.push(locale);
  }
}
check(
  authorBioIssues.length === 0,
  authorBioIssues.length === 0
    ? "the single editor's bilingual bio, documentary links, and Article author entity match the portfolio"
    : `author bio/Article author metadata mismatch for locale(s): ${authorBioIssues.join(", ")}`
);

const sampleCollectionItems = [
  { name: "Sample guide A", url: "https://ural-travel.pages.dev/blog/sample-a" },
  { name: "Sample guide B", url: "https://ural-travel.pages.dev/blog/sample-b" },
];
const generatedEnBlogCollection = collectionPageSchema({
  url: "https://ural-travel.pages.dev/blog",
  name: "Travel Blog",
  description: "Travel guides",
  items: sampleCollectionItems,
  includeNumberOfItems: true,
});
const generatedBnBlogCollection = collectionPageSchema({
  url: "https://ural-travel.pages.dev/bn/blog",
  name: "বাংলা ব্লগ",
  description: "ভ্রমণ নির্দেশিকা",
  items: sampleCollectionItems,
  includeNumberOfItems: true,
});
const generatedFlightCollection = collectionPageSchema({
  url: "https://ural-travel.pages.dev/flights",
  name: "Flight Guides",
  description: "Flight route guides",
  items: sampleCollectionItems,
  includeNumberOfItems: true,
});
const collectionSchemaCountGuardWorks =
  generatedEnBlogCollection.mainEntity.numberOfItems === undefined &&
  generatedBnBlogCollection.mainEntity.numberOfItems === undefined &&
  generatedFlightCollection.mainEntity.numberOfItems === sampleCollectionItems.length;
check(
  collectionSchemaCountGuardWorks,
  collectionSchemaCountGuardWorks
    ? "CollectionPage always omits totals for /blog hubs while other collections keep computed counts"
    : "CollectionPage count guard should omit totals on English/Bengali blog hubs only"
);

const blogHubHtml = read(path.join(DIST_DIR, "blog.html")) ?? "";
const blogHubItemList = getSeoSchemaGraph(blogHubHtml).find((node) =>
  hasSchemaType(node, "ItemList")
);
const blogHubItems = blogHubItemList?.itemListElement;
const blogHubListIsCompleteWithoutTotal =
  blogHubItemList?.numberOfItems === undefined &&
  Array.isArray(blogHubItems) &&
  blogHubItems.length === BLOG_DATA.length;
check(
  blogHubListIsCompleteWithoutTotal,
  blogHubListIsCompleteWithoutTotal
    ? "blog CollectionPage lists every guide without an explicit total"
    : "blog CollectionPage should list every guide and omit numberOfItems"
);

// Crawlability is separate from sitemap coverage: a detail page must also be
// reachable through ordinary anchors from the Bengali blog hub.
const bnBlogHubHtml = read(path.join(DIST_DIR, "bn", "blog.html")) ?? "";
function bengaliBlogHubTargets(html: string): Set<string> {
  return new Set(
    [...html.matchAll(/href="(\/bn\/blog\/[^"/?#]+)"/g)].map((match) => match[1])
  );
}
function hasCompleteBengaliBlogHubDirectory(html: string): boolean {
  const targets = bengaliBlogHubTargets(html);
  return (
    BLOG_POST_COUNT === BLOG_SLUGS.length &&
    targets.size === BLOG_POST_COUNT &&
    BLOG_SLUGS.every((slug) => targets.has(`/bn/blog/${slug}`))
  );
}
const bnBlogHubTargets = bengaliBlogHubTargets(bnBlogHubHtml);
const bnBlogHubDirectoryIsComplete = hasCompleteBengaliBlogHubDirectory(bnBlogHubHtml);
check(
  bnBlogHubDirectoryIsComplete,
  bnBlogHubDirectoryIsComplete
    ? `/bn/blog links to every Bengali guide with crawlable anchors (${bnBlogHubTargets.size}/${BLOG_POST_COUNT})`
    : `/bn/blog crawlable directory is incomplete (${bnBlogHubTargets.size}/${BLOG_POST_COUNT}); missing: ${BLOG_SLUGS.filter((slug) => !bnBlogHubTargets.has(`/bn/blog/${slug}`)).slice(0, 4).join(", ") || "unexpected/duplicate targets"}`
);
const bnBlogHubNegativeTarget = `/bn/blog/${BLOG_SLUGS[0]}`;
const bnBlogHubNegativeControlHtml = bnBlogHubHtml.replace(
  `href="${bnBlogHubNegativeTarget}"`,
  'href="/bn/blog/negative-control"'
);
const bnBlogHubNegativeControlRejectsMissingPost =
  bnBlogHubNegativeControlHtml !== bnBlogHubHtml &&
  !hasCompleteBengaliBlogHubDirectory(bnBlogHubNegativeControlHtml);
check(
  bnBlogHubNegativeControlRejectsMissingPost,
  bnBlogHubNegativeControlRejectsMissingPost
    ? "Bengali blog-hub link guard rejects a deliberately removed post link (negative control)"
    : "Bengali blog-hub link guard failed its missing-link negative control"
);

// A hub breadcrumb is a short category label, not the full ~60-character H1.
const bnBlogHubBreadcrumb = getSeoSchemaGraph(bnBlogHubHtml).find((node) =>
  hasSchemaType(node, "BreadcrumbList")
);
const bnBlogHubBreadcrumbItems = Array.isArray(bnBlogHubBreadcrumb?.itemListElement)
  ? (bnBlogHubBreadcrumb.itemListElement as Record<string, unknown>[])
  : [];
const bnBlogHubFinalCrumbName = bnBlogHubBreadcrumbItems.at(-1)?.name;
function isConciseBengaliBlogHubCrumb(name: unknown): boolean {
  return (
    typeof name === "string" &&
    name === BN_BREADCRUMB_LABELS["Travel Guides"] &&
    name.length <= 24
  );
}
const bnBlogHubCrumbIsConcise = isConciseBengaliBlogHubCrumb(bnBlogHubFinalCrumbName);
check(
  bnBlogHubCrumbIsConcise,
  bnBlogHubCrumbIsConcise
    ? `Bengali /blog BreadcrumbList ends with the concise hub label "${String(bnBlogHubFinalCrumbName)}"`
    : `Bengali /blog BreadcrumbList ends with a missing or overly long hub label (${String(bnBlogHubFinalCrumbName)})`
);
const bnLongHubTitleNegativeControl =
  "বাংলাদেশি ভ্রমণকারীদের জন্য ভিসা, ওমরাহ, ফ্লাইট ও BDT বাজেটের সম্পূর্ণ ভ্রমণ নির্দেশিকা";
const bnBlogHubCrumbNegativeControlRejectsLongTitle =
  !isConciseBengaliBlogHubCrumb(bnLongHubTitleNegativeControl);
check(
  bnBlogHubCrumbNegativeControlRejectsLongTitle,
  bnBlogHubCrumbNegativeControlRejectsLongTitle
    ? "Bengali blog-hub crumb guard rejects a long H1 as a negative control"
    : "Bengali blog-hub crumb guard failed its long-title negative control"
);

type BreadcrumbSnapshotItem = { name: string; href: string | null };

function normalizeBreadcrumbHref(href: string | null): string | null {
  if (href === null) return null;
  try {
    const parsed = new URL(href, "https://ural-travel.pages.dev");
    if (parsed.origin !== "https://ural-travel.pages.dev") return parsed.href;
    const withoutTrailingSlash = parsed.pathname.replace(/\/+$/, "") || "/";
    const pathname = withoutTrailingSlash === "/bn" ? "/bn/" : withoutTrailingSlash;
    return `${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return href;
  }
}

function breadcrumbSchemaItems(html: string): BreadcrumbSnapshotItem[] | null {
  const node = getSeoSchemaGraph(html).find((item) => hasSchemaType(item, "BreadcrumbList"));
  if (!Array.isArray(node?.itemListElement)) return null;
  const items: BreadcrumbSnapshotItem[] = [];
  for (const entry of node.itemListElement) {
    if (!entry || typeof entry !== "object") return null;
    const crumb = entry as Record<string, unknown>;
    if (typeof crumb.name !== "string") return null;
    const rawItem = crumb.item;
    const href =
      typeof rawItem === "string"
        ? rawItem
        : rawItem && typeof rawItem === "object" && typeof (rawItem as Record<string, unknown>)["@id"] === "string"
          ? String((rawItem as Record<string, unknown>)["@id"])
          : null;
    items.push({ name: normalizeStructuredText(crumb.name), href });
  }
  return items;
}

function visibleBlogBreadcrumbItems(markup: string): BreadcrumbSnapshotItem[] | null {
  const nav = markup.match(
    /<nav\b(?=[^>]*\bdata-blog-breadcrumb(?:\s|=|>))[^>]*>([\s\S]*?)<\/nav>/i
  )?.[1];
  if (!nav) return null;
  const items: BreadcrumbSnapshotItem[] = [];
  for (const match of nav.matchAll(/<(a|span)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const [, tag, attributes, inner] = match;
    if (!/\bdata-blog-breadcrumb-item(?:\s|=|$)/.test(attributes)) continue;
    const href = tag.toLowerCase() === "a"
      ? attributes.match(/\bhref="([^"]*)"/)?.[1] ?? null
      : null;
    items.push({ name: normalizeStructuredText(inner), href });
  }
  return items;
}

function visibleAndStructuredBreadcrumbsMatch(
  visible: BreadcrumbSnapshotItem[] | null,
  structured: BreadcrumbSnapshotItem[] | null
): boolean {
  return Boolean(
    visible &&
      structured &&
      visible.length > 0 &&
      visible.length === structured.length &&
      visible.every(
        (crumb, index) =>
          crumb.name === structured[index].name &&
          normalizeBreadcrumbHref(crumb.href) === normalizeBreadcrumbHref(structured[index].href)
      )
  );
}

function renderBlogPostForBreadcrumb(locale: "en" | "bn", slug: string): string {
  const isBn = locale === "bn";
  const sourcePosts = getLocalizedBlogs(locale);
  const sourcePost = sourcePosts.find((post) => post.slug === slug);
  if (!sourcePost) throw new Error(`Missing ${locale} blog post ${slug}`);
  const probePost = {
    ...sourcePost,
    content: isBn ? "এই যাচাইকরণ গাইডে ভ্রমণের গুরুত্বপূর্ণ তথ্য দেখুন।" : "Review the important travel details in this verification guide.",
  };
  const localizedBlogs = sourcePosts.map((post) => post.slug === slug ? probePost : post);
  const getLocalizedRouteHref = (route: string) =>
    isBn ? (route === "/" ? "/bn" : `/bn${route}`) : route;
  const EmptyAuthorBioCard = () => null;

  return renderToStaticMarkup(
    React.createElement(BlogPostRouteView as any, {
      context: {
        AuthorBioCard: EmptyAuthorBioCard,
        blogBodies: {},
        getBlogAeoSnippet50Words: (_slug: string, _isBengali: boolean, fallback: string) => fallback,
        // Use a known dimensioned image because this is a render probe, not an asset-map test.
        getBlogCoverImage: () => "/assets/images/clouds_boat_hero_1781438671378-1200.webp",
        getLocalizedRouteHref,
        isBn,
        isLanding: false,
        lang: locale,
        localizedBlogs,
        localizedHajjFaqs: getLocalizedHajjFaqs(locale),
        navigateTo: () => {},
        parameterId: slug,
        section: "blog",
        setAffiliateToast: () => {},
      },
    })
  );
}

function renderFullUmrahBlogPost(locale: "en" | "bn"): string {
  const slug = "umrah-hajj-guide-bangladesh-nusuk-bdt-cost";
  const isBn = locale === "bn";
  const sourcePosts = getLocalizedBlogs(locale);
  const sourcePost = sourcePosts.find((post) => post.slug === slug);
  if (!sourcePost) throw new Error(`Missing ${locale} blog post ${slug}`);
  const fullPost = {
    ...sourcePost,
    content: isBn ? sourcePost.content : BLOG_BODY[slug],
  };
  const localizedBlogs = sourcePosts.map((post) => post.slug === slug ? fullPost : post);
  const getLocalizedRouteHref = (route: string) =>
    isBn ? (route === "/" ? "/bn" : `/bn${route}`) : route;
  const EmptyAuthorBioCard = () => null;

  return renderToStaticMarkup(
    React.createElement(BlogPostRouteView as any, {
      context: {
        AuthorBioCard: EmptyAuthorBioCard,
        blogBodies: {},
        getBlogAeoSnippet50Words: (_slug: string, _isBengali: boolean, fallback: string) => fallback,
        getBlogCoverImage: () => "/assets/images/clouds_boat_hero_1781438671378-1200.webp",
        getLocalizedRouteHref,
        isBn,
        isLanding: false,
        lang: locale,
        localizedBlogs,
        localizedHajjFaqs: getLocalizedHajjFaqs(locale),
        navigateTo: () => {},
        parameterId: slug,
        section: "blog",
        setAffiliateToast: () => {},
      },
    })
  );
}

const umrahClientRenderIssues: string[] = [];
for (const locale of ["en", "bn"] as const) {
  try {
    const markup = renderFullUmrahBlogPost(locale);
    const localizedFaqHeading = locale === "bn" ? "সচরাচর জিজ্ঞাসা" : "Frequently Asked Questions";
    const firstReferenceLabel = locale === "bn" ? "[১]" : "[1]";
    if (
      (markup.match(/<table\b/g) || []).length !== 1 ||
      !markup.includes("BDT 1,16,000–1,32,000") ||
      markup.includes("[[UMRAH_BUDGET_TABLE]]") ||
      !markup.includes(localizedFaqHeading) ||
      !markup.includes("article-reference-links-heading") ||
      !markup.includes(firstReferenceLabel) ||
      markup.includes('id="travel-intelligence-panel"')
    ) {
      umrahClientRenderIssues.push(locale);
    }
  } catch (error) {
    umrahClientRenderIssues.push(`${locale} (${String(error).slice(0, 120)})`);
  }
}
check(
  umrahClientRenderIssues.length === 0,
  umrahClientRenderIssues.length === 0
    ? "the EN/BN Umrah React route renders one semantic budget table, its own FAQ/references, and no stale shared Hajj panel"
    : `Umrah React route rendering failed for: ${umrahClientRenderIssues.join(", ")}`
);

const breadcrumbProbeSlug = BLOG_SLUGS[0];
for (const locale of ["en", "bn"] as const) {
  const routeFile =
    locale === "en"
      ? path.join(DIST_DIR, "blog", `${breadcrumbProbeSlug}.html`)
      : path.join(DIST_DIR, "bn", "blog", `${breadcrumbProbeSlug}.html`);
  try {
    const rendered = renderBlogPostForBreadcrumb(locale, breadcrumbProbeSlug);
    const visible = visibleBlogBreadcrumbItems(rendered);
    const structured = breadcrumbSchemaItems(read(routeFile) ?? "");
    const matched = visibleAndStructuredBreadcrumbsMatch(visible, structured);
    check(
      matched,
      matched
        ? `${locale} blog post visible breadcrumb labels/links match the emitted BreadcrumbList`
        : `${locale} blog post visible breadcrumb labels/links disagree with its emitted BreadcrumbList (visible=${JSON.stringify(visible)}; schema=${JSON.stringify(structured)})`
    );
  } catch (error) {
    check(false, `${locale} blog breadcrumb renders and can be compared (threw: ${String(error).slice(0, 180)})`);
  }
}
const breadcrumbControlVisible: BreadcrumbSnapshotItem[] = [
  { name: "Home", href: "/" },
  { name: "Travel Guides", href: "/blog" },
  { name: "Sample guide", href: null },
];
const breadcrumbControlSchema: BreadcrumbSnapshotItem[] = [
  { name: "Home", href: "https://ural-travel.pages.dev/" },
  { name: "Travel Guides", href: "https://ural-travel.pages.dev/blog" },
  { name: "Sample guide", href: null },
];
const breadcrumbMismatchNegativeControlRejectsDrift =
  visibleAndStructuredBreadcrumbsMatch(breadcrumbControlVisible, breadcrumbControlSchema) &&
  !visibleAndStructuredBreadcrumbsMatch(
    breadcrumbControlVisible.map((crumb, index) =>
      index === 1 ? { ...crumb, name: "Travel Blog" } : crumb
    ),
    breadcrumbControlSchema
  );
check(
  breadcrumbMismatchNegativeControlRejectsDrift,
  breadcrumbMismatchNegativeControlRejectsDrift
    ? "breadcrumb comparator rejects a deliberately divergent visible hub label (negative control)"
    : "breadcrumb comparator failed its label-drift negative control"
);

const homepageHtml = distIndexHtml ?? "";
const entitySchemaMatch = homepageHtml.match(
  /<script type="application\/ld\+json" id="site-entity-schema">([\s\S]*?)<\/script>/
);
let websiteDescription = "";
if (entitySchemaMatch) {
  try {
    const entityGraph = JSON.parse(entitySchemaMatch[1]) as {
      "@graph"?: Record<string, unknown>[];
    };
    const websiteNode = entityGraph["@graph"]?.find((node) => hasSchemaType(node, "WebSite"));
    websiteDescription =
      typeof websiteNode?.description === "string" ? websiteNode.description : "";
  } catch {
    websiteDescription = "";
  }
}
const homepageBlogSlugs = new Set(
  [...homepageHtml.matchAll(/href="\/blog\/([^"]+)"/g)].map((match) => match[1])
);
const missingHomepageBlogLinks = BLOG_DATA.filter((post) => !homepageBlogSlugs.has(post.slug)).map(
  (post) => post.slug
);
const homepageMentionsBlogCount =
  /\b\d+\s+(?:practical\s+)?travel guides\b/i.test(websiteDescription) ||
  /\bbrowse\s+\d+\s+(?:practical\s+)?travel guides\b/i.test(homepageHtml) ||
  /\bAll\s+\d+\s+Bangladesh Outbound Travel &amp; Umrah Blog Guides\b/i.test(homepageHtml) ||
  /<h2>\s*\d+\s+Bangladesh Outbound Travel &amp; Umrah Guides\s*<\/h2>/i.test(homepageHtml);
const homepageBlogIndexIsCorrect =
  !homepageMentionsBlogCount &&
  missingHomepageBlogLinks.length === 0 &&
  homepageBlogSlugs.size === BLOG_DATA.length;
check(
  homepageBlogIndexIsCorrect,
  homepageBlogIndexIsCorrect
    ? "homepage schema/copy omit the blog total while the crawlable directory retains every guide"
    : `homepage still mentions the blog total or the crawlable directory is incomplete; ` +
        `missing links: ${missingHomepageBlogLinks.slice(0, 3).join(", ") || "none"}`
);

// Guide-map anchors must resolve within the route view or a shared section.
const guideRouteFiles = [
  "src/routes/FlightsRouteView.tsx",
  "src/routes/VisaRouteView.tsx",
  "src/routes/HotelsRouteView.tsx",
  "src/routes/CostsRouteView.tsx",
  "src/routes/DestinationsRouteView.tsx",
];
const guideSharedSources = [
  read(path.join(ROOT_DIR, "src/components/AeoInspector.tsx")) ?? "",
  read(path.join(ROOT_DIR, "src/components/InteractiveTools.tsx")) ?? "",
];
const guideSharedIds = new Set(
  guideSharedSources.flatMap((source) =>
    [...source.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1])
  )
);
const missingGuideTargets: string[] = [];
let guideTargetCount = 0;
for (const relativePath of guideRouteFiles) {
  const source = read(path.join(ROOT_DIR, relativePath)) ?? "";
  const localIds = new Set(
    [...source.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1])
  );
  for (const block of source.matchAll(/<GuideJumpNav\b([\s\S]*?)\/>/g)) {
    for (const target of block[1].matchAll(/\bid:\s*["']([^"']+)["']/g)) {
      guideTargetCount += 1;
      if (!localIds.has(target[1]) && !guideSharedIds.has(target[1])) {
        missingGuideTargets.push(`${relativePath} → #${target[1]}`);
      }
    }
  }
}
const guideTargetsResolve = guideTargetCount > 0 && missingGuideTargets.length === 0;
check(
  guideTargetsResolve,
  guideTargetsResolve
    ? `all ${guideTargetCount} guide-map links resolve to route or shared section targets`
    : `guide-map links are missing targets: ${missingGuideTargets.slice(0, 5).join(", ") || "no guide links found"}`
);

// --- Bilingual render integrity --------------------------------------------
//
// `tsc` cannot see an object rendered as a React child and vite cannot see a
// Bengali heading wrapped around English body text, so the /visa-free-countries
// page shipped in exactly that state: every heading switched on `isBn`, every
// paragraph pulled from English-only data. The component is client-rendered, so
// grepping dist/ HTML cannot see it either — the page has to be rendered.
//
// Each entry below is rendered in both languages and checked for two things:
// that the Bengali output is genuinely Bengali, and that no whole English
// sentence survives into it. Add a route here as its Bengali content lands.

const BILINGUAL_RENDER_VIEWS = [
  { name: "/visa-free-countries", view: VisaFreeCountriesRouteView },
] as const;

/** The text a reader sees in a rendered fragment: tags stripped, one entity pass. */
function visibleText(markup: string): string {
  return markup
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function renderedText(isBn: boolean, view: (typeof BILINGUAL_RENDER_VIEWS)[number]["view"]) {
  return visibleText(
    renderToStaticMarkup(
      React.createElement(view as any, {
        context: { isBn, navigateTo: () => {}, lang: isBn ? "bn" : "en" },
      })
    )
  );
}

const words = (t: string) => t.split(/\s+/).filter(Boolean);
const isBengali = (w: string) => /[\u0980-\u09FF]/.test(w);
/** English sentences are compared whole, so legacy terminology is not flagged. */
const sentences = (t: string) =>
  t.split(/(?<=[.!?])\s+/).filter((x) => words(x).length >= 5);

for (const { name, view } of BILINGUAL_RENDER_VIEWS) {
  let english = "";
  let bengali = "";
  try {
    english = renderedText(false, view);
    bengali = renderedText(true, view);
  } catch (error) {
    check(false, `${name} renders in both languages (threw: ${String(error)})`);
    continue;
  }

  const bengaliWords = words(bengali).filter(isBengali).length;
  const bengaliShare =
    words(bengali).filter((w) => !/^[\s\u2014\u00b7|]+$/.test(w)).length > 0
      ? bengaliWords / words(bengali).length
      : 0;
  // A heading-only Bengali page scores near zero; a translated one scores ~0.9.
  check(
    bengaliShare >= 0.6,
    bengaliShare >= 0.6
      ? `${name} Bengali render is ${bengaliWords} Bengali words (${Math.round(bengaliShare * 100)}% of its visible text)`
      : `${name} Bengali render is only ${Math.round(bengaliShare * 100)}% Bengali — English body text is leaking through`
  );

  const leaked = sentences(english).filter((x) => bengali.includes(x));
  check(
    leaked.length === 0,
    leaked.length === 0
      ? `${name} carries no English sentences in its Bengali render`
      : `${name} still shows ${leaked.length} English sentence(s) in Bengali: "${leaked[0].slice(0, 90)}"`
  );
}

// --- Footer render integrity (client-rendered, invisible to dist/) ---------
//
// scripts/prerender.ts never emits the footer, so no grep over dist/ can see
// it; `tsc` cannot see a CSS class; and vite does not typecheck at all. A green
// build therefore said nothing about the footer, and two defects shipped
// through that gap in one commit:
//
//   1. The support band sat inside the footer's 12-column grid with no column
//      span. It is a sibling of the five link columns, so it claimed 1/12 of
//      the row (~90px on desktop), wrapped its own copy one word per line, and
//      pushed the Travel Services column onto a second row.
//   2. Ten labels carried `&amp;` inside JavaScript string literals. JSX *text*
//      decodes an entity to the character for the reader; a JS string does not,
//      so the footer printed the four literal characters. (The single entity
//      that lives in JSX text — the affiliate disclosure — is correct and must
//      stay; it is what makes "no literal &amp;" the right assertion rather
//      than "no &amp; in the source".)
//
// Both are checked by rendering App and reading the markup a browser receives,
// in both languages, because the footer is the one surface dist/ cannot show.
// If the footer is redesigned on purpose, update the row arithmetic below with
// the new intent — do not delete the check.

const FOOTER_GRID_TAG = /<div[^>]*class="[^"]*lg:grid-cols-12/;
const FOOTER_GRID_COLUMNS = 12;
const VOID_ELEMENTS =
  /^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;

function elementClasses(attributes: string): string[] {
  const match = /\bclass="([^"]*)"/.exec(attributes);
  return match ? match[1].split(/\s+/).filter(Boolean) : [];
}

/**
 * Direct children of the element whose opening tag begins at `start`.
 * Depth-walked rather than regex-matched, because every footer column opens
 * with a near-identical `<div class="lg:col-span-…` tag.
 */
function directChildren(
  html: string,
  start: number
): Array<{ tag: string; classes: string[] }> {
  const tagPattern = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
  tagPattern.lastIndex = start;
  const children: Array<{ tag: string; classes: string[] }> = [];
  let depth = 0;
  let insideContainer = false;
  for (let match = tagPattern.exec(html); match; match = tagPattern.exec(html)) {
    const [, closing, tag, attributes, selfClosing] = match;
    if (closing) {
      depth -= 1;
      if (insideContainer && depth === 0) break;
      continue;
    }
    if (!insideContainer) {
      insideContainer = true;
      depth = 1;
      continue;
    }
    if (depth === 1) children.push({ tag, classes: elementClasses(attributes) });
    if (!selfClosing && !VOID_ELEMENTS.test(tag)) depth += 1;
  }
  return children;
}

function columnSpan(classes: string[], breakpoint: "md" | "lg"): number | null {
  const prefix = `${breakpoint}:col-span-`;
  const match = classes.find((name) => name.startsWith(prefix));
  return match ? Number(match.slice(prefix.length)) : null;
}

/**
 * Render <App/> as a browser would have it at `path`, without a browser.
 * English needs no help: App falls back to "/" when `window` is undefined. The
 * Bengali locale is derived from window.location, so the two globals App reads
 * during render — window and localStorage — are stubbed for that call only.
 */
function renderAppAtPath(routePath: string): string {
  if (!routePath.startsWith("/bn")) {
    return renderToStaticMarkup(React.createElement(App));
  }

  const scope = globalThis as unknown as Record<string, unknown>;
  const previous = { window: scope.window, localStorage: scope.localStorage };
  const storage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  scope.window = {
    location: {
      pathname: routePath,
      search: "",
      href: `https://ural-travel.pages.dev${routePath}`,
    },
    localStorage: storage,
    addEventListener: () => {},
    removeEventListener: () => {},
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    requestAnimationFrame: () => 0,
    cancelAnimationFrame: () => {},
    requestIdleCallback: () => 0,
    scrollY: 0,
    innerHeight: 800,
    scrollTo: () => {},
  };
  scope.localStorage = storage;
  try {
    return renderToStaticMarkup(React.createElement(App));
  } finally {
    for (const key of ["window", "localStorage"] as const) {
      if (previous[key] === undefined) delete scope[key];
      else scope[key] = previous[key];
    }
  }
}

const FOOTER_RENDER_PATHS = [
  { label: "footer (en)", path: "/" },
  { label: "footer (bn)", path: "/bn/" },
];

// Class-level regression guard only: Tailwind tokens cannot prove the rendered
// element meets the header at each viewport. That pixel evidence is measured by
// the headless-browser pass; this catches the old 24/32px partial offsets.
const blogIndexSource = read(path.join(ROOT_DIR, "src", "routes", "BlogIndexRouteView.tsx")) ?? "";
const blogPostSource = read(path.join(ROOT_DIR, "src", "routes", "BlogPostRouteView.tsx")) ?? "";
const appSpacingSource = read(path.join(ROOT_DIR, "src", "App.tsx")) ?? "";
function classNameAfter(source: string, marker: string): string {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";
  return source.slice(markerIndex, markerIndex + 900).match(/className="([^"]+)"/)?.[1] ?? "";
}
function cancelsMainTopPadding(className: string): boolean {
  const classes = new Set(className.split(/\s+/));
  return classes.has("-mt-10") && classes.has("sm:-mt-12");
}
const mainTopPaddingIsKnown =
  /<main id="main-content" className="[^"]*py-10 sm:py-12/.test(appSpacingSource);
const blogHeroOffsetClasses = classNameAfter(blogIndexSource, 'aria-labelledby="blog-hero-h1"');
const blogPostBreadcrumbOffsetClasses = classNameAfter(blogPostSource, "data-blog-breadcrumb");
const blogSpacingClassContractHolds =
  mainTopPaddingIsKnown &&
  cancelsMainTopPadding(blogHeroOffsetClasses) &&
  cancelsMainTopPadding(blogPostBreadcrumbOffsetClasses);
check(
  blogSpacingClassContractHolds,
  blogSpacingClassContractHolds
    ? "blog hero and article breadcrumb cancel main's py-10/sm:py-12 padding at class level (pixels checked in browser)"
    : "blog hero and article breadcrumb must offset main's full py-10/sm:py-12 top padding"
);
const oldPartialOffsetNegativeControlRejectsRegression =
  !cancelsMainTopPadding("-mt-6 sm:-mt-8");
check(
  oldPartialOffsetNegativeControlRejectsRegression,
  oldPartialOffsetNegativeControlRejectsRegression
    ? "blog spacing class guard rejects the old partial offsets (negative control)"
    : "blog spacing class guard failed its old-offset negative control"
);

for (const { label, path: routePath } of FOOTER_RENDER_PATHS) {
  let markup = "";
  try {
    markup = renderAppAtPath(routePath);
  } catch (error) {
    check(false, `${label} renders as React markup (threw: ${String(error)})`);
    continue;
  }

  const footerStart = markup.indexOf("<footer");
  const footerEnd = footerStart === -1 ? -1 : markup.indexOf("</footer>", footerStart);
  if (footerStart === -1 || footerEnd === -1) {
    check(false, `${label} renders a <footer> element`);
    continue;
  }
  const footer = markup.slice(footerStart, footerEnd);

  // 1. What the reader sees. An entity decoded once must not survive: if it
  //    does, it was written in a JS string, where nothing decodes it.
  const entities = (visibleText(footer).match(/&amp;/g) ?? []).length;
  check(
    entities === 0,
    entities === 0
      ? `${label} prints no literal "&amp;" (entities belong in JSX text, never in JS strings)`
      : `${label} prints "&amp;" ${entities} time(s) — an entity sits inside a JS string literal; JSX text decodes entities, JS strings do not`
  );

  // 2. The grid. The band takes the whole row; the columns that follow it must
  //    still add up to exactly one row, because an unspanned child takes one
  //    column and silently wraps everything after it.
  const grid = FOOTER_GRID_TAG.exec(footer);
  if (!grid) {
    check(false, `${label} keeps its lg:grid-cols-${FOOTER_GRID_COLUMNS} grid`);
    continue;
  }
  const [band, ...columns] = directChildren(footer, grid.index);
  const bandSpan = band ? columnSpan(band.classes, "lg") : null;
  const bandSpansFullRow =
    bandSpan === FOOTER_GRID_COLUMNS && Boolean(band?.classes.includes("md:col-span-2"));
  check(
    bandSpansFullRow,
    bandSpansFullRow
      ? `${label} support band spans the full row (md:col-span-2 lg:col-span-12)`
      : `${label} support band must span the full row: wanted md:col-span-2 lg:col-span-12, found ${
          bandSpan === null ? "no lg col-span" : `lg:col-span-${bandSpan}`
        }${band?.classes.includes("md:col-span-2") ? "" : " and no md col-span"}`
  );

  const spans = columns.map((column) => columnSpan(column.classes, "lg"));
  const total = spans.reduce<number>((sum, span) => sum + (span ?? 0), 0);
  const rowBalances = total === FOOTER_GRID_COLUMNS && !spans.includes(null);
  check(
    rowBalances,
    rowBalances
      ? `${label} columns after the band total exactly ${FOOTER_GRID_COLUMNS} (${spans.join(" + ")})`
      : `${label} columns after the band total ${total} over ${columns.length} children (${spans
          .map((span) => span ?? "none")
          .join(" + ")}) against ${FOOTER_GRID_COLUMNS} tracks — a child with no col-span takes one column, so the rest of the row wraps`
  );
}

// --- Route views render (a throw here blanks the whole page) ---------------
//
// A route view is the only thing between a URL and the reader, and nothing in
// this file rendered one until now: /contact and /bn/contact shipped as blank
// pages because `getResponsiveImageDimensions` throws when an optimized photo
// has no entry in RESPONSIVE_IMAGE_HEIGHTS, and the new support-desk hero was
// added without one. The prerender never calls that lookup (it writes its own
// <link rel="preload"> URL), `tsc` cannot know the height, and the build stayed
// green — the blank page only existed in a browser. Rendering the view is the
// only check that can see it.
//
// The context below is a stub, deliberately minimal: these views read their data
// from App's route context, and the check is "does it render at all", not "is
// the copy right". If a view starts needing another context field to render,
// extend the stub — do not delete the check.

const ROUTE_RENDER_STUBS = {
  "/contact": ContactRouteView,
} as const;

for (const [name, view] of Object.entries(ROUTE_RENDER_STUBS)) {
  for (const isBn of [false, true]) {
    const locale = isBn ? "bn" : "en";
    try {
      const markup = renderToStaticMarkup(
        React.createElement(view as any, {
          context: {
            isBn,
            lang: locale,
            section: name.replace(/^\//, ""),
            navigateTo: () => {},
            contactDestination: "",
            contactLoading: false,
            contactMessage: "",
            contactName: "",
            contactPhone: "",
            contactSubject: "",
            contactSubmitted: false,
            setContactDestination: () => {},
            setContactLoading: () => {},
            setContactMessage: () => {},
            setContactName: () => {},
            setContactPhone: () => {},
            setContactSubject: () => {},
            setContactSubmitted: () => {},
          },
        })
      );
      const text = visibleText(markup);
      const heading = /<h1\b/.test(markup);
      const wordCount = words(text).length;
      check(
        heading && wordCount >= 40,
        heading && wordCount >= 40
          ? `${name} (${locale}) renders ${wordCount} words and its heading`
          : `${name} (${locale}) rendered ${wordCount} words with ${heading ? "a" : "no"} heading — the page is effectively empty`
      );
    } catch (error) {
      check(false, `${name} (${locale}) renders without throwing (threw: ${String(error).slice(0, 160)})`);
    }
  }
}

// --- Crawlable Bengali parity ----------------------------------------------
//
// The bilingual render check above proves the React page is Bengali. It does not
// prove a crawler sees Bengali: the shell built by scripts/prerender.ts is a
// separate code path, and /bn/visa-free-countries shipped as a 55-word shell
// against a 1,755-word English page for exactly that reason. Anything listed
// here is claiming parity, so it is held to it — a route is added once its
// Bengali body has actually landed, never before.

const BENGALI_PARITY_ROUTES = [
  { path: "/visa-free-countries", minShare: 0.6 },
];

function crawlableText(relativePath: string): string | null {
  const file = path.join(DIST_DIR, relativePath);
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, "utf8");
  const bodyIndex = html.indexOf("<body");
  return visibleText(html.slice(bodyIndex === -1 ? 0 : bodyIndex));
}

for (const { path: routePath, minShare } of BENGALI_PARITY_ROUTES) {
  const english = crawlableText(`${routePath.replace(/^\//, "")}.html`);
  const bengali = crawlableText(`bn/${routePath.replace(/^\//, "")}.html`);
  if (english === null || bengali === null) {
    check(false, `${routePath} has both an English and a Bengali crawlable page`);
    continue;
  }
  const englishWords = words(english).length;
  const bengaliWords = words(bengali).length;
  const share = englishWords === 0 ? 0 : bengaliWords / englishWords;
  check(
    share >= minShare,
    share >= minShare
      ? `${routePath} Bengali page is ${bengaliWords} crawlable words against ${englishWords} English (${Math.round(share * 100)}%)`
      : `${routePath} Bengali page is only ${bengaliWords} crawlable words against ${englishWords} English (${Math.round(share * 100)}%, needs ${Math.round(minShare * 100)}%)`
  );

  const leaked = sentences(english).filter((x) => bengali.includes(x));
  check(
    leaked.length === 0,
    leaked.length === 0
      ? `${routePath} has no English sentences in its Bengali crawlable HTML`
      : `${routePath} shows ${leaked.length} English sentence(s) in its Bengali crawlable HTML: "${leaked[0].slice(0, 80)}"`
  );
}

// --- B2. Thailand visa fee, evidence, and route-copy regression guards -----
//
// These assertions cover source data AND the built pages that readers/crawlers
// receive. Each assertion has a deliberately corrupted negative control: if a
// stale amount, conflated cost, old submission flow, or missing dated caveat is
// reintroduced, the positive guard must fail on that changed sample.

const B2_THAI_VISA_ID = "thailand-visa";
const B2_THAI_ARTICLE_SLUG = "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide";
const B2_FAMILY_ARTICLE_SLUG = "top-budget-family-destinations-from-dhaka";
const B2_THAI_EN = VISA_DATA.find((visa) => visa.id === B2_THAI_VISA_ID);
const B2_THAI_BN = getLocalizedVisas("bn").find((visa) => visa.id === B2_THAI_VISA_ID);
const B2_FLIGHT_EN = FLIGHTS_DATA.find((flight) => flight.id === "dhaka-bangkok");
const B2_FLIGHT_BN = getLocalizedFlights("bn").find((flight) => flight.id === "dhaka-bangkok");
const B2_VISA_FREE = COMMONLY_MISREAD.find((entry) => entry.country === "Thailand");
const B2_THAI_COST_EN = TRIP_COSTS_DATA.find((cost) => cost.id === "thailand-costs");
const B2_THAI_COST_BN = getLocalizedCosts("bn").find((cost) => cost.id === "thailand-costs");
const B2_DESTINATION_EN = DESTINATIONS_DATA.find((destination) => destination.id === "thailand-guide");
const B2_DESTINATION_BN = getLocalizedDestinations("bn").find((destination) => destination.id === "thailand-guide");
const B2_ARTICLE_EN = BLOG_BODY[B2_THAI_ARTICLE_SLUG] ?? "";
const B2_ARTICLE_BN = BENGALI_BLOG_OVERRIDES[B2_THAI_ARTICLE_SLUG]?.content ?? "";
const B2_FAMILY_ARTICLE_EN = BLOG_BODY[B2_FAMILY_ARTICLE_SLUG] ?? "";
const B2_FAMILY_ARTICLE_BN = BENGALI_BLOG_OVERRIDES[B2_FAMILY_ARTICLE_SLUG]?.content ?? "";
const B2_EN_VISA_HTML = read(path.join(DIST_DIR, "visa", "thailand-visa.html")) ?? "";
const B2_BN_VISA_HTML = read(path.join(DIST_DIR, "bn", "visa", "thailand-visa.html")) ?? "";
const B2_EN_BLOG_HTML = read(path.join(DIST_DIR, "blog", `${B2_THAI_ARTICLE_SLUG}.html`)) ?? "";
const B2_BN_BLOG_HTML = read(path.join(DIST_DIR, "bn", "blog", `${B2_THAI_ARTICLE_SLUG}.html`)) ?? "";
const B2_EN_FLIGHT_HTML = read(path.join(DIST_DIR, "flights", "dhaka-bangkok.html")) ?? "";
const B2_BN_FLIGHT_HTML = read(path.join(DIST_DIR, "bn", "flights", "dhaka-bangkok.html")) ?? "";
const B2_EN_VISA_FREE_HTML = read(path.join(DIST_DIR, "visa-free-countries.html")) ?? "";
const B2_EN_COST_HTML = read(path.join(DIST_DIR, "costs", "thailand-costs.html")) ?? "";
const B2_BN_COST_HTML = read(path.join(DIST_DIR, "bn", "costs", "thailand-costs.html")) ?? "";
const B2_EN_DESTINATION_HTML = read(path.join(DIST_DIR, "destinations", "thailand-guide.html")) ?? "";
const B2_BN_DESTINATION_HTML = read(path.join(DIST_DIR, "bn", "destinations", "thailand-guide.html")) ?? "";

function b2VisaCopy(visa: (typeof VISA_DATA)[number] | undefined): string {
  if (!visa) return "";
  return [
    visa.requirementType,
    visa.costBdt,
    visa.quickAnswer,
    ...visa.documentChecklist.flatMap((group) => [group.category, ...group.items]),
    ...visa.stepByStep,
    ...visa.keyFacts.map((fact) => `${fact.label}: ${fact.value}`),
    ...visa.faqs.flatMap((faq) => [faq.question, faq.answer]),
    visa.schemaMarkup?.description ?? "",
    visa.schemaMarkup?.code ?? "",
  ].join(" ");
}

const B2_UNVERIFIED_FEE_AMOUNT =
  /\bUSD\s*(?:35\s*[–—-]\s*40|40)\b|\bTHB\s*2[,.]?000\b|\bBDT\s*(?:4[,.]?800|4[,.]?890|6[,.]?500|8[,.]?500)\b|\bBDT\s*1[,.]?600\s*[–—-]\s*3[,.]?610\b/i;
function b2HasNoUnverifiedFeeAmount(text: string): boolean {
  return !B2_UNVERIFIED_FEE_AMOUNT.test(text);
}

function b2HasSeparateFeeCategories(text: string, locale: "en" | "bn"): boolean {
  if (!b2HasNoUnverifiedFeeAmount(text)) return false;
  return locale === "en"
    ? /government tourist e-visa fee/i.test(text) &&
        /bank or payment-provider charges are separate/i.test(text) &&
        /optional agency service fees are separate/i.test(text)
    : /সরকারি Tourist e-Visa fee/i.test(text) &&
        /Bank\/payment charge আলাদা/i.test(text) &&
        /Optional agency service fee আলাদা/i.test(text);
}

function b2HasDatedFundsCaveat(text: string, locale: "en" | "bn"): boolean {
  return locale === "en"
    ? /November 30, 2022/.test(text) &&
        /BDT 60,000 per person/.test(text) &&
        /BDT 120,000 per family/.test(text) &&
        /six-month bank statements?/i.test(text) &&
        /current portal prompts may differ/i.test(text)
    : /৩০ নভেম্বর ২০২২/.test(text) &&
        /BDT 60,000/.test(text) &&
        /BDT 120,000/.test(text) &&
        /৬ মাসের statement/.test(text) &&
        /ভিন্ন হতে পারে/.test(text);
}

const B2_EN_FEE_FIELD = B2_THAI_EN?.costBdt ?? "";
const B2_BN_FEE_FIELD = B2_THAI_BN?.costBdt ?? "";
const b2EnglishFeeCategoriesAreSeparate = b2HasSeparateFeeCategories(B2_EN_FEE_FIELD, "en");
check(
  b2EnglishFeeCategoriesAreSeparate,
  b2EnglishFeeCategoriesAreSeparate
    ? "Thailand English fee guidance separates the current government fee, bank/payment charges, and optional agency service fees without unverified amounts"
    : "Thailand English fee guidance must separate government, bank/payment, and optional agency costs without hardcoded unverified amounts"
);
const b2EnglishFeeNegativeSample = B2_EN_FEE_FIELD.replace(
  "Bank or payment-provider charges are separate",
  "Bank or payment-provider charges are bundled"
);
const b2EnglishFeeNegativeControlWorks =
  b2EnglishFeeCategoriesAreSeparate &&
  b2EnglishFeeNegativeSample !== B2_EN_FEE_FIELD &&
  !b2HasSeparateFeeCategories(b2EnglishFeeNegativeSample, "en");
check(
  b2EnglishFeeNegativeControlWorks,
  b2EnglishFeeNegativeControlWorks
    ? "English fee-separation guard rejects a deliberately bundled bank/payment charge (negative control)"
    : "English fee-separation guard failed its bundled-charge negative control"
);

const b2BengaliFeeCategoriesAreSeparate = b2HasSeparateFeeCategories(B2_BN_FEE_FIELD, "bn");
check(
  b2BengaliFeeCategoriesAreSeparate,
  b2BengaliFeeCategoriesAreSeparate
    ? "Thailand Bengali fee guidance separates government, bank/payment, and optional agency costs without unverified amounts"
    : "Thailand Bengali fee guidance must separately name government, bank/payment, and optional agency costs without hardcoded unverified amounts"
);
const b2BengaliFeeNegativeSample = B2_BN_FEE_FIELD.replace(
  "Bank/payment charge আলাদা",
  "Bank/payment charge একত্রে"
);
const b2BengaliFeeNegativeControlWorks =
  b2BengaliFeeCategoriesAreSeparate &&
  b2BengaliFeeNegativeSample !== B2_BN_FEE_FIELD &&
  !b2HasSeparateFeeCategories(b2BengaliFeeNegativeSample, "bn");
check(
  b2BengaliFeeNegativeControlWorks,
  b2BengaliFeeNegativeControlWorks
    ? "Bengali fee-separation guard rejects a deliberately bundled bank/payment charge (negative control)"
    : "Bengali fee-separation guard failed its bundled-charge negative control"
);

const B2_EN_FUNDS_TEXT = B2_THAI_EN?.quickAnswer ?? "";
const B2_BN_FUNDS_TEXT = B2_THAI_BN?.quickAnswer ?? "";
const b2EnglishFundsCaveatIsDated = b2HasDatedFundsCaveat(B2_EN_FUNDS_TEXT, "en");
check(
  b2EnglishFundsCaveatIsDated,
  b2EnglishFundsCaveatIsDated
    ? "English Thailand guidance preserves the dated Nov 30, 2022 BDT 60,000/120,000 funds caveat and says to confirm the live checklist"
    : "English Thailand guidance must retain the dated Nov 30, 2022 BDT 60,000/120,000 caveat and current-checklist warning"
);
const b2EnglishFundsNegativeSample = B2_EN_FUNDS_TEXT.replace("November 30, 2022", "November 30, 2025");
const b2EnglishFundsNegativeControlWorks =
  b2EnglishFundsCaveatIsDated &&
  b2EnglishFundsNegativeSample !== B2_EN_FUNDS_TEXT &&
  !b2HasDatedFundsCaveat(b2EnglishFundsNegativeSample, "en");
check(
  b2EnglishFundsNegativeControlWorks,
  b2EnglishFundsNegativeControlWorks
    ? "English funds-caveat guard rejects a deliberately changed checklist date (negative control)"
    : "English funds-caveat guard failed its changed-date negative control"
);

const b2BengaliFundsCaveatIsDated = b2HasDatedFundsCaveat(B2_BN_FUNDS_TEXT, "bn");
check(
  b2BengaliFundsCaveatIsDated,
  b2BengaliFundsCaveatIsDated
    ? "Bengali Thailand guidance preserves the dated BDT 60,000/120,000 funds caveat and current-portal warning"
    : "Bengali Thailand guidance must retain the dated BDT 60,000/120,000 caveat and current-portal warning"
);
const b2BengaliFundsNegativeSample = B2_BN_FUNDS_TEXT.replace("৩০ নভেম্বর ২০২২", "৩০ নভেম্বর ২০২৫");
const b2BengaliFundsNegativeControlWorks =
  b2BengaliFundsCaveatIsDated &&
  b2BengaliFundsNegativeSample !== B2_BN_FUNDS_TEXT &&
  !b2HasDatedFundsCaveat(b2BengaliFundsNegativeSample, "bn");
check(
  b2BengaliFundsNegativeControlWorks,
  b2BengaliFundsNegativeControlWorks
    ? "Bengali funds-caveat guard rejects a deliberately changed checklist date (negative control)"
    : "Bengali funds-caveat guard failed its changed-date negative control"
);

function b2ArticleFeeLine(body: string, marker: string): string {
  return body.split("\n").find((line) => line.includes(marker)) ?? "";
}
const B2_EN_ARTICLE_FEE_LINE = b2ArticleFeeLine(B2_ARTICLE_EN, "**Fees and payment:**");
const B2_BN_ARTICLE_FEE_LINE = b2ArticleFeeLine(B2_ARTICLE_BN, "**ফি ও পেমেন্ট:**");
function b2HasArticleFeeSeparation(enLine: string, bnLine: string): boolean {
  return (
    /government visa fee/i.test(enLine) &&
    /Bank or payment-provider charges are separate/i.test(enLine) &&
    /optional agency service fees are separate/i.test(enLine) &&
    b2HasNoUnverifiedFeeAmount(enLine) &&
    /সরকারি visa fee/i.test(bnLine) &&
    /Bank\/payment-provider charge আলাদা/i.test(bnLine) &&
    /agency service fee-ও আলাদা/i.test(bnLine) &&
    b2HasNoUnverifiedFeeAmount(bnLine)
  );
}
const b2BilingualArticleFeeCopyIsSafe =
  Boolean(B2_ARTICLE_EN && B2_ARTICLE_BN) &&
  b2HasArticleFeeSeparation(B2_EN_ARTICLE_FEE_LINE, B2_BN_ARTICLE_FEE_LINE);
check(
  b2BilingualArticleFeeCopyIsSafe,
  b2BilingualArticleFeeCopyIsSafe
    ? "English and Bengali Thailand e-Visa articles separate all fee categories and publish no unverified current amount"
    : "Both Thailand e-Visa articles must state separate government, payment, and optional agency costs without unverified amounts"
);
const b2BrokenArticleFeeLine = B2_EN_ARTICLE_FEE_LINE.replace(
  "Bank or payment-provider charges are separate",
  "Bank or payment-provider charges are included"
);
const b2ArticleFeeNegativeControlWorks =
  b2BilingualArticleFeeCopyIsSafe &&
  b2BrokenArticleFeeLine !== B2_EN_ARTICLE_FEE_LINE &&
  !b2HasArticleFeeSeparation(b2BrokenArticleFeeLine, B2_BN_ARTICLE_FEE_LINE);
check(
  b2ArticleFeeNegativeControlWorks,
  b2ArticleFeeNegativeControlWorks
    ? "bilingual article fee guard rejects deliberately conflated payment charges (negative control)"
    : "bilingual article fee guard failed its conflated-charge negative control"
);

const B2_FEE_SOURCE_URLS = [
  "https://dhaka.thaiembassy.org/en/content/consular-service-fee-updated-september-2025?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e",
  "https://dhaka.thaiembassy.org/en/content/facilitation-ofe-visa-payment?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e",
];
const B2_EN_ARTICLE_REFS = BLOG_DATA.find((post) => post.slug === B2_THAI_ARTICLE_SLUG)?.references;
const B2_BN_ARTICLE_REFS = BENGALI_BLOG_OVERRIDES[B2_THAI_ARTICLE_SLUG]?.references;
function b2HasFeeSourceLinks(references: readonly { url: string }[] | undefined): boolean {
  return Boolean(references) && B2_FEE_SOURCE_URLS.every((url) => references?.some((ref) => ref.url === url));
}
const b2BothArticlesLinkOfficialFeeSources =
  b2HasFeeSourceLinks(B2_EN_ARTICLE_REFS) && b2HasFeeSourceLinks(B2_BN_ARTICLE_REFS);
check(
  b2BothArticlesLinkOfficialFeeSources,
  b2BothArticlesLinkOfficialFeeSources
    ? "English and Bengali Thailand e-Visa articles link the Embassy's fee schedule and payment notice"
    : "Both Thailand e-Visa articles must link the current Embassy fee schedule and payment notice"
);
const b2RefsWithoutPaymentNotice = (B2_BN_ARTICLE_REFS ?? []).filter(
  (reference) => reference.url !== B2_FEE_SOURCE_URLS[1]
);
const b2FeeSourceNegativeControlWorks =
  b2BothArticlesLinkOfficialFeeSources && !b2HasFeeSourceLinks(b2RefsWithoutPaymentNotice);
check(
  b2FeeSourceNegativeControlWorks,
  b2FeeSourceNegativeControlWorks
    ? "official-source guard rejects a Bengali article with its payment notice removed (negative control)"
    : "official-source guard failed its removed-payment-notice negative control"
);

function b2RenderedVisaFeeCopyIsSafe(html: string, expectedCost: string, locale: "en" | "bn"): boolean {
  const rendered = visibleText(html);
  const hasDatedFunds = locale === "en"
    ? /November 30, 2022/.test(rendered) && /BDT 60,000 per person/.test(rendered) && /BDT 120,000 per family/.test(rendered)
    : /হালনাগাদ ৩০ নভেম্বর ২০২২/.test(rendered) &&
        /জনপ্রতি BDT 60,000/.test(rendered) &&
        /পরিবারে BDT 120,000/.test(rendered);
  return Boolean(html && expectedCost && rendered.includes(expectedCost) && hasDatedFunds);
}
const b2EnglishVisaPageIsSafe = b2RenderedVisaFeeCopyIsSafe(B2_EN_VISA_HTML, B2_EN_FEE_FIELD, "en");
check(
  b2EnglishVisaPageIsSafe,
  b2EnglishVisaPageIsSafe
    ? "prerendered English Thailand visa page emits its source-safe fee breakdown and dated proof-of-funds caveat"
    : "prerendered English Thailand visa page is missing the fee breakdown or dated proof-of-funds caveat"
);
const b2EnglishVisaPageNegativeHtml = B2_EN_VISA_HTML.replace(
  B2_EN_FEE_FIELD,
  "Government fee plus agency total: BDT 6,500"
);
const b2EnglishVisaPageNegativeControlWorks =
  b2EnglishVisaPageIsSafe &&
  Boolean(B2_EN_FEE_FIELD) &&
  !b2RenderedVisaFeeCopyIsSafe(b2EnglishVisaPageNegativeHtml, B2_EN_FEE_FIELD, "en");
check(
  b2EnglishVisaPageNegativeControlWorks,
  b2EnglishVisaPageNegativeControlWorks
    ? "English visa-page output guard rejects a deliberately conflated, hardcoded fee (negative control)"
    : "English visa-page output guard failed its conflated-fee negative control"
);

const b2BengaliVisaPageIsSafe = b2RenderedVisaFeeCopyIsSafe(B2_BN_VISA_HTML, B2_BN_FEE_FIELD, "bn");
check(
  b2BengaliVisaPageIsSafe,
  b2BengaliVisaPageIsSafe
    ? "prerendered Bengali Thailand visa page emits its localized fee breakdown and dated proof-of-funds caveat"
    : "prerendered Bengali Thailand visa page is missing its localized fee breakdown or dated funds caveat"
);
const b2BengaliVisaPageNegativeHtml = B2_BN_VISA_HTML.replace(
  B2_BN_FEE_FIELD,
  "সরকারি fee ও agency fee মোট BDT 6,500"
);
const b2BengaliVisaPageNegativeControlWorks =
  b2BengaliVisaPageIsSafe &&
  Boolean(B2_BN_FEE_FIELD) &&
  !b2RenderedVisaFeeCopyIsSafe(b2BengaliVisaPageNegativeHtml, B2_BN_FEE_FIELD, "bn");
check(
  b2BengaliVisaPageNegativeControlWorks,
  b2BengaliVisaPageNegativeControlWorks
    ? "Bengali visa-page output guard rejects a deliberately conflated, hardcoded fee (negative control)"
    : "Bengali visa-page output guard failed its conflated-fee negative control"
);

function b2HasLegacyStickerWorkflow(text: string): boolean {
  return /sticker\s*visa|VFS(?:\s+Global)?|Simon\s+Logistics/i.test(text);
}
function b2HasNoLegacyStickerWorkflow(text: string): boolean {
  return !b2HasLegacyStickerWorkflow(text);
}
const B2_BD_ELIGIBILITY_SOURCE = read(path.join(ROOT_DIR, "src", "components", "InteractiveTools.tsx")) ?? "";
const B2_BD_ELIGIBILITY_BLOCK = B2_BD_ELIGIBILITY_SOURCE.match(/bd:\s*\{([\s\S]*?)\n\s*},\s*in:/)?.[1] ?? "";
const B2_INTERACTIVE_THAILAND_RESULT = B2_BD_ELIGIBILITY_BLOCK.match(/th:\s*\{([^}]*)\}/)?.[1] ?? "";
const B2_TOPICAL_SOURCE = read(path.join(ROOT_DIR, "src", "components", "TopicalAuthorityBlueprint.tsx")) ?? "";
const b2TopicalStart = B2_TOPICAL_SOURCE.indexOf('id: "iv-03"');
const b2TopicalEnd = B2_TOPICAL_SOURCE.indexOf('id: "iv-04"', b2TopicalStart + 1);
const B2_TOPICAL_THAILAND_BLOCK =
  b2TopicalStart === -1 || b2TopicalEnd === -1
    ? ""
    : B2_TOPICAL_SOURCE.slice(b2TopicalStart, b2TopicalEnd);
const b2FamilyBudgetStart = B2_TOPICAL_SOURCE.indexOf('id: "hf-01"');
const b2FamilyBudgetEnd = B2_TOPICAL_SOURCE.indexOf('id: "hf-02"', b2FamilyBudgetStart + 1);
const B2_FAMILY_BUDGET_TOPIC_BLOCK =
  b2FamilyBudgetStart === -1 || b2FamilyBudgetEnd === -1
    ? ""
    : B2_TOPICAL_SOURCE.slice(b2FamilyBudgetStart, b2FamilyBudgetEnd);
const B2_RELEVANT_THAILAND_COPY = [
  b2VisaCopy(B2_THAI_EN),
  b2VisaCopy(B2_THAI_BN),
  B2_FLIGHT_EN ? `${B2_FLIGHT_EN.visaRequirement} ${B2_FLIGHT_EN.quickAnswer} ${B2_FLIGHT_EN.faqs.map((faq) => faq.answer).join(" ")}` : "",
  B2_FLIGHT_BN ? `${B2_FLIGHT_BN.visaRequirement} ${B2_FLIGHT_BN.quickAnswer} ${B2_FLIGHT_BN.faqs.map((faq) => faq.answer).join(" ")}` : "",
  B2_VISA_FREE ? `${B2_VISA_FREE.cost} ${B2_VISA_FREE.note} ${B2_VISA_FREE.caveat ?? ""} ${B2_VISA_FREE.bn.cost} ${B2_VISA_FREE.bn.note} ${B2_VISA_FREE.bn.caveat ?? ""}` : "",
  LANDING_VISA_FAQS.map((faq) => `${faq.question} ${faq.answer}`).join(" "),
  LANDING_DESTINATION_FAQS.map((faq) => `${faq.question} ${faq.answer}`).join(" "),
  B2_DESTINATION_BN ? `${B2_DESTINATION_BN.quickAnswer} ${B2_DESTINATION_BN.faqs.map((faq) => faq.answer).join(" ")}` : "",
  B2_INTERACTIVE_THAILAND_RESULT,
  B2_TOPICAL_THAILAND_BLOCK,
  B2_ARTICLE_EN,
  B2_ARTICLE_BN,
  B2_FAMILY_ARTICLE_EN,
  B2_FAMILY_ARTICLE_BN,
  visibleText(B2_EN_VISA_HTML),
  visibleText(B2_BN_VISA_HTML),
  visibleText(B2_EN_FLIGHT_HTML),
  visibleText(B2_BN_FLIGHT_HTML),
  visibleText(B2_EN_VISA_FREE_HTML),
  visibleText(B2_BN_DESTINATION_HTML),
].join("\n");
const b2StaleStickerReferencesAreGone = b2HasNoLegacyStickerWorkflow(B2_RELEVANT_THAILAND_COPY);
check(
  b2StaleStickerReferencesAreGone,
  b2StaleStickerReferencesAreGone
    ? "Thailand/Bangladesh visa, FAQ, route, checker, article, and prerender copy contains no obsolete sticker/VFS workflow"
    : "obsolete Thailand sticker-visa, VFS, or Simon Logistics instructions remain in relevant user-facing copy"
);
const b2LegacyStickerNegativeSample = `${B2_RELEVANT_THAILAND_COPY}\nPre-arranged sticker visa via VFS Global.`;
const b2LegacyStickerNegativeControlWorks =
  b2StaleStickerReferencesAreGone && !b2HasNoLegacyStickerWorkflow(b2LegacyStickerNegativeSample);
check(
  b2LegacyStickerNegativeControlWorks,
  b2LegacyStickerNegativeControlWorks
    ? "legacy workflow guard rejects an injected sticker/VFS instruction (negative control)"
    : "legacy workflow guard failed its injected sticker/VFS negative control"
);

function b2FlightRouteIsCurrent(en: typeof B2_FLIGHT_EN, bn: typeof B2_FLIGHT_BN): boolean {
  const enCopy = en ? `${en.visaRequirement} ${en.quickAnswer} ${en.faqs.map((faq) => faq.answer).join(" ")}` : "";
  const bnCopy = bn ? `${bn.visaRequirement} ${bn.quickAnswer} ${bn.faqs.map((faq) => faq.answer).join(" ")}` : "";
  return Boolean(
    en &&
      bn &&
      /thaievisa\.go\.th/i.test(enCopy) &&
      /official portal/i.test(enCopy) &&
      /e-Visa/i.test(bnCopy) &&
      b2HasNoLegacyStickerWorkflow(enCopy) &&
      b2HasNoLegacyStickerWorkflow(bnCopy)
  );
}
const b2FlightRouteCopyIsCurrent = b2FlightRouteIsCurrent(B2_FLIGHT_EN, B2_FLIGHT_BN);
check(
  b2FlightRouteCopyIsCurrent,
  b2FlightRouteCopyIsCurrent
    ? "Dhaka–Bangkok flight guidance points Bangladeshi travelers to the official e-Visa route in both locales"
    : "Dhaka–Bangkok flight guidance must use the current official e-Visa route in English and Bengali"
);
const b2FlightNegativeControl = B2_FLIGHT_EN
  ? { ...B2_FLIGHT_EN, visaRequirement: "Pre-arranged sticker visa via VFS Global" }
  : undefined;
const b2FlightNegativeControlWorks =
  b2FlightRouteCopyIsCurrent &&
  Boolean(b2FlightNegativeControl) &&
  !b2FlightRouteIsCurrent(b2FlightNegativeControl, B2_FLIGHT_BN);
check(
  b2FlightNegativeControlWorks,
  b2FlightNegativeControlWorks
    ? "flight-route guard rejects a deliberately restored sticker/VFS requirement (negative control)"
    : "flight-route guard failed its sticker/VFS negative control"
);

function b2VisaFreeThailandEntryIsSafe(entry: typeof B2_VISA_FREE): boolean {
  if (!entry) return false;
  const enCopy = `${entry.cost} ${entry.note} ${entry.caveat ?? ""}`;
  const bnCopy = `${entry.bn.cost} ${entry.bn.note} ${entry.bn.caveat ?? ""}`;
  return (
    /current government e-Visa fee/i.test(entry.cost) &&
    /official portal/i.test(entry.note) &&
    /current financial evidence/i.test(entry.caveat ?? "") &&
    /সরকারি e-Visa fee/i.test(entry.bn.cost) &&
    /Tourist e-Visa/i.test(entry.bn.note) &&
    /হালনাগাদ ৩০ নভেম্বর ২০২২/.test(entry.bn.caveat ?? "") &&
    b2HasNoUnverifiedFeeAmount(enCopy) &&
    b2HasNoUnverifiedFeeAmount(bnCopy) &&
    b2HasNoLegacyStickerWorkflow(enCopy) &&
    b2HasNoLegacyStickerWorkflow(bnCopy)
  );
}
const b2VisaFreeEntryCopyIsSafe = b2VisaFreeThailandEntryIsSafe(B2_VISA_FREE);
check(
  b2VisaFreeEntryCopyIsSafe,
  b2VisaFreeEntryCopyIsSafe
    ? "visa-free-country Thailand entry distinguishes the current e-Visa fee check and dated evidence caveat in both locales"
    : "Thailand visa-free-list entry must avoid unsupported fees and sticker wording while preserving the dated evidence caveat"
);
const b2VisaFreeEntryNegativeSample = B2_VISA_FREE
  ? { ...B2_VISA_FREE, cost: `${B2_VISA_FREE.cost}; Approx. USD 35–40` }
  : undefined;
const b2VisaFreeEntryNegativeControlWorks =
  b2VisaFreeEntryCopyIsSafe &&
  Boolean(b2VisaFreeEntryNegativeSample) &&
  !b2VisaFreeThailandEntryIsSafe(b2VisaFreeEntryNegativeSample);
check(
  b2VisaFreeEntryNegativeControlWorks,
  b2VisaFreeEntryNegativeControlWorks
    ? "visa-free-list guard rejects an injected unverified Thai visa fee (negative control)"
    : "visa-free-list guard failed its unverified-fee negative control"
);

function b2LandingVisaFaqsAreSafe(
  visaFaqs: typeof LANDING_VISA_FAQS,
  destinationFaqs: typeof LANDING_DESTINATION_FAQS
): boolean {
  const funds = visaFaqs.find((faq) => /standard bank balance/i.test(faq.question))?.answer ?? "";
  const timing = visaFaqs.find((faq) => /How long before travel/i.test(faq.question))?.answer ?? "";
  const firstTrip = visaFaqs.find((faq) => /first-time Bangladeshi/i.test(faq.question))?.answer ?? "";
  const destinationThailand = destinationFaqs.find((faq) => /best international holiday/i.test(faq.question))?.answer ?? "";
  return (
    /no universal balance requirement/i.test(funds) &&
    /November 30, 2022/.test(funds) &&
    /BDT 60,000 per person/.test(funds) &&
    /BDT 120,000 per family/.test(funds) &&
    !/BDT\s*60,000\s*(?:to|[-–])\s*BDT\s*150,000/i.test(funds) &&
    /not guaranteed/i.test(timing) &&
    b2HasNoLegacyStickerWorkflow(timing) &&
    /approval is never guaranteed/i.test(firstTrip) &&
    b2HasNoLegacyStickerWorkflow(destinationThailand)
  );
}
const b2LandingFaqsAreSafe = b2LandingVisaFaqsAreSafe(LANDING_VISA_FAQS, LANDING_DESTINATION_FAQS);
check(
  b2LandingFaqsAreSafe,
  b2LandingFaqsAreSafe
    ? "landing visa and destination FAQs avoid a universal balance claim and use dated Thailand evidence with no sticker timeline"
    : "landing visa FAQs must avoid the unsupported universal bank-balance range and stale sticker timeline"
);
const b2LandingFaqNegativeVisaFaqs = LANDING_VISA_FAQS.map((faq) =>
  /standard bank balance/i.test(faq.question)
    ? { ...faq, answer: `${faq.answer} Standard minimum BDT 60,000 to BDT 150,000.` }
    : faq
);
const b2LandingFaqNegativeControlWorks =
  b2LandingFaqsAreSafe &&
  !b2LandingVisaFaqsAreSafe(b2LandingFaqNegativeVisaFaqs, LANDING_DESTINATION_FAQS);
check(
  b2LandingFaqNegativeControlWorks,
  b2LandingFaqNegativeControlWorks
    ? "landing FAQ guard rejects a deliberately reintroduced universal BDT 60,000–150,000 range (negative control)"
    : "landing FAQ guard failed its universal-balance negative control"
);

function b2BangladeshEligibilityIsCurrent(text: string): boolean {
  return (
    /Advance Tourist e-Visa Required/.test(text) &&
    /official e-Visa portal/i.test(text) &&
    /current Dhaka mission checklist/i.test(text) &&
    !/sticker|VFS|physical application|5-7 working days/i.test(text)
  );
}
const b2BangladeshEligibilityIsSafe = b2BangladeshEligibilityIsCurrent(B2_INTERACTIVE_THAILAND_RESULT);
check(
  b2BangladeshEligibilityIsSafe,
  b2BangladeshEligibilityIsSafe
    ? "Bangladeshi Thailand eligibility tool reports the advance e-Visa route without VFS or a guaranteed timeline"
    : "Bangladeshi Thailand eligibility tool must use the current advance e-Visa route"
);
const b2EligibilityNegativeSample = B2_INTERACTIVE_THAILAND_RESULT.replace(
  "Advance Tourist e-Visa Required",
  "Pre-arranged Sticker Visa Required"
);
const b2EligibilityNegativeControlWorks =
  b2BangladeshEligibilityIsSafe &&
  b2EligibilityNegativeSample !== B2_INTERACTIVE_THAILAND_RESULT &&
  !b2BangladeshEligibilityIsCurrent(b2EligibilityNegativeSample);
check(
  b2EligibilityNegativeControlWorks,
  b2EligibilityNegativeControlWorks
    ? "eligibility-tool guard rejects a deliberately restored sticker-visa status (negative control)"
    : "eligibility-tool guard failed its sticker-status negative control"
);

function b2TopicalAuthorityCopyIsSafe(text: string): boolean {
  return (
    /last updated November 30, 2022/i.test(text) &&
    /BDT 60,000 per person or BDT 120,000 per family/i.test(text) &&
    /৩০ নভেম্বর ২০২২/.test(text) &&
    /BDT 60,000\/পরিবারে BDT 120,000/.test(text) &&
    /Government visa fees, bank\/payment charges, and optional agency service fees are separate/i.test(text) &&
    /সরকারি visa fee, bank\/payment charge ও optional agency fee আলাদা/.test(text) &&
    !/BDT 65,000|THB 20,000 per Person|non-refundable visa fee/i.test(text) &&
    !b2HasLegacyStickerWorkflow(text)
  );
}
const b2TopicalCopyIsSafe = b2TopicalAuthorityCopyIsSafe(B2_TOPICAL_THAILAND_BLOCK);
check(
  b2TopicalCopyIsSafe,
  b2TopicalCopyIsSafe
    ? "topical-authority English/Bengali AEO answers use the dated evidence caveat and separate fee categories"
    : "topical-authority Thailand answers must remove the old balance/fee claim and explain separate fee categories"
);
const b2TopicalNegativeSample = `${B2_TOPICAL_THAILAND_BLOCK}\nBDT 65,000 per person`;
const b2TopicalNegativeControlWorks =
  b2TopicalCopyIsSafe && !b2TopicalAuthorityCopyIsSafe(b2TopicalNegativeSample);
check(
  b2TopicalNegativeControlWorks,
  b2TopicalNegativeControlWorks
    ? "topical-authority guard rejects a deliberately restored BDT 65,000 threshold (negative control)"
    : "topical-authority guard failed its stale-threshold negative control"
);

function b2MetaDescription(html: string): string {
  return html.match(/<meta name="description" content="([^"]*)"\s*\/>/)?.[1]
    ?.replace(/&amp;/g, "&")
    ?.trim() ?? "";
}
function b2ThaiGuideMetaIsSafe(description: string, locale: "en" | "bn"): boolean {
  return locale === "en"
    ? /November 30, 2022/.test(description) &&
        /BDT 60,000\/person/.test(description) &&
        /BDT 120,000\/family/.test(description) &&
        /Government, bank\/payment and optional agency charges are separate/i.test(description) &&
        b2HasNoUnverifiedFeeAmount(description)
    : /হালনাগাদ ৩০ নভেম্বর ২০২২/.test(description) &&
        /জনপ্রতি BDT 60,000/.test(description) &&
        /পরিবারে BDT 120,000/.test(description) &&
        /সরকারি fee, bank\/payment ও optional agency fee আলাদা/.test(description) &&
        b2HasNoUnverifiedFeeAmount(description);
}
function b2VisaHubMetaIsSafe(description: string, locale: "en" | "bn"): boolean {
  return locale === "en"
    ? /government e-Visa fee/i.test(description) &&
        /bank\/payment charges/i.test(description) &&
        /optional agency service fees are separate/i.test(description)
    : /সরকারি fee/i.test(description) &&
        /bank\/payment charge/i.test(description) &&
        /optional agency fee আলাদা/i.test(description);
}
const B2_EN_GUIDE_META = b2MetaDescription(B2_EN_VISA_HTML);
const B2_BN_GUIDE_META = b2MetaDescription(B2_BN_VISA_HTML);
const B2_EN_HUB_META = b2MetaDescription(read(path.join(DIST_DIR, "visa.html")) ?? "");
const B2_BN_HUB_META = b2MetaDescription(read(path.join(DIST_DIR, "bn", "visa.html")) ?? "");
const b2LocalizedSeoCopyIsSafe =
  b2ThaiGuideMetaIsSafe(B2_EN_GUIDE_META, "en") &&
  b2ThaiGuideMetaIsSafe(B2_BN_GUIDE_META, "bn") &&
  b2VisaHubMetaIsSafe(B2_EN_HUB_META, "en") &&
  b2VisaHubMetaIsSafe(B2_BN_HUB_META, "bn");
check(
  b2LocalizedSeoCopyIsSafe,
  b2LocalizedSeoCopyIsSafe
    ? "English/Bengali Thai visa-guide and visa-hub meta descriptions carry current fee separation and dated evidence context"
    : "visa-guide and visa-hub SEO descriptions must preserve the dated caveat and separate fee categories in both locales"
);
const b2BnMetaNegativeSample = B2_BN_GUIDE_META.replace(
  "সরকারি fee, bank/payment ও optional agency fee আলাদা",
  "সরকারি ও agency fees are bundled"
);
const b2SeoNegativeControlWorks =
  b2LocalizedSeoCopyIsSafe &&
  b2BnMetaNegativeSample !== B2_BN_GUIDE_META &&
  !b2ThaiGuideMetaIsSafe(b2BnMetaNegativeSample, "bn");
check(
  b2SeoNegativeControlWorks,
  b2SeoNegativeControlWorks
    ? "localized SEO guard rejects a Bengali meta description with fee categories conflated (negative control)"
    : "localized SEO guard failed its conflated-meta negative control"
);

function b2BudgetFeeDisclosureIsSafe(text: string, locale: "en" | "bn"): boolean {
  return locale === "en"
    ? /visa(?:-related)? charges are not itemized/i.test(text) &&
        /government e-Visa fee/i.test(text) &&
        /bank\/payment charges/i.test(text) &&
        /optional agency(?: service)? fees?/i.test(text) &&
        b2HasNoUnverifiedFeeAmount(text)
    : /visa(?:-related)? charge.{0,80}itemized (?:নয়|নয়)/i.test(text) &&
        /government.{0,20}fee/i.test(text) &&
        /bank\/payment charge/i.test(text) &&
        /optional agency(?: service)? fee/i.test(text) &&
        b2HasNoUnverifiedFeeAmount(text);
}
function b2TripBudgetSurfacesAreSafe(enSurfaces: string[], bnSurfaces: string[]): boolean {
  return (
    enSurfaces.every((text) => Boolean(text) && b2BudgetFeeDisclosureIsSafe(text, "en")) &&
    bnSurfaces.every((text) => Boolean(text) && b2BudgetFeeDisclosureIsSafe(text, "bn"))
  );
}
const B2_EN_FAMILY_BUDGET_SUMMARY =
  BLOG_DATA.find((post) => post.slug === B2_FAMILY_ARTICLE_SLUG)?.summary ?? "";
const B2_BN_FAMILY_BUDGET_SUMMARY =
  BENGALI_BLOG_OVERRIDES[B2_FAMILY_ARTICLE_SLUG]?.summary ?? "";
const B2_EN_COST_META = b2MetaDescription(B2_EN_COST_HTML);
const B2_BN_COST_META = b2MetaDescription(B2_BN_COST_HTML);
const B2_EN_BUDGET_SURFACES = [
  B2_THAI_COST_EN?.quickAnswer ?? "",
  visibleText(B2_EN_COST_HTML),
  B2_EN_COST_META,
  B2_DESTINATION_EN?.budgetBdt ?? "",
  B2_DESTINATION_EN?.quickAnswer ?? "",
  visibleText(B2_EN_DESTINATION_HTML),
  B2_EN_FAMILY_BUDGET_SUMMARY,
  B2_FAMILY_BUDGET_TOPIC_BLOCK,
];
const B2_BN_BUDGET_SURFACES = [
  B2_THAI_COST_BN?.quickAnswer ?? "",
  visibleText(B2_BN_COST_HTML),
  B2_BN_COST_META,
  B2_DESTINATION_BN?.budgetBdt ?? "",
  B2_DESTINATION_BN?.quickAnswer ?? "",
  visibleText(B2_BN_DESTINATION_HTML),
  B2_BN_FAMILY_BUDGET_SUMMARY,
  B2_FAMILY_BUDGET_TOPIC_BLOCK,
];
const b2BudgetEstimateCopyIsSafe = b2TripBudgetSurfacesAreSafe(
  B2_EN_BUDGET_SURFACES,
  B2_BN_BUDGET_SURFACES
);
check(
  b2BudgetEstimateCopyIsSafe,
  b2BudgetEstimateCopyIsSafe
    ? "Thailand trip-cost and family-budget estimates disclose that visa charges are not itemized and must be checked separately"
    : "Thailand trip-cost, destination, and family-budget surfaces must not imply an unverified visa fee is included in their estimates"
);
const b2BudgetFeeNegativeSample = (B2_THAI_COST_EN?.quickAnswer ?? "").replace(
  "Visa-related charges are not itemized",
  "The current government visa fee is BDT 6,500"
);
const b2BudgetFeeNegativeControlWorks =
  b2BudgetEstimateCopyIsSafe &&
  b2BudgetFeeNegativeSample !== (B2_THAI_COST_EN?.quickAnswer ?? "") &&
  !b2TripBudgetSurfacesAreSafe(
    [b2BudgetFeeNegativeSample, ...B2_EN_BUDGET_SURFACES.slice(1)],
    B2_BN_BUDGET_SURFACES
  );
check(
  b2BudgetFeeNegativeControlWorks,
  b2BudgetFeeNegativeControlWorks
    ? "trip-budget guard rejects a deliberately hardcoded visa fee in an estimate (negative control)"
    : "trip-budget guard failed its hardcoded-fee negative control"
);

// --- Wave 3B: the 96-hour stopover guide must not republish an invented fee --
//
// The page used to carry a fixed "~SAR 135 (BDT 4,200)" fee, a "BDT 3,800–4,500"
// total and a "complimentary 1-night hotel voucher", none of which exists on any
// official source. Removed on 2026-10-15 against the Visit Saudi and Saudia
// stopover pages (ledger ST-01/ST-02 in docs/growth/CONTENT-QUEUE.md). These
// patterns are pinned so the figures cannot return silently through a rewrite.
const STOPOVER_SLUG = "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah";
const DUBAI_COMBO_SLUG = "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide";
const STOPOVER_BANNED_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "invented SAR 135 fee total", pattern: /SAR\s*135/i },
  { label: "promised complimentary hotel night", pattern: /complimentary\s+1-night|\u0995\u09ae\u09aa\u09cd\u09b2\u09bf\u09ae\u09c7\u09a8\u09cd\u099f\u09be\u09b0\u09bf\s+\u09b9\u09cb\u099f\u09c7\u09b2\s+\u09ad\u09be\u0989\u099a\u09be\u09b0|\u09e7\s*\u09b0\u09be\u09a4\s*\u09ab\u09cd\u09b0\u09bf\s*\u09b9\u09cb\u099f\u09c7\u09b2/i },
  { label: "universal eligibility claim", pattern: /open to ALL Bangladeshi passport holders|\u09b8\u0995\u09b2\s+\u09ac\u09c8\u09a7\u09ac\u09bf\s+\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09bf/i },
  { label: "unverified train journey time", pattern: /54\s*minute|2h\s*20m|\u09eb\u09ea\s+\u09ae\u09bf\u09a8\u09bf\u099f|\u09e8\s+\u0998\u09a3\u09cd\u099f\u09be\s+\u09e8\u09e6\s+\u09ae\u09bf\u09a8\u09bf\u099f/i },
  { label: "invented visa processing window", pattern: /within 5 to 30 minutes|\u09eb\s+\u09a5\u09c7\u0995\u09c7\s+\u09e9\u09e6\s+\u09ae\u09bf\u09a8\u09bf\u099f/i },
];
// The converted-fee patterns are asserted on the two stopover article bodies
// only: a BDT figure is legitimate copy on unrelated cards rendered beside the
// article (nightly hotel rates, for example).
const STOPOVER_BODY_BANNED_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "invented BDT fee range/total", pattern: /BDT\s*(?:3,800|4,200|4,500)/ },
  { label: "invented BDT fee range/total (Bengali numerals)", pattern: /(?:\u09e9,\u09ee\u09e6\u09e6\s*\u2013\s*\u09ea,\u09eb\u09e6\u09e6|\u09ea,\u09e8\u09e6\u09e6\s*\u099f\u09be\u0995\u09be)/ },
];
const STOPOVER_FEE_PATTERNS = [STOPOVER_BANNED_PATTERNS[0], STOPOVER_BANNED_PATTERNS[1]];
function stopoverViolations(
  text: string,
  patterns: { label: string; pattern: RegExp }[] = STOPOVER_BANNED_PATTERNS
): string[] {
  return patterns.filter((entry) => entry.pattern.test(text)).map((entry) => entry.label);
}
const stopoverRouteHtml = [
  read(path.join(DIST_DIR, "blog", `${STOPOVER_SLUG}.html`)) ?? "",
  read(path.join(DIST_DIR, "bn", "blog", `${STOPOVER_SLUG}.html`)) ?? "",
];
const dubaiComboHtml = [
  read(path.join(DIST_DIR, "blog", `${DUBAI_COMBO_SLUG}.html`)) ?? "",
  read(path.join(DIST_DIR, "bn", "blog", `${DUBAI_COMBO_SLUG}.html`)) ?? "",
];
const stopoverBodies = [
  BLOG_BODY[STOPOVER_SLUG] || "",
  BENGALI_BLOG_OVERRIDES[STOPOVER_SLUG]?.content || "",
];
const stopoverFoundIssues = [
  ...stopoverRouteHtml.map((html, index) => [index, visibleText(html), true] as const),
  ...stopoverBodies.map((body, index) => [index + 100, body, true] as const),
].flatMap(([index, text, includeBodyPatterns]) =>
  stopoverViolations(
    text,
    includeBodyPatterns
      ? [...STOPOVER_BANNED_PATTERNS, ...STOPOVER_BODY_BANNED_PATTERNS]
      : STOPOVER_BANNED_PATTERNS
  ).map((label) => `${index}: ${label}`)
);
// The Dubai-combo twin inherits only the fee/hotel check: its own rail and
// schedule copy belongs to a later wave (UMRAH-CLUSTER-PLAN.md §4 Wave 4).
const dubaiComboIssues = dubaiComboHtml
  .map((html, index) => [index, visibleText(html)] as const)
  .flatMap(([index, text]) =>
    stopoverViolations(text, STOPOVER_FEE_PATTERNS).map((label) => `${index}: ${label}`)
  );
check(
  [...stopoverRouteHtml, ...dubaiComboHtml].every((html) => html.length > 0) &&
    stopoverFoundIssues.length === 0 &&
    dubaiComboIssues.length === 0,
  stopoverFoundIssues.length === 0 && dubaiComboIssues.length === 0
    ? "the 96-hour stopover guide (EN/BN) and the Dubai-combo twin carry no invented fee, hotel promise, universal-eligibility or timing claim"
    : `stopover surfaces republish a removed claim -> ${[...stopoverFoundIssues, ...dubaiComboIssues].join(", ")}`
);
const stopoverNegativeControlWorks =
  stopoverFoundIssues.length === 0 &&
  stopoverViolations(
    "Total Cost: approximately SAR 135 (BDT 4,200) with a complimentary 1-night hotel voucher",
    [...STOPOVER_BANNED_PATTERNS, ...STOPOVER_BODY_BANNED_PATTERNS]
  ).length >= 3;
check(
  stopoverNegativeControlWorks,
  stopoverNegativeControlWorks
    ? "the stopover guard rejects a deliberately reintroduced SAR 135 / free-hotel sentence (negative control)"
    : "stopover guard failed its reintroduced-fee negative control"
);
const stopoverCheckoutCopyIsSafe =
  /not an all-in quote/i.test(stopoverBodies[0]) &&
  /Ministry of Foreign Affairs regulations/i.test(stopoverBodies[0]) &&
  stopoverBodies[1].includes("প্রকাশিত উদাহরণ all-in quote নয়") &&
  stopoverBodies[1].includes("সবার জন্য অন্তর্ভুক্ত") &&
  stopoverBodies[1].includes("itemized checkout total") &&
  stopoverRouteHtml.every(
    (html) =>
      /Nusuk\.sa/i.test(html) &&
      /not a permit|Visa permit নয়/i.test(html) &&
      /visa\.visitsaudi\.com|ksavisa\.sa/i.test(html)
  );
check(
  stopoverCheckoutCopyIsSafe,
  stopoverCheckoutCopyIsSafe
    ? "the stopover pages teach the checkout-price rule, the visa-vs-permit boundary and the official verification portals in both locales"
    : "stopover pages lost the checkout-price rule, the Nusuk permit boundary or the official verification links"
);
const stopoverReferencesAreLocalized = (() => {
  const enRefs = BLOG_DATA.find((post) => post.slug === STOPOVER_SLUG)?.references;
  const bnRefs = BENGALI_BLOG_OVERRIDES[STOPOVER_SLUG]?.references;
  const enHtml = stopoverRouteHtml[0];
  const bnHtml = stopoverRouteHtml[1];
  return Boolean(
    enRefs &&
      enRefs.length === 10 &&
      bnRefs?.length === enRefs.length &&
      enRefs.every((ref, index) => ref.url === bnRefs[index]?.url && enHtml.includes(`href="${ref.url}"`) && bnHtml.includes(`href="${ref.url}"`)) &&
      /\u098f\u0987 \u0997\u09be\u0987\u09a1\u09c7\u09b0 \u09a4\u09a5\u09cd\u09af\u09b8\u09c2\u09a4\u09cd\u09b0/.test(bnHtml) &&
      enHtml.includes("Sources for this guide") &&
      BLOG_DATA.find((post) => post.slug === STOPOVER_SLUG)?.updatedAt === "2026-10-19"
  );
})();
check(
  stopoverReferencesAreLocalized,
  stopoverReferencesAreLocalized
    ? "the stopover guide renders 10 scoped references in both locales and carries updatedAt 2026-10-19"
    : "stopover references are missing, unlocalized, or the update date is not recorded"
);

// Stopover's source limitations, cautions and actual procedure must survive prerendering.
for (const [index, locale] of (["en", "bn"] as const).entries()) {
  const html = stopoverRouteHtml[index];
  const graph = getSeoSchemaGraph(html);
  const procedures = graph.filter((node) => hasSchemaType(node, "HowTo"));
  const faq = graph.find((node) => hasSchemaType(node, "FAQPage"));
  const notes = stopoverBodies[index].split(/\n{2,}/).map(getTravellerCheck).filter((note) => note !== null);
  const text = normalizeStructuredText(html);
  const cautionPresent = (visible: string, key: string) => {
    const note = notes.find((entry) => entry.key === key);
    return Boolean(note && visible.includes(normalizeStructuredText(note.title)) && visible.includes(normalizeStructuredText(note.text)));
  };
  check(
    procedures.length === 1 && procedures[0]["@id"] === `https://ural-travel.pages.dev${locale === "bn" ? "/bn" : ""}/blog/${STOPOVER_SLUG}#howto-saudia-stopover-request` &&
      Array.isArray(procedures[0].step) && procedures[0].step.length === 6 &&
      Array.isArray(faq?.mainEntity) && faq.mainEntity.length === 6 &&
      notes.every((note) => !JSON.stringify(procedures).includes(note.text)),
    `${locale} stopover output has the Saudia-only six-step procedure and six matching FAQ answers`
  );
  check(
    [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((m) => m[1]).join(",") === "stopoverEligibility,stopoverPermits" &&
      cautionPresent(text, "stopoverEligibility") && cautionPresent(text, "stopoverPermits") &&
      text.includes(locale === "en" ? "Detailed current flynas eligibility could not be verified" : "flynas-এর বর্তমান বিস্তারিত যোগ্যতা যাচাই হয়নি") &&
      text.includes(locale === "en" ? "illustrative allocation" : "উদাহরণভিত্তিক সময় বণ্টন") &&
      !/does not require a previously used|আগে US\/UK\/Schengen ভিসা ব্যবহার করা লাগে না/.test(stopoverBodies[index]),
    `${locale} stopover output preserves both full caution bodies, flynas evidence limits and illustrative planning`
  );
  for (const key of ["stopoverEligibility", "stopoverPermits"]) {
    const note = notes.find((entry) => entry.key === key);
    check(Boolean(note) && !cautionPresent(text.replace(normalizeStructuredText(note!.text), ""), key),
      `${locale} stopover caution guard rejects removed ${key} body (negative control)`);
  }
}

// --- Wave 3C: shared Umrah-visa framing on hub surfaces must stay sourced ----
//
// `/umrah`, `/blog` and the Umrah-category article pages used to publish a
// "90-day Saudi Umrah e-Visa in 2 to 5 working days" priced at
// "BDT 15,500 – 19,500", "year-round Umrah", and "Mandatory ... Apps" tiles.
// The Ministry of Hajj and Umrah FAQ (opened 2026-10-15) publishes only a fee
// "estimated at 300 Saudi Riyals", requires an accommodation-and-transport
// service package for agent-issued visas, scopes biometric enrollment to five
// named countries, and contradicts itself on permitted stay (30 vs 90 days).
// So these shared surfaces may carry the dated official anchor and nothing that
// reads like a published BDT price, a processing guarantee or a blanket rule.
// Ledger P-01..P-06 in docs/growth/CONTENT-QUEUE.md.
const SHARED_UMRAH_BANNED_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "un-ledgered BDT Umrah visa price", pattern: /BDT\s*15,500\s*[–\-]\s*(?:BDT\s*)?19,500/ },
  { label: "un-ledgered BDT Umrah visa price (Bengali numerals)", pattern: /১৫,৫০০\s*[–\-]\s*১৯,৫০০/ },
  { label: "flat \"90-day Umrah e-Visa\" label", pattern: /90-day Saudi Umrah e-Visa|Standard 90-Day Umrah e-Visa|৯০ দিনের (?:স্ট্যান্ডার্ড )?Saudi Umrah e-Visa/i },
  { label: "unpublished Umrah visa processing promise", pattern: /2(?: ?to ?| ?[–-] ?)?[45] working days|২–৪ কার্যদিবস|২–৫ কার্যদিবস/i },
  { label: "universal year-round Umrah framing", pattern: /year-round Umrah|বছরের যেকোনো সময় ওমরাহ/ },
  { label: "apps presented as a universal mandate", pattern: /Mandatory Umrah Apps|"Mandatory Apps"|বাধ্যতামূলক Umrah অ্যাপ/ },
];
const SHARED_UMRAH_EN_ANCHOR = /300 Saudi Riyals|SAR 300/;
const SHARED_UMRAH_BN_ANCHOR = /৩০০ সৌদি রিয়াল|SAR ৩০০/;
const SHARED_UMRAH_DATE = /15 Oct(ober)? 2026/;
const SHARED_UMRAH_BN_DATE = /১৫ অক্টোবর ২০২৬/;

const sharedUmrahSurfaces: { label: string; text: string; needs: RegExp[] }[] = [
  {
    label: "shared Ministry FAQ answer (EN)",
    text: getLocalizedHajjFaqs("en")[0]?.answer ?? "",
    needs: [SHARED_UMRAH_EN_ANCHOR, SHARED_UMRAH_DATE],
  },
  {
    label: "shared Ministry FAQ answer (BN)",
    text: getLocalizedHajjFaqs("bn")[0]?.answer ?? "",
    needs: [SHARED_UMRAH_BN_ANCHOR, SHARED_UMRAH_BN_DATE],
  },
  {
    label: "/blog hub copy (source)",
    text: read(path.join(ROOT_DIR, "src/routes/BlogIndexRouteView.tsx")) ?? "",
    needs: [SHARED_UMRAH_EN_ANCHOR, SHARED_UMRAH_BN_ANCHOR, SHARED_UMRAH_DATE],
  },
  {
    label: "blog-post hub copy (source)",
    text: read(path.join(ROOT_DIR, "src/routes/BlogPostRouteView.tsx")) ?? "",
    needs: [SHARED_UMRAH_EN_ANCHOR, SHARED_UMRAH_BN_ANCHOR, SHARED_UMRAH_DATE],
  },
  {
    label: "Dubai-combo article (EN)",
    text: BLOG_BODY[DUBAI_COMBO_SLUG] ?? "",
    needs: [SHARED_UMRAH_EN_ANCHOR, SHARED_UMRAH_DATE],
  },
  {
    label: "Dubai-combo article (BN)",
    text: BENGALI_BLOG_OVERRIDES[DUBAI_COMBO_SLUG]?.content ?? "",
    needs: [SHARED_UMRAH_BN_ANCHOR, SHARED_UMRAH_BN_DATE],
  },
];
const sharedUmrahIssues: string[] = [];
for (const surface of sharedUmrahSurfaces) {
  if (!surface.text) {
    sharedUmrahIssues.push(`${surface.label}: surface is empty`);
    continue;
  }
  for (const entry of SHARED_UMRAH_BANNED_PATTERNS) {
    if (entry.pattern.test(surface.text)) {
      sharedUmrahIssues.push(`${surface.label}: ${entry.label}`);
    }
  }
  for (const needed of surface.needs) {
    if (!needed.test(surface.text)) {
      sharedUmrahIssues.push(`${surface.label}: missing ${needed.source.slice(0, 28)}`);
    }
  }
}
check(
  sharedUmrahIssues.length === 0,
  `the shared Umrah-visa framing on /umrah, /blog, blog posts and the Dubai combo carries only the dated official fee anchor [${sharedUmrahIssues.slice(0, 2).join("; ")}]`
);

// The hub tiles are client-rendered only, so a `dist` grep cannot see them. Render
// a Umrah-category article through the real route component and assert the panel
// exists there with the qualified copy.
function renderSharedUmrahPanel(locale: "en" | "bn"): string {
  // Reviewed procedural guides suppress this generic price panel. Preserve its independent regression fixture.
  const slug = "bangladeshi-halal-food-guide-makkah-madinah-budget-meals";
  const isBn = locale === "bn";
  const sourcePosts = getLocalizedBlogs(locale);
  const sourcePost = sourcePosts.find((post) => post.slug === slug);
  if (!sourcePost) throw new Error(`Missing ${locale} blog post ${slug}`);
  const fullPost = { ...sourcePost, content: isBn ? sourcePost.content : BLOG_BODY[slug] };
  const localizedBlogs = sourcePosts.map((post) => (post.slug === slug ? fullPost : post));
  const getLocalizedRouteHref = (route: string) => (route === "/" ? (isBn ? "/bn" : "/") : isBn ? `/bn${route}` : route);
  const EmptyAuthorBioCard = () => null;
  return renderToStaticMarkup(
    React.createElement(BlogPostRouteView as any, {
      context: {
        AuthorBioCard: EmptyAuthorBioCard,
        blogBodies: {},
        getBlogAeoSnippet50Words: (_slug: string, _isBengali: boolean, fallback: string) => fallback,
        getBlogCoverImage: () => "/assets/images/clouds_boat_hero_1781438671378-1200.webp",
        getLocalizedRouteHref,
        isBn,
        isLanding: false,
        lang: locale,
        localizedBlogs,
        localizedHajjFaqs: getLocalizedHajjFaqs(locale),
        navigateTo: () => {},
        parameterId: slug,
        section: "blog",
        setAffiliateToast: () => {},
      },
    })
  );
}
const sharedUmrahPanelIssues: string[] = [];
for (const locale of ["en", "bn"] as const) {
  try {
    const markup = renderSharedUmrahPanel(locale);
    if (!markup.includes('id="travel-intelligence-panel"')) {
      sharedUmrahPanelIssues.push(`${locale}: hub panel did not render`);
    }
    if (!(locale === "bn" ? SHARED_UMRAH_BN_ANCHOR : SHARED_UMRAH_EN_ANCHOR).test(markup)) {
      sharedUmrahPanelIssues.push(`${locale}: no official fee anchor in the tiles`);
    }
    for (const entry of SHARED_UMRAH_BANNED_PATTERNS) {
      if (entry.pattern.test(markup)) sharedUmrahPanelIssues.push(`${locale}: ${entry.label}`);
    }
  } catch (error) {
    sharedUmrahPanelIssues.push(`${locale} (${String(error).slice(0, 120)})`);
  }
}
check(
  sharedUmrahPanelIssues.length === 0,
  `the client-rendered hub tiles on Umrah-category posts show the SAR fee anchor and no BDT visa price [${sharedUmrahPanelIssues.slice(0, 2).join("; ")}]`
);

// The prerendered hub page is the one surface that feeds both readers and
// FAQPage JSON-LD, so the corrected answer has to be visible in the output.
const umrahHubHtml = [
  read(path.join(DIST_DIR, "umrah.html")) ?? "",
  read(path.join(DIST_DIR, "bn", "umrah.html")) ?? "",
];
// The price worksheet must be visible without JavaScript in both locales,
// and its initial state must not imply unknown inputs are a zero-cost holiday.
for (const [index, locale] of (["en", "bn"] as const).entries()) {
  const worksheet = renderToStaticMarkup(React.createElement(UmrahBudgetCalculator, { isBn: locale === "bn" }));
  check(
    umrahHubHtml[index].includes(worksheet) &&
      UMRAH_BUDGET_ITEMS.every(({ key }) => worksheet.includes(`id="umrah-cost-${key}"`)) &&
      !worksheet.includes('data-umrah-budget-total="true"'),
    `${locale} /umrah prerenders the shared quote-input worksheet with no fabricated initial total`
  );
}
check(
  calculateUmrahBudget(emptyUmrahBudget(), 2).totalBdt === null,
  "unknown Umrah quote inputs cannot be interpreted as zero-cost travel"
);
const umrahLandingSource = read(path.join(ROOT_DIR, "src", "components", "UmrahLandingPage.tsx")) ?? "";
check(
  umrahLandingSource.includes("<UmrahBudgetCalculator isBn={isBn} />") &&
    !/baseFlightPerPerson|visaWithInsurancePerPerson|nightlyRoomRateBdt|diyGrandTotalBdt|agencyMultiplier/.test(umrahLandingSource),
  "the hydrated Umrah hub uses the shared worksheet instead of a hidden preset price model"
);
const umrahHubIsGrounded =
  umrahHubHtml.every((html) => html.length > 0) &&
  SHARED_UMRAH_EN_ANCHOR.test(umrahHubHtml[0]) &&
  SHARED_UMRAH_BN_ANCHOR.test(umrahHubHtml[1]) &&
  !SHARED_UMRAH_BANNED_PATTERNS.some((entry) =>
    umrahHubHtml.some((html) => entry.pattern.test(html))
  );
check(
  umrahHubIsGrounded,
  "/umrah and /bn/umrah publish the dated Ministry Umrah visa fee without the BDT band, the 90-day label or the processing promise"
);

const SHARED_UMRAH_REINTRODUCED =
  "Bangladeshi passport holders can obtain a 90-day Saudi Umrah e-Visa in 2 to 5 working days " +
  "(recently BDT 15,500 – 19,500 including medical insurance), because year-round Umrah can be " +
  "planned independently; see the Mandatory Umrah Apps tile. " +
  "বছরের যেকোনো সময় ওমরাহ এবং BDT ১৫,৫০০–১৯,৫০০ খরচে ২–৫ কার্যদিবসে বাধ্যতামূলক Umrah অ্যাপের কথা লেখা আছে।";
const sharedUmrahControl = SHARED_UMRAH_BANNED_PATTERNS.filter((entry) =>
  entry.pattern.test(SHARED_UMRAH_REINTRODUCED)
).length;

check(
  sharedUmrahControl >= SHARED_UMRAH_BANNED_PATTERNS.length - 1,
  `the shared-surface guard rejects a deliberately reintroduced 90-day / BDT band / year-round sentence (matched ${sharedUmrahControl} of ${SHARED_UMRAH_BANNED_PATTERNS.length} patterns)`
);

// --- Wave 4: the hotel-zones and rail guide must quote the operator, not an agent
//
// This page used to state train times to the minute, SAR fare ranges with BDT
// conversions, hotel nightly bands, a "shuttle every 5 minutes" promise, fixed
// gate numbers for the women's Rawdah entrance, a 60% savings figure and a
// Zamzam price. Re-checked on 2026-10-15 against the operator's own tariff,
// baggage and station-services pages (ledger W4-01..W4-05 in
// docs/growth/CONTENT-QUEUE.md). The patterns below pin what may not come back.
const HOTEL_SLUG = "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh";
const HOTEL_BANNED_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "baggage dimensions the operator does not publish", pattern: /65 x 45 x 30|65x45x30/ },
  { label: "unsourced rail fare ranges", pattern: /SAR 60[ \u2013-]*75|SAR 150[ \u2013-]*220/ },
  {
    label: "converted BDT totals for rail, hotels, ziyarah or Zamzam",
    pattern: /BDT[ ]*(2,100|3,900|4,200|4,900|5,200|5,900|7,200|7,500|11,500|14,800|15,000|18,000|19,500|35,000)(?![0-9])|\u09e7\u09ef,\u09eb\u09e6\u09e6|\u09ea,\u09e8,\u09e6\u09e6|\u09ed,\u09eb\u09e6\u09e6|\u09e8,\u09e7\u09e6\u09e6|\u09eb,\u09e8,\u09e6\u09e6/,
  },
  { label: "train journey stated to the minute", pattern: /54 minutes|2 hours 20 minutes|\u09eb\u09ea \u09ae\u09bf\u09a8\u09bf\u099f|\u09e8 \u0998\u09a3\u09cd\u099f\u09be ২০ মিনিট/ },
  { label: "marketing top speed in a logistics page", pattern: /300 KM[/]H|৩০০ কিমি[/]ঘণ্টা/ },
  { label: "fixed gate numbers for the women's entrance", pattern: /Gates 25 to 29|Gate 25|25[ \u2013-]*29/ },
  { label: "shuttle frequency promise", pattern: /every 5 minutes|\u09aa\u09cd\u09b0\u09a4\u09bf \u09ea \u09ae\u09bf\u09a8\u09bf\u099f \u09aa\u09b0\u09aa\u09b0/ },
  { label: "percent savings claim", pattern: /save 60%|\u09ec\u09e6% \u09ac\u09be\u0981\u099a/ },
  { label: "Zamzam price repeated outside its own guide", pattern: /SAR 9\.50|SAR \u09ef\.\u09eb\u09e6|\u09ef\.\u09eb\u09e6 \u09b8\u09cc\u09a6\u09bf/ },
  { label: "unverified walking minutes", pattern: /3 to 6 minutes|3[ \u2013-]*5 minutes|৩ থেকে ৬ মিনিট/ },
];
const hotelSurfaces: { label: string; text: string }[] = [
  { label: "article body (EN)", text: BLOG_BODY[HOTEL_SLUG] ?? "" },
  { label: "article body (BN)", text: BENGALI_BLOG_OVERRIDES[HOTEL_SLUG]?.content ?? "" },
  { label: "article page (EN)", text: read(path.join(DIST_DIR, "blog", `${HOTEL_SLUG}.html`)) ?? "" },
  { label: "article page (BN)", text: read(path.join(DIST_DIR, "bn", "blog", `${HOTEL_SLUG}.html`)) ?? "" },
  { label: "/blog hub (EN)", text: read(path.join(DIST_DIR, "blog.html")) ?? "" },
  { label: "/bn/blog hub (BN)", text: read(path.join(DIST_DIR, "bn", "blog.html")) ?? "" },
];
// The blog hub lists every article summary, so only the claims unique to this
// page are asserted there; the BDT bands, gate numbers and walking minutes below
// are legitimate copy on other cards and must not be banned site-wide.
const HOTEL_HUB_ONLY_PATTERNS: RegExp[] = [
  /65 x 45 x 30/,
  /SAR 60[ \u2013-]*75|SAR 150[ \u2013-]*220/,
  /54 minutes|2 hours 20 minutes/,
  /every 5 minutes/,
  /save 60%/,
  /flattest walking-distance|Gates 25 to 29 for Madinah walks|২৪ ঘণ্টা ফ্রি শাটল/,
];
const hotelIssues: string[] = [];
hotelSurfaces.forEach((surface, index) => {
  if (!surface.text) {
    hotelIssues.push(`${surface.label}: missing output`);
    return;
  }
  const patterns: RegExp[] =
    index >= 4 ? HOTEL_HUB_ONLY_PATTERNS : HOTEL_BANNED_PATTERNS.map((entry) => entry.pattern);
  for (const entry of patterns) {
    const hit = surface.text.match(entry);
    if (hit) hotelIssues.push(`${surface.label}: ${entry.source.slice(0, 24)} -> ${hit[0].slice(0, 28)}`);
  }
});
check(
  hotelIssues.length === 0,
  `the hotel-zone and Haramain guide (EN/BN bodies, both article pages and both hub pages) carries no invented fare, timing, gate, shuttle or savings claim [${hotelIssues.slice(0, 3).join("; ")}]`
);

const hotelBodyPair: [string, string] = [
  BLOG_BODY[HOTEL_SLUG] ?? "",
  BENGALI_BLOG_OVERRIDES[HOTEL_SLUG]?.content ?? "",
];
const HOTEL_ANCHORS: { label: string; pattern: RegExp }[] = [
  { label: "the operator's baggage envelope", pattern: /65 x 55 x 35 cm/ },
  { label: "the operator portal named as the fare source", pattern: /sar\.hhr\.sa/ },
  { label: "the dated Makkah-Madinah base fare", pattern: /SAR 162/ },
  { label: "the dated airport-station base fare", pattern: /SAR 65/ },
  { label: "the 25 kg ceiling", pattern: /25 kg|২৫ কেজি/ },
  { label: "the no-BDT-conversion rule", pattern: /No BDT figure is published|কোনো BDT অঙ্ক নেই/ },
  { label: "excess baggage is not carried", pattern: /excess baggage is not allowed|excess baggage allowed নয়/i },
  { label: "the distance claim treated as unverified until the property confirms it", pattern: /Ask what the advertised distance measures|Advertised distance কী পর্যন্ত/ },
];
const hotelMissing: string[] = [];
(["EN", "BN"] as const).forEach((locale, li) => {
  const body = hotelBodyPair[li];
  for (const anchor of HOTEL_ANCHORS) {
    if (!anchor.pattern.test(body)) hotelMissing.push(`${locale}: ${anchor.label}`);
  }
});
check(
  hotelMissing.length === 0,
  `both locales of the hotel-zone guide teach the operator's real baggage limit, the dated base fares and the no-BDT rule [${hotelMissing.slice(0, 3).join("; ")}]`
);

const hotelRefLinks = [
  read(path.join(DIST_DIR, "blog", `${HOTEL_SLUG}.html`)) ?? "",
  read(path.join(DIST_DIR, "bn", "blog", `${HOTEL_SLUG}.html`)) ?? "",
].map((html) => (html.match(/href="https:\/\/sar\.hhr\.sa/g) || []).length);
check(
  hotelRefLinks.length === 2 && hotelRefLinks.every((n) => n === 4),
  `the hotel-zone guide renders 4 operator reference links in both locales (got ${hotelRefLinks.join(" / ")})`
);

const HOTEL_REINTRODUCED =
  "Jeddah Airport to Makkah takes just 54 minutes (SAR 60\u201375 Economy / ~BDT 2,100), the 300 KM/H train " +
  "allows one suitcase at 65 x 45 x 30 cm, free shuttles run every 5 minutes, and Markazia North hotels sit " +
  "by Gates 25 to 29 \u2014 save 60% with BDT 4,200\u2013BDT 7,500 rooms and buy Zamzam for SAR 9.50.";
const hotelControl = HOTEL_BANNED_PATTERNS.filter((entry) => entry.pattern.test(HOTEL_REINTRODUCED)).length;
check(
  hotelControl >= HOTEL_BANNED_PATTERNS.length - 2,
  `the hotel-zone guard rejects a deliberately reintroduced fare, timing, gate, shuttle and savings sentence (matched ${hotelControl} of ${HOTEL_BANNED_PATTERNS.length} patterns)`
);

// Independent hotel/rail article output expectations; warnings must remain complete in both locales.
for (const locale of ["en", "bn"] as const) {
  const html = read(path.join(DIST_DIR, ...(locale === "bn" ? ["bn"] : []), "blog", `${HOTEL_SLUG}.html`)) ?? "";
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === HOTEL_SLUG);
  const body = locale === "en" ? BLOG_BODY[HOTEL_SLUG] : post?.content ?? "";
  const graph = getSeoSchemaGraph(html);
  const procedures = graph.filter((node) => hasSchemaType(node, "HowTo"));
  const faq = graph.find((node) => hasSchemaType(node, "FAQPage"));
  const notes = body.split(/\n{2,}/).map(getTravellerCheck).filter((note) => note !== null);
  const text = normalizeStructuredText(html);
  const cautionPresent = (candidate: string, key: string) => {
    const note = notes.find((entry) => entry.key === key);
    return Boolean(note && candidate.includes(normalizeStructuredText(note.title)) && candidate.includes(normalizeStructuredText(note.text)));
  };
  check(
    post?.updatedAt === "2026-10-19" && post.references?.length === 6 &&
      post.references.every((reference) => html.includes(`href="${reference.url}"`)) &&
      procedures.length === 1 && procedures[0]["@id"] === `https://ural-travel.pages.dev${locale === "bn" ? "/bn" : ""}/blog/${HOTEL_SLUG}#howto-hotel-rail-plan` &&
      Array.isArray(procedures[0].step) && procedures[0].step.length === 6 &&
      Array.isArray(faq?.mainEntity) && faq.mainEntity.length === 6 &&
      notes.every((note) => !JSON.stringify(procedures).includes(note.text)),
    `${locale} hotel/rail output preserves six references, update date, six-step procedure and six FAQs`
  );
  check(
    [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((m) => m[1]).join(",") === "hotelAccess,railBaggage,railTicket" &&
      ["hotelAccess", "railBaggage", "railTicket"].every((key) => cautionPresent(text, key)) &&
      text.includes(locale === "en" ? "Four passengers with four bags that each comply" : "চার passenger-এর চারটি compliant bag") &&
      text.includes(locale === "en" ? "class labels that were not sufficiently clear" : "class label extraction-এ যথেষ্ট পরিষ্কার ছিল না"),
    `${locale} hotel/rail output retains all three complete cautions and baggage/refund qualifications`
  );
  for (const key of ["hotelAccess", "railBaggage", "railTicket"]) {
    const note = notes.find((entry) => entry.key === key);
    check(Boolean(note) && !cautionPresent(text.replace(normalizeStructuredText(note!.text), ""), key),
      `${locale} hotel/rail caution guard rejects removed ${key} body (negative control)`);
  }
}

// Reviewed flight-strategy guide: source-specific facts, full cautions and visible/schema parity.
const FLIGHT_STRATEGY_SLUG = "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia";
const FLIGHT_RETIRED_CLAIMS = /55%|BDT\s*(?:15,000|72,000|74,000|52,000|54,000|62,000)|USD\s*\$?25|6 hours 15 minutes|54 minutes|45 minutes before|daily wide-body|always book an|সবসময়.*টিকিট কাটবেন|৭২–৯২|১৫,০০০\+|৬ ঘণ্টা ১৫ মিনিট|৪৫০ কিলোমিটার/i;
const flightClaimSurfaces: string[] = [];
for (const locale of ["en", "bn"] as const) {
  const html = read(path.join(DIST_DIR, ...(locale === "bn" ? ["bn"] : []), "blog", `${FLIGHT_STRATEGY_SLUG}.html`)) ?? "";
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === FLIGHT_STRATEGY_SLUG);
  const body = locale === "en" ? BLOG_BODY[FLIGHT_STRATEGY_SLUG] : post?.content ?? "";
  flightClaimSurfaces.push(body, post?.title ?? "", post?.summary ?? "", JSON.stringify(post?.affiliateCTA), normalizeStructuredText(html));
  const graph = getSeoSchemaGraph(html);
  const procedures = graph.filter((node) => hasSchemaType(node, "HowTo"));
  const faq = graph.find((node) => hasSchemaType(node, "FAQPage"));
  const notes = body.split(/\n{2,}/).map(getTravellerCheck).filter((note) => note !== null);
  const text = normalizeStructuredText(html);
  const cautionPresent = (candidate: string, key: string) => {
    const note = notes.find((entry) => entry.key === key);
    return Boolean(note && candidate.includes(normalizeStructuredText(note.title)) && candidate.includes(normalizeStructuredText(note.text)));
  };
  check(
    post?.updatedAt === "2026-10-19" && post.references?.length === 5 &&
      post.references.every((reference) => html.includes(`href="${reference.url}"`)) &&
      procedures.length === 1 && procedures[0]["@id"] === `https://ural-travel.pages.dev${locale === "bn" ? "/bn" : ""}/blog/${FLIGHT_STRATEGY_SLUG}#howto-compare-umrah-flights` &&
      Array.isArray(procedures[0].step) && procedures[0].step.length === 6 &&
      Array.isArray(faq?.mainEntity) && faq.mainEntity.length === 6 &&
      notes.every((note) => !JSON.stringify(procedures).includes(note.text)),
    `${locale} flight-strategy output preserves five sources, update date, six-step comparison and six FAQs`
  );
  check(
    [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]).join(",") === "flightConnection,flightBaggage,flightZamzam" &&
      ["flightConnection", "flightBaggage", "flightZamzam"].every((key) => cautionPresent(text, key)) &&
      text.includes(locale === "en" ? "S-class with no checked baggage" : "S-class-এ checked baggage নেই") &&
      text.includes(locale === "en" ? "does not mean Biman refuses" : "Biman Zamzam নেয় না") &&
      text.includes(locale === "en" ? "part of the allowable checked baggage" : "allowable checked baggage-এর অংশ") &&
      text.includes(locale === "en" ? "30 kg and Jeddah-to-Bangladesh at 50 kg" : "৩০ কেজি এবং Jeddah-to-Bangladesh ৫০ কেজি"),
    `${locale} flight-strategy output retains three complete cautions and directional baggage/Zamzam limits`
  );
  for (const key of ["flightConnection", "flightBaggage", "flightZamzam"]) {
    const note = notes.find((entry) => entry.key === key);
    check(Boolean(note) && !cautionPresent(text.replace(normalizeStructuredText(note!.text), ""), key),
      `${locale} flight-strategy caution guard rejects removed ${key} body (negative control)`);
  }
}
check(flightClaimSurfaces.every((surface) => surface && !FLIGHT_RETIRED_CLAIMS.test(surface)),
  "flight-strategy EN/BN source, metadata and generated pages do not restore invented fare, savings or fixed-time claims");
check(["Airfare is 55%", "Save BDT 15,000+", "daily wide-body in 6 hours 15 minutes", "54 minutes transfer", "৭২–৯২ হাজার", "১৫,০০০+ টাকা"].every((fixture) => FLIGHT_RETIRED_CLAIMS.test(fixture)),
  "flight-strategy retired-claim guard rejects all six EN/BN reintroduction fixtures (negative controls)");

// Women-specific guide: civil eligibility, personal fiqh and actual access are separate evidence gates.
const WOMEN_UMRAH_SLUG = "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates";
const WOMEN_NOTE_KEYS = ["womenVisa", "womenAccess", "womenRawdah", "womenIhram", "womenHealth", "womenTaqsir"];
const WOMEN_RETIRED_CLAIMS = /women of any age (?:may|can|apply)|Gates? (?:21 through 26|25[–-]29)|গেট ২১ থেকে ২৬|যেকোনো বয়সের নারী.*(?:ভিসা|Visa)|direct, flat, step-free access|quick, step-free access|গরমে স্বস্তি দেয়|soft visor cap|নরম ক্যাপ \(Visor Cap\)|about one inch or 2\.5 cm|২\.৫ সেন্টিমিটার|after Isha prayer until midnight|এশার পর থেকে মধ্যরাত|safe private family|vetted door-to-door/i;
const womenClaimSurfaces: string[] = [];
for (const locale of ["en", "bn"] as const) {
  const html = read(path.join(DIST_DIR, ...(locale === "bn" ? ["bn"] : []), "blog", `${WOMEN_UMRAH_SLUG}.html`)) ?? "";
  const post = getLocalizedBlogs(locale).find((entry) => entry.slug === WOMEN_UMRAH_SLUG);
  const body = locale === "en" ? BLOG_BODY[WOMEN_UMRAH_SLUG] : post?.content ?? "";
  const text = normalizeStructuredText(html);
  womenClaimSurfaces.push(body, post?.title ?? "", post?.summary ?? "", JSON.stringify(post?.affiliateCTA), text);
  const graph = getSeoSchemaGraph(html);
  const procedures = graph.filter((node) => hasSchemaType(node, "HowTo"));
  const faq = graph.find((node) => hasSchemaType(node, "FAQPage"));
  const notes = body.split(/\n{2,}/).map(getTravellerCheck).filter((note) => note !== null);
  const cautionPresent = (candidate: string, key: string) => {
    const note = notes.find((entry) => entry.key === key);
    return Boolean(note && candidate.includes(normalizeStructuredText(note.title)) && candidate.includes(normalizeStructuredText(note.text)));
  };
  check(
    post?.updatedAt === "2026-10-19" && post.references?.length === 10 &&
      post.references.every((reference) => html.includes(`href="${reference.url}"`)) &&
      procedures.length === 1 && procedures[0]["@id"] === `https://ural-travel.pages.dev${locale === "bn" ? "/bn" : ""}/blog/${WOMEN_UMRAH_SLUG}#howto-women-rawdah-preparation` &&
      Array.isArray(procedures[0].step) && procedures[0].step.length === 4 &&
      Array.isArray(faq?.mainEntity) && faq.mainEntity.length === 7 &&
      notes.every((note) => !JSON.stringify(procedures).includes(note.text)),
    `${locale} women-specific output preserves ten sources, update, four appointment-preparation steps and seven FAQs`
  );
  check(
    [...html.matchAll(/data-traveller-check="([^"]+)"/g)].map((match) => match[1]).join(",") === WOMEN_NOTE_KEYS.join(",") &&
      WOMEN_NOTE_KEYS.every((key) => cautionPresent(text, key)) &&
      text.includes(locale === "en" ? "not a finding that every Bangladeshi is ineligible" : "প্রত্যেক বাংলাদেশি সবভাবে ineligible প্রমাণ হয় না") &&
      text.includes(locale === "en" ? "older Ministry FAQ still says 30 days" : "পুরোনো Ministry FAQ-এ এখনো ৩০ দিন") &&
      text.includes(locale === "en" ? "not this site's determination" : "এই site ঠিক করছে না"),
    `${locale} women-specific output retains six complete cautions and civil, booking and personal-ruling limits`
  );
  for (const key of WOMEN_NOTE_KEYS) {
    const note = notes.find((entry) => entry.key === key);
    check(Boolean(note) && !cautionPresent(text.replace(normalizeStructuredText(note!.text), ""), key),
      `${locale} women-specific caution guard rejects removed ${key} body (negative control)`);
  }
}
check(womenClaimSurfaces.every((surface) => surface && !WOMEN_RETIRED_CLAIMS.test(surface)),
  "women-specific EN/BN source, metadata and generated pages do not restore blanket visa, gate, access, dress or trimming claims");
check(["women of any age may apply", "Gates 25–29", "Gates 21 through 26", "direct, flat, step-free access", "soft visor cap", "about one inch or 2.5 cm", "এশার পর থেকে মধ্যরাত", "vetted door-to-door"].every((fixture) => WOMEN_RETIRED_CLAIMS.test(fixture)),
  "women-specific retired-claim guard rejects all eight reintroduced civil/access/religious/supplier claims (negative controls)");

// --- Wave 6: Zamzam & Customs Claims Guards (2026-10-17) ------------------
// Guard against reintroducing the outdated SAR 9.50-12.50 Zamzam price range
// (now 48 SAR per Nusuk 2026), unqualified "free" airline claims for Zamzam
// cartons, and the missing references array. Ledger: W6-01, W6-02, W6-03 in
// docs/growth/CONTENT-QUEUE.md.

const ZAMZAM_SLUG = "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport";
const zamzamBodyPair = [
  BLOG_BODY[ZAMZAM_SLUG] ?? "",
  BENGALI_BLOG_OVERRIDES[ZAMZAM_SLUG]?.content ?? "",
];

// Guard: No outdated Zamzam pricing (the SAR 9.50-12.50 range is obsolete;
// Nusuk's 2026 price is 48 SAR). Each pattern anchors on the decimal bounds or
// the 9->12 range, because this same article legitimately quotes "SAR 12 - 20
// per kg" for dates and "SAR 120 - 160" for a sedan. An unanchored "SAR 9|12"
// match flagged those and failed CI on 2026-10-17.
// A list, not one regex: the Bengali body may carry the range in Bengali digits,
// and `\b` cannot anchor them (Bengali digits are not \w).
const ZAMZAM_OBSOLETE_PRICE_PATTERNS: { label: string; pattern: RegExp }[] = [
  { label: "decimal bounds (EN)", pattern: /\bSAR\s*(?:9|12)[.,]50\b/i },
  { label: "range (EN)", pattern: /\bSAR\s*9\s*(?:-|\u2013|\u2014|to)\s*(?:SAR\s*)?12\b/i },
  { label: "decimal bounds (BN)", pattern: /SAR\s*(?:\u09ef|\u09e7\u09e8)[.,]\u09eb\u09e6/ },
  {
    label: "range (BN)",
    pattern: /\u09ef[.,]\u09eb\u09e6[^\u09e6-\u09ef]{0,20}\u09e7\u09e8[.,]\u09eb\u09e6/,
  },
];
const findObsoleteZamzamPrice = (text: string) =>
  ZAMZAM_OBSOLETE_PRICE_PATTERNS.find((entry) => entry.pattern.test(text))?.label;
const zamzamSurfaces: { label: string; text: string }[] = [
  { label: "article body (EN)", text: BLOG_BODY[ZAMZAM_SLUG] ?? "" },
  { label: "article body (BN)", text: BENGALI_BLOG_OVERRIDES[ZAMZAM_SLUG]?.content ?? "" },
  { label: "article page (EN)", text: read(path.join(DIST_DIR, "blog", `${ZAMZAM_SLUG}.html`)) ?? "" },
  { label: "article page (BN)", text: read(path.join(DIST_DIR, "bn", "blog", `${ZAMZAM_SLUG}.html`)) ?? "" },
];
const zamzamMissing = zamzamSurfaces.filter((surface) => !surface.text).map((surface) => surface.label);
const zamzamOutdatedPrice = zamzamSurfaces
  .map((surface) => ({ label: surface.label, hit: findObsoleteZamzamPrice(surface.text) }))
  .filter((surface) => surface.hit !== undefined)
  .map((surface) => `${surface.label}: ${surface.hit}`);
check(
  zamzamMissing.length === 0,
  `blog-21: both bodies and both rendered pages exist${zamzamMissing.length ? ` (missing: ${zamzamMissing.join(", ")})` : ""}`
);
check(
  zamzamOutdatedPrice.length === 0,
  `blog-21: no outdated Zamzam price range SAR 9.50-12.50 (now 48 SAR per Nusuk 2026) in either locale${
    zamzamOutdatedPrice.length ? ` (found in: ${zamzamOutdatedPrice.join("; ")})` : ""
  }`
);
const zamzamPriceControl = [
  "Buy the sealed carton for SAR 9.50 - SAR 12.50 at the kiosk.",
  "One carton costs SAR 9.50.",
  "সৌদি রিয়াল ৯.৫০ থেকে ১২.৫০",
].every((control) => findObsoleteZamzamPrice(control) !== undefined);
const zamzamPriceFalsePositives = [
  "Allowance: one sealed 5-liter box costing 48 SAR (~BDT 620).",
  "Dates cost SAR 12 - 20 per kg and a sedan SAR 120 - 160.",
  "Grade-A Ajwa dates: SAR 35 - SAR 50 per kg.",
].every((control) => findObsoleteZamzamPrice(control) === undefined);
check(
  zamzamPriceControl && zamzamPriceFalsePositives,
  `blog-21: the Zamzam price guard rejects the retired SAR 9.50-12.50 range in both numeral systems and still passes the current 48 SAR and the article's unrelated date/taxi prices (negative control)`
);

// Guard: No unqualified "free" Zamzam airline claims
const zamzamFreeClaims = zamzamBodyPair.filter((body) =>
  /100%\s*FREE.*baggage|free.*dedicated.*conveyor/i.test(body)
);
check(
  zamzamFreeClaims.length === 0,
  `blog-21: no unqualified 'free' or '100% FREE outside baggage' Zamzam airline claims — primary sources don't verify`
);

// Guard: References array required for customs article
const customsArticle = BLOG_DATA.find((p) => p.slug === ZAMZAM_SLUG);
check(
  (customsArticle?.references?.length ?? 0) >= 3,
  `blog-21: references array present with at least 3 sources (Nusuk, NBR, Biman)`
);

// --- Content contract (docs/growth/10-CONTENT-UPGRADE-STANDARD.md) ---------
//
// Structure only. The standard's editorial gates (right next step, primary
// source, real localization) cannot be asserted from code. These four can, and
// each one has already failed at least once:
//   - a curated link pointed at a slug that does not exist
//   - a Bengali override carried no internalLinks (no fallback exists)
//   - an affiliateCTA.provider drifted outside AFFILIATE_LINKS
//   - metadata advertised links the rendered page never carried
//
// The 2026-10-17 false audit is the reason this block is paired with the
// header comment in src/data/blogContent.ts: absence from the body file is not
// absence from the post.

type LinkAuditPost = {
  id: string;
  slug: string;
  internalLinks?: { text: string; path: string }[];
  affiliateCTA?: { provider: string };
};

function auditPostLinks(posts: LinkAuditPost[], slugSet: Set<string>): string[] {
  const issues: string[] = [];
  for (const post of posts) {
    const links = post.internalLinks ?? [];
    if (links.length === 0) issues.push(`${post.id}: no internal links`);
    const seen = new Set<string>();
    for (const link of links) {
      if (!link.path.startsWith("/")) {
        issues.push(`${post.id}: non-absolute path ${link.path}`);
        continue;
      }
      if (seen.has(link.path)) issues.push(`${post.id}: duplicate ${link.path}`);
      seen.add(link.path);
      if (link.path === `/blog/${post.slug}`) issues.push(`${post.id}: self-link ${link.path}`);
      if (link.path.startsWith("/blog/")) {
        const target = link.path.slice("/blog/".length).split(/[?#]/, 1)[0];
        if (!slugSet.has(target)) issues.push(`${post.id}: dead blog target ${link.path}`);
      }
    }
    if (post.affiliateCTA && !Object.prototype.hasOwnProperty.call(AFFILIATE_LINKS, post.affiliateCTA.provider)) {
      issues.push(`${post.id}: unknown affiliate provider "${post.affiliateCTA.provider}"`);
    }
  }
  return issues;
}

const CONTENT_SLUGS = new Set(BLOG_DATA.map((post) => post.slug));
const contentLinkIssues = auditPostLinks(BLOG_DATA, CONTENT_SLUGS);
check(
  contentLinkIssues.length === 0,
  `content contract: every post has internal links that resolve, are unique and never self-referential [${
    contentLinkIssues.slice(0, 3).join("; ")
  }]`
);

// Negative control: the validator must still reject each failure mode. Without
// this, a refactor that returns [] would leave a green check protecting nothing.
const LINK_AUDIT_CONTROL: LinkAuditPost[] = [
  { id: "healthy", slug: "healthy", internalLinks: [{ text: "x", path: `/blog/${BLOG_DATA[0].slug}` }] },
  { id: "dead", slug: "dead", internalLinks: [{ text: "x", path: "/blog/does-not-exist" }] },
  { id: "self", slug: "self", internalLinks: [{ text: "x", path: "/blog/self" }] },
  { id: "duplicate", slug: "duplicate", internalLinks: [
    { text: "x", path: `/blog/${BLOG_DATA[0].slug}` },
    { text: "y", path: `/blog/${BLOG_DATA[0].slug}` },
  ] },
  { id: "provider", slug: "provider", internalLinks: [{ text: "x", path: `/blog/${BLOG_DATA[0].slug}` }], affiliateCTA: { provider: "not-a-partner" } },
  { id: "empty", slug: "empty", internalLinks: [] },
];
const linkAuditControlProblems = auditPostLinks(LINK_AUDIT_CONTROL, CONTENT_SLUGS);
const linkAuditControlCaught = ["dead", "self", "duplicate", "provider", "empty"].every((id) =>
  linkAuditControlProblems.some((problem) => problem.startsWith(`${id}:`))
);
check(
  !linkAuditControlProblems.some((problem) => problem.startsWith("healthy:")) &&
    linkAuditControlCaught &&
    linkAuditControlProblems.length >= 5,
  `content contract: the link validator still rejects dead, self, duplicate, unknown-provider and empty fixtures (found ${linkAuditControlProblems.length})`
);

// Flagship cluster: the Umrah articles are the pages being actively upgraded, so
// the full minimum applies to them today. Legacy destination posts are reported
// as debt below, not retro-failed.
const FLAGSHIP_CATEGORY = "Hajj & Umrah";
const flagshipPosts = BLOG_DATA.filter((post) => post.category === FLAGSHIP_CATEGORY);
const flagshipBlogLinks = (post: { slug: string; internalLinks?: { path: string }[] }) =>
  (post.internalLinks ?? []).filter(
    (link) =>
      link.path.startsWith("/blog/") &&
      link.path !== `/blog/${post.slug}` &&
      CONTENT_SLUGS.has(link.path.slice("/blog/".length))
  );
const flagshipIssues = flagshipPosts
  .map((post) => ({
    id: post.id,
    blogLinks: flagshipBlogLinks(post).length,
    hasCta: Boolean(post.affiliateCTA),
  }))
  .filter((row) => row.blogLinks < 2 || !row.hasCta)
  .map((row) => `${row.id}: ${row.blogLinks} blog links, cta=${row.hasCta}`);
check(
  flagshipPosts.length >= 10 && flagshipIssues.length === 0,
  `content contract: every ${FLAGSHIP_CATEGORY} article defines >=2 blog links and an affiliate CTA [${
    flagshipIssues.slice(0, 3).join("; ")
  }]`
);

const flagshipRenderIssues: string[] = [];
for (const post of flagshipPosts) {
  const enHtml = read(path.join(DIST_DIR, "blog", `${post.slug}.html`)) ?? "";
  const bnHtml = read(path.join(DIST_DIR, "bn", "blog", `${post.slug}.html`)) ?? "";
  if (!enHtml) {
    flagshipRenderIssues.push(`${post.id}: EN page missing`);
    continue;
  }
  if (!bnHtml) {
    flagshipRenderIssues.push(`${post.id}: BN page missing`);
    continue;
  }
  for (const link of flagshipBlogLinks(post)) {
    if (!enHtml.includes(`href="${link.path}"`)) {
      flagshipRenderIssues.push(`${post.id}: EN missing ${link.path}`);
    }
  }
  const bnAnchors = new Set(
    [...bnHtml.matchAll(/href="(\/bn\/blog\/[^"]+)"/g)].map((match) => match[1])
  );
  if (bnAnchors.size < 2) flagshipRenderIssues.push(`${post.id}: BN has ${bnAnchors.size} blog anchors`);
}
check(
  flagshipRenderIssues.length === 0,
  `content contract: the ${FLAGSHIP_CATEGORY} pages actually render the curated blog anchors in both locales [${
    flagshipRenderIssues.slice(0, 3).join("; ")
  }]`
);

// Non-blocking debt report. Printed on every run so the numbers in §10 of the
// standard are reproducible, but never counted as a pass.
const contentDebt: string[] = [];
const noBlogLink = BLOG_DATA.filter((post) => flagshipBlogLinks(post).length === 0).map((post) => post.id);
const noCta = BLOG_DATA.filter((post) => !post.affiliateCTA).map((post) => post.id);
const noRefs = BLOG_DATA.filter((post) => (post.references?.length ?? 0) === 0).map((post) => post.id);
const inboundLinks = new Map<string, number>();
for (const post of BLOG_DATA) {
  for (const link of post.internalLinks ?? []) {
    if (!link.path.startsWith("/blog/")) continue;
    const target = link.path.slice("/blog/".length);
    if (!CONTENT_SLUGS.has(target) || target === post.slug) continue;
    inboundLinks.set(target, (inboundLinks.get(target) ?? 0) + 1);
  }
}
const orphaned = BLOG_DATA.filter((post) => (inboundLinks.get(post.slug) ?? 0) === 0).map((post) => post.id);
const bnBare: string[] = [];
for (const post of BLOG_DATA) {
  const bnHtml = read(path.join(DIST_DIR, "bn", "blog", `${post.slug}.html`)) ?? "";
  const anchors = new Set([...bnHtml.matchAll(/href="(\/bn\/blog\/[^"]+)"/g)].map((match) => match[1]));
  if (anchors.size === 0) bnBare.push(post.id);
}
const bnLocalizedById = new Map(getLocalizedBlogs("bn").map((post) => [post.id, post]));
const bnParityShort = BLOG_DATA.filter((post) => {
  const bn = bnLocalizedById.get(post.id);
  return bn && (bn.internalLinks?.length ?? 0) < (post.internalLinks?.length ?? 0);
}).map((post) => {
  const bnCount = bnLocalizedById.get(post.id)?.internalLinks?.length ?? 0;
  return `${post.id}(${bnCount}/${post.internalLinks?.length ?? 0})`;
});
if (noBlogLink.length) contentDebt.push(`no blog->blog link (${noBlogLink.length}): ${noBlogLink.join(", ")}`);
if (noCta.length) contentDebt.push(`no affiliateCTA (${noCta.length}): ${noCta.join(", ")}`);
if (noRefs.length) contentDebt.push(`no references (${noRefs.length}): ${noRefs.join(", ")}`);
if (orphaned.length) contentDebt.push(`no editorial inbound link (${orphaned.length}): ${orphaned.join(", ")}`);
if (bnBare.length) contentDebt.push(`BN page renders no blog anchors (${bnBare.length}): ${bnBare.join(", ")}`);
if (bnParityShort.length)
  contentDebt.push(
    `Bengali internalLinks shorter than English (${bnParityShort.length}): ${bnParityShort.join(", ")}`
  );
for (const line of contentDebt) console.log(`[content-debt] ${line}`);

// --- Report ----------------------------------------------------------------
// Keep this block LAST. The checks above only count if it runs after them; when
// it sat in the middle of the file, guards appended below it could fail without
// ever failing the build or printing a line.

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
