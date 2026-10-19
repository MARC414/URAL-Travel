/**
 * Banking & Forex cluster hub (/banking).
 *
 * SINGLE SOURCE OF TRUTH for the hub. `scripts/prerender.ts` (crawlable HTML,
 * FAQPage schema, sitemap <lastmod>) and `src/components/BankingHubLandingPage.tsx`
 * (React) both read this file, so the two renderings cannot drift apart.
 *
 * ── Editorial rules for this file ────────────────────────────────────────────
 * 1. Every money claim must trace to a row in docs/growth/A1-CLAIMS-LEDGER.md
 *    (M1–M5). No volume, conversion-saving or markup percentage is invented here.
 * 2. A ceiling is described as a ceiling, released by the bank against travel
 *    documents — never as an automatic allowance or a guaranteed approval.
 * 3. NOC is not a Bangladesh Bank concept. It is described as a
 *    profession-specific outbound-immigration document, and the reader is told
 *    to confirm the current requirement instead of trusting this page.
 * 4. If you change a fact, change `BANKING_HUB_LAST_CHECKED` in the same commit.
 */

/** Date the figures and links below were last checked against their sources. */
export const BANKING_HUB_LAST_CHECKED = "2026-10-19";

/**
 * Sitemap <lastmod> for /banking. An explicit ISO timestamp, not CONTENT_UPDATED:
 * publishing one new hub must not tell Google that all 77 other dated pages
 * changed on the same day.
 */
export const BANKING_HUB_LASTMOD = "2026-10-19T09:00:00+06:00";

export interface BankingReference {
  name: string;
  nameBn: string;
  url: string;
}

/**
 * The seven sources behind every claim on the hub.
 * P1–P6 are primary (Bangladesh Bank or the bank's own product page).
 * S1 is secondary: the BSS report that first carried the money-changer fee cap,
 * kept as the news of record alongside the primary circular (P6) that states it.
 */
export const BANKING_HUB_REFERENCES: BankingReference[] = [
  {
    name: "Bangladesh Bank — FEPD-1 Circular No. 33 (6 September 2026): travel entitlement raised to USD 18,000",
    nameBn:
      "বাংলাদেশ ব্যাংক — FEPD-1 Circular No. 33 (৬ সেপ্টেম্বর ২০২৬): ভ্রমণ entitlement USD 18,000-এ বৃদ্ধি",
    url: "https://www.bb.org.bd/mediaroom/circulars/fepd/sep062026fepd-133e.pdf",
  },
  {
    name: "Bangladesh Bank — GFET Volume 1, Chapter 19: payment through international cards (USD 300 single online purchase)",
    nameBn:
      "বাংলাদেশ ব্যাংক — GFET Volume 1, Chapter 19: আন্তর্জাতিক কার্ডে পেমেন্ট (একবারে USD 300 online purchase)",
    url: "https://www.bb.org.bd/aboutus/regulationguideline/foreignexchange/feguidevol1/19.pdf",
  },
  {
    name: "Bangladesh Bank — FE Circular Letter No. 05 (9 May 2024): RFCD cards may pay online at the actual amount",
    nameBn:
      "বাংলাদেশ ব্যাংক — FE Circular Letter No. 05 (৯ মে ২০২৪): RFCD কার্ড প্রকৃত পরিমাণে online payment করতে পারে",
    url: "https://www.bb.org.bd/mediaroom/circulars/fepd/may092024fepdl05e.pdf",
  },
  {
    name: "Bangladesh Bank — FEPD-2 Circular No. 01 (7 January 2026): passport endorsement fee by money changers capped at BDT 300",
    nameBn:
      "বাংলাদেশ ব্যাংক — FEPD-2 Circular No. 01 (৭ জানুয়ারি ২০২৬): মানি চেঞ্জারের passport endorsement fee সর্বোচ্চ BDT 300",
    url: "https://www.bb.org.bd/mediaroom/circulars/fepd-2/jan072026fepd-201e.pdf",
  },
  {
    name: "Eastern Bank (EBL) — RFCD Account: USD 10,000 deposit, FMJ and 30-day rule, no inward remittance",
    nameBn:
      "ইস্টার্ন ব্যাংক (EBL) — RFCD Account: USD 10,000 জমা, FMJ ও ৩০ দিনের নিয়ম, inward remittance নয়",
    url: "https://www.ebl.com.bd/retail-deposit/EBL-RFCD-Account",
  },
  {
    name: "Social Islami Bank (SIBL) — RFCD Account: transfers abroad and international card facility",
    nameBn:
      "সোশ্যাল ইসলামী ব্যাংক (SIBL) — RFCD Account: বিদেশে transfer ও আন্তর্জাতিক card facility",
    url: "https://www.siblbd.com/rfcd-account",
  },
  {
    name: "BSS (secondary) — news report of the BDT 300 money-changer endorsement fee cap (7 January 2026)",
    nameBn:
      "বিএসএস (সেকেন্ডারি) — মানি চেঞ্জারদের passport endorsement fee BDT 300 সীমার সংবাদ প্রতিবেদন (৭ জানুয়ারি ২০২৬)",
    url: "https://www.bssnews.net/business/348822",
  },
];

