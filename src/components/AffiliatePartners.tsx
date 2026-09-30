import React, { useEffect, useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { KlookEmbed } from "./KlookEmbed";
import { KiwitaxiEmbed } from "./KiwitaxiEmbed";
import { AiraloEmbed } from "./AiraloEmbed";
import { QeeqEmbed } from "./QeeqEmbed";
import { WelcomePickupsEmbed, WELCOME_PICKUPS_PARTNER_URL } from "./WelcomePickupsEmbed";

/* Single source of truth for the plain outbound URLs (used by
   PartnerLinkButton and any inline <a> tags). Do not edit these values. */
export const AFFILIATE_LINKS = {
  aviasales: "https://aviasales.tpo.li/8saJolX0",
  klook: "https://klook.tpo.li/IYOU76Bn",
  tiqets: "https://tiqets.tpo.li/KSc4uyIB",
  airhelp: "https://airhelp.tpo.li/XS95LnEC",
  kkday: "https://kkday.tpo.li/3Ecyxris",
  kiwitaxi: "https://kiwitaxi.tpo.li/GIhvhrtF",
  welcomePickups: WELCOME_PICKUPS_PARTNER_URL,
  airalo: "https://airalo.tpo.li/mV2QXsXK",
  qeeq: "https://qeeq.tpo.li/nooi5oSG",
  radicalStorage: "https://radicalstorage.tpo.li/7I3EWiUg"
};

export type AffiliatePartnerKey = keyof typeof AFFILIATE_LINKS;

export const AIRHELP_PROMO = {
  code: "AHTPO11",
  discount: "11% OFF",
  validUntil: "November 30, 2026",
  expiresAt: "2026-11-30",
  plans: "AirHelp+ Smart & AirHelp+ Pro",
  scriptSrc: "https://tpemd.com/content?promo_id=8679&campaign_id=120&powered_by=true&lang=en&shmarker=675992&trs=540277"
};

export const KKDAY_PROMO = {
  affiliateUrl: "https://kkday.tpo.li/3Ecyxris",
  campaignName: "KKday Southeast Asia 9.9 Travel Sale",
  discount: "30% OFF + Buy 1 Get 1",
  giveaway: "US$100 KKday Coupon (Top 5 Spenders)",
  bookingWindow: "Sept 9 – Sept 30, 2026",
  expiresAt: "2026-09-30",
  travelWindow: "Sept 9 – Dec 31, 2026",
  categories: "Southeast Asia Tours, Airport Transfers & Attraction Tickets"
};

export const RADICAL_STORAGE_PROMO = {
  affiliateUrl: "https://radicalstorage.tpo.li/7I3EWiUg",
  partnerName: "Radical Storage",
  commissionBoostRate: "15%",
  baseCommissionRate: "8%–10%",
  commissionBoostValidUntil: "October 31, 2026",
  expiresAt: "2026-10-31",
  pricePerBag: "From ~€5 / $6 per bag/day (insured up to €3,000)"
};

export interface AffiliateOfferLifecycleItem {
  id: AffiliatePartnerKey;
  partnerName: string;
  status: "active" | "paused";
  offerType: "evergreen" | "commission-boost" | "customer-promo";
  url: string;
  fallbackPartner: AffiliatePartnerKey;
  expiresAt?: string;
  promoCode?: string;
  activeNote: string;
  expiredFallbackBehavior: string;
}

/**
 * Central registry for all Travelpayouts partner programs & time-limited offers.
 * - If a partner program ever pauses/disconnects, flip `status: "paused"` here
 *   and every button/link across the site automatically redirects to `fallbackPartner`.
 * - If a customer promo passes `expiresAt`, `isPromoActive(expiresAt)` automatically
 *   hides the expired coupon/date and switches the UI to permanent evergreen copy.
 */
export const AFFILIATE_OFFER_REGISTRY: Record<AffiliatePartnerKey, AffiliateOfferLifecycleItem> = {
  aviasales: {
    id: "aviasales",
    partnerName: "Aviasales Flights",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.aviasales,
    fallbackPartner: "aviasales",
    activeNote: "Core flight metasearch engine",
    expiredFallbackBehavior: "Permanent core partner"
  },
  klook: {
    id: "klook",
    partnerName: "Klook Activities & Rail",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.klook,
    fallbackPartner: "tiqets",
    activeNote: "Core Asia & Dubai tours/activities partner",
    expiredFallbackBehavior: "Permanent core partner"
  },
  tiqets: {
    id: "tiqets",
    partnerName: "Tiqets Skip-the-Line Museums",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.tiqets,
    fallbackPartner: "klook",
    activeNote: "Core Europe, UK & USA museum pass partner",
    expiredFallbackBehavior: "Falls back to Klook if ever paused"
  },
  airhelp: {
    id: "airhelp",
    partnerName: "AirHelp (€600 Claim + AirHelp+)",
    status: "active",
    offerType: "customer-promo",
    url: AFFILIATE_LINKS.airhelp,
    fallbackPartner: "aviasales",
    expiresAt: AIRHELP_PROMO.expiresAt,
    promoCode: AIRHELP_PROMO.code,
    activeNote: `11% OFF AirHelp+ with code ${AIRHELP_PROMO.code} through ${AIRHELP_PROMO.validUntil}`,
    expiredFallbackBehavior: "Auto-hides AHTPO11 code after Nov 30, 2026 & keeps permanent €600 claim link"
  },
  kkday: {
    id: "kkday",
    partnerName: "KKday Southeast Asia",
    status: "active",
    offerType: "customer-promo",
    url: AFFILIATE_LINKS.kkday,
    fallbackPartner: "klook",
    expiresAt: KKDAY_PROMO.expiresAt,
    activeNote: `${KKDAY_PROMO.campaignName} (${KKDAY_PROMO.discount}) through Sept 30, 2026`,
    expiredFallbackBehavior: "Auto-switches banner to evergreen KKday SEA Passes after Sept 30, 2026"
  },
  kiwitaxi: {
    id: "kiwitaxi",
    partnerName: "Kiwitaxi Airport Transfers",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.kiwitaxi,
    fallbackPartner: "welcomePickups",
    activeNote: "Core private airport transfer partner",
    expiredFallbackBehavior: "Falls back to Welcome Pickups if ever paused"
  },
  welcomePickups: {
    id: "welcomePickups",
    partnerName: "Welcome Pickups",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.welcomePickups,
    fallbackPartner: "kiwitaxi",
    activeNote: "Meet-and-greet airport transfer partner",
    expiredFallbackBehavior: "Falls back to Kiwitaxi if ever paused"
  },
  airalo: {
    id: "airalo",
    partnerName: "Airalo Travel eSIM",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.airalo,
    fallbackPartner: "klook",
    activeNote: "Core 200+ country travel eSIM partner",
    expiredFallbackBehavior: "Permanent core partner"
  },
  qeeq: {
    id: "qeeq",
    partnerName: "QEEQ Car Rental",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.qeeq,
    fallbackPartner: "kiwitaxi",
    activeNote: "International car rental comparison",
    expiredFallbackBehavior: "Falls back to Kiwitaxi if ever paused"
  },
  radicalStorage: {
    id: "radicalStorage",
    partnerName: "Radical Storage (Luggage Network)",
    status: "active",
    offerType: "commission-boost",
    url: AFFILIATE_LINKS.radicalStorage,
    fallbackPartner: "klook",
    expiresAt: RADICAL_STORAGE_PROMO.expiresAt,
    activeNote: `Boosted 15% partner commission through ${RADICAL_STORAGE_PROMO.commissionBoostValidUntil} (then 8%–10% base rate)`,
    expiredFallbackBehavior: "Keeps permanent link live at base 8%–10% commission; if paused, auto-swaps to Klook"
  }
};

/**
 * Checks whether a YYYY-MM-DD expiry date is still active through the end of that
 * calendar day in Bangladesh Standard Time (UTC+06:00).
 */
export function isPromoActive(expiresAt?: string): boolean {
  if (!expiresAt) return true;
  const endOfDayBst = new Date(`${expiresAt}T23:59:59+06:00`).getTime();
  if (Number.isNaN(endOfDayBst)) return true;
  return Date.now() <= endOfDayBst;
}

/**
 * Returns remaining calendar days until `expiresAt` (negative if already expired).
 */
export function getPromoDaysRemaining(expiresAt?: string): number | null {
  if (!expiresAt) return null;
  const endOfDayBst = new Date(`${expiresAt}T23:59:59+06:00`).getTime();
  if (Number.isNaN(endOfDayBst)) return null;
  return Math.ceil((endOfDayBst - Date.now()) / (1000 * 60 * 60 * 24));
}

/**
 * Resolves a partner key or raw URL so that if a partner is ever marked `status: "paused"`
 * in `AFFILIATE_OFFER_REGISTRY`, it automatically substitutes the active `fallbackPartner` URL.
 */
export function resolvePartnerUrl(hrefOrKey: string): string {
  const matchedEntry = Object.values(AFFILIATE_OFFER_REGISTRY).find(
    (entry) => entry.id === hrefOrKey || entry.url === hrefOrKey
  );
  if (!matchedEntry) return hrefOrKey;
  if (matchedEntry.status === "paused") {
    const fallback = AFFILIATE_OFFER_REGISTRY[matchedEntry.fallbackPartner];
    return fallback ? fallback.url : AFFILIATE_LINKS.aviasales;
  }
  return matchedEntry.url;
}

/**
 * Automatically strips or replaces time-bound campaign references (KKday 9.9 Sale,
 * AirHelp AHTPO11) inside blog body paragraphs and CTA headlines once their
 * `expiresAt` date has passed in Bangladesh Standard Time (UTC+06:00).
 */
export function sanitizeExpiredPromoText(text: string): string {
  let out = text;
  if (!isPromoActive(KKDAY_PROMO.expiresAt)) {
    out = out
      .replace(/\s*\(KKday 9\.9 Sale\)/gi, " (KKday Official Partner)")
      .replace(/Claim 30% OFF \+ Buy 1 Get 1 on/gi, "Book Discounted")
      .replace(/৩০% ছাড় \+ Buy 1 Get 1/g, "অনলাইন ডিসকাউন্ট");
  }
  if (!isPromoActive(AIRHELP_PROMO.expiresAt)) {
    out = out
      .replace(/\s*\(and using promo code \*\*`AHTPO11`\*\* for an \*\*11% discount on AirHelp\+ Smart & Pro protection\*\*\)/gi, "")
      .replace(/\s*\(Use Promo Code AHTPO11 for 11% OFF AirHelp\+ Smart & Pro\)/gi, "")
      .replace(/\s*\(এবং \*\*AirHelp\+ Smart ও Pro প্রোটেকশনে ১১% ছাড় পেতে প্রোমো কোড `AHTPO11`\*\* ব্যবহার করুন\)/g, "")
      .replace(/\s*\(AirHelp\+ এ ১১% ছাড়ের কোড: AHTPO11\)/g, "");
  }
  return out;
}

export interface RadicalStorageBlogPlacement {
  badgeEn: string;
  badgeBn: string;
  headlineEn: string;
  headlineBn: string;
  bodyBeforeAnchorEn: string;
  anchorTextEn: string;
  bodyAfterAnchorEn: string;
  bodyBeforeAnchorBn: string;
  anchorTextBn: string;
  bodyAfterAnchorBn: string;
  buttonLabelEn: string;
  buttonLabelBn: string;
}

export const RADICAL_STORAGE_BLOG_PLACEMENTS: Record<string, RadicalStorageBlogPlacement> = {
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    badgeEn: "🧳 MUSEUM SECURITY & BAG-DROP RULE",
    badgeBn: "🧳 মিউজিয়াম সিকিউরিটি ও ব্যাগ স্টোরেজ নিয়ম",
    headlineEn: "Visiting the Louvre, Eiffel Tower, Colosseum, or London Eye Before Your Flight?",
    headlineBn: "ফ্লাইট বা ট্রেনের আগে লুভর, আইফেল টাওয়ার, কলোসিয়াম বা লন্ডন আই ঘুরছেন?",
    bodyBeforeAnchorEn:
      "Security checkpoints at major European, UK, and US landmarks strictly refuse entry to visitors carrying cabin suitcases or large backpacks—even with a pre-booked timed-entry pass. If you have checked out of your hotel or are sightseeing during a rail/airport transfer, ",
    anchorTextEn:
      "reserve a verified Radical Storage luggage drop point near Paris, London, Rome, Milan, or NYC stations",
    bodyAfterAnchorEn:
      " (from ~€5/day per bag with up to €3,000 security guarantee) so you never miss your timed entry slot.",
    bodyBeforeAnchorBn:
      "প্যারিসের লুভর, আইফেল টাওয়ার, রোমের কলোসিয়াম বা লন্ডনের প্রধান দর্শনীয় স্থানগুলোতে বড় ব্যাকপ্যাক বা কেবিন স্যুটকেস নিয়ে প্রবেশ সম্পূর্ণ নিষিদ্ধ। হোটেল চেক-আউটের পর বা ট্রানজিটের সময় ঘোরার আগে ",
    anchorTextBn:
      "Radical Storage-এর ভেরিফায়েড লাগেজ পয়েন্টে (~€5/দিন, €3,000 পর্যন্ত ইনস্যুরেন্সসহ) আপনার ব্যাগ জমা রাখুন",
    bodyAfterAnchorBn:
      " এবং নিশ্চিন্তে স্কিপ-দ্য-লাইন পাসে মিউজিয়ামে প্রবেশ করুন।",
    buttonLabelEn: "Find Luggage Storage Near Museums & Stations",
    buttonLabelBn: "মিউজিয়াম ও স্টেশনের কাছে লাগেজ স্টোরেজ খুঁজুন"
  },
  "hotel-savings-guide-bangkok-kl-dubai": {
    badgeEn: "🧳 12:00 PM CHECK-OUT VS. LATE-NIGHT DHAKA FLIGHT TIP",
    badgeBn: "🧳 দুপুর ১২টায় হোটেল চেক-আউট বনাম রাতের ঢাকা ফ্লাইট টিপস",
    headlineEn: "Staying in a KLCC Serviced Apartment or Budget Hotel Without a Bellhop?",
    headlineBn: "সার্ভিসড অ্যাপার্টমেন্ট বা বাজেট হোটেলে চেক-আউটের পর লাগেজ কোথায় রাখবেন?",
    bodyBeforeAnchorEn:
      "Most return flights to Dhaka (DAC) from Bangkok, Kuala Lumpur, and Dubai depart late at night (9:00 PM – 1:30 AM), while serviced apartments and budget hotels enforce a strict 11:00 AM–12:00 PM check-out and often do not store bags. Instead of paying for an extra hotel night just to hold suitcases, ",
    anchorTextEn:
      "drop your bags at an insured Radical Storage partner hotel or shop near Pratunam, Bukit Bintang, KL Sentral, or Dubai Metro",
    bodyAfterAnchorEn:
      " and enjoy 6–8 hours of hands-free final-day shopping and halal dining.",
    bodyBeforeAnchorBn:
      "ব্যাংকক, কুয়ালালামপুর ও দুবাই থেকে ঢাকার (DAC) অধিকাংশ ফিরতি ফ্লাইট ছাড়ে গভীর রাতে, অথচ সার্ভিসড অ্যাপার্টমেন্ট ও বাজেট হোটেলগুলোতে দুপুর ১২টায় চেক-আউটের পর ফ্রি লাগেজ রাখার ব্যবস্থা থাকে না। শুধু ব্যাগ রাখার জন্য অতিরিক্ত ১ রাতের হোটেল ভাড়া না দিয়ে ",
    anchorTextBn:
      "Pratunam, Bukit Bintang, KL Sentral বা Dubai Metro-এর পাশে Radical Storage-এ স্যুটকেস জমা রাখুন",
    bodyAfterAnchorBn:
      " এবং শেষ বিকেলে হাত খালি রেখে শপিং ও ডিনার শেষ করে এয়ারপোর্টে যান।",
    buttonLabelEn: "Check Luggage Storage in Bangkok, KL & Dubai",
    buttonLabelBn: "Bangkok, KL ও Dubai লাগেজ স্টোরেজ দেখুন"
  },
  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": {
    badgeEn: "🧳 DAY 4 MUSTAFA CENTRE SHOPPING & LATE FLIGHT TIP",
    badgeBn: "🧳 ৪র্থ দিন Mustafa Centre শপিং ও লাগেজ টিপস",
    headlineEn: "Shopping at Mustafa Centre or Bugis After 11:00 AM Hotel Check-Out?",
    headlineBn: "হোটেল চেক-আউটের পর Mustafa Centre বা Bugis-এ শেষ মুহূর্তের শপিং করছেন?",
    bodyBeforeAnchorEn:
      "Navigating Mustafa Centre's crowded aisles or riding the MRT to Marina Bay with heavy family suitcases after morning hotel check-out is exhausting. Before your evening flight from Changi Airport, ",
    anchorTextEn:
      "book an insured Radical Storage luggage drop near Little India, Bugis, or Lavender MRT station",
    bodyAfterAnchorEn:
      " so your family can shop, pray at Masjid Sultan, and dine hands-free before heading to the airport.",
    bodyBeforeAnchorBn:
      "সকালে হোটেল চেক-আউট করার পর ভারী স্যুটকেস টেনে Mustafa Centre-এ শপিং করা বা MRT-তে চড়া বেশ কষ্টকর। চাঙ্গি এয়ারপোর্টে যাওয়ার আগে ",
    anchorTextBn:
      "Little India, Bugis বা MRT স্টেশনের কাছে ভেরিফায়েড Radical Storage পয়েন্টে ব্যাগ জমা রাখুন",
    bodyAfterAnchorBn:
      " এবং হাত খালি রেখে আরামে শেষ দিনের কেনাকাটা ও খাওয়া-দাওয়া শেষ করুন।",
    buttonLabelEn: "Book Singapore MRT & Little India Bag Storage",
    buttonLabelBn: "সিঙ্গাপুরে লাগেজ স্টোরেজ লোকেশন দেখুন"
  },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    badgeEn: "🧳 FINAL-DAY ABU DHABI STOP & CHECK-OUT LOGISTICS",
    badgeBn: "🧳 শেষ দিনে আবুধাবি ডে-ট্রিপ ও লাগেজ স্টোরেজ টিপস",
    headlineEn: "Doing Your Abu Dhabi Day Trip After Checking Out of Your Dubai Hotel?",
    headlineBn: "দুবাই হোটেল চেক-আউট করে কি সরাসরি আবুধাবি ডে-ট্রিপে যাচ্ছেন?",
    bodyBeforeAnchorEn:
      "Sheikh Zayed Grand Mosque and Qasr Al Watan security scanners do not allow visitors to bring rolling suitcases into the prayer halls or palace galleries. If you are visiting Abu Dhabi on your last day in the UAE, ",
    anchorTextEn:
      "leave your suitcases at a Radical Storage point near Ibn Battuta, Al Ghubaiba, or central Abu Dhabi",
    bodyAfterAnchorEn:
      " before boarding the E100/E101 intercity bus so you can tour the mosque and palace stress-free.",
    bodyBeforeAnchorBn:
      "শেখ জায়েদ গ্র্যান্ড মসজিদ এবং কাসর আল ওয়াতান প্রাসাদের সিকিউরিটি গেটে ট্রলি ব্যাগ বা বড় স্যুটকেস নিয়ে প্রবেশ করা যায় না। আপনি যদি সফরের শেষ দিনে হোটেল ছেড়ে আবুধাবি যান, তবে বাসে ওঠার আগে ",
    anchorTextBn:
      "Ibn Battuta, Al Ghubaiba বা আবুধাবি বাস স্টেশনের কাছে Radical Storage-এ লাগেজ জমা রাখুন",
    bodyAfterAnchorBn:
      " এবং নিশ্চিন্তে মসজিদ ও প্রাসাদ পরিদর্শন করুন।",
    buttonLabelEn: "Find Dubai & Abu Dhabi Luggage Storage",
    buttonLabelBn: "দুবাই ও আবুধাবি লাগেজ স্টোরেজ দেখুন"
  },
  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    badgeEn: "🧳 COLOMBO TRANSIT LAYOVER & TRAIN BAGGAGE TIP",
    badgeBn: "🧳 কলম্বো ট্রানজিট ও ক্যান্ডি ট্রেন ভ্রমণে লাগেজ টিপস",
    headlineEn: "Sightseeing in Colombo on a Transit Layover or Boarding the Ella Scenic Train?",
    headlineBn: "কলম্বো ট্রানজিট লে-ওভারে বা ক্যান্ডি-এলা ট্রেনে ভ্রমণের সময় ভারী ব্যাগ কোথায় রাখবেন?",
    bodyBeforeAnchorEn:
      "Whether you have an 8-hour daytime transit layover in Colombo before flying to Malé/Dhaka or want to travel light on the crowded Kandy-to-Ella scenic mountain train, ",
    anchorTextEn:
      "store heavy suitcases safely with Radical Storage in Colombo or Kandy",
    bodyAfterAnchorEn:
      " and carry only a light daypack for your coastal or hill-country excursion.",
    bodyBeforeAnchorBn:
      "ঢাকা–মালে ফ্লাইটে কলম্বোতে ৮–১০ ঘণ্টার ট্রানজিট লে-ওভারে শহর ঘুরতে চাইলে কিংবা ভিড়যুক্ত ক্যান্ডি-টু-এলা পাহাড়ি ট্রেনে হালকা ব্যাগ নিয়ে উঠতে চাইলে ",
    anchorTextBn:
      "কলম্বো বা ক্যান্ডির ভেরিফায়েড Radical Storage পয়েন্টে বড় স্যুটকেস জমা রাখুন",
    bodyAfterAnchorBn:
      " এবং শুধু ছোট ডে-প্যাক সাথে নিয়ে স্বাচ্ছন্দ্যে ভ্রমণ করুন।",
    buttonLabelEn: "Check Luggage Storage in Colombo & Transit Cities",
    buttonLabelBn: "কলম্বো ও ট্রানজিট সিটিতে লাগেজ স্টোরেজ দেখুন"
  }
};

