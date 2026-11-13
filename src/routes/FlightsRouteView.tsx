import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { AirHelpWidget } from "../components/AirHelpWidget";

import { ArrowRight, Ticket, Car, Bell, ShieldCheck, Building, ExternalLink } from "lucide-react";

import { PartnerLinkButton, AFFILIATE_LINKS } from "../components/AffiliatePartners";

import { TravelIntelligence } from "../components/AeoInspector";
import { FlightsIndex } from "../components/FlightsIndex";
import { EditorialPageHero } from "../components/EditorialPageHero";
import { FLIGHT_ROUTES } from "../data/flightRoutes";



type RouteViewProps = { context: Record<string, any> };



export default function FlightsRouteView({ context }: RouteViewProps) {

  const { TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, isBn, lang, localizedFlights, navigateTo, openPriceAlert, parameterId, section, setAreTpScriptsReady } = context;

  const activeRoute = localizedFlights.find((route) => route.id === parameterId) || localizedFlights[0];

  const routeInfo = FLIGHT_ROUTES[activeRoute.id];
  const localPath = (path: string) => `${isBn ? "/bn" : ""}${path}`;
  const destination = (isBn ? routeInfo?.destinationBn : routeInfo?.destinationEn) ?? activeRoute.to;

  // The same search card serves the /flights hub and each route guide.
  const searchCard = (
    <div id="flight-search" className="ural-guide-jump-target ural-card bg-slate-100 p-4 border border-border-subtle space-y-3">
      <span className="text-[10px] font-mono font-bold text-brand-navy block">
        {isBn ? (parameterId ? "এই রুটের ফ্লাইট সার্চ করুন" : "ফ্লাইট সার্চ করুন") : parameterId ? "Search Flights on This Route" : "Search Flights"}
      </span>
      {parameterId && !routeInfo ? (
        <p role="status">{isBn ? "এই রুটের সার্চ ডিফল্ট পাওয়া যায়নি। ফ্লাইট সার্চে বিমানবন্দর নির্বাচন করুন।" : "Search defaults are unavailable for this route. Choose your airports in flight search."}</p>
      ) : areTpScriptsReady ? (
        <React.Suspense
          fallback={
            <TravelpayoutsWidgetSkeleton
              variant="flights"
              isBn={isBn}
              onInteract={() => setAreTpScriptsReady(true)}
            />
          }
        >
          <TravelpayoutsEmbed
            defaultOrigin={parameterId ? routeInfo?.origin : undefined}
            defaultDestination={parameterId ? routeInfo?.destination : undefined}
            lang={lang}
            onOpenPriceAlert={openPriceAlert}
          />
        </React.Suspense>
      ) : (
        <TravelpayoutsWidgetSkeleton
          variant="flights"
          isBn={isBn}
          onInteract={() => setAreTpScriptsReady(true)}
        />
      )}
      <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-slate-600">
          {isBn
            ? "মাল্টি-সিটি, ওপেন-জ বা ভিন্ন এয়ারলাইন্সের কম্বো টিকিট খুঁজছেন?"
            : "Looking for Multi-City, Open-Jaw, or Self-Transfer Airline Combos?"}
        </span>
        <PartnerLinkButton
          href={AFFILIATE_LINKS.kiwi}
          label={isBn ? "Kiwi.com-এ মাল্টি-সিটি ভাড়া দেখুন" : "Compare Multi-City Fares on Kiwi.com"}
          variant="dark"
        />
      </div>
    </div>
  );

  // /flights (no route id) is the index; /flights/:id keeps the route template.
  if (!parameterId) {
    return <FlightsIndex routes={localizedFlights} isBn={isBn} navigateTo={navigateTo} searchSlot={searchCard} />;
  }

  return (

    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">

      {/* The intro comes first in the DOM so mobile readers get context before route controls. */}

      <header className="space-y-4 lg:col-start-2 lg:col-span-3 lg:row-start-1">

        <EditorialPageHero
          eyebrow={isBn ? "ফ্লাইট রুট গাইড" : "FLIGHT ROUTE GUIDE"}
          title={isBn
            ? `${routeInfo?.fromBn ?? activeRoute.from} → ${routeInfo?.toBn ?? activeRoute.to} বিমান ভাড়া, সময় ও ভিসা গাইড`
            : `Flights from ${activeRoute.from} to ${activeRoute.to}`}
          description={isBn
            ? `${activeRoute.to} রুটের লাইভ ভাড়া, ভ্রমণের সময় এবং এয়ারলাইন্স তুলনা করুন। বুকিংয়ের আগে তারিখ অনুযায়ী বর্তমান সময়সূচি, ব্যাগেজ ও প্রবেশের নিয়ম যাচাই করুন।`
            : `Compare live fares, journey times and airline options from ${activeRoute.from.split(" (")[0]} to ${activeRoute.to.split(" (")[0]}. Check current schedules, baggage and entry rules for your dates before booking.`}
          imageSrc="/assets/images/flights_heathrow_b747_takeoff_20261101-1200.webp"
          imageAlt={isBn
            ? "লন্ডনের হিথ্রো বিমানবন্দরের কাছে আকাশে উড়ে যাওয়া থাই এয়ারওয়েজের বোয়িং ৭৪৭ বিমান"
            : "A Thai Airways Boeing 747 climbing above London Heathrow Airport"}
          imageFit="contain"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#F6B73C]/20 px-3 py-1.5 font-mono text-xs font-bold text-[#FFE0A0]">
              {isBn ? "লাইভ ভাড়া তুলনা করুন" : "Compare live fares"}
            </span>
            <button
              type="button"
              onClick={() => openPriceAlert(activeRoute.to)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              <Bell size={12} className="text-white" aria-hidden="true" />
              <span>{isBn ? "ফেয়ার অ্যালার্ট" : "Price Alert"}</span>
            </button>
          </div>
        </EditorialPageHero>



        <QuickAnswer
          id="aeo-quick-answer-card"
          label={isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
        >
          {activeRoute.quickAnswer}
        </QuickAnswer>

        <GuideJumpNav

          isBn={isBn}

          links={[

            { id: "flight-facts", en: "Flight facts at a glance", bn: "এক নজরে ফ্লাইটের তথ্য" },

            { id: "flight-airlines", en: "Airlines and booking timing", bn: "এয়ারলাইন্স ও টিকিটের সময়" },

            { id: "flight-search", en: "Compare fares on this route", bn: "এই রুটের ভাড়া তুলনা করুন" },

            { id: "hotel-visa-loop-links", en: "Visa, hotel and transfer help", bn: "ভিসা, হোটেল ও ট্রান্সফার সহায়তা" },

            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

          ]}

        />

      </header>



      <aside className="lg:col-start-1 lg:row-start-1 lg:row-span-2" aria-label={isBn ? "ফ্লাইট রুট নির্বাচন" : "Flight route selection"}>

        <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">

          <label htmlFor="mobile-flight-route-select" className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider text-slate-600">

            {isBn ? "ফ্লাইট রুট নির্বাচন করুন:" : "SELECT FLIGHT ROUTE:"}

          </label>

          <select

            id="mobile-flight-route-select"

            value={parameterId}

            onChange={(event) => navigateTo(`/flights/${event.currentTarget.value}`)}

            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-brand-navy shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] lg:hidden"

          >

            {localizedFlights.map((route) => (

              <option key={route.id} value={route.id}>

                {route.from} → {route.to}

              </option>

            ))}

          </select>

          <div className="hidden space-y-2 lg:block">

            {localizedFlights.map((route) => (

              <a

                key={route.id}

                id={`btn-route-select-${route.id}`}

                href={localPath(`/flights/${route.id}`)}
                aria-current={parameterId === route.id ? "page" : undefined}

                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-colors ${

                  parameterId === route.id

                    ? "border-brand-navy bg-brand-navy text-white shadow-md"

                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"

                }`}

              >

                <span className="inline-flex items-center gap-1.5">{route.from} <span className="font-bold text-[#F6B73C]">→</span> {route.to}</span>

                <ArrowRight size={12} className={parameterId === route.id ? "text-[#F6B73C]" : "text-text-muted"} />

              </a>

            ))}

          </div>

        </nav>

      </aside>



      <div className="min-w-0 ural-route-stack animate-fade-in lg:col-start-2 lg:col-span-3 lg:row-start-2">

                    {/* 📊 AEO: KEY FACTS TABLE */}

                    <div id="flight-facts" className="ural-guide-jump-target space-y-3">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">

                        {isBn ? "এক নজরে ফ্লাইটের তথ্য" : "Flight Facts at a Glance"}

                      </h2>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {activeRoute.keyFacts.map((fact) => (

                          <div key={fact.label} className="ural-card bg-white border border-border-subtle p-4 rounded-xl text-center shadow-sm">

                            <span className="text-[10px] font-bold text-slate-600 font-mono uppercase tracking-wider block">{fact.label}</span>

                            <span className="text-xs font-semibold text-brand-navy font-mono block mt-1">{fact.value}</span>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Rich description contents */}

                    <div id="flight-airlines" className="ural-guide-jump-target prose prose-slate max-w-[72ch] text-sm sm:text-[14.5px] text-slate-700 space-y-4 leading-relaxed">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">

                        {isBn ? "এই রুটে চলাচলকারী এয়ারলাইন্সসমূহ" : "Airlines Flying This Route"}

                      </h2>

                      <p>

                        {isBn

                          ? "এই রুটে সরাসরি বা সংযোগী যাত্রায় নিচের এয়ারলাইনগুলো দেখা যেতে পারে। প্রতিটি সেগমেন্টের অপারেটর ও আপনার তারিখের সময়সূচি যাচাই করুন:"

                          : "These airlines may appear on direct or connecting itineraries. Confirm the operating carrier for each segment and the schedule for your dates:"}

                      </p>

                      <ul className="list-disc pl-5 space-y-1">

                        {activeRoute.airlines.map((airline) => (

                          <li key={airline} className="font-medium text-slate-800">{airline}</li>

                        ))}

                      </ul>



                      <h3 className="ural-card-title font-serif font-black text-base text-slate-900 mt-4">
                        {isBn ? "কখন ও কীভাবে ভাড়া তুলনা করবেন" : "When and how to compare fares"}
                      </h3>
                      <p>{isBn
                        ? "আগে থেকে খোঁজ শুরু করে একাধিক তারিখে মোট ভাড়া তুলনা করুন; কোনো নির্দিষ্ট বুকিং সময় কম দামের নিশ্চয়তা দেয় না। ব্যাগেজ, পরিবর্তনের শর্ত এবং আপনার পাসপোর্ট ও যাত্রার উদ্দেশ্য অনুযায়ী প্রবেশের নিয়ম যাচাই করুন।"
                        : "Start comparing early and check total fares across dates; no fixed booking window guarantees the lowest price. Check baggage and change conditions, and verify entry rules for your passport and purpose of travel."}</p>

                    </div>



                     {/* Embedded Conversion search form widget: shared by the hub and route views */}

                    {searchCard}



                    {/* 🛡️ AirHelp Flight Delay Compensation & TravelPass */}

                    <AirHelpWidget

                      lang={lang}

                      routeLabel={`${activeRoute.from} → ${activeRoute.to}`}

                    />



                    {/* internal linking system ranking loops (Flights to Visa and Hotels!) */}

                    <div id="hotel-visa-loop-links" className="ural-guide-jump-target bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">

                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">

                        {isBn ? "এই ট্রিপের জন্য আরও প্রয়োজনীয় তথ্য" : "Also Useful for This Trip"}

                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">

                        {routeInfo && <a id={`lnk-view-visa-from-flight-${activeRoute.id}`} href={localPath(routeInfo.visaPath)} className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">
                          <ShieldCheck size={14} className="text-brand-navy shrink-0" />
                          <span>{routeInfo.visaPath === "/visa" ? (isBn ? "ভিসা গাইড দেখুন" : "Browse visa guides") : (isBn ? `${destination} ভিসা গাইড দেখুন` : `Check visa guidance for ${destination}`)}</span><ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>}
                        {activeRoute.id === "dhaka-los-angeles" && <a href="https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">
                          <ShieldCheck size={14} className="text-brand-navy shrink-0" /><span>{isBn ? "US visitor visa-এর সরকারি নির্দেশনা" : "Official US visitor visa guidance"}</span><ExternalLink size={12} className="ml-auto" />
                        </a>}
                        {routeInfo && <a id={`lnk-view-hotel-from-flight-${activeRoute.id}`} href={localPath(routeInfo.hotelPath)} className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">
                          <Building size={14} className="text-brand-navy shrink-0" />
                          <span>{routeInfo.hotelPath === "/hotels" ? (isBn ? "হোটেল গাইড দেখুন" : "Browse hotel guides") : (isBn ? `${destination}-এ কোথায় থাকবেন` : `Where to stay in ${destination}`)}</span><ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>}

                        <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">

                          <Car size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? `${destination} Airport Transfer খুঁজুন` : `Find an Airport Transfer in ${destination}`}</span>

                          <ExternalLink size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                      </div>

                    </div>



                    <TravelIntelligence

                      pageTitle={isBn ? `${routeInfo?.fromBn} থেকে ${routeInfo?.toBn} ফ্লাইট গাইড` : `Flights from ${activeRoute.from} to ${activeRoute.to}`}

                      quickAnswer={activeRoute.quickAnswer}

                      keyFacts={activeRoute.keyFacts}

                      faqs={activeRoute.faqs}

                    />



      </div>



      {/* Keep supporting booking offers available without interrupting the mobile guide opening. */}

      <aside className="space-y-4 lg:col-start-2 lg:col-span-3 lg:row-start-3" aria-label={isBn ? "অতিরিক্ত বুকিং সহায়তা" : "Additional booking help"}>

        <div className="space-y-3 rounded-xl border border-slate-800 bg-brand-navy p-5 text-white shadow">

          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#F6B73C]">

            <Ticket size={12} aria-hidden="true" />

            <span>{isBn ? "বিশেষ সাশ্রয়" : "Special Offer"}</span>

          </span>

          <h2 className="ural-card-title font-serif text-sm font-bold">

            {isBn ? "টিকিট কেনার আগে মোট ভাড়া তুলনা করুন" : "Compare the total fare before you book"}

          </h2>

          <p className="text-[11px] leading-normal text-slate-300">

            {isBn

              ? "একই রুট ও তারিখে একাধিক এয়ারলাইন ও সেবাদাতার মোট ভাড়া মিলিয়ে দেখুন, তারপর ব্যাগেজ, পেমেন্ট চার্জ ও পরিবর্তনের শর্ত যাচাই করুন।"

              : "Compare the same route and dates across airlines and providers, then check baggage, payment fees and change conditions before paying."}

          </p>

        </div>



        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-navy">

            <Car size={12} aria-hidden="true" />

            <span>{isBn ? "ল্যান্ড করার পর" : "After You Land"}</span>

          </span>

          <p className="text-[11px] leading-normal text-slate-500">

            {isBn

              ? `${destination}-এ নেমে সরাসরি হোটেলে যেতে আগে থেকেই প্রাইভেট Airport Transfer বুক করুন।`

              : `Pre-book a private airport transfer to your hotel in ${destination}; check the pickup details and terms.`}

          </p>

          <PartnerLinkButton href={AFFILIATE_LINKS.kiwitaxi} label={isBn ? "Airport Transfer খুঁজুন" : "Find a Transfer"} variant="dark" />

        </div>

      </aside>

    </div>

        );

}
