import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";

import { DollarSign, ArrowRight, ShieldCheck, Compass, Building } from "lucide-react";

import { TravelIntelligence } from "../components/AeoInspector";



type RouteViewProps = { context: Record<string, any> };



export default function CostsRouteView({ context }: RouteViewProps) {

  const { InteractiveTools, TravelEssentials, TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryDestId, getCountryHotelId, getCountryIata, getCountryVisaId, isBn, lang, localizedCosts, navigateTo, parameterId, section, setAreTpScriptsReady } = context;

  return (

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">



            {/* Sidebar list */}

            <div className="space-y-4 font-mono uppercase">

              <span className="text-xs font-bold text-slate-500 block font-sans">

                {isBn ? "দেশ অনুযায়ী ট্রিপ বাজেট গাইড" : "TRIP COST GUIDES"}

              </span>

              <div className="space-y-2 text-xs">

                {localizedCosts.map((c) => (

                  <button

                    key={c.id}

                    id={`btn-cost-select-${c.id}`}

                    onClick={() => navigateTo(`/costs/${c.id}`)}

                    className={`w-full text-left p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-colors cursor-pointer ${

                      parameterId === c.id

                        ? "bg-brand-navy text-white border-brand-navy shadow-md font-sans"

                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-sans"

                    }`}

                  >

                    <span><DollarSign size={12} className="inline-block mr-1 -mt-0.5" />{isBn ? `${c.country} ভ্রমণ খরচ` : `${c.country} Trip Cost`}</span>

                    <ArrowRight size={12} className={parameterId === c.id ? "text-[#F6B73C]" : "text-text-muted"} />

                  </button>

                ))}

              </div>

            </div>



            {/* Cost View Content Template */}

            <div className="lg:col-span-3 space-y-6">

              {(() => {

                const activeCost = localizedCosts.find(c => c.id === parameterId) || localizedCosts[0];

                return (

                  <div className="ural-route-stack animate-fade-in">



                    {/* Header */}

                    <div className="border-b border-slate-200 pb-5">

<h1 className="ural-page-title font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">

                        {isBn

                          ? `বাংলাদেশ থেকে ${activeCost.country} ভ্রমণের বিস্তারিত খরচ (BDT বাজেট চার্ট)`

                          : `${activeCost.country} Trip Cost from Bangladesh: Complete Price Matrix`}

                      </h1>

                    </div>



                    {/* AEO Quote */}

                    <div id="cost-aeo-text-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">

                      <span className="text-[10px] font-bold tracking-widest text-brand-navy font-mono block mb-1">

                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}

                      </span>

                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">

                        {activeCost.quickAnswer}

                      </p>

                    </div>



                    <GuideJumpNav

                      isBn={isBn}

                      links={[

                        { id: "cost-breakdown", en: "Full trip cost breakdown", bn: "সম্পূর্ণ ভ্রমণ খরচ" },

                        { id: "cost-seasonality", en: "How costs change by season", bn: "মৌসুমে খরচের পরিবর্তন" },

                        { id: "cost-saving-tips", en: "Ways to spend less", bn: "খরচ কমানোর কৌশল" },

                        { id: "cost-internal-loop", en: "Related visa and hotel guides", bn: "সম্পর্কিত ভিসা ও হোটেল গাইড" },

                        { id: "interactive-tools-panel", en: "Calculators and travel tools", bn: "ক্যালকুলেটর ও ট্রাভেল টুলস" },

                        { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

                      ]}

                    />



                    {/* Detailed matrix cost tables */}

                    <div id="cost-breakdown" className="ural-guide-jump-target space-y-4">

                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">

                        <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">

                          {isBn ? "খাতওয়ারী সম্পূর্ণ ভ্রমণ খরচের হিসাব (BDT)" : "Full Trip Cost Breakdown (BDT)"}

                        </h2>

                        <span className="text-xs text-brand-navy bg-emerald-50 border border-emerald-200 font-mono px-3 py-1 rounded">

                          {isBn ? "এক্সচেঞ্জ রেট:" : "Exchange Rate:"} {activeCost.exchangeRateText}

                        </span>

                      </div>



                      <div className="overflow-x-auto">

                        <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">

                          <thead>

                            <tr className="bg-brand-navy text-white">

                              <th className="p-4 font-serif font-bold">{isBn ? "খরচের খাত" : "What You'll Spend On"}</th>

                              <th className="p-4 font-mono font-bold">{isBn ? "বাজেট (Budget)" : "Budget"}</th>

                              <th className="p-4 font-mono font-bold">{isBn ? "মিড-রেঞ্জ (Mid-Range)" : "Mid-Range"}</th>

                              <th className="p-4 font-mono font-bold">{isBn ? "লাক্সারি (Luxury)" : "Luxury"}</th>

                            </tr>

                          </thead>

                          <tbody className="divide-y divide-slate-100">

                            {activeCost.categories.map((cat, idx) => (

                              <tr key={idx} className="hover:bg-slate-50 transition-colors">

                                <td className="p-4 font-medium text-slate-800">{cat.name}</td>

                                <td className="p-4 font-mono text-brand-emerald font-bold">৳ {cat.lowBdt.toLocaleString()}</td>

                                <td className="p-4 font-mono text-indigo-700 font-bold">৳ {cat.midBdt.toLocaleString()}</td>

                                <td className="p-4 font-mono text-amber-700 font-bold">৳ {cat.highBdt.toLocaleString()}</td>

                              </tr>

                            ))}

                          </tbody>

                        </table>

                      </div>



                      {/* Unified Conversion Widgets Block */}

                      <div className="space-y-6 mt-6">

                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">

                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">

                            {isBn ? `ঢাকা থেকে ${activeCost.country} ফ্লাইটের আজকের ভাড়া দেখুন` : `Check today's flight prices from Dhaka to ${activeCost.country}`}

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

                                defaultDestination={getCountryIata(activeCost.country)}

                              />

                            </React.Suspense>

                          ) : (

                            <TravelpayoutsWidgetSkeleton

                              variant="flights"

                              isBn={isBn}

                              onInteract={() => setAreTpScriptsReady(true)}

                            />

                          )}

                        </div>



                        <React.Suspense fallback={null}>

                          <TravelEssentials

                            country={activeCost.country}

                            defaultTab="transfers"

                            compactHeader

                            lang={lang}

                          />

                        </React.Suspense>

                      </div>

                    </div>



                    {/* Seasonal variations description */}

                    <div id="cost-seasonality" className="ural-guide-jump-target ural-card bg-slate-50 border border-border-subtle p-6 space-y-2">

                      <h2 className="ural-section-title font-serif font-black text-base text-slate-900">

                        {isBn ? "মৌসুম অনুযায়ী খরচের তারতম্য" : "How Prices Change by Season"}

                      </h2>

                      <p className="text-sm leading-relaxed text-slate-700 font-sans">

                        {activeCost.seasonalVariation}

                      </p>

                    </div>



                    {/* Money-saving hacks */}

                    <div id="cost-saving-tips" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title font-serif font-black text-lg text-brand-navy">

                        {isBn ? "খরচ কমানোর পরীক্ষিত কৌশল" : "Tips to Spend Less"}

                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {activeCost.moneyHacks.map((hack, idx) => (

                          <div key={idx} className="ural-card bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-2">

                            <span className="text-[10px] uppercase tracking-widest font-mono text-[#F6B73C] font-bold">

                              {isBn ? `টিপস #${idx + 1}` : `Tip ${idx + 1}`}

                            </span>

                            <p className="text-sm text-slate-700 leading-relaxed font-sans">{hack}</p>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Internal link graphs */}

                    <div id="cost-internal-loop" className="ural-guide-jump-target bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">

                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">

                        {isBn ? "এই ট্রিপের অন্যান্য গাইড" : "Also Plan For This Trip"}

                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">

                        <a

                          id={`lnk-view-visa-from-cost-${activeCost.id}`}

                          href={`/visa/${getCountryVisaId(activeCost.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/visa/${getCountryVisaId(activeCost.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <ShieldCheck size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "ভিসা চেকলিস্ট দেখুন" : "Passport Visa Checklist"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          id={`lnk-view-dest-from-cost-${activeCost.id}`}

                          href={`/destinations/${getCountryDestId(activeCost.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/destinations/${getCountryDestId(activeCost.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Compass size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "ট্যুর আইটিনারারি দেখুন" : "View Travel Itinerary"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          id={`lnk-view-hotel-from-cost-${activeCost.id}`}

                          href={`/hotels/${getCountryHotelId(activeCost.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/hotels/${getCountryHotelId(activeCost.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Building size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "সেরা হোটেল জোন" : "Curated Area Stays"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                      </div>

                    </div>



                    <React.Suspense fallback={null}>

                      <InteractiveTools />

                    </React.Suspense>



                    <TravelIntelligence

                      pageTitle={isBn ? `${activeCost.country} ভ্রমণের খরচের হিসাব` : `${activeCost.country} Trip Cost calculations`}

                      quickAnswer={activeCost.quickAnswer}

                      keyFacts={activeCost.keyFacts}

                      faqs={activeCost.faqs}

                    />



                  </div>

                );

              })()}

            </div>



          </div>

        );

}