export interface BankingStat {
  value: string;
  label: string;
  labelBn: string;
}

/** The four numbers a reader is most often looking for, each tied to M1/M2. */
export const BANKING_HUB_STATS: BankingStat[] = [
  {
    value: "USD 18,000",
    label: "Adult resident ceiling per calendar year, since 6 Sep 2026",
    labelBn: "প্রাপ্তবয়স্ক বাসিন্দার বার্ষিক ceiling, ৬ সেপ্টেম্বর ২০২৬ থেকে",
  },
  {
    value: "USD 9,000",
    label: "Minors under 12: 50% of the adult entitlement",
    labelBn: "১২ বছরের কম বয়সী: প্রাপ্তবয়স্ক entitlement-এর ৫০%",
  },
  {
    value: "USD 5,000",
    label: "Maximum released as US-dollar notes within that ceiling",
    labelBn: "এই ceiling-এর মধ্যে সর্বোচ্চ যতটা US-dollar নোটে ছাড়া যায়",
  },
  {
    value: "USD 300",
    label: "General single online-purchase limit on a travel-quota card",
    labelBn: "Travel-quota কার্ডে সাধারণ একবারের online purchase সীমা",
  },
];

export const BANKING_HUB_INTRO = {
  en: "Everything a Bangladeshi traveller needs to move money for a trip: the passport dollar-endorsement ceiling, the dual-currency card that spends it, the USD 300 online-payment rule, RFCD accounts, the NOC paperwork asked for at Dhaka airport, and how to pay in BDT when none of that is ready. Every figure here is tied to a named Bangladesh Bank circular or bank page.",
  bn: "বিদেশ ভ্রমণের টাকা ব্যবস্থা করার পুরো ছবি এক জায়গায়: পাসপোর্টে ডলার এনডোর্সমেন্টের ceiling, সেই টাকা খরচ করার ডুয়েল কারেন্সি কার্ড, অনলাইনে USD 300-এর নিয়ম, RFCD account, ঢাকা এয়ারপোর্টে চাওয়া NOC-সংক্রান্ত কাগজ, আর কিছুই প্রস্তুত না থাকলে BDT-তে পেমেন্ট করার উপায়। এখানকার প্রতিটি সংখ্যা বাংলাদেশ ব্যাংকের নির্দিষ্ট সার্কুলার বা ব্যাংকের নিজের পাতার সঙ্গে যুক্ত।",
};

