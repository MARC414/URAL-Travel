/**
 * Copy for `/visa-assistance` in both languages.
 *
 * Mirrors src/utils/partnersCopy.ts: the React half
 * (src/components/VisaAssistancePage.tsx) and the prerendered half
 * (renderVisaAssistanceStaticHtml in visaAssistancePage.ts) both read this
 * table, so the two cannot drift. Add copy here, never in a renderer.
 *
 * HOUSE RULES the wording obeys:
 * - No sentence may imply URAL processes visas, collects documents or decides
 *   outcomes. URAL informs and refers; that is the whole of its role.
 * - eVisas is always named as a private, paid service. Its own words — "we are
 *   not a government agency and are not affiliated with any government agency" —
 *   are quoted and linked, never paraphrased into something stronger.
 * - Provider figures (42+ destinations, 9+ years, 10,000+ visas) are attributed
 *   to the company with the date checked. URAL does not restate them as its own
 *   findings, and publishes no approval rate.
 * - The catalogue is not eligibility: the dated Bangladeshi snapshot is labelled
 *   as a snapshot, its conditions are named, and the reader is sent to the
 *   checker for the live answer.
 * - Every outbound link is a registry URL or an official source. The affiliate
 *   link carries rel="noopener noreferrer sponsored" and the site disclosure.
 */

import { EVISAS_BANGLADESH_DESTINATIONS, EVISAS_CONDITIONAL_DESTINATIONS } from "../data/evisaProgram";

export type VisaAssistanceLocale = "en" | "bn";

export interface VisaAssistanceFaq {
  id: string;
  question: string;
  answer: string;
}

export interface VisaAssistanceCopy {
  eyebrow: string;
  h1: string;
  intro: string;
  quickAnswerHeading: string;
  quickAnswer: string;
  relationshipHeading: string;
  relationshipPoints: readonly string[];
  howHeading: string;
  howIntro: string;
  steps: readonly { title: string; body: string }[];
  whoHeading: string;
  whoParagraphs: readonly string[];
  whoQuoteLead: string;
  whoQuote: string;
  whoChecked: string;
  destinationsHeading: string;
  destinationsIntro: string;
  /** Dated catalogue snapshot. Empty when the module could not be read. */
  destinationsSnapshotLead: string;
  destinationsNote: string;
  conditionalLead: string;
  destinationsLinkLabel: string;
  officialFirstHeading: string;
  officialFirstPoints: readonly string[];
  officialFirstLinkLabel: string;
  notHeading: string;
  notPoints: readonly string[];
  applyHeading: string;
  applyBody: string;
  applyLinkLabel: string;
  disclosure: string;
  faqHeading: string;
  faqs: readonly VisaAssistanceFaq[];
  sourcesHeading: string;
  footerNote: string;
}

/** Dated read of eVisas' own pages; every figure below traces to one of them. */
export const EVISAS_FACTS_CHECKED = "17 November 2026";

const BANGLADESH_SNAPSHOT = EVISAS_BANGLADESH_DESTINATIONS.join(", ");
const CONDITIONAL_SNAPSHOT = EVISAS_CONDITIONAL_DESTINATIONS.join(", ");

