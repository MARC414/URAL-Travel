import React, { useState, useEffect, useRef } from "react";
import { ShieldAlert, Check, Copy, ExternalLink, ArrowRight } from "lucide-react";
import { AFFILIATE_LINKS, AIRHELP_PROMO } from "./AffiliatePartners";
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

  const getEstimatedPayout = () => {
    if (flightRegion === "eu-uk") {
      if (delayHours === "under3") {
        return {
          eligible: false,
          amount: "€0 (Under 3h threshold)",
          bdt: "BDT 0",
          note: isBn
            ? "EU EC 261 ও UK 261 আইন অনুযায়ী গন্তব্যে পৌঁছাতে অন্তত ৩ ঘণ্টা বিলম্ব বা ফ্লাইট বাতিল হতে হবে। তবে AirHelp+ মেম্বাররা প্রোঅ্যাক্টিভ লাউঞ্জ অ্যাক্সেস পান।"
            : "Under EU EC 261 & UK 261 regulations, arrival delay must be 3+ hours (or flight cancelled) to trigger cash compensation. AirHelp+ members still receive airport lounge access during shorter delays.",
        };
      }
      return {
        eligible: true,
        amount: "Up to €600 / £520",
        bdt: "~BDT 78,000 per passenger",
        note: isBn
          ? "লন্ডন, প্যারিস, রোম, ইউরোপ বা যুক্তরাজ্যের যেকোনো ফ্লাইটে ৩+ ঘণ্টা বিলম্ব, ক্যান্সেলেশন বা মিসড কানেকশনে প্রতি যাত্রীর জন্য সর্বোচ্চ €600 (~৭৮,০০০ টাকা) ক্ষতিপূরণ দাবি করা যায়।"
          : "Long-haul flights (>3,500 km) departing EU/UK airports—or flying into EU/UK on a European/British carrier—qualify for up to €600 (~BDT 78,000) per passenger for 3+ hour arrival delays, cancellations, or missed connections.",
      };
    }

    if (flightRegion === "gulf-transit") {
      return {
        eligible: true,
        amount: "Up to €600 (Transit / Montreal Convention)",
        bdt: "~BDT 52,000 – 78,000",
        note: isBn
          ? "দুবাই, দোহা, জেদ্দা বা রিয়াদ হয়ে ট্রানজিট ফ্লাইটে মিসড কানেকশন, লাগেজ হারানো বা ক্যান্সেলেশনের ক্ষেত্রে Montreal Convention ও সৌদি GACA নিয়মে ক্ষতিপূরণ চেক করুন।"
          : "Connecting flights via Dubai, Doha, Jeddah, or Istanbul qualify for baggage loss/delay payouts under the Montreal Convention, Saudi GACA passenger rights, Turkish SHY-PASS rules, or EC 261 on onward European legs.",
      };
    }

    return {
      eligible: true,
      amount: "Baggage & Cancellation Claim Check",
      bdt: "Up to ~BDT 1,95,000 (Lost Luggage / AirHelp+)",
      note: isBn
        ? "এশিয়ান রুটে সরাসরি ফ্লাইটে ক্যান্সেলেশন, ওভারবুকিং বা লাগেজ ক্ষতিগ্রস্ত হলে আন্তর্জাতিক Montreal Convention অনুযায়ী দাবি করা যায়—এবং ফ্লাইটের আগে AirHelp+ নিলে সব রুটেই সুরক্ষা মেলে।"
        : "Direct Asian routes are covered for delayed/damaged/lost checked baggage and denied boarding under the Montreal Convention, plus instant delay payouts & lounge access when protected in advance with AirHelp+.",
    };
  };

  const result = getEstimatedPayout();

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
                {isBn ? "সর্বোচ্চ €600 (~BDT 78,000) ক্ষতিপূরণ" : "Up to €600 (~BDT 78,000) Compensation"}
              </span>
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
              {isBn
                ? "আপনার ফ্লাইট কি ৩+ ঘণ্টা লেট বা বাতিল হয়েছে? অথবা আসন্ন ট্রিপ সুরক্ষিত রাখতে চান?"
                : "Flight Delayed 3+ Hours, Cancelled, or Flying Soon? Protect Your Ticket with AirHelp"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
              {isBn
                ? `AirHelp-এর মাধ্যমে গত ৩ বছরের যেকোনো বিলম্বিত বা বাতিল ফ্লাইটের ক্ষতিপূরণ চেক করুন (No Win, No Fee)। আর ফ্লাইটের আগে AirHelp+ Smart বা Pro নিলে প্রোমো কোড ${AIRHELP_PROMO.code} ব্যবহার করে পান ১১% ছাড় (${AIRHELP_PROMO.validUntil} পর্যন্ত)।`
                : `Check free compensation eligibility for delayed or cancelled flights from the past 3 years (No Win, No Fee), or get 11% OFF AirHelp+ Smart & Pro subscriptions through ${AIRHELP_PROMO.validUntil} using code ${AIRHELP_PROMO.code}.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyPromo}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 text-xs font-mono font-semibold px-3.5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              title="Copy 11% OFF Promo Code"
            >
              {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedCode ? (isBn ? "কপি হয়েছে!" : "Copied AHTPO11") : `Code: ${AIRHELP_PROMO.code} (11% OFF)`}</span>
            </button>

            <a
              href={AFFILIATE_LINKS.airhelp}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-brand-navy hover:bg-slate-800 text-[#F6B73C] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{isBn ? "ক্ষতিপূরণ যাচাই করুন" : "Check Flight Compensation"}</span>
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
              {isBn ? "প্রোমো কোড: AHTPO11 (১১% ছাড়)" : "Promo: AHTPO11 (11% OFF AirHelp+)"}
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {isBn
              ? "ফ্লাইট বিলম্ব, বাতিল বা মিসড কানেকশন? সর্বোচ্চ €600 (~BDT 78,000) ক্ষতিপূরণ দাবি করুন"
              : "Flight Delayed or Cancelled? Claim Up to €600 (~BDT 78,000) per Passenger"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isBn
              ? "অনেক বাংলাদেশি যাত্রীই জানেন না যে ইউরোপ, যুক্তরাজ্য, তুরস্ক, সৌদি আরব বা ট্রানজিট ফ্লাইটে ৩ ঘণ্টার বেশি বিলম্ব, ক্যান্সেলেশন বা লাগেজ হারালে আন্তর্জাতিক আইন অনুযায়ী এয়ারলাইন্স থেকে নগদ ক্ষতিপূরণ পাওয়া যায়।"
              : "Most Bangladeshi flyers don't realize that a 3+ hour flight delay, last-minute cancellation, overbooking, or missed connection on eligible routes entitles you to up to €600 (~BDT 78,000) in compensation—even on tickets booked months ago."}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0 self-start">
          <button
            type="button"
            onClick={() => setActiveMode("claim")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeMode === "claim"
                ? "bg-brand-navy text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isBn ? "১. ক্ষতিপূরণ ক্যালকুলেটর" : "1. Payout Estimator"}
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("plus")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeMode === "plus"
                ? "bg-brand-navy text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isBn ? "২. AirHelp+ (১১% ছাড়)" : "2. AirHelp+ (11% OFF)"}
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("live-form")}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeMode === "live-form"
                ? "bg-brand-navy text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {isBn ? "৩. লাইভ ক্লেইম ফর্ম" : "3. Live Claim Form"}
          </button>
        </div>
      </div>

      {/* MODE 1: INTERACTIVE PAYOUT ESTIMATOR */}
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
                    onClick={() => setFlightRegion(opt.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
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
                    onClick={() => setDelayHours(d.id as any)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
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

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span>{isBn ? "✓ কোনো অগ্রিম ফি নেই (No Win, No Fee)" : "✓ 100% No Win, No Fee"}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? "✓ গত ৩ বছরের ফ্লাইট গ্রহণযোগ্য" : "✓ Covers flights from past 3 years"}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? "✓ ২ মিনিটে ফ্রি যাচাই" : "✓ Free 2-minute eligibility check"}</span>
            </div>
          </div>

          {/* Payout Card */}
          <div className="lg:col-span-5 bg-brand-navy text-white rounded-2xl p-6 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{isBn ? "সম্ভাব্য ক্ষতিপূরণ (প্রতি যাত্রী)" : "Estimated Compensation"}</span>
              <span className="font-mono text-[#F6B73C]">{result.amount}</span>
            </div>

            <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
              {result.bdt}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{result.note}</p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={AFFILIATE_LINKS.airhelp}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? "ফ্রি ক্ষতিপূরণ চেক করুন" : "Check My Flight for Free"}</span>
                <ExternalLink size={13} />
              </a>
              <button
                type="button"
                onClick={() => setActiveMode("plus")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                {isBn ? "১১% ডিসকাউন্ট কোড" : "Get 11% OFF AirHelp+"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: AIRHELP+ SMART & PRO WITH AHTPO11 11% OFF PROMO */}
      {activeMode === "plus" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-700 font-semibold">
              <span>{isBn ? "এক্সক্লুসিভ ট্রাভেলপেআউটস অফার" : "Exclusive Partner Offer"}</span>
              <span aria-hidden="true">·</span>
              <span>{isBn ? "৩০ নভেম্বর ২০২৬ পর্যন্ত" : `Valid through ${AIRHELP_PROMO.validUntil}`}</span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">
              {isBn
                ? "AirHelp+ Smart ও Pro সাবস্ক্রিপশনে ১১% ডিসকাউন্ট (যুক্তরাষ্ট্র ছাড়া সকল মার্কেটে)"
                : "Save 11% on AirHelp+ Smart & AirHelp+ Pro Annual Flight Protection"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isBn
                ? "আপনি যদি বছরে ১-২ বারের বেশি বিদেশ ভ্রমণ করেন (Umrah, Dubai, Bangkok, Europe বা UK), তবে AirHelp+ মেম্বারশিপ নিলে ফ্লাইট বিলম্বের সাথে সাথে এয়ারপোর্ট লাউঞ্জ অ্যাক্সেস, লাগেজ সুরক্ষা এবং ১০০% সার্ভিস-ফি ছাড়া ক্ষতিপূরণ সহায়তা পাবেন।"
                : "Ideal for Bangladeshi frequent flyers, Umrah pilgrims, and business travelers. AirHelp+ members keep 100% of their compensation payout (zero commission deducted on claims), plus unlock instant airport lounge access when flights are delayed and luggage protection."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">AirHelp+ Smart</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">11% OFF with {AIRHELP_PROMO.code}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isBn
                    ? "বছরে ৩টি ট্রিপ পর্যন্ত ফ্লাইট ও লাগেজ সুরক্ষা, ক্লেইমে ০% ফি এবং লাইভ ফ্লাইট স্ট্যাটাস ট্র্যাকিং।"
                    : "Covers up to 3 trips per year: zero fee on €600 compensation claims, delayed luggage protection, and 24/7 specialist chat."}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">AirHelp+ Pro</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">11% OFF with {AIRHELP_PROMO.code}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {isBn
                    ? "বছরে ৯টি ট্রিপ পর্যন্ত সুরক্ষা + ফ্লাইট বিলম্ব হলে বিনামূল্যে আন্তর্জাতিক Airport Lounge পাস।"
                    : "Covers up to 9 trips per year + complimentary Luxury Airport Lounge pass whenever your flight is delayed."}
                </p>
              </div>
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
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
                    11% OFF Smart & Pro · Valid Sept 1 – Nov 30, 2026
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

            <a
              href={AFFILIATE_LINKS.airhelp}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {isBn
                  ? "AirHelp+ এ ১১% ডিসকাউন্ট অ্যাক্টিভেট করুন"
                  : "Activate 11% OFF on AirHelp+ Official Site"}
              </span>
              <ArrowRight size={14} />
            </a>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              {isBn
                ? "নোট: প্রোমো কোডটি যুক্তরাষ্ট্র (US) বাদে বাংলাদেশ, যুক্তরাজ্য, ইউরোপ, মধ্যপ্রাচ্য ও এশিয়ার সকল মার্কেটে কার্যকর।"
                : "Note: Promo code AHTPO11 is valid across all markets (including Bangladesh, UK, Europe, UAE & Asia) except the US."}
            </p>
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
                    ? "আপনার ব্রাউজারের অ্যাড-ব্লকার বা প্রাইভেসি সেটিংসের কারণে এমবেড ফর্মটি ব্লক হয়েছে। নিচের বাটনে ক্লিক করে সরাসরি অফিসিয়াল AirHelp পোর্টালে আপনার ফ্লাইট নম্বর চেক করুন।"
                    : "Open the official AirHelp portal directly to enter your flight number, check €600 compensation eligibility, or redeem promo code AHTPO11 for 11% OFF AirHelp+."}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={AFFILIATE_LINKS.airhelp}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
                  >
                    <span>{isBn ? "AirHelp অফিসিয়াল পোর্টাল খুলুন" : "Open AirHelp Official Portal"}</span>
                    <ExternalLink size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPromo}
                    className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-800 font-mono text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    {copiedCode ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedCode ? "Copied AHTPO11" : "Copy Code: AHTPO11"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
