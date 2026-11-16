/**
 * Lightweight, self-contained metadata for the four fixed featured blog cards
 * rendered on non-blog routes. Kept in its own small module so the eager entry
 * bundle does not pull in the full blog cover-image, cover-alt, or AEO-snippet
 * registries (or their scheduled-blog generated tables).
 *
 * `scripts/verify-build.ts` asserts byte-for-byte parity between every entry
 * below and `getBlogCoverImage`, `generateBlogCoverAltText`, and
 * `getBlogAeoSnippet50Words` in both English and Bengali.
 */
export interface FeaturedGrowthTopic {
  id: string;
  category: string;
  searchQuery: string;
  title: string;
  excerpt: string;
  slug: string;
}

export interface HomeFeaturedBlogCardMeta {
  coverImage: string;
  altEn: string;
  altBn: string;
  snippetEn: string;
  snippetBn: string;
}

export const ENGLISH_FEATURED_GROWTH_TOPICS: readonly FeaturedGrowthTopic[] = [
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

export const HOME_FEATURED_BLOG_META: Readonly<Record<string, HomeFeaturedBlogCardMeta>> = {
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    coverImage: "/assets/images/umrah_makkah_haram_guide_1790430007679-1200.webp",
    altEn: "Pilgrims circle the Kaaba beneath Makkah Clock Tower at dusk.",
    altBn: "গোধূলিতে মক্কা ক্লক টাওয়ারের নিচে কাবা ঘিরে তাওয়াফ করছেন মুসল্লিরা।",
    snippetEn:
      "Check your eligible Umrah visa route and season before paying. Complete biometrics when the application requests them, then check the issued visa before Nusuk visitor registration and separate permits. Package conditions vary. The ten-day/four-sharing BDT reference is historical, not a current quote or evidence of agency savings.",
    snippetBn:
      "টাকা দেওয়ার আগে প্রযোজ্য ওমরাহ ভিসার পথ ও মৌসুম দেখুন। আবেদনে চাইলে বায়োমেট্রিক দিন; এরপর ইস্যু হওয়া ভিসা মিলিয়ে Nusuk ভিজিটর নিবন্ধন ও আলাদা পারমিট নিন। Package-এর শর্ত আলাদা। ১০ দিন/চারজনের sharing-এর BDT reference পুরোনো, বর্তমান কোট বা agency saving-এর প্রমাণ নয়।",
  },
  "dual-currency-card-endorsement-bangladesh": {
    coverImage: "/assets/images/passport_card_travel_desk_1790430035290-1200.webp",
    altEn: "A passport, boarding passes, and payment card beside a compass on a stone table.",
    altBn: "পাথরের টেবিলে কম্পাসের পাশে রাখা পাসপোর্ট, বোর্ডিং পাস ও পেমেন্ট কার্ড।",
    snippetEn:
      "Since 6 September 2026, Bangladesh Bank allows up to USD 18,000 per calendar year in travel foreign exchange for an adult resident (FEPD-1 Circular No. 33), with at most USD 5,000 as dollar notes. Endorsement at an Authorized Dealer bank records the amount in your passport; you must also activate the card's foreign-currency and e-commerce part before it will pay online.",
    snippetBn:
      "৬ সেপ্টেম্বর ২০২৬ থেকে বাংলাদেশ ব্যাংক প্রাপ্তবয়স্ক বাসিন্দার ভ্রমণের জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000 বৈদেশিক মুদ্রা অনুমোদন করেছে (FEPD-1 Circular No. 33), যার মধ্যে ডলার নোট সর্বোচ্চ USD 5,000। Authorized Dealer ব্যাংকে endorsement পাসপোর্টে পরিমাণটি রেকর্ড করে; অনলাইনে পেমেন্টের আগে কার্ডের foreign-currency ও e-commerce অংশও চালু করতে হবে।",
  },
  "top-budget-family-destinations-from-dhaka": {
    coverImage: "/assets/images/kl_destination_1781544164707-1200.webp",
    altEn: "The Petronas Twin Towers rise over Kuala Lumpur at sunset.",
    altBn: "সূর্যাস্তে কুয়ালালামপুরের আকাশে মাথা তুলে দাঁড়িয়ে পেট্রোনাস টুইন টাওয়ার।",
    snippetEn:
      "The top 6 budget-friendly international family destinations from Dhaka for 2026 ranked by 5-day per-person BDT cost are: 1. Nepal (from BDT 42,000, free VOA), 2. Malaysia (from BDT 68,000, online e-Visa), 3. Thailand (from BDT 72,000), 4. Maldives local islands (from BDT 75,000), 5. Singapore, and 6. Dubai.",
    snippetBn:
      "ঢাকা থেকে ২০২৬ সালে পরিবার নিয়ে ভ্রমণের শীর্ষ ৬টি বাজেট-বান্ধব দেশ (৫ দিনের জনপ্রতি খরচ অনুযায়ী): ১. নেপাল (৪২,০০০ টাকা, ফ্রি ভিসা), ২. মালয়েশিয়া (৬৮,০০০ টাকা, অনলাইন ই-ভিসা), ৩. থাইল্যান্ড (৭২,০০০ টাকা), ৪. মালদ্বীপ মাফুশি (৭৫,০০০ টাকা), ৫. সিঙ্গাপুর এবং ৬. দুবাই।",
  },
  "dhaka-airport-outbound-immigration-checklist-noc-go": {
    coverImage: "/assets/images/ural_hero_bg_1781543111624-1200.webp",
    altEn: "A passenger jet flies above a sea of clouds in warm golden light.",
    altBn: "উষ্ণ সোনালি আলোয় মেঘের সমুদ্রের ওপরে উড়ছে একটি যাত্রীবাহী বিমান।",
    snippetEn:
      "Clear Dhaka Airport (DAC) outbound emigration in under 2 minutes by carrying 5 printed documents in your cabin folder: a 6-month valid passport (with old passports), printed visa or arrival QR code, confirmed return air ticket, paid hotel voucher, passport dollar endorsement, and your Job NOC, GO, or Trade License.",
    snippetBn:
      "ঢাকা বিমানবন্দরে (DAC) মাত্র ২ মিনিটে ইমিগ্রেশন সম্পন্ন করতে হাতের ফাইলে ৫টি প্রিন্টেড কাগজ রাখুন: ৬ মাসের মেয়াদসহ পাসপোর্ট (পুরাতন পাসপোর্টসহ), ভিসা বা Arrival QR প্রিন্ট, রিটার্ন এয়ার টিকিট, হোটেল ভাউচার, ডলার এনডোর্সমেন্ট এবং পেশাগত NOC, GO অথবা ট্রেড লাইসেন্স।",
  },
};