export const BANKING_HUB_QUICK_ANSWER = {
  en: "The dollar endorsement limit in a Bangladeshi passport is a ceiling of USD 18,000 per calendar year for an adult resident since 6 September 2026. Minors under 12 stay at 50% (up to USD 9,000), and at most USD 5,000 of the entitlement may be released as US-dollar notes; the rest is non-cash, such as an international card. Your bank releases the amount against your travel documents — it is not automatically available, and a separate rule caps a single online card purchase at USD 300.",
  bn: "বাংলাদেশি পাসপোর্টে ডলার এনডোর্সমেন্টের সীমা হলো ৬ সেপ্টেম্বর ২০২৬ থেকে প্রাপ্তবয়স্ক বাসিন্দার জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000। ১২ বছরের কম বয়সীদের ক্ষেত্রে তা ৫০% (সর্বোচ্চ USD 9,000), আর এই entitlement-এর মধ্যে সর্বোচ্চ USD 5,000 US-dollar নোট হিসেবে ছাড়া যেতে পারে; বাকিটা নন-ক্যাশ, যেমন আন্তর্জাতিক কার্ড। ব্যাংক আপনার ভ্রমণ-কাগজ দেখে টাকা ছাড়ে — এটি স্বয়ংক্রিয়ভাবে পাওয়া যায় না, আর কার্ডে একবারে অনলাইন কেনাকাটার জন্য আলাদা USD 300-এর নিয়ম আছে।",
};

export interface BankingNode {
  id: string;
  slug: string;
  kicker: string;
  kickerBn: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
}

/** The five articles this hub exists to connect. Slugs are live; never change them. */
export const BANKING_CLUSTER_NODES: BankingNode[] = [
  {
    id: "blog-6",
    slug: "dual-currency-card-endorsement-bangladesh",
    kicker: "Start here · The ceiling and the stamp",
    kickerBn: "এখান থেকে শুরু · ceiling ও সিল",
    title: "Dollar endorsement in a Bangladeshi passport",
    titleBn: "বাংলাদেশি পাসপোর্টে ডলার এনডোর্সমেন্ট",
    description:
      "What the USD 18,000 ceiling does and does not mean, what to take to an authorized dealer branch, and the activation step that makes the card work online.",
    descriptionBn:
      "USD 18,000 ceiling-এর অর্থ কী আর কী নয়, authorized dealer শাখায় কী নিতে হবে, এবং কার্ড অনলাইনে চালু করার ধাপ।",
  },
  {
    id: "blog-29",
    slug: "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix",
    kicker: "The USD 300 question",
    kickerBn: "USD 300-এর প্রশ্ন",
    title: "RFCD account vs. travel quota",
    titleBn: "RFCD account বনাম travel quota",
    description:
      "Why a large flight or hotel payment can decline, how to ask the bank for a documented travel payment, and when an RFCD account is the better fit.",
    descriptionBn:
      "বড় ফ্লাইট বা হোটেল পেমেন্ট কেন আটকে যায়, documented travel payment-এর জন্য ব্যাংককে কীভাবে বলবেন, আর কখন RFCD account বেশি উপযুক্ত।",
  },
  {
    id: "blog-28",
    slug: "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah",
    kicker: "Islamic banking",
    kickerBn: "ইসলামি ব্যাংকিং",
    title: "Shariah-compliant dual-currency cards",
    titleBn: "শরীয়াহ-সম্মত ডুয়েল কারেন্সি কার্ড",
    description:
      "How Islamic banks structure a travel card without interest, and the product questions to ask before you apply for one.",
    descriptionBn:
      "ইসলামি ব্যাংক কীভাবে সুদ ছাড়া ট্রাভেল কার্ড দেয়, আর আবেদনের আগে কোন কোন পণ্য-প্রশ্ন করতে হবে।",
  },
  {
    id: "blog-30",
    slug: "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card",
    kicker: "No card, no endorsement",
    kickerBn: "কার্ড নেই, এনডোর্সমেন্ট নেই",
    title: "Book flights and hotels in BDT",
    titleBn: "BDT-তে ফ্লাইট ও হোটেল বুকিং",
    description:
      "Paying a travel desk by bank transfer, bKash or Nagad when the passport is at an embassy or the card is not ready — and what to verify before you pay.",
    descriptionBn:
      "পাসপোর্ট দূতাবাসে থাকলে বা কার্ড প্রস্তুত না থাকলে ব্যাংক ট্রান্সফার, bKash বা Nagad-এ ট্রাভেল ডেস্ককে পেমেন্ট — আর দেওয়ার আগে কী যাচাই করবেন।",
  },
  {
    id: "blog-31",
    slug: "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide",
    kicker: "Cash, card and the terminal",
    kickerBn: "ক্যাশ, কার্ড ও POS টার্মিনাল",
    title: "Cash or card abroad",
    titleBn: "বিদেশে ক্যাশ নাকি কার্ড",
    description:
      "When to buy Saudi Riyals in Dhaka, when to carry dollars, and the one rule that matters at every card terminal: choose the local currency.",
    descriptionBn:
      "কখন ঢাকায় সৌদি রিয়াল কিনবেন, কখন ডলার নেবেন, আর কার্ড টার্মিনালে যে একটি নিয়ম মানতেই হবে: local currency বেছে নিন।",
  },
];