export function LoadingSkeleton({ minHeight = 220, label }: { minHeight?: number; label: string }) {
  return (
    <div
      className="w-full flex flex-col justify-between p-5 bg-slate-50/80 border border-slate-200/60 rounded-xl animate-pulse"
      style={{ minHeight }}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-5/6" />
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-slate-200/40">
        <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
        <span className="text-[11px] font-mono tracking-tight font-medium text-slate-500">
          {label}
        </span>
      </div>
    </div>
  );
}

/* Generic script-injecting widget shell — mirrors the existing
   TravelpayoutsEmbed.tsx pattern already used for Aviasales in this project. */
function ScriptWidget({
  src,
  minHeight = 220,
  loadingLabel,
  fallbackUrl,
  fallbackText
}: {
  src: string;
  minHeight?: number;
  loadingLabel: string;
  fallbackUrl: string;
  fallbackText: string;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptContainerRef.current) return;
    scriptContainerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = src;
    script.charset = "utf-8";
    script.async = true;
    
    script.onload = () => setStatus("loaded");
    script.onerror = () => setStatus("failed");
    
    const timer = setTimeout(() => {
      setStatus(prev => prev === "loading" ? "failed" : prev);
    }, 4500);

    scriptContainerRef.current.appendChild(script);

    return () => {
      clearTimeout(timer);
    };
  }, [src]);

  return (
    <div
      className="w-full bg-white rounded-lg p-2 overflow-hidden"
      style={{ minHeight }}
    >
      {status === "failed" && (
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center space-y-3">
          <span className="text-xs text-slate-500 font-mono">This interactive tool is taking longer than expected to load.</span>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {fallbackText} <ExternalLink size={12} />
          </a>
        </div>
      )}

      {status === "loading" && (
        <LoadingSkeleton minHeight={minHeight - 20} label={loadingLabel} />
      )}

      <div 
        ref={scriptContainerRef} 
        style={{ display: status === "loaded" ? "block" : "none" }}
      />
    </div>
  );
}

