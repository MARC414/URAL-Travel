import type { DestinationGuide } from "../types";

/**
 * Bengali content for the six destination guides (/destinations/*).
 *
 * ── Why this is its own file ─────────────────────────────────────────────────
 * `src/data/bengaliContent.ts` is already ~524 KB. The six destination guides
 * add roughly 30 KB of Bengali prose, which would make that file harder to
 * review and its diffs unreadable. The merge function lives there, next to the
 * other `getLocalized*` helpers, so there is still exactly one house pattern.
 *
 * ── Why `Partial<DestinationGuide>` ─────────────────────────────────────────
 * Same reason as BENGALI_COSTS_OVERRIDES and BENGALI_VISA_OVERRIDES: an entry
 * lists only the fields that were translated, and anything absent falls through
 * to the English via `{ ...english, ...bengali }`. A field left out is a field
 * still in English — which is honest and visible, unlike an empty string.
 *
 * ── The standard: parity, not summary ───────────────────────────────────────
 * Every field of a translated destination is translated, including the
 * itinerary, the key facts and all five FAQs. These are the pages a Bengali
 * reader searches for first, so they get the same facts, the same BDT figures
 * and the same advice as the English page. `schemaMarkup` is deliberately NOT
 * translated — it is JSON-LD consumed by machines, and the English canonical
 * names inside it (country names, itinerary structure) are what the schema
 * vocabulary expects.
 *
 * ── House conventions (see docs/bengali-parity-plan.md) ─────────────────────
 * - BDT amounts keep Latin digits (`BDT 20,000`); durations and counts use
 *   Bengali digits (`৫ দিন`).
 * - Place names are transliterated in Bengali prose (`কাঠমান্ডু`, `পোখারা`).
 *   Airport codes (`KTM`) and app names (`Pathao`) stay in Latin script because
 *   travellers search and read them that way on signs and booking screens.
 */
export const BENGALI_DESTINATION_OVERRIDES: Record<
  string,
  Partial<DestinationGuide>