export interface BankingPaymentMethod {
  id: string;
  label: string;
  labelBn: string;
  badge: string;
  badgeBn: string;
  bestFor: string;
  bestForBn: string;
  rule: string;
  ruleBn: string;
  watch: string;
  watchBn: string;
  nodeSlug: string;
  nodeLabel: string;
  nodeLabelBn: string;
}

/**
 * The four payment routes the cluster covers. Each row states the governing
 * rule and the thing that goes wrong — no savings estimate, because no source
 * publishes one for Bangladesh.
 */
export const BANKING_PAYMENT_METHODS: BankingPaymentMethod[] = [
  {
    id: "travel-quota-card",
    label: "Passport-endorsed travel-quota card",
    labelBn: "পাসপোর্টে এনডোর্স করা travel-quota কার্ড",
    badge: "Most common",
    badgeBn: "সবচেয়ে প্রচলিত",
    bestFor: "Flights, hotels and POS spending in one card, with a paper trail in your passport.",
    bestForBn: "ফ্লাইট, হোটেল ও POS খরচ এক কার্ডে, আর পাসপোর্টে কাগজের রেকর্ড।",
    rule: "The bank may release up to USD 18,000 per calendar year for an adult resident, against your travel documents; at most USD 5,000 as dollar notes.",
    ruleBn: "ব্যাংক ভ্রমণ-কাগজ দেখে প্রাপ্তবয়স্ক বাসিন্দার জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000 ছাড়তে পারে; এর মধ্যে সর্বোচ্চ USD 5,000 ডলার নোটে।",
    watch: "A single online purchase is generally capped at USD 300. A larger documented travel payment is the bank's decision — ask before you enter the OTP.",
    watchBn: "অনলাইনে একবারের কেনাকাটা সাধারণত USD 300-এ সীমাবদ্ধ। এর বেশি documented travel payment ব্যাংকের সিদ্ধান্ত — OTP দেওয়ার আগে জিজ্ঞেস করুন।",
    nodeSlug: "dual-currency-card-endorsement-bangladesh",
    nodeLabel: "The endorsement and activation guide",
    nodeLabelBn: "এনডোর্সমেন্ট ও অ্যাক্টিভেশন গাইড",
  },
  {
    id: "rfcd",
    label: "RFCD account with an international card",
    labelBn: "RFCD account ও আন্তর্জাতিক কার্ড",
    badge: "For repeat travellers",
    badgeBn: "নিয়মিত ভ্রমণকারীদের জন্য",
    bestFor: "Holding foreign cash you genuinely brought back, and spending it later by card or transfer.",
    bestForBn: "সত্যিই বিদেশ থেকে ফিরিয়ে আনা foreign cash রাখা, পরে কার্ড বা transfer-এ খরচ করা।",
    rule: "Up to USD 10,000 brought back may be deposited without a customs declaration; a larger FMJ-declared amount must be deposited within 30 days (EBL).",
    ruleBn: "ফিরিয়ে আনা সর্বোচ্চ USD 10,000 customs declaration ছাড়াই জমা দেওয়া যায়; এর বেশি FMJ-তে ঘোষণা করা amount ৩০ দিনের মধ্যে জমা দিতে হবে (EBL)।",
    watch: "It cannot be funded by converting Taka before a first trip, and it cannot receive inward remittance or foreign income. Cards against RFCD may pay online at the actual amount.",
    watchBn: "প্রথম সফরের আগে টাকা convert করে এটি fund করা যায় না, আর inward remittance বা বিদেশি আয় এতে নেওয়া যায় না। RFCD-ভিত্তিক কার্ড অনলাইনে প্রকৃত পরিমাণে payment করতে পারে।",
    nodeSlug: "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix",
    nodeLabel: "RFCD vs. travel quota, explained",
    nodeLabelBn: "RFCD বনাম travel quota",
  },
  {
    id: "bdt-desk",
    label: "BDT settlement by bank transfer, bKash or Nagad",
    labelBn: "ব্যাংক ট্রান্সফার, bKash বা Nagad-এ BDT পেমেন্ট",
    badge: "When nothing is ready",
    badgeBn: "কিছুই প্রস্তুত না থাকলে",
    bestFor: "A passport sitting at an embassy, an urgent fare, or a traveller with no international card.",
    bestForBn: "পাসপোর্ট দূতাবাসে, urgently ফ্লাইট, বা আন্তর্জাতিক কার্ড নেই এমন যাত্রী।",
    rule: "You pay in Taka and receive an airline PNR and a hotel voucher. It is a service arrangement between you and the desk, not a Bangladesh Bank product.",
    ruleBn: "আপনি টাকায় পেমেন্ট করেন, বিনিময়ে airline PNR ও হোটেল ভাউচার পান। এটি আপনার ও ডেস্কের মধ্যে service ব্যবস্থা, বাংলাদেশ ব্যাংকের কোনো পণ্য নয়।",
    watch: "Compare the all-in BDT quote with the airline's own card price, confirm the PNR with the airline, and read the cancellation terms before paying.",
    watchBn: "সর্বমোট BDT quote-এর সঙ্গে এয়ারলাইন্সের নিজের কার্ড-দাম মিলিয়ে দেখুন, PNR এয়ারলাইন্সের কাছে যাচাই করুন, আর পেমেন্টের আগে বাতিলের শর্ত পড়ুন।",
    nodeSlug: "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card",
    nodeLabel: "How the BDT route works",
    nodeLabelBn: "BDT পদ্ধতি কীভাবে কাজ করে",
  },
  {
    id: "cash",
    label: "Cash SAR or USD and a licensed money changer",
    labelBn: "নগদ SAR বা USD ও লাইসেন্সপ্রাপ্ত মানি চেঞ্জার",
    badge: "Small daily costs",
    badgeBn: "দৈনন্দিন ছোট খরচ",
    bestFor: "Tips, street food, taxis and places where a card is not accepted.",
    bestForBn: "টিপস, রাস্তার খাবার, ট্যাক্সি এবং যেখানে কার্ড নেওয়া হয় না।",
    rule: "Buy the destination currency directly where you can: converting BDT to USD and then to SAR pays two spreads instead of one.",
    ruleBn: "যেখানে সম্ভব সরাসরি গন্তব্যের মুদ্রা কিনুন: BDT থেকে USD, পরে SAR — এতে একটির বদলে দুটি spread দিতে হয়।",
    watch: "Bangladesh Bank's FEPD-2 Circular No. 01 (7 January 2026) caps a licensed money changer's passport endorsement fee at BDT 300 per passport, whatever the amount. The fee must be displayed and receipted. It is the changer's fee, not a bank charge.",
    watchBn: "বাংলাদেশ ব্যাংকের FEPD-2 Circular No. 01 (৭ জানুয়ারি ২০২৬) অনুযায়ী লাইসেন্সপ্রাপ্ত মানি চেঞ্জারের passport endorsement fee প্রতি পাসপোর্টে সর্বোচ্চ BDT 300, পরিমাণ যাই হোক। ফি-টি প্রদর্শন করতে হবে ও রসিদ দিতে হবে। এটি চেঞ্জারের ফি, ব্যাংকের চার্জ নয়।",
    nodeSlug: "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide",
    nodeLabel: "Cash vs. card, destination by destination",
    nodeLabelBn: "দেশভিত্তিক ক্যাশ বনাম কার্ড",
  },
];

