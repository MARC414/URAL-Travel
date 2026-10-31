import React from "react";
import { ArrowRight } from "lucide-react";
import { EditorialPageHero } from "./EditorialPageHero";
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
    <section aria-label={isBn ? "ঢাকা থেকে ফ্লাইট গাইড" : "Flight guides from Dhaka"} className="space-y-6">
      <EditorialPageHero
        eyebrow={isBn ? "ঢাকা থেকে ফ্লাইট গাইড" : "FLIGHT GUIDES FROM DHAKA"}
        title={isBn ? "ঢাকা থেকে ফ্লাইট: রুট, ভাড়া ও এয়ারলাইন্স" : "International Flights from Dhaka: Routes, Fares & Airlines"}
        description={isBn
          ? "ঢাকা থেকে জনপ্রিয় গন্তব্যে সরাসরি ও সংযোগী ফ্লাইটের সময়, আনুমানিক ভাড়া এবং এয়ারলাইন্স তুলনা করুন। বুকিংয়ের আগে বর্তমান সময়সূচি যাচাই করুন।"
          : "Compare nonstop and connecting routes from Dhaka, with typical flight times, BDT fare ranges and airline options. Check current schedules before booking."}
        imageSrc="/assets/images/flights_heathrow_b747_takeoff_20261101-1200.webp"
        imageAlt={isBn
          ? "লন্ডনের হিথ্রো বিমানবন্দরের কাছে আকাশে উড়ে যাওয়া থাই এয়ারওয়েজের বোয়িং ৭৪৭ বিমান"
          : "A Thai Airways Boeing 747 climbing above London Heathrow Airport"}
        imageSizes="(min-width: 1024px) 45vw, 100vw"
        imageFit="contain"
        credit={
          <>
            <a href="https://en.wikipedia.org/wiki/File:Thai_b747-400_hs-tgp_takeoff_london_heathrow_arp.jpg" target="_blank" rel="noopener noreferrer">
              Adrian Pingstone / Wikimedia Commons
            </a>
            <span aria-hidden="true"> · Public domain</span>
          </>
        }
      />

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
