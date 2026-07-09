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
import { TravelIntelligence } from "./components/AeoInspector";
import { TravelpayoutsOnboarding } from "./components/TravelpayoutsOnboarding";
import { TravelpayoutsWidget } from "./components/TravelpayoutsWidget";
import { TravelpayoutsEmbed } from "./components/TravelpayoutsEmbed";
import { TrustpilotReviews } from "./components/TrustpilotReviews";
import { InteractiveTools } from "./components/InteractiveTools";
import { TravelEssentials } from "./components/TravelEssentials";
import {
  KiwitaxiTransferWidget,
  AiraloEsimWidget,
  KlookActivitiesWidget,
  QeeqCarRentalWidget,
  PartnerLinkButton,
  AFFILIATE_LINKS
} from "./components/AffiliatePartners";
import { useSeoMeta, buildFaqSchema } from "./hooks/useSeoMeta";
const heroBgImage = new URL("./assets/images/clouds_boat_hero_1781438671378.jpg", import.meta.url).href;
const coxsBazarSunriseImg = new URL("./assets/images/coxs_bazar_sunrise_1781620718331.jpg", import.meta.url).href;
const nepalDestImg = new URL("./assets/images/nepal_destination_1781544132297.jpg", import.meta.url).href;
const bangkokDestImg = new URL("./assets/images/bangkok_destination_1781544149435.jpg", import.meta.url).href;
const klDestImg = new URL("./assets/images/kl_destination_1781544164707.jpg", import.meta.url).href;
const dubaiDestImg = new URL("./assets/images/dubai_destination_1781544180311.jpg", import.meta.url).href;

type SectionType = "home" | "flights" | "hotels" | "visa" | "destinations" | "costs" | "tools" | "blog" | "contact";

