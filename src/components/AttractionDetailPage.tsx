import React from "react";
import {
  ExternalLink,
  ArrowRight,
  Clock,
  Ticket,
  ShieldCheck,
  Users,
  MapPin,
  Languages,
  Globe,
} from "lucide-react";
import {
  TIQETS_CITY_STACKS,
  TIQETS_TOP_ATTRACTIONS,
  TIQETS_PARTNER_LINK,
  type TiqetsAttractionItem,
} from "../data/tiqetsAttractionsData";
import { AFFILIATE_LINKS, AFFILIATE_OFFER_REGISTRY } from "./AffiliatePartners";
import { generateFaqSchema } from "../utils/faqSchema";
import { breadcrumbSchema } from "../utils/schema";
import { siteUrl } from "../utils/localeRoutes";
import { Language as LangType } from "../translations";

interface AttractionDetailPageProps {
  lang: LangType;
  parameterId: string; // "cityId:attractionId" e.g. "london:992434"
  onNavigate: (path: string) => void;
}

/**
 * Attraction detail page — renders a single Tiqets attraction with:
 * - Full entry data (title, price, category, badge, facilities)
 * - Affiliate CTA (Tiqets partner link)
 * - Internal blog link placeholder (general Europe blog — replace with city-specific blogs when written)
 * - FAQPage schema for AEO
 * - BreadcrumbList with hreflang-ready URLs
 */
