import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BLOG_DATA } from "../src/constants";
import { BLOG_BODY } from "../src/data/blogContent";
import { getLocalizedBlogs, getLocalizedHajjFaqs } from "../src/data/bengaliContent";
import BlogPostRouteView from "../src/routes/BlogPostRouteView";
import {
  ARTICLE_PLANNING_HUBS, articleLinkPath, articleLinkHref,
  getArticlePlanningLinks, getArticleRelatedPosts, type ArticleLocale,
} from "../src/utils/blogPresentation";
import { getBlogCoverImage } from "../src/utils/blogCoverImages";
import { getBlogAeoSnippet50Words } from "../src/utils/blogSnippets";
import { getRelatedBlogPosts } from "../src/utils/blogLinks";
import { toIsoDate } from "../src/utils/schema";
import { toBengaliPath } from "../src/utils/localeRoutes";
import { AFFILIATE_LINKS, RADICAL_STORAGE_BLOG_PLACEMENTS, resolvePartnerUrl } from "../src/components/AffiliatePartners";
import type { BlogPost } from "../src/types";

type Check = (ok: boolean, label: string) => void;
const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#(?:0?39|x0?27);|&apos;/gi, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const plain = (html: string) => decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const equal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const section = (html: string, id: string) => html.match(new RegExp(`<section\\b[^>]*aria-labelledby="${id}"[^>]*>[\\s\\S]*?<\\/section>`))?.[0] ?? "";
const anchors = (html: string) => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
  href: decode(match[1].match(/\bhref="([^"]*)"/)?.[1] ?? ""),
  text: plain(match[2]),
  attributes: match[1],
  body: match[2],
}));

function presentationProblems(html: string, post: BlogPost, canonical: BlogPost, locale: ArticleLocale): string[] {
  const problems: string[] = [];
  const header = html.match(/<header\b[^>]*data-blog-article-header[^>]*>[\s\S]*?<\/header>/)?.[0] ?? "";
  const quickAnswer = header.match(/<div\b[^>]*id="article-quick-answer"[^>]*>[\s\S]*?<\/div>/)?.[0] ?? "";
  if (!quickAnswer || !plain(quickAnswer).endsWith(plain(post.summary))) problems.push("full summary missing from QuickAnswer");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((match) => plain(match[1]));
  if (!equal(h1s, [plain(post.title)])) problems.push("localized H1 differs or repeats");
  if (![post.date, post.author, post.readTime, post.category].every((value) => plain(header).includes(plain(value)))) {
    problems.push("byline fields missing");
  }
  const dates = [...header.matchAll(/<time\b[^>]*dateTime="([^"]+)"/gi)].map((match) => match[1]);
  if (!equal(dates, [toIsoDate(canonical.date), toIsoDate(canonical.updatedAt || canonical.date)])) problems.push("canonical publication/update dates changed");
  if (!header.includes(`src="${getBlogCoverImage(post.slug)}"`) || !header.includes('type="image/avif"') ||
      !/\bwidth="\d+"/.test(header) || !/\bheight="\d+"/.test(header) || !header.includes('loading="eager"')) {
    problems.push("responsive article cover missing");
  }
  for (const id of ["article-quick-answer", "plan-your-trip-links", "related-travel-guides", "planning-hub-links"]) {
    if (html.split(`id="${id}"`).length !== 2) problems.push(`${id} absent or duplicated`);
  }
  const planning = anchors(section(html, "plan-your-trip-links"));
  const expectedPlanning = getArticlePlanningLinks(post).map((link) => ({ href: articleLinkHref(link.path, locale), text: plain(link.text) }));
  if (!equal(planning.map(({ href, text }) => ({ href, text })), expectedPlanning)) problems.push("curated targets or complete labels differ");
  const hubs = anchors(section(html, "planning-hub-links"));
  if (!equal(hubs.map(({ href, text }) => ({ href, text })), ARTICLE_PLANNING_HUBS.map((hub) => ({ href: articleLinkHref(hub.path, locale), text: hub[locale] })))) {
    problems.push("localized planning hubs differ");
  }
  const related = anchors(section(html, "related-travel-guides")).filter((link) => link.attributes.includes("data-related-article="));
  // Expected selection comes from the canonical scorer, independent of the new adapter.
  const expected = getRelatedBlogPosts(canonical, BLOG_DATA, 3);
  const expectedPaths = expected.map((entry) => `${locale === "bn" ? "/bn" : ""}/blog/${entry.slug}`);
  if (!equal(related.map((link) => link.href), expectedPaths)) problems.push("ordered recommendations differ from canonical selection");
  const localized = getLocalizedBlogs(locale);
  for (const [index, candidate] of expected.entries()) {
    const copy = localized.find((entry) => entry.slug === candidate.slug)!;
    const card = related[index];
    if (!card || !card.text.includes(plain(copy.title)) || !card.text.includes(plain(getBlogAeoSnippet50Words(copy.slug, locale === "bn", copy.summary))) ||
        !card.body.includes(`src="${getBlogCoverImage(copy.slug)}"`) || !card.body.includes('loading="lazy"')) {
      problems.push(`localized related-card content missing: ${candidate.slug}`);
    }
  }
  return problems;
}

