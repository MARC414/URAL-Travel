import React from "react";
import { Car, ExternalLink, ShieldCheck } from "lucide-react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";

interface KiwitaxiEmbedProps {
  defaultCountry?: string;
  lang?: "en" | "bn";
}

/** A generic tracked handoff: this site does not send trip details to Kiwitaxi. */
export function KiwitaxiEmbed({ defaultCountry = "", lang = "en" }: KiwitaxiEmbedProps) {
  const isBn = lang === "bn";

  return (
    <section
      aria-label={isBn ? "Kiwitaxi ট্রান্সফার সার্চ" : "Kiwitaxi transfer search"}
      className="w-full space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-sans sm:p-5"
    >
      <div className="flex items-center gap-2.5">
        <span className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-700">
          <Car size={18} aria-hidden="true" />
        </span>
        <h4 className="font-serif text-sm font-black text-slate-900">
          {isBn ? "Kiwitaxi-তে ট্রান্সফার অপশন খুঁজুন" : "Search transfer options on Kiwitaxi"}
        </h4>
      </div>

      <p className="text-xs leading-relaxed text-slate-600">
        {isBn
          ? `${defaultCountry ? `${defaultCountry} প্রসঙ্গে: ` : ""}এই ট্র্যাক করা লিংকটি Kiwitaxi-তে যায়, কিন্তু এখান থেকে বিমানবন্দর, গন্তব্য, তারিখ বা যাত্রীর তথ্য পাঠায় না। Kiwitaxi-তে তথ্যগুলো আবার দিন এবং বুকিংয়ের আগে চূড়ান্ত ভাড়া, গাড়ি ও বাতিলের শর্ত যাচাই করুন।`
          : `${defaultCountry ? `For ${defaultCountry}: ` : ""}This tracked link opens Kiwitaxi, but does not carry an airport, destination, date or passenger details from this page. Re-enter them on Kiwitaxi, then check the final quote, vehicle and cancellation terms before booking.`}
      </p>

      <a
        href={resolvePartnerUrl(AFFILIATE_LINKS.kiwitaxi)}
        data-affiliate-placement="travel_essentials_kiwitaxi_transfer"
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      >
        {isBn ? "Kiwitaxi-তে সার্চ করুন" : "Search Kiwitaxi"}
        <ExternalLink size={12} aria-hidden="true" />
      </a>

      <p className="flex gap-1.5 text-[11px] leading-relaxed text-slate-500">
        <ShieldCheck size={13} className="mt-0.5 shrink-0 text-emerald-700" aria-hidden="true" />
        <span>
          {isBn
            ? "যোগ্য বুকিংয়ে URAL কমিশন পেতে পারে; এটি ভ্রমণকারীর জন্য ছাড় নয়।"
            : "URAL may earn a commission on qualifying bookings; this is not a traveller discount."}
        </span>
      </p>
    </section>
  );
}
