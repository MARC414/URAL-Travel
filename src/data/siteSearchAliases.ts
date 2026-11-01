/**
 * Real query phrasing observed in Search Console, attached only to the existing
 * page that owns that intent. These are search synonyms, not new SEO pages.
 */
export const SITE_SEARCH_ALIASES: Readonly<Record<string, { en: string[]; bn: string[] }>> = {
  "/visa-free-countries": {
    en: [
      "Bangladesh passport visa free countries",
      "which countries can Bangladeshi passport travel without visa 2026",
      "no visa required for Bangladeshi",
      "visa free destinations from Bangladesh",
    ],
    bn: [
      "বাংলাদেশের পাসপোর্ট দিয়ে ভিসা ছাড়া কোন কোন দেশে যাওয়া যায় ২০২৬",
      "বাংলাদেশ থেকে ভিসা ছাড়া কোন কোন দেশে যাওয়া যায়",
      "বাংলাদেশি পাসপোর্ট ভিসা ছাড়া দেশ",
    ],
  },
  "/flights/dhaka-kathmandu": {
    en: [
      "dhaka to kathmandu flight",
      "dhaka to kathmandu flights",
      "kathmandu to dhaka flight",
      "dhaka to kathmundu flight",
      "dhaka to ktm flight",
      "dac to ktm",
      "ktm to dac",
    ],
    bn: ["ঢাকা থেকে কাঠমান্ডু ফ্লাইট", "কাঠমান্ডু থেকে ঢাকা ফ্লাইট"],
  },
  "/flights/dhaka-dubai": {
    en: [
      "dhaka to dubai flight",
      "dhaka to dubai air ticket price",
      "flights from bangladesh to dubai",
      "dac to dxb flight",
      "dac to dxb",
    ],
    bn: ["ঢাকা থেকে দুবাই ফ্লাইট", "বাংলাদেশ থেকে দুবাই বিমান ভাড়া"],
  },
  "/flights/dhaka-maldives": {
    en: [
      "dhaka to male flight",
      "dhaka to malé flight",
      "dhaka to maldives flight",
      "bangladesh to maldives flight",
      "dac to mle",
    ],
    bn: ["ঢাকা থেকে মালদ্বীপ ফ্লাইট", "ঢাকা থেকে মালে ফ্লাইট"],
  },
  "/flights/dhaka-kuala-lumpur": {
    en: [
      "dhaka to kuala lumpur flights",
      "flight dhaka to kuala lumpur",
      "dhaka to kl flight",
      "dac to kul flight",
    ],
    bn: ["ঢাকা থেকে কুয়ালালামপুর ফ্লাইট", "ঢাকা থেকে মালয়েশিয়া ফ্লাইট"],
  },
  "/flights/dhaka-singapore": {
    en: [
      "dhaka to singapore flight",
      "flight from dhaka to singapore",
      "dhaka to singapore flight time",
      "dhaka to singapore air ticket price",
    ],
    bn: ["ঢাকা থেকে সিঙ্গাপুর ফ্লাইট", "ঢাকা সিঙ্গাপুর বিমান ভাড়া"],
  },
  "/hotels/dubai-hotels": {
    en: [
      "dubai hotel",
      "dubai hotels",
      "hotels in dubai",
      "hotel dubai",
      "hotels to stay in dubai",
      "where to stay in dubai",
    ],
    bn: ["দুবাই হোটেল", "দুবাইতে কোথায় থাকবেন", "দুবাইয়ে থাকার হোটেল এলাকা"],
  },
  "/hotels/bangkok-hotels": {
    en: [
      "where to stay in bangkok",
      "where to stay in bangkok thailand",
      "best area to stay in bangkok thailand",
      "best place to stay in bangkok",
    ],
    bn: ["ব্যাংককে কোথায় থাকবেন", "ব্যাংকক হোটেল এলাকা"],
  },
  "/costs/nepal-costs": {
    en: ["nepal trip cost from bangladesh", "nepal travel cost"],
    bn: ["নেপাল ভ্রমণ খরচ", "বাংলাদেশ থেকে নেপাল ভ্রমণ খরচ"],
  },
  "/visa/dubai-visa": {
    en: ["uae visit visa for bangladeshi", "dubai tourist visa for bangladeshi", "dubai visa bangladesh"],
    bn: ["বাংলাদেশি নাগরিকদের সংযুক্ত আরব আমিরাত ভিজিট ভিসা", "বাংলাদেশ থেকে দুবাই ভিসা"],
  },
};
