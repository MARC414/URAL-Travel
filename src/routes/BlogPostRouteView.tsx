import React from "react";

import { BLOG_DATA } from "../constants";

import { ChevronLeft, CalendarDays, ExternalLink, Link2, ArrowRight, Lightbulb, KeyRound, TriangleAlert, Telescope } from "lucide-react";

import { ResponsiveImage } from "../components/ResponsiveImage";
import { QuickAnswer } from "../components/QuickAnswer";

import { TiqetsEmbedWidget } from "../components/TiqetsEmbedWidget";

import { TravelIntelligence } from "../components/AeoInspector";

import { toIsoDate, URAL_SOCIAL_LINKS } from "../utils/schema";

import { generateBlogCoverAltText } from "../utils/imageAssets";

import { getAuthorProfile } from "../data/authorProfiles";

import { getRelatedBlogPosts } from "../utils/blogLinks";

import { getVisibleBlogFaqSection } from "../utils/blogStructuredData";

import { sanitizeExpiredPromoText, PartnerLinkButton, AFFILIATE_LINKS, RadicalStorageContextualCallout, MultiPartnerBlogCallout, TravelpayoutsReferralCallout, KlookActivitiesWidget, KiwitaxiTransferWidget, AiraloEsimWidget, QeeqCarRentalWidget } from "../components/AffiliatePartners";



type RouteViewProps = { context: Record<string, any> };



const UMRAH_GUIDE_SLUG = "umrah-hajj-guide-bangladesh-nusuk-bdt-cost";
const UMRAH_BUDGET_TABLE_MARKER = "[[UMRAH_BUDGET_TABLE]]";

function formatReferenceNumber(index: number, isBengali: boolean): string {
  const number = String(index + 1);
  return isBengali
    ? number.replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)])
    : number;
}

function formatArticleDate(isoDate: string, isBengali: boolean) {

  return new Intl.DateTimeFormat(isBengali ? "bn-BD" : "en-BD", {

    day: "numeric",

    month: "short",

    year: "numeric",

    timeZone: "Asia/Dhaka",

  }).format(new Date(`${isoDate}T12:00:00+06:00`));

}

