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
import { TravelpayoutsCustomWidget } from "./components/TravelpayoutsCustomWidget";
import TravelpayoutsWidget from "./components/TravelpayoutsWidget.jsx";
import { TravelpayoutsEmbed } from "./components/TravelpayoutsEmbed";
import { TrustpilotReviews } from "./components/TrustpilotReviews";
import { InteractiveTools } from "./components/InteractiveTools";
import { TravelEssentials } from "./components/TravelEssentials";
import {
  KiwitaxiTransferWidget,
  WelcomePickupsWidget,
  AiraloEsimWidget,
  KlookActivitiesWidget,
  QeeqCarRentalWidget,
  PartnerLinkButton,
  AFFILIATE_LINKS
} from "./components/AffiliatePartners";
import {
  useSeoMeta,
  generateFAQSchema,
  HAJJ_UMRAH_FAQS,
  buildFaqSchema,
  getFaqSchemaForPage,
  SERVICE_TOOLS_FAQS,
  SERVICE_CONTACT_FAQS,
} from "./hooks/useSeoMeta";
import { Language, translations } from "./translations";
import {
  getLocalizedBlogs,
  getLocalizedFlights,
  getLocalizedHotels,
  getLocalizedVisas,
  getLocalizedCosts,
  getLocalizedHajjFaqs,
  getFeaturedGrowthTopics,
} from "./data/bengaliContent";
import { WhatsAppSupport, TopBarWhatsApp } from "./components/WhatsAppSupport";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { KKdayPromoBanner } from "./components/KKdayPromoBanner";
import { PriceAlertModal } from "./components/PriceAlertModal";
import { SitemapPage } from "./components/SitemapPage";
import { ExperiencesPage } from "./components/ExperiencesPage";
import { UmrahLandingPage } from "./components/UmrahLandingPage";
import { AirHelpWidget } from "./components/AirHelpWidget";
const heroBgImage = new URL("./assets/images/clouds_boat_hero_1781438671378.jpg", import.meta.url).href;
const coxsBazarSunriseImg = new URL("./assets/images/coxs_bazar_sunrise_1781620718331.jpg", import.meta.url).href;
const nepalDestImg = new URL("./assets/images/nepal_destination_1781544132297.jpg", import.meta.url).href;
const bangkokDestImg = new URL("./assets/images/bangkok_destination_1781544149435.jpg", import.meta.url).href;
const klDestImg = new URL("./assets/images/kl_destination_1781544164707.jpg", import.meta.url).href;
const dubaiDestImg = new URL("./assets/images/dubai_destination_1781544180311.jpg", import.meta.url).href;
const singaporeDestImg = new URL("./assets/images/singapore_destination_1790387270177.jpg", import.meta.url).href;
const maldivesDestImg = new URL("./assets/images/maldives_destination_1790387286896.jpg", import.meta.url).href;
const blogHeroBannerImg = new URL("./assets/images/blog_editorial_hero_banner_1790429994056.jpg", import.meta.url).href;
const umrahMakkahImg = new URL("./assets/images/umrah_makkah_haram_guide_1790430007679.jpg", import.meta.url).href;
const passportCardDeskImg = new URL("./assets/images/passport_card_travel_desk_1790430035290.jpg", import.meta.url).href;

function getBlogCoverImage(slug: string): string {
  switch (slug) {
    case "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
    case "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      return umrahMakkahImg;
    case "dual-currency-card-endorsement-bangladesh":
    case "dhaka-airport-outbound-immigration-checklist-noc-go":
      return passportCardDeskImg;
    case "nepal-pokhara-itinerary-bangladesh":
    case "nepal-vs-thailand-first-trip":
      return nepalDestImg;
    case "halal-food-guide-bangkok-bangladesh":
      return bangkokDestImg;
    case "top-budget-family-destinations-from-dhaka":
      return klDestImg;
    case "hotel-savings-guide-bangkok-kl-dubai":
      return dubaiDestImg;
    case "singapore-visa-guide-bangladesh-agents":
      return singaporeDestImg;
    case "maldives-budget-trip-bangladesh-maafushi":
      return maldivesDestImg;
    case "cheap-flight-booking-hacks-dhaka":
    default:
      return heroBgImage;
  }
}

type SectionType = "home" | "flights" | "hotels" | "visa" | "destinations" | "experiences" | "umrah" | "costs" | "tools" | "blog" | "contact" | "sitemap";

function getCountryIata(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "KTM";
  if (c === "thailand") return "BKK";
  if (c === "malaysia") return "KUL";
  if (c === "uae") return "DXB";
  if (c === "singapore") return "SIN";
  if (c === "maldives") return "MLE";
  return "KTM";
}

function getCountryCityWithIata(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "Kathmandu (KTM)";
  if (c === "thailand") return "Bangkok (BKK)";
  if (c === "malaysia") return "Kuala Lumpur (KUL)";
  if (c === "uae") return "Dubai (DXB)";
  if (c === "singapore") return "Singapore (SIN)";
  if (c === "maldives") return "Malé (MLE)";
  return "Kathmandu (KTM)";
}

function getCountryCityName(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "Kathmandu";
  if (c === "thailand") return "Bangkok";
  if (c === "malaysia") return "Kuala Lumpur";
  if (c === "uae") return "Dubai";
  if (c === "singapore") return "Singapore";
  if (c === "maldives") return "Malé & Maafushi";
  return "Kathmandu";
}

function getCountryVisaId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "nepal-visa";
  if (c === "thailand") return "thailand-visa";
  if (c === "malaysia") return "malaysia-visa";
  if (c === "uae") return "dubai-visa";
  if (c === "singapore") return "singapore-visa";
  if (c === "maldives") return "maldives-visa";
  return "nepal-visa";
}

function getCountryHotelId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "kathmandu-hotels";
  if (c === "thailand") return "bangkok-hotels";
  if (c === "malaysia") return "kuala-lumpur-hotels";
  if (c === "uae") return "dubai-hotels";
  if (c === "singapore") return "singapore-hotels";
  if (c === "maldives") return "maldives-hotels";
  return "kathmandu-hotels";
}

function getCountryFlightId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "dhaka-kathmandu";
  if (c === "thailand") return "dhaka-bangkok";
  if (c === "malaysia") return "dhaka-kuala-lumpur";
  if (c === "uae") return "dhaka-dubai";
  if (c === "singapore") return "dhaka-singapore";
  if (c === "maldives") return "dhaka-maldives";
  return "dhaka-kathmandu";
}