export const VISA_ASSISTANCE_COPY: Record<VisaAssistanceLocale, VisaAssistanceCopy> = {
  en: {
    eyebrow: "Visa application assistance",
    h1: "Visa application assistance, and where URAL's role ends",
    intro:
      "URAL gives you the rule, the checklist and the official source, and refers you onward. If you want the peace of mind of a paid service that reviews your documents and submits the application for you, eVisas.com offers expert assistance. They check your paperwork before it reaches the government. This page sets out what eVisas is, what it costs on top of the government fee, and what neither URAL nor eVisas can do.",

    quickAnswerHeading: "Quick answer",
    quickAnswer:
      "URAL provides visa information and referrals. eVisas.com provides paid application assistance in 42+ destinations (its own figure). It is a private service, not a government agency, and it does not issue visas: the decision rests with the destination government. Applying yourself on the official portal usually costs less, because you pay only the government fee.",

    relationshipHeading: "How URAL and eVisas work together",
    relationshipPoints: [
      "URAL informs and refers. Its visa guides, checklists and cost pages are free to read and name the official source first.",
      "eVisas prepares, reviews and submits applications for a fee, under its own terms. URAL does not do any of that work.",
      "URAL may earn a commission when a reader applies through a marked link, at no extra cost to that reader. URAL publishes no rate and no deal term.",
      "A commission never changes which route a guide recommends. Where the official portal is the better answer, the guide says so and links it.",
    ],

    howHeading: "How eVisas works",
    howIntro:
      "Four steps, as eVisas describes them on its own About page (checked 17 November 2026). A trained consultant reviews each application before it is submitted.",
    steps: [
      {
        title: "Expert Human Review",
        body: "You choose your destination and nationality. eVisas confirms what you qualify for and a trained consultant reviews your details before anything goes to the embassy.",
      },
      {
        title: "Simplified Guided Forms",
        body: "Confusing embassy paperwork is simplified into one guided form that adapts to your trip. You can save your progress and upload your passport and photo directly to eVisas.",
      },
      {
        title: "Pay the government fee plus the service fee",
        body: "eVisas charges one total made up of the government fee and its own service fee, in US Dollars, through Stripe. The price and any processing tier are shown before you pay.",
      },
      {
        title: "Receive the decision",
        body: "eVisas submits the application and tracks its status. The decision and any entry permission come from the destination authority, not from eVisas.",
      },
    ],

    whoHeading: "Who eVisas is",
    whoParagraphs: [
      "eVisas.com is operated by TravelRox, Inc., a Delaware corporation with its address at 169 Madison Avenue, New York. Its own terms describe it as a private visa-advisory and assistance service operating since 2016.",
      "The company publishes three figures about itself: 42+ destinations, 9+ years of operation and more than 10,000 visas processed. Those are its figures, quoted here with the date they were checked rather than repeated as URAL's findings. It also publishes an approval-rate figure, which URAL does not repeat: an approval rate is the provider's claim about its own customers, and it is not evidence about your application.",
    ],
    whoQuoteLead: "On the question that matters most, eVisas states it in its own terms:",
    whoQuote:
      "We are not a government agency and are not affiliated with any government agency. We do not issue visas and we do not decide the outcome of any application.",
    whoChecked: "eVisas Terms & Conditions, \"About eVisas\", last reviewed 14 October 2026; checked 17 November 2026.",

    destinationsHeading: "Destinations and your passport",
    destinationsIntro:
      "eVisas publishes 42+ destinations in its catalogue. That catalogue is a list of what it sells, not a list of what your passport qualifies for: some entries need residence or an existing visa, and a nationality can be absent entirely.",
    destinationsSnapshotLead:
      "URAL checked eVisas' destination list for a Bangladeshi passport on 15 November 2026. Sixteen destinations were listed:",
    destinationsNote:
      "That is a dated snapshot, not a live eligibility check, and it is not a promise that a Bangladeshi passport holder will be approved for any of them. Thailand is not on that list, so Bangladeshi passport holders use the official Thai e-Visa portal; eVisas' Thailand service covers other nationalities. Check the checker for the current list against your own passport before you rely on any of this.",
    conditionalLead:
      "The same dated snapshot marks these as needing more than nationality — residence, or a visa you already hold:",
    destinationsLinkLabel: "Visa guides and checklists by country",

    officialFirstHeading: "When the official portal is the better route",
    officialFirstPoints: [
      "Applying yourself on the government's own portal costs the government fee and nothing else. A paid intermediary charges that fee plus its own service fee.",
      "Some destinations require the applicant to apply in person or through an accredited agent. Check the destination's own rule before paying anyone.",
      "If your passport is not served by a paid provider at all, the official portal is the only route. Thailand is the live example for Bangladeshi passports.",
      "A visa is a permission to travel, not a guarantee of entry. Neither URAL nor eVisas can promise approval or admission.",
    ],
    officialFirstLinkLabel: "Official sources directory",

    notHeading: "What URAL does not do",
    notPoints: [
      "URAL does not process visa applications.",
      "URAL does not collect or submit passports, photographs or documents.",
      "URAL does not charge visa fees, and does not decide or influence outcomes.",
      "URAL does not hold itself out as a government agency, an embassy or an accredited agent.",
      "URAL does not quote a price for a visa. The provider's checkout and the government's own schedule decide that.",
    ],

    applyHeading: "Applying through eVisas",
    applyBody:
      "The link below is an affiliate link and is marked as one. It opens eVisas' own destination chooser, where eligibility for your passport, the documents required and the full fee are shown before you commit to anything. URAL never sees your application or your documents.",
    applyLinkLabel: "Check visa options and apply through eVisas",

    disclosure:
      "URAL may earn a commission if you apply through the link above, at no extra cost to you. eVisas is a private, paid visa-application service operated by TravelRox, Inc. It is not a government agency, does not issue visas, and does not decide outcomes. Check the official government route and the provider's full fees before applying.",

    faqHeading: "Questions this page gets asked",
    faqs: [
      {
        id: "government",
        question: "Is eVisas a government website?",
        answer:
          "No. eVisas states in its own terms that it is a private visa-advisory and assistance service operated by TravelRox, Inc., that it is not a government agency and is not affiliated with any government agency, and that it does not issue visas. The destination government's own portal is the official route.",
      },
      {
        id: "who-processes",
        question: "Who actually processes my application?",
        answer:
          "eVisas prepares and submits it, and a trained consultant reviews it before submission. The authority that decides it is the destination government's immigration service. eVisas does not grant, refuse or promise a visa, and an approved visa does not by itself guarantee entry.",
      },
      {
        id: "cost",
        question: "What does it cost compared with applying myself?",
        answer:
          "Applying yourself costs the government fee. eVisas charges the government fee plus its own service fee, in US Dollars, shown as one total before you pay. Where it offers processing tiers, the tier you choose changes both the price and the estimated turnaround. URAL does not publish either figure, because only the provider's checkout for your destination and passport states them.",
      },
      {
        id: "cheaper",
        question: "Can I apply directly instead?",
        answer:
          "Usually yes, and it normally costs less. Some destinations require an in-person application or an accredited agent, so check that destination's own rule first. Where a paid provider does not serve your passport at all — Thailand for Bangladeshi passports, for example — the official portal is the only route.",
      },
      {
        id: "who-approves",
        question: "Who approves the visa?",
        answer:
          "The destination government, and only the destination government. Neither URAL nor eVisas approves, refuses or influences an application, and neither can promise a processing time. Approval and entry decisions rest with the relevant authority.",
      },
    ],

    sourcesHeading: "Sources for this page",
    footerNote: "eVisas' own pages checked 17 November 2026; Bangladeshi destination list checked 15 November 2026.",
  },

  bn: {
    eyebrow: "ভিসা আবেদনে সহায়তা",
    h1: "ভিসা আবেদনে সহায়তা, এবং URAL-এর ভূমিকা যেখানে শেষ",
    intro:
      "URAL আপনাকে নিয়ম, চেকলিস্ট ও সরকারি সূত্র দেয়, তারপর সামনের দিকে পাঠায়। আপনি যদি চান কোনো পেইড সেবা আপনার হয়ে আবেদন সাজিয়ে জমা দিক, সেই সেবাটি eVisas.com। এই পাতায় বলা আছে eVisas আসলে কী, সরকারি ফি-র ওপর তারা কত নেয়, এবং URAL বা eVisas — কারও পক্ষে কী করা সম্ভব নয়।",

    quickAnswerHeading: "এক লাইনে",
    quickAnswer:
      "URAL ভিসার তথ্য দেয় এবং রেফার করে। eVisas.com পেইড আবেদন-সহায়তা দেয় ৪২+ গন্তব্যে (তাদের নিজের সংখ্যা)। এটি একটি বেসরকারি সেবা, সরকারি সংস্থা নয়, এবং ভিসা ইস্যু করে না — সিদ্ধান্ত নেয় গন্তব্য দেশের সরকার। নিজে সরকারি পোর্টালে আবেদন করলে সাধারণত কম খরচ হয়, কারণ তখন শুধু সরকারি ফি দিতে হয়।",

    relationshipHeading: "URAL ও eVisas কীভাবে একসঙ্গে কাজ করে",
    relationshipPoints: [
      "URAL তথ্য দেয় ও রেফার করে। তার ভিসা গাইড, চেকলিস্ট ও খরচের পাতা পড়তে ফ্রি, আর প্রতিটিতে আগে সরকারি সূত্রের নাম থাকে।",
      "eVisas ফি-র বিনিময়ে আবেদন সাজায়, পর্যালোচনা করে ও জমা দেয় — তাদের নিজস্ব শর্তে। এই কাজগুলোর কোনোটিই URAL করে না।",
      "চিহ্নিত লিংকের মাধ্যমে পাঠক আবেদন করলে URAL কমিশন পেতে পারে, পাঠকের কোনো বাড়তি খরচ ছাড়াই। URAL কোনো হার বা চুক্তির শর্ত প্রকাশ করে না।",
      "কোন রুটটি একটি গাইড সুপারিশ করে, তা কোনো কমিশন বদলায় না। যেখানে সরকারি পোর্টালই ভালো উত্তর, সেখানে গাইড সেটাই বলে এবং লিংক দেয়।",
    ],

    howHeading: "eVisas কীভাবে কাজ করে",
    howIntro:
      "চারটি ধাপ, eVisas-এর নিজের পরিচিতি পাতা অনুযায়ী (১৭ নভেম্বর ২০২৬ চেক করা)। জমা দেওয়ার আগে প্রতিটি আবেদন একজন প্রশিক্ষিত consultant পর্যালোচনা করেন।",
    steps: [
      {
        title: "যোগ্যতা দেখে নিন",
        body: "আপনি গন্তব্য ও নাগরিকত্ব বেছে নিলে eVisas দেখায় ওই পাসপোর্টের জন্য তারা কোন ধরনের ভিসায় সহায়তা করতে পারে।",
      },
      {
        title: "গাইডেড ফর্ম পূরণ করুন",
        body: "ফর্মটি গন্তব্য ও ভিসার ধরন অনুযায়ী বদলায়। খসড়া সেভ করে পরে আবার শুরু করা যায়, আর পাসপোর্ট ও ছবি eVisas-এ আপলোড করতে হয়।",
      },
      {
        title: "সরকারি ফি ও সার্ভিস ফি — দুটোই দিন",
        body: "eVisas একটি মোট অঙ্কে নেয়, যাতে থাকে সরকারি ফি আর তাদের নিজের সার্ভিস ফি, US Dollar-এ, Stripe-এর মাধ্যমে। দাম এবং কোনো processing tier থাকলে তা পরিশোধের আগেই দেখানো হয়।",
      },
      {
        title: "সিদ্ধান্ত পান",
        body: "eVisas আবেদন জমা দেয় এবং অবস্থা ট্র্যাক করে। সিদ্ধান্ত এবং প্রবেশের অনুমতি আসে গন্তব্য দেশের কর্তৃপক্ষের কাছ থেকে, eVisas থেকে নয়।",
      },
    ],

    whoHeading: "eVisas কে",
    whoParagraphs: [
      "eVisas.com পরিচালনা করে TravelRox, Inc. — একটি Delaware কর্পোরেশন, ঠিকানা 169 Madison Avenue, New York। তাদের নিজের শর্তানুযায়ী, তারা ২০১৬ থেকে চলা একটি বেসরকারি ভিসা-পরামর্শ ও সহায়তা সেবা।",
      "কোম্পানিটি নিজের সম্পর্কে তিনটি সংখ্যা দেয়: ৪২+ গন্তব্য, ৯+ বছরের অভিজ্ঞতা এবং ১০,০০০-এর বেশি ভিসা প্রক্রিয়া। এগুলো তাদের সংখ্যা — এখানে চেক করার তারিখসহ উদ্ধৃত করা হচ্ছে, URAL-এর নিজস্ব প্রাপ্ত তথ্য হিসেবে নয়। তারা একটি approval-rate-ও প্রকাশ করে, যা URAL পুনরুক্তি করে না: অনুমোদনের হার সেবাদাতার নিজের ক্লায়েন্ট সম্পর্কে তার দাবি, আর সেটি আপনার আবেদন সম্পর্কে কোনো প্রমাণ নয়।",
    ],
    whoQuoteLead: "যে প্রশ্নটিই সবচেয়ে গুরুত্বপূর্ণ, সেটিতে eVisas নিজের শর্তে যা বলে:",
    whoQuote:
      "We are not a government agency and are not affiliated with any government agency. We do not issue visas and we do not decide the outcome of any application.",
    whoChecked: "eVisas Terms & Conditions, \"About eVisas\" অংশ, শেষ পর্যালোচনা ১৪ অক্টোবর ২০২৬; ১৭ নভেম্বর ২০২৬ চেক করা।",

    destinationsHeading: "গন্তব্য ও আপনার পাসপোর্ট",
    destinationsIntro:
      "eVisas তার ক্যাটালগে ৪২+ গন্তব্যের কথা বলে। কিন্তু ওই ক্যাটালগ তারা কী বিক্রি করে তার তালিকা — আপনার পাসপোর্টের জন্য কী মেলে তার তালিকা নয়: কিছু এন্ট্রিতে বসবাস বা আগে থেকে থাকা ভিসা লাগে, আর কোনো জাতীয়তাও তালিকায় নাও থাকতে পারে।",
    destinationsSnapshotLead:
      "URAL ১৫ নভেম্বর ২০২৬-এ eVisas-এর তালিকায় বাংলাদেশি পাসপোর্টের জন্য কী আছে দেখেছিল। ষোলটি গন্তব্য তালিকাভুক্ত ছিল:",
    destinationsNote:
      "এটি একটি তারিখসহ স্ন্যাপশট, লাইভ যোগ্যতা যাচাই নয় — এবং এটি এই প্রতিশ্রুতি নয় যে বাংলাদেশি পাসপোর্টধারী এগুলোর কোনোটির জন্যই অনুমোদন পাবেন। থাইল্যান্ড ওই তালিকায় নেই, তাই বাংলাদেশি পাসপোর্টধারীদের জন্য সরকারি থাই ই-ভিসা পোর্টালই ব্যবহার করুন; eVisas-এর থাইল্যান্ড সেবা অন্য জাতীয়তার জন্য। কোনোটিই নির্ভর করার আগে নিজের পাসপোর্টে বর্তমান তালিকা চেকারে দেখে নিন।",
    conditionalLead:
      "একই স্ন্যাপশটে এগুলোকে চিহ্নিত করা হয়েছে শুধু জাতীয়তার বেশি কিছু প্রয়োজন বলে — বসবাস, অথবা আপনার আগে থেকে থাকা ভিসা:",
    destinationsLinkLabel: "দেশভিত্তিক ভিসা গাইড ও চেকলিস্ট",

    officialFirstHeading: "কখন সরকারি পোর্টালই ভালো পথ",
    officialFirstPoints: [
      "নিজে সরকারের পোর্টালে আবেদন করলে লাগে শুধু সরকারি ফি। কোনো এজেন্সি বা বেসরকারি সেবা নিলে সেই ফি-র সঙ্গে তাদের সার্ভিস ফি-ও যোগ হয়।",
      "কিছু গন্তব্যে আবেদন নিজে উপস্থিত হয়ে করতে হয়, কিংবা অনুমোদিত agent-এর মাধ্যমে। কারও কাছে টাকা দেওয়ার আগে ওই দেশের নিয়ম দেখে নিন।",
      "কোনো পেইড সেবাদাতা আপনার পাসপোর্টে সেবা দেয়ই না এমনও ঘটে। বাংলাদেশি পাসপোর্টে থাইল্যান্ড সেই উদাহরণ।",
      "ভিসা হলো ভ্রমণের অনুমতি, প্রবেশের নিশ্চয়তা নয়। URAL বা eVisas — কেউই অনুমোদন বা প্রবেশের প্রতিশ্রুতি দিতে পারে না।",
    ],
    officialFirstLinkLabel: "সরকারি সূত্রের তালিকা",

    notHeading: "URAL যা করে না",
    notPoints: [
      "URAL কোনো ভিসা আবেদন প্রক্রিয়া করে না।",
      "URAL পাসপোর্ট, ছবি বা নথি সংগ্রহ করে না, জমাও দেয় না।",
      "URAL ভিসা ফি নেয় না, এবং কোনো সিদ্ধান্ত দেয় না বা তা প্রভাবিতও করে না।",
      "URAL নিজেকে সরকারি সংস্থা, দূতাবাস বা অনুমোদিত agent হিসেবে উপস্থাপন করে না।",
      "URAL কোনো ভিসার দাম উদ্ধৃত করে না। দাম ঠিক করে সেবাদাতার চেকআউট আর সরকারের নিজের তালিকা।",
    ],

    applyHeading: "eVisas-এর মাধ্যমে আবেদন",
    applyBody:
      "নিচের লিংকটি একটি অ্যাফিলিয়েট লিংক এবং তা চিহ্নিতও করা আছে। এটি eVisas-এর নিজের destination chooser-এ খোলে, যেখানে আপনার পাসপোর্টের যোগ্যতা, প্রয়োজনীয় নথি ও সম্পূর্ণ ফি দেখানো হয় — কোনো কিছুর জন্য টাকা দেওয়ার আগেই। আপনার আবেদন বা নথি URAL কখনো দেখে না।",
    applyLinkLabel: "ভিসার সুযোগ দেখুন ও eVisas-এর মাধ্যমে আবেদন করুন",

    disclosure:
      "উপরের লিংকের মাধ্যমে আবেদন করলে URAL কমিশন পেতে পারে, আপনার কোনো বাড়তি খরচ ছাড়াই। eVisas TravelRox, Inc.-এর পরিচালিত একটি বেসরকারি, পেইড ভিসা-আবেদন সেবা। এটি সরকারি সংস্থা নয়, ভিসা ইস্যু করে না, এবং সিদ্ধান্তও দেয় না। আবেদনের আগে সরকারি পথ এবং সেবাদাতার সম্পূর্ণ ফি দেখে নিন।",

    faqHeading: "এই পাতায় সাধারণত যা জিজ্ঞেস করা হয়",
    faqs: [
      {
        id: "government",
        question: "eVisas কি একটি সরকারি ওয়েবসাইট?",
        answer:
          "না। eVisas-এর নিজের শর্তে বলা আছে, এটি TravelRox, Inc.-এর পরিচালিত একটি বেসরকারি ভিসা-পরামর্শ ও সহায়তা সেবা; এটি কোনো সরকারি সংস্থা নয় এবং কোনো সরকারি সংস্থার সঙ্গে সম্পৃক্ত নয়; এটি ভিসা ইস্যু করে না। গন্তব্য দেশের নিজস্ব পোর্টালই সরকারি পথ।",
      },
      {
        id: "who-processes",
        question: "আমার আবেদনটি আসলে কে প্রক্রিয়া করে?",
        answer:
          "eVisas আবেদনটি সাজিয়ে জমা দেয়, আর জমা দেওয়ার আগে একজন প্রশিক্ষিত consultant তা পর্যালোচনা করেন। সিদ্ধান্ত নেয় গন্তব্য দেশের ইমিগ্রেশন কর্তৃপক্ষ। eVisas কোনো ভিসা অনুমোদন, প্রত্যাখ্যান বা গ্যারান্টি দেয় না, আর অনুমোদিত ভিসাও নিজে থেকেই প্রবেশের নিশ্চয়তা দেয় না।",
      },
      {
        id: "cost",
        question: "নিজে করলে যা লাগে, তার তুলনায় খরচ কত?",
        answer:
          "নিজে আবেদন করলে লাগে শুধু সরকারি ফি। eVisas সরকারি ফি-র সঙ্গে নিজের সার্ভিস ফি নেয়, US Dollar-এ, পরিশোধের আগে একটি মোট অঙ্ক হিসেবে দেখায়। তারা যদি processing tier দেয়, আপনার বাছাই দাম ও আনুমানিক সময় দুটোই বদলায়। URAL এই দুটির কোনোটির অঙ্ক প্রকাশ করে না, কারণ আপনার গন্তব্য ও পাসপোর্টের জন্য সঠিক অঙ্ক কেবল সেবাদাতার চেকআউট জানে।",
      },
      {
        id: "cheaper",
        question: "আমি কি সরাসরি নিজেও আবেদন করতে পারি?",
        answer:
          "সাধারণত পারেন, এবং তাতে সাধারণত কম খরচ হয়। তবে কিছু গন্তব্যে নিজে উপস্থিত হয়ে আবেদন বা অনুমোদিত agent-এর মাধ্যমে আবেদন বাধ্যতামূলক, তাই আগে ওই দেশের নিয়ম দেখে নিন। যেসব গন্তব্যে পেইড সেবাদাতা আপনার পাসপোর্টে সেবাই দেয় না — বাংলাদেশি পাসপোর্টে থাইল্যান্ড তার উদাহরণ — সেখানে সরকারি পোর্টালই একমাত্র পথ।",
      },
      {
        id: "who-approves",
        question: "ভিসা অনুমোদন কে দেয়?",
        answer:
          "গন্তব্য দেশের সরকার, এবং কেবল সেই সরকারই। URAL বা eVisas — কেউই আবেদন অনুমোদন, প্রত্যাখ্যান বা প্রভাবিত করে না, আর কোনো প্রক্রিয়ার সময়ও আশ্বাস দিতে পারে না। অনুমোদন ও প্রবেশের সিদ্ধান্ত সংশ্লিষ্ট কর্তৃপক্ষের হাতে।",
      },
    ],

    sourcesHeading: "এই পাতার সূত্রগুলো",
    footerNote: "eVisas-এর নিজের পাতাগুলো ১৭ নভেম্বর ২০২৬ চেক করা; বাংলাদেশি গন্তব্যসূচি ১৫ নভেম্বর ২০২৬।",
  },
};

/**
 * The reader-facing catalogue snapshot, both locales.
 *
 * Exported so the React view, the static renderer and any test read one list
 * rather than each re-deriving it from the module.
 */
export const VISA_ASSISTANCE_SNAPSHOT = {
  destinations: BANGLADESH_SNAPSHOT,
  conditional: CONDITIONAL_SNAPSHOT,
} as const;