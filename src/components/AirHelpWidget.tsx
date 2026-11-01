import React, { useState, useEffect, useRef } from "react";
import { ShieldAlert, Check, Copy, ExternalLink, ArrowRight } from "lucide-react";
import {
  AFFILIATE_LINKS,
  AIRHELP_PROMO,
  isPromoActive,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import { Language } from "../translations";

interface AirHelpWidgetProps {
  lang?: Language;
  routeLabel?: string;
  compact?: boolean;
}

export const AirHelpWidget: React.FC<AirHelpWidgetProps> = ({
  lang = "en",
  routeLabel,
  compact = false,
}) => {
  const isBn = lang === "bn";
  const promoActive = isPromoActive(AIRHELP_PROMO.expiresAt);
  const partnerHref = resolvePartnerUrl(AFFILIATE_LINKS.airhelp);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeMode, setActiveMode] = useState<"claim" | "plus" | "live-form">("claim");
  const [delayHours, setDelayHours] = useState<"under3" | "3to4" | "over4" | "cancelled">("over4");
  const [flightRegion, setFlightRegion] = useState<"eu-uk" | "gulf-transit" | "asia-direct">("eu-uk");
  const [embedStatus, setEmbedStatus] = useState<"idle" | "loading" | "loaded" | "fallback">("idle");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  const handleCopyPromo = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(AIRHELP_PROMO.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  useEffect(() => {
    if (activeMode !== "live-form" || !scriptContainerRef.current) return;

    setEmbedStatus("loading");
    scriptContainerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = AIRHELP_PROMO.scriptSrc;
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => setEmbedStatus("loaded");
    script.onerror = () => setEmbedStatus("fallback");

    const fallbackTimer = setTimeout(() => {
      setEmbedStatus((prev) => (prev === "loading" ? "fallback" : prev));
    }, 4000);

    scriptContainerRef.current.appendChild(script);

    return () => clearTimeout(fallbackTimer);
  }, [activeMode]);

  const getEligibilityChecklist = () => {
    if (flightRegion === "eu-uk") {
      return isBn
        ? "এই সংক্ষিপ্ত বাছাই থেকে যোগ্যতা বা ক্ষতিপূরণের পরিমাণ নির্ধারণ করা যায় না। প্রযোজ্য UK/EU নিয়ম যাচাই করতে operating carrier, সম্পূর্ণ itinerary, গন্তব্যে পৌঁছানোর বিলম্ব, রুটের দূরত্ব এবং বাতিলের নোটিশ ও কারণ মিলিয়ে দেখুন।"
        : "This short selection cannot determine eligibility or compensation. To check UK/EU rules, verify the operating carrier, full itinerary, arrival delay at the final destination, route distance, and any cancellation notice and reason.";
    }

    if (flightRegion === "gulf-transit") {
      return isBn
        ? "শুধু ট্রানজিট শহর দেখে ক্ষতিপূরণের অধিকার বা পরিমাণ বোঝা যায় না। operating carrier, সম্পূর্ণ টিকিট/সংযোগ, প্রযোজ্য দেশের নিয়ম এবং ঘটনার কারণ যাচাই করুন। লাগেজের সমস্যা হলে carrier-এর রিপোর্টিং নিয়ম মেনে নথি ও রসিদ রাখুন।"
        : "A transit city alone cannot establish a right to compensation or its amount. Check the operating carrier, full ticket and connection, applicable country rules, and cause of the disruption. For baggage issues, follow the carrier's reporting process and keep records and receipts.";
    }

    return isBn
      ? "সরাসরি এশীয় রুট হলেও ক্ষতিপূরণ নিশ্চিত নয়। operating carrier, রুটে প্রযোজ্য নিয়ম, itinerary ও ঘটনার কারণ যাচাই করুন। লাগেজের দাবি ফ্লাইট-বিলম্বের ক্ষতিপূরণ থেকে আলাদা হতে পারে; carrier-এর কাছে দ্রুত রিপোর্ট করে নথি রাখুন।"
      : "A direct Asian route does not guarantee compensation. Check the operating carrier, rules for the route, itinerary, and cause of the disruption. Baggage claims may follow different rules from delay compensation; report promptly to the carrier and keep records.";
  };

  const selectedEventLabel = isBn
    ? {
        over4: "৩+ ঘণ্টা বিলম্ব",
        cancelled: "ফ্লাইট বাতিল",
        "3to4": "মিসড ট্রানজিট বা লাগেজ সমস্যা",
        "under3": "৩ ঘণ্টার কম বিলম্ব",
      }[delayHours]
    : {
        over4: "3+ hour delay",
        cancelled: "cancellation",
        "3to4": "missed transit or baggage issue",
        "under3": "delay under 3 hours",
      }[delayHours];
  const result = { note: getEligibilityChecklist(), selectedEventLabel };

  if (compact) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">
                {isBn ? "ফ্লাইট বিলম্ব ও বাতিল সুরক্ষা" : "Flight Delay & Cancellation Protection"}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {isBn ? "যোগ্যতা যাচাই করুন" : "Check eligibility"}
              </span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
              {isBn
                ? "ফ্লাইটে সমস্যা হয়েছে? আপনার itinerary ও প্রযোজ্য নিয়ম মিলিয়ে দেখুন।"
                : "Had a flight disruption? Check your itinerary and the rules that apply."}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              {promoActive
                ? isBn
                  ? `AirHelp কোনো পুরোনো ফ্লাইটের দাবি যাচাই করতে পারে; যোগ্যতা itinerary ও ঘটনার ওপর নির্ভর করে। ব্যবহার করলে বর্তমান শর্ত ও ফি দেখুন। আলাদা AirHelp+ Smart বা Pro মেম্বারশিপে ${AIRHELP_PROMO.code} কোডে ${AIRHELP_PROMO.validUntil} পর্যন্ত ১১% ছাড়—কেনার আগে checkout-এ শর্ত নিশ্চিত করুন।`
                  : `AirHelp can review a past flight disruption; eligibility depends on the itinerary and case details. Review current terms and fees before using the service. The separate AirHelp+ Smart or Pro membership has 11% off through ${AIRHELP_PROMO.validUntil} with code ${AIRHELP_PROMO.code}; confirm terms at checkout.`
                : isBn
                ? "AirHelp কোনো ফ্লাইট-সমস্যার দাবি যাচাই করতে পারে; যোগ্যতা itinerary ও ঘটনার ওপর নির্ভর করে। ব্যবহার করলে বর্তমান শর্ত ও ফি দেখুন। AirHelp+ আলাদা মেম্বারশিপ—কেনার আগে বর্তমান plan ও শর্ত যাচাই করুন।"
                : "AirHelp can review a flight-disruption claim; eligibility depends on itinerary and case details. Review current terms and fees before using the service. AirHelp+ is a separate membership; check current plans and terms before buying."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {promoActive && (
              <button
                type="button"
                onClick={handleCopyPromo}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 text-xs font-mono font-semibold px-3.5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                title="Copy 11% OFF Promo Code"
              >
                {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copiedCode ? (isBn ? "কপি হয়েছে!" : "Copied AHTPO11") : `Code: ${AIRHELP_PROMO.code} (11% OFF)`}</span>
              </button>
            )}

            <a
              href={partnerHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{isBn ? "AirHelp-এ যোগ্যতা যাচাই করুন" : "Check eligibility with AirHelp"}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="airhelp-flight-protection-hub"
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
    >
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-brand-navy">
              {isBn ? "যাত্রী অধিকার ও ফ্লাইট ক্ষতিপূরণ ডেস্ক" : "Passenger Rights & Flight Delay Desk"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{routeLabel ? routeLabel : isBn ? "সকল আন্তর্জাতিক রুট" : "International Routes from Dhaka"}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-700 font-semibold">
              {promoActive
                ? isBn
                  ? `প্রোমো কোড: ${AIRHELP_PROMO.code} (১১% ছাড়)`
                  : `Promo: ${AIRHELP_PROMO.code} (11% OFF AirHelp+)`
                : isBn
                ? "যোগ্যতা নির্ভর করে ঘটনার বিবরণে"
                : "Eligibility depends on case details"}
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {isBn
              ? "ফ্লাইটে সমস্যা হয়েছে? যোগ্যতা যাচাই করুন"
              : "Flight Disrupted? Check Whether It May Qualify"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isBn
              ? "কোন নিয়ম প্রযোজ্য এবং কোনো দাবি সফল হবে কি না তা রুট, airline, সম্পূর্ণ itinerary ও ঘটনার বিবরণের ওপর নির্ভর করে। এই টুল কেবল প্রাথমিক নির্দেশনা দেয়, যোগ্যতা বা ক্ষতিপূরণের পরিমাণ নিশ্চিত করে না।"
              : "Which rules apply and whether a claim succeeds depend on the route, airline, full itinerary, and disruption details. This tool offers only a starting point; it cannot confirm eligibility or compensation amounts."}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div
          role="group"
          aria-label={isBn ? "AirHelp ফ্লাইট সুরক্ষা বিকল্প" : "AirHelp protection options"}
          className="flex max-w-full flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start"
        >
          <button
            type="button"
            aria-pressed={activeMode === "claim"}
            onClick={() => setActiveMode("claim")}
            className={`min-h-11 px-3.5 py-2 text-xs font-semibold leading-tight text-center rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy ${
              activeMode === "claim"
                ? "bg-brand-navy text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isBn ? "১. প্রাথমিক যাচাই" : "1. Disruption Check"}
          </button>
          <button
            type="button"
            aria-pressed={activeMode === "plus"}
            onClick={() => setActiveMode("plus")}
            className={`min-h-11 px-3.5 py-2 text-xs font-semibold leading-tight text-center rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy ${
              activeMode === "plus"
                ? "bg-brand-navy text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {promoActive
              ? isBn
                ? "২. AirHelp+ (১১% ছাড়)"
                : "2. AirHelp+ (11% OFF)"
              : isBn
              ? "২. AirHelp+ সুরক্ষা"
              : "2. AirHelp+ Protection"}
          </button>
          <button
            type="button"
            aria-pressed={activeMode === "live-form"}
            onClick={() => setActiveMode("live-form")}
            className={`min-h-11 px-3.5 py-2 text-xs font-semibold leading-tight text-center rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy ${
              activeMode === "live-form"
                ? "bg-brand-navy text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isBn ? "৩. লাইভ ক্লেইম ফর্ম" : "3. Live Claim Form"}
          </button>
        </div>
      </div>

      {/* MODE 1: PRELIMINARY ELIGIBILITY CHECKLIST */}
      {activeMode === "claim" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                {isBn ? "আপনার ফ্লাইট রুট বা কানেকশন নির্বাচন করুন:" : "Select Your Flight Route or Transit Type:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: "eu-uk",
                    title: isBn ? "UK / Europe রুট" : "UK & Europe Routes",
                    sub: isBn ? "লন্ডন, প্যারিস, রোম, ইস্তাম্বুল" : "London, Paris, Rome, EU/UK",
                  },
                  {
                    id: "gulf-transit",
                    title: isBn ? "মধ্যপ্রাচ্য ও Umrah ট্রানজিট" : "Middle East & Umrah",
                    sub: isBn ? "দুবাই, জেদ্দা, দোহা, মদিনা" : "Dubai, Jeddah, Doha, Riyadh",
                  },
                  {
                    id: "asia-direct",
                    title: isBn ? "এশিয়া ডিরেক্ট ফ্লাইট" : "Asia Direct Routes",
                    sub: isBn ? "ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর" : "Bangkok, KL, Singapore, KTM",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={flightRegion === opt.id}
                    onClick={() => setFlightRegion(opt.id as any)}
                    className={`min-h-11 p-3.5 rounded-xl border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy ${
                      flightRegion === opt.id
                        ? "border-brand-navy bg-slate-50"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{opt.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                {isBn ? "বিমানবন্দরে কী সমস্যা হয়েছিল?" : "What happened to your flight?"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "over4", label: isBn ? "৩–৪+ ঘণ্টা বিলম্ব" : "3+ Hours Delayed" },
                  { id: "cancelled", label: isBn ? "ফ্লাইট বাতিল (Cancelled)" : "Flight Cancelled" },
                  { id: "3to4", label: isBn ? "মিসড কানেকশন / লাগেজ" : "Missed Transit / Luggage" },
                  { id: "under3", label: isBn ? "৩ ঘণ্টার কম বিলম্ব" : "Under 3h Delay" },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={delayHours === d.id}
                    onClick={() => setDelayHours(d.id as any)}
                    className={`min-h-11 py-2.5 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy ${
                      delayHours === d.id
                        ? "bg-brand-navy text-white border-brand-navy"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              {isBn
                ? "আরও এগোনোর আগে airline-এর প্রক্রিয়া এবং AirHelp বেছে নিলে তার বর্তমান শর্ত ও ফি যাচাই করুন।"
                : "Before proceeding, check the airline's process and review AirHelp's current terms and fees if you choose to use it."}
            </p>
          </div>

          {/* Eligibility guidance, not a payout calculator */}
          <div className="lg:col-span-5 bg-brand-navy text-white rounded-2xl p-6 space-y-4 border border-slate-800">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-300">
                {isBn ? "এটি যোগ্যতা বা পেআউটের সিদ্ধান্ত নয়" : "Not an eligibility or payout decision"}
              </div>
              <h3 className="text-lg font-bold text-white">
                {isBn ? "যে তথ্যগুলো যাচাই করবেন" : "Details to verify"}
              </h3>
            </div>

            <p className="text-xs font-semibold text-amber-200">
              {isBn ? "নির্বাচিত সমস্যা:" : "Selected disruption:"} {result.selectedEventLabel}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">{result.note}</p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={partnerHref}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? "AirHelp-এ যোগ্যতা যাচাই করুন" : "Check eligibility with AirHelp"}</span>
                <ExternalLink size={13} />
              </a>
              <button
                type="button"
                onClick={() => setActiveMode("plus")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                {promoActive
                  ? isBn
                    ? "১১% ডিসকাউন্ট কোড"
                    : "Get 11% OFF AirHelp+"
                  : isBn
                  ? "AirHelp+ সুবিধা দেখুন"
                  : "Explore AirHelp+"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: AIRHELP+ SMART & PRO (WITH AUTO-EXPIRING AHTPO11 PROMO) */}
      {activeMode === "plus" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-700 font-semibold">
              <span>{isBn ? "ঐচ্ছিক পেইড মেম্বারশিপ" : "Optional paid membership"}</span>
              <span aria-hidden="true">·</span>
              <span>
                {promoActive
                  ? isBn
                    ? "৩০ নভেম্বর ২০২৬ পর্যন্ত ১১% ছাড়"
                    : `Valid through ${AIRHELP_PROMO.validUntil}`
                  : isBn
                  ? "বার্ষিক ফ্লাইট ও লাউঞ্জ মেম্বারশিপ"
                  : "Annual Flight & Airport Lounge Membership"}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              {promoActive
                ? isBn
                  ? `AirHelp+ Smart ও Pro-তে তালিকাভুক্ত ১১% অফার · ${AIRHELP_PROMO.validUntil} পর্যন্ত`
                  : `Listed 11% offer on AirHelp+ Smart & Pro through ${AIRHELP_PROMO.validUntil}`
                : isBn
                ? "AirHelp+ প্ল্যান: কেনার আগে বর্তমান শর্ত যাচাই করুন"
                : "AirHelp+ plans: check current terms before buying"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isBn
                ? "AirHelp+ একটি পেইড মেম্বারশিপ, ভ্রমণ বীমা নয়। প্ল্যান, মূল্য, অন্তর্ভুক্ত সেবা ও ট্রিপ-সীমা বাজারভেদে বদলাতে পারে। মেম্বারশিপ ক্ষতিপূরণ পাওয়ার নিশ্চয়তা দেয় না; কেনার আগে আপনার বাজারের বর্তমান প্ল্যান-শর্ত, সীমা, বাদ পড়া বিষয় ও নিবন্ধনের সময়সীমা যাচাই করুন।"
                : "AirHelp+ is a paid membership, not travel insurance. Plans, prices, included services and trip limits can vary by market and may change. Membership does not guarantee compensation; check the current plan terms, limits, exclusions and registration deadlines for your market before buying."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">AirHelp+ Smart</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">
                    {promoActive ? `Offer code ${AIRHELP_PROMO.code}` : "Check current plan limits"}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {isBn
                    ? "আপনার বাজারে বর্তমান মূল্য, ট্রিপ-সীমা, অন্তর্ভুক্ত সেবা, যোগ্যতা ও নিবন্ধনের সময়সীমা যাচাই করুন।"
                    : "Check the current price, trip limits, included services, eligibility and registration deadlines for your market."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">AirHelp+ Pro</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">
                    {promoActive ? `Offer code ${AIRHELP_PROMO.code}` : "Compare current plan limits"}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {isBn
                    ? "Smart প্ল্যানের সঙ্গে বর্তমান ট্রিপ-সীমা, সুবিধা ও মূল্য তুলনা করুন; কোনো সুবিধা সব বাজারে প্রযোজ্য ধরে নেবেন না।"
                    : "Compare current trip limits, benefits and price with Smart; do not assume every feature applies in every market."}
                </p>
              </div>
            </div>
          </div>

          {/* Promo Code / Evergreen Action Box */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            {promoActive ? (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">
                  {isBn ? "চেকআউটে নিচের কোডটি ব্যবহার করুন" : "Apply Promo Code at Checkout"}
                </span>
                <div className="flex items-center justify-between bg-white border border-slate-300 rounded-xl px-4 py-3">
                  <div>
                    <span className="font-mono text-lg font-bold text-brand-navy tracking-wider">
                      {AIRHELP_PROMO.code}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Listed 11% offer · Smart &amp; Pro · through {AIRHELP_PROMO.validUntil}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPromo}
                    className="bg-brand-navy hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedCode ? <Check size={13} className="text-[#F6B73C]" /> : <Copy size={13} />}
                    <span>{copiedCode ? (isBn ? "কপি হয়েছে" : "Copied") : isBn ? "কোড কপি" : "Copy Code"}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">
                  {isBn ? "কেনার আগে কী যাচাই করবেন" : "What to check before buying"}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn
                    ? "আপনার বাজারে বর্তমান প্ল্যানের মূল্য, ট্রিপ-সীমা, অন্তর্ভুক্ত সেবা ও নিবন্ধনের নিয়ম যাচাই করুন।"
                    : "Check current plan price, trip limits, included services and registration rules for your market."}
                </p>
              </div>
            )}

            <a
              href={partnerHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {promoActive
                  ? isBn
                    ? "AirHelp+ প্ল্যান ও কোড যাচাই করুন"
                    : "Check AirHelp+ plans and offer"
                  : isBn
                  ? "AirHelp+ মেম্বারশিপ প্ল্যান দেখুন"
                  : "Explore AirHelp+ Plans on Official Site"}
              </span>
              <ArrowRight size={14} />
            </a>

            <div className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
              <p>
                {promoActive
                  ? isBn
                    ? "আপনার বাজার ও প্ল্যানে কোডটি গ্রহণযোগ্য হলে অফার প্রযোজ্য; চেকআউটে ছাড় ও মোট মূল্য নিশ্চিত করুন।"
                    : "The offer applies only if the code is accepted for your market and plan; confirm the discount and final total at checkout."
                  : isBn
                  ? "বর্তমান প্ল্যান, মূল্য ও যোগ্যতা AirHelp-এর সাইটে যাচাই করুন।"
                  : "Check current plans, prices and eligibility on AirHelp's site."}
              </p>
              <a
                href="https://www.airhelp.com/en/airhelp-plus-terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-slate-700"
              >
                {isBn ? "AirHelp+ সেবার শর্ত (ইংরেজি)" : "Read AirHelp+ service terms"}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: OFFICIAL TRAVELPAYOUTS AIRHELP SCRIPT WIDGET */}
      {activeMode === "live-form" && (
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div
              ref={scriptContainerRef}
              className="min-h-[160px]"
              style={{ display: embedStatus === "loaded" ? "block" : "none" }}
            />

            {embedStatus === "loading" && (
              <div className="py-10 text-center space-y-2">
                <div className="w-5 h-5 border-2 border-slate-300 border-t-brand-navy rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-mono">
                  {isBn ? "অফিসিয়াল AirHelp ক্লেইম পোর্টাল লোড হচ্ছে..." : "Loading official AirHelp claim portal..."}
                </p>
              </div>
            )}

            {embedStatus === "fallback" && (
              <div className="py-6 px-4 text-center space-y-3">
                <p className="text-xs text-slate-600 max-w-lg mx-auto">
                  {isBn
                    ? `এম্বেড ফর্মটি লোড হয়নি। AirHelp সাইটে ফ্লাইটের তথ্য দিয়ে দাবি যাচাই করুন; যোগ্যতা ও ফি ঘটনার বিবরণ এবং AirHelp-এর বর্তমান শর্তের ওপর নির্ভর করে। ${promoActive ? `AirHelp+ কোড ${AIRHELP_PROMO.code} ব্যবহার করলে চেকআউটে অফারের যোগ্যতা নিশ্চিত করুন।` : ""}`
                    : `The embedded form did not load. Enter your flight details on AirHelp to check whether a claim may be worth pursuing; eligibility and fees depend on the case and AirHelp's current terms. ${promoActive ? `If using AirHelp+ code ${AIRHELP_PROMO.code}, confirm offer eligibility at checkout.` : ""}`}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={partnerHref}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <span>{isBn ? "AirHelp অফিসিয়াল পোর্টাল খুলুন" : "Open AirHelp Official Portal"}</span>
                    <ExternalLink size={13} />
                  </a>
                  {promoActive && (
                    <button
                      type="button"
                      onClick={handleCopyPromo}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-800 font-mono text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                      <span>{copiedCode ? `Copied ${AIRHELP_PROMO.code}` : `Copy Code: ${AIRHELP_PROMO.code}`}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
