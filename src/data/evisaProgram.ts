import { AFFILIATE_LINKS, AFFILIATE_OFFER_REGISTRY, resolvePartnerUrl } from "../components/AffiliatePartners";
import { VISA_OFFICIAL_SOURCES } from "./visaOfficialSources";
import type { EvisaCampaignKey } from "../types";

export type { EvisaCampaignKey } from "../types";

/**
 * eVisas placements — one source of truth for copy and destinations.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Every eVisas block is rendered twice: once by React, once by
 * `scripts/prerender.ts` into crawlable HTML. Keeping the copy in the renderers
 * is how the React and static versions drift apart, and `verify:build` compares
 * the emitted bytes, not the components. Both renderers read this module.
 *
 * WHAT IT MUST NEVER DO
 * ---------------------
 * - Never present eVisas as a government portal. It is a paid application
 *   service operated by TravelRox, Inc.; its own FAQ says so.
 * - Never publish URAL's commission rate or the boost end date. Those are deal
 *   terms, not reader information (DESIGN.md, "Article affiliate next step").
 * - Never promise approval, a processing time, or a price. Only the destination
 *   page decides a price, and the price is not ours to state.
 * - Never link a Bangladeshi reader to a paid intermediary for a destination
 *   their passport cannot buy from that intermediary. Thailand is the live
 *   example: eVisas serves 87 nationalities there and Bangladesh is not one.
 */

export type EvisaLang = "en" | "bn";

/**
 * eVisas campaign links (`sid` = eVisas Campaign ID).
 *
 * These are destination campaigns, reused on related pages as requested by the
 * owner. First-party `data-affiliate-placement` identifies the individual slot;
 * it is never appended to the supplied URL as an invented campaign parameter.
 *
 * These three were created in the eVisas dashboard and verified live on
 * 15 November 2026: each set `evisas_aff={"code":"uraltravel","sid":"<id>"}` and
 * self-routed to its destination page. Do not edit them by hand — copy a new
 * value out of the dashboard, or attribution silently breaks.
 *
 * They live here rather than beside `AFFILIATE_LINKS` deliberately: that module
 * is in the homepage's eager graph, and this file is only reached from lazy and
 * route-level chunks.
 */
export const EVISAS_CAMPAIGNS = {
  uae: "https://evisas.com/?ref=uraltravel&sid=dubai",
  morocco: "https://evisas.com/?ref=uraltravel&sid=morocco",
  thailand: "https://evisas.com/?ref=uraltravel&sid=thailand",
  pakistan: "https://evisas.com/?ref=uraltravel&sid=pakistan",
  uk: "https://evisas.com/?ref=uraltravel&sid=uk",
} as const satisfies Record<EvisaCampaignKey, string>;

export interface EvisaAction {
  href: string;
  label: string;
  /** True for the affiliate destination — controls `rel`, not styling. */
  sponsored: boolean;
  emphasis: "primary" | "text";
}

export interface EvisaBlock {
  badge: string;
  headline: string;
  body: string;
  /** Optional lead-in sentence printed above the first `text` action. */
  note?: string;
  actions: EvisaAction[];
  disclosure: string;
}

export const EVISAS_DISCLOSURE: Record<EvisaLang, string> = {
  en: "Affiliate link: URAL may earn a commission. eVisas is a private, paid application service. Check the official route and the provider’s full fees before applying.",
  bn: "অ্যাফিলিয়েট লিংক: URAL কমিশন পেতে পারে। eVisas একটি বেসরকারি, পেইড আবেদন সার্ভিস। আবেদনের আগে সরকারি আবেদনপথ ও সেবাদাতার সম্পূর্ণ ফি দেখে নিন।",
};

/**
 * Resolves a campaign link, or `""` when the programme is paused.
 *
 * `resolvePartnerUrl` cannot do this: the campaign URLs are not registry `url`
 * values, so they would pass through untouched and a paused programme would keep
 * its links. The status check is explicit for that reason.
 */
export function evisasCampaignUrl(key: EvisaCampaignKey): string {
  return AFFILIATE_OFFER_REGISTRY.evisas.status === "active" &&
    Object.prototype.hasOwnProperty.call(EVISAS_CAMPAIGNS, key)
    ? EVISAS_CAMPAIGNS[key]
    : "";
}

