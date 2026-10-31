import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { Building, ArrowRight, Zap, ShieldCheck, Plane, Car } from "lucide-react";

import { TravelIntelligence } from "../components/AeoInspector";

import { KlookHotelSpotlight } from "../components/KlookHotelSpotlight";
import { AFFILIATE_LINKS } from "../components/AffiliatePartners";
import { getHotelGuideAffiliatePlacement } from "../utils/affiliatePlacement";

import { EditorialPageHero } from "../components/EditorialPageHero";



type RouteViewProps = { context: Record<string, any> };



export default function HotelsRouteView({ context }: RouteViewProps) {

  const { TravelEssentials, TravelpayoutsCustomWidget, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryCityWithIata, getCountryFlightId, getCountryVisaId, isBn, lang, localizedHotels, navigateTo, parameterId, section, setAreTpScriptsReady } = context;

  const activeHotel = localizedHotels.find((hotel) => hotel.id === parameterId) || localizedHotels[0];

  if (!parameterId) {
    return (
      <div className="space-y-7">
        <EditorialPageHero
          eyebrow={isBn ? "আন্তর্জাতিক হোটেল গাইড" : "INTERNATIONAL HOTEL GUIDES"}
          title={isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য হোটেল এলাকা গাইড" : "Hotel & Stay Guides for Trips from Bangladesh"}
          description={isBn
            ? "কাঠমান্ডু, ব্যাংকক, কুয়ালালামপুর, দুবাই, সিঙ্গাপুর ও মালদ্বীপে থাকার এলাকা, হোটেল এবং বুকিংয়ের পরামর্শ তুলনা করুন।"
            : "Compare neighborhoods, hotel options and practical booking advice for Kathmandu, Bangkok, Kuala Lumpur, Dubai, Singapore and the Maldives."}
          imageSrc="/assets/images/hotels_london_marylebone_exterior_20261101-1200.webp"
          imageAlt={isBn
            ? "লন্ডনের হ্যাম ইয়ার্ড হোটেলের প্রবেশপথে ইউনিয়ন জ্যাক পতাকা"
            : "Hotel entrance and Union Jack flag outside a London hotel"}
          imageSizes="(min-width: 1024px) 45vw, 100vw"
          credit={
            <a href="https://www.pexels.com/search/hotel%20in%20london/" target="_blank" rel="noopener noreferrer">
              Pexels · Ham Yard Hotel, London (photo 3494638)
            </a>
          }
        />

        <section aria-labelledby="hotel-guide-index-title" className="space-y-3">
          <div>
            <h2 id="hotel-guide-index-title" className="ural-section-title font-serif text-xl font-bold text-slate-900">
              {isBn ? "গন্তব্য অনুযায়ী থাকার গাইড বেছে নিন" : "Choose a hotel guide by destination"}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {isBn ? "প্রতিটি গাইডে এলাকার বৈশিষ্ট্য, বাছাইকৃত থাকার জায়গা এবং বুকিংয়ের আগে যাচাই করার বিষয় রয়েছে।" : "Each guide covers neighborhood trade-offs, example stays and practical checks to make before booking."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {localizedHotels.map((hotel) => (
              <a
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(`/hotels/${hotel.id}`);
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-navy">{hotel.city}</h3>
                    <p className="text-xs font-semibold text-slate-500">{hotel.country}</p>
                  </div>
                  <ArrowRight size={16} className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-navy" aria-hidden="true" />
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{hotel.quickAnswer}</p>
                <p className="mt-4 text-xs font-bold text-brand-navy">
                  {isBn ? `${hotel.neighborhoods.length}টি এলাকার গাইড` : `${hotel.neighborhoods.length} neighborhoods covered`}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">

      {/* Put the page context before route navigation in the mobile reading order. */}

      <header className="space-y-4 lg:col-start-2 lg:col-span-3 lg:row-start-1">

        <EditorialPageHero
          eyebrow={isBn ? "শহরভিত্তিক থাকার গাইড" : "CITY STAY GUIDE"}
          title={isBn
            ? `${activeHotel.city}-এ কোথায় থাকবেন: এলাকা তুলনা ও বুকিং চেকলিস্ট`
            : `Where to Stay in ${activeHotel.city}: Neighborhoods & Booking Checklist`}
          description={isBn
            ? `${activeHotel.city}-এ থাকার এলাকা ও বুকিংয়ের শর্ত তুলনা করুন। আমরা স্থির রাতপ্রতি দাম দিই না—আপনার তারিখে বর্তমান মোট দাম, রুমের শর্ত ও প্রাপ্যতা যাচাই করুন।`
            : `Compare neighborhoods and booking terms in ${activeHotel.city}. We do not publish fixed nightly rates; check current totals, room terms and availability for your dates.`}
          imageSrc="/assets/images/hotel_guide_guest_room_20261101-1200.webp"
          imageAlt={isBn
            ? "দুইজনের বিছানা ও উষ্ণ আলোসহ একটি পরিচ্ছন্ন হোটেল কক্ষ"
            : "A clean hotel guest room with a double bed and warm bedside lighting"}
          credit={
            <a href="https://www.pexels.com/photo/interior-design-of-hotel-room-19045884" target="_blank" rel="noopener noreferrer">
              Pexels · hotel room photo
            </a>
          }
        />

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

            { id: "hotel-curated-stays", en: "Compare hotel areas and booking checks", bn: "হোটেল এলাকা ও বুকিং যাচাই করুন" },

            { id: "hotel-klook-check", en: "Search Klook hotel collection", bn: "Klook হোটেল তালিকা সার্চ" },

            { id: "hotel-ground-transport", en: "Transfers and local essentials", bn: "ট্রান্সফার ও স্থানীয় প্রয়োজনীয়তা" },

            { id: "hotel-internal-loop", en: "Related visa and flight guides", bn: "সম্পর্কিত ভিসা ও ফ্লাইট গাইড" },

            { id: "hotel-search", en: "Search hotel partner listings", bn: "পার্টনার সাইটে হোটেল খুঁজুন" },

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

                        {isBn ? "তুলনা করার মতো থাকার এলাকা" : "Neighborhoods to compare"}

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



                    {/* Live hotel search guidance: no static rates or unverified property cards. */}

                    <section id="hotel-curated-stays" className="ural-guide-jump-target space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">

                        {isBn ? "বর্তমান হোটেল বিকল্প কীভাবে যাচাই করবেন" : "How to check current hotel options"}

                      </h2>

                      <p className="text-sm leading-relaxed text-slate-700">

                        {isBn
                          ? "এই গাইডে স্থির রাতপ্রতি হোটেল-দাম বা নির্দিষ্ট হোটেলের অফার দেখানো হয় না। তারিখ, অতিথিসংখ্যা, রুমের ধরন, খাবার, ট্যাক্স, সার্ভিস চার্জ, মুদ্রা ও বাতিলের শর্তে চূড়ান্ত মোট দাম বদলাতে পারে। নিচের পার্টনার লিংক সাধারণ হোটেল তালিকা খোলে—এটি নির্বাচিত হোটেল বা তারিখের লাইভ কোট নয়।"
                          : "This guide does not publish fixed nightly hotel rates or property-specific offers. The final total can vary by dates, guest count, room type, meals, taxes, service charges, currency and cancellation terms. The partner link below opens a general hotel collection—not a live quote for a selected property or dates."}

                      </p>

                      <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">

                        <li className="rounded-lg bg-slate-50 p-3">{isBn ? "একই তারিখ, রাতের সংখ্যা, অতিথিসংখ্যা ও রুমের ধরন দিয়ে তুলনা করুন।" : "Match dates, nights, guest count and room type."}</li>

                        <li className="rounded-lg bg-slate-50 p-3">{isBn ? "চূড়ান্ত মোট দাম, অন্তর্ভুক্ত খাবার, চার্জ ও পেমেন্টের সময় দেখুন।" : "Check the checkout total, included meals, charges and payment timing."}</li>

                        <li className="rounded-lg bg-slate-50 p-3">{isBn ? "বাতিল ও পরিবর্তনের সময়সীমা এবং ফেরতের শর্ত পড়ুন।" : "Read cancellation, change and refund conditions."}</li>

                        <li className="rounded-lg bg-slate-50 p-3">{isBn ? "সঠিক ঠিকানা, রুমের বিন্যাস ও যাতায়াতের রুট যাচাই করুন।" : "Verify the exact address, room setup and transport route."}</li>

                      </ul>

                    </section>


                    {/* Generic partner handoff; the city and dates must be entered on Klook. */}

                    <KlookHotelSpotlight city={activeHotel.city} guideId={activeHotel.id} lang={lang} />


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

                          affiliatePlacement={getHotelGuideAffiliatePlacement(activeHotel.id)}

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
