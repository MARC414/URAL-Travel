/**
 * Copy for `/partners` in both languages.
 *
 * Mirrors src/utils/aboutCopy.ts: the React half (PartnersPage.tsx) and the
 * prerendered half (renderPartnersStaticHtml in partnersPage.ts) both read this
 * table, so the two cannot drift. Add copy here, never in a renderer.
 *
 * HOUSE RULES the wording obeys:
 * - Outbound partner URLs come from the affiliate registry; they are never
 *   hand-edited, and every one renders with rel="noopener noreferrer sponsored".
 * - No commission rate, rev-share figure or deal term, ever.
 * - No "trusted by", "verified partner" or "best price" hype.
 * - Every figure carries a date and a source, or it does not appear.
 */

import { AFFILIATE_LINKS, resolvePartnerUrl } from "../components/AffiliatePartners";

export type PartnersLocale = "en" | "bn";

/** "uralFlights" is URAL's own hosted search subdomain, not an affiliate link. */
export type PartnerKey = keyof typeof AFFILIATE_LINKS | "uralFlights";

export const PARTNER_HREF: Record<PartnerKey, string> = {
  ...AFFILIATE_LINKS,
  uralFlights: "https://flights.uraltravel.co.uk/",
};

/** Resolve a partner key to the URL a reader should land on. */
export function partnerHref(key: PartnerKey): string {
  return key === "uralFlights" ? PARTNER_HREF.uralFlights : resolvePartnerUrl(PARTNER_HREF[key]);
}

/** Prefix an internal path with `/bn` on the Bengali page (path space is mirrored). */
export function partnersLocalizedPath(path: string, locale: PartnersLocale): string {
  if (locale !== "bn") return path;
  return path === "/" ? "/bn" : `/bn${path}`;
}

export interface PartnerRow {
  id: string;
  /** Display name. Always in its own registered form — partner names are never translated. */
  partner: string;
  key: PartnerKey;
  /** True when this outbound link is an affiliate link (rel="sponsored"). */
  affiliate: boolean;
  what: string;
  whatYouGet: string;
  whereLabel: string;
  wherePath: string;
}

export interface PartnerGroup {
  id: string;
  heading: string;
  rows: readonly PartnerRow[];
}

export interface PartnerSource {
  id: string;
  /** What this source establishes, in the reader's language. */
  label: string;
  url: string;
}

export interface PartnersCopy {
  eyebrow: string;
  h1: string;
  intro: string;
  quickAnswerHeading: string;
  quickAnswer: string;
  modelHeading: string;
  modelPoints: readonly string[];
  travelpayoutsHeading: string;
  travelpayoutsParagraphs: readonly string[];
  travelpayoutsSourcesHeading: string;
  travelpayoutsSources: readonly PartnerSource[];
  travelpayoutsChecked: string;
  directoryHeading: string;
  directoryIntro: string;
  columns: { partner: string; what: string; whatYouGet: string; where: string };
  groups: readonly PartnerGroup[];
  meaningHeading: string;
  meaningPoints: readonly string[];
  visasHeading: string;
  visasBody: string;
  visasLinkLabel: string;
  disclosure: string;
  contactHeading: string;
  contactBody: string;
  footerNote: string;
}

