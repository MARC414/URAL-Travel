import type { Language } from "../translations";

/** Homepage orientation only. React and saved EN/BN HTML/schema use these
 * records together; specialist entry, banking and Umrah answers stay in guides. */
export interface HomeFaq {
  question: string;
  answer: string;
}

const HOME_FAQ_COPY: Record<Language, { heading: string; faqs: HomeFaq[] }> = {
  en: {
    heading: "Travel Planning Questions",
    faqs: [
      {
        question: "Does URAL sell flights, hotels or visas?",
        answer: "URAL is an editorial travel intelligence and affiliate referral platform. It publishes planning guides and links to flight, hotel and visa providers. URAL does not sell or issue tickets, accommodation or visas. The provider handles your booking or application, payment and support. Some partner links may earn URAL a commission; check the provider's final price and terms before paying.",
      },
      {
        question: "Where should I check entry rules for my passport and residence?",
        answer: "Check your destination's official immigration authority, embassy or authorised visa portal for your passport nationality, country of residence and travel dates. Confirm transit requirements for every connection and the operating airline's document checks. URAL guides help you prepare questions and documents; a guide or visa does not guarantee admission. Follow the official sources linked in the relevant guide before booking or applying.",
      },
      {
        question: "How do I choose the currency used to display prices?",
        answer: "In the full flight search, the default display currency follows the selected departure: BDT for Bangladesh and USD for other origins. You can choose another available currency, and your choice takes priority when the origin changes. Other tools have their own currency selectors; budget worksheets keep their inputs in BDT. Dated exchange-rate conversions are planning references, not transaction quotes. Confirm the provider's payment currency and your bank's charges separately.",
      },
      {
        question: "Where can I find guidance for travelling from Bangladesh?",
        answer: "Use the Bangladesh planning hub linked on this page. It groups Dhaka flight-route guides, Bangladesh passport entry checklists, banking and endorsement guidance, departure preparation and Umrah planning. These guides keep their Bangladesh-specific conditions. If you hold a different passport or live elsewhere, check which nationality, residence and departure conditions apply to you rather than assuming the same rules.",
      },
    ],
  },
  bn: {
    heading: "ভ্রমণ পরিকল্পনার প্রশ্ন ও উত্তর",
    faqs: [
      {
        question: "URAL কি ফ্লাইট, হোটেল বা ভিসা বিক্রি করে?",
        answer: "URAL একটি সম্পাদকীয় ট্রাভেল ইন্টেলিজেন্স ও অ্যাফিলিয়েট রেফারেল প্ল্যাটফর্ম। এখানে পরিকল্পনার গাইড এবং ফ্লাইট, হোটেল ও ভিসা সেবাদাতার লিংক রয়েছে। URAL টিকিট, আবাসন বা ভিসা বিক্রি বা ইস্যু করে না। বুকিং বা আবেদন, অর্থ গ্রহণ ও সহায়তার দায়িত্ব সংশ্লিষ্ট সেবাদাতার। কিছু পার্টনার লিংক থেকে URAL কমিশন পেতে পারে; অর্থ দেওয়ার আগে সেবাদাতার চূড়ান্ত দাম ও শর্ত দেখুন।",
      },
      {
        question: "আমার পাসপোর্ট ও বসবাসের দেশ অনুযায়ী প্রবেশের নিয়ম কোথায় যাচাই করব?",
        answer: "আপনার পাসপোর্টের জাতীয়তা, বসবাসের দেশ ও ভ্রমণের তারিখ অনুযায়ী গন্তব্যের সরকারি ইমিগ্রেশন কর্তৃপক্ষ, দূতাবাস বা অনুমোদিত ভিসা পোর্টালে শর্ত যাচাই করুন। প্রতিটি সংযোগে ট্রানজিটের শর্ত এবং ফ্লাইট পরিচালনাকারী এয়ারলাইনের নথি যাচাইয়ের নিয়মও দেখুন। URAL-এর গাইড প্রশ্ন ও নথি প্রস্তুত করতে সাহায্য করে; গাইড বা ভিসা কোনোটিই প্রবেশের নিশ্চয়তা দেয় না। বুকিং বা আবেদনের আগে সংশ্লিষ্ট গাইডে দেওয়া সরকারি সূত্র মিলিয়ে নিন।",
      },
      {
        question: "দাম দেখানোর মুদ্রা কীভাবে বেছে নেব?",
        answer: "পূর্ণাঙ্গ ফ্লাইট সার্চে প্রাথমিক মুদ্রা নির্ধারিত হয় নির্বাচিত যাত্রার স্থান অনুযায়ী: বাংলাদেশের জন্য BDT, অন্য দেশের জন্য USD। উপলভ্য মুদ্রাগুলো থেকে অন্যটি বেছে নিতে পারেন; যাত্রার স্থান বদলালেও আপনার পছন্দ অগ্রাধিকার পায়। অন্য টুলে আলাদা মুদ্রা বাছাইয়ের ব্যবস্থা আছে; বাজেটের হিসাবপত্রে ইনপুট BDT-তেই থাকে। তারিখযুক্ত বিনিময় হারের রূপান্তর পরিকল্পনার সহায়ক তথ্য, লেনদেনের দর নয়। সেবাদাতা কোন মুদ্রায় অর্থ নেবে এবং ব্যাংকের চার্জ কত, তা আলাদা করে নিশ্চিত করুন।",
      },
      {
        question: "বাংলাদেশ থেকে ভ্রমণের বিশেষ নির্দেশনা কোথায় পাব?",
        answer: "এই পাতার লিংক থেকে বাংলাদেশ ভ্রমণ পরিকল্পনা হাবে যান। সেখানে ঢাকা থেকে ফ্লাইট রুট, বাংলাদেশি পাসপোর্টের প্রবেশের চেকলিস্ট, ব্যাংকিং ও এনডোর্সমেন্ট, যাত্রার প্রস্তুতি এবং ওমরাহ পরিকল্পনার গাইড সাজানো আছে। এসব গাইডে বাংলাদেশভিত্তিক শর্ত বজায় রয়েছে। অন্য পাসপোর্ট থাকলে বা অন্য দেশে বসবাস করলে একই নিয়ম ধরে না নিয়ে আপনার জাতীয়তা, বসবাস ও যাত্রার স্থানের কোন শর্ত প্রযোজ্য, তা যাচাই করুন।",
      },
    ],
  },
};

export function getHomeFaqs(lang: Language): HomeFaq[] { return HOME_FAQ_COPY[lang].faqs; }
export function getHomeFaqHeading(lang: Language): string { return HOME_FAQ_COPY[lang].heading; }

// Compatibility for existing English-only consumers; homepage renderers localize.
export const HOME_FAQS = getHomeFaqs("en");
export const HOME_FAQ_HEADING = getHomeFaqHeading("en");
