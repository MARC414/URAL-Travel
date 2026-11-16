/**
 * The few /resources strings the app shell needs on every page: the address,
 * the menu label and the SEO title. Kept apart from officialResourcesCopy.ts so
 * the page's long wording stays in the route chunk and out of the eager bundle
 * (verify:build holds that bundle to a size budget).
 */
export const OFFICIAL_RESOURCES_PATH = "/resources";

export const OFFICIAL_RESOURCES_META = {
  en: {
    seoTitle: "Official Travel Sources: Visa, Hajj & Airline Sites | URAL",
    seoDescription:
      "The official websites URAL cites in one directory: government visa portals, Umrah and Hajj authorities, airlines, airports and regulators, by country.",
    breadcrumb: "Official Sources",
    navLabel: "Official Sources Directory",
    navSub: "Government, visa, Hajj & airline sites",
  },
  bn: {
    seoTitle: "সরকারি ভ্রমণ সূত্র: ভিসা, হজ ও এয়ারলাইনের অফিসিয়াল সাইট | URAL",
    seoDescription:
      "URAL যেসব অফিসিয়াল ওয়েবসাইট সূত্র হিসেবে ব্যবহার করে তার তালিকা: সরকারি ভিসা পোর্টাল, ওমরাহ ও হজ কর্তৃপক্ষ, এয়ারলাইন ও বিমানবন্দর — দেশ অনুযায়ী সাজানো।",
    breadcrumb: "সরকারি সূত্র",
    navLabel: "সরকারি সূত্রের তালিকা",
    navSub: "সরকার, ভিসা, হজ ও এয়ারলাইনের সাইট",
  },
} as const;
