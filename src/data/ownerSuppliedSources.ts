/**
 * Links the owner supplied and checked by hand, in addition to the links the
 * site's own guides cite. The registry in `officialSources.ts` merges them.
 *
 * Rules:
 * - The host must belong to an organisation named in `OFFICIAL_ORGANISATIONS`.
 * - `checked` is the date the owner last opened and confirmed the page.
 * - A link no guide cites needs `en`, `bn` and `sector`. A link a guide already
 *   cites keeps the guide's wording and only gains the checked date.
 * - Official PDFs are linked on the publisher's own site. They are never copied
 *   into `public/downloads`.
 *
 * Source sheets for the first batch (UK Hajj and Umrah, checked 16 November
 * 2026): `docs/02-content/sources/uk-hajj-umrah/`.
 */
import type { OfficialSourceSector } from "./officialSources";

export interface OwnerSuppliedSource {
  url: string;
  /** ISO date (YYYY-MM-DD) the owner last checked the page. */
  checked: string;
  en?: string;
  bn?: string;
  sector?: OfficialSourceSector;
  /** One plain line on what the page covers, from the owner's source sheets. Both languages or neither. */
  aboutEn?: string;
  aboutBn?: string;
  /** The page exists to hand over a PDF file, although its address does not end in .pdf. */
  pdf?: boolean;
}

const UK_HAJJ_UMRAH_CHECKED = "2026-11-16";

