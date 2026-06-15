import React, { useState, useEffect } from "react";
import {
  Globe,
  Plane,
  Building,
  ShieldAlert,
  Compass,
  DollarSign,
  Briefcase,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Link2,
  Calendar,
  Layers,
  HelpCircle,
  Clock
} from "lucide-react";

// Types
import { FlightRoute, HotelGuide, VisaGuide, DestinationGuide, TripCostData, BlogPost } from "./types";

// Database Constants
import { FLIGHTS_DATA, HOTELS_DATA, VISA_DATA, DESTINATIONS_DATA, TRIP_COSTS_DATA, BLOG_DATA } from "./constants";

// Subcomponents
import { AeoInspector } from "./components/AeoInspector";
import { TravelpayoutsWidget } from "./components/TravelpayoutsWidget";
import { TravelpayoutsEmbed } from "./components/TravelpayoutsEmbed";
import { InteractiveTools } from "./components/InteractiveTools";
import { useSeoMeta, buildFaqSchema } from "./hooks/useSeoMeta";
const heroBgImage = new URL("./assets/images/clouds_boat_hero_1781438671378.jpg", import.meta.url).href;

type SectionType = "home" | "flights" | "hotels" | "visa" | "destinations" | "costs" | "tools" | "blog";

export default function App() {
  // Simulated Browser Routing State
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSearchTab, setHeroSearchTab] = useState<"flights" | "hotels" | "visa">("flights");
  const [heroFlightRoute, setHeroFlightRoute] = useState("dhaka-kathmandu");
  
  // Custom Action Affiliate Conversion Toast overlay state
  const [affiliateToast, setAffiliateToast] = useState<string | null>(null);
  const triggerAffiliateToast = (msg: string) => {
    setAffiliateToast(msg);
    setTimeout(() => {
      setAffiliateToast(null);
    }, 4500);
  };
  const [heroHotelCity, setHeroHotelCity] = useState("kathmandu-hotels");
  const [heroVisaCountry, setHeroVisaCountry] = useState("nepal-visa");

  // Custom Interactive Home states
  const [currencyAmount, setCurrencyAmount] = useState<number>(10000);
  const [currencyToOption, setCurrencyToOption] = useState<"USD" | "NPR" | "THB" | "MYR" | "AED">("NPR");
  const [emailSubscribed, setEmailSubscribed] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [packingItems, setPackingItems] = useState([
    { id: 1, text: "6 Months Valid Original Passport", checked: true },
    { id: 2, text: "Bank Statement (Minimum BDT 150K balance)", checked: true },
    { id: 3, text: "Printed Roundtrip Air Ticket Copy", checked: false },
    { id: 4, text: "Confirmed Hotel Voucher copy", checked: false },
    { id: 5, text: "2x2 white background photos (for specific entries)", checked: false },
  ]);

  // Parse path to resolve active section and optional query parameters
  const getRouteDetails = () => {
    const url = new URL(currentPath, "https://ural.travel");
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    let section: SectionType = "home";
    let parameterId: string | null = null;

    if (pathname.startsWith("/flights")) {
      section = "flights";
      parameterId = searchParams.get("route") || "dhaka-kathmandu";
    } else if (pathname.startsWith("/hotels")) {
      section = "hotels";
      parameterId = searchParams.get("city") || "kathmandu-hotels";
    } else if (pathname.startsWith("/visa")) {
      section = "visa";
      parameterId = searchParams.get("country") || "nepal-visa";
    } else if (pathname.startsWith("/destinations")) {
      section = "destinations";
      parameterId = searchParams.get("country") || "nepal-guide";
    } else if (pathname.startsWith("/costs")) {
      section = "costs";
      parameterId = searchParams.get("country") || "nepal-costs";
    } else if (pathname.startsWith("/tools")) {
      section = "tools";
    } else if (pathname.startsWith("/blog")) {
      section = "blog";
      parameterId = searchParams.get("slug") || "cheap-flight-booking-hacks-dhaka";
    }

    return { section, parameterId };
  };

  const { section, parameterId } = getRouteDetails();

  // Dynamically compute metadata and schema
  let seoTitle = "URAL — Compare Flights, Hotels & Visa Guides for Bangladeshi Travelers";
  let seoDescription = "Compare flight prices from Dhaka to Nepal, Thailand, Malaysia and Dubai, check visa requirements step by step, and plan your trip budget in BDT.";
  let seoSchema: any = undefined;

  if (section === "flights") {
    const activeRoute = FLIGHTS_DATA.find(r => r.id === parameterId) || FLIGHTS_DATA[0];
    const year = new Date().getFullYear();
    seoTitle = activeRoute.id === "dhaka-kathmandu"
      ? `Dhaka to Kathmandu Flight Guide 2026: Price, Time & Visa | URAL`
      : `Flights from Dhaka to ${activeRoute.to.split(" (")[0]} (${activeRoute.country}) ${year} | URAL`;
    seoDescription = activeRoute.id === "dhaka-kathmandu"
      ? `Direct Dhaka to Kathmandu flights take 1h30m on Biman Bangladesh or Himalaya Airlines, from BDT 28,000 roundtrip. Bangladeshis get a free visa on arrival.`
      : `Compare flights from Dhaka to ${activeRoute.to.split(" (")[0]}. Check flight duration, direct airlines, and BDT fares.`;
    
    let schemaObj: any = undefined;
    try {
      if (activeRoute.schemaMarkup?.code) {
        schemaObj = JSON.parse(activeRoute.schemaMarkup.code);
      }
    } catch (e) {
      console.error("Schema parse error:", e);
    }
    seoSchema = schemaObj ? [schemaObj, buildFaqSchema(activeRoute.faqs)] : buildFaqSchema(activeRoute.faqs);

  } else if (section === "hotels") {
    const activeHotel = HOTELS_DATA.find(h => h.id === parameterId) || HOTELS_DATA[0];
    seoTitle = activeHotel.id === "kathmandu-hotels"
       ? `Best Hotels in Kathmandu for Bangladeshi Travelers (2026) | URAL`
       : `Top Rated Hotels in ${activeHotel.city} | URAL`;
    seoDescription = activeHotel.id === "kathmandu-hotels"
       ? `Where to stay in Kathmandu: Thamel for budget travelers from BDT 1,500/night, Lazimpat for comfort, and Boudha for a quieter trip. Full neighborhood guide.`
       : `Compare clean rooms, recommended zones, and hotels in ${activeHotel.city} starting from cheap BDT tourist rates.`;
    
    let schemaObj: any = undefined;
    try {
      if (activeHotel.schemaMarkup?.code) {
        schemaObj = JSON.parse(activeHotel.schemaMarkup.code);
      }
    } catch (e) {
      console.error("Schema parse error:", e);
    }
    seoSchema = schemaObj ? [schemaObj, buildFaqSchema(activeHotel.faqs)] : buildFaqSchema(activeHotel.faqs);

  } else if (section === "visa") {
    const activeVisa = VISA_DATA.find(v => v.id === parameterId) || VISA_DATA[0];
    seoTitle = activeVisa.id === "nepal-visa"
      ? `Nepal Visa for Bangladeshi Citizens 2026: Free Visa on Arrival Guide | URAL`
      : `${activeVisa.country} Visa for Bangladeshi Travelers 2026 | URAL`;
    seoDescription = activeVisa.id === "nepal-visa"
      ? `Bangladeshi citizens get a free 30-day Nepal visa on arrival for their first trip each year. Full document checklist, fees for repeat visits, and step-by-step process.`
      : `Check complete visa requirements, costs in BDT, step-by-step instructions, and checklist for ${activeVisa.country} from Dhaka.`;
    
    let schemaObj: any = undefined;
    try {
      if (activeVisa.schemaMarkup?.code) {
        schemaObj = JSON.parse(activeVisa.schemaMarkup.code);
      }
    } catch (e) {
      console.error("Schema parse error:", e);
    }
    seoSchema = schemaObj ? [schemaObj, buildFaqSchema(activeVisa.faqs)] : buildFaqSchema(activeVisa.faqs);

  } else if (section === "destinations") {
    const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];
    seoTitle = activeDes.id === "nepal-guide"
      ? `Nepal Trip Plan from Bangladesh: 5-Day Itinerary & Costs (2026) | URAL`
      : `${activeDes.country} Tour Itinerary & Travel Plan from Bangladesh | URAL`;
    seoDescription = activeDes.id === "nepal-guide"
      ? `A day-by-day Nepal itinerary for Bangladeshi travelers - Kathmandu and Pokhara highlights, local transport, food, and a realistic budget in BDT.`
      : `Find tourist route plans, day-by-day itineraries, local transport guides, and estimated daily spends in BDT.`;
    
    let schemaObj: any = undefined;
    try {
      if (activeDes.schemaMarkup?.code) {
        schemaObj = JSON.parse(activeDes.schemaMarkup.code);
      }
    } catch (e) {
      console.error("Schema parse error:", e);
    }
    seoSchema = schemaObj ? [schemaObj, buildFaqSchema(activeDes.faqs)] : buildFaqSchema(activeDes.faqs);

  } else if (section === "costs") {
    const activeCost = TRIP_COSTS_DATA.find(c => c.id === parameterId) || TRIP_COSTS_DATA[0];
    seoTitle = activeCost.id === "nepal-costs"
      ? `Nepal Trip Cost from Bangladesh 2026: Full Budget Breakdown (BDT) | URAL`
      : `${activeCost.country} Trip Cost from Bangladesh: Full Budget Sheet | URAL`;
    seoDescription = activeCost.id === "nepal-costs"
      ? `What a 5-day Nepal trip really costs from Bangladesh - flights, hotels, food, and transport in BDT, from budget (BDT 45,000) to luxury.`
      : `Detailed BDT breakdown of flights, hotels, dining, and sightseeing costs for planning your trip from Dhaka to ${activeCost.country}.`;
    
    let schemaObj: any = undefined;
    try {
      if (activeCost.schemaMarkup?.code) {
        schemaObj = JSON.parse(activeCost.schemaMarkup.code);
      }
    } catch (e) {
      console.error("Schema parse error:", e);
    }
    seoSchema = schemaObj ? [schemaObj, buildFaqSchema(activeCost.faqs)] : buildFaqSchema(activeCost.faqs);
  }

  // Call the hook at the top level
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    schema: seoSchema
  });

  // Navigation Helper that emulates URL path routing
  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Synchronise system time
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    // Static simulation based on 2026-06-14 local mock time
    setCurrentTime("June 14, 2026 - 04:32 AM (Dhaka)");
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans leading-relaxed selection:bg-[#F6B73C] selection:text-[#102A43]">
      
      {/* 🖥️ SIMULATED BROWSER BAR (Fulfills programmatic URL verification requirements) */}
      <div className="bg-[#0c2033]/90 text-slate-300 text-xs px-4 py-2 border-b border-slate-800 flex items-center justify-between gap-4 font-mono sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          </div>
          <span className="text-slate-400 hidden md:inline ml-2">Secure Sandbox Mode:</span>
        </div>
        
        {/* Dynamic Address Box */}
        <div className="bg-slate-900 border border-slate-700/60 rounded px-3 py-1 flex items-center gap-2 flex-grow max-w-xl text-center md:text-left shadow-inner">
          <Globe size={12} className="text-emerald-500" />
          <span className="text-slate-350 select-none truncate">https://ural.travel{currentPath}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={12} className="text-[#F6B73C]" />
          <span className="text-slate-400 text-[10px] hidden sm:inline">{currentTime}</span>
        </div>
      </div>

      {/* 🟦 0. TOP BAR (Height: 40px) */}
      <div id="top-bar-hub" className="h-10 bg-[#F8FAFC] border-b border-slate-200 text-xs text-slate-600 flex items-center justify-between px-4 sm:px-6 lg:px-8 font-sans">
        <div className="text-slate-500 font-semibold tracking-wide text-[10px] sm:text-xs">
          Flights, Hotels & Visa Guides for Bangladeshi Travelers
        </div>

        <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono font-medium shrink-0">
          <span className="text-slate-400 select-none">
            Language: <b className="text-[#102A43]">EN</b> | <span className="text-slate-400 cursor-not-allowed" title="Bengali coming soon">বাংলা (Soon)</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <button onClick={() => navigateTo("/tools")} className="text-[#102A43] hover:text-[#F6B73C] font-bold">
            Free Travel Tools
          </button>
        </div>
      </div>

      {/* 🟦 1. MAIN NAVBAR (Height: 72px, Sticky for optimal conversions) */}
      <header id="main-navbar-sticky" className="sticky top-0 z-40 bg-[#102A43] text-white border-b border-slate-800 h-[72px] flex items-center shadow-lg transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("/")}>
            {/* Logo representing 'Cloud Messenger' */}
            <div className="bg-gradient-to-br from-[#F8FAFC] to-[#E5E7EB] text-[#102A43] p-2 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            </div>
            <div>
              <h1 className="font-serif font-black text-[#F6B73C] text-lg tracking-tight flex items-center gap-1.5 leading-none">
                URAL
              </h1>
              <p className="text-[8px] sm:text-[9px] text-[#F6B73C] tracking-wider font-mono mt-0.5 leading-none font-semibold">Air Travel Made Simple</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
            <button
              id="nav-home"
              onClick={() => navigateTo("/")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "home" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Home
            </button>
            <button
              id="nav-flights"
              onClick={() => navigateTo("/flights")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "flights" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Flights
            </button>
            <button
              id="nav-hotels"
              onClick={() => navigateTo("/hotels")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "hotels" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Hotels
            </button>
            <button
              id="nav-visa"
              onClick={() => navigateTo("/visa")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "visa" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Visa
            </button>
            <button
              id="nav-destinations"
              onClick={() => navigateTo("/destinations")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "destinations" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Destinations
            </button>
            <button
              id="nav-costs"
              onClick={() => navigateTo("/costs")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "costs" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Costs
            </button>
            <button
              id="nav-tools"
              onClick={() => navigateTo("/tools")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "tools" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Tools
            </button>
            <button
              id="nav-blog"
              onClick={() => navigateTo("/blog")}
              className={`hover:text-[#F6B73C] transition-all cursor-pointer py-1 ${section === "blog" ? "text-[#F6B73C] border-b-2 border-[#F6B73C]" : "text-slate-200"}`}
            >
              Blog
            </button>
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            <button
              id="btn-nav-search-trigger"
              onClick={() => navigateTo("/tools")}
              className="text-slate-350 hover:text-[#F6B73C] p-2 hover:bg-slate-800/40 rounded-lg transition-colors hidden sm:block"
              title="Search Travel Resources"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button
              id="btn-start-trip-cta"
              onClick={() => navigateTo("/destinations")}
              className="bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-bold text-[10px] sm:text-xs uppercase px-3.5 py-1.5 sm:py-2.5 rounded-lg shadow-md transition-all cursor-pointer tracking-wider whitespace-nowrap"
            >
              Start Trip
            </button>

            <button
              id="mobile-menu-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-700 text-slate-350 hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-drawer" className="absolute top-[72px] left-0 w-full lg:hidden bg-[#0c2033] border-t border-slate-800 py-3 px-4 font-semibold text-xs flex flex-col gap-2 shadow-2xl animate-fade-in z-50">
            <button id="mob-home" onClick={() => navigateTo("/")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "home" ? "text-[#F6B73C]" : "text-slate-200"}`}>Home</button>
            <button id="mob-flights" onClick={() => navigateTo("/flights")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "flights" ? "text-[#F6B73C]" : "text-slate-200"}`}>Flights</button>
            <button id="mob-visa" onClick={() => navigateTo("/visa")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "visa" ? "text-[#F6B73C]" : "text-slate-200"}`}>Visa Guides</button>
            <button id="mob-hotels" onClick={() => navigateTo("/hotels")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "hotels" ? "text-[#F6B73C]" : "text-slate-200"}`}>Hotels</button>
            <button id="mob-destinations" onClick={() => navigateTo("/destinations")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "destinations" ? "text-[#F6B73C]" : "text-slate-200"}`}>Destinations</button>
            <button id="mob-costs" onClick={() => navigateTo("/costs")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "costs" ? "text-[#F6B73C]" : "text-slate-200"}`}>Trip Costs</button>
            <button id="mob-tools" onClick={() => navigateTo("/tools")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "tools" ? "text-[#F6B73C]" : "text-slate-200"}`}>Travel Tools</button>
            <button id="mob-blog" onClick={() => navigateTo("/blog")} className={`py-2 text-left hover:text-[#F6B73C] transition-colors ${section === "blog" ? "text-[#F6B73C]" : "text-slate-200"}`}>Travel Blog</button>
          </div>
        )}
      </header>

      {/* ⚡ ACTIVE TEMPLATE RENDER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* -------------------------------------------------------------
            🏠 VIEW 1: HOME PAGE (CONVERSION HUB)
        ------------------------------------------------------------- */}
        {section === "home" && (
          <div className="space-y-16">
            
            {/* 🟦 SECTION 1: TOP SECTION (ABOVE THE FOLD) — PRIMARY CONVERSION ZONE */}
            <div className="relative rounded-3xl overflow-hidden bg-[#102A43] text-white p-8 md:p-14 shadow-2xl border border-slate-800/80 min-h-[580px] flex items-center">
              
              {/* Drift Cloud background representation */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={heroBgImage} 
                  alt="URAL cloud wood boat background" 
                  className="w-full h-full object-cover opacity-20 select-none pointer-events-none mix-blend-lighten animate-slow-pan"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0b1b2d] via-[#102A43]/90 to-[#0b1b2d]/70 z-10" />
              </div>

              {/* Master Full-Width Stack for primary conversion focus */}
              <div className="relative z-20 w-full space-y-8">
                <div className="max-w-3xl space-y-4">
                  <span className="text-[10px] font-mono font-bold text-[#F6B73C] bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C] animate-ping"></span>
                    ✈️ Real flight prices, updated daily — from Dhaka
                  </span>
                  
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] leading-tight font-black tracking-tight text-white">
                    Compare Cheap Flights <br />
                    from Dhaka, Instantly
                  </h1>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-light font-sans">
                    URAL is a free travel guide built for people flying out of Dhaka. Check real flight prices to Nepal, Thailand, Malaysia, and Dubai — learn exactly what visa documents you need, compare hotels by area and budget, and figure out your full trip cost in BDT before you book a single thing.
                  </p>
                </div>

                {/* VISUALLY DOMINANT: Flight Search Widget as requested in Section 1 */}
                <div className="bg-[#0f1d2e]/95 border border-slate-700/60 rounded-2xl p-2 sm:p-4 shadow-2xl backdrop-blur-md w-full">
                  <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase block mb-3 px-2 tracking-wider">✈️ LIVE FLIGHT PRICE SEARCH</span>
                  <div className="text-slate-900">
                    <TravelpayoutsEmbed />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-2">
                  <span className="text-slate-400 font-normal">Popular flight routes from Dhaka:</span>
                  <button onClick={() => navigateTo("/flights?route=dhaka-kathmandu")} className="text-[#F6B73C] hover:underline">Dhaka → Kathmandu (KTM) 🇳🇵</button>
                  <span className="text-slate-700">|</span>
                  <button onClick={() => navigateTo("/flights?route=dhaka-bangkok")} className="text-[#F6B73C] hover:underline">Dhaka → Bangkok (BKK) 🇹🇭</button>
                  <span className="text-slate-700">|</span>
                  <button onClick={() => navigateTo("/flights?route=dhaka-kuala-lumpur")} className="text-[#F6B73C] hover:underline">Dhaka → Kuala Lumpur (KUL) 🇲🇾</button>
                </div>
              </div>
            </div>

            {/* 🟦 SECTION 2: QUICK DESTINATION ENTRY */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">Popular destinations from Bangladesh</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Where Are You Flying Next?</h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">Pick a destination to see flights, visa requirements, hotel guides, and a full trip budget — all in BDT.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { city: "Kathmandu", country: "Nepal", tag: "Free visa on arrival for Bangladeshis. Budget hotels in Thamel from BDT 1,500/night. A great first international trip.", code: "nepal-guide", img: "🇳🇵", path: "/destinations?country=nepal-guide" },
                  { city: "Bangkok", country: "Thailand", tag: "Online e-Visa — approved in 5–10 days. Street food, shopping, islands, and beautiful temples.", code: "thailand-guide", img: "🇹🇭", path: "/destinations?country=thailand-guide" },
                  { city: "Kuala Lumpur", country: "Malaysia", tag: "Simple online eVisa. Affordable hotels, excellent halal food, and easy transit across Kuala Lumpur.", code: "malaysia-guide", img: "🇲🇾", path: "/destinations?country=malaysia-guide" },
                  { city: "Dubai", country: "UAE", tag: "eVisa in 3–5 days. Burj Khalifa, desert safari, duty-free shopping — 4h 45m direct from Dhaka.", code: "dubai-guide", img: "🇦🇪", path: "/destinations?country=dubai-guide" }
                ].map((dest, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigateTo(dest.path)}
                    className="border border-slate-200 hover:border-[#F6B73C] bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between transform hover:-translate-y-1"
                    style={{ minHeight: "170px" }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl shrink-0 mt-0.5">{dest.img}</span>
                      <div className="space-y-1">
                        <h4 className="font-serif font-black text-base text-[#102A43]">{dest.city}, {dest.country}</h4>
                        <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{dest.tag}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <span className="text-[10px] font-mono font-bold text-[#102A43] hover:text-[#F6B73C] flex items-center gap-1 transition-colors">
                        Plan This Trip →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟦 SECTION 3: “PLAN YOUR TRIP” PATHWAY */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  🎯 Plan your next trip from Dhaka
                </span>
                <h3 className="font-serif text-2xl sm:text-3.5xl font-black text-[#102A43] tracking-tight">
                  Everything You Need Before You Book
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Not sure where to start? Check flight prices first, then compare hotels in the area you want to stay, and use our visa guide to know exactly what documents to prepare. No travel agent needed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <button 
                  onClick={() => navigateTo("/flights")}
                  className="bg-[#102A43] text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Find Cheap Flights →
                </button>
                <button 
                  onClick={() => navigateTo("/hotels")}
                  className="bg-[#102A43] text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Search Budget Hotels →
                </button>
                <button 
                  onClick={() => navigateTo("/destinations")}
                  className="bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Browse Travel Guides →
                </button>
              </div>
            </div>

            {/* 🟦 SECTION 4: HOTEL SEARCH ENTRY */}
            <div className="relative rounded-3xl overflow-hidden bg-[#102A43] text-white p-8 md:p-12 shadow-xl border border-slate-800">
              
              <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
                <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/20 px-3 py-1 rounded-full">
                  🏨 Find the right hotel for your trip
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">Compare Hotels in Kathmandu, Bangkok, KL & Dubai</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                  Search by city and date to see real prices. Budget room in Thamel or a family suite in Pratunam — compare options and book directly.
                </p>
              </div>

              {/* HOTEL WIDGET INTEGRATION: Visually distinct & secondary to flights widget */}
              <div className="w-full text-slate-900 bg-white rounded-2xl p-2 sm:p-4 shadow-xl">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-3 px-2">🏨 Search Hotels</span>
                <TravelpayoutsWidget initialTab="hotels" />
              </div>

              {/* Quick links to pre-filled hotel lookups */}
              <div className="text-center text-xs font-mono text-slate-400 mt-6 flex flex-wrap justify-center items-center gap-2">
                <span>Top family-rated lodging selectors:</span>
                <button onClick={() => navigateTo("/hotels?city=kathmandu-hotels")} className="text-[#F6B73C] hover:underline">Thamel, Kathmandu 🇳🇵</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=bangkok-hotels")} className="text-[#F6B73C] hover:underline">Pratunam, Bangkok 🇹🇭</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=kuala-lumpur-hotels")} className="text-[#F6B73C] hover:underline">Bukit Bintang, KL 🇲🇾</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=dubai-hotels")} className="text-[#F6B73C] hover:underline">Deira, Dubai 🇦🇪</button>
              </div>
            </div>

            {/* 🟦 INTERACTIVE TOOLS DESK PANEL (Aesthetic calculation tools) */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
              <div className="border-l-4 border-[#102A43] pl-4">
                <h3 className="font-serif text-xl font-bold text-[#102A43]">Handy Travel Tools</h3>
                <p className="text-xs text-slate-500 font-mono">Quick tools to help you convert BDT, check what to pack, and estimate your trip budget.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Currency Converter (Interactive) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block mb-2">💸 Currency Converter</span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-[10px] uppercase w-12">BDT (৳)</span>
                        <input 
                          type="number" 
                          value={currencyAmount}
                          onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                          className="flex-grow bg-slate-50 border border-slate-200 rounded p-1 text-xs font-mono focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-[10px] uppercase w-12">To</span>
                        <select 
                          value={currencyToOption}
                          onChange={(e) => setCurrencyToOption(e.target.value as any)}
                          className="flex-grow bg-slate-50 border border-slate-250 rounded p-1 text-xs font-mono focus:outline-none font-bold"
                        >
                          <option value="NPR">NPR (Nepal Rupee)</option>
                          <option value="THB">THB (Thai Baht)</option>
                          <option value="MYR">MYR (Malaysian Ringgit)</option>
                          <option value="AED">AED (UAE Dirham)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-mono font-bold text-center bg-slate-50 py-1.5 rounded text-indigo-900">
                    ৳ {currencyAmount.toLocaleString()} BDT = &nbsp;
                    <span className="text-[#F6B73C]">
                      {currencyToOption === "NPR" ? (currencyAmount * 1.51).toFixed(2) :
                       currencyToOption === "THB" ? (currencyAmount * 0.31).toFixed(2) : 
                       currencyToOption === "MYR" ? (currencyAmount * 0.04).toFixed(2) :
                       (currencyAmount * 0.031).toFixed(2)} {currencyToOption}
                    </span>
                  </div>
                </div>

                {/* 2. Packing Checklist (Interactive checkboxes) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block mb-1">🧳 Packing Checklist</span>
                    <p className="text-[10px] text-slate-400 mb-2">Check requirements to keep track before your flight:</p>
                    <div className="space-y-1.5 text-[11px] font-medium text-slate-700">
                      {packingItems.slice(0, 3).map((item) => (
                        <label key={item.id} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                          <input 
                            type="checkbox" 
                            checked={item.checked}
                            onChange={() => {
                              setPackingItems(prev => prev.map(p => p.id === item.id ? { ...p, checked: !p.checked } : p));
                            }}
                            className="rounded text-[#F6B73C] focus:ring-[#F6B73C]"
                          />
                          <span className={item.checked ? "line-through text-slate-400" : ""}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-[#F6B73C] block mt-2 text-right">Interactive Outbound checklist</span>
                </div>

                {/* 3. Budget Planner Tool */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block mb-2">📊 Fast Budget Planner</span>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Get a rough estimate of what a 5-day trip costs — flights, hotel, food, and transport, all broken down in BDT.
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("/costs")}
                    className="bg-[#102A43] text-white hover:bg-slate-800 font-bold text-[10px] py-1.5 px-3 rounded-lg self-start mt-3"
                  >
                    Open Budget Calculator
                  </button>
                </div>

              </div>
            </div>

            {/* 🟦 SECTION 5: CONTENT DISCOVERY (SEO SUPPORT) */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">Travel Tips & Guides</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">From Our Travel Blog</h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">Practical guides for Bangladeshi travelers — cheaper flights, visa tips, and real trip budget breakdowns.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "5 Ways to Book Cheaper Flights from Dhaka", slug: "cheap-flight-booking-hacks-dhaka", time: "10 min read", excerpt: "Most people book flights at the wrong time and overpay by thousands of taka. These five habits consistently get cheaper tickets — and the last one most people skip entirely." },
                  { title: "Nepal vs Thailand: Which Is Better for Your First Trip?", slug: "nepal-vs-thailand-first-trip", time: "8 min read", excerpt: "Nepal gives free visa on arrival and a very low daily cost. Thailand takes a bit more visa paperwork but opens up beaches, markets, and city life. Here's how to choose." },
                  { title: "How to Keep Hotel Costs Low in Bangkok, KL, and Dubai", slug: "hotel-savings-guide-bangkok-kl-dubai", time: "6 min read", excerpt: "The right neighborhood makes a big difference. One metro stop away from the tourist area can save BDT 8,000–15,000 per trip without giving up comfort." }
                ].map((post, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    style={{ minHeight: "260px" }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{post.time}</span>
                      </div>
                      <h4 className="font-serif font-black text-base text-slate-900 hover:text-[#102A43] cursor-pointer leading-snug" onClick={() => navigateTo(`/blog?slug=${post.slug}`)}>
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">{post.excerpt}</p>
                    </div>

                    <button 
                      onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                      className="text-xs font-bold text-[#102A43] hover:text-[#F6B73C] self-start mt-4 flex items-center gap-1 transition-colors"
                    >
                      Read full tips →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟦 SECTION 6: TRUST + ENGAGEMENT */}
            <div className="bg-[#102A43] text-white rounded-3xl p-8 border border-slate-800 text-center space-y-6 flex flex-col justify-center" style={{ minHeight: "220px" }}>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest">Why Travelers Use URAL</span>
                <h3 className="font-serif text-2xl font-black">Simple, Free, and Built for Bangladesh</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full text-left">
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">✈️ Real Flight Prices</span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">“Compare prices from all major airlines flying from Dhaka”</p>
                  <p className="text-[10px] text-slate-350 leading-relaxed">Flight search covers Biman Bangladesh, Emirates, AirAsia, Thai Airways, and other airlines that fly out of Dhaka — updated daily.</p>
                </div>
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">⚡ Fast and Free</span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">“No signup, no fees”</p>
                  <p className="text-[10px] text-slate-350 leading-relaxed">Search flights and hotels without creating an account. No hidden charges. Click through to book directly with the airline or hotel.</p>
                </div>
                <div className="space-y-1 p-4 bg-[#F6B73C]/10 rounded-xl border border-[#F6B73C]/30">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">🤝 Trusted Partners</span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">“Powered by Travelpayouts”</p>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-sans">Our flight and hotel search is powered by Travelpayouts, a global travel affiliate network trusted by thousands of travel websites.</p>
                </div>
              </div>
            </div>

            {/* 🟦 SECTION 7 / EMAIL ACTION SIGNUP */}
            <div className="bg-gradient-to-r from-[#102A43] to-slate-900 text-white rounded-3xl p-8 border border-slate-800 text-center flex flex-col justify-center items-center space-y-4" style={{ minHeight: "180px" }}>
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-white">Get Flight Deal Alerts from Dhaka</h3>
                <p className="text-xs text-slate-300">Sign up to get notified when flight prices from Dhaka drop below BDT 20,000 — to Nepal, Bangkok, KL, or Dubai.</p>
              </div>

              {emailSubscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-6 py-2.5 rounded-lg font-mono">
                  ✔ You're subscribed! We'll email you at <b>{userEmail}</b> when Dhaka flight prices drop. Happy travels!
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (userEmail.trim()) {
                      setEmailSubscribed(true);
                    }
                  }}
                  className="flex flex-wrap items-center justify-center gap-2 max-w-md w-full"
                >
                  <input 
                    type="email" 
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-grow bg-[#16273b] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F6B73C]"
                  />
                  <button 
                    type="submit"
                    className="bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            ✈️ VIEW 2: FLIGHTS INDEX & LANDING PAGES
        ------------------------------------------------------------- */}
        {section === "flights" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Router for cities */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">SELECT FLIGHT ROUTE:</span>
              <div className="space-y-2">
                {FLIGHTS_DATA.map((route) => (
                  <button
                    key={route.id}
                    id={`btn-route-select-${route.id}`}
                    onClick={() => navigateTo(`/flights?route=${route.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === route.id
                        ? "bg-[#102A43] text-white border-[#102A43] shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>{route.from} ✈️ {route.to}</span>
                    <ArrowRight size={12} className={parameterId === route.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>

              {/* Conversion Ads banner */}
              <div className="bg-[#102A43] text-white p-5 rounded-xl border border-slate-800 space-y-3 shadow">
                <span className="text-[10px] text-[#F6B73C] font-mono uppercase tracking-widest block font-bold">💰 Special Offer</span>
                <h4 className="font-serif text-sm font-bold">Save up to BDT 3,500 on Your Next Booking</h4>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Compare prices for your {FLIGHTS_DATA.find(r => r.id === parameterId)?.country || "Nepal"} flight — lowest fares through our verified booking partners.
                </p>
              </div>
            </div>

            {/* Master Page Content */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeRoute = FLIGHTS_DATA.find(r => r.id === parameterId) || FLIGHTS_DATA[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/flights")}>Flights</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeRoute.id}</span>
                      </nav>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          Flights from {activeRoute.from} to {activeRoute.to}
                        </h2>
                        <span className="bg-[#F6B73C]/20 text-[#102A43] text-xs px-3 py-1 rounded-full font-bold font-mono">
                          {activeRoute.priceRangeBdt.split(" (")[0]}
                        </span>
                      </div>
                    </div>

                    {/* 🤖 AEO: QUICK ANSWER (50-80 Words, Google AI Overview Optimized) */}
                    <div id="aeo-quick-answer-card" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-700 text-sm italic font-serif leading-relaxed">
                        {activeRoute.quickAnswer}
                      </p>
                    </div>

                    {/* 📊 AEO: KEY FACTS TABLE */}
                    <div className="space-y-3">
                      <h3 className="font-serif font-black text-lg text-slate-900">Flight Facts at a Glance</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {activeRoute.keyFacts.map((fact) => (
                          <div key={fact.label} className="bg-white border border-slate-250 p-4 rounded-xl text-center shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>
                            <span className="text-xs font-semibold text-[#102A43] font-mono block mt-1">{fact.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rich description contents */}
                    <div className="prose prose-slate prose-sm max-w-none text-xs text-slate-700 space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900">Airlines Flying This Route</h3>
                      <p>
                        Bangladeshi outbound travellers can leverage several daily flight profiles from Hazrat Shahjalal International Airport (DAC). Direct options are highly recommended to save travel fatigue:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeRoute.airlines.map((airline) => (
                          <li key={airline} className="font-medium text-slate-805">{airline}</li>
                        ))}
                      </ul>
                      
                      <h4 className="font-serif font-black text-base text-slate-900 mt-4">When to Book for the Best Price</h4>
                      <p>
                        We advise booking flights approximately <strong>{activeRoute.bestTimeToBook}</strong>. In doing so, economy flyers can generally avoid peak dynamic pricing models. Ensure that you synchronize your flight bookings with visa durations, which are pre-configured at {activeRoute.visaRequirement}.
                      </p>
                    </div>

                     {/* Embedded Conversion search form widget */}
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-250/60 my-6">
                      <span className="text-[10px] font-mono font-bold text-[#102A43] block mb-2">Search Flights on This Route</span>
                      <TravelpayoutsEmbed />
                    </div>

                    {/* internal linking system ranking loops (Flights to Visa and Hotels!) */}
                    <div id="hotel-visa-loop-links" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">Also Useful for This Trip</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-flight-${activeRoute.id}`}
                          onClick={() => {
                            // Resolve relative visa guide
                            const matchingVisa = activeRoute.country.toLowerCase() === "nepal" ? "nepal-visa" : activeRoute.country.toLowerCase() === "thailand" ? "thailand-visa" : "malaysia-visa";
                            navigateTo(`/visa?country=${matchingVisa}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 Check {activeRoute.country} Visa Checklist <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-hotel-from-flight-${activeRoute.id}`}
                          onClick={() => {
                            // Resolve relative hotel guide
                            const matchingHotel = activeRoute.country.toLowerCase() === "nepal" ? "kathmandu-hotels" : activeRoute.country.toLowerCase() === "thailand" ? "bangkok-hotels" : "kuala-lumpur-hotels";
                            navigateTo(`/hotels?city=${matchingHotel}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 Where to Stay in {activeRoute.country} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                      </div>
                    </div>

                    {/* FAQ section */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-200 pb-2">Frequently Asked Questions</h3>
                      <div className="space-y-4 text-xs">
                        {activeRoute.faqs.map((faq, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-1">
                            <span className="font-bold text-[#102A43] font-mono block">Question: {faq.question}</span>
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SEO schema display */}
                    <AeoInspector
                      pageTitle={`Flights to ${activeRoute.country}`}
                      quickAnswer={activeRoute.quickAnswer}
                      keyFacts={activeRoute.keyFacts}
                      faqs={activeRoute.faqs}
                      schemaMarkup={activeRoute.schemaMarkup}
                      metaDescription={`Find cheap flight times, direct airlines, average costs, and custom luggage policies for Dhaka flights to ${activeRoute.to}.`}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🏨 VIEW 3: HOTELS SECTION
        ------------------------------------------------------------- */}
        {section === "hotels" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">CITY HOUSING DIRECTORY:</span>
              <div className="space-y-2">
                {HOTELS_DATA.map((col) => (
                  <button
                    key={col.id}
                    id={`btn-hotel-select-${col.id}`}
                    onClick={() => navigateTo(`/hotels?city=${col.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === col.id
                        ? "bg-[#102A43] text-white border-[#102A43] shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>🏨 {col.city} Hotels Guide</span>
                    <ArrowRight size={12} className={parameterId === col.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel content template */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeHotel = HOTELS_DATA.find(h => h.id === parameterId) || HOTELS_DATA[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/hotels")}>Hotels</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeHotel.id}</span>
                      </nav>

                      <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Where to Stay in {activeHotel.city}: Best Areas & Hotels
                      </h2>
                    </div>

                    {/* AEO Answer */}
                    <div id="hotel-aeo-quick-answer" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-700 text-sm italic font-serif leading-relaxed">
                        {activeHotel.quickAnswer}
                      </p>
                    </div>

                    {/* Neighborhoods breakdown */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Best Neighborhoods Area breakdown</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeHotel.neighborhoods.map((zone) => (
                          <div key={zone.name} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow">
                            <span className="font-serif text-base font-bold text-[#102A43] block">{zone.name}</span>
                            <span className="text-[10px] bg-slate-100 font-mono text-[#102A43] font-bold rounded-full px-2 py-0.5 inline-block my-1">{zone.vibe}</span>
                            <p className="text-xs text-slate-600 leading-relaxed mt-2">{zone.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curated Housing Grid list */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900">Curated Local Stays Selection</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeHotel.hotels.map((room) => (
                          <div key={room.name} className="border border-slate-205 p-5 bg-white rounded-xl shadow-sm flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase border ${
                                  room.category === "Luxury" ? "bg-amber-100 border-amber-300 text-amber-800" :
                                  room.category === "Budget" ? "bg-emerald-100 border-emerald-300 text-emerald-800" :
                                  "bg-indigo-100 border-indigo-300 text-indigo-805"
                                }`}>
                                  {room.category}
                                </span>
                                <span className="text-xs font-mono font-bold text-amber-500">{room.stars} ★</span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm">{room.name}</h4>
                              <p className="text-[11px] text-slate-450 mt-1 font-semibold italic">📍 {room.neighborhood}</p>
                              
                              <div className="flex flex-wrap gap-1 mt-3">
                                {room.features.slice(0, 3).map((f) => (
                                  <span key={f} className="text-[9px] font-mono bg-slate-100 text-[#102A43] px-2 py-0.5 rounded border border-slate-200">{f}</span>
                                ))}
                              </div>
                            </div>

                            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                              <div>
                                <span className="text-xs font-mono text-slate-400 block">Night Rate</span>
                                <span className="text-sm font-bold text-slate-800">৳ {room.priceBdt.toLocaleString()} BDT</span>
                              </div>
                              
                              <button
                                id={`hotel-booking-btn-${room.name.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => {
                                  triggerAffiliateToast(`Finding the best available rate at ${room.name}, ${room.neighborhood}. Opening booking page...`);
                                }}
                                className="bg-[#102A43] text-white hover:bg-[#1a4166] text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                Book Stay <ExternalLink size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flight & Visa Loop linkups */}
                    <div id="hotel-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">⚡ FLIGHT ROUTING & ENTRY DETAILS:</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            const matchingVisa = activeHotel.country.toLowerCase() === "nepal" ? "nepal-visa" : activeHotel.country.toLowerCase() === "thailand" ? "thailand-visa" : "malaysia-visa";
                            navigateTo(`/visa?country=${matchingVisa}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 Check {activeHotel.country} Visa Checklist <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            const matchingRoute = activeHotel.country.toLowerCase() === "nepal" ? "dhaka-kathmandu" : activeHotel.country.toLowerCase() === "thailand" ? "dhaka-bangkok" : "dhaka-kuala-lumpur";
                            navigateTo(`/flights?route=${matchingRoute}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          ✈️ Recommended Dhaka Flights <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                      </div>
                    </div>

                    {/* Widget */}
                    <TravelpayoutsWidget 
                      initialTab="hotels"
                      initialHotelCity={activeHotel.city}
                      initialTo={activeHotel.city === "Kathmandu" ? "Kathmandu (KTM)" : activeHotel.city === "Bangkok" ? "Bangkok (BKK)" : activeHotel.city === "Dubai" ? "Dubai (DXB)" : "Kuala Lumpur (KUL)"}
                    />

                    {/* FAQ */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-200 pb-2">Frequently Asked Questions</h3>
                      <div className="space-y-4 text-xs">
                        {activeHotel.faqs.map((faq, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-1">
                            <span className="font-bold text-[#102A43] font-mono block">Question: {faq.question}</span>
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <AeoInspector
                      pageTitle={`Where to stay in ${activeHotel.city}`}
                      quickAnswer={activeHotel.quickAnswer}
                      keyFacts={activeHotel.keyFacts}
                      faqs={activeHotel.faqs}
                      schemaMarkup={activeHotel.schemaMarkup}
                      metaDescription={`Compare highly rated neighborhoods, luxury suites, and cheap guest rooms in ${activeHotel.city} compiled for outbound tourists.`}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🛂 VIEW 4: VISA SECTION
        ------------------------------------------------------------- */}
        {section === "visa" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">VISA GUIDES BY COUNTRY</span>
              <div className="space-y-2">
                {VISA_DATA.map((v) => (
                  <button
                    key={v.id}
                    id={`btn-visa-select-${v.id}`}
                    onClick={() => navigateTo(`/visa?country=${v.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === v.id
                        ? "bg-[#102A43] text-white border-[#102A43] shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50 relative"
                    }`}
                  >
                    <span>🛂 {v.country} Visa Requirements</span>
                    <ArrowRight size={12} className={parameterId === v.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeVisa = VISA_DATA.find(v => v.id === parameterId) || VISA_DATA[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/visa")}>Visa</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeVisa.id}</span>
                      </nav>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          {activeVisa.country} Visa Requirements for Bangladeshi Citizens
                        </h2>
                        <span className="bg-[#102A43] text-white text-xs px-3 py-1 rounded-full font-bold font-mono">
                          {activeVisa.requirementType}
                        </span>
                      </div>
                    </div>

                    {/* AEO Quote */}
                    <div id="visa-aeo-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-700 text-sm italic font-serif leading-relaxed">
                        {activeVisa.quickAnswer}
                      </p>
                    </div>

                    {/* Core facts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {activeVisa.keyFacts.map((fact) => (
                        <div key={fact.label} className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>
                          <span className="text-xs font-semibold text-[#102A43] font-mono block mt-1">{fact.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Step-by-step procedures */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Step-by-Step Application Process</h3>
                      <div className="space-y-3">
                        {activeVisa.stepByStep.map((step, idx) => (
                          <div key={idx} className="flex gap-4 text-xs leading-relaxed text-slate-650 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <span className="w-6 h-6 rounded-full bg-[#102A43] text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Document structures */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900">Document Checklist</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeVisa.documentChecklist.map((cat) => (
                          <div key={cat.category} className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#102A43] block border-b border-slate-200 pb-2 mb-3">📋 {cat.category}</span>
                            <ul className="space-y-2 text-xs text-slate-650">
                              {cat.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flight & Hotel loop structure */}
                    <div id="visa-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">Plan Your Full Trip</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-hotel-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            const matchingHotel = activeVisa.country.toLowerCase() === "nepal" ? "kathmandu-hotels" : activeVisa.country.toLowerCase() === "thailand" ? "bangkok-hotels" : activeVisa.country.toLowerCase() === "uae" ? "dubai-hotels" : "kuala-lumpur-hotels";
                            navigateTo(`/hotels?city=${matchingHotel}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 Curated {activeVisa.country} Hotels <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            const matchingRoute = activeVisa.country.toLowerCase() === "nepal" ? "dhaka-kathmandu" : activeVisa.country.toLowerCase() === "thailand" ? "dhaka-bangkok" : activeVisa.country.toLowerCase() === "uae" ? "dhaka-dubai" : "dhaka-kuala-lumpur";
                            navigateTo(`/flights?route=${matchingRoute}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          ✈️ Book Flights from Dhaka <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                      </div>
                    </div>

                    {/* FAQ */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-200 pb-2">Frequently Asked Questions</h3>
                      <div className="space-y-4 text-xs">
                        {activeVisa.faqs.map((faq, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-1">
                            <span className="font-bold text-[#102A43] font-mono block">Question: {faq.question}</span>
                            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <AeoInspector
                      pageTitle={`${activeVisa.country} Outbound Visa Process`}
                      quickAnswer={activeVisa.quickAnswer}
                      keyFacts={activeVisa.keyFacts}
                      faqs={activeVisa.faqs}
                      schemaMarkup={activeVisa.schemaMarkup}
                      metaDescription={`Complete embassy checklists, processing schedules, and financial bank balances required to obtain tourist permits for ${activeVisa.country} from Dhaka.`}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🌍 VIEW 5: DESTINATIONS ROADMAP SECTION
        ------------------------------------------------------------- */}
        {section === "destinations" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4 font-mono">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-sans">OUTBOUND ROUTE SUITES:</span>
              <div className="space-y-2 text-xs">
                {DESTINATIONS_DATA.map((des) => (
                  <button
                    key={des.id}
                    id={`btn-dest-select-${des.id}`}
                    onClick={() => navigateTo(`/destinations?country=${des.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === des.id
                        ? "bg-[#102A43] text-white border-[#102A43] shadow-md font-sans"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50 font-sans"
                    }`}
                  >
                    <span>🌍 {des.country} Travel Guide</span>
                    <ArrowRight size={12} className={parameterId === des.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Details content */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];
                return activeDes.id === "dubai-guide" ? (
                  <div className="space-y-10 animate-fade-in text-slate-800">
                    {/* BREADCRUMB HEADER */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/destinations")}>Destinations</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">dubai-guide</span>
                      </nav>

                          {/* 🟦 1. HERO SECTION (TOP OF PAGE) */}
                          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            Dubai Travel Guide
                          </h2>
                          <p className="text-sm sm:text-base text-slate-500 mt-2 font-light">
                            Find flights, hotels, and plan your Dubai trip instantly
                          </p>
                        </div>

                        {/* 👉 INSERT FLIGHT SEARCH WIDGET (Travelpayouts) */}
                        {/* Widget placement rule: Must be first interactive element on page, Above all content */}
                        <div id="dubai-flight-conversion-widget" className="bg-[#102A43] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 animate-pulse-subtle">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full inline-block">
                              ✈️ FLIGHTS TO DUBAI (DXB) — PRIMARY CONVERSION ZONE
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Search Cheapest Flights leaving Dhaka (DAC) to Dubai (DXB)</h3>
                            <p className="text-xs text-slate-300 leading-relaxed font-light">
                              Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000.
                            </p>
                          </div>
                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-3 px-1">✈️ LIVE FLIGHTS SEARCH</span>
                            <TravelpayoutsEmbed />
                          </div>
                        </div>

                        {/* 🟨 2. DUBAI QUICK SNAPSHOT */}
                        <div id="dubai-quick-snapshot" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                          <div className="border-l-4 border-[#102A43] pl-3">
                            <h4 className="font-serif font-black text-sm text-[#102A43] uppercase tracking-wider">Dubai Quick Snapshot</h4>
                            <p className="text-[11px] text-slate-500 font-mono font-light">Instant travel context before you search accommodation options below.</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🌞 Best time to visit</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">November – March</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🏙️ Known for</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">luxury lifestyle, skyscrapers, beaches, shopping</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🎒 Travel style</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">budget to luxury options available</span>
                            </div>
                          </div>
                        </div>

                        {/* 🏨 3. ACCOMMODATION SECTION */}
                        <div id="dubai-accommodation" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest block">
                              🏨 SECTION 2: ACCOMMODATION PORTAL
                            </span>
                            <h3 className="font-serif text-lg font-bold text-slate-900">Find Hotels in Dubai</h3>
                            <p className="text-xs text-slate-500">
                              Compare properties, locate perfect layovers, and secure custom partner rates instantly.
                            </p>
                          </div>
                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">🏨 LIVE HOTEL COMPARISON ENGINE</span>
                            <TravelpayoutsWidget 
                              initialTab="hotels"
                              initialTo="Dubai (DXB)"
                              initialHotelCity="Dubai"
                            />
                          </div>
                        </div>

                        {/* 📍 4. BEST AREAS TO STAY */}
                        <div id="dubai-best-areas" className="space-y-4 font-sans text-slate-800">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Best Areas to Stay</h3>
                            <p className="text-xs text-slate-500">Curated neighborhoods targeting different traveler types & budget tiers.</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { area: "Downtown Dubai", details: "luxury stays, Burj Khalifa view", hint: "Perfect for shopping and premium fountain views.", estimate: "৳12,000 / night" },
                              { area: "Dubai Marina", details: "nightlife, beach access, modern lifestyle", hint: "Unlocks spectacular marina harbor walks & yachts.", estimate: "৳18,000 / night" },
                              { area: "Deira", details: "budget-friendly, cultural experience", hint: "Offers traditional gold/spice souks and affordable diners.", estimate: "৳8,500 / night" }
                            ].map((item, index) => (
                              <div key={index} className="bg-white border border-slate-200 hover:border-[#F6B73C] p-5 rounded-2xl shadow-sm flex flex-col justify-between transition-all transform hover:-translate-y-1">
                                <div className="space-y-2">
                                  <span className="text-[9px] font-mono font-bold uppercase bg-slate-100 text-[#102A43] px-2 py-0.5 rounded-full inline-block">
                                    📍 AREA RECOMMENDATION
                                  </span>
                                  <h4 className="font-serif font-bold text-sm text-slate-900">{item.area}</h4>
                                  <p className="text-xs text-slate-705"><strong>Pros:</strong> {item.details}</p>
                                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">{item.hint}</p>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                                  <div>
                                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Typical Baseline</span>
                                    <span className="text-xs font-mono font-bold text-[#F6B73C]">{item.estimate}</span>
                                  </div>
                                  <button 
                                    onClick={() => triggerAffiliateToast(`Finding the best available rates for hotels in ${item.area}. Opening booking page...`)}
                                    className="bg-[#102A43] hover:bg-[#F6B73C] hover:text-[#102A43] text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    Check Hotels <ExternalLink size={10} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 💡 5. TRAVEL INSIGHTS SECTION */}
                        <div id="dubai-insights" className="bg-[#102A43]/5 border-l-4 border-[#F6B73C] p-6 rounded-r-2xl space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-wider block font-sans">💡 Booking Tips</span>
                            <h4 className="font-serif text-base font-bold text-[#102A43]">Essential Dubai Booking Tips & Cost Hacks</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="text-amber-500 font-bold block">✈️ airfare timing</span>
                              <p className="text-slate-650 leading-relaxed font-light">Mid-week flights are often cheaper</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="text-amber-500 font-bold block">🏨 hotel demand peak</span>
                              <p className="text-slate-650 leading-relaxed font-light">Hotel prices increase during peak season (Dec–Jan)</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="text-amber-500 font-bold block">🔒 secure availability</span>
                              <p className="text-slate-650 leading-relaxed font-light">Early booking improves price and availability</p>
                            </div>
                          </div>
                        </div>

                        {/* 🔗 6. AFFILIATE LINKS SECTION */}
                        <div id="dubai-affiliate-links-panel" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block font-sans">Helpful Links</span>
                            <h4 className="font-serif font-bold text-slate-855 text-sm">Dubai Premium Partner Portals</h4>
                            <p className="text-[11px] text-slate-500 leading-relaxed">Direct conversion fallback if search engines are not loaded.</p>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            {[
                              { label: "Cheap flights to Dubai", path: "/flights" },
                              { label: "Best hotels in Dubai", path: "/hotels" },
                              { label: "Dubai travel deals", click: () => triggerAffiliateToast("Opening partner page for Dubai travel deals...") },
                              { label: "Dubai vacation packages", click: () => triggerAffiliateToast("Opening partner page for Dubai vacation packages...") }
                            ].map((lnk, idx) => (
                              lnk.path ? (
                                <button
                                  key={idx}
                                  onClick={() => navigateTo(lnk.path)}
                                  className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between"
                                >
                                  <span>{lnk.label}</span>
                                  <ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                                </button>
                              ) : (
                                <button
                                  key={idx}
                                  onClick={lnk.click}
                                  className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between"
                                >
                                  <span>{lnk.label}</span>
                                  <ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                                </button>
                              )
                            ))}
                          </div>
                        </div>

                        {/* 🧭 7. THINGS TO DO IN DUBAI */}
                        <div id="dubai-things-to-do" className="space-y-4">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Things to Do in Dubai</h3>
                            <p className="text-xs text-slate-500">Unmissable attractions with deep-linked partner rates.</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
                            {[
                              { title: "Burj Khalifa visit", sub: "Ride the world's fastest elevator to level 124/125." },
                              { title: "Desert safari experience", sub: "Sunset dune bashing, camel riding, and Bedouin BBQ dining." },
                              { title: "Dubai Mall shopping", sub: "Explore unlimited retail lanes, internal aquarium, and cinema nodes." },
                              { title: "Marina cruise", sub: "Glide alongside multi-million yacht slips under starry nights." }
                            ].map((thing, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between space-y-2 hover:border-[#F6B73C] transition-all">
                                <div className="space-y-1">
                                  <span className="font-mono text-[#F6B73C] text-[10px] block font-bold font-sans">#0{idx+1}</span>
                                  <p className="font-serif font-extrabold text-slate-900 text-xs">{thing.title}</p>
                                  <p className="text-[11px] text-slate-500 font-light">{thing.sub}</p>
                                </div>
                                <button
                                  onClick={() => triggerAffiliateToast(`Checking availability for: ${thing.title}. Opening booking page...`)}
                                  className="mt-2 text-[10px] text-[#102A43] hover:text-[#F6B73C] hover:underline flex items-center gap-1 font-mono cursor-pointer font-bold"
                                >
                                  Secure Pass <ExternalLink size={8} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 🚀 8. FINAL CALL TO ACTION */}
                        <div id="dubai-final-cta" className="bg-[#102A43] text-white p-8 rounded-2xl text-center space-y-4">
                          <div className="space-y-1 max-w-xl mx-auto">
                            <h4 className="font-serif font-black text-lg sm:text-2xl text-[#F6B73C]">Plan your Dubai trip now</h4>
                            <p className="text-xs sm:text-sm text-slate-300 font-light font-sans leading-relaxed">
                              Search flights, compare hotels, and book your journey
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-xs font-semibold">
                            <button 
                              onClick={() => navigateTo("/flights")} 
                              className="w-full sm:w-auto bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Search Outbound Flights
                            </button>
                            <button 
                              onClick={() => navigateTo("/hotels")} 
                              className="w-full sm:w-auto bg-transparent border border-white/40 hover:border-white text-white px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Compare Luxury Accommodations
                            </button>
                          </div>
                        </div>

                        {/* ⚙️ 9. INTERNAL LINKING (FOR SEO SCALING) */}
                        <div id="dubai-internal-linking" className="border-t border-slate-200 pt-6 space-y-3">
                          <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-widest text-center font-sans">Explore More</span>
                          <div className="flex flex-wrap justify-center items-center gap-2.5 text-xs">
                            <button
                              onClick={() => navigateTo("/flights")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all"
                            >
                              ✈️ Cheap flights page (Dubai route)
                            </button>
                            <button
                              onClick={() => navigateTo("/hotels")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all"
                            >
                              🏨 Hotel comparison page (Dubai)
                            </button>
                            <button
                              onClick={() => navigateTo("/")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all"
                            >
                              📰 Future travel blog articles
                            </button>
                          </div>
                        </div>

                        <AeoInspector
                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}
                          quickAnswer={activeDes.quickAnswer}
                          keyFacts={activeDes.keyFacts}
                          faqs={activeDes.faqs}
                          schemaMarkup={activeDes.schemaMarkup}
                          metaDescription={`Plan your outbound trip with our day-by-day itinerary guides, transport maps, and food recommendations in ${activeDes.country}.`}
                        />
                      </div>
                    ) : (
                      <div className="space-y-10 animate-fade-in text-slate-800">
                        
                        {/* BREADCRUMB HEADER */}
                        <div className="border-b border-slate-200 pb-5">
                          <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                            <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                            <span>/</span>
                            <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/destinations")}>Destinations</span>
                            <span>/</span>
                            <span className="text-[#102A43] font-bold">{activeDes.id}</span>
                          </nav>

                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#F6B73C] bg-[#102A43] px-2.5 py-0.5 rounded-full inline-block uppercase mb-2 animate-pulse">
                            🌍 Destination Guide
                          </span>
                          <h2 className="font-serif text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                            {activeDes.title}
                          </h2>
                        </div>

                        {/* 2. TOP SECTION (PRIMARY CONVERSION ZONE) - FLIGHTS WIDGET FIRST */}
                        <div id="dest-primary-conversion" className="bg-[#102A43] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full inline-block font-sans">
                              ✈️ Book Your Flight
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold">Flights Leaving Dhaka (DAC) to {activeDes.country === "Nepal" ? "Kathmandu (KTM)" : activeDes.country === "Thailand" ? "Bangkok (BKK)" : activeDes.country === "UAE" ? "Dubai (DXB)" : "Kuala Lumpur (KUL)"}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-light font-sans">
                              {activeDes.id === "nepal-guide" ? "Direct flights from Dhaka to Kathmandu take just 1 hour 30 minutes on Biman Bangladesh or Himalaya Airlines. Roundtrip fares typically run BDT 28,000–40,000. Compare prices for your dates below." :
                              activeDes.id === "thailand-guide" ? "Dhaka to Bangkok takes about 2.5 hours direct. Thai Airways, Biman, US-Bangla, and Thai Lion Air fly this route. Roundtrip fares usually start around BDT 31,500." :
                              activeDes.id === "malaysia-guide" ? "Dhaka to Kuala Lumpur takes about 3 hours 50 minutes. Malaysia Airlines, AirAsia, Biman, and Batik Air all fly direct. Expect BDT 36,000–48,000 roundtrip." :
                              activeDes.id === "dubai-guide" ? "Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000." : "Lock down lowest flight options direct from Dhaka."}
                            </p>
                          </div>

                          {/* Travelpayouts Flights widget */}
                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">✈️ LIVE FLIGHTS COMPARISON ENGINE</span>
                            <TravelpayoutsEmbed />
                          </div>
                        </div>

                        {/* 3. DESTINATION SNAPSHOT SECTION (FAST CONTEXT) */}
                        <div id="dest-snapshot-bento" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                          <div className="border-l-4 border-[#102A43] pl-3">
                            <h4 className="font-serif font-black text-sm text-[#102A43] uppercase tracking-wider">Quick Facts</h4>
                            <p className="text-[11px] text-slate-500 font-mono">Quick decision support parameters before searching accommodation.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🌞 Best Time To Visit</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">{activeDes.bestTimeToVisit}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">💰 Average Cost Index</span>
                              <span className="font-mono font-bold text-[#F6B73C] text-xs block">
                                {activeDes.id === "nepal-guide" ? "Highly Budget-Friendly (approx BDT 3,500/day local expense)" :
                                activeDes.id === "thailand-guide" ? "Affordable Mid-Range (approx BDT 6,000/day local expense)" :
                                activeDes.id === "malaysia-guide" ? "Family-Friendly Budget (approx BDT 7,500/day local expense)" :
                                activeDes.id === "dubai-guide" ? "Premium Business Luxury (approx BDT 14,000/day local expense)" : "Sufficient BDT 5,000/day"}
                              </span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🎒 Optimal Travel Style</span>
                              <span className="text-slate-650 leading-snug block font-sans">
                                {activeDes.id === "nepal-guide" ? "High-altitude trekking, organic dining, and historical pagoda walks." :
                                activeDes.id === "thailand-guide" ? "Multi-mall shopping, marine activities, and street food market tasting." :
                                activeDes.id === "malaysia-guide" ? "Urban adventure, Genting theme parks, and tropical reserve strolls." :
                                activeDes.id === "dubai-guide" ? "Desert dune riding, observation deck sightseeing, and beach luxury resorts." : "Casual exploration"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 4. HOTEL SEARCH SECTION (SECONDARY CONVERSION ZONE) */}
                        <div id="dest-secondary-conversion" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest block font-sans">
                              🏨 Find a Hotel
                            </span>
                            <h3 className="font-serif text-lg font-bold text-slate-900">Compare Accommodations in {activeDes.country === "Nepal" ? "Kathmandu" : activeDes.country === "Thailand" ? "Bangkok" : activeDes.country === "UAE" ? "Dubai" : "Kuala Lumpur"}</h3>
                            <p className="text-xs text-slate-500">
                              Now that your travel days are mapped, click to lock Halal-certified suites or cheap family units near critical transit points.
                            </p>
                          </div>

                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">🏨 LIVE ACCOMMODATION COMPARISON ENGINE</span>
                            <TravelpayoutsWidget 
                              initialTab="hotels"
                              initialTo={activeDes.country === "Nepal" ? "Kathmandu (KTM)" : activeDes.country === "Thailand" ? "Bangkok (BKK)" : activeDes.country === "UAE" ? "Dubai (DXB)" : "Kuala Lumpur (KUL)"}
                              initialHotelCity={activeDes.country === "Nepal" ? "Kathmandu" : activeDes.country === "Thailand" ? "Bangkok" : activeDes.country === "UAE" ? "Dubai" : "Kuala Lumpur"}
                            />
                          </div>
                        </div>

                        {/* 5. “TOP PLACES TO STAY” SECTION (SEO + AFFILIATE SUPPORT) */}
                        <div id="dest-curated-stays" className="space-y-4">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Curated Stays & Recommended Neighborhoods</h3>
                            <p className="text-xs text-slate-500">Hotels near the main attractions, picked for travelers from Bangladesh.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(activeDes.id === "nepal-guide" ? [
                              { area: "Downtown Backpacker Zone (Thamel)", name: "Thamel Eco Resort & Spa", rate: "৳3,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Free airport luggage pick-up and organic organic buffet included." },
                              { area: "Airport Transit Hub (Sinamangal)", name: "The Suite Airport Guest House KTM", rate: "৳4,200 / night", star: "⭐ ⭐ ⭐", linkTip: "Walking distance to Tribhuvan airport gates; perfect for night arrivals." },
                              { area: "Heritage Tourist Sector (Patan / Durbar)", name: "Durbar Square Boutique Heritage Lodge", rate: "৳5,800 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Stunning brick-lined traditional Newari apartments with city terrace view." }
                            ] : activeDes.id === "thailand-guide" ? [
                              { area: "Downtown Shopping Sector (Pratunam Market)", name: "Centara Watergate Pavillion Hotel Bangkok", rate: "৳9,800 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Direct access to market lanes and legendary Sukhumvit halal hub food lines." },
                              { area: "Airport Connection (Suvarnabhumi Link)", name: "Mariya Boutique Residence BKK Node", rate: "৳5,200 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Complimentary sky train shuttle and early check-in options for Bangladeshis." },
                              { area: "Vibrant Night Market District (Sukhumvit Road)", name: "Siam Star Premium Hotel Area", rate: "৳4,800 / night", star: "⭐ ⭐ ⭐", linkTip: "Very close to BTS Skytrain lines, making central transport entirely gridlock-free." }
                            ] : activeDes.id === "malaysia-guide" ? [
                              { area: "Downtown Action Core (Bukit Bintang Mallway)", name: "Gold 3 Boutique Family Hotel KL", rate: "৳4,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Surrounded by local food courts, digital item hubs, and direct Monorail stations." },
                              { area: "Airport Transit Zone (KLIA Sepang Node)", name: "Tune Airport Hotel KLIA2 Terminal", rate: "৳6,200 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Covered walkway directly to boarding check-in counters. Outstanding choice for child layovers." },
                              { area: "Prestige Park Sector (KLCC Petronas Vista)", name: "Impiana KLCC Premium Resort Complex", rate: "৳9,500 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Skybridge walking path connects straight to Twin Towers and central park fountains." }
                            ] : [
                              { area: "Downtown Luxury Skyscrapers (Burj Vista Center)", name: "Rove Downtown Dubai Premium Suites", rate: "৳12,000 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Stellar views of Burj Khalifa and direct shuttle rides to the Dubai Mall gates." },
                              { area: "Airport Sector & Budget Markets (Deira Creek)", name: "Ibis Styles Dubai Airport Transit Inn", rate: "৳8,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Right beside metro lines; close to traditional gold souks and BDT-friendly diners." },
                              { area: "Beach Side Promenade (Dubai Marina / JBR)", name: "Marina View Deluxe Hotel Apartment", rate: "৳18,000 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "High-altitude skyline balconies, private kitchen amenities, and direct yacht harbor lookouts." }
                            ]).map((hotel, index) => (
                              <div key={index} className="bg-white border border-slate-200 hover:border-[#F6B73C] p-5 rounded-2xl shadow-sm flex flex-col justify-between transition-all transform hover:-translate-y-1">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-mono font-bold uppercase bg-slate-100 text-[#102A43] px-2 py-0.5 rounded-full">
                                      {hotel.area}
                                    </span>
                                    <span className="text-amber-500 text-xs font-bold leading-none">{hotel.star}</span>
                                  </div>
                                  <h4 className="font-serif font-bold text-sm text-slate-900">{hotel.name}</h4>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">{hotel.linkTip}</p>
                                </div>

                                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                                  <div>
                                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Estimate rates</span>
                                    <span className="text-xs font-mono font-bold text-[#F6B73C]">{hotel.rate}</span>
                                  </div>
                                  <button 
                                    onClick={() => triggerAffiliateToast(`Finding the best available rate at ${hotel.name}, ${hotel.area}. Opening booking page...`)}
                                    className="bg-[#102A43] hover:bg-[#F6B73C] hover:text-[#102A43] text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    Check Rates <ExternalLink size={10} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 6. FLIGHT PRICE / DEAL INSIGHT SECTION */}
                        <div id="dest-flight-insights" className="bg-[#102A43]/5 border-l-4 border-[#F6B73C] p-6 rounded-r-2xl space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-wider block font-sans">Flight Prices & Timing</span>
                            <h4 className="font-serif text-base font-bold text-[#102A43]">Typical Flight Prices (Dhaka to {activeDes.country === "Nepal" ? "Kathmandu (KTM)" : activeDes.country === "Thailand" ? "Bangkok (BKK)" : activeDes.country === "UAE" ? "Dubai (DXB)" : "Kuala Lumpur (KUL)"})</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-700">📅 Best Months to Book Lower Fares:</span>
                              <p className="text-slate-650 leading-relaxed font-sans">
                                {activeDes.id === "nepal-guide" ? "September & May represent low tourism price cycles." :
                                activeDes.id === "thailand-guide" ? "June & September mark monsoon sales with high airline availability." :
                                activeDes.id === "malaysia-guide" ? "March & October see significant carrier promo codes online." :
                                "July & August are extremely hot but yield major airfare drops."}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-700">💰 Return Airfare typical baseline:</span>
                              <span className="text-[#F6B73C] font-mono font-extrabold text-xs block">
                                {activeDes.id === "nepal-guide" ? "৳17,500 – ৳22,500 Return" :
                                activeDes.id === "thailand-guide" ? "৳26,000 – ৳32,000 Return" :
                                activeDes.id === "malaysia-guide" ? "৳30,000 – ৳36,500 Return" :
                                "৳55,000 – ৳64,000 Return"}
                              </span>
                            </div>
                          </div>

                          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl text-[11px] text-slate-650 flex items-start gap-2.5">
                            <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
                            <span className="font-sans"><b>Alert:</b> {
                              activeDes.id === "nepal-guide" ? "Flights during festivals peak heavily. Book at least 3 weeks in advance!" :
                              activeDes.id === "thailand-guide" ? "Weekend departure prices surge by 20%. Select Tuesday or Wednesday flights." :
                              activeDes.id === "malaysia-guide" ? "Direct Biman or AirAsia paths get booked up. Lock flight slots early for families." :
                              "Transit-based routes via Muscat are up to BDT 15,000 cheaper than direct options!"
                            }</span>
                          </div>
                        </div>

                        {/* 7. THINGS TO DO SECTION (CONTENT + RETENTION LAYER) */}
                        <div id="dest-things-to-do" className="space-y-4">
                          <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Suggested Itinerary</h3>
                          <div className="space-y-6">
                            {activeDes.itinerary.map((dayPlan) => (
                              <div key={dayPlan.day} className="relative pl-8 border-l-2 border-slate-200 ml-4 space-y-2 font-sans">
                                {/* Visual Timeline Bulb */}
                                <div className="absolute -left-3 top-1 w-5.5 h-5.5 rounded-full bg-[#102A43] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                                  D{dayPlan.day}
                                </div>
                                <h4 className="font-serif text-base font-bold text-[#102A43]">{dayPlan.title}</h4>
                                <ul className="space-y-1.5 text-xs text-slate-650">
                                  {dayPlan.activities.map((act, innerIndex) => (
                                    <li key={innerIndex} className="flex gap-2">
                                      <span className="text-slate-400 font-bold font-mono">▸</span>
                                      <span>{act}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* local city transportation hacks */}
                          <div className="space-y-3 bg-slate-50 border border-slate-200 p-5 rounded-2xl mt-4">
                            <h4 className="font-serif font-bold text-sm text-slate-900">Local Inner-City Transport hacks</h4>
                            <ul className="space-y-2 text-xs text-slate-700">
                              {activeDes.localTransport.map((trans, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded bg-slate-200 text-[#102A43] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                                  <span>{trans}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 8. TRAVEL PLANNING CTA SECTION */}
                        <div id="dest-planning-links-hub" className="bg-[#102A43]/5 border border-slate-200/60 p-6 rounded-2xl space-y-4 text-center">
                          <div className="space-y-1 max-w-xl mx-auto">
                            <h4 className="font-serif font-bold text-slate-955 text-base">Ready to Book?</h4>
                            <p className="text-xs text-slate-500">Move deeper into our integrated, certified airfare and hotel booking channels to guarantee secure pricing codes.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
                            <button 
                              onClick={() => navigateTo("/flights")} 
                              className="bg-[#102A43] text-white hover:bg-slate-800 p-3 rounded-xl transition-colors cursor-pointer"
                            >
                              Find Cheap Flights →
                            </button>
                            <button 
                              onClick={() => navigateTo("/hotels")} 
                              className="bg-[#102A43] text-white hover:bg-slate-800 p-3 rounded-xl transition-colors cursor-pointer"
                            >
                              Check Hotel Directories →
                            </button>
                            <button 
                              onClick={() => {
                                const matchingVisa = activeDes.country.toLowerCase() === "nepal" ? "nepal-visa" : activeDes.country.toLowerCase() === "thailand" ? "thailand-visa" : activeDes.country.toLowerCase() === "uae" ? "dubai-visa" : "malaysia-visa";
                                navigateTo(`/visa?country=${matchingVisa}`);
                              }} 
                              className="bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] p-3 rounded-xl transition-colors cursor-pointer"
                            >
                              View Visa Guidelines →
                            </button>
                          </div>
                        </div>

                        {/* 9. INTERNAL SEO LINKING SECTION */}
                        <div id="dest-seo-internal" className="border-t border-slate-200 pt-6 space-y-3">
                          <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-widest text-center font-sans">Other Destinations</span>
                          <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
                            {DESTINATIONS_DATA.filter(d => d.id !== activeDes.id).map((other) => (
                              <button
                                key={other.id}
                                onClick={() => navigateTo(`/destinations?country=${other.id}`)}
                                className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium"
                              >
                                🌍 {other.country} Outbound Guide
                              </button>
                            ))}
                            <button
                              onClick={() => navigateTo("/visa")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium"
                            >
                              🛂 Embassy Visa Center
                            </button>
                            <button
                              onClick={() => navigateTo("/costs")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium"
                            >
                              💰 Dual-Currency Costs Analyzer
                            </button>
                          </div>
                        </div>

                        {/* 10. FAQS */}
                        <div className="space-y-4">
                          <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-200 pb-2">Frequently Asked Questions</h3>
                          <div className="space-y-4 text-xs">
                            {activeDes.faqs.map((faq, index) => (
                              <div key={index} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-1">
                                <span className="font-bold text-[#102A43] font-mono block animate-pulse">Question: {faq.question}</span>
                                <p className="text-slate-650 leading-relaxed">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <AeoInspector
                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}
                          quickAnswer={activeDes.quickAnswer}
                          keyFacts={activeDes.keyFacts}
                          faqs={activeDes.faqs}
                          schemaMarkup={activeDes.schemaMarkup}
                          metaDescription={`Plan your outbound trip with our day-by-day itinerary guides, transport maps, and food recommendations in ${activeDes.country}.`}
                        />

                      </div>
                    )
                  ;
                })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            💰 VIEW 6: TRIP COSTS ANALYZER (CONVERSION BOOSTER)
        ------------------------------------------------------------- */}
        {section === "costs" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4 font-mono uppercase">
              <span className="text-xs font-bold text-slate-500 block font-sans">TRIP COST GUIDES</span>
              <div className="space-y-2 text-xs">
                {TRIP_COSTS_DATA.map((c) => (
                  <button
                    key={c.id}
                    id={`btn-cost-select-${c.id}`}
                    onClick={() => navigateTo(`/costs?country=${c.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === c.id
                        ? "bg-[#102A43] text-white border-[#102A43] shadow-md font-sans"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50 font-sans"
                    }`}
                  >
                    <span>💰 {c.country} Trip Cost</span>
                    <ArrowRight size={12} className={parameterId === c.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Cost View Content Template */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeCost = TRIP_COSTS_DATA.find(c => c.id === parameterId) || TRIP_COSTS_DATA[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/costs")}>Trip Costs</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeCost.id}</span>
                      </nav>

                      <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        {activeCost.country} Trip Cost from Bangladesh: Complete Price Matrix
                      </h2>
                    </div>

                    {/* AEO Quote */}
                    <div id="cost-aeo-text-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-700 text-sm italic font-serif leading-relaxed">
                        {activeCost.quickAnswer}
                      </p>
                    </div>

                    {/* Detailed matrix cost tables */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
                        <h3 className="font-serif font-black text-lg text-slate-900">Full Trip Cost Breakdown (BDT)</h3>
                        <span className="text-xs text-[#102A43] bg-emerald-50 border border-emerald-200 font-mono px-3 py-1 rounded">
                          Exchange Rate: {activeCost.exchangeRateText}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <thead>
                            <tr className="bg-[#102A43] text-white">
                              <th className="p-4 font-serif font-bold">What You'll Spend On</th>
                              <th className="p-4 font-mono font-bold">Budget</th>
                              <th className="p-4 font-mono font-bold">Mid-Range</th>
                              <th className="p-4 font-mono font-bold">Luxury</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {activeCost.categories.map((cat, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-800">{cat.name}</td>
                                <td className="p-4 font-mono text-emerald-650 font-bold">৳ {cat.lowBdt.toLocaleString()}</td>
                                <td className="p-4 font-mono text-indigo-700 font-bold">৳ {cat.midBdt.toLocaleString()}</td>
                                <td className="p-4 font-mono text-amber-700 font-bold">৳ {cat.highBdt.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Seasonal variations description */}
                    <div className="bg-slate-50 border border-slate-205 p-6 rounded-xl space-y-2">
                      <h4 className="font-serif font-black text-base text-slate-900">How Prices Change by Season</h4>
                      <p className="text-xs leading-relaxed text-slate-650">
                        {activeCost.seasonalVariation}
                      </p>
                    </div>

                    {/* Money-saving hacks */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-[#102A43]">Tips to Spend Less</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeCost.moneyHacks.map((hack, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-mono text-[#F6B73C] font-bold">Tip {idx + 1}</span>
                            <p className="text-xs text-slate-750 leading-relaxed font-serif">{hack}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Internal link graphs */}
                    <div id="cost-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">Also Plan For This Trip</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-cost-${activeCost.id}`}
                          onClick={() => {
                            const matchingVisa = activeCost.country.toLowerCase() === "nepal" ? "nepal-visa" : activeCost.country.toLowerCase() === "thailand" ? "thailand-visa" : activeCost.country.toLowerCase() === "uae" ? "dubai-visa" : "malaysia-visa";
                            navigateTo(`/visa?country=${matchingVisa}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 Passport Visa Checklist <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-dest-from-cost-${activeCost.id}`}
                          onClick={() => {
                            const matchingDest = activeCost.country.toLowerCase() === "nepal" ? "nepal-guide" : activeCost.country.toLowerCase() === "thailand" ? "thailand-guide" : activeCost.country.toLowerCase() === "uae" ? "dubai-guide" : "malaysia-guide";
                            navigateTo(`/destinations?country=${matchingDest}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🌍 View Travel Itinerary <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-hotel-from-cost-${activeCost.id}`}
                          onClick={() => {
                            const matchingHotel = activeCost.country.toLowerCase() === "nepal" ? "kathmandu-hotels" : activeCost.country.toLowerCase() === "thailand" ? "bangkok-hotels" : activeCost.country.toLowerCase() === "uae" ? "dubai-hotels" : "kuala-lumpur-hotels";
                            navigateTo(`/hotels?city=${matchingHotel}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 Curated Area Stays <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                      </div>
                    </div>

                    <InteractiveTools />

                    <AeoInspector
                      pageTitle={`${activeCost.country} Trip Cost calculations`}
                      quickAnswer={activeCost.quickAnswer}
                      keyFacts={activeCost.keyFacts}
                      faqs={activeCost.faqs}
                      schemaMarkup={activeCost.schemaMarkup}
                      metaDescription={`Complete cost charts, flights airfare estimates, hotel rent prices, and food spending budgets for ${activeCost.country} in BDT.`}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🧰 VIEW 7: TRAVEL DATA UTILITY DESK
        ------------------------------------------------------------- */}
        {section === "tools" && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900">
                Outbound Travel Tools Workspace
              </h2>
              <p className="text-xs text-slate-500 font-mono">Dynamic calculators constructed specifically for South Asian travelers.</p>
            </div>
            
            <InteractiveTools />
          </div>
        )}

        {/* -------------------------------------------------------------
            📰 VIEW 8: BLOG INTEL HUB
        ------------------------------------------------------------- */}
        {section === "blog" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar articles list */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-sans">TRAVEL ARTICLES</span>
              <div className="space-y-2">
                {BLOG_DATA.map((post) => (
                  <button
                    key={post.id}
                    id={`btn-post-select-${post.id}`}
                    onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === post.slug
                        ? "bg-[#102A43] text-white border-[#102A43] shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>📰 {post.title.split(":")[0]}</span>
                    <ArrowRight size={12} className={parameterId === post.slug ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Post Details */}
            <div className="lg:col-span-3 space-y-6 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in text-xs">
              {(() => {
                const activePost = BLOG_DATA.find(p => p.slug === parameterId) || BLOG_DATA[0];
                return (
                  <article className="space-y-6">
                    
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5 space-y-3">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/blog")}>Blog</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activePost.slug}</span>
                      </nav>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#102A43] bg-[#102A43]/5 border border-[#102A43]/10 px-2.5 py-0.5 rounded font-mono">
                          {activePost.category}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">{activePost.date}</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3.5xl font-black text-slate-900 leading-tight">
                        {activePost.title}
                      </h2>

                      <div className="text-slate-400 text-[10px] font-mono pt-1">
                        Author: <strong>{activePost.author}</strong> | reading: <strong>{activePost.readTime}</strong>
                      </div>
                    </div>

                    {/* Rich text body content */}
                    <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap space-y-4 italic text-sm font-serif p-4 bg-slate-50 rounded-lg">
                      {activePost.content}
                    </div>

                    {/* Ranking loop cross connections inside blog post footer */}
                    <div className="pt-6 border-t border-slate-100 space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono uppercase tracking-widest block font-sans">Related Articles</span>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {activePost.internalLinks.map((lnk, idx) => (
                          <button
                            key={idx}
                            id={`blog-inner-link-${idx}`}
                            onClick={() => navigateTo(lnk.path)}
                            className="bg-slate-100 hover:bg-slate-205 text-[#102A43] border border-slate-205 font-mono px-3.5 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors"
                          >
                            <Link2 size={12} className="text-[#F6B73C]" />
                            <span>{lnk.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                  </article>
                );
              })()}
            </div>

          </div>
        )}

      </main>

      {/* 🔮 MASTER FOOTER BLOCK */}
      <footer className="bg-[#102A43] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <span className="p-2 bg-white/10 rounded-lg text-white">⚡</span>
              <span className="font-serif font-bold text-base text-white">URAL Travel Intelligence</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              Flight prices, hotel guides, visa steps, and trip budgets — built for travelers from Bangladesh.
            </p>
            <p className="text-[10px] font-mono text-slate-500">
              © 2026 URAL Platforms. Optimized for Google AI Overviews and human discovery.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">Flights Destination Directory</span>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => navigateTo("/flights?route=dhaka-kathmandu")} className="hover:text-white hover:underline text-left">Dhaka → Kathmandu (KTM)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-bangkok")} className="hover:text-white hover:underline text-left">Dhaka → Bangkok (BKK)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-kuala-lumpur")} className="hover:text-white hover:underline text-left">Dhaka → Kuala Lumpur (KUL)</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">Visa Guides by Country</span>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => navigateTo("/visa?country=nepal-visa")} className="hover:text-white hover:underline text-left">Nepal Visa VOA for Bangladesh</button></li>
              <li><button onClick={() => navigateTo("/visa?country=thailand-visa")} className="hover:text-white hover:underline text-left">Thai Embassy Sticker process</button></li>
              <li><button onClick={() => navigateTo("/visa?country=malaysia-visa")} className="hover:text-white hover:underline text-left">Malaysian eVisa online checklist</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">Monetisation Disclosures</span>
            <p className="leading-relaxed">
              URAL earns a small commission when you book through links on this site. This doesn't add to your cost — it's paid by the airline or hotel. We never sell your personal data.
            </p>
          </div>

        </div>
      </footer>

      {/* Dynamic Action Affiliate Conversion Toast Overlay */}
      {affiliateToast && (
        <div id="converter-toast" className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#102A43] text-white p-4 rounded-xl shadow-2xl border border-[#F6B73C] animate-fade-in flex items-start gap-4">
          <div className="p-2 bg-[#F6B73C] text-[#102A43] rounded-lg shrink-0 text-xs">🚀</div>
          <div className="space-y-1 text-xs">
            <span className="font-mono font-bold text-[#F6B73C] block uppercase tracking-wide font-sans">Secure Partner Dispatch</span>
            <p className="leading-relaxed font-sans text-slate-300">{affiliateToast}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Redirecting via secure affiliate link...</span>
            </div>
          </div>
          <button onClick={() => setAffiliateToast(null)} className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer ml-auto">×</button>
        </div>
      )}

    </div>
  );
}
