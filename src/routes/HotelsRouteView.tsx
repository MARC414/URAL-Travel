import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { ArrowRight, Zap, ShieldCheck, Plane, Car } from "lucide-react";

import { TravelIntelligence } from "../components/AeoInspector";

import { KlookHotelSpotlight } from "../components/KlookHotelSpotlight";
import { AFFILIATE_LINKS, AFFILIATE_OFFER_REGISTRY } from "../components/AffiliatePartners";
import { getHotelGuideAffiliatePlacement } from "../utils/affiliatePlacement";

import { HotelHero } from "../components/HotelHero";
import { HotelDirectoryCards } from "../components/HotelDirectoryCards";
import { LANDING_HOTEL_FAQS } from "../utils/faqSchema";
import { BN_LANDING_HOTEL_FAQS } from "../utils/bn-faq-schema";



type RouteViewProps = { context: Record<string, any> };



export default function HotelsRouteView({ context }: RouteViewProps) {

  const { TravelEssentials, TravelpayoutsCustomWidget, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryCityWithIata, getCountryFlightId, getCountryVisaId, getLocalizedRouteHref, isBn, lang, localizedHotels, navigateTo, parameterId, section, setAreTpScriptsReady } = context;

  const activeHotel = localizedHotels.find((hotel) => hotel.id === parameterId) || localizedHotels[0];

  if (!parameterId) {
    const faqs = isBn ? BN_LANDING_HOTEL_FAQS : LANDING_HOTEL_FAQS;
    return (
      <div className="space-y-12 sm:space-y-16">
        <HotelHero
          eyebrow={isBn ? "থাকার জায়গা বেছে নিন" : "STAY A LITTLE SMARTER"}
          title={isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য হোটেল এলাকা গাইড" : "Hotel Area Guides for Trips from Bangladesh"}
          description={isBn
            ? "গন্তব্য অনুযায়ী থাকার এলাকা তুলনা করুন। আপনার ভ্রমণসূচি, যাতায়াত ও পছন্দের পরিবেশের সঙ্গে মেলে এমন জায়গা বেছে নিতে আমাদের গাইড দেখুন।"
            : "A good stay starts with the right location. Compare neighborhoods, find a base that suits your trip and know what to check before booking."}
          imageSrc="/assets/images/hotel_directory_hero_20261112-1200.webp"
          imageAlt={isBn ? "AI-তৈরি একটি শান্ত হোটেল কক্ষের চিত্র" : "AI-generated illustration of a calm hotel room"}
        />

        <section aria-labelledby="hotel-guide-index-title" className="space-y-7">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">{isBn ? "এলাকা অনুসারে গাইড" : "THE STAY DIRECTORY"}</p>
            <h2 id="hotel-guide-index-title" className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "গন্তব্য অনুযায়ী থাকার গাইড" : "Where would you like to stay?"}</h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{isBn ? "প্রতিটি গাইডে থাকার এলাকার পার্থক্য ও বুকিংয়ের আগে কী যাচাই করবেন তা দেখুন। এগুলো নির্দিষ্ট হোটেলের যাচাইকৃত তালিকা নয়।" : "Explore neighborhood trade-offs and practical booking checks for each destination. These are area guides, not a directory of independently verified hotels."}</p>
          </div>
          <HotelDirectoryCards guides={localizedHotels} isBn={isBn} />
        </section>

        <section aria-labelledby="hotel-booking-checklist" className="max-w-4xl space-y-4 border-t border-slate-200 pt-9">
          <h2 id="hotel-booking-checklist" className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "বুকিংয়ের আগে যা যাচাই করবেন" : "A practical booking checklist"}</h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{isBn ? "একই তারিখ, অতিথিসংখ্যা ও রুমের ধরন ধরে মোট দাম তুলনা করুন। ঠিকানা, চেক-ইনের সময়, বিছানার ব্যবস্থা, খাবার, কর ও চার্জ, পেমেন্ট এবং বাতিল ও ফেরতের শর্ত নিশ্চিত করুন। মানচিত্রে যাতায়াতের রুট দেখুন; শিশু, লাগেজ বা চলাচলের বিশেষ প্রয়োজন থাকলে সরাসরি হোটেলের সঙ্গে মিলিয়ে নিন।" : "Compare the full price for the same dates, guests and room type. Confirm the address, check-in times, beds, meals, taxes and charges, payment, cancellation and refund terms. Check transport routes on a current map and ask the property about any specific accessibility, child or luggage needs."}</p>
        </section>

        <section aria-labelledby="hotels-hub-faqs" className="max-w-4xl space-y-5 border-t border-slate-200 pt-9">
          <h2 id="hotels-hub-faqs" className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "হোটেল বুকিং নিয়ে সাধারণ প্রশ্ন" : "A little help before you book"}</h2>
          <div>{faqs.map((faq) => <details key={faq.question} className="border-b border-slate-200 py-4"><summary className="cursor-pointer text-sm font-semibold leading-relaxed text-brand-navy sm:text-base">{faq.question}</summary><p className="max-w-prose pt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}</div>
        </section>

        <nav aria-label={isBn ? "সম্পর্কিত ভ্রমণ পরিকল্পনা" : "Related trip planning"} className="border-t border-slate-200 pt-8">
          <h2 className="ural-section-title text-xl text-brand-navy">{isBn ? "ভ্রমণের বাকি পরিকল্পনা" : "Plan the rest of your trip"}</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-brand-navy">
            {[
              { path: "/destinations", en: "Destination guides", bn: "গন্তব্য গাইড" },
              { path: "/flights", en: "Flight routes", bn: "ফ্লাইট রুট" },
              { path: "/visa", en: "Visa guides", bn: "ভিসা গাইড" },
              { path: "/costs", en: "Trip costs", bn: "ভ্রমণ খরচ" },
            ].map((link) => <a key={link.path} href={getLocalizedRouteHref ? getLocalizedRouteHref(link.path) : `${isBn ? "/bn" : ""}${link.path}`} className="underline decoration-slate-300 underline-offset-4 hover:decoration-brand-navy">{isBn ? link.bn : link.en}</a>)}
          </div>
        </nav>
      </div>
    );
  }

  return (

    <div className="space-y-10 sm:space-y-12">

      {/* Put the page context before route navigation in the mobile reading order. */}

      <div className="space-y-6">

        <a href={isBn ? "/bn/hotels" : "/hotels"} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy">← {isBn ? "সব হোটেল গাইড" : "All hotel guides"}</a>
        <HotelHero
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

            ...(AFFILIATE_OFFER_REGISTRY.klook.status === "active" && AFFILIATE_OFFER_REGISTRY.klookHotels.status === "active"
              ? [{ id: "hotel-klook-check", en: "Browse Klook hotel collection", bn: "Klook হোটেল তালিকা দেখুন" }]
              : []),

            { id: "hotel-ground-transport", en: "Transfers and local essentials", bn: "ট্রান্সফার ও স্থানীয় প্রয়োজনীয়তা" },

            { id: "hotel-internal-loop", en: "Related visa and flight guides", bn: "সম্পর্কিত ভিসা ও ফ্লাইট গাইড" },

            { id: "hotel-search", en: "Search hotel partner listings", bn: "পার্টনার সাইটে হোটেল খুঁজুন" },

            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

          ]}

        />

      </div>

      <div className="min-w-0 ural-route-stack animate-fade-in">

                    {/* Neighborhoods breakdown */}

                    <div id="hotel-neighborhoods" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title text-2xl text-brand-navy sm:text-3xl">

                        {isBn ? "তুলনা করার মতো থাকার এলাকা" : "Neighborhoods to compare"}

                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {activeHotel.neighborhoods.map((zone) => (

                          <div key={zone.name} className="rounded-xl border border-slate-200 bg-white p-6">

                            <h3 className="font-serif text-lg font-bold text-brand-navy">{zone.name}</h3>

                            <span className="text-[10px] bg-slate-100 font-mono text-brand-navy font-bold rounded-full px-2 py-0.5 inline-block my-1">{zone.vibe}</span>

                            <p className="text-sm text-slate-700 leading-relaxed mt-2 font-sans">{zone.description}</p>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Live hotel search guidance: no static rates or unverified property cards. */}

                    <section id="hotel-curated-stays" className="ural-guide-jump-target space-y-4 border-t border-slate-200 pt-8">

                      <h2 className="ural-section-title text-2xl text-brand-navy sm:text-3xl">

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

                      quickAnswer=""

                      keyFacts={activeHotel.keyFacts}

                      faqs={activeHotel.faqs}

                      lang={lang}

                    />



      </div>

    </div>

        );

}