/**
 * The account-level link (the destination chooser), or `""` when paused.
 *
 * Used on general planning surfaces; destination-specific placements use the
 * matching campaign and name that destination in their accessible link text.
 */
export function evisasAccountUrl(): string {
  return resolvePartnerUrl(AFFILIATE_LINKS.evisas);
}

/**
 * Destination for one eVisas surface: the campaign link when the page is tied to
 * a destination, the account-level chooser otherwise. Returns `""` when the
 * programme is paused, so every caller can drop the element instead of shipping
 * a dead link.
 */
export function evisasDestinationUrl(campaign?: EvisaCampaignKey): string {
  return campaign ? evisasCampaignUrl(campaign) : evisasAccountUrl();
}

function officialSourceUrl(visaId: string): string {
  return VISA_OFFICIAL_SOURCES[visaId]?.[0]?.url ?? "";
}

function action(
  href: string,
  label: string,
  sponsored: boolean,
  emphasis: EvisaAction["emphasis"] = "primary"
): EvisaAction | null {
  return href ? { href, label, sponsored, emphasis } : null;
}

function collect(actions: Array<EvisaAction | null>): EvisaAction[] {
  return actions.filter((item): item is EvisaAction => item !== null);
}

/* ------------------------------------------------------------------ */
/* Homepage — the universal surface                                    */
/* ------------------------------------------------------------------ */

/** Owner-supplied embed, checked 15 November 2026. Never derive its URL. */
export const EVISAS_WIDGET = {
  src: "https://evisas.com/widget/wgt_4c9e559a2739a9d02b62f257",
  height: 340,
  title: "eVisas visa checker",
} as const;

export const EVISAS_HOME_COPY = {
  en: {
    headline: "Apply for your visa with eVisas",
    hook: "Get help with the paperwork before you pack.",
    body: "eVisas is a private service that checks your documents and helps submit your visa application online. Use the checker to explore options for your passport and destination.",
    widgetHeading: "See if eVisas can handle your paperwork",
    consent: "This checker is provided by eVisas. Turn on “Marketing & Partner Tools” in Cookie preferences to load it here, or open eVisas directly.",
    preferences: "Cookie preferences",
    loading: "Loading the eVisas checker…",
    slow: "The checker is taking longer to load. You can open eVisas directly instead.",
    direct: "Open the checker on eVisas",
    bannerCaption: "Advertisement · Private, paid visa service",
    languageNote: "",
  },
  bn: {
    headline: "আপনার ভিসার আবেদন সহায়তায় eVisas",
    hook: "ব্যাগ গোছানোর আগে ভিসার কাগজপত্রে সহায়তা নিন।",
    body: "eVisas একটি বেসরকারি সার্ভিস। তারা আপনার নথি যাচাই করে অনলাইনে ভিসার আবেদন জমা দিতে সহায়তা করে। নিচের চেকারে আপনার পাসপোর্টের দেশ ও গন্তব্য বেছে সুযোগগুলো দেখুন।",
    widgetHeading: "দেখুন eVisas আপনার কাগজপত্র প্রক্রিয়া করতে পারবে কি না",
    consent: "এই চেকারটি eVisas-এর। এখানে লোড করতে কুকি পছন্দে “মার্কেটিং ও পার্টনার টুলস” চালু করুন, অথবা সরাসরি eVisas খুলুন।",
    preferences: "কুকি পছন্দ বদলান",
    loading: "eVisas চেকার লোড হচ্ছে…",
    slow: "চেকারটি লোড হতে সময় নিচ্ছে। চাইলে সরাসরি eVisas খুলতে পারেন।",
    direct: "eVisas-এর সাইটে চেকার খুলুন",
    bannerCaption: "বিজ্ঞাপন · বেসরকারি পেইড ভিসা সার্ভিস",
    languageNote: "eVisas-এর চেকারটি ইংরেজিতে। Passport Nationality-তে পাসপোর্টের দেশ, Destination-এ গন্তব্য বেছে নিন।",
  },
} as const;