export const OWNER_SUPPLIED_SOURCES: readonly OwnerSuppliedSource[] = [
  // Not cited by a guide yet: title and section are given here.
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/safety-and-security", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Safety risks, local laws and emergency contacts.", aboutBn: "নিরাপত্তা ঝুঁকি, স্থানীয় আইন ও জরুরি যোগাযোগ।", en: "Saudi Arabia travel advice: safety and security", bn: "সৌদি আরব ভ্রমণ পরামর্শ: নিরাপত্তা", sector: "government" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/regional-risks", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Areas of Saudi Arabia with extra risk or travel limits.", aboutBn: "সৌদি আরবের যেসব এলাকায় বাড়তি ঝুঁকি বা ভ্রমণ-সীমা আছে।", en: "Saudi Arabia travel advice: regional risks", bn: "সৌদি আরব ভ্রমণ পরামর্শ: আঞ্চলিক ঝুঁকি", sector: "government" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/getting-help", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "UK consular and emergency help in Saudi Arabia.", aboutBn: "সৌদি আরবে যুক্তরাজ্যের কনস্যুলার ও জরুরি সহায়তা।", en: "Saudi Arabia travel advice: getting help", bn: "সৌদি আরব ভ্রমণ পরামর্শ: জরুরি সহায়তা", sector: "government" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/health", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Health checks before travel, medical care and insurance.", aboutBn: "ভ্রমণের আগের স্বাস্থ্য পরীক্ষা, চিকিৎসা সুবিধা ও বিমা।", en: "Saudi Arabia travel advice: health", bn: "সৌদি আরব ভ্রমণ পরামর্শ: স্বাস্থ্য", sector: "health" },
  { url: "https://www.gov.uk/world/travelling-to-saudi-arabia", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Starting point for all UK government guidance on Saudi Arabia.", aboutBn: "সৌদি আরব বিষয়ে যুক্তরাজ্য সরকারের সব নির্দেশনার শুরুর পাতা।", en: "Travelling to Saudi Arabia: all UK government guidance", bn: "সৌদি আরবে ভ্রমণ: যুক্তরাজ্য সরকারের সব নির্দেশনা", sector: "government" },
  { url: "https://www.gov.uk/guidance/foreign-travel-checklist", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Insurance, documents and destination checks before a trip.", aboutBn: "ভ্রমণের আগে বিমা, কাগজপত্র ও গন্তব্য যাচাইয়ের তালিকা।", en: "Foreign travel checklist", bn: "বিদেশ ভ্রমণের চেকলিস্ট", sector: "government" },
  { url: "https://www.gov.uk/guidance/foreign-travel-insurance", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "What travel insurance should cover, including medical care and repatriation.", aboutBn: "ভ্রমণ বিমায় কী থাকা উচিত, চিকিৎসা ও দেশে ফেরত আনাসহ।", en: "Foreign travel insurance", bn: "বিদেশ ভ্রমণ বিমা", sector: "consumer" },
  { url: "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Booking, delays, cancellations, refunds and package protection.", aboutBn: "বুকিং, বিলম্ব, বাতিল, রিফান্ড ও প্যাকেজ সুরক্ষা।", en: "Air passenger travel guide", bn: "বিমানযাত্রীর ভ্রমণ নির্দেশিকা", sector: "consumer" },
  { url: "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Short summary of rights on flights and package holidays.", aboutBn: "ফ্লাইট ও প্যাকেজ ভ্রমণে যাত্রীর অধিকারের সংক্ষিপ্তসার।", en: "Air passenger travel guide: summary of passenger rights", bn: "বিমানযাত্রীর ভ্রমণ নির্দেশিকা: যাত্রী অধিকারের সারসংক্ষেপ", sector: "consumer" },
  { url: "https://haj.gov.sa/en/Awareness-Center/Awareness-Guides/Hajj-Guide-Uk", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Rites, logistics and transport for Hajj pilgrims from the UK.", aboutBn: "যুক্তরাজ্যের হাজিদের জন্য হজের কাজ, ব্যবস্থাপনা ও যাতায়াত।", en: "Hajj handbook for UK pilgrims", bn: "যুক্তরাজ্যের হাজিদের জন্য হজ হ্যান্ডবুক", sector: "pilgrimage", pdf: true },
  { url: "https://haj.gov.sa/en/Awareness-Center/Awareness-Guides/Umrah-and-Visit-Guide", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Steps before travel, visas, permits, rites, movement and health.", aboutBn: "যাত্রার আগের ধাপ, ভিসা, পারমিট, ওমরাহর কাজ, চলাচল ও স্বাস্থ্য।", en: "Umrah and Visit Guide", bn: "ওমরাহ ও জিয়ারত গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/en/Umrah/Umrah-Requirements", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Requirements and travel preparation for Umrah, including luggage.", aboutBn: "ওমরাহর শর্ত ও ভ্রমণ প্রস্তুতি, লাগেজসহ।", en: "Umrah requirements", bn: "ওমরাহর শর্তাবলি", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/General-Hajj-Guide/en-hajj-guid.pdf", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Hajj rites, transport, group movement times and group-leader instructions.", aboutBn: "হজের কাজ, যাতায়াত, দলভিত্তিক চলাচলের সময় ও দলনেতার নির্দেশনা।", en: "General Hajj Guide", bn: "সাধারণ হজ গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/UMRAH-VISIT-GUIDE/English/EN-Umrah-Visit-Guide.pdf", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Visas, the Nusuk permit, transport and transit-visa information.", aboutBn: "ভিসা, Nusuk পারমিট, যাতায়াত ও ট্রানজিট ভিসার তথ্য।", en: "Umrah Visit Guide", bn: "ওমরাহ ভিজিট গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/Umrah-Guide/English/EN-Umrah-Guide.pdf", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Ihram, rites, permits, buses, taxis and the Haramain train.", aboutBn: "ইহরাম, ওমরাহর কাজ, পারমিট, বাস, ট্যাক্সি ও হারামাইন ট্রেন।", en: "Umrah Guide", bn: "ওমরাহ গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Invites-Pilgrims-to-Benefit-from-the-Umrah-and-Ziyarah-Guide", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Ministry notice introducing the multilingual Umrah and Ziyarah guide.", aboutBn: "বহুভাষিক ওমরাহ ও জিয়ারত গাইড নিয়ে মন্ত্রণালয়ের ঘোষণা।", en: "Announcement: Umrah and Ziyarah Guide for pilgrims (2026)", bn: "ঘোষণা: হাজিদের জন্য ওমরাহ ও জিয়ারত গাইড (২০২৬)", sector: "pilgrimage" },
  { url: "https://www.legislation.gov.uk/uksi/2018/634", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "The UK law on package travel contracts, information duties and remedies.", aboutBn: "প্যাকেজ ভ্রমণের চুক্তি, তথ্য দেওয়ার দায় ও প্রতিকার নিয়ে যুক্তরাজ্যের আইন।", en: "Package Travel and Linked Travel Arrangements Regulations 2018", bn: "Package Travel and Linked Travel Arrangements Regulations 2018 (প্যাকেজ ভ্রমণ আইন)", sector: "consumer" },
  { url: "https://www.caa.co.uk/consumers/booking-and-buying-a-holiday/air-travel-organisers-licensing-atol-scheme/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "What ATOL protects and how to check a company.", aboutBn: "ATOL কী সুরক্ষা দেয় এবং কোম্পানি কীভাবে যাচাই করবেন।", en: "Air Travel Organisers' Licensing (ATOL) scheme", bn: "Air Travel Organisers' Licensing (ATOL) স্কিম", sector: "consumer" },
  { url: "https://www.caa.co.uk/atol-protection/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Overview of ATOL financial protection.", aboutBn: "ATOL আর্থিক সুরক্ষার সারসংক্ষেপ।", en: "ATOL protection", bn: "ATOL সুরক্ষা", sector: "consumer" },
  { url: "https://www.caa.co.uk/atol-protection/check-an-atol/search-atol-holders/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Search tool to check whether a travel company holds an ATOL.", aboutBn: "কোনো ট্রাভেল কোম্পানির ATOL আছে কি না খোঁজার টুল।", en: "Search ATOL holders", bn: "ATOL হোল্ডার খুঁজুন", sector: "consumer" },
  { url: "https://www.caa.co.uk/media/vsznae3o/ors3-registeroffailedatolholders-2023-24.pdf", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Companies recorded as failed ATOL holders in that year.", aboutBn: "ওই বছরে ব্যর্থ হিসেবে নথিভুক্ত ATOL হোল্ডারদের তালিকা।", en: "Register of failed ATOL holders, 2023–24", bn: "ব্যর্থ ATOL হোল্ডারদের রেজিস্টার, ২০২৩–২৪", sector: "consumer" },
  { url: "https://www.caa.co.uk/media/ehlpsynj/21-october-2026-list-2.pdf", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Companies that no longer hold an ATOL from that date.", aboutBn: "ওই তারিখ থেকে যাদের আর ATOL নেই, তাদের তালিকা।", en: "ATOL holders not renewed at 1 October 2026", bn: "১ অক্টোবর ২০২৬-এ নবায়ন না হওয়া ATOL হোল্ডার", sector: "consumer" },
  { url: "https://travelhealthpro.org.uk/factsheets/hajj-and-umrah", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Vaccinations and health risks for Hajj and Umrah.", aboutBn: "হজ ও ওমরাহর টিকা ও স্বাস্থ্যঝুঁকি।", en: "Hajj and Umrah health factsheet", bn: "হজ ও ওমরাহ স্বাস্থ্য তথ্যপত্র", sector: "health" },
  { url: "https://cbhuk.org/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "UK community guidance, events and Hajj information.", aboutBn: "যুক্তরাজ্যের কমিউনিটি নির্দেশনা, আয়োজন ও হজের তথ্য।", en: "Main site", bn: "মূল সাইট", sector: "pilgrimage" },
  { url: "https://cbhuk.org/news/hajj-fraud/pilgrims-urged-to-use-official-channels-following-hajj-and-umrah-fraud-investigation/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Warning to use official Nusuk channels and avoid unauthorised sellers.", aboutBn: "অফিসিয়াল Nusuk চ্যানেল ব্যবহার ও অননুমোদিত বিক্রেতা এড়ানোর সতর্কবার্তা।", en: "Hajj and Umrah fraud: use official channels", bn: "হজ ও ওমরাহ প্রতারণা: অফিসিয়াল চ্যানেল ব্যবহার করুন", sector: "pilgrimage" },
  // Already cited by a guide: only the checked date is added.
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Safety, local laws, entry rules, health and regional risks.", aboutBn: "নিরাপত্তা, স্থানীয় আইন, প্রবেশের নিয়ম, স্বাস্থ্য ও আঞ্চলিক ঝুঁকি।" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/entry-requirements", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Visa routes, passport validity and entry documents for British travellers.", aboutBn: "ব্রিটিশ যাত্রীদের ভিসার পথ, পাসপোর্টের মেয়াদ ও প্রবেশের কাগজপত্র।" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/pilgrimage", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "UK advice on Hajj and Umrah: Nusuk booking, visas, vaccination and scams.", aboutBn: "হজ ও ওমরাহ নিয়ে যুক্তরাজ্যের পরামর্শ: Nusuk বুকিং, ভিসা, টিকা ও প্রতারণা।" },
  { url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "How to pick a date and time and get an Umrah permit through Nusuk.", aboutBn: "Nusuk-এ তারিখ ও সময় বেছে ওমরাহ পারমিট নেওয়ার ধাপ।" },
  { url: "https://haj.gov.sa/en/FAQ", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Ministry answers on Umrah visas and packages.", aboutBn: "ওমরাহ ভিসা ও প্যাকেজ নিয়ে মন্ত্রণালয়ের উত্তর।" },
  { url: "https://haj.gov.sa/en/umrah", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "What Umrah packages can include: accommodation, transport and visits.", aboutBn: "ওমরাহ প্যাকেজে কী থাকতে পারে: আবাসন, যাতায়াত ও পরিদর্শন।" },
  { url: "https://www.nusuk.sa/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Platform for Umrah permits and pilgrim services.", aboutBn: "ওমরাহ পারমিট ও হাজিদের সেবার প্ল্যাটফর্ম।" },
  { url: "https://visa.visitsaudi.com/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Saudi visa portal: eVisa eligibility, application and conditions.", aboutBn: "সৌদি ভিসা পোর্টাল: ই-ভিসার যোগ্যতা, আবেদন ও শর্ত।" },
  { url: "https://hajj.nusuk.sa/", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "Registration, package choice and booking for Hajj pilgrims from abroad.", aboutBn: "বিদেশি হাজিদের নিবন্ধন, প্যাকেজ বাছাই ও বুকিং।" },
  { url: "https://umrah.nusuk.sa/Journey", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "The steps and rites of Umrah, as the Ministry describes them.", aboutBn: "মন্ত্রণালয়ের বর্ণনায় ওমরাহর ধাপ ও কাজ।" },
  { url: "https://hajj.nusuk.sa/PackagesCategories", checked: UK_HAJJ_UMRAH_CHECKED, aboutEn: "How the Hajj package types differ in stay and transport.", aboutBn: "হজ প্যাকেজের ধরনগুলো থাকা ও যাতায়াতে কীভাবে আলাদা।" },
];