export default function App() {
  // Simulated Browser Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname + window.location.search;
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
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

  // Contact Us Page States
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("Visa Processing Checklist");
  const [contactDestination, setContactDestination] = useState("Nepal");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Parse path to resolve active section and optional query parameters
  const getRouteDetails = () => {
    const url = new URL(currentPath, "https://ural-travel.pages.dev");
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    let section: SectionType = "home";
    let parameterId: string | null = null;
    let isLanding = false;

    if (pathname.startsWith("/flights")) {
      section = "flights";
      const routeParam = searchParams.get("route");
      parameterId = routeParam || "dhaka-kathmandu";
      isLanding = !routeParam;
    } else if (pathname.startsWith("/hotels")) {
      section = "hotels";
      const cityParam = searchParams.get("city");
      parameterId = cityParam || "kathmandu-hotels";
      isLanding = !cityParam;
    } else if (pathname.startsWith("/visa")) {
      section = "visa";
      const countryParam = searchParams.get("country");
      parameterId = countryParam || "nepal-visa";
      isLanding = !countryParam;
    } else if (pathname.startsWith("/destinations")) {
      section = "destinations";
      const countryParam = searchParams.get("country");
      parameterId = countryParam || "nepal-guide";
      isLanding = !countryParam;
    } else if (pathname.startsWith("/costs")) {
      section = "costs";
      const countryParam = searchParams.get("country");
      parameterId = countryParam || "nepal-costs";
      isLanding = !countryParam;
    } else if (pathname.startsWith("/tools")) {
      section = "tools";
      isLanding = true;
    } else if (pathname.startsWith("/blog")) {
      section = "blog";
      const slugParam = searchParams.get("slug");
      parameterId = slugParam || "cheap-flight-booking-hacks-dhaka";
      isLanding = !slugParam;
    } else if (pathname.startsWith("/contact")) {
      section = "contact";
      isLanding = true;
    }

    const isAdmin = searchParams.has("admin") || searchParams.has("inspector") || searchParams.get("onboarding") === "true";

    return { section, parameterId, isLanding, isAdmin };
  };

  const { section, parameterId, isLanding, isAdmin } = getRouteDetails();

  // Dynamically compute metadata and schema
  let seoTitle = "URAL — Compare Flights, Hotels & Visa Guides for Bangladeshi Travelers";
  let seoDescription = "Compare flight prices from Dhaka to Nepal, Thailand, Malaysia and Dubai, check visa requirements step by step, and plan your trip budget in BDT.";
  let seoSchema: any = undefined;
  let seoBreadcrumbs: { name: string; url: string }[] = [];

  if (section === "home") {
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" }
    ];
  } else if (section === "flights") {
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

    if (isLanding) {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Flight Guides", url: "https://ural.travel/flights" }
      ];
    } else {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Flight Guides", url: "https://ural.travel/flights" },
        { name: `${activeRoute.from.split(" (")[0]} to ${activeRoute.to.split(" (")[0]} Flight`, url: `https://ural.travel/flights?route=${activeRoute.id}` }
      ];
    }

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

    if (isLanding) {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Hotel Neighborhoods", url: "https://ural.travel/hotels" }
      ];
    } else {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Hotel Neighborhoods", url: "https://ural.travel/hotels" },
        { name: `${activeHotel.city} Hotels`, url: `https://ural.travel/hotels?city=${activeHotel.id}` }
      ];
    }

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

    if (isLanding) {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Visa Guides", url: "https://ural.travel/visa" }
      ];
    } else {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Visa Guides", url: "https://ural.travel/visa" },
        { name: `${activeVisa.country} Visa`, url: `https://ural.travel/visa?country=${activeVisa.id}` }
      ];
    }

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

    if (isLanding) {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Destinations", url: "https://ural.travel/destinations" }
      ];
    } else {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Destinations", url: "https://ural.travel/destinations" },
        { name: `${activeDes.country} Guide`, url: `https://ural.travel/destinations?country=${activeDes.id}` }
      ];
    }

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

    if (isLanding) {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Trip Costs", url: "https://ural.travel/costs" }
      ];
    } else {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Trip Costs", url: "https://ural.travel/costs" },
        { name: `${activeCost.country} Costs`, url: `https://ural.travel/costs?country=${activeCost.id}` }
      ];
    }

  } else if (section === "tools") {
    seoTitle = "Bangladeshi Traveler Utility Tools | URAL";
    seoDescription = "Access handy travel utility tools for Bangladeshi outbound tourists, including live exchange rates, power plug specifications, and translation aids.";
    seoSchema = undefined;
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Travel Tools", url: "https://ural.travel/tools" }
    ];

  } else if (section === "blog") {
    const activePost = BLOG_DATA.find(p => p.slug === parameterId) || BLOG_DATA[0];
    seoTitle = `${activePost.title} | URAL Travel Blog`;
    seoDescription = activePost.summary;
    seoSchema = undefined;

    if (isLanding) {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Travel Blog", url: "https://ural.travel/blog" }
      ];
    } else {
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Travel Blog", url: "https://ural.travel/blog" },
        { name: activePost.title, url: `https://ural.travel/blog?slug=${activePost.slug}` }
      ];
    }
  } else if (section === "contact") {
    seoTitle = "Contact URAL — Direct Phone & WhatsApp Support";
    seoDescription = "Connect directly with our flight & visa support desk at +8801784385335. Send us an inquiry for flight packages, visa assistance, and personalized outbound plans.";
    seoSchema = undefined;
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Contact Us", url: "https://ural.travel/contact" }
    ];
  }

  // Call the hook at the top level
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    schema: seoSchema,
    breadcrumbs: seoBreadcrumbs
  });

  // Navigation Helper that emulates URL path routing
  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
    }
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans leading-relaxed selection:bg-[#F6B73C] selection:text-[#102A43] overflow-x-hidden">
      


      {/* 🟦 STICKY HEADER WRAPPER (Top Strip + Main Navbar) */}
      <div className="sticky top-0 z-50 w-full shadow-lg">
        
        {/* 🟦 TOP STRIP (Height: 36px, Background: #0B1628) */}
        <div className="w-full bg-[#0B1628] h-9 flex items-center select-none">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between text-white/55 text-xs">
            <span className="truncate font-sans font-medium">Flights, Hotels & Visa Guides for Bangladeshi Travelers</span>
            <div className="flex items-center gap-3 shrink-0 font-sans text-[11px] font-medium">
              <span className="flex items-center gap-1.5 cursor-default">🇧🇩 English (BDT)</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span className="cursor-default">৳ BDT</span>
            </div>
          </div>
        </div>

        {/* 🟦 1. MAIN NAVBAR (Height: 64px, Background: #0F172A) */}
        <header id="main-navbar-sticky" className="w-full bg-[#0F172A] text-white border-b border-white/8 h-16 flex items-center">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
            
            {/* Logo Left */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo("/")}>
              <div className="bg-gradient-to-br from-[#F6B73C] to-[#E2A123] text-[#0F172A] p-2 rounded-xl shrink-0 shadow-lg shadow-[#F6B73C]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                  {/* Globe circle and grid */}
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
                  {/* Flight arc / international routing arrow */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" d="M19 19C15.5 15.5 12 15 8 16" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 19l-4-1M19 19l-1-4" />
                </svg>
              </div>
              <span className="font-sans font-extrabold text-[21px] text-white tracking-wider leading-none">
                URAL
              </span>
            </div>

            {/* Navigation Centered */}
            <nav className="hidden md:flex items-center gap-7">
              {[
                { id: "home", label: "Home", path: "/" },
                { id: "flights", label: "Flights", path: "/flights" },
                { id: "hotels", label: "Hotels", path: "/hotels" },
                { id: "visa", label: "Visa", path: "/visa" },
                { id: "destinations", label: "Destinations", path: "/destinations" },
                { id: "costs", label: "Costs", path: "/costs" },
                { id: "tools", label: "Tools", path: "/tools" },
                { id: "blog", label: "Blog", path: "/blog" },
                { id: "contact", label: "Contact", path: "/contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => navigateTo(item.path)}
                  className={`text-[14px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] ${
                    section === item.id ? "text-[#F6B73C] font-semibold" : "text-white/75"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Start Trip CTA Right */}
            <div className="flex items-center gap-4">
              <button
                id="btn-start-trip-cta"
                onClick={() => navigateTo("/destinations")}
                className="hidden md:block bg-[#F6B73C] text-[#0F172A] hover:bg-[#D4941A] font-bold text-sm rounded-full px-5 py-2 shadow-md transition-colors whitespace-nowrap cursor-pointer"
              >
                Start Trip
              </button>

              {/* Mobile Hamburger Menu Burger */}
              <button
                id="mobile-menu-burger"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-1 focus:outline-none flex flex-col justify-between h-[15px] w-[20px] cursor-pointer"
              >
                <span className="w-full h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
                <span className="w-full h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
                <span className="w-full h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
              </button>
            </div>
          </div>

          {/* Mobile Sliding Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Semi-transparent backdrop with click-to-close */}
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setMobileMenuOpen(false)}
              />
              
              {/* Sliding drawer from right */}
              <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0F172A] shadow-2xl flex flex-col z-10 border-l border-white/10">
                {/* Drawer Header */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-white/8">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-gradient-to-br from-[#F6B73C] to-[#E2A123] text-[#0F172A] p-1.5 rounded-lg shrink-0">
                      <svg className="w-4.5 h-4.5 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
                      </svg>
                    </div>
                    <span className="font-sans font-extrabold text-[20px] text-white tracking-wider">URAL</span>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="text-[#F6B73C] hover:text-white p-1 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Nav List */}
                <nav className="flex-1 py-4 overflow-y-auto">
                  {[
                    { id: "home", label: "Home", path: "/" },
                    { id: "flights", label: "Flights", path: "/flights" },
                    { id: "hotels", label: "Hotels", path: "/hotels" },
                    { id: "visa", label: "Visa", path: "/visa" },
                    { id: "destinations", label: "Destinations", path: "/destinations" },
                    { id: "costs", label: "Costs", path: "/costs" },
                    { id: "tools", label: "Tools", path: "/tools" },
                    { id: "blog", label: "Blog", path: "/blog" },
                    { id: "contact", label: "Contact", path: "/contact" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigateTo(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-4 px-6 text-left border-b border-white/6 text-[14px] font-medium transition-colors block text-white/75 hover:text-[#F6B73C]"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <span className={section === item.id ? "text-[#F6B73C] font-semibold" : ""}>
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Drawer CTA Footer */}
                <div className="p-6 border-t border-white/8 bg-[#0B1628]">
                  <button
                    onClick={() => {
                      navigateTo("/destinations");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#F6B73C] text-[#0F172A] hover:bg-[#D4941A] font-bold text-xs uppercase py-3 rounded-full shadow-md text-center tracking-wider transition-colors"
                  >
                    Start Trip
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

      </div>

      {/* ⚡ ACTIVE TEMPLATE RENDER */}
      {section === "home" && (
        <div className="w-full">
          {/* 🟦 SECTION 1: TOP SECTION (ABOVE THE FOLD) — PRIMARY CONVERSION ZONE */}
          <div 
            className="hero-bg relative overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center p-6 md:p-12 lg:p-16 select-none border-b border-slate-800/80 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(8, 17, 32, 0.85) 0%, rgba(11, 23, 44, 0.8) 35%, rgba(15, 30, 56, 0.75) 65%, rgba(21, 38, 68, 0.85) 100%), url(${heroBgImage})`
            }}
          >
            {/* SEO-optimized Image Placement */}
            <img src={heroBgImage} alt="Travel from Bangladesh — compare flights hotels and visa guides" className="sr-only" />

            {/* Bottom Fade Gradient Overlay - Removed to avoid white overlay */}

            {/* Animated SVG Route Map Overlay */}
            <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-40" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
              {/* Flight route paths starting from Dhaka (Dhaka is at 600, 350 in the middle) */}
              
              {/* Dhaka to Kathmandu */}
              <path d="M 600,350 Q 560,220 560,90" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '0s' }} />
              {/* Dhaka to Bangkok */}
              <path d="M 600,350 Q 840,305 1080,260" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-4s' }} />
              {/* Dhaka to Kuala Lumpur */}
              <path d="M 600,350 Q 810,445 1020,540" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-8s' }} />
              {/* Dhaka to Maldives */}
              <path d="M 600,350 Q 425,455 250,560" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-12s' }} />
              {/* Dhaka to Dubai */}
              <path d="M 600,350 Q 360,295 120,240" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-16s' }} />

              {/* Dotted static reference lines under routes for depth */}
              <path d="M 600,350 Q 560,220 560,90" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 840,305 1080,260" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 810,445 1020,540" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 425,455 250,560" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 360,295 120,240" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />

              {/* Destination Dots with Pulse animation */}
              {/* Dhaka (Hub -> Large Pulsating Gold Dot in the middle) */}
              <circle cx="600" cy="350" r="7" fill="#F6B73C" className="dest-dot" style={{ animationDelay: '0s' }} />
              <circle cx="600" cy="350" r="14" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.5" className="animate-ping" style={{ transformOrigin: '600px 350px' }} />
              <text x="600" y="380" fill="#F6B73C" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle" opacity="0.95" letterSpacing="1">DHAKA (DAC)</text>

              {/* Kathmandu */}
              <circle cx="560" cy="90" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '0.8s' }} />
              <text x="560" y="72" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">KATHMANDU (KTM)</text>

              {/* Bangkok */}
              <circle cx="1080" cy="260" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '1.6s' }} />
              <text x="1080" y="242" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">BANGKOK (BKK)</text>

              {/* Kuala Lumpur */}
              <circle cx="1020" cy="540" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '2.4s' }} />
              <text x="1020" y="522" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">KUALA LUMPUR (KUL)</text>

              {/* Maldives */}
              <circle cx="250" cy="560" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '3.2s' }} />
              <text x="250" y="542" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">MALDIVES (MLE)</text>

              {/* Dubai */}
              <circle cx="120" cy="240" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '1.2s' }} />
              <text x="120" y="222" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">DUBAI (DXB)</text>
            </svg>

            {/* Master Left-Aligned Stack aligned perfectly with max-w-7xl content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col items-center sm:items-start justify-center space-y-6">
              
              <span className="hero-badge font-sans tracking-widest uppercase inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 border leading-none bg-[#F6B73C]/15 border-[#F6B73C]/25 text-[#F6B73C] rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C] animate-ping"></span>
                ⭐️ Bangladesh's #1 Travel Intelligence Platform
              </span>
              
              <h1 className="hero-h1 font-sans text-[clamp(2.3rem,6vw,4.5rem)] font-[900] leading-[1.1] tracking-tight text-white max-w-4xl drop-shadow text-center sm:text-left">
                Travel Smarter <br />
                <span className="text-[#F6B73C]">From Bangladesh</span>
              </h1>
              
              <p className="hero-subtitle text-white/80 text-[1.1rem] sm:text-[1.2rem] leading-[1.60] max-w-2xl font-sans text-center sm:text-left">
                Flights, hotels, visas, and destination guides — crafted specifically for Bangladeshi travelers. Your travel intelligence for the world.
              </p>

              {/* Pill List of Expert Features */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  Expert Visa Guides
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  BDT Pricing
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  Halal-Friendly Picks
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  Dhaka Routes Focus
                </span>
              </div>
            </div>
          </div>

          {/* Stats Bar Container (Full Width) */}
          <div id="hero-stats-bar" className="stats-bar bg-[#0F172A] py-7 px-4 shadow-lg border-t border-b border-[#F6B73C]/20">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4 md:divide-x md:divide-white/10 text-center select-none">
              <div className="flex-1 w-full space-y-1">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">50+</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">Travel Guides</div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">15+</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">Destinations Covered</div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">100%</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">BD Traveler Focus</div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">Free</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">Travel Intelligence</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⚡ ACTIVE TEMPLATE RENDER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* -------------------------------------------------------------
            🏠 VIEW 1: HOME PAGE (CONVERSION HUB)
        ------------------------------------------------------------- */}
        {section === "home" && (
          <div className="space-y-16">

            {/* 🟦 SECTION 1.5: FRESH NEW SEARCH SECTOR - relocated from hero */}
            <div id="live-flight-search" className="scroll-mt-12 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#0F172A] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">
                  Real-time ticket search
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Search Jet Fares from Dhaka
                </h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  Powered by a global aviation scanner to secure the best rates. Direct, multi-stop, and promotional ticket options.
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-2 sm:p-5 shadow-2xl w-full">
                <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase block mb-3 px-2 tracking-wider">✈️ LIVE FLIGHT PRICE SEARCH</span>
                <div className="text-slate-900">
                  <TravelpayoutsEmbed />
                </div>
              </div>
            </div>

            {/* 🟦 SECTION 2: QUICK DESTINATION ENTRY */}
            <div id="destinations-section" className="scroll-mt-12 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#0F172A] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">Popular destinations from Bangladesh</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Where Are You Flying Next?</h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">Pick a destination to see flights, visa requirements, hotel guides, and a full trip budget — all in BDT.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { city: "Kathmandu", country: "Nepal", tag: "Free visa on arrival for Bangladeshis. Budget hotels in Thamel from BDT 1,500/night. A great first international trip.", code: "nepal-guide", img: "🇳🇵", path: "/destinations?country=nepal-guide", bgImg: nepalDestImg, alt: "Kathmandu skyline view — Nepal travel guide for Bangladeshi tourists" },
                  { city: "Bangkok", country: "Thailand", tag: "Online e-Visa — approved in 5–10 days. Street food, shopping, islands, and beautiful temples.", code: "thailand-guide", img: "🇹🇭", path: "/destinations?country=thailand-guide", bgImg: bangkokDestImg, alt: "Bangkok temple and city view — Thailand travel guide for Bangladeshi tourists" },
                  { city: "Kuala Lumpur", country: "Malaysia", tag: "Simple online eVisa. Affordable hotels, excellent halal food, and easy transit across Kuala Lumpur.", code: "malaysia-guide", img: "🇲🇾", path: "/destinations?country=malaysia-guide", bgImg: klDestImg, alt: "Kuala Lumpur Petronas Twin Towers — Malaysia travel guide for Bangladeshi tourists" },
                  { city: "Dubai", country: "UAE", tag: "eVisa in 3–5 days. Burj Khalifa, desert safari, duty-free shopping — 4h 45m direct from Dhaka.", code: "dubai-guide", img: "🇦🇪", path: "/destinations?country=dubai-guide", bgImg: dubaiDestImg, alt: "Dubai Burj Khalifa skyline view — UAE travel guide for Bangladeshi tourists" }
                ].map((dest, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigateTo(dest.path)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-950 shadow-lg hover:shadow-2xl transition-all duration-350 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-end aspect-[4/5] sm:aspect-square md:aspect-[4/5] border border-slate-800/10 hover:border-[#F6B73C]/20"
                  >
                    {/* Background Travel Image */}
                    <img 
                      src={dest.bgImg} 
                      alt={dest.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    />

                    {/* Dark gradient shadow overlay for extreme readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

                    {/* Glassmorphic description layout */}
                    <div className="relative z-20 p-4 space-y-2.5 bg-slate-950/65 backdrop-blur-md border-t border-white/10 m-3 rounded-xl shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm px-1.5 py-0.5 bg-white/15 rounded backdrop-blur-sm font-sans shrink-0">{dest.img}</span>
                        <h4 className="font-sans font-bold text-sm text-white tracking-tight">{dest.city}, {dest.country}</h4>
                      </div>
                      
                      <p className="text-[10px] text-slate-250 font-normal leading-relaxed line-clamp-3">
                        {dest.tag}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[10px] font-mono font-bold text-[#F6B73C] flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                          Plan This Trip <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
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

            {/* 🟦 SECTION 4.25: TRAVEL SERVICES */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#0F172A] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">Everything else for your trip</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Transfers, Activities, eSIM & Car Rental</h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">Book the rest of your trip in one place — airport transfers, things to do, mobile data, and rental cars.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🚕 Airport Transfers</span>
                  <KiwitaxiTransferWidget />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">📶 Stay Connected</span>
                  <AiraloEsimWidget />
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🎟️ Things To Do</span>
                    <KlookActivitiesWidget />
                  </div>
                  <div className="pt-2">
                    <PartnerLinkButton href={AFFILIATE_LINKS.kkday} label="More tours on KKday" />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🚗 Car Rental</span>
                  <QeeqCarRentalWidget />
                </div>
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

            {/* 🟦 SECTION 4.5: TRUSTPILOT TESTIMONIALS */}
            <TrustpilotReviews />



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
                  <p className="text-[10px] text-slate-350 leading-relaxed font-sans font-sans">Flights, transfers, activities, eSIMs, and car rentals on this site are powered by Travelpayouts and its partner network — including Aviasales, Klook, Kiwitaxi, Airalo, and QEEQ.</p>
                </div>
              </div>
            </div>

            {/* 🟦 SECTION 7 / EMAIL ACTION SIGNUP */}
            <div 
              className="w-screen relative left-1/2 -translate-x-1/2 border-t border-b border-slate-900/10 bg-cover bg-center select-none overflow-hidden" 
              style={{ 
                backgroundImage: `linear-gradient(180deg, rgba(15, 30, 54, 0.5) 0%, rgba(11, 23, 44, 0.85) 65%, rgba(10, 15, 30, 0.98) 100%), url(${coxsBazarSunriseImg})`,
                backgroundPosition: "center 40%"
              }}
            >
              {/* SEO-optimized Image Placement */}
              <img src={coxsBazarSunriseImg} alt="Cox's Bazar scenic sunrise beach view — travel from Dhaka and explore Bangladesh and outbound destinations" className="sr-only" />

              <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 flex flex-col justify-center items-center text-center space-y-8 relative z-10">
                
                {/* Visual Badge */}
                <span className="font-sans tracking-widest uppercase inline-flex items-center gap-1.5 text-[11px] font-bold px-4 py-1.5 border leading-none bg-[#F6B73C]/20 border-[#F6B73C]/35 text-[#F6B73C] rounded-full backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C] animate-pulse"></span>
                  🌅 Live from Cox's Bazar to the World
                </span>

                <div className="space-y-3 max-w-2xl">
                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                    Get Flight Deal Alerts <br className="sm:hidden" />
                    <span className="text-[#F6B73C]">from Dhaka</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-xl mx-auto opacity-95">
                    Sign up to get instant BDT notifications when flight prices from Dhaka drop below <span className="text-[#F6B73C] font-semibold">BDT 20,000</span> to Maldives, Nepal, Bangkok, KL, or Dubai.
                  </p>
                </div>

                <div className="w-full max-w-md bg-slate-950/40 p-1 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                  {emailSubscribed ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm px-6 py-4 rounded-xl font-mono text-center">
                      ✔ You're subscribed! We'll email you at <b className="text-white">{userEmail}</b> when Dhaka flight prices drop. Happy travels!
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (userEmail.trim()) {
                          setEmailSubscribed(true);
                        }
                      }}
                      className="flex flex-col sm:flex-row items-center gap-2"
                    >
                      <input 
                        type="email" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Enter your personal email"
                        required
                        className="w-full sm:flex-grow bg-slate-900/60 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F6B73C] focus:ring-1 focus:ring-[#F6B73C] transition-all font-sans text-center sm:text-left"
                      />
                      <button 
                        type="submit"
                        className="w-full sm:w-auto bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc240] active:bg-[#e2a222] font-black text-sm px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 shadow-lg shadow-[#F6B73C]/20"
                      >
                        Subscribe Alerts
                      </button>
                    </form>
                  )}
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-300 opacity-90">
                  <span className="flex items-center gap-1">🔒 Spam-Free</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="flex items-center gap-1">❌ 1-Click Unsubscribe</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="flex items-center gap-1">🇧🇩 BDT Pricing Alerts</span>
                </div>

              </div>
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

              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-sm">
                <span className="text-[10px] text-[#102A43] font-mono uppercase tracking-widest block font-bold">🚕 After You Land</span>
                <p className="text-[11px] text-slate-500 leading-normal">Pre-book a private airport transfer to your hotel in {FLIGHTS_DATA.find(r => r.id === parameterId)?.country || "Nepal"} — skip the taxi line.</p>
                <PartnerLinkButton href={AFFILIATE_LINKS.kiwitaxi} label="Find a Transfer" variant="dark" />
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
                        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          Flights from {activeRoute.from} to {activeRoute.to}
                        </h1>
                        <span className="bg-[#F6B73C]/20 text-[#102A43] text-xs px-3 py-1 rounded-full font-bold font-mono">
                          {activeRoute.priceRangeBdt.split(" (")[0]}
                        </span>
                      </div>
                    </div>

                    {/* 🤖 AEO: QUICK ANSWER (50-80 Words, Google AI Overview Optimized) */}
                    <div id="aeo-quick-answer-card" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeRoute.quickAnswer}
                      </p>
                    </div>

                    {/* 📊 AEO: KEY FACTS TABLE */}
                    <div className="space-y-3">
                      <h2 className="font-serif font-black text-lg text-slate-900">Flight Facts at a Glance</h2>
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
                    <div className="prose prose-slate max-w-none text-sm sm:text-[14.5px] text-slate-700 space-y-4 leading-relaxed">
                      <h2 className="font-serif font-black text-lg text-slate-900">Airlines Flying This Route</h2>
                      <p>
                        Bangladeshi outbound travellers can leverage several daily flight profiles from Hazrat Shahjalal International Airport (DAC). Direct options are highly recommended to save travel fatigue:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeRoute.airlines.map((airline) => (
                          <li key={airline} className="font-medium text-slate-805">{airline}</li>
                        ))}
                      </ul>
                      
                      <h3 className="font-serif font-black text-base text-slate-900 mt-4">When to Book for the Best Price</h3>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
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
                        <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">
                          🚕 Book Airport Transfer in {activeRoute.country} <ExternalLink size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    <TravelIntelligence
                      pageTitle={`Flights to ${activeRoute.country}`}
                      quickAnswer={activeRoute.quickAnswer}
                      keyFacts={activeRoute.keyFacts}
                      faqs={activeRoute.faqs}
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

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Where to Stay in {activeHotel.city}: Best Areas & Hotels
                      </h1>
                    </div>

                    {/* AEO Answer */}
                    <div id="hotel-aeo-quick-answer" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeHotel.quickAnswer}
                      </p>
                    </div>

                    {/* Neighborhoods breakdown */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Best Neighborhoods Area breakdown</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeHotel.neighborhoods.map((zone) => (
                          <div key={zone.name} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow">
                            <span className="font-serif text-base font-bold text-[#102A43] block">{zone.name}</span>
                            <span className="text-[10px] bg-slate-100 font-mono text-[#102A43] font-bold rounded-full px-2 py-0.5 inline-block my-1">{zone.vibe}</span>
                            <p className="text-sm text-slate-700 leading-relaxed mt-2 font-sans">{zone.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curated Housing Grid list */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900">Curated Local Stays Selection</h2>
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

                    {/* 🚕 Getting From the Airport widget block */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest block">🚕 Getting From the Airport</span>
                        <h2 className="font-serif text-lg font-bold text-slate-900">Book Your Transfer to {activeHotel.city}</h2>
                        <p className="text-xs text-slate-500">Pre-book a private or shared transfer instead of negotiating a taxi on arrival.</p>
                      </div>
                      <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200">
                        <KiwitaxiTransferWidget />
                      </div>
                    </div>

                    {/* Flight & Visa Loop linkups */}
                    <div id="hotel-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">⚡ FLIGHT ROUTING & ENTRY DETAILS:</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            const matchingVisa = activeHotel.country.toLowerCase() === "nepal" ? "nepal-visa" : activeHotel.country.toLowerCase() === "thailand" ? "thailand-visa" : "malaysia-visa";
                            navigateTo(`/visa?country=${matchingVisa}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🛂 Check {activeHotel.country} Visa Checklist <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            const matchingRoute = activeHotel.country.toLowerCase() === "nepal" ? "dhaka-kathmandu" : activeHotel.country.toLowerCase() === "thailand" ? "dhaka-bangkok" : "dhaka-kuala-lumpur";
                            navigateTo(`/flights?route=${matchingRoute}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          ✈️ Recommended Dhaka Flights <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a
                          href={AFFILIATE_LINKS.kiwitaxi}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-250 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🚕 Compare Transfer Prices <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    {/* Widget */}
                    <TravelpayoutsWidget 
                      initialTab="hotels"
                      initialHotelCity={activeHotel.city}
                      initialTo={activeHotel.city === "Kathmandu" ? "Kathmandu (KTM)" : activeHotel.city === "Bangkok" ? "Bangkok (BKK)" : activeHotel.city === "Dubai" ? "Dubai (DXB)" : "Kuala Lumpur (KUL)"}
                    />

                    <TravelIntelligence
                      pageTitle={`Where to stay in ${activeHotel.city}`}
                      quickAnswer={activeHotel.quickAnswer}
                      keyFacts={activeHotel.keyFacts}
                      faqs={activeHotel.faqs}
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
                        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          {activeVisa.country} Visa Requirements for Bangladeshi Citizens
                        </h1>
                        <span className="bg-[#102A43] text-white text-xs px-3 py-1 rounded-full font-bold font-mono">
                          {activeVisa.requirementType}
                        </span>
                      </div>
                    </div>

                    {/* AEO Quote */}
                    <div id="visa-aeo-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
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
                      <h2 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Step-by-Step Application Process</h2>
                      <div className="space-y-3">
                        {activeVisa.stepByStep.map((step, idx) => (
                          <div key={idx} className="flex gap-4 text-sm sm:text-[14.5px] leading-relaxed text-slate-705 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <span className="w-6 h-6 rounded-full bg-[#102A43] text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Document structures */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900">Document Checklist</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeVisa.documentChecklist.map((cat) => (
                          <div key={cat.category} className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#102A43] block border-b border-slate-200 pb-2 mb-3">📋 {cat.category}</span>
                            <ul className="space-y-2 text-sm sm:text-[14.5px] text-slate-700">
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

                    {/* Flight booking CTA after visa checklist */}
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <div className="text-center text-sm font-semibold text-slate-600 py-2">
                        Ready to book your trip?
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                          Find flights from Dhaka
                        </span>
                        <TravelpayoutsEmbed />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <PartnerLinkButton 
                          href={AFFILIATE_LINKS.airalo} 
                          label={`Get a local eSIM for ${activeVisa.country}`} 
                        />
                        <PartnerLinkButton 
                          href={AFFILIATE_LINKS.kiwitaxi} 
                          label="Book airport transfer" 
                        />
                      </div>
                    </div>

                    {/* 📶 Stay Connected widget block */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest block">📶 Before You Fly</span>
                        <h2 className="font-serif text-lg font-bold text-slate-900">Get a Local eSIM for {activeVisa.country}</h2>
                        <p className="text-xs text-slate-500">Land with data already active — no SIM card counter, no roaming bill shock.</p>
                      </div>
                      <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200">
                        <AiraloEsimWidget />
                      </div>
                    </div>

                    {/* Flight & Hotel loop structure */}
                    <div id="visa-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">Plan Your Full Trip</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-hotel-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            const matchingHotel = activeVisa.country.toLowerCase() === "nepal" ? "kathmandu-hotels" : activeVisa.country.toLowerCase() === "thailand" ? "bangkok-hotels" : activeVisa.country.toLowerCase() === "uae" ? "dubai-hotels" : "kuala-lumpur-hotels";
                            navigateTo(`/hotels?city=${matchingHotel}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🏨 Curated {activeVisa.country} Hotels <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            const matchingRoute = activeVisa.country.toLowerCase() === "nepal" ? "dhaka-kathmandu" : activeVisa.country.toLowerCase() === "thailand" ? "dhaka-bangkok" : activeVisa.country.toLowerCase() === "uae" ? "dhaka-dubai" : "dhaka-kuala-lumpur";
                            navigateTo(`/flights?route=${matchingRoute}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          ✈️ Book Flights from Dhaka <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a
                          href={AFFILIATE_LINKS.airalo}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          📶 Get a Local eSIM <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    <TravelIntelligence
                      pageTitle={`${activeVisa.country} Outbound Visa Process`}
                      quickAnswer={activeVisa.quickAnswer}
                      keyFacts={activeVisa.keyFacts}
                      faqs={activeVisa.faqs}
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
                          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            Dubai Travel Guide
                          </h1>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
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
                            <a
                              href={AFFILIATE_LINKS.airalo}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1 cursor-pointer hover:border-[#F6B73C] block"
                            >
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">📶 Stay connected</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">Local eSIM from Airalo</span>
                            </a>
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

                        {/* 🚗 4. TRAVEL ESSENTIALS & SERVICES (Taxis, eSIMs, Rentals, Activities) */}
                        <TravelEssentials country="Dubai, UAE" />

                        {/* 🚕 New "Getting Around Dubai" section */}
                        <div id="dubai-getting-around" className="space-y-4">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Getting Around Dubai</h3>
                            <p className="text-xs text-slate-500">Pre-book transfers and rental cars instead of arranging them on arrival.</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                              <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🚕 Airport & City Transfers</span>
                              <KiwitaxiTransferWidget />
                            </div>
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                              <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🚗 Self-Drive Car Rental</span>
                              <QeeqCarRentalWidget />
                            </div>
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
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                            {[
                              { label: "Cheap flights to Dubai", path: "/flights" },
                              { label: "Best hotels in Dubai", path: "/hotels" },
                              { label: "Dubai airport transfers (Kiwitaxi)", href: AFFILIATE_LINKS.kiwitaxi },
                              { label: "Dubai car rental (QEEQ)", href: AFFILIATE_LINKS.qeeq },
                              { label: "Dubai tours (Klook)", href: AFFILIATE_LINKS.klook },
                              { label: "Dubai eSIM (Airalo)", href: AFFILIATE_LINKS.airalo }
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
                                <a
                                  key={idx}
                                  href={lnk.href}
                                  target="_blank"
                                  rel="noopener noreferrer sponsored"
                                  className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between"
                                >
                                  <span>{lnk.label}</span>
                                  <ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                                </a>
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
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                            <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🎟️ Book Dubai Tours & Activities</span>
                            <KlookActivitiesWidget />
                            <PartnerLinkButton href={AFFILIATE_LINKS.kkday} label="See more Dubai tours on KKday" />
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

                        <TravelIntelligence
                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}
                          quickAnswer={activeDes.quickAnswer}
                          keyFacts={activeDes.keyFacts}
                          faqs={activeDes.faqs}
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
                          <h1 className="font-serif text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                            {activeDes.title}
                          </h1>
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

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
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
                            <a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1 block hover:border-[#F6B73C] cursor-pointer">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">📶 Stay Connected</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">Local eSIM from Airalo</span>
                            </a>
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

                        {/* 🚗 TRAVEL ESSENTIALS & SERVICES (Taxis, eSIMs, Rentals, Activities) */}
                        <TravelEssentials country={activeDes.country} />

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

                          {/* Activities block */}
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 mt-4">
                            <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🎟️ Book Activities & Day Tours</span>
                            <KlookActivitiesWidget />
                            <PartnerLinkButton href={AFFILIATE_LINKS.kkday} label="See more tours on KKday" />
                          </div>

                          {/* Getting Around block */}
                          <div className="space-y-4 mt-4 text-left">
                            <h4 className="font-serif font-bold text-sm text-slate-900">Getting Around {activeDes.country}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                                <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🚕 Airport & City Transfers</span>
                                <KiwitaxiTransferWidget />
                              </div>
                              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                                <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block">🚗 Self-Drive Car Rental</span>
                                <QeeqCarRentalWidget />
                              </div>
                            </div>
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

                        {/* Helpful Affiliate Links Fallback Panel */}
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 text-left">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Helpful Links</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                              <span>Airport transfers (Kiwitaxi)</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                            </a>
                            <a href={AFFILIATE_LINKS.qeeq} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                              <span>Car rental (QEEQ)</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                            </a>
                            <a href={AFFILIATE_LINKS.klook} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                              <span>Tours & activities (Klook)</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                            </a>
                            <a href={AFFILIATE_LINKS.kkday} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                              <span>More tours (KKday)</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                            </a>
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

                        <TravelIntelligence
                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}
                          quickAnswer={activeDes.quickAnswer}
                          keyFacts={activeDes.keyFacts}
                          faqs={activeDes.faqs}
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

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        {activeCost.country} Trip Cost from Bangladesh: Complete Price Matrix
                      </h1>
                    </div>

                    {/* AEO Quote */}
                    <div id="cost-aeo-text-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">Quick Answer</span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeCost.quickAnswer}
                      </p>
                    </div>

                    {/* Detailed matrix cost tables */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
                        <h2 className="font-serif font-black text-lg text-slate-900">Full Trip Cost Breakdown (BDT)</h2>
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

                      {/* Interactive Conversion Widgets Block */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                            Check today's flight prices from Dhaka
                          </span>
                          <TravelpayoutsEmbed />
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                            Book tours & activities for your trip
                          </span>
                          <KlookActivitiesWidget />
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                            Pre-book your airport transfer
                          </span>
                          <KiwitaxiTransferWidget />
                        </div>
                      </div>
                    </div>

                    {/* Seasonal variations description */}
                    <div className="bg-slate-50 border border-slate-205 p-6 rounded-xl space-y-2">
                      <h4 className="font-serif font-black text-base text-slate-900">How Prices Change by Season</h4>
                      <p className="text-sm leading-relaxed text-slate-700 font-sans">
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
                            <p className="text-sm text-slate-700 leading-relaxed font-sans">{hack}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cut These Costs Further links section */}
                    <div className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3 text-left">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">Cut These Costs Further</span>
                      <p className="text-xs text-slate-600">Pre-booking transport, activities, and data usually beats paying on arrival in {activeCost.country}.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                          <span>Airport transfer</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                        </a>
                        <a href={AFFILIATE_LINKS.qeeq} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                          <span>Car rental</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                        </a>
                        <a href={AFFILIATE_LINKS.klook} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                          <span>Activities (Klook)</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                        </a>
                        <a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] p-3 rounded-xl transition-all font-mono font-bold text-slate-705 text-left cursor-pointer flex items-center justify-between">
                          <span>Local eSIM</span><ExternalLink size={10} className="text-[#F6B73C] shrink-0 ml-1" />
                        </a>
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

                    <TravelIntelligence
                      pageTitle={`${activeCost.country} Trip Cost calculations`}
                      quickAnswer={activeCost.quickAnswer}
                      keyFacts={activeCost.keyFacts}
                      faqs={activeCost.faqs}
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
              <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">
                Outbound Travel Tools Workspace
              </h1>
              <p className="text-xs text-slate-500 font-mono">Dynamic calculators constructed specifically for South Asian travelers.</p>
            </div>
            
            <InteractiveTools />

            {isAdmin && <TravelpayoutsOnboarding />}

            {/* Book Your Trip - Visual Step-by-Step Booking Checklist Funnel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8 mt-8">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">Book Your Trip</h2>
                <p className="text-sm text-slate-500">Your step-by-step planning and conversion dashboard built for outbound trips from Bangladesh.</p>
              </div>

              <div className="space-y-8 divide-y divide-slate-100">
                {/* Step 1 */}
                <div className="space-y-4 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#102A43] text-white font-mono text-sm font-bold shadow-sm">
                      1
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#102A43]">Step 1: Find your flight</h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <TravelpayoutsEmbed />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3 font-medium">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#102A43] text-white font-mono text-sm font-bold shadow-sm">
                      2
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#102A43]">Step 2: Book your hotel</h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <TravelpayoutsWidget initialTab="hotels" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#102A43] text-white font-mono text-sm font-bold shadow-sm">
                      3
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#102A43]">Step 3: Plan activities with Klook</h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <KlookActivitiesWidget />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#102A43] text-white font-mono text-sm font-bold shadow-sm">
                      4
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#102A43]">Step 4: Get your travel eSIM</h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <AiraloEsimWidget />
                  </div>
                </div>
              </div>
            </div>
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

              {/* Sticky Affiliate Recommendations Card */}
              <div className="sticky top-[80px] bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono block">
                  Plan your trip
                </span>
                <div className="space-y-2.5">
                  <PartnerLinkButton 
                    href={AFFILIATE_LINKS.aviasales} 
                    label="Compare flights from Dhaka" 
                    variant="dark"
                  />
                  <PartnerLinkButton 
                    href={AFFILIATE_LINKS.klook} 
                    label="Book tours & activities" 
                    variant="dark"
                  />
                  <PartnerLinkButton 
                    href={AFFILIATE_LINKS.airalo} 
                    label="Get a travel eSIM" 
                    variant="dark"
                  />
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <AiraloEsimWidget />
                </div>
              </div>
            </div>

            {/* Blog Post Details */}
            <div className="lg:col-span-3 space-y-6 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm animate-fade-in text-sm">
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

                      <h1 className="font-serif text-2xl sm:text-3.5xl font-black text-slate-900 leading-tight">
                        {activePost.title}
                      </h1>

                      <div className="text-slate-400 text-[10px] font-mono pt-1">
                        Author: <strong>{activePost.author}</strong> | reading: <strong>{activePost.readTime}</strong>
                      </div>
                    </div>

                    {/* Rich text body content */}
                    <div className="prose prose-slate max-w-none text-slate-850 leading-relaxed sm:leading-relaxed whitespace-pre-wrap space-y-5 text-[15px] sm:text-[16px] font-sans p-5 sm:p-7 bg-slate-50/40 rounded-xl border border-slate-100">
                      {activePost.content}
                    </div>

                    {activePost.affiliateCTA && (
                      <div className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl space-y-2 text-left animate-fade-in">
                        <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block uppercase">{activePost.affiliateCTA.headline}</span>
                        <p className="text-xs text-slate-600">{activePost.affiliateCTA.body}</p>
                        {activePost.affiliateCTA.provider === "klook" ? <KlookActivitiesWidget /> :
                         activePost.affiliateCTA.provider === "kiwitaxi" ? <KiwitaxiTransferWidget /> :
                         activePost.affiliateCTA.provider === "airalo" ? <AiraloEsimWidget /> :
                         activePost.affiliateCTA.provider === "qeeq" ? <QeeqCarRentalWidget /> :
                         <PartnerLinkButton href={AFFILIATE_LINKS[activePost.affiliateCTA.provider]} label="Check it out" variant="dark" />}
                      </div>
                    )}

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

      {/* 🟦 GLOBAL TRAVEL BLOG SECTION - Last section in any page before Footer */}
      {section !== "blog" && (
        <div className="mt-20 pt-16 border-t border-slate-200/80 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest bg-[#102A43]/10 border border-[#102A43]/20 px-3 py-1 rounded-full">
              Explore Our Travel Blog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Practical Insights for Bangladeshi Travelers
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto font-sans">
              Cheaper flights, hassle-free visa processing guidelines, and real trip budget breakdowns in BDT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: "5 Ways to Book Cheaper Flights from Dhaka", 
                slug: "cheap-flight-booking-hacks-dhaka", 
                time: "10 min read", 
                icon: "✈️",
                excerpt: "Most people book flights at the wrong time and overpay by thousands of taka. These five habits consistently get cheaper tickets — and the last one most people skip entirely." 
              },
              { 
                title: "Nepal vs Thailand: Which Is Better for Your First Trip?", 
                slug: "nepal-vs-thailand-first-trip", 
                time: "8 min read", 
                icon: "⛰️",
                excerpt: "Nepal offers direct flight networks, free visa on arrival, and a very low daily cost. Thailand opens up beaches, high-end shopping, and vibrant streets. Here is how to choose." 
              },
              { 
                title: "How to Keep Hotel Costs Low in Bangkok, KL, and Dubai", 
                slug: "hotel-savings-guide-bangkok-kl-dubai", 
                time: "6 min read", 
                icon: "🏨",
                excerpt: "The right neighborhood makes a huge difference. One metro station away from tourist sectors can save up to BDT 15,000 per trip without compromising of comfort." 
              }
            ].map((post, index) => (
              <div 
                key={index} 
                className="group bg-white border border-slate-200 hover:border-[#F6B73C]/60 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                style={{ minHeight: "270px" }}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[20px]">{post.icon}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md">{post.time}</span>
                  </div>
                  <h4 
                    className="font-serif font-black text-base text-slate-900 group-hover:text-[#102A43] cursor-pointer leading-snug transition-colors" 
                    onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                  >
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{post.excerpt}</p>
                </div>

                <button 
                  onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                  className="text-xs font-bold text-[#102A43] group-hover:text-[#F6B73C] self-start mt-4 flex items-center gap-1 transition-colors"
                >
                  Read full tips <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo("/blog")}
              className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              📊 Visit Full Travel Blog Directory
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          📞 VIEW 9: CONTACT US & DIRECT SUPPORT HUB
      ------------------------------------------------------------- */}
      {section === "contact" && (
        <div className="space-y-10 animate-fade-in font-sans">
          
          {/* Visual Header Banner */}
          <div className="bg-[#102A43] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#F6B73C]/15 text-[#F6B73C] text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#F6B73C] animate-ping"></span>
                Direct Assistance Hotline
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                Let's Connect Directly
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Have inquiries about flight bookings, visa procedures, or destination travel packages? Contact our director directly through Call, WhatsApp, or the interactive travel inquiry form below. We respond instantly!
              </p>
            </div>
          </div>

          {/* Quick Contact Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WhatsApp direct card */}
            <div className="bg-white border border-slate-200 hover:border-emerald-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.35 1.489 5.513 0 10.002-4.486 10.005-9.999.001-2.671-1.037-5.182-2.924-7.071C17.192 1.685 14.685.648 12.012.648c-5.516 0-10.01 4.488-10.014 10.002-.001 1.902.483 3.654 1.401 5.247l-.952 3.479 3.599-.944z" />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono font-bold text-emerald-600 block uppercase tracking-widest">WHATSAPP CHAT</span>
                <h3 className="font-serif text-lg font-bold text-slate-900">Start Direct Chat</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  The fastest way to get custom support. Ask visa questions, seek roundtrip ticket packages, or request customized hotel bookings.
                </p>
                <a 
                  href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  Chat on WhatsApp (+8801784385335)
                </a>
              </div>
            </div>

            {/* Phone Direct call card */}
            <div className="bg-white border border-slate-200 hover:border-[#102A43]/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono font-bold text-blue-600 block uppercase tracking-widest">TELEPHONE HOTLINE</span>
                <h3 className="font-serif text-lg font-bold text-slate-900">Direct Mobile Support</h3>
                <p className="text-xs text-slate-500 leading-normal">
                  Talk directly to the director. Get immediate verification of requirements, active flight check comparisons, and reliable counsel.
                </p>
                <a 
                  href="tel:+8801784385335" 
                  className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  Call Directly (+8801784385335)
                </a>
              </div>
            </div>

          </div>

          {/* Travel Inquiry Contact Form & Verification Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Form (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">Send an Interactive Travel Inquiry</h2>
                <p className="text-xs text-slate-500 mt-1">Specify your target destination and desired assistance type to receive a custom callback.</p>
              </div>

              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-sm shadow-emerald-500/20">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-slate-900">Inquiry Received Successfully!</h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Thank you <b>{contactName}</b>. Your request regarding <b>{contactSubject}</b> has been registered. We will contact you at <b>{contactPhone}</b> via Call and WhatsApp shortly.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-emerald-150 text-left space-y-2 max-w-md mx-auto font-mono text-[11px] text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-bold text-slate-400">SUBJECT:</span>
                      <span className="text-slate-800 font-bold">{contactSubject}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-bold text-slate-400">DESTINATION:</span>
                      <span className="text-slate-800 font-bold">{contactDestination}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="font-bold text-slate-400">SUBMISSION ID:</span>
                      <span className="text-[#102A43] font-bold">URAL-REQ-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName("");
                      setContactPhone("");
                      setContactMessage("");
                    }}
                    className="bg-[#102A43] hover:bg-slate-800 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!contactName || !contactPhone) {
                      alert("Please fill in your Name and Phone/WhatsApp number.");
                      return;
                    }
                    setContactLoading(true);
                    setTimeout(() => {
                      setContactLoading(false);
                      setContactSubmitted(true);
                    }, 1000);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Farhan Momen"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Phone or WhatsApp Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +8801784385335"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Assistance Category */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Subject / Assistance Category</label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Visa Processing Checklist">Visa Processing Checklist</option>
                        <option value="Cheap Flight Package comparison">Cheap Flight Package comparison</option>
                        <option value="Custom Group Itinerary planning">Custom Group Itinerary planning</option>
                        <option value="Hotel Booking Assistance">Hotel Booking Assistance</option>
                        <option value="Affiliate Partnership Inquiries">Affiliate Partnership Inquiries</option>
                      </select>
                    </div>

                    {/* Target Destination */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">Travel Destination</label>
                      <select
                        value={contactDestination}
                        onChange={(e) => setContactDestination(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Nepal">Nepal 🇳🇵</option>
                        <option value="Thailand">Thailand 🇹🇭</option>
                        <option value="Malaysia">Malaysia 🇲🇾</option>
                        <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                        <option value="Other / Multi-Destination">Other / Multi-Destination 🌍</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">Your Message / Specific Requirements</label>
                    <textarea
                      rows={4}
                      placeholder="Please write down your budget constraints, travel dates, or special assistance needs so we can guide you effectively..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-4 py-3 text-slate-800 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full bg-[#102A43] hover:bg-slate-800 text-[#F6B73C] font-black text-xs uppercase py-3.5 rounded-xl shadow-md tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {contactLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                        <span>Processing Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Travel Inquiry</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Side info card (Col 5) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest">SUPPORT COVENANT</span>
                <h3 className="font-serif text-lg font-bold text-slate-900">Why Contact URAL Directly?</h3>
                
                <div className="space-y-3.5 text-xs text-slate-650">
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p><b>100% Free Consultation:</b> We never charge any fees to verify visa documents or search for cheap flights.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p><b>Authorized Referrals:</b> Connect to approved visa processing desks and Travelpayouts verified operators.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p><b>Direct Callback:</b> Bangladeshi tourists receive a personal callback within 1-2 hours of submission.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-250 p-4 rounded-xl border border-slate-300 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">DIRECT DIAL DESK</span>
                <span className="text-sm font-serif font-black text-[#102A43] block">+8801784385335</span>
                <span className="text-[9px] text-slate-400 block">Available 24/7 on WhatsApp Messenger</span>
              </div>
            </div>

          </div>

        </div>
      )}

      </main>

      {/* 🔮 MASTER FOOTER BLOCK */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="bg-white/10 text-white p-1.5 rounded-lg shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20" />
                </svg>
              </div>
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
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">Travel Services</span>
            <ul className="space-y-1 text-xs">
              <li><a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Airport Transfers</a></li>
              <li><a href={AFFILIATE_LINKS.klook} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Tours & Activities</a></li>
              <li><a href={AFFILIATE_LINKS.qeeq} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Car Rental</a></li>
              <li><a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Local eSIM</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">Direct Support & Contact</span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">💬</span>
                <a href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline text-emerald-400 font-mono font-bold">WhatsApp Chat</a>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#F6B73C]">📞</span>
                <a href="tel:+8801784385335" className="hover:text-white hover:underline text-[#F6B73C] font-mono font-bold">Direct Call: +8801784385335</a>
              </div>
              <div className="pt-1">
                <button onClick={() => navigateTo("/contact")} className="bg-slate-800 text-[#F6B73C] hover:bg-slate-700 px-3 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-wide cursor-pointer transition-colors">
                  Contact Form Page
                </button>
              </div>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              <b>Transparency:</b> URAL earns a small commission on travel reservations completed via links on our site, at no extra cost to you.
            </p>
          </div>

        </div>
      </footer>

      {/* Dynamic Action Affiliate Conversion Toast Overlay */}
      {affiliateToast && (
        <div id="converter-toast" className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#0F172A] text-white p-4 rounded-xl shadow-2xl border border-[#F6B73C] animate-fade-in flex items-start gap-4">
          <div className="p-2 bg-[#F6B73C] text-[#0F172A] rounded-lg shrink-0 text-xs">🚀</div>
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
