import React from "react";
import { ArrowRight } from "lucide-react";
import { EditorialPageHero } from "./EditorialPageHero";
import type { FlightRoute } from "../types";
import { LANDING_FLIGHT_FAQS } from "../utils/faqSchema";
import { BN_LANDING_FLIGHT_FAQS } from "../utils/bn-faq-schema";

type FlightsIndexProps = {
  routes: FlightRoute[];
  isBn: boolean;
  navigateTo: (path: string) => void;
  searchSlot?: React.ReactNode;
};

// Nonstop when the duration label says "(Direct)"; otherwise connecting.
const isNonstop = (route: FlightRoute) => /\(direct/i.test(route.duration);

const cityName = (value: string) => value.split(" (")[0];

export function FlightsIndex({ routes, isBn, navigateTo, searchSlot }: FlightsIndexProps) {
  // One entry per city pair: ktm-dhaka is the return leg of dhaka-kathmandu.
  const seen = new Set<string>();
  const unique = routes.filter((route) => {
    const key = [route.from, route.to]
      .map((part) => cityName(part))
      .sort()
      .join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const nonstop = unique.filter(isNonstop);
  const connecting = unique.filter((route) => !isNonstop(route));
  const faqs = isBn ? BN_LANDING_FLIGHT_FAQS : LANDING_FLIGHT_FAQS;
  const link = (path: string) => (isBn ? `/bn${path}` : path);

  return (
    <section aria-label={isBn ? "ঢাকা থেকে ফ্লাইট গাইড" : "Flight guides from Dhaka"} className="space-y-6">
      <EditorialPageHero
        eyebrow={isBn ? "ঢাকা থেকে ফ্লাইট গাইড" : "FLIGHT GUIDES FROM DHAKA"}
        title={isBn ? "ঢাকা থেকে ফ্লাইট: রুট, ভাড়া ও এয়ারলাইন্স" : "International Flights from Dhaka: Routes, Fares & Airlines"}
        description={isBn
          ? "ঢাকা থেকে সরাসরি ও সংযোগী ফ্লাইটের রুট, যাত্রার সময় ও এয়ারলাইন্স তুলনা করুন, তারপর আপনার তারিখের লাইভ ভাড়া দেখুন।"
          : "Compare nonstop and connecting routes from Dhaka by journey time and airline, then check live fares for your own travel dates."}
        /* Same photograph as the homepage first-paint hero, so a reader who
           clicks a flight next step from an article lands somewhere that looks
           like the site they were reading — this page is that stop. */
        imageSrc="/assets/images/clouds_boat_hero_1781438671378-1200.webp"
        imageAlt={isBn
          ? "সূর্যাস্তের মেঘের ওপর কাঠের নৌকার ডেক, সঙ্গে ট্রাভেল জার্নাল ও ক্যামেরা"
          : "Wooden sailboat deck above a sea of sunset clouds with a travel journal and camera"}
        imageSizes="(min-width: 1024px) 45vw, 100vw"
        imageFit="cover"
        credit={
          <>
            <a href="https://en.wikipedia.org/wiki/File:Thai_b747-400_hs-tgp_takeoff_london_heathrow_arp.jpg" target="_blank" rel="noopener noreferrer">
              Adrian Pingstone / Wikimedia Commons
            </a>
            <span aria-hidden="true"> · Public domain</span>
          </>
        }
      >
        <span className="rounded-full bg-[#F6B73C]/20 px-3 py-1.5 font-mono text-xs font-bold text-[#FFE0A0]">
          {isBn ? "লাইভ ভাড়া তুলনা করুন" : "Compare live fares"}
        </span>
      </EditorialPageHero>

      {/* Anchor target for article flight CTAs (`/flights?fsrc=…#flight-search`). */}
      <div id="flight-search" className="scroll-mt-24">
        {searchSlot}
      </div>

      <p className="max-w-prose text-sm leading-relaxed text-slate-700">
        {isBn
          ? "নির্দিষ্ট ভাড়া এখানে প্রকাশ করা হয় না: তারিখ, আসন, ব্যাগেজ ও টিকিটের শর্ত অনুযায়ী দাম বদলায়। নিচের রুট গাইডে যাত্রার সময় ও এয়ারলাইন্স দেখে নিন, তারপর নিজের তারিখের লাইভ মোট ভাড়া তুলনা করুন।"
          : "No fixed fare is published here: prices change with travel dates, seat inventory, baggage and fare conditions. Use the route guides below to compare journey times and airlines, then check live totals for your own dates."}
      </p>

      <div>
        <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">
          {isBn ? "সব ফ্লাইট রুট গাইড" : "Flight route guides"}
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {unique.map((route) => {
            const nonstopRoute = isNonstop(route);
            return (
              <li key={route.id}>
                <button
                  type="button"
                  onClick={() => navigateTo(`/flights/${route.id}`)}
                  className="flex w-full items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-colors hover:bg-slate-50"
                >
                  <span className="min-w-0 space-y-1.5">
                    <span className="block text-sm font-bold text-brand-navy">
                      {cityName(route.from)} <span className="text-[#F6B73C]">→</span> {cityName(route.to)}
                    </span>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${nonstopRoute ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {nonstopRoute ? (isBn ? "সরাসরি ফ্লাইট" : "Nonstop") : (isBn ? "সংযোগী ফ্লাইট" : "Connecting")}
                    </span>
                    <span className="block text-xs text-slate-600">{route.duration}</span>
                    <span className="block font-mono text-xs text-slate-500">{isBn ? "লাইভ ভাড়া তুলনা করুন" : "Compare live fares"}</span>
                  </span>
                  <ArrowRight size={14} className="mt-1 shrink-0 text-slate-400" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <section aria-labelledby="flights-nonstop-heading" className="space-y-3">
        <h2 id="flights-nonstop-heading" className="ural-section-title font-serif font-black text-lg text-slate-900">
          {isBn ? "ঢাকা (DAC) থেকে সরাসরি ফ্লাইট" : "Direct flights from Dhaka (DAC)"}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          {isBn
            ? "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর থেকে প্রায় ৩০টি আন্তর্জাতিক গন্তব্যে সরাসরি ফ্লাইট চলে, পাশাপাশি দেশীয় রুটও। মৌসুম অনুযায়ী সময়সূচি ও পরিচালনাকারী এয়ারলাইন্স বদলায়, তাই বুকিংয়ের আগে এয়ারলাইনের ওয়েবসাইটে নিশ্চিত হয়ে নিন।"
            : "Hazrat Shahjalal International Airport (DAC) has nonstop service to about 30 international destinations across roughly 20 countries, plus domestic routes. Schedules and operators change by season, so confirm on the airline's website before booking."}
        </p>
        <ul className="space-y-1.5 text-sm text-slate-700">
          {nonstop.map((route) => (
            <li key={route.id}>
              <button type="button" onClick={() => navigateTo(`/flights/${route.id}`)} className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy">
                {cityName(route.from)} → {cityName(route.to)}
              </button>{" "}
              — {route.airlines.join(", ")} ({route.duration})
            </li>
          ))}
        </ul>
        <h3 className="font-serif text-base font-bold text-slate-900">
          {isBn ? "সৌদি আরব (ওমরাহ ও হজ)" : "Saudi Arabia (Umrah and Hajj)"}
        </h3>
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          {isBn ? (
            <>
              জেদ্দা ও মদিনায় সরাসরি ফ্লাইট চলে।{" "}
              <a className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy" href={link("/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia")}>ওপেন-জ টিকিট গাইড</a>{" "}
              এবং{" "}
              <a className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy" href={link("/umrah")}>DIY ওমরাহ প্ল্যানার</a>{" "}
              দেখুন।
            </>
          ) : (
            <>
              Nonstop flights run to Jeddah and Madinah. See the{" "}
              <a className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy" href={link("/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia")}>open-jaw ticket guide</a>{" "}
              and the{" "}
              <a className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy" href={link("/umrah")}>DIY Umrah planner</a>.
            </>
          )}
        </p>
        {connecting.length > 0 && (
          <>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {isBn ? "কোনো ননস্টপ ফ্লাইট নেই এমন রুট" : "Routes with no nonstop flight"}
            </h3>
            <p className="max-w-prose text-sm leading-relaxed text-slate-700">
              {isBn
                ? "আমেরিকা, কানাডা ও ইউরোপের অনেক গন্তব্যে সাধারণত সংযোগ লাগে, প্রায়ই উপসাগরীয় হাব হয়ে। দীর্ঘ-দূরত্বের পরিকল্পনার জন্য "
                : "Some popular searches, such as the US, Canada and most of Europe, usually involve a connection, often through the Gulf. For long-haul planning, see "}
              <a className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy" href={link("/flights/dhaka-los-angeles")}>
                {isBn ? "ঢাকা থেকে লস অ্যাঞ্জেলেস" : "Dhaka to Los Angeles"}
              </a>
              {isBn ? " গাইড দেখুন।" : "."}
            </p>
          </>
        )}
      </section>

      <section aria-labelledby="flights-compare-heading" className="space-y-3">
        <h2 id="flights-compare-heading" className="ural-section-title font-serif font-black text-lg text-slate-900">
          {isBn ? "বাংলাদেশ থেকে আন্তর্জাতিক ফ্লাইট কীভাবে তুলনা করবেন" : "How to compare international flights from Bangladesh"}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          {isBn
            ? "সম্ভব হলে নমনীয় তারিখ নিয়ে শুরু করুন, তারপর একই যাত্রীসংখ্যা ও ব্যাগেজ ভাতা রেখে সরাসরি ও সংযোগী বিকল্প মিলিয়ে দেখুন। কম দেখানো ভাড়ায় চেকড ব্যাগেজ, সিট সিলেকশন বা পেমেন্ট ফি বাদ থাকতে পারে, আর সংযোগে ট্রানজিট আনুষ্ঠানিকতা ও বেশি সময় যোগ হয়। প্রতিটি সেগমেন্ট এক টিকিটে আছে কি না, সংযোগ হাতছাড়া হলে কী হবে এবং ভাড়ায় পরিবর্তন অনুমোদিত কি না—এগুলো যাচাই করুন।"
            : "Start with flexible dates where possible, then compare direct and connecting itineraries using the same passenger count and baggage allowance. A low displayed fare may exclude checked baggage, seat selection or payment fees, while a connection can add transit formalities and a longer journey. Check whether each segment is on one ticket, how missed connections are handled, and whether the fare permits changes."}
        </p>
        <p className="max-w-prose text-sm leading-relaxed text-slate-700">
          {isBn
            ? "গাইডে দেওয়া যাত্রার সময় ও বুকিং উইন্ডো নির্দেশক; বর্তমান সময়সূচির সঙ্গে মিলিয়ে নিন। ঈদ, স্কুল ছুটি বা শীতের মৌসুমে নির্দিষ্ট ছাড়ের সময় ধরে না নিয়ে আগে ও পরে দুবার দাম দেখুন। ঢাকার বাইরে থেকে এলে আলাদা দেশীয় ফ্লাইটের সংযোগের জন্য যথেষ্ট সময় রাখুন এবং দেরি হলে কী হবে জেনে নিন।"
            : "Flight duration and booking windows in the linked guides are indicative and should be checked against current schedules. For trips during Eid, school holidays or the winter travel season, compare early and revisit fares before purchase rather than assuming a fixed discount window. If your itinerary includes a separate domestic flight to Dhaka, protect that connection with sufficient time and consider the consequences of delays."}
        </p>
      </section>

      <section aria-labelledby="flights-planning-heading" className="space-y-3">
        <h2 id="flights-planning-heading" className="ural-section-title font-serif font-black text-lg text-slate-900">
          {isBn ? "ভ্রমণের বাকি পরিকল্পনা" : "Continue planning your trip"}
        </h2>
        <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          {[
            { href: "/visa", en: "Visa checklists and official portals", bn: "ভিসার চেকলিস্ট ও সরকারি পোর্টাল" },
            { href: "/costs", en: "Trip cost estimator and destination budgets", bn: "ট্রিপ কস্ট এস্টিমেটর ও গন্তব্যের বাজেট" },
            { href: "/hotels", en: "Hotel areas and booking checks", bn: "হোটেল এলাকা ও বুকিং যাচাই" },
            { href: "/umrah", en: "Umrah planning and Nusuk steps", bn: "ওমরাহ পরিকল্পনা ও নুসুক ধাপ" },
            { href: "/blog", en: "Practical travel guides", bn: "ব্যবহারিক ভ্রমণ গাইড" },
            { href: "/tools/budget-calculator", en: "Trip Cost Estimator", bn: "ট্রিপ কস্ট এস্টিমেটর" },
          ].map((item) => (
            <li key={item.href}>
              <a className="text-brand-navy underline decoration-slate-300 underline-offset-2 hover:decoration-brand-navy" href={link(item.href)}>
                {isBn ? item.bn : item.en}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="flights-faq-heading" className="space-y-2">
        <h2 id="flights-faq-heading" className="ural-section-title font-serif font-black text-lg text-slate-900">
          {isBn ? "ফ্লাইট বুকিং নিয়ে প্রশ্ন" : "Flight booking questions for travelers from Bangladesh"}
        </h2>
        {faqs.map((faq) => (
          <details key={faq.question} className="border-b border-slate-200 py-3">
            <summary className="cursor-pointer py-1 font-semibold text-slate-900">{faq.question}</summary>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-700">{faq.answer}</p>
          </details>
        ))}
      </section>
    </section>
  );
}
