/**
 * The few /partners strings the app shell needs on every page: the address,
 * the menu label and the SEO title. Kept apart from partnersCopy.ts so the
 * copy (and its many strings) stay in the route chunk and out of the eager
 * bundle. Import nothing here.
 */
export const PARTNERS_PATH = "/partners";

export const PARTNERS_META = {
  en: {
    seoTitle: "The Partners Behind the Booking Links | URAL",
    seoDescription:
      "Who URAL links to, and why: a flight search engine, hotel collections, tours, eSIMs, transfers, storage and compensation. Marked links, partner-set prices, and where each appears on this site.",
    breadcrumb: "Partners",
    navLabel: "Our Partners",
    navSub: "The partners behind the booking links",
  },
  bn: {
    seoTitle: "বুকিং লিংকের পেছনের পার্টনাররা | URAL",
    seoDescription:
      "URAL কাদের লিংক করে, এবং কেন: একটি ফ্লাইট সার্চ ইঞ্জিন, হোটেল কালেকশন, ট্যুর, eSIM, ট্রান্সফার, স্টোরেজ ও ক্ষতিপূরণ সেবা। চিহ্নিত লিংক, পার্টনারের নিজের দাম, এবং কোনটি এই সাইটের কোথায় আছে।",
    breadcrumb: "পার্টনাররা",
    navLabel: "আমাদের পার্টনাররা",
    navSub: "বুকিং লিংকের পেছনের পার্টনাররা",
  },
} as const;
