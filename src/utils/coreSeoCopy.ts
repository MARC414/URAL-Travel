import { GLOSSARY_META, GLOSSARY_PATH } from "./glossaryMeta";
import { OFFICIAL_RESOURCES_META, OFFICIAL_RESOURCES_PATH } from "./officialResourcesMeta";
import { PARTNERS_META, PARTNERS_PATH } from "./partnersMeta";
import {
  VISA_ASSISTANCE_META,
  VISA_ASSISTANCE_PATH,
} from "./visaAssistanceMeta";
import { TOOL_PAGE_SEO } from "./toolRoutes";
import { DEPARTURE_HUBS } from "../data/departureHubs";
import { getHomePositioning } from "../data/homePositioning";

export interface SeoCopy {
  title: string;
  description: string;
}

/**
 * EN/BN SERP copy for the six canonical /tools/<slug> pages, derived from the
 * single per-tool table in src/utils/toolRoutes.ts so the <title> clients set,
 * the prerendered <title> and the sitemap stay byte-identical.
 */
const TOOL_SLUG_SEO_COPY: Record<"en" | "bn", Record<string, SeoCopy>> = {
  en: Object.fromEntries(
    Object.entries(TOOL_PAGE_SEO).map(([slug, meta]) => [
      `/tools/${slug}`,
      { title: meta.titleEn, description: meta.descriptionEn },
    ])
  ),
  bn: Object.fromEntries(
    Object.entries(TOOL_PAGE_SEO).map(([slug, meta]) => [
      `/tools/${slug}`,
      { title: meta.titleBn, description: meta.descriptionBn },
    ])
  ),
};

/**
 * Search copy for non-article canonical routes (including the /blog hub).
 * Kept free of per-article tables and scheduled-post generated imports so the
 * eager app entry never pays for blog article metadata on non-blog routes.
 */
