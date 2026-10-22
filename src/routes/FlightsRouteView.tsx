import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { AirHelpWidget } from "../components/AirHelpWidget";

import { ArrowRight, Ticket, Car, Bell, ShieldCheck, Building, ExternalLink } from "lucide-react";

import { PartnerLinkButton, AFFILIATE_LINKS } from "../components/AffiliatePartners";

import { TravelIntelligence } from "../components/AeoInspector";
import { FlightsIndex } from "../components/FlightsIndex";



type RouteViewProps = { context: Record<string, any> };



export default function FlightsRouteView({ context }: RouteViewProps) {

  const { TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryHotelId, getCountryIata, getCountryVisaId, isBn, lang, localizedFlights, navigateTo, openPriceAlert, parameterId, section, setAreTpScriptsReady } = context;

  const activeRoute = localizedFlights.find((route) => route.id === parameterId) || localizedFlights[0];

  // /flights (no route id) is the index; /flights/:id keeps the route template.
  if (!parameterId) {
    return <FlightsIndex routes={localizedFlights} isBn={isBn} navigateTo={navigateTo} />;
  }

  return (

    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">

      {/* The intro comes first in the DOM so mobile readers get context before route controls. */}

      <header className="space-y-4 lg:col-start-2 lg:col-span-3 lg:row-start-1">

        <div className="border-b border-slate-200 pb-5">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <h1 className="ural-page-title font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">

              {isBn ? `${activeRoute.from} থেকে ${activeRoute.to} ফ্লাইট গাইড` : `Flights from ${activeRoute.from} to ${activeRoute.to}`}

            </h1>

            <div className="flex items-center gap-2.5">

              <span className="rounded-full bg-[#F6B73C]/20 px-3 py-1.5 font-mono text-xs font-bold text-brand-navy">

                {activeRoute.priceRangeBdt.split(" (")[0]}

              </span>

              <button

                type="button"

                onClick={() => openPriceAlert(activeRoute.to)}

                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-emerald-700"

              >

                <Bell size={12} className="text-white" aria-hidden="true" />

                <span>{isBn ? "ফেয়ার অ্যালার্ট" : "Price Alert"}</span>

              </button>

            </div>

          </div>

        </div>



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

          <label htmlFor="mobile-flight-route-select" className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider text-slate-500">

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

              <button

                key={route.id}

                id={`btn-route-select-${route.id}`}

                onClick={() => navigateTo(`/flights/${route.id}`)}

                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-colors ${

                  parameterId === route.id

                    ? "border-brand-navy bg-brand-navy text-white shadow-md"

                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"

                }`}

              >

                <span className="inline-flex items-center gap-1.5">{route.from} <span className="font-bold text-[#F6B73C]">→</span> {route.to}</span>

                <ArrowRight size={12} className={parameterId === route.id ? "text-[#F6B73C]" : "text-text-muted"} />

              </button>

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

                            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>

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

                          ? "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে প্রতিদিন একাধিক ফ্লাইট এই রুটে চলাচল করে। সময় ও ভ্রমণ ক্লান্তি কমাতে Direct Flight বেছে নেওয়া সবচেয়ে সুবিধাজনক:"

                          : "Bangladeshi outbound travellers can leverage several daily flight profiles from Hazrat Shahjalal International Airport (DAC). Direct options are highly recommended to save travel fatigue:"}

                      </p>

                      <ul className="list-disc pl-5 space-y-1">

                        {activeRoute.airlines.map((airline) => (

                          <li key={airline} className="font-medium text-slate-800">{airline}</li>

                        ))}

                      </ul>



                      <h3 className="ural-card-title font-serif font-black text-base text-slate-900 mt-4">

                        {isBn ? "সবচেয়ে কম ভাড়ায় টিকেট কাটার উপযুক্ত সময়" : "When to Book for the Best Price"}

                      </h3>

                      <p>

                        {isBn ? (

                          <>

                            আমরা ভ্রমণের অন্তত <strong>{activeRoute.bestTimeToBook}</strong> ফ্লাইট টিকেট বুক করার পরামর্শ দিই। এতে শেষ মুহূর্তের অতিরিক্ত ভাড়া এড়ানো যায়। পাশাপাশি আপনার ভিসার মেয়াদ ও শর্তাবলী (<strong>{activeRoute.visaRequirement}</strong>) মিলিয়ে টিকেট ইস্যু করুন।

                          </>

                        ) : (

                          <>

                            We advise booking flights approximately <strong>{activeRoute.bestTimeToBook}</strong>. In doing so, economy flyers can generally avoid peak dynamic pricing models. Ensure that you synchronize your flight bookings with visa durations, which are pre-configured at {activeRoute.visaRequirement}.

                          </>

                        )}

                      </p>

                    </div>



                     {/* Embedded Conversion search form widget */}

                    <div id="flight-search" className="ural-guide-jump-target ural-card bg-slate-100 p-4 border border-border-subtle space-y-3">

                      <span className="text-[10px] font-mono font-bold text-brand-navy block">

                        {isBn ? "এই রুটের ফ্লাইট সার্চ করুন" : "Search Flights on This Route"}

                      </span>

                      {areTpScriptsReady ? (

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

                            defaultDestination={getCountryIata(activeRoute.country)}

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

                            ? "মাল্টি-সিটি, ওপেন-জ বা ভিন্ন এয়ারলাইন্সের কম্বো টিকিট খুঁজছেন?"

                            : "Looking for Multi-City, Open-Jaw, or Self-Transfer Airline Combos?"}

                        </span>

                        <PartnerLinkButton

                          href={AFFILIATE_LINKS.kiwi}

                          label={isBn ? "Kiwi.com-এ মাল্টি-সিটি ভাড়া দেখুন" : "Compare Multi-City Fares on Kiwi.com"}

                          variant="dark"

                        />

                      </div>

                    </div>



                    {/* 🛡️ AirHelp Flight Delay Compensation & AirHelp+ (AHTPO11 11% OFF) */}

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

                        <a

                          id={`lnk-view-visa-from-flight-${activeRoute.id}`}

                          href={`/visa/${getCountryVisaId(activeRoute.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/visa/${getCountryVisaId(activeRoute.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <ShieldCheck size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? `${activeRoute.country} ভিসা চেকলিস্ট দেখুন` : `Check ${activeRoute.country} Visa Checklist`}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          id={`lnk-view-hotel-from-flight-${activeRoute.id}`}

                          href={`/hotels/${getCountryHotelId(activeRoute.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/hotels/${getCountryHotelId(activeRoute.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Building size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? `${activeRoute.country}-এ কোথায় থাকবেন` : `Where to Stay in ${activeRoute.country}`}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">

                          <Car size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? `${activeRoute.country} Airport Transfer বুক করুন` : `Book Airport Transfer in ${activeRoute.country}`}</span>

                          <ExternalLink size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                      </div>

                    </div>



                    <TravelIntelligence

                      pageTitle={isBn ? `${activeRoute.country} ফ্লাইট গাইড` : `Flights to ${activeRoute.country}`}

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

            {isBn ? "আপনার পরবর্তী ফ্লাইট বুকিংয়ে সর্বোচ্চ BDT 3,500 সাশ্রয় করুন" : "Save up to BDT 3,500 on Your Next Booking"}

          </h2>

          <p className="text-[11px] leading-normal text-slate-300">

            {isBn

              ? `আপনার ${activeRoute.country || "Nepal"} ফ্লাইটের ভাড়া তুলনা করুন — ভেরিফায়েড পার্টনারের মাধ্যমে সর্বনিম্ন ভাড়া খুঁজুন।`

              : `Compare prices for your ${activeRoute.country || "Nepal"} flight — lowest fares through our verified booking partners.`}

          </p>

        </div>



        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-navy">

            <Car size={12} aria-hidden="true" />

            <span>{isBn ? "ল্যান্ড করার পর" : "After You Land"}</span>

          </span>

          <p className="text-[11px] leading-normal text-slate-500">

            {isBn

              ? `${activeRoute.country || "Nepal"}-এ নেমে সরাসরি হোটেলে যেতে আগে থেকেই প্রাইভেট Airport Transfer বুক করুন।`

              : `Pre-book a private airport transfer to your hotel in ${activeRoute.country || "Nepal"} — skip the taxi line.`}

          </p>

          <PartnerLinkButton href={AFFILIATE_LINKS.kiwitaxi} label={isBn ? "Airport Transfer খুঁজুন" : "Find a Transfer"} variant="dark" />

        </div>

      </aside>

    </div>

        );

}
