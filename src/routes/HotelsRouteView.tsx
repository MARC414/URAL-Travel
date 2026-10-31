import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { Building, ArrowRight, MapPin, ExternalLink, Zap, ShieldCheck, Plane, Car } from "lucide-react";

import { TravelIntelligence } from "../components/AeoInspector";

import { resolvePartnerUrl, AFFILIATE_LINKS } from "../components/AffiliatePartners";

import { KlookHotelSpotlight } from "../components/KlookHotelSpotlight";



type RouteViewProps = { context: Record<string, any> };



export default function HotelsRouteView({ context }: RouteViewProps) {

  const { TravelEssentials, TravelpayoutsCustomWidget, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryCityWithIata, getCountryFlightId, getCountryVisaId, isBn, lang, localizedHotels, navigateTo, parameterId, section, setAreTpScriptsReady, triggerAffiliateToast } = context;

  const activeHotel = localizedHotels.find((hotel) => hotel.id === parameterId) || localizedHotels[0];



  return (

    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">

      {/* Put the page context before route navigation in the mobile reading order. */}

      <header className="space-y-4 lg:col-start-2 lg:col-span-3 lg:row-start-1">

        <div className="border-b border-slate-200 pb-5">

          <h1 className="ural-page-title font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">

            {isBn ? `${activeHotel.city}-এ কোথায় থাকবেন: সেরা এলাকা ও হোটেল গাইড` : `Where to Stay in ${activeHotel.city}: Best Areas & Hotels`}

          </h1>

        </div>

        <QuickAnswer
          id="hotel-aeo-quick-answer"
          label={isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
        >
          {activeHotel.quickAnswer}
        </QuickAnswer>

        <GuideJumpNav

          isBn={isBn}

          links={[

            { id: "hotel-neighborhoods", en: "Choose a neighborhood", bn: "এলাকা বেছে নিন" },

            { id: "hotel-curated-stays", en: "Compare curated stays", bn: "বাছাইকৃত হোটেল তুলনা করুন" },

            { id: "hotel-klook-check", en: "Second quote on Klook", bn: "Klook-এ দ্বিতীয় দাম" },

            { id: "hotel-ground-transport", en: "Transfers and local essentials", bn: "ট্রান্সফার ও স্থানীয় প্রয়োজনীয়তা" },

            { id: "hotel-internal-loop", en: "Related visa and flight guides", bn: "সম্পর্কিত ভিসা ও ফ্লাইট গাইড" },

            { id: "hotel-search", en: "Search hotel rates", bn: "হোটেলের ভাড়া খুঁজুন" },

            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

          ]}

        />

      </header>



      <aside className="lg:col-start-1 lg:row-start-1 lg:row-span-2" aria-label={isBn ? "শহর অনুযায়ী হোটেল গাইড" : "Hotel guides by city"}>

        <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">

          <label htmlFor="mobile-hotel-city-select" className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider text-slate-500">

            {isBn ? "শহর অনুযায়ী হোটেল গাইড:" : "CITY HOUSING DIRECTORY:"}

          </label>

          <select

            id="mobile-hotel-city-select"

            value={parameterId}

            onChange={(event) => navigateTo(`/hotels/${event.currentTarget.value}`)}

            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-brand-navy shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] lg:hidden"

          >

            {localizedHotels.map((hotel) => (

              <option key={hotel.id} value={hotel.id}>

                {isBn ? `${hotel.city} হোটেল গাইড` : `${hotel.city} Hotels Guide`}

              </option>

            ))}

          </select>

          <div className="hidden space-y-2 lg:block">

            {localizedHotels.map((col) => (

              <button

                key={col.id}

                id={`btn-hotel-select-${col.id}`}

                onClick={() => navigateTo(`/hotels/${col.id}`)}

                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-colors ${

                  parameterId === col.id

                    ? "border-brand-navy bg-brand-navy text-white shadow-md"

                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"

                }`}

              >

                <span className="inline-flex items-center gap-1.5">

                  <Building size={13} className={parameterId === col.id ? "text-[#F6B73C]" : "text-brand-navy"} aria-hidden="true" />

                  <span>{isBn ? `${col.city} হোটেল গাইড` : `${col.city} Hotels Guide`}</span>

                </span>

                <ArrowRight size={12} className={parameterId === col.id ? "text-[#F6B73C]" : "text-text-muted"} aria-hidden="true" />

              </button>

            ))}

          </div>

        </nav>

      </aside>



      <div className="min-w-0 ural-route-stack animate-fade-in lg:col-start-2 lg:col-span-3 lg:row-start-2">

                    {/* Neighborhoods breakdown */}

                    <div id="hotel-neighborhoods" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">

                        {isBn ? "থাকার জন্য সেরা এলাকা ও লোকেশন বিশ্লেষণ" : "Best Neighborhoods Area breakdown"}

                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {activeHotel.neighborhoods.map((zone) => (

                          <div key={zone.name} className="ural-card bg-white border border-border-subtle p-5 shadow-sm hover:shadow">

                            <span className="font-serif text-base font-bold text-brand-navy block">{zone.name}</span>

                            <span className="text-[10px] bg-slate-100 font-mono text-brand-navy font-bold rounded-full px-2 py-0.5 inline-block my-1">{zone.vibe}</span>

                            <p className="text-sm text-slate-700 leading-relaxed mt-2 font-sans">{zone.description}</p>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Curated Housing Grid list */}

                    <div id="hotel-curated-stays" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">

                        {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য বাছাইকৃত হোটেল" : "Curated Local Stays Selection"}

                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {activeHotel.hotels.map((room) => (

                          <div key={room.name} className="ural-card border border-border-subtle p-5 bg-white rounded-xl shadow-sm flex flex-col justify-between">

                            <div>

                              <div className="flex justify-between items-center mb-2">

                                <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full uppercase border ${

                                  room.category === "Luxury" ? "bg-amber-100 border-amber-300 text-amber-800" :

                                  room.category === "Budget" ? "bg-emerald-100 border-emerald-300 text-emerald-800" :

                                  "bg-indigo-100 border-indigo-300 text-indigo-800"

                                }`}>

                                  {room.category}

                                </span>

                                <span className="text-xs font-mono font-bold text-amber-500">{room.stars} ★</span>

                              </div>

                              <h3 className="ural-card-title font-serif font-bold text-slate-800 text-sm">{room.name}</h3>

                              <p className="text-[11px] text-text-muted mt-1 font-semibold italic flex items-center gap-1">

                                <MapPin size={11} className="text-[#F6B73C] shrink-0" />

                                <span>{room.neighborhood}</span>

                              </p>



                              <div className="flex flex-wrap gap-1 mt-3">

                                {room.features.slice(0, 3).map((f) => (

                                  <span key={f} className="text-[10px] font-mono bg-slate-100 text-brand-navy px-2 py-0.5 rounded border border-slate-200">{f}</span>

                                ))}

                              </div>

                            </div>



                            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">

                              <div>

                                <span className="text-xs font-mono text-slate-400 block">{isBn ? "প্রতি রাতের ভাড়া" : "Night Rate"}</span>

                                <span className="text-sm font-bold text-slate-800">৳ {room.priceBdt.toLocaleString()} BDT</span>

                              </div>



                              <a

                                id={`hotel-booking-btn-${room.name.toLowerCase().replace(/\s+/g, '-')}`}

                                href={resolvePartnerUrl(AFFILIATE_LINKS.klookHotels)}

                                target="_blank"

                                rel="noopener noreferrer sponsored"

                                onClick={() => {

                                  triggerAffiliateToast(

                                    isBn

                                      ? "Klook-এর বাছাইকৃত হোটেল তালিকা খুলছে। গন্তব্য ও তারিখ Klook-এ আবার দিন।"

                                      : "Opening Klook’s curated hotel collection. Re-enter your destination and dates there."

                                  );

                                }}

                                className="bg-brand-navy text-white hover:bg-[#1a4166] text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1.5 transition-colors"

                              >

                                {isBn ? "Klook-এ হোটেল দেখুন" : "Browse on Klook"} <ExternalLink size={10} />

                              </a>

                            </div>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Second-quote module: Klook hotel comparison, gated by the offer registry */}

                    <KlookHotelSpotlight city={activeHotel.city} lang={lang} />



                    {/* 🚕 Unified Airport Transfer & Travel Essentials Hub */}

                    <div id="hotel-ground-transport" className="ural-guide-jump-target">

                    <React.Suspense fallback={null}>

                      <TravelEssentials

                        country={activeHotel.city}

                        defaultTab="transfers"

                        compactHeader

                        lang={lang}

                      />

                    </React.Suspense>

                    </div>



                    {/* Flight & Visa Loop linkups */}

                    <div id="hotel-internal-loop" className="ural-guide-jump-target bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">

                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">

                        <Zap size={12} className="inline-block mr-1.5 -mt-0.5" />{isBn ? "ফ্লাইট রুট ও ভিসা গাইড:" : "FLIGHT ROUTING & ENTRY DETAILS:"}

                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">

                        <a

                          id={`lnk-view-visa-from-hotel-${activeHotel.id}`}

                          href={`/visa/${getCountryVisaId(activeHotel.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/visa/${getCountryVisaId(activeHotel.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <ShieldCheck size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? `${activeHotel.country} ভিসা চেকলিস্ট` : `Check ${activeHotel.country} Visa Checklist`}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          id={`lnk-view-flight-from-hotel-${activeHotel.id}`}

                          href={`/flights/${getCountryFlightId(activeHotel.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/flights/${getCountryFlightId(activeHotel.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Plane size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "ঢাকা থেকে ফ্লাইট রুট" : "Recommended Dhaka Flights"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          href={AFFILIATE_LINKS.kiwitaxi}

                          target="_blank"

                          rel="noopener noreferrer sponsored"

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-border-subtle rounded-lg text-left shadow-sm cursor-pointer"

                        >

                          <Car size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "Airport Transfer ভাড়া তুলনা" : "Compare Transfer Prices"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                      </div>

                    </div>



                    {/* Widget */}

                    <div id="hotel-search" className="ural-guide-jump-target">

                    {areTpScriptsReady ? (

                      <React.Suspense

                        fallback={

                          <TravelpayoutsWidgetSkeleton

                            variant="hotels"

                            isBn={isBn}

                            onInteract={() => setAreTpScriptsReady(true)}

                          />

                        }

                      >

                        <TravelpayoutsCustomWidget

                          initialTab="hotels"

                          initialHotelCity={activeHotel.city}

                          initialTo={getCountryCityWithIata(activeHotel.country)}

                        />

                      </React.Suspense>

                    ) : (

                      <TravelpayoutsWidgetSkeleton

                        variant="hotels"

                        isBn={isBn}

                        onInteract={() => setAreTpScriptsReady(true)}

                      />

                    )}

                    </div>



                    <TravelIntelligence

                      pageTitle={isBn ? `${activeHotel.city}-এ কোথায় থাকবেন` : `Where to stay in ${activeHotel.city}`}

                      quickAnswer={activeHotel.quickAnswer}

                      keyFacts={activeHotel.keyFacts}

                      faqs={activeHotel.faqs}

                    />



      </div>

    </div>

        );

}