> = {
  "nepal-guide": {
    country: "নেপাল",
    title:
      "নেপাল ভ্রমণ পরিকল্পনা: ৫ দিনের ইটিনারারি, খরচ ও ভিসা গাইড (২০২৬)",
    description:
      "হিমালয়ের কোলে ছোট্ট এই দেশটিতে পাহাড়ের অপরূপ দৃশ্য, বৌদ্ধ স্তূপ, সমৃদ্ধ সংস্কৃতি আর কম খরচে আন্তরিক থাকার ব্যবস্থা — প্রথম আন্তর্জাতিক ভ্রমণের জন্য নেপাল তাই বাংলাদেশিদের সবচেয়ে জনপ্রিয় গন্তব্য।",
    bestTimeToVisit:
      "অক্টোবর থেকে নভেম্বর (বর্ষা শেষ হওয়ায় আকাশ একেবারে পরিষ্কার, পাহাড় দেখার সেরা সময়) এবং মার্চ থেকে এপ্রিল (বসন্তের ফুল আর আরামদায়ক আবহাওয়া)",
    itinerary: [
      {
        day: 1,
        title: "কাঠমান্ডু উপত্যকায় পৌঁছানো",
        activities: [
          "ত্রিভুবন বিমানবন্দরে (KTM) নেমে Gratis Visa (ফ্রি ভিসা) সংগ্রহ করুন",
          "থামেলের হোস্টেল বা বুটিক হোটেলে উঠুন",
          "থামেলের গলি ঘুরে দেখুন, Western Tandoori-তে মোমো খান, ট্রেকিংয়ের প্রয়োজনীয় সরঞ্জাম কিনুন",
        ],
      },
      {
        day: 2,
        title: "কাঠমান্ডুর সাংস্কৃতিক নিদর্শন",
        activities: [
          "ভোরে বৌদ্ধনাথ স্তূপে যান — ভিক্ষুদের প্রদক্ষিণ করার দৃশ্য দেখুন",
          "সন্ধ্যায় স্বয়ম্ভুনাথ (বানরের মন্দির) থেকে পুরো উপত্যকার দৃশ্য উপভোগ করুন",
          "পশুপতিনাথ মন্দিরে বাগমতী নদীর তীরে সন্ধ্যার আরতিতে অংশ নিন",
        ],
      },
      {
        day: 3,
        title: "প্রাচীন দরবার স্কয়ার",
        activities: [
          "ট্যাক্সি নিয়ে পাটান দরবার স্কয়ারে যান — নতুনারি স্থাপত্যের ইটের প্রাসাদ দেখুন",
          "সোনালি মন্দির ও ঐতিহ্যবাহী কারিগরপাড়া ঘুরে দেখুন",
          "ভক্তপুর যান — মাটির হাঁড়ির কারখানা, জুজু ধাউ (হাতে বানানো দই) আর প্রাচীন প্যাগোডার খিলান দেখুন",
        ],
      },
      {
        day: 4,
        title: "পোখারার পথে মনোরম যাত্রা",
        activities: [
          "সকালে ট্যুরিস্ট বাসে কাঠমান্ডু থেকে পোখারা (৬–৮ ঘণ্টার পাহাড়ি হাইওয়ে যাত্রা)",
          "লেকসাইডে উঠে ফেওয়া লেকে কাঠের নৌকা বাওয়া — সামনে মাছাপুছরে হিমালয়ের প্রতিচ্ছবি",
          "হ্রদের ঠিক পাশেই কাঠের চুলায় বেক করা পিৎজা উপভোগ করুন",
        ],
      },
      {
        day: 5,
        title: "সারাঙ্গকোটের সূর্যোদয় ও প্রস্থান",
        activities: [
          "ভোর সাড়ে চারটায় উঠে সারাঙ্গকোট চূড়া থেকে অন্নপূর্ণা পর্বতমালার সূর্যোদয় দেখুন",
          "মোটরবাইক ভাড়া নিয়ে দেবীর জলপ্রপাত ও গুপ্তেশ্বর গুহা ঘুরে দেখুন",
          "সন্ধ্যার ফ্লাইট বা বাসে কাঠমান্ডু হয়ে ঢাকায় ফিরে যান",
        ],
      },
    ],
    localTransport: [
      "শহর থেকে শহরে যেতে ট্যুরিস্ট বাস (কাঠমান্ডু–পোখারা: BDT 1,200 – 1,800)",
      "রাইড-শেয়ারিং অ্যাপ — কাঠমান্ডুতে Pathao চালু আছে, খরচ খুব কম",
      "প্রি-পেইড মিটারযুক্ত হলুদ ট্যাক্সি (যাওয়ার আগে ভাড়া ঠিক করে নেওয়াই চালু রীতি)",
    ],
    budgetBdt:
      "জনপ্রতি BDT 20,000 – BDT 35,000 (বিমানভাড়া ছাড়া; বাজেট ব্যাকপ্যাকিং ও মিড-রেঞ্জ হোটেল ধরে)",
    quickAnswer:
      "ঢাকা থেকে ৫ দিনের নেপাল ভ্রমণে স্থানীয় খরচ জনপ্রতি BDT 20,000 থেকে BDT 35,000 — আন্তর্জাতিক বিমানভাড়া এর বাইরে। এই বাজেটে কাঠমান্ডু, ভক্তপুর ও পোখারার সাধারণ দর্শনীয় স্থান, স্থানীয় খাবার এবং ট্যুরিস্ট বাসের খরচ ধরা আছে। বাংলাদেশি পাসপোর্টধারীরা প্রতি ক্যালেন্ডার বছরের প্রথম ভ্রমণে ৩০ দিনের ফ্রি Visa on Arrival পান, ফলে আলাদা করে USD 30 ভিসা ফি লাগে না। হিমালয়ের পরিষ্কার দৃশ্য পেতে অক্টোবর–নভেম্বর এবং মার্চ–এপ্রিল সেরা সময়।",
    keyFacts: [
      { label: "প্রস্তাবিত ভ্রমণের সময়", value: "৫ থেকে ৮ দিন" },
      { label: "দৈনিক স্থানীয় বাজেট", value: "BDT 3,000 – 4,500 / দিন" },
      { label: "প্রধান শহর", value: "কাঠমান্ডু, পোখারা, ভক্তপুর" },
      {
        label: "বাংলাদেশিদের জন্য ভিসা",
        value: "ফ্রি Visa on Arrival (বছরে প্রথম ভ্রমণ)",
      },
    ],
    faqs: [
      {
        question: "বাংলাদেশ থেকে নেপাল ভ্রমণে কত দিন লাগে?",
        answer:
          "প্রথম ভ্রমণের জন্য ৫ দিন যথেষ্ট — সাধারণত কাঠমান্ডুতে ৩ দিন (ভক্তপুরের সাইড ট্রিপসহ) আর পোখারায় ২ দিন। ফেওয়া লেকের পাশে আরাম করতে চাইলে বা ছোট হাইক করতে চাইলে ৭–৮ দিন নিলে গতি অনেক আরামদায়ক হয়।",
      },
      {
        question: "নেপাল ভ্রমণের সেরা সময় কোনটি?",
        answer:
          "অক্টোবর থেকে নভেম্বর — বর্ষা শেষ হওয়ায় আকাশ সবচেয়ে পরিষ্কার থাকে এবং পাহাড়ের দৃশ্য সবচেয়ে ভালো দেখা যায়। মার্চ থেকে এপ্রিলে আবহাওয়া আরামদায়ক থাকে ও রডোডেনড্রন ফোটে। নেপালের ভ্রমণ মৌসুম বলতে মূলত এই দুটিকেই ধরা হয়।",
      },
      {
        question: "ট্যুর প্যাকেজ ছাড়া কি নেপাল ঘোরা যায়?",
        answer:
          "হ্যাঁ, নেপালের প্রধান পর্যটন এলাকায় নিজে নিজে ঘোরা সহজ। ট্যুরিস্ট বাসে সাশ্রয়ী খরচে কাঠমান্ডু–পোখারা যাওয়া যায়, Pathao-এর মতো রাইড-শেয়ারিং অ্যাপ কাঠমান্ডু উপত্যকায় চলে, আর বেশিরভাগ হোটেল বা গেস্টহাউস স্থানীয় সাইটসিয়িংয়ের ব্যবস্থা করে দিতে পারে।",
      },
      {
        question: "প্রথম আন্তর্জাতিক ভ্রমণের জন্য নেপাল কি ভালো?",
        answer:
          "হ্যাঁ — বাংলাদেশিদের প্রথম বিদেশ ভ্রমণের সবচেয়ে সহজ গন্তব্য হিসেবে নেপালের নামই প্রথমে আসে। আগে থেকে কোনো ভিসার ব্যবস্থা করতে হয় না (প্রতি বছর প্রথম ভ্রমণে ফ্রি Visa on Arrival), ফ্লাইট মাত্র দেড় ঘণ্টার, আর দৈনিক খরচ অঞ্চলের মধ্যে সবচেয়ে কম।",
      },
      {
        question: "নেপালে কী খাবার চেখে দেখা উচিত?",
        answer:
          "মোমো (ভাপে বা ভেজে তৈরি ডাম্পলিং) আর দাল ভাত (ডাল, ভাত ও সবজি) নেপালের প্রতিদিনের খাবার এবং সব জায়গায় পাওয়া যায়। বেশিরভাগ খাবারের স্বাদ দক্ষিণ এশিয়ার পরিচিত স্বাদের কাছাকাছি, আর কাঠমান্ডু ও পোখারায় নিরামিষ খাবারের বিকল্পও সহজে পাওয়া যায়।",
      },
    ],
  },
};
