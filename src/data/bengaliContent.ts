import { BlogPost, DestinationGuide, FAQ, FlightRoute, HotelGuide, VisaGuide, TripCostData } from "../types";
import { BLOG_DATA, DESTINATIONS_DATA, FLIGHTS_DATA, HOTELS_DATA, VISA_DATA, TRIP_COSTS_DATA } from "../constants";
import { BENGALI_DESTINATION_OVERRIDES } from "./bengaliDestinations";
import { Language } from "../translations";
import { HAJJ_UMRAH_FAQS } from "../hooks/useSeoMeta";

export const BENGALI_BLOG_OVERRIDES: Record<
  string,
  {
    title: string;
    summary: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    references?: BlogPost["references"];
    content: string;
    internalLinks: { text: string; path: string }[];
    affiliateCTA?: {
      provider: "aviasales" | "klook" | "kkday" | "kiwitaxi" | "welcomePickups" | "airalo" | "qeeq" | "tiqets" | "airhelp";
      headline: string;
      body: string;
    };
  }
> = {
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    title: "বাংলাদেশ থেকে DIY Umrah গাইড (২০২৬–২৭): Nusuk, Visa Route, BDT বাজেট ও ফরজ Hajj নিয়ম",
    summary:
      "বাংলাদেশি পাসপোর্টধারীদের Umrah-এর জন্য তিনটি visa route আছে: Nusuk বা বাইরের সেবাদাতার Standard Umrah Visa, শর্তসাপেক্ষ ৯৬ ঘণ্টার stopover, এবং যোগ্য Saudi tourist-visa route। এই গাইডে ফরজ Hajj-এর আলাদা নিবন্ধন ও permit, ১৪৪৮ হিজরি মৌসুম এবং চারজনের পরিবারের শেয়ারে ১০ দিনের আগের planning estimate জনপ্রতি BDT 1,16,000–1,32,000—নতুন করে দাম যাচাই না করে—তুলে ধরা হয়েছে।",
    category: "Hajj & Umrah",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১১ মিনিট পড়া",
    references: [
      {
        name: "Saudi Ministry of Hajj and Umrah — Nusuk Umrah launch for overseas pilgrims",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — বিদেশি যাত্রীদের জন্য Nusuk Umrah সেবা চালুর ঘোষণা",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-launches-Nusuk-Umrah-service-to-enable-pilgrims-from-outside-the-Kingdom",
      },
      {
        name: "Nusuk Umrah — registration",
        nameBn: "Nusuk Umrah — নিবন্ধন পেজ",
        url: "https://umrah.nusuk.sa/registration/signup",
      },
      {
        name: "Nusuk Umrah — Terms of Use",
        nameBn: "Nusuk Umrah — ব্যবহারের শর্ত",
        url: "https://umrah.nusuk.sa/TermsOfUse",
      },
      {
        name: "Saudi Ministry of Hajj and Umrah — FAQ",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — FAQ",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Saudi Ministry — 1448H Umrah season calendar",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — ১৪৪৮ হিজরি Umrah মৌসুমের calendar",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Announces-the-Umrah-Season-Calendar-for-1448-AH",
      },
      {
        name: "Visit Saudi — Saudi Stopover Visa",
        nameBn: "Visit Saudi — Saudi Stopover Visa",
        url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
      },
      {
        name: "Saudia — Transit Visa",
        nameBn: "Saudia — Transit Visa আবেদন",
        url: "https://www.saudia.com/transit-visa",
      },
      {
        name: "Visit Saudi — Package Visa",
        nameBn: "Visit Saudi — Package Visa",
        url: "https://www.visitsaudi.com/en/campaigns/package-visa",
      },
      {
        name: "Official Saudi eVisa portal",
        nameBn: "সৌদি আরবের official eVisa portal",
        url: "https://visa.visitsaudi.com/",
      },
      {
        name: "Visit Saudi Help Center — used US, UK or Schengen visa eligibility",
        nameBn: "Visit Saudi Help Center — আগে ব্যবহৃত US, UK বা Schengen visa-র যোগ্যতা",
        url: "https://help.visitsaudi.com/hc/en-us/articles/360018933099-Can-I-get-a-visit-visa-if-I-have-a-valid-US-or-UK-or-Schengen-visa-",
      },
      {
        name: "Bangladesh Haj Management Portal",
        nameBn: "বাংলাদেশ Haj Management Portal",
        url: "https://www.hajj.gov.bd/",
      },
      {
        name: "Saudi Press Agency — 1447H Hajj permit-violation notice",
        nameBn: "Saudi Press Agency — ১৪৪৭ হিজরি Hajj permit লঙ্ঘনের বিজ্ঞপ্তি",
        url: "https://www.spa.gov.sa/en/N2559888",
      },
      {
        name: "Saudi Ministry of Health — Pilgrim Health Requirements index",
        nameBn: "Saudi Ministry of Health — Pilgrim Health Requirements সূচি",
        url: "https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx",
      },
      {
        name: "Saudi MOH — 1447H Umrah health regulations (season-specific)",
        nameBn: "Saudi MOH — ১৪৪৭ হিজরি Umrah health rules (মৌসুমভিত্তিক)",
        url: "https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf",
      },
      {
        name: "Saudi Ministry — Umrah Permit Application",
        nameBn: "সৌদি মন্ত্রণালয় — Umrah Permit আবেদন",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "Saudi Ministry — permit to visit Al-Rawdah Al-Sharifiyah",
        nameBn: "সৌদি মন্ত্রণালয় — Rawdah Al-Sharifiyah জিয়ারতের permit",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Haramain High-Speed Railway — official fare table",
        nameBn: "Haramain High-Speed Railway — official fare table",
        url: "https://sar.hhr.sa/travel/fares",
      },
      {
        name: "Haramain High-Speed Railway — baggage guidelines",
        nameBn: "Haramain High-Speed Railway — baggage নির্দেশনা",
        url: "https://sar.hhr.sa/travel/guidelines/baggage",
      },
      {
        name: "Additional portal: Nusuk Saudi platform",
        nameBn: "অতিরিক্ত portal: Nusuk Saudi platform",
        url: "https://www.nusuk.sa",
      },
      {
        name: "Additional portal: Saudi Ministry of Hajj and Umrah",
        nameBn: "অতিরিক্ত portal: Saudi Ministry of Hajj and Umrah",
        url: "https://www.haj.gov.sa",
      },
      {
        name: "Additional portal: Saudi Unified Visa Platform",
        nameBn: "অতিরিক্ত portal: Saudi Unified Visa Platform",
        url: "https://ksavisa.sa",
      },
      {
        name: "Additional portal: Haramain High-Speed Railway booking",
        nameBn: "অতিরিক্ত portal: Haramain High-Speed Railway booking",
        url: "https://sar.hhr.sa",
      },
      {
        name: "Additional regional portal: UAE Government Portal (general reference only)",
        nameBn: "অতিরিক্ত regional portal: UAE Government Portal (সৌদি Umrah নিয়মের উৎস নয়)",
        url: "https://u.ae",
      },
    ],
    content: `বাংলাদেশি পাসপোর্টধারীরা নিজে Umrah ভ্রমণ পরিকল্পনা করতে পারেন—তবে DIY মানে এই নয় যে সব ভিসা আলাদা করে কেনা যায় বা কখনোই এজেন্টের প্রয়োজন হয় না। ভিসার তিনটি পথ হলো: Standard Umrah Visa (সরাসরি Nusuk অথবা বাইরের সেবাদাতা), শর্তসাপেক্ষ ৯৬ ঘণ্টার Saudi stopover visa, এবং যোগ্যতার ভিত্তিতে Saudi tourist-visa route। চারজনের পরিবারের রুম-শেয়ারে ১০ দিনের আগের পরিকল্পনা-হিসাবটি জনপ্রতি BDT 1,16,000–1,32,000 রাখা হয়েছে; নতুন করে দাম যাচাই করা হয়নি। ফরজ Hajj-এর নিবন্ধন ও Saudi permit আলাদা।

এই গাইডের তথ্য ১৪ অক্টোবর ২০২৬ তারিখে সরকারি সূত্রের সঙ্গে মিলিয়ে দেখা হয়েছে। Visa, season, permit ও fare-এর শর্ত বদলাতে পারে—বুকিংয়ের আগে সংশ্লিষ্ট live application এবং operator-এর নির্দেশনা দেখুন।

১. Umrah ও ফরজ Hajj-এর নিয়ম আলাদা
Umrah ও Hajj পৃথক ইবাদত, এবং প্রবেশ ও permit-এর নিয়মও এক নয়। Umrah, tourist বা stopover visa Hajj permit নয়। বাংলাদেশ থেকে ফরজ Hajj করতে বাংলাদেশ Haj Management Portal-এর নিবন্ধনপ্রক্রিয়া এবং সৌদি কর্তৃপক্ষের বর্তমান Hajj permit-এর নিয়ম অনুসরণ করতে হয় [১১–১২]।

বাংলাদেশের পোর্টালে ২০২৭ সালের Hajj নিবন্ধনের শেষ তারিখ ২৬ সেপ্টেম্বর ২০২৬ দেখানো হয়েছিল। এই গাইড ১৪ অক্টোবর ২০২৬ তারিখে পর্যালোচনার সময় সেটি পেরিয়ে গেছে। পোর্টালে পরবর্তী কোনো মেয়াদবৃদ্ধি বা নতুন বিজ্ঞপ্তি আছে কি না দেখুন; নিবন্ধন খোলা আছে ধরে নেবেন না এবং এই বছরের তারিখ অন্য বছরে প্রয়োগ করবেন না [১১]।

১৪৪৭ হিজরি (২০২৬) মৌসুমের জন্য Saudi Press Agency-তে প্রকাশিত সৌদি স্বরাষ্ট্র মন্ত্রণালয়ের বিজ্ঞপ্তিতে permit ছাড়া Hajj করা বা করার চেষ্টা এবং নির্দিষ্ট নিষেধাজ্ঞার সময়ে visit visa নিয়ে Makkah বা Holy Sites-এ প্রবেশ/অবস্থানের ক্ষেত্রে সর্বোচ্চ SAR 20,000 জরিমানার কথা আছে। বিজ্ঞপ্তির ১০ বছরের পুনঃপ্রবেশ নিষেধাজ্ঞা কেবল নির্দিষ্টভাবে নির্বাসিত infiltrator শ্রেণির জন্য; প্রত্যেক দর্শনার্থীর জন্য নয়। এই নিয়ম ১৪৪৭ হিজরি মৌসুমের জন্য—পরের Hajj মৌসুমে নতুন সরকারি বিজ্ঞপ্তি দেখুন [১২]।

২. বাংলাদেশি পাসপোর্টধারীদের জন্য ভিসার তিনটি পথ
পথ ১: Standard Saudi Umrah Visa — সরাসরি Nusuk অথবা বাইরের সেবাদাতা
সৌদি হজ ও Umrah মন্ত্রণালয় ২০ আগস্ট ২০২৫ তারিখে বিদেশি Umrah যাত্রীদের জন্য Nusuk Umrah সরাসরি সেবার ঘোষণা দেয়। ১৪ অক্টোবর ২০২৬ তারিখে দেখা Nusuk registration তালিকায় nationality ও residence—দুই ক্ষেত্রেই Bangladesh ছিল। এতে সরাসরি সেবাটি যাচাই করার সুযোগ বোঝায়; ভিসা অনুমোদন বা প্রত্যেক সেবার নিশ্চয়তা নয়। উদ্বোধনী ঘোষণায় আলাদা সেবা বেছে নেওয়ার কথা থাকলেও বর্তমান Terms-এ package-কে একাধিক সেবার সমন্বয় বলা হয়েছে। তাই একা visa-only checkout পাওয়া যাবে ধরে নেবেন না—নিজের আবেদনের সময়কার package ও শর্ত দেখুন [১–৪]।

অনুমোদিত বাইরের Umrah agent এই একই ভিসা-শ্রেণির আরেকটি সেবা-পথ। মন্ত্রণালয়ের FAQ অনুযায়ী, বাইরের agent আবাসন ও পরিবহন সেবা ছাড়া Umrah visa ইস্যু করতে পারে না। টাকা দেওয়ার আগে মন্ত্রণালয়ের বর্তমান চ্যানেলে সেবাদাতাকে যাচাই করুন এবং কী আবাসন/পরিবহন, কার কাছ থেকে, কী বাতিলের শর্তে পাচ্ছেন—সব লিখিতভাবে নিন। পুরোনো “শুধু visa” কোট বা অননুমোদিত মধ্যস্থতাকারীর কথায় নির্ভর করবেন না [৪]।

পথ ২: যোগ্যতার ভিত্তিতে ৯৬ ঘণ্টার Saudi stopover visa
Visit Saudi বলছে, যোগ্য যাত্রীরা Saudia বা flynas-এর নির্দিষ্ট connecting itinerary বুক করে সর্বোচ্চ ৯৬ ঘণ্টার stopover-এর জন্য আবেদন করতে পারেন। রুট ও airline-ভেদে টিকিট এবং আবেদন-শর্ত আলাদা; কেনার আগে airline-এর live checkout দেখুন। ১৪ অক্টোবর ২০২৬ তারিখে Visit Saudi-র তথ্যে Saudia-র visa নিজে বিনা মূল্যের, application fee প্রায় SAR 39.50 এবং insurance SAR 13 থেকে দেখানো হয়েছিল। এগুলো checkout-এর line item—সব airline বা যাত্রীর নিশ্চিত মোট খরচ নয়। হোটেল রাত অন্তর্ভুক্ত ধরে বুক করবেন না [৬–৭]।

পথ ৩: যোগ্য Saudi tourist-visa route
১৪ অক্টোবর ২০২৬ তারিখে দেখা official eVisa portal-এর সাধারণ nationality-only তালিকায় Bangladesh ছিল না। তবে Visit Saudi-র Package Visa পদ্ধতিতে বাংলাদেশি পাসপোর্টধারীদের জন্য অনুমোদিত সেবাদাতার মাধ্যমে নিশ্চিত flight ও accommodation-সহ সমন্বিত package লাগে। এই Package Visa tourist-visa শ্রেণির ভেতরের একটি উপ-পথ—চতুর্থ কোনো category নয় [৮–৯]।

বৈধ এবং আগে ব্যবহার করা US, UK বা Schengen tourist/business visa-সহ কিছু যাত্রী শর্ত পূরণ করলে Saudi visit visa on arrival-এর যোগ্য হতে পারেন; live portal, carrier ও arrival-এর শর্ত প্রযোজ্য [১০]। GCC residents-দের জন্য আলাদা route থাকতে পারে; বর্তমান residence ও occupation criteria official eVisa portal-এ দেখুন [৯]। নিজের passport, residence ও itinerary দিয়ে eligibility যাচাই করুন; এক বছরের বা multiple-entry visa ধরে নেবেন না [৯–১০]। Tourist-visa route দিয়ে Umrah করলেও visa-র শর্ত, Nusuk service এবং Hajj-মৌসুমের নিষেধাজ্ঞা মানতে হবে। এই route Hajj করার অনুমতি দেয় না [৪, ৮–৯, ১২]।

৩. Visa-র মৌসুম ও প্রবেশের সময়সীমা দেখুন
Saudi Umrah-তে প্রবেশের সময় বর্তমান season calendar ও Hajj-সংক্রান্ত বিধিনিষেধের অধীন; Umrah-কে সারা বছর কোনো বাধা ছাড়াই করা যায় বলা ঠিক নয়। মন্ত্রণালয়ের ১৪৪৮ হিজরি calendar অনুযায়ী visa issue-এর শেষ তারিখ ৯ মার্চ ২০২৭, যাত্রী প্রবেশের শেষ তারিখ ২৩ মার্চ ২০২৭ এবং চূড়ান্ত departure-এর তারিখ ৭ এপ্রিল ২০২৭। এগুলো শুধু ১৪৪৮ হিজরি মৌসুমের তারিখ। ভ্রমণের তারিখ ঠিক করা বা non-refundable বুকিংয়ের আগে পরবর্তী calendar দেখুন [৫]।

৪. বুকিংয়ের একটি নিরাপদ ক্রম
- আগে ভ্রমণের সময় ও visa category বেছে নিন। আপনার passport, itinerary ও পরিকল্পনার সঙ্গে route এবং মৌসুম মেলে কি না দেখুন; যে official eligibility page অনুসরণ করেছেন তার কপি রাখুন।
- non-refundable flight বা hotel কেনার আগে live visa requirement ও application ধাপ যাচাই করুন। সরাসরি Nusuk হলে বর্তমান package Terms পড়ুন; বাইরের agent হলে আবাসন ও পরিবহনের বিবরণ লিখিতভাবে নিন [২–৪]।
- Dhaka থেকে তারিখভিত্তিক flight তুলনা করুন। Dhaka–Jeddah যাওয়া এবং Madinah–Dhaka ফেরার multi-city/open-jaw itinerary পথে পিছিয়ে আসা কমাতে পারে, কিন্তু এটি সবসময় সস্তা নয়। কেনার আগে baggage, transit, airport change এবং cancellation policy airline-এর সঙ্গে মিলিয়ে নিন।
- পাড়ার নাম বা যাচাই না-করা দূরত্ব দেখে নয়—হোটেলের সুনির্দিষ্ট ঠিকানা ও room terms দেখে বুক করুন। পরিবারের ব্যবহৃত gate পর্যন্ত পথ, ঢাল, accessibility, room occupancy, shuttle এবং cancellation policy সরাসরি property-র সঙ্গে যাচাই করুন। আমাদের Makkah ও Madinah hotel-zone গাইড শুধু শুরু করার জন্য; বুক করা ঠিকানা যাচাইয়ের বিকল্প নয়।
- Visa ইস্যুর পর Umrah permit-এর জন্য বর্তমান Ministry/Nusuk নির্দেশনা অনুসরণ করে খালি তারিখ ও সময় বেছে নিন। Madinah-তে Rawdah visit-এর permit আলাদা। Official service page-এ live booking channel থাকে; নির্দিষ্ট দিনে slot খোলা বা সবসময় পাওয়া যাবে—এমন নিশ্চয়তা নেই [১৫–১৬]।
- মন্ত্রণালয়ের FAQ-তে electronically issued Umrah visa-র biometrics চালু থাকা দেশের তালিকায় Bangladesh আছে। নিজের visa application ও official Saudi Visa Bio নির্দেশনা অনুসরণ করুন; tourist বা stopover visa-র প্রত্যেক যাত্রীর জন্য একই নিয়ম ধরে নেবেন না [৪]।
- Passport, approved visa, flight তথ্য, accommodation ও transport confirmation, permit এবং জরুরি যোগাযোগের তথ্য ফোনে ও offline কপি—দুইভাবেই রাখুন। যাত্রার আগে airline-এর document requirement দেখুন।

Online booking-এ dual-currency card ব্যবহার করলে checkout-এর আগে international e-commerce সুবিধা ও ব্যাংকের বর্তমান limit যাচাই করুন। বাংলাদেশের পেমেন্ট ধাপের জন্য আমাদের Dual-Currency Card Endorsement Guide দেখুন।

৫. Makkah–Madinah যাতায়াত: HHR-এর বর্তমান fare ও baggage দেখুন
Haramain High-Speed Railway-এর booking ও fare page-ই বর্তমান schedule ও ticket শর্তের মূল সূত্র। ১৪ অক্টোবর ২০২৬ তারিখে official fare table-এ Makkah–Madinah রুটে Economy-র base fare SAR 162 এবং King Abdulaziz International Airport (KAIA)–Makkah রুটে SAR 65 দেখানো হয়েছিল। Operator জানিয়েছে, এগুলো VAT ও fee-র আগের base fare; ভ্রমণের তারিখ, আসন-প্রাপ্যতা ও অন্যান্য শর্তে checkout-এর দাম বদলায়। এগুলো তারিখ-চিহ্নিত তথ্য—নিশ্চিত ticket price নয় [১৭]।

HHR baggage নির্দেশনায় সর্বোচ্চ ২৫ কেজি এবং ৬৫ × ৫৫ × ৩৫ সেন্টিমিটারের একটি বড় ব্যাগ, সঙ্গে একটি hand item অনুমোদিত। ব্যাগ গোছানোর আগে operator-এর বর্তমান পেজ ও নিজের ticket-এর শর্ত দেখুন; পুরোনো guide-এ থাকা ছোট মাপ ধরে নেবেন না [১৮]।

৬. স্বাস্থ্য, permit ও প্রয়োজনীয় কাগজ
Saudi health requirement মৌসুমভেদে বদলায় এবং যাত্রীর দেশ থেকেও নির্ভর করতে পারে। নিজের travel season ও departure country অনুযায়ী Ministry of Health-এর বর্তমান Umrah health requirement দেখুন। নিচে দেওয়া ১৪৪৭ হিজরি PDF শুধু ওই মৌসুমের জন্য; সেটিকে ১৪৪৮ হিজরি বা পরের মৌসুমের নিয়ম ধরে নেওয়া যাবে না [১৩–১৪]।

Permit-এর যোগ্যতা ও appointment availability যাচাই করতে official Nusuk/Ministry service ব্যবহার করুন। App-এ account থাকা, visa ইস্যু হওয়া, permit পাওয়া এবং কোনো restricted এলাকায় প্রবেশের অনুমতি—এগুলো এক বিষয় নয়। পরিকল্পনায় এই নথি ও তারিখ আলাদা করে রাখুন [২, ৪, ১৫–১৬]।

৭. বাজেট: আগের একটি পরিকল্পনা-হিসাবই রাখা হয়েছে
নিচের মোট অঙ্কটি আগের article থেকে রাখা হয়েছে। ১৪ অক্টোবর ২০২৬-এর এই update-এ নতুন করে fare যাচাই করে হিসাব করা হয়নি; আগের cost component-গুলোর সমন্বিত booking basket-ও যাচাই করা হয়নি। তাই এটিকে planning reference হিসেবে দেখুন—live quote, নিশ্চিত trip total বা agency package-এর তুলনায় DIY সস্তা হওয়ার প্রমাণ হিসেবে নয়।

[[UMRAH_BUDGET_TABLE]]

একই তারিখ, trip length, পরিবারের room-sharing, flight baggage, visa, hotel রাত, খাবার ও transfer ধরে কোনো itemized agency quote এই update-এ সংগ্রহ করা হয়নি। Package-এর সঙ্গে DIY তুলনা করতে দুই পক্ষের একই ভিত্তির লিখিত total নিন এবং tax, insurance, transport, cancellation এবং বাদ থাকা খরচ মিলিয়ে দেখুন। কোনো পথই সবসময় সস্তা নয়।

৮. যাত্রার আগে শেষ যাচাই
- Official page-এ visa route, বর্তমান season calendar এবং Hajj restriction-এর তারিখ আবার দেখুন।
- ইস্যু করা visa-তে নাম, passport number, validity, entry count ও অনুমোদিত stay আপনার যাত্রার সঙ্গে মেলে কি না দেখুন।
- Visa-ভিত্তিক biometrics, Nusuk permit এবং Rawdah appointment বর্তমান official service page-এ নিশ্চিত করুন।
- হোটেলের ঠিকানা, room occupancy, accessibility এবং transport ব্যবস্থা property বা provider-এর সঙ্গে পুনরায় মিলিয়ে নিন।
- HHR fare, baggage allowance ও ticket তথ্য এবং airline-এর baggage/transit শর্ত আবার দেখুন।
- Official কাগজপত্র offline-এ রাখুন; provider-এর receipt ও লিখিত service terms সংরক্ষণ করুন।

৯. সচরাচর জিজ্ঞাসা
বাংলাদেশ থেকে কি Nusuk-এ সরাসরি Umrah visa-র আবেদন করা যায়?
১৪ অক্টোবর ২০২৬ তারিখে দেখা Nusuk registration option-এ Bangladesh আছে, তাই live Nusuk Umrah service দিয়ে শুরু করে দেখুন। Registration মানেই visa approval নয়; package বা visa-only option পাওয়া যাবে কি না তা বর্তমান checkout Terms-এর ওপর নির্ভর করে [১–৪]।
বাইরের Umrah agent কি আবাসন ও পরিবহন ছাড়া visa দিতে পারে?
মন্ত্রণালয়ের FAQ বলছে, বাইরের agent আবাসন ও পরিবহন সেবা ছাড়া Umrah visa ইস্যু করতে পারে না। Provider-কে লিখিত চুক্তিতে সেবাগুলো ও সব charge উল্লেখ করতে বলুন [৪]।
Tourist বা stopover visa দিয়ে কি ফরজ Hajj করা যায়?
না। Umrah, tourist বা stopover visa বাংলাদেশি Hajj নিবন্ধন এবং সৌদি Hajj permit-এর বিকল্প নয়। বাংলাদেশ ও সৌদি আরবের বর্তমান Hajj নির্দেশনা অনুসরণ করুন [১১–১২]।
১০ দিনের DIY Umrah অঙ্কটি কি এখনকার booking quote?
না। টেবিলে আগের চারজনের পরিবার-শেয়ারের planning estimate রাখা হয়েছে; এই update-এ live booking basket ধরে নতুন করে মূল্য যাচাই করা হয়নি।
Umrah ও Rawdah permit কোথায় বুক করব?
নিজের আবেদনের জন্য official Ministry/Nusuk service ব্যবহার করুন, তারপর খালি appointment বেছে নিন। Umrah ও Rawdah permit আলাদা সেবা এবং availability নিশ্চিত নয় [১৫–১৬]।`,
    internalLinks: [
      { text: "Makkah ও Madinah হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Dual-Currency Card ও Passport Endorsement গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport (DAC) Immigration ডকুমেন্ট চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "DIY Umrah Intelligence Portal ও BDT Calculator", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Umrah যাত্রায় Maps ও Nusuk-এর জন্য data যাচাই করুন",
      body: "কেনার আগে provider-এর coverage, data, validity, device compatibility এবং activation শর্ত দেখুন। Mobile data বা Nusuk permit availability নিশ্চিত—এমন ধরে নেবেন না।",
    },
  },

  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    title: "Makkah ও Madinah হোটেল জোন, Haramain Bullet Train এবং Ziyarah গাইড (বাংলাদেশি হাজীদের জন্য)",
    summary:
      "মক্কা বা মদিনায় ভুল রাস্তায় হোটেল বুক করলে প্রতিদিন ৫ ওয়াক্ত নামাজে ৪০ ডিগ্রি গরমে খাড়া পাহাড়ি রাস্তা বেয়ে ওঠা বা লিফটের জন্য দীর্ঘক্ষণ অপেক্ষা করার মতো কষ্ট হতে পারে। বাংলাদেশি Umrah ও Hajj যাত্রীদের জন্য তৈরি এই গাইডে মক্কার সমতল হাঁটার পথের হোটেল জোন (Jabal Omar, Clock Tower ও Lower Ajyad)-এর সাথে সাশ্রয়ী ২৪ ঘণ্টা ফ্রি শাটল জোন (Mahbas Al Jin ও Kudai)-এর তুলনা করা হয়েছে। পাশাপাশি মদিনায় মসজিদে নববীর Ladies' Gate 25–29 সংলগ্ন Markazia North হোটেল, Haramain High-Speed Train-এর ব্যাগেজ নিয়ম, Zamzam পানির নিয়ম এবং মক্কা-মদিনা Ziyarah ট্যাক্সি ভাড়া টাকায় ও রিয়ালে তুলে ধরা হয়েছে।",
    category: "Hajj & Umrah",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `পরিবারের বয়স্ক বাবা-মা বা ছোট সন্তানদের নিয়ে Umrah করতে গেলে পুরো সফরের আরাম নির্ভর করে ৩টি বিষয়ের ওপর: সঠিক রাস্তায় হোটেল নির্বাচন, Haramain High-Speed Bullet Train-এর সঠিক ব্যবহার এবং Zamzam ও Ziyarah-এর নিয়ম জানা।

১. মক্কার হোটেল জোন: সমতল রাস্তা বনাম খাড়া পাহাড়ি ঢাল
অনলাইনে অনেক হোটেলেই লেখা থাকে "হারাম শরীফ থেকে ৬০০ মিটার দূরে", কিন্তু শেষ ২০০ মিটার যে খাড়া পাহাড়ি ঢাল তা উল্লেখ থাকে না! তাই বুকিংয়ের আগে এই জোনগুলো চিনে নিন:
- **Jabal Omar ও Ibrahim Al Khalil Street:** কোনো পাহাড়ি ঢাল নেই, সম্পূর্ণ সমতল রাস্তা। ৩ থেকে ৬ মিনিটে সরাসরি King Fahd Gate দিয়ে হারাম শরীফে প্রবেশ করা যায়। হুইলচেয়ার ব্যবহারকারী ও বয়স্কদের জন্য সেরা (**BDT 18,000 – BDT 35,000/রাত**)।
- **Lower Ajyad Street (প্রথম ৪০০ মিটার):** King Abdulaziz Gate-এর খুব কাছে এবং আশেপাশে প্রচুর বাংলাদেশি ও পাকিস্তানি হালাল রেস্টুরেন্ট রয়েছে। তবে বয়স্কদের নিয়ে Upper Ajyad-এর খাড়া ঢালে হোটেল নেওয়া এড়িয়ে চলুন।
- **Mahbas Al Jin ও Kudai (বাজেট শাটল জোন):** পরিষ্কার-পরিচ্ছন্ন ৩ ও ৪ তারকা হোটেল মাত্র **BDT 4,200 – BDT 7,500/রাতে** পাওয়া যায়। হোটেলের সামনে থেকেই প্রতি ৫ মিনিট পরপর ফ্রি এসি শাটল বাস সুড়ঙ্গ পথ দিয়ে সরাসরি Marwah / Bab Ali বাস টার্মিনালে নামিয়ে দেয়।

২. মদিনায় কেন MARKAZIA NORTH পরিবারের জন্য সবচেয়ে সুবিধাজনক
মসজিদে নববীর চারপাশ সম্পূর্ণ সমতল। তবে বাংলাদেশি পরিবারের জন্য **Markazia North (Al Haram Road)** সবচেয়ে ভালো কারণ:
- মহিলাদের নামাজের স্থান এবং মহিলাদের **Rawdah Sharif** প্রবেশের গেটগুলো (Gate 25 থেকে 29) উত্তর দিকে অবস্থিত। Markazia North-এ থাকলে আপনার মা, স্ত্রী বা বোনকে রোদে পুরো চত্বর ঘুরে আসতে হবে না—মাত্র ১৫০ মিটার হেঁটেই গেটে পৌঁছাতে পারবেন।

৩. HARAMAIN HIGH-SPEED TRAIN (৩০০ কিমি/ঘণ্টা): JEDDAH → MAKKAH → MADINAH
অফিশিয়াল ওয়েবসাইট (sar.hhr.sa) অথবা **HHR Train App** থেকে সহজেই Dual-Currency Card দিয়ে টিকিট কাটা যায়:
- **Jeddah Airport (Terminal 1) থেকে মক্কা:** মাত্র ৫৪ মিনিট (**SAR 60–75 Economy / ~BDT 2,100**)। এয়ারপোর্টের ভেতর থেকেই শীতাতপ নিয়ন্ত্রিত ট্রেন স্টেশনে যাওয়া যায়।
- **মক্কা থেকে মদিনা:** মাত্র ২ ঘণ্টা ২০ মিনিট (**SAR 150–220 Economy / ~BDT 5,200–7,200**), যেখানে বাসে ৫–৬ ঘণ্টা লাগে।
- **ব্যাগেজের কড়া নিয়ম:** ট্রেনে জনপ্রতি ১টি বড় স্যুটকেস (সর্বোচ্চ ২৫ কেজি, মাপ 65 x 45 x 30 cm) এবং ১টি হ্যান্ডব্যাগ নেওয়া যায়। অতিরিক্ত বড় কার্টন বা লাগেজ থাকলে স্টেশনের SPL কুরিয়ার সার্ভিস ব্যবহার করুন অথবা পুরো পরিবারের জন্য ৭ সিটের Hyundai H1 / GMC গাড়ি ভাড়া নিন (**SAR 450–600 / ~BDT 15,000–19,500**)।

৪. মক্কা, মদিনা ও তায়েফে ঐতিহাসিক ZIYARAH ট্যাক্সি ভাড়া
জনপ্রতি ট্যুর বাসের বাড়তি টাকা না দিয়ে ফজরের নামাজের পর পুরো পরিবারের জন্য একটি প্রাইভেট এসি কার বা ৭ সিটের ভ্যান ভাড়া করে ৩ ঘণ্টায় Ziyarah সেরে নিন:
- **মক্কা Ziyarah (জাবালে নূর/হেরা গুহা, জাবালে সওর, মিনা, মুজদালিফা, আরাফাত ময়দান ও মসজিদে জিন):** পুরো গাড়ি **SAR 150 – 220 (~BDT 4,900 – 7,200)**।
- **মদিনা Ziyarah (মসজিদে কুবা—যেখানে ২ রাকাত নামাজে ১টি Umrah-এর সওয়াব, উহুদ পাহাড়, মসজিদে কিবলাতাইন ও খন্দক):** পুরো গাড়ি **SAR 120 – 180 (~BDT 3,900 – 5,900)**।
- **তায়েফ ডে-ট্রিপ (মিকাত কারনুল মানাজিল ও ইবনে আব্বাস মসজিদ):** যাওয়া-আসা পুরো গাড়ি **SAR 350 – 450 (~BDT 11,500 – 14,800)**।

৫. ঢাকায় ফেরার ফ্লাইটে অফিশিয়াল ZAMZAM পানির নিয়ম
- প্রতিটি Umrah e-Visa বা Nusuk Umrah পারমিটধারী যাত্রী Jeddah (JED) বা Madinah (MED) এয়ারপোর্টের নির্দিষ্ট কাউন্টার থেকে পাসপোর্ট স্ক্যান করে ১টি অফিশিয়াল ৫ লিটারের সিল করা Zamzam পানির বক্স কিনতে পারবেন (**SAR 9.50–12.50 / ~BDT 350–400**)।
- Biman Bangladesh Airlines ও Saudia-এ (ঢাকা থেকে সরাসরি) এই ৫ লিটারের Zamzam বক্স আপনার নিয়মিত **২×২৩ কেজি (৪৬ কেজি মোট)** লাগেজ অ্যালাউন্সের বাইরে **সম্পূর্ণ বিনামূল্যে** বহন করা যায়। Gulf Air ও Kuwait Airways-এর লাগেজ সীমা ভিন্ন হতে পারে — চেক-ইন করার আগে আপনার এয়ারলাইন্সের সর্বশেষ নিয়ম যাচাই করুন।`,
    internalLinks: [
      { text: "সম্পূর্ণ Umrah ও Hajj Visa, Nusuk এবং BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Haramain Train বুকিংয়ের জন্য Dual-Currency Card গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Haramain Train ও Nusuk Permit-এর জন্য ইন্টারনেট প্রয়োজন?",
      body: "ঢাকা ছাড়ার আগেই ফোনে Saudi Arabia eSIM অ্যাক্টিভেট করে নিন, যাতে মক্কা ও মদিনায় নির্বিঘ্নে Nusuk অ্যাপ ও Careem ব্যবহার করতে পারেন।",
    },
  },

  "dual-currency-card-endorsement-bangladesh": {
    title: "বাংলাদেশে Dual-Currency Card ও Passport Dollar Endorsement করার নিয়ম (2026 গাইড)",
    summary:
      "বাংলাদেশ থেকে আন্তর্জাতিক Flight, Agoda বা Booking.com-এ Hotel, Haramain Bullet Train টিকিট কিংবা Klook-এ অ্যাক্টিভিটি বুক করার আগে আপনার ব্যাংক কার্ডে অবশ্যই পাসপোর্টের বিপরীতে বাংলাদেশ ব্যাংকের বার্ষিক USD $18,000 Travel Quota (FE Circular 33) এনডোর্স (Endorse) করে নিতে হবে। এই ধাপে ধাপে গাইডে জানুন কোন কোন ব্যাংকে ক্রেডিট কার্ড ছাড়াই দ্রুত Dual-Currency Debit বা Prepaid Card পাওয়া যায় (EBL Aqua, City Bank Amex/Visa, BRAC Multi-Currency, MTB ও Islami Bank), পাসপোর্টে সিল দেওয়ার জন্য কী কী ডকুমেন্ট লাগে, ব্যাংকের অ্যাপ থেকে USD E-Commerce ও 3D-Secure চালু করার নিয়ম এবং বিদেশে ৫% DCC চার্জ বাঁচানোর কৌশল।",
    category: "Banking & Payments",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `বাংলাদেশ থেকে প্রথমবার বিদেশ ভ্রমণের প্রস্তুতি নেওয়ার সময় বেশিরভাগ ভ্রমণকারী যে সমস্যায় পড়েন তা হলো: সাধারণ লোকাল ডেবিট বা bKash/Nagad দিয়ে আন্তর্জাতিক এয়ারলাইন্স বা বিদেশি হোটেল সাইটে পেমেন্ট করা যায় না। বাংলাদেশ ব্যাংকের নিয়ম অনুযায়ী, আপনার একটি **Dual-Currency Card** থাকতে হবে এবং সেখানে পাসপোর্টে **Dollar Endorsement** করা থাকতে হবে।

১. PASSPORT DOLLAR ENDORSEMENT কী? (বার্ষিক $18,000 USD কোটা)
বাংলাদেশ ব্যাংকের ফরেন এক্সচেঞ্জ নীতিমালা (FE/PD-1 Circular No. 33) অনুযায়ী, প্রতিটি প্রাপ্তবয়স্ক বাংলাদেশি নাগরিক তার বৈধ পাসপোর্টে প্রতি ক্যালেন্ডার বছরে (১ জানুয়ারি – ৩১ ডিসেম্বর) ব্যক্তিগত বিদেশ ভ্রমণের জন্য সর্বোচ্চ **USD $18,000** পর্যন্ত খরচ করার অনুমতি পান।
- ব্যাংকের ফরেন এক্সচেঞ্জ ডেস্কে গিয়ে আপনার পাসপোর্টের নির্দিষ্ট পাতায় সিল ও স্বাক্ষর নেওয়াকেই **Passport Endorsement** বলা হয়।
- একবার পাসপোর্টে ডলার এনডোর্স হয়ে গেলে আপনি ব্যাংক একাউন্টে বাংলাদেশি টাকা (BDT) জমা রাখবেন, আর অনলাইনে বা বিদেশের POS মেশিনে কার্ড পাঞ্চ করলে ব্যাংক স্বয়ংক্রিয়ভাবে তা ডলারে কনভার্ট করে পেমেন্ট সম্পন্ন করবে।

২. ক্রেডিট কার্ড ছাড়াই সেরা DUAL-CURRENCY DEBIT ও PREPAID CARD
আপনার যদি উচ্চ বেতনের স্যালারি স্লিপ বা ক্রেডিট কার্ড না থাকে, তবুও নিচের ব্যাংকগুলো থেকে সহজেই Dual-Currency Card নিতে পারবেন:
- **EBL (Eastern Bank) Aqua Prepaid / Classic Dual-Currency Debit Card:** ভ্রমণকারীদের কাছে অত্যন্ত জনপ্রিয়। EBL Skybanking অ্যাপ থেকেই তাৎক্ষণিক USD ও E-Commerce পার্ট চালু করা যায়।
- **The City Bank (American Express / Visa Dual-Currency Debit Card):** Citytouch অ্যাপের মাধ্যমে সহজেই ফরেন কারেন্সি কন্ট্রোল করা যায়।
- **BRAC Bank Multi-Currency Debit Card ও Astha App:** সরাসরি Astha অ্যাপ থেকে USD লিমিট অন/অফ করা যায় এবং কোনো লুকানো চার্জ নেই।
- **Mutual Trust Bank (MTB), Prime Bank এবং Islami Bank (IBBL) Khidmah / Dual-Currency Card:** ওমরাহ ও পারিবারিক ভ্রমণের জন্য শরীয়াহ-সম্মত কার্ডের ক্ষেত্রে দারুণ অপশন।

৩. ধাপে ধাপে ব্যাংকে PASSPORT ENDORSEMENT করার নিয়ম
১. **ডকুমেন্ট সাথে নিন:** আপনার আসল পাসপোর্ট (কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে), আপনার Dual-Currency Card, এবং ১ কপি পাসপোর্ট সাইজ ছবি ও NID কপি।
২. **Authorized Dealer (AD) শাখায় যান:** ব্যাংকের যে শাখায় ফরেন এক্সচেঞ্জ বা লকার সুবিধা আছে সেখানে গিয়ে বলুন: *"আমি আমার পাসপোর্টে Travel Quota-তে ডলার এনডোর্স করতে চাই।"*
৩. **TM Form পূরণ ও পাসপোর্টে সিল:** অফিসার আপনার পাসপোর্টের শেষের দিকে "Endorsement" পাতায় (যেমন $2,000 বা $5,000 USD) সিল ও স্বাক্ষর দেবেন। এজন্য ব্যাংক ভেদে মাত্র **BDT 200 – BDT 575** সার্ভিস চার্জ কাটতে পারে।
৪. **USD ও 3D-Secure E-Commerce পার্ট চালু করুন (সবচেয়ে জরুরি ধাপ!):** শুধু পাসপোর্টে সিল নিলেই অনলাইনে পেমেন্ট হবে না! ব্যাংকের অ্যাপে (Skybanking / Astha / Citytouch) ঢুকে অথবা কাস্টমাইজড কল সেন্টারে ফোন করে বলুন: *"আমার কার্ডের USD International Part এবং 3D-Secure E-Commerce Transaction আগামী ৭ দিনের জন্য ওপেন করে দিন।"*

৪. RFCD ACCOUNT বনাম সাধারণ TRAVEL QUOTA
- **Travel Quota ($18,000/বছর):** আপনি একাউন্টে BDT জমা রাখবেন এবং আন্তর্জাতিক পেমেন্টের সময় ব্যাংক দিনের USD রেট + সামান্য মার্কআপ অনুযায়ী টাকা কাটবে। তবে বাংলাদেশ ব্যাংকের নিয়ম অনুযায়ী একক অনলাইন ট্রানজেকশনে কখনো কখনো **$300 USD ক্যাপ** থাকতে পারে।
- **RFCD (Resident Foreign Currency Deposit) Account:** আপনি যদি বিদেশ সফর শেষে ফেরার সময় নগদ ডলার সাথে আনেন, তবে তা ব্যাংকে জমা দিয়ে RFCD একাউন্ট ও ডেবিট কার্ড খুলতে পারবেন। RFCD কার্ডে কোনো $300 ট্রানজেকশন ক্যাপ থাকে না—বড় অঙ্কের হোটেল বা ফ্লাইট পেমেন্ট অনায়াসে করা যায়।

৫. বিদেশে কার্ড ব্যবহারের সময় ৫% DCC চার্জ বাঁচানোর গোপন টিপস
থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, দুবাই বা সৌদি আরবে শপিং মল ও হোটেলে কার্ড পাঞ্চ করার সময় মেশিনের স্ক্রিনে জানতে চাইবে: *"Pay in BDT or Pay in Local Currency (THB / MYR / AED / SAR)?"*
- **সবসময় Local Currency (THB / MYR / AED / SAR / USD) সিলেক্ট করবেন!** ভুল করেও সেখানে BDT সিলেক্ট করবেন না, কারণ বিদেশি মেশিনে BDT সিলেক্ট করলে Dynamic Currency Conversion (DCC) বাবদ আপনার কাছ থেকে ৪% থেকে ৬% অতিরিক্ত টাকা কেটে নেওয়া হবে।

৬. যদি আপনার DUAL-CURRENCY CARD না থাকে তবে কীভাবে বুক করবেন?
আপনার যদি পাসপোর্ট এনডোর্সমেন্ট বা কার্ড রেডি না থাকে, তবে একদমই চিন্তার কারণ নেই। আমাদের **URAL WhatsApp BDT Support Desk (+8801784385335)**-এ মেসেজ দিন—আপনি দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ বাংলাদেশি টাকায় (BDT) পেমেন্ট করেই আপনার কনফার্মড ফ্লাইট টিকিট, হোটেল ভাউচার ও এয়ারপোর্ট ট্রান্সফার বুক করতে পারবেন।`,
    internalLinks: [
      { text: "ওমরাহর জন্য সেরা শরীয়াহ-সম্মত ইসলামিক ডুয়াল-কারেন্সি কার্ড", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "RFCD Account বনাম সাধারণ Travel Quota ($300 লিমিট সমাধান)", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "নগদ রিয়াল/ডলার বনাম কার্ড: ৫% DCC চার্জ বাঁচানোর উপায়", path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide" },
      { text: "কার্ড ছাড়াই bKash বা ব্যাংক ট্রান্সফারে ফ্লাইট ও হোটেল বুকিং", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "কার্ড এনডোর্সমেন্ট সম্পন্ন হয়েছে? এবার লাইভ ভাড়া তুলনা করুন",
      body: "ঢাকা থেকে সরাসরি ও ট্রানজিট ফ্লাইটের সর্বনিম্ন ভাড়া দেখুন, অথবা কার্ড না থাকলে আমাদের WhatsApp ডেস্কের মাধ্যমে BDT-তে বুক করুন।",
    },
  },

  "top-budget-family-destinations-from-dhaka": {
    title: "ঢাকা থেকে পরিবারের সাথে ঘোরার সেরা ৬টি বাজেট ফ্রেন্ডলি দেশ (2026 — BDT খরচ ও Visa তুলনা)",
    summary:
      "ছোট বাচ্চা, স্ত্রী বা বয়স্ক বাবা-মাকে নিয়ে বাংলাদেশ থেকে বিদেশে ফ্যামিলি ট্যুরের পরিকল্পনা করতে গেলে ফ্লাইটের সময়, গন্তব্যভেদে visa requirement, Halal খাবারের সুবিধা এবং বাংলাদেশি টাকায় (BDT) মোট বাজেটের দিকে খেয়াল রাখতে হয়। এই র‍্যাঙ্কিং গাইডে ঢাকা থেকে ৫ দিনের জনপ্রতি সর্বনিম্ন খরচের ক্রমানুসারে সেরা ৬টি দেশ তুলনা করা হয়েছে: Nepal (মাত্র ৪২,০০০ টাকা থেকে, ফ্রি Visa on Arrival), Malaysia (৬৮,০০০ টাকা থেকে, অনলাইন e-Visa ও Halal খাবার), Thailand (৭২,০০০ টাকা থেকে, Safari World ও মেডিকেল চেকআপ), Maldives Local Islands (Maafushi ৭৫,০০০ টাকা থেকে), Singapore এবং Dubai। Visa approval ও live price বদলাতে পারে—বুকিংয়ের আগে বর্তমান নিয়ম যাচাই করুন। Thailand-এর visa-related charge এই trip range-এ আলাদা itemized নয়; current government e-Visa fee, bank/payment charge ও optional agency service fee আলাদা করে যাচাই করুন।",
    category: "Family & Budget",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `পরিবারের সবাইকে নিয়ে বিদেশ ভ্রমণের আনন্দই আলাদা, কিন্তু সঠিক গন্তব্য বেছে না নিলে ভিসা জটিলতা বা অতিরিক্ত হোটেল খরচের কারণে বাজেট দ্বিগুণ হয়ে যেতে পারে। নিচে ঢাকা (DAC) থেকে ফ্লাইটের দূরত্ব, ভিসা পাওয়ার সহজতা এবং ৫ দিনের জনপ্রতি মোট BDT খরচের ভিত্তিতে সেরা ৬টি ফ্যামিলি গন্তব্য তুলে ধরা হলো:

১. NEPAL (কাঠমান্ডু, পোখারা ও নাগরকোট) — সবচেয়ে কম খরচে প্রথম বিদেশ সফর
- **৫ দিনের জনপ্রতি খরচ (ফ্যামিলি শেয়ারিং):** **BDT 42,000 – BDT 54,000** (রাউন্ডট্রিপ ফ্লাইট সহ)
- **ভিসার নিয়ম:** বাংলাদেশিদের জন্য **ফ্রি SAARC Visa on Arrival** (বছরে প্রথমবার ভ্রমণে ভিসা ফি সম্পূর্ণ ফ্রি)। কাঠমান্ডু এয়ারপোর্টে নেমে মাত্র ১৫ মিনিটে ভিসা পাওয়া যায়।
- **ফ্লাইটের সময়:** ঢাকা থেকে মাত্র ১ ঘণ্টা ২৫ মিনিট (Biman Bangladesh Airlines ও Himalaya Airlines)।
- **কেন পরিবারের জন্য সেরা:** ভিসা রিজেকশনের কোনো ভয় নেই, ফ্লাইট খুব ছোট, পোখারার ফেওয়া লেক ও সারাংকোটের হিমালয় সূর্যোদয় দেখার জন্য গাড়ি ভাড়া খুবই সস্তা এবং থামেল এলাকায় ভালো হালাল রেস্টুরেন্ট রয়েছে।

২. MALAYSIA (কুয়ালালামপুর, গেন্টিং হাইল্যান্ডস ও পুত্রজায়া) — সেরা হালাল ও আধুনিক সিটি ট্যুর
- **৫ দিনের জনপ্রতি খরচ (ফ্যামিলি শেয়ারিং):** **BDT 68,000 – BDT 84,000**
- **ভিসার নিয়ম:** ১০০% অনলাইন **Malaysia e-Visa** (৪ থেকে ৭ কার্যদিবসে অনুমোদন, পাসপোর্ট জমা দিতে হয় না) + ফ্রি MDAC অনলাইন ফর্ম।
- **ফ্লাইটের সময়:** ঢাকা থেকে ডিরেক্ট ফ্লাইটে ৩ ঘণ্টা ৫০ মিনিট (AirAsia, Batik Air, Biman ও US-Bangla)।
- **কেন পরিবারের জন্য সেরা:** মুসলিম সংখ্যাগরিষ্ঠ দেশ হওয়ায় প্রতিটি শপিং মল ও ফুড কোর্টে সরকারি JAKIM সার্টিফাইড Halal খাবার ও নামাজের সুন্দর ব্যবস্থা আছে। তাছাড়া KLCC ও Bukit Bintang এলাকায় রান্নাঘর ও ওয়াশিং মেশিনসহ 2-Bedroom সার্ভিসড অ্যাপার্টমেন্ট পাওয়া যায়।

৩. THAILAND (ব্যাংকক, পাতায়া ও ফুকেট) — থিম পার্ক, শপিং ও ফ্যামিলি মেডিকেল চেকআপ
- **৫ দিনের জনপ্রতি খরচ (ফ্যামিলি শেয়ারিং):** **BDT 72,000 – BDT 88,000**
- **ভিসার নিয়ম:** যাত্রার আগে **Thailand Official e-Visa** (thaievisa.go.th) আবেদন করুন; approval বা নির্দিষ্ট processing time নিশ্চিত নয়। সরকারি visa fee portal/Embassy-এর বর্তমান schedule-এ দেখুন; bank/payment charge আলাদা এবং optional agency service fee provider-ভেদে বদলায়—agency নিলে লিখিত itemized quote নিন।
- **ফ্লাইটের সময়:** ঢাকা থেকে মাত্র ২ ঘণ্টা ২৫ মিনিট।
- **কেন পরিবারের জন্য সেরা:** বাচ্চাদের জন্য **Safari World Bangkok**, Sea Life Ocean World ও Chao Phraya ডিনার ক্রুজ যেমন আছে, তেমনি বয়স্ক বাবা-মায়ের জন্য Bumrungrad বা Bangkok Hospital-এ বার্ষিক হেলথ চেকআপ এবং Pratunam ও Sukhumvit Soi 3-এ প্রচুর হালাল রেস্টুরেন্ট রয়েছে।

৪. MALDIVES LOCAL ISLANDS (মাফুশি ও হুলহুমালে) — বাজেটের মধ্যে নীল সমুদ্রের দ্বীপ
- **৪ থেকে ৫ দিনের জনপ্রতি খরচ (ফ্যামিলি শেয়ারিং):** **BDT 75,000 – BDT 92,000**
- **ভিসার নিয়ম:** **ফ্রি ৩০ দিনের Visa on Arrival** (শুধুমাত্র ফ্রি IMUGA অনলাইন ফর্ম পূরণ করলেই হয়)।
- **কেন পরিবারের জন্য সেরা:** প্রাইভেট রিসোর্টে রাতপ্রতি ৫০,০০০ টাকা খরচ না করে মালে এয়ারপোর্ট থেকে মাত্র ২৫ ডলারের স্পিডবোটে **Maafushi Local Island**-এ চলে যান। সেখানে ১০০% হালাল খাবার, সমুদ্রের পাড়ে সুন্দর ফ্যামিলি হোটেল (**BDT 6,500–9,500/রাত**) এবং ৩০ ডলারে স্নরকেলিং ও স্যান্ডব্যাংক ট্যুর পাওয়া যায়।

৫. SINGAPORE (মেরিনা বে, সেন্তোসা ও লিটল ইন্ডিয়া) — সবচেয়ে পরিষ্কার ও স্ট্রলার-বান্ধব শহর
- **৫ দিনের জনপ্রতি খরচ:** **BDT 95,000 – BDT 1,18,000**
- **কেন পরিবারের জন্য সেরা:** বিশ্বমানের নিরাপত্তা, প্রতিটি মেট্রো স্টেশনে লিফট ও হুইলচেয়ার র‍্যাম্প, Universal Studios, Gardens by the Bay এবং Little India-তে ২৪ ঘণ্টা খোলা Mustafa Centre।

৬. DUBAI, UAE (দেরা, ডাউনটাউন দুবাই ও মরুভূমি সাফারি) — শীতকালের সেরা পারিবারিক সফর
- **৫ দিনের জনপ্রতি খরচ:** **BDT 1,10,000 – BDT 1,35,000**
- **কেন পরিবারের জন্য সেরা:** অক্টোবর থেকে মার্চ মাসের চমৎকার আবহাওয়া, শতভাগ হালাল খাবার, Burj Khalifa, Miracle Garden এবং ফ্যামিলি Desert Safari।`,
    internalLinks: [
      { text: "Singapore ৪ দিনের বাজেট ট্যুর প্ল্যান (MRT SimplyGo ও হালাল খাবার)", path: "/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide" },
      { text: "Bumrungrad ও Bangkok Hospital মেডিকেল চেকআপ গাইড", path: "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh" },
      { text: "মাত্র ৭৫,০০০ টাকায় মালদ্বীপ ভ্রমণ (Maafushi গাইড)", path: "/blog/maldives-budget-trip-bangladesh-maafushi" },
      { text: "Sri Lanka + Maldives ৭ দিনের কম্বো ট্যুর ও BDT খরচ", path: "/blog/sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost" },
      { text: "কাঠমান্ডু ও পোখারা ৫ দিনের নেপাল ট্যুর প্ল্যান", path: "/blog/nepal-pokhara-itinerary-bangladesh" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "ফ্যামিলি থিম পার্ক ও ট্যুর টিকিটে ১৫% পর্যন্ত ছাড় পান",
      body: "Safari World Bangkok, Genting Awana SkyWay, Gardens by the Bay ও Dubai Desert Safari-এর ফ্যামিলি পাস আগেভাগে অনলাইনে বুক করে দীর্ঘ লাইন এড়িয়ে চলুন।",
    },
  },

  "dhaka-airport-outbound-immigration-checklist-noc-go": {
    title: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট 2026: NOC, GO, Return Ticket ও প্রথমবার ভ্রমণের নিয়ম",
    summary:
      "হাতে বৈধ e-Visa থাকা সত্ত্বেও অথবা Nepal বা Maldives-এ Visa on Arrival ট্রিপে যাওয়ার সময় প্রথমবার বিদেশগামী অনেক বাংলাদেশি হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের (DAC) ইমিগ্রেশন কাউন্টার নিয়ে দুশ্চিন্তায় থাকেন। অথচ আপনার ফাইলে ডকুমেন্টগুলো ঠিকঠাক সাজানো থাকলে ঢাকা এয়ারপোর্টে Outbound Immigration পার হতে মাত্র ২ মিনিট সময় লাগে। এই যাচাইকৃত গাইডে প্রত্যেক যাত্রীর জন্য বাধ্যতামূলক ৫টি ডকুমেন্ট (৬ মাসের মেয়াদসহ পাসপোর্ট, ভিসার প্রিন্ট কপি, কনফার্মড Return Ticket, Hotel Voucher এবং Passport Dollar Endorsement) এবং পেশাভেদে NOC, সরকারি GO ও Trade License-এর নিয়ম বিস্তারিত জানানো হয়েছে।",
    category: "Visa & Immigration",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `আপনি যখন হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC), ঢাকা থেকে আন্তর্জাতিক ফ্লাইটে চেক-ইন শেষ করে **Boarding Pass** হাতে নিয়ে দোতলার ইমিগ্রেশন জোনে প্রবেশ করবেন, তখন ইমিগ্রেশন অফিসার মূলত নিশ্চিত হতে চান যে আপনি একজন প্রকৃত পর্যটক এবং নির্দিষ্ট সময় শেষে দেশে ফিরে আসবেন।

১. প্রত্যেক যাত্রীর জন্য বাধ্যতামূলক ৫টি ডকুমেন্ট (সবার ফাইলে থাকতে হবে)
১. **কমপক্ষে ৬ মাসের মেয়াদসহ আসল পাসপোর্ট:** আপনার বর্তমান পাসপোর্টের সাথে যদি পুরনো (Expired) পাসপোর্ট থাকে যেখানে আগের ভিসা বা ট্রাভেল হিস্ট্রি আছে, তবে সেগুলো অবশ্যই স্ট্যাপলার বা রাবার ব্যান্ড দিয়ে একসাথে রাখবেন।
২. **প্রিন্ট করা Visa কপি অথবা অনলাইন Arrival ফর্মের QR Code:**
   - Thailand, Malaysia, Singapore ও Dubai-এর জন্য: আপনার অনুমোদিত **e-Visa PDF**-এর রঙিন বা সাদাকালো প্রিন্ট কপি (পাশাপাশি Malaysia-এর জন্য **MDAC** এবং Singapore-এর জন্য **SG Arrival Card**)।
   - Maldives-এর জন্য: আপনার **IMUGA Traveller Declaration** QR কোডের প্রিন্ট বা স্ক্রিনশট।
   - Nepal-এর জন্য: এয়ারপোর্টে Visa on Arrival পাওয়া যায়, তবে অনলাইনে প্রি-অ্যারাইভাল ফর্ম পূরণ করে প্রিন্ট রাখলে সময় বাঁচে।
3. **কনফার্মড Return Air Ticket (Roundtrip PNR):** শুধুমাত্র যাওয়ার (One-Way) টিকিট নিয়ে কখনোই ট্যুরিস্ট ভিসায় ঢাকা ইমিগ্রেশনে যাবেন না। আপনার ফিরতি টিকিটে অবশ্যই যাচাইযোগ্য Airline PNR বা 13-digit e-Ticket নাম্বার থাকতে হবে।
4. **কনফার্মড Hotel Booking Voucher:** আপনার অবস্থানের পুরো সময়কালের জন্য Agoda, Booking.com বা ট্রাভেল এজেন্সির প্রিন্ট করা হোটেল ভাউচার।
5. **বৈদেশিক মুদ্রার প্রমাণ (Passport Dollar Endorsement):** আপনার পাসপোর্টের পেছনের পাতায় ব্যাংকের **Dollar Endorsement সিল** + আপনার Dual-Currency Card (অথবা নগদ USD এবং সর্বশেষ ৩–৬ মাসের Bank Statement)।

২. পেশা অনুযায়ী অতিরিক্ত ডকুমেন্ট (খুবই গুরুত্বপূর্ণ!)
আপনার পাসপোর্টে পেশা (Profession) যা দেওয়া আছে এবং আপনি বর্তমানে যা করেন তার সাথে মিল রেখে নিচের কাগজটি সাথে রাখুন:
- **বেসরকারি চাকরিজীবী (Private Job Holders):** অফিসের লেটারহেডে সিল ও স্বাক্ষরসহ আসল **NOC (No Objection Certificate) / ছুটির অনুমোদনপত্র** এবং আপনার **Office ID Card**।
- **সরকারি, আধা-সরকারি ও রাষ্ট্রায়ত্ত প্রতিষ্ঠানের কর্মকর্তা-কর্মচারী:** সংশ্লিষ্ট মন্ত্রণালয় বা দপ্তর থেকে ইস্যুকৃত অফিশিয়াল **GO (Government Order) / বহির্গমন ছুটি অনুমোদনপত্র**। বৈধ GO ছাড়া সরকারি চাকরিজীবীদের ইমিগ্রেশন পার হতে দেওয়া হয় না।
- **ব্যবসায়ী (Business Owners):** আপনার নবায়নকৃত **Trade License**-এর ফটোকপি (সম্ভব হলে ইংরেজি অনুবাদ বা নোটারি কপি) এবং আপনার প্রতিষ্ঠানের **Visiting Card**।
- **ডাক্তার, ইঞ্জিনিয়ার ও আইনজীবী:** আপনার প্রফেশনাল আইডি কার্ড (BMDC / IEB / Bar Council ID) অথবা চেম্বার/অফিসের ভিজিটিং কার্ড।
- **শিক্ষার্থী ও গৃহিণী:** শিক্ষার্থীদের জন্য **Student ID Card** ও শিক্ষাপ্রতিষ্ঠানের ছুটির চিঠি; আর গৃহিণী বা পরিবারের সাথে ভ্রমণকারীদের জন্য স্বামী/পিতার NOC বা Trade License কপি এবং কাবিননামা/মেরিজ সার্টিফিকেটের ফটোকপি।

৩. প্রথমবার "FRESH PASSPORT"-এ NEPAL বা MALDIVES যাওয়ার বিশেষ টিপস
Nepal এবং Maldives-এ বাংলাদেশিদের জন্য ফ্রি Visa on Arrival থাকায় প্রথমবার ভ্রমণকারীদের ইমিগ্রেশন অফিসার ২–৩টি সাধারণ প্রশ্ন করতে পারেন:
- মার্জিত পোশাকে আত্মবিশ্বাসের সাথে কথা বলুন।
- আপনি কোন হোটেলে থাকছেন এবং কোন কোন জায়গা ঘুরবেন তা জেনে রাখুন (যেমন: *"আমরা কাঠমান্ডুর Thamel-এ ৩ রাত এবং Pokhara Lakeside-এ ২ রাত থাকব"*).
- সাথে অন্তত **$300–$500 USD** সমপরিমাণ নগদ ডলার অথবা এনডোর্স করা **Dual-Currency Card ও Bank Statement** রাখুন।`,
    internalLinks: [
      { text: "নতুন পাসপোর্টে (Fresh Passport) ৩ ধাপে Travel History তৈরির গাইড", path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia" },
      { text: "অনলাইনে Thailand e-Visa করার নিয়ম (thaievisa.go.th গাইড)", path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide" },
      { text: "Malaysia e-Visa ও ফ্রি MDAC কার্ড গাইড (KLIA ইমিগ্রেশন)", path: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration" },
      { text: "Singapore Tourist Visa গাইড (অনুমোদিত এজেন্ট ও LOI V39A)", path: "/blog/singapore-visa-guide-bangladesh-agents" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "বিদেশের এয়ারপোর্টে নেমেই ঝামেলামুক্ত হোটেল ট্রান্সফার চান?",
      body: "কাঠমান্ডু, ব্যাংকক, কুয়ালালামপুর, দুবাই বা সিঙ্গাপুর এয়ারপোর্ট থেকে আপনার হোটেলে যাওয়ার জন্য ফিক্সড রেটে প্রাইভেট কার আগেভাগে বুক করে রাখুন।",
    },
  },

  "cheap-flight-booking-hacks-dhaka": {
    title: "ঢাকা থেকে কম ভাড়ায় আন্তর্জাতিক Flight বুকিংয়ের ৫টি কার্যকরী কৌশল (2026)",
    summary:
      "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে বিদেশগামী ফ্লাইটের ভাড়া সপ্তাহের দিন এবং এয়ারলাইন্সের সিট ইনভেন্টরি অনুযায়ী রাতারাতি ১২,০০০ থেকে ২৫,০০০ টাকা পর্যন্ত ওঠানামা করতে পারে। বাংলাদেশি ভ্রমণকারীদের জন্য লেখা এই গাইডে কম ভাড়ায় টিকিট কাটার ৫টি পরীক্ষিত উপায় আলোচনা করা হয়েছে: মঙ্গলবার মধ্যরাতের গ্লোবাল এয়ারলাইন্স ভাড়া আপডেট উইন্ডো চেক করা, বৃহস্পতি ও শুক্রবারের পিক ভিড় এড়িয়ে সোম বা মঙ্গলবার সকালে ফ্লাইট নেওয়া, Thai Lion Air, AirAsia ও SalamAir-এর মতো বাজেট ক্যারিয়ারে ৭ কেজি কেবিন ব্যাগেজ কৌশল ব্যবহার করা এবং দেশীয় ব্যাংকের ১০%–১৫% কার্ড ডিসকাউন্ট কাজে লাগানো।",
    category: "Cheap Flight Tips",
    date: "১২ জুন, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৪ মিনিট পড়া",
    content: `বাংলাদেশ থেকে বিদেশ ভ্রমণের মোট খরচের সবচেয়ে বড় অংশ চলে যায় বিমানের টিকিটে। তবে কিছু স্মার্ট নিয়ম মেনে টিকিট খুঁজলে আপনি একই ফ্লাইটে হাজার হাজার টাকা সাশ্রয় করতে পারেন।

১. মঙ্গলবার রাতের গ্লোবাল ভাড়া আপডেট উইন্ডো
অধিকাংশ আন্তর্জাতিক এয়ারলাইন্স প্রতি সপ্তাহে মঙ্গলবার মধ্যরাতের পর তাদের অবিক্রিত সিটের ভাড়া রিসেট করে। তাই বুধবার সকালে ঢাকা থেকে ফ্লাইট সার্চ করলে প্রায়ই প্রোমোশনাল ইকোনমি সিট পাওয়া যায়।

২. বৃহস্পতি ও শুক্রবারের ফ্লাইট এড়িয়ে চলুন
বাংলাদেশে সাপ্তাহিক ছুটি এবং প্রবাসী কর্মীদের ফ্লাইটের চাপের কারণে বৃহস্পতিবার রাত ও শুক্রবারের ফ্লাইটের দাম সবসময় ১৫% থেকে ২৫% বেশি থাকে। আপনি যদি সোমবার বা মঙ্গলবার সকালের ফ্লাইট বেছে নেন, তবে সহজেই BDT 6,000 – BDT 12,000 পর্যন্ত সাশ্রয় করতে পারবেন।

৩. বাজেট এয়ারলাইন্সে কেবিন ব্যাগেজ কৌশল
কুয়ালালামপুর বা ব্যাংকক যাওয়ার ক্ষেত্রে AirAsia, Batik Air বা Thai Lion Air-এ শুধুমাত্র ৭ কেজি Hand-Carry কেবিন ব্যাগেজ নিয়ে ভ্রমণ করলে Biman বা Thai Airways-এর তুলনায় জনপ্রতি BDT 10,000+ কম ভাড়ায় টিকিট পাওয়া যায়।

৪. দেশীয় ব্যাংকের কার্ড ডিসকাউন্ট ও প্রোমো কোড
ভ্রমণের আগে আপনার EBL, City Bank Amex, BRAC Bank বা Standard Chartered কার্ডে চলমান ট্রাভেল ডিসকাউন্ট চেক করুন এবং আমাদের ফ্লাইট সার্চ ইঞ্জিনে সব এয়ারলাইন্সের লাইভ রেট তুলনা করে নিন।`,
    internalLinks: [
      { text: "ঢাকা থেকে কাঠমান্ডু ফ্লাইট গাইড", path: "/flights/dhaka-kathmandu" },
      { text: "ঢাকা থেকে ব্যাংকক ফ্লাইট গাইড", path: "/flights/dhaka-bangkok" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "ঢাকা থেকে সব এয়ারলাইন্সের লাইভ ভাড়া তুলনা করুন",
      body: "আপনার ভ্রমণের তারিখ বসিয়ে দেখুন কোন দিন ফ্লাইটের ভাড়া সবচেয়ে কম।",
    },
  },

  "nepal-vs-thailand-first-trip": {
    title: "Nepal বনাম Thailand: বাংলাদেশিদের প্রথম বিদেশ ভ্রমণের জন্য কোন দেশটি সেরা?",
    summary:
      "বাংলাদেশি পাসপোর্টে প্রথম বিদেশ সফরের জন্য Nepal ও Thailand-এর ভিসা প্রক্রিয়া, বাজেট, হালাল খাবার ও যাতায়াতের তুলনা। Nepal Immigration-এর প্রকাশিত নিয়মে যোগ্য SAARC নাগরিকদের visa year-এ প্রথম সফরে সর্বোচ্চ ৩০ দিনের gratis visa রয়েছে; Thailand-এর জন্য আগে official e-Visa-তে আবেদন করতে হয়। ৫ দিনের আনুমানিক বাজেট: Kathmandu/Pokhara BDT 45,000–65,000; Bangkok/Pattaya BDT 80,000+। নিয়ম ও live price বদলাতে পারে—বুকিংয়ের আগে official portal-এ যাচাই করুন।",
    category: "Visa & Immigration",
    date: "২৮ মে, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "২ মিনিট পড়া",
    content: `জীবনের প্রথম বিদেশ ভ্রমণ সবসময়ই বিশেষ। কিন্তু আপনার পাসপোর্ট যদি একদম নতুন (Fresh Passport) হয়, তবে Nepal এবং Thailand-এর মধ্যে কোনটি বেছে নেওয়া বুদ্ধিমানের কাজ হবে?

১. ভিসার সহজতা: NEPAL এগিয়ে
- **Nepal:** Nepal Immigration-এর প্রকাশিত নিয়মে Afghanistan ছাড়া যোগ্য SAARC নাগরিকদের visa year-এ প্রথম সফরে সর্বোচ্চ ৩০ দিনের gratis tourist visa on arrival-এর কথা বলা হয়েছে। Bangladesh SAARC-এর সদস্য; তবু যাত্রার আগে বর্তমান যোগ্যতা, entry point ও fee নিশ্চিত করুন।
- **Thailand:** বাংলাদেশি আবেদনকারীদের ভ্রমণের আগে Tourist e-Visa নিতে হয়। আবেদন official Thai e-Visa portal দিয়ে হয় এবং অনুমোদিত হলে confirmation email-এ আসে। Dhaka mission-এর বর্তমান checklist-এ প্রয়োজনীয় কাগজপত্র ও ফি যাচাই করুন—অনুমোদন বা নির্দিষ্ট processing time নিশ্চিত নয়। পুরোনো offline-submission নির্দেশনা বর্তমান portal flow-তে প্রযোজ্য নাও হতে পারে।

২. বাজেটের তুলনা (৫ দিনের ট্রিপ)
- **Nepal:** ফ্লাইট, হোটেল ও খাবারসহ Kathmandu/Pokhara-তে ৫ দিনের আনুমানিক বাজেট **BDT 45,000–65,000**।
- **Thailand:** Bangkok/Pattaya-তে ৫ দিনের ট্রিপে ফ্লাইট, ভিসা ফি ও কেনাকাটাসহ **BDT 80,000+** লাগতে পারে। এগুলো পরিকল্পনার আনুমানিক হিসাব; তারিখ, live airfare, hotel rate ও exchange rate অনুযায়ী মোট খরচ বদলাবে। বুকিংয়ের আগে বর্তমান দাম যাচাই করুন।

৩. চূড়ান্ত সিদ্ধান্ত
আপনি যদি পাহাড়ি দৃশ্য, তুলনামূলক সহজ entry process (বর্তমান নিয়ম যাচাই করে) এবং সীমিত বাজেট চান, **Nepal** বিবেচনা করুন। আর আধুনিক মেট্রো শহর, শপিং মল, street food ও দ্বীপ দেখতে এবং আগে থেকে visa আয়োজন করতে প্রস্তুত থাকলে **Thailand** বেছে নিতে পারেন।`,
    internalLinks: [
      { text: "Nepal ভিসা চেকলিস্ট দেখুন", path: "/visa/nepal-visa" },
      { text: "Thailand e-Visa গাইড দেখুন", path: "/visa/thailand-visa" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "ব্যাংকক ও কাঠমান্ডুর সেরা ডে-ট্যুর দেখুন",
      body: "হোটেল পিকআপসহ দর্শনীয় স্থান ঘোরার প্যাকেজ ও অ্যাক্টিভিটি পাস চেক করুন।",
    },
  },

  "hotel-savings-guide-bangkok-kl-dubai": {
    title: "Bangkok, Kuala Lumpur ও Dubai-তে হোটেল খরচ কমানোর স্মার্ট গাইড (BDT ৮,০০০–১৫,০০০ সাশ্রয়)",
    summary:
      "বিদেশ ভ্রমণের মোট বাজেটের প্রায় ৩০% থেকে ৪০% খরচ হয়ে যায় হোটেল ভাড়ায়। অথচ মূল পর্যটন ভিড়ের চেয়ে মাত্র ২ বা ৩টি মেট্রো স্টেশন পরের এলাকায় হোটেল নিলে মানের কোনো আপস না করেই প্রতি ট্রিপে BDT 8,000 থেকে BDT 15,000 পর্যন্ত বাঁচানো সম্ভব। এই গাইডে জানুন কীভাবে Bangkok-এর Siam-এর বদলে On Nut BTS বা Pratunam-এর ভেতরের গলি, Dubai-এর Downtown-এর বদলে Deira Al Rigga / Union Metro এবং Kuala Lumpur-এর Bukit Bintang ও KLCC-তে সার্ভিসড ফ্যামিলি অ্যাপার্টমেন্ট বুক করে কম খরচে হালাল রেস্টুরেন্ট ও মেট্রোর কাছে থাকবেন।",
    category: "Hotel Savings",
    date: "৫ জুন, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `সঠিক লোকেশনে হোটেল নির্বাচন করলে শুধু হোটেল ভাড়াই বাঁচে না, প্রতিদিনের ট্যাক্সি ভাড়াও অর্ধেকে নেমে আসে।

১. BANGKOK: BTS SKYTRAIN লাইনের পাশে থাকুন
Siam বা মূল Sukhumvit রোডের ওপর ৪-তারকা হোটেলগুলো বেশ ব্যয়বহুল। আপনি যদি BTS Skytrain লাইনের ৩–৪ স্টেশন পরের **On Nut বা Phra Khanong** এলাকায় থাকেন, তবে অর্ধেক দামে সুইমিং পুলসহ আধুনিক হোটেল পাবেন এবং মাত্র ১০ মিনিটে ট্রেনে করেই মূল শপিং জোনে চলে আসতে পারবেন।

২. KUALA LUMPUR: পরিবারের জন্য SERVICED APARTMENT
কুয়ালালামপুরে ২টি আলাদা হোটেল রুম বুক না করে **Bukit Bintang বা KLCC** এলাকায় একটি 2-Bedroom Serviced Suite বুক করুন। এতে রান্নাঘর, ওয়াশিং মেশিন এবং রুফটপ ইনফিনিটি পুল পাওয়া যায়, যা ফ্যামিলি ট্রিপে প্রতিদিন ৩,০০০–৪,০০০ টাকা বাঁচায়।

৩. DUBAI: DEIRA (AL RIGGA ও UNION METRO) ও দুপুর ১২টা চেক-আউট লাগেজ টিপস
Downtown Dubai বা Marina-এর তুলনায় **Deira (Al Rigga বা Salah Al Din Metro স্টেশনের কাছে)** হোটেল ভাড়া প্রায় ৪০% কম। এখান থেকে মেট্রোতে চড়ে খুব সহজেই Burj Khalifa ও Dubai Mall-এ যাওয়া যায় এবং চারপাশে প্রচুর সাশ্রয়ী বাংলাদেশি ও পাকিস্তানি হালাল রেস্টুরেন্ট রয়েছে। এছাড়া ব্যাংকক, কুয়ালালামপুর ও দুবাইয়ে দুপুর ১২টায় সার্ভিসড অ্যাপার্টমেন্ট বা বাজেট হোটেল চেক-আউট করার পর গভীর রাতের ঢাকা ফ্লাইটের আগে অতিরিক্ত ১ রাতের ভাড়া না দিয়ে মেট্রো স্টেশনের কাছে **Radical Storage**-এ ব্যাগ জমা রেখে হাত খালি রেখে শেষ বিকেলের শপিং সারতে পারেন।`,
    internalLinks: [
      { text: "Dubai ভ্রমণের সম্পূর্ণ BDT খরচ", path: "/costs/dubai-costs" },
      { text: "Kuala Lumpur হোটেল গাইড", path: "/hotels/kuala-lumpur-hotels" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "এয়ারপোর্ট থেকে হোটেলে যাওয়ার খরচও বাঁচান",
      body: "এয়ারপোর্টে নেমে মিটার ট্যাক্সির চেয়ে আগেভাগে অনলাইনে প্রাইভেট ট্রান্সফার বুক করা বেশি সাশ্রয়ী ও নিরাপদ।",
    },
  },

  "halal-food-guide-bangkok-bangladesh": {
    title: "Bangkok-এ Halal খাবার কোথায় পাবেন: বাংলাদেশি পর্যটকদের জন্য সম্পূর্ণ গাইড ও BDT দাম",
    summary:
      "শপিং, ফ্যামিলি হলিডে অথবা Bumrungrad ও Bangkok Hospital-এ চিকিৎসার জন্য যেসব বাংলাদেশি থাইল্যান্ডে যান, তাদের প্রধান প্রশ্ন থাকে—ব্যাংককে শতভাগ বিশ্বস্ত Halal খাবার কোথায় পাওয়া যাবে? এই গাইডে থাইল্যান্ডের অফিশিয়াল হালাল লোগো চেনার উপায়, ব্যাংককের সবচেয়ে বড় দুটি মুসলিম ফুড জোন—Pratunam (Petchaburi Soi 7 মসজিদ গলি) এবং Sukhumvit Soi 3 (Nana / Arab Street)—এবং BDT 180 টাকার শপিং মল ফুড কোর্ট থেকে শুরু করে জনপ্রিয় Maidaun Halal, Al Hussain ও Yana Restaurant-এর খাবারের দাম টাকায় তুলে ধরা হয়েছে, সাথে ইউনেস্কো সাইট আয়ুথায়ার হালাল-বান্ধব ডে ট্রিপ প্ল্যানও।",
    category: "Food & Culture",
    date: "১৫ জুন, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৮ মিনিট পড়া",
    content: `ব্যাংককে কোথায় খুঁজতে হবে তা জানা থাকলে সুস্বাদু এবং ১০০% Halal খাবার পাওয়া খুবই সহজ।

১. অফিশিয়াল থাই HALAL লোগো চিনে নিন
থাইল্যান্ডের **Central Islamic Council of Thailand (CICOT)** অনুমোদিত রেস্টুরেন্ট ও খাবারের প্যাকেটে সবুজ রঙের চারকোনা ফ্রেমের ভেতর আরবিতে "হালাল" লেখা সিল থাকে। 7-Eleven স্টোর থেকে স্ন্যাকস বা রেডি মিল কেনার সময় এই লোগোটি দেখে কিনুন।

২. ব্যাংককের সেরা হালাল এলাকা
- **Pratunam ও Ratchathewi (Petchaburi Soi 7):** Darul Aman Mosque-এর আশেপাশের গলিতে প্রচুর হালাল থাই স্ট্রিট ফুড, বিরিয়ানি ও ভাতের হোটেল রয়েছে।
- **Sukhumvit Soi 3 (Nana / Arab Street):** Bumrungrad Hospital-এর ঠিক পাশেই। এখানে বাংলাদেশি, ভারতীয়, পাকিস্তানি ও মধ্যপ্রাচ্যের অসংখ্য হালাল রেস্টুরেন্ট রাত গভীর পর্যন্ত খোলা থাকে।
- **বড় শপিং মলের ফুড কোর্ট:** Siam Paragon, MBK Center (5th Floor Halal Zone), Terminal 21 এবং CentralWorld-এ আলাদা হালাল স্টল রয়েছে।

৩. ব্যাংককে হালাল খাবারের গড় দাম (BDT-তে)
- **স্ট্রিট ফুড ও মলের ফুড কোর্ট:** প্রতি প্লেট ৬০–১০০ বাথ (**BDT 190 – BDT 320**)
- **মিড-রেঞ্জ রেস্টুরেন্ট (যেমন Yana Restaurant বা Al Hussain):** জনপ্রতি ১৫০–৩০০ বাথ (**BDT 480 – BDT 950**)

৪. বোনাস: ব্যাংকক থেকে হালাল-বান্ধব আয়ুথায়া ডে ট্রিপ
ব্যাংকক ধীর ভ্রমণ পরিকল্পনায় পুরস্কৃত করে, কিন্তু পুরোনো সিয়ামি রাজধানী আয়ুথায়ার ধ্বংসাবশেষ - ১৯৯১ সাল থেকে ইউনেস্কো বিশ্ব ঐতিহ্য - এক দিনের নিখুঁত পালানো, আর পৌঁছানো যায় ভাবার চেয়েও সহজে। এক লম্বা দিনেই রাজকীয় প্রাসাদ কমপ্লেক্স ঘোরা, দ্বীপের চারপাশে নদী পরিক্রমা, আর রাতে ফিরে প্রাতুনামে দেরিতে হালাল ডিনার - সবই সম্ভব।

[[figure]]

- যাওয়ার পথ: ব্যাংককের ক্রুং থেপ আফিওয়াট সেন্ট্রাল টার্মিনাল থেকে সরাসরি ট্রেন প্রায় ১.৫-২ ঘণ্টা (থার্ড ক্লাস বিখ্যাতভাবে সস্তা, জনপ্রতি আনুমানিক THB ১৫-৩৫), আর মিনিভ্যান প্রায় ১.৫ ঘণ্টায় আনুমানিক THB ৬০-১০০। বয়স্কসহ পরিবারের জন্য সারাদিনের হায়ারড ভ্যান আরামদায়ক - চার-ছয়জনের মধ্যে ভাগ করে নিলে সহজ।
- যা মিস করবেন না: ওয়াট ফ্রা সি সানফেটের তিনটি ঘণ্টাকৃতি চেদি - হিস্টোরিক্যাল পার্কের পোস্টকার্ড - এছাড়া ওয়াট মহাথাট, যেখানে গাছের শেকড়ের ভেতরে বুদ্ধমুণ্ড বসে আছে, এবং ওয়াট রাচ্চাবুরানার রঙিন ক্রিপ্ট। বিদেশি দর্শকদের জন্য প্রতি মন্দিরের টিকিট আনুমানিক THB ২০-৫০, প্রধান সাইটগুলোতে কম্বাইন্ড টিকিটও পাওয়া যায়।
- ঘোরার উপায়: পুরোনো শহরটি নদী ঘেরা দ্বীপ। দিনে আনুমানিক THB ৫০-এ সাইকেল ভাড়া, টুক-টুক লুপ, বা দ্বীপের চারপাশে এক ঘণ্টার লং-টেল বোট সার্কিট (জনপ্রতি আনুমানিক THB ২০০-৩০০) - বিকেলের গরমে নদীর মন্দিরগুলো দেখার সবচেয়ে ঠান্ডা উপায়।
- আয়ুথায়ায় হালাল খাবার: নদীর পাড়ের পুরোনো মুসলিম পাড়ায় দীর্ঘদিনের সম্প্রদায় আছে, আর বাং লান রোড নাইট মার্কেটে হালাল সাইনসহ মুসলিম-পরিচালিত স্টল মেলে - ব্যাংককের মতো একই সবুজ লোগো যাচাই করুন। গ্রিলড নদীর কাঁকড়া, বোট নুডলস ও তাজা ফলের শেক বাকিটা সামলায়; স্বাভাবিকভাবেই প্রতিটি স্টলে মাংসের উৎস জিজ্ঞেস করুন। একটি সৎ পরামর্শ: ব্যাংককের হোটেলে ভরপুর নাশতা করে বের হন, কারণ মূল বাজার এলাকার বাইরে হালাল বিকল্প কমে যায়।
- সময় পরিকল্পনা: সকাল ৭:০০-৮:০০-এ ব্যাংকক ছাড়ুন, দুপুরের গরমের আগে মন্দির ঘুরুন, বিকেল ৩:০০-৫:০০ বোট সার্কিট বা নাইট মার্কেটের জন্য রাখুন, আর রাত ৭:০০-৮:০০-এ ফিরে আসুন। আয়ুথায়া সমতল, রোদেলা ও উন্মুক্ত - ব্যাংককের তুলনায় এখানে টোপি, পানি ও সানস্ক্রিনের প্রয়োজন বেশি।

আয়ুথায়ার পাঁচ সত্যিকারের ঘণ্টা একটি ব্যাংকক ফুড ট্রিপকে ঠিকঠাক থাইল্যান্ড হলিডেতে বদলে দেয় - আর ওয়াট ফ্রা সি সানফেটের সেই ছবিই হবে যেটা দেখে বন্ধুরা ভাববে আপনি পৃথিবীর অন্য প্রান্তে উড়ে গিয়েছিলেন।`,
    internalLinks: [
      { text: "Thailand ভিসা গাইড ও চেকলিস্ট", path: "/visa/thailand-visa" },
      { text: "Bangkok হোটেল ও সেরা এলাকা", path: "/hotels/bangkok-hotels" },
      { text: "Bangkok ৫ দিনের সম্পূর্ণ BDT বাজেট", path: "/costs/thailand-costs" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "ব্যাংককে হালাল ডিনার ক্রুজ ও সিটি ট্যুর বুক করুন",
      body: "Chao Phraya River-এ হালাল বুফেসহ ডিনার ক্রুজ এবং ফ্যামিলি ট্যুরের টিকিট ডিসকাউন্টে বুক করুন।",
    },
  },

  "nepal-pokhara-itinerary-bangladesh": {
    title: "Kathmandu থেকে Pokhara: বাংলাদেশিদের জন্য ৫ দিনের Nepal ভ্রমণ প্ল্যান ও BDT খরচ",
    summary:
      "ঢাকা থেকে মাত্র দেড় ঘণ্টার ফ্লাইট এবং প্রথম ভ্রমণে ফ্রি Visa on Arrival হওয়ায় বাংলাদেশিদের কাছে হিমালয় ঘেরা Nepal সবচেয়ে প্রিয় বাজেট গন্তব্য। এই ৫ দিনের সাজানো ভ্রমণ পরিকল্পনায় (Itinerary) কাঠমান্ডুর ঐতিহাসিক দরবার স্কয়ার, স্বয়ম্ভুনাথ ও বৌদ্ধনাথ স্তূপের সাথে পোখারার শান্ত ফেওয়া লেক এবং সারাংকোটের অন্নপূর্ণা পর্বতমালার সূর্যোদয় যুক্ত করা হয়েছে। এখানে পাবেন কাঠমান্ডু থেকে পোখারা যাওয়ার ট্যুরিস্ট বাস বনাম ডোমেস্টিক ফ্লাইটের ভাড়া, Thamel ও Lakeside হোটেল রেট, SAARC ডিসকাউন্ট এবং জনপ্রতি ৪০,০০০ থেকে ৫৪,০০০ টাকার পূর্ণাঙ্গ হিসাব।",
    category: "Family & Budget",
    date: "১৭ জুন, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `মাত্র ৫ দিনেই কাঠমান্ডুর ঐতিহ্য এবং পোখারার হিমালয় সৌন্দর্য উপভোগ করার সেরা রুটিন নিচে দেওয়া হলো:

- **১ম দিন: ঢাকা (DAC) থেকে কাঠমান্ডু (KTM) ও Thamel ভ্রমণ**
  এয়ারপোর্টে নেমে ফ্রি SAARC Visa on Arrival নিন। প্রিপেইড ট্যাক্সিতে (**~BDT 750**) Thamel-এর হোটেলে চেক-ইন করে বিকেলে Swayambhunath (Monkey Temple) ঘুরে দেখুন।
- **২য় দিন: কাঠমান্ডু থেকে পোখারা যাত্রা**
  সকাল ৭টায় VIP Sofa Tourist Bus (**BDT 1,200–1,800**, ৭–৮ ঘণ্টা) অথবা ২৫ মিনিটের ডোমেস্টিক ফ্লাইটে (Buddha Air / Yeti Airlines, **~BDT 11,500**) পোখারা পৌঁছান। বিকেলে Phewa Lake-এ নৌকা ভ্রমণ করুন।
- **৩য় দিন: Sarangkot হিমালয় সূর্যোদয় ও পোখারা সাইটসিয়িং**
  ভোর ৫টায় ট্যাক্সি নিয়ে Sarangkot Viewpoint থেকে Annapurna ও Fishtail (Machhapuchhre) চূড়ায় সোনালী সূর্যোদয় দেখুন। দুপুরে Davis Falls, Gupteshwor Cave ও World Peace Pagoda ঘুরুন।
- **৪র্থ দিন: কাঠমান্ডু ফেরা ও Nagarkot / Bhaktapur দর্শন**
  কাঠমান্ডু ফিরে ঐতিহাসিক Durbar Square ঘুরে দেখুন (পাসপোর্ট দেখালে বাংলাদেশিদের জন্য বিশেষ SAARC ডিসকাউন্ট টিকেট পাওয়া যায়)।
- **৫ম দিন: শপিং ও ঢাকায় ফেরা**
  Thamel থেকে পশমিনা শাল, নেপালি চা ও স্যুভেনির কিনে দুপুরে ঢাকার ফ্লাইট ধরুন।

**মোট ৫ দিনের খরচ:** ট্যুরিস্ট বাসে যাতায়াত করলে জনপ্রতি **BDT 40,000 – BDT 45,000**, আর অভ্যন্তরীণ ফ্লাইট নিলে **BDT 50,000 – BDT 56,000**।`,
    internalLinks: [
      { text: "ঢাকা থেকে কাঠমান্ডু ফ্লাইটের দাম", path: "/flights/dhaka-kathmandu" },
      { text: "কাঠমান্ডু ও পোখারার হোটেল গাইড", path: "/hotels/kathmandu-hotels" },
      { text: "Nepal ৫ দিনের বিস্তারিত খরচ", path: "/costs/nepal-costs" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "কাঠমান্ডু ও পোখারার পাহাড়ি পথে সবসময় অনলাইনে থাকুন",
      body: "নেপালে নামার সাথে সাথেই Google Maps, Pathao ও WhatsApp ব্যবহারের জন্য আগে থেকেই Nepal eSIM ইনস্টল করে নিন।",
    },
  },

  "maldives-budget-trip-bangladesh-maafushi": {
    title: "ঢাকা থেকে ৭৫,০০০ টাকায় Maldives ভ্রমণ: Maafushi Local Island বনাম প্রাইভেট রিসোর্ট গাইড",
    summary:
      "অনেকেই মনে করেন Maldives ভ্রমণ করতে হলে জনপ্রতি ২ থেকে আড়াই লাখ টাকা খরচ করতে হয়, কারণ প্রাইভেট ওভারওয়াটার রিসোর্টগুলোতে এক রাতের ভাড়াই ৫০০ ডলারের বেশি। কিন্তু বর্তমানে Maafushi এবং Hulhumalé-এর মতো স্থানীয় দ্বীপগুলোতে (Local Islands) থেকে আপনি ঠিক একই স্বচ্ছ নীল ভারত মহাসাগরের সৌন্দর্য উপভোগ করতে পারবেন ফ্লাইটসহ মোট BDT 75,000-এর নিচে! এই গাইডে জানুন কীভাবে বাংলাদেশি পর্যটকরা ফ্রি ৩০ দিনের Visa on Arrival ও IMUGA ফর্ম নিয়ে মাত্র ২৫ ডলারের স্পিডবোটে Maafushi যান এবং ৩০ ডলারে স্নরকেলিং ও স্যান্ডব্যাংক ট্যুর করেন।",
    category: "Family & Budget",
    date: "২২ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৫ মিনিট পড়া",
    content: `মালদ্বীপ ভ্রমণ এখন আর শুধুই লাখপতিদের স্বপ্ন নয়। ২০১০ সালের পর থেকে মালদ্বীপ সরকার স্থানীয় দ্বীপগুলোতে পর্যটকদের জন্য আধুনিক বুটিক হোটেল খোলার অনুমতি দেওয়ায় বাংলাদেশি ভ্রমণকারীরা খুব কম খরচেই মালদ্বীপ ঘুরতে পারছেন।

১. প্রাইভেট রিসোর্ট বনাম LOCAL ISLAND (MAAFUSHI ও HULHUMALÉ)
- **প্রাইভেট রিসোর্ট:** পুরো একটি দ্বীপ জুড়ে শুধু একটিই হোটেল থাকে। এয়ারপোর্ট থেকে রিসোর্টের নিজস্ব স্পিডবোটে যেতে জনপ্রতি $150–$300 এবং রুম ভাড়া প্রতি রাতে $400–$1,000+ লাগে।
- **Maafushi Local Island:** মালে এয়ারপোর্ট (MLE) থেকে পাবলিক স্পিডবোটে মাত্র ৩৫ মিনিট লাগে এবং ভাড়া মাত্র **$25 USD (~BDT 3,000)**। এখানে সমুদ্রের পাড়েই Arena Beach বা Kaani Palm Beach-এর মতো চমৎকার হোটেল **BDT 6,500 – BDT 11,000/রাতে** (ব্রেকফাস্ট সহ) পাওয়া যায় এবং পুরো দ্বীপের সব খাবার ১০০% Halal।

২. মাত্র $30–$35 ডলারেই হাফ-ডে স্নরকেলিং ও স্যান্ডব্যাংক ট্যুর!
Maafushi-এর যেকোনো হোটেল থেকে মাত্র **$30–$35 USD (~BDT 3,800)** দিয়ে আপনি কচ্ছপ ও রঙিন মাছের সাথে স্নরকেলিং, ডলফিন ক্রুজ, মাঝসমুদ্রের সাদা বালির Sandbank-এ দুপুরের খাবার এবং ফ্রি আন্ডারওয়াটার ছবি ও ড্রোন ভিডিওসহ হাফ-ডে ট্যুর করতে পারবেন।

৩. ৪ দিনের মালদ্বীপ বাজেট (জনপ্রতি — ২ জন শেয়ারিং)
- **Roundtrip Flight (DAC–MLE):** BDT 44,000 – BDT 54,000
- **Airport–Maafushi–Airport Speedboat:** BDT 6,000 ($50 রাউন্ডট্রিপ)
- **৩ রাত Maafushi হোটেল (জনপ্রতি শেয়ার):** BDT 11,500
- **হাফ-ডে স্নরকেলিং ট্যুর ও খাবার:** BDT 11,000
- **মোট খরচ:** **BDT 72,500 – BDT 82,500**!`,
    internalLinks: [
      { text: "Maldives ৪ দিনের বিস্তারিত BDT বাজেট", path: "/costs/maldives-costs" },
      { text: "Maldives ফ্রি VOA ও IMUGA চেকলিস্ট", path: "/visa/maldives-visa" },
      { text: "Maafushi ও Hulhumalé হোটেল গাইড", path: "/hotels/maldives-hotels" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "মালে এয়ারপোর্টে নামার সাথে সাথেই ইন্টারনেট সংযোগ পান",
      body: "আপনার স্পিডবোট অপারেটর ও Maafushi হোটেলের সাথে WhatsApp-এ যোগাযোগের জন্য আগেভাগেই Maldives eSIM ইনস্টল করে নিন।",
    },
  },

  "singapore-visa-guide-bangladesh-agents": {
    title: "বাংলাদেশ থেকে Singapore Tourist Visa পাওয়ার নিয়ম (2026): Authorized Agents, LOI V39A ও চেকলিস্ট",
    summary:
      "পরিবারের সাথে Sentosa Island ভ্রমণ, Mount Elizabeth Hospital-এ উন্নত চিকিৎসা অথবা Little India-এর Mustafa Centre-এ শপিংয়ের জন্য Singapore বাংলাদেশিদের অন্যতম শীর্ষ গন্তব্য। তবে ঢাকার সিঙ্গাপুর কনস্যুলেটে সরাসরি কোনো ব্যক্তিগত ট্যুরিস্ট ভিসা আবেদন জমা নেওয়া হয় না—অবশ্যই অনুমোদিত ভিসা এজেন্টের (Authorized Visa Agent) মাধ্যমে আবেদন করতে হয়। এই গাইডে জানুন Letter of Introduction (Form V39A) কীভাবে পাবেন, ৩৫x৪৫ মিমি ম্যাট ছবির কড়া নিয়ম, কত টাকার Bank Statement লাগে এবং ফ্লাইটের ৭২ ঘণ্টা আগে ফ্রি SG Arrival Card পূরণের নিয়ম।",
    category: "Visa & Immigration",
    date: "২৪ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৫ মিনিট পড়া",
    content: `বাংলাদেশি পাসপোর্টধারীদের জন্য সিঙ্গাপুরের ভিসা একটি **ইলেকট্রনিক ভিসা (e-Visa PDF)**, তবে এর আবেদন প্রক্রিয়া থাইল্যান্ড বা মালয়েশিয়ার চেয়ে কিছুটা আলাদা।

১. কেন আপনাকে AUTHORIZED VISA AGENT (AVA)-এর মাধ্যমে আবেদন করতে হবে
ঢাকার গুলশানে অবস্থিত Consulate of the Republic of Singapore কোনো পর্যটকের কাছ থেকে সরাসরি ভিসা আবেদন গ্রহণ করে না। আপনাকে কনস্যুলেট তালিকাভুক্ত অনুমোদিত এজেন্টের মাধ্যমে পাসপোর্ট ও কাগজপত্র জমা দিতে হবে।
- **ভিসা ফি ও সার্ভিস চার্জ:** সরকারি ভিসা ফি SGD $30 + এজেন্ট প্রসেসিং চার্জ মিলিয়ে সাধারণত **BDT 4,200 – BDT 5,500** খরচ হয় (যদি আপনার নিজস্ব LOI থাকে)।

২. LETTER OF INTRODUCTION (FORM V39A) কী এবং কীভাবে পাবেন?
সিঙ্গাপুর ভিসার আবেদনে সিঙ্গাপুরের একজন নাগরিক (Singapore Citizen) অথবা স্থায়ী বাসিন্দার (Permanent Resident - Singpass ধারী) কাছ থেকে ইস্যু করা **Form V39A (LOI)** প্রয়োজন হয়।
- সিঙ্গাপুরে আপনার যদি কোনো আত্মীয় বা বন্ধু না থাকেন, তবে অনুমোদিত ভিসা এজেন্টরাই অতিরিক্ত সার্ভিস চার্জের বিনিময়ে তাদের সিঙ্গাপুর পার্টনারের মাধ্যমে বৈধ **LOI** ব্যবস্থা করে দেয়।

৩. প্রয়োজনীয় ডকুমেন্ট ও ছবির কড়া নিয়ম
- **Form 14A** (সঠিকভাবে পূরণ ও স্বাক্ষর করা)।
- **২ কপি 35mm x 45mm ছবি:** সাদা ব্যাকগ্রাউন্ড, ম্যাট ফিনিশ (Matte Finish) এবং ছবিতে মুখমণ্ডলের মাপ ৭০%–৮০% হতে হবে।
- **গত ৬ মাসের Bank Statement ও Bank Solvency Certificate:** জনপ্রতি কমপক্ষে **BDT 1,50,000 – BDT 2,50,000+** ক্লোজিং ব্যালেন্স থাকা ভালো।
- চাকরিজীবীদের জন্য **NOC ও Visiting Card**, ব্যবসায়ীদের জন্য নবায়নকৃত **Trade License**।

৪. ফ্লাইটের ৭২ ঘণ্টা আগে ফ্রি SG ARRIVAL CARD (SGAC)
ভিসা অনুমোদনের পর ঢাকা থেকে ফ্লাইটের ঠিক ৩ দিন (৭২ ঘণ্টা) আগে অফিশিয়াল ICA ওয়েবসাইট বা **MyICA Mobile App**-এ সম্পূর্ণ বিনামূল্যে **SG Arrival Card** সাবমিট করবেন।`,
    internalLinks: [
      { text: "Singapore ভিসা চেকলিস্ট পেজ দেখুন", path: "/visa/singapore-visa" },
      { text: "ঢাকা থেকে সিঙ্গাপুর ডিরেক্ট ফ্লাইট ভাড়া", path: "/flights/dhaka-singapore" },
      { text: "Little India ও Bugis হোটেল গাইড", path: "/hotels/singapore-hotels" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "Gardens by the Bay ও Universal Studios-এর টিকিট বুক করুন",
      body: "সিঙ্গাপুরের জনপ্রিয় থিম পার্ক ও অ্যাটাকশন পাস অনলাইনে আগেভাগে বুক করে সময় ও অর্থ বাঁচান।",
    },
  },

  "hajj-registration-bangladesh-government-vs-private-package-cost": {
    title: "বাংলাদেশ থেকে Hajj রেজিস্ট্রেশন গাইড (2026–2027): hajj.gov.bd নিয়ম, সরকারি বনাম বেসরকারি প্যাকেজ ও BDT খরচ",
    summary:
      "বাংলাদেশি মুসলিমদের জন্য ফরজ Hajj পালন জীবনের সবচেয়ে বড় ইবাদত এবং অনেক পরিবারের সারা জীবনের সঞ্চয়ের ফসল। তাই দালাল বা অবৈধ সাব-এজেন্টের প্রতারণা থেকে বাঁচতে বাংলাদেশ ধর্ম মন্ত্রণালয়ের অফিশিয়াল ই-হজ পোর্টাল (hajj.gov.bd)-এর নিয়ম জানা অত্যন্ত জরুরি। এই বিস্তারিত গাইডে থাকছে NID ও ৩০,০০০ টাকা জমা দিয়ে প্রাক-নিবন্ধন (Pre-Registration) ও PID সিরিয়াল ট্র্যাকিং, সরকারি বনাম অনুমোদিত বেসরকারি এজেন্সি প্যাকেজের পার্থক্য (মিনা ও আরাফাতের Maktab A, B ও D তাঁবু), Shifting বনাম Non-Shifting প্যাকেজ এবং এজেন্সি লাইসেন্স যাচাই করার নিয়ম।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৮ মিনিট পড়া",
    content: `বাংলাদেশ থেকে ফরজ হজ পালনের জন্য জনপ্রতি সাধারণত ৫,২০,০০০ টাকা থেকে ৯,৫০,০০০+ টাকা পর্যন্ত খরচ হয়। তাই যেকোনো এজেন্সিতে টাকা জমা দেওয়ার আগে সরকারি ডিজিটাল ই-হজ সিস্টেম (hajj.gov.bd) এবং প্যাকেজের খুঁটিনাটি বুঝে নেওয়া প্রত্যেক হজযাত্রীর জন্য অপরিহার্য।

১. ধাপে ধাপে সরকারি ২-স্তরের HAJJ নিবন্ধন প্রক্রিয়া (HAJJ.GOV.BD)
বাংলাদেশ থেকে সরকারি বা বেসরকারি—উভয় ব্যবস্থাপনায় হজে যেতে হলে ধর্ম বিষয়ক মন্ত্রণালয়ের পোর্টালের মাধ্যমে ২টি ধাপ সম্পন্ন করতে হয়:
- **ধাপ ১ — প্রাক-নিবন্ধন (Pre-Registration / প্রাক-নিবন্ধন):** আপনার জাতীয় পরিচয়পত্র (NID), ই-পাসপোর্ট এবং সচল মোবাইল নাম্বার নিয়ে নির্ধারিত ব্যাংক (সোনালী ব্যাংক, ইসলামী ব্যাংক, আল-আরাফাহ ইসলামী ব্যাংক ইত্যাদি) অথবা মন্ত্রণালয় অনুমোদিত হজ এজেন্সির মাধ্যমে সরকারি নির্ধারিত ফি (আনুমানিক **BDT 30,000**) জমা দিয়ে আপনার **Tracking Number / N-Serial** সংগ্রহ করুন।
- **ধাপ ২ — চূড়ান্ত নিবন্ধন (Final Registration):** প্রতি বছর সৌদি কোটা অনুযায়ী আপনার সিরিয়াল নম্বর ডাক পেলে প্যাকেজের বাকি টাকা ব্যাংকের মাধ্যমে জমা দিয়ে অফিশিয়াল **Pilgrim ID (PID)** এবং **Nusuk Hajj Smart Card** নিশ্চিত করতে হয়।
- **দালাল থেকে সাবধান (অনলাইন যাচাই):** কখনো কোনো মধ্যস্বত্বভোগী বা সাব-এজেন্টের মুখের কথায় বিশ্বাস করবেন না! টাকা জমার পর সরাসরি **hajj.gov.bd** ওয়েবসাইটে গিয়ে "হজযাত্রী অনুসন্ধান" বক্সে আপনার ট্র্যাকিং নম্বর দিয়ে দেখে নিন আপনার নাম ও এজেন্সির লাইসেন্স নম্বর সরকারি সার্ভারে এন্ট্রি হয়েছে কি না।

২. সরকারি হজ প্যাকেজ বনাম বেসরকারি এজেন্সি প্যাকেজ
- **সরকারি হজ প্যাকেজ (সাধারণ ও বিশেষ):** সরাসরি ধর্ম মন্ত্রণালয় ও আশকোনা হজ ক্যাম্পের তত্ত্বাবধানে পরিচালিত। বিমানের নিশ্চিত সিডিউল, স্বচ্ছ খরচ (**BDT 5,20,000 – BDT 6,00,000**) এবং সরকারি মেডিকেল টিমের সেবা পাওয়া যায়।
- **বেসরকারি অনুমোদিত এজেন্সি প্যাকেজ (ইকোনমি, ক্লাসিক ও VIP ৫-তারকা):** যারা পরিবারের জন্য হারাম শরীফের একদম কাছে (Jabal Omar বা Clock Tower) আলাদা ২ বা ৩ বেডের রুম চান, অথবা ১৪–২১ দিনের **Short Hajj Package** এবং মিনায় জামারাতের কাছে **Maktab A/B** ভিআইপি এসি তাঁবু চান, তাদের জন্য ভালো লাইসেন্সপ্রাপ্ত বেসরকারি এজেন্সি সুবিধাজনক।

৩. SHIFTING বনাম NON-SHIFTING হজ প্যাকেজের পার্থক্য কী?
- **Shifting প্যাকেজ (৮০ হাজার – ১.৪ লক্ষ টাকা সাশ্রয়ী):** হজের মূল ৫ দিনের (৮–১২ জিলহজ) আগে বা পরে আপনাকে মক্কার হারাম সংলগ্ন হোটেল থেকে সরিয়ে মিনা ও জামারাতের কাছাকাছি **Aziziya** এলাকার অ্যাপার্টমেন্টে নেওয়া হয়। এতে হজের দিনগুলোতে পায়ে হেঁটে সহজেই জামারাতে কঙ্কর নিক্ষেপ করা যায় এবং প্যাকেজের খরচ অনেক কম পড়ে।
- **Non-Shifting প্যাকেজ:** পুরো সফরে মক্কার হারাম শরীফের সামনের একই হোটেলে আপনার রুম বহাল থাকে, কোনো লাগেজ শিফট করতে হয় না।

৪. মিনা ও আরাফাতের তাঁবু ক্যাটাগরি (MAKTAB A, B, C ও D)
- **Maktab D (সাধারণ দক্ষিণ এশীয় জোন / মুয়াইসিম):** জামারাত থেকে ২.৫ – ৪ কিমি দূরে অবস্থিত, সোফা-কাম-বেড ও এয়ার কুলার/এসি সুবিধা থাকে।
- **Maktab A ও B (ভিআইপি জোন / কিদানা টাওয়ার):** জামারাতের একদম সন্নিকটে (৩০০–৮০০ মিটার), উন্নত স্প্লিট এসি, ৩ বেলা বুফে খাবার এবং পর্যাপ্ত ওয়াশরুম সুবিধা থাকে।`,
    internalLinks: [
      { text: "সম্পূর্ণ DIY Umrah ও Nusuk App গাইড (2026)", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "বয়স্ক বাবা-মাকে নিয়ে Umrah: হুইলচেয়ার ও মেডিকেল গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "Makkah ও Madinah হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "মিনা ও আরাফাতের ভিড়ে পরিবারের সাথে যুক্ত থাকুন",
      body: "ঢাকা ছাড়ার আগেই ফোনে Saudi Arabia 5G eSIM ইনস্টল করে নিন—যাতে হজের ৫ দিন মিনা, আরাফাত ও মুজদালিফায় WhatsApp লাইভ লোকেশন ও Nusuk Smart Card সচল থাকে।",
    },
  },

  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    title: "বয়স্ক বাবা-মাকে নিয়ে বাংলাদেশ থেকে Umrah গাইড: হুইলচেয়ার বুকিং, সমতল হোটেল ও মেডিকেল চেকলিস্ট",
    summary:
      "বয়স্ক মা-বাবাকে সাথে নিয়ে পবিত্র মক্কা ও মদিনায় Umrah পালন করা প্রতিটি সন্তানের স্বপ্ন। কিন্তু হারাম শরীফের মার্বেল চত্বরে প্রতিদিন ৬–৮ কিলোমিটার হাঁটা বা আজইয়াদের খাড়া পাহাড়ি রাস্তা বেয়ে ওঠা ডায়াবেটিস, হাঁটুর ব্যথা বা উচ্চ রক্তচাপে আক্রান্ত বয়স্কদের জন্য অত্যন্ত কষ্টকর হতে পারে। এই গাইডে জানুন কীভাবে ঢাকা ও জেদ্দা এয়ারপোর্টে ফ্রি হুইলচেয়ার (WCHR) বুক করবেন, হারাম শরীফের ছাদে অফিশিয়াল ইলেকট্রিক স্কুটার (SAR 115) নেবেন, ঢালবিহীন সমতল রাস্তার হোটেল চিনবেন এবং দেশ থেকে কী কী ওষুধ সাথে নেবেন।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `বয়স্ক বাবা-মাকে নিয়ে ওমরাহ পালনের সময় সামান্য কিছু পূর্বপ্রস্তুতি নিলে আপনার মা-বাবার কোনো শারীরিক কষ্ট ছাড়াই অত্যন্ত প্রশান্তির সাথে তাওয়াফ, সাঈ এবং মসজিদে নববীর জিয়ারত সম্পন্ন করা সম্ভব।

১. ঢাকা এয়ারপোর্ট থেকেই ফ্রি হুইলচেয়ার (WCHR) ও দেশ থেকে ফোল্ডিং হুইলচেয়ার নেওয়া
- **এয়ারলাইন্সে ফ্রি WCHR সার্ভিস:** ফ্লাইটের অন্তত ৪৮ ঘণ্টা আগে Biman, Saudia বা আপনার এয়ারলাইন্সের "Manage Booking"-এ গিয়ে অথবা আমাদের BDT বুকিং ডেস্কের সহায়তায় বাবা-মায়ের টিকিটে **SSR WCHR (Wheelchair Assistance)** যুক্ত করে নিন। এটি সম্পূর্ণ ফ্রি এবং ঢাকা এয়ারপোর্টে চেক-ইন থেকে শুরু করে জেদ্দা বা মদিনা এয়ারপোর্টের ইমিগ্রেশন পর্যন্ত স্টাফরা হুইলচেয়ারে পৌঁছে দেবেন।
- **ঢাকা থেকে ফোল্ডিং হুইলচেয়ার কেনা (সবচেয়ে বুদ্ধিমানের কাজ!):** শাহবাগ বিএমএ মার্কেট থেকে **BDT 7,500 – BDT 11,000** দিয়ে একটি হালকা ওজনের ফোল্ডিং হুইলচেয়ার কিনে সাথে নিয়ে যান। সব এয়ারলাইন্সে রোগীর হুইলচেয়ার ৩০–৪৬ কেজি নিয়মিত লাগেজের বাইরে **সম্পূর্ণ বিনামূল্যে** বহন করা যায় এবং মক্কা-মদিনায় প্রতি ওয়াক্ত নামাজে হোটেলের লিফট থেকেই বাবা-মাকে বসিয়ে হারাম শরীফে নিয়ে যেতে পারবেন!

২. হারাম শরীফে তাওয়াফ ও সাঈ করার ৩টি হুইলচেয়ার ও ইলেকট্রিক স্কুটার অপশন
- **অপশন A — নিজের হুইলচেয়ারে সন্তান নিজেই ঠেলবেন (সম্পূর্ণ ফ্রি):** হারাম শরীফের দোতলায় (First Floor Wheelchair Mataf Bridge) এবং সাফা-মারওয়ার হুইলচেয়ার লেনে পরিবারের সদস্যরা নিজেরাই বাবা-মাকে হুইলচেয়ারে বসিয়ে তাওয়াফ ও সাঈ করাতে পারেন।
- **অপশন B — অফিশিয়াল ইলেকট্রিক গলফ স্কুটার (Tanaqol / Nusuk):** কিং আব্দুল আজিজ গেট বা আজইয়াদ ব্রিজের এস্কেলেটর/লিফট দিয়ে ছাদের (Mezzanine/Roof) লেভেলে গিয়ে অফিশিয়াল ১-সিট বা ২-সিটের ইলেকট্রিক স্কুটার ভাড়া করা যায়:
  • শুধু তাওয়াফ: **SAR 57.50 (~BDT 1,900)**
  • শুধু সাঈ: **SAR 57.50 (~BDT 1,900)**
  • সম্পূর্ণ ওমরাহ (তাওয়াফ + সাঈ): ১ সিট **SAR 115 (~BDT 3,800)** এবং ২ সিট **SAR 230** (যেখানে আপনি বাবা বা মায়ের পাশে বসে লিভার চেপে নিজেই স্কুটার চালাতে পারবেন—কোনো শারীরিক শক্তির প্রয়োজন নেই!)।
- **অপশন C — অফিশিয়াল লাইসেন্সধারী হুইলচেয়ার পুশার:** শুধুমাত্র হারামের ভেতরে অফিশিয়াল নাম্বারযুক্ত ভেস্ট পরিহিত অনুমোদিত কর্মীদের কাছ থেকেই সেবা নিন (**SAR 150 – 250**)। গেটের বাইরের অপরিচিত দালালদের এড়িয়ে চলুন।

৩. হাঁটুর ব্যথা থাকলে মক্কা ও মদিনার কোন হোটেলে থাকবেন?
- **মক্কায়:** অবশ্যই **Jabal Omar**, **Clock Tower (Swissôtel Al Maqam / Fairmont)** অথবা **Ibrahim Al Khalil Road**-এর প্রথম ৩০০ মিটারের সমতল রাস্তার হোটেল বুক করুন। ভুল করেও Upper Ajyad বা Jabal Kaaba-র খাড়া পাহাড়ি ঢালের হোটেলে বয়স্কদের রাখবেন না।
- **মদিনায়:** মা বা বয়স্ক নারী সদস্যদের জন্য **Markazia North (Gate 25–29 সংলগ্ন)** হোটেল নিন—মাত্র ৩ মিনিটে সমতল ছায়াযুক্ত পথে মসজিদে প্রবেশ করা যায়।

৪. বাংলাদেশ থেকে জরুরি ওষুধ ও প্রেসক্রিপশন চেকলিস্ট
- ব্লাড প্রেশার, ডায়াবেটিস (ইনসুলিন নিলে কুলিং পাউচ হ্যান্ডব্যাগে রাখুন), গ্যাস্ট্রিক ও হার্টের ১৫ দিনের পর্যাপ্ত ওষুধ এবং অবশ্যই **ইংরেজিতে লেখা ডাক্তারের প্রেসক্রিপশন** সাথে রাখুন।
- হারাম শরীফের ভেতরে এসি ২০ ডিগ্রি সেলসিয়াসে থাকে, তাই বাবা-মায়ের জন্য পাতলা চাদর, ওরস্যালাইন (ORS), সুগন্ধিহীন ভ্যাসলিন এবং নরম ভেলক্রো স্যান্ডেল সাথে নিন।`,
    internalLinks: [
      { text: "Makkah ও Madinah হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "সম্পূর্ণ DIY Umrah ও Nusuk App গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "ঢাকা এয়ারপোর্ট প্রি-ডিপার্চার ও লাগেজ নিয়ম", path: "/pre-departure" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "জেদ্দা এয়ারপোর্ট থেকে হোটেল পর্যন্ত প্রাইভেট ফ্যামিলি ভ্যান বুক করুন",
      body: "বয়স্ক বাবা-মা ও হুইলচেয়ার সাথে থাকলে ট্যাক্সির লাইনে দাঁড়িয়ে কষ্ট না করে আগেভাগেই ৭-সিটের প্রাইভেট মিনিভ্যান বুক করে রাখুন।",
    },
  },

  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    title: "বাংলাদেশিদের জন্য ৯৬ ঘণ্টার Saudi Stopover Visa (2026): Saudia ও Flynas ট্রানজিট ফ্লাইটে ৪ দিনের ওমরাহ গাইড",
    summary:
      "লন্ডন, নিউ ইয়র্ক, টরন্টো, ইউরোপ, ইস্তাম্বুল বা দুবাইগামী বাংলাদেশি যাত্রীরা Saudia (Saudi Arabian Airlines) বা flynas-এর যোগ্য ট্রানজিট ইটিনারারিতে টিকিট কাটার সময় ৯৬ ঘণ্টার (৪ দিনের) Saudi Stopover Visa নিতে পারেন—আগে US/UK/Schengen ভিসা ব্যবহার করা লাগে না। তবে সরকারি কোনো নির্দিষ্ট ফি বা ফ্রি হোটেল সুবিধা প্রকাশিত নেই: ভিসা, ইনস্যুরেন্স ও সার্ভিস চার্জ checkout-এ নির্ধারিত হয়, তাই নিজের বুকিংয়ের অঙ্কই আসল খরচ। এই গাইডে বুকিং ধাপ, ভিসা ও permit-এর সীমানা, US/UK/Schengen ভিসাধারীদের শর্তসাপেক্ষ eVisa/VOA পথ এবং ৪ দিনের মক্কা–মদিনা পরিকল্পনা—১৫ অক্টোবর ২০২৬ তারিখে অফিশিয়াল সূত্র দেখে।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `প্রবাসী বাংলাদেশি (NRB), উচ্চশিক্ষার শিক্ষার্থী, ব্যবসায়ী এবং যারা ঢাকা থেকে যুক্তরাজ্য, আমেরিকা, কানাডা, ইউরোপ, তুরস্ক বা মধ্যপ্রাচ্যে যাতায়াত করেন—তাদের জন্য **৯৬ ঘণ্টার Saudi Stopover Visa** দীর্ঘ যাত্রাবিরতিকে ৪ দিনের ওমরাহ ভ্রমণে বদলে দিতে পারে, আলাদা ভিসা আবেদন ছাড়াই। অফিশিয়াল Visit Saudi ও Saudia stopover পেজ দেখে এই গাইডটি ১৫ অক্টোবর ২০২৬ তারিখে হালনাগাদ করা হয়েছে। মন্ত্রণালয় বা এয়ারলাইন্স—কারোর কাছেই দুটি জিনিস প্রকাশিত নেই: নির্দিষ্ট stopover ফি এবং সার্বজনীন ফ্রি হোটেল সুবিধা। ভিসা, ইনস্যুরেন্স ও সার্ভিস চার্জ আপনার এয়ারলাইন্স checkout-এর line item, এবং এগুলো বদলায়। কোনো বর্তমান সরকারি সংখ্যা না পাওয়া গেলে এই পাতা সেটাই লেখে, সংখ্যা বানায় না। আলাদা ট্রিপের সঙ্গে তুলনা করলে আমাদের মূল DIY গাইডের একটি তারিখসহ planning estimate ধরে রাখুন—১০ দিন, চারজনের পরিবারের শেয়ারে জনপ্রতি BDT 1,16,000–1,32,000 (১৪ অক্টোবর ২০২৬ check করা; লাইভ কোটেশন নয়)—কোনো "সাশ্রয়" দাবি নয়।

১. ৯৬ ঘণ্টার SAUDI STOPOVER VISA আসলে কী দেয়
Visit Saudi বলছে, জাতীয় বাহকদের যোগ্য itinerary বুক করলে সৌদি আরবের মধ্য দিয়ে ট্রানজিট করা যাত্রীরা সর্বোচ্চ ৯৬ ঘণ্টার জন্য দেশে প্রবেশ করতে পারবেন—ওমরাহও এর অন্তর্ভুক্ত [১]।
- **যোগ্য এয়ারলাইন্স:** Saudia (Saudi Arabian Airlines) ও flynas, একটি মাত্র ticketed itinerary-এর ভেতরে সৌদি সংযোগ থাকলে। এটি আপনার বুকিংয়ের ভেতরের stopover—আলাদাভাবে কেনা দুই leg-এ যুক্ত করার মতো ভিসা নয় [১-৩]।
- **আগের ভিসার শর্ত:** tourist eVisa-র কথা আলাদা—stopover route-এ আগে ব্যবহৃত US/UK/Schengen ভিসা লাগবে না। তবে যোগ্যতা নির্ধারণ করছে আপনার itinerary ও এয়ারলাইন্সের বর্তমান নিয়ম; বাংলাদেশি পাসপোর্টের জন্য কোনো সার্বজনীন entitlement প্রকাশিত নেই। Saudia-র নিজের help flow "দেশ যোগ্য না হলে" পরিস্থিতির কথাও বলে, তাই পেমেন্টের আগে আপনার বুকিংয়ে stopover option আসছে কি না নিশ্চিত হন [১-২]।
- **মেয়াদ ও অবস্থানকাল:** ইস্যুর দিন থেকে ৯০ দিন (৩ মাস) মেয়াদ, একক প্রবেশ (single entry), সর্বোচ্চ ৯৬ ঘণ্টা (৪ দিন) মক্কা, মদিনা বা যেকোনো শহরে অবস্থান। ভিসা extend করা যায় না এবং প্রতি বুকিংয়ে একটি মাত্র stopover যাত্রা [১-২]।
- **আপনি যা দেবেন:** কোনো নির্দিষ্ট ফি প্রকাশিত নেই। ১৫ অক্টোবর ২০২৬ check-এ Visit Saudi-তে Saudia অফারে দেখানো ছিল—ভিসা ফি ফ্রি, application fee প্রায় SAR 39.50 (USD 10.50) এবং medical insurance SAR 13 থেকে [১]। Saudia স্পষ্ট করে বলছে, ভিসা ফি, সার্ভিস চার্জ, মেডিকেল ফি ও ইনস্যুরেন্স খরচ বুকিংয়ের সময় Ministry of Foreign Affairs-এর বিধি অনুযায়ী হিসাব হয় [২]। এগুলো এক বাহকের checkout line item—সব এয়ারলাইন্স, রুট বা যাত্রীর নিশ্চিত মোট খরচ নয়, এবং flynas-এর দামও নয়। আমরা কোনো BDT অঙ্ক প্রকাশ করছি না: তারিখভিত্তিক বিনিময় হার ছাড়া SAR line item-কে টাকায় রূপান্তর করলে এমন দাম তৈরি হয় যা কোনো সরকারি সূত্রে নেই।
- **হোটেল অন্তর্ভুক্ত নয়:** ফ্রি রাতের হিসাবে বাজেট বানাবেন না। Visit Saudi-র stopover পেজে বর্তমানে কোনো হোটেল সুবিধার উল্লেখ নেই, আর Saudia হোটেল বুকিংকে "শুধু round-trip বুকিং ও নির্দিষ্ট কয়েকটি destination-এর জন্য" একটি optional add-on হিসেবে দেখায় [১-২]। এক রাতের কমপ্লিমেন্টারি হোটেল ২০২৩ সালের চালুর সময়ের একটি Saudia Holidays প্রমোশন ছিল, নির্দিষ্ট itinerary ও নির্দিষ্ট শহরে (মক্কা কখনোই নয়) সীমিত এবং availability-এর শর্তসাপেক্ষ—এই জাতীয় প্রমোশন বিনা নোটিশে তুলে নেওয়া হয়। মক্কা ও মদিনার রাত নিজে বুক করে খরচ ধরুন।
- **ভিসা permit নয়:** Visit Saudi অনুযায়ী মক্কা বা মদিনায় যাওয়ার আগে ধর্মীয় যাত্রীদের Nusuk.sa-এ Umrah বা Ziyarah appointment নিতে হবে [১,৪]। Stopover, tourist বা Umrah visa—কোনোটাই Hajj permit নয়।
- **প্রবেশের শর্ত:** কমপক্ষে ৬ মাস মেয়াদি পাসপোর্ট, চূড়ান্ত গন্তব্যের confirmed onward ticket, এবং (অব্যাহতি না থাকলে) সেই দেশের বৈধ entry visa বা residence permit। ভিসা ইস্যু হলেই প্রবেশ নিশ্চিত নয়—এয়ারপোর্টে passport control চূড়ান্ত সিদ্ধান্ত দেয় [২]।

২. টিকিট বুক করার সময় ধাপে ধাপে আবেদন
Saudia-র প্রকাশিত flow সবচেয়ে স্পষ্ট; flynas-এর বুকিং ইঞ্জিনেও মিল থাকা stopover ধাপ আছে—প্রতিটি স্ক্রিন নিজের বুকিংয়ে মিলিয়ে নিন [২-৩]।
১. Jeddah (JED) বা Riyadh (RUH) সংযোগসহ আন্তর্জাতিক রুট সার্চ করুন, যাত্রাবিরতি সর্বোচ্চ ৯৬ ঘণ্টা (যেমন ঢাকা DAC → লন্ডন LHR বা ঢাকা DAC → ইস্তাম্বুল IST)।
২. একই বুকিংয়ে stopover শহর এবং যাওয়ার বা ফেরার পথে কত ঘণ্টা থাকবেন (সর্বোচ্চ ৯৬ ঘণ্টা) তা বেছে নিন।
৩. Checkout-এর extras/additional-services ধাপে Stopover Transit Visa-র জন্য আবেদন করুন এবং ফরমের চাওয়া পাসপোর্ট ছবিটি আগেই তৈরি রাখুন (Saudia 200 × 200 px, সর্বোচ্চ 20 KB উল্লেখ করে) [২]।
৪. টিকিট ও ভিসা একটিই লেনদেনে পেমেন্ট করুন। ওই পেজে line item হিসেবে যে SAR অঙ্ক দেখা যায়, চার্জও ঠিক তাই—অনলাইনে শোনা কোনো সংখ্যা নয়।
৫. ইমেইলে আসা ভিসা ও ইনস্যুরেন্সের কাগজপত্র রাখুন এবং উড়ার আগে Saudi Unified Visa Platform-এ ইস্যু হওয়া ভিসা যাচাই করুন [২,৫]।
প্রসেসিং সময়ের কোনো গ্যারান্টি প্রকাশিত নেই। সাধারণত পেমেন্ট সম্পূর্ণ হলে ভিসা ইস্যু হয় এবং এটি বুকিংয়ের সময়ই নিতে হয়, পরে যোগ করা যায় না—তাই stopover-এর সিদ্ধান্ত শেষ মুহূর্তে ফেলবেন না।

৩. ইতিমধ্যে ব্যবহৃত US, UK বা SCHENGEN ভিসা থাকলে
USA, UK বা কোনো Schengen দেশের বৈধ ও অন্তত একবার ব্যবহৃত tourist/business ভিসা (বা সেসব দেশের স্থায়ী রেসিডেন্সি) আলাদা একটা পথ—এটি শর্তসাপেক্ষ, স্বয়ংক্রিয় নয়। সাধারণ বাংলাদেশি পাসপোর্ট nationality-only tourist eVisa তালিকায় নেই, তাই ১ বছরের multiple-entry eVisa আপনার নামে অনিবার্যভাবে ইস্যু হবে ধরে বুকবেন না [৬]। অফিশিয়াল পোর্টালে বর্তমান শর্ত দেখে নিন: বৈধ ও আগে ব্যবহৃত US/UK/Schengen ভিসাধারীরা প্রকাশিত air-arrival ও carrier শর্ত পূরণ করলে visa-on-arrival-এর যোগ্য হতে পারেন [৬-৭]। খরচ হলো পোর্টাল বা arrival counter-এ যা দেখানো হয়—সরকারি ভিসা ফি, বাধ্যতামূলক medical insurance, আর শুধু অনলাইন আবেদনের ক্ষেত্রে platform charge; তাই রূপান্তর করা সংখ্যা দেখে বাজেট না বেঁধে অফিশিয়াল পেজের SAR মোট দেখুন। Tourist ভিসাও Nusuk-এর Umrah appointment-এর বিকল্প নয় [৪]।

৪. ৯৬ ঘণ্টার (৪ দিনের) বাস্তবসম্মত মক্কা ও মদিনা পরিকল্পনা
সময় স্থির: সর্বোচ্চ ৯৬ ঘণ্টা, extend করা যাবে না [২]। পরিকল্পনা উল্টো দিক থেকে শুরু করুন—আগে onward ফ্লাইট ঠিক রাখুন।
- **১ম দিন—জেদ্দা থেকে মক্কা:** King Abdulaziz International (JED)-এ নামুন, ইমিগ্রেশন শেষ করে Haramain High Speed Rail স্টেশনে গিয়ে মক্কায় চলুন। ১৪ অক্টোবর ২০২৬ check-এ operator-এর ট্যারিফে KAIA–Makkah সেগমেন্টের base Economy ফি SAR 65 দেখানো ছিল (VAT ও অন্যান্য ফি বাদে); লাইভ checkout-এ তারিখ ও ট্রাভেল ক্লাস অনুযায়ী দাম বদলায় [৮]। টার্মিনাল থেকে স্টেশন ও লাগেজের সময় ধরে রাখুন, হোটেলে উঠুন, এবং বুক করা Nusuk slot-এ ওমরাহ সম্পন্ন করুন।
- **২য় দিন—মক্কা:** মসজিদুল হারামে ৫ ওয়াক্ত নামাজ এবং অর্ধ-দিবসের জিয়ারত (জাবালে নূর, মিনা, আরাফাত)। ট্যাক্সি বা ট্যুরের দাম বুকিংয়ের সময়ই ঠিক করুন, পৌঁছে নয়।
- **৩য় দিন—মক্কা থেকে মদিনা:** Haramain ট্রেনে প্রকাশিত সময়সূচি অনুযায়ী আনুমানিক ২ ঘণ্টা ১৫ মিনিট; একই ১৪ অক্টোবর ২০২৬ check-এ Makkah–Madinah-এর base Economy ফি SAR 162 (VAT ও ফি বাদে) দেখানো ছিল—দুটোই নির্দেশক, operator সাইটে মিলিয়ে নিন [৮]। মদিনায় আগে থেকে বুক করা Rawdah appointment permit নিয়ে মসজিদে নববীতে নামাজ পড়ুন।
- **৪র্থ দিন—মদিনা, তারপর onward:** ফজরের পর মসজিদে কুবা, তারপর জেদ্দা ফিরে onward ফ্লাইটে উঠুন। মদিনা থেকেই উড়তে চাইলে সেই leg-টি একই ticketed itinerary-এ থাকতে হবে—প্রতি বুকিংয়ে একটিই stopover, তাই বুক করার সময়ই যাচাই করুন [২]।
হোটেলের হাঁটার পথ, গেট, শাটল, ঢাল-সিঁড়ি ও রুম ভাড়ার প্রশ্ন আমাদের Makkah ও Madinah হোটেল জোন গাইডে আছে; নির্দিষ্ট ঠিকানা ও যে গেটে যাবেন সেই রুট হোটেলে জিজ্ঞেস করে নিন—শুধু এলাকার নাম হাঁটার সময় প্রমাণ করে না।

৫. সচরাচর জিজ্ঞাসা
৯৬ ঘণ্টার Saudi stopover visa-র খরচ কত?
কোনো নির্দিষ্ট দাম প্রকাশিত নেই। বর্তমান Visit Saudi-র Saudia অফারে ভিসা ফি ফ্রি, application fee প্রায় SAR 39.50 এবং medical insurance SAR 13 থেকে দেখানো আছে; Saudia বলছে ভিসা, সার্ভিস, মেডিকেল ও ইনস্যুরেন্স খরচ বুকিংয়ের সময় MOFA বিধি অনুযায়ী হিসাব হয় [১-২]। আপনার নিজের checkout-এ যে অঙ্ক দেখাবে, সেটিই বাজেট। এই গাইড কোনো রূপান্তরিত BDT মোট প্রকাশ করছে না, কারণ তার পেছনে তারিখসহ হার নেই।
stopover ভিসায় কি ফ্রি হোটেল রাত পাওয়া যায়?
না—এমন ধরে হিসাব করবেন না। Visit Saudi-র stopover পেজে আজ কোনো হোটেল সুবিধার কথা নেই, আর Saudia হোটেলকে শুধু round-trip বুকিং ও নির্দিষ্ট কয়েকটি destination-এর জন্য optional add-on হিসেবে দেখায় [১-২]। যা ছিল তা Saudia Holidays-এর একটি airline promotion—নির্দিষ্ট itinerary ও শহরে, availability-এর শর্তে, এবং তা তুলে নেওয়া যেতে পারে। মক্কা ও মদিনার রাতের খরচ নিজে বহন করুন।
সকল বাংলাদেশি পাসপোর্টধারীর জন্য কি stopover visa উন্মুক্ত?
কোনো প্রকাশিত সার্বজনীন অধিকার হিসেবে নয়। এটি যোগ্য Saudia বা flynas itineraryধারীদের দেওয়া হয়, আর Saudia-র help পেজে "দেশ যোগ্য না হলে" পরিস্থিতিও রয়েছে [১-৩]। যা সত্যি তা হলো—stopover-এর আগে US/UK/Schengen ভিসা ব্যবহার করা লাগে না। পেমেন্টের আগে নিজের বুকিংয়ে optionটি আসছে কি না দেখে নিন।
যাত্রাবিরতিতে কি ওমরাহ করা যাবে?
হ্যাঁ, তবে শুধু ভিসাই যথেষ্ট নয়। Visit Saudi অনুযায়ী মক্কা বা মদিনায় যাওয়ার আগে Nusuk.sa-তে Umrah বা Ziyarah appointment নিতে হয়, তাই আগে permit slot বুক করুন এবং গেটে লাইভ QR হাতে রাখুন [১,৪]। stopover visa কখনো Hajj permit নয়, আর ফরজ Hajj-এর জন্য বাংলাদেশে আলাদা নিবন্ধন লাগে।
ভিসা কত দ্রুত ইস্যু হয়?
Saudia-র flow বলছে বুকিং ও ভিসা পেমেন্ট সম্পূর্ণ হলেই ইমেইলে ভিসা ও ইনস্যুরেন্সের কাগজপত্র আসে, এবং আবেদন বুকিংয়ের সময়ই করতে হয়। কোনো প্রসেসিং সময় প্রকাশিত বা গ্যারান্টিযুক্ত নয়—তাই শেষ মুহূর্তে বুকিং এড়িয়ে যান এবং ইস্যু হওয়া ভিসা Saudi Unified Visa Platform-এ মিলিয়ে নিন [২,৫]।
onward টিকিট ও গন্তব্যের ভিসা কি লাগবে?
হ্যাঁ। Saudia-র শর্ত—কমপক্ষে ৬ মাস মেয়াদি পাসপোর্ট, চূড়ান্ত গন্তব্যের confirmed onward ticket, এবং সেই দেশের বৈধ entry visa বা residence permit (অব্যাহতি থাকলে ছাড়া)। ভিসা ইস্যু হলেও সৌদি প্রবেশ এয়ারপোর্টের passport control-এর চূড়ান্ত অনুমোদনের ওপর নির্ভরশীল [২]।

`,
    references: [
      {
        name: "Visit Saudi — Stopover Transit Visa campaign page",
        nameBn: "Visit Saudi — Stopover Transit Visa ক্যাম্পেজ পেজ",
        url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
      },
      {
        name: "Saudia — Stopover Transit Visa: how to book, conditions and charges",
        nameBn: "Saudia — Stopover Transit Visa: বুকিং পদ্ধতি, শর্ত ও খরচ",
        url: "https://www.saudia.com/transit-visa",
      },
      {
        name: "flynas — official booking site (stopover option shown at checkout)",
        nameBn: "flynas — অফিশিয়াল বুকিং সাইট (checkout-এ stopover option দেখানো হয়)",
        url: "https://www.flynas.com/en",
      },
      {
        name: "Official Nusuk platform — Umrah and Rawdah appointments",
        nameBn: "অফিশিয়াল Nusuk platform — ওমরাহ ও Rawdah appointment",
        url: "https://www.nusuk.sa",
      },
      {
        name: "Saudi Unified Visa Platform — verify an issued visa",
        nameBn: "Saudi Unified Visa Platform — ইস্যু হওয়া ভিসা যাচাই",
        url: "https://ksavisa.sa",
      },
      {
        name: "Visit Saudi tourist eVisa portal — eligibility list and current terms",
        nameBn: "Visit Saudi tourist eVisa পোর্টাল — যোগ্যতার তালিকা ও বর্তমান শর্ত",
        url: "https://visa.visitsaudi.com/",
      },
      {
        name: "Visit Saudi help — visit visa with a used US, UK or Schengen visa",
        nameBn: "Visit Saudi help — আগে ব্যবহৃত US, UK বা Schengen ভিসা নিয়ে visit visa",
        url: "https://help.visitsaudi.com/hc/en-us/articles/360018933099-Can-I-get-a-visit-visa-if-I-have-a-valid-US-or-UK-or-Schengen-visa-",
      },
      {
        name: "Haramain High Speed Rail — fares and booking terms",
        nameBn: "Haramain High Speed Rail — ট্যারিফ ও বুকিং শর্ত",
        url: "https://sar.hhr.sa/travel/fares",
      },
    ],
    internalLinks: [
      { text: "সম্পূর্ণ DIY Umrah ও Nusuk App গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Nusuk অ্যাপ, Saudi Visa Bio ও Rawdah পারমিট গাইড", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Makkah ও Madinah হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "টিকিট কাটার জন্য Dual-Currency Card Endorsement গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "DIY Umrah পোর্টাল ও BDT ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "৪ দিনের স্টপওভারে সিমের লাইনে সময় নষ্ট করবেন না",
      body: "ঢাকা ছাড়ার আগেই ফোনে Saudi Arabia eSIM অ্যাক্টিভেট করে নিন—যাতে জেদ্দায় নামার সাথে সাথেই Haramain Train ও Nusuk অ্যাপ ব্যবহার করতে পারেন।",
    },
  },

  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    title: "Nusuk App ও Saudi Visa Bio ব্যবহারের সম্পূর্ণ বাংলা গাইড (2026): রিয়াজুল জান্নাত (Rawdah) পারমিট, বায়োমেট্রিক ও অফিশিয়াল ধাপ",
    summary:
      "ওমরাহ পরিকল্পনায় বাংলাদেশি যাত্রীদের দুটি অফিশিয়াল সৌদি অ্যাপ প্রস্তুত রাখা উচিত: মক্কায় ওমরাহ স্লট এবং মদিনায় রিয়াজুল জান্নাত (Rawdah Shareef)-এর বাধ্যতামূলক অ্যাপয়েন্টমেন্ট পারমিটের জন্য Nusuk অ্যাপ (nusuk.sa), এবং বর্তমান সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের FAQ অনুযায়ী ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah visa-র biometric enrollment-এর জন্য Saudi Visa Bio অ্যাপ। এই গাইডে জানুন ১০ সংখ্যার ভিসা নম্বর দিয়ে Nusuk-এ রেজিস্ট্রেশন, ঢাকায় বায়োমেট্রিকের ব্যবহারিক ধাপ, এবং নির্দিষ্ট সাপ্তাহিক রিলিজ ধরে না নিয়ে লাইভ অ্যাভেইলেবিলিটি চেক করে ফ্রি Rawdah পারমিট বুক করার নিয়ম। তথ্যসূত্র যাচাই: ১৪ অক্টোবর ২০২৬।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    references: [
      {
        name: "Saudi Ministry of Hajj and Umrah — FAQ (biometric enrollment for Umrah visas)",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — FAQ (Umrah visa-এর biometric enrollment)",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Saudi Visa Bio app listing (Saudi Ministry of Foreign Affairs)",
        nameBn: "Saudi Visa Bio অ্যাপের listing (Saudi Ministry of Foreign Affairs)",
        url: "https://play.google.com/store/apps/details?id=sa.gov.mofa.saudivisabio",
      },
      {
        name: "Saudi Ministry — Umrah Permit Application",
        nameBn: "সৌদি মন্ত্রণালয় — Umrah Permit আবেদন",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "Saudi Ministry — permit to visit Al-Rawdah Al-Sharifiyah",
        nameBn: "সৌদি মন্ত্রণালয় — Al-Rawdah Al-Sharifiyah জিয়ারতের permit",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Nusuk Umrah — registration",
        nameBn: "Nusuk Umrah — নিবন্ধন পেজ",
        url: "https://umrah.nusuk.sa/registration/signup",
      },
      {
        name: "Nusuk Umrah — Terms of Use",
        nameBn: "Nusuk Umrah — ব্যবহারের শর্ত",
        url: "https://umrah.nusuk.sa/TermsOfUse",
      },
      {
        name: "Saudi Ministry of Hajj and Umrah — Nusuk Umrah launch for overseas pilgrims",
        nameBn: "সৌদি হজ ও Umrah মন্ত্রণালয় — বিদেশি যাত্রীদের জন্য Nusuk Umrah সেবা চালুর ঘোষণা",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-launches-Nusuk-Umrah-service-to-enable-pilgrims-from-outside-the-Kingdom",
      },
      {
        name: "Saudi Unified Visa Platform",
        nameBn: "সৌদি Unified Visa Platform",
        url: "https://ksavisa.sa",
      },
      {
        name: "Bangladesh Haj Management Portal",
        nameBn: "বাংলাদেশ Haj Management Portal",
        url: "https://www.hajj.gov.bd/",
      },
      {
        name: "Official Nusuk platform",
        nameBn: "অফিশিয়াল Nusuk platform",
        url: "https://www.nusuk.sa",
      },
    ],
    content: `ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে জেদ্দা বা মদিনার ফ্লাইটে ওঠার আগেই আপনার প্রয়োজনীয় অফিশিয়াল সৌদি অ্যাপগুলো প্রস্তুত রাখুন: মক্কায় ওমরাহ স্লট এবং মদিনায় রিয়াজুল জান্নাত (Rawdah Shareef)-এর বাধ্যতামূলক অ্যাপয়েন্টমেন্ট পারমিটের জন্য Nusuk অ্যাপ (nusuk.sa)। Saudi Visa Bio অ্যাপ বর্তমান সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের FAQ-এ বাংলাদেশের জন্য ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah visa-র biometric enrollment-এর তালিকাভুক্ত; এটি প্রত্যেক ট্যুরিস্ট বা স্টপওভার যাত্রীর জন্য সার্বজনীন বাধ্যবাধকতা নয়। মসজিদে নববীর গেটে স্ক্রিনশট গ্রহণ করা হয় না—সরাসরি **Nusuk (nusuk.sa)** অ্যাপের লাইভ QR কোড স্ক্যান করা হয়।

এই গাইড ১৪ অক্টোবর ২০২৬-এ অফিশিয়াল সৌদি মন্ত্রণালয় ও Nusuk সূত্রের বিপরীতে যাচাই করা হয়েছে। visa, permit, অ্যাপ ও availability-র শর্ত বদলাতে পারে; যাত্রার আগে বর্তমান অফিশিয়াল পেজ অনুসরণ করুন।

১. ২০২৬ সালে ওমরাহর জন্য অফিশিয়াল সরকারি অ্যাপ ও সূত্র কী কী?
সৌদি হজ ও ওমরাহ মন্ত্রণালয় (**haj.gov.sa**) এবং বাংলাদেশ ধর্ম বিষয়ক মন্ত্রণালয়ের (**hajj.gov.bd**) নির্দেশনা অনুযায়ী:
- **Official Nusuk App (nusuk.sa):** পবিত্র মক্কায় ওমরাহ পারমিট এবং মদিনায় মহানবী (সা.)-এর রওজা মোবারক সংলগ্ন **রিয়াজুল জান্নাতে (Rawdah Shareef)** নামাজ পড়ার বাধ্যতামূলক অ্যাপয়েন্টমেন্ট বুক করার একক সরকারি মাধ্যম।
- **Saudi Visa Bio App (MOFA):** বর্তমান Ministry FAQ অনুযায়ী বাংলাদেশের জন্য ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah visa-র biometric enrollment-এর তালিকাভুক্ত। আপনার বর্তমান অফিশিয়াল visa application ও অ্যাপের নির্দেশনা অনুসরণ করুন; এটি প্রত্যেক ট্যুরিস্ট বা স্টপওভার visa-র জন্য প্রযোজ্য বলে ধরে নেবেন না [১-২]।
- **রাখতে হবে এমন অফিশিয়াল পোর্টাল:** Nusuk নিবন্ধন ও Terms of Use, মন্ত্রণালয়ের Umrah Permit ও Rawdah Permit সার্ভিস পেজ, Saudi Unified Visa Platform (ksavisa.sa), এবং ফরজ হজের জন্য Bangladesh Haj Management Portal (hajj.gov.bd) [৩-১০]।

২. বাংলাদেশে বসে SAUDI VISA BIO অ্যাপে বায়োমেট্রিক তথ্য দেওয়ার ধাপ কী?
শুধুমাত্র তখনই ব্যবহার করুন যখন আপনার বর্তমান অফিশিয়াল Umrah visa-র নির্দেশনায় তা চাওয়া হয়। বয়স্ক মা-বাবার হাতের রেখা হালকা হয়ে গেলে ফোনের ক্যামেরায় অনেক সময় ছাপ নিতে চায় না। নিচের ধাপগুলো অনুসরণ করুন:
ধাপ ১: দিনের আলোতে পাসপোর্ট স্ক্যান করুন:
- জানালার পাশে দাঁড়িয়ে দিনের স্বাভাবিক আলোতে পাসপোর্টের তথ্য পাতা (Bio-Page) স্ক্যান করুন, যাতে পাতার ওপর ঘরের লাইটের প্রতিফলন (Glare) না পড়ে।
ধাপ ২: সাদা কাগজের ওপর হাত রেখে আঙুলের ছাপ দিন:
- টেবিলের ওপর একটি পরিষ্কার সাদা A4 কাগজ রেখে তার ওপর ৪টি আঙুল একসাথে মেলে ধরুন—এতে ক্যামেরা খুব দ্রুত ফোকাস করতে পারে।
ধাপ ৩: বয়স্কদের হাতের রেখা অস্পষ্ট হলে করণীয়:
- আঙুলের ছাপ নেওয়ার ১০ মিনিট আগে হালকা ভেজা কাপড় দিয়ে আঙুল মুছে সামান্য লোশন বা ভ্যাসলিন মেখে টিস্যু দিয়ে মুছে নিন; এতে আঙুলের রেখা স্পষ্ট ফুটে ওঠে।

৩. ভিসা পাওয়ার পর NUSUK অ্যাপে একাউন্ট খোলার নিয়ম কী?
ধাপ ১: আপনার ১০ সংখ্যার Saudi Visa Number খুঁজে বের করুন:
- আপনার অনুমোদিত PDF ই-ভিসার (**ksavisa.sa**) উপরের ডান দিকে থাকা ১০ সংখ্যার **Visa Number** (সাধারণত 60 বা 61 দিয়ে শুরু) নোট করুন।
ধাপ ২: Visitor অপশনে রেজিস্ট্রেশন করুন:
- Nusuk অ্যাপ খুলে **New User -> Visitor** সিলেক্ট করুন। এরপর Visa Number, Passport Number, জন্মতারিখ, Nationality (Bangladesh), ইমেইল ও ফোন নম্বর দিয়ে ইমেইলে আসা ৪ সংখ্যার OTP কোড বসিয়ে লগইন সম্পন্ন করুন।

৪. মদিনায় ফ্রি রিয়াজুল জান্নাত (RAWDAH SHAREEF) পারমিট বুক করার নিয়ম কী?
নিয়ম ১: রওজা শরীফের পারমিট Nusuk-এ ফ্রি অ্যাপয়েন্টমেন্ট হিসেবে বুক হয়:
- মদিনায় কোনো দালালকে টাকা দেবেন না! Nusuk অ্যাপের ভেতরে **Prophet's Mosque Services -> Praying in the Noble Rawdah** অপশন থেকে পুরুষ ও নারীদের জন্য প্রতি ৩০ দিনে ১টি পারমিট বুক করা যায়—মন্ত্রণালয়ের সার্ভিস পেজের বর্তমান খরচ ও শর্ত সাপেক্ষে [৪]।
নিয়ম ২: লাইভ অ্যাভেইলেবিলিটি চেক করুন; নির্দিষ্ট রিলিজ দিনের গ্যারান্টি নেই:
- মন্ত্রণালয়ের Rawdah সার্ভিস পেজ ফ্রি অ্যাপয়েন্টমেন্ট পারমিট বর্ণনা করে এবং ব্যবহারকারীদের উপলব্ধ তারিখ/সময় স্লট বেছে নিতে বলে। সেখানে নির্দিষ্ট সাপ্তাহিক স্লট-রিলিজ সময়সূচি প্রকাশ করা হয় না [৪]।
- মদিনায় পৌঁছানোর পর কোনো স্লট খালি না দেখলে মসজিদে নববীর চত্বরে ফোনের Location (GPS) চালু রেখে Nusuk নিয়মিত চেক করুন—বাতিল বা ইনস্ট্যান্ট-এন্ট্রি স্লট উপলব্ধ হতে পারে। অ্যাপে দেখা যেকোনো সময়কে লাইভ availability হিসেবে ধরুন, গ্যারান্টি হিসেবে নয়।

৫. সচরাচর জিজ্ঞাসা
Saudi Visa Bio কি প্রত্যেক বাংলাদেশি যাত্রীর জন্য বাধ্যতামূলক?
না। বর্তমান সৌদি মন্ত্রণালয়ের FAQ বাংলাদেশকে ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah visa-র biometric enrollment-এর তালিকাভুক্ত করে এবং Saudi Visa Bio-র নাম উল্লেখ করে। আপনার বর্তমান অফিশিয়াল visa application ও অ্যাপের নির্দেশনা অনুসরণ করুন; এটি প্রত্যেক ট্যুরিস্ট বা স্টপওভার visa-র জন্য প্রযোজ্য বলে ধরে নেবেন না [১-২]।
প্রতি সপ্তাহে নির্দিষ্ট দিনে কি Rawdah বুক করা যায়?
মন্ত্রণালয়ের Rawdah সার্ভিস পেজে নির্দিষ্ট সাপ্তাহিক রিলিজ দিন প্রকাশ করা হয় না। Nusuk-এ ফ্রি অ্যাপয়েন্টমেন্ট পারমিট বুক করুন এবং লাইভ availability চেক করুন; বাতিল বা ইনস্ট্যান্ট স্লট আসতে পারে [৪]।
Rawdah পারমিটের স্ক্রিনশট কি গেটে গ্রহণ করা হয়?
না। গার্ডরা Nusuk অ্যাপের লাইভ dynamic QR কোড স্ক্যান করেন, তাই মদিনায় মোবাইল ডেটা চালু রাখুন।
ট্যুরিস্ট বা স্টপওভার visa দিয়ে কি ফরজ হজ করা যায়?
না। Umrah, ট্যুরিস্ট বা স্টপওভার visa বাংলাদেশের হজ নিবন্ধন বা সৌদি হজ পারমিটের বিকল্প নয়। বর্তমান বাংলাদেশ ও সৌদি হজ নির্দেশনা অনুসরণ করুন [৯]।
আমার ১০ সংখ্যার Saudi Visa Number কোথায় পাব?
অনুমোদিত PDF Umrah e-Visa খুলে উপরের ডান দিকে থাকা ১০ সংখ্যার নম্বর (সাধারণত 60 বা 61 দিয়ে শুরু) নোট করুন—application/MOFA reference number নয়।

`,
    internalLinks: [
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "নারীদের জন্য ওমরাহ গাইড ও মদিনার Ladies' Gate 25–29", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "hajj.gov.bd পোর্টালে সরকারি ও বেসরকারি হজ নিবন্ধন", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
      { text: "DIY Umrah Intelligence Portal & BDT Calculator", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "রওজা শরীফের গেটে লাইভ Nusuk QR কোড দেখাতে ইন্টারনেট অপরিহার্য",
      body: "মসজিদে নববীর গেটে স্ক্রিনশট গ্রহণ করা হয় না। ঢাকা ছাড়ার আগেই ফোনে Saudi Arabia 5G eSIM ইনস্টল করে নিন।",
    },
  },

  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    title: "নারীদের জন্য Umrah গাইড (2026): মাহরাম ছাড়া ভিসার নিয়ম, মদিনার Ladies' Gate 25–29 ও পর্দাশীল ইহরাম",
    summary:
      "২০২৬ সালে বাংলাদেশি নারীরা কি মাহরাম ছাড়া ওমরাহ ভিসা পেতে পারেন? মদিনায় মসজিদে নববীতে নারীদের নামাজ ও রিয়াজুল জান্নাতে প্রবেশের জন্য কোন গেটগুলো নির্ধারিত? সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের (haj.gov.sa) সর্বশেষ নিয়ম ও বিশুদ্ধ শরীয়াহ নির্দেশনার আলোকে তৈরি এই গাইডে জানুন নারীদের ওমরাহ ভিসা নীতিমালা, ইহরামের সঠিক পোশাক ও মুখের পর্দার নিয়ম, সাঈ শেষে পর্দা বজায় রেখে চুল কাটার (তাকসীর) পদ্ধতি এবং কেন মদিনার উত্তর দিকের ২৫–২৯ নম্বর গেটের পাশে হোটেল নেওয়া সবচেয়ে নিরাপদ।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `পরিবারের সাথে মা-বোনদের নিয়ে ওমরাহ করা কিংবা কর্মজীবী নারীদের ঢাকা থেকে পবিত্র মক্কা ও মদিনা সফরের আগে সৌদি সরকারের হালনাগাদ নিয়ম এবং হারাম শরীফের মহিলা গেট সম্পর্কে স্পষ্ট ধারণা থাকলে পুরো সফর অনেক সহজ ও নিরাপদ হয়।

১. ২০২৬ সালে নারীদের ওমরাহ ভিসার ক্ষেত্রে মাহরামের সরকারি নিয়ম কী?
- **সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের ই-ভিসা নিয়ম (haj.gov.sa ও nusuk.sa):** সৌদি আরবের হালনাগাদ ভিসা নীতিমালা অনুযায়ী, যেকোনো বয়সের নারী অনলাইনে **Umrah e-Visa**, **96-Hour Stopover Visa** বা **Tourist e-Visa** পাওয়ার জন্য ভিসা পোর্টালে পুরুষ মাহরাম যুক্ত করা আর বাধ্যতামূলক নয়।
- **ঢাকা এয়ারপোর্ট ইমিগ্রেশন ও পারিবারিক পরামর্শ:** সৌদি ই-ভিসা পাওয়া গেলেও বাংলাদেশ থেকে একা বা মা-মেয়ে একসাথে ভ্রমণের সময় ঢাকা এয়ারপোর্টে (DAC) ঝামেলামুক্ত ইমিগ্রেশনের জন্য সাথে **NOC / ছুটির চিঠি**, **কাবিননামা বা জন্মসনদ/NID**, কনফার্মড রিটার্ন টিকিট এবং হোটেল ভাউচার ফাইলে রাখা অত্যন্ত জরুরি।

২. মদিনার মসজিদে নববীতে নারীদের প্রবেশ ও রওজা শরীফের গেট কোনটি?
নিয়ম ১: মদিনায় সবসময় উত্তর দিকের গেট ২৫ থেকে ২৯ (Markazia North)-এর কাছে হোটেল নিন:
- মসজিদে নববীতে নারীদের সবচেয়ে বড় ও প্রশস্ত নামাজের স্থান হলো **উত্তর দিকের গেট ২৩, ২৪, ২৫, ২৮ এবং ২৯** বরাবর। তাই Markazia North এলাকায় হোটেল নিলে মা-বোনদের মাত্র ২–৩ মিনিট হাঁটলেই মহিলা গেটে পৌঁছানো যায়।
নিয়ম ২: নারীদের রিয়াজুল জান্নাত (Rawdah Shareef) ভিজিটের সময় ও গেট:
- নারীদের জন্য রওজা শরীফে প্রবেশের সময় সাধারণত দুটি: **ফজরের সূর্যোদয়ের পর থেকে যোহরের আগ পর্যন্ত** এবং **এশার নামাজের পর থেকে মধ্যরাত পর্যন্ত** (আপনার Nusuk পারমিটে সুনির্দিষ্ট সময় লেখা থাকবে)।
- নারীদের রওজা শরীফের লাইন শুরু হয় মসজিদে নববীর উত্তর-পূর্ব চত্বরের **Gate 25 এবং Gate 32 (উসমান ইবনে আফফান গেট)**-এর সামনে থেকে।

৩. নারীদের ইহরামের পোশাক, মুখ ঢাকা ও জুতার সঠিক নিয়ম কী?
- **ইহরামের পোশাক:** নারীদের জন্য আলাদা কোনো সেলাইবিহীন কাপড় নেই। দেশ থেকেই ঢিলেঢালা ও আরামদায়ক **সুতি বোরকা/আবায়া বা সালোয়ার-কামিজ ও বড় হিজাব/খিমার** পরিধান করুন।
- **মুখের পর্দা (নিকাব) ও হাতমোজা:** ইহরাম অবস্থায় মুখমণ্ডলের চামড়ার সাথে কাপড় বেঁধে রাখা (নিকাব) এবং সেলাই করা হাতমোজা পরা নিষেধ। তবে পর্দানশীন নারীরা হিজাবের নিচে মাথার সামনে একটি **ক্যাপ (Visor Cap)** পরে তার ওপর দিয়ে পাতলা কাপড় ঝুলিয়ে মুখ পর্দা করতে পারবেন, যাতে কাপড়টি মুখের চামড়ায় লেগে না থাকে।
- **জুতা ও মোজা:** নারীরা ইহরাম অবস্থায় যেকোনো আরামদায়ক ঢাকা জুতা, স্নিকার্স এবং পায়ের মোজা পরতে পারবেন।

৪. সাঈ শেষে নারীরা কীভাবে পর্দা বজায় রেখে চুল কাটবেন (তাকসীর)?
- মারওয়া পাহাড়ের ভিড়ে প্রকাশ্যে কখনোই চুল কাটবেন না! সাঈ শেষ করে মহিলা নামাজ কক্ষের নীরব স্থানে হিজাবের নিচ দিয়ে অথবা পরিবারের সাথে নিজের হোটেল রুমে ফিরে এসে সব চুলের আগা থেকে **এক আঙুলের কর পরিমাণ (প্রায় ১ ইঞ্চি)** চুল কেটে হালাল হবেন।`,
    internalLinks: [
      { text: "Nusuk App ও ফ্রি Rawdah Permit বুকিং গাইড", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "মক্কা ও মদিনার সেরা ফ্যামিলি হোটেল জোন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "বয়স্ক মা-বাবাকে নিয়ে ওমরাহ ও হুইলচেয়ার গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "পরিবার ও মা-বোনদের জন্য নিরাপদ প্রাইভেট এয়ারপোর্ট কার",
      body: "জেদ্দা বা মদিনা এয়ারপোর্টে নেমে সরাসরি আপনার হোটেলের গেটে পৌঁছাতে আগেভাগেই প্রাইভেট ফ্যামিলি গাড়ি বুক করুন।",
    },
  },

  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    title: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw Flight কৌশল (2026): Biman বনাম Saudia বনাম সাশ্রয়ী এয়ারলাইন্স তুলনা",
    summary:
      "সাধারণ রাউন্ডট্রিপ টিকিটে ঢাকা থেকে জেদ্দা (DAC–JED–DAC) গেলে সফর শেষে মদিনা থেকে আবার ৪৫০ কিলোমিটার সড়কপথে ৬ ঘণ্টা জার্নি করে জেদ্দা এয়ারপোর্টে ফিরে আসতে হয়। এই গাইডে জানুন কীভাবে স্মার্ট Multi-City (Open-Jaw) টিকিট কেটে যাওয়ার সময় ঢাকা থেকে জেদ্দা (DAC–JED) এবং ফেরার সময় সরাসরি মদিনা থেকে ঢাকা (MED–DAC) ফিরবেন—পাশাপাশি Biman Bangladesh Airlines ও Saudia ডিরেক্ট ফ্লাইট বনাম Gulf Air, SalamAir, Air Arabia ও Kuwait Airways-এর ভাড়া, ৪৬ কেজি লাগেজ এবং ফ্রি ৫ লিটার জমজমের তুলনা।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `বাংলাদেশ থেকে ওমরাহ বাজেটের সবচেয়ে বড় অংশ হলো বিমানের টিকিট। সৌদি সিভিল এভিয়েশন (**GACA - gaca.gov.sa**) ও এয়ারলাইন্সগুলোর নিয়ম মেনে সঠিক রুটে টিকিট কাটলে জনপ্রতি ১৫,০০০+ টাকা এবং ৬ ঘণ্টার ক্লান্তিকর বাস ভ্রমণ দুটোই বাঁচানো যায়।

১. ওমরাহর জন্য কেন সবসময় "OPEN-JAW" (MULTI-CITY) টিকিট কাটবেন?
টিকিট খোঁজার সময় কখনোই সাধারণ "Roundtrip Dhaka to Jeddah" সার্চ না করে **Multi-City** অপশন ব্যবহার করুন:
- **রুট ১ — যাওয়া: Dhaka (DAC) -> Jeddah (JED) এবং ফেরা: Madinah (MED) -> Dhaka (DAC):** ঢাকা থেকে ইহরাম পরে জেদ্দায় নেমে প্রথমে মক্কায় ওমরাহ সম্পন্ন করুন, এরপর বুলেট ট্রেনে মদিনায় যান এবং সফর শেষে মসজিদে নববী থেকে মাত্র ২০ মিনিট দূরের **মদিনা এয়ারপোর্ট (MED)** থেকে সরাসরি ঢাকায় ফিরুন!
- **রুট ২ — যাওয়া: Dhaka (DAC) -> Madinah (MED) এবং ফেরা: Jeddah (JED) -> Dhaka (DAC):** বয়স্ক মা-বাবা সাথে থাকলে প্রথমে মদিনায় নামুন (ফ্লাইটে ইহরাম বাঁধার কোনো ঝামেলা নেই!), মদিনায় ৪ দিন বিশ্রাম ও ইবাদত শেষে হোটেল থেকে ইহরাম পরে মক্কায় গিয়ে ওমরাহ করুন এবং জেদ্দা হয়ে ফিরুন।

২. ডিরেক্ট ফ্লাইট তুলনা: BIMAN BANGLADESH AIRLINES বনাম SAUDIA
মাত্র **৬ ঘণ্টা ১৫ মিনিটে** সরাসরি উড়ালের জন্য দুটি এয়ারলাইন্সই সেরা:
- **Biman Bangladesh Airlines (biman-airlines.com):**
  • রাউন্ডট্রিপ / মাল্টি-সিটি ভাড়া: **BDT 72,000 – BDT 88,000** (সাধারণ সময়)।
  • লাগেজ ও জমজম সুবিধা: **২টি ২৩ কেজি লাগেজ (মোট ৪৬ কেজি)** + ৭ কেজি হ্যান্ডব্যাগ + **১টি ফ্রি ৫ লিটার জমজম বক্স**।
  • বিশেষ সুবিধা: বাংলায় মিকাতের ঘোষণা এবং দেশীয় খাবার।
- **Saudia - Saudi Arabian Airlines (saudia.com):**
  • রাউন্ডট্রিপ / মাল্টি-সিটি ভাড়া: **BDT 74,000 – BDT 92,000**।
  • লাগেজ ও জমজম সুবিধা: **২টি ২৩ কেজি লাগেজ (মোট ৪৬ কেজি)** + ৭ কেজি হ্যান্ডব্যাগ + **১টি ফ্রি ৫ লিটার জমজম বক্স**।
  • বিশেষ সুবিধা: সৌদিয়া ল্যান্ড করে অত্যাধুনিক **Jeddah Terminal 1**-এ, যার নিচতলাতেই Haramain Bullet Train স্টেশন এবং প্লেনের ভেতরে নামাজের জায়গা (Musalla) থাকে!

৩. সাশ্রয়ী ১-স্টপ কানেক্টিং ফ্লাইট (জনপ্রতি ১৪,০০০ – ২২,০০০ টাকা সাশ্রয়)
- **ফুল-সার্ভিস ট্রানজিট এয়ারলাইন্স (Gulf Air, Kuwait Airways, Qatar Airways, Emirates):** ভাড়া **BDT 62,000 – BDT 74,000** (খাবার, ৩০–৪৬ কেজি লাগেজ ও ফ্রি জমজমসহ)।
- **বাজেট ক্যারিয়ার (SalamAir, Air Arabia, Jazeera Airways, Flynas):** ভাড়া মাত্র **BDT 52,000 – BDT 63,000** থেকে শুরু (টিকিট কাটার সময় অবশ্যই ২০ বা ৩০ কেজি চেকড লাগেজ বান্ডেল যুক্ত করে নেবেন)।`,
    internalLinks: [
      { text: "ঢাকা এয়ারপোর্ট বনাম ট্রানজিট ফ্লাইটে ইহরাম বাঁধার নিয়ম", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "জেদ্দা ও ঢাকা এয়ারপোর্টে জমজম পানি ও খেজুর আনার নিয়ম", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "সম্পূর্ণ DIY Umrah ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "ঢাকা থেকে জেদ্দা ও মদিনার লাইভ ফ্লাইট ভাড়া তুলনা করুন",
      body: "Biman, Saudia ও ট্রানজিট এয়ারলাইন্সের সর্বনিম্ন ভাড়া দেখুন অথবা আমাদের WhatsApp ডেস্কে BDT-তে টিকিট বুক করুন।",
    },
  },

  "ramadan-umrah-itikaf-guide-bangladesh-booking-budget": {
    title: "রমজানে Umrah ও শেষ ১০ দিনের ইতিকাফ গাইড (2026–2027): বাংলাদেশ থেকে ৫০% কম খরচে বুকিংয়ের কৌশল",
    summary:
      "সহীহ বুখারীর হাদিস অনুযায়ী পবিত্র রমজান মাসে একটি ওমরাহ পালন করা হজের সমান সওয়াবের অধিকারী করে। কিন্তু রমজানের শেষ দশকে (আশরায়ে আওয়াখির) মক্কার হোটেল ভাড়া ৩ থেকে ৪ গুণ বেড়ে যায়। এই গাইডে জানুন কীভাবে 'শাবানের শেষ সপ্তাহ ও রমজানের প্রথম সপ্তাহের ওভারল্যাপ কৌশল' ব্যবহার করে ৫০% কম খরচে রমজান ওমরাহ করবেন, কীভাবে Nusuk ও alharamain.gov.sa পোর্টালে হারামাইন শরীফাইনে সুন্নাহ ইতিকাফ নিবন্ধন করবেন এবং ইফতার ও তারাবীহ নামাজের ভিড় সামলাবেন।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `পবিত্র রমজান মাসে কাবা শরীফের সামনে ইফতার ও তারাবীহ নামাজ আদায় করা প্রতিটি মুমিনের স্বপ্ন। সঠিক সময়ে ফ্লাইট ও হোটেল পরিকল্পনা করলে দেড় লাখ টাকার মধ্যেই রমজান ওমরাহ সম্পন্ন করা সম্ভব।

১. বাংলাদেশ থেকে রমজানে ওমরাহ করতে কত টাকা খরচ হয়?
- **রমজানের প্রথম ২০ দিন (১ থেকে ২০ রমজান):**
  • ফ্লাইট + ভিসা + ১০ দিনের শাটল/৩-তারকা হোটেল শেয়ার: জনপ্রতি **BDT 1,42,000 – BDT 1,68,000**।
  • হারামের হাঁটা দূরত্বের ৪/৫-তারকা হোটেল শেয়ার: জনপ্রতি **BDT 1,95,000 – BDT 2,45,000**।
- **রমজানের শেষ ১০ দিন ও ঈদুল ফিতর (২০ থেকে ৩০ রমজান):**
  • মক্কার হোটেলগুলো শেষ ১০ রাতের ফুল প্যাকেজ হিসেবে রুম বিক্রি করে; এতে ফ্লাইটসহ জনপ্রতি **BDT 2,15,000 – BDT 3,40,000+** খরচ হয়।

২. ৫০% হোটেল খরচ বাঁচানোর "শাবান-রমজান ওভারল্যাপ কৌশল" কী?
ধাপ ১: ২৫ বা ২৬ শাবান ঢাকা থেকে মদিনায় ফ্লাই করুন:
- শাবানের শেষ ৪ দিন এবং রমজানের প্রথম রাত মদিনায় অবস্থান করুন, যেখানে হোটেলের ভাড়া স্বাভাবিক থাকে।
ধাপ ২: ২ রমজান মক্কায় প্রবেশ করে রমজানের ওমরাহ পালন করুন:
- ২ রমজান বুলেট ট্রেনে মক্কায় গিয়ে ৭ বা ৮ রমজান পর্যন্ত থাকুন। এতে আপনার ওমরাহর নিয়ত, তাওয়াফ ও সাঈ পুরোপুরি রমজান মাসের ভেতরেই সম্পন্ন হবে এবং আপনি রমজানে ওমরাহর পূর্ণ ফজিলত পাবেন—অথচ খরচ হবে শেষ দশকের তুলনায় অর্ধেক!

৩. মসজিদুল হারাম ও মসজিদে নববীতে অফিশিয়াল ইতিকাফ রেজিস্ট্রেশন করার নিয়ম কী?
- সৌদি হারামাইন কর্তৃপক্ষের (**alharamain.gov.sa** এবং **Nusuk App**) নিয়ম অনুযায়ী, রমজানের শেষ ১০ দিনের সুন্নাহ ইতিকাফের জন্য **১ থেকে ৫ রমজানের মধ্যে** অনলাইনে ফ্রি রেজিস্ট্রেশন করতে হয়।
- অনুমোদিত ইতিকাফকারীদের অফিশিয়াল আইডি কার্ড, নির্ধারিত লকার এবং ফ্রি ইফতার ও সাহরি প্রদান করা হয়।

৪. রমজানে ইফতার, সাহরি ও তাওয়াফের জরুরি টিপস
- **হারাম শরীফের ফ্রি ইফতার দস্তরখান:** মাগরিবের আজানের অন্তত **৬০–৭৫ মিনিট আগে** মসজিদে প্রবেশ করলে খেজুর, জমজম, লাবান ও রুটির ইফতার দস্তরখানে সহজেই জায়গা পাবেন।
- **রোজা রেখে তাওয়াফের সেরা সময়:** দুপুরের কড়া রোদে তাওয়াফ না করে **তারাবীহ নামাজের পর (রাত ১০:৩০ – ২:০০টা)** অথবা **ফজরের নামাজের পর** তাওয়াফ ও সাঈ করুন।`,
    internalLinks: [
      { text: "সম্পূর্ণ DIY Umrah ও Nusuk App গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "মক্কা ও মদিনার হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "মক্কা ও মদিনায় দেশি হালাল খাবার ও সাহরি/ইফতার গাইড", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "রমজানের লক্ষ মানুষের ভিড়ে পরিবারের সাথে সার্বক্ষণিক যুক্ত থাকুন",
      body: "তারাবীহ ও কিয়ামুল লাইলের পর হারাম চত্বরে পরিবারের সাথে যোগাযোগ রাখতে ঢাকা থেকেই Saudi Arabia 5G eSIM চালু করে যান।",
    },
  },

  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    title: "ঢাকা এয়ারপোর্ট বনাম ট্রানজিট ফ্লাইটে ইহরাম বাঁধার নিয়ম (2026): অফিশিয়াল মিকাত (কারনুল মানাজিল ও ইয়ালামলাম) গাইড",
    summary:
      "প্রথমবার বাংলাদেশ থেকে ওমরাহ বা হজে যাওয়ার সময় অনেকের মনেই প্রশ্ন জাগে: 'ঢাকা থেকে জেদ্দা যাওয়ার পথে কোথায় ইহরামের কাপড় পরব এবং কখন নিয়ত করব?' মিকাত অতিক্রম করার আগে ইহরাম না বাঁধলে দম (জরিমানা কুরবানি) ওয়াজিব হয়ে যায়। সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের (haj.gov.sa) নির্দেশনা ও বিশুদ্ধ ফিকহ অনুযায়ী এই গাইডে Biman ও Saudia ডিরেক্ট ফ্লাইট বনাম দুবাই, শারজাহ, মাস্কাট, দোহা বা কুয়েত ট্রানজিট ফ্লাইটে ইহরাম পরিধানের নিয়ম এবং প্রথমে মদিনায় গেলে কেন প্লেনে ইহরাম লাগবে না তা সহজ ভাষায় আলোচনা করা হয়েছে।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `ইসলামী শরীয়াহ এবং সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের (**haj.gov.sa**) নিয়ম অনুযায়ী, ওমরাহ বা হজের উদ্দেশ্যে জেদ্দা বিমানবন্দরে (**JED**) অবতরণকারী প্রত্যেক যাত্রীকে আকাশপথে নির্ধারিত **মিকাত (Miqat)** অতিক্রম করার আগেই ইহরামের নিয়ত ও তালবিয়া পাঠ সম্পন্ন করতে হবে। কারণ জেদ্দা শহর মিকাতের সীমানার ভেতরে অবস্থিত—তাই জেদ্দায় নেমে ইহরাম বাঁধার কোনো সুযোগ নেই!

১. বাংলাদেশ থেকে জেদ্দাগামী ফ্লাইটের নির্ধারিত আকাশপথের মিকাত কোনটি?
জেদ্দা বিমানবন্দরে নামার আনুমানিক **৩৫ থেকে ৫০ মিনিট আগে** বিমানটি নিচের দুটি মিকাতের একটি অতিক্রম করে:
- **কারনুল মানাজিল (Qarn al-Manazil / আস-সাইল আল-কাবির):** ঢাকা থেকে সরাসরি ফ্লাইট এবং রিয়াদ, দুবাই, শারজাহ, দোহা, বাহরাইন ও কুয়েত হয়ে আসা ফ্লাইটগুলো এই মিকাত অতিক্রম করে।
- **ইয়ালামলাম (Yalamlam):** দক্ষিণ দিক বা মাস্কাট রুট হয়ে আসা কিছু ফ্লাইট এই মিকাত অতিক্রম করে।

২. দৃশ্যপট ১: ঢাকা থেকে সরাসরি ফ্লাইট (BIMAN অথবা SAUDIA DIRECT FLIGHT)
ধাপ ১: ঢাকা এয়ারপোর্টে ফ্লাইটে ওঠার আগেই ইহরামের কাপড় পরে নিন:
- বিমানের ছোট টয়লেটে দুই খণ্ড সাদা ইহরামের কাপড় পরা অত্যন্ত কষ্টকর! তাই বাসা থেকে গোসল করে অথবা আশকোনা হজ ক্যাম্প কিংবা **ঢাকা এয়ারপোর্ট টার্মিনাল ১/২-এর নামাজ ঘরে** চেক-ইনের পর ইহরামের কাপড় পরে মাথার টুপি রেখে ২ রাকাত সুন্নাত নামাজ পড়ে নিন।
ধাপ ২: পাইলটের ঘোষণার সময় নিয়ত ও তালবিয়া পাঠ করুন:
- শুধু ইহরামের কাপড় পরলেই ইহরামের নিষেধাজ্ঞা শুরু হয় না। জেদ্দায় নামার **৪৫ মিনিট আগে** বিমান বা সৌদিয়ার ক্যাপ্টেন যখন মিকাতের ঘোষণা দেবেন, তখন পুরুষরা মাথার কাপড় সরিয়ে মুখে বলুন: **"লাব্বাইকা আল্লাহুম্মা ওমরাহ"** এবং উচ্চৈঃস্বরে **তালবিয়া (লাব্বাইক আল্লাহুম্মা লাব্বাইক...)** পাঠ শুরু করুন।

৩. দৃশ্যপট ২: ট্রানজিট বা কানেক্টিং ফ্লাইট (শারজাহ, দুবাই, মাস্কাট, দোহা বা কুয়েত)
ধাপ ১: ঢাকা থেকে সাধারণ পোশাকে ট্রানজিট এয়ারপোর্টে যান:
- আপনার ইহরামের কাপড়, বেল্ট ও স্যান্ডেল অবশ্যই **৭ কেজি হ্যান্ড-ক্যারি কেবিন ব্যাগে** রাখবেন (ভুল করেও বড় ২৩ কেজির লাগেজে দেবেন না!)।
ধাপ ২: যাত্রাবিরতির (Layover) সময় ট্রানজিট এয়ারপোর্টের নামাজ ঘরে ইহরাম পরুন:
- শারজাহ, দুবাই, মাস্কাট, দোহা, কুয়েত ও বাহরাইন এয়ারপোর্টের ভেতরে সুন্দর অজুখানা ও **Ihram Changing Room** রয়েছে। সেখানে কাপড় পরিবর্তন করে জেদ্দাগামী দ্বিতীয় ফ্লাইটে ওঠার সময় বা মিকাতের ঘোষণায় নিয়ত করুন।

৪. দৃশ্যপট ৩: প্রথমে ঢাকা থেকে মদিনা (MED) ফ্লাইট হলে করণীয় কী?
- আপনার ফ্লাইট যদি প্রথমে **মদিনা এয়ারপোর্টে (MED)** ল্যান্ড করে, তবে ঢাকা বা প্লেনে **ইহরাম বাঁধতে হবে না**! সাধারণ পোশাকে মদিনায় গিয়ে ৩–৫ দিন নামাজ ও জিয়ারত শেষে যেদিন মক্কায় রওনা হবেন, সেদিন মদিনার হোটেল থেকে ইহরাম পরে **মিকাত যুল হুলাইফা (মসজিদে আবইয়ারে আলী)** থেকে নিয়ত করবেন।`,
    internalLinks: [
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw ফ্লাইট গাইড", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "নারীদের জন্য ওমরাহ গাইড ও ইহরামের নিয়ম", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "ইহরাম অবস্থায় জেদ্দা এয়ারপোর্ট থেকে সরাসরি মক্কার হোটেলে যান",
      body: "জেদ্দা এয়ারপোর্টে নামার পর পরিবারের জন্য প্রাইভেট এসি কার বা মিনিভ্যান আগেভাগে অনলাইনে বুক করে রাখুন।",
    },
  },

  "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": {
    title: "জেদ্দা ও মদিনা এয়ারপোর্ট থেকে Zamzam পানি, আজওয়া খেজুর ও স্বর্ণ আনার অফিশিয়াল কাস্টমস নিয়ম (2026)",
    summary:
      "ওমরাহ বা হজ শেষে দেশে ফেরার সময় প্রত্যেক বাংলাদেশি হাজী আত্মীয়-স্বজনের জন্য পবিত্র জমজমের পানি, মদিনার আজওয়া খেজুর এবং পরিবারের জন্য স্বর্ণালঙ্কার আনতে চান। কিন্তু বড় লাগেজের ভেতরে খোলা বোতলে জমজম পানি ভরে দিলে জেদ্দা বা মদিনা এয়ারপোর্টের স্ক্যানারে পুরো লাগেজ আটকে দেওয়া হয়। সৌদি সিভিল এভিয়েশন (GACA - gaca.gov.sa) এবং বাংলাদেশ জাতীয় রাজস্ব বোর্ড (NBR - nbr.gov.bd)-এর সর্বশেষ যাত্রী ব্যাগেজ বিধিমালা অনুযায়ী অফিশিয়াল ৫ লিটার জমজম বক্স, খেজুর এবং শুল্কমুক্ত স্বর্ণ আনার নিয়ম জেনে নিন।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `ওমরাহ বা হজ শেষে জেদ্দা (**JED**) ও মদিনা (**MED**) এয়ারপোর্ট থেকে চেক-ইন এবং ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরে (**DAC**) কাস্টমস ক্লিয়ারেন্সের জন্য দুই দেশের সরকারি নিয়ম জানা থাকলে কোনো ভোগান্তিতে পড়তে হয় না।

১. জেদ্দা ও মদিনা এয়ারপোর্ট থেকে জমজম পানি আনার অফিশিয়াল GACA নিয়ম কী?
সৌদি সিভিল এভিয়েশন (**gaca.gov.sa**) এবং কিং আব্দুল্লাহ জমজম প্রজেক্টের নিয়ম অনুযায়ী:
নিয়ম ১: লাগেজের ভেতরে খোলা বোতলে জমজম পানি ভরা সম্পূর্ণ নিষিদ্ধ:
- কখনোই আপনার ২৩ কেজির স্যুটকেসের ভেতরে প্লাস্টিক বোতলে জমজম পানি ভরবেন না! এয়ারপোর্টের অটোমেটিক এক্স-রে মেশিনে তরল পদার্থ ধরা পড়লে আপনার লাগেজ ফ্লাইটে তোলা হবে না।
নিয়ম ২: এয়ারপোর্ট কিয়স্ক থেকে অফিশিয়াল ৫ লিটার সিল করা কার্টন কিনুন:
- জেদ্দা টার্মিনাল ১-এর বাইরে বা মদিনা এয়ারপোর্টের নির্ধারিত **Zamzam Sales Kiosk**-এ আপনার পাসপোর্ট ও **ওমরাহ ভিসা / Nusuk পারমিট** দেখিয়ে জনপ্রতি **১টি অফিশিয়াল ৫ লিটারের সিল করা জমজম বক্স** কিনুন (মূল্য **SAR 9.50 – 12.50 / ~BDT 380**)।
- বক্সের গায়ে মার্কার দিয়ে আপনার নাম, ফ্লাইট নম্বর ও মোবাইল নম্বর লিখে চেক-ইন কাউন্টারের পাশে থাকা আলাদা **"Zamzam Belt"**-এ জমা দিন। Biman, Saudia, Gulf Air ও Kuwait Airways এই ৫ লিটার বক্সটি আপনার ৪৬ কেজি লাগেজের বাইরে **সম্পূর্ণ বিনামূল্যে** বহন করে।

২. মদিনা থেকে কত কেজি আজওয়া ও সুক্কারি খেজুর আনা যায় এবং দাম কত?
মদিনার মসজিদে নববী থেকে ১ কিমি দক্ষিণে **মদিনা সেন্ট্রাল ডেট মার্কেট (Souq Al-Tamr)** বা আল-কাকি পাইকারি মার্কেট থেকে খেজুর কিনলে হোটেলের দোকানের চেয়ে ৪০% কম দামে পাবেন:
- **২০২৬ সালে মদিনায় খেজুরের পাইকারি দর:**
  • গ্রেড-A জাম্বো আজওয়া খেজুর: **SAR 35 – 50 / কেজি (~BDT 1,150 – 1,620)**।
  • মিডিয়াম আজওয়া খেজুর: **SAR 22 – 30 / কেজি (~BDT 720 – 980)**।
  • কলমি (Safawi) ও সুক্কারি রুতাব খেজুর: **SAR 12 – 20 / কেজি (~BDT 390 – 650)**।
- **কাস্টমস নিয়ম (nbr.gov.bd):** পরিবারের খাবার ও উপহারের জন্য জনপ্রতি **৫ থেকে ১০ কেজি খেজুর** ১ বা ২ কেজির ভ্যাকুয়াম প্যাকেটে আপনার মূল চেকড লাগেজের ভেতরে বিনা শুল্কে আনতে পারবেন।

৩. ঢাকা এয়ারপোর্টে শুল্কমুক্ত স্বর্ণালঙ্কার ও ইলেকট্রনিক্স আনার সরকারি নিয়ম (NBR BAGGAGE RULES)
বাংলাদেশ জাতীয় রাজস্ব বোর্ডের (**nbr.gov.bd**) যাত্রী ব্যাগেজ বিধিমালা অনুযায়ী:
- **স্বর্ণালঙ্কার (Gold Ornaments):** একজন প্রাপ্তবয়স্ক যাত্রী সর্বোচ্চ **১০০ গ্রাম (প্রায় ৮.৫৭ ভরি) স্বর্ণালঙ্কার** (একই ধরনের অলঙ্কার ১২টির বেশি নয়) **সম্পূর্ণ শুল্কমুক্ত (Duty-Free)** ভাবে সাথে আনতে পারবেন।
- **স্বর্ণের বার (Gold Bar):** স্বর্ণের বার আনলে ঢাকা কাস্টমস কাউন্টারে ঘোষণা দিয়ে সরকারি নির্ধারিত শুল্ক পরিশোধ করতে হবে।`,
    internalLinks: [
      { text: "ঢাকা এয়ারপোর্ট প্রি-ডিপার্চার ও লাগেজ নিয়ম হাব", path: "/pre-departure" },
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা ফ্লাইট এবং ৪৬ কেজি লাগেজ গাইড", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT খরচ গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "৪৬ কেজি লাগেজ ও জমজম বক্স নিয়ে এয়ারপোর্টে ফিরছেন?",
      body: "মক্কা বা মদিনার হোটেল থেকে সব লাগেজসহ আরামে এয়ারপোর্টে যেতে আগেভাগেই বড় ফ্যামিলি ভ্যান বুক করুন।",
    },
  },

  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    title: "মক্কা ও মদিনায় দেশি হালাল খাবারের গাইড (2026): ভাত, মাছ, ডাল ও আলু ভর্তা কোথায় পাবেন এবং খরচ কত?",
    summary:
      "বয়স্ক মা-বাবা বা ছোট সন্তানদের নিয়ে ১০ দিনের ওমরাহ সফরে টানা ফাস্টফুড বা অতিরিক্ত তেল-মশলাযুক্ত খাবার খেলে অনেকেই গ্যাস্ট্রিক ও শারীরিক দুর্বলতায় ভোগেন। অথচ পবিত্র মক্কার ইব্রাহিম খলিল রোড (মিসফালাহ), আজইয়াদ এবং মদিনার মারকাজিয়া সাউথের গলিতে মাত্র ১২ থেকে ২০ সৌদি রিয়ালে (BDT 390–650) গরম সাদা ভাত, মসুর ডাল, রুই/ইলিশ মাছ, আলু ভর্তা ও গরুর ভুনা পাওয়া যায়! এই গাইডে মক্কা ও মদিনার সেরা দেশি ভাতের হোটেল এবং Al Baik-এর লোকেশন ও খরচ তুলে ধরা হলো।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষের (**SFDA - sfda.gov.sa**) নিয়ম অনুযায়ী মক্কা ও মদিনার সব খাবারই ১০০% হালাল। তবে বাংলাদেশি হাজীদের—বিশেষ করে ডায়াবেটিস বা সংবেদনশীল পেটের বয়স্ক মা-বাবার জন্য—হারাম শরীফের কাছেই দেশীয় স্বাদের **গরম ভাত, পাতলা ডাল, মাছের ঝোল ও ভর্তা** কোথায় পাওয়া যায় তা জেনে রাখা খুবই জরুরি।

১. মক্কায় খাঁটি বাংলাদেশি ভাতের হোটেল কোথায় পাবেন?
মসজিদুল হারামের চত্বর থেকে মাত্র ৫–৮ মিনিট হাঁটলেই নিচের ৩টি জোনে প্রচুর বাংলাদেশি রেস্টুরেন্ট পাবেন:
জোন ১: ইব্রাহিম খলিল রোড ও মিসফালাহ (Ibrahim Al Khalil & Misflah — কিং ফাহাদ গেটের দক্ষিণ-পশ্চিমে):
- হাজীদের কাছে এটি **"মক্কার বাংলা বাজার"** নামে পরিচিত! এখানে ঢাকা হোটেল, চিটাগাং রেস্টুরেন্ট, সোনারগাঁও ও আল-মদিনা বাংলার মতো অসংখ্য বাংলাদেশি হোটেল রয়েছে যেখানে বাংলা ভাষাতেই অর্ডার করতে পারবেন।
- **খাবারের দাম:** গরম ভাত + ডাল + আলু/বেগুন ভর্তা + রুই/তেলাপিয়া/ইলিশ মাছ অথবা মুরগি/গরুর গোশত মাত্র **SAR 12 – SAR 18 (~BDT 390 – 580)** প্রতি প্লেট।
জোন ২: লোয়ার আজইয়াদ স্ট্রিট ও বির বালিলা গলি (King Abdulaziz Gate-এর পূর্ব পাশে):
- ফজরের নামাজের পর গরম পরোটা, ডাল ভাজি, ডিম ও কড়া দুধ চা (কারাক চা) পাবেন মাত্র **SAR 5 – SAR 8 (~BDT 165 – 260)**-এ।
জোন ৩: ক্লক টাওয়ার (Abraj Al Bait) ও জাবাল ওমর ফুড কোর্ট:
- শীতাতপ নিয়ন্ত্রিত পরিবেশে পরিবারের সবাইকে নিয়ে এরাবিয়ান মান্দি, কাবসা, শাওয়ারমা ও ইন্ডিয়ান/পাকিস্তানি থালি খাওয়ার জন্য সেরা (**SAR 20 – 35 / ~BDT 650 – 1,140**)।

২. মক্কা ও মদিনায় হারামের সবচেয়ে কাছে AL BAIK কোথায় আছে?
সৌদি আরবের বিখ্যাত **Al Baik** ব্রোস্ট চিকেন (৪ পিস মিল মাত্র **SAR 17–21 / ~BDT 550–680**) খাওয়ার জন্য নিচের ব্রাঞ্চগুলোতে যান:
- **মক্কায় Al Baik:** ১) **Jabal Omar Mall** (সবচেয়ে কম লাইন থাকে—নাগেটস, ফিলেট ও শ্রিম্প পাওয়া যায়), ২) **Clock Tower Basement**, এবং ৩) **Aziziyah ও Kudai ব্রাঞ্চ** (রেগুলার বোন-ইন চিকেন ব্রোস্ট)।
- **মদিনায় Al Baik:** মসজিদে নববীর উত্তর-পশ্চিম পাশে **Taiba Commercial Center (Markazia North)**-এর ভেতরেই বিশাল দোতলা Al Baik রয়েছে!

৩. মদিনায় বাংলাদেশি ভাত ও মাছের হোটেল কোথায় পাবেন?
- মসজিদে নববীর পশ্চিম-দক্ষিণ পাশের **গেট ৫ থেকে ৯ (আল-গামামাহ মসজিদের পাশে, Markazia South)** দিয়ে ২০০ মিটার হাঁটলেই বাঙালি মার্কেটের গলিতে মাত্র ১২–২০ রিয়ালে ভাত, মাছ, খিচুড়ি ও ভর্তা পাওয়া যায়।

৪. ১০ দিনের ওমরাহ সফরে প্রতিদিনের খাবারের বাজেট কমানোর টিপস
- **প্রতিদিনের গড় খাবার খরচ:** দেশি রেস্টুরেন্ট ও সুপারমার্কেট মিলিয়ে জনপ্রতি প্রতিদিন **SAR 30 – 40 (~BDT 980 – 1,300)**।
- **BinDawood সুপারমার্কেট হ্যাক:** ক্লক টাওয়ার বা তাইবা সেন্টারের নিচে **BinDawood** সুপারমার্কেট থেকে কলা, খেজুর, লাবান (দইয়ের পানীয়), ওটস, রুটি ও মধু কিনে হোটেল রুমেই সকালের নাস্তা সেরে নিন!`,
    internalLinks: [
      { text: "বয়স্ক মা-বাবাকে নিয়ে ওমরাহ: হুইলচেয়ার ও মেডিকেল গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "মক্কা ও মদিনার হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "সম্পূর্ণ DIY Umrah ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "Google Maps দেখে রেস্টুরেন্ট খুঁজতে বা খাবার অর্ডার করতে eSIM নিন",
      body: "তাওয়াফ শেষে ক্লান্ত থাকলে HungerStation অ্যাপে হোটেলেই খাবার অর্ডার করতে ঢাকা থেকে Saudi Arabia eSIM অ্যাক্টিভেট করে যান।",
    },
  },
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    title: "মক্কা, মদিনা, বদর প্রান্তর ও তায়েফ ঐতিহাসিক জিয়ারত গাইড (2026): অফিশিয়াল স্থান ও প্রাইভেট গাড়ি ভাড়া",
    summary:
      "ওমরাহ বা হজ সফরে মক্কা, মদিনা, বদর প্রান্তর এবং মনোরম পাহাড়ি শহর তায়েফের ঐতিহাসিক স্থানগুলো (Ziyarah) সরাসরি দেখা প্রতিটি মুসলিম পরিবারের জন্য এক অবিস্মরণীয় আধ্যাত্মিক অভিজ্ঞতা। তবে হারাম শরীফের বাইরে সাধারণ ট্যাক্সি চালকরা অনেক সময় অতিরিক্ত ভাড়া দাবি করে বা তাড়াহুড়ো করে জিয়ারত শেষ করে। সৌদি ট্যুরিজম অথরিটি (visitsaudi.com), রয়্যাল কমিশন ফর মক্কা সিটি (rcmc.gov.sa) এবং Nusuk গাইডলাইন অনুযায়ী যাচাইকৃত এই গাইডে পাবেন মসজিদে কুবায় ২ রাকাত নামাজে ওমরাহর সওয়াব, হেরা কালচারাল ডিস্ট্রিক্ট, উহুদ পাহাড় এবং ২০২৬ সালের প্রাইভেট ৪-সিটার সেডান ও ৭-সিটার ফ্যামিলি গাড়ির সঠিক ভাড়া (SAR ও BDT)।",
    category: "Ziyarah & Stopovers",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৮ মিনিট পড়া",
    content: `বাংলাদেশ থেকে পরিবার ও সন্তানদের নিয়ে ওমরাহ করতে গেলে মক্কায় ১ দিন সকালে, মদিনায় ১ দিন সকালে এবং সম্ভব হলে তায়েফ বা বদর প্রান্তরে ডে-ট্রিপ রাখলে সীরাতুন্নবী (সা.)-এর ইতিহাস চোখের সামনে জীবন্ত হয়ে ওঠে।

১. মক্কার প্রধান ঐতিহাসিক জিয়ারতের স্থানগুলোর তালিকা ও প্রাইভেট গাড়ি ভাড়া কত?
রোদের তীব্রতা বাড়ার আগেই ফজরের নামাজের পরপর (**সকাল ৬:০০ থেকে ৯:৩০ পর্যন্ত**) মক্কার জিয়ারত শুরু করা সবচেয়ে বুদ্ধিমানের কাজ:
রুট ১: মক্কার সীরাত ও হজের ঐতিহাসিক স্থানসমূহ (৩ থেকে ৩.৫ ঘণ্টা):
- **জাবালে নূর ও হেরা কালচারাল ডিস্ট্রিক্ট (Hira Cultural District):** যেখানে পবিত্র হেরা গুহায় রাসূলুল্লাহ (সা.)-এর ওপর সর্বপ্রথম সূরা আলাকের আয়াত নাযিল হয়েছিল। **রয়্যাল কমিশন ফর মক্কা সিটি (rcmc.gov.sa)**-এর অধীনে পাহাড়ের পাদদেশে শীতাতপ নিয়ন্ত্রিত **Revelation Exhibition Museum** এবং ওপরে ওঠার নিরাপদ পাকা রাস্তা তৈরি করা হয়েছে।
- **জাবালে সাওর (গারে সাওর):** মক্কার দক্ষিণে অবস্থিত এই গুহায় হিজরতের সময় মহানবী (সা.) ও হযরত আবু বকর সিদ্দিক (রা.) তিন রাত অবস্থান করেছিলেন।
- **মিনা (তাঁবুর শহর ও জামারাত), মুজদালিফা ও আরাফাত ময়দান (জাবালে রহমত):** হজের মূল স্থানগুলো ঘুরে দেখা এবং আরাফাতের জাবালে রহমত ও মসজিদে নামিরাহ পরিদর্শন।
- **জান্নাতুল মুআল্লা কবরস্থান ও মসজিদে জিন:** মসজিদুল হারাম থেকে মাত্র ১.২ কিমি উত্তরে (হেঁটেও যাওয়া যায়), যেখানে উম্মুল মুমিনীন হযরত খাদিজা (রা.)-এর কবর অবস্থিত।
- **২০২৬ সালে মক্কা জিয়ারতের প্রাইভেট গাড়ি ভাড়া (পুরো গাড়ি — ৩ ঘণ্টা):**
  • **৪-সিটার প্রাইভেট সেডান (Camry / Sonata):** **SAR 150 – SAR 200 (~BDT 4,900 – 6,500)**।
  • **৭-সিটার ফ্যামিলি ভ্যান (Hyundai Staria / H1 / HiAce):** **SAR 250 – SAR 320 (~BDT 8,100 – 10,400)**।

২. মদিনা মনোয়ারার ঐতিহাসিক জিয়ারত এবং মসজিদে কুবায় ১টি পূর্ণ ওমরাহর সওয়াব!
মদিনার জিয়ারতের স্থানগুলো সমতল রাস্তায় অবস্থিত হওয়ায় বয়স্ক মা-বাবার জন্য অত্যন্ত আরামদায়ক:
নিয়ম ১: হোটেল থেকে অজু করে মসজিদে কুবায় ২ রাকাত নামাজ (১টি ওমরাহর সমান সওয়াব):
- সহীহ হাদিসে (সুনানে ইবনে মাজাহ ও সহীহ মুসলিম) বর্ণিত হয়েছে: *"যে ব্যক্তি নিজের ঘরে (বা হোটেলে) পবিত্রতা অর্জন (অজু) করে মসজিদে কুবায় এসে নামাজ আদায় করবে, সে একটি ওমরাহ পালনের সমান সওয়াব পাবে।"*
নিয়ম ২: উহুদ পাহাড়, উহুদের শহীদদের কবরস্থান ও রুমাত পাহাড় (তীরন্দাজদের টিলা):
- সাইয়্যিদুশ শুহাদা হযরত হামজা (রা.)-সহ ৭০ জন সাহাবীর মাকবারা জিয়ারত এবং ঐতিহাসিক রুমাত টিলা ও মসজিদে সাইয়্যিদুশ শুহাদা পরিদর্শন।
নিয়ম ৩: মসজিদে কিবলাতাইন (দুই কিবলার মসজিদ) ও সাবআ মাসাজিদ (খন্দক বা পরিখার যুদ্ধক্ষেত্র):
- যেখানে নামাজের মধ্যেই বায়তুল মুকাদ্দাস থেকে পবিত্র কাবার দিকে কিবলা পরিবর্তনের ওহি নাযিল হয়েছিল এবং খন্দকের যুদ্ধের ঐতিহাসিক স্থান।
- **২০২৬ সালে মদিনা জিয়ারতের প্রাইভেট গাড়ি ভাড়া (২.৫ থেকে ৩ ঘণ্টা):**
  • **৪-সিটার সেডান:** **SAR 120 – SAR 160 (~BDT 3,900 – 5,200)**।
  • **৭-সিটার ফ্যামিলি ভ্যান:** **SAR 200 – SAR 260 (~BDT 6,500 – 8,450)**।

৩. মক্কা থেকে তায়েফ ডে-ট্রিপ এবং মদিনা থেকে বদর প্রান্তর ভ্রমণের নিয়ম ও খরচ
অপশন ১: মক্কা থেকে সবুজ পাহাড়ি শহর তায়েফ ডে-ট্রিপ (৬–৭ ঘণ্টা রাউন্ডট্রিপ):
- মক্কা থেকে ৯০ কিমি পূর্বে মনোরম **আল-হাদা পাহাড়ি সড়ক (Al Hada Ring Road)** দিয়ে তায়েফে গিয়ে **মসজিদে আব্দুল্লাহ ইবনে আব্বাস (রা.)**, **মসজিদে আদ্দাস**, **গোলাপ জলের ফ্যাক্টরি**, **আল-হাদা কেবল কার** এবং **মিকাত কারনুল মানাজিল (আস-সাইল আল-কাবির)** ঘুরে দেখা যায়।
- **তায়েফ প্রাইভেট গাড়ি ভাড়া (যাওয়া-আসা):** ৪-সিটার সেডান **SAR 350 – 450 (~BDT 11,400 – 14,600)** এবং ৭-সিটার ফ্যামিলি ভ্যান **SAR 550 – 650**।
অপশন ২: মদিনা থেকে ঐতিহাসিক বদর প্রান্তর জিয়ারত (মদিনা থেকে ১৫০ কিমি দক্ষিণ-পশ্চিমে):
- বদর যুদ্ধের শহীদ সাহাবীদের স্মৃতিস্তম্ভ ও **মসজিদে আরিশ** জিয়ারতের জন্য মদিনা থেকে ৪ ঘণ্টার প্রাইভেট কার ভাড়া **SAR 280 – 350**।`,
    internalLinks: [
      { text: "মক্কা ও মদিনার হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "বয়স্ক মা-বাবাকে নিয়ে ওমরাহ: হুইলচেয়ার ও স্কুটার গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "সম্পূর্ণ DIY Umrah ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "জেদ্দা, মক্কা ও মদিনায় ফিক্সড-রেটে প্রাইভেট ফ্যামিলি কার বুক করুন",
      body: "রাস্তায় ট্যাক্সি চালকদের সাথে দরদাম না করে আগে থেকেই ৪-সিটার সেডান বা ৭-সিটার ফ্যামিলি ভ্যান অনলাইনে বা আমাদের BDT ডেস্কে বুক করুন।",
    },
  },
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": {
    title: "একই ট্রিপে Umrah + Dubai ভ্রমণ গাইড (2026): ঢাকা থেকে ১০ দিনে মক্কা, মদিনা ও দুবাই ঘোরার মাল্টি-সিটি বাজেট",
    summary:
      "দুটি আলাদা বিদেশ ভ্রমণের জন্য দুইবার বিমান ভাড়া না দিয়ে একটিমাত্র Multi-City টিকিটেই (ঢাকা -> জেদ্দা/মদিনা -> দুবাই -> ঢাকা) পরিবারের সাথে ৭ দিনের পবিত্র ওমরাহ এবং ফেরার পথে ৩ দিনের দুবাই ও আবুধাবি ফ্যামিলি ট্যুর সম্পন্ন করা যায়! সৌদি Nusuk (nusuk.sa) এবং সংযুক্ত আরব আমিরাত সরকারের (u.ae / gdrfad.gov.ae) ভিসা নিয়ম অনুযায়ী সাজানো এই গাইডে জানুন কীভাবে জনপ্রতি ৩৫,০০০+ টাকা বিমান ভাড়া সাশ্রয় করবেন।",
    category: "Ziyarah & Stopovers",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৮ মিনিট পড়া",
    content: `বাংলাদেশি মধ্যবিত্ত ও উচ্চ-মধ্যবিত্ত পরিবারগুলোর কাছে বর্তমানে সবচেয়ে জনপ্রিয় কম্বো রুট হলো **৭ দিনের মক্কা-মদিনা ওমরাহ + ৩ দিনের দুবাই ফ্যামিলি হলিডে**। কারণ সৌদি আরব থেকে সংযুক্ত আরব আমিরাত (দুবাই বা শারজাহ) ফ্লাইটে যেতে সময় লাগে মাত্র ২ ঘণ্টা ৪৫ মিনিট এবং এতে আলাদা করে ঢাকা–দুবাই রিটার্ন টিকিট কাটার প্রয়োজন হয় না।

১. MULTI-CITY টিকিটে (DAC -> JED/MED -> DXB -> DAC) কত টাকা সাশ্রয় হয়?
চলুন আলাদা দুটি ট্রিপ বনাম ১টি মাল্টি-সিটি কম্বো টিকিটের হিসাব দেখি:
- **আলাদা দুটি ট্রিপ করলে:** ঢাকা–সৌদি রিটার্ন (**BDT 72,000**) + ঢাকা–দুবাই রিটার্ন (**BDT 56,000**) = শুধু বিমান ভাড়াতেই **BDT 1,28,000** খরচ।
- **১টি Multi-City কম্বো টিকিট কাটলে:**
  • **১ম ফ্লাইট:** ঢাকা (DAC) -> জেদ্দা (JED) বা মদিনা (MED)
  • **২য় ফ্লাইট:** মদিনা (MED) বা জেদ্দা (JED) -> দুবাই (DXB) বা শারজাহ (SHJ)
  • **৩য় ফ্লাইট:** দুবাই (DXB) / শারজাহ (SHJ) -> ঢাকা (DAC)
  • **মোট মাল্টি-সিটি বিমান ভাড়া:** Emirates, flydubai, Air Arabia বা Saudia-তে জনপ্রতি মাত্র **BDT 78,000 – BDT 94,000**—অর্থাৎ জনপ্রতি **৩৪,০০০ থেকে ৪৫,০০০ টাকা সরাসরি সাশ্রয়**!

২. এই কম্বো ট্যুরের জন্য বাংলাদেশি পাসপোর্টে কোন ২টি ভিসা লাগবে?
ধাপ ১: সৌদি ওমরাহ ভিসা (nusuk.sa / ksavisa.sa):
- **অপশন ক — ৯০ দিনের স্ট্যান্ডার্ড Umrah e-Visa:** ২–৪ কার্যদিবসে অনুমোদন, খরচ **BDT 15,500 – 19,500**।
- **অপশন খ — ৯৬ ঘণ্টার Saudi Stopover Visa:** যোগ্য Saudia বা flynas ইটিনারারিতে টিকিট বুক করার সময় ৯৬ ঘণ্টার stopover যোগ করা যায়। কোনো নির্দিষ্ট দাম কোথাও প্রকাশিত নেই—ভিসা, ইনস্যুরেন্স ও সার্ভিস চার্জ এয়ারলাইন্সের checkout-এ হিসাব হয় ও বদলায়; হোটেল রাত অন্তর্ভুক্ত ধরে বুকবেন না। পেমেন্টের আগে ৯৬ ঘণ্টার stopover গাইডে বর্তমান শর্ত দেখে নিন।
ধাপ ২: দুবাই / UAE ভিসা (u.ae / gdrfad.gov.ae):
- **অপশন ক — ৯৬ ঘণ্টার (৪ দিন) UAE Transit Visa:** Emirates বা flydubai ফ্লাইটের যাত্রীদের জন্য খরচ মাত্র **~AED 180 – 250 (~BDT 6,200 – 8,500)**।
- **অপশন খ — ৩০ দিনের UAE Tourist e-Visa:** যেকোনো এয়ারলাইন্সে ৩–৭ দিন দুবাই ও আবুধাবি ঘোরার জন্য খরচ **BDT 14,500 – 17,500**।

৩. ১০ দিনের আদর্শ মক্কা + মদিনা + দুবাই ট্যুর প্ল্যান ও মোট BDT বাজেট
- **দিন ১ থেকে ৪ (মক্কা — ৪ রাত):** জেদ্দায় নেমে ওমরাহ পালন, মসজিদুল হারামে নামাজ এবং মক্কার ঐতিহাসিক স্থান জিয়ারত।
- **দিন ৫ থেকে ৭ (মদিনা — ৩ রাত):** হারামাইন বুলেট ট্রেনে মদিনা গমন, Nusuk পারমিট দিয়ে রিয়াজুল জান্নাতে নামাজ এবং মসজিদে কুবা ও উহুদ জিয়ারত।
- **দিন ৮ থেকে ১০ (দুবাই ও আবুধাবি — ৩ রাত):** মদিনা বা জেদ্দা থেকে দুবাই ফ্লাইট। দুবাইয়ের **Deira (Al Rigga Metro)** হোটেলে অবস্থান, বিকেলে **Desert Safari with BBQ Dinner**, পরদিন **Burj Khalifa, Dubai Mall ও Museum of the Future** এবং শেষ দিন **আবুধাবি শেখ জায়েদ গ্র্যান্ড মসজিদ** ঘুরে ঢাকায় প্রত্যাবর্তন!
- **১০ দিনের মোট জনপ্রতি বাজেট (৪ জনের পরিবার শেয়ারে):** সব ফ্লাইট, ২টি ভিসা, ১০ রাত হোটেল, ট্রেন ও ডেজার্ট সাফারিসহ জনপ্রতি **BDT 1,58,000 – BDT 1,85,000**।`,
    internalLinks: [
      { text: "দুবাই থেকে আবুধাবি শেখ জায়েদ গ্র্যান্ড মসজিদ ডে-ট্রিপ গাইড", path: "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide" },
      { text: "৯৬ ঘণ্টার Saudi Stopover Visa ওমরাহ গাইড", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "দুবাই ভ্রমণ প্ল্যান ও UAE ভিসা গাইড", path: "/destinations/dubai-guide" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "দুবাই Desert Safari, Burj Khalifa ও Dhow Cruise টিকিটে ২৫% পর্যন্ত ছাড়",
      body: "মদিনা বা জেদ্দা থেকে দুবাই যাওয়ার আগেই Klook-এ ভেরিফাইড মোবাইল টিকিট বুক করে কাউন্টারের লম্বা লাইন ও অতিরিক্ত খরচ এড়ান।",
    },
  },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    title: "দুবাই থেকে আবুধাবি ডে-ট্রিপ গাইড (2026): শেখ জায়েদ গ্র্যান্ড মসজিদ, কাসর আল ওয়াতান ও লুভর মিউজিয়াম",
    summary:
      "সংযুক্ত আরব আমিরাত ভ্রমণে গিয়ে আবুধাবির বিশ্ববিখ্যাত সাদা মার্বেলের শেখ জায়েদ গ্র্যান্ড মসজিদ (Sheikh Zayed Grand Mosque) না দেখলে সফরই অপূর্ণ থেকে যায়। দুবাই থেকে মাত্র ৯০ মিনিটের দূরত্বে অবস্থিত আবুধাবিতে হোটেল পরিবর্তন না করেই মাত্র ১ দিনের ডে-ট্রিপে ঘুরে আসা যায়। শেখ জায়েদ গ্র্যান্ড মস্ক সেন্টার (szgmc.gov.ae) এবং দুবাই RTA (rta.ae)-এর অফিশিয়াল তথ্য অনুযায়ী জানুন ২৫ দিরহামের E100/E101 বাস, মসজিদে ফ্রি এন্ট্রি QR পাস ও ড্রেস কোড এবং কাসর আল ওয়াতান প্রাসাদের টিকিট গাইড।",
    category: "Ziyarah & Stopovers",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `দুবাই ভ্রমণে বা ওমরাহ পরবর্তী স্টপওভারে থাকা বাংলাদেশি পরিবারগুলোর কাছে সবচেয়ে প্রিয় একদিনের ভ্রমণ হলো **আবুধাবি ডে-ট্রিপ (Abu Dhabi Day Trip)**। আধুনিক ইসলামিক স্থাপত্যের অনন্য নিদর্শন **শেখ জায়েদ গ্র্যান্ড মসজিদ** এবং রাজকীয় **কাসর আল ওয়াতান (Qasr Al Watan)** একই দিনে খুব সহজে ঘুরে দেখা যায়।

১. দুবাই থেকে কম খরচে আবুধাবি যাওয়ার উপায় (RTA E100/E101 বাস বনাম প্রাইভেট কার)
দুবাইয়ের **Roads and Transport Authority (rta.ae)**-এর নিয়ম অনুযায়ী দুটি সরকারি ইন্টারসিটি এসি কোচ প্রতি ১৫–২০ মিনিট পরপর আবুধাবি যাতায়াত করে:
অপশন ১: মাত্র ২৫ দিরহামে RTA E100 এবং E101 বাস (বাজেট ভ্রমণকারীদের জন্য সেরা):
- **রুট E100 (Al Ghubaiba Bus Station, Bur Dubai থেকে):** আপনি যদি Deira বা Bur Dubai-তে থাকেন, তবে আল গুবাইবা স্টেশন থেকে সরাসরি E100 বাসে উঠুন।
- **রুট E101 (Ibn Battuta Metro Bus Station থেকে):** সবচেয়ে দ্রুত রুট (মাত্র ৮৫–৯০ মিনিট)। দুবাই মেট্রোর রেড লাইনে Ibn Battuta স্টেশনে নেমে পাশের বাস টার্মিনাল থেকে E101 বাসে উঠুন।
- **ভাড়া ও পেমেন্ট:** প্রতি পথে জনপ্রতি মাত্র **AED 25 (~BDT 850)**, যা আপনার দুবাই মেট্রোর **Silver Nol Card** পাঞ্চ করেই পরিশোধ করা যায় (যাওয়া-আসার জন্য কার্ডে অন্তত ৫০ দিরহাম ব্যালেন্স রাখুন)।
- **আবুধাবি বাস স্টেশন থেকে মসজিদে যাওয়া:** আবুধাবি সেন্ট্রাল বাস স্টেশন থেকে লোকাল **Bus 094 (ভাড়া AED 2)** অথবা মিটার ট্যাক্সিতে (**AED 30–35**) সরাসরি মসজিদে পৌঁছে যাবেন।
অপশন ২: পরিবারের জন্য প্রাইভেট গাড়ি অথবা Klook ডে-ট্রিপ বাস:
- ৪ থেকে ৬ জনের পরিবার বা বয়স্ক মা-বাবা সাথে থাকলে দুবাই হোটেল থেকে পিকআপসহ **Klook Abu Dhabi Mosque & Qasr Al Watan Day Tour (~BDT 4,200/জন)** অথবা সারাদিনের প্রাইভেট কার (**AED 450–550**) নেওয়া সবচেয়ে আরামদায়ক।

২. শেখ জায়েদ গ্র্যান্ড মসজিদে ফ্রি এন্ট্রি QR রেজিস্ট্রেশন ও ড্রেস কোড (szgmc.gov.ae)
নিয়ম ১: প্রবেশ ফি সম্পূর্ণ ফ্রি (AED 0):
- শেখ জায়েদ গ্র্যান্ড মসজিদে প্রবেশ করতে কোনো টাকা লাগে না। অফিশিয়াল ওয়েবসাইট **visit.szgmc.gov.ae**-তে অথবা মসজিদের আন্ডারগ্রাউন্ড গ্লাস ডোম এন্ট্রান্সের ডিজিটাল কিয়স্কে ২ মিনিটে নাম ও ইমেইল দিয়ে **Free Entry QR Pass** নিয়ে নিন।
নিয়ম ২: কঠোর শালীন পোশাকের নিয়ম (Modest Dress Code):
- **নারীদের জন্য:** মাথার চুল ওড়না/হিজাব দিয়ে সম্পূর্ণ ঢাকা থাকতে হবে এবং ঢিলেঢালা, অস্বচ্ছ পোশাক পরতে হবে যা হাতের কব্জি ও পায়ের গোড়ালি পর্যন্ত ঢেকে রাখে (আবায়া বা ফুল-স্লিভ ম্যাক্সি/সালোয়ার-কামিজ)। উল্লেখ্য: বর্তমানে গেটে ফ্রি আবায়া দেওয়া হয় না, তাই হোটেল থেকেই বোরকা/আবায়া বা পূর্ণ হাতা ঢিলেঢালা পোশাক পরে যাবেন।
- **পুরুষদের জন্য:** ফুল প্যান্ট এবং কাঁধ ঢাকা শার্ট বা টি-শার্ট (হাফ প্যান্ট বা স্লিভলেস গেঞ্জি পরে প্রবেশ নিষিদ্ধ)।

৩. একই দিনে কাসর আল ওয়াতান (প্রেসিডেন্সিয়াল প্যালেস) ও লুভর আবুধাবি ঘোরার রুটিন
- **সকাল ১০:০০ – দুপুর ১২:৩০:** **Qasr Al Watan (UAE-এর রাজকীয় প্রেসিডেন্সিয়াল প্যালেস)** ও এর বিশাল ইসলামিক লাইব্রেরি পরিদর্শন (**টিকিট: ~AED 65 / BDT 2,200**)।
- **দুপুর ১:৩০ – বিকেল ৩:৩০:** সাদিয়াত আইল্যান্ডের **Louvre Abu Dhabi** পরিদর্শন ও আল ওয়াহদা মলে হালাল লাঞ্চ।
- **বিকেল ৪:৩০ – সন্ধ্যা ৭:০০ (গোল্ডেন আওয়ার):** বিকেল ৪:৩০-এ শেখ জায়েদ গ্র্যান্ড মসজিদে প্রবেশ করুন—যাতে দিনের আলো, সূর্যাস্তের সোনালী আভা এবং মাগরিবের পর নীল আলোর জাদুকরী সৌন্দর্য একসাথে দেখতে পান! (টিপস: মসজিদ ও প্রাসাদের সিকিউরিটি গেটে বড় স্যুটকেস নিয়ে প্রবেশ নিষিদ্ধ, তাই শেষ দিনে হোটেল চেক-আউট করে আবুধাবি গেলে বাসে ওঠার আগে Ibn Battuta বা আবুধাবি বাস স্টেশনের কাছে **Radical Storage**-এ ব্যাগ জমা রাখুন।)`,
    internalLinks: [
      { text: "একই ট্রিপে Umrah + Dubai ১০ দিনের মাল্টি-সিটি গাইড", path: "/blog/umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide" },
      { text: "দুবাই ও আবুধাবি Attraction Passes হাব (Klook)", path: "/experiences?region=asia&city=dubai-klook" },
      { text: "দুবাই, কুয়ালালামপুর ও ব্যাংককে হোটেল খরচ বাঁচানোর গাইড", path: "/blog/hotel-savings-guide-bangkok-kl-dubai" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "দুবাই হোটেল থেকে আবুধাবি গ্র্যান্ড মসজিদ ও কাসর আল ওয়াতান কম্বো ট্যুর বুক করুন",
      body: "বাস পরিবর্তনের ঝামেলা এড়াতে সরাসরি দুবাই হোটেল পিকআপসহ আবুধাবি ডে-ট্রিপ অথবা Qasr Al Watan ও Ferrari World টিকিট বুক করুন।",
    },
  },
  "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": {
    title: "মালয়েশিয়া ইসলামিক হেরিটেজ ও হালাল ফ্যামিলি ট্যুর (2026): পুত্রজায়া পিঙ্ক মসজিদ, ইসলামিক আর্টস মিউজিয়াম ও KLCC",
    summary:
      "মালয়েশিয়া ধারাবাহিকভাবে বিশ্বের ১ নম্বর মুসলিম-বান্ধব ভ্রমণ গন্তব্য (Global Muslim Travel Index #1) হিসেবে স্বীকৃত, কারণ এখানকার প্রতিটি শপিং মল, থিম পার্ক ও মেট্রো স্টেশনে পরিচ্ছন্ন অজুখানাসহ নামাজের স্থান (Surau) এবং সরকারি JAKIM সনদপ্রাপ্ত শতভাগ হালাল খাবার রয়েছে। ট্যুরিজম মালয়েশিয়া (malaysia.travel), JAKIM (islam.gov.my) ও RapidKL-এর তথ্য অনুযায়ী সাজানো এই গাইডে জানুন কীভাবে মাত্র ৬ রিঙ্গিতে (১৬৫ টাকা) পুত্রজায়া পিঙ্ক মসজিদ, ইসলামিক আর্টস মিউজিয়াম ও KLCC ঘুরবেন।",
    category: "Ziyarah & Stopovers",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `বাংলাদেশি পরিবার, বয়স্ক মা-বাবা এবং শিশুদের নিয়ে শতভাগ হালাল ও স্বস্তিদায়ক বিদেশ ভ্রমণের জন্য **মালয়েশিয়া (কুয়ালালামপুর, পুত্রজায়া ও গেন্টিং হাইল্যান্ডস)** নিঃসন্দেহে সেরা। এখানে খাবারের হালাল মান নিয়ন্ত্রণ করে সরকারি সংস্থা **Department of Islamic Development Malaysia (JAKIM - islam.gov.my)** এবং প্রতিটি শপিং মলে সুন্দর কার্পেট বিছানো **Surau (নামাজের কক্ষ)** রয়েছে।

১. মাত্র ৬ রিঙ্গিতে (BDT 165) কুয়ালালামপুর থেকে পুত্রজায়া পিঙ্ক মসজিদ ও লেক ক্রুজ ভ্রমণ
কুয়ালালামপুর থেকে ৩০ কিমি দক্ষিণে অবস্থিত মালয়েশিয়ার সাজানো-গোছানো প্রশাসনিক রাজধানী **Putrajaya**:
ধাপ ১: KLCC থেকে সরাসরি MRT Putrajaya Line (Yellow Line 12) ট্রেনে যান:
- ১২০ রিঙ্গিত ট্যাক্সি ভাড়া না দিয়ে **Persiaran KLCC** বা **Conlay MRT Station** থেকে সরাসরি **MRT Putrajaya Line**-এ উঠে **Putrajaya Sentral** স্টেশনে নামুন (সময় ৩৫ মিনিট, ভাড়া মাত্র **~MYR 5.40 / BDT 150**)।
- স্টেশন থেকে মাত্র ৮–১০ রিঙ্গিতে (**BDT 240**) ৭ মিনিটের Grab কারে চলে যান সরাসরি **Dataran Putra (পিঙ্ক মসজিদ চত্বরে)**।
ধাপ ২: মসজিদে পুত্রা (Pink Mosque) ও পুত্রজায়া লেক ক্রুজ উপভোগ:
- গোলাপি গ্রানাইট পাথরে নির্মিত হ্রদের পাড়ের **Masjid Putra** দেখার জন্য কোনো এন্ট্রি ফি লাগে না (নারীদের জন্য গেটে ফ্রি মেরুন হুডেড রোব বা আবায়া দেওয়ার ব্যবস্থা রয়েছে)।
- মসজিদের নিচের ঘাট থেকে ৪৫ মিনিটের শীতাতপ নিয়ন্ত্রিত **Cruise Tasik Putrajaya** বা ঐতিহ্যবাহী নৌকায় (**MYR 30–50 / BDT 820–1,380**) লেক ভ্রমণ করুন, যা থেকে প্রধানমন্ত্রীর কার্যালয় (Perdana Putra) ও আয়রন মসজিদ দেখা যায়।

২. কুয়ালালামপুরের ISLAMIC ARTS MUSEUM MALAYSIA (IAMM) ও জাতীয় মসজিদ (MASJID NEGARA)
KL Sentral থেকে মাত্র ৫ মিনিট দূরত্বে বোটানিক্যাল গার্ডেনের পাশে অবস্থিত:
- **Islamic Arts Museum Malaysia (iamm.org.my):** এশিয়ার সর্বশ্রেষ্ঠ ইসলামিক জাদুঘর, যেখানে ১২টি বিশাল গ্যালারিতে **পবিত্র মসজিদুল হারাম (মক্কা), মসজিদে নববী (মদিনা) ও মসজিদুল আকসার** নিখুঁত স্থাপত্য মডেল এবং উসমানীয়, মুঘল ও মালয় আমলের দুর্লভ কুরআনের পাণ্ডুলিপি সংরক্ষিত আছে (**টিকিট: প্রাপ্তবয়স্ক MYR 20 / ~BDT 550; শিক্ষার্থী MYR 10**)।
- **Masjid Negara (মালয়েশিয়ার জাতীয় মসজিদ):** জাদুঘরের ঠিক সামনেই ফুটব্রিজ পার হয়ে ১৬-কোণা নীল ছাতার আকৃতির গম্বুজবিশিষ্ট জাতীয় মসজিদে জোহর বা আসরের নামাজ আদায় করুন (**প্রবেশ ফ্রি**)।

৩. কুয়ালালামপুরে পরিবারের থাকার সেরা জোন, হালাল খাবার ও ৫ দিনের BDT বাজেট
- **কোথায় থাকবেন:** পরিবারের জন্য সুইমিং পুল ও রান্নাঘরসহ সার্ভিসড অ্যাপার্টমেন্ট নিতে চাইলে **KLCC Twin Towers** এলাকা এবং শপিং ও খাবারের জন্য **Bukit Bintang** সেরা (**ভাড়া: BDT 4,200 – 8,500/রাত**)।
- **সেরা হালাল খাবার:** Suria KLCC Level 2 Food Court (**MYR 15–25**), Bukit Bintang-এর **Damascus ও Halab Gate** এরাবিয়ান রেস্টুরেন্ট এবং **Masjid India** এলাকার দেশি ভাত-মাছ ও বিরিয়ানি।
- **৫ দিনের মোট মালয়েশিয়া ফ্যামিলি বাজেট:** ঢাকা–KL রাউন্ডট্রিপ ফ্লাইট, অনলাইন e-Visa (ফ্রি MDAC সহ), ৪ রাত হোটেল, পুত্রজায়া ও Genting Highlands কেবল কারসহ জনপ্রতি **BDT 66,000 – BDT 82,000**।`,
    internalLinks: [
      { text: "মালয়েশিয়া ৫ দিনের ট্যুর প্ল্যান ও e-Visa গাইড", path: "/destinations/malaysia-guide" },
      { text: "ঢাকা থেকে সেরা ৬টি বাজেট-বান্ধব ফ্যামিলি গন্তব্য", path: "/blog/top-budget-family-destinations-from-dhaka" },
      { text: "কুয়ালালামপুর, ব্যাংকক ও দুবাইয়ে হোটেল সাশ্রয় গাইড", path: "/blog/hotel-savings-guide-bangkok-kl-dubai" },
    ],
    affiliateCTA: {
      provider: "kkday",
      headline: "মালয়েশিয়া ও Genting Highlands পাসে ৩০% ছাড় + Buy 1 Get 1 (KKday 9.9 Sale)",
      body: "Petronas Twin Towers, Genting Awana SkyWay Cable Car, Aquaria KLCC এবং KLIA Ekspres ট্রেনের টিকিটে ৩০% পর্যন্ত ছাড় নিন।",
    },
  },
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    title: "ইউরোপ, লন্ডন ও আমেরিকা ভ্রমণে বাংলাদেশিদের গাইড (2026): স্কিপ-দ্য-লাইন পাস ও ১ বছরের সৌদি ই-ভিসা সুবিধা",
    summary:
      "বাংলাদেশ থেকে লন্ডন, প্যারিস, রোম, মিলান, ভেনিস বা নিউ ইয়র্কগামী ভ্রমণকারী ও প্রবাসী (NRB) পরিবারগুলোর জন্য দুটি বিশাল সুবিধা রয়েছে: প্রথমত, প্যারিসের লুভর মিউজিয়াম, আইফেল টাওয়ার, লন্ডন আই বা রোমের কলোসিয়ামে ২–৩ ঘণ্টার দীর্ঘ লাইন এড়াতে অফিশিয়াল Tiqets স্কিপ-দ্য-লাইন পাস প্রি-বুকিং; এবং দ্বিতীয়ত, পাসপোর্টে থাকা বৈধ US, UK বা Schengen ভিসা ব্যবহার করে ফেরার পথে ১ বছরের মাল্টিপল-এন্ট্রি সৌদি ই-ভিসা বা অন-অ্যারাইভাল ভিসা নিয়ে ওমরাহ পালন! সৌদি ভিসা পোর্টাল (ksavisa.sa) ও ইউরোপীয় মিউজিয়াম নিয়ম অনুযায়ী বিস্তারিত গাইড।",
    category: "Ziyarah & Stopovers",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `প্রতি মাসে হাজার হাজার বাংলাদেশি পেশাজীবী, ব্যবসায়ী, শিক্ষার্থী ও অভিভাবক **ঢাকা (DAC)** থেকে **লন্ডন, প্যারিস, রোম ও নিউ ইয়র্কে** ভ্রমণ করেন। সঠিক পরিকল্পনা করলে আপনি একই সফরে ইউরোপ-আমেরিকার বিশ্বখ্যাত দর্শনীয় স্থানগুলো লাইন ছাড়া ঘোরার পাশাপাশি সৌদি আরবের বিশেষ ভিসা সুবিধায় পবিত্র ওমরাহও পালন করতে পারেন।

১. বৈধ US, UK বা SCHENGEN ভিসা থাকলে কীভাবে তাৎক্ষণিক ১ বছরের সৌদি ই-ভিসা পাবেন?
সৌদি আরবের অফিশিয়াল ভিসা পোর্টাল (**ksavisa.sa**) এবং সৌদি পর্যটন মন্ত্রণালয়ের (**visitsaudi.com**) নিয়ম অনুযায়ী:
নিয়ম ১: বাংলাদেশি পাসপোর্টধারীদের জন্য বিশেষ ভিসা সুবিধা:
- আপনার বাংলাদেশি পাসপোর্টে যদি একটি **বৈধ ও মেয়াদযুক্ত US, UK অথবা Schengen (ট্যুরিস্ট বা বিজনেস) ভিসা** থাকে এবং সেই ভিসাটি দিয়ে অন্তত একবার সংশ্লিষ্ট দেশে প্রবেশের স্ট্যাম্প (Used Stamp) থাকে—তবে আপনার কোনো এজেন্সির মাধ্যমে ওমরাহ ভিসা করার প্রয়োজন নেই!
নিয়ম ২: অনলাইনে ১০ মিনিটে ১ বছরের মাল্টিপল-এন্ট্রি e-Visa বা Visa on Arrival:
- আপনি সরাসরি **ksavisa.sa** পোর্টালে আবেদন করে অথবা জেদ্দা/মদিনা এয়ারপোর্টে নেমে **~SAR 395 – 440 (~BDT 12,900 – 14,500 ইনস্যুরেন্সসহ)** ফি দিয়ে **১ বছরের মাল্টিপল-এন্ট্রি সৌদি ভিসা** নিতে পারেন এবং Nusuk অ্যাপে পারমিট নিয়ে ওমরাহ ও রওজা শরীফ জিয়ারত করতে পারেন।
- **স্মার্ট ফ্লাইট কৌশল:** ঢাকা থেকে লন্ডন, প্যারিস বা নিউ ইয়র্কে প্রবেশের পর (যাতে ভিসাটি Used হয়ে যায়), দেশে ফেরার টিকিটটি **জেদ্দা (JED) বা মদিনা (MED)** হয়ে কাটুন!

২. প্যারিস, লন্ডন, রোম ও নিউ ইয়র্কে কেন আগে থেকেই SKIP-THE-LINE পাস বুক করতে হয়?
ইউরোপ ও আমেরিকার শীর্ষ মিউজিয়ামগুলোতে এশিয়ার মতো গিয়েই কাউন্টার থেকে টিকিট পাওয়া যায় না—সবই **Timed-Entry Slot** অনুযায়ী চলে:
- **🇫🇷 প্যারিস, ফ্রান্স (Louvre Museum, Eiffel Tower ও Seine River Cruise):**
  • লুভর মিউজিয়াম (louvre.fr) ও আইফেল টাওয়ারের টিকিট ২–৩ সপ্তাহ আগেই শেষ হয়ে যায়। অফিশিয়াল **Tiqets Paris Pass (~€42–€68 / BDT 5,500–8,900)** প্রি-বুক করলে মোবাইলের QR কোড দেখিয়ে ২.৫ ঘণ্টার লাইন ছাড়াই সরাসরি পিরামিড গেট দিয়ে প্রবেশ করা যায়।
- **🇬🇧 লন্ডন, যুক্তরাজ্য (Tower of London, London Eye ও Thames Cruise):**
  • টাওয়ার অব লন্ডন (ক্রাউন জুয়েলস) এবং টেমস নদী ক্রুজ ও লন্ডন আই ফাস্ট-ট্র্যাক কম্বো পাস (**~£58 / BDT 8,900**) অনলাইনে কাটলে কাউন্টারের চেয়ে ২০% সাশ্রয় হয়।
- **🇮🇹 রোম, মিলান ও ভেনিস, ইতালি (Colosseum, Milan Duomo ও Venice Gondola):**
  • রোমের কলোসিয়াম ও রোমান ফোরাম (**~€24–€38**) এবং মিলান দুওমো রুফটপ লিফট টিকিট যাত্রার অন্তত ১৪ দিন আগে বুক করুন।
- **🇺🇸 নিউ ইয়র্ক সিটি, আমেরিকা (Statue of Liberty ও SUMMIT One Vanderbilt):**
  • স্ট্যাচু অব লিবার্টি ফেরি ও পেডেস্টাল পাস এবং ম্যানহাটনের SUMMIT অবজারভেটরি ডেক বাংলাদেশ থেকে এনডোর্স করা ডুয়াল-কারেন্সি কার্ডে বুক করুন।
- **🧳 মিউজিয়ামে বড় ব্যাগ বহন নিষেধ (লন্ডন, প্যারিস, রোম ও নিউ ইয়র্ক):** লুভর, আইফেল টাওয়ার, কলোসিয়াম ও স্ট্যাচু অব লিবার্টির সিকিউরিটি চেকপয়েন্টে কেবিন স্যুটকেস বা বড় ব্যাকপ্যাক নিয়ে প্রবেশ সম্পূর্ণ নিষিদ্ধ। হোটেল চেক-আউটের পর বা ট্রেন ট্রানজিটের সময় ঘোরার আগে স্টেশনের কাছে ভেরিফায়েড **Radical Storage** লাগেজ পয়েন্টে ব্যাগ জমা রেখে মিউজিয়ামে প্রবেশ করুন।

৩. ইউরোপ ও যুক্তরাজ্যের ফ্লাইট ৩+ ঘণ্টা বিলম্ব হলে €600 (BDT 78,000) ক্ষতিপূরণ পাওয়ার নিয়ম
- **EU261 ও UK261 যাত্রী অধিকার আইন:** লন্ডন, প্যারিস, রোম, ফ্রাঙ্কফুর্ট বা আমস্টারডাম থেকে ছেড়ে আসা ফ্লাইট যদি ৩ ঘণ্টার বেশি দেরি (Delay) হয় বা বাতিল (Cancelled) হয়, তবে ইউরোপীয় আইন অনুযায়ী আপনি **AirHelp**-এর মাধ্যমে জনপ্রতি সর্বোচ্চ **€600 বা £520 (~BDT 78,000)** পর্যন্ত নগদ ক্ষতিপূরণ দাবি করতে পারেন!`,
    internalLinks: [
      { text: "ইউরোপ, UK ও USA-এর অফিশিয়াল Tiqets পাস হাব দেখুন", path: "/experiences?region=west" },
      { text: "৯৬ ঘণ্টার Saudi Stopover Visa ও US/UK/Schengen ওমরাহ গাইড", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
    ],
    affiliateCTA: {
      provider: "tiqets",
      headline: "প্যারিস, লন্ডন, রোম ও নিউ ইয়র্কের অফিশিয়াল Skip-the-Line পাস বুক করুন (Tiqets)",
      body: "Louvre Museum, Eiffel Tower, London Eye, Colosseum এবং Statue of Liberty-এর তাৎক্ষণিক মোবাইল QR টিকিট বুক করে দীর্ঘ লাইন এড়ান।",
    },
  },

  "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": {
    title: "ওমরাহ ও হালাল ভ্রমণের জন্য বাংলাদেশের সেরা শরীয়াহ-সম্মত ইসলামিক Dual-Currency Card তুলনা (2026)",
    summary:
      "ওমরাহ, হজ বা হালাল ফ্যামিলি ট্যুরের প্রস্তুতির সময় ধর্মপ্রাণ বাংলাদেশি মুসলমানরা সুদযুক্ত (Riba) সাধারণ ক্রেডিট কার্ড ব্যবহার না করে ১০০% শরীয়াহ-সম্মত উপায়ে Haramain High-Speed Bullet Train (sar.hhr.sa), মক্কা-মদিনার হোটেল ও আন্তর্জাতিক বিমান টিকিট কাটতে চান। বাংলাদেশ ব্যাংকের ইসলামিক ব্যাংকিং নীতিমালা এবং বার্ষিক $18,000 USD পাসপোর্ট ট্রাভেল কোটার (FE Circular No. 33) অধীনে দেশের শীর্ষ ইসলামী ব্যাংক ও ইসলামিক ব্যাংকিং উইন্ডোগুলো এখন সুদমুক্ত মুদারাবা ও উজরাহ-ভিত্তিক Dual-Currency Debit, Prepaid ও Khidmah কার্ড ইস্যু করছে। জানুন ২০২৬ সালের সেরা ৫টি ইসলামিক ডুয়াল-কারেন্সি কার্ডের তুলনা ও ব্যবহারের নিয়ম।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `পবিত্র **মক্কা ও মদিনায়** ওমরাহ বা হজ সফরে যাওয়ার সময় প্রতিটি টাকার লেনদেন যেন ১০০% সুদমুক্ত (**Riba-Free**) ও হালাল থাকে, তা নিশ্চিত করা প্রত্যেক হাজীর একান্ত কাম্য। আশার কথা হলো—অনলাইনে **Haramain বুলেট ট্রেনের টিকিট, জাবাল ওমরের হোটেল বা ওমরাহর বিমান টিকিট** কাটার জন্য সুদভিত্তিক ক্রেডিট কার্ডের কোনো প্রয়োজন নেই। **বাংলাদেশ ব্যাংকের (bb.org.bd)** নিয়ম অনুযায়ী আপনি আপনার পাসপোর্টের **$18,000 USD বার্ষিক ট্রাভেল কোটা (FE/PD-1 Circular No. 33)** যেকোনো **শরীয়াহ-সম্মত ইসলামিক ডুয়াল-কারেন্সি ডেবিট বা প্রিপেইড কার্ডে** এনডোর্স করে নিতে পারেন।

১. শরীয়াহ-সম্মত ইসলামিক কার্ড কীভাবে সুদ (RIBA) থেকে মুক্ত থাকে?
সাধারণ ক্রেডিট কার্ডে নির্দিষ্ট তারিখের মধ্যে বিল পরিশোধ না করলে ২০%–২৭% চক্রবৃদ্ধি সুদ (Riba) আরোপিত হয়। বিপরীতে বাংলাদেশের ইসলামিক ব্যাংক ও ইসলামিক ব্যাংকিং উইন্ডোগুলো শরীয়াহ সুপারভাইজরি বোর্ডের তত্ত্বাবধানে দুটি হালাল পদ্ধতিতে আন্তর্জাতিক কার্ড পরিচালনা করে:
নিয়ম ১: মুদারাবা / আল-ওয়াদিয়াহ ডুয়াল-কারেন্সি ডেবিট ও প্রিপেইড কার্ড (১০০% নিজস্ব তহবিল, শূন্য ঋণ):
- আপনি আপনার ইসলামিক ব্যাংক একাউন্টে নিজস্ব **বাংলাদেশি টাকা (BDT)** জমা রাখেন। মক্কা-মদিনায় বা অনলাইনে যখন আপনি **সৌদি রিয়াল (SAR) বা ডলারে (USD)** পেমেন্ট করেন, ব্যাংক তাৎক্ষণিকভাবে আপনার জমা টাকা থেকে নির্ধারিত বিনিময় হারে পেমেন্ট সম্পন্ন করে—এতে কখনোই কোনো সুদের সৃষ্টি হয় না।
নিয়ম ২: বাই-মুরাবাহা / উজরাহ (Ujrah) চার্জ কার্ড (যেমন Khidmah Card):
- এখানে সুদের বদলে শরীয়াহ অনুমোদিত নির্ধারিত বার্ষিক সার্ভিস ফি (Ujrah) প্রযোজ্য হয় এবং কোনো চক্রবৃদ্ধি সুদের লেনদেন থাকে না।

২. বাংলাদেশের সেরা ৫টি শরীয়াহ-সম্মত ইসলামিক DUAL-CURRENCY CARD (2026 তুলনা)
Haramain Railway (**sar.hhr.sa**), Nusuk, Aviasales এবং সৌদি আরবের POS মেশিনে নির্বিঘ্নে কাজ করে এমন শীর্ষ ৫টি ইসলামিক কার্ড:
- **১. ইসলামী ব্যাংক বাংলাদেশ পিএলসি (IBBL) — Dual-Currency Debit Card ও Khidmah Card:**
  • **কাদের জন্য সেরা:** যাদের ইতিমধ্যে ইসলামী ব্যাংকে মুদারাবা সেভিংস একাউন্ট বা **CellFin অ্যাপ** রয়েছে।
  • **মূল সুবিধা:** ইসলামী ব্যাংকের যেকোনো AD শাখা থেকে পাসপোর্টে **$18,000 USD এনডোর্সমেন্ট** করা যায় এবং মক্কা-মদিনার Al-Rajhi ও SNB POS মেশিনে সরাসরি সৌদি রিয়ালে পেমেন্ট করা যায়।
- **২. দ্য সিটি ব্যাংক (City Islamic) — Islamic American Express ও Visa Dual-Currency Debit Card:**
  • **কাদের জন্য সেরা:** **Citytouch অ্যাপের** মাধ্যমে দ্রুত 3D-Secure অনলাইন পেমেন্ট ও ঢাকা এয়ারপোর্টে বলাকা লাউঞ্জ সুবিধার জন্য।
- **৩. ইস্টার্ন ব্যাংক পিএলসি (EBL Islamic) — Islamic Dual-Currency Visa/Mastercard Debit Card:**
  • **কাদের জন্য সেরা:** **EBL Skybanking অ্যাপ** ও ২৪/৭ হেল্পলাইনের (16230) মাধ্যমে ঝামেলামুক্তভাবে হারামাইন ট্রেন, সৌদিয়া এয়ারলাইন্স ও Airalo eSIM বুকিংয়ের জন্য।
- **৪. আল-আরাফাহ ইসলামী ব্যাংক ও শাহজালাল ইসলামী ব্যাংক (SJIBL) — La-Riba Dual-Currency Card:**
  • **কাদের জন্য সেরা:** পূর্ণাঙ্গ শরীয়াহ ব্যাংকে লেনদেনকারী ব্যবসায়ী ও পরিবারগুলোর জন্য।
- **৫. স্ট্যান্ডার্ড চার্টার্ড সাদিক (Saadiq) ও ব্র্যাক ব্যাংক ইসলামিক (Sabbir) ডেবিট কার্ড:**
  • **কাদের জন্য সেরা:** সৌদি আরব, দুবাই, মালয়েশিয়া ও ইউরোপে সপরিবারে ভ্রমণের জন্য।

৩. ওমরাহ সফরে ইসলামিক কার্ড ব্যবহারের ৩টি অপরিহার্য নিয়ম
ধাপ ১: ব্যাংকের AD শাখায় পাসপোর্ট এনডোর্সমেন্ট করুন:
- আপনার আসল **e-Passport/MRP** এবং **NID** নিয়ে ব্যাংকের ফরেন এক্সচেঞ্জ ডেস্কে গিয়ে পাসপোর্টে ডলার এনডোর্সমেন্ট সিল নিন।
ধাপ ২: অনলাইন বুকিংয়ের আগে USD E-Commerce ও 3D-Secure চালু করুন:
- **sar.hhr.sa** বা এয়ারলাইন্সের ওয়েবসাইটে পেমেন্ট করার ৩০ মিনিট আগে ব্যাংক অ্যাপ বা কল সেন্টারে ফোন করে **USD Foreign Currency + 3D-Secure OTP** চালু করে নিন।
ধাপ ৩: মক্কা ও মদিনার দোকানে সবসময় "SAR" (Saudi Riyal) সিলেক্ট করুন:
- **Al Baik, Bin Dawood সুপারমার্কেট বা ফার্মেসিতে** কার্ড পাঞ্চ করার সময় মেশিনে সবসময় **Local Currency (SAR)** সিলেক্ট করবেন—এতে ৫% অতিরিক্ত DCC চার্জ কাটবে না।`,
    internalLinks: [
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "মক্কা ও মদিনা হোটেল জোন এবং Haramain বুলেট ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "কার্ড নেই? bKash বা ব্যাংক ট্রান্সফারে ফ্লাইট ও হোটেল বুক করুন", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "১০ দিনের DIY Umrah BDT বাজেট ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "আপনার ইসলামিক কার্ড দিয়ে ঢাকা–জেদ্দা ও মদিনা ফ্লাইট ভাড়া তুলনা করুন",
      body: "বিমান বাংলাদেশ, সৌদিয়া ও গালফ ক্যারিয়ারের লাইভ ভাড়া দেখুন এবং সুদমুক্ত ডুয়াল-কারেন্সি কার্ডে সরাসরি বুক করুন।",
    },
  },

  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    title: "RFCD Account বনাম সাধারণ Travel Quota (2026): অনলাইন পেমেন্টে $300 লিমিট ও কার্ড ডিক্লাইন সমস্যার সমাধান",
    summary:
      "আপনি কি কখনো বাংলাদেশি Dual-Currency Card দিয়ে ৯৫,০০০ টাকার ($780) আন্তর্জাতিক বিমান টিকিট বা মক্কার ফ্যামিলি হোটেল বুক করতে গিয়ে 'Transaction Declined: Exceeds Single Transaction Limit' মেসেজ পেয়েছেন? বাংলাদেশের অনেক ব্যাংক সাধারণ Travel Quota (TQ) কার্ডে ডিফল্টভাবে একক ই-কমার্স লেনদেনে $300 USD ক্যাপ দিয়ে রাখে। বাংলাদেশ ব্যাংকের ফরেন এক্সচেঞ্জ নীতিমালা (bb.org.bd) অনুযায়ী এই সমস্যার দুটি স্থায়ী সমাধান রয়েছে: বিদেশ থেকে ফেরার পর বেঁচে যাওয়া ডলারে RFCD Account খোলা অথবা কল সেন্টারে ফোন করে High-Ticket Travel Limit প্রি-অথরাইজ করা।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `ঢাকা (DAC) থেকে সপরিবারে জেদ্দা, ব্যাংকক বা কুয়ালালামপুরের কম ভাড়ার ফ্লাইট খুঁজে পাওয়ার পর পেমেন্ট পেজে OTP দেওয়ার সাথে সাথে যদি দেখেন **$300 USD (~BDT 36,600)**-এর বেশি হওয়ার কারণে পেমেন্ট ডিক্লাইন হয়েছে—তবে তা অত্যন্ত হতাশাজনক। **বাংলাদেশ ব্যাংকের (bb.org.bd)** নিয়ম অনুযায়ী সাধারণ **Travel Quota (TQ) Card** এবং **Resident Foreign Currency Deposit (RFCD) Account**-এর পার্থক্য জানলে এই সমস্যা চিরতরে সমাধান করা যায়।

১. সাধারণ কার্ডে $300-এর বেশি অনলাইন পেমেন্ট কেন আটকে যায় এবং ৫ মিনিটে সমাধানের উপায় কী?
বাংলাদেশ ব্যাংকের নিয়মে প্রাপ্তবয়স্ক নাগরিকদের বার্ষিক ট্রাভেল কোটা **$18,000 USD (FE Circular No. 33 অনুযায়ী)** হলেও, ডিজিটাল জালিয়াতি রোধে অনেক দেশীয় ব্যাংক সাধারণ BDT-ভিত্তিক কার্ডে **একবারে সর্বোচ্চ $300 থেকে $500 USD ই-কমার্স পেমেন্ট ক্যাপ** সেট করে রাখে:
- **সাধারণ Travel Quota কার্ডে $300+ ফ্লাইট বা হোটেল পেমেন্ট আনলক করার উপায়:**
  • আপনি যখন **EBL, City Bank, BRAC, MTB বা SCB**-এর সাধারণ ডুয়াল-কারেন্সি কার্ড দিয়ে **$600–$2,500 USD** মূল্যের ফ্লাইট টিকিট বা হোটেল বুক করবেন, তখন পেমেন্ট করার **১৫ মিনিট আগে ব্যাংকের ২৪/৭ হটলাইনে কল করুন**।
  • অফিসারকে বলুন: *"আমি আমার এনডোর্স করা পাসপোর্ট ট্রাভেল কোটার অধীনে ভেরিফাইড ট্রাভেল (Airline / Hotel MCC Category) পেমেন্ট করছি। অনুগ্রহ করে আগামী ২৪ ঘণ্টার জন্য আমার Single E-Commerce Transaction Limit বাড়িয়ে $[Amount] USD করে দিন।"*
  • এয়ারলাইন্স এবং হোটেল বুকিং বৈধ ভ্রমণ খাত হওয়ায় ব্যাংক সাথে সাথেই লিমিট রিল্যাক্স করে দেয়।

২. RFCD ACCOUNT কী এবং কেন এটি নিয়মিত ভ্রমণকারীদের জন্য সবচেয়ে বড় আশীর্বাদ?
বাংলাদেশ ব্যাংকের **Resident Foreign Currency Deposit (RFCD)** নীতিমালা অনুযায়ী:
নিয়ম ১: কারা RFCD একাউন্ট খুলতে পারবেন?
- যেকোনো বাংলাদেশি নাগরিক বিদেশ সফর (**সৌদি আরবে ওমরাহ, থাইল্যান্ড/মালয়েশিয়া/সিঙ্গাপুর ভ্রমণ বা বিজনেস ট্রিপ**) শেষে দেশে ফেরার পর তাঁর কাছে বেঁচে যাওয়া নগদ বৈদেশিক মুদ্রা (**USD, GBP, EUR ইত্যাদি**) জমা দিয়ে যেকোনো ব্যাংকের AD শাখায় **RFCD Account** খুলতে পারেন।
নিয়ম ২: কত ডলার জমা দেওয়া যায়?
- এয়ারপোর্টে কাস্টমস ডিক্লারেশন ছাড়াই সর্বোচ্চ **USD $10,000 (দশ হাজার ডলার)** পর্যন্ত এবং **FMJ Form**-এ ঘোষণা সাপেক্ষে যেকোনো পরিমাণ বৈদেশিক মুদ্রা জমা দেওয়া যায়।
নিয়ম ৩: RFCD International Debit Card-এর ৪টি বিশাল সুবিধা:
- **১. কোনো $300 একক ট্রানজেকশন ক্যাপ নেই:** যেহেতু RFCD একাউন্টে আপনার নিজস্ব ডলার সরাসরি USD হিসেবেই জমা থাকে, তাই RFCD কার্ড দিয়ে এক ক্লিকেই $2,500 ডলারের ফ্যামিলি ফ্লাইট বা মক্কার হোটেল বিল পেমেন্ট করা যায়!
- **২. প্রতি বছর পাসপোর্ট এনডোর্সমেন্ট নবায়নের ঝামেলা নেই:** সাধারণ ট্রাভেল কোটা প্রতি বছর ৩১ ডিসেম্বর রিসেট হয়, কিন্তু RFCD একাউন্টের ডলার বছরের পর বছর মেয়াদহীনভাবে ব্যবহার করা যায়।
- **৩. ডলারেই মুনাফা লাভ:** অনেক ব্যাংক RFCD ব্যালেন্সের ওপর বছরে ৪.৫% থেকে ৬.৫% পর্যন্ত ডলারে রিটার্ন দেয়।
- **৪. পরিবারের জন্য সাপ্লিমেন্টারি কার্ড:** স্বামী/স্ত্রী বা সন্তানদের জন্য সহজেই সাপ্লিমেন্টারি কার্ড নেওয়া যায়।`,
    internalLinks: [
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ওমরাহর জন্য সেরা শরীয়াহ-সম্মত ইসলামিক ডুয়াল-কারেন্সি কার্ড", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "কার্ড ছাড়াই bKash বা ব্যাংক ট্রান্সফারে ফ্লাইট ও হোটেল বুকিং", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "নগদ রিয়াল/ডলার বনাম কার্ড: ৫% DCC চার্জ বাঁচানোর উপায়", path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "আপনার কার্ড দিয়ে ঢাকা থেকে আন্তর্জাতিক ফ্লাইটের লাইভ ভাড়া দেখুন",
      body: "জেদ্দা, মদিনা, ব্যাংকক, কুয়ালালামপুর ও দুবাইয়ের রাউন্ডট্রিপ বিমান ভাড়া তুলনা করে সরাসরি বুক করুন।",
    },
  },

  "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": {
    title: "Dual-Currency Card ছাড়াই bKash বা দেশীয় ব্যাংক ট্রান্সফারে (BDT) ফ্লাইট, ওমরাহ হোটেল ও ট্রান্সফার বুক করার নিয়ম",
    summary:
      "বাংলাদেশের ৭০ শতাংশেও বেশি প্রথমবার বিদেশগামী যাত্রী, ঢাকার বাইরের পরিবার এবং বয়স্ক ওমরাহ যাত্রীদের হাতে তাৎক্ষণিকভাবে এনডোর্স করা Dual-Currency Card থাকে না। ফলে অনলাইনে কম ভাড়ায় বিমান টিকিট বা মক্কা-মদিনার হোটেল ডিসকাউন্ট দেখলেও তাঁরা বুক করতে পারেন না। ব্যাংক কার্ডের জন্য সপ্তাহখানেক অপেক্ষা করে ২০,০০০+ টাকা বেশি ভাড়া গোনার বদলে আপনি সরাসরি URAL-এর ঢাকা সাপোর্ট ডেস্কের (+8801784385335) মাধ্যমে দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ (BDT) পেমেন্ট করে কনফার্মড ফ্লাইট PNR, মক্কা/মদিনা ও এশিয়ার হোটেল ভাউচার এবং এয়ারপোর্ট ট্রান্সফার বুক করতে পারেন।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৬ মিনিট পড়া",
    content: `ধরুন আপনি অনলাইনে দেখলেন **ঢাকা–জেদ্দা রাউন্ডট্রিপ ফ্লাইট মাত্র ৫৬,০০০ টাকায়** নেমে এসেছে অথবা **মসজিদুল হারামের কাছে জাবাল ওমরের হোটেল রাতপ্রতি ৬,৫০০ টাকায়** পাওয়া যাচ্ছে—কিন্তু আপনার হাতে কোনো **Dual-Currency Card** নেই, পাসপোর্টে ডলার এনডোর্সমেন্ট করা নেই অথবা ব্যাংকের $300 লিমিটের কারণে পেমেন্ট আটকে যাচ্ছে! এই পরিস্থিতিতে ঢাকা, চট্টগ্রাম, সিলেটসহ সারা দেশের ভ্রমণকারীদের জন্য দেশীয় ব্যাংক ট্রান্সফার, **bKash বা Nagad**-এর মাধ্যমে **বাংলাদেশি টাকায় (BDT)** বুকিং সম্পন্ন করা সবচেয়ে দ্রুত ও নিরাপদ উপায়।

১. কেন অভিজ্ঞ বাংলাদেশি ভ্রমণকারীরাও BDT বুকিং ডেস্ক পছন্দ করেন?
কার্ড না থাকা যাত্রীদের পাশাপাশি অনেক কার্ডধারীও ৩টি বাস্তব সুবিধার কারণে দেশীয় টাকায় (BDT) ফ্লাইট ও হোটেল বুক করেন:
- **১. পাসপোর্টের $18,000 USD ট্রাভেল কোটা অক্ষত রাখা:**
  • আপনি যদি দেশ থেকেই বিমানের টিকিট (৭৫,০০০+ টাকা) এবং মক্কা-মদিনা বা ব্যাংকক/কুয়ালালামপুরের হোটেল ভাড়া **বাংলাদেশি টাকায় (BDT)** পরিশোধ করেন, তবে আপনার পাসপোর্টের পুরো **$18,000 USD ট্রাভেল কোটা** বিদেশে শপিং, খাবার ও জরুরি খরচের জন্য সম্পূর্ণ অক্ষত থাকে!
- **২. পাসপোর্ট ভিসা অফিসে জমা থাকলেও বুকিং করা যায়:**
  • আপনার আসল পাসপোর্ট যখন ওমরাহ এজেন্সি বা থাইল্যান্ড/সিঙ্গাপুর ভিসা প্রসেসিংয়ে থাকে, তখন পাসপোর্ট ছাড়া ব্যাংকে গিয়ে ডলার এনডোর্সমেন্ট করা অসম্ভব। অথচ প্রোমোশনাল ফ্লাইটের সিট কয়েক ঘণ্টায় শেষ হয়ে যায়।
- **৩. ভিসা আবেদন ও ঢাকা এয়ারপোর্ট ইমিগ্রেশনের জন্য ১০০% কনফার্মড ভাউচার:**
  • থাইল্যান্ড (**thaievisa.go.th**), মালয়েশিয়া ও সিঙ্গাপুর ভিসা এবং **ঢাকা এয়ারপোর্টের (DAC) ইমিগ্রেশন কাউন্টারে** দেখানোর জন্য যাত্রীর নাম ও বুকিং রেফারেন্সসহ পেইড হোটেল ভাউচার ও রিটার্ন PNR টিকিট অপরিহার্য।

২. ধাপে ধাপে নিয়ম: কীভাবে URAL WHATSAPP DESK (+8801784385335)-এ BDT দিয়ে বুক করবেন?
মাত্র ৩টি সহজ ধাপে ঘরে বসেই আপনার টিকিট ও হোটেল ভাউচার বুঝে নিন:
ধাপ ১: URAL ওয়েবসাইটে আপনার ফ্লাইট রুট বা হোটেল জোন পছন্দ করুন:
- আমাদের **Flights Hub**, **Umrah BDT Calculator** অথবা **Hotel Guides** (মক্কার জাবাল ওমর/আজইয়াদ, মদিনার মারকাজিয়া নর্থ, ব্যাংককের প্রাতুনাম, কুয়ালালামপুরের বুকিত বিনতাং বা মালদ্বীপের মাফুশি) থেকে আপনার ভ্রমণের তারিখ ও যাত্রীর সংখ্যা ঠিক করুন।
ধাপ ২: WhatsApp-এ (+8801784385335) মেসেজ দিন:
- আমাদের ঢাকা ডেস্কে আপনার **ভ্রমণের তারিখ, গন্তব্য/হোটেলের নাম এবং পাসপোর্টের প্রথম পাতার ছবি** (টিকিটে নির্ভুল নামের বানানের জন্য) পাঠান।
- কয়েক মিনিটের মধ্যে আমরা আপনাকে কোনো লুকানো চার্জ বা ৫% DCC ফি ছাড়াই সরাসরি **মোট BDT খরচ** জানিয়ে দেব।
ধাপ ৩: দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ পেমেন্ট করুন ও অফিশিয়াল ভাউচার নিন:
- যেকোনো দেশীয় ব্যাংক একাউন্ট (NPSB/BEFTN), **bKash** বা **Nagad**-এ পেমেন্ট সম্পন্ন করার সাথে সাথেই আপনার হোয়াটসঅ্যাপ ও ইমেইলে চলে আসবে **যাচাইযোগ্য ৬-ডিজিটের Airline PNR সহ ই-টিকিট, কনফার্মড হোটেল ভাউচার PDF এবং এয়ারপোর্ট পিকআপ কনফার্মেশন**!`,
    internalLinks: [
      { text: "১০ দিনের DIY Umrah BDT বাজেট ক্যালকুলেটর ও হোটেল জোন", path: "/umrah" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "মক্কা ও মদিনা হোটেল জোন এবং Haramain বুলেট ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "প্রথমে লাইভ ফ্লাইট ভাড়া যাচাই করুন, এরপর কার্ডে বা BDT WhatsApp-এ বুক করুন",
      body: "ঢাকা থেকে যেকোনো রুটের বর্তমান সর্বনিম্ন বিমান ভাড়া একনজরে দেখে নিন।",
    },
  },

  "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": {
    title: "মক্কা, ব্যাংকক ও কুয়ালালামপুরে নগদ ডলার/রিয়াল বনাম কার্ড: ৫% DCC চার্জ ও মানি এক্সচেঞ্জ লস বাঁচানোর উপায়",
    summary:
      "বাংলাদেশ থেকে ওমরাহ করতে যাওয়ার সময় ঢাকা থেকেই নগদ সৌদি রিয়াল (SAR) কেনা উচিত নাকি মার্কিন ডলার (USD) নিয়ে মক্কায় ভাঙানো ভালো? আর বিদেশের হোটেল বা শপিং মলে কার্ড পাঞ্চ করার সময় কোন একটি ভুল বাটনে চাপ দিলে ৫% থেকে ৬% অতিরিক্ত টাকা (DCC চার্জ) কেটে নেয়? বাংলাদেশ ব্যাংকের ফরেন এক্সচেঞ্জ নিয়ম (bb.org.bd) এবং মক্কা, ব্যাংককের প্রাতুনাম (SuperRich) ও কুয়ালালামপুরের বুকিত বিনতাংয়ের বাস্তব মানি এক্সচেঞ্জ রেটের ভিত্তিতে লেখা এই গাইডে জানুন প্রতিটি ট্রিপে ৫,০০০–৯,০০০ টাকা লস বাঁচানোর কৌশল।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `সঠিক কারেন্সি এক্সচেঞ্জ কৌশল না জানার কারণে একটি সাধারণ ফ্যামিলি ট্রিপে বা ওমরাহ সফরে বাংলাদেশি যাত্রীরা অজান্তেই **৫,০০০ থেকে ৯,০০০ টাকা** গচ্চা দেন। আপনি **ঢাকা (DAC)** থেকে **মক্কা-মদিনায় ওমরাহ** করতে যান কিংবা **ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর, দুবাই বা মালদ্বীপে** ছুটিতে যান—কখন দেশ থেকেই **সৌদি রিয়াল (SAR)** কিনবেন, কখন চকচকে **$100 USD নোট** নেবেন এবং বিদেশে **Dual-Currency Card** পাঞ্চ করার সময় কীভাবে **৫% DCC ফাঁদ** এড়াবেন তা নিচে তুলে ধরা হলো।

১. ওমরাহযাত্রীদের জন্য গোল্ডেন রুল: ঢাকা থেকে সরাসরি সৌদি রিয়াল (SAR) কিনবেন নাকি ডলার (USD)?
ওমরাহযাত্রীদের সবচেয়ে সাধারণ প্রশ্ন এটি:
নিয়ম ১: হাতখরচের জন্য (খাবার, জিয়ারত ট্যাক্সি, সেলুন, খেজুর কেনা) ঢাকা থেকেই সরাসরি সৌদি রিয়াল (SAR) কিনুন!
- **কেন?** আপনি যদি ঢাকায় বাংলাদেশি টাকা (BDT) দিয়ে প্রথমে **মার্কিন ডলার (USD)** কেনেন এবং পরে মক্কা বা মদিনার মানি এক্সচেঞ্জে গিয়ে সেই ডলার ভাঙিয়ে **সৌদি রিয়াল (SAR)** করেন, তবে আপনাকে **দুইবার (BDT → USD → SAR)** মানি চেঞ্জারের কমিশন বা স্প্রেড দিতে হবে—যাতে প্রতি ১ লক্ষ টাকায় প্রায় **২,৫০০ থেকে ৩,৫০০ টাকা লস** হয়!
- তাই ঢাকার মতিঝিল, গুলশান, বনানী বা বায়তুল মোকাররমের অনুমোদিত ব্যাংক বা মানি চেঞ্জার থেকে সরাসরি **নগদ সৌদি রিয়াল (৫০, ১০০ ও ৫০০ রিয়ালের নোট এবং ট্যাক্সি ভাড়ার জন্য কিছু ৫ ও ১০ রিয়ালের খুচরা নোট)** কিনুন এবং পাসপোর্টে এনডোর্স করে নিন।
নিয়ম ২: হোটেল, Haramain ট্রেন এবং বড় সুপারমার্কেটে (Bin Dawood / Al Baik) কার্ড ব্যবহার করুন:
- সৌদি আরবে প্রায় ১০০% দোকানে কন্ট্যাক্টলেস POS মেশিন রয়েছে। বড় খরচের জন্য আপনার এনডোর্স করা **Dual-Currency Card** ব্যবহার করলে ইহরামের বেল্টে বেশি নগদ টাকা বহনের ঝুঁকি থাকে না।

২. বিদেশের POS মেশিনে ৫% DYNAMIC CURRENCY CONVERSION (DCC) চার্জের ফাঁদ কী?
আপনি যখন মক্কা, দুবাই, ব্যাংকক, কুয়ালালামপুর বা সিঙ্গাপুরের কোনো হোটেল বা শপিং মলে বাংলাদেশি Visa, Mastercard বা Amex কার্ড পাঞ্চ করবেন, তখন মেশিনের স্ক্রিনে দুটি অপশন ভেসে ওঠে:
- *"Choose Currency: [1] Local Currency (SAR / AED / THB / MYR / SGD) অথবা [2] Home Currency (BDT / USD)?"*
- **সর্বোচ্চ সতর্কতা: সবসময় ১ নম্বর অপশন অর্থাৎ LOCAL CURRENCY (SAR, THB, MYR, AED, SGD) সিলেক্ট করবেন!**
- আপনি যদি ভুল করে "BDT" সিলেক্ট করেন, তবে বিদেশি মার্চেন্ট ব্যাংক **Dynamic Currency Conversion (DCC)** প্রয়োগ করে তাৎক্ষণিকভাবে **৪.৫% থেকে ৬.৫% অতিরিক্ত চার্জ** কেটে নেবে!

৩. দেশভিত্তিক নগদ ডলার বনাম কার্ড ব্যবহারের চিট-শিট
- **🇸🇦 সৌদি আরব (মক্কা ও মদিনা):** বাঙালি রেস্টুরেন্টে খাবার ও লোকাল জিয়ারত ট্যাক্সির জন্য ঢাকা থেকে কেনা **১,০০০–১,৫০০ নগদ সৌদি রিয়াল (SAR)** + হোটেল ও ট্রেনের জন্য **Dual-Currency Card**।
- **🇹🇭 থাইল্যান্ড (ব্যাংকক ও পাতায়া):** ঢাকা থেকে **২০১৭ সালের পরের চকচকে, দাগ ও ভাঁজহীন $100 USD নোট** নিন। সুবর্ণভূমি এয়ারপোর্টে মাত্র ২০–৩০ ডলার ভাঙিয়ে বাকি ডলার ব্যাংককের **Pratunam / Ratchadamri এলাকার SuperRich Thailand (সবুজ বা কমলা বুথ)** থেকে ভাঙান—এখানে এশিয়ার সেরা রেট পাওয়া যায়।
- **🇲🇾 মালয়েশিয়া (কুয়ালালামপুর) ও 🇲🇻 মালদ্বীপ (মাফুশি):** কুয়ালালামপুরে শপিং মল ও Grab-এ কার্ড ব্যবহার করুন এবং নগদ ডলার **Bukit Bintang (Pavilion), Mid Valley বা Masjid India**-তে ভাঙান। আর মালদ্বীপের মাফুশি দ্বীপে স্পিডবোট ($25) ও স্নরকেলিং ট্যুরে ($30) সরাসরি **নগদ USD** গ্রহণ করা হয়।`,
    internalLinks: [
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ওমরাহর জন্য সেরা শরীয়াহ-সম্মত ইসলামিক ডুয়াল-কারেন্সি কার্ড", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "RFCD Account বনাম সাধারণ Travel Quota ($300 লিমিট সমাধান)", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "মক্কা ও মদিনায় বাংলাদেশি হালাল খাবারের হোটেল ও দাম", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "বিদেশে নেমেই ব্যাংক OTP ও লাইভ কারেন্সি রেট দেখতে eSIM নিন",
      body: "ঢাকা ছাড়ার আগেই Airalo Travel eSIM ইনস্টল করুন যাতে বিমানবন্দরে নামার সাথে সাথেই মোবাইল ব্যাংকিং অ্যাপ সচল থাকে।",
    },
  },

  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": {
    title: "বাংলাদেশ থেকে Thailand Official e-Visa: Dhaka ডকুমেন্ট, ব্যাংক প্রমাণ ও আবেদন যাচাই (2026)",
    summary:
      "বাংলাদেশি আবেদনকারীরা Thailand-এর official e-Visa portal ব্যবহার করেন; approval বা processing time নিশ্চিত নয়। Dhaka Embassy-র প্রকাশিত TR checklist (হালনাগাদ ৩০ নভেম্বর ২০২২) ৬ মাসের statement এবং জনপ্রতি BDT 60,000 বা পরিবারপ্রতি BDT 120,000 উল্লেখ করে, তবে বর্তমান portal prompt ভিন্ন হতে পারে। সরকারি visa fee portal/Embassy-এর বর্তমান schedule-এ যাচাই করুন; bank/payment charge ও optional agency service fee আলাদা।",
    category: "Visa & Immigration",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৩ মিনিট পড়া",
    content: `থাইল্যান্ডে পারিবারিক ছুটি, Pratunam শপিং, Phuket সমুদ্রসৈকত বা চিকিৎসার পরিকল্পনা করলে বাংলাদেশি আবেদনকারীরা **official Thai e-Visa portal (thaievisa.go.th)** ব্যবহার করেন। পররাষ্ট্র মন্ত্রণালয়ের পোর্টালে আবেদন অনলাইনে জমা হয় এবং অনুমোদিত হলে e-Visa confirmation ইমেইলে আসে; বর্তমান portal flow-তে পাসপোর্ট বা কাগজপত্র দূতাবাসে সরাসরি জমা দিতে হয় না। প্রতিটি আবেদন যাচাইসাপেক্ষ—কোনো গাইডই ভিসা নিশ্চিত করতে পারে না।

১. THAILAND OFFICIAL E-VISA: আবেদনপথ, সময় ও আর্থিক প্রমাণ
প্রথমে **Thai e-Visa portal**-এ সঠিক mission নির্বাচন করুন। নির্দিষ্ট দূতাবাস/কনস্যুলেটের অতিরিক্ত নিয়ম যাচাই করতে পোর্টাল নিজেই সংশ্লিষ্ট mission-এর নির্দেশনা দেখতে বলে।
- **ভিসার ধরন:** পোর্টালে single-entry Tourist Visa (**TR**)-এর validity ৩ মাস দেখানো হয়েছে। ভ্রমণের আগে অনুমোদিত e-Visa-তে entry window ও কতদিন থাকা যাবে তা মিলিয়ে নিন।
- **প্রসেসিং সময়:** সবার জন্য নির্দিষ্ট বা guaranteed processing time নেই। যথেষ্ট আগে আবেদন করুন, email ও application dashboard দেখুন, এবং ঢাকাস্থ রয়েল থাই দূতাবাস অতিরিক্ত কাগজ চাইলে সেই নির্দেশ অনুসরণ করুন।
- **ফি ও পেমেন্ট:** সরকারি visa fee-এর বর্তমান অঙ্ক live e-Visa portal বা Embassy-এর fee schedule-এ যাচাই করুন। Bank/payment-provider charge আলাদা; ঐচ্ছিক agency service fee-ও আলাদা ও provider-ভেদে বদলায়। Agency ব্যবহার করলে payment-এর আগে লিখিত itemized quote নিন।
- **আর্থিক প্রমাণ:** পররাষ্ট্র মন্ত্রণালয়ের সাধারণ Tourist Visa পেজে অন্তত **THB 20,000** financial evidence—যেমন গত ৩ মাসের bank statement বা sponsor letter—উল্লেখ করা আছে। ঢাকাস্থ দূতাবাসের প্রকাশিত TR checklist (সর্বশেষ হালনাগাদ **৩০ নভেম্বর ২০২২**) ৬ মাসের bank statement, solvency certificate এবং **জনপ্রতি BDT 60,000 বা পরিবারপ্রতি BDT 120,000** উল্লেখ করে। নির্দেশনা দুটির বয়স ও বিস্তারিত আলাদা; কোনো অঙ্কের ওপর নির্ভর করার আগে portal-এ Dhaka mission-এর বর্তমান checklist দেখুন। শুধু নির্দিষ্ট balance থাকলেই ভিসা নিশ্চিত হয় না।

২. ডকুমেন্ট প্রস্তুতির তালিকা (সর্বশেষ portal checklist অনুসরণ করুন)
নিচের তালিকাটি প্রস্তুতির সহায়ক—আপনার mission ও আবেদনের জন্য দেখানো বর্তমান checklist-এর বিকল্প নয়। Thai e-Visa portal-এর Tourist Visa পেজে সাধারণত নিচের ডকুমেন্টগুলোর কথা আছে; ফাইলের ধরন ও অতিরিক্ত কাগজ আবেদনভেদে আলাদা হতে পারে:
ধাপ ১: পাসপোর্ট ও ছবি:
- পাসপোর্টের biodata page এবং গত ৬ মাসের মধ্যে তোলা ছবি আপলোড করুন। ছবির মাপ ও file-size-এর জন্য live portal-এর নির্দেশ মানুন।
- আগের visa বা travel-history page কেবল portal চাইলে বা আবেদনে প্রাসঙ্গিক হলে যোগ করুন।
ধাপ ২: বর্তমান অবস্থান ও ভ্রমণ পরিকল্পনা:
- portal-এ current location-এর প্রমাণ ও travel-booking confirmation চাওয়া হয়। আবেদনের তারিখ ও উদ্দেশ্যের সঙ্গে মেলে এমন সত্য তথ্য দিন।
ধাপ ৩: থাকার জায়গা ও আর্থিক প্রমাণ:
- portal বা Dhaka mission চাইলে hotel/accommodation booking অথবা আমন্ত্রণপত্র দিন।
- bank statement-এর সময়কাল, solvency letter, sponsor evidence এবং স্থানীয় অতিরিক্ত কাগজের জন্য বর্তমান Dhaka checklist-ই অনুসরণ করুন; পুরোনো তালিকাকে সব আবেদনের জন্য চূড়ান্ত ধরে নেবেন না।
ধাপ ৪: পেশা, পরিবার বা চিকিৎসাসংক্রান্ত কাগজ:
- পরিস্থিতি অনুযায়ী দূতাবাস employer/occupation evidence, business documents, সম্পর্কের প্রমাণ, অপ্রাপ্তবয়স্কের parental consent বা চিকিৎসার জন্য hospital appointment চাইতে পারে। আপনার আবেদনে যে কাগজ চাওয়া হয়েছে সেটিই জমা দিন।
ধাপ ৫: জমা দেওয়ার আগে যাচাই:
- নাম, passport number, তারিখ, travel booking ও আপলোড করা scan মিলিয়ে নিন। জাল টিকিট, ভুয়া accommodation বা মিথ্যা financial document জমা দেবেন না।

৩. আবেদন জমার আগে তিনটি ব্যবহারিক যাচাই
- **আর্থিক নথি পরিষ্কার রাখুন:** ব্যাংক স্টেটমেন্টে দেখানো অর্থের উৎস ব্যাখ্যা করতে পারে—এমন সত্য ও সামঞ্জস্যপূর্ণ প্রমাণ দিন। ব্যাখ্যাহীন কৃত্রিম জমা এড়িয়ে চলুন।
- **বুকিংয়ের তথ্য মিলিয়ে নিন:** ফ্লাইট ও থাকার পরিকল্পনা যেন আবেদনের তারিখ এবং উদ্দেশ্যের সঙ্গে মেলে; dummy বা বিভ্রান্তিকর booking ব্যবহার করবেন না।
- **পরিচয়-তথ্য আবার পড়ুন:** payment-এর আগে নামের বানান, passport number ও তারিখ যাচাই করুন। সরকারি fee, bank/payment charge, ঐচ্ছিক agency fee এবং প্রযোজ্য refund terms বর্তমান official/provider নির্দেশনায় মিলিয়ে নিন; চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট থাই কর্তৃপক্ষের।`,
    references: [
      {
        name: "Thailand e-Visa Portal — Ministry of Foreign Affairs",
        nameBn: "Thailand e-Visa পোর্টাল — পররাষ্ট্র মন্ত্রণালয়",
        url: "https://www.thaievisa.go.th/",
      },
      {
        name: "Thailand e-Visa — Tourist Visa requirements",
        nameBn: "Thailand e-Visa — Tourist Visa-এর প্রয়োজনীয়তা",
        url: "https://www.thaievisa.go.th/visa/tourist-visa",
      },
      {
        name: "Royal Thai Embassy Dhaka — Tourist Visa TR checklist (updated Nov 30, 2022)",
        nameBn: "রয়্যাল থাই এমব্যাসি ঢাকা — Tourist Visa TR চেকলিস্ট (হালনাগাদ: ৩০ নভেম্বর ২০২২)",
        url: "https://dhaka.thaiembassy.org/en/publicservice/tourist-visa-tr?page=5d83296315e39c2540006a6c&menu=5d83296315e39c2540006a6d",
      },
      {
        name: "Royal Thai Embassy Dhaka — Consular Service Fee (updated September 2025)",
        nameBn: "রয়্যাল থাই এমব্যাসি ঢাকা — কনস্যুলার সার্ভিস ফি (হালনাগাদ: সেপ্টেম্বর ২০২৫)",
        url: "https://dhaka.thaiembassy.org/en/content/consular-service-fee-updated-september-2025?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e",
      },
      {
        name: "Royal Thai Embassy Dhaka — Facilitation of E-Visa Payment",
        nameBn: "রয়্যাল থাই এমব্যাসি ঢাকা — ই-ভিসা পেমেন্টের নির্দেশনা",
        url: "https://dhaka.thaiembassy.org/en/content/facilitation-ofe-visa-payment?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e",
      },
    ],
    internalLinks: [
      { text: "Thailand ভিসা চেকলিস্ট ও ফি ক্যালকুলেটর", path: "/visa/thailand-visa" },
      { text: "Bangkok-এ Halal খাবারের সেরা জায়গা (Pratunam ও Sukhumvit)", path: "/blog/halal-food-guide-bangkok-bangladesh" },
      { text: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Thailand ৫ দিনের বিস্তারিত BDT বাজেট", path: "/costs/thailand-costs" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "Safari World Bangkok, Chao Phraya ডিনার ক্রুজ ও এয়ারপোর্ট ট্রান্সফার বুক করুন",
      body: "Klook-এর মাধ্যমে ব্যাংককের জনপ্রিয় থিম পার্ক ও অ্যাক্টিভিটি টিকিটে ২৫% পর্যন্ত ছাড় পান।",
    },
  },

  "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration": {
    title: "বাংলাদেশিদের জন্য Malaysia e-Visa ও ফ্রি MDAC কার্ড গাইড (2026): ঘরে বসে ২–৪ দিনে ভিসা ও KLIA ইমিগ্রেশন নিয়ম",
    summary:
      "পাসপোর্ট জমা দেওয়ার ঝামেলা ছাড়াই শতভাগ অনলাইনে মাত্র ২ থেকে ৪ কার্যদিবসে ৩০ দিনের Malaysia Tourist e-Visa পাওয়া যায় বলে বাংলাদেশি পরিবারগুলোর কাছে মালয়েশিয়া অত্যন্ত জনপ্রিয়। তবে ভিসা পাওয়ার পর কুয়ালালামপুর আন্তর্জাতিক বিমানবন্দরে (KLIA Terminal 1 বা Terminal 2) নামার আগে দুটি নিয়ম মানা বাধ্যতামূলক: ফ্লাইটের ৩ দিন আগে বিনামূল্যে Malaysia Digital Arrival Card (MDAC) পূরণ করা এবং KLIA ইমিগ্রেশন কাউন্টারে প্রিন্ট করা রিটার্ন টিকিট, হোটেল ভাউচার ও পর্যাপ্ত ডলার/রিঙ্গিত দেখানো।",
    category: "Visa & Immigration",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `আপনি সপরিবারে **কুয়ালালামপুর, পুত্রজায়া ও গেন্টিং হাইল্যান্ডস** ভ্রমণের পরিকল্পনা করুন অথবা নেপাল/মালদ্বীপ ঘুরে আসার পর পাসপোর্টে শক্তিশালী ট্রাভেল হিস্ট্রি গড়তে চান—**মালয়েশিয়ার অফিশিয়াল অনলাইন ই-ভিসা (malaysiavisa.imi.gov.my)** বাংলাদেশিদের জন্য সবচেয়ে দ্রুত ও সহজ ডিজিটাল ভিসাগুলোর একটি। মালয়েশিয়ার ইমিগ্রেশন বিভাগের (**imi.gov.my**) নিয়ম অনুযায়ী আবেদন থেকে শুরু করে **KLIA ইমিগ্রেশন** পার হওয়া পর্যন্ত সম্পূর্ণ গাইড নিচে দেওয়া হলো।

১. বাংলাদেশ থেকে অনলাইনে MALAYSIA TOURIST E-VISA করার ধাপ ও ডকুমেন্টস
মালয়েশিয়া ইমিগ্রেশনের অফিশিয়াল নিয়ম অনুযায়ী:
- **ভিসার মেয়াদ ও খরচ:** ৩০ দিনের ট্যুরিস্ট ই-ভিসা; অনলাইনে বাংলাদেশি ডুয়াল-কারেন্সি কার্ডের মাধ্যমে পেমেন্ট করলে মোট খরচ পড়ে প্রায় **BDT 3,800 – BDT 4,200**।
- **ভিসা প্রসেসিং সময়:** সাধারণত **২ থেকে ৪ কার্যদিবসের** মধ্যে ইমেইলে A4 PDF ই-ভিসা চলে আসে (পাসপোর্ট কোথাও জমা দিতে হয় না)।
- **প্রয়োজনীয় ডকুমেন্ট স্ক্যান:**
  • **১. পাসপোর্ট সাইজ ছবি (35mm x 50mm):** সাদা ব্যাকগ্রাউন্ড, কান ও কপাল স্পষ্ট দেখা যাবে।
  • **২. পাসপোর্টের বায়ো-পেজ স্ক্যান:** কমপক্ষে ৬ মাসের মেয়াদ থাকতে হবে (সাথে পূর্ববর্তী ভিসার কপি থাকলে যুক্ত করুন)।
  • **৩. ৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি সার্টিফিকেট:** জনপ্রতি অন্তত **BDT 80,000 থেকে BDT 1,20,000+** ক্লোজিং ব্যালেন্স (পরিবারের ক্ষেত্রে **BDT 2,00,000+** থাকা ভালো)।
  • **৪. কনফার্মড রিটার্ন ফ্লাইট টিকিট ও হোটেল ভাউচার:** ঢাকা–কুয়ালালামপুর–ঢাকা রাউন্ডট্রিপ টিকিট এবং বুকিত বিনতাং বা KLCC এলাকার হোটেল বুকিং।
  • **৫. পেশাগত প্রমাণপত্র:** চাকরিজীবীদের **NOC ও অফিস আইডি**, ব্যবসায়ীদের নবায়নকৃত **Trade License** (ইংরেজি অনুবাদসহ)।

২. ফ্লাইটের ৭২ ঘণ্টা আগে বাধ্যতামূলক ফ্রি MALAYSIA DIGITAL ARRIVAL CARD (MDAC)
হাতে অনুমোদিত ই-ভিসা থাকার পরও মালয়েশিয়ায় প্রবেশকারী প্রত্যেক বাংলাদেশি যাত্রীকে ফ্লাইটের আগে **MDAC ফর্ম** পূরণ করতে হবে:
নিয়ম ১: শুধুমাত্র অফিশিয়াল সরকারি ওয়েবসাইট ব্যবহার করুন (imigresen-online.imi.gov.my/mdac/main):
- **সতর্কতা:** MDAC পূরণ করতে কোনো টাকা লাগে না—এটি **১০০% ফ্রি**! কোনো ভুয়া ওয়েবসাইটে ৩০–৫০ ডলার পেমেন্ট করবেন না।
নিয়ম ২: মালয়েশিয়ায় পৌঁছানোর ৩ দিন (৭২ ঘণ্টা) আগে পূরণ করুন:
- **KLIA Terminal 1** (বিমান, মালয়েশিয়া এয়ারলাইন্স, বাটিক এয়ার, ইউএস-বাংলা) বা **KLIA Terminal 2** (এয়ারএশিয়া)-তে ল্যান্ড করার ৩ দিনের মধ্যে অনলাইনে পাসপোর্ট তথ্য, ফ্লাইট নম্বর ও হোটেলের ঠিকানা দিয়ে ফর্মটি সাবমিট করুন এবং ইমেইলে পাওয়া PDF কপিটি প্রিন্ট করে নিন।

৩. কুয়ালালামপুর (KLIA1 / KLIA2) ইমিগ্রেশন ২ মিনিটে পার হওয়ার চেকলিস্ট
মালয়েশিয়া ইমিগ্রেশন অফিসাররা পর্যটকদের ডকুমেন্ট মনোযোগ দিয়ে দেখেন। তাই কাউন্টারে নিচের ফাইলটি হাতে রাখুন:
- **১. প্রিন্ট করা A4 Malaysia e-Visa + প্রিন্ট করা MDAC স্লিপ।**
- **২. প্রিন্ট করা কনফার্মড ফিরতি বিমান টিকিট (Return Ticket to Dhaka)।**
- **৩. প্রিন্ট করা পেইড হোটেল বুকিং ভাউচার।**
- **৪. পকেট মানি বা ডলারের প্রমাণ ($500–$1,000 USD নগদ বা এনডোর্স করা কার্ড)** এবং আপনার ঢাকার **অফিস আইডি কার্ড / NOC**।`,
    internalLinks: [
      { text: "মালয়েশিয়া ইসলামিক হেরিটেজ, পুত্রজায়া পিঙ্ক মসজিদ ও হালাল ট্যুর গাইড", path: "/blog/malaysia-islamic-heritage-putrajaya-halal-family-tour-guide" },
      { text: "Malaysia ভিসা চেকলিস্ট ও আবেদনের নিয়ম", path: "/visa/malaysia-visa" },
      { text: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Malaysia ৫ দিনের বিস্তারিত BDT খরচ", path: "/costs/malaysia-costs" },
    ],
    affiliateCTA: {
      provider: "kkday",
      headline: "Malaysia ট্যুর পাস ও KLIA Ekspres ট্রেনের টিকিট KKday-তে বুক করুন",
      body: "কুয়ালালামপুর এয়ারপোর্ট থেকে শহরে যাওয়ার হাই-স্পিড ট্রেন, পেট্রোনাস টুইন টাওয়ার ও গেন্টিং কেবল কার টিকিট প্রি-বুক করুন।",
    },
  },

  "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia": {
    title: "নতুন পাসপোর্টে (Fresh Passport) প্রথম বিদেশ ভ্রমণ (2026): ৩ ধাপে শক্তিশালী Travel History তৈরির গাইড",
    summary:
      "আপনার হাতে কি একদম নতুন ও সাদা (Blank / Fresh) বাংলাদেশি ই-পাসপোর্ট রয়েছে যেখানে এখনো কোনো দেশের ভিসা বা স্ট্যাম্প নেই? কোনো ট্রাভেল হিস্ট্রি ছাড়া সরাসরি সিঙ্গাপুর, শেনজেন (ইউরোপ), যুক্তরাজ্য বা আমেরিকার ভিসার আবেদন করলে প্রায়ই 'Insufficient Travel History' দেখিয়ে ভিসা রিজেক্ট করা হয়। অভিজ্ঞ বাংলাদেশি ভ্রমণকারীরা ৩ ধাপের একটি পরীক্ষিত 'Travel History Ladder' অনুসরণ করে নতুন পাসপোর্টকে শক্তিশালী করেন: ১ম ধাপে ফ্রি Visa-on-Arrival দেশ (নেপাল বা মালদ্বীপ), ২য় ধাপে অনলাইন ই-ভিসা (মালয়েশিয়া ও থাইল্যান্ড), এবং ৩য় ধাপে সিঙ্গাপুর, দুবাই, সৌদি ওমরাহ ও ইউরোপ ভ্রমণ।",
    category: "Visa & Immigration",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `বাংলাদেশের প্রত্যেক অভিজ্ঞ ভ্রমণকারীর যাত্রা শুরু হয়েছিল ঠিক আপনার মতোই—একটি **নতুন, সম্পূর্ণ সাদা (Fresh) বাংলাদেশি পাসপোর্ট** হাতে নিয়ে। দূতাবাসগুলো কেন 'Travel History' দেখতে চায়? কারণ ভিসা অফিসাররা প্রমাণ দেখতে চান যে আপনি বিদেশে ঘুরতে গিয়ে নিয়ম কানুন মেনে **নির্দিষ্ট সময়ের মধ্যে পুনরায় বাংলাদেশে ফিরে আসেন**। প্রথম আবেদনেই ভিসা রিজেকশনের ঝুঁকি না নিয়ে নিচের **৩ ধাপের Travel History রোডম্যাপটি** অনুসরণ করুন।

১. ধাপ ১ (১ম–৩য় মাস): ভিসা রিজেকশনের শূন্য ঝুঁকিতে প্রথম স্ট্যাম্প নিন (NEPAL অথবা MALDIVES)
সাদা পাসপোর্টে প্রথমেই কড়াকড়ি কোনো দূতাবাসে আবেদন না করে এমন দেশ দিয়ে শুরু করুন যেখানে বাংলাদেশি পাসপোর্টধারীরা **১০০% নিশ্চিত ফ্রি Visa on Arrival (VOA)** পান:
অপশন A: নেপাল (কাঠমান্ডু ও পোখারা — ৫ দিনের বাজেট: BDT 42,000 – 54,000):
- **কেন সেরা:** ঢাকা (DAC) থেকে মাত্র ৯০ মিনিটের ফ্লাইট। SAARC নাগরিক হিসেবে বছরে প্রথমবার ভ্রমণে কাঠমান্ডু এয়ারপোর্টে নামলেই আপনার পাসপোর্টে **ফ্রি ৩০ দিনের অন-অ্যারাইভাল ভিসা স্ট্যাম্প** ও ঢাকা ইমিগ্রেশনের প্রস্থান/আগমন সিল পড়ে যাবে!
অপশন B: মালদ্বীপ (মালে ও মাফুশি লোকাল আইল্যান্ড — ৫ দিনের বাজেট: BDT 72,000 – 88,000):
- **কেন সেরা:** হানিমুন বা ফ্যামিলি ট্রিপের জন্য আদর্শ। ফ্লাইটের ৯৬ ঘণ্টা আগে **ফ্রি IMUGA অনলাইন ফর্ম** পূরণ করে মালে এয়ারপোর্টে নামলেই পাবেন **ফ্রি ৩০ দিনের ভিসা**।

২. ধাপ ২ (৪র্থ–৯ম মাস): দক্ষিণ-পূর্ব এশিয়ার অনলাইন ই-ভিসা (MALAYSIA + THAILAND কম্বো)
পাসপোর্টে অন্তত ১টি আন্তর্জাতিক ভ্রমণের সিল পড়ার পর (এবং আপনার ৬ মাসের ব্যাংক স্টেটমেন্টে নিয়মিত লেনদেনসহ **BDT 1,20,000 – 1,80,000+ ব্যালেন্স** তৈরি হলে) ২য় ধাপে এগিয়ে যান:
- **🇲🇾 মালয়েশিয়া ৩০ দিনের অনলাইন ই-ভিসা (malaysiavisa.imi.gov.my):** পাসপোর্ট জমা না দিয়েই ২–৪ দিনে অনলাইনে ভিসা হয়ে যায়। কুয়ালালামপুর, পুত্রজায়া পিঙ্ক মসজিদ ও গেন্টিং হাইল্যান্ডস ঘুরে আসুন।
- **🇹🇭 থাইল্যান্ড ৬০ দিনের অফিশিয়াল ই-ভিসা (thaievisa.go.th):** অনলাইনে আবেদন করে ই-ভিসা নিন। সবচেয়ে বুদ্ধিমানের কাজ হলো একটি **৭ দিনের মালয়েশিয়া + থাইল্যান্ড মাল্টি-সিটি ট্রিপ (DAC → KUL → BKK → DAC)** করা—যাতে এক খরচেই আপনার পাসপোর্টে দুটি বড় দেশের ভিসা ও ৪টি ইমিগ্রেশন স্ট্যাম্প যুক্ত হয় এবং বিমান ভাড়াও ২৫,০০০ টাকা বাঁচে!

৩. ধাপ ৩ (১০ম–১৮তম মাস): SINGAPORE, DUBAI + UMRAH এবং SCHENGEN / UK / US ভিসা
আপনার পাসপোর্টে যখন **নেপাল/মালদ্বীপ + মালয়েশিয়া + থাইল্যান্ড** ভ্রমণের রেকর্ড থাকবে এবং সাথে ৬ মাসের ব্যাংক স্টেটমেন্ট ও আয়কর রিটার্ন (TIN/ITR) থাকবে:
- **🇸🇬 সিঙ্গাপুর, 🇦🇪 দুবাই ও 🇸🇦 সৌদি ওমরাহ:** সিঙ্গাপুরের অনুমোদিত ভিসা এজেন্ট এবং দুবাই/সৌদি স্পনসরদের কাছে আপনার প্রোফাইল তখন একজন পরীক্ষিত পর্যটক হিসেবে গণ্য হবে। আপনি সহজেই **১০ দিনের ওমরাহ + দুবাই কম্বো ট্রিপ** করতে পারবেন।
- **🇪🇺 ইউরোপ (Schengen), 🇬🇧 যুক্তরাজ্য ও 🇺🇸 আমেরিকা:** উন্নত দেশগুলোর দূতাবাসে আবেদন করলে অফিসাররা দেখবেন আপনি ৩–৪টি দেশ ভ্রমণ করে সময়মতো দেশে ফিরেছেন। আর একবার আপনার পাসপোর্টে বৈধ ও ব্যবহৃত **US, UK বা Schengen ভিসা** যুক্ত হলে আপনি ভবিষ্যতে যেকোনো সময় **১ বছরের মাল্টিপল-এন্ট্রি সৌদি ই-ভিসা বা অন-অ্যারাইভাল ভিসা** নিয়ে ওমরাহ করতে পারবেন!`,
    internalLinks: [
      { text: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "Malaysia e-Visa ও ফ্রি MDAC কার্ড গাইড", path: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration" },
      { text: "অনলাইনে Thailand e-Visa করার নিয়ম (thaievisa.go.th গাইড)", path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide" },
      { text: "Singapore Tourist Visa গাইড (অনুমোদিত এজেন্ট ও LOI V39A)", path: "/blog/singapore-visa-guide-bangladesh-agents" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "ধাপ ১ শুরু করুন: ঢাকা থেকে কাঠমান্ডু, মালে ও কুয়ালালামপুরের ভাড়া দেখুন",
      body: "ঢাকা থেকে সরাসরি ফ্লাইটের সর্বনিম্ন ভাড়া তুলনা করে আপনার প্রথম আন্তর্জাতিক ভ্রমণের পরিকল্পনা শুরু করুন।",
    },
  },

  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": {
    title: "ঢাকা থেকে ৮৫,০০০ টাকায় ৪ দিনের Singapore ফ্যামিলি ও বাজেট ট্যুর (2026): MRT SimplyGo, Little India হালাল খাবার ও Sentosa গাইড",
    summary:
      "অনেক বাংলাদেশি মনে করেন সিঙ্গাপুর ভ্রমণ মানেই জনপ্রতি দেড়–দুই লক্ষ টাকার ধাক্কা! অথচ চাঙ্গি এয়ারপোর্ট (Changi Airport) থেকে ট্যাক্সিতে ৩,২০০ টাকা খরচ না করে আপনার এনডোর্স করা বাংলাদেশি Dual-Currency Visa/Mastercard সরাসরি মেট্রো গেটে পাঞ্চ করে (MRT SimplyGo — ভাড়া মাত্র SGD 2.10 বা ১৯০ টাকা!), Little India (Mustafa Centre) বা Bugis এলাকায় হোটেল নিয়ে এবং সরকারি MUIS হালাল সার্টিফাইড হকার সেন্টারে ৫৫০–৭৩০ টাকায় খাবার খেয়ে ফ্লাইট ও ভিসাসহ মাত্র ৮২,০০০ থেকে ৯৫,০০০ টাকায় ৪ দিনের সিঙ্গাপুর ট্যুর সম্পন্ন করা যায়।",
    category: "Family & Budget",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `ঢাকা (DAC) থেকে মাত্র **৪ ঘণ্টা ১০ মিনিটের ডিরেক্ট ফ্লাইটে** (বিমান বাংলাদেশ, সিঙ্গাপুর এয়ারলাইন্স বা ইউএস-বাংলা) যাওয়া যায় এশিয়ার সবচেয়ে পরিচ্ছন্ন, নিরাপদ ও হুইলচেয়ার-বান্ধব দেশ **সিঙ্গাপুরে**। তিনটি স্মার্ট কৌশল—**MRT SimplyGo কন্ট্যাক্টলেস কার্ড ব্যবহার**, **Little India / Bugis হোটেল নির্বাচন**, এবং **MUIS হালাল ফুড কোর্ট**—ব্যবহার করলে সিঙ্গাপুর ভ্রমণের খরচ ৪৫% পর্যন্ত কমে আসে!

১. MRT SIMPLYGO কৌশল: বাংলাদেশি ডুয়াল-কারেন্সি কার্ড দিয়েই মেট্রো ও বাসে যাতায়াত!
সিঙ্গাপুরের **Land Transport Authority (LTA - lta.gov.sg)**-এর নিয়ম অনুযায়ী পর্যটকদের এখন আর আলাদা করে ৫ ডলারের অফেরতযোগ্য ফি দিয়ে EZ-Link ট্রেন কার্ড কেনার প্রয়োজন নেই:
- **MRT SimplyGo কীভাবে কাজ করে:** আপনার পাসপোর্ট-এনডোর্স করা যেকোনো বাংলাদেশি **Contactless Visa বা Mastercard Dual-Currency Card** (EBL, City Bank, BRAC, MTB, SCB) সরাসরি মেট্রো স্টেশনের গেটে এবং পাবলিক বাসে ওঠার ও নামার সময় ট্যাপ করুন!
- **বিমানবন্দর থেকে শহরে বিশাল সাশ্রয়:** চাঙ্গি এয়ারপোর্ট থেকে ট্যাক্সিতে শহরে যেতে যেখানে **SGD 30–38 (~BDT 3,200)** লাগে, সেখানে মেট্রোতে (MRT) **Little India বা Bugis** যেতে জনপ্রতি খরচ হয় মাত্র **SGD 2.10 (~BDT 192)**!

২. ধাপে ধাপে ৪ দিনের সিঙ্গাপুর ফ্যামিলি ইটিনারারি (দিনভিত্তিক প্ল্যান)
- **১ম দিন — Jewel Changi জলপ্রপাত, Little India এবং ফ্রি Marina Bay লাইট শো:**
  • চাঙ্গি এয়ারপোর্টে নেমেই বিশ্ববিখ্যাত ইনডোর জলপ্রপাত **HSBC Rain Vortex (Jewel Changi)** দেখুন (প্রবেশ সম্পূর্ণ ফ্রি!)। এরপর MRT ধরে **Little India (Mustafa Centre-এর পাশে) বা Bugis**-এ হোটেলে চেক-ইন করে গরম বিরিয়ানি বা মুতাবাক খান।
  • সন্ধ্যা সাড়ে ৭টায় **Bayfront MRT** স্টেশনে গিয়ে **Marina Bay Sands-এর Spectra ওয়াটার শো** (রাত ৮টা ও ৯টা) এবং **Gardens by the Bay-এর Supertree লাইট শো** (সন্ধ্যা ৭:৪৫ ও ৮:৪৫) উপভোগ করুন—দুটো শো-ই **১০০% ফ্রি**!
- **২য় দিন — Sentosa Island, কেবল কার, S.E.A. Aquarium অথবা Universal Studios:**
  • MRT ধরে **HarbourFront (VivoCity Mall)** গিয়ে বোর্ডওয়াক বা মনোরেল ধরে **Sentosa Island**-এ যান। সারাদিন **Universal Studios Singapore** বা **S.E.A. Aquarium ও Palawan Beach** ঘুরে রাতে সমুদ্রের পাড়ে **Wings of Time** লেজার শো দেখুন।
- **৩য় দিন — মসজিদ সুলতান (Kampong Glam), Cloud Forest ও Night Safari:**
  • দুপুরে আরব স্ট্রিটের ঐতিহাসিক স্বর্ণগম্বুজ **Masjid Sultan**-এ জোহরের নামাজ আদায় করে শতবর্ষী **Zam Zam Restaurant**-এ হালাল মুতাবাক ও বিরিয়ানি খান (SGD 8–12)। বিকেলে শীতাতপ নিয়ন্ত্রিত **Cloud Forest ও Flower Dome** ঘুরুন।
- **৪র্থ দিন — ২৪ ঘণ্টা খোলা Mustafa Centre-এ শপিং ও ৯% GST ট্যাক্স রিফান্ড:**
  • দেশে ফেরার আগে **Mustafa Centre** থেকে চকলেট, পারফিউম, ঘড়ি ও ইলেকট্রনিক্স কিনুন। **SGD 100**-এর বেশি কেনাকাটায় পাসপোর্ট দেখিয়ে ইলেকট্রনিক রিসিট নিন এবং চাঙ্গি এয়ারপোর্টে **৯% পর্যন্ত নগদ GST Tax Refund** বুঝে নিন! সকালে হোটেল চেক-আউটের পর ভারী ব্যাগ রাখার জায়গা না থাকলে Little India বা Bugis MRT-র পাশে **Radical Storage**-এ স্যুটকেস জমা রেখে হাত খালি রেখে শপিং শেষ করুন।

৩. ঢাকা থেকে ৪ দিনের সিঙ্গাপুর ট্রিপের বাস্তব BDT বাজেট (জনপ্রতি — ফ্যামিলি/ডাবল শেয়ারিং)
- **রাউন্ডট্রিপ ডিরেক্ট ফ্লাইট (DAC – SIN – DAC):** BDT 41,500 – 48,000
- **সিঙ্গাপুর ই-ভিসা (অনুমোদিত এজেন্ট) + ফ্রি SGAC কার্ড:** BDT 4,500 – 6,000
- **৩ রাতের হোটেল (Little India / Bugis শেয়ারিং):** BDT 18,500 – 26,000
- **MRT SimplyGo ট্রেন ভাড়া ও ৪ দিনের হালাল খাবার:** BDT 9,500 – 12,500
- **Gardens by the Bay ও Sentosa অ্যাটাকশন টিকিট:** BDT 8,000 – 12,500
- **মোট ৪ দিনের জনপ্রতি খরচ:** **BDT 82,000 – BDT 1,05,000**`,
    internalLinks: [
      { text: "Singapore Tourist Visa গাইড (অনুমোদিত এজেন্ট ও LOI V39A)", path: "/blog/singapore-visa-guide-bangladesh-agents" },
      { text: "Singapore ৪ দিনের বিস্তারিত BDT খরচ ক্যালকুলেটর", path: "/costs/singapore-costs" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ঢাকা থেকে সেরা ৬টি বাজেট ফ্যামিলি ট্যুর গন্তব্য", path: "/blog/top-budget-family-destinations-from-dhaka" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "Gardens by the Bay, Universal Studios ও Sentosa টিকিটে ২০% ছাড় পান",
      body: "Klook থেকে আগেভাগেই সিঙ্গাপুরের সব থিম পার্কের মোবাইল QR টিকিট বুক করে দীর্ঘ লাইন এড়ান।",
    },
  },

  "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": {
    title: "বাংলাদেশ থেকে Bumrungrad ও Bangkok Hospital মেডিকেল চেকআপ গাইড (2026): অ্যাপয়েন্টমেন্ট, BDT খরচ ও হালাল হোটেল",
    summary:
      "প্রতি বছর হাজার হাজার বাংলাদেশি পরিবার বার্ষিক ফুল-বডি হেলথ চেকআপ, হার্ট, গ্যাস্ট্রো ও ক্যান্সার বিশেষজ্ঞ ডাক্তার দেখানোর জন্য ঢাকা থেকে ব্যাংককের Bumrungrad International Hospital (Sukhumvit Soi 3) এবং Bangkok Hospital-এ যান। কোনো দালাল বা মধ্যস্বত্বভোগী ছাড়াই কীভাবে অনলাইনে সরাসরি ডাক্তারের অ্যাপয়েন্টমেন্ট ও ফ্রি বাংলা দোভাষী (Interpreter) বুক করবেন, thaievisa.go.th পোর্টালে কোন ভিসা নেবেন, হেলথ চেকআপ প্যাকেজের BDT খরচ কত এবং হাসপাতালের ৩০০ মিটারের মধ্যে সেরা হালাল হোটেল কোনগুলো—জানুন এই পূর্ণাঙ্গ গাইডে।",
    category: "Family & Budget",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৮ মিনিট পড়া",
    content: `৪–৫ দিনের ব্যাংকক ফ্যামিলি ট্রিপের পাশাপাশি বাবা-মা বা পরিবারের সদস্যদের জন্য বিশ্বমানের **JCI-স্বীকৃত হাসপাতালে ফুল-বডি হেলথ চেকআপ** করানো বাংলাদেশি পরিবারগুলোর কাছে অত্যন্ত জনপ্রিয়। নিচে **Bumrungrad International Hospital** এবং **Bangkok Hospital**-এ সরাসরি অ্যাপয়েন্টমেন্ট, চেকআপ প্যাকেজ ও হালাল হোটেলের নির্ভুল হিসাব দেওয়া হলো।

১. BUMRUNGRAD বনাম BANGKOK HOSPITAL: কোনটি বেছে নেবেন এবং হেলথ চেকআপের খরচ কত (BDT)?
দুটি হাসপাতালেই বাংলাদেশি রোগীদের জন্য **বিনামূল্যে বাংলা ভাষাভাষী দোভাষী (Free Bangla Interpreter)**, নামাজের স্থান এবং ঢাকা অফিস সাপোর্ট রয়েছে:
অপশন A: Bumrungrad International Hospital (Sukhumvit Soi 3 / Nana):
- **লোকেশন সুবিধা:** হাসপাতালটি ব্যাংককের প্রধান মুসলিম এলাকা **Sukhumvit Soi 3 (Arab Street)**-এর ভেতরেই অবস্থিত—চারপাশে রয়েছে অসংখ্য বাংলাদেশি, ভারতীয় ও অ্যারাবিয়ান হালাল রেস্টুরেন্ট!
- **২০২৬ সালের হেলথ চেকআপ প্যাকেজ মূল্য (হাসপাতালের কাউন্টারে সরাসরি পেমেন্ট):**
  • **বেসিক হোলিস্টিক চেকআপ (৪০ বছরের নিচে):** ~THB 9,500 – 12,800 (**~BDT 31,000 – BDT 42,000**)
  • **কম্প্রিহেনসিভ এক্সিকিউটিভ চেকআপ (৪০–৫৫ বছর — আল্ট্রাসাউন্ড, ইসিজি/ইটিটি, লিভার, কিডনি, থাইরয়েড, কোলেস্টেরল ও টিউমার মার্কারসহ):** ~THB 18,500 – 26,500 (**~BDT 60,500 – BDT 87,000**)
  • **সিনিয়র ভাইটালিটি / মা-বাবার পূর্ণাঙ্গ কার্ডিয়াক ও ক্যান্সার স্ক্রিনিং (৫৫+ বছর):** ~THB 29,000 – 38,000 (**~BDT 95,000 – BDT 1,25,000**)
অপশন B: Bangkok Hospital Headquarters (New Petchaburi Road):
- **লোকেশন সুবিধা:** প্রাতুনাম হালাল জোন থেকে ট্যাক্সিতে মাত্র ১০ মিনিট দূরত্ব; বিশেষায়িত হার্ট ও ক্যান্সার হাসপাতালের জন্য বিখ্যাত এবং সমমানের চেকআপ প্যাকেজের খরচ বামরুনগ্রাদের তুলনায় **১০%–১৫% কম**।

২. ধাপে ধাপে নিয়ম: কীভাবে ফ্রি অ্যাপয়েন্টমেন্ট ও THAILAND E-VISA করবেন?
ধাপ ১: ভিসা আবেদনের আগেই অনলাইনে ফ্রি অ্যাপয়েন্টমেন্ট লেটার নিন:
- ভ্রমণের ২–৩ সপ্তাহ আগে **bumrungrad.com** বা **bangkokhospital.com** ওয়েবসাইটে (অথবা ঢাকার বনানী/পান্থপথ অফিশিয়াল রেফারেল অফিসে) যোগাযোগ করে রোগীর পাসপোর্ট নম্বর দিয়ে **Official Appointment Confirmation Letter** এবং **Free Bengali Interpreter** বুক করুন।
ধাপ ২: Tourist Visa (TR) নাকি Medical Visa (MT) নেবেন?
- **১–২ দিনের সাধারণ হেলথ চেকআপ ও ফ্যামিলি ট্যুরের জন্য:** অফিশিয়াল **thaievisa.go.th** পোর্টালে সাধারণ **৬০ দিনের Tourist e-Visa (TR)** আবেদন করাই সবচেয়ে সহজ—সাথে হোটেল বুকিং ও হাসপাতালের অ্যাপয়েন্টমেন্ট লেটার যুক্ত করে দিন।
- **বড় অপারেশন বা দীর্ঘমেয়াদী চিকিৎসার জন্য:** হাসপাতালের ইনভাইটেশন লেটার দিয়ে **Medical Visa (MT)** আবেদন করুন।

৩. বামরুনগ্রাদ হাসপাতালের ৩০০ মিটারের মধ্যে সেরা হুইলচেয়ার-বান্ধব হালাল হোটেল
সকালে খালি পেটে (Fasting) রক্ত পরীক্ষার জন্য বয়স্ক মা-বাবাকে নিয়ে হাসপাতালের একদম কাছে সমতল রাস্তায় থাকুন:
- **বাজেট ও মিড-রেঞ্জ হোটেল (BDT 4,800 – 8,500/রাত):** *FuramaXclusive Sukhumvit* (হাসপাতালের ঠিক উল্টো পাশে!), *Zenith Sukhumvit Hotel*, অথবা *Nana Hiso Hotel*।
- **রান্নাঘরসহ ফ্যামিলি সার্ভিসড অ্যাপার্টমেন্ট (BDT 9,500 – 16,000/রাত):** *Fraser Suites Sukhumvit (Soi 11)* অথবা *Aspira Tropical Residence*।

৪. বাংলাদেশ ব্যাংকের $10,000+ মেডিকেল কোটা ব্যবহারের নিয়ম
**বাংলাদেশ ব্যাংকের (bb.org.bd)** নিয়ম অনুযায়ী আপনার সাধারণ **$18,000 USD বার্ষিক ট্রাভেল কোটার** বাইরেও, হাসপাতালের অফিশিয়াল প্রাক্কলিত বিল (Cost Estimate Invoice) দেখিয়ে ব্যাংকের AD শাখা থেকে চিকিৎসার জন্য অতিরিক্ত **USD $10,000+ Medical Quota** কার্ডে বা হাসপাতালের একাউন্টে ছাড় করানো যায়!`,
    internalLinks: [
      { text: "অনলাইনে Thailand e-Visa করার নিয়ম (thaievisa.go.th গাইড)", path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide" },
      { text: "ব্যাংককে হালাল খাবারের সেরা জায়গা (Pratunam ও Sukhumvit Soi 3)", path: "/blog/halal-food-guide-bangkok-bangladesh" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "কার্ড ছাড়াই bKash বা ব্যাংক ট্রান্সফারে ব্যাংকক ফ্লাইট ও হোটেল বুকিং", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "সুবর্ণভূমি এয়ারপোর্ট থেকে বামরুনগ্রাদ হোটেলে প্রাইভেট ফ্যামিলি মিনিভ্যান বুক করুন",
      body: "বয়স্ক রোগী ও হুইলচেয়ার নিয়ে লম্বা ট্যাক্সি লাইনে না দাঁড়িয়ে আগেভাগেই এয়ারপোর্ট পিকআপ নিশ্চিত করুন।",
    },
  },

  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": {
    title: "বিদেশ ভ্রমণে বাংলাদেশিদের জন্য সেরা Travel eSIM (Airalo) ও বাধ্যতামূলক Travel Insurance গাইড (2026 — ওমরাহ, এশিয়া ও ইউরোপ)",
    summary:
      "জেদ্দা, ব্যাংকক, কুয়ালালামপুর বা প্যারিস এয়ারপোর্টে নামার পর ইন্টারনেট না থাকলে যেমন Nusuk অ্যাপের লাইভ QR কোড, Grab/Careem ট্যাক্সি বা ব্যাংকের 3D-Secure OTP খোলা যায় না, তেমনি এয়ারপোর্টের সিমের দোকানে ৪৫ মিনিট লাইনে দাঁড়িয়ে ৩ গুণ বেশি দাম দিতে হয়। অন্যদিকে শেনজেন (ইউরোপ), থাইল্যান্ড ও ওমরাহ ভিসার জন্য বৈধ Travel Medical Insurance অপরিহার্য। জানুন কীভাবে ঢাকা ছাড়ার আগেই মাত্র ৫৫০–১,১০০ টাকায় Airalo/Yesim eSIM এবং একটি ট্রাভেল ইনস্যুরেন্স কিনবেন।",
    category: "Family & Budget",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "জায়ান রহমান (সিনিয়র ট্রাভেল রিসার্চার)",
    readTime: "৬ মিনিট পড়া",
    content: `ঢাকা (DAC) থেকে ফ্লাইটে ওঠার ২৪ ঘণ্টা আগে মাত্র দুটি ছোট ডিজিটাল প্রস্তুতি নিলে বিদেশের মাটিতে নামার পর ৯০% ভোগান্তি দূর হয়ে যায়: একটি হলো **Travel eSIM** (যাতে বিমান রানওয়ে স্পর্শ করার সাথে সাথেই আপনার ফোনে 5G ইন্টারনেট চালু হয়ে যায়) এবং অন্যটি **International Travel Medical Insurance** (যা ভিসা অনুমোদন ও বিদেশে আকস্মিক ৫–১০ লক্ষ টাকার হাসপাতালের বিল থেকে আপনার পরিবারকে সুরক্ষা দেয়)।

১. TRAVEL ESIM (AIRALO / YESIM) বনাম রোমিং বনাম এয়ারপোর্টের লোকাল সিম কার্ড
কেন অভিজ্ঞ বাংলাদেশি ভ্রমণকারীরা এখন এয়ারপোর্টে ফিজিক্যাল সিম না কিনে **Airalo ও Yesim Travel eSIM** ব্যবহার করেন?
- **১. ব্যাংকের 3D-Secure OTP পাওয়ার জন্য দেশীয় সিম সচল থাকে:**
  • আপনার iPhone বা Android ফোনে যখন **eSIM** চালু করবেন, তখন আপনার আসল **Grameenphone, Robi, Banglalink বা Airtel সিমটি ফোনের ভেতরেই সচল থাকে**—ফলে বিদেশে বসেও আপনি EBL, City Bank বা BRAC ব্যাংকের ফ্রি ইনকামিং OTP SMS পেতে থাকবেন, আর **Airalo eSIM** দিয়ে চলবে হাই-স্পিড 4G/5G ডাটা!
- **২. মাঝরাতে এয়ারপোর্টে লম্বা লাইন ও অতিরিক্ত খরচ থেকে মুক্তি:**
  • ঢাকা থেকে জেদ্দা, ব্যাংকক, কুয়ালালামপুর বা মালে ফ্লাইটগুলো প্রায়ই গভীর রাতে পৌঁছায় যখন এয়ারপোর্টের সিম বুথে লম্বা লাইন থাকে এবং ২৫–৩৫ ডলারের ব্যয়বহুল প্যাকেজ গছিয়ে দেওয়া হয়। অথচ **Airalo বা Yesim eSIM** মাত্র **$4.50 থেকে $9.00 USD (~BDT 550 – 1,100)** খরচে দেশ থেকেই ইনস্টল করে নেওয়া যায়!
- **৩. মাল্টি-সিটি ভ্রমণে এক সিমেই একাধিক দেশ (Asialink / Menalink):**
  • আপনি যখন **মালয়েশিয়া + থাইল্যান্ড + সিঙ্গাপুর** অথবা **ওমরাহ + দুবাই** কম্বো ট্রিপে যাবেন, তখন একটি মাত্র রিজিওনাল eSIM নিলেই প্রতিটি দেশে নামার সাথে সাথে স্বয়ংক্রিয়ভাবে নেটওয়ার্ক কানেক্ট হয়ে যাবে।

২. কোন কোন দেশে ভ্রমণের জন্য TRAVEL MEDICAL INSURANCE বাধ্যতামূলক?
বিদেশে হঠাৎ ফুড পয়জনিং, ডিহাইড্রেশন বা সামান্য দুর্ঘটনায় ১ দিন হাসপাতালে ভর্তি হতে হলেও **USD $3,000–$10,000 (৩.৫ লক্ষ থেকে ১২ লক্ষ টাকা)** বিল আসে। এছাড়া ভিসার নিয়মেও এটি জরুরি:
- **১. ইউরোপ বা শেনজেন ভিসা (বাধ্যতামূলক €30,000 কভারেজ):**
  • **EU Visa Code (Article 15)** অনুযায়ী ঢাকায় VFS-এ যেকোনো শেনজেন দেশের ভিসার আবেদনের সাথে কমপক্ষে **€30,000 (~USD $35,000)** কভারেজের ট্রাভেল মেডিকেল ইনস্যুরেন্স পলিসি জমা দেওয়া আইনত বাধ্যতামূলক।
- **২. থাইল্যান্ড ই-ভিসা (thaievisa.go.th), মালয়েশিয়া ও ফ্যামিলি ট্যুর (ট্রাভেল ইনস্যুরেন্স):**
  • একটি আন্তর্জাতিক ট্রাভেল মেডিকেল ইনস্যুরেন্স নিলে ২ মিনিটেই ইমেইলে অফিশিয়াল ইংরেজি PDF পলিসি চলে আসে—যা চিকিৎসা খরচ, হারানো লাগেজ ও ফ্লাইট ডিলে কভার করে।`,
    internalLinks: [
      { text: "মদিনায় রিয়াজুল জান্নাতে ঢুকতে লাইভ Nusuk QR কোডের নিয়ম", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ইউরোপ, যুক্তরাজ্য ও আমেরিকা ভ্রমণ গাইড", path: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide" },
      { text: "Travel Tools হাবে eSIM ও ট্রাভেল ইনস্যুরেন্স তুলনা করুন", path: "/tools" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "মাত্র ৩ মিনিটে আপনার Airalo Travel eSIM ডাউনলোড করুন",
      body: "ঢাকা ছাড়ার আগেই ই-সিম ইনস্টল করে নিন যাতে বিদেশের মাটিতে নামার প্রথম সেকেন্ড থেকেই ইন্টারনেট সচল থাকে।",
    },
  },

  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": {
    title: "বাংলাদেশ থেকে ৭ দিনে Sri Lanka + Maldives কম্বো ট্যুর (2026): কলম্বো ETA ভিসা, ক্যান্ডি ট্রেন, মাফুশি ও BDT খরচ",
    summary:
      "কলম্বো (CMB) এবং মালে (MLE) এয়ারপোর্টের দূরত্ব বিমানে মাত্র ৮০ মিনিট—এবং ঢাকা থেকে মালদ্বীপগামী SriLankan Airlines-এর ফ্লাইটগুলো কলম্বো হয়েই যাতায়াত করে! তাই সামান্য বুদ্ধি খাটিয়ে একটি ৭ দিনের Sri Lanka + Maldives Multi-City টিকিট কাটলে (৪ দিন শ্রীলঙ্কার ক্যান্ডি, নুওয়ারা এলিয়া চা বাগান ও এলা নাইন আর্চ ব্রিজ ট্রেন ভ্রমণ + ৩ দিন মালদ্বীপের মাফুশি দ্বীপে নীল সমুদ্রে স্নরকেলিং) মাত্র ৯৫,০০০ থেকে ১,২০,০০০ টাকায় এক ট্রিপেই দুটি দেশ ও পাসপোর্টে ৪টি ইমিগ্রেশন স্ট্যাম্প পাওয়া যায়!",
    category: "Family & Budget",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `বাংলাদেশি হানিমুন কাপল, পরিবার এবং যাঁরা নিজেদের নতুন পাসপোর্টে শক্তিশালী **Travel History** তৈরি করতে চান—তাঁদের জন্য **Sri Lanka + Maldives ৭ দিনের কম্বো ট্যুর** দক্ষিণ এশিয়ার সেরা ২-ইন-১ ভ্রমণ পরিকল্পনা। কারণ শুধু মালদ্বীপ যেতে যেখানে ৭৫,০০০–৮৫,০০০ টাকা খরচ হয়, সেখানে সাথে মাত্র ১৮,০০০–২০,০০০ টাকা যোগ করলেই শ্রীলঙ্কার সবুজ পাহাড় ও চা বাগান ঘুরে আসা যায়!

১. বাংলাদেশি পাসপোর্টের ভিসা নিয়ম: শ্রীলঙ্কা ETA + মালদ্বীপ ফ্রি VOA
দুটি দেশেই ঢাকার কোনো দূতাবাসে পাসপোর্ট জমা দেওয়া বা ইন্টারভিউয়ের ঝামেলা নেই:
- **🇱🇰 শ্রীলঙ্কা ট্যুরিস্ট ভিসা / ETA (৩০ দিন):**
  • **SAARC দেশের নাগরিক** হিসেবে বাংলাদেশি পাসপোর্টধারীরা মাত্র **USD $20 (~BDT 2,450)** ফি দিয়ে অনলাইনে শ্রীলঙ্কার ETA / e-Visa নিতে পারেন (অথবা কলম্বো এয়ারপোর্টে $25 দিয়ে অন-অ্যারাইভাল ভিসা নেওয়া যায়, তবে ঢাকা ইমিগ্রেশনের সুবিধার্থে ফ্লাইটের ৪ দিন আগে অনলাইনে নিয়ে নেওয়া উত্তম)।
- **🇲🇻 মালদ্বীপ ফ্রি ৩০ দিনের Visa on Arrival (VOA):**
  • বাংলাদেশিদের জন্য **১০০% ফ্রি ($0 USD)**! শুধু ফ্লাইটের ৯৬ ঘণ্টার মধ্যে অনলাইনে ফ্রি **IMUGA ফর্ম (imuga.immigration.gov.mv)** পূরণ করে QR কোডটি ফোনে সেভ রাখুন।

২. ৭ দিনের নিখুঁত SRI LANKA + MALDIVES কম্বো ইটিনারারি
মাল্টি-সিটি (Multi-City) টিকিট কাটুন: ` + "`" + `Dhaka (DAC) → Colombo (CMB) → Malé (MLE) → Dhaka (DAC)` + "`" + `:
- **১ম–২য় দিন: কলম্বো ও ক্যান্ডি পাহাড়ি শহর (শ্রীলঙ্কা):**
  • কলম্বো এয়ারপোর্টে নেমে পরিবারের জন্য একটি প্রাইভেট এসি কার/ভ্যান ভাড়া করুন (~$55–$65/দিন)। পথে **Pinnawala Elephant Orphanage** দেখে ক্যান্ডি লেক ও বোটানিক্যাল গার্ডেন ঘুরুন।
- **৩য় দিন: নুওয়ারা এলিয়া চা বাগান ও বিশ্ববিখ্যাত Kandy-to-Ella নীল পাহাড়ি ট্রেন:**
  • সিলন চা ফ্যাক্টরি ঘুরে নুওয়ারা এলিয়া (Nanu Oya) থেকে মেঘের ভেতর দিয়ে চলা বিখ্যাত ট্রেনে চড়ে **Ella Nine Arch Bridge** ভ্রমণ করুন।
- **৪র্থ দিন: গল ফোর্ট (Galle Fort) হয়ে সন্ধ্যায় মালে (মালদ্বীপ) ফ্লাইট:**
  • সমুদ্রের ধারের ঐতিহাসিক ডাচ ফোর্ট দেখে কলম্বো এয়ারপোর্ট থেকে ৮০ মিনিটের ফ্লাইটে মালে (MLE) পৌঁছান এবং **$25 স্পিডবোটে মাফুশি দ্বীপে** চেক-ইন করুন।
- **৫ম–৬ষ্ঠ দিন: মাফুশি দ্বীপ, $30 স্নরকেলিং ও স্যান্ডব্যাংক ড্রোন পিকনিক:**
  • মাত্র **$30 USD (~BDT 3,650)**-এর ফুল-ডে বোট ট্যুরে কোরাল রিফ স্নরকেলিং, ডলফিন ক্রুজ এবং মাঝসমুদ্রের সাদা বালুচরে (Sandbank) দুপুরের খাবার ও ফ্রি আন্ডারওয়াটার GoPro/ড্রোন ছবি তুলুন!
- **৭ম দিন: মালে শহর ঘুরে ঢাকায় (DAC) প্রত্যাবর্তন:**
  • এক সফরেই ২টি দেশ ও ৪টি ইমিগ্রেশন স্ট্যাম্প নিয়ে ঢাকায় ফিরে আসুন। (টিপস: কলম্বোতে ৮–১০ ঘণ্টার ট্রানজিট লে-ওভারে শহর ঘুরতে চাইলে বা ক্যান্ডি-এলা ট্রেনে ওঠার আগে ভারী স্যুটকেসগুলো কলম্বো বা ক্যান্ডির ভেরিফায়েড **Radical Storage** পয়েন্টে জমা রাখতে পারেন।)

৩. ৭ দিনের শ্রীলঙ্কা + মালদ্বীপ কম্বো ট্রিপের মোট BDT বাজেট (জনপ্রতি — কাপল/ফ্যামিলি শেয়ারিং)
- **মাল্টি-সিটি ফ্লাইট টিকিট (DAC → CMB → MLE → DAC):** BDT 56,000 – 68,000
- **ভিসা ফি (শ্রীলঙ্কা SAARC $20 ETA + মালদ্বীপ ফ্রি ভিসা):** BDT 2,500
- **৩ রাত শ্রীলঙ্কা হোটেল + ৩ রাত মাফুশি বিচ হোটেল (শেয়ারিং):** BDT 18,000 – 26,000
- **শ্রীলঙ্কা প্রাইভেট গাড়ি শেয়ার + মাফুশি স্পিডবোট + $30 স্নরকেলিং ট্যুর:** BDT 11,500 – 14,500
- **৭ দিনের হালাল খাবার ও এন্ট্রি টিকিট:** BDT 7,000 – 9,500
- **মোট ৭ দিনের ২-দেশ কম্বো বাজেট:** **জনপ্রতি BDT 95,000 – BDT 1,20,500!**`,
    internalLinks: [
      { text: "মাত্র ৭৫,০০০ টাকায় মালদ্বীপ ভ্রমণ (Maafushi গাইড)", path: "/blog/maldives-budget-trip-bangladesh-maafushi" },
      { text: "নতুন পাসপোর্টে (Fresh Passport) ৩ ধাপে Travel History তৈরির গাইড", path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia" },
      { text: "কার্ড ছাড়াই bKash বা ব্যাংক ট্রান্সফারে মাল্টি-সিটি ফ্লাইট বুকিং", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Maldives ৫ দিনের বিস্তারিত BDT খরচ ক্যালকুলেটর", path: "/costs/maldives-costs" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "ঢাকা → কলম্বো → মালে মাল্টি-সিটি ফ্লাইট ভাড়া যাচাই করুন",
      body: "Aviasales-এর Multi-City অপশন ব্যবহার করে এক টিকিটেই শ্রীলঙ্কা ও মালদ্বীপ কম্বো ফ্লাইট খুঁজুন।",
    },
  },

  "bangladesh-epassport-application-renewal-64-districts-fee-guide": {
    title: "বাংলাদেশের ৬৪ জেলায় e-Passport আবেদন ও MRP নবায়ন গাইড (2026): ৪৮ বনাম ৬৪ পৃষ্ঠা, সরকারি ফি ও পুলিশ ভেরিফিকেশন",
    summary:
      "ফরজ হজ, DIY ওমরাহ, ব্যাংককে চিকিৎসা কিংবা মালয়েশিয়ায় ফ্যামিলি ট্যুর—যেকোনো আন্তর্জাতিক ভ্রমণের প্রথম শর্ত হলো কমপক্ষে ৬ মাসের মেয়াদসহ একটি বৈধ বাংলাদেশি e-Passport। ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তরের (DIP - epassport.gov.bd) ২০২৬ সালের সর্বশেষ নিয়ম অনুযায়ী দেশের ৬৪ জেলার ৭২টি আঞ্চলিক পাসপোর্ট অফিসে (RPO) দালাল ছাড়াই অনলাইনে আবেদন, ১৫% ভ্যাটসহ ৪৮ ও ৬৪ পৃষ্ঠার (৫ ও ১০ বছর মেয়াদী) নির্ভুল ফি তালিকা, MRP থেকে e-Passport রিনিউ করার নিয়ম এবং পুলিশ ভেরিফিকেশন ছাড়াই দ্রুত পাসপোর্ট পাওয়ার উপায় জানুন।",
    category: "Visa & Immigration",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৮ মিনিট পড়া",
    content: `ওমরাহ ই-ভিসা, থাইল্যান্ড/মালয়েশিয়া ই-ভিসা অথবা ব্যাংকে **Passport Dollar Endorsement** করার আগে আপনার পাসপোর্টের মেয়াদ অবশ্যই ভ্রমণ থেকে ফেরার তারিখের পর কমপক্ষে **৬ মাস (১৮০ দিন)** অবশিষ্ট থাকতে হবে। নিচে **ইমিগ্রেশন ও পাসপোর্ট অধিদপ্তরের (epassport.gov.bd)** অফিশিয়াল নিয়মে দেশের যেকোনো জেলা থেকে নতুন ই-পাসপোর্ট করা বা পুরনো পাসপোর্ট রিনিউ করার গাইড দেওয়া হলো।

১. ৪৮ পৃষ্ঠা বনাম ৬৪ পৃষ্ঠা (১০ বছর মেয়াদ): কোনটি নেবেন এবং ২০২৬ সালের সরকারি ফি তালিকা (১৫% ভ্যাটসহ)
ভ্রমণকারী ও ওমরাহ যাত্রীদের আমরা সবসময় **৬৪ পৃষ্ঠা, ১০ বছর মেয়াদী ই-পাসপোর্ট** নেওয়ার পরামর্শ দিই—কারণ ৪৮ পৃষ্ঠা ও ৬৪ পৃষ্ঠার ফি-এর পার্থক্য মাত্র **১,৭২৫ টাকা**, অথচ ১০ বছরে ভিসা স্টিকার, ইমিগ্রেশন সিল ও ব্যাংকের ডলার এনডোর্সমেন্ট সিলের কারণে ৪৮ পৃষ্ঠা দ্রুত ভরে যায়!
- **৪৮ পৃষ্ঠা — ৫ বছর মেয়াদ:**
  • রেগুলার ডেলিভারি (১৫–২১ কর্মদিবস): **BDT 4,025**
  • এক্সপ্রেস ডেলিভারি (৭–১০ কর্মদিবস): **BDT 6,325**
  • সুপার এক্সপ্রেস ডেলিভারি (২ কর্মদিবস — আগারগাঁও): **BDT 8,625**
- **৪৮ পৃষ্ঠা — ১০ বছর মেয়াদ (১৮ থেকে ৬৫ বছর বয়সীদের জন্য):**
  • রেগুলার: **BDT 5,750** | এক্সপ্রেস: **BDT 8,050** | সুপার এক্সপ্রেস: **BDT 10,350**
- **৬৪ পৃষ্ঠা — ৫ বছর মেয়াদ:**
  • রেগুলার: **BDT 6,325** | এক্সপ্রেস: **BDT 8,625** | সুপার এক্সপ্রেস: **BDT 12,075**
- **৬৪ পৃষ্ঠা — ১০ বছর মেয়াদ (ভ্রমণকারীদের জন্য সেরা):**
  • রেগুলার: **BDT 8,050** | এক্সপ্রেস: **BDT 10,350** | সুপার এক্সপ্রেস: **BDT 13,800**
*(ফি পরিশোধ করা যাবে অনলাইনে **A-Challan**-এর মাধ্যমে bKash, Nagad, Visa/Mastercard বা সোনালী ব্যাংকে)।*

২. ৬৪ জেলার যেকোনো আঞ্চলিক পাসপোর্ট অফিসে (RPO) আবেদনের ধাপ ও ডকুমেন্ট ফোল্ডার
১. **শুধুমাত্র অফিশিয়াল ওয়েবসাইটে (epassport.gov.bd) আবেদন করুন:** কোনো দালাল বা দোকানের ওপর নির্ভর না করে নিজেই অনলাইনে ফর্ম পূরণ করুন।
২. **NID বা জন্ম নিবন্ধনের (BRC) সাথে অক্ষরে অক্ষরে মিল রাখুন:** আপনার নাম, পিতা-মাতার নাম এবং জন্ম তারিখ যেন আপনার **Smart NID Card** (অপ্রাপ্তবয়স্কদের ক্ষেত্রে অনলাইন জন্ম নিবন্ধন সনদ)-এর সাথে ১০০% হুবহু মিলে।
৩. **বায়োমেট্রিক ও ছবি তোলার দিন যা সাথে নেবেন:**
   • প্রিন্ট করা **Application Summary** (বারকোডসহ) এবং **Online Application Form**।
   • **A-Challan** ফি পরিশোধের রিসিট।
   • আসল **National ID Card (NID)** ও ফটোকপি (১৮ বছরের নিচে হলে অনলাইন Birth Certificate + বাবা-মায়ের NID কপি; ৬ বছরের নিচের শিশুদের ক্ষেত্রে ৩আর সাইজের ছবি)।
   • **আসল পুরনো MRP বা e-Passport** (রিনিউ করার ক্ষেত্রে বাধ্যতামূলক)।

৩. পাসপোর্ট রিনিউ (RENEWAL) করতে কি পুলিশ ভেরিফিকেশন লাগে?
- **তথ্য অপরিবর্তিত থাকলে পুলিশ ভেরিফিকেশন লাগে না!** আপনার যদি আগের কোনো **MRP বা e-Passport** থাকে এবং আপনি নাম, পিতা-মাতার নাম, জন্ম তারিখ ও স্থায়ী ঠিকানা অপরিবর্তিত রেখে রিনিউ (Re-issue) আবেদন করেন, তবে নতুন করে পুলিশ ভেরিফিকেশন ছাড়াই দ্রুত পাসপোর্ট প্রিন্ট হয়ে আসে।
- **গুরুত্বপূর্ণ টিপস:** নতুন ই-পাসপোর্ট হাতে পাওয়ার সময় পুরনো পাসপোর্টটি *"Cancelled without Prejudice"* সিলসহ ফেরত নিন এবং বিদেশ ভ্রমণের সময় পুরনো ও নতুন পাসপোর্ট একসাথে পিন করে সাথে রাখুন!`,
    internalLinks: [
      { text: "নতুন পাসপোর্টে (Fresh Passport) ৩ ধাপে Travel History তৈরির গাইড", path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia" },
      { text: "নতুন পাসপোর্টে $18,000 ডলার এনডোর্সমেন্ট করার নিয়ম", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "NID ও ই-পাসপোর্ট দিয়ে সরকারি Hajj রেজিস্ট্রেশন (hajj.gov.bd)", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "ই-পাসপোর্ট হাতে পেয়েছেন? ঢাকা থেকে প্রথম আন্তর্জাতিক ফ্লাইটের ভাড়া দেখুন",
      body: "নেপাল, মালদ্বীপ, মালয়েশিয়া, থাইল্যান্ড ও সৌদি আরবের রাউন্ডট্রিপ বিমান ভাড়া তুলনা করুন।",
    },
  },

  "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": {
    title: "ফ্লাইট ডিলে, ক্যান্সেল বা লাগেজ হারালে বাংলাদেশি যাত্রীরা কীভাবে সর্বোচ্চ €600 (BDT 78,000) ক্ষতিপূরণ পাবেন? (2026)",
    summary:
      "প্রতি বছর হাজার হাজার বাংলাদেশি যাত্রী আন্তর্জাতিক ফ্লাইটে ৪ থেকে ১২ ঘণ্টা বিলম্ব (Delay), হঠাৎ ফ্লাইট বাতিল, ট্রানজিট ফ্লাইট মিস কিংবা ওমরাহ থেকে ফেরার পথে লাগেজ হারানোর শিকার হন—কিন্তু আইন না জানার কারণে এক কাপ কফি বা খাবারের ভাউচার ছাড়া কোনো টাকাই দাবি করেন না! অথচ ইউরোপীয় আইন EC 261/2004, UK 261, সৌদি আরবের GACA যাত্রী অধিকার আইন এবং মন্ট্রিল কনভেনশন অনুযায়ী বাংলাদেশি পাসপোর্টধারীরা জনপ্রতি সর্বোচ্চ €600 (~BDT 78,000) পর্যন্ত নগদ ক্ষতিপূরণ পাওয়ার অধিকারী। জানুন কীভাবে AirHelp-এর মাধ্যমে ফ্রিতে আবেদন করবেন।",
    category: "Cheap Flight Tips",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `অধিকাংশ বাংলাদেশি ভ্রমণকারী মনে করেন ফ্লাইট ৫ ঘণ্টা লেট হলে বা চেক-ইন করা স্যুটকেস না আসলে এয়ারলাইন্সের কাছে অনুরোধ করা ছাড়া কিছুই করার নেই। বাস্তবে **আন্তর্জাতিক বিমান চলাচল আইন আপনার জাতীয়তা বা পাসপোর্ট দেখে না**—আপনার রুট বা এয়ারলাইন্স যদি নির্দিষ্ট আইনের আওতায় পড়ে, তবে আপনি আইনত নগদ অর্থ ক্ষতিপূরণ পাবেন!

১. যে ৪টি আন্তর্জাতিক আইনে বাংলাদেশি যাত্রীরা নগদ ক্ষতিপূরণ পান
- **১. ইউরোপীয় আইন EC 261/2004 এবং UK 261 (জনপ্রতি সর্বোচ্চ €600 / £520 ≈ BDT 78,000):**
  • যুক্তরাজ্য (লন্ডন হিথ্রো, ম্যানচেস্টার) বা ইউরোপের যেকোনো এয়ারপোর্ট থেকে ছেড়ে আসা **ইউরোপীয় এয়ারলাইন্স** (Ryanair, EasyJet, Lufthansa, Air France, KLM, Wizz Air ইত্যাদি) অথবা EU-registered এয়ারলাইন্সের ফ্লাইটে চূড়ান্ত গন্তব্যে পৌঁছাতে **৩ ঘণ্টার বেশি বিলম্ব** হলে বা ফ্লাইট বাতিল হলে যাত্রীপ্রতি **€250–€600** ক্ষতিপূরণ প্রাপ্য। **গুরুত্বপূর্ণ:** ইউরোপীয় নন-এয়ারলাইন্স বা তৃতীয়-দেশীয় ক্যারিয়ার (যেমন: Qatar Airways, Emirates, Turkish Airlines, Saudia, Biman Bangladesh)-এ EC 261 সরাসরি প্রযোজ্য হয় না — তবে সংশ্লিষ্ট দেশের জাতীয় বা ট্রানজিট-সংক্রান্ত আইন (UK 261, Montreal Convention) প্রযোজ্য হতে পারে; প্রযোজ্যতা নির্ভর করে ফ্লাইট রুট, ক্যারিয়ার দেশ এবং বিলম্বের কারণের ওপর।
- **২. সৌদি আরবের GACA যাত্রী অধিকার আইন (ওমরাহ ও হজযাত্রীদের জন্য অত্যন্ত গুরুত্বপূর্ণ):**
  • সৌদি সিভিল এভিয়েশন (**GACA - gaca.gov.sa**) আইন অনুযায়ী সৌদি আরবের যেকোনো বিমানবন্দর (**জেদ্দা JED, মদিনা MED, রিয়াদ RUH, দাম্মাম DMM**) থেকে ছেড়ে আসা ফ্লাইট অথবা সৌদি ক্যারিয়ার (**Saudia, Flynas**)-এর ঢাকা ফ্লাইটে দীর্ঘ বিলম্ব, ওভারবুকিং বা লাগেজ হারালে যাত্রীদের জন্য হোটেল, খাবার ও নির্ধারিত আর্থিক ক্ষতিপূরণ বাধ্যতামূলক।
- **৩. তুরস্কের SHY-PASS আইন:**
  • ইস্তাম্বুল এয়ারপোর্ট (IST) হয়ে **Turkish Airlines**-এ ভ্রমণকারী বাংলাদেশি যাত্রীদের ফ্লাইট বাতিল বা দীর্ঘ বিলম্বে সুরক্ষা দেয়।
- **৪. মন্ট্রিল কনভেনশন (হারানো বা ক্ষতিগ্রস্ত লাগেজের জন্য সর্বোচ্চ ~€1,600 / BDT 2,00,000+):**
  • ঢাকা থেকে জেদ্দা, ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর বা দুবাই—সব আন্তর্জাতিক রুটে চেক-ইন করা লাগেজ হারালে বা ভাঙলে এয়ারলাইন্স ক্ষতিপূরণ দিতে বাধ্য।

২. এয়ারপোর্টে ফ্লাইট লেট হলে বা লাগেজ না পেলে তাৎক্ষণিক করণীয় ৩টি কাজ
ধাপ ১: বোর্ডিং পাস ও PNR টিকিট সংরক্ষণ করুন:
- আপনার আসল **Boarding Pass**, লাগেজ ট্যাগ স্টিকার এবং এয়ারপোর্টের ডিসপ্লে বোর্ডে ফ্লাইট ডিলের ছবি তুলে রাখুন।
ধাপ ২: লাগেজ না আসলে বেল্ট ছাড়ার আগেই "PIR রিপোর্ট" নিন:
- জেদ্দা, মদিনা বা ঢাকা এয়ারপোর্টের (DAC) বেল্টে আপনার স্যুটকেস না আসলে কাস্টমস হল থেকে বের হওয়ার **আগেই** Lost & Found ডেস্কে গিয়ে ১০-অক্ষরের রেফারেন্স কোডসহ অফিশিয়াল **Property Irregularity Report (PIR)** ফর্ম পূরণ করে কপি নিন। PIR নম্বর ছাড়া পরে ক্লেইম করা যায় না!
ধাপ ৩: ২ মিনিটে AirHelp-এ এলিজিবিলিটি চেক করুন (গত ৩ বছরের ফ্লাইটের জন্যও প্রযোজ্য!):
- একা ইমেইল করলে এয়ারলাইন্সগুলো প্রায়ই উত্তর দেয় না। তাই **AirHelp**-এ আপনার ফ্লাইট নম্বর ও তারিখ দিয়ে ফ্রিতে যাচাই করুন (এবং **AirHelp+ Smart ও Pro প্রোটেকশনে ১১% ছাড় পেতে প্রোমো কোড ` + "`" + `AHTPO11` + "`" + `** ব্যবহার করুন)। ক্ষতিপূরণ আদায় হলেই কেবল তারা সার্ভিস ফি নেয় ("No-Win, No-Fee")!`,
    internalLinks: [
      { text: "Travel Tools হাবে ফ্লাইট ক্ষতিপূরণ ও AirHelp প্রোমো কোড দেখুন", path: "/tools?tab=airhelp" },
      { text: "ঢাকা থেকে পরিচালিত সেরা ১০টি এয়ারলাইন্সের লাগেজ ও সার্ভিস তুলনা", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw Flight কৌশল", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "বিদেশ ভ্রমণে সেরা Travel eSIM ও ট্রাভেল ইনস্যুরেন্স গাইড", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
    ],
    affiliateCTA: {
      provider: "airhelp",
      headline: "গত ৩ বছরে কি আপনার কোনো ফ্লাইট লেট হয়েছে বা লাগেজ হারিয়েছে? সর্বোচ্চ €600 দাবি করুন",
      body: "AirHelp-এ মাত্র ২ মিনিটে ফ্রিতে আপনার ফ্লাইটের ক্ষতিপূরণ পাওয়ার যোগ্যতা যাচাই করুন (AirHelp+ এ ১১% ছাড়ের কোড: AHTPO11)।",
    },
  },

  "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla": {
    title: "ঢাকা থেকে পরিচালিত সেরা এয়ারলাইন্স তুলনা (2026): Biman, Saudia, Emirates, Qatar Airways, Singapore Airlines ও US-Bangla লাগেজ নিয়ম",
    summary:
      "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে ফ্লাইট টিকিট কাটার সময় ভুল এয়ারলাইন্স বা ভুল ফেয়ার ক্লাস বেছে নিলে চেক-ইন কাউন্টারে ১৮,০০০ টাকা পর্যন্ত অতিরিক্ত লাগেজ জরিমানা গুণতে হতে পারে! এই ২০২৬ গাইডে ঢাকা থেকে পরিচালিত শীর্ষ ১০টি দেশীয় ও আন্তর্জাতিক এয়ারলাইন্স—বিমান বাংলাদেশ, ইউএস-বাংলা, সৌদিয়া, এমিরেটস, কাতার এয়ারওয়েজ, গালফ এয়ার, সিঙ্গাপুর এয়ারলাইন্স, থাই এয়ারওয়েজ, মালয়েশিয়া এয়ারলাইন্স এবং বাজেট ক্যারিয়ার (এয়ারএশিয়া, সালামএয়ার, এয়ার অ্যারাবিয়া)-এর লাগেজ নিয়ম (৩০ কেজি বনাম ২x২৩=৪৬ কেজি), ফ্রি ৫ লিটার জমজম পানি ও খাবারের মান তুলনা করা হয়েছে।",
    category: "Cheap Flight Tips",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৮ মিনিট পড়া",
    content: `ঢাকা (DAC) থেকে অনলাইনে টিকিট কাটার সময় কোনো বাজেট এয়ারলাইন্সের ভাড়া ৬,০০০ টাকা কম দেখালেও, পরবর্তীতে ৩০ কেজি লাগেজ, খাবার ও জমজম পানির ফি যোগ করলে তা ফুল-সার্ভিস এয়ারলাইন্সের চেয়েও **১৫,০০০ টাকা বেশি** পড়ে যায়! তাই টিকিট কাটার আগে ঢাকা থেকে পরিচালিত শীর্ষ এয়ারলাইন্সগুলোর আসল লাগেজ ও সার্ভিস নিয়ম জেনে নিন।

১. WEIGHT CONCEPT (৩০ কেজি) বনাম PIECE CONCEPT (২ X ২৩ কেজি = ৪৬ কেজি): ঢাকা এয়ারপোর্টের প্রধান নিয়ম
স্যুটকেস গোছানোর আগে আপনার ই-টিকিটে লাগেজের নিয়মটি ভালো করে দেখুন:
- **Piece Concept (২টি ব্যাগ x ২৩ কেজি = মোট ৪৬ কেজি ইকোনমি ক্লাসে):**
  • **সৌদি আরব (জেদ্দা, মদিনা, রিয়াদ, দাম্মাম)**, **যুক্তরাজ্য (লন্ডন, ম্যানচেস্টার)**, **ইউরোপ (রোম)** এবং **আমেরিকা/কানাডা (নিউইয়র্ক, টরন্টো)** রুটে ফুল-সার্ভিস এয়ারলাইন্সে (**বিমান, সৌদিয়া, এমিরেটস, কাতার এয়ারওয়েজ, গালফ এয়ার**) সাধারণত ২টি স্যুটকেসে মোট ৪৬ কেজি দেওয়া হয়।
  • **সতর্কতা:** কোনো একটি স্যুটকেসের ওজন **২৩ কেজির বেশি** হতে পারবে না (একটিতে ৩০ কেজি ও অন্যটিতে ১৬ কেজি নিলে কাউন্টারে ব্যাগ খুলে রি-প্যাক করতে বাধ্য করবে!)।
- **Weight Concept (মোট ২০ কেজি থেকে ৩০ কেজি):**
  • এশিয়ার রুটগুলোতে (**ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর, কাঠমান্ডু, মালে, কলকাতা**) মোট ওজন ২৫ বা ৩০ কেজির মধ্যে থাকলে ১টি বা ২টি ব্যাগ দেওয়া যায়।

২. ঢাকা (DAC) থেকে পরিচালিত শীর্ষ ১০টি এয়ারলাইন্সের তুলনা (2026)
- **১. বিমান বাংলাদেশ এয়ারলাইন্স (Biman Bangladesh Airlines — BG):**
  • **সেরা ডিরেক্ট রুট:** জেদ্দা, মদিনা, লন্ডন, ম্যানচেস্টার, রোম, টরন্টো, দুবাই, আবুধাবি, ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর ও কাঠমান্ডু।
  • **লাগেজ ও সুবিধা:** সৌদি/যুক্তরাজ্য/ইউরোপ/কানাডা রুটে **৪৬ কেজি (2x23kg)** + **ফ্রি ৫ লিটার জমজম বক্স**; এশিয়া রুটে **৩০ কেজি**; শতভাগ হালাল দেশি খাবার ও বাংলাভাষী কেবিন ক্রু (বয়স্ক মা-বাবার জন্য সেরা)।
- **২. সৌদিয়া — সৌদি অ্যারাবিয়ান এয়ারলাইন্স (Saudia — SV):**
  • **সেরা রুট:** ঢাকা থেকে সরাসরি **জেদ্দা (টার্মিনাল ১ — এয়ারপোর্টের ভেতরেই ইনডোর Haramain বুলেট ট্রেন স্টেশন!)** ও **মদিনা**, এবং **৯৬ ঘণ্টার স্টপওভার ওমরাহ ভিসাসহ** লন্ডন, প্যারিস ও নিউইয়র্ক ফ্লাইট।
  • **লাগেজ ও সুবিধা:** **৪৬ কেজি (2x23kg)** + **ফ্রি ৫ লিটার জমজম** + বিমানের ভেতরেই নামাজের স্থান (Musalla)!
- **৩. ইউএস-বাংলা এয়ারলাইন্স (US-Bangla Airlines — BS):**
  • **সেরা ডিরেক্ট রুট:** **মালে (মালদ্বীপ)**, **ব্যাংকক**, **কুয়ালালামপুর**, **সিঙ্গাপুর**, **দুবাই**, **শারজাহ**, **আবুধাবি**, **দোহা**, **মাস্কাট** ও **চেন্নাই/কলকাতা**।
  • **লাগেজ ও সুবিধা:** সাশ্রয়ী BDT ভাড়ায় **২০ থেকে ৩০ কেজি** চেক-ইন লাগেজ ও সুবিধাজনক দিনের ফ্লাইট।
- **৪. এমিরেটস (Emirates) ও কাতার এয়ারওয়েজ (Qatar Airways):**
  • **সেরা রুট:** দুবাই বা দোহা ট্রানজিটে ইউরোপ, আমেরিকা এবং **ওমরাহ + দুবাই কম্বো ট্রিপ**। ৮+ ঘণ্টার অনুমোদিত ট্রানজিটে ফ্রি হোটেল (Dubai Connect) সুবিধা।
- **৫. সিঙ্গাপুর এয়ারলাইন্স (SQ), থাই এয়ারওয়েজ (TG) ও মালয়েশিয়া এয়ারলাইন্স (MH):**
  • **সেরা রুট:** সিঙ্গাপুর, ব্যাংকক ও কুয়ালালামপুরে প্রিমিয়াম নন-স্টপ ফ্লাইট (২৫–৩০ কেজি লাগেজসহ; SQ ও TG-তে ফ্লাইটের ২৪ ঘণ্টা আগে অনলাইনে **MOML - Moslem Meal** সিলেক্ট করে রাখুন)।
- **৬. বাজেট এয়ারলাইন্স (AirAsia, Thai Lion Air, SalamAir, Air Arabia, Jazeera, Flynas):**
  • **সবচেয়ে জরুরি নিয়ম:** এদের সর্বনিম্ন ভাড়ায় শুধুমাত্র **৭ কেজি কেবিন ব্যাগ** থাকে (কোনো চেক-ইন লাগেজ থাকে না!)। তাই টিকিট কাটার সময় অনলাইনেই **২০ বা ৩০ কেজি লাগেজ বান্ডেল** কিনে নিন—এয়ারপোর্টে কিনতে গেলে ৩ গুণ বেশি টাকা লাগবে!`,
    internalLinks: [
      { text: "ঢাকা থেকে কম খরচে ফ্লাইট টিকিট কাটার ৫টি গোপন কৌশল", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw Flight কৌশল", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "ফ্লাইট ডিলে বা লাগেজ হারালে সর্বোচ্চ €600 ক্ষতিপূরণ পাওয়ার নিয়ম", path: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp" },
      { text: "জেদ্দা ও ঢাকা এয়ারপোর্টে জমজম পানি ও স্বর্ণ আনার কাস্টমস নিয়ম", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "এক স্ক্রিনেই ঢাকা থেকে সবগুলো এয়ারলাইন্সের লাইভ ভাড়া তুলনা করুন",
      body: "বিমান বাংলাদেশ, সৌদিয়া, ইউএস-বাংলা, এমিরেটস, কাতার এয়ারওয়েজ ও বাজেট ক্যারিয়ারের রাউন্ডট্রিপ ভাড়া দেখুন।",
    },
  },
  "bangladesh-travelers-iata-airport-codes-directory-guide": {
    title: "বাংলাদেশি ভ্রমণকারীদের জন্য পূর্ণাঙ্গ IATA এয়ারপোর্ট কোড ডিরেক্টরি (২০২৬ গাইড)",
    summary: "এয়ার টিকিট কাটার সময় ৩ অক্ষরের IATA এয়ারপোর্ট কোড সঠিকভাবে জানা অত্যন্ত জরুরি। দুবাই DXB বনাম DWC, কিংবা ব্যাংকক BKK বনাম DMK-এর মতো দুটি ভিন্ন এয়ারপোর্টের ভুল টিকিট কাটলে বড় অঙ্কের আর্থিক ক্ষতি হতে পারে। এই পূর্ণাঙ্গ সহায়িকায় বাংলাদেশের ৮টি অভ্যন্তরীণ ও আন্তর্জাতিক বিমানবন্দর সহ মধ্যপ্রাচ্য, ইউরোপ এবং দক্ষিণ-পূর্ব এশিয়ার ৫০টি প্রধান এভিয়েশন হাবের কোড, এয়ারলাইন্স তথ্য ও টিকিট কাটার সঠিক নিয়ম আলোচনা করা হয়েছে।",
    category: "Cheap Flight Tips",
    date: "০৩ অক্টোবর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৫ মিনিট পড়া",
    content: `এয়ার টিকিট কাটার সময় ট্রাভেল এজেন্টের সাথে কথা বলতে গিয়ে বা অনলাইন সার্চ ইঞ্জিনে ভুল শহরের নাম লিখলে অনেক সময় অন্য এয়ারপোর্টের টিকিট ইস্যু হয়ে যায়। বিশ্বজুড়ে সমস্ত এয়ারলাইন্স ও রিজার্ভেশন সিস্টেম ৩ অক্ষরের অফিশিয়াল **IATA Airport Code** দিয়ে কাজ করে।

১. কেন শহরের নামের চেয়ে এয়ারপোর্ট কোড জানা জরুরি?
অনেক বড় শহরে পাশাপাশি একাধিক আন্তর্জাতিক বিমানবন্দর থাকে:
• **দুবাই (UAE):** **DXB (Dubai International)** মূল শহর ও ডেইরার কাছে, যেখানে Emirates, Flydubai ও Biman নামে। অপরদিকে **DWC (Al Maktoum International)** শহর থেকে ৫০ কিমি দূরে জেবেল আলীতে অবস্থিত। ভুল কোডে টিকিট কাটলে ট্যাক্সি ভাড়াতেই অতিরিক্ত টাকা খরচ হয়।
• **ব্যাংকক (Thailand):** **BKK (Suvarnabhumi)** হলো মূল আন্তর্জাতিক হাব। কিন্তু বাজেট ক্যারিয়ার যেমন Thai AirAsia বা Thai Lion Air চলে **DMK (Don Mueang)** থেকে। ভুল করে BKK-এর টিকিট কেটে DMK গিয়ে পৌঁছালে কানেক্টিং ফ্লাইট মিস হতে পারে।
• **লন্ডন (UK):** **LHR (Heathrow)** মূল টার্মিনাল, কিন্তু অনেকের ফ্লাইট থাকে **LGW (Gatwick)** বা **STN (Stansted)**-এ।

২. বাংলাদেশের অভ্যন্তরীণ ও আন্তর্জাতিক এয়ারপোর্ট কোড তালিকা
• **DAC** — ঢাকা (হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর, কুর্মিটোলা): দেশের প্রধান এভিয়েশন গেটওয়ে।
• **CGP** — চট্টগ্রাম (শাহ আমানত আন্তর্জাতিক বিমানবন্দর, পতেঙ্গা): মধ্যপ্রাচ্যের সরাসরি ফ্লাইট হাব।
• **ZYL** — সিলেট (ওসমানী আন্তর্জাতিক বিমানবন্দর): যুক্তরাজ্য ও মধ্যপ্রাচ্যের প্রবাসীদের প্রধান হাব।
• **CXB** — কক্সবাজার বিমানবন্দর: দেশের শীর্ষ পর্যটন বিমানবন্দর।
• **JSR** — যশোর বিমানবন্দর: খুলনা বিভাগ ও বেনাপোল স্থলবন্দরের ট্রানজিট।
• **SPD** — সৈয়দপুর বিমানবন্দর: রংপুর ও দিনাজপুর অঞ্চলের উত্তরবঙ্গ হাব।
• **RJH** — রাজশাহী (শাহ মখদুম বিমানবন্দর): বরেন্দ্র ও রেশম নগরীর গেটওয়ে।
• **BZL** — বরিশাল বিমানবন্দর: দক্ষিণাঞ্চল ও কুয়াকাটার সংযোগকারী।

৩. মধ্যপ্রাচ্য ও দক্ষিণ-পূর্ব এশিয়ার জনপ্রিয় কোড
• **DXB** (দুবাই), **SHJ** (শারজাহ - Air Arabia), **AUH** (আবুধাবি), **JED** (জেদ্দা - ওমরাহ ও হজ গেটওয়ে), **MED** (মদিনা), **DOH** (দোহা), **RUH** (রিয়াদ), **DMM** (দাম্মাম), **MCT** (মাস্কাট), **KWI** (কুয়েত)।
• **BKK** (ব্যাংকক সুবর্ণভূমি), **DMK** (ডন মুয়াং), **KUL** (কুয়ালালামপুর KLIA), **SIN** (সিঙ্গাপুর চাঙ্গি), **MLE** (মালদ্বীপ মালে), **KTM** (কাঠমান্ডু ত্রিভুবন), **CCU** (কলকাতা), **DEL** (দিল্লি), **MAA** (চেন্নাই)।

৪. ট্রাভেল ডেস্কে দ্রুত কোটেশন পাওয়ার নিয়ম
URAL বা যেকোনো এয়ারলাইন্স এজেন্সিকে মেসেজ দেওয়ার সময় *"DAC to DXB on 15 Oct, 1 Passenger"* লিখে পাঠালে এজেন্ট মাত্র ১০ সেকেন্ডে গ্লোবাল সিস্টেমে সার্চ করে সেরা BDT ভাড়া জানাতে পারে। আমাদের **Travel Tools**-এর এয়ারপোর্ট কোড সেকশন থেকে সরাসরি হোয়াটসঅ্যাপে মেসেজ ফরম্যাট ড্রাফট করে পাঠাতে পারেন।`,
    internalLinks: [
      { text: "টুলস ডেস্কে সার্চেবল এয়ারপোর্ট ডিরেক্টরি ও হোয়াটসঅ্যাপ কোটেশন", path: "/tools?tab=airports" },
      { text: "ঢাকা থেকে দুবাই ফ্লাইট শিডিউল ও বিমান ভাড়া", path: "/flights/dhaka-dubai" },
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools?tab=airhelp" },
      { text: "ঢাকা এয়ারপোর্ট প্রি-ডিপার্চার ইমিগ্রেশন চেকলিস্ট", path: "/pre-departure" },
      { text: "গ্লোবাল ফ্লাইট সার্চ ও ফেয়ার বেঞ্চমার্ক", path: "/flights" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "৩ অক্ষরের এয়ারপোর্ট কোড দিয়ে সরাসরি লাইভ ভাড়া সার্চ করুন",
      body: "DAC, CGP এবং ZYL থেকে ১০০+ এয়ারলাইন্সের লাইভ BDT ভাড়া তুলনা করে বুকিং করুন।",
    },
  },
  "chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai": {
    title: "চট্টগ্রাম থেকে দুবাই ও মধ্যপ্রাচ্য সরাসরি ফ্লাইট গাইড (২০২৬): CGP-DXB শিডিউল, ভাড়া ও শাহ আমানত নিয়মাবলী",
    summary: "চট্টগ্রাম, কক্সবাজার, ফেনী, কুমিল্লা ও নোয়াখালী অঞ্চলের প্রবাসীদের জন্য ঢাকা না গিয়ে সরাসরি চট্টগ্রাম শাহ আমানত বিমানবন্দর (CGP) থেকে দুবাই, শারজাহ, আবুধাবি, মাস্কাট ও জেদ্দায় ফ্লাইট ধরা অনেক বেশি সুবিধাজনক। এতে ঢাকা যাওয়ার ৬ থেকে ৮ ঘণ্টার হাইওয়ে যানজট ও অভ্যন্তরীণ ট্রানজিট খরচ বাঁচে। এই বাণিজ্যিক সহায়িকায় বিমান বাংলাদেশ, ফ্লাইদুবাই, ইউএস-বাংলা এবং এয়ার এরাবিয়ার সরাসরি ফ্লাইট শিডিউল, BDT ভাড়া তালিকা, ব্যাগেজ নিয়ম ও শাহ আমানত টার্মিনাল গাইড তুলে ধরা হয়েছে।",
    category: "Cheap Flight Tips",
    date: "০৩ অক্টোবর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `চট্টগ্রাম ও সংলগ্ন জেলার প্রবাসীদের জন্য ঢাকায় গিয়ে ফ্লাইট ধরা মানেই অতিরিক্ত ৩,০০০ থেকে ৬,০০০ টাকা যাতায়াত খরচ এবং চরম যানজটের মানসিক চাপ। পতেঙ্গায় অবস্থিত **চট্টগ্রাম শাহ আমানত আন্তর্জাতিক বিমানবন্দর (CGP)** থেকে সরাসরি মধ্যপ্রাচ্যের একাধিক রুটে ওয়াইডবডি ও ন্যারোবডি ফ্লাইট চলাচল করে।

১. চট্টগ্রাম (CGP) থেকে পরিচালিত সরাসরি এয়ারলাইন্স
• **Flydubai (FZ):** চট্টগ্রাম (CGP) থেকে সরাসরি দুবাই আন্তর্জাতিক টার্মিনাল ২ (DXB)-এ প্রতিদিন নন-স্টপ ফ্লাইট পরিচালনা করে।
• **Air Arabia (G9):** চট্টগ্রাম থেকে সরাসরি শারজাহ (SHJ) আন্তর্জাতিক বিমানবন্দরে চলে, যা শারজাহ, আজমান বা উত্তর দুবাইয়ের যাত্রীদের জন্য দারুণ সাশ্রয়ী।
• **Biman Bangladesh Airlines (BG):** চট্টগ্রাম থেকে সরাসরি দুবাই (DXB), আবুধাবি (AUH), মাস্কাট (MCT) এবং নির্ধারিত হজ/ওমরাহ মৌসুমে জেদ্দা (JED)-এ সরাসরি ফ্লাইট চালায়।
• **US-Bangla Airlines (BS):** চট্টগ্রাম থেকে মাস্কাট, দুবাই ও দোহায় সরাসরি বোয়িং ৭৩৭ পরিচালনা করে, সাথে ঢাকায় কানেক্টিং ফ্লাইট রয়েছে।
• **SalamAir (OV):** ওমানের মাস্কাট রুটে সাশ্রয়ী নন-স্টপ ফ্লাইট।

২. BDT ভাড়া তুলনা: CGP বনাম DAC ডিপার্চার
• চট্টগ্রাম থেকে দুবাই বা শারজাহ ওয়ান-ওয়ে টিকিট সাধারণত **BDT 38,000 থেকে BDT 52,000** এবং রাউন্ডট্রিপ **BDT 58,000 থেকে BDT 74,000**-এর মধ্যে পাওয়া যায়।
• ঢাকা হয়ে কানেক্টিং টিকিটের বেইজ ফেয়ার কখনও ১-২ হাজার টাকা কম হলেও ঢাকায় অবস্থান ও ডোমেস্টিক ট্রানজিটের ঝুঁকি বিবেচনায় CGP সরাসরি ফ্লাইট অনেক বেশি লাভজনক।
• পিক সিজন (ঈদের পরবর্তী সময় ও শ্রম ভিসা ইস্যুর সময়) অন্তত ৬০ থেকে ৯০ দিন আগে টিকিট কাটলে ১০ থেকে ১৫ হাজার টাকা পর্যন্ত সাশ্রয় সম্ভব।

৩. শাহ আমানত আন্তর্জাতিক বিমানবন্দর (CGP) ইমিগ্রেশন ও লাগেজ নিয়ম
• **রিপোর্টিং টাইম:** আন্তর্জাতিক ফ্লাইটের জন্য কাউন্টার ৩.৫ ঘণ্টা আগে খোলে এবং ফ্লাইটের ঠিক ৬০ মিনিট আগে চেক-ইন কাউন্টার বন্ধ হয়ে যায়।
• **লাগেজ সুবিধা:** বিমান ও ইউএস-বাংলায় সাধারণ প্রবাসীদের জন্য ৩০ থেকে ৪০ কেজি চেক-ইন ব্যাগেজ (সর্বোচ্চ ২টি ব্যাগ, প্রতি ব্যাগে সর্বোচ্চ ২৩ কেজি) এবং ৭ কেজি হ্যান্ডব্যাগ অনুমোদিত। ফ্লাইদুবাই ও এয়ার এরাবিয়ায় টিকিট কাটার সময় ২০ বা ৩০ কেজি ব্যাগেজ অপশন নিশ্চিত করে নিন।
• **কাস্টমস নিয়ম:** দুবাই ফেরত যাত্রীদের জন্য জাতীয় রাজস্ব বোর্ডের নিয়ম অনুযায়ী ১০০ গ্রাম পর্যন্ত স্বর্ণালঙ্কার শুল্কমুক্ত এবং ওমরাহ যাত্রীরা সিলগালা করা ৫ লিটার জমজম পানি সঙ্গে আনতে পারেন।

৪. চট্টগ্রাম টিকিট সহজে বুকিংয়ের নিয়ম
এজেন্টকে বলার সময় সবসময় 'Chittagong to Dubai' না বলে সরাসরি **'CGP to DXB'** কোড উল্লেখ করুন। এতে কোনো ট্রানজিট ছাড়াই সরাসরি নন-স্টপ সিট খুঁজে বের করা সহজ হয়। URAL Travel Tools থেকে এক ক্লিকেই হোয়াটসঅ্যাপে রেডিমেড কোটেশন তৈরি করতে পারেন।`,
    internalLinks: [
      { text: "দুবাই ও UAE ট্যুরিস্ট ভিসা চেকলিস্ট ও নিয়মাবলী", path: "/visa/dubai-visa" },
      { text: "ঢাকা থেকে দুবাই ফ্লাইট শিডিউল ও BDT ভাড়া", path: "/flights/dhaka-dubai" },
      { text: "দুবাই হোটেল এলাকা ও মেট্রো স্টেশন গাইড", path: "/hotels/dubai-hotels" },
      { text: "দুবাই ৫ দিনের সম্পূর্ণ BDT ভ্রমণ খরচ হিসাব", path: "/costs/dubai-costs" },
      { text: "এয়ারপোর্ট কোড ও হোয়াটসঅ্যাপ টিকিট অনুসন্ধান টুল", path: "/tools?tab=airports" },
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools?tab=airhelp" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "চট্টগ্রাম (CGP) থেকে সরাসরি মধ্যপ্রাচ্যের ফ্লাইট সার্চ করুন",
      body: "শাহ আমানত বিমানবন্দর থেকে দুবাই, শারজাহ, আবুধাবি ও মাস্কাটের সরাসরি টিকিট লাইভ তুলনা করুন।",
    },
  },
  "havana-cuba-travel-guide-bangladesh": {
    title: "হাভানা, কিউবা ট্রাভেল গাইড (২০২৬): ক্লাসিক গাড়ি, ওল্ড হাভানা ও গ্রান তেয়াত্রো — ঢাকা থেকে BDT বাজেটসহ",
    summary:
      "বাংলাদেশি ও আন্তর্জাতিক ভ্রমণকারীদের জন্য এই পাঁচ দিনের হাভানা গাইডে আছে গ্রান তেয়াত্রো দে লা আবানা আলিসিয়া আলোনসো (ব্যালে নাসিওনাল দে কিউবার আবাসস্থল, শো-এর টিকিট প্রায়ই মাত্র USD ১০-৩০), ওল্ড হাভানার চারটি ইউনেস্কো চত্বর, সৎ ২০২৬ দরে ক্লাসিক আমেরিকান গাড়ির টুর, মালেকোন ও ভেদাদো, এবং কিউবা সফরের বাস্তব নিয়ম — বাংলাদেশি পাসপোর্টের ট্যুরিস্ট ভিসা ও e-Visa নিয়ম, বাধ্যতামূলক স্বাস্থ্য বীমার প্রমাণ, US-ইস্যু কার্ড যে নগদ-নির্ভর অর্থনীতিতে ব্যর্থ হয়, কাসা পার্তিকুলার বনাম হোটেল, হালাল ডাইনিং কৌশল এবং জনপ্রতি আনুমানিক BDT ২,২০,০০০-৩,৬০,০০০ বাজেট।",
    category: "Family & Budget",
    date: "৮ অক্টোবর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৯ মিনিট পড়া",
    content: `ক্যারিবিয়ানের একমাত্র শহর হাভানা, যেখানে প্রথম বিশ্বযুদ্ধের আগে তৈরি মার্বেল অপেরা হাউসের সামনে ১৯৫০-এর দশকের শেভ্রোলেট কনভার্টিবল দাঁড়িয়ে থাকে — আর এটি এতটাই নিত্যদিনের দৃশ্য যে সবাই দ্বিতীয়বার ছবি তোলে না। বাংলাদেশি ও দক্ষিণ এশীয় ভ্রমণকারীদের কাছে কিউবা দুবাই-ব্যাংকক-কুয়ালালামপুর সার্কিটের বাইরে পড়ে, তবে এই দীর্ঘ যাত্রার বিনিময়ে কিউবা দেয় এমন কিছু যা অন্য শহরে আর পাওয়া যায় না: এখনো সত্যিকারের অনাবিষ্কৃত একটি গন্তব্য। এই গাইডে আছে সবচেয়ে গুরুত্বপূর্ণ পাঁচ দিনের পরিকল্পনা — গ্রান তেয়াত্রো দে লা আবানা আলিসিয়া আলোনসো, ওল্ড হাভানার চারটি চত্বর, ক্লাসিক আমেরিকান গাড়ি আর সূর্যাস্তের মালেকোন — এবং ২০২৬ সালের ভিসা, নগদ টাকা, খাবার ও নিরাপত্তার বাস্তব নিয়ম।

১. কখন যাবেন: শুকনো মৌসুম, ব্যালে সন্ধ্যা ও হারিকেন মাস
হাভানার দুটি স্পষ্ট মৌসুম। নভেম্বর থেকে এপ্রিল শুকনো মৌসুম — উষ্ণ দিন, কম আর্দ্রতা, পরিষ্কার আকাশ; ওল্ড হাভানা ঘোরার আর খোলা কনভার্টিবলে ঘোরার জন্য আদর্শ। ডিসেম্বর থেকে মার্চ পিক সিজন, তাই কাসা ও ব্যালের টিকিট ভাবার চেয়ে আগেই বুক করুন। মে থেকে অক্টোবর ভেজা মৌসুম, বিকেলের ভারী বৃষ্টি আর বছরের সবচেয়ে কম থাকার রেট; সেপ্টেম্বর-অক্টোবরে আটলান্টিক হারিকেনের ঝুঁকি থাকে, তাই তখন সুস্থিত পরিকল্পনা রাখুন।
- নভেম্বর-এপ্রিল: শুকনো মৌসুম। হাঁটার সেরা আবহাওয়া (২২-২৮° সে.) এবং গ্রান তেয়াত্রোতে থিয়েটার-ব্যালে সিজন।
- মে-জুন: গরম ও আর্দ্র, ছোট বৃষ্টি। পর্যটক কম, কাসার রেট নরম।
- জুলাই-আগস্ট: মালেকোন ঘিরে হাভানার ঐতিহ্যবাহী কার্নিভাল — প্রাণবন্ত, রঙিন, জনাকীর্ণ।
- সেপ্টেম্বর-অক্টোবর: হারিকেন মৌসুমের শীর্ষ। সবচেয়ে সস্তা ভাড়া, সবচেয়ে অনিশ্চিত দিন।

২. ঢাকা থেকে হাভানা: ফ্লাইট, ট্যুরিস্ট ভিসা ও অ্যারাইভাল
ঢাকা ও হাভানার মধ্যে সরাসরি ফ্লাইট নেই। সবচেয়ে পরিষ্কার রুট ইস্তাম্বুল হয়ে — ঢাকা থেকে রওনা দিয়ে ইস্তাম্বুলে যোগ দেওয়াই স্বাভাবিক — অথবা মাদ্রিদ, মস্কোর মতো ইউরোপীয় গেটওয়ে হয়ে। ১-স্টপ যাত্রায় মোট ২৪-৩০ ঘণ্টা লাগে, তাই কাগজে সবচেয়ে সস্তা কানেকশন নয়, টিকে থাকার মতো লে-ওভার বেছে নিন। রিটার্ন ইকোনমি ভাড়া সাধারণত BDT ১,৮০,০০০-৩,০০,০০০ ব্যান্ডে চলে (মৌসুম ও বুকিংয়ের সময়ভেদে); সিদ্ধান্তের আগে মাল্টি-সিটি রুটও তুলনা করে নিন।
- ভিসা: বাংলাদেশি পাসপোর্টধারীদের কিউবান ট্যুরিস্ট ভিসা লাগে। আগে এটি এয়ারলাইন বা কিউবান মিশনের মাধ্যমে সংগ্রহ করা ট্যুরিস্ট কার্ড ছিল; এখন কিউবা ইলেকট্রনিক e-Visa ব্যবস্থা চালু করছে এবং নিয়ম পরিবর্তিত হচ্ছে। বাংলাদেশি পাসপোর্টে ভিসা অন অ্যারাইভাল নেই — টিকিট কাটার আগে কিউবান দূতাবাস বা অফিশিয়াল e-Visa পোর্টাল থেকে বর্তমান নিয়ম নিশ্চিত করুন, সোশ্যাল মিডিয়ার স্ক্রিনশট দেখে নয়।
- স্বাস্থ্য বীমা: কিউবা ভ্রমণকারীদের বৈধ স্বাস্থ্য বীমা বাধ্যতামূলক, ইমিগ্রেশনে প্রিন্টেড প্রমাণ চাইতে পারে। দেশ ছাড়ার আগে কিউবা-কভারড পলিসি কিনে নিন।
- ইয়েলো ফিভার সার্টিফিকেট: ঝুঁকিপূর্ণ দেশ হয়ে এলে সাথে রাখুন (আফ্রিকা বা দক্ষিণ আমেরিকা ট্রানজিটে এটি প্রাসঙ্গিক)।
- অ্যারাইভাল: হোসে মার্তি আন্তর্জাতিক বিমানবন্দর (HAV) শহর থেকে প্রায় ২৫ কিমি দক্ষিণ-পূর্বে। প্রথম রাতের কাসা আগেই ঠিক করুন এবং হোস্টকে এয়ারপোর্ট পিকআপ জিজ্ঞেস করুন; অফিশিয়াল ট্যাক্সি নির্ভরযোগ্য, তবে নগদে ভাড়া দিতে হয়।

৩. গ্রান তেয়াত্রো দে লা আবানা: ব্যালে, মার্বেল ও শহরের প্রাণ
পার্কে সেন্ট্রালের মুখোমুখি, যেখানে পাসেও দেল প্রাদোর ধারে ক্লাসিকগাড়িগুলো সারি বেঁধে থাকে — গ্রান তেয়াত্রো দে লা আবানা আলিসিয়া আলোনসো ১৯১৪ সালে সেন্ট্রো গালেগোর সামাজিক কেন্দ্র হিসেবে উদ্বোধিত হয় এবং আজও আমেরিকার অন্যতম জমকালো থিয়েটার ভবন। নিও-বারোক সম্মুখভাগে জিউসেপে মোরেত্তির স্মারক মার্বেলভাস্কর্যগুলো এক শতাব্দীর বেশি সময় ধরে শহরের বদল দেখে আসছে। ভেতরে মার্বেল হল, বিশাল সিঁড়ি আর মূল অডিটোরিয়াম — যেখানে এখনো বেশিরভাগ সপ্তাহে অপেরা, ব্যালে ও সিম্ফনি অনুষ্ঠিত হয়।
এই ভবন কিউবান ব্যালের পরিচয়ের সাথে বিচ্ছিন্নভাবে যুক্ত। এটি ব্যালে নাসিওনাল দে কিউবার আবাসস্থল — আলিসিয়া আলোনসো যে কোম্পানিটিকে বিশ্বের অন্যতম সেরা ব্যালে প্রতিষ্ঠানে পরিণত করেছিলেন — এবং এখানেই অনুষ্ঠিত হয় হাভানা আন্তর্জাতিক ব্যালে উৎসব, বিশ্বের প্রাচীনতম ব্যালে উৎসবগুলোর একটি। দর্শকদের জন্য এটি অসাধারণভাবে সহজলভ্য: শো-এর টিকিট প্রায়ই চমৎকারভাবে সাশ্রয়ী (সাধারণত USD ১০-৩০), আর শো ছাড়া দিনে ভবনের গাইডেড টুরও থাকে। যাওয়ার আগে সিজন ক্যালেন্ডার দেখে নিন — এই ভবনের ভেতরে লাইভ ব্যালের একটি সন্ধ্যা ক্যারিবিয়ানের সেরা রাত।

৪. ওল্ড হাভানা ও চারটি মহান চত্বর
হাবানা ভিয়েখা ১৯৮২ সাল থেকে ইউনেস্কো বিশ্ব ঐতিহ্য, চার দশকের ধৈর্যশীল সংস্কার শহরের চত্বরগুলো ফিরিয়ে এনেছে। ছোট একটা হাঁটার লুপেই অর্ধেক দিনে চারটিই — তারপর আরেকবার ধীরে হাঁটার ইচ্ছা জাগে।
- প্লাজা দে আরমাস: প্রাচীনতম চত্বর, রয়্যাল পামের ছায়ায় ঔপনিবেশিক প্রাসাদ ও পুরোনো বইয়ের বাজার।
- প্লাজা দে লা কাতেদ্রাল: ফটোজেনিক বারোক হাভানা — প্রবাল-পাথরের কাতেদ্রাল দে সান ক্রিস্তোবাল, যার দুই টাওয়ার ইচ্ছেকৃতভাবে অসমমিত, আর চিনি বাণিজ্যের বণিক প্রাসাদগুলো।
- প্লাজা ভিয়েখা: সংস্কারকৃত টাউনহাউস, ছাদের উপর ৩৬০ ডিগ্রি লাইভ প্যানোরামার ক্যামেরা অবসকিউরা, আর সন্ধ্যায় ভরে ওঠা ক্যাফে টেবিল।
- প্লাজা দে সান ফ্রান্সিস্কো দে আসিস: বন্দরের মুখোমুখি শান্ত চত্বর, ব্যাসিলিকা ও পুরোনো কাস্টমস হাউসসহ।
চত্বরগুলোর মাঝে: কাস্তিয়ো দে লা রিয়াল ফুয়ের্সা (১৫৭৭), আমেরিকার প্রাচীনতম পাথরের দুর্গগুলোর একটি; হাভানা ক্লাব রাম মিউজিয়াম; হেমিংওয়ের ডাইকিরি বার এল ফ্লোরিদিতা এবং মোহিতোর ঘর লা বোদেগুইতা দেল মেদিও — দুটোই পর্যটক প্রতিষ্ঠান, খাবারের জন্য নয়, আচারের জন্য যান।

৫. ক্লাসিক আমেরিকান গাড়ি: চলমান যাদুঘর
হাভানার ভিন্টেজ শেভ্রোলেট, ফোর্ড ও বিউইকগুলো সাজসজ্জা নয়। ১৯৫৯ সালের বিপ্লব ও আমেরিকান নিষেধাজ্ঞায় গাড়ি আমদানি থেমে গেলে কিউবান মেকানিকরা ইম্প্রভাইজড পার্টস ও ডিজেল ইঞ্জিন বসিয়ে এক প্রজন্মের আমেরিকান গাড়ি ছয় দশক ধরে চালিয়ে রেখেছেন। ২০১১ সাল থেকে ব্যক্তিগত গাড়ি বিক্রি আবার বৈধ হয়েছে, তাই রাস্তায় এখন সোভিয়েত যুগের লাডা ও আধুনিক গাড়িও মেশে — তবে ১৯৫০-এর কনভার্টিবলই আইকন।
- প্রাইভেট কনভার্টিবল টুর: ক্লাসিক অভিজ্ঞতা। ড্রাইভার নিয়ে মালেকোন, ক্যাপিতোলিও, প্লাজা দে লা রেভোলুসিওন হয়ে ফুস্তেরলান্দিয়া বা গাছঘেরা মিরামার। প্রাইভেট গাড়ির দর প্রায় ঘণ্টায় USD ৩০-৫০ — রওনার আগেই পুরো দর, রুট ও সময় ঠিক করে নিন, নগদে পরিশোধ।
- শেয়ার্ড আলমেন্দ্রোন: স্থানীয় উপায়। নির্দিষ্ট রুটে চলা এই শেয়ার্ড ভিন্টেজ ট্যাক্সিতে কয়েক ডলারেই শহর — যেভাবে বাসিন্দারা দেখেন, সেভাবে দেখার সবচেয়ে সস্তা উপায়।
- ফটোগ্রাফি: প্রতি সকালে পার্কে সেন্ট্রাল ও গ্রান তেয়াত্রোর সামনে গাড়িগুলো জড়ো হয় — প্রতিটি হাভানা গাইডবুকের সেই ছবি, আপনার জন্য অপেক্ষা করছে।
- আচরণ: আগে দর ঠিক করুন, ফটো স্টপে টিপ দিন, টাকা দেওয়ার আগে গাড়িতে এসি আছে কি না নিশ্চিত হন।

৬. ওল্ড হাভানার বাইরে: মালেকোন, ভেদাদো ও ফুস্তেরলান্দিয়া
- মালেকোন: হাভানার লিভিং রুম — আট কিলোমিটারের সমুদ্রপ্রাচীর, সূর্যাস্তে গোটা শহর এখানে জড়ো হয়। অন্তত একবার হাবানা ভিয়েখা থেকে ভেদাদো পর্যন্ত হাঁটুন, পারলে দুইবার।
- ভেদাদো: গাছঘেরা আধুনিক এলাকা — ১৯৩০ সালের হোটেল নাসিওনাল দে কিউবা, বিশ্ববিদ্যালয়ের সিঁড়ি, মার্বেল পথের কলন কবরস্থান, আর দেরিতে শুরু হওয়া সালসার কাসা দে লা মুসিকা।
- প্লাজা দে লা রেভোলুসিওন: বিশাল, কঠোর এবং অবিস্মরণীয় — হোসে মার্তির স্মৃতিস্তম্ভ ও অভ্যন্তর মন্ত্রণালয়ের দেয়ালে চে গেভারার ইস্পাতের রূপরেখা।
- ফুস্তেরলান্দিয়া: জাইমানিতাস মাছ ধরার গ্রাম, শিল্পী হোসে ফুস্তের হাতে দশকের পর দশক মোজাইকের বিস্ময়ে রূপান্তরিত। প্রবেশ বিনামূল্যে, আনন্দময়, কিউবায় অন্য কিছুর সাথে অমিল।
- নাইটলাইফ: খোলা আকাশের ক্যাবারে ট্রপিকানা ক্লাসিক স্প্লার্জ; ভেদাদো ও সেন্ত্রো হাভানায় সালসা ক্লাব ও লাইভ সোন কুবানো।

৭. থাকা ও খাওয়া: কাসা, পালাদারে ও হালাল বাস্তবতা
- কাসা পার্তিকুলার: ছোট নীল অ্যাঙ্কার চিহ্নসহ ব্যক্তিগত হোমস্টে — রাত USD ২৫-৪৫-এ পরিষ্কার রুম, ব্যক্তিগত বাথরুম, জোরালো কফি আর যেকোনো হোটেল ডেস্কের চেয়ে ভালো স্থানীয় পরামর্শ। বেশিরভাগ বাংলাদেশি ভ্রমণকারীর জন্য হাবানা ভিয়েখা বা ভেদাদোর কাসাই সঠিক বেস।
- পালাদারে: ব্যক্তিগত রেস্টুরেন্ট — কিউবার সেরা খাবার। জনপ্রিয় জায়গায় এক দিন আগে বুক করুন। রোপা ভিয়েখা, কোংগ্রি (কালো ডালের ভাত), তোস্তোনেস, তাজা গ্রিল মাছ এবং বাজেট থাকলে লবস্টার অর্ডার করুন; শেষে কিউবান কফি।
- হালাল খাবার: কিউবার মুসলিম সম্প্রদায় ছোট হলেও প্রতিষ্ঠিত, সার্টিফায়েড হালাল রেস্টুরেন্ট বিরল। ব্যবহারিক পদ্ধতি: অর্ডারের আগে পালাদারে মাংসের উৎস সরাসরি জিজ্ঞেস করুন, সমুদ্রের মাছ, ডিম, ভাত, ডাল ও সবজির উপর নির্ভর করুন, আর ঢাকা থেকে প্রয়োজনীয় হালাল স্ন্যাকস ও মশলা সাথে নিয়ে যান। সন্দেহে কাসা হোস্টই বিশ্বস্ত রান্নাঘরের দ্রুততম পথ — তাদের রান্না করতে বলুন।
- ফল ও জুস: আম, পেয়ারা, পেঁপে আর আখের রস চমৎকার — সামনে তৈরি হলে নিরাপদ।

৮. টাকা, নিরাপত্তা ও কানেক্টিভিটি: ২০২৬-এর বাস্তবতা
- আগে নগদ: কিউবা বড় অংশে নগদে চলে। ছোট ডিনমিনেশনের পরিষ্কার, চিহ্নহীন EUR বা USD নিয়ে যান। US-ইস্যু কার্ড এবং US নেটওয়ার্কে প্রসেস হওয়া যেকোনো কার্ড প্রায়ই কাজ করেই না — ATM-এর উপর নির্ভর করবেন না। কিছু নন-US কার্ড বড় হোটেলে চলে, তবে ভারী ফিসে। অফিশিয়াল CADECA-তে এক্সচেঞ্জ করুন ও রসিদ রাখুন।
- দৈনিক বাজেট: আরামদায়ক মিড-রেঞ্জ দিন (কাসা, পালাদারে, একটি অ্যাক্টিভিটি, যাতায়াত) জনপ্রতি প্রায় USD ৭০-১০০ — সাম্প্রতিক রেটে আনুমানিক BDT ৮,৫০০-১২,০০০। ফ্লাইটসহ পাঁচ দিনের বাস্তব মোট জনপ্রতি আনুমানিক BDT ২,২০,০০০-৩,৬০,০০০।
- নিরাপত্তা: হাভানা ল্যাটিন আমেরিকার পর্যটকদের জন্য সবচেয়ে নিরাপদ রাজধানীগুলোর একটি; ভ্রমণকারীদের বিরুদ্ধে সহিংস অপরাধ বিরল। দৈনন্দিন ঝামেলা হলো বন্ধুত্বপূর্ণ হাস্টল — কাল্পনিক ফ্যাক্টরি সিগার দোকান বা সারপ্রাইজ বিলের বারে নিয়ে যাওয়ার প্রস্তাব। নম্রভাবে না বললেই প্রায় সব সমাধান হয়। লাইসেন্সপ্রাপ্ত কাসা ও ট্যাক্সি ব্যবহার করুন, আগে ভাড়া ঠিক করুন, মূল পাসপোর্টের বদলে ফটোকপি সাথে রাখুন।
- কানেক্টিভিটি: ETECSA-র প্রিপেড ডেটা প্ল্যান ও পার্ক-হোটেলে ব্যবহৃত Nauta ওয়াইফাই কার্ড আছে; গতি আঞ্চলিক মানের তুলনায় মাঝারি। অফলাইন ম্যাপ আগেই ডাউনলোড করুন। অনেক গ্লোবাল ট্রাভেল eSIM-ই কিউবা কভার করে না — থাইল্যান্ড বা দুবাইয়ের জন্য কেনা প্ল্যান এখানে চলবে ধরে নয়, কভারেজ যাচাই করুন।
- স্বাস্থ্য: বোতলজাত বা পরিশোধিত পানি পান করুন, প্রথম দিন থেকে সানস্ক্রিন ব্যবহার করুন, আর বীমার কাগজ দিনের ব্যাগে রাখুন।

শেষ কথা:
হাভানা হালকা পরিকল্পনা ও ধীর হাঁটাকে পুরস্কৃত করে। ফ্লাইট ও ভিসা আগেই ঠিক করুন, প্রথম দুই রাত বুক করুন, বাকি সপ্তাহ আলগা রাখুন — এই শহরের সেরা ঘণ্টাগুলো অনুসূচিতহীন, যখন গ্রান তেয়াত্রোর বক্স অফিসে হঠাৎ ব্যালের টিকিট মেলে, শেয়ার্ড ট্যাক্সি শহর ঘোরায় পরিণত হয়, কিংবা মালেকোন আপনার সন্ধ্যা ঠিক করে দেয়। এখানে পাঁচ সত্যিকারের দিন ক্যারিবিয়ানের প্রায় যেকোনো জায়গার পাঁচটি পালিশ করা দিনকে ছাড়িয়ে যাবে।`,
    internalLinks: [
      { text: "ঢাকা থেকে সস্তায় ফ্লাইট টিকিটের ৫টি গোপন কৌশল", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "ঢাকা থেকে প্রধান এয়ারলাইন্সের ব্যাগেজ নিয়ম তুলনা", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "সেরা ট্রাভেল eSIM ও ট্রাভেল ইনস্যুরেন্স গাইড", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "ডুয়াল-কারেন্সি কার্ড এন্ডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "RFCD অ্যাকাউন্ট বনাম BDT ৩০০ ট্রাভেল কোটা গাইড", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "গ্লোবাল ফ্লাইট সার্চ ও ভাড়া বেঞ্চমার্ক", path: "/flights" },
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools?tab=airhelp" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "হাভানার জন্য ভাড়া তুলনা করছেন?",
      body: "ইস্তাম্বুল বা ইউরোপীয় গেটওয়ে হয়ে ঢাকা থেকে মাল্টি-সিটি রুট সার্চ করুন — তারিখ ঠিক করার আগে ভাড়া কীভাবে বদলায় দেখে নিন।",
    },
  },
  "chefchaouen-morocco-travel-guide-bangladesh": {
    title: "শেফশাওয়েন, মরক্কো ট্রাভেল গাইড (২০২৬): নীল শহরের মেদিনা, ফোয়ারা ও রিফ পাহাড় — ঢাকা থেকে BDT বাজেটসহ",
    summary:
      "মরক্কোর নীল শহর টাঞ্জিয়ার থেকে দুই ঘণ্টা দক্ষিণে রিফ পাহাড়ের কোলে, যেখানে প্রতি বসন্তে গলি, ফোয়ারা ও দরজাগুলো নীল রঙের স্তরে রাঙানো হয়। বাংলাদেশি ভ্রমণকারীদের জন্য এই সম্পূর্ণ শেফশাওয়েন গাইডে আছে নীল মেদিনা ও পুরোনো ফোয়ারা এলাকা, প্লাজা উতা এল-হাম্মাম ও ১৫শ শতকের কাসবাহ, স্প্যানিশ মসজিদের সূর্যাস্ত ট্রেক, তালাসেমতানে অ্যাকচোর জলপ্রপাত, রাত USD ২৫ থেকে রিয়াদ থাকা, এবং বাস্তব নিয়ম — বাংলাদেশি পাসপোর্টে মরক্কো ভিসা (ভিসা অন অ্যারাইভাল নেই), টাঞ্জিয়ার ও ফেজ থেকে CTM বাস, ৫ দিনের মরক্কো লুপের BDT ১,৫০,০০০-২,২০,০০০ বাজেট এবং কেন হালাল খাবার এখানে সহজ।",
    category: "Family & Budget",
    date: "৮ অক্টোবর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৯ মিনিট পড়া",
    content: `টাঞ্জিয়ার থেকে দুই ঘণ্টা দক্ষিণে রিফ পাহাড়গুলোর কোলে এমন একটি শহর খুলে যায় যেন আকাশ সেখানে নেমে এসেছে। শেফশাওয়েন — মরক্কোরবিখ্যাত নীল শহর — পুরো গলি, সিঁড়ি, দরজার চৌকাঠ আর ফোয়ারাকে পাউডার নীল, বেগুনি ও সাদার স্তরে রাঙিয়ে রাখে, আরছবিতে যেভাবে ফেমাস, বাস্তবে তার চেয়েও সুন্দর। মরক্কোর সাম্রাজ্যিক শহরগুলোর সাথে পাহাড়ি পলায়ন জোড়ার বাংলাদেশি ভ্রমণকারীদের জন্য শেফশাওয়েনই দেশের সবচেয়ে ফটোজেনিক ও শান্ত গন্তব্য: পায়ে হেঁটে পুরোটা ঘুরে যাওয়ার মতো ছোট, দুই-তিন দিন ভরিয়ে রাখার মতো সমৃদ্ধ, আর চারপাশেউত্তর মরক্কোর সেরা হাঁটার প্রকৃতি। এই গাইডে আছে নীল মেদিনা ও পুরোনো ফোয়ারা এলাকা, কাসবাহ, বেশিরভাগ ভ্রমণকারী যে সূর্যাস্ত ট্রেকটি মিস করেন, রিফ পাহাড়ের ডে ট্রিপ, BDT-তে সৎ বাজেট, এবং ভিসা, বাস, নগদ টাকা ও হালাল খাবারের বাস্তব নিয়ম।

১. শহরটি নীল কেন এবং কখন যাবেন
মেদিনা নীল কেন — এর একটি নিশ্চিত কারণ কেউ জানে না। সবচেয়ে প্রচলিত গল্প দায়ী করে ১৫শ শতকে এবং আবার ১৯৩০-এর দশকে বসতি স্থাপনকারী ইহুদি সম্প্রদায়কে, যখন নীল রঙ আকাশ ও স্বর্গের প্রতীক হিসেবে ব্যবহৃত হতো এবং এই রঙ মশা দূরে রাখে বলে বিশ্বাস করা হতো; অন্য ব্যাখ্যা নিছক ঐতিহ্য — বাসিন্দারা প্রতি বসন্তে দেয়াল, সিঁড়ি ও ফোয়ারা আবার রাঙান। দর্শকের জন্য গুরুত্বপূর্ণ হলো দিনের বিভিন্ন সময়ে রঙ বদলায় — সকালের ছায়ায় গাঢ় নীল, দুপুরে ফিকে রুপালি-নীল, সূর্যাস্তে বেগুনি-উষ্ণ — তাই ফটোগ্রাফাররা এক রাতে এসে তিন দিন থেকে যান।
সেরা সময় এপ্রিল-জুন এবং সেপ্টেম্বর-অক্টোবর: উষ্ণ দিন, শীতল সন্ধ্যা, পরিষ্কার পাহাড়ি বাতাস। জুলাই-আগস্টে গরম ও ইউরোপীয় ছুটির ভিড়। শীতকাল (নভেম্বর-মার্চ) সত্যিকারের ঠান্ডা — শহরটি রিফে প্রায় ৬০০ মিটার উচ্চতায় — বৃষ্টি বা মাঝে মাঝে তুষারপাত মেদিনাকে জাদুকরী করে তোলে, তবে হাইকিং কঠিন হয়ে পড়ে। মেদিনায় দুটি পূর্ণ দিন রাখুন, অ্যাকচোর যেতে চাইলে তিনটি।

২. শেফশাওয়েন যাওয়া: ফ্লাইট, ভিসা ও শেষ পথ
ঢাকা থেকে মরক্কোর সরাসরি ফ্লাইট নেই। ব্যবহারিক রুট ইস্তাম্বুল, দুবাই বা দোহা হয়ে কাসাব্লাঙ্কা (CMN) বা টাঞ্জিয়ার; মৌসুম ও বুকিংয়ের সময়ভেদে ঢাকা থেকে রিটার্ন ইকোনমি ভাড়া সাধারণত BDT ৯০,০০০-১,৬০,০০০ ব্যান্ডে। কাসাব্লাঙ্কা থেকে অনেকে দ্রুত আল বোরাক ট্রেনে প্রায় দুই ঘণ্টায় টাঞ্জিয়ার যান, তারপর সড়কপথে।
- ভিসা: বাংলাদেশি পাসপোর্টধারীদের আগেই মরক্কো ভিসা লাগে — ভিসা অন অ্যারাইভাল নেই। বাস্তবে আবেদন হয় বাংলাদেশের দায়িত্বপ্রাপ্ত মরক্কান মিশনের মাধ্যমে (প্রায়ই নয়াদিল্লির মরক্কো দূতাবাস) বা লাইসেন্সপ্রাপ্ত ভিসা এজেন্টের মাধ্যমে; যোগ্য ভ্রমণকারীদের জন্য মরক্কোর e-Visa পোর্টালও চলছে। নিয়ম, ব্যাংক স্টেটমেন্টের শর্ত ও প্রসেসিং সময় বদলায় — এজেন্টকে টাকা দেওয়ার আগে অফিশিয়াল চ্যানেলে সব নিশ্চিত করুন।
- শেষ পথ: শেফশাওয়েনে রেলস্টেশন নেই। CTM বাস ও Supratours কোচ টাঞ্জিয়ার (প্রায় ৪ ঘণ্টা), ফেজ (প্রায় ৪ ঘণ্টা) ও তিতুয়ান (প্রায় ২ ঘণ্টা) থেকে মেদিনার নিচের ছোট বাসস্টেশনে আসে; শেয়ার্ড গ্র্যান্ড ট্যাক্সি দ্রুত কিন্তু ব্যয়বহুল। গ্রীষ্মে CTM টিকিট এক দিন আগে কিনুন — সন্ধ্যার বাস পূর্ণ হয়ে যায়।
- অ্যারাইভাল: মেদিনা শুধু পায়ে চলা — খাড়া ও সরু। রিয়াদের সাথে বাব বুজালুদ বা ট্যাক্সি স্টপে মিলিত হওয়ার জায়গা ঠিক করুন; বেশিরভাগ রিয়াদ ব্যাগ বহনের জন্য মানুষ পাঠায়।

৩. নীল মেদিনা, পুরোনো ফোয়ারা ও কাসবাহ
বাব বুজালুদ দিয়ে মেদিনায় ঢুকলেই শহরটি বাকিটা নিজেই করে দেয়: নীলের পাঁচটি শেডে রাঙানো দরজার পাশ দিয়ে খাড়া কব্জাপথ, পুরু রঙিন বার হয়ে ঝুলে থাকা উলীন কম্বল ও স্কার্ফ, উষ্ণ ধাপে বসা বিড়াল। উপরের মেদিনায় খোদাই করা পাথর ও নীল-সাদা টাইলসে সাজানো প্রাচীন সাম্প্রদায়িক ফোয়ারাগুলো এখনো পাড়ার কাজে লাগে, আর চারপাশে স্তূপীকৃত টেক্সটাইল দোকানগুলো শহরের সবচেয়ে ছবি তোলা কোণ তৈরি করেছে। এটি কোনো সেট নয়, বরং বসতিপূর্ণ জীবন্ত মেদিনা: সকালে বাসিন্দারা ধাপ ধোয়, স্কুল থেকে শিশুরা ফেরে, আর নীল রঙ টিকিয়ে রাখেন ভেতরে বসবাসকারীরাই।
- প্লাজা উতা এল-হাম্মাম: গাছের নিচে ক্যাফেঘেরা প্রধান চত্বর, সামনে কাসবাহ ও দুর্লভ অষ্টভুজ মিনারসহ গ্র্যান্ড মসজিদ (মসজিদে অমুসলিমদের প্রবেশ নিষিদ্ধ — চত্বরটাই আসল আকর্ষণ)।
- কাসবাহ: মাওলায় আলি ইবনে রাশিদের ১৫শ শতকের দুর্গ, ১৯২০-এর দশকে সংস্কারকৃত; এখন ভেতরে রিফ পোশাক, অস্ত্র ও তাঁতশিল্পের ছোট নৃতাত্ত্বিক জাদুঘর, বাগান এবং শহরের সেরা ছাদ-পাহাড় দৃশ্যের টাওয়ার উঠার সুযোগ।
- রাস এল মা: যেখানে মেদিনা নদীর সাথে মেশে। পরিবারগুলো পাথরে পিকনিক করে, নারীরা দ্রুত প্রবাহে উল ধোয়, আর স্প্যানিশ মসজিদের দিকে উপরের পথটি শেফশাওয়েনের সবচেয়ে সুন্দর ছোট হাঁটা।
- স্প্যানিশ মসজিদ (জেবেল আল-কালা): শহরের উপরে পর্বতশ্রেণিতে ধ্বংসপ্রাপ্ত মসজিদে ৩০-৪৫ মিনিটের খাড়া হাঁটা। সবাই যে সূর্যাস্ত ভিউপয়েন্টটি শোনেন — গোল্ডেন আওয়ারেও এখানে অর্ধেক মানুষই থাকে না। উঠে যান, ব্লু আওয়ার পর্যন্ত থাকুন, টর্চ হাতে নেমে আসুন।

৪. অ্যাকচোর ও রিফ পাহাড়
- অ্যাকচোর জলপ্রপাত: গ্র্যান্ড ট্যাক্সিতে তালাসেমতান জাতীয় উদ্যানের দিকে প্রায় ৪৫ মিনিট, তারপর মূল জলপ্রপাতে ৪৫-৯০ মিনিটের হাইক। গডস ব্রিজ (Pont de Dieu) প্রাকৃতিক পাথরের খিলানটি ছোট হাঁটা। জলের জুতা, পিকনিক ও সাঁতারের কাপড় নিয়ে যান — গ্রীষ্মে পাথরের পুকুরগুলোই পুরস্কার।
- তালাসেমতান জাতীয় উদ্যান: মরক্কোর শেষ ফির বনগুলোর একটি, চিহ্নিত ট্রেইল, পাখির ডাক ও পাহাড়ি বাতাস — মেদিনা থেকে এক ঘণ্টা। লাইসেন্সপ্রাপ্ত স্থানীয় গাইড রিয়াদ বা শহরের গাইড অ্যাসোসিয়েশনের মাধ্যমে পাওয়া যায়।
- সহজ ডে ট্রিপ: আন্দালুসীয়ান মেদিনাসহ তিতুয়ান (ইউনেস্কো), উয়েদ লাউ-এর দিকে উপকূলীয় সড়ক, বা ফেজের পথে বাজার শহর ওয়াজান।

৫. থাকা ও খাওয়া (এবং হালাল এখানে কেন সহজ)
- মেদিনার ভেতরে থাকুন: ঐতিহ্যবাহী রিয়াদ বা দার — নীল উঠান, ছাদের টেরেস, রিফের দৃশ্য — সকালের নাশতাসহ ডাবল রুম প্রায় USD ২৫-৬০। গলি খাড়া: দীর্ঘ বাস যাত্রার পর ব্যাগ বহনের সুবিধাসহ বাব বুজালুদের কাছের রিয়াদ কয়েক ডলার বেশি দিয়েও মূল্যবান।
- খাবার: ট্যাগিন (স্থানীয় প্রিয় লেবু ও জলপাইসহ মুরগি), শুক্রবারের কুসকুস, হারিরা স্যুপ, সকালে মসমেন রুটি, আর শহরের বিখ্যাত ছাগলের পনির (জবন) মধুসহ। বাংলাদেশি স্বাদের তুলনায় মরক্কান খাবার মৃদু — হরিসা ও গরম সস প্রতিটি টেবিলে তীব্রতার জন্য থাকে।
- হালাল: মরক্কো একটি মুসলিম দেশ এবং প্রায় প্রতিটি রান্নাঘর স্বাভাবিকভাবেই হালাল; অ্যালকোহল শুধু লাইসেন্সপ্রাপ্ত হোটেল ও কিছু পর্যটক রেস্টুরেন্টে। স্ট্রিট ফুডে ঢাকার মতোই বিচার-বুদ্ধি করুন — বাকিটা মুসলিম ভ্রমণকারীদের জন্য সহজ।
- পুদিনা চা আপনাকে অতিথি করে তোলে: মিষ্টি, উচ্চতা থেকে ঢালা ছোট গ্লাসে। গ্রহণ করাই মেদিনায় বন্ধুত্বের শুরু।

৬. টাকা, নিরাপত্তা ও বাস্তব নিয়ম
- মুদ্রা: মরক্কান দিরহাম (MAD)। বাব বুজালুদ ও প্রধান চত্বরে ATM আছে; ছোট রিয়াদ, ট্যাক্সি ও সুকে নগদ পছন্দ করে। বড় রেস্টুরেন্ট ও গ্যালারিতে কার্ড চলে — পেটিট ট্যাক্সি ও টিপের জন্য ছোট নোট রাখুন।
- দৈনিক বাজেট: মরক্কোর মধ্যে শেফশাওয়েন সবচেয়ে কোমল বাজেটের — জনপ্রতি দিন USD ৪০-৭০-এ রিয়াদ, তিন বেলা খাবার, কফি, চা ও টিকিট মিলে যায়। ফ্লাইটসহ ৫ দিনের বাস্তব মরক্কো লুপ (কাসাব্লাঙ্কা বা টাঞ্জিয়ার, ফেজ ও শেফশাওয়েন) জনপ্রতি আনুমানিক BDT ১,৫০,০০০-২,২০,০০০।
- নিরাপত্তা: যেকোনো মানদণ্ডে শেফশাওয়েন অত্যন্ত নিরাপদ; ভ্রমণকারীদের বিরুদ্ধে সহিংস অপরাধ বিরল। দৈনন্দিন ঝামেলা হলো অফিসিয়াল-ছাড়া "গাইড" — ফ্রি টুরের প্রস্তাব দোকানে গিয়ে শেষ হয়; দৃঢ়ভাবে ও নম্রভাবে প্রত্যাখ্যান করুন, অথবা রিয়াদের মাধ্যমে লাইসেন্সপ্রাপ্ত গাইড নিন। পিক সিজনে জনাকীর্ণ গলিতে ব্যাগে স্বাভাবিক যত্ন নিন।
- ভাষা: মরক্কান দারিজা (আরবি), ব্যাপকভাবে ফরাসি, উত্তরে স্প্যানিশ সাধারণ, পর্যটনে ইংরেজি। কয়েকটি শব্দ অনেক দূর যায় — শুকরান (ধন্যবাদ), বি-সাহা (উপভোগ করুন), লা শুকরান (না, ধন্যবাদ)।
- কানেক্টিভিটি: বিমানবন্দরে Maroc Telecom বা Orange-এর সস্তা লোকাল SIM, আর Airalo ও Yesim-এর মতো গ্লোবাল eSIM মরক্কো সঠিকভাবে কভার করে। রিয়াদের ওয়াইফাই স্ট্যান্ডার্ড।
- চলাচল: মেদিনা শুধু পায়ে — ছোট, খাড়া, আনন্দদায়ক। নিচের শহরে পেটিট ট্যাক্সি; মিটার বা ভাড়া আগে ঠিক করুন (বেশিরভাগ রাইড ১০-২০ MAD)।

৭. বাংলাদেশি ভ্রমণকারীদের জন্য ভালো ৫ দিনের মরক্কো লুপ
- কাসাব্লাঙ্কা (CMN)-এ নামুন; ট্রেনে শহরে বা সরাসরি ফেজে (প্রায় ৩.৫ ঘণ্টা)।
- ফেজ মেদিনায় দুই দিন: টেরেস থেকে ট্যানারি, বু ইনানিয়া মাদ্রাসা (সবার জন্য উন্মুক্ত), পিতল ও মশলার সুক — এবং বিশ্বের প্রাচীনতম বিশ্ববিদ্যালয় আল কারাউইয়িন, দরজা থেকে দেখে নিন (অমুসলিমদের মসজিদে প্রবেশ নিষিদ্ধ)।
- CTM বাসে শেফশাওয়েন (প্রায় ৪ ঘণ্টা); নীল মেদিনায় দুই দিন — স্প্যানিশ মসজিদের সূর্যাস্তসহ, পা সাথে দিলে অ্যাকচোরও।
- টাঞ্জিয়ার বা তিতুয়ান হয়ে ফেরি; আল বোরাক ট্রেন আপনাকে ফ্লাইটের আগে কাসাব্লাঙ্কায় ফিরিয়ে আনে। আন্তর্জাতিক রওনার আগে একটি বাফার দিন রাখুন — পাহাড়ি বাস পাহাড়ি সময়ে চলে।

শেষ কথা:
শেফশাওয়েন এমন জায়গা যেখানে ভ্রমণকারীরা মাসের পর মাস লেখেন — কোনো একটি দর্শনীয় স্থানের জন্য নয়, বরং ধীর সেই ঘণ্টাগুলোর জন্য: দেয়াল বেগুনি হয়ে ওঠার সময় ছাদে চা, এখনো গ্রামের কূপের মতো কাজ করা ফোয়ারা চত্বর, হাঁটা সহজ বলে যে পাহাড়ি সূর্যাস্তটিতে আপনি পৌঁছে যান। বৃহত্তর মরক্কো লুপের মধ্যে দুটি অবসরপূর্ণ দিন দিন, নগদ টাকা সাথে রাখুন, স্বপ্ন দেখার আগে ভিসা নিশ্চিত করুন — বাকিটা নীল রঙকে করতে দিন।`,
    internalLinks: [
      { text: "হাভানা, কিউবা ট্রাভেল গাইড: ক্লাসিক গাড়ি ও গ্রান তেয়াত্রো", path: "/blog/havana-cuba-travel-guide-bangladesh" },
      { text: "ঢাকা থেকে সস্তায় ফ্লাইট টিকিটের ৫টি গোপন কৌশল", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "ঢাকা থেকে প্রধান এয়ারলাইন্সের ব্যাগেজ নিয়ম তুলনা", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "সেরা ট্রাভেল eSIM ও ট্রাভেল ইনস্যুরেন্স গাইড", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "ডুয়াল-কারেন্সি কার্ড এন্ডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "গ্লোবাল ফ্লাইট সার্চ ও ভাড়া বেঞ্চমার্ক", path: "/flights" },
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools?tab=airhelp" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "মরক্কোর জন্য ভাড়া তুলনা করছেন?",
      body: "ইস্তাম্বুল, দুবাই বা দোহা হয়ে ঢাকা থেকে কাসাব্লাঙ্কা বা টাঞ্জিয়ার পর্যন্ত মাল্টি-সিটি রুট সার্চ করুন — তারিখ ঠিক করার আগে ভাড়া কীভাবে বদলায় দেখে নিন।",
    },
  },
  "travel-creator-resources": {
    title: "ট্রাভেল ক্রিয়েটর রিসোর্সেস: আমরা যে টুলগুলো সত্যিই ব্যবহার করি (২০২৬)",
    summary:
      "২০২৬ সালের ট্রাভেল ক্রিয়েটরদের জন্য হাইপ-মুক্ত তালিকা: ফ্রি SEO টুল, ফোন ফটোগ্রাফি ওয়ার্কফ্লো, বিশ্বস্ত রিসার্স সোর্স এবং URAL Travel-এর একটিমাত্র মনিটাইজেশন হাব — বাংলাদেশ থেকে কন্টেন্ট তৈরি করা ক্রিয়েটরদের জন্য বাছাই করা। ট্রাভেল ব্লগ সত্যিই কীভাবে আয় করে, আর্টিকেলে অ্যাফিলিয়েট টুল কোথায় থাকা উচিত, আর ঢাকার ক্রিয়েটরকে কোনো প্ল্যাটফর্মে যোগ দেওয়ার আগে কী যাচাই করা উচিত — সৎ উত্তরসহ।",
    category: "Travel Tips",
    date: "৮ অক্টোবর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১০ মিনিট পড়া",
    internalLinks: [
      { text: "বাংলাদেশি ভ্রমণকারীদের জন্য ব্যাংককের হালাল ফুড গাইড", path: "/blog/halal-food-guide-bangkok-bangladesh" },
      { text: "ঢাকা থেকে হাভানা, কিউবা ট্রাভেল গাইড", path: "/blog/havana-cuba-travel-guide-bangladesh" },
      { text: "ঢাকা থেকে শেফশাওয়েন, মরক্কো ট্রাভেল গাইড", path: "/blog/chefchaouen-morocco-travel-guide-bangladesh" },
      { text: "ঢাকা থেকে সস্তায় ফ্লাইট টিকিটের ৫টি গোপন কৌশল", path: "/blog/cheap-flight-booking-hacks-dhaka" },
      { text: "ফ্লাইট বিলম্ব, বাতিল ও ব্যাগেজ হারানোর ক্ষতিপূরণ গাইড", path: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp" },
      { text: "সেরা ট্রাভেল eSIM ও সেনজেন ট্রাভেল ইন্স্যুরেন্স গাইড", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
    ],
    content: `ট্রাভেল ব্লগিং টুল সার্চ করলে এমন পঞ্চাশটির তালিকা পাবেন যেখানে প্রতিটি দ্বিতীয় এন্ট্রি পেইড প্লেসমেন্ট। এই পেজটি ঠিক উল্টো: URAL Travel-এ আমরা ২০২৬ সালে সত্যিই যে ট্রাভেল ক্রিয়েটর রিসোর্সগুলো ব্যবহার করি, বাংলাদেশ থেকে কন্টেন্ট তৈরি করা ক্রিয়েটরদের জন্য বাছাই করে তার সংক্ষিপ্ত, সৎ তালিকা। কোনো পেইড র‍্যাংকিং নেই, কোনো এমন টুল নেই যা আমরা কখনো খুলিনি — প্রতিটি কেন তালিকায় আছে তার স্পষ্ট ব্যাখ্যাসহ।

আপনি যদি ট্রাভেল ব্লগ, ইউটিউব চ্যানেল বা ডেস্টিনেশন ওয়েবসাইট শুরু করেন, এবং পুনরাবৃত্ত হাইপ নয়, ঢাকার ডেস্ক থেকে সৎ মনিটাইজেশন পরামর্শ চান — তাহলে এই পেজটি আপনার জন্য। আপনি যদি ট্রিপ প্ল্যান করেন, তাহলে আমাদের ডেস্টিনেশন গাইডগুলোতে যান।

১. আমাদের তালিকায় কী যায়, তার নিয়ম
তিনটি নিয়ম, এবং যে কোনো একটিতে ব্যর্থ হলে কিছুই তালিকায় যায় না।
- এটি আমাদের নিজেদের সমস্যার সমাধান করে। কোনো টুল যদি আমাদের নিজেদের ওয়ার্কফ্লোতে জায়গা না পায়, এখানে তার লাইনও থাকে না।
- প্রাইসিং স্বচ্ছ। ফ্রি টিয়ার চলতে পারে; লুকানো খরচ আর জাল কাউন্টডাউন চলে না।
- এটি বাংলাদেশ থেকে কাজ করে। পেআউট পদ্ধতি, মুদ্রা, ভিসা ঘর্ষণ আর সাধারণ ইন্টারনেটের বাস্তবতা গুরুত্বপূর্ণ যখন আপনার ডেস্ক ঢাকায়।
কিছু বিখ্যাত নাম ইচ্ছাকৃতভাবে নেই। বিশ্বাসযোগ্য ছোট তালিকা অবিশ্বাসযোগ্য বড় তালিকার চেয়ে ভালো, এবং নিচের প্রতিটি বাণিজ্যিক উল্লেখ প্রকাশিত। এই পেজে একমাত্র রেফারেল লিংক বসেছে এই পেজের নিচের দিকে স্পষ্টভাবে চিহ্নিত ক্রিয়েটর কলআউটে।

২. দশটি অ্যাফিলিয়েট লগইন নয়, একটিমাত্র মনিটাইজেশন হাব দিয়ে শুরু
ট্রাভেল ব্লগাররা আসলে কীভাবে টাকা আয় করেন, আর ব্লগকে বিলবোর্ড না বানিয়ে ট্রাভেল ব্লগ কীভাবে মনিটাইজ করবেন? প্রায় সব সময় একই প্রথম ধাপ: পাঠক যে টুলগুলো যেকোনো ক্ষেত্রেই বুক করত, সেগুলোর অ্যাফিলিয়েট কমিশন। নতুন ক্রিয়েটরদের সবচেয়ে বড় ভুল দশটি আলাদা প্রোগ্রামে সাইনআপ করা, দশটি ড্যাশবোর্ড খুঁজে বেড়ানো, আর কোনোটি থেকেই কিছু না আয় করা। একটিমাত্র হাব দিয়ে শুরু করুন।
Travelpayouts সেই হাব যা আমরা সুপারিশ করি এবং এই সাইট চালায়। যোগদান ফ্রি, এবং একটিমাত্র ড্যাশবোর্ড থেকে ৮০+ ট্রাভেল ব্র্যান্ড: ফ্লাইট, হোটেল, টুর, ট্রান্সফার, অ্যাট্রাকশন টিকিট, eSIM। আমাদের নিজেদের গাইডে থাকা একাধিক প্রোগ্রাম এখান দিয়েই চলে: ফ্লাইট সার্চের জন্য Aviasales, ট্রিপ-প্ল্যানিং ক্যাশব্যাকের জন্য WayAway, অ্যাক্টিভিটি ও রেল পাসের জন্য Klook, প্রাইভেট ট্রান্সফারের জন্য GetTransfer, এবং মিউজিয়াম ও অ্যাট্রাকশন টিকিটের জন্য Tiqets।
আসলে যা আয় করায়: প্ল্যাটফর্মের উইজেট, ডিপ লিংক ও রেডিমেড বাটন বোরিং টেকনিক্যাল কাজটা করে দেয়, ফলে আপনার সময় যায় কন্টেন্টে, লিংক ম্যানেজমেন্টে নয়। সত্যিকারের আর্টিকেলের ভেতরে সেই টুলগুলো কোথায় বসে তা দেখুন আমাদের ফ্লাইট-বুকিং হ্যাকস গাইড আর ফ্লাইট কম্পেনসেশন গাইডে: পাঠক যেখানে সার্চ করে সেখানে সার্চ বক্স, যেখানে বুক করে সেখানে বুকিং বাটন, আর মাঝখানে এডিটোরিয়াল হওয়ার ভান করা কিছুই নয়।
Travelpayouts-এর রেফারেল প্রোগ্রামের একটি সৎ অনুচ্ছেদ এখানে যোগ্য, কারণ এই পেজটি ঠিক এজন্যই। পরে আপনি যদি নিজের রেফারেল লিংক দিয়ে অন্য ক্রিয়েটরদের প্ল্যাটফর্মটি সুপারিশ করেন, নতুন পার্টনাররা $100 পর্যন্ত ওয়েলকাম বোনাস পেতে পারেন, আর সেই ক্রিয়েটরদের আসল আয়ের মাইলফলকে আপনিও পুরস্কার পান: খালি সাইন-আপে নয়, সত্যিকারের তোলা আয়ে। এটি দ্রুত টাকা নয়, ধীরে জমে ওঠা চ্যানেল, আর সেলফ-রেফারেল নিষিদ্ধ। নিচের চিহ্নিত কলআউটে আমাদের নিজের রেফারেল লিংক, স্পষ্ট প্রকাশনাসহ।

৩. ফ্রি কন্টেন্ট ও SEO টুল যা সত্যিই কাজে লাগে
ট্রাভেল ব্লগিং শুরু করতে মাসে ৯৯ ডলারের টুলচেইন লাগে না। নিচের প্রতিটির সত্যিকারের কার্যকর ফ্রি টিয়ার আছে, আর এই কোম্পানিগুলোর কেউই আমাদের কিছু দেয় না।
- Google Search Console। পাঠক আপনাকে খুঁজে পেতে আসলে কী টাইপ করেছে দেখানো একমাত্র অ্যানালিটিক্স। প্রথম দিনেই ইনস্টল করুন; কোয়েরি রিপোর্টই আপনার কীওয়ার্ড রিসার্চ।
- Google Trends। আর্টিকেল লেখার আগে মৌসুম যাচাই করুন: কখন যাওয়া ভালো সার্চের একটি ক্যালেন্ডার থাকে, আপনার প্রকাশনা তারিখেরও থাকা উচিত।
- Canva ফ্রি টিয়ার। থাম্বনেইল, পিন ও সোশ্যাল ক্রপ। একটি টেমপ্লেট রাখুন যাতে ব্র্যান্ড একরকম দেখায়।
- Grammarly ফ্রি টিয়ার। প্রথম-ব্যক্তির গাইডের বিশ্বাসযোগ্যতা নিঃশব্দে নষ্ট করা ভুলগুলো ধরে।
- Notion ফ্রি টিয়ার। আইডিয়া, টার্গেট কীওয়ার্ড, স্ট্যাটাস ও প্রকাশনা তারিখের একটিমাত্র ডাটাবেস। আমাদের নিজেদের এডিটোরিয়াল ক্যালেন্ডার এতেই চলে।
অন্য কিছুর আগে Search Console ইনস্টল করুন। পাঠক আসলে কী টাইপ করে আপনাকে পেয়েছে দেখানো এটাই একমাত্র ফ্রি টুল, এবং সেই কোয়েরি রিপোর্টই আপনার কীওয়ার্ড রিসার্চ, কন্টেন্ট ক্যালেন্ডার আর সৎ SEO-এর কম্পাস, এক স্ক্রিনে।

৪. আপনার সেরা ক্যামেরা ইতিমধ্যেই আপনার হাতে আছে
পাঠক সাদামাটা ছবিকে মেনে নেয়। জাল ছবিকে নয়। আমাদের ছবি ফোনে তোলা আর ফোনেই এডিট করা।
- Snapseed (ফ্রি, ওয়াটারমার্ক ছাড়া) বা Lightroom Mobile ফ্রি টিয়ার। এক্সপোজার ও হরাইজন ঠিক করুন; ফিল্টার এমন টানবেন না যে খাবার তেজস্বী দেখায়।
- আগে ওয়াইড, তারপর ডিটেইল। এডিটর ও পাঠক দুজনেই দৃশ্য আর টেক্সচার দুটোই চান।
- অল্ট টেক্সট এমন লিখুন যেন দৃষ্টিহীন বন্ধুর জন্য ক্যাপশন: ১২৫ অক্ষরের নিচে, আসল যতিচিহ্নসহ। অ্যাক্সেসিবিলিটির জন্য ভালো, ইমেজ SEO-র জন্য ঠিক।
- যেখানে দাঁড়াননি সেখানের ছবি কখনো ছাপবেন না। পাঠক সাদামাটা সৎ ছবিকে মেনে নেয়; জাল স্টক মিথ্যাকে কখনো নয়।
আমাদের শেফশাওয়েন গাইড চলে নীল গলির ফোন শটে, আর সৎ ছবি কেনা ছবিকে প্রতিবার হারায়। অধিকার সমস্যা ছাড়া ব্যবহার করার একমাত্র উপায়ও নিজের ছবিই।

৫. আসল টাকা দিয়ে যে রিসার্স টুলগুলোতে আস্থা রাখি
আমাদের ডেস্টিনেশন গাইড যে বেল্টেই তৈরি।
- The Man in Seat 61। দশকের পর দশক হালনাগাদ থাকা ইন্টারনেটের সেরা রেলওয়ে পরামর্শ। কোনো গাইড ট্রেন নিয়ে লিখে এটি উল্লেখ না করলে সাবধান।
- Rome2rio। দ্রুত রুট সম্ভাব্যতা: কোনটা কোনটার সাথে যুক্ত, মোটামুটি কত সময়। প্রকাশের আগে অপারেটরের নিজের সাইটে সবসময় নিশ্চিত হোন।
- Numbeo। ক্রাউড-সোর্সড জীবনযাত্রা খরচের ডেটা: বাজেট টেবিলের যাচাই, চূড়ান্ত সিদ্ধান্ত নয়।
- দূতাবাস ও অফিশিয়াল ভিসা পেজ। আমাদের গাইডের প্রতিটি ভিসা দাবি অফিশিয়াল সোর্সের সাথে যুক্ত, কারণ সময়সীমা ও নিয়ম বদলায়, আর পুরনো ভিসা পরামর্শে সুনাম টিকে থাকে না।
কাজ প্রকাশ্যে প্রমাণ করুন। আমাদের কিউবা গাইড স্পষ্ট বলে স্যাংশন কার্ড পেমেন্টের কী করে; আমাদের ব্যাংকক হালাল গাইড অস্পষ্ট দাবি নয়, রাস্তা আর লোগোর নাম বলে। নির্দিষ্ট সীমাবদ্ধতাই নিশ, আর পাঠক পুরস্কৃত করে সেটাই।

৬. ওয়ার্কফ্লো: একটি ট্রাভেল আর্টিকেল আসলে কীভাবে আয় করে
একটি আর্টিকেল টাকা আয় করার আগে বিশ্বাস অর্জন করে, আর ক্রমটা গুরুত্বপূর্ণ।
- প্রতি আর্টিকেলে একটি সার্চ ইনটেন্ট: ব্যাংককে হালাল খাবার, এশিয়া ভ্রমণ নয়।
- প্রথম ১০০ শব্দেই উত্তর দিন, তারপর দীর্ঘ পাঠ অর্জন করুন।
- অভিজ্ঞতা থেকে লিখুন, আর যা জানেন না তা স্পষ্ট বলুন।
- অ্যাফিলিয়েট টুল সেখানে রাখুন যেখানে পাঠকের কাজে লাগে: যেখানে সার্চ করবে সেখানে সার্চ বক্স, যেখানে বুক করবে সেখানে বুকিং বাটন।
- প্রতিটি অ্যাফিলিয়েট ও রেফারেল লিংক সরল ভাষায় প্রকাশ করুন।
- আপনার আর্টিকেলগুলো একে অন্যের সাথে লিংক করুন। ইন্টারনাল লিংক ছাড়া গাইড একটি দ্বীপ।
- অপেক্ষা করুন। সার্চ ট্রাফিক দিনে নয়, মাসে জমে, আর বেশিরভাগ পরিত্যক্ত ট্রাভেল ব্লগ তৃতীয় মাসেই ছেড়ে দেয়।
এর কোনোটাই গ্ল্যামারাস নয়। সবই কাজ করে।

৭. সচরাচর জিজ্ঞাসা
Travelpayouts-এ যোগদান কি ফ্রি?
হ্যাঁ। যোগদান ফ্রি; প্ল্যাটফর্মের ভেতরে আলাদা ব্র্যান্ড প্রোগ্রামে আবেদন করেন, আর আপনার কন্টেন্ট কনফার্মড বুকিং বা যোগ্য রেফারেল তৈরি করলে আয় করেন। লেখার আগে প্রতিটি প্রোগ্রামের রেট ও কুকি উইন্ডো দেখে নিন।
ট্রাভেল ব্লগাররা আসলে কীভাবে টাকা আয় করেন?
চারটি সৎ চ্যানেল: ফ্লাইট, থাকা, টুর ও বীমার অ্যাফিলিয়েট কমিশন; ডিসপ্লে অ্যাড; স্পন্সরড কন্টেন্ট; এবং নিজের প্রোডাক্ট বা গাইড। ট্রাফিক লাগে, খ্যাতি নয় — তাই সাধারণত অ্যাফিলিয়েট আয়ই আগে আসে।
নতুন ট্রাভেল ব্লগ আয় করতে কত সময় লাগে?
মাস হিসাবে ভাবুন। ছয় মাসে যে সাইট আয় করে, সেটি প্রথম মাস থেকেই নিয়মিত প্রকাশ করেছে। সার্চ ইঞ্জিন সেই সাইটকে পুরস্কৃত করে যেটি টিকে থাকে, আসল প্রশ্নের উত্তর দেয় এবং আপডেট করতে থাকে।
আয় করতে কি বিশাল অডিয়েন্স লাগে?
না। কেনার ইচ্ছাসহ এক হাজার পাঠক এক লাখ স্ক্রলারের চেয়ে ভালো। নির্দিষ্ট, সৎ, সার্চ-ভিত্তিক আর্টিকেল এ কারণেই ছোট সাইট আয় করে।
বাংলাদেশের ক্রিয়েটরকে আগে কী যাচাই করা উচিত?
যে প্ল্যাটফর্মে যোগ দিচ্ছেন সেগুলো আপনার দেশ ও মুদ্রায় পেআউট দেয় কি না, আপনার পাসপোর্ট ও ভিসার তথ্য অফিশিয়াল সোর্স থেকে এসেছে কি না, এবং আপনার ইন্টারনেটের বাস্তবতা, লোড টাইম থেকে ইমেজ সাইজ, পাঠকের সাথে মেলে কি না। আপনার মতো পাঠকদের জন্য বানান।
এই পেজে রেফারেল লিংক কোথায়?
এই পেজের নিচের দিকের চিহ্নিত ক্রিয়েটর কলআউটের ভেতরে: ঠিক এক জায়গায়, স্পষ্ট প্রকাশনাসহ, কোনো আয়ের প্রতিশ্রুতি ছাড়া। এই সাইটের প্রতিটি গাইডে আমরা এই মান ধরে রাখি।

৮. পারফেক্ট সেটআপ নয়, প্রথম আর্টিকেলটাই বানান
আয় করা ক্রিয়েটর আর লোগো ঠিক করতে থাকা ক্রিয়েটরের মাঝের পার্থক্য হলো শেষ হওয়া আর্টিকেল। একটি গন্তব্য বা একটি সমস্যা বেছে নিন যা সত্যিই জানেন — হতে পারে সেই ভিসা কাগজ যেটা আপনি ইতিমধ্যেই সামলেছেন, বা আপনি যে শহরে হাঁটেন তার হালাল খাবারের মানচিত্র — আর এই সপ্তাহে একটি উপকারী, সৎ পেজ প্রকাশ করুন। তারপর আরেকটি।
মনিটাইজ করার সময় একটিমাত্র হাব দিয়ে শুরু করুন, টুলগুলো সেখানে রাখুন যেখানে সাহায্য করে, আর সবকিছু প্রকাশ করুন। ক্রিয়েটর কলআউটই এই পেজে একমাত্র জায়গা যেখানে ক্লিক করলে আমরা আয় করি। আপনি একবার ক্লিক করেন তার চেয়ে বছরের পর বছর এই পেজে আস্থা রাখুন — সেটাই আমাদের পছন্দ।`,
    },
    "kkday-10-10-winter-sale-japan-tours-passes-guide": {
      title: "KKday ১০.১০ উইন্টার ট্রাভেল সেল: জাপান স্কি ট্যুর, থিম পার্ক, জেআর পাস ও স্কাইলাইনারে ৩০% প্রোমো কোড (২০২৬)",
      summary: "KKday-র ১০.১০ উইন্টার সেলে ৩০% ফ্ল্যাশ ছাড়ের ৩টি প্রোমো কোড (1010TOURS, 1010MOVE, 1010TIX) উন্মুক্ত হচ্ছে ১০ অক্টোবর সকাল ৮:০০ (UTC+8 / বাংলাদেশ সময় সকাল ৬:০০)-এ। হোক্কাইডো ও ফুজি স্কি ট্যুর, ইউনিভার্সাল স্টুডিওজ জাপান (USJ), টোকিও ডিজনি, Keisei Skyliner ও নানকাই ট্রেনের সম্পূর্ণ বুকিং গাইড।",
      category: "ট্রাভেল ডিল ও ইন্টেলিজেন্স",
      date: "৯ অক্টোবর ২০২৬",
      author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
      readTime: "৮ মিনিট পাঠ",
      content: `শীতকাল হলো জাপান ও পূর্ব এশিয়া ভ্রমণের সেরা পিক সিজন। হোক্কাইডোর স্নো রিসোর্ট, মাউন্ট ফুজি, টোকিওর উইন্টার লাইটিং এবং বিশ্বমানের থিম পার্ক দেখতে বিশ্বের লাখ লাখ পর্যটক ভিড় করেন। বিশ্বখ্যাত ট্রাভেল প্ল্যাটফর্ম Travelpayouts এবং KKday যৌথভাবে ঘোষণা করেছে **KKday ১০.১০ উইন্টার ট্রাভেল সেল**—যা চালু হচ্ছে **১০ অক্টোবর সকাল ০৮:০০ (UTC+8 / বাংলাদেশ সময় সকাল ০৬:০০)** থেকে।

এই সেলে ট্যুর, এয়ারপোর্ট ট্রান্সপোর্ট এবং থিম পার্ক টিকিটের ওপর ৩টি এক্সক্লুসিভ ৩০% প্রোমো কোড দেওয়া হচ্ছে। কোডগুলো সীমিত কোটায় আগে আসলে আগে পাবেন (FCFS) ভিত্তিতে কার্যকর, তাই আগে থেকেই আপনার পছন্দের বুকিং প্রস্তুত রাখা অত্যন্ত জরুরি।

---

### ১. ১০.১০ উইন্টার সেলের ৩টি প্রধান প্রোমো কোড (৩০% ফ্ল্যাশ ছাড়)

* **কোড: \`1010TOURS\` — ট্যুর ও অভিজ্ঞতায় ৩০% ছাড়**
  প্রযোজ্য: হোক্কাইডো স্কি ট্যুর, মাউন্ট ফুজি ডে-ট্রিপ, শিরাকাওয়া-গো হেরিটেজ ট্যুর ও লোকাল কালচারাল ওয়ার্কশপ।
* **কোড: \`1010MOVE\` — ট্রান্সপোর্টেশন ও এয়ারপোর্ট রেল পাসে ৩০% ছাড়**
  প্রযোজ্য: Keisei Skyliner (নারিতা-টোকিও), Nankai Rapi:t (কানসাই-ওসাকা), টোকিও মেট্রো পাস এবং প্রাইভেট এয়ারপোর্ট ড্রপ।
* **কোড: \`1010TIX\` — অ্যাট্রাকশন ও থিম পার্ক টিকিটে ৩০% ছাড়**
  প্রযোজ্য: ইউনিভার্সাল স্টুডিওজ জাপান (USJ), টোকিও ডিজনি রিসোর্ট, শিবুয়া স্কাই ও টিমল্যান্ড প্ল্যানেটস।

**ক্যাম্পেইনের গুরুত্বপূর্ণ নিয়মাবলী:**
১. **শুরুর সময়:** ১০ অক্টোবর সকাল ০৮:০০ UTC+8 (বাংলাদেশ সময় সকাল ০৬:০০) থেকে ৩১ অক্টোবর ২০২৬ পর্যন্ত।
২. **ভ্রমণের মেয়াদ:** বুকিংয়ের পর ২০২৬-২০২৭ শীতকালীন মৌসুমের ৩১ মার্চ ২০২৭ পর্যন্ত যেকোনো তারিখে ভ্রমণ করা যাবে।
৩. **ব্যবহারের সীমা:** প্রতিটি গ্রাহক অ্যাকাউন্ট থেকে প্রতিটি কোড সর্বোচ্চ ১ বার ব্যবহার করা যাবে।
৪. **পেমেন্ট পদ্ধতি:** চেকআউটের সময় প্রোমো কোড বক্সে কোডটি লিখে অ্যাপ্লাই করতে হবে।

---

### ২. \`1010TOURS\` কোডের জন্য সেরা স্কি ও ডে-ট্যুর প্রডাক্ট

১. **হোক্কাইডো সাপ্পোরো টেইনে স্কি ডে-ট্যুর (Teine Ski Resort):**
   ১৯৭২ সালের উইন্টার অলিম্পিকের ভেন্যু। সেন্ট্রাল সাপ্পোরো থেকে মাত্র ৪৫ মিনিটের দূরত্ব। রাউন্ডট্রিপ বাস এবং স্কি গিয়ার অন্তর্ভুক্ত।
২. **মাউন্ট ফুজি স্নো পার্ক ইয়েতি স্কি ট্যুর (Tokyo Departure):**
   ফুজি পর্বতের ২য় স্টেশনে অবস্থিত জাপানের অন্যতম প্রাচীন আউটডোর স্নো পার্ক। টোকিও পিকআপ, স্কি ও স্লেজ রাইড এবং হট স্প্রিং (Onsen) সুবিধা।
৩. **শিরাকাওয়া-গো গাসশো ভিলেজ ও হিদাতাকায়ামা ডে-ট্যুর:**
   ইউনেস্কো ওয়ার্ল্ড হেরিটেজ ঘোষিত শিরাকাওয়া-গোর বরফে ঢাকা ট্র্যাডিশনাল কটেজ ও ভিউপয়েন্ট।
৪. **গালা ইউজাওয়া স্নো রিসোর্ট কেবল কার ও স্কি গিয়ার রেন্টাল (Niigata):**
   বিশ্বের একমাত্র স্কি রিসোর্ট যা সরাসরি শিনকানসেন বুলেট ট্রেন স্টেশনের সাথে যুক্ত (টোকিও থেকে ৭৫ মিনিট)।
৫. **নিসেকো ও রুসুতসু প্রাইভেট স্কি ও স্নোবোর্ড লেসন:**
   পাউডার স্নো ক্যাপিটাল নিসেকোতে অভিজ্ঞ দ্বিভাষিক ট্রেইনারের তত্ত্বাবধানে প্রাইভেট ক্লাস।

---

### ৩. \`1010MOVE\` কোডের জন্য অত্যাবশ্যকীয় এয়ারপোর্ট ট্রেন ও রেল পাস

১. **Keisei Skyliner (নারিতা এয়ারপোর্ট ↔ টোকিও উইয়েনো):**
   নারিতা এয়ারপোর্ট থেকে সেন্ট্রাল টোকিও পৌঁছানোর দ্রুততম ট্রেন (ঘণ্টায় ১৬০ কিমি গতিতে মাত্র ৩৬ মিনিট)। ইনস্ট্যান্ট মোবাইল QR কোড স্টেশনের মেশিনে স্ক্যান করেই সিট পাওয়া যায়।
২. **নানকাই রাপিড এয়ারপোর্ট এক্সপ্রেস (KIX ↔ Namba Osaka):**
   কানসাই এয়ারপোর্ট থেকে সেন্ট্রাল ওসাকা নাম্বায় মাত্র ৩৪ মিনিটে পৌঁছানোর বিলাসবহুল এক্সপ্রেস ট্রেন।
৩. **টোকিও মেট্রো ২৪/৪৮/৭২ ঘণ্টার আনলিমিটেড সাবওয়ে টিকিট:**
   টোকিও শহরের ১৩টি প্রধান মেট্রো লাইনে আনলিমিটেড যাতায়াত। প্রতিটি স্টেশনে আলাদা টিকিট কেনার চেয়ে অনেক সাশ্রয়ী।
৪. **জেআর হোক্কাইডো রেল পাস ও জেআর কানসাই ওয়াইড এরিয়া পাস:**
   সাপ্পোরো, ওতারু, হাকোদাতে কিংবা ওসাকা-কিয়োটো রুটে শিনকানসেন ও এক্সপ্রেস ট্রেনে যাতায়াত।
৫. **SNOW LINER স্কি এক্সপ্রেস বাস (নারিতা/হানেদা ↔ হাকুবা):**
   টোকিও বিমানবন্দর থেকে লাগেজসহ সরাসরি নাগানোর স্কি রিসোর্টে যাওয়ার আরামদায়ক বাস সার্ভিস।

---

### ৪. \`1010TIX\` কোডের জন্য প্রধান থিম পার্ক ও ভিউপয়েন্ট

১. **ইউনিভার্সাল স্টুডিওজ জাপান (USJ) ১-দিনের অফিশিয়াল পাস:**
   সুপার নিন্টেন্ডো ওয়ার্ল্ড, হ্যারি পটার ও মিনিয়ন পার্ক। কাউন্টারের বিশাল লাইন এড়িয়ে সরাসরি গেটে মোবাইল টিকিট স্ক্যান করে প্রবেশ।
২. **ওয়ার্নার ব্রোস স্টুডিও ট্যুর টোকিও — দ্য মেকিং অব হ্যারি পটার:**
   বিশ্বের বৃহত্তম ইনডোর হ্যারি পটার ওয়াক-থ্রু এক্সপেরিয়েন্স।
৩. **টোকিও ডিজনি রিসোর্ট (ডিজনি ল্যান্ড ও ডিজনি সি):**
   বিশ্ববিখ্যাত ডিজনি পার্কের কনফার্মড ডে-পাস।
৪. **শিবুয়া স্কাই (SHIBUYA SKY) ৩৬০° অবজারভেশন ডেক:**
   টোকিওর শিবুয়া ক্রসিংয়ের ২২৯ মিটার উঁচুতে অবস্থিত শীর্ষ সূর্যাস্ত ভিউপয়েন্ট।
৫. **টিমল্যাব প্ল্যানেটস টোকিও (TeamLab Planets):**
   অত্যাধুনিক ডিজিটাল আর্ট ও লাইট মিউজিয়াম।

---

### ৫. বাংলাদেশি ভ্রমণকারীদের জন্য ডুয়াল-কারেন্সি কার্ড ও পেমেন্ট টিপস

* **পাসপোর্ট এনডোর্সমেন্ট (বাংলাদেশ ব্যাংক সার্কুলার ৩৩):**
  আপনার ডুয়াল-কারেন্সি ডেবিট বা ক্রেডিট কার্ডে ২০২৬ ক্যালেন্ডার বছরের বাৎসরিক ১৮,০০০ ইউএস ডলার কোটা এনডোর্স করা আছে কি না নিশ্চিত করুন। EBL, City Bank Amex, BRAC Bank ইত্যাদি কার্ড দিয়ে KKday-তে সরাসরি পেমেন্ট করা যায়।
* **ই-কমার্স ও 3D Secure চালু রাখুন:**
  সকাল ০৬:০০ টায় সেল শুরুর আগেই ব্যাংক অ্যাপে ঢুকে কার্ডের International E-Commerce ট্রানজ্যাকশন সচল রাখুন।
* **USD বা JPY সিলেক্ট করুন:**
  চেকআউটে সবসময় মূল মুদ্রা (USD বা JPY) বেছে নিন, যাতে ৩–৫% ডাবল কনভার্সন ফি না কাটে।
* **Klook-এর সাথে দর যাচাই করুন:**
  বুকিং ফাইনাল করার আগে Klook-এর রেটের সাথে তুলনা করে নিন যাতে আপনি সর্বনিম্ন ভাড়ায় নিশ্চিত টিকিট পান।`,
      internalLinks: [
        { text: "বাংলাদেশি ডুয়াল-কারেন্সি কার্ড এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
        { text: "ঢাকা থেকে কম খরচে বিমান টিকিট কাটার হ্যাকস", path: "/blog/cheap-flight-booking-hacks-dhaka" },
        { text: "বেস্ট ট্রাভেল ই-সিম ও ট্রাভেল ইনস্যুরেন্স গাইড", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
        { text: "আন্তর্জাতিক ফ্লাইট সার্চ ও রিয়েল-টাইম ভাড়া তুলনা", path: "/flights" },
        { text: "গ্লোবাল হোটেল ও ফ্যামিলি স্টে ফাইন্ডার", path: "/hotels" },
      ],
      affiliateCTA: {
        provider: "kkday",
        headline: "KKday ১০.১০ উইন্টার সেল: ৩০% কোড ক্লেইম করুন",
        body: "ট্যুর, ট্রান্সপোর্ট ও টিকিটে 1010TOURS, 1010MOVE এবং 1010TIX কোড ব্যবহার করে সাশ্রয় করুন।",
      },
    },
  "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide": {
    title: "ঢাকা থেকে কলকাতা ট্রেন ও বাস: বেনাপোল সীমান্ত পারাপার, মৈত্রী এক্সপ্রেস অবস্থা ও সম্পূর্ণ BDT খরচ (২০২৬)",
    summary:
      "ভারত বাংলাদেশি পাসপোর্টধারীদের অন্যতম প্রধান স্থলভ্রমণ গন্তব্য, আর ঢাকা–কলকাতা পথে বেনাপোল–পেট্রাপোলই প্রধান সড়ক করিডোর। জুলাই ২০২৪ থেকে আন্তঃসীমান্ত যাত্রীবাহী ট্রেন (মৈত্রী, বন্ধন ও মিতালি এক্সপ্রেস) স্থগিত রয়েছে এবং ১৫ অক্টোবর ২০২৬-এর পর্যালোচনায় পুনরায় চালুর কোনো নিশ্চিত তারিখ প্রকাশিত হয়নি। এই গাইডে স্থগিত রেল সেবা ও পদ্মা সেতু রুটের প্রস্তাব, ঢাকা–বেনাপোল–পেট্রাপোল–কলকাতা বাসের ধাপ, সীমান্ত ইমিগ্রেশন নিয়ম, IVAC স্টিকার ভিসার প্রক্রিয়া (বাংলাদেশি পাসপোর্টে e-Visa নেই; ivacbd.com-এ লাইভ স্লট যাচাই করুন) এবং ৩ দিনের কলকাতা ভ্রমণের আনুমানিক BDT 8,000–18,000 পরিকল্পনা বাজেট তুলে ধরা হয়েছে।",
    category: "Family & Budget",
    date: "১৫ অক্টোবর ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৮ মিনিট পঠন",
    references: [
      {
        name: "Bangladesh Railway — Official Portal & Passenger Service Notices",
        nameBn: "বাংলাদেশ রেলওয়ে — অফিশিয়াল পোর্টাল ও যাত্রীসেবা বিজ্ঞপ্তি",
        url: "https://railway.gov.bd/",
      },
      {
        name: "Bangladesh Railway — Official e-Ticketing Service",
        nameBn: "বাংলাদেশ রেলওয়ে — অফিশিয়াল ই-টিকিটিং পোর্টাল",
        url: "https://eticket.railway.gov.bd/",
      },
      {
        name: "Indian Railways — Official Passenger & Cross-Border Rail Portal",
        nameBn: "ভারতীয় রেলওয়ে — অফিশিয়াল যাত্রী ও আন্তঃসীমান্ত রেল পোর্টাল",
        url: "https://indianrailways.gov.in/",
      },
      {
        name: "Indian Visa Application Centre (IVAC) Bangladesh — Notices, Fee & Appointment Portal",
        nameBn: "ইন্ডিয়ান ভিসা অ্যাপ্লিকেশন সেন্টার (IVAC) বাংলাদেশ — বিজ্ঞপ্তি, ফি ও অ্যাপয়েন্টমেন্ট পোর্টাল",
        url: "https://www.ivacbd.com/",
      },
      {
        name: "IVAC Bangladesh — Visa Categories & Required Document Checklists",
        nameBn: "IVAC বাংলাদেশ — ভিসা ক্যাটাগরি ও প্রয়োজনীয় কাগজপত্রের তালিকা",
        url: "https://www.ivacbd.com/kind-of-visas-documents",
      },
      {
        name: "Government of India — Online Visa Application Portal for Bangladesh",
        nameBn: "ভারত সরকার — বাংলাদেশের জন্য অনলাইন ভিসা আবেদন পোর্টাল",
        url: "https://indianvisa-bangladesh.nic.in/",
      },
      {
        name: "High Commission of India, Dhaka — Consular & Visa Information",
        nameBn: "ভারতীয় হাইকমিশন, ঢাকা — কনস্যুলার ও ভিসা বিজ্ঞপ্তি",
        url: "https://www.hcidhaka.gov.in/",
      },
      {
        name: "National Board of Revenue (NBR) Bangladesh — Travel Tax Rules",
        nameBn: "জাতীয় রাজস্ব বোর্ড (NBR) বাংলাদেশ — স্থলসীমান্ত ভ্রমণ কর",
        url: "https://nbr.gov.bd/",
      },
      {
        name: "Bangladesh Land Port Authority (BLPA) — Benapole Land Port",
        nameBn: "বাংলাদেশ স্থলবন্দর কর্তৃপক্ষ (BLPA) — বেনাপোল স্থলবন্দর তথ্য",
        url: "https://blpa.gov.bd/",
      },
      {
        name: "Land Ports Authority of India (LPAI) — ICP Petrapole",
        nameBn: "ল্যান্ড পোর্টস অথরিটি অব ইন্ডিয়া (LPAI) — পেট্রাপোল ইন্টিগ্রেটেড চেক পোস্ট",
        url: "https://lpai.gov.in/",
      },
    ],
    content: `ভারত বাংলাদেশি পাসপোর্টধারীদের অন্যতম প্রধান আন্তর্জাতিক ভ্রমণ গন্তব্য, আর ঢাকা–কলকাতা স্থলপথে যশোরের বেনাপোল ও পশ্চিমবঙ্গের পেট্রাপোল সীমান্তই সবচেয়ে বেশি ব্যবহৃত রুট। জুলাই ২০২৪ থেকে আন্তঃসীমান্ত যাত্রীবাহী ট্রেন (মৈত্রী এক্সপ্রেস, বন্ধন এক্সপ্রেস ও মিতালি এক্সপ্রেস) স্থগিত রয়েছে এবং ১৫ অক্টোবর ২০২৬-এর পর্যালোচনায় পুনরায় চালুর কোনো নিশ্চিত সময়সূচি প্রকাশিত হয়নি [১, ৩]। ট্রেন বন্ধ থাকায় Haridaspur / Benapole চেকপোস্ট এনডোর্সড বৈধ ভারতীয় স্টিকার ভিসাধারী যাত্রীরা সরাসরি বা ভেঙে বাসে বেনাপোল–পেট্রাপোল সীমান্ত পার হচ্ছেন। ৩ দিন ও ২ রাতের কলকাতা স্থলভ্রমণের আনুমানিক পরিকল্পনা বাজেট জনপ্রতি BDT 8,000–18,000 (এটি পরিকল্পনার রেফারেন্স, লাইভ কোটেশন নয়)।

এই গাইডটি ১৫ অক্টোবর ২০২৬ তারিখে সরকারি রেলওয়ে, ভিসা, রাজস্ব ও স্থলবন্দর পোর্টালের তথ্যের সাথে মিলিয়ে পর্যালোচনা করা হয়েছে। যেহেতু আন্তঃসীমান্ত ট্রেন চলাচল, IVAC অ্যাপয়েন্টমেন্ট স্লট, সীমান্ত ভ্রমণ কর এবং বাসের ভাড়া যেকোনো সময় পরিবর্তন হতে পারে, তাই নন-রিফান্ডেবল বুকিংয়ের আগে উদ্ধৃত অফিশিয়াল পোর্টালে সর্বশেষ নির্দেশনা যাচাই করুন [১–১০]।

১. ২০২৬ সালে মৈত্রী এক্সপ্রেস কি চলছে?
না — জুলাই ২০২৪ থেকে আন্তঃসীমান্ত যাত্রীবাহী ট্রেন চলাচল স্থগিত রয়েছে। মৈত্রী এক্সপ্রেস (ঢাকা ক্যান্টনমেন্ট–কলকাতা চিৎপুর), বন্ধন এক্সপ্রেস (খুলনা–কলকাতা) এবং মিতালি এক্সপ্রেস (ঢাকা–নিউ জলপাইগুড়ি)—তিনটি ট্রেনই ২০২৪ সালের মাঝামাঝি বন্ধ হয়। ১৫ অক্টোবর ২০২৬ পর্যন্ত বাংলাদেশ রেলওয়ে বা ভারতীয় রেলওয়ে কোনো আনুষ্ঠানিক পুনরায় চালুর তারিখ ঘোষণা করেনি। ভ্রমণ পরিকল্পনার আগে বাংলাদেশ রেলওয়ের অফিশিয়াল পোর্টাল (railway.gov.bd), ই-টিকিটিং সেবা (eticket.railway.gov.bd) এবং ভারতীয় রেলওয়ে পোর্টাল (indianrailways.gov.in) থেকে সর্বশেষ বিজ্ঞপ্তি দেখে নিন [১–৩]।

পদ্মা সেতু রুট প্রস্তাব ও সম্ভাব্য পরিবর্তন:
যমুনা সেতু–দর্শনা করিডোরের বদলে পদ্মা সেতু হয়ে ঢাকা–কলকাতা ট্রেন চালানোর বিষয়ে দুই দেশের রেল কর্তৃপক্ষের মধ্যে আলোচনা হয়েছে:
- **সম্ভাব্য যাত্রার সময়:** বাস্তবায়িত হলে যাত্রার সময় আগের প্রায় ৮–১০ ঘণ্টা থেকে কমে আনুমানিক ৬ ঘণ্টায় নামতে পারে।
- **ভাড়া ও সময়সূচির অবস্থা:** পদ্মা সেতু রুটের নতুন সময়সূচি বা ভাড়া হ্রাসের বিষয়টি এখনো প্রস্তাব পর্যায়ে রয়েছে—দ্বিপাক্ষিক চূড়ান্ত সিদ্ধান্ত না হওয়া পর্যন্ত এটি নিশ্চিত সময়সূচি নয় [১, ৩]।

২. স্থগিত হওয়ার আগের রেল ভাড়ার ধারণা (পরিকল্পনার রেফারেন্স)
আন্তঃসীমান্ত ট্রেন বন্ধ থাকলেও স্থলপথের খরচের ধারণার জন্য অভ্যন্তরীণ আন্তঃনগর ট্রেন এবং আন্তর্জাতিক মৈত্রী এক্সপ্রেসের ভাড়ার পার্থক্য বোঝা জরুরি [১–৩]:
- **মৈত্রী এক্সপ্রেস আন্তর্জাতিক ভাড়া (স্থগিত):** স্থগিত হওয়ার আগে ঢাকা ক্যান্টনমেন্ট–কলকাতা আন্তর্জাতিক রুটের ভাড়া মার্কিন ডলারে নির্ধারিত ছিল (ভ্রমণ কর, ভ্যাট ও বিনিময় হার সমন্বয়ের আগে এসি চেয়ারে আনুমানিক USD 20 এবং এসি সিট/কেবিনে আনুমানিক USD 30), যা নির্ধারিত রেলওয়ে কাউন্টার থেকে ইস্যু হতো [১, ৩]।
- **বাংলাদেশ রেলওয়ে অভ্যন্তরীণ আন্তঃনগর বেঞ্চমার্ক (ঢাকা–বেনাপোল রুট):** দেশের ভেতরে ঢাকা–বেনাপোল রুটের আন্তঃনগর ট্রেনে (eticket.railway.gov.bd-এ শোভন চেয়ার, স্নিগ্ধা এসি চেয়ার, এসি সিট ও এসি বার্থ) শ্রেণিভেদে পুরাতন বেঞ্চমার্ক ভাড়া ছিল আনুমানিক ৩১৯ টাকা থেকে ১,১৮১ টাকা (ভ্রমণ কর বা নতুন ট্যারিফ পরিবর্তনের আগে) [১–২]।
- **যাচাইয়ের নিয়ম:** পুরাতন বা অভ্যন্তরীণ রুটের ভাড়াকে বর্তমান আন্তর্জাতিক টিকিটের নিশ্চিত দর হিসেবে ধরবেন না; ট্রেন চালু হলে railway.gov.bd ও indianrailways.gov.in-এ নতুন ভাড়ার তালিকা দেখে নিন [১–৩]।

৩. বেনাপোল–পেট্রাপোল স্থলসীমান্ত পারাপারের ধাপে ধাপে নিয়মাবলী
আন্তঃসীমান্ত ট্রেন চালু না হওয়া পর্যন্ত যশোরের বেনাপোল স্থলবন্দর এবং পশ্চিমবঙ্গের উত্তর ২৪ পরগনার পেট্রাপোল ইন্টিগ্রেটেড চেক পোস্ট (ICP) দিয়েই ঢাকা–কলকাতা স্থলপথের যাত্রীরা যাতায়াত করেন [৯–১০]। যাত্রার আগে নিশ্চিত করুন আপনার ভারতীয় ভিসায় **Haridaspur / Benapole** স্থলবন্দর দিয়ে প্রবেশ ও প্রস্থানের অনুমতি উল্লেখ আছে [৪–৬]।

ধাপ ১: ঢাকা থেকে সড়কপথে বেনাপোল স্থলবন্দরে যান
পদ্মা সেতু এক্সপ্রেসওয়ে হয়ে ঢাকার গাবতলী, কল্যাণপুর, আরামবাগ ও মালিবাগ টার্মিনাল থেকে বেনাপোল পর্যন্ত বাসে যেতে যানজটভেদে আনুমানিক ৪.৫ থেকে ৬ ঘণ্টা সময় লাগে:
- **সমন্বিত ঢাকা–কলকাতা বাস (গ্রিনলাইন, শ্যামলি, দেশ ট্রাভেলস, সৌহার্দ্য):** অনেক অপারেটর ঢাকা–কলকাতা সমন্বিত টিকিট বিক্রি করে, যেখানে যাত্রীরা পায়ে হেঁটে বেনাপোল–পেট্রাপোল ইমিগ্রেশন শেষ করার পর অপর প্রান্তে একই কোম্পানির সংযোগকারী বাসে ওঠেন।
- **ভেঙে ভ্রমণ (Split-leg):** অনেক যাত্রী ঢাকা থেকে বেনাপোল পর্যন্ত দেশীয় বাসে (নন-এসি বা এসি কোচভেদে আনুমানিক ৫০০–১,২০০ টাকা) গিয়ে নিজস্ব ব্যবস্থাপনায় সীমান্ত পার হন এবং পেট্রাপোল বা বনগাঁ থেকে কলকাতার বাস বা লোকাল ট্রেন ধরেন।
- **সময়ের টিপস:** ঢাকা থেকে রাতের বাসে রওনা দিলে ভোরে বেনাপোল পৌঁছানো যায় এবং সকালে স্থলবন্দর খোলার সাথে সাথেই কম ভিড়ে ইমিগ্রেশন শেষ করা সহজ হয়।

ধাপ ২: বেনাপোল–পেট্রাপোল সীমান্তে ইমিগ্রেশন ও শুল্ক প্রক্রিয়া সম্পন্ন করুন
ঢাকা থেকে কলকাতা যাওয়ার সময় আপনাকে প্রথমে বাংলাদেশের বেনাপোল প্রান্তে বহির্গমন (Exit) এবং পরে ভারতের পেট্রাপোল প্রান্তে প্রবেশ (Entry) প্রক্রিয়া সম্পন্ন করতে হবে [৮–১০]:
- **১. বাংলাদেশ প্রস্থান — বেনাপোল স্থলবন্দর (যশোর):** বেনাপোল প্যাসেঞ্জার টার্মিনালে প্রবেশ করে নির্ধারিত ব্যাংক বা বন্দর কাউন্টারে সরকারি স্থলসীমান্ত ভ্রমণ কর পরিশোধ করুন (অনেক সময় বাস অপারেটর সামান্য সার্ভিস চার্জ নিয়ে এটি জমা দেয়; অফিশিয়াল রসিদ সাথে রাখুন)। এরপর বাংলাদেশ ইমিগ্রেশন পুলিশের কাউন্টারে পাসপোর্ট, বৈধ ভারতীয় ভিসা এবং প্রযোজ্য ক্ষেত্রে পেশাগত NOC বা GO দেখিয়ে প্রস্থান স্ট্যাম্প নিন [৮–৯]।
- **২. নো-ম্যানস ল্যান্ড অতিক্রম:** বাংলাদেশ ও ভারতের ইমিগ্রেশন ভবনের মাঝের আনুমানিক ২০০–৫০০ মিটার পথ লাগেজসহ হেঁটে পার হন (অনুমোদিত কুলি নিলে আগে থেকেই নির্ধারিত চার্জ কথা বলে নিন) [৯–১০]।
- **৩. ভারত প্রবেশ — পেট্রাপোল ICP (পশ্চিমবঙ্গ):** ভারতের বর্ডার সিকিউরিটি ফোর্স (BSF) চেকপয়েন্ট পেরিয়ে ভারতীয় ইমিগ্রেশন কাউন্টারে পাসপোর্ট, ভিসা ও ডিসএমবার্কেশন স্লিপ জমা দিন এবং কাস্টমস চেক শেষ করে পেট্রাপোল টার্মিনাল থেকে বের হন [১০]।
- **সীমান্তের সময়সূচি:** বেনাপোল–পেট্রাপোল যাত্রী ইমিগ্রেশন সাধারণত দিনের বেলা (স্থানীয় সময় আনুমানিক সকাল ৬:০০টা থেকে সন্ধ্যা ৬:০০টা পর্যন্ত; ছুটির দিন বা নিরাপত্তা নির্দেশনায় পরিবর্তন হতে পারে) খোলা থাকে। সকাল ৭:০০–১০:০০টার মধ্যে পার হলে লাইনে অপেক্ষা কম হয় [৯–১০]।

ধাপ ৩: পেট্রাপোল থেকে কলকাতা (অথবা ফিরতি পথে ঢাকা) যাত্রা
- **পেট্রাপোল → কলকাতা বাসে:** পেট্রাপোল টার্মিনালের বাইরে সংযোগকারী এসি বাসগুলো কলকাতার এসপ্লানেড / মার্কুইস স্ট্রিটের উদ্দেশ্যে অপেক্ষা করে (যাত্রাকাল আনুমানিক ৩–৪ ঘণ্টা; লোকাল বাস লেগ আনুমানিক INR 300–400, অথবা সমন্বিত টিকিটে মোট আনুমানিক INR 1,400–1,800 বা সমমূল্যের টাকা)।
- **পেট্রাপোল → বনগাঁ → কলকাতা শিয়ালদহ লোকাল ট্রেনে:** সাশ্রয়ী ভ্রমণকারীরা পেট্রাপোল সীমান্ত থেকে অটোতে বনগাঁ জংশন স্টেশনে গিয়ে পূর্ব রেলের লোকাল ট্রেনে কলকাতার শিয়ালদহ স্টেশনে যেতে পারেন [৩]।

৪. বাংলাদেশি পাসপোর্টে ভারতীয় ভিসা (IVAC প্রক্রিয়া ও সতর্কতা)
গুরুত্বপূর্ণ সতর্কতা — ১৫ অক্টোবর ২০২৬-এর এই পর্যালোচনায় লাইভ IVAC অ্যাপয়েন্টমেন্ট সিস্টেম সরাসরি পরিমাপ করা হয়নি: ২০২৪ সালের পর থেকে বাংলাদেশি নাগরিকদের জন্য ভারতীয় ভিসার স্লট ও ক্যাটাগরির প্রাপ্যতা বিভিন্ন সময়ে পরিবর্তিত হয়েছে। ২০২৬ সালে ঢাকা, চট্টগ্রাম, সিলেট, রাজশাহী ও খুলনার IVAC কেন্দ্রগুলোতে ভিসা কার্যক্রম পুনরায় চালুর তথ্য বিভিন্ন ট্রাভেল সোর্সে উল্লেখ থাকলেও, বর্তমান অ্যাপয়েন্টমেন্ট স্লট ও ক্যাটাগরির ক্ষেত্রে শুধুমাত্র IVAC বাংলাদেশ (ivacbd.com) এবং ঢাকায় ভারতীয় হাইকমিশনের (hcidhaka.gov.in) অফিশিয়াল বিজ্ঞপ্তিই চূড়ান্ত [৪–৭]।
- **বাংলাদেশি পাসপোর্টে ভারতীয় e-Visa নেই:** সাধারণ বাংলাদেশি পাসপোর্টধারীরা ভারতীয় e-Visa-র আওতাভুক্ত নন; অবশ্যই indianvisa-bangladesh.nic.in ও IVAC-এর মাধ্যমে পাসপোর্টে স্টিকার ভিসার আবেদন করতে হবে [৪–৬]।
- **ভিসা ফি বনাম IVAC প্রসেসিং চার্জ:** দ্বিপাক্ষিক চুক্তি অনুযায়ী বাংলাদেশি নাগরিকদের জন্য ভারত সরকারের ভিসা ফি বিনামূল্যে, তবে IVAC বাংলাদেশ নির্ধারিত ভিসা প্রসেসিং ফি আদায় করে (কেন্দ্র ও সর্বশেষ বিজ্ঞপ্তিভেদে পূর্বে প্রকাশিত হার আনুমানিক ৮০০–১,৫০০ টাকা ও ডিজিটাল পেমেন্ট চার্জ; টাকা জমা দেওয়ার আগে ivacbd.com-এ বর্তমান হার দেখে নিন) [৪–৫]।
- **চেকপোস্ট নির্বাচন:** indianvisa-bangladesh.nic.in-এ অনলাইন ফর্ম পূরণের সময় সঠিক এন্ট্রি/এক্সিট চেকপোস্ট (যেমন বেনাপোল–পেট্রাপোল স্থলপথের জন্য **Haridaspur**, এবং একপথে বিমানে যাওয়ার সম্ভাবনা থাকলে **By Air**) নির্বাচন করুন [৫–৬]।

IVAC স্টিকার ভিসা আবেদনের ধাপসমূহ:
- **ধাপ ১ — অনলাইন ফর্ম পূরণ:** indianvisa-bangladesh.nic.in পোর্টালে ২×২ ইঞ্চি সাদা ব্যাকগ্রাউন্ডের ছবিসহ অনলাইন আবেদনপত্র পূরণ করে প্রিন্ট নিন [৬]।
- **ধাপ ২ — IVAC ফি ও অ্যাপয়েন্টমেন্ট:** ivacbd.com-এ ভিসা প্রসেসিং ফি পরিশোধ করে নিকটস্থ IVAC কেন্দ্রের অ্যাপয়েন্টমেন্ট স্লট বুক করুন (অ্যাপয়েন্টমেন্ট ছাড়া ওয়াক-ইন আবেদন সাধারণত গ্রহণ করা হয় না) [৪]।
- **ধাপ ৩ — প্রয়োজনীয় কাগজপত্র:** ন্যূনতম ৬ মাসের মেয়াদ ও ২টি ফাঁকা পৃষ্ঠাসহ মূল পাসপোর্ট (সব পুরাতন পাসপোর্টসহ), NID কপি, সাম্প্রতিক ইউটিলিটি বিল (ঠিকানার প্রমাণ), ৩–৬ মাসের ব্যাংক স্টেটমেন্ট বা পাসপোর্ট ডলার এনডোর্সমেন্ট (অফিশিয়াল চেকলিস্ট অনুযায়ী ন্যূনতম USD 150; আমাদের ডুয়াল-কারেন্সি কার্ড গাইড দেখুন), পেশাগত প্রমাণপত্র (NOC, GO, ট্রেড লাইসেন্স বা স্টুডেন্ট আইডি) এবং ভ্রমণ পরিকল্পনার কপি প্রস্তুত রাখুন [৫]।
- **ধাপ ৪ — বায়োমেট্রিক ও পাসপোর্ট সংগ্রহ:** নির্ধারিত তারিখে IVAC কেন্দ্রে ফাইল ও বায়োমেট্রিক জমা দিন এবং ivacbd.com-এ পাসপোর্ট ডেলিভারির স্ট্যাটাস ট্র্যাক করুন [৪]।

৫. ৩ দিনের কলকাতা স্থলভ্রমণের আনুমানিক BDT বাজেট (পরিকল্পনার রেফারেন্স)
নিচের তালিকায় বেনাপোল–পেট্রাপোল হয়ে ৩ দিন ও ২ রাতের কলকাতা স্থলভ্রমণের আগের প্রকাশিত পরিকল্পনা বাজেট **জনপ্রতি BDT 8,000–18,000** সংরক্ষিত হয়েছে। ১৫ অক্টোবর ২০২৬-এ লাইভ বাস অপারেটর বা হোটেল চেকআউট থেকে এটি নতুন করে দর যাচাই করা হয়নি—বাসের শ্রেণি, NBR ভ্রমণ কর, রুপি/টাকা বিনিময় হার এবং হোটেলের তারিখের ওপর প্রকৃত খরচ নির্ভর করবে:
- **রাউন্ডট্রিপ সড়ক পরিবহন (ঢাকা ↔ বেনাপোল/পেট্রাপোল ↔ কলকাতা বাস):** আনুমানিক BDT 3,500–5,500 (বাজেট ভেঙে ভ্রমণ বা সাধারণ বাস) থেকে BDT 5,500–7,500 (প্রিমিয়াম এসি বিজনেস/স্লিপার কোচ)।
- **IVAC ভিসা প্রসেসিং ফি ও বেনাপোল স্থলসীমান্ত ভ্রমণ কর:** আনুমানিক BDT 1,800–2,500 একত্রে (ivacbd.com-এর বর্তমান প্রসেসিং ফি এবং NBR অর্থ আইনের সর্বশেষ স্থলসীমান্ত ভ্রমণ করের হার প্রযোজ্য) [৪, ৮]।
- **কলকাতায় থাকা (২ রাত, সাডার স্ট্রিট / এসপ্লানেড / নিউ মার্কেট এলাকা):** আনুমানিক BDT 1,500–3,000 (বাজেট গেস্টহাউস বা শেয়ার্ড রুম) থেকে BDT 4,000–6,000 (কমফোর্টেবল মিড-রেঞ্জ এসি হোটেল, জনপ্রতি শেয়ারিং)।
- **খাবার, কলকাতা মেট্রো/ট্যাক্সি যাতায়াত ও সাধারণ দর্শনীয় স্থান (৩ দিন):** আনুমানিক BDT 1,200–2,000 (বাজেট) থেকে BDT 3,500–4,500 (কমফোর্টেবল)।
- **৩ দিনের আনুমানিক মোট স্থলভ্রমণ বাজেট (জনপ্রতি):** **BDT 8,000–12,000 (বাজেট টিয়ার)** থেকে **BDT 15,000–18,000 (কমফোর্টেবল টিয়ার)**। শপিং, মেডিকেল চেকআপ, কলকাতার বাইরে দূরপাল্লার ট্রেন ভ্রমণ এবং জরুরি ফান্ড এর বাইরে।

৬. বিমানে ঢাকা–কলকাতা: কখন ফ্লাইট বেছে নেবেন
আন্তঃসীমান্ত ট্রেন বন্ধ থাকলে কিংবা দীর্ঘ সড়কযাত্রা ও সীমান্তে হাঁটার ঝামেলা এড়াতে চাইলে ঢাকা হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে কলকাতা নেতাজি সুভাষচন্দ্র বসু আন্তর্জাতিক বিমানবন্দরে (CCU) সরাসরি ফ্লাইটে সময় লাগে মাত্র ১ ঘণ্টা ১০ মিনিট। বিমান বাংলাদেশ এয়ারলাইন্স, ইউএস-বাংলা এয়ারলাইন্স ও ইন্ডিগোর মতো ক্যারিয়ারে ঐতিহাসিক বেঞ্চমার্ক অনুযায়ী একমুখী ইকোনমি ভাড়া প্রায়ই BDT 6,500–12,000 রেঞ্জ থেকে শুরু হয় (পিক সিজন ও ব্যাগেজ চার্জ ছাড়া)। প্রতিদিনের লাইভ ভাড়া ও ব্যাগেজ নিয়ম তুলনা করতে আমাদের ফ্লাইট সার্চ হাব (/flights) ব্যবহার করুন এবং ভিসায় **By Air** এন্ট্রি অনুমতি আছে কিনা নিশ্চিত করুন [৫–৬]।

৭. সচরাচর জিজ্ঞাসা
২০২৬ সালে ঢাকা–কলকাতা মৈত্রী এক্সপ্রেস কি চালু আছে?
না। মৈত্রী এক্সপ্রেস, বন্ধন এক্সপ্রেস ও মিতালি এক্সপ্রেস জুলাই ২০২৪ থেকে স্থগিত রয়েছে। ১৫ অক্টোবর ২০২৬ পর্যন্ত কোনো নিশ্চিত চালুর তারিখ ঘোষণা করা হয়নি; অফিশিয়াল বিজ্ঞপ্তির জন্য railway.gov.bd, eticket.railway.gov.bd ও indianrailways.gov.in দেখুন [১–৩]।
বাংলাদেশি পাসপোর্টধারীরা কি ভারতীয় e-Visa নিতে পারেন?
না। সাধারণ বাংলাদেশি পাসপোর্টধারীদের জন্য ভারতীয় e-Visa প্রযোজ্য নয়; indianvisa-bangladesh.nic.in-এ অনলাইন ফর্ম পূরণ করে IVAC বাংলাদেশ (ivacbd.com)-এর মাধ্যমে স্টিকার ভিসার আবেদন করতে হয় [৪–৬]।
বাংলাদেশিদের জন্য ভারতীয় ট্যুরিস্ট ভিসার খরচ কত?
দ্বিপাক্ষিক চুক্তি অনুযায়ী বাংলাদেশিদের জন্য ভারত সরকারের ভিসা ফি বিনামূল্যে, তবে IVAC বাংলাদেশে নির্ধারিত ভিসা প্রসেসিং ফি (পূর্বে প্রকাশিত হার আনুমানিক ৮০০–১,৫০০ টাকা ও পেমেন্ট চার্জ) দিতে হয়। আবেদনের আগে ivacbd.com-এ বর্তমান ফি ও স্লট যাচাই করুন [৪–৫]।
ঢাকা থেকে বেনাপোল–পেট্রাপোল সীমান্ত পারাপারের সঠিক ক্রম কোনটি?
ঢাকা থেকে কলকাতা যাওয়ার সময় প্রথমে যশোরের বেনাপোল স্থলবন্দরে বাংলাদেশের ভ্রমণ কর পরিশোধ ও বহির্গমন ইমিগ্রেশন সম্পন্ন করতে হয়, এরপর ২০০–৫০০ মিটার নো-ম্যানস ল্যান্ড হেঁটে পার হয়ে ভারতের পেট্রাপোল ICP-তে BSF, ইমিগ্রেশন ও কাস্টমস প্রক্রিয়া শেষ করতে হয় [৮–১০]।
স্থলপথে ৩ দিনের ঢাকা–কলকাতা ভ্রমণে আনুমানিক কত খরচ হয়?
বেনাপোল–পেট্রাপোল হয়ে বাসে ৩ দিন ও ২ রাতের কলকাতা ভ্রমণে রাউন্ডট্রিপ বাস, IVAC প্রসেসিং ফি, সীমান্ত কর, ২ রাত হোটেল ও খাবারসহ আনুমানিক পরিকল্পনা বাজেট জনপ্রতি BDT 8,000–12,000 (বাজেট টিয়ার) থেকে BDT 15,000–18,000 (কমফোর্টেবল এসি টিয়ার); এটি পরিকল্পনার রেফারেন্স, লাইভ কোটেশন নয়।
ঢাকা–কলকাতা স্থলপথে ভ্রমণের জন্য ভারতীয় ভিসায় কোন চেকপোস্ট থাকতে হবে?
বেনাপোল–পেট্রাপোল সীমান্ত দিয়ে যাতায়াতের জন্য ভারতীয় ভিসায় সাধারণত Haridaspur / Benapole চেকপোস্ট এনডোর্সমেন্ট থাকতে হয়। যাত্রার আগে আপনার ভিসা স্টিকারে মুদ্রিত এন্ট্রি ও এক্সিট পয়েন্ট যাচাই করে নিন [৪–৬, ৯–১০]।`,
    internalLinks: [
      { text: "ঢাকা থেকে সেরা ৬টি বাজেট পারিবারিক গন্তব্য", path: "/blog/top-budget-family-destinations-from-dhaka" },
      { text: "ঢাকা এয়ারপোর্ট প্রস্থান ইমিগ্রেশন চেকলিস্ট (NOC ও GO নিয়ম)", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "ডুয়াল-কারেন্সি কার্ড ও পাসপোর্ট ডলার এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ঢাকা থেকে আন্তর্জাতিক ফ্লাইট সার্চ ও ভাড়া তুলনা", path: "/flights" },
      { text: "বিদেশ ভ্রমণের BDT বাজেট ও খরচ ক্যালকুলেটর", path: "/costs" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "ঢাকা–কলকাতা সরাসরি ফ্লাইট ভাড়া তুলনা করুন",
      body: "আন্তঃসীমান্ত যাত্রীবাহী ট্রেন স্থগিত থাকলেও, সরাসরি ফ্লাইটে ঢাকা (DAC) থেকে কলকাতায় (CCU) প্রায় ১ ঘণ্টা ১০ মিনিটে পৌঁছানো যায় — বুকিংয়ের আগে বিভিন্ন এয়ারলাইন্সের লাইভ ভাড়া ও ব্যাগেজ নিয়ম তুলনা করুন।",
    },
  },
  };

export function getLocalizedBlogs(lang: Language): BlogPost[] {
  if (lang === "en") return BLOG_DATA;
  return BLOG_DATA.map((post) => {
    const bn = BENGALI_BLOG_OVERRIDES[post.slug];
    if (!bn) return post;
    return {
      ...post,
      title: bn.title,
      summary: bn.summary,
      category: bn.category,
      date: bn.date,
      author: bn.author,
      readTime: bn.readTime,
      content: bn.content,
      internalLinks: bn.internalLinks,
      references: bn.references || post.references,
      affiliateCTA: bn.affiliateCTA || post.affiliateCTA,
    };
  });
}

export const BENGALI_HAJJ_UMRAH_FAQS = [
  {
    question: "২০২৬ সালে বাংলাদেশি নাগরিকরা কীভাবে Umrah ভিসা করবেন এবং Nusuk অ্যাপ ব্যবহার করবেন?",
    answer:
      "বাংলাদেশি পাসপোর্টধারীরা ঢাকার অনুমোদিত ওমরাহ এজেন্সির মাধ্যমে ২–৫ কার্যদিবসে ৯০ দিনের Saudi Umrah e-Visa (সাম্প্রতিকভাবে BDT ১৫,৫০০–১৯,৫০০ ইনস্যুরেন্সসহ — বর্তমান ফি যাচাই করুন), যোগ্য ট্রানজিট ফ্লাইটে ৯৬ ঘণ্টার Saudia/Flynas Stopover Visa, অথবা বৈধ ও আগে ব্যবহৃত US/UK/Schengen ভিসা থাকলে বর্তমান শর্ত পূরণ হলে visa-on-arrival নিতে পারেন — যোগ্যতা অফিশিয়াল পোর্টালে যাচাই করুন, স্বয়ংক্রিয় ধরে নেবেন না। ভিসা নম্বর পাওয়ার পর অফিশিয়াল Nusuk অ্যাপে (nusuk.sa) রেজিস্ট্রেশন করে ওমরাহ স্লট এবং মদিনায় রিয়াজুল জান্নাতের (Rawdah Shareef) পারমিট বুক করতে হয়।",
  },
  {
    question: "বাংলাদেশ থেকে ফরজ হজ (Hajj) নিবন্ধনের সরকারি নিয়ম কী?",
    answer:
      "ওমরাহ, ট্যুরিস্ট বা ট্রানজিট ভিসা দিয়ে ফরজ হজ পালন করা সম্পূর্ণ নিষিদ্ধ। বাংলাদেশি নাগরিকদের অবশ্যই ধর্ম বিষয়ক মন্ত্রণালয়ের অফিশিয়াল পোর্টাল (hajj.gov.bd)-এর মাধ্যমে জাতীয় পরিচয়পত্র (NID), ই-পাসপোর্ট এবং Saudi Visa Bio অ্যাপে বায়োমেট্রিক সম্পন্ন করে সরকারি অথবা অনুমোদিত হজ এজেন্সির অধীনে প্রাক-নিবন্ধন ও চূড়ান্ত নিবন্ধন সম্পন্ন করতে হবে।",
  },
  {
    question: "২০২৬ সালে ঢাকা থেকে ১০ দিনের DIY Umrah করতে জনপ্রতি কত টাকা (BDT) খরচ হয়?",
    answer:
      "৪ জনের পরিবারের সাথে রুম শেয়ার করে ১০ দিনের DIY Umrah (মক্কায় ৫ রাত ও মদিনায় ৪ রাত)-এর সংরক্ষিত পরিকল্পনা অনুমান বাজেট ৩-তারকা বা শাটল হোটেলের ক্ষেত্রে জনপ্রতি BDT ১,১৬,০০০ থেকে BDT ১,৩২,০০০ — যার মধ্যে রাউন্ডট্রিপ ফ্লাইট, ওমরাহ ই-ভিসা ও যাতায়াত অন্তর্ভুক্ত। এই সীমা ১৪ অক্টোবর ২০২৬-এ যাচাই করা এবং এই হালনাগাদে পুনঃমূল্যায়ন করা হয়নি — এটি লাইভ কোটেশন নয়; একই তারিখ ও অন্তর্ভুক্তির itemized quote ছাড়া এজেন্সির সাশ্রয় অনুমান করা যাবে না।",
  },
  {
    question: "বাংলাদেশি পাসপোর্টধারীরা কি ৯৬ ঘণ্টার Saudi Stopover Transit Visa-তে ওমরাহ করতে পারবেন?",
    answer:
      "হ্যাঁ, যোগ্য ইটিনারারিতে। Saudia অথবা Flynas এয়ারলাইন্সের আন্তর্জাতিক ট্রানজিট ফ্লাইটে জেদ্দা (JED) বা মদিনায় (MED) যাত্রাবিরতি থাকলে টিকিট বুকিংয়ের সময় অনলাইনে ৯৬ ঘণ্টার Saudi Stopover Visa নেওয়া যায়, যা দিয়ে ৪ দিন সৌদি আরবে অবস্থান করে ওমরাহ ও মদিনা জিয়ারত করা সম্ভব। যোগ্যতা, ইনস্যুরেন্সের শর্ত ও ফি বুকিং চেকআউটে নির্ধারিত হয় এবং সময়ের সাথে বদলায় — এয়ারলাইন্সের বুকিং পেজে যাচাই করুন; কোনো সার্বজনীন নির্দিষ্ট দাম নেই।",
  },
  {
    question: "ঢাকা (DAC) থেকে মক্কা ও মদিনায় ওমরাহ ফ্লাইটের সেরা রুট বা কৌশল কোনটি?",
    answer:
      "সবচেয়ে সাশ্রয়ী ও আরামদায়ক কৌশল হলো Multi-City (Open-Jaw) টিকিট কাটা: যাওয়ার সময় ঢাকা (DAC) থেকে জেদ্দা (JED) নামুন যাতে সরাসরি মক্কায় গিয়ে ওমরাহ করতে পারেন, এরপর Haramain হাই-স্পিড ট্রেনে মদিনায় যান এবং ফেরার সময় সরাসরি মদিনা (MED) এয়ারপোর্ট থেকে ঢাকায় (DAC) ফিরুন। এতে মদিনা থেকে আবার জেদ্দা এয়ারপোর্টের দীর্ঘ রিটার্ন সড়ক ভ্রমণ বেঁচে যায়।",
  },
  {
    question: "বয়স্ক মা-বাবা এবং হুইলচেয়ার ব্যবহারকারীদের জন্য মক্কা ও মদিনার কোন হোটেল জোন সবচেয়ে ভালো?",
    answer:
      "মক্কায় বয়স্ক মা-বাবা বা হুইলচেয়ার ব্যবহারকারীদের জন্য সবচেয়ে জনপ্রিয় সন্ধান এলাকা হলো হারামের সবচেয়ে কাছাকাছি হোটেলের জন্য Abraj Al Bait (Clock Tower) ও Jabal Omar, এবং তুলনামূলক সমতল পথ ও পরিচিত খাবারের জন্য Ajyad Street ও Ibrahim Al Khalil রাস্তা। মদিনায় কেন্দ্রীয় Markazia North/West এলাকা মসজিদে নববী ও মহিলা গেট এলাকার কাছে। দূরত্ব, ঢাল ও শাটল ব্যবস্থা হোটেলভেদে আলাদা — বুকিংয়ের আগে নির্দিষ্ট ঠিকানা, হাঁটার রুট ও প্রবেশাধিকার হোটেলের সাথে যাচাই করুন।",
  },
  {
    question: "মক্কা, জেদ্দা ও মদিনার মধ্যে Haramain High-Speed Bullet Train-এর টিকিট কীভাবে বুক করবেন?",
    answer:
      "পাসপোর্টে এনডোর্স করা বাংলাদেশি Dual-Currency Visa/Mastercard ব্যবহার করে অফিশিয়াল Haramain High-Speed Railway ওয়েবসাইট (sar.hhr.sa) বা অ্যাপ থেকে অনলাইনে টিকিট কাটা যায়। ১৪ অক্টোবর ২০২৬-এ অপারেটরের ট্যারিফে মক্কা–মদিনা ইকোনমি বেস ভাড়া SAR 162 দেখানো হয়েছিল (মূল ভাড়া, VAT ও ফি ব্যতীত; লাইভ চেকআউট দাম তারিখ ও পূর্ণতা অনুযায়ী বদলায়)। সংযোগের সময় নির্ধারণের আগে অফিশিয়াল পোর্টালে বর্তমান সময়সূচি ও চেকআউট দাম দেখে নিন।",
  },
  {
    question: "ওমরাহ বা হজের ফ্লাইটে ওঠার আগে বায়োমেট্রিক, টিকা ও ঢাকা এয়ারপোর্টে কী কী কাগজপত্র লাগবে?",
    answer:
      "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) ত্যাগের আগে যাত্রীদের তাদের ভিসা আবেদনে যে বায়োমেট্রিক চাওয়া হয়েছে তা সম্পন্ন করতে হবে — বর্তমান সৌদি মন্ত্রণালয়ের FAQ ইলেকট্রনিকভাবে ইস্যুকৃত Umrah ভিসার বায়োমেট্রিকের জন্য বাংলাদেশকে Saudi Visa Bio অ্যাপে তালিকাভুক্ত করে; এটি প্রত্যেক ট্যুরিস্ট বা স্টপওভার ভ্রমণকারীর জন্য সার্বজনীন নিয়ম নয়। সাথে কমপক্ষে ৬ মাস মেয়াদী ই-পাসপোর্ট, প্রিন্ট করা ওমরাহ/হজ ই-ভিসা, কনফার্মড রিটার্ন বা মাল্টি-সিটি এয়ার টিকিট, মক্কা-মদিনার হোটেল ভাউচার, Meningococcal Meningitis (ACWY-135) টিকার সনদ (conjugate টাইপ = ৫ বছর; polysaccharide = ৩ বছর; ভ্রমণের অন্তত ১০ দিন আগে নিতে হবে) এবং এনডোর্সকৃত বৈদেশিক মুদ্রা (USD/SAR ক্যাশ বা সচল Dual-Currency Card) রাখতে হবে। মৌসুমি ইনফ্লুয়েঞ্জার টিকা সুপারিশ করা হয় এবং COVID-19 টিকা বাধ্যতামূলক নয় — তবে ৬৫+ বয়সী, গর্ভবতী বা রোগ প্রতিরোধ ক্ষমতা দুর্বল ব্যক্তিদের জন্য নির্বাচনমূলকভাবে পরামরিশ দেওয়া হতে পারে।",
  },
];

export function getLocalizedHajjFaqs(lang: Language) {
  return lang === "bn" ? BENGALI_HAJJ_UMRAH_FAQS : HAJJ_UMRAH_FAQS;
}

const BENGALI_FLIGHTS_OVERRIDES: Record<
  string,
  Partial<FlightRoute>
> = {
  "dhaka-kathmandu": {
    from: "Dhaka (DAC)",
    to: "Kathmandu (KTM)",
    flightDuration: "১ ঘণ্টা ২৫ মিনিট (Direct)",
    bestTimeToBook: "যাত্রার ৩–৪ সপ্তাহ আগে",
    visaRequirement: "ফ্রি SAARC Visa on Arrival (কাঠমান্ডু এয়ারপোর্টে)",
    quickAnswer:
      "ঢাকা (DAC) থেকে কাঠমান্ডু (KTM) সরাসরি ফ্লাইটে মাত্র ১ ঘণ্টা ২৫ মিনিট সময় লাগে। Biman Bangladesh Airlines এবং Himalaya Airlines প্রতিদিন এই রুটে সরাসরি ফ্লাইট পরিচালনা করে। রাউন্ডট্রিপ ভাড়া সাধারণত BDT 26,500 থেকে BDT 35,000-এর মধ্যে থাকে এবং বাংলাদেশি পাসপোর্টধারীরা কাঠমান্ডু এয়ারপোর্টে নেমে ফ্রি Visa on Arrival পান।",
  },
  "dhaka-bangkok": {
    from: "Dhaka (DAC)",
    to: "Bangkok (BKK / DMK)",
    flightDuration: "২ ঘণ্টা ৩০ মিনিট (Direct)",
    bestTimeToBook: "যাত্রার ৪–৬ সপ্তাহ আগে",
    visaRequirement: "Thailand Official e-Visa (যাত্রার আগে অনলাইনে)",
    quickAnswer:
      "ঢাকা (DAC) থেকে ব্যাংকক (BKK ও DMK) সরাসরি ফ্লাইটে মাত্র ২ ঘণ্টা ৩০ মিনিট লাগে। Biman Bangladesh, US-Bangla, Thai Airways এবং বাজেট ক্যারিয়ার Thai AirAsia ও Thai Lion Air নিয়মিত চলাচল করে। রাউন্ডট্রিপ টিকিটের দাম সাধারণত BDT 31,000 থেকে BDT 44,000-এর মধ্যে থাকে।",
  },
  "dhaka-kuala-lumpur": {
    from: "Dhaka (DAC)",
    to: "Kuala Lumpur (KUL)",
    flightDuration: "৩ ঘণ্টা ৫০ মিনিট (Direct)",
    bestTimeToBook: "যাত্রার ৪–৫ সপ্তাহ আগে",
    visaRequirement: "Malaysia Online e-Visa + ফ্রি MDAC কার্ড",
    quickAnswer:
      "ঢাকা (DAC) থেকে কুয়ালালামপুর (KUL) রুটে প্রতিদিন একাধিক সরাসরি ফ্লাইট রয়েছে (সময় ৩ ঘণ্টা ৫০ মিনিট)। AirAsia, Batik Air, Biman Bangladesh এবং US-Bangla এই রুটে ফ্লাইট পরিচালনা করে। কেবিন ব্যাগেজে বাজেট এয়ারলাইন্সে রাউন্ডট্রিপ ভাড়া BDT 34,000 থেকে শুরু হয়।",
  },
  "dhaka-singapore": {
    from: "Dhaka (DAC)",
    to: "Singapore (SIN)",
    flightDuration: "৪ ঘণ্টা ১৫ মিনিট (Direct)",
    bestTimeToBook: "যাত্রার ৫–৬ সপ্তাহ আগে",
    visaRequirement: "Authorized Agent e-Visa + ফ্রি SG Arrival Card",
    quickAnswer:
      "ঢাকা (DAC) থেকে সিঙ্গাপুর চাঙ্গি এয়ারপোর্ট (SIN) সরাসরি ফ্লাইটে ৪ ঘণ্টা ১৫ মিনিট সময় লাগে। Singapore Airlines, Biman Bangladesh এবং US-Bangla সরাসরি ফ্লাইট পরিচালনা করে। রাউন্ডট্রিপ ভাড়া সাধারণত BDT 44,000 থেকে BDT 62,000-এর মধ্যে থাকে।",
  },
  "dhaka-maldives": {
    from: "Dhaka (DAC)",
    to: "Malé, Maldives (MLE)",
    flightDuration: "৪ ঘণ্টা ১০ মিনিট (Direct) / ৬ ঘণ্টা (1-Stop)",
    bestTimeToBook: "যাত্রার ৪–৬ সপ্তাহ আগে",
    visaRequirement: "ফ্রি ৩০ দিনের Visa on Arrival + ফ্রি IMUGA ফর্ম",
    quickAnswer:
      "ঢাকা (DAC) থেকে মালদ্বীপের মালে (MLE) রুটে US-Bangla Airlines সরাসরি ফ্লাইট এবং SriLankan Airlines কলম্বো হয়ে সাশ্রয়ী কানেক্টিং ফ্লাইট পরিচালনা করে। রাউন্ডট্রিপ ভাড়া BDT 46,000 থেকে BDT 58,000-এর মধ্যে পাওয়া যায় এবং বাংলাদেশিদের জন্য ফ্রি Visa on Arrival সুবিধা রয়েছে।",
  },
  "dhaka-dubai": {
    from: "Dhaka (DAC)",
    to: "Dubai (DXB)",
    flightDuration: "৪ ঘণ্টা ৪৫ মিনিট (Direct)",
    bestTimeToBook: "যাত্রার ৫–৭ সপ্তাহ আগে",
    visaRequirement: "UAE Tourist e-Visa (৩–৫ কার্যদিবসে অনুমোদন)",
    quickAnswer:
      "ঢাকা (DAC) থেকে দুবাই (DXB) সরাসরি ফ্লাইটে ৪ ঘণ্টা ৪৫ মিনিট সময় লাগে। Emirates, flydubai, Biman Bangladesh ও US-Bangla সরাসরি ফ্লাইট পরিচালনা করে এবং Air Arabia ও SalamAir কানেক্টিং রুটে কম ভাড়ায় টিকিট দেয়। রাউন্ডট্রিপ ভাড়া সাধারণত BDT 52,000 থেকে BDT 72,000।",
  },
};

export function getLocalizedFlights(lang: Language): FlightRoute[] {
  if (lang === "en") return FLIGHTS_DATA;
  return FLIGHTS_DATA.map((f) => {
    const bn = BENGALI_FLIGHTS_OVERRIDES[f.id];
    return bn ? { ...f, ...bn } : f;
  });
}

const BENGALI_HOTELS_OVERRIDES: Record<string, Partial<HotelGuide>> = {
  "kathmandu-hotels": {
    quickAnswer:
      "বাংলাদেশি পর্যটকদের জন্য কাঠমান্ডুতে থাকার সেরা জায়গা হলো Thamel (হালাল খাবার, মানি এক্সচেঞ্জ ও শপিংয়ের কেন্দ্রবিন্দু, ভাড়া BDT 1,800–4,500/রাত) এবং শান্ত পরিবেশের জন্য Lazimpat বা Boudhanath এলাকা।",
  },
  "bangkok-hotels": {
    quickAnswer:
      "ব্যাংককে বাংলাদেশি পরিবারের জন্য সেরা এলাকা হলো Pratunam (পাইকারি শপিং ও হালাল স্ট্রিট ফুডের জন্য, BDT 3,200–7,500/রাত) এবং Sukhumvit Soi 3 / Nana (Bumrungrad Hospital ও ২৪ ঘণ্টা হালাল রেস্টুরেন্টের পাশে)।",
  },
  "kuala-lumpur-hotels": {
    quickAnswer:
      "কুয়ালালামপুরে শপিং ও হালাল খাবারের জন্য Bukit Bintang সেরা, আর পরিবারের সাথে ইনফিনিটি পুল ও রান্নাঘরসহ সার্ভিসড অ্যাপার্টমেন্টে থাকার জন্য KLCC Twin Towers এলাকা সবচেয়ে জনপ্রিয় (BDT 3,500–8,500/রাত)।",
  },
  "singapore-hotels": {
    quickAnswer:
      "সিঙ্গাপুরে সাশ্রয়ী বাজেটে থাকার জন্য Little India (Mustafa Centre ও হালাল রেস্টুরেন্টের পাশে) এবং Bugis / Arab Street (সুলতান মসজিদ ও মেট্রো স্টেশনের কাছে) বাংলাদেশি ভ্রমণকারীদের প্রথম পছন্দ।",
  },
  "maldives-hotels": {
    quickAnswer:
      "মালদ্বীপে বাজেটের মধ্যে সমুদ্রসৈকতে থাকার সেরা জায়গা হলো Maafushi Local Island (মালে থেকে ২৫ ডলারের স্পিডবোট, হোটেল BDT 6,500–11,000/রাত) এবং এয়ারপোর্ট সংলগ্ন Hulhumalé Beach।",
  },
  "dubai-hotels": {
    quickAnswer:
      "দুবাইয়ে মেট্রো স্টেশন ও সাশ্রয়ী হালাল খাবারের কাছে থাকার জন্য Deira (Al Rigga / Union Metro) এবং Bur Dubai সবচেয়ে ভালো (BDT 5,500–11,000/রাত)। আর লাক্সারি ও বীচ ভিউয়ের জন্য Downtown বা Dubai Marina সেরা।",
  },
};

export function getLocalizedHotels(lang: Language): HotelGuide[] {
  if (lang === "en") return HOTELS_DATA;
  return HOTELS_DATA.map((h) => {
    const bn = BENGALI_HOTELS_OVERRIDES[h.id];
    return bn ? { ...h, ...bn } : h;
  });
}

const BENGALI_VISA_OVERRIDES: Record<string, Partial<VisaGuide>> = {
  "nepal-visa": {
    requirementType: "Free Visa on Arrival (VOA)",
    quickAnswer:
      "বাংলাদেশি পাসপোর্টধারীরা নেপালে প্রতি ক্যালেন্ডার বছরে প্রথমবার ভ্রমণে সম্পূর্ণ বিনামূল্যে ৩০ দিনের SAARC Visa on Arrival পান। কাঠমান্ডুর Tribhuvan International Airport (KTM)-এ নেমে মাত্র ১৫ মিনিটেই এই ভিসা পাওয়া যায়—আগে থেকে ঢাকার দূতাবাসে যাওয়ার প্রয়োজন নেই।",
  },
  "thailand-visa": {
    requirementType: "Official Online e-Visa",
    costBdt:
      "সরকারি Tourist e-Visa fee-এর বর্তমান অঙ্ক official portal/Embassy schedule-এ দেখুন। Bank/payment charge আলাদা। Optional agency service fee আলাদা ও provider-ভেদে বদলায়—payment-এর আগে লিখিত itemized quote নিন।",
    processingTime:
      "আবেদনভেদে সময় ভিন্ন; live portal ও Embassy notice দেখুন—সিদ্ধান্তের সময় নিশ্চিত নয়।",
    quickAnswer:
      "বাংলাদেশি নাগরিকদের Thailand যেতে আগে official portal-এ Tourist e-Visa আবেদন করতে হয়। Dhaka Embassy-র public TR checklist (শেষ হালনাগাদ ৩০ নভেম্বর ২০২২) ৬ মাসের statement ও solvency certificateসহ জনপ্রতি BDT 60,000 / পরিবারে BDT 120,000 উল্লেখ করে; live portal-এর বর্তমান prompt ভিন্ন হতে পারে—আবেদনের আগে যাচাই করুন। সরকারি visa fee, bank/payment charge ও optional agency service fee আলাদা; current amount এবং agency-র itemized quote যাচাই না করে নির্দিষ্ট অঙ্ক ধরে নেবেন না। Approval ও processing time নিশ্চিত নয়।",
  },
  "malaysia-visa": {
    requirementType: "100% Online e-Visa + MDAC",
    quickAnswer:
      "বাংলাদেশি পর্যটকরা ঘরে বসেই মালয়েশিয়ার অফিশিয়াল পোর্টালে Malaysia Tourist e-Visa আবেদন করতে পারেন। ৪ থেকে ৭ কার্যদিবসে ভিসা অনুমোদিত হয় এবং ফ্লাইটের ৩ দিন আগে অনলাইনে ফ্রি Malaysia Digital Arrival Card (MDAC) পূরণ করতে হয়।",
  },
  "singapore-visa": {
    requirementType: "Authorized Agent e-Visa",
    quickAnswer:
      "সিঙ্গাপুরের ট্যুরিস্ট ভিসার জন্য ঢাকার সিঙ্গাপুর কনস্যুলেট অনুমোদিত ভিসা এজেন্টের (AVA) মাধ্যমে আবেদন করতে হয়। প্রয়োজন হয় ৬ মাসের Bank Statement, NOC/Trade License এবং Form V39A (LOI)। ভিসা ফি ও সার্ভিস চার্জসহ প্রায় BDT 4,500–5,500 খরচ হয়।",
  },
  "maldives-visa": {
    requirementType: "Free 30-Day Visa on Arrival",
    quickAnswer:
      "বাংলাদেশি পর্যটকদের জন্য মালদ্বীপে ৩০ দিনের ফ্রি Visa on Arrival সুবিধা রয়েছে। কোনো ভিসা ফি লাগে না—শুধুমাত্র ফ্লাইটের ৯৬ ঘণ্টা আগে অনলাইনে ফ্রি IMUGA Traveller Declaration ফর্ম পূরণ করতে হয় এবং হাতে কনফার্মড Return Ticket ও Hotel Booking থাকতে হয়।",
  },
  "dubai-visa": {
    requirementType: "UAE Tourist e-Visa",
    quickAnswer:
      "বাংলাদেশি নাগরিকদের দুবাই ও সংযুক্ত আরব আমিরাত ভ্রমণের জন্য প্রি-অ্যারাইভাল UAE Tourist e-Visa (৩০ বা ৬০ দিনের) প্রয়োজন হয়। Emirates/flydubai অথবা অনুমোদিত ট্রাভেল এজেন্সির মাধ্যমে পাসপোর্ট স্ক্যান ও ছবি দিয়ে আবেদন করলে ৩ থেকে ৫ কার্যদিবসে ভিসা পাওয়া যায়।",
  },
};

export function getLocalizedVisas(lang: Language): VisaGuide[] {
  if (lang === "en") return VISA_DATA;
  return VISA_DATA.map((v) => {
    const bn = BENGALI_VISA_OVERRIDES[v.id];
    return bn ? { ...v, ...bn } : v;
  });
}

const BENGALI_COSTS_OVERRIDES: Record<string, Partial<TripCostData>> = {
  "nepal-costs": {
    quickAnswer:
      "ঢাকা থেকে ৫ দিনের নেপাল (কাঠমান্ডু ও পোখারা) ভ্রমণে একজন বাংলাদেশি পর্যটকের রাউন্ডট্রিপ ফ্লাইট, হোটেল, খাবার ও গাড়ি ভাড়াসহ মোট BDT 40,000 থেকে BDT 54,000 খরচ হয় (ফ্রি ভিসা)।",
  },
  "thailand-costs": {
    quickAnswer:
      "ঢাকা থেকে ৫ দিনের থাইল্যান্ড (ব্যাংকক ও পাতায়া) ভ্রমণে ফ্লাইট, ৩-তারকা হোটেল, হালাল খাবার ও সাইটসিয়িংসহ জনপ্রতি আনুমানিক BDT 68,000 থেকে BDT 88,000 খরচ হতে পারে। এই broad estimate-এ visa-related charge আলাদা করে itemized নয়; all-in বাজেট ধরার আগে current government e-Visa fee, bank/payment charge ও optional agency service fee যাচাই করুন।",
  },
  "malaysia-costs": {
    quickAnswer:
      "ঢাকা থেকে ৫ দিনের মালয়েশিয়া (কুয়ালালামপুর ও গেন্টিং হাইল্যান্ডস) সফরে ফ্লাইট, e-Visa, হোটেল ও খাবারসহ জনপ্রতি BDT 65,000 থেকে BDT 82,000 বাজেট প্রয়োজন।",
  },
  "singapore-costs": {
    quickAnswer:
      "ঢাকা থেকে ৪–৫ দিনের সিঙ্গাপুর ভ্রমণে ফ্লাইট, ভিসা, হোটেল, মেট্রো কার্ড ও Sentosa/Gardens by the Bay টিকিটসহ জনপ্রতি BDT 92,000 থেকে BDT 1,18,000 খরচ হয়।",
  },
  "maldives-costs": {
    quickAnswer:
      "মাফুশি লোকাল আইল্যান্ডে (Maafushi) থেকে ৪ দিনের মালদ্বীপ ট্যুর করতে রাউন্ডট্রিপ ফ্লাইট, স্পিডবোট ট্রান্সফার, হোটেল ও স্নরকেলিং ট্যুরসহ জনপ্রতি মাত্র BDT 72,500 থেকে BDT 88,000 খরচ হয়।",
  },
  "dubai-costs": {
    quickAnswer:
      "ঢাকা থেকে ৫ দিনের দুবাই ভ্রমণে রাউন্ডট্রিপ ফ্লাইট, UAE Tourist e-Visa, Deira এলাকার হোটেল, মেট্রো ও Desert Safari-সহ জনপ্রতি BDT 1,05,000 থেকে BDT 1,35,000 খরচ হয়।",
  },
};

/**
 * Destination guides (/destinations/*) in Bengali.
 *
 * These are the pages a Bengali reader reaches first when planning a trip, so
 * they are translated at parity — itinerary, key facts and FAQs included — not
 * summarised. The copy lives in src/data/bengaliDestinations.ts; this merge
 * keeps the same { ...english, ...bengali } shape as every other locale helper.
 *
 * While a guide is still untranslated its Bengali page does NOT exist:
 * /destinations is listed in DEFERRED_BN_GROUPS (src/utils/localeRoutes.ts)
 * until all six are written, because a bn-BD page with an English body is
 * worse than no Bengali page at all.
 */
export function getLocalizedDestinations(lang: Language): DestinationGuide[] {
  if (lang === "en") return DESTINATIONS_DATA;
  return DESTINATIONS_DATA.map((d) => {
    const bn = BENGALI_DESTINATION_OVERRIDES[d.id];
    return bn ? { ...d, ...bn } : d;
  });
}

export function getLocalizedCosts(lang: Language): TripCostData[] {
  if (lang === "en") return TRIP_COSTS_DATA;
  return TRIP_COSTS_DATA.map((c) => {
    const bn = BENGALI_COSTS_OVERRIDES[c.id];
    return bn ? { ...c, ...bn } : c;
  });
}

export function getFeaturedGrowthTopics(lang: Language) {
  if (lang === "bn") {
    return [
      {
        id: "trend-umrah-hajj",
        category: "Hajj & Umrah · ৮ মিনিট পড়া",
        searchQuery: "“DIY Umrah cost & Nusuk guide Bangladesh”",
        title: "বাংলাদেশ থেকে Umrah ও Hajj প্রস্তুতি গাইড (2026 অফিশিয়াল নিয়ম ও BDT খরচ)",
        excerpt:
          "সরকারি Hajj নিবন্ধন (hajj.gov.bd) বনাম নিজে নিজে DIY Umrah প্ল্যানিং, ৩টি বৈধ Umrah Visa পদ্ধতি, Nusuk Rawdah Permit, Haramain Bullet Train ভাড়া ও ১০ দিনের BDT বাজেট।",
        slug: "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
      },
      {
        id: "trend-endorsement",
        category: "Banking & FX · ৭ মিনিট পড়া",
        searchQuery: "“How to get dual-currency card endorsement”",
        title: "Dual-Currency Card ও Passport Dollar Endorsement করার নিয়ম (2026 গাইড)",
        excerpt:
          "পাসপোর্টে বার্ষিক $18,000 USD Travel Quota (FE Circular 33) এনডোর্সমেন্ট করার নিয়ম, EBL, City Bank ও BRAC কার্ডের সুবিধা, 3D-Secure E-Commerce চালু এবং ৫% DCC চার্জ বাঁচানোর উপায়।",
        slug: "dual-currency-card-endorsement-bangladesh",
      },
      {
        id: "trend-family-budget",
        category: "Family & Budget · ৭ মিনিট পড়া",
        searchQuery: "“Top budget-friendly family destinations from Dhaka”",
        title: "ঢাকা থেকে পরিবারের সাথে ঘোরার সেরা ৬টি বাজেট ফ্রেন্ডলি দেশ (৫ দিনের BDT খরচসহ)",
        excerpt:
          "Nepal (৪২ হাজার টাকা থেকে), Malaysia (৬৮ হাজার টাকা থেকে), Thailand, Maldives Local Island, Singapore ও Dubai-এর মোট ফ্যামিলি খরচ, ভিসা ও হালাল খাবারের তুলনা।",
        slug: "top-budget-family-destinations-from-dhaka",
      },
      {
        id: "trend-dac-immigration",
        category: "Outbound Rules · ৬ মিনিট পড়া",
        searchQuery: "“Dhaka airport immigration documents checklist”",
        title: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট: NOC, GO ও প্রথমবার ভ্রমণের নিয়ম",
        excerpt:
          "হযরত শাহজালাল বিমানবন্দরে মাত্র ২ মিনিটে ইমিগ্রেশন পার হওয়ার জন্য চাকরিজীবী (NOC), সরকারি কর্মকর্তা (GO), ব্যবসায়ী (Trade License) ও নতুন পাসপোর্টের ডকুমেন্ট ফোল্ডার।",
        slug: "dhaka-airport-outbound-immigration-checklist-noc-go",
      },
    ];
  }

  return [
    {
      id: "trend-umrah-hajj",
      category: "Religious Travel · 8 min",
      searchQuery: "“DIY Umrah cost & Nusuk guide Bangladesh”",
      title: "Umrah & Hajj Preparation Guide from Bangladesh (2026 Official Rules & BDT Cost)",
      excerpt:
        "Official Hajj registration (hajj.gov.bd) vs. DIY Umrah planning, 3 verified Umrah visa pathways, Nusuk Rawdah permits, Haramain bullet train fares, and 10-day BDT budgets.",
      slug: "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
    },
    {
      id: "trend-endorsement",
      category: "Banking & FX · 7 min",
      searchQuery: "“How to get dual-currency card endorsement”",
      title: "How to Get Dual-Currency Card Endorsement (2026 Passport Dollar Quota Guide)",
      excerpt:
        "Step-by-step guide to the $18,000 annual passport endorsement quota (Bangladesh Bank FE Circular No. 33), RFCD vs. Travel Quota cards (EBL, City Bank, BRAC), 3D-Secure activation, and avoiding 5% DCC fees.",
      slug: "dual-currency-card-endorsement-bangladesh",
    },
    {
      id: "trend-family-budget",
      category: "Family & Budget · 7 min",
      searchQuery: "“Top budget-friendly family destinations from Dhaka”",
      title: "Top 6 Budget-Friendly Family Destinations from Dhaka (Ranked by 5-Day BDT Cost)",
      excerpt:
        "Compare Nepal (from ৳42k), Malaysia (from ৳68k), Thailand, Maldives Local Islands, Singapore, and Dubai by total family BDT cost, visa speed, and Halal dining.",
      slug: "top-budget-family-destinations-from-dhaka",
    },
    {
      id: "trend-dac-immigration",
      category: "Outbound Rules · 6 min",
      searchQuery: "“Dhaka airport immigration documents checklist”",
      title: "Dhaka Airport (DAC) Outbound Immigration Checklist: NOC, GO & First-Time Rules",
      excerpt:
        "Exact document folder checklist to clear Hazrat Shahjalal Airport emigration in under 2 minutes for job holders (NOC), govt staff (GO), business owners, and fresh passports.",
      slug: "dhaka-airport-outbound-immigration-checklist-noc-go",
    },
  ];
}


// ---------------------------------------------------------------------------
// Bengali route metadata (title / meta description / H1)
//
// Keyed by the ENGLISH base path ("/flights/dhaka-bangkok"), never by the
// /bn-prefixed one, so a route has exactly one Bengali counterpart record.
// Both consumers read the same map, so the prerendered HTML and the client-side
// <title> can never drift:
//   - scripts/prerender.ts (build time, Node)
//   - src/App.tsx (after this module is lazily imported on /bn routes)
//
// This lives here rather than in src/utils/seoCopy.ts on purpose: seoCopy.ts is
// part of the entry bundle and this module carries ~390 KB of Bengali content
// that English visitors must never download.
// ---------------------------------------------------------------------------
export interface BengaliSeoCopy {
  title: string;
  description: string;
  h1: string;
}

/** Place names get a Bengali form; airport codes stay Latin (that is how they are booked). */
const BN_PLACES: Record<string, string> = {
  Kathmandu: "কাঠমান্ডু",
  Bangkok: "ব্যাংকক",
  "Kuala Lumpur": "কুয়ালালামপুর",
  Dubai: "দুবাই",
  Singapore: "সিঙ্গাপুর",
  "Malé & Maafushi": "মালে ও মাফুশি",
  Nepal: "নেপাল",
  Thailand: "থাইল্যান্ড",
  Malaysia: "মালয়েশিয়া",
  UAE: "সংযুক্ত আরব আমিরাত",
  Maldives: "মালদ্বীপ",
};

function bnPlace(raw: string): string {
  const base = raw.split(" (")[0].trim();
  return BN_PLACES[base] || base;
}

function bnClamp(text: string, max: number): string {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max);
  // Prefer ending on a complete sentence. A meta description that stops
  // mid-clause ("…কার্ড ছাড়াই") reads as broken in the SERP, so only fall back
  // to a word-boundary ellipsis when no sentence ends late enough in the cut.
  const sentenceEnd = Math.max(
    cut.lastIndexOf("।"),
    cut.lastIndexOf("."),
    cut.lastIndexOf("?"),
    cut.lastIndexOf("!")
  );
  if (sentenceEnd > max * 0.5) return cut.slice(0, sentenceEnd + 1).trim();
  // No sentence ends inside the window (common: a Bengali blog summary can run
  // 200-550 chars). Close the excerpt at the last clause boundary so it still
  // ends as a well-formed sentence instead of a dangling "…".
  const clauseEnd = Math.max(
    cut.lastIndexOf(","),
    cut.lastIndexOf("—"),
    cut.lastIndexOf(";"),
    cut.lastIndexOf(":")
  );
  if (clauseEnd > max * 0.5) return `${cut.slice(0, clauseEnd).trimEnd()}।`;
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > max * 0.6 ? cut.slice(0, boundary) : cut).trimEnd()}…`;
}

/** Mirrors src/utils/seoCopy.ts compactTitle(): clean topic + brand suffix, ≤60 chars. */
function bnTitle(text: string): string {
  const suffix = " | URAL";
  const clean = String(text || "").replace(/\s*\|\s*URAL\s*$/i, "").trim();
  return `${bnClamp(clean, 60 - suffix.length)}${suffix}`;
}

/**
 * Landing FAQs for the Bengali /destinations hub.
 *
 * The English hub answers four questions from LANDING_DESTINATION_FAQS. These
 * are written for the Bengali reader rather than translated, and they carry the
 * same facts the guides do - including that Thailand, Dubai and Singapore need
 * an advance visa while Nepal and the Maldives do not.
 */
export const BENGALI_DESTINATION_HUB_FAQS: FAQ[] = [
  {
    question: "প্রথমবার বিদেশ ভ্রমণে বাংলাদেশিদের জন্য কোন গন্তব্যগুলো সবচেয়ে ভালো?",
    answer:
      "প্রথমবারের জন্য সবচেয়ে সহজ গন্তব্য নেপাল — আগে থেকে ভিসার দরকার নেই, ফ্লাইট মাত্র দেড় ঘণ্টার, আর দৈনিক খরচও অঞ্চলের মধ্যে সবচেয়ে কম। এরপর সাধারণত মালদ্বীপ (ফ্রি ভিসা অন অ্যারাইভাল, ৪ ঘণ্টার ফ্লাইট) আর মালয়েশিয়ার কথা আসে। থাইল্যান্ড, দুবাই ও সিঙ্গাপুরে যেতে আগে থেকেই ভিসা নিতে হয়, তাই সেগুলো দ্বিতীয় বা তৃতীয় ভ্রমণের জন্য বেশি উপযুক্ত।",
  },
  {
    question: "ঢাকা থেকে সাধারণ বিদেশ ভ্রমণ কত দিনের হওয়া উচিত?",
    answer:
      "৪ থেকে ৫ দিনেই একটি শহর আর তার আশেপাশের মূল জায়গাগুলো আরামে ঘোরা যায় — এই গাইডগুলোর বেশিরভাগ রুট এই দৈর্ঘ্যের। নেপাল বা মালদ্বীপের মতো জায়গায় ৫ থেকে ৭ দিন নিলে গতি অনেক আরামদায়ক হয়, আর একসাথে একাধিক শহর ধরলে ৭ থেকে ১০ দিন লাগে। ঘুরতে যাওয়া আর ফেরার দিনগুলো হিসাব থেকে বাদ দিয়ে ভাবুন, কারণ ওই দিনগুলোতে ঘোরাঘুরির সময় প্রায় থাকে না।",
  },
  {
    question: "বাংলাদেশি পর্যটকদের কি গাইডেড গ্রুপ ট্যুর দরকার, নাকি নিজে নিজে ঘোরা যায়?",
    answer:
      "এই গাইডগুলোর প্রায় সব রুটই নিজে নিজে ঘোরার কথা ধরে লেখা — হোটেল, ফ্লাইট আর স্থানীয় যাতায়াত আলাদা করে বুক করলে খরচ সাধারণত কম পড়ে। তবে ভিসার আবেদন, প্রথমবারের যাত্রা, বা বাবা-মা ও শিশু নিয়ে যাওয়ার সময় অনেকেই এজেন্সির সহায়তা নেন, কারণ তখন কাগজপত্রের কাজ সহজ হয়ে যায়। দুটোরই সুবিধা আছে; শুধু দেখে নিন প্যাকেজে বিমানভাড়া, ভিসা ফি আর টিপস আসলে কী কী ধরা আছে।",
  },
  {
    question: "বাংলাদেশ থেকে কম খরচে বিদেশ ভ্রমণের জন্য কোন মাসগুলো ভালো?",
    answer:
      "স্কুলের ছুটি, ঈদ আর ডিসেম্বরের শেষের ভিড় এড়িয়ে যেতে পারলে বিমানভাড়া ও হোটেলের দাম অনেকটাই কমে। সাধারণভাবে ফেব্রুয়ারি–মার্চ আর সেপ্টেম্বর–অক্টোবর আন্তর্জাতিক ভ্রমণের জন্য ভালো সময় — আবহাওয়া সহনীয় থাকে আর দামও নিয়ন্ত্রণে থাকে। তবে গন্তব্য অনুযায়ী এটি বদলায়: নেপালে অক্টোবর–নভেম্বর, মালদ্বীপে নভেম্বর–এপ্রিল, আর থাইল্যান্ডে নভেম্বর–ফেব্রুয়ারি সবচেয়ে ভালো।",
  },
];

const BENGALI_ROUTE_SEO: Record<string, BengaliSeoCopy> = {};

// Flights — Bengali title from the localized route name, Bengali description
// from the hand-written quick answer.
for (const flight of getLocalizedFlights("bn")) {
  const bn = BENGALI_FLIGHTS_OVERRIDES[flight.id];
  if (!bn) continue;
  const h1 = `ঢাকা → ${bnPlace(bn.to || flight.to)} বিমান ভাড়া, সময় ও ভিসা গাইড (২০২৬)`;
  BENGALI_ROUTE_SEO[`/flights/${flight.id}`] = {
    title: bnTitle(`${bnPlace(bn.to || flight.to)} ফ্লাইট গাইড: ভাড়া, সময় ও ভিসা`),
    description: bnClamp(bn.quickAnswer || flight.quickAnswer, 160),
    h1,
  };
}

// Hotels — Bengali city name in the title, Bengali quick answer as description.
for (const hotel of getLocalizedHotels("bn")) {
  if (!BENGALI_HOTELS_OVERRIDES[hotel.id]) continue;
  const city = bnPlace(hotel.city);
  BENGALI_ROUTE_SEO[`/hotels/${hotel.id}`] = {
    title: bnTitle(`${city} হোটেল গাইড: এলাকা, হালাল খাবার ও BDT ভাড়া`),
    description: bnClamp(hotel.quickAnswer, 160),
    h1: `${city}-এ কোথায় থাকবেন: এলাকা, হোটেল দাম ও হালাল খাবারের গাইড (২০২৬)`,
  };
}

// Visas — requirements/cost/processing stay in the body; the quick answer is
// already a Bengali summary of the whole process.
for (const visa of getLocalizedVisas("bn")) {
  if (!BENGALI_VISA_OVERRIDES[visa.id]) continue;
  const country = bnPlace(visa.country);
  BENGALI_ROUTE_SEO[`/visa/${visa.id}`] = {
    title: bnTitle(`${country} ভিসা গাইড: বাংলাদেশিদের জন্য নিয়ম ও খরচ`),
    description: bnClamp(visa.quickAnswer, 160),
    h1: `${country} ভিসা (বাংলাদেশি পাসপোর্ট): নিয়ম, ডকুমেন্ট ও খরচ (২০২৬)`,
  };
}

// Trip costs — the most searched Bengali phrasing ("খরচ কত").
for (const cost of getLocalizedCosts("bn")) {
  if (!BENGALI_COSTS_OVERRIDES[cost.id]) continue;
  const country = bnPlace(cost.country);
  BENGALI_ROUTE_SEO[`/costs/${cost.id}`] = {
    title: bnTitle(`${country} ভ্রমণ খরচ: ঢাকা থেকে BDT বাজেট`),
    description: bnClamp(cost.quickAnswer, 160),
    h1: `ঢাকা থেকে ${country} ভ্রমণে কত টাকা লাগে? সম্পূর্ণ BDT বাজেট (২০২৬)`,
  };
}

// Destination guides — the hand-written Bengali title becomes the H1 (and the
// <title> after clamping), and the hand-written quick answer becomes the meta
// description. Only guides that actually have Bengali content get a route, so a
// future seventh destination cannot half-exist in Bengali by accident.
for (const destination of getLocalizedDestinations("bn")) {
  const bn = BENGALI_DESTINATION_OVERRIDES[destination.id];
  if (!bn) continue;
  const h1 = bn.title || destination.title;
  BENGALI_ROUTE_SEO[`/destinations/${destination.id}`] = {
    title: bnTitle(h1),
    description: bnClamp(destination.quickAnswer, 160),
    h1,
  };
}

// Blog guides — the overrides already carry a native Bengali title and summary.
for (const post of getLocalizedBlogs("bn")) {
  const bn = BENGALI_BLOG_OVERRIDES[post.slug];
  if (!bn) continue;
  BENGALI_ROUTE_SEO[`/blog/${post.slug}`] = {
    title: bnTitle(bn.title),
    description: bnClamp(bn.summary, 160),
    h1: bn.title,
  };
}

/**
 * Returns the Bengali title/description/H1 for an English base path, or null
 * when no Bengali counterpart exists yet (currently: /destinations/*, which
 * have no Bengali data — see the coverage note in scripts/prerender.ts).
 */
export function getBengaliRouteSeo(englishPath: string): BengaliSeoCopy | null {
  const pathOnly = (String(englishPath).split(/[?#]/, 1)[0] || "/").replace(
    /^\/bn(?=\/|$)/,
    ""
  );
  const normalized =
    `/${pathOnly.split("/").filter(Boolean).join("/")}` || "/";
  return BENGALI_ROUTE_SEO[normalized] ?? null;
}

/** True when a Bengali counterpart page can be generated for this English path. */
export function hasBengaliRoute(englishPath: string): boolean {
  return getBengaliRouteSeo(englishPath) !== null;
}
