/**
 * Diagnostic inventory for the owner's EN/BN article-parity review.
 * Run after `npm run build`: npx tsx scripts/audit-blog-parity.ts
 * Writes local-only fixtures under dist/__parity-audit for DOM inspection.
 * Counts describe structure, not factual accuracy or Bengali writing quality.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { BENGALI_BLOG_OVERRIDES, getLocalizedBlogs, getLocalizedHajjFaqs, getBengaliRouteSeo } from "../src/data/bengaliContent";
import { SCHEDULED_BLOG_SNIPPETS, SCHEDULED_BLOG_SEO_COPY } from "../src/data/scheduledBlogSeo.generated";
import { getSeoCopy, getBengaliSeoCopy, PRIORITY_SEO_COPY } from "../src/utils/seoCopy";
import { getArticleRelatedPosts } from "../src/utils/blogPresentation";
import { getBlogAeoSnippet50Words as getSnippet } from "../src/utils/blogSnippets";
import { getBlogCoverImage } from "../src/utils/blogCoverImages";
import { getVisibleBlogFaqSection, getVisibleBlogHowTos } from "../src/utils/blogStructuredData";
import { SITE_ORIGIN, toBengaliPath } from "../src/utils/localeRoutes";
import { toolPathForTab } from "../src/utils/toolRoutes";
import {
  MULTI_PARTNER_BLOG_PLACEMENTS,
  RADICAL_STORAGE_BLOG_PLACEMENTS,
  TRAVELPAYOUTS_REFERRAL_BLOG_PLACEMENTS,
  sanitizeExpiredPromoText,
} from "../src/components/AffiliatePartners";
import { KLOOK_HOTEL_BLOG_PLACEMENTS } from "../src/components/KlookHotelOffers";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = path.join(ROOT, "dist", "__parity-audit");
fs.mkdirSync(OUTPUT, { recursive: true });

const snippetText = fs.readFileSync(path.join(ROOT, "src", "utils", "blogSnippets.ts"), "utf8");
const snippetAst = ts.createSourceFile("blogSnippets.ts", snippetText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const snippetFunction = snippetAst.statements.find(
  (node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === "getBlogAeoSnippet50Words",
);
if (!snippetFunction) throw new Error("The shared snippet function was not found; inspect its current source.");
const snippetKeys: Record<"en" | "bn", Set<string>> = { en: new Set(), bn: new Set() };
function readSnippetKeys(node: ts.Node): void {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
    const locale = node.name.text === "snippetsEn" ? "en" : node.name.text === "snippetsBn" ? "bn" : undefined;
    if (locale) for (const property of node.initializer.properties) {
      if (property.name && ts.isStringLiteral(property.name)) snippetKeys[locale].add(property.name.text);
    }
  }
  ts.forEachChild(node, readSnippetKeys);
}
readSnippetKeys(snippetFunction);

const locales = ["en", "bn"] as const;
const postsByLocale = { en: getLocalizedBlogs("en"), bn: getLocalizedBlogs("bn") };
const difference = (a: string[], b: string[]) => a.filter((value) => !b.includes(value));
const bengali = (value: string) => /[\u0980-\u09ff]/.test(value);
const canonicalTarget = (href: string) => {
  const url = new URL(href, SITE_ORIGIN);
  if (url.pathname === "/tools" && url.searchParams.has("tab")) {
    return toolPathForTab(url.searchParams.get("tab")) ?? href;
  }
  return href;
};

const rows = BLOG_DATA.map((post) => {
  const route = `/blog/${post.slug}`;
  const localeRows = Object.fromEntries(locales.map((locale) => {
    const isBn = locale === "bn";
    if (isBn && !BENGALI_BLOG_OVERRIDES[post.slug]) {
      throw new Error(`${post.slug}: no explicit Bengali override; do not audit an English fallback as Bengali.`);
    }
    const localizedPost = postsByLocale[locale].find((item) => item.slug === post.slug)!;
    const body = localizedPost.content ?? BLOG_BODY[post.slug] ?? "";
    if (!body) throw new Error(`${locale}/${post.slug}: no body`);
    const source = path.join(ROOT, "dist", isBn ? "bn" : "", "blog", `${post.slug}.html`);
    if (!fs.existsSync(source)) throw new Error(`${source}: build before auditing`);
    const generatedBn = isBn ? getBengaliRouteSeo(route) : null;
    const seo = isBn
      ? getBengaliSeoCopy(route) ?? generatedBn!
      : getSeoCopy(route, `${post.title} | URAL Travel Blog`, post.summary);
    const seoSource = SCHEDULED_BLOG_SEO_COPY[route]?.[locale]?.title
      ? "scheduled-frontmatter"
      : isBn ? (getBengaliSeoCopy(route) ? "authored-copy" : "title-summary-fallback")
        : PRIORITY_SEO_COPY[route] ? "authored-copy" : "title-summary-fallback";
    const snippetSource = snippetKeys[locale].has(post.slug) ? "shared-authored"
      : SCHEDULED_BLOG_SNIPPETS[post.slug]?.[locale] ? "scheduled-frontmatter" : "summary-fallback";
    const faq = getVisibleBlogFaqSection(post.slug, body, locale);
    const howTos = getVisibleBlogHowTos(post.slug, body, locale);
    // Real route component and shared cover/snippet functions. The App's routing
    // and head updates still need separate running-browser checks.
    const html = renderToStaticMarkup(React.createElement(BlogPostRouteView, { context: {
      AuthorBioCard: () => null,
      blogBodies: BLOG_BODY,
      getBlogAeoSnippet50Words: getSnippet,
      getBlogCoverImage,
      getLocalizedRouteHref: (href: string) => isBn ? toBengaliPath(href) : href,
      isBn, isLanding: false, lang: locale,
      localizedBlogs: postsByLocale[locale], localizedHajjFaqs: getLocalizedHajjFaqs(locale),
      navigateTo: () => {}, parameterId: post.slug, section: "blog", setAffiliateToast: () => {},
    } }));
    const fixture = `${locale}-${post.slug}.html`;
    fs.writeFileSync(path.join(OUTPUT, fixture), `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="robots" content="noindex"></head><body>${html}</body></html>`, "utf8");
    return [locale, {
      title: localizedPost.title, summary: localizedPost.summary,
      bodyCharacters: body.length,
      // Numbered and plain-text headings need the separate browser DOM inspection.
      markdownH2s: (body.match(/^##\s/gm) ?? []).length,
      internalLinks: localizedPost.internalLinks,
      references: localizedPost.references ?? [],
      cta: localizedPost.affiliateCTA ? {
        ...localizedPost.affiliateCTA,
        headline: sanitizeExpiredPromoText(localizedPost.affiliateCTA.headline),
        body: sanitizeExpiredPromoText(localizedPost.affiliateCTA.body),
      } : null,
      seo: { ...seo, source: seoSource, containsBengali: bengali(seo.title) && bengali(seo.description) },
      snippet: { source: snippetSource, text: getSnippet(post.slug, isBn, localizedPost.summary) },
      faq: faq ? { heading: faq.heading, count: faq.questions.length } : null,
      howTos: howTos.map((doc) => ({ id: doc.idSuffix, steps: doc.steps.length })),
      callouts: localizedPost.callouts ?? [],
      journeyStage: localizedPost.journeyStage ?? null,
      figure: localizedPost.inlineFigure ? {
        markerPresent: body.includes("[[figure]]"),
        alt: isBn ? localizedPost.inlineFigure.altBn : localizedPost.inlineFigure.altEn,
        caption: isBn ? localizedPost.inlineFigure.captionBn : localizedPost.inlineFigure.captionEn,
      } : null,
      suggestedSlugs: getArticleRelatedPosts(post.slug, BLOG_DATA, postsByLocale[locale]).map((entry) => entry.slug),
      staticFile: `${isBn ? "/bn" : ""}${route}.html`,
      reactFixture: `/__parity-audit/${fixture}`,
    }];
  })) as Record<"en" | "bn", any>;
  const enPaths = localeRows.en.internalLinks.map((link: { path: string }) => link.path);
  const bnPaths = localeRows.bn.internalLinks.map((link: { path: string }) => link.path);
  const enSources = localeRows.en.references.map((reference: { url: string }) => reference.url);
  const bnSources = localeRows.bn.references.map((reference: { url: string }) => reference.url);
  const enCanonical = enPaths.map(canonicalTarget);
  const bnCanonical = bnPaths.map(canonicalTarget);
  return {
    id: post.id, slug: post.slug, ...localeRows,
    missingLinksInBn: difference(enPaths, bnPaths),
    extraLinksInBn: difference(bnPaths, enPaths),
    missingCanonicalLinksInBn: difference(enCanonical, bnCanonical),
    extraCanonicalLinksInBn: difference(bnCanonical, enCanonical),
    bnDuplicateLinks: [...new Set(bnCanonical.filter((href: string, index: number) => bnCanonical.indexOf(href) !== index))],
    linkOrderMatches: JSON.stringify(enPaths) === JSON.stringify(bnPaths),
    referenceOrderMatches: JSON.stringify(enSources) === JSON.stringify(bnSources),
    ctaProviderMatches: localeRows.en.cta?.provider === localeRows.bn.cta?.provider,
    placements: {
      multi: MULTI_PARTNER_BLOG_PLACEMENTS[post.slug] ?? null,
      referral: TRAVELPAYOUTS_REFERRAL_BLOG_PLACEMENTS[post.slug] ?? null,
      luggage: RADICAL_STORAGE_BLOG_PLACEMENTS[post.slug] ?? null,
      hotel: KLOOK_HOTEL_BLOG_PLACEMENTS[post.slug] ?? null,
    },
  };
});

const countBy = (values: string[]) => values.reduce<Record<string, number>>((result, value) => {
  result[value] = (result[value] ?? 0) + 1;
  return result;
}, {});
const summary = {
  articles: rows.length,
  differentLinkCounts: rows.filter((row) => row.en.internalLinks.length !== row.bn.internalLinks.length).length,
  fewerBengaliLinks: rows.filter((row) => row.en.internalLinks.length > row.bn.internalLinks.length).length,
  moreBengaliLinks: rows.filter((row) => row.en.internalLinks.length < row.bn.internalLinks.length).length,
  differentLinkTargets: rows.filter((row) => row.missingLinksInBn.length || row.extraLinksInBn.length).length,
  differentCanonicalLinkTargets: rows.filter((row) => row.missingCanonicalLinksInBn.length || row.extraCanonicalLinksInBn.length).length,
  duplicateBengaliLinks: rows.filter((row) => row.bnDuplicateLinks.length).map((row) => ({ id: row.id, paths: row.bnDuplicateLinks })),
  differentLinkOrder: rows.filter((row) => !row.linkOrderMatches).length,
  differentSuggestedArticles: rows.filter((row) => JSON.stringify(row.en.suggestedSlugs) !== JSON.stringify(row.bn.suggestedSlugs)).length,
  differentReferenceOrder: rows.filter((row) => !row.referenceOrderMatches).length,
  differentCtaProviders: rows.filter((row) => !row.ctaProviderMatches).map((row) => ({ id: row.id, en: row.en.cta?.provider, bn: row.bn.cta?.provider })),
  seoSources: Object.fromEntries(locales.map((locale) => [locale, countBy(rows.map((row) => row[locale].seo.source))])),
  snippetSources: Object.fromEntries(locales.map((locale) => [locale, countBy(rows.map((row) => row[locale].snippet.source))])),
  faq: Object.fromEntries(locales.map((locale) => [locale, rows.filter((row) => row[locale].faq).length])),
  howTo: Object.fromEntries(locales.map((locale) => [locale, rows.filter((row) => row[locale].howTos.length).length])),
  sharedCallouts: rows.filter((row) => row.bn.callouts.length).map((row) => ({ id: row.id, count: row.bn.callouts.length, bengaliText: row.bn.callouts.every((callout: { text: string }) => bengali(callout.text)) })),
};
fs.writeFileSync(path.join(OUTPUT, "manifest.json"), JSON.stringify({ summary, rows }, null, 2), "utf8");
console.log(JSON.stringify(summary, null, 2));
console.log(`DOM fixtures: ${OUTPUT}`);
