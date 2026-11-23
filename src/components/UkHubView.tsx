import React, { useMemo } from "react";
import { CORE_PRIORITY_SEO_COPY } from "../utils/coreSeoCopy";
import { BLOG_DATA } from "../constants";

export default function UkHubView() {
  // Use pure window logic for SSR safety outside the router tree
  const isBn = typeof window !== "undefined" && window.location.pathname.startsWith("/bn");

  // The 7 UK-centric posts as identified by the strategy docs
  const ukPosts = useMemo(() => {
    return BLOG_DATA.filter(post => 
      post.slug.includes("uk-") || 
      post.slug.includes("-uk-") ||
      post.slug.includes("united-kingdom") ||
      post.slug === "madinah-first-uk-umrah-routings-open-jaw-stopover" ||
      post.slug === "ramadan-umrah-2027-uk-dates-fares-last-ten-nights" ||
      post.slug === "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide"
    ).filter(post => !post.slug.includes("bangladesh-guide")); // Exclude outbound from BD to UK
  }, []);

  const seo = CORE_PRIORITY_SEO_COPY["/uk"];
  const title = seo?.title || "UK Travel Hub & Intelligence | URAL";
  const desc = seo?.description || "Travel intelligence for the UK market: DIY Umrah preparation, ATOL checks, and UK261 flight disruption guides.";

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      <main className="max-w-6xl mx-auto px-4 py-8 mt-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{isBn ? "ইউকে ট্রাভেল হাব" : "United Kingdom Travel Hub"}</h1>
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
      </main>
    </div>
  );
}