export const CORE_PRIORITY_SEO_COPY: Record<string, SeoCopy> = {
  ...TOOL_SLUG_SEO_COPY.en,
  "/bangladesh": DEPARTURE_HUBS.bangladesh!.copy.en,
  // English-only market hub: no /bn/uk page is generated, so this table is the
  // single source for the hub's visible description and its SERP copy.
  "/uk": {
    title: "UK Travel Hub & Intelligence | URAL",
    description:
      "Travel intelligence for the UK market: DIY Umrah preparation, ATOL checks, and UK261 flight disruption guides.",
  },
  "/": getHomePositioning("en"),
  "/umrah": {
    title: "Umrah Cost from Bangladesh: DIY Guide & Nusuk | URAL",
    description:
      "Plan Umrah from Dhaka with a BDT cost framework, Saudi visa and Nusuk guidance, Makkah–Madinah travel options, and a practical preparation checklist.",
  },
  "/banking": {
    title: "Dollar Endorsement Limit, Dual-Currency Card & NOC | URAL",
    description:
      "Bangladesh's passport dollar-endorsement limit, dual-currency cards, the USD 300 online-payment rule, RFCD accounts and NOC paperwork, with primary sources.",
  },
  "/flights": {
    title: "Flights from Dhaka: Routes, Fares & Airlines | URAL",
    description:
      "Compare popular flights from Dhaka by route, airline and duration, then check live fares for your dates. Practical planning tips for Bangladeshi travelers.",
  },
  "/flights/dhaka-kathmandu": {
    title: "Dhaka to Kathmandu Flights: Price & Route Guide | URAL",
    description:
      "Compare DAC–KTM fares across dates: nonstop and connecting options, baggage per segment, and the SAARC gratis visa check for eligible passports.",
  },
  "/flights/dhaka-bangkok": {
    title: "Dhaka to Bangkok Flights: Fares, Airlines & Tips | URAL",
    description:
      "Compare DAC–BKK fares across dates: nonstop and connecting options, baggage, and Thailand's e-Visa (thaievisa.go.th) requirements before booking.",
  },
  "/flights/dhaka-kuala-lumpur": {
    title: "Dhaka to Kuala Lumpur Flights: Price & Airlines | URAL",
    description:
      "Compare DAC–KUL fares across dates: nonstop and connecting options, baggage, and Malaysia's visa and arrival declaration checks before booking.",
  },
  "/flights/dhaka-dubai": {
    title: "Dhaka to Dubai Flights: BDT Fares & Airlines | URAL",
    description:
      "Compare DAC–DXB fares across dates: nonstop and connecting options, baggage per segment, and UAE entry checks for your passport before booking.",
  },
  "/flights/dhaka-singapore": {
    title: "Dhaka to Singapore Flights: Airlines & BDT Fares | URAL",
    description:
      "Compare DAC–SIN fares across dates: nonstop and connecting options, baggage, and Singapore ICA's visa and SG Arrival Card steps before you book.",
  },
  "/flights/dhaka-maldives": {
    title: "Dhaka to Maldives Flights: Direct & Transit Fares | URAL",
    description:
      "Compare DAC–MLE fares across dates: nonstop and connecting options, baggage, and Maldives IMUGA declaration steps before departure.",
  },
  "/flights/ktm-dhaka": {
    title: "Kathmandu to Dhaka Flights: Price & Route Guide | URAL",
    description:
      "Compare Kathmandu to Dhaka fares and journey times for your dates. Check airports, baggage, transit and entry requirements before booking.",
  },
  "/flights/dhaka-los-angeles": {
    title: "Dhaka to Los Angeles Flights: Route & Fares | URAL",
    description:
      "Compare Dhaka to Los Angeles fares and journey times for your dates. Check airports, baggage, transit and entry requirements before booking.",
  },
  "/hotels": {
    title: "Hotel Area Guides for Bangladesh Travelers | URAL",
    description:
      "Compare hotel neighborhoods and practical booking checks for popular destinations. No fixed nightly rates are published; partner collections may require you to re-enter dates and guests before checking current availability and terms.",
  },
  "/hotels/kathmandu-hotels": {
    title: "Where to Stay in Kathmandu: Neighborhoods & Booking Checks | URAL",
    description:
      "Compare Thamel, Boudha and Lazimpat by itinerary, pace and transport. Check current room availability, checkout totals and booking terms.",
  },
  "/hotels/bangkok-hotels": {
    title: "Where to Stay in Bangkok: Neighborhoods & Booking Checks | URAL",
    description:
      "Compare Pratunam, Sukhumvit and Khao San Road by shopping, transit, nightlife and noise. Check current room totals and terms for your dates.",
  },
  "/hotels/kuala-lumpur-hotels": {
    title: "Where to Stay in Kuala Lumpur: Area Comparison & Booking Checks | URAL",
    description:
      "Compare KLCC, Bukit Bintang and Chinatown by itinerary, transport and room needs. Check live availability and full booking conditions.",
  },
  "/hotels/dubai-hotels": {
    title: "Where to Stay in Dubai: Deira, Downtown & Marina | URAL",
    description:
      "Compare Deira, Downtown / Business Bay and Dubai Marina / JBR by itinerary and transport. Review current charges, totals and cancellation terms.",
  },
  "/hotels/singapore-hotels": {
    title: "Where to Stay in Singapore: Area Comparison & Booking Checks | URAL",
    description:
      "Compare Little India, Bugis and Marina Bay by transit, dining and planned activities. Check current room details, totals and cancellation terms.",
  },
  "/hotels/maldives-hotels": {
    title: "Where to Stay in the Maldives: Local Islands & Resorts | URAL",
    description:
      "Compare inhabited-island stays and private resorts by transfers, meals and room terms. Confirm current availability and the full trip cost before booking.",
  },
  "/visa": {
    title: "Visa Guides for Bangladeshi Citizens | URAL",
    description:
      "Browse visa checklists for Bangladeshi passport holders. For Thailand, verify the current government e-Visa fee; bank/payment charges and optional agency service fees are separate.",
  },
  "/visa/nepal-visa": {
    title: "Nepal Visa for Bangladeshi Citizens | URAL",
    description:
      "Review Nepal visa-on-arrival guidance for Bangladeshi passport holders, including eligibility, documents, stay limits and repeat-visit checks.",
  },
  "/visa/thailand-visa": {
    title: "Thailand Visa from Bangladesh: Process & Documents | URAL",
    description:
      "Bangladeshi applicants use Thailand's official e-Visa portal. The Dhaka TR checklist updated November 30, 2022 lists BDT 60,000/person or BDT 120,000/family; verify current rules. Government, bank/payment and optional agency charges are separate.",
  },
  "/visa/malaysia-visa": {
    title: "Malaysia Visa from Bangladesh: eVisa & MDAC | URAL",
    description:
      "Explore Malaysia visa guidance for Bangladeshi travelers, including eVisa application planning, document checklist and Malaysia Digital Arrival Card basics.",
  },
  "/visa/dubai-visa": {
    title: "Dubai & UAE Visa from Bangladesh: Tourist eVisa | URAL",
    description:
      "Review UAE and Dubai tourist visa planning for Bangladeshi passport holders, including authorized sponsors, required documents, BDT fees and processing times.",
  },
  "/visa/singapore-visa": {
    title: "Singapore Visa from Bangladesh: Documents & Process | URAL",
    description:
      "Review Singapore tourist visa requirements for Bangladeshi citizens, including authorized visa agents in Dhaka, Form V39A LOI rules, SG Arrival Card and fees.",
  },
  "/visa/maldives-visa": {
    title: "Maldives Visa for Bangladeshi Citizens: VOA & IMUGA | URAL",
    description:
      "Review Maldives tourist entry rules for Bangladeshi passport holders, including visa on arrival requirements, hotel voucher checks and the free IMUGA form.",
  },
  "/destinations": {
    title: "Destination Guides from Bangladesh | URAL",
    description:
      "Browse destination guides for trips from Bangladesh, with practical itinerary outlines, local planning notes and links to existing travel tools.",
  },
  "/destinations/nepal-guide": {
    title: "Nepal Destination Guide from Bangladesh: Kathmandu & Pokhara | URAL",
    description:
      "Plan a flexible Nepal trip around Kathmandu, nearby heritage sites and Pokhara. Check current entry, transport, access and cost details for your dates.",
  },
  "/destinations/thailand-guide": {
    title: "Bangkok Destination Guide from Bangladesh: Four-Day Plan | URAL",
    description:
      "Plan a flexible four-day Bangkok visit with riverside sights, city neighborhoods and an optional day trip. Check current opening, transport and entry details for your dates.",
  },
  "/destinations/malaysia-guide": {
    title: "Kuala Lumpur Itinerary from Bangladesh | URAL",
    description:
      "Plan a Kuala Lumpur trip from Bangladesh with a day-by-day route, city sights, transport options and BDT budget context.",
  },
  "/destinations/dubai-guide": {
    title: "Dubai Destination Guide from Bangladesh: Four-Day Plan | URAL",
    description:
      "Plan a flexible four-day Dubai visit around Downtown, the Creek and an optional excursion. Check current attraction access, transport, tour terms and entry details for your dates.",
  },
  "/destinations/singapore-guide": {
    title: "Singapore Destination Guide from Bangladesh: Four-Day Plan | URAL",
    description:
      "Plan four flexible days in Singapore around waterfront sights, a heritage neighborhood and optional Sentosa. Check current attraction access, transit and entry details for your dates.",
  },
  "/destinations/maldives-guide": {
    title: "Maldives Destination Guide from Bangladesh: Island Planning | URAL",
    description:
      "Plan a flexible Maldives stay around one island base, transfers and optional marine activities. Check current access, local rules, schedules and entry details for your dates.",
  },
  "/destinations/london-guide": {
    title: "London Destination Guide from Bangladesh: Landmarks & Planning | URAL",
    description:
      "Plan a London visit around landmarks, museums, river experiences and local transport. Check current attraction, entry and transport details for your dates.",
  },
  "/destinations/italy-guide": {
    title: "Italy Itinerary from Bangladesh: Rome, Milan & Venice | URAL",
    description:
      "Plan a flexible six-day route through Rome, Milan and Venice. Compare current intercity transport, attraction access and official entry guidance for your travel dates.",
  },
  "/destinations/paris-guide": {
    title: "Paris Itinerary from Bangladesh: Landmarks & Planning | URAL",
    description:
      "Plan a flexible Paris itinerary around museums, landmarks and the Seine. Check current opening, ticket, transport and entry information for your dates.",
  },
  "/destinations/new-york-guide": {
    title: "New York City Itinerary from Bangladesh: Landmarks & Planning | URAL",
    description:
      "Plan New York City around harbor sights, parks, museums and selected neighborhoods. Check current attraction, transport and entry information for your dates.",
  },
  "/destinations/kashmir-guide": {
    title: "Azad Kashmir Destination Guide from Bangladesh: Neelum Valley & Planning | URAL",
    description:
      "Plan an Azad Kashmir trip focusing on the Neelum Valley, Muzaffarabad, and Rawalakot. Check current road conditions and Pakistan entry requirements for Bangladeshi passports.",
  },
  "/costs": {
    title: "Trip Budget Guides: Six Destinations & Quote Planning | URAL",
    description:
      "Plan Nepal, Thailand, Malaysia, Dubai, Singapore and Maldives budgets using current quotes, clear cost categories and the Trip Cost Estimator.",
  },
  "/costs/nepal-costs": {
    title: "Nepal Trip Budget: Quotes, Hotels & Transport | URAL",
    description:
      "A 5-day Nepal trip from Bangladesh costs BDT 40,000–54,000 per person (June 2026): flights, hotels, transport and daily spend before you build your itinerary.",
  },
  "/costs/thailand-costs": {
    title: "Thailand Trip Budget: Quotes & Cost Planning | URAL",
    description:
      "Plan a Thailand trip in BDT. Visa charges are not itemized; verify the current government e-Visa fee, bank/payment charges and optional agency service fees separately.",
  },
  "/costs/malaysia-costs": {
    title: "Malaysia Trip Budget: Quotes, Hotels & Transport | URAL",
    description:
      "Plan Malaysia trip costs from your flight, Kuala Lumpur hotel, transport and activity quotes. Check units, inclusions and child fares before calculating.",
  },
  "/costs/dubai-costs": {
    title: "Dubai Trip Budget: Quotes, Hotels & Transfers | URAL",
    description:
      "Plan Dubai trip costs using current flight, hotel, transfer and attraction quotes. Keep visa, insurance, shopping and fees separate.",
  },
  "/costs/singapore-costs": {
    title: "Singapore Trip Budget: Quotes, Hotels & Activities | URAL",
    description:
      "Plan Singapore costs using actual hotel nights, flight quotes, MRT journeys and attraction tickets. Check child prices and record visa charges separately.",
  },
  "/costs/maldives-costs": {
    title: "Maldives Trip Budget: Stays, Transfers & Quotes | URAL",
    description:
      "Compare Maldives guesthouses and resorts using full stay, tax, meal-plan and return-transfer quotes. Build a budget for your dates and party.",
  },
  "/experiences": {
    title: "Attraction & Activity Guides for Bangladesh Travelers | URAL",
    description:
      "Plan activities and attraction visits abroad with practical links and guides for travelers departing from Bangladesh.",
  },
  "/experiences/europe": {
    title: "Europe, UK & US Attraction Passes: Tiqets Guides | URAL",
    description:
      "Plan timed-entry museum, landmark and river-cruise tickets in Paris, London, Rome, Milan, Venice and New York. Check current slots and terms before booking.",
  },
  "/experiences/asia": {
    title: "Asia & Dubai Attraction Passes & Activity Guides | URAL",
    description:
      "Browse Klook and partner activity listings in Dubai, Abu Dhabi, Bangkok, Singapore and Kuala Lumpur. Compare dates, inclusions, totals and booking terms.",
  },
  "/tools": {
    title: "Travel Tools: Trip Cost Estimator, Currency & Checklists | URAL",
    description:
      "Use the Trip Cost Estimator, dated BDT currency conversion, airport-code lookup, packing checklist and flight-disruption guidance.",
  },
  "/pre-departure": {
    title: "Dhaka Airport (DAC) Pre-Departure Checklist & Helplines | URAL",
    description:
      "Interactive pre-flight checklist for Bangladeshi travelers: passport endorsement, NOC/GO, digital arrival cards, cabin & Zamzam baggage rules and Bangladesh Embassy emergency numbers.",
  },
  [OFFICIAL_RESOURCES_PATH]: {
    title: OFFICIAL_RESOURCES_META.en.seoTitle,
    description: OFFICIAL_RESOURCES_META.en.seoDescription,
  },
  [GLOSSARY_PATH]: {
    title: GLOSSARY_META.en.seoTitle,
    description: GLOSSARY_META.en.seoDescription,
  },
  [PARTNERS_PATH]: {
    title: PARTNERS_META.en.seoTitle,
    description: PARTNERS_META.en.seoDescription,
  },
  [VISA_ASSISTANCE_PATH]: {
    title: VISA_ASSISTANCE_META.en.seoTitle,
    description: VISA_ASSISTANCE_META.en.seoDescription,
  },
  "/sitemap": {
    title: "Complete URAL Travel Site Directory & Guide Index | URAL",
    description:
      "Every URAL page in one place: flights, visas, hotels, BDT budgets, destination itineraries, Umrah preparation, travel tools and the full blog index for Bangladeshi travelers.",
  },
  "/contact": {
    title: "Contact URAL — Travel Information Desk in Dhaka | URAL",
    description:
      "Ask URAL about routes, visa requirements or trip planning on +8801784385335. We explain your options and point you to the official portal or provider.",
  },
  "/privacy": {
    title: "Privacy & Cookie Policy | URAL Travel Intelligence",
    description:
      "Understand how URAL Travel Intelligence collects, processes, and protects your data, our Google Consent Mode v2 implementation, and affiliate partner disclosures.",
  },
  "/blog": {
    title: "Bangladesh Travel Blog: Visa, Umrah & BDT Guides | URAL",
    description:
      "Read practical travel guides for Bangladeshi travelers, covering visas, flights from Dhaka, Umrah planning, BDT budgets and destination itineraries.",
  },
  "/about": {
    title: "About URAL Travel Intelligence | Farhan Momen, Founder & Travel Editor",
    description:
      "URAL is an independent travel-intelligence publisher in Dhaka — not a travel agency. Who writes it, how each guide is sourced and dated, and how the site stays independent.",
  },
};