export const BANKING_ENDORSEMENT_STEPS = {
  heading: {
    en: "What endorsement actually involves",
    bn: "এনডোর্সমেন্টে আসলে যা করতে হয়",
  },
  intro: {
    en: "The sequence below is the part that is the same at every bank. The forms, photographs and branch rules are not — ask the branch for its current list rather than carrying a checklist from a blog.",
    bn: "নিচের ধাপগুলো প্রতিটি ব্যাংকে একই থাকে। ফরম, ছবি ও শাখার নিয়ম এক নয় — ব্লগের চেকলিস্ট হাতে না নিয়ে শাখার বর্তমান তালিকা চেয়ে নিন।",
  },
  steps: [
    {
      title: "Decide how much of the trip you are funding",
      titleBn: "সফরের কত টাকা ব্যাংক থেকে নেবেন ঠিক করুন",
      body: "The ceiling is annual, not per trip. Work out the card spending and the cash you actually need, then ask for that amount against the trip's documents.",
      bodyBn: "Ceiling বার্ষিক, প্রতি সফরের নয়। কার্ডে কত খরচ আর নগদ কত লাগবে হিসাব করুন, তারপর সফরের কাগজ দেখিয়ে সেই পরিমাণ চান।",
    },
    {
      title: "Take the documents the branch asks for",
      titleBn: "শাখা যা চায় সেই কাগজ নিন",
      body: "Usually your original passport and NID, plus the ticket or itinerary and any visa already issued. Confirm the branch's own form and photograph requirement first.",
      bodyBn: "সাধারণত আসল পাসপোর্ট ও NID, সঙ্গে টিকিট বা itinerary এবং ইস্যু হওয়া ভিসা। শাখার নিজের ফরম ও ছবির প্রয়োজন আগেই জেনে নিন।",
    },
    {
      title: "Ask for endorsement, not a 'limit increase'",
      titleBn: "'লিমিট বাড়ান' নয়, এনডোর্সমেন্ট চান",
      body: "What you are requesting is a release of foreign exchange recorded against your passport. How much of the ceiling the bank releases for this trip is the bank's decision.",
      bodyBn: "আপনি চাইছেন আপনার পাসপোর্টের বিপরীতে বৈদেশিক মুদ্রা ছাড়ার রেকর্ড। এই সফরে ceiling-এর কতটা ছাড়বে, সেটি ব্যাংকের সিদ্ধান্ত।",
    },
    {
      title: "Activate the card's foreign-currency side",
      titleBn: "কার্ডের foreign-currency অংশ চালু করুন",
      body: "Turn on the foreign-currency wallet or toggle, international e-commerce and 3D-Secure in the bank's app or by phone. Test with a small payment before the flight or hotel checkout.",
      bodyBn: "ব্যাংকের অ্যাপ বা ফোনে foreign-currency wallet/toggle, international e-commerce ও 3D-Secure চালু করুন। ফ্লাইট বা হোটেলের বড় পেমেন্টের আগে ছোট অঙ্কে পরীক্ষা করুন।",
    },
    {
      title: "Keep the endorsement page and the receipt",
      titleBn: "এনডোর্সমেন্ট পাতা ও রসিদ রাখুন",
      body: "The stamp and receipt are what the next branch, the airport folder and any later query will refer to. Photograph both before the passport goes to a visa desk.",
      bodyBn: "সিল ও রসিদই পরের শাখা, এয়ারপোর্টের ফাইল এবং পরে কোনো প্রশ্নে কাজে লাগবে। পাসপোর্ট ভিসা ডেস্কে দেওয়ার আগেই দুটির ছবি তুলে রাখুন।",
    },
  ],
};

