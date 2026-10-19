/**
 * FAQ pairs for the Banking & Forex hub (/banking).
 *
 * Kept in a module of its own, separate from `bankingHubData.ts`, because
 * `src/App.tsx` needs only the FAQ node to build the runtime FAQPage schema.
 * Importing the whole hub data file (references, node directory, payment
 * methods, steps, NOC copy) into the entry graph pushed the eager JS over its
 * 200 KB gzip budget; this file carries the FAQ strings alone.
 *
 * `bankingHubData.ts` re-exports both symbols, so existing readers
 * (`BankingHubLandingPage.tsx`, `scripts/prerender.ts`) are unaffected.
 *
 * Editorial rules live in `bankingHubData.ts`. Every money claim here must
 * trace to a row in docs/growth/A1-CLAIMS-LEDGER.md (M1–M5), and no ceiling is
 * described as an automatic allowance.
 */

export interface BankingFaq {
  question: string;
  answer: string;
  questionBn: string;
  answerBn: string;
}

/**
 * FAQ pairs are written for the query language Search Console is already
 * showing: "dollar endorsement limit in passport bangladesh", "dual currency
 * card", "for endorsement" and "noc".
 */
export const BANKING_HUB_FAQS: BankingFaq[] = [
  {
    question: "What is the dollar endorsement limit in a Bangladeshi passport?",
    answer:
      "Since 6 September 2026 the ceiling is USD 18,000 per calendar year for an adult resident. Minors under 12 remain at 50% (up to USD 9,000), and no more than USD 5,000 of the entitlement may be released as US-dollar notes; the rest is non-cash. The bank releases an amount against your travel documents, so the ceiling is not an automatic allowance.",
    questionBn: "বাংলাদেশি পাসপোর্টে ডলার এনডোর্সমেন্টের সীমা কত?",
    answerBn:
      "৬ সেপ্টেম্বর ২০২৬ থেকে প্রাপ্তবয়স্ক বাসিন্দার জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000। ১২ বছরের কম বয়সীরা ৫০% (সর্বোচ্চ USD 9,000), আর entitlement-এর মধ্যে সর্বোচ্চ USD 5,000 US-dollar নোটে ছাড়া যায়; বাকিটা নন-ক্যাশ। ব্যাংক ভ্রমণ-কাগজ দেখে টাকা ছাড়ে, তাই ceiling স্বয়ংক্রিয় allowance নয়।",
  },
  {
    question: "Is the USD 18,000 limit per trip or per year?",
    answer:
      "It is a calendar-year ceiling, not a per-trip allowance. The 6 September 2026 circular raises the entitlement and leaves other instructions unchanged, so the annual basis and the document requirements still come from the existing foreign-exchange rules. Your bank decides how much to release for a particular trip.",
    questionBn: "USD 18,000 সীমা কি প্রতি সফরে না প্রতি বছরে?",
    answerBn:
      "এটি ক্যালেন্ডার বছরের ceiling, প্রতি সফরের allowance নয়। ৬ সেপ্টেম্বর ২০২৬-এর সার্কুলার entitlement বাড়ায় এবং বাকি নির্দেশনা অপরিবর্তিত রাখে, তাই বার্ষিক ভিত্তি ও কাগজের শর্ত আগের foreign-exchange নিয়ম থেকেই আসে। নির্দিষ্ট সফরে কত ছাড়বে তা ব্যাংক ঠিক করে।",
  },
  {
    question: "Why does my dual-currency card fail on a payment above USD 300?",
    answer:
      "Bangladesh Bank's general online-payment paragraph caps a single online purchase at USD 300, which is why large flight and hotel checkouts often decline on a travel-quota card. A bank may process a larger documented travel payment, but that is its decision: ask before you pay, with the itinerary or booking evidence ready. A card issued against an RFCD account is expressly allowed to pay online at the actual amount under the 9 May 2024 circular.",
    questionBn: "USD 300-এর বেশি পেমেন্টে ডুয়েল কারেন্সি কার্ড কেন আটকে যায়?",
    answerBn:
      "বাংলাদেশ ব্যাংকের সাধারণ online-payment অনুচ্ছেদে একবারের অনলাইন কেনাকাটা USD 300-এ সীমাবদ্ধ, তাই travel-quota কার্ডে বড় ফ্লাইট বা হোটেলের checkout প্রায়ই আটকে যায়। ব্যাংক বড় documented travel payment process করতে পারে, তবে সেটি তার সিদ্ধান্ত: পেমেন্টের আগে জিজ্ঞেস করুন এবং itinerary বা বুকিংয়ের প্রমাণ প্রস্তুত রাখুন। ৯ মে ২০২৪-এর সার্কুলার অনুযায়ী RFCD account-ভিত্তিক কার্ড অনলাইনে প্রকৃত পরিমাণে payment করার স্পষ্ট অনুমতি পায়।",
  },
  {
    question: "Can I put money into an RFCD account before my first trip?",
    answer:
      "Not by converting Taka for that purpose. An RFCD account holds eligible foreign currency that a resident physically brings back after travel. Up to USD 10,000 may be deposited without a customs declaration; a larger FMJ-declared amount must be deposited within 30 days of arrival, per EBL's terms. It cannot receive inward remittance or foreign income.",
    questionBn: "প্রথম সফরের আগে RFCD account-এ টাকা রাখা যায়?",
    answerBn:
      "সেই উদ্দেশ্যে টাকা convert করে নয়। RFCD account-এ বাসিন্দা বিদেশ সফর থেকে শারীরিকভাবে সঙ্গে আনা যোগ্য foreign currency রাখেন। EBL-এর শর্ত অনুযায়ী সর্বোচ্চ USD 10,000 customs declaration ছাড়াই জমা দেওয়া যায়; এর বেশি FMJ-তে ঘোষণা করা amount আগমনের ৩০ দিনের মধ্যে জমা দিতে হয়। এতে inward remittance বা বিদেশি আয় নেওয়া যায় না।",
  },
  {
    question: "Do I need an NOC to endorse dollars or to leave Bangladesh?",
    answer:
      "No Bangladesh Bank circular summarised here requires an NOC for passport endorsement. NOC and GO requests belong to outbound immigration at Dhaka airport and are profession-specific: a private-sector employer's NOC, a government order, a trade licence, or a student ID. Confirm the current requirement with your employer and the airport before you fly, and never use a bought or altered document.",
    questionBn: "ডলার এনডোর্স বা দেশ ছাড়তে কি NOC লাগে?",
    answerBn:
      "এই পাতায় উল্লেখ করা বাংলাদেশ ব্যাংকের কোনো সার্কুলারেই পাসপোর্ট এনডোর্সমেন্টের জন্য NOC লাগে না। NOC ও GO-র দাবি ঢাকা এয়ারপোর্টের outbound immigration-এর এবং পেশাভেদে আলাদা: বেসরকারি নিয়োগকর্তার NOC, সরকারি GO, trade licence, বা student ID। উড়ার আগে নিয়োগকর্তা ও এয়ারপোর্টের বর্তমান শর্ত নিশ্চিত করুন, আর কেনা বা বদলানো কাগজ কখনো ব্যবহার করবেন না।",
  },
  {
    question: "Can I book flights and hotels in BDT without a dual-currency card?",
    answer:
      "Yes, through a travel desk that settles in Taka and issues the airline PNR and hotel voucher; URAL's Dhaka desk works this way by bank transfer, bKash or Nagad. Treat it as a service arrangement, not a bank product: compare the all-in BDT quote with the airline's own card price, confirm the PNR directly with the airline, and read the cancellation terms before paying.",
    questionBn: "ডুয়েল কারেন্সি কার্ড ছাড়া BDT-তে ফ্লাইট ও হোটেল বুক করা যায়?",
    answerBn:
      "হ্যাঁ, এমন ট্রাভেল ডেস্কের মাধ্যমে যারা টাকায় settlement করে airline PNR ও হোটেল ভাউচার দেয়; URAL-এর ঢাকা ডেস্ক ব্যাংক ট্রান্সফার, bKash বা Nagad-এ এভাবে কাজ করে। এটিকে ব্যাংকের পণ্য নয়, service ব্যবস্থা হিসেবে দেখুন: সর্বমোট BDT quote এয়ারলাইন্সের কার্ড-দামের সঙ্গে মিলিয়ে দেখুন, PNR সরাসরি এয়ারলাইন্সের কাছে যাচাই করুন, আর পেমেন্টের আগে বাতিলের শর্ত পড়ুন।",
  },
  {
    question: "Should I buy Saudi Riyals in Dhaka or carry US dollars?",
    answer:
      "For cash spending, buying SAR directly in Dhaka avoids converting BDT to USD and then to SAR, which pays two spreads instead of one. The exact spread varies by dealer and by day, so compare the counter rate rather than trusting a percentage. For card spending, the rule is to choose the local currency at the terminal: if you choose BDT, the merchant's bank converts at its own rate, usually with a markup of several percent.",
    questionBn: "ঢাকায় সৌদি রিয়াল কিনব না ডলার নিয়ে যাব?",
    answerBn:
      "নগদ খরচের জন্য ঢাকায় সরাসরি SAR কিনলে BDT থেকে USD, পরে SAR-এ convert করার দুটি spread এড়ানো যায়। প্রকৃত spread দোকান ও দিনভেদে বদলায়, তাই শতাংশে ভরসা না করে counter-এর রেট মিলিয়ে দেখুন। কার্ডে খরচের সময় নিয়ম হলো টার্মিনালে local currency বেছে নেওয়া: BDT বেছে নিলে merchant-এর ব্যাংক নিজের রেটে convert করে, সাধারণত কয়েক শতাংশ markup-এ।",
  },
  {
    question: "Are Islamic dual-currency cards structured differently?",
    answer:
      "Islamic banks and Islamic windows generally issue debit or prepaid cards that spend your own deposited balance (Mudaraba or Al-Wadiah), and some charge cards use a fixed fee (Ujrah) instead of compounding interest. Structures, fees and features differ by bank, and the USD 18,000 entitlement is product-neutral: it is set by Bangladesh Bank, not by the card's brand. Read that bank's current product terms before applying.",
    questionBn: "ইসলামিক ডুয়েল কারেন্সি কার্ড কি আলাদাভাবে তৈরি?",
    answerBn:
      "ইসলামি ব্যাংক ও ইসলামিক উইন্ডো সাধারণত এমন debit বা prepaid কার্ড দেয় যা আপনার নিজের জমা ব্যালেন্স খরচ করে (মুদারাবা বা আল-ওয়াদিয়াহ), আর কিছু charge card চক্রবৃদ্ধি সুদের বদলে নির্দিষ্ট ফি (উজরাহ) নেয়। গঠন, ফি ও সুবিধা ব্যাংকভেদে আলাদা, আর USD 18,000 entitlement পণ্য-নিরপেক্ষ: এটি বাংলাদেশ ব্যাংক নির্ধারণ করে, কার্ডের ব্র্যান্ড নয়। আবেদনের আগে সেই ব্যাংকের বর্তমান পণ্য-শর্ত পড়ুন।",
  },
];
