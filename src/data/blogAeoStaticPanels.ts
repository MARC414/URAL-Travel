import type { BlogAeoPanelRecord } from "../utils/blogAeoPanel";

/**
 * Essential Travel Insights panels for the hand-written Bangladesh articles.
 *
 * Articles that live in `content/blog/*.md` declare their panel in frontmatter
 * (validated by `scripts/scheduledPosts.ts`). The older hand-written posts are
 * compiled from `src/data/blogContent.ts`, so their panel copy lives here in the
 * same shape. Every entry is page-specific and every figure carries the date the
 * article checked it — the point of moving off the shared block was that one set
 * of facts cannot serve twenty different pages.
 *
 * `verify:build` asserts that each slug still exists in BLOG_DATA (no orphans),
 * that every entry has exactly three facts, and that each English value carries
 * a four-digit year and each Bengali value a Bengali-numeral year.
 */
export const STATIC_BLOG_AEO_PANELS: Record<string, BlogAeoPanelRecord> = {
  "hajj-registration-bangladesh-government-vs-private-package-cost": {
    audience: "bd",
    summary: {
      en: "The MoRA notice supplied for this update put Hajj 2027 primary registration between 27 July and 24 September 2026 and said the deadline would not be extended; as of 18 October 2026 that window has passed. Watch hajj.gov.bd for any later circular, because a reopening is announced there and not by agents. The sources supplied do not establish 2027 package prices at all, so no 2026 figure — government or private — is a current quote.",
      bn: "এই আপডেটে দেওয়া মন্ত্রণালয়ের নোটিশ অনুযায়ী হজ্জ ২০২৭-এর প্রাথমিক নিবন্ধন ছিল ২৭ জুলাই থেকে ২৪ সেপ্টেম্বর ২০২৬ পর্যন্ত, এবং সময় বাড়ানো হবে না বলে জানানো হয়; ১৮ অক্টোবর ২০২৬ পর্যন্ত সেই সুযোগ শেষ। নতুন কোনো সার্কুলার বা পুনরায় খোলার ঘোষণা এলে তা hajj.gov.bd-এ আসে, এজেন্টের মুখে নয় — তাই ওই পোর্টালই দেখতে হবে। এই সূত্রগুলো ২০২৭-এর প্যাকেজের দাম প্রতিষ্ঠা করে না, কাজেই ২০২৬ সালের কোনো অঙ্ক — সরকারি বা বেসরকারি — বর্তমান কোটেশন নয়।",
    },
    facts: [
      {
        label: "Hajj 2027 primary registration",
        labelBn: "হজ্জ ২০২৭ প্রাথমিক নিবন্ধন",
        value: "Ran 27 July to 24 September 2026 and was not extended — checked 18 Oct 2026",
        valueBn: "২৭ জুলাই থেকে ২৪ সেপ্টেম্বর ২০২৬ পর্যন্ত, বাড়ানো হয়নি — ১৮ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "Where a reopening appears",
        labelBn: "পুনরায় খোলার ঘোষণা কোথায়",
        value: "The official portal hajj.gov.bd, in a new circular — not an agent's message — checked 18 Oct 2026",
        valueBn: "অফিসিয়াল পোর্টাল hajj.gov.bd-এ নতুন সার্কুলারে, এজেন্টের বার্তায় নয় — ১৮ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "2027 package prices",
        labelBn: "২০২৭-এর প্যাকেজের দাম",
        value: "No published source establishes them; 2026 figures are historical, not quotes — checked 18 Oct 2026",
        valueBn: "কোনো প্রকাশিত সূত্র এগুলো প্রতিষ্ঠা করে না; ২০২৬ সালের অঙ্ক ঐতিহাসিক, কোটেশন নয় — ১৮ অক্টোবর ২০২৬-এ যাচাই",
      },
    ],
  },
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    audience: "bd",
    summary: {
      en: "Saudi Visa Bio enrollment is an instruction attached to your own visa application, not a step every traveller performs: the Ministry FAQ lists Bangladesh for biometric enrollment on electronically issued Umrah visas. Rawdah is a separate permit — regular booking is once a year, with a nearby Instant Track option subject to availability. The confirmation window opens 48 hours before the visit and closes two hours before it, and the checked page advises arriving 30 minutes early (checked 19 Oct 2026).",
      bn: "সৌদি ভিসা বায়ো নিবন্ধন আপনার নিজের ভিসা আবেদনের সঙ্গে যুক্ত নির্দেশ, প্রত্যেক যাত্রীর জন্য বাধ্যতামূলক ধাপ নয়: মন্ত্রণালয়ের FAQ-তে ইলেকট্রনিকভাবে ইস্যু করা ওমরাহ ভিসার জন্য বাংলাদেশকে বায়োমেট্রিক তালিকায় রাখা হয়েছে। রওদা আলাদা পারমিট — নিয়মিত বুকিং বছরেপ্রতি একবার, সঙ্গে কাছাকাছি সময়ের Instant Track বিকল্প (আসন থাকা সাপেক্ষে)। নিশ্চিতকরণ জানালা খোলে ভিজিটের ৪৮ ঘণ্টা আগে আর বন্ধ হয় দুই ঘণ্টা আগে; যাচাই করা পাতায় ৩০ মিনিট আগে পৌঁছানোর পরামর্শ আছে (১৯ অক্টোবর ২০২৬-এ যাচাই)।",
    },
    facts: [
      {
        label: "Who needs Saudi Visa Bio",
        labelBn: "কার সৌদি ভিসা বায়ো লাগে",
        value: "Only where your own visa application requires it; the Ministry FAQ lists Bangladesh for electronic Umrah visas — checked 19 Oct 2026",
        valueBn: "শুধু যেখানে নিজের ভিসা আবেদনে লাগে; ইলেকট্রনিক ওমরাহ ভিসার জন্য মন্ত্রণালয়ের FAQ-তে বাংলাদেশ তালিকাভুক্ত — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "Rawdah booking limit",
        labelBn: "রওদা বুকিংয়ের সীমা",
        value: "Regular Rawdah booking once a year, plus a separate Instant Track subject to availability — checked 19 Oct 2026",
        valueBn: "নিয়মিত রওদা বুকিং বছরেপ্রতি একবার, সঙ্গে আলাদা Instant Track (আসন থাকা সাপেক্ষে) — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "Confirmation window",
        labelBn: "নিশ্চিতকরণের জানালা",
        value: "Opens 48 hours before the visit, closes two hours before; arrive 30 minutes early — checked 19 Oct 2026",
        valueBn: "ভিজিটের ৪৮ ঘণ্টা আগে খোলে, দুই ঘণ্টা আগে বন্ধ; ৩০ মিনিট আগে পৌঁছান — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
    ],
  },
  "tawaf-sai-seven-circuits-step-by-step-guide": {
    audience: "bd",
    summary: {
      en: "Tawaf is seven circuits of the Kaaba anticlockwise, with the Kaaba on your left, beginning and ending in line with the Black Stone — a gate is the wrong place to start counting. Sa'i is seven one-way lengths between Safa and Marwa, not three and a half rounds, so the count is seven in both directions combined. Finishing with halq or taqsir is what lifts the Ihram restrictions, and the schools differ on details, so this page names the differences instead of deciding them (checked 2 Nov 2026).",
      bn: "তাওয়াফ হলো কাবার সাতটি চক্কর ঘড়ির কাঁটার বিপরীতে, কাবা বাঁ দিকে রেখে, শুরু ও শেষ হয় হাজরে আসওয়াদের বরাবর — গেট ধরে গোনা শুরু করলে ভুল হয়। সা'য়ি হলো সাফা ও মারওয়ার মধ্যে সাতটি একমুখী দৈর্ঘ্য, সাড়ে তিন চক্কর নয়; তাই দুই দিক মিলিয়ে গোনা সাত। হালক বা তাকসিরের মাধ্যমে ইহরামের নিষেধাজ্ঞা শেষ হয়, আর বিস্তারিত বিষয়ে মাযহাবভেদ আছে — এখানে সেগুলো চিহ্নিত করা হয়েছে, সিদ্ধান্ত চাপিয়ে দেওয়া হয়নি (২ নভেম্বর ২০২৬-এ যাচাই)।",
    },
    facts: [
      {
        label: "How tawaf is counted",
        labelBn: "তাওয়াফ কীভাবে গোনা হয়",
        value: "Seven circuits anticlockwise, Kaaba on your left, starting and ending in line with the Black Stone — checked 2 Nov 2026",
        valueBn: "সাত চক্কর ঘড়ির কাঁটার বিপরীতে, কাবা বাঁ দিকে, শুরু ও শেষ হাজরে আসওয়াদের বরাবর — ২ নভেম্বর ২০২৬-এ যাচাই",
      },
      {
        label: "How sa'i is counted",
        labelBn: "সা'য়ি কীভাবে গোনা হয়",
        value: "Seven one-way lengths between Safa and Marwa, not three and a half rounds — checked 2 Nov 2026",
        valueBn: "সাফা ও মারওয়ার মধ্যে সাতটি একমুখী দৈর্ঘ্য, সাড়ে তিন চক্কর নয় — ২ নভেম্বর ২০২৬-এ যাচাই",
      },
      {
        label: "What ends Ihram",
        labelBn: "ইহরাম কীভাবে শেষ হয়",
        value: "Halq or taqsir; school differences on the details are named, not decided — checked 2 Nov 2026",
        valueBn: "হালক বা তাকসির; বিস্তারিত মাযহাবভেদ চিহ্নিত করা হয়েছে, সিদ্ধান্ত চাপিয়ে দেওয়া হয়নি — ২ নভেম্বর ২০২৬-এ যাচাই",
      },
    ],
  },
  "hajj-rites-mina-arafah-muzdalifah-day-by-day": {
    audience: "bd",
    summary: {
      en: "The Ministry of Hajj and Umrah orders the rites as Mina on the 8th of Dhul-Hijjah, Arafah on the 9th, Muzdalifah overnight, then Jamrat al-Aqaba al-Kubra, the sacrifice, Tawaf Al-Ifadhah and the Sa'y of Hajj. The standing at Arafah is valid from the moment the sun passes its zenith on the 9th until dawn on the 10th. Leaving Mina on the 12th is nafar awwal — five days; staying for the 13th is nafar thani — six days, one more night and 21 pebbles (checked 2 Nov 2026).",
      bn: "হজ্জ ও ওমরাহ মন্ত্রণালয়ের ক্রম অনুযায়ী ৮ জিলহজ মিনা, ৯ জিলহজ আরাফাহ, রাত মিনার বদলে মুজদালিফায়, তারপর জামরাতুল আকাবা আল-কুবরা, কুরবানি, তাওয়াফুল ইফাদা ও হজ্জের সা'য়ি। আরাফাহতে অবস্থান বৈধ হয় ৯ তারিখে সূর্য ঢালু হওয়ার পর থেকে ১০ তারিখের ফজর পর্যন্ত। ১২ তারিখে মিনা ছাড়া হলে তা নাফার আউয়াল — পাঁচ দিন; ১৩ তারিখ পর্যন্ত থাকলে নাফার সানি — ছয় দিন, আরও এক রাত ও ২১টি কঙ্কর (২ নভেম্বর ২০২৬-এ যাচাই)।",
    },
    facts: [
      {
        label: "The published day order",
        labelBn: "প্রকাশিত দিনের ক্রম",
        value: "Mina 8th, Arafah 9th, Muzdalifah overnight, then Jamrat al-Aqaba, sacrifice, Tawaf Al-Ifadhah and Sa'y — checked 2 Nov 2026",
        valueBn: "৮ মিনা, ৯ আরাফাহ, রাত মুজদালিফা, তারপর জামরাতুল আকাবা, কুরবানি, তাওয়াফুল ইফাদা ও সা'য়ি — ২ নভেম্বর ২০২৬-এ যাচাই",
      },
      {
        label: "Arafah standing window",
        labelBn: "আরাফাহ অবস্থানের সময়",
        value: "From the sun passing its zenith on the 9th until dawn on the 10th — checked 2 Nov 2026",
        valueBn: "৯ তারিখে সূর্য ঢালু হওয়া থেকে ১০ তারিখের ফজর পর্যন্ত — ২ নভেম্বর ২০২৬-এ যাচাই",
      },
      {
        label: "Five days or six",
        labelBn: "পাঁচ দিন না ছয় দিন",
        value: "Leaving on the 12th is nafar awwal; staying for the 13th is nafar thani, one more night and 21 pebbles — checked 2 Nov 2026",
        valueBn: "১২ তারিখে রওনা মানে নাফার আউয়াল; ১৩ তারিখ পর্যন্ত থাকা মানে নাফার সানি — আরও এক রাত ও ২১টি কঙ্কর — ২ নভেম্বর ২০২৬-এ যাচাই",
      },
    ],
  },
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": {
    audience: "bd",
    summary: {
      en: "No authority publishes a Ziyarah taxi tariff in Makkah, Madinah, Taif or Badr, so every fare in this guide is an indicator you confirm before you drive. The Hira museums publish three different schedules and all three are printed here; a Saudi Press Agency report of 31 July 2026 says the museums run around the clock except Friday 07:00–15:30. Visit Saudi lists the Revelation Exhibition from SAR 25 per person, which is a floor, not a total, and the Madinah bus is SR 90 for 24 hours (sources opened 19 Oct 2026).",
      bn: "মক্কা, মদিনা, তায়েফ বা বদরে জিয়ারাহ ট্যাক্সির কোনো সরকারি ট্যারিফ প্রকাশিত নেই, তাই এখানকার প্রতিটি ভাড়া কেবল সংকেত — গাড়িতে ওঠার আগে নিশ্চিত করতে হবে। হেরা জাদুঘর তিনটি আলাদা সময়সূচি প্রকাশ করে, তিনটিই এখানে ছাপা আছে; ৩১ জুলাই ২০২৬-এর সৌদি প্রেস এজেন্সির প্রতিবেদন অনুযায়ী শুক্রবার ০৭:০০–১৫:৩০ বাদে জাদুঘর চব্বিশ ঘণ্টা খোলা। Visit Saudi রিভিলেশন এক্সিবিশনের দাম বলে 'জনপ্রতি SAR ২৫ থেকে', যা সর্বনিম্ন, মোট নয়; মদিনার বাস ২৪ ঘণ্টার জন্য SR ৯০ (সূত্র ১৯ অক্টোবর ২০২৬-এ খোলা হয়েছে)।",
    },
    facts: [
      {
        label: "Hira museum hours",
        labelBn: "হেরা জাদুঘরের সময়",
        value: "Three published schedules exist; an SPA report of 31 July 2026 says round the clock except Friday 07:00–15:30 — checked 19 Oct 2026",
        valueBn: "তিনটি সময়সূচি প্রকাশিত; ৩১ জুলাই ২০২৬-এর এসপিএ প্রতিবেদনে শুক্রবার ০৭:০০–১৫:৩০ বাদে চব্বিশ ঘণ্টা — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "Revelation Exhibition ticket",
        labelBn: "রিভিলেশন এক্সিবিশনের টিকিট",
        value: "Visit Saudi lists 'from SAR 25 per person' — a floor, not a total — checked 19 Oct 2026",
        valueBn: "Visit Saudi বলে 'জনপ্রতি SAR ২৫ থেকে' — সর্বনিম্ন দাম, মোট নয় — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "Madinah bus pass",
        labelBn: "মদিনার বাস পাস",
        value: "SR 90 for 24 hours on the Madinah bus — checked 19 Oct 2026",
        valueBn: "মদিনার বাসে ২৪ ঘণ্টার জন্য SR ৯০ — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
    ],
  },
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": {
    audience: "bd",
    summary: {
      en: "A ten-day Umrah plus UAE trip needs two authorisations before you leave Dhaka: one Saudi entry route (chosen from the routes your passport is actually eligible for) and one UAE entry route — either the 96-hour transit visa when flying Emirates or flydubai, or a 30-day tourist e-visa for a longer stay on mixed carriers. Compare a multi-city ticket against two separate returns on the same dates, baggage and change terms. The entry window and permitted stay are the dates printed on your own visa (checked 15 Oct 2026).",
      bn: "দশ দিনের ওমরাহ ও আমিরাত ভ্রমণে ঢাকা ছাড়ার আগে দুটি অনুমোদন লাগে: একটি সৌদি প্রবেশ রুট (আপনার পাসপোর্ট আসলে যে রুটে যোগ্য, তা থেকে বাছা) আর একটি আমিরাত প্রবেশ রুট — এমিরেটস বা ফ্লাইদুবাইয়ে গেলে ৯৬ ঘণ্টার ট্রানজিট ভিসা, নয়তো মিশ্র এয়ারলাইন্সে দীর্ঘ থাকায় ৩০ দিনের ট্যুরিস্ট ই-ভিসা। একই তারিখ, লাগেজ ও পরিবর্তনের শর্তে মাল্টি-সিটি টিকিট আর দুটি আলাদা রিটার্ন টিকিট পাশাপাশি মিলিয়ে দেখুন। প্রবেশের সময়সীমা ও অনুমোদিত অবস্থান আপনার নিজের ভিসায় ছাপা তারিখ (১৫ অক্টোবর ২০২৬-এ যাচাই)।",
    },
    facts: [
      {
        label: "Two authorisations, in this order",
        labelBn: "দুটি অনুমোদন, এই ক্রমে",
        value: "One Saudi entry route and one UAE entry route, both before departure from Dhaka — checked 15 Oct 2026",
        valueBn: "একটি সৌদি প্রবেশ রুট ও একটি আমিরাত প্রবেশ রুট, দুটোই ঢাকা ছাড়ার আগে — ১৫ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "UAE transit vs tourist visa",
        labelBn: "আমিরাত ট্রানজিট বনাম ট্যুরিস্ট ভিসা",
        value: "96-hour transit visa on Emirates or flydubai; 30-day tourist e-visa for longer or mixed-carrier stays — checked 15 Oct 2026",
        valueBn: "এমিরেটস বা ফ্লাইদুবাইয়ে ৯৬ ঘণ্টার ট্রানজিট ভিসা; দীর্ঘ বা মিশ্র ক্যারিয়ারে ৩০ দিনের ট্যুরিস্ট ই-ভিসা — ১৫ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "How to price the flights",
        labelBn: "ফ্লাইটের দাম কীভাবে দেখবেন",
        value: "One multi-city ticket against two separate returns, same dates, baggage and change terms — checked 15 Oct 2026",
        valueBn: "এক মাল্টি-সিটি টিকিট বনাম দুটি আলাদা রিটার্ন, একই তারিখ, লাগেজ ও পরিবর্তনের শর্ত — ১৫ অক্টোবর ২০২৬-এ যাচাই",
      },
    ],
  },
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": {
    audience: "bd",
    summary: {
      en: "The mosque entry itself is free and runs on the Sheikh Zayed Grand Mosque Centre's own access pass, so book that rather than a paid 'entry' from a reseller. From Dubai, RTA's E100 intercity coach from Al Ghubaiba to Abu Dhabi costs AED 25 each way on a Nol card, and local Bus 094 from Al Wahda reaches the mosque for AED 2. The centre no longer lends abayas at the gate, so bring your own or buy one underground. Check each attraction's opening days before you build a combined day (guide published 27 Sep 2026).",
      bn: "মসজিদে ঢোকার টিকিট ফ্রি, আর তা শেখ জায়েদ গ্র্যান্ড মস্ক সেন্টারের নিজস্ব অ্যাক্সেস পাসে — রিসেলারের 'এন্ট্রি' টিকিট নয়, এটাই নিন। দুবাই থেকে আরটিএ'র E100 ইন্টারসিটি কোচ আল গুবাইবা থেকে আবুধাবি পর্যন্ত নোল কার্ডে একদিকে AED ২৫, আর আল ওয়াহদা থেকে লোকাল বাস ০৯৪-এ AED ২-এ মসজিদ। গেটে এখন আরাক ফ্রি দেয় না, তাই নিজের আনুন বা ভূগর্ভস্থ বাজারে কিনুন। একদিনে একাধিক দর্শনীয় স্থান সাজানোর আগে প্রতিটির খোলা-বন্ধের দিন যাচাই করুন (গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬)।",
    },
    facts: [
      {
        label: "Mosque entry",
        labelBn: "মসজিদে প্রবেশ",
        value: "Free, through the Sheikh Zayed Grand Mosque Centre access pass — guide published 27 Sep 2026",
        valueBn: "ফ্রি, শেখ জায়েদ গ্র্যান্ড মস্ক সেন্টারের অ্যাক্সেস পাস দিয়ে — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
      {
        label: "Dubai to Abu Dhabi fare",
        labelBn: "দুবাই থেকে আবুধাবি ভাড়া",
        value: "RTA E100 coach AED 25 each way by Nol card, then Bus 094 for AED 2 — guide published 27 Sep 2026",
        valueBn: "আরটিএ E100 কোচ নোল কার্ডে একদিকে AED ২৫, তারপর বাস ০৯৪-এ AED ২ — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
      {
        label: "Dress code at the gate",
        labelBn: "গেটে পোশাকের নিয়ম",
        value: "No free abaya loans now; buy one underground from AED 45 or bring your own — guide published 27 Sep 2026",
        valueBn: "এখন আরাক ফ্রি পাওয়া যায় না; ভূগর্ভস্থ বাজারে AED ৪৫ থেকে কিনুন বা নিজের আনুন — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
    ],
  },
  "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": {
    audience: "bd",
    summary: {
      en: "Putrajaya sits about 30 km south of Kuala Lumpur on the way to KLIA, and the Pink Mosque (Masjid Putra) plus the lakeside are the cheapest half-day in the city: MYR 6 covers the mosque visit and the lake front. From Putrajaya Sentral a short Grab ride reaches Dataran Putra, and the air-conditioned lake cruise or the wooden boat leaves from beside the mosque courtyard. Halal is the national baseline in Malaysia, but certification is per premises, so check JAKIM rather than assuming a food court is covered (guide published 27 Sep 2026).",
      bn: "পুত্রজায়া কুয়ালালামপুরের প্রায় ৩০ কিমি দক্ষিণে, কেএলআইএর পথে; গোলাপি মসজিদ (মাসজিদ পুত্রা) ও লেকের ধারই শহরের সবচেয়ে সস্তা অর্ধদিন — MYR ৬-এ মসজিদ ও লেকফ্রন্ট। পুত্রজায়া সেন্ট্রাল থেকে অল্প Grab-এ দাতারান পুত্রা, আর শীতাতপ নিয়ন্ত্রিত লেক ক্রুজ বা কাঠের নৌকা ছাড়ে মসজিদের উঠানের পাশ থেকে। মালয়েশিয়ায় হালাল জাতীয় ভিত্তি, কিন্তু সনদ প্রতিষ্ঠানভিত্তিক — তাই ফুড কোর্ট ধরে নয়, JAKIM দেখে যাচাই করুন (গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬)।",
    },
    facts: [
      {
        label: "Cheapest half-day",
        labelBn: "সবচেয়ে সস্তা অর্ধদিন",
        value: "Pink Mosque and the Putrajaya lakefront for about MYR 6 — guide published 27 Sep 2026",
        valueBn: "গোলাপি মসজিদ ও পুত্রজায়ার লেকফ্রন্ট প্রায় MYR ৬-এ — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
      {
        label: "Getting there",
        labelBn: "সেখানে যাওয়া",
        value: "30 km south of Kuala Lumpur; Grab from Putrajaya Sentral to Dataran Putra — guide published 27 Sep 2026",
        valueBn: "কুয়ালালামপুরের ৩০ কিমি দক্ষিণে; পুত্রজায়া সেন্ট্রাল থেকে দাতারান পুত্রায় Grab — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
      {
        label: "Halal check",
        labelBn: "হালাল যাচাই",
        value: "Certification is per premises; check JAKIM rather than assuming a food court — guide published 27 Sep 2026",
        valueBn: "সনদ প্রতিষ্ঠানভিত্তিক; ফুড কোর্ট ধরে না নিয়ে JAKIM-এ যাচাই করুন — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
    ],
  },
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": {
    audience: "bd",
    summary: {
      en: "Book sightseeing through the venue's own timed-entry system or an official partner, and treat a third-party 'skip the line' promise as a claim to verify on the venue's site. A foreign visa in your passport does not decide Saudi entry: if you add a Saudi stopover, check the Saudi eligibility route separately, because a tourist visa elsewhere guarantees nothing at King Khalid or Jeddah. For delays, EU 261/2004 and UK261 can be worth up to €600 per passenger, but only on the covered routes and conditions printed in the regulation (guide published 27 Sep 2026).",
      bn: "দর্শনীয় স্থানের টিকিট নিন তাদের নিজস্ব সময়-নির্ধারিত এন্ট্রি সিস্টেম বা অফিসিয়াল পার্টনারের মাধ্যমে; তৃতীয় পক্ষের 'স্কিপ দ্য লাইন' প্রতিশ্রুতিটা দর্শনীয় স্থানের সাইটে যাচাই করে নিন। পাসপোর্টে অন্য দেশের ভিসা সৌদি প্রবেশ ঠিক করে না: সৌদি স্টপওভার যোগ করলে সৌদি যোগ্যতার রুট আলাদা করে দেখুন, কারণ অন্য দেশের ট্যুরিস্ট ভিসা কিং খালিদ বা জেদ্দায় কিছুই নিশ্চিত করে না। ফ্লাইট বিলম্বে EU 261/2004 ও UK261 অনুযায়ী যাত্রীপ্রতি €৬০০ পর্যন্ত পাওয়া যেতে পারে, তবে কেবল নিয়মে লেখা রুট ও শর্তে (গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬)।",
    },
    facts: [
      {
        label: "Skip-the-line tickets",
        labelBn: "স্কিপ-দ্য-লাইন টিকিট",
        value: "Buy from the venue's own timed entry or an official partner; verify any reseller promise on the venue site — guide published 27 Sep 2026",
        valueBn: "দর্শনীয় স্থানের নিজস্ব সময়-নির্ধারিত এন্ট্রি বা অফিসিয়াল পার্টনার থেকে কিনুন; রিসেলারের প্রতিশ্রুতি দর্শনীয় স্থানের সাইটে যাচাই করুন — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
      {
        label: "Saudi stopover is a separate check",
        labelBn: "সৌদি স্টপওভার আলাদা যাচাই",
        value: "A visa for another country does not establish Saudi eligibility or entry — guide published 27 Sep 2026",
        valueBn: "অন্য দেশের ভিসা সৌদি যোগ্যতা বা প্রবেশ প্রতিষ্ঠা করে না — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
      {
        label: "Delay compensation ceiling",
        labelBn: "বিলম্বের ক্ষতিপূরণের সীমা",
        value: "Up to EUR 600 per passenger under EU 261/2004 and UK261, on the covered routes and conditions — guide published 27 Sep 2026",
        valueBn: "EU 261/2004 ও UK261 অনুযায়ী যাত্রীপ্রতি EUR ৬০০ পর্যন্ত, কেবল নির্ধারিত রুট ও শর্তে — গাইড প্রকাশ ২৭ সেপ্টেম্বর ২০২৬",
      },
    ],
  },
  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": {
    audience: "bd",
    summary: {
      en: "Halal is the national baseline in Saudi Arabia — the SFDA has stated that all food sold in the Kingdom is halal, and alcohol and pork are prohibited imports — so the question is hygiene and familiarity, not halal status. The documented South Asian cluster sits along Hijra Road and Ibrahim Khaleel Road in Misfalah, where 2026 reporting found Bengali and Urdu signage. This page deliberately prints no per-plate price and names no restaurant: pay in riyals, check the Balady health certificate rather than a 2024 blog (checked 19 Oct 2026).",
      bn: "সৌদি আরবে হালাল জাতীয় ভিত্তি — এসএফডিএ জানিয়েছে দেশে বিক্রীত সব খাবার হালাল, আর অ্যালকোহল ও শূকরের মাংস আমদানি নিষিদ্ধ — তাই প্রশ্ন হালাল অবস্থা নয়, পরিচ্ছন্নতা ও চেনা স্বাদ। দক্ষিণ এশীয় খাবারের চিহ্নিত ক্লাস্টার মিসফালার হিজরা রোড ও ইব্রাহিম খলিল রোডে, যেখানে ২০২৬ সালের প্রতিবেদনে বাংলা ও উর্দু সাইনবোর্ড পাওয়া গেছে। এই পাতায় ইচ্ছাকৃতভাবে প্লেটপ্রতি দাম নেই, কোনো রেস্টুরেন্টের নামও নেই: রিয়ালে পরিশোধ করুন, ২০২৪ সালের ব্লগ নয় — বালাদি স্বাস্থ্য সনদ দেখুন (১৯ অক্টোবর ২০২৬-এ যাচাই)।",
    },
    facts: [
      {
        label: "Halal status",
        labelBn: "হালাল অবস্থা",
        value: "SFDA: all food sold in the Kingdom is halal; alcohol and pork are prohibited imports — checked 19 Oct 2026",
        valueBn: "এসএফডিএ: দেশে বিক্রীত সব খাবার হালাল; অ্যালকোহল ও শূকরের মাংস আমদানি নিষিদ্ধ — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "Where South Asian kitchens cluster",
        labelBn: "দক্ষিণ এশীয় রান্না কোথায়",
        value: "Hijra Road and Ibrahim Khaleel Road in Misfalah, with Bengali and Urdu signage — checked 19 Oct 2026",
        valueBn: "মিসফালার হিজরা রোড ও ইব্রাহিম খলিল রোড, বাংলা ও উর্দু সাইনবোর্ডসহ — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
      {
        label: "What to check, not assume",
        labelBn: "কী যাচাই করবেন",
        value: "Hygiene via the Balady health certificate; this page prints no per-plate price — checked 19 Oct 2026",
        valueBn: "পরিচ্ছন্নতা — বালাদি স্বাস্থ্য সনদে; এই পাতায় প্লেটপ্রতি দাম নেই — ১৯ অক্টোবর ২০২৬-এ যাচাই",
      },
    ],
  },
};
