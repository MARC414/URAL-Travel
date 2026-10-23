import React, { useState, useEffect, useRef } from "react";
import { initGlobalClickTracking } from "./utils/analytics";
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
  ChevronDown,
  Sparkles,
  Link2,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
  BarChart3,
  Calculator,
  ShieldCheck,
  MessageSquare,
  Ticket,
  CreditCard,
  FileText,
  Bell,
  Copy,
  Check,
  Car,
  Wifi,
  Zap,
  Lightbulb,
  AlertTriangle
} from "lucide-react";

// Types
import { FlightRoute, HotelGuide, VisaGuide, DestinationGuide, TripCostData, BlogPost } from "./types";

// Database Constants
import { BLOG_SLUGS } from "./data/blogIndex";
import { SCHEDULED_BLOG_COVER_IMAGES } from "./data/scheduledBlogIndex.generated";
import { SCHEDULED_BLOG_SNIPPETS } from "./data/scheduledBlogSeo.generated";
import type { BankingFaq } from "./data/bankingHubFaqs";
import { HOME_FAQS, HOME_FAQ_HEADING } from "./data/homeFaqs";

// Subcomponents
import { TravelIntelligence } from "./components/AeoInspector";
import {
  KiwitaxiTransferWidget,
  WelcomePickupsWidget,
  AiraloEsimWidget,
  KlookActivitiesWidget,
  QeeqCarRentalWidget,
  PartnerLinkButton,
  RadicalStorageContextualCallout,
  MultiPartnerBlogCallout,
  TravelpayoutsReferralCallout,
  AFFILIATE_LINKS,
  AIRHELP_PROMO,
  KKDAY_PROMO,
  isPromoActive,
  resolvePartnerUrl,
  sanitizeExpiredPromoText,
} from "./components/AffiliatePartners";
import {
  useSeoMeta,
  generateFAQSchema,
  HAJJ_UMRAH_FAQS,
  buildFaqSchema,
  getFaqSchemaForPage,
  getPreDepartureFaqSchema,
  SERVICE_TOOLS_FAQS,
  SERVICE_CONTACT_FAQS,
  articleSchema,
  touristTripSchema,
  serviceSchema,
  productOfferSchema,
  collectionPageSchema,
} from "./hooks/useSeoMeta";
import { Language, translations } from "./translations";
import type * as BengaliContentModule from "./data/bengaliContent";
import { WhatsAppSupport, TopBarWhatsApp } from "./components/WhatsAppSupport";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { KKdayPromoBanner } from "./components/KKdayPromoBanner";
import { getBengaliSeoCopy, getSeoCopy } from "./utils/seoCopy";
import {
  isToolSlug,
  toolPathForTab,
  SLUG_TO_TOOL_TAB,
  TOOL_PAGE_SEO,
} from "./utils/toolRoutes";
import {
  BN_BREADCRUMB_LABELS,
  hasBengaliCounterpart,
  localizePublicSiteUrl,
  siteUrl,
  SITE_ORIGIN,
} from "./utils/localeRoutes";
import { AirHelpWidget } from "./components/AirHelpWidget";
import { TiqetsEmbedWidget } from "./components/TiqetsEmbedWidget";
import { ConsentBanner } from "./components/ConsentBanner";
import { generateBlogCoverAltText } from "./utils/imageAssets";
import { ResponsiveImage } from "./components/ResponsiveImage";
import { getRelatedBlogPosts } from "./utils/blogLinks";
import {
  faqPageNodeSchema,
  howToSchema,
  URAL_SOCIAL_LINKS,
  URAL_WIKIDATA_ENTITY_URL,
} from "./utils/schema";
import { getAuthorProfile } from "./data/authorProfiles";
import {
  getVisibleBlogFaqSection,
  getVisibleBlogHowTos,
} from "./utils/blogStructuredData";

const ENGLISH_FEATURED_GROWTH_TOPICS = [
  {
    id: "trend-umrah-hajj",
    category: "Religious Travel · 12 min",
    searchQuery: "“DIY Umrah cost & Nusuk guide Bangladesh”",
    title: "DIY Umrah from Bangladesh: Visa Routes, Nusuk Steps & Budget Checks",
    excerpt:
      "Conditional Umrah visa routes, application-to-permit steps and the limits of the historical budget. Use your own quotes for current totals; Hajj is a separate process.",
    slug: "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
  },
  {
    id: "trend-endorsement",
    category: "Banking & FX · 7 min",
    searchQuery: "“How to get dual-currency card endorsement”",
    title: "How to Get Dual-Currency Card Endorsement (2026 Passport Dollar Quota Guide)",
    excerpt:
      "Step-by-step guide to the $18,000 annual passport endorsement quota (Bangladesh Bank FEPD-1 Circular No. 33), endorsement and card activation, the $300 online-payment rule, and RFCD vs. travel-quota cards.",
    slug: "dual-currency-card-endorsement-bangladesh",
  },
  {
    id: "trend-family-budget",
    category: "Family & Budget · 7 min",
    searchQuery: "“Top budget-friendly family destinations from Dhaka”",
    title: "Top 6 Budget-Friendly Family Destinations from Dhaka (Ranked by 5-Day BDT Cost)",
    excerpt:
      "Compare Nepal (from ৳42k), Malaysia (from ৳68k), Thailand, Maldives Local Islands, Singapore, and Dubai by total family BDT cost, visa speed, and Halal dining.",
    slug: "top-budget-family-destinations-from-dhaka",
  },
  {
    id: "trend-dac-immigration",
    category: "Outbound Rules · 6 min",
    searchQuery: "“Dhaka airport immigration documents checklist”",
    title: "Dhaka Airport (DAC) Outbound Immigration Checklist: NOC, GO & First-Time Rules",
    excerpt:
      "Exact document folder checklist to clear Hazrat Shahjalal Airport emigration in under 2 minutes for job holders (NOC), govt staff (GO), business owners, and fresh passports.",
    slug: "dhaka-airport-outbound-immigration-checklist-noc-go",
  },
];

// Non-critical route & modal components loaded on demand to reduce initial JS parse/compile cost
const FlightsRouteView = React.lazy(() => import("./routes/FlightsRouteView"));
const HotelsRouteView = React.lazy(() => import("./routes/HotelsRouteView"));
const VisaRouteView = React.lazy(() => import("./routes/VisaRouteView"));
const DestinationsRouteView = React.lazy(() => import("./routes/DestinationsRouteView"));
const CostsRouteView = React.lazy(() => import("./routes/CostsRouteView"));
const ToolsRouteView = React.lazy(() => import("./routes/ToolsRouteView"));
const BlogIndexRouteView = React.lazy(() => import("./routes/BlogIndexRouteView"));
const BlogPostRouteView = React.lazy(() => import("./routes/BlogPostRouteView"));
const ContactRouteView = React.lazy(() => import("./routes/ContactRouteView"));
const AboutRouteView = React.lazy(() => import("./routes/AboutRouteView"));
const NotFoundRouteView = React.lazy(() => import("./routes/NotFoundRouteView"));
const VisaFreeCountriesRouteView = React.lazy(() => import("./routes/VisaFreeCountriesRouteView"));

const UmrahLandingPage = React.lazy(() =>
  import("./components/UmrahLandingPage").then((m) => ({ default: m.UmrahLandingPage }))
);
const BankingHubLandingPage = React.lazy(() =>
  import("./components/BankingHubLandingPage").then((m) => ({ default: m.BankingHubLandingPage }))
);
const KkdayHotelsPage = React.lazy(() =>
  import("./components/KkdayHotelsPage").then((m) => ({ default: m.KkdayHotelsPage }))
);
const ExperiencesPage = React.lazy(() =>
  import("./components/ExperiencesPage").then((m) => ({ default: m.ExperiencesPage }))
);
const GlobalAttractionsHub = React.lazy(() =>
  import("./components/GlobalAttractionsHub").then((m) => ({ default: m.GlobalAttractionsHub }))
);
const AttractionDetailPage = React.lazy(() =>
  import("./components/AttractionDetailPage").then((m) => ({ default: m.AttractionDetailPage }))
);
const SitemapPage = React.lazy(() =>
  import("./components/SitemapPage").then((m) => ({ default: m.SitemapPage }))
);
const PrivacyPolicyPage = React.lazy(() =>
  import("./components/PrivacyPolicyPage").then((m) => ({ default: m.PrivacyPolicyPage }))
);
const InteractiveTools = React.lazy(() =>
  import("./components/InteractiveTools").then((m) => ({ default: m.InteractiveTools }))
);
const TopicalAuthorityBlueprint = React.lazy(() =>
  import("./components/TopicalAuthorityBlueprint").then((m) => ({ default: m.TopicalAuthorityBlueprint }))
);
const TravelpayoutsOnboarding = React.lazy(() =>
  import("./components/TravelpayoutsOnboarding").then((m) => ({ default: m.TravelpayoutsOnboarding }))
);
const PriceAlertModal = React.lazy(() =>
  import("./components/PriceAlertModal").then((m) => ({ default: m.PriceAlertModal }))
);
const TravelpayoutsWidget = React.lazy(() => import("./components/TravelpayoutsWidget.jsx"));
const TravelpayoutsEmbed = React.lazy(() =>
  import("./components/TravelpayoutsEmbed").then((m) => ({ default: m.TravelpayoutsEmbed }))
);
const TravelpayoutsCustomWidget = React.lazy(() =>
  import("./components/TravelpayoutsCustomWidget").then((m) => ({ default: m.TravelpayoutsCustomWidget }))
);
const TrustpilotReviews = React.lazy(() =>
  import("./components/TrustpilotReviews").then((m) => ({ default: m.TrustpilotReviews }))
);
const TravelEssentials = React.lazy(() =>
  import("./components/TravelEssentials").then((m) => ({ default: m.TravelEssentials }))
);
const PartnerLogoMarquee = React.lazy(() =>
  import("./components/PartnerLogoMarquee").then((m) => ({ default: m.PartnerLogoMarquee }))
);

interface TravelpayoutsSkeletonProps {
  variant?: "flights" | "hotels";
  isBn?: boolean;
  onInteract?: () => void;
}

