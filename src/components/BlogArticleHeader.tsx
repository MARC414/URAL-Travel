import { CalendarDays } from "lucide-react";
import type { BlogPost } from "../types";
import type { ArticleLocale } from "../utils/blogPresentation";
import { toIsoDate } from "../utils/schema";
import { generateBlogCoverAltText } from "../utils/imageAssets";
import { QuickAnswer } from "./QuickAnswer";
import { ResponsiveImage } from "./ResponsiveImage";

interface BlogArticleHeaderProps {
  post: BlogPost;
  canonicalPost: Pick<BlogPost, "date" | "updatedAt">;
  locale: ArticleLocale;
  coverImage: string;
}

/** The same byline, cover and complete answer in the saved page and React. */
export function BlogArticleHeader({ post, canonicalPost, locale, coverImage }: BlogArticleHeaderProps) {
  const isBn = locale === "bn";
  const publishedIso = toIsoDate(canonicalPost.date);
  const updatedAt = canonicalPost.updatedAt || post.updatedAt;
  const statusDate = updatedAt
    ? new Intl.DateTimeFormat(isBn ? "bn-BD" : "en-BD", {
        day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Dhaka",
      }).format(new Date(`${updatedAt}T12:00:00+06:00`))
    : post.date;

  return (
    <header data-blog-article-header data-article-locale={locale} className="flex flex-col gap-5 border-b border-slate-200 pb-6 font-sans">
      <div data-blog-byline className="flex flex-wrap items-center justify-between gap-3 text-xs leading-relaxed text-slate-600">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-bold text-brand-navy">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{isBn ? "প্রকাশিত: " : "Published: "}<time dateTime={publishedIso}>{post.date}</time></span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{isBn ? `লেখক: ${post.author}` : `By ${post.author}`}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800">
          <CalendarDays size={12} aria-hidden="true" className="shrink-0" />
          <time dateTime={updatedAt ? toIsoDate(updatedAt) : publishedIso}>
            {updatedAt ? (isBn ? "হালনাগাদ" : "UPDATED") : (isBn ? "প্রকাশিত" : "PUBLISHED")} · {statusDate}
          </time>
        </span>
      </div>
      <h1 className="ural-page-title font-serif font-black text-brand-navy text-balance">
        {post.title}
      </h1>
      <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
        <ResponsiveImage
          src={coverImage}
          sizes="(max-width: 767px) 100vw, 840px"
          alt={generateBlogCoverAltText({ title: post.title, category: post.category, slug: post.slug, lang: locale })}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="aspect-[16/9] w-full object-cover object-center"
        />
      </figure>
      <QuickAnswer
        id="article-quick-answer"
        label={isBn ? "একনজরে মূল উত্তর ও সারসংক্ষেপ" : "Quick Answer & Key Takeaway"}
        bodyClassName="text-base leading-[1.75] text-slate-800"
      >
        {post.summary}
      </QuickAnswer>
    </header>
  );
}