/** Run from verify:build; checks all published pairs in saved HTML and the real route. */
export function checkArticlePresentation(dist: string, check: Check): void {
  const pages = new Map<string, string>();
  const coverage: Record<string, string[]> = {};
  const luggageProblems: string[] = [];
  for (const locale of ["en", "bn"] as const) {
    const localizedBlogs = getLocalizedBlogs(locale);
    for (const surface of ["static", "react"] as const) {
      const issues: string[] = [];
      for (const canonical of BLOG_DATA) {
        const post = localizedBlogs.find((entry) => entry.slug === canonical.slug)!;
        let html = "";
        try {
          html = surface === "static"
            ? fs.readFileSync(path.join(dist, locale === "bn" ? "bn" : "", "blog", `${post.slug}.html`), "utf8")
            : renderToStaticMarkup(React.createElement(BlogPostRouteView, { context: {
                AuthorBioCard: () => null, blogBodies: BLOG_BODY, getBlogAeoSnippet50Words, getBlogCoverImage,
                getLocalizedRouteHref: (href: string) => locale === "bn" ? toBengaliPath(href) : href,
                isBn: locale === "bn", isLanding: false, lang: locale, localizedBlogs,
                localizedHajjFaqs: getLocalizedHajjFaqs(locale), navigateTo: () => {},
                parameterId: post.slug, section: "blog", setAffiliateToast: () => {},
              } }));
          issues.push(...presentationProblems(html, post, canonical, locale).map((problem) => `${post.id}: ${problem}`));
        } catch (error) {
          issues.push(`${post.id}: ${String(error)}`);
        }
        pages.set(`${locale}:${surface}:${post.slug}`, html);
        const placement = RADICAL_STORAGE_BLOG_PLACEMENTS[post.slug];
        if (placement) {
          const title = locale === "bn" ? placement.headlineBn : placement.headlineEn;
          const label = locale === "bn" ? placement.buttonLabelBn : placement.buttonLabelEn;
          const href = resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage);
          if (!plain(html).includes(title) || !anchors(html).some((link) => link.href === href && link.text.includes(label) &&
              link.attributes.includes('target="_blank"') && /\brel="[^"]*sponsored/.test(link.attributes))) {
            luggageProblems.push(`${locale}/${surface}/${post.id}`);
          }
        }
      }
      coverage[`${locale}:${surface}`] = issues;
      check(issues.length === 0, `${locale} ${surface}: all ${BLOG_DATA.length} articles retain full headers, canonical dates, planning links, localized cards and unique section IDs [${issues.slice(0, 3).join("; ")}]`);
    }
  }
  check(luggageProblems.length === 0, `contextual luggage-storage actions render with localized copy and sponsored links on both surfaces [${luggageProblems.join(", ")}]`);

  const pathFixtures = [
    ["/tools?tab=currency&amount=500#result", "/tools/currency-converter?amount=500#result"],
    ["/bn/tools?tab=converter#result", "/tools/currency-converter#result"],
    ["/experiences?region=asia&city=bangkok#tickets", "/experiences?region=asia&city=bangkok#tickets"],
    ["/indexing#guides", "/sitemap#guides"],
    ["/blog/example#source-1", "/blog/example#source-1"],
  ];
  check(pathFixtures.every(([input, expected]) => articleLinkPath(input) === expected &&
    articleLinkHref(expected, "bn") === `/bn${expected}` && articleLinkHref(expected, "en") === expected) &&
    ["https://example.org/path", "//example.org", "/\\example.org/path", "javascript:alert(1)"].every((input) => articleLinkPath(input) === null),
  "article planning paths preserve filters/fragments, resolve currency aliases and reject non-site targets");

  const original = BLOG_DATA.find((post) => post.slug === "umrah-hajj-guide-bangladesh-nusuk-bdt-cost")!;
  const bn = getLocalizedBlogs("bn").find((post) => post.slug === original.slug)!;
  const valid = pages.get(`bn:static:${original.slug}`)!;
  const mutations = [
    valid.replace(bn.summary, "Shortened summary"),
    valid.replace('id="article-quick-answer"', 'id="missing-answer"'),
    valid.replace('id="planning-hub-links"', 'id="missing-hubs"'),
    valid.replace(`<time dateTime="${toIsoDate(original.date)}"`, '<time dateTime="2099-01-01"'),
    valid + '<div id="planning-hub-links"></div>',
    valid.replace(/(data-related-article="[^"]+" href=")\/bn\/blog\//, "$1/blog/"),
  ];
  check(coverage["bn:static"].length === 0 && mutations.every((html) => !equal(html, valid) && presentationProblems(html, bn, original, "bn").length > 0),
    "article presentation guard rejects shortened answers, missing/duplicate sections, altered dates and English related links on Bengali pages (negative controls)");

  // Translation and locale-specific editorial arrays cannot change automatic ranking.
  const changedLocale = getLocalizedBlogs("bn").map((post) => ({ ...post, title: "সম্পূর্ণ আলাদা শিরোনাম", category: "আলাদা বিভাগ", internalLinks: [] }));
  check(BLOG_DATA.every((post) => equal(
    getArticleRelatedPosts(post.slug, BLOG_DATA, changedLocale).map((entry) => entry.slug),
    getRelatedBlogPosts(post, BLOG_DATA, 3).map((entry) => entry.slug),
  )), "automatic article recommendations depend on the canonical graph, even when translated titles/categories/links differ");
}
