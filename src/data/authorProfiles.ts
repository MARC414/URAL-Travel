export interface AuthorCreativeWork {
  titleEn: string;
  titleBn: string;
  url: string;
}

export interface AuthorProfile {
  /** Prominent public name used in URAL article bylines. */
  name: string;
  /** Names and initials that also identify the author. */
  alternateNames: string[];
  /** Public professional portfolio supplied as the author's source material. */
  portfolioUrl: string;
  /** GitHub profile associated with the supplied portfolio repository. */
  sameAs: string[];
  /** Selected documentary / media links listed in the supplied portfolio. */
  creativeWorks: AuthorCreativeWork[];
  bioEn: string;
  bioBn: string;
}

/**
 * Author claims below are limited to the public portfolio supplied by the site
 * owner. It documents digital/content work and selected media projects, not
 * personal trip counts, visa outcomes, bank verification, or original travel-
 * photo provenance.
 */
export const FARHAN_MOMEN_PROFILE: AuthorProfile = {
  name: "Farhan Momen",
  alternateNames: ["MARC", "Momen Ahmderu Rahman Chodhury"],
  portfolioUrl: "https://github.com/MARC414/MARC",
  sameAs: ["https://github.com/MARC414"],
  creativeWorks: [
    {
      titleEn: "Tanchangya Tribe documentary",
      titleBn: "তঞ্চঙ্গ্যা সম্প্রদায়ের প্রামাণ্যচিত্র",
      url: "https://www.youtube.com/watch?v=P4SDdX4quko",
    },
    {
      titleEn: "TV drama production — broadcast on Masranga TV",
      titleBn: "মাছরাঙা টিভিতে প্রচারিত নাটক",
      url: "https://www.youtube.com/watch?v=1Ae79s02mNk&t=28s",
    },
    {
      titleEn: "Philosophy of Fakir Lalon Shah — LinkedIn article",
      titleBn: "ফকির লালন শাহের জীবন ও দর্শন — নিবন্ধ",
      url: "https://www.linkedin.com/pulse/life-philosophy-fakir-lalon-shah-mystic-poet-baul-sufi-chowdhury-gtt5c/?trackingId=4U2t7lyvTzW5sYDJ1EjySQ%3D%3D",
    },
  ],
  bioEn:
    "Farhan Momen is the prominent byline and nickname; MARC is the initials of his full name, Momen Ahmderu Rahman Chodhury. He is a Bangladesh-based digital marketing and web-development professional. His public portfolio describes 15+ years across content, education, and digital work, and lists experience in SEO strategy, WordPress development, technical translation, and English-language teaching, including founding WebWorm Digital Agency. At URAL Travel, he applies that research and editorial background to practical travel-planning guides for Bangladeshi outbound travelers. His portfolio also features a Tanchangya Tribe documentary, a television-drama production broadcast on Masranga TV, and an article on Fakir Lalon Shah.",
  bioBn:
    "ফারহান মোমেন তাঁর প্রচলিত বাইলাইন ও ডাকনাম; MARC হলো তাঁর পূর্ণ নাম Momen Ahmderu Rahman Chodhury-এর আদ্যক্ষর। তিনি বাংলাদেশভিত্তিক ডিজিটাল মার্কেটিং ও ওয়েব ডেভেলপমেন্ট পেশাজীবী। তাঁর পাবলিক পোর্টফোলিওতে কনটেন্ট, শিক্ষা ও ডিজিটাল কাজে ১৫ বছরের বেশি অভিজ্ঞতার কথা বলা হয়েছে; এতে SEO কৌশল, WordPress ডেভেলপমেন্ট, কারিগরি অনুবাদ ও ইংরেজি শিক্ষাদানের কাজও উল্লেখ আছে, পাশাপাশি WebWorm Digital Agency প্রতিষ্ঠার অভিজ্ঞতা রয়েছে। URAL Travel-এ তিনি সেই গবেষণা ও সম্পাদকীয় অভিজ্ঞতা ব্যবহার করে বাংলাদেশি বহির্গামী ভ্রমণকারীদের জন্য ব্যবহারিক ভ্রমণ-পরিকল্পনা গাইড তৈরি করেন। পোর্টফোলিওতে তঞ্চঙ্গ্যা সম্প্রদায়ের একটি প্রামাণ্যচিত্র, মাছরাঙা টিভিতে প্রচারিত একটি নাটক এবং ফকির লালন শাহের জীবন ও দর্শন নিয়ে একটি নিবন্ধও রয়েছে।",
};

/** Resolve a localized or role-qualified blog byline to a supported profile. */
export function getAuthorProfile(authorRaw?: string): AuthorProfile | undefined {
  const name = (authorRaw || "").split("(")[0].trim().toLocaleLowerCase();
  return name === FARHAN_MOMEN_PROFILE.name.toLocaleLowerCase()
    ? FARHAN_MOMEN_PROFILE
    : undefined;
}
