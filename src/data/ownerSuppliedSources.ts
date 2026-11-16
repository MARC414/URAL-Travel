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
  /** The page exists to hand over a PDF file, although its address does not end in .pdf. */
  pdf?: boolean;
}

const UK_HAJJ_UMRAH_CHECKED = "2026-11-16";

export const OWNER_SUPPLIED_SOURCES: readonly OwnerSuppliedSource[] = [
  // Not cited by a guide yet: title and section are given here.
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/safety-and-security", checked: UK_HAJJ_UMRAH_CHECKED, en: "Saudi Arabia travel advice: safety and security", bn: "সৌদি আরব ভ্রমণ পরামর্শ: নিরাপত্তা", sector: "government" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/regional-risks", checked: UK_HAJJ_UMRAH_CHECKED, en: "Saudi Arabia travel advice: regional risks", bn: "সৌদি আরব ভ্রমণ পরামর্শ: আঞ্চলিক ঝুঁকি", sector: "government" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/getting-help", checked: UK_HAJJ_UMRAH_CHECKED, en: "Saudi Arabia travel advice: getting help", bn: "সৌদি আরব ভ্রমণ পরামর্শ: জরুরি সহায়তা", sector: "government" },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/health", checked: UK_HAJJ_UMRAH_CHECKED, en: "Saudi Arabia travel advice: health", bn: "সৌদি আরব ভ্রমণ পরামর্শ: স্বাস্থ্য", sector: "health" },
  { url: "https://www.gov.uk/world/travelling-to-saudi-arabia", checked: UK_HAJJ_UMRAH_CHECKED, en: "Travelling to Saudi Arabia: all UK government guidance", bn: "সৌদি আরবে ভ্রমণ: যুক্তরাজ্য সরকারের সব নির্দেশনা", sector: "government" },
  { url: "https://www.gov.uk/guidance/foreign-travel-checklist", checked: UK_HAJJ_UMRAH_CHECKED, en: "Foreign travel checklist", bn: "বিদেশ ভ্রমণের চেকলিস্ট", sector: "government" },
  { url: "https://www.gov.uk/guidance/foreign-travel-insurance", checked: UK_HAJJ_UMRAH_CHECKED, en: "Foreign travel insurance", bn: "বিদেশ ভ্রমণ বিমা", sector: "consumer" },
  { url: "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide", checked: UK_HAJJ_UMRAH_CHECKED, en: "Air passenger travel guide", bn: "বিমানযাত্রীর ভ্রমণ নির্দেশিকা", sector: "consumer" },
  { url: "https://www.gov.uk/government/publications/air-passenger-travel-guide/air-passenger-travel-guide-summary-of-passenger-rights", checked: UK_HAJJ_UMRAH_CHECKED, en: "Air passenger travel guide: summary of passenger rights", bn: "বিমানযাত্রীর ভ্রমণ নির্দেশিকা: যাত্রী অধিকারের সারসংক্ষেপ", sector: "consumer" },
  { url: "https://haj.gov.sa/en/Awareness-Center/Awareness-Guides/Hajj-Guide-Uk", checked: UK_HAJJ_UMRAH_CHECKED, en: "Hajj handbook for UK pilgrims", bn: "যুক্তরাজ্যের হাজিদের জন্য হজ হ্যান্ডবুক", sector: "pilgrimage", pdf: true },
  { url: "https://haj.gov.sa/en/Awareness-Center/Awareness-Guides/Umrah-and-Visit-Guide", checked: UK_HAJJ_UMRAH_CHECKED, en: "Umrah and Visit Guide", bn: "ওমরাহ ও জিয়ারত গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/en/Umrah/Umrah-Requirements", checked: UK_HAJJ_UMRAH_CHECKED, en: "Umrah requirements", bn: "ওমরাহর শর্তাবলি", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/General-Hajj-Guide/en-hajj-guid.pdf", checked: UK_HAJJ_UMRAH_CHECKED, en: "General Hajj Guide", bn: "সাধারণ হজ গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/UMRAH-VISIT-GUIDE/English/EN-Umrah-Visit-Guide.pdf", checked: UK_HAJJ_UMRAH_CHECKED, en: "Umrah Visit Guide", bn: "ওমরাহ ভিজিট গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/-/media/Project/HAJJ/PDF-and-FILES/Awareness-Guides/Umrah-Guide/English/EN-Umrah-Guide.pdf", checked: UK_HAJJ_UMRAH_CHECKED, en: "Umrah Guide", bn: "ওমরাহ গাইড", sector: "pilgrimage" },
  { url: "https://haj.gov.sa/en/Media-Center/Ministry-News/2026/Ministry-of-Hajj-and-Umrah-Invites-Pilgrims-to-Benefit-from-the-Umrah-and-Ziyarah-Guide", checked: UK_HAJJ_UMRAH_CHECKED, en: "Announcement: Umrah and Ziyarah Guide for pilgrims (2026)", bn: "ঘোষণা: হাজিদের জন্য ওমরাহ ও জিয়ারত গাইড (২০২৬)", sector: "pilgrimage" },
  { url: "https://www.legislation.gov.uk/uksi/2018/634", checked: UK_HAJJ_UMRAH_CHECKED, en: "Package Travel and Linked Travel Arrangements Regulations 2018", bn: "Package Travel and Linked Travel Arrangements Regulations 2018 (প্যাকেজ ভ্রমণ আইন)", sector: "consumer" },
  { url: "https://www.caa.co.uk/consumers/booking-and-buying-a-holiday/air-travel-organisers-licensing-atol-scheme/", checked: UK_HAJJ_UMRAH_CHECKED, en: "Air Travel Organisers' Licensing (ATOL) scheme", bn: "Air Travel Organisers' Licensing (ATOL) স্কিম", sector: "consumer" },
  { url: "https://www.caa.co.uk/atol-protection/", checked: UK_HAJJ_UMRAH_CHECKED, en: "ATOL protection", bn: "ATOL সুরক্ষা", sector: "consumer" },
  { url: "https://www.caa.co.uk/atol-protection/check-an-atol/search-atol-holders/", checked: UK_HAJJ_UMRAH_CHECKED, en: "Search ATOL holders", bn: "ATOL হোল্ডার খুঁজুন", sector: "consumer" },
  { url: "https://www.caa.co.uk/media/vsznae3o/ors3-registeroffailedatolholders-2023-24.pdf", checked: UK_HAJJ_UMRAH_CHECKED, en: "Register of failed ATOL holders, 2023–24", bn: "ব্যর্থ ATOL হোল্ডারদের রেজিস্টার, ২০২৩–২৪", sector: "consumer" },
  { url: "https://www.caa.co.uk/media/ehlpsynj/21-october-2026-list-2.pdf", checked: UK_HAJJ_UMRAH_CHECKED, en: "ATOL holders not renewed at 1 October 2026", bn: "১ অক্টোবর ২০২৬-এ নবায়ন না হওয়া ATOL হোল্ডার", sector: "consumer" },
  { url: "https://travelhealthpro.org.uk/factsheets/hajj-and-umrah", checked: UK_HAJJ_UMRAH_CHECKED, en: "Hajj and Umrah health factsheet", bn: "হজ ও ওমরাহ স্বাস্থ্য তথ্যপত্র", sector: "health" },
  { url: "https://cbhuk.org/", checked: UK_HAJJ_UMRAH_CHECKED, en: "Main site", bn: "মূল সাইট", sector: "pilgrimage" },
  { url: "https://cbhuk.org/news/hajj-fraud/pilgrims-urged-to-use-official-channels-following-hajj-and-umrah-fraud-investigation/", checked: UK_HAJJ_UMRAH_CHECKED, en: "Hajj and Umrah fraud: use official channels", bn: "হজ ও ওমরাহ প্রতারণা: অফিসিয়াল চ্যানেল ব্যবহার করুন", sector: "pilgrimage" },
  // Already cited by a guide: only the checked date is added.
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/entry-requirements", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/pilgrimage", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://haj.gov.sa/en/E-Services/Umrah-Permit-Application", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://haj.gov.sa/en/FAQ", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://haj.gov.sa/en/umrah", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://www.nusuk.sa/", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://visa.visitsaudi.com/", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://hajj.nusuk.sa/", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://umrah.nusuk.sa/Journey", checked: UK_HAJJ_UMRAH_CHECKED },
  { url: "https://hajj.nusuk.sa/PackagesCategories", checked: UK_HAJJ_UMRAH_CHECKED },
];
