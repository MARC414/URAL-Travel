export interface AuthorCreativeWork {
  titleEn: string;
  titleBn: string;
  url: string;
}

export interface AuthorProfile {
  /** Public name used in URAL article bylines. */
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
 * Single-editor profile: every URAL guide is written and edited by the site
 * owner. Claims are limited to the public portfolio supplied by the owner —
 * digital/content work and selected media projects — plus the site's own
 * editorial verification practice.
 */
export const EDITOR_PROFILE: AuthorProfile = {
  name: "Farhan Momen",
  alternateNames: [],
  portfolioUrl: "",
  sameAs: [],
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
    "Farhan Momen is the Founder and Travel Editor of URAL Travel, an independent travel-planning desk based in Dhaka. He has spent 15+ years in Bangladesh's digital content and marketing industry across SEO strategy, web development, technical translation, and English-language teaching, and founded WebWorm Digital Agency. At URAL Travel he writes and personally edits practical guides for Bangladeshi outbound travelers—visa rules, passport dollar endorsement, airline baggage and Zamzam policies, and Umrah planning—and verifies every fare, fee, and rule against official sources such as Bangladesh Bank circulars, Bangladesh Police Special Branch, and Saudi authorities before publishing.",
  bioBn:
    "ফারহান মোমেন ঢাকার স্বাধীন ট্রাভেল-প্ল্যানিং ডেস্ক URAL Travel-এর প্রতিষ্ঠাতা ও ট্রাভেল এডিটর। বাংলাদেশের ডিজিটাল কনটেন্ট ও মার্কেটিং খাতে তাঁর ১৫ বছরের বেশি অভিজ্ঞতা রয়েছে—এর মধ্যে আছে SEO কৌশল, ওয়েব ডেভেলপমেন্ট, কারিগরি অনুবাদ ও ইংরেজি শিক্ষাদান, এবং তিনি WebWorm Digital Agency প্রতিষ্ঠা করেছেন। URAL Travel-এ তিনি বাংলাদেশি বহির্গামী ভ্রমণকারীদের জন্য ভিসা নিয়ম, পাসপোর্ট ডলার এনডোর্সমেন্ট, এয়ারলাইন ব্যাগেজ ও জমজম নীতি এবং ওমরাহ পরিকল্পনাবিষয়ক ব্যবহারিক গাইড লেখেন ও নিজে সম্পাদনা করেন; প্রতিটি ভাড়া, ফি ও নিয়ম প্রকাশের আগে বাংলাদেশ ব্যাংকের সার্কুলার, বাংলাদেশ পুলিশের স্পেশাল ব্রাঞ্চ এবং সৌদি কর্তৃপক্ষের মতো অফিসিয়াল উৎস থেকে যাচাই করা হয়।",
};

/** Every URAL guide has one editor; resolve any byline to the single profile. */
export function getAuthorProfile(_authorRaw?: string): AuthorProfile | undefined {
  return EDITOR_PROFILE;
}
