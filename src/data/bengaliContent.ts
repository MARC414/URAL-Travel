import { BlogPost, DestinationGuide, FAQ, FlightRoute, HotelGuide, VisaGuide, TripCostData } from "../types";
import { BLOG_DATA, DESTINATIONS_DATA, FLIGHTS_DATA, HOTELS_DATA, VISA_DATA, TRIP_COSTS_DATA } from "../constants";
import { BENGALI_DESTINATION_OVERRIDES } from "./bengaliDestinations";
import { TIQETS_TOP_ATTRACTIONS, TIQETS_CITY_STACKS } from "./tiqetsAttractionsData";
import { Language } from "../translations";
import { HAJJ_UMRAH_FAQS } from "../hooks/useSeoMeta";
import { SCHEDULED_BENGALI_BLOG_OVERRIDES } from "./scheduledBengaliBlogs.generated";

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
  ...SCHEDULED_BENGALI_BLOG_OVERRIDES,
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    title: "বাংলাদেশ থেকে DIY ওমরাহ: ভিসার পথ, Nusuk ধাপ ও বাজেট যাচাই",
    summary: "বাংলাদেশ থেকে শর্তসাপেক্ষ ওমরাহ ভিসার পথ, প্রকাশিত ১৪৪৮ হিজরি তারিখ এবং আবেদন থেকে পারমিটের সঠিক ক্রম। Package Visa-র শর্ত, সূত্রের সীমা ও পুরোনো ১০ দিনের বাজেট আছে—লাইভ কোট নয়। অফিশিয়াল নির্দেশনা ১৯ অক্টোবর ২০২৬-এ দেখা; ব্যক্তিগত অ্যাপ পরীক্ষা করা হয়নি।",
    category: "Hajj & Umrah",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১২ মিনিট পড়া",
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
        name: "Visit Saudi — current visa requirements and eligibility checker",
        nameBn: "Visit Saudi — বর্তমান ভিসার শর্ত ও যোগ্যতা যাচাই",
        url: "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations",
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
        name: "Saudi Ministry of Tourism — Tourist Visa Regulations, Articles 5–6 (revision date unconfirmed)",
        nameBn: "সৌদি পর্যটন মন্ত্রণালয় — Tourist Visa Regulations, Article 5–6 (revision date অনিশ্চিত)",
        url: "https://cdn.mt.gov.sa/mtportal/mt-fe-production/content/policies-regulations/documents/tourism-regulations/Tourist-Visa-Regulations-En-V012.pdf",
      },
      {
        name: "SPA — Ministry foreign-visa and permanent-residence announcement, 12 June 2023",
        nameBn: "SPA — বিদেশি ভিসা ও permanent residence নিয়ে মন্ত্রণালয়ের ঘোষণা, ১২ জুন ২০২৩",
        url: "https://www.spa.gov.sa/w1919582",
      },
      {
        name: "SPA — GCC-resident eVisa without specific professions, 2 May 2023",
        nameBn: "SPA — নির্দিষ্ট পেশার শর্ত ছাড়া GCC-resident eVisa, ২ মে ২০২৩",
        url: "https://www.spa.gov.sa/w1895923",
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
    content: `এই গাইড কাদের জন্য: ঢাকা থেকে ওমরাহে যেতে চান এমন বাংলাদেশি পাসপোর্টধারী, যাঁরা যোগ্য ভিসার পথ, টাকা দেওয়ার আগে করণীয় এবং আবেদন, ভিসা ও পারমিটের সঠিক ক্রম বুঝতে চান।

সংক্ষিপ্ত উত্তর
১৯ অক্টোবর ২০২৬-এ যাচাই অনুযায়ী তিনটি শর্তসাপেক্ষ ভিসা-শ্রেণি বিবেচনা করুন: সরাসরি Nusuk বা অনুমোদিত বাইরের সেবাদাতার Standard Umrah Visa; যোগ্য airline stopover; অথবা যোগ্য tourist-visa route। DIY মানে সব ভিসা আলাদা কেনা যায় বা অনুমোদন নিশ্চিত—এমন নয় [১–৪, ৬–১০]। আগে যোগ্যতা ও মৌসুম দেখুন, আবেদনে চাইলে তখন বায়োমেট্রিক দিন, এরপর ইস্যু হওয়া ভিসা মিলিয়ে ভিজিটর নিবন্ধন ও আলাদা পারমিট বুক করুন [৪–৫, ১৫–১৬]।

এটি প্রকাশিত অফিশিয়াল নির্দেশনার যাচাই; সম্পন্ন ভিসা আবেদন বা যাত্রীর লগইন করা অ্যাপের পরীক্ষা নয়। নিচের জনপ্রতি BDT 1,16,000–1,32,000 হলো ১৪ অক্টোবর ২০২৬-এর আগের ১০ দিন ও পরিবারের চারজনের রুম-শেয়ারের হিসাব; নতুন করে দাম যাচাই হয়নি। নিজের বর্তমান খরচের জন্য ওমরাহ হাবের কোট-ইনপুট worksheet ব্যবহার করুন।

১. DIY ওমরাহ ও ফরজ হজ কি একই প্রক্রিয়া?
না। Umrah, tourist বা stopover visa হজের পারমিট নয়। বাংলাদেশের হজ নিবন্ধন, প্যাকেজ ও সৌদি হজ পারমিট আলাদা প্রক্রিয়ার বিষয়; আলাদা হজ নিবন্ধন গাইড এবং বাংলাদেশের অফিশিয়াল পোর্টাল দেখুন [১১]।

ওমরাহ গাইডে কপি করা হজের শেষ তারিখ ধরে পরিকল্পনা করবেন না। আলাদা হজ পর্যালোচনায় পোর্টালের ব্যানার ও তারিখযুক্ত বিজ্ঞপ্তির সেপ্টেম্বরের সময়সীমায় অমিল নথিভুক্ত আছে; এখানে তার সমাধান করা হয়নি। রাখা SPA বিজ্ঞপ্তিটি ১৪৪৭ হিজরি/২০২৬-এর হজ বিধিনিষেধের, সব ১৪৪৮ হিজরি/২০২৭ নিয়মের প্রমাণ নয় [১২]। যাত্রার আগে নিজের মৌসুমের বর্তমান সৌদি বিধিনিষেধ দেখুন।

২. ভিসার তিনটি শ্রেণির কোনটি আপনার জন্য প্রযোজ্য?
পথ ১: Standard Saudi Umrah Visa — সরাসরি Nusuk অথবা বাইরের সেবাদাতা
মন্ত্রণালয়ের ২০ আগস্ট ২০২৫-এর ঘোষণায় Nusuk Umrah দিয়ে বিদেশ থেকে সরাসরি আবেদন এবং স্বীকৃত এজেন্টের কথা আছে। ১৯ অক্টোবর ২০২৬-এ আবার খোলা nationality ও residence তালিকায় Bangladesh আছে। নিবন্ধন মানেই অনুমোদন বা শুধু ভিসার checkout পাওয়ার প্রমাণ নয় [১–২]।

শুধু উদ্বোধনী ঘোষণা নয়, বর্তমান অফার পড়ুন। Nusuk-এর শর্তে individual package একাধিক সেবার সমন্বয়; লক্ষ্য দেশ ও সেবা বদলাতে পারে। বাইরের এজেন্টের ক্ষেত্রে মন্ত্রণালয়ের FAQ বলে, আবাসন ও পরিবহন ছাড়া Umrah visa ইস্যু করা যায় না [৩–৪]। টাকা দেওয়ার আগে অফিশিয়াল মাধ্যমে সেবাদাতা যাচাই করে সুনির্দিষ্ট সেবা, সরবরাহকারী, মোট খরচ, পেমেন্টের ধাপ এবং বাতিল/ফেরতের শর্ত লিখিতভাবে নিন। ভিসার টাকা ফেরতযোগ্য বা ফেরত সঙ্গে সঙ্গে হবে ধরে নেবেন না।

পথ ২: যোগ্য airline stopover — সর্বোচ্চ ৯৬ ঘণ্টা
Stopover হলো পরবর্তী গন্তব্যে যাওয়ার পথে ছোট বিরতি, ১০ দিনের ওমরাহের পথ নয়। যাচাই করা Saudia নির্দেশনায় ফ্লাইট বুকিংয়ের মধ্যেই ভিসা আবেদন করতে হয়; অন্তত ছয় মাস মেয়াদের পাসপোর্ট, পরবর্তী গন্তব্যের নিশ্চিত টিকিট এবং প্রযোজ্য হলে সেই দেশের ভিসা বা বসবাসের অনুমতি লাগে। চূড়ান্ত প্রবেশ passport control-এর সিদ্ধান্তের অধীন [৬–৭]।

কেনার আগে নিজের airline-এর প্রকৃত checkout পড়ুন। Saudia বলে, visa, service, medical ও insurance-এর খরচ MOFA নিয়মে হিসাব হয়; Visit Saudi-র প্রচারিত line-item উদাহরণ আপনার নিশ্চিত মোট প্রদেয় খরচ নয়। ফ্রি হোটেল বা নিশ্চিত processing time ধরে পরিকল্পনা করবেন না। অন্য carrier হলে তার নিজস্ব বর্তমান itinerary ও আবেদন-শর্ত যাচাই করুন। ছোট এই সফরের বিস্তারিত আলাদা stopover গাইডে আছে [৬–৭]।

পথ ৩: Package Visa-সহ যোগ্য tourist-visa route
১৯ অক্টোবর ২০২৬-এ আবার খোলা সাধারণ nationality-only eVisa তালিকায় Bangladesh নেই। Visit Saudi আলাদাভাবে অনুমোদিত পর্যটন সেবাদাতার Package Visa-তে বাংলাদেশি পাসপোর্টধারীদের নাম বলে। এটি tourist শ্রেণির উপ-পথ, চতুর্থ শ্রেণি বা বাধাহীন শুধু ভিসা কেনার সুযোগ নয় [৮–৯]।

যাচাই করা Package Visa FAQ অনুযায়ী নিশ্চিত যাওয়া-আসার ফ্লাইট এবং মন্ত্রণালয়ের লাইসেন্সপ্রাপ্ত অন্তত চার তারকার হোটেলে নিশ্চিত আবাসন লাগে। প্রকাশিত package minimum জনপ্রতি প্রাপ্তবয়স্কের প্রথম দুই দিন মিলিয়ে SAR 4,000, এরপর প্রতিটি পরবর্তী দিনের জন্য SAR 1,000। এগুলো তারিখযুক্ত প্রকাশিত শর্ত, আপনার পরিবারের কোট বা BDT রূপান্তর নয়। টাকা দেওয়ার আগে বর্তমান অফার, মোট, অন্তর্ভুক্ত সেবা ও ফেরতের শর্ত নিশ্চিত করুন; পুরোনো বাজেটের সঙ্গে একই সেবার হিসাব ধরে তুলনা করবেন না [৮]।

প্রকাশিত বিদেশি ভিসা ও residence-এর শর্ত আসলে কী বলে?
Ministry of Tourism-এর ইংরেজি Tourist Visa Regulations-এর Article 6(2) এবং ১২ জুন ২০২৩-এ SPA-তে প্রকাশিত মন্ত্রণালয়ের ঘোষণা standard nationality list-এর বাইরে থাকা ব্যক্তিদের জন্য ব্যতিক্রম বর্ণনা করে। ১৯ অক্টোবর ২০২৬-এ আবার দেখা সূত্রগুলো নিচের document-এর পার্থক্য করে; পাওয়া PDF থেকে সর্বশেষ revision date নিশ্চিত হয়নি [১৯–২০]:
- US, UK বা Schengen visa: Article 6(2)(b)-তে বৈধ tourist বা business visa বলা আছে, যা দিয়ে অন্তত একবার ভিসা প্রদানকারী দেশে প্রবেশ করা হয়েছে। কখনো ব্যবহার করা হয়নি এমন ভিসা এই শর্তের বর্ণনার সঙ্গে মেলে না। Tourist/business category-তে student বা work visa-ও চলবে ধরে নেবেন না [১৯–২০]।
- US, UK বা EU residence: Article 6(2)(c)-তে permanent residence বলা আছে। সব temporary residence permit-কে স্থায়ী বসবাসের অনুমতি ভাববেন না। জুন ২০২৩-এর ঘোষণায় আগাম eVisa এবং visa-on-arrival—দুই ব্যবস্থার কথাই আছে; এগুলো আলাদা আবেদনপদ্ধতি, আপনার নামে ইতিমধ্যে ইস্যু হওয়া ভিসা নয় [১৯–২০]।
- সঙ্গে যাওয়া পরিবার: regulation-এ যোগ্য visa বা permanent-residence holder-এর সঙ্গে আসা first-degree relatives-কে অন্তর্ভুক্ত করা হয়েছে। প্রত্যেক যাত্রীর নিজস্ব আবেদন ও সঙ্গে ভ্রমণের শর্ত নিশ্চিত করুন; এটি সবার জন্য একটিমাত্র family visa নয় [১৯]।
- GCC residence: এটি আলাদা category; GCC citizenship বা GCC tourist visa নয়। পাওয়া PDF-তে residence visa-র অন্তত তিন মাস মেয়াদ ও পেশার শর্ত আছে, কিন্তু ২ মে ২০২৩-এর SPA প্রতিবেদনে নির্দিষ্ট পেশার শর্ত ছাড়া GCC-resident eVisa-র কথা আছে। PDF-এর পেশার কথাকে যাচাইকৃত বর্তমান নিষেধাজ্ঞা হিসেবে প্রয়োগ করবেন না; শুধু GCC residence দিয়েই visa on arrival মিলবে ধরবেন না। অফিশিয়াল checker-এ বর্তমান route ও residence-validity requirement নিশ্চিত করুন [১০, ১৯, ২১]।

যাত্রীর যাচাই (visaEligibility): এই পথে টাকা দেওয়ার আগে নিজের সুনির্দিষ্ট বাংলাদেশি passport, visa type, validity, আগে ব্যবহার বা permanent-residence category দিয়ে অফিশিয়াল eligibility checker ও KSA Visa দেখুন। যে airline ফ্লাইটটি চালাবে তার সঙ্গে boarding-এর document মিলিয়ে নিন—আগের প্রবেশের প্রমাণ এবং airline/arrival-port শর্তসহ। বর্তমান carrier restriction এবং শুধু digital entry evidence গ্রহণযোগ্য কি না এখানে নিশ্চিত হয়নি। প্রকাশিত শর্ত ব্যক্তিগত অনুমোদন নয়; কোনো আবেদন বা boarding test করা হয়নি। যোগ্যতা ধরে non-refundable ভ্রমণ কিনবেন না; URAL/chat-এ passport scan, visa number বা login detail পাঠাবেন না। [১০, ১৯–২১]

Tourist route দিয়ে ওমরাহ করলেও visa terms, permit ও মৌসুমের বিধিনিষেধ প্রযোজ্য; এটি হজের অনুমতি দেয় না [৫, ৯, ১২, ১৫–১৬, ১৯]।

৩. আপনার সফরে কোন মৌসুম ও প্রবেশের সময়সীমা প্রযোজ্য?
মন্ত্রণালয়ের প্রকাশিত ১৪৪৮ হিজরি ওমরাহ calendar ১৯ অক্টোবর ২০২৬-এ আবার দেখা হয়েছে। এতে ওমরাহ ভিসা ইস্যুর শেষ তারিখ ৯ মার্চ ২০২৭, ওমরাহ যাত্রীর প্রবেশের শেষ তারিখ ২৩ মার্চ ২০২৭ এবং চূড়ান্ত প্রস্থানের তারিখ ৭ এপ্রিল ২০২৭। এগুলো ওই ওমরাহ মৌসুমের জন্য; হজ নিবন্ধনের বিকল্প বা সব tourist visa-র সার্বজনীন মেয়াদ নয় [৫]।

ভ্রমণের তারিখ বাছার আগে পরবর্তী মন্ত্রণালয় বিজ্ঞপ্তি আছে কি না দেখুন এবং নিজের visa validity, entry count ও permitted stay পড়ুন। মৌসুমের সাধারণ শেষ তারিখ নিজের ভিসার আগের expiry বাড়ায় না। ওমরাহ সারা বছর বিধিনিষেধহীন—বলবেন না; route বা মৌসুমের অমিল না মিটিয়ে non-refundable বুকিং করবেন না [৩, ৫]।

৪. টাকা দেওয়ার আগে, আবেদনের সময় ও ভিসা ইস্যুর পরে কী করবেন?
নিচের ক্রম সিদ্ধান্তের checklist, অনুমোদনের প্রতিশ্রুতি নয়। Package route-এ আবেদনের সময়ই কিছু ভ্রমণসেবা লাগতে পারে; সব ফ্লাইট ভিসার পরে কেনা যাবে না ধরে প্রকৃত পূর্বশর্ত ও বাতিলের শর্ত জেনে নিন [৩, ৭–৮]। অনলাইনে পেমেন্ট করলে আগে ব্যাংকে international e-commerce সুবিধা ও বর্তমান limit দেখুন; dual-currency-card গাইডে বাংলাদেশের প্রস্তুতি আছে।

ধাপ ১: যোগ্যতা, মৌসুম ও প্রযোজ্য স্বাস্থ্য নির্দেশনা নিশ্চিত করুন।
- নিজের প্রকৃত passport, residence ও visa category ব্যবহার করুন। মন্ত্রণালয়ের calendar দেখুন এবং নিজের origin ও পরিস্থিতির জন্য বর্তমান মৌসুমের MOH নির্দেশনা নিন। পুরোনো PDF-কে বর্তমান স্বাস্থ্য নির্দেশনার বিকল্প করবেন না [৫, ৮–১০, ১৩–১৪]।

ধাপ ২: টাকা দেওয়ার আগে সেবাদাতা ও প্রয়োজনীয় বুকিংয়ের খরচ যাচাই করুন।
- প্রকৃত package/application-এর পূর্বশর্ত, অন্তর্ভুক্ত সেবা, মোট ও বাতিলের শর্ত লিখিতভাবে নিন। নির্দিষ্ট তারিখের ফ্লাইট, baggage ও transit document তুলনা করুন। হোটেলের ঠিকানা, room occupancy, প্রবেশের পথ ও shuttle-এর শর্ত সরাসরি property-র সঙ্গে নিশ্চিত করুন। কোনো এলাকার নাম বা estimate দিয়ে এগুলো নিশ্চিত হয় না [১–৪, ৭–৮]।

ধাপ ৩: বেছে নেওয়া অফিশিয়াল মাধ্যমে আবেদন ও চাওয়া বায়োমেট্রিক সম্পন্ন করুন।
- আবেদনপ্রক্রিয়া অনুসরণ করে সেই আবেদনে চাইলে Saudi Visa Bio ব্যবহার করুন। মন্ত্রণালয়ের FAQ ইলেকট্রনিক Umrah visa-র biometrics-এর জন্য Bangladesh বলে; এটি সব tourist বা stopover যাত্রীর ভিসা ইস্যুর পরের সার্বজনীন কাজ নয়। পৃথক প্রক্রিয়া ও গোপনীয়তার সতর্কতার জন্য Nusuk/biometrics গাইড দেখুন [৪]।

ধাপ ৪: Nusuk ভিজিটর নিবন্ধনের আগে ইস্যু হওয়া ভিসা মিলিয়ে নিন।
- যাত্রী, পাসপোর্টের তথ্য, validity, entry count ও permitted stay সফরের সঙ্গে মিলিয়ে দেখুন। মন্ত্রণালয়ের FAQ বলে, বৈধ ভিসা থাকলে বিদেশ থেকে ভিজিটর নিবন্ধন করা যায়। নিজের প্রকৃত অবস্থার উপযুক্ত visitor route নিন; package-platform account পারমিট অ্যাকাউন্ট বা অনুমোদনের সমান নয় [২–৪]।

ধাপ ৫: প্রযোজ্য পৃথক ওমরাহ ও Rawdah পারমিটের ব্যবস্থা করুন।
- অফিশিয়াল সেবা ও শুধু খালি অ্যাপয়েন্টমেন্ট ব্যবহার করুন। ওমরাহ পারমিট Rawdah অ্যাপয়েন্টমেন্ট নয়। নিজের বুকিংয়ের বর্তমান confirmation, entry-code ও reporting নির্দেশনা অনুসরণ করুন; বিশেষায়িত Nusuk গাইডে তারিখযুক্ত প্রকাশিত Rawdah ধাপ আছে। ভিসা বা অ্যাকাউন্ট কোনোটিই স্লট নিশ্চিত করে না [১৫–১৬]।

ধাপ ৬: যাত্রার আগে বুকিং ও নিজের নথিতে প্রবেশ যাচাই করুন।
- ফ্লাইট, transit ও baggage, hotel/transport confirmation এবং provider support contact দেখুন। নিরাপদ offline কপি backup হিসেবে রাখুন, তবে যে ফোন/নেটওয়ার্ক ব্যবহার করবেন তাতেই ইস্যু হওয়া পারমিট খুলে দেখুন। সংরক্ষিত ছবি প্রবেশ নিশ্চিত করে না। credentials, biometrics বা ব্যবহারযোগ্য permit QR code URAL বা অননুমোদিত সহায়তাকারীকে দেবেন না [৩, ১৫–১৬]।

৫. ফ্লাইট, হোটেল ও মক্কা–মদিনা যাতায়াত কীভাবে পরিকল্পনা করবেন?
Dhaka–Jeddah যাওয়া ও Madinah–Dhaka ফেরার itinerary পিছিয়ে আসা কমাতে পারে, তবে একই তারিখ, baggage, connection ও change terms তুলনা করে বাছুন; এই গাইডে সাশ্রয় প্রমাণের matched fare basket নেই। Flight-strategy গাইড checklist, live fare quote নয়। হোটেলের ঠিকানা, পরিবার যে gate ব্যবহার করবে সেখানকার পথ, room-sharing, accessibility ও shuttle-এর বিবরণ লিখিতভাবে নিন। বিস্তারিত room, access ও transport check-এর জন্য Hotel/rail গাইড দেখুন; সেটি কোনো নির্দিষ্ট property-র সেবার প্রমাণ নয়।

১৯ অক্টোবর ২০২৬-এ আবার দেখা HHR tariff-এ Makkah–Madinah Economy base fare SAR 162 এবং King Abdulaziz International Airport (KAIA)–Makkah SAR 65, VAT ও fee-এর আগে। Operator বলে, তারিখ, ট্রেনের আসন-প্রাপ্যতা ও অন্যান্য কারণে প্রকৃত দাম বদলায়। এই tariff থেকে বানানো BDT trip cost নয়, চূড়ান্ত checkout দেখুন [১৭]।

যাচাই করা HHR baggage পেজে সর্বোচ্চ ২৫ কেজি ও ৬৫ × ৫৫ × ৩৫ সেন্টিমিটারের একটি বড় ব্যাগ, সঙ্গে একটি hand item অনুমোদিত। নিজের ব্যাগ মাপুন, বর্তমান ticket/operator terms দেখুন এবং station transfer নিজের transport quote-এ রাখুন। Airline baggage allowance একই ব্যাগ ট্রেনে নেওয়ার অনুমতির প্রমাণ নয় [১৮]।

৬. স্বাস্থ্য নির্দেশনা ও পারমিটে আর কী ব্যক্তিগত যাচাই বাকি?
MOH index ও সংযুক্ত Umrah PDF ১৯ অক্টোবর ২০২৬-এ আবার খোলা হয়েছে। PDF-এর প্রথম পৃষ্ঠায় স্পষ্টভাবে ১৪৪৭ হিজরি (২০২৬) লেখা। এটি আপনার ১৪৪৮ হিজরি সফরের শর্ত প্রতিষ্ঠা করে না। যাত্রার আগে MOH ও নিজের অফিশিয়াল আবেদন/সেবাদাতা থেকে প্রযোজ্য বর্তমান মৌসুম ও origin-এর নির্দেশনা নিন; ব্যক্তিগত টিকা, ওষুধ বা শারীরিক সক্ষমতার প্রশ্নে যোগ্য চিকিৎসকের পরামর্শ নিন। নতুন নথি যাচাই না হওয়া মানে কোনো স্বাস্থ্যশর্ত নেই—এমন নয় [১৩–১৪]।

Visa approval, Nusuk account, Umrah permit ও Rawdah appointment আলাদা রাখুন। আপনার লগইন করা অ্যাকাউন্ট, ব্যক্তিগত যোগ্যতা, biometric capture, network বা gate admission পরীক্ষা করা হয়নি। Nusuk গাইডের সংশ্লিষ্ট ধাপের সতর্কতা অনুসরণ করুন; সমস্যা হলে বর্তমান অফিশিয়াল সহায়তা নিন। ভুয়া আবেদন বা অনুশীলনের জন্য স্লট নেবেন না [৩–৪, ১৫–১৬]।

৭. নিজের BDT বাজেট কীভাবে তৈরি করবেন?
একমাত্র টেবিলটি ১৪ অক্টোবর ২০২৬-এর আগের planning reference রাখে। ১৯ অক্টোবর ২০২৬-এ নতুন দাম যাচাই করা হয়নি; পুরোনো component amount-ও মিলিয়ে দেখা live booking basket ছিল না। একে পুরোনো প্রেক্ষাপট ভাবুন—আজকের অফার, নিশ্চিত মোট বা DIY সস্তা হওয়ার প্রমাণ নয়।

[[UMRAH_BUDGET_TABLE]]

বর্তমান হিসাবের জন্য /umrah-এর কোট-ইনপুট worksheet খুলুন। নির্দিষ্ট তারিখের কোট থেকে পুরো দলের BDT মোট লিখুন: flight, visa/insurance/services, দুই শহরের আলাদা accommodation, transport, meals, extras ও contingency। সত্যিই অন্তর্ভুক্ত বা প্রযোজ্য নয় হলেই কোনো খাতে শূন্য দিন। Package-এ hotel বা transport থাকলে আবার যোগ করবেন না। Worksheet বাজারের দাম এনে দেয় না।

একই তারিখ, সময়কাল, চারজনের sharing, flight baggage, visa, nights, meals, transfers ও cancellation terms-এর matched itemized agency quote নেই। তুলনার আগে একই ভিত্তিতে দুই হিসাব নিন। কোনো route সবসময় সস্তা নয়; আলাদা visa/package minimum লুকিয়ে সাশ্রয়ের দাবি করবেন না।

৮. ঢাকা ছাড়ার আগে কী মিলিয়ে নেবেন?
- প্রযোজ্য visa/season ও health নির্দেশনা আবার খুলুন, পরবর্তী বিজ্ঞপ্তি দেখুন।
- প্রত্যেক যাত্রীর ইস্যু হওয়া নথি itinerary ও অনুমোদিত তারিখের সঙ্গে মিলিয়ে নিন।
- প্রকৃত provider-এর সঙ্গে room occupancy/access, transport, baggage ও transit document নিশ্চিত করুন।
- Nusuk account access, issued permit, confirmation deadline এবং ব্যবহারযোগ্য phone/network দেখুন।
- receipt, লিখিত service/refund terms, নিরাপদ document backup ও official support contact কাছে রাখুন।
- যে কাজ করছেন তার সংযুক্ত specialist guide দেখুন; website build সফল হওয়া আপনার booking যাচাই করে না।

৯. সচরাচর জিজ্ঞাসা
বাংলাদেশ থেকে সরাসরি Nusuk-এ Umrah visa আবেদন করা যায়?
মন্ত্রণালয় সরাসরি আবেদনের কথা বলে এবং ১৯ অক্টোবর ২০২৬-এ দেখা signup তালিকায় Bangladesh আছে। নিজের ক্ষেত্রে বর্তমান service/package availability দেখুন; নিবন্ধন ভিসা অনুমোদন বা শুধু ভিসার checkout নিশ্চিত করে না [১–৩]।
বাইরের Umrah agent কি accommodation ও transport ছাড়া visa দেয়?
মন্ত্রণালয়ের FAQ বলে, বাইরের agent আবাসন ও পরিবহন ছাড়া Umrah visa ইস্যু করতে পারে না। সেবা, মোট ও বাতিলের শর্ত লিখিতভাবে নিন [৪]।
Tourist বা stopover visa দিয়ে ফরজ হজ করা যায়?
না। এগুলো হজ পারমিট নয়। বাংলাদেশের পৃথক নিবন্ধন ও বর্তমান সৌদি হজ নির্দেশনা অনুসরণ করুন; আগের ১৪৪৭ হিজরি নিয়ম স্বয়ংক্রিয়ভাবে ১৪৪৮ হিজরির শর্ত হয় না [১১–১২]।
১০ দিনের DIY Umrah figure কি বর্তমান booking quote?
না। এটি রাখা ১৪ অক্টোবর ২০২৬-এর ১০ দিন/চারজনের sharing-এর reference; ১৯ অক্টোবর নতুন দাম যাচাই হয়নি। নিজের হিসাবে তারিখযুক্ত matched quote ও hub worksheet নিন; পুরোনো range agency saving প্রমাণ করে না।
Umrah ও Rawdah permit কোথায় বুক করব?
প্রতিটি কাজের অফিশিয়াল Ministry/Nusuk service ব্যবহার করুন। এগুলো আলাদা অ্যাপয়েন্টমেন্ট; live availability ও বর্তমান booking নির্দেশনা প্রযোজ্য। Account বা initial reservation-কে নিশ্চিত প্রবেশ না ধরে confirmation ও entry-code access যাচাই করুন [১৫–১৬]।`,
    internalLinks: [
      { text: "Nusuk নিবন্ধন, Visa Bio ও Rawdah যাচাই", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Saudi stopover: আলাদা ৯৬ ঘণ্টার সফর", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "হোটেলে প্রবেশ ও Haramain রেল পরিকল্পনা", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "ঢাকা–জেদ্দা/মদিনা ফ্লাইট পরিকল্পনার চেকলিস্ট", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "বাংলাদেশের পৃথক হজ নিবন্ধন ও প্যাকেজ গাইড", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
      { text: "Makkah ও Madinah হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Dual-Currency Card ও Passport Endorsement গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport (DAC) Immigration ডকুমেন্ট চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "DIY Umrah Intelligence Portal ও BDT Calculator", path: "/umrah" },
      { text: "রমজান ওমরাহের তারিখ ও ইতিকাফ নিবন্ধন গাইড", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "মানচিত্র ও মেসেজের জন্য ঐচ্ছিক ডেটা প্ল্যান যাচাই করুন",
      body: "eSIM মানচিত্র ও মেসেজের জন্য ঐচ্ছিক, Nusuk পারমিটের শর্ত নয়। ফোনের সামঞ্জস্য, provider coverage, activation, validity ও মোট দাম দেখুন; network access বা appointment নিশ্চিত নয়।",
    },
  },

  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    title: "Makkah ও Madinah hotel বাছাই: access check ও Haramain train (২০২৬)",
    summary:
      "১৯ অক্টোবর ২০২৬-এ দেখা HHR fare, baggage ও station service এবং hotel-owned উদাহরণ। নির্দিষ্ট room, mosque route, shuttle ও ticket condition নিশ্চিত করে book করুন; area-wide accessibility, live room rate বা guaranteed transfer দাবি নয়।",
    category: "Hajj & Umrah",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১০ মিনিট পড়া",
    content: `কার জন্য: Makkah ও Madinah-তে accommodation বাছছেন এবং নিজের luggage, mobility need ও connection-এর সঙ্গে Haramain train মেলে কি না দেখছেন এমন বাংলাদেশি পরিবার। এটি তারিখযুক্ত operator evidence-সহ booking checklist; hotel inspection, rate quote বা tested accessible journey নয়।

দ্রুত উত্তর
১৯ অক্টোবর ২০২৬-এ দেখা সূত্র অনুযায়ী নির্দিষ্ট hotel, room ও যে mosque entrance ব্যবহার করবেন সেখানকার route বাছুন—শুধু এলাকার নাম বা সরলরেখার দূরত্ব নয়। HHR জনপ্রতি একটি বড় bag সর্বোচ্চ ২৫ কেজি ও 65 x 55 x 35 cm, সঙ্গে একটি hand item প্রকাশ করে। Basic Economy fare-এ KAIA–Makkah SAR 65 ও Makkah–Madinah SAR 162 আছে, VAT ও fee বাদে; আসল ticket price বদলায়। টাকা দেওয়ার আগে hotel access, transfer এবং নিজের ticket-এর change/refund rule নিশ্চিত করুন [১–৩, ৫–৬]।

১. Makkah-র hotel area কীভাবে তুলনা করবেন?
Jabal Omar, Ibrahim Al Khalil, Ajyad, Mahbas Al Jin ও Kudai—এই নামগুলো search সাজাতে ব্যবহার করুন; price, সমতল route বা নির্ভরযোগ্য shuttle-এর প্রমাণ হিসেবে নয়। এই review-তে property-specific evidence দিয়ে কোনো পুরো এলাকাকে wheelchair-এর জন্য best বলা বা সব hotel-কে walkable/shuttle-dependent ভাগ করা হয়নি।

প্রতিটি candidate-এর আসল accommodation entrance থেকে Masjid al-Haram-এর যে entrance ব্যবহার করবেন তা তুলনা করুন। Advertised distance কী পর্যন্ত—map point, boundary, entrance না পুরো pedestrian route—জিজ্ঞেস করুন। Mosque view বা station-এর কাছে hotel মানেই আপনার পরিবারের আসল হাঁটার পথ নিশ্চিত নয়।

Supplier-এর একটি কার্যকর উদাহরণ—recommendation নয়—Hilton-এর নিজস্ব Makkah/Madinah page। সেখানে Jabal Omar property আছে এবং নির্দিষ্ট Hilton Hotel & Convention Jabal Omar Makkah-তে free shuttle প্রচার করা হয়। এটি একটি property-র দাবি, সব Jabal Omar hotel-এর নয়; আজকের frequency, boarding point, wheelchair access বা পরিবারের seat প্রমাণ করে না। সরাসরি property থেকে বর্তমান terms নিন [৫]।

শুধু nightly headline নয়: exact date/night, adult/child ও বয়স, permitted occupancy, bed configuration, extra bed নিশ্চিত কি না, meal, tax, check-in/out, cancellation ও total payment currency তুলনা করুন। এই review-তে nightly BDT band বা room availability যাচাই হয়নি। পুরোনো estimate থেকে saving না বানিয়ে Umrah hub worksheet-এ নিজের whole-party quote দিন।

২. Madinah hotel বা accessible room বাছলে কী আলাদা দেখবেন?
Madinah-তে intended activity ও entrance ধরে বাছুন; hotel advertisement থেকে স্থির women's gate number নয়। সাধারণ mosque visit ও booked Rawdah appointment আলাদা কাজ; বর্তমান on-site direction ও নিজের permit instruction অনুসরণ করুন। Nusuk guide-এ আলাদা appointment check আছে।

Station access আর mosque access-ও আলাদা। Hilton-এর নিজস্ব page DoubleTree by Hilton Madinah Gate-কে Madinah Gate Mall ও high-speed train station-এর সঙ্গে connected বলে। Rail-linked option বুঝতে এটি কাজে লাগে; Prophet's Mosque-এ ছোট হাঁটার পথ বা আপনার তারিখে available mosque shuttle প্রমাণ করে না [৫]। শুধু hotel name নয়, পুরো transfer plan দিয়ে station-linked stay ও mosque-oriented stay তুলনা করুন।

Accessible room-এর room-level confirmation দরকার। Hilton accessibility help বলে feature hotel ও room অনুযায়ী বদলায়; roll-in shower ও accessible bath/shower configuration আলাদা room type। Chain label বা accessible lobby দিয়ে booked bathroom বা outdoor route আপনার wheelchair-এর উপযোগী প্রমাণ হয় না [৬]। Exact room type, doorway clearance, bed/bathroom layout, lift access এবং room, hotel exit, vehicle ও intended entrance-এর মধ্যে step আছে কি না জিজ্ঞেস করুন। হাঁটা সম্ভব না হলে confirmed transport alternative রাখুন; হাঁটাকে নিরাপদ fallback ভাববেন না।

যাত্রীর যাচাই (hotelAccess): Non-refundable hotel payment-এর আগে exact property entrance, room/occupancy ও bed confirmation, intended entrance পর্যন্ত পুরো pedestrian route, step/slope এবং shuttle-এর operating time, fare, pickup/drop-off ও accessible boarding arrangement লিখিতভাবে নিন। Closure এবং নিজের prayer/travel time জিজ্ঞেস করুন। এখানে route, room, shuttle বা wheelchair journey test হয়নি; supplier marketing description ব্যক্তিগত accessibility clearance নয়। URAL/chat-এ passport scan বা private booking credential পাঠাবেন না। [৫–৬]

৩. HHR-এর station, baggage ও ticket page আসলে কী নিশ্চিত করে?
HHR station-services page Makkah ও Madinah station থেকে Al-Haram shuttle bus, taxi, luggage trolley এবং station-এর মধ্যে চলাচলের wheelchair বলে। আপনার journey-র verified timetable, hotel stop, fare বা availability দেয় না। Station shuttle, hotel shuttle ও airport transfer-কে একই assumed free service ভাববেন না [১]।

Baggage জনপ্রতি দেখবেন। HHR একটি বড় bag সর্বোচ্চ ২৫ কেজি ও 65 x 55 x 35 cm, সঙ্গে backpack, laptop bag বা nursery bag-এর মতো একটি extra hand item অনুমতি দেয়। Weight ও dimension দুটোই লাগে; train access-এর আগে security check হয়। Fare page বলে excess baggage allowed নয় [২–৩]। Airline allowance দিয়ে rail allowance বদলায় না।

চার passenger-এর চারটি compliant bag থাকলেই road transfer দরকার—এমন নয়। Dhaka থেকে আসা সব suitcase বড় ধরে না নিয়ে প্রতিটি মাপুন ও ওজন করুন। Bag না মিললে প্রকৃত allowance-এর মধ্যে repack করুন অথবা booking-এর আগে আলাদা বৈধ transport, price, handling ও collection নিশ্চিত করুন। Train-এ courier বা paid excess-baggage option আছে ধরে নেবেন না [২–৩]।

যাত্রীর যাচাই (railBaggage): Train ticket কেনার আগে প্রতিটি traveller-এর আসল bag মেপে ওজন করুন এবং HHR-এর বর্তমান allowance-এর সঙ্গে hand item গুনে মিলিয়ে নিন। Mobility equipment, assistance ও অস্পষ্ট item operator-কে জিজ্ঞেস করুন। Noncompliant bag-এর পুরো journey নিশ্চিত করুন; পৌঁছে excess-baggage exception কেনা যাবে ভাববেন না। এই review-তে আপনার bag দেখা বা acceptance test হয়নি। [১–৪]

প্রকাশিত tariff দিয়ে budget কীভাবে করবেন?
Operator-এর sar.hhr.sa fare page ১৯ অক্টোবর ২০২৬-এ আবার দেখে KAIA–Makkah basic Economy SAR 65 এবং Makkah–Madinah SAR 162 পাওয়া গেছে, VAT ও fee বাদে। Page বলে date, occupancy ও অন্য কারণে আসল price বদলায়। এগুলো tariff example, নিজের ticket total, discount entitlement বা price guarantee নয়। এখানে কোনো BDT অঙ্ক নেই: assumed exchange rate নয়, আসল ticket charge ও bank/payment cost ব্যবহার করুন [২]।

সঠিক station বাছুন: fare table-এ KAIA ও Jeddah আলাদা entry। Flight terminal থেকে নির্বাচিত station-এর প্রকৃত route, train departure ও onward hotel transfer নিশ্চিত করুন। Booked train-এর duration পড়ুন; immigration, baggage, transfer, screening ও disruption-এর সময় রাখুন। এই review-তে fixed train time, road comparison বা airport-connection buffer যাচাই হয়নি [১–৪]।

Ticket ও boarding rule-এ কী বাড়তি সতর্কতা দরকার?
HHR fare page departure-এর ৬০ মিনিট থেকে ১০ মিনিট আগে boarding বলে। এটি প্রকাশিত boarding window; departure-এর মাত্র দশ মিনিট আগে station-এ পৌঁছানোর অনুমতি নয়। Travel tips সঠিক ticket ও identification নিয়ে আগে আসতে বলে [২, ৪]।

নিজের fare ও sales-channel condition পড়ুন। Fare page station-office ও vending-machine ticket change/refund হয় না বলে, কিন্তু station-services page ticket desk-এ cancellation/refund/update function বলে। এগুলো দিয়ে নিজের ticket refundable প্রমাণ হয় না। পাওয়া fare page-এ একাধিক fee table-এর class label extraction-এ যথেষ্ট পরিষ্কার ছিল না, তাই Economy-তে free-change promise দেওয়া যায় না। আগের guide-এর class-specific percentage-এর ওপর ভরসা করবেন না; নির্বাচিত ticket-এর rule HHR থেকে নিন [১–২]।

Child, infant ও assistance discount হলো eligibility category, automatic family saving নয়। প্রতিটি শিশুর বয়স, own/shared seat ও প্রতিটি traveller-এর accepted identification booking-এ কী প্রভাব ফেলে জিজ্ঞেস করুন। এই review-তে family fare calculation বা বাংলাদেশি disability document গ্রহণযোগ্যতা যাচাই হয়নি [২, ৪]।

যাত্রীর যাচাই (railTicket): Payment-এর আগে selected station, date, passenger/seat category, final total, boarding instruction এবং ওই sales channel-এর exact change, cancellation ও no-show rule সংরক্ষণ করুন। Desk description, tariff table বা checkout না মিললে সবচেয়ে উদার refund ধরে না নিয়ে HHR-কে মেটাতে বলুন। Station-to-hotel transport ও assistance আলাদাভাবে নিশ্চিত করুন। এখানে ticket purchase, refund বা connection test হয়নি; URAL/chat-এ payment detail, booking code বা ব্যবহারযোগ্য ticket barcode দেবেন না। [১–৪]

৪. Hotel ও train একসঙ্গে কীভাবে book করবেন?
এটি planning sequence, tested checkout নয়; visa ও season eligibility না মিটিয়ে non-refundable service কেনার পরামর্শও নয়। Required package arrangement আলাদা হতে পারে; main DIY guide সেই সিদ্ধান্তের জায়গা।

ধাপ ১: Route, date ও traveller নিশ্চিত করুন।
- প্রযোজ্য visa/season requirement, arrival/departure station, flight terminal, party age ও mobility need দেখুন। কাছাকাছি নামের দুটি hotel-কে একই property ভাববেন না।

ধাপ ২: Exact room ও access route নিশ্চিত করুন।
- Room/bed/occupancy, tax, meal, cancellation ও check-in/out term লিখিতভাবে নিন। আসল entrance, intended mosque route ও shuttle বা accessible transport arrangement নিশ্চিত করুন [৫–৬]।

ধাপ ৩: প্রত্যেক passenger-এর baggage ও assistance need দেখুন।
- HHR-এর size, weight ও hand-item allowance প্রতিটি bag-এ মিলিয়ে নিন। টাকা দেওয়ার আগে noncompliant luggage ও mobility-equipment arrangement operator-এর সঙ্গে মিটিয়ে নিন [১–৪]।

ধাপ ৪: আসল rail ticket ও transfer total তুলনা করুন।
- সঠিক station, train ও passenger category বাছুন। Final fare, boarding ও sales-channel change/refund rule পড়ুন; বানানো BDT conversion ছাড়া আলাদা station/hotel transfer যোগ করুন [১–৪]।

ধাপ ৫: বুঝে নেওয়া terms-এ payment করে confirmation দেখুন।
- Official supplier-এর মাধ্যমে traveller name ও booking detail দেখুন। Receipt ও আসল hotel/ticket condition রাখুন; supplier নিশ্চিত না করলে payment দিয়ে special-access request confirmed হয় না।

ধাপ ৬: প্রতিটি travel day-র আগে service আবার নিশ্চিত করুন।
- Train notice, hotel access/shuttle arrangement ও প্রাসঙ্গিক permit instruction আবার দেখুন। Document হাতে রাখুন, screening-এর সময় দিন এবং assumed timetable নয়, operator/property-র সঙ্গে change মেটান [১, ৪]।

৫. কোন detail অন্য guide-এর বিষয়?
Visa/application order-এর জন্য main DIY guide, নিজের quote input-এর জন্য hub ব্যবহার করুন। Umrah/Rawdah appointment Nusuk guide-এ; older-traveller guide আলাদা assistance checklist, কোনো property accessible-এর প্রমাণ নয়। Optional Ziyarah, Ihram/Miqat ও return-flight Zamzam/customs-এর নিজস্ব source review আছে; এই hotel/rail check সেগুলো certify করে না বা কোনো published price নেই প্রমাণ করে না। Rail valuables rule-কে Bangladesh customs exemption ভাববেন না [৩]।

৬. সচরাচর জিজ্ঞাসা
বয়স্ক মা-বাবার জন্য Makkah-র কোন hotel area best?
এই review সবার জন্য best area প্রমাণ করে না। নির্দিষ্ট room, exit থেকে intended entrance-এর route, step, lift ও confirmed transport ব্যক্তির প্রয়োজনের সঙ্গে তুলনা করুন; এলাকার নাম বা accessible lobby যথেষ্ট নয় [৫–৬]।
Free hotel shuttle মানে prayer time-এ নিশ্চিত ride?
না। খোলা Hilton page নির্দিষ্ট property-তে shuttle প্রচার করে, সব hotel বা guaranteed timetable নয়। Current hour, pickup/drop-off, capacity, fare ও accessible boarding আসল hotel-এ নিশ্চিত করুন [৫]।
চার পরিবারের সদস্য চার suitcase নিয়ে Haramain-এ যেতে পারবেন?
প্রত্যেক passenger-এর bag allowance মেলাতে হবে: একটি বড় bag সর্বোচ্চ ২৫ কেজি ও 65 x 55 x 35 cm, সঙ্গে একটি hand item। চার passenger-এর চার compliant bag স্বয়ংক্রিয়ভাবে নিষিদ্ধ নয়; নিজের bag ও special item যাচাই করুন [২–৩]।
SAR 65 ও SAR 162 কি final ticket price?
না। ১৯ অক্টোবর ২০২৬-এ আবার দেখা KAIA–Makkah ও Makkah–Madinah basic Economy tariff example, VAT ও fee বাদে। নিজের date-specific checkout ও আলাদা transfer cost পড়ুন [২]।
Economy change বা refund free ধরে নিতে পারি?
না। Selected fare ও sales-channel condition পড়ুন। পাওয়া operator page-এ table-label ও ticket-desk wording-এর সীমা আছে; সাধারণ service description-কে refund entitlement ভাববেন না [১–২]।
Madinah train station-এর পাশের hotel নিলে mosque transfer বাদ যায়?
অবশ্যই নয়। Hilton নির্দিষ্ট Madinah Gate property-কে station-connected বলে; তা দিয়ে আপনার stay-র outdoor route বা mosque transfer প্রমাণ হয় না। Booking-এর আগে আসল route ও transport নিশ্চিত করুন [১, ৫]।`,
    references: [
      {
        name: "HHR — station services (operation and availability require confirmation)",
        nameBn: "HHR — station service (operation ও availability নিশ্চিত করতে হবে)",
        url: "https://sar.hhr.sa/services/stations-services",
      },
      {
        name: "HHR — basic fares, boarding and ticket-channel conditions",
        nameBn: "HHR — basic fare, boarding ও ticket-channel condition",
        url: "https://sar.hhr.sa/travel/fares",
      },
      {
        name: "HHR — baggage allowance and prohibited items",
        nameBn: "HHR — baggage allowance ও prohibited item",
        url: "https://sar.hhr.sa/travel/guidelines/baggage",
      },
      {
        name: "HHR — travel tips and identification/assistance checks",
        nameBn: "HHR — travel tips ও identification/assistance check",
        url: "https://sar.hhr.sa/travel/travel-tips",
      },
      {
        name: "Hilton — named Makkah/Madinah property descriptions (not a room or route inspection)",
        nameBn: "Hilton — নির্দিষ্ট Makkah/Madinah property description (room/route inspection নয়)",
        url: "https://www.hilton.com/en/p/discover-travel/emea/religious-travel/",
      },
      {
        name: "Hilton — accessibility varies by hotel and room",
        nameBn: "Hilton — hotel ও room অনুযায়ী accessibility বদলায়",
        url: "https://www.hilton.com/en-gb/help-center/hotel-information/accessible-features-and-rooms/",
      },
    ],
    internalLinks: [
      { text: "Nusuk visitor ও আলাদা Rawdah appointment check", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "সম্পূর্ণ Umrah ও Hajj Visa, Nusuk এবং BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "DIY Umrah পোর্টাল ও BDT ক্যালকুলেটর", path: "/umrah" },
      { text: "Haramain Train বুকিংয়ের জন্য Dual-Currency Card গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "নারীদের ওমরাহ নিয়ম: mahram, ভিসা ও লেডিস গেট", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "ঢাকা এয়ারপোর্টে না মিকাতের স্থানে ihram: নিয়ম", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "Zamzam, খেজুর ও স্বর্ণ: ফেরার ফ্লাইটে কাস্টমসের নিয়ম", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "রমজান ওমরাহ তারিখ ও শেষ দশকের বুকিং পরিকল্পনা", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
    ],
    affiliateCTA: {
      provider: "klook",
      headline: "নির্দিষ্ট hotel ও room-এর terms তুলনা করুন",
      body: "নিজের date ও party দিয়ে accommodation খুঁজুন, তারপর total, room/bed, cancellation ও access সরাসরি property-তে নিশ্চিত করুন। Search result দিয়ে wheelchair route বা shuttle নিশ্চিত হয় না।",
    },
  },

  "dual-currency-card-endorsement-bangladesh": {
    title: "বাংলাদেশে Dual-Currency Card ও Passport Dollar Endorsement করার নিয়ম (2026 গাইড)",
    summary:
      "Passport dollar endorsement হলো বাংলাদেশের বাসিন্দার বিদেশ ভ্রমণের বৈদেশিক মুদ্রা পাসপোর্টের বিপরীতে রেকর্ড করা — বাংলাদেশ ব্যাংকের FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬) অনুযায়ী প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000, যার মধ্যে ডলার নোট হিসেবে সর্বোচ্চ USD 5,000। এই যাচাইকৃত গাইডে Authorized Dealer ব্যাংকে endorsement, dual-currency card অনলাইনে কাজ করাতে আলাদা activation ধাপ, USD 300 single-transaction online-payment নিয়ম এবং RFCD account-এর পার্থক্য ব্যাখ্যা করা হয়েছে।",
    category: "Banking & Payments",
    date: "২৬ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `বাংলাদেশের বাসিন্দা হিসেবে বিদেশে খরচের অনুমতি পাসপোর্টের বিপরীতে রেকর্ড করাকেই Passport Dollar Endorsement বলে, যা নগদ অর্থ বা আন্তর্জাতিক কার্ডের মাধ্যমে ব্যবহার করা যায়। শুধু ব্যাংকের সিলই যথেষ্ট নয়: ভ্রমণের পেমেন্টে কার্ড কাজ করাতে হলে কার্ডের foreign-currency ও e-commerce অংশও চালু করতে হবে। এই গাইডটি ১৬ অক্টোবর ২০২৬ তারিখে বাংলাদেশ ব্যাংকের FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬) এবং Guidelines for Foreign Exchange Transactions (GFET)-এর কার্ড-নিয়ম অনুযায়ী যাচাই করা হয়েছে।

১. Passport Dollar Endorsement কী — এবং $18,000 কোটা
Endorsement হলো Authorized Dealer (AD) ব্যাংক কর্তৃক বিদেশ ভ্রমণের জন্য আপনাকে ছাড় করা বৈদেশিক মুদ্রা রেকর্ড করা। বাংলাদেশ ব্যাংক AD ব্যাংকগুলোকে বাংলাদেশে বসবাসকারী প্রাপ্তবয়স্ক বাংলাদেশি নাগরিকের জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000 বা সমপরিমাণ অর্থ ছাড় করার অনুমতি দেয় [1]। ১২ বছরের কম বয়সী অপ্রাপ্তবয়স্কদের entitlement প্রাপ্তবয়স্কদের ৫০ শতাংশ — সর্বোচ্চ USD 9,000। entitlement-এর সর্বোচ্চ USD 5,000 মার্কিন ডলার নোট হিসেবে ছাড় করা যায়; বাকি অংশ non-cash, যেমন আন্তর্জাতিক debit, prepaid বা credit card। কোটা একটি সর্বোচ্চ সীমা, স্বয়ংক্রিয় অনুমোদন নয়: ব্যাংক আপনার ভ্রমণের নথি অনুযায়ী বৈদেশিক মুদ্রা ছাড় করে, এবং অব্যবহৃত entitlement পরের ক্যালেন্ডার বছরের সীমা বদলায় না। নগদ ও কার্ড মিলিয়ে endorsement করা যায়, তবে ক্যালেন্ডার বছরে মোট ছাড় করা অর্থ সীমার মধ্যেই থাকতে হবে।

২. ধাপে ধাপে: Authorized Dealer ব্যাংকে Endorsement
১. **পাসপোর্ট ও কার্ড ব্যাংকে নিন:** আপনার আসল বৈধ পাসপোর্ট এবং যে dual-currency debit, prepaid বা credit card-টি endorsement করতে চান তা সঙ্গে নিন (অথবা আগে ব্যাংকে একটি কার্ড খুলুন — debit বা prepaid card রাখতে credit card বা বেতনের ইতিহাস লাগে না)।
২. **Travel-quota endorsement চান:** আপনার ব্যাংকের Authorized Dealer শাখায় যান এবং পাসপোর্টের বিপরীতে travel-quota endorsement চান; পুরো বার্ষিক সীমা না চেয়ে এই ভ্রমণের জন্য প্রয়োজনীয় পরিমাণ উল্লেখ করুন।
৩. **Form পূরণ করে endorsement রেকর্ড করান:** ব্যাংকের travel form (ব্যাংক চাইলে TM form) পূরণ করুন। কর্মকর্তা ব্যাংকের সিল ও স্বাক্ষরসহ আপনার পাসপোর্টে endorsement রেকর্ড করবেন।
৪. **Money changer ব্যবহার করলে fee-র সীমা যাচাই করুন:** ডলার নোট licensed money changer-এর কাছ থেকে কিনলে, বাংলাদেশ ব্যাংকের ৭ জানুয়ারি ২০২৬-এর circular অনুযায়ী endorsement fee প্রতি পাসপোর্টে সর্বোচ্চ BDT 300, পরিমাণ যাই হোক; fee প্রদর্শিত থাকতে হবে এবং আপনাকে লিখিত রসিদ দিতে হবে [5]। এই সীমা money changer-এর জন্য — ব্যাংকের চার্জ আলাদা, তাই পরিশোধের আগে আপনার শাখার নিজস্ব schedule জেনে নিন।
৫. **ভ্রমণের আগে কার্ড চালু করুন:** ভ্রমণের আগে পরের ধাপের activation সম্পন্ন করুন। activation ছাড়া endorsement-ই checkout-এ কার্ড ব্যর্থ হওয়ার সবচেয়ে সাধারণ কারণ।

৩. Foreign-Currency ও E-Commerce অংশ চালু করুন
Endorsement রেকর্ড করা প্রক্রিয়ার অর্ধেক মাত্র। অনলাইনে flight, hotel বা attraction ticket বুক করার আগে আপনার ব্যাংককে — অ্যাপে card control থাকলে সেখানে, অথবা ফোন/শাখায় — কার্ডের foreign-currency অংশ খুলতে এবং আপনার ভ্রমণের সময়ের জন্য e-commerce / 3D-Secure online transaction ও overseas POS/ATM ব্যবহার চালু করতে বলুন। এভাবে বলুন: "Please open the USD foreign-currency part of my endorsed card and enable e-commerce and overseas use until [আপনার ফেরার তারিখ]." Endorsed পরিমাণ ও ভ্রমণের তারিখ আপনার টিকিটের সঙ্গে মিলিয়ে রাখুন, কারণ ব্যাংক সেই নথি অনুযায়ী বৈদেশিক মুদ্রা ছাড় করে।

৪. বড় Flight বা Hotel পেমেন্ট Decline হলে (the $300 Rule)
বাংলাদেশ ব্যাংকের কার্ড-নিয়মে general online-payment অনুচ্ছেদে একক online কেনাকাটার সীমা USD 300, তাই travel-quota card-এ বড় flight বা hotel checkout প্রায়ই decline হয় [2]। ভ্রমণ-সংক্রান্ত পেমেন্ট আলাদা বিধানের অধীনে পড়ে, এবং বাস্তবে ব্যাংক নথিভুক্ত বড় ভ্রমণ-পেমেন্ট প্রক্রিয়া করতে পারে — টিকিট বা হোটেলের প্রমাণ প্রস্তুত রেখে পেমেন্টের আগে ব্যাংকের সঙ্গে কথা বলুন; সিদ্ধান্ত ব্যাংকের, স্বয়ংক্রিয় অধিকার নয়। Decline হলে পেমেন্ট ভাগ করবেন না বা বারবার চেষ্টা করবেন না; কার্ড block হওয়া এড়াতে আগে ব্যাংকের সঙ্গে কথা বলুন। RFCD account-এর বিপরীতে ইস্যু করা কার্ড আলাদা: বাংলাদেশ ব্যাংক সেগুলোকে প্রকৃত পরিমাণে (at actual) online payment-এর জন্য স্পষ্টভাবে অনুমতি দিয়েছে [3]।

৫. Travel-Quota Card বনাম RFCD Account — এক নজরে
Travel-quota card পেমেন্টের সময় রূপান্তরিত বাংলাদেশি টাকা খরচ করে, আপনার endorsed বার্ষিক entitlement ও ক্যালেন্ডার বছরের সীমার মধ্যে। RFCD (Resident Foreign Currency Deposit) account-এ থাকে বিদেশ ভ্রমণ থেকে আপনি শারীরিকভাবে ফিরিয়ে আনা বৈদেশিক মুদ্রা: customs declaration ছাড়াই USD 10,000 বা সমপরিমাণ পর্যন্ত জমা দিতে পারেন, এবং আগমনের সময় করা FMJ declaration দিয়ে বড় অঙ্কও জমা করা যায় — সেই ঘোষিত অঙ্ক ৩০ দিনের মধ্যে জমা করতে হবে [4]। RFCD account-এ বিদেশ থেকে remittance বা আয় গ্রহণ করা যায় না, এবং এর কার্ড প্রকৃত পরিমাণে online payment করতে পারে [3]। সম্পূর্ণ তুলনা ও $300 সমস্যার বিস্তারিত সমাধানের জন্য আমাদের RFCD বনাম travel quota গাইডটি পড়ুন।

৬. বিদেশে পেমেন্ট: Local Currency বেছে নিন
বিদেশে card terminal-এ BDT বা আপনার "home currency"-তে চার্জের প্রস্তাব এলে তা প্রত্যাখ্যান করে local currency (SAR, THB, MYR, AED, SGD ইত্যাদি) বেছে নিন। Home currency বেছে নিলে merchant-এর ব্যাংক নিজস্ব হারে রূপান্তর করে, সাধারণত network rate-এর ওপরে markup সহ; local currency বেছে নিলে রূপান্তরটি আপনার নিজের ব্যাংক ও card network করে। Markup terminal অনুযায়ী বদলায়, তাই কোনো নির্দিষ্ট শতাংশ নয় — "সবসময় local currency বেছে নিন" এটিকেই নিয়ম হিসেবে ধরুন। কখন local cash রাখা এখনও যুক্তিযুক্ত, তা আমাদের cash বনাম card গাইডে ব্যাখ্যা করা হয়েছে।

৭. ব্যবহারিক নোট
$18,000 অঙ্কটি ৬ সেপ্টেম্বর ২০২৬ থেকে কার্যকর — ওই circular-এর আগে সীমা ছিল USD 12,000, তাই পুরনো নিবন্ধ, ভিডিও এমনকি ব্যাংকের লিফলেটেও পুরনো সংখ্যাটি থাকতে পারে। Endorsement-এর রসিদ ও পাসপোর্ট পৃষ্ঠার কপি ভ্রমণের নথির সঙ্গে রাখুন, এবং প্রতি ভ্রমণের কিছু আগে কোটা ও ব্যাংকের card setting আবার যাচাই করুন: entitlement প্রতি ব্যক্তি ও প্রতি ক্যালেন্ডার বছরের জন্য, এবং ভ্রমণের মাঝে card control বন্ধ হয়ে যেতে পারে।

৮. সচরাচর জিজ্ঞাসা
আমি কি একসঙ্গে পুরো $18,000 endorse করতে পারি?
বাংলাদেশ ব্যাংক USD 18,000-কে AD ব্যাংক এক ক্যালেন্ডার বছরে ছাড় করতে পারে এমন সর্বোচ্চ সীমা হিসেবে নির্ধারণ করেছে, আপনাকে নিতেই হবে এমন পরিমাণ হিসেবে নয়। আপনার ভ্রমণের প্রয়োজন অনুযায়ী endorse করুন; ব্যাংক আপনার ভ্রমণের নথি অনুযায়ী ছাড় করে [1]।
কোটা কি প্রতি বছর reset হয়?
হ্যাঁ — entitlement প্রতি ক্যালেন্ডার বছরের জন্য। ১২ বছরের কম বয়সীরা প্রাপ্তবয়স্কদের ৫০ শতাংশ পায়, এবং প্রতি ব্যক্তির জন্য USD 5,000-এর বেশি মার্কিন ডলার নোট হিসেবে ছাড় করা যায় না [1]।
পাসপোর্টে endorsement আছে কিন্তু অনলাইনে কার্ড ব্যর্থ হচ্ছে কেন?
Endorsement ও activation আলাদা বিষয়। ব্যাংককে কার্ডের foreign-currency অংশ খুলতে এবং আপনার ভ্রমণের তারিখের জন্য e-commerce / 3D-Secure ও overseas ব্যবহার চালু করতে বলুন, এবং পেমেন্ট বড় হলে $300 single-transaction নিয়মটি যাচাই করুন [2]।
আমি কি entitlement নগদ ও কার্ডে ভাগ করতে পারি?
হ্যাঁ। ক্যালেন্ডার বছরের সর্বোচ্চ সীমা মোট ছাড়ের ওপর প্রযোজ্য; AD ব্যাংক এক অংশ মার্কিন ডলার নোট হিসেবে (সর্বোচ্চ USD 5,000) এবং বাকি অংশ endorsed আন্তর্জাতিক কার্ডের মতো non-cash আকারে ছাড় করতে পারে, মোট পরিমাণ আপনার entitlement-এর মধ্যে থাকলেই হলো [1].`,
    internalLinks: [
      { text: "টাকা ও ব্যাংকিং হাব: এনডোর্সমেন্ট, কার্ড, USD 300 নিয়ম ও NOC", path: "/banking" },
      { text: "ওমরাহর জন্য শরীয়াহ-সম্মত ইসলামিক ডুয়েল-কারেন্সি কার্ড", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "RFCD Account বনাম সাধারণ Travel Quota ($300 লিমিট সমাধান)", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "নগদ রিয়াল/ডলার বনাম কার্ড (local currency বেছে DCC এড়ান)", path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide" },
      { text: "কার্ড ছাড়াই bKash বা ব্যাংক ট্রান্সফারে ফ্লাইট ও হোটেল বুকিং", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "ডুয়েল-কারেন্সি কার্ড fee ও markup ক্যালকুলেটর", path: "/tools?tab=currency" },
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
    title: "বাংলাদেশ থেকে ২০২৭ Hajj নিবন্ধন: বর্তমান অবস্থা, সরকারি পোর্টাল ও প্যাকেজ খরচ",
    summary:
      "MoRA-র সর্বশেষ দেওয়া বিজ্ঞপ্তি অনুযায়ী ২০২৭ সালের প্রাথমিক Hajj নিবন্ধন ২৭ জুলাই থেকে ২৪ সেপ্টেম্বর ২০২৬ পর্যন্ত ছিল; সময়সীমা বাড়ানোর কথা ছিল না। সময়সীমা পেরিয়েছে। পরবর্তী নোটিশের জন্য hajj.gov.bd দেখুন। দেওয়া সূত্রে ২০২৭ প্যাকেজের দাম নিশ্চিত নয়; ২০২৬ সালের দাম আগের মৌসুমের, বর্তমান কোটেশন নয়।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৮ মিনিট পড়া",
    content: `কার জন্য: ২০২৭ সালের হজে সরকারি বা বেসরকারি ব্যবস্থাপনায় যাওয়ার পরিকল্পনা করা বাংলাদেশি যাত্রীদের জন্য।

দ্রুত উত্তর — এই গাইডের জন্য দেওয়া সর্বশেষ MoRA ২০২৭ বিজ্ঞপ্তি অনুযায়ী প্রাথমিক নিবন্ধন ২৭ জুলাই থেকে ২৪ সেপ্টেম্বর ২০২৬ পর্যন্ত ছিল এবং বিজ্ঞপ্তিতে বলা হয়েছিল সময়সীমা বাড়ানো হবে না। ১৮ অক্টোবর ২০২৬ অনুযায়ী সময়সীমা পেরিয়ে গেছে। পরবর্তী কোনো নোটিশ আছে কি না hajj.gov.bd-এ দেখুন। দেওয়া সূত্রে ২০২৭ প্যাকেজের দাম নিশ্চিত হয়নি; ২০২৬ সালের অঙ্ক আগের মৌসুমের তথ্য, বর্তমান কোটেশন নয় [১]।

[[HAJJ_RESOURCE_DOWNLOAD]]

মৌসুম-সংক্রান্ত সতর্কতা: দেওয়া সূত্রে ২০২৭ সালের হজ প্যাকেজের দাম বা ১৪৪৮ হিজরি/২০২৭ সালের সৌদি স্বাস্থ্য ও permit-এর নিয়ম নিশ্চিত হয়নি। এই গাইডে আগের মৌসুমের তথ্যকে ঐতিহাসিক হিসেবে চিহ্নিত করা হয়েছে। টাকা দেওয়া বা যাত্রার আগে আপনার হজ-মৌসুমের সর্বশেষ MoRA/e-Hajj ও সৌদি মন্ত্রণালয়ের বিজ্ঞপ্তি দেখুন।

১. ২০২৭ সালের হজ নিবন্ধনের সময়সীমার পর করণীয়
এই গাইডের জন্য দেওয়া সর্বশেষ MoRA বিজ্ঞপ্তি অনুযায়ী ২০২৭ সালের প্রাথমিক হজ নিবন্ধন ২৪ সেপ্টেম্বর ২০২৬-এ শেষ হয়েছে এবং বিজ্ঞপ্তিতে সময়সীমা না বাড়ানোর কথা বলা হয়েছিল। কোনো পরবর্তী নোটিশ আছে কি না পদক্ষেপ নেওয়ার আগে hajj.gov.bd-এ দেখুন [১]।
- **ধাপ ১ — নিবন্ধন করে থাকলে:** আপনার e-Hajj নিবন্ধন নম্বর, ব্যাংকের রসিদ এবং দেওয়া হয়ে থাকলে স্বাক্ষরিত নিবন্ধন সনদ সংরক্ষণ করুন। দেওয়া e-Hajj বিজ্ঞপ্তিতে নিবন্ধনের টাকা জমার পর স্বাক্ষরিত সনদের কথা আছে; আপনার ক্ষেত্রে কোন সনদ প্রয়োজন তা বিজ্ঞপ্তি দেখে সংগ্রহ করুন [৩]।
- **ধাপ ২ — পাসপোর্টের শর্ত দেখুন:** দেওয়া ২০২৭ সালের passport-relaxation বিজ্ঞপ্তিতে প্রাথমিক নিবন্ধনে মেয়াদোত্তীর্ণ পাসপোর্টের শিথিলতার কথা আছে; তবে এর পরিধি ও নতুন পাসপোর্ট জমার সময়সীমা সরকারি বিজ্ঞপ্তিতে যাচাই না করে নির্ভর করবেন না। আপনার ক্ষেত্রে মেয়াদোত্তীর্ণ পাসপোর্ট গ্রহণ করা হবে বা উল্লিখিত সময়সীমা প্রযোজ্য—এমন ধরে নেবেন না [২]।
- **ধাপ ৩ — নিবন্ধন করতে না পারলে:** নিবন্ধন এখনো খোলা আছে ধরে নেবেন না এবং পুরোনো সময়সীমা বা অঙ্কের ভিত্তিতে কোনো মধ্যস্থতাকারীকে টাকা দেবেন না। নতুন বিজ্ঞপ্তি বা পুনরায় নিবন্ধন খোলার নোটিশ আছে কি না সরকারি পোর্টালে দেখুন; দেওয়া সূত্রে ২০২৭ প্যাকেজের দাম নিশ্চিত হয়নি [১]।

২. সরকারি ব্যবস্থাপনা বনাম বেসরকারি হজের ব্যবস্থা
এই আপডেটের জন্য দেওয়া সূত্রে সরকারি বা বেসরকারি—কোনো ব্যবস্থারই ২০২৭ সালের প্যাকেজের দাম নিশ্চিত হয়নি। ২০২৬ সালের কোনো দাম, জমা বা কথিত সাশ্রয়কে ২০২৭ সালের বর্তমান কোটেশন হিসেবে ধরবেন না।
- **সরকারি ব্যবস্থাপনা:** ২০২৭ সালে কোন প্যাকেজ-স্তর দেওয়া হচ্ছে, সম্পূর্ণ মূল্য, কিস্তি/জমার সময়, সেবাসমূহ ও শর্ত জানতে ধর্ম বিষয়ক মন্ত্রণালয়ের (MoRA) সর্বশেষ বিজ্ঞপ্তি দেখুন। সরকারি হজ ব্যবস্থাপনা পোর্টাল থেকে শুরু করে হালনাগাদ বিজ্ঞপ্তি অনুসরণ করুন [১]।
- **বেসরকারি এজেন্সি:** টাকা দেওয়ার আগে সরকারি পোর্টাল বা MoRA-র চলতি বিজ্ঞপ্তিতে এজেন্সিটির ২০২৭ মৌসুমের অনুমোদন যাচাই করুন। তারিখসহ itemized লিখিত কোটেশন নিন এবং যাত্রীর নিবন্ধন ও পেমেন্ট সরকারি সিস্টেমে কীভাবে নথিভুক্ত হবে নিশ্চিত করুন [১]। “Economy”, “Classic” বা “VIP” নাম সব এজেন্সিতে একই সেবা বোঝায় ধরে নেবেন না।
- **একই ভিত্তিতে তুলনা করুন:** দুই পক্ষের কাছ থেকে মোট payable amount, জমার সময়সীমা ও ফেরত/বাতিলের শর্ত; ফ্লাইট রুট ও ব্যাগেজ; আবাসনের তারিখ, অবস্থান ও রুম-শেয়ারিং; স্থানীয় যাতায়াত, খাবার ও যাত্রী-সহায়তা; এবং অন্তর্ভুক্ত/বাদ থাকা প্রতিটি সেবা ও অতিরিক্ত ফি লিখিতভাবে নিন। শুধু প্যাকেজের নাম দেখে হোটেলের নৈকট্য, কম দিনের সফর, নির্দিষ্ট Mina তাঁবু বা ভালো মূল্য নিশ্চিত হয় না।
দেওয়া সূত্রে তুলনাযোগ্য ২০২৭ সালের কোটেশন নেই, তাই কোন ব্যবস্থায় খরচ কম হবে এই গাইড তা বলতে পারে না। সিদ্ধান্তের আগে বর্তমান বিজ্ঞপ্তি ও লিখিত কোটেশন যাচাই করুন [১]।
৩. “SHIFTING” ও “NON-SHIFTING” প্যাকেজের শর্ত
কিছু হজের কোটেশনে “Shifting” ও “Non-Shifting” শব্দ ব্যবহার করা হয়; তবে দেওয়া সূত্রে এ শব্দগুলোর কোনো নির্দিষ্ট মানক সংজ্ঞা, ২০২৭ সালের সেবার ধরন বা দামের পার্থক্য প্রতিষ্ঠিত হয়নি। আগের BDT ৮০,০০০–১,৪০,০০০ “সাশ্রয়” দাবিকে বর্তমান বা যাচাই করা অঙ্ক হিসেবে ধরবেন না।
বুকিংয়ের আগে সেবাদাতার কাছ থেকে লিখিতভাবে জেনে নিন:
- সফরের মধ্যে আবাসন বদলাবে কি না। বদলালে প্রতিটি হোটেল/আবাসনের নাম, অবস্থান ও থাকার তারিখ—হজের দিনগুলোতে কোথায় থাকবেন তা-সহ—তালিকাভুক্ত আছে কি না।
- প্রতিটি স্থানান্তরের ব্যবস্থা ও খরচ কে বহন করবে এবং লাগেজ সরানোর দায়িত্ব কার।
- প্রতিটি আবাসনে কোন ধরনের রুম ও কতজনের sharing অন্তর্ভুক্ত; কী অতিরিক্ত খরচ বা বাদ থাকা সেবা আছে।
- আবাসন বা স্থানান্তর বদলালে বাতিল, টাকা ফেরত ও পরিবর্তনের শর্ত কী।
একই তারিখ ও সেবার ভিত্তিতে লিখিত itinerary এবং মোট দাম তুলনা করুন। “Shifting” মানেই নির্দিষ্ট Aziziya-তে থাকা, জামারাতে সহজে পৌঁছানো বা কম দাম—এমন ধরে নেবেন না; সেবাদাতার চলতি কোটেশন ও মৌসুমের সরকারি নিয়মই প্রযোজ্য।
৪. মিনা ও আরাফাতে আবাসন: চলতি মৌসুমের তথ্য যাচাই করুন
এই গাইডের জন্য দেওয়া সূত্রে ২০২৭ সালের Maktab নাম/বরাদ্দ, ক্যাম্পের অবস্থান, জামারাত থেকে দূরত্ব বা তাঁবুর সুবিধা যাচাই হয়নি। আগের দূরত্ব, শীতাতপ/কুলিং, বিছানা ও খাবারসংক্রান্ত দাবিগুলো ২০২৭ সালের বর্তমান নির্দেশনা নয়। এগুলোর ভিত্তিতে প্যাকেজ বেছে নেবেন না।
টাকা দেওয়ার আগে তারিখসহ লিখিত কোটেশনে নিচের তথ্য নিন:
- বরাদ্দ করা ক্যাম্প, Maktab বা জোন এবং কোন চলতি মৌসুমের বিজ্ঞপ্তি/চুক্তিতে তা উল্লেখ আছে;
- আবাসনের সুনির্দিষ্ট অবস্থান এবং map/route—শুধু যাচাইহীন দূরত্বের অঙ্ক নয়;
- তাঁবুতে কোন সুবিধা ও সেবা সত্যিই অন্তর্ভুক্ত, যেমন cooling, বিছানা, খাবার ও toilet;
- যাতায়াতের ব্যবস্থা, অতিরিক্ত খরচ এবং বরাদ্দ করা আবাসন বদলালে কী হবে।
চলতি বাংলাদেশ ও সৌদি হজ-মৌসুমের নির্দেশনা মিলিয়ে নিন এবং প্রতিশ্রুত অবস্থান বা সুবিধা চুক্তিতে লিখিয়ে নিন। শুধু Maktab-এর নাম দেখে নির্দিষ্ট দূরত্ব, আরাম বা সেবা নিশ্চিত ধরে নেবেন না।

৫. স্বাস্থ্য, বায়োমেট্রিক, Hajj permit ও Nusuk card: চলতি মৌসুম যাচাই করুন
স্বাস্থ্য, বায়োমেট্রিক, visa, permit ও card-এর নির্দেশনা হজের মৌসুম এবং যাত্রীর শ্রেণিভেদে বদলাতে পারে। এই পর্যালোচনার স্বাস্থ্য-সূত্রটি Saudi MOH-এর ১৪৪৭ হিজরি/২০২৬ সালের নথি; permit ও Nusuk Smart Card-এর সূত্রগুলোও শুধু ২০২৬ সালের বিজ্ঞপ্তি [৪–৬]। এগুলো ১৪৪৮ হিজরি/২০২৭ সালের নিয়ম নিশ্চিত করে না। আগে লেখা বাধ্যতামূলক ১০-আঙুলের Saudi Visa Bio, টিকার ধরন/মেয়াদ/সময়, COVID-এর অবস্থা বা Mashair train ও Haram courtyard-এ Smart Card ব্যবহারের দাবিগুলো ১৪৪৮ হিজরির জন্য যাচাই করা হয়নি—বর্তমান নির্দেশনা হিসেবে এগুলোর ওপর নির্ভর করবেন না [৪–৬]।
যাত্রার আগে:
- প্রযোজ্য মৌসুমের Saudi MOH Hajj health document দেখে টিকা, মেয়াদ, সময়সীমা এবং নির্দিষ্ট যাত্রী-শ্রেণির শর্ত যাচাই করুন [৪, ৯]।
- Hajj visa-র biometric, permit এবং card বা transport-access-এর শর্তের জন্য সৌদি মন্ত্রণালয়/Nusuk ও বাংলাদেশ MoRA/e-Hajj-এর বর্তমান নির্দেশনা অনুসরণ করুন [১, ৭–৮]। আপনার visa আবেদনের বর্তমান সরকারি নির্দেশনায় চাইলে তবেই Saudi Visa Bio ব্যবহার করুন।
- বর্তমান সরকারি বিজ্ঞপ্তি ও নিজের আবেদনের নির্দেশনা সংরক্ষণ করুন। প্রযোজ্য নিয়মের বদলে আগের মৌসুমের PDF, এজেন্সির brochure বা সাধারণ app listing ব্যবহার করবেন না।`,
    internalLinks: [
      { text: "সম্পূর্ণ DIY Umrah ও Nusuk App গাইড (2026)", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "বয়স্ক বাবা-মাকে নিয়ে Umrah: হুইলচেয়ার ও মেডিকেল গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "Makkah ও Madinah হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "হজযাত্রার জন্য mobile data পরিকল্পনা করুন",
      body: "পরিবারের সঙ্গে যোগাযোগ ও map ব্যবহারের জন্য যাত্রার আগে Saudi Arabia-র mobile data পরিকল্পনা করুন। কেনার আগে device compatibility, coverage, data allowance ও activation terms যাচাই করুন।",
    },
  },

  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    title: "বয়স্ক বাবা-মাকে নিয়ে বাংলাদেশ থেকে ওমরাহ: এয়ারলাইন হুইলচেয়ার, হারামের মোবিলিটি ও মেডিকেল প্রস্তুতি",
    summary:
      "১৯ অক্টোবর ২০২৬-এ যাচাই করা: বয়স্ক বাবা-মার জন্য এয়ারলাইন কী নিশ্চিত করতে পারে, নিজের হুইলচেয়ার ও ইলেকট্রিক ডিভাইস কীভাবে হ্যান্ডেল হয়, মসজিদুল হারামের বিনামূল্যে হুইলচেয়ার ও সাশুল্ক ইলেকট্রিক কার্ট কোথায় বুক হয়, এবং কোন হোটেল ও চিকিৎসা প্রশ্ন কেবল হোটেল ও ডাক্তারই উত্তর দিতে পারেন। সবার জন্য বিনামূল্যে সেবা, দরজায় ফেরত, ধাপবিহীন হোটেল রুট বা মেডিকেল ছাড়পত্রের প্রতিশ্রুতি নয়।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১০ মিনিট পড়া",
    content: `এই গাইডটি বাংলাদেশ থেকে ওমরাহে বয়স্ক বাবা-মা বা আত্মীয়কে নিয়ে যাওয়া পরিবারের জন্য—যিনি দুর্বল, হুইলচেয়ার ব্যবহার করেন বা দীর্ঘ পথ হাঁটতে পারেন না। এখানে তিনটি আলাদা সিদ্ধান্ত আলাদা করে দেখানো হয়েছে: এয়ারলাইন আসলে কী ব্যবস্থা করতে পারে, দুই পবিত্র মসজিদ কর্তৃপক্ষ মসজিদের ভেতরে কী সেবা প্রকাশ করে, এবং কোন প্রশ্নগুলো কেবল চিকিৎসক, হোটেল ও ঘটনার দিনের কর্মীরাই উত্তর দিতে পারেন। এটি কোনো মেডিকেল ক্লিয়ারেন্স, পরীক্ষিত বুকিং বা পরিদর্শন করা রুট নয়।

দ্রুত উত্তর — ১৯ অক্টোবর ২০২৬-এ যাচাই করা: বিমান টিকিট বুক করার সময়ই সহায়তা চাইবেন, এয়ারপোর্টে গিয়ে নয়। বিমান বলছে বুকিংয়ের সময় জানানো বাধ্যতামূলক এবং অন্তত ৪৮ ঘণ্টা আগে আবেদন করার পরামর্শ দেয়; সৌদিয়া নিজের ফ্লাইটে বিনামূল্যে হুইলচেয়ার সহায়তা এবং হুইলচেয়ারসহ সর্বোচ্চ দুইটি মোবিলিটি সামগ্রী বিনামূল্যে বহনের কথা প্রকাশ করে, এবং WCHR, WCHS ও WCHC ক্যাটাগরি ব্যাখ্যা করে। মসজিদুল হারামে কর্তৃপক্ষ নির্দিষ্ট এলাকায় বিনামূল্যে ম্যানুয়াল হুইলচেয়ার এবং নিজের তানাকুল প্ল্যাটফর্মে বুক করা সাশুল্ক ইলেকট্রিক কার্টের কথা বলে; প্রতিবন্ধকতাযুক্ত ব্যক্তিরা কার্ট সার্ভিস পয়েন্ট বিনামূল্যে ব্যবহার করতে পারেন। এর কোনোটিই ব্যক্তিগত অনুমোদন, প্রতিটি এয়ারলাইনে বিনামূল্যে সেবা বা ধাপবিহীন হোটেল রুটের নিশ্চয়তা নয়। [১–৯]

১. এয়ারলাইন কী ব্যবস্থা করতে পারে—আর কোড কী নিশ্চিত করে না?
প্রথমে দেখুন আপনার বাবা-মা আসলে কী করতে পারেন, কারণ ক্যাটাগরিই সহায়তা নির্ধারণ করে। সৌদিয়া তিনটি ক্যাটাগরি প্রকাশ করে: WCHR—যিনি সিঁড়ি ভেঙে উঠতে পারেন কিন্তু দীর্ঘ পথ হাঁটতে পারেন না; WCHS—যিনি উড়োজাহাজের সিঁড়ি ব্যবহার করতে পারেন না কিন্তু কেবিনের ভেতর হাঁটতে পারেন; এবং WCHC—যিনি একেবারেই হাঁটতে পারেন না। WCHC-এর ক্ষেত্রে তারা যাত্রীর ওজন জানতে চায় এবং পাশে বসা একজন সঙ্গীর প্রয়োজন বলে। প্রতিটি এয়ারলাইন নিজের স্পেশাল-অ্যাসিস্ট্যান্স ফর্মে কোডগুলো প্রয়োগ করে, তাই কথায়ও প্রয়োজনটা লিখে জানান। [২]

বুকিংয়ের সময়ই চাইুন। বিমান বলছে বুকিংয়ের সময় জানানো বাধ্যতামূলক; তারা হুইলচেয়ারের ইমেইল ও ফোন নম্বর প্রকাশ করে এবং ছাড়ার অন্তত ৪৮ ঘণ্টা আগে আবেদনের পরামর্শ দেয়; একই সঙ্গে সতর্ক করে যে কেবল এয়ারপোর্টে এসে চাইলে হুইলচেয়ার পাওয়ার নিশ্চয়তা থাকে না। সৌদিয়ার স্পেশাল-অ্যাসিস্ট্যান্স লেখায় ইলেকট্রিক হুইলচেয়ার ও দুইটি মোবিলিটি সামগ্রীর জন্য ৪৮ ঘণ্টা আগে জানানোর শর্ত আছে—স্থান ও বিপজ্জনক পণ্যের নিয়ম সাপেক্ষে। ৪৮ ঘণ্টাকে ন্যূনতম হিসেব ধরুন, নিশ্চয়তা নয়: নির্দিষ্ট এয়ারলাইন আরও সময় চায় কি না জিজ্ঞেস করুন। [১][২][৩]

বুকিংয়ে কোড থাকা মানে প্রতিটি এয়ারপোর্টে সেবা নিশ্চিত নয়। কোডটি itinerary-র প্রতিটি অপারেটিং এয়ারলাইন ও প্রতিটি স্টেশনে পৌঁছাতে হবে, সংযোগ ফ্লাইটসহ। লিখিত নিশ্চিতকরণ নিন, টিকিটের সঙ্গে রাখুন, ছাড়ার কয়েক দিন আগে ও আবার চেক-ইনে যাচাই করুন। আগে পৌঁছান: সৌদিয়ার হুইলচেয়ার পেজ সেবা ব্যবহারকারীদের ছাড়ার দুই ঘণ্টা আগে এয়ারপোর্টে এবং বোর্ডিং শুরুর আগে গেটে থাকতে বলে। [২]

ধাপ ১: বাবা-মার প্রয়োজন স্পষ্ট কথায় লিখুন।
তিনি সিট পর্যন্ত হাঁটতে পারেন, উড়োজাহাজের সিঁড়ি ব্যবহার করতে পারেন, নাকি একেবারেই হাঁটতে পারেন না—তা জানান। এয়ারলাইন কোন ক্যাটাগরি রেকর্ড করবে এবং মেডিকেল ফর্ম বা সঙ্গী প্রয়োজন কি না জিজ্ঞেস করুন। [২]

ধাপ ২: বুকিংয়ের সময় আবেদন যোগ করুন এবং নিশ্চিতকরণ রাখুন।
এয়ারলাইনের নিজের বুকিং চ্যানেল বা প্রকাশিত স্পেশাল-অ্যাসিস্ট্যান্স যোগাযোগ ব্যবহার করুন। রেফারেন্স, কোন কোন ফ্লাইট সেগমেন্ট-covered এবং কোনো চার্জ আছে কি না লিখিতভাবে নিন। [২][৩]

ধাপ ৩: itinerary-র প্রতিটি অপারেটিং এয়ারলাইন ও এয়ারপোর্ট যাচাই করুন।
রিটার্ন টিকিটে দুইটি এয়ারলাইন ও একটি ট্রানজিট পয়েন্ট থাকতে পারে। প্রত্যেকের কাছে সহায়তা ও হ্যান্ডওভার নিশ্চিত করুন—ট্রানজিট এয়ারপোর্টে কে হুইলচেয়ার দেবে সেটিসহ। [২]

ধাপ ৪: ছাড়ার আগে আবার নিশ্চিত করুন এবং আগে পৌঁছান।
উড়ানের আগে কল বা বুকিং দেখে নিন, তারপর চেক-ইনে স্পেশাল-অ্যাসিস্ট্যান্স ডেস্কে উপস্থিত হন। হাঁটা, সিকিউরিটি ও গেটের জন্য সময় রাখুন। [২]

যাত্রীর যাচাই (elderlyAirline): টাকা দেওয়ার আগে অপারেটিং এয়ারলাইনকে ক্যাটাগরি, কোন ফ্লাইটগুলো covered, কোনো চার্জ, হ্যান্ডওভার পয়েন্ট এবং সঙ্গী বা মেডিকেল ফর্ম লাগবে কি না নিশ্চিত করতে বলুন। লিখিত নিশ্চিতকরণ টিকিটের সঙ্গে রাখুন। বুকিংয়ে কোড, এজেন্টের আশ্বাস বা ওয়েবসাইটের সাধারণ প্রতিশ্রুতি আপনার বাবা-মার ফ্লাইটের নিশ্চিতকরণ নয়। URAL বা পাবলিক চ্যাটে পাসপোর্ট স্ক্যান বা মেডিকেল রেকর্ড পাঠাবেন না।

২. নিজের হুইলচেয়ার বা মোবিলিটি ডিভাইস নেওয়া যাবে?
সৌদিয়া প্রকাশ করে যে হুইলচেয়ার ও ক্রাচ বিনামূল্যে বহন করা হয় এবং বিনামূল্যে চেকড ব্যাগেজ ভাতার অতিরিক্ত সর্বোচ্চ দুইটি মোবিলিটি সামগ্রী—ইলেকট্রিক হুইলচেয়ারসহ—গ্রহণ করা হয়। তারা আরও বলে এসব সামগ্রী সাধারণত হোল্ডে বহন করা হয়, বোর্ডিংয়ের আগে জমা নেওয়া হয় এবং অবতরণের পর এয়ারপোর্টের প্রক্রিয়া অনুযায়ী ফেরত দেওয়া হয়। এটি সৌদিয়ার নিজের ফ্লাইটের প্রকাশিত নিয়ম, সব এয়ারলাইনের সার্বজনীন অধিকার নয়। [১]

ফেরত দেওয়ার জায়গাটাই পরিবারগুলো সবচেয়ে বেশি ভুল বোঝে। হুইলচেয়ার উড়োজাহাজের দরজায় ফেরত আসবে—এমন প্রতিশ্রুতির কোনো ভিত্তি এই যাচাইয়ে পাওয়া যায়নি। এয়ারপোর্ট ও গ্রাউন্ড হ্যান্ডলার অনুযায়ী এটি গেটে বা ব্যাগেজ বেল্টে ফেরত দেওয়া হতে পারে। চেক-ইনে জিজ্ঞেস করুন কোথায় জমা নেওয়া হবে ও কোথায় ফেরত দেওয়া হবে, এবং দেরি হওয়ার সম্ভাবনা ধরে arrival transfer পরিকল্পনা করুন। [১]

ইলেকট্রিক হুইলচেয়ার, ব্যাটারি, অক্সিজেন কনসেনট্রেটর ও অন্যান্য ডিভাইসের জন্য আলাদা অনুমোদন লাগে। উদাহরণ হিসেবে সৌদিয়া অনুমোদিত পোর্টেবল অক্সিজেন কনসেনট্রেটর মডেলের তালিকা দেয়, ছাড়ার অন্তত ৪৮ ঘণ্টা আগে চিকিৎসকের বিবৃতি এবং অন্তত তিন ঘণ্টা আগে চেক-ইন চায়, এবং কেবিনে সর্বোচ্চ দুইটি স্পেয়ার ব্যাটারি অনুমোদন করে। প্রতিটি ব্যাটারি, ডিভাইস বা এয়ারলাইন একই শর্তে গ্রহণ করা হবে ধরে নেবেন না। [১]

নিজের হুইলচেয়ার আর এয়ারলাইনের এয়ারপোর্ট হুইলচেয়ার আলাদা সেবা। ব্যক্তিগত হুইলচেয়ার হোটেল ও মসজিদের চত্বরে কাজে লাগে, কিন্তু গেট পর্যন্ত এয়ারলাইনের সহায়তার বিকল্প নয়। হজ ও ওমরাহ মন্ত্রণালয় বলে, হাজি নিজের হুইলচেয়ার নিয়ে মসজিদুল হারামে এসে ব্যবহার করতে পারেন—শর্ত হলো হুইলচেয়ারের জন্য নির্ধারিত স্থান দিয়ে প্রবেশ করতে হবে। [৪]

যাত্রীর যাচাই (elderlyEquipment): টিকিট নন-রিফান্ডেবল হওয়ার আগেই অপারেটিং এয়ারলাইনের সঙ্গে ডিভাইস, ব্যাটারির ধরন ও মাপ নিশ্চিত করুন এবং অনুমোদন মেডিকেল কাগজপত্রের সঙ্গে রাখুন। ভাঁজ করা হুইলচেয়ার, ইলেকট্রিক হুইলচেয়ার ও পোর্টেবল অক্সিজেন কনসেনট্রেটর একই অনুমোদন নয়। অবতরণ এয়ারপোর্টে ফেরত দেওয়ার জায়গা যাচাই করুন এবং আপনার ট্রান্সফার ভাঁজ করা চেয়ার বহন করতে পারবে কি না দেখুন। এই পেজ কোনো ফ্লাইটের জন্য কোনো ডিভাইস প্রত্যয়িত করে না।

৩. মসজিদুল হারামের ভেতরে কী মোবিলিটি সহায়তা আছে?
কর্তৃপক্ষ নির্দিষ্ট এলাকায় বিনামূল্যে ম্যানুয়াল হুইলচেয়ার সেবা প্রকাশ করে; তাদের ঘোষণায় সেবাটি চব্বিশ ঘণ্টা চালু বলে বর্ণনা করা হয়। কর্তৃপক্ষের সেবা পেজে পূর্ব চত্বরের বাব আল-সালাম (গেট ১৯) ও পশ্চিম চত্বরের আল-শুবাইকা এবং ভূতল সাঈ (গেট ১৪)-তে আলাদা সাশুল্ক ম্যানুয়াল সেবার কথা আছে। সৌদি প্রেস এজেন্সি পশ্চিম গেটের নম্বর ভিন্নভাবে জানিয়েছে, তাই ছাপা নম্বরকে শুরুর বিন্দু ধরুন এবং বর্তমান সাইন ও শনাক্তযোগ্য কর্মীর নির্দেশ মানুন। [৫][৬][৮][৯]

ইলেকট্রিক কার্ট এখন ইলেকট্রনিক বুকিংয়ে। ২০২৫ সালের মার্চে কর্তৃপক্ষ ম্যানুয়াল গলফ-কার্ট বুকিং বন্ধ করে নিজের পরিবহন প্ল্যাটফর্ম তানাকুল দিয়ে রিজার্ভেশন বাধ্যতামূলক করে। একই বিজ্ঞপ্তি ৬৫ বছরের বেশি বয়সীদের অনলাইনে বুকিংয়ের পরামর্শ দেয়, যারা বুক করতে পারেন না তাদের জন্য সার্ভিস পয়েন্ট রাখে, এবং বলে প্রতিবন্ধকতাযুক্ত ব্যক্তিরা অনলাইন রিজার্ভেশন ছাড়াই সরাসরি কার্ট সার্ভিস পয়েন্টে বিনামূল্যে যেতে পারেন। টিকিট ও আইডি নিয়ে সময়মতো পৌঁছান। [৬]

তানাকুল কর্তৃপক্ষের কার্ট-মোবিলিটি প্ল্যাটফর্ম। মন্ত্রণালয়ের নুসুক অ্যাপে ওমরাহ ও রাওদা পারমিট হয়; এগুলো আলাদা সেবা। নুসুক পারমিট কার্ট বুক করে বা কার্ট বুকিং পারমিট তৈরি করে—এমন ধরে নেবেন না। [৪][৬][৯]

২০২৪ সালে প্রকাশিত ইলেকট্রিক ভেহিকল পিকআপ পয়েন্ট ছিল আল-মারওয়া গেট ২৫, আল-আরকাম গেট ১৬, আজইয়াদ গেট ৫ এবং আল-শুবাইকা গেট ৬৬। কে বসবে, কে চালাবে—তা অপারেটর নির্ধারণ করে, তাই সঙ্গী বসতে বা চালাতে পারবেন ধরে না নিয়ে সার্ভিস পয়েন্টে জিজ্ঞেস করুন। [৯]

শুধু অফিশিয়াল সার্ভিস পয়েন্ট ব্যবহার করুন। কর্তৃপক্ষ লাইসেন্সপ্রাপ্ত হুইলচেয়ার-সহায়ক ব্যবস্থা প্রকাশ করে এবং ২০২৬ সালে জানায় যে তারা হাজার হাজার হুইলচেয়ার সেবাদাতাকে প্রশিক্ষণ দিয়েছে। কাউন্টার ও শনাক্তযোগ্য কর্মীর কাছ থেকে সহায়তা নিন; গেটের বাইরে থেকে কেউ এগিয়ে এলে গ্রহণ করবেন না। [৫][৭]

যাত্রীর যাচাই (elderlyHaram): বর্তমান সার্ভিস পয়েন্ট, লেভেল ও খোলার ব্যবস্থা ওই দিনেই অ্যাপে বা কর্মীর কাছে যাচাই করুন। প্রকাশিত গেট নম্বর, স্ক্রিনশট বা গত মৌসুমের রুট আজকের ব্যবস্থা নয়। হ্যান্ডওভার পয়েন্টে দল একসঙ্গে থাকুন এবং কার্টের লাইন দীর্ঘ হলে কী করবেন তা আগে ঠিক করুন। অফিশিয়াল সার্ভিসের বাইরে কারও কাছ থেকে "গ্যারান্টেড" স্লট কিনবেন না।

৪. হোটেল ও আসল পথ কীভাবে বাছবেন?
এলাকার নাম accessibility-র নিশ্চয়তা নয়। "হারামের কাছে", "ক্লক টাওয়ার", "জাবাল ওমর" বা "মারকাজিয়া নর্থ" হলো সার্চ লেবেল; এর কোনোটিই ধাপবিহীন দরজা, চালু লিফট বা কম হাঁটার প্রমাণ নয়। লবি থেকে আপনি যে দরজা দিয়ে হারামে ঢুকবেন এবং যে সময়ে হাঁটবেন—সেই দূরত্বই আসল তথ্য।

হোটেলকে নির্দিষ্ট প্রশ্ন করুন এবং উত্তর লিখিত রাখুন:
- আমরা কোন দরজা ব্যবহার করব, সেখানে সিঁড়ি, র‍্যাম্প বা কার্ব আছে কি?
- লিফট কত চওড়া, আমাদের তারিখে চালু থাকবে কি, এবং রুম কি নিচতলায় লিফটের কাছে?
- মসজিদের প্রবেশপথ পর্যন্ত পথে ক্রসিং, ঢাল, বাধা বা সাময়িক বন্ধ আছে কি?
- অন্ধকারের পর ফেরার পথ কী, চত্বর ভিড় হলে কোথায় অপেক্ষা করব?
- বাথরুমে সিঁড়ি আছে কি, ধরার রেল বা ওয়াক-ইন শাওয়ার আছে কি?

মদিনায় মসজিদের অনেক গেট ও নামাজের এলাকা। "উত্তর দিকে" বলা হোটেল স্বয়ংক্রিয়ভাবে বয়স্ক নারীর নামাজের এলাকা বা রাওদার রিপোর্টিং পয়েন্টের সবচেয়ে কাছে নয়। নারীদের নামাজ ও অ্যাপয়েন্টমেন্টের বিস্তারিত নারী-বিষয়ক গাইডে, আর হোটেল, স্টেশন ও রেলের প্রশ্ন হোটেল ও হারামাইন গাইডে আছে। [৪]

হারামাইন হাই-স্পিড রেলে প্রকৃত স্টেশন, প্ল্যাটফর্ম, লিফট, লাগেজের নিয়ম ও দুই প্রান্তের ট্রান্সফার যাচাই করুন; প্রকাশিত রেলসীমা হোটেল ও রেল গাইডে আছে। দীর্ঘ সময় দাঁড়াতে না পারা বাবা-মার জন্য ছোট রেলযাত্রা সড়কপথের ট্রান্সফারের চেয়ে স্বয়ংক্রিয়ভাবে সহজ নয়।

যাত্রীর যাচাই (elderlyHotel): নির্দিষ্ট দরজা, রুম, লিফট ও ফেরার পথ আপনার তারিখের জন্য হোটেলের সঙ্গে নিশ্চিত করে লিখিত রাখুন। "হারামের কাছে" বা এলাকার নামকে access-এর প্রতিশ্রুতি হিসেবে নেবেন না। ট্রান্সফার বা হোটেল বুকিং মসজিদে হুইলচেয়ার প্রবেশ নিশ্চিত করে না, এবং এই পেজের জন্য কোনো রুম, রুট বা শাটল পরিদর্শন করা হয়নি।

৫. কোন স্বাস্থ্য প্রস্তুতি চিকিৎসকের সঙ্গে ঠিক করবেন?
হজ ও ওমরাহ মন্ত্রণালয় পরামর্শ দেয়: যাত্রার আগে চিকিৎসকের সঙ্গে দেখা করে স্বাস্থ্যগত অবস্থা স্থিতিশীল এবং ব্যক্তি আনুষ্ঠানিকতা পালনে শারীরিকভাবে সক্ষম কি না নিশ্চিত করুন; প্রয়োজনীয় টিকা যথেষ্ট আগে নিন, বিশেষত বয়স্ক ও দীর্ঘমেয়াদি রোগীদের ক্ষেত্রে; পর্যাপ্ত ওষুধ সঙ্গে নিন; এবং রোগ, ওষুধ ও ডোজ উল্লেখ করা মেডিকেল রিপোর্ট বহন করুন। তারা ডায়াবেটিস রোগীদের নিজের গ্লুকোজ মনিটর নিতে এবং দীর্ঘ যাত্রায় সময় সময় নড়াচড়া করতে বলে। [৪]

এটি সাধারণ হজ-পরামর্শ, আপনার বাবা-মার ফিটনেস সার্টিফিকেট নয়। কত ওষুধ নেবেন, কোনো ওষুধ সৌদি আরবে নিয়ন্ত্রিত কি না, কোনো ডিভাইস কেবিনে ব্যবহার করা যাবে কি না, ইনসুলিন কীভাবে সংরক্ষণ করবেন এবং আপনার বাবা-মার যাত্রা করা উচিত কি না—এগুলো প্রেসক্রাইবার ও এয়ারলাইনের সিদ্ধান্ত। এই পেজ ডোজ, দিনের সংখ্যা, সংরক্ষণ পদ্ধতি বা ট্রাভেল ইন্স্যুরেন্সের বিকল্প দেয় না।

এই যাচাইয়ে বর্তমান ১৪৪৮হি. স্বাস্থ্য-শর্ত প্রতিষ্ঠিত হয়নি। এই প্রকল্পে এর আগে দেখা স্বাস্থ্য উপকরণ ১৪৪৭হি./২০২৬ নির্দেশ করে। পুরোনো পিডিএফ, এজেন্সির লিফলেট বা এই পেজের ওপর ভরসা না করে যাত্রার কাছাকাছি সময়ে সৌদি স্বাস্থ্য মন্ত্রণালয় ও আপনার এয়ারলাইন আবার দেখুন।

মেডিকেল রিপোর্ট ও প্রেসক্রিপশন হ্যান্ডব্যাগেজে রাখুন, ওষুধ সম্ভব হলে নিজের মোড়কে রাখুন এবং একটি আলাদা কপি সঙ্গীর কাছে রাখুন। যে ওষুধে অনুমোদন লাগে তা চিকিৎসক ও এয়ারলাইনের সঙ্গে ঠিক করুন, এবং যাত্রার আগে নিয়ন্ত্রিত ওষুধের সৌদি কাস্টমস নিয়ম দেখুন। পাবলিক চ্যাটে প্রেসক্রিপশনের ছবি বা মেডিকেল রেকর্ড পোস্ট করবেন না।

যাত্রীর যাচাই (elderlyHealth): ফিটনেস, ওষুধ, ডিভাইস ও ইন্স্যুরেন্সের সিদ্ধান্ত চিকিৎসক ও অপারেটিং এয়ারলাইনের সঙ্গে নিন এবং কে কী অনুমোদন দিয়েছে লিখে রাখুন। এই লেখা বয়স্ক বাবা-মাকে যাত্রার জন্য ছাড়পত্র দিতে, ডোজ বদলাতে বা কোনো ওষুধ সৌদি আরবে প্রবেশ করতে পারবে বলে নিশ্চিত করতে পারে না। বর্তমান ১৪৪৮হি. স্বাস্থ্য-শর্ত এখানে প্রতিষ্ঠিত নয়, তাই ছাড়ার কাছাকাছি সময়ে অফিশিয়াল সূত্র আবার দেখুন।

৬. সচরাচর জিজ্ঞাসা
ঢাকা থেকে বয়স্ক বাবা-মার জন্য এয়ারলাইন হুইলচেয়ার কীভাবে চাইব?
বুকিংয়ের সময়ই, অথবা এয়ারলাইনের প্রকাশিত স্পেশাল-অ্যাসিস্ট্যান্স যোগাযোগে চাইুন এবং আপনার বাবা-মা কী করতে পারেন তার সঙ্গে মেলা ক্যাটাগরি বাছুন। বিমান বলছে বুকিংয়ের সময় জানানো বাধ্যতামূলক ও অন্তত ৪৮ ঘণ্টা আগে আবেদন করার পরামর্শ; সৌদিয়া ইলেকট্রিক হুইলচেয়ারের জন্য ৪৮ ঘণ্টা আগে জানানোর শর্ত দেয়। প্রতিটি ফ্লাইটের লিখিত নিশ্চিতকরণ নিন এবং কোনো চার্জ আছে কি না জিজ্ঞেস করুন। [২][৩]
নিজের হুইলচেয়ার সৌদি আরবে নেওয়া যাবে?
আগে অপারেটিং এয়ারলাইনের কাছে জিজ্ঞেস করুন। সৌদিয়া নিজের বিনামূল্যে চেকড ভাতার অতিরিক্ত হুইলচেয়ার ও সর্বোচ্চ দুইটি মোবিলিটি সামগ্রী—ইলেকট্রিক হুইলচেয়ারসহ—বিনামূল্যে বহনের কথা প্রকাশ করে। অন্য এয়ারলাইন নিজের শর্ত নির্ধারণ করে। মন্ত্রণালয় বলে হাজি হুইলচেয়ার নিয়ে মসজিদুল হারামে এসে নির্ধারিত প্রবেশপথ দিয়ে ব্যবহার করতে পারেন। [১][৪]
হুইলচেয়ার কি উড়োজাহাজের দরজায় ফেরত পাওয়া যাবে?
এটা ধরে নেবেন না। সৌদিয়া বলে মোবিলিটি সামগ্রী অবতরণের পর এয়ারপোর্টের প্রক্রিয়া অনুযায়ী ফেরত দেওয়া হয়—তা গেট বা ব্যাগেজ বেল্ট হতে পারে। চেক-ইনে জিজ্ঞেস করুন এবং দেরি হওয়ার সম্ভাবনা ধরে ট্রান্সফার পরিকল্পনা করুন। [১]
মসজিদুল হারামে কি বিনামূল্যে হুইলচেয়ার পাওয়া যায়?
হ্যাঁ। কর্তৃপক্ষ নির্দিষ্ট এলাকায় বিনামূল্যে ম্যানুয়াল হুইলচেয়ার সেবা প্রকাশ করে এবং তাদের সেবা পেজে পূর্ব ও পশ্চিম চত্বরের কথা আছে। বিজ্ঞপ্তিভেদে স্থান ও গেট নম্বর আলাদা হতে পারে, তাই ওই দিনে শনাক্তযোগ্য কর্মীর সঙ্গে যাচাই করুন। [৫][৬]
তাওয়াফ বা সাঈর জন্য ইলেকট্রিক কার্ট কীভাবে বুক করব?
কর্তৃপক্ষের তানাকুল প্ল্যাটফর্ম ব্যবহার করুন। ২০২৫ সালের মার্চে ম্যানুয়াল কার্ট বুকিং বন্ধ হয়েছে; কর্তৃপক্ষ ৬৫ বছরের বেশি বয়সীদের অনলাইনে বুকিংয়ের পরামর্শ দেয় এবং যারা বুক করতে পারেন না তাদের জন্য সার্ভিস পয়েন্ট রাখে। প্রতিবন্ধকতাযুক্ত ব্যক্তিরা সরাসরি সার্ভিস পয়েন্টে বিনামূল্যে যেতে পারেন। টিকিট ও আইডি নিন। [৬][৯]
কার্টে বয়স্ক বাবা-মার সঙ্গে পরিবারের কেউ বসতে পারবেন?
সার্ভিস পয়েন্টে বা বুকিংয়ে জিজ্ঞেস করুন। কে বসবে ও কে চালাবে তা অপারেটর নির্ধারণ করে; বিনামূল্যে সঙ্গীর আসন বা আত্মীয় চালাতে পারবেন—এমন প্রতিশ্রুতির ভিত্তি এই পেজে পাওয়া যায়নি। [৯]
বয়স্ক বাবা-মাকে কী কী মেডিকেল কাগজপত্র সঙ্গে দিতে হবে?
মন্ত্রণালয় পর্যাপ্ত ওষুধ এবং রোগ, ওষুধ ও ডোজ উল্লেখ করা মেডিকেল রিপোর্ট বহনের পরামর্শ দেয়; ডায়াবেটিস রোগীরা নিজের গ্লুকোজ মনিটর নেবেন। কতটুকু, কোন অনুমোদন ও সংরক্ষণ পদ্ধতি—তা আপনার চিকিৎসক ও এয়ারলাইনের কাছ থেকে নিতে হবে। [৪]`,
    references: [
      {
        name: "Saudia — Special baggage: wheelchairs, mobility aids and portable oxygen concentrators",
        nameBn: "সৌদিয়া — বিশেষ লাগেজ: হুইলচেয়ার, মোবিলিটি এইড ও পোর্টেবল অক্সিজেন কনসেনট্রেটর",
        url: "https://www.saudia.com/manage/baggage/special-baggage",
      },
      {
        name: "Saudia — Special assistance: wheelchair services and WCHR/WCHS/WCHC categories",
        nameBn: "সৌদিয়া — স্পেশাল অ্যাসিস্ট্যান্স: হুইলচেয়ার সেবা ও WCHR/WCHS/WCHC ক্যাটাগরি",
        url: "https://www.saudia.com/before-flying/special-assistance/special-care/travelling-for-people-with-a-disability/wheelchair-services",
      },
      {
        name: "Biman Bangladesh Airlines — Wheelchair assistance and request contacts",
        nameBn: "বিমান বাংলাদেশ এয়ারলাইন্স — হুইলচেয়ার সহায়তা ও আবেদনের যোগাযোগ",
        url: "https://www.biman-airlines.com/special-care/wheelchair-assistance",
      },
      {
        name: "Ministry of Hajj and Umrah — Things to remember: health advice, gates and using wheelchairs",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — মনে রাখার বিষয়: স্বাস্থ্য পরামর্শ, গেট ও হুইলচেয়ার ব্যবহার",
        url: "https://haj.gov.sa/en/Hajj/Things-To-Remember?id=3",
      },
      {
        name: "General Authority for the Care of the Grand Mosque and the Prophet's Mosque — mobility services",
        nameBn: "দুই পবিত্র মসজিদ পরিচর্যা ও ব্যবস্থাপনা কর্তৃপক্ষ — মোবিলিটি সেবা",
        url: "https://alharamain.gov.sa/public/?main_subject=nw&module=subj-ar&subject=subject_708051",
      },
      {
        name: "Saudi Press Agency — Grand Mosque golf cart bookings shift to digital (20 March 2025)",
        nameBn: "সৌদি প্রেস এজেন্সি — গ্র্যান্ড মসজিদের গলফ কার্ট বুকিং ডিজিটাল (২০ মার্চ ২০২৫)",
        url: "https://www.spa.gov.sa/en/N2285176",
      },
      {
        name: "Saudi Press Agency — Smart mobility system at the Two Holy Mosques (4 March 2026)",
        nameBn: "সৌদি প্রেস এজেন্সি — দুই পবিত্র মসজিদে স্মার্ট মোবিলিটি ব্যবস্থা (৪ মার্চ ২০২৬)",
        url: "https://www.spa.gov.sa/en/N2527804",
      },
      {
        name: "Saudi Press Agency — Free 24-hour wheelchair service and golf carts (9 August 2024)",
        nameBn: "সৌদি প্রেস এজেন্সি — ২৪ ঘণ্টার বিনামূল্যে হুইলচেয়ার সেবা ও গলফ কার্ট (৯ আগস্ট ২০২৪)",
        url: "https://www.spa.gov.sa/en/N2151450",
      },
      {
        name: "Saudi Press Agency — Tanaqol electric vehicle booking and service areas (14 May 2024)",
        nameBn: "সৌদি প্রেস এজেন্সি — তানাকুল ইলেকট্রিক ভেহিকল বুকিং ও সেবা এলাকা (১৪ মে ২০২৪)",
        url: "https://www.spa.gov.sa/en/N2102395",
      },
    ],
    internalLinks: [
      { text: "মক্কা ও মদিনার হোটেল জোন, রুম অ্যাক্সেস এবং হারামাইন ট্রেন", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "বাংলাদেশ থেকে সম্পূর্ণ DIY ওমরাহ ও নুসুক গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "নুসুক অ্যাপ ও রাওদা পারমিট ধাপে ধাপে", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "ঢাকা এয়ারপোর্টে বা ট্রানজিট ফ্লাইটে ইহরাম পরা", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "DIY ওমরাহ প্ল্যানিং পোর্টাল ও BDT ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "ভাঁজ করা হুইলচেয়ারসহ পরিবারের জন্য প্রাইভেট এয়ারপোর্ট ট্রান্সফার তুলনা করুন",
      body: "বাবা-মা হুইলচেয়ার ব্যবহার করলে এয়ারপোর্ট ট্যাক্সির সঙ্গে আগেভাগে বুক করা গাড়ি তুলনা করুন এবং টাকা দেওয়ার আগে গাড়ির আকার, ভাঁজ করা হুইলচেয়ার রাখার জায়গা, পিকআপে সহায়তা ও বাতিলের শর্ত নিশ্চিত করুন। ট্রান্সফার বুকিং এয়ারলাইনের হুইলচেয়ার সহায়তা বা মসজিদে প্রবেশ নিশ্চিত করে না।",
    },
  },

  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    title: "বাংলাদেশ থেকে ৯৬ ঘণ্টার Saudi Stopover: যোগ্যতা, বুকিং ও ওমরাহ",
    summary:
      "১৯ অক্টোবর ২০২৬-এ দেখা Saudia stopover sequence, সর্বোচ্চ ৯৬ ঘণ্টা, onward document ও checkout খরচের শর্ত। flynas-এর বর্তমান detailed eligibility যাচাই হয়নি; আলাদা Umrah/Rawdah permit ও সময়ের buffer দরকার। Universal approval, free hotel বা instant issuance-এর প্রতিশ্রুতি নয়।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৯ মিনিট পড়া",
    content: `কার জন্য: আন্তর্জাতিক onward journey-র মধ্যে সৌদিতে স্বল্প সময় থাকতে চান এমন বাংলাদেশি পাসপোর্টধারী—প্রবাসী পরিবার ও শিক্ষার্থীসহ। নিজের document, airline booking ও সময়ের সঙ্গে stopover মেলে কি না বুঝতে এই গাইড; এটি অনুমোদন বা সম্পন্ন বুকিংয়ের প্রতিবেদন নয়।

দ্রুত উত্তর
১৯ অক্টোবর ২০২৬-এ দেখা সূত্র অনুযায়ী Visit Saudi ওমরাহসহ সর্বোচ্চ ৯৬ ঘণ্টার stopover stay বর্ণনা করে; Saudia ফ্লাইট বুকিংয়ের সময় আবেদনের ধাপ প্রকাশ করেছে। ভিসা নিয়ে প্রবেশের মেয়াদ ও থাকার অনুমোদিত সময় এক নয়। টাকা দেওয়ার আগে নিজের passport, onward destination-এর অনুমতি, itinerary ও airline-এর শর্ত মিলিয়ে নিন; flight বা visa দিয়ে প্রবেশ কিংবা Nusuk appointment নিশ্চিত হয় না [১–২, ৪, ৯]। Redirect হওয়া guide থেকে flynas-এর বর্তমান বিস্তারিত যোগ্যতা যাচাই হয়নি। তাদের ৩০ জানুয়ারি ২০২৩-এর launch ঘোষণা পুরোনো প্রমাণ, বর্তমান checkout test নয় [৩, ১০]।

১. Stopover visa কী দেয়—আগে কী যাচাই করবেন?
Saudia-র নির্দিষ্ট transit page অনুযায়ী ইস্যু থেকে visa validity ৯০ দিন, থাকা সর্বোচ্চ ৯৬ ঘণ্টা, মেয়াদ বাড়ানো যায় না এবং প্রতি booking-এ একটি stopover trip। Visit Saudi Saudia offer-কে single entry ও তিন মাস validity বলে। প্রবেশের সময়সীমাকে তিন মাস থাকার অনুমতি ভাববেন না: ইস্যু হওয়া visa পড়ে নিজের অনুমোদিত entry ও departure time নিশ্চিত করুন [১–২]।

Saudia স্বীকৃত passport-এর অন্তত ছয় মাস মেয়াদ—প্রযোজ্য দ্বিপক্ষীয় চুক্তির শর্তসাপেক্ষে—confirmed onward ticket এবং প্রয়োজন হলে destination visa বা residence permission চায়; visa exemption থাকলে ব্যতিক্রম। চূড়ান্ত গন্তব্যের অনুমতি আর বিদেশি document দিয়ে Saudi tourist visa-র যোগ্যতা এক প্রশ্ন নয়। পাওয়া শর্ত থেকে সব বাংলাদেশির entitlement বা সব prior-visa requirement থেকে নিঃশর্ত ছাড় প্রমাণ হয় না [২]।

Saudia ও flynas আলাদাভাবে যাচাই করতে হবে। Saudia-র নির্দিষ্ট page-এ নিচের booking sequence আছে। flynas guide URL homepage-এ নিয়ে গেছে; public form-এ Stop Over Booking option দেখা গেছে, কোনো বাংলাদেশি যাত্রীর visa result নয়। খোলা flynas ঘোষণাটি ৩০ জানুয়ারি ২০২৩-এর। সেটি service launch ও ticket কেনার পরে আবেদনের কথা বলে; আজকের eligible destination, required foreign visa, price, refund rule বা application screen প্রমাণ করে না [৩, ১০]।

যাত্রীর যাচাই (stopoverEligibility): Flight কেনার আগে নিজের সুনির্দিষ্ট passport, onward destination ও entry document দিয়ে নির্বাচিত airline-কে stopover route নিশ্চিত করতে বলুন—qualifying visa বা residence লাগলে সেটিসহ। flynas-এর জন্য বর্তমান নির্দেশনা নিন; redirect হওয়া guide বা Saudia-র flow একই ধরে নেবেন না। Booking option দেখা মানে visa approval নয়। যোগ্যতা বা ticket কেনার পরে visa আবেদনের ঝুঁকি অস্পষ্ট হলে non-refundable payment-এর আগে official support-এ মিটিয়ে নিন। এখানে কোনো application বা booking test করা হয়নি; URAL/chat-এ passport scan, visa number বা credential পাঠাবেন না। [১–৩, ১০]

Visa ও hotel-এর বাজেটে কী রাখবেন?
Visit Saudi Saudia offer-এ promotional free visa-fee line-এর সঙ্গে application ও insurance charge প্রকাশ করে। প্রকাশিত উদাহরণ all-in quote নয়। Saudia বলছে visa fee, service charge, medical fee ও insurance cost Ministry of Foreign Affairs-এর বিধি অনুযায়ী হিসাব হয়। নিজের itemized checkout total, payment currency ও bank charge লিখে রাখুন; promotional starting price রূপান্তর করে বানানো BDT মোট নয় [১–২]।

Hotel সবার জন্য অন্তর্ভুক্ত—এমন যাচাই হয়নি। Saudia-র নির্দিষ্ট page বলছে hotel booking round-trip ও selected destination-এর জন্য; তা দিয়ে আপনার booking-এ free room প্রমাণ হয় না। কোনো inclusion দাবি থাকলে property, city, date, tax ও cancellation terms লিখিতভাবে নিন। তা না হলে নিজের accommodation-এর বাজেট রাখুন। এই যাচাইয়ে hotel voucher পরীক্ষা বা কোনো conditional promotion নেই—এমন সিদ্ধান্ত নেওয়া হয়নি [১–২]।

২. Saudia-তে stopover-এর আবেদন কীভাবে করবেন?
এটি Saudia-র প্রকাশিত sequence; flynas procedure বা login করা screen-এর test নয়। Ticket আগেই ইস্যু হলে visa আবেদন করা যাবে কি না এবং কীভাবে—carrier-কে জিজ্ঞেস করুন; new-booking flow পরে যোগ করা যাবে ধরে নেবেন না [২]।

Saudia-র page দ্রুত email issuance প্রচার করে; এই যাচাইয়ে timing test বা আপনার application-এর guaranteed processing deadline নিশ্চিত হয়নি। অতিরিক্ত check বা failure-এর জন্য সময় রাখুন; marketing promise ধরে সঙ্গে সঙ্গে departure পরিকল্পনা করবেন না [২]।

ধাপ ১: কেনার আগে onward journey ও stopover নিশ্চিত করুন।
- Passport, destination permission ও airline eligibility দেখুন। Airline-এর stopover booking flow-তে Saudi connection ও duration বাছুন। আলাদা কেনা flight leg যোগ্য বা এক journey হিসেবে সুরক্ষিত ধরে নেবেন না [২]।

ধাপ ২: প্রকৃত visa, fare ও cancellation terms পড়ুন।
- কোন যাত্রীর visa লাগবে, তারিখ, baggage ও hotel arrangement দেখুন। Visa দেরি বা refusal হলে ticket ও অন্য payment-এর কী হবে জিজ্ঞেস করুন; refund নিশ্চিত ভাববেন না [১–২]।

ধাপ ৩: Booking-এর সময় stopover visa request পূরণ করুন।
- Saudia আবেদনের জন্য Seats & Extras / Additional Services বলে। প্রকাশিত FAQ-তে photo ২০০ × ২০০ pixel ও সর্বোচ্চ ২০ KB; বর্তমান form আলাদা কিছু চাইলে সেই নির্দেশনা অনুসরণ করুন। এটি Saudia-র নির্দেশনা, flynas-এর সার্বজনীন photo specification নয় [২]।

ধাপ ৪: টাকা দেওয়ার আগে itemized total দেখুন।
- Saudia flight ও visa একসঙ্গে payment-এর কথা বলে। অনুমতি দেওয়ার আগে insurance, অন্য charge, currency ও terms দেখুন। Payment করা visa approval-এর প্রমাণ নয় [২]।

ধাপ ৫: ইস্যু হওয়া visa ও insurance document পরীক্ষা করুন।
- Saudia বলছে document email-এ আসে। Traveller, passport detail, entry count, validity ও permitted stay onward flight-এর সঙ্গে মিলিয়ে নিন; কিছু অনুপস্থিত বা অমিল হলে official visa service বা carrier support ব্যবহার করুন [২, ৫]।

ধাপ ৬: Permit ও departure logistics আবার নিশ্চিত করুন।
- Valid visa নিয়ে প্রযোজ্য Nusuk visitor process এবং available Umrah/Rawdah service অনুসরণ করুন। যাওয়ার আগে flight, transfer, accommodation, বর্তমান মৌসুমের health instruction ও প্রকৃত permit খুলতে পারছেন কি না দেখুন [৪, ৯]। Confirmation ও privacy check-এর জন্য পর্যালোচিত Nusuk guide পড়ুন।

৩. ব্যবহৃত US, UK বা Schengen visa কি একই route?
না। Onward itinerary-র stopover permission আর foreign visa বা residence-এর ভিত্তিতে tourist-visa exception আলাদা route। Main guide-এর পৃথক review-তে ব্যবহৃত standard nationality-only eVisa list-এ Bangladesh নেই। Main DIY guide-এ সূত্রসহ tourist/business prior-use ও permanent-residence category আছে; বর্তমান carrier, GCC ও accepted-entry-evidence-এর সীমাও বলা আছে [৬–৭]। বিকল্প route-এর জন্য সেই guide ও official checker দেখুন; যেকোনো student/work visa, residence card বা আগের trip দিয়েই automatic eligibility ভাববেন না। এই stopover review বিকল্প route-এর fine print নতুন করে যাচাই করেনি।

Visa permit নয়। Ministry Nusuk.sa-এর মাধ্যমে আলাদা Umrah ও Rawdah appointment service দেয়, যোগ্যতা ও availability সাপেক্ষে। Rawdah appointment আর মসজিদে নববীতে সাধারণ visit এক নয়; মসজিদের প্রতিটি নামাজে Rawdah permit লাগে—এমন দাবি করবেন না। Stopover visa হজের অনুমতি দেয় না [১, ৪, ৯]।

যাত্রীর যাচাই (stopoverPermits): দুই শহরের plan চূড়ান্ত করার আগে issued visa-র time window এবং আপনার জন্য প্রকৃত available Umrah ও আলাদা Rawdah appointment দেখুন। Flight booking দিয়ে slot বা entry নিশ্চিত হয় না। যে phone/network ব্যবহার করবেন তাতে booking-এর বর্তমান confirmation ও entry-code instruction অনুসরণ করুন; saved image প্রবেশের নিশ্চয়তা নয়। Trial slot নেবেন না বা OTP, passport detail কিংবা ব্যবহারযোগ্য QR code শেয়ার করবেন না। বর্তমান মৌসুমের health ও access restriction এখনও যাচাই করতে হবে। [১, ৪, ৯]

৪. চার দিনের plan-এ বাস্তবে কী রাখবেন?
নিচেরটি উদাহরণভিত্তিক সময় বণ্টন; tested connection বা ৯৬ ঘণ্টায় দুই শহর ঘোরার প্রতিশ্রুতি নয়। Confirmed onward flight থেকে উল্টো হিসাব করুন—immigration, baggage, station/airport transfer, check-in, rest ও disruption-এর সময় রেখে। চারটি calendar label নয়, issued visa-র অনুমোদিত window দিয়ে plan মেলে কি না দেখুন [২]।
- দিন ১: Ticketed stopover Jeddah হলেই সেখানে নামুন, confirmed Makkah accommodation-এ যান এবং available booked time-এ Umrah করুন। Slot বা transfer না মিললে arrival day-তেই শেষ হবে বলবেন না।
- দিন ২: Makkah-কে base রাখুন; পরিবারের সামর্থ্য অনুযায়ী বিশ্রাম ও ইবাদত করুন। Optional visit ওমরাহের অতিরিক্ত বাধ্যতামূলক কাজ নয়; guaranteed taxi tour ভরে দেবেন না।
- দিন ৩: Makkah-তে থাকুন, অথবা প্রকৃত train, luggage rule, hotel, appointment ও return/onward connection-এ পর্যাপ্ত সময় থাকলেই Madinah ভাবুন। Rawdah appointment আলাদা availability-র প্রশ্ন, itinerary-র নিশ্চিত অংশ নয়।
- দিন ৪: Onward departure-কে অগ্রাধিকার দিন। Ticketed departure airport-এ যথেষ্ট buffer রেখে ফিরুন; Jeddah flight-এর বদলে Madinah departure নেওয়া যাবে ধরে নেবেন না। সময় কম হলে extension-এর ওপর ভরসা না করে Madinah বাদ দিন।

Rail-এর প্রকৃত schedule, ticket terms ও fare operator-এর current booking-এ দেখুন; এই review-তে rail-এর নতুন দাম বা fixed journey time যাচাই হয়নি [৮]। Property access, intended gate, room occupancy ও shuttle-এর প্রশ্ন hotel/rail guide-এর কাজ; booking-এর আগে আসল property-তে নিশ্চিত করুন। দীর্ঘ independent trip-এর সঙ্গে তুলনায় Umrah hub worksheet-এ সত্যিকারের matched basket ব্যবহার করুন—অনুমান করা stopover saving নয়।

৫. সচরাচর জিজ্ঞাসা
৯৬ ঘণ্টার Saudi stopover visa-র খরচ কত?
Visit Saudi promotional Saudia line item প্রকাশ করে, আপনার all-in bill নয়। Saudia বলে MOFA বিধি অনুযায়ী charge হিসাব হয়। নিজের passenger ও itinerary-র itemized total এবং bank/payment charge ধরুন; এখানে বানানো BDT মোট বা flynas price নেই [১–২]।
Stopover visa-তে কি free hotel night থাকে?
সবার জন্য free-night entitlement যাচাই হয়নি। Saudia round-trip ও selected destination-এ hotel booking বলে। Booking-specific inclusion লিখিতভাবে নিশ্চিত করুন; তা না হলে আলাদা বাজেট রাখুন [১–২]।
সব বাংলাদেশি passport holder কি যোগ্য?
এই review তা প্রমাণ করে না। টাকা দেওয়ার আগে exact passport, itinerary, destination permission ও অন্য required document airline-এর সঙ্গে নিশ্চিত করুন। Saudia ও flynas একই নয়; redirect হওয়া flynas guide থেকে বর্তমান detailed conditions পাওয়া যায়নি [২–৩, ১০]।
Stopover-এ Umrah ও Rawdah visit করা যাবে?
Visit Saudi stopover activity-তে Umrah বলে, কিন্তু visa দিয়ে appointment নিশ্চিত হয় না। প্রযোজ্য আলাদা Umrah ও Rawdah service নিন; সাধারণ mosque visit আর Rawdah-তে প্রবেশ এক নয়। হজের জন্য নিজস্ব অনুমোদন লাগে [১, ৪, ৯]।
Payment-এর পরই কি visa ইস্যু হয়?
Saudia দ্রুত email delivery প্রচার করে, পুরোনো flynas launch-এও immediate issuance-এর কথা ছিল। কোনোটিই আপনার ক্ষেত্রে tested processing guarantee নয়। যাওয়ার আগে প্রকৃত issuance ও visa detail দেখুন; document না এলে carrier-কে জানান [২–৩, ৫]।
Onward ticket ও destination visa লাগবে?
Saudia-র প্রকাশিত শর্তে confirmed onward ticket ও প্রয়োজন হলে destination entry visa বা residence permission লাগে, exemption থাকলে ব্যতিক্রম; passport-এর অন্তত ছয় মাস মেয়াদও দ্বিপক্ষীয় চুক্তিসাপেক্ষে লাগে। এগুলো দিয়ে Saudi admission নিশ্চিত হয় না; চূড়ান্ত সিদ্ধান্ত passport control-এর [২]।`,
    references: [
      {
        name: "Visit Saudi — stopover campaign, Saudia offer and Nusuk note",
        nameBn: "Visit Saudi — stopover campaign, Saudia offer ও Nusuk নির্দেশনা",
        url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
      },
      {
        name: "Saudia — dedicated transit visa conditions and booking sequence",
        nameBn: "Saudia — নির্দিষ্ট transit visa শর্ত ও booking sequence",
        url: "https://www.saudia.com/transit-visa",
      },
      {
        name: "flynas — stopover launch, 30 January 2023 (historical)",
        nameBn: "flynas — stopover launch, ৩০ জানুয়ারি ২০২৩ (পুরোনো ঘোষণা)",
        url: "https://www.flynas.com/en/media-center/news-updates/stopover-visa",
      },
      {
        name: "Ministry of Hajj and Umrah — Umrah Permit Application",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — Umrah Permit Application",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "KSA Visa — official visa services (navigation)",
        nameBn: "KSA Visa — official visa service (navigation)",
        url: "https://ksavisa.sa",
      },
      {
        name: "Official tourist eVisa nationality list — see separate main-guide review",
        nameBn: "Official tourist eVisa nationality list — পৃথক main-guide review দেখুন",
        url: "https://visa.visitsaudi.com/",
      },
      {
        name: "Visit Saudi — official eligibility checker (personal result untested)",
        nameBn: "Visit Saudi — official eligibility checker (ব্যক্তিগত result পরীক্ষা হয়নি)",
        url: "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations",
      },
      {
        name: "Haramain railway — fare/booking navigation, not repriced in this review",
        nameBn: "Haramain railway — fare/booking navigation, এই review-তে নতুন দাম যাচাই হয়নি",
        url: "https://sar.hhr.sa/travel/fares",
      },
      {
        name: "Ministry of Hajj and Umrah — separate Rawdah permit service",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — আলাদা Rawdah permit service",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "flynas — public booking site, not personal eligibility evidence",
        nameBn: "flynas — public booking site, ব্যক্তিগত যোগ্যতার প্রমাণ নয়",
        url: "https://www.flynas.com/en",
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
      headline: "জেদ্দায় Nusuk ও transfer-এর জন্য data প্রস্তুত রাখুন",
      body: "যে phone-এ permit খুলবেন সেটি eSIM সমর্থন করে কি না দেখুন এবং coverage ও price তুলনা করুন। Paid data ঐচ্ছিক—visa, appointment বা entry নিশ্চিত করে না।",
    },
  },

  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    title: "বাংলাদেশিদের Nusuk ও Saudi Visa Bio গাইড: নিবন্ধন, বায়োমেট্রিক ও Rawdah পারমিট",
    summary:
      "বাংলাদেশি ভিজিটরের জন্য আবেদনভেদে Saudi Visa Bio, Nusuk নিবন্ধন এবং আলাদা ওমরাহ/Rawdah পারমিটের ধাপ। তারিখসহ বার্ষিক বুকিংয়ের নিয়ম, confirmation window ও entry code দেখুন—নির্দিষ্ট OTP দৈর্ঘ্য, সার্বজনীন স্ক্রিনশট নিষেধ বা পেইড ডেটার বাধ্যবাধকতা ছাড়া। প্রকাশিত অফিশিয়াল উৎস পর্যালোচনা: ১৯ অক্টোবর ২০২৬; লগইন করা অ্যাপ স্ক্রিন পরীক্ষা করা হয়নি।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১০ মিনিট পড়া",
    references: [
      {
        name: "Saudi Ministry FAQ — Umrah biometrics and visitor registration",
        nameBn: "সৌদি মন্ত্রণালয়ের FAQ — ওমরাহ বায়োমেট্রিক ও ভিজিটর নিবন্ধন",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Saudi Visa Bio — MOFA KSA official app listing",
        nameBn: "Saudi Visa Bio — MOFA KSA-এর অফিশিয়াল অ্যাপ listing",
        url: "https://play.google.com/store/apps/details?id=sa.gov.mofa.saudivisabio",
      },
      {
        name: "Saudi Ministry — Umrah Permit Application",
        nameBn: "সৌদি মন্ত্রণালয় — ওমরাহ পারমিট আবেদন",
        url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application",
      },
      {
        name: "Saudi Ministry — Rawdah Permit service",
        nameBn: "সৌদি মন্ত্রণালয় — Rawdah পারমিট সেবা",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Nusuk — Rawdah booking, confirmation and entry code (Arabic)",
        nameBn: "Nusuk — Rawdah বুকিং, confirmation ও entry code (আরবি)",
        url: "https://www.nusuk.sa/rawdah",
      },
      {
        name: "Nusuk services — visitor and Nafath login options",
        nameBn: "Nusuk সেবা — ভিজিটর ও Nafath login অপশন",
        url: "https://services.nusuk.sa/nusuk-svc/auth/login",
      },
      {
        name: "Nusuk Umrah — package-platform registration",
        nameBn: "Nusuk Umrah — প্যাকেজ প্ল্যাটফর্মের নিবন্ধন",
        url: "https://umrah.nusuk.sa/registration/signup",
      },
      {
        name: "Nusuk Umrah — package-platform Terms of Use",
        nameBn: "Nusuk Umrah — প্যাকেজ প্ল্যাটফর্ম ব্যবহারের শর্ত",
        url: "https://umrah.nusuk.sa/TermsOfUse",
      },
      {
        name: "Saudi Ministry — Nusuk access without data consumption (6 August 2025 announcement)",
        nameBn: "সৌদি মন্ত্রণালয় — ডেটা খরচ ছাড়া Nusuk ব্যবহার (৬ আগস্ট ২০২৫-এর ঘোষণা)",
        url: "https://haj.gov.sa/en/Media-Center/Ministry-News/Ministry-of-Hajj-and-Umrah-activates-the-Nusuk-application-without-internet-consumption-to-serve-the",
      },
      {
        name: "Saudi Ministry — current contact and support channels",
        nameBn: "সৌদি মন্ত্রণালয় — বর্তমান যোগাযোগ ও সহায়তা চ্যানেল",
        url: "https://haj.gov.sa/en/Contact-us",
      },
      {
        name: "Bangladesh Haj Management Portal — separate Hajj process",
        nameBn: "বাংলাদেশ হজ ব্যবস্থাপনা পোর্টাল — আলাদা হজ প্রক্রিয়া",
        url: "https://hajj.gov.bd/",
      },
    ],
    content: `এই গাইড কাদের জন্য: ঢাকা থেকে ওমরাহে যাওয়া বাংলাদেশি ভিজিটর, যাঁরা Saudi Visa Bio, Nusuk-এ ভিজিটর অ্যাকাউন্ট এবং ওমরাহ বা Rawdah পারমিটের ধাপ বুঝতে চান—কোনোটিকে ভিসা অনুমোদনের সঙ্গে গুলিয়ে না ফেলে।

সংক্ষিপ্ত উত্তর
১৯ অক্টোবর ২০২৬-এ দেখা সৌদি মন্ত্রণালয়ের FAQ বাংলাদেশকে ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah visa-র বায়োমেট্রিক নিবন্ধনের জন্য Saudi Visa Bio-তে তালিকাভুক্ত করে। নিজের আবেদনের নির্দেশনা অনুসরণ করুন; এটি প্রত্যেক ট্যুরিস্ট বা স্টপওভার যাত্রীর নিয়ম নয় [১–২]। Nusuk-এ ওমরাহ ও মদিনার Rawdah-এর পারমিট সেবা আলাদা। মন্ত্রণালয় Rawdah অ্যাপয়েন্টমেন্ট সেবা বিনামূল্যে বলে; Nusuk সাধারণ বুকিং বছরে একবার এবং কাছাকাছি থাকা ভিজিটরের জন্য প্রাপ্যতাসাপেক্ষ আলাদা Instant Track বর্ণনা করে—প্রতি ৩০ দিনে একটি পারমিট নয় [৩–৫]।

এটি প্রকাশিত অফিশিয়াল নির্দেশনার পর্যালোচনা; লগইন করা অ্যাপ অ্যাকাউন্ট পরীক্ষা বা মসজিদের গেটে সরেজমিন যাচাই নয়। স্ক্রিন ও শর্ত বদলাতে পারে। নিজের আবেদন, বুকিং ও পারমিটে দেখানো বর্তমান নির্দেশনা অনুসরণ করুন।

১. কোন Nusuk সেবা দরকার—আর সেটি কী করে না?
প্রযোজ্য ভিসা আবেদনের সময় বায়োমেট্রিক তথ্য জমা দেওয়ার জন্য Saudi Visa Bio। বায়োমেট্রিক সম্পন্ন হলেই ভিসা ইস্যু হয় না। মন্ত্রণালয়ের FAQ ইলেকট্রনিক Umrah visa-র জন্য বাংলাদেশের নাম বলে; MOFA-র অ্যাপ listing পাসপোর্টের তথ্য, মুখের ছবি ও আঙুলের ছাপের কথা জানায় [১–২]।

Nusuk অ্যাপ ও পারমিট সেবায় ওমরাহ অ্যাপয়েন্টমেন্ট এবং মদিনায় আলাদা Rawdah অ্যাপয়েন্টমেন্ট আছে। অ্যাকাউন্ট থাকা মানেই পারমিট ইস্যু হওয়া নয়, আর ওমরাহ পারমিট Rawdah অ্যাপয়েন্টমেন্ট নয় [৩–৫]। Nusuk সাধারণ মসজিদে নববীতে প্রবেশ ও Rawdah-এ প্রবেশকেও আলাদা করে; মসজিদে প্রতিবার যাওয়ার জন্য Rawdah অ্যাপয়েন্টমেন্ট লাগে ধরে নেবেন না [৫]।

যাত্রীর যাচাই (services): এগোনোর আগে ভিসা আবেদন, Nusuk অ্যাকাউন্ট, ওমরাহ পারমিট ও Rawdah অ্যাপয়েন্টমেন্ট আলাদা করতে পারছেন কি না দেখুন। এগুলো চারটি পৃথক কাজ। বাংলা বা ইংরেজি কোনো অংশ অস্পষ্ট হলে টাকা দেওয়া বা বুকিংয়ের আগে সংশ্লিষ্ট অংশ আবার পড়ুন, প্রয়োজনে অফিশিয়াল সহায়তা নিন।

Nusuk Umrah-এর প্যাকেজ বুকিং ওয়েবসাইট আরেকটি সেবার মাধ্যম। তার signup-এ বসবাসের দেশ, জাতীয়তা ও ইমেইল চাওয়া হয়। তালিকায় বাংলাদেশ থাকা মানে ভিসা অনুমোদন, শুধু ভিসার অফার বা পারমিট অ্যাপের স্ক্রিন নিশ্চিত হওয়া নয়। এই সাইটের শর্তে একাধিক সেবার প্যাকেজের কথা আছে [৭–৮]।

ফরজ হজের জন্য বাংলাদেশের আলাদা নিবন্ধন প্রক্রিয়া ও সৌদির বর্তমান হজ নির্দেশনা অনুসরণ করুন। এই অ্যাপ গাইড হজের যোগ্যতা, নিবন্ধনের শেষ তারিখ বা প্যাকেজের দাম নির্ধারণ করে না [১১]।

২. নিজের আবেদনে Saudi Visa Bio চাইলে কীভাবে এগোবেন?
অফিশিয়াল নির্দেশনায় বায়োমেট্রিক চাওয়া হলে ভিসা আবেদনের সময় এই ধাপ অনুসরণ করুন—সব যাত্রীর ভিসা ইস্যুর পরের কাজ হিসেবে নয়। মন্ত্রণালয়ের FAQ পাসপোর্ট স্ক্যান, মুখ যাচাই ও দশ আঙুলের ছাপের কথা বলে [১]। MOFA-র listing অনুযায়ী অ্যাপ ব্যবহারের বয়স ৬ বছর বা বেশি এবং ১৮ বছরের নিচে প্রাপ্তবয়স্কের তত্ত্বাবধান লাগে। এটি অ্যাপ ব্যবহারের শর্ত, শিশুর ভিসা বা বায়োমেট্রিক অব্যাহতির প্রমাণ নয় [২]।


যাত্রীর যাচাই (biometrics): আপনার আবেদন বা বায়োমেট্রিক গ্রহণ আমরা পরীক্ষা করিনি। শুরু করার আগে নিজের নির্দিষ্ট আবেদনে Saudi Visa Bio চাওয়া হয়েছে কি না নিশ্চিত করুন। বারবার ছবি গ্রহণে ব্যর্থ হলে অফিশিয়াল অ্যাপ বা আবেদন সহায়তায় নিজের ক্ষেত্রে প্রযোজ্য পরের পদ্ধতি জিজ্ঞাসা করুন। পরীক্ষার জন্য আবেদন তৈরি করবেন না। আঙুলের ছাপ, মুখের ছবি, পাসপোর্ট স্ক্যান বা আবেদনের তথ্য URAL বা চ্যাটে পাঠাবেন না।

ধাপ ১: আবেদনের নির্দেশনা ও অ্যাপের প্রকাশক মিলিয়ে নিন।
- নিজের ভিসা আবেদনে Saudi Visa Bio চাওয়া হয়েছে কি না দেখুন। Ministry of Foreign Affairs KSA প্রকাশিত অফিশিয়াল listing ব্যবহার করুন। বিজ্ঞাপন বা মেসেজের লিংক থেকে একই ধরনের নামের অ্যাপ ইনস্টল করবেন না [১–২]।

ধাপ ২: পাসপোর্ট ও আবেদনের তথ্য প্রস্তুত রাখুন।
- অ্যাপে চাওয়া পাসপোর্ট, আবেদনের তথ্য ও ইমেইল কাছে রাখুন। পাসপোর্টের ছবি ও যাচাইয়ের বর্তমান নির্দেশনা অনুসরণ করুন। আন্দাজে নম্বর বসাবেন না বা অননুমোদিত সহায়তাকারীকে পাসপোর্টের ছবি পাঠাবেন না [২]।

ধাপ ৩: অ্যাপের নির্দেশনায় মুখ ও আঙুলের ছবি নিন।
- মুখের ছবি ও আঙুলের ছাপ নেওয়ার ক্রম অ্যাপ অনুযায়ী অনুসরণ করুন; মন্ত্রণালয় দশ আঙুলের ছাপ নেওয়ার কথা বলে। একবার চার আঙুল স্ক্যান করলেই পুরো প্রক্রিয়া শেষ ধরে নেবেন না। স্ক্যান গ্রহণ করানোর জন্য অযাচাইকৃত ত্বক-পরিচর্যার কৌশল ব্যবহার করবেন না [১–২]।

ধাপ ৪: জমা দেওয়ার অবস্থা দেখুন; বারবার ব্যর্থ হলে অফিশিয়াল সাহায্য নিন।
- অ্যাপ ছাড়ার আগে সম্পন্ন হওয়ার বা ত্রুটির বার্তা পড়ুন। ছবি গ্রহণ করা মানেই ভিসা অনুমোদন নয়। বারবার ত্রুটি হলে অ্যাপের অফিশিয়াল listing-এর support এবং নিজের ভিসা আবেদনের অনুমোদিত সহায়তা চ্যানেলে যোগাযোগ করুন। নিজের আবেদনে পরের পদ্ধতি কী জেনে নিন; অব্যাহতি বা স্বয়ংক্রিয় বিকল্প ধরে নেবেন না [২]।

৩. বিদেশ থেকে ভিজিটর হিসেবে Nusuk-এ কীভাবে নিবন্ধন করবেন?
মন্ত্রণালয়ের FAQ অনুযায়ী বৈধ ভিসা থাকলে সৌদির বাইরে থেকেও ভিজিটর নিবন্ধন করা যায়। সেখানে পাসপোর্ট নম্বর, ভিসা নম্বর, জন্মতারিখ, জাতীয়তা, মোবাইল ও ইমেইল চাওয়ার কথা আছে; আন্তর্জাতিক ফোন নম্বরও সমর্থিত বলা হয়েছে [১]। সেবার প্রকাশ্য login-এ visitor, citizen/resident ও GCC অপশন এবং আলাদা Nafath অংশ আছে। সাধারণ ওয়েব নির্দেশনায় Nafath লেখা মানেই প্রত্যেক বিদেশি ভিজিটরকে সৌদি রেসিডেন্ট login নিতে হবে নয় [৩–৪, ৬]।

যাত্রীর যাচাই (registration): লগইন করা ভিজিটর স্ক্রিন স্বাধীনভাবে পরীক্ষা করা হয়নি। শুধু নিজের প্রকৃত যোগ্য অ্যাকাউন্ট ও বর্তমানে দেখানো ঘর ব্যবহার করুন। সমস্যা হলে অফিশিয়াল সহায়তার জন্য তারিখ, অ্যাপ/OS সংস্করণ, অ্যাকাউন্টের ধরন, ঘরের নাম ও যাচাইয়ের চ্যানেল লিখে রাখুন—কোডটি নয়। OTP, পাসওয়ার্ড, পাসপোর্ট বা ভিসার তথ্য শেয়ার করবেন না।

ধাপ ১: বৈধ ইস্যু হওয়া ভিসা ও মিল থাকা পাসপোর্ট রাখুন।
- Visa Number চাইলে ইস্যু হওয়া নথির ওই নামের ঘরের নম্বর ব্যবহার করুন। সব ভিসায় একই দৈর্ঘ্য, শুরুর সংখ্যা বা পাতার অবস্থান থাকে ধরে নেবেন না। নম্বর গ্রহণ না করলে নথির লেবেল মিলিয়ে অফিশিয়াল সহায়তা নিন; আন্দাজ করবেন না [১, ১০]।

ধাপ ২: নিজের প্রকৃত অবস্থার সঙ্গে মিল থাকা অ্যাকাউন্ট বাছুন।
- বিদেশি ভিজিটর অফিশিয়াল সেবার visitor অপশন ব্যবহার করবেন। প্রকৃত সৌদি রেসিডেন্ট নিজের অবস্থার উপযুক্ত পথ ব্যবহার করবেন; শুধু ঢাকা থেকে রওনা হওয়া অ্যাকাউন্টের ধরন নির্ধারণ করে না [১, ৬]।

ধাপ ৩: নথির সঙ্গে মিলিয়ে চাওয়া তথ্য লিখুন।
- পাসপোর্ট ও ভিসার তথ্য, জন্মতারিখ ও জাতীয়তা মিলিয়ে দিন। নিজের ব্যবহারযোগ্য ইমেইল ও মোবাইল নম্বর দিন। প্রকাশ্য FAQ এই তথ্যগুলোর কথা নিশ্চিত করে, অপরিবর্তনীয় মোবাইল-মেনুর বিন্যাস নয় [১]।

ধাপ ৪: দেখানো যাচাই শেষ করে অ্যাকাউন্টে ঢুকতে পারছেন কি না দেখুন।
- FAQ-এ ইমেইল verification code-এর কথা আছে। কোড কোথায় আসবে ও তার ধরন বর্তমান স্ক্রিন অনুযায়ী অনুসরণ করুন; নির্দিষ্ট দৈর্ঘ্য ধরে নেবেন না। কোড না এলে দেওয়া যোগাযোগের তথ্য ও ইমেইলের spam folder দেখুন; সমস্যা চললে অফিশিয়াল সাহায্য নিন। পারমিট দেওয়ার প্রস্তাব করা কাউকে OTP বা পাসওয়ার্ড দেবেন না [১, ১০]।

৪. Rawdah অ্যাপয়েন্টমেন্ট কীভাবে বুক, নিশ্চিত ও ব্যবহার করবেন?
মন্ত্রণালয়ের Rawdah সেবা পেজ বিনামূল্যের অ্যাপয়েন্টমেন্ট এবং উপলব্ধ তারিখ/সময় বেছে নেওয়ার কথা বলে। ১৯ অক্টোবর ২০২৬-এ দেখা Nusuk-এর Rawdah পেজে নিচের confirmation ও entry code-এর বিস্তারিত আছে [৪–৫]। এগুলো প্রকাশিত নির্দেশনা, আপনার অ্যাকাউন্টে স্লট পাওয়ার নিশ্চয়তা নয়।

ধাপ ১: ওমরাহ অ্যাপয়েন্টমেন্ট নয়, Rawdah সেবা বাছুন।
- Nusuk-এ Rawdah অ্যাপয়েন্টমেন্ট খুলে সঠিক যাত্রী এবং প্রযোজ্য পুরুষ বা নারীর সময়সূচি দেখুন। ওমরাহ পারমিট দরকার হলে আলাদা ওমরাহ সেবা ব্যবহার করুন [৩–৫]।

ধাপ ২: আবার যাওয়ার পরিকল্পনার আগে পুনরায় বুকিংয়ের যোগ্যতা দেখুন।
- Nusuk সাধারণ Rawdah বুকিং বছরে একবার এবং আবার যাওয়ার জন্য কাছাকাছি থাকা ভিজিটরের আলাদা Instant Track বর্ণনা করে। বর্তমান সেবাই আপনার যোগ্যতা ও খালি অ্যাপয়েন্টমেন্ট নির্ধারণ করে। ভিসা থাকা বা কাছে উপস্থিত থাকা—কোনোটিই স্লটের নিশ্চয়তা নয় [৫]।

ধাপ ৩: খালি অ্যাপয়েন্টমেন্ট বা দেখানো বিকল্প বেছে নিন।
- উপলব্ধ তারিখ/সময় বাছুন। উপযুক্ত সময় না পেলে নিজের ক্ষেত্রে দেখানো হলে waitlist বা কাছাকাছি থাকা ভিজিটরের Instant Track দেখুন। স্ক্রিনের location নির্দেশনা অনুসরণ করুন; ভুয়া location ব্যবহার করবেন না। নির্দিষ্ট সাপ্তাহিক রিলিজ দিন ধরে নেবেন না বা নিশ্চিত প্রবেশের প্রতিশ্রুতিতে কাউকে টাকা দেবেন না [৪–৫]।

ধাপ ৪: দেখানো সময়সীমার মধ্যে উপস্থিতি নিশ্চিত করুন।
- ১৯ অক্টোবর ২০২৬-এর উৎস যাচাইয়ে Nusuk জানায়, visit-এর ৪৮ ঘণ্টা আগে confirmation খোলে এবং ২ ঘণ্টা আগে বন্ধ হয়। নিশ্চিত করার পর একবার ব্যবহারযোগ্য entry QR দেখা যায় বলা হয়েছে। নিজের বুকিংয়ের বর্তমান deadline ও confirmation status দেখুন; প্রাথমিক reservation হলেই প্রক্রিয়া শেষ নয় [৫]।

যাত্রীর যাচাই (rawdah): আপনার অ্যাকাউন্টে সরাসরি বুকিং পরীক্ষা করা হয়নি। সত্যিই যে অ্যাপয়েন্টমেন্টে যাবেন, তার দেখানো confirmation deadline, নিশ্চিত হওয়ার অবস্থা, entry code পাওয়া যাচ্ছে কি না এবং পুনরায় ভিজিট বা Instant Track-এর যোগ্যতার বার্তা দেখুন। পরীক্ষার জন্য স্লট নেবেন না, ভুয়া বুকিং বা location ব্যবহার করবেন না এবং ব্যবহারযোগ্য QR/barcode শেয়ার করবেন না।

ধাপ ৫: হোটেল ছাড়ার আগে entry code ও রিপোর্ট করার নির্দেশনা দেখুন।
- Nusuk-এ ইস্যু হওয়া পারমিট ও নির্ধারিত entry code খুলুন। দেখা পেজে ৩০ মিনিট আগে পৌঁছাতে বলা হয়েছে। পুরোনো গেট নম্বর নয়, নিজের বুকিংয়ের reporting point ও কর্মীদের নির্দেশনা অনুসরণ করুন। সেভ করা ছবি ব্যাকআপ, প্রবেশের নিশ্চয়তা নয়; সেটি বর্তমান permit display-এর বিকল্প ধরে নেবেন না [৫]।

Nusuk ব্যবহারের জন্য কি eSIM কিনতেই হবে?
দেখা উৎসগুলোতে পেইড eSIM কেনা বাধ্যতামূলক প্রতিষ্ঠিত হয়নি। ৬ আগস্ট ২০২৫-এর ঘোষণায় মন্ত্রণালয় সৌদির ভেতরে SIM ব্যবহারকারীদের জন্য STC, Mobily ও Zain-এর সহযোগিতায় ডেটা খরচ ছাড়া Nusuk ব্যবহারের কথা বলেছে। এতে প্রত্যেক travel eSIM, roaming সংযোগ বা ফোনে একই সুবিধার নিশ্চয়তা মেলে না [৯]।

ব্যবহারিক প্রস্তুতি হিসেবে প্রয়োজনের আগেই নিজের ফোন ও নেটওয়ার্কে অ্যাপ খুলছে কি না দেখুন। মানচিত্র, মেসেজ ও অন্য বুকিংয়ে আলাদা ডেটা প্ল্যান কাজে লাগতে পারে; কেনার আগে compatibility, coverage, activation ও দাম দেখুন। পারমিট দেখা না গেলে বা login না হলে বিক্রেতার কৌশলে নির্ভর না করে Nusuk help বা মন্ত্রণালয়ের বর্তমান contact page ব্যবহার করুন [১০]।

যাত্রীর যাচাই (network): আপনার ফোন বা অপারেটরে প্রবেশ স্বাধীনভাবে পরীক্ষা করা হয়নি। অ্যাপয়েন্টমেন্টে রওনা হওয়ার আগে যে ফোন ও প্রকৃত Saudi SIM, roaming বা travel eSIM ব্যবহার করবেন, তাতেই ইস্যু হওয়া পারমিট খুলে দেখুন। না খুললে অফিশিয়াল সহায়তা নিন। নিজের provider-এ বিনা ডেটা খরচের সুবিধা আছে বা সংরক্ষিত screenshot প্রবেশ নিশ্চিত করে—ধরে নেবেন না। পেইড ডেটা প্ল্যান ঐচ্ছিক, পারমিটের শর্ত নয়।

৫. সচরাচর জিজ্ঞাসা
Saudi Visa Bio কি প্রত্যেক বাংলাদেশি যাত্রীর জন্য বাধ্যতামূলক?
মন্ত্রণালয়ের FAQ বাংলাদেশকে ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah visa-র বায়োমেট্রিক নিবন্ধনের জন্য বলে। নিজের বর্তমান আবেদনের নির্দেশনা অনুসরণ করুন; এতে প্রত্যেক ট্যুরিস্ট বা স্টপওভার ভিসার সার্বজনীন নিয়ম প্রতিষ্ঠিত হয় না [১–২]।
প্রতি ৩০ দিনে কি Rawdah বুক করা যায়?
মাসিক অধিকার ধরে পরিকল্পনা করবেন না। ১৯ অক্টোবর ২০২৬-এ দেখা Nusuk পেজ সাধারণ বুকিং বছরে একবার এবং কাছাকাছি থাকা ভিজিটরের আলাদা Instant Track বলে। বর্তমান যোগ্যতা ও ধারণক্ষমতার শর্তও প্রযোজ্য [৫]।
Rawdah reservation কি নিশ্চিত করতে হয়?
দেখা Nusuk পেজে visit-এর ৪৮ ঘণ্টা আগে attendance confirmation খোলা এবং ২ ঘণ্টা আগে বন্ধ হওয়ার কথা আছে। নিশ্চিত করার পর একবার ব্যবহারযোগ্য entry QR পাওয়া যায়। নিজের বুকিংয়ে দেখানো deadline ও status অনুসরণ করুন [৫]।
প্রতি সপ্তাহে নিশ্চিত স্লট-রিলিজ দিন আছে কি?
দেখা মন্ত্রণালয়ের সেবা পেজে উপলব্ধ তারিখ/সময় বেছে নিতে বলা হয়; নির্দিষ্ট সাপ্তাহিক রিলিজ দিন নেই। Nusuk waitlist ও কাছাকাছি থাকা ভিজিটরের Instant Track বলে, কিন্তু কোনোটি অ্যাপয়েন্টমেন্ট নিশ্চিত করে না [৪–৫]।
গেটে শুধু স্ক্রিনশটের ওপর নির্ভর করা যাবে?
Nusuk-এ ইস্যু হওয়া পারমিট ও entry code দেখার ব্যবস্থা রাখুন এবং বর্তমান display নির্দেশনা অনুসরণ করুন। সেভ করা ছবি প্রবেশের নিশ্চয়তা নয়। দেখা উৎসে সব ক্ষেত্রে স্ক্রিনশট বাতিলের সার্বজনীন নিয়ম প্রতিষ্ঠিত হয়নি [৫]।
Nusuk-এর জন্য কি পেইড মোবাইল ডেটা লাগে?
সব ক্ষেত্রে নয়। মন্ত্রণালয়ের ৬ আগস্ট ২০২৫-এর ঘোষণা সৌদিতে নির্দিষ্ট অপারেটরের সহযোগিতায় ডেটা খরচ ছাড়া Nusuk ব্যবহারের কথা বলে। নিজের SIM/eSIM, নেটওয়ার্ক ও ফোন যাচাই করুন। সব provider অন্তর্ভুক্ত বা ডেটা কিনলেই অ্যাপ চলা নিশ্চিত ধরে নেবেন না [৯]।
Nusuk নিবন্ধন ও ভিসা অনুমোদন কি একই?
না। ভিসা আবেদন ও ইস্যু হওয়া ভিসা, অ্যাকাউন্ট নিবন্ধন, ওমরাহ পারমিট এবং Rawdah অ্যাপয়েন্টমেন্ট আলাদা রাখুন। প্রতিটি সেবার যোগ্যতা ও নির্দেশনা অনুসরণ করুন; প্যাকেজ-প্ল্যাটফর্মে signup পারমিট ইস্যু নয় [১–৮]।
ভিসা নম্বর গ্রহণ না করলে বা পারমিট না দেখালে কোথায় সাহায্য পাব?
আবেদনের নিজস্ব support বা মন্ত্রণালয়ের বর্তমান contact page ব্যবহার করুন। ১৯ অক্টোবর ২০২৬-এ দেখা পেজে +966 920002814 এবং সৌদির ভেতরে 1966 আছে। অনুমোদিত সহায়তা চ্যানেলেই ব্যক্তিগত তথ্য দিন; প্রকাশ্য পোস্ট বা অননুমোদিত পারমিট বিক্রেতাকে নয় [১০]।
`,
    internalLinks: [
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "নারীদের ওমরাহ ভ্রমণ ও Rawdah-এ প্রবেশের নির্দেশনা", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "hajj.gov.bd পোর্টালে সরকারি ও বেসরকারি হজ নিবন্ধন", path: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost" },
      { text: "নিজের কোটেশন দিয়ে BDT ওমরাহ বাজেট হিসাব", path: "/umrah" },
      { text: "রমজান ওমরাহ ও ইতিকাফ: বুকিং ও মৌসুমের নিয়ম", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "মানচিত্র ও মেসেজের জন্য ঐচ্ছিক সৌদি ডেটা প্ল্যান তুলনা করুন",
      body: "eSIM কেনা Nusuk পারমিটের শর্ত নয়। ফোনের compatibility, provider coverage, activation-এর শর্ত ও চূড়ান্ত দাম দেখুন; নিজের নেটওয়ার্কে সেবা ভিন্ন হতে পারে।",
    },
  },

  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    title: "নারীদের ওমরাহ: মাহরাম, ভিসা, Rawdah ও ইহরাম যাচাই (২০২৬)",
    summary:
      "১৯ অক্টোবর ২০২৬-এর source review: মাহরাম ছাড়া Umrah-এর Ministry উত্তরকে route/age eligibility ও ব্যক্তিগত ধর্মীয় পরামর্শ থেকে আলাদা করুন। Actual Rawdah booking, hotel route, Ihram, মাসিকের contingency ও private Taqsir check; universal gate, safe route বা personal ruling নয়।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১১ মিনিট পড়া",
    content: `এই গাইড বাংলাদেশি নারীদের জন্য, যারা একা, পরিবারের সঙ্গে বা দলে ওমরাহ পরিকল্পনা করছেন। তিনটি সিদ্ধান্ত আলাদা রাখুন: নিজের visa route-এ সফরটি করা যাবে কি না, ব্যক্তিগত ধর্মীয় নির্দেশনা কী এবং বাস্তবে নামাজ, appointment ও যাতায়াতের ব্যবস্থা কীভাবে করবেন। এটি ব্যক্তিগত ফতোয়া, চিকিৎসা পরামর্শ, পরীক্ষিত visa application বা সরেজমিনে দেখা mosque-to-hotel route নয়।

দ্রুত উত্তর — ১৯ অক্টোবর ২০২৬-এ দেখা তথ্য: হজ ও ওমরাহ মন্ত্রণালয় সরাসরি বলেছে, নারী মাহরাম ছাড়া ওমরাহ করতে আসতে পারেন। এতে প্রত্যেক নারী, শিশু বা বাংলাদেশি passport holder সব visa route-এ eligible প্রমাণ হয় না। ধর্মীয় পরামর্শ আলাদা। Nusuk সাধারণ mosque prayer ও Rawdah appointment আলাদা করেছে এবং নারী-পুরুষের visit time ভিন্ন বলেছে; স্থায়ী gate map বা hotel-area promise নয়, নিজের booking ও staff direction অনুসরণ করুন। [1][2][3][5]

১. মাহরাম ছাড়া সফর করা যাবে—তবু কোন ভিসার শর্ত প্রযোজ্য?
মন্ত্রণালয়ের FAQ-এ “Is a woman allowed to come to perform Umrah without a mahram?” প্রশ্নের উত্তর “Yes, it is allowed.” এটি ওই নির্দিষ্ট administrative উত্তরকে সমর্থন করে। Automatic visa issuance, minor-এর independent travel, প্রত্যেক nationality-এর tourist eVisa eligibility বা নির্দিষ্ট stopover itinerary-এর condition প্রতিষ্ঠা করে না। Hajj registration আলাদা বিষয়। [1]

Tourist eVisa service-এর official terms-এ user/applicant অন্তত ১৮ বছর এবং minor-এর হয়ে আবেদন করলে authorized representation বলা আছে। খোলা nationality-based permitted-country list-এ Bangladesh নেই। এতে additional-document বা residence route-সহ প্রত্যেক বাংলাদেশি সবভাবে ineligible প্রমাণ হয় না: নিজের পরিস্থিতির জন্য main DIY guide ও আসল official route দেখুন। Terms-এ payment approval নিশ্চিত করে না এবং visa entry নিশ্চিত করে না-ও বলা আছে। সেখানে থাকা ২০২৫ সালের seasonal clause ১৪৪৮-এর travel calendar নয়। [2]

Visa permission ব্যক্তিগত ধর্মীয় ফতোয়া নয়। উদাহরণ হিসেবে Jordan-এর General Iftaa Department-এর ৩০ জুলাই ২০২৩-এর fatwa 3785-এ ভিন্ন reasoning ও condition, obligatory বনাম non-obligatory travel এবং safety আলোচনা আছে। ওই conditional আলোচনা থেকে প্রত্যেক voluntary trip-এর blanket permission বানাবেন না বা visa portal-কে নিজের মাজহাবের ফিকহি কর্তৃপক্ষ ধরবেন না। নিজের journey, companion ও intention বিশ্বস্ত যোগ্য আলেমের সঙ্গে আলোচনা করুন। [3]

যাত্রীর যাচাই (womenVisa): Non-refundable payment-এর আগে responsible official channel ও carrier-এর কাছে visa category, passport/residence বা additional-document basis, age এবং companion/minor arrangement নিশ্চিত করুন। ধর্মীয় পরামর্শ আলাদা নিন; mahram field না থাকা বা seller-এর আশ্বাস approval নয়। Blog-এর universal employer-NOC rule নয়, আসল document checklist অনুসরণ করুন। Public chat-এ passport scan, OTP বা ব্যবহারযোগ্য booking code দেবেন না।

নিজের route-এ প্রযোজ্য check-এর জন্য issued visa এবং আসল flight, accommodation ও transport confirmation ব্যক্তিগতভাবে রাখুন। Employer, authority বা carrier NOC বা child-travel document চাইলে সেই requirement অনুযায়ী ব্যবস্থা করুন; এখানে সবার জন্য NOC requirement—বা exemption—প্রতিষ্ঠিত নয়। বড় visa/season, biometrics ও current travel-health check main DIY ও Nusuk guide-এর কাজ; এই women-specific review সেগুলো certify করে না।

২. আসলে কোন নামাজের প্রবেশপথ ও হোটেলের পথ ব্যবহার করবেন?
Nusuk মসজিদে নববীতে নারী-পুরুষের আলাদা নামাজের জায়গা এবং সাধারণ mosque entry-কে Rawdah entry থেকে পৃথক করেছে; সাধারণ প্রবেশে Rawdah appointment লাগে না। নারীদের prayer entrance আপনা থেকেই Rawdah booking-এর reporting point নয়। নিজের প্রয়োজনীয় service অনুযায়ী current sign ও mosque staff-এর নির্দেশনা মানুন। এটি mosque entry নিয়ে ব্যক্তিগত ধর্মীয় প্রশ্নের ওপর প্রাধান্য পায় না। [5]

Markazia North বা অন্য এলাকার নাম search label হিসেবে নিন; flat, step-free বা ছোট পথের guarantee হিসেবে নয়। আসল hotel-এর কাছে entrance, নারীদের prayer area বা assigned reporting point-এর পথ, crossing, step, gradient, সচল lift, temporary closure ও ফেরার পথ জিজ্ঞেস করুন। Shuttle থাকলে stop, operating arrangement এবং নিজের party ও mobility equipment নেওয়া যাবে কি না নিশ্চিত করুন। এই review-তে outdoor route, gate number, room বা shuttle সরেজমিনে পরীক্ষা হয়নি।

যাত্রীর যাচাই (womenAccess): Non-refundable room বাছার আগে property ও সংশ্লিষ্ট on-site staff-এর কাছে নিজের date ও mobility need অনুযায়ী intended entrance ও পুরো route নিশ্চিত করুন। Internal door, courtyard gate ও appointment assembly point আলাদা করুন। Room access, lift এবং কার্যকর return/meeting plan জিজ্ঞেস করুন; “হারামের কাছে” বা পুরো এলাকার accessibility promise-এর ওপর নির্ভর করবেন না। Transfer booking mosque access প্রতিষ্ঠা করে না।

Controlled entry route-এর বাইরে meeting point, companion-এর সঙ্গে যোগাযোগের উপায় এবং আলাদা হয়ে গেলে বা entrance বদলালে বিকল্প ঠিক করুন। Hotel address ও support contact ব্যক্তিগতভাবে খুলতে পারার ব্যবস্থা রাখুন। বিস্তারিত room, transfer ও আসল baggage comparison hotel/Haramain guide-এর কাজ; এই page older-traveller guide-এর medical বা equipment claim নতুন করে certify করে না।

৩. নারীরা RAWDAH APPOINTMENT-এর প্রস্তুতি কীভাবে নেবেন?
মন্ত্রণালয় visitor-সহ নারী-পুরুষের জন্য free Rawdah appointment service, available date/time বাছার ব্যবস্থা বলেছে। Nusuk-এর detailed page নারী-পুরুষের ভিন্ন visit time নিশ্চিত করে। Blog-এর recurring morning/evening window ধরে trip বানাবেন না বা hotel booking-এ slot মিলে যায় ভাববেন না। Published procedure tested account session নয়। [4][5]

খোলা Nusuk page annual regular booking এবং কাছাকাছি অবস্থানের জন্য availability-সাপেক্ষ আলাদা Instant Track বলে; পুরোনো Ministry FAQ-এ এখনো ৩০ দিন লেখা। Monthly revisit বা guaranteed same-day slot-এর promise করবেন না। Nusuk children-এর Rawdah entry নিষিদ্ধও বলেছে; সাধারণ mosque visit ও advertised childcare আলাদা। FAQ-এর পুরোনো age wording child-entry promise নয়। Childcare place, age acceptance বা family/group appointment পরীক্ষা হয়নি। [1][5]

যাত্রীর যাচাই (womenRawdah): বের হওয়ার আগে নিজের booking-এ actual women's service, eligibility, appointment, confirmation instruction ও reporting point দেখুন। Companion বা child থাকলে প্রত্যেকের acceptance এবং care-এর দায়িত্ব কার নিশ্চিত করুন; সব family member একসঙ্গে ঢুকবেন বা advertised childcare booked ধরে নেবেন না। Guaranteed slot কিনবেন না বা practice reservation করবেন না। Password, OTP ও ব্যবহারযোগ্য entry QR code গোপন রাখুন; booking ও public guidance বিরোধ হলে official support নিন।

ধাপ ১: নিজের আসল status-এর account route ব্যবহার করুন।
Foreign visitor বৈধ issued visa দিয়ে current visitor registration instruction অনুসরণ করবেন। Ministry service page-এর Nafath wording দিয়ে visitor-কে Saudi resident account পেতে হবে প্রমাণ হয় না। Reviewed Nusuk guide-এ registration ও application-specific biometrics আলাদা আছে। [1][4]

ধাপ ২: যে available women's appointment-এ সত্যিই যেতে পারবেন, সেটি বাছুন।
Applicable Rawdah service ও offered date/time বাছুন; included person ও travel arrangement মিলিয়ে নিন। নারী-পুরুষের visit time ভিন্ন; নিজের appointment দেখে companion-এর appointment ধরে নেবেন না। Availability guaranteed নয়। [4][5]

ধাপ ৩: Actual booking অনুযায়ী প্রয়োজনীয় confirmation শেষ করুন।
Nusuk visit-এর ৪৮ ঘণ্টা আগে থেকে ২ ঘণ্টা আগ পর্যন্ত attendance confirmation প্রকাশ করেছে; confirmation-এর পরে one-use entry QR আসে। Group guidance-এ organizer-কে confirmation-এর দায়িত্ব দিয়েছে। Unconfirmed reservation বা শুধু saved screenshot নয়, নিজের booking-এর current instruction অনুসরণ করুন। [5]

ধাপ ৪: Reporting point আবার মিলিয়ে current instruction অনুযায়ী পৌঁছান।
Public Nusuk page entry code নিয়ে appointment-এর ৩০ মিনিট আগে পৌঁছাতে বলে। নিজের notice পড়ে journey ও assistance-এর জন্য অতিরিক্ত সময় রাখুন এবং staff direction মানুন। এই arrival advice মাপা hotel walking time বা পুরোনো gate number ব্যবহারের permission নয়। [5]

৪. নারীদের ইহরামের পোশাক নিয়ে কী যাচাই করবেন?
নারীদের Ihram clothing নিয়ে নিজের published উত্তরে Shaykh Ibn Baz বলেছেন, নারীদের বিশেষ Ihram uniform নেই; সাধারণ অনাকর্ষণীয় পোশাক ব্যবহার করা যায়। নির্দিষ্ট colour বা পুরুষের two-cloth outfit-কে নারীর universal requirement ভেবে কিনবেন না। Travel ও worship-এ নিজে সামলাতে পারবেন এমন modest clothing রাখুন; নিজের coverage-এর প্রশ্ন যোগ্য আলেমের কাছে মিটিয়ে নিন। [6]

Sahih al-Bukhari 1838-এ Ihram অবস্থায় নারী niqab বা gloves পরবেন না—এ নির্দেশ আছে। এটি ধর্মীয় text; mosque-এর administrative dress notice বা medical-mask ruling নয়। কাপড় ত্বকে লাগছে কি না—এমন loophole বানাবেন না, বা visor বা sheer scarf-কে approved solution ভাববেন না। [7]

যাত্রীর যাচাই (womenIhram): Ihram-এ প্রবেশের আগে নিজের অনুসৃত মাজহাব অনুযায়ী intended clothing, face covering, footwear ও medical need নিয়ে যোগ্য আলেমকে জিজ্ঞেস করুন। এই article face-covering workaround দেয় না, necessity diagnose করে না বা penalty ঠিক করে না। Practical বা clinical requirement আলাদা মেটান; visa বা Rawdah appointment দিয়ে এসব প্রশ্ন মেটে না।

৫. মাসিক আপনার সফর বা ইবাদতের পরিকল্পনায় প্রভাব ফেললে কী করবেন?
Sahih al-Bukhari 305-এ Aisha-র Hajj-এর বর্ণনায় পবিত্র হওয়া পর্যন্ত Tawaf না করার নির্দেশ আছে। এটি ওই নির্দিষ্ট ধর্মীয় বিষয়ের source; Umrah journey-এর প্রতিটি stage, irregular bleeding বা mosque/Rawdah entry নিয়ে ব্যক্তিগত সিদ্ধান্ত নয়। Booked appointment বা কাছাকাছি flight নিজে থেকেই ritual permission নির্ধারণ করে না। [8]

যাত্রীর যাচাই (womenHealth): Bleeding শুরু হলে বা date worship-এর সঙ্গে না মিললে কোন rite শেষ করেছেন ও travel constraint কী—যোগ্য আলেমকে ব্যক্তিগতভাবে জানান; health বা medication প্রশ্নে clinician-এর পরামর্শ নিন। Ihram পিছিয়ে দিতে বা আপনা থেকে ছাড়তে পারবেন ধরে না নিয়ে travel বা Miqat-এ পৌঁছানোর আগে guidance নিন। Blog দেখে period-delay medication শুরু বা পরিবর্তন করবেন না। এখানে personal exception, dosage বা current 1448 travel-health clearance প্রতিষ্ঠিত নয়।

বাস্তব contingency রাখুন: কার সঙ্গে যোগাযোগ করবেন, ticket/hotel change condition কী এবং plan বদলালে কী support পাবেন জানুন। Public group বা booking intermediary-কে menstrual detail জানানোর দরকার নেই। Itinerary-তে change মানানো কঠিন হলে ritual shortcut বানানো বা seller-এর promise-এর বদলে দ্রুত case-specific advice নিন।

৬. পদ্ধতি আন্দাজ না করে ব্যক্তিগতভাবে তাকসীরের ব্যবস্থা কীভাবে করবেন?
Nusuk-এর Umrah Journey page Tawaf ও Sa'i-এর পরে hair cutting রেখেছে, নারীর hair end থেকে ১–২ সেমি কাটার example দেয় এবং residence-এ ফেরা পর্যন্ত cutting পিছানো যেতে পারে, তবে Ihram restriction চলবে বলেছে। Sunan Abi Dawud 1985-এ নারীদের shaving নয় clipping-এর কথা আছে। এগুলো attributed source statement; প্রত্যেক মাজহাবের minimum amount বা layered/short hair-এর treatment এই site ঠিক করছে না। [9][10]

যাত্রীর যাচাই (womenTaqsir): Trimming-এর আগে নিজের পরিস্থিতিতে required stage, amount ও extent যোগ্য আলেমের কাছে নিশ্চিত করুন। Accommodation-এর মতো উপযুক্ত private place ও প্রয়োজনে trusted help-এর ব্যবস্থা করুন। Prayer alcove বা mosque restroom-কে approved haircutting facility ভাববেন না, প্রকাশ্যে মাথা অনাবৃত করবেন না বা hotel-এ পৌঁছানোকেই automatic release from Ihram ধরবেন না। Completion পর্যন্ত applicable religious guidance অনুসরণ করুন।

Journey/intention-এর আলাদা কাজের জন্য wider Ihram guide তার নিজস্ব review সাপেক্ষে দেখুন। Ritual advice ও scissors-এর airline security rule আলাদা রাখুন। Optional transfer link শুধু transport তুলনায় সাহায্য করে: operator-এর কাছে pickup/dropoff, আসল passenger ও bag capacity, assistance, privacy need, price ও cancellation নিশ্চিত করুন; এখানে female-driver, safety বা wheelchair-access guarantee দেওয়া হচ্ছে না।

৭. সচরাচর জিজ্ঞাসা
বাংলাদেশি নারী কি যেকোনো বয়সে যেকোনো ভিসায় মাহরাম ছাড়া ওমরাহ করতে আসতে পারেন?
মন্ত্রণালয় মাহরাম ছাড়া ওমরাহ করতে আসা allowed বলেছে; প্রত্যেক visa/age/nationality entitlement প্রতিষ্ঠা করেনি। Tourist eVisa terms adulthood, minor representation ও permitted nationality আলাদা করেছে। নিজের route যাচাই করে ব্যক্তিগত ধর্মীয় পরামর্শ আলাদা নিন। [1][2][3]
মদিনার কোন hotel area বা gate নারীদের জন্য guaranteed best?
এখানে কোনোটিই verified নয়। আসল property থেকে intended prayer/reporting route ও current on-site direction নিশ্চিত করুন। Area name দিয়ে step-free access, open gate বা নির্দিষ্ট Rawdah assembly point প্রতিষ্ঠিত হয় না। [5]
নারীরা Rawdah visit কীভাবে book ও confirm করবেন?
Actual women's service, available appointment ও current confirmation/reporting instruction ব্যবহার করুন। Nusuk নারী-পুরুষের ভিন্ন time, annual regular booking, কাছের Instant Track ও entry code-এর আগে attendance confirmation বলেছে। Live slot বা entry guaranteed নয়। [4][5]
আমার সন্তানরা কি আপনা থেকেই আমার সঙ্গে Rawdah-তে ঢুকতে পারবে?
এমন entitlement প্রতিষ্ঠিত নয়। Nusuk page children-এর Rawdah entry নিষিদ্ধ বলেছে; সাধারণ mosque visit ও advertised childcare আলাদা। পুরোনো age statement বা family booking assumption নয়, current booking condition ও আসল care arrangement নিশ্চিত করুন। [1][5]
Ihram-এ সাধারণ পোশাক, niqab ও gloves কি একইভাবে গণ্য?
না। Cited Ibn Baz answer-এ নারীদের special Ihram uniform নেই; Bukhari 1838-এ niqab ও gloves আলাদা নির্দেশে আছে। Blog-এর skin-contact workaround নয়, নিজের coverage ও medical need যোগ্য আলেমকে জিজ্ঞেস করুন। [6][7]
মাসিকের সঙ্গে Tawaf বা Rawdah appointment না মিললে কী করব?
Bukhari 305-এ পবিত্র হওয়া পর্যন্ত Tawaf অপেক্ষার কথা আছে। নিজের exact ritual stage, mosque entry, travel deadline ও treatment আলাদা religious/clinical advice চায়। Permit বা return flight ব্যক্তিগত ruling নয়; নিজে থেকে period-delay medication নেবেন না। [8]
প্রত্যেক নারীর কি একই universal amount-এ mosque restroom-এ চুল কাটতে হবে?
এই guide সে নিয়ম প্রতিষ্ঠা করে না। Nusuk ১–২ সেমি example এবং restriction চলা অবস্থায় residence পর্যন্ত postponement বলেছে; Abu Dawud নারীর clipping বর্ণনা করে। Trimming-এর আগে নিজের applicable method ও উপযুক্ত private place নিশ্চিত করুন। [9][10]`,
    references: [
      {
        name: "Ministry of Hajj and Umrah — specific no-mahram Umrah answer (other FAQ items have separate limits)",
        nameBn: "হজ ও ওমরাহ মন্ত্রণালয় — নির্দিষ্ট no-mahram Umrah উত্তর (অন্য FAQ-এর সীমা আলাদা)",
        url: "https://haj.gov.sa/en/FAQ",
      },
      {
        name: "Official tourist eVisa terms — age, representation, nationality list and discretion",
        nameBn: "Official tourist eVisa terms — age, representation, nationality list ও discretion",
        url: "https://visa.visitsaudi.com/Home/TermsConditions",
      },
      {
        name: "Jordan General Iftaa — fatwa 3785, 30 July 2023 (conditional religious advice, not visa law)",
        nameBn: "Jordan General Iftaa — fatwa 3785, ৩০ জুলাই ২০২৩ (শর্তসাপেক্ষ ধর্মীয় advice, visa law নয়)",
        url: "https://www.aliftaa.jo/research-fatwa-english/3785/Islamic-Ruling-Regarding-a-Womans-Travel-for-Hajj-or-Umrah-without-a-Mahram-or-her-Husband",
      },
      {
        name: "Ministry — Rawdah appointment service for men and women",
        nameBn: "মন্ত্রণালয় — নারী-পুরুষের Rawdah appointment service",
        url: "https://haj.gov.sa/en/E-Services/Permit-to-Visit-Al-Rawdah-Al-Sharifiyah-for-Men-Women",
      },
      {
        name: "Nusuk — Rawdah visiting, confirmation, children and ordinary mosque access (Arabic)",
        nameBn: "Nusuk — Rawdah visit, confirmation, child ও সাধারণ mosque access (আরবি)",
        url: "https://www.nusuk.sa/rawdah",
      },
      {
        name: "Shaykh Ibn Baz official archive — women’s Ihram clothing, fatwa 5222 (Arabic)",
        nameBn: "Shaykh Ibn Baz official archive — নারীর Ihram clothing, fatwa 5222 (আরবি)",
        url: "https://binbaz.org.sa/fatwas/5222/%D8%B5%D9%81%D8%A9-%D9%84%D8%A8%D8%A7%D8%B3-%D8%A7%D9%84%D9%85%D8%B1%D8%A7%D8%A9-%D8%A7%D9%84%D9%85%D8%AD%D8%B1%D9%85%D8%A9",
      },
      {
        name: "Sahih al-Bukhari 1838 — niqab and gloves in Ihram",
        nameBn: "Sahih al-Bukhari 1838 — Ihram-এ niqab ও gloves",
        url: "https://sunnah.com/bukhari:1838",
      },
      {
        name: "Sahih al-Bukhari 305 — Aisha’s Hajj report and Tawaf until purity",
        nameBn: "Sahih al-Bukhari 305 — Aisha-র Hajj বর্ণনা ও পবিত্রতা পর্যন্ত Tawaf",
        url: "https://sunnah.com/bukhari:305",
      },
      {
        name: "Nusuk Umrah Journey — sequence and published women’s hair-trimming example",
        nameBn: "Nusuk Umrah Journey — sequence ও নারীর hair-trimming-এর published example",
        url: "https://umrah.nusuk.sa/Journey",
      },
      {
        name: "Sunan Abi Dawud 1985 — women’s clipping rather than shaving",
        nameBn: "Sunan Abi Dawud 1985 — নারীর shaving নয় clipping",
        url: "https://sunnah.com/abudawud:1985",
      },
    ],
    internalLinks: [
      { text: "Nusuk visitor registration ও Rawdah confirmation guide", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Hotel room/access, Haramain ও আলাদা transfer check", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "বয়স্ক বাবা-মার Umrah: এয়ারলাইন সহায়তা, হারাম কার্ট ও মেডিকেল যাচাই", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "নিজের quote দিয়ে Umrah planning ও budget hub", path: "/umrah" },
      { text: "Ramadan ও I’tikaf — আলাদা season-specific review", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
      { text: "Main DIY guide — actual visa route, application ও permit sequence", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Ihram journey/intention guidance — আলাদা specialist review", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "নিজের party-এর জন্য airport transfer option তুলনা করুন",
      body: "ঐচ্ছিক transport search: operator-এর কাছে exact pickup/dropoff, passenger/bag capacity, assistance, privacy need, total ও cancellation নিশ্চিত করুন। Female driver, wheelchair access বা mosque-entry permission এখানে নিশ্চিত করা হচ্ছে না; কোনো ride বা live quote পরীক্ষা হয়নি।",
    },
  },

  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    title: "ঢাকা–জেদ্দা/মদিনা ফ্লাইট: Open-Jaw, Baggage ও Quote তুলনা (২০২৬)",
    summary:
      "১৯ অক্টোবর ২০২৬-এর source review: roundtrip ও open-jaw একই date, passenger, baggage ও terms-এ তুলনা করুন। Biman-এর directional baggage, Saudia-র Zamzam wording ও connection risk দেখুন; এখানে live fare, guaranteed savings বা daily schedule যাচাই করা হয়নি।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "১০ মিনিট পড়া",
    content: `এই গাইড বাংলাদেশি ওমরাহযাত্রীদের জন্য, যারা Jeddah roundtrip, দুই শহরে arrival/return এবং connecting itinerary-এর মধ্যে বাছছেন। শুধু headline fare নয়—bag, transfer ও change condition-সহ যে flight সত্যিই কিনতে পারবেন, সেটি তুলনা করাই উদ্দেশ্য। এই review-তে live fare basket, ticket purchase বা airport connection পরীক্ষা করা হয়নি।

দ্রুত উত্তর — ১৯ অক্টোবর ২০২৬-এ দেখা তথ্য: একই date ও passenger basis-এ DAC–JED / MED–DAC এবং DAC–MED / JED–DAC-এর সঙ্গে same-city roundtrip তুলনা করুন। Open-jaw-তে arrival airport-এ ফিরে যাওয়া এড়ানো যেতে পারে; তবে এটি সবসময় সস্তা বা ভালো নয়। Biman-এর published baggage direction ও fare class অনুযায়ী বদলায়; Saudia-র খোলা terms দিয়ে সবার জন্য extra Zamzam allowance প্রতিষ্ঠিত হয় না। Payment-এর আগে আসল ticket ও connecting carrier-এর condition মিলিয়ে নিন। [1][2][4]

১. MAKKAH ও MADINAH পরিকল্পনায় কোন ROUTE SHAPE মানায়?
Open-jaw মানে এক শহরে নেমে অন্য শহর থেকে ফেরা। এই উদাহরণে Jeddah/Makkah ও Madinah-এর মধ্যকার journey আলাদা surface leg; international ticket-এ সেটি included ধরে নেবেন না। Saudia-র terms-ও নিজেদের দেওয়া service ছাড়া airfare থেকে surface transport আলাদা করেছে। [2]

- **Jeddah first — DAC থেকে JED, পরে MED থেকে DAC:** প্রথম stay Makkah ও শেষ stay Madinah হলে এটি তুলনা করুন। Airport-to-Makkah transfer, intercity journey এবং Madinah airport transfer আলাদা করে quote নিন। Return nonstop না হয়ে connecting-ও হতে পারে; প্রতিটি segment পড়ুন।
- **Madinah first — DAC থেকে MED, পরে JED থেকে DAC:** প্রথমে Madinah-তে থাকতে চাইলে এটি তুলনা করুন। পরের Makkah journey ও শেষের Jeddah airport transfer যোগ করুন। এই routing example থেকে ধর্মীয় exemption বা medical benefit ধরে নেবেন না; নিজের পরিস্থিতির জন্য আলাদা Ihram ও older-traveller guidance দেখুন।
- **Same-city roundtrip — DAC থেকে JED হয়ে ফেরা, অথবা DAC থেকে MED হয়ে ফেরা:** এটিও comparison-এ রাখুন। Return surface journey থাকলেও date বা total cost-এর জন্য মানাতে পারে। Roundtrip মানেই নির্দিষ্ট সময়ের bus journey বাধ্যতামূলক নয়; আসল ground option ও শেষ রাতের অবস্থান তুলনা করুন।

কোনো route-ই প্রতিটি শহরে নির্দিষ্ট সংখ্যক দিন থাকার নির্দেশ নয়। Visa/season condition, intended stay, confirmed assistance need ও আসল ticket availability মিলিয়ে sequence বাছুন। Entry/permit boundary-এর মালিক main DIY guide; এই flight comparison দিয়ে Saudi Arabia বা transit country-তে প্রবেশের অনুমতি প্রতিষ্ঠিত হয় না।

২. NONSTOP FLIGHT ও CONNECTION কীভাবে যাচাই করবেন?
নিজের date দিয়ে Biman ও Saudia খোঁজা শুরু করুন; তবে প্রতিটি city pair-এ দুটিরই daily flight বা Madinah return nonstop ধরে নেবেন না। Review-তে Biman timetable page পাওয়া যায়নি; date-specific carrier itinerary-ও ধরা হয়নি। এতে flight cancelled প্রমাণ হয় না। এখানে current daily frequency, aircraft, terminal, onboard prayer space বা fixed flight duration নিশ্চিত করা হচ্ছে না।

Result-টি পুরো itinerary হিসেবে পড়ুন: departure/arrival date ও local time, overnight date change, প্রতিটি airport ও terminal, শুধু marketing airline নয় operating carrier, stop, layover এবং total elapsed time। Route label বা airline logo যথেষ্ট নয়। প্রস্থানের আগে carrier-এর travel alert ও flight status আবার দেখুন।

Connection হলে জিজ্ঞেস করুন flight-গুলো এক through ticket-এ, নাকি separately issued ticket; bag through-check হবে কি না, missed connection কে সামলাবে এবং airport/terminal বদলাতে immigration লাগবে কি না। এক payment বা booking reference দিয়েই protected connection প্রমাণ হয় না। নির্দিষ্ট উদাহরণ হিসেবে Emirates-এর Dubai page-এ তাদের connecting partner-সহ booked journey ও separately booked flight আলাদা: শেষেরটিতে baggage collection, immigration ও visa লাগতে পারে, অথবা শর্তসাপেক্ষ paid baggage-transfer service। এটি Emirates/Dubai-এর উদাহরণ, প্রতিটি Gulf hub-এর নিয়ম নয়। [4]

যাত্রীর যাচাই (flightConnection): Connection-এর payment-এর আগে seller ও operating carrier-এর কাছে ticket structure, baggage handover, disruption responsibility এবং আসল terminal অনুযায়ী connection time নিশ্চিত করুন। নিজের passport ও itinerary অনুযায়ী transit বা entry permission যাচাই করুন; Saudi visa দিয়ে অন্য দেশে প্রবেশ করা যাবে ধরে নেবেন না। প্রয়োজনে assistance, immigration বা overnight stay-এর সময় রাখুন। এখানে সবার জন্য safe layover বা airport-to-hotel buffer যাচাই করা হয়নি।

One-stop quote nonstop-এর চেয়ে কমও হতে পারে, বেশিও হতে পারে। Meal, seat, baggage, transit cost ও extra hotel night মিলিয়ে তুলনা করুন; family savings amount প্রতিষ্ঠিত নয়। Airline-কে low-cost বলেই baggage bundle কিনবেন না—আসল bag-এর জন্য প্রয়োজনীয় allowance কিনুন।

৩. নিজের নির্দিষ্ট FARE-এ কী BAGGAGE আছে?
**Biman:** খোলা sector table-এ Economy Bangladesh-to-Jeddah ৩০ কেজি এবং Jeddah-to-Bangladesh ৫০ কেজি। এগুলো published directional example; সব fare বা Madinah-এর প্রতিশ্রুতি নয়। একই page-এ special G-class-এর baggage sector অনুযায়ী ২০–২৩ কেজি এবং S-class-এ checked baggage নেই। Generic per-piece section ও Important Notice-এ per-piece wording ভিন্নও আছে: নিজের ticket-এর জন্য Biman-এর কাছে মিলিয়ে নিন, total weight-কে একটি অত্যন্ত ভারী bag ধরে নেবেন না। [1]

Biman-এর published Economy cabin example একটি piece সর্বোচ্চ ৭ কেজি, handle, pocket ও wheel-সহ 56 x 36 x 23 cm। Ticketed cabin allowance ও current restriction-ও নিশ্চিত করুন। Retrieved paginated table-এ Madinah row দেখা যায়নি; তাই এখানে Madinah-এর checked-baggage number দেওয়া হচ্ছে না। [1]

**Saudia:** খোলা Conditions of Carriage-এ baggage ticket condition-এর অধীন। পুরোনো baggage URL branded-fares page-এ redirect হয়েছে, যাচাইযোগ্য current baggage table-এ নয়। পুরোনো search snippet দেখে দুটি ২৩ কেজির piece, সবার cabin allowance এক, অথবা যাওয়া-ফেরায় সমান benefit ধরে নেবেন না। Selected fare পড়ে কোনো inconsistency থাকলে payment-এর আগে Saudia-র কাছে সমাধান নিন। [2][3]

**নির্দিষ্ট বিকল্পের উদাহরণ Air Arabia:** page-এ route availability ও fee সাপেক্ষে ২০, ৩০ বা ৪০ কেজি checked option আছে। ২০ কেজি option একটি piece; ৩০/৪০ কেজি সর্বোচ্চ দুই piece-এ ভাগ করা যায়। এটি live DAC–Saudi itinerary বা অন্য airline-এ required bundle-এর প্রমাণ নয়। Bangladesh flight-এ carton box নিষিদ্ধও বলা আছে; নিচে special Zamzam packaging আলাদা করে দেখুন। [5]

যাত্রীর যাচাই (flightBaggage): প্রতিটি traveller ও flight-এর checked piece, total ও per-piece weight, dimension, cabin allowance এবং addition-এর দাম লিখুন। Child/infant, codeshare ও connecting-carrier rule আলাদা যাচাই করুন; adult allowance দিয়ে পুরো family গুণ করবেন না। আসল bag ওজন ও মাপুন। Page ও ticket wording বিরোধ হলে carrier-এর কাছে সমাধান নিন; Haramain নিলে rail baggage আলাদা যাচাই করুন—airline allowance সেখানে চলে না।

৪. ZAMZAM কি আপনা থেকেই FREE ও EXTRA?
এখানে খোলা source দিয়ে সবার extra-piece entitlement প্রতিষ্ঠিত হয় না। Saudia-র current Conditions of Carriage-এ Jeddah/Madinah থেকে যাত্রীর একটি ৫ লিটার bottle বলা হয়েছে এবং ৫ লিটার bottle allowable checked baggage-এর অংশ হিসেবে গণনার কথা আছে; extra bottle excess। Allowance-এর মধ্যে “free” মানেই “প্রতিটি ticket-এর bag-এর অতিরিক্ত” নয়। এই page দিয়ে সব packaging, visa, departure-terminal বা connecting-carrier condition মিটে যায় না। [2]

Biman-এর public baggage page-এর চারটি returned chunk-এ Zamzam-specific allowance পাওয়া যায়নি। এতে Biman Zamzam নেয় না বা আলাদা policy নেই প্রমাণ হয় না। অর্থ হলো এই review থেকে Biman-এর bottle-কে free extra item বলা যাচ্ছে না; নিজের flight-এর condition নিন। [1]

Air Arabia Saudi Arabia থেকে একটি free ৫ লিটার bottle প্রকাশ করেছে: authorized airport sales outlet থেকে কিনতে হবে এবং air transport-এর জন্য তৈরি sealed packaging-এ হতে হবে। Published condition মিলিয়ে Bangladesh-bound আসল connection-এ carton-box restriction-এর পাশে special package কীভাবে গ্রহণ করা হবে নিশ্চিত করুন। এই benefit Saudia, Biman বা সব budget airline-এ প্রয়োগ করবেন না; USD surcharge-ও বানিয়ে বলবেন না। [5]

যাত্রীর যাচাই (flightZamzam): পানি কেনার আগে departure ও connecting carrier-এর কাছে permitted volume, authorized packaging, separate handover, visa/permit condition, ticketed baggage-এর মধ্যে গণনা হবে কি না এবং fee জিজ্ঞেস করুন। শুধু প্রথম sector নয়, Dhaka পর্যন্ত acceptance নিশ্চিত করুন। বড় bottle cabin bag-এ রাখবেন না বা retail sales rule-কে airline carriage-এর অনুমতি ভাববেন না। Source বিরোধ হলে itinerary-specific উত্তর নিন; এই গাইডকে permission ধরবেন না।

বিস্তারিত Zamzam, dates, gold ও Bangladesh customs প্রশ্ন আলাদা guide-এর কাজ; airline baggage allowance বা এই flight article দিয়ে customs exemption প্রতিষ্ঠিত হয় না।

৫. একই BASIS-এ FLIGHT QUOTE কীভাবে তুলনা করবেন?
এটি editorial comparison workflow; পরীক্ষিত airline checkout বা guaranteed booking procedure নয়।

ধাপ ১: Comparison basis ঠিক করুন।
Date, permitted flexibility, trip length, passenger age, cabin, actual bag ও assistance need লিখুন। Non-refundable travel-এ commit করার আগে main DIY guide-এর visa/season limit মিলিয়ে নিন।

ধাপ ২: তিন route shape খুঁজুন।
যেখানে পাওয়া যায় same-city roundtrip ও open-jaw-এর দুই direction-এর quote নিন। প্রতিটি flight segment ও আলাদা surface leg লিখুন; দুই-flight trip-এর সঙ্গে অসম্পূর্ণ one-way quote তুলনা করবেন না।

ধাপ ৩: Ticket ও connection structure তুলনা করুন।
প্রতিটি candidate-এর operating carrier, total elapsed time, local arrival date, terminal, এক through ticket না separate ticket, baggage handover এবং disruption কে সামলাবে লিখুন। আসল passport ও itinerary অনুযায়ী transit/entry requirement যাচাই করুন। [2][4]

ধাপ ৪: প্রতিটি candidate-এর একটি total বানান।
Quoted airfare ও tax, seller/payment charge, required baggage/seat/meal, transit বা overnight cost এবং সব airport/intercity transfer যোগ করুন। Currency ও quote timestamp লিখুন। একই passenger basis রাখুন; per-person headline-এর সঙ্গে family total তুলনা করবেন না। এখানে BDT fare band বা fixed exchange rate দেওয়া নেই। [2]

ধাপ ৫: Payment-এর আগে selected condition পড়ুন।
Change, cancellation, no-show, fare difference ও seller fee-এর fare-family rule রাখুন; baggage/Zamzam ও assistance প্রশ্ন মিটিয়ে নিন। Saudia-র fare-family comparison-এ change/cancellation condition ভিন্ন; terms-এ unused বা out-of-sequence coupon বাকি itinerary-তে প্রভাব ফেলতে পারে বলা আছে। Carrier-এর সঙ্গে arrangement ছাড়া route পাল্টাতে flight skip করবেন না। [1][2][3][5]

ধাপ ৬: Issued journey নিশ্চিত করে আবার যাচাই করুন।
Purchase-এর পরে actual e-ticket, name, date, airport, flight coupon, baggage ও confirmed assistance কেনার উদ্দেশ্যের সঙ্গে মিলিয়ে নিন। Confirmation ব্যক্তিগতভাবে রাখুন। Travel-এর আগে carrier notice, flight status ও departure/check-in instruction আবার দেখুন; saved quote ticket বা operation অপরিবর্তিত থাকার প্রমাণ নয়। [1][2]

যে option-এর total, condition ও workload আপনারা সামলাতে পারবেন, সেটি বাছুন। Matched dated quote ছাড়া open-jaw বা connection-এ টাকা বা নির্দিষ্ট ঘণ্টা বাঁচে এই guide প্রমাণ করতে পারে না।

৬. এরপর কোন GUIDE ব্যবহার করবেন?
বড় visa/permit sequence ও নিজের quote-based budget-এর জন্য main DIY guide ও Umrah hub; আলাদা surface journey এবং আসল bag/access check-এর জন্য reviewed hotel/Haramain guide ব্যবহার করুন। Flight landing time guaranteed train connection বা hotel arrival time নয়।

সেই route-এ Saudi Arabia-তে প্রবেশের ইচ্ছা থাকলেই stopover guide দেখুন; ordinary airside connection আপনা থেকে Saudi stopover-visa application নয়। আলাদা ধর্মীয় কাজের জন্য Ihram guide দেখুন, fixed crew-announcement countdown নয়। Detailed customs guide আলাদা review lane; এখানে নতুন করে certified নয়। Optional flight comparison link শুরু করার জায়গা: purchase-এর আগে seller, ticket structure ও full condition যাচাই করুন। Public chat-এ passport scan, OTP, full booking reference বা ব্যবহারযোগ্য boarding-pass barcode পাঠাবেন না।

৭. সচরাচর জিজ্ঞাসা
Open-jaw Umrah ticket কি সবসময় সস্তা?
না। একই date, passenger/baggage basis ও full trip cost-এ open-jaw-এর দুই direction ও roundtrip তুলনা করুন। Arrival airport-এ ফেরা এড়ানো যেতে পারে; এখানে matched quote basket বা guaranteed savings প্রতিষ্ঠিত নয়।
Biman-এর সব Saudi ticket-এ কি ৪৬ কেজি থাকে?
সবার জন্য allowance যাচাই হয়নি। Published Jeddah Economy example Bangladesh থেকে যাওয়ায় ৩০ কেজি, ফেরায় ৫০ কেজি; fare-class exception আছে। Retrieved table-এ Madinah দেখা যায়নি। Exact ticket ব্যবহার করে per-piece condition Biman-এর কাছে মিলিয়ে নিন। [1]
Saudia কি সবাইকে free extra Zamzam bottle দেয়?
ধরে নেবেন না। খোলা Conditions of Carriage-এ Jeddah/Madinah থেকে একটি ৫ লিটার bottle এবং allowable checked baggage-এর মধ্যে গণনার কথা আছে। নিজের journey-এর departure terminal, visa ও প্রতিটি carrier-এ প্রযোজ্য condition জিজ্ঞেস করুন। [2]
সব low-cost airline কি Zamzam-এর charge ও একই baggage bundle চায়?
না। Air Arabia-র published example-এ conditional free ৫ লিটার bottle ও ভিন্ন checked-baggage option আছে। Special packaging-এর পাশে Bangladesh carton rule-ও যাচাই করতে হবে। অন্য airline ও fare product আলাদা check চায়; এখানে generic surcharge প্রযোজ্য নয়। [5]
এক booking reference মানেই কি protected connection?
না। Through-ticket না separate-ticket structure, baggage transfer এবং flight delay হলে দায়িত্ব নিশ্চিত করুন। Emirates-এর Dubai transfer page-এ arrangement-এর পার্থক্যের উদাহরণ আছে; প্রতিটি hub বা airline-এর universal rule নয়। [4]
Landing থেকে train বা আরেক flight-এর মাঝে কত সময় রাখব?
এই guide-এ universal verified buffer নেই। আসল terminal, immigration, bag collection/recheck, assistance ও deadline নিয়ে relevant carrier/operator-কে জিজ্ঞেস করে নিজের party-এর contingency রাখুন। Scheduled arrival time দিয়েই onward journey নিশ্চিত হয় না। [2][4]`,
    references: [
      {
        name: "Biman — route/fare-specific baggage, cabin rules and notices",
        nameBn: "Biman — route/fare অনুযায়ী baggage, cabin rule ও notice",
        url: "https://www.biman-airlines.com/baggageAll",
      },
      {
        name: "Saudia — Conditions of Carriage, ticket sequence, baggage and Zamzam (relevant sections)",
        nameBn: "Saudia — Conditions of Carriage, ticket sequence, baggage ও Zamzam (প্রাসঙ্গিক অংশ)",
        url: "https://www.saudia.com/information/terms-and-conditions/general-conditions-of-carriage",
      },
      {
        name: "Saudia — branded fare comparison (not a priced itinerary)",
        nameBn: "Saudia — branded fare comparison (priced itinerary নয়)",
        url: "https://www.saudia.com/book/travel-information/branded-fares",
      },
      {
        name: "Emirates — Dubai connections and separate-ticket transfer conditions",
        nameBn: "Emirates — Dubai connection ও separate-ticket transfer condition",
        url: "https://www.emirates.com/us/english/before-you-fly/dubai-international-airport/transferring-between-terminals/",
      },
      {
        name: "Air Arabia — checked baggage and conditional Zamzam carriage",
        nameBn: "Air Arabia — checked baggage ও শর্তসাপেক্ষ Zamzam carriage",
        url: "https://www.airarabia.com/en/help/baggage-enquiries/checked-baggage_baggage-enquiries",
      },
    ],
    internalLinks: [
      { text: "নিজের journey-তে Ihram planning — আলাদা ধর্মীয় guidance", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "বিস্তারিত Zamzam ও Bangladesh customs guide — আলাদা review lane", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "Main DIY Umrah process ও entry/permit boundary", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "Hotel access, Haramain baggage ও আলাদা transfer", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "Saudia/flynas stopover route ও permission check", path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah" },
      { text: "নিজের quote দিয়ে Umrah budget planner", path: "/umrah" },
      { text: "Flight search — full itinerary ও seller term যাচাই করুন", path: "/flights" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "নিজের date ও passenger দিয়ে flight option তুলনা করুন",
      body: "ঐচ্ছিক search starting point; সব multi-city combination বা seller এখানে থাকবে এমন নিশ্চয়তা নেই। Carrier বা authorized seller-এর কাছে full itinerary, baggage, payment total ও connection protection যাচাই করুন; search result ticket বা savings-এর প্রমাণ নয়।",
    },
  },

  "ramadan-umrah-itikaf-guide-bangladesh-booking-budget": {
    title: "বাংলাদেশ থেকে রমজান ১৪৪৮ ওমরাহ ও ইতিকাফ গাইড (২০২৭): তারিখ, সিজনের সময়সীমা এবং কে নিবন্ধন করতে পারেন",
    summary:
      "রমজান ১৪৪৮ শুরু হতে পারে সোমবার ৮ ফেব্রুয়ারি ২০২৭-এ, আর সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের ১৪৪৮ সিজন ক্যালেন্ডারে ওমরাহ ভিসা ইস্যু শেষ ৯ মার্চ ২০২৭, প্রবেশ ২৩ মার্চ ও প্রস্থান ৭ এপ্রিল ২০২৭। ১৯ অক্টোবর ২০২৬ তারিখে উম্মুল কুরা ক্যালেন্ডার, মন্ত্রণালয়ের ১৪৪৮ সিজন ক্যালেন্ডার ও কর্তৃপক্ষের ইতিকাফ ঘোষণার সঙ্গে যাচাই করা এই গাইডে আলাদা করা হয়েছে যে তারিখগুলো নিয়ে পরিকল্পনা করা যায় আর যে পারমিট কেউ প্রতিশ্রুতি দিতে পারে না — প্রকাশিত ইতিকাফ শর্ত নাগরিক ও বাসিন্দাদের জন্য, ওমরাহ ভিসার দর্শনার্থীর জন্য নয়।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `এই গাইড বাংলাদেশি ওমরাহযাত্রীদের জন্য, যাঁরা রমজান ১৪৪৮ (আনুমানিক ৮ ফেব্রুয়ারি – ৮ মার্চ ২০২৭) [১] নিয়ে ভাবছেন, দুই হারাম মসজিদে ইতিকাফের জায়গা খুঁজছেন, আর এমন বাজেট বানাতে চান যার পেছনে বাস্তব কোনো মূল্যসূচি নেই। রাসূলুল্লাহ (সা.) বলেছেন: “রমজান এলে ওমরাহ কর — নিশ্চয়ই রমজানের ওমরাহ হজের সমান (সওয়াবে)” — অথবা এর কাছাকাছি কথায় [৬]।

দ্রুত উত্তর — যাচাইয়ের তারিখ ১৯ অক্টোবর ২০২৬: উম্মুল কুরা ক্যালেন্ডারে ১ রমজান ১৪৪৮ সোমবার ৮ ফেব্রুয়ারি ২০২৭ এবং ১ শাওয়াল মঙ্গলবার ৯ মার্চ ২০২৭ — দুটোই অফিশিয়াল চাঁদ দেখার ঘোষণার অধীন [১][২]। সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের ১৪৪৮ সিজন ক্যালেন্ডারে ওমরাহ ভিসা ইস্যু শেষ ১ শাওয়ালে (৯ মার্চ ২০২৭), সর্বশেষ প্রবেশ ১৫ শাওয়ালে (২৩ মার্চ ২০২৭) এবং সর্বশেষ প্রস্থান ৩০ শাওয়ালে (৭ এপ্রিল ২০২৭) [২]। অফিশিয়াল ইতিকাফ নিবন্ধন মসজিদুল হারাম ও মসজিদে নববীর তত্ত্বাবধায়ন কর্তৃপক্ষের একটি আসনসীমিত পারমিট সেবা, আর এর প্রকাশিত শর্তগুলো নাগরিক ও বৈধ ইকামাধারী বাসিন্দাদের জন্য নির্ধারিত — ওমরাহ ভিসায় আসা দর্শনার্থীর জন্য নয় [৩][৪]। ১৪৪৮-এর জন্য এখনো কিছু ঘোষণা হয়নি, আর এ বিষয়ে আগাম টাকা দেওয়ার কিছু নেই।

১. রমজান ১৪৪৮ কখন, আর সিজনের সময়সীমা কী?
- শুরু ও শেষ: উম্মুল কুরা ক্যালেন্ডারে ১ রমজান ১৪৪৮ সোমবার ৮ ফেব্রুয়ারি ২০২৭, আর ১ শাওয়াল ১৪৪৮ মঙ্গলবার ৯ মার্চ ২০২৭ — ওমরাহ সিজন শেষের তারিখ হিসেবে মন্ত্রণালয় নিজেই এই তারিখ ব্যবহার করছে। দুটোই চাঁদ দেখার ঘোষণার অধীন, তাই দুই দিকেই এক দিনের ব্যবধান রাখুন [১][২]।
- শেষ দশ রাত: শুরু হয় ২১ রমজানের রাত থেকে, যা এই ক্যালেন্ডারে শনিবার ২৭ ফেব্রুয়ারি ২০২৭-এর সূর্যাস্তে শুরু হয়। শেষ আশরাকে ঘিরে ভ্রমণ সাজালে ফ্লাইট ও হোটেলের রাত মেলাতে হবে ওই সূর্যাস্তের সঙ্গে, ১ রমজানের সঙ্গে নয় [১]।
- ভিসার শেষ তারিখই আসল ফাঁদ: ১৪৪৮ সিজনে ওমরাহ ভিসা ইস্যু শেষ ৯ মার্চ ২০২৭, অর্থাৎ ঈদের প্রত্যাশিত দিনে। “ঈদের পরে দেখব” সিদ্ধান্তে এই সিজনে নতুন ওমরাহ ভিসা আর পাওয়া যাবে না [২]।
- প্রবেশের শেষ তারিখ: ২৩ মার্চ ২০২৭-এর মধ্যে রাজ্যে প্রবেশ করতে হবে, আর প্রত্যেক ওমরাহযাত্রীকে ৭ এপ্রিল ২০২৭-এর মধ্যে প্রস্থান করতে হবে [২]।
- সিজন শুরু হয়েছিল ৩১ মে ২০২৬, আর ১ জুন ২০২৬ থেকে মক্কায় প্রবেশ ও নুসুক ওমরাহ পারমিট — অর্থাৎ জানালাটি কয়েক মাস ধরেই চলছে [২]।

যাত্রীর যাচাই (ramadanDeadline): কোনো প্যাকেজ তুলনা করার আগে তিনটি মন্ত্রণালয় তারিখ নিজের ক্যালেন্ডারে লিখে নিন — ভিসা ইস্যু ৯ মার্চ, প্রবেশ ২৩ মার্চ, প্রস্থান ৭ এপ্রিল। ২৩ মার্চের পরে শুরু হওয়া রমজান ভ্রমনের কোট কেউ দিলে বুঝুন সিজন ক্যালেন্ডার তা অনুমোদন করে না। অ-রিফান্ডেবল পেমেন্টের আগে haj.gov.sa-এর সর্বশেষ ক্যালেন্ডারে প্রতিটি তারিখ মিলিয়ে নিন, কারণ সিজন প্রতিবার নতুন করে জারি হয়।

২. অফিশিয়াল ইতিকাফ পারমিট আসলে কী, আর কে আসলে যোগ্য?
কর্তৃপক্ষের ই-সেবায় রমজানের শেষ দশ দিন দুই হারাম মসজিদে অবস্থানের পারমিটের আবেদন নেওয়া হয় [৩][৮]। এটি হোটেল বুকিং নয়, প্যাকেজের সংযোজন নয়, কিনে নেওয়ার টিকিটও নয়: আবেদনকারী মসজিদ বাছাই করেন, সচেতনতামূলক নির্দেশনা দেখে শর্ত মেনে নেন, তারপর আসনসীমার ভিত্তিতে আবেদন যাচাই হয় [৩][৪]।

প্রক্রিয়ার চেয়ে প্রকাশিত শর্তই বেশি গুরুত্বপূর্ণ। ২০২৫ সালে কর্তৃপক্ষ সেবাটি বর্ণনা করতে গিয়ে বলেছিল, পারমিট কমপক্ষে ১৮ বছর বয়সী আবেদনকারীদের জন্য যাঁরা “রাজ্যের নাগরিক অথবা বৈধ ইকামাধারী বাসিন্দা”; পারমিট বিনামূল্যে এবং সেবাটি আরবি, ইংরেজি ও উর্দুতে পাওয়া যায় [৪]। ২০২৬-এর ঘোষণায় পরিচয় যাচাই হয়েছে Nafath-এর মাধ্যমে “নাগরিক ও বাসিন্দাদের জন্য”, এবং দর্শনার্থীদের জন্য কোনো পথ ঘোষণা করা হয়নি [৩][৫]। দুটো ঘোষণার কোথাও ওমরাহ ভিসায় আসা ব্যক্তিকে জায়গার নিশ্চয়তা দেওয়া হয়নি।

বাংলাদেশি পরিবারের জন্য তার মানে সৎ পরিকল্পনা: আপনি যাত্রী হিসেবে হারামে নামাজ পড়তে, তাওয়াফ করতে ও রাত কাটাতে পারবেন, কিন্তু অফিশিয়াল ইতিকাফের জায়গা আলাদা ও বাসিন্দাকেন্দ্রিক সেবা — সেটি আপনার জন্য খোলা নাও থাকতে পারে। ২০২৬-এর নজিরে ভরসা না করে ১৪৪৮-এর সর্বশেষ শর্ত কর্তৃপক্ষের পোর্টালে দেখুন, আর নিজের ইতিকাফের বৈধতা বা পরিধি নিয়ে ধর্মীয় প্রশ্ন যোগ্য আলেমের কাছে নিন [৮]।

যাত্রীর যাচাই (ramadanItikaf): কোনো এজেন্টের কাছ থেকে “নিশ্চিত ইতিকাফের জায়গা” কিনবেন না। পারমিটের আবেদন ব্যক্তি নিজেই কর্তৃপক্ষের সেবায় করেন, আসনসীমার ভিত্তিতে যাচাই হয়, আর প্রকাশিত শর্ত নাগরিক ও বাসিন্দাদের সঙ্গে যুক্ত। এই পেজ হারামে আপনার ইবাদতের অধিকার বদলায় না; শুধু সংরক্ষিত জায়গার প্রতিশ্রুতি দিতে অস্বীকার করে।

৩. ১৪৪৭-এ নিবন্ধন কেমন হয়েছিল — আর ১৪৪৮-এ কী দেখবেন
তারিখসহ নজির, কোনো প্রতিশ্রুতি নয়: ২ রমজান ১৪৪৭ (১৯ ফেব্রুয়ারি ২০২৬) কর্তৃপক্ষ ঘোষণা দেয়, নিবন্ধন শুরু পরদিন শুক্রবার ৩ রমজান (২০ ফেব্রুয়ারি ২০২৬) সৌদি সময় সকাল ১১টায়। নিবন্ধন চলত eservices.alharamain.gov.sa-তে লগইন বা নতুন অ্যাকাউন্ট খুলে, অথবা নাগরিক ও বাসিন্দাদের জন্য Nafath-এর মাধ্যমে। আবেদনকারী দুই মসজিদের মধ্যে স্থান বাছাই করতেন, শর্তে সম্মতি দিতেন, তথ্য পূরণ করে জমা দিতেন; আসনসীমা অনুযায়ী আবেদন যাচাই হতো এবং নির্বাচিতদের মনোনয়নের বিবরণসহ টেক্সট মেসেজে জানানো হতো। ইতিকাফ চলত ২০ রমজান থেকে মাসের শেষ পর্যন্ত, আর মদিনার মসজিদে নববীর জন্য আলাদা ঘোষণাও হয়েছিল [৩][৫][৮]।

১৪৪৮-এর জন্য ১৯ অক্টোবর ২০২৬ পর্যন্ত কোনো ঘোষণা নেই, আর এটি দেরি নয় — স্বাভাবিক: ১৪৪৭-এর বিজ্ঞপ্তি এসেছিল নিবন্ধন খোলার মাত্র এক দিন আগে, মাসখানেক আগে নয়। তাই অক্টোবরে “আগাম বুকিং” করার বৈধ কিছু নেই, আর পেজ দেখে রাখার জন্য দালালকে টাকা দেওয়ারও কারণ নেই। রমজান ঘনিয়ে এলে কর্তৃপক্ষের অফিশিয়াল চ্যানেল দেখুন এবং সেই সিজনে প্রকাশিত শর্ত পড়ুন [৩][৪]।

দুটি পারমিট গুলিয়ে ফেলা সহজ। নুসুক ওমরাহ পারমিট মক্কায় প্রবেশ ও ওমরাহ করার অনুমতি দেয়; ইতিকাফ পারমিট শেষ দশ দিন মসজিদে অবস্থানের আলাদা আবেদন। কোনোটিই অন্যটির নিশ্চয়তা দেয় না [২][৮]।

যাত্রীর যাচাই (ramadanAnnouncement): কর্তৃপক্ষের ঘোষণার আগে “১৪৪৮-এর ইতিকাফ নিবন্ধন খুলেছে” — এমন কোনো বার্তা, ফরোয়ার্ড করা স্ক্রিনশটসহ, অযাচাইিত ধরুন। ব্যক্তিগত তথ্য দেওয়ার আগে তারিখ, সময় ও লিংক কর্তৃপক্ষের নিজের সেবায় মিলিয়ে নিন, আর নিজের হয়ে নিবন্ধনের প্রস্তাব দেওয়া কারও কাছে পাসপোর্ট, ওটিপি বা অ্যাকাউন্টের পাসওয়ার্ড কখনো দেবেন না।

৪. রমজানের ওমরাহতে আসলে কত খরচ
রমজানের কোনো অফিশিয়াল মূল্যসূচি নেই, কোনো কর্তৃপক্ষ প্যাকেজের দাম প্রত্যয়নও করে না। এই লেখায় আগে থাকা BDT টেবিল আমরা সরিয়েছি, কারণ কোনোটিই তারিখসহ সমান ভিত্তির সোর্সের সঙ্গে মেলানো যেত না, আর সেগুলো আবার ছাপানো মানে অনুমান করা। এর বদলে যা নিয়ে পরিকল্পনা করা যায়:
- নির্দিষ্ট খরচ: নিজের কাগজপত্র ও এনডোর্সমেন্ট, আপনার তারিখের ফ্লাইটের কোট, আর সরকার বা এয়ারলাইন্স আপনার নির্দিষ্ট বুকিংয়ে যে ফি প্রকাশ করে।
- ওঠানামা করা খরচ: মক্কা ও মদিনার হোটেলের দাম বিক্রেতা নির্ধারণ করেন তারিখ, রুম ও প্যাকেজ অনুযায়ী। প্রথম বিশ রাত আর শেষ আশরা আলাদা পণ্য, দামও আলাদা; কোন সংখ্যা আপনার জন্য প্রযোজ্য তা কেবল তারিখসহ কোট বলে দেয়।
- লেবেলযুক্ত ভিত্তিরেখা, রমজানের দাম নয়: DIY ওমরাহ গাইডে এই সাইটের একমাত্র তারিখযুক্ত পরিকল্পনা রেঞ্জ (জনপ্রতি ১,১৬,০০০–১,৩২,০০০ টাকা, সাধারণ ১০ দিন, চারজনে একটি রুম, ১৪ অক্টোবর ২০২৬ অনুমোদনের পর আর দাম মেলানো হয়নি) আছে — সেটি অ-রমজান কাঠামো। রমজানের কোট ওই কাঠামোর ওপর বসে এবং আপনার তারিখের জন্য নতুন করে নিতে হবে।
- মোট খরচ নাড়ায় যে তিনটি বিষয়: কোন দশ দিনে যাবেন, কত দিন থাকবেন, আর মদিনা না জেদ্দায় আগে নামবেন।

যাত্রীর যাচাই (ramadanBudget): তারিখসহ খণ্ড-বিভক্ত কোট চান — ভিসা, হোটেলের রাত, যাতায়াত, খাবার এবং কী কী বাদ আছে; আর পেমেন্টের আগে একই তারিখে দুটি কোট তুলনা করুন। তারিখ ও রুমের ধরন ছাড়া “রমজান ডিসকাউন্ট” কোনো যাচাইযোগ্য দাম নয়, আর এই পেজ কোনো সাশ্রয়ের শতাংশ প্রকাশ করে না, কারণ তা প্রতিষ্ঠিত হয়নি।

৫. ভিড়ের মধ্যে সাহরি, ইফতার ও তাওয়াফ
- হারামের বাইরে পরিবারের জন্য একটি মিলনস্থল ও বিকল্প জায়গা আগেই ঠিক করুন; তারাবীহর পর চত্বরেই দল হারিয়ে যায়।
- তাওয়াফ ফজরের পরে বা ইশা ও তারাবীহর পরে রাখুন, রোজার দিনের মাঝখানে নয়; আর যে গতি ধরে রাখতে পারবেন, সেটাই রাখুন।
- ইফতারের জন্য হোটেলে খান বা মসজিদের যে সেবা দেওয়া হচ্ছে সেখানে; দস্তরখানে জায়গা চাইলে মাগরিবের অনেক আগে পৌঁছান।
- পাসপোর্ট ও ভিসার ডিজিটাল কপি রাখুন, হোটেলের ঠিকানা আরবিতে সেভ করুন, আর দলের ফোন নম্বর ফোনের পাশাপাশি লিখেও রাখুন।
- পরিবারের কারও শারীরিক অবস্থা থাকলে গতির প্রশ্নটি ভ্রমণের আগে তাঁর চিকিৎসকের সঙ্গে, কোনো ভ্রমণ লেখার সঙ্গে নয়।

৬. রমজানের ভেতরে ওমরাহ রাখার একটি রুট কাঠামো
লক্ষ্য যদি শেষ দশ রাতে সব কিছু বাঁধাই না করে রমজানের ভেতরে ওমরাহ করা হয়, তবে একটি কাঠামো বেশিরভাগ বাজেটেই কাজ করে: শাবানে মদিনায় উড়ে যান, মাস শুরু হওয়ার অপেক্ষা করুন, তারপর ইহরামে মক্কার উদ্দেশ্যে রওনা হয়ে পৌঁছেই ওমরাহ আদায় করুন। ওই লেগের ইহরাম ধরা হয় যাত্রার আগে যুল হুলাইফা থেকে, মক্কায় নয় — পথের নিয়ম বিস্তারিত আমাদের ইহরাম ও মিকাত গাইডে।

দুটি সময় যাচাই এই পরিকল্পনা টিকিয়ে বা ভাঙিয়ে দেয়। প্রথমত, ওমরাহ ভিসা ইস্যু হতে হবে ৯ মার্চ ২০২৭-এর আগে এবং রাজ্যে প্রবেশ করতে হবে ২৩ মার্চ ২০২৭-এর মধ্যে, তাই শাবানের আগমনকে এই জানালার ভেতরেই থাকতে হবে [২]। দ্বিতীয়ত, হারামের পথে রওনা হওয়ার আগে নুসুক ওমরাহ পারমিট নিশ্চিত করুন; শুধু ভিসাই পারমিট নয় [২]।

মদিনা–মক্কা লেগে হারামাইন হাই-স্পিড রেলওয়ে নিজের সময়সূচি প্রকাশ করে ও নিজের পোর্টালে টিকিট বিক্রি করে, হুইলচেয়ার ব্যবহারকারীদের জন্য আলাদা শর্তসহ [৭]। মনে রাখা কোনো সময়ের বদলে ওই সময়সূচিতে আপনার তারিখের প্রকৃত যাত্রাসময় দেখে নিন, আর যে লেগ হাতছাড়া হলেও চলে সেটি আগে বুক করুন।

যাত্রীর যাচাই (ramadanRoute): মদিনা-আগে আগমন বুক করার আগে তিনটি বিষয় লিখিতভাবে নিশ্চিত করুন: ভিসা ইস্যুর তারিখ, প্রবেশের তারিখ এবং নুসুক ওমরাহ পারমিট। তারপর নিশ্চিত করুন মক্কার লেগে ইহরাম কোথায় ধরা হবে। সময়মতো ভিসা না হলে বা পারমিট না থাকলে সস্তা শাবান ফ্লাইট কোনো কাজে আসে না।

৭. টাকা দেওয়ার আগে: চেকলিস্ট
- লেখা থাকা তারিখসহ খণ্ড-বিভক্ত কোট, কী অন্তর্ভুক্ত আর কী বাদ, স্পষ্ট।
- সিজনের তিনটি তারিখ সর্বশেষ মন্ত্রণালয় ক্যালেন্ডারে যাচাই করা, স্ক্রিনশটে নয় [২]।
- যে তারিখে আপনি সত্যিই মক্কায় থাকবেন, সেই তারিখের নুসুক ওমরাহ পারমিট নিশ্চিত [২]।
- ইতিকাফ নিয়ে এমন প্রত্যাশা যা আপনি ব্যাখ্যা করতে পারেন: কর্তৃপক্ষের শর্ত, এজেন্টের প্রতিশ্রুতি নয় [৩][৪]।
- অ-রিফান্ডেবল পেমেন্টের আগে পাসপোর্টের মেয়াদ, ভিসা চ্যানেল ও ডকুমেন্ট চেকলিস্ট DIY গাইডে মিলিয়ে নেওয়া।
- এই পেজের সোর্স যাচাই ১৯ অক্টোবর ২০২৬। তারিখ, অনুমতি ও দাম প্রতি সিজনে বদলায় — প্রতিটি সংখ্যার পাশে প্রতিটি সোর্স নতুন করে দেখুন।

৮. সচরাচর জিজ্ঞাসা
সৌদি আরবে রমজান ১৪৪৮ কবে শুরু?
উম্মুল কুরা ক্যালেন্ডারে সোমবার ৮ ফেব্রুয়ারি ২০২৭, আর ১ শাওয়াল ৯ মার্চ ২০২৭। দুটোই অফিশিয়াল চাঁদ দেখার ঘোষণার অধীন, তাই দুই দিকে এক দিনের ব্যবধান ধরুন। [১][২]
ওমরাহ ভিসায় সৌদি আরবে থাকা অবস্থায় কি অফিশিয়াল ইতিকাফের জায়গা পাওয়া যাবে?
সেটির ওপর পরিকল্পনা করবেন না। পারমিট সেবার প্রকাশিত শর্ত নাগরিক ও বৈধ ইকামাধারী বাসিন্দাদের জন্য নির্ধারিত হয়েছে, আর ১৪৪৭-এর ঘোষণায় দর্শনার্থীদের কোনো পথ ঘোষণা করা হয়নি। কর্তৃপক্ষের পোর্টালে ১৪৪৮-এর শর্ত দেখে নিন, আর মনে রাখুন পারমিট ছাড়াও হারামে নামাজ পড়া যায়। [৩][৪][৮]
১৪৪৮-এর ইতিকাফ নিবন্ধন কবে খুলবে?
১৯ অক্টোবর ২০২৬ পর্যন্ত ঘোষণা হয়নি। ১৪৪৭-এ বিজ্ঞপ্তি এসেছিল ২ রমজানে, আর নিবন্ধন খুলেছিল পরদিন সকাল ১১টায় — অর্থাৎ মাস নয়, দিন কয়েকের নোটিশ ধরে রাখুন। [৩]
এই সিজনে ওমরাহ ভিসার শেষ তারিখ কী?
ভিসা ইস্যু শেষ ১ শাওয়াল ১৪৪৮, ৯ মার্চ ২০২৭। প্রবেশ শেষ ১৫ শাওয়াল, ২৩ মার্চ ২০২৭, আর প্রস্থান ৩০ শাওয়াল, ৭ এপ্রিল ২০২৭। [২]
ভিসার সঙ্গে কি নুসুক পারমিটও লাগবে?
হ্যাঁ। ভিসা প্রবেশের অনুমতি দেয়; নুসুক ওমরাহ পারমিট মক্কায় প্রবেশ ও ওমরাহ করার অনুমতি দেয়, আর সেটি ইতিকাফের আবেদন থেকে আলাদা। [২][৮]
রমজানের ওমরাহ কি সত্যিই হজের সমান?
সহিহ বুখারির বর্ণনায় আছে, রাসূলুল্লাহ (সা.) এক আনসারি নারীকে বলেছিলেন রমজান এলে ওমরাহ করতে, কারণ “রমজানের ওমরাহ হজের সমান (সওয়াবে)” — অথবা এর কাছাকাছি কথায়। এটি বর্ণিত ফজিলত, বুকিংয়ের দাবি নয়, আর নিজের অবস্থার প্রশ্ন যোগ্য আলেমের কাছে। [৬]`,
    internalLinks: [
      { text: "বাংলাদেশ থেকে ফ্লাইটে ইহরাম ও মিকাতের নিয়ম", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "নুসুক অ্যাপ, ভিসা ও রাওদা পারমিট গাইড", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "মক্কা-মদিনা হোটেল জোন ও হারামাইন ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "মক্কা ও মদিনায় দেশি হালাল খাবার ও সাহরি/ইফতার গাইড", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
      { text: "DIY Umrah ইন্টেলিজেন্স পোর্টাল ও BDT ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "রমজানের ভিড়ে পরিবার আলাদা হয়ে গেলে সংযোগ কোথায়?",
      body: "ঐচ্ছিক সৌদি ডেটা eSIM রাখলে তারাবীহর পর দলের সঙ্গে যোগাযোগ রাখা যায় — একই নম্বর রাখুন এবং ভরসা করার আগে সংযোগ পরীক্ষা করুন। কভারেজ, গতি ও ডিভাইস সামঞ্জস্য সরবরাহকারীর কাছে নিশ্চিত করুন; ডেটা প্ল্যান আগেই ঠিক করা মিলনস্থলের বিকল্প নয়।",
    },
  },
  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    title: "বাংলাদেশ থেকে ফ্লাইটে ইহরাম ও মিকাতের নিয়ম (২০২৬): সরাসরি জেদ্দা, উপসাগরীয় ট্রানজিট নাকি আগে মদিনা",
    summary:
      "ঢাকা থেকে ওড়ার সময় ঠিক কোথায় ইহরামে প্রবেশ করবেন? ১৯ অক্টোবর ২০২৬ তারিখে সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের মিকাত পেজ ও অফিশিয়াল ইহরাম গাইডের সঙ্গে যাচাই করে এই গাইডে জানুন প্রকাশিত সীমারেখার বিধান, জেদ্দা বিমানবন্দর কেন ইহরামে প্রবেশের স্থান নয়, সংযোগ রুটে মিকাতের সমান্তরাল বিন্দু কীভাবে কাজ করে, আগে মদিনায় নামা ফ্লাইটে বিমানে ইহরাম কেন লাগে না, এবং ইহরাম ছাড়া সীমা অতিক্রম করলে মন্ত্রণালয় কী বলে।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `এই গাইডটি বাংলাদেশি হজযাত্রী ও ওমরাহযাত্রীদের জন্য, যাঁরা মক্কার পথে ইহরামে প্রবেশের সময় নির্ধারণ করতে চান — ঢাকা থেকে সরাসরি জেদ্দা, উপসাগরীয় হাবে সংযোগ, নাকি আগে মদিনায় অবতরণ। এখানে তিনটি বিষয় আলাদা করা হয়েছে: প্রকাশিত সীমারেখার বিধান কী চায়, আপনার নির্দিষ্ট রুটে বাস্তবে কী ঘটে, এবং কোনটি আপনার ব্যক্তিগত ধর্মীয় প্রশ্ন যা যোগ্য আলেমের কাছে নেওয়া উচিত। এটি কোনো ফতোয়া, ফ্লাইট-ট্র্যাকিং টুল বা পরিদর্শিত বিমানবন্দর প্রক্রিয়া নয়।

সংক্ষিপ্ত উত্তর — যাচাইয়ের তারিখ ১৯ অক্টোবর ২০২৬: সৌদি হজ ও ওমরাহ মন্ত্রণালয় বলছে, আকাশপথে আগত যাত্রী মিকাত বা তার সমান্তরাল বিন্দু অতিক্রম করার আগেই ইহরামে প্রবেশ না করে তা অতিক্রম করতে পারবেন না, এবং জেদ্দার বাদশাহ আব্দুল আজিজ আন্তর্জাতিক বিমানবন্দর “মিকাতও নয়, ইহরামে প্রবেশের স্থানও নয়”। ইহরামে প্রবেশ মানে ওমরাহ বা হজের নিয়ত করে তালবিয়া শুরু করা — শুধু কাপড় পরা নয়। পাঁচটি মিকাতের মধ্যে কোনটি প্রযোজ্য হবে তা নির্ভর করে আপনার ফ্লাইট আসলে কোন পথে ওড়ে, এবং মন্ত্রণালয় বলছে জেদ্দাগামী বিমানগুলো সাধারণত বিমান মিকাতের সমান্তরাল হলে ঘোষণা দেয়। ঘোষণাটিকে সহায়তা হিসেবে ধরুন, বিধান হিসেবে নয়। [১][২][৩]

১. বিমান মিকাত পর্যন্ত পৌঁছানোর আগে কী নিশ্চিত হতে হবে?
বিধানটি মন্ত্রণালয়ই বলেছে, মানচিত্র থেকে অনুমান করা হয়নি: সীমারেখার বাইরে বসবাসকারী যাত্রী আকাশপথে এলে “মিকাত (বা তার সমান্তরাল বিন্দু) অতিক্রম করার আগে ইহরামে প্রবেশ না করে অতিক্রম করতে পারবেন না।” এর পরেই বলা হয়েছে, জেদ্দা বিমানবন্দর “মিকাতও নয়, ইহরামে প্রবেশের স্থানও নয়।” সরাসরি ফ্লাইটের জন্য দ্বিতীয় বাক্যটিই গুরুত্বপূর্ণ: অবতরণের পরে ইহরাম শুরুর কোনো অনুমোদিত স্থান নেই। [১]

উৎসে নাম থাকা পাঁচটি ভৌগোলিক মিকাত হলো — যুল হুলাইফা (মক্কা থেকে প্রায় ৪২০ কিমি; মদিনাবাসী ও সেই পথে যাওয়া সবাই), আল-জুহফা (১৮৭ কিমি; এখন রাবেগ ২০৪ কিমি), কারনুল মানাজিল বা আস-সাইল আল-কাবির (৯৪ কিমি), ইয়ালামলাম বা আস-সাদিয়্যাহ (১১৫ কিমি) এবং যাত ইরক (৯২ কিমি)। ইবনে আব্বাস (রা.) বর্ণনা করেছেন, রাসূলুল্লাহ (সা.) এই স্থানগুলো নির্ধারণ করেছেন এবং সেগুলো সেই অঞ্চলের বাসিন্দাদের জন্য এবং যে কেউ হজ বা ওমরাহর নিয়তে সেগুলো অতিক্রম করে তার জন্য প্রযোজ্য। [১][৩]

ইহরাম শুরু হয় নিয়ত ও তালবিয়ায়, কাপড়ে নয়। মন্ত্রণালয়ের ইহরাম গাইড বলছে, ইহরাম “শুরু হয় যখন মুহরিম পবিত্র ইবাদতের নিয়ত করেন এবং তালবিয়া পাঠ শুরু করেন,” এবং যাত্রীর উচ্চারণের বাক্যটি দিয়েছে: “লাব্বাইকা আল্লাহুম্মা ওমরাহ।” নুসুকের জার্নি পেজেও প্রথম ধাপ ইহরাম — নিয়ত ও তালবিয়া, তারপর কাপড়। এই কারণেই ঢাকায় দুই টুকরো সাদা কাপড় পরা এবং বিমানে তালবিয়া শুরু করা দুটি আলাদা ধাপ। [২][৪]

যাত্রীর যাচাই (ihramPoint): ওড়ার আগে লিখিতভাবে নিশ্চিত করুন আপনার টিকিট আসলে কোন রুটে যায় এবং পরিচালনাকারী এয়ারলাইন্সের কাছে মিকাত ঘোষণার প্রথা জানুন। বিধান হলো নির্দিষ্ট মিনিটের আগে নয়, মিকাতের সমান্তরাল বিন্দুর আগে ইহরামে থাকা। সন্দেহ থাকলে দেরি না করে আগেই ইহরামে প্রবেশ করুন এবং প্রশ্নটি যোগ্য আলেমের কাছে নিন, ব্লগের কাছে নয়। এই পেজ আপনার যাত্রার কোনো ধর্মীয় রায় দেয় না।

২. বাংলাদেশ থেকে ওড়া ফ্লাইটে কোন মিকাত প্রযোজ্য?
মন্ত্রণালয় কোনো মিকাতকে জাতীয়তা বা উড্ডয়ন শহরের সঙ্গে যুক্ত করে না; তারা দিক অনুযায়ী নির্ধারণ করে এবং বলে যাত্রী যে মিকাত অতিক্রম করেন সেখান থেকে, “অথবা পথে তার সমান্তরাল ও সংলগ্ন স্থান থেকে, আকাশপথে হোক বা স্থলপথে।” বিমানের ক্ষেত্রে প্রাসঙ্গিক ঘটনা হলো আপনার রুটের যে বিন্দুটি পাঁচটির কোনো একটির সমান উচ্চতায় আসে। [১][২]

এখানে ব্যবহৃত আলেমীয় উৎসও একই কথা বলে। জর্ডানের জেনারেল ইফতা বিভাগ জেদ্দাগামী বিমানযাত্রীর প্রশ্নের উত্তরে বলেছে, জেদ্দা মিকাতের ভেতরে হওয়ায় সেখান থেকে ইহরাম ধরা বৈধ নয়, তবে যাত্রী “বাড়িতে বা বিমানে ইহরামের কাপড় পরতে পারেন এবং মিকাতের সমান্তরাল যে স্থানে পৌঁছাবেন — যা পাইলট বা গাইড জানাবেন — সেখানে নিয়ত করতে পারেন।” এটি একটি উদ্ধৃত মত, আপনার নিজের অবস্থার পরামর্শের বিকল্প নয়। [৬]

তাই ব্যবহারিক উত্তর কোনো দেশভিত্তিক তালিকা নয়। ঢাকা থেকে একই রুট একবার এক মিকাতের সমান উচ্চতায় যেতে পারে, অন্য রুটে অন্য মিকাতের; তা নির্ভর করে এয়ারওয়ে ও জেদ্দায় অ্যাপ্রোচের ওপর। সেই বিন্দু চিহ্নিত করা ফ্লাইট ডেক বা এয়ারলাইন্সের প্রশ্ন, আর তার আগে ইহরামে থাকার দায়িত্ব আপনার। [১][২]

মন্ত্রণালয়ের গাইড বলছে, জেদ্দাগামী বিমানগুলো “সাধারণত ঘোষণা দেয় যখন বিমানটি কোনো মিকাতের সমান্তরাল হয়, যাতে যাত্রী সময়মতো ইহরামে প্রবেশ করতে পারেন।” এই পর্যালোচনায় খোলা কোনো এয়ারলাইন্স পেজ ঘোষণার ভাষা, সময়, ভাষা-সংখ্যা বা ঘোষণা আদৌ হবে কি না তার নিশ্চয়তা দেয় না। ধরে নিন ঘোষণা নাও আসতে পারে। [২]

যাত্রীর যাচাই (ihramPersonal): আপনি যদি ইতিমধ্যে জেদ্দায় থাকেন বা কাজ করেন, আগে ওমরাহ করে থাকেন, বা কাজের সফরের সঙ্গে পরে ওমরাহ মিলিয়ে নিচ্ছেন — আপনার ক্ষেত্রটি ফ্লাই-ইন বিধানের বদলে মন্ত্রণালয়ের অন্য কোনো শ্রেণিতে পড়তে পারে। আপনার নির্দিষ্ট তারিখ ও রুটসহ যোগ্য আলেমকে জিজ্ঞেস করুন; এই পেজ তা ইচ্ছাকৃতভাবে নির্ধারণ করে না। [১][২]

যাত্রীর যাচাই (ihramGarments): কাপড় এমনভাবে পরুন বা সঙ্গে রাখুন যাতে শৌচাগারের লাইনে না দাঁড়িয়েই কাজটি করতে পারেন, এবং প্রয়োজনীয় জিনিস কেবিন ব্যাগে রাখুন — আপনার এয়ারলাইন্সের কেবিন সীমার মধ্যে। আগে কাপড় পরা মানে ইহরামে প্রবেশ নয়; নিয়ত ও তালবিয়াই তা। সময় নিয়ে সংশয় থাকলে কী করবেন তা আপনার আলেমের সঙ্গে ঠিক করুন, এবং শুধু ক্রুর ঘোষণার ওপর ভরসা করবেন না।

৩. ঢাকা থেকে সরাসরি জেদ্দা
সরাসরি ফ্লাইটের একটি সুবিধা আছে: মাঝে ট্রানজিট টার্মিনাল নেই, তাই কাপড় পরার ধাপটি বোর্ডিংয়ের আগে বা বিমানে করতেই হবে। অবতরণের পরে বৈধ কোনো ধাপ নেই। [১]

যেখানে সম্ভব, বিমানবন্দরের আগেই প্রস্তুতি নিন। মন্ত্রণালয়ের গাইডে ইহরামের আগে গোসল ও সুগন্ধি ব্যবহারকে সুন্নত বলা হয়েছে এবং বলা হয়েছে যাত্রী ফরজ বা নফল নামাজের পর শুরু করবেন। অনেক যাত্রী বাড়ি বা হোটেলে গোসল করে প্রস্তুত অবস্থায় বিমানবন্দরে যান। ঢাকা বিমানবন্দরের নামাজ কক্ষ ব্যবহারের পরিকল্পনা থাকলে আপনার তারিখে কোনটি খোলা ও সহজলভ্য তা যাচাই করুন; এই পর্যালোচনায় টার্মিনাল পরিদর্শন করা হয়নি। [২]

কাপড় কেবিনে নাগালের মধ্যে রাখুন। পুরুষদের জন্য ইজার ও রিদা, চাইলে বেল্ট বা ক্লিপ; সাদা রং সুন্নত, বাধ্যতামূলক নয়। নারীরা যেকোনো ঢিলেঢালা, শরীর ঢাকা ও অলংকারমুক্ত পোশাক পরতে পারেন — মন্ত্রণালয়ের গাইডের ভাষায়; পোশাক ও নিষেধাজ্ঞার বিস্তারিত নারীদের ইহরাম গাইডে আছে। কাপড় চেক-ইন লাগেজে নয়, কেবিন ব্যাগে রাখুন আপনার এয়ারলাইন্সের সীমার মধ্যে — বিধানে কোনো নির্দিষ্ট কেজি সংখ্যা নেই। [২]

ঘোষণা এলে, বা আপনি বুঝতে পারলে যে বিন্দুর কাছে পৌঁছাচ্ছেন, ইবাদতের নিয়ত ঘোষণা করুন ও তালবিয়া শুরু করুন। মন্ত্রণালয় “লাব্বাইকা আল্লাহুম্মা ওমরাহ” বাক্যটি এবং পরের তালবিয়া ছেপেছে। পুরুষরা উচ্চৈঃস্বরে, নারীরা নিম্নস্বরে পাঠ করবেন। ঘোষণা না এলে ও সন্দেহ থাকলে সীমা ছাড়িয়ে যাওয়ার আগেই কাজ করুন, পরে বিষয়টি আলেমের সঙ্গে নিষ্পত্তি করুন। [২]

ইহরামে প্রবেশের পর ইবাদত শেষ না হওয়া পর্যন্ত নিষেধাজ্ঞা কার্যকর থাকে। মন্ত্রণালয়ের গাইডে সাধারণ নিষেধাজ্ঞা — যৌন সম্পর্ক, বিবাহ বন্ধন, শিকার, মাথা মুণ্ডন বা নখ কাটা এবং সুগন্ধি — এবং অতিরিক্তভাবে পুরুষের মাথা ঢাকা ও সেলাই করা পোশাক, নারীর নিকাব ও গ্লাভস উল্লেখ করা হয়েছে। এই পেজ অসুস্থতা, চিকিৎসা যন্ত্র বা ব্যক্তিগত পরিস্থিতির জন্য কোনো ছাড় নির্ধারণ করে না। [২]

যাত্রীর যাচাই (ihramTransit): সরাসরি ফ্লাইট ট্রানজিটের প্রশ্ন মেটায়, সময়ের প্রশ্ন মেটায় না। আপনার ফ্লাইট সত্যিই নন-স্টপ কি না (বিরতিসহ থ্রু-সার্ভিস নয়) নিশ্চিত করুন, কাপড় সঙ্গে রাখুন, এবং ক্রু ঘোষণা না দিলে কী করবেন তা আগেই ঠিক করুন। বোর্ডিং পাস, ভিসা বা সিটের ক্লাস সীমারেখার বিধান বদলায় না।

৪. উপসাগরীয় হাবে সংযোগ
সংযোগের ক্ষেত্রে প্রথম লেগ এখনো একই অর্থে হজের লেগ নয়: আপনি হাবের দিকে ওড়ার সময় এখনো সীমারেখার বাইরে। তাই অনেক যাত্রী প্রথম লেগ সাধারণ শালীন পোশাকে যান এবং লেওভারে কাপড় বদলান — এতে হাবে পৌঁছেই নিষেধাজ্ঞায় আবদ্ধ হওয়ার ঝামেলাও থাকে না। [১][২]

যে ফ্লাইট মিকাতের সমান উচ্চতায় আসবে, সেটিতে ওঠার আগেই কাপড় বদলান — অবতরণের পরে নয়। অর্থাৎ লেওভারই স্বাভাবিক প্রস্তুতির সময়, আর নিয়ত করা উচিত সীমা অতিক্রমকারী লেগে — স্বয়ংক্রিয়ভাবে হাবে নয়, কারণ হাব সাধারণত এখনো সীমারেখার বাইরে। নুসুকের হজ নির্দেশনাও একই সূচনা বর্ণনা করে: বিমানে থাকা যাত্রী আকাশপথে নির্ধারিত মিকাত বিন্দুর কাছে এলে ইহরামের নিয়ত করবেন। [১][২][৫]

বৃহৎ উপসাগরীয় টার্মিনালে সাধারণত নামাজ ও ওযুর সুবিধা থাকে, তবে এই পর্যালোচনায় কোনো বিমানবন্দরের পেজ খুলে নির্দিষ্ট কোনো হাবে আলাদা চেঞ্জিং রুম, শাওয়ার বা ইহরামের জন্য নির্ধারিত স্থানের নিশ্চয়তা পাওয়া যায়নি। আরামে কাপড় বদলানোকে নিজের ব্যবস্থা হিসেবে ধরুন — নামাজ কক্ষ, শান্ত কোণ বা পাওয়া গেলে ফ্যামিলি ওয়াশরুম — প্রকাশিত সেবা হিসেবে নয়। [২]

চেক-ইনে জিজ্ঞেস করুন সংযোগটি সুরক্ষিত কি না এবং লেওভার কত দীর্ঘ। স্বল্প সংযোগ হলে হাবে ভরসা না করে প্রথম উড্ডয়নের আগেই ইহরামে প্রবেশ করাই বাস্তবসম্মত কারণ। কোনোটিই বিধান বদলায় না; শুধু প্রস্তুতির স্থান বদলায়। [১]

যাত্রীর যাচাই (ihramTransit): কোথায় কাপড় বদলাবেন ঠিক করার আগে লেওভারের দৈর্ঘ্য, টার্মিনাল পরিবর্তন এবং ব্যাগ থ্রু-চেক হয় কি না নিশ্চিত করুন। কাপড় ও ছোট ব্যাগ সঙ্গে রাখুন। সংযোগ স্বল্প বা বিমানবন্দর অপরিচিত হলে প্রথম ফ্লাইটের আগেই প্রস্তুতি নিন। সংযোগ মিস বা দ্বিতীয় লেগ বিলম্বিত হলে ইহরামে প্রবেশের নতুন কোনো স্থান তৈরি হয় না।

৫. আগে মদিনায় অবতরণ, তারপর মক্কা
আপনার টিকিট যদি মদিনার প্রিন্স মোহাম্মদ বিন আব্দুল আজিজ বিমানবন্দরে নামে, তবে সেই ফ্লাইটে আপনি সীমারেখা অতিক্রম করছেন না, তাই বিমানে ইহরামে প্রবেশের প্রশ্ন নেই। আপনি সাধারণ পোশাকে যাবেন এবং পরে, মক্কার উদ্দেশ্যে রওনা হওয়ার সময় ইহরামে প্রবেশ করবেন। [১][২]

সেই যাত্রার মিকাত হলো যুল হুলাইফা, যা আবইয়ার আলী নামেও পরিচিত; মন্ত্রণালয় এটিকে মক্কা থেকে প্রায় ৪২০ কিমি দূরে বলে এবং মদিনাবাসী ও সেই পথে যাওয়া সবাইয়ের মিকাত হিসেবে বর্ণনা করে। মদিনার হোটেলে কাপড় পরুন এবং আপনার বাহন যুল হুলাইফার সমান উচ্চতার বিন্দুতে পৌঁছানোর আগেই নিয়ত ও তালবিয়া সম্পন্ন করুন। [১][২]

ঘোষণার ওপর পরিকল্পনা করবেন না। সড়কপথে চালক কিছু বলতে পারেন, নাও পারেন; হারামাইন হাই-স্পিড ট্রেনের ক্ষেত্রে এই পর্যালোচনায় কোনো পরিচালক বা কর্তৃপক্ষের পেজ পাওয়া যায়নি যেখানে ট্রেনে মিকাত ঘোষণা বা ইবাদতের জন্য থামার কথা বলা আছে। দায়িত্ব নিজে নিন: চালকের সঙ্গে ঠিক করে নিন, বা রুট লক্ষ্য করুন, এবং স্টেশন বা ঘোষণার অপেক্ষা না করে সমান্তরাল বিন্দুর আগেই ইহরামে থাকুন। [১][২]

মন্ত্রণালয়ের গাইড সীমারেখার ভেতরে অবস্থানকারীদের অবস্থানও বলে দেয়। মক্কায় থাকা ব্যক্তি আরেকটি ওমরাহর জন্য হারামের বাইরের নিকটতম স্থান থেকে ইহরামে প্রবেশ করেন, যেমন মসজিদে আয়েশা; মক্কা ও মাওয়াকিতের মধ্যবর্তী স্থানে থাকা ব্যক্তি তাঁর বর্তমান স্থান থেকে; আর যে ব্যক্তি কাজ বা পরিবারের জন্য জেদ্দায় এসেছিলেন এবং পরে ওমরাহর সিদ্ধান্ত নেন, তিনি যেখানে আছেন সেখান থেকেই শুরু করেন। এসব আগেই নিয়ত করে আসা যাত্রীর অবস্থা থেকে আলাদা, এবং ব্যক্তিগত অবস্থার প্রশ্ন আলেমের কাছে। [১][২]

যাত্রীর যাচাই (ihramMadinah): মদিনা আগে হলে মক্কার লেগে বদলানো ও নামাজের যথেষ্ট সময় রাখুন, এবং চালক বা রেল পরিচালকের কাছে জেনে নিন রুটটি সমান্তরাল বিন্দু কোথায় অতিক্রম করে। ট্রেনের ঘোষণা, স্টেশন স্টপ বা হোটেল শাটল এমনিতেই ব্যবস্থা করে দেবে — এই ধারণা করবেন না। অন্য উদ্দেশ্যে ইতিমধ্যে সীমারেখার ভেতরে থাকলে মন্ত্রণালয়ের কোন শ্রেণি আপনার ক্ষেত্রে প্রযোজ্য তা আলেমকে জিজ্ঞেস করুন।

৬. সচরাচর জিজ্ঞাসা
জেদ্দা বিমানবন্দরে নামার পর কি ইহরাম পরা যাবে?
যাবে না, যদি আপনি ওমরাহ বা হজের নিয়তে উড়ে আসেন। মন্ত্রণালয় বলছে বিমানবন্দর মিকাতও নয়, ইহরামে প্রবেশের স্থানও নয়; তাই নিয়ত ও তালবিয়া বিমান মিকাতের সমান্তরাল বিন্দুতে পৌঁছানোর আগেই করতে হবে। [১]
ঢাকা থেকে আমার ফ্লাইটে কোন মিকাত প্রযোজ্য?
যেটির সমান উচ্চতায় আপনার প্রকৃত রুট আসে। মন্ত্রণালয় পাঁচটি স্থান দেয় এবং জাতীয়তা নয়, দিক অনুযায়ী প্রয়োগ করে; যাত্রী যে মিকাত অতিক্রম করেন বা তার সমান্তরাল বিন্দু সেখান থেকেই ইহরামে প্রবেশ করেন। আপনার ফ্লাইটে কোনটি, তা পরিচালনাকারী এয়ারলাইন্স বা ক্রুকে জিজ্ঞেস করুন। [১][২][৩]
বিমান কখন মিকাতে আছে তা আমি কীভাবে জানব?
মন্ত্রণালয়ের গাইড বলছে জেদ্দাগামী বিমানগুলো সাধারণত ঘোষণা দেয় যাতে যাত্রী সময়মতো ইহরামে প্রবেশ করতে পারেন। খোলা কোনো এয়ারলাইন্স পেজ ঘোষণা, তার ভাষা বা সময়ের নিশ্চয়তা দেয় না। সন্দেহ হলে আগে কাজ করার মতো প্রস্তুতি রাখুন। [২]
শুধু ইহরামের কাপড় পরলেই কি ইহরাম হয়ে যায়?
না। মন্ত্রণালয়ের গাইড বলছে ইহরাম শুরু হয় যখন যাত্রী ইবাদতের নিয়ত করেন ও তালবিয়া শুরু করেন; নুসুকের জার্নি পেজেও নিয়ত ও তালবিয়াই ধাপ, কাপড় প্রস্তুতি। আগে কাপড় পরা ঠিক আছে, কিন্তু সেটি ইহরাম অবস্থা নয়। [২][৪]
মদিনায় নামা ফ্লাইটে কি ইহরাম লাগে?
না। সেই ফ্লাইটে মক্কার পথে মদিনা অতিক্রম হয় না, তাই পরে যুল হুলাইফা থেকে ইহরামে প্রবেশ করবেন — হোটেলে কাপড় পরে, রুট সমান্তরাল বিন্দুতে পৌঁছানোর আগে নিয়ত সম্পন্ন করে। [১][২]
ইহরাম ছাড়া মিকাত অতিক্রম করলে কী হবে?
মন্ত্রণালয়ের পেজে দুটি ফলাফল আছে: যে অতিক্রম করে সে ফিরে যাবে, আর যে অতিক্রমের পর ইহরাম ধরে তাকে ফিদইয়া (ক্ষতিপূরণ) দিতে হবে। আপনার ক্ষেত্রে কোনটি প্রযোজ্য এবং ফেরা সম্ভব না হলে কী করবেন — এটি যোগ্য আলেমের প্রশ্ন; এই পেজ তা নির্ধারণ করে না। [১]`,
    references: [
      {
        name: "Ministry of Hajj and Umrah — Miqat locations, the air-travel rule, distances and the return/Fidyah sequence (page stamp 18 October 2026)",
        nameBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয় — মিকাতের স্থান, আকাশপথের বিধান, দূরত্ব এবং ফিরে যাওয়া/ফিদইয়ার ক্রম (পেজ স্ট্যাম্প ১৮ অক্টোবর ২০২৬)",
        url: "https://haj.gov.sa/en/Umrah/Miqaats",
      },
      {
        name: "Ministry of Hajj and Umrah — Ihram Awareness Guide (English PDF, G07_EN_V3)",
        nameBn: "সৌদি হজ ও ওমরাহ মন্ত্রণালয় — ইহরাম সচেতনতা গাইড (ইংরেজি পিডিএফ, G07_EN_V3)",
        url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/Ihram-Guide/English/en-ihram-guide.pdf",
      },
      {
        name: "Sahih al-Bukhari 1526 — Ibn Abbas on the Mawaqit appointed by the Prophet",
        nameBn: "সহিহ বুখারি ১৫২৬ — ইবনে আব্বাস (রা.): রাসূলুল্লাহ (সা.) নির্ধারিত মাওয়াকিত",
        url: "https://sunnah.com/bukhari:1526",
      },
      {
        name: "Nusuk — Umrah Journey: Ihram as the first step (intention and Talbiyah)",
        nameBn: "নুসুক — ওমরাহ জার্নি: প্রথম ধাপ ইহরাম (নিয়ত ও তালবিয়া)",
        url: "https://umrah.nusuk.sa/Journey",
      },
      {
        name: "Nusuk Hajj — Hajj rituals: intention for Ihram when the aircraft approaches the Miqat",
        nameBn: "নুসুক হজ — হজের ইবাদত: বিমান মিকাতের কাছে এলে ইহরামের নিয়ত",
        url: "https://hajj.nusuk.sa/nusuk/hajj-rituals",
      },
      {
        name: "Jordan General Iftaa Department, Fatwa 2982 (29 September 2014)",
        nameBn: "জর্ডান জেনারেল ইফতা বিভাগ, ফতোয়া ২৯৮২ (২৯ সেপ্টেম্বর ২০১৪)",
        url: "https://aliftaa.jo/research-fatwa-english/2982/A-Pilgrim-Traveling-by-Plane-Assumes-Ihram-upon-Reaching-the-Miqat",
      },
    ],
    internalLinks: [
      { text: "নারীদের জন্য ওমরাহ গাইড ও ইহরামের নিয়ম", path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates" },
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "মক্কা-মদিনা হোটেল জোন ও হারামাইন ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw ফ্লাইট গাইড", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "DIY ওমরাহ প্ল্যানিং ও BDT খরচ ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "ইহরাম অবস্থায় জেদ্দা এয়ারপোর্ট থেকে পরিবারসহ মক্কার হোটেলে?",
      body: "জেদ্দা এয়ারপোর্ট থেকে মক্কার হোটেল পর্যন্ত ঐচ্ছিক প্রাইভেট সেডান বা ফ্যামিলি মিনিভ্যান তুলনা করুন। গাড়ির আকার, লাগেজ ধারণক্ষমতা, মিট-অ্যান্ড-গ্রিট ও প্রাপ্যতা আগেই সরবরাহকারীর সঙ্গে নিশ্চিত করুন — ট্রান্সফার আপনার ইহরামে প্রবেশের সময় বা স্থান বদলায় না।",
    },
  },
  "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": {
    title: "জমজম, খেজুর ও স্বর্ণ: বাংলাদেশে আসলে কী কী আনা যাবে (২০২৬)",
    summary:
      "১৯ অক্টোবর ২০২৬ তারিখে মদিনা বিমানবন্দরের পরিচালক, সৌদিয়ার কন্ডিশনস অব ক্যারেজ, হজ ও ওমরাহ মন্ত্রণালয়ের জমজম নির্দেশনা, ঢাকা বিমানবন্দরের কাস্টমস এবং এনবিআরের ২০২৫ ব্যাগেজ বিধির সঙ্গে যাচাই করা: প্রতি হাজীর জন্য একটি সিল করা ৫ লিটার জমজম বোতল ১২.৫০ রিয়ালে; খেজুরে কেজিতে কোনো প্রকাশিত ছাড় নেই, বিচার হয় ব্যক্তিগত ব্যবহারে; আর ক্যালেন্ডার বছরে একবার ১০০ গ্রাম স্বর্ণালংকার বা ২০০ গ্রাম রুপা, ঘোষণা সাপেক্ষে ১১৭ গ্রাম পর্যন্ত স্বর্ণবার।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৭ মিনিট পড়া",
    content: `ওমরাহ বা হজ শেষে দেশে ফেরার সময় ঢাকা বিমানবন্দরে কাস্টমস নিয়ে যে তিনটি বিষয়ে সবচেয়ে বেশি ঝামেলা হয়, সেগুলো হলো জমজমের বাক্স, খেজুর আর স্বর্ণ। এই গাইড ঠিক এই তিনটি নিয়েই — প্রতিটি নিয়ম আসলে কী বলে, কে প্রকাশ করে, আর মক্কায় আপনাকে যে পরামর্শ দেওয়া হয়েছে সেটি কোথায় গিয়ে আর সত্য থাকে না। এটি আইনি পরামর্শ নয়, আর এই পেজে যেমন লেখা আছে ঠিক তেমনভাবেই আপনার ব্যাগ যাচাই হবে — এমন কোনো বাধ্যবাধকতাও কর্মকর্তার নেই।

দ্রুত উত্তর — যাচাইয়ের তারিখ ১৯ অক্টোবর ২০২৬: প্রতি হাজীর জন্য একটি সিল করা ৫ লিটার জমজম, বিমানবন্দর থেকেই কেনা এবং কখনোই লাগেজের ভেতরে নয়; মদিনা বিমানবন্দর পরিচালনাকারী প্রতিষ্ঠান এর দাম লিখেছে ১২.৫০ রিয়াল [১]। বাংলাদেশে শুল্কমুক্ত সীমা — ১০০ গ্রাম স্বর্ণালংকার ও ২০০ গ্রাম রুপার গহনা, একই ধরনের সর্বোচ্চ ১২টি, ক্যালেন্ডার বছরে একবার; আর একটি স্বর্ণবার সর্বোচ্চ ১১৭ গ্রাম (১০ তোলা), প্রতি ১১.৬৬৪ গ্রামে ৫,০০০ টাকা শুল্ক — ঘোষণা করতে হবে, নাহলে জব্দ হবে [৪][৫]। খেজুরের জন্য কেজিতে কোনো প্রকাশিত ছাড় নেই: বিচার হবে ব্যক্তিগত ব্যবহার বনাম বাণিজ্যিক পরিমাণ, আর বাণিজ্যিক পরিমাণ জব্দ হতে পারে [৪]।

১. জমজমের বাক্স: একটি বোতল, বিমানবন্দর থেকে কেনা, আলাদাভাবে বহন
নিয়মটি আপনি কত পানি মালিকানায় রাখেন তা নিয়ে নয়; নিয়ম কোন কন্টেইনার বিমানে ওঠা যাবে তা নিয়ে। মদিনা বিমানবন্দরের পরিচালনাকারী প্রতিষ্ঠান লিখেছে, যাত্রী নির্ধারিত জমজম বিক্রয়কেন্দ্র থেকে একটি ৫ লিটার বোতল কিনতে পারেন, বৈধ পাসপোর্ট প্রয়োজন, প্রতিটি ক্রয়ে এক বোতল সীমা, এবং বোতল "আলাদাভাবে বহন করতে হবে এবং চেক-ইন লাগেজে রাখা নিষিদ্ধ" [১]। সৌদিয়ার কন্ডিশনস অব ক্যারেজও একই কথা বলে: বোতল চেক-ইন লাগেজের ভেতরে অনুমোদিত নয় [২]।

মার্চ ২০২৫-এ প্রকাশিত হজ ও ওমরাহ মন্ত্রণালয়ের নির্দেশনায় কেনার দিকটি যোগ হয়েছে: বিমানবন্দরের অনুমোদিত বিক্রয়কেন্দ্র থেকে কিনুন, বোতল নির্ধারিত বেল্টে দেওয়ার জন্য হস্তান্তর করুন, এবং বৈধ ওমরাহ ভিসা বা নুসুক পারমিট দেখান [৩]। মদিনার পরিচালকের পেজ পাসপোর্ট চায়; ভিসা বা পারমিটকে মন্ত্রণালয়ের শর্ত আর পাসপোর্টকে কাউন্টারের শর্ত হিসেবে ধরুন [১][৩]।

মক্কা বা মদিনার দোকান থেকে খোলা বোতল কিনে সেটি বিমানে যাবে — এটা ধরে নেবেন না। নিজের বোতলে পানি ঢালবেন না, আর লাগেজের ভেতরে কাপড়ে জড়িয়ে বোতল রাখবেন না। গৃহীত পণ্য হলো বাদশাহ আব্দুল্লাহ বিন আব্দুল আজিজ জমজম ওয়াটার প্রকল্পের কারখানায় সিল করা কন্টেইনার, যা বিমানবন্দরে বিক্রি হয়, ট্যাগ লাগিয়ে আপনার ব্যাগ থেকে আলাদাভাবে লোড হয় [১][২][৩]।

যাত্রীর যাচাই (zamzamBox): ভ্রমণের দিনেই বিমানবন্দরে বাক্স কিনুন, সিল অক্ষত রাখুন, আর লাগেজে না ভরে কাউন্টারে হস্তান্তর করুন। বিমানবন্দরের বাইরে কেউ সস্তায় "সিল করা" বাক্স দিলে বুঝুন সেটি এয়ারলাইন্স গ্রহণ করবে না, আর চেক-ইনে নতুন করে গোছাতে হবে আপনারই।

২. বাক্সের দাম, আর এটি আপনার ব্যাগেজ ফাঁকা করে কি না
মদিনা পরিচালনাকারী প্রতিষ্ঠান ৫ লিটার বোতলের দাম লিখেছে ১২.৫০ রিয়াল [১]। জেদ্দার কাউন্টারে বারবার প্রায় ১২ রিয়াল রিপোর্ট হয়েছে, তবে ওই দিনে বিমানবন্দরের নিজের কাউন্টার দামই প্রযোজ্য হবে। এই পেজের আগের সংস্করণে ৪৮ রিয়াল লেখা ছিল; ওই সংখ্যাটি অন্য একটি পণ্যের — নুসুক অ্যাপে রাজ্যের ভেতরে হোম ডেলিভারির ২৪ × ৩৩০ মিলি কার্টনের — এবং হাজীর বোতলের দাম নয় [১]।

বাক্সটি ফ্রি না ব্যাগেজের মধ্যে গণ্য, সেটি এয়ারলাইন্সের প্রশ্ন এবং উত্তর ক্যারিয়ারভেদে আলাদা। সৌদিয়ার প্রকাশিত শর্তে জেদ্দা বা মদিনা থেকে যাওয়া অতিথির জন্য একটি ৫ লিটার বোতল বিনামূল্যে, তবে তা অনুমোদিত চেক-ইন ব্যাগেজের অংশ হিসেবে গণ্য; অতিরিক্ত বোতল অতিরিক্ত ব্যাগেজ; আর বোতল হারালে বা দেরি হলে সৌদিয়া ক্ষতিপূরণ দেয় না, সম্ভব হলে বিকল্প বোতল দেয় [২]। হোয়াটসঅ্যাপ গ্রুপে ঘোরা "সবসময় ফ্রি বাড়তি পিস" পরামর্শের ঠিক উল্টোটি এটি।

বিমানের ক্ষেত্রে এই পর্যালোচনায় এয়ারলাইন্সের ব্যাগেজ পেজে জমজমের কোনো প্রকাশিত ছাড় পাওয়া যায়নি। বিমান বাক্স বহন করে — অক্টোবর ২০২৬-এ মদিনা–ঢাকা ফ্লাইটে জমজম পৌঁছাতে দেরি হওয়া নিয়ে প্রকাশ্য অভিযোগ হয়েছিল — কিন্তু বহন প্রথা প্রকাশিত ছাড় নয় [৬]। চেক-ইনে বিমানকে জিজ্ঞেস করুন, সম্ভব হলে লিখিতভাবে, বাক্সটি টিকিটের অতিরিক্ত না টিকিটের ভেতরে।

যাত্রীর যাচাই (zamzamAirline): কেনার আগে পরিচালনাকারী এয়ারলাইন্সের কাছে দুটি বিষয় নিশ্চিত করুন: ৫ লিটার বাক্স আপনার চেক-ইন ছাড়ের অতিরিক্ত না তার ভেতরে, এবং ক্ষতিপূরণ ছাড়া হারিয়ে যাওয়া কি গ্রহণযোগ্য। ৫ লিটার বোতলের ওজন ৫ কেজির বেশি, তাই ক্যারিয়ার এটি গণনায় আনলে বাকি সবকিছুর জন্য ততটা কম থাকে।

৩. খেজুর: কেজিতে ছাড় নেই — আছে ব্যক্তিগত ব্যবহারের পরীক্ষা
বাংলাদেশের বিমানবন্দর কাস্টমসের নির্দেশনা সীমারেখাটি স্পষ্ট করে বলে: যাত্রীর আনা পণ্য শুল্কমুক্ত "যদি বাণিজ্যিক না হয়", আর "বাণিজ্যিক উদ্দেশ্যে আনা যেকোনো পরিমাণ পণ্য জব্দ করা হবে" [৪]। শুকনো খেজুর ব্যক্তিগত ব্যাগেজ নয় বরং চালান হিসেবে গণ্য হলে ২৫% কাস্টমস শুল্ক বহন করে [৭]। আর এই পর্যালোচনায় যা কিছু খোলা গেছে তার কোথাও যাত্রীপ্রতি "৫ কেজি" বা "১০ কেজি" খেজুরের প্রকাশিত ছাড় নেই — এই পেজ আগে যে সংখ্যা ছাপত, তার পেছনে কোনো সোর্স ছিল না।

ব্যবহারিক অর্থ: পরিবারের নিজের খাওয়ার পরিমাণ, গ্রেড ও প্যাকিং তারিখ দৃশ্যমান এমন সিল করা খুচরা বা ভ্যাকুয়াম প্যাকে, আপনার ব্যক্তিগত ব্যাগেজ ছাড়ের ভেতরে পড়ে। পাড়ায় বিলি করার জন্য কয়েক কার্টন, বা রিসেলের স্টকের মতো দেখতে পরিমাণ — বাণিজ্যিক বিচারের দিকে নিয়ে যায়, আর তার সঙ্গে আসে শুল্ক নির্ধারণ বা জব্দ [৪][৭]।

খেজুরের দাম গ্রেড, দোকান আর সিজন অনুযায়ী বদলায়, তাই এই পেজ আর কেজিপ্রতি এমন তালিকা ছাপায় না যা যাচাই করা যায় না। কেজিপ্রতি দাম জিজ্ঞেস করুন, প্যাকিং তারিখ দেখুন, "পাইকারি দাম" বিশ্বাস না করে দুটি দোকান তুলনা করুন, আর মনে রাখুন সবচেয়ে সস্তা কার্টন প্রায়ই গত সিজনের মজুদ।

যাত্রীর যাচাই (datesAllowance): খেজুর রাখুন নিজের পরিবারের জন্য, বিক্রির জন্য নয় — এমন সিল করা প্যাকে যা খুলে দেখানো যায়। উপহার হিসেবে বড় পরিমাণ নিলে ঘোষণা করুন এবং বাণিজ্যিক ব্যবহার নিয়ে প্রশ্নের জন্য প্রস্তুত থাকুন; ফলাফল ওজনে নয়, ওই প্রশ্নের উত্তরে নির্ধারিত হয়।

৪. স্বর্ণ: বাংলাদেশ আসলে কী শুল্কমুক্ত রাখে
ঢাকা বিমানবন্দরের কাস্টমস পেজে শুল্কমুক্ত তালিকা আছে: "১০০ গ্রাম স্বর্ণালংকার ও ২০০ গ্রাম রুপার গহনা (একই ধরনের সর্বোচ্চ ১২টি)", ২ জুন ২০২৫-এর এসআরও নং ২৬১-অ্যাক্ট/২০২৫/৭১/কাস্টমস অনুযায়ী [৪]। ২০২৫-এর ব্যাগেজ বিধিমালায় দুটি শর্ত যোগ হয়েছে যা এই পেজের আগের সংস্করণে ছিল না: ছাড়টি **ক্যালেন্ডার বছরে একবার**, আপনি যতবারই ভ্রমণ করুন না কেন; আর গহনাটি হতে হবে ২২ ক্যারেট বা তার নিচের অলংকার — সংজ্ঞাটি কঠোর করা হয়েছে যাতে গলিয়ে ২৪ ক্যারেটের বার বালা হিসেবে পার না হয় [৫][৮]।

বার আলাদা ও আরও কঠোর। যাত্রী সর্বোচ্চ ১১৭ গ্রাম বা ১০ তোলা স্বর্ণবার/ইঙ্গট আনতে পারেন, বছরে একবার, ঘোষণা করে প্রতি ১১.৬৬৪ গ্রামে ৫,০০০ টাকা শুল্ক দিয়ে — পুরো ১১৭ গ্রামে প্রায় ৫০,০০০ টাকা [৪]। এরপর কী হয় তা বিমানবন্দরের পেজে অস্পষ্ট নয়: ১১৭ গ্রামের বেশি যেকোনো পরিমাণ জব্দ হবে, আর স্বর্ণবার, ইঙ্গট বা অলংকার ছাড়া অন্য স্বর্ণ ঘোষণা না করে আনা সম্পূর্ণ বেআইনি — ঘোষণা না করা স্বর্ণ পাওয়া গেলে আটক ও ফৌজদারি মামলা হয় [৪]।

কেনার আগে আরেকটি বিধি জেনে রাখুন: ২০২৪ সালের বাজেট প্রতিবেদনে ১২ বছরের কম বয়সী যাত্রীদের স্বর্ণ ছাড় থেকে সম্পূর্ণ বাদ দেওয়া হয়েছিল। এটিকে প্রতিবেদিত অবস্থান ধরুন এবং শিশুর নামে পরিবারের স্বর্ণ বহনের আগে বর্তমান এসআরও-তে নিশ্চিত করুন [৮]।

যাত্রীর যাচাই (goldDeclare): ওড়ার আগে অলংকারের ওজন মেপে নিন এবং একই ধরনের টুকরো গুনুন। ২২ ক্যারেট বা নিচের ১০০ গ্রামের কম অলংকার, একই ধরনের ১২টির কম টুকরোয় — সবুজ চ্যানেল ব্যবহার করতে পারেন। এর বাইরে সবকিছু, যেকোনো বারসহ, কাস্টমস হল ছাড়ার আগেই ঘোষণা করতে হবে; আর ঘোষণা না করে আনার চেষ্টা কাগজপত্রের ভুল নয়, চোরাচালান হিসেবে বিবেচিত হয়।

৫. ১৫% ভ্যাট ফেরত: বাস্তব স্কিম, কিন্তু শর্তগুলো বেশিরভাগ হাজী মিস করেন
সৌদি আরবে ১৫% ভ্যাট আছে, আর এপ্রিল ২০২৫ থেকে অনাবাসিক দর্শনার্থীরা অংশগ্রহণকারী বিক্রেতার কাছ থেকে কেনা যোগ্য পণ্যের ভ্যাট ফেরত পেতে পারেন, স্কিম পরিচালনাকারী গ্লোবাল ব্লু-এর মাধ্যমে [৯]। শিরোনামের চেয়ে শর্তগুলোই গুরুত্বপূর্ণ: ক্রেতার বয়স ১৮ বা বেশি এবং তিনি অনাবাসিক হতে হবে; এক বিক্রেতার কাছে একদিনে কেনাকাটা ৫০০ রিয়ালে পৌঁছাতে হবে (একই দিনের সর্বোচ্চ তিনটি ইনভয়েস যোগ করা যায়); পণ্য অব্যবহৃত ও আসল প্যাকেজিংয়ে থাকতে হবে; এবং ৯০ দিনের মধ্যে রাজ্য ছাড়তে হবে, প্রস্থানের আগে বিমানবন্দরে যাচাই করিয়ে [৯]।

গহনাতেই ভুলটি হয়। রমজানে পরে ঘুরেছেন এমন আংটি "অব্যবহৃত" নয়, ইনভয়েস যা-ই থাকুক স্কিমে সেটি যোগ্য নয়। গহনাটি বাক্সেই রাখুন, আসল ট্যাক্স-ফ্রি ফর্ম ও ইনভয়েস রাখুন, আর চেক-ইনের আগে যাচাই কাউন্টারে দেখান। মদিনা বিমানবন্দরের পরিচালক মেইন টার্মিনালে গ্লোবাল ব্লু ট্যাক্স-রিফান্ড ডেস্কের কথা লিখেছে, তাই সেবাটি কেবল জেদ্দায় সীমিত নয় — তবে আপনার প্রস্থানের তারিখ ও টার্মিনালে ডেস্কটি চালু আছে কি না নিশ্চিত করুন [৮][৯]।

এটি আপনি দেওয়া করের ফেরত, ছাড় নয়, আর খাবার, পানীয়, তামাক, হোটেল বা রেস্তোরাঁর বিলে প্রযোজ্য নয় [৯]। ক্যাশ কাউন্টারে তাৎক্ষণিক ১৫% ছাড়ের প্রতিশ্রুতি দেওয়া দোকান আসলে অন্য কিছু বোঝাচ্ছে।

যাত্রীর যাচাই (vatRefund): কেনার আগেই ঠিক করুন পণ্যটি ওড়ার আগ পর্যন্ত বাক্সেই থাকবে কি না। পরে পরবেন বলে ঠিক থাকলে ফেরত ফর্মের পেছনে না ছুটে দামেই দরকষাকষি করুন; বাক্সেই থাকলে ৫০০ রিয়ালের শর্ত, প্রতিটি ইনভয়েস আর প্রস্থান বিমানবন্দরের যাচাই কাউন্টার নিশ্চিত করুন।

৬. ফেরার ফ্লাইটের জন্য গোছানোর ক্রম
- জমজম: বিমানবন্দরে কিনুন, সিল অক্ষত রাখুন, কাউন্টারে দিন, লাগেজের ভেতরে নয় [১][২]।
- খেজুর: সিল করা খুচরা বা ভ্যাকুয়াম প্যাক, ব্যক্তিগত পরিমাণ, প্যাকিং তারিখ দৃশ্যমান [৪]।
- স্বর্ণ: ছাড়ের ভেতরে কেবল অলংকার; বাকি সব ঘোষণা করে, শুল্ক দেওয়ার প্রস্তুতি নিয়ে [৪][৫]।
- রসিদ: ট্যাক্স-ফ্রি ফর্ম ও ইনভয়েস পণ্যের সঙ্গে রাখুন, চেক-ইন ব্যাগে নয় [৯]।
- ওষুধ ও তরল: সিল করা জমজম বাক্স ছাড়া বাকি সবকিছুতে কেবিনের ১০০ মিলি নিয়ম প্রযোজ্য।

৭. ঢাকায় অবতরণের পর, ক্রমানুসারে
নামুন, ব্যাগ নিন, তারপর সৎভাবে চ্যানেল ঠিক করুন। অলংকারের ছাড়ের ভেতরে থাকলে এবং শুল্কযোগ্য কিছু না থাকলে সবুজ চ্যানেলই স্বাভাবিক পথ [৪]। বার, ১০০ গ্রামের বেশি অলংকার, বা সন্দেহজনক কিছু থাকলে লাল চ্যানেলে যান এবং কাস্টমস হল ছাড়ার আগেই ঘোষণা দিন — ২০২৫-এর বিধি আগেভাগে ঘোষণাকে ঐচ্ছিক নয়, বাধ্যতামূলক করেছে, আর অনলাইনেও জমা দেওয়া যায় [৫]।

ঘোষণা শাস্তি নয়; এটিই সেই প্রক্রিয়া যা শুল্ক পরিশোধযোগ্য করে, পণ্য জব্দযোগ্য নয়। ব্যয়বহুল ভুল হলো ঘোষণা না করা স্বর্ণ নিয়ে ধরা পড়া, যা বিমানবন্দরের নিজের পেজেই কর সমন্বয় নয়, ফৌজদারি বিষয় হিসেবে বর্ণিত [৪]।

৮. সচরাচর জিজ্ঞাসা
বাংলাদেশে কতটুকু জমজম পানি আনা যাবে?
প্রতি হাজীর জন্য একটি কারখানায় সিল করা ৫ লিটার বোতল, বিমানবন্দরের অনুমোদিত বিক্রয়কেন্দ্র থেকে কেনা এবং আলাদাভাবে বহন করা — চেক-ইন লাগেজে কখনোই নয়। মদিনার পরিচালক দাম লিখেছে ১২.৫০ রিয়াল ও পাসপোর্ট চায়; মন্ত্রণালয় চায় ওমরাহ ভিসা বা নুসুক পারমিট। [১][৩]
জমজমের বাক্স কি ব্যাগেজের অতিরিক্ত ফ্রি?
এয়ারলাইন্সভেদে ভিন্ন। সৌদিয়া জেদ্দা বা মদিনা থেকে একটি ৫ লিটার বোতল বিনামূল্যে দেয়, তবে তা চেক-ইন ছাড়ের ভেতরেই গণ্য, অতিরিক্তে চার্জ, আর হারালে বা দেরি হলে ক্ষতিপূরণ দেয় না। বিমানের কোনো প্রকাশিত জমজম ছাড় এই পর্যালোচনায় পাওয়া যায়নি, তাই চেক-ইনে জিজ্ঞেস করুন। [২][৬]
কত কেজি খেজুর শুল্কমুক্ত আনা যায়?
যাত্রীপ্রতি কেজিতে কোনো প্রকাশিত ছাড় নেই। ব্যাগেজ ছাড়ের ভেতরে ব্যক্তিগত ব্যবহারের পরিমাণ শুল্কমুক্ত; বাণিজ্যিক দেখতে পরিমাণ জব্দ হতে পারে, আর চালান হিসেবে গণ্য শুকনো খেজুরে ২৫% শুল্ক। [৪][৭]
ঢাকা বিমানবন্দরে কত স্বর্ণালংকার শুল্কমুক্ত?
১০০ গ্রাম স্বর্ণালংকার ও ২০০ গ্রাম রুপার গহনা, একই ধরনের সর্বোচ্চ ১২টি, ক্যালেন্ডার বছরে একবার, আর স্বর্ণ হতে হবে ২২ ক্যারেট বা নিচের অলংকার। [৪][৫][৮]
স্বর্ণবার আনা যাবে?
বছরে একটি বার, সর্বোচ্চ ১১৭ গ্রাম (১০ তোলা), ঘোষণা করে প্রতি ১১.৬৬৪ গ্রামে ৫,০০০ টাকা শুল্কে। ১১৭ গ্রামের বেশি জব্দ হবে, আর ঘোষণা না করা স্বর্ণ ফৌজদারি বিষয়। [৪]
মক্কা বা মদিনায় কেনা স্বর্ণে কি ১৫% সৌদি ভ্যাট ফেরত পাওয়া যায়?
শুধু শর্ত পূরণ হলে: এক বিক্রেতার কাছে ৫০০ রিয়াল, পণ্য অব্যবহৃত ও আসল প্যাকেজিংয়ে, ৯০ দিনের মধ্যে প্রস্থান, এবং ওড়ার আগে বিমানবন্দর কাউন্টারে যাচাই। পরে পরা গহনা "অব্যবহৃত" নয়, তাই যোগ্য নয়। [৮][৯]`,
    internalLinks: [
      { text: "ঢাকা বিমানবন্দর প্রি-ডিপার্চার ও ব্যাগেজ হাব", path: "/pre-departure" },
      { text: "বাংলাদেশ থেকে ফ্লাইটে ইহরাম ও মিকাতের নিয়ম", path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules" },
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw ফ্লাইট গাইড", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "মক্কা-মদিনা হোটেল জোন ও হারামাইন ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "সম্পূর্ণ DIY Umrah ও ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "DIY Umrah ইন্টেলিজেন্স পোর্টাল ও BDT ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "৪৬ কেজি লাগেজ আর জমজমের বাক্স নিয়ে ফিরছেন?",
      body: "মক্কা বা মদিনার হোটেল থেকে বিমানবন্দর পর্যন্ত ঐচ্ছিক বড় গাড়ি তুলনা করুন, যাতে বাক্স ও লাগেজ এক ট্রিপেই যায়। আসন, লাগেজ ধারণক্ষমতা ও প্রাপ্যতা সরবরাহকারীর কাছে নিশ্চিত করুন — গাড়ি বদলালেও এয়ারলাইন্সের জমজম বা ব্যাগেজ নিয়ম বদলায় না।",
    },
    references: [
      {
        name: "Tibah Airports (Madinah) — Zamzam Sale Point",
        nameBn: "তিবাহ এয়ারপোর্টস (মদিনা) — জমজম বিক্রয়কেন্দ্র: ৫ লিটার ১২.৫০ রিয়াল, পাসপোর্ট, প্রতি ক্রয়ে একটি, আলাদাভাবে বহন, চেক-ইন লাগেজে নয়",
        url: "https://tibahairports.com/en-EN/airport-services-facilities/page/zamzam-sales-service-en",
      },
      {
        name: "Saudia — General Conditions of Carriage (Zamzam)",
        nameBn: "সৌদিয়া — জেনারেল কন্ডিশনস অব ক্যারেজ: জেদ্দা বা মদিনা থেকে একটি ৫ লিটার, চেক-ইন ছাড়ের ভেতরে, অতিরিক্তে এক্সেস, ক্ষতিপূরণ নেই",
        url: "https://www.saudia.com/information/terms-and-conditions/general-conditions-of-carriage",
      },
      {
        name: "Saudi Gazette — Ministry guidance on carrying Zamzam",
        nameBn: "সৌদি গেজেট — জমজম বহনে হজ ও ওমরাহ মন্ত্রণালয়ের নির্দেশনা",
        url: "https://saudigazette.com.sa/article/650555",
      },
      {
        name: "Hazrat Shahjalal International Airport — Customs",
        nameBn: "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর — কাস্টমস: শুল্কমুক্ত তালিকা, স্বর্ণবারের শুল্ক, ১১৭ গ্রাম সীমা, বছরে একবার",
        url: "https://www.hsia.gov.bd/content-details/10/Customs",
      },
      {
        name: "National Board of Revenue via BSS — 2025 baggage rules",
        nameBn: "জাতীয় রাজস্ব বোর্ড, বিএসএস সূত্রে — ২০২৫ ব্যাগেজ বিধি: বছরে ১০০ গ্রাম স্বর্ণ বা ২০০ গ্রাম রুপা, ১০ তোলার বার, ঘোষণা বাধ্যতামূলক",
        url: "https://www.bssnews.net/others/288568",
      },
      {
        name: "Dhaka Tribune — Biman Zamzam delivery delay, October 2026",
        nameBn: "ঢাকা ট্রিবিউন — মদিনা–ঢাকা ফ্লাইটে বিমানের জমজম সরবরাহে দেরি, অক্টোবর ২০২৬",
        url: "https://www.dhakatribune.com/bangladesh/421147/",
      },
      {
        name: "National Board of Revenue — Bangladesh Customs Tariff, Chapter 8 (dried dates)",
        nameBn: "জাতীয় রাজস্ব বোর্ড — বাংলাদেশ কাস্টমস ট্যারিফ, অধ্যায় ৮ (শুকনো খেজুর)",
        url: "https://nbr.gov.bd/uploads/tariff_schedule/Chapter-8.pdf",
      },
      {
        name: "Tibah Airports (Madinah) — Tax Refunds (Global Blue desk)",
        nameBn: "তিবাহ এয়ারপোর্টস (মদিনা) — ট্যাক্স রিফান্ড (গ্লোবাল ব্লু ডেস্ক)",
        url: "https://tibahairports.com/en-EN/airport-services-facilities/page/tax-refunds-en",
      },
      {
        name: "Saudi Gazette — tourist VAT refund scheme launch",
        nameBn: "সৌদি গেজেট — পর্যটক ভ্যাট ফেরত স্কিমের সূচনা: ৫০০ রিয়াল, অব্যবহৃত পণ্য, ৯০ দিন",
        url: "https://saudigazette.com.sa/article/653942",
      },
    ],
  },

  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    title: "মক্কা ও মদিনায় বাংলাদেশি ও পাকিস্তানি খাবার (২০২৬): কোথায় খাবেন আর বাজেট কীভাবে সৎভাবে রাখবেন",
    summary:
      "১৯ অক্টোবর ২০২৬ তারিখে এসএফডিএর হালাল বিবৃতি, বালাদির পৌর স্বাস্থ্যসনদ সেবা, বিশ্ব স্বাস্থ্য সংস্থার খাদ্য-নিরাপত্তা নির্দেশনা, আল বাইকের অফিশিয়াল শাখা ও মেনু পেজ, বিনদাউদের স্টোর লোকেটর এবং জুন ২০২৬-এর দ্য ডেইলি স্টার প্রতিবেদনের সঙ্গে যাচাই করা: হালাল জাতীয় নিয়ম, পরিচ্ছন্নতা স্থানীয় প্রশ্ন, মক্কায় দক্ষিণ এশীয় খাবারের নথিভুক্ত রাস্তা হিজরা রোড ও ইব্রাহিম খলিল রোড, আর প্রতি প্লেটের কোনো দাম ছাপা হয়নি কারণ কোনো রেস্টুরেন্ট এমন দাম প্রকাশ করে না যা আবার যাচাই করা যায়।",
    category: "Hajj & Umrah",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "Farhan Momen (Founder & Travel Editor)",
    readTime: "৬ মিনিট পড়া",
    content: `মক্কা ও মদিনায় খাবারের ক্ষেত্রে হালাল প্রশ্নটি সহজ অংশ। কঠিন অংশ হলো এমন রেস্টুরেন্ট খুঁজে পাওয়া যেখানে ভাত, ডাল আর মাছ ঠিক সেইভাবে রান্না হয় যা আপনার মা-বাবা সত্যিই খাবেন; যে দামে বসার আগেই আপনি রাজি হয়েছেন সেখানেই বিল হওয়া; আর দশ দিন ধরে বয়স্ক যাত্রীর পেট ঠিক রাখা। এই গাইড ঠিক এই তিনটি নিয়েই, এবং ইচ্ছাকৃতভাবেই এখানে প্রতি প্লেটের দাম নেই, কোনো রেস্টুরেন্টের নামও নেই: আগের সংস্করণে থাকা সংখ্যাগুলো কোনো খোলা সোর্সের সঙ্গে মিলিয়ে যাচাই করা যায়নি, তাই সেগুলো মুছে দেওয়া হয়েছে — আরও বিশ্বাসযোগ্য শোনায় এমন অনুমান দিয়ে বদলানো হয়নি।

দ্রুত উত্তর — যাচাইয়ের তারিখ ১৯ অক্টোবর ২০২৬: সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষ জানিয়েছে রাজ্যে বিক্রি হওয়া সব খাবার হালাল, আর মদ ও শূকরের মাংস আমদানি নিষিদ্ধ [১][২][৩]। তাই হালাল প্রশ্নটি জাতীয় পর্যায়ে নিষ্পত্তি। তবে পরিচ্ছন্নতা এর দ্বারা নিশ্চিত হয় না: মক্কা ও মদিনায় খাদ্যকর্মীদের পৌর স্বাস্থ্যসনদ থাকে [৪], কিন্তু সনদ একটি ন্যূনতম শর্ত, কোনো পরিদর্শনের ফলাফল নয়। মক্কায় দক্ষিণ এশীয় খাবারের যে রাস্তাগুলো নথিভুক্ত, সেগুলো মিসফালাহ এলাকার হিজরা রোড ও ইব্রাহিম খলিল রোড [৬]; আল বাইকের নিজের শাখা-তালিকা ও ম্যাপ পিনই শাখা বাছাইয়ের নির্ভরযোগ্য উপায় [৭]; আর বিনদাউদ-এর লোকেটরে দুই মসজিদের কাছে সুপারমার্কেট শাখাগুলোর তালিকা আছে [৯]।

১. খাবার হালাল — কিন্তু হালাল মানেই কি নিরাপদ?
হালাল প্রশ্নের উত্তর সৌদি আরবে প্রায় সব জায়গার চেয়ে পরিষ্কার। সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষ প্রকাশ্যে জানিয়েছে রাজ্যে বিক্রি হওয়া সব খাবার হালাল [২], আর রাজ্যে মদ, শূকরের মাংস ও তার পণ্য আমদানি নিষিদ্ধ [৩]। ব্যাংকক বা লন্ডনে যেমন মাংস হালাল কি না জিজ্ঞেস করতে হয়, সৌদি আরবে সেভাবে জিজ্ঞেস করার দরকার নেই।

কিন্তু ওই ঘোষণা মাগরিবের আগে থেকে গরম হালকায় রাখা বিরিয়ানির ট্রের সনদ নয়। পৌর কর্তৃপক্ষ খাদ্য প্রতিষ্ঠানের কর্মীদের জন্য স্বাস্থ্যসনদ দেয়, আর মক্কা ও মদিনা দুটোই এর সঙ্গে থাকা স্বাস্থ্য-শিক্ষা কর্মসূচিতে আছে [৪]। এটি লাইসেন্সিংয়ের ন্যূনতম স্তর — সব সনদ থাকা রেস্টুরেন্টেও রান্না করা খাবার দীর্ঘ সময় বাইরে পড়ে থাকতে পারে।

বাস্তব পরীক্ষা বিশ্ব স্বাস্থ্য সংস্থার পাঁচ নিয়মের মতোই: খাবার পরিচ্ছন্ন রাখা, কাঁচা ও রান্না আলাদা রাখা, ভালোভাবে রান্না, নিরাপদ তাপমাত্রায় রাখা, আর নিরাপদ পানি [৫]। রেস্টুরেন্টে এর অর্থ: অর্ডার দেওয়ার পর যা রান্না হয় সেটাই নিন, আগের ভিড়ের পর থেকে ডিসপ্লেতে পড়ে থাকা পদ এড়িয়ে চলুন, বোতলবন্দি পানি পান করুন; আর ভিড়ের সময় একটা রেস্টুরেন্ট খালি থাকলে ভাবুন কেন খালি।

যাত্রীর যাচাই (foodHalal): হালাল এখানে জাতীয় নিয়ম, তাই সন্দেহ রাখুন পরিচ্ছন্নতায়: টাটকা রান্না, ভরা ঘর, পরিষ্কার পৃষ্ঠতল আর বোতলবন্দি পানি। দেয়ালের সনদ শুরু, উত্তর নয়।

২. মক্কায় বাংলাদেশি ও দক্ষিণ এশীয় রেস্টুরেন্ট কোথায়?
সবচেয়ে ভালো নথিভুক্ত ক্লাস্টার মিসফালাহর দিকে, হিজরা রোড ও ইব্রাহিম খলিল রোড ধরে। জুন ২০২৬-এ দ্য ডেইলি স্টার-এর প্রতিবেদনে বলা হয়েছে, এই দুই রাস্তার রেস্টুরেন্টগুলো বাংলাদেশ, পাকিস্তান ও ভারতের হাজীদের জন্য খাবার ঢেলে সাজিয়েছে; একই দোকান কখনো বাংলায় আবার উর্দুতে সাইনবোর্ড লাগায়, কর্মীরা চাটগাঁইয়া কথা বলেন, আর মেনুতে থাকে বিরিয়ানি, পরোটা, ডাল, দেশি কারি ও দুধ চা [৬]। মা-বাবার চেনা খাবার খুঁজলে ওই এলাকাতেই হাঁটুন — কোনো একটি নাম করা রেস্টুরেন্টে নয়।

কেন্দ্রীয় এলাকার অন্য দিকে আজইয়াদ স্ট্রিট আরেকটি পরিচিত খাবারের রাস্তা, ছোট রেস্টুরেন্ট ও স্ট্রিট ফুডে ভরা। তৃতীয় বিকল্প কেন্দ্রীয় টাওয়ারগুলোর মলের ফুড কোর্ট: শীতাতপ নিয়ন্ত্রিত, পরিবারসহ বসার জায়গা, দাম বেশি, আর খাবার ভরসাযোগ্য হলেও বিশেষ কিছু নয়।

তিন এলাকাতেই রেস্টুরেন্টের নাম ভাড়া ও সিজন অনুযায়ী বদলায়। এজন্যই এই পেজে নামের তালিকা নেই। বদলে ম্যাপ অ্যাপ খুলুন, হোটেলের আশপাশে "Pakistani restaurant" বা "Bangladeshi restaurant" সার্চ করুন, গত এক মাসের ছবি আছে এমন জায়গা দেখুন, আসল পদের কথা বলা সাম্প্রতিক রিভিউ পড়ুন, তারপর যে দোকান ভরা সেখানে হাঁটুন। ২০২৪ সালের ব্লগ থেকে কপি করা নাম আপনার সঙ্গে নেওয়া সবচেয়ে অবিশ্বাস্য ঠিকানা।

যাত্রীর যাচাই (foodMakkah): রাস্তার জোড়াটিকে গন্তব্য ধরুন, রেস্টুরেন্টকে একই দিনের সিদ্ধান্ত। হোটেল থেকে ম্যাপে সার্চ করুন, সাম্প্রতিক ছবি দেখুন, আর চেনা সাইনবোর্ডের খালি দোকানের চেয়ে ভরা ঘরে হাঁটুন।

৩. এক বেলার খাবারে কত খরচ — আর এই পেজে দামের তালিকা কেন নেই?
আল বাইক, অর্থাৎ সবচেয়ে কর্পোরেট বিকল্পটিও নিজের পুরো মেনু অনলাইনে ছাপায়, তবু তাতে দাম লেখে না [৮]। ছোট দেশি রেস্টুরেন্ট তো মেনুই ছাপায় না। তাই কোনো ব্লগে লেখা প্রতি-প্লেটের সংখ্যা হয় একবারের ভিজিটের স্ন্যাপশট, নাহয় বানানো — সিজন, ভাড়া বা হাজীর ভিড় বদলালেই যা ভুল হয়ে যাবে।

তাই আপনার বাজেটের সংখ্যাটি কাউন্টারে আপনি যে দামে রাজি হচ্ছেন সেটাই হতে হবে। বসার আগে তিনটি প্রশ্ন করুন: দামটা প্রতি প্লেটে না প্রতি জনে; এর সঙ্গে কী আসছে — ভাত, রুটি, সালাদ, চা; আর শিশু বা কম খাওয়া বয়স্ক ব্যক্তির জন্য ছোট প্লেট আছে কি না। তারপর একটি প্লেট নিন, আকার দেখুন, দরকার হলে দ্বিতীয়টি নিন। এই এক অভ্যাসই যেকোনো দামের তালিকার চেয়ে বেশি বাঁচায়।

রিয়ালে বিল দিয়ে মাথায় টাকায় ভাঙতে গিয়েই BDT বাজেট এলোমেলো হয়। একবার হিসাবের জন্য ওই দিনের রেট নিন, আর পুরো ট্রিপের যোগফলের জন্য আমাদের DIY বাজেট ক্যালকুলেটর ব্যবহার করুন — প্রতিটি খাবারের সঙ্গে আধা-মনে রাখা রেট গুণবেন না।

যাত্রীর যাচাই (foodPrice): খাবার প্লেটে ওঠার আগেই দাম এবং তাতে কী কী আছে ঠিক করুন। কেউ যদি বলতে না পারে এক প্লেটের দাম কত, বিলটা কীভাবে শেষ হবে তার উত্তর আপনি পেয়ে গেছেন।

৪. আল বাইক: কোন শাখাগুলো তালিকায় আছে, আর লাইনের গুজ উপেক্ষা করবেন কীভাবে
আল বাইক সেই চেইন যেটি বাংলাদেশি পরিবার সাধারণত একবার চেখে দেখতে চায়, আর এটির সঙ্গেই সবচেয়ে আত্মবিশ্বাসী ভুল তথ্য জড়ানো। ব্যবহারযোগ্য একমাত্র তালিকা কোম্পানির নিজের শাখা-পেজ, আর সেখানকার প্রতিটি নাম একটি ম্যাপ পিনে যায় [৭]।

মক্কায় তালিকাভুক্ত শাখার মধ্যে আছে ALBAIK-MAKKAH JABAL OMAR, ALBAIK-CLOCK TOWER MAKKAH, ALBAIK-MAKKAH TOWER, ALBAIK-MAKKAH AZEEZIA, ALBAIK-MAKKAH DIYAFAH ও ALBAIK-MAKKAH JABAL NOOR [৭]। মদিনায় আছে ALBAIK-MADINAH TAIBA, ALBAIK-TAIBA TOWER, ALBAIK-MADINAH CITY, ALBAIK-MADINAH CITY 2 KHALEDIAH ও ALBAIK-MADINA TRAIN STATION [৭]। যে শাখা বাছবেন তার পিন ব্যবহার করুন, হাঁটার দূরত্ব ম্যাপকেই বলতে দিন।

মেনুটি আইটেম ধরে প্রকাশিত — চিকেন মিল, নাগেটস, শ্রিম্প, ফিলেট স্যান্ডউইচ, ফালাফেল, সাইড ও পানীয় — কিন্তু দাম ছাড়া [৮]। আপনি আসলে কত দেবেন তা অ্যাপে বা শাখার বোর্ডে দেখুন। কোম্পানি যা প্রকাশ করে না, আর কোনো সৎ গাইডও যা প্রতিশ্রুতি দিতে পারে না, তা হলো নির্দিষ্ট সময়ে লাইনের দৈর্ঘ্য: এশার পরের ভিড়ের জন্য বলা যেকোনো মিনিট-সংখ্যা সংখ্যার পোশাক পরা অনুমান।

৫. মদিনায় কোথায় খাবেন, আর বসার আগে রেস্টুরেন্ট যাচাই করবেন কীভাবে?
মদিনার কেন্দ্রীয় ব্লকেও একই জাতীয় হালাল নিয়ম, আর নবীজির মসজিদের চারপাশের বাণিজ্যিক মিশ্রণে দক্ষিণ এশীয় রেস্টুরেন্টও আছে — একই ২০২৬ সালের প্রতিবেদন শুধু মক্কা নয়, পবিত্র শহরগুলোর এই ধরনটির কথা বলে [৬]। মক্কার সঙ্গে পার্থক্য হলো, মদিনার কেন্দ্রীয় এলাকা বেশি মল ও হোটেলনির্ভর, আর কম দামের রেস্টুরেন্টগুলো মসজিদ থেকে দূরে রাস্তা ধরে।

যা সত্যিই যাচাই করা যায় তা হলো চেইন ও সুপারমার্কেট। আল বাইক মদিনায় কয়েকটি শাখা তালিকাভুক্ত করে, যার মধ্যে ALBAIK-MADINAH TAIBA, ALBAIK-TAIBA TOWER, ALBAIK-MADINAH CITY ও ALBAIK-MADINAH CITY 2 KHALEDIAH [৭]। বিনদাউদ মদিনার শাখার মধ্যে TAIBA, Al Anwar, Al Hijra, Rotana ও Al Jammat-এর কথা বলে [৯]। এর বাইরে সিদ্ধান্তটা ব্লগ নয়, দরজার যাচাই: দামের বোর্ড আছে এবং তাতে দাম লেখা আছে কি, রান্নাঘর দেখা যায় কি, ঘরটি পরিবারে ভরা কি, আর কর্মীরা "কম মরিচ" বুঝে কি না।

যাত্রীর যাচাই (foodMadinah): পুরোনো লেখায় কোনো গেটের নাম আছে বলে ওই গলিতে হাঁটবেন না। ম্যাপে দুই-তিনটি সম্ভাব্য জায়গা বাছুন, সাম্প্রতিক ছবি দেখুন, তারপর দরজায় যা দেখছেন আর বোর্ডে যা লেখা তা দিয়েই সিদ্ধান্ত নিন।

৬. দশ দিনে বয়স্ক মা-বাবা বা ছোট সন্তানকে কী খাওয়াবেন?
যারা সমস্যায় পড়েন তারা সাধারণত খাবার না পাওয়া মানুষ নন। সমস্যা হয় তাদের, যারা সিদ্ধান্ত নেওয়ার ঝামেলা এড়াতে সপ্তাহজুড়ে দিনে দুইবার রেস্টুরেন্টের কারি খেয়েছেন। তিনটি অভ্যাস পার্থক্য গড়ে, আর এর একটিও চিকিৎসা-পরামর্শ নয়।

প্রথমত, দিনটিকে এক বেলা রান্না আর দুই বেলা সহজ খাবারের চারপাশে সাজান: ঘরে সুপারমার্কেটের রুটি, লাবান, কলা, খেজুর ও চা, তারপর এক বেলা গরম ভাত, ডাল আর সেদ্ধ বা হালকা রান্না সবজি। দ্বিতীয়ত, রেস্টুরেন্টকে বলুন হালকা রাখতে — "কম মরিচ, কম তেল" দক্ষিণ এশীয় রেস্টুরেন্টে বোঝা যায়, আর প্লেইন ডাল-ভাত সাধারণত মেনুর সবচেয়ে নিরাপদ পদ। তৃতীয়ত, পানি বোতলবন্দি রাখুন আর গতি ধীর রাখুন: পানিশূন্য ও ক্লান্ত বাবা-মা কোনো খাবারই উপভোগ করবেন না।

যদি আপনার মা-বাবার নির্ধারিত রোগ থাকে এবং চিকিৎসক খাদ্যবিষয়ক নির্দেশ দিয়ে থাকেন, সেই নির্দেশই প্রযোজ্য — এই পেজ নয়। ওষুধ ও প্রেসক্রিপশন সঙ্গে রাখুন, আর মক্কায় নতুন ডায়েট পরীক্ষা করবেন না।

যাত্রীর যাচাই (foodElderly): এক বেলা গরম খাবার, দুই বেলা সহজ খাবার, কম মরিচ ও তেল, বোতলবন্দি পানি, আর দরজা থেকে দূরে নিচতলার টেবিল। চিকিৎসার সিদ্ধান্ত আপনার চিকিৎসকেরই।

৭. নিজে খাবার কিনে রান্না না করেও দৈনিক বাজেট কীভাবে সৎ রাখবেন?
নিজে খাবার কিনে রাখাই অনিশ্চিত খাবারের বিলকে পরিকল্পনায় বদলায়। বিনদাউদ নিজেদের "Pilgrim's Brand" বলে এবং ২৬টি লোকেশন তালিকাভুক্ত করে; দুই মসজিদের দুই দিকেই তাদের শাখা আছে, যার মধ্যে মক্কায় Abraj Al Bait ও Jabal Omar, মদিনায় Taiba ও Al Anwar [৯][১০]। সেখান থেকে নাশতা ও স্ন্যাকস কিনুন: লাবান, রুটি, কলা, খেজুর, ওটস, মধু, বোতলবন্দি পানি।

তারপর সেই কাজটি করুন যা প্রায় কেউ করেন না: প্রথম দুই দিনের খরচ লিখে রাখুন, যোগ করুন, ভাগ করুন। ওই সংখ্যাটিই — কোনো লেখার সংখ্যা নয় — আপনার দৈনিক খাবারের বাজেট, আর ট্রিপের বেশিরভাগ বাকি থাকতেই আপনি তা ঠিক করতে পারবেন। রসিদ রাখুন; একই ঝুড়িতে কোন দোকান সস্তা তাও এতে বোঝা যায়।

বাবা-মা আর হাঁটতে না পারলে খাবার ডেলিভারি অ্যাপ কাজে লাগে, তবে আপনার হোটেলের ঠিকানায় সেবা আছে কি না তার ওপর নির্ভর করে। অ্যাপে আপনার ভবন দেখালে তবেই অর্ডার করুন, আর ড্রাইভারের সঙ্গে প্রবেশপথে দেখা করুন। আর দেশে ফেরার জন্য খেজুর বা খাবার নেওয়ার পরিকল্পনা থাকলে কেনার আগেই কাস্টমসের নিয়ম পড়ুন — সেখানে সীমা ওজনের নয়, ব্যক্তিগত ব্যবহারের পরীক্ষা।

যাত্রীর যাচাই (foodGrocery): লোকেটরে যে শাখা আছে সেখানেই কিনুন, দুই দিনের খরচ লিখে রাখুন, আর দৈনিক সংখ্যাটি নিজের রসিদ থেকে ঠিক করুন — কোনো ব্লগ থেকে নয়। দেশে নেওয়ার উপহার কেনার আগে কাস্টমস পেজ দেখুন।

৮. সচরাচর জিজ্ঞাসা
মক্কা ও মদিনার সব খাবার কি হালাল?
জাতীয় পর্যায়ে হ্যাঁ: সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষ জানিয়েছে রাজ্যে বিক্রি হওয়া সব খাবার হালাল, আর মদ ও শূকরের মাংস আমদানি নিষিদ্ধ। এটি খাদ্য সরবরাহের ঘোষণা, কোনো একটি রেস্টুরেন্টের পরিচ্ছন্নতার নয় — ঘর ও টাটকা ভাব নিজে দেখুন। [১][২][৩]
মক্কায় বাংলাদেশি রেস্টুরেন্ট কোথায়?
নথিভুক্ত ক্লাস্টার মিসফালাহ এলাকার হিজরা রোড ও ইব্রাহিম খলিল রোড ধরে, যেখানে ২০২৬ সালের প্রতিবেদনে বাংলা-উর্দু সাইনবোর্ড ও চাটগাঁইয়া ভাষী কর্মী পাওয়া গেছে। নাম বদলায়, তাই ম্যাপ ও দরজা দেখে বাছুন। [৬]
মক্কা বা মদিনায় এক বেলার খাবারে কত খরচ?
দেশি রেস্টুরেন্টের নির্ভরযোগ্য প্রকাশিত দাম নেই, আর আল বাইক দাম ছাড়া মেনু প্রকাশ করে। জিজ্ঞেস করুন দাম প্রতি প্লেটে না প্রতি জনে, সঙ্গে কী আসছে তা নিশ্চিত করুন, আর আগে এক প্লেট নিন। [৮]
হারামের সবচেয়ে কাছের আল বাইক শাখা কোনটি?
কোম্পানি প্রতিটি শহরে কয়েকটি শাখা তালিকাভুক্ত করে, প্রতিটির ম্যাপ পিনসহ: মক্কায় Jabal Omar, Clock Tower, Makkah Tower, Azeezia, Diyafah ও Jabal Noor; মদিনায় Madinah Taiba, Taiba Tower, Madinah City প্রভৃতি। ব্লগের হাঁটার সময় নয়, পিন অনুসরণ করুন। [৭]
মসজিদের কাছে মুদি কেনাকাটা কোথায়?
বিনদাউদ মক্কায় Abraj Al Bait ও Jabal Omar এবং মদিনায় Taiba, Al Anwar, Al Hijra, Rotana ও Al Jammat শাখার কথা বলে। হাঁটার আগে লোকেটরে আপনার হোটেলের নিকটতম শাখা দেখুন। [৯][১০]
বাড়িতে খেজুর বা খাবার নিয়ে যাওয়া যাবে?
ঢাকা বিমানবন্দরে খেজুর ও খাবারের ক্ষেত্রে বাংলাদেশের ব্যক্তিগত ব্যবহারের পরীক্ষা প্রযোজ্য, প্রকাশিত কেজি-ছাড় নয়। স্যুটকেস ভরার আগে কাস্টমস গাইড পড়ুন।`,
    internalLinks: [
      { text: "বয়স্ক মা-বাবাকে নিয়ে ওমরাহ: হুইলচেয়ার ও মেডিকেল গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "মক্কা ও মদিনার হোটেল জোন এবং হারামাইন ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "সম্পূর্ণ DIY Umrah ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "জমজম, খেজুর ও স্বর্ণ: বাংলাদেশের কাস্টমস নিয়ম", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "রমজানের সাহরি, ইফতার ও তারাবীহের ভিড় পরিচালনা", path: "/blog/ramadan-umrah-itikaf-guide-bangladesh-booking-budget" },
      { text: "DIY Umrah ইন্টেলিজেন্স পোর্টাল ও BDT ক্যালকুলেটর", path: "/umrah" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "হারামের আশপাশে ম্যাপ ও ডেলিভারি অ্যাপ ব্যবহার করবেন?",
      body: "ঐচ্ছিক সৌদি আরব eSIM নিলে হোটেলের ওয়াই-ফাই খোঁজার বদলে শাখার ম্যাপ পিন বা ডেলিভারি অ্যাপ খোলা সহজ হয়। কাভারেজ ও গতি ওই দিনের নেটওয়ার্কের ওপর নির্ভর করে, আর অ্যাপ তখনই কাজে লাগে যখন আপনার হোটেলের ঠিকানা দেখায় — এটি কোনো রেস্টুরেন্টের দাম বা দেশে খাবার নেওয়ার কাস্টমস নিয়ম বদলায় না।",
    },
    references: [
      {
        name: "Saudi Food and Drug Authority — Halal Center",
        nameBn: "সৌদি খাদ্য ও ওষুধ কর্তৃপক্ষ — হালাল সেন্টার: সনদ, অডিট ও প্রযোজ্য হালাল মান",
        url: "https://www.sfda.gov.sa/en/halal",
      },
      {
        name: "Saudi Gazette — SFDA: all food in the Kingdom is halal (5 January 2023)",
        nameBn: "সৌদি গেজেট — এসএফডিএ: রাজ্যে বিক্রি হওয়া সব খাবার হালাল (৫ জানুয়ারি ২০২৩)",
        url: "https://saudigazette.com.sa/article/628636",
      },
      {
        name: "U.S. International Trade Administration — prohibited and restricted imports (alcohol, pork)",
        nameBn: "মার্কিন আন্তর্জাতিক বাণিজ্য প্রশাসন — নিষিদ্ধ আমদানি (মদ, শূকরের মাংস)",
        url: "https://www.trade.gov/country-commercial-guides/saudi-arabia-prohibited-and-restricted-imports",
      },
      {
        name: "Balady — health certificates for food workers",
        nameBn: "বালাদি — খাদ্যকর্মীদের স্বাস্থ্যসনদ; মক্কা ও মদিনা স্বাস্থ্য-শিক্ষা কর্মসূচিতে",
        url: "https://balady.gov.sa/en/services/issuance-health-certificate",
      },
      {
        name: "World Health Organization — Five Keys to Safer Food",
        nameBn: "বিশ্ব স্বাস্থ্য সংস্থা — নিরাপদ খাবারের পাঁচ নিয়ম",
        url: "https://www.who.int/activities/promoting-safe-food-handling",
      },
      {
        name: "The Daily Star — 'Where Chittagong meets Makkah' (3 June 2026)",
        nameBn: "দ্য ডেইলি স্টার — 'হোয়ার চিটাগং মিটস মক্কা' (৩ জুন ২০২৬): হিজরা রোড ও ইব্রাহিম খলিল রোডের বাংলাদেশি রেস্তোরাঁ",
        url: "https://www.thedailystar.net/slow-reads/big-picture/news/where-chittagong-meets-makkah-4189471",
      },
      {
        name: "ALBAIK — official branches (Makkah and Madinah, with map pins)",
        nameBn: "আল বাইক — অফিশিয়াল শাখা-তালিকা (মক্কা ও মদিনা, ম্যাপ পিনসহ)",
        url: "https://www.albaik.com/branches",
      },
      {
        name: "ALBAIK — official menu (no prices published)",
        nameBn: "আল বাইক — অফিশিয়াল মেনু (দাম প্রকাশিত নয়)",
        url: "https://www.albaik.com/menu",
      },
      {
        name: "BinDawood — store locator",
        nameBn: "বিনদাউদ — স্টোর লোকেটর: মক্কা (আবরাজ আল বাইত, জাবাল ওমর) ও মদিনা (তাইবা, আল আনোয়ার, আল হিজরা)",
        url: "https://bindawood.sa/en/store_locations/",
      },
      {
        name: "BinDawood Holding — 26 locations, 'Pilgrim's Brand'",
        nameBn: "বিনদাউদ হোল্ডিং — ২৬টি লোকেশন, 'পিলগ্রিমস ব্র্যান্ড'",
        url: "https://www.bindawoodholding.com/bindawood-supermarkets/",
      },
    ],
  },

    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    title: "মক্কা, মদিনা, বদর ও তায়েফ জিয়ারত গাইড (২০২৬): যাচাই করা স্থান, খোলার সময় ও সৎভাবে গাড়ি ভাড়া করার নিয়ম",
    summary:
      "১৯ অক্টোবর ২০২৬-এ হেরা কালচারাল ডিস্ট্রিক্টের নিজস্ব সাইট, ১৮ ও ৩১ জুলাই ২০২৬-এর সৌদি প্রেস এজেন্সির প্রতিবেদন, Visit Saudi-র মক্কা ও মদিনার আকর্ষণ পাতা, সৌদিপিডিয়া, মদিনার সিটিসিইং বাসের অপারেটর এবং ট্যুরিজম মন্ত্রণালয়ের পর্যটক-অধিকার পাতা দেখে যাচাই করা। টিকিটযুক্ত হেরার মিউজিয়ামের সময় নিয়ে তিনটি সরকারি পাতা তিন রকম বলে — তিনটিই এখানে আছে; কুবার হাদিস সুনান ইবনে মাজাহ ১৪১২ (হাসান); মদিনার বাস ২৪ ঘণ্টায় ৯০ রিয়াল; বদর মদিনার প্রায় ১৫০ কিমি পশ্চিমে। জিয়ারতের কোনো প্রকাশিত গাড়ি-ভাড়ার তালিকা নেই, তাই কোনো সংখ্যা ছাপা হয়নি; বদলে গাড়ি ছোড়ার আগে মোট দাম, ঘণ্টা ও স্টপ লিখে নেওয়ার নিয়ম শেখানো হয়েছে।",
    category: "Ziyarah & Stopovers",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "১০ মিনিট পড়া",
    content: `জিয়ারত — মক্কা, মদিনা, তায়েফ ও বদরের ঐতিহাসিক স্থানগুলো দেখা — বাংলাদেশের পরিবারগুলোর ওমরাহ সফরের সবচেয়ে দীর্ঘদিন মনে থাকা অংশ, অথচ আগে থেকে যার পরিকল্পনা সবচেয়ে কম হয়। এই পাতার সবচেয়ে দুর্বল অংশও এটিই ছিল: আগের সংস্করণে গাড়ির ভাড়া, "সেরা সময়", কবরস্থানের দূরত্ব আর ড্রাইভের সময় লেখা ছিল, যার কোনোটিরই পক্ষে কোনো খোলা সূত্র নেই। ওই সংখ্যাগুলো মুছে ফেলা হয়েছে — আরও বিশ্বাসযোগ্য শোনায় এমন নতুন অনুমান বসানো হয়নি। যা রেখে দেওয়া হয়েছে তা হলো স্থানগুলোর নিজস্ব প্রকাশনা, সৌদি প্রেস এজেন্সি, Visit Saudi, সৌদিপিডিয়া, মদিনার সিটিসিইং বাসের অপারেটর এবং সৌদি ট্যুরিজম মন্ত্রণালয় যা প্রকাশ করেছে — যাচাইয়ের তারিখসহ।

এই গাইড তিনটি কাজ করে। কোন স্থান কী এবং কী নয়, সেটি বলে। টিকিট লাগা স্থানগুলো কখন খোলা থাকে তা বলে — যে এক জায়গায় দুটি সরকারি পাতা একমত নয়, সেটিসহ। আর শেখায়, গাড়ি ছোড়ার আগে ভাড়া লিখিতভাবে ঠিক করে নিতে, কারণ জিয়ারতের কোনো প্রকাশিত ভাড়ার তালিকা নেই, আর ব্লগে বানানো একটি সংখ্যা সংখ্যা না থাকার চেয়েও ক্ষতিকর।

১. জিয়ারত কী, আর কী নয়?

এখানে জিয়ারত মানে উদ্দেশ্যপূর্ণ ভ্রমণ: সীরাতের ঘটনাগুলো যেখানে ঘটেছে সেখানে দাঁড়ানো, সন্তানরা শুধু পড়ার বদলে ভূগোলটাও চোখে দেখা। এটি নির্দিষ্ট রুট, নির্দিষ্ট ক্রম বা প্রতিটি স্থানে নির্দিষ্ট সওয়াবযুক্ত কোনো আনুষ্ঠানিকতা নয় — এই পাতা এমন কিছু বানিয়ে বলে না।

এখান থেকে দুটি বিষয় আসে, দুটোই স্থানে গিয়ে গুরুত্বপূর্ণ। প্রথমত, আপনি যে কবরগুলো দেখতে যাচ্ছেন সেগুলো চিহ্নহীন। মক্কার জান্নাতুল মুআল্লা এবং মদিনার জান্নাতুল বাকিতে গম্বুজ ও কবরের পাথর ১৯২০-এর দশকে সরিয়ে ফেলা হয়, তাই হযরত খাদিজা (রা.)-এর কোনো কবর খুঁজে পেয়ে হাত বোলানোর মতো কিছু নেই [১৪]। আপনি একটি কবরস্থানে যাচ্ছেন, মাযার দেখতে নয়। দ্বিতীয়ত, ভ্রমণটি শান্ত রাখুন: উঁচু স্বর নয়, মুসল্লিদের ছবি নয়, নিজের আলেম যেটি শেখাননি এমন কোনো রীতি কবরে নয়। মূল্যবোধটা হলো সেখানে উপস্থিত থাকা, আর ফেরার পথে সন্তানদের যা বলবেন তা।

২. হেরা কালচারাল ডিস্ট্রিক্ট: কী খোলা, কখন, আর চড়াইটা আসলে কেমন

ডিস্ট্রিক্টটি জাবালে নূরের পাদদেশে, যে পথটি হেরা গুহার দিকে উঠে গেছে তার মুখে — যেখানে সূরা আলাকের প্রথম আয়াত নাযিল হয়েছিল। এটি ব্যবস্থাপিত একটি স্থান, দুটি টিকিটযুক্ত অভিজ্ঞতা রয়েছে — Revelation Exhibition ও কুরআন মিউজিয়াম — সঙ্গে দোকান, ক্যাফে এবং ওঠার পথে একটি ভিজিটর সেন্টার [১]।

খোলার সময় নিয়ে সরকারি পাতা দুটো সত্যিই দ্বিমত পোষণ করে, তাই তিনটিই তারিখসহ দেওয়া হলো। ডিস্ট্রিক্টের নিজস্ব সাইটে ডিস্ট্রিক্ট ও গুহার পথ ২৪ ঘণ্টা, আর মিউজিয়াম শনি–বুধ ০৭:৩০–২৩:৩০, বৃহস্পতি ০৭:৩০–০১:০০, শুক্র ১৫:৩০–০১:০০ [১]। Visit Saudi-তে Revelation Exhibition প্রতিদিন ০৭:৩০–২৩:৩০ [৩]। ৩১ জুলাই ২০২৬-এর সৌদি প্রেস এজেন্সির প্রতিবেদনে বলা হয়েছে দুটি মিউজিয়ামই শুক্রবার ০৭:০০–১৫:৩০ বাদে সারাক্ষণ খোলা [২]। সকালটা যদি মিউজিয়ামকে কেন্দ্র করে সাজান, তবে দিনেই ডিস্ট্রিক্টের নিজের পাতা দেখে নিন — এই পাতাটি সহ তিনটির কোনোটিকেই চূড়ান্ত ধরে নয়।

টিকিট অনলাইনে বিক্রি হয়, ডিস্ট্রিক্ট ও Visit Saudi দুটোই যে অপারেটরের লিংকে পাঠায় সেখান দিয়ে [১][৩]। Visit Saudi দাম বলেছে "প্রতি জনপ্রতি ২৫ রিয়াল থেকে" [৩]; ডিস্ট্রিক্টের পাতায় কোনো দামই ছাপা নেই। তাই ২৫ রিয়ালকে ন্যূনতম ধরুন, মোট নয়, আর টিকিটের ধরন জেনে নিন টাকা দেওয়ার আগে।

যা সাইটে প্রকাশিত নেই: কোনো শাটল, পথের মাটি কেমন, বা নিরাপত্তার নিশ্চয়তা। পথটি পাহাড়ি, বছরের বড় অংশে গরম, আর ডিস্ট্রিক্টের নিজের বর্ণনায় এটিকে শুধু একটি চড়াই বলা হয়েছে যার পথে ভিজিটর সেন্টার আছে [১]। আগেই ঠিক করুন: সুস্থ বড়রা হাঁটতে পারেন, বয়স্ক বাবা-মা ও ছোট সন্তানরা নিচে প্রদর্শনী ও ক্যাফেতে থাকতে পারেন — কারও জন্যই চড়াইটা জরুরি নয়।

যাত্রীর যাচাই (ziyarahHira): দিনের গরমের সময়ে প্রদর্শনীর টিকিট নিন, আর পথটি রাখুন দিনের শুরুতে বা শেষে। পানি সঙ্গে রাখুন; ছায়া বা লিফটের কোনো প্রকাশিত প্রতিশ্রুতি নেই।

৩. মক্কার অন্য স্টপগুলো: কবরস্থান, গারে সাওর আর হজের ময়দান

জান্নাতুল মুআল্লা মসজিদুল হারামের উত্তরে অবস্থিত ঐতিহাসিক কবরস্থান, মসজিদে জিনের কাছেই; হযরত খাদিজা (রা.), রাসূলুল্লাহ (সা.)-এর দাদা আবদুল মুত্তালিব এবং চাচা আবু তালিব এখানেই সমাহিত বলে উল্লেখ আছে [১৪]। ১৯২৫–২৬ সালের ভাঙনের পর কবরগুলো শুধু ছোট পাথরে চিহ্নিত, জমি অনাবৃত [১৪]। সেখানে যান হেঁটে যেতে আর সন্তানদের বলতে কে কোথায় আছেন; ছবি তোলার কিছু পাবেন — এই আশা নিয়ে যাবেন না।

গারে সাওর (জাবালে সাওর) মক্কার দক্ষিণে, হিজরতের গুহা: যেখানে রাসূলুল্লাহ (সা.) ও হযরত আবু বকর (রা.) মদিনার পথে রওনা হওয়ার আগে আশ্রয় নিয়েছিলেন। এটি দূর থেকে দেখার স্টপ, গরমে পরিবারসহ ওঠার জায়গা নয়, আর প্রকাশিত উপকরণে নিরাপদ রুট বা সময় দেওয়া নেই।

মিনা, মুজদালিফা ও আরাফাতের ময়দান হজের স্থান। হজের দিনগুলো ছাড়া গাড়িতে করে তাঁবুর শহর, জামারাত সেতু, মসজিদে নামিরাহ ও জাবালে রহমত দেখা যায়; হজের দিনগুলোতে ওই রাস্তাগুলো হজ ব্যবস্থাপনার অধীনে থাকে, তাই ধরে নেবেন না যে যেকোনো তারিখে একই রুট কাজ করবে — চালককে জিজ্ঞেস করুন।

যাত্রীর যাচাই (ziyarahCemetery): যে কোনো নির্দিষ্ট কবর খুঁজতে সময় নষ্ট করবেন না। জায়গাটা বুঝুন, ইতিহাসটা বলুন, আর বেরিয়ে পড়ুন।

৪. গাড়ি: প্রকাশিত ভাড়া না থাকলে দাম ঠিক করবেন কীভাবে

মক্কা, মদিনা, তায়েফ বা বদরে জিয়ারতের কোনো প্রকাশিত ভাড়ার তালিকা নেই — ট্যুরিজম মন্ত্রণালয়ের কাছেও নেই, Visit Saudi-তেও নেই, এমন কোনো অপারেটরের কাছেও নেই যার রেট আবার যাচাই করা যায়। এজন্যই এই পাতায় কোনো সংখ্যা নেই, আর আগে এখানে যে গাড়িপ্রতি ব্যান্ডগুলো ছিল — মক্কার সেডানের একটি, মদিনার একটি, তায়েফ ডে-ট্রিপের একটি — সেগুলো সরানো হয়েছে: কোনোটিরই পক্ষে এমন কোনো সূত্র পাওয়া যায়নি যা আজও তাই বলে।

বদলে যা করতে পারেন, এই ক্রমে। পুরো গাড়ি ও ঠিক করা ঘণ্টার জন্য মোট দাম ঠিক করুন — জনপ্রতি নয় — এবং লিখে রাখুন বা স্ক্রিনশট নিন। শুরুর আগে স্টপগুলোর নাম বলুন, আর ঠিক করুন কোনো স্টপ বন্ধ থাকলে বা জ্যামে সময় দ্বিগুণ হলে কী হবে। গেটে এসে যে চালক ডাকবে তার বদলে হোটেলের ডেস্ক বা লাইসেন্সধারী অপারেটরের সঙ্গে কথা বলুন। আর মন্ত্রণালয়ের নিজের অধিকার-পাতাটিকে মানদণ্ড ধরুন: ট্যুর গাইডকে মন্ত্রণালয়ের লাইসেন্স থাকতে হবে এবং লাইসেন্সধারী প্রতিষ্ঠানের সঙ্গে যুক্ত থাকতে হবে; অভিযোগের চ্যানেলও মন্ত্রণালয় প্রকাশ করে [১৫]।

দাম নিয়ে সবচেয়ে সৎ বাক্যটি হলো যেটি আপনি ও চালক দুজনেই মেনে নিয়েছেন। দুটি কোটেশনে এক-তৃতীয়াংশ পার্থক্য থাকলে জিজ্ঞেস করুন দ্বিতীয়টিতে কী কী আছে — অপেক্ষার সময়, তায়েফ রোডের টোল, বদরে একটি স্টপ — কারণ পার্থক্যটা সাধারণত রুটের, রেটের নয়।

যাত্রীর যাচাই (ziyarahCar): জনপ্রতি নয়, গাড়িপ্রতি। মুখে নয়, লেখায়। আর ফেরার লেগের জন্য চালকের নম্বর রেখে দিন।

৫. মদিনা: কুবা, কিবলাতাইন ও উহুদ — যে তিনটি যাচাই করা গেছে

মসজিদে কুবা মদিনায় নির্মিত প্রথম মসজিদ, আর এই পাতায় যে হাদিসটি উদ্ধৃত হয়েছে সেটি সুনান ইবনে মাজাহ ১৪১২, দারুসসালামের মূল্যায়নে হাসান: যে ব্যক্তি ঘরে পবিত্রতা অর্জন করে কুবা মসজিদে এসে নামাজ পড়ে, তার জন্য একটি ওমরাহর সমান সওয়াব [৪]। এই পাতার আগের সংস্করণে একই বাক্যের জন্য সহিহ মুসলিম উদ্ধৃত ছিল; সেই তথ্যসূত্র ভুল ছিল এবং তা সংশোধন করা হয়েছে। হোটেলে অজু করে নিন, দুই রাকাত পড়ুন, আর ভ্রমণটাকে প্রতিযোগিতা বানাবেন না। কুবা নবী মসজিদ থেকে প্রায় ৩ কিমি দূরে একটি চিহ্নিত পথ ধরে, আর Visit Saudi বলেছে আগাম বুকিং লাগে না [৫]।

মসজিদে কিবলাতাইন দুই কিবলার মসজিদ, নবী মসজিদের উত্তর-পশ্চিমে ৩.৮ কিমি [৬], যেখানে কিবলা কাবার দিকে পরিবর্তিত হয়। আগের লেখায় খন্দকের পাশে ছোট মসজিদগুলো গুনে যা বলা হয়েছিল তা কোনো খোলা সূত্রে যাচাই হয়নি, তাই এখন খন্দকের এলাকার নাম থাকছে, সংখ্যা নেই।

উহুদ নবী মসজিদ থেকে প্রায় ৭ কিমি দূরের পাহাড়ি সারি, উচ্চতা ১,০৭৭ মিটার, শহরের প্রায় ৪ কিমি উত্তরে; এর পাশে তীরন্দাজদের অবস্থান এবং পাদদেশে শহীদদের সীমানা — প্রায় ৭০ জন, যাঁদের মধ্যে হযরত হামজা (রা.)-ও আছেন [৭]। আগের লেখায় থাকা মসজিদের নাম যাচাই হয়নি, তাই আর নেই; চালককে শহীদদের সীমানার কথা বলুন।

যাত্রীর যাচাই (ziyarahMadinah): কুবা, কিবলাতাইন ও উহুদে পার্কিংই দরজা নয়। কোন গেট বা কোন দিক দরকার তা চালককে বলুন, আর নামার আগেই ঠিক করুন তিনি কোথায় অপেক্ষা করবেন।

৬. গাড়ি ছাড়া মদিনা: হপ-অন হপ-অফ বাস

সিটিসিইং আল-মদিনা দুই রুটে ১৫টি স্টপ চালায়, শুরু ও শেষ নবী মসজিদের পাশে কিং ফাহদ গেট (গেট ৩৩৪)-এ, ১৬ ভাষায় অডিও এবং প্রকাশিত ফোন নম্বর ৯২০০১৪০৪৪ [৯]। প্রকাশিত ভাড়া: ২৪ ঘণ্টা ৯০ রিয়াল, ৪৮ ঘণ্টা ১২৫ রিয়াল, ৭২ ঘণ্টা ১৫০ রিয়াল, একক রাইড ১৫ রিয়াল, এক রুটে চার ঘণ্টার টিকিট ৪০ রিয়াল [৯]। অপারেটর ৪৫ মিনিট অন্তর বাস এবং পূর্ণ লুপ ১২৫ মিনিট বলেছে [৯]।

রুটগুলো প্রথমবার আসা পরিবারের আসল চাহিদার জায়গাগুলো ঢাকে: কুবা ও কুবার পথ, কিবলাতাইন, উহুদের ময়দান, জান্নাতুল বাকি ও জাদুঘর এলাকা, হেজাজ রেলওয়ে মিউজিয়াম এবং কেন্দ্রীয় বাজার [৯]। বাসটি যা করতে পারে না তা হলো দরজা থেকে দরজা: সে রুটের স্টপে থামে, আর বয়স্ক বাবা-মাকে স্টপ থেকে স্থান পর্যন্ত হাঁটতেই হবে।

অপারেটরের নিজের পাতায় এই যাচাইয়ের দিনে একটি সতর্কতা ছিল: কয়েকটি স্টপ কার্ডে "temporarily closed" লেখা ছিল [৯]। কারণ প্রকাশিত নয়। টাকা দেওয়ার আগে নিশ্চিত করুন বাস চলছে কি না, কোন স্টপ খোলা, আর বোর্ডিং আসলে কোথায় — উপরের ফোন নম্বরটাই একমাত্র যাচাই যা উত্তর দেবে।

যাত্রীর যাচাই (ziyarahBus): রুট ও বন্ধ স্টপ বিনা নোটিশে বদলায়। একটি ফোন বা সকালে অপারেটরের পাতা দেখা একটি নষ্ট টিকিট বাঁচায়।

৭. তায়েফ ডে-ট্রিপ, আর ফেরার পথে মিকাত

তায়েফ মক্কার পূর্বে পাহাড়ি শহর, পাহাড়ি রাস্তা দিয়ে পৌঁছাতে হয়, আর বাংলাদেশি পরিবারগুলো এখানে দুটি স্থান নাম ধরে চায়। মসজিদে আবদুল্লাহ ইবনে আব্বাস মাউন্ট আল-মাদহুনের পাদদেশে, রাসূলুল্লাহ (সা.)-এর চাচাতো ভাইয়ের সঙ্গে সম্পর্কিত; আর মসজিদে আদাস ওয়াদি ওয়াজের আল-মাসনাহ রোডে, আবু আল-আখাইলার পাদদেশে — যে স্থানটি আদাস নামের সেই দাসের সঙ্গে যুক্ত, যিনি তায়েফবাসীর প্রত্যাখ্যানের পর আঙুর নিয়ে এসেছিলেন [১৩]। আগের লেখার ড্রাইভের সময়, উচ্চতা ও তাপমাত্রা সরানো হয়েছে; গরম, জ্যাম ও ঋতু তিনটিই বদলে দেয়।

আল-হাদা কেবল কার অনেক পরিবারের যাওয়ার কারণ। সৌদি প্রেস এজেন্সির তথ্য: প্রতিটি দিকে ৪,২০০ মিটার, যাত্রা ১৭ মিনিট, ৫২টি কেবিন, প্রতিটিতে ৮ জন, ঘণ্টায় প্রায় ১,০০০ যাত্রী; এটি আল-কার ট্যুরিস্ট ভিলেজ থেকে চলে [১০][১১]। ভাড়া ও সোমবার বন্ধের কথা অপারেটরের বদলে দ্বিতীয় পক্ষের তালিকা থেকে আসে, তাই "রাউন্ড ট্রিপ প্রায় ১০০ রিয়াল" কে ইঙ্গিত ধরে নিন আর ওঠার আগে নিশ্চিত করুন।

মিকাতের বিষয়টি ঠিকভাবে বুঝতে হবে। কারন আল-মানাজিল, যাকে আস-সাইল আল-কাবিরও বলা হয়, নজদ ও তায়েফের দিক থেকে আসা হাজিদের সীমা; এটি তায়েফ–মক্কা রাস্তায়, মক্কার প্রায় ৮০ কিমি উত্তর-পূর্বে ও তায়েফের ৩৫ কিমি উত্তরে [১২]। ফেরার পথে আরেকটি ওমরাহ করার ইচ্ছা থাকলে সীমা পার হওয়ার আগেই সেখানেই ইহরাম বাঁধবেন, মক্কায় নয়। শুধু ঘুরতে গেলে চালককে ইচ্ছাটি স্পষ্ট বলুন, আর আপনার ক্ষেত্রে যে নিয়ম প্রযোজ্য সেখানে থামতে বলুন — আপনার ইবাদতের সিদ্ধান্ত এই পাতার নয়।

যাত্রীর যাচাই (ziyarahTaif): এই একটি বাক্যই ঠিক করে দেয় গাড়ি কারন আল-মানাজিলে থামবে কি না, আর ইহরাম লাগেজে থাকবে কি না।

৮. বদর: সবচেয়ে দীর্ঘ ড্রাইভ, আর সেখানে আসলে কী আছে

বদর ইসলামের প্রথম বড় যুদ্ধের ময়দান, হিজরতের দ্বিতীয় বছরে সংঘটিত। Visit Saudi স্থানটিকে মদিনার প্রায় ১৫০ কিমি পশ্চিমে বলে; অন্য সূত্রে ১৩০ কিমি — পার্থক্যটা রাস্তার, গল্পের নয় [৮]। মদিনা থেকে এটি অর্ধদিন বা পুরো দিনের পরিকল্পনা, আর আগের সংস্করণের রাউন্ড ট্রিপের সময়, স্টপের দৈর্ঘ্য ও গাড়িপ্রতি ভাড়া কোথাও মেলেনি, তাই সরানো হয়েছে।

সেখানে যা আছে তা সংযত, আর সঠিক পরিবারের জন্য ড্রাইভটার মূল্য আছে: আল-আরিশ মসজিদ, যুদ্ধের ময়দান, শহীদদের কবরস্থান এবং আল-আরিশ থেকে প্রায় ৪ কিমি দূরে জাবাল আল-মালাইক [৮]। কবরস্থানের সীমানায় ১৩টি নাম লেখা — মুহাজিরদের পাঁচ, আনসারদের আট — অন্য বর্ণনায় ১৪; পার্থক্যটি পুরোনো, এই পাতা তা মীমাংসা করে না [৮]।

মদিনা থেকে মক্কায় বিমানে না গিয়ে প্রাইভেট গাড়িতে গেলে বদর স্বাভাবিক স্টপ, কারণ রাস্তা পশ্চিমে যায়। চালক বদরে অপেক্ষা করবেন কি না এবং কতক্ষণ, তা জেনে নিন, আর পুরো মদিনা–মক্কা লেগ একটি চুক্তি হিসেবে দাম ঠিক করুন — "স্টপওভার" বলে এমন কিছু নয় যার সংজ্ঞা কেউ দেয়নি।

যাত্রীর যাচাই (ziyarahBadr): স্টপের দাম ঠিক করা সহজ; অপেক্ষার সময় আর রুট অস্পষ্ট রাখাই ব্যয়বহুল।

৯. সচরাচর জিজ্ঞাসা
ওমরাহর সময় জিয়ারত কি আবশ্যক?
না। জিয়ারত ঐতিহাসিক স্থান দেখা। ওমরাহর নিজস্ব বিধান আছে, আর এই পাতা তাতে কোনো বিধান যোগ করে না।
মক্কা বা মদিনায় প্রাইভেট জিয়ারত গাড়ির ভাড়া কত?
প্রকাশিত কোনো তালিকা নেই, তাই এই পাতায় কোনো সংখ্যা নেই। শুরুর আগে গাড়ি ও ঘণ্টার মোট দাম ঠিক করুন এবং লিখে নিন; গাইড বা অপারেটর সেবা সম্পর্কে ভুল তথ্য দিলে ট্যুরিজম মন্ত্রণালয়ের অধিকার-পাতা ও অভিযোগের চ্যানেল আছে [১৫]।
চড়াই ছাড়া হেরা গুহা দেখা যায়?
হেরা কালচারাল ডিস্ট্রিক্ট, তার প্রদর্শনী ও কুরআন মিউজিয়াম চড়াই ছাড়াই দেখা যায়; গুহায় যেতে পাহাড়ি পথ [১]। ডিস্ট্রিক্ট কোনো শাটল বা লিফট প্রকাশ করেনি।
শুক্রবার হেরার মিউজিয়াম খোলা থাকে?
সরকারি পাতা দ্বিমত পোষণ করে। ডিস্ট্রিক্টে শুক্র ১৫:৩০–০১:০০, Visit Saudi-তে প্রতিদিন ০৭:৩০–২৩:৩০, আর ৩১ জুলাই ২০২৬-এর সৌদি প্রেস এজেন্সির প্রতিবেদনে শুক্র ০৭:০০–১৫:৩০ বাদে ২৪ ঘণ্টা [১][২][৩]। দিনেই ডিস্ট্রিক্টের পাতা দেখুন।
কুবার সওয়াবের হাদিসটি সহিহ?
এখানে যে বাক্য উদ্ধৃত, সেটি সুনান ইবনে মাজাহ ১৪১২, দারুসসালামের মূল্যায়নে হাসান [৪]। সেখানে দুই রাকাত পড়ুন, আর সওয়াবের কথায় ভ্রমণটাকে তাড়াহুড়োয় পরিণত করবেন না।
তায়েফ ডে-ট্রিপে ইহরাম লাগবে?
শুধু ফেরার পথে ওমরাহ থাকলে। তায়েফের দিক থেকে আসা হাজিদের সীমা কারন আল-মানাজিল [১২]; মক্কা ছাড়ার আগেই ইচ্ছা ঠিক করুন।
মদিনা থেকে বদর কীভাবে যাব?
পশ্চিমের রাস্তায় প্রাইভেট গাড়িতে, Visit Saudi অনুযায়ী প্রায় ১৫০ কিমি; কিছু সূত্রে ১৩০ কিমি [৮]। এটি অর্ধদিনের পরিকল্পনা, দ্রুত স্টপ নয়, আর প্রবেশমূল্যের কোনো প্রকাশিত তথ্য নেই।

১০. তথ্যসূত্র
এই পাতার প্রতিটি সংখ্যা নিচের পাতাগুলোর একটিতে আছে; সবগুলো ১৯ অক্টোবর ২০২৬-এ দেখা হয়েছে। [১] হেরা কালচারাল ডিস্ট্রিক্ট; [২] সৌদি প্রেস এজেন্সি, ৩১ জুলাই ২০২৬; [৩] Visit Saudi, Revelation Exhibition; [৪] সুনান ইবনে মাজাহ ১৪১২ (sunnah.com); [৫] Visit Saudi, মসজিদে কুবা; [৬] Visit Saudi, মসজিদে কিবলাতাইন; [৭] Visit Saudi, উহুদ; [৮] Visit Saudi, বদর যুদ্ধস্থল; [৯] City Sightseeing Al-Madinah; [১০] সৌদি প্রেস এজেন্সি, ১৮ জুলাই ২০২৬; [১১] Visit Saudi, আল-হাদা; [১২] সৌদিপিডিয়া, কারন আল-মানাজিল; [১৩] সৌদিপিডিয়া, তায়েফ গভর্নরেট; [১৪] জান্নাতুল মুআল্লা, ঐতিহাসিক সারসংক্ষেপ; [১৫] ট্যুরিজম মন্ত্রণালয়, পর্যটকদের অধিকার।`,
    internalLinks: [
      { text: "মক্কা ও মদিনার হোটেল জোন এবং Haramain Train গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "বয়স্ক মা-বাবাকে নিয়ে ওমরাহ: হুইলচেয়ার ও মেডিকেল গাইড", path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide" },
      { text: "সম্পূর্ণ DIY Umrah ১০ দিনের BDT বাজেট গাইড", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
      { text: "জমজম, খেজুর ও স্বর্ণ: বাংলাদেশ কাস্টমস নিয়ম", path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport" },
      { text: "মক্কা ও মদিনায় বাংলাদেশি হালাল খাবার গাইড", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
      { text: "DIY ওমরাহ প্ল্যানিং ও BDT খরচ ক্যালকুলেটর", path: "/umrah" },
    ],
    references: [
      { name: "হেরা কালচারাল ডিস্ট্রিক্ট — ডিস্ট্রিক্ট ও গুহার পথের সময়, মিউজিয়ামের সময়, দুটি টিকিটযুক্ত অভিজ্ঞতা ও টিকিট লিংক", nameBn: "হেরা কালচারাল ডিস্ট্রিক্ট — ডিস্ট্রিক্ট ও গুহার পথের সময়, মিউজিয়ামের সময়, দুটি টিকিটযুক্ত অভিজ্ঞতা ও টিকিট লিংক", url: "https://hiradistrict.com/en/" },
      { name: "সৌদি প্রেস এজেন্সি, ৩১ জুলাই ২০২৬ — শুক্রবার ০৭:০০–১৫:৩০ বাদে ২৪ ঘণ্টা খোলা", nameBn: "সৌদি প্রেস এজেন্সি, ৩১ জুলাই ২০২৬ — শুক্রবার ০৭:০০–১৫:৩০ বাদে ২৪ ঘণ্টা খোলা", url: "https://www.spa.gov.sa/en/w2609834" },
      { name: "Visit Saudi — দ্য রেভেলেশন এক্সিবিশন: জনপ্রতি ২৫ রিয়াল থেকে, প্রতিদিন ০৭:৩০–২৩:৩০", nameBn: "Visit Saudi — দ্য রেভেলেশন এক্সিবিশন: জনপ্রতি ২৫ রিয়াল থেকে, প্রতিদিন ০৭:৩০–২৩:৩০", url: "https://www.visitsaudi.com/en/makkah/attractions/revelation-exhibition" },
      { name: "সুনান ইবনে মাজাহ ১৪১২ — কুবার হাদিস, হাসান (দারুসসালাম)", nameBn: "সুনান ইবনে মাজাহ ১৪১২ — কুবার হাদিস, হাসান (দারুসসালাম)", url: "https://sunnah.com/ibnmajah:1412" },
      { name: "Visit Saudi — মসজিদে কুবা: ৩ কিমি পথ ও আগাম বুকিং নেই", nameBn: "Visit Saudi — মসজিদে কুবা: ৩ কিমি পথ ও আগাম বুকিং নেই", url: "https://www.visitsaudi.com/en/madinah/attractions/masjid-quba-in-madinah" },
      { name: "Visit Saudi — মসজিদে কিবলাতাইন, নবী মসজিদের উত্তর-পশ্চিমে ৩.৮ কিমি", nameBn: "Visit Saudi — মসজিদে কিবলাতাইন, নবী মসজিদের উত্তর-পশ্চিমে ৩.৮ কিমি", url: "https://www.visitsaudi.com/en/madinah/attractions/masjid-al-qiblatain-in-madinah" },
      { name: "Visit Saudi — উহুদ পাহাড় ও যুদ্ধস্থল: ৭ কিমি, ১,০৭৭ মিটার, তীরন্দাজদের টিলা, প্রায় ৭০ শহীদ", nameBn: "Visit Saudi — উহুদ পাহাড় ও যুদ্ধস্থল: ৭ কিমি, ১,০৭৭ মিটার, তীরন্দাজদের টিলা, প্রায় ৭০ শহীদ", url: "https://www.visitsaudi.com/en/madinah/attractions/uhud-mountain-in-madinah" },
      { name: "Visit Saudi — বদর যুদ্ধস্থল: মদিনার প্রায় ১৫০ কিমি পশ্চিমে, আল-আরিশ মসজিদ, ১৩ নামের শহীদদের কবরস্থান, জাবাল আল-মালাইক", nameBn: "Visit Saudi — বদর যুদ্ধস্থল: মদিনার প্রায় ১৫০ কিমি পশ্চিমে, আল-আরিশ মসজিদ, ১৩ নামের শহীদদের কবরস্থান, জাবাল আল-মালাইক", url: "https://www.visitsaudi.com/en/madinah/attractions/badr-battle-site" },
      { name: "City Sightseeing Al-Madinah — ভাড়া, ২ রুট, ১৫ স্টপ, ৪৫ মিনিট অন্তর, ১৬ ভাষা, ফোন ৯২০০১৪০৪৪", nameBn: "City Sightseeing Al-Madinah — ভাড়া, ২ রুট, ১৫ স্টপ, ৪৫ মিনিট অন্তর, ১৬ ভাষা, ফোন ৯২০০১৪০৪৪", url: "https://csmadinah.com/" },
      { name: "সৌদি প্রেস এজেন্সি, ১৮ জুলাই ২০২৬ — আল-হাদা কেবল কার: প্রতি দিকে ৪,২০০ মিটার, ১৭ মিনিট, ৫২ কেবিন, ঘণ্টায় প্রায় ১,০০০ যাত্রী", nameBn: "সৌদি প্রেস এজেন্সি, ১৮ জুলাই ২০২৬ — আল-হাদা কেবল কার: প্রতি দিকে ৪,২০০ মিটার, ১৭ মিনিট, ৫২ কেবিন, ঘণ্টায় প্রায় ১,০০০ যাত্রী", url: "https://www.spa.gov.sa/en/N2636455" },
      { name: "Visit Saudi — তায়েফের আল-হাদা পাহাড় ও আল-কার ট্যুরিস্ট ভিলেজ", nameBn: "Visit Saudi — তায়েফের আল-হাদা পাহাড় ও আল-কার ট্যুরিস্ট ভিলেজ", url: "https://www.visitsaudi.com/en/destinations/taif/attractions/alhada-mountain-in-taif" },
      { name: "সৌদিপিডিয়া — কারন আল-মানাজিল (আস-সাইল আল-কাবির): মক্কার ৮০ কিমি উত্তর-পূর্বে, তায়েফের ৩৫ কিমি উত্তরে", nameBn: "সৌদিপিডিয়া — কারন আল-মানাজিল (আস-সাইল আল-কাবির): মক্কার ৮০ কিমি উত্তর-পূর্বে, তায়েফের ৩৫ কিমি উত্তরে", url: "https://saudipedia.com/en/qarn-al-manazil" },
      { name: "সৌদিপিডিয়া — তায়েফ গভর্নরেট: ইবনে আব্বাস মসজিদ ও মসজিদে আদাস", nameBn: "সৌদিপিডিয়া — তায়েফ গভর্নরেট: ইবনে আব্বাস মসজিদ ও মসজিদে আদাস", url: "https://saudipedia.com/en/taif-governorate" },
      { name: "জান্নাতুল মুআল্লা — মসজিদুল হারামের উত্তরে, ১৯২৫–২৬ সালের ভাঙন, খাদিজা ও আবদুল মুত্তালিব সমাহিত", nameBn: "জান্নাতুল মুআল্লা — মসজিদুল হারামের উত্তরে, ১৯২৫–২৬ সালের ভাঙন, খাদিজা ও আবদুল মুত্তালিব সমাহিত", url: "https://en.wikipedia.org/wiki/Jannat_al-Mu%27alla" },
      { name: "ট্যুরিজম মন্ত্রণালয় — পর্যটকদের অধিকার: গাইডের লাইসেন্স ও লাইসেন্সধারী প্রতিষ্ঠানে যুক্ত থাকা আবশ্যক", nameBn: "ট্যুরিজম মন্ত্রণালয় — পর্যটকদের অধিকার: গাইডের লাইসেন্স ও লাইসেন্সধারী প্রতিষ্ঠানে যুক্ত থাকা আবশ্যক", url: "https://cdn.mt.gov.sa/files/A360/TouristsRights-EN.pdf" },
    ],
    affiliateCTA: {
      provider: "kiwitaxi",
      headline: "মোট দাম, ঘণ্টা ও স্টপ লিখিত থাকলেই গাড়ি আগে থেকে বুক করুন",
      body: "ঐচ্ছিক প্রি-বুকড ট্রান্সফারে নামার আগেই দাম ঠিক থাকে — এই গাইড জিয়ারতের যেকোনো গাড়ির ক্ষেত্রে যে নিয়ম চায়, সেটিই। গাড়ির শ্রেণি, লাগেজের জায়গা, অপেক্ষার সময়, বাতিলের শর্ত ও প্রাপ্যতা সরবরাহকারীর সঙ্গে নিশ্চিত করুন — ট্রান্সফার বুকিং কোনো স্থানের খোলার সময় বা ইহরামের নিয়ম বদলায় না।",
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
- **অপশন ক — মন্ত্রণালয়ের Umrah ভিসা:** অফিশিয়াল FAQ-তে সরকারি ফি 'আনুমানিক ৩০০ সৌদি রিয়াল' বলা হয়েছে (১৫ অক্টোবর ২০২৬ যাচাই) এবং বাইরের এজেন্সি আবাসন ও যাতায়াতের সার্ভিস প্যাকেজ ছাড়া ভিসা ইস্যু করতে পারে না; তাই মোট খরচ হবে অনুমোদিত প্ল্যাটফর্ম বা এজেন্সি ইস্যুর সময় যা দেখায় সেটাই। এখানে কোনো BDT অঙ্ক প্রকাশ করা হলো না, নির্দিষ্ট processing time-এর নিশ্চয়তা নেই, আর প্রবেশের সময়সীমা ও অবস্থানের মেয়াদ ভিসায় ছাপা তারিখ অনুযায়ী চলবে।
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
    title: "বাংলাদেশে শরীয়াহ-সম্মত ডুয়েল-কারেন্সি কার্ড: সুদমুক্ত ট্রাভেল কার্ড গাইড (২০২৬)",
    summary:
      "ওমরাহ, হজ বা হালাল পারিবারিক ভ্রমণের প্রস্তুতি নেওয়া অনেক বাংলাদেশি মুসলিম সুদভিত্তিক কার্ড ছাড়াই অনলাইনে ফ্লাইট, মক্কা-মদিনার হোটেল ও হারামাইন হাই-স্পিড ট্রেন বুক করতে চান। একটি শরীয়াহ-সম্মত ডুয়েল-কারেন্সি ডেবিট বা প্রিপেইড কার্ড আপনার নিজের এনডোর্স করা ট্রাভেল-কোটা বৈদেশিক মুদ্রা খরচ করে, আর একটি উজরাহ চার্জ কার্ড সুদের বদলে ঘোষিত ফি নেয়। গঠন, ফি ও সুবিধা ব্যাংকভেদে আলাদা, তাই এই যাচাইকৃত গাইডে দুই ধরনের মডেল কীভাবে কাজ করে, প্রতিটি ব্যাংকে কোন প্রশ্ন করতে হবে, যে USD 300 একবারের অনলাইন-কেনাকাটার নিয়ম যে কার্ডেই প্রযোজ্য, এবং মক্কা-মদিনায় কার্ড ব্যবহারের তিনটি ধাপ ব্যাখ্যা করা হয়েছে।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `পবিত্র **মক্কা ও মদিনায়** সফরের প্রস্তুতি নেওয়া অনেক বাংলাদেশি হাজীর চাওয়া—ভ্রমণের খরচ যেন **সুদ (Riba)** থেকে মুক্ত থাকে, আর একই সঙ্গে **DIY ওমরাহর ফ্লাইট, মক্কা-মদিনার হোটেল এবং হারামাইন হাই-স্পিড ট্রেনের টিকিট** অনলাইনে বুক করা যায়। এর জন্য সুদভিত্তিক ক্রেডিট কার্ড লাগে না। ৬ সেপ্টেম্বর ২০২৬ থেকে বাংলাদেশ ব্যাংক Authorized Dealer (AD) ব্যাংককে প্রাপ্তবয়স্ক বাসিন্দার বিদেশ ভ্রমণের জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ **USD 18,000** ছাড়ার অনুমতি দেয়; ১২ বছরের কম বয়সীরা ৫০% (সর্বোচ্চ USD 9,000), আর entitlement-এর মধ্যে সর্বোচ্চ USD 5,000 US-dollar নোট হিসেবে ছাড়া যায় [1]। সেই বৈদেশিক মুদ্রা খরচ করার কার্ডটি হতে পারে ইসলামি ব্যাংক বা ইসলামিক ব্যাংকিং উইন্ডোর একটি **শরীয়াহ-সম্মত ডুয়েল-কারেন্সি ডেবিট বা প্রিপেইড কার্ড**।

১. শরীয়াহ-সম্মত ট্রাভেল কার্ড কীভাবে সুদ (RIBA) থেকে মুক্ত
বাংলাদেশের ইসলামি ব্যাংক ও ইসলামিক উইন্ডো সাধারণত দুই মডেলে ট্রাভেল কার্ড দেয়। গঠন, নাম ও ফি ব্যাংকভেদে আলাদা, তাই নিচের বর্ণনাকে শাখাকে করার প্রশ্ন হিসেবে দেখুন—কোনো একটি ব্যাংকের পণ্যপত্র হিসেবে নয়।
নিয়ম ১: নিজের টাকা খরচ করে এমন ডেবিট বা প্রিপেইড কার্ড:
- আপনি নিজের **বাংলাদেশি টাকা (BDT)** একটি মুদারাবা বা আল-ওয়াদিয়াহ account-এ জমা রাখেন। **সৌদি রিয়াল (SAR)** বা **ডলারে (USD)** পেমেন্ট করলে—অনলাইনে বা POS টার্মিনালে—ব্যাংক আপনার নিজের জমা ব্যালেন্স নিজস্ব অনুমোদিত হারে রূপান্তর করে। টাকা আপনার নিজের, তাই কোনো ঋণ বা চক্রবৃদ্ধি সুদ তৈরি হয় না।
নিয়ম ২: নির্দিষ্ট ফি (উজরাহ) নেওয়া চার্জ কার্ড:
- কিছু ইসলামিক চার্জ কার্ড চক্রবৃদ্ধি সুদের বদলে ঘোষিত বার্ষিক বা সার্ভিস ফি (**উজরাহ**) নেয়। নির্ধারিত সময়ে ব্যালেন্স পরিশোধ না হলে কী হবে, এবং fee schedule-টি লিখিতভাবে চেয়ে নিন।

২. আবেদনের আগে যে প্রশ্নগুলো ব্যাংককে করবেন
কার্ডের সুবিধা নোটিশ ছাড়াই বদলায়, আর ব্যাংকের বর্তমান শর্তই একমাত্র নির্ভরযোগ্য সূত্র। ব্লগ থেকে নামধাম করা পণ্য র‍্যাংক না করে প্রতিটি সম্ভাব্য ব্যাংককে এই প্রশ্নগুলো করুন এবং লিখিত উত্তর রেখে দিন:
- **সুদের গঠন:** কার্ডটি নিজের ব্যালেন্স খরচ করা ডেবিট বা প্রিপেইড, না কি নির্দিষ্ট উজরাহ ফি-র চার্জ কার্ড? ঠিক কী চার্জ হয়, আর কখন?
- **ট্রাভেল কোটা:** পাসপোর্টে এনডোর্স করা **USD 18,000 বার্ষিক entitlement** কি এই কার্ডে ব্যবহার করা যায়, আর ব্যাংক কি ছাড়ের হিসাব পাসপোর্টে রেকর্ড করে? [1]
- **অনলাইন অ্যাক্টিভেশন:** কার্ডটি international e-commerce ও 3D-Secure সমর্থন করে কি না, আর অ্যাপে foreign-currency wallet/toggle কীভাবে চালু করব?
- **USD 300 নিয়ম:** travel-quota কার্ডে একবারের অনলাইন কেনাকাটা সাধারণত **USD 300**-এ সীমাবদ্ধ; এর বেশি documented flight বা hotel payment-এর জন্য OTP দেওয়ার আগে ব্যাংককে জিজ্ঞেস করুন, কারণ অনুমোদন ব্যাংকের সিদ্ধান্ত [2]। RFCD (Resident Foreign Currency Deposit) account-ভিত্তিক কার্ড অনলাইনে প্রকৃত পরিমাণে payment করার স্পষ্ট অনুমতি পায়, তবে সেটি আলাদা পণ্য—প্রতিটি ইসলামিক ট্রাভেল কার্ড একইভাবে কাজ করে ধরে নেবেন না [3]।
- **বিদেশে গ্রহণযোগ্যতা:** কার্ডটি কোন নেটওয়ার্কে চলে, আর সৌদি আরবে কোনো POS বা ATM নিষেধাজ্ঞা আছে কি?
- **ফি:** issuance, annual, foreign-exchange ও cash-withdrawal ফি কত? লিখিতভাবে নিন।
- **শরীয়াহ ভিত্তি:** কার্ডটি কোন শরীয়াহ সুপারভাইজরি বোর্ডের ভিত্তিতে গঠিত, আর কোনো profit, penalty বা charity চার্জ কীভাবে নির্ধারিত হয়?

৩. ধাপে ধাপে: হারামাইন ট্রেন ও মক্কা-মদিনার হোটেলে কার্ড ব্যবহার
ধাপ ১: Authorized Dealer শাখায় পাসপোর্ট এনডোর্স করুন:
- আপনার **বৈধ e-Passport** ও **NID** নিয়ে ব্যাংকের foreign-exchange ডেস্কে যান এবং ট্রাভেল entitlement পাসপোর্টের বিপরীতে রেকর্ড করতে বলুন। সীমা বার্ষিক, আর তা ভ্রমণের কাগজ দেখে ছাড়া হয়—স্বয়ংক্রিয়ভাবে নয়।
ধাপ ২: কার্ডের foreign-currency অংশ চালু করুন:
- ব্যাংকের অ্যাপ বা ফোনে **USD foreign-currency wallet**, **international e-commerce** ও **3D-Secure** চালু করুন—**sar.hhr.sa** (হারামাইন হাই-স্পিড রেলওয়ে) বা এয়ারলাইন্সে বুক করার আগে। বড় পেমেন্টের আগে ছোট অঙ্কে পরীক্ষা করুন।
ধাপ ৩: মক্কা বা মদিনার POS টার্মিনালে local currency বেছে নিন:
- টার্মিনাল জিজ্ঞেস করলে **SAR (local currency)** বেছে নিন। **BDT** চাপলে merchant-এর ব্যাংক নিজের হারে রূপান্তর করে, সাধারণত কয়েক শতাংশ markup-এ; প্রকৃত markup টার্মিনালভেদে বদলায়, তাই নির্দিষ্ট শতাংশে ভরসা না করে local currency বেছে নেওয়াই নিয়ম।

৪. এই গাইড যা দাবি করে না
এটি কোনো নির্দিষ্ট ব্যাংক বা কার্ড র‍্যাংক বা সুপারিশ করে না, আর কোনো নির্দিষ্ট লেনদেন সফল হবে বলে প্রতিশ্রুতিও নয়। গঠন, ফি ও গ্রহণযোগ্যতা ব্যাংকভেদে আলাদা এবং সময়ের সঙ্গে বদলায়। টাকা দেওয়ার আগে বাংলাদেশ ব্যাংকের বর্তমান সার্কুলার ও শাখার নিজস্ব কার্ড-শর্ত যাচাই করুন, আর USD 300 payment ও বিদেশে cash-versus-card সিদ্ধান্তের জন্য নিচে দেওয়া ক্লাস্টার গাইডগুলো দেখুন।`,
    internalLinks: [
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "মক্কা ও মদিনা হোটেল জোন এবং Haramain বুলেট ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "কার্ড নেই? bKash বা ব্যাংক ট্রান্সফারে ফ্লাইট ও হোটেল বুক করুন", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "টাকা ও ব্যাংকিং হাব: এনডোর্সমেন্ট, কার্ড, USD 300 নিয়ম ও NOC", path: "/banking" },
      { text: "১০ দিনের DIY Umrah BDT বাজেট ক্যালকুলেটর", path: "/umrah" },
      { text: "ডুয়েল-কারেন্সি কার্ড fee ও markup ক্যালকুলেটর", path: "/tools?tab=currency" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "আপনার ইসলামিক কার্ড দিয়ে ঢাকা–জেদ্দা ও মদিনা ফ্লাইট ভাড়া তুলনা করুন",
      body: "বিমান বাংলাদেশ, সৌদিয়া ও গালফ ক্যারিয়ারের লাইভ ভাড়া দেখুন এবং সুদমুক্ত ডুয়াল-কারেন্সি কার্ডে সরাসরি বুক করুন।",
    },
  },

  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    title: "বাংলাদেশে RFCD বনাম Travel Quota: $300 লিমিট (2026)",
    summary:
      "Travel-quota card-এর online purchase limit USD 300; বড় documented payment-এ bank approval চান, আর বিদেশ থেকে cash ফিরলে RFCD terms তুলনা করুন। Approval bank-এর সিদ্ধান্ত। RFCD card online-এ প্রকৃত পরিমাণে payment করতে পারে, তবে account-এ শুধু বিদেশ সফর থেকে সঙ্গে আনা foreign cash রাখা যায়—remittance বা বিদেশি আয় নয়। ১৬ অক্টোবর ২০২৬ তারিখে Bangladesh Bank GFET Chapter 19, FE Circular Letter No. 05 এবং EBL/SIBL-এর RFCD terms অনুযায়ী যাচাই করা হয়েছে।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `১. $300 Online-Payment Decline কেন হয়
Travel-quota card হলো পাসপোর্টে endorsed বৈদেশিক মুদ্রার বিপরীতে ইস্যু করা international card। বাংলাদেশ ব্যাংকের সাধারণ online-payment rule বৈধ পণ্য বা সেবার জন্য প্রযোজ্য entitlement-এর মধ্যে একবারে সর্বোচ্চ USD 300 online purchase-এর অনুমতি দেয় [1]। Visa-fee payment ও online hotel booking GFET-এর আলাদা paragraph-এ আছে। বাস্তবে bank বড় documented travel payment—যেমন flight বা hotel booking—process করতে পারে; তবে payment-এর আগে জিজ্ঞেস করুন, কারণ approval issuing bank-এর সিদ্ধান্ত।

২. Option A: Documented Travel Payment-এর জন্য ব্যাংকের Approval চান
একবারের flight বা hotel purchase USD 300-এর বেশি হলে OTP দেওয়ার আগে card-issuing bank-এর সঙ্গে কথা বলুন। এটি documented travel payment-এর request—limit বাড়ার নিশ্চয়তা নয়।

ধাপ ১: Card প্রস্তুত আছে কি না যাচাই করুন
Passport endorsement, card-এর foreign-currency অংশ, e-commerce এবং ব্যাংকের প্রয়োজনীয় online security setting চালু আছে কি না নিশ্চিত করুন। এই মূল কাজগুলো বাকি থাকলে আগে passport dollar endorsement guide অনুসরণ করুন।

ধাপ ২: ব্যাংককে Payment-এর সঠিক তথ্য দিন
Merchant, purpose ও exact amount জানান। Bank যেন travel-payment process অনুযায়ী request যাচাই করতে পারে, সে জন্য ticket itinerary, airline checkout বা hotel booking-এর প্রমাণ প্রস্তুত রাখুন [1]।

ধাপ ৩: Payment-এর আগে ব্যাংকের সিদ্ধান্তের জন্য অপেক্ষা করুন
Bank নির্দিষ্ট payment-টি process করবে কি না জেনে তাদের নির্দেশ অনুসরণ করুন। Approval-কে automatic বলবেন না: প্রযোজ্য documents, card control ও সিদ্ধান্ত issuing bank-এর।

৩. Option B: RFCD Account-এর যে Rules জানা জরুরি
Resident Foreign Currency Deposit (RFCD) account-এ বাংলাদেশের কোনো বাসিন্দা বিদেশ সফর থেকে শারীরিকভাবে সঙ্গে আনা যোগ্য foreign currency রাখেন। এটি প্রথম সফরের আগে BDT convert করার account নয় এবং এতে inward remittance বা বিদেশি আয় নেওয়া যায় না [3]।
- **FMJ declaration ছাড়া deposit:** বিদেশ সফর থেকে আনা USD 10,000 বা সমপরিমাণ পর্যন্ত customs declaration ছাড়াই জমা দেওয়া যায় [3]।
- **USD 10,000-এর বেশি deposit:** দেশে আসার সময় FMJ form-এ amount declare করতে হবে এবং EBL-এর terms অনুযায়ী declared amount আগমনের 30 দিনের মধ্যে জমা দিতে হবে [3]। 30 দিনের rule প্রতিটি RFCD account বা প্রতিটি deposit খোলার deadline নয়।
- **Online card use:** বাংলাদেশ ব্যাংক RFCD account-এর বিপরীতে ইস্যু করা international card-কে available balance ও bank-এর card terms সাপেক্ষে online-এ প্রকৃত পরিমাণে (at actual) payment-এর স্পষ্ট অনুমতি দিয়েছে [2]।
- **Transfer ও card access:** এই guide-এর জন্য দেখা bank terms-এ RFCD balance বিদেশে transfer এবং balance-এর বিপরীতে international card-এর সুবিধা আছে; product ও supported currency bank-ভেদে আলাদা [3][4]।

৪. RFCD বনাম Travel Quota: আপনার জন্য কোনটি উপযুক্ত?
- **Funds-এর উৎস:** Travel-quota card আপনার travel entitlement-এর বিপরীতে Authorized Dealer bank-এর ছাড় করা foreign exchange ব্যবহার করে। RFCD account বিদেশ সফর থেকে শারীরিকভাবে সঙ্গে আনা foreign cash ব্যবহার করে; inward remittance দিয়ে এটি fund করা যায় না [3]।
- **Limit-এর ধরন:** Adult travel entitlement প্রতি calendar year-এ সর্বোচ্চ USD 18,000-এর ceiling; bank travel documents দেখে amount release করে, এটি automatic allowance নয় [5]। RFCD card-এ নিজের deposited foreign-currency balance থেকে খরচ হয়।
- **Online-payment treatment:** Travel-quota card-এর সাধারণ online-purchase limit একবারে USD 300; এর বেশি documented travel payment issuing bank রাজি হলেই process হতে পারে। RFCD card online-এ প্রকৃত amount payment-এর জন্য স্পষ্টভাবে অনুমোদিত [1][2]।
- **সময় ও paperwork:** সফরের জন্য passport endorsement-এর মাধ্যমে travel quota arrange করা হয়। RFCD funding শুরু হয় সফর থেকে eligible foreign currency ফেরত আনার পর; FMJ declaration ও 30 দিনের deposit window শুধু USD 10,000-এর বেশি amount-এর ক্ষেত্রে প্রাসঙ্গিক [3]।
- **ব্যবহারিক সিদ্ধান্ত:** একবারের বড় ticket বা hotel payment হলে আগে বর্তমান card issuer-কে জিজ্ঞেস করুন। নিয়মিত travel করেন এবং সত্যিই leftover foreign cash থাকে—এমন হলে Authorized Dealer bankগুলোর RFCD account ও card terms তুলনা করুন। কোনো option-ই প্রতিটি merchant transaction সফল হওয়ার নিশ্চয়তা নয়।

৫. সিদ্ধান্তের আগে ব্যবহারিক নোট
Passport-এর arrival stamp এবং প্রযোজ্য হলে FMJ declaration bank-এর চাওয়া deposit documents-এর সঙ্গে রাখুন। Bank কোন currency নেয়, কোন international card দেয় এবং account, card, POS ও ATM-এর কী terms আছে তা জেনে নিন। RFCD freelance earning বা বিদেশ থেকে পাঠানো অন্য অর্থ নেওয়ার পথ নয়; দেখা EBL terms-এ inward remittance অনুমোদিত নয় [3]। Travel-quota endorsement ও card activation-এর জন্য এই comparison-কে পুরো procedure না ধরে dedicated endorsement guide দেখুন।

৬. সচরাচর জিজ্ঞাসা
Freelance income বা remittance কি RFCD account-এ নেওয়া যায়?
না। এই guide-এর জন্য দেখা EBL RFCD terms-এ inward remittance অনুমোদিত নয়; eligible funds হলো বিদেশ সফর থেকে শারীরিকভাবে সঙ্গে আনা foreign currency [3]।
প্রথম international trip-এর আগে কি RFCD account fund করতে পারি?
এই উদ্দেশ্যে convert করা BDT দিয়ে নয়। এখানে বর্ণিত RFCD funding আসে বিদেশ সফর থেকে সঙ্গে আনা eligible foreign currency থেকে; account-opening process ও documents Authorized Dealer bank-এর কাছে জেনে নিন [3]।
RFCD account-এ কি supplementary card নেওয়া যায়?
SIBL তাদের RFCD card facility-তে সর্বোচ্চ 2টি supplementary card-এর কথা বলেছে। এটি bank-specific term; আপনার পছন্দের product-এর terms যাচাই করুন [4]।
RFCD card কি POS বা ATM limit-ও সরিয়ে দেয়?
৯ মে ২০২৪-এর Bangladesh Bank circular বিশেষভাবে online-এ প্রকৃত amount payment-এর অনুমতি দেয়। এতে প্রতিটি POS বা ATM limit উঠে যায়—এমন কথা নেই; issuing bank-এর কাছে সেই limit নিশ্চিত করুন [2]।`,
    references: [
      {
        name: "Bangladesh Bank — GFET Volume 1, Chapter 19: Payment through International Cards",
        nameBn: "বাংলাদেশ ব্যাংক — GFET Volume 1, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট",
        url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
      },
      {
        name: "Bangladesh Bank — FE Circular Letter No. 05 (9 May 2024): RFCD cards and online payment at actual",
        nameBn: "বাংলাদেশ ব্যাংক — FE Circular Letter No. 05 (৯ মে ২০২৪): RFCD কার্ড ও প্রকৃত পরিমাণে online payment",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/may092024fepdl05e.pdf",
      },
      {
        name: "Eastern Bank (EBL) — RFCD Account: deposits, FMJ window and no inward remittance",
        nameBn: "ইস্টার্ন ব্যাংক (EBL) — RFCD Account: জমা, FMJ সময়সীমা ও inward remittance নিষেধ",
        url: "https://www.ebl.com.bd/retail-deposit/EBL-RFCD-Account",
      },
      {
        name: "Social Islami Bank (SIBL) — RFCD Account: transfers and international card facility",
        nameBn: "সোশ্যাল ইসলামী ব্যাংক (SIBL) — RFCD Account: transfer ও আন্তর্জাতিক card facility",
        url: "https://www.siblbd.com/rfcd-account",
      },
      {
        name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
        nameBn: "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): travel entitlement USD 18,000-এ বৃদ্ধি",
        url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
      },
    ],
    internalLinks: [
      { text: "টাকা ও ব্যাংকিং হাব: এনডোর্সমেন্ট, কার্ড, USD 300 নিয়ম ও NOC", path: "/banking" },
      { text: "Passport Dollar Endorsement ও Card Activation Guide", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "বিদেশে Cash বনাম Card (local currency বেছে DCC এড়ান)", path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide" },
      { text: "Umrah-এর জন্য Shariah-Compliant Islamic Dual-Currency Card", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "Card নেই? bKash বা Bank Transfer-এ BDT Payment", path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card" },
      { text: "Dual-Currency Card Fee ও Markup Calculator", path: "/tools/currency-converter" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "Bank-কে বলার আগে Flight Fare তুলনা করুন",
      body: "Live flight price ও checkout-এর exact amount দেখুন, তারপর payment-এর আগে documented travel-payment approval সম্পর্কে card issuer-কে জিজ্ঞেস করুন।",
    },
  },

  "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": {
    title: "Dual-Currency Card ছাড়াই BDT-তে ফ্লাইট, মক্কা-মদিনার হোটেল ও এয়ারপোর্ট ট্রান্সফার বুক করার নিয়ম",
    summary:
      "অনলাইনে কম ভাড়া বা হারামের কাছে হোটেলের দাম দেখার সময় প্রতিটি বাংলাদেশি ভ্রমণকারীর হাতে এনডোর্স করা ডুয়েল-কারেন্সি কার্ড থাকে না। নতুন কার্ডের জন্য অপেক্ষা করা বা অযাচাইকৃত দালালকে টাকা দেওয়া ছাড়াও পথ আছে। BDT-তে ফ্লাইট, হোটেল ভাউচার ও ট্রান্সফার বুক করতে পারেন স্থানীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ settlement করা একটি ট্রাভেল ডেস্কের মাধ্যমে। এই যাচাইকৃত গাইডে দেখুন স্বচ্ছ BDT বুকিং কীভাবে কাজ করে, পেমেন্টের আগে কী যাচাই করবেন, আর ঢাকা এয়ারপোর্টের ফাইলের জন্য কী রাখবেন।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৬ মিনিট পড়া",
    content: `ধরুন অনলাইনে ভালো একটি **ঢাকা–জেদ্দা ওমরাহ ভাড়া** বা মসজিদুল হারামের হাঁটার দূরত্বে একটি হোটেল দেখলেন—কিন্তু হাতে **ডুয়েল-কারেন্সি কার্ড** নেই, পাসপোর্টে ডলার এনডোর্সমেন্ট করা নেই, অথবা কার্ডের একবারের পেমেন্ট-সীমা checkout আটকে দিচ্ছে। ঢাকা, চট্টগ্রাম, সিলেটসহ সারা দেশের পরিবারের জন্য স্থানীয় ট্রাভেল ডেস্কের মাধ্যমে **বাংলাদেশি টাকায় (BDT)**—ব্যাংক ট্রান্সফার, **bKash** বা **Nagad**-এ—বুকিং সম্পন্ন করা এমন একটি পথ যা কার্ড ছাড়াই চলে।

১. কেন কিছু বাংলাদেশি ভ্রমণকারী BDT বুকিং ডেস্ক বেছে নেন
টাকায় settlement একটি ব্যবহারিক ব্যবস্থা, বাংলাদেশ ব্যাংকের কোনো পণ্য নয়। তিনটি কারণে ভ্রমণকারীরা এটি ব্যবহার করেন:
- **বিদেশের খরচের জন্য পাসপোর্টের ট্রাভেল কোটা অক্ষত রাখা:** দেশ ছাড়ার আগে ফ্লাইট ও হোটেল ভাউচার BDT-তে পরিশোধ করলে পাসপোর্টে এনডোর্স করা বৈদেশিক মুদ্রা বিদেশে খরচ, খাবার ও জরুরি প্রয়োজনে খোলা থাকে। entitlement একটি ceiling, যা ব্যাংক ভ্রমণের কাগজ দেখে ছাড়ে; এটি আপনাকে খরচ করতেই হবে এমন নির্দিষ্ট অঙ্ক নয় [1]।
- **পাসপোর্ট না থাকলে বা কার্ড তৈরি না হলে:** প্রোমোশনাল সিট দ্রুত শেষ হয়। পাসপোর্ট দূতাবাস বা ভিসা প্রসেসিংয়ে থাকলে শাখায় গিয়ে এনডোর্স করা যায় না, আর কার্ড সময়মতো চালু নাও হতে পারে।
- **ভিসা ও এয়ারপোর্ট যাচাইয়ের কাগজ:** দূতাবাস ও ঢাকা এয়ারপোর্টের ইমিগ্রেশন কাউন্টার যাত্রীর নাম ও রেফারেন্স নম্বরসহ পরিশোধিত, নিশ্চিত বুকিং চাইতে পারে। ডেস্ক ঠিক সেটাই দেয়।

২. ডেস্ককে টাকা দেওয়ার আগে কী যাচাই করবেন
ডেস্ক টাকায় settlement করে এবং আপনাকে airline PNR ও হোটেল ভাউচার দেয়। এটিকে আপনার ও ডেস্কের মধ্যে service ব্যবস্থা হিসেবে দেখুন, ব্যাংকের পণ্য নয়, আর টাকা দেওয়ার আগে এগুলো যাচাই করুন:
- **সর্বমোট BDT quote:** একই তারিখ ও রুমের জন্য ডেস্কের মোট দাম এয়ারলাইন্সের বা হোটেলের নিজের কার্ড-দামের সঙ্গে মিলিয়ে দেখুন, এবং কোনো conversion, service বা amendment ফি ভেতরে আছে কি না জিজ্ঞেস করুন।
- **PNR:** এয়ারলাইন্সের ছয়-অক্ষরের PNR চেয়ে নিন এবং টিকিট ইস্যু হয়েছে ধরে নেওয়ার আগে সরাসরি এয়ারলাইন্সের কাছে যাচাই করুন।
- **ভাউচার:** হোটেল ভাউচারে প্রতিটি অতিথির নাম, হোটেল, তারিখ ও হোটেল যাচাই করতে পারে এমন booking reference থাকা উচিত।
- **বাতিল ও ফেরতের শর্ত:** এয়ারলাইন্সের fare rule ও হোটেলের cancellation policy লিখিতভাবে পড়ুন, আর সফর বদলালে ফেরত কে বহন করবে তা যাচাই করুন।
- **প্রাপক:** ডেস্ক লিখিতভাবে যে business account বা wallet দেয়, শুধু সেখানেই টাকা দিন এবং রসিদ রাখুন।

৩. ধাপে ধাপে: BDT বুকিং কীভাবে কাজ করে
ধাপ ১: ফ্লাইট, হোটেল জোন বা ট্রান্সফার বাছুন:
- ডেস্ক যে তারিখ, যাত্রীসংখ্যা ও রুট বা হোটেল এলাকার quote দেবে তা ঠিক করুন—এই সাইটের flight search ও Umrah planning টুল ব্যবহার করে।
ধাপ ২: আপনার তথ্য পাঠান:
- ডেস্ককে ভ্রমণের তারিখ, রুট বা হোটেল পছন্দ এবং পাসপোর্টের bio-page স্ক্যান পাঠান, যাতে PNR-এ যাত্রীর নাম নির্ভুল বানানে থাকে।
- ডেস্ক দেয়া rate-এ convert করা সর্বমোট BDT quote পাঠায়।
ধাপ ৩: BDT-তে পরিশোধ করে কাগজ নিন:
- ব্যাংক ট্রান্সফার, **bKash** বা **Nagad**-এ পরিশোধ করুন, তারপর airline e-ticket ও তার PNR, হোটেল ভাউচার এবং কোনো transfer confirmation ইমেইল বা WhatsApp-এ নিন—এয়ারপোর্টের ফাইলের জন্য প্রস্তুত।
- কোনো Umrah অংশ থাকলে বুক করার আগে বর্তমান ভিসা, পারমিট ও স্বাস্থ্য শর্ত অফিশিয়াল সৌদি পাতায় যাচাই করুন, ব্লগে নয় [3]।

৪. BDT-তে কী কী settlement করা যায়
- **ওমরাহর অংশ:** ফ্লাইট, মক্কা ও মদিনার হোটেল, হারামাইন হাই-স্পিড ট্রেন ও প্রাইভেট ট্রান্সফার—প্রতিটি যথাযথ ভিসা বা পারমিট থাকা এবং এয়ারলাইন্স ও হোটেলের নিজস্ব শর্ত সাপেক্ষে।
- **এশিয়া ও মধ্যপ্রাচ্যের ছুটির অংশ:** নেপাল, থাইল্যান্ড, মালয়েশিয়া, মালদ্বীপ, সিঙ্গাপুর ও UAE-এর ফ্লাইট, হোটেল ও এয়ারপোর্ট ট্রান্সফার—ভ্রমণকারীর নিজস্ব ভিসা অবস্থা সাপেক্ষে।

৫. অনেক সফরে কার্ডই এখনো ডিফল্ট
BDT ডেস্ক একটি কাজের বিকল্প, আপনার নিয়ন্ত্রণে থাকা কার্ডের বিকল্প নয়। সময়মতো পাসপোর্ট এনডোর্স ও ডুয়েল-কারেন্সি কার্ড চালু করতে পারলে বুকিং, PNR ও রসিদ আপনার নিজের নাম ও account-এ থাকে। USD 300 একবারের অনলাইন-পেমেন্ট নিয়ম এবং এর বেশি documented payment-এ ব্যাংকের সিদ্ধান্তের ব্যাখ্যা নিচে দেওয়া ক্লাস্টার গাইডে [2]।`,
    internalLinks: [
      { text: "টাকা ও ব্যাংকিং হাব: এনডোর্সমেন্ট, কার্ড, USD 300 নিয়ম ও NOC", path: "/banking" },
      { text: "১০ দিনের DIY Umrah BDT বাজেট ক্যালকুলেটর ও হোটেল জোন", path: "/umrah" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "Dhaka Airport (DAC) Outbound Immigration চেকলিস্ট", path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go" },
      { text: "মক্কা ও মদিনা হোটেল জোন এবং Haramain বুলেট ট্রেন গাইড", path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh" },
      { text: "ডুয়েল-কারেন্সি কার্ড fee ও markup ক্যালকুলেটর", path: "/tools?tab=currency" },
      { text: "লাইভ গ্লোবাল ফ্লাইট সার্চ ও ভাড়া বেঞ্চমার্ক", path: "/flights" },
    ],
    affiliateCTA: {
      provider: "aviasales",
      headline: "প্রথমে লাইভ ফ্লাইট ভাড়া যাচাই করুন, এরপর কার্ডে বা BDT WhatsApp-এ বুক করুন",
      body: "ঢাকা থেকে যেকোনো রুটের বর্তমান সর্বনিম্ন বিমান ভাড়া একনজরে দেখে নিন।",
    },
  },

  "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": {
    title: "বিদেশে ক্যাশ (SAR/USD) বনাম ডুয়েল-কারেন্সি কার্ড: local currency বেছে মানি-চেঞ্জারের ফাঁদ এড়ান",
    summary:
      "ওমরাহর জন্য ঢাকায় সৌদি রিয়াল (SAR) কিনবেন, নাকি মক্কায় ভাঙাতে ডলার (USD) নেবেন? আর বিমানবন্দরের মানি চেঞ্জার ও POS-এ Dynamic Currency Conversion (DCC)-এ ভ্রমণকারীরা কত খোয়ান? বাংলাদেশ ব্যাংক কোনো নির্দিষ্ট DCC শতাংশ প্রকাশ করে না—বিধান হলো টার্মিনালে local currency বেছে নেওয়া; তাই আপনি কত markup দেন তা মেশিন ও নেটওয়ার্কভেদে বদলায়। বাংলাদেশ ব্যাংকের FX নিয়ম ও মক্কা, ব্যাংকক (SuperRich Pratunam) এবং কুয়ালালামপুরের (Bukit Bintang) বাস্তব বিনিময়-অভ্যাসের ভিত্তিতে ঢাকা থেকে একটি কাজের cash-versus-card কৌশল।",
    category: "Banking & Payments",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পড়া",
    content: `ভুল কারেন্সি এক্সচেঞ্জ কৌশল পরিবারের ভ্রমণ-বাজেট নীরবে কমিয়ে দেয়। আপনি **ঢাকা (DAC)** থেকে ওমরাহর জন্য **জেদ্দা বা মদিনা**য় যান, কিংবা **ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর, দুবাই বা মালদ্বীপে** ছুটিতে যান—তিনটি সিদ্ধান্তই সবচেয়ে জরুরি: কখন **local cash** নেবেন, কখন **ডলার** নেবেন, আর বিদেশের টার্মিনালে **ডুয়েল-কারেন্সি কার্ড** কীভাবে ব্যবহার করলে দুইবার conversion এড়ানো যায়।

১. ওমরাহর মুদ্রা: ঢাকায় সৌদি রিয়াল কিনবেন, না ডলার নেবেন?
এটি বাংলাদেশি হাজীদের সবচেয়ে সাধারণ প্রশ্ন।
নিয়ম ১: দৈনন্দিন খরচের জন্য যেখানে সম্ভব ঢাকা থেকেই সরাসরি সৌদি রিয়াল (SAR) কিনুন:
- ঢাকায় টাকা দিয়ে **ডলার** কিনে পরে মক্কা বা মদিনার মানি চেঞ্জারে সেই ডলার ভাঙিয়ে **সৌদি রিয়াল** করলে আপনি buy–sell spread দুইবার দেন। ঢাকার অনুমোদিত ব্যাংক বা লাইসেন্সপ্রাপ্ত মানি চেঞ্জার থেকে (যেমন মতিঝিল, গুলশান বা বায়তুল মোকাররমে) সরাসরি SAR কিনলে একবার spread-এ কাজ চলে। প্রকৃত spread দোকান ও দিনভেদে বদলায়—শতাংশে ভরসা না করে counter-এর rate মিলিয়ে দেখুন।
- বাংলাদেশ ব্যাংকের FEPD-2 Circular No. 01 (৭ জানুয়ারি ২০২৬) অনুযায়ী লাইসেন্সপ্রাপ্ত মানি চেঞ্জারদের passport endorsement fee প্রতি পাসপোর্টে সর্বোচ্চ **BDT 300**, পরিমাণ যাই হোক; ফি-টি প্রদর্শন করতে হবে ও রসিদ দিতে হবে [2]। ফি-টি মানি চেঞ্জারের, নোট বিক্রির জন্য, আর ব্যাংকের চার্জ থেকে আলাদা।
নিয়ম ২: হোটেল, হারামাইন ট্রেন ও সুপারমার্কেটে ডুয়েল-কারেন্সি কার্ড ব্যবহার করুন এবং SAR-এ পরিশোধ করুন:
- সৌদি আরবে contactless POS কাভারেজ ব্যাপক। বড় খরচে ডুয়েল-কারেন্সি কার্ড ব্যবহার করলে বেশি নগদ বহন করতে হয় না, আর local currency বেছে নিলে টার্মিনালও আপনার পক্ষে কাজ করে।

২. যেকোনো শতাংশের চেয়ে জরুরি টার্মিনালের নিয়ম
বিদেশের হোটেল, মল বা রেস্টুরেন্টে কার্ড টার্মিনাল বিদেশি কার্ড শনাক্ত করে পছন্দ দিতে পারে:
- *"Pay in [local currency] (SAR / THB / MYR / AED / SGD), নাকি [home currency] (BDT / USD) guaranteed conversion-এ?"*
- **local currency বেছে নিন।** আপনি বা cashier BDT বেছে নিলে merchant-এর ব্যাংক **Dynamic Currency Conversion (DCC)** করে—নিজের হারে convert করে, সাধারণত network rate-এর ওপরে কয়েক শতাংশ markup-এ। local currency বেছে নিলে conversion আপনার নিজের ব্যাংক ও কার্ড নেটওয়ার্ক করে।
- **DCC-এর কোনো নির্দিষ্ট শতাংশ নেই।** কোনো নিয়ন্ত্রক বা কার্ড নেটওয়ার্ক একটি নির্দিষ্ট অঙ্ক প্রকাশ করে না; এটি merchant ও acquirer অনুযায়ী নির্ধারিত হয়, তাই একটি নির্দিষ্ট সংখ্যা বলা বিভ্রান্তিকর হবে [3]। নিয়ম হলো প্রতিবার local currency বেছে নেওয়া।

৩. গন্তব্যভিত্তিক নোট
- **সৌদি আরব (মক্কা ও মদিনা):** রেস্টুরেন্ট, ট্যাক্সি ও টিপসের জন্য যথেষ্ট SAR নগদ রাখুন, আর হোটেল ও বড় কেনাকাটায় কার্ড ব্যবহার করুন—টার্মিনালে সবসময় SAR বেছে নিয়ে। নগদের কোনো অঙ্ককে নিজের পরিকল্পনা-অনুমান হিসেবে দেখুন, নিয়ম হিসেবে নয়।
- **থাইল্যান্ড (ব্যাংকক, পাতায়া, ফুকেট):** একটি বিমানবন্দর বুথে নয়, বরং Pratunam বা Ratchadamri-এর SuperRich-এর মতো লাইসেন্সপ্রাপ্ত মানি চেঞ্জারে ডলার ভাঙান, আর দিনের counter rate দেখে নিন।
- **মালয়েশিয়া (কুয়ালালামপুর):** মল ও ride-hailing অ্যাপে কার্ড ব্যবহার করুন, আর বিমানবন্দর বুথ সেরা ধরে না নিয়ে Mid Valley, Pavilion Bukit Bintang বা Masjid India-র এক্সচেঞ্জ কাউন্টার মিলিয়ে দেখুন।
- **মালদ্বীপ (মালে ও মাফুশি) এবং নেপাল (কাঠমান্ডু):** guesthouse ও ছোট অপারেটর সরাসরি ডলার নগদ নিতে পারে; অন্যত্র Thamel-এ ভাঙান বা হোটেলে কার্ড ব্যবহার করুন। টাকা দেওয়ার আগে গৃহীত মুদ্রা নিশ্চিত করুন।

৪. উড়ার আগে
আপনি যে পরিমাণ খরচ করবেন সেটাই পাসপোর্টে এনডোর্স করুন—প্রাপ্তবয়স্ক বাসিন্দার বার্ষিক ceiling **USD 18,000** পর্যন্ত [1]—আর ক্লাস্টারের এনডোর্সমেন্ট গাইডে বলা মতো কার্ডের foreign-currency ও e-commerce সেটিং চালু করুন। পৌঁছানোর দিনের জন্য গন্তব্যের নিজস্ব মুদ্রার অল্প নগদ রাখুন, একটি backup কার্ড ও কিছু নগদ আলাদা রাখুন, এবং প্রতিটি টার্মিনালে local currency বেছে নিন। এই গাইড একটি সিদ্ধান্তের মানচিত্র, rate-এর প্রতিশ্রুতি নয়—বর্তমান rate ও ফি আপনার ব্যাংক ও লাইসেন্সপ্রাপ্ত মানি চেঞ্জারের কাছে যাচাই করুন।`,
    internalLinks: [
      { text: "টাকা ও ব্যাংকিং হাব: এনডোর্সমেন্ট, কার্ড, USD 300 নিয়ম ও NOC", path: "/banking" },
      { text: "Dual-Currency Card ও $18,000 পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ওমরাহর জন্য শরীয়াহ-সম্মত ইসলামিক ডুয়েল-কারেন্সি কার্ড", path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah" },
      { text: "RFCD Account বনাম সাধারণ Travel Quota ($300 লিমিট সমাধান)", path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix" },
      { text: "মক্কা ও মদিনায় বাংলাদেশি হালাল খাবারের হোটেল ও দাম", path: "/blog/bangladeshi-halal-food-guide-makkah-madinah-budget-meals" },
      { text: "ডুয়েল-কারেন্সি কার্ড fee ও markup ক্যালকুলেটর", path: "/tools?tab=currency" },
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
    title: "বিদেশ ভ্রমণে Travel eSIM ও শেনজেন ট্রাভেল ইনস্যুরেন্স গাইড (২০২৬ — ওমরাহ, এশিয়া ও ইউরোপ)",
    summary:
      "ঢাকা থেকে বিদেশ ভ্রমণের আগে নির্ভরযোগ্য ইন্টারনেট সংযোগ ও যথাযথ ট্রাভেল মেডিকেল ইনস্যুরেন্স নিশ্চিত করা জরুরি। কোনো অনুমাননির্ভর সাশ্রয় দাবি না করে আপনার গন্তব্য, ব্যাংকের ওটিপি গ্রহণ ও ভিসা চেকলিস্টের আলোকে সঠিক সিদ্ধান্ত নিন।",
    category: "Family & Budget",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পঠন",
    content: `ঢাকা (DAC) থেকে আন্তর্জাতিক ফ্লাইটে রওনা হওয়ার আগে ভ্রমণকারীদের দুটি ডিজিটাল প্রস্তুতি বিবেচনা করা প্রয়োজন: নির্ভরযোগ্য মোবাইল ইন্টারনেট সংযোগ এবং উপযুক্ত ট্রাভেল মেডিকেল ইনস্যুরেন্স। কোনো প্রমাণহীন সাশ্রয় দাবি বা তাৎক্ষণিক অ্যাক্টিভেশনের আশ্বাসের ওপর নির্ভর না করে আপনার নির্দিষ্ট ভ্রমণসূচি, ফোনের নেটওয়ার্ক সামঞ্জস্য, ব্যাংকের ভেরিফিকেশন ও কনস্যুলার ভিসা নিয়মের ভিত্তিতে সিদ্ধান্ত নিন। ১৬ অক্টোবর ২০২৬ তারিখে সেবাদাতার নথি, দূতাবাস চেকলিস্ট ও ইইউ ভিসা কোডের ভিত্তিতে যাচাইকৃত।

১. Travel eSIM বনাম দেশীয় রোমিং বনাম লোকাল এয়ারপোর্ট সিম
সঠিক মোবাইল সংযোগ বেছে নেওয়া নির্ভর করে আপনার ভ্রমণের মেয়াদ, গন্তব্য এবং বাংলাদেশি নম্বরে ব্যাংকিং সিকিউরিটি কোড পাওয়ার প্রয়োজনের ওপর।
- **Travel eSIM (Airalo / Yesim):**
  একটি ডিজিটাল সিম যা কোনো ফিজিক্যাল কার্ড পরিবর্তন না করেই আনলকড ও eSIM-সাপোর্টেড স্মার্টফোনে ইনস্টল করা যায় [৩][৪]। এটি বিদেশে সমর্থিত নেটওয়ার্কে যুক্ত হওয়ার সাথে সাথে লোকাল বা রিজিওনাল মোবাইল ডাটা সরবরাহ করে। স্বল্পমেয়াদি সফর বা একাধিক দেশে ভ্রমণের জন্য এটি বেশ সুবিধাজনক।
- **বাংলাদেশি মোবাইল রোমিং:**
  আপনার বিদ্যমান গ্রামীণফোন, রবি, বাংলালিংক বা টেলিটক সিমে আন্তর্জাতিক রোমিং চালু করা। বেশি পরিমাণ ডাটা ব্যবহারের রোমিং খরচবহুল হতে পারে, তবে দেশীয় সিমটি ন্যূনতম রোমিং বা এসএমএস প্রোফাইলে সচল রাখলে ব্যাংকের ইনকামিং OTP ও ট্রানজ্যাকশন অ্যালার্ট পাওয়া যায় [৫]।
- **লোকাল ফিজিক্যাল এয়ারপোর্ট সিম:**
  গন্তব্যের এয়ারপোর্ট কিয়স্ক বা শহরের দোকান থেকে সরাসরি ফিজিক্যাল সিম কার্ড কেনা। এতে স্থানীয় মূল্যে বড় ডাটা বান্ডেল পাওয়া যায়, তবে কিয়স্কে লাইনে দাঁড়ানো, ফিজিক্যাল সিম বদল এবং পরিচয়পত্র নিবন্ধনের প্রক্রিয়া পার হতে হয়।

২. ওমান eSIM কেনার আগে যা যাচাই করবেন
আপনার ভ্রমণসূচিতে যদি ওমান (যেমন মাস্কাট, সালালাহ বা উপসাগরীয় ট্রানজিট) অন্তর্ভুক্ত থাকে, তবে বিশ্বজনীন সব সুবিধা একরকম ধরে না নিয়ে নির্দিষ্ট প্যাকেজটি যাচাই করুন।
- **নেটওয়ার্ক পার্টনার ও কভারেজ:**
  Airalo-এর ওমান eSIM বর্তমানে Omantel নেটওয়ার্কে পরিচালিত হয় [১]। ওমানের ভেতর আপনার ভ্রমণ এলাকায় স্থায়ী নেটওয়ার্ক কভারেজ রয়েছে কি না তা নিশ্চিত করুন।
- **ডাটা-অনলি বনাম ভয়েস সুবিধা:**
  ওমানের জন্য অধিকাংশ ট্রাভেল eSIM মূলত ডাটা-অনলি প্রোফাইল, যার সাথে কোনো স্থানীয় ফোন নম্বর থাকে না [১][৭]। সাধারণ ভয়েস কল বা লোকাল এসএমএস এতে চলে না; ইন্টারনেটভিত্তিক মেসেজিং অ্যাপ ব্যবহার করতে হবে।
- **রিজিওনাল বনাম সিঙ্গেল কান্ট্রি প্ল্যান:**
  মধ্যপ্রাচ্যের একাধিক দেশে (যেমন ওমান এবং সংযুক্ত আরব আমিরাত বা সৌদি আরব) ভ্রমণ করলে একটি দেশের ওমান প্ল্যানের সাথে রিজিওনাল Middle East & North Africa (MENA) প্যাকেজের তুলনা করুন [৬], এবং প্রতিটি দেশ তালিকায় রয়েছে কি না মিলিয়ে নিন।
- **অ্যাক্টিভেশন ও মেয়াদের নিয়ম:**
  প্যাকেজের মেয়াদ কি ইনস্টল করার সাথে সাথেই শুরু হয়, নাকি ওমানের লোকাল সমর্থিত নেটওয়ার্কে যুক্ত হওয়ার পর থেকে কাউন্টডাউন শুরু হয়—তা আগেভাগে দেখে নিন [২][৭]।

৩. ফোন প্রস্তুত করা ও দেশীয় নম্বর সচল রাখা
আপনার মূল বাংলাদেশি সিমের পাশাপাশি ট্রাভেল eSIM ব্যবহার করতে ফোনে সঠিক সেটিংস প্রয়োজন।
Step 1: ডিভাইসের সামঞ্জস্য ও ক্যারিয়ার আনলক নিশ্চিত করুন
আপনার স্মার্টফোনে eSIM প্রযুক্তি সমর্থিত এবং ফোনটি কোনো নির্দিষ্ট মোবাইল অপারেটরে লক করা নেই তা নিশ্চিত করুন [৩]। কিছু আঞ্চলিক মডেলের ফোনে eSIM থাকে না; কেনার আগে প্রস্তুতকারকের স্পেসিফিকেশন দেখুন।
Step 2: স্থিতিশীল ওয়াই-ফাই সংযোগে eSIM ইনস্টল করুন
যাত্রার আগেই বাসা বা অফিসের নির্ভরযোগ্য ওয়াই-ফাই নেটওয়ার্কে যুক্ত হয়ে eSIM প্রোফাইল ইনস্টল করুন [২]। কিউআর কোড বা ইনস্টলেশন নির্দেশনা সংরক্ষণ করুন।
Step 3: ডুয়াল-সিম সেটিংসে ডাটা ও ভয়েস লাইন আলাদা করুন
ফোনের সেলুলার সেটিংসে ট্রাভেল eSIM-কে শুধু "Mobile Data"-এর জন্য প্রধান লাইন নির্ধারণ করুন। আপনার ফিজিক্যাল বাংলাদেশি সিমটি কল ও এসএমএস-এর জন্য সচল রাখুন যাতে গুরুত্বপূর্ণ 3D-Secure ব্যাংক ওটিপি পেতে পারেন [৪][৫]।
Step 4: ট্রাভেল eSIM লাইনে ডাটা রোমিং অন করুন
সেলুলার সেটিংসে ট্রাভেল eSIM প্রোফাইলের জন্য "Data Roaming" চালু করুন, তবে অপ্রত্যাশিত চার্জ এড়াতে বাংলাদেশি সিমের ডাটা রোমিং বন্ধ রাখুন।

৪. শেনজেন ভিসার জন্য ট্রাভেল ইনস্যুরেন্সের বাধ্যবাধকতা
বাংলাদেশি পাসপোর্টধারীদের জন্য শেনজেনভুক্ত দেশে (যেমন ফ্রান্স, জার্মানি, ইতালি, স্পেন, সুইডেন বা সুইজারল্যান্ড) ভিসার আবেদন করতে ইউরোপীয় ইউনিয়নের আইন অনুযায়ী ট্রাভেল মেডিকেল ইনস্যুরেন্স থাকা বাধ্যতামূলক।
- **আর্টিকেল ১৫ ন্যূনতম কভারেজ (€30,000):**
  EU Visa Code (Regulation EC No 810/2009)-এর আর্টিকেল ১৫ অনুযায়ী আবেদনকারীর কমপক্ষে €30,000 কভারেজের বৈধ ট্রাভেল মেডিকেল ইনস্যুরেন্স থাকতে হবে [৮]।
- **প্রয়োজনীয় সুবিধার শর্তাবলী:**
  পলিসিতে জরুরি চিকিৎসা ব্যয়, হাসপাতালে জরুরি ভর্তি এবং চিকিৎসার প্রয়োজনে বা মৃত্যুর ক্ষেত্রে মরদেহ স্বদেশে প্রত্যাবাসন (Repatriation) অন্তর্ভুক্ত থাকতে হবে [৮][৯]।
- **এলাকা ও মেয়াদের পরিধি:**
  সার্টিফিকেটটি সমস্ত শেনজেন সদস্য রাষ্ট্রের ভূখণ্ডে কার্যকর হতে হবে এবং ভ্রমণের সম্পূর্ণ মেয়াদ বা প্রথম পরিকল্পিত সফরের দিনগুলো কভার করতে হবে [৮][৯]।
- **কনস্যুলার চেকলিস্ট যাচাই:**
  ঢাকায় ভিসা আবেদন কেন্দ্রে আবেদনকারীর নাম, পলিসি নম্বর, সঠিক মেয়াদের তারিখ এবং €30,000 কভারেজ স্পষ্টভাবে লেখা অফিশিয়াল সার্টিফিকেট জমা দিতে হয় [৯]। কিছু দূতাবাস ক্রেডিট কার্ডের সাথে যুক্ত ইনস্যুরেন্স গ্রহণ করে না; আবেদনের আগে সংশ্লিষ্ট দূতাবাসের চেকলিস্ট দেখে নিন।

৫. ফ্যামিলি ট্রিপ, প্রবীণ যাত্রী ও আগের অসুস্থতা সংক্রান্ত শর্ত
নন-শেনজেন গন্তব্যেও (যেমন দক্ষিণ-পূর্ব এশিয়া বা সৌদি আরব) ট্রাভেল মেডিকেল ইনস্যুরেন্স অত্যন্ত কার্যকর, তবে কেনার আগে পলিসির কিছু সীমাবদ্ধতা জানা জরুরি।
- **আগের থেকে থাকা অসুস্থতা (Pre-Existing Conditions):**
  সাধারণ ট্রাভেল ইনস্যুরেন্স পলিসিতে সাধারণত আগে থেকে থাকা বা ডায়াগনস হওয়া দীর্ঘমেয়াদি রোগ অন্তর্ভুক্ত থাকে না [১০][১১][১২]। পূর্ববর্তী অসুস্থতার কারণে জরুরি হাসপাতালে ভর্তির খরচ অনেক সময় দাবি করা যায় না।
- **প্রবীণ ভ্রমণকারী (বয়স ৬০+):**
  বীমা কোম্পানিগুলো বয়োজ্যেষ্ঠ যাত্রীদের ক্ষেত্রে নির্দিষ্ট বয়সসীমা, মেডিকেল ঘোষণা, অতিরিক্ত প্রিমিয়াম বা ডিডাক্টিবল শর্ত প্রয়োগ করে [১০][১১]। বয়স ও কভারেজ সীমা সম্পর্কে লিখিত শর্ত দেখে নিন।
- **চিকিৎসা কভারেজ বনাম ভ্রমণ বিঘ্ন:**
  সাধারণ জরুরি চিকিৎসা পলিসি স্বয়ংক্রিয়ভাবে লাগেজ হারানো বা ফ্লাইট বাতিলের ক্ষতি পূরণ করে না [১১][১২]। ভ্রমণের এ ধরনের ক্ষতিপূরণ চাইলে পলিসিতে তা স্পষ্টভাবে উল্লেখ আছে কি না যাচাই করুন।
- **সৌদি ওমরাহ ও ট্রানজিট ইনস্যুরেন্স:**
  অফিশিয়াল সৌদি ওমরাহ বা স্টপওভার ভিসা প্রক্রিয়াকরণের সময় নির্ধারিত জরুরি স্বাস্থ্যবীমা যুক্ত থাকে [১৩]। দীর্ঘ অবস্থান বা প্রবীণ নির্ভরশীলদের জন্য অতিরিক্ত ব্যক্তিগত ট্রাভেল কভারেজ প্রয়োজন কি না তা বিবেচনা করুন।

৬. সচরাচর জিজ্ঞাসা
সব স্মার্টফোনে কি ট্রাভেল eSIM ব্যবহার করা যায়?
না। আপনার ফোনে eSIM হার্ডওয়্যার থাকতে হবে এবং ফোনটি নেটওয়ার্ক-আনলকড হতে হবে। কিছু দেশের বা মডেলের ভ্যারিয়েন্টে eSIM সুবিধা থাকে না; কেনার আগে প্রস্তুতকারকের তথ্য মিলিয়ে নিন [৩][৪]।
ডাটা eSIM ব্যবহার করার সময় কি বাংলাদেশি ব্যাংকের ওটিপি এসএমএস পাওয়া যাবে?
ডাটা-অনলি eSIM কোনো এসএমএস গ্রহণ করে না। তবে ডুয়াল-সিম ফোনে আপনার ফিজিক্যাল দেশীয় সিম সচল রাখলে এসএমএস ওটিপি আসবে এবং eSIM দিয়ে ইন্টারনেট চলবে [৪][৫]।
eSIM-এর মেয়াদ কখন থেকে শুরু হয়?
মেয়াদের নিয়ম সেবাদাতা ও প্যাকেজের ওপর নির্ভর করে। কিছু প্যাকেজ ইনস্টল করলেই সক্রিয় হয়, তবে বেশিরভাগ ক্ষেত্রে গন্তব্যে পৌঁছে সমর্থিত লোকাল নেটওয়ার্কে কানেক্ট হওয়ার পর মেয়াদ শুরু হয় [২][৭]।
সব আন্তর্জাতিক ভ্রমণের জন্যই কি €30,000 ট্রাভেল ইনস্যুরেন্স বাধ্যতামূলক?
ইউরোপের শেনজেন ভিসার আবেদনের জন্য EU Visa Code-এর আর্টিকেল ১৫ অনুযায়ী €30,000 কভারেজ আইনত বাধ্যতামূলক [৮]। অন্যান্য গন্তব্যের জন্য ভিসার আলাদা নিয়ম রয়েছে বা এটি ঐচ্ছিক সুরক্ষা হিসেবে নেওয়া হয় [১০]।`,
    internalLinks: [
      { text: "Nusuk অ্যাপ ও মদিনা রিয়াজুল জান্নাহ পারমিট গাইড", path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit" },
      { text: "Dual-Currency Card পাসপোর্ট এনডোর্সমেন্ট গাইড", path: "/blog/dual-currency-card-endorsement-bangladesh" },
      { text: "ইউরোপ, যুক্তরাজ্য ও আমেরিকা দর্শনীয় স্থান গাইড", path: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide" },
      { text: "Travel Tools হাব: কারেন্সি ও ভ্রমণ সরঞ্জাম", path: "/tools" },
    ],
    affiliateCTA: {
      provider: "airalo",
      headline: "আপনার গন্তব্যের Airalo Travel eSIM প্যাকেজ দেখুন",
      body: "ঢাকা ছাড়ার আগেই ওয়াই-ফাই সংযোগে ই-সিম ইনস্টল করে নিন যাতে ল্যান্ড করার পর সমর্থিত নেটওয়ার্কে যুক্ত হয়ে ইন্টারনেট ব্যবহার করতে পারেন।",
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
    title: "ফ্লাইট বিলম্ব, বাতিল ও লাগেজ ক্ষতিপূরণ গাইড: বাংলাদেশি যাত্রীদের অধিকার ও নিয়ম (২০২৬)",
    summary:
      "আন্তর্জাতিক ফ্লাইটে দীর্ঘ বিলম্ব, হঠাৎ বাতিল কিংবা ওমরাহ ও ইউরোপ সফরে লাগেজ হারালে যাত্রীদের অধিকার সুরক্ষায় ইউরোপীয় আইন (EC 261/UK 261), তুর্কি SHY-PASS, সৌদি GACA ও মন্ট্রিল কনভেনশন কার্যকর ভূমিকা রাখে। জানুন রুটভিত্তিক ক্ষতিপূরণ নিয়ম ও ক্লেইম করার সঠিক ধাপ।",
    category: "Cheap Flight Tips",
    date: "২৭ সেপ্টেম্বর, ২০২৬",
    author: "ফারহান মোমেন (ফাউন্ডার ও ট্রাভেল এডিটর)",
    readTime: "৭ মিনিট পঠন",
    content: `আন্তর্জাতিক ফ্লাইটে দীর্ঘ বিলম্ব হলে, শেষ মুহূর্তে ফ্লাইট বাতিল হলে বা চেক-ইন করা লাগেজ না পৌঁছালে অনেক বাংলাদেশি যাত্রী মনে করেন কেবল দুঃখপ্রকাশ বা খাবারের ভাউচার ছাড়া আর কোনো প্রতিকার নেই। বাস্তবে আন্তর্জাতিক বিমান চলাচল চুক্তি ও ভোক্তা অধিকার আইন নির্দিষ্ট রুটের সব যাত্রীকে তাঁদের পাসপোর্ট বা জাতীয়তা নির্বিশেষে সুরক্ষা দেয়। আপনার ভ্রমণের রুটে কোন আইনি কাঠামো কার্যকর তা জানা থাকলে খাবার, আবাসন, লাগেজ ক্ষতিপূরণ বা নগদ কম্পেনসেশনের ন্যায্য দাবি জানানো সহজ হয়। ১৬ অক্টোবর ২০২৬ তারিখে ইউরোপীয় রেগুলেশন EC 261/2004, UK CAA গাইডলাইন, তুর্কি SHY-PASS এবং মন্ট্রিল কনভেনশনের ভিত্তিতে তথ্য যাচাইকৃত।

১. বাংলাদেশি যাত্রীদের জন্য প্রযোজ্য আন্তর্জাতিক বিমান অধিকার কাঠামো
আইনি ক্ষতিপূরণ নির্ভর করে আপনার ফ্লাইট রুট, পরিচালনাকারী এয়ারলাইন্স এবং সমস্যার কারণের ওপর—পাসপোর্টের দেশের ওপর নয়।
- **ইউরোপীয় ইউনিয়ন রেগুলেশন EC 261/2004 (EU ফ্লাইট):**
  ইউরোপীয় ইউনিয়নের যেকোনো বিমানবন্দর থেকে ছেড়ে আসা সব ফ্লাইট (ক্যারিয়ারের জাতীয়তা নির্বিশেষে, যেমন রোম বা লন্ডন থেকে বিমান বাংলাদেশ কিংবা ইউরোপ থেকে টার্কিশ বা এমিরেটস) এবং কোনো EU-ক্যারিয়ার পরিচালিত ফ্লাইটে ইউরোপে প্রবেশের ক্ষেত্রে এটি প্রযোজ্য [১][২]। এয়ারলাইন্সের নিয়ন্ত্রণে থাকা পরিচালনাগত কারণে ৩,৫০০ কিলোমিটারের বেশি দূরপাল্লার রুটে চূড়ান্ত গন্তব্যে ৩ ঘণ্টার বেশি দেরিতে পৌঁছালে যাত্রীরা €৩০০ (৩ থেকে ৪ ঘণ্টার বিলম্ব) বা €৬০০ (৪ ঘণ্টার বেশি বিলম্ব) পর্যন্ত আইনি ক্ষতিপূরণ পাওয়ার অধিকারী হতে পারেন [১][২]। তবে দুর্যোগপূর্ণ আবহাওয়া বা এয়ার ট্রাফিক কন্ট্রোলের জটিলতা ব্যতিক্রমী পরিস্থিতি হিসেবে গণ্য হয়, যাতে নগদ ক্ষতিপূরণ প্রযোজ্য না হলেও খাবার ও যোগাযোগের যত্ন পাওয়ার অধিকার বহাল থাকে।
- **যুক্তরাজ্য UK 261 রেগুলেশন (যুক্তরাজ্য সংশ্লিষ্ট ফ্লাইট):**
  যুক্তরাজ্যের বিমানবন্দর থেকে ছেড়ে আসা যেকোনো ক্যারিয়ারের ফ্লাইট এবং ইউকে বা ইইউ এয়ারলাইন্সে যুক্তরাজ্যে পৌঁছানোর ফ্লাইটে কার্যকর [৩][৪]। ইউকে আইন অনুযায়ী ৪ ঘণ্টার বেশি বিলম্ব হওয়া দূরপাল্লার ফ্লাইটে যাত্রীপ্রতি সর্বোচ্চ £৫২০ এবং ৩ থেকে ৪ ঘণ্টার বিলম্বে £২৬০ পর্যন্ত ক্ষতিপূরণ প্রাপ্য হতে পারে [৪][৫]।
- **সৌদি আরব GACA যাত্রী অধিকার আইন (ওমরাহ ও ট্রানজিট রুট):**
  সৌদি আরবের যেকোনো বিমানবন্দর (জেদ্দা, মদিনা, রিয়াদ, দাম্মাম) থেকে প্রস্থানকারী ফ্লাইট বা সৌদি জাতীয় ক্যারিয়ারে এটি প্রযোজ্য [১৩]। নির্ধারিত সীমার বেশি বিলম্বের ক্ষেত্রে খাবার, পানীয় এবং প্রয়োজন অনুযায়ী হোটেল আবাসন নিশ্চিত করা এয়ারলাইন্সের আইনি দায়িত্ব। যাত্রী অধিকারের আওতায় প্রথমে এয়ারলাইন্সের কাছে আবেদন করে পরবর্তীতে GACA পোর্টালে অভিযোগ জানানো যায়।
- **তুরস্কের SHY-PASS আইন (ইস্তাম্বুল ট্রানজিট):**
  তুরস্কের এয়ারলাইন্স পরিচালিত যেকোনো ফ্লাইট এবং তুর্কি বিমানবন্দর থেকে ছেড়ে আসা আন্তর্জাতিক ফ্লাইটে প্রযোজ্য [১১]। এয়ারলাইন্সের কারিগরি বা অপারেশনাল কারণে চূড়ান্ত গন্তব্যে ৩ ঘণ্টার বেশি দেরিতে পৌঁছালে নির্ধারিত হারে ক্ষতিপূরণ দাবি করা যায় [১১]।
- **মন্ট্রিল কনভেনশন (চেক-ইন লাগেজ বিলম্ব, ক্ষতি ও হারানো):**
  বাংলাদেশ, সৌদি আরব, সংযুক্ত আরব আমিরাত, থাইল্যান্ড, যুক্তরাজ্য ও মার্কিন যুক্তরাষ্ট্রসহ সদস্য দেশগুলোর আন্তর্জাতিক ফ্লাইটে কার্যকর [৮][১০]। আইকাও (ICAO)-এর ২৮ ডিসেম্বর ২০২৪ থেকে কার্যকর সংশোধিত সীমা অনুযায়ী লাগেজ ক্ষতি, বিলম্ব বা হারানোর ক্ষেত্রে এয়ারলাইন্সের সর্বোচ্চ দায়বদ্ধতা সীমা যাত্রীপ্রতি ১,৫১৯ স্পেশাল ড্রয়িং রাইটস (SDR) [৯][১০]। এটি কোনো ঢালাও এককালীন পেমেন্ট নয়: প্রয়োজনীয় জরুরি কেনাকাটার রসিদ বা হারানো সামগ্রীর যথাযথ মূল্যের প্রমাণ জমা দিতে হয়।

২. এয়ারপোর্টে ফ্লাইট বিলম্ব বা লাগেজ সমস্যায় করণীয় ৩টি কাজ
এয়ারপোর্টে থাকা অবস্থাতেই প্রমাণ সংরক্ষণ করা ক্ষতিপূরণ পাওয়ার প্রধান শর্ত:
ধাপ ১: বোর্ডিং পাস ও ভ্রমণ নথি সংরক্ষণ করুন:
- আপনার ডিজিটাল বা প্রিন্ট করা বোর্ডিং পাস, ৬-সংখ্যার PNR সমৃদ্ধ ই-টিকিট, লাগেজের ট্যাগ স্টিকার এবং এয়ারপোর্টের ডিসপ্লে বোর্ডে প্রদর্শিত ফ্লাইট বিলম্বের ছবি বা স্ক্রিনশট নিরাপদ রাখুন [১][৮]।
ধাপ ২: কাস্টমস হল ছাড়ার আগেই PIR (Property Irregularity Report) সংগ্রহ করুন:
- ঢাকা (DAC), জেদ্দা (JED) বা যেকোনো আন্তর্জাতিক বিমানবন্দরে লাগেজ না পেলে বা ক্ষতিগ্রস্ত হলে লাগেজ বেল্ট ছাড়ার আগেই এয়ারলাইন্সের Lost & Found ডেস্কে অভিযোগ জানান। অফিশিয়াল Property Irregularity Report (PIR) সংগ্রহ করুন এবং আইনি সময়সীমার মধ্যে লিখিত ক্লেইম দিন: লাগেজ ক্ষতিগ্রস্ত হলে পাওয়ার ৭ দিনের মধ্যে এবং বিলম্বিত লাগেজের খরচের জন্য ২১ দিনের মধ্যে লিখিত নোটিশ দেওয়া বাধ্যতামূলক [৮]।
ধাপ ৩: সরাসরি এয়ারলাইন্সে আবেদন বা থার্ড-পার্টি ক্লেইম সার্ভিস বেছে নিন:
- আপনার ক্ষতিপূরণ বা খরচের দাবির জন্য বিনা খরচে সরাসরি পরিচালনাকারী এয়ারলাইন্সের কাস্টমার কেয়ারে আবেদন করার পূর্ণ অধিকার রয়েছে [২][৭]। এয়ারলাইন্স সাড়া না দিলে বা ন্যায্য ক্লেইম প্রত্যাখ্যান করলে AirHelp-এর মতো আন্তর্জাতিক ক্লেইম অ্যাসিস্ট্যান্স প্ল্যাটফর্মে নো-উইন নো-ফি ভিত্তিতে সহায়তা নেওয়া যায় (যেখানে সফল আদায়ের ক্ষেত্রে নির্দিষ্ট সার্ভিস ফি প্রযোজ্য, এবং AirHelp+ মেম্বারশিপে ১১% ছাড়ের জন্য প্রোমো কোড AHTPO11 ব্যবহার করা যায়)।

৩. সচরাচর জিজ্ঞাসা
ঢাকা থেকে জেদ্দা রুটে গালফ ক্যারিয়ারের ফ্লাইটে কি ইইউ/ইউকে ক্ষতিপূরণ পাওয়া যায়?
সাধারণত না। ঢাকা থেকে সৌদি আরবের রুটে বিমান, সৌদিয়া, এমিরেটস বা কাতার এয়ারওয়েজের সরাসরি ফ্লাইটে ইউরোপীয় বা ব্রিটিশ আকাশসীমা বা ক্যারিয়ার সংশ্লিষ্ট থাকে না, তাই EC 261 বা UK 261 প্রযোজ্য হয় না [১][৩]।
লাগেজ হারালে কি স্বয়ংক্রিয়ভাবে পুরো ১,৫১৯ SDR নগদ পাওয়া যায়?
না। মন্ট্রিল কনভেনশনের ১,৫১৯ SDR হলো এয়ারলাইন্সের সর্বোচ্চ দায়সীমা [৯]। জরুরি প্রয়োজনীয় কেনাকাটার প্রমাণ (বিলম্বিত লাগেজের ক্ষেত্রে) অথবা হারানো সামগ্রীর মূল্যের সত্যতা অনুযায়ী এয়ারলাইন্স ক্ষতিপূরণ প্রদান করে [৮]।
লাগেজ সংক্রান্ত ক্লেইম কত দিনের মধ্যে করতে হয়?
মন্ট্রিল কনভেনশন অনুযায়ী ক্ষতিগ্রস্ত লাগেজের জন্য পাওয়ার ৭ দিনের মধ্যে এবং বিলম্বিত লাগেজের ক্ষেত্রে ২১ দিনের মধ্যে লিখিত অভিযোগ দায়ের করতে হয় [৮]। আইনি পদক্ষেপের সর্বোচ্চ সময়সীমা ২ বছর [৮]।
কোনো থার্ড-পার্টি সার্ভিস ছাড়াই কি সরাসরি ক্ষতিপূরণ দাবি করা সম্ভব?
হ্যাঁ। ইউরোপীয় ইউনিয়ন ও যুক্তরাজ্যের যাত্রী অধিকার নীতিমালা অনুযায়ী প্রথমে পরিচালনাকারী এয়ারলাইন্সের ওয়েবসাইটে সরাসরি বিনা খরচে আবেদন করার পরামর্শ দেওয়া হয় [২][৭]। থার্ড-পার্টি কোম্পানিগুলো ঐচ্ছিক বাণিজ্যিক সেবা।`,
    internalLinks: [
      { text: "Travel Tools হাবে ফ্লাইট ক্ষতিপূরণ ও AirHelp প্রোমো কোড দেখুন", path: "/tools/flight-delay-claim" },
      { text: "ঢাকা থেকে পরিচালিত প্রধান এয়ারলাইন্সের লাগেজ ও সার্ভিস নিয়ম", path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla" },
      { text: "ঢাকা থেকে জেদ্দা ও মদিনা Open-Jaw Flight কৌশল", path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia" },
      { text: "বিদেশ ভ্রমণে সেরা Travel eSIM ও ট্রাভেল ইনস্যুরেন্স গাইড", path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide" },
      { text: "গ্লোবাল ফ্লাইট সার্চ ও বুকিং পোর্টাল", path: "/flights" },
    ],
    affiliateCTA: {
      provider: "airhelp",
      headline: "ফ্লাইট বিলম্ব বা লাগেজ সমস্যার ক্ষতিপূরণ যোগ্যতা যাচাই করুন",
      body: "AirHelp-এ বিনামূল্যে আপনার ফ্লাইটের আইনি ক্ষতিপূরণ পাওয়ার যোগ্যতা পরীক্ষা করুন (AirHelp+ প্রোটেকশনে ১১% ছাড়ের কোড: AHTPO11)।",
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
      { text: "টুলস ডেস্কে সার্চেবল এয়ারপোর্ট ডিরেক্টরি ও হোয়াটসঅ্যাপ কোটেশন", path: "/tools/airport-codes" },
      { text: "ঢাকা থেকে দুবাই ফ্লাইট শিডিউল ও বিমান ভাড়া", path: "/flights/dhaka-dubai" },
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools/flight-delay-claim" },
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
      { text: "এয়ারপোর্ট কোড ও হোয়াটসঅ্যাপ টিকিট অনুসন্ধান টুল", path: "/tools/airport-codes" },
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools/flight-delay-claim" },
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
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools/flight-delay-claim" },
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
      { text: "ফ্লাইট ডিলে ক্ষতিপূরণ চেকার (€600)", path: "/tools/flight-delay-claim" },
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
    category: "অ্যাফিলিয়েট মার্কেটিং",
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
      "তিনটি পথই আছে, আর কোনোটিতেই BDT-তে নির্ধারিত দাম প্রকাশ করা হয় না। মন্ত্রণালয়ের Umrah ভিসার সরকারি ফি অফিশিয়াল FAQ-তে 'আনুমানিক ৩০০ সৌদি রিয়াল' বলা হয়েছে (১৫ অক্টোবর ২০২৬ তারিখে যাচাই); বাইরের এজেন্সি আবাসন ও যাতায়াতের সার্ভিস প্যাকেজ ছাড়া এই ভিসা ইস্যু করতে পারে না, তাই ইনস্যুরেন্সসহ মোট খরচ হবে অনুমোদিত প্ল্যাটফর্ম বা এজেন্সি ইস্যুর সময় যা দেখায় সেটাই। একই FAQ ভিসা ইস্যুর তিন মাসের মধ্যে প্রবেশের কথা বলে এবং এক উত্তরে অবস্থানের সীমা ৩০ দিন, অন্য উত্তরে ৯০ দিন লেখে—সুতরাং ভিসায় ছাপা তারিখই আসল। যোগ্য Saudia বা flynas ইটিনারারিতে টিকিটের চেকআউটে ৯৬ ঘণ্টার stopover ভিসা যোগ করা যায়; বৈধ ও আগে ব্যবহৃত US/UK/Schengen ভিসা থাকলে বর্তমান পোর্টাল শর্ত পূরণ হলে visa-on-arrival প্রযোজ্য হতে পারে, এটা স্বয়ংক্রিয় ধরে নেবেন না। ওমরাহ পারমিটনির্ভর: অফিশিয়াল Nusuk (nusuk.sa) অ্যাপে ওমরাহ স্লট ও মদিনার Rawdah Shareef পারমিট বুক করতে হয়। Saudi Visa Bio বায়োমেট্রিকের নিয়ম ভিসা আবেদনের সঙ্গে থাকা নির্দেশনা অনুযায়ী চলে—ইলেকট্রনিকভাবে ইস্যু হওয়া Umrah ভিসার ক্ষেত্রে মন্ত্রণালয় বাংলাদেশকেও উল্লেখ করেছে।",
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
  "ktm-dhaka": {
    from: "Kathmandu (KTM)",
    to: "Dhaka (DAC)",
    flightDuration: "১ ঘণ্টা ২৫ মিনিট (Direct)",
    bestTimeToBook: "যাত্রার ৩–৪ সপ্তাহ আগে",
    visaRequirement: "বাংলাদেশি নাগরিকের জন্য ভিসা নেই; নেপালী নাগরিকের জন্য বাংলাদেশ ভিসা (eVisa অথবা DAC এয়ারপোর্টে Visa on Arrival, বর্তমান আইন অনুযায়ী)",
    quickAnswer:
      "কাঠমান্ডু (KTM) থেকে ঢাকা (DAC) সরাসরি ফ্লাইটে মাত্র ১ ঘণ্টা ২৫ মিনিট সময় লাগে। Biman Bangladesh Airlines এবং Himalaya Airlines এই রুটে নিয়মিত সরাসরি ফ্লাইট পরিচালনা করে। রাউন্ডট্রিপ ভাড়া সাধারণত BDT 26,500 থেকে BDT 35,000-এর মধ্যে থাকে এবং flights ট্রিবভুবন ইন্টারন্যাশনাল এয়ারপোর্ট (KTM) থেকে হাজর শাহজালাল ইন্টারন্যাশনাল এয়ারপোর্ট (DAC) পর্যন্ত চলে।",
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
  "dhaka-los-angeles": {
    from: "Dhaka (DAC)",
    to: "Los Angeles (LAX)",
    flightDuration: "১৯ ঘণ্টা ৩০ মিনিট - ২৪ ঘণ্টা (১-২ স্টপ)",
    bestTimeToBook: "যাত্রার ৩-৫ মাস আগে",
    visaRequirement: "US B1/B2 ভিসা (আগে থেকে US Embassy Dhaka-তে আবেদন)",
    quickAnswer:
      "ঢাকা (DAC) থেকে লস অ্যাঞ্জেলেস (LAX)-এ সরাসরি ফ্লাইট নেই। সব রুটেই ১-২ টি স্টপ থাকে, সাধারণত দুবাই (DXB), দোহা (DOH), আবু Dhabi (AUH) অথবা ইস্তანবুল (IST) হতে। মোট যাতায়াতের সময় ১৯ ঘণ্টা ৩০ মিনিট থেকে ২৪ ঘণ্টা পর্যন্ত। ইকনমি রাউন্ডট্রিপ ভাড়া সাধারণত BDT 1,50,000 থেকে BDT 2,40,000। বাংলাদেশি পাসপোর্টধারীদের জন্য আগে থেকে US B1/B2 ভিসা আবশ্যক, এটি ভিজা-অন-অ্যারাইভাল বা ESTA-योग্য নয়।",
  },
  "dhaka-madinah": {
    from: "Dhaka (DAC)",
    to: "মাদিনাহ (MED)",
    flightDuration: "৬ ঘণ্টা ৩০ মিনিট - ৮ ঘণ্টা (প্রাত্যক)",
    bestTimeToBook: "যাত্রার ২-৩ মাস আগে, বিশেষ করে রমজান ও হজ মৌসুমের আগে; অপ-পিক মৌসুমে কম ভাড়া পাওয়া যায়",
    visaRequirement: "সৌদি উমরাহ ভিসা বা ট্যুরিস্ট ভিসা (সৌদি ভিসা পোর্টাল অথবা অনুমোদিত এজেন্টের মাধ্যমে আগে থেকে আবেদন; বাংলাদেশি পাসপোর্টধারীদের জন্য ভিজা-অন-অ্যারাইভাল নেই)",
    quickAnswer:
      "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে সৌদি আরবের মাদিনাহের প্রিন্স মোহাম্মদ বিন আবদুলআজিজ আন্তর্জাতিক বিমানবন্দর (MED)-এ সরাসরি ফ্লাইট চলে। ফ্লাইটের সময় প্রায় ৬ ঘণ্টা ৩০ মিনিট। ইকনমি রাউন্ডট্রিপ ভাড়া সাধারণত BDT 55,000 থেকে BDT 95,000। বাংলাদেশি পাসপোর্টধারীদের জন্য আগে থেকে সৌদি উমরাহ ভিসা বা ট্যুরিস্ট ভিসা আবশ্যক—এটি ভিজা-অন-অ্যারাইভাল নয়। মাদিনাহ ইসলামের দ্বিতীয় পবিত্র নগর, এখানে আল-মসজিদ আন-নববী অবস্থিত।",
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
 * A Bengali destination page exists only when its guide has a corresponding
 * Bengali override and the route group is not listed in DEFERRED_BN_GROUPS
 * (src/utils/localeRoutes.ts), because a bn-BD page with an English body is
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
        category: "Hajj & Umrah · ১২ মিনিট পড়া",
        searchQuery: "“DIY Umrah cost & Nusuk guide Bangladesh”",
        title: "বাংলাদেশ থেকে DIY ওমরাহ: ভিসার পথ, Nusuk ধাপ ও বাজেট যাচাই",
        excerpt:
          "ওমরাহের শর্তসাপেক্ষ ভিসার পথ, আবেদন ও পারমিটের ক্রম এবং পুরোনো বাজেটের সীমা। বর্তমান মোট পেতে নিজের কোট ব্যবহার করুন; হজ আলাদা প্রক্রিয়া।",
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
      category: "Religious Travel · 12 min",
      searchQuery: "“DIY Umrah cost & Nusuk guide Bangladesh”",
      title: "DIY Umrah from Bangladesh: Visa Routes, Nusuk Steps & Budget Checks",
      excerpt:
        "Conditional Umrah visa routes, application-to-permit steps and the limits of the historical budget. Use your own quotes for current totals; Hajj is a separate process.",
      slug: "umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
    },
    {
      id: "trend-endorsement",
      category: "Banking & FX · 7 min",
      searchQuery: "“How to get dual-currency card endorsement”",
      title: "How to Get Dual-Currency Card Endorsement (2026 Passport Dollar Quota Guide)",
      excerpt:
        "Step-by-step guide to the $18,000 annual passport endorsement quota (Bangladesh Bank FEPD-1 Circular No. 33), endorsement and card activation, the $300 online-payment rule, and RFCD vs. travel-quota cards.",
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

// Attractions hub — hand-written Bengali SERP copy for /attractions landing page.
BENGALI_ROUTE_SEO["/attractions"] = {
  title: "ইউরোপের আকর্ষণ ও স্কিপ-দ্য-লাইন টিকিট (Tiqets) | URAL",
  description: "প্যারিস, লন্ডন, রোম, মিলান, ভেনিস ও নিউ ইয়র্কে লাইনে না দাঁড়িয়ে টিকিট পান Tiqets পাসের মাধ্যমে। লুভর, আইফেল টাওয়ার, কলোজিয়াম, ডুয়োমো ও আরও ৫৯টি আকর্ষণ ৯টি ইউরোপিয়ন শহরে।",
  h1: "ইউরোপের আকর্ষণ ও টিকিট পাস (Tiqets)",
};

// Attraction detail pages — one Bengali URL per attraction, using the curated
// Bengali title (titleBn) and the city's Bengali name (cityNameBn).
for (const attraction of TIQETS_TOP_ATTRACTIONS) {
  const cityStack = TIQETS_CITY_STACKS.find((c) => c.cityId === attraction.cityId);
  if (!cityStack) continue;
  const routePath = `/attractions/${attraction.cityId}:${attraction.productId}`;
  BENGALI_ROUTE_SEO[routePath] = {
    title: `${attraction.titleBn} — টিকিট ও পাস | URAL`,
    description: `${attraction.titleBn} — ${cityStack.cityNameBn}-এ স্কিপ-দ্য-লাইন টিকেট ও Tiqets পাস। বাংলাদেশী ভ্রমণকারীদের জন্য দ্রুত বুকিং করুন।`,
    h1: `${attraction.titleBn} — টিকিট ও পাস`,
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