function UmrahBudgetTable({ isBengali }: { isBengali: boolean }) {
  return (
    <section className="my-2 space-y-3" aria-labelledby="umrah-budget-table-heading">
      <h2 id="umrah-budget-table-heading" className="font-serif text-lg font-bold text-brand-navy">
        {isBengali ? "১০ দিনের DIY Umrah পরিকল্পনা-হিসাব" : "10-day DIY Umrah planning estimate"}
      </h2>
      <p className="text-sm leading-relaxed text-slate-700">
        {isBengali
          ? "চারজনের পরিবারের রুম-শেয়ারের আগের প্রকাশিত হিসাবটি রাখা হয়েছে; ১৪ অক্টোবর ২০২৬-এ নতুন করে দাম যাচাই করা হয়নি।"
          : "The previously published family-of-four-sharing figure is retained; it was not re-priced on 14 October 2026."}
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-[42rem] w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            {isBengali
              ? "আগের প্রকাশিত ১০ দিনের Umrah পরিকল্পনা-হিসাব ও quote তুলনার সীমাবদ্ধতা"
              : "Previously published 10-day Umrah estimate and comparison limitation"}
          </caption>
          <thead className="bg-slate-100 text-brand-navy">
            <tr>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 font-semibold">
                {isBengali ? "পরিকল্পনার বিষয়" : "Planning item"}
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 font-semibold">
                {isBengali ? "প্রকাশিত অঙ্ক / অবস্থা" : "Published figure / status"}
              </th>
              <th scope="col" className="border-b border-slate-200 px-4 py-3 font-semibold">
                {isBengali ? "ভিত্তি ও সীমাবদ্ধতা" : "Basis and limitation"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <th scope="row" className="px-4 py-3 font-semibold text-slate-800">
                {isBengali ? "DIY Umrah মোট (জনপ্রতি)" : "DIY Umrah total (per person)"}
              </th>
              <td className="px-4 py-3 font-semibold text-brand-navy">BDT 1,16,000–1,32,000</td>
              <td className="px-4 py-3 text-slate-700">
                {isBengali
                  ? "১০ দিন; চারজনের পরিবারের রুম-শেয়ার। আগের পরিকল্পনা-হিসাব; live quote নয়।"
                  : "10 days; family of four sharing. Inherited planning estimate, not a live quote."}
              </td>
            </tr>
            <tr>
              <th scope="row" className="px-4 py-3 font-semibold text-slate-800">
                {isBengali ? "এজেন্সি package-এর সঙ্গে তুলনা" : "Comparison with an agency package"}
              </th>
              <td className="px-4 py-3 text-slate-700">
                {isBengali ? "একই ভিত্তির quote পাওয়া যায়নি" : "No matched quote captured"}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {isBengali
                  ? "একই তারিখ, সময়কাল, room occupancy, flight ও অন্তর্ভুক্ত সেবা ধরে itemized quote ছাড়া সাশ্রয় অনুমান করা যাবে না।"
                  : "Do not infer savings without an itemized quote on the same dates, duration, room occupancy, flight and inclusions."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default function BlogPostRouteView({ context }: RouteViewProps) {

  const { AuthorBioCard, blogBodies, getBlogAeoSnippet50Words, getBlogCoverImage, getLocalizedRouteHref, isBn, isLanding, lang, localizedBlogs, localizedHajjFaqs, navigateTo, parameterId, section, setAffiliateToast } = context;

  return (

          <div className="space-y-8 animate-fade-in">

            {(() => {

              const activePost = localizedBlogs.find((p) => p.slug === parameterId) || localizedBlogs[0];

              const canonicalPost = BLOG_DATA.find((post) => post.slug === activePost.slug);

              const updatedAt = canonicalPost?.updatedAt || activePost.updatedAt;

              const publishedDateIso = toIsoDate(canonicalPost?.date || activePost.date);

              const updatedDateLabel = updatedAt ? formatArticleDate(updatedAt, isBn) : null;

              const dateStatusLabel = updatedAt

                ? `${isBn ? "হালনাগাদ" : "UPDATED"} · ${updatedDateLabel}`

                : `${isBn ? "প্রকাশিত" : "PUBLISHED"} · ${activePost.date}`;

              // Body text: Bengali posts carry it inline in BLOG_DATA, English posts

              // get it from the lazily loaded ./data/blogContent module (see the

              // effect near the top of the component). Empty until that module

              // resolves — the placeholder above covers that window.

              const articleBody = activePost.content ?? blogBodies?.[activePost.slug] ?? "";

              const articleBlocks = articleBody

                ? sanitizeExpiredPromoText(articleBody).split("\n\n")

                : [];

              const isStandaloneHeading = (block: string) => {

                const trimmed = block.trim();

                if (trimmed.split("\n").length > 1) return false;

                return (

                  /^([0-9]+|[০-৯]+)\.\s+/.test(trimmed) ||

                  /^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(trimmed) ||

                  (trimmed.endsWith(":") && trimmed.length < 125) ||

                  (trimmed.length < 125 && /^[A-Z0-9&/ .,'’()–—-]+$/.test(trimmed))

                );

              };

              const canPlaceContextualCalloutAfter = (block: string, blockIndex: number) => {

                const trimmed = block.trim();

                return Boolean(

                  trimmed &&

                    trimmed !== "[[figure]]" &&

                    !activePost.callouts?.some((callout) => callout.blockIdx === blockIndex) &&

                    !getVisibleBlogFaqSection(activePost.slug, trimmed, isBn ? "bn" : "en") &&

                    !isStandaloneHeading(trimmed)

                );

              };

              const calloutTargetIndex = Math.max(

                Math.min(4, Math.max(0, articleBlocks.length - 1)),

                Math.floor(articleBlocks.length * 0.4)

              );

              const laterCalloutIndex = articleBlocks.findIndex(

                (block, blockIndex) =>

                  blockIndex >= calloutTargetIndex &&

                  canPlaceContextualCalloutAfter(block, blockIndex)

              );

              const contextualLinkInsertionIndex =

                laterCalloutIndex >= 0

                  ? laterCalloutIndex

                  : articleBlocks.findIndex(canPlaceContextualCalloutAfter);

              const canonicalAuthorRaw =

                BLOG_DATA.find((post) => post.slug === activePost.slug)?.author ||

                activePost.author;

              const activeCoverImg = getBlogCoverImage(activePost.slug);

              const sameCategoryPosts = localizedBlogs.filter(

                (p) => p.slug !== activePost.slug && p.category === activePost.category

              );

              const relatedPosts = getRelatedBlogPosts(activePost, localizedBlogs, 3);



              // First-Occurrence Semantic Contextual Internal Linker (Nathan Gotch / Koray Tugberk Silo Rule)

              // Ensures each target URL is linked at most ONCE inside the article body (no spammy duplicate links, no self-links)

              const usedInternalPaths = new Set<string>();

              const currentBlogPath = `/blog/${activePost.slug}`;



              const CONTEXTUAL_INTERNAL_LINK_RULES: { pattern: RegExp; path: string; title: string }[] = [

                {

                  pattern: /\b(Nusuk App|Nusuk portal|Rawdah Shareef permit|Riyazul Jannah|রিয়াজুল জান্নাত|Nusuk অ্যাপ)\b/i,

                  path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",

                  title: "Nusuk App & Rawdah Shareef Permit Step-by-Step Guide",

                },

                {

                  pattern: /\b(96-Hour Saudi Stopover Visa|Saudi Stopover Visa|৯৬ ঘণ্টার Saudi Stopover Visa|স্টপওভার ভিসা)\b/i,

                  path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",

                  title: "96-Hour Saudi Stopover Visa Guide for Bangladeshis",

                },

                {

                  pattern: /\b(Haramain Bullet Train|Haramain High-Speed Train|Jabal Omar|Mahbas Al Jin|হারামাইন বুলেট ট্রেন)\b/i,

                  path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",

                  title: "Makkah & Madinah Hotel Zones & Haramain Bullet Train Guide",

                },

                {

                  pattern: /\b(Open-Jaw|Multi-City ticket|মাল্টি-সিটি টিকিট|Open-Jaw Flight)\b/i,

                  path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia",

                  title: "Dhaka to Jeddah & Madinah Open-Jaw Flight Strategy",

                },

                {

                  pattern: /\b(Dual-Currency Card|passport dollar endorsement|\$18,000 annual travel quota|\$12,000 annual travel quota|ডুয়াল-কারেন্সি কার্ড|ডলার এনডোর্সমেন্ট)\b/i,

                  path: "/blog/dual-currency-card-endorsement-bangladesh",

                  title: "Dual-Currency Card & $18,000 Passport Endorsement Guide",

                },

                {

                  pattern: /\b(elderly parents|electric scooter|wheelchair assistance|বয়স্ক মা-বাবা|ইলেকট্রিক স্কুটার)\b/i,

                  path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide",

                  title: "Performing Umrah with Elderly Parents from Bangladesh",

                },

                {

                  pattern: /\b(Ladies' Gates 25–29|Northern Gates 25 to 29|without a male Mahram|মাহরাম ছাড়া)\b/i,

                  path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates",

                  title: "Umrah Rules for Bangladeshi Women & Ladies' Gates 25–29",

                },

                {

                  pattern: /\b(Miqat Qarn al-Manazil|wear Ihram|ইহরাম বাঁধার নিয়ম|মিকাত)\b/i,

                  path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules",

                  title: "Wearing Ihram from Dhaka Airport vs. Transit Flight Miqat Guide",

                },

                {

                  pattern: /\b(5-liter sealed Zamzam|Zamzam carton|Ajwa dates|জমজম বক্স|আজওয়া খেজুর)\b/i,

                  path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport",

                  title: "Official Zamzam Water, Dates & Gold Customs Rules",

                },

                {

                  pattern: /\b(Masjid Quba|Mount Uhud|Taif day trip|Hira Cultural District|মসজিদে কুবা|তায়েফ ডে-ট্রিপ)\b/i,

                  path: "/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide",

                  title: "Complete Makkah, Madinah, Badr & Taif Ziyarah Guide",

                },

                {

                  pattern: /\b(Sheikh Zayed Grand Mosque|Qasr Al Watan|শেখ জায়েদ গ্র্যান্ড মসজিদ)\b/i,

                  path: "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide",

                  title: "Abu Dhabi Sheikh Zayed Mosque & Qasr Al Watan Day Trip Guide",

                },

                {

                  pattern: /\b(Putrajaya Pink Mosque|Masjid Putra|Islamic Arts Museum Malaysia|পুত্রজায়া পিঙ্ক মসজিদ)\b/i,

                  path: "/blog/malaysia-islamic-heritage-putrajaya-halal-family-tour-guide",

                  title: "Malaysia Islamic Heritage & Putrajaya Halal Family Guide",

                },

                {

                  pattern: /\b(Skip-the-Line|Louvre Museum|Colosseum|স্কিপ-দ্য-লাইন)\b/i,

                  path: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide",

                  title: "Europe, UK & USA Sightseeing Skip-the-Line & Stopover Umrah Guide",

                },

                {

                  pattern: /\b(Islamic Dual-Currency|Shariah-Compliant|Khidmah Card|Riba-Free|ইসলামিক ডুয়াল-কারেন্সি|শরীয়াহ-সম্মত)\b/i,

                  path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah",

                  title: "Best Shariah-Compliant Islamic Dual-Currency Cards in Bangladesh",

                },

                {

                  pattern: /\b(RFCD Account|Resident Foreign Currency Deposit|\$300 single-transaction|RFCD একাউন্ট|\$300 ক্যাপ)\b/i,

                  path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix",

                  title: "RFCD Account vs. Travel Quota (the $300 online-payment rule)",

                },

                {

                  pattern: /\b(bKash|Nagad|BDT Support Desk|local bank transfer|বিকাশ|নগদে পেমেন্ট)\b/i,

                  path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card",

                  title: "How to Book Flights & Makkah Hotels in BDT via bKash/Bank Transfer",

                },

                {

                  pattern: /\b(Dynamic Currency Conversion|5% DCC|SuperRich|ডাবল কনভার্সন|DCC চার্জ)\b/i,

                  path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide",

                  title: "Cash SAR / USD vs. Dual-Currency Card & Avoiding 5% DCC Fees",

                },

                {

                  pattern: /\b(thaievisa\.go\.th|Thailand e-Visa|Thailand Tourist Visa|থাইল্যান্ড ই-ভিসা)\b/i,

                  path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide",

                  title: "Thailand Official e-Visa Guide from Bangladesh (thaievisa.go.th)",

                },

                {

                  pattern: /\b(Malaysia Digital Arrival Card|MDAC|malaysiavisa\.imi\.gov\.my|মালয়েশিয়া ই-ভিসা)\b/i,

                  path: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration",

                  title: "Malaysia Online e-Visa & Free MDAC Arrival Card Guide",

                },

                {

                  pattern: /\b(Form V39A|Letter of Introduction|Authorized Visa Agent|সিঙ্গাপুর ভিসা)\b/i,

                  path: "/blog/singapore-visa-guide-bangladesh-agents",

                  title: "Singapore Tourist Visa Guide from Bangladesh (LOI Form V39A)",

                },

                {

                  pattern: /\b(Travel History Ladder|Fresh Passport|blank passport|নতুন পাসপোর্টে|ট্রাভেল হিস্ট্রি)\b/i,

                  path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia",

                  title: "First International Trip on a Fresh Bangladeshi Passport (3-Step Ladder)",

                },

                {

                  pattern: /\b(SimplyGo|Mustafa Centre|Gardens by the Bay|Sentosa|সিঙ্গাপুর MRT)\b/i,

                  path: "/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide",

                  title: "Singapore 4-Day Budget Itinerary from Dhaka (MRT SimplyGo & Halal Food)",

                },

                {

                  pattern: /\b(Bumrungrad|Bangkok Hospital|Samitivej|Medical Check-Up|বামরুনগ্রাদ|মেডিকেল ভিসা)\b/i,

                  path: "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",

                  title: "Bangkok Medical Check-Up & Hospital Guide from Bangladesh (Bumrungrad & Bangkok Hospital)",

                },

                {

                  pattern: /\b(Airalo|Travel eSIM|Schengen Travel Insurance|ট্রাভেল ই-সিম|ট্রাভেল ইন্স্যুরেন্স)\b/i,

                  path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide",

                  title: "Best Travel eSIM (Airalo) & Overseas Medical Insurance from Bangladesh",

                },

                {

                  pattern: /\b(Sri Lanka ETA|Nine Arch Bridge|Nuwara Eliya|শ্রীলঙ্কা ভ্রমণ|শ্রীলঙ্কা ভিসা)\b/i,

                  path: "/blog/sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost",

                  title: "Sri Lanka 6-Day Budget Tour from Bangladesh (ETA Visa, Kandy & Ella Train)",

                },

                {

                  pattern: /\b(epassport\.gov\.bd|e-Passport Renewal|Super Express Passport|ই-পাসপোর্ট রিনিউ|৬৪ পৃষ্ঠার পাসপোর্ট)\b/i,

                  path: "/blog/bangladesh-epassport-application-renewal-64-districts-fee-guide",

                  title: "Bangladesh e-Passport Application & Urgent Renewal Guide (All 64 Districts)",

                },

                {

                  pattern: /\b(AirHelp|EC 261\/2004|PIR Report|Flight Delay Compensation|ফ্লাইট ডিলে ক্ষতিপূরণ)\b/i,

                  path: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp",

                  title: "Flight Delay, Cancellation & Lost Baggage Compensation Guide for Bangladeshis",

                },

                {

                  pattern: /\b(Biman vs\.? Saudia|46kg Baggage|২x২৩ কেজি|বিমান বনাম সৌদিয়া)\b/i,

                  path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla",

                  title: "Best Airlines Flying from Dhaka Compared (Biman, Saudia, Emirates, Qatar & Baggage Rules)",

                },

                {

                  pattern: /\b(Dhaka Airport emigration|NOC|Government Order|ইমিগ্রেশন)\b/i,

                  path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",

                  title: "Dhaka Airport Outbound Immigration Checklist (NOC & GO Rules)",

                },

                {

                  pattern: /\b(DIY Umrah|10-day DIY Umrah|নিজে নিজে ওমরাহ)\b/i,

                  path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost",

                  title: "DIY Umrah & Hajj Preparation from Bangladesh (10-Day BDT Budget)",

                },

              ];



              const injectContextualInternalLink = (textSegment: string, keyPrefix: string): React.ReactNode => {

                if (usedInternalPaths.size >= 6) return textSegment;

                for (const rule of CONTEXTUAL_INTERNAL_LINK_RULES) {

                  if (rule.path === currentBlogPath || usedInternalPaths.has(rule.path)) continue;

                  const match = rule.pattern.exec(textSegment);

                  if (match && match.index !== undefined) {

                    const matchedWord = match[0];

                    const before = textSegment.slice(0, match.index);

                    const after = textSegment.slice(match.index + matchedWord.length);

                    usedInternalPaths.add(rule.path);

                    return (

                      <React.Fragment key={keyPrefix}>

                        {before}

                        <a

                          href={getLocalizedRouteHref(rule.path)}

                          title={rule.title}

                          onClick={(e) => {

                            e.preventDefault();

                            navigateTo(rule.path);

                          }}

                          className="text-brand-navy font-semibold underline decoration-[#D4941A] decoration-2 underline-offset-3 hover:text-brand-emerald transition-colors cursor-pointer"

                        >

                          {matchedWord}

                        </a>

                        {after}

                      </React.Fragment>

                    );

                  }

                }

                return textSegment;

              };



              const renderFormattedText = (rawText: string) => {

                const parts = rawText.split(/(\*\*[^*]+\*\*)/g);

                return parts.map((part, pIdx) => {

                  if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {

                    const boldInner = part.slice(2, -2);

                    return (

                      <strong key={pIdx} className="font-semibold text-brand-navy">

                        {injectContextualInternalLink(boldInner, `bold-${pIdx}`)}

                      </strong>

                    );

                  }

                  return <React.Fragment key={pIdx}>{injectContextualInternalLink(part, `txt-${pIdx}`)}</React.Fragment>;

                });

              };



              const hasArticleSpecificSources = Boolean(activePost.references?.length);

              const officialGovSources = hasArticleSpecificSources

                ? activePost.references.map((reference) => ({

                    name: isBn ? reference.nameBn : reference.name,

                    url: reference.url,

                  }))

                : activePost.category === "Hajj & Umrah" || activePost.category === "Ziyarah & Stopovers"

                  ? [

                      {

                        name: isBn ? "ধর্ম মন্ত্রণালয় বাংলাদেশ (hajj.gov.bd)" : "BD Ministry of Religious Affairs (hajj.gov.bd)",

                        url: "https://www.hajj.gov.bd",

                      },

                      {

                        name: isBn ? "অফিশিয়াল Nusuk পোর্টাল (nusuk.sa)" : "Official Saudi Nusuk Portal (nusuk.sa)",

                        url: "https://www.nusuk.sa",

                      },

                      {

                        name: isBn ? "সৌদি হজ ও ওমরাহ মন্ত্রণালয় (haj.gov.sa)" : "Saudi Ministry of Hajj & Umrah (haj.gov.sa)",

                        url: "https://www.haj.gov.sa",

                      },

                      {

                        name: isBn ? "সৌদি ই-ভিসা পোর্টাল (ksavisa.sa)" : "Saudi Unified Visa Platform (ksavisa.sa)",

                        url: "https://ksavisa.sa",

                      },

                      {

                        name: isBn ? "হারামাইন বুলেট ট্রেন (sar.hhr.sa)" : "Haramain High-Speed Railway (sar.hhr.sa)",

                        url: "https://sar.hhr.sa",

                      },

                      {

                        name: isBn ? "UAE পোর্টাল (u.ae) ও JAKIM (islam.gov.my)" : "UAE Official Portal (u.ae) & Malaysia JAKIM (islam.gov.my)",

                        url: "https://u.ae",

                      },

                    ]

                  : [

                      {

                        name: isBn ? "বাংলাদেশ ই-পাসপোর্ট পোর্টাল (epassport.gov.bd)" : "BD e-Passport Portal (epassport.gov.bd)",

                        url: "https://www.epassport.gov.bd",

                      },

                      {

                        name: isBn ? "বাংলাদেশ ব্যাংক ট্রাভেল কোটা (bb.org.bd)" : "Bangladesh Bank FX Rules (bb.org.bd)",

                        url: "https://www.bb.org.bd",

                      },

                      {

                        name: isBn ? "জাতীয় রাজস্ব বোর্ড কাস্টমস (nbr.gov.bd)" : "Bangladesh Customs NBR (nbr.gov.bd)",

                        url: "https://nbr.gov.bd",

                      },

                      {

                        name: isBn ? "থাইল্যান্ড ই-ভিসা (thaievisa.go.th)" : "Official Thai e-Visa (thaievisa.go.th)",

                        url: "https://www.thaievisa.go.th",

                      },

                      {

                        name: isBn ? "মালয়েশিয়া ই-ভিসা ও MDAC (imi.gov.my)" : "Malaysia Immigration & MDAC (imi.gov.my)",

                        url: "https://malaysiavisa.imi.gov.my",

                      },

                      {

                        name: isBn ? "সিঙ্গাপুর ICA (ica.gov.sg)" : "Singapore ICA Portal (ica.gov.sg)",

                        url: "https://www.ica.gov.sg",

                      },

                    ];



              return (

                <>

                  {/* Keep the breadcrumb trail and the blog-index link in one compact row. */}
                  <nav
                    data-blog-breadcrumb
                    aria-label={isBn ? "ব্রেডক্রাম্ব" : "Breadcrumb"}
                    className="-mt-10 sm:-mt-12 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-slate-200 py-3"
                  >
                    <ol className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 text-xs text-slate-600">
                      <li>
                        <a
                          data-blog-breadcrumb-item
                          href={getLocalizedRouteHref("/")}
                          onClick={(e) => { e.preventDefault(); navigateTo("/"); }}
                          className="whitespace-nowrap hover:text-brand-navy transition-colors"
                        >
                          {isBn ? "হোম" : "Home"}
                        </a>
                      </li>
                      <li aria-hidden="true" className="text-slate-300 select-none">/</li>
                      <li>
                        <a
                          data-blog-breadcrumb-item
                          href={getLocalizedRouteHref("/blog")}
                          onClick={(e) => { e.preventDefault(); navigateTo("/blog"); }}
                          className="whitespace-nowrap hover:text-brand-navy transition-colors"
                        >
                          {isBn ? "ট্রাভেল গাইড" : "Travel Guides"}
                        </a>
                      </li>
                      <li aria-hidden="true" className="text-slate-300 select-none">/</li>
                      <li className="min-w-0 max-w-[5.5rem] sm:max-w-[24rem]">
                        <span
                          data-blog-breadcrumb-item
                          aria-current="page"
                          title={activePost.title}
                          className="block truncate whitespace-nowrap text-slate-700"
                        >
                          {activePost.title}
                        </span>
                      </li>
                    </ol>
                    <a
                      href={getLocalizedRouteHref("/blog")}
                      onClick={(e) => { e.preventDefault(); navigateTo("/blog"); }}
                      className="inline-flex shrink-0 items-center whitespace-nowrap text-xs font-semibold text-brand-navy hover:text-slate-900 transition-colors"
                    >
                      {isBn
                        ? "সব গাইড →"
                        : "All guides →"}
                    </a>
                  </nav>

                  {/* Main Article 2-Column Layout (Content + Sticky Trip Planner Sidebar) */}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Full Article Content (8 Cols) with Dark H1 / H2 / H3 Hierarchy */}

                    <article className="lg:col-span-8 space-y-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">

                      {/* Primary Semantic H1 in Dark Color (#0B1426) & Large Pixel Scale (30px–38px) */}

                      <header className="space-y-5 border-b border-slate-200 pb-6">

                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="font-bold text-brand-navy">{activePost.category}</span>

                            <span aria-hidden="true">·</span>

                            <time dateTime={publishedDateIso}>{activePost.date}</time>

                            <span aria-hidden="true">·</span>

                            <span>{activePost.readTime}</span>

                            <span aria-hidden="true">·</span>

                            <span>{isBn ? `লেখক: ${activePost.author}` : `By ${activePost.author}`}</span>

                          </div>

                          <span className="font-mono text-emerald-800 font-semibold inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-[11px]">

                            <CalendarDays size={12} className="text-emerald-600 shrink-0" />

                            <time dateTime={updatedAt ? toIsoDate(updatedAt) : publishedDateIso}>

                              {dateStatusLabel}

                            </time>

                          </span>

                        </div>



                        <h1 className="ural-page-title font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-black text-brand-navy leading-[1.18] tracking-tight text-balance">

                          {activePost.title}

                        </h1>



                        {/* Dedicated Unique Article Feature Photograph */}

                        <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">

                          <ResponsiveImage

                            src={activeCoverImg}

                            sizes="(max-width: 767px) 100vw, 840px"

                            alt={generateBlogCoverAltText({

                              title: activePost.title,

                              category: activePost.category,

                              slug: activePost.slug,

                              lang: isBn ? "bn" : "en",

                            })}

                            loading="eager"

                            fetchPriority="high"

                            decoding="async"

                            className="w-full aspect-[16/9] object-cover object-center"

                          />

                        </figure>



                        {/* Quick Answer & Key Takeaway Box (AEO-Structured Direct Answer) */}

                        <QuickAnswer
                          label={
                            isBn
                              ? "একনজরে মূল উত্তর ও সারসংক্ষেপ"
                              : "Quick Answer & Key Takeaway"
                          }
                          bodyClassName="text-base leading-[1.75] text-slate-800"
                        >
                          {activePost.summary}
                        </QuickAnswer>



                      </header>



                      {/* Full Long-Form Verified Guide Content with Dark H2 (24px–26px), Dark H3 (19px–21px) & 16px Body */}

                      <div className="mx-auto w-full max-w-[68ch] text-slate-800 leading-[1.8] space-y-6 text-[16px] sm:text-[17px] font-sans">

                        {!articleBody && (

                          // The body module is a separate chunk. On a cold article load it is

                          // already being fetched (prerender injects a modulepreload for blog

                          // routes), so this placeholder is normally invisible; it exists so a

                          // slow connection never renders an empty article.

                          <div className="space-y-4" aria-hidden="true" data-blog-body-placeholder>

                            {[0, 1, 2, 3, 4].map((i) => (

                              <div

                                key={i}

                                className={`h-4 rounded bg-slate-200 ${i % 3 === 2 ? "w-2/3" : "w-full"}`}

                              />

                            ))}

                            <span className="sr-only">

                              {isBn ? "গাইড লোড হচ্ছে…" : "Loading the guide…"}

                            </span>

                          </div>

                        )}

                        {articleBody && articleBlocks.map((block, bIdx) => {

                          const trimmed = block.trim();

                          if (!trimmed) return null;

                          if (
                            trimmed === UMRAH_BUDGET_TABLE_MARKER &&
                            activePost.slug === UMRAH_GUIDE_SLUG
                          ) {
                            return <UmrahBudgetTable key={bIdx} isBengali={isBn} />;
                          }



                          // In-article editorial figure (opt-in via post.inlineFigure)

                          if (trimmed === "[[figure]]") {

                            const fig = activePost.inlineFigure;

                            if (!fig) return null;

                            return (

                              <figure key={bIdx} className="my-6">

                                <ResponsiveImage

                                  src={fig.imageSrc}

                                  alt={isBn ? fig.altBn : fig.altEn}

                                  sizes="(max-width: 767px) 100vw, 840px"

                                  className="w-full h-auto rounded-2xl"

                                  loading="lazy"

                                />

                                <figcaption className="mt-2 text-xs text-slate-500 leading-relaxed">

                                  {isBn ? fig.captionBn : fig.captionEn}

                                </figcaption>

                              </figure>

                            );

                          }



                          const faqSection = getVisibleBlogFaqSection(

                            activePost.slug,

                            trimmed,

                            isBn ? "bn" : "en"

                          );

                          if (faqSection) {

                            return (

                              <section

                                key={bIdx}

                                aria-labelledby="blog-article-faq-heading"

                                className="space-y-4 pt-5"

                              >

                                <h2

                                  id="blog-article-faq-heading"

                                  className="ural-section-title font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy leading-[1.3] pb-2 border-b border-slate-200"

                                >

                                  {faqSection.heading}

                                </h2>

                                <div className="space-y-4">

                                  {faqSection.questions.map((faq, faqIdx) => (

                                    <div key={faqIdx} className="space-y-1.5">

                                      <h3 className="ural-card-title font-serif font-semibold text-brand-navy leading-[1.5]">

                                        {faq.question}

                                      </h3>

                                      <p className="leading-[1.8] text-slate-800">

                                        {faq.answer}

                                      </p>

                                    </div>

                                  ))}

                                </div>

                              </section>

                            );

                          }



                          // In-article callout box — matches any callout whose blockIdx lands on this paragraph

                          {

                            const callout = activePost.callouts?.find((c) => c.blockIdx === bIdx);

                            if (callout) {

                              const styles = {

                                "pro-tip": { wrapper: "bg-emerald-50 border border-emerald-300", Icon: Lightbulb, label: isBn ? "প্রো টিপ" : "Pro Tip", labelCls: "text-emerald-800", bodyCls: "text-emerald-900" },

                                "key-fact": { wrapper: "bg-sky-50 border border-sky-300", Icon: KeyRound, label: isBn ? "মূল তথ্য" : "Key Fact",  labelCls: "text-sky-800",    bodyCls: "text-sky-900" },

                                warning:     { wrapper: "bg-amber-50 border border-amber-300", Icon: TriangleAlert, label: isBn ? "সতর্কতা" : "Heads Up",   labelCls: "text-amber-800",  bodyCls: "text-amber-900" },

                                insider:    { wrapper: "bg-violet-50 border border-violet-300", Icon: Telescope, label: isBn ? "ইনসাইডার তথ্য" : "Insider Insight", labelCls: "text-violet-800", bodyCls: "text-violet-900" },

                              }[callout.type];

                              return (

                                <div

                                  key={`callout-${bIdx}`}

                                  role="note"

                                  className={`my-6 rounded-2xl ${styles.wrapper} p-5`}

                                >

                                  <div className={`flex items-center gap-2 mb-2 text-sm font-bold ${styles.labelCls}`}>

                                    <styles.Icon size={14} aria-hidden="true" className="shrink-0" />

                                    <span>{styles.label}</span>

                                  </div>

                                  <p className={`text-base leading-[1.75] ${styles.bodyCls}`}>{callout.text}</p>

                                  {callout.note && (

                                    <p className={`mt-2 text-sm leading-relaxed opacity-70 ${styles.bodyCls}`}>

                                      {callout.note}

                                    </p>

                                  )}

                                </div>

                              );

                            }

                          }



                          // Major numbered section heading -> Semantic H2 (Dark #0B1426, 22px–26px)

                          if (/^([0-9]+|[০-৯]+)\.\s+/.test(trimmed) && trimmed.length < 170 && !trimmed.includes("\n")) {

                            return (

                              <h2

                                key={bIdx}

                                className="ural-section-title font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy leading-[1.3] pt-5 pb-2 border-b border-slate-200"

                              >

                                {trimmed.replace(/\*\*/g, "")}

                              </h2>

                            );

                          }



                          // Sub-heading -> Semantic H3 (Dark #0B1426, 18px–21px)

                          if (

                            (/^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(trimmed) ||

                              (trimmed.endsWith(":") && trimmed.length < 120)) &&

                            !trimmed.includes("\n")

                          ) {

                            return (

                              <h3

                                key={bIdx}

                                className="ural-card-title font-serif text-[18px] sm:text-[21px] font-bold text-brand-navy leading-[1.35] pt-3"

                              >

                                {trimmed.replace(/\*\*/g, "")}

                              </h3>

                            );

                          }



                          // Multi-line block where the first line is a numbered H2 heading followed by body/bullets/H3s

                          const lines = trimmed.split("\n");

                          const firstLine = lines[0].trim();

                          const isFirstLineH2 =

                            /^([0-9]+|[০-৯]+)\.\s+/.test(firstLine) && firstLine.length < 170;

                          const isFirstLineH3 =

                            !isFirstLineH2 &&

                            lines.length > 1 &&

                            firstLine.length < 125 &&

                            (firstLine.endsWith(":") ||

                              /^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(firstLine));



                          const remainingLines =

                            isFirstLineH2 || isFirstLineH3 ? lines.slice(1) : lines;



                          return (

                            <React.Fragment key={bIdx}>

                              <div className="space-y-3.5">

                                {isFirstLineH2 && (

                                <h2 className="ural-section-title font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy leading-[1.3] pt-5 pb-2 border-b border-slate-200">

                                  {firstLine.replace(/\*\*/g, "")}

                                </h2>

                              )}

                              {isFirstLineH3 && (

                                <h3 className="ural-card-title font-serif text-[18px] sm:text-[21px] font-bold text-brand-navy leading-[1.35] pt-3">

                                  {firstLine.replace(/\*\*/g, "")}

                                </h3>

                              )}

                              {remainingLines.map((line, lIdx) => {

                                const cleanLine = line.trim();

                                if (!cleanLine) return null;



                                // Check if an inner line is an H3 sub-heading (e.g., Step 1:, Rule 1:, Zone 1:, ধাপ ১:, নিয়ম ১:)

                                if (

                                  !/^(-|•|\*)\s+/.test(cleanLine) &&

                                  cleanLine.length < 125 &&

                                  (cleanLine.endsWith(":") ||

                                    /^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(cleanLine))

                                ) {

                                  return (

                                    <h3

                                      key={lIdx}

                                      className="ural-card-title font-serif text-[18px] sm:text-[21px] font-bold text-brand-navy leading-[1.35] pt-3"

                                    >

                                      {cleanLine.replace(/\*\*/g, "")}

                                    </h3>

                                  );

                                }



                                if (/^(-|•|\*)\s+/.test(cleanLine)) {

                                  const bulletText = cleanLine.replace(/^(-|•|\*)\s+/, "");

                                  return (

                                    <div

                                      key={lIdx}

                                      className="flex items-start gap-3 pl-2 text-slate-800"

                                    >

                                      <span className="text-brand-navy font-bold mt-1 shrink-0">•</span>

                                      <span className="leading-[1.8]">

                                        {renderFormattedText(bulletText)}

                                      </span>

                                    </div>

                                  );

                                }

                                return (

                                  <p key={lIdx} className="leading-[1.8] text-slate-800">

                                    {renderFormattedText(cleanLine)}

                                  </p>

                                );

                              })}

                              </div>



                              {/* Mid-Article Contextual Internal Link + Native Content-Analyzed Travelpayouts & BDT Hotel Conversion Card (Zero-CLS Native Replacement for Travelpayouts Drive) */}

                              {bIdx === contextualLinkInsertionIndex && activePost.internalLinks[0] && (

                                <div className="my-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5">

                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">

                                    <div className="space-y-0.5">

                                      <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">

                                        {isBn ? "সংশ্লিষ্ট পরবর্তী ধাপ (Recommended Next Guide)" : "Recommended Next Step in This Topic"}

                                      </span>

                                      <a

                                        href={getLocalizedRouteHref(activePost.internalLinks[0].path)}

                                        onClick={(e) => { e.preventDefault(); navigateTo(activePost.internalLinks[0].path); }}

                                        className="text-left font-serif font-bold text-[16px] text-brand-navy hover:text-brand-emerald underline decoration-[#D4941A] decoration-2 underline-offset-3"

                                      >

                                        {activePost.internalLinks[0].text} →

                                      </a>

                                    </div>

                                    <a

                                      href="/umrah"

                                      onClick={(e) => { e.preventDefault(); navigateTo("/umrah"); }}

                                      className="self-start sm:self-center text-xs font-semibold text-brand-navy bg-white border border-slate-200 hover:border-brand-navy px-3 py-1.5 rounded-lg shrink-0"

                                    >

                                      {isBn ? "Umrah BDT ক্যালকুলেটর" : "Open Umrah BDT Calculator"}

                                    </a>

                                  </div>



                                  <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">

                                    <div className="text-xs text-slate-700 max-w-xl">

                                      {isBn

                                        ? "নিজে ডুয়াল-কারেন্সি কার্ডে অনলাইনে ফ্লাইট, পিকআপ ও ট্যুর পাস বুক করুন—অথবা কার্ড না থাকলে সরাসরি আমাদের ঢাকা ডেস্ক থেকে BDT-তে হোটেল ভাউচার ও টিকিট নিন:"

                                        : "Book flights, airport transfers, or attraction passes online with your card—or book Makkah, Madinah, Dubai & KL hotels directly in BDT via our Dhaka Desk:"}

                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">

                                      <PartnerLinkButton

                                        href={

                                          activePost.affiliateCTA

                                            ? AFFILIATE_LINKS[activePost.affiliateCTA.provider]

                                            : AFFILIATE_LINKS.aviasales

                                        }

                                        label={

                                          activePost.affiliateCTA?.provider === "tiqets"

                                            ? isBn

                                              ? "Skip-the-Line টিকিট দেখুন"

                                              : "Check Skip-the-Line Passes"

                                            : activePost.affiliateCTA?.provider === "klook" ||

                                              activePost.affiliateCTA?.provider === "kkday"

                                            ? isBn

                                              ? "ট্যুর ও ডে-পাস ভাড়া দেখুন"

                                              : "Compare Tour & Attraction Passes"

                                            : activePost.affiliateCTA?.provider === "kiwitaxi" ||

                                              activePost.affiliateCTA?.provider === "welcomePickups"

                                            ? isBn

                                              ? "প্রাইভেট কার ও পিকআপ ভাড়া দেখুন"

                                              : "Check Private Car & Pickup Rates"

                                            : activePost.affiliateCTA?.provider === "airalo"

                                            ? isBn

                                              ? "Saudi / ট্রাভেল eSIM দেখুন"

                                              : "Check Travel eSIM Plans"

                                            : isBn

                                            ? "লাইভ বিমান ভাড়া তুলনা করুন"

                                            : "Compare Live Flight Fares"

                                        }

                                        variant="dark"

                                      />

                                      <a

                                        href={`https://wa.me/8801784385335?text=${encodeURIComponent(

                                          `Assalamu Alaikum URAL Desk, I was reading "${activePost.title}" and want to check BDT hotel & flight package rates.`

                                        )}`}

                                        target="_blank"

                                        rel="noopener noreferrer"

                                        className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg transition-colors"

                                      >

                                        <span>{isBn ? "BDT-তে হোটেল ও টিকিট বুকিং (WhatsApp)" : "Book Hotel & Flight in BDT (WhatsApp)"}</span>

                                      </a>

                                    </div>

                                  </div>

                                </div>

                              )}

                            </React.Fragment>

                          );

                        })}

                      </div>



                      {/* Article-specific references where available; otherwise clearly labeled category-level portals. */}

                      <section

                        aria-labelledby="article-reference-links-heading"

                        className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 sm:p-5 space-y-3"

                      >

                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                          <h2

                            id="article-reference-links-heading"

                            className="text-sm font-bold text-brand-navy"

                          >

                            {hasArticleSpecificSources

                              ? isBn

                                ? "এই গাইডের তথ্যসূত্র"

                                : "Sources for this guide"

                              : isBn

                                ? "ভ্রমণের আগে যাচাইয়ের জন্য অফিশিয়াল পোর্টাল"

                                : "Official portals to check before travel"}

                          </h2>

                          {hasArticleSpecificSources && updatedAt && (

                            <time

                              dateTime={toIsoDate(updatedAt)}

                              className="text-[11px] font-mono font-semibold text-emerald-800"

                            >

                              {isBn

                                ? `তথ্যসূত্র দেখা হয়েছে: ${updatedDateLabel}`

                                : `References checked: ${updatedDateLabel}`}

                            </time>

                          )}

                        </div>

                        <p className="text-xs leading-relaxed text-slate-600">

                          {hasArticleSpecificSources
                            ? activePost.slug === UMRAH_GUIDE_SLUG
                              ? isBn
                                ? "নিচে গাইডে উদ্ধৃত সরকারি/operator সূত্রের পাশাপাশি application, booking ও একটি সাধারণ regional portal আছে; প্রতিটি link সব দাবির প্রমাণ নয়। নিয়ম বদলাতে পারে—আবেদন বা বুকিংয়ের আগে live নির্দেশনা মিলিয়ে নিন।"
                                : "The list combines government/operator sources cited in the guide with application and booking portals plus one general regional portal; not every link supports every claim. Requirements can change, so confirm live instructions before applying or booking."
                              : isBn
                                ? "গাইড হালনাগাদের সময় এই তথ্যসূত্রগুলো দেখা হয়েছে। নিয়ম বদলাতে পারে—ভ্রমণ, আবেদন বা বুকিংয়ের আগে সংশ্লিষ্ট কর্তৃপক্ষ ও এয়ারলাইন্সের live নির্দেশনা মিলিয়ে নিন।"
                                : "These sources were reviewed while this guide was updated. Details can change; confirm live requirements with the relevant authority and airline before travel, application or booking."
                            : isBn
                              ? "এগুলো ক্যাটাগরি-ভিত্তিক সাধারণ reference link—সবগুলো এই নির্দিষ্ট লেখার উদ্ধৃত উৎস নয়। সংশ্লিষ্ট কর্তৃপক্ষের সর্বশেষ নিয়ম যাচাই করুন।"
                              : "These are general category-level reference links, not citations for every statement in this article. Confirm current details with the relevant authority."}

                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                          {officialGovSources.map((src, sIdx) => (

                            <a

                              key={sIdx}

                              href={src.url}

                              target="_blank"

                              rel="noopener noreferrer"

                              className="min-w-0 flex items-center justify-between gap-3 rounded-lg border border-emerald-200/80 bg-white/80 px-3.5 py-3 text-xs font-medium text-brand-navy hover:border-brand-emerald hover:bg-white transition-colors"

                            >

                              <span className="min-w-0 break-words">
                                {hasArticleSpecificSources && (
                                  <span className="mr-1 font-semibold text-emerald-800">[
                                    {formatReferenceNumber(sIdx, isBn)}
                                  ]</span>
                                )}
                                {src.name}
                              </span>

                              <ExternalLink size={13} className="shrink-0 text-emerald-700" />

                            </a>

                          ))}

                        </div>

                      </section>



                      {/* Contextual Luggage Storage Offer Callout (Radical Storage on matching travel guides) */}

                      <RadicalStorageContextualCallout slug={activePost.slug} lang={lang} />



                      {/* Contextual Multi-Partner Callout (Yesim eSIM, Kiwi.com Multi-City, GetTransfer Vans & Go City Passes) */}

                      <MultiPartnerBlogCallout slug={activePost.slug} lang={lang} />



                      {/* Travelpayouts creator-referral callout (transparent "For Travel Creators & Bloggers" placement) */}

                      <TravelpayoutsReferralCallout slug={activePost.slug} lang={lang} />



                      {/* Contextual Affiliate Widget */}

                      {activePost.affiliateCTA && (

                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 text-left">

                          <h3 className="ural-card-title font-serif text-xs font-bold text-brand-navy">

                            {sanitizeExpiredPromoText(activePost.affiliateCTA.headline)}

                          </h3>

                          <p className="text-xs text-slate-600">

                            {sanitizeExpiredPromoText(activePost.affiliateCTA.body)}

                          </p>

                          {activePost.affiliateCTA.provider === "klook" ? (

                            <KlookActivitiesWidget />

                          ) : activePost.affiliateCTA.provider === "tiqets" ? (

                            <TiqetsEmbedWidget

                              lang={lang}

                              currency="USD"

                              layout="horizontal"

                              cityName={activePost.title.includes("Paris") ? "Paris" : activePost.title.includes("London") ? "London" : "Rome, Paris & London"}

                              headline={

                                isBn

                                  ? "Tiqets লাইভ মিউজিয়াম ও স্কাইলাইন টিকিট সার্চ"

                                  : "Tiqets Live Skip-the-Line Museum & Attraction Search"

                              }

                              subheadline={

                                isBn

                                  ? "ভ্রমণের তারিখ ও পাস নির্বাচন করে নিশ্চিত কিউআর মোবাইল টিকিট সংগ্রহ করুন।"

                                  : "Select date & attraction to reserve instant mobile QR entry."

                              }

                            />

                          ) : activePost.affiliateCTA.provider === "kiwitaxi" ? (

                            <KiwitaxiTransferWidget />

                          ) : activePost.affiliateCTA.provider === "airalo" ? (

                            <AiraloEsimWidget />

                          ) : activePost.affiliateCTA.provider === "qeeq" ? (

                            <QeeqCarRentalWidget />

                          ) : (

                            <PartnerLinkButton

                              href={AFFILIATE_LINKS[activePost.affiliateCTA.provider]}

                              label={

                                isBn

                                  ? "লাইভ ভাড়া ও অ্যাভেইলেবিলিটি দেখুন"

                                  : "Compare Live Prices & Availability"

                              }

                              variant="dark"

                            />

                          )}

                        </div>

                      )}



                      {/* Author Bio — E-E-A-T signal at end of article content */}

                      <AuthorBioCard authorRaw={canonicalAuthorRaw} isBengali={isBn} />



                      {/* Visible Hajj, Umrah & Ziyarah Preparation FAQs (Matches JSON-LD FAQPage Schema 100%) */}

                      {(activePost.category === "Hajj & Umrah" || activePost.category === "Ziyarah & Stopovers") &&
                        activePost.slug !== UMRAH_GUIDE_SLUG && (

                        <TravelIntelligence

                          pageTitle={

                            isBn

                              ? "বাংলাদেশ থেকে Umrah ও Hajj প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"

                              : "Umrah & Hajj Preparation from Bangladesh — Verified FAQs"

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

                              label: isBn ? "বায়োমেট্রিক ও পারমিট অ্যাপ (ভিসাভেদে প্রযোজ্য)" : "Biometric & permit apps (visa-specific)",

                              value: isBn ? "Nusuk (nusuk.sa) + প্রযোজ্য হলে Saudi Visa Bio" : "Nusuk (nusuk.sa) + Saudi Visa Bio where your visa application requires it",

                            },

                          ]}

                          faqs={localizedHajjFaqs}

                        />

                      )}



                    </article>



                    {/* Right Column: Sticky Trip Planning & BDT Support Sidebar (4 Cols) */}

                    <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">



                      {/* 1. Stay Connected: eSIM + Nusuk + Saudi connectivity */}

                      <div className="bg-brand-navy text-white rounded-2xl p-5 space-y-3.5 shadow-sm">

                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#F6B73C]">

                          {isBn ? "সৌদি আরবে সংযুক্ত থাকুন" : "Stay Connected in Saudi Arabia"}

                        </div>

                        <p className="text-[13px] text-slate-200 leading-relaxed">

                          {activePost.slug === UMRAH_GUIDE_SLUG
                            ? isBn
                              ? "কেনার আগে Saudi eSIM provider-এর coverage, data, validity, device compatibility ও activation নিয়ম যাচাই করুন। Nusuk permit ও booking-এর তথ্য offline কপিও রাখুন।"
                              : "Before buying a Saudi eSIM, check the provider's coverage, data, validity, device compatibility and activation terms. Keep offline copies of Nusuk permits and booking details too."
                            : isBn
                              ? "ঢাকা থেকে উড়ে নামার সাথে সাথেই আপনার Nusuk Rawdah পারমিট QR, Haramain ট্রেন টিকিট এবং Uber/Careem কাজ করবে — সৌদি আরব 4G/5G eSIM আগেই ইনস্টল করে রাখুন।"
                              : "Install a Saudi Arabia 4G/5G eSIM before flying from Dhaka so your Nusuk Rawdah permit QR code, Haramain train ticket, and Uber/Careem work the moment you land at Jeddah Airport."}

                        </p>

                        <div className="space-y-2">

                          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">

                            {isBn ? "Travel eSIM প্ল্যান" : "Travel eSIM Plans"}

                          </div>

                          <div className="flex gap-2">

                            <a

                              href={AFFILIATE_LINKS.airalo}

                              target="_blank"

                              rel="noopener noreferrer sponsored"

                              className="flex-1 bg-white text-brand-navy font-bold text-[12px] py-2.5 px-3 rounded-xl text-center hover:bg-[#F6B73C] hover:text-brand-navy transition-colors"

                            >

                              Airalo

                            </a>

                            <a

                              href={AFFILIATE_LINKS.yesim}

                              target="_blank"

                              rel="noopener noreferrer sponsored"

                              className="flex-1 bg-white text-brand-navy font-bold text-[12px] py-2.5 px-3 rounded-xl text-center hover:bg-[#F6B73C] hover:text-brand-navy transition-colors"

                            >

                              Yesim

                            </a>

                          </div>

                        </div>

                        <p className="text-[11px] text-slate-400 leading-relaxed">

                          {isBn

                            ? "গন্তব্য, ডেটা, মেয়াদ ও ডিভাইস সাপোর্ট প্রভাইডারের সাইটে চেক করুন। OTPs-এর জন্য বাংলাদেশি SIM রাখা কার্ডওয়াইজ, অপারেটর ও রোমিং সেটিংসের উপর নির্ভর করে।"

                            : "Choose destination & plan on the provider's site. Check coverage, data allowance, validity, device compatibility, activation rules, and current price before you buy. Keeping a Bangladesh SIM for OTPs depends on your phone, operator, and roaming settings."}

                        </p>

                      </div>



                      {/* 2. Share This Guide */}

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">

                        <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">

                          {isBn ? "গাইডটি শেয়ার করুন" : "Share This Guide"}

                        </div>

                        <div className="flex gap-2">

                          <a

                            href={`https://wa.me/?text=${encodeURIComponent(`${activePost.title}\n\n${getBlogAeoSnippet50Words(activePost.slug, isBn, activePost.summary)}\n\nRead Full Guide on URAL: https://ural-travel.pages.dev${isBn ? "/bn" : ""}/blog/${activePost.slug}`)}`}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="flex-1 bg-brand-navy hover:bg-slate-800 text-white font-semibold text-[12px] py-2.5 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"

                          >

                            <span>{isBn ? "WhatsApp" : "WhatsApp"}</span>

                          </a>

                          <a

                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://ural-travel.pages.dev${isBn ? "/bn" : ""}/blog/${activePost.slug}`)}`}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="flex-1 bg-white hover:bg-slate-100 text-brand-navy border border-slate-300 font-semibold text-[12px] py-2.5 px-3 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"

                          >

                            <span>{isBn ? "Facebook" : "Facebook"}</span>

                          </a>

                          <button

                            type="button"

                            onClick={() => {

                              const caption = isBn

                                ? `✈️ ${activePost.title}\n\n📌 সংক্ষিপ্ত উত্তর:\n${getBlogAeoSnippet50Words(activePost.slug, true, activePost.summary)}\n\n👉 সম্পূর্ণ গাইড: https://ural-travel.pages.dev/bn/blog/${activePost.slug}\n🌐 Facebook: ${URAL_SOCIAL_LINKS.facebook}\n💬 BDT বুকিং WhatsApp: +8801784385335`

                                : `✈️ ${activePost.title}\n\n📌 Quick Summary:\n${getBlogAeoSnippet50Words(activePost.slug, false, activePost.summary)}\n\n👉 Read Full Guide: https://ural-travel.pages.dev/blog/${activePost.slug}\n🌐 Follow URAL: ${URAL_SOCIAL_LINKS.facebook}\n💬 BDT Booking via WhatsApp: +8801784385335`;

                              navigator.clipboard?.writeText(caption);

                              setAffiliateToast(isBn ? "কপি হয়েছে! এখন পেস্ট করুন।" : "Copied! Paste it anywhere.");

                            }}

                            className="flex-1 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-[12px] py-2.5 px-3 rounded-xl text-center transition-colors cursor-pointer"

                          >

                            {isBn ? "কপি করুন" : "Copy Post"}

                          </button>

                        </div>

                      </div>



                      {/* 3. About the Author (compact sidebar version) */}

                      {(() => {

                        const profile = getAuthorProfile(canonicalAuthorRaw);

                        if (!profile) return null;

                        return (

                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">

                            <div className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">

                              {isBn ? "লেখক সম্পর্কে" : "About the Author"}

                            </div>

                            <div className="flex items-start gap-3">

                              <div className="w-9 h-9 rounded-full bg-brand-navy flex items-center justify-center shrink-0">

                                <span className="text-white text-sm font-bold">{profile.name.split(" ").map((n) => n[0]).join("")}</span>

                              </div>

                              <div className="space-y-1 min-w-0">

                                <div className="text-[13px] font-bold text-brand-navy">{profile.name}</div>

                                <div className="text-[11px] text-slate-600 font-medium">Founder & Travel Editor, URAL</div>

                              </div>

                            </div>

                            <p className="text-[12px] text-slate-700 leading-relaxed line-clamp-4">

                              {isBn ? profile.bioBn : profile.bioEn}

                            </p>

                            {profile.portfolioUrl && (

                              <a

                                href={profile.portfolioUrl}

                                target="_blank"

                                rel="noopener noreferrer"

                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-navy underline decoration-brand-gold underline-offset-2 hover:text-brand-emerald"

                              >

                                {isBn ? "পেশাগত পোর্টফোলিও দেখুন" : "View Portfolio"}

                                <ExternalLink size={10} aria-hidden="true" />

                              </a>

                            )}

                          </div>

                        );

                      })()}



                      {/* 4. Quick Booking Links (3 essentials) */}

                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">

                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">

                          {isBn ? "দ্রুত অনলাইন বুকিং" : "Quick Booking Links"}

                        </div>

                        <PartnerLinkButton href={AFFILIATE_LINKS.aviasales} label={isBn ? "Flight ভাড়া তুলনা করুন" : "Compare Flights from Dhaka"} variant="dark" />

                        <PartnerLinkButton href={AFFILIATE_LINKS.klook} label={isBn ? "Tours ও টিকিট বুক করুন" : "Book Tours & Attractions"} variant="dark" />

                        <PartnerLinkButton href={AFFILIATE_LINKS.airalo} label={isBn ? "Saudi / Travel eSIM নিন" : "Get Travel eSIM"} variant="dark" />

                      </div>



                      {/* 5. Related Calculators & Next Steps */}

                      {activePost.internalLinks.length > 0 && (

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">

                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600">

                            {isBn ? "সংশ্লিষ্ট ক্যালকুলেটর ও পরবর্তী ধাপ" : "Related Calculators & Next Steps"}

                          </div>

                          <div className="space-y-2">

                            {activePost.internalLinks.map((lnk, idx) => (

                              <a

                                key={idx}

                                href={getLocalizedRouteHref(lnk.path)}

                                onClick={(e) => { e.preventDefault(); navigateTo(lnk.path); }}

                                className="flex items-center justify-between bg-slate-50 hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 hover:border-brand-navy px-3.5 py-2.5 rounded-xl transition-all text-[12px] font-medium group"

                              >

                                <span className="flex items-center gap-2">

                                  <Link2 size={13} className="text-brand-emerald group-hover:text-[#F6B73C] shrink-0" />

                                  <span className="line-clamp-1">{lnk.text}</span>

                                </span>

                                <ArrowRight size={12} className="shrink-0 opacity-60 group-hover:opacity-100" />

                              </a>

                            ))}

                          </div>

                        </div>

                      )}



                      {/* 6. WhatsApp BDT Desk */}

                      <div className="bg-brand-navy text-white rounded-2xl p-5 space-y-3 shadow-sm">

                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#F6B73C]">

                          {isBn ? "কার্ড ছাড়া BDT-তে বুক করুন" : "No Card? Pay in BDT via WhatsApp"}

                        </div>

                        <p className="text-[12px] text-slate-300 leading-relaxed">

                          {isBn

                            ? "ঢাকা সাপোর্ট ডেস্কে bKash, Nagad অথবা ব্যাংক ট্রান্সফার করে Flight, মক্কা/মদিনা হোটেল এবং এয়ারপোর্ট পিকআপ বুক করুন।"

                            : "Our Dhaka desk issues flights, Makkah/Madinah hotel vouchers, and airport transfers using bKash, Nagad, or bank transfer."}

                        </p>

                        <a

                          href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20was%20reading%20your%20travel%20guide%20and%20need%20help%20planning%20my%20trip!"

                          target="_blank"

                          rel="noopener noreferrer"

                          className="w-full bg-brand-emerald hover:bg-emerald-600 text-white font-bold text-[12px] py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"

                        >

                          <span>{isBn ? "WhatsApp-এ মেসেজ দিন" : "Chat on WhatsApp (+8801784385335)"}</span>

                        </a>

                      </div>



                    </aside>

                  </div>



                  {/* Bottom Section: 3 More Blog Cards in One Row (Unique Thumbnail + Dark H3 + 50-Word AEO Snippet + 'Read Full Blog' Button) */}

                  <div className="pt-10 border-t border-slate-200 space-y-6">

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">

                      <div className="space-y-1">

                        <div className="text-xs font-semibold text-brand-navy">

                          {isBn ? "আরও পড়ুন" : "Continue Reading"}

                        </div>

                        <h2 className="ural-section-title font-serif text-2xl font-bold text-brand-navy">

                          {isBn

                            ? "বাংলাদেশি ভ্রমণকারীদের জন্য আরও প্রয়োজনীয় গাইড"

                            : "More Travel Guides for Bangladeshi Flyers"}

                        </h2>

                      </div>

                      <a

                        href="/blog"

                        onClick={(e) => { e.preventDefault(); navigateTo("/blog"); }}

                        className="self-start sm:self-end bg-brand-navy text-white text-xs font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5"

                      >

                        <span>

                          {isBn

                            ? "সবগুলো ব্লগ দেখুন"

                            : "View All Blogs"}

                        </span>

                        <ArrowRight size={13} className="text-[#F6B73C]" />

                      </a>

                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                      {relatedPosts.map((post) => {

                        const relatedSnippet = getBlogAeoSnippet50Words(post.slug, isBn, post.summary);



                        return (

                          <article

                            key={post.id}

                            className="bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs transition-all"

                          >

                            <a

                              href={`/blog/${post.slug}`}

                              onClick={(e) => { e.preventDefault(); navigateTo(`/blog/${post.slug}`); }}

                              className="group flex h-full flex-col justify-between"

                            >

                            <div>

                              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">

                                {/* 1 column below md (768), 3 columns above it — no 50vw band exists here */}

                                <ResponsiveImage

                                  src={getBlogCoverImage(post.slug)}

                                  sizes="(max-width: 767px) 100vw, 33vw"

                                  alt={generateBlogCoverAltText({

                                    title: post.title,

                                    category: post.category,

                                    slug: post.slug,

                                    lang: isBn ? "bn" : "en",

                                  })}

                                  loading="lazy"

                                  fetchPriority="low"

                                  decoding="async"

                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"

                                />

                              </div>

                              <div className="p-5 space-y-2.5">

                                <div className="text-xs text-slate-500">

                                  {post.category} · {post.readTime}

                                </div>

                                <h3 className="ural-card-title font-serif font-bold text-[18px] text-brand-navy group-hover:text-brand-emerald leading-snug">

                                  {post.title}

                                </h3>

                                <p className="text-[13.5px] text-slate-700 leading-[1.65]">

                                  {relatedSnippet}

                                </p>

                              </div>

                            </div>

                            <div className="px-5 pb-5 pt-2">

                              <span className="w-full bg-brand-navy group-hover:bg-[#F6B73C] text-white group-hover:text-brand-navy font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-between">

                                <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন · Read Full Blog" : "Read Full Blog"}</span>

                                <ArrowRight size={13} />

                              </span>

                            </div>

                            </a>

                          </article>

                        );

                      })}

                    </div>

                  </div>

                </>

              );

            })()}

          </div>

        );

}
