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
  radicalStorage: "https://radicalstorage.tpo.li/7I3EWiUg",
  ekta: "https://ektatraveling.tpo.li/vl11DEG6",
  yesim: "https://yesim.tpo.li/O8Zvqr73",
  kiwi: "https://kiwi.tpo.li/9isVGzpF",
  getTransfer: "https://gettransfer.tpo.li/sekWRAM1",
  goCity: "https://gocity.tpo.li/rpHETE4N"
};

export type AffiliatePartnerKey = keyof typeof AFFILIATE_LINKS;

/**
 * Travelpayouts CREATOR REFERRAL link (marker=675992).
 * ⚠️ This is NOT a travel-booking affiliate link. It refers other travel
 * creators/publishers to the Travelpayouts platform (referral program:
 * https://www.travelpayouts.com/?marker=675992). It must only appear inside the
 * transparent "For Travel Creators & Bloggers" block (see
 * TRAVELPAYOUTS_REFERRAL_BLOG_PLACEMENTS) — never disguised as a flight or
 * hotel booking link. Booking CTAs always use the partner URLs above.
 */
export const TRAVELPAYOUTS_REFERRAL_URL = "https://www.travelpayouts.com/?marker=675992";

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

export const KLOOK_PROMO = {
  affiliateUrl: "https://klook.tpo.li/IYOU76Bn",
  partnerName: "Klook Hotels, Tours & Activities",
  toursAndActivitiesRate: "10%",
  hotelsRate: "8%",
  validUntil: "December 31, 2026",
  expiresAt: "2026-12-31",
  categories: "Global Hotels & Resorts (8%), Tours & Sightseeing (10%), Activities & Experiences (10%)"
};

