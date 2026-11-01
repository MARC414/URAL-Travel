import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { DESTINATION_HERO_IMAGES } from "../data/destinationHeroImages";
import { DESTINATION_HOTEL_GUIDES } from "../data/hotelGuideDestinations";

import { AFFILIATE_LINKS, resolvePartnerUrl } from "../components/AffiliatePartners";
import { getHotelGuideAffiliatePlacement } from "../utils/affiliatePlacement";

import { Compass, ArrowRight, MapPin, ExternalLink, Lightbulb, Plane, Building, ShieldCheck, FileText, Calendar, DollarSign, AlertTriangle, CreditCard } from "lucide-react";

import { DESTINATIONS_DATA as EN_DESTINATIONS_DATA } from "../constants";
import CityDestinationLanding from "../components/CityDestinationLanding";

import { KKdayPromoBanner } from "../components/KKdayPromoBanner";

import { TravelIntelligence } from "../components/AeoInspector";



type RouteViewProps = { context: Record<string, any> };



export default function DestinationsRouteView({ context }: RouteViewProps) {

  const { TravelEssentials, TravelpayoutsCustomWidget, TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryCityName, getCountryCityWithIata, getCountryIata, getCountryVisaId, getLocalizedRouteHref, isBn, isLanding, lang, localizedBlogs, localizedHotels = [], navigateTo, openPriceAlert, parameterId, section, setAreTpScriptsReady, triggerAffiliateToast } = context;
  const DESTINATIONS_DATA = context.localizedDestinations ?? EN_DESTINATIONS_DATA;

  if (!isLanding && ["nepal-guide", "thailand-guide", "malaysia-guide", "singapore-guide", "maldives-guide", "dubai-guide", "london-guide", "italy-guide", "paris-guide", "new-york-guide"].includes(parameterId)) {
    const destinationGuide = DESTINATIONS_DATA.find((destination: any) => destination.id === parameterId);
    if (destinationGuide) {
      return (
        <CityDestinationLanding
          guide={destinationGuide}
          blogs={localizedBlogs ?? []}
          lang={lang}
          onNavigate={navigateTo}
          areTpScriptsReady={areTpScriptsReady}
          setAreTpScriptsReady={setAreTpScriptsReady}
          TravelpayoutsWidgetSkeleton={TravelpayoutsWidgetSkeleton}
        />
      );
    }
  }

  if (isLanding) {
    const openGuide = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      navigateTo(path);
    };
    const localizedHref = (path: string) =>
      typeof getLocalizedRouteHref === "function"
        ? getLocalizedRouteHref(path)
        : isBn ? `/bn${path}` : path;

    return (
      <main className="space-y-7">
        <header className="max-w-3xl space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-emerald">
            {isBn ? "বাংলাদেশ থেকে ভ্রমণ পরিকল্পনা" : "PLAN A TRIP FROM BANGLADESH"}
          </p>
          <h1 className="ural-page-title font-serif text-3xl font-black text-slate-900 sm:text-4xl">
            {isBn ? "গন্তব্য গাইড" : "Destination Guides from Bangladesh"}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {isBn
              ? "বিদ্যমান গন্তব্য গাইডগুলো তুলনা করুন—দিনভিত্তিক রুট, স্থানীয় যাতায়াত এবং আপনার ভ্রমণ পরিকল্পনার জন্য প্রাসঙ্গিক পরামর্শসহ।"
              : "Browse our existing destination guides for itinerary outlines, local transport context and practical next steps. Each guide is a starting point to adapt to your dates and needs."}
          </p>
        </header>

        <section aria-label={isBn ? "গন্তব্য গাইডের তালিকা" : "Destination guide directory"}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {DESTINATIONS_DATA.map((guide: any, index: number) => {
              const image = DESTINATION_HERO_IMAGES[guide.id];
              if (!image) return null;
              const path = `/destinations/${guide.id}`;
              return (
                <a
                  key={guide.id}
                  href={localizedHref(path)}
                  onClick={(event) => openGuide(event, path)}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <ResponsiveImage
                      src={image.src}
                      alt={isBn ? image.altBn : image.altEn}
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : undefined}
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-navy shadow-sm">
                      {guide.country}
                    </span>
                  </div>
                  <div className="space-y-2 p-4 sm:p-5">
                    <h2 className="font-serif text-xl font-bold text-brand-navy">{guide.title || guide.country}</h2>
                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{guide.quickAnswer}</p>
                    <span className="inline-flex items-center gap-2 pt-1 text-sm font-bold text-brand-navy">
                      {isBn ? "গাইড খুলুন" : "Open destination guide"}
                      <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <nav aria-label={isBn ? "ভ্রমণ পরিকল্পনার বিভাগ" : "Other travel-planning guides"} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <h2 className="font-serif text-lg font-bold text-brand-navy">{isBn ? "পরবর্তী ধাপ" : "Plan the next step"}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { path: "/flights", en: "Flight routes", bn: "ফ্লাইট রুট" },
              { path: "/hotels", en: "Hotel area guides", bn: "হোটেল এলাকা গাইড" },
              { path: "/visa", en: "Visa guides", bn: "ভিসা গাইড" },
              { path: "/costs", en: "Trip costs", bn: "ভ্রমণ খরচ" },
            ].map((link) => (
              <a
                key={link.path}
                href={localizedHref(link.path)}
                onClick={(event) => openGuide(event, link.path)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-brand-navy hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
              >
                {isBn ? link.bn : link.en}
              </a>
            ))}
          </div>
        </nav>
      </main>
    );
  }

  return (

          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">



            {/* Sidebar list */}

            <div className="space-y-4 font-mono">

              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-sans">OUTBOUND ROUTE SUITES:</span>

              <div className="space-y-2 text-xs">

                {DESTINATIONS_DATA.map((des) => (

                  <button

                    key={des.id}

                    id={`btn-dest-select-${des.id}`}

                    onClick={() => navigateTo(`/destinations/${des.id}`)}

                    className={`w-full text-left p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-colors cursor-pointer ${

                      parameterId === des.id

                        ? "bg-brand-navy text-white border-brand-navy shadow-md font-sans"

                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-sans"

                    }`}

                  >

                    <span className="inline-flex items-center gap-1.5">

                      <Compass size={13} className={parameterId === des.id ? "text-[#F6B73C]" : "text-brand-navy"} />

                      <span>{des.country} Travel Guide</span>

                    </span>

                    <ArrowRight size={12} className={parameterId === des.id ? "text-[#F6B73C]" : "text-text-muted"} />

                  </button>

                ))}

              </div>

            </div>



            {/* Main Details content */}

            <div className="lg:col-span-3 space-y-6">

              {(() => {

                const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];
                const hotelGuide = localizedHotels.find(
                  (hotel: any) => hotel.id === DESTINATION_HOTEL_GUIDES[activeDes.id],
                );

                return activeDes.id === "dubai-guide" ? (

                  <div className="ural-route-stack animate-fade-in text-slate-800">

                    {/* DESTINATION GUIDE HEADER */}

                    <div className="border-b border-slate-200 pb-5">

{/* 🟦 1. HERO SECTION (TOP OF PAGE) */}

                          <h1 className="ural-page-title font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">

                            Dubai Travel Guide

                          </h1>

                          <p className="text-sm sm:text-base text-slate-500 mt-2 font-light">

                            Find flights, hotels, and plan your Dubai trip instantly

                          </p>

                        </div>



                        {/* 👉 INSERT FLIGHT SEARCH WIDGET (Travelpayouts) */}

                        {/* Widget placement rule: Must be first interactive element on page, Above all content */}

                        <div id="dubai-flight-conversion-widget" className="ural-guide-jump-target bg-brand-navy text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 animate-pulse-subtle">

                          <div className="space-y-2">

                            <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full inline-block">

                              FLIGHTS TO DUBAI (DXB) — DIRECT & TRANSIT FARES

                            </span>

                            <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-bold text-white">Search Cheapest Flights leaving Dhaka (DAC) to Dubai (DXB)</h2>

                            <p className="text-xs text-slate-300 leading-relaxed font-light">

                              Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000.

                            </p>

                          </div>

                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">

                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-3 px-1">LIVE FLIGHTS SEARCH</span>

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

                                <TravelpayoutsEmbed defaultDestination="DXB" />

                              </React.Suspense>

                            ) : (

                              <TravelpayoutsWidgetSkeleton

                                variant="flights"

                                isBn={isBn}

                                onInteract={() => setAreTpScriptsReady(true)}

                              />

                            )}

                          </div>

                        </div>



                        <GuideJumpNav

                          isBn={isBn}

                          links={[

                            { id: "dubai-quick-snapshot", en: "Dubai at a glance", bn: "দুবাই এক নজরে" },

                            { id: "dubai-accommodation", en: "Search accommodation", bn: "থাকার জায়গা খুঁজুন" },

                            { id: "dubai-best-areas", en: "Choose where to stay", bn: "থাকার এলাকা বেছে নিন" },

                            { id: "dubai-insights", en: "Booking and cost tips", bn: "বুকিং ও খরচের পরামর্শ" },

                            { id: "dubai-things-to-do", en: "Things to do", bn: "করণীয় ও দর্শনীয় স্থান" },

                            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

                          ]}

                        />



                        {/* 2. DUBAI QUICK SNAPSHOT */}

                        <div id="dubai-quick-snapshot" className="ural-guide-jump-target ural-panel bg-slate-50 border border-border-subtle p-6 space-y-4">

                          <div className="border-l-4 border-brand-navy pl-3">

                            <h2 className="font-serif font-black text-sm text-brand-navy uppercase tracking-wider">Dubai Quick Snapshot</h2>

                            <p className="text-[11px] text-slate-500 font-mono font-light">Instant travel context before you search accommodation options below.</p>

                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Best time to visit</span>

                              <span className="font-serif font-bold text-slate-800 text-xs block">November – March</span>

                            </div>

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Known for</span>

                              <span className="font-serif font-bold text-slate-800 text-xs block">luxury lifestyle, skyscrapers, beaches, shopping</span>

                            </div>

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Travel style</span>

                              <span className="font-serif font-bold text-slate-800 text-xs block">budget to luxury options available</span>

                            </div>

                            <a

                              href={AFFILIATE_LINKS.airalo}

                              target="_blank"

                              rel="noopener noreferrer sponsored"

                              className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1 cursor-pointer hover:border-[#F6B73C] block"

                            >

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Stay connected</span>

                              <span className="font-serif font-bold text-slate-800 text-xs block">Local eSIM from Airalo</span>

                            </a>

                          </div>

                        </div>



                        {/* 3. ACCOMMODATION SECTION */}

                        <div id="dubai-accommodation" className="ural-guide-jump-target ural-panel bg-slate-50 border border-border-subtle p-6 space-y-4">

                          <div className="space-y-1">

                            <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest block">

                              SECTION 2: ACCOMMODATION DIRECTORY

                            </span>

                            <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">{isBn ? "দুবাইয়ে থাকার এলাকা দেখুন" : "Explore Dubai Stay Areas"}</h2>

                            <p className="text-xs text-slate-500">

                              {isBn
                                ? "অবস্থান, যাতায়াত ও বুকিংয়ের শর্ত তুলনা করুন। পার্টনার সাইটে তারিখ ও অতিথির সংখ্যা আবার দিন।"
                                : "Compare location, transport access and booking terms. Re-enter your dates and guests on the partner site."}

                            </p>

                          </div>

                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">

                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">{isBn ? "হোটেল পার্টনার সার্চ" : "HOTEL PARTNER SEARCH"}</span>

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

                                  initialTo="Dubai (DXB)"

                                  initialHotelCity="Dubai"

                                  affiliatePlacement={hotelGuide ? getHotelGuideAffiliatePlacement(hotelGuide.id) : undefined}

                                  lang={lang}

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

                        </div>



                        {/* 📍 4. BEST AREAS TO STAY */}

                        <div id="dubai-best-areas" className="ural-guide-jump-target space-y-4 font-sans text-slate-800">

                          <div className="border-b border-slate-200 pb-2">

                            <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">Best Areas to Stay</h2>

                            <p className="text-xs text-slate-500">Curated neighborhoods targeting different traveler types & budget tiers.</p>

                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {[

                              { area: "Downtown Dubai", details: "luxury stays, Burj Khalifa view", hint: "Perfect for shopping and premium fountain views.", estimate: "৳12,000 / night" },

                              { area: "Dubai Marina", details: "nightlife, beach access, modern lifestyle", hint: "Unlocks spectacular marina harbor walks & yachts.", estimate: "৳18,000 / night" },

                              { area: "Deira", details: "budget-friendly, cultural experience", hint: "Offers traditional gold/spice souks and affordable diners.", estimate: "৳8,500 / night" }

                            ].map((item, index) => (

                              <div key={index} className="ural-card bg-white border border-slate-200 hover:border-[#F6B73C] p-5 shadow-sm flex flex-col justify-between transition-all transform hover:-translate-y-1">

                                <div className="space-y-2">

                                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 text-brand-navy px-2 py-0.5 rounded-full inline-block">

                                    <MapPin size={10} className="inline-block mr-1 -mt-0.5" />AREA RECOMMENDATION

                                  </span>

                                  <h3 className="ural-card-title font-serif font-bold text-sm text-slate-900">{item.area}</h3>

                                  <p className="text-xs text-slate-700"><strong>Pros:</strong> {item.details}</p>

                                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">{item.hint}</p>

                                </div>

                                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">

                                  <div>

                                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Typical Baseline</span>

                                    <span className="text-xs font-mono font-bold text-[#F6B73C]">{item.estimate}</span>

                                  </div>

                                  <button

                                    onClick={() => triggerAffiliateToast(`Finding the best available rates for hotels in ${item.area}. Opening booking page...`)}

                                    className="bg-brand-navy hover:bg-[#F6B73C] hover:text-brand-navy text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"

                                  >

                                    Check Hotels <ExternalLink size={10} />

                                  </button>

                                </div>

                              </div>

                            ))}

                          </div>

                        </div>



                        {/* 🚗 4. UNIFIED TABBED TRAVEL ESSENTIALS (Welcome Pickups, Kiwitaxi, Klook, Airalo, QEEQ) */}

                        <React.Suspense fallback={null}>

                          <TravelEssentials country="Dubai, UAE" />

                        </React.Suspense>



                        {/* 💡 5. TRAVEL INSIGHTS SECTION */}

                        <div id="dubai-insights" className="ural-guide-jump-target rounded-2xl bg-brand-navy/5 p-6 ring-1 ring-brand-navy/[0.07] space-y-3">

                          <div className="space-y-1">

                            <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy"><Lightbulb size={11} className="mr-1 -mt-0.5 inline-block" aria-hidden="true" />Booking Tips</span>

                            <h2 className="ural-section-title font-serif text-base font-bold text-brand-navy">Essential Dubai Booking Tips & Cost Hacks</h2>

                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="text-amber-500 font-bold flex items-center gap-1.5"><Plane size={13} /> Airfare Timing</span>

                              <p className="text-text-secondary leading-relaxed font-light">Mid-week flights are often cheaper</p>

                            </div>

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="text-amber-500 font-bold flex items-center gap-1.5"><Building size={13} /> Hotel Demand Peak</span>

                              <p className="text-text-secondary leading-relaxed font-light">Hotel prices increase during peak season (Dec–Jan)</p>

                            </div>

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="text-amber-500 font-bold flex items-center gap-1.5"><ShieldCheck size={13} /> Advance Booking</span>

                              <p className="text-text-secondary leading-relaxed font-light">Early booking improves price and availability</p>

                            </div>

                          </div>

                        </div>



                        {/* 🧭 7. THINGS TO DO IN DUBAI */}

                        <div id="dubai-things-to-do" className="ural-guide-jump-target space-y-4">

                          <div className="border-b border-slate-200 pb-2">

                            <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">Things to Do in Dubai</h2>

                            <p className="text-xs text-slate-500">Unmissable attractions with deep-linked partner rates.</p>

                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">

                            {[

                              { title: "Burj Khalifa visit", sub: "Ride the world's fastest elevator to level 124/125." },

                              { title: "Desert safari experience", sub: "Sunset dune bashing, camel riding, and Bedouin BBQ dining." },

                              { title: "Dubai Mall shopping", sub: "Explore unlimited retail lanes, internal aquarium, and cinema nodes." },

                              { title: "Marina cruise", sub: "Glide alongside multi-million yacht slips under starry nights." }

                            ].map((thing, idx) => (

                              <div key={idx} className="ural-card bg-white border border-slate-200 p-4 flex flex-col justify-between space-y-2 hover:border-[#F6B73C] transition-all">

                                <div className="space-y-1">

                                  <span className="font-mono text-[#F6B73C] text-[10px] block font-bold font-sans">#0{idx+1}</span>

                                  <p className="font-serif font-extrabold text-slate-900 text-xs">{thing.title}</p>

                                  <p className="text-[11px] text-slate-500 font-light">{thing.sub}</p>

                                </div>

                                <button

                                  onClick={() => triggerAffiliateToast(`Checking availability for: ${thing.title}. Opening booking page...`)}

                                  className="mt-2 text-[10px] text-brand-navy hover:text-[#F6B73C] hover:underline flex items-center gap-1 font-mono cursor-pointer font-bold"

                                >

                                  Secure Pass <ExternalLink size={8} />

                                </button>

                              </div>

                            ))}

                          </div>

                        </div>



                        {/* 🚀 8. FINAL CALL TO ACTION */}

                        <div id="dubai-final-cta" className="bg-brand-navy text-white p-8 rounded-2xl text-center space-y-4">

                          <div className="space-y-1 max-w-xl mx-auto">

                            <h2 className="ural-section-title font-serif font-black text-lg sm:text-2xl text-[#F6B73C]">Plan your Dubai trip now</h2>

                            <p className="text-xs sm:text-sm text-slate-300 font-light font-sans leading-relaxed">

                              Search flights, compare hotels, and book your journey

                            </p>

                          </div>

                          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-xs font-semibold">

                            <button

                              onClick={() => navigateTo("/flights")}

                              className="w-full sm:w-auto bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"

                            >

                              Search Outbound Flights

                            </button>

                            <button

                              onClick={() => navigateTo("/hotels")}

                              className="w-full sm:w-auto bg-transparent border border-white/40 hover:border-white text-white px-6 py-2.5 rounded-lg transition-colors cursor-pointer"

                            >

                              Compare Luxury Accommodations

                            </button>

                          </div>

                        </div>



                        {/* ⚙️ 9. INTERNAL LINKING (FOR SEO SCALING) */}

                        <div id="dubai-internal-linking" className="border-t border-slate-200 pt-6 space-y-3">

                          <span className="font-mono text-[10px] font-bold text-slate-400 block uppercase tracking-widest text-center font-sans">Explore More</span>

                          <div className="flex flex-wrap justify-center items-center gap-2.5 text-xs">

                            <button

                              onClick={() => navigateTo("/flights")}

                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all inline-flex items-center gap-1.5 cursor-pointer"

                            >

                              <Plane size={12} className="text-[#F6B73C]" />

                              <span>Cheap flights page (Dubai route)</span>

                            </button>

                            <button

                              onClick={() => navigateTo("/hotels")}

                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all inline-flex items-center gap-1.5 cursor-pointer"

                            >

                              <Building size={12} className="text-[#F6B73C]" />

                              <span>Hotel comparison page (Dubai)</span>

                            </button>

                            <button

                              onClick={() => navigateTo("/blog")}

                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all inline-flex items-center gap-1.5 cursor-pointer"

                            >

                              <FileText size={12} className="text-[#F6B73C]" />

                              <span>Travel guide articles</span>

                            </button>

                          </div>

                        </div>



                        <TravelIntelligence

                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}

                          quickAnswer={activeDes.quickAnswer}

                          keyFacts={activeDes.keyFacts}

                          faqs={activeDes.faqs}

                        />

                      </div>

                    ) : (

                      <div className="ural-route-stack animate-fade-in text-slate-800">



                        {/* DESTINATION GUIDE HEADER */}

                        <div className="border-b border-slate-200 pb-5">

                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#F6B73C] bg-brand-navy px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 uppercase mb-2">

                            <Compass size={11} className="text-[#F6B73C]" />

                            <span>Destination Guide</span>

                          </span>

                          <h1 className="ural-page-title font-serif text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">

                            {activeDes.title}

                          </h1>

                        </div>



                        {/* 2. TOP SECTION (PRIMARY CONVERSION ZONE) - FLIGHTS WIDGET FIRST */}

                        <div id="dest-primary-conversion" className="ural-guide-jump-target bg-brand-navy text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">

                          <div className="space-y-2">

                            <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-sans">

                              <Plane size={11} className="text-[#F6B73C]" />

                              <span>Book Your Flight</span>

                            </span>

                            <h2 className="ural-section-title font-serif text-xl sm:text-2xl font-bold">Flights Leaving Dhaka (DAC) to {getCountryCityWithIata(activeDes.country)}</h2>

                            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-light font-sans">

                              {activeDes.id === "nepal-guide" ? "Direct flights from Dhaka to Kathmandu take just 1 hour 30 minutes on Biman Bangladesh or Himalaya Airlines. Roundtrip fares typically run BDT 28,000–40,000. Compare prices for your dates below." :

                              activeDes.id === "thailand-guide" ? "Dhaka to Bangkok takes about 2.5 hours direct. Thai Airways, Biman, US-Bangla, and Thai Lion Air fly this route. Roundtrip fares usually start around BDT 31,500." :

                              activeDes.id === "malaysia-guide" ? "Dhaka to Kuala Lumpur takes about 3 hours 50 minutes. Malaysia Airlines, AirAsia, Biman, and Batik Air all fly direct. Expect BDT 36,000–48,000 roundtrip." :

                              activeDes.id === "singapore-guide" ? "Direct flights from Dhaka to Singapore Changi (SIN) take 4 hours 15 minutes on Singapore Airlines, Biman, and US-Bangla. Roundtrip fares start around BDT 42,000." :

                              activeDes.id === "maldives-guide" ? "Direct flights from Dhaka to Malé (MLE) take 4 hours 10 minutes on US-Bangla Airlines, or 1-stop via Colombo on SriLankan Airlines. Free 30-day Visa on Arrival for Bangladeshis." :

                              activeDes.id === "dubai-guide" ? "Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000." : "Lock down lowest flight options direct from Dhaka."}

                            </p>

                          </div>



                          {/* Travelpayouts Flights widget */}

                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">

                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">LIVE FLIGHTS COMPARISON ENGINE</span>

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

                                  defaultDestination={getCountryIata(activeDes.country)}

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

                          </div>

                        </div>



                        <GuideJumpNav

                          isBn={isBn}

                          links={[

                            { id: "dest-snapshot-bento", en: "Destination at a glance", bn: "গন্তব্য এক নজরে" },

                            { id: "dest-secondary-conversion", en: "Search hotels", bn: "হোটেল খুঁজুন" },

                            { id: "dest-curated-stays", en: "Browse recommended stays", bn: "প্রস্তাবিত হোটেল দেখুন" },

                            { id: "dest-things-to-do", en: "Explore the itinerary", bn: "ভ্রমণসূচি দেখুন" },

                            { id: "dest-flight-insights", en: "Planning and cost tips", bn: "পরিকল্পনা ও খরচের পরামর্শ" },

                            { id: "dest-planning-links-hub", en: "Plan the rest of your trip", bn: "বাকি ট্রিপ পরিকল্পনা করুন" },

                            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

                          ]}

                        />



                        {/* 3. DESTINATION SNAPSHOT SECTION (FAST CONTEXT) */}

                        <div id="dest-snapshot-bento" className="ural-guide-jump-target ural-panel bg-slate-50 border border-border-subtle p-6 space-y-4">

                          <div className="border-l-4 border-brand-navy pl-3">

                            <h2 className="font-serif font-black text-sm text-brand-navy uppercase tracking-wider">Quick Facts</h2>

                            <p className="text-[11px] text-slate-500 font-mono">Quick decision support parameters before searching accommodation.</p>

                          </div>



                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Best Time To Visit</span>

                              <span className="font-serif font-bold text-slate-800 text-xs block">{activeDes.bestTimeToVisit}</span>

                            </div>

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Average Cost Index</span>

                              <span className="font-mono font-bold text-[#F6B73C] text-xs block">

                                {activeDes.id === "nepal-guide" ? "Highly Budget-Friendly (approx BDT 3,500/day local expense)" :

                                activeDes.id === "thailand-guide" ? "Affordable Mid-Range (approx BDT 6,000/day local expense)" :

                                activeDes.id === "malaysia-guide" ? "Family-Friendly Budget (approx BDT 7,500/day local expense)" :

                                activeDes.id === "singapore-guide" ? "Smart Urban Comfort (approx BDT 11,500/day local expense)" :

                                activeDes.id === "maldives-guide" ? "Local Island Budget (approx BDT 8,500/day on Maafushi)" :

                                activeDes.id === "dubai-guide" ? "Premium Business Luxury (approx BDT 14,000/day local expense)" : "Sufficient BDT 5,000/day"}

                              </span>

                            </div>

                            <div className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Optimal Travel Style</span>

                              <span className="text-text-secondary leading-snug block font-sans">

                                {activeDes.id === "nepal-guide" ? "High-altitude trekking, organic dining, and historical pagoda walks." :

                                activeDes.id === "thailand-guide" ? "Multi-mall shopping, marine activities, and street food market tasting." :

                                activeDes.id === "malaysia-guide" ? "Urban adventure, Genting theme parks, and tropical reserve strolls." :

                                activeDes.id === "singapore-guide" ? "MRT city exploration, Sentosa theme parks, Gardens by the Bay & Mustafa shopping." :

                                activeDes.id === "maldives-guide" ? "Maafushi coral reef snorkeling, sandbank picnics, and 1-day luxury resort passes." :

                                activeDes.id === "dubai-guide" ? "Desert dune riding, observation deck sightseeing, and beach luxury resorts." : "Casual exploration"}

                              </span>

                            </div>

                            <a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="ural-card bg-white p-4 border border-border-faint shadow-sm space-y-1 block hover:border-[#F6B73C] cursor-pointer">

                              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase block">Stay Connected</span>

                              <span className="font-serif font-bold text-slate-800 text-xs block">Local eSIM from Airalo</span>

                            </a>

                          </div>

                        </div>



                        {/* 4. HOTEL SEARCH SECTION (SECONDARY CONVERSION ZONE) */}

                        <div id="dest-secondary-conversion" className="ural-guide-jump-target ural-panel bg-slate-50 border border-border-subtle p-6 space-y-4">

                          <div className="space-y-1">

                            <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest inline-flex items-center gap-1.5 font-sans">

                              <Building size={11} className="text-brand-navy" />

                              <span>Find a Hotel</span>

                            </span>

                            <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">Compare Accommodations in {getCountryCityName(activeDes.country)}</h2>

                            <p className="text-xs text-slate-500">

                              Now that your travel days are mapped, click to lock Halal-certified suites or cheap family units near critical transit points.

                            </p>

                          </div>



                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">

                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">{isBn ? "হোটেল পার্টনার সার্চ" : "HOTEL PARTNER SEARCH"}</span>

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

                                  initialTo={getCountryCityWithIata(activeDes.country)}

                                  initialHotelCity={getCountryCityName(activeDes.country)}

                                  affiliatePlacement={hotelGuide ? getHotelGuideAffiliatePlacement(hotelGuide.id) : undefined}

                                  lang={lang}

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

                        </div>



                        {/* 5. HOTEL AREA GUIDANCE — no static properties, ratings or nightly prices */}
                        <section id="dest-curated-stays" className="ural-guide-jump-target space-y-4">
                          <div className="border-b border-slate-200 pb-2">
                            <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">
                              {isBn ? "থাকার এলাকা তুলনা করুন" : "Compare Areas Before Choosing a Stay"}
                            </h2>
                            <p className="text-xs text-slate-500">
                              {isBn
                                ? "এলাকার নাম কেবল পরিকল্পনার শুরু—নির্দিষ্ট হোটেলের মান, প্রাপ্যতা বা দামের নিশ্চয়তা নয়। ঠিকানা, যাতায়াত, রুমের শর্ত ও বাতিলের নিয়ম যাচাই করুন।"
                                : "Neighborhood names are a starting point, not a rating or a promise about a specific property's availability or price. Check the exact address, access, room terms and cancellation rules."}
                            </p>
                          </div>

                          {hotelGuide?.neighborhoods?.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {hotelGuide.neighborhoods.map((area: any) => (
                                <article key={area.name} className="ural-card bg-white border border-slate-200 p-4 shadow-sm">
                                  <div className="flex items-start gap-2">
                                    <MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold-ink" aria-hidden="true" />
                                    <div>
                                      <h3 className="ural-card-title font-serif font-bold text-sm text-slate-900">{area.name}</h3>
                                      <p className="mt-1 text-[11px] text-brand-navy font-semibold">{area.vibe}</p>
                                    </div>
                                  </div>
                                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">{area.description}</p>
                                </article>
                              ))}
                            </div>
                          ) : (
                            <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                              {isBn ? "হোটেল এলাকা ও বুকিং শর্তের ব্যবহারিক চেকলিস্ট দেখুন।" : "Use the hotel guide for practical area and booking-term checks."}
                            </p>
                          )}

                          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                            <div className="flex flex-wrap items-center gap-3">
                              {hotelGuide && (
                                <button
                                  type="button"
                                  onClick={() => navigateTo(`/hotels/${hotelGuide.id}`)}
                                  className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                                >
                                  {isBn ? "শহরের হোটেল গাইড দেখুন" : "Open the city hotel guide"}
                                  <ArrowRight size={13} aria-hidden="true" />
                                </button>
                              )}
                              <a
                                href={resolvePartnerUrl(AFFILIATE_LINKS.klookHotels)}
                                data-affiliate-placement={hotelGuide ? getHotelGuideAffiliatePlacement(hotelGuide.id) : undefined}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                onClick={() => triggerAffiliateToast(isBn
                                  ? "Klook-এর সাধারণ হোটেল তালিকা খুলছে। গন্তব্য, তারিখ ও অতিথি আবার দিন।"
                                  : "Opening Klook’s general hotel collection. Re-enter your destination, dates and guests.")}
                                className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold text-brand-navy transition-colors hover:bg-amber-100"
                              >
                                {isBn ? "Klook-এর হোটেল তালিকা দেখুন" : "Browse Klook hotel collection"}
                                <ExternalLink size={12} aria-hidden="true" />
                              </a>
                            </div>
                            <p className="mt-3 text-[11px] leading-5 text-slate-600">
                              {isBn
                                ? "Klook-এর লিংকটি সাধারণ তালিকা খোলে—নির্বাচিত হোটেল বা তারিখের লাইভ কোট নয়। গন্তব্য, তারিখ ও অতিথি Klook-এ আবার দিন। যোগ্য বুকিংয়ে URAL কমিশন পেতে পারে; আপনার জন্য ছাড় নয়।"
                                : "Klook opens a general collection—not a live quote for a selected hotel or dates. Re-enter destination, dates and guests on Klook. URAL may earn commission on qualifying bookings; this is not a traveller discount."}
                            </p>
                          </div>
                        </section>


                                                {/* 🚗 TRAVEL ESSENTIALS & SERVICES (Taxis, eSIMs, Rentals, Activities) */}

                        <React.Suspense fallback={null}>

                          <TravelEssentials country={activeDes.country} />

                        </React.Suspense>



                        {/* 6. FLIGHT PRICE / DEAL INSIGHT SECTION */}

                        <div id="dest-flight-insights" className="ural-guide-jump-target rounded-2xl bg-brand-navy/5 p-6 ring-1 ring-brand-navy/[0.07] space-y-3">

                          <div className="space-y-1">

                            <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy">Flight Prices &amp; Timing</span>

                            <h2 className="ural-section-title font-serif text-base font-bold text-brand-navy">Typical Flight Prices (Dhaka to {getCountryCityWithIata(activeDes.country)})</h2>

                          </div>



                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">

                            <div className="space-y-1">

                              <span className="font-semibold block text-slate-700"><Calendar size={12} className="inline-block mr-1.5 -mt-0.5" />Best Months to Book Lower Fares:</span>

                              <p className="text-text-secondary leading-relaxed font-sans">

                                {activeDes.id === "nepal-guide" ? "September & May represent low tourism price cycles." :

                                activeDes.id === "thailand-guide" ? "June & September mark monsoon sales with high airline availability." :

                                activeDes.id === "malaysia-guide" ? "March & October see significant carrier promo codes online." :

                                activeDes.id === "singapore-guide" ? "February–May and July–August offer lower hotel & airfare combinations." :

                                activeDes.id === "maldives-guide" ? "May, October & November shoulder months drop resort & flight rates by 30%." :

                                "July & August are extremely hot but yield major airfare drops."}

                              </p>

                            </div>

                            <div className="space-y-1">

                              <span className="font-semibold block text-slate-700"><DollarSign size={12} className="inline-block mr-1.5 -mt-0.5" />Return Airfare typical baseline:</span>

                              <span className="text-[#F6B73C] font-mono font-extrabold text-xs block">

                                {activeDes.id === "nepal-guide" ? "৳28,000 – ৳36,000 Return" :

                                activeDes.id === "thailand-guide" ? "৳31,500 – ৳42,000 Return" :

                                activeDes.id === "malaysia-guide" ? "৳36,000 – ৳46,000 Return" :

                                activeDes.id === "singapore-guide" ? "৳42,000 – ৳56,000 Return" :

                                activeDes.id === "maldives-guide" ? "৳46,000 – ৳62,000 Return" :

                                "৳58,000 – ৳72,000 Return"}

                              </span>

                            </div>

                          </div>



                          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl text-[11px] text-text-secondary flex items-start gap-2.5">

                            <span className="text-amber-500 mt-0.5 shrink-0"><AlertTriangle size={14} /></span>

                            <span className="font-sans"><b>Alert:</b> {

                              activeDes.id === "nepal-guide" ? "Flights during festivals peak heavily. Book at least 3 weeks in advance!" :

                              activeDes.id === "thailand-guide" ? "Weekend departure prices surge by 20%. Select Tuesday or Wednesday flights." :

                              activeDes.id === "malaysia-guide" ? "Direct Biman or AirAsia paths get booked up. Lock flight slots early for families." :

                              activeDes.id === "singapore-guide" ? "Submit your free SG Arrival Card within 72 hours before departure alongside your printed e-Visa!" :

                              activeDes.id === "maldives-guide" ? "Complete the free IMUGA Traveller Declaration within 96 hours before flying to Malé!" :

                              "Transit-based routes via Muscat are up to BDT 15,000 cheaper than direct options!"

                            }</span>

                          </div>

                        </div>



                        {/* 7. THINGS TO DO SECTION (CONTENT + RETENTION LAYER) */}

                        <div id="dest-things-to-do" className="ural-guide-jump-target space-y-4">

                          <h2 className="ural-section-title font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Suggested Itinerary</h2>

                          <div className="space-y-6">

                            {activeDes.itinerary.map((dayPlan) => (

                              <div key={dayPlan.day} className="relative pl-8 border-l-2 border-slate-200 ml-4 space-y-2 font-sans">

                                {/* Visual Timeline Bulb */}

                                <div className="absolute -left-3 top-1 w-5.5 h-5.5 rounded-full bg-brand-navy text-white flex items-center justify-center font-mono font-bold text-[10px]">

                                  D{dayPlan.day}

                                </div>

                                <h3 className="ural-card-title font-serif text-base font-bold text-brand-navy">{dayPlan.title}</h3>

                                <ul className="space-y-1.5 text-xs text-text-secondary">

                                  {dayPlan.activities.map((act, innerIndex) => (

                                    <li key={innerIndex} className="flex gap-2">

                                      <span className="text-slate-400 font-bold font-mono">▸</span>

                                      <span>{act}</span>

                                    </li>

                                  ))}

                                </ul>

                              </div>

                            ))}

                          </div>



                          {/* local city transportation hacks */}

                          <div className="ural-panel space-y-3 bg-slate-50 border border-border-subtle p-5 mt-4">

                            <h3 className="ural-card-title font-serif font-bold text-sm text-slate-900">Local Inner-City Transport hacks</h3>

                            <ul className="space-y-2 text-xs text-slate-700">

                              {activeDes.localTransport.map((trans, idx) => (

                                <li key={idx} className="flex items-start gap-2.5">

                                  <span className="w-5 h-5 rounded bg-slate-200 text-brand-navy font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>

                                  <span>{trans}</span>

                                </li>

                              ))}

                            </ul>

                          </div>

                        </div>



                        {/* 7B. KKDAY 10.10 WINTER SALE & ASIA TOURS */}

                        {(activeDes.id === "thailand" ||

                          activeDes.id === "malaysia" ||

                          activeDes.id === "singapore") && (

                          <KKdayPromoBanner

                            lang={lang}

                            variant="compact"

                            cityContext={activeDes.country}

                            onNavigate={navigateTo}

                          />

                        )}



                        {/* 8. TRAVEL PLANNING CTA SECTION */}

                        <div id="dest-planning-links-hub" className="ural-guide-jump-target bg-brand-navy/5 border border-slate-200/60 p-6 rounded-2xl space-y-4 text-center">

                          <div className="space-y-1 max-w-xl mx-auto">

                            <h2 className="ural-section-title font-serif font-bold text-slate-900 text-base">Ready to Book?</h2>

                            <p className="text-xs text-slate-500">Move deeper into our integrated, certified airfare and hotel booking channels to guarantee secure pricing codes.</p>

                          </div>



                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">

                            <a

                              href="/flights"

                              onClick={(e) => { e.preventDefault(); navigateTo("/flights"); }}

                              className="bg-brand-navy text-white hover:bg-slate-800 p-3 rounded-xl transition-colors"

                            >

                              Find Cheap Flights →

                            </a>

                            <a

                              href="/hotels"

                              onClick={(e) => { e.preventDefault(); navigateTo("/hotels"); }}

                              className="bg-brand-navy text-white hover:bg-slate-800 p-3 rounded-xl transition-colors"

                            >

                              Check Hotel Directories →

                            </a>

                            <a

                              href={`/visa/${getCountryVisaId(activeDes.country)}`}

                              onClick={(e) => { e.preventDefault(); navigateTo(`/visa/${getCountryVisaId(activeDes.country)}`); }}

                              className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] p-3 rounded-xl transition-colors"

                            >

                              View Visa Guidelines →

                            </a>

                          </div>

                        </div>



                        {/* 9. INTERNAL SEO LINKING SECTION */}

                        <div id="dest-seo-internal" className="border-t border-slate-200 pt-6 space-y-3">

                          <span className="font-mono text-[10px] font-bold text-slate-400 block uppercase tracking-widest text-center font-sans">Other Destinations</span>

                          <div className="flex flex-wrap justify-center items-center gap-2 text-xs">

                            {DESTINATIONS_DATA.filter(d => d.id !== activeDes.id).map((other) => (

                              <a

                                key={other.id}

                                href={`/destinations/${other.id}`}

                                onClick={(e) => { e.preventDefault(); navigateTo(`/destinations/${other.id}`); }}

                                className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium inline-flex items-center gap-1.5"

                              >

                                <Compass size={12} className="text-[#F6B73C] shrink-0" />

                                <span>{other.country} Outbound Guide</span>

                              </a>

                            ))}

                            <a

                              href="/visa"

                              onClick={(e) => { e.preventDefault(); navigateTo("/visa"); }}

                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium inline-flex items-center gap-1.5"

                            >

                              <ShieldCheck size={12} className="text-[#F6B73C] shrink-0" />

                              <span>Embassy Visa Center</span>

                            </a>

                            <a

                              href="/costs"

                              onClick={(e) => { e.preventDefault(); navigateTo("/costs"); }}

                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium inline-flex items-center gap-1.5"

                            >

                              <CreditCard size={12} className="text-[#F6B73C] shrink-0" />

                              <span>Dual-Currency Costs Analyzer</span>

                            </a>

                          </div>

                        </div>



                        <TravelIntelligence

                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}

                          quickAnswer={activeDes.quickAnswer}

                          keyFacts={activeDes.keyFacts}

                          faqs={activeDes.faqs}

                        />



                      </div>

                    )

                  ;

                })()}

            </div>



          </div>

        );

}