export const PARTNERS_COPY: Record<PartnersLocale, PartnersCopy> = {
  en: {
    eyebrow: "Our travel partners",
    h1: "The partners behind the booking links",
    intro:
      "URAL does not sell flights, hotels or visas, and takes no payment for any of them. Where a guide points you to a booking, it points to a partner who completes that booking — and a few of those links pay URAL a commission at no extra cost to you. This page names them, what each is for, and where you will meet them.",
    quickAnswerHeading: "Quick answer",
    quickAnswer:
      "URAL works with a small set of partners whose links complete bookings or applications; URAL may earn a commission at no extra cost to you; the partner sets the price, the terms and the cancellation policy; and the visa leg is a separate partner, eVisas.com, covered on its own page.",
    modelHeading: "How the model works",
    modelPoints: [
      "Flight links hand your route, dates and passengers to a hosted search at flights.uraltravel.co.uk (built on Travelpayouts, Page 24232) or to Aviasales or Kiwi.com. No fare is invented and no schedule is shown until the partner's engine returns it.",
      "Every outbound affiliate link on this site is marked. A commission is paid only on qualifying actions a reader completes; URAL is not paid to recommend a fare, a hotel or a route, and the arrangement never changes what a guide says.",
      "URAL does not hold inventory and does not take payment. Availability, price, terms and cancellation are the partner's, shown on the partner's site at the time you book.",
    ],
    travelpayoutsHeading: "About Travelpayouts",
    travelpayoutsParagraphs: [
      "Most booking links on this site route through Travelpayouts, a travel partnerships platform whose links are carried here. When you follow one and complete a qualifying action, the partner may pay URAL a commission.",
      "Per the company's own /about page, checked 17 November 2026: Travelpayouts is part of the international travel holding Go Travel Un Limited, which operates in 14 countries.",
      "Per the Affiliate Network Terms, clause 1.2, checked 17 November 2026: the Travelpayouts trademark is owned by Go Travel Un Limited, registered as a legal entity in the special administrative region of Hong Kong on 18 August 2011 (registration number 1658681; address: 4007 Central Plaza, 18 Harbour Road, Wanchai, Hong Kong).",
      "URAL's Travelpayouts account marker is 675992. It identifies this website as the source of a referral; it does not change your price.",
    ],
    travelpayoutsChecked: "Sources checked 17 November 2026. Figures are quoted, not restated by URAL.",
    travelpayoutsSourcesHeading: "Where those facts come from",
    travelpayoutsSources: [
      {
        id: "tp-about",
        label: "Travelpayouts — About us (the 14-country statement)",
        url: "https://www.travelpayouts.com/about",
      },
      {
        id: "tp-terms",
        label: "Travelpayouts — Affiliate Network Terms, clause 1.2 (the Hong Kong registration)",
        url: "https://support.travelpayouts.com/hc/en-us/articles/360004162111",
      },
    ],
    directoryHeading: "Partner directory, by job",
    directoryIntro:
      "Outbound links open in a new tab and are marked sponsored. The final column stays inside this site.",
    columns: {
      partner: "Partner",
      what: "What it's for",
      whatYouGet: "What you get",
      where: "Where on URAL",
    },
    groups: [
      {
        id: "flights",
        heading: "Flights",
        rows: [
          {
            id: "ural-flights",
            partner: "URAL Flights (hosted search)",
            key: "uralFlights",
            affiliate: false,
            what: "The hosted flight search behind this site, built on Travelpayouts (Page 24232)",
            whatYouGet: "Your route, dates and passengers handed to the airline engine",
            whereLabel: "Flight search and route guides",
            wherePath: "/flights",
          },
          {
            id: "aviasales",
            partner: "Aviasales",
            key: "aviasales",
            affiliate: true,
            what: "Fare comparison across airlines and online agencies",
            whatYouGet: "A real-time comparison before you book",
            whereLabel: "Flight search and route guides",
            wherePath: "/flights",
          },
          {
            id: "kiwi",
            partner: "Kiwi.com",
            key: "kiwi",
            affiliate: true,
            what: "Low-cost and multi-city routing, including self-transfer itineraries",
            whatYouGet: "Journeys a single airline will not sell you",
            whereLabel: "Flight search and route guides",
            wherePath: "/flights",
          },
        ],
      },
      {
        id: "stays",
        heading: "Stays",
        rows: [
          {
            id: "klook-hotels",
            partner: "Klook Hotels",
            key: "klookHotels",
            affiliate: true,
            what: "Curated hotel collections we reference in city guides",
            whatYouGet: "A filtered list inside Klook's own booking flow",
            whereLabel: "Hotel guides by city",
            wherePath: "/hotels",
          },
          {
            id: "kkday-hotels",
            partner: "KKday Hotels",
            key: "kkdayHotels",
            affiliate: true,
            what: "Hotels and stays across Asia",
            whatYouGet: "KKday's filtered hotel list for the city",
            whereLabel: "KKday hotel page",
            wherePath: "/kkday-hotels",
          },
        ],
      },
      {
        id: "tours",
        heading: "Tours & attractions",
        rows: [
          {
            id: "klook",
            partner: "Klook",
            key: "klook",
            affiliate: true,
            what: "Tickets and experiences we link in attraction guides",
            whatYouGet: "Instant booking for the ticket you were reading about",
            whereLabel: "Attractions hub",
            wherePath: "/experiences",
          },
          {
            id: "tiqets",
            partner: "Tiqets",
            key: "tiqets",
            affiliate: true,
            what: "Timed-entry tickets for museums that sell out",
            whatYouGet: "A time slot, not a queue",
            whereLabel: "European attractions",
            wherePath: "/attractions",
          },
          {
            id: "gocity",
            partner: "Go City",
            key: "goCity",
            affiliate: true,
            what: "Multi-attraction passes for European and US cities",
            whatYouGet: "A pass priced per day, not per museum",
            whereLabel: "Europe, UK & US passes",
            wherePath: "/experiences/europe",
          },
          {
            id: "kkday",
            partner: "KKday",
            key: "kkday",
            affiliate: true,
            what: "Tours and passes across Asia",
            whatYouGet: "Asia-focused tours and bundles",
            whereLabel: "Asia & Dubai passes",
            wherePath: "/experiences/asia",
          },
        ],
      },
      {
        id: "connectivity",
        heading: "Connectivity",
        rows: [
          {
            id: "airalo",
            partner: "Airalo",
            key: "airalo",
            affiliate: true,
            what: "Data eSIMs for most countries URAL readers fly to",
            whatYouGet: "Mobile data that works before the immigration queue does",
            whereLabel: "Destination guides",
            wherePath: "/destinations",
          },
          {
            id: "yesim",
            partner: "Yesim",
            key: "yesim",
            affiliate: true,
            what: "An alternative eSIM provider with regional bundles",
            whatYouGet: "Regional plans when one country is not enough",
            whereLabel: "Visa checklists",
            wherePath: "/visa",
          },
        ],
      },
      {
        id: "transfers",
        heading: "Transfers & arrivals",
        rows: [
          {
            id: "kiwitaxi",
            partner: "Kiwitaxi",
            key: "kiwitaxi",
            affiliate: true,
            what: "Pre-booked airport transfers in the cities we cover",
            whatYouGet: "A driver with a sign at arrivals",
            whereLabel: "Flight search and route guides",
            wherePath: "/flights",
          },
          {
            id: "gettransfer",
            partner: "GetTransfer",
            key: "getTransfer",
            affiliate: true,
            what: "A marketplace for private and shared transfers",
            whatYouGet: "Competing offers for the same ride",
            whereLabel: "Visa checklists (arrival sections)",
            wherePath: "/visa",
          },
          {
            id: "welcome-pickups",
            partner: "Welcome Pickups",
            key: "welcomePickups",
            affiliate: true,
            what: "Airport pickups with local English-speaking drivers",
            whatYouGet: "Fixed price, driver contact, no counter desk",
            whereLabel: "Umrah and Hajj hub",
            wherePath: "/umrah",
          },
        ],
      },
      {
        id: "protection",
        heading: "Protection & extras",
        rows: [
          {
            id: "airhelp",
            partner: "AirHelp",
            key: "airhelp",
            affiliate: true,
            what: "Compensation claims when a flight is delayed, cancelled or overbooked",
            whatYouGet: "A claim handled by them, for a share of the payout",
            whereLabel: "Flight-disruption claim tool",
            wherePath: "/tools/flight-delay-claim",
          },
          {
            id: "qeeq",
            partner: "Qeeq",
            key: "qeeq",
            affiliate: true,
            what: "Car rental comparisons at most major airports",
            whatYouGet: "Competing rental offers in one place",
            whereLabel: "Travel Essentials on the home page",
            wherePath: "/",
          },
          {
            id: "radical-storage",
            partner: "Radical Storage",
            key: "radicalStorage",
            affiliate: true,
            what: "Luggage storage near major stations and attractions",
            whatYouGet: "A booked storage slot, not a guess at a locker",
            whereLabel: "Attraction guides",
            wherePath: "/attractions",
          },
        ],
      },
    ],
    meaningHeading: "What this means for you",
    meaningPoints: [
      "Guides name the official source first and never cost anything to read.",
      "If a partner link pays URAL, it is marked; the price you pay is the partner's price, never higher because of URAL.",
      "A commission never ranks, improves or removes a recommendation.",
    ],
    visasHeading: "Visa applications are a separate partner",
    visasBody:
      "The visa leg is handled by eVisas.com, a private visa-assistance service — not by Travelpayouts or anyone else named here. How that works, and exactly where URAL's role ends, is set out in one place:",
    visasLinkLabel: "How visa assistance works",
    disclosure:
      "Outbound links to these partners are affiliate links, and each is marked. Partners may pay URAL a commission on qualifying actions at no extra cost to you. URAL does not hold inventory, take payment or set prices, terms or cancellation rules — the partner does, on its site.",
    contactHeading: "A question about a partner?",
    contactBody: "Ask on WhatsApp (+8801784385335) or email support@uraltravel.co.uk; both reach the person who writes the guides.",
    footerNote: "Partners and terms last checked 17 November 2026.",
  },

  bn: {
    eyebrow: "আমাদের ট্রাভেল পার্টনাররা",
    h1: "বুকিং লিংকের পেছনের পার্টনাররা",
    intro:
      "URAL ফ্লাইট, হোটেল বা ভিসা বিক্রি করে না এবং এগুলোর কোনোটির জন্যই টাকা নেয় না। কোনো গাইড যখন আপনাকে বুকিংয়ে পাঠায়, সেটি পাঠায় এমন একটি পার্টনারের কাছে যে সেই বুকিং সম্পন্ন করে — আর সেই লিংকগুলোর কয়েকটি URAL-কে কমিশন দেয়, আপনার কাছ থেকে বাড়তি এক টাকাও ছাড়া। এই পাতায় নাম, কাজ এবং সাইটের কোন জায়গায় দেখা পাবেন — সব বলা আছে।",
    quickAnswerHeading: "এক লাইনে",
    quickAnswer:
      "URAL এমন কিছু পার্টনারের সঙ্গে কাজ করে যাদের লিংক বুকিং বা আবেদন সম্পন্ন করে; আপনার বাড়তি খরচ ছাড়া URAL কমিশন পেতে পারে; দাম ও শর্ত নির্ধারণ করে পার্টনার; আর ভিসার অংশটি আলাদা পার্টনার — eVisas.com — যার পাতা আলাদা।",
    modelHeading: "মডেলটি কীভাবে কাজ করে",
    modelPoints: [
      "ফ্লাইটের লিংক আপনার রুট, তারিখ ও যাত্রীসংখ্যার তথ্য পাঠায় flights.uraltravel.co.uk-এর হোস্টেড সার্চে (Page 24232, Travelpayouts-চালিত), অথবা Aviasales কিংবা Kiwi.com-এ। পার্টনারের ইঞ্জিনের উত্তর না এলে কোনো ভাড়া বানানো হয় না, কোনো সময়ও দেখানো হয় না।",
      "এই সাইটের প্রতিটি আউটবাউন্ড অ্যাফিলিয়েট লিংক চিহ্নিত করা থাকে। কমিশন দেওয়া হয় শুধুমাত্র পাঠকের সম্পন্ন করা যোগ্য কোনো কাজের ভিত্তিতে; URAL কোনো ভাড়া, হোটেল বা রুট সুপারিশ করার জন্য টাকা নেয় না, এবং কমিশন কখনো গাইডের কথা বদলায় না।",
      "URAL কোনো ইনভেন্টরি ধরে রাখে না, অর্থ গ্রহণও করে না। উপলব্ধতা, দাম, শর্ত ও বাতিলের নিয়ম — সবই পার্টনারের, এবং বুকিংয়ের সময় তারই সাইটে দেখা যায়।",
    ],
    travelpayoutsHeading: "Travelpayouts সম্পর্কে",
    travelpayoutsParagraphs: [
      "এই সাইটের বেশিরভাগ বুকিং লিংক Travelpayouts-এর মধ্য দিয়ে যায় — এটি একটি ট্রাভেল পার্টনারশিপ প্ল্যাটফর্ম, যার লিংকগুলো এখানে ব্যবহৃত হয়। আপনি কোনো লিংক ফলো করে যোগ্য কোনো কাজ সম্পন্ন করলে পার্টনার URAL-কে কমিশন দিতে পারে।",
      "কোম্পানিটির নিজস্ব /about পেজ অনুযায়ী, ১৭ নভেম্বর ২০২৬ চেক করা: Travelpayouts আন্তর্জাতিক ট্রাভেল হোল্ডিং Go Travel Un Limited-এর অংশ, যেটি ১৪টি দেশে কাজ করে।",
      "Affiliate Network Terms-এর ১.২ ধারা অনুযায়ী, ১৭ নভেম্বর ২০২৬ চেক করা: Travelpayouts ট্রেডমার্ক-এর মালিক Go Travel Un Limited, যা ১৮ আগস্ট ২০১১ তারিখে হংকং-এর স্পেশাল অ্যাডমিনিস্ট্রেটিভ রিজিয়নে একটি আইনি সত্তা হিসেবে নিবন্ধিত (রেজিস্ট্রেশন নম্বর ১৬৫৮৬৮১; ঠিকানা: 4007 Central Plaza, 18 Harbour Road, Wanchai, Hong Kong)।",
      "URAL-এর Travelpayouts অ্যাকাউন্ট মার্কার 675992। এটি এই ওয়েবসাইটকে কোনো রেফারেলের উৎস হিসেবে শনাক্ত করে; আপনার দাম বাবদ এর কোনো প্রভাব নেই।",
    ],
    travelpayoutsChecked: "সূত্রগুলো ১৭ নভেম্বর ২০২৬ চেক করা। সংখ্যাগুলো কোম্পানির কথা, URAL-এর নয়।",
    travelpayoutsSourcesHeading: "এই তথ্যের সূত্র কোথায়",
    travelpayoutsSources: [
      {
        id: "tp-about",
        label: "Travelpayouts — About us (১৪টি দেশের কথাটি)",
        url: "https://www.travelpayouts.com/about",
      },
      {
        id: "tp-terms",
        label: "Travelpayouts — Affiliate Network Terms, ১.২ ধারা (হংকং নিবন্ধনের কথাটি)",
        url: "https://support.travelpayouts.com/hc/en-us/articles/360004162111",
      },
    ],
    directoryHeading: "কাজ অনুযায়ী পার্টনার ডিরেক্টরি",
    directoryIntro:
      "আউটবাউন্ড লিংক নতুন ট্যাবে খোলে এবং sponsored হিসেবে চিহ্নিত। তালিকার শেষ কলামটি এই সাইটের ভেতরেই থাকে।",
    columns: { partner: "পার্টনার", what: "কী কাজে লাগে", whatYouGet: "কী পাবেন", where: "URAL-এ কোথায়" },
    groups: [
      {
        id: "flights",
        heading: "ফ্লাইট",
        rows: [
          {
            id: "ural-flights",
            partner: "URAL Flights (hosted search)",
            key: "uralFlights",
            affiliate: false,
            what: "এই সাইটের পেছনের হোস্টেড ফ্লাইট সার্চ, Travelpayouts-চালিত (Page 24232)",
            whatYouGet: "আপনার রুট, তারিখ ও যাত্রীসংখ্যা এয়ারলাইনের ইঞ্জিনে হস্তান্তর",
            whereLabel: "ফ্লাইট সার্চ ও রুট গাইড",
            wherePath: "/flights",
          },
          {
            id: "aviasales",
            partner: "Aviasales",
            key: "aviasales",
            affiliate: true,
            what: "এয়ারলাইন্স ও অনলাইন এজেন্সি জুড়ে ভাড়া তুলনা",
            whatYouGet: "বুকিংয়ের আগে real-time তুলনা",
            whereLabel: "ফ্লাইট সার্চ ও রুট গাইড",
            wherePath: "/flights",
          },
          {
            id: "kiwi",
            partner: "Kiwi.com",
            key: "kiwi",
            affiliate: true,
            what: "লো-কস্ট ও মাল্টি-সিটি রাউটিং, self-transfer সহ",
            whatYouGet: "একটি এয়ারলাইন যে যাত্রা বিক্রি করবে না, সেটি",
            whereLabel: "ফ্লাইট সার্চ ও রুট গাইড",
            wherePath: "/flights",
          },
        ],
      },
      {
        id: "stays",
        heading: "থাকার জায়গা",
        rows: [
          {
            id: "klook-hotels",
            partner: "Klook Hotels",
            key: "klookHotels",
            affiliate: true,
            what: "শহরের গাইডে আমরা যে হোটেল কালেকশন ব্যবহার করি",
            whatYouGet: "Klook-এর নিজস্ব বুকিং প্রক্রিয়ায় বাছাই করা তালিকা",
            whereLabel: "শহর অনুযায়ী হোটেল গাইড",
            wherePath: "/hotels",
          },
          {
            id: "kkday-hotels",
            partner: "KKday Hotels",
            key: "kkdayHotels",
            affiliate: true,
            what: "এশিয়া জুড়ে হোটেল ও থাকা",
            whatYouGet: "শহরটির জন্য KKday-এর বাছাই করা হোটেল তালিকা",
            whereLabel: "KKday হোটেল পাতা",
            wherePath: "/kkday-hotels",
          },
        ],
      },
      {
        id: "tours",
        heading: "ট্যুর ও আকর্ষণ",
        rows: [
          {
            id: "klook",
            partner: "Klook",
            key: "klook",
            affiliate: true,
            what: "আকর্ষণ গাইডে আমরা যে টিকিট ও অভিজ্ঞতা লিংক করি",
            whatYouGet: "আপনি যে টিকিট নিয়ে পড়ছিলেন, সেটিই তাৎক্ষণিক বুকিং",
            whereLabel: "আকর্ষণ হাব",
            wherePath: "/experiences",
          },
          {
            id: "tiqets",
            partner: "Tiqets",
            key: "tiqets",
            affiliate: true,
            what: "যেসব জাদুঘর আগেই বুক হয়ে যায়, তাদের টাইমড-এন্ট্রি টিকিট",
            whatYouGet: "একটি সময়ের স্লট, লাইন নয়",
            whereLabel: "ইউরোপীয় আকর্ষণ",
            wherePath: "/attractions",
          },
          {
            id: "gocity",
            partner: "Go City",
            key: "goCity",
            affiliate: true,
            what: "ইউরোপ ও আমেরিকার শহরগুলোর মাল্টি-আকর্ষণ পাস",
            whatYouGet: "প্রতিদিন দর দেওয়া পাস, প্রতি জাদুঘর নয়",
            whereLabel: "ইউরোপ, UK ও USA পাস",
            wherePath: "/experiences/europe",
          },
          {
            id: "kkday",
            partner: "KKday",
            key: "kkday",
            affiliate: true,
            what: "এশিয়া জুড়ে ট্যুর ও পাস",
            whatYouGet: "এশিয়া-কেন্দ্রিক ট্যুর ও বান্ডিল",
            whereLabel: "এশিয়া ও দুবাই পাস",
            wherePath: "/experiences/asia",
          },
        ],
      },
      {
        id: "connectivity",
        heading: "ইন্টারনেট",
        rows: [
          {
            id: "airalo",
            partner: "Airalo",
            key: "airalo",
            affiliate: true,
            what: "URAL যেসব দেশে পাঠক পাঠান, বেশিরভাগে ডেটা eSIM",
            whatYouGet: "ইমিগ্রেশন লাইনে ঢোকার আগেই চলমান মোবাইল ডেটা",
            whereLabel: "গন্তব্য গাইড",
            wherePath: "/destinations",
          },
          {
            id: "yesim",
            partner: "Yesim",
            key: "yesim",
            affiliate: true,
            what: "অল্টারনেটিভ eSIM প্রোভাইডার, আঞ্চলিক বান্ডিলসহ",
            whatYouGet: "একটি দেশ যথেষ্ট নয় হলে আঞ্চলিক প্লান",
            whereLabel: "ভিসা চেকলিস্ট",
            wherePath: "/visa",
          },
        ],
      },
      {
        id: "transfers",
        heading: "ট্রান্সফার ও পৌঁছানো",
        rows: [
          {
            id: "kiwitaxi",
            partner: "Kiwitaxi",
            key: "kiwitaxi",
            affiliate: true,
            what: "আমরা যেসব শহরে কভার করি, সেগুলোর প্রি-বুকড এয়ারপোর্ট ট্রান্সফার",
            whatYouGet: "আগমনে প্ল্যাকার্ডসহ ড্রাইভার",
            whereLabel: "ফ্লাইট সার্চ ও রুট গাইড",
            wherePath: "/flights",
          },
          {
            id: "gettransfer",
            partner: "GetTransfer",
            key: "getTransfer",
            affiliate: true,
            what: "ব্যক্তিগত ও ভাগাভাগি ট্রান্সফারের একটি মার্কেটপ্লেস",
            whatYouGet: "একই যাত্রার জন্য প্রতিদ্বন্দ্বী অফার",
            whereLabel: "ভিসা চেকলিস্ট (আগমনী অংশ)",
            wherePath: "/visa",
          },
          {
            id: "welcome-pickups",
            partner: "Welcome Pickups",
            key: "welcomePickups",
            affiliate: true,
            what: "স্থানীয় ইংরেজি-কথন ড্রাইভারসহ এয়ারপোর্ট পিকআপ",
            whatYouGet: "ফিক্সড প্রাইস, ড্রাইভারের পরিচয়, কাউন্টারে অপেক্ষা নেই",
            whereLabel: "উমরাহ ও হজ হাব",
            wherePath: "/umrah",
          },
        ],
      },
      {
        id: "protection",
        heading: "সুরক্ষা ও অতিরিক্ত",
        rows: [
          {
            id: "airhelp",
            partner: "AirHelp",
            key: "airhelp",
            affiliate: true,
            what: "ফ্লাইট দেরি, বাতিল বা ওভারবুক হলে ক্ষতিপূরণের দাবি পরিচালনা",
            whatYouGet: "তাদের মাধ্যমে ক্লেইম, পেমেন্টের একটি অংশের বিনিময়ে",
            whereLabel: "ফ্লাইট-বিঘ্ন দাবি টুল",
            wherePath: "/tools/flight-delay-claim",
          },
          {
            id: "qeeq",
            partner: "Qeeq",
            key: "qeeq",
            affiliate: true,
            what: "বেশিরভাগ বড় এয়ারপোর্টে গাড়ি ভাড়ার তুলনা",
            whatYouGet: "এক জায়গায় প্রতিদ্বন্দ্বী রেন্টাল অফার",
            whereLabel: "হোম পেজের Travel Essentials",
            wherePath: "/",
          },
          {
            id: "radical-storage",
            partner: "Radical Storage",
            key: "radicalStorage",
            affiliate: true,
            what: "বড় স্টেশন ও আকর্ষণগুলোর কাছে লাগেজ স্টোরেজ",
            whatYouGet: "বুকড স্টোরেজ স্লট, যত্রতত্র লকার নয়",
            whereLabel: "আকর্ষণ গাইড",
            wherePath: "/attractions",
          },
        ],
      },
    ],
    meaningHeading: "আপনার জন্য এর মানে কী",
    meaningPoints: [
      "গাইডে আগে অফিশিয়াল সূত্রের নাম থাকে, এবং পড়তে কখনো টাকা লাগে না।",
      "যদি কোনো পার্টনার লিংক URAL-কে কমিশন দেয়, সেটি চিহ্নিত থাকে; আপনি যে দাম দেন সেটি পার্টনারের দামই — URAL-এর কারণে বাড়ে না।",
      "কোনো কমিশন কোনো সুপারিশকে উপরে নেয় না, ভালো করে না বা বাদও দেয় না।",
    ],
    visasHeading: "ভিসা আবেদনের কাজটি আলাদা পার্টনার",
    visasBody:
      "ভিসার অংশটি পরিচালনা করে eVisas.com — একটি বেসরকারি ভিসা-সহায়তা সেবা। এটি Travelpayouts নয়, এই পাতার অন্য কোনো নামও নয়। কীভাবে কাজ হয় এবং URAL-এর ভূমিকা ঠিক কোথায় শেষ হয়, সব আলাদা পাতায় বলা আছে:",
    visasLinkLabel: "ভিসা সহায়তা কীভাবে কাজ করে",
    disclosure:
      "এই পার্টনারদের আউটবাউন্ড লিংকগুলো অ্যাফিলিয়েট লিংক, এবং প্রতিটি চিহ্নিত। যোগ্য কাজের ভিত্তিতে পার্টনার URAL-কে কমিশন দিতে পারে — আপনার কোনো বাড়তি খরচ ছাড়াই। URAL কোনো ইনভেন্টরি ধরে রাখে না, টাকা গ্রহণ করে না, এবং দাম, শর্ত বা বাতিলের নিয়ম নির্ধারণ করে না — সেগুলো পার্টনার নিজের সাইটে করে।",
    contactHeading: "কোনো পার্টনার নিয়ে প্রশ্ন?",
    contactBody: "WhatsApp (+8801784385335) অথবা ইমেইল support@uraltravel.co.uk-এ প্রশ্ন করুন; দুটোতেই গাইড যিনি লেখেন তাকেই পান।",
    footerNote: "পার্টনার ও শর্তাবলি শেষ যেদিন চেক করা হয়েছিল: ১৭ নভেম্বর ২০২৬।",
  },
};