export const BANKING_NOC_COPY = {
  heading: {
    en: "Where the NOC question actually belongs",
    bn: "NOC-এর প্রশ্নটি আসলে কোথায়",
  },
  paragraphs: [
    {
      en: "A No-Objection Certificate is not a foreign-exchange document, and none of the Bangladesh Bank circulars summarised on this page requires an NOC to endorse dollars. The NOC and GO questions belong to outbound immigration at Dhaka airport: some travellers are asked for profession proof — a private-sector employer's NOC, a government order (GO), a trade licence, or a student ID.",
      bn: "No-Objection Certificate কোনো foreign-exchange কাগজ নয়, আর এই পাতায় উল্লেখ করা বাংলাদেশ ব্যাংকের কোনো সার্কুলারেই ডলার এনডোর্স করার জন্য NOC লাগে না। NOC ও GO-র প্রশ্ন ঢাকা এয়ারপোর্টের outbound immigration-এর: কিছু যাত্রীকে পেশার প্রমাণ চাওয়া হয় — বেসরকারি চাকরিজীবীর ক্ষেত্রে নিয়োগকর্তার NOC, সরকারি কর্মচারীর ক্ষেত্রে GO, ব্যবসায়ীর ক্ষেত্রে trade licence, শিক্ষার্থীর ক্ষেত্রে student ID।",
    },
    {
      en: "The requirement is profession-specific and can change. Confirm it with your employer and the current airport instruction before you fly — not with a template bought online. If a bank asks for a separate letter, ask the branch to name the document and the rule behind it.",
      bn: "এই শর্ত পেশাভেদে আলাদা এবং বদলাতে পারে। উড়ার আগে নিয়োগকর্তা ও এয়ারপোর্টের বর্তমান নির্দেশনা থেকে নিশ্চিত হোন — অনলাইনে কেনা টেমপ্লেট থেকে নয়। ব্যাংক আলাদা কোনো চিঠি চাইলে শাখাকে কাগজটির নাম ও তার ভিত্তি জিজ্ঞেস করুন।",
    },
    {
      en: "Never buy, alter or borrow a certificate. A false document turns a fixable paperwork problem into an immigration offence.",
      bn: "কখনো কিনবেন না, বদলাবেন না, ধারও নেবেন না। ভুয়া কাগজ কাগজের ছোট সমস্যাকে ইমিগ্রেশন অপরাধে পরিণত করে।",
    },
  ],
  linkLabel: {
    en: "Dhaka airport outbound immigration checklist (NOC, GO and return ticket)",
    bn: "ঢাকা এয়ারপোর্ট outbound immigration চেকলিস্ট (NOC, GO ও return ticket)",
  },
  linkPath: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
};