/**
 * Hand-written Bengali search copy for non-article canonical routes.
 * Scheduled-post Bengali overrides stay in src/utils/seoCopy.ts (lazy on blog
 * routes, imported directly by scripts/prerender.ts).
 */
export const CORE_BENGALI_SEO_COPY: Record<string, SeoCopy> = {
  "/bangladesh": DEPARTURE_HUBS.bangladesh!.copy.bn,
  // Canonical tool sub-pages, Bengali twin (see TOOL_PAGE_SEO).
  ...TOOL_SLUG_SEO_COPY.bn,
  "/destinations": {
    title: "বাংলাদেশ থেকে ট্রিপ ইটিনারারি: গন্তব্য গাইড | URAL",
    description:
      "নেপাল, থাইল্যান্ড, মালয়েশিয়া, দুবাই, সিঙ্গাপুর ও মালদ্বীপের দিনভিত্তিক ভ্রমণ পরিকল্পনা — ঢাকা থেকে যাওয়ার রুট, স্থানীয় যাতায়াত ও টাকায় বাজেটসহ।",
  },
  "/about": {
    title: "URAL সম্পর্কে | ফারহান মোমেন — প্রতিষ্ঠাতা ও ট্রাভেল এডিটর",
    description:
      "URAL ঢাকার একটি স্বাধীন ট্রাভেল ইন্টেলিজেন্স ডেস্ক — ট্রাভেল এজেন্সি নয়। কে লেখেন, প্রতিটি গাইড কীভাবে যাচাই ও তারিখসহ প্রকাশ করা হয়, এবং সাইটের আয়ের উৎস কী।",
  },
  [PARTNERS_PATH]: {
    title: PARTNERS_META.bn.seoTitle,
    description: PARTNERS_META.bn.seoDescription,
  },
  [VISA_ASSISTANCE_PATH]: {
    title: VISA_ASSISTANCE_META.bn.seoTitle,
    description: VISA_ASSISTANCE_META.bn.seoDescription,
  },
  "/visa-free-countries": {
    title: "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া যেসব দেশে যাওয়া যায় (২০২৬) | URAL",
    description:
      "বাংলাদেশি পাসপোর্টে আগে থেকে ভিসা ছাড়া যেসব দেশে যাওয়া যায় — ঢাকা থেকে সরাসরি ব্যবহারযোগ্য গন্তব্য, সম্পূর্ণ তালিকা, ট্রানজিট ভিসার ফাঁদ এবং সহজ ভাবা হলেও যেগুলো আসলে নয়।",
  },
  "/": getHomePositioning("bn"),
  "/blog": {
    title: "বাংলাদেশ ভ্রমণ ব্লগ: ভিসা, ওমরাহ ও টাকায় গাইড | URAL",
    description:
      "বাংলাদেশি ভ্রমণকারীদের জন্য ব্যবহারিক ভ্রমণ গাইড পড়ুন — ভিসা, ঢাকা থেকে ফ্লাইট, ওমরাহ পরিকল্পনা, টাকায় বাজেট ও গন্তব্যভিত্তিক দিকনির্দেশনা।",
  },
  "/contact": {
    title: "ঢাকায় URAL ট্রাভেল ইনফরমেশন ডেস্কে যোগাযোগ | URAL",
    description:
      "রুট, ভিসার শর্ত বা ভ্রমণ পরিকল্পনা নিয়ে +8801784385335 নম্বরে URAL-কে প্রশ্ন করুন। আমরা বিকল্প বুঝিয়ে দিই এবং সরকারি পোর্টাল বা সেবাদাতার লিংক দিই।",
  },
  "/privacy": {
    title: "গোপনীয়তা ও কুকি নীতিমালা | URAL Travel Intelligence",
    description:
      "URAL Travel Intelligence-এর গোপনীয়তা ও কুকি নীতিমালা। আমরা কীভাবে ভিজিটর ডেটা, গুগল কনসেন্ট মোড v2 ও ট্রাভেলপেআউটস পার্টনার কুকিজ নিরাপদে হ্যান্ডেল করি জানুন।",
  },
  "/costs": {
    title: "ট্রিপ বাজেট গাইড: ৬ গন্তব্যের কোটেশন ও পরিকল্পনা | URAL",
    description:
      "নেপাল, থাইল্যান্ড, মালয়েশিয়া, দুবাই, সিঙ্গাপুর ও মালদ্বীপের বাজেট সাজান বর্তমান কোটেশন, স্পষ্ট খরচের খাত ও ট্রিপ কস্ট এস্টিমেটর দিয়ে।",
  },
  "/costs/dubai-costs": {
    title: "বাংলাদেশ থেকে দুবাই ভ্রমণ খরচ: ৫ দিনের টাকায় বাজেট | URAL",
    description:
      "বাংলাদেশ থেকে ৫ দিনের দুবাই ভ্রমণ খরচ টাকায় হিসাব করুন — ঢাকা–DXB ফ্লাইট, UAE ট্যুরিস্ট ভিসা ফি, দেইরা বা ডাউনটাউন হোটেল, মেট্রো ও অ্যাক্টিভিটি।",
  },
  "/costs/malaysia-costs": {
    title: "বাংলাদেশ থেকে মালয়েশিয়া ভ্রমণ খরচ: টাকায় বাজেট | URAL",
    description:
      "Flight, কুয়ালালামপুর hotel, transport ও activity quote দিয়ে মালয়েশিয়ার বাজেট সাজান। হিসাবের আগে একক, inclusions ও শিশুর ভাড়া দেখুন।",
  },
  "/costs/maldives-costs": {
    title: "বাংলাদেশ থেকে মালদ্বীপ ভ্রমণ খরচ: টাকায় বাজেট | URAL",
    description:
      "বাংলাদেশ থেকে ৫ দিনের মালদ্বীপ ভ্রমণ খরচ টাকায় হিসাব করুন — বাজেট মাফুশি গেস্টহাউস ও স্পিডবোট ট্রান্সফার বনাম প্রাইভেট আইল্যান্ড রিসোর্ট তুলনা করুন।",
  },
  "/costs/nepal-costs": {
    title: "বাংলাদেশ থেকে নেপাল ভ্রমণ খরচ: টাকায় বাজেট | URAL",
    description:
      "৫ দিনের নেপাল ভ্রমণে জনপ্রতি খরচ ৪০,০০০–৫৪,০০০ টাকা (জুন ২০২৬ হিসাবে): রাউন্ডট্রিপ ফ্লাইট, হোটেল, কাঠমান্ডু–পোখারা যাতায়াত ও দৈনিক খরচ আলাদা করে হিসাব করুন।",
  },
  "/costs/singapore-costs": {
    title: "বাংলাদেশ থেকে সিঙ্গাপুর ভ্রমণ খরচ: টাকায় বাজেট | URAL",
    description:
      "বাংলাদেশ থেকে ৪ দিনের সিঙ্গাপুর ভ্রমণ বাজেট টাকায় হিসাব করুন — ঢাকা থেকে ফ্লাইট, ভিসা ফি, লিটল ইন্ডিয়া বা বুগিস হোটেল, MRT ও সেন্টোসা টিকিট।",
  },
  "/costs/thailand-costs": {
    title: "বাংলাদেশ থেকে থাইল্যান্ড ভ্রমণ খরচ: টাকায় বাজেট | URAL",
    description:
      "বাংলাদেশ থেকে Thailand ভ্রমণের BDT বাজেট দেখুন। Visa charge আলাদা করে itemized নয়; current government e-Visa fee, bank/payment charge ও optional agency service fee যাচাই করুন।",
  },
  "/kkday-hotels": {
    title: "KKday হোটেল ও স্টে ডিল: বাংলাদেশি ভ্রমণকারীদের জন্য | URAL",
    description:
      "বাংলাদেশ থেকে KKday-তে হোটেল ও স্টে তুলনা করুন। কাঠমান্ডু, ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর, মালদ্বীপ ও দুবাইয়ের শহর গাইডসহ। বুকিংয়ের আগে বাতিলের শর্ত ও চূড়ান্ত দাম দেখে নিন।",
  },
  "/experiences": {
    title: "বাংলাদেশি ভ্রমণকারীদের জন্য অ্যাক্টিভিটি গাইড | URAL",
    description:
      "বিদেশে অ্যাক্টিভিটি ও দর্শনীয় স্থান পরিকল্পনা করুন — বাংলাদেশ থেকে যাত্রা করা ভ্রমণকারীদের জন্য ব্যবহারিক লিংক ও গাইডসহ।",
  },
  "/experiences/europe": {
    title: "ইউরোপ, যুক্তরাজ্য ও যুক্তরাষ্ট্রের আকর্ষণ পাস গাইড | URAL",
    description:
      "প্যারিস, লন্ডন, রোম, মিলান, ভেনিস ও নিউ ইয়র্কে Tiqets-এর নির্ধারিত সময়ের টিকিট ও পাস পরিকল্পনা করুন। বুকিংয়ের আগে সময়সূচি, মূল্য ও বাতিলের শর্ত দেখুন।",
  },
  "/experiences/asia": {
    title: "এশিয়া ও দুবাই আকর্ষণ পাস ও অ্যাক্টিভিটি গাইড | URAL",
    description:
      "দুবাই, আবুধাবি, ব্যাংকক, সিঙ্গাপুর ও কুয়ালালামপুরে Klook ও পার্টনার অ্যাক্টিভিটি তালিকা দেখুন। বুকিংয়ের আগে তারিখ, অন্তর্ভুক্তি, মোট দাম ও শর্ত মিলিয়ে নিন।",
  },
  "/flights": {
    title: "ঢাকা থেকে ফ্লাইট: রুট, ভাড়া ও এয়ারলাইন্স | URAL",
    description:
      "ঢাকা থেকে জনপ্রিয় ফ্লাইটগুলো রুট, এয়ারলাইন ও যাত্রার সময় অনুযায়ী তুলনা করুন, তারপর আপনার তারিখের লাইভ ভাড়া দেখুন। বাংলাদেশি ভ্রমণকারীদের জন্য ব্যবহারিক পরিকল্পনা টিপস।",
  },
  "/flights/dhaka-bangkok": {
    title: "ঢাকা টু ব্যাংকক ফ্লাইট: ভাড়া, এয়ারলাইন ও টিপস | URAL",
    description:
      "DAC–BKK রুটে একাধিক তারিখের মোট ভাড়া তুলনা করুন: সরাসরি ও সংযোগী ফ্লাইট, প্রতি সেগমেন্টের ব্যাগেজ এবং বুকিংয়ের আগে Thailand e-Visa (thaievisa.go.th) শর্ত যাচাই।",
  },
  "/flights/dhaka-dubai": {
    title: "ঢাকা টু দুবাই ফ্লাইট: টাকায় ভাড়া ও এয়ারলাইন | URAL",
    description:
      "DAC–DXB রুটে একাধিক তারিখের মোট ভাড়া তুলনা করুন: সরাসরি ও সংযোগী ফ্লাইট, প্রতি সেগমেন্টের ব্যাগেজ এবং নিজের পাসপোর্টের জন্য UAE প্রবেশের নিয়ম যাচাই।",
  },
  "/flights/dhaka-kathmandu": {
    title: "ঢাকা টু কাঠমান্ডু ফ্লাইট: ভাড়া ও রুট গাইড | URAL",
    description:
      "DAC–KTM রুটে একাধিক তারিখের মোট ভাড়া তুলনা করুন: সরাসরি ও সংযোগী ফ্লাইট, প্রতি সেগমেন্টের ব্যাগেজ এবং যোগ্য পাসপোর্টে SAARC gratis visa যাচাই।",
  },
  "/flights/dhaka-kuala-lumpur": {
    title: "ঢাকা টু কুয়ালালামপুর ফ্লাইট: ভাড়া ও এয়ারলাইন | URAL",
    description:
      "DAC–KUL রুটে একাধিক তারিখের মোট ভাড়া তুলনা করুন: সরাসরি ও সংযোগী ফ্লাইট, ব্যাগেজ এবং বুকিংয়ের আগে মালয়েশিয়ার ভিসা ও arrival declaration যাচাই।",
  },
  "/flights/dhaka-maldives": {
    title: "ঢাকা টু মালদ্বীপ ফ্লাইট: সরাসরি ও ট্রানজিট ভাড়া | URAL",
    description:
      "DAC–MLE রুটে একাধিক তারিখের মোট ভাড়া তুলনা করুন: সরাসরি ও সংযোগী ফ্লাইট, ব্যাগেজ এবং রওনার আগে Maldives IMUGA declaration যাচাই।",
  },
  "/flights/ktm-dhaka": {
    title: "কাঠমান্ডু টু ঢাকা ফ্লাইট: ভাড়া ও রুট গাইড | URAL",
    description:
      "কাঠমান্ডু থেকে ঢাকা ফ্লাইটের মোট ভাড়া ও যাত্রার সময় তুলনা করুন। বুকিংয়ের আগে বিমানবন্দর, ব্যাগেজ, ট্রানজিট ও প্রবেশের নিয়ম যাচাই করুন।",
  },

  "/flights/dhaka-singapore": {
    title: "ঢাকা টু সিঙ্গাপুর ফ্লাইট: এয়ারলাইন ও টাকায় ভাড়া | URAL",
    description:
      "DAC–SIN রুটে একাধিক তারিখের মোট ভাড়া তুলনা করুন: সরাসরি ও সংযোগী ফ্লাইট, ব্যাগেজ এবং বুকিংয়ের আগে Singapore ICA-এর ভিসা ও SG Arrival Card ধাপ যাচাই।",
  },
  "/hotels": {
    title: "বাংলাদেশি ভ্রমণকারীদের জন্য হোটেল এলাকা গাইড | URAL",
    description:
      "জনপ্রিয় গন্তব্যের হোটেল এলাকা ও বুকিং-চেক তুলনা করুন। স্থির রাতপ্রতি ভাড়া নেই—আপনার তারিখের বর্তমান প্রাপ্যতা ও সম্পূর্ণ শর্ত যাচাই করুন।",
  },
  "/hotels/bangkok-hotels": {
    title: "ব্যাংককে কোথায় থাকবেন: এলাকা ও বুকিং চেক | URAL",
    description:
      "শপিং, যাতায়াত, রাতের পরিবেশ ও শব্দ ধরে Pratunam, Sukhumvit ও Khao San Road তুলনা করুন। আপনার তারিখে বর্তমান রুমের মোট দাম ও শর্ত দেখুন।",
  },
  "/hotels/dubai-hotels": {
    title: "দুবাইয়ে কোথায় থাকবেন: দেইরা, ডাউনটাউন ও মেরিনা | URAL",
    description:
      "ভ্রমণসূচি ও যাতায়াত ধরে Deira, Downtown / Business Bay এবং Dubai Marina / JBR তুলনা করুন। বর্তমান চার্জ, মোট দাম ও বাতিলের শর্ত যাচাই করুন।",
  },
  "/hotels/kathmandu-hotels": {
    title: "কাঠমান্ডুতে কোথায় থাকবেন: এলাকা ও বুকিং চেক | URAL",
    description:
      "ভ্রমণসূচি, পছন্দের পরিবেশ ও যাতায়াত ধরে Thamel, Boudha ও Lazimpat তুলনা করুন। বর্তমান রুম-প্রাপ্যতা, মোট দাম ও বুকিংয়ের শর্ত দেখুন।",
  },
  "/hotels/kuala-lumpur-hotels": {
    title: "কুয়ালালামপুরে কোথায় থাকবেন: এলাকা তুলনা ও বুকিং চেক | URAL",
    description:
      "ভ্রমণসূচি, যাতায়াত ও রুমের প্রয়োজন ধরে KLCC, Bukit Bintang ও Chinatown তুলনা করুন। লাইভ প্রাপ্যতা ও সম্পূর্ণ বুকিং-শর্ত যাচাই করুন।",
  },
  "/hotels/maldives-hotels": {
    title: "মালদ্বীপে কোথায় থাকবেন: লোকাল আইল্যান্ড ও রিসোর্ট | URAL",
    description:
      "ট্রান্সফার, খাবার ও রুমের শর্ত ধরে বসতিপূর্ণ দ্বীপের থাকা ও প্রাইভেট রিসোর্ট তুলনা করুন। বুকিংয়ের আগে বর্তমান প্রাপ্যতা ও পুরো ভ্রমণ-খরচ নিশ্চিত করুন।",
  },
  "/hotels/singapore-hotels": {
    title: "সিঙ্গাপুরে কোথায় থাকবেন: এলাকা ও বুকিং চেক | URAL",
    description:
      "যাতায়াত, খাবার ও কার্যক্রম ধরে Little India, Bugis ও Marina Bay তুলনা করুন। বর্তমান রুমের বিবরণ, মোট দাম ও বাতিলের শর্ত দেখুন।",
  },
  "/pre-departure": {
    title: "ঢাকা এয়ারপোর্ট প্রি-ডিপার্চার চেকলিস্ট, লাগেজ নিয়ম ও দূতাবাস হেল্পলাইন | URAL",
    description:
      "বিমানবন্দরে রওনার আগের চেকলিস্ট: পাসপোর্ট এন্ডোর্সমেন্ট, NOC/GO, রিটার্ন টিকেট, ডিজিটাল অ্যারাইভাল কার্ড, কেবিন ও জমজম ব্যাগেজের নিয়ম এবং প্রবাসে বাংলাদেশ দূতাবাসের জরুরি নম্বর।",
  },
  [OFFICIAL_RESOURCES_PATH]: {
    title: OFFICIAL_RESOURCES_META.bn.seoTitle,
    description: OFFICIAL_RESOURCES_META.bn.seoDescription,
  },
  [GLOSSARY_PATH]: {
    title: GLOSSARY_META.bn.seoTitle,
    description: GLOSSARY_META.bn.seoDescription,
  },
  "/sitemap": {
    title: "URAL ভ্রমণ সাইট ডিরেক্টরি ও গাইড ইনডেক্স | URAL",
    description:
      "ফ্লাইট, ভিসা, হোটেল, টাকার বাজেট, গন্তব্য গাইড, ওমরাহ প্রস্তুতি ও ভ্রমণ টুলসহ URAL-এর প্রতিটি পেজের সরাসরি লিংক এক জায়গায়।",
  },
  "/tools": {
    title: "ট্রাভেল টুলস: ট্রিপ কস্ট এস্টিমেটর, কারেন্সি ও চেকলিস্ট | URAL",
    description:
      "ট্রিপ কস্ট এস্টিমেটর, তারিখসহ BDT currency conversion, airport code, packing checklist ও flight-disruption guidance ব্যবহার করুন।",
  },
  "/umrah": {
    title: "বাংলাদেশ থেকে ওমরাহ খরচ: নিজে করুন গাইড ও নুসুক | URAL",
    description:
      "ঢাকা থেকে ওমরাহ পরিকল্পনা করুন — টাকায় খরচের কাঠামো, সৌদি ভিসা ও নুসুক গাইড, মক্কা–মদিনা যাতায়াত এবং প্রস্তুতির চেকলিস্টসহ।",
  },
  "/banking": {
    title: "পাসপোর্টে ডলার এনডোর্সমেন্ট সীমা, ডুয়েল কারেন্সি কার্ড ও NOC | URAL",
    description:
      "পাসপোর্টে ডলার এনডোর্সমেন্টের সীমা, ডুয়েল কারেন্সি কার্ড, USD 300 অনলাইন নিয়ম, RFCD account ও NOC — বাংলাদেশ ব্যাংকের সূত্রসহ যাচাই করা গাইড।",
  },
  "/visa": {
    title: "বাংলাদেশি নাগরিকদের জন্য ভিসা গাইড | URAL",
    description:
      "বাংলাদেশি পাসপোর্টধারীদের ভিসা গাইড দেখুন। Thailand e-Visa-এর সরকারি fee, bank/payment charge ও optional agency fee আলাদা; বর্তমান নিয়ম ও অঙ্ক official source-এ যাচাই করুন।",
  },
  "/visa/dubai-visa": {
    title: "বাংলাদেশ থেকে দুবাই ও UAE ভিসা: ট্যুরিস্ট eVisa | URAL",
    description:
      "বাংলাদেশি পাসপোর্টধারীদের জন্য UAE ও দুবাই ট্যুরিস্ট ভিসা পরিকল্পনা দেখুন — অনুমোদিত স্পনসর, প্রয়োজনীয় কাগজপত্র, টাকায় ফি ও প্রসেসিং সময়।",
  },
  "/visa/malaysia-visa": {
    title: "বাংলাদেশ থেকে মালয়েশিয়া ভিসা: eVisa ও MDAC | URAL",
    description:
      "বাংলাদেশি ভ্রমণকারীদের জন্য মালয়েশিয়া ভিসার দিকনির্দেশনা — eVisa আবেদন পরিকল্পনা, কাগজপত্র চেকলিস্ট ও মালয়েশিয়া ডিজিটাল অ্যারাইভাল কার্ডের মূল বিষয়।",
  },
  "/visa/maldives-visa": {
    title: "বাংলাদেশি নাগরিকদের জন্য মালদ্বীপ ভিসা: VOA ও IMUGA | URAL",
    description:
      "বাংলাদেশি পাসপোর্টধারীদের জন্য মালদ্বীপ ট্যুরিস্ট প্রবেশের নিয়ম দেখুন — অন-অ্যারাইভাল ভিসার শর্ত, হোটেল ভাউচার যাচাই ও ফ্রি IMUGA ফর্ম।",
  },
  "/visa/nepal-visa": {
    title: "বাংলাদেশি নাগরিকদের জন্য নেপাল ভিসা | URAL",
    description:
      "বাংলাদেশি পাসপোর্টধারীদের জন্য নেপাল অন-অ্যারাইভাল ভিসার দিকনির্দেশনা দেখুন — যোগ্যতা, কাগজপত্র, থাকার সীমা ও পুনঃভ্রমণ যাচাইসহ।",
  },
  "/visa/singapore-visa": {
    title: "বাংলাদেশ থেকে সিঙ্গাপুর ভিসা: কাগজপত্র ও প্রক্রিয়া | URAL",
    description:
      "বাংলাদেশি নাগরিকদের জন্য সিঙ্গাপুর ট্যুরিস্ট ভিসার শর্ত দেখুন — ঢাকার অনুমোদিত ভিসা এজেন্ট, Form V39A LOI নিয়ম, SG অ্যারাইভাল কার্ড ও ফি।",
  },
  "/visa/thailand-visa": {
    title: "বাংলাদেশ থেকে থাইল্যান্ড ভিসা: প্রক্রিয়া ও কাগজপত্র | URAL",
    description:
      "Thailand e-Visa-এর জন্য official portal ব্যবহার করুন। Dhaka TR checklist (হালনাগাদ ৩০ নভেম্বর ২০২২) জনপ্রতি BDT 60,000/পরিবারে BDT 120,000 উল্লেখ করে—বর্তমান requirement যাচাই করুন। সরকারি fee, bank/payment ও optional agency fee আলাদা।",
  },
};

