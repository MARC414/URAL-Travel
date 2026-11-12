import React, { useState, useEffect, useRef } from "react";
import { ShieldAlert, ExternalLink, ArrowRight } from "lucide-react";
import {
  AFFILIATE_LINKS,
  AIRHELP_PROMO,
  resolvePartnerUrl,
} from "./AffiliatePartners";
import { PromoCard } from "./PromoCard";
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
  const partnerHref = resolvePartnerUrl(AFFILIATE_LINKS.airhelp);
  const [activeMode, setActiveMode] = useState<"claim" | "plus" | "live-form">("claim");
  const [delayHours, setDelayHours] = useState<"under3" | "3to4" | "over4" | "cancelled">("over4");
  const [flightRegion, setFlightRegion] = useState<"eu-uk" | "gulf-transit" | "asia-direct">("eu-uk");
  const [embedStatus, setEmbedStatus] = useState<"idle" | "loading" | "loaded" | "fallback">("idle");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

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
        {/* Affiliate disclosure: every CTA below opens AirHelp's own site, and
            URAL may earn a commission. JourneyHelpPanel states the same thing for
            its partner links; this widget opened partner links with no statement
            at all. Required, not decorative. */}
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-600">
          {isBn
            ? "নিচের লিংকগুলো affiliate অংশীদার (AirHelp)-এর — আপনি সেখানে দাবি করালে URAL একটি কমিশন পেতে পারে, আপনার জন্য কোনো অতিরিক্ত খরচ ছাড়াই। এটি কোনো সরকারি সেবা নয় এবং ক্ষতিপূরণের নিশ্চয়তা দেয় না।"
            : "The links below are to our affiliate partner, AirHelp. URAL may earn a commission if you claim through them, at no extra cost to you. This is not an official service and it does not guarantee compensation."}
        </p>
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
              {isBn
                ? "AirHelp কোনো ফ্লাইট-সমস্যার দাবি যাচাই করতে পারে; যোগ্যতা itinerary ও ঘটনার ওপর নির্ভর করে। বর্তমান শর্ত ও ফি দেখুন। TravelPass by AirHelp আলাদা মেম্বারশিপ।"
                : "AirHelp can review a flight-disruption claim; eligibility depends on the itinerary and case details. Review current terms and fees. TravelPass by AirHelp is a separate membership."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">

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
        <PromoCard partner="airhelp" lang={lang} />
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
              {isBn ? "যোগ্যতা নির্ভর করে ঘটনার বিবরণে" : "Eligibility depends on case details"}
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
            {isBn ? "২. TravelPass by AirHelp" : "2. TravelPass by AirHelp"}
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
                {isBn ? "TravelPass by AirHelp দেখুন" : "Explore TravelPass by AirHelp"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* The membership is separate from the claims service. */}
      {activeMode === "plus" && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <h3 className="font-serif text-lg font-bold text-slate-900">TravelPass by AirHelp</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            {isBn
              ? "TravelPass by AirHelp একটি ঐচ্ছিক পেইড মেম্বারশিপ। Silver, Gold ও Platinum প্ল্যানের সুবিধা এবং বীমার শর্ত ভিন্ন। কেনার আগে আপনার বাজারে মূল্য, কভারেজ, ট্রিপ-সীমা ও বাদ পড়া বিষয় যাচাই করুন। ক্ষতিপূরণ নিশ্চিত নয়।"
              : "TravelPass by AirHelp is an optional paid membership. Benefits and insurance terms differ across Silver, Gold and Platinum. Before buying, check the price, coverage, trip limits and exclusions for your market. Compensation is not guaranteed."}
          </p>
          <p className="text-xs text-slate-600">{isBn ? "Affiliate লিংক: এর মাধ্যমে কেনাকাটা করলে URAL কমিশন পেতে পারে।" : "Affiliate link: URAL may earn a commission if you purchase through it."}</p>
          <a href={partnerHref} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-xs font-bold text-white">
            {isBn ? "TravelPass প্ল্যান দেখুন" : "Explore TravelPass plans"} <ArrowRight size={14} />
          </a>
        </div>
      )}

      <PromoCard partner="airhelp" lang={lang} />

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
                    ? "এম্বেড ফর্মটি লোড হয়নি। AirHelp সাইটে ফ্লাইটের তথ্য দিয়ে দাবি যাচাই করুন; যোগ্যতা ও ফি ঘটনার বিবরণ এবং AirHelp-এর বর্তমান শর্তের ওপর নির্ভর করে।"
                    : "The embedded form did not load. Enter your flight details on AirHelp to check whether a claim may be worth pursuing; eligibility and fees depend on the case and AirHelp's current terms."}
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

                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
