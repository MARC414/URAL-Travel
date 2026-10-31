import React from "react";
import { ExternalLink, Compass, Building } from "lucide-react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";

interface KlookEmbedProps {
  lang?: "en" | "bn";
}

export function KlookEmbed({ lang = "en" }: KlookEmbedProps) {
  const isBn = lang === "bn";
  const klookHotelUrl = resolvePartnerUrl(AFFILIATE_LINKS.klookHotels);
  const klookActivitiesUrl = resolvePartnerUrl(AFFILIATE_LINKS.klook);

  return (
    <section className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 font-sans sm:p-5">
      <div className="mb-3.5 flex items-center gap-2.5">
        <div className="rounded-lg border border-[#F6B73C]/30 bg-[#F6B73C]/15 p-1.5 text-brand-navy">
          <Compass size={18} aria-hidden="true" />
        </div>
        <div>
          <h4 className="font-serif text-sm font-black text-slate-900">
            {isBn ? "Klook-এ হোটেল ও ভ্রমণ-অভিজ্ঞতা" : "Hotels, Tours & Activities on Klook"}
          </h4>
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            {isBn
              ? "সাধারণ হোটেল তালিকা · ভ্রমণ-অভিজ্ঞতা · আকর্ষণ"
              : "General hotel collection · Tours · Attractions"}
          </p>
        </div>
        <span className="ml-auto hidden items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 sm:inline-flex">
          <Building size={11} aria-hidden="true" /> {isBn ? "হোটেল ও ট্যুর" : "Hotels & Tours"}
        </span>
      </div>

      <p className="mb-3 text-[11px] leading-relaxed text-slate-600">
        {isBn
          ? "এই লিংকটি Klook-এর সাধারণ হোটেল তালিকা খোলে—নির্বাচিত হোটেল বা তারিখের লাইভ কোট নয়। গন্তব্য, তারিখ ও অতিথিসংখ্যা Klook-এ আবার দিন। যোগ্য বুকিংয়ে URAL কমিশন পেতে পারে; এটি ভ্রমণকারীর জন্য ছাড় নয়।"
          : "This link opens Klook’s general hotel collection—not a live quote for a selected property or dates. Re-enter your destination, dates and guest count on Klook. URAL may earn commission on qualifying bookings; this is not a traveller discount."}
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a
          href={klookHotelUrl}
          data-affiliate-placement="klook_embed_hotel_collection"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-brand-navy px-4 py-2.5 text-xs font-bold text-[#F6B73C] transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
        >
          <span>{isBn ? "Klook-এর হোটেল তালিকা সার্চ করুন" : "Search Klook hotel collection"}</span>
          <ExternalLink size={11} aria-hidden="true" />
        </a>
        <a
          href={klookActivitiesUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-[#F6B73C] px-4 py-2.5 text-xs font-bold text-brand-navy transition-colors hover:bg-[#f5ad24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
        >
          <span>{isBn ? "Klook-এ ট্যুর ও পাস দেখুন" : "Explore Tours & Passes"}</span>
          <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