export const GO_CITY_PROMO = {
  affiliateUrl: "https://gocity.tpo.li/rpHETE4N",
  partnerName: "Go City All-Inclusive & Explorer Passes",
  allInclusiveRate: "8.5%",
  explorerRate: "8.5%",
  validUntil: "December 31, 2026",
  expiresAt: "2026-12-31",
  eligiblePasses: "All-Inclusive Pass (AI) & Explorer Pass (EXP)"
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
    fallbackPartner: "kiwi",
    activeNote: "Core flight metasearch engine (40% rev share, Web & App)",
    expiredFallbackBehavior: "Falls back to Kiwi.com if ever paused"
  },
  klook: {
    id: "klook",
    partnerName: "Klook Hotels, Tours & Activities",
    status: "active",
    offerType: "commission-boost",
    url: AFFILIATE_LINKS.klook,
    fallbackPartner: "kkday",
    expiresAt: KLOOK_PROMO.expiresAt,
    activeNote: `Boosted Q4 Commission through ${KLOOK_PROMO.validUntil}: 10% Tours/Activities + 8% Hotels (Web & App)`,
    expiredFallbackBehavior: "Keeps permanent Klook Hotels & Activities link live after Dec 31, 2026; falls back to KKday if ever paused"
  },
  tiqets: {
    id: "tiqets",
    partnerName: "Tiqets Skip-the-Line Museums",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.tiqets,
    fallbackPartner: "goCity",
    activeNote: "Core Europe, UK & USA museum pass partner (Web & App)",
    expiredFallbackBehavior: "Falls back to Go City if ever paused"
  },
  airhelp: {
    id: "airhelp",
    partnerName: "AirHelp (€600 Claim + AirHelp+)",
    status: "active",
    offerType: "customer-promo",
    url: AFFILIATE_LINKS.airhelp,
    fallbackPartner: "ekta",
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
    fallbackPartner: "getTransfer",
    activeNote: "Core private airport transfer partner (9–11% reward)",
    expiredFallbackBehavior: "Falls back to GetTransfer.com if ever paused"
  },
  welcomePickups: {
    id: "welcomePickups",
    partnerName: "Welcome Pickups",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.welcomePickups,
    fallbackPartner: "getTransfer",
    activeNote: "Meet-and-greet airport transfer partner (8–9% reward, 45d cookie)",
    expiredFallbackBehavior: "Falls back to GetTransfer.com if ever paused"
  },
  airalo: {
    id: "airalo",
    partnerName: "Airalo Travel eSIM",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.airalo,
    fallbackPartner: "yesim",
    activeNote: "Core 200+ country travel eSIM partner (12% reward)",
    expiredFallbackBehavior: "Falls back to Yesim eSIM if ever paused"
  },
  qeeq: {
    id: "qeeq",
    partnerName: "QEEQ Car Rental",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.qeeq,
    fallbackPartner: "getTransfer",
    activeNote: "International car rental comparison (5–10% reward)",
    expiredFallbackBehavior: "Falls back to GetTransfer.com if ever paused"
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
  },
  ekta: {
    id: "ekta",
    partnerName: "EKTA Travel Medical Insurance",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.ekta,
    fallbackPartner: "airhelp",
    activeNote: "25% commission · Schengen €30k, Thailand e-Visa & Senior Umrah policies",
    expiredFallbackBehavior: "Falls back to AirHelp if ever paused"
  },
  yesim: {
    id: "yesim",
    partnerName: "Yesim Travel eSIM (App + Web)",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.yesim,
    fallbackPartner: "airalo",
    activeNote: "18% commission · 90-day cookie · Tracks Mobile Web & App installs",
    expiredFallbackBehavior: "Falls back to Airalo eSIM if ever paused"
  },
  kiwi: {
    id: "kiwi",
    partnerName: "Kiwi.com Multi-City & Virtual Interlining",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.kiwi,
    fallbackPartner: "aviasales",
    activeNote: "3% commission · 30-day cookie · Multi-city & self-transfer flight hacks",
    expiredFallbackBehavior: "Falls back to Aviasales if ever paused"
  },
  getTransfer: {
    id: "getTransfer",
    partnerName: "GetTransfer.com Intercity Vans & Transfers",
    status: "active",
    offerType: "evergreen",
    url: AFFILIATE_LINKS.getTransfer,
    fallbackPartner: "kiwitaxi",
    activeNote: "4–25% commission · Tracks Mobile Web & App · Driver bidding for family vans",
    expiredFallbackBehavior: "Falls back to Kiwitaxi if ever paused"
  },
  goCity: {
    id: "goCity",
    partnerName: "Go City All-Inclusive & Explorer Passes",
    status: "active",
    offerType: "commission-boost",
    url: AFFILIATE_LINKS.goCity,
    fallbackPartner: "tiqets",
    expiresAt: GO_CITY_PROMO.expiresAt,
    activeNote: `Boosted 8.5% Commission on All-Inclusive & Explorer Passes through ${GO_CITY_PROMO.validUntil} · 90-day cookie`,
    expiredFallbackBehavior: "Keeps permanent Go City All-Inclusive & Explorer Pass link live after Dec 31, 2026; falls back to Tiqets if ever paused"
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
    // 1. Log analytics tracking event to console (development only — never ships to production)
    if (import.meta.env.DEV) {
      console.log(`[Affiliate Partner Click] Label: "${label}" | URL: ${resolvedHref} | Timestamp: ${new Date().toISOString()}`);
    }

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

export interface MultiPartnerBlogPlacement {
  primaryPartner: AffiliatePartnerKey;
  secondaryPartner?: AffiliatePartnerKey;
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
  primaryButtonEn: string;
  primaryButtonBn: string;
  secondaryButtonEn?: string;
  secondaryButtonBn?: string;
}

export const MULTI_PARTNER_BLOG_PLACEMENTS: Record<string, MultiPartnerBlogPlacement> = {
  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": {
    primaryPartner: "ekta",
    secondaryPartner: "yesim",
    badgeEn: "🛡️ EMBASSY VISA INSURANCE + MOBILE APP ESIM",
    badgeBn: "🛡️ ভিসা ইনস্যুরেন্স (EKTA) + মোবাইল অ্যাপ eSIM (Yesim)",
    headlineEn: "Need an Instant English Travel Insurance PDF for Your Visa or an App-Based eSIM?",
    headlineBn: "ভিসার জন্য তাৎক্ষণিক ইংরেজি ইনস্যুরেন্স PDF বা আনলিমিটেড ট্রাভেল eSIM প্রয়োজন?",
    bodyBeforeAnchorEn:
      "For Schengen Europe (€30,000 coverage), Thailand e-Visa (thaievisa.go.th), Malaysia, and senior Umrah pilgrims, you can ",
    anchorTextEn:
      "download an official EKTA Travel Medical Insurance policy online in 2 minutes (from $0.99/day)",
    bodyAfterAnchorEn:
      " and pair it with a Yesim Travel eSIM (supports both iOS/Android App & web activation while keeping your Bangladeshi SIM active for free banking OTPs).",
    bodyBeforeAnchorBn:
      "শেনজেন ইউরোপ (€30,000 কভারেজ), থাইল্যান্ড ই-ভিসা, মালয়েশিয়া ও বয়স্ক ওমরাহ যাত্রীদের জন্য ",
    anchorTextBn:
      "মাত্র ২ মিনিটে EKTA থেকে অফিশিয়াল ইংরেজি Travel Medical Insurance PDF ($0.99/দিন থেকে) ডাউনলোড করুন",
    bodyAfterAnchorBn:
      " এবং ব্যাংকের OTP সচল রেখে দ্রুত ইন্টারনেটের জন্য Yesim Travel eSIM অ্যাপ ব্যবহার করুন।",
    primaryButtonEn: "Get EKTA Travel Insurance ($0.99/day)",
    primaryButtonBn: "EKTA ট্রাভেল ইনস্যুরেন্স নিন ($0.99/দিন)",
    secondaryButtonEn: "Compare Yesim App eSIM Plans",
    secondaryButtonBn: "Yesim eSIM প্ল্যান দেখুন"
  },
  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": {
    primaryPartner: "ekta",
    secondaryPartner: "yesim",
    badgeEn: "🛡️ THAIEVISA.GO.TH INSURANCE & CONNECTIVITY",
    badgeBn: "🛡️ থাইল্যান্ড ই-ভিসা ইনস্যুরেন্স ও কানেক্টিভিটি",
    headlineEn: "Uploading Supporting Documents on thaievisa.go.th? Add Verifiable Travel Insurance",
    headlineBn: "thaievisa.go.th পোর্টালে ডকুমেন্ট আপলোড করছেন? ভেরিফায়েড ট্রাভেল ইনস্যুরেন্স যুক্ত করুন",
    bodyBeforeAnchorEn:
      "Strengthen your Thailand e-Visa application and protect your family against hospital bills or flight delays in Bangkok and Phuket: ",
    anchorTextEn:
      "get an instant English PDF policy from EKTA Travel Insurance (from $0.99/day)",
    bodyAfterAnchorEn:
      " and pre-install a Yesim Thailand eSIM before flying from Dhaka.",
    bodyBeforeAnchorBn:
      "থাইল্যান্ড ই-ভিসা আবেদন শক্তিশালী করতে এবং ব্যাংকক/ফুকেটে চিকিৎসা ও ফ্লাইট বিলম্বের ঝুঁকি এড়াতে ",
    anchorTextBn:
      "EKTA থেকে তাৎক্ষণিক ইংরেজি Travel Insurance PDF পলিসি নিন",
    bodyAfterAnchorBn:
      " এবং দেশ ছাড়ার আগেই Yesim Thailand eSIM ইনস্টল করে নিন।",
    primaryButtonEn: "Download EKTA Thailand Visa Insurance",
    primaryButtonBn: "EKTA থাইল্যান্ড ভিসা ইনস্যুরেন্স নিন",
    secondaryButtonEn: "Get Yesim Thailand eSIM",
    secondaryButtonBn: "Yesim থাইল্যান্ড eSIM নিন"
  },
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    primaryPartner: "ekta",
    secondaryPartner: "getTransfer",
    badgeEn: "🛡️ SENIOR UMRAH MEDICAL INSURANCE & PRIVATE FAMILY VANS",
    badgeBn: "🛡️ বয়স্ক বাবা-মায়ের ওমরাহ ইনস্যুরেন্স ও প্রাইভেট ভ্যান",
    headlineEn: "Traveling with Parents Aged 60+? Protect Their Health & Book Door-to-Door Haramain Vans",
    headlineBn: "৬০+ বছর বয়সী বাবা-মাকে নিয়ে ওমরাহ যাচ্ছেন? সিনিয়র ইনস্যুরেন্স ও প্রাইভেট গাড়ি নিশ্চিত করুন",
    bodyBeforeAnchorEn:
      "Standard visa medical cover does not reimburse flight delays, lost wheelchairs/luggage, or extended clinic care. Before flying from Dhaka, ",
    anchorTextEn:
      "secure an EKTA Senior Travel & Medical Insurance policy (covers travelers up to age 85+)",
    bodyAfterAnchorEn:
      " and book a spacious GMC Yukon or Toyota HiAce directly to your Makkah hotel door via GetTransfer.",
    bodyBeforeAnchorBn:
      "বয়স্ক বাবা-মায়ের ফ্লাইট ডিলে, হারানো লাগেজ বা জরুরি চিকিৎসার ঝুঁকি এড়াতে ঢাকা ছাড়ার আগেই ",
    anchorTextBn:
      "EKTA Senior Travel & Medical Insurance পলিসি নিন",
    bodyAfterAnchorBn:
      " এবং জেদ্দা এয়ারপোর্ট থেকে সরাসরি মক্কার হোটেলের গেটে যেতে GetTransfer-এ প্রাইভেট GMC/HiAce বুক করুন।",
    primaryButtonEn: "Get EKTA Senior Medical Insurance",
    primaryButtonBn: "EKTA সিনিয়র মেডিকেল ইনস্যুরেন্স নিন",
    secondaryButtonEn: "Book Family Van on GetTransfer",
    secondaryButtonBn: "GetTransfer-এ প্রাইভেট গাড়ি বুক করুন"
  },
  "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": {
    primaryPartner: "ekta",
    secondaryPartner: "getTransfer",
    badgeEn: "🏥 BANGKOK MEDICAL TRIP INSURANCE & HOSPITAL PICKUP",
    badgeBn: "🏥 ব্যাংকক মেডিকেল ট্রিপ ইনস্যুরেন্স ও হাসপাতাল পিকআপ",
    headlineEn: "Flying from Dhaka to Bumrungrad or Bangkok Hospital? Book Private Airport-to-Clinic Pickup",
    headlineBn: "বামরুনগ্রাদ বা ব্যাংকক হাসপাতালে যাচ্ছেন? প্রাইভেট পিকআপ ও ট্রাভেল ইনস্যুরেন্স নিন",
    bodyBeforeAnchorEn:
      "Avoid standing in Suvarnabhumi taxi queues with a patient after landing: ",
    anchorTextEn:
      "pre-book a private wheelchair-friendly sedan or van to Sukhumvit Soi 3 on GetTransfer",
    bodyAfterAnchorEn:
      " and protect accompanying family members with an EKTA Thailand Travel Insurance policy.",
    bodyBeforeAnchorBn:
      "রোগী নিয়ে সুবর্ণভূমি এয়ারপোর্টে ট্যাক্সির লাইনে না দাঁড়িয়ে ",
    anchorTextBn:
      "GetTransfer-এ সরাসরি বামরুনগ্রাদ বা সুখুমভিত হোটেলে যাওয়ার প্রাইভেট গাড়ি প্রি-বুক করুন",
    bodyAfterAnchorBn:
      " এবং সফরসঙ্গীদের জন্য EKTA ট্রাভেল ইনস্যুরেন্স সাথে রাখুন।",
    primaryButtonEn: "Get EKTA Travel Insurance",
    primaryButtonBn: "EKTA ট্রাভেল ইনস্যুরেন্স নিন",
    secondaryButtonEn: "Book Airport-to-Hospital Pickup (GetTransfer)",
    secondaryButtonBn: "GetTransfer প্রাইভেট পিকআপ বুক করুন"
  },
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    primaryPartner: "getTransfer",
    secondaryPartner: "yesim",
    badgeEn: "🚐 PRIVATE ZIYARAH VAN BIDDING & SAUDI ESIM",
    badgeBn: "🚐 প্রাইভেট জিয়ারাহ ভ্যান (GetTransfer) ও সৌদি eSIM",
    headlineEn: "Compare Local Driver Bids for Makkah, Madinah, Badr & Taif Ziyarah Tours",
    headlineBn: "মক্কা, মদিনা, বদর ও তায়েফ জিয়ারাহর জন্য প্রাইভেট Camry, Staria ও HiAce ভাড়া তুলনা করুন",
    bodyBeforeAnchorEn:
      "Instead of haggling with street taxis outside the Clock Tower in 40°C heat, ",
    anchorTextEn:
      "request competitive driver bids for a private sedan, Hyundai Staria, or Toyota HiAce on GetTransfer.com",
    bodyAfterAnchorEn:
      " with vehicle photos and ratings upfront—and stay connected on WhatsApp with a Yesim Saudi Arabia eSIM.",
    bodyBeforeAnchorBn:
      "মক্কা ক্লক টাওয়ারের বাইরে রোদে দাঁড়িয়ে ট্যাক্সি চালকদের সাথে দরদাম না করে ",
    anchorTextBn:
      "GetTransfer.com-এ গাড়ির ছবি ও ড্রাইভার রেটিং দেখে প্রাইভেট জিয়ারাহ ভ্যান বা কার বুক করুন",
    bodyAfterAnchorBn:
      " এবং ড্রাইভারের সাথে WhatsApp-এ যোগাযোগ রাখতে Yesim Saudi eSIM ব্যবহার করুন।",
    primaryButtonEn: "Compare Ziyarah Van Bids on GetTransfer",
    primaryButtonBn: "GetTransfer-এ জিয়ারাহ গাড়ির ভাড়া দেখুন",
    secondaryButtonEn: "Get Yesim Saudi Arabia eSIM",
    secondaryButtonBn: "Yesim সৌদি eSIM নিন"
  },
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    primaryPartner: "getTransfer",
    secondaryPartner: "ekta",
    badgeEn: "🚐 JEDDAH AIRPORT TO MAKKAH HOTEL DOOR TRANSFER",
    badgeBn: "🚐 জেদ্দা এয়ারপোর্ট থেকে মক্কা হোটেল প্রাইভেট ট্রান্সফার",
    headlineEn: "Arriving at Jeddah Terminal 1 or North Terminal with Family Luggage?",
    headlineBn: "পরিবার ও বড় লাগেজ নিয়ে জেদ্দা এয়ারপোর্টে নামছেন?",
    bodyBeforeAnchorEn:
      "Haramain High-Speed Train strictly limits suitcase dimensions. If your family is carrying 4–6 large suitcases and Zamzam cartons, ",
    anchorTextEn:
      "compare private GMC Yukon, Hyundai Staria, and HiAce transfers from Jeddah Airport to your Makkah hotel on GetTransfer",
    bodyAfterAnchorEn:
      " for seamless door-to-door pickup.",
    bodyBeforeAnchorBn:
      "হারামাইন ট্রেনে বড় স্যুটকেস নেওয়ার কড়াকড়ি রয়েছে। পরিবারের সবার লাগেজ নিয়ে নির্বিঘ্নে মক্কার হোটেলে পৌঁছাতে ",
    anchorTextBn:
      "GetTransfer-এ জেদ্দা এয়ারপোর্ট থেকে মক্কা ও মদিনার প্রাইভেট ভ্যান/কার ভাড়া তুলনা করুন",
    bodyAfterAnchorBn:
      " এবং সরাসরি হোটেলের গেটে নামুন।",
    primaryButtonEn: "Book Private Haramain Transfer (GetTransfer)",
    primaryButtonBn: "GetTransfer প্রাইভেট ট্রান্সফার বুক করুন",
    secondaryButtonEn: "EKTA Umrah Travel Insurance",
    secondaryButtonBn: "EKTA ওমরাহ ইনস্যুরেন্স"
  },
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": {
    primaryPartner: "kiwi",
    secondaryPartner: "goCity",
    badgeEn: "✈️ MULTI-CITY FLIGHT HACK + DUBAI ALL-INCLUSIVE & EXPLORER PASS",
    badgeBn: "✈️ মাল্টি-সিটি ফ্লাইট (Kiwi.com) + দুবাই পাস (Go City)",
    headlineEn: "Stitch Dhaka → Jeddah → Dubai → Dhaka Multi-City Fares & Save up to 50% with Go City All-Inclusive or Explorer Pass",
    headlineBn: "ঢাকা → জেদ্দা → দুবাই → ঢাকা মাল্টি-সিটি টিকিট ও Go City Dubai All-Inclusive/Explorer Pass-এ সাশ্রয় করুন",
    bodyBeforeAnchorEn:
      "Alongside Aviasales, use ",
    anchorTextEn:
      "Kiwi.com's Nomad & Multi-City virtual interlining engine to combine Saudi and UAE carriers on one itinerary",
    bodyAfterAnchorEn:
      "—and unlock Burj Khalifa, Desert Safari, and Louvre Abu Dhabi with a single Go City Dubai All-Inclusive or Explorer Pass.",
    bodyBeforeAnchorBn:
      "Aviasales-এর পাশাপাশি ",
    anchorTextBn:
      "Kiwi.com-এর Multi-City সার্চে ঢাকা → জেদ্দা → দুবাই → ঢাকা রুটের সবচেয়ে সাশ্রয়ী কম্বো টিকিট খুঁজুন",
    bodyAfterAnchorBn:
      " এবং দুবাইয়ের প্রধান আকর্ষণগুলোতে ৫০% পর্যন্ত বাঁচাতে Go City Dubai All-Inclusive বা Explorer Pass নিন।",
    primaryButtonEn: "Search Multi-City Combo on Kiwi.com",
    primaryButtonBn: "Kiwi.com-এ মাল্টি-সিটি ফ্লাইট খুঁজুন",
    secondaryButtonEn: "Get Go City Dubai All-Inclusive / Explorer Pass",
    secondaryButtonBn: "Go City Dubai All-Inclusive Pass দেখুন"
  },
  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    primaryPartner: "kiwi",
    secondaryPartner: "getTransfer",
    badgeEn: "✈️ MULTI-CITY COMBO FLIGHTS + SRI LANKA PRIVATE CAR",
    badgeBn: "✈️ মাল্টি-সিটি ফ্লাইট (Kiwi.com) + শ্রীলঙ্কা প্রাইভেট কার",
    headlineEn: "Compare Dhaka → Colombo → Malé → Dhaka Combo Tickets & Private Kandy/Nuwara Eliya Drivers",
    headlineBn: "ঢাকা → কলম্বো → মালে কম্বো ফ্লাইট এবং কলম্বো-ক্যান্ডি প্রাইভেট গাড়ি বুক করুন",
    bodyBeforeAnchorEn:
      "Check ",
    anchorTextEn:
      "Kiwi.com's Multi-City search to combine SriLankan Airlines, Biman, and US-Bangla segments on a single trip",
    bodyAfterAnchorEn:
      ", and book your air-conditioned Colombo → Kandy → Nuwara Eliya car or family van via GetTransfer.",
    bodyBeforeAnchorBn:
      "সাশ্রয়ী ভাড়ায় ২ দেশ ভ্রমণের জন্য ",
    anchorTextBn:
      "Kiwi.com-এ ঢাকা → কলম্বো → মালে → ঢাকা মাল্টি-সিটি ফ্লাইট তুলনা করুন",
    bodyAfterAnchorBn:
      " এবং কলম্বো থেকে ক্যান্ডি ও নুয়ারা এলিয়া ঘোরার প্রাইভেট গাড়ি GetTransfer-এ বুক করুন।",
    primaryButtonEn: "Search Combo Flights on Kiwi.com",
    primaryButtonBn: "Kiwi.com-এ কম্বো ফ্লাইট খুঁজুন",
    secondaryButtonEn: "Book Sri Lanka Car on GetTransfer",
    secondaryButtonBn: "GetTransfer-এ শ্রীলঙ্কা প্রাইভেট গাড়ি"
  },
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    primaryPartner: "kiwi",
    secondaryPartner: "getTransfer",
    badgeEn: "✈️ OPEN-JAW FLIGHT COMBINATIONS + HARAMAIN TRANSFERS",
    badgeBn: "✈️ ওপেন-জ ফ্লাইট সার্চ (Kiwi.com) ও প্রাইভেট ট্রান্সফার",
    headlineEn: "Compare Open-Jaw (Land Jeddah, Return Madinah) Combinations Across All Airlines",
    headlineBn: "জেদ্দায় নেমে মদিনা থেকে ফেরার (Open-Jaw) সেরা ফ্লাইট কম্বিনেশন খুঁজুন",
    bodyBeforeAnchorEn:
      "When single-airline return tickets are sold out, ",
    anchorTextEn:
      "search Kiwi.com to mix and match outbound Dhaka → Jeddah and return Madinah → Dhaka fares",
    bodyAfterAnchorEn:
      " and pre-book your private airport-to-Haram transfer on GetTransfer.",
    bodyBeforeAnchorBn:
      "একই এয়ারলাইন্সে সিট না পেলে ",
    anchorTextBn:
      "Kiwi.com-এ ঢাকা → জেদ্দা এবং মদিনা → ঢাকা ওপেন-জ ফ্লাইট কম্বিনেশন চেক করুন",
    bodyAfterAnchorBn:
      " এবং এয়ারপোর্ট থেকে হোটেলের প্রাইভেট গাড়ি GetTransfer-এ বুক করুন।",
    primaryButtonEn: "Search Open-Jaw Fares on Kiwi.com",
    primaryButtonBn: "Kiwi.com-এ ওপেন-জ ফ্লাইট দেখুন",
    secondaryButtonEn: "Compare Airport Transfers (GetTransfer)",
    secondaryButtonBn: "GetTransfer এয়ারপোর্ট পিকআপ"
  },
  "cheap-flight-booking-hacks-dhaka": {
    primaryPartner: "kiwi",
    secondaryPartner: "ekta",
    badgeEn: "✈️ VIRTUAL INTERLINING & SELF-TRANSFER FLIGHT HACKS",
    badgeBn: "✈️ মাল্টি-এয়ারলাইন কম্বো ফ্লাইট হ্যাক (Kiwi.com)",
    headlineEn: "Unlock Hidden Self-Transfer & Multi-Airline Combos from Dhaka on Kiwi.com",
    headlineBn: "Kiwi.com-এর মাধ্যমে ঢাকা থেকে লুকানো মাল্টি-এয়ারলাইন ও ট্রানজিট ডিল খুঁজুন",
    bodyBeforeAnchorEn:
      "In addition to checking Aviasales, smart Bangladeshi travelers ",
    anchorTextEn:
      "compare virtual-interlined and multi-city routes on Kiwi.com",
    bodyAfterAnchorEn:
      " to pair low-cost regional carriers with full-service airlines on a single itinerary.",
    bodyBeforeAnchorBn:
      "Aviasales-এ ভাড়া দেখার পাশাপাশি ",
    anchorTextBn:
      "Kiwi.com-এ ভিন্ন দুটি এয়ারলাইন্সের কানেক্টিং ও মাল্টি-সিটি ভাড়া তুলনা করুন",
    bodyAfterAnchorBn:
      " এবং ভিসা আবেদনের জন্য EKTA ট্রাভেল ইনস্যুরেন্স সংগ্রহে রাখুন।",
    primaryButtonEn: "Compare Flight Hacks on Kiwi.com",
    primaryButtonBn: "Kiwi.com-এ সস্তা ফ্লাইট খুঁজুন",
    secondaryButtonEn: "Get EKTA Visa Travel Insurance",
    secondaryButtonBn: "EKTA ভিসা ইনস্যুরেন্স নিন"
  },
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    primaryPartner: "goCity",
    secondaryPartner: "ekta",
    badgeEn: "🎟️ ALL-INCLUSIVE MULTI-ATTRACTION PASS (GO CITY) + SCHENGEN INSURANCE",
    badgeBn: "🎟️ অল-ইনক্লুসিভ সিটি পাস (Go City) + শেনজেন ইনস্যুরেন্স",
    headlineEn: "Visiting 3+ Landmarks in London, Paris, Rome, or New York? Save up to 50% with Go City",
    headlineBn: "লন্ডন, প্যারিস, রোম বা নিউ ইয়র্কে ৩টির বেশি দর্শনীয় স্থান ঘুরবেন? Go City Pass নিন",
    bodyBeforeAnchorEn:
      "While Tiqets is best for single museum tickets, travelers visiting multiple attractions in London, Paris, Rome, or New York can ",
    anchorTextEn:
      "bundle 3 to 10+ top landmarks on one Go City All-Inclusive or Explorer Pass to save up to 50%",
    bodyAfterAnchorEn:
      "—and download €30,000 Schengen-compliant medical insurance via EKTA.",
    bodyBeforeAnchorBn:
      "একক টিকিটের জন্য Tiqets সেরা হলেও লন্ডন, প্যারিস, রোম বা নিউ ইয়র্কে একাধিক জায়গা ঘুরতে ",
    anchorTextBn:
      "Go City All-Inclusive বা Explorer Pass নিয়ে এক পাসে ৫০% পর্যন্ত সাশ্রয় করুন",
    bodyAfterAnchorBn:
      " এবং শেনজেন ভিসার জন্য €30,000 কভারেজের EKTA ইনস্যুরেন্স ডাউনলোড করুন।",
    primaryButtonEn: "Explore Go City All-Inclusive Passes",
    primaryButtonBn: "Go City অল-ইনক্লুসিভ পাস দেখুন",
    secondaryButtonEn: "EKTA €30,000 Schengen Insurance",
    secondaryButtonBn: "EKTA শেনজেন ইনস্যুরেন্স"
  },
  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": {
    primaryPartner: "goCity",
    secondaryPartner: "yesim",
    badgeEn: "🎟️ GO CITY SINGAPORE PASS + YESIM ESIM",
    badgeBn: "🎟️ Go City সিঙ্গাপুর পাস + Yesim eSIM",
    headlineEn: "Bundling Gardens by the Bay, Sentosa Cable Car & Night Safari? Check Go City Singapore",
    headlineBn: "Gardens by the Bay, Sentosa ও Night Safari একসাথে ঘুরবেন? Go City পাস দেখুন",
    bodyBeforeAnchorEn:
      "If your family plans to visit 3 to 7 attractions across Marina Bay, Sentosa, and Mandai, ",
    anchorTextEn:
      "compare the Go City Singapore Explorer & All-Inclusive Pass",
    bodyAfterAnchorEn:
      " to cut gate admission costs by up to 45%—and stay connected on the MRT with a Yesim Singapore eSIM.",
    bodyBeforeAnchorBn:
      "সিঙ্গাপুরে ৩ থেকে ৭টি আকর্ষণ একসাথে ঘুরতে চাইলে ",
    anchorTextBn:
      "Go City Singapore Pass-এর মাধ্যমে টিকিট খরচে ৪৫% পর্যন্ত সাশ্রয় করুন",
    bodyAfterAnchorBn:
      " এবং MRT ও ম্যাপ ব্যবহারের জন্য Yesim Singapore eSIM সাথে রাখুন।",
    primaryButtonEn: "Check Go City Singapore Pass Deals",
    primaryButtonBn: "Go City সিঙ্গাপুর পাস দেখুন",
    secondaryButtonEn: "Get Yesim Singapore eSIM",
    secondaryButtonBn: "Yesim সিঙ্গাপুর eSIM নিন"
  },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    primaryPartner: "goCity",
    secondaryPartner: "getTransfer",
    badgeEn: "🎟️ DUBAI & ABU DHABI EXPLORER PASS + PRIVATE INTERCITY CAR",
    badgeBn: "🎟️ দুবাই ও আবুধাবি পাস (Go City) + প্রাইভেট গাড়ি",
    headlineEn: "Combining Louvre Abu Dhabi, Qasr Al Watan & Burj Khalifa? Save with Go City Dubai",
    headlineBn: "লুভর আবুধাবি, কাসর আল ওয়াতান ও বুর্জ খলিফা একসাথে দেখবেন? Go City Pass নিন",
    bodyBeforeAnchorEn:
      "Visitors combining Dubai and Abu Dhabi highlights can ",
    anchorTextEn:
      "bundle Louvre Abu Dhabi, Qasr Al Watan, Desert Safari, and Burj Khalifa on a single Go City Pass",
    bodyAfterAnchorEn:
      " or book a private door-to-door Dubai ↔ Abu Dhabi family car via GetTransfer.",
    bodyBeforeAnchorBn:
      "দুবাই ও আবুধাবির প্রধান আকর্ষণগুলো একসাথে ঘুরতে ",
    anchorTextBn:
      "Go City Pass নিয়ে এক পাসে সর্বোচ্চ ৫০% পর্যন্ত টিকিট খরচ বাঁচান",
    bodyAfterAnchorBn:
      " অথবা পরিবারের জন্য দুবাই থেকে আবুধাবি যাওয়ার প্রাইভেট গাড়ি GetTransfer-এ বুক করুন।",
    primaryButtonEn: "Browse Go City Dubai & Abu Dhabi Pass",
    primaryButtonBn: "Go City দুবাই ও আবুধাবি পাস দেখুন",
    secondaryButtonEn: "Book Private Dubai–Abu Dhabi Car (GetTransfer)",
    secondaryButtonBn: "GetTransfer প্রাইভেট গাড়ি বুক করুন"
  }
};

