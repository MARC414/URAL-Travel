import type { BlogPost } from "../types";
import { getRelatedBlogPosts } from "./blogLinks";
import { SITE_ORIGIN, hasBengaliCounterpart, toBengaliPath } from "./localeRoutes";
import { toolPathForTab } from "./toolRoutes";

export type ArticleLocale = "en" | "bn";

export const ARTICLE_RELATED_LIMIT = 3;

export const ARTICLE_PLANNING_HUBS = [
  { path: "/flights", en: "Compare international flights from Dhaka", bn: "ঢাকা থেকে আন্তর্জাতিক ফ্লাইট তুলনা করুন" },
  { path: "/hotels", en: "Compare hotel areas and stays by destination", bn: "গন্তব্য অনুযায়ী হোটেল এলাকা ও থাকার বিকল্প দেখুন" },
  { path: "/visa", en: "Check visa requirements for Bangladeshi travelers", bn: "বাংলাদেশি পাসপোর্টে ভিসার শর্ত দেখুন" },
  { path: "/destinations", en: "Explore destination itineraries from Bangladesh", bn: "বাংলাদেশ থেকে ভ্রমণের দিনভিত্তিক পরিকল্পনা দেখুন" },
  { path: "/costs", en: "Plan an international trip budget in BDT", bn: "আন্তর্জাতিক ভ্রমণের BDT বাজেট সাজান" },
] as const;

/** Keep a planning link's selected tool, filters and fragment in both renderers. */
export function articleLinkPath(rawPath: string): string | null {
  if (!rawPath.startsWith("/") || rawPath.startsWith("//")) return null;
  let url: URL;
  try {
    url = new URL(rawPath, SITE_ORIGIN);
  } catch {
    return null;
  }
  if (url.origin !== SITE_ORIGIN) return null;
  url.pathname = url.pathname.replace(/^\/bn(?=\/|$)/, "") || "/";
  if (url.pathname === "/tools") {
    const toolPath = toolPathForTab(url.searchParams.get("tab"));
    if (toolPath) {
      url.pathname = toolPath;
      url.searchParams.delete("tab");
    }
  }
  if (url.pathname === "/indexing") url.pathname = "/sitemap";
  return `${url.pathname}${url.search}${url.hash}`;
}

export function articleLinkHref(path: string, locale: ArticleLocale): string {
  return locale === "bn" && hasBengaliCounterpart(path) ? toBengaliPath(path) : path;
}

export function getArticlePlanningLinks(post: BlogPost) {
  const seen = new Set<string>();
  return post.internalLinks.flatMap((link) => {
    const path = articleLinkPath(link.path);
    if (!path || !link.text.trim() || seen.has(path) || path.split(/[?#]/, 1)[0] === `/blog/${post.slug}`) return [];
    seen.add(path);
    return [{ path, text: link.text }];
  });
}

/** Rank once from the canonical article graph, then supply the locale's copy. */
export function getArticleRelatedPosts(
  slug: string,
  canonicalPosts: readonly BlogPost[],
  localizedPosts: readonly BlogPost[],
): BlogPost[] {
  const source = canonicalPosts.find((post) => post.slug === slug);
  if (!source) return [];
  const localizedBySlug = new Map(localizedPosts.map((post) => [post.slug, post]));
  return getRelatedBlogPosts(source, canonicalPosts, ARTICLE_RELATED_LIMIT).flatMap((post) => {
    const localized = localizedBySlug.get(post.slug);
    return localized ? [localized] : [];
  });
}
