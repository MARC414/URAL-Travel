import React, { useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Check,
  Calculator,
  Compass,
  Clock,
  MapPin,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";
import { TravelpayoutsEmbed } from "./TravelpayoutsEmbed";
import { TravelpayoutsCustomWidget } from "./TravelpayoutsCustomWidget";
import {
  AFFILIATE_LINKS,
  PartnerLinkButton,
} from "./AffiliatePartners";
import { AirHelpWidget } from "./AirHelpWidget";
import { TravelIntelligence } from "./AeoInspector";
import { Language } from "../translations";
import { FAQ } from "../types";
import { ResponsiveImage } from "./ResponsiveImage";
import { UmrahBudgetCalculator } from "./UmrahBudgetCalculator";

interface UmrahLandingPageProps {
  lang: Language;
  localizedHajjFaqs: FAQ[];
  onNavigate: (path: string) => void;
  coverImage: string;
}

export const UmrahLandingPage: React.FC<UmrahLandingPageProps> = ({
  lang,
  localizedHajjFaqs,
  onNavigate,
  coverImage,
}) => {
  const isBn = lang === "bn";
  const blogHref = (slug: string) => (isBn ? "/bn/blog/" : "/blog/") + slug;

  const [bookingMode, setBookingMode] = useState<"diy" | "bdtDesk">("diy");

  return (
    <div className="space-y-16 animate-fade-in">
      {/* =====================================================================
          1. FULL-WIDTH EDGE-TO-EDGE HERO SECTION WITH PRIMARY SEO H1 HEADING
      ===================================================================== */}
      <section
        aria-label="Umrah and Hajj Planning Hero Banner"
        className="w-screen relative left-1/2 -translate-x-1/2 -mt-10 sm:-mt-12 bg-[#071120] text-white border-b border-slate-800 overflow-hidden shadow-2xl"
      >
        {/* Full-Bleed Background Photography + Multi-Layer Editorial Vignette */}
        <ResponsiveImage
          src={coverImage}
          sizes="100vw"
          alt="The Kaaba at Masjid al-Haram in Makkah, illuminated at night."
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60 scale-[1.01] pointer-events-none"
        />
        {/* Same left-weighted directional scrim as the approved /contact hero
            (from-brand-navy via-brand-navy/92 to-brand-navy/55), so the H1 keeps
            ≥7:1 contrast on the text side while the Kaaba stays visible on the
            side that only carries the conversion card. The previous inline
            3-stop rgba gradient (0.96 → 0.72) was opaque enough to flatten the
            photo to a near-solid navy block. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071120] via-[#071120]/95 to-[#071120]/45 sm:via-[#071120]/88 sm:to-[#071120]/20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071120] to-transparent pointer-events-none" />

        {/* Constrained Content Container Inside Full-Width Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Search-Intent H1, Value Prop & Dual CTAs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-mono text-[11px] text-emerald-300">
                  {isBn ? "BDT বাজেট টুল পর্যালোচনা: ১৮ অক্টোবর ২০২৬" : "BDT budget tool reviewed: 18 October 2026"}
                </span>
              </div>

              {/* PRIMARY SEO H1 HEADING (High-Intent Bangladeshi Search Keywords) */}
              <h1
                className="ural-page-title font-serif text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.15]"
                style={{ textWrap: "balance" }}
              >
                {isBn ? (
                  <>
                    বাংলাদেশ থেকে ওমরাহর খরচ:{" "}
                    <span className="text-[#F6B73C]">নিজে পরিকল্পনার গাইড</span>
                  </>
                ) : (
                  <>
                    Umrah Cost from Bangladesh:{" "}
                    <span className="text-[#F6B73C]">A DIY Planning Guide</span>
                  </>
                )}
              </h1>

              {/* Search-Intent Lead Paragraph */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {isBn
                  ? "এই গাইড কাদের জন্য: বাংলাদেশ থেকে পরিবারসহ বা নিজে ওমরাহ পরিকল্পনা করছেন, উপযুক্ত ভিসা রুট বাছতে ও তুলনাযোগ্য কোটেশন সংগ্রহ করতে চান। আগে ভিসা রুট বুঝুন, তারপর BDT হিসাব ব্যবহার করুন। পেমেন্টের আগে বর্তমান নিয়ম ও সরবরাহকারীর শর্ত যাচাই করুন।"
                  : "Who this guide is for: families and independent travellers leaving Bangladesh who need to choose an eligible Umrah route, collect comparable quotes and plan the next booking step. Start with your visa route, then use the BDT worksheet. Confirm current rules and supplier terms before paying."}
              </p>

              {/* Primary Paid-Marketing Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#umrah-calculator"
                  className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#F6B73C]/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calculator size={15} />
                  <span>
                    {isBn
                      ? "নিজের কোটেশন দিয়ে BDT হিসাব করুন"
                      : "Build a Budget from Your Quotes"}
                  </span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#umrah-step-flights"
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <span>
                    {isBn
                      ? "ঢাকা → জেদ্দা/মদিনা লাইভ ফ্লাইট"
                      : "Search Dhaka → Jeddah Flights"}
                  </span>
                </a>

                <a
                  href="https://wa.me/8801784385335?text=Assalamu%20Alaikum%20URAL%2C%20I%20want%20help%20planning%20my%20Umrah%20trip%20in%20BDT!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-emerald hover:bg-brand-emerald/90 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <span>
                    {isBn
                      ? "WhatsApp BDT ওমরাহ ডেস্ক"
                      : "WhatsApp BDT Desk (+8801784385335)"}
                  </span>
                </a>
              </div>

              {/* Key Telemetry & Benchmark Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-white/15 text-left">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    ৳ 1.16L–1.32L
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn
                      ? "১০ দিনের পুরোনো রেফারেন্স (৪ জন শেয়ারিং, ১৪ অক্টো ২০২৬; পুনর্মূল্যায়িত নয়)"
                      : "10-Day Reference (4-Sharing, Unre-Priced · 14 Oct 2026)"}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    {isBn ? "৩টি রুট" : "3 Visa Paths"}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn
                      ? "স্ট্যান্ডার্ড ওমরাহ · ৯৬ঘণ্টা স্টপওভার · যোগ্য ভিসা"
                      : "Standard Umrah · 96h Stopover · Eligible Tourist"}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    1448H
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn
                      ? "ওমরাহ মৌসুম (৩১ মে ২০২৬ – ৭ এপ্রিল ২০২৭)"
                      : "Season Window (31 May 2026 – 7 Apr 2027)"}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    ≈2¼ h
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn
                      ? "মক্কা–মদিনা HHR ট্রেন (SAR 162 বেস + VAT)"
                      : "Makkah–Madinah HHR (SAR 162 Base · 14 Oct 2026)"}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dual-Mode Conversion Card (DIY vs. BDT Desk) (5 Cols) */}
            <div className="lg:col-span-5 bg-brand-navy/95 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#F6B73C] font-semibold uppercase tracking-wider block">
                  {isBn ? "আপনার বুকিং পদ্ধতি বেছে নিন" : "Select Your Umrah Booking Path"}
                </span>
                <div className="flex items-center gap-1 p-1 bg-[#071120] rounded-xl border border-slate-800 mt-2">
                  <button
                    type="button"
                    onClick={() => setBookingMode("diy")}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      bookingMode === "diy"
                        ? "bg-[#F6B73C] text-brand-navy"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isBn ? "১. নিজে বুক করুন (Card)" : "1. DIY Self-Booking"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingMode("bdtDesk")}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      bookingMode === "bdtDesk"
                        ? "bg-[#F6B73C] text-brand-navy"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isBn ? "২. BDT ডেস্ক সাপোর্ট" : "2. Pay in BDT Desk"}
                  </button>
                </div>
              </div>

              {bookingMode === "diy" ? (
                <div className="space-y-4 text-xs">
                  <h2 className="ural-section-title font-serif text-base sm:text-lg font-bold text-white">
                    {isBn
                      ? "Dual-Currency Card দিয়ে নিজে ওমরাহ প্ল্যান করার সুবিধা"
                      : "Why Plan Your Own Umrah Itinerary (DIY Route)"}
                  </h2>
                  <ul className="space-y-2.5 text-slate-200 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
                      <span>
                        {isBn
                          ? "ওপেন-জ (Open-Jaw) ফ্লাইট: ঢাকা থেকে জেদ্দা (JED) নেমে ওমরাহ শেষে মদিনা (MED) থেকে সরাসরি ঢাকায় ফিরুন।"
                          : "Open-Jaw Flights: Land in Jeddah (JED) for Makkah first, then fly home directly from Madinah (MED) to avoid backtracking to Jeddah."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
                      <span>
                        {isBn
                          ? "হোটেল পিন যাচাই: ম্যাপ দেখে কাবা শরীফ (Ajyad / Clock Tower) ও মসজিদে নববীর (Markazia) আশপাশের হোটেলের সঠিক দূরত্ব ও ঢাল যাচাই করে বুক করুন।"
                          : "Hotel Pin Control: Verify exact property addresses, street inclines, and shuttle schedules around Ajyad, Clock Tower, or Madinah Markazia before paying."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
                      <span>
                        {isBn
                          ? "Saudia বা Flynas থ্রু-টিকিটে যোগ্য রুটে ৯৬ ঘণ্টার Stopover Visa আবেদনের সুযোগ (চেকআউটের শর্ত সাপেক্ষে)।"
                          : "96-Hour Stopover Option: Eligible Saudia or flynas through-itineraries allow applying for a 96-hour stopover visa (subject to airline checkout terms)."}
                      </span>
                    </li>
                  </ul>
                  <a
                    href="#umrah-step-flights"
                    className="w-full bg-white hover:bg-slate-100 text-brand-navy font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {isBn
                        ? "ধাপ ১: ঢাকা → জেদ্দা ফ্লাইট ভাড়া দেখুন ↓"
                        : "Start Step 1: Compare Dhaka → Jeddah Flights ↓"}
                    </span>
                  </a>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <h2 className="ural-section-title font-serif text-base sm:text-lg font-bold text-white">
                    {isBn
                      ? "পাসপোর্টে ডলার এন্ডোর্সমেন্ট নেই? সম্পূর্ণ BDT-তে বুক করুন"
                      : "No Dual-Currency Card? Book Your Custom Umrah in BDT"}
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {isBn
                      ? "আপনি নিজের পছন্দমতো ফ্লাইট ও মক্কা-মদিনার হোটেল বাছাই করুন—আমাদের ঢাকা টিম অনুমোদিত প্রক্রিয়ায় সৌদি ওমরাহ ভিসা (হোটেল ও ট্রান্সপোর্টসহ), রিটার্ন এয়ার টিকিট ও এয়ারপোর্ট পিকআপ বাংলাদেশি টাকায় (ব্যাংক ট্রান্সফার / bKash / Nagad) সম্পন্ন করতে সহায়তা করবে।"
                      : "Choose your preferred flight dates and Makkah/Madinah hotels—our Dhaka desk assists with authorized Saudi Umrah visa packages (bundled with accommodation and transport per Ministry rules), air tickets, and transfers in BDT."}
                  </p>
                  <div className="bg-[#071120] border border-slate-800 rounded-xl p-3.5 space-y-1">
                    <div className="text-[11px] text-slate-400 font-mono">
                      {isBn ? "সরাসরি ওমরাহ ডেস্ক (ঢাকা):" : "Direct Dhaka Umrah Desk:"}
                    </div>
                    <div className="text-sm font-mono font-bold text-[#F6B73C]">
                      +8801784385335 (WhatsApp & Hotline)
                    </div>
                  </div>
                  <a
                    href="https://wa.me/8801784385335?text=Assalamu%20Alaikum%20URAL%2C%20I%20want%20a%20custom%20Umrah%20quote%20in%20BDT%20(Visa%20%2B%20Flight%20%2B%20Hotels)."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-emerald hover:bg-brand-emerald/90 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {isBn
                        ? "WhatsApp-এ কাস্টম BDT কোটেশন নিন"
                        : "Request Custom BDT Quote on WhatsApp"}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Jump Anchor Navigation Bar (Inside Full-Width Hero) */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-mono text-[#F6B73C] uppercase tracking-wider shrink-0 mr-1">
              {isBn ? "দ্রুত নেভিগেশন:" : "Jump to Section:"}
            </span>
            {[
              {
                href: "#umrah-calculator",
                label: isBn ? "১. BDT বাজেট ক্যালকুলেটর" : "1. BDT Cost Calculator",
              },
              {
                href: "#umrah-diy-vs-agency",
                label: isBn ? "২. DIY বনাম এজেন্সি তুলনা" : "2. DIY vs. Agency Matrix",
              },
              {
                href: "#umrah-step-flights",
                label: isBn ? "৩. ঢাকা → জেদ্দা ফ্লাইট" : "3. Dhaka–Jeddah Flights",
              },
              {
                href: "#umrah-step-hotels",
                label: isBn ? "৪. মক্কা ও মদিনা হোটেল জোন" : "4. Makkah & Madinah Hotels",
              },
              {
                href: "#umrah-visa-nusuk-guide",
                label: isBn ? "৫. ই-ভিসা ও Nusuk গাইড" : "5. e-Visa & Nusuk Steps",
              },
              {
                href: "#umrah-step-essentials",
                label: isBn ? "৬. জিয়ারাহ, ট্রেন ও eSIM" : "6. Transfers, Ziyarah & eSIM",
              },
            ].map((nav, idx) => (
              <a
                key={idx}
                href={nav.href}
                className="text-xs font-medium text-slate-200 hover:text-brand-navy bg-white/8 hover:bg-[#F6B73C] border border-white/12 px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. H2: UMRAH COST FROM BANGLADESH 2026 — INTERACTIVE BDT CALCULATOR
      ===================================================================== */}
      <UmrahBudgetCalculator isBn={isBn} />

      {/* =====================================================================
          3. H2: DIY UMRAH VS. AGENCY PACKAGE QUALITATIVE CHECKLIST (U-13)
      ===================================================================== */}
      <section
        id="umrah-diy-vs-agency"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "বুকিং পদ্ধতি তুলনা ও কোটেশন যাচাইয়ের চেকলিস্ট (U-13)"
              : "Booking Path Comparison & Apples-to-Apples Quote Checklist (Checked 14 Oct 2026)"}
          </span>
          <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "নিজে প্ল্যান করা (DIY) বনাম এজেন্সি ওমরাহ প্যাকেজ: কীভাবে তুলনা করবেন"
              : "DIY Umrah vs. Agency Package: What to Compare Before You Book"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "নিজে বুকিং অথবা এজেন্সি প্যাকেজ—কোনোটিই সবসময় স্বয়ংক্রিয়ভাবে সস্তা নয়। একই তারিখ, একই ফ্লাইট রুট, প্রতি রুমে যাত্রীর সংখ্যা এবং হোটেলের সঠিক ম্যাপ লোকেশন মিলিয়ে তুলনা করার জন্য নিচের ৩টি মানদণ্ড ব্যবহার করুন:"
              : "Neither DIY nor an agency package is automatically cheaper. Ask for itemized written quotes and compare the same dates, flight routing, room occupancy, exact property and inclusions using these three practical checks:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              badge: isBn ? "০১ · ভিসা ও সার্ভিস বান্ডলিং" : "01 · Visa & Service Bundling Rules",
              tier: isBn
                ? "সরাসরি Nusuk বনাম অনুমোদিত এজেন্ট শর্ত"
                : "Direct Nusuk vs. External Agent Rules",
              diyLabel: isBn ? "সরাসরি ও স্টপওভার রুট:" : "Direct / Stopover Route:",
              diyPoint: isBn
                ? "umrah.nusuk.sa-এ বিদেশি যাত্রীদের সরাসরি আবেদনের সুযোগ রয়েছে; অথবা Saudia/flynas থ্রু-টিকিটে ৯৬ ঘণ্টার স্টপওভার ভিসা নেওয়া যায়।"
                : "Overseas pilgrims can apply via umrah.nusuk.sa or use an eligible 96-hour Saudia/flynas stopover visa subject to live portal checkout rules.",
              agencyLabel: isBn ? "এক্সটার্নাল এজেন্টের নিয়ম:" : "External Agent Requirement:",
              agencyPoint: isBn
                ? "সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের FAQ (haj.gov.sa/en/FAQ) অনুযায়ী, কোনো এক্সটার্নাল এজেন্ট হোটেল ও ট্রান্সপোর্ট ছাড়া শুধু স্ট্যান্ডঅ্যালোন ওমরাহ ভিসা ইস্যু করতে পারে না।"
                : "Per the Saudi Ministry of Hajj & Umrah FAQ (haj.gov.sa/en/FAQ), an external agent cannot issue a standalone Umrah visa without bundling accommodation and transport services.",
            },
            {
              badge: isBn ? "০২ · ফ্লাইট ও রুম শেয়ারিং" : "02 · Flights & Room Occupancy",
              tier: isBn
                ? "ওপেন-জ (Open-Jaw) ফ্লাইট ও প্রাইভেট রুম নিয়ন্ত্রণ"
                : "Open-Jaw Routing & Room Sharing Control",
              featured: true,
              diyLabel: isBn ? "নিজে পরিকল্পনার সুবিধা:" : "Self-Planned Control:",
              diyPoint: isBn
                ? "ঢাকা → জেদ্দা (JED) এবং ফিরতি পথে মদিনা (MED) → ঢাকা মাল্টি-সিটি টিকিট ও পরিবারের জন্য নির্দিষ্ট ডাবল/ফ্যামিলি রুম নিজে বেছে নেওয়া যায়।"
                : "Select your own multi-city (DAC → JED, MED → DAC) flight times, baggage tier, and private double/family room occupancy.",
              agencyLabel: isBn ? "গ্রুপ প্যাকেজে যা দেখবেন:" : "What to Check in Group Quotes:",
              agencyPoint: isBn
                ? "অনুমোদিত রুম ওকুপেন্সি, অন্য যাত্রীর সঙ্গে শেয়ারিং এবং বিমানবন্দর/আন্তঃনগর ট্রান্সফারের সব শর্ত লিখিতভাবে নিন। DIY কোটেশনে একই ব্যবস্থা মিলিয়ে তুলনা করুন।"
                : "Ask for the permitted room occupancy, whether you share with other travellers, and every airport/intercity transfer in writing. Compare the same arrangements in your DIY quotes.",
            },
            {
              badge: isBn ? "০৩ · হোটেল পিন ও লিখিত কোটেশন" : "03 · Property Pin & Written Quote",
              tier: isBn
                ? "হোটেলের সঠিক নাম, ঢাল ও ট্রেন টিকিট যাচাই"
                : "Apples-to-Apples Quote Verification Checklist",
              diyLabel: isBn ? "বুকিংয়ের আগে যাচাই:" : "Verify Before Paying:",
              diyPoint: isBn
                ? "শুধু 'হারামের কাছে' কথায় নির্ভর না করে হোটেলের সঠিক নাম, গুগল ম্যাপ পিন, রাস্তার ঢাল (incline) এবং শাটল বাসের সময়সূচি মিলিয়ে নিন।"
                : "Never rely on generic 'walkable' labels—check the exact property name, Google Maps pin, street slope, and hotel shuttle schedule.",
              agencyLabel: isBn ? "একই ভিত্তির তুলনা:" : "Same-Basis Comparison:",
              agencyPoint: isBn
                ? "যেকোনো এজেন্সি কোটেশনের বিপরীতে একই তারিখ, একই হোটেল, Haramain ট্রেন (নাকি বাস) ও ভিসা-ইনস্যুরেন্সের খাতওয়ারি হিসাব মিলিয়ে সিদ্ধান্ত নিন।"
                : "Ask for itemized written inclusions (exact hotel names, Haramain rail vs. highway bus, visa/insurance, and baggage) on the same dates before comparing totals.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border flex flex-col justify-between space-y-4 ${
                card.featured
                  ? "bg-brand-navy text-white border-[#F6B73C]"
                  : "bg-slate-50 text-slate-900 border-slate-200"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-mono font-bold ${
                      card.featured ? "text-[#F6B73C]" : "text-brand-navy"
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3
                  className={`font-serif text-lg font-bold ${
                    card.featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {card.tier}
                </h3>
              </div>

              <div
                className={`pt-4 border-t space-y-3 text-xs leading-relaxed ${
                  card.featured ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <div>
                  <span
                    className={`font-bold block mb-0.5 ${
                      card.featured ? "text-[#F6B73C]" : "text-slate-900"
                    }`}
                  >
                    {card.diyLabel}
                  </span>
                  <span className={card.featured ? "text-slate-200" : "text-slate-600"}>
                    {card.diyPoint}
                  </span>
                </div>
                <div>
                  <span
                    className={`font-bold block mb-0.5 ${
                      card.featured ? "text-emerald-300" : "text-slate-800"
                    }`}
                  >
                    {card.agencyLabel}
                  </span>
                  <span className={card.featured ? "text-slate-300" : "text-slate-600"}>
                    {card.agencyPoint}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
          {isBn
            ? "একই তারিখ, সময়কাল, রুম ওকুপেন্সি, ফ্লাইট ও অন্তর্ভুক্তির itemized কোটেশন ছাড়া URAL কোনো এজেন্সি-সাশ্রয়ের সংখ্যা প্রকাশ করতে পারে না। এজেন্সির কাছ থেকে কোটেশন নিলে প্রতিটি লাইন আলাদা করে মিলিয়ে দেখুন — শুধু হেডলাইন দাম নয়।"
            : "URAL cannot publish an agency-savings figure without a matched, itemized quote on the same dates, duration, room occupancy, flight and inclusions. If an agency quotes you, compare every line — not just the headline."}
        </p>
      </section>

      {/* =====================================================================
          4. H2: STEP 01 — DHAKA TO JEDDAH (JED) & MADINAH (MED) FLIGHT ROUTING
      ===================================================================== */}
      <section
        id="umrah-step-flights"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০১ · ঢাকা (DAC) থেকে জেদ্দা (JED) ও মদিনা (MED) ফ্লাইট রুট"
              : "Step 01 · Dhaka (DAC) to Jeddah (JED) & Madinah (MED) Flight Routing"}
          </span>
          <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "ঢাকা থেকে জেদ্দা ও মদিনা ফ্লাইট তুলনা (ডিরেক্ট, ১-স্টপ ট্রানজিট ও ওপেন-জ)"
              : "Dhaka to Jeddah (JED) & Madinah (MED) Flight Options: Direct, Transit & Open-Jaw"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "ওমরাহ বাজেটের সবচেয়ে বড় পরিবর্তনশীল খাত হলো বিমানের টিকিট, যা মৌসুম, সিট ক্লাস এবং ব্যাগেজ শর্তের ওপর নির্ভর করে। নিচে ডিরেক্ট ফ্লাইট, মধ্যপ্রাচ্য ট্রানজিট এবং ওপেন-জ (Multi-City) রুটের নিয়ম ও লাইভ সার্চ ইঞ্জিন দেওয়া হলো:"
              : "Airfare is typically the largest variable component of an Umrah trip from Bangladesh and fluctuates by season, departure window, and fare family. Compare non-stop carriers, 1-stop Gulf transit routes, and open-jaw (multi-city) itineraries below:"}
          </p>
        </div>

        {/* 3 H3 Flight Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-semibold text-brand-navy">
              Non-Stop DAC–JED / DAC–MED · Check Carrier Terms
            </span>
            <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
              {isBn
                ? "১. ডিরেক্ট ফ্লাইট (Saudia ও Biman Bangladesh)"
                : "1. Direct Flights (Saudia & Biman Bangladesh)"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "বয়স্ক বাবা-মা ও পরিবারের জন্য Saudia এবং Biman Bangladesh ঢাকা থেকে জেদ্দা (JED) ও মদিনা (MED) রুটে সরাসরি ফ্লাইট পরিচালনা করে। কেবিনে মীকাত ঘোষণা করা হয়; ফেরার পথে ৫ লিটার সিল করা জমজম পানির নিয়ম ও চেকড ব্যাগেজ সীমা টিকিট কাটার সময় সংশ্লিষ্ট এয়ারলাইন্সের পোর্টালে (saudia.com / biman-airlines.com) যাচাই করুন।"
                : "Saudia and Biman Bangladesh operate non-stop flights linking Dhaka (DAC) with Jeddah (JED) and Madinah (MED) with onboard Miqat announcements. Verify live fares, checked baggage allowances, and carrier-specific 5-liter sealed Zamzam carriage rules directly on saudia.com or biman-airlines.com before booking."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-semibold text-emerald-700">
              1-Stop Gulf Transit · Compare Total Fare + Baggage
            </span>
            <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
              {isBn
                ? "২. ১-স্টপ ট্রানজিট (flynas, SalamAir, Kuwait ও Air Arabia)"
                : "2. 1-Stop Transit (flynas, SalamAir, Kuwait & Air Arabia)"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "মাস্কাট, শারজাহ, কুয়েত বা বাহরাইন হয়ে ১-স্টপ ফ্লাইটে অনেক সময় অফ-পিক মৌসুমে কম ভাড়া পাওয়া যায়। তবে লো-কস্ট ক্যারিয়ারে চেকড ব্যাগেজ (২০–৩০ কেজি), খাবার এবং ফেরার পথে জমজম পানির চার্জ আলাদা হতে পারে—চূড়ান্ত ভাড়ার সাথে এগুলো যোগ করে তুলনা করুন।"
                : "One-stop connections via Muscat, Sharjah, Kuwait, or Bahrain can price lower during off-peak periods, though fares vary by season. On low-cost carriers, always check whether 20–30 kg checked baggage, meals, and return Zamzam carriage are included or charged separately."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-semibold text-brand-navy">
              Multi-City Routing · JED Arrival & MED Return
            </span>
            <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
              {isBn
                ? "৩. ওপেন-জ (Open-Jaw) কৌশল: JED অবতরণ, MED প্রস্থান"
                : "3. Open-Jaw Strategy: Land JED, Depart MED"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "মাল্টি-সিটি অপশনে ঢাকা → জেদ্দা (JED) এবং ফেরার পথে মদিনা (MED) → ঢাকা বুক করুন। জেদ্দা এয়ারপোর্ট (KAIA স্টেশন) থেকে Haramain ট্রেনে (SAR 65 বেস ইকোনমি + VAT, ১৪ অক্টো ২০২৬) বা সড়কপথে মক্কায় যান, এরপর মক্কা–মদিনা বুলেট ট্রেনে (SAR 162 বেস ইকোনমি + VAT, ~২ ঘণ্টা ২০ মিনিট) মদিনায় গিয়ে সরাসরি MED এয়ারপোর্ট থেকে ফিরুন।"
                : "Book Multi-City: fly Dhaka → Jeddah (JED), transfer from KAIA Terminal 1 to Makkah by Haramain rail (SAR 65 base Economy before VAT, checked 14 Oct 2026) or road (~60–90 mins to hotel door), take the Makkah–Madinah bullet train (SAR 162 base Economy before VAT, ~2h 20m), and fly home directly from Madinah Airport (MED)."}
            </p>
          </div>
        </div>

        <TravelpayoutsEmbed defaultDestination="JED" />
      </section>

      {/* =====================================================================
          5. H2: STEP 02 — MAKKAH & MADINAH HOTEL ZONES (QUALIFIED PER U-11)
      ===================================================================== */}
      <section
        id="umrah-step-hotels"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০২ · মক্কা ও মদিনার হোটেল এলাকা পরিচিতি (U-11)"
              : "Step 02 · Makkah & Madinah Accommodation Search Zones (U-11)"}
          </span>
          <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "মক্কা ও মদিনায় কোথায় থাকবেন? হোটেল জোন ও ম্যাপ যাচাইয়ের গাইড"
              : "Where to Stay in Makkah & Madinah: Neighborhood Starting Points"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "শুধু এলাকার নাম দেখে কোনো হোটেলের সঠিক হাঁটার দূরত্ব, রাস্তার ঢাল, বন্ধ রাস্তার বিকল্প পথ বা শাটলের নিশ্চয়তা পাওয়া যায় না। নিচের ৩টি জোনকে খোঁজার সূচনা হিসেবে নিন; বুকিং সাইটে নির্দিষ্ট হোটেলের ঠিকানা, আপনার তারিখের মোট মূল্য এবং কাঙ্ক্ষিত গেটের পথ যাচাই করুন:"
              : "Neighborhood names alone do not establish a hotel's exact walking distance, street incline, road-closure diversions, or shuttle frequency. Use these three areas as starting points, then check the specific property's address, total for your dates, and route to your intended gate on the booking site:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              zone: isBn
                ? "১. আবরাজ আল বাইত (Clock Tower) ও Jabal Omar"
                : "1. Abraj Al Bait (Clock Tower) & Jabal Omar",
              dist: isBn ? "হারাম চত্বর সংলগ্ন জোন · পিন যাচাই করুন" : "Courtyard Perimeter Zone · Verify Exact Tower Pin",
              bookingCheck: isBn ? "নির্দিষ্ট টাওয়ার, রুম/ভিউ ও তারিখ মিলিয়ে মোট মূল্য তুলনা করুন" : "Compare the exact tower, room/view and total for your dates",
              desc: isBn
                ? "কাবা চত্বরের ঠিক পাশের বহুতল কমপ্লেক্স ও শপিং মল এলাকা। তবে বড় কমপ্লেক্সের ভেতর কোন টাওয়ার এবং লিফট লবি থেকে চত্বরে নামতে কতটুকু হাঁটতে হয় তা নির্দিষ্ট হোটেলের রিভিউ দেখে নিশ্চিত করুন।"
                : "High-rise complexes bordering the southern and western Haram plazas with indoor mall and food-court access. Because tower blocks vary in distance and elevator changes, check the exact tower pin and lobby-to-courtyard access route.",
            },
            {
              zone: isBn
                ? "২. আজইয়াদ (Ajyad), ইব্রাহিম আল খলিল রোড ও শাটল জোন"
                : "2. Ajyad, Ibrahim Al Khalil Road & Outer Shuttle Zones",
              dist: isBn ? "সেন্ট্রাল করিডোর ও শাটল এরিয়া · ঢাল যাচাই করুন" : "Central Corridors & Shuttle Zones · Check Street Slope",
              bookingCheck: isBn ? "শাটলের সময়সূচি, ওঠার স্থান ও পরিবহন খরচ হোটেলের কাছে যাচাই করুন" : "Ask the hotel about shuttle times, pickup point and transport cost",
              desc: isBn
                ? "ইব্রাহিম আল খলিল রোড ও আজইয়াদে প্রচুর দক্ষিণ এশীয় খাবার ও ফার্মেসি রয়েছে, তবে আজইয়াদের কিছু শাখা রাস্তায় ঢাল (incline) আছে। আর Kudai বা Aziziyah জোনে বুক করলে হোটেলের নিজস্ব শাটল বাসের সময়সূচি ও ড্রপ-অফ পয়েন্ট আগেই লিখিতভাবে জেনে নিন।"
                : "Ibrahim Al Khalil Road and Ajyad offer South Asian dining and pharmacies, though side streets off Ajyad can have uphill gradients. For outer zones (Kudai / Aziziyah), verify the hotel's current shuttle timetable and drop-off terminal directly with the property.",
            },
            {
              zone: isBn
                ? "৩. মদিনা সেন্ট্রাল এরিয়া (Markazia — ১ম রিং রোডের ভেতর)"
                : "3. Madinah Central Area (Markazia Inside 1st Ring Road)",
              dist: isBn ? "মসজিদে নববী চত্বর এলাকা · বর্তমান গেট দেখুন" : "Masjid an-Nabawi Perimeter · Check Current Gate Access",
              bookingCheck: isBn ? "নির্দিষ্ট হোটেলের দিক, রুম ও তারিখ মিলিয়ে মোট মূল্য ও প্রবেশপথ যাচাই করুন" : "Check the exact hotel's side, room, date-specific total and access route",
              desc: isBn
                ? "মদিনায় ১ম রিং রোডের ভেতর (Markazia North/West/South) হোটেল নিলে মসজিদে নববীর চত্বরে সহজে যাওয়া যায়। নারী যাত্রীদের প্রবেশের গেট ও রিয়াজুল জান্নাত (Al-Rawdah) ভিজিটের সময়সূচি পরিবর্তনশীল—বুকিংয়ের সময় হোটেলের অবস্থান ও অফিসিয়াল Nusuk অ্যাপের নির্দেশনা মিলিয়ে নিন।"
                : "Staying inside Madinah's 1st Ring Road (Markazia) places you around the Prophet's Mosque courtyard perimeter. Because women's prayer section gates and Al-Rawdah entry arrangements can change, check the property's exact side (North/West/South) and follow the live instructions in your Nusuk permit.",
            },
          ].map((z, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-mono text-brand-navy font-semibold">{z.dist}</div>
                <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">{z.zone}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{z.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-xs font-mono font-bold text-slate-900">
                {z.bookingCheck}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3">
          <h3 className="ural-card-title font-serif text-base font-bold text-brand-navy">
            {isBn
              ? "মক্কা বা মদিনার হোটেল তালিকা খুঁজুন:"
              : "Search hotel listings for Makkah or Madinah:"}
          </h3>
          <TravelpayoutsCustomWidget
            initialTab="hotels"
            initialHotelCity="Makkah"
            initialTo="Jeddah (JED)"
          />
        </div>
      </section>

      {/* =====================================================================
          6. H2: STEP 03 — SAUDI UMRAH VISA ROUTES, NUSUK & BIOMETRICS (U-01..U-09)
      ===================================================================== */}
      <section
        id="umrah-visa-nusuk-guide"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০৩ · সৌদি ওমরাহ ভিসার ৩টি ক্যাটাগরি, বায়োমেট্রিক্স ও Nusuk (১৪ অক্টো ২০২৬ যাচাইকৃত)"
              : "Step 03 · Eligible Saudi Visa Pathways, Biometrics, Health & Nusuk Rules (Checked 14 Oct 2026)"}
          </span>
          <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "বাংলাদেশি পাসপোর্টে ওমরাহ ভিসা রুট, Saudi Visa Bio এবং Nusuk পারমিটের নিয়ম"
              : "Saudi Umrah Visa Pathways, Biometrics & Nusuk Permit Checklist from Bangladesh"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: "01 · 3 Visa Pathways (U-01–U-04)",
              title: isBn
                ? "স্ট্যান্ডার্ড ওমরাহ, ৯৬ ঘণ্টার স্টপওভার ও যোগ্য ট্যুরিস্ট রুট"
                : "Standard Umrah, 96-Hour Stopover & Eligible Tourist Routes",
              body: isBn
                ? "১) স্ট্যান্ডার্ড ওমরাহ ভিসা: umrah.nusuk.sa বা অনুমোদিত এক্সটার্নাল এজেন্টের মাধ্যমে (এজেন্টের ক্ষেত্রে হোটেল ও ট্রান্সপোর্ট বান্ডল বাধ্যতামূলক — haj.gov.sa/en/FAQ)। ২) ৯৬ ঘণ্টার স্টপওভার ভিসা: Saudia বা flynas থ্রু-টিকিটে (visitsaudi.com)। ৩) ট্যুরিস্ট ভিসা রুট: সাধারণ বাংলাদেশি পাসপোর্ট একক ন্যাশনালিটি ই-ভিসা তালিকায় নেই; তবে Package Visa, পূর্বে ব্যবহৃত বৈধ US/UK/Schengen ভিসাধারীদের VOA বা যোগ্য GCC রেসিডেন্ট রুট প্রযোজ্য।"
                : "1) Standard Umrah Visa via umrah.nusuk.sa or an approved external agent (external agents must bundle hotel + transport per haj.gov.sa/en/FAQ). 2) 96-Hour Stopover Visa on Saudia or flynas through-tickets (visitsaudi.com). 3) Tourist routes: ordinary BD passports are not on the standalone nationality eVisa list (visa.visitsaudi.com), but may qualify via Package Visa, Visa-on-Arrival with a valid used US/UK/Schengen visa, or GCC residency.",
            },
            {
              step: "02 · Biometrics & Health (U-07–U-08)",
              title: isBn
                ? "Saudi Visa Bio অ্যাপ ও মেনিনজাইটিস (ACYW) টিকা"
                : "Saudi Visa Bio App & Mandatory ACYW Vaccine",
              body: isBn
                ? "সৌদি মন্ত্রণালয়ের FAQ (haj.gov.sa/en/FAQ) ইলেকট্রনিক ওমরাহ ভিসার বায়োমেট্রিক্স তালিকায় বাংলাদেশের নাম অন্তর্ভুক্ত করেছে—আপনার ভিসা আবেদনের নির্দেশনা অনুযায়ী অফিসিয়াল 'Saudi Visa Bio' অ্যাপে মুখের ছবি ও আঙুলের ছাপ দিন। এছাড়া সৌদি স্বাস্থ্য মন্ত্রণালয়ের ১৪৪৭ হিজরি নিয়ম (moh.gov.sa) অনুযায়ী ভ্রমণের কমপক্ষে ১০ দিন আগে নেওয়া কোয়াড্রিভ্যালেন্ট ACYW মেনিনজাইটিস টিকার সনদ আবশ্যক।"
                : "The Ministry FAQ (haj.gov.sa/en/FAQ) lists Bangladesh for electronic Umrah-visa biometrics via the official 'Saudi Visa Bio' app—follow your visa channel's instructions. Under the 1447H Saudi MOH health regulations PDF (moh.gov.sa), all Umrah travelers must hold a valid quadrivalent ACYW meningococcal vaccination certificate administered at least 10 days before arrival.",
            },
            {
              step: "03 · Nusuk & 1448H Window (U-02, U-09)",
              title: isBn
                ? "Nusuk পারমিট ও ১৪৪৮ হিজরি মৌসুমের সময়সীমা"
                : "Nusuk Permits & 1448H Season Calendar",
              body: isBn
                ? "মক্কায় ওমরাহ এবং মদিনায় আল-রওজা আল-শরীফাহ (Rawdah) জিয়ারতের ফ্রি অ্যাপয়েন্টমেন্ট পারমিটের জন্য অফিসিয়াল Nusuk অ্যাপ/ওয়েবসাইটে (haj.gov.sa) উপলব্ধ স্লট বুক করুন (স্লট রিলিজের নির্দিষ্ট সাপ্তাহিক দিন নির্ধারিত নয়)। ১৪৪৮ হিজরি ক্যালেন্ডার অনুযায়ী ভিসা ইস্যুর শেষ তারিখ ৯ মার্চ ২০২৭, সর্বশেষ প্রবেশ ২৩ মার্চ ২০২৭ এবং সর্বশেষ প্রস্থান ৭ এপ্রিল ২০২৭।"
                : "Reserve your Umrah slot and free Al-Rawdah Al-Sharifiyah appointment permit in the official Nusuk app/portal (haj.gov.sa E-Services); slot availability is dynamic with no fixed weekly release day. For the 1448H season (checked 14 Oct 2026), final visa issuance is 9 March 2027, final entry is 23 March 2027, and final departure is 7 April 2027.",
            },
            {
              step: "04 · Fard Hajj Separation (U-05–U-06)",
              title: isBn
                ? "ফরজ হজ্জের পৃথক নিবন্ধন ও পারমিট লঙ্ঘনের জরিমানা"
                : "Fard Hajj Registration & Permit-Violation Rules",
              body: isBn
                ? "ওমরাহ, স্টপওভার বা ভিজিট ভিসা দিয়ে কখনোই ফরজ হজ্জ পালন করা যায় না। বাংলাদেশি হজ্জযাত্রীদের অবশ্যই ধর্ম মন্ত্রণালয়ের hajj.gov.bd পোর্টালে নিবন্ধন করতে হয়। সৌদি প্রেস এজেন্সির (spa.gov.sa/en/N2559888) ১৪৪৭ হিজরি বিজ্ঞপ্তি অনুযায়ী হজ্জ পারমিট ছাড়া হজ্জের চেষ্টা বা নিষিদ্ধ সময়ে মক্কায় প্রবেশে সর্বোচ্চ SAR 20,000 জরিমানা এবং বহিষ্কৃত অনুপ্রবেশকারীদের ক্ষেত্রে ১০ বছরের নিষেধাজ্ঞা প্রযোজ্য।"
                : "An Umrah, stopover, or visit visa never permits Fard Hajj. Bangladeshi pilgrims must register through hajj.gov.bd. Under the 1447H Interior Ministry notice reported by SPA (spa.gov.sa/en/N2559888), performing or attempting Hajj without a permit or entering Makkah during restriction dates carries a fine up to SAR 20,000, with a 10-year re-entry ban for deported infiltrators/overstayers.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-brand-navy block">
                  {item.step}
                </span>
                <h3 className="ural-card-title font-serif text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. H2: STEP 04 — JEDDAH TRANSFER, KLOOK ZIYARAH TOURS & SAUDI eSIM
      ===================================================================== */}
      <section
        id="umrah-step-essentials"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০৪ · এয়ারপোর্ট পিকআপ, মক্কা-মদিনা জিয়ারাহ ও সৌদি eSIM"
              : "Step 04 · Jeddah Airport Pickup, Makkah/Madinah Ziyarah & Saudi eSIM"}
          </span>
          <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "জেদ্দা এয়ারপোর্ট প্রাইভেট কার, মক্কা-মদিনা জিয়ারাহ ট্যুর ও সৌদি ডাটা সিম"
              : "Jeddah Airport Private Pickup, Guided Ziyarah Tours & Saudi Arabia eSIM"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. Jeddah Airport to Makkah Hotel Private Car */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-brand-navy">
                01. Jeddah (JED) → Makkah Hotel
              </span>
              <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
                {isBn
                  ? "প্রাইভেট এয়ারপোর্ট পিকআপ (Welcome Pickups / Kiwitaxi)"
                  : "Private Arrival Gate Meet & Greet to Makkah"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "ইহরাম বাঁধা অবস্থায় দীর্ঘ ফ্লাইটের পর ট্যাক্সি চালকদের সাথে দরদাম না করে আগে থেকেই প্রাইভেট সেডান বা ফ্যামিলি ভ্যানের রেট দেখে নিতে পারেন (সড়কপথে সাধারণত ~৬০–৯০ মিনিট)।"
                  : "Avoid haggling in Ihram outside Jeddah Terminal 1. Compare pre-booked private car or family minivan transfers directly to your Makkah hotel door (~60–90 mins by road)."}
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <PartnerLinkButton
                href={AFFILIATE_LINKS.welcomePickups}
                label={isBn ? "Welcome Pickups রেট দেখুন" : "Check Welcome Pickups Transfer"}
                variant="dark"
              />
              <PartnerLinkButton
                href={AFFILIATE_LINKS.kiwitaxi}
                label={isBn ? "Kiwitaxi প্রাইভেট কার দেখুন" : "Compare on Kiwitaxi"}
              />
            </div>
          </div>

          {/* 2. Klook Makkah/Madinah Ziyarah & Haramain High-Speed Rail */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-brand-navy">
                02. Ziyarah & Bullet Train (Klook)
              </span>
              <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
                {isBn
                  ? "মক্কা ও মদিনার ঐতিহাসিক জিয়ারাহ ট্যুর এবং তায়েফ ডে-ট্রিপ"
                  : "Makkah & Madinah Guided Ziyarah + Taif Day Tours"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "জাবালে নূর (হেরা গুহা), জাবালে সাওর, আরাফাত, মিনা, উহুদ পাহাড় ও মসজিদে কুবা ভ্রমণের জন্য Klook-এ প্রাইভেট জিয়ারাহ ট্যুরের অপশন ও শর্ত যাচাই করুন।"
                  : "Compare private air-conditioned Ziyarah tours covering Jabal al-Nour, Mount Uhud, Masjid Quba, and Badr/Taif day excursions on Klook."}
              </p>
            </div>
            <div className="pt-2">
              <PartnerLinkButton
                href={AFFILIATE_LINKS.klook}
                label={
                  isBn
                    ? "Klook-এ জিয়ারাহ ও সৌদি ট্যুর দেখুন"
                    : "Book Saudi Ziyarah Tours on Klook"
                }
                variant="dark"
              />
            </div>
          </div>

          {/* 3. Airalo Saudi Arabia (Nusuk App Ready) eSIM */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-brand-navy">
                03. Instant Saudi Data (Airalo eSIM)
              </span>
              <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
                {isBn
                  ? "Nusuk অ্যাপ ও পরিবারের সাথে যোগাযোগের জন্য সৌদি eSIM"
                  : "Saudi Arabia Local eSIM for Nusuk & WhatsApp"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "সৌদি আরবে পৌঁছানোর পর Nusuk অ্যাপ, ম্যাপ ও পরিবারের সাথে যোগাযোগের জন্য ঢাকা থেকেই আপনার ফোনের eSIM সাপোর্ট, কভারেজ ও মেয়াদ যাচাই করে ডাটা প্যাক নিতে পারেন।"
                  : "Check device compatibility, coverage, and validity before departure so you have mobile data ready for Nusuk permits, navigation, and WhatsApp upon landing."}
              </p>
            </div>
            <div className="pt-2">
              <PartnerLinkButton
                href={AFFILIATE_LINKS.airalo}
                label={isBn ? "সৌদি আরব eSIM সংগ্রহ করুন" : "Get Saudi Arabia eSIM on Airalo"}
                variant="dark"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. CONTEXTUAL AIRHELP FLIGHT PROTECTION, CLUSTER DIRECTORY & SOURCES
      ===================================================================== */}
      <AirHelpWidget
        lang={lang}
        routeLabel={
          isBn
            ? "ঢাকা → জেদ্দা / মদিনা ও মধ্যপ্রাচ্য ট্রানজিট ফ্লাইট সুরক্ষা"
            : "Dhaka → Jeddah / Madinah & Middle East Transit Protection"
        }
        compact
      />

      <section className="space-y-4">
        <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-bold text-slate-900">
          {isBn
            ? "ওমরাহ ও হজ্জ বিষয়ক বিস্তারিত গাইড ও চেকলিস্ট"
            : "In-Depth Umrah & Hajj Editorial Playbooks"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href={blogHref("umrah-hajj-guide-bangladesh-nusuk-bdt-cost")}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(blogHref("umrah-hajj-guide-bangladesh-nusuk-bdt-cost"));
            }}
            className="block bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-6 space-y-2 cursor-pointer transition-colors"
          >
            <span className="text-xs font-mono text-brand-navy font-semibold">
              {isBn ? "বিস্তারিত গাইড ০১ · মূল প্রক্রিয়া গাইড" : "In-Depth Playbook 01 · Main Process Guide"}
            </span>
            <h3 className="ural-card-title font-serif text-lg font-bold text-slate-900">
              {isBn
                ? "বাংলাদেশ থেকে DIY Umrah: Nusuk ও ভিসা রুট এবং BDT বাজেট (২০২৬–২৭)"
                : "DIY Umrah from Bangladesh: Nusuk & Visa Routes, BDT Budget (2026–27)"}
            </h3>
            <p className="text-xs text-slate-600">
              {isBn
                ? "ভিসা রুট, পারমিট প্রস্তুতি, ট্রেন পরিকল্পনা ও পুরোনো পুনর্মূল্যায়িত নয় এমন বাজেট রেফারেন্স পড়ুন। বুকিংয়ের আগে মৌসুমনির্ভর উৎস আবার যাচাই করুন →"
                : "Read the detailed process guide: visa routes, permit preparation, rail planning and the dated, unre-priced budget reference. Re-check season-sensitive sources before booking →"}
            </p>
          </a>

          <a
            href={blogHref("makkah-madinah-hotel-zones-haramain-train-guide-bangladesh")}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(blogHref("makkah-madinah-hotel-zones-haramain-train-guide-bangladesh"));
            }}
            className="block bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-6 space-y-2 cursor-pointer transition-colors"
          >
            <span className="text-xs font-mono text-brand-navy font-semibold">
              {isBn ? "বিস্তারিত গাইড ০২ · হোটেল ও ট্রেন" : "In-Depth Playbook 02 · Hotels & Rail"}
            </span>
            <h3 className="ural-card-title font-serif text-lg font-bold text-slate-900">
              {isBn
                ? "মক্কা ও মদিনার হোটেল জোন গাইড এবং Haramain High-Speed Train টিউটোরিয়াল"
                : "Makkah & Madinah Hotel Zones + Haramain High-Speed Train Guide for Bangladeshis"}
            </h3>
            <p className="text-xs text-slate-600">
              {isBn
                ? "মক্কা-মদিনার এলাকাভিত্তিক হোটেল তুলনা, হুইলচেয়ার অ্যাক্সেস যাচাই এবং Haramain বুলেট ট্রেন বুকিংয়ের নিয়ম পড়ুন →"
                : "Compare Makkah and Madinah hotel neighborhoods, accessibility checks, and official Haramain High-Speed Railway booking rules →"}
            </p>
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
            {isBn ? "বিষয়ভিত্তিক স্পেশালিস্ট গাইড" : "Specialist Guides by Topic"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              {
                group: isBn ? "ভিসা ও পারমিট" : "Visa & permits",
                links: [
                  {
                    slug: "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
                    label: isBn
                      ? "Nusuk অ্যাপ, Saudi Visa Bio ও Rawdah পারমিট গাইড"
                      : "Nusuk app, Saudi Visa Bio & Rawdah permit guide",
                    note: isBn
                      ? "ই-ভিসা বায়োমেট্রিক (যেখানে প্রযোজ্য), স্লট বুকিং ও পারমিট ধাপ"
                      : "e-Visa biometrics where required, slot booking and permit steps",
                  },
                  {
                    slug: "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
                    label: isBn
                      ? "৯৬ ঘণ্টার Saudi Stopover Visa গাইড"
                      : "96-hour Saudi Stopover Visa guide",
                    note: isBn
                      ? "যোগ্যতা, শর্ত ও বুকিং ধাপ (ফি চেকআউটে দেখুন)"
                      : "Eligibility, conditions and booking steps (fees shown at checkout)",
                  },
                ],
              },
              {
                group: isBn ? "ফ্লাইট, হোটেল ও রেল" : "Flights, hotels & rail",
                links: [
                  {
                    slug: "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia",
                    label: isBn
                      ? "ওপেন-জ ফ্লাইট কৌশল (DAC → JED, MED → DAC)"
                      : "Open-jaw flight strategy (DAC → JED, MED → DAC)",
                    note: isBn
                      ? "মাল্টি-সিটি বুকিং ও রিটার্ন ড্রাইভ এড়ানোর নিয়ম"
                      : "Multi-city booking and skipping the return drive",
                  },
                  {
                    slug: "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
                    label: isBn
                      ? "হোটেল জোন ও Haramain ট্রেন গাইড"
                      : "Hotel zones & Haramain train guide",
                    note: isBn
                      ? "জোনভিত্তিক সন্ধান ও ট্রেন টিকিট বুকিং"
                      : "Zone-by-zone search and train ticket booking",
                  },
                ],
              },
              {
                group: isBn ? "পরিবার ও প্রবেশযোগ্যতা" : "Family & accessibility",
                links: [
                  {
                    slug: "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide",
                    label: isBn
                      ? "বয়স্ক বাবা-মাকে নিয়ে ওমরাহ"
                      : "Umrah with elderly parents",
                    note: isBn
                      ? "হুইলচেয়ার, ওষুধ ও সহজ পরিকল্পনা"
                      : "Wheelchairs, medication and easier pacing",
                  },
                  {
                    slug: "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates",
                    label: isBn
                      ? "নারীদের ওমরাহ নিয়ম: মাহরাম, ভিসা ও লেডিস গেট"
                      : "Umrah rules for women: mahram, visa & ladies' gates",
                    note: isBn
                      ? "নারী যাত্রীদের জন্য প্রযোজ্য নিয়ম"
                      : "What applies to women travelers",
                  },
                ],
              },
              {
                group: isBn ? "প্রস্তুতি ও মৌসুম" : "Preparation & seasonal",
                links: [
                  {
                    slug: "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules",
                    label: isBn
                      ? "ইহরাম ও মীকাত: ঢাকা এয়ারপোর্ট বনাম ট্রানজিট"
                      : "Ihram & Miqat: Dhaka airport vs. transit",
                    note: isBn
                      ? "কোথায় ও কখন ইহরাম পরবেন"
                      : "Where and when to assume Ihram",
                  },
                  {
                    slug: "ramadan-umrah-itikaf-guide-bangladesh-booking-budget",
                    label: isBn
                      ? "রমজান ওমরাহ ও ইতিকাফ গাইড"
                      : "Ramadan Umrah & Itikaf guide",
                    note: isBn
                      ? "রমজানের বুকিং ও বাজেট পরিকল্পনা"
                      : "Ramadan booking and budget planning",
                  },
                  {
                    slug: "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport",
                    label: isBn
                      ? "জমজম পানি ও কাস্টমস নিয়ম"
                      : "Zamzam water & customs rules",
                    note: isBn
                      ? "ফেরার পথে বহন ও ঢাকা এয়ারপোর্ট নিয়ম"
                      : "Carrying it home and DAC airport rules",
                  },
                ],
              },
              {
                group: isBn ? "খাবার ও জিয়ারত" : "Food & Ziyarah",
                links: [
                  {
                    slug: "bangladeshi-halal-food-guide-makkah-madinah-budget-meals",
                    label: isBn
                      ? "মক্কা-মদিনায় বাংলাদেশি ও বাজেট খাবার"
                      : "Bangladeshi & budget food in Makkah–Madinah",
                    note: isBn
                      ? "সস্তায় খাবারের ব্যবস্থা"
                      : "Eating affordably",
                  },
                  {
                    slug: "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide",
                    label: isBn
                      ? "ঐতিহাসিক জিয়ারাহ ও ট্যাক্সি গাইড"
                      : "Historical Ziyarah & taxi guide",
                    note: isBn
                      ? "মক্কা-মদিনা, বদর ও তায়েফের রুট"
                      : "Makkah, Madinah, Badr and Taif routes",
                  },
                ],
              },
              {
                group: isBn ? "হজ (আলাদা প্রক্রিয়া)" : "Hajj (separate process)",
                links: [
                  {
                    slug: "hajj-registration-bangladesh-government-vs-private-package-cost",
                    label: isBn
                      ? "বাংলাদেশ থেকে হজ নিবন্ধন ও প্যাকেজ"
                      : "Bangladesh Hajj registration & packages",
                    note: isBn
                      ? "সরকারি বনাম প্রাইভেট প্যাকেজ; ওমরাহ ভিসায় হজ নয়"
                      : "Government vs. private packages; Hajj is not on an Umrah visa",
                  },
                ],
              },
            ].map((g) => (
              <div key={g.group} className="space-y-2">
                <h4 className="text-xs font-mono font-semibold text-brand-navy uppercase tracking-wider">
                  {g.group}
                </h4>
                <ul className="space-y-2">
                  {g.links.map((l) => (
                    <li key={l.slug}>
                      <a
                        href={blogHref(l.slug)}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(blogHref(l.slug));
                        }}
                        className="block group cursor-pointer"
                      >
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-navy">
                          {l.label}
                        </span>
                        <span className="block text-xs text-slate-500">{l.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Primary Official Sources & Portals (Checked 14 October 2026) */}
      <section
        id="umrah-official-sources"
        className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "অফিসিয়াল সোর্স ও সরকারি পোর্টাল (যাচাইয়ের তারিখ: ১৪ অক্টোবর ২০২৬)"
              : "Verified Official Sources & Portals (Checked 14 October 2026)"}
          </span>
          <h2 className="ural-section-title font-serif text-lg sm:text-xl font-bold text-slate-900">
            {isBn
              ? "ভিসা, Nusuk, স্বাস্থ্যবিধি, Haramain ট্রেন ও হজ্জ নিবন্ধনের প্রাথমিক উৎসসমূহ"
              : "Primary Government, Airline & Rail Portals Used on This Hub"}
          </h2>
          <p className="text-xs text-slate-600">
            {isBn
              ? "মৌসুমভিত্তিক তারিখ, ভিসার শর্ত, ট্রেনের ভাড়া ও এয়ারলাইন্স ব্যাগেজ নিয়ম পরিবর্তনশীল। বুকিংয়ের আগে নিচের অফিসিয়াল পোর্টালগুলো থেকে সর্বশেষ তথ্য মিলিয়ে নিন:"
              : "Seasonal calendars, visa rules, rail tariffs, and carrier baggage policies can change. Confirm live conditions directly on these official portals before booking:"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              label: isBn
                ? "১. সৌদি হজ ও ওমরাহ মন্ত্রণালয় — Nusuk Umrah ঘোষণা ও FAQ"
                : "1. Saudi Ministry of Hajj & Umrah — Official FAQ & Nusuk Rules",
              url: "https://haj.gov.sa/en/FAQ",
            },
            {
              label: isBn
                ? "২. Nusuk Umrah — বিদেশি যাত্রীদের সরাসরি নিবন্ধন"
                : "2. Nusuk Umrah — Overseas Pilgrim Registration Portal",
              url: "https://umrah.nusuk.sa/registration/signup",
            },
            {
              label: isBn
                ? "৩. সৌদি মন্ত্রণালয় — ১৪৪৮ হিজরি ওমরাহ মৌসুমের ক্যালেন্ডার"
                : "3. Saudi Ministry — 1448H Umrah Season Calendar (2026–27)",
              url: "https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-the-Umrah-Season-Calendar-for-1448-AH",
            },
            {
              label: isBn
                ? "৪. Visit Saudi — ৯৬ ঘণ্টার Saudi Stopover Visa (Saudia / flynas)"
                : "4. Visit Saudi — 96-Hour Stopover Visa Campaign & Rules",
              url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
            },
            {
              label: isBn
                ? "৫. Visit Saudi — বাংলাদেশি পাসপোর্টে Package Visa ও eVisa পোর্টাল"
                : "5. Visit Saudi — Package Visa & Official eVisa Eligibility",
              url: "https://www.visitsaudi.com/en/campaigns/package-visa",
            },
            {
              label: isBn
                ? "৬. Visit Saudi Help Center — ব্যবহৃত US/UK/Schengen ভিসা VOA শর্ত"
                : "6. Visit Saudi Help Center — Used US/UK/Schengen Visa on Arrival",
              url: "https://help.visitsaudi.com/hc/en-us/articles/360018933099-Can-I-get-a-visit-visa-if-I-have-a-valid-US-or-UK-or-Schengen-visa-",
            },
            {
              label: isBn
                ? "৭. Haramain High-Speed Railway — অফিসিয়াল ভাড়া ও ব্যাগেজ নিয়ম"
                : "7. Haramain High-Speed Railway — Official Fares (SAR 65 / SAR 162 Base)",
              url: "https://sar.hhr.sa/travel/fares",
            },
            {
              label: isBn
                ? "৮. সৌদি স্বাস্থ্য মন্ত্রণালয় (MOH) — ১৪৪৭ হিজরি ওমরাহ টিকা (ACYW) নিয়ম"
                : "8. Saudi MOH — 1447H Umrah Health & ACYW Vaccine Regulations PDF",
              url: "https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf",
            },
            {
              label: isBn
                ? "৯. বাংলাদেশ হজ্জ ব্যবস্থাপনা পোর্টাল (hajj.gov.bd) ও SPA বিজ্ঞপ্তি"
                : "9. Bangladesh Haj Portal (hajj.gov.bd) & SPA 1447H Permit Notice",
              url: "https://www.hajj.gov.bd/",
            },
          ].map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 hover:border-brand-navy rounded-xl p-3 flex items-center justify-between gap-2 text-slate-700 hover:text-brand-navy transition-colors"
            >
              <span className="font-medium leading-snug">{src.label}</span>
              <ExternalLink size={13} className="shrink-0 text-slate-400" />
            </a>
          ))}
        </div>
      </section>

      {/* =====================================================================
          9. VERIFIED FAQ SCHEMA SECTION
      ===================================================================== */}
      <TravelIntelligence
        pageTitle={
          isBn
            ? "বাংলাদেশ থেকে ওমরাহ ও হজ্জ প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"
            : "Umrah & Hajj Preparation from Bangladesh — Verified FAQs"
        }
        quickAnswer={
          isBn
            ? "বাংলাদেশি নাগরিকদের ফরজ হজ্জের জন্য ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হয়। আর ওমরাহ পালনের জন্য ৩টি ভিসা ক্যাটাগরি রয়েছে: ১) স্ট্যান্ডার্ড ওমরাহ ভিসা (umrah.nusuk.sa বা হোটেল-ট্রান্সপোর্টসহ অনুমোদিত এজেন্ট), ২) Saudia বা flynas থ্রু-টিকিটে ৯৬ ঘণ্টার স্টপওভার ভিসা এবং ৩) যোগ্য Package Visa বা পূর্বে ব্যবহৃত বৈধ US/UK/Schengen ভিসাধারীদের ভিসা-অন-অ্যারাইভাল। ১০ দিনের (৪ জন শেয়ারিং) সংরক্ষিত প্ল্যানিং রেফারেন্স বাজেট জনপ্রতি BDT 1,16,000–1,32,000 (১৪ অক্টোবর ২০২৬; পুনঃমূল্যায়িত নয়—লাইভ কোটেশন নয়)।"
            : "Bangladeshi citizens register via hajj.gov.bd for obligatory Fard Hajj. For Umrah, three eligible visa-route categories apply (checked 14 Oct 2026): (1) Standard Umrah Visa via umrah.nusuk.sa or an approved external agent bundling hotel and transport, (2) a 96-hour Saudia or flynas stopover visa, or (3) eligible Package Visa / used US, UK, or Schengen visa-on-arrival routes. Our preserved 10-day, 4-person sharing planning estimate is BDT 1,16,000–1,32,000 per person (unre-priced reference; not a live quote)."
        }
        keyFacts={[
          {
            label: isBn ? "১০ দিনের প্ল্যানিং রেফারেন্স" : "10-Day Planning Estimate",
            value: isBn
              ? "BDT 1,16,000–1,32,000 / জন (৪ জন শেয়ারিং, পুনঃমূল্যায়িত নয়)"
              : "BDT 1,16,000–1,32,000 / Person (4-Sharing, Unre-Priced)",
          },
          {
            label: isBn ? "১৪৪৮ হিজরি ওমরাহ মৌসুম" : "1448H Season Window",
            value: isBn ? "৩১ মে ২০২৬ – ৭ এপ্রিল ২০২৭ (haj.gov.sa)" : "31 May 2026 – 7 Apr 2027 (haj.gov.sa)",
          },
          {
            label: isBn ? "Haramain ট্রেন বেস ভাড়া" : "Haramain Rail Base Fare",
            value: isBn
              ? "JED–মক্কা SAR 65 · মক্কা–মদিনা SAR 162 (VAT বাদে, ১৪ অক্টো ২০২৬)"
              : "JED–Makkah SAR 65 · Makkah–Madinah SAR 162 (Excl. VAT)",
          },
          {
            label: isBn ? "বাধ্যতামূলক টিকা (MOH)" : "Mandatory Health Rule",
            value: isBn
              ? "ACYW মেনিনজাইটিস টিকা (ভ্রমণের ≥১০ দিন আগে)"
              : "ACYW Meningococcal Vaccine (≥10 Days Prior)",
          },
        ]}
        faqs={localizedHajjFaqs}
      />
    </div>
  );
};
