import React from "react";

import { ArrowRight, ExternalLink } from "lucide-react";

import { ResponsiveImage } from "../components/ResponsiveImage";

import { TravelIntelligence } from "../components/AeoInspector";

import { generateBlogCoverAltText } from "../utils/imageAssets";
import { sortBlogsNewestFirst } from "../utils/blogOrdering";
import { BLOG_CATEGORY_TABS, matchesBlogCategoryFilter } from "../utils/blogCategories";



type RouteViewProps = { context: Record<string, any> };



const BLOGS_PER_PAGE = 15;
const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function formatPageNumber(num: number, isBn: boolean): string {
  if (!isBn) return String(num);
  return String(num)
    .split("")
    .map((ch) => BENGALI_DIGITS[Number(ch)] ?? ch)
    .join("");
}

export default function BlogIndexRouteView({ context }: RouteViewProps) {

  const { BLOG_DATA = [], TopicalAuthorityBlueprint, TravelEssentials, TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, blogCategoryFilter, blogHeroBannerImg, blogSearchQuery, getBlogAeoSnippet50Words, getBlogCoverImage, getLocalizedRouteHref, isAdmin, isBn, isLanding, lang, localizedBlogs, localizedHajjFaqs, navigateTo, section, setAreTpScriptsReady, setBlogCategoryFilter, setBlogSearchQuery } = context;

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [blogCategoryFilter, blogSearchQuery]);

  return (

          <div className="space-y-12 animate-fade-in">

            {/* 1. FULL-WIDTH EDGE-TO-EDGE HERO IMAGE WITH H1 HEADER & SHORT DESCRIPTION */}

            <section

              aria-labelledby="blog-hero-h1"

              className="w-screen relative left-1/2 -translate-x-1/2 -mt-10 sm:-mt-12 bg-brand-navy text-white overflow-hidden border-b border-slate-800 shadow-xl"

            >

              <div className="absolute inset-0">

                <ResponsiveImage

                  src={blogHeroBannerImg}

                  sizes="100vw"

                  alt={
                    isBn
                      ? "বিমানবন্দরের লাউঞ্জে বসে যাত্রীরা, জানালা দিয়ে সূর্যাস্তের আলোয় বিমানের ডানা"
                      : "Travelers in an airport lounge with an airplane wing glowing in sunset light beyond the window"
                  }

                  aria-hidden={true}

                  loading="eager"

                  fetchPriority="high"

                  decoding="async"

                  className="w-full h-full object-cover object-center opacity-45 pointer-events-none"

                />

                <div

                  className="absolute inset-0"

                  style={{

                    background:

                      "linear-gradient(105deg, rgba(11,22,40,0.96) 0%, rgba(16,42,67,0.86) 55%, rgba(11,22,40,0.72) 100%)",

                  }}

                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/40" />

              </div>



              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">

                <div className="max-w-4xl space-y-5">

<h1

                    id="blog-hero-h1"

                    className="ural-page-title font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] text-balance"

                  >

                    {isBn

                      ? "বাংলাদেশি ভ্রমণকারীদের জন্য Travel Guide, Hajj ও Umrah প্রস্তুতি এবং BDT বাজেট প্ল্যান"

                      : "Bangladesh Outbound Travel Blog: Visa Checklists, DIY Umrah & BDT Trip Guides"}

                  </h1>



                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-3xl">

                    {isBn

                      ? "বাংলাদেশি পাসপোর্টধারীদের জন্য সহজ বাংলায় তৈরি ধাপে ধাপে গাইড—সরকারি নিয়মে Hajj রেজিস্ট্রেশন, Nusuk App দিয়ে DIY Umrah, Dual-Currency Card Endorsement, Dhaka Airport Immigration চেকলিস্ট এবং কম খরচে ফ্যামিলি ট্যুর পরিকল্পনা।"

                      : "Step-by-step editorial playbooks researched for Bangladeshi passport holders—covering DIY Umrah with the Nusuk app, dual-currency card endorsement, Dhaka Airport immigration checklists, and BDT destination budgets."}

                  </p>

                </div>

              </div>

            </section>



            {/* 2. INTERACTIVE CATEGORY FILTER TABS & SEARCH BAR */}

            <div id="blog-directory-grid" className="scroll-mt-24 space-y-4">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">

                <div

                  role="tablist"

                  aria-label="Filter travel guides by topic"

                  className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 p-1.5 bg-slate-200/75 rounded-xl"

                >

                  {BLOG_CATEGORY_TABS.map((tab) => {
                    const isActive = blogCategoryFilter === tab.id;
                    const label = isBn ? tab.labelBn : tab.labelEn;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setBlogCategoryFilter(tab.id)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-brand-navy text-white shadow-xs"
                            : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}

                </div>



                <div className="relative w-full lg:w-72 shrink-0">

                  <input

                    type="search"

                    value={blogSearchQuery}

                    onChange={(e) => setBlogSearchQuery(e.target.value)}

                    placeholder={

                      isBn

                        ? "Umrah, Card, Nepal, Visa লিখে খুঁজুন..."

                        : "Search Umrah, card, Nepal, visa..."

                    }

                    aria-label="Search blog guides"

                    className="w-full bg-white border border-slate-200 focus:border-brand-navy rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-colors"

                  />

                  {blogSearchQuery && (

                    <button

                      type="button"

                      onClick={() => setBlogSearchQuery("")}

                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"

                    >

                      {isBn ? "মুছুন" : "Clear"}

                    </button>

                  )}

                </div>

              </div>

            </div>



            {/* 3. 3-CARDS-PER-ROW BLOG GRID (UNIQUE THUMBNAIL + DARK H2 TITLE + ~50-WORD AEO SNIPPET + 'READ FULL BLOG' BUTTON) */}

            {(() => {

              const orderedBlogs = sortBlogsNewestFirst(localizedBlogs, BLOG_DATA);



              const filteredBlogs = orderedBlogs.filter((post) => {

                const matchesCategory = matchesBlogCategoryFilter(post.category, blogCategoryFilter);



                const q = blogSearchQuery.trim().toLowerCase();

                const matchesQuery =

                  !q ||

                  post.title.toLowerCase().includes(q) ||

                  post.summary.toLowerCase().includes(q) ||

                  post.category.toLowerCase().includes(q);



                return matchesCategory && matchesQuery;

              });



              if (filteredBlogs.length === 0) {

                return (

                  <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">

                    <h2 className="ural-section-title font-serif text-[20px] font-bold text-brand-navy">

                      {isBn ? "কোনো ট্রাভেল গাইড খুঁজে পাওয়া যায়নি" : "No matching travel guides found"}

                    </h2>

                    <p className="text-xs text-slate-600 max-w-md mx-auto">

                      {isBn

                        ? "অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন অথবা সব গাইড দেখতে নিচের বাটনে ক্লিক করুন।"

                        : "Try clearing your search filter or switching back to All Guides to browse our complete library of Bangladeshi travel guides."}

                    </p>

                    <button

                      type="button"

                      onClick={() => {

                        setBlogCategoryFilter("all");

                        setBlogSearchQuery("");

                      }}

                      className="bg-brand-navy text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"

                    >

                      {isBn

                        ? "সবগুলো গাইড দেখুন"

                        : "Show All Guides"}

                    </button>

                  </div>

                );

              }



              const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE));

              const safePage = Math.min(currentPage, totalPages);

              const paginatedBlogs = filteredBlogs.slice(

                (safePage - 1) * BLOGS_PER_PAGE,

                safePage * BLOGS_PER_PAGE,

              );

              const goToPage = (page: number) => {

                const next = Math.max(1, Math.min(page, totalPages));

                setCurrentPage(next);

                if (typeof document !== "undefined") {

                  document.getElementById("blog-directory-grid")?.scrollIntoView({

                    behavior: "smooth",

                    block: "start",

                  });

                }

              };



              return (

                <div className="space-y-8">

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                    {paginatedBlogs.map((post) => {

                    const coverImg = getBlogCoverImage(post.slug);

                    const aeoSnippet50Words = getBlogAeoSnippet50Words(post.slug, isBn, post.summary);



                    return (
                      <article
                        key={post.id}
                        className="group bg-white border border-slate-200/90 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        {/* Native link: the whole card (thumbnail, title and footer) opens the
                            article in a new tab, so the listing's filter and page state stay put. */}
                        <a
                          href={getLocalizedRouteHref(`/blog/${post.slug}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 flex-col justify-between rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald focus-visible:ring-offset-2"
                        >
                          <div className="flex flex-col">
                            {/* Unique Card Thumbnail Image */}
                            <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                              <ResponsiveImage
                                src={coverImg}
                                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                alt={generateBlogCoverAltText({
                                  title: post.title,
                                  category: post.category,
                                  slug: post.slug,
                                  lang: isBn ? "bn" : "en",
                                })}
                                loading="lazy"
                                fetchPriority="low"
                                decoding="async"
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/95 font-medium">
                                <span className="bg-brand-navy/85 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/15">
                                  {post.category}
                                </span>
                                <span className="font-mono">{post.readTime}</span>
                              </div>
                            </div>

                            {/* Card Body: Metadata + Dark H2 Title (20px-22px) + ~50-Word AEO Main Snippet (14px) */}
                            <div className="p-6 space-y-3">
                              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                                <span>{post.date}</span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  {isBn
                                    ? `লেখক: ${post.author.split(" (")[0]}`
                                    : `By ${post.author.split(" (")[0]}`}
                                </span>
                              </div>

                              <h2 className="ural-card-title font-serif text-[20px] sm:text-[22px] font-bold text-brand-navy group-hover:text-brand-emerald leading-[1.3] text-balance">
                                {post.title}
                              </h2>

                              <p className="text-[14px] text-slate-700 leading-[1.65]">
                                {aeoSnippet50Words}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer: 'Read Full Blog' affordance + new-tab notice */}
                          <div className="px-6 pb-6 pt-2">
                            <span className="w-full bg-brand-navy group-hover:bg-[#F6B73C] text-white group-hover:text-brand-navy font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-between">
                              <span>
                                {isBn ? "সম্পূর্ণ ব্লগ পড়ুন · Read Full Blog" : "Read Full Blog"}
                              </span>
                              <ArrowRight size={14} className="text-[#F6B73C] group-hover:text-brand-navy transition-transform group-hover:translate-x-0.5" />
                            </span>
                            <span className="mt-2 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                              <ExternalLink size={11} aria-hidden="true" />
                              {isBn ? "নতুন ট্যাবে খুলবে" : "Opens in a new tab"}
                            </span>
                          </div>
                        </a>
                      </article>
                    );
                  })}

                  </div>



                  {totalPages > 1 && (

                    <nav

                      aria-label={isBn ? "ব্লগ পেজ নেভিগেশন" : "Blog pagination"}

                      className="flex flex-wrap items-center justify-center gap-2 pt-2"

                    >

                      <button

                        type="button"

                        disabled={safePage <= 1}

                        onClick={() => goToPage(safePage - 1)}

                        className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:border-brand-navy hover:text-brand-navy disabled:opacity-45 disabled:pointer-events-none transition-colors cursor-pointer"

                      >

                        {isBn ? "← আগের পেজ" : "← Previous"}

                      </button>



                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => {

                        const isCurrent = pageNum === safePage;

                        return (

                          <button

                            key={pageNum}

                            type="button"

                            aria-current={isCurrent ? "page" : undefined}

                            onClick={() => goToPage(pageNum)}

                            className={`min-w-[38px] h-[38px] px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${

                              isCurrent

                                ? "bg-brand-navy text-white border-brand-navy shadow-xs"

                                : "bg-white text-slate-700 border-slate-200 hover:border-brand-navy hover:text-brand-navy"

                            }`}

                          >

                            {formatPageNumber(pageNum, isBn)}

                          </button>

                        );

                      })}



                      <button

                        type="button"

                        disabled={safePage >= totalPages}

                        onClick={() => goToPage(safePage + 1)}

                        className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:border-brand-navy hover:text-brand-navy disabled:opacity-45 disabled:pointer-events-none transition-colors cursor-pointer"

                      >

                        {isBn ? "পরের পেজ →" : "Next →"}

                      </button>

                    </nav>

                  )}

                </div>

              );

            })()}



            {/* Admin-Only SEO Matrix (Hidden from regular site visitors) */}

            {isAdmin && (

              <React.Suspense fallback={null}>

                <TopicalAuthorityBlueprint lang={lang} onNavigate={navigateTo} />

              </React.Suspense>

            )}



            {/* 4. SMART CONVERSION WIDGETS SECTION ON BLOG DIRECTORY PAGE */}

            <div className="pt-8 border-t border-slate-200 space-y-8">

              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">

                  <div className="space-y-1">

                    <div className="text-xs font-semibold text-brand-navy">

                      {isBn

                        ? "লাইভ Flight ও Umrah রুটের ভাড়া তুলনা"

                        : "Live Airfare & Umrah Route Comparison"}

                    </div>

                    <h2 className="ural-section-title font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy">

                      {isBn

                        ? "ঢাকা (DAC) থেকে ফ্লাইটের সর্বনিম্ন ভাড়া যাচাই করুন"

                        : "Compare Flights from Dhaka (DAC) While You Plan"}

                    </h2>

                    <p className="text-xs text-slate-600">

                      {isBn

                        ? "Jeddah, Madinah, Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé ও Dubai-এর লাইভ ভাড়া দেখুন—অথবা Dual-Currency Card না থাকলে আমাদের WhatsApp BDT ডেস্কে মেসেজ দিন।"

                        : "Search live fares to Jeddah, Madinah, Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé, and Dubai—or message our WhatsApp BDT Desk if you don't have a dual-currency card yet."}

                    </p>

                  </div>

                  <button

                    type="button"

                    onClick={() => navigateTo("/contact")}

                    className="self-start sm:self-end text-xs font-semibold text-brand-navy hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"

                  >

                    <span>

                      {isBn

                        ? "BDT-তে টিকিট ও হোটেল বুকিং সহায়তা"

                        : "Need BDT Booking Help? Contact Desk"}

                    </span>

                    <ArrowRight size={12} />

                  </button>

                </div>

                {areTpScriptsReady ? (

                  <React.Suspense

                    fallback={

                      <TravelpayoutsWidgetSkeleton

                        variant="flights"

                        isBn={isBn}

                        onInteract={() => setAreTpScriptsReady(true)}

                      />

                    }

                  >

                    <TravelpayoutsEmbed defaultDestination="JED" />

                  </React.Suspense>

                ) : (

                  <TravelpayoutsWidgetSkeleton

                    variant="flights"

                    isBn={isBn}

                    onInteract={() => setAreTpScriptsReady(true)}

                  />

                )}

              </div>



              <React.Suspense fallback={null}>

                <TravelEssentials country="Saudi Arabia & Asia" defaultTab="transfers" compactHeader lang={lang} />

              </React.Suspense>



              <TravelIntelligence

                pageTitle={

                  isBn

                    ? "বাংলাদেশ থেকে Hajj, Umrah ও বিদেশ ভ্রমণের প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"

                    : "Hajj, Umrah & Outbound Preparation from Bangladesh — Verified FAQs"

                }

                quickAnswer={

                  isBn

                    ? "বাংলাদেশি নাগরিকদের ফরজ হজের জন্য ধর্ম বিষয়ক মন্ত্রণালয়ের অফিশিয়াল পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হবে। ওমরাহ মন্ত্রণালয়ের সিজন ক্যালেন্ডার অনুযায়ী চলে—১৪৪৮ হিজরিতে Umrah ভিসা ইস্যু সর্বশেষ ৯ মার্চ ২০২৭ এবং প্রবেশ সর্বশেষ ২৩ মার্চ ২০২৭, তাই বুক করার আগে বর্তমান ক্যালেন্ডার দেখে নিন। সরকারি Umrah ভিসার ফি 'আনুমানিক ৩০০ সৌদি রিয়াল' বলা হয়েছে (১৫ অক্টোবর ২০২৬ যাচাই); ইনস্যুরেন্স ও সার্ভিস প্যাকেজের অঙ্ক ইস্যুর সময় নির্ধারিত হয়, তাই এখানে কোনো BDT মোট খরচ প্রকাশ করা হলো না। যোগ্য Saudia বা flynas ইটিনারারিতে চেকআউটে ৯৬ ঘণ্টার stopover ভিসা যোগ করা যায়, আর বৈধ ও আগে ব্যবহৃত US/UK/Schengen ভিসা থাকলে বর্তমান শর্তে visa-on-arrival প্রযোজ্য হতে পারে।"

                    : "Bangladeshi citizens must register via hajj.gov.bd for obligatory Hajj. Umrah follows the Ministry's season calendar — for 1448H, Umrah visas are issued through 9 March 2027 and entry closes 23 March 2027, so check the current calendar before booking. The government Umrah visa fee is stated as 'estimated at 300 Saudi Riyals' (checked 15 October 2026), with insurance and the service package priced at issuance; no BDT total is published. A 96-hour stopover can be added at Saudia or flynas checkout on a qualifying itinerary, and a valid, previously used US, UK or Schengen visa may qualify for visa-on-arrival where current conditions are met."

                }

                keyFacts={[

                  {

                    label: isBn ? "Umrah ভিসার সরকারি ফি" : "Umrah visa government fee",

                    value: isBn ? "SAR ৩০০ ('আনুমানিক', ১৫ অক্টোবর ২০২৬ যাচাই) — প্যাকেজসহ মোট অঙ্ক ইস্যুর সময় জানা যায়" : "SAR 300 (stated as an estimate; checked 15 Oct 2026) — insurance and package priced at issuance",

                  },

                  {

                    label: isBn ? "১০ দিনের DIY Umrah বাজেট" : "10-Day DIY Umrah Budget",

                    value: isBn ? "BDT ১,১৬,০০০ – ১,৩২,০০০ / জন (১৪ অক্টোবর ২০২৬ যাচাই; লাইভ কোট নয়)" : "BDT 1,16,000 – 1,32,000 / Person (checked 14 Oct 2026; not a live quote)",

                  },

                  {

                    label: isBn ? "বার্ষিক Card FX কোটা" : "Annual Card FX Quota",

                    value: "$18,000 USD / Adult Passport (FE Circular 33)",

                  },

                  {

                    label: isBn ? "বায়োমেট্রিক ও পারমিট অ্যাপ (ভিসাভেদে প্রযোজ্য)" : "Biometric & permit apps (visa-specific)",

                    value: isBn ? "Nusuk (nusuk.sa) + প্রযোজ্য হলে Saudi Visa Bio" : "Nusuk (nusuk.sa) + Saudi Visa Bio where your visa application requires it",

                  },

                ]}

                faqs={localizedHajjFaqs}

              />

            </div>

          </div>

        );

}
