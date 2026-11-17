/**
 * Copy for `/about` in both languages.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * `/about` is rendered twice: once as a React route view (src/routes/AboutRouteView.tsx)
 * and once as prerendered HTML (src/utils/aboutPage.ts, injected by scripts/prerender.ts).
 * Before this table the two halves had drifted: the English body lived as an inline
 * template literal in prerender.ts while the Bengali body fell through to the generic
 * article builder, so the Bengali page said materially less than the English one.
 *
 * Both renderers now read this table, so a sentence cannot exist in one half and not
 * the other. Add copy here, never in a renderer.
 *
 * HOUSE RULES the wording obeys:
 * - No sentence may imply URAL processes visas, collects documents or decides outcomes.
 * - No commission rate, rev-share figure or partner approval-rate claim.
 * - No "trusted by" / "verified partner" / "best price" hype.
 * - Every figure carries a date and a source or it does not appear.
 */

export type AboutLocale = "en" | "bn";

export type AboutCapabilityIcon = "stamp" | "plane" | "bed" | "coins" | "pin";
export type AboutCommitmentIcon = "shield" | "file" | "link" | "globe";

export interface AboutCapability {
  id: string;
  icon: AboutCapabilityIcon;
  title: string;
  body: string;
  /** English path; the Bengali page localises it. */
  path: string;
  linkLabel: string;
}

export interface AboutCommitment {
  id: string;
  icon: AboutCommitmentIcon;
  title: string;
  body: string;
}

export interface AboutCopy {
  eyebrow: string;
  h1: string;
  intro: string;
  whatHeading: string;
  whatIntro: string;
  capabilities: readonly AboutCapability[];
  imageAlt: string;
  imageCaption: string;
  visasHeading: string;
  visasIntro: string;
  visasBoundaryLead: string;
  roleSplit: readonly string[];
  visasLinkLabel: string;
  moneyHeading: string;
  moneyBody: string;
  moneyLinkLabel: string;
  commitmentsHeading: string;
  commitments: readonly AboutCommitment[];
  founderLabel: string;
  founderName: string;
  founderBody: string;
  contactHeading: string;
  contactBody: string;
  contactWhatsappLabel: string;
  contactFormLabel: string;
}

