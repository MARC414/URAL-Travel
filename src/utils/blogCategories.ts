/**
 * Blog listing category taxonomy — single source of truth.
 *
 * The `/blog` grid ships a fixed set of filter tabs, while individual articles
 * carry their own `category` string (which is localised: English posts use
 * English labels and Bengali posts use Bengali labels). Those two lists drifted
 * apart once already: an article was published as "Affiliate marketing" but no
 * tab matched that value, so the only way to reach it was "All Guides". The
 * pairing below is therefore shared by the listing UI *and* by
 * `scripts/verify-build.ts`, which asserts that every published post in both
 * locales is reachable through a named filter.
 */

export type BlogCategoryTab = {
  /** Stable filter id. Never localised — state and lookups key off it. */
  id: string;
  labelEn: string;
  labelBn: string;
};

export const BLOG_CATEGORY_TABS: readonly BlogCategoryTab[] = [
  { id: "all", labelEn: "All Guides", labelBn: "সব গাইড" },
  { id: "Hajj & Umrah", labelEn: "Hajj & Umrah", labelBn: "হজ্জ ও ওমরাহ" },
  {
    id: "Ziyarah & Stopovers",
    labelEn: "Ziyarah & Stopovers",
    labelBn: "জিয়ারত ও স্টপওভার",
  },
  {
    id: "Visa & Immigration",
    labelEn: "Visa & Immigration",
    labelBn: "ভিসা ও ইমিগ্রেশন",
  },
  {
    id: "Banking & Payments",
    labelEn: "Card Endorsement & BDT",
    labelBn: "ডুয়াল-কারেন্সি কার্ড ও BDT",
  },
  {
    id: "Family & Budget",
    labelEn: "Family & Budget Trips",
    labelBn: "ফ্যামিলি ও বাজেট ট্রিপ",
  },
  {
    id: "Travel Creator Economy",
    labelEn: "Travel Creator Economy",
    labelBn: "ট্রাভেল ক্রিয়েটর ইকোনমি",
  },
  {
    id: "Flights, Hotels & Food",
    labelEn: "Flights, Hotels & Halal Food",
    labelBn: "ফ্লাইট, হোটেল ও হালাল খাবার",
  },
  { id: "Travel Tips", labelEn: "Travel Tips", labelBn: "ট্রাভেল টিপস" },
];

/** Filter id → every post category label (both locales) that the tab groups in. */
export const BLOG_CATEGORY_GROUPINGS: Readonly<Record<string, readonly string[]>> = {
  "Flights, Hotels & Food": [
    "Cheap Flight Tips",
    "Hotel Savings",
    "Food & Culture",
    "এয়ারলাইন্স ও লাগেজ",
  ],
  "Travel Creator Economy": [
    "Travel Creator Economy",
    "ট্রাভেল ক্রিয়েটর ইকোনমি",
    // Legacy label still present in archived drafts; keeps any such post reachable.
    "Affiliate marketing",
    "অ্যাফিলিয়েট মার্কেটিং",
  ],
  "Travel Tips": [
    "Travel Tips",
    "Travel Deals & Intelligence",
    "ট্রাভেল ডিল ও ইন্টেলিজেন্স",
    "ভ্রমণ টিপস",
  ],
};

/** True when a post's category is shown under the given filter tab. */
export function matchesBlogCategoryFilter(
  postCategory: string,
  filterId: string,
): boolean {
  if (filterId === "all") return true;
  const grouped = BLOG_CATEGORY_GROUPINGS[filterId];
  if (grouped) return grouped.includes(postCategory);
  return postCategory === filterId;
}

/** Named (non-"all") tabs a post category appears under. Empty means unreachable. */
export function blogCategoryFilterIds(postCategory: string): string[] {
  return BLOG_CATEGORY_TABS.filter(
    (tab) => tab.id !== "all" && matchesBlogCategoryFilter(postCategory, tab.id),
  ).map((tab) => tab.id);
}
