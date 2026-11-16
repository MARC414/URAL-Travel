/**
 * Wording for `/glossary`. The React view and the prerender read this file;
 * the app shell reads only glossaryMeta.ts. Bengali is written by hand.
 */
import { GLOSSARY_META, GLOSSARY_PATH } from "./glossaryMeta";

export { GLOSSARY_META, GLOSSARY_PATH };

export const GLOSSARY_COPY = {
  en: {
    ...GLOSSARY_META.en,
    h1: "Hajj, Umrah and Travel Terms in Plain Words",
    intro: "What each word means, with the URAL guide and the official page behind it.",
    statTerms: "terms",
    statTopics: "topics",
    searchLabel: "Find a term",
    searchPlaceholder: "For example: Miqat, endorsement, PNR",
    allTopics: "All",
    topicsLabel: "Topics",
    resultCount: "{count} terms",
    alsoWritten: "Also",
    guideLink: "URAL guide",
    sourceLink: "Official source",
    opensNewTab: "opens in a new tab",
    empty: "No term matches. Try another spelling.",
    clear: "Clear search",
    note: "A definition says what a word means. For a religious ruling, ask a qualified scholar. For a rule, a date or a fee, read the official page.",
    resourcesCta: "All official sources",
  },
  bn: {
    ...GLOSSARY_META.bn,
    h1: "হজ, ওমরাহ, ভিসা ও ফ্লাইটের শব্দকোষ",
    intro: "প্রতিটি শব্দের অর্থ, সঙ্গে URAL গাইড ও সংশ্লিষ্ট অফিসিয়াল পেজ।",
    statTerms: "শব্দ",
    statTopics: "বিষয়",
    searchLabel: "শব্দ খুঁজুন",
    searchPlaceholder: "যেমন: মিকাত, এনডোর্সমেন্ট, PNR",
    allTopics: "সব",
    topicsLabel: "বিষয়",
    resultCount: "{count}টি শব্দ",
    alsoWritten: "অন্য নাম",
    guideLink: "URAL গাইড",
    sourceLink: "অফিসিয়াল সূত্র",
    opensNewTab: "নতুন ট্যাবে খুলবে",
    empty: "কোনো শব্দ মেলেনি। অন্য বানানে চেষ্টা করুন।",
    clear: "খোঁজা মুছুন",
    note: "সংজ্ঞা শুধু শব্দের অর্থ বলে। ধর্মীয় মাসআলার জন্য যোগ্য আলেমকে জিজ্ঞাসা করুন। নিয়ম, তারিখ বা ফি জানতে অফিসিয়াল পেজ পড়ুন।",
    resourcesCta: "সব অফিসিয়াল সূত্র",
  },
} as const;

export type GlossaryLocale = keyof typeof GLOSSARY_COPY;

export function glossaryGroupSectionId(groupId: string): string {
  return `glossary-${groupId}`;
}

/** Anchor of one term, so a guide can link straight to it: /glossary#term-miqat */
export function glossaryTermAnchor(termId: string): string {
  return `term-${termId}`;
}

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

export function formatGlossaryCount(value: number, locale: GlossaryLocale): string {
  const text = String(Math.trunc(value));
  return locale === "bn" ? text.replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)]) : text;
}