export function MultiPartnerBlogCallout({
  slug,
  lang = "en"
}: {
  slug: string;
  lang?: "en" | "bn";
}) {
  const placement = MULTI_PARTNER_BLOG_PLACEMENTS[slug];
  if (!placement) return null;

  const isBn = lang === "bn";
  const primaryHref = resolvePartnerUrl(AFFILIATE_LINKS[placement.primaryPartner]);
  const secondaryHref = placement.secondaryPartner
    ? resolvePartnerUrl(AFFILIATE_LINKS[placement.secondaryPartner])
    : undefined;

  return (
    <aside
      aria-label={isBn ? "পার্টনার ট্রাভেল টুলস ও ডিসকাউন্ট" : "Recommended Partner Travel Tools"}
      className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-5 sm:p-6 space-y-3 text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-navy text-[#F6B73C] px-2.5 py-1 rounded-md">
          {isBn ? placement.badgeBn : placement.badgeEn}
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          {isBn ? "ভেরিফায়েড অফিশিয়াল পার্টনার · ডুয়াল-কারেন্সি কার্ড সাপোর্টেড" : "Verified Official Partner · Instant Online Confirmation"}
        </span>
      </div>

      <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy leading-snug">
        {isBn ? placement.headlineBn : placement.headlineEn}
      </h3>

      <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed">
        {isBn ? placement.bodyBeforeAnchorBn : placement.bodyBeforeAnchorEn}
        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-semibold text-brand-navy underline decoration-[#F6B73C] decoration-2 underline-offset-2 hover:text-emerald-800"
        >
          {isBn ? placement.anchorTextBn : placement.anchorTextEn}
        </a>
        {isBn ? placement.bodyAfterAnchorBn : placement.bodyAfterAnchorEn}
      </p>

      <div className="pt-1 flex flex-wrap items-center gap-2.5">
        <PartnerLinkButton
          href={AFFILIATE_LINKS[placement.primaryPartner]}
          label={isBn ? placement.primaryButtonBn : placement.primaryButtonEn}
          variant="dark"
        />
        {placement.secondaryPartner && secondaryHref && (
          <PartnerLinkButton
            href={AFFILIATE_LINKS[placement.secondaryPartner]}
            label={isBn ? placement.secondaryButtonBn || "" : placement.secondaryButtonEn || ""}
            variant="light"
          />
        )}
      </div>
    </aside>
  );
}

/**
 * Contextual Travel Medical Insurance & eSIM Callout for `/visa` and `/visa/:id` pages.
 */
export function EktaInsuranceCallout({
  countryName,
  lang = "en"
}: {
  countryName?: string;
  lang?: "en" | "bn";
}) {
  const isBn = lang === "bn";
  const ektaHref = resolvePartnerUrl(AFFILIATE_LINKS.ekta);
  const yesimHref = resolvePartnerUrl(AFFILIATE_LINKS.yesim);
  const targetLabel = countryName || (isBn ? "আন্তর্জাতিক" : "International");

  return (
    <aside
      aria-label={isBn ? "ভিসা ট্রাভেল মেডিকেল ইনস্যুরেন্স ও eSIM" : "Embassy Visa Travel Medical Insurance & eSIM"}
      className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3.5 text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F6B73C] text-brand-navy px-2.5 py-1 rounded-md">
          {isBn
            ? `🛡️ ${targetLabel} ভিসা চেকলিস্ট: মেডিকেল ইনস্যুরেন্স ও eSIM`
            : `🛡️ ${targetLabel} Visa Document Requirement: Travel Insurance & eSIM`}
        </span>
        <span className="text-[11px] font-mono text-emerald-300">
          {isBn ? "২ মিনিটে অফিশিয়াল ইংরেজি PDF পলিসি · $0.99/দিন থেকে" : "Instant English PDF Policy in 2 Mins · From $0.99/day"}
        </span>
      </div>

      <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
        {isBn
          ? `${targetLabel} ভিসা আবেদন ও ইমিগ্রেশনের জন্য ভেরিফায়েড Travel Medical Insurance PDF প্রয়োজন?`
          : `Need Verifiable Travel Medical Insurance for Your ${targetLabel} Visa & Airport Immigration?`}
      </h3>

      <p className="text-xs sm:text-[13.5px] text-slate-300 leading-relaxed">
        {isBn ? (
          <>
            দূতাবাস ও ই-ভিসা পোর্টালে (থাইল্যান্ড, মালয়েশিয়া, শেনজেন ইউরোপ, সিঙ্গাপুর ও দুবাই) গ্রহণযোগ্য{" "}
            <a
              href={ektaHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-[#F6B73C] font-semibold underline underline-offset-2"
            >
              EKTA Travel Medical Insurance পলিসি ($0.99/দিন থেকে, €30,000–$50,000 কভারেজ)
            </a>{" "}
            মাত্র ২ মিনিটে ইমেইলে ডাউনলোড করুন—এবং এয়ারপোর্টে নেমেই ইন্টারনেট পেতে{" "}
            <a
              href={yesimHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-cyan-300 font-semibold underline underline-offset-2"
            >
              Yesim Travel eSIM অ্যাপ
            </a>{" "}
            ইনস্টল করে নিন।
          </>
        ) : (
          <>
            Download an embassy-compliant{" "}
            <a
              href={ektaHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-[#F6B73C] font-semibold underline underline-offset-2"
            >
              EKTA Travel Medical Insurance English PDF policy (from $0.99/day with €30,000–$50,000 medical &amp; flight delay coverage)
            </a>{" "}
            in 2 minutes for your visa submission, and pre-install a{" "}
            <a
              href={yesimHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-cyan-300 font-semibold underline underline-offset-2"
            >
              Yesim Travel eSIM (App &amp; Web supported)
            </a>{" "}
            so your phone works the moment you land.
          </>
        )}
      </p>

      <div className="pt-1 flex flex-wrap items-center gap-2.5">
        <PartnerLinkButton
          href={AFFILIATE_LINKS.ekta}
          label={isBn ? "EKTA ভিসা ইনস্যুরেন্স নিন ($0.99/দিন)" : "Get EKTA Visa Insurance PDF ($0.99/day)"}
          variant="dark"
        />
        <PartnerLinkButton
          href={AFFILIATE_LINKS.yesim}
          label={isBn ? "Yesim eSIM প্ল্যান দেখুন" : "Get Yesim Travel eSIM"}
          variant="light"
        />
        <PartnerLinkButton
          href={AFFILIATE_LINKS.airalo}
          label={isBn ? "Airalo eSIM তুলনা করুন" : "Compare Airalo eSIM"}
          variant="light"
        />
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------
   Travelpayouts creator-referral placement ("For Travel Creators & Bloggers")
   -------------------------------------------------------------------------
   One transparent referral placement per opted-in blog post. The link is a
   CREATOR REFERRAL link (TRAVELPAYOUTS_REFERRAL_URL): it invites other travel
   bloggers/creators to the Travelpayouts platform — it is deliberately NOT
   framed as a booking tool. Copy is value-first, bonus-second, with a full
   disclosure line, per Travelpayouts' official referral-promo guidance.
   Placement counts toward Pin & Win "referral placement" submissions; do not
   repeat it more than once per page.
   --------------------------------------------------------------------------- */

export interface TravelpayoutsReferralBlogPlacement {
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
  disclosureEn: string;
  disclosureBn: string;
}

export const TRAVELPAYOUTS_REFERRAL_BLOG_PLACEMENTS: Record<string, TravelpayoutsReferralBlogPlacement> = {
  "halal-food-guide-bangkok-bangladesh": {
    badgeEn: "✈️ FOR TRAVEL CREATORS & BLOGGERS",
    badgeBn: "✈️ ট্রাভেল ক্রিয়েটর ও ব্লগারদের জন্য",
    headlineEn: "Building a Travel Blog, Channel, or Destination Site of Your Own?",
    headlineBn: "নিজের ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেসটিনেশন সাইট গড়়ছেন?",
    bodyBeforeAnchorEn:
      "A note for readers who publish travel content too: managing a dozen separate affiliate dashboards used to eat hours of my week. This site now runs its flight, hotel and activity partnerships through Travelpayouts - one dashboard, one payout. If you are building a travel blog, YouTube channel or destination website, you can ",
    anchorTextEn: "explore Travelpayouts and its creator tools here",
    bodyAfterAnchorEn:
      " - it is the platform I recommend for creators who want to monetize travel content transparently. New partners can earn up to $100 in welcome bonuses, and rewards unlock as your content actually earns: a long-term income stream, not quick cash.",
    bodyBeforeAnchorBn:
      "যারা নিজেরারাও ট্রাভেল কন্টেন্ট প্রকাশ করেন তাদের জন্য একটি নোট: আলাদা আলাদা অ্যাফিলিয়েট ড্যাশবোর্ড সামলানো আগে সপ্তাহে ঘণ্টার পর ঘণ্টা নিয়ে যেত। এখন এই সাইটের ফ্লাইট, হোটেল ও অ্যাক্টিভিটি পার্টনরশিপ চলে Travelpayouts-এর একটিমাত্র ড্যাশবোর্ড থেকে। আপনি যদি ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেসটিনেশন ওয়েবসাইট গড়়েন, তাহলে ",
    anchorTextBn: "এখান থেকে Travelpayouts ও এর ক্রিয়েটর টুলগুলো দেখে নিন",
    bodyAfterAnchorBn:
      " - ট্রাভেল কন্টেন্ট দিয়ে স্বচ্ছভাবে আয় করতে চাওয়া ক্রিয়েটরদের জন্য আমি যে প্ল্যাটফর্মটি সুপারিশ করি, সেটিই এটি। নতুন পার্টনাররা স্বাগতম বোনাসে $100 পর্যন্ত পেতে পারেন; তবে পুরস্কার আনলক হয়় আপনার কন্টেন্ট সত্যিই আয় করার পর - এটি দ্রুত টাকার নয়়, দীর্ঘমেয়়াদি আয়ের একটি পথ।",
    buttonLabelEn: "Explore Travelpayouts for Creators",
    buttonLabelBn: "ক্রিয়েটরদের জন্য Travelpayouts দেখুন",
    disclosureEn:
      "Transparency: this is my referral link. If you join through it and start earning, Travelpayouts pays me a milestone bonus at no extra cost to you.",
    disclosureBn:
      "স্বচ্ছতার জন্য: এটি আমার রেফারেল লিংক। এই লিংক দিয়ে যোগ দিয়ে আপনি যদি আয় করা শুরু করেন, তাহলে Travelpayouts আমাকে একটি মাইলফলক বোনাস দেয়় - আপনার কোনো অতিরিক্ত খরচ ছাড়াই।",
  },
  "chefchaouen-morocco-travel-guide-bangladesh": {
    badgeEn: "✈️ FOR TRAVEL CREATORS & BLOGGERS",
    badgeBn: "✈️ ট্রাভেল ক্রিয়েটর ও ব্লগারদের জন্য",
    headlineEn: "Building a Travel Blog, Channel, or Destination Site of Your Own?",
    headlineBn: "নিজের ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেসটিনেশন সাইট গড়়ছেন?",
    bodyBeforeAnchorEn:
      "A note for readers who publish travel content too: managing a dozen separate affiliate dashboards used to eat hours of my week. This site now runs its flight, hotel and activity partnerships through Travelpayouts - one dashboard, one payout. If you are building a travel blog, YouTube channel or destination website, you can ",
    anchorTextEn: "explore Travelpayouts and its creator tools here",
    bodyAfterAnchorEn:
      " - it is the platform I recommend for creators who want to monetize travel content transparently. New partners can earn up to $100 in welcome bonuses, and rewards unlock as your content actually earns: a long-term income stream, not quick cash.",
    bodyBeforeAnchorBn:
      "যারা নিজেরারাও ট্রাভেল কন্টেন্ট প্রকাশ করেন তাদের জন্য একটি নোট: আলাদা আলাদা অ্যাফিলিয়েট ড্যাশবোর্ড সামলানো আগে সপ্তাহে ঘণ্টার পর ঘণ্টা নিয়ে যেত। এখন এই সাইটের ফ্লাইট, হোটেল ও অ্যাক্টিভিটি পার্টনরশিপ চলে Travelpayouts-এর একটিমাত্র ড্যাশবোর্ড থেকে। আপনি যদি ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেসটিনেশন ওয়েবসাইট গড়়েন, তাহলে ",
    anchorTextBn: "এখান থেকে Travelpayouts ও এর ক্রিয়েটর টুলগুলো দেখে নিন",
    bodyAfterAnchorBn:
      " - ট্রাভেল কন্টেন্ট দিয়ে স্বচ্ছভাবে আয় করতে চাওয়া ক্রিয়েটরদের জন্য আমি যে প্ল্যাটফর্মটি সুপারিশ করি, সেটিই এটি। নতুন পার্টনাররা স্বাগতম বোনাসে $100 পর্যন্ত পেতে পারেন; তবে পুরস্কার আনলক হয়় আপনার কন্টেন্ট সত্যিই আয় করার পর - এটি দ্রুত টাকার নয়়, দীর্ঘমেয়়াদি আয়ের একটি পথ।",
    buttonLabelEn: "Explore Travelpayouts for Creators",
    buttonLabelBn: "ক্রিয়েটরদের জন্য Travelpayouts দেখুন",
    disclosureEn:
      "Transparency: this is my referral link. If you join through it and start earning, Travelpayouts pays me a milestone bonus at no extra cost to you.",
    disclosureBn:
      "স্বচ্ছতার জন্য: এটি আমার রেফারেল লিংক। এই লিংক দিয়ে যোগ দিয়ে আপনি যদি আয় করা শুরু করেন, তাহলে Travelpayouts আমাকে একটি মাইলফলক বোনাস দেয়় - আপনার কোনো অতিরিক্ত খরচ ছাড়াই।",
  },
  "havana-cuba-travel-guide-bangladesh": {
    badgeEn: "✈️ FOR TRAVEL CREATORS & BLOGGERS",
    badgeBn: "✈️ ট্রাভেল ক্রিয়েটর ও ব্লগারদের জন্য",
    headlineEn: "Building a Travel Blog, Channel, or Destination Site of Your Own?",
    headlineBn: "নিজের ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেস্টিনেশন সাইট গড়ছেন?",
    bodyBeforeAnchorEn:
      "A note for readers who publish travel content too: managing a dozen separate affiliate dashboards used to eat hours of my week. This site now runs its flight, hotel and activity partnerships through Travelpayouts - one dashboard, one payout. If you are building a travel blog, YouTube channel or destination website, you can ",
    anchorTextEn: "explore Travelpayouts and its creator tools here",
    bodyAfterAnchorEn:
      " - it is the platform I recommend for creators who want to monetize travel content transparently. New partners can earn up to $100 in welcome bonuses, and rewards unlock as your content actually earns: a long-term income stream, not quick cash.",
    bodyBeforeAnchorBn:
      "যারা নিজেরাও ট্রাভেল কন্টেন্ট প্রকাশ করেন তাদের জন্য একটি নোট: আলাদা আলাদা অ্যাফিলিয়েট ড্যাশবোর্ড সামলানো আগে সপ্তাহে ঘণ্টার পর ঘণ্টা নিয়ে যেত। এখন এই সাইটের ফ্লাইট, হোটেল ও অ্যাক্টিভিটি পার্টনারশিপ চলে Travelpayouts-এর একটিমাত্র ড্যাশবোর্ড থেকে। আপনি যদি ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেস্টিনেশন ওয়েবসাইট গড়েন, তাহলে ",
    anchorTextBn: "এখান থেকে Travelpayouts ও এর ক্রিয়েটর টুলগুলো দেখে নিন",
    bodyAfterAnchorBn:
      " - ট্রাভেল কন্টেন্ট দিয়ে স্বচ্ছভাবে আয় করতে চাওয়া ক্রিয়েটরদের জন্য আমি যে প্ল্যাটফর্মটি সুপারিশ করি, সেটিই এটি। নতুন পার্টনাররা স্বাগতম বোনাসে $100 পর্যন্ত পেতে পারেন; তবে পুরস্কার আনলক হয় আপনার কন্টেন্ট সত্যিই আয় করার পর - এটি দ্রুত টাকার নয়, দীর্ঘমেয়াদি আয়ের একটি পথ।",
    buttonLabelEn: "Explore Travelpayouts for Creators",
    buttonLabelBn: "ক্রিয়েটরদের জন্য Travelpayouts দেখুন",
    disclosureEn:
      "Transparency: this is my referral link. If you join through it and start earning, Travelpayouts pays me a milestone bonus at no extra cost to you.",
    disclosureBn:
      "স্বচ্ছতার জন্য: এটি আমার রেফারেল লিংক। এই লিংক দিয়ে যোগ দিয়ে আপনি যদি আয় করা শুরু করেন, তাহলে Travelpayouts আমাকে একটি মাইলফলক বোনাস দেয় - আপনার কোনো অতিরিক্ত খরচ ছাড়াই।",
  },
};

export function TravelpayoutsReferralCallout({
  slug,
  lang = "en"
}: {
  slug: string;
  lang?: "en" | "bn";
}) {
  const placement = TRAVELPAYOUTS_REFERRAL_BLOG_PLACEMENTS[slug];
  if (!placement) return null;

  const isBn = lang === "bn";
  const href = TRAVELPAYOUTS_REFERRAL_URL;

  return (
    <aside
      aria-label={isBn ? "ট্রাভেল ক্রিয়েটরদের জন্য Travelpayouts রেফারেল" : "Travelpayouts referral for travel creators"}
      className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-5 sm:p-6 space-y-3 text-left"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-navy text-[#F6B73C] px-2.5 py-1 rounded-md">
          {isBn ? placement.badgeBn : placement.badgeEn}
        </span>
      </div>
      <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-navy leading-snug">
        {isBn ? placement.headlineBn : placement.headlineEn}
      </h3>
      <p className="text-sm text-slate-700 leading-relaxed">
        {isBn ? placement.bodyBeforeAnchorBn : placement.bodyBeforeAnchorEn}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-brand-navy font-semibold underline decoration-[#F6B73C] decoration-2 underline-offset-2 hover:text-[#F6B73C]"
        >
          {isBn ? placement.anchorTextBn : placement.anchorTextEn}
        </a>
        {isBn ? placement.bodyAfterAnchorBn : placement.bodyAfterAnchorEn}
      </p>
      <div className="pt-1">
        <PartnerLinkButton
          href={href}
          label={isBn ? placement.buttonLabelBn : placement.buttonLabelEn}
          variant="dark"
        />
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed">
        {isBn ? placement.disclosureBn : placement.disclosureEn}
      </p>
    </aside>
  );
}