export const AttractionDetailPage: React.FC<AttractionDetailPageProps> = ({
  lang,
  parameterId,
  onNavigate,
}) => {
  const isBn = lang === "bn";

  // Parse "cityId:attractionId"
  const [cityId, attractionId] = parameterId.split(":");
  const attraction =
    TIQETS_TOP_ATTRACTIONS.find((a) => a.productId === attractionId) ??
    TIQETS_TOP_ATTRACTIONS[0];
  const cityStack = TIQETS_CITY_STACKS.find((c) => c.cityId === cityId);

  const cityName = isBn ? cityStack?.cityNameBn || cityId : cityStack?.cityName || cityId;
  const countryName = cityStack?.country || "";
  const attrName = isBn ? attraction.titleBn : attraction.title;
  const attractionUrl = siteUrl(`/attractions/${parameterId}`, lang);
  const cityUrl = siteUrl(`/attractions/${cityId}`, lang);
  const hubUrl = siteUrl("/attractions", lang);

  // Commission tier badge data
  const commissionTier = attraction.commissionTier || "Fast Add-On (3.5-5%)";
  const tierConfig: Record<string, { label: string; color: string; icon: string }> = {
    "High-Ticket (6-8%)": { label: "High Commission", color: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: "💎" },
    "Core Anchor (5-7%)": { label: "Core Partner", color: "bg-blue-50 text-blue-700 border-blue-100", icon: "⚓" },
    "Fast Add-On (3.5-5%)": { label: "Add-On Partner", color: "bg-amber-50 text-amber-700 border-amber-100", icon: "⚡" },
  };
  const tier = tierConfig[commissionTier] || tierConfig["Fast Add-On (3.5-5%)"];
  const tierBadgeClass = `px-2 py-0.5 rounded-full text-[10px] font-bold ${tier.color}`;

  // Internal blog link placeholder — general Europe sightseeing blog.
  // REPLACE with city-specific blog slugs when you write them (Phase 2 follow-up).
  const blogSlug = "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide";
  const blogUrl = `/blog/${blogSlug}`;

  // FAQ schema for this attraction
  const faqs = [
    {
      question: isBn
        ? `কিভাবে ${attrName}-এর টিকেট বুকিং করব?`
        : `How to book tickets for ${attrName}?`,
      answer: isBn
        ? `আপনি Tiqets-এর মাধ্যমে অনলাইনে টিকেট বুকিং করতে পারেন। কিউআর টিকেট আপনার স্মার্টফোনে পাঠানো হবে, যা প্রস্তರದ গেটে দেখিয়ে সরাসরি প্রবেশ করা যাবে।`
        : `Book online through Tiqets. Your QR ticket is delivered to your smartphone — show it at the attraction gate for instant entry.`,
    },
    {
      question: isBn ? "এই আকর্ষণটি WC-সুবিধা আছে কি?" : "Is this attraction wheelchair accessible?",
      answer: isBn
        ? attraction.wheelchairAccess
          ? "হ্যাঁ, এই আকর্ষণটি WC-সুবিধা সমন্বিত।"
          : "এই আকর্ষণটি WC-সুবিধা সমন্বিত নয়। বুকিং করার আগে ভেন্যুযের সাথে যাচাই করুন।"
        : attraction.wheelchairAccess
          ? "Yes, this attraction is wheelchair accessible."
          : "This attraction is not wheelchair accessible. Please check with the venue before booking.",
    },
    {
      question: isBn ? "পেরিবারের জন্য উপযোগী কি?" : "Is it family-friendly?",
      answer: isBn
        ? attraction.familyFriendly
          ? "হ্যাঁ, এই আকর্ষণটি পেরিবারের জন্য উপযোগী। শিশুদের জন্য বিশেষ অফার থাকতে পারে।"
          : "এই আকর্ষণটি পেরিবারের জন্য উপযোগী নয়। বয়সসীমা लागू থাকতে পারে।"
        : attraction.familyFriendly
          ? "Yes, this attraction is family-friendly. Special offers may be available for children."
          : "This attraction is not family-friendly. Age restrictions may apply.",
    },
  ];

  const faqSchema = generateFaqSchema(faqs, {
    url: attractionUrl,
    name: `${attrName} — Frequently Asked Questions`,
  });

  // Pre-computed class names to avoid multi-line template literals in JSX
  const skipTheLineClass = attraction.skipTheLine
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-slate-50 text-slate-500 border-slate-200";
  const skipTheLineIconClass = attraction.skipTheLine ? "text-emerald-600" : "text-slate-400";
  const audioGuideClass = attraction.audioGuide
    ? "bg-blue-50 text-blue-700 border-blue-100"
    : "bg-slate-50 text-slate-500 border-slate-200";
  const audioGuideIconClass = attraction.audioGuide ? "text-blue-600" : "text-slate-400";
  const wheelchairClass = attraction.wheelchairAccess
    ? "bg-purple-50 text-purple-700 border-purple-100"
    : "bg-slate-50 text-slate-500 border-slate-200";
  const wheelchairIconClass = attraction.wheelchairAccess ? "text-purple-600" : "text-slate-400";
  const familyClass = attraction.familyFriendly
    ? "bg-rose-50 text-rose-700 border-rose-100"
    : "bg-slate-50 text-slate-500 border-slate-200";
  const familyIconClass = attraction.familyFriendly ? "text-rose-600" : "text-slate-400";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* JSON-LD Schema */}
      <>
        {typeof window !== "undefined" && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  breadcrumbSchema(attractionUrl, [
                    { name: isBn ? "হোম" : "Home", url: siteUrl("/", lang) },
                    { name: isBn ? "ইউরোপীয় আকর্ষণ" : "European Attractions", url: hubUrl },
                    { name: cityName, url: cityUrl },
                    { name: attrName, url: attractionUrl },
                  ])
                ),
              }}
            />
          </>
        )}
      </>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-[#1A365D] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-white/10 overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-[#F6B73C]/20 border border-[#F6B73C]/40 text-[#F6B73C] text-xs font-mono font-bold px-3.5 py-1.5 rounded-full">
              <Ticket size={13} />
              <span>{isBn ? "অফিসিয়াল টিকেট পাস" : "OFFICIAL TICKET & PASS"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span>💳 USD / EUR / GBP & BDT Support</span>
              <span>•</span>
              <span>📱 Instant Mobile QR Entry</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{cityStack?.flag || "🌍"}</span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                {isBn ? cityStack?.VisaCategoryForBdBn || "ভিসা প্রয়োজন" : cityStack?.VisaCategoryForBd || "Visa required"}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${tier.color}`}>
                {tier.icon} {tier.label}
              </span>
            </div>
            <h1 className="ural-page-title font-serif text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {attrName}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isBn
                ? `${cityName}, ${countryName}-এর এই আকর্ষণটি বুকে Tiqets পাসের মাধ্যমে স্কিপ-দ্য-লাইন টিকেট পান।`
                : `Skip the line at ${attrName} in ${cityName}, ${countryName} with official Tiqets passes. Book instantly from Dhaka, Bangladesh.`}
            </p>
          </div>
        </div>
      </div>

      {/* Attraction Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Attraction Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Facts */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-black text-slate-900">
              {isBn ? "অতিরিক্ত বিবরণ" : "Key Facts"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Clock size={16} className="text-brand-navy" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">{isBn ? "দর" : "Price"}</span>
                  <span className="text-lg font-bold text-slate-900">
                    ${attraction.priceUsd} USD
                    <span className="text-xs font-normal text-slate-500 ml-1">(~৳{attraction.priceBdt.toLocaleString()} BDT)</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <MapPin size={16} className="text-brand-navy" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">{isBn ? "শহর" : "City"}</span>
                  <span className="text-lg font-bold text-slate-900">{cityName}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Languages size={16} className="text-brand-navy" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">{isBn ? "ক্যাটাগরি" : "Category"}</span>
                  <span className="text-lg font-bold text-slate-900 capitalize">{attraction.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Globe size={16} className="text-brand-navy" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">{isBn ? "দেশ" : "Country"}</span>
                  <span className="text-lg font-bold text-slate-900">{countryName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities & Badges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-black text-slate-900">
              {isBn ? "সুবিধা ও বিশেষ বৈশিষ্ট্য" : "Facilities & Features"}
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${skipTheLineClass}`}>
                <ShieldCheck size={14} className={skipTheLineIconClass} />
                {isBn ? (attraction.skipTheLine ? "স্ক립-দ্য-লাইন" : "স্ট্যান্ডার্ড এন্ট্রি") : (attraction.skipTheLine ? "Skip-the-Line" : "Standard Entry")}
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${audioGuideClass}`}>
                <Clock size={14} className={audioGuideIconClass} />
                {isBn ? (attraction.audioGuide ? "অডিও গাইড উপলব্ধ" : "অডিও গাইড নেই") : (attraction.audioGuide ? "Audio Guide Available" : "No Audio Guide")}
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${wheelchairClass}`}>
                <Users size={14} className={wheelchairIconClass} />
                {isBn ? (attraction.wheelchairAccess ? "WC অ্যাক্সেসযোগ্য" : "WC অ্যাক্সেসযোগ্য নয়") : (attraction.wheelchairAccess ? "Wheelchair Accessible" : "Not Wheelchair Accessible")}
              </span>
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${familyClass}`}>
                <Users size={14} className={familyIconClass} />
                {isBn ? (attraction.familyFriendly ? "পেরিবার-উপযোগী" : "পেরিবার-উপযোগী নয়") : (attraction.familyFriendly ? "Family-Friendly" : "Not Family-Friendly")}
              </span>
              {attraction.soldOutRescue && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 border-orange-100 text-xs font-bold border">
                  <Ticket size={14} className="text-orange-600" />
                  {isBn ? "সোল্ড-আউট রেসকিউ স্লট" : "Sold-Out Rescue Slot"}
                </span>
              )}
              {attraction.rooftopAccess && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border-indigo-100 text-xs font-bold border">
                  <MapPin size={14} className="text-indigo-600" />
                  {isBn ? "রুফটপ অ্যাক্সেস" : "Rooftop Access"}
                </span>
              )}
            </div>
          </div>

          {/* Affiliate CTA Section — Multi-partner placement matrix */}
          <div className="bg-gradient-to-br from-brand-gold/10 to-white border border-brand-gold/20 rounded-2xl p-6 shadow-sm space-y-5">
            {/* Tier badge */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/50 rounded-xl border border-white/30">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                {isBn ? "অ্যাফিলিয়েট পার্টনার tier" : "Affiliate Partner Tier"}
              </span>
              <span className={tierBadgeClass}>
                {tier.icon} {commissionTier}
              </span>
            </div>

            <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-black text-brand-navy mb-2">
              {isBn ? "এখনই টিকেট বুক করুন" : "Book Your Tickets Now"}
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              {isBn
                ? "টিকিটের জন্য সরাসরি Tiqets-এ যান। আপনার স্মার্টফোনে তাৎক্ষণিক কিউআর টিকেট পাবেন।"
                : "Head to Tiqets for official tickets. Get instant QR delivery to your smartphone."}
            </p>

            {/* Primary CTA: Tiqets */}
            <a
              href={`https://tiqets.tpo.li/KSc4uyIB?product=${attractionId}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-emerald transition-all shadow-lg hover:shadow-xl border border-brand-gold/30"
            >
              <ArrowRight size={18} />
              <span>{isBn ? "Tiqets-এ টিকেট দেখুন →" : "View Tickets on Tiqets →"}</span>
            </a>

            {/* Secondary partner CTAs row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`${AFFILIATE_LINKS.klook}?attraction=${attractionId}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md text-sm"
              >
                <Ticket size={14} className="text-slate-500" />
                <span>{isBn ? "Klook ট্যুর" : "Klook Tours"}</span>
              </a>
              <a
                href={`${AFFILIATE_LINKS.airalo}?city=${cityId}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md text-sm"
              >
                <Globe size={14} className="text-slate-500" />
                <span>{isBn ? "Airalo eSIM" : "Airalo eSIM"}</span>
              </a>
              <a
                href={`${AFFILIATE_LINKS.goCity}?city=${cityId}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md text-sm"
              >
                <MapPin size={14} className="text-slate-500" />
                <span>{isBn ? "Go City পাস" : "Go City Pass"}</span>
              </a>
              <a
                href={`${AFFILIATE_LINKS.radicalStorage}?city=${cityId}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md text-sm"
              >
                <Users size={14} className="text-slate-500" />
                <span>{isBn ? "লাগেজ স্টোরেজ" : "Luggage Storage"}</span>
              </a>
            </div>

            {/* Affiliate disclosure */}
            <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed px-3">
              <strong className="text-slate-600 font-semibold">
                {isBn ? "অ্যাফিলিয়েট ডিসক্লোজার:" : "Affiliate disclosure:"}
              </strong>{" "}
              {isBn
                ? "এই পৃষ্ঠার কিছু আউটবাউন্ড লিংক অ্যাফিলিয়েট লিংক। আপনি এই লিংক দিয়ে বুকিং করলে URAL কোনো অতিরিক্ত খরচ ছাড়াই কমিশন পায় — যা সমস্ত গাইড ফ্রি রাখতে সাহায্য করে।"
                : "Some outbound links are affiliate links. When you book through them, URAL may earn a commission at no extra cost to you — which keeps every guide free."}
            </p>
          </div>

          {/* Internal Blog Link Placeholder */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-black text-slate-900">
              {isBn ? "সংক্রান্ত ভ্রমণ গাইড" : "Related Travel Guide"}
            </h2>
            <p className="text-slate-600 text-sm">
              {isBn ? `এই গন্তব্যে সফর পরিকল্পনার জন্য আমাদের ইউরোপ ও স্ক립-দ্য-লাইন পাস গাইডটি পড়ুন।` : `Read our Europe & skip-the-line passes guide for planning your trip to this destination.`}
            </p>
            <a
              href={blogUrl}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(blogUrl);
              }}
              className="inline-flex items-center gap-2 text-brand-emerald font-bold hover:underline cursor-pointer"
            >
              <ArrowRight size={16} />
              <span>{isBn ? "ইউরোপ ভ্রমণ গাইড পড়ুন →" : "Read Europe Travel Guide →"}</span>
            </a>
            <p className="text-[10px] text-slate-400 italic">
              {isBn ? "শহর-নির্দিষ্ট গাইড খুব দ্রুত যোগ করা হচ্ছে।" : "City-specific guide coming soon."}
            </p>
          </div>
        </div>

        {/* Right Column: Related Attractions in Same City */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-black text-slate-900">{isBn ? "এই শহরের আরও আকর্ষণ" : "More in " + cityName}</h3>
            {TIQETS_TOP_ATTRACTIONS.filter((a) => a.cityId === cityId && a.productId !== attractionId)
              .slice(0, 3)
              .map((related) => (
                <div
                  key={related.productId}
                  className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => {
                    onNavigate(`/attractions/${related.cityId}:${related.productId}`);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{cityStack?.flag || "🌍"}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{isBn ? related.titleBn : related.title}</h4>
                      <span className="text-[10px] font-mono text-brand-emerald">${related.priceUsd} USD (~৳{related.priceBdt.toLocaleString()} BDT)</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-black text-slate-900">
          {isBn ? "সচরাচর জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-100 pb-3 last:border-none">
              <h4 className="font-semibold text-slate-800 text-sm">{faq.question}</h4>
              <p className="text-slate-600 text-sm mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
        <a
          href={hubUrl}
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/attractions");
          }}
          className="hover:text-brand-emerald cursor-pointer"
        >
          {isBn ? "আকর্ষণ হাব" : "Attractions Hub"}
        </a>
        <span>/</span>
        <a
          href={cityUrl}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/attractions/${cityId}`);
          }}
          className="hover:text-brand-emerald cursor-pointer"
        >
          {cityName}
        </a>
        <span>/</span>
        <span className="text-slate-700 font-medium">{attrName}</span>
      </nav>
    </div>
  );
};
