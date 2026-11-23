import type { Language } from "../translations";

interface HomePositioning {
  h1Lines: readonly [string, string];
  subtitle: string;
  title: string;
  description: string;
  features: readonly string[];
  bangladeshLinkLabel: string;
}

const HOME_POSITIONING: Record<Language, HomePositioning> = {
  en: {
    h1Lines: ["Plan Your Trip", "From Anywhere"],
    subtitle: "Source-backed travel guides, global flight search and practical next steps for your passport and departure.",
    title: "Travel Intelligence: Global Flights, Hotels & eVisas | URAL",
    description: "Plan your trip with source-backed travel guides, global flight search, hotel handoffs and passport-specific entry checks. Explore Bangladesh departure expertise.",
    features: ["Source-backed guides", "Global flight search", "Display currency choice", "Bangladesh departure expertise"],
    bangladeshLinkLabel: "Travelling from Bangladesh? Start here",
  },
  bn: {
    h1Lines: ["যেকোনো স্থান থেকে ভ্রমণ", "পরিকল্পনা করুন স্মার্টভাবে"],
    subtitle: "নির্ভরযোগ্য সূত্রভিত্তিক ভ্রমণ গাইড, বিশ্বজুড়ে ফ্লাইট খোঁজা এবং আপনার পাসপোর্ট ও যাত্রার স্থান অনুযায়ী পরবর্তী ধাপের ব্যবহারিক নির্দেশনা।",
    title: "ভ্রমণ পরিকল্পনা: বিশ্বজুড়ে ফ্লাইট, হোটেল ও eVisa | URAL",
    description: "সূত্রভিত্তিক ভ্রমণ গাইড, বিশ্বজুড়ে ফ্লাইট খোঁজা, হোটেল সেবাদাতার লিংক ও পাসপোর্ট অনুযায়ী প্রবেশের শর্ত যাচাই করে ভ্রমণ পরিকল্পনা করুন। বাংলাদেশ থেকে যাত্রার বিশেষ গাইডও রয়েছে।",
    features: ["সূত্রভিত্তিক গাইড", "বিশ্বজুড়ে ফ্লাইট খোঁজা", "দাম দেখার মুদ্রা বেছে নিন", "বাংলাদেশ থেকে যাত্রার বিশেষ গাইড"],
    bangladeshLinkLabel: "বাংলাদেশ থেকে যাচ্ছেন? শুরু করুন এখানে",
  },
};

export function getHomePositioning(lang: Language): HomePositioning {
  return HOME_POSITIONING[lang];
}
