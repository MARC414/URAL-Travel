import { ArrowUpRight } from "lucide-react";
import type { HotelGuide } from "../types";
import { getHotelGuideDestinationImage } from "../data/hotelGuideDestinations";
import { ResponsiveImage } from "./ResponsiveImage";

const BN_CITIES: Record<string, string> = {
  "kathmandu-hotels": "কাঠমান্ডু", "bangkok-hotels": "ব্যাংকক", "kuala-lumpur-hotels": "কুয়ালালামপুর",
  "dubai-hotels": "দুবাই", "singapore-hotels": "সিঙ্গাপুর", "maldives-hotels": "মালদ্বীপ",
};
const BN_STAY_TITLES: Record<string, string> = {
  "kathmandu-hotels": "কাঠমান্ডুতে", "bangkok-hotels": "ব্যাংককে", "kuala-lumpur-hotels": "কুয়ালালামপুরে",
  "dubai-hotels": "দুবাইয়ে", "singapore-hotels": "সিঙ্গাপুরে", "maldives-hotels": "মালদ্বীপে",
};
const BN_COUNTRIES: Record<string, string> = {
  Nepal: "নেপাল", Thailand: "থাইল্যান্ড", Malaysia: "মালয়েশিয়া", UAE: "সংযুক্ত আরব আমিরাত",
  Singapore: "সিঙ্গাপুর", Maldives: "মালদ্বীপ",
};