function getCountryDestId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "nepal-guide";
  if (c === "thailand") return "thailand-guide";
  if (c === "malaysia") return "malaysia-guide";
  if (c === "uae") return "dubai-guide";
  if (c === "singapore") return "singapore-guide";
  if (c === "maldives") return "maldives-guide";
  return "nepal-guide";
}

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
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ural_lang");
      if (saved === "bn" || saved === "en") return saved;
    }
    return "en";
  });

  const handleLangToggle = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("ural_lang", newLang);
    }
  };

  const t = translations[lang];
  const isBn = lang === "bn";
  const localizedBlogs = getLocalizedBlogs(lang);
  const localizedFlights = getLocalizedFlights(lang);
  const localizedHotels = getLocalizedHotels(lang);
  const localizedVisas = getLocalizedVisas(lang);
  const localizedCosts = getLocalizedCosts(lang);
  const localizedHajjFaqs = getLocalizedHajjFaqs(lang);
  const featuredGrowthTopics = getFeaturedGrowthTopics(lang);
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [alertDestination, setAlertDestination] = useState("Bangkok (BKK)");

  const openPriceAlert = (dest?: string) => {
    if (dest) setAlertDestination(dest);
    setIsPriceAlertOpen(true);
  };

  const [heroHotelCity, setHeroHotelCity] = useState("kathmandu-hotels");
  const [heroVisaCountry, setHeroVisaCountry] = useState("nepal-visa");

  // Custom Interactive Home states
  const [currencyAmount, setCurrencyAmount] = useState<number>(10000);
  const [currencyToOption, setCurrencyToOption] = useState<"USD" | "NPR" | "THB" | "MYR" | "AED" | "SGD">("NPR");
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

  // Blog Directory Filtering & Search States
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("all");
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>("");

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
    } else if (pathname.startsWith("/experiences") || pathname.startsWith("/attractions")) {
      section = "experiences";
      isLanding = true;
    } else if (pathname.startsWith("/umrah") || pathname.startsWith("/hajj")) {
      section = "umrah";
      isLanding = true;
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
    } else if (pathname.startsWith("/sitemap")) {
      section = "sitemap";
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
    seoSchema = generateFAQSchema([
      {
        question: "How do I get a dual-currency card endorsement on a Bangladeshi passport?",
        answer:
          "Visit an authorized bank branch in Bangladesh with your original valid passport and NID to endorse up to USD $12,000 per calendar year under the Bangladesh Bank travel quota, then enable E-Commerce and 3D-Secure online transactions in your bank app before booking flights or hotels.",
      },
      {
        question: "What are the top budget-friendly family destinations from Dhaka?",
        answer:
          "Nepal (from BDT 42,000 per person with free Visa on Arrival), Malaysia (from BDT 68,000 with 4-day online e-Visa and universal Halal dining), Thailand, and the Maldives local islands (Maafushi and Hulhumalé) are the top budget-friendly family destinations from Dhaka.",
      },
      ...HAJJ_UMRAH_FAQS.slice(0, 2),
    ]);
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" }
    ];
  } else if (section === "flights") {
    const activeRoute = FLIGHTS_DATA.find(r => r.id === parameterId) || FLIGHTS_DATA[0];
    const year = new Date().getFullYear();
    
    if (isLanding) {
      seoTitle = `Flights from Dhaka: Compare Fares, Routes & Airlines (${year}) | URAL`;
      seoDescription = "Compare cheap international flights from Hazrat Shahjalal International Airport (DAC) to Nepal, Thailand, Malaysia, and Dubai. View flight duration, direct airlines, and BDT fares.";
      seoSchema = getFaqSchemaForPage("flights", undefined, true, "https://ural.travel/flights");
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Flight Guides", url: "https://ural.travel/flights" }
      ];
    } else {
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
      const faqSchema = getFaqSchemaForPage("flights", activeRoute.id, false, `https://ural.travel/flights?route=${activeRoute.id}`);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Flight Guides", url: "https://ural.travel/flights" },
        { name: `${activeRoute.from.split(" (")[0]} to ${activeRoute.to.split(" (")[0]} Flight`, url: `https://ural.travel/flights?route=${activeRoute.id}` }
      ];
    }

  } else if (section === "hotels") {
    const activeHotel = HOTELS_DATA.find(h => h.id === parameterId) || HOTELS_DATA[0];
    
    if (isLanding) {
      seoTitle = `International Hotel Guides for Bangladeshi Travelers (2026) | URAL`;
      seoDescription = "Find top-rated budget & family hotels in Kathmandu, Bangkok, Kuala Lumpur, and Dubai. Neighborhood safety, halal dining, and BDT payment guides.";
      seoSchema = getFaqSchemaForPage("hotels", undefined, true, "https://ural.travel/hotels");
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Hotel Neighborhoods", url: "https://ural.travel/hotels" }
      ];
    } else {
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
      const faqSchema = getFaqSchemaForPage("hotels", activeHotel.id, false, `https://ural.travel/hotels?city=${activeHotel.id}`);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Hotel Neighborhoods", url: "https://ural.travel/hotels" },
        { name: `${activeHotel.city} Hotels`, url: `https://ural.travel/hotels?city=${activeHotel.id}` }
      ];
    }

  } else if (section === "visa") {
    const activeVisa = VISA_DATA.find(v => v.id === parameterId) || VISA_DATA[0];
    
    if (isLanding) {
      seoTitle = `Visa Requirements for Bangladeshi Citizens 2026: Guides & Checklists | URAL`;
      seoDescription = "Check complete tourist visa guides for Bangladeshi citizens. Learn about free Visa on Arrival in Nepal, Thailand sticker visa rules, Malaysia eVisa, and Dubai visas.";
      seoSchema = getFaqSchemaForPage("visa", undefined, true, "https://ural.travel/visa");
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Visa Guides", url: "https://ural.travel/visa" }
      ];
    } else {
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
      const faqSchema = getFaqSchemaForPage("visa", activeVisa.id, false, `https://ural.travel/visa?country=${activeVisa.id}`);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Visa Guides", url: "https://ural.travel/visa" },
        { name: `${activeVisa.country} Visa`, url: `https://ural.travel/visa?country=${activeVisa.id}` }
      ];
    }

  } else if (section === "destinations") {
    const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];
    
    if (isLanding) {
      seoTitle = `Outbound Travel Plans & Itineraries from Bangladesh | URAL`;
      seoDescription = "Explore hand-crafted 5-day itineraries and travel plans for Bangladeshi tourists visiting Nepal, Thailand, Malaysia, and the UAE with BDT budgets.";
      seoSchema = getFaqSchemaForPage("destinations", undefined, true, "https://ural.travel/destinations");
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Destinations", url: "https://ural.travel/destinations" }
      ];
    } else {
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
      const faqSchema = getFaqSchemaForPage("destinations", activeDes.id, false, `https://ural.travel/destinations?country=${activeDes.id}`);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Destinations", url: "https://ural.travel/destinations" },
        { name: `${activeDes.country} Guide`, url: `https://ural.travel/destinations?country=${activeDes.id}` }
      ];
    }

  } else if (section === "costs") {
    const activeCost = TRIP_COSTS_DATA.find(c => c.id === parameterId) || TRIP_COSTS_DATA[0];
    
    if (isLanding) {
      seoTitle = `International Trip Budgets from Bangladesh: Realistic BDT Cost Guides | URAL`;
      seoDescription = "How much does an international trip really cost from Dhaka? Detailed BDT budgets for Nepal, Thailand, Malaysia, and Dubai covering flights, hotels, food & transport.";
      seoSchema = getFaqSchemaForPage("costs", undefined, true, "https://ural.travel/costs");
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Trip Costs", url: "https://ural.travel/costs" }
      ];
    } else {
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
      const faqSchema = getFaqSchemaForPage("costs", activeCost.id, false, `https://ural.travel/costs?country=${activeCost.id}`);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Trip Costs", url: "https://ural.travel/costs" },
        { name: `${activeCost.country} Costs`, url: `https://ural.travel/costs?country=${activeCost.id}` }
      ];
    }

  } else if (section === "tools") {
    seoTitle = "Bangladeshi Traveler Utility Tools & Services (2026) | URAL";
    seoDescription = "Access handy travel utility tools for Bangladeshi outbound tourists: live BDT exchange rates, power plug specifications, packing checklist, and translation aids.";
    seoSchema = getFaqSchemaForPage("tools", undefined, true, "https://ural.travel/tools");
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Travel Tools", url: "https://ural.travel/tools" }
    ];

  } else if (section === "blog") {
    const activePost = BLOG_DATA.find(p => p.slug === parameterId) || BLOG_DATA[0];
    if (isLanding) {
      seoTitle = "Travel Guides, Umrah Preparation & Outbound Intelligence for Bangladesh (2026) | URAL Blog";
      seoDescription = "Explore verified travel guides built for Bangladeshi travelers: DIY Umrah & Hajj preparation, dual-currency card endorsement, visa checklists, and family trip budgets in BDT.";
      seoSchema = generateFAQSchema(HAJJ_UMRAH_FAQS, {
        url: "https://ural.travel/blog",
        name: "URAL Travel Blog & Bangladeshi Outbound Guides",
      });
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Travel Blog", url: "https://ural.travel/blog" }
      ];
    } else {
      seoTitle = `${activePost.title} | URAL Travel Blog`;
      seoDescription = activePost.summary;
      seoSchema =
        activePost.slug === "umrah-hajj-guide-bangladesh-nusuk-bdt-cost" ||
        activePost.slug === "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh"
          ? generateFAQSchema(HAJJ_UMRAH_FAQS, {
              url: `https://ural.travel/blog?slug=${activePost.slug}`,
              name: activePost.title,
            })
          : generateFAQSchema([
              {
                question: activePost.title,
                answer: activePost.summary,
              },
              ...HAJJ_UMRAH_FAQS.slice(0, 2),
            ]);
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural.travel/" },
        { name: "Travel Blog", url: "https://ural.travel/blog" },
        { name: activePost.title, url: `https://ural.travel/blog?slug=${activePost.slug}` }
      ];
    }
  } else if (section === "contact") {
    seoTitle = "Contact URAL — Direct Phone & WhatsApp Support";
    seoDescription = "Connect directly with our flight & visa support desk at +8801784385335. Send us an inquiry for flight packages, visa assistance, and personalized outbound plans.";
    seoSchema = getFaqSchemaForPage("contact", undefined, true, "https://ural.travel/contact");
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Contact Us", url: "https://ural.travel/contact" }
    ];
  } else if (section === "experiences") {
    seoTitle = "Europe, UK, USA & Asian Attraction Passes (Tiqets & Klook Hub) | URAL";
    seoDescription = "Skip the line in Paris, London, Rome, Milan, Venice, and New York with official Tiqets passes, or book discounted Klook tours in Dubai, Bangkok, Singapore, and KL.";
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Attractions & Passes", url: "https://ural.travel/experiences" }
    ];
  } else if (section === "umrah") {
    seoTitle = "Umrah & Hajj Guide from Bangladesh 2026: BDT Cost Calculator, Nusuk & Flights | URAL";
    seoDescription = "Plan your DIY Umrah from Dhaka and save BDT 35,000+ per pilgrim, or book flights, Makkah/Madinah hotels, and e-Visas in BDT via our Dhaka WhatsApp desk.";
    seoSchema = generateFAQSchema(HAJJ_UMRAH_FAQS, {
      url: "https://ural.travel/umrah",
      name: "Umrah & Hajj Planning Hub from Bangladesh (2026)",
    });
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Umrah & Hajj Hub", url: "https://ural.travel/umrah" }
    ];
  } else if (section === "sitemap") {
    seoTitle = "Dynamic XML Sitemap & Complete Travel Route Index | URAL";
    seoDescription = "Browse the complete index of URAL outbound travel guides from Bangladesh: Dhaka flight routes, visa checklists, hotel neighborhoods, and BDT trip budgets.";
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural.travel/" },
      { name: "Sitemap & Route Index", url: "https://ural.travel/sitemap" }
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
            <span className="truncate font-sans font-medium">{t.topStripTagline}</span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-sans text-[11px] font-medium">
              <TopBarWhatsApp lang={lang} />
              <span className="w-px h-3 bg-white/20"></span>
              <LanguageSwitcher lang={lang} onToggle={handleLangToggle} />
            </div>
          </div>
        </div>

        {/* 🟦 1. MAIN NAVBAR (Height: 64px, Background: #0F172A) */}
        <header id="main-navbar-sticky" className="w-full bg-[#0F172A] text-white border-b border-white/8 h-16 flex items-center">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
            
            {/* Logo Left */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo("/")}>
              <div className="bg-gradient-to-br from-[#F6B73C] to-[#E2A123] text-[#0F172A] p-2 rounded-xl shrink-0 shadow-lg shadow-[#F6B73C]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  {/* Minimalist Flying Bird outline */}
                  <path d="M12 18.5c-.5-3-4-7-9-7.5 5-1 8-4.5 9-7.5 1 3 4 6.5 9 7.5-5 .5-8.5 4.5-9 7.5z" />
                </svg>
              </div>
              <span className="font-sans font-extrabold text-[21px] text-white tracking-wider leading-none">
                URAL
              </span>
            </div>

            {/* Navigation Centered — Senior Mega Menu Architecture */}
            <nav className="hidden md:flex items-center gap-6">
              {/* 1. Home */}
              <button
                type="button"
                id="nav-home"
                onClick={() => navigateTo("/")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "home" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navHome}
              </button>

              {/* 2. Flights */}
              <button
                type="button"
                id="nav-flights"
                onClick={() => navigateTo("/flights")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "flights" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navFlights}
              </button>

              {/* 3. Hotels */}
              <button
                type="button"
                id="nav-hotels"
                onClick={() => navigateTo("/hotels")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "hotels" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navHotels}
              </button>

              {/* 4. MEGA MENU 1: DESTINATIONS & GLOBAL ATTRACTIONS (Europe/UK/USA vs. Asia) */}
              <div className="relative group">
                <button
                  type="button"
                  id="nav-destinations-megamenu"
                  onClick={() => navigateTo("/destinations")}
                  className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap flex items-center gap-1 py-2 ${
                    section === "destinations" || section === "experiences"
                      ? "text-[#F6B73C] font-semibold"
                      : "text-white/75"
                  }`}
                >
                  <span>{isBn ? "গন্তব্য ও আকর্ষণ" : "Destinations & Passes"}</span>
                  <span className="text-[10px] opacity-75">▾</span>
                </button>

                {/* 3-Column Mega Menu Dropdown Panel */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[780px] lg:w-[860px] z-50">
                  <div className="bg-[#0F172A] border border-white/15 rounded-3xl shadow-2xl p-6 grid grid-cols-12 gap-6 text-left">
                    {/* Column 1: Asia & Middle East Pillars (4 Cols) */}
                    <div className="col-span-4 space-y-3 border-r border-white/10 pr-5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block">
                          {isBn ? "এশিয়া ও মধ্যপ্রাচ্য গাইড" : "Asia & Middle East Pillars"}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {isBn ? "ভিসা + ফ্লাইট + BDT বাজেট গাইড" : "Full Visa, Flight & Hotel Guides"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {[
                          {
                            label: isBn ? "🇳🇵 নেপাল (কাঠমান্ডু ও পোখরা)" : "🇳🇵 Nepal (Kathmandu & Pokhara)",
                            sub: isBn ? "ফ্রি SAARC অন-অ্যারাইভাল ভিসা" : "Free SAARC VOA · From BDT 40k",
                            path: "/destinations?country=nepal-guide",
                          },
                          {
                            label: isBn ? "🇹🇭 থাইল্যান্ড (ব্যাংকক ও ফুকেট)" : "🇹🇭 Thailand (Bangkok & Phuket)",
                            sub: isBn ? "শপিং, হালাল ফুড ও আইল্যান্ড" : "Halal dining, shopping & islands",
                            path: "/destinations?country=thailand-guide",
                          },
                          {
                            label: isBn ? "🇲🇾 মালয়েশিয়া (কুয়ালালামপুর)" : "🇲🇾 Malaysia (KL & Genting)",
                            sub: isBn ? "ই-ভিসা ও ফ্যামিলি হাব" : "Fast e-Visa · Family favorite",
                            path: "/destinations?country=malaysia-guide",
                          },
                          {
                            label: isBn ? "🇸🇬 সিঙ্গাপুর (মেরিনা বে ও সেন্টোসা)" : "🇸🇬 Singapore (Sentosa & Bugis)",
                            sub: isBn ? "MRT গাইড ও থিম পার্ক" : "SimplyGo MRT & Universal Studios",
                            path: "/destinations?country=singapore-guide",
                          },
                          {
                            label: isBn ? "🇲🇻 মালদ্বীপ (মাফুশি ও রিসোর্ট)" : "🇲🇻 Maldives (Maafushi & Resorts)",
                            sub: isBn ? "ফ্রি ভিসা · বাজেট ও ওয়াটার ভিলা" : "Free VOA · Local island & resorts",
                            path: "/destinations?country=maldives-guide",
                          },
                          {
                            label: isBn ? "🇦🇪 দুবাই ও আবুধাবি (UAE)" : "🇦🇪 Dubai & Abu Dhabi (UAE)",
                            sub: isBn ? "ডেজার্ট সাফারি ও বুর্জ খলিফা" : "Desert Safari, Deira & Downtown",
                            path: "/destinations?country=uae-guide",
                          },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => navigateTo(item.path)}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                          >
                            <div className="text-xs font-semibold text-white">{item.label}</div>
                            <div className="text-[11px] text-slate-400">{item.sub}</div>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo("/destinations")}
                        className="w-full text-left px-3 pt-1 text-xs font-semibold text-[#F6B73C] hover:underline cursor-pointer"
                      >
                        {isBn ? "সবগুলো এশিয়ান গন্তব্য দেখুন →" : "View All Asian Destination Guides →"}
                      </button>
                    </div>

                    {/* Column 2: Europe, UK & USA Hubs — Tiqets Official (4 Cols) */}
                    <div className="col-span-4 space-y-3 border-r border-white/10 pr-5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block">
                          {isBn ? "ইউরোপ, যুক্তরাজ্য ও আমেরিকা (Tiqets)" : "Europe, UK & USA (Tiqets)"}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {isBn ? "স্কিপ-দ্য-লাইন মিউজিয়াম ও পাস" : "Skip-the-Line Passes & Bundles"}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {[
                          {
                            label: isBn ? "🇫🇷 প্যারিস, ফ্রান্স (Paris)" : "🇫🇷 Paris, France (Schengen)",
                            sub: isBn ? "লুভর, আইফেল টাওয়ার ও সেইন ক্রুজ" : "Louvre, Eiffel Tower & Seine Cruise",
                            path: "/experiences?region=west&city=paris",
                          },
                          {
                            label: isBn ? "🇬🇧 লন্ডন, যুক্তরাজ্য (London)" : "🇬🇧 London, United Kingdom",
                            sub: isBn ? "লন্ডন আই, টাওয়ার অব লন্ডন ও টেমস" : "Tower of London, Thames & London Eye",
                            path: "/experiences?region=west&city=london",
                          },
                          {
                            label: isBn ? "🇮🇹 রোম, মিলান ও ভেনিস (Italy)" : "🇮🇹 Rome, Milan & Venice (Italy)",
                            sub: isBn ? "কলোসিয়াম, দুওমো ও ভেনিস গন্ডোলা" : "Colosseum, Milan Duomo & Gondola",
                            path: "/experiences?region=west&city=rome-italy",
                          },
                          {
                            label: isBn ? "🇺🇸 নিউ ইয়র্ক সিটি (USA)" : "🇺🇸 New York City (USA)",
                            sub: isBn ? "স্ট্যাচু অব লিবার্টি ও SUMMIT ডেক" : "Statue of Liberty, Harbor & SUMMIT",
                            path: "/experiences?region=west&city=new-york",
                          },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => navigateTo(item.path)}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                          >
                            <div className="text-xs font-semibold text-white">{item.label}</div>
                            <div className="text-[11px] text-slate-400">{item.sub}</div>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo("/experiences?region=west")}
                        className="w-full text-left px-3 pt-1 text-xs font-semibold text-[#F6B73C] hover:underline cursor-pointer"
                      >
                        {isBn
                          ? "ইউরোপ, UK ও USA-এর সব পাস দেখুন →"
                          : "Browse Europe, UK & USA Hub →"}
                      </button>
                    </div>

                    {/* Column 3: Asia Attractions (Klook) + Dedicated Umrah Spotlight (4 Cols) */}
                    <div className="col-span-4 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                            {isBn ? "এশিয়া ও দুবাই ডে-পাস (Klook)" : "Asia & Dubai Passes (Klook)"}
                          </span>
                          <span className="text-xs text-slate-400 block">
                            {isBn
                              ? "বাংলাদেশিদের শীর্ষ বুকিংকৃত আকর্ষণ"
                              : "Top Residency Experiences in BDT"}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {[
                            {
                              label: isBn ? "🇦🇪 দুবাই সাফারি ও বুর্জ খলিফা" : "🇦🇪 Dubai Safari & Burj Khalifa",
                              sub: isBn ? "মিউজিয়াম অব দ্য ফিউচার ও ডিনার ক্রুজ" : "Museum of the Future + Red Dunes",
                              path: "/experiences?region=asia&city=dubai-klook",
                            },
                            {
                              label: isBn ? "🇹🇭 ব্যাংকক সাফারি ওয়ার্ল্ড ও ক্রুজ" : "🇹🇭 Bangkok Safari World & Cruise",
                              sub: isBn ? "হালাল চাও ফ্রায়া ডিনার ও স্কাইওয়াক" : "Halal Chao Phraya Cruise & SkyWalk",
                              path: "/experiences?region=asia&city=bangkok-klook",
                            },
                            {
                              label: isBn ? "🇸🇬 সিঙ্গাপুর ও গেন্টিং হাইল্যান্ডস" : "🇸🇬 Universal Studios & Genting",
                              sub: isBn ? "গার্ডেন্স বাই দ্য বে ও কেবল কার" : "Gardens by the Bay & Awana SkyWay",
                              path: "/experiences?region=asia&city=singapore-kl",
                            },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => navigateTo(item.path)}
                              className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                            >
                              <div className="text-xs font-semibold text-white">{item.label}</div>
                              <div className="text-[11px] text-slate-400">{item.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Featured Callout Card inside Mega Menu */}
                      <div className="bg-white/6 border border-white/12 rounded-2xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyan-300 font-bold">
                            {isBn ? "🔥 KKday ৯.৯ সেল (৩০% ছাড়)" : "🔥 KKday 9.9 SEA Sale (30% OFF)"}
                          </span>
                          <span className="text-amber-300 font-semibold">+$100 Giveaway</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isBn
                            ? "থাইল্যান্ড, মালয়েশিয়া ও সিঙ্গাপুরে ৩০% প্রোমো কোড + Buy 1 Get 1 ডিল (ভ্রমণ: ৩১ ডিসেম্বর ২০২৬ পর্যন্ত)।"
                            : "30% OFF + Buy 1 Get 1 on Thailand, Malaysia & Singapore passes (travel until Dec 31, 2026)."}
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <button
                            type="button"
                            onClick={() => navigateTo("/experiences")}
                            className="bg-[#F6B73C] hover:bg-[#ffc654] text-[#0F172A] font-bold text-[11px] py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
                          >
                            {isBn ? "অ্যাক্টিভিটি হাব →" : "All Passes →"}
                          </button>
                          <a
                            href={AFFILIATE_LINKS.kkday}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-[11px] py-2 px-2.5 rounded-xl transition-colors text-center"
                          >
                            {isBn ? "KKday ৩০% ডিল ↗" : "KKday 30% Sale ↗"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Visa Checklists */}
              <button
                type="button"
                id="nav-visa"
                onClick={() => navigateTo("/visa")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "visa" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navVisa}
              </button>

              {/* 6. Dedicated Umrah & Hajj Landing Page */}
              <button
                type="button"
                id="nav-umrah"
                onClick={() => navigateTo("/umrah")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-semibold hover:text-[#F6B73C] whitespace-nowrap flex items-center gap-1.5 py-2 ${
                  section === "umrah" ? "text-[#F6B73C]" : "text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" aria-hidden="true" />
                <span>{t.navUmrah}</span>
              </button>

              {/* 7. MEGA MENU 2: TRAVEL TOOLS, BUDGETS & EDITORIAL GUIDES */}
              <div className="relative group">
                <button
                  type="button"
                  id="nav-tools-megamenu"
                  className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] flex items-center gap-1 py-2 whitespace-nowrap ${
                    ["costs", "tools", "blog", "contact", "sitemap"].includes(section)
                      ? "text-[#F6B73C] font-semibold"
                      : "text-white/75"
                  }`}
                >
                  <span>{isBn ? "টুলস ও গাইড" : "Tools & Guides"}</span>
                  <span className="text-[10px] opacity-75">▾</span>
                </button>

                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute right-0 top-full pt-2 w-[560px] z-50">
                  <div className="bg-[#0F172A] border border-white/15 rounded-3xl shadow-2xl p-5 grid grid-cols-2 gap-5 text-left">
                    {/* Left Column: Interactive Tools & Flight Compensation */}
                    <div className="space-y-2.5 border-r border-white/10 pr-4">
                      <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block">
                        {isBn ? "ইন্টারেক্টিভ টুলস ও ক্যালকুলেটর" : "Interactive Calculators & Claims"}
                      </span>

                      {[
                        {
                          id: "costs",
                          label: isBn ? "📊 দেশভিত্তিক বাজেট শিট (BDT)" : "📊 Trip Cost & Budget Matrices",
                          sub: isBn ? "৩-স্তরের পূর্ণাঙ্গ খরচের হিসাব" : "3-tier BDT budgets for 6 countries",
                          path: "/costs",
                        },
                        {
                          id: "tools",
                          label: isBn ? "🧮 কারেন্সি কনভার্টার ও চেকলিস্ট" : "🧮 Currency, Packing & Visa Odds",
                          sub: isBn ? "লাইভ BDT রেট ও প্যাকিং লিস্ট" : "Live BDT FX converter & trip tools",
                          path: "/tools",
                        },
                        {
                          id: "airhelp",
                          label: isBn ? "🛡️ ফ্লাইট বিলম্ব ক্ষতিপূরণ (€600)" : "🛡️ Flight Delay Claim (€600 / AirHelp)",
                          sub: isBn ? "প্রোমো কোড AHTPO11 (১১% ছাড়)" : "Up to BDT 78k payout + Code AHTPO11",
                          path: "/tools?tab=airhelp",
                        },
                        {
                          id: "contact",
                          label: isBn ? "💬 BDT বুকিং ও সাপোর্ট ডেস্ক" : "💬 Contact & BDT Booking Desk",
                          sub: isBn ? "WhatsApp: +8801784385335" : "Pay in BDT via bank / bKash",
                          path: "/contact",
                        },
                      ].map((toolItem) => (
                        <button
                          key={toolItem.id}
                          type="button"
                          onClick={() => navigateTo(toolItem.path)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                        >
                          <div className="text-xs font-semibold text-white">{toolItem.label}</div>
                          <div className="text-[11px] text-slate-400">{toolItem.sub}</div>
                        </button>
                      ))}
                    </div>

                    {/* Right Column: Editorial Guides, Blog & Sitemap */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                        {isBn ? "জনপ্রিয় ট্রাভেল গাইড ও ব্লগ" : "High-Demand Bangladeshi Guides"}
                      </span>

                      {[
                        {
                          label: isBn
                            ? "💳 Dual-Currency Card এন্ডোর্সমেন্ট"
                            : "💳 Dual-Currency Card Endorsement",
                          sub: isBn
                            ? "$12,000 বার্ষিক কোটা ও ব্যাংক গাইড"
                            : "2026 passport dollar stamp rules",
                          path: "/blog?slug=dual-currency-card-endorsement-bangladesh",
                        },
                        {
                          label: isBn
                            ? "🕋 ওমরাহ Nusuk ও ই-ভিসা গাইড"
                            : "🕋 Umrah Nusuk & e-Visa Playbook",
                          sub: isBn
                            ? "Saudi Visa Bio ও বুলেট ট্রেন নিয়ম"
                            : "Step-by-step DIY Umrah tutorial",
                          path: "/blog?slug=umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
                        },
                        {
                          label: isBn
                            ? "🛂 ঢাকা এয়ারপোর্ট ইমিগ্রেশন চেকলিস্ট"
                            : "🛂 Dhaka Airport Immigration & NOC",
                          sub: isBn
                            ? "প্রথমবার বিদেশ যাত্রার কাগজপত্র"
                            : "First-time flyer document checklist",
                          path: "/blog?slug=dhaka-airport-outbound-immigration-checklist-noc-go",
                        },
                        {
                          label: isBn
                            ? "📖 সবগুলো ট্রাভেল ব্লগ দেখুন (12)"
                            : "📖 All 12 Travel Guides & Articles",
                          sub: isBn ? "সম্পূর্ণ এডিটোরিয়াল ইনডেক্স" : "Browse full editorial library",
                          path: "/blog",
                        },
                        {
                          label: isBn
                            ? "🗺️ সাইটম্যাপ (HTML ও XML Sitemap)"
                            : "🗺️ Complete Route Index & Sitemap",
                          sub: isBn ? "সবগুলো পেজের ডিরেক্টরি" : "All routes, tools & guides",
                          path: "/sitemap",
                        },
                      ].map((guideItem, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => navigateTo(guideItem.path)}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                        >
                          <div className="text-xs font-semibold text-white">{guideItem.label}</div>
                          <div className="text-[11px] text-slate-400">{guideItem.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Start Trip CTA Right */}
            <div className="flex items-center gap-4">
              <button
                id="btn-start-trip-cta"
                onClick={() => navigateTo("/destinations")}
                className="hidden md:block bg-[#F6B73C] text-[#0F172A] hover:bg-[#D4941A] font-bold text-sm rounded-full px-5 py-2 shadow-md transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.startTripCta}
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
                      <svg className="w-4.5 h-4.5 text-[#0F172A]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 18.5c-.5-3-4-7-9-7.5 5-1 8-4.5 9-7.5 1 3 4 6.5 9 7.5-5 .5-8.5 4.5-9 7.5z" />
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
                    { id: "home", label: t.navHome, path: "/" },
                    { id: "flights", label: t.navFlights, path: "/flights" },
                    { id: "hotels", label: t.navHotels, path: "/hotels" },
                    { id: "visa", label: t.navVisa, path: "/visa" },
                    { id: "destinations", label: t.navDestinations, path: "/destinations" },
                    { id: "experiences", label: `${t.navExperiences} (Tiqets & Klook)`, path: "/experiences" },
                    { id: "umrah", label: `${t.navUmrah} (2026 Hub)`, path: "/umrah" },
                    { id: "costs", label: t.navCosts, path: "/costs" },
                    { id: "tools", label: `${t.navTools} & AirHelp`, path: "/tools" },
                    { id: "blog", label: t.navBlog, path: "/blog" },
                    { id: "contact", label: t.navContact, path: "/contact" }
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
                <div className="p-6 border-t border-white/8 bg-[#0B1628] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60 font-medium">Language / ভাষা:</span>
                    <LanguageSwitcher lang={lang} onToggle={handleLangToggle} />
                  </div>
                  <a
                    href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition-colors"
                  >
                    <span>💬 WhatsApp: 01784385335</span>
                  </a>
                  <button
                    onClick={() => {
                      navigateTo("/destinations");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#F6B73C] text-[#0F172A] hover:bg-[#D4941A] font-bold text-xs uppercase py-3 rounded-full shadow-md text-center tracking-wider transition-colors"
                  >
                    {t.startTripCta}
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
                {isBn
                  ? "⭐️ বাংলাদেশের #১ ট্রাভেল ইন্টেলিজেন্স প্ল্যাটফর্ম"
                  : "⭐️ Bangladesh's #1 Travel Intelligence Platform"}
              </span>
              
              <h1 className="hero-h1 font-sans text-[clamp(2.3rem,6vw,4.5rem)] font-[900] leading-[1.1] tracking-tight text-white max-w-4xl drop-shadow text-center sm:text-left">
                {isBn ? (
                  <>
                    বাংলাদেশ থেকে স্মার্টভাবে <br />
                    <span className="text-[#F6B73C]">বিশ্ব ভ্রমণ ও Umrah প্ল্যান করুন</span>
                  </>
                ) : (
                  <>
                    Travel Smarter <br />
                    <span className="text-[#F6B73C]">From Bangladesh</span>
                  </>
                )}
              </h1>
              
              <p className="hero-subtitle text-white/80 text-[1.1rem] sm:text-[1.2rem] leading-[1.60] max-w-2xl font-sans text-center sm:text-left">
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য তৈরি Flight, Hotel, Visa চেকলিস্ট, Hajj ও Umrah প্রস্তুতি এবং BDT বাজেট গাইড—সবকিছু এক জায়গায়।"
                  : "Flights, hotels, visas, and destination guides — crafted specifically for Bangladeshi travelers. Your travel intelligence for the world."}
              </p>

              {/* Pill List of Expert Features */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "যাচাইকৃত Visa ও Umrah গাইড" : "Expert Visa Guides"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "BDT বাজেট হিসাব" : "BDT Pricing"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "Halal খাবার ও হোটেল জোন" : "Halal-Friendly Picks"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "Dhaka (DAC) ফ্লাইট রুট" : "Dhaka Routes Focus"}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Bar Container (Full Width) */}
          <div id="hero-stats-bar" className="stats-bar bg-[#0F172A] py-7 px-4 shadow-lg border-t border-b border-[#F6B73C]/20">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4 md:divide-x md:divide-white/10 text-center select-none">
              <div className="flex-1 w-full space-y-1">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">50+</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "ট্রাভেল ও Umrah গাইড" : "Travel Guides"}
                </div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">15+</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "জনপ্রিয় গন্তব্য" : "Destinations Covered"}
                </div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">100%</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "বাংলাদেশি পাসপোর্ট ফোকাস" : "BD Traveler Focus"}
                </div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">Free</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "ফ্রি ট্রাভেল ইন্টেলিজেন্স" : "Travel Intelligence"}
                </div>
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
                  {t.searchSectionBadge}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {t.searchSectionTitle}
                </h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  {t.searchSectionSubtitle}
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-2 sm:p-5 shadow-2xl w-full">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-wider">{t.liveSearchBoxHeader}</span>
                  <button
                    type="button"
                    onClick={() => openPriceAlert("Bangkok (BKK)")}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200 bg-[#25D366]/15 hover:bg-[#25D366]/25 px-2.5 py-1 rounded-md border border-[#25D366]/30 font-medium transition-colors cursor-pointer"
                  >
                    <span>🔔</span>
                    <span className="hidden sm:inline">{t.setPriceAlertBtn}</span>
                    <span className="sm:hidden">Price Alert</span>
                  </button>
                </div>
                <div className="text-slate-900">
                  <TravelpayoutsWidget />
                </div>
              </div>

              {/* Price Alert Promotion Banner */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:px-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#D4941A] flex items-center justify-center font-bold text-sm shrink-0 border border-amber-200">
                    🔔
                  </div>
                  <div className="text-xs text-slate-650 leading-snug">
                    <span className="font-bold text-slate-900 block sm:inline mr-1">
                      {lang === "bn" ? "ভাড়া কমার নোটিফিকেশন:" : "Looking for lowest fare?"}
                    </span>
                    <span>{t.priceAlertBanner}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openPriceAlert()}
                  className="shrink-0 w-full sm:w-auto bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  {t.setPriceAlertBtn}
                </button>
              </div>
            </div>

            {/* 🟦 SECTION 2: QUICK DESTINATION ENTRY */}
            <div id="destinations-section" className="scroll-mt-12 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-[#0F172A] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">{t.destinationsBadge}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.destinationsTitle}</h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">{t.destinationsSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    city: "Kathmandu",
                    country: "Nepal",
                    tag: isBn
                      ? "বাংলাদেশিদের জন্য ফ্রি Visa on Arrival। Thamel-এ BDT 1,500/রাত থেকে হোটেল। প্রথম বিদেশ ভ্রমণের জন্য সেরা।"
                      : "Free visa on arrival for Bangladeshis. Budget hotels in Thamel from BDT 1,500/night. A great first international trip.",
                    code: "nepal-guide",
                    img: "🇳🇵",
                    path: "/destinations?country=nepal-guide",
                    bgImg: nepalDestImg,
                    alt: "Kathmandu skyline view — Nepal travel guide for Bangladeshi tourists",
                  },
                  {
                    city: "Bangkok",
                    country: "Thailand",
                    tag: isBn
                      ? "অনলাইন Thailand e-Visa (৫–১০ দিনে অনুমোদন)। হালাল স্ট্রিট ফুড, Pratunam শপিং, দ্বীপ ও মেডিকেল চেকআপ।"
                      : "Online e-Visa — approved in 5–10 days. Street food, Pratunam shopping, islands, and golden temples.",
                    code: "thailand-guide",
                    img: "🇹🇭",
                    path: "/destinations?country=thailand-guide",
                    bgImg: bangkokDestImg,
                    alt: "Bangkok temple and city view — Thailand travel guide for Bangladeshi tourists",
                  },
                  {
                    city: "Kuala Lumpur",
                    country: "Malaysia",
                    tag: isBn
                      ? "সহজ অনলাইন Malaysia e-Visa। সাশ্রয়ী KLCC অ্যাপার্টমেন্ট, ১০০% Halal খাবার এবং উন্নত মেট্রো যাতায়াত।"
                      : "Simple online eVisa. Affordable KLCC suites, 100% halal dining, and easy transit across Kuala Lumpur.",
                    code: "malaysia-guide",
                    img: "🇲🇾",
                    path: "/destinations?country=malaysia-guide",
                    bgImg: klDestImg,
                    alt: "Kuala Lumpur Petronas Twin Towers — Malaysia travel guide for Bangladeshi tourists",
                  },
                  {
                    city: "Singapore",
                    country: "Singapore",
                    tag: isBn
                      ? "ঢাকা থেকে ৪ ঘণ্টা ১৫ মিনিটের ডিরেক্ট ফ্লাইট। Marina Bay, Sentosa, Gardens by the Bay ও ২৪ ঘণ্টা Mustafa শপিং।"
                      : "4h 15m direct from Dhaka. Marina Bay, Sentosa, Gardens by the Bay, and 24-hour Mustafa shopping in Little India.",
                    code: "singapore-guide",
                    img: "🇸🇬",
                    path: "/destinations?country=singapore-guide",
                    bgImg: singaporeDestImg,
                    alt: "Singapore Marina Bay and Gardens by the Bay — Singapore travel guide for Bangladeshi tourists",
                  },
                  {
                    city: "Malé & Maafushi",
                    country: "Maldives",
                    tag: isBn
                      ? "৩০ দিনের ফ্রি Visa on Arrival! Maafushi লোকাল আইল্যান্ডে BDT 6,500/রাত থেকে হোটেল এবং $30 স্নরকেলিং ট্যুর।"
                      : "Free 30-day Visa on Arrival! Stay on Maafushi local island from BDT 6,500/night with $30 coral & sandbank tours.",
                    code: "maldives-guide",
                    img: "🇲🇻",
                    path: "/destinations?country=maldives-guide",
                    bgImg: maldivesDestImg,
                    alt: "Maldives turquoise lagoon and white sandbank — Maldives travel guide for Bangladeshi tourists",
                  },
                  {
                    city: "Dubai",
                    country: "UAE",
                    tag: isBn
                      ? "৩–৫ দিনে UAE e-Visa। Burj Khalifa, Desert Safari ও শপিং — ঢাকা থেকে ৪ ঘণ্টা ৪৫ মিনিটের সরাসরি ফ্লাইট।"
                      : "eVisa in 3–5 days. Burj Khalifa, desert safari, duty-free shopping — 4h 45m direct from Dhaka.",
                    code: "dubai-guide",
                    img: "🇦🇪",
                    path: "/destinations?country=dubai-guide",
                    bgImg: dubaiDestImg,
                    alt: "Dubai Burj Khalifa skyline view — UAE travel guide for Bangladeshi tourists",
                  },
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
                          {isBn ? "ট্রিপ প্ল্যান দেখুন" : "Plan This Trip"}{" "}
                          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
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
                  {isBn ? "🎯 ঢাকা থেকে আপনার পরবর্তী সফর সাজান" : "🎯 Plan your next trip from Dhaka"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3.5xl font-black text-[#102A43] tracking-tight">
                  {isBn ? "বুকিং করার আগে যা যা জানা প্রয়োজন" : "Everything You Need Before You Book"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isBn
                    ? "কোথা থেকে শুরু করবেন ভাবছেন? প্রথমে ফ্লাইটের ভাড়া যাচাই করুন, এরপর পছন্দের এলাকায় হোটেল তুলনা করুন এবং আমাদের ভিসা গাইড দেখে প্রয়োজনীয় ডকুমেন্টগুলো গুছিয়ে নিন।"
                    : "Not sure where to start? Check flight prices first, then compare hotels in the area you want to stay, and use our visa guide to know exactly what documents to prepare. No travel agent needed."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <button 
                  onClick={() => navigateTo("/flights")}
                  className="bg-[#102A43] text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "সাশ্রয়ী Flight খুঁজুন →" : "Find Cheap Flights →"}
                </button>
                <button 
                  onClick={() => navigateTo("/hotels")}
                  className="bg-[#102A43] text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "বাজেট Hotel খুঁজুন →" : "Search Budget Hotels →"}
                </button>
                <button 
                  onClick={() => navigateTo("/blog")}
                  className="bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "সব ট্রাভেল ব্লগ পড়ুন →" : "Browse Travel Guides →"}
                </button>
              </div>
            </div>

            {/* 🟦 SECTION 4: HOTEL SEARCH ENTRY */}
            <div className="relative rounded-3xl overflow-hidden bg-[#102A43] text-white p-8 md:p-12 shadow-xl border border-slate-800">
              
              <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
                <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/20 px-3 py-1 rounded-full">
                  {isBn ? "🏨 আপনার সফরের জন্য সঠিক হোটেল খুঁজুন" : "🏨 Find the right hotel for your trip"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                  {isBn
                    ? "Kathmandu, Bangkok, Kuala Lumpur ও Dubai-এর হোটেল ভাড়া তুলনা করুন"
                    : "Compare Hotels in Kathmandu, Bangkok, KL & Dubai"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                  {isBn
                    ? "শহর ও তারিখ দিয়ে আসল ভাড়া দেখুন। Thamel-এর বাজেট রুম কিংবা Pratunam-এর ফ্যামিলি স্যুট—সব অপশন তুলনা করে সরাসরি বুক করুন।"
                    : "Search by city and date to see real prices. Budget room in Thamel or a family suite in Pratunam — compare options and book directly."}
                </p>
              </div>

              {/* HOTEL WIDGET INTEGRATION: Visually distinct & secondary to flights widget */}
              <div className="w-full text-slate-900 bg-white rounded-2xl p-2 sm:p-4 shadow-xl">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-3 px-2">
                  {isBn ? "🏨 হোটেল সার্চ (Search Hotels)" : "🏨 Search Hotels"}
                </span>
                <TravelpayoutsCustomWidget initialTab="hotels" />
              </div>

              {/* Quick links to pre-filled hotel lookups */}
              <div className="text-center text-xs font-mono text-slate-400 mt-6 flex flex-wrap justify-center items-center gap-2">
                <span>{isBn ? "জনপ্রিয় ফ্যামিলি হোটেল জোন:" : "Top family-rated lodging selectors:"}</span>
                <button onClick={() => navigateTo("/hotels?city=kathmandu-hotels")} className="text-[#F6B73C] hover:underline">Thamel, Kathmandu 🇳🇵</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=bangkok-hotels")} className="text-[#F6B73C] hover:underline">Pratunam, Bangkok 🇹🇭</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=kuala-lumpur-hotels")} className="text-[#F6B73C] hover:underline">Bukit Bintang, KL 🇲🇾</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=singapore-hotels")} className="text-[#F6B73C] hover:underline">Little India, Singapore 🇸🇬</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=maldives-hotels")} className="text-[#F6B73C] hover:underline">Maafushi, Maldives 🇲🇻</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels?city=dubai-hotels")} className="text-[#F6B73C] hover:underline">Deira, Dubai 🇦🇪</button>
              </div>
            </div>

            {/* 🟦 SECTION 4.25: UNIFIED TABBED TRAVEL ESSENTIALS HUB */}
            <TravelEssentials country="Thailand, Malaysia, Singapore, Maldives, Nepal & UAE" lang={lang} />

            {/* 🟦 INTERACTIVE TOOLS DESK PANEL (Aesthetic calculation tools) */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
              <div className="border-l-4 border-[#102A43] pl-4">
                <h3 className="font-serif text-xl font-bold text-[#102A43]">
                  {isBn ? "প্রয়োজনীয় ট্রাভেল টুলস (Handy Travel Tools)" : "Handy Travel Tools"}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {isBn
                    ? "বাংলাদেশি টাকা (BDT) কনভার্ট করুন, প্যাকিং চেকলিস্ট মিলিয়ে নিন এবং ট্রিপের মোট বাজেট হিসাব করুন।"
                    : "Quick tools to help you convert BDT, check what to pack, and estimate your trip budget."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Currency Converter (Interactive) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block mb-2">
                      {isBn ? "💸 কারেন্সি কনভার্টার (BDT রেট)" : "💸 Currency Converter"}
                    </span>
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
                          <option value="SGD">SGD (Singapore Dollar)</option>
                          <option value="USD">USD (Maldives / Global)</option>
                          <option value="AED">AED (UAE Dirham)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-mono font-bold text-center bg-slate-50 py-1.5 rounded text-indigo-900">
                    ৳ {currencyAmount.toLocaleString()} BDT = &nbsp;
                    <span className="text-[#F6B73C]">
                      {currencyToOption === "NPR" ? (currencyAmount * 1.13).toFixed(2) :
                       currencyToOption === "THB" ? (currencyAmount * 0.30).toFixed(2) : 
                       currencyToOption === "MYR" ? (currencyAmount * 0.037).toFixed(2) :
                       currencyToOption === "SGD" ? (currencyAmount * 0.011).toFixed(2) :
                       currencyToOption === "USD" ? (currencyAmount * 0.0082).toFixed(2) :
                       (currencyAmount * 0.031).toFixed(2)} {currencyToOption}
                    </span>
                  </div>
                </div>

                {/* 2. Packing Checklist (Interactive checkboxes) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block mb-1">
                      {isBn ? "🧳 ডকুমেন্ট ও প্যাকিং চেকলিস্ট" : "🧳 Packing Checklist"}
                    </span>
                    <p className="text-[10px] text-slate-400 mb-2">
                      {isBn ? "ফ্লাইটের আগে জরুরি ডকুমেন্টগুলো মিলিয়ে নিন:" : "Check requirements to keep track before your flight:"}
                    </p>
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
                  <span className="text-[9px] font-mono text-[#F6B73C] block mt-2 text-right">
                    {isBn ? "ইমিগ্রেশন চেকলিস্ট" : "Interactive Outbound checklist"}
                  </span>
                </div>

                {/* 3. Budget Planner Tool */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#102A43] font-mono uppercase tracking-widest block mb-2">
                      {isBn ? "📊 ৫ দিনের BDT বাজেট প্ল্যানার" : "📊 Fast Budget Planner"}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {isBn
                        ? "৫ দিনের বিদেশ সফরে Flight, Hotel, খাবার ও লোকাল যাতায়াতে মোট কত টাকা (BDT) খরচ হবে তার বিস্তারিত হিসাব দেখুন।"
                        : "Get a rough estimate of what a 5-day trip costs — flights, hotel, food, and transport, all broken down in BDT."}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("/costs")}
                    className="bg-[#102A43] text-white hover:bg-slate-800 font-bold text-[10px] py-1.5 px-3 rounded-lg self-start mt-3"
                  >
                    {isBn ? "বাজেট ক্যালকুলেটর খুলুন" : "Open Budget Calculator"}
                  </button>
                </div>

              </div>
            </div>

            {/* 🟦 SECTION 4.5: TRUSTPILOT TESTIMONIALS */}
            <TrustpilotReviews />



            {/* 🟦 SECTION 6: TRUST + ENGAGEMENT */}
            <div className="bg-[#102A43] text-white rounded-3xl p-8 border border-slate-800 text-center space-y-6 flex flex-col justify-center" style={{ minHeight: "220px" }}>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest">
                  {isBn ? "কেন ভ্রমণকারীরা URAL ব্যবহার করেন" : "Why Travelers Use URAL"}
                </span>
                <h3 className="font-serif text-2xl font-black">
                  {isBn ? "সহজ, ফ্রি এবং বাংলাদেশিদের জন্য তৈরি" : "Simple, Free, and Built for Bangladesh"}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full text-left">
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">
                    {isBn ? "✈️ লাইভ Flight ভাড়া" : "✈️ Real Flight Prices"}
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">
                    {isBn
                      ? "“ঢাকা থেকে সব প্রধান এয়ারলাইন্সের ভাড়া এক সাথে তুলনা করুন”"
                      : "“Compare prices from all major airlines flying from Dhaka”"}
                  </p>
                  <p className="text-[10px] text-slate-350 leading-relaxed">
                    {isBn
                      ? "Biman Bangladesh, Saudia, Emirates, AirAsia, US-Bangla ও Thai Airways সহ ঢাকা থেকে চলাচলকারী সব এয়ারলাইন্সের প্রতিদিনের আপডেট ভাড়া।"
                      : "Flight search covers Biman Bangladesh, Emirates, AirAsia, Thai Airways, and other airlines that fly out of Dhaka — updated daily."}
                  </p>
                </div>
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">
                    {isBn ? "⚡ দ্রুত ও সম্পূর্ণ ফ্রি" : "⚡ Fast and Free"}
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">
                    {isBn ? "“কোনো রেজিস্ট্রেশন বা বাড়তি ফি নেই”" : "“No signup, no fees”"}
                  </p>
                  <p className="text-[10px] text-slate-350 leading-relaxed">
                    {isBn
                      ? "কোনো একাউন্ট খোলা ছাড়াই ফ্লাইট ও হোটেল সার্চ করুন। কোনো লুকানো চার্জ নেই—অথবা কার্ড না থাকলে WhatsApp-এ BDT দিয়ে বুক করুন।"
                      : "Search flights and hotels without creating an account. No hidden charges. Click through to book directly with the airline or hotel."}
                  </p>
                </div>
                <div className="space-y-1 p-4 bg-[#F6B73C]/10 rounded-xl border border-[#F6B73C]/30">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">
                    {isBn ? "🤝 বিশ্বস্ত আন্তর্জাতিক পার্টনার" : "🤝 Trusted Partners"}
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">“Powered by Travelpayouts”</p>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                    {isBn
                      ? "আমাদের ফ্লাইট, এয়ারপোর্ট পিকআপ, ট্যুর, Travel eSIM ও গাড়ি ভাড়ার সেবাগুলো Travelpayouts, Aviasales, Welcome Pickups, Klook, Kiwitaxi, Airalo ও QEEQ-এর মাধ্যমে পরিচালিত।"
                      : "Flights, transfers, activities, eSIMs, and car rentals on this site are powered by Travelpayouts and its partner network — including Aviasales, Klook, Kiwitaxi, Airalo, and QEEQ."}
                  </p>
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
                  {isBn ? "🌅 বাংলাদেশ থেকে বিশ্বজুড়ে যাত্রা" : "🌅 Live from Cox's Bazar to the World"}
                </span>

                <div className="space-y-3 max-w-2xl">
                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                    {isBn ? (
                      <>
                        ঢাকা থেকে ফ্লাইটের ভাড়া কমলে <br className="sm:hidden" />
                        <span className="text-[#F6B73C]">সাথে সাথে এলার্ট পান</span>
                      </>
                    ) : (
                      <>
                        Get Flight Deal Alerts <br className="sm:hidden" />
                        <span className="text-[#F6B73C]">from Dhaka</span>
                      </>
                    )}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-xl mx-auto opacity-95">
                    {isBn ? (
                      <>
                        ঢাকা থেকে Maldives, Nepal, Bangkok, Kuala Lumpur, Jeddah বা Dubai-এর ফ্লাইটের ভাড়া কমলেই ইমেইলে{" "}
                        <span className="text-[#F6B73C] font-semibold">BDT Fare Alert</span> পেতে সাবস্ক্রাইব করুন।
                      </>
                    ) : (
                      <>
                        Sign up to get instant BDT notifications when flight prices from Dhaka drop below{" "}
                        <span className="text-[#F6B73C] font-semibold">BDT 20,000</span> to Maldives, Nepal, Bangkok, KL, or Dubai.
                      </>
                    )}
                  </p>
                </div>

                <div className="w-full max-w-md bg-slate-950/40 p-1 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                  {emailSubscribed ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm px-6 py-4 rounded-xl font-mono text-center">
                      {isBn ? (
                        <>
                          ✔ সাবস্ক্রিপশন সম্পন্ন হয়েছে! ঢাকা থেকে ফ্লাইটের ভাড়া কমলে আপনার <b className="text-white">{userEmail}</b> ইমেইলে জানিয়ে দেওয়া হবে।
                        </>
                      ) : (
                        <>
                          ✔ You're subscribed! We'll email you at <b className="text-white">{userEmail}</b> when Dhaka flight prices drop. Happy travels!
                        </>
                      )}
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
                        placeholder={isBn ? "আপনার ইমেইল এড্রেস লিখুন" : "Enter your personal email"}
                        required
                        className="w-full sm:flex-grow bg-slate-900/60 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F6B73C] focus:ring-1 focus:ring-[#F6B73C] transition-all font-sans text-center sm:text-left"
                      />
                      <button 
                        type="submit"
                        className="w-full sm:w-auto bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc240] active:bg-[#e2a222] font-black text-sm px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 shadow-lg shadow-[#F6B73C]/20"
                      >
                        {isBn ? "এলার্ট চালু করুন" : "Subscribe Alerts"}
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
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                {isBn ? "ফ্লাইট রুট নির্বাচন করুন:" : "SELECT FLIGHT ROUTE:"}
              </span>
              <div className="space-y-2">
                {localizedFlights.map((route) => (
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
                <span className="text-[10px] text-[#F6B73C] font-mono uppercase tracking-widest block font-bold">
                  {isBn ? "💰 বিশেষ সাশ্রয়" : "💰 Special Offer"}
                </span>
                <h4 className="font-serif text-sm font-bold">
                  {isBn ? "আপনার পরবর্তী ফ্লাইট বুকিংয়ে সর্বোচ্চ BDT 3,500 সাশ্রয় করুন" : "Save up to BDT 3,500 on Your Next Booking"}
                </h4>
                <p className="text-[11px] text-slate-300 leading-normal">
                  {isBn
                    ? `আপনার ${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"} ফ্লাইটের ভাড়া তুলনা করুন — ভেরিফায়েড পার্টনারের মাধ্যমে সর্বনিম্ন ভাড়া খুঁজুন।`
                    : `Compare prices for your ${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"} flight — lowest fares through our verified booking partners.`}
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-sm">
                <span className="text-[10px] text-[#102A43] font-mono uppercase tracking-widest block font-bold">
                  {isBn ? "🚕 ল্যান্ড করার পর" : "🚕 After You Land"}
                </span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {isBn
                    ? `${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"}-এ নেমে সরাসরি হোটেলে যেতে আগে থেকেই প্রাইভেট Airport Transfer বুক করুন।`
                    : `Pre-book a private airport transfer to your hotel in ${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"} — skip the taxi line.`}
                </p>
                <PartnerLinkButton href={AFFILIATE_LINKS.kiwitaxi} label={isBn ? "Airport Transfer খুঁজুন" : "Find a Transfer"} variant="dark" />
              </div>
            </div>

            {/* Master Page Content */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeRoute = localizedFlights.find(r => r.id === parameterId) || localizedFlights[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/flights")}>{isBn ? "ফ্লাইটস" : "Flights"}</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeRoute.id}</span>
                      </nav>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          {isBn ? `${activeRoute.from} থেকে ${activeRoute.to} ফ্লাইট গাইড` : `Flights from ${activeRoute.from} to ${activeRoute.to}`}
                        </h1>
                        <div className="flex items-center gap-2.5">
                          <span className="bg-[#F6B73C]/20 text-[#102A43] text-xs px-3 py-1.5 rounded-full font-bold font-mono">
                            {activeRoute.priceRangeBdt.split(" (")[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => openPriceAlert(activeRoute.to)}
                            className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
                          >
                            <span>🔔</span>
                            <span>{isBn ? "ফেয়ার অ্যালার্ট" : "Price Alert"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 🤖 AEO: QUICK ANSWER (50-80 Words, Google AI Overview Optimized) */}
                    <div id="aeo-quick-answer-card" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeRoute.quickAnswer}
                      </p>
                    </div>

                    {/* 📊 AEO: KEY FACTS TABLE */}
                    <div className="space-y-3">
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "এক নজরে ফ্লাইটের তথ্য" : "Flight Facts at a Glance"}
                      </h2>
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
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "এই রুটে চলাচলকারী এয়ারলাইন্সসমূহ" : "Airlines Flying This Route"}
                      </h2>
                      <p>
                        {isBn
                          ? "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে প্রতিদিন একাধিক ফ্লাইট এই রুটে চলাচল করে। সময় ও ভ্রমণ ক্লান্তি কমাতে Direct Flight বেছে নেওয়া সবচেয়ে সুবিধাজনক:"
                          : "Bangladeshi outbound travellers can leverage several daily flight profiles from Hazrat Shahjalal International Airport (DAC). Direct options are highly recommended to save travel fatigue:"}
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeRoute.airlines.map((airline) => (
                          <li key={airline} className="font-medium text-slate-805">{airline}</li>
                        ))}
                      </ul>
                      
                      <h3 className="font-serif font-black text-base text-slate-900 mt-4">
                        {isBn ? "সবচেয়ে কম ভাড়ায় টিকেট কাটার উপযুক্ত সময়" : "When to Book for the Best Price"}
                      </h3>
                      <p>
                        {isBn ? (
                          <>
                            আমরা ভ্রমণের অন্তত <strong>{activeRoute.bestTimeToBook}</strong> ফ্লাইট টিকেট বুক করার পরামর্শ দিই। এতে শেষ মুহূর্তের অতিরিক্ত ভাড়া এড়ানো যায়। পাশাপাশি আপনার ভিসার মেয়াদ ও শর্তাবলী (<strong>{activeRoute.visaRequirement}</strong>) মিলিয়ে টিকেট ইস্যু করুন।
                          </>
                        ) : (
                          <>
                            We advise booking flights approximately <strong>{activeRoute.bestTimeToBook}</strong>. In doing so, economy flyers can generally avoid peak dynamic pricing models. Ensure that you synchronize your flight bookings with visa durations, which are pre-configured at {activeRoute.visaRequirement}.
                          </>
                        )}
                      </p>
                    </div>

                     {/* Embedded Conversion search form widget */}
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-250/60 my-6">
                      <span className="text-[10px] font-mono font-bold text-[#102A43] block mb-2">
                        {isBn ? "এই রুটের ফ্লাইট সার্চ করুন" : "Search Flights on This Route"}
                      </span>
                      <TravelpayoutsEmbed
                        defaultDestination={getCountryIata(activeRoute.country)}
                      />
                    </div>

                    {/* 🛡️ AirHelp Flight Delay Compensation & AirHelp+ (AHTPO11 11% OFF) */}
                    <AirHelpWidget
                      lang={lang}
                      routeLabel={`${activeRoute.from} → ${activeRoute.to}`}
                    />

                    {/* internal linking system ranking loops (Flights to Visa and Hotels!) */}
                    <div id="hotel-visa-loop-links" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">
                        {isBn ? "এই ট্রিপের জন্য আরও প্রয়োজনীয় তথ্য" : "Also Useful for This Trip"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-flight-${activeRoute.id}`}
                          onClick={() => {
                            navigateTo(`/visa?country=${getCountryVisaId(activeRoute.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 {isBn ? `${activeRoute.country} ভিসা চেকলিস্ট দেখুন` : `Check ${activeRoute.country} Visa Checklist`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-hotel-from-flight-${activeRoute.id}`}
                          onClick={() => {
                            navigateTo(`/hotels?city=${getCountryHotelId(activeRoute.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 {isBn ? `${activeRoute.country}-এ কোথায় থাকবেন` : `Where to Stay in ${activeRoute.country}`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">
                          🚕 {isBn ? `${activeRoute.country} Airport Transfer বুক করুন` : `Book Airport Transfer in ${activeRoute.country}`} <ExternalLink size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeRoute.country} ফ্লাইট গাইড` : `Flights to ${activeRoute.country}`}
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
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                {isBn ? "শহর অনুযায়ী হোটেল গাইড:" : "CITY HOUSING DIRECTORY:"}
              </span>
              <div className="space-y-2">
                {localizedHotels.map((col) => (
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
                    <span>🏨 {isBn ? `${col.city} হোটেল গাইড` : `${col.city} Hotels Guide`}</span>
                    <ArrowRight size={12} className={parameterId === col.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel content template */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeHotel = localizedHotels.find(h => h.id === parameterId) || localizedHotels[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/hotels")}>{isBn ? "হোটেল" : "Hotels"}</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeHotel.id}</span>
                      </nav>

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        {isBn ? `${activeHotel.city}-এ কোথায় থাকবেন: সেরা এলাকা ও হোটেল গাইড` : `Where to Stay in ${activeHotel.city}: Best Areas & Hotels`}
                      </h1>
                    </div>

                    {/* AEO Answer */}
                    <div id="hotel-aeo-quick-answer" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeHotel.quickAnswer}
                      </p>
                    </div>

                    {/* Neighborhoods breakdown */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">
                        {isBn ? "থাকার জন্য সেরা এলাকা ও লোকেশন বিশ্লেষণ" : "Best Neighborhoods Area breakdown"}
                      </h2>
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
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য বাছাইকৃত হোটেল" : "Curated Local Stays Selection"}
                      </h2>
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
                                <span className="text-xs font-mono text-slate-400 block">{isBn ? "প্রতি রাতের ভাড়া" : "Night Rate"}</span>
                                <span className="text-sm font-bold text-slate-800">৳ {room.priceBdt.toLocaleString()} BDT</span>
                              </div>
                              
                              <button
                                id={`hotel-booking-btn-${room.name.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => {
                                  triggerAffiliateToast(
                                    isBn
                                      ? `${room.name}, ${room.neighborhood}-এর সর্বনিম্ন রেট খোঁজা হচ্ছে...`
                                      : `Finding the best available rate at ${room.name}, ${room.neighborhood}. Opening booking page...`
                                  );
                                }}
                                className="bg-[#102A43] text-white hover:bg-[#1a4166] text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                {isBn ? "বুক করুন" : "Book Stay"} <ExternalLink size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 🚕 Unified Airport Transfer & Travel Essentials Hub */}
                    <TravelEssentials
                      country={activeHotel.city}
                      defaultTab="transfers"
                      compactHeader
                      lang={lang}
                    />

                    {/* Flight & Visa Loop linkups */}
                    <div id="hotel-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">
                        {isBn ? "⚡ ফ্লাইট রুট ও ভিসা গাইড:" : "⚡ FLIGHT ROUTING & ENTRY DETAILS:"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            navigateTo(`/visa?country=${getCountryVisaId(activeHotel.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🛂 {isBn ? `${activeHotel.country} ভিসা চেকলিস্ট` : `Check ${activeHotel.country} Visa Checklist`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            navigateTo(`/flights?route=${getCountryFlightId(activeHotel.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          ✈️ {isBn ? "ঢাকা থেকে ফ্লাইট রুট" : "Recommended Dhaka Flights"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a
                          href={AFFILIATE_LINKS.kiwitaxi}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-250 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🚕 {isBn ? "Airport Transfer ভাড়া তুলনা" : "Compare Transfer Prices"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    {/* Widget */}
                    <TravelpayoutsCustomWidget 
                      initialTab="hotels"
                      initialHotelCity={activeHotel.city}
                      initialTo={getCountryCityWithIata(activeHotel.country)}
                    />

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeHotel.city}-এ কোথায় থাকবেন` : `Where to stay in ${activeHotel.city}`}
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
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "VISA GUIDES BY COUNTRY"}
              </span>
              <div className="space-y-2">
                {localizedVisas.map((v) => (
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
                    <span>🛂 {isBn ? `${v.country} ভিসা রিকোয়ারমেন্টস` : `${v.country} Visa Requirements`}</span>
                    <ArrowRight size={12} className={parameterId === v.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeVisa = localizedVisas.find(v => v.id === parameterId) || localizedVisas[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/visa")}>{isBn ? "ভিসা গাইড" : "Visa"}</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeVisa.id}</span>
                      </nav>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          {isBn
                            ? `বাংলাদেশি পাসপোর্টধারীদের জন্য ${activeVisa.country} ভিসা গাইড ও চেকলিস্ট`
                            : `${activeVisa.country} Visa Requirements for Bangladeshi Citizens`}
                        </h1>
                        <span className="bg-[#102A43] text-white text-xs px-3 py-1 rounded-full font-bold font-mono">
                          {activeVisa.requirementType}
                        </span>
                      </div>
                    </div>

                    {/* AEO Quote */}
                    <div id="visa-aeo-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
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
                      <h2 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">
                        {isBn ? "ধাপে ধাপে ভিসা আবেদনের নিয়মাবলী" : "Step-by-Step Application Process"}
                      </h2>
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
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "প্রয়োজনীয় ডকুমেন্ট চেকলিস্ট" : "Document Checklist"}
                      </h2>
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
                        {isBn ? "আপনার ট্রিপ বুক করতে প্রস্তুত?" : "Ready to book your trip?"}
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                          {isBn ? "ঢাকা থেকে ফ্লাইট খুঁজুন" : "Find flights from Dhaka"}
                        </span>
                        <TravelpayoutsEmbed
                          defaultDestination={getCountryIata(activeVisa.country)}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <PartnerLinkButton 
                          href={AFFILIATE_LINKS.airalo} 
                          label={isBn ? `${activeVisa.country}-এর জন্য লোকাল eSIM নিন` : `Get a local eSIM for ${activeVisa.country}`} 
                        />
                        <PartnerLinkButton 
                          href={AFFILIATE_LINKS.kiwitaxi} 
                          label={isBn ? "Airport Transfer বুক করুন" : "Book airport transfer"} 
                        />
                      </div>
                    </div>

                    {/* 📶 Stay Connected widget block */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest block">
                          {isBn ? "📶 ফ্লাইটে ওঠার আগে" : "📶 Before You Fly"}
                        </span>
                        <h2 className="font-serif text-lg font-bold text-slate-900">
                          {isBn ? `${activeVisa.country}-এর জন্য লোকাল eSIM সংগ্রহ করুন` : `Get a Local eSIM for ${activeVisa.country}`}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {isBn ? "এয়ারপোর্টে নেমেই সাথে সাথে ইন্টারনেট চালু করুন — সিমের লাইনে দাঁড়ানোর ঝামেলা নেই।" : "Land with data already active — no SIM card counter, no roaming bill shock."}
                        </p>
                      </div>
                      <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200">
                        <AiraloEsimWidget />
                      </div>
                    </div>

                    {/* Flight & Hotel loop structure */}
                    <div id="visa-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">
                        {isBn ? "আপনার পুরো ট্রিপ প্ল্যান করুন" : "Plan Your Full Trip"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-hotel-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            navigateTo(`/hotels?city=${getCountryHotelId(activeVisa.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🏨 {isBn ? `${activeVisa.country}-এর বাছাইকৃত হোটেল` : `Curated ${activeVisa.country} Hotels`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            navigateTo(`/flights?route=${getCountryFlightId(activeVisa.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          ✈️ {isBn ? "ঢাকা থেকে ফ্লাইট বুক করুন" : "Book Flights from Dhaka"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a
                          href={AFFILIATE_LINKS.airalo}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          📶 {isBn ? "লোকাল eSIM নিন" : "Get a Local eSIM"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeVisa.country} ভিসা প্রসেসিং গাইড` : `${activeVisa.country} Outbound Visa Process`}
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
                            <TravelpayoutsEmbed defaultDestination="DXB" />
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
                            <TravelpayoutsCustomWidget 
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

                        {/* 🚗 4. UNIFIED TABBED TRAVEL ESSENTIALS (Welcome Pickups, Kiwitaxi, Klook, Airalo, QEEQ) */}
                        <TravelEssentials country="Dubai, UAE" />

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
                            <h3 className="font-serif text-xl sm:text-2xl font-bold">Flights Leaving Dhaka (DAC) to {getCountryCityWithIata(activeDes.country)}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-light font-sans">
                              {activeDes.id === "nepal-guide" ? "Direct flights from Dhaka to Kathmandu take just 1 hour 30 minutes on Biman Bangladesh or Himalaya Airlines. Roundtrip fares typically run BDT 28,000–40,000. Compare prices for your dates below." :
                              activeDes.id === "thailand-guide" ? "Dhaka to Bangkok takes about 2.5 hours direct. Thai Airways, Biman, US-Bangla, and Thai Lion Air fly this route. Roundtrip fares usually start around BDT 31,500." :
                              activeDes.id === "malaysia-guide" ? "Dhaka to Kuala Lumpur takes about 3 hours 50 minutes. Malaysia Airlines, AirAsia, Biman, and Batik Air all fly direct. Expect BDT 36,000–48,000 roundtrip." :
                              activeDes.id === "singapore-guide" ? "Direct flights from Dhaka to Singapore Changi (SIN) take 4 hours 15 minutes on Singapore Airlines, Biman, and US-Bangla. Roundtrip fares start around BDT 42,000." :
                              activeDes.id === "maldives-guide" ? "Direct flights from Dhaka to Malé (MLE) take 4 hours 10 minutes on US-Bangla Airlines, or 1-stop via Colombo on SriLankan Airlines. Free 30-day Visa on Arrival for Bangladeshis." :
                              activeDes.id === "dubai-guide" ? "Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000." : "Lock down lowest flight options direct from Dhaka."}
                            </p>
                          </div>

                          {/* Travelpayouts Flights widget */}
                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">✈️ LIVE FLIGHTS COMPARISON ENGINE</span>
                            <TravelpayoutsEmbed
                              defaultDestination={getCountryIata(activeDes.country)}
                            />
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
                                activeDes.id === "singapore-guide" ? "Smart Urban Comfort (approx BDT 11,500/day local expense)" :
                                activeDes.id === "maldives-guide" ? "Local Island Budget (approx BDT 8,500/day on Maafushi)" :
                                activeDes.id === "dubai-guide" ? "Premium Business Luxury (approx BDT 14,000/day local expense)" : "Sufficient BDT 5,000/day"}
                              </span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🎒 Optimal Travel Style</span>
                              <span className="text-slate-650 leading-snug block font-sans">
                                {activeDes.id === "nepal-guide" ? "High-altitude trekking, organic dining, and historical pagoda walks." :
                                activeDes.id === "thailand-guide" ? "Multi-mall shopping, marine activities, and street food market tasting." :
                                activeDes.id === "malaysia-guide" ? "Urban adventure, Genting theme parks, and tropical reserve strolls." :
                                activeDes.id === "singapore-guide" ? "MRT city exploration, Sentosa theme parks, Gardens by the Bay & Mustafa shopping." :
                                activeDes.id === "maldives-guide" ? "Maafushi coral reef snorkeling, sandbank picnics, and 1-day luxury resort passes." :
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
                            <h3 className="font-serif text-lg font-bold text-slate-900">Compare Accommodations in {getCountryCityName(activeDes.country)}</h3>
                            <p className="text-xs text-slate-500">
                              Now that your travel days are mapped, click to lock Halal-certified suites or cheap family units near critical transit points.
                            </p>
                          </div>

                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">🏨 LIVE ACCOMMODATION COMPARISON ENGINE</span>
                            <TravelpayoutsCustomWidget 
                              initialTab="hotels"
                              initialTo={getCountryCityWithIata(activeDes.country)}
                              initialHotelCity={getCountryCityName(activeDes.country)}
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
                              { area: "Downtown Backpacker Zone (Thamel)", name: "Thamel Eco Resort & Spa", rate: "৳3,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Free airport luggage pick-up and organic buffet included." },
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
                            ] : activeDes.id === "singapore-guide" ? [
                              { area: "24/7 Bangladeshi Hub (Little India / Farrer Park)", name: "One Farrer Hotel / ibis budget Imperial", rate: "৳7,200 – ৳19,500 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Steps from 24-hour Mustafa Centre, MRT station, and halal Bangladeshi/Indian dining." },
                              { area: "Halal Heritage Quarter (Bugis / Arab Street)", name: "Village Hotel Bugis & Hotel Boss", rate: "৳10,500 – ৳13,500 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Walkable to Sultan Mosque, Haji Lane, and Bugis MRT interchange." },
                              { area: "Iconic Waterfront (Marina Bay Sands Zone)", name: "Marina Bay Waterfront Luxury Suites", rate: "৳34,000 / night", star: "⭐ ⭐ ⭐ ⭐ ⭐", linkTip: "Unbeatable views of Gardens by the Bay and nightly Spectra water show." }
                            ] : activeDes.id === "maldives-guide" ? [
                              { area: "Best Budget Island (Maafushi Bikini Beach)", name: "Kaani Palm Beach & Arena Beach Hotel", rate: "৳8,200 – ৳9,800 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "35-min shared speedboat ($25) from airport; $30 snorkeling & sandbank tours daily." },
                              { area: "Airport Road Island (Hulhumalé Beachfront)", name: "h78 at Hulhumale Maldives", rate: "৳6,400 / night", star: "⭐ ⭐ ⭐", linkTip: "Connected to Malé Airport by bridge taxi ($8) — zero speedboat fees required." },
                              { area: "Private Overwater Island (North Malé Atoll)", name: "Cinnamon Dhonveli Water Suites", rate: "৳38,000 / night", star: "⭐ ⭐ ⭐ ⭐ ⭐", linkTip: "Iconic overwater bungalows with all-inclusive halal dining and house reef." }
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
                            <h4 className="font-serif text-base font-bold text-[#102A43]">Typical Flight Prices (Dhaka to {getCountryCityWithIata(activeDes.country)})</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-700">📅 Best Months to Book Lower Fares:</span>
                              <p className="text-slate-650 leading-relaxed font-sans">
                                {activeDes.id === "nepal-guide" ? "September & May represent low tourism price cycles." :
                                activeDes.id === "thailand-guide" ? "June & September mark monsoon sales with high airline availability." :
                                activeDes.id === "malaysia-guide" ? "March & October see significant carrier promo codes online." :
                                activeDes.id === "singapore-guide" ? "February–May and July–August offer lower hotel & airfare combinations." :
                                activeDes.id === "maldives-guide" ? "May, October & November shoulder months drop resort & flight rates by 30%." :
                                "July & August are extremely hot but yield major airfare drops."}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-700">💰 Return Airfare typical baseline:</span>
                              <span className="text-[#F6B73C] font-mono font-extrabold text-xs block">
                                {activeDes.id === "nepal-guide" ? "৳28,000 – ৳36,000 Return" :
                                activeDes.id === "thailand-guide" ? "৳31,500 – ৳42,000 Return" :
                                activeDes.id === "malaysia-guide" ? "৳36,000 – ৳46,000 Return" :
                                activeDes.id === "singapore-guide" ? "৳42,000 – ৳56,000 Return" :
                                activeDes.id === "maldives-guide" ? "৳46,000 – ৳62,000 Return" :
                                "৳58,000 – ৳72,000 Return"}
                              </span>
                            </div>
                          </div>

                          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl text-[11px] text-slate-650 flex items-start gap-2.5">
                            <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
                            <span className="font-sans"><b>Alert:</b> {
                              activeDes.id === "nepal-guide" ? "Flights during festivals peak heavily. Book at least 3 weeks in advance!" :
                              activeDes.id === "thailand-guide" ? "Weekend departure prices surge by 20%. Select Tuesday or Wednesday flights." :
                              activeDes.id === "malaysia-guide" ? "Direct Biman or AirAsia paths get booked up. Lock flight slots early for families." :
                              activeDes.id === "singapore-guide" ? "Submit your free SG Arrival Card within 72 hours before departure alongside your printed e-Visa!" :
                              activeDes.id === "maldives-guide" ? "Complete the free IMUGA Traveller Declaration within 96 hours before flying to Malé!" :
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

                        {/* 7B. KKDAY SOUTHEAST ASIA 9.9 SALE FOR THAILAND, MALAYSIA & SINGAPORE */}
                        {(activeDes.id === "thailand" ||
                          activeDes.id === "malaysia" ||
                          activeDes.id === "singapore") && (
                          <KKdayPromoBanner
                            lang={lang}
                            variant="compact"
                            cityContext={activeDes.country}
                          />
                        )}

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
                                navigateTo(`/visa?country=${getCountryVisaId(activeDes.country)}`);
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
              <span className="text-xs font-bold text-slate-500 block font-sans">
                {isBn ? "দেশ অনুযায়ী ট্রিপ বাজেট গাইড" : "TRIP COST GUIDES"}
              </span>
              <div className="space-y-2 text-xs">
                {localizedCosts.map((c) => (
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
                    <span>💰 {isBn ? `${c.country} ভ্রমণ খরচ` : `${c.country} Trip Cost`}</span>
                    <ArrowRight size={12} className={parameterId === c.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Cost View Content Template */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeCost = localizedCosts.find(c => c.id === parameterId) || localizedCosts[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/costs")}>{isBn ? "ভ্রমণ খরচ" : "Trip Costs"}</span>
                        <span>/</span>
                        <span className="text-[#102A43] font-bold">{activeCost.id}</span>
                      </nav>

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        {isBn
                          ? `বাংলাদেশ থেকে ${activeCost.country} ভ্রমণের বিস্তারিত খরচ (BDT বাজেট চার্ট)`
                          : `${activeCost.country} Trip Cost from Bangladesh: Complete Price Matrix`}
                      </h1>
                    </div>

                    {/* AEO Quote */}
                    <div id="cost-aeo-text-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-[#102A43] font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeCost.quickAnswer}
                      </p>
                    </div>

                    {/* Detailed matrix cost tables */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
                        <h2 className="font-serif font-black text-lg text-slate-900">
                          {isBn ? "খাতওয়ারী সম্পূর্ণ ভ্রমণ খরচের হিসাব (BDT)" : "Full Trip Cost Breakdown (BDT)"}
                        </h2>
                        <span className="text-xs text-[#102A43] bg-emerald-50 border border-emerald-200 font-mono px-3 py-1 rounded">
                          {isBn ? "এক্সচেঞ্জ রেট:" : "Exchange Rate:"} {activeCost.exchangeRateText}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <thead>
                            <tr className="bg-[#102A43] text-white">
                              <th className="p-4 font-serif font-bold">{isBn ? "খরচের খাত" : "What You'll Spend On"}</th>
                              <th className="p-4 font-mono font-bold">{isBn ? "বাজেট (Budget)" : "Budget"}</th>
                              <th className="p-4 font-mono font-bold">{isBn ? "মিড-রেঞ্জ (Mid-Range)" : "Mid-Range"}</th>
                              <th className="p-4 font-mono font-bold">{isBn ? "লাক্সারি (Luxury)" : "Luxury"}</th>
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

                      {/* Unified Conversion Widgets Block */}
                      <div className="space-y-6 mt-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                            {isBn ? `ঢাকা থেকে ${activeCost.country} ফ্লাইটের আজকের ভাড়া দেখুন` : `Check today's flight prices from Dhaka to ${activeCost.country}`}
                          </span>
                          <TravelpayoutsEmbed
                            defaultDestination={getCountryIata(activeCost.country)}
                          />
                        </div>

                        <TravelEssentials
                          country={activeCost.country}
                          defaultTab="transfers"
                          compactHeader
                          lang={lang}
                        />
                      </div>
                    </div>

                    {/* Seasonal variations description */}
                    <div className="bg-slate-50 border border-slate-205 p-6 rounded-xl space-y-2">
                      <h4 className="font-serif font-black text-base text-slate-900">
                        {isBn ? "মৌসুম অনুযায়ী খরচের তারতম্য" : "How Prices Change by Season"}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-700 font-sans">
                        {activeCost.seasonalVariation}
                      </p>
                    </div>

                    {/* Money-saving hacks */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-[#102A43]">
                        {isBn ? "খরচ কমানোর পরীক্ষিত কৌশল" : "Tips to Spend Less"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeCost.moneyHacks.map((hack, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-mono text-[#F6B73C] font-bold">
                              {isBn ? `টিপস #${idx + 1}` : `Tip ${idx + 1}`}
                            </span>
                            <p className="text-sm text-slate-700 leading-relaxed font-sans">{hack}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Internal link graphs */}
                    <div id="cost-internal-loop" className="bg-[#102A43]/5 border border-[#102A43]/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-[#102A43] font-mono tracking-widest uppercase block">
                        {isBn ? "এই ট্রিপের অন্যান্য গাইড" : "Also Plan For This Trip"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-cost-${activeCost.id}`}
                          onClick={() => {
                            navigateTo(`/visa?country=${getCountryVisaId(activeCost.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 {isBn ? "ভিসা চেকলিস্ট দেখুন" : "Passport Visa Checklist"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-dest-from-cost-${activeCost.id}`}
                          onClick={() => {
                            navigateTo(`/destinations?country=${getCountryDestId(activeCost.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🌍 {isBn ? "ট্যুর আইটিনারারি দেখুন" : "View Travel Itinerary"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-hotel-from-cost-${activeCost.id}`}
                          onClick={() => {
                            navigateTo(`/hotels?city=${getCountryHotelId(activeCost.country)}`);
                          }}
                          className="flex items-center gap-2 text-[#102A43] hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 {isBn ? "সেরা হোটেল জোন" : "Curated Area Stays"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                      </div>
                    </div>

                    <InteractiveTools />

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeCost.country} ভ্রমণের খরচের হিসাব` : `${activeCost.country} Trip Cost calculations`}
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
                {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য স্মার্ট ট্রাভেল টুলস" : "Outbound Travel Tools Workspace"}
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                {isBn ? "BDT কারেন্সি কনভার্টার, ইমিগ্রেশন চেকলিস্ট এবং জরুরি ট্রাভেল ইউটিলিটি।" : "Dynamic calculators constructed specifically for South Asian travelers."}
              </p>
            </div>
            
            <InteractiveTools />

            {isAdmin && <TravelpayoutsOnboarding />}

            {/* Book Your Trip - Visual Step-by-Step Booking Checklist Funnel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8 mt-8">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  {isBn ? "ধাপে ধাপে আপনার ট্রিপ বুক করুন" : "Book Your Trip"}
                </h2>
                <p className="text-sm text-slate-500">
                  {isBn
                    ? "বাংলাদেশ থেকে বিদেশ ভ্রমণের জন্য ৪ ধাপে সম্পূর্ণ বুকিং চেকলিস্ট।"
                    : "Your step-by-step planning and conversion dashboard built for outbound trips from Bangladesh."}
                </p>
              </div>

              <div className="space-y-8 divide-y divide-slate-100">
                {/* Step 1 */}
                <div className="space-y-4 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#102A43] text-white font-mono text-sm font-bold shadow-sm">
                      1
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#102A43]">
                      {isBn ? "ধাপ ১: আপনার ফ্লাইট খুঁজুন" : "Step 1: Find your flight"}
                    </h3>
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
                    <h3 className="font-serif text-base font-bold text-[#102A43]">
                      {isBn ? "ধাপ ২: আপনার হোটেল বুক করুন" : "Step 2: Book your hotel"}
                    </h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <TravelpayoutsCustomWidget initialTab="hotels" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#102A43] text-white font-mono text-sm font-bold shadow-sm">
                      3
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#102A43]">
                      {isBn ? "ধাপ ৩: Klook-এ ট্যুর ও অ্যাক্টিভিটি বুক করুন" : "Step 3: Plan activities with Klook"}
                    </h3>
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
                    <h3 className="font-serif text-base font-bold text-[#102A43]">
                      {isBn ? "ধাপ ৪: ট্রাভেল eSIM সংগ্রহ করুন" : "Step 4: Get your travel eSIM"}
                    </h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <AiraloEsimWidget />
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Utility Desk FAQs & Travel Intelligence */}
            <TravelIntelligence
              pageTitle={isBn ? "বাংলাদেশি ভ্রমণকারীদের ট্রাভেল টুলস" : "Bangladeshi Traveler Utility Tools"}
              quickAnswer={
                isBn
                  ? "আমাদের ট্রাভেল টুলস ড্যাশবোর্ডে বাংলাদেশি ভ্রমণকারীদের জন্য রয়েছে লাইভ BDT কারেন্সি কনভার্টার, বিভিন্ন দেশের পাওয়ার প্লাগ ও অ্যাডাপ্টার গাইড (Type C, D, G), ঢাকা এয়ারপোর্ট ইমিগ্রেশন চেকলিস্ট এবং জরুরি বিদেশি ভাষার ফ্রেজবুক।"
                  : "Our travel tool suite equips outbound tourists from Bangladesh with live mid-market exchange rate calculators, comprehensive plug type adapters (Type C, D, G) by destination, an interactive packing checklist for Dhaka airport immigration, and essential phrases in Thai, Malay, Nepali, and Arabic."
              }
              keyFacts={[
                { label: isBn ? "কারেন্সি রেট" : "Currency Rates", value: "Mid-Market BDT Live Tracker" },
                { label: isBn ? "বার্ষিক এন্ডোর্সমেন্ট কোটা" : "Annual FX Quota", value: "$12,000 USD / Adult Passport" },
                { label: isBn ? "প্লাগ সাপোর্ট" : "Plug Compatibility", value: "Type C/D (Nepal), A/B (Thailand), G (MY/UAE)" },
                { label: isBn ? "ইমিগ্রেশন প্যাক" : "Immigration Pack", value: "Passport + Ticket + Hotel + Solvency" }
              ]}
              faqs={SERVICE_TOOLS_FAQS}
            />
          </div>
        )}

        {/* -------------------------------------------------------------
            📰 VIEW 8: BLOG INTEL HUB (DIRECTORY LANDING VS. DEDICATED ARTICLE PAGE)
        ------------------------------------------------------------- */}
        {section === "blog" && isLanding && (
          <div className="space-y-12 animate-fade-in">
            {/* 1. FULL-WIDTH EDGE-TO-EDGE HERO IMAGE WITH H1 HEADER & SHORT DESCRIPTION */}
            <section
              aria-labelledby="blog-hero-h1"
              className="w-screen relative left-1/2 -translate-x-1/2 -mt-6 sm:-mt-8 bg-[#0B1628] text-white overflow-hidden border-b border-slate-800 shadow-xl"
            >
              <div className="absolute inset-0">
                <img
                  src={blogHeroBannerImg}
                  alt="URAL Travel Guides and Bangladeshi Outbound Intelligence"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center opacity-45"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, rgba(11,22,40,0.96) 0%, rgba(16,42,67,0.86) 55%, rgba(11,22,40,0.72) 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-transparent to-[#0B1628]/40" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
                <div className="max-w-4xl space-y-5">
                  <nav
                    aria-label="Breadcrumb"
                    className="text-slate-300 text-xs flex flex-wrap items-center gap-2 font-mono"
                  >
                    <button
                      type="button"
                      onClick={() => navigateTo("/")}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isBn ? "হোম (Home)" : "Home"}
                    </button>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F6B73C] font-semibold">
                      {isBn ? "ট্রাভেল ব্লগ ও গাইড (Travel Blog)" : "Travel Guides & Blog"}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="bg-white/10 text-white/90 px-2.5 py-0.5 rounded-md border border-white/15">
                      {isBn
                        ? `${localizedBlogs.length}টি বিস্তারিত গাইড`
                        : `${localizedBlogs.length} Verified Guides`}
                    </span>
                  </nav>

                  <h1
                    id="blog-hero-h1"
                    className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] text-balance"
                  >
                    {isBn
                      ? "বাংলাদেশি ভ্রমণকারীদের জন্য Travel Guide, Hajj ও Umrah প্রস্তুতি এবং BDT বাজেট প্ল্যান"
                      : "Bangladesh Outbound Travel Blog: Visa Checklists, DIY Umrah & BDT Trip Guides"}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-3xl">
                    {isBn
                      ? "বাংলাদেশি পাসপোর্টধারীদের জন্য সহজ বাংলায় তৈরি ধাপে ধাপে গাইড—সরকারি নিয়মে Hajj রেজিস্ট্রেশন, Nusuk App দিয়ে DIY Umrah, Dual-Currency Card Endorsement, Dhaka Airport Immigration চেকলিস্ট এবং কম খরচে ফ্যামিলি ট্যুর পরিকল্পনা।"
                      : "Step-by-step editorial playbooks researched for Bangladeshi passport holders—covering DIY Umrah with the Nusuk app, dual-currency card endorsement, Dhaka Airport immigration checklists, and BDT destination budgets."}
                  </p>
                </div>
              </div>
            </section>

            {/* 2. INTERACTIVE CATEGORY FILTER TABS & SEARCH BAR */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div
                  role="tablist"
                  aria-label="Filter travel guides by topic"
                  className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 p-1.5 bg-slate-200/75 rounded-xl"
                >
                  {[
                    {
                      id: "all",
                      label: isBn
                        ? `সব গাইড (${localizedBlogs.length})`
                        : `All Guides (${localizedBlogs.length})`,
                    },
                    {
                      id: "Hajj & Umrah",
                      label: isBn ? "Hajj ও Umrah (2)" : "Hajj & Umrah (2)",
                    },
                    {
                      id: "Visa & Immigration",
                      label: isBn ? "Visa ও Immigration (3)" : "Visa & Immigration (3)",
                    },
                    {
                      id: "Banking & Payments",
                      label: isBn ? "Dual-Currency Card ও BDT (1)" : "Card Endorsement & BDT (1)",
                    },
                    {
                      id: "Family & Budget",
                      label: isBn ? "ফ্যামিলি ও বাজেট ট্রিপ (3)" : "Family & Budget Trips (3)",
                    },
                    {
                      id: "Flights, Hotels & Food",
                      label: isBn
                        ? "Flight, Hotel ও Halal খাবার (3)"
                        : "Flights, Hotels & Halal Food (3)",
                    },
                  ].map((tab) => {
                    const isActive = blogCategoryFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setBlogCategoryFilter(tab.id)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#102A43] text-white shadow-xs"
                            : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full lg:w-72 shrink-0">
                  <input
                    type="search"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder={
                      isBn
                        ? "Umrah, Card, Nepal, Visa লিখে খুঁজুন..."
                        : "Search Umrah, card, Nepal, visa..."
                    }
                    aria-label="Search blog guides"
                    className="w-full bg-white border border-slate-200 focus:border-[#102A43] rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-colors"
                  />
                  {blogSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setBlogSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {isBn ? "মুছুন" : "Clear"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 3. 3-CARDS-PER-ROW BLOG GRID (THUMBNAIL + ~150-WORD EXCERPT + 'READ FULL BLOG' BUTTON) */}
            {(() => {
              const build150WordExcerpt = (summary: string, content: string, targetWords = 150): string => {
                const cleanParagraphs = content
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(
                    (line) =>
                      line.length > 0 &&
                      !/^([0-9]+|[০-৯]+)\.\s+/.test(line) &&
                      !(line.endsWith(":") && line.length < 100)
                  )
                  .map((line) => line.replace(/^(-|•|\*)\s+/, ""));

                const combinedText = `${summary.trim()} ${cleanParagraphs.join(" ")}`
                  .replace(/\s+/g, " ")
                  .trim();

                const words = combinedText.split(" ");
                if (words.length <= targetWords) {
                  return combinedText;
                }
                return `${words.slice(0, targetWords).join(" ").replace(/[.,;:!?-]+$/, "")}...`;
              };

              const orderedBlogs = [
                ...localizedBlogs.filter((b) => b.category === "Hajj & Umrah"),
                ...localizedBlogs.filter((b) => b.category !== "Hajj & Umrah"),
              ];

              const filteredBlogs = orderedBlogs.filter((post) => {
                const matchesCategory =
                  blogCategoryFilter === "all"
                    ? true
                    : blogCategoryFilter === "Flights, Hotels & Food"
                    ? ["Cheap Flight Tips", "Hotel Savings", "Food & Culture"].includes(post.category)
                    : post.category === blogCategoryFilter;

                const q = blogSearchQuery.trim().toLowerCase();
                const matchesQuery =
                  !q ||
                  post.title.toLowerCase().includes(q) ||
                  post.summary.toLowerCase().includes(q) ||
                  post.category.toLowerCase().includes(q);

                return matchesCategory && matchesQuery;
              });

              if (filteredBlogs.length === 0) {
                return (
                  <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {isBn ? "কোনো ট্রাভেল গাইড খুঁজে পাওয়া যায়নি" : "No matching travel guides found"}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      {isBn
                        ? "অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন অথবা সব গাইড দেখতে নিচের বাটনে ক্লিক করুন।"
                        : "Try clearing your search filter or switching back to All Guides to browse our complete library of Bangladeshi travel guides."}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogCategoryFilter("all");
                        setBlogSearchQuery("");
                      }}
                      className="bg-[#102A43] text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
                    >
                      {isBn
                        ? `সবগুলো গাইড দেখুন (${localizedBlogs.length})`
                        : `Show All ${localizedBlogs.length} Guides`}
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredBlogs.map((post) => {
                    const coverImg = getBlogCoverImage(post.slug);
                    const excerpt150Words = build150WordExcerpt(post.summary, post.content, 150);

                    return (
                      <article
                        key={post.id}
                        onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                        className="group bg-white border border-slate-200/90 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex flex-col">
                          {/* Card Thumbnail Image */}
                          <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                            <img
                              src={coverImg}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/95 font-medium">
                              <span className="bg-[#102A43]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/15">
                                {post.category}
                              </span>
                              <span className="font-mono">{post.readTime}</span>
                            </div>
                          </div>

                          {/* Card Body: Metadata + H2 Title + 150-Word Excerpt */}
                          <div className="p-6 space-y-3.5">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                              <span>{post.date}</span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {isBn
                                  ? `লেখক: ${post.author.split(" (")[0]}`
                                  : `By ${post.author.split(" (")[0]}`}
                              </span>
                            </div>

                            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#102A43] leading-snug text-balance">
                              {post.title}
                            </h2>

                            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                              {excerpt150Words}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer: 'Read Full Blog' Button */}
                        <div className="px-6 pb-6 pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateTo(`/blog?slug=${post.slug}`);
                            }}
                            className="w-full bg-[#102A43] group-hover:bg-[#F6B73C] text-white group-hover:text-[#0F172A] font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন · Read Full Blog" : "Read Full Blog"}</span>
                            <ArrowRight size={14} className="text-[#F6B73C] group-hover:text-[#0F172A] transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            })()}

            {/* 4. SMART CONVERSION WIDGETS SECTION ON BLOG DIRECTORY PAGE */}
            <div className="pt-8 border-t border-slate-200 space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#102A43]">
                      {isBn
                        ? "লাইভ Flight ও Umrah রুটের ভাড়া তুলনা"
                        : "Live Airfare & Umrah Route Comparison"}
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                      {isBn
                        ? "ঢাকা (DAC) থেকে ফ্লাইটের সর্বনিম্ন ভাড়া যাচাই করুন"
                        : "Compare Flights from Dhaka (DAC) While You Plan"}
                    </h2>
                    <p className="text-xs text-slate-600">
                      {isBn
                        ? "Jeddah, Madinah, Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé ও Dubai-এর লাইভ ভাড়া দেখুন—অথবা Dual-Currency Card না থাকলে আমাদের WhatsApp BDT ডেস্কে মেসেজ দিন।"
                        : "Search live fares to Jeddah, Madinah, Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé, and Dubai—or message our WhatsApp BDT Desk if you don't have a dual-currency card yet."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo("/contact")}
                    className="self-start sm:self-end text-xs font-semibold text-[#102A43] hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {isBn
                        ? "BDT-তে টিকিট ও হোটেল বুকিং সহায়তা"
                        : "Need BDT Booking Help? Contact Desk"}
                    </span>
                    <ArrowRight size={12} />
                  </button>
                </div>
                <TravelpayoutsEmbed defaultDestination="JED" />
              </div>

              <TravelEssentials country="Saudi Arabia & Asia" defaultTab="transfers" compactHeader lang={lang} />

              <TravelIntelligence
                pageTitle={
                  isBn
                    ? "বাংলাদেশ থেকে Hajj, Umrah ও বিদেশ ভ্রমণের প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"
                    : "Hajj, Umrah & Outbound Preparation from Bangladesh — Verified FAQs"
                }
                quickAnswer={
                  isBn
                    ? "বাংলাদেশি নাগরিকদের ফরজ Hajj-এর জন্য অবশ্যই ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হবে। তবে বছরের যেকোনো সময় ৯০ দিনের Umrah e-Visa, ৯৬ ঘণ্টার Saudia/Flynas Stopover Visa অথবা US/UK/Schengen ভিসাধারীদের অনলাইন e-Visa এবং Nusuk App ব্যবহার করে নিজে নিজে কম খরচে DIY Umrah পালন করা যায়।"
                    : "Bangladeshi citizens must register via hajj.gov.bd for obligatory Hajj, while year-round Umrah can be planned independently using a 90-day Umrah e-Visa, a 96-hour Saudia/Flynas Stopover Visa, or a qualified US/UK/Schengen holder e-Visa, paired with the official Nusuk and Saudi Visa Bio apps."
                }
                keyFacts={[
                  {
                    label: isBn ? "Umrah e-Visa খরচ" : "Umrah e-Visa Cost",
                    value: isBn ? "BDT 15,500 – 19,500 (২–৫ দিন)" : "BDT 15,500 – 19,500 (2–5 Days)",
                  },
                  {
                    label: isBn ? "১০ দিনের DIY Umrah বাজেট" : "10-Day DIY Umrah Budget",
                    value: isBn ? "BDT 1,16,000 – 1,32,000 / জন" : "BDT 1,16,000 – 1,32,000 / Person",
                  },
                  {
                    label: isBn ? "বার্ষিক Card FX কোটা" : "Annual Card FX Quota",
                    value: "$12,000 USD / Adult Passport",
                  },
                  {
                    label: isBn ? "বাধ্যতামূলক Umrah অ্যাপ" : "Mandatory Umrah Apps",
                    value: "Saudi Visa Bio + Nusuk (nusuk.sa)",
                  },
                ]}
                faqs={localizedHajjFaqs}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            📖 DEDICATED SINGLE BLOG POST PAGE (/blog?slug=...)
        ------------------------------------------------------------- */}
        {section === "blog" && !isLanding && (
          <div className="space-y-10 animate-fade-in">
            {(() => {
              const activePost = localizedBlogs.find((p) => p.slug === parameterId) || localizedBlogs[0];
              const activeCoverImg = getBlogCoverImage(activePost.slug);
              const relatedPosts = localizedBlogs.filter((p) => p.slug !== activePost.slug).slice(0, 3);

              return (
                <>
                  {/* Top Navigation Bar: Back to All Blogs + Breadcrumb */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo("/blog")}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#102A43] hover:text-slate-900 bg-white border border-slate-200 hover:border-[#102A43] px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                      <span>
                        {isBn
                          ? `সবগুলো ট্রাভেল ব্লগে ফিরে যান (${localizedBlogs.length})`
                          : `Back to All Travel Guides (${localizedBlogs.length})`}
                      </span>
                    </button>

                    <nav className="text-slate-500 text-xs flex items-center gap-1.5 truncate max-w-full">
                      <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigateTo("/")}>
                        {isBn ? "হোম" : "Home"}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigateTo("/blog")}>
                        {isBn ? "ট্রাভেল ব্লগ" : "Travel Blog"}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span className="text-[#102A43] font-semibold truncate max-w-[240px] sm:max-w-md">
                        {activePost.title}
                      </span>
                    </nav>
                  </div>

                  {/* Single Article Hero Banner */}
                  <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0B1628] shadow-lg min-h-[280px] sm:min-h-[340px] flex items-end">
                    <img
                      src={activeCoverImg}
                      alt={activePost.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628] via-[#0B1628]/75 to-[#0B1628]/25" />

                    <div className="relative z-10 w-full p-6 sm:p-10 space-y-3 max-w-4xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                        <span className="font-semibold text-[#F6B73C]">{activePost.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activePost.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activePost.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{isBn ? `লেখক: ${activePost.author}` : `By ${activePost.author}`}</span>
                      </div>

                      <h1 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight text-balance">
                        {activePost.title}
                      </h1>
                    </div>
                  </div>

                  {/* Main Article 2-Column Layout (Content + Sticky Trip Planner Sidebar) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Full Article Content (8 Cols) */}
                    <article className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
                      {/* Executive Overview / Primary Description Box */}
                      <div className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl space-y-1.5">
                        <div className="text-xs font-semibold text-[#102A43]">
                          {isBn ? "মূল সারসংক্ষেপ (Article Summary)" : "Article Overview & Key Takeaway"}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {activePost.summary}
                        </p>
                      </div>

                      {/* Full Long-Form Verified Guide Content with Semantic H2 / H3 Hierarchy for SEO */}
                      <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-5 text-[15px] sm:text-[16px] font-sans">
                        {activePost.content.split("\n\n").map((block, bIdx) => {
                          const trimmed = block.trim();
                          if (!trimmed) return null;

                          // Major numbered section heading -> Semantic H2
                          if (/^([0-9]+|[০-৯]+)\.\s+/.test(trimmed) && trimmed.length < 160 && !trimmed.includes("\n")) {
                            return (
                              <h2
                                key={bIdx}
                                className="font-serif text-xl sm:text-2xl font-bold text-[#102A43] pt-4 pb-1 border-b border-slate-100"
                              >
                                {trimmed}
                              </h2>
                            );
                          }

                          // Sub-heading (Step, Option, Route, Tier, Zone, or short title ending with colon) -> Semantic H3
                          if (
                            (/^(Step|Option|Tier|Zone|Route|Phase|Tip|ধাপ|অপশন|রুট|টিপস)\s+/i.test(trimmed) ||
                              (trimmed.endsWith(":") && trimmed.length < 110)) &&
                            !trimmed.includes("\n")
                          ) {
                            return (
                              <h3
                                key={bIdx}
                                className="font-serif text-lg sm:text-xl font-bold text-[#102A43] pt-2"
                              >
                                {trimmed}
                              </h3>
                            );
                          }

                          // Multi-line block where the first line is a numbered H2 heading followed by body/bullets
                          const lines = trimmed.split("\n");
                          const firstLine = lines[0].trim();
                          const isFirstLineH2 =
                            /^([0-9]+|[০-৯]+)\.\s+/.test(firstLine) && firstLine.length < 160;
                          const isFirstLineH3 =
                            !isFirstLineH2 &&
                            lines.length > 1 &&
                            firstLine.length < 120 &&
                            (firstLine.endsWith(":") ||
                              /^(Step|Option|Tier|Zone|Route|Phase|Tip|ধাপ|অপশন|রুট|টিপস)\s+/i.test(firstLine));

                          const remainingLines =
                            isFirstLineH2 || isFirstLineH3 ? lines.slice(1) : lines;

                          const bulletLines = remainingLines.filter((l) =>
                            /^(-|•|\*)\s+/.test(l.trim())
                          );
                          const isMostlyBullets =
                            remainingLines.length > 0 &&
                            bulletLines.length === remainingLines.length;

                          return (
                            <div key={bIdx} className="space-y-3">
                              {isFirstLineH2 && (
                                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#102A43] pt-4 pb-1 border-b border-slate-100">
                                  {firstLine}
                                </h2>
                              )}
                              {isFirstLineH3 && (
                                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#102A43] pt-2">
                                  {firstLine}
                                </h3>
                              )}
                              {isMostlyBullets ? (
                                <ul className="space-y-2 pl-5 list-disc text-slate-700 marker:text-[#D4941A]">
                                  {remainingLines.map((item, iIdx) => (
                                    <li key={iIdx} className="leading-relaxed">
                                      {item.trim().replace(/^(-|•|\*)\s+/, "")}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                remainingLines.map((line, lIdx) => {
                                  const cleanLine = line.trim();
                                  if (!cleanLine) return null;
                                  if (/^(-|•|\*)\s+/.test(cleanLine)) {
                                    return (
                                      <div
                                        key={lIdx}
                                        className="flex items-start gap-2.5 pl-2 text-slate-700"
                                      >
                                        <span className="text-[#D4941A] font-bold mt-1">•</span>
                                        <span className="leading-relaxed">
                                          {cleanLine.replace(/^(-|•|\*)\s+/, "")}
                                        </span>
                                      </div>
                                    );
                                  }
                                  return (
                                    <p key={lIdx} className="leading-relaxed text-slate-800">
                                      {cleanLine}
                                    </p>
                                  );
                                })
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Contextual Affiliate Widget */}
                      {activePost.affiliateCTA && (
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 text-left">
                          <h3 className="text-xs font-bold text-[#102A43]">
                            {activePost.affiliateCTA.headline}
                          </h3>
                          <p className="text-xs text-slate-600">{activePost.affiliateCTA.body}</p>
                          {activePost.affiliateCTA.provider === "klook" ? (
                            <KlookActivitiesWidget />
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

                      {/* Internal SEO Links to Related Calculators & Guides */}
                      <div className="pt-6 border-t border-slate-200 space-y-3">
                        <div className="text-xs font-bold text-[#102A43]">
                          {isBn
                            ? "সংশ্লিষ্ট ক্যালকুলেটর ও প্রয়োজনীয় গাইড"
                            : "Related Calculators & Next Steps on URAL"}
                        </div>
                        <div className="flex flex-wrap gap-2.5 text-xs">
                          {activePost.internalLinks.map((lnk, idx) => (
                            <button
                              key={idx}
                              id={`blog-inner-link-${idx}`}
                              onClick={() => navigateTo(lnk.path)}
                              className="bg-slate-100 hover:bg-[#102A43] text-[#102A43] hover:text-white border border-slate-200 px-3.5 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                            >
                              <Link2 size={13} className="text-[#D4941A]" />
                              <span>{lnk.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Visible Hajj & Umrah Preparation FAQs (Matches JSON-LD FAQPage Schema 100%) */}
                      {(activePost.slug === "umrah-hajj-guide-bangladesh-nusuk-bdt-cost" ||
                        activePost.slug === "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh") && (
                        <TravelIntelligence
                          pageTitle={
                            isBn
                              ? "বাংলাদেশ থেকে Umrah ও Hajj প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"
                              : "Umrah & Hajj Preparation from Bangladesh — Verified FAQs"
                          }
                          quickAnswer={
                            isBn
                              ? "বাংলাদেশি নাগরিকদের ফরজ Hajj-এর জন্য অবশ্যই ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হবে। তবে বছরের যেকোনো সময় ৯০ দিনের Umrah e-Visa, ৯৬ ঘণ্টার Saudia/Flynas Stopover Visa অথবা US/UK/Schengen ভিসাধারীদের অনলাইন e-Visa এবং Nusuk App ব্যবহার করে নিজে নিজে কম খরচে DIY Umrah পালন করা যায়।"
                              : "Bangladeshi citizens must register via hajj.gov.bd for obligatory Hajj, while year-round Umrah can be planned independently using a 90-day Umrah e-Visa, a 96-hour Saudia/Flynas Stopover Visa, or a qualified US/UK/Schengen holder e-Visa, paired with the official Nusuk and Saudi Visa Bio apps."
                          }
                          keyFacts={[
                            {
                              label: isBn ? "Umrah e-Visa খরচ" : "Umrah e-Visa Cost",
                              value: isBn ? "BDT 15,500 – 19,500 (২–৫ দিন)" : "BDT 15,500 – 19,500 (2–5 Days)",
                            },
                            {
                              label: isBn ? "১০ দিনের DIY Umrah বাজেট" : "10-Day DIY Umrah Budget",
                              value: isBn ? "BDT 1,16,000 – 1,32,000 / জন" : "BDT 1,16,000 – 1,32,000 / Person",
                            },
                            {
                              label: isBn ? "বাধ্যতামূলক অ্যাপ" : "Mandatory Apps",
                              value: "Saudi Visa Bio + Nusuk (nusuk.sa)",
                            },
                          ]}
                          faqs={localizedHajjFaqs}
                        />
                      )}
                    </article>

                    {/* Right Column: Sticky Trip Planning & BDT Support Sidebar (4 Cols) */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                      {/* Direct WhatsApp BDT Booking Desk Card */}
                      <div className="bg-[#102A43] text-white rounded-2xl p-6 space-y-4 shadow-sm">
                        <div className="text-xs font-semibold text-[#F6B73C]">
                          {isBn
                            ? "Dual-Currency Card নেই? BDT-তে বুক করুন"
                            : "No Dual-Currency Card? Pay in BDT"}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-white leading-snug">
                          {isBn
                            ? "WhatsApp-এর মাধ্যমে বাংলাদেশি টাকায় Flight, Umrah Hotel ও Transfer বুক করুন"
                            : "Book Flights, Umrah Hotels & Transfers in BDT via WhatsApp"}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {isBn
                            ? "আমাদের ঢাকা সাপোর্ট ডেস্কের মাধ্যমে দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad ব্যবহার করে আপনার রাউন্ডট্রিপ বিমান টিকিট, মক্কা/মদিনা বা এশিয়ার হোটেল ভাউচার এবং এয়ারপোর্ট পিকআপ বুক করতে পারেন।"
                            : "Our Dhaka support desk can issue your roundtrip air tickets, Makkah/Madinah or Asian hotel vouchers, and airport transfers using local bank transfer, bKash, or Nagad."}
                        </p>
                        <a
                          href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20was%20reading%20your%20travel%20guide%20and%20need%20help%20planning%20my%20trip!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <span>
                            {isBn
                              ? "WhatsApp-এ মেসেজ দিন (+8801784385335)"
                              : "Chat on WhatsApp (+8801784385335)"}
                          </span>
                        </a>
                      </div>

                      {/* Quick Partner Booking Tools */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                        <div className="text-xs font-bold text-slate-800">
                          {isBn ? "নিজে নিজে অনলাইন বুকিং লিংক" : "Self-Service Booking Links"}
                        </div>
                        <div className="space-y-2.5">
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.aviasales}
                            label={isBn ? "ঢাকা থেকে Flight ভাড়া তুলনা করুন" : "Compare flights from Dhaka"}
                            variant="dark"
                          />
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.welcomePickups}
                            label={isBn ? "Airport Meet & Greet পিকআপ বুক করুন" : "Pre-book airport Meet & Greet"}
                            variant="dark"
                          />
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.klook}
                            label={isBn ? "Tours ও Theme Park টিকিট বুক করুন" : "Book tours & attraction passes"}
                            variant="dark"
                          />
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.airalo}
                            label={isBn ? "ফ্লাইটের আগে Travel eSIM নিন" : "Get a travel eSIM before flying"}
                            variant="dark"
                          />
                        </div>
                      </div>

                      {/* More Guides List in Sidebar */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            {isBn ? "আরও ট্রাভেল গাইড" : "More Travel Guides"}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigateTo("/blog")}
                            className="text-xs font-semibold text-[#102A43] hover:underline cursor-pointer"
                          >
                            {isBn ? `সব দেখুন (${localizedBlogs.length})` : `View All (${localizedBlogs.length})`}
                          </button>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {localizedBlogs
                            .filter((p) => p.slug !== activePost.slug)
                            .slice(0, 5)
                            .map((post) => (
                              <button
                                key={post.id}
                                type="button"
                                onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                                className="w-full text-left py-3 first:pt-1 last:pb-0 group cursor-pointer space-y-1"
                              >
                                <div className="text-[11px] text-slate-500">
                                  {post.category} · {post.readTime}
                                </div>
                                <div className="text-xs font-semibold text-slate-800 group-hover:text-[#102A43] line-clamp-2 leading-snug">
                                  {post.title}
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    </aside>
                  </div>

                  {/* Bottom Section: 3 More Blog Cards in One Row */}
                  <div className="pt-10 border-t border-slate-200 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-[#102A43]">
                          {isBn ? "আরও পড়ুন" : "Continue Reading"}
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-slate-900">
                          {isBn
                            ? "বাংলাদেশি ভ্রমণকারীদের জন্য আরও প্রয়োজনীয় গাইড"
                            : "More Travel Guides for Bangladeshi Flyers"}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateTo("/blog")}
                        className="self-start sm:self-end bg-[#102A43] text-white text-xs font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isBn
                            ? `সবগুলো ব্লগ গাইড দেখুন (${localizedBlogs.length})`
                            : `Back to All ${localizedBlogs.length} Blog Guides`}
                        </span>
                        <ArrowRight size={13} className="text-[#F6B73C]" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((post) => {
                        const relatedWords = `${post.summary} ${post.content.replace(/\n+/g, " ")}`
                          .replace(/\s+/g, " ")
                          .trim()
                          .split(" ");
                        const relatedExcerpt =
                          relatedWords.length > 150
                            ? `${relatedWords.slice(0, 150).join(" ").replace(/[.,;:!?-]+$/, "")}...`
                            : relatedWords.join(" ");

                        return (
                          <article
                            key={post.id}
                            onClick={() => navigateTo(`/blog?slug=${post.slug}`)}
                            className="group bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between cursor-pointer transition-all"
                          >
                            <div>
                              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                                <img
                                  src={getBlogCoverImage(post.slug)}
                                  alt={post.title}
                                  referrerPolicy="no-referrer"
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-5 space-y-2.5">
                                <div className="text-xs text-slate-500">
                                  {post.category} · {post.readTime}
                                </div>
                                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#102A43] leading-snug">
                                  {post.title}
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  {relatedExcerpt}
                                </p>
                              </div>
                            </div>
                            <div className="px-5 pb-5 pt-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateTo(`/blog?slug=${post.slug}`);
                                }}
                                className="w-full bg-[#102A43] group-hover:bg-[#F6B73C] text-white group-hover:text-[#0F172A] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                              >
                                <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন · Read Full Blog" : "Read Full Blog"}</span>
                                <ArrowRight size={13} />
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

      {/* 🟦 CONTENT & GROWTH: 4 FEATURED BANGLADESHI TRAVEL GUIDES IN ONE ROW */}
      {section !== "blog" && (
        <section
          id="content-and-growth-hub"
          className="mt-20 pt-16 border-t border-slate-200/80 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#102A43]">
                  {isBn ? "ট্রাভেল গাইড ও ব্লগ হাব" : "Content & Growth Hub"}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isBn ? "বাংলাদেশি ভ্রমণকারীদের শীর্ষ সার্চ টপিক (2026)" : "Bangladeshi Search Trends (2026)"}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য সবচেয়ে জরুরি ৪টি ট্রাভেল ও Umrah গাইড"
                  : "High-Demand Travel Guides Built for Bangladeshi Searchers"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isBn
                  ? "Dual-Currency Card Endorsement, কম খরচে ফ্যামিলি ট্যুর, নিজে নিজে Umrah প্রস্তুতি এবং Dhaka Airport Immigration-এর যাচাইকৃত গাইড।"
                  : "Verified step-by-step guides answering the top banking, family budget, Umrah, and Dhaka airport immigration questions."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo("/blog")}
              className="self-start sm:self-end bg-[#102A43] hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {isBn
                  ? `সবগুলো ব্লগ দেখুন (${localizedBlogs.length})`
                  : `View More Blogs (${localizedBlogs.length})`}
              </span>
              <ArrowRight size={13} className="text-[#F6B73C]" />
            </button>
          </div>

          {/* Strictly 4 Featured Blog Topics in a Single Row on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGrowthTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => navigateTo(`/blog?slug=${topic.slug}`)}
                className="group bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="font-semibold text-[#102A43]">{topic.category}</span>
                  </div>

                  <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50/70 border border-emerald-200/60 rounded-md px-2.5 py-1 truncate">
                    {topic.searchQuery}
                  </p>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#102A43] leading-snug">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                    {topic.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#102A43] group-hover:text-[#D4941A] transition-colors">
                  <span>{isBn ? "সম্পূর্ণ গাইড পড়ুন" : "Read Full Guide"}</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </section>
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
                {isBn ? "সরাসরি সাপোর্ট হটলাইন" : "Direct Assistance Hotline"}
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                {isBn ? "সরাসরি আমাদের সাথে যোগাযোগ করুন" : "Let's Connect Directly"}
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {isBn
                  ? "ফ্লাইট বুকিং, ভিসা প্রসেসিং, কিংবা Umrah ও ট্যুর প্যাকেজ সম্পর্কে জানতে চান? সরাসরি কল করুন, WhatsApp-এ মেসেজ দিন অথবা নিচের ফর্মটি পূরণ করুন। আমরা দ্রুততম সময়ে উত্তর দিই!"
                  : "Have inquiries about flight bookings, visa procedures, or destination travel packages? Contact our director directly through Call, WhatsApp, or the interactive travel inquiry form below. We respond instantly!"}
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
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isBn ? "সরাসরি WhatsApp চ্যাট করুন" : "Start Direct Chat"}
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBn
                    ? "কাস্টম সাপোর্ট পাওয়ার সবচেয়ে দ্রুত মাধ্যম। ভিসা চেকলিস্ট, রিটার্ন এয়ার টিকেট বা হোটেল বুকিংয়ের জন্য মেসেজ দিন।"
                    : "The fastest way to get custom support. Ask visa questions, seek roundtrip ticket packages, or request customized hotel bookings."}
                </p>
                <a 
                  href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  {isBn ? "WhatsApp-এ মেসেজ দিন (+8801784385335)" : "Chat on WhatsApp (+8801784385335)"}
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
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isBn ? "সরাসরি ফোনে কথা বলুন" : "Direct Mobile Support"}
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBn
                    ? "সরাসরি আমাদের ডেস্কের সাথে কথা বলুন। ভিসা ডকুমেন্ট যাচাই, লাইভ ফ্লাইট ভাড়া এবং বিশ্বস্ত পরামর্শ পান।"
                    : "Talk directly to the director. Get immediate verification of requirements, active flight check comparisons, and reliable counsel."}
                </p>
                <a 
                  href="tel:+8801784385335" 
                  className="inline-flex items-center gap-2 bg-[#102A43] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  {isBn ? "সরাসরি কল করুন (+8801784385335)" : "Call Directly (+8801784385335)"}
                </a>
              </div>
            </div>

          </div>

          {/* Travel Inquiry Contact Form & Verification Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Form (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  {isBn ? "আপনার ভ্রমণ জিজ্ঞাসা পাঠান" : "Send an Interactive Travel Inquiry"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn ? "আপনার গন্তব্য এবং কী ধরনের সহায়তা প্রয়োজন তা উল্লেখ করুন, আমরা দ্রুত কলব্যাক করব।" : "Specify your target destination and desired assistance type to receive a custom callback."}
                </p>
              </div>

              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-sm shadow-emerald-500/20">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {isBn ? "আপনার বার্তা সফলভাবে গৃহীত হয়েছে!" : "Inquiry Received Successfully!"}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      {isBn ? (
                        <>
                          ধন্যবাদ <b>{contactName}</b>। আপনার <b>{contactSubject}</b> সংক্রান্ত অনুরোধটি নথিভুক্ত হয়েছে। আমরা দ্রুত <b>{contactPhone}</b> নাম্বারে কল বা WhatsApp-এ যোগাযোগ করব।
                        </>
                      ) : (
                        <>
                          Thank you <b>{contactName}</b>. Your request regarding <b>{contactSubject}</b> has been registered. We will contact you at <b>{contactPhone}</b> via Call and WhatsApp shortly.
                        </>
                      )}
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
                    {isBn ? "আরেকটি জিজ্ঞাসা পাঠান" : "Send Another Inquiry"}
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!contactName || !contactPhone) {
                      return;
                    }
                    setContactLoading(true);
                    
                    try {
                      // POST to FormSubmit.co AJAX endpoint to route the inquiry safely and for free to your email
                      await fetch("https://formsubmit.co/ajax/farhan.momen@gmail.com", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                        },
                        body: JSON.stringify({
                          Name: contactName,
                          "Phone / WhatsApp": contactPhone,
                          "Assistance Category": contactSubject,
                          "Travel Destination": contactDestination,
                          Message: contactMessage,
                          "_subject": `New URAL Travel Inquiry from ${contactName}`,
                          "_template": "table"
                        })
                      });
                    } catch (err) {
                      console.warn("Direct email delivery through FormSubmit was blocked or offline, simulating success locally:", err);
                    } finally {
                      setContactLoading(false);
                      setContactSubmitted(true);
                    }
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "আপনার নাম" : "Full Name"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isBn ? "যেমন: Farhan Momen" : "e.g. Farhan Momen"}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "ফোন বা WhatsApp নাম্বার" : "Phone or WhatsApp Number"} <span className="text-red-500">*</span>
                      </label>
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
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "সহায়তার বিষয়" : "Subject / Assistance Category"}
                      </label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Visa Processing Checklist">{isBn ? "ভিসা প্রসেসিং চেকলিস্ট" : "Visa Processing Checklist"}</option>
                        <option value="Cheap Flight Package comparison">{isBn ? "সাশ্রয়ী ফ্লাইট টিকেট তুলনা" : "Cheap Flight Package comparison"}</option>
                        <option value="Custom Group Itinerary planning">{isBn ? "ফ্যামিলি বা গ্রুপ ট্যুর প্ল্যানিং" : "Custom Group Itinerary planning"}</option>
                        <option value="Hotel Booking Assistance">{isBn ? "হোটেল বুকিং সহায়তা (BDT)" : "Hotel Booking Assistance"}</option>
                        <option value="Umrah & Makkah/Madinah Booking">{isBn ? "Umrah ভিসা ও Makkah/Madinah হোটেল" : "Umrah & Makkah/Madinah Booking"}</option>
                      </select>
                    </div>

                    {/* Target Destination */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "ভ্রমণ গন্তব্য" : "Travel Destination"}
                      </label>
                      <select
                        value={contactDestination}
                        onChange={(e) => setContactDestination(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-[#102A43] rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Saudi Arabia (Umrah / Hajj)">Saudi Arabia (Umrah / Hajj) 🇸🇦</option>
                        <option value="Nepal">Nepal 🇳🇵</option>
                        <option value="Thailand">Thailand 🇹🇭</option>
                        <option value="Malaysia">Malaysia 🇲🇾</option>
                        <option value="Singapore">Singapore 🇸🇬</option>
                        <option value="Maldives">Maldives 🇲🇻</option>
                        <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                        <option value="Other / Multi-Destination">Other / Multi-Destination 🌍</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isBn ? "আপনার বার্তা / বিশেষ প্রয়োজন" : "Your Message / Specific Requirements"}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={
                        isBn
                          ? "আপনার সম্ভাব্য ভ্রমণের তারিখ, যাত্রীর সংখ্যা বা বাজেট সম্পর্কে লিখুন যাতে আমরা সঠিক তথ্য দিয়ে সাহায্য করতে পারি..."
                          : "Please write down your budget constraints, travel dates, or special assistance needs so we can guide you effectively..."
                      }
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
                        <span>{isBn ? "পাঠানো হচ্ছে..." : "Processing Inquiry..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{isBn ? "জিজ্ঞাসা সাবমিট করুন" : "Submit Travel Inquiry"}</span>
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
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isBn ? "কেন সরাসরি URAL-এর সাথে কথা বলবেন?" : "Why Contact URAL Directly?"}
                </h3>
                
                <div className="space-y-3.5 text-xs text-slate-650">
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p>
                      {isBn ? (
                        <>
                          <b>১০০% ফ্রি পরামর্শ:</b> ভিসা ডকুমেন্ট চেক বা কম ভাড়ার ফ্লাইট খোঁজার জন্য আমরা কোনো কনসালটেশন ফি নিই না।
                        </>
                      ) : (
                        <>
                          <b>100% Free Consultation:</b> We never charge any fees to verify visa documents or search for cheap flights.
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p>
                      {isBn ? (
                        <>
                          <b>ভেরিফায়েড পার্টনার নেটওয়ার্ক:</b> অনুমোদিত ভিসা ডেস্ক এবং বিশ্বস্ত ট্রাভেল অপারেটরের মাধ্যমে নিরাপদ বুকিং।
                        </>
                      ) : (
                        <>
                          <b>Authorized Referrals:</b> Connect to approved visa processing desks and Travelpayouts verified operators.
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p>
                      {isBn ? (
                        <>
                          <b>দ্রুত কলব্যাক:</b> ফর্ম সাবমিট করার ১–২ ঘণ্টার মধ্যে আমাদের টিম সরাসরি কল বা WhatsApp-এ যোগাযোগ করে।
                        </>
                      ) : (
                        <>
                          <b>Direct Callback:</b> Bangladeshi tourists receive a personal callback within 1-2 hours of submission.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-250 p-4 rounded-xl border border-slate-300 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">DIRECT DIAL DESK</span>
                <span className="text-sm font-serif font-black text-[#102A43] block">+8801784385335</span>
                <span className="text-[9px] text-slate-400 block">
                  {isBn ? "২৪/৭ WhatsApp মেসেঞ্জারে সচল" : "Available 24/7 on WhatsApp Messenger"}
                </span>
              </div>
            </div>

          </div>

          {/* Contact & Booking Consultation FAQs */}
          <TravelIntelligence
            pageTitle={isBn ? "ট্রাভেল বুকিং সহায়তা ও সাপোর্ট ডেস্ক" : "Travel Booking Assistance & Desk Support"}
            quickAnswer={
              isBn
                ? "URAL বাংলাদেশি ভ্রমণকারীদের জন্য ট্যুর প্ল্যানিং, ভিসা ডকুমেন্ট রিভিউ এবং সরাসরি এজেন্সি বুকিং সহায়তা প্রদান করে (+8801784385335 WhatsApp ও হটলাইন)। ফ্লাইট টিকেট ও হোটেল বুকিংয়ের পেমেন্ট bKash, Nagad বা লোকাল ব্যাংক ট্রান্সফারের মাধ্যমে বাংলাদেশি টাকায় (BDT) সম্পন্ন করা যায়।"
                : "URAL connects Bangladeshi travelers with dedicated itinerary planning, visa checklist reviews, and direct agency booking services via WhatsApp (+8801784385335) and hotline. All ticket and hotel payments can be completed safely in BDT via domestic banking, bKash, or in person."
            }
            keyFacts={[
              { label: isBn ? "হেল্পলাইন" : "Helpline", value: "+8801784385335 (Direct / WhatsApp)" },
              { label: isBn ? "রেসপন্স সময়" : "Response Window", value: "15 to 30 Mins (Dhaka Time)" },
              { label: isBn ? "পেমেন্ট মাধ্যম" : "Payment Flexibility", value: "BDT (bKash / Nagad / Bank Transfer)" },
              { label: isBn ? "ভেরিফিকেশন" : "Desk Verification", value: "Verified IATA Agency Network" }
            ]}
            faqs={SERVICE_CONTACT_FAQS}
          />

        </div>
      )}

      {/* -------------------------------------------------------------
          🎟️ VIEW 11: GLOBAL ATTRACTIONS & SKIP-THE-LINE HUB (TIQETS & KLOOK)
      ------------------------------------------------------------- */}
      {section === "experiences" && (
        <ExperiencesPage lang={lang} onNavigate={navigateTo} />
      )}

      {/* -------------------------------------------------------------
          🕋 VIEW 12: DEDICATED UMRAH & HAJJ PAID-ADS LANDING PAGE
      ------------------------------------------------------------- */}
      {section === "umrah" && (
        <UmrahLandingPage
          lang={lang}
          localizedHajjFaqs={localizedHajjFaqs}
          onNavigate={navigateTo}
          coverImage={umrahMakkahImg}
        />
      )}

      {/* -------------------------------------------------------------
          🗺️ VIEW 10: DYNAMIC XML & HTML SITEMAP DIRECTORY
      ------------------------------------------------------------- */}
      {section === "sitemap" && (
        <SitemapPage onNavigate={navigateTo} />
      )}

      </main>

      {/* 🔮 MASTER FOOTER BLOCK */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="bg-white/10 text-white p-1.5 rounded-lg shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 18.5c-.5-3-4-7-9-7.5 5-1 8-4.5 9-7.5 1 3 4 6.5 9 7.5-5 .5-8.5 4.5-9 7.5z" />
                </svg>
              </div>
              <span className="font-serif font-bold text-base text-white">URAL Travel Intelligence</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              {isBn
                ? "বাংলাদেশি ভ্রমণকারীদের জন্য ফ্লাইট ভাড়া, হোটেল গাইড, ভিসা চেকলিস্ট, Umrah প্রস্তুতি এবং BDT ট্রিপ বাজেট।"
                : "Flight prices, hotel guides, visa steps, and trip budgets — built for travelers from Bangladesh."}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => navigateTo("/sitemap")}
                className="text-[#F6B73C] hover:underline cursor-pointer"
              >
                HTML & XML Sitemap
              </button>
              <span aria-hidden="true">·</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white hover:underline"
              >
                sitemap.xml
              </a>
            </div>
            <p className="text-[10px] font-mono text-slate-500">
              {isBn
                ? "© 2026 URAL Platforms. বাংলাদেশ থেকে আন্তর্জাতিক ফ্লাইট রুট, ভিসা চেকলিস্ট ও হোটেল গাইড।"
                : "© 2026 URAL Platforms. Outbound flight routes, visa checklists, and hotel guides from Bangladesh."}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "জনপ্রিয় ফ্লাইট রুট" : "Flights Destination Directory"}
            </span>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => navigateTo("/flights?route=dhaka-kathmandu")} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Kathmandu (KTM)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-bangkok")} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Bangkok (BKK)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-kuala-lumpur")} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Kuala Lumpur (KUL)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-singapore")} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Singapore (SIN)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-maldives")} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Malé, Maldives (MLE)</button></li>
              <li><button onClick={() => navigateTo("/flights?route=dhaka-dubai")} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Dubai (DXB)</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "Visa Guides by Country"}
            </span>
            <ul className="space-y-1 text-xs">
              <li><button onClick={() => navigateTo("/visa?country=nepal-visa")} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Nepal ফ্রি Visa on Arrival" : "Nepal Free Visa on Arrival"}</button></li>
              <li><button onClick={() => navigateTo("/visa?country=maldives-visa")} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Maldives ফ্রি VOA + IMUGA" : "Maldives Free VOA + IMUGA"}</button></li>
              <li><button onClick={() => navigateTo("/visa?country=thailand-visa")} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Thailand অফিসিয়াল e-Visa" : "Thailand Official e-Visa"}</button></li>
              <li><button onClick={() => navigateTo("/visa?country=malaysia-visa")} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Malaysia অনলাইন eVisa" : "Malaysia Online eVisa"}</button></li>
              <li><button onClick={() => navigateTo("/visa?country=singapore-visa")} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Singapore অনুমোদিত এজেন্ট ভিসা" : "Singapore Authorized Agent Visa"}</button></li>
              <li><button onClick={() => navigateTo("/visa?country=dubai-visa")} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "UAE Dubai ট্যুরিস্ট eVisa" : "UAE Dubai Tourist eVisa"}</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "ট্রাভেল সার্ভিস পার্টনার" : "Travel Services"}
            </span>
            <ul className="space-y-1 text-xs">
              <li><a href={AFFILIATE_LINKS.tiqets} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Europe, UK & USA Passes (Tiqets)</a></li>
              <li><a href={AFFILIATE_LINKS.klook} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Asia & Dubai Tours (Klook)</a></li>
              <li><a href={AFFILIATE_LINKS.airhelp} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Flight Delay Compensation (AirHelp · Code AHTPO11)</a></li>
              <li><a href={AFFILIATE_LINKS.welcomePickups} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Welcome Pickups (Meet & Greet)</a></li>
              <li><a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Kiwitaxi Airport Transfers</a></li>
              <li><a href={AFFILIATE_LINKS.qeeq} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Car Rental (QEEQ)</a></li>
              <li><a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Local Travel eSIM (Airalo)</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "সরাসরি সাপোর্ট ও যোগাযোগ" : "Direct Support & Contact"}
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400">💬</span>
                <a href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline text-emerald-400 font-mono font-bold">WhatsApp: 01784385335</a>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#F6B73C]">📞</span>
                <a href="tel:+8801784385335" className="hover:text-white hover:underline text-[#F6B73C] font-mono font-bold">Direct Call: +8801784385335</a>
              </div>
              <div className="pt-1">
                <button onClick={() => navigateTo("/contact")} className="bg-slate-800 text-[#F6B73C] hover:bg-slate-700 px-3 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-wide cursor-pointer transition-colors">
                  {isBn ? "যোগাযোগ ফর্ম পেজ" : "Contact Form Page"}
                </button>
              </div>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              {isBn ? (
                <>
                  <b>স্বচ্ছতা:</b> আমাদের সাইটের পার্টনার লিংকের মাধ্যমে বুকিং সম্পন্ন হলে আপনার অতিরিক্ত কোনো খরচ ছাড়াই URAL সামান্য কমিশন পেতে পারে।
                </>
              ) : (
                <>
                  <b>Transparency:</b> URAL earns a small commission on travel reservations completed via links on our site, at no extra cost to you.
                </>
              )}
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

      {/* Direct Floating WhatsApp Contact Launcher */}
      <WhatsAppSupport lang={lang} />

      {/* Flight Price Drop Alert Modal */}
      <PriceAlertModal
        isOpen={isPriceAlertOpen}
        onClose={() => setIsPriceAlertOpen(false)}
        lang={lang}
        defaultDestination={alertDestination}
      />

    </div>
  );
}
