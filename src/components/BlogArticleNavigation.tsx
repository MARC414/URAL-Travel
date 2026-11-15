import type { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "../types";
import {
  ARTICLE_PLANNING_HUBS, articleLinkHref, getArticlePlanningLinks, type ArticleLocale,
} from "../utils/blogPresentation";
import { generateBlogCoverAltText } from "../utils/imageAssets";
import { ResponsiveImage } from "./ResponsiveImage";

type Navigate = (path: string) => void;

function handleArticleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string, navigate?: Navigate) {
  // The app's route callback resets scroll; fragment links need native navigation.
  if (!navigate || path.includes("#") || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  navigate(path);
}

const linkClass = "flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm leading-relaxed text-brand-navy underline-offset-4 transition-colors hover:bg-slate-100 hover:underline active:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald";

export function BlogPlanningLinks({ post, locale, navigate }: { post: BlogPost; locale: ArticleLocale; navigate?: Navigate }) {
  const links = getArticlePlanningLinks(post);
  if (!links.length) return null;
  return (
    <section aria-labelledby="plan-your-trip-links" className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 font-sans">
      <h2 id="plan-your-trip-links" className="ural-section-title font-serif text-lg font-bold leading-relaxed text-brand-navy">
        {locale === "bn" ? "ভ্রমণের পরবর্তী ধাপ" : "Plan your trip"}
      </h2>
      <ul className="divide-y divide-slate-100">
        {links.map((link) => (
          <li key={link.path}>
            <a href={articleLinkHref(link.path, locale)} onClick={(event) => handleArticleNavigation(event, link.path, navigate)} className={linkClass}>
              <span className="min-w-0 break-words">{link.text}</span>
              <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BlogPlanningHubs({ locale, navigate }: { locale: ArticleLocale; navigate?: Navigate }) {
  return (
    <section aria-labelledby="planning-hub-links" className="space-y-4 border-t border-slate-200 pt-8 font-sans">
      <h2 id="planning-hub-links" className="ural-section-title font-serif text-xl font-bold leading-relaxed text-brand-navy">
        {locale === "bn" ? "ভ্রমণ পরিকল্পনার আরও সহায়তা" : "More trip-planning hubs"}
      </h2>
      <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {ARTICLE_PLANNING_HUBS.map((link) => (
          <li key={link.path}>
            <a href={articleLinkHref(link.path, locale)} onClick={(event) => handleArticleNavigation(event, link.path, navigate)} className={linkClass}>
              <span className="min-w-0 break-words">{link[locale]}</span>
              <ArrowRight size={14} aria-hidden="true" className="shrink-0" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface BlogRelatedArticlesProps {
  posts: readonly BlogPost[];
  locale: ArticleLocale;
  getCoverImage: (slug: string) => string;
  getSnippet: (slug: string, isBn: boolean, fallback: string) => string;
  navigate?: Navigate;
  /**
   * Which audience this article addresses. The heading used to name Bangladeshi
   * flyers on every post, including the UK cluster and the UK pillar.
   */
  audience?: "uk" | "bd";
}

const RELATED_HEADINGS: Record<"uk" | "bd", { en: string; bn: string }> = {
  uk: { en: "More Travel Guides for UK Travellers", bn: "যুক্তরাজ্যের ভ্রমণকারীদের জন্য আরও গাইড" },
  bd: { en: "More Travel Guides for Bangladeshi Flyers", bn: "বাংলাদেশি ভ্রমণকারীদের জন্য আরও প্রয়োজনীয় গাইড" },
};

export function BlogRelatedArticles({ posts, locale, getCoverImage, getSnippet, navigate, audience = "bd" }: BlogRelatedArticlesProps) {
  if (!posts.length) return null;
  const isBn = locale === "bn";
  const heading = RELATED_HEADINGS[audience];
  return (
    <section aria-labelledby="related-travel-guides" className="space-y-6 border-t border-slate-200 pt-10 font-sans">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <h2 id="related-travel-guides" className="ural-section-title font-serif text-2xl font-bold leading-relaxed text-brand-navy">
          {isBn ? heading.bn : heading.en}
        </h2>
        <a href={articleLinkHref("/blog", locale)} onClick={(event) => handleArticleNavigation(event, "/blog", navigate)} className={`${linkClass} self-start font-semibold sm:shrink-0`}>
          {isBn ? "সব গাইড দেখুন" : "View all guides"}<ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post) => {
          const path = `/blog/${post.slug}`;
          return (
            <li key={post.slug} className="min-w-0">
              <a
                data-related-article={post.slug}
                href={articleLinkHref(path, locale)}
                onClick={(event) => handleArticleNavigation(event, path, navigate)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-brand-navy transition-colors hover:border-brand-gold active:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <ResponsiveImage
                    src={getCoverImage(post.slug)}
                    sizes="(max-width: 767px) 100vw, 33vw"
                    alt={generateBlogCoverAltText({ title: post.title, category: post.category, slug: post.slug, lang: locale })}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-xs leading-relaxed text-slate-600">{post.category} · {post.readTime}</p>
                  <h3 className="ural-card-title font-serif text-lg font-bold leading-relaxed group-hover:text-brand-emerald">{post.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-700">{getSnippet(post.slug, isBn, post.summary)}</p>
                  <span className="mt-auto flex min-h-11 items-center justify-between gap-2 pt-3 text-sm font-semibold">
                    {isBn ? "সম্পূর্ণ গাইড পড়ুন" : "Read the full guide"}<ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