/* 02. Klook — Activities & Things To Do widget */
export function KlookActivitiesWidget() {
  return <KlookEmbed />;
}

/* 04. Kiwitaxi — Airport Transfers / Shuttles widget */
export function KiwitaxiTransferWidget() {
  return <KiwitaxiEmbed />;
}

/* 04b. Welcome Pickups — Arrival Gate Meet-and-Greet Airport Transfers widget */
export function WelcomePickupsWidget({ defaultCountry }: { defaultCountry?: string }) {
  return <WelcomePickupsEmbed defaultCountry={defaultCountry} />;
}

/* 05. Airalo — eSIM / connectivity widget */
export function AiraloEsimWidget() {
  return <AiraloEmbed />;
}

/* 06. QEEQ — Car Rental widget */
export function QeeqCarRentalWidget() {
  return <QeeqEmbed />;
}


/* Styled outbound link button — used for KKday, Radical Storage, and as a
   fallback/secondary CTA next to any widget above. Automatically resolves
   any paused partner URL to its active permanent fallback partner. */
export function PartnerLinkButton({
  href,
  label,
  variant = "light"
}: {
  href: string;
  label: string;
  variant?: "light" | "dark";
}) {
  const resolvedHref = resolvePartnerUrl(href);

  const handleClick = () => {
    // 1. Log analytics tracking event to console
    console.log(`[Affiliate Partner Click] Label: "${label}" | URL: ${resolvedHref} | Timestamp: ${new Date().toISOString()}`);

    // 2. Push event to standard web dataLayer if present
    if (typeof window !== "undefined") {
      const dataLayer = (window as any).dataLayer || [];
      dataLayer.push({
        event: "affiliate_partner_click",
        partner_label: label,
        partner_url: resolvedHref,
        timestamp: new Date().toISOString()
      });
      (window as any).dataLayer = dataLayer;
    }
  };

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={
        variant === "dark"
          ? "inline-flex items-center gap-1.5 bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          : "inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] text-brand-navy font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
      }
    >
      {label} <ExternalLink size={12} />
    </a>
  );
}