const SUMMARIES: Record<string, { en: string; bn: string }> = {
  "kathmandu-hotels": {
    en: "Compare Thamel, Boudha and Lazimpat as bases for exploring Kathmandu. Consider the pace of each area, your itinerary and transport needs before selecting a property. Check the exact address, current total, room details and cancellation terms for your dates rather than relying on a fixed nightly price.",
    bn: "কাঠমান্ডু ঘুরে দেখার জন্য থামেল, বৌদ্ধ ও লাজিমপাটের থাকার পরিবেশ তুলনা করুন। ভ্রমণসূচি ও যাতায়াতের প্রয়োজনের সঙ্গে কোন এলাকা মেলে, তা বিবেচনা করে হোটেল বেছে নিন। বুকিংয়ের আগে সঠিক ঠিকানা, আপনার তারিখের মোট খরচ, রুমের বিবরণ ও বাতিলের শর্ত যাচাই করুন।",
  },
  "bangkok-hotels": {
    en: "Compare Pratunam, Sukhumvit and Khao San Road for a Bangkok stay that fits your plans. Weigh shopping, transit, nightlife and noise against your own preferences. Before booking, compare current listings for the same dates and guests, and check the total cost and room and cancellation conditions.",
    bn: "ব্যাংককে প্রতুনাম, সুখুমভিত ও খাও সান রোডের থাকার এলাকা আপনার পরিকল্পনার সঙ্গে মিলিয়ে দেখুন। কেনাকাটা, যাতায়াত, রাতের পরিবেশ ও শব্দের মাত্রা নিজের পছন্দ অনুযায়ী তুলনা করুন। একই তারিখ ও অতিথিসংখ্যা দিয়ে বর্তমান বিকল্প দেখুন এবং মোট দাম, রুম ও বাতিলের শর্ত যাচাই করুন।",
  },
  "kuala-lumpur-hotels": {
    en: "Explore KLCC, Bukit Bintang and Chinatown before choosing a base in Kuala Lumpur. Compare access to your itinerary, transit and dining, as well as the room setup you need. Check current full totals and cancellation conditions for matching dates, guests and inclusions instead of assuming a fixed rate.",
    bn: "কুয়ালালামপুরে থাকার জায়গা বেছে নেওয়ার আগে কেএলসিসি, বুকিত বিনতাং ও চায়নাটাউন তুলনা করুন। আপনার ভ্রমণসূচি, যাতায়াত, খাবার এবং প্রয়োজনীয় রুমের ধরন বিবেচনায় রাখুন। একই তারিখ, অতিথিসংখ্যা ও সুবিধা ধরে বর্তমান মোট দাম এবং বাতিলের শর্ত যাচাই করুন; স্থির ভাড়া ধরে নেবেন না।",
  },
  "dubai-hotels": {
    en: "Plan your Dubai base around the places you want to visit and the transport you intend to use. This guide compares neighborhoods and the practical trade-offs between them. Check a property's exact location, room inclusions, current checkout total and cancellation policy for your dates before committing.",
    bn: "দুবাইয়ে কোথায় থাকবেন তা ঠিক করুন আপনার দর্শনীয় স্থান ও যাতায়াতের পরিকল্পনা অনুযায়ী। এই গাইডে বিভিন্ন এলাকার সুবিধা ও আপসের বিষয় তুলনা করা হয়েছে। বুকিং নিশ্চিত করার আগে হোটেলের সঠিক অবস্থান, রুমে কী অন্তর্ভুক্ত, আপনার তারিখের মোট মূল্য ও বাতিলের নিয়ম দেখে নিন।",
  },
  "singapore-hotels": {
    en: "Compare Singapore neighborhoods with your sightseeing plans and preferred access to public transport in mind. The guide helps you assess different areas rather than promising a particular hotel or price. For your dates, verify the address, room setup, final total and cancellation terms before you book.",
    bn: "সিঙ্গাপুরে কোথায় থাকবেন তা বেছে নিতে দর্শনীয় স্থান ও গণপরিবহনে যাতায়াতের সুবিধা ধরে বিভিন্ন এলাকা তুলনা করুন। এই গাইড নির্দিষ্ট হোটেল বা দাম নিশ্চিত করে না; এলাকার পার্থক্য বুঝতে সাহায্য করে। বুকিংয়ের আগে ঠিকানা, রুমের ব্যবস্থা, আপনার তারিখের মোট খরচ ও বাতিলের শর্ত যাচাই করুন।",
  },
  "maldives-hotels": {
    en: "Compare Maldives local islands and resort stays alongside your itinerary, budget and transfer arrangements. A room price alone may not tell the whole story: check meals, transfers, mandatory charges and cancellation rules. Confirm the current schedule, pickup point and total for your dates directly with the property or booking platform.",
    bn: "মালদ্বীপে লোকাল আইল্যান্ড ও রিসোর্টে থাকার বিকল্প আপনার ভ্রমণসূচি, বাজেট ও ট্রান্সফারের ব্যবস্থা ধরে তুলনা করুন। শুধু রুমের দাম যথেষ্ট নয়: খাবার, যাতায়াত, বাধ্যতামূলক চার্জ ও বাতিলের শর্ত দেখুন। আপনার তারিখের সময়সূচি, পিকআপের স্থান ও মোট খরচ হোটেল বা বুকিং প্ল্যাটফর্মে নিশ্চিত করুন।",
  },
};

/** Shared by the interactive and prerendered directories. */
export function HotelDirectoryCards({ guides, isBn }: { guides: HotelGuide[]; isBn: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
      {guides.map((hotel) => {
        const image = getHotelGuideDestinationImage(hotel.id);
        const city = isBn ? BN_CITIES[hotel.id] ?? hotel.city : hotel.city;
        const country = isBn ? BN_COUNTRIES[hotel.country] ?? hotel.country : hotel.country;
        return (
          <a key={hotel.id} href={`${isBn ? "/bn" : ""}/hotels/${hotel.id}`} target="_blank" rel="noopener noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2">
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              {image && <ResponsiveImage src={image.src} alt={isBn ? image.altBn : image.altEn} sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">{country}</p>
              <h3 className="ural-card-title font-serif text-xl text-brand-navy">{isBn ? `${BN_STAY_TITLES[hotel.id] ?? city} কোথায় থাকবেন` : `Where to stay in ${city}`}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{SUMMARIES[hotel.id]?.[isBn ? "bn" : "en"] ?? hotel.quickAnswer}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-bold text-brand-navy">
                {isBn ? "গাইড খুলুন (নতুন ট্যাবে)" : "Open guide (new tab)"}<ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
