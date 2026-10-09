export interface AuthorProfile {
  /** Canonical author name used in URAL article bylines. */
  name: string;
  /** Public professional portfolio supplied as the author's source material. */
  portfolioUrl: string;
  /** GitHub profile associated with the supplied portfolio repository. */
  sameAs: string[];
  bioEn: string;
  bioBn: string;
}

/**
 * Author claims below are limited to the public portfolio supplied by the site
 * owner. It documents digital/content work, not personal trip counts, visa
 * outcomes, bank verification, or original travel-photo provenance.
 */
export const FARHAN_MOMEN_PROFILE: AuthorProfile = {
  name: "Farhan Momen",
  portfolioUrl: "https://github.com/MARC414/MARC",
  sameAs: ["https://github.com/MARC414"],
  bioEn:
    "Farhan Momen is a Bangladesh-based digital marketing and web-development professional. His public portfolio describes 15+ years across content, education, and digital work, and lists experience in SEO strategy, WordPress development, technical translation, and English-language teaching, including founding WebWorm Digital Agency. At URAL Travel, he applies that research and editorial background to practical travel-planning guides for Bangladeshi outbound travelers.",
  bioBn:
    "ফারহান মোমেন বাংলাদেশভিত্তিক ডিজিটাল মার্কেটিং ও ওয়েব ডেভেলপমেন্ট পেশাজীবী। তাঁর পাবলিক পোর্টফোলিওতে কনটেন্ট, শিক্ষা ও ডিজিটাল কাজে ১৫ বছরের বেশি অভিজ্ঞতার কথা বলা হয়েছে; এতে SEO কৌশল, WordPress ডেভেলপমেন্ট, কারিগরি অনুবাদ ও ইংরেজি শিক্ষাদানের কাজও উল্লেখ আছে, পাশাপাশি WebWorm Digital Agency প্রতিষ্ঠার অভিজ্ঞতা রয়েছে। URAL Travel-এ তিনি সেই গবেষণা ও সম্পাদকীয় অভিজ্ঞতা ব্যবহার করে বাংলাদেশি বহির্গামী ভ্রমণকারীদের জন্য ব্যবহারিক ভ্রমণ-পরিকল্পনা গাইড তৈরি করেন।",
};

/** Resolve a localized or role-qualified blog byline to a supported profile. */
export function getAuthorProfile(authorRaw?: string): AuthorProfile | undefined {
  const name = (authorRaw || "").split("(")[0].trim().toLocaleLowerCase();
  return name === FARHAN_MOMEN_PROFILE.name.toLocaleLowerCase()
    ? FARHAN_MOMEN_PROFILE
    : undefined;
}
