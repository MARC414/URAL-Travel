/**
 * Wording for `/resources`, the official sources directory.
 *
 * The React view and the prerender read this file. The app shell and
 * seoCopy.ts read only officialResourcesMeta.ts (menu label, SEO title), so
 * this longer wording never enters the eager bundle.
 * Bengali is written by hand, never machine-translated (see AGENTS.md).
 */
import { OFFICIAL_RESOURCES_META, OFFICIAL_RESOURCES_PATH } from "./officialResourcesMeta";

export { OFFICIAL_RESOURCES_META, OFFICIAL_RESOURCES_PATH };

export const OFFICIAL_RESOURCES_COPY = {
  en: {
    ...OFFICIAL_RESOURCES_META.en,
    eyebrow: "Official sources directory",
    h1: "Official Travel Sources: Government, Visa, Hajj and Airline Websites",
    intro:
      "Every official website behind URAL's guides, in one place. Choose a topic or a country and go straight to the authority that decides the rule.",
    statLinks: "official links",
    statOrganisations: "organisations",
    statCountries: "countries and regions",
    quickLabel: "What counts as official here",
    quickBody:
      "This page lists only the official websites behind URAL's guides: government departments, official state portals, international bodies, and the airline, airport or transport operator's own site. Pick a topic or a country, then open the authority's own page to confirm the current rule.",
    findTitle: "Find an official site",
    searchLabel: "Search by name",
    searchPlaceholder: "For example: Nusuk, Thai embassy, baggage",
    countryLabel: "Country",
    allCountries: "All countries",
    kindLabel: "Type of site",
    allKinds: "All types",
    clear: "Clear filters",
    resultCount: "{links} links from {organisations} organisations",
    jumpLabel: "Jump to a topic",
    guideLink: "URAL guide",
    guideLinkLabel: "URAL guide that cites this source",
    opensNewTab: "opens in a new tab",
    historical: "Past announcement",
    pdf: "PDF",
    checked: "Checked {date}",
    audienceLabel: "Travelling from",
    journeyOpen: "Open the {count} steps",
    journeyStep: "Step {count}",
    savePdf: "Save as PDF",
    savePdfLabel: "Print or save as PDF",
    printedFrom: "uraltravel.co.uk/resources · printed {date}",
    downloadsTitle: "Guides to keep",
    downloadUral: "Download",
    downloadOfficial: "Open on {host}",
    uralMade: "Made by URAL",
    pageCount: "{count} pages",
    fileInEnglish: "In English",
    communityTitle: "Community bodies, not official",
    showMore: "Show {count} more",
    linkCount: "{count} links",
    empty: "No official site matches these filters. Clear the filters to see the full list.",
    howTitle: "How this list is built",
    how: [
      "A website is listed only when it belongs to the body that decides the rule or runs the service: a government department, an official state portal, an international organisation, or the airline, airport, rail or bus operator itself.",
      "News sites, travel agencies, booking platforms, blogs and encyclopaedias are not listed, even where a URAL guide quotes them. The one exception is the Saudi Press Agency, the state news agency that carries Saudi government announcements; its items are announcements, so read the date on the SPA page itself.",
      "Every link is cited by a URAL guide, or was opened and checked by URAL on the date shown under it. Use the “URAL guide” link beside a source to see how it is used.",
      "URAL does not control these websites. Rules, fees and page addresses change, so read the date on the official page itself before you pay or travel.",
    ],
    reportTitle: "Found a broken link or a missing official site?",
    reportBody:
      "Official portals move their pages without notice. Tell URAL which link failed, or which authority should be added, and it will be checked.",
    reportCta: "Report it to URAL",
  },
  bn: {
    ...OFFICIAL_RESOURCES_META.bn,
    eyebrow: "অফিসিয়াল সূত্রের তালিকা",
    h1: "সরকারি ভ্রমণ সূত্র: ভিসা, হজ ও এয়ারলাইনের অফিসিয়াল সাইট",
    intro:
      "URAL-এর গাইডগুলোর পেছনের সব অফিসিয়াল ওয়েবসাইট এক জায়গায়। বিষয় বা দেশ বেছে নিন, আর যে কর্তৃপক্ষ নিয়ম ঠিক করে তার সাইটে সরাসরি যান।",
    statLinks: "টি অফিসিয়াল লিংক",
    statOrganisations: "টি প্রতিষ্ঠান",
    statCountries: "টি দেশ ও অঞ্চল",
    quickLabel: "এখানে কোনগুলো অফিসিয়াল ধরা হয়েছে",
    quickBody:
      "এই পেজে শুধু URAL-এর গাইডগুলোর পেছনের অফিসিয়াল ওয়েবসাইট আছে: সরকারি দপ্তর, রাষ্ট্রীয় অফিসিয়াল পোর্টাল, আন্তর্জাতিক সংস্থা, এবং এয়ারলাইন, বিমানবন্দর বা পরিবহন অপারেটরের নিজস্ব সাইট। বিষয় বা দেশ বেছে নিন, তারপর বর্তমান নিয়ম নিশ্চিত করতে কর্তৃপক্ষের নিজের পেজটি খুলুন।",
    findTitle: "অফিসিয়াল সাইট খুঁজুন",
    searchLabel: "নাম দিয়ে খুঁজুন",
    searchPlaceholder: "যেমন: Nusuk, থাই দূতাবাস, ব্যাগেজ",
    countryLabel: "দেশ",
    allCountries: "সব দেশ",
    kindLabel: "সাইটের ধরন",
    allKinds: "সব ধরন",
    clear: "ফিল্টার মুছুন",
    resultCount: "{organisations}টি প্রতিষ্ঠানের {links}টি লিংক",
    jumpLabel: "বিষয় অনুযায়ী যান",
    guideLink: "URAL গাইড",
    guideLinkLabel: "এই সূত্র ব্যবহার করা URAL গাইড",
    opensNewTab: "নতুন ট্যাবে খুলবে",
    historical: "পুরোনো ঘোষণা",
    pdf: "PDF",
    checked: "যাচাই {date}",
    audienceLabel: "যেখান থেকে যাত্রা",
    journeyOpen: "{count}টি ধাপ দেখুন",
    journeyStep: "ধাপ {count}",
    savePdf: "PDF সংরক্ষণ",
    savePdfLabel: "প্রিন্ট করুন বা PDF হিসেবে সংরক্ষণ করুন",
    printedFrom: "uraltravel.co.uk/bn/resources · প্রিন্ট {date}",
    downloadsTitle: "রেখে দেওয়ার মতো গাইড",
    downloadUral: "ডাউনলোড",
    downloadOfficial: "{host}-এ খুলুন",
    uralMade: "URAL-এর তৈরি",
    pageCount: "{count} পৃষ্ঠা",
    fileInEnglish: "ইংরেজিতে",
    communityTitle: "কমিউনিটি সংস্থা, অফিসিয়াল নয়",
    showMore: "আরও {count}টি দেখুন",
    linkCount: "{count}টি লিংক",
    empty: "এই ফিল্টারের সঙ্গে কোনো অফিসিয়াল সাইট মেলেনি। পুরো তালিকা দেখতে ফিল্টার মুছুন।",
    howTitle: "এই তালিকা যেভাবে তৈরি",
    how: [
      "শুধু সেই ওয়েবসাইটই তালিকায় আছে, যা নিয়ম ঠিক করা বা সেবা পরিচালনা করা প্রতিষ্ঠানের নিজস্ব: সরকারি দপ্তর, রাষ্ট্রীয় অফিসিয়াল পোর্টাল, আন্তর্জাতিক সংস্থা, অথবা এয়ারলাইন, বিমানবন্দর, রেল বা বাস অপারেটর নিজে।",
      "সংবাদমাধ্যম, ট্রাভেল এজেন্সি, বুকিং প্ল্যাটফর্ম, ব্লগ ও বিশ্বকোষ এখানে নেই, যদিও URAL-এর কোনো গাইডে সেগুলোর উদ্ধৃতি থাকতে পারে। একমাত্র ব্যতিক্রম সৌদি প্রেস এজেন্সি — সৌদি সরকারের ঘোষণা প্রকাশকারী রাষ্ট্রীয় সংবাদ সংস্থা; এর লিংকগুলো ঘোষণা, তাই SPA-র পেজে দেওয়া তারিখটি দেখে নিন।",
      "প্রতিটি লিংক URAL-এর কোনো গাইডে উদ্ধৃত, অথবা লিংকের নিচে লেখা তারিখে URAL নিজে খুলে যাচাই করেছে। সূত্রটি কীভাবে ব্যবহার হয়েছে দেখতে পাশের “URAL গাইড” লিংকে যান।",
      "এই ওয়েবসাইটগুলো URAL নিয়ন্ত্রণ করে না। নিয়ম, ফি ও পেজের ঠিকানা বদলায়, তাই টাকা দেওয়া বা যাত্রার আগে অফিসিয়াল পেজের তারিখ নিজে দেখে নিন।",
    ],
    reportTitle: "কোনো লিংক কাজ করছে না, বা কোনো অফিসিয়াল সাইট বাদ পড়েছে?",
    reportBody:
      "অফিসিয়াল পোর্টালগুলো আগাম না জানিয়েই পেজের ঠিকানা বদলায়। কোন লিংক খুলছে না বা কোন কর্তৃপক্ষ যোগ করা দরকার, URAL-কে জানান; যাচাই করে দেখা হবে।",
    reportCta: "URAL-কে জানান",
  },
} as const;

