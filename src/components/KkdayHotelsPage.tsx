import React from "react";
import { ExternalLink, ArrowRight, Building } from "lucide-react";
import { resolvePartnerUrl, AFFILIATE_LINKS } from "./AffiliatePartners";

/* KKday hotel & stay search lives on its own page (/kkday-hotels).
   Klook stays the primary hotel search on the /hotels/:city guides. */

type Props = {
  isBn: boolean;
  onNavigate: (path: string) => void;
};

const CITY_GUIDES: { id: string; en: string; bn: string }[] = [
  { id: "kathmandu-hotels", en: "Kathmandu & Pokhara", bn: "কাঠমান্ডু ও পোখরা" },
  { id: "bangkok-hotels", en: "Bangkok", bn: "ব্যাংকক" },
  { id: "kuala-lumpur-hotels", en: "Kuala Lumpur", bn: "কুয়ালালামপুর" },
  { id: "singapore-hotels", en: "Singapore", bn: "সিঙ্গাপুর" },
  { id: "maldives-hotels", en: "Maldives", bn: "মালদ্বীপ" },
  { id: "dubai-hotels", en: "Dubai", bn: "দুবাই" },
];

export function KkdayHotelsPage({ isBn, onNavigate }: Props) {
  const kkdayUrl = resolvePartnerUrl(AFFILIATE_LINKS.kkdayHotels);

  return (
    <section
      id="kkday-hotels"
      aria-labelledby="kkday-hotels-title"
      className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6"
    >
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <Building size={12} aria-hidden="true" />
          {isBn ? "হোটেল ও স্টে" : "Hotels & Stays"}
        </span>
        <h1
          id="kkday-hotels-title"
          className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          {isBn ? "KKday হোটেল ও স্টে ডিল" : "KKday Hotel & Stay Deals"}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
          {isBn
            ? "KKday-তে হোটেল ও স্টে তুলনা করতে নিচের বাটনে যান। দাম, বাতিলের শর্ত ও ভাউচার নিশ্চিত করুন বুকিংয়ের আগে। এটি একটি অ্যাফিলিয়েট লিংক; বুকিংয়ে আমরা কমিশন পেতে পারি, আপনার খরচ বাড়ে না।"
            : "Compare hotels and stays on KKday using the button below. Check the final price, cancellation terms, and voucher details before you pay. This is an affiliate link: we may earn a commission on bookings at no extra cost to you."}
        </p>
      </header>

      <a
        id="btn-kkday-hotels-search"
        href={kkdayUrl}
        data-affiliate-placement="kkday_hotels_page"
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#07C369] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#06ad5d]"
      >
        {isBn ? "KKday-তে হোটেল খুঁজুন" : "Search hotels on KKday"}
        <ExternalLink size={14} aria-hidden="true" />
      </a>

      <div className="space-y-3">
        <h2 className="font-serif text-xl font-bold text-slate-900">
          {isBn ? "বুকিংয়ের আগে যা দেখে নিন" : "Before you book"}
        </h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
          {(isBn
            ? [
                "পাসপোর্টের নামের সঙ্গে বুকিংয়ের নাম হুবহু মিলিয়ে নিন।",
                "কর ও ফি সহ চূড়ান্ত দাম দেখুন, শুধু রুম ভাড়া নয়।",
                "বাতিল ও পরিবর্তনের শর্ত (cancellation policy) পড়ুন।",
                "চেক-ইন ও চেক-আউটের সময় এবং বিমানবন্দর থেকে যাতায়াত জেনে নিন।",
                "পরিবার নিয়ে গেলে রুমে সর্বোচ্চ কতজন থাকতে পারেন, তা মিলিয়ে নিন।",
              ]
            : [
                "Make sure the guest name matches your passport exactly.",
                "Compare the final price including taxes and fees, not just the room rate.",
                "Read the cancellation and change policy before paying.",
                "Check check-in and check-out times and how to reach the hotel from the airport.",
                "For families, confirm the maximum occupancy of the room you pick.",
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="font-serif text-xl font-bold text-slate-900">
          {isBn ? "টাকা ও কার্ড" : "Cards and currency"}
        </h2>
        <p className="text-sm text-slate-700">
          {isBn
            ? "KKday-তে দাম কোন মুদ্রায় দেখাচ্ছে এবং আপনার কার্ডে বিদেশি লেনদেনের চার্জ কত, তা আগে জেনে নিন। "
            : "Check which currency KKday shows prices in and what your card charges on foreign transactions. "}
          <a href="/blog/dual-currency-card-endorsement-bangladesh" className="font-semibold text-brand-navy underline hover:text-[#F6B73C]">
            {isBn ? "Dual-Currency Card ও পাসপোর্ট এনডোর্সমেন্ট গাইড" : "Dual-currency card and passport endorsement guide"}
          </a>
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="font-serif text-xl font-bold text-slate-900">
          {isBn ? "শহর অনুযায়ী হোটেল গাইড" : "Hotel guides by city"}
        </h2>
        <p className="text-sm text-slate-600">
          {isBn
            ? "কোন এলাকায় থাকবেন তা ঠিক করতে আগে গাইড দেখুন, তারপর KKday-তে দাম মিলিয়ে নিন।"
            : "Pick a neighborhood first in our city guide, then compare prices on KKday."}
        </p>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CITY_GUIDES.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => onNavigate(`/hotels/${city.id}`)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-brand-navy shadow-sm hover:border-[#F6B73C]"
              >
                <span>{isBn ? city.bn : city.en}</span>
                <ArrowRight size={14} className="text-[#F6B73C]" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
