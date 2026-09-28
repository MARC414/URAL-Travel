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
import { getResponsiveImageProps } from "../utils/imageAssets";

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

  // Interactive Umrah Cost & Agency Savings Calculator States
  const [pilgrims, setPilgrims] = useState<number>(2);
  const [days, setDays] = useState<7 | 10 | 14>(10);
  const [hotelTier, setHotelTier] = useState<"shuttle" | "walkable" | "haramView">("walkable");
  const [season, setSeason] = useState<"regular" | "peak">("regular");
  const [bookingMode, setBookingMode] = useState<"diy" | "bdtDesk">("diy");

  // Calculate realistic 2026 BDT Umrah breakdown
  const baseFlightPerPerson = season === "regular" ? 66000 : 84000;
  const visaWithInsurancePerPerson = 17500;
  const haramainTrainAndTransfersPerPerson = 9500;

  const nightlyRoomRateBdt =
    hotelTier === "shuttle"
      ? season === "regular"
        ? 4800
        : 7200
      : hotelTier === "walkable"
      ? season === "regular"
        ? 10500
        : 15500
      : season === "regular"
      ? 26000
      : 39000;

  const roomsNeeded = Math.ceil(pilgrims / 2);
  const totalFlightBdt = baseFlightPerPerson * pilgrims;
  const totalVisaBdt = visaWithInsurancePerPerson * pilgrims;
  const totalHotelsBdt = nightlyRoomRateBdt * days * roomsNeeded;
  const totalTransportBdt = haramainTrainAndTransfersPerPerson * pilgrims;

  const diyGrandTotalBdt =
    totalFlightBdt + totalVisaBdt + totalHotelsBdt + totalTransportBdt;
  const diyPerPersonBdt = Math.round(diyGrandTotalBdt / pilgrims);

  // Typical fixed agency package markup comparison
  const agencyMultiplier = hotelTier === "haramView" ? 1.28 : 1.32;
  const agencyEquivalentTotalBdt = Math.round(diyGrandTotalBdt * agencyMultiplier);
  const totalSavingsBdt = agencyEquivalentTotalBdt - diyGrandTotalBdt;

  return (
    <div className="space-y-16 animate-fade-in">
      {/* =====================================================================
          1. FULL-WIDTH EDGE-TO-EDGE HERO SECTION WITH PRIMARY SEO H1 HEADING
      ===================================================================== */}
      <section
        aria-label="Umrah and Hajj Planning Hero Banner"
        className="-mt-8 w-screen relative left-1/2 -translate-x-1/2 bg-[#071120] text-white border-b border-slate-800 overflow-hidden shadow-2xl"
      >
        {/* Full-Bleed Background Photography + Multi-Layer Editorial Vignette */}
        <img
          {...getResponsiveImageProps(coverImage, "100vw")}
          alt="The Kaaba at Masjid al-Haram in Makkah, illuminated at night."
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 scale-[1.01] pointer-events-none"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(7, 17, 32, 0.96) 0%, rgba(11, 22, 40, 0.88) 50%, rgba(15, 23, 42, 0.72) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071120] to-transparent pointer-events-none" />

        {/* Constrained Content Container Inside Full-Width Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Breadcrumb, Search-Intent H1, Value Prop & Dual CTAs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb & Verification Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <button
                  type="button"
                  onClick={() => onNavigate("/")}
                  className="hover:text-[#F6B73C] transition-colors cursor-pointer"
                >
                  {isBn ? "হোম (Home)" : "Home"}
                </button>
                <span aria-hidden="true">/</span>
                <span className="text-[#F6B73C] font-semibold">
                  {isBn
                    ? "ওমরাহ ও হজ্জ প্ল্যানিং হাব ২০২৬"
                    : "Umrah & Hajj Planning Hub 2026"}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[11px] text-emerald-300">
                  {isBn ? "✓ Nusuk (nusuk.sa) ও ই-ভিসা ভেরিফায়েড" : "✓ Nusuk (nusuk.sa) & e-Visa Verified"}
                </span>
              </div>

              {/* PRIMARY SEO H1 HEADING (High-Intent Bangladeshi Search Keywords) */}
              <h1
                className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.15]"
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
                  ? "ঢাকা থেকে ওমরাহ পরিকল্পনার জন্য BDT বাজেট, ফ্লাইট ও হোটেলের বিকল্প, সৌদি ভিসা-সংক্রান্ত ধাপ এবং Nusuk প্রস্তুতি একসাথে দেখুন। ভাড়া, ভিসার নিয়ম ও বুকিংয়ের শর্ত বদলাতে পারে—সিদ্ধান্তের আগে বর্তমান তথ্য সংশ্লিষ্ট অফিসিয়াল উৎসে যাচাই করুন।"
                  : "Plan Umrah from Dhaka with a BDT budget framework, flight and accommodation comparisons, Saudi visa guidance, and Nusuk preparation. Fares, entry rules, and booking terms can change, so confirm current details with the relevant official sources before you book."}
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
                      ? "ওমরাহ BDT বাজেট হিসাব করুন"
                      : "Calculate 2026 Umrah Cost in BDT"}
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
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
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
                    ৳ 1,16,000
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn ? "১০ দিনের DIY ওমরাহ শুরু" : "10-Day DIY Umrah Starting"}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    2–5 Days
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn ? "৯০ দিনের সৌদি ই-ভিসা" : "90-Day Saudi e-Visa Issue"}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    300–500m
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn ? "হারাম শরীফ ওয়াকিং জোন" : "Verified Haram Walkable"}
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                    2h 20m
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isBn ? "মক্কা–মদিনা বুলেট ট্রেন" : "Haramain Bullet Train"}
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
                  <h2 className="font-serif text-base sm:text-lg font-bold text-white">
                    {isBn
                      ? "Dual-Currency Card দিয়ে নিজে ওমরাহ প্ল্যান করার সুবিধা"
                      : "How DIY Umrah Saves Bangladeshi Families 25%–32%"}
                  </h2>
                  <ul className="space-y-2.5 text-slate-200 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
                      <span>
                        {isBn
                          ? "ওপেন-জ (Open-Jaw) ফ্লাইট: ঢাকা থেকে জেদ্দা (JED) নেমে ওমরাহ শেষে মদিনা (MED) থেকে সরাসরি ঢাকায় ফিরুন।"
                          : "Open-Jaw Flights: Land in Jeddah (JED) for Makkah first, then fly home directly from Madinah (MED) to skip a 5-hour highway return."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
                      <span>
                        {isBn
                          ? "সঠিক হোটেল লোকেশন: ম্যাপ দেখে কাবা শরীফ (Ajyad / Clock Tower) ও মসজিদে নববীর (Markazia) কাছে হোটেল নির্বাচন করুন।"
                          : "Verified Hotel Proximity: Book flat-walk hotels on Ajyad Street or Madinah Markazia North so elderly parents never climb steep hills."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={14} className="text-[#F6B73C] shrink-0 mt-0.5" />
                      <span>
                        {isBn
                          ? "Saudia বা Flynas ট্রানজিটে ফ্রি ৯৬ ঘণ্টার Stopover Umrah Visa সুবিধা।"
                          : "96-Hour Stopover Visa: Flying Saudia or Flynas to Europe, UK, or USA unlocks a 96-hour Umrah Stopover pass."}
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
                  <h2 className="font-serif text-base sm:text-lg font-bold text-white">
                    {isBn
                      ? "পাসপোর্টে ডলার এন্ডোর্সমেন্ট নেই? সম্পূর্ণ BDT-তে বুক করুন"
                      : "No Dual-Currency Card? Book Your Custom Umrah in BDT"}
                  </h2>
                  <p className="text-slate-300 leading-relaxed">
                    {isBn
                      ? "আপনি নিজের পছন্দমতো ফ্লাইট ও মক্কা-মদিনার হোটেল বাছাই করুন—আমাদের ঢাকা টিম আপনার ৯০ দিনের সৌদি ওমরাহ ই-ভিসা, রিটার্ন এয়ার টিকিট, হোটেল ভাউচার এবং জেদ্দা এয়ারপোর্ট পিকআপ বাংলাদেশি টাকায় (ব্যাংক ট্রান্সফার / bKash / Nagad) সম্পন্ন করে দেবে।"
                      : "Choose your exact flight dates and walkable Makkah/Madinah hotels—our Dhaka desk processes your 90-day Saudi Umrah e-Visa, air tickets, hotel vouchers, and Jeddah airport transfer in BDT via local bank transfer or bKash."}
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
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
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
      <section
        id="umrah-calculator"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calculator size={14} className="text-brand-navy" />
              <span className="font-semibold text-brand-navy">
                {isBn
                  ? "ইন্টারেক্টিভ ওমরাহ বাজেট ক্যালকুলেটর ২০২৬"
                  : "Interactive Umrah Package Cost Calculator (2026)"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {isBn
                ? "বাংলাদেশ থেকে ওমরাহ খরচ কত? আপনার পরিবারের BDT বাজেট হিসাব করুন"
                : "Umrah Cost from Bangladesh 2026: Calculate Your Exact BDT Budget"}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            1 SAR ≈ 32.2 BDT · 1 USD ≈ 120 BDT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
            <h3 className="font-serif text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5">
              {isBn
                ? "যাত্রী সংখ্যা, দিন ও মক্কা-মদিনা হোটেল মান নির্বাচন করুন"
                : "Configure Pilgrims, Stay Duration & Haram Hotel Tier"}
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isBn
                  ? `১. ওমরাহ যাত্রীর সংখ্যা: ${pilgrims} জন (${roomsNeeded}টি রুম)`
                  : `1. Number of Pilgrims: ${pilgrims} (${roomsNeeded} Double/Family Room${roomsNeeded > 1 ? "s" : ""})`}
              </label>
              <input
                type="range"
                min={1}
                max={8}
                value={pilgrims}
                onChange={(e) => setPilgrims(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>1 Solo</span>
                <span>2 Couple</span>
                <span>4 Family</span>
                <span>8 Group</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isBn
                  ? "২. সফরের মেয়াদ (মক্কা + মদিনা):"
                  : "2. Total Stay Duration (Makkah + Madinah):"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { d: 7, label: isBn ? "৭ দিন (সংক্ষিপ্ত)" : "7 Days (Express)" },
                  { d: 10, label: isBn ? "১০ দিন (জনপ্রিয়)" : "10 Days (Standard)" },
                  { d: 14, label: isBn ? "১৪ দিন (পূর্ণাঙ্গ)" : "14 Days (Extended)" },
                ].map((item) => (
                  <button
                    key={item.d}
                    type="button"
                    onClick={() => setDays(item.d as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      days === item.d
                        ? "bg-brand-navy text-white border-brand-navy"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isBn
                  ? "৩. মক্কা ও মদিনায় হোটেলের ক্যাটাগরি:"
                  : "3. Makkah & Madinah Hotel Proximity:"}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "shuttle",
                    title: isBn
                      ? "বাজেট শাটল হোটেল (Kudai / Aziziyah)"
                      : "Budget 3-Star with 24/7 Haram Shuttle",
                    sub: isBn
                      ? "প্রায় ৳৪,৮০০/রাত · ফ্রি বাস সার্ভিস"
                      : "~BDT 4,800/night · Free 24/7 shuttle to Haram",
                  },
                  {
                    id: "walkable",
                    title: isBn
                      ? "ওয়াকিং ডিসট্যান্স ৪-স্টার (Ajyad / Markazia)"
                      : "Walkable 4-Star (400m–600m to Haram)",
                    sub: isBn
                      ? "প্রায় ৳১০,৫০০/রাত · বয়স্ক ও পরিবারের জন্য সেরা"
                      : "~BDT 10,500/night · Best for parents & children",
                  },
                  {
                    id: "haramView",
                    title: isBn
                      ? "৫-স্টার ক্লক টাওয়ার / হারাম ভিউ (Swissôtel / Pullman)"
                      : "5-Star Clock Tower / Zero-Meter Haram View",
                    sub: isBn
                      ? "প্রায় ৳২৬,০০০/রাত · সরাসরি হারাম চত্বরে লিফট"
                      : "~BDT 26,000/night · Direct elevator to Haram courtyard",
                  },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setHotelTier(tier.id as any)}
                    className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                      hotelTier === tier.id
                        ? "border-brand-navy bg-white shadow-xs"
                        : "border-slate-200 bg-slate-100/60 hover:bg-white"
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{tier.title}</div>
                    <div className="text-[11px] text-slate-500">{tier.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {isBn ? "৪. ভ্রমণের মৌসুম:" : "4. Travel Season:"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSeason("regular")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer ${
                    season === "regular"
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {isBn ? "সাধারণ মৌসুম (শাওয়াল–শাবান)" : "Off-Peak (Shawwal–Shaban)"}
                </button>
                <button
                  type="button"
                  onClick={() => setSeason("peak")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border cursor-pointer ${
                    season === "peak"
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {isBn ? "পিক সিজন (রমজান / ডিসেম্বর)" : "Peak (Ramadan / Dec Winter)"}
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown & Savings Output (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="font-serif text-base font-bold text-slate-900">
              {isBn
                ? "খাতওয়ারি ২০২৬ ওমরাহ খরচের হিসাব (BDT ও USD)"
                : "Itemized 2026 Umrah Cost Breakdown in Bangladeshi Taka (BDT)"}
            </h3>

            <div className="bg-brand-navy text-white rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 block">
                  {isBn ? "নিজে প্ল্যান করলে জনপ্রতি খরচ" : "DIY Cost Per Pilgrim"}
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#F6B73C] tabular-nums">
                  ৳ {diyPerPersonBdt.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                  (~${Math.round(diyPerPersonBdt / 120).toLocaleString()} USD)
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block">
                  {isBn
                    ? `মোট খরচ (${pilgrims} জন, ${days} দিন)`
                    : `Total for ${pilgrims} Pilgrim${pilgrims > 1 ? "s" : ""}`}
                </span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
                  ৳ {diyGrandTotalBdt.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {isBn ? "সব খরচ অন্তর্ভুক্ত" : "All-inclusive estimate"}
                </span>
              </div>

              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3.5">
                <span className="text-[11px] text-emerald-300 font-semibold block">
                  {isBn ? "এজেন্সি প্যাকেজের তুলনায় সাশ্রয়" : "Estimated Savings vs. Agency"}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 tabular-nums">
                  ৳ {totalSavingsBdt.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-200/90 block mt-0.5">
                  {isBn ? "কোনো গোপন চার্জ ছাড়া" : "Saved by booking direct"}
                </span>
              </div>
            </div>

            {/* Line-item Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono">
                  <tr>
                    <th className="py-3 px-4">{isBn ? "খরচের খাত" : "Cost Component"}</th>
                    <th className="py-3 px-4">{isBn ? "বিস্তারিত" : "Details"}</th>
                    <th className="py-3 px-4 text-right">{isBn ? "মোট (BDT)" : "Total (BDT)"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {isBn
                        ? "১. রাউন্ডট্রিপ ফ্লাইট (DAC → JED / MED)"
                        : "1. Roundtrip Flights (DAC → JED / MED)"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {pilgrims} × ৳{baseFlightPerPerson.toLocaleString()} (Saudia / Biman / Gulf Transit)
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ৳ {totalFlightBdt.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {isBn
                        ? "২. ৯০ দিনের ওমরাহ ই-ভিসা ও হেলথ ইনস্যুরেন্স"
                        : "2. 90-Day Saudi Umrah e-Visa + Insurance"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {pilgrims} × ৳{visaWithInsurancePerPerson.toLocaleString()} (Saudi Visa Bio + Nusuk)
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ৳ {totalVisaBdt.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {isBn
                        ? `৩. মক্কা ও মদিনা হোটেল (${days} রাত)`
                        : `3. Makkah & Madinah Hotels (${days} Nights)`}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {roomsNeeded} Room(s) × ৳{nightlyRoomRateBdt.toLocaleString()}/night
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ৳ {totalHotelsBdt.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {isBn
                        ? "৪. Haramain বুলেট ট্রেন ও এয়ারপোর্ট ট্রান্সফার"
                        : "4. Haramain High-Speed Train & Jeddah Pickup"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      Jeddah Airport → Makkah → Madinah Bullet Train
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ৳ {totalTransportBdt.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. H2: DIY UMRAH VS. AGENCY PACKAGE COST COMPARISON MATRIX (2026)
      ===================================================================== */}
      <section
        id="umrah-diy-vs-agency"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "প্যাকেজ মূল্য তুলনা ২০২৬ (জনপ্রতি হিসাব)"
              : "2026 Transparent Price Audit (Per Pilgrim Based on Double Occupancy)"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "নিজে প্ল্যান করা DIY ওমরাহ বনাম এজেন্সি প্যাকেজ খরচ তুলনা"
              : "DIY Umrah vs. Bangladeshi Agency Package Cost Comparison"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "ঢাকার সাধারণ এজেন্সি প্যাকেজে প্রায়ই ৪-৫ জন এক রুমে শেয়ারিং এবং হারাম শরীফ থেকে ১.৫–২ কিমি দূরের হোটেল দেওয়া হয়। নিচে ২ জন শেয়ারিং (Double Room) হিসেবে ১০ দিনের প্রকৃত খরচের তুলনা দেখুন:"
              : "Standard Dhaka agency packages often quote prices based on 4-bed quad sharing in distant shuttle zones. Below is an apples-to-apples 10-day comparison for couples/families staying in private double rooms:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tier: isBn
                ? "১০ দিনের ইকোনমি শাটল ওমরাহ প্যাকেজ"
                : "10-Day Economy Shuttle Umrah Tier",
              diyPrice: "৳ 1,17,000",
              agencyPrice: "৳ 1,52,000",
              saving: "Save ৳ 35,000 / person",
              savingBn: "জনপ্রতি সাশ্রয় ৳ ৩৫,০০০",
              details: isBn
                ? "ফ্লাইনাস / এয়ার এরাবিয়া রিটার্ন ফ্লাইট + ৯০ দিনের ওমরাহ ই-ভিসা + কুদাই/আজিজিয়াহ ৩-স্টার শাটল হোটেল + জেদ্দা বাস ট্রান্সফার।"
                : "Low-cost transit flight (Flynas/SalamAir) + 90-day Umrah e-Visa + 3-Star Kudai/Aziziyah hotel with 24/7 shuttle + Haramain rail.",
            },
            {
              tier: isBn
                ? "১০ দিনের ওয়াকিং ৪-স্টার ফ্যামিলি প্যাকেজ"
                : "10-Day Walkable 4-Star Family Tier",
              diyPrice: "৳ 1,45,500",
              agencyPrice: "৳ 1,90,000+",
              saving: "Save ৳ 44,500 / person",
              savingBn: "জনপ্রতি সাশ্রয় ৳ ৪৪,৫০০",
              featured: true,
              details: isBn
                ? "সৌদিয়া / বিমান ডিরেক্ট ফ্লাইট + মক্কা আজইয়াদ ও মদিনা মারকাজিয়ায় ৪০০ মিটারের মধ্যে ৪-স্টার হোটেল + Haramain Bullet Train।"
                : "Direct Saudia/Biman flight + 400m flat-walk 4-Star hotels in Makkah Ajyad & Madinah Markazia North + Haramain Bullet Train.",
            },
            {
              tier: isBn
                ? "১০ দিনের ৫-স্টার ক্লক টাওয়ার / হারাম ভিউ"
                : "10-Day 5-Star Clock Tower Haram Tier",
              diyPrice: "৳ 2,23,000",
              agencyPrice: "৳ 2,95,000+",
              saving: "Save ৳ 72,000 / person",
              savingBn: "জনপ্রতি সাশ্রয় ৳ ৭২,০০০",
              details: isBn
                ? "ডিরেক্ট ফ্লাইট (Open-Jaw) + Swissôtel / Pullman Zamzam (০ মিটার হারাম চত্বর) + প্রাইভেট কার পিকআপ ও বিজনেস ক্লাস বুলেট ট্রেন।"
                : "Direct Open-Jaw flights + Swissôtel/Pullman Zamzam (zero-meter Haram courtyard access) + Private GMC/Camry airport transfers.",
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
                      card.featured ? "text-[#F6B73C]" : "text-emerald-700"
                    }`}
                  >
                    {isBn ? card.savingBn : card.saving}
                  </span>
                  {card.featured && (
                    <span className="text-[10px] font-mono bg-[#F6B73C] text-brand-navy font-bold px-2.5 py-0.5 rounded-md">
                      {isBn ? "সবচেয়ে জনপ্রিয়" : "Most Popular"}
                    </span>
                  )}
                </div>

                <h3
                  className={`font-serif text-lg font-bold ${
                    card.featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {card.tier}
                </h3>

                <p
                  className={`text-xs leading-relaxed ${
                    card.featured ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {card.details}
                </p>
              </div>

              <div
                className={`pt-4 border-t space-y-2 ${
                  card.featured ? "border-slate-800" : "border-slate-200"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`text-xs ${
                      card.featured ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {isBn ? "নিজে বুক করলে (DIY):" : "URAL Direct DIY Cost:"}
                  </span>
                  <span
                    className={`text-xl font-serif font-bold tabular-nums ${
                      card.featured ? "text-[#F6B73C]" : "text-slate-900"
                    }`}
                  >
                    {card.diyPrice}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className={card.featured ? "text-slate-400" : "text-slate-500"}>
                    {isBn ? "সাধারণ এজেন্সি রেট:" : "Typical Agency Quote:"}
                  </span>
                  <span className="font-mono line-through opacity-75 tabular-nums">
                    {card.agencyPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. H2: STEP 01 — DHAKA TO JEDDAH (JED) & MADINAH (MED) FLIGHT PRICES
      ===================================================================== */}
      <section
        id="umrah-step-flights"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০১ · ঢাকা (DAC) থেকে জেদ্দা (JED) ও মদিনা (MED) এয়ার টিকিট"
              : "Step 01 · Dhaka (DAC) to Jeddah (JED) & Madinah (MED) Airfare Guide"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "ঢাকা থেকে জেদ্দা ও মদিনা ফ্লাইটের ভাড়া তুলনা করুন (সৌদিয়া, বিমান ও ট্রানজিট)"
              : "Dhaka to Jeddah (JED) & Madinah (MED) Flight Price Comparison"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "ওমরাহ খরচের সবচেয়ে বড় অংশ হলো বিমানের টিকিট। নিচে ডিরেক্ট ফ্লাইট বনাম সাশ্রয়ী মধ্যপ্রাচ্য ট্রানজিট ফ্লাইটের নিয়ম ও লাইভ সার্চ ইঞ্জিন দেওয়া হলো:"
              : "Airfare accounts for roughly 50% of an Umrah budget from Bangladesh. Compare direct wide-body carriers against budget Gulf transit routes below:"}
          </p>
        </div>

        {/* 3 H3 Flight Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-semibold text-brand-navy">
              6h 30m Non-Stop · 2×23kg + 5L Zamzam
            </span>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {isBn
                ? "১. ডিরেক্ট ফ্লাইট (Saudia ও Biman Bangladesh)"
                : "1. Direct Flights (Saudia & Biman Bangladesh)"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "বয়স্ক বাবা-মা ও শিশুদের জন্য সৌদি এয়ারলাইন্স এবং বিমান বাংলাদেশ সেরা। ফ্লাইটে ইহরামের মিকাত ঘোষণা করা হয় এবং ফেরার সময় ৫ লিটার জমজমের পানি ফ্রি বহন করা যায় (ভাড়া: ~৳৭২,০০০–৮৬,০০০)।"
                : "Best for elderly parents. Both Saudia and Biman announce the Miqat boundary mid-air for Ihram and include complimentary 5-liter Zamzam water allowance on return (Fares: BDT 72,000–86,000)."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-semibold text-emerald-700">
              Lowest BDT Fare · 1-Stop Gulf Transit
            </span>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {isBn
                ? "২. সাশ্রয়ী ট্রানজিট (Flynas, SalamAir, Kuwait ও Gulf Air)"
                : "2. Budget Transit (Flynas, SalamAir, Kuwait & Air Arabia)"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "মাস্কাট, শারজাহ, কুয়েত বা বাহরাইন হয়ে ১-স্টপ ট্রানজিট ফ্লাইটে প্রতি টিকিটে ১২,০০০–১৮,০০০ টাকা সাশ্রয় হয় (ভাড়া: ~৳৫৬,০০০–৬৬,০০০ রাউন্ডট্রিপ)।"
                : "Save BDT 12,000–18,000 per ticket by flying 1-stop via Muscat, Sharjah, Kuwait, or Bahrain (Roundtrip fares regularly start at BDT 56,000–66,000)."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono font-semibold text-brand-navy">
              Smart Routing · Save 5 Hours on Highway
            </span>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {isBn
                ? "৩. ওপেন-জ (Open-Jaw) টিকিট কৌশল (JED → MED)"
                : "3. Open-Jaw Strategy: Arrive JED, Depart MED"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "মাল্টি-সিটি (Multi-City) অপশনে ঢাকা → জেদ্দা এবং ফেরার পথে মদিনা → ঢাকা বুক করুন। এতে মদিনা থেকে আবার জেদ্দা এয়ারপোর্টে ৪৫০ কিমি ফিরে আসার কষ্ট ও খরচ দুটোই বাঁচে।"
                : "Book Multi-City: Fly Dhaka → Jeddah (perform Umrah in Makkah first), take the 2h 20m bullet train to Madinah, and fly home directly from Madinah Airport (MED) to Dhaka."}
            </p>
          </div>
        </div>

        <TravelpayoutsEmbed defaultDestination="JED" />
      </section>

      {/* =====================================================================
          5. H2: STEP 02 — MAKKAH & MADINAH WALKABLE HOTEL ZONES + LIVE SEARCH
      ===================================================================== */}
      <section
        id="umrah-step-hotels"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০২ · মক্কা ও মদিনার সেরা হোটেল জোন গাইড"
              : "Step 02 · Makkah & Madinah Hotel Neighborhood Guide"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "মক্কা ও মদিনায় কোথায় থাকবেন? কাবা শরীফ ও মসজিদে নববীর ওয়াকিং জোন"
              : "Best Makkah & Madinah Hotel Zones for Elderly Parents & Families"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "মক্কায় অনেক সস্তা হোটেল পাহাড়ের ঢালে অবস্থিত যেখানে বয়স্কদের হাঁটা কঠিন। বুকিংয়ের আগে নিচের ৩টি সমতল ও সুবিধাজনক জোন চিনে নিন:"
              : "Many cheap Makkah hotels sit on steep inclines that exhaust elderly pilgrims before Tawaf. Focus your search on these three flat, wheelchair-accessible zones:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              zone: isBn
                ? "১. আবরাজ আল বাইত (Clock Tower) ও Jabal Omar"
                : "1. Abraj Al Bait (Clock Tower) & Jabal Omar",
              dist: isBn ? "০–১৫০ মিটার (হুইলচেয়ার বান্ধব)" : "0–150m to Haram Courtyard",
              price: "BDT 22,000 – 42,000 / night",
              desc: isBn
                ? "হোটেলের লিফট দিয়ে নামলেই সরাসরি কাবা চত্বর। বয়স্ক বাবা-মা বা ছোট বাচ্চাদের নিয়ে পাঁচ ওয়াক্ত নামাজ জামাতে পড়ার জন্য সেরা।"
                : "Direct elevator access to the Haram courtyard and air-conditioned malls with Bangladeshi/South Asian food courts. Zero uphill walking.",
            },
            {
              zone: isBn
                ? "২. আজইয়াদ (Ajyad) ও ইব্রাহিম আল খলিল রোড"
                : "2. Ajyad Street & Ibrahim Al Khalil Road (Misfaq)",
              dist: isBn ? "৪০০–৭০০ মিটার সমতল রাস্তা" : "400m–700m Flat Walk",
              price: "BDT 8,500 – 14,500 / night",
              desc: isBn
                ? "ইব্রাহিম আল খলিল রোড (মিসফাক) পুরোপুরি সমতল এবং প্রচুর বাংলাদেশি রেস্টুরেন্ট রয়েছে। মধ্যবিত্ত পরিবারের জন্য সবচেয়ে সাশ্রয়ী ওয়াকিং জোন।"
                : "Ibrahim Al Khalil Road is completely flat (no hills) and lined with Bangladeshi restaurants, pharmacies, and currency exchanges.",
            },
            {
              zone: isBn
                ? "৩. মদিনা মারকাজিয়া নর্থ ও ওয়েস্ট (Markazia)"
                : "3. Madinah Central Area (Markazia North/West)",
              dist: isBn ? "১০০–৩০০ মিটার (মহিলা গেট ২৫–২৯)" : "100m–300m (Ladies Gate 25–29)",
              price: "BDT 9,500 – 18,000 / night",
              desc: isBn
                ? "মদিনায় সবসময় Markazia North বা West জোনে হোটেল নিন যাতে মা-বোনেরা সহজেই মসজিদে নববীর লেডিস গেট (Gate 25-29) ও রিয়াজুল জান্নাতে যেতে পারেন।"
                : "Always book inside the 1st Ring Road (Markazia North) in Madinah so female family members have a 3-minute walk to Ladies Gates 25–29.",
            },
          ].map((z, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="text-xs font-mono text-brand-navy font-semibold">{z.dist}</div>
                <h3 className="font-serif text-base font-bold text-slate-900">{z.zone}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{z.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 text-xs font-mono font-bold text-slate-900">
                {z.price}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3">
          <h3 className="font-serif text-base font-bold text-brand-navy">
            {isBn
              ? "মক্কা ও মদিনার হোটেল রেট লাইভ সার্চ করুন:"
              : "Compare Live Makkah & Madinah Hotel Rates:"}
          </h3>
          <TravelpayoutsCustomWidget
            initialTab="hotels"
            initialHotelCity="Makkah"
            initialTo="Jeddah (JED)"
          />
        </div>
      </section>

      {/* =====================================================================
          6. H2: STEP 03 — SAUDI UMRAH E-VISA, NUSUK APP & BIOMETRICS RULES
      ===================================================================== */}
      <section
        id="umrah-visa-nusuk-guide"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? "ধাপ ০৩ · সৌদি ওমরাহ ই-ভিসা, Nusuk অ্যাপ ও বায়োমেট্রিক্স নিয়ম ২০২৬"
              : "Step 03 · 2026 Saudi Umrah e-Visa, Nusuk App & Biometrics Requirements"}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            {isBn
              ? "বাংলাদেশি পাসপোর্টে সৌদি ওমরাহ ই-ভিসা ও Nusuk অ্যাপের ৪টি বাধ্যতামূলক ধাপ"
              : "Saudi Umrah e-Visa, Nusuk App & Biometrics Checklist from Bangladesh"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              step: "01 · Visa Type",
              title: isBn
                ? "৯০ দিনের Umrah e-Visa অথবা ৯৬ ঘণ্টার Stopover Visa"
                : "90-Day Umrah e-Visa or 96-Hour Stopover Visa",
              body: isBn
                ? "সাধারণ বাংলাদেশি পাসপোর্টধারীরা অনুমোদিত প্ল্যাটফর্ম বা আমাদের ঢাকা ডেস্কের মাধ্যমে ২–৫ দিনে ৯০ দিনের ই-ভিসা (৳১৫,৫০০–১৯,৫০০) পান। আর US/UK/Schengen ভিসা থাকলে অনলাইনেই তাত্ক্ষণিক ট্যুরিস্ট ই-ভিসা মেলে।"
                : "Standard BD passports obtain a 90-day Umrah e-Visa in 2–5 days (~BDT 15,500–19,500 with health insurance). Holders of valid US, UK, or Schengen visas qualify for instant online e-Visa / VOA.",
            },
            {
              step: "02 · Biometrics",
              title: isBn
                ? "Saudi Visa Bio অ্যাপে ফিঙ্গারপ্রিন্ট নিবন্ধন"
                : "Mandatory Saudi Visa Bio App Registration",
              body: isBn
                ? "ঢাকা ছাড়ার আগেই স্মার্টফোনে অফিসিয়াল 'Saudi Visa Bio' অ্যাপ ডাউনলোড করে পাসপোর্ট স্ক্যান, ফেস আইডি ও দুই হাতের আঙুলের ছাপ সাবমিট করুন। এতে জেদ্দা এয়ারপোর্ট ইমিগ্রেশনে ১ ঘণ্টা লাইন বাঁচে।"
                : "Complete facial and fingerprint biometrics on your phone using the official 'Saudi Visa Bio' app before flying from Dhaka so you breeze through Jeddah/Madinah immigration counters.",
            },
            {
              step: "03 · Nusuk Permits",
              title: isBn
                ? "Nusuk অ্যাপে ওমরাহ ও রিয়াজুল জান্নাত (Rawdah) স্লট"
                : "Nusuk App (nusuk.sa) Umrah & Rawdah Permits",
              body: isBn
                ? "ভিসা নম্বর পাওয়ার সাথে সাথে Nusuk অ্যাপে অ্যাকাউন্ট খুলে মক্কায় ওমরাহ পালনের স্লট এবং মদিনায় রিয়াজুল জান্নাতে (Noble Rawdah) নামাজের QR পারমিট বুক করুন।"
                : "As soon as your visa number is issued, register on the official Nusuk app to reserve your Umrah time slot and mandatory QR entry permit for the Noble Rawdah in Madinah.",
            },
            {
              step: "04 · DAC Departure",
              title: isBn
                ? "ঢাকা এয়ারপোর্ট (DAC) ইহরাম ও ইমিগ্রেশন চেকলিস্ট"
                : "Dhaka Airport (DAC) Ihram & Immigration Checklist",
              body: isBn
                ? "প্রথমে মক্কায় গেলে ঢাকা এয়ারপোর্ট থেকেই ইহরামের কাপড় পরে বিমানে উঠুন (মীকাত অতিক্রমের সময় নিয়ত করবেন)। সাথে প্রিন্টেড ই-ভিসা, রিটার্ন টিকিট ও হোটেল ভাউচার রাখুন।"
                : "If flying Dhaka → Jeddah first, wear your Ihram garments at Dhaka Airport before boarding (make Niyyah at the Miqat announcement). Carry printed copies of your e-Visa, return ticket, and hotel vouchers.",
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
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
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
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
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
              <h3 className="font-serif text-base font-bold text-slate-900">
                {isBn
                  ? "প্রাইভেট এয়ারপোর্ট পিকআপ (Welcome Pickups / Kiwitaxi)"
                  : "Private Arrival Gate Meet & Greet to Makkah"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "ইহরাম বাঁধা অবস্থায় দীর্ঘ ফ্লাইটের পর ট্যাক্সি চালকদের সাথে দরদাম না করে আগে থেকেই ফিক্সড রেটে প্রাইভেট সেডান বা ফ্যামিলি ভ্যান বুক করুন (~৭৫ মিনিট যাত্রা)।"
                  : "Avoid haggling in Ihram outside Jeddah Terminal 1. Pre-book a fixed-fare private car or family minivan directly to your Makkah hotel door (~75 mins)."}
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
              <h3 className="font-serif text-base font-bold text-slate-900">
                {isBn
                  ? "মক্কা ও মদিনার ঐতিহাসিক জিয়ারাহ ট্যুর এবং তায়েফ ডে-ট্রিপ"
                  : "Makkah & Madinah Guided Ziyarah + Taif Day Tours"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "জাবালে নূর (হেরা গুহা), জাবালে সাওর, আরাফাত, মিনা, উহুদ পাহাড় ও মসজিদে কুবা ভ্রমণের জন্য Klook-এ ইংলিশ/উর্দু গাইডসহ প্রাইভেট জিয়ারাহ কার বুক করুন।"
                  : "Book private air-conditioned Ziyarah tours covering Jabal al-Nour, Mount Uhud, Masjid Quba, and Badr/Taif day excursions with verified Klook local operators."}
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
              <h3 className="font-serif text-base font-bold text-slate-900">
                {isBn
                  ? "Nusuk অ্যাপ ও পরিবারের সাথে যোগাযোগের জন্য সৌদি eSIM"
                  : "Saudi Arabia Local eSIM for Nusuk & WhatsApp"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? "মদিনায় রিয়াজুল জান্নাত (Rawdah)-এ প্রবেশের সময় গেটে লাইভ Nusuk App QR কোড দেখাতে হয়। এয়ারপোর্টের সিমের লাইনে না দাঁড়িয়ে ঢাকা থেকেই সৌদি eSIM অ্যাক্টিভ করে যান।"
                  : "Keep your Nusuk Rawdah permit QR code, Careem/Uber app, and family WhatsApp connected the moment your plane touches down in Jeddah."}
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
          8. CONTEXTUAL AIRHELP FLIGHT PROTECTION & DEEP-DIVE EDITORIAL GUIDES
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
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
          {isBn
            ? "ওমরাহ ও হজ্জ বিষয়ক বিস্তারিত গাইড ও চেকলিস্ট"
            : "In-Depth Umrah & Hajj Editorial Playbooks"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onNavigate("/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost")}
            className="bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-6 space-y-2 cursor-pointer transition-colors"
          >
            <span className="text-xs font-mono text-brand-navy font-semibold">
              {isBn ? "বিস্তারিত গাইড ০১" : "In-Depth Playbook 01"}
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              {isBn
                ? "বাংলাদেশ থেকে ওমরাহ ও হজ্জ গাইড ২০২৬: Nusuk অ্যাপ, ই-ভিসা ও সম্পূর্ণ BDT বাজেট"
                : "Umrah & Hajj Guide from Bangladesh 2026: Nusuk App, e-Visa & BDT Cost Breakdown"}
            </h3>
            <p className="text-xs text-slate-600">
              {isBn
                ? "ধাপে ধাপে Saudi Visa Bio ফিঙ্গারপ্রিন্ট, Nusuk Rawdah পারমিট ও ১০ দিনের পূর্ণাঙ্গ বাজেট পড়ুন →"
                : "Read the complete guide to Saudi Visa Bio biometrics, Nusuk Rawdah permits, and 10-day cost tables →"}
            </p>
          </div>

          <div
            onClick={() =>
              onNavigate("/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh")
            }
            className="bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-6 space-y-2 cursor-pointer transition-colors"
          >
            <span className="text-xs font-mono text-brand-navy font-semibold">
              {isBn ? "বিস্তারিত গাইড ০২" : "In-Depth Playbook 02"}
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              {isBn
                ? "মক্কা ও মদিনার সেরা হোটেল জোন গাইড এবং Haramain High-Speed Train টিউটোরিয়াল"
                : "Makkah & Madinah Hotel Zones + Haramain High-Speed Train Guide for Bangladeshis"}
            </h3>
            <p className="text-xs text-slate-600">
              {isBn
                ? "হুইলচেয়ার অ্যাক্সেস, বাংলাদেশি খাবারের হোটেল জোন ও বুলেট ট্রেন টিকিট বুকিং নিয়ম পড়ুন →"
                : "Learn which streets have zero uphill walking, Bangladeshi dining, and how to book the 300 km/h bullet train →"}
            </p>
          </div>
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
            ? "বাংলাদেশি নাগরিকদের ফরজ হজ্জের জন্য ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হয়। আর ওমরাহ পালনের জন্য বছরের যেকোনো সময় ৯০ দিনের Umrah e-Visa, ৯৬ ঘণ্টার Saudia/Flynas Stopover Visa অথবা US/UK/Schengen ভিসাধারীদের অনলাইন e-Visa এবং Nusuk App ব্যবহার করে মাত্র ১,১৬,০০০–১,৩২,০০০ টাকায় ১০ দিনের DIY ওমরাহ সম্পন্ন করা যায়।"
            : "Bangladeshi citizens register via hajj.gov.bd for obligatory Hajj, while year-round Umrah can be completed independently in 10 days for BDT 116,000–132,000 per person using a 90-day Umrah e-Visa or 96-hour Saudia Stopover Visa paired with the official Saudi Visa Bio and Nusuk apps."
        }
        keyFacts={[
          {
            label: isBn ? "Umrah e-Visa খরচ" : "Umrah e-Visa Cost",
            value: isBn ? "BDT 15,500 – 19,500 (২–৫ দিন)" : "BDT 15,500 – 19,500 (2–5 Days)",
          },
          {
            label: isBn ? "১০ দিনের DIY বাজেট" : "10-Day DIY Budget",
            value: isBn ? "BDT 1,16,000 – 1,32,000 / জন" : "BDT 1,16,000 – 1,32,000 / Person",
          },
          {
            label: isBn ? "মক্কা–মদিনা ট্রেন" : "Makkah–Madinah Rail",
            value: "Haramain High-Speed Train (2h 20m)",
          },
          {
            label: isBn ? "BDT বুকিং হেল্পলাইন" : "BDT Booking Helpline",
            value: "+8801784385335 (WhatsApp)",
          },
        ]}
        faqs={localizedHajjFaqs}
      />
    </div>
  );
};