export const EVISAS_WIDGET_PRIVACY = {
  en: {
    heading: "Optional eVisas checker",
    body: "The homepage’s embedded eVisas checker loads only after you enable “Marketing & Partner Tools” consent. When loaded, eVisas receives your IP address and browser information and handles the selections you make in its tool. URAL does not collect the checker’s form fields. You can withdraw consent at any time in Cookie preferences or open eVisas directly instead.",
    link: "Read eVisas’ privacy policy",
  },
  bn: {
    heading: "ঐচ্ছিক eVisas চেকার",
    body: "কুকি পছন্দে “মার্কেটিং ও পার্টনার টুলস” চালু করার পরই হোমপেজের eVisas চেকার লোড হয়। লোডের সময় eVisas আপনার IP address ও ব্রাউজারের তথ্য পায় এবং চেকারে আপনার বেছে নেওয়া তথ্য নিজে পরিচালনা করে। URAL চেকারের ফর্মের তথ্য সংগ্রহ করে না। কুকি পছন্দে যেকোনো সময় সম্মতি প্রত্যাহার করতে পারেন, অথবা সরাসরি eVisas খুলতে পারেন।",
    link: "eVisas-এর গোপনীয়তা নীতি পড়ুন",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Thailand — official first, affiliate only for other passports       */
/* ------------------------------------------------------------------ */

/**
 * Thailand is the one destination where a bare eVisas link is not merely
 * unhelpful but wrong: eVisas' Thailand eVisa serves 87 nationalities and a
 * Bangladeshi passport is not among them. The block leads with the official portal and
 * offers the affiliate route only to readers on a different passport.
 */
function getThailandPanel(lang: EvisaLang): EvisaBlock {
  const isBn = lang === "bn";
  return {
    badge: isBn ? "থাইল্যান্ড ই-ভিসা" : "THAILAND eVISA",
    headline: isBn
      ? "থাইল্যান্ড ই-ভিসা: আপনার আবেদনপথ বেছে নিন"
      : "Thailand eVisa: choose your application route",
    body: isBn
      ? "আপনার পাসপোর্ট ও বসবাসের দেশ অনুযায়ী শর্ত সরকারি থাই ই-ভিসা পোর্টালে দেখুন। বাংলাদেশি পাসপোর্টধারীদের জন্য ওই সরকারি আবেদনপথই ব্যবহার করুন।"
      : "Check the official Thai e-Visa portal for the requirements that apply to your passport and country of residence. Bangladeshi passport holders should use that official route.",
    note: isBn
      ? "অন্য দেশের পাসপোর্টে ভ্রমণ করছেন? ১৫ নভেম্বর ২০২৬-এ দেখা eVisas-এর থাইল্যান্ডের জাতীয়তার তালিকায় বাংলাদেশ নেই।"
      : "Travelling on another passport? eVisas’ Thailand nationality list excludes Bangladesh (checked 15 November 2026).",
    actions: collect([
      action(
        officialSourceUrl("thailand-visa"),
        isBn ? "সরকারি থাই ই-ভিসা পোর্টাল খুলুন" : "Open the official Thai e-Visa portal",
        false
      ),
      action(
        evisasCampaignUrl("thailand"),
        isBn
           ? "eVisas-এর থাইল্যান্ড ই-ভিসা আবেদন সহায়তা"
           : "Thailand eVisa assistance through eVisas",
        true,
        "text"
      ),
    ]),
    disclosure: EVISAS_DISCLOSURE[lang],
  };
}

/* ------------------------------------------------------------------ */
/* UAE — passport-specific eligibility is checked on the provider site */
/* ------------------------------------------------------------------ */

function getUaePanel(lang: EvisaLang): EvisaBlock {
  const isBn = lang === "bn";
  return {
    badge: isBn ? "পেইড আবেদন সার্ভিস" : "PAID APPLICATION SERVICE",
    headline: isBn
      ? "UAE ট্যুরিস্ট ই-ভিসা আবেদন সহায়তা"
      : "UAE tourist eVisa assistance",
    body: isBn
      ? "eVisas-এর বেসরকারি আবেদন সহায়তার মাধ্যমে UAE ভ্রমণের সুযোগ দেখুন। আবেদনের আগে আপনার পাসপোর্টের যোগ্যতা, প্রয়োজনীয় নথি ও সম্পূর্ণ ফি যাচাই করুন। UAE সরকারের ভিসা তথ্যও নিচে দেওয়া আছে।"
      : "Explore eVisas’ private application assistance for a UAE visit. Before applying, check eligibility for your passport, the required documents and the full fee. UAE government visa information is linked below.",
    actions: collect([
      action(
        evisasCampaignUrl("uae"),
        isBn ? "UAE ই-ভিসার যোগ্যতা দেখুন ও আবেদন করুন" : "Check UAE eVisa eligibility and apply",
        true
      ),
      action(
        officialSourceUrl("dubai-visa"),
        isBn ? "UAE সরকারের ভিসা তথ্য" : "UAE government visa information",
        false,
        "text"
      ),
    ]),
    disclosure: EVISAS_DISCLOSURE[lang],
  };
}

const VISA_PANEL_BUILDERS: Record<string, (lang: EvisaLang) => EvisaBlock> = {
  "thailand-visa": getThailandPanel,
  "dubai-visa": getUaePanel,
};

/**
 * Returns contextual copy for mapped visa guides. The renderer omits this
 * promotional panel when paused; the route's official-source section remains.
 */
export function getEvisaVisaPanel(visaId: string, lang: EvisaLang): EvisaBlock | null {
  const build = VISA_PANEL_BUILDERS[visaId];
  return build ? build(lang) : null;
}

/**
 * Destinations listed for a Bangladeshi passport by
 * eVisas, from `/app/destinations` with nationality BD on 15 November 2026.
 * Catalogue presence is not eligibility: some require additional residence or
 * visa documents. This dated research snapshot is not a live eligibility engine.
 */
export const EVISAS_BANGLADESH_DESTINATIONS = [
  "United Arab Emirates",
  "Sri Lanka",
  "Morocco",
  "Kenya",
  "Cambodia",
  "Botswana",
  "Ethiopia",
  "Madagascar",
  "Nigeria",
  "Pakistan",
  "Seychelles",
  "Tajikistan",
  "Bahrain",
  "Japan",
  "Turkey",
  "Taiwan",
] as const;

/**
 * The catalogue marks Bahrain, Japan, Morocco and Turkey with "Residency", and
 * Taiwan with "Ecode". Morocco's official terms were separately checked on
 * 15 November 2026; the other flags remain unverified. These are not blanket
 * eligibility promises based on nationality alone.
 */
export const EVISAS_CONDITIONAL_DESTINATIONS = ["Morocco", "Bahrain", "Japan", "Turkey", "Taiwan"] as const;

/* ------------------------------------------------------------------ */
/* Supplied artwork                                                    */
/* ------------------------------------------------------------------ */

/**
 * The four creatives eVisas supplies, converted from their PNG masters with
 * ffmpeg (`-c:v libwebp -quality 82 -compression_level 6`) on 15 November 2026.
 * Measured: horizontal 100,849 → 13,648 B · square 93,058 → 14,626 B ·
 * skyscraper 154,429 → 21,916 B · vertical 44,528 → 7,536 B.
 *
 * Use native dimensions. Horizontal and skyscraper placements use the square
 * creative on narrow screens; the vertical sits beside readable native copy.
 */
export type EvisaBannerSize = "horizontal" | "square" | "vertical" | "skyscraper";

export const EVISAS_BANNERS: Record<
  EvisaBannerSize,
  { src: string; width: number; height: number }
> = {
  horizontal: { src: "/assets/partners/evisas/horizontal-640x120.webp", width: 640, height: 120 },
  square: { src: "/assets/partners/evisas/square-250x250.webp", width: 250, height: 250 },
  vertical: { src: "/assets/partners/evisas/vertical-120x240.webp", width: 120, height: 240 },
  skyscraper: { src: "/assets/partners/evisas/skyscraper-160x600.webp", width: 160, height: 600 },
};

/**
 * Explicit placements keep ads contextual. The combined Umrah/Dubai article's
 * campaign is for its UAE leg only. Thailand uses qualified text links.
 */
export const EVISAS_BLOG_PLACEMENTS: Partial<Record<string, { campaign: EvisaCampaignKey; banner?: EvisaBannerSize }>> = {
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": { campaign: "uae", banner: "skyscraper" },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": { campaign: "uae", banner: "skyscraper" },
  "chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai": { campaign: "uae", banner: "skyscraper" },
  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": { campaign: "thailand" },
  "halal-food-guide-bangkok-bangladesh": { campaign: "thailand" },
  "nepal-vs-thailand-first-trip": { campaign: "thailand" },
};

export const EVISAS_DESTINATION_CAMPAIGNS: Partial<Record<string, EvisaCampaignKey>> = {
  "thailand-guide": "thailand",
  "dubai-guide": "uae",
  "kashmir-guide": "pakistan",
  "london-guide": "uk",
};

export function getEvisaOfficialAction(campaign: EvisaCampaignKey, lang: EvisaLang): EvisaAction {
  const isBn = lang === "bn";
  const sources = {
    thailand: { href: officialSourceUrl("thailand-visa"), label: isBn ? "সরকারি থাই ই-ভিসা পোর্টাল" : "Official Thai e-Visa portal" },
    uae: { href: officialSourceUrl("dubai-visa"), label: isBn ? "UAE সরকারের ভিসা তথ্য" : "UAE government visa information" },
    morocco: { href: "https://www.acces-maroc.ma/", label: isBn ? "মরক্কোর সরকারি Accès Maroc পোর্টাল" : "Morocco’s official Accès Maroc portal" },
    pakistan: { href: "https://visa.nadra.gov.pk/", label: isBn ? "পাকিস্তানের সরকারি NADRA ভিসা পোর্টাল" : "Pakistan's official NADRA visa portal" },
    uk: { href: "https://www.gov.uk/standard-visitor", label: isBn ? "যুক্তরাজ্যের সরকারি ভিসা পোর্টাল" : "UK's official visa portal" },
  };
  return { ...sources[campaign], sponsored: false, emphasis: "text" };
}

export function getEvisaContext(campaign: EvisaCampaignKey, lang: EvisaLang) {
  const isBn = lang === "bn";
  const copy = {
    thailand: {
      before: isBn ? "অন্য দেশের পাসপোর্টে থাইল্যান্ড যাচ্ছেন? " : "Visiting Thailand on another passport? Explore ",
      label: isBn ? "eVisas-এর থাইল্যান্ড ই-ভিসা আবেদন সহায়তা" : "Thailand eVisa assistance through eVisas",
      after: isBn ? " দেখতে পারেন। ১৫ নভেম্বর ২০২৬-এ দেখা তাদের জাতীয়তার তালিকায় বাংলাদেশ নেই; বাংলাদেশি পাসপোর্টে সরকারি থাই পোর্টাল ব্যবহার করুন।" : ". Its nationality list excludes Bangladesh (checked 15 November 2026); Bangladeshi passport holders should use the official Thai portal.",
    },
    uae: {
      before: isBn ? "আপনার সফরের UAE অংশের জন্য " : "For the UAE part of your trip, check ",
      label: isBn ? "eVisas-এর UAE ট্যুরিস্ট ভিসা আবেদন সহায়তা" : "UAE tourist visa assistance through eVisas",
      after: isBn ? " দেখুন। আবেদনের আগে আপনার পাসপোর্টের যোগ্যতা, নথি ও সম্পূর্ণ ফি যাচাই করুন।" : ". Confirm eligibility for your passport, documents and the full fee before applying.",
    },
    morocco: {
      before: isBn ? "মরক্কো যাওয়ার আগে " : "Before travelling to Morocco, check ",
      label: isBn ? "eVisas-এর মরক্কো ই-ভিসা আবেদন সহায়তা" : "Morocco eVisa assistance through eVisas",
      after: isBn ? " দেখুন। পাসপোর্ট, residence permit বা আগে থেকে থাকা ভিসার শর্ত আপনার ক্ষেত্রে প্রযোজ্য কি না সরকারি পোর্টালে মিলিয়ে নিন।" : ". Check the official portal for the passport, residence-permit or existing-visa conditions that apply to you.",
    },
    pakistan: {
      before: isBn ? "পাকিস্তান ই-ভিসার জন্য " : "For your Pakistan eVisa, check ",
      label: isBn ? "eVisas-এর পাকিস্তান ভিসা আবেদন সহায়তা" : "Pakistan visa assistance through eVisas",
      after: isBn ? " দেখুন। আবেদনের আগে যোগ্যতা ও সম্পূর্ণ ফি যাচাই করুন।" : ". Confirm your eligibility and the full fee before applying.",
    },
    uk: {
      before: isBn ? "UK ভিসার জন্য " : "For your UK visa, check ",
      label: isBn ? "eVisas-এর UK ভিসা আবেদন সহায়তা" : "UK visa assistance through eVisas",
      after: isBn ? " দেখুন। আবেদনের আগে যোগ্যতা ও ফি যাচাই করুন।" : ". Confirm your eligibility and fees before applying.",
    },
  };
  return { ...copy[campaign], href: evisasCampaignUrl(campaign), official: getEvisaOfficialAction(campaign, lang) };
}
