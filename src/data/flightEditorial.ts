import type { FlightRoute, FAQ } from "../types";
import { FLIGHT_ROUTES } from "./flightRoutes";

// Route copy deliberately avoids fixed schedules, booking windows, visa decisions
// and baggage allowances that cannot be kept current without a dated source.
const entry: Record<string, { en: string; bn: string }> = {
  "dhaka-kathmandu": { en: "Nepal has a SAARC gratis visa provision for eligible travellers. Check your own eligibility and the latest arrival requirements with Nepal Immigration.", bn: "যোগ্য ভ্রমণকারীদের জন্য নেপালে SAARC gratis visa-এর ব্যবস্থা রয়েছে। আপনার যোগ্যতা ও আগমনের বর্তমান শর্ত Nepal Immigration-এ যাচাই করুন।" },
  "ktm-dhaka": { en: "Bangladeshi citizens returning to Bangladesh and foreign passport holders have different entry requirements. Check Bangladesh's current immigration guidance for your passport.", bn: "বাংলাদেশে ফেরা বাংলাদেশি নাগরিক ও বিদেশি পাসপোর্টধারীর প্রবেশের শর্ত এক নয়। নিজের পাসপোর্ট অনুযায়ী বাংলাদেশের বর্তমান অভিবাসন নির্দেশনা দেখুন।" },
  "dhaka-bangkok": { en: "For Bangladeshi tourist travel, review the official portal (thaievisa.go.th) for Thailand's e-Visa and current Dhaka mission instructions before booking.", bn: "বাংলাদেশি পাসপোর্টে পর্যটন ভ্রমণের আগে Thailand-এর সরকারি e-Visa portal ও ঢাকা মিশনের বর্তমান নির্দেশনা দেখুন।" },
  "dhaka-kuala-lumpur": { en: "Check Malaysia's official visa and arrival declaration requirements for your passport and travel purpose; processing and approval are not guaranteed.", bn: "আপনার পাসপোর্ট ও ভ্রমণের উদ্দেশ্য অনুযায়ী মালয়েশিয়ার সরকারি ভিসা ও arrival declaration-এর শর্ত দেখুন। প্রসেসিং সময় বা অনুমোদন নিশ্চিত নয়।" },
  "dhaka-dubai": { en: "Check UAE entry and transit requirements for your passport and itinerary with the relevant authority or airline before booking.", bn: "বুকিংয়ের আগে আপনার পাসপোর্ট ও যাত্রাপথ অনুযায়ী UAE-এর প্রবেশ ও ট্রানজিটের নিয়ম সংশ্লিষ্ট কর্তৃপক্ষ বা এয়ারলাইনের কাছে যাচাই করুন।" },
  "dhaka-singapore": { en: "Check Singapore ICA's visa and SG Arrival Card instructions for your passport and travel dates; the arrival card is separate from a visa.", bn: "আপনার পাসপোর্ট ও তারিখ অনুযায়ী Singapore ICA-এর ভিসা ও SG Arrival Card নির্দেশনা দেখুন। Arrival Card ভিসা থেকে আলাদা।" },
  "dhaka-maldives": { en: "Check Maldives Immigration's tourist entry and IMUGA declaration instructions, including the current timing and supporting documents, before departure.", bn: "রওনা হওয়ার আগে Maldives Immigration-এর পর্যটক প্রবেশ ও IMUGA declaration-এর বর্তমান সময়সীমা ও প্রয়োজনীয় নথি দেখুন।" },
  "dhaka-los-angeles": { en: "Bangladeshi passport holders should check the appropriate US visa category and current application requirements with the US State Department. Transit rules depend on the connection and passport.", bn: "বাংলাদেশি পাসপোর্টে উপযুক্ত US ভিসার ধরন ও আবেদনের বর্তমান শর্ত US State Department-এ দেখুন। ট্রানজিটের নিয়ম পাসপোর্ট ও সংযোগের ওপর নির্ভর করে।" },
  "dhaka-madinah": { en: "Check the Saudi visa route for your passport, purpose and circumstances. Some travellers may qualify through other documents; do not assume a particular application method or approval.", bn: "আপনার পাসপোর্ট, ভ্রমণের উদ্দেশ্য ও পরিস্থিতি অনুযায়ী সৌদি ভিসার পথ যাচাই করুন। অন্য দেশের যোগ্য নথি থাকলে কিছু ভ্রমণকারীর জন্য ভিন্ন পথ থাকতে পারে; আবেদনপদ্ধতি বা অনুমোদন নিশ্চিত ধরে নেবেন না।" },
};

