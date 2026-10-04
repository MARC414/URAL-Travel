import React, { useState } from "react";
import { ArrowRight, BookOpen, Compass, HelpCircle, Layers, Search } from "lucide-react";
import { Language } from "../translations";

export interface TopicalBlogNode {
  id: string;
  clusterId: "hajj-umrah" | "islamic-stopover" | "banking-fx" | "immigration-visa" | "halal-family";
  funnelStage: "BoFu (High Commercial)" | "MoFu (Decision & Comparison)" | "ToFu (Trust & Preparation)";
  titleEn: string;
  titleBn: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  monthlyIntentSignal: string;
  customerPsychologyEn: string;
  customerPsychologyBn: string;
  aeoDirectAnswerEn: string;
  aeoDirectAnswerBn: string;
  eavTriples: string;
  targetPath: string;
  isLiveBlog?: boolean;
}

const TOPICAL_AUTHORITY_CLUSTERS = [
  {
    id: "all",
    labelEn: "All 32 Authority Topics",
    labelBn: "সবগুলো ৩২টি টপিক",
    roleEn: "Full Semantic Network",
    roleBn: "সম্পূর্ণ নেটওয়ার্ক",
  },
  {
    id: "hajj-umrah",
    labelEn: "01. Hajj & Umrah Core (12)",
    labelBn: "০১. হজ্জ ও ওমরাহ কোর (১২)",
    roleEn: "Priority #1 Core Section",
    roleBn: "প্রধান কোর ক্লাস্টার",
  },
  {
    id: "islamic-stopover",
    labelEn: "02. Ziyarah & Stopovers (5)",
    labelBn: "০২. জিয়ারত ও স্টপওভার (৫)",
    roleEn: "Semantic Bridge Cluster",
    roleBn: "সেমান্টিক ব্রিজ ক্লাস্টার",
  },
  {
    id: "banking-fx",
    labelEn: "03. BD Banking & Cards (5)",
    labelBn: "০৩. ব্যাংকিং ও কার্ড (৫)",
    roleEn: "Transactional Enabler",
    roleBn: "পেমেন্ট ও কার্ড সল্যুশন",
  },
  {
    id: "immigration-visa",
    labelEn: "04. DAC Immigration & Visa (5)",
    labelBn: "০৪. ইমিগ্রেশন ও ভিসা (৫)",
    roleEn: "Anxiety-Removal Pillar",
    roleBn: "ভিসা ও ইমিগ্রেশন আস্থা",
  },
  {
    id: "halal-family",
    labelEn: "05. Halal Family & Medical (5)",
    labelBn: "০৫. হালাল ফ্যামিলি ও মেডিকেল (৫)",
    roleEn: "Outer Authority Expansion",
    roleBn: "ফ্যামিলি ও মেডিকেল ট্যুর",
  },
] as const;