/**
 * Contextual Luggage Storage Callout for matching blog posts & attraction pages.
 * Includes both an inline keyword anchor link and a primary CTA button.
 * If `radicalStorage` is ever set to `status: "paused"` in `AFFILIATE_OFFER_REGISTRY`,
 * the anchor and button automatically fall back to the active permanent partner URL.
 */
export function RadicalStorageContextualCallout({
  slug,
  lang = "en"
}: {
  slug: string;
  lang?: "en" | "bn";
}) {
  const placement = RADICAL_STORAGE_BLOG_PLACEMENTS[slug];
  if (!placement) return null;

  const isBn = lang === "bn";
  const resolvedHref = resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage);
  const isPaused = AFFILIATE_OFFER_REGISTRY.radicalStorage.status === "paused";

  return (
    <aside
      aria-label={isBn ? "লাগেজ স্টোরেজ ও চেক-আউট লজিস্টিকস টিপস" : "Luggage Storage & Check-Out Logistics Tip"}
      className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-3 text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-navy text-[#F6B73C] px-2.5 py-1 rounded-md">
          {isBn ? placement.badgeBn : placement.badgeEn}
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          {isBn ? "৩,০০০+ ভেরিফায়েড লাগেজ পয়েন্ট · €3,000 ইনস্যুরেন্স" : "Verified Bag Drop Network · Insured up to €3,000"}
        </span>
      </div>

      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy leading-snug">
        {isBn ? placement.headlineBn : placement.headlineEn}
      </h3>

      <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">
        {isBn ? placement.bodyBeforeAnchorBn : placement.bodyBeforeAnchorEn}
        {isPaused ? (
          <span className="font-semibold text-brand-navy">
            {isBn ? placement.anchorTextBn : placement.anchorTextEn}
          </span>
        ) : (
          <a
            href={resolvedHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="font-semibold text-brand-navy underline decoration-[#F6B73C] decoration-2 underline-offset-2 hover:text-amber-700"
          >
            {isBn ? placement.anchorTextBn : placement.anchorTextEn}
          </a>
        )}
        {isBn ? placement.bodyAfterAnchorBn : placement.bodyAfterAnchorEn}
      </p>

      <div className="pt-1 flex flex-wrap items-center gap-3">
        <PartnerLinkButton
          href={AFFILIATE_LINKS.radicalStorage}
          label={
            isPaused
              ? isBn
                ? "ট্যুর ও ট্রান্সফার পাস দেখুন"
                : "Browse City Passes & Transfers"
              : isBn
              ? placement.buttonLabelBn
              : placement.buttonLabelEn
          }
          variant="dark"
        />
        <span className="text-[11px] text-slate-500 font-mono">
          {isBn
            ? "ডুয়াল-কারেন্সি কার্ডে তাৎক্ষণিক অনলাইন বুকিং · ফ্রি ক্যান্সেলেশন"
            : "Instant online QR booking with BD Dual-Currency Card · Free cancellation"}
        </span>
      </div>
    </aside>
  );
}