export const ABOUT_COPY: Record<AboutLocale, AboutCopy> = {
  en: {
    eyebrow: "About URAL",
    h1: "Travel Intelligence. Not a Travel Agency.",
    intro:
      "URAL is an independent travel-information platform for Bangladeshi and global readers — no sponsored reviews, no paid placement inside a guide, and questions answered on WhatsApp or through the contact form.",
    whatHeading: "What URAL does",
    whatIntro:
      "Five things, in the order a trip needs them. Each one is built from official sources, and each one has its own guide.",
    capabilities: [
      {
        id: "visa",
        icon: "stamp",
        title: "Visa and entry rules",
        body: "Checked checklists for Nepal, Thailand, Malaysia, the UAE, Singapore, the Maldives, Saudi Arabia and Schengen — each dated, and each linked to the authority that decides it.",
        path: "/visa",
        linkLabel: "Visa guides and checklists",
      },
      {
        id: "flights",
        icon: "plane",
        title: "Flight options in BDT",
        body: "Route strategy for a Dhaka departure, plus a handoff to the hosted airline search. No invented schedules and no made-up fares.",
        path: "/flights",
        linkLabel: "Flight search and route guides",
      },
      {
        id: "hotels",
        icon: "bed",
        title: "Accommodation research",
        body: "Hotel zones explained by walking distance rather than map distance, so Makkah, Bangkok or Dubai pricing makes sense before you book.",
        path: "/hotels",
        linkLabel: "Hotel guides by city",
      },
      {
        id: "costs",
        icon: "coins",
        title: "Trip budgets in Taka",
        body: "Per-head planning ranges in BDT, each printed with the date it was checked, so a family can weigh a trip against its own income.",
        path: "/costs",
        linkLabel: "What a trip costs in BDT",
      },
      {
        id: "destinations",
        icon: "pin",
        title: "Destination guides",
        body: "Itineraries, halal food, transport and costs for the places Bangladeshi travellers actually go, written for a BDT wallet.",
        path: "/destinations",
        linkLabel: "Destination guides",
      },
    ],
    imageAlt:
      "A closed passport, a ticked checklist, reading glasses and a cup of tea on a desk in morning light",
    imageCaption:
      "The work behind every guide is the same: read the authority that decides the rule, check its date, then do the arithmetic in Taka.",
    visasHeading: "Visa application assistance, through eVisas",
    visasIntro:
      "URAL informs and refers. If you want help assembling and submitting an application, that help comes from eVisas.com, a private visa-assistance service, under its own terms and fees.",
    visasBoundaryLead: "Who does what — the boundary is worth stating plainly:",
    roleSplit: [
      "URAL does not process visa applications.",
      "URAL does not collect or submit passports or documents.",
      "URAL does not charge visa fees and does not decide outcomes.",
      "Assistance, document review, submission and support are eVisas' work, under its own terms.",
      "Approval and entry decisions rest with the destination government.",
      "Using eVisas is your choice, and the official government route is always worth checking first.",
    ],
    visasLinkLabel: "How visa assistance works",
    moneyHeading: "How URAL makes money",
    moneyBody:
      "Some outbound links are affiliate partner links, and each one is marked. If you book through one, URAL may earn a commission from the partner at no extra cost to you. The partner sets the price, the terms and the cancellation policy on its own site; a commission never changes what a guide recommends.",
    moneyLinkLabel: "The partners behind the booking links",
    commitmentsHeading: "Our editorial commitments",
    commitments: [
      {
        id: "no-paid-placement",
        icon: "shield",
        title: "No paid placement",
        body: "No airline, hotel or booking platform can pay to change what a guide says.",
      },
      {
        id: "dated-sourced",
        icon: "file",
        title: "Dated and sourced",
        body: "Every rule and fee carries the date it was last checked and the authority behind it.",
      },
      {
        id: "marked-links",
        icon: "link",
        title: "Links are marked",
        body: "Affiliate and official links are labelled wherever they appear.",
      },
      {
        id: "two-languages",
        icon: "globe",
        title: "Bengali and English",
        body: "Bengali pages are written for Bengali readers rather than machine-translated from the English.",
      },
    ],
    founderLabel: "Founder & Editor-in-Chief",
    founderName: "Farhan Momen",
    founderBody:
      "Farhan Momen writes and edits URAL. He checks the visa rule, does the arithmetic in Taka, and answers the WhatsApp messages when a reader disagrees with the page.",
    contactHeading: "Want to get in touch?",
    contactBody: "Reach us on WhatsApp (+8801784385335) or email — support@uraltravel.co.uk",
    contactWhatsappLabel: "Message on WhatsApp",
    contactFormLabel: "Inquiry form",
  },

  bn: {
    eyebrow: "আমাদের সম্পর্কে",
    h1: "ভ্রমণ ইন্টেলিজেন্স — প্রচলিত এজেন্সি নয়",
    intro:
      "URAL বাংলাদেশি ও বৈশ্বিক ভ্রমণকারীদের জন্য একটি স্বাধীন ট্রাভেল-ইনফরমেশন প্ল্যাটফর্ম — কোনো স্পনসরড রিভিউ নেই, গাইডের ভেতরে পেইড প্লেসমেন্ট নেই, আর প্রশ্নের উত্তর মেলে WhatsApp বা contact form-এ।",
    whatHeading: "URAL কী করে",
    whatIntro:
      "পাঁচটি কাজ, একটি ভ্রমণের প্রয়োজন অনুযায়ী সাজানো। প্রতিটি অফিশিয়াল সূত্র থেকে তৈরি, আর প্রতিটির নিজের গাইড আছে।",
    capabilities: [
      {
        id: "visa",
        icon: "stamp",
        title: "ভিসা ও প্রবেশের নিয়ম",
        body: "নেপাল, থাইল্যান্ড, মালয়েশিয়া, সংযুক্ত আরব আমিরাত, সিঙ্গাপুর, মালদ্বীপ, সৌদি আরব ও শেনজেনের যাচাই করা চেকলিস্ট — প্রতিটি তারিখসহ, আর সিদ্ধান্ত যে কর্তৃপক্ষ দেয় তার লিংকসহ।",
        path: "/visa",
        linkLabel: "ভিসা গাইড ও চেকলিস্ট",
      },
      {
        id: "flights",
        icon: "plane",
        title: "BDT-তে ফ্লাইটের বিকল্প",
        body: "ঢাকা থেকে ওঠার জন্য রুট-স্ট্র্যাটেজি, সঙ্গে হোস্টেড এয়ারলাইন সার্চে হ্যান্ডঅফ। বানানো শিডিউল নেই, ভুয়া ভাড়াও নেই।",
        path: "/flights",
        linkLabel: "ফ্লাইট সার্চ ও রুট গাইড",
      },
      {
        id: "hotels",
        icon: "bed",
        title: "আবাসন নিয়ে গবেষণা",
        body: "হোটেল জোন বোঝানো হয় হাঁটার দূরত্ব দিয়ে, ম্যাপের দূরত্ব দিয়ে নয় — তাই মক্কা, ব্যাংকক বা দুবাইয়ের দাম বুকিংয়ের আগেই বোঝা যায়।",
        path: "/hotels",
        linkLabel: "শহর অনুযায়ী হোটেল গাইড",
      },
      {
        id: "costs",
        icon: "coins",
        title: "টাকায় ট্রিপ বাজেট",
        body: "মাথাপিছু BDT পরিকল্পনা-রেঞ্জ, কোন তারিখে যাচাই করা হয়েছে তা লেখা — যাতে একটি পরিবার নিজের আয়ের সঙ্গে মিলিয়ে দেখতে পারে।",
        path: "/costs",
        linkLabel: "ট্রিপে কত খরচ হয়",
      },
      {
        id: "destinations",
        icon: "pin",
        title: "গন্তব্য গাইড",
        body: "বাংলাদেশি ভ্রমণকারীরা যেখানে সত্যিই যান — সেখানের রুটিন, হালাল খাবার, পরিবহন ও খরচ, টাকার হিসাব মাথায় রেখে লেখা।",
        path: "/destinations",
        linkLabel: "গন্তব্য গাইড",
      },
    ],
    imageAlt: "সকালের আলোয় ডেস্কে রাখা বন্ধ পাসপোর্ট, টিক দেওয়া চেকলিস্ট, চশমা আর এক কাপ চা",
    imageCaption:
      "প্রতিটি গাইডের পেছনে একই কাজ: যে কর্তৃপক্ষ সিদ্ধান্ত দেয় তার নথি পড়া, তারিখ মিলিয়ে দেখা, আর টাকায় হিসাব কষা।",
    visasHeading: "eVisas-এর মাধ্যমে ভিসা আবেদনে সহায়তা",
    visasIntro:
      "URAL তথ্য দেয় এবং রেফার করে। আবেদন সাজানো ও জমা দেওয়ার জন্য সহায়তা চাইলে সেটি আসে eVisas.com থেকে — একটি বেসরকারি ভিসা-সহায়তা সেবা, তাদের নিজস্ব শর্ত ও ফি অনুযায়ী।",
    visasBoundaryLead: "কে কী করে — সীমারেখাটি স্পষ্ট করে বলা দরকার:",
    roleSplit: [
      "URAL কোনো ভিসা আবেদন প্রক্রিয়া করে না।",
      "URAL পাসপোর্ট বা নথি সংগ্রহ করে না, জমাও দেয় না।",
      "URAL ভিসা ফি নেয় না এবং কোনো সিদ্ধান্তও দেয় না।",
      "আবেদনে সহায়তা, নথি পর্যালোচনা, জমা দেওয়া ও সাপোর্ট — সবই eVisas-এর নিজস্ব শর্ত অনুযায়ী।",
      "অনুমোদন ও প্রবেশের সিদ্ধান্ত সংশ্লিষ্ট দেশের সরকারের হাতে।",
      "eVisas ব্যবহার করা আপনার নিজের সিদ্ধান্ত; সরকারি অফিশিয়াল পথটি সবসময় আগে যাচাই করা উচিত।",
    ],
    visasLinkLabel: "ভিসা সহায়তা কীভাবে কাজ করে",
    moneyHeading: "URAL কীভাবে আয় করে",
    moneyBody:
      "কিছু আউটবাউন্ড লিংক অ্যাফিলিয়েট পার্টনার লিংক, এবং প্রতিটি চিহ্নিত। সেগুলোর মাধ্যমে বুক করলে পার্টনার URAL-কে কমিশন দিতে পারে — আপনার অতিরিক্ত কোনো খরচ ছাড়াই। দাম, শর্ত ও বাতিলের নীতি নির্ধারণ করে পার্টনার তার নিজের সাইটে; কমিশনের বিনিময়ে URAL কখনো কোনো সুপারিশ বদলায় না।",
    moneyLinkLabel: "বুকিং লিংকের পেছনের পার্টনাররা",
    commitmentsHeading: "আমাদের সম্পাদকীয় অঙ্গীকার",
    commitments: [
      {
        id: "no-paid-placement",
        icon: "shield",
        title: "পেইড প্লেসমেন্ট নেই",
        body: "কোনো এয়ারলাইন, হোটেল বা বুকিং প্ল্যাটফর্ম টাকা দিয়ে গাইডের কথা বদলাতে পারে না।",
      },
      {
        id: "dated-sourced",
        icon: "file",
        title: "তারিখ ও সূত্রসহ",
        body: "প্রতিটি নিয়ম ও ফি-র পাশে থাকে শেষ যাচাইয়ের তারিখ, আর তার পেছনের কর্তৃপক্ষের নাম।",
      },
      {
        id: "marked-links",
        icon: "link",
        title: "লিংক চিহ্নিত",
        body: "অ্যাফিলিয়েট ও অফিশিয়াল লিংক যেখানে আছে সেখানেই চিহ্নিত করা থাকে।",
      },
      {
        id: "two-languages",
        icon: "globe",
        title: "বাংলা ও ইংরেজি",
        body: "বাংলা পাতা বাংলা পাঠকের জন্য লেখা, ইংরেজি থেকে মেশিন-অনুবাদ করা নয়।",
      },
    ],
    founderLabel: "প্রতিষ্ঠাতা ও প্রধান সম্পাদক",
    founderName: "Farhan Momen",
    founderBody:
      "ফারহান মোমেন URAL লিখেন ও সম্পাদনা করেন। ভিসার নিয়ম তিনিই যাচাই করেন, টাকায় ট্রিপের হিসাব তিনিই কষেন, আর পাঠক পেজের কথার সঙ্গে দ্বিমত করলে সেই WhatsApp বার্তার উত্তরও তিনিই দেন।",
    contactHeading: "যোগাযোগ করতে চান?",
    contactBody:
      "WhatsApp, হটলাইন (+8801784385335) বা ইমেইলে যোগাযোগ করুন — support@uraltravel.co.uk",
    contactWhatsappLabel: "WhatsApp-এ মেসেজ করুন",
    contactFormLabel: "ইনকোয়ারি ফর্ম",
  },
};

/**
 * Prefix an English site path with `/bn` when rendering the Bengali page.
 *
 * `/about` has no Bengali twin of its children under a different name: the
 * Bengali site mirrors the English path space exactly (`/visa` → `/bn/visa`),
 * so the only transformation needed is the locale prefix.
 */
export function aboutLocalizedPath(path: string, locale: AboutLocale): string {
  if (locale !== "bn") return path;
  return path === "/" ? "/bn" : `/bn${path}`;
}