export type OfficialResourcesLocale = keyof typeof OFFICIAL_RESOURCES_COPY;

export function officialSourceSectionId(sectorId: string): string {
  return `sources-${sectorId}`;
}

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

/** 180 -> "180" in English, "১৮০" in Bengali. Deterministic in Node and the browser. */
export function formatResourceCount(value: number, locale: OfficialResourcesLocale): string {
  const text = String(Math.trunc(value));
  return locale === "bn" ? text.replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]) : text;
}

/** Replaces `{name}` placeholders with formatted counts. */
export function fillResourceCopy(
  template: string,
  values: Record<string, number>,
  locale: OfficialResourcesLocale
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? formatResourceCount(values[key], locale) : match
  );
}

/** Cards with more links than this fold the rest behind "Show more". */
export const OFFICIAL_RESOURCES_VISIBLE_LINKS = 5;

const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  bn: ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"],
} as const;

/** "2026-11-16" -> "16 Nov 2026" / "১৬ নভেম্বর ২০২৬". No Date object, so no time-zone drift. */
export function formatResourceDate(isoDate: string, locale: OfficialResourcesLocale): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const monthName = MONTHS[locale][month - 1] ?? "";
  return `${formatResourceCount(day, locale)} ${monthName} ${formatResourceCount(year, locale)}`;
}

/**
 * The quiet facts shown under a link title, in display order: past
 * announcement, PDF, and the date the owner checked the page. Shared by the
 * React view and the prerender so the two can never disagree.
 */
export function officialSourceMeta(
  source: { historical: boolean; pdf: boolean; checked?: string },
  locale: OfficialResourcesLocale
): string[] {
  const copy = OFFICIAL_RESOURCES_COPY[locale];
  const parts: string[] = [];
  if (source.historical) parts.push(copy.historical);
  if (source.pdf) parts.push(copy.pdf);
  if (source.checked) parts.push(copy.checked.replace("{date}", formatResourceDate(source.checked, locale)));
  return parts;
}

/** Id of the section that holds the downloads, used by the jump links. */
export const OFFICIAL_DOWNLOADS_SECTION_ID = "sources-downloads";
/** Id of the section that holds community bodies. */
export const OFFICIAL_COMMUNITY_SECTION_ID = "sources-community";