function normalizePath(path: string): string {
  const pathOnly = path.split(/[?#]/, 1)[0] || "/";
  const normalized = `/${pathOnly.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : normalized.replace(/\/+$/, "");
}

/** Strips a leading /bn locale segment so Bengali and English keys stay aligned. */
export function stripLocalePrefix(path: string): string {
  return normalizePath(path).replace(/^\/bn(?=\/|$)/, "") || "/";
}

function trimAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const candidate = text.slice(0, Math.max(1, maxLength - 1));
  const boundary = candidate.lastIndexOf(" ");
  const clipped = boundary > maxLength * 0.6 ? candidate.slice(0, boundary) : candidate;
  return `${clipped.trimEnd()}…`;
}

/**
 * Removes trailing brand suffixes ("| URAL", "| URAL Travel", "| URAL Travel Blog")
 * so H1 headings and compact title builders operate on the clean page topic.
 */
export function stripBrandSuffix(text: string): string {
  return text
    .replace(/\s*\|\s*URAL(?:\s+Travel)?(?:\s+Blog)?\s*$/i, "")
    .trim();
}

export function compactTitle(title: string): string {
  const suffix = " | URAL";
  const withoutBrand = stripBrandSuffix(title);
  return `${trimAtWord(withoutBrand, 60 - suffix.length)}${suffix}`;
}

export function compactDescription(description: string): string {
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= 160) return normalized;

  const sentenceEnd = normalized.lastIndexOf(". ", 157);
  if (sentenceEnd >= 80) return normalized.slice(0, sentenceEnd + 1);
  return trimAtWord(normalized, 160);
}

/**
 * Hand-written Bengali copy for non-article routes (English base path or /bn
 * path), or null when the route has none.
 */
export function getCoreBengaliSeoCopy(path: string): SeoCopy | null {
  const key = stripLocalePrefix(path);
  return CORE_BENGALI_SEO_COPY[key] ?? null;
}

/**
 * Resolves SEO copy for non-article canonical routes without pulling blog-post
 * or scheduled-blog SEO tables into the eager client bundle.
 */
export function getCoreSeoCopy(
  path: string,
  title: string,
  description: string,
  locale: "en" | "bn" = "en"
): SeoCopy {
  const key = stripLocalePrefix(path);
  const generatedCopy = {
    title: compactTitle(title),
    description: compactDescription(description),
  };
  if (locale === "bn") {
    return CORE_BENGALI_SEO_COPY[key] ?? generatedCopy;
  }
  const priorityCopy = CORE_PRIORITY_SEO_COPY[key];
  if (priorityCopy) return priorityCopy;
  return generatedCopy;
}
