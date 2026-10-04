import React, { useState } from "react";
import {
  ExternalLink,
  Sparkles,
  Calendar,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Train,
  Ticket,
  Compass,
  MapPin,
  ArrowRight,
  Layers
} from "lucide-react";
import {
  TIQETS_CITY_STACKS,
  TIQETS_TOP_ATTRACTIONS,
  TIQETS_PARTNER_LINK,
  TiqetsAttractionItem
} from "../data/tiqetsAttractionsData";
import { KlookActivitiesWidget, AFFILIATE_LINKS } from "./AffiliatePartners";
import { Language } from "../translations";

interface GlobalAttractionsHubProps {
  lang: Language;
  initialRegion?: "west" | "east";
  initialCity?: string;
  initialFilter?: "all" | "sold-out-rescue" | "transit" | "viewpoint" | "cruise";
  onNavigate: (path: string) => void;
}

export const GlobalAttractionsHub: React.FC<GlobalAttractionsHubProps> = ({
  lang,
  initialRegion = "west",
  initialCity = "london",
  initialFilter = "all",
  onNavigate
}) => {
  const isBn = lang === "bn";
  const [activeRegion, setActiveRegion] = useState<"west" | "east">(initialRegion);
  const [selectedCityId, setSelectedCityId] = useState<string>(initialCity || "london");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "sold-out-rescue" | "transit" | "viewpoint" | "cruise">(initialFilter);
  const [widgetTab, setWidgetTab] = useState<"triple-stack" | "popular-tours" | "availability-calendar">("triple-stack");
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split("T")[0];
  });
  const [partySize, setPartySize] = useState<number>(2);
  const [activeCalendarProduct, setActiveCalendarProduct] = useState<TiqetsAttractionItem>(TIQETS_TOP_ATTRACTIONS[0]);

  const activeCityStack =
    TIQETS_CITY_STACKS.find((c) => c.cityId === selectedCityId) || TIQETS_CITY_STACKS[0];

  const filteredAttractions = TIQETS_TOP_ATTRACTIONS.filter((item) => {
    const cityMatch = selectedCityId === "all" ? true : item.cityId === selectedCityId;
    if (!cityMatch) return false;
    if (categoryFilter === "sold-out-rescue") return Boolean(item.soldOutRescue);
    if (categoryFilter === "viewpoint") return Boolean(item.rooftopAccess || item.category === "viewpoint");
    if (categoryFilter === "cruise") return item.category === "cruise";
    if (categoryFilter === "transit") return item.category === "pass" || item.category === "transit";
    return true;
  });

  const displayAttractions =
    filteredAttractions.length > 0
      ? filteredAttractions
      : TIQETS_TOP_ATTRACTIONS.filter((i) =>
          categoryFilter === "sold-out-rescue" ? i.soldOutRescue : true
        );

  const stackTotalUsd =
    activeCityStack.morningSlot.priceUsd +
    activeCityStack.afternoonSlot.priceUsd +
    activeCityStack.sunsetSlot.priceUsd;
  const stackTotalBdt = Math.round(stackTotalUsd * 122);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 🏛️ HERO BANNER: GLOBAL ATTRACTIONS, SKIP-THE-LINE & PASSES ENGINE */}
      <div className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-[#1A365D] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-white/10 overflow-hidden">
        <div className="absolute -right-12 -top-12 w-72 h-72 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-[#F6B73C]/20 border border-[#F6B73C]/40 text-[#F6B73C] text-xs font-mono font-bold px-3.5 py-1.5 rounded-full">
              <Sparkles size={13} />
              <span>
                {isBn
                  ? "অফিসিয়াল স্কিপ-দ্য-লাইন ও সিটি পাস হাব (Tiqets + Klook)"
                  : "OFFICIAL SKIP-THE-LINE & CITY PASSES HUB (TIQETS + KLOOK)"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <span>⚡ Instant Mobile QR Tickets</span>
              <span>•</span>
              <span>💳 USD / EUR / GBP & BDT Support</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {isBn
                ? "ইউরোপ, যুক্তরাজ্য, আমেরিকা ও এশিয়ার শীর্ষ আকর্ষণ এবং স্কিপ-দ্য-লাইন টিকেট"
                : "Global Iconic Attractions, Skip-the-Line Tickets & 1-Day City Stacks"}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isBn
                ? "লন্ডন, প্যারিস, রোম, নিউ ইয়র্ক, আমস্টারডাম কিংবা দুবাই-ব্যাংকক — অফিসিয়াল ওয়েবসাইটে টিকেট সোল্ড-আউট হলেও ভেরিফায়েড Tiqets ও Klook রিজার্ভড স্লটের মাধ্যমে দীর্ঘ লাইন ছাড়াই প্রবেশ করুন।"
                : "Whether you're flying to London, Paris, Rome, or New York—or exploring Dubai, Bangkok, and Singapore—unlock verified skip-the-line museum slots, sunset river cruises, rooftop skydecks, and direct airport express trains."}
            </p>
          </div>

          {/* 🔀 REGIONAL POWER ENGINE SWITCHER (West Wing: Tiqets vs East Wing: Klook) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setActiveRegion("west")}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                activeRegion === "west"
                  ? "bg-[#F6B73C] text-brand-navy border-[#F6B73C] shadow-lg"
                  : "bg-white/5 text-white border-white/15 hover:bg-white/10"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/15">
                    {isBn ? "Tiqets ইঞ্জিন" : "Powered by Tiqets"}
                  </span>
                  <span className="text-xs font-bold">🇬🇧 🇫🇷 🇮🇹 🇺🇸 🇳🇱 🇵🇹</span>
                </div>
                <h2 className="font-serif text-base sm:text-lg font-extrabold">
                  {isBn
                    ? "ইউরোপ, যুক্তরাজ্য ও আমেরিকা (Europe, UK & USA)"
                    : "Europe, UK & USA Skip-the-Line Hub"}
                </h2>
                <p className={`text-xs ${activeRegion === "west" ? "text-brand-navy/80 font-medium" : "text-slate-300"}`}>
                  {isBn
                    ? "লন্ডন, প্যারিস, রোম, নিউ ইয়র্ক, আমস্টারডাম, মিলান, ভেনিস, ফ্লোরেন্স ও লিসবন"
                    : "London, Paris, Rome, New York, Amsterdam, Milan, Venice, Florence & Lisbon"}
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-black/10 shrink-0">
                9 Cities Live
              </span>
            </button>

            <button
              onClick={() => setActiveRegion("east")}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                activeRegion === "east"
                  ? "bg-[#F6B73C] text-brand-navy border-[#F6B73C] shadow-lg"
                  : "bg-white/5 text-white border-white/15 hover:bg-white/10"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/15">
                    {isBn ? "Klook ইঞ্জিন" : "Powered by Klook"}
                  </span>
                  <span className="text-xs font-bold">🇦🇪 🇹🇭 🇲🇾 🇸🇬 🇲🇻 🇳🇵</span>
                </div>
                <h2 className="font-serif text-base sm:text-lg font-extrabold">
                  {isBn
                    ? "এশিয়া ও মধ্যপ্রাচ্য ট্যুর ও থিম পার্ক (Asia & Gulf)"
                    : "Asia & Middle East Tours & Passes Hub"}
                </h2>
                <p className={`text-xs ${activeRegion === "east" ? "text-brand-navy/80 font-medium" : "text-slate-300"}`}>
                  {isBn
                    ? "দুবাই, ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর, মালদ্বীপ ও কাঠমান্ডু ডে-ট্রিপ"
                    : "Dubai, Bangkok, Kuala Lumpur, Singapore, Maldives & Kathmandu Activities"}
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-black/10 shrink-0">
                Asia / Gulf
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          WEST WING: TIQETS EUROPE, UK & USA SKIP-THE-LINE ENGINE
         ===================================================================== */}
      {activeRegion === "west" && (
        <div className="space-y-8">
          {/* 1. 9-CITY SELECTOR BAR */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                {isBn
                  ? "১. আপনার গন্তব্য শহর নির্বাচন করুন (৯টি গ্লোবাল হাব):"
                  : "1. SELECT YOUR CITY HUB (9 ICONIC WESTERN DESTINATIONS):"}
              </span>
              <a
                href={TIQETS_PARTNER_LINK}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-xs font-mono font-bold text-brand-navy hover:text-brand-emerald inline-flex items-center gap-1"
              >
                <span>{isBn ? "Tiqets-এ সব শহর দেখুন" : "Browse All Cities on Tiqets"}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {TIQETS_CITY_STACKS.map((city) => (
                <button
                  key={city.cityId}
                  onClick={() => setSelectedCityId(city.cityId)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    selectedCityId === city.cityId
                      ? "bg-brand-navy text-white border-brand-navy shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-lg leading-none">{city.flag}</span>
                  <span className="text-xs font-bold tracking-tight">{city.cityName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. TIQETS 3-WIDGET MODE SWITCHER (Triple-Stack Itinerary vs Popular Tours vs Availability Calendar) */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-100 p-2 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setWidgetTab("triple-stack")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  widgetTab === "triple-stack"
                    ? "bg-brand-navy text-white shadow"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <Layers size={14} className="text-[#F6B73C]" />
                <span>
                  {isBn
                    ? "১-দিনের ট্রিপল-স্ট্যাক প্ল্যান (Landmark + Cruise + Viewpoint)"
                    : "1-Day Triple-Stack Combo (Landmark + Cruise + Viewpoint)"}
                </span>
              </button>

              <button
                onClick={() => setWidgetTab("popular-tours")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  widgetTab === "popular-tours"
                    ? "bg-brand-navy text-white shadow"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <Ticket size={14} className="text-[#F6B73C]" />
                <span>
                  {isBn
                    ? "জনপ্রিয় ট্যুর ও সোল্ড-আউট রেসকিউ টিকেট"
                    : "Popular Tours & Sold-Out Rescue Widget"}
                </span>
              </button>

              <button
                onClick={() => setWidgetTab("availability-calendar")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  widgetTab === "availability-calendar"
                    ? "bg-brand-navy text-white shadow"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                <Calendar size={14} className="text-[#F6B73C]" />
                <span>
                  {isBn
                    ? "লাইভ অ্যাভেইলেবিলিটি ক্যালেন্ডার ও BDT ক্যালকুলেটর"
                    : "Live Availability Calendar & BDT Calculator"}
                </span>
              </button>
            </div>

            <div className="px-3 py-1 text-[11px] font-mono text-slate-600 hidden xl:block">
              {isBn ? "টিকেট আইডি ভেরিফায়েড • তাৎক্ষণিক ই-টিকেট" : "Verified Tiqets Product IDs • Instant Smartphone Entry"}
            </div>
          </div>

          {/* ===============================================================
              WIDGET MODE 1: 1-DAY TRIPLE-STACK ITINERARY ENGINE
             =============================================================== */}
          {widgetTab === "triple-stack" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeCityStack.flag}</span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                      {isBn ? activeCityStack.VisaCategoryForBdBn : activeCityStack.VisaCategoryForBd}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-900">
                    {activeCityStack.cityName}: {isBn ? activeCityStack.bundleTitleBn : activeCityStack.bundleTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                    {isBn ? activeCityStack.heroTaglineBn : activeCityStack.heroTagline}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-right shrink-0">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    {isBn ? "৩টি আকর্ষণের মোট বাজেট (আনুমানিক)" : "Full 3-Experience Day Stack"}
                  </span>
                  <div className="text-lg font-black text-brand-navy">
                    ${stackTotalUsd} USD{" "}
                    <span className="text-xs font-mono font-normal text-slate-500">
                      (~৳{stackTotalBdt.toLocaleString()} BDT)
                    </span>
                  </div>
                </div>
              </div>

              {/* 3-Card Timeline Grid: Morning Landmark + Afternoon Cruise/Dome + Sunset Viewpoint */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { slot: activeCityStack.morningSlot, step: "01", theme: "Morning Anchor" },
                  { slot: activeCityStack.afternoonSlot, step: "02", theme: "Afternoon Experience" },
                  { slot: activeCityStack.sunsetSlot, step: "03", theme: "Golden Hour / Sunset" }
                ].map(({ slot, step }, idx) => (
                  <div
                    key={slot.productId}
                    className="border border-slate-200 rounded-2xl p-5 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-navy bg-[#F6B73C]/25 px-2.5 py-1 rounded-md">
                          <Clock size={12} /> {slot.time}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Tiqets ID #{slot.productId}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
                          Step {step} • {slot.label}
                        </span>
                        <h3 className="font-serif text-base font-bold text-slate-900 mt-0.5">
                          {slot.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        ✓ {slot.perk}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          {isBn ? "জনপ্রতি টিকেট" : "From / Adult"}
                        </span>
                        <span className="text-sm font-black text-slate-900">
                          ${slot.priceUsd}{" "}
                          <span className="text-[11px] font-normal text-slate-500">
                            (~৳{(slot.priceUsd * 122).toLocaleString()})
                          </span>
                        </span>
                      </div>

                      <a
                        href={TIQETS_PARTNER_LINK}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="bg-brand-navy hover:bg-[#1e3a5f] text-white text-xs font-bold px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>{isBn ? "স্লট বুক করুন" : "Book Slot"}</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Airport Express Rail / City Pass Add-On Bar */}
              <div className="bg-gradient-to-r from-brand-navy to-[#1e3a5f] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#F6B73C] text-brand-navy shrink-0 mt-0.5">
                    <Train size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#F6B73C] font-bold">
                        {isBn ? "🚄 এয়ারপোর্ট এক্সপ্রেস ও সিটি পাস অ্যাড-অন" : "🚄 ESSENTIAL AIRPORT RAIL & CITY PASS ADD-ON"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-300">
                        ID #{activeCityStack.airportTransit.productId}
                      </span>
                    </div>
                    <h4 className="font-serif text-base font-bold">
                      {activeCityStack.airportTransit.title} — ${activeCityStack.airportTransit.priceUsd} (~৳
                      {(activeCityStack.airportTransit.priceUsd * 122).toLocaleString()} BDT)
                    </h4>
                    <p className="text-xs text-slate-300">{activeCityStack.airportTransit.note}</p>
                  </div>
                </div>

                <a
                  href={TIQETS_PARTNER_LINK}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 shrink-0 shadow transition-colors"
                >
                  <span>{isBn ? "ট্রেন/পাস টিকেট নিন" : "Reserve Pass on Tiqets"}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          {/* ===============================================================
              WIDGET MODE 2: POPULAR TOURS & SOLD-OUT RESCUE CARDS
             =============================================================== */}
          {(widgetTab === "popular-tours" || widgetTab === "triple-stack") && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-black text-slate-900">
                    {isBn
                      ? "সোল্ড-আউট রেসকিউ এবং স্কিপ-দ্য-লাইন বেস্টসেলার টিকেট"
                      : "Verified Skip-the-Line & Sold-Out Rescue Tickets"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBn
                      ? "অফিসিয়াল মিউজিয়াম কাউন্টারে টিকেট শেষ হয়ে গেলে এই সংরক্ষিত স্লটগুলো ব্যবহার করুন"
                      : "Curated high-demand attractions featuring dedicated entrances, rooftop access, and audio guides"}
                  </p>
                </div>

                {/* Audience & Feature Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: "all", label: isBn ? "সব আকর্ষণ" : "All Top Sellers" },
                    { id: "sold-out-rescue", label: isBn ? "🔥 সোল্ড-আউট রেসকিউ" : "🔥 Sold-Out Rescue Slots" },
                    { id: "viewpoint", label: isBn ? "🌆 রুফটপ ও স্কাইডেক" : "🌆 Rooftops & Skydecks" },
                    { id: "cruise", label: isBn ? "🚢 রিভার ক্রুজ" : "🚢 River & Canal Cruises" },
                    { id: "transit", label: isBn ? "💎 সিটি পাস" : "💎 Multi-Attraction Passes" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCategoryFilter(f.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        categoryFilter === f.id
                          ? "bg-brand-navy text-white"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                  {selectedCityId !== "all" && (
                    <button
                      onClick={() => setSelectedCityId("all")}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-brand-navy bg-[#F6B73C]/25 hover:bg-[#F6B73C]/40 cursor-pointer"
                    >
                      {isBn ? "সব ৯টি শহর দেখুন" : "Show All 9 Cities"}
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayAttractions.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                          {isBn ? item.badgeBn : item.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.cityName} • #{item.productId}
                        </span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-slate-900 leading-snug">
                        {isBn ? item.titleBn : item.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isBn ? item.whyItConvertsBn : item.whyItConverts}
                      </p>

                      {/* Feature tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {item.skipTheLine && (
                          <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                            ✓ Skip-the-Line
                          </span>
                        )}
                        {item.rooftopAccess && (
                          <span className="text-[10px] font-mono bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded">
                            ✓ Rooftop / Skydeck
                          </span>
                        )}
                        {item.audioGuide && (
                          <span className="text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                            🎧 Audio Guide
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 block">
                            {isBn ? item.audienceMatchBn : item.audienceMatch}
                          </span>
                          <div className="text-base font-black text-brand-navy">
                            ${item.priceUsd} USD{" "}
                            <span className="text-xs font-mono font-normal text-slate-500">
                              (~৳{item.priceBdt.toLocaleString()} BDT)
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setActiveCalendarProduct(item);
                            setWidgetTab("availability-calendar");
                          }}
                          className="text-[11px] font-mono font-bold text-slate-600 hover:text-brand-navy underline cursor-pointer"
                        >
                          {isBn ? "তারিখ চেক" : "Check Date"}
                        </button>
                      </div>

                      <a
                        href={TIQETS_PARTNER_LINK}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full bg-brand-navy hover:bg-[#1e3a5f] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                      >
                        <span>
                          {isBn
                            ? `Tiqets-এ ই-টিকেট নিন (#${item.productId})`
                            : `Get Instant E-Ticket on Tiqets (#${item.productId})`}
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              WIDGET MODE 3: AVAILABILITY CALENDAR & FAMILY BDT CALCULATOR
             =============================================================== */}
          {widgetTab === "availability-calendar" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700">
                    {isBn ? "📅 Tiqets অ্যাভেইলেবিলিটি ও স্লট ক্যালেন্ডার" : "📅 TIQETS LIVE AVAILABILITY & BDT SLOT PLANNER"}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900">
                    {isBn
                      ? "আপনার ভ্রমণের তারিখ ও যাত্রীর সংখ্যা অনুযায়ী টিকেট বাজেট দেখুন"
                      : "Select Attraction, Date & Travelers to Lock Your Timed Entry"}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="tiqets-attraction-select" className="text-xs font-bold text-slate-700 block mb-1.5">
                      {isBn ? "১. আকর্ষণ নির্বাচন করুন:" : "1. Choose High-Demand Attraction:"}
                    </label>
                    <select
                      id="tiqets-attraction-select"
                      value={activeCalendarProduct.productId}
                      onChange={(e) => {
                        const found = TIQETS_TOP_ATTRACTIONS.find((a) => a.productId === e.target.value);
                        if (found) setActiveCalendarProduct(found);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800"
                    >
                      {TIQETS_TOP_ATTRACTIONS.map((attr) => (
                        <option key={attr.productId} value={attr.productId}>
                          [{attr.cityName}] {isBn ? attr.titleBn : attr.title} — ${attr.priceUsd} (#{attr.productId})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tiqets-entry-date-input" className="text-xs font-bold text-slate-700 block mb-1.5">
                        {isBn ? "২. ভ্রমণের তারিখ:" : "2. Preferred Entry Date:"}
                      </label>
                      <input
                        id="tiqets-entry-date-input"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        {isBn ? "৩. যাত্রীর সংখ্যা:" : "3. Number of Travelers:"}
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setPartySize(num)}
                            className={`flex-1 py-2.5 rounded-xl font-mono text-xs font-bold border cursor-pointer ${
                              partySize === num
                                ? "bg-brand-navy text-white border-brand-navy"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {num} {num === 1 ? "Adult" : "Pax"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Morning Time Slots */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-slate-600 block">
                    {isBn
                      ? `⚡ ${selectedDate} তারিখের প্রস্তাবিত ফাস্ট-ট্র্যাক টাইম স্লট:`
                      : `⚡ Recommended Fast-Track Entry Windows for ${selectedDate}:`}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["09:00 AM (Shortest Queue)", "11:30 AM (Standard)", "02:30 PM (Afternoon)", "05:30 PM (Sunset Slot)"].map(
                      (slot) => (
                        <span
                          key={slot}
                          className="text-xs font-mono bg-white border border-emerald-300 text-emerald-900 px-3 py-1.5 rounded-lg font-semibold"
                        >
                          ● {slot}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Right Summary & Conversion Box */}
              <div className="lg:col-span-5 bg-brand-navy text-white rounded-2xl p-6 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F6B73C] font-bold block">
                    TIQETS INSTANT E-TICKET SUMMARY
                  </span>
                  <h4 className="font-serif text-lg font-bold leading-snug">
                    {isBn ? activeCalendarProduct.titleBn : activeCalendarProduct.title}
                  </h4>
                  <div className="text-xs text-slate-300 space-y-1 font-mono">
                    <div>City Hub: {activeCalendarProduct.cityName} ({activeCalendarProduct.country})</div>
                    <div>Tiqets Product ID: #{activeCalendarProduct.productId}</div>
                    <div>Selected Date: {selectedDate} • {partySize} Traveler(s)</div>
                  </div>

                  <div className="pt-3 border-t border-white/15 space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>{isBn ? "মোট আন্তর্জাতিক মূল্য:" : "Estimated Total (USD):"}</span>
                      <span className="font-mono font-bold text-white text-base">
                        ${activeCalendarProduct.priceUsd * partySize} USD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>{isBn ? "বাংলাদেশি টাকায় (আনুমানিক):" : "BDT Equivalent (Dual-Currency Card):"}</span>
                      <span className="font-mono font-bold text-[#F6B73C] text-base">
                        ~৳{(activeCalendarProduct.priceBdt * partySize).toLocaleString()} BDT
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={TIQETS_PARTNER_LINK}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="w-full bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <span>
                      {isBn
                        ? "Tiqets-এ লাইভ স্লট ও টিকেট নিশ্চিত করুন"
                        : "Lock Timed Entry Slot on Tiqets Now"}
                    </span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={`https://wa.me/8801784385335?text=${encodeURIComponent(
                      `Hi URAL! I want to book Tiqets attraction: ${activeCalendarProduct.title} (#${activeCalendarProduct.productId}) for ${partySize} travelers on ${selectedDate} in BDT.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-white/15 transition-colors"
                  >
                    <span>
                      {isBn
                        ? "💬 কার্ড নেই? WhatsApp-এ BDT-তে টিকেট কাটুন"
                        : "💬 No Dual-Currency Card? Request BDT Booking via WhatsApp"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          EAST WING: KLOOK ASIA & MIDDLE EAST EXPERIENCES HUB
         ===================================================================== */}
      {activeRegion === "east" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-600 block">
                  {isBn ? "🎢 এশিয়া ও মধ্যপ্রাচ্য অ্যাক্টিভিটি ইঞ্জিন" : "🎢 ASIA & MIDDLE EAST EXPERIENCES ENGINE"}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-black text-slate-900">
                  {isBn
                    ? "দুবাই, ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর ও মালদ্বীপ অ্যাক্টিভিটি পাস"
                    : "Top Sightseeing Passes, Desert Safaris & Theme Parks Across Asia"}
                </h2>
              </div>

              <a
                href={AFFILIATE_LINKS.klook}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5"
              >
                <span>{isBn ? "Klook-এ সব অফার দেখুন" : "Explore All Deals on Klook"}</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <KlookActivitiesWidget />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                {
                  city: "Bangkok & Phuket 🇹🇭",
                  items: "Chao Phraya Princess Dinner Cruise, Safari World, Phi Phi Island Speedboat",
                  destId: "thailand-guide"
                },
                {
                  city: "Kuala Lumpur 🇲🇾",
                  items: "Petronas Twin Towers Skybridge, Genting Awana SkyWay, Batu Caves",
                  destId: "malaysia-guide"
                },
                {
                  city: "Singapore 🇸🇬",
                  items: "Gardens by the Bay, Universal Studios Sentosa, Marina Bay Sands SkyPark",
                  destId: "singapore-guide"
                },
                {
                  city: "Dubai 🇦🇪",
                  items: "Burj Khalifa Level 124/125, Red Dunes Desert Safari, Museum of the Future",
                  destId: "dubai-guide"
                }
              ].map((hub) => (
                <div key={hub.city} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-slate-900">{hub.city}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{hub.items}</p>
                  </div>
                  <button
                    onClick={() => onNavigate(`/destinations/${hub.destId}`)}
                    className="text-xs font-mono font-bold text-brand-navy hover:text-brand-emerald inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isBn ? "৫-দিনের আইটিনারারি দেখুন" : "View 5-Day Itinerary"}</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 💳 BANGLADESHI DUAL-CURRENCY CARD & VISA HOLDER ADVISORY */}
      <div className="bg-brand-navy/5 border border-brand-navy/15 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-navy block">
            {isBn ? "🇧🇩 বাংলাদেশি পাসপোর্ট ও পেমেন্ট গাইড" : "🇧🇩 BANGLADESHI TRAVELER PAYMENT & VISA BRIDGE"}
          </span>
          <h3 className="font-serif text-lg font-bold text-slate-900">
            {isBn
              ? "ইউরোপ বা আমেরিকার মিউজিয়ামে বাংলাদেশি কার্ড দিয়ে কীভাবে টিকেট কাটবেন?"
              : "How to Book European, UK & US Attractions from Bangladesh Without Card Declines"}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {isBn
              ? "১) আপনার পাসপোর্টে বার্ষিক $12,000 ট্রাভেল কোটা এন্ডোর্স করা থাকলে ব্যাংকের অ্যাপে E-Commerce ও 3D-Secure চালু করে সরাসরি Tiqets থেকে ই-টিকেট কাটুন। ২) কার্ড না থাকলে আমাদের WhatsApp ডেস্কে (+8801784385335) মেসেজ দিয়ে বিকাশ/ব্যাংক ট্রান্সফারের মাধ্যমে BDT-তে ভেরিফায়েড টিকেট সংগ্রহ করুন।"
              : "1) Use your passport-endorsed Dual-Currency Visa/Mastercard on Tiqets (supports 3D-Secure OTP) so you don't face foreign ticket machine declines abroad. 2) Don't have an endorsed card yet? Message our Dhaka desk on WhatsApp (+8801784385335) to issue your skip-the-line QR vouchers in BDT."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate("/blog/dual-currency-card-endorsement-bangladesh")}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-brand-navy font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-colors"
          >
            {isBn ? "ডুয়াল-কারেন্সি কার্ড গাইড" : "Read Card Endorsement Guide"}
          </button>
          <a
            href={TIQETS_PARTNER_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-brand-navy hover:bg-[#1e3a5f] text-white font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 transition-colors"
          >
            <span>{isBn ? "Tiqets অফিসিয়াল পোর্টাল" : "Open Tiqets Portal"}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
