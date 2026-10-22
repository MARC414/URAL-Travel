import React from "react";
import { ArrowRight } from "lucide-react";
import type { FlightRoute } from "../types";

type FlightsIndexProps = {
  routes: FlightRoute[];
  isBn: boolean;
  navigateTo: (path: string) => void;
};

// Nonstop when the duration label says "(Direct)"; otherwise connecting.
const isNonstop = (route: FlightRoute) => /\(direct/i.test(route.duration);

export function FlightsIndex({ routes, isBn, navigateTo }: FlightsIndexProps) {
  // One entry per city pair: ktm-dhaka is the return leg of dhaka-kathmandu.
  const seen = new Set<string>();
  const unique = routes.filter((route) => {
    const key = [route.from, route.to]
      .map((s) => s.split(" (")[0])
      .sort()
      .join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <section aria-labelledby="flights-index-title" className="space-y-5">
      <header className="space-y-2">
        <h1 id="flights-index-title" className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {isBn ? "ঢাকা থেকে সরাসরি ফ্লাইট" : "Direct flights from Dhaka"}
        </h1>
        <p className="max-w-[72ch] text-sm leading-relaxed text-slate-700">
          {isBn
            ? "প্রতিটি রুটে সরাসরি না সংযোগী ফ্লাইট, আনুমানিক সময় ও ভাড়ার পরিসর দেখুন। ভাড়া ও সময়সূচি বদলায়, বুকিংয়ের আগে এয়ারলাইনের সাইটে যাচাই করুন।"
            : "See which routes have nonstop flights and which need a connection, with typical flight time and BDT fare ranges. Fares and schedules change, so confirm with the airline before booking."}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {unique.map((route) => {
          const nonstop = isNonstop(route);
          return (
            <li key={route.id}>
              <button
                type="button"
                onClick={() => navigateTo(`/flights/${route.id}`)}
                className="flex w-full items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:bg-slate-50"
              >
                <span className="min-w-0 space-y-1.5">
                  <span className="block text-sm font-bold text-brand-navy">
                    {route.from.split(" (")[0]} <span className="text-[#F6B73C]">→</span> {route.to.split(" (")[0]}
                  </span>
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${nonstop ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                    {nonstop ? (isBn ? "সরাসরি ফ্লাইট" : "Nonstop") : (isBn ? "সংযোগী ফ্লাইট" : "Connecting")}
                  </span>
                  <span className="block text-xs text-slate-600">{route.duration}</span>
                  <span className="block font-mono text-xs text-slate-500">{route.priceRangeBdt.split(" (")[0]}</span>
                </span>
                <ArrowRight size={14} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