export const TOPICAL_BLOG_NODES: TopicalBlogNode[] = [
  // ============================================================================
  // CLUSTER 1: HAJJ & UMRAH CORE TOPICAL AUTHORITY (PRIORITY #1 — 12 TOPICS)
  // ============================================================================
  {
    id: "hu-01",
    clusterId: "hajj-umrah",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "DIY Umrah & Hajj Preparation from Bangladesh (2026): Official Visa Rules, Nusuk App & 10-Day BDT Budget",
    titleBn: "বাংলাদেশ থেকে নিজে নিজে DIY Umrah ও Hajj প্রস্তুতি (2026): অফিশিয়াল ভিসা, Nusuk অ্যাপ ও ১০ দিনের BDT খরচ",
    primaryKeyword: "umrah cost from bangladesh 2026",
    secondaryKeywords: ["diy umrah from dhaka", "umrah package price in bangladesh", "nusuk app umrah guide bd"],
    monthlyIntentSignal: "Very High · Transactional Cost & Process Intent",
    customerPsychologyEn:
      "Desire for Price Transparency & Autonomy: Middle-class Bangladeshi families want to perform Umrah without paying BDT 45,000+ per person in opaque agency markups or being forced into distant group hotels.",
    customerPsychologyBn:
      "স্বচ্ছ খরচ ও স্বাধীনতার আকাঙ্ক্ষা: মধ্যবিত্ত পরিবারগুলো এজেন্সির অতিরিক্ত ৩০–৪৫ হাজার টাকা হিডেন চার্জ না দিয়ে নিজের পছন্দের হোটেলে থেকে ওমরাহ করতে চায়।",
    aeoDirectAnswerEn:
      "A 10-day DIY Umrah from Dhaka (5 nights Makkah + 4 nights Madinah) costs BDT 1,16,000–1,32,000 per person (family of 4 sharing), including a 90-day Umrah e-Visa (BDT 15,500–19,500), roundtrip flights (BDT 58,000–75,000), hotels, and Haramain Bullet Train.",
    aeoDirectAnswerBn:
      "ঢাকা থেকে ৪ জনের পরিবারের শেয়ারে ১০ দিনের DIY ওমরাহ করতে জনপ্রতি BDT ১,১৬,০০০–১,৩২,০০০ খরচ হয় (ই-ভিসা ১৬,৫০০ টাকা, ফ্লাইট ৫৮,০০০–৭৫,০০০ টাকা, হোটেল ও বুলেট ট্রেনসহ)।",
    eavTriples: "DIY Umrah (Entity) → 10-Day Cost (Attribute) → BDT 1,16,000–1,32,000 (Value)",
    targetPath: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
    isLiveBlog: true,
  },
  {
    id: "hu-02",
    clusterId: "hajj-umrah",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Hajj Registration from Bangladesh (2026–2027): Official hajj.gov.bd Process, Govt vs. Private Agency & Maktab Tents",
    titleBn: "বাংলাদেশ থেকে সরকারি ও বেসরকারি Hajj রেজিস্ট্রেশন (2026–2027): hajj.gov.bd নিয়ম, PID ট্র্যাকিং ও BDT প্যাকেজ খরচ",
    primaryKeyword: "hajj package price in bangladesh",
    secondaryKeywords: ["hajj registration check by nid", "hajj.gov.bd pre registration fee", "shifting vs non shifting hajj"],
    monthlyIntentSignal: "Very High · High-Ticket Trust & Verification Intent",
    customerPsychologyEn:
      "Fear of Fraud & Losing Life Savings: Families investing BDT 6–9 Lakhs per person fear unlicensed sub-agents (dalals). Explaining PID verification on hajj.gov.bd and Mina Maktab A/B vs D tents builds instant authority.",
    customerPsychologyBn:
      "সারা জীবনের সঞ্চয় হারানোর ভয়: ৬–৯ লক্ষ টাকা খরচের আগে হজযাত্রীরা দালালমুক্ত সরকারি নিবন্ধন (PID যাচাই) এবং মিনার তাঁবুর মান সম্পর্কে নিশ্চিত হতে চান।",
    aeoDirectAnswerEn:
      "Obligatory Hajj from Bangladesh requires two-stage registration on hajj.gov.bd: Pre-Registration with NID and ~BDT 30,000 deposit to get a tracking N-Serial, followed by Final Registration (BDT 5,20,000–6,00,000 Govt or BDT 5,80,000–9,50,000+ Private).",
    aeoDirectAnswerBn:
      "ফরজ হজের জন্য hajj.gov.bd পোর্টালে NID ও ৩০,০০০ টাকা জমা দিয়ে প্রাক-নিবন্ধন (N-Serial) এবং কোটা অনুযায়ী চূড়ান্ত নিবন্ধন (সরকারি ৫.২০–৬ লক্ষ টাকা) সম্পন্ন করতে হয়।",
    eavTriples: "Bangladesh Hajj Registration (Entity) → Official Portal (Attribute) → hajj.gov.bd (Value)",
    targetPath: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost",
    isLiveBlog: true,
  },
  {
    id: "hu-03",
    clusterId: "hajj-umrah",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Performing Umrah with Elderly Parents from Bangladesh: Wheelchair Booking, Flat-Street Hotels & Medical Checklist",
    titleBn: "বয়স্ক মা-বাবাকে নিয়ে বাংলাদেশ থেকে Umrah গাইড: ফ্রি হুইলচেয়ার, ইলেকট্রিক স্কুটার ও সমতল রাস্তার হোটেল",
    primaryKeyword: "umrah with elderly parents bangladesh",
    secondaryKeywords: ["makkah electric scooter tawaf price", "wheelchair assistance biman saudia dhaka", "flat street hotels near haram"],
    monthlyIntentSignal: "High · Emotional Caregiver & Family Intent",
    customerPsychologyEn:
      "Filial Devotion ('Amma-Abba'r Sheba'): Adult children taking 65+ parents with knee pain or diabetes want zero physical hardship—seeking flat streets, direct elevators, and SAR 115 roof electric scooters.",
    customerPsychologyBn:
      "মা-বাবার প্রতি দায়িত্ববোধ ও ভালোবাসা: বয়স্ক মা-বাবার হাঁটুর ব্যথা বা ডায়াবেটিস থাকায় সন্তানরা চায় ঢালবিহীন সমতল রাস্তার হোটেল ও ইলেকট্রিক স্কুটারের সঠিক নিয়ম।",
    aeoDirectAnswerEn:
      "Request free SSR WCHR wheelchair assistance 48 hours before flying from Dhaka, bring a foldable wheelchair (free checked medical item), stay in flat-street Jabal Omar/Clock Tower and Madinah Markazia North, and rent Haram electric scooters for SAR 115.",
    aeoDirectAnswerBn:
      "ফ্লাইটের ৪৮ ঘণ্টা আগে ফ্রি WCHR হুইলচেয়ার বুক করুন, দেশ থেকে ফোল্ডিং হুইলচেয়ার নিন, Jabal Omar ও Markazia North-এ সমতল হোটেলে থাকুন এবং SAR 115-এ ইলেকট্রিক স্কুটার ব্যবহার করুন।",
    eavTriples: "Haram Electric Mobility Scooter (Entity) → Full Umrah Fare (Attribute) → SAR 115 / BDT 3,800 (Value)",
    targetPath: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide",
    isLiveBlog: true,
  },
  {
    id: "hu-04",
    clusterId: "hajj-umrah",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Makkah & Madinah Hotel Zones, Haramain Bullet Train & Ziyarah Guide for Bangladeshi Pilgrims",
    titleBn: "Makkah ও Madinah হোটেল জোন, Haramain Bullet Train এবং Ziyarah গাইড (বাংলাদেশি হাজীদের জন্য)",
    primaryKeyword: "best hotel area in makkah and madinah for family",
    secondaryKeywords: ["haramain high speed train ticket booking bangladesh", "mahbas al jin shuttle hotel", "madinah ladies gate 25 hotel"],
    monthlyIntentSignal: "Very High · Accommodation & Ground Transit Intent",
    customerPsychologyEn:
      "Avoiding Steep Hill Traps: Many pilgrims book '600m from Haram' hotels online only to discover a brutal uphill climb in Upper Ajyad. Mapping flat streets vs. 24/7 shuttle zones solves their #1 hotel fear.",
    customerPsychologyBn:
      "পাহাড়ি ঢালের ভোগান্তি এড়ানো: অনলাইনে কাছে মনে হলেও আজইয়াদের খাড়া পাহাড়ে ওঠা কষ্টকর। তাই সমতল রাস্তা বনাম ফ্রি শাটল জোনের তুলনা হোটেল বুকিং সহজ করে।",
    aeoDirectAnswerEn:
      "In Makkah, choose Jabal Omar, Clock Tower, or Lower Ibrahim Al Khalil for zero-incline walking (3–6 mins), or Mahbas Al Jin/Kudai for BDT 4,500/night 24/7 shuttle hotels. In Madinah, book Markazia North near Ladies' Gates 25–29.",
    aeoDirectAnswerBn:
      "মক্কায় সমতল রাস্তার জন্য Jabal Omar বা Ibrahim Al Khalil এবং বাজেটের জন্য Mahbas Al Jin ফ্রি শাটল হোটেল সেরা; আর মদিনায় মহিলা গেট ২৫–২৯ এর কাছে Markazia North সেরা।",
    eavTriples: "Haramain Bullet Train (Entity) → Makkah to Madinah Duration (Attribute) → 2 Hours 20 Minutes at 300 km/h (Value)",
    targetPath: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
    isLiveBlog: true,
  },
  {
    id: "hu-05",
    clusterId: "hajj-umrah",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "96-Hour Saudi Stopover Visa for Bangladeshis (2026): Perform Umrah on Saudia & Flynas Transit Flights",
    titleBn: "বাংলাদেশিদের জন্য ৯৬ ঘণ্টার Saudi Stopover Visa (2026): Saudia ও Flynas ট্রানজিট ফ্লাইটে ৪ দিনের ওমরাহ",
    primaryKeyword: "saudi 96 hours transit visa for bangladeshi",
    secondaryKeywords: ["saudia free stopover hotel makkah", "us uk schengen visa saudi evisa bangladesh", "perform umrah on transit visa"],
    monthlyIntentSignal: "High · Smart Value & NRB Transit Intent",
    customerPsychologyEn:
      "Smart Value Maximization ('Ek Tir-e Dui Pakhi'): Bangladeshi NRBs, students, and tourists flying to UK/USA/Europe/Dubai love unlocking a 4-day Umrah + 1 free hotel night for just BDT 3,800.",
    customerPsychologyBn:
      "এক খরচে দুই সুবিধা: ইউরোপ, লন্ডন, আমেরিকা বা দুবাইগামী বাংলাদেশিরা মাত্র ৩,৮০০ টাকায় ৪ দিনের স্টপওভার ওমরাহ ও সৌদিয়ার ১ রাত ফ্রি হোটেল পেতে আগ্রহী।",
    aeoDirectAnswerEn:
      "All Bangladeshi passport holders flying Saudia or Flynas can book a 96-hour (4-day) Saudi Stopover Visa during ticket checkout for ~SAR 135 (BDT 3,800–4,500 including medical insurance), with 1 free hotel night on eligible Saudia routes.",
    aeoDirectAnswerBn:
      "Saudia বা Flynas-এ ট্রানজিট টিকিট কাটার সময় যেকোনো বাংলাদেশি পাসপোর্টধারী ~SAR 135 (BDT ৩,৮০০–৪,৫০০) ফি দিয়ে ৯৬ ঘণ্টার স্টপওভার ওমরাহ ভিসা ও ১ রাত ফ্রি হোটেল পেতে পারেন।",
    eavTriples: "Saudi Stopover Visa (Entity) → Maximum Stay Duration (Attribute) → 96 Hours / 4 Days (Value)",
    targetPath: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
    isLiveBlog: true,
  },
  {
    id: "hu-06",
    clusterId: "hajj-umrah",
    funnelStage: "ToFu (Trust & Preparation)",
    titleEn: "Nusuk App & Saudi Visa Bio Step-by-Step Guide in Bangla: Rawdah Shareef Permit & Fingerprint Troubleshooting",
    titleBn: "Nusuk App ও Saudi Visa Bio ব্যবহারের সম্পূর্ণ গাইড: রিয়াজুল জান্নাত (Rawdah) পারমিট ও ফিঙ্গারপ্রিন্ট সমাধান",
    primaryKeyword: "how to book rawdah permit in nusuk app from bangladesh",
    secondaryKeywords: ["saudi visa bio app fingerprint problem bd", "nusuk app registration with visa number", "riyazul jannah booking time"],
    monthlyIntentSignal: "Very High · Technical App Friction Intent",
    customerPsychologyEn:
      "Fear of Missing Rawdah Shareef: Pilgrims worry they will reach Madinah and be denied entry to Riyazul Jannah because they didn't know how to book the free Nusuk QR slot on the Friday release window.",
    customerPsychologyBn:
      "রিয়াজুল জান্নাতে নামাজ না পাওয়ার ভয়: অনেকেই মদিনায় গিয়ে জানতে পারেন Nusuk অ্যাপের ফ্রি QR পারমিট ছাড়া রওজা শরীফে ঢোকা যায় না—তাই আগেভাগেই নিয়ম জানতে চান।",
    aeoDirectAnswerEn:
      "Register on the official Nusuk app using your 10-digit Saudi Visa Number and Passport Number. Rawdah Shareef permits are 100% free; new slots release every Friday at the top of the hour and instant cancellation slots open every 30 minutes.",
    aeoDirectAnswerBn:
      "ভিসা ও পাসপোর্ট নম্বর দিয়ে Nusuk অ্যাপে একাউন্ট খুলে ফ্রি Rawdah Permit বুক করতে হয়; প্রতি শুক্রবার নতুন স্লট এবং প্রতি ৩০ মিনিট পরপর ইনস্ট্যান্ট স্লট ওপেন হয়।",
    eavTriples: "Masjid an-Nabawi Rawdah Entry (Entity) → Mandatory Requirement (Attribute) → Nusuk App QR Permit (Value)",
    targetPath: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
    isLiveBlog: true,
  },
  {
    id: "hu-07",
    clusterId: "hajj-umrah",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Umrah Rules for Bangladeshi Women (2026): Mahram-Free Visa Policy, Ladies' Gate 25–29 & Ihram Dress Guide",
    titleBn: "নারীদের জন্য Umrah গাইড (2026): মাহরাম ছাড়া ভিসার নিয়ম, মদিনার Ladies' Gate 25–29 ও পর্দাশীল ইহরাম",
    primaryKeyword: "umrah rules for women without mahram bangladesh",
    secondaryKeywords: ["ladies rawdah gate number madinah", "women ihram dress rules bangla", "female umrah group from dhaka"],
    monthlyIntentSignal: "High · Female Pilgrim Safety & Fiqh Clarity Intent",
    customerPsychologyEn:
      "Safety, Modesty & Crowd Confusion: Bangladeshi mothers, sisters, and female doctors/professionals want clarity on Saudi Arabia's updated Mahram visa rules, dedicated women's prayer gates, and hair-trimming (Taqsir) privacy.",
    customerPsychologyBn:
      "নিরাপত্তা ও শরীয়াহ নিয়মের স্পষ্টতা: নারী হজযাত্রীরা মদিনার মহিলা গেট (২৫–২৯), রওজা ভিজিটের আলাদা সময়সূচী এবং পর্দা বজায় রেখে চুল কাটার (তাকসীর) নিয়ম জানতে চান।",
    aeoDirectAnswerEn:
      "Saudi Ministry of Hajj & Umrah permits women to obtain an Umrah e-Visa without a male Mahram requirement on the visa portal, while in Madinah women should enter through Northern Gates 25–29 during dedicated morning and post-Isha Rawdah slots.",
    aeoDirectAnswerBn:
      "সৌদি ই-ভিসা নিয়মে নারীদের ভিসার জন্য মাহরাম বাধ্যতামূলক নয় এবং মদিনায় নারীদের নামাজ ও রওজা শরীফে প্রবেশের জন্য উত্তর দিকের গেট ২৫–২৯ নির্ধারিত।",
    eavTriples: "Masjid an-Nabawi Women's Rawdah Access (Entity) → Entry Gates (Attribute) → Northern Gates 25 to 29 (Value)",
    targetPath: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates",
    isLiveBlog: true,
  },
  {
    id: "hu-08",
    clusterId: "hajj-umrah",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Dhaka to Jeddah & Madinah Open-Jaw Flight Strategy: Biman vs. Saudia vs. Budget Gulf Airlines Compared",
    titleBn: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw Flight কৌশল: Biman বনাম Saudia বনাম সাশ্রয়ী কানেক্টিং এয়ারলাইন্স তুলনা",
    primaryKeyword: "dhaka to jeddah flight ticket price bdt",
    secondaryKeywords: ["dhaka to jeddah return from madinah multi city", "biman vs saudia umrah baggage allowance", "cheapest umrah flight from dhaka"],
    monthlyIntentSignal: "Very High · Direct Transactional Airfare Intent",
    customerPsychologyEn:
      "Eliminating Wasted Backtracking: Flying DAC→JED and returning MED→DAC saves a grueling 6-hour bus ride back to Jeddah and SAR 400 in transport costs.",
    customerPsychologyBn:
      "সময় ও অতিরিক্ত যাতায়াত খরচ বাঁচানো: ঢাকা→জেদ্দা গিয়ে মদিনা→ঢাকা ফিরলে মদিনা থেকে আবার ৪৫০ কিমি পথ ভেঙে জেদ্দায় ফেরার কষ্ট ও টাকা দুটোই বাঁচে।",
    aeoDirectAnswerEn:
      "Book a Multi-City (Open-Jaw) ticket flying Dhaka (DAC) → Jeddah (JED) and returning Madinah (MED) → Dhaka (DAC). Direct flights on Biman/Saudia cost BDT 68,000–85,000 (2x23kg + free 5L Zamzam), while 1-stop Gulf carriers start at BDT 54,000.",
    aeoDirectAnswerBn:
      "মাল্টি-সিটি টিকিটে ঢাকা→জেদ্দা ও মদিনা→ঢাকা বুক করুন। বিমান ও সৌদিয়ার ডিরেক্ট ফ্লাইট BDT ৬৮,০০০–৮৫,০০০ (৪৬ কেজি লাগেজ + ফ্রি ৫ লিটার জমজম) এবং ট্রানজিট ফ্লাইট ৫৪,০০০ টাকা থেকে শুরু।",
    eavTriples: "Open-Jaw Umrah Flight (Entity) → Optimal Route (Attribute) → DAC to JED Outbound + MED to DAC Return (Value)",
    targetPath: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia",
    isLiveBlog: true,
  },
  {
    id: "hu-09",
    clusterId: "hajj-umrah",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Ramadan Umrah & Last 10 Days I'tikaf Guide from Bangladesh: Early Booking Timeline & Crowd Survival",
    titleBn: "রমজানে Umrah ও শেষ ১০ দিনের ইতিকাফ গাইড: বাংলাদেশ থেকে কম খরচে বুকিংয়ের সেরা সময় ও প্রস্তুতি",
    primaryKeyword: "ramadan umrah package from bangladesh",
    secondaryKeywords: ["last 10 days ramadan makkah hotel cost", "itikaf registration masjid al haram nusuk", "shaban to ramadan umrah trick"],
    monthlyIntentSignal: "Very High Seasonal Spike · Spiritual Peak Intent",
    customerPsychologyEn:
      "Hadith Reward ('Umrah in Ramadan equals Hajj in reward') vs. Price Shock: Teaching the 'Late Sha'ban Entry + Early Ramadan Exit' trick saves Bangladeshi families 50% on Makkah hotel rates.",
    customerPsychologyBn:
      "রমজানে হজের সমান সওয়াব বনাম অতিরিক্ত হোটেল ভাড়া: শাবানের শেষ সপ্তাহে গিয়ে রমজানের প্রথম সপ্তাহে ওমরাহ করার কৌশলে হোটেল খরচ ৫০% কমানো সম্ভব।",
    aeoDirectAnswerEn:
      "To perform Ramadan Umrah on a budget from Bangladesh, fly in the last 5 days of Sha'ban and stay through the first 6 days of Ramadan—saving 45%–60% compared to Last-10-Days hotel rates, or register for official Haram I'tikaf via Nusuk in early Ramadan.",
    aeoDirectAnswerBn:
      "কম খরচে রমজান ওমরাহ করতে শাবানের শেষ ৫ দিনে গিয়ে প্রথম ৬ রোজা পর্যন্ত থাকুন—এতে শেষ দশকের তুলনায় হোটেল ভাড়া ৫০% কম লাগে।",
    eavTriples: "Ramadan Umrah (Entity) → Smart Cost-Saving Window (Attribute) → 26 Sha'ban to 6 Ramadan (Value)",
    targetPath: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget",
    isLiveBlog: true,
  },
  {
    id: "hu-10",
    clusterId: "hajj-umrah",
    funnelStage: "ToFu (Trust & Preparation)",
    titleEn: "Wearing Ihram from Dhaka Airport vs. Transit Flight: Miqat Rules (Qarn al-Manazil & Yalamlam) Explained",
    titleBn: "ঢাকা এয়ারপোর্ট বনাম ট্রানজিট ফ্লাইটে ইহরাম বাঁধার নিয়ম: মিকাত (কারনুল মানাজিল ও ইয়ালামলাম) গাইড",
    primaryKeyword: "where to wear ihram from dhaka to jeddah",
    secondaryKeywords: ["miqat for bangladesh flight", "ihram rules in transit flight dubai sharjah", "biman saudia miqat announcement"],
    monthlyIntentSignal: "High · Ritual Accuracy & Dam Penalty Anxiety",
    customerPsychologyEn:
      "Fear of Crossing Miqat Without Ihram (Incurring 'Dam' Penalty): First-time pilgrims flying direct vs. transiting in Dubai/Sharjah/Muscat need exact clarity on where to change into Ihram clothes and make Niyyah.",
    customerPsychologyBn:
      "মিকাত পার হয়ে দম (জরিমানা কুরবানি) ওয়াজিব হওয়ার ভয়: ডিরেক্ট ফ্লাইটে ঢাকা থেকে নাকি ট্রানজিট এয়ারপোর্টে ইহরাম বাঁধতে হবে—তা নিয়ে প্রথমবার ওমরাহ যাত্রীদের সংশয় দূর করা।",
    aeoDirectAnswerEn:
      "On direct Dhaka–Jeddah flights (Biman/Saudia), wear Ihram garments at Dhaka Airport (Ashkona/DAC prayer room) and make Niyyah+Talbiyah 45 minutes before landing when the pilot announces Miqat Qarn al-Manazil. On transit flights, wear Ihram during the layover in Dubai/Sharjah/Doha/Muscat.",
    aeoDirectAnswerBn:
      "ডিরেক্ট ফ্লাইটে ঢাকা এয়ারপোর্টে ইহরামের কাপড় পরে জেদ্দায় নামার ৪৫ মিনিট আগে পাইলটের ঘোষণায় নিয়ত করুন; আর ট্রানজিট ফ্লাইটে যাত্রাবিরতির এয়ারপোর্টে ইহরাম পরিধান করুন।",
    eavTriples: "Dhaka to Jeddah Flight (Entity) → Designated Air Miqat (Attribute) → Qarn al-Manazil / Yalamlam (Value)",
    targetPath: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules",
    isLiveBlog: true,
  },
  {
    id: "hu-11",
    clusterId: "hajj-umrah",
    funnelStage: "ToFu (Trust & Preparation)",
    titleEn: "Official Zamzam Water, Dates & Gold Rules at Jeddah, Madinah & Dhaka Airport Customs (2026)",
    titleBn: "জেদ্দা ও মদিনা এয়ারপোর্ট থেকে Zamzam পানি, আজওয়া খেজুর ও স্বর্ণ আনার অফিশিয়াল কাস্টমস নিয়ম (2026)",
    primaryKeyword: "zamzam water rules jeddah airport bangladesh",
    secondaryKeywords: ["how many liters zamzam allowed in biman", "ajwa dates price in madinah market", "gold allowance dhaka airport customs"],
    monthlyIntentSignal: "High · Post-Umrah Return Logistics Intent",
    customerPsychologyEn:
      "Bringing Barakah Home Safely: Every Bangladeshi pilgrim must bring Zamzam water and Madinah Ajwa dates for relatives without getting bottles confiscated at Jeddah check-in.",
    customerPsychologyBn:
      "আত্মীয়দের জন্য বরকতময় জমজম ও খেজুর আনা: এয়ারপোর্টে যাতে জমজমের বোতল আটকানো না হয়, সেজন্য অফিশিয়াল ৫ লিটার কার্টন ও কাস্টমস নিয়ম জানা জরুরি।",
    aeoDirectAnswerEn:
      "Each Umrah e-Visa or Nusuk permit holder can buy one official 5-liter sealed Zamzam box at Jeddah Terminal 1 or Madinah Airport for SAR 9.50–12.50 (~BDT 380), carried free outside your 30–46kg baggage allowance on Biman and Saudia. Never pack loose Zamzam bottles inside suitcases.",
    aeoDirectAnswerBn:
      "প্রতিটি ওমরাহ ভিসাধারী জেদ্দা বা মদিনা এয়ারপোর্ট থেকে ১টি অফিশিয়াল ৫ লিটারের সিল করা জমজম বক্স (~SAR 12.50) কিনতে পারেন, যা মূল লাগেজের বাইরে বিনামূল্যে বহনযোগ্য।",
    eavTriples: "Official Airport Zamzam Box (Entity) → Allowance per Pilgrim (Attribute) → 1 Sealed 5-Liter Carton (Value)",
    targetPath: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport",
    isLiveBlog: true,
  },
  {
    id: "hu-12",
    clusterId: "hajj-umrah",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Bangladeshi & Pakistani Halal Food Guide in Makkah & Madinah: Best Budget Meals in Ajyad, Aziziyah & Markazia",
    titleBn: "মক্কা ও মদিনায় দেশি খাবারের গাইড: ভাত, মাছ, ডাল ও আলু ভর্তা কোথায় পাবেন এবং প্রতি বেলার খরচ কত?",
    primaryKeyword: "bangladeshi hotel and food in makkah madinah",
    secondaryKeywords: ["bengali restaurant in makkah ibrahim khalil", "food cost in umrah per day", "al baik location near haram makkah"],
    monthlyIntentSignal: "High · Daily Comfort & Elderly Diet Intent",
    customerPsychologyEn:
      "Craving Familiar Desi Comfort Food for Seniors: After 3 days of eating fast food or spicy broast, elderly Bangladeshi parents need warm white rice, daal, fish curry, and bharta to keep their digestion healthy.",
    customerPsychologyBn:
      "বয়স্ক বাবা-মায়ের জন্য দেশি ভাত-মাছের চাহিদা: টানা কয়েক দিন ফাস্টফুড বা রুটি খেলে বয়স্কদের গ্যাস্ট্রিক হয়—তাই ইব্রাহিম খলিল রোড ও আজইয়াদে দেশি ভাতের হোটেলের সন্ধান সবাই খোঁজেন।",
    aeoDirectAnswerEn:
      "Authentic Bangladeshi rice, daal, rui/hilsha fish, and bharta meals cost SAR 12–20 (BDT 390–650) along Makkah's Ibrahim Al Khalil Road (Misflah), Lower Ajyad alleys, and Madinah's Markazia South/West Bengalee lanes, alongside Al Baik at Jabal Omar and Clock Tower Basement.",
    aeoDirectAnswerBn:
      "মক্কার ইব্রাহিম খলিল রোড (মিসফালাহ), আজইয়াদ এবং মদিনার মারকাজিয়া সাউথে মাত্র ১২–২০ রিয়ালে (৩৯০–৬৫০ টাকা) দেশি ভাত, ডাল, মাছ ও ভর্তা পাওয়া যায়।",
    eavTriples: "Makkah Bangladeshi Meal (Entity) → Average Per-Meal Price (Attribute) → SAR 12–20 / BDT 390–650 (Value)",
    targetPath: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals",
    isLiveBlog: true,
  },

  // ============================================================================
  // CLUSTER 2: SAUDI ZIYARAH, GCC STOPOVERS & ISLAMIC HERITAGE (5 TOPICS)
  // ============================================================================
  {
    id: "is-01",
    clusterId: "islamic-stopover",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Complete Makkah, Madinah, Badr & Taif Historical Ziyarah Guide: Private Family Taxi Rates in SAR & BDT",
    titleBn: "মক্কা, মদিনা, বদর প্রান্তর ও তায়েফ জিয়ারত গাইড: ঐতিহাসিক স্থানগুলোর তালিকা ও প্রাইভেট গাড়ি ভাড়া",
    primaryKeyword: "makkah madinah ziyarat places list bangla",
    secondaryKeywords: ["taif day trip from makkah cost", "masjid quba 2 rakat umrah reward", "badr battlefield distance from madinah"],
    monthlyIntentSignal: "High · Spiritual Enrichment & Local Transport Intent",
    customerPsychologyEn:
      "Connecting History with Faith: Pilgrims want their children to understand the Seerah at Mount Uhud, Cave Hira, Quba Mosque, and Taif without getting overcharged by street taxi touts.",
    customerPsychologyBn:
      "সীরাতের ইতিহাসের সাথে পরিচয়: হাজীরা উহুদ পাহাড়, হেরা গুহা, মসজিদে কুবা ও তায়েফ জিয়ারতের সময় ট্যাক্সি চালকদের কাছে না ঠকে সঠিক ভাড়া জানতে চান।",
    aeoDirectAnswerEn:
      "A private 4-seater sedan for a 3-hour morning Ziyarah costs SAR 150–200 in Makkah (Jabal al-Noor, Jabal Thawr, Mina, Arafat) and SAR 120–160 in Madinah (Masjid Quba, Mount Uhud, Qiblatain, Khandaq), while a full-day Taif roundtrip costs SAR 350–450.",
    aeoDirectAnswerBn:
      "পুরো পরিবারের জন্য প্রাইভেট গাড়িতে মক্কা জিয়ারত ১৫০–২০০ রিয়াল, মদিনা জিয়ারত ১২০–১৬০ রিয়াল এবং তায়েফ ডে-ট্রিপ ৩৫০–৪৫০ রিয়াল খরচে সম্পন্ন করা যায়।",
    eavTriples: "Madinah Private Ziyarah Car (Entity) → 3-Hour Standard Fare (Attribute) → SAR 120–160 / BDT 3,900–5,200 (Value)",
    targetPath: "/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide",
    isLiveBlog: true,
  },
  {
    id: "is-02",
    clusterId: "islamic-stopover",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Umrah + Dubai 10-Day Combo Trip from Dhaka: How to Combine Makkah, Madinah & UAE on One Multi-City Ticket",
    titleBn: "একই ট্রিপে Umrah + Dubai ভ্রমণ গাইড: ঢাকা থেকে ১০ দিনে মক্কা, মদিনা ও দুবাই ঘোরার মাল্টি-সিটি বাজেট",
    primaryKeyword: "umrah with dubai tour package from bangladesh",
    secondaryKeywords: ["dhaka to jeddah to dubai to dhaka flight", "uae transit visa with umrah", "umrah and dubai family trip cost bdt"],
    monthlyIntentSignal: "High · High-AOV Family Holiday + Spiritual Combo",
    customerPsychologyEn:
      "Fulfilling Spiritual Duty + Kids' Vacation in One Airfare: Families flying via the Gulf love performing Umrah first and spending 3 days in Dubai (Burj Khalifa & Desert Safari) on the way back to Dhaka.",
    customerPsychologyBn:
      "ইবাদত ও পারিবারিক ভ্রমণ একসাথে: প্রথমে পবিত্র ওমরাহ পালন করে ফেরার পথে ৩ দিন দুবাই ঘুরে আসলে আলাদা বিমান ভাড়ার টাকা বেঁচে যায়।",
    aeoDirectAnswerEn:
      "By booking a Multi-City ticket on Emirates, flydubai, Air Arabia, or Saudia (DAC → JED/MED → DXB → DAC) and pairing an Umrah e-Visa with a 30-day UAE e-Visa (or 96h UAE Transit Visa), families save BDT 35,000+ per person on airfare compared to two separate trips.",
    aeoDirectAnswerBn:
      "মাল্টি-সিটি টিকিটে ঢাকা → জেদ্দা/মদিনা → দুবাই → ঢাকা বুক করলে দুটি আলাদা ট্রিপের চেয়ে জনপ্রতি ৩৫,০০০+ টাকা বিমান ভাড়া সাশ্রয় হয়।",
    eavTriples: "Umrah + Dubai Multi-City Route (Entity) → Per-Person Airfare Savings (Attribute) → BDT 35,000+ vs Separate Trips (Value)",
    targetPath: "/blog/umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide",
    isLiveBlog: true,
  },
  {
    id: "is-03",
    clusterId: "islamic-stopover",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Abu Dhabi Sheikh Zayed Grand Mosque, Qasr Al Watan & Louvre Day Trip Guide from Dubai",
    titleBn: "দুবাই থেকে আবুধাবি ডে-ট্রিপ গাইড: শেখ জায়েদ গ্র্যান্ড মসজিদ, কাসর আল ওয়াতান ও লুভর মিউজিয়াম",
    primaryKeyword: "dubai to abu dhabi day trip bangladesh",
    secondaryKeywords: ["sheikh zayed grand mosque dress code", "e100 bus dubai to abu dhabi fare", "qasr al watan ticket price bdt"],
    monthlyIntentSignal: "Medium-High · Cultural & Architectural Sightseeing",
    customerPsychologyEn:
      "Awe for Islamic Architectural Grandeur: Bangladeshi travelers visiting the UAE consider Sheikh Zayed Grand Mosque an absolute must-visit alongside Dubai's modern skyline.",
    customerPsychologyBn:
      "ইসলামিক স্থাপত্যের প্রতি মুগ্ধতা: আরব আমিরাত সফরে যাওয়া প্রতিটি বাংলাদেশি পরিবার আবুধাবির শেখ জায়েদ গ্র্যান্ড মসজিদ নিজের চোখে দেখতে চায়।",
    aeoDirectAnswerEn:
      "Take the RTA E100 or E101 intercity bus from Ibn Battuta or Al Ghubaiba in Dubai to Abu Dhabi Central Bus Station (AED 25 / ~BDT 850 each way, 90 mins). Entry to Sheikh Zayed Grand Mosque is 100% free via online pre-registration.",
    aeoDirectAnswerBn:
      "দুবাইয়ের ইবনে বতুতা স্টেশন থেকে E101 বাসে মাত্র ২৫ দিরহামে (৮৫০ টাকা) আবুধাবি যাওয়া যায় এবং শেখ জায়েদ গ্র্যান্ড মসজিদে প্রবেশ সম্পূর্ণ ফ্রি।",
    eavTriples: "Sheikh Zayed Grand Mosque (Entity) → Entry Ticket Fee (Attribute) → AED 0 / 100% Free with Online QR (Value)",
    targetPath: "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide",
    isLiveBlog: true,
  },
  {
    id: "is-04",
    clusterId: "islamic-stopover",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Malaysia Islamic Heritage & Halal Family Trail: Putrajaya Pink Mosque, Islamic Arts Museum & KLCC",
    titleBn: "মালয়েশিয়া ইসলামিক হেরিটেজ ও হালাল ফ্যামিলি ট্যুর: পুত্রজায়া পিঙ্ক মসজিদ, ইসলামিক আর্টস মিউজিয়াম ও KLCC",
    primaryKeyword: "malaysia halal family tour from bangladesh",
    secondaryKeywords: ["putrajaya mosque tour from kl", "islamic arts museum malaysia ticket", "best family area in kuala lumpur"],
    monthlyIntentSignal: "High · Stress-Free Muslim Family Vacation Intent",
    customerPsychologyEn:
      "Zero Cultural Friction: Bangladeshi families feel immediately at home in Malaysia because JAKIM Halal food and clean prayer rooms (Surau) exist inside every shopping mall and theme park.",
    customerPsychologyBn:
      "শতভাগ হালাল ও নামাজ-বান্ধব পরিবেশ: মালয়েশিয়ার প্রতিটি মল ও থিম পার্কে সুন্দর নামাজের স্থান (Surau) ও হালাল খাবার থাকায় বাংলাদেশি পরিবারগুলো সবচেয়ে স্বাচ্ছন্দ্য বোধ করে।",
    aeoDirectAnswerEn:
      "Kuala Lumpur and Putrajaya offer Asia's top Muslim-friendly infrastructure: take the MRT Putrajaya Line (MYR 6 / ~BDT 165) to Putra Mosque and Lake Cruise, visit the Islamic Arts Museum Malaysia near National Mosque, and dine at 100% JAKIM-certified Halal courts across KLCC.",
    aeoDirectAnswerBn:
      "কুয়ালালামপুর থেকে MRT ট্রেনে মাত্র ৬ রিঙ্গিতে পুত্রজায়া পিঙ্ক মসজিদ ও লেক ক্রুজ ঘোরা যায় এবং প্রতিটি শপিং মলে সরকারি JAKIM হালাল খাবার পাওয়া যায়।",
    eavTriples: "Malaysia Outbound Tourism (Entity) → Halal Certification Authority (Attribute) → JAKIM Official Standard (Value)",
    targetPath: "/blog/malaysia-islamic-heritage-putrajaya-halal-family-tour-guide",
    isLiveBlog: true,
  },
  {
    id: "is-05",
    clusterId: "islamic-stopover",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Europe, UK & USA Sightseeing for Bangladeshi Travelers: Pre-Booking Skip-the-Line Museum & River Passes in BDT",
    titleBn: "ইউরোপ, লন্ডন ও আমেরিকা ভ্রমণে বাংলাদেশিদের গাইড: আইফেল টাওয়ার, লন্ডন আই ও মিউজিয়াম স্কিপ-দ্য-লাইন পাস",
    primaryKeyword: "paris london italy tour guide from bangladesh",
    secondaryKeywords: ["louvre eiffel tower ticket booking bd", "london eye thames cruise ticket", "us uk schengen stopover umrah"],
    monthlyIntentSignal: "Medium-High · High-Net-Worth & NRB Diaspora Intent",
    customerPsychologyEn:
      "Bridging Western Travel with Umrah Eligibility: Travelers holding US/UK/Schengen visas represent the exact demographic eligible for instant 1-year Saudi e-Visas AND high-ticket Tiqets attraction bundles.",
    customerPsychologyBn:
      "উন্নত দেশের ভ্রমণ ও ইনস্ট্যান্ট ওমরাহ সুবিধা: যাদের পাসপোর্টে US, UK বা Schengen ভিসা আছে তারা যেমন ইউরোপ-আমেরিকা ঘোরেন, তেমনি তাৎক্ষণিক ১ বছরের সৌদি ই-ভিসারও যোগ্য।",
    aeoDirectAnswerEn:
      "Bangladeshi travelers holding valid used US, UK, or Schengen visas can pair their London, Paris, Rome, or New York itinerary with an instant 1-year Saudi e-Visa, while pre-booking Tiqets skip-the-line passes to save 2–3 hours at the Louvre, Eiffel Tower, and Colosseum.",
    aeoDirectAnswerBn:
      "বৈধ US, UK বা Schengen ভিসাধারীরা অনলাইনে ১ বছরের সৌদি ই-ভিসা নিতে পারেন এবং প্যারিস, লন্ডন ও রোমের জনপ্রিয় স্থানে Tiqets স্কিপ-দ্য-লাইন পাস বুক করে ঘণ্টার পর ঘণ্টা লাইন এড়াতে পারেন।",
    eavTriples: "Used US/UK/Schengen Visa on BD Passport (Entity) → Saudi Visa Benefit (Attribute) → Instant 1-Year Multiple-Entry e-Visa / VOA (Value)",
    targetPath: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide",
    isLiveBlog: true,
  },

  // ============================================================================
  // CLUSTER 3: BANGLADESH OUTBOUND BANKING, DUAL-CURRENCY & BDT FX (5 TOPICS)
  // ============================================================================
  {
    id: "bf-01",
    clusterId: "banking-fx",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "How to Get Dual-Currency Card Endorsement in Bangladesh (2026): $12,000 Passport Quota & 3D-Secure Guide",
    titleBn: "বাংলাদেশে Dual-Currency Card ও Passport Dollar Endorsement করার নিয়ম (2026): $12,000 কোটা ও ব্যাংক গাইড",
    primaryKeyword: "dual currency card endorsement bangladesh",
    secondaryKeywords: ["passport dollar endorsement limit 2026", "ebl aqua prepaid card endorsement", "how to enable ecommerce in brac astha"],
    monthlyIntentSignal: "Massive Search Volume · #1 Pre-Booking Blocker in BD",
    customerPsychologyEn:
      "Removing the #1 Online Booking Blocker: A Bangladeshi traveler cannot book a single flight, Makkah hotel, or Haramain train ticket online until their card is passport-endorsed and 3D-Secure is unlocked.",
    customerPsychologyBn:
      "অনলাইন বুকিংয়ের প্রধান বাধা দূর করা: পাসপোর্টে ডলার এনডোর্সমেন্ট ও ব্যাংকের অ্যাপে USD E-Commerce চালু না করলে কোনো বিদেশি সাইটে পেমেন্ট হয় না—তাই এটি সবচেয়ে জরুরি গাইড।",
    aeoDirectAnswerEn:
      "Every adult Bangladeshi passport holder can endorse up to USD $12,000 per calendar year at any Authorized Dealer (AD) bank branch using their valid passport and NID, then unlock the USD E-Commerce and 3D-Secure toggle in their bank app before paying online.",
    aeoDirectAnswerBn:
      "প্রাপ্তবয়স্ক বাংলাদেশি নাগরিকরা পাসপোর্টে বছরে সর্বোচ্চ $12,000 USD এনডোর্স করতে পারেন এবং ব্যাংকের অ্যাপ থেকে USD ও 3D-Secure অন করে অনলাইনে আন্তর্জাতিক পেমেন্ট করতে পারেন।",
    eavTriples: "Bangladesh Bank Travel Quota (Entity) → Annual Adult Limit (Attribute) → USD $12,000 per Calendar Year (Value)",
    targetPath: "/blog/dual-currency-card-endorsement-bangladesh",
    isLiveBlog: true,
  },
  {
    id: "bf-02",
    clusterId: "banking-fx",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Best Shariah-Compliant Islamic Dual-Currency Cards in Bangladesh for Umrah & Halal Travel (2026)",
    titleBn: "ওমরাহ ও হালাল ভ্রমণের জন্য বাংলাদেশের সেরা শরীয়াহ-সম্মত ইসলামিক Dual-Currency Card তুলনা (2026)",
    primaryKeyword: "islamic dual currency card bangladesh",
    secondaryKeywords: ["islami bank khidmah card endorsement", "city bank islamic amex card", "ebl islamic dual currency debit card"],
    monthlyIntentSignal: "High · Religious Financial Compliance Intent",
    customerPsychologyEn:
      "Strict Avoidance of Riba (Interest) During Pilgrimage: Many devout Umrah & Hajj pilgrims refuse conventional interest-bearing credit cards and actively search for Ujrah/Mudaraba Islamic debit or prepaid cards.",
    customerPsychologyBn:
      "পবিত্র সফরে সুদ (রিবা) সম্পূর্ণ বর্জন: ধর্মপ্রাণ হাজীরা সাধারণ ক্রেডিট কার্ড ব্যবহার করতে চান না; তারা শরীয়াহ-সম্মত ইসলামিক ডেবিট বা প্রিপেইড কার্ড দিয়ে মক্কার হোটেল ও ট্রেন বুক করতে চান।",
    aeoDirectAnswerEn:
      "Top Shariah-compliant dual-currency cards in Bangladesh include Islami Bank (IBBL) Dual-Currency Debit & Khidmah Card, City Islamic American Express, EBL Islamic Debit Card, Al-Arafah La-Riba Card, and Standard Chartered Saadiq—all supporting the $12,000 passport travel quota without interest.",
    aeoDirectAnswerBn:
      "ইসলামী ব্যাংক (IBBL) ডুয়াল-কারেন্সি ডেবিট ও খিদমাহ কার্ড, সিটি ইসলামিক অ্যামেক্স, ইবিএল ইসলামিক এবং আল-আরাফাহ লা-রিবা কার্ড দিয়ে সুদমুক্তভাবে ওমরাহর সব অনলাইন পেমেন্ট করা যায়।",
    eavTriples: "Islamic Dual-Currency Debit Card (Entity) → Shariah Mechanism (Attribute) → Mudaraba / Ujrah Zero-Riba Structure (Value)",
    targetPath: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah",
    isLiveBlog: true,
  },
  {
    id: "bf-03",
    clusterId: "banking-fx",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "RFCD Account vs. Regular Travel Quota in Bangladesh: How to Avoid the $300 Single-Transaction Cap",
    titleBn: "RFCD Account বনাম সাধারণ Travel Quota: আন্তর্জাতিক ফ্লাইট ও হোটেল পেমেন্টে $300 লিমিট সমস্যার সমাধান",
    primaryKeyword: "rfcd account bangladesh benefits",
    secondaryKeywords: ["300 dollar transaction limit bangladesh bank", "how to open rfcd account in ebl city bank", "pay large hotel bill from bangladesh"],
    monthlyIntentSignal: "High · High-Ticket Payment Troubleshooting Intent",
    customerPsychologyEn:
      "Frustration When a $900 Flight Payment Declines: Travelers get stuck at checkout when banks enforce a $300 e-commerce cap. Explaining RFCD accounts and call-center limit relaxation wins immediate trust.",
    customerPsychologyBn:
      "বড় অঙ্কের টিকিট কাটতে গিয়ে কার্ড ডিক্লাইন হওয়ার হতাশা: অনেক ব্যাংকে একবারে $300-এর বেশি পেমেন্ট আটকে যায়; RFCD একাউন্ট ও কল সেন্টার প্রি-অথরাইজেশনের নিয়ম জানলে এই ঝামেলা থাকে না।",
    aeoDirectAnswerEn:
      "Depositing leftover foreign currency cash upon returning to Bangladesh lets you open an RFCD (Resident Foreign Currency Deposit) account and international debit card, which holds balances directly in USD/GBP/EUR with zero single-transaction e-commerce caps.",
    aeoDirectAnswerBn:
      "বিদেশ থেকে ফেরার সময় বেঁচে যাওয়া নগদ ডলার ব্যাংকে জমা দিয়ে RFCD একাউন্ট খুললে সরাসরি ডলারে ব্যালেন্স থাকে এবং বড় অঙ্কের ফ্লাইট বা হোটেল বুকিংয়ে কোনো $300 ক্যাপ থাকে না।",
    eavTriples: "RFCD Account Bangladesh (Entity) → Key Advantage (Attribute) → No $300 Single E-Commerce Cap (Value)",
    targetPath: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix",
    isLiveBlog: true,
  },
  {
    id: "bf-04",
    clusterId: "banking-fx",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "How to Book International Flights, Makkah Hotels & Airport Transfers in BDT via bKash/Bank Transfer (No Card Needed)",
    titleBn: "Dual-Currency Card ছাড়াই bKash বা দেশীয় ব্যাংক ট্রান্সফারে (BDT) ফ্লাইট, ওমরাহ হোটেল ও ট্রান্সফার বুক করার নিয়ম",
    primaryKeyword: "book international flight with bkash bangladesh",
    secondaryKeywords: ["book makkah hotel in bdt without credit card", "agoda booking in bdt from dhaka", "ural whatsapp bdt booking desk"],
    monthlyIntentSignal: "Very High · Direct Assisted-Booking Conversion Intent",
    customerPsychologyEn:
      "Instant Relief for Non-Cardholders: Over 70% of first-time Bangladeshi travelers and rural/suburban families do not have an endorsed dual-currency card ready when a cheap fare drops.",
    customerPsychologyBn:
      "কার্ড না থাকা যাত্রীদের তাৎক্ষণিক সমাধান: বাংলাদেশের বিপুল সংখ্যক যাত্রীর হাতে এনডোর্স করা কার্ড থাকে না—তারা বিশ্বস্ত সাপোর্ট ডেস্কের মাধ্যমে দেশীয় টাকায় (BDT) কনফার্মড ভাউচার পেতে চান।",
    aeoDirectAnswerEn:
      "Travelers without an endorsed dual-currency card can message the URAL Dhaka BDT Support Desk on WhatsApp (+8801784385335) to issue confirmed airline PNR tickets, Makkah/Madinah or Asian hotel vouchers, and airport transfers using local BDT bank transfer, bKash, or Nagad.",
    aeoDirectAnswerBn:
      "হাতে ডুয়াল-কারেন্সি কার্ড না থাকলে URAL-এর ঢাকা WhatsApp ডেস্কে (+8801784385335) যোগাযোগ করে দেশীয় ব্যাংক ট্রান্সফার, বিকাশ বা নগদে পেমেন্ট করেই কনফার্মড ফ্লাইট ও হোটেল বুক করা যায়।",
    eavTriples: "URAL BDT Booking Desk (Entity) → Accepted Local Payment Methods (Attribute) → BDT Bank Transfer, bKash, Nagad (Value)",
    targetPath: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card",
    isLiveBlog: true,
  },
  {
    id: "bf-05",
    clusterId: "banking-fx",
    funnelStage: "ToFu (Trust & Preparation)",
    titleEn: "Cash SAR / USD vs. Dual-Currency Card in Makkah, Bangkok & Kuala Lumpur: Avoiding 5% DCC & Money Changer Traps",
    titleBn: "মক্কা, ব্যাংকক ও কুয়ালালামপুরে নগদ ডলার/রিয়াল বনাম কার্ড: ৫% DCC চার্জ ও মানি এক্সচেঞ্জ লস বাঁচানোর উপায়",
    primaryKeyword: "carry Riyal or USD for umrah from bangladesh",
    secondaryKeywords: ["best money exchange in bangkok pratunam superrich", "atm withdrawal charge abroad bangladesh card", "dcc fee pos machine"],
    monthlyIntentSignal: "High · Practical FX Optimization Intent",
    customerPsychologyEn:
      "Protecting Hard-Earned Taka from Hidden Exchange Spreads: Travelers hate losing BDT 5,000–8,000 to airport money changers or double conversion (BDT→USD→SAR).",
    customerPsychologyBn:
      "কষ্টার্জিত টাকার মানি এক্সচেঞ্জ লস ঠেকানো: এয়ারপোর্টের মানি চেঞ্জারে বা ডাবল কনভার্সনে যেন ৫–৮ হাজার টাকা গচ্চা না যায়, সেজন্য সঠিক কারেন্সি কৌশল জানা।",
    aeoDirectAnswerEn:
      "For Umrah, buy Saudi Riyals (SAR) directly in Dhaka for daily cash expenses to avoid double conversion (BDT→USD→SAR), and always select 'Pay in Local Currency (SAR/THB/MYR)' on overseas POS terminals to avoid 4%–6% Dynamic Currency Conversion (DCC) surcharges.",
    aeoDirectAnswerBn:
      "ওমরাহর জন্য ঢাকা থেকেই নগদ সৌদি রিয়াল (SAR) কিনলে ডাবল কনভার্সন লস বাঁচে এবং বিদেশে কার্ড পাঞ্চ করার সময় সবসময় Local Currency সিলেক্ট করলে ৫% DCC চার্জ কাটে না।",
    eavTriples: "Overseas POS Card Payment (Entity) → Optimal Currency Selection (Attribute) → Local Currency (SAR/THB/MYR/AED) (Value)",
    targetPath: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide",
    isLiveBlog: true,
  },

  // ============================================================================
  // CLUSTER 4: DHAKA AIRPORT IMMIGRATION, NOC/GO & VISA MASTERY (5 TOPICS)
  // ============================================================================
  {
    id: "iv-01",
    clusterId: "immigration-visa",
    funnelStage: "ToFu (Trust & Preparation)",
    titleEn: "Dhaka Airport (DAC) Outbound Immigration Checklist 2026: NOC, GO, Return Ticket & First-Time Flyer Rules",
    titleBn: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট 2026: NOC, GO, Return Ticket ও প্রথমবার ভ্রমণের নিয়ম",
    primaryKeyword: "dhaka airport immigration questions for first time",
    secondaryKeywords: ["noc format for private job holder bangladesh", "government order go for foreign travel", "offload at dhaka airport reasons"],
    monthlyIntentSignal: "Massive Search Volume · High Airport Anxiety Intent",
    customerPsychologyEn:
      "Overcoming 'Offload' Fear at Hazrat Shahjalal Airport: First-time flyers with fresh passports worry about harsh questioning at the Dhaka emigration desk. A clear 5-document folder checklist replaces fear with confidence.",
    customerPsychologyBn:
      "ঢাকা এয়ারপোর্টে ইমিগ্রেশন ভীতি দূর করা: নতুন পাসপোর্টে প্রথমবার বিদেশ যাওয়ার সময় ইমিগ্রেশনে কী কী কাগজ চায় তা পরিষ্কারভাবে জানলে মাত্র ২ মিনিটেই ইমিগ্রেশন পার হওয়া যায়।",
    aeoDirectAnswerEn:
      "Carry a printed folder with 5 mandatory items at Dhaka Airport (DAC): 6-month valid passport (with old passports attached), printed visa/arrival QR code, confirmed return ticket, hotel booking voucher, and passport USD endorsement—plus your job NOC, Govt GO, or Trade License.",
    aeoDirectAnswerBn:
      "ঢাকা এয়ারপোর্টে ৫টি প্রিন্ট করা কাগজ সাথে রাখুন: পাসপোর্ট, ভিসা/QR কোড, রিটার্ন টিকিট, হোটেল ভাউচার ও ডলার এনডোর্সমেন্ট এবং পেশা অনুযায়ী NOC, সরকারি GO বা ট্রেড লাইসেন্স।",
    eavTriples: "Dhaka Outbound Immigration (Entity) → Core Occupational Proofs (Attribute) → Private NOC / Govt GO / Trade License (Value)",
    targetPath: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
    isLiveBlog: true,
  },
  {
    id: "iv-02",
    clusterId: "immigration-visa",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Singapore Tourist Visa from Bangladesh (2026): Authorized Agents, Form V39A (LOI) & Photo Rules",
    titleBn: "বাংলাদেশ থেকে Singapore Tourist Visa গাইড (2026): অনুমোদিত এজেন্ট, LOI (Form V39A) ও আবেদন নিয়ম",
    primaryKeyword: "singapore visa processing in bangladesh",
    secondaryKeywords: ["singapore authorized visa agent list dhaka", "loi form v39a singapore without local contact", "sg arrival card bangladesh"],
    monthlyIntentSignal: "Very High · High-Intent Visa Application",
    customerPsychologyEn:
      "Demystifying the LOI (Form V39A) Hurdle: Applicants without a friend or relative in Singapore fear automatic rejection unless shown how Authorized Visa Agents handle tourist profiles.",
    customerPsychologyBn:
      "LOI (Form V39A) নিয়ে দুশ্চিন্তা দূর করা: সিঙ্গাপুরে পরিচিত কেউ না থাকলে কীভাবে অনুমোদিত এজেন্টের মাধ্যমে বৈধভাবে ভিসা পাবেন তা পরিষ্কারভাবে জানানো।",
    aeoDirectAnswerEn:
      "Singapore tourist visa applications from Bangladesh must be submitted via Consulate-Authorized Visa Agents in Dhaka/Chattogram with Form 14A, 35x45mm matte photos, a 6-month bank statement (BDT 1,50,000+ balance), and Form V39A (LOI). Total fee is BDT 4,200–6,500 (5–7 working days).",
    aeoDirectAnswerBn:
      "সিঙ্গাপুর ভিসার জন্য অনুমোদিত এজেন্টের মাধ্যমে Form 14A, ম্যাট ছবি, ৬ মাসের ব্যাংক স্টেটমেন্ট (১.৫ লক্ষ+ টাকা) ও LOI জমা দিতে হয়; খরচ ৪,২০০–৬,৫০০ টাকা।",
    eavTriples: "Singapore Tourist e-Visa BD (Entity) → Submission Channel (Attribute) → Consulate-Authorized Visa Agents Only (Value)",
    targetPath: "/blog/singapore-visa-guide-bangladesh-agents",
    isLiveBlog: true,
  },
  {
    id: "iv-03",
    clusterId: "immigration-visa",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Thailand Official e-Visa from Bangladesh (thaievisa.go.th): Document Upload, Bank Balance & Rejection Fixes",
    titleBn: "বাংলাদেশ থেকে অনলাইনে Thailand e-Visa করার নিয়ম (thaievisa.go.th): ডকুমেন্ট, ব্যাংক ব্যালেন্স ও চেকলিস্ট",
    primaryKeyword: "thailand evisa for bangladeshi citizens",
    secondaryKeywords: ["thaievisa.go.th dhaka payment", "bank balance needed for thailand visa bd", "thailand tourist visa processing time dhaka"],
    monthlyIntentSignal: "Very High · Digital Portal Transition Intent",
    customerPsychologyEn:
      "Adapting to the New Online e-Visa Era: Since the Royal Thai Embassy Dhaka shifted to thaievisa.go.th, travelers want exact PDF scan specifications so they don't lose their non-refundable visa fee.",
    customerPsychologyBn:
      "নতুন অনলাইন ই-ভিসা পোর্টালে নির্ভুল আবেদন: thaievisa.go.th-এ ছবি ও ব্যাংক স্টেটমেন্ট কীভাবে আপলোড করলে প্রথমবারেই ভিসা অনুমোদন হবে তা জানা।",
    aeoDirectAnswerEn:
      "Bangladeshi citizens apply online via thaievisa.go.th (Dhaka jurisdiction) for a 60-day Tourist Visa (TR) by uploading passport scans, return tickets, hotel bookings, and a 6-month bank statement showing at least BDT 65,000 (THB 20,000) per person. Processing takes 5–10 working days.",
    aeoDirectAnswerBn:
      "thaievisa.go.th পোর্টালে জনপ্রতি অন্তত ৬৫,০০০ টাকা ব্যাংক ব্যালেন্স ও রিটার্ন টিকিট আপলোড করে আবেদন করলে ৫–১০ কার্যদিবসে ৬০ দিনের থাইল্যান্ড ই-ভিসা পাওয়া যায়।",
    eavTriples: "Thailand Tourist e-Visa BD (Entity) → Minimum Bank Balance (Attribute) → BDT 65,000 / THB 20,000 per Person (Value)",
    targetPath: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide",
    isLiveBlog: true,
  },
  {
    id: "iv-04",
    clusterId: "immigration-visa",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Malaysia Online e-Visa & Free MDAC Arrival Card Guide for Bangladeshi Passports (2–4 Day Approval)",
    titleBn: "বাংলাদেশিদের জন্য Malaysia e-Visa ও ফ্রি MDAC কার্ড গাইড: ঘরে বসে ২–৪ দিনে ভিসা পাওয়ার নিয়ম",
    primaryKeyword: "malaysia evisa for bangladesh",
    secondaryKeywords: ["mdac malaysia digital arrival card bangla", "malaysia tourist visa bank statement bd", "klia1 immigration checklist for bangladeshi"],
    monthlyIntentSignal: "Very High · Fast Family & First-Timer Visa Intent",
    customerPsychologyEn:
      "Zero-Passport-Drop Convenience: Travelers love that Malaysia's e-Visa requires no physical passport submission, provided they also know KLIA1 immigration's strict printed return-ticket and MDAC rules.",
    customerPsychologyBn:
      "পাসপোর্ট জমা ছাড়াই দ্রুত ভিসা: ঘরে বসে অনলাইনে ভিসা পাওয়া এবং কুয়ালালামপুর এয়ারপোর্টে (KLIA) ফ্রি MDAC কার্ড দেখিয়ে সহজে ইমিগ্রেশন পার হওয়ার নিশ্চয়তা।",
    aeoDirectAnswerEn:
      "Apply online for a Malaysia 30-day Tourist e-Visa (BDT 3,800–4,200; approved in 2–4 business days) with a 6-month bank statement showing BDT 80,000+ balance, and complete the free Malaysia Digital Arrival Card (MDAC) within 3 days before landing at KLIA.",
    aeoDirectAnswerBn:
      "৮০,০০০+ টাকা ব্যাংক ব্যালেন্স দেখিয়ে অনলাইনে আবেদন করলে ২–৪ দিনে মালয়েশিয়া ই-ভিসা (BDT ৩,৮০০–৪,২০০) পাওয়া যায় এবং ফ্লাইটের ৩ দিন আগে ফ্রি MDAC পূরণ করতে হয়।",
    eavTriples: "Malaysia Entry for Bangladeshis (Entity) → Pre-Arrival Digital Form (Attribute) → Free MDAC within 72 Hours (Value)",
    targetPath: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration",
    isLiveBlog: true,
  },
  {
    id: "iv-05",
    clusterId: "immigration-visa",
    funnelStage: "ToFu (Trust & Preparation)",
    titleEn: "First International Trip on a Fresh Bangladeshi Passport: Why Nepal or Maldives + Malaysia Builds Best Travel History",
    titleBn: "নতুন পাসপোর্টে (Fresh Passport) প্রথম বিদেশ ভ্রমণ: কীভাবে সহজে Travel History তৈরি করবেন?",
    primaryKeyword: "fresh passport visa from bangladesh",
    secondaryKeywords: ["how to build travel history for schengen visa bd", "easiest country to visit from bangladesh", "nepal maldives visa on arrival for fresh passport"],
    monthlyIntentSignal: "High · Aspirational Global Mobility Intent",
    customerPsychologyEn:
      "The 'Fresh Passport' Catch-22: Young professionals and families worry embassies will reject a blank passport. Providing a proven 3-step Travel History Ladder turns beginners into repeat URAL customers.",
    customerPsychologyBn:
      "সাদা পাসপোর্টে ভিসা রিজেকশনের ভয়: প্রথমে ফ্রি অন-অ্যারাইভাল ভিসার দেশে ঘুরে পরে ই-ভিসা ও উন্নত দেশের ভিসা পাওয়ার ধাপে ধাপে রোডম্যাপ।",
    aeoDirectAnswerEn:
      "Build a strong Bangladeshi passport history in 3 steps: Step 1 — Stamp a free Visa on Arrival in Nepal or the Maldives; Step 2 — Obtain online e-Visas for Malaysia and Thailand; Step 3 — Apply for Singapore, UAE, Saudi Umrah, or Schengen/UK visas with proven return compliance.",
    aeoDirectAnswerBn:
      "৩ ধাপে ট্রাভেল হিস্ট্রি গড়ুন: ১. নেপাল বা মালদ্বীপে ফ্রি অন-অ্যারাইভাল সফর; ২. মালয়েশিয়া ও থাইল্যান্ড ই-ভিসা; ৩. সিঙ্গাপুর, দুবাই ও উন্নত দেশের ভিসা আবেদন।",
    eavTriples: "Fresh BD Passport Strategy (Entity) → Step 1 Zero-Risk Entry (Attribute) → Nepal Free SAARC VOA or Maldives 30-Day VOA (Value)",
    targetPath: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia",
    isLiveBlog: true,
  },

  // ============================================================================
  // CLUSTER 5: HALAL FAMILY HOLIDAYS, BUDGETS & MEDICAL TOURISM (5 TOPICS)
  // ============================================================================
  {
    id: "hf-01",
    clusterId: "halal-family",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Top 6 Budget-Friendly Family Destinations from Dhaka in 2026 (Ranked by 5-Day BDT Cost & Visa Ease)",
    titleBn: "ঢাকা থেকে পরিবারের সাথে ঘোরার সেরা ৬টি বাজেট ফ্রেন্ডলি দেশ (2026 — BDT খরচ ও Visa তুলনা)",
    primaryKeyword: "family tour package from bangladesh price",
    secondaryKeywords: ["cheapest country to visit from bangladesh with family", "5 day foreign trip under 50000 bdt", "best halal holiday from dhaka"],
    monthlyIntentSignal: "Very High · Eid & School Holiday Family Planning",
    customerPsychologyEn:
      "Total Family Budget Predictability: A father or mother multiplying trip costs by 4 family members needs honest, all-inclusive 5-day BDT numbers before committing to a destination.",
    customerPsychologyBn:
      "সপরিবারে মোট খরচের সঠিক হিসাব: ৪ সদস্যের পরিবারের জন্য টিকিট, হোটেল ও খাবারসহ মোট কত টাকা লাগবে তা এক নজরে তুলনা করে সিদ্ধান্ত নেওয়া।",
    aeoDirectAnswerEn:
      "Ranked by 5-day per-person family sharing cost from Dhaka: 1. Nepal (BDT 42k–55k, Free VOA), 2. Malaysia (BDT 68k–85k, Online e-Visa), 3. Thailand (BDT 72k–92k, e-Visa), 4. Maldives Maafushi (BDT 75k–98k, Free VOA), 5. Singapore (BDT 98k–1.35L), and 6. Dubai (BDT 1.10L–1.45L).",
    aeoDirectAnswerBn:
      "ঢাকা থেকে ৫ দিনের জনপ্রতি ফ্যামিলি খরচ: ১. নেপাল (৪২–৫৫ হাজার টাকা), ২. মালয়েশিয়া (৬৮–৮৫ হাজার), ৩. থাইল্যান্ড (৭২–৯২ হাজার), ৪. মালদ্বীপ মাফুশি (৭৫–৯৮ হাজার), ৫. সিঙ্গাপুর ও ৬. দুবাই।",
    eavTriples: "Lowest-Cost Family Trip from Dhaka (Entity) → 5-Day All-In BDT Budget (Attribute) → Nepal at BDT 42,000–55,000/Person (Value)",
    targetPath: "/blog/top-budget-family-destinations-from-dhaka",
    isLiveBlog: true,
  },
  {
    id: "hf-02",
    clusterId: "halal-family",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Where to Eat Halal Food in Bangkok + Family Medical Checkup Guide (Pratunam, Sukhumvit Soi 3 & Bumrungrad)",
    titleBn: "ব্যাংককে Halal খাবারের সেরা জায়গা (Pratunam ও Sukhumvit Soi 3) এবং ফ্যামিলি হেলথ চেকআপ গাইড",
    primaryKeyword: "halal food in bangkok for bangladeshi",
    secondaryKeywords: ["pratunam halal restaurant list", "sukhumvit soi 3 arab street hotel", "bumrungrad hospital checkup cost bdt"],
    monthlyIntentSignal: "High · Dietary Safety & Medical Tourism Intent",
    customerPsychologyEn:
      "Eliminating Non-Halal Food Anxiety in a Non-Muslim Country: Bangladeshi families visiting Bangkok for shopping or hospital checkups need street-level Halal restaurant names and BDT meal prices.",
    customerPsychologyBn:
      "অমুসলিম দেশে শতভাগ হালাল খাবারের নিশ্চয়তা: থাইল্যান্ডে শপিং বা বামরুনগ্রাদ হাসপাতালে চেকআপে গিয়ে কোথায় হালাল ভাত ও কারি পাওয়া যাবে তার সুনির্দিষ্ট গাইড।",
    aeoDirectAnswerEn:
      "Look for the green Central Islamic Council of Thailand emblem and stay in Pratunam (Petchaburi Soi 7/15, Maidaun Halal) or Sukhumvit Soi 3/5 (Nana Arab Street, Al Hussain, near Bumrungrad Hospital), where certified Halal meals cost BDT 180–1,200.",
    aeoDirectAnswerBn:
      "ব্যাংককের Pratunam (Maidaun Halal) এবং বামরুনগ্রাদ হাসপাতালের কাছে Sukhumvit Soi 3 (Al Hussain) ও Siam Discovery-র Yana রেস্টুরেন্টে ১৮০–১,২০০ টাকায় সার্টিফাইড হালাল খাবার মেলে।",
    eavTriples: "Bangkok Halal Dining (Entity) → Top 2 Neighborhood Hubs (Attribute) → Pratunam Petchaburi Alleys & Sukhumvit Soi 3 (Value)",
    targetPath: "/blog/halal-food-guide-bangkok-bangladesh",
    isLiveBlog: true,
  },
  {
    id: "hf-03",
    clusterId: "halal-family",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Maldives Under BDT 75,000 from Dhaka: Maafushi Local Island vs. Private Water Villa Resort Guide",
    titleBn: "মাত্র ৭৫,০০০ টাকায় ঢাকা থেকে মালদ্বীপ ভ্রমণ: Maafushi Local Island বনাম প্রাইভেট রিসোর্ট গাইড",
    primaryKeyword: "maldives budget tour from bangladesh",
    secondaryKeywords: ["maafushi island package from dhaka", "maldives 1 day water villa pass", "imuga form maldives bangla"],
    monthlyIntentSignal: "High · Affordable Luxury & Honeymoon/Family Intent",
    customerPsychologyEn:
      "Shattering the 'Maldives Costs 3 Lakhs' Myth: Showing how a 100% Muslim country with free VOA can be visited for BDT 75k via Maafushi local island speedboats ($25) and $30 coral tours triggers instant desire.",
    customerPsychologyBn:
      "মালদ্বীপ মানেই আড়াই লক্ষ টাকা—এই ভুল ধারণা ভাঙা: ফ্রি ভিসায় ১০০% মুসলিম দেশ মালদ্বীপের মাফুশি দ্বীপে থেকে মাত্র ৭৫ হাজার টাকায় নীল সমুদ্র উপভোগের কৌশল।",
    aeoDirectAnswerEn:
      "By taking a $25 public speedboat from Malé Airport to Maafushi Local Island, booking 3–4 star beachfront hotels (BDT 6,500–9,500/night), and joining $30 group snorkeling/sandbank tours, Bangladeshi travelers can complete a 4–5 day Maldives trip for under BDT 75,000 including flights.",
    aeoDirectAnswerBn:
      "মালে এয়ারপোর্ট থেকে ২৫ ডলারের স্পিডবোটে মাফুশি লোকাল আইল্যান্ডে গিয়ে এবং ৩০ ডলারের স্নরকেলিং ট্যুর নিয়ে বিমান ভাড়াসহ মাত্র ৭৫,০০০ টাকায় মালদ্বীপ ঘুরে আসা যায়।",
    eavTriples: "Malé Airport to Maafushi (Entity) → Scheduled Speedboat Fare (Attribute) → USD $25 per Person (Value)",
    targetPath: "/blog/maldives-budget-trip-bangladesh-maafushi",
    isLiveBlog: true,
  },
  {
    id: "hf-04",
    clusterId: "halal-family",
    funnelStage: "BoFu (High Commercial)",
    titleEn: "Kathmandu to Pokhara 5-Day Nepal Itinerary for Bangladeshis: Free SAARC Visa, Sarangkot Sunrise & BDT Costs",
    titleBn: "কাঠমান্ডু ও পোখারা ৫ দিনের নেপাল ট্যুর প্ল্যান: ফ্রি SAARC ভিসা, হিমালয় সূর্যোদয় ও সম্পূর্ণ BDT বাজেট",
    primaryKeyword: "nepal tour cost from bangladesh",
    secondaryKeywords: ["kathmandu pokhara 5 days itinerary bdt", "dhaka to kathmandu flight fare", "halal food in thamel kathmandu"],
    monthlyIntentSignal: "Very High · #1 Entry-Level Outbound Route from Dhaka",
    customerPsychologyEn:
      "Zero-Friction Instant Getaway: Only 90 minutes from Dhaka with zero visa wait—perfect for Eid breaks, winter mountain views, and first-time international travelers.",
    customerPsychologyBn:
      "ভিসা ঝামেলা ছাড়া তাৎক্ষণিক হিমালয় ভ্রমণ: ঢাকা থেকে মাত্র দেড় ঘণ্টার ফ্লাইট ও ফ্রি অন-অ্যারাইভাল ভিসা হওয়ায় ঈদের ছুটিতে ঝটপট ঘুরে আসার সেরা জায়গা।",
    aeoDirectAnswerEn:
      "A 5-day Kathmandu and Pokhara trip from Dhaka costs BDT 40,000–54,000 per person all-in: roundtrip flights (BDT 28,000–35,000), free SAARC Gratis Visa on Arrival, 4 nights in Thamel/Phewa Lakeside hotels (BDT 4,000–6,000 share), and Sarangkot sunrise car hire.",
    aeoDirectAnswerBn:
      "ঢাকা থেকে ৫ দিনের কাঠমান্ডু ও পোখারা ভ্রমণে রাউন্ডট্রিপ বিমান টিকিট, ফ্রি ভিসা, হোটেল ও গাড়ি ভাড়াসহ জনপ্রতি মাত্র ৪০,০০০–৫৪,০০০ টাকা খরচ হয়।",
    eavTriples: "Nepal SAARC Tourist Visa (Entity) → First Annual Visit Fee for BD Citizens (Attribute) → USD $0 / Gratis (Value)",
    targetPath: "/blog/nepal-pokhara-itinerary-bangladesh",
    isLiveBlog: true,
  },
  {
    id: "hf-05",
    clusterId: "halal-family",
    funnelStage: "MoFu (Decision & Comparison)",
    titleEn: "Flight Delay, Cancellation & Lost Baggage Compensation for Bangladeshi Flyers: Claim Up to €600 (BDT 78,000)",
    titleBn: "ফ্লাইট ডিলে, ক্যান্সেল বা লাগেজ হারালে বাংলাদেশি যাত্রীরা কীভাবে সর্বোচ্চ €600 (BDT 78,000) ক্ষতিপূরণ পাবেন?",
    primaryKeyword: "flight delay compensation from bangladesh",
    secondaryKeywords: ["lost baggage claim jeddah dhaka flight", "eu261 uk261 compensation bangladeshi passenger", "airhelp claim promo code"],
    monthlyIntentSignal: "Medium-High · Post-Disruption Passenger Rights Intent",
    customerPsychologyEn:
      "Turning Travel Frustration into Cash Recovery: Most Bangladeshi passengers don't realize that a 3+ hour flight delay on UK/EU/Turkish/Saudi routes or lost Umrah luggage entitles them to up to €600 (~BDT 78,000) under international air passenger laws.",
    customerPsychologyBn:
      "ফ্লাইট বিলম্ব বা লাগেজ হারানোর ভোগান্তি থেকে আর্থিক ক্ষতিপূরণ আদায়: আন্তর্জাতিক আইন অনুযায়ী ৩ ঘণ্টার বেশি ফ্লাইট ডিলে বা লাগেজ মিসিং হলে যে ৭৮,০০০ টাকা পর্যন্ত ক্ষতিপূরণ পাওয়া যায় তা অনেকেই জানেন না।",
    aeoDirectAnswerEn:
      "Under EC 261, UK 261, GACA Saudi Passenger Rights, and the Montreal Convention, Bangladeshi travelers experiencing a 3+ hour arrival delay, last-minute cancellation, or lost baggage on eligible international flights can claim up to €600 (approx. BDT 78,000) per passenger.",
    aeoDirectAnswerBn:
      "আন্তর্জাতিক বিমান যাত্রী অধিকার আইন অনুযায়ী যোগ্য রুটে ৩+ ঘণ্টা ফ্লাইট বিলম্ব, বাতিল বা লাগেজ হারালে জনপ্রতি সর্বোচ্চ €600 (প্রায় ৭৮,০০০ টাকা) পর্যন্ত ক্ষতিপূরণ দাবি করা যায়।",
    eavTriples: "International Flight Disruption Claim (Entity) → Maximum Statutory Payout (Attribute) → €600 / ~BDT 78,000 per Passenger (Value)",
    targetPath: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp",
    isLiveBlog: true,
  },
];

interface TopicalAuthorityBlueprintProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

export const TopicalAuthorityBlueprint: React.FC<TopicalAuthorityBlueprintProps> = ({
  lang,
  onNavigate,
}) => {
  const isBn = lang === "bn";
  const [activeCluster, setActiveCluster] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredNodes = TOPICAL_BLOG_NODES.filter((node) => {
    const matchesCluster = activeCluster === "all" || node.clusterId === activeCluster;
    const q = searchTerm.trim().toLowerCase();
    const matchesQuery =
      !q ||
      node.titleEn.toLowerCase().includes(q) ||
      node.titleBn.toLowerCase().includes(q) ||
      node.primaryKeyword.toLowerCase().includes(q) ||
      node.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
      node.customerPsychologyEn.toLowerCase().includes(q);
    return matchesCluster && matchesQuery;
  });

  return (
    <section
      id="topical-authority-semantic-hub"
      className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8"
    >
      {/* 1. Section Header: Koray Tuğberk & Nathan Gotch Semantic Content Network */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-brand-navy">
              {isBn
                ? "টপিক্যাল অথরিটি ও AEO নলেজ হাব"
                : "Topical Authority & AEO Knowledge Graph"}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {isBn
                ? "৬টি কোর ক্লাস্টার · ৪১টি লাইভ সরকারি যাচাইকৃত গাইড (100% Complete)"
                : "6 Semantic Silos · 41 Live Verified Guides (100% Complete)"}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {isBn ? "প্রথম অগ্রাধিকার: Hajj ও Umrah" : "Priority #1: Hajj & Umrah Ecosystem"}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight text-balance">
            {isBn
              ? "বাংলাদেশি ভ্রমণকারী ও হাজীদের আসল সার্চ কিউওয়ার্ড, মনস্তত্ত্ব ও সরাসরি উত্তর (AEO Topic Matrix)"
              : "Complete Hajj, Umrah & Outbound Topic Matrix: Real Searches, Traveler Psychology & Direct Answers"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isBn
              ? "একজন বাংলাদেশি যাত্রী যখন মক্কা-মদিনায় Hajj/Umrah কিংবা পরিবার নিয়ে এশিয়া ভ্রমণের প্রস্তুতি নেন, তখন তার মনে যে প্রশ্ন, ভয় ও বাজেট চিন্তা তৈরি হয়—তার ওপর ভিত্তি করে এই ৩২টি কোর টপিক সাজানো হয়েছে। যেকোনো টপিকে ক্লিক করে সম্পূর্ণ গাইড বা ক্যালকুলেটরে যান।"
              : "Structured around how Bangladeshi pilgrims and outbound families actually search, think, and make booking decisions—connecting Priority #1 Hajj & Umrah preparation with banking endorsement, Dhaka Airport immigration, and Halal family corridors."}
          </p>
        </div>

        {/* Quick Architecture Summary Numbers */}
        <div className="grid grid-cols-3 gap-3 shrink-0 bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center tabular-nums">
          <div className="px-2">
            <div className="font-serif text-xl font-black text-brand-navy">12</div>
            <div className="text-[11px] text-slate-500">
              {isBn ? "Hajj/Umrah কোর" : "Hajj/Umrah Core"}
            </div>
          </div>
          <div className="px-2 border-x border-slate-200">
            <div className="font-serif text-xl font-black text-brand-navy">29</div>
            <div className="text-[11px] text-slate-500">
              {isBn ? "আউটবাউন্ড ক্লাস্টার" : "Outbound Silos"}
            </div>
          </div>
          <div className="px-2">
            <div className="font-serif text-xl font-black text-emerald-700">41/41</div>
            <div className="text-[11px] text-slate-500">
              {isBn ? "১০০% লাইভ ব্লগ" : "100% Live Guides"}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Semantic Silo Architecture Visual Map (5 Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {TOPICAL_AUTHORITY_CLUSTERS.filter((c) => c.id !== "all").map((cluster) => {
          const isSelected = activeCluster === cluster.id;
          return (
            <button
              key={cluster.id}
              type="button"
              onClick={() => setActiveCluster(isSelected ? "all" : cluster.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                isSelected
                  ? "bg-brand-navy text-white border-brand-navy shadow-sm"
                  : "bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200 hover:border-[#F6B73C]"
              }`}
            >
              <div className="text-[11px] font-mono opacity-75">
                {isBn ? cluster.roleBn : cluster.roleEn}
              </div>
              <div className="font-serif font-bold text-sm leading-snug">
                {isBn ? cluster.labelBn : cluster.labelEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Filter Bar & Keyword Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-100/80 p-3 rounded-2xl border border-slate-200/70">
        <div
          role="tablist"
          aria-label="Filter topical authority clusters"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0"
        >
          {TOPICAL_AUTHORITY_CLUSTERS.map((tab) => {
            const active = activeCluster === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCluster(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? "bg-brand-navy text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {isBn ? tab.labelBn : tab.labelEn}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isBn
                ? "কিউওয়ার্ড খুঁজুন (যেমন: Nusuk, হুইলচেয়ার, RFCD)..."
                : "Filter keywords, intent, psychology..."
            }
            aria-label="Filter topical authority matrix"
            className="w-full bg-white border border-slate-200 focus:border-brand-navy rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none"
          />
        </div>
      </div>

      {/* 4. Topic Cards Grid (Showing Keyword, Psychology, AEO Direct Answer & Link) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNodes.map((node, index) => (
          <article
            key={node.id}
            onClick={() => onNavigate(node.targetPath)}
            className="group bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all cursor-pointer shadow-2xs hover:shadow-md"
          >
            <div className="space-y-3">
              {/* Top Unboxed Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono font-semibold text-brand-navy tabular-nums">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className="font-medium text-slate-700">{node.funnelStage}</span>
                  <span aria-hidden="true">·</span>
                  <span>{node.monthlyIntentSignal}</span>
                </div>
                {node.isLiveBlog && (
                  <span className="text-[11px] font-semibold text-emerald-700">
                    {isBn ? "● পূর্ণাঙ্গ ব্লগ প্রকাশিত" : "● Live Full Article"}
                  </span>
                )}
              </div>

              {/* Topic Headline */}
              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-navy leading-snug">
                {isBn ? node.titleBn : node.titleEn}
              </h3>

              {/* Real Target Search Keywords */}
              <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3 space-y-1">
                <div className="text-[11px] font-mono text-slate-500">
                  {isBn ? "টার্গেট সার্চ কিউওয়ার্ড (Real Search Queries):" : "Target Search Queries (Primary + LSI):"}
                </div>
                <div className="text-xs font-mono font-semibold text-emerald-800 break-words">
                  “{node.primaryKeyword}”{" "}
                  <span className="text-slate-500 font-normal">
                    · {node.secondaryKeywords.join(" · ")}
                  </span>
                </div>
              </div>

              {/* Customer Psychology & Pain Point */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-brand-navy">
                  {isBn
                    ? "গ্রাহকের মনস্তত্ত্ব ও আবেগ (Customer Psychology):"
                    : "Customer Psychology & Emotional Hook:"}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn ? node.customerPsychologyBn : node.customerPsychologyEn}
                </p>
              </div>

              {/* AEO Direct Answer / Featured Snippet Target */}
              <div className="bg-amber-50/50 border-l-3 border-[#F6B73C] pl-3.5 py-2 space-y-1">
                <div className="text-[11px] font-semibold text-slate-800">
                  {isBn
                    ? "AEO ডিরেক্ট আনসার (Google AI Overview ও Featured Snippet):"
                    : "AEO Direct Answer (40-Word AI Overview & Snippet Target):"}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isBn ? node.aeoDirectAnswerBn : node.aeoDirectAnswerEn}
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                  EAV: {node.eavTriples}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-navy group-hover:text-brand-emerald transition-colors">
              <span>
                {node.isLiveBlog
                  ? isBn
                    ? "সম্পূর্ণ ব্লগ আর্টিকেলটি পড়ুন"
                    : "Read Full Published Blog Post"
                  : isBn
                  ? "সংশ্লিষ্ট পিলার গাইড ও হাব দেখুন"
                  : "Explore Pillar Guide & Interactive Hub"}
              </span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