export const BANKING_HUB_CLOSING = {
  en: "This hub is a map, not an approval. A bank can decline a release, a card can decline a merchant, and immigration can ask for a document you did not expect. Check the current circular or branch instruction before you commit money, and treat any figure here as the rule it cites, not a promise about your own application.",
  bn: "এই হাব একটি মানচিত্র, অনুমোদন নয়। ব্যাংক ছাড় না-ও দিতে পারে, কার্ড merchant-এ আটকাতে পারে, আর ইমিগ্রেশন এমন কাগজ চাইতে পারে যা আপনি ভাবেননি। টাকা দেওয়ার আগে বর্তমান সার্কুলার বা শাখার নির্দেশনা যাচাই করুন, আর এখানকার সংখ্যাকে তার সূত্রের নিয়ম হিসেবে দেখুন — নিজের আবেদনের নিশ্চয়তা হিসেবে নয়।",
};

/**
 * FAQ data lives in `bankingHubFaqs.ts` so that `src/App.tsx` can build the
 * runtime FAQPage schema without pulling this whole file into the eager bundle.
 * Re-exported here to keep this module the single import point for hub data.
 */
export { BANKING_HUB_FAQS } from "./bankingHubFaqs";
export type { BankingFaq } from "./bankingHubFaqs";

/** Cross-cluster links rendered under the node directory. */
export const BANKING_RELATED_HUBS = [
  {
    path: "/umrah",
    label: "Umrah cost and visa planning from Bangladesh",
    labelBn: "বাংলাদেশ থেকে ওমরাহ খরচ ও ভিসা পরিকল্পনা",
  },
  {
    path: "/tools?tab=currency",
    label: "Dual-currency card fee and markup calculator",
    labelBn: "ডুয়েল কারেন্সি কার্ড fee ও markup ক্যালকুলেটর",
  },
  {
    path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
    label: "Dhaka airport outbound immigration checklist",
    labelBn: "ঢাকা এয়ারপোর্ট outbound immigration চেকলিস্ট",
  },
];