export function TravelpayoutsWidgetSkeleton({
  variant = "flights",
  isBn = false,
  onInteract,
}: TravelpayoutsSkeletonProps) {
  if (variant === "hotels") {
    return (
      <div
        // Observed by the readiness effect: the widget chunk is fetched when this
        // skeleton comes near the viewport, on interaction, or at the 2.5s ceiling.
        data-tp-skeleton="hotels"
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={
          isBn
            ? "হোটেল ভাড়া তুলনা উইজেট লোড হচ্ছে..."
            : "Loading Travelpayouts hotel comparison widget..."
        }
        onMouseDown={onInteract}
        onTouchStart={onInteract}
        onFocus={onInteract}
        className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-4 text-slate-900 select-none"
      >
        {/* Brand Navy Header Bar Skeleton */}
        <div className="bg-brand-navy p-3.5 sm:px-5 text-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <div className="h-9 w-32 rounded-lg bg-slate-800/90 animate-pulse" />
            <div className="h-9 w-32 rounded-lg bg-[#F6B73C]/85 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#F6B73C]" />
            <span>
              {isBn
                ? "লাইভ হোটেল রেট ইঞ্জিন প্রস্তুত হচ্ছে..."
                : "Initializing live hotel partner rates..."}
            </span>
          </div>
        </div>

        {/* 4-Column Hotel Search Controls Bar Skeleton */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            {[1, 2, 3].map((col) => (
              <div key={col} className="space-y-1.5">
                <div className="h-3.5 w-28 rounded bg-slate-200 animate-pulse" />
                <div className="h-[42px] w-full rounded-lg bg-white border border-slate-200 px-3 flex items-center">
                  <div className="h-3.5 w-3/4 rounded bg-slate-200 animate-pulse" />
                </div>
              </div>
            ))}
            <div className="h-[42px] w-full rounded-lg bg-[#F6B73C]/75 animate-pulse" />
          </div>
        </div>

        {/* Hotel Comparison Result Cards Skeleton */}
        <div className="p-4 sm:p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="h-4 w-56 rounded bg-slate-200 animate-pulse" />
            <div className="h-3.5 w-32 rounded bg-slate-100 animate-pulse" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((row) => (
              <div
                key={row}
                className="border border-slate-200 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-48 max-w-full rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-36 max-w-full rounded bg-slate-100 animate-pulse" />
                    <div className="flex gap-2 pt-0.5">
                      <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
                      <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                  <div className="space-y-1">
                    <div className="h-5 w-28 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
                  </div>
                  <div className="h-8 w-32 rounded-lg bg-brand-navy/80 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      // Observed by the readiness effect (see the state comment in the app
      // component): the widget chunk loads when this skeleton approaches the
      // viewport, on interaction, or at the 2.5s ceiling — not on a 260 ms timer.
      data-tp-skeleton="flights"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={
        isBn
          ? "ফ্লাইট সার্চ উইজেট লোড হচ্ছে..."
          : "Loading Travelpayouts flight search widget..."
      }
      onMouseDown={onInteract}
      onTouchStart={onInteract}
      onFocus={onInteract}
      className="w-full overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200/90 text-slate-900 select-none"
    >
      {/* 1. Popular Routes Bar Skeleton */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="h-3.5 w-20 rounded bg-slate-200 animate-pulse mr-1" />
          {[1, 2, 3, 4, 5].map((pill) => (
            <div
              key={pill}
              className="h-7 w-28 rounded-lg bg-slate-200/90 animate-pulse"
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#07C369]" />
          <span>
            {isBn
              ? "লাইভ এয়ারলাইন ভাড়া লোড হচ্ছে..."
              : "Initializing Travelpayouts live fares..."}
          </span>
        </div>
      </div>

      {/* 2. Main Interactive Search Form Skeleton */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-40 rounded-lg bg-slate-100 animate-pulse" />
            <div className="h-8 w-44 rounded-lg bg-slate-100 animate-pulse" />
          </div>
          <div className="h-8 w-44 rounded-lg bg-slate-100 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          <div className="md:col-span-3 space-y-1">
            <div className="h-3.5 w-36 rounded bg-slate-200 animate-pulse" />
            <div className="h-[58px] rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between">
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-28 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-40 rounded bg-slate-100 animate-pulse" />
              </div>
              <div className="h-5 w-10 rounded bg-slate-200 animate-pulse" />
            </div>
          </div>

          <div className="md:col-span-3 space-y-1">
            <div className="h-3.5 w-40 rounded bg-slate-200 animate-pulse" />
            <div className="h-[58px] rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-between">
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-36 rounded bg-slate-100 animate-pulse" />
              </div>
              <div className="h-5 w-10 rounded bg-[#F6B73C]/30 animate-pulse" />
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-2">
            {[1, 2].map((dateCol) => (
              <div key={dateCol} className="space-y-1">
                <div className="h-3.5 w-24 rounded bg-slate-200 animate-pulse" />
                <div className="h-[58px] rounded-xl bg-slate-50 border border-slate-200 p-3 flex flex-col justify-center gap-1.5">
                  <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                  <div className="h-3 w-20 rounded bg-slate-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 flex flex-col justify-end">
            <div className="h-[58px] w-full rounded-xl bg-[#07C369]/80 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 3. Results & Route Summary Skeleton */}
      <div className="p-4 sm:p-6 bg-slate-50/70 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="h-3.5 w-52 rounded bg-slate-200 animate-pulse" />
              <div className="h-5 w-64 rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="h-8 w-44 rounded-lg bg-[#F6B73C]/25 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((stat) => (
              <div
                key={stat}
                className="bg-slate-50 rounded-lg p-3 border border-slate-200/60 space-y-1.5"
              >
                <div className="h-3 w-32 rounded bg-slate-200 animate-pulse" />
                <div className="h-5 w-28 rounded bg-slate-200 animate-pulse" />
                <div className="h-3 w-40 rounded bg-slate-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="h-3.5 w-48 rounded bg-slate-200 animate-pulse" />
                <div className="h-3.5 w-24 rounded bg-slate-100 animate-pulse" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-brand-navy/85 animate-pulse shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-36 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
                  </div>
                </div>
                <div className="lg:col-span-6 flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="h-5 w-14 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3 w-16 rounded bg-slate-100 animate-pulse" />
                  </div>
                  <div className="flex-1 h-2 rounded bg-slate-200 animate-pulse mx-2" />
                  <div className="space-y-1 text-right">
                    <div className="h-5 w-14 rounded bg-slate-200 animate-pulse ml-auto" />
                    <div className="h-3 w-16 rounded bg-slate-100 animate-pulse ml-auto" />
                  </div>
                </div>
                <div className="lg:col-span-3 flex items-center lg:flex-col lg:items-end justify-between gap-2">
                  <div className="h-6 w-28 rounded bg-slate-200 animate-pulse" />
                  <div className="h-9 w-32 rounded-lg bg-[#07C369]/80 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const heroBgImage = "/assets/images/clouds_boat_hero_1781438671378-1200.webp";
const uralHeroBgImg = "/assets/images/ural_hero_bg_1781543111624-1200.webp";
const coxsBazarSunriseImg = "/assets/images/coxs_bazar_sunrise_1781620718331-1200.webp";
const nepalDestImg = "/assets/images/nepal_destination_1781544132297-1200.webp";
const bangkokDestImg = "/assets/images/bangkok_destination_1781544149435-1200.webp";
const klDestImg = "/assets/images/kl_destination_1781544164707-1200.webp";
const dubaiDestImg = "/assets/images/dubai_destination_1781544180311-1200.webp";
const singaporeDestImg = "/assets/images/singapore_destination_1790387270177-1200.webp";
const maldivesDestImg = "/assets/images/maldives_destination_1790387286896-1200.webp";
const blogHeroBannerImg = "/assets/images/blog_editorial_hero_banner_1790429994056-1200.webp";
const umrahMakkahImg = "/assets/images/umrah_makkah_haram_guide_1790430007679-1200.webp";
const passportCardDeskImg = "/assets/images/passport_card_travel_desk_1790430035290-1200.webp";
const haramainTrainImg = "/assets/images/haramain_bullet_train_1790484312808-1200.webp";
const minaHajjTentsImg = "/assets/images/mina_hajj_tents_1790484325661-1200.webp";
const madinahUmbrellasImg = "/assets/images/madinah_courtyard_umbrellas_1790484340720-1200.webp";
const saudiStopoverFlightImg = "/assets/images/saudi_stopover_aircraft_1790484351784-1200.webp";
const madinahGreenDomeImg = "/assets/images/madinah_green_dome_1790484369923-1200.webp";
const masjidNabawiArchesImg = "/assets/images/masjid_nabawi_arches_1790484388265-1200.webp";
const jeddahAirportTerminalImg = "/assets/images/jeddah_airport_terminal_1790484400414-1200.webp";
const ramadanMakkahNightImg = "/assets/images/ramadan_makkah_night_1790484415220-1200.webp";
const ihramPreparationImg = "/assets/images/ihram_preparation_set_1790484426740-1200.webp";
const zamzamAjwaDatesImg = "/assets/images/zamzam_ajwa_dates_1790484440926-1200.webp";
const makkahHalalCuisineImg = "/assets/images/makkah_halal_cuisine_1790484456326-1200.webp";
const qubaMosqueZiyarahImg = "/assets/images/quba_mosque_taif_ziyarah_1790485732985-1200.webp";
const dubaiSkylineTwilightImg = "/assets/images/dubai_skyline_burj_twilight_1790485747967-1200.webp";
const sheikhZayedMosqueImg = "/assets/images/sheikh_zayed_grand_mosque_1790485758750-1200.webp";
const putrajayaPinkMosqueImg = "/assets/images/putrajaya_pink_mosque_malaysia_1790485770212-1200.webp";
const parisLouvreLandmarksImg = "/assets/images/paris_louvre_london_landmarks_1790485782111-1200.webp";
const islamicBankingCardImg = "/assets/images/islamic_banking_card_makkah_1790486749439-1200.webp";
const rfcdForeignBankingImg = "/assets/images/rfcd_foreign_currency_banking_1790486762760-1200.webp";
const bdtTravelConciergeImg = "/assets/images/bdt_travel_concierge_voucher_1790486777146-1200.webp";
const posCardTerminalImg = "/assets/images/pos_card_terminal_currency_1790486792551-1200.webp";
const bangkokWatArunImg = "/assets/images/bangkok_wat_arun_chao_phraya_1790486821534-1200.webp";
const kualaLumpurPetronasImg = "/assets/images/kuala_lumpur_petronas_twilight_1790486835902-1200.webp";
const passportStampsWindowImg = "/assets/images/passport_stamps_boarding_window_1790486849797-1200.webp";
const singaporeMrtGardensImg = "/assets/images/singapore_mrt_gardens_bay_1790520762227-1200.webp";
const bangkokMedicalLobbyImg = "/assets/images/bangkok_medical_hospital_lobby_1790520775439-1200.webp";
const travelEsimInsuranceImg = "/assets/images/travel_esim_smartphone_insurance_1790520786938-1200.webp";
const sriLankaNineArchImg = "/assets/images/sri_lanka_nine_arch_train_1790520800518-1200.webp";
const bdEpassportDeskImg = "/assets/images/bangladesh_epassport_biometric_desk_1790520813052-1200.webp";
const airportDelayBoardImg = "/assets/images/airport_departure_board_delay_claim_1790520824658-1200.webp";
const dhakaAirlinesTarmacImg = "/assets/images/dhaka_airport_widebody_airlines_tarmac_1790520836931-1200.webp";

// Every blog post is mapped to its own unique visual asset (zero repeated images).
const havanaGranTeatroImg = "/assets/images/havana_gran_teatro_classic_cars_1791427200000-1200.webp";
const chefchaouenFountainImg = "/assets/images/chefchaouen_blue_fountain_alley_1791427400000-1200.webp";
const dhakaKolkataBorderTrainImg = "/assets/images/dhaka_kolkata_benapole_border_train_1791500000000-1200.webp";

function getBlogCoverImage(slug: string): string {
  const scheduledCover = SCHEDULED_BLOG_COVER_IMAGES[slug];
  if (scheduledCover) return scheduledCover;

  switch (slug) {
    case "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      return umrahMakkahImg;
    case "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      return haramainTrainImg;
    case "hajj-registration-bangladesh-government-vs-private-package-cost":
      return minaHajjTentsImg;
    case "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      return madinahUmbrellasImg;
    case "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      return saudiStopoverFlightImg;
    case "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      return madinahGreenDomeImg;
    case "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      return masjidNabawiArchesImg;
    case "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      return jeddahAirportTerminalImg;
    case "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      return ramadanMakkahNightImg;
    case "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      return ihramPreparationImg;
    case "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      return zamzamAjwaDatesImg;
    case "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      return makkahHalalCuisineImg;
    case "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      return qubaMosqueZiyarahImg;
    case "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      return dubaiSkylineTwilightImg;
    case "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      return sheikhZayedMosqueImg;
    case "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      return putrajayaPinkMosqueImg;
    case "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      return parisLouvreLandmarksImg;
    case "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      return islamicBankingCardImg;
    case "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      return rfcdForeignBankingImg;
    case "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      return bdtTravelConciergeImg;
    case "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      return posCardTerminalImg;
    case "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      return bangkokWatArunImg;
    case "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      return kualaLumpurPetronasImg;
    case "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      return passportStampsWindowImg;
    case "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide":
      return singaporeMrtGardensImg;
    case "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh":
      return bangkokMedicalLobbyImg;
    case "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide":
      return travelEsimInsuranceImg;
    case "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      return sriLankaNineArchImg;
    case "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      return bdEpassportDeskImg;
    case "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      return airportDelayBoardImg;
    case "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      return dhakaAirlinesTarmacImg;
    case "dual-currency-card-endorsement-bangladesh":
      return passportCardDeskImg;
    case "dhaka-airport-outbound-immigration-checklist-noc-go":
      return uralHeroBgImg;
    case "nepal-pokhara-itinerary-bangladesh":
      return nepalDestImg;
    case "nepal-vs-thailand-first-trip":
      return coxsBazarSunriseImg;
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
      return blogHeroBannerImg;
    case "havana-cuba-travel-guide-bangladesh":
      return havanaGranTeatroImg;
    case "chefchaouen-morocco-travel-guide-bangladesh":
      return chefchaouenFountainImg;
    case "kkday-10-10-winter-sale-japan-tours-passes-guide":
      return parisLouvreLandmarksImg;
    case "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide":
      return dhakaKolkataBorderTrainImg;
    default:
      return heroBgImage;
  }
}

// Precision ~50-Word AEO Direct Answer Snippets for Blog Cards (Complete sentences, high-fact density)
function getBlogAeoSnippet50Words(slug: string, isBn: boolean, fallbackSummary: string): string {
  const snippetsEn: Record<string, string> = {
    "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      "Check your eligible Umrah visa route and season before paying. Complete biometrics when the application requests them, then check the issued visa before Nusuk visitor registration and separate permits. Package conditions vary. The ten-day/four-sharing BDT reference is historical, not a current quote or evidence of agency savings.",
    "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      "Choose the exact Makkah or Madinah hotel room and route, not an area-wide accessibility promise. HHR allows one large bag up to 25 kg and 65 x 55 x 35 cm plus one hand item. Its published basic fares are not checkout totals; confirm transfers and ticket conditions before payment.",
    "hajj-registration-bangladesh-government-vs-private-package-cost":
      "The latest MoRA 2027 notice supplied for this guide lists primary registration from 27 July to 24 September 2026, with no extension. The window has passed. Check hajj.gov.bd for later notices. The supplied sources do not establish 2027 package prices; 2026 figures are historical only.",
    "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      "Request airline wheelchair help at booking, not at the airport: Biman calls it mandatory and recommends 48 hours, while Saudia publishes free carriage of wheelchairs and up to two mobility items. Inside the Grand Mosque, free manual wheelchairs and paid Tanaqol carts are separate services. No universal free airport service, guaranteed gate delivery or step-free hotel route is promised.",
    "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      "A Saudi stopover may allow up to 96 hours, including Umrah, subject to eligibility, visa approval and separate appointments. Check exact documents and the airline’s itemized charges before payment. Saudia publishes a booking sequence; detailed current flynas conditions remain unverified. No universal free hotel, instant issuance or two-city feasibility is promised.",
    "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      "Saudi Visa Bio applies when your Umrah visa application requires biometrics; it is not a universal tourist/stopover rule. Nusuk manages separate permits. The official Rawdah page describes annual regular booking, nearby Instant Track and attendance confirmation before an entry QR is available. Follow current booking instructions; paid data is not a permit requirement.",
    "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      "The Ministry says women may come for Umrah without a mahram; visa-route, age and nationality conditions still need checking, and religious advice is separate. Ordinary mosque prayer differs from a Rawdah appointment. Follow your actual booking and staff directions, confirm the hotel route, and seek qualified guidance for Ihram, menstruation and Taqsir.",
    "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      "Compare a Jeddah or Madinah roundtrip with both open-jaw directions on the same dates, passengers, baggage and full-trip basis. No live fare or guaranteed savings is established. Biman baggage varies by direction and fare; check Saudia Zamzam conditions, ticket structure, transit permission and every operating carrier before paying.",
    "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      "Ramadan 1448 is expected to begin on 8 February 2027, and the Ministry's 1448 calendar closes Umrah visa issuance on 9 March 2027, entry on 23 March and departure on 7 April. Official I'tikaf permits are a separate, capacity-limited service whose published conditions have been aimed at citizens and residents with valid residency — not at visitors on an Umrah visa.",
    "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      "Entering Ihram means intending Umrah or Hajj and beginning the Talbiyah, not just wearing the cloth. The Saudi Ministry of Hajj and Umrah says air arrivals must not pass the Miqat or the point parallel to it without entering Ihram, and that Jeddah airport is neither a Miqat nor a place for entering Ihram — so on a direct flight the step happens before landing. Which of the five points applies depends on the route your flight actually flies.",
    "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      "One sealed 5-litre Zamzam bottle per pilgrim, bought at the airport and carried separately — the Madinah operator lists it at SAR 12.50. Bangladesh allows 100 g of gold ornaments and 200 g of silver once a calendar year, plus one declared bar up to 117 g. There is no published kilogram allowance for dates: personal use passes, a commercial quantity can be seized.",
    "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      "Halal is the national baseline in Saudi Arabia — the food authority has stated that all food sold in the Kingdom is halal and pork imports are banned — so the real question is hygiene and price. The documented South Asian food streets in Makkah are Hijra Road and Ibrahim Khaleel Road in Misfalah; Al Baik's own branch list, with map pins, is the only reliable branch guide; and no per-plate price is printed here because no kitchen publishes one that can be re-checked.",
    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      "Hira's museums publish three different schedules and all three are printed; the Quba hadith is Ibn Majah 1412, Hasan; the Madinah bus is SR 90 for 24 hours; Badr is about 150 km west. No Ziyarah car tariff is published anywhere, so the guide prints none and teaches you to fix the total and the stops first.",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      "Combine a 7-day Makkah and Madinah Umrah with a 3-day Dubai and Abu Dhabi holiday on one Multi-City air ticket (DAC → JED/MED → DXB → DAC) to save BDT 35,000+ per person on airfare. Pair your Saudi Umrah e-Visa with a 96-hour UAE Transit Visa or 30-day Tourist e-Visa.",
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      "Travel from Dubai to Abu Dhabi in 90 minutes for just AED 25 (~BDT 850) each way on the RTA E100 or E101 coach using your Silver Nol Card. Entry to Sheikh Zayed Grand Mosque is 100% free via online QR registration at visit.szgmc.gov.ae alongside Qasr Al Watan Palace.",
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      "Ranked #1 for Muslim family travel, Malaysia offers 100% JAKIM-certified Halal dining and Surau prayer rooms in every mall. Take the MRT Putrajaya Line from KLCC (MYR 5.40 / BDT 150) to Putrajaya's Pink Mosque (Masjid Putra) and Lake Cruise, and visit the Islamic Arts Museum Malaysia.",
    "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      "Bangladeshi passport holders with a valid used US, UK, or Schengen visa qualify for an instant 1-year Saudi e-Visa or Visa on Arrival to perform Umrah on their return leg. In Paris, London, Rome, and New York, pre-book official Tiqets skip-the-line passes to avoid 2.5-hour museum queues.",
    "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      "Shariah-compliant dual-currency cards are issued by Islamic banks and Islamic windows in Bangladesh: a debit or prepaid card spends your own endorsed foreign exchange, while a charge card uses a fixed Ujrah fee instead of interest. Structures, fees and features differ by bank, so ask each bank about its own product; the USD 18,000 passport travel entitlement and the USD 300 single online-purchase rule apply whoever issued the card.",
    "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      "Bangladesh Bank generally caps a single online purchase on a travel-quota card at USD 300. For a larger documented flight or hotel payment, ask your bank before checkout; approval is its decision. An RFCD card may pay online at the actual amount, but the account can hold only foreign cash brought back from travel.",
    "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      "Travelers without an endorsed Dual-Currency Card can message the URAL Dhaka Desk on WhatsApp (+8801784385335) to book confirmed airline PNR tickets, Makkah/Madinah or Asian hotel vouchers, and Haramain train tickets in Bangladeshi Taka (BDT) via local bank transfer, bKash, or Nagad.",
    "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      "For Umrah, buying Saudi Riyals (SAR) directly in Dhaka for daily cash spending avoids paying the buy–sell spread twice (BDT→USD→SAR). At any card terminal abroad, choose the local currency: if you pick BDT, the merchant's bank converts at its own rate, usually with a markup of several percent. There is no fixed DCC percentage — the markup varies by terminal, so the rule is to choose local currency.",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      "Thailand's official e-Visa portal handles applications, but approval and timing are not guaranteed. The Dhaka TR checklist (updated Nov 30, 2022) lists BDT 60,000 per person or BDT 120,000 per family; confirm current requirements. Check the live government fee; bank/payment charges and optional agency fees are separate.",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      "Apply online at malaysiavisa.imi.gov.my for a 30-day Malaysia Tourist e-Visa (BDT 3,800–4,200; approved in 2–4 working days) with a 6-month bank statement showing BDT 80,000+ balance. Within 3 days before landing at KLIA, submit the mandatory free Malaysia Digital Arrival Card (MDAC).",
    "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      "Build a strong travel history on a blank Bangladeshi e-Passport in 3 steps: Step 1 — Get a zero-risk free Visa on Arrival in Nepal or the Maldives; Step 2 — Obtain online e-Visas for Malaysia and Thailand; Step 3 — Unlock Singapore, Dubai + Umrah, and Schengen/UK/US visas.",
    "dual-currency-card-endorsement-bangladesh":
      "Since 6 September 2026, Bangladesh Bank allows up to USD 18,000 per calendar year in travel foreign exchange for an adult resident (FEPD-1 Circular No. 33), with at most USD 5,000 as dollar notes. Endorsement at an Authorized Dealer bank records the amount in your passport; you must also activate the card's foreign-currency and e-commerce part before it will pay online.",
    "dhaka-airport-outbound-immigration-checklist-noc-go":
      "Clear Dhaka Airport (DAC) outbound emigration in under 2 minutes by carrying 5 printed documents in your cabin folder: a 6-month valid passport (with old passports), printed visa or arrival QR code, confirmed return air ticket, paid hotel voucher, passport dollar endorsement, and your Job NOC, GO, or Trade License.",
    "cheap-flight-booking-hacks-dhaka":
      "Cut international airfare from Dhaka (DAC) by 15%–30% by searching during Tuesday night airline inventory resets, flying out on Monday or Tuesday mornings instead of Thursday/Friday peak migration waves, travelling with 7kg cabin luggage on budget carriers, and stacking 12%–15% Bangladeshi bank card discounts.",
    "nepal-vs-thailand-first-trip":
      "Nepal Immigration lists a free tourist visa of up to 30 days for eligible SAARC visitors, except Afghanistan, on a first visit in a visa year; check current rules before departure. Thailand uses an advance e-Visa process. As planning estimates, a five-day trip is about BDT 45,000–65,000 in Nepal and BDT 80,000+ in Thailand; live fares and lodging rates change.",
    "hotel-savings-guide-bangkok-kl-dubai":
      "Save 30%–40% on family hotels in Bangkok, Kuala Lumpur, and Dubai without sacrificing safety by booking 2–3 metro stops outside the pricey tourist core—such as On Nut BTS in Bangkok, Al Rigga Metro in Deira Dubai, or serviced family apartments near Bukit Bintang and KLCC in Malaysia.",
    "halal-food-guide-bangkok-bangladesh":
      "Bangladeshi travelers in Bangkok can find 100% certified Halal meals displaying the green Central Islamic Council of Thailand emblem across Pratunam (Petchaburi Road alleys) and Sukhumvit Soi 3 (Nana Arab Street). Halal food court dishes start at BDT 180–300, with famous spots including Maidaun and Yana Restaurant.",
    "nepal-pokhara-itinerary-bangladesh":
      "A 5-day Kathmandu and Pokhara trip from Dhaka costs just BDT 40,000–54,000 per person including roundtrip flights (BDT 28,000–35,000). Claim your free SAARC Visa on Arrival at Tribhuvan Airport, explore Boudhanath and Durbar Square, and take a scenic bus or flight to Phewa Lake and Sarangkot.",
    "maldives-budget-trip-bangladesh-maafushi":
      "Experience the Maldives from Dhaka for under BDT 75,000 per person (flights included) by staying on local inhabited islands like Maafushi and Hulhumalé instead of $500/night private resorts. Bangladeshi citizens receive a free 30-day Visa on Arrival (with free IMUGA QR) and $25 airport speedboat transfers.",
    "singapore-visa-guide-bangladesh-agents":
      "Bangladeshi citizens must apply for a Singapore Tourist e-Visa (BDT 4,200–6,500; 5–7 working days) through an Embassy-Authorized Visa Agent in Dhaka using Form 14A, a 35x45mm matte photo, a 6-month bank statement (BDT 1,50,000+ balance), and a Letter of Introduction (LOI Form V39A).",
    "top-budget-family-destinations-from-dhaka":
      "The top 6 budget-friendly international family destinations from Dhaka for 2026 ranked by 5-day per-person BDT cost are: 1. Nepal (from BDT 42,000, free VOA), 2. Malaysia (from BDT 68,000, online e-Visa), 3. Thailand (from BDT 72,000), 4. Maldives local islands (from BDT 75,000), 5. Singapore, and 6. Dubai.",
    "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide":
      "Explore Singapore from Dhaka in 4 days for BDT 84,000–96,000 per person (flights included) by tapping your Bangladeshi Dual-Currency Visa/Mastercard directly on MRT gates via SimplyGo, staying near Farrer Park & Mustafa Centre (24/7) or Bugis Sultan Mosque, and dining at MUIS-certified Halal hawker stalls.",
    "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh":
      "Bangladeshi patients visiting Bumrungrad International (Sukhumvit Soi 3), Bangkok Hospital, or Samitivej can book executive health check-up packages online (THB 6,900–24,500 / BDT 24,500–87,000) with complimentary Bengali medical interpreters, free airport wheelchair assistance, and patient apartments within a 5-minute walk.",
    "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide":
      "Prepare for international travel from Dhaka with a verified connectivity and insurance strategy. Dual-SIM handsets let you use an Airalo or Yesim travel eSIM for mobile data abroad while keeping your Bangladeshi SIM active for bank SMS OTPs. Schengen visa applicants must also secure compliant €30,000 medical insurance.",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      "A 6-day Sri Lanka tour (Colombo, Kandy, Nuwara Eliya, Ella Nine Arch Bridge, and Galle Fort) from Dhaka costs BDT 68,000–82,000 per person including roundtrip flights. Bangladeshi passport holders apply online at eta.gov.lk ($20 USD SAARC fee) and enjoy abundant HAC-certified Halal dining.",
    "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      "Apply or renew your Bangladeshi e-Passport across all 64 Regional Passport Offices at epassport.gov.bd without brokers. A 10-year 48-page e-Passport costs BDT 5,750 (Regular), BDT 8,050 (Express), or BDT 10,350 (Super Express, 2 days); always select the 64-page booklet (BDT 8,050+) if you travel frequently.",
    "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      "Bangladeshi passengers facing disruptions on qualifying European and UK routes can claim statutory compensation up to €600 or £520 for 3+ hour delays under EC 261/UK 261 rules. For international flights, the Montreal Convention sets a maximum liability limit of 1,519 SDR per passenger for proven baggage losses.",
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      "Compare every major airline flying out of Dhaka (DAC): Biman and Saudia lead for direct 6.5-hour Jeddah/Madinah flights with 2x23kg (46kg) baggage (route- and fare-dependent; confirm on your e-ticket) and free 5L Zamzam water; Emirates, Qatar, and Gulf Air offer top 1-stop transit value; and Malaysia/Singapore Airlines lead on Asian routes.",
    "havana-cuba-travel-guide-bangladesh":
      "The Gran Teatro de La Habana Alicia Alonso (opened 1914) is home of the Ballet Nacional de Cuba, with tickets often just USD 10-30. Bangladeshi travelers need a Cuban tourist visa or e-Visa plus proof of health insurance, must plan on cash (US-issued cards rarely work), and should budget about BDT 220,000-360,000 for five days including flights.",
    "chefchaouen-morocco-travel-guide-bangladesh":
      "Chefchaouen, Morocco's Blue City in the Rif Mountains, is best visited April-June and September-October. CTM buses reach it in about 4 hours from Tangier or Fes. Bangladeshi travelers need a Moroccan visa in advance (no visa on arrival), halal food is the default everywhere, and a 5-day Morocco loop costs about BDT 150,000-220,000 including flights.",
    "travel-creator-resources":
      "Travel creator resources that work in 2026: start with one free monetization hub (Travelpayouts), free SEO tools like Google Search Console and Trends, honest phone photography with real alt text, trusted research sources like Seat61 and embassy pages, and a realistic workflow - publish honest articles one at a time and disclose every affiliate link.",
    "kkday-10-10-winter-sale-japan-tours-passes-guide":
      "Claim 30% off with promo codes 1010TOURS (Hokkaido ski & day tours), 1010MOVE (Keisei Skyliner, Nankai Rapi:t, Tokyo Metro), and 1010TIX (Universal Studios Japan, Tokyo Disney, SHIBUYA SKY) during KKday's 10.10 Winter Sale launching October 10 at 08:00 AM UTC+8 with dual-currency card checkout.",
    "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide":
      "Cross-border passenger trains (Maitree, Bandhan, and Mitali Express) have been suspended since July 2024; check railway.gov.bd and indianrailways.gov.in for any restart notice. For overland travel via Benapole–Petrapole, Bangladeshi travelers need an IVAC sticker visa (ivacbd.com; no e-Visa) and can plan around an indicative 3-day Kolkata budget of BDT 8,000–18,000.",
  };

  const snippetsBn: Record<string, string> = {
    "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      "টাকা দেওয়ার আগে প্রযোজ্য ওমরাহ ভিসার পথ ও মৌসুম দেখুন। আবেদনে চাইলে বায়োমেট্রিক দিন; এরপর ইস্যু হওয়া ভিসা মিলিয়ে Nusuk ভিজিটর নিবন্ধন ও আলাদা পারমিট নিন। Package-এর শর্ত আলাদা। ১০ দিন/চারজনের sharing-এর BDT reference পুরোনো, বর্তমান কোট বা agency saving-এর প্রমাণ নয়।",
    "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      "পুরো এলাকার accessibility ধরে নয়, নির্দিষ্ট Makkah/Madinah hotel room ও route বাছুন। HHR জনপ্রতি একটি বড় bag সর্বোচ্চ ২৫ কেজি ও 65 x 55 x 35 cm, সঙ্গে একটি hand item দেয়। Published basic fare checkout total নয়; payment-এর আগে transfer ও ticket condition নিশ্চিত করুন।",
    "hajj-registration-bangladesh-government-vs-private-package-cost":
      "সর্বশেষ দেওয়া MoRA ২০২৭ বিজ্ঞপ্তিতে প্রাথমিক নিবন্ধনের সময় ২৭ জুলাই–২৪ সেপ্টেম্বর ২০২৬ বলা হয়েছে; সময়সীমা বাড়ানো হবে না। সময় শেষ। পরবর্তী নোটিশের জন্য hajj.gov.bd দেখুন। দেওয়া সূত্রে ২০২৭ প্যাকেজের দাম নিশ্চিত নয়; ২০২৬ সালের অঙ্ক আগের মৌসুমের তথ্য।",
    "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      "এয়ারপোর্টে নয়, বুকিংয়ের সময়ই এয়ারলাইন হুইলচেয়ার সহায়তা চাইুন: বিমান এটি বাধ্যতামূলক বলে ও ৪৮ ঘণ্টা আগে আবেদনের পরামর্শ দেয়; সৌদিয়া হুইলচেয়ার ও সর্বোচ্চ দুইটি মোবিলিটি সামগ্রী বিনামূল্যে বহনের কথা বলে। মসজিদুল হারামে বিনামূল্যে ম্যানুয়াল হুইলচেয়ার ও সাশুল্ক তানাকুল কার্ট আলাদা সেবা। সবার জন্য বিনামূল্যে এয়ারপোর্ট সেবা, দরজায় ফেরত বা ধাপবিহীন হোটেল রুটের প্রতিশ্রুতি নয়।",
    "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      "যোগ্যতা, visa approval ও আলাদা appointment সাপেক্ষে Saudi stopover-এ ওমরাহসহ সর্বোচ্চ ৯৬ ঘণ্টা থাকা যেতে পারে। টাকা দেওয়ার আগে exact document ও airline-এর itemized charge দেখুন। Saudia booking sequence প্রকাশ করে; flynas-এর বর্তমান detailed conditions যাচাই হয়নি। সবার জন্য free hotel, instant issuance বা দুই শহরের plan নিশ্চিত নয়।",
    "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      "নিজের Umrah visa আবেদনে বায়োমেট্রিক চাইলে Saudi Visa Bio ব্যবহার করুন; এটি প্রত্যেক ট্যুরিস্ট/স্টপওভার যাত্রীর নিয়ম নয়। Nusuk-এ পারমিট আলাদা। অফিশিয়াল Rawdah পেজ সাধারণ বার্ষিক বুকিং, কাছাকাছি ভিজিটরের Instant Track এবং entry QR পাওয়ার আগে attendance confirmation বলে। নিজের বুকিংয়ের নির্দেশনা অনুসরণ করুন; পেইড ডেটা পারমিটের শর্ত নয়।",
    "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      "মন্ত্রণালয় নারীর মাহরাম ছাড়া Umrah করতে আসা allowed বলেছে; visa-route, age ও nationality condition যাচাই বাকি, ধর্মীয় advice আলাদা। সাধারণ mosque prayer ও Rawdah appointment এক নয়। নিজের booking ও staff direction মানুন, hotel route নিশ্চিত করুন এবং Ihram, মাসিক ও Taqsir-এর জন্য যোগ্য পরামর্শ নিন।",
    "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      "একই date, passenger, baggage ও full-trip basis-এ Jeddah বা Madinah roundtrip-এর সঙ্গে open-jaw-এর দুই direction তুলনা করুন। Live fare বা guaranteed savings প্রতিষ্ঠিত নয়। Biman baggage direction ও fare অনুযায়ী বদলায়; payment-এর আগে Saudia Zamzam condition, ticket structure, transit permission ও প্রতিটি operating carrier যাচাই করুন।",
    "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      "রমজান ১৪৪৮ শুরু হতে পারে ৮ ফেব্রুয়ারি ২০২৭-এ, আর মন্ত্রণালয়ের ১৪৪৮ ক্যালেন্ডারে ওমরাহ ভিসা ইস্যু শেষ ৯ মার্চ ২০২৭, প্রবেশ ২৩ মার্চ ও প্রস্থান ৭ এপ্রিল। অফিশিয়াল ইতিকাফ পারমিট আলাদা ও আসনসীমিত সেবা, যার প্রকাশিত শর্ত নাগরিক ও বৈধ ইকামাধারী বাসিন্দাদের জন্য — ওমরাহ ভিসার দর্শনার্থীর জন্য নয়।",
    "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      "ইহরামে প্রবেশ মানে ওমরাহ বা হজের নিয়ত করে তালবিয়া শুরু করা, শুধু কাপড় পরা নয়। সৌদি হজ ও ওমরাহ মন্ত্রণালয় বলছে, আকাশপথে আগত যাত্রী মিকাত বা তার সমান্তরাল বিন্দু অতিক্রমের আগে ইহরামে প্রবেশ করতে হবে, আর জেদ্দা বিমানবন্দর মিকাতও নয়, ইহরামে প্রবেশের স্থানও নয় — তাই সরাসরি ফ্লাইটে এই ধাপটি অবতরণের আগেই। পাঁচটি মিকাতের কোনটি প্রযোজ্য তা নির্ভর করে আপনার ফ্লাইটের প্রকৃত রুটের ওপর।",
    "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      "প্রতি হাজীর জন্য একটি সিল করা ৫ লিটার জমজম বোতল, বিমানবন্দর থেকে কেনা ও আলাদাভাবে বহন — মদিনার পরিচালক দাম লিখেছে ১২.৫০ রিয়াল। বাংলাদেশে বছরে একবার ১০০ গ্রাম স্বর্ণালংকার ও ২০০ গ্রাম রুপা, সঙ্গে ঘোষণা সাপেক্ষে ১১৭ গ্রাম পর্যন্ত একটি বার। খেজুরে কেজিতে প্রকাশিত ছাড় নেই: ব্যক্তিগত ব্যবহার চলে, বাণিজ্যিক পরিমাণ জব্দ হতে পারে।",
    "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      "সৌদি আরবে হালাল জাতীয় নিয়ম — খাদ্য কর্তৃপক্ষ জানিয়েছে রাজ্যে বিক্রি হওয়া সব খাবার হালাল এবং শূকরের মাংস আমদানি নিষিদ্ধ — তাই আসল প্রশ্ন পরিচ্ছন্নতা ও দাম। মক্কায় দক্ষিণ এশীয় খাবারের নথিভুক্ত রাস্তা মিসফালাহর হিজরা রোড ও ইব্রাহিম খলিল রোড; আল বাইকের নিজের শাখা-তালিকা ও ম্যাপ পিনই ভরসাযোগ্য; আর এখানে প্রতি প্লেটের দাম নেই, কারণ কোনো রেস্তোরাঁ এমন দাম প্রকাশ করে না যা আবার যাচাই করা যায়।",
    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      "হেরার মিউজিয়ামের সময় নিয়ে তিনটি সরকারি পাতা তিন রকম বলে, তিনটিই এখানে আছে; কুবার হাদিস ইবনে মাজাহ ১৪১২ (হাসান); মদিনার বাস ২৪ ঘণ্টায় ৯০ রিয়াল; বদর প্রায় ১৫০ কিমি পশ্চিমে। জিয়ারতের প্রকাশিত গাড়ি-ভাড়া নেই, তাই দাম ছাপা হয়নি — মোট দাম ও স্টপ আগে ঠিক করার নিয়ম দেওয়া হয়েছে।",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      "দুটি আলাদা ট্রিপের বিমান ভাড়া বাঁচাতে একটি Multi-City টিকিটেই (ঢাকা → জেদ্দা/মদিনা → দুবাই → ঢাকা) ৭ দিনের ওমরাহ এবং ৩ দিনের দুবাই ও আবুধাবি ভ্রমণ করুন। এতে ওমরাহ ই-ভিসা ও দুবাই ট্রানজিট/ই-ভিসা ব্যবহার করে জনপ্রতি ৩৫,০০০+ টাকা বিমান ভাড়া সাশ্রয় হয়।",
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      "দুবাইয়ের ইবনে বতুতা বা আল গুবাইবা স্টেশন থেকে RTA E100/E101 এসি বাসে মাত্র ২৫ দিরহামে (~৮৫০ টাকা, Nol Card দিয়ে) ৯০ মিনিটে আবুধাবি যাওয়া যায়। অফিশিয়াল সাইটে (visit.szgmc.gov.ae) ফ্রি QR পাস নিয়ে শেখ জায়েদ গ্র্যান্ড মসজিদ ও কাসর আল ওয়াতান প্রাসাদ ঘুরে দেখুন।",
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      "মুসলিম পরিবারের ভ্রমণের জন্য মালয়েশিয়া বিশ্বে ১ নম্বর—প্রতিটি শপিং মলে সরকারি JAKIM হালাল খাবার ও নামাজের স্থান (Surau) রয়েছে। কুয়ালালামপুর থেকে MRT ট্রেনে মাত্র ৫.৪০ রিঙ্গিতে (১৫০ টাকা) পুত্রজায়া পিঙ্ক মসজিদ ও লেক ক্রুজ এবং ইসলামিক আর্টস মিউজিয়াম ঘুরে দেখুন।",
    "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      "বাংলাদেশি পাসপোর্টে বৈধ ও একবার ব্যবহৃত (Used) US, UK বা Schengen ভিসা থাকলে ফেরার পথে তাৎক্ষণিক ১ বছরের সৌদি ই-ভিসা নিয়ে ওমরাহ করা যায়। এছাড়া প্যারিসের লুভর, আইফেল টাওয়ার, লন্ডন আই ও রোমের কলোসিয়ামে ২–৩ ঘণ্টার লাইন এড়াতে Tiqets স্কিপ-দ্য-লাইন পাস বুক করুন।",
    "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      "বাংলাদেশে ইসলামি ব্যাংক ও ইসলামিক উইন্ডো শরীয়াহ-সম্মত ডুয়েল-কারেন্সি কার্ড দেয়: ডেবিট বা প্রিপেইড কার্ড আপনার নিজের এনডোর্স করা বৈদেশিক মুদ্রা খরচ করে, আর চার্জ কার্ড সুদের বদলে নির্দিষ্ট উজরাহ ফি নেয়। গঠন, ফি ও সুবিধা ব্যাংকভেদে আলাদা, তাই প্রতিটি ব্যাংকের নিজের পণ্য সম্পর্কে জেনে নিন; USD 18,000 পাসপোর্ট ট্রাভেল entitlement ও USD 300 একবারের অনলাইন-কেনাকাটার নিয়ম যে কার্ডেই প্রযোজ্য।",
    "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      "Bangladesh Bank-এর সাধারণ rule-এ travel-quota card দিয়ে একবারে online purchase-এর limit USD 300। বড় documented flight বা hotel payment-এর জন্য checkout-এর আগে bank-কে বলুন; approval তাদের সিদ্ধান্ত। RFCD card online-এ প্রকৃত amount payment করতে পারে, তবে account-এ শুধু travel থেকে সঙ্গে আনা foreign cash রাখা যায়।",
    "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      "হাতে এনডোর্স করা Dual-Currency Card না থাকলে সরাসরি URAL-এর ঢাকা WhatsApp ডেস্কে (+8801784385335) যোগাযোগ করে দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ (BDT) পেমেন্ট করেই কনফার্মড ফ্লাইট PNR, মক্কা/মদিনা বা এশিয়ার হোটেল ভাউচার ও হারামাইন ট্রেন টিকিট বুক করতে পারেন।",
    "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      "ওমরাহর হাতখরচের জন্য ঢাকা থেকেই সরাসরি নগদ সৌদি রিয়াল (SAR) কিনলে BDT→USD→SAR দুইবার spread দিতে হয় না। আর বিদেশে যেকোনো POS মেশিনে সবসময় local currency বেছে নিন: BDT বেছে নিলে merchant-এর ব্যাংক নিজের হারে (সাধারণত কয়েক শতাংশ markup-এ) convert করে। DCC-এর নির্দিষ্ট শতাংশ নেই—টার্মিনালভেদে বদলায়।",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      "Thailand-এর official e-Visa portal-এ আবেদন করুন; approval বা সময় নিশ্চিত নয়। Dhaka-র TR checklist (হালনাগাদ ৩০ নভেম্বর ২০২২) জনপ্রতি BDT 60,000/পরিবারে BDT 120,000 উল্লেখ করে—বর্তমান requirement যাচাই করুন। সরকারি fee, bank/payment charge ও optional agency fee আলাদা।",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      "অনলাইনে malaysiavisa.imi.gov.my পোর্টালে ৮০,০০০+ টাকা ব্যাংক ব্যালেন্স দেখিয়ে আবেদন করলে ২–৪ কার্যদিবসে ৩০ দিনের মালয়েশিয়া ই-ভিসা (BDT ৩,৮০০–৪,২০০) পাওয়া যায়। কুয়ালালামপুর (KLIA) ফ্লাইটের ৩ দিন আগে অবশ্যই ফ্রি Malaysia Digital Arrival Card (MDAC) পূরণ করে প্রিন্ট সাথে রাখুন।",
    "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      "নতুন সাদা পাসপোর্টে ভিসা রিজেকশন এড়াতে ৩ ধাপে ট্রাভেল হিস্ট্রি গড়ুন: ১ম ধাপে নেপাল বা মালদ্বীপে নিশ্চিত ফ্রি Visa on Arrival সফর করুন; ২য় ধাপে মালয়েশিয়া ও থাইল্যান্ডের অনলাইন ই-ভিসা নিন; এবং ৩য় ধাপে সিঙ্গাপুর, দুবাই, সৌদি ওমরাহ ও ইউরোপের ভিসার আবেদন করুন।",
    "dual-currency-card-endorsement-bangladesh":
      "৬ সেপ্টেম্বর ২০২৬ থেকে বাংলাদেশ ব্যাংক প্রাপ্তবয়স্ক বাসিন্দার ভ্রমণের জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000 বৈদেশিক মুদ্রা অনুমোদন করেছে (FEPD-1 Circular No. 33), যার মধ্যে ডলার নোট সর্বোচ্চ USD 5,000। Authorized Dealer ব্যাংকে endorsement পাসপোর্টে পরিমাণটি রেকর্ড করে; অনলাইনে পেমেন্টের আগে কার্ডের foreign-currency ও e-commerce অংশও চালু করতে হবে।",
    "dhaka-airport-outbound-immigration-checklist-noc-go":
      "ঢাকা বিমানবন্দরে (DAC) মাত্র ২ মিনিটে ইমিগ্রেশন সম্পন্ন করতে হাতের ফাইলে ৫টি প্রিন্টেড কাগজ রাখুন: ৬ মাসের মেয়াদসহ পাসপোর্ট (পুরাতন পাসপোর্টসহ), ভিসা বা Arrival QR প্রিন্ট, রিটার্ন এয়ার টিকিট, হোটেল ভাউচার, ডলার এনডোর্সমেন্ট এবং পেশাগত NOC, GO অথবা ট্রেড লাইসেন্স।",
    "cheap-flight-booking-hacks-dhaka":
      "ঢাকা (DAC) থেকে ১৫%–৩০% কম খরচে বিমান টিকিট কাটতে মঙ্গলবার রাতে ভাড়া যাচাই করুন, বৃহস্পতি/শুক্রবারের ভিড় এড়িয়ে সোম বা মঙ্গলবার সকালে ফ্লাইট নিন, বাজেট এয়ারলাইন্সে ৭ কেজি কেবিন ব্যাগে ভ্রমণ করুন এবং দেশীয় ব্যাংকের কার্ডে ১০%–১৫% ডিসকাউন্ট অফার ব্যবহার করুন।",
    "nepal-vs-thailand-first-trip":
      "Nepal Immigration-এর প্রকাশিত নিয়মে Afghanistan ছাড়া যোগ্য SAARC নাগরিকদের visa year-এ প্রথম সফরে সর্বোচ্চ ৩০ দিনের gratis visa আছে; যাত্রার আগে বর্তমান নিয়ম যাচাই করুন। Thailand-এর জন্য আগাম e-Visa দরকার। আনুমানিক ৫ দিনের বাজেট Nepal-এ BDT 45,000–65,000 এবং Thailand-এ BDT 80,000+—লাইভ ফ্লাইট ও হোটেলদর বদলায়।",
    "hotel-savings-guide-bangkok-kl-dubai":
      "ব্যাংকক, কুয়ালালামপুর ও দুবাইয়ে নিরাপদ ও পরিচ্ছন্ন হোটেলে ৩০%–৪০% খরচ বাঁচাতে মূল ট্যুরিস্ট স্পট থেকে মাত্র ২–৩টি মেট্রো স্টেশন দূরে হোটেল নিন—যেমন ব্যাংককের On Nut BTS, দুবাই দেইরার Al Rigga Metro অথবা কুয়ালালামপুরের Bukit Bintang সংলগ্ন ফ্যামিলি অ্যাপার্টমেন্ট।",
    "halal-food-guide-bangkok-bangladesh":
      "ব্যাংককে হালাল খাবারের জন্য Central Islamic Council of Thailand-এর সবুজ লোগো দেখে Pratunam (Petchaburi Soi 7) এবং Sukhumvit Soi 3 (Nana Arab Street) এলাকায় যান। মাত্র ১৮০–৩০০ টাকায় শপিং মলের ফুড কোর্টে এবং Maidaun ও Yana Restaurant-এ সুস্বাদু হালাল খাবার পাওয়া যায়।",
    "nepal-pokhara-itinerary-bangladesh":
      "ঢাকা থেকে রিটার্ন ফ্লাইটসহ (২৮,০০০–৩৫,০০০ টাকা) ৫ দিনের কাঠমান্ডু ও পোখরা ভ্রমণে জনপ্রতি মাত্র ৪০,০০০–৫৪,০০০ টাকা খরচ হয়। ত্রিভুবন এয়ারপোর্টে ফ্রি SAARC ভিসা নিয়ে বৌদ্ধনাথ স্তূপা, দরবার স্কয়ার এবং পোখরার ফেওয়া লেক ও সারাংকোট সূর্যোদয় উপভোগ করুন।",
    "maldives-budget-trip-bangladesh-maafushi":
      "প্রাইভেট রিসোর্টে লাখ টাকা খরচ না করে মাফুশি (Maafushi) ও হুলহুমালে লোকাল আইল্যান্ডে থেকে ঢাকা থেকে ফ্লাইটসহ মাত্র ৭৫,০০০ টাকার নিচে মালদ্বীপ ভ্রমণ করা যায়। বাংলাদেশিরা পান ফ্রি ৩০ দিনের অন-অ্যারাইভাল ভিসা এবং মাত্র ২৫ ডলারে এয়ারপোর্ট স্পিডবোট ট্রান্সফার।",
    "singapore-visa-guide-bangladesh-agents":
      "সিঙ্গাপুর ভ্রমণের জন্য বাংলাদেশিদের ঢাকায় অবস্থিত Embassy-Authorized Visa Agent-এর মাধ্যমে ই-ভিসা (খরচ ৪,২০০–৬,৫০০ টাকা; সময় ৫–৭ কর্মদিবস) করতে হয়। আবেদনের জন্য ফর্ম 14A, ৩৫x৪৫ মিমি ম্যাট ছবি, ১.৫ লক্ষ+ টাকার ব্যাংক স্টেটমেন্ট এবং LOI (Form V39A) প্রয়োজন।",
    "top-budget-family-destinations-from-dhaka":
      "ঢাকা থেকে ২০২৬ সালে পরিবার নিয়ে ভ্রমণের শীর্ষ ৬টি বাজেট-বান্ধব দেশ (৫ দিনের জনপ্রতি খরচ অনুযায়ী): ১. নেপাল (৪২,০০০ টাকা, ফ্রি ভিসা), ২. মালয়েশিয়া (৬৮,০০০ টাকা, অনলাইন ই-ভিসা), ৩. থাইল্যান্ড (৭২,০০০ টাকা), ৪. মালদ্বীপ মাফুশি (৭৫,০০০ টাকা), ৫. সিঙ্গাপুর এবং ৬. দুবাই।",
    "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide":
      "ঢাকা থেকে ফ্লাইটসহ জনপ্রতি মাত্র ৮৪,০০০–৯৬,০০০ টাকায় ৪ দিনের সিঙ্গাপুর ভ্রমণ করুন: বাংলাদেশি ডুয়াল-কারেন্সি কার্ড সরাসরি MRT গেটে ট্যাপ (SimplyGo) করে যাতায়াত করুন, Farrer Park (Mustafa Centre) বা Bugis (সুলতান মসজিদ) এলাকায় থাকুন এবং MUIS হালাল ফুড কোর্টে খান।",
    "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh":
      "ব্যাংককের Bumrungrad International (Sukhumvit Soi 3), Bangkok Hospital ও Samitivej-এ অনলাইনে অ্যাপয়েন্টমেন্ট নিয়ে ফ্রি দোভাষী সুবিধাসহ হেলথ চেকআপ (৬,৯০০–২৪,৫০০ বাথ / ২৪,৫০০–৮৭,০০০ টাকা) করা যায়। গুরুতর রোগীদের দ্রুত ভিসার জন্য হাসপাতাল থেকে ফ্রি Medical Invitation Letter পাওয়া যায়।",
    "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide":
      "ঢাকা থেকে বিদেশ ভ্রমণের আগে ডুয়াল-সিম ফোনে Airalo বা Yesim ট্রাভেল eSIM ব্যবহার করে বিদেশে ইন্টারনেট সচল রাখা যায়, আর ফিজিক্যাল দেশীয় সিম দিয়ে ব্যাংকের ওটিপি এসএমএস পাওয়া যায়। শেনজেন ভিসার জন্য ইউরোপীয় ইউনিয়নের নিয়ম মেনে ন্যূনতম €30,000 কভারেজের মেডিকেল ইনস্যুরেন্স নিশ্চিত করুন।",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      "ঢাকা থেকে ফ্লাইটসহ জনপ্রতি মাত্র ৬৮,০০০–৮২,০০০ টাকায় ৬ দিনের শ্রীলঙ্কা (কলম্বো, ক্যান্ডি, নুওয়ারা এলিয়া, এলা Nine Arch Bridge ও গল ফোর্ট) ভ্রমণ করা যায়। বাংলাদেশি পাসপোর্টধারীরা অফিশিয়াল পোর্টালে (eta.gov.lk) মাত্র ২০ ডলারে SAARC ETA ভিসা পান।",
    "bangladesh-epassport-application-guide-64-districts-urgent-fees":
      "দালাল ছাড়াই দেশের ৬৪ জেলার পাসপোর্ট অফিসে epassport.gov.bd পোর্টালে ১০ বছর মেয়াদী ৪৮ পৃষ্ঠার ই-পাসপোর্ট করতে ৫,৭৫০ টাকা (রেগুলার), ৮,০৫০ টাকা (এক্সপ্রেস) বা ১০,৩৫০ টাকা (সুপার এক্সপ্রেস, ২ দিনে) লাগে। নিয়মিত ভ্রমণকারীদের জন্য ৬৪ পৃষ্ঠার পাসপোর্ট সেরা।",
    "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      "দালাল ছাড়াই দেশের ৬৪ জেলার পাসপোর্ট অফিসে epassport.gov.bd পোর্টালে ১০ বছর মেয়াদী ৪৮ পৃষ্ঠার ই-পাসপোর্ট করতে ৫,৭৫০ টাকা (রেগুলার), ৮,০৫০ টাকা (এক্সপ্রেস) বা ১০,৩৫০ টাকা (সুপার এক্সপ্রেস, ২ দিনে) লাগে। নিয়মিত ভ্রমণকারীদের জন্য ৬৪ পৃষ্ঠার পাসপোর্ট সেরা।",
    "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      "ইউরোপ বা যুক্তরাজ্যের যোগ্য ফ্লাইটে ৩ ঘণ্টার বেশি দেরি হলে EC 261 বা UK 261 নিয়মে সর্বোচ্চ €৬০০ বা £৫২০ পর্যন্ত ক্ষতিপূরণ দাবি করা সম্ভব। যেকোনো আন্তর্জাতিক রুটে লাগেজ হারালে বা ক্ষতিগ্রস্ত হলে মন্ট্রিল কনভেনশন অনুযায়ী সর্বোচ্চ ১,৫১৯ SDR পর্যন্ত প্রমাণিত ক্ষতির ব্যয় ক্লেইম করা যায়।",
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      "ঢাকা (DAC) থেকে সরাসরি জেদ্দা/মদিনা ওমরাহ ফ্লাইটে ৪৬ কেজি (২x২৩ কেজি) ব্যাগেজ ও ৫ লিটার ফ্রি জমজম পানির সুবিধায় Biman ও Saudia সেরা। সাশ্রয়ী ১-স্টপ ট্রানজিটে Emirates, Qatar ও Gulf Air এবং এশিয়া রুটে Malaysia ও Singapore Airlines শীর্ষে।",
    "havana-cuba-travel-guide-bangladesh":
      "হাভানার গ্রান তেয়াত্রো দে লা আবানা আলিসিয়া আলোনসো (১৯১৪ সালে উদ্বোধন) কিউবার জাতীয় ব্যালের আবাসস্থল, শো-এর টিকিট প্রায়ই মাত্র USD ১০-৩০। বাংলাদেশি ভ্রমণকারীদের কিউবান ট্যুরিস্ট ভিসা/ই-ভিসা ও স্বাস্থ্য বীমার প্রমাণ লাগে; ৫ দিনের বাজেট প্রায় ২,২০,০০০-৩,৬০,০০০ টাকা - কিউবা নগদ-নির্ভর, US-ইস্যু কার্ড সাধারণত কাজ করে না।",
    "chefchaouen-morocco-travel-guide-bangladesh":
      "রিফ পাহাড়ের মরক্কোর নীল শহর শেফশাওয়েন এপ্রিল-জুন ও সেপ্টেম্বর-অক্টোবরে যাওয়া ভালো। টাঞ্জিয়ার বা ফেজ থেকে CTM বাসে প্রায় ৪ ঘণ্টা। বাংলাদেশিদের আগেই মরক্কো ভিসা লাগে (ভিসা অন অ্যারাইভাল নেই), হালাল সর্বত্র স্বাভাবিক, আর ৫ দিনের মরক্কো লুপের ব্যয় প্রায় ১,৫০,০০০-২,২০,০০০ টাকা (ফ্লাইটসহ)।",
    "travel-creator-resources":
      "২০২৬ সালের কার্যকর ট্রাভেল ক্রিয়েটর রিসোর্সেস: একটিমাত্র ফ্রি মনিটাইজেশন হাব (Travelpayouts), Google Search Console ও Trends-এর মতো ফ্রি SEO টুল, আসল অল্ট টেক্সটসহ সৎ ফোন ফটোগ্রাফি, Seat61 ও দূতাবাসের পেজের মতো বিশ্বস্ত রিসার্স সোর্স এবং বাস্তব ওয়ার্কফ্লো - একটি করে সৎ আর্টিকেল প্রকাশ করুন এবং প্রতিটি অ্যাফিলিয়েট লিংক প্রকাশ করুন।",
    "kkday-10-10-winter-sale-japan-tours-passes-guide":
      "KKday-র ১০.১০ উইন্টার সেল শুরু হচ্ছে ১০ অক্টোবর সকাল ৮:০০ (UTC+8)-এ। প্রোমো কোড 1010TOURS (হোক্কাইডো স্কি ও ডে-ট্যুর), 1010MOVE (Keisei Skyliner, Nankai Rapi:t, মেট্রো) ও 1010TIX (USJ, টোকিও ডিজনি, শিবুয়া স্কাই) ব্যবহার করে ৩০% ফ্ল্যাশ ছাড় নিন।",
    "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide":
      "জুলাই ২০২৪ থেকে মৈত্রী, বন্ধন ও মিতালি এক্সপ্রেস স্থগিত; পুনরায় চালুর বিজ্ঞপ্তির জন্য railway.gov.bd ও indianrailways.gov.in দেখুন। বেনাপোল–পেট্রাপোল স্থলপথে ভ্রমণের জন্য বাংলাদেশি পাসপোর্টধারীদের IVAC স্টিকার ভিসা (ivacbd.com; e-Visa নেই) লাগে এবং ৩ দিনের কলকাতা ভ্রমণের আনুমানিক পরিকল্পনা বাজেট BDT 8,000–18,000।",
  };

  const map = isBn ? snippetsBn : snippetsEn;
  if (map[slug]) {
    return map[slug];
  }
  const scheduledSnippet = SCHEDULED_BLOG_SNIPPETS[slug]?.[isBn ? "bn" : "en"];
  if (scheduledSnippet) return scheduledSnippet;

  // Fallback: clean ~50-word excerpt
  const cleanWords = fallbackSummary.replace(/\*\*/g, "").replace(/\s+/g, " ").trim().split(" ");
  if (cleanWords.length <= 52) return cleanWords.join(" ");
  return `${cleanWords.slice(0, 50).join(" ").replace(/[.,;:!?-]+$/, "")}...`;
}

type SectionType = "home" | "flights" | "hotels" | "visa" | "visaFree" | "destinations" | "experiences" | "attractions" | "umrah" | "banking" | "kkdayHotels" | "costs" | "tools" | "blog" | "contact" | "sitemap" | "preDeparture" | "privacy" | "about" | "notFound";

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

function AuthorBioCard({
  authorRaw,
  isBengali,
}: {
  authorRaw?: string;
  isBengali: boolean;
}) {
  const profile = getAuthorProfile(authorRaw);
  if (!profile) return null;

  return (
    <aside
      aria-labelledby="blog-author-bio-heading"
      className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h2
            id="blog-author-bio-heading"
            className="font-serif text-lg font-bold text-brand-navy"
          >
            {isBengali ? "লেখক সম্পর্কে" : "About the author"}
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            {isBengali ? profile.bioBn : profile.bioEn}
          </p>
          {profile.creativeWorks.length > 0 && (
            <div className="pt-1">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-600">
                {isBengali ? "নির্বাচিত সৃজনশীল ও মিডিয়া কাজ" : "Selected creative & media work"}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {profile.creativeWorks.map((work) => (
                  <li key={work.url}>
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-navy underline decoration-slate-300 underline-offset-4 hover:text-brand-emerald"
                    >
                      {isBengali ? work.titleBn : work.titleEn}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {profile.portfolioUrl && (
          <a
            href={profile.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-emerald"
          >
            {isBengali ? "পেশাগত পোর্টফোলিও দেখুন" : "View professional portfolio"}
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        )}
      </div>
    </aside>
  );
}

type SubscriptionInterest = "dhaka-fare-alerts" | "travel-newsletter";

const SUBSCRIPTION_INTERESTS: readonly SubscriptionInterest[] = [
  "dhaka-fare-alerts",
  "travel-newsletter",
];

const SUBSCRIPTION_INTEREST_LABELS: Record<SubscriptionInterest, { en: string; bn: string }> = {
  "dhaka-fare-alerts": {
    en: "Dhaka flight fare-drop alerts",
    bn: "ঢাকা থেকে ফ্লাইট ভাড়া কমার অ্যালার্ট",
  },
  "travel-newsletter": {
    en: "General URAL travel newsletter",
    bn: "URAL সাধারণ ট্রাভেল নিউজলেটার",
  },
};

const readSavedSubscriptionInterests = (): SubscriptionInterest[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedInterests: unknown = JSON.parse(
      window.localStorage.getItem("ural_subscription_interests") || "[]",
    );
    return Array.isArray(storedInterests)
      ? SUBSCRIPTION_INTERESTS.filter((interest) => storedInterests.includes(interest))
      : [];
  } catch {
    return [];
  }
};

export default function App() {
  // Simulated Browser Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname + window.location.search;
    }
    return "/";
  });

  useEffect(() => {
    const cleanupClickTracking = initGlobalClickTracking();
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      cleanupClickTracking();
    };
  }, []);

  // Scroll progress bar + back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerPanelRef = useRef<HTMLDivElement>(null);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<"destinations" | "tools" | null>(null);
  const destinationsMenuRef = useRef<HTMLDivElement>(null);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const destinationsDisclosureRef = useRef<HTMLButtonElement>(null);
  const toolsDisclosureRef = useRef<HTMLButtonElement>(null);

  // Reading progress + back-to-top state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Custom Action Affiliate Conversion Toast overlay state
  const [affiliateToast, setAffiliateToast] = useState<string | null>(null);
  const triggerAffiliateToast = (msg: string) => {
    setAffiliateToast(msg);
    setTimeout(() => {
      setAffiliateToast(null);
    }, 4500);
  };
  // Language is a pure function of the URL (see getRouteDetails().locale): /bn/*
  // renders Bengali, everything else English. Seeding from the path means the
  // first paint already matches the prerendered HTML. localStorage is demoted to
  // a preference note that must never override the URL — repainting a Bengali
  // /bn page into English would be both a jarring flash and a cloaking signal
  // (crawler reads Bengali, rendered DOM becomes English).
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path === "/bn" || path.startsWith("/bn/")) return "bn";
    }
    return "en";
  });

  const handleLangToggle = (newLang: Language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ural_lang", newLang);
    }
    // Switching language navigates to the other locale's URL — /bn/* is the
    // crawlable Bengali surface, it is not just a client-side state flip.
    const current =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : currentPath;
    pushPath(toLocalePath(current, newLang));
  };

  const [bnContent, setBnContent] = useState<typeof BengaliContentModule | null>(null);
  // Route content is a dynamic dependency: a homepage visit needs only the
  // tiny blog URL index, not every flight/hotel/visa/destination/blog record.
  const [contentData, setContentData] = useState<typeof import("./constants") | null>(null);
  // The Banking & Forex hub's FAQ pairs live in the hub's lazy chunk: importing
  // them into the entry graph pushed the homepage over its gzip budget.
  const [bankingFaqs, setBankingFaqs] = useState<BankingFaq[] | null>(null);

  // The document language is baked into index.html as lang="en", but the UI can
  // switch to Bengali entirely client-side. Without this, <html lang> keeps
  // claiming English while Bengali text is on screen, so screen readers apply
  // the wrong pronunciation rules (WCAG 3.1.1 / 3.1.2).
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "bn" ? "bn-BD" : "en-BD";
    }
    if (lang === "bn" && !bnContent) {
      import("./data/bengaliContent").then((mod) => setBnContent(mod));
    }
  }, [lang, bnContent]);

  const t = translations[lang];
  const isBn = lang === "bn";
  const localizedHajjFaqs = isBn && bnContent ? bnContent.getLocalizedHajjFaqs(lang) : HAJJ_UMRAH_FAQS;
  const featuredGrowthTopics =
    isBn && bnContent ? bnContent.getFeaturedGrowthTopics(lang) : ENGLISH_FEATURED_GROWTH_TOPICS;
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
  const [emailSubscribed, setEmailSubscribed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return Boolean(localStorage.getItem("ural_subscribed_email"));
    }
    return false;
  });
  const [userEmail, setUserEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ural_subscribed_email") || "";
    }
    return "";
  });
  const [subscriptionId, setSubscriptionId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ural_subscription_id") || "";
    }
    return "";
  });
  const [selectedSubscriptionInterests, setSelectedSubscriptionInterests] = useState<SubscriptionInterest[]>(
    readSavedSubscriptionInterests,
  );
  const [emailSubmitting, setEmailSubmitting] = useState<boolean>(false);
  const [emailSubscribeError, setEmailSubscribeError] = useState<string | null>(null);
  const hasFareAlertPreference = selectedSubscriptionInterests.includes("dhaka-fare-alerts");
  const hasNewsletterPreference = selectedSubscriptionInterests.includes("travel-newsletter");

  const toggleSubscriptionInterest = (interest: SubscriptionInterest) => {
    setSelectedSubscriptionInterests((current) =>
      current.includes(interest)
        ? current.filter((selected) => selected !== interest)
        : SUBSCRIPTION_INTERESTS.filter((candidate) => current.includes(candidate) || candidate === interest),
    );
    if (emailSubscribeError) setEmailSubscribeError(null);
  };

  const handleEmailSubscription = async (
    rawEmail: string,
    sourceLabel: string,
    requestedInterests: SubscriptionInterest[],
  ) => {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const selectedInterests = SUBSCRIPTION_INTERESTS.filter((interest) =>
      requestedInterests.includes(interest),
    );

    if (selectedInterests.length === 0) {
      setEmailSubscribeError(
        lang === "bn"
          ? "চালিয়ে যেতে অন্তত একটি আপডেট বেছে নিন।"
          : "Choose at least one type of update to continue."
      );
      return;
    }

    if (!cleanEmail || !emailPattern.test(cleanEmail)) {
      setEmailSubscribeError(
        lang === "bn"
          ? "অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস লিখুন।"
          : "Please enter a valid email address."
      );
      return;
    }

    if (emailSubmitting) return;
    setEmailSubscribeError(null);
    setEmailSubmitting(true);
    setUserEmail(cleanEmail);

    const interestLabels = selectedInterests.map((interest) => SUBSCRIPTION_INTEREST_LABELS[interest].en);
    const interestSummary = interestLabels.join(", ");
    const localizedInterestSummary = selectedInterests
      .map((interest) => SUBSCRIPTION_INTEREST_LABELS[interest][lang])
      .join(lang === "bn" ? " ও " : " and ");
    const generatedSubId = `URAL-SUB-${Math.floor(100000 + Math.random() * 900000)}`;
    const dhakaTimestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Dhaka",
      dateStyle: "medium",
      timeStyle: "medium",
    });
    const activePageUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `${SITE_ORIGIN}${currentPath}`;
    const preferredLanguage = lang === "bn" ? "Bengali (BN)" : "English (EN)";

    const notificationPayload = {
      email: cleanEmail,
      "Subscriber Email": cleanEmail,
      "Subscription ID": generatedSubId,
      "Signup Placement": sourceLabel,
      "Subscription Interests": interestSummary,
      "Preferred Language": preferredLanguage,
      "Selected Currency": currencyToOption,
      "Page URL": activePageUrl,
      "Timestamp (Dhaka BST)": dhakaTimestamp,
      "Notification Recipient": "marcwriter2025@gmail.com",
      _replyto: cleanEmail,
      _subject: `🔔 New URAL Subscription: ${cleanEmail} (${interestSummary})`,
      _template: "table",
      _captcha: "false",
    };

    try {
      // 1. Primary dispatch via dedicated Cloudflare Pages serverless endpoint (/api/subscribe)
      const serverlessRequest = fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          source: sourceLabel,
          subscriptionInterests: interestLabels,
          subscriptionId: generatedSubId,
          language: preferredLanguage,
          pageUrl: activePageUrl,
          timestamp: dhakaTimestamp,
        }),
      }).catch(() => null);

      // 2. Direct client-side FormSubmit AJAX dispatch to marcwriter2025@gmail.com
      // (ensures browser Origin/Referer headers are included for immediate FormSubmit delivery)
      const formSubmitRequest = fetch("https://formsubmit.co/ajax/marcwriter2025@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(notificationPayload),
      }).catch(() => null);

      await Promise.allSettled([serverlessRequest, formSubmitRequest]);
    } catch (err) {
      console.warn("Subscription notification dispatch fallback:", err);
    } finally {
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("ural_subscribed_email", cleanEmail);
          localStorage.setItem("ural_subscription_id", generatedSubId);
          localStorage.setItem("ural_subscription_interests", JSON.stringify(selectedInterests));
        } catch {
          // ignore storage quota errors
        }
      }
      setSubscriptionId(generatedSubId);
      setSelectedSubscriptionInterests(selectedInterests);
      setEmailSubmitting(false);
      setEmailSubscribed(true);
      setAffiliateToast(
        lang === "bn"
          ? `সাবস্ক্রিপশন নিশ্চিত হয়েছে (${generatedSubId})! ${localizedInterestSummary} আপডেটের জন্য ${cleanEmail} যুক্ত হয়েছে।`
          : `Subscription confirmed (${generatedSubId})! ${localizedInterestSummary} updates are selected for ${cleanEmail}.`
      );
    }
  };
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

  // Track third-party Travelpayouts rendering for the perceived-performance
  // skeletons.
  //
  // The widget shell is a separate ~20 KB gzip chunk; its ~110 KB gzip
  // Recharts fare chart is split again and is fetched only after the visitor
  // explicitly opens the trend. The shell used to be fetched by a 260 ms timer
  // on every page that renders one — competing with the LCP image even for
  // visitors who never scrolled to it. It is now fetched by whichever of these
  // happens first:
  //   1. a widget skeleton coming within 300px of the viewport (below),
  //   2. the visitor touching/focusing the skeleton — the onInteract escapes,
  //   3. the consented emrld script finishing its load,
  //   4. a 2.5s ceiling, so a widget can never stay a skeleton indefinitely.
  // Owner-approved change (docs/growth/06 §5): the widget is revenue-bearing,
  // so its load timing is not changed without sign-off.
  const [areTpScriptsReady, setAreTpScriptsReady] = useState<boolean>(() =>
    typeof window === "undefined"
  );

  useEffect(() => {
    if (typeof window === "undefined" || areTpScriptsReady) return;

    let isMounted = true;
    const markReady = () => {
      if (!isMounted) return;
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          if (isMounted) setAreTpScriptsReady(true);
        }, { timeout: 1200 });
      } else {
        setTimeout(() => {
          if (isMounted) setAreTpScriptsReady(true);
        }, 50);
      }
    };

    const skeletons = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tp-skeleton]")
    );
    let observer: IntersectionObserver | null = null;
    if (skeletons.length > 0 && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) markReady();
        },
        { rootMargin: "300px" }
      );
      skeletons.forEach((element) => observer!.observe(element));
    }

    const fallbackTimer = window.setTimeout(markReady, 2500);

    const tpScript = document.querySelector<HTMLScriptElement>('script[src*="emrld.ltd"]');
    if (tpScript) {
      tpScript.addEventListener("load", markReady, { once: true });
      tpScript.addEventListener("error", markReady, { once: true });
    }

    return () => {
      isMounted = false;
      window.clearTimeout(fallbackTimer);
      observer?.disconnect();
      if (tpScript) {
        tpScript.removeEventListener("load", markReady);
        tpScript.removeEventListener("error", markReady);
      }
    };
  }, [areTpScriptsReady]);

  // Parse path to resolve active section and optional query parameters
  const getRouteDetails = () => {
    const url = new URL(currentPath, SITE_ORIGIN);
    const searchParams = url.searchParams;
    const segments = url.pathname.split("/").filter(Boolean);
    // Bengali is a locale sub-directory: /bn/umrah mirrors /umrah. The locale
    // lives in the URL (not in localStorage) so the prerendered Bengali HTML and
    // the client render the same language — otherwise React would repaint a
    // /bn page into English a few ms after load (flash + cloaking signal).
    const locale: Language = segments[0] === "bn" ? "bn" : "en";
    const segs = locale === "bn" ? segments.slice(1) : segments;
    const root = segs[0] || "";
    const subSegment = segs[1] || null;

    let section: SectionType = "notFound";
    let parameterId: string | null = null;
    let isLanding = false;

    if (!root) {
      section = "home";
      isLanding = true;
    } else if (root === "flights" && segs.length <= 2) {
      const routeParam = searchParams.get("route") || subSegment;
      section = "flights";
      parameterId = routeParam || "dhaka-kathmandu";
      isLanding = !routeParam;
    } else if (root === "hotels" && segs.length <= 2) {
      const cityParam = searchParams.get("city") || subSegment;
      section = "hotels";
      parameterId = cityParam || "kathmandu-hotels";
      isLanding = !cityParam;
    } else if (root === "visa-free-countries" && segs.length === 1) {
      section = "visaFree";
      isLanding = true;
    } else if (root === "visa" && segs.length <= 2) {
      const countryParam = searchParams.get("country") || subSegment;
      section = "visa";
      parameterId = countryParam || "nepal-visa";
      isLanding = !countryParam;
    } else if (root === "destinations" && segs.length <= 2) {
      const countryParam = searchParams.get("country") || subSegment;
      section = "destinations";
      parameterId = countryParam || "nepal-guide";
      isLanding = !countryParam;
    } else if (root === "costs" && segs.length <= 2) {
      const countryParam = searchParams.get("country") || subSegment;
      section = "costs";
      parameterId = countryParam || "nepal-costs";
      isLanding = !countryParam;
    } else if (root === "experiences" && segs.length <= 2) {
      section = "experiences";
      isLanding = true;
      // Clean static region paths: /experiences/europe (west) and /experiences/asia
      if (segs.length === 2 && (segs[1] === "europe" || segs[1] === "asia")) {
        parameterId = segs[1];
      }
    } else if (root === "attractions" && segs.length <= 2) {
      section = "attractions";
      if (segs.length === 1) {
        isLanding = true;
      } else if (segs.length === 2) {
        // /attractions/:cityId:attractionId detail page (e.g. /attractions/london:992434)
        parameterId = segs[1];
        isLanding = false;
      }
    } else if (root === "kkday-hotels" && segs.length === 1) {
      section = "kkdayHotels";
      isLanding = true;
    } else if ((root === "umrah" || root === "hajj") && segs.length === 1) {
      section = "umrah";
      isLanding = true;
    } else if (root === "banking" && segs.length === 1) {
      section = "banking";
      isLanding = true;
    } else if (root === "tools" && segs.length <= 2) {
      // Canonical tool paths: /tools/<slug> (e.g. /tools/flight-delay-claim).
      // An unknown slug deliberately falls through to notFound (noindex) so a
      // mistyped tool URL can never be indexed as a second /tools hub.
      if (!subSegment) {
        section = "tools";
        isLanding = true;
      } else if (isToolSlug(subSegment)) {
        section = "tools";
        parameterId = subSegment;
      }
    } else if (root === "blog" && segs.length <= 2) {
      const slugParam = searchParams.get("slug") || subSegment;
      if (!slugParam || BLOG_SLUGS.includes(slugParam as (typeof BLOG_SLUGS)[number])) {
        section = "blog";
        parameterId = slugParam || "cheap-flight-booking-hacks-dhaka";
        isLanding = !slugParam;
      }
    } else if (root === "contact" && segs.length === 1) {
      section = "contact";
      isLanding = true;
    } else if (root === "about" && segs.length === 1) {
      section = "about";
      isLanding = true;
    } else if (root === "pre-departure" && segs.length === 1) {
      // Standalone pre-departure hub (split out of the old combined /sitemap
      // page in 2026-10). /indexing stays an alias of the directory page.
      section = "preDeparture";
      isLanding = true;
    } else if (
      ["sitemap", "indexing"].includes(root) &&
      segs.length === 1
    ) {
      section = "sitemap";
      isLanding = true;
    } else if (
      ["privacy", "privacy-policy", "cookie-policy"].includes(root) &&
      segs.length === 1
    ) {
      section = "privacy";
      isLanding = true;
    }

    const isAdmin = searchParams.has("admin") || searchParams.has("inspector") || searchParams.get("onboarding") === "true";

    return { section, parameterId, isLanding, isAdmin, locale };
  };

  const routeDetails = getRouteDetails();
  const requestedSection = routeDetails.section;
  const { parameterId, isLanding, isAdmin, locale } = routeDetails;
  const contentBackedSections: SectionType[] = [
    "flights",
    "hotels",
    "visa",
    "destinations",
    "costs",
    "blog",
  ];
  const needsContentData = contentBackedSections.includes(requestedSection);

  useEffect(() => {
    if (!needsContentData || contentData) return;
    let cancelled = false;
    import("./constants").then((data) => {
      if (!cancelled) setContentData(data);
    });
    return () => {
      cancelled = true;
    };
  }, [requestedSection, needsContentData, contentData]);

  const localizedBlogs = isBn && bnContent
    ? bnContent.getLocalizedBlogs(lang)
    : contentData?.BLOG_DATA ?? [];
  const localizedFlights = isBn && bnContent
    ? bnContent.getLocalizedFlights(lang)
    : contentData?.FLIGHTS_DATA ?? [];
  const localizedHotels = isBn && bnContent
    ? bnContent.getLocalizedHotels(lang)
    : contentData?.HOTELS_DATA ?? [];
  const localizedVisas = isBn && bnContent
    ? bnContent.getLocalizedVisas(lang)
    : contentData?.VISA_DATA ?? [];
  const localizedCosts = isBn && bnContent
    ? bnContent.getLocalizedCosts(lang)
    : contentData?.TRIP_COSTS_DATA ?? [];
  const DESTINATIONS_DATA = isBn && bnContent
    ? bnContent.getLocalizedDestinations(lang)
    : contentData?.DESTINATIONS_DATA ?? [];
  const BLOG_DATA = contentData?.BLOG_DATA ?? [];

  const validationRows =
    requestedSection === "flights" ? localizedFlights
      : requestedSection === "hotels" ? localizedHotels
      : requestedSection === "visa" ? localizedVisas
      : requestedSection === "destinations" ? DESTINATIONS_DATA
      : requestedSection === "costs" ? localizedCosts
      : [];
  const isInvalidContentRoute =
    needsContentData &&
    requestedSection !== "blog" &&
    Boolean(contentData) &&
    !isLanding &&
    Boolean(parameterId) &&
    !validationRows.some((entry) => entry.id === parameterId);
  const section: SectionType = isInvalidContentRoute ? "notFound" : requestedSection;

  // English blog bodies live in their own module (src/data/blogContent.ts) so the
  // ~161 KB of article text is not part of every page's initial download. It is
  // fetched when a blog section is on screen — that covers both the article route
  // and the list route (so clicking a card is instant) — and never on the other
  // 122 routes. Idle scheduling keeps the fetch out of the critical path; the
  // fallback timer guarantees it still happens on browsers without
  // requestIdleCallback. Mirrors how ./data/bengaliContent is loaded for /bn/*.
  const [blogBodies, setBlogBodies] = useState<Readonly<Record<string, string>> | null>(null);
  useEffect(() => {
    if (section !== "blog" || locale === "bn" || blogBodies) return;
    let cancelled = false;
    const load = () => {
      import("./data/blogContent").then((mod) => {
        if (!cancelled) setBlogBodies(mod.BLOG_BODY);
      });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(load, { timeout: 2000 });
    } else {
      const timer = window.setTimeout(load, 0);
      return () => window.clearTimeout(timer);
    }
    return () => {
      cancelled = true;
    };
  }, [section, locale, blogBodies]);


  // Keep React state in lockstep with the URL locale — covers back/forward
  // navigation between /umrah and /bn/umrah as well as direct deep links.
  useEffect(() => {
    setLang(locale);
  }, [locale]);

  // Mobile Drawer User-Intent Accordion State (reduces vertical scroll depth)
  const getDefaultDrawerGroup = (sec: SectionType): "booking" | "destinations" | "research" | "tools" => {
    if (sec === "destinations" || sec === "experiences" || sec === "attractions") return "destinations";
    if (sec === "blog" || sec === "costs") return "research";
    if (sec === "tools" || sec === "sitemap" || sec === "preDeparture" || sec === "contact") return "tools";
    return "booking";
  };

  const [expandedDrawerGroup, setExpandedDrawerGroup] = useState<
    "booking" | "destinations" | "research" | "tools" | null
  >(() => getDefaultDrawerGroup(section));

  useEffect(() => {
    setExpandedDrawerGroup(getDefaultDrawerGroup(section));
  }, [section]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      mobileMenuCloseRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const drawer = mobileDrawerPanelRef.current;
      const focusableElements: HTMLElement[] = drawer
        ? Array.from(drawer.querySelectorAll(focusableSelector)).filter(
            (element): element is HTMLElement =>
              element instanceof HTMLElement && element.getClientRects().length > 0,
          )
        : [];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const focusIsOutsideDrawer = !drawer?.contains(document.activeElement);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        drawer?.focus();
        return;
      }
      if (event.shiftKey && (document.activeElement === firstElement || focusIsOutsideDrawer)) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (document.activeElement === lastElement || focusIsOutsideDrawer)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
      window.requestAnimationFrame(() => {
        if (mobileMenuTriggerRef.current?.isConnected) {
          mobileMenuTriggerRef.current.focus();
        }
      });
    };
  }, [mobileMenuOpen]);

  // Fetch the Banking & Forex hub FAQ pairs only when the hub is opened, then
  // let useSeoMeta rebuild the graph with the FAQPage node. Until it lands the
  // page keeps its breadcrumbs, and dist/banking.html already ships the static
  // FAQPage node, so the live graph never describes text the page does not show.
  useEffect(() => {
    if (section !== "banking" || bankingFaqs) return;
    let cancelled = false;
    void import("./data/bankingHubFaqs").then((mod) => {
      if (!cancelled) setBankingFaqs(mod.BANKING_HUB_FAQS);
    });
    return () => {
      cancelled = true;
    };
  }, [section, bankingFaqs]);

  // Dynamically compute metadata and schema
  let seoTitle = "URAL — Compare Flights, Hotels & Visa Guides for Bangladeshi Travelers";
  let seoDescription = "Compare flight prices from Dhaka to Nepal, Thailand, Malaysia and Dubai, check visa requirements step by step, and plan your trip budget in BDT.";
  let seoSchema: any = undefined;
  let seoBreadcrumbs: { name: string; url: string }[] = [];
  let seoImageUrl = `${SITE_ORIGIN}/og-image.jpg`;
  const pageLanguage = lang === "bn" ? "bn-BD" : "en-BD";

  if (section === "home") {
    if (!isBn) {
      // Same array that renders the visible #home-faqs section below and the
      // static FAQPage node in scripts/prerender.ts. See src/data/homeFaqs.ts.
      seoSchema = generateFAQSchema(HOME_FAQS);
    }
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) }
    ];
  } else if (section === "flights" && localizedFlights.length > 0) {
    const activeRoute = localizedFlights.find(r => r.id === parameterId) || localizedFlights[0];
    const year = new Date().getFullYear();
    const hubUrl = siteUrl("/flights", lang);

    if (isLanding) {
      seoTitle = `Flights from Dhaka: Compare Fares, Routes & Airlines (${year}) | URAL`;
      seoDescription = "Compare cheap international flights from Hazrat Shahjalal International Airport (DAC) to Nepal, Thailand, Malaysia, and Dubai. View flight duration, direct airlines, and BDT fares.";
      const collectionNode = collectionPageSchema({
        url: hubUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: localizedFlights.map((r) => ({
          name: isBn
            ? getBengaliSeoCopy(`/flights/${r.id}`)?.title || `${r.from} থেকে ${r.to} ফ্লাইট গাইড`
            : `${r.from} to ${r.to} Flight Guide`,
          url: siteUrl(`/flights/${r.id}`, lang),
          description: r.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("flights", undefined, true, hubUrl, localizedFlights);
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Flight Guides", url: hubUrl }
      ];
    } else {
      const routeUrl = siteUrl(`/flights/${activeRoute.id}`, lang);
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
      const faqSchema = getFaqSchemaForPage("flights", activeRoute.id, false, routeUrl, localizedFlights);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Flight Guides", url: hubUrl },
        { name: `${activeRoute.from.split(" (")[0]} to ${activeRoute.to.split(" (")[0]} Flight`, url: routeUrl }
      ];
    }

  } else if (section === "hotels" && localizedHotels.length > 0) {
    const activeHotel = localizedHotels.find(h => h.id === parameterId) || localizedHotels[0];
    const hubUrl = siteUrl("/hotels", lang);

    if (isLanding) {
      seoTitle = `International Hotel Guides for Bangladeshi Travelers (2026) | URAL`;
      seoDescription = "Find top-rated budget & family hotels in Kathmandu, Bangkok, Kuala Lumpur, and Dubai. Neighborhood safety, halal dining, and BDT payment guides.";
      const collectionNode = collectionPageSchema({
        url: hubUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: localizedHotels.map((h) => ({
          name: isBn
            ? getBengaliSeoCopy(`/hotels/${h.id}`)?.title || `${h.city} হোটেল গাইড (${h.country})`
            : `Best Hotels in ${h.city} (${h.country})`,
          url: siteUrl(`/hotels/${h.id}`, lang),
          description: h.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("hotels", undefined, true, hubUrl, localizedHotels);
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Hotel Neighborhoods", url: hubUrl }
      ];
    } else {
      const hotelUrl = siteUrl(`/hotels/${activeHotel.id}`, lang);
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
      const faqSchema = getFaqSchemaForPage("hotels", activeHotel.id, false, hotelUrl, localizedHotels);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Hotel Neighborhoods", url: hubUrl },
        { name: `${activeHotel.city} Hotels`, url: hotelUrl }
      ];
    }

  } else if (section === "visa" && localizedVisas.length > 0) {
    const activeVisa = localizedVisas.find(v => v.id === parameterId) || localizedVisas[0];
    const hubUrl = siteUrl("/visa", lang);

    if (isLanding) {
      seoTitle = `Visa Requirements for Bangladeshi Citizens 2026: Guides & Checklists | URAL`;
      seoDescription = isBn
        ? "বাংলাদেশি নাগরিকদের বর্তমান visa guidance দেখুন। Thailand e-Visa-এর সরকারি fee, bank/payment charge ও optional agency fee আলাদা; official source-এ যাচাই করুন।"
        : "Check current tourist visa guidance for Bangladeshi citizens, including Nepal entry rules, Thailand's official e-Visa process, Malaysia eVisa, and Dubai visas. Verify live government fees; bank/payment and optional agency charges are separate.";
      const collectionNode = collectionPageSchema({
        url: hubUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: localizedVisas.map((v) => ({
          name: isBn
            ? getBengaliSeoCopy(`/visa/${v.id}`)?.title || `${v.country} ভিসা গাইড`
            : `${v.country} Visa Guide for Bangladeshis`,
          url: siteUrl(`/visa/${v.id}`, lang),
          description: v.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("visa", undefined, true, hubUrl, localizedVisas);
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Visa Guides", url: hubUrl }
      ];
    } else {
      const visaUrl = siteUrl(`/visa/${activeVisa.id}`, lang);
      seoTitle = activeVisa.id === "nepal-visa"
        ? `Nepal Visa for Bangladeshi Citizens 2026: Free Visa on Arrival Guide | URAL`
        : `${activeVisa.country} Visa for Bangladeshi Travelers 2026 | URAL`;
      seoDescription = activeVisa.id === "nepal-visa"
        ? `Bangladeshi citizens get a free 30-day Nepal visa on arrival for their first trip each year. Full document checklist, fees for repeat visits, and step-by-step process.`
        : activeVisa.id === "thailand-visa"
          ? isBn
            ? "Thailand e-Visa-এর জন্য official portal ব্যবহার করুন। Dhaka TR checklist (হালনাগাদ ৩০ নভেম্বর ২০২২) জনপ্রতি BDT 60,000/পরিবারে BDT 120,000 উল্লেখ করে—বর্তমান requirement যাচাই করুন। সরকারি fee, bank/payment ও optional agency fee আলাদা।"
            : "Bangladeshi applicants use Thailand's official e-Visa portal. The Dhaka TR checklist updated November 30, 2022 lists BDT 60,000/person or BDT 120,000/family; verify current rules. Government, bank/payment and optional agency charges are separate."
          : `Check complete visa requirements, costs in BDT, step-by-step instructions, and checklist for ${activeVisa.country} from Dhaka.`;

      let schemaObj: any = undefined;
      try {
        if (activeVisa.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeVisa.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const faqSchema = getFaqSchemaForPage("visa", activeVisa.id, false, visaUrl, localizedVisas);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Visa Guides", url: hubUrl },
        { name: `${activeVisa.country} Visa`, url: visaUrl }
      ];
    }

  } else if (section === "destinations" && DESTINATIONS_DATA.length > 0) {
    const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];
    const hubUrl = siteUrl("/destinations", lang);

    if (isLanding) {
      seoTitle = `Outbound Travel Plans & Itineraries from Bangladesh | URAL`;
      seoDescription = "Browse destination guides from Bangladesh with practical itinerary outlines, local planning notes and links to existing travel tools.";
      const collectionNode = collectionPageSchema({
        url: hubUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: DESTINATIONS_DATA.map((d) => ({
          name: `${d.country} destination guide from Bangladesh`,
          url: siteUrl(`/destinations/${d.id}`, lang),
          description: d.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("destinations", undefined, true, hubUrl, DESTINATIONS_DATA);
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Destinations", url: hubUrl }
      ];
    } else {
      const destUrl = siteUrl(`/destinations/${activeDes.id}`, lang);
      seoTitle = activeDes.id === "nepal-guide"
        ? `Nepal Trip Plan from Bangladesh: 5-Day Itinerary & Costs (2026) | URAL`
        : activeDes.id === "thailand-guide"
        ? "Bangkok Destination Guide from Bangladesh: Four-Day Plan | URAL"
        : activeDes.id === "dubai-guide"
        ? "Dubai Destination Guide from Bangladesh: Four-Day Plan | URAL"
        : activeDes.id === "maldives-guide"
        ? "Maldives Destination Guide from Bangladesh: Island Planning | URAL"
        : activeDes.id === "london-guide"
        ? "London Destination Guide from Bangladesh: Landmarks & Planning | URAL"
        : activeDes.id === "italy-guide"
        ? "Italy Itinerary from Bangladesh: Rome, Milan & Venice | URAL"
        : activeDes.id === "paris-guide"
        ? "Paris Itinerary from Bangladesh: Landmarks & Planning | URAL"
        : activeDes.id === "new-york-guide"
        ? "New York City Itinerary from Bangladesh: Landmarks & Planning | URAL"
        : `${activeDes.country} Tour Itinerary & Travel Plan from Bangladesh | URAL`;
      seoDescription = activeDes.id === "nepal-guide"
        ? "Plan a flexible Nepal trip around Kathmandu, nearby heritage sites and Pokhara. Check current entry, transport, access and cost details for your dates."
        : activeDes.id === "thailand-guide"
        ? "Plan a flexible four-day Bangkok visit with riverside sights, city neighborhoods and an optional day trip. Check current opening, transport and entry details for your dates."
        : activeDes.id === "singapore-guide"
        ? "Plan four flexible days in Singapore around waterfront sights, a heritage neighborhood and optional Sentosa. Check current attraction access, transit and entry details for your dates."
        : activeDes.id === "dubai-guide"
        ? "Plan a flexible four-day Dubai visit around Downtown, the Creek and an optional excursion. Check current attraction access, transport, tour terms and entry details for your dates."
        : activeDes.id === "maldives-guide"
        ? "Plan a flexible Maldives stay around one island base, transfers and optional marine activities. Check current access, local rules, schedules and entry details for your dates."
        : activeDes.id === "london-guide"
        ? "Plan a London visit around landmarks, museums, river experiences and local transport. Check current attraction, entry and transport details for your dates."
        : activeDes.id === "italy-guide"
        ? "Plan a flexible six-day route through Rome, Milan and Venice. Compare current intercity transport, attraction access and official entry guidance for your travel dates."
        : activeDes.id === "paris-guide"
        ? "Plan a flexible Paris itinerary around museums, landmarks and the Seine. Check current opening, ticket, transport and entry information for your dates."
        : activeDes.id === "new-york-guide"
        ? "Plan New York City around harbor sights, parks, museums and selected neighborhoods. Check current attraction, transport and entry information for your dates."
        : `Find tourist route plans, day-by-day itineraries, local transport guides, and estimated daily spends in BDT.`;

      let schemaObj: any = undefined;
      try {
        if (activeDes.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeDes.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const tripNode = touristTripSchema({
        url: destUrl,
        name: `${activeDes.country} destination guide from Dhaka`,
        description: isBn ? activeDes.quickAnswer : seoDescription,
        country: activeDes.country,
        places: activeDes.itinerary?.map((p) => p.title) || [activeDes.country],
        inLanguage: pageLanguage,
      });
      const faqSchema = getFaqSchemaForPage("destinations", activeDes.id, false, destUrl, DESTINATIONS_DATA);
      seoSchema = [isBn ? undefined : schemaObj, tripNode, faqSchema].filter(Boolean);

      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Destinations", url: hubUrl },
        { name: `${activeDes.country} Guide`, url: destUrl }
      ];
    }

  } else if (section === "costs" && localizedCosts.length > 0) {
    const activeCost = localizedCosts.find(c => c.id === parameterId) || localizedCosts[0];
    const hubUrl = siteUrl("/costs", lang);

    if (isLanding) {
      seoTitle = `International Trip Budgets from Bangladesh: Realistic BDT Cost Guides | URAL`;
      seoDescription = "How much does an international trip really cost from Dhaka? Detailed BDT budgets for Nepal, Thailand, Malaysia, and Dubai covering flights, hotels, food & transport.";
      const collectionNode = collectionPageSchema({
        url: hubUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: localizedCosts.map((c) => ({
          name: isBn
            ? getBengaliSeoCopy(`/costs/${c.id}`)?.title || `${c.country} ভ্রমণ খরচ (BDT)`
            : `${c.country} 5-Day Trip Cost Breakdown in BDT`,
          url: siteUrl(`/costs/${c.id}`, lang),
          description: c.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("costs", undefined, true, hubUrl, localizedCosts);
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Trip Costs", url: hubUrl }
      ];
    } else {
      const costUrl = siteUrl(`/costs/${activeCost.id}`, lang);
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
      const faqSchema = getFaqSchemaForPage("costs", activeCost.id, false, costUrl, localizedCosts);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Trip Costs", url: hubUrl },
        { name: `${activeCost.country} Costs`, url: costUrl }
      ];
    }

  } else if (section === "tools") {
    const activeToolSlug = isToolSlug(parameterId) ? parameterId : null;
    const activeToolTab = activeToolSlug ? SLUG_TO_TOOL_TAB[activeToolSlug] : null;
    const toolsUrl = siteUrl("/tools", lang);
    if (activeToolSlug && activeToolTab) {
      // Canonical /tools/<slug> page: unique title, description and
      // breadcrumbs per tool (the FAQ node stays on the hub only — the same
      // four Q&As must not be emitted as duplicate FAQPage graphs on six URLs).
      const toolUrl = siteUrl(`/tools/${activeToolSlug}`, lang);
      const toolCopy = TOOL_PAGE_SEO[activeToolSlug];
      seoTitle = (toolCopy?.titleEn) || "Travel Planning Tools for Bangladesh Travelers | URAL";
      seoDescription = (toolCopy?.descriptionEn) ||
        "Access handy travel utility tools for Bangladeshi outbound tourists: live BDT exchange rates, power plug specifications, packing checklist, and translation aids.";
      seoSchema = serviceSchema({
        url: toolUrl,
        idSuffix: `service-travel-tools-${activeToolSlug}`,
        name: toolCopy?.serviceNameEn || "Bangladesh Outbound Travel Planning Utility",
        description: seoDescription,
        serviceType: "Travel Planning & Flight Compensation Utility",
      });
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: isBn ? "ভ্রমণ টুলস" : "Travel Tools", url: toolsUrl },
        {
          name: isBn ? (toolCopy?.nameBn || toolCopy?.nameEn || "টুল") : (toolCopy?.nameEn || "Tool"),
          url: toolUrl,
        },
      ];
    } else {
      seoTitle = "Bangladeshi Traveler Utility Tools & Services (2026) | URAL";
      seoDescription = "Access handy travel utility tools for Bangladeshi outbound tourists: live BDT exchange rates, power plug specifications, packing checklist, and translation aids.";
      const toolsServiceNode = serviceSchema({
        url: toolsUrl,
        idSuffix: "service-travel-tools",
        name: "Bangladesh Outbound Currency, Visa Odds & Flight Delay Claim Tools",
        description: seoDescription,
        serviceType: "Travel Planning & Flight Compensation Utility",
      });
      const faqSchema = getFaqSchemaForPage("tools", undefined, true, toolsUrl);
      seoSchema = faqSchema ? [toolsServiceNode, faqSchema] : [toolsServiceNode];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Travel Tools", url: toolsUrl }
      ];
    }

  } else if (section === "blog" && localizedBlogs.length > 0) {
    const activePost = localizedBlogs.find(p => p.slug === parameterId) || localizedBlogs[0];
    const canonicalPost = BLOG_DATA.find(p => p.slug === activePost.slug) || activePost;
    const hubUrl = siteUrl("/blog", lang);
    if (isLanding) {
      seoTitle = "Travel Guides, Umrah Preparation & Outbound Intelligence for Bangladesh (2026) | URAL Blog";
      seoDescription = "Explore verified travel guides built for Bangladeshi travelers: DIY Umrah & Hajj preparation, dual-currency card endorsement, visa checklists, and family trip budgets in BDT.";
      seoSchema = collectionPageSchema({
        url: hubUrl,
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        includeNumberOfItems: false,
        items: localizedBlogs.map((p) => ({
          name: p.title,
          url: siteUrl(`/blog/${p.slug}`, lang),
          description: p.summary,
        })),
      });
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Travel Guides", url: hubUrl }
      ];
    } else {
      const postUrl = siteUrl(`/blog/${activePost.slug}`, lang);
      const postImgUrl = `${SITE_ORIGIN}/img/blog/${activePost.slug}.jpg`;
      const bnPostSeo = isBn ? bnContent?.getBengaliRouteSeo(`/blog/${activePost.slug}`) : null;
      seoTitle = `${activePost.title} | URAL Travel Blog`;
      seoDescription = bnPostSeo?.description || activePost.summary;
      seoImageUrl = postImgUrl;

      const articleNode = articleSchema({
        url: postUrl,
        headline: bnPostSeo?.h1 || activePost.title,
        description: bnPostSeo?.description || activePost.summary,
        slug: activePost.slug,
        datePublished: canonicalPost.date,
        dateModified: canonicalPost.updatedAt || canonicalPost.date,
        authorRaw: canonicalPost.author,
        articleSection: activePost.category,
        imageUrl: postImgUrl,
        inLanguage: pageLanguage,
      });

      const articleBodyForSchema = isBn
        ? activePost.content || ""
        : blogBodies?.[activePost.slug] || activePost.content || "";
      const structuredDataLocale = isBn ? "bn" : "en";
      const visibleFaqSection = getVisibleBlogFaqSection(
        activePost.slug,
        articleBodyForSchema,
        structuredDataLocale
      );
      const pageSchemaNodes: Record<string, unknown>[] = [articleNode];

      if (visibleFaqSection) {
        pageSchemaNodes.push(
          faqPageNodeSchema({
            url: postUrl,
            faqs: visibleFaqSection.questions,
            inLanguage: pageLanguage,
          })
        );
      }

      for (const howTo of getVisibleBlogHowTos(
        activePost.slug,
        articleBodyForSchema,
        structuredDataLocale
      )) {
        pageSchemaNodes.push(
          howToSchema({
            url: postUrl,
            idSuffix: howTo.idSuffix,
            name: howTo.name,
            steps: howTo.steps,
            inLanguage: pageLanguage,
          })
        );
      }

      seoSchema = pageSchemaNodes;

      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: "Travel Guides", url: hubUrl },
        { name: bnPostSeo?.h1 || activePost.title, url: postUrl }
      ];
    }
  } else if (section === "contact") {
    const contactUrl = siteUrl("/contact", lang);
    seoTitle = "Contact URAL — Direct Phone & WhatsApp Support";
    seoDescription = "Connect directly with our flight & visa support desk at +8801784385335. Send us an inquiry for flight packages, visa assistance, and personalized outbound plans.";
    const contactServiceNode = serviceSchema({
      url: contactUrl,
      idSuffix: "service-visa-assistance",
      name: "Bangladesh Outbound Visa Assistance & BDT Booking Desk",
      description:
        "Visa checklist review, document preparation, and flight/hotel booking in Bangladeshi Taka via bKash or bank transfer for Bangladeshi passport holders.",
      serviceType: "Visa Assistance",
    });
    const faqSchema = getFaqSchemaForPage("contact", undefined, true, contactUrl);
    seoSchema = faqSchema ? [contactServiceNode, faqSchema] : [contactServiceNode];
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: "Contact Us", url: contactUrl }
    ];
  } else if (section === "about") {
    const aboutUrl = siteUrl("/about", lang);
    seoTitle = isBn
      ? "URAL Travel Intelligence — আমাদের সম্পর্কে | স্বাধীন ভ্রমণ গাইড"
      : "About URAL Travel Intelligence | Farhan Momen, Founder & Travel Editor";
    seoDescription = isBn
      ? "URAL হলো একটি স্বাধীন ট্রাভেল ইন্টেলিজেন্স প্ল্যাটফর্ম — প্রচলিত ট্রাভেল এজেন্সি নয়। ফারহান মোমেন দ্বারা প্রতিষ্ঠিত, বাংলাদেশি ভ্রমণকারীদের জন্য নিরপেক্ষ ফ্লাইট, হোটেল, ভিসা ও BDT বাজেট গাইড।"
      : "URAL is an independent travel intelligence platform — not a licensed travel agency. Founded by Farhan Momen to give Bangladeshi travelers verified, unbiased flight comparisons, hotel zones, visa checklists, and BDT budgets.";
    const personSchema = {
      "@type": "Person",
      name: "Farhan Momen",
      jobTitle: "Founder & Travel Editor",
      url: aboutUrl,
      sameAs: [
        URAL_SOCIAL_LINKS.facebook,
        URAL_SOCIAL_LINKS.instagram,
        URAL_SOCIAL_LINKS.linkedin,
      ],
    };
    const orgSchema = {
      "@type": "Organization",
      name: "URAL Travel Intelligence",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/assets/brand/svg/ural-wordmark-v1.svg`,
      description: seoDescription,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+8801784385335",
        contactType: "customer support",
        availableLanguage: ["Bengali", "English"],
      },
    };
    seoSchema = [personSchema, orgSchema];
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: isBn ? "আমাদের সম্পর্কে" : "About", url: aboutUrl }
    ];
  } else if (section === "experiences") {
    const region = parameterId === "europe" ? "europe" : parameterId === "asia" ? "asia" : "all";
    const experiencesUrl = siteUrl(parameterId ? `/experiences/${parameterId}` : "/experiences", lang);
    if (region === "europe") {
      seoTitle = "European Attraction Passes & Skip-the-Line Tickets (Tiqets) | URAL";
      seoDescription = "Skip the line in Paris, London, Rome, Milan, and Venice with official Tiqets passes. Louvre, Eiffel Tower, Colosseum, Duomo, and more for Bangladeshi Schengen visa travelers.";
    } else if (region === "asia") {
      seoTitle = "Asian Attraction Passes & Tours (Klook) | URAL";
      seoDescription = "Book discounted Klook tours in Dubai, Bangkok, Singapore, and Kuala Lumpur. Skip-the-line entry, city passes, and attraction bundles for Bangladeshi travelers.";
    } else {
      seoTitle = "Europe, UK, USA & Asian Attraction Passes (Tiqets & Klook Hub) | URAL";
      seoDescription = "Skip the line in Paris, London, Rome, Milan, Venice, and New York with official Tiqets passes, or book discounted Klook tours in Dubai, Bangkok, Singapore, and KL.";
    }
    seoSchema = [
      productOfferSchema({
        url: experiencesUrl,
        idSuffix: "product-airalo-saudi-esim",
        name: "Saudi Arabia Travel eSIM for Umrah (5 GB / 30 days)",
        description:
          "Prepaid data eSIM covering Makkah, Madinah and Jeddah, activated before departure from Dhaka.",
        sku: "airalo-saudi-5gb-30d",
        brandName: "Airalo",
        priceBdt: 2100,
      }),
      productOfferSchema({
        url: experiencesUrl,
        idSuffix: "product-tiqets-paris-pass",
        name: "Paris Louvre, Eiffel Tower & Seine River Skip-the-Line Bundle",
        description:
          "Official mobile-entry attraction bundle for Bangladeshi Schengen visa travelers visiting Paris.",
        sku: "tiqets-paris-bundle-2026",
        brandName: "Tiqets",
        priceBdt: 9800,
      }),
    ];
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: "Attractions & Passes", url: experiencesUrl }
    ];
  } else if (section === "attractions") {
    const attractionsUrl = siteUrl("/attractions", lang);
    if (!parameterId) {
      seoTitle = isBn
        ? "ইউরোপের আকর্ষণ এবং টিকিট পাস (Tiqets) | URAL"
        : "European Attractions & Skip-the-Line Passes (Tiqets) | URAL";
      seoDescription = isBn
        ? "প্যারিস, লন্ডন, রোম, মিলান, ভেনিস এবং নিউ ইয়র্কে লাইনে না দাঁড়িয়ে টিকিট পান Tiqets পাসের মাধ্যমে। লুভর, আইফেল টাওয়ার, কলোজিয়াম, ডুয়োমো ও আরও ৫৯টি আকর্ষণ ৯টি ইউরোপিয়ন শহরে।"
        : "Skip the line in Paris, London, Rome, Milan, Venice, and New York with official Tiqets passes. Louvre, Eiffel Tower, Colosseum, Duomo, and 59 curated attractions across 9 European cities for Bangladeshi travelers.";
      seoSchema = [
        productOfferSchema({
          url: attractionsUrl,
          idSuffix: "product-tiqets-paris-pass",
          name: "Paris Louvre, Eiffel Tower & Seine River Skip-the-Line Bundle",
          description:
            "Official mobile-entry attraction bundle for Bangladeshi Schengen visa travelers visiting Paris.",
          sku: "tiqets-paris-bundle-2026",
          brandName: "Tiqets",
          priceBdt: 9800,
        }),
      ];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: isBn ? "ইউরোপীয় আকর্ষণ" : "European Attractions", url: attractionsUrl }
      ];
    } else {
      // Attraction detail page: /attractions/cityId:attractionId
      const [cityId, attractionId] = parameterId.split(":");
      const attractionUrl = siteUrl(`/attractions/${parameterId}`, lang);
      const cityLabel = cityId.replace(/-/g, " ");
      const attrLabel = attractionId.replace(/-/g, " ");
      seoTitle = isBn
        ? `${attrLabel} — টিকিট ও পাস | URAL`
        : `${attrLabel} — Tickets & Passes | URAL`;
      seoDescription = isBn
        ? `${attrLabel} — ${cityLabel}-এ স্কিপ-দ্য-লাইন টিকেট ও Tiqets পাস। বাংলাদেশী ভ্রমণকারীদের জন্য দ্রুত বুকিং করুন।`
        : `${attrLabel} in ${cityLabel} — Skip-the-line tickets & Tiqets passes for Bangladeshi travelers. Book instantly before your trip from Dhaka.`;
      seoSchema = [
        productOfferSchema({
          url: attractionUrl,
          idSuffix: `product-tiqets-${attractionId}`,
          name: attrLabel,
          description: `${attrLabel} — ${cityLabel} attraction pass for Bangladeshi travelers.`,
          sku: `tiqets-${attractionId}`,
          brandName: "Tiqets",
          priceBdt: 0,
        }),
      ];
      seoBreadcrumbs = [
        { name: "Home", url: siteUrl("/", lang) },
        { name: isBn ? "ইউরোপীয় আকর্ষণ" : "European Attractions", url: attractionsUrl },
        { name: cityLabel, url: siteUrl(`/attractions/${cityId}`, lang) },
        { name: attrLabel, url: attractionUrl }
      ];
    }
  } else if (section === "kkdayHotels") {
    const kkdayHotelsUrl = siteUrl("/kkday-hotels", lang);
    seoTitle = isBn
      ? getBengaliSeoCopy("/kkday-hotels")?.title || "KKday হোটেল ও স্টে ডিল | URAL"
      : "KKday Hotel & Stay Deals for Bangladeshi Travelers | URAL";
    seoDescription = isBn
      ? getBengaliSeoCopy("/kkday-hotels")?.description || ""
      : "Compare hotels and stays on KKday from Bangladesh, with city guides for Kathmandu, Bangkok, Kuala Lumpur, Singapore, Maldives and Dubai. Check cancellation terms before paying.";
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: "KKday Hotel & Stay Deals", url: kkdayHotelsUrl }
    ];
  } else if (section === "umrah") {
    const umrahUrl = siteUrl("/umrah", lang);
    seoTitle = "Umrah Cost from Bangladesh: DIY Guide & Nusuk | URAL";
    seoDescription = "Plan Umrah from Dhaka with a BDT cost framework, Saudi visa and Nusuk guidance, Makkah–Madinah travel options, and a practical preparation checklist.";
    const umrahFaqNode = generateFAQSchema(localizedHajjFaqs, {
      url: umrahUrl,
      name: isBn
        ? getBengaliSeoCopy("/umrah")?.title || "উমরাহ ও হজ গাইড"
        : "Umrah & Hajj Planning Hub from Bangladesh (2026)",
    }) as unknown as Record<string, unknown>;
    umrahFaqNode["@id"] = `${umrahUrl}#faq`;
    umrahFaqNode["mainEntityOfPage"] = { "@id": `${umrahUrl}#webpage` };
    umrahFaqNode["inLanguage"] = pageLanguage;
    seoSchema = umrahFaqNode;
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: "Umrah & Hajj Hub", url: umrahUrl }
    ];
  } else if (section === "banking") {
    const bankingUrl = siteUrl("/banking", lang);
    seoTitle = isBn
      ? getBengaliSeoCopy("/banking")?.title || "ডলার এনডোর্সমেন্ট ও ডুয়েল কারেন্সি কার্ড | URAL"
      : "Dollar Endorsement Limit, Dual-Currency Card & NOC | URAL";
    seoDescription = isBn
      ? getBengaliSeoCopy("/banking")?.description ||
        "পাসপোর্টে ডলার এনডোর্সমেন্টের সীমা, ডুয়েল কারেন্সি কার্ড, USD 300 অনলাইন নিয়ম, RFCD ও NOC — বাংলাদেশ ব্যাংকের সূত্রসহ।"
      : "Bangladesh's passport dollar-endorsement limit, dual-currency cards, the USD 300 online-payment rule, RFCD accounts and NOC paperwork, with primary sources.";
    const bankingFaqPairs = bankingFaqs?.map((faq) => ({
      question: isBn ? faq.questionBn : faq.question,
      answer: isBn ? faq.answerBn : faq.answer,
    }));
    const bankingFaqNode = bankingFaqPairs
      ? (generateFAQSchema(bankingFaqPairs, {
          url: bankingUrl,
          name: isBn
            ? getBengaliSeoCopy("/banking")?.title || "ব্যাংকিং ও ফরেক্স হাব"
            : "Banking & Forex Hub for Bangladeshi Travellers (2026)",
        }) as unknown as Record<string, unknown>)
      : undefined;
    if (bankingFaqNode) {
      bankingFaqNode["@id"] = `${bankingUrl}#faq`;
      bankingFaqNode["mainEntityOfPage"] = { "@id": `${bankingUrl}#webpage` };
      bankingFaqNode["inLanguage"] = pageLanguage;
      seoSchema = bankingFaqNode;
    }
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: "Money & Banking Hub", url: bankingUrl }
    ];
  } else if (section === "preDeparture") {
    const preDepartureUrl = siteUrl("/pre-departure", lang);
    seoTitle = "Dhaka Airport (DAC) Pre-Departure Checklist & Helplines | URAL";
    seoDescription = "Interactive pre-flight readiness checklist for Bangladeshi travelers departing Dhaka Airport (DAC): cabin & Zamzam baggage rules, digital arrival cards and verified Bangladesh Embassy emergency helplines abroad.";
    if (!isBn) {
      seoSchema = getPreDepartureFaqSchema({
        url: preDepartureUrl,
      });
    }
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: isBn ? "প্রি-ডিপার্চার হাব" : "Pre-Departure Hub", url: preDepartureUrl }
    ];
  } else if (section === "sitemap") {
    const sitemapUrl = siteUrl("/sitemap", lang);
    seoTitle = "Complete URAL Travel Site Directory & Guide Index | URAL";
    seoDescription = "Every URAL page in one place: flights, visas, hotels, BDT budgets, destination itineraries, Umrah preparation, travel tools and the full blog index for Bangladeshi travelers.";
    // No FAQPage node here — the pre-departure FAQs live on /pre-departure
    // now, and a duplicate FAQ graph on the directory page would compete.
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: isBn ? "সাইট ডিরেক্টরি" : "Site Directory", url: sitemapUrl }
    ];
  } else if (section === "privacy") {
    const privacyUrl = siteUrl("/privacy", lang);
    seoTitle = isBn
      ? "গোপনীয়তা ও কুকি নীতিমালা — URAL Travel Intelligence"
      : "Privacy & Cookie Policy — URAL Travel Intelligence";
    seoDescription = isBn
      ? "URAL Travel Intelligence-এর গোপনীয়তা ও কুকি নীতিমালা। আমরা কীভাবে ভিজিটর ডেটা, গুগল কনসেন্ট মোড v2 ও ট্রাভেলপেআউটস পার্টনার কুকিজ নিরাপদে হ্যান্ডেল করি জানুন।"
      : "Privacy and Cookie Policy for URAL Travel Intelligence. Learn how we handle visitor data, Google Tag Manager, GA4, Consent Mode v2, and affiliate partner cookies with transparency and security.";
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: isBn ? "গোপনীয়তা ও কুকি নীতিমালা" : "Privacy & Cookie Policy", url: privacyUrl }
    ];
  } else if (section === "visaFree") {
    const visaFreeUrl = siteUrl("/visa-free-countries", lang);
    seoTitle = isBn
      ? "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া যেসব দেশে যাওয়া যায় (২০২৬) | URAL"
      : "Visa-Free Countries for a Bangladeshi Passport (2026) | URAL";
    seoDescription = isBn
      ? "বাংলাদেশি পাসপোর্টে আগে থেকে ভিসা ছাড়া যেসব দেশে যাওয়া যায় — ঢাকা থেকে বাস্তবে ব্যবহারযোগ্য তালিকা, ট্রানজিট ভিসার ফাঁদ, খরচ ও অবস্থানের নিয়মসহ।"
      : "Which countries a Bangladeshi passport can enter without a prior visa in 2026: the three you can use directly from Dhaka, the full visa-free list, the transit-visa trap, and the destinations travellers wrongly assume are easy.";
    seoBreadcrumbs = [
      { name: "Home", url: siteUrl("/", lang) },
      { name: isBn ? "ভিসা গাইড" : "Visa Guides", url: siteUrl("/visa", lang) },
      { name: isBn ? "ভিসা ছাড়া দেশ" : "Visa-Free Countries", url: visaFreeUrl }
    ];
  }

  if (section === "notFound") {
    seoTitle = "Page not found | URAL";
    seoDescription = "The requested URAL travel page could not be found. Browse the travel guides or return to the homepage.";
  }

  const seoRoutePath = (() => {
    if (section === "home") return "/";
    if (["flights", "hotels", "visa", "destinations", "costs"].includes(section)) {
      return isLanding ? `/${section}` : `/${section}/${parameterId}`;
    }
    if (section === "blog") return isLanding ? "/blog" : `/blog/${parameterId}`;
    if (section === "experiences") return parameterId ? `/experiences/${parameterId}` : "/experiences";
    if (section === "attractions") return isLanding ? "/attractions" : `/attractions/${parameterId}`;
    if (section === "umrah") return "/umrah";
    if (section === "banking") return "/banking";
    if (section === "kkdayHotels") return "/kkday-hotels";
    if (section === "visaFree") return "/visa-free-countries";
    if (section === "preDeparture") return "/pre-departure";
    if (section === "sitemap") return "/sitemap";
    if (section === "privacy") return "/privacy";
    if (section === "tools") {
      return isToolSlug(parameterId) ? `/tools/${parameterId}` : "/tools";
    }
    if (section === "contact") return "/contact";
    return new URL(currentPath, SITE_ORIGIN).pathname;
  })();

  // Bengali pages must never fall back to the English copy tables: prefer the
  // hand-written BENGALI_SEO_COPY, then the generated /bn metadata from
  // bengaliContent (loaded lazily on /bn routes), then a compact fallback.
  const sharedSeoCopy = isBn
    ? (() => {
        // Same precedence as scripts/prerender.ts: hand-written Bengali SERP
        // copy, then copy generated from the Bengali data, then a compact
        // fallback. Keeping the order identical is what guarantees the client
        // renders the same <title> the crawler already saw.
        const bnHandWritten = getBengaliSeoCopy(seoRoutePath);
        if (bnHandWritten) return bnHandWritten;
        const bnGenerated = bnContent?.getBengaliRouteSeo(seoRoutePath);
        if (bnGenerated) {
          return { title: bnGenerated.title, description: bnGenerated.description };
        }
        return getSeoCopy(seoRoutePath, seoTitle, seoDescription, "bn");
      })()
    : getSeoCopy(seoRoutePath, seoTitle, seoDescription);
  seoTitle = sharedSeoCopy.title;
  seoDescription = sharedSeoCopy.description;

  const syncPageSchemaCopy = (schemaNode: any): any => {
    if (typeof schemaNode === "string") {
      return isBn ? localizePublicSiteUrl(schemaNode, "bn") : schemaNode;
    }
    if (Array.isArray(schemaNode)) return schemaNode.map(syncPageSchemaCopy);
    if (!schemaNode || typeof schemaNode !== "object") return schemaNode;

    const updatedNode: Record<string, any> = {};
    for (const [k, v] of Object.entries(schemaNode)) {
      updatedNode[k] = syncPageSchemaCopy(v);
    }
    if (updatedNode["@type"] === "WebPage" || updatedNode["@type"] === "CollectionPage") {
      updatedNode.name = seoTitle;
      updatedNode.description = seoDescription;
    }
    return updatedNode;
  };
  seoSchema = syncPageSchemaCopy(seoSchema);

  if (isBn && seoBreadcrumbs.length > 0) {
    const bnLastLabel =
      bnContent?.getBengaliRouteSeo(seoRoutePath)?.h1 ??
      seoTitle.replace(/\s*\|\s*URAL.*$/i, "").trim();
    const isBlogHubPage = section === "blog" && isLanding;
    seoBreadcrumbs = seoBreadcrumbs.map((crumb, idx) => {
      const isLast = idx === seoBreadcrumbs.length - 1;
      return {
        name: isLast
          ? isBlogHubPage
            ? BN_BREADCRUMB_LABELS[crumb.name] || crumb.name
            : bnLastLabel
          : BN_BREADCRUMB_LABELS[crumb.name] || crumb.name,
        url: localizePublicSiteUrl(crumb.url, "bn"),
      };
    });
  }

  // Call the hook at the top level
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    schema: seoSchema,
    breadcrumbs: seoBreadcrumbs,
    imageUrl: seoImageUrl,
    inLanguage: pageLanguage,
    noindex: section === "notFound",
  });

  // Helper that normalizes legacy query-string paths to clean path-based routes
  const normalizeRoutePath = (rawPath: string): string => {
    try {
      const u = new URL(rawPath, SITE_ORIGIN);
      const p = u.pathname;
      const sp = u.searchParams;
      if (p === "/flights" && sp.get("route")) return `/flights/${sp.get("route")}`;
      if (p === "/hotels" && sp.get("city")) return `/hotels/${sp.get("city")}`;
      if (p === "/visa" && sp.get("country")) return `/visa/${sp.get("country")}`;
      if (p === "/destinations" && sp.get("country")) return `/destinations/${sp.get("country")}`;
      if (p === "/costs" && sp.get("country")) return `/costs/${sp.get("country")}`;
      if (p === "/blog" && sp.get("slug")) return `/blog/${sp.get("slug")}`;
      if (p === "/tools") {
        // Legacy ?tab= deep links converge on the canonical tool paths in-app
        // (functions/_middleware.js 301s the same hop at the edge).
        const toolPath = toolPathForTab(sp.get("tab"));
        if (toolPath) return toolPath;
      }
      if (p === "/indexing") return "/sitemap";
      return u.pathname + u.search + u.hash;
    } catch {
      return rawPath;
    }
  };

  /**
   * Maps an English base path to its localised URL.
   * Idempotent: a path that already carries the /bn prefix is normalised back to
   * the English base first, so toLocalePath(toLocalePath(p, "bn"), "bn") is
   * stable and switching languages twice can never produce /bn/bn/…
   * Query strings and hashes are preserved ("/experiences/europe").
   */
  const toLocalePath = (path: string, target: Language): string => {
    const match = String(path || "/").match(/^([^?#]*)([\s\S]*)$/);
    const pathname = match?.[1] || "/";
    const rest = match?.[2] || "";
    const base = pathname.replace(/^\/bn(?=\/|$)/, "") || "/";
    if (target === "en") return `${base}${rest}`;
    return base === "/" ? `/bn${rest}` : `/bn${base}${rest}`;
  };

  /** Low-level history push — no locale awareness (see navigateTo). */
  const pushPath = (path: string) => {
    const cleanPath = normalizeRoutePath(path);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", cleanPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setCurrentPath(cleanPath);
    setMobileMenuOpen(false);
    setDesktopMenuOpen(null);
  };

  /**
   * Locale routing for links and navigation, with one rule that used to be
   * missing: a route with no Bengali counterpart must never resolve to /bn/…
   *
   * `DEFERRED_BN_GROUPS` (src/utils/localeRoutes.ts) lists route groups the
   * prerender intentionally withholds in Bengali until localized content exists.
   * Destination guides now have Bengali counterparts, so hasBengaliCounterpart()
   * allows their `/bn/…` paths while keeping future untranslated routes on the
   * safe English fallback. The client and prerender use the same gate across the
   * desktop mega-panel, mobile drawer, homepage grid and footer.
   *
   * The fallback is the English path, not a hidden link: the reader lands on a
   * page that exists and works. Because `lang` is derived from the URL
   * (see the setLang(locale) effect), the whole UI follows the URL, so the
   * result is coherent rather than Bengali chrome around English content.
   */
  const hasBengaliTarget = (path: string) =>
    lang === "bn" && hasBengaliCounterpart(normalizeRoutePath(path));

  // Navigation helper that emulates URL path routing with clean path URLs.
  // In Bengali mode every existing navigateTo("/x") call site resolves to
  // /bn/x automatically, so no call site needed to change.
  const navigateTo = (path: string) => {
    const normalized = normalizeRoutePath(path);
    pushPath(hasBengaliTarget(normalized) ? toLocalePath(normalized, "bn") : normalized);
  };

  const getLocalizedRouteHref = (path: string) => {
    const normalized = normalizeRoutePath(path);
    return hasBengaliTarget(normalized) ? toLocalePath(normalized, "bn") : normalized;
  };

  const isCurrentNavigationPath = (path: string) =>
    getLocalizedRouteHref(path) === getLocalizedRouteHref(currentPath);

  const handleNavigationAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigateTo(path);
  };

  // Real hrefs for the language switcher so both locales are crawlable anchors
  // from every page (reinforcing the hreflang cluster with on-page links).
  const localeHrefs = {
    en: toLocalePath(currentPath, "en"),
    bn: hasBengaliCounterpart(currentPath)
      ? toLocalePath(currentPath, "bn")
      : "/bn",
  };

  // Synchronise real live Dhaka (BST) clock instead of static mock timestamp
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateDhakaClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setCurrentTime(`${formatted} (Dhaka BST)`);
      } catch {
        setCurrentTime("Dhaka Standard Time (GMT+6)");
      }
    };
    updateDhakaClock();
    const timer = window.setInterval(updateDhakaClock, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const routeViewContext: Record<string, any> = { AuthorBioCard, InteractiveTools, TopicalAuthorityBlueprint, TravelEssentials, TravelpayoutsCustomWidget, TravelpayoutsEmbed, TravelpayoutsOnboarding, TravelpayoutsWidgetSkeleton, areTpScriptsReady, blogBodies, blogCategoryFilter, blogHeroBannerImg, blogSearchQuery, contactDestination, contactLoading, contactMessage, contactName, contactPhone, contactSubject, contactSubmitted, getBlogAeoSnippet50Words, getBlogCoverImage, getLocalizedRouteHref, getCountryCityName, getCountryCityWithIata, getCountryDestId, getCountryFlightId, getCountryHotelId, getCountryIata, getCountryVisaId, isAdmin, isBn, isLanding, lang, localizedBlogs, localizedCosts, localizedDestinations: DESTINATIONS_DATA, localizedFlights, localizedHajjFaqs, localizedHotels, localizedVisas, navigateTo, openPriceAlert, parameterId, section, setAffiliateToast, setAreTpScriptsReady, setBlogCategoryFilter, setBlogSearchQuery, setContactDestination, setContactLoading, setContactMessage, setContactName, setContactPhone, setContactSubject, setContactSubmitted, triggerAffiliateToast };

  return (
    <div className="min-h-screen bg-brand-ivory text-slate-800 font-sans leading-relaxed selection:bg-brand-gold selection:text-brand-navy overflow-x-hidden">

      {/* Reading progress bar — shown only on blog post pages */}
      {section === "blog" && !isLanding && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-slate-200"
          role="progressbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={isBn ? `পড়ার অগ্রগতি: ${scrollProgress}%` : `Reading progress: ${scrollProgress}%`}
        >
          <div
            className="h-full bg-brand-gold transition-[width] duration-150 ease-linear"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* 🟦 STICKY HEADER WRAPPER (Top Strip + Main Navbar) */}
      <div id="sticky-site-header" className="sticky top-0 z-50 w-full shadow-lg">
        
        {/* 🟦 TOP STRIP (Height: 36px, Background: #0B1426) */}
        <div className="w-full bg-brand-navy h-9 flex items-center select-none">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between text-white/55 text-xs">
            <span className="truncate font-sans font-medium">{t.topStripTagline}</span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-sans text-[11px] font-medium">
              <TopBarWhatsApp lang={lang} />
              <span className="w-px h-3 bg-white/20"></span>
              <LanguageSwitcher
                lang={lang}
                onToggle={handleLangToggle}
                enHref={localeHrefs.en}
                bnHref={localeHrefs.bn}
              />
            </div>
          </div>
        </div>

        {/* 🟦 1. MAIN NAVBAR (Height: 64px, Background: #0B1426) */}
        <header id="main-navbar-sticky" className="w-full bg-brand-navy text-white border-b border-white/8 h-16 flex items-center">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
            
            {/* Logo Left + Precision Brand Slogan */}
            <a
              href={getLocalizedRouteHref("/")}
              onClick={(event) => handleNavigationAnchorClick(event, "/")}
              aria-label={isBn ? "URAL হোম পেজ" : "URAL home"}
              className="flex flex-col items-start justify-center group shrink-0 py-1 focus-visible:outline-none"
            >
              <img
                src="/assets/brand/svg/ural-wordmark-v1.svg"
                alt="URAL"
                width="98"
                height="32"
                className="h-7 sm:h-8 w-auto transition-opacity duration-200 group-hover:opacity-95"
              />
              <span className="text-[10px] sm:text-[10px] font-medium tracking-wide text-slate-300/90 group-hover:text-[#F6B73C] transition-colors leading-none mt-1 whitespace-nowrap">
                {isBn
                  ? "ট্রাভেল ইন্টেলিজেন্স সিস্টেম · সাধারণ এজেন্সি নয়"
                  : "Travel Intelligence System · Beyond a Typical Agency"}
              </span>
            </a>

            {/* Navigation Centered — Streamlined High-Intent Information Architecture */}
            <nav aria-label={isBn ? "প্রধান নেভিগেশন" : "Primary navigation"} className="hidden xl:flex items-center gap-3 xl:gap-4">
              {/* 1. Home */}
              <a
                id="nav-home"
                href={getLocalizedRouteHref("/")}
                onClick={(event) => handleNavigationAnchorClick(event, "/")}
                aria-current={section === "home" ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                  section === "home" ? "text-[#F6B73C] font-semibold" : "text-slate-300"
                }`}
              >
                {t.navHome}
              </a>

              {/* 2. Priority #1 Pillar: Umrah & Hajj */}
              <a
                id="nav-umrah"
                href={getLocalizedRouteHref("/umrah")}
                onClick={(event) => handleNavigationAnchorClick(event, "/umrah")}
                aria-current={section === "umrah" ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-semibold hover:text-[#F6B73C] whitespace-nowrap flex items-center gap-1.5 py-3 ${
                  section === "umrah" ? "text-[#F6B73C]" : "text-slate-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" aria-hidden="true" />
                <span>{t.navUmrah}</span>
              </a>

              {/* 3. Flights */}
              <a
                id="nav-flights"
                href={getLocalizedRouteHref("/flights")}
                onClick={(event) => handleNavigationAnchorClick(event, "/flights")}
                aria-current={section === "flights" ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                  section === "flights" ? "text-[#F6B73C] font-semibold" : "text-slate-300"
                }`}
              >
                {t.navFlights}
              </a>

              {/* 4. Hotels */}
              <a
                id="nav-hotels"
                href={getLocalizedRouteHref("/hotels")}
                onClick={(event) => handleNavigationAnchorClick(event, "/hotels")}
                aria-current={section === "hotels" ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                  section === "hotels" ? "text-[#F6B73C] font-semibold" : "text-slate-300"
                }`}
              >
                {t.navHotels}
              </a>

              {/* 5. Visa Checklists */}
              <a
                id="nav-visa"
                href={getLocalizedRouteHref("/visa")}
                onClick={(event) => handleNavigationAnchorClick(event, "/visa")}
                aria-current={section === "visa" ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                  section === "visa" ? "text-[#F6B73C] font-semibold" : "text-slate-300"
                }`}
              >
                {t.navVisa}
              </a>

              {/* 6. Destinations & Global Attractions Mega Menu */}
              <div
                ref={destinationsMenuRef}
                className="relative"
                onMouseEnter={() => {
                  if (!toolsMenuRef.current?.contains(document.activeElement)) {
                    setDesktopMenuOpen("destinations");
                  }
                }}
                onMouseLeave={() => {
                  if (!destinationsMenuRef.current?.contains(document.activeElement)) {
                    setDesktopMenuOpen((current) => current === "destinations" ? null : current);
                  }
                }}
                onFocusCapture={(event) => {
                  const previousTarget = event.relatedTarget as Node | null;
                  if (!previousTarget || !destinationsMenuRef.current?.contains(previousTarget)) {
                    setDesktopMenuOpen("destinations");
                  }
                }}
                onBlurCapture={(event) => {
                  const nextTarget = event.relatedTarget as Node | null;
                  if (!nextTarget || !destinationsMenuRef.current?.contains(nextTarget)) {
                    setDesktopMenuOpen((current) => current === "destinations" ? null : current);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setDesktopMenuOpen(null);
                    destinationsDisclosureRef.current?.focus();
                  }
                }}
              >
                <div className="flex items-center gap-0.5">
                  <a
                    id="nav-destinations-megamenu"
                    href={getLocalizedRouteHref("/destinations")}
                    onClick={(event) => handleNavigationAnchorClick(event, "/destinations")}
                    aria-current={section === "destinations" || section === "experiences" || section === "attractions" ? "page" : undefined}
                    className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                      section === "destinations" || section === "experiences" || section === "attractions"
                        ? "text-[#F6B73C] font-semibold"
                        : "text-slate-300"
                    }`}
                  >
                    {t.navDestinations}
                  </a>
                  <button
                    ref={destinationsDisclosureRef}
                    type="button"
                    aria-label={isBn ? "গন্তব্য মেনু খুলুন বা বন্ধ করুন" : "Toggle destinations menu"}
                    aria-expanded={desktopMenuOpen === "destinations"}
                    aria-controls="destinations-mega-panel"
                    onClick={() => setDesktopMenuOpen((current) => current === "destinations" ? null : "destinations")}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-slate-300 hover:text-[#F6B73C] hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none"
                  >
                    <ChevronDown
                      size={13}
                      aria-hidden="true"
                      className={`transition-transform duration-150 ${desktopMenuOpen === "destinations" ? "rotate-180 text-[#F6B73C]" : ""}`}
                    />
                  </button>
                </div>

                <div
                  id="destinations-mega-panel"
                  role="region"
                  aria-label={isBn ? "গন্তব্য ও অ্যাক্টিভিটি পাস" : "Destination and attraction guides"}
                  aria-hidden={desktopMenuOpen !== "destinations"}
                  className={`${desktopMenuOpen === "destinations" ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"} transition-all duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[780px] lg:w-[860px] z-50`}
                >
                  <div className="bg-brand-navy border border-white/15 rounded-3xl shadow-2xl p-6 grid grid-cols-12 gap-6 text-left">
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
                            path: "/destinations/nepal-guide",
                          },
                          {
                            label: isBn ? "🇹🇭 থাইল্যান্ড (ব্যাংকক ও ফুকেট)" : "🇹🇭 Thailand (Bangkok & Phuket)",
                            sub: isBn ? "শপিং, হালাল ফুড ও আইল্যান্ড" : "Halal dining, shopping & islands",
                            path: "/destinations/thailand-guide",
                          },
                          {
                            label: isBn ? "🇲🇾 মালয়েশিয়া (কুয়ালালামপুর)" : "🇲🇾 Malaysia (KL & Genting)",
                            sub: isBn ? "ই-ভিসা ও ফ্যামিলি হাব" : "Fast e-Visa · Family favorite",
                            path: "/destinations/malaysia-guide",
                          },
                          {
                            label: isBn ? "🇸🇬 সিঙ্গাপুর (মেরিনা বে ও সেন্টোসা)" : "🇸🇬 Singapore (Sentosa & Bugis)",
                            sub: isBn ? "MRT গাইড ও থিম পার্ক" : "SimplyGo MRT & Universal Studios",
                            path: "/destinations/singapore-guide",
                          },
                          {
                            label: isBn ? "🇲🇻 মালদ্বীপ (মাফুশি ও রিসোর্ট)" : "🇲🇻 Maldives (Maafushi & Resorts)",
                            sub: isBn ? "ফ্রি ভিসা · বাজেট ও ওয়াটার ভিলা" : "Free VOA · Local island & resorts",
                            path: "/destinations/maldives-guide",
                          },
                          {
                            label: isBn ? "🇦🇪 দুবাই ও আবুধাবি (UAE)" : "🇦🇪 Dubai & Abu Dhabi (UAE)",
                            sub: isBn ? "ডেজার্ট সাফারি ও বুর্জ খলিফা" : "Desert Safari, Deira & Downtown",
                            path: "/destinations/dubai-guide",
                          },
                        ].map((item, idx) => (
                          <a
                            key={idx}
                            href={getLocalizedRouteHref(item.path)}
                            onClick={(event) => handleNavigationAnchorClick(event, item.path)}
                            aria-current={isCurrentNavigationPath(item.path) ? "page" : undefined}
                            className={`w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer ${isCurrentNavigationPath(item.path) ? "bg-white/8 ring-1 ring-inset ring-[#F6B73C]/35" : ""}`}
                          >
                            <div className="text-xs font-semibold text-white">{item.label}</div>
                            <div className="text-[11px] text-slate-400">{item.sub}</div>
                          </a>
                        ))}
                      </div>

                      <a
                        href={getLocalizedRouteHref("/destinations")}
                        onClick={(event) => handleNavigationAnchorClick(event, "/destinations")}
                        aria-current={isCurrentNavigationPath("/destinations") ? "page" : undefined}
                        className={`w-full text-left px-3 pt-1 text-xs font-semibold text-[#F6B73C] hover:underline cursor-pointer ${isCurrentNavigationPath("/destinations") ? "underline underline-offset-2" : ""}`}
                      >
                        {isBn ? "সবগুলো এশিয়ান গন্তব্য দেখুন →" : "View All Asian Destination Guides →"}
                      </a>
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
                            path: "/destinations/paris-guide",
                          },
                          {
                            label: isBn ? "🇬🇧 লন্ডন, যুক্তরাজ্য (London)" : "🇬🇧 London, United Kingdom",
                            sub: isBn ? "লন্ডন আই, টাওয়ার অব লন্ডন ও টেমস" : "Tower of London, Thames & London Eye",
                            path: "/destinations/london-guide",
                          },
                          {
                            label: isBn ? "🇮🇹 রোম, মিলান ও ভেনিস (Italy)" : "🇮🇹 Rome, Milan & Venice (Italy)",
                            sub: isBn ? "কলোসিয়াম, দুওমো ও ভেনিস গন্ডোলা" : "Colosseum, Milan Duomo & Gondola",
                            path: "/destinations/italy-guide",
                          },
                          {
                            label: isBn ? "🇺🇸 নিউ ইয়র্ক সিটি (USA)" : "🇺🇸 New York City (USA)",
                            sub: isBn ? "স্ট্যাচু অব লিবার্টি ও SUMMIT ডেক" : "Statue of Liberty, Harbor & SUMMIT",
                            path: "/destinations/new-york-guide",
                          },
                        ].map((item, idx) => (
                          <a
                            key={idx}
                            href={getLocalizedRouteHref(item.path)}
                            onClick={(event) => handleNavigationAnchorClick(event, item.path)}
                            aria-current={isCurrentNavigationPath(item.path) ? "page" : undefined}
                            className={`w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer ${isCurrentNavigationPath(item.path) ? "bg-white/8 ring-1 ring-inset ring-[#F6B73C]/35" : ""}`}
                          >
                            <div className="text-xs font-semibold text-white">{item.label}</div>
                            <div className="text-[11px] text-slate-400">{item.sub}</div>
                          </a>
                        ))}
                      </div>

                      <a
                        href={getLocalizedRouteHref("/experiences/europe")}
                        onClick={(event) => handleNavigationAnchorClick(event, "/experiences/europe")}
                        aria-current={isCurrentNavigationPath("/experiences/europe") ? "page" : undefined}
                        className={`w-full text-left px-3 pt-1 text-xs font-semibold text-[#F6B73C] hover:underline cursor-pointer ${isCurrentNavigationPath("/experiences/europe") ? "underline underline-offset-2" : ""}`}
                      >
                        {isBn
                          ? "ইউরোপ, UK ও USA-এর সব পাস দেখুন →"
                          : "Browse Europe, UK & USA Hub →"}
                      </a>

                      <a
                        href={getLocalizedRouteHref("/attractions")}
                        onClick={(event) => handleNavigationAnchorClick(event, "/attractions")}
                        aria-current={isCurrentNavigationPath("/attractions") ? "page" : undefined}
                        className={`w-full text-left px-3 pt-1 text-xs font-semibold text-emerald-400 hover:underline cursor-pointer ${isCurrentNavigationPath("/attractions") ? "underline underline-offset-2" : ""}`}
                      >
                        {isBn
                          ? "৫৯টি ইউরোপিয়ন আকর্ষণ দেখুন →"
                          : "Browse 59 European Attractions →"}
                      </a>
                    </div>

                    {/* Column 3: Asia Attractions (Klook) + KKday Promo (4 Cols) */}
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
                              path: "/experiences/asia",
                            },
                            {
                              label: isBn ? "🇹🇭 ব্যাংকক সাফারি ওয়ার্ল্ড ও ক্রুজ" : "🇹🇭 Bangkok Safari World & Cruise",
                              sub: isBn ? "হালাল চাও ফ্রায়া ডিনার ও স্কাইওয়াক" : "Halal Chao Phraya Cruise & SkyWalk",
                              path: "/experiences/asia",
                            },
                            {
                              label: isBn ? "🇸🇬 সিঙ্গাপুর ও গেন্টিং হাইল্যান্ডস" : "🇸🇬 Universal Studios & Genting",
                              sub: isBn ? "গার্ডেন্স বাই দ্য বে ও কেবল কার" : "Gardens by the Bay & Awana SkyWay",
                              path: "/experiences/asia",
                            },
                          ].map((item, idx) => (
                            <a
                              key={idx}
                              href={getLocalizedRouteHref(item.path)}
                              onClick={(event) => handleNavigationAnchorClick(event, item.path)}
                              aria-current={isCurrentNavigationPath(item.path) ? "page" : undefined}
                              className={`w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer ${isCurrentNavigationPath(item.path) ? "bg-white/8 ring-1 ring-inset ring-[#F6B73C]/35" : ""}`}
                            >
                              <div className="text-xs font-semibold text-white">{item.label}</div>
                              <div className="text-[11px] text-slate-400">{item.sub}</div>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Featured Callout Card inside Mega Menu */}
                      <div className="bg-white/6 border border-white/12 rounded-2xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyan-300 font-bold inline-flex items-center gap-1.5">
                            {isPromoActive(KKDAY_PROMO.expiresAt) ? (
                              <>
                                <Sparkles size={12} className="text-cyan-300 shrink-0" />
                                <span>{isBn ? "KKday ১০.১০ উইন্টার সেল (৩০% ছাড়)" : "KKday 10.10 Winter Sale (30% OFF)"}</span>
                              </>
                            ) : (
                              <>
                                <Globe size={12} className="text-cyan-300 shrink-0" />
                                <span>{isBn ? "KKday এশিয়া ট্রাভেল পাস" : "KKday Asia Travel Passes"}</span>
                              </>
                            )}
                          </span>
                          <span className="text-amber-300 font-semibold">
                            {isPromoActive(KKDAY_PROMO.expiresAt) ? "30% Codes" : "Instant QR"}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isPromoActive(KKDAY_PROMO.expiresAt)
                            ? isBn
                              ? "জাপান স্কি ট্যুর, থিম পার্ক ও এয়ারপোর্ট রেল পাসে ৩০% প্রোমো কোড (1010TOURS, 1010MOVE, 1010TIX)।"
                              : "30% OFF promo codes for Japan ski tours, theme parks & airport express rail (1010TOURS, 1010MOVE, 1010TIX)."
                            : isBn
                            ? "জাপান, থাইল্যান্ড ও সিঙ্গাপুরের থিম পার্ক, ডে-ট্যুর ও এয়ারপোর্ট ট্রেন টিকিটে অনলাইন ছাড়।"
                            : "Save 15–30% on Japan, Thailand & Singapore theme parks, airport rail & ski tours."}
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <a
                            href={getLocalizedRouteHref("/experiences")}
                            onClick={(event) => handleNavigationAnchorClick(event, "/experiences")}
                            aria-current={isCurrentNavigationPath("/experiences") ? "page" : undefined}
                            className={`bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-[11px] py-2 px-2.5 rounded-xl transition-colors cursor-pointer ${isCurrentNavigationPath("/experiences") ? "underline underline-offset-2" : ""}`}
                          >
                            {isBn ? "অ্যাক্টিভিটি হাব →" : "All Passes →"}
                          </a>
                          <a
                            href={resolvePartnerUrl(AFFILIATE_LINKS.kkday)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-[11px] py-2 px-2.5 rounded-xl transition-colors text-center"
                          >
                            {isPromoActive(KKDAY_PROMO.expiresAt)
                              ? isBn
                                ? "KKday ৩০% ডিল ↗"
                                : "KKday 30% Sale ↗"
                              : isBn
                              ? "KKday ডিল দেখুন ↗"
                              : "KKday Passes ↗"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. PRIMARY TOP-LEVEL BLOG LINK (Crawl Depth = 1 for Topical Authority) */}
              <a
                id="nav-blog"
                href={getLocalizedRouteHref("/blog")}
                onClick={(event) => handleNavigationAnchorClick(event, "/blog")}
                aria-current={section === "blog" ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                  section === "blog" ? "text-[#F6B73C] font-semibold" : "text-slate-300"
                }`}
              >
                {t.navBlog}
              </a>

              {/* 8. COMPACT UTILITY MENU: TOOLS, BUDGETS & PRE-DEPARTURE HUB */}
              <div
                ref={toolsMenuRef}
                className="relative"
                onMouseEnter={() => {
                  if (!destinationsMenuRef.current?.contains(document.activeElement)) {
                    setDesktopMenuOpen("tools");
                  }
                }}
                onMouseLeave={() => {
                  if (!toolsMenuRef.current?.contains(document.activeElement)) {
                    setDesktopMenuOpen((current) => current === "tools" ? null : current);
                  }
                }}
                onFocusCapture={(event) => {
                  const previousTarget = event.relatedTarget as Node | null;
                  if (!previousTarget || !toolsMenuRef.current?.contains(previousTarget)) {
                    setDesktopMenuOpen("tools");
                  }
                }}
                onBlurCapture={(event) => {
                  const nextTarget = event.relatedTarget as Node | null;
                  if (!nextTarget || !toolsMenuRef.current?.contains(nextTarget)) {
                    setDesktopMenuOpen((current) => current === "tools" ? null : current);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setDesktopMenuOpen(null);
                    toolsDisclosureRef.current?.focus();
                  }
                }}
              >
                <div className="flex items-center gap-0.5">
                  <a
                    id="nav-tools-megamenu"
                    href={getLocalizedRouteHref("/tools")}
                    onClick={(event) => handleNavigationAnchorClick(event, "/tools")}
                    aria-current={["costs", "tools", "contact", "sitemap", "banking"].includes(section) ? "page" : undefined}
                    className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-3 ${
                      ["costs", "tools", "contact", "sitemap", "banking"].includes(section)
                        ? "text-[#F6B73C] font-semibold"
                        : "text-slate-300"
                    }`}
                  >
                    {t.navTools}
                  </a>
                  <button
                    ref={toolsDisclosureRef}
                    type="button"
                    aria-label={isBn ? "টুলস মেনু খুলুন বা বন্ধ করুন" : "Toggle tools menu"}
                    aria-expanded={desktopMenuOpen === "tools"}
                    aria-controls="tools-mega-panel"
                    onClick={() => setDesktopMenuOpen((current) => current === "tools" ? null : "tools")}
                    className="w-8 h-8 rounded-md flex items-center justify-center text-slate-300 hover:text-[#F6B73C] hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none"
                  >
                    <ChevronDown
                      size={13}
                      aria-hidden="true"
                      className={`transition-transform duration-150 ${desktopMenuOpen === "tools" ? "rotate-180 text-[#F6B73C]" : ""}`}
                    />
                  </button>
                </div>

                <div
                  id="tools-mega-panel"
                  role="region"
                  aria-label={isBn ? "টুলস, বাজেট ও সাপোর্ট" : "Travel tools, budgets and support"}
                  aria-hidden={desktopMenuOpen !== "tools"}
                  className={`${desktopMenuOpen === "tools" ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"} transition-all duration-150 absolute right-0 top-full pt-2 w-[340px] z-50`}
                >
                  <div className="bg-brand-navy border border-white/15 rounded-3xl shadow-2xl p-4 space-y-1.5 text-left">
                    <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block px-2 pb-1">
                      {isBn ? "ইন্টারেক্টিভ টুলস ও হেল্পলাইন" : "Calculators, Checklists & Support"}
                    </span>

                    {[
                      {
                        id: "costs",
                        icon: BarChart3,
                        label: isBn ? "দেশভিত্তিক বাজেট শিট (BDT)" : "Trip Cost & Budget Matrices",
                        sub: isBn ? "৬টি দেশের ৩-স্তরের খরচের হিসাব" : "3-tier BDT budgets for 6 countries",
                        path: "/costs",
                      },
                      {
                        id: "currency-converter",
                        icon: DollarSign,
                        label: isBn ? "BDT কারেন্সি কনভার্টার" : "BDT Currency Converter",
                        sub: isBn ? "লাইভ রেট ও কার্ড মার্কআপ নোট" : "USD, AED, SAR, NPR, THB rates & markup notes",
                        path: "/tools/currency-converter",
                      },
                      {
                        id: "budget-calculator",
                        icon: Calculator,
                        label: isBn ? "ট্রিপ বাজেট ক্যালকুলেটর" : "Trip Budget Calculator",
                        sub: isBn ? "মানুষ ও দিনভিত্তিক BDT খরচের হিসাব" : "BDT trip totals by travellers & days",
                        path: "/tools/budget-calculator",
                      },
                      {
                        id: "packing-checklist",
                        icon: Check,
                        label: isBn ? "স্মার্ট প্যাকিং চেকলিস্ট" : "Smart Packing Checklist",
                        sub: isBn ? "কেবিন ওজন, তরল ও পাওয়ার ব্যাংক নিয়ম" : "Carry-on, 100ml liquids & power-bank rules",
                        path: "/tools/packing-checklist",
                      },
                      {
                        id: "visa-checker",
                        icon: FileText,
                        label: isBn ? "ভিসা অডস চেকার" : "Visa Odds Checker",
                        sub: isBn ? "VOA ও eVisa স্ট্যাটাস যাচাই" : "VOA & eVisa status for Bangladeshi passports",
                        path: "/tools/visa-checker",
                      },
                      {
                        id: "airport-codes",
                        icon: MapPin,
                        label: isBn ? "এয়ারপোর্ট কোড ডিরেক্টরি (IATA)" : "IATA Airport Codes Directory",
                        sub: isBn ? "DAC সহ বিশ্বব্যাপী কোড ও টার্মিনাল" : "DAC & worldwide codes with terminals",
                        path: "/tools/airport-codes",
                      },
                      {
                        id: "banking",
                        icon: CreditCard,
                        label: isBn ? "ডলার এনডোর্সমেন্ট ও ডুয়েল কারেন্সি কার্ড" : "Dollar Endorsement & Dual-Currency Cards",
                        sub: isBn ? "USD 18,000 সীমা, $300 নিয়ম ও NOC" : "USD 18,000 ceiling, $300 rule & NOC",
                        path: "/banking",
                      },
                      {
                        id: "pre-departure",
                        icon: Plane,
                        label: isBn ? "প্রি-ডিপার্চার ও দূতাবাস হেল্পলাইন" : "Pre-Departure & Embassy Hub",
                        sub: isBn ? "লাগেজ নিয়ম, জমজম ও জরুরি নাম্বার" : "DAC baggage, Zamzam & embassy contacts",
                        path: "/pre-departure",
                      },
                      {
                        id: "airhelp",
                        icon: ShieldCheck,
                        label: isBn ? "ফ্লাইট বিলম্ব ক্ষতিপূরণ (€600)" : "Flight Delay Claim (€600 / AirHelp)",
                        sub: isPromoActive(AIRHELP_PROMO.expiresAt)
                          ? isBn
                            ? `প্রোমো কোড ${AIRHELP_PROMO.code} (১১% ছাড়)`
                            : `Up to BDT 78k payout + Code ${AIRHELP_PROMO.code}`
                          : isBn
                          ? "No Win, No Fee · ৭৮,০০০ টাকা পর্যন্ত"
                          : "No Win, No Fee · Up to BDT 78k payout",
                        path: "/tools/flight-delay-claim",
                      },
                      {
                        id: "contact",
                        icon: MessageSquare,
                        label: isBn ? "BDT বুকিং ও সাপোর্ট ডেস্ক" : "Contact & BDT Booking Desk",
                        sub: isBn ? "WhatsApp: +8801784385335" : "Pay in BDT via bank / bKash",
                        path: "/contact",
                      },
                    ].map((toolItem) => {
                      const IconComp = toolItem.icon;
                      return (
                        <a
                          key={toolItem.id}
                          href={getLocalizedRouteHref(toolItem.path)}
                          onClick={(event) => handleNavigationAnchorClick(event, toolItem.path)}
                          aria-current={isCurrentNavigationPath(toolItem.path) ? "page" : undefined}
                          className={`w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors flex items-start gap-2.5 cursor-pointer ${isCurrentNavigationPath(toolItem.path) ? "bg-white/10 ring-1 ring-inset ring-[#F6B73C]/35" : ""}`}
                        >
                          <IconComp className="w-4 h-4 text-[#F6B73C] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-white">{toolItem.label}</div>
                            <div className="text-[11px] text-slate-400">{toolItem.sub}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>

            {/* Start Trip CTA Right */}
            <div className="flex items-center gap-4">
              <button
                id="btn-start-trip-cta"
                onClick={() => navigateTo("/destinations")}
                className="hidden xl:block bg-[#F6B73C] text-brand-navy hover:bg-[#D4941A] font-bold text-sm rounded-full px-5 py-2 shadow-md transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.startTripCta}
              </button>

              {/* Mobile Hamburger Menu Burger */}
              <button
                type="button"
                id="mobile-menu-burger"
                ref={mobileMenuTriggerRef}
                aria-label={isBn ? "নেভিগেশন মেনু খুলুন" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-intent-drawer"
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] cursor-pointer transition-colors"
              >
                <span className="w-5 h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
                <span className="w-5 h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
                <span className="w-5 h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
              </button>
            </div>
          </div>

          {/* Mobile Sliding Navigation Drawer — Grouped by User Intent with Collapsible Sub-Menus */}
          {mobileMenuOpen && (
            <div
              id="mobile-intent-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={isBn ? "মোবাইল নেভিগেশন মেনু" : "Mobile navigation menu"}
              className="fixed inset-0 z-50 xl:hidden"
            >
              {/* Semi-transparent backdrop with click-to-close */}
              <div
                className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Sliding drawer from right */}
              <div
                ref={mobileDrawerPanelRef}
                tabIndex={-1}
                className="fixed top-0 right-0 h-full w-[340px] max-w-[90vw] bg-brand-navy shadow-2xl flex flex-col z-10 border-l border-white/10"
              >
                {/* Drawer Header */}
                <div className="h-15 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex flex-col items-start gap-0.5">
                    <img
                      src="/assets/brand/svg/ural-wordmark-v1.svg"
                      alt="URAL"
                      width="70"
                      height="24"
                      className="h-6 w-auto"
                    />
                    <span className="text-[10px] text-slate-300 block">
                      {isBn
                        ? "ট্রাভেল ইন্টেলিজেন্স সিস্টেম · সাধারণ এজেন্সি নয়"
                        : "Travel Intelligence System · Beyond a Typical Agency"}
                    </span>
                  </div>
                  <button
                    ref={mobileMenuCloseRef}
                    type="button"
                    aria-label={isBn ? "মেনু বন্ধ করুন" : "Close navigation menu"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[#F6B73C] hover:text-white hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Compact Pinned Top Shortcuts (Zero-Scroll High-Frequency Entry Points) */}
                <div className="px-3.5 pt-3 pb-2.5 border-b border-white/8 grid grid-cols-2 gap-2 shrink-0">
                  <button
                    type="button"
                    aria-current={section === "home" ? "page" : undefined}
                    onClick={() => {
                      navigateTo("/");
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                      section === "home"
                        ? "bg-[#F6B73C]/15 text-[#F6B73C] border border-[#F6B73C]/40"
                        : "bg-white/5 text-white/90 hover:bg-white/10 border border-white/8"
                    }`}
                  >
                    <span>{t.navHome}</span>
                    <ArrowRight size={12} className="opacity-70 shrink-0" />
                  </button>

                  <button
                    type="button"
                    aria-current={section === "umrah" ? "page" : undefined}
                    onClick={() => {
                      navigateTo("/umrah");
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                      section === "umrah"
                        ? "bg-[#F6B73C] text-brand-navy"
                        : "bg-[#F6B73C]/15 text-[#F6B73C] hover:bg-[#F6B73C]/25 border border-[#F6B73C]/35"
                    }`}
                  >
                    <span className="truncate">{t.navUmrah}</span>
                    <ArrowRight size={12} className="shrink-0" />
                  </button>
                </div>

                {/* Collapsible User-Intent Accordion Navigation */}
                <nav
                  aria-label={isBn ? "প্রধান মোবাইল নেভিগেশন" : "Primary mobile navigation by intent"}
                  className="flex-1 px-3.5 py-2.5 overflow-y-auto space-y-2"
                >
                  {([
                    {
                      id: "booking" as const,
                      title: isBn ? "ফ্লাইট, হোটেল ও ভিসা বুকিং" : "Flights, Hotels & Visas",
                      subtitle: isBn
                        ? "ঢাকা রুট · হালাল হোটেল · ই-ভিসা চেকলিস্ট"
                        : "Dhaka fares · Hotel zones · Visa rules",
                      isActiveGroup: ["flights", "hotels", "visa", "umrah"].includes(section),
                      primaryLinks: [
                        {
                          id: "flights",
                          label: t.navFlights,
                          meta: isBn ? "ঢাকা থেকে ৬টি প্রধান রুট" : "Compare Dhaka (DAC) routes",
                          path: "/flights",
                        },
                        {
                          id: "hotels",
                          label: t.navHotels,
                          meta: isBn ? "হালাল ও ফ্যামিলি জোন গাইড" : "Family & Halal hotel areas",
                          path: "/hotels",
                        },
                        {
                          id: "visa",
                          label: t.navVisa,
                          meta: isBn ? "অন-অ্যারাইভাল ও ই-ভিসা ধাপ" : "Free VOA & e-Visa checklists",
                          path: "/visa",
                        },
                        {
                          id: "umrah",
                          label: isBn ? "ওমরাহ ও হজ প্ল্যানার ২০২৬" : "Umrah & Hajj 2026 Hub",
                          meta: isBn ? "Nusuk অ্যাপ ও DIY খরচ" : "Nusuk permit & DIY BDT cost",
                          path: "/umrah",
                        },
                      ],
                      quickChips: [
                        { label: isBn ? "কাঠমান্ডু ফ্লাইট" : "Dhaka → KTM", path: "/flights/dhaka-kathmandu" },
                        { label: isBn ? "ব্যাংকক ফ্লাইট" : "Dhaka → BKK", path: "/flights/dhaka-bangkok" },
                        { label: isBn ? "থাইল্যান্ড ই-ভিসা" : "Thai e-Visa", path: "/visa/thailand-visa" },
                        { label: isBn ? "মালয়েশিয়া ভিসা" : "Malaysia eVisa", path: "/visa/malaysia-visa" },
                      ],
                    },
                    {
                      id: "destinations" as const,
                      title: isBn ? "গন্তব্য গাইড ও অ্যাক্টিভিটি পাস" : "Destinations & Attraction Passes",
                      subtitle: isBn
                        ? "এশিয়া গাইড · ইউরোপ, UK ও USA পাস"
                        : "6 Asian hubs · Europe, UK & USA passes",
                      isActiveGroup: ["destinations", "experiences", "attractions"].includes(section),
                      primaryLinks: [
                        {
                          id: "destinations",
                          label: t.navDestinations,
                          meta: isBn ? "নেপাল, থাইল্যান্ড, মালয়েশিয়া ও দুবাই" : "Full country itineraries & tips",
                          path: "/destinations",
                        },
                        {
                          id: "experiences",
                          label: t.navExperiences,
                          meta: isBn ? "Tiqets ও Klook স্কিপ-দ্য-লাইন পাস" : "Tiqets & Klook skip-the-line passes",
                          path: "/experiences",
                        },
                      ],
                      quickChips: [
                        { label: isBn ? "নেপাল গাইড" : "Nepal Guide", path: "/destinations/nepal-guide" },
                        { label: isBn ? "থাইল্যান্ড" : "Thailand", path: "/destinations/thailand-guide" },
                        { label: isBn ? "মালয়েশিয়া" : "Malaysia", path: "/destinations/malaysia-guide" },
                        { label: isBn ? "সিঙ্গাপুর" : "Singapore", path: "/destinations/singapore-guide" },
                        { label: isBn ? "মালদ্বীপ" : "Maldives", path: "/destinations/maldives-guide" },
                        { label: isBn ? "দুবাই ও UAE" : "Dubai / UAE", path: "/destinations/dubai-guide" },
                        { label: isBn ? "লন্ডন গাইড" : "London Guide", path: "/destinations/london-guide" },
                        { label: isBn ? "ইতালি গাইড" : "Italy Guide", path: "/destinations/italy-guide" },
                        { label: isBn ? "প্যারিস গাইড" : "Paris Guide", path: "/destinations/paris-guide" },
                        { label: isBn ? "নিউ ইয়র্ক গাইড" : "New York Guide", path: "/destinations/new-york-guide" },
                        { label: isBn ? "ইউরোপ ও UK অ্যাক্টিভিটি" : "Europe & UK Activities", path: "/experiences/europe" },
                        { label: isBn ? "এশিয়া অ্যাক্টিভিটি" : "Asia Passes", path: "/experiences/asia" },
                      ],
                    },
                    {
                      id: "research" as const,
                      title: isBn ? "ট্রাভেল ব্লগ ও BDT বাজেট হিসাব" : "Blog Guides & BDT Trip Budgets",
                      subtitle: isBn
                        ? "বিস্তারিত গাইড · ৫ দিনের খরচ"
                        : "In-depth guides · 5-day BDT sheets",
                      isActiveGroup: ["blog", "costs", "banking"].includes(section),
                      primaryLinks: [
                        {
                          id: "blog",
                          label: isBn ? "সবগুলো ট্রাভেল ব্লগ" : "All Travel Blog Guides",
                          meta: isBn ? "ওমরাহ, কার্ড এন্ডোর্সমেন্ট ও ইমিগ্রেশন" : "Umrah, Card Endorsement & Visas",
                          path: "/blog",
                        },
                        {
                          id: "banking",
                          label: isBn ? "ডলার এন্ডোর্সমেন্ট ও ব্যাংকিং হাব" : "Dollar Endorsement & Banking Hub",
                          meta: isBn ? "USD 18,000 সীমা, $300 নিয়ম ও NOC" : "USD 18,000 ceiling, $300 rule & NOC",
                          path: "/banking",
                        },
                        {
                          id: "costs",
                          label: t.navCosts,
                          meta: isBn ? "বাজেট, মিড-রেঞ্জ ও ফ্যামিলি খরচ" : "3-tier BDT cost matrices by country",
                          path: "/costs",
                        },
                      ],
                      quickChips: [
                        {
                          label: isBn ? "কার্ড এন্ডোর্সমেন্ট" : "Card Endorsement",
                          path: "/blog/dual-currency-card-endorsement-bangladesh",
                        },
                        {
                          label: isBn ? "ব্যাংকিং হাব" : "Banking Hub",
                          path: "/banking",
                        },
                        {
                          label: isBn ? "ঢাকা ইমিগ্রেশন" : "DAC Immigration",
                          path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
                        },
                        {
                          label: isBn ? "ব্যাংকক মেডিকেল" : "Medical Visa",
                          path: "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",
                        },
                        {
                          label: isBn ? "ই-পাসপোর্ট গাইড" : "e-Passport Guide",
                          path: "/blog/bangladesh-epassport-application-renewal-64-districts-fee-guide",
                        },
                      ],
                    },
                    {
                      id: "tools" as const,
                      title: isBn ? "এয়ারপোর্ট প্রস্তুতি, টুলস ও সাপোর্ট" : "Airport Readiness, Tools & Help",
                      subtitle: isBn
                        ? "কারেন্সি কনভার্টার · দূতাবাস · €600 ক্লেইম"
                        : "FX tool · DAC checklist · €600 claim",
                      isActiveGroup: ["tools", "sitemap", "preDeparture", "contact"].includes(section),
                      primaryLinks: [
                        {
                          id: "tools",
                          label: isBn ? "সব ট্রাভেল টুলস হাব" : "All Travel Tools Hub",
                          meta: isBn ? "লাইভ BDT রেট, ক্যালকুলেটর ও চেকলিস্ট" : "FX, budget & checklist workspace",
                          path: "/tools",
                        },
                        {
                          id: "sitemap",
                          label: isBn ? "ঢাকা এয়ারপোর্ট (DAC) ও দূতাবাস হাব" : "Pre-Departure & Embassy Hub",
                          meta: isBn ? "লাগেজ নিয়ম, জমজম ও জরুরি নাম্বার" : "Baggage rules, Zamzam & embassies",
                          path: "/pre-departure",
                        },
                        {
                          id: "airhelp",
                          label: isBn ? "ফ্লাইট বিলম্ব ক্ষতিপূরণ (€600)" : "Flight Delay Claim (€600 / AirHelp)",
                          meta: isPromoActive(AIRHELP_PROMO.expiresAt)
                            ? isBn
                              ? `প্রোমো কোড ${AIRHELP_PROMO.code} · ৭৮,০০০ টাকা পর্যন্ত`
                              : `Code ${AIRHELP_PROMO.code} · Up to BDT 78k payout`
                            : isBn
                            ? "No Win, No Fee · ৭৮,০০০ টাকা পর্যন্ত"
                            : "No Win, No Fee · Up to BDT 78k payout",
                          path: "/tools/flight-delay-claim",
                        },
                        {
                          id: "contact",
                          label: t.navContact,
                          meta: isBn ? "কার্ড ছাড়াই বিকাশ/ব্যাংকে BDT পেমেন্ট" : "Book via bKash, Nagad or Bank BDT",
                          path: "/contact",
                        },
                      ],
                      quickChips: [
                        {
                          label: isBn ? "কারেন্সি কনভার্টার" : "Currency Converter",
                          path: "/tools/currency-converter",
                        },
                        {
                          label: isBn ? "বাজেট ক্যালকুলেটর" : "Budget Calculator",
                          path: "/tools/budget-calculator",
                        },
                        {
                          label: isBn ? "প্যাকিং চেকলিস্ট" : "Packing Checklist",
                          path: "/tools/packing-checklist",
                        },
                        {
                          label: isBn ? "ভিসা অডস চেকার" : "Visa Odds Checker",
                          path: "/tools/visa-checker",
                        },
                        {
                          label: isBn ? "এয়ারপোর্ট কোড" : "Airport Codes",
                          path: "/tools/airport-codes",
                        },
                      ],
                    },
                  ]).map((group) => {
                    const isExpanded = expandedDrawerGroup === group.id;
                    return (
                      <div
                        key={group.id}
                        className={`rounded-2xl border transition-colors ${
                          isExpanded
                            ? "bg-white/[0.05] border-white/15"
                            : group.isActiveGroup
                            ? "bg-white/[0.03] border-[#F6B73C]/35"
                            : "bg-white/[0.02] border-white/8"
                        }`}
                      >
                        {/* Accordion Trigger Button */}
                        <button
                          type="button"
                          id={`drawer-trigger-${group.id}`}
                          aria-expanded={isExpanded}
                          aria-controls={`drawer-panel-${group.id}`}
                          onClick={() =>
                            setExpandedDrawerGroup((prev) => (prev === group.id ? null : group.id))
                          }
                          className="w-full min-h-[52px] px-3.5 py-2.5 text-left flex items-center justify-between gap-2 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[13.5px] font-semibold leading-snug truncate ${
                                  group.isActiveGroup || isExpanded ? "text-[#F6B73C]" : "text-white"
                                }`}
                              >
                                {group.title}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                              {group.subtitle}
                            </span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#F6B73C]" : ""
                            }`}
                          />
                        </button>

                        {/* Collapsible Sub-Menu Panel */}
                        {isExpanded && (
                          <div
                            id={`drawer-panel-${group.id}`}
                            role="region"
                            aria-labelledby={`drawer-trigger-${group.id}`}
                            className="px-2.5 pb-2.5 pt-1 border-t border-white/8 space-y-1.5"
                          >
                            <div className="space-y-1">
                              {group.primaryLinks.map((link) => {
                                const isCurrent =
                                  section === link.id || isCurrentNavigationPath(link.path);
                                return (
                                  <button
                                    key={link.path}
                                    type="button"
                                    aria-current={isCurrent ? "page" : undefined}
                                    onClick={() => {
                                      navigateTo(link.path);
                                      setMobileMenuOpen(false);
                                    }}
                                    className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                                      isCurrent
                                        ? "bg-[#F6B73C]/15 text-[#F6B73C]"
                                        : "hover:bg-white/8 text-white/90"
                                    }`}
                                  >
                                    <div className="min-w-0">
                                      <div className="text-xs font-semibold truncate">{link.label}</div>
                                      <div className="text-[11px] text-slate-400 truncate">{link.meta}</div>
                                    </div>
                                    <ArrowRight
                                      size={12}
                                      className={isCurrent ? "text-[#F6B73C] shrink-0" : "text-slate-500 shrink-0"}
                                    />
                                  </button>
                                );
                              })}
                            </div>

                            {group.quickChips.length > 0 && (
                              <div className="pt-1.5 border-t border-white/6">
                                <div className="grid grid-cols-2 gap-1.5">
                                  {group.quickChips.map((chip) => {
                                    const isCurrent = isCurrentNavigationPath(chip.path);
                                    return (
                                      <button
                                        key={chip.path}
                                        type="button"
                                        aria-current={isCurrent ? "page" : undefined}
                                        onClick={() => {
                                          navigateTo(chip.path);
                                          setMobileMenuOpen(false);
                                        }}
                                        className={`min-h-[44px] px-2.5 py-1.5 rounded-lg border text-left text-[11px] font-medium truncate transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                                          isCurrent
                                            ? "bg-[#F6B73C]/15 border-[#F6B73C]/45 text-[#F6B73C]"
                                            : "bg-slate-900/80 hover:bg-white/10 border-white/8 text-slate-200 hover:text-[#F6B73C]"
                                        }`}
                                      >
                                        {chip.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Drawer CTA Footer (Compact to preserve vertical viewport budget) */}
                <div className="p-4 border-t border-white/10 bg-brand-navy space-y-2.5 shrink-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <a
                        href={URAL_SOCIAL_LINKS.facebook}
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="URAL on Facebook (@uraltravelbd)"
                        title="Facebook (@uraltravelbd)"
                        className="w-11 h-11 rounded-lg bg-white/8 hover:bg-[#F6B73C] text-slate-200 hover:text-brand-navy flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a
                        href={URAL_SOCIAL_LINKS.instagram}
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="URAL on Instagram (@uraltravelbd)"
                        title="Instagram (@uraltravelbd)"
                        className="w-11 h-11 rounded-lg bg-white/8 hover:bg-[#F6B73C] text-slate-200 hover:text-brand-navy flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href={URAL_SOCIAL_LINKS.linkedin}
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="URAL on LinkedIn"
                        title="LinkedIn (URAL Travel Bangladesh)"
                        className="w-11 h-11 rounded-lg bg-white/8 hover:bg-[#F6B73C] text-slate-200 hover:text-brand-navy flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </a>
                      <a
                        href={URAL_SOCIAL_LINKS.tiktok}
                        target="_blank"
                        rel="me noopener noreferrer"
                        aria-label="URAL on TikTok (@uraltravelbd)"
                        title="TikTok (@uraltravelbd)"
                        className="w-11 h-11 rounded-lg bg-white/8 hover:bg-[#F6B73C] text-slate-200 hover:text-brand-navy flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.86-4.49V8.75a8.28 8.28 0 0 0 4.91 1.6V6.9a4.83 4.83 0 0 1-1-.21z" />
                        </svg>
                      </a>
                    </div>
                    <LanguageSwitcher
                      lang={lang}
                      onToggle={handleLangToggle}
                      enHref={localeHrefs.en}
                      bnHref={localeHrefs.bn}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] bg-brand-emerald text-white font-bold text-xs px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors"
                    >
                      <span>WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo("/destinations");
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[44px] bg-[#F6B73C] text-brand-navy hover:bg-[#D4941A] font-bold text-xs px-3 rounded-xl shadow-md text-center transition-colors cursor-pointer"
                    >
                      {t.startTripCta}
                    </button>
                  </div>
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
          >
            <ResponsiveImage
              src={heroBgImage}
              sizes="100vw"
              alt={
                isBn
                  ? "সূর্যাস্তের মেঘের সমুদ্রের উপর ভাসমান কাঠের নৌকার ডেক, সাথে ভ্রমণ খাতা ও ক্যামেরা"
                  : "Wooden sailboat deck above a sea of sunset clouds with a travel journal and camera"
              }
              aria-hidden={true}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
            />
            <div
              aria-hidden={true}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 17, 32, 0.85) 0%, rgba(11, 23, 44, 0.8) 35%, rgba(15, 30, 56, 0.75) 65%, rgba(21, 38, 68, 0.85) 100%)",
              }}
            />

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
              <circle cx="600" cy="350" r="14" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.5" style={{ transformOrigin: '600px 350px' }} />
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
            <div className="hero-enter relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col items-center sm:items-start justify-center space-y-6">
              

              <h1 className="font-sans text-[clamp(2.3rem,6vw,4.5rem)] font-[900] leading-[1.1] tracking-tight text-white max-w-4xl drop-shadow text-center sm:text-left">
                {isBn ? (
                  <>
                    বাংলাদেশ থেকে ভ্রমণ <br />
                    <span className="text-[#F6B73C]">পরিকল্পনা করুন স্মার্টভাবে</span>
                  </>
                ) : (
                  <>
                    Plan Your Trip <br />
                    <span className="text-[#F6B73C]">From Bangladesh</span>
                  </>
                )}
              </h1>
              
              <p className="text-white/80 text-[1.1rem] sm:text-[1.2rem] leading-[1.60] max-w-2xl font-sans text-center sm:text-left">
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য তৈরি Flight, Hotel, Visa চেকলিস্ট, Hajj ও Umrah প্রস্তুতি এবং BDT বাজেট গাইড—সবকিছু এক জায়গায়।"
                  : "Flights, hotels, visas, and destination guides — crafted specifically for Bangladeshi travelers. Your travel intelligence for the world."}
              </p>

              {/* High-Intent Above-the-Fold Quick Action Bar */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-1">
                <a
                  href="#live-flight-search"
                  onClick={(e) => {
                    e.preventDefault();
                    setAreTpScriptsReady(true);
                    document.getElementById("live-flight-search")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setTimeout(() => {
                      document.getElementById("ural-global-dest-input")?.focus();
                    }, 420);
                  }}
                  className="inline-flex items-center gap-2.5 bg-[#F6B73C] hover:bg-[#f5ad24] text-brand-navy font-black text-sm px-6 py-3.5 rounded-xl shadow-[0_10px_24px_-4px_rgba(246,183,60,0.5)] hover:shadow-[0_14px_28px_-4px_rgba(246,183,60,0.7)] active:scale-[0.985] transition-all cursor-pointer group"
                >
                  <span>{isBn ? "গ্লোবাল ফ্লাইট খুঁজুন" : "Search Global Flights"}</span>
                  <ArrowRight size={16} className="stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#global-hotel-search"
                  onClick={(e) => {
                    e.preventDefault();
                    setAreTpScriptsReady(true);
                    document.getElementById("global-hotel-search")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setTimeout(() => {
                      document.getElementById("ural-global-hotel-input")?.focus();
                    }, 450);
                  }}
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/25 hover:border-[#F6B73C]/60 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer group"
                >
                  <span>{isBn ? "হোটেল ও আবাসন খুঁজুন" : "Explore Global Hotels"}</span>
                  <ArrowRight size={15} className="text-[#F6B73C] group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

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
          <div id="hero-stats-bar" className="stats-bar bg-brand-navy py-7 px-4 shadow-lg border-t border-b border-[#F6B73C]/20">
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

          {/* 🟦 SECTION 1.2: OFFICIAL BOOKING & TRAVEL INVENTORY PARTNERS MARQUEE (PALED STRIP DIRECTLY UNDER HERO) */}
          <div className="w-full bg-slate-50/85 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              <React.Suspense fallback={null}>
                <PartnerLogoMarquee lang={lang} onNavigate={navigateTo} />
              </React.Suspense>
            </div>
          </div>
        </div>
      )}

      {/* ⚡ ACTIVE TEMPLATE RENDER */}
      {/* C1: Skip-to-content — WCAG 2.1 SC 2.4.1 */}
      <a href="#main-content" className="skip-link">
        {isBn ? "মূল বিষয়বস্তুতে যান" : "Skip to main content"}
      </a>
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* -------------------------------------------------------------
            🏠 VIEW 1: HOME PAGE (CONVERSION HUB)
        ------------------------------------------------------------- */}
        {section === "home" && (
          <div className="space-y-12 sm:space-y-14 lg:space-y-16">

            {/* SEARCH & FLIGHT PLANNING */}
            <div className="space-y-6 sm:space-y-7">
              <section
                id="live-flight-search"
                aria-labelledby="flight-search-title"
                className="scroll-mt-24 space-y-5 sm:space-y-6"
              >
                <header className="max-w-3xl space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#F6B73C]/35 bg-[#F6B73C]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-navy">
                    <Plane size={13} className="text-brand-emerald" aria-hidden="true" />
                    <span>{isBn ? "ফ্লাইট সার্চ" : "Flight search"}</span>
                  </div>
                  <h2
                    id="flight-search-title"
                    className="ural-section-title font-serif text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
                  >
                    {isBn ? "ফ্লাইট খুঁজুন" : "Search Flights"}
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                    {isBn
                      ? "আপনার রুট, তারিখ ও পছন্দের মুদ্রা বেছে ফ্লাইট অপশন তুলনা করুন।"
                      : "Choose your route, dates and preferred currency to compare flight options."}
                  </p>
                </header>

                <div className="w-full text-slate-900">
                  {areTpScriptsReady ? (
                    <React.Suspense
                      fallback={
                        <div className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-brand-navy to-[#081322] p-1.5 shadow-xl sm:p-3">
                          <TravelpayoutsWidgetSkeleton
                            variant="flights"
                            isBn={isBn}
                            onInteract={() => setAreTpScriptsReady(true)}
                          />
                        </div>
                      }
                    >
                      <TravelpayoutsWidget
                        lang={lang}
                        onOpenPriceAlert={openPriceAlert}
                      />
                    </React.Suspense>
                  ) : (
                    <div className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-brand-navy to-[#081322] p-1.5 shadow-xl sm:p-3">
                      <TravelpayoutsWidgetSkeleton
                        variant="flights"
                        isBn={isBn}
                        onInteract={() => setAreTpScriptsReady(true)}
                      />
                    </div>
                  )}
                </div>

                {/* Price Alert Promotion Banner */}
                <div className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 sm:flex-row sm:items-center sm:px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-brand-navy shadow-sm">
                      <Bell className="h-4 w-4 text-[#F6B73C]" aria-hidden="true" />
                    </div>
                    <div className="text-xs leading-relaxed text-slate-700">
                      <span className="mr-1 block font-bold text-slate-900 sm:inline">
                        {lang === "bn" ? "ভাড়া কমার নোটিফিকেশন:" : "Looking for the lowest fare?"}
                      </span>
                      <span>{t.priceAlertBanner}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPriceAlert()}
                    className="min-h-11 w-full shrink-0 rounded-xl bg-brand-navy px-4 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] focus-visible:ring-offset-2 sm:w-auto"
                  >
                    {t.setPriceAlertBtn}
                  </button>
                </div>

              <section
                id="airport-code-reference"
                aria-labelledby="quick-airport-codes-title"
                className="rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-brand-emerald">
                        <Plane size={14} aria-hidden="true" />
                      </span>
                      <span>{isBn ? "দ্রুত IATA রেফারেন্স" : "Quick IATA reference"}</span>
                    </div>
                    <h3
                      id="quick-airport-codes-title"
                      className="ural-card-title font-serif text-lg font-black tracking-tight text-slate-900 sm:text-xl"
                    >
                      {isBn ? "এয়ারপোর্ট কোড এক নজরে" : "Quick Airport Code Reference"}
                    </h3>
                    <p className="max-w-2xl text-xs leading-relaxed text-slate-600">
                      {isBn
                        ? "ফ্লাইট খোঁজার সময় এই তিন-অক্ষরের IATA কোডগুলো ব্যবহার করুন।"
                        : "Use these three-letter IATA codes when searching for your route."}
                    </p>
                  </div>
                  <a
                    href="/tools/airport-codes"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("/tools/airport-codes");
                    }}
                    className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-navy hover:bg-brand-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] md:w-auto"
                  >
                    <span>
                      {isBn
                        ? "সম্পূর্ণ এয়ারপোর্ট ডিরেক্টরি ও অনুসন্ধান টুল খুলুন"
                        : "Open Full Airport Directory & Tool"}
                    </span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                  {[
                    { code: "DAC", en: "Dhaka", bn: "ঢাকা" },
                    { code: "CGP", en: "Chattogram", bn: "চট্টগ্রাম" },
                    { code: "ZYL", en: "Sylhet", bn: "সিলেট" },
                    { code: "CXB", en: "Cox's Bazar", bn: "কক্সবাজার" },
                    { code: "DXB", en: "Dubai", bn: "দুবাই" },
                    { code: "JED", en: "Jeddah", bn: "জেদ্দা" },
                  ].map((airport) => (
                    <div
                      key={airport.code}
                      className="flex min-h-[68px] flex-col justify-center rounded-xl border border-slate-200/90 bg-slate-50/80 px-3 py-2.5"
                    >
                      <span className="font-mono text-base font-black tracking-wide text-brand-navy">
                        {airport.code}
                      </span>
                      <span className="text-xs font-medium text-slate-600">
                        {isBn ? airport.bn : airport.en}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
              </section>
            </div>

            {/* 🟦 SECTION 2: QUICK DESTINATION ENTRY */}
            <div id="destinations-section" className="scroll-mt-24 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">{t.destinationsBadge}</span>
                <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.destinationsTitle}</h2>
                <p className="text-xs text-slate-600 max-w-xl mx-auto">{t.destinationsSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {[
                  {
                    city: "Kathmandu",
                    country: "Nepal",
                    tag: isBn
                      ? "বাংলাদেশিদের জন্য ফ্রি Visa on Arrival। Thamel-এ BDT 1,500/রাত থেকে হোটেল। প্রথম বিদেশ ভ্রমণের জন্য সেরা।"
                      : "Free visa on arrival for Bangladeshis. Budget hotels in Thamel from BDT 1,500/night. A great first international trip.",
                    code: "nepal-guide",
                    img: "🇳🇵",
                    path: "/destinations/nepal-guide",
                    bgImg: nepalDestImg,
                    alt: "Boudhanath Stupa in Kathmandu at sunset.",
                  },
                  {
                    city: "Bangkok",
                    country: "Thailand",
                    tag: isBn
                      ? "আগে অনলাইনে Thailand e-Visa আবেদন করুন; সিদ্ধান্ত ও সময় ভিন্ন হতে পারে। হালাল স্ট্রিট ফুড, Pratunam শপিং, দ্বীপ ও মেডিকেল চেকআপ।"
                      : "Apply for Thailand's e-Visa online before travel; decisions and timing vary. Street food, Pratunam shopping, islands, and golden temples.",
                    code: "thailand-guide",
                    img: "🇹🇭",
                    path: "/destinations/thailand-guide",
                    bgImg: bangkokDestImg,
                    alt: "Wat Arun on Bangkok’s Chao Phraya River at sunset.",
                  },
                  {
                    city: "Kuala Lumpur",
                    country: "Malaysia",
                    tag: isBn
                      ? "সহজ অনলাইন Malaysia e-Visa। সাশ্রয়ী KLCC অ্যাপার্টমেন্ট, ১০০% Halal খাবার এবং উন্নত মেট্রো যাতায়াত।"
                      : "Simple online eVisa. Affordable KLCC suites, 100% halal dining, and easy transit across Kuala Lumpur.",
                    code: "malaysia-guide",
                    img: "🇲🇾",
                    path: "/destinations/malaysia-guide",
                    bgImg: klDestImg,
                    alt: "Petronas Twin Towers in the Kuala Lumpur skyline at twilight.",
                  },
                  {
                    city: "Singapore",
                    country: "Singapore",
                    tag: isBn
                      ? "ঢাকা থেকে ৪ ঘণ্টা ১৫ মিনিটের ডিরেক্ট ফ্লাইট। Marina Bay, Sentosa, Gardens by the Bay ও ২৪ ঘণ্টা Mustafa শপিং।"
                      : "4h 15m direct from Dhaka. Marina Bay, Sentosa, Gardens by the Bay, and 24-hour Mustafa shopping in Little India.",
                    code: "singapore-guide",
                    img: "🇸🇬",
                    path: "/destinations/singapore-guide",
                    bgImg: singaporeDestImg,
                    alt: "Gardens by the Bay Supertrees against Singapore’s waterfront skyline.",
                  },
                  {
                    city: "Malé & Maafushi",
                    country: "Maldives",
                    tag: isBn
                      ? "৩০ দিনের ফ্রি Visa on Arrival! Maafushi লোকাল আইল্যান্ডে BDT 6,500/রাত থেকে হোটেল এবং $30 স্নরকেলিং ট্যুর।"
                      : "Free 30-day Visa on Arrival! Stay on Maafushi local island from BDT 6,500/night with $30 coral & sandbank tours.",
                    code: "maldives-guide",
                    img: "🇲🇻",
                    path: "/destinations/maldives-guide",
                    bgImg: maldivesDestImg,
                    alt: "Overwater villas above a turquoise lagoon in the Maldives.",
                  },
                  {
                    city: "Dubai",
                    country: "UAE",
                    tag: isBn
                      ? "৩–৫ দিনে UAE e-Visa। Burj Khalifa, Desert Safari ও শপিং — ঢাকা থেকে ৪ ঘণ্টা ৪৫ মিনিটের সরাসরি ফ্লাইট।"
                      : "eVisa in 3–5 days. Burj Khalifa, desert safari, duty-free shopping — 4h 45m direct from Dhaka.",
                    code: "dubai-guide",
                    img: "🇦🇪",
                    path: "/destinations/dubai-guide",
                    bgImg: dubaiDestImg,
                    alt: "Burj Khalifa rising above Dubai’s skyline at sunset.",
                  },
                ].map((dest, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigateTo(dest.path)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-950 shadow-lg hover:shadow-2xl transition-all duration-350 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-end aspect-[4/5] sm:aspect-square md:aspect-[4/5] border border-slate-800/10 hover:border-[#F6B73C]/20"
                  >
                    {/* Background Travel Image */}
                    {/* column count flips at sm (640) / lg (1024) — keep in step with the grid above */}
                    <ResponsiveImage
                      src={dest.bgImg}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      alt={dest.alt}
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    />

                    {/* Dark gradient shadow overlay for extreme readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

                    {/* Glassmorphic description layout */}
                    <div className="relative z-20 p-4 space-y-2.5 bg-slate-950/65 backdrop-blur-md border-t border-white/10 m-3 rounded-xl shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm px-1.5 py-0.5 bg-white/15 rounded backdrop-blur-sm font-sans shrink-0">{dest.img}</span>
                        <h3 className="ural-card-title font-sans font-bold text-sm text-white tracking-tight">{dest.city}, {dest.country}</h3>
                      </div>
                      
                      <p className="text-[11px] text-slate-200 font-normal leading-relaxed line-clamp-3 sm:text-xs">
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
            <div className="ural-panel bg-slate-50 p-6 sm:p-8 border border-border-subtle shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  {isBn ? "ঢাকা থেকে আপনার পরবর্তী সফর সাজান" : "Plan your next trip from Dhaka"}
                </span>
                <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                  {isBn ? "বুকিং করার আগে যা যা জানা প্রয়োজন" : "Everything You Need Before You Book"}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isBn
                    ? "কোথা থেকে শুরু করবেন ভাবছেন? প্রথমে ফ্লাইটের ভাড়া যাচাই করুন, এরপর পছন্দের এলাকায় হোটেল তুলনা করুন এবং আমাদের ভিসা গাইড দেখে প্রয়োজনীয় ডকুমেন্টগুলো গুছিয়ে নিন।"
                    : "Not sure where to start? Check flight prices first, then compare hotels in the area you want to stay, and use our visa guide to know exactly what documents to prepare. No travel agent needed."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <button 
                  onClick={() => navigateTo("/flights")}
                  className="bg-brand-navy text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "সাশ্রয়ী Flight খুঁজুন →" : "Find Cheap Flights →"}
                </button>
                <button 
                  onClick={() => navigateTo("/hotels")}
                  className="bg-brand-navy text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "বাজেট Hotel খুঁজুন →" : "Search Budget Hotels →"}
                </button>
                <button 
                  onClick={() => navigateTo("/blog")}
                  className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-black text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "সব ট্রাভেল ব্লগ পড়ুন →" : "Browse Travel Guides →"}
                </button>
              </div>
            </div>

            {/* 🟦 SECTION 4: HOTEL SEARCH ENTRY */}
            <div id="global-hotel-search" className="ural-panel relative overflow-hidden bg-white text-brand-navy p-6 sm:p-8 shadow-sm border border-border-subtle">
              
              <div className="max-w-3xl mx-auto text-center space-y-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-brand-gold-ink uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/25 px-3 py-1 rounded-full">
                  <Building size={12} className="text-[#F6B73C]" />
                  <span>{isBn ? "গ্লোবাল হোটেল ও ফ্যামিলি স্টে সার্চ" : "Global Hotel & Stay Finder"}</span>
                </span>
                <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-black text-slate-900">
                  {isBn
                    ? "মক্কা, দুবাই, ব্যাংকক, কুয়ালালামপুর, প্যারিস ও বিশ্বের যেকোনো শহরের হোটেল তুলনা করুন"
                    : "Compare Hotels & Family Stays Worldwide (Asia, Middle East, Europe & USA)"}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  {isBn
                    ? "যেকোনো শহর ও তারিখ দিয়ে আসল হোটেল ভাড়া দেখুন। মক্কা হারাম ভিউ, Thamel-এর বাজেট রুম কিংবা Pratunam ও প্যারিসের ফ্যামিলি স্যুট—সব অপশন তুলনা করে সরাসরি বুক করুন।"
                    : "Type any city worldwide or pick a popular hub below to compare live hotel rates. From Makkah Haram-view suites and Bangkok Pratunam stays to Paris, London, and New York hotels."}
                </p>
              </div>

              {/* DEDICATED GLOBAL HOTEL WIDGET (Single clean bar, no flight tab duplication) */}
              <div className="w-full text-slate-900">
                {areTpScriptsReady ? (
                  <React.Suspense
                    fallback={
                      <TravelpayoutsWidgetSkeleton
                        variant="hotels"
                        isBn={isBn}
                        onInteract={() => setAreTpScriptsReady(true)}
                      />
                    }
                  >
                    <TravelpayoutsCustomWidget initialTab="hotels" hotelsOnly={true} />
                  </React.Suspense>
                ) : (
                  <TravelpayoutsWidgetSkeleton
                    variant="hotels"
                    isBn={isBn}
                    onInteract={() => setAreTpScriptsReady(true)}
                  />
                )}
              </div>

              {/* Quick links to pre-filled hotel lookups */}
              <div className="text-center text-xs font-mono text-slate-600 mt-6 flex flex-wrap justify-center items-center gap-2">
                <span>{isBn ? "জনপ্রিয় ফ্যামিলি হোটেল জোন:" : "Top family-rated lodging selectors:"}</span>
                <button onClick={() => navigateTo("/hotels/kathmandu-hotels")} className="text-brand-gold-ink hover:text-brand-navy hover:underline">Thamel, Kathmandu 🇳🇵</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/bangkok-hotels")} className="text-brand-gold-ink hover:text-brand-navy hover:underline">Pratunam, Bangkok 🇹🇭</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/kuala-lumpur-hotels")} className="text-brand-gold-ink hover:text-brand-navy hover:underline">Bukit Bintang, KL 🇲🇾</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/singapore-hotels")} className="text-brand-gold-ink hover:text-brand-navy hover:underline">Little India, Singapore 🇸🇬</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/maldives-hotels")} className="text-brand-gold-ink hover:text-brand-navy hover:underline">Maafushi, Maldives 🇲🇻</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/dubai-hotels")} className="text-brand-gold-ink hover:text-brand-navy hover:underline">Deira, Dubai 🇦🇪</button>
              </div>
            </div>

            {/* 🟦 SECTION 4.25: UNIFIED TABBED TRAVEL ESSENTIALS HUB */}
            <React.Suspense fallback={null}>
              <TravelEssentials country="Thailand, Malaysia, Singapore, Maldives, Nepal & UAE" lang={lang} />
            </React.Suspense>

            {/* 🟦 INTERACTIVE TOOLS DESK PANEL (Aesthetic calculation tools) */}
            <div className="ural-panel bg-slate-50 border border-border-subtle p-6 sm:p-8 space-y-6">
              <div className="border-l-4 border-brand-navy pl-4">
                <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
                  {isBn ? "প্রয়োজনীয় ট্রাভেল টুলস (Handy Travel Tools)" : "Handy Travel Tools"}
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  {isBn
                    ? "বাংলাদেশি টাকা (BDT) কনভার্ট করুন, প্যাকিং চেকলিস্ট মিলিয়ে নিন এবং ট্রিপের মোট বাজেট হিসাব করুন।"
                    : "Quick tools to help you convert BDT, check what to pack, and estimate your trip budget."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Currency Converter (Interactive) */}
                <div className="ural-card bg-white p-5 border border-border-subtle flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
                      <DollarSign size={13} className="text-[#F6B73C]" />
                      <span>{isBn ? "কারেন্সি কনভার্টার (BDT রেট)" : "Currency Converter"}</span>
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="home-currency-bdt-amount"
                          className="text-slate-600 font-mono text-[10px] uppercase w-12"
                        >
                          BDT (৳)
                          <span className="sr-only">
                            {isBn ? " বাংলাদেশি টাকার পরিমাণ" : " Amount in Bangladeshi Taka"}
                          </span>
                        </label>
                        <input 
                          id="home-currency-bdt-amount"
                          type="number" 
                          value={currencyAmount}
                          onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                          className="flex-grow bg-slate-50 border border-slate-200 rounded p-1 text-xs font-mono focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="home-currency-target-select"
                          className="text-slate-600 font-mono text-[10px] uppercase w-12"
                        >
                          To
                          <span className="sr-only">
                            {isBn ? " গন্তব্য দেশের মুদ্রা" : " Target Currency"}
                          </span>
                        </label>
                        <select 
                          id="home-currency-target-select"
                          value={currencyToOption}
                          onChange={(e) => setCurrencyToOption(e.target.value as any)}
                          className="flex-grow bg-slate-50 border border-border-subtle rounded p-1 text-xs font-mono focus:outline-none font-bold"
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
                    <span className="text-brand-gold-ink">
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
                <div className="ural-card bg-white p-5 border border-border-subtle flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest inline-flex items-center gap-1.5 mb-1">
                      <FileText size={13} className="text-[#F6B73C]" />
                      <span>{isBn ? "ডকুমেন্ট ও প্যাকিং চেকলিস্ট" : "Packing Checklist"}</span>
                    </span>
                    <p className="text-[10px] text-slate-600 mb-2">
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
                            className="h-6 w-6 rounded text-[#F6B73C] focus:ring-[#F6B73C]"
                          />
                          <span className={item.checked ? "line-through text-slate-600" : ""}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-brand-gold-ink block mt-2 text-right">
                    {isBn ? "ইমিগ্রেশন চেকলিস্ট" : "Interactive Outbound checklist"}
                  </span>
                </div>

                {/* 3. Budget Planner Tool */}
                <div className="ural-card bg-white p-5 border border-border-subtle flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest inline-flex items-center gap-1.5 mb-2">
                      <Calculator size={13} className="text-[#F6B73C]" />
                      <span>{isBn ? "৫ দিনের BDT বাজেট প্ল্যানার" : "Fast Budget Planner"}</span>
                    </span>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {isBn
                        ? "৫ দিনের বিদেশ সফরে Flight, Hotel, খাবার ও লোকাল যাতায়াতে মোট কত টাকা (BDT) খরচ হবে তার বিস্তারিত হিসাব দেখুন।"
                        : "Get a rough estimate of what a 5-day trip costs — flights, hotel, food, and transport, all broken down in BDT."}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("/costs")}
                    className="bg-brand-navy text-white hover:bg-slate-800 font-bold text-[10px] py-1.5 px-3 rounded-lg self-start mt-3"
                  >
                    {isBn ? "বাজেট ক্যালকুলেটর খুলুন" : "Open Budget Calculator"}
                  </button>
                </div>

              </div>
            </div>

            {/* 🟦 SECTION 4.5: TRUSTPILOT TESTIMONIALS */}
            <React.Suspense fallback={null}>
              <TrustpilotReviews />
            </React.Suspense>



            {/* 🟦 SECTION 6: TRUST + ENGAGEMENT */}
            <div className="ural-panel bg-brand-navy text-white p-6 sm:p-8 border border-slate-800 text-center space-y-5 sm:space-y-6 flex flex-col justify-center">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest">
                  {isBn ? "কেন ভ্রমণকারীরা URAL ব্যবহার করেন" : "Why Travelers Use URAL"}
                </span>
                <h2 className="ural-section-title font-serif text-2xl font-black">
                  {isBn ? "সহজ, ফ্রি এবং বাংলাদেশিদের জন্য তৈরি" : "Simple, Free, and Built for Bangladesh"}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 max-w-5xl mx-auto w-full text-left">
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs inline-flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    <Plane size={13} className="text-[#F6B73C]" />
                    <span>{isBn ? "লাইভ Flight ভাড়া" : "Real Flight Prices"}</span>
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">
                    {isBn
                      ? "“ঢাকা থেকে সব প্রধান এয়ারলাইন্সের ভাড়া এক সাথে তুলনা করুন”"
                      : "“Compare prices from all major airlines flying from Dhaka”"}
                  </p>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {isBn
                      ? "Biman Bangladesh, Saudia, Emirates, AirAsia, US-Bangla ও Thai Airways সহ ঢাকা থেকে চলাচলকারী সব এয়ারলাইন্সের প্রতিদিনের আপডেট ভাড়া।"
                      : "Flight search covers Biman Bangladesh, Emirates, AirAsia, Thai Airways, and other airlines that fly out of Dhaka — updated daily."}
                  </p>
                </div>
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs inline-flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    <Sparkles size={13} className="text-[#F6B73C]" />
                    <span>{isBn ? "দ্রুত ও সম্পূর্ণ ফ্রি" : "Fast and Free"}</span>
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">
                    {isBn ? "“কোনো রেজিস্ট্রেশন বা বাড়তি ফি নেই”" : "“No signup, no fees”"}
                  </p>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {isBn
                      ? "কোনো একাউন্ট খোলা ছাড়াই ফ্লাইট ও হোটেল সার্চ করুন। কোনো লুকানো চার্জ নেই—অথবা কার্ড না থাকলে WhatsApp-এ BDT দিয়ে বুক করুন।"
                      : "Search flights and hotels without creating an account. No hidden charges. Click through to book directly with the airline or hotel."}
                  </p>
                </div>
                <div className="space-y-1 p-4 bg-[#F6B73C]/10 rounded-xl border border-[#F6B73C]/30">
                  <span className="text-[#F6B73C] font-semibold text-xs inline-flex items-center gap-1.5 uppercase tracking-wider font-mono">
                    <ShieldCheck size={13} className="text-[#F6B73C]" />
                    <span>{isBn ? "বিশ্বস্ত আন্তর্জাতিক পার্টনার" : "Trusted Partners"}</span>
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">“Powered by Travelpayouts”</p>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                    {isBn
                      ? "আমাদের ফ্লাইট, এয়ারপোর্ট পিকআপ, ট্যুর, Travel eSIM ও গাড়ি ভাড়ার সেবাগুলো Travelpayouts, Aviasales, Welcome Pickups, Klook, Kiwitaxi, Airalo ও QEEQ-এর মাধ্যমে পরিচালিত।"
                      : "Flights, transfers, activities, eSIMs, and car rentals on this site are powered by Travelpayouts and its partner network — including Aviasales, Klook, Kiwitaxi, Airalo, and QEEQ."}
                  </p>
                </div>
              </div>
            </div>


          </div>
        )}

        {/* -------------------------------------------------------------
            ✈️ VIEW 2: FLIGHTS INDEX & LANDING PAGES
        ------------------------------------------------------------- */}
        {section === "flights" && localizedFlights.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <FlightsRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            🏨 VIEW 3: HOTELS SECTION
        ------------------------------------------------------------- */}
        {section === "hotels" && localizedHotels.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <HotelsRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            🛂 VIEW 4: VISA SECTION
        ------------------------------------------------------------- */}
        {section === "visa" && localizedVisas.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <VisaRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            🌍 VIEW 5: DESTINATIONS ROADMAP SECTION
        ------------------------------------------------------------- */}
        {section === "destinations" && DESTINATIONS_DATA.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <DestinationsRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            💰 VIEW 6: TRIP COSTS ANALYZER (CONVERSION BOOSTER)
        ------------------------------------------------------------- */}
        {section === "costs" && localizedCosts.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <CostsRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            🧰 VIEW 7: TRAVEL DATA UTILITY DESK
        ------------------------------------------------------------- */}
        {section === "tools" && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <ToolsRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            📰 VIEW 8: BLOG INTEL HUB (DIRECTORY LANDING VS. DEDICATED ARTICLE PAGE)
        ------------------------------------------------------------- */}
        {section === "blog" && isLanding && localizedBlogs.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <BlogIndexRouteView context={routeViewContext} />
          </React.Suspense>
        )}

        {/* -------------------------------------------------------------
            📖 DEDICATED SINGLE BLOG POST PAGE (/blog/...)
        ------------------------------------------------------------- */}
        {section === "blog" && !isLanding && localizedBlogs.length > 0 && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <BlogPostRouteView context={routeViewContext} />
          </React.Suspense>
        )}
      {/* -------------------------------------------------------------
          📞 VIEW 9: CONTACT US & DIRECT SUPPORT HUB
      ------------------------------------------------------------- */}
      {section === "contact" && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <ContactRouteView context={routeViewContext} />
          </React.Suspense>
        )}

      {/* -------------------------------------------------------------
          👤 VIEW 10: ABOUT US
      ------------------------------------------------------------- */}
      {section === "about" && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <AboutRouteView context={routeViewContext} />
          </React.Suspense>
        )}

      {/* -------------------------------------------------------------
          🛂 VISA-FREE COUNTRIES PILLAR (/visa-free-countries)
      ------------------------------------------------------------- */}
      {section === "visaFree" && (
        <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
          <VisaFreeCountriesRouteView context={routeViewContext} />
        </React.Suspense>
      )}

      {/* -------------------------------------------------------------
          🎟️ VIEW 11: GLOBAL ATTRACTIONS & SKIP-THE-LINE HUB (TIQETS & KLOOK)
      ------------------------------------------------------------- */}
      {section === "experiences" && (
        <React.Suspense fallback={null}>
          <ExperiencesPage lang={lang} region={parameterId === "europe" || parameterId === "asia" ? parameterId : undefined} onNavigate={navigateTo} />
        </React.Suspense>
      )}

      {/* -------------------------------------------------------------
          🎟️ VIEW 11.5: GLOBAL ATTRACTIONS HUB (TIQETS — 9 EUROPEAN CITIES)
      ------------------------------------------------------------- */}
      {section === "attractions" && !parameterId && (
        <React.Suspense fallback={null}>
          <GlobalAttractionsHub lang={lang} onNavigate={navigateTo} />
        </React.Suspense>
      )}
      {section === "attractions" && parameterId && (
        <React.Suspense fallback={null}>
          <AttractionDetailPage lang={lang} parameterId={parameterId} onNavigate={navigateTo} />
        </React.Suspense>
      )}

      {/* -------------------------------------------------------------
          🕋 VIEW 12: DEDICATED UMRAH & HAJJ PAID-ADS LANDING PAGE
      ------------------------------------------------------------- */}
      {section === "kkdayHotels" && (
        <React.Suspense fallback={null}>
          <KkdayHotelsPage
            isBn={isBn}
            onNavigate={navigateTo}
          />
        </React.Suspense>
      )}

      {section === "umrah" && (
        <React.Suspense fallback={null}>
          <UmrahLandingPage
            lang={lang}
            localizedHajjFaqs={localizedHajjFaqs}
            onNavigate={navigateTo}
            coverImage={umrahMakkahImg}
          />
        </React.Suspense>
      )}

      {/* -------------------------------------------------------------
          VIEW 14: BANKING & FOREX CLUSTER HUB (/banking)
      ------------------------------------------------------------- */}
      {section === "banking" && (
        <React.Suspense fallback={null}>
          <BankingHubLandingPage lang={lang} onNavigate={navigateTo} />
        </React.Suspense>
      )}

      {/* -------------------------------------------------------------
          ✈️ VIEW 10: DHAKA AIRPORT (DAC) PRE-DEPARTURE HUB + SITE DIRECTORY
          Two canonical URLs, one component: /pre-departure renders the
          checklist variant, /sitemap renders the directory variant.
      ------------------------------------------------------------- */}
      {(section === "sitemap" || section === "preDeparture") && (
        <React.Suspense fallback={null}>
          <SitemapPage
            onNavigate={navigateTo}
            lang={lang}
            variant={section === "preDeparture" ? "pre-departure" : "sitemap"}
          />
        </React.Suspense>
      )}

      {/* -------------------------------------------------------------
          🔒 VIEW 11: PRIVACY & COOKIE POLICY HUB
      ------------------------------------------------------------- */}
      {section === "privacy" && (
        <React.Suspense fallback={null}>
          <PrivacyPolicyPage onNavigate={navigateTo} lang={lang} />
        </React.Suspense>
      )}

      {section === "notFound" && (
          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>
            <NotFoundRouteView context={routeViewContext} />
          </React.Suspense>
        )}

      {/* -------------------------------------------------------------
          🟦 CONTENT & GROWTH: 4 FEATURED BANGLADESHI TRAVEL GUIDES
          Rendered at the end of <main> on every page (except the Blog hub
          and 404) so each route STARTS with its own content and this
          cross-promo band sits immediately above the subscription section.
      ------------------------------------------------------------- */}
      {section !== "blog" && section !== "notFound" && (
        <section
          id="content-and-growth-hub"
          className="mt-16 pt-12 border-t border-slate-200/80 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-brand-navy">
                  {isBn ? "ট্রাভেল গাইড ও ব্লগ" : "Featured Travel Guides"}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য যাচাইকৃত গাইড (2026)" : "Verified Playbooks for Bangladeshi Travelers (2026)"}
                </span>
              </div>
              <h2 className="ural-section-title font-serif text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য সবচেয়ে জরুরি ৪টি ট্রাভেল ও Umrah গাইড"
                  : "Essential Travel & Umrah Guides for Bangladeshi Flyers"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isBn
                  ? "Dual-Currency Card Endorsement, কম খরচে ফ্যামিলি ট্যুর, নিজে নিজে Umrah প্রস্তুতি এবং Dhaka Airport Immigration-এর যাচাইকৃত গাইড।"
                  : "Step-by-step guides answering top banking, family budget, DIY Umrah, and Dhaka airport immigration questions."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo("/blog")}
              className="self-start sm:self-end bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {isBn
                  ? "সবগুলো ব্লগ দেখুন"
                  : "View All Blogs"}
              </span>
              <ArrowRight size={13} className="text-[#F6B73C]" />
            </button>
          </div>

          {/* Strictly 4 Featured Blog Topics in a Single Row on Desktop (With Unique Image + 50-Word AEO Snippet + Read Full Blog Button) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGrowthTopics.map((topic) => {
              const cardSnippet = getBlogAeoSnippet50Words(topic.slug, isBn, topic.excerpt);
              return (
                <article
                  key={topic.id}
                  onClick={() => navigateTo(`/blog/${topic.slug}`)}
                  className="group bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                      <ResponsiveImage
                        src={getBlogCoverImage(topic.slug)}
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                        alt={generateBlogCoverAltText({
                          title: topic.title,
                          category: topic.category,
                          slug: topic.slug,
                          lang: isBn ? "bn" : "en",
                        })}
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 bg-brand-navy/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/15">
                        {topic.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="ural-card-title font-serif font-bold text-base text-brand-navy group-hover:text-brand-emerald leading-snug">
                        {topic.title}
                      </h3>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {cardSnippet}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(`/blog/${topic.slug}`);
                      }}
                      className="w-full bg-brand-navy group-hover:bg-[#F6B73C] text-white group-hover:text-brand-navy font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন" : "Read Full Blog"}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------
          VIEW 13: HOMEPAGE FAQ (visible text + FAQPage schema)
          Rendered from src/data/homeFaqs.ts, the same array the prerenderer
          writes into dist/index.html. Without this, the static FAQ was the
          only copy and React removed it on mount, leaving the FAQPage node
          describing text that was no longer on the page.
      ------------------------------------------------------------- */}
      {section === "home" && !isBn && (
        <section aria-labelledby="home-faqs" className="mt-10 space-y-4">
          <h2 id="home-faqs" className="ural-section-title font-serif text-2xl font-black text-brand-navy sm:text-3xl">
            {HOME_FAQ_HEADING}
          </h2>
          {HOME_FAQS.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-brand-navy">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </section>
      )}

      </main>

      {/* Shared sitewide subscription card: one email field, with distinct optional interests. */}
      <section
        id="sitewide-subscription"
        aria-labelledby="sitewide-subscription-title"
        className="relative isolate overflow-hidden bg-brand-navy"
      >
        {section === "home" && (
          <ResponsiveImage
            src={coxsBazarSunriseImg}
            sizes="100vw"
            alt={
              isBn
                ? "কক্সবাজার সৈকতে সূর্যোদয়ের সোনালি আলো, দূরে মাছ ধরার নৌকা"
                : "Golden sunrise over Cox's Bazar beach with fishing boats in the distance"
            }
            aria-hidden={true}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 40%" }}
          />
        )}
        <div
          aria-hidden={true}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/70 via-brand-navy/90 to-brand-navy"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="ural-panel mx-auto max-w-4xl border border-white/15 bg-slate-950/80 p-5 text-white shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
            <div className="mx-auto max-w-2xl space-y-3 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F6B73C]/30 bg-[#F6B73C]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F6B73C]">
                <Bell size={13} aria-hidden="true" />
                {section === "home"
                  ? isBn
                    ? "বাংলাদেশ থেকে বিশ্বজুড়ে যাত্রা"
                    : "Live from Cox's Bazar to the World"
                  : isBn
                    ? "আপনার পছন্দের ট্রাভেল আপডেট"
                    : "Travel updates, your way"}
              </span>
              <h2
                id="sitewide-subscription-title"
                className="ural-section-title font-serif text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl"
              >
                {isBn ? "আপনি কোন আপডেট পেতে চান?" : "Choose the updates you want"}
              </h2>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                {isBn
                  ? "একটি বা দুটিই বেছে নিন: ঢাকা থেকে নির্দিষ্ট রুটে ভাড়া কমার অ্যালার্ট এবং/অথবা URAL-এর ট্রাভেল গাইড, পরিকল্পনা ও ভিসা আপডেট।"
                  : "Choose either or both: Dhaka fare-drop alerts on selected routes and/or the URAL travel newsletter with destination guides, planning tips, and visa updates."}
              </p>
            </div>

            {emailSubscribed ? (
              <div
                role="status"
                aria-live="polite"
                className="mx-auto mt-7 max-w-2xl space-y-4 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-5 text-center"
              >
                <div className="space-y-1">
                  <p className="font-serif text-lg font-bold text-white">
                    {hasFareAlertPreference && hasNewsletterPreference
                      ? isBn
                        ? "দুই ধরনের আপডেটের জন্য আপনি সাবস্ক্রাইব করেছেন"
                        : "You’re subscribed to both update types"
                      : hasFareAlertPreference
                        ? isBn
                          ? "ফ্লাইট ভাড়া কমার অ্যালার্ট চালু হয়েছে"
                          : "Dhaka fare-drop alerts are enabled"
                        : hasNewsletterPreference
                          ? isBn
                            ? "ট্রাভেল নিউজলেটার সাবস্ক্রিপশন চালু হয়েছে"
                            : "The travel newsletter is enabled"
                          : isBn
                            ? "আপনার আগের সাবস্ক্রিপশন সক্রিয় আছে"
                            : "Your existing subscription remains active"}
                  </p>
                  <p className="break-all text-sm text-emerald-100">{userEmail}</p>
                  {subscriptionId && (
                    <p className="font-mono text-[11px] text-emerald-200">ID: {subscriptionId}</p>
                  )}
                </div>
                {(hasFareAlertPreference || hasNewsletterPreference) && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {hasFareAlertPreference && (
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                        {isBn ? "ঢাকা ভাড়া অ্যালার্ট" : "Dhaka fare alerts"}
                      </span>
                    )}
                    {hasNewsletterPreference && (
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
                        {isBn ? "ট্রাভেল নিউজলেটার" : "Travel newsletter"}
                      </span>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setEmailSubscribed(false);
                    setEmailSubscribeError(null);
                  }}
                  className="min-h-11 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#F6B73C]/60 hover:text-[#F6B73C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                >
                  {isBn ? "পছন্দ পরিবর্তন করুন" : "Update preferences"}
                </button>
              </div>
            ) : (
              <form
                id="sitewide-subscription-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEmailSubscription(userEmail, "Shared Pre-Footer Signup", selectedSubscriptionInterests);
                }}
                className="mx-auto mt-7 max-w-2xl space-y-5"
              >
                <fieldset
                  aria-describedby={emailSubscribeError ? "sitewide-subscription-error" : undefined}
                  className="space-y-3"
                >
                  <legend className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {isBn ? "একটি বা দুটিই বেছে নিন" : "Select one or both"}
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label
                      htmlFor="subscription-interest-fare-alerts"
                      className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                        hasFareAlertPreference
                          ? "border-[#F6B73C]/70 bg-[#F6B73C]/10"
                          : "border-white/15 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <input
                        id="subscription-interest-fare-alerts"
                        type="checkbox"
                        checked={hasFareAlertPreference}
                        onChange={() => toggleSubscriptionInterest("dhaka-fare-alerts")}
                        className="mt-1 h-5 w-5 shrink-0 accent-[#F6B73C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                      />
                      <span className="space-y-1">
                        <span className="block text-sm font-bold text-white">
                          {isBn
                            ? "ঢাকা থেকে ফ্লাইটের ভাড়া কমলে সাথে সাথে এলার্ট পান"
                            : "Get Flight Deal Alerts from Dhaka"}
                        </span>
                        <span className="block text-xs leading-relaxed text-slate-300">
                          {isBn
                            ? "ঢাকা থেকে Maldives, Nepal, Bangkok, Kuala Lumpur, Jeddah বা Dubai-এর ভাড়া কমলে BDT অ্যালার্ট পান।"
                            : "Get BDT alerts when fares from Dhaka to Maldives, Nepal, Bangkok, Kuala Lumpur, or Dubai fall below BDT 20,000."}
                        </span>
                      </span>
                    </label>
                    <label
                      htmlFor="subscription-interest-newsletter"
                      className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                        hasNewsletterPreference
                          ? "border-[#F6B73C]/70 bg-[#F6B73C]/10"
                          : "border-white/15 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <input
                        id="subscription-interest-newsletter"
                        type="checkbox"
                        checked={hasNewsletterPreference}
                        onChange={() => toggleSubscriptionInterest("travel-newsletter")}
                        className="mt-1 h-5 w-5 shrink-0 accent-[#F6B73C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                      />
                      <span className="space-y-1">
                        <span className="block text-sm font-bold text-white">
                          {isBn ? "সাধারণ ট্রাভেল নিউজলেটার" : "General travel newsletter"}
                        </span>
                        <span className="block text-xs leading-relaxed text-slate-300">
                          {isBn
                            ? "গন্তব্য গাইড, ভ্রমণ পরিকল্পনার পরামর্শ ও ভিসা আপডেট পান।"
                            : "Get destination guides, practical trip-planning tips, and visa updates."}
                        </span>
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="sitewide-subscription-email" className="mb-1.5 block text-xs font-semibold text-slate-200">
                      {isBn ? "ইমেইল ঠিকানা" : "Email address"}
                    </label>
                    <input
                      id="sitewide-subscription-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        if (emailSubscribeError) setEmailSubscribeError(null);
                      }}
                      placeholder={isBn ? "আপনার ইমেইল ঠিকানা লিখুন" : "Enter your email address"}
                      className="min-h-12 w-full rounded-xl border border-white/20 bg-brand-navy/80 px-4 py-3 text-sm text-white placeholder-slate-400 transition-colors focus:border-[#F6B73C] focus:outline-none focus:ring-2 focus:ring-[#F6B73C]/40"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={emailSubmitting}
                    className="min-h-12 w-full shrink-0 rounded-xl bg-[#F6B73C] px-6 py-3 text-sm font-extrabold text-brand-navy shadow-md transition-colors hover:bg-[#ffc654] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                  >
                    {emailSubmitting
                      ? isBn
                        ? "যুক্ত হচ্ছে..."
                        : "Subscribing..."
                      : isBn
                        ? "সাবস্ক্রাইব করুন"
                        : "Subscribe"}
                  </button>
                </div>

                {emailSubscribeError && (
                  <p id="sitewide-subscription-error" role="alert" className="text-sm font-semibold text-amber-200">
                    {emailSubscribeError}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                  <span>
                    {isBn ? "স্প্যামমুক্ত · এক ক্লিকে আনসাবস্ক্রাইব" : "Spam-free · 1-Click Unsubscribe"}
                  </span>
                  <span>{isBn ? "BDT ভাড়া অ্যালার্ট ও ট্রাভেল আপডেট" : "BDT Pricing Alerts & Travel Updates"}</span>
                  <span>{isBn ? "ইংরেজি ও বাংলায় আপডেট" : "English and Bengali support"}</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 🔮 MASTER FOOTER BLOCK */}
      <footer className="bg-brand-navy text-slate-300 pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* SUPPORT BAND — one action, three ways to take it.
              Previously the same phone number was printed twice in two
              near-identical boxes (one `wa.me`, one `tel:`), which made two
              rows of the footer carry one fact. The number now appears once;
              tapping it calls, and WhatsApp and the form sit beside it.

              The span classes are load-bearing, not decoration. This band is a
              child of the 12-column grid below it and sits ABOVE the five
              columns, so it must claim the whole row: `md:col-span-2` on the
              2-column tablet grid, `lg:col-span-12` on desktop. Without them
              it takes a single 1/12 column (~90px), the copy wraps one word per
              line, and the five columns that follow no longer fit in one row.
              verify-build.ts renders this footer and asserts the spans, so the
              "full width" band and its row arithmetic cannot drift again. */}
          <div className="md:col-span-2 lg:col-span-12 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 sm:px-6 sm:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-white font-bold uppercase text-xs tracking-[0.12em] block">
                {isBn ? "সরাসরি সাপোর্ট ডেস্ক" : "Direct Support Desk"}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isBn
                  ? "ঢাকা ডেস্ক · ফ্লাইট ও হোটেল বুকিং, ভিসা ডকুমেন্ট ও ওমরাহ সহায়তা"
                  : "Dhaka desk · flight & hotel booking, visa documents, Umrah support"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="tel:+8801784385335"
                aria-label={isBn ? "সরাসরি কল করুন: +880 1784-385335" : "Call the URAL desk: +880 1784-385335"}
                className="min-h-11 inline-flex items-center px-1 font-mono text-sm font-bold tracking-tight text-[#F6B73C] hover:text-white hover:underline"
              >
                +880 1784-385335
              </a>
              <a
                href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 inline-flex items-center gap-2 rounded-xl border border-brand-emerald/40 bg-brand-emerald/15 px-3.5 text-xs font-semibold text-emerald-300 hover:bg-brand-emerald/25 hover:text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.35 1.489 5.513 0 10.002-4.486 10.005-9.999.001-2.671-1.037-5.182-2.924-7.071C17.192 1.685 14.685.648 12.012.648c-5.516 0-10.01 4.488-10.014 10.002-.001 1.902.48 3.712 1.404 5.385.98 1.775 2.417 3.303 4.166 4.395l-1.13 4.126 4.22-1.114z" />
                </svg>
                {isBn ? "হোয়াটসঅ্যাপ" : "WhatsApp"}
              </a>
              <a
                href={getLocalizedRouteHref("/contact")}
                onClick={(event) => handleNavigationAnchorClick(event, "/contact")}
                className="min-h-11 inline-flex items-center gap-2 rounded-xl border border-[#F6B73C]/40 bg-[#F6B73C]/10 px-3.5 text-xs font-semibold text-[#F6B73C] hover:bg-[#F6B73C]/20 hover:text-white"
              >
                {isBn ? "যোগাযোগ ফর্ম" : "Contact form"}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
            
            {/* COLUMN 1 (3 Cols): Brand Lockup, Slogan & Social Media Community */}
            <div className="lg:col-span-3 space-y-4">
              <div className="space-y-1.5">
                <a
                  href={getLocalizedRouteHref("/")}
                  onClick={(event) => handleNavigationAnchorClick(event, "/")}
                  aria-label={isBn ? "URAL হোম পেজ" : "URAL home"}
                  className="inline-flex items-center gap-2.5 text-white cursor-pointer focus-visible:outline-none"
                >
                  <img
                    src="/assets/brand/svg/ural-wordmark-v1.svg"
                    alt="URAL"
                    width="88"
                    height="30"
                    className="h-7 w-auto"
                  />
                </a>
                <p className="text-[11px] font-semibold text-[#F6B73C] tracking-wide">
                  {isBn
                    ? "ট্রাভেল ইন্টেলিজেন্স সিস্টেম · সাধারণ এজেন্সি নয়"
                    : "Travel Intelligence System · Beyond a Typical Agency"}
                </p>
              </div>

              <p className="leading-relaxed text-slate-300 text-xs">
                {isBn
                  ? "বাংলাদেশি ও গ্লোবাল ভ্রমণকারীদের জন্য নিরপেক্ষ ফ্লাইট ভাড়া তুলনা, ভেরিফায়েড হোটেল জোন, অফিসিয়াল ভিসা চেকলিস্ট, DIY ওমরাহ এবং BDT বাজেট প্ল্যানার।"
                  : "Independent flight fare intelligence, verified hotel zones, step-by-step visa checklists, and BDT trip budgets built for Bangladeshi and global travelers."}
              </p>

              {/* Social Media Channels — Official Verified URAL Profiles */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">
                  {isBn ? "সোশ্যাল মিডিয়ায় যুক্ত থাকুন (@uraltravelbd)" : "Follow URAL (@uraltravelbd)"}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    {
                      name: "Facebook (@uraltravelbd)",
                      href: URAL_SOCIAL_LINKS.facebook,
                      rel: "me noopener noreferrer",
                      svg: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Instagram (@uraltravelbd)",
                      href: URAL_SOCIAL_LINKS.instagram,
                      rel: "me noopener noreferrer",
                      svg: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      ),
                    },
                    {
                      name: "LinkedIn (URAL Travel Bangladesh)",
                      href: URAL_SOCIAL_LINKS.linkedin,
                      rel: "me noopener noreferrer",
                      svg: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      ),
                    },
                    {
                      name: "TikTok (@uraltravelbd)",
                      href: URAL_SOCIAL_LINKS.tiktok,
                      rel: "me noopener noreferrer",
                      svg: (
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.86-4.49V8.75a8.28 8.28 0 0 0 4.91 1.6V6.9a4.83 4.83 0 0 1-1-.21z" />
                        </svg>
                      ),
                    },
                    // WhatsApp deliberately omitted from this row: it is a support
                    // channel, not a social profile, and it already has its own
                    // button in the support band above. Listing it twice was the
                    // same duplication as the old twin phone rows.
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel={social.rel}
                      aria-label={`URAL on ${social.name}`}
                      title={social.name}
                      className="w-11 h-11 rounded-xl bg-slate-800/80 hover:bg-[#F6B73C] text-slate-300 hover:text-brand-navy border border-slate-700/70 hover:border-[#F6B73C] flex items-center justify-center transition-colors"
                    >
                      {social.svg}
                    </a>
                  ))}
                </div>
              </div>

              {/* Entity signal, in the identity cluster where "who we are" lives.
                  Text only, deliberately:
                  - The old badge hotlinked a PNG from upload.wikimedia.org, which
                    put a third-party DNS lookup, TLS handshake and request on all
                    175 pages for a 20px icon.
                  - Wikimedia logos are trademarks whose use "may require
                    permission", and a logo here would imply an association that
                    does not exist. The entity is stated, not decorated.
                  The machine-readable half of this claim is `sameAs` on the
                  Organization node (src/utils/schema.ts) — that is what actually
                  feeds the knowledge graph; this link is for readers. */}
              <a
                href={URAL_WIKIDATA_ENTITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                title={
                  isBn
                    ? "URAL Travel Intelligence-এর Wikidata সত্তা (Q141682382)"
                    : "The Wikidata item that identifies URAL Travel Intelligence (Q141682382)"
                }
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-[#F6B73C] hover:underline"
              >
                <span aria-hidden="true">◈</span>
                {isBn ? "Wikidata সত্তা Q141682382" : "Wikidata entity Q141682382"}
              </a>

              {/* Affiliate disclosure, short form.
                  The full legal statement lives in the bottom compliance bar.
                  This one is deliberately a single scannable sentence: the
                  brand column is the narrowest on the grid, so a 60-word
                  paragraph here would stretch this column past every other and
                  unbalance the 12-column layout. It also keeps the claim
                  conspicuous next to the brand rather than only in 11px text
                  at the very bottom of the page. */}
              <p className="border-t border-slate-800/80 pt-3 text-[11px] leading-relaxed text-slate-400">
                <strong className="font-semibold text-slate-300">
                  {isBn ? "অ্যাফিলিয়েট ডিসক্লোজার:" : "Affiliate disclosure:"}
                </strong>{" "}
                {isBn
                  ? "সাইটের কিছু আউটবাউন্ড লিংক অ্যাফিলিয়েট লিংক; আপনার অতিরিক্ত খরচ ছাড়াই আমরা কমিশন পেতে পারি — যা সব গাইড ফ্রি রাখে।"
                  : "Some outbound links are affiliate links; we may earn a commission at no extra cost to you — which keeps every guide free."}
              </p>
            </div>

            {/* COLUMN 2 (2 Cols): Flights & Routes. Every column in this footer
                now ends with one gold "everything" link — a consistent pattern
                rather than two unrelated gold links in two columns. */}
            <div className="lg:col-span-2 space-y-2.5">
              <span className="text-white font-bold uppercase text-xs tracking-[0.12em] block">
                {isBn ? "ফ্লাইট রুট" : "Flight Routes"}
              </span>
              <ul className="space-y-1.5 text-xs">
                <li><a href={getLocalizedRouteHref("/flights/dhaka-kathmandu")} onClick={(event) => handleNavigationAnchorClick(event, "/flights/dhaka-kathmandu")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">Dhaka → Kathmandu (KTM)</a></li>
                <li><a href={getLocalizedRouteHref("/flights/dhaka-bangkok")} onClick={(event) => handleNavigationAnchorClick(event, "/flights/dhaka-bangkok")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">Dhaka → Bangkok (BKK)</a></li>
                <li><a href={getLocalizedRouteHref("/flights/dhaka-kuala-lumpur")} onClick={(event) => handleNavigationAnchorClick(event, "/flights/dhaka-kuala-lumpur")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">Dhaka → Kuala Lumpur (KUL)</a></li>
                <li><a href={getLocalizedRouteHref("/flights/dhaka-singapore")} onClick={(event) => handleNavigationAnchorClick(event, "/flights/dhaka-singapore")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">Dhaka → Singapore (SIN)</a></li>
                <li><a href={getLocalizedRouteHref("/flights/dhaka-maldives")} onClick={(event) => handleNavigationAnchorClick(event, "/flights/dhaka-maldives")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">Dhaka → Malé, Maldives (MLE)</a></li>
                <li><a href={getLocalizedRouteHref("/flights/dhaka-dubai")} onClick={(event) => handleNavigationAnchorClick(event, "/flights/dhaka-dubai")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">Dhaka → Dubai (DXB)</a></li>
                <li><a href={getLocalizedRouteHref("/umrah")} onClick={(event) => handleNavigationAnchorClick(event, "/umrah")} className="inline-block py-1 text-[#F6B73C] font-semibold hover:underline text-left cursor-pointer">{isBn ? "ঢাকা → জেদ্দা ও মদিনা (ওমরাহ)" : "Dhaka → Jeddah & Madinah (Umrah)"}</a></li>
                <li><a href={getLocalizedRouteHref("/flights")} onClick={(event) => handleNavigationAnchorClick(event, "/flights")} className="inline-block py-1 text-[#F6B73C] font-semibold hover:underline text-left cursor-pointer">{isBn ? "সব ফ্লাইট রুট ও ভাড়া →" : "All flight routes & fares →"}</a></li>
              </ul>
            </div>

            {/* COLUMN 3 (2 Cols): Visa & entry rules — the site's authority column. */}
            <div className="lg:col-span-2 space-y-2.5">
              <span className="text-white font-bold uppercase text-xs tracking-[0.12em] block">
                {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "Visa Checklists"}
              </span>
              <ul className="space-y-1.5 text-xs">
                <li><a href={getLocalizedRouteHref("/visa-free-countries")} onClick={(event) => handleNavigationAnchorClick(event, "/visa-free-countries")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "ভিসা ছাড়া যেসব দেশে যাওয়া যায় (২০২৬)" : "Visa-Free Countries (2026)"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa/nepal-visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa/nepal-visa")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Nepal ফ্রি Visa on Arrival" : "Nepal Free Visa on Arrival"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa/maldives-visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa/maldives-visa")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Maldives ফ্রি VOA + IMUGA" : "Maldives Free VOA + IMUGA"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa/thailand-visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa/thailand-visa")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Thailand অফিসিয়াল e-Visa" : "Thailand Official e-Visa"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa/malaysia-visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa/malaysia-visa")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Malaysia অনলাইন eVisa" : "Malaysia Online eVisa"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa/singapore-visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa/singapore-visa")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Singapore অনুমোদিত এজেন্ট ভিসা" : "Singapore Authorized Visa"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa/dubai-visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa/dubai-visa")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "UAE Dubai ট্যুরিস্ট eVisa" : "UAE Dubai Tourist eVisa"}</a></li>
                <li><a href={getLocalizedRouteHref("/visa")} onClick={(event) => handleNavigationAnchorClick(event, "/visa")} className="inline-block py-1 text-[#F6B73C] font-semibold hover:underline text-left cursor-pointer">{isBn ? "সব ভিসা গাইড →" : "All visa guides →"}</a></li>
              </ul>
            </div>

            {/* COLUMN 4 (2 Cols): Plan Your Trip. Replaces the blog-directory link that
                used to sit at the bottom of the visa column, and gives /costs, /hotels,
                /destinations, /experiences and /tools their only footer entry. */}
            <div className="lg:col-span-2 space-y-2.5">
              <span className="text-white font-bold uppercase text-xs tracking-[0.12em] block">
                {isBn ? "ট্রিপ পরিকল্পনা" : "Plan Your Trip"}
              </span>
              <ul className="space-y-1.5 text-xs">
                <li><a href={getLocalizedRouteHref("/costs")} onClick={(event) => handleNavigationAnchorClick(event, "/costs")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "ট্রিপের খরচ (BDT গাইড)" : "What a trip costs (BDT)"}</a></li>
                <li><a href={getLocalizedRouteHref("/hotels")} onClick={(event) => handleNavigationAnchorClick(event, "/hotels")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "হোটেল এলাকা ও জোন" : "Hotel areas & neighbourhoods"}</a></li>
                <li><a href={getLocalizedRouteHref("/destinations")} onClick={(event) => handleNavigationAnchorClick(event, "/destinations")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "দেশভিত্তিক ইটিনারারি" : "Country itineraries & tips"}</a></li>
                <li><a href={getLocalizedRouteHref("/experiences")} onClick={(event) => handleNavigationAnchorClick(event, "/experiences")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "অ্যাট্রাকশন পাস ও অভিজ্ঞতা" : "Attraction passes & experiences"}</a></li>
                <li><a href={getLocalizedRouteHref("/tools")} onClick={(event) => handleNavigationAnchorClick(event, "/tools")} className="inline-block py-1 hover:text-white hover:underline text-left cursor-pointer">{isBn ? "ট্রাভেল ক্যালকুলেটর ও টুলস" : "Travel calculators & tools"}</a></li>
                <li><a href={getLocalizedRouteHref("/blog")} onClick={(event) => handleNavigationAnchorClick(event, "/blog")} className="inline-block py-1 text-[#F6B73C] font-semibold hover:underline text-left cursor-pointer">{isBn ? "সব ট্রাভেল গাইড →" : "All travel guides →"}</a></li>
              </ul>
            </div>

            {/* COLUMN 5 (3 Cols): Travel Services — one row per partner and per job.
                Klook used to appear twice with two different labels pointing at the
                identical URL (hotels + tours), so a reader saw seven offers where
                there were six. The two are merged; Go City, Tiqets, Airalo, Welcome
                Pickups and AirHelp stay. Labels say what you actually buy. */}
            <div className="lg:col-span-3 space-y-2.5">
              <span className="text-white font-bold uppercase text-xs tracking-[0.12em] block">
                {isBn ? "গ্লোবাল ট্রাভেল সার্ভিস" : "Travel Services"}
              </span>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.klook)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 py-1 hover:text-white hover:underline"
                  >
                    {isBn ? "হোটেল, ট্যুর ও অ্যাক্টিভিটি" : "Hotels, Tours & Activities"}
                    <span aria-hidden="true" className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.goCity)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 py-1 hover:text-white hover:underline"
                  >
                    {isBn ? "সিটিসিপ পাস" : "Sightseeing City Passes"}
                    <span aria-hidden="true" className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.tiqets)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 py-1 hover:text-white hover:underline"
                  >
                    {isBn ? "মিউজিয়াম ও অ্যাট্রাকশন টিকিট" : "Museum & Attraction Tickets"}
                    <span aria-hidden="true" className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.airalo)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 py-1 hover:text-white hover:underline"
                  >
                    {isBn ? "ট্রাভেল eSIM ডাটা" : "Travel eSIM Data"}
                    <span aria-hidden="true" className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.welcomePickups)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 py-1 hover:text-white hover:underline"
                  >
                    {isBn ? "এয়ারপোর্ট পিকআপ ও ট্রান্সফার" : "Airport Pickup & Transfers"}
                    <span aria-hidden="true" className="text-slate-500">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href={resolvePartnerUrl(AFFILIATE_LINKS.airhelp)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1 py-1 hover:text-white hover:underline"
                  >
                    {isBn ? "ফ্লাইট বিলম্ব ক্ষতিপূরণ" : "Flight Delay Compensation"}
                    <span aria-hidden="true" className="text-slate-500">↗</span>
                  </a>
                </li>
              </ul>

              {/* Free tools, not a paid partner: separated by a rule so it reads as
                  URAL's own resource sitting below the commercial links. */}
              <div className="border-t border-slate-800/80 pt-2.5 flex flex-wrap gap-x-4">
                <a
                  href={getLocalizedRouteHref("/pre-departure")}
                  onClick={(event) => handleNavigationAnchorClick(event, "/pre-departure")}
                  className="inline-block py-1 text-xs font-semibold text-[#F6B73C] hover:text-white hover:underline cursor-pointer"
                >
                  {isBn
                    ? "ঢাকা এয়ারপোর্ট (DAC) প্রি-ডিপার্চার চেকলিস্ট →"
                    : "Dhaka Airport (DAC) Pre-Departure Checklist →"}
                </a>
                <a
                  href={getLocalizedRouteHref("/sitemap")}
                  onClick={(event) => handleNavigationAnchorClick(event, "/sitemap")}
                  className="inline-block py-1 text-xs font-semibold text-[#F6B73C] hover:text-white hover:underline cursor-pointer"
                >
                  {isBn ? "সব গাইড ডিরেক্টরি →" : "All Guides Directory →"}
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM COMPLIANCE BAR: FTC / Partner Affiliate Disclosure & Copyright */}
          <div className="pt-6 border-t border-slate-800/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-[11px] text-slate-400 leading-relaxed">
            <p className="max-w-4xl">
              {isBn ? (
                <>
                  <strong className="text-slate-300 font-semibold">অ্যাফিলিয়েট ও সম্পাদকীয় স্বচ্ছতা (Affiliate Disclosure):</strong>{" "}
                  URAL কোনো প্রথাগত ট্রাভেল এজেন্সি নয়—এটি একটি স্বাধীন ট্রাভেল ইন্টেলিজেন্স প্ল্যাটফর্ম। আমাদের সাইটের কিছু আউটবাউন্ড লিংক ভেরিফায়েড আন্তর্জাতিক বুকিং পার্টনারদের (যেমন Travelpayouts, Klook, Go City, Tiqets, Airalo, Welcome Pickups ও AirHelp) সাথে যুক্ত। এসব লিংকের মাধ্যমে আপনি বুকিং সম্পন্ন করলে আপনার অতিরিক্ত কোনো খরচ ছাড়াই URAL সামান্য রেফারেল কমিশন পেতে পারে, যা আমাদের সব গাইড ও ক্যালকুলেটর ১০০% ফ্রি রাখতে সাহায্য করে।
                </>
              ) : (
                <>
                  <strong className="text-slate-300 font-semibold">Affiliate &amp; Editorial Disclosure:</strong>{" "}
                  URAL is an independent travel intelligence system, not a traditional ticket-selling agency. Some outbound links on this site connect to verified global travel partners (including Travelpayouts, Klook, Go City, Tiqets, Airalo, Welcome Pickups, and AirHelp). When you book through these links, URAL may earn a referral commission at zero additional cost to you—keeping our visa checklists, BDT calculators, and travel guides 100% free.
                </>
              )}
            </p>
            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 font-mono text-[10px] text-slate-300">
              <a
                href={isBn ? "/bn/about" : "/about"}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(isBn ? "/bn/about" : "/about");
                }}
                className="min-h-10 px-1 inline-flex items-center hover:text-white underline underline-offset-2 text-[#F6B73C] font-semibold cursor-pointer"
              >
                {isBn ? "আমাদের সম্পর্কে" : "About"}
              </a>
              <span className="hidden sm:inline">•</span>
              <a
                href={isBn ? "/bn/privacy" : "/privacy"}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(isBn ? "/bn/privacy" : "/privacy");
                }}
                className="min-h-10 px-1 inline-flex items-center hover:text-white underline underline-offset-2 text-[#F6B73C] font-semibold cursor-pointer"
              >
                {isBn ? "গোপনীয়তা ও কুকি নীতিমালা" : "Privacy & Cookie Policy"}
              </a>
              <span className="hidden sm:inline">•</span>
              {/* GDPR Art. 7(3): withdrawing consent must be as easy as giving it.
                  The banner listens for this event and reopens with the
                  per-category panel (see ConsentBanner.tsx). */}
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("ural:open-cookie-banner"))
                }
                className="min-h-10 px-1 inline-flex items-center hover:text-white underline underline-offset-2 text-[#F6B73C] font-semibold cursor-pointer"
              >
                {isBn ? "কুকি সেটিংস" : "Cookie settings"}
              </button>
              <span className="hidden sm:inline">•</span>
              <span>
                {isBn
                  ? "© 2026 URAL Travel Intelligence. সর্বস্বত্ব সংরক্ষিত।"
                  : "© 2026 URAL Travel Intelligence. All rights reserved."}
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Dynamic Action Affiliate Conversion Toast Overlay */}
      {affiliateToast && (
        <div id="converter-toast" className="fixed bottom-6 right-6 z-50 max-w-sm bg-brand-navy text-white p-4 rounded-xl shadow-2xl border border-[#F6B73C] animate-fade-in flex items-start gap-4">
          <div className="p-2 bg-[#F6B73C] text-brand-navy rounded-lg shrink-0 text-xs"><Sparkles size={14} /></div>
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
      {isPriceAlertOpen && (
        <React.Suspense fallback={null}>
          <PriceAlertModal
            isOpen={isPriceAlertOpen}
            onClose={() => setIsPriceAlertOpen(false)}
            lang={lang}
            defaultDestination={alertDestination}
          />
        </React.Suspense>
      )}

      {/* Google Consent Mode v2 Floating Cookie Consent Banner */}
      <ConsentBanner onNavigate={navigateTo} lang={lang} />

      {/* Back-to-top floating button — appears after 600px scroll */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={isBn ? "পৃষ্ঠার শীর্ষে যান" : "Scroll back to top"}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-brand-navy text-white shadow-lg flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-brand-gold hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

    </div>
  );
}