export function flightEditorial(route: Pick<FlightRoute, "id" | "from" | "to">, lang: "en" | "bn") {
  const info = FLIGHT_ROUTES[route.id];
  const rule = entry[route.id];
  if (!info || !rule) return null;
  const from = lang === "bn" ? info.fromBn : route.from.split(" (")[0];
  const to = lang === "bn" ? info.toBn : route.to.split(" (")[0];
  const bn = lang === "bn";
  const routeName = `${from} (${info.origin}) → ${to} (${info.destination})`;
  const connection = route.id === "dhaka-los-angeles"
    ? (bn ? "এই দীর্ঘ যাত্রায় সংযোগের বিকল্প, মোট সময় ও ট্রানজিটের শর্ত যাচাই করুন।" : "For this long-haul journey, check connections, total travel time and transit requirements.")
    : (bn ? "সরাসরি ও সংযোগী বিকল্পের প্রাপ্যতা এবং অপারেটিং এয়ারলাইন তারিখ অনুযায়ী যাচাই করুন।" : "Check which nonstop or connecting options and operating airlines are available for your dates.");
  const quickAnswer = bn
    ? `${routeName} রুটে নিজের তারিখের মোট ভাড়া, যাত্রার সময় ও ব্যাগেজ তুলনা করুন। ${connection} ${rule.bn}`
    : `Compare total fares, journey times and baggage for ${routeName} on your own dates. ${connection} ${rule.en}`;
  const faqs: FAQ[] = bn ? [
    { question: `${from} থেকে ${to} ফ্লাইট কীভাবে তুলনা করব?`, answer: "একই তারিখ, যাত্রীসংখ্যা ও ব্যাগেজ ধরে মোট মূল্য তুলনা করুন। সিট, পেমেন্ট ও পরিবর্তনের ফি এবং বাতিলের শর্তও দেখুন।" },
    { question: "এই রুটে সরাসরি ফ্লাইট আছে কি?", answer: `${connection} সময়সূচি ও প্রতিটি সেগমেন্টের বিমানবন্দর এয়ারলাইন বা বুকিং সাইটে নিশ্চিত করুন।` },
    { question: "কত আগে টিকিট কাটলে সবচেয়ে কম দাম পাব?", answer: "নির্দিষ্ট কোনো সময় কম দামের নিশ্চয়তা দেয় না। আগেভাগে ও একাধিক তারিখে ভাড়া দেখুন; সিদ্ধান্তের আগে সম্পূর্ণ বুকিং শর্ত মিলিয়ে নিন।" },
    { question: "কোন ভিসা ও ভ্রমণ নথি লাগবে?", answer: `${rule.bn} পাসপোর্ট, যাত্রার উদ্দেশ্য ও ট্রানজিট অনুযায়ী শর্ত ভিন্ন হতে পারে।` },
    { question: "ব্যাগেজ ও কানেকশন সম্পর্কে কী দেখব?", answer: "প্রতিটি সেগমেন্টের ব্যাগেজ সীমা, একই টিকিটে আছে কি না, ট্রানজিটের নিয়ম এবং সংযোগ মিস হলে কী হবে যাচাই করুন।" },
  ] : [
    { question: `How do I compare flights from ${from} to ${to}?`, answer: "Compare the total for the same dates, passengers and baggage. Check seat and payment charges, change fees and cancellation terms too." },
    { question: "Are nonstop flights available on this route?", answer: `${connection} Confirm the schedule and airport for each segment with the airline or booking provider.` },
    { question: "How far ahead should I book for the lowest fare?", answer: "No fixed booking window guarantees the lowest price. Start checking early, compare several dates and review the full booking terms before deciding." },
    { question: "What visa and travel documents do I need?", answer: `${rule.en} Requirements can differ by passport, travel purpose and transit.` },
    { question: "What should I check about baggage and connections?", answer: "Check the baggage allowance for each segment, whether flights are on one ticket, transit rules and what happens if a connection is missed." },
  ];
  if (route.id === "dhaka-bangkok") faqs.push(bn
    ? { question: "ব্যাংককের কোন বিমানবন্দরে পৌঁছাব?", answer: "Bangkok-এ BKK ও DMK দুটি বিমানবন্দর আছে। সার্চে শুরুতে BKK থাকে; DMK চাইলে বদলান এবং টিকিটের airport code মিলিয়ে নিন।" }
    : { question: "Which Bangkok airport will I arrive at?", answer: "Bangkok has BKK and DMK airports. The search starts at BKK; change it if you want DMK and check the airport code on your ticket." });
  if (route.id === "dhaka-madinah") faqs.push(bn
    ? { question: "মদিনা থেকে মক্কা যাওয়ার পরিকল্পনা কীভাবে করব?", answer: "যাতায়াতের আগে আপনার ভিসা ও প্রযোজ্য মৌসুমি নিয়ম যাচাই করুন। ট্রেন বা সড়কপথের বর্তমান সময়সূচি ও বুকিং শর্ত দেখুন।" }
    : { question: "How should I plan travel from Madinah to Makkah?", answer: "Check your visa and applicable seasonal rules before travel, then review current train or road schedules and booking conditions." });
  return { quickAnswer, faqs, visaRequirement: rule[lang],
    duration: bn ? "নিজের তারিখের যাত্রাসূচি দেখুন" : "Check your itinerary for the journey time",
    bestTimeToBook: bn ? "একাধিক তারিখের ভাড়া তুলনা করুন" : "Compare fares across dates",
    keyFacts: bn ? [
      { label: "রুট", value: routeName }, { label: "যাত্রার সময়", value: "আপনার তারিখের যাত্রাসূচি দেখুন" },
      { label: "ভাড়া", value: "বর্তমান মোট ভাড়া তুলনা করুন" }, { label: "প্রবেশের নিয়ম", value: "পাসপোর্ট ও ভ্রমণের উদ্দেশ্য অনুযায়ী যাচাই করুন" },
    ] : [
      { label: "Route", value: routeName }, { label: "Journey time", value: "Check the itinerary for your dates" },
      { label: "Fares", value: "Compare current totals" }, { label: "Entry rules", value: "Check for your passport and purpose" },
    ],
  };
}
