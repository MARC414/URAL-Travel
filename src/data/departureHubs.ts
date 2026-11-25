import type { Language } from "../translations";

export type DepartureMarket = "bangladesh" | "uk";
export interface DepartureHubRecord {
  market: DepartureMarket;
  path: string;
  /** Material edit of this index, not a supplier-price or visa-rule check. */
  updatedAt: string;
  copy: Record<Language, {
    title: string;
    description: string;
    h1: string;
    intro: string;
    qualification: string;
    /**
     * Optional photo-hero copy. Only a market with a designed hero sets this;
     * a market without it keeps the plain text header.
     */
    hero?: {
      lead: string;
      primaryLabel: string;
      secondaryLabel: string;
    };
  }>;
  sections: readonly {
    id: string;
    title: Record<Language, string>;
    links: readonly { path: string; label: Record<Language, string> }[];
  }[];
}

// F01's shared bilingual index, recovered from unmerged 0418fe7. Links refer
// to existing guides, not new flight inventory, prices or immigration rulings.
export const DEPARTURE_HUBS: Partial<Record<DepartureMarket, DepartureHubRecord>> = {
  bangladesh: {
    market: "bangladesh",
    path: "/bangladesh",
    updatedAt: "2026-11-23",
    copy: {
      en: {
        title: "Travelling from Bangladesh: Flights, Visas & Departure Guides | URAL",
        description: "Plan a departure from Bangladesh with Dhaka flight guides, Bangladeshi-passport visa checklists, money and card guidance, airport preparation and Umrah planning.",
        h1: "Travelling from Bangladesh: Start Here",
        intro: "Start with the decision you need to make before leaving Bangladesh. These guides cover Dhaka flight routes, Bangladeshi-passport entry checks, BDT budgets, cards, airport preparation and pilgrimage planning. Open the relevant guide for its sources and details; this page is an index, not a booking or visa-application service.",
        qualification: "Departure country does not determine visa eligibility. If you hold another passport or live abroad, check the rules for your nationality and residence. Confirm current entry conditions, flight availability and baggage rules with the official authority or airline before paying.",
        hero: {
          lead: "Your route, your visa, your money and your airport day decide how the trip goes. Start with the one you have not settled yet.",
          primaryLabel: "Start with flights",
          secondaryLabel: "Check visa rules",
        },
      },
      bn: {
        title: "বাংলাদেশ থেকে ভ্রমণ: ফ্লাইট, ভিসা ও যাত্রার প্রস্তুতি | URAL",
        description: "বাংলাদেশ থেকে যাত্রার পরিকল্পনা করুন — ঢাকার ফ্লাইট গাইড, বাংলাদেশি পাসপোর্টের ভিসা চেকলিস্ট, টাকা ও কার্ডের নির্দেশনা, বিমানবন্দরের প্রস্তুতি এবং ওমরাহ পরিকল্পনা।",
        h1: "বাংলাদেশ থেকে ভ্রমণ: এখান থেকেই শুরু করুন",
        intro: "বাংলাদেশ ছাড়ার আগে যে সিদ্ধান্তটি নিতে হবে, সেটি দিয়েই শুরু করুন। এখানে ঢাকার ফ্লাইট রুট, বাংলাদেশি পাসপোর্টের প্রবেশের শর্ত, টাকায় বাজেট, কার্ড, বিমানবন্দরের প্রস্তুতি ও তীর্থযাত্রার গাইড আছে। সূত্র ও বিস্তারিত জানতে সংশ্লিষ্ট গাইড খুলুন; এই পাতা একটি গাইড সূচি, বুকিং বা ভিসা আবেদনের সেবা নয়।",
        qualification: "কোন দেশ থেকে যাত্রা করছেন, তা দিয়ে ভিসার যোগ্যতা নির্ধারিত হয় না। অন্য দেশের পাসপোর্ট থাকলে বা বিদেশে বসবাস করলে আপনার জাতীয়তা ও বসবাসের অবস্থার জন্য প্রযোজ্য নিয়ম যাচাই করুন। টাকা দেওয়ার আগে সংশ্লিষ্ট সরকারি কর্তৃপক্ষ বা এয়ারলাইনের কাছে বর্তমান প্রবেশের শর্ত, ফ্লাইটের প্রাপ্যতা ও ব্যাগেজের নিয়ম নিশ্চিত করুন।",
        hero: {
          lead: "আপনার রুট, ভিসা, টাকা আর বিমানবন্দরের দিনটিই ঠিক করে ভ্রমণ কেমন হবে। যেটি এখনো ঠিক করেননি, সেটি দিয়েই শুরু করুন।",
          primaryLabel: "ফ্লাইট দিয়ে শুরু করুন",
          secondaryLabel: "ভিসার নিয়ম দেখুন",
        },
      },
    },
    sections: [
      {
        id: "flights",
        title: { en: "Flights out of Dhaka", bn: "ঢাকা থেকে ফ্লাইট" },
        links: [
          { path: "/flights", label: { en: "Global flight search and Dhaka route guides", bn: "বিশ্বব্যাপী ফ্লাইট সার্চ ও ঢাকার রুট গাইড" } },
          { path: "/flights/dhaka-kuala-lumpur", label: { en: "Dhaka to Kuala Lumpur", bn: "ঢাকা থেকে কুয়ালালামপুর" } },
          { path: "/flights/dhaka-bangkok", label: { en: "Dhaka to Bangkok", bn: "ঢাকা থেকে ব্যাংকক" } },
          { path: "/flights/dhaka-dubai", label: { en: "Dhaka to Dubai", bn: "ঢাকা থেকে দুবাই" } },
          { path: "/flights/dhaka-kathmandu", label: { en: "Dhaka to Kathmandu", bn: "ঢাকা থেকে কাঠমান্ডু" } },
          { path: "/flights/dhaka-madinah", label: { en: "Dhaka to Madinah", bn: "ঢাকা থেকে মদিনা" } },
        ],
      },
      {
        id: "entry",
        title: { en: "Visa and entry checks", bn: "ভিসা ও প্রবেশের শর্ত যাচাই" },
        links: [
          { path: "/visa", label: { en: "Visa guides for Bangladeshi passport holders", bn: "বাংলাদেশি পাসপোর্টের ভিসা গাইড" } },
          { path: "/visa-free-countries", label: { en: "Visa-free, arrival and transit checks", bn: "ভিসামুক্ত প্রবেশ, অন-অ্যারাইভাল ও ট্রানজিটের শর্ত" } },
          { path: "/visa-assistance", label: { en: "Official application routes and optional private assistance", bn: "সরকারি আবেদনপথ ও ঐচ্ছিক বেসরকারি সহায়তা" } },
        ],
      },
      {
        id: "money",
        title: { en: "Money before you fly", bn: "যাত্রার আগে টাকার হিসাব" },
        links: [
          { path: "/banking", label: { en: "Dollar endorsement, cards and NOC", bn: "ডলার এনডোর্সমেন্ট, কার্ড ও NOC" } },
          { path: "/costs", label: { en: "Trip budgets entered in BDT", bn: "বাংলাদেশি টাকায় ভ্রমণ বাজেট" } },
        ],
      },
      {
        id: "preparation",
        title: { en: "Airport and departure preparation", bn: "বিমানবন্দর ও যাত্রার প্রস্তুতি" },
        links: [
          { path: "/pre-departure", label: { en: "Dhaka airport pre-departure checklist", bn: "ঢাকা বিমানবন্দরের যাত্রাপূর্ব চেকলিস্ট" } },
          { path: "/tools", label: { en: "Currency, budget and packing tools", bn: "মুদ্রা, বাজেট ও প্যাকিং টুল" } },
        ],
      },
      {
        id: "pilgrimage",
        title: { en: "Umrah and Hajj planning", bn: "ওমরাহ ও হজ পরিকল্পনা" },
        links: [
          { path: "/umrah", label: { en: "Umrah planning and separate Hajj registration guidance", bn: "ওমরাহ পরিকল্পনা ও হজের পৃথক নিবন্ধন নির্দেশনা" } },
          { path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost", label: { en: "DIY Umrah: visa, Nusuk and BDT budgeting", bn: "নিজে ওমরাহ: ভিসা, Nusuk ও টাকায় বাজেট" } },
        ],
      },
    ],
  },
};

export function getDepartureHub(market: DepartureMarket): DepartureHubRecord | null {
  return DEPARTURE_HUBS[market] ?? null;
}
