import React, { useMemo } from "react";
import { CORE_PRIORITY_SEO_COPY } from "../utils/coreSeoCopy";
import { BLOG_DATA } from "../constants";

/**
 * True for a UK-reader pillar post. Matching on whole slug tokens is what keeps
 * `nusuk-…` (the Saudi Nusuk service) out of a UK hub: `includes("uk-")` matched
 * "nusuk-hotel-…" and listed Bangladeshi pilgrimage guides here. The Bangladesh
 * outbound "Europe, UK & USA" guide is excluded on purpose — it serves a reader
 * leaving Bangladesh, not a UK reader planning Umrah.
 */
export function isUkHubPost(slug: string): boolean {
  if (!slug || slug.includes("bangladesh-guide")) return false;
  return slug.split("-").includes("uk") || slug.includes("united-kingdom");
}

export default function UkHubView() {
  // Use pure window logic for SSR safety outside the router tree
  const isBn = typeof window !== "undefined" && window.location.pathname.startsWith("/bn");

  // The 7 UK-centric posts as identified by the strategy docs
  const ukPosts = useMemo(() => BLOG_DATA.filter(post => isUkHubPost(post.slug)), []);

  const seo = CORE_PRIORITY_SEO_COPY["/uk"];
  const desc = seo?.description || "Travel intelligence for the UK market: DIY Umrah preparation, ATOL checks, and UK261 flight disruption guides.";

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      {/* The app shell already renders <main id="main-content">; a second main
          landmark here would split the page for screen readers and crawlers. */}
      <section aria-labelledby="uk-hub-title" className="max-w-6xl mx-auto px-4 py-8 mt-16">
        <header className="mb-12">
          <h1 id="uk-hub-title" className="text-4xl font-bold mb-4">{isBn ? "ইউকে ট্রাভেল হাব" : "United Kingdom Travel Hub"}</h1>
          <p className="text-xl text-gray-600">{desc}</p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{isBn ? "ইউকে ট্রাভেলার গাইড" : "Guides for UK Travelers"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ukPosts.map(post => (
              <a 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-lg mb-2">{post.title}</div>
                <div className="text-sm text-gray-600 line-clamp-3">{post.summary}</div>
              </a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
