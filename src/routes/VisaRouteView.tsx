import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { PartnerLinkButton, AFFILIATE_LINKS, AiraloEsimWidget } from "../components/AffiliatePartners";

import { ArrowRight, FileText, Wifi, Building, Plane } from "lucide-react";

import { TravelIntelligence } from "../components/AeoInspector";

import { HotelHero as ImageOverlayHero } from "../components/HotelHero";
import { VisaDirectoryCards, getVisaCountryLabel } from "../components/VisaDirectoryCards";
import { VISA_OFFICIAL_SOURCES } from "../data/visaOfficialSources";
import { LANDING_VISA_FAQS } from "../utils/faqSchema";
import { BN_LANDING_VISA_FAQS } from "../utils/bn-faq-schema";



type RouteViewProps = { context: Record<string, any> };



export default function VisaRouteView({ context }: RouteViewProps) {

  const { TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryFlightId, getCountryHotelId, getCountryIata, getLocalizedRouteHref, isBn, localizedVisas, navigateTo, parameterId, setAreTpScriptsReady } = context;

  const activeVisa = localizedVisas.find((visa) => visa.id === parameterId) || localizedVisas[0];
  const countryLabel = activeVisa ? getVisaCountryLabel(activeVisa, isBn) : "";
  const contentLanguage = (text: string) => isBn && !/[\u0980-\u09ff]/.test(text) ? "en" : undefined;

  if (!parameterId) {
    const faqs = isBn ? BN_LANDING_VISA_FAQS : LANDING_VISA_FAQS;
    return (
      <div className="space-y-12 sm:space-y-16">
        <ImageOverlayHero
          eyebrow={isBn ? "বাংলাদেশি পাসপোর্টধারীদের জন্য" : "FOR BANGLADESHI PASSPORT HOLDERS"}
          title={isBn ? "বাংলাদেশি নাগরিকদের জন্য ভিসা গাইড" : "Visa Guides & Travel Document Checklists"}
          description={isBn ? "গন্তব্য অনুযায়ী প্রবেশের পথ, প্রয়োজনীয় নথি ও আবেদন প্রক্রিয়া বুঝুন। নিয়ম বদলাতে পারে—আবেদনের আগে সরকারি কর্তৃপক্ষের বর্তমান নির্দেশনা যাচাই করুন।" : "Understand entry routes, documents and application steps for your destination. Rules can change, so check current official instructions before applying."}
          imageSrc="/assets/images/visa_directory_hero_20261112-1200.webp"
          imageAlt={isBn ? "বিমানবন্দরে ভ্রমণের নথির AI-তৈরি চিত্র" : "AI-generated illustration of travel documents at an airport"}
          credit={isBn ? "AI-তৈরি চিত্র" : "AI-generated illustration"}
        />
        <section aria-labelledby="visa-guide-index-title" className="space-y-7">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">{isBn ? "গন্তব্য অনুসারে গাইড" : "THE VISA DIRECTORY"}</p>
            <h2 id="visa-guide-index-title" className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "Where are you travelling?"}</h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{isBn ? "গন্তব্যভিত্তিক গাইডে আবেদন ও প্রবেশের শর্ত পড়ুন। ভিসার সিদ্ধান্ত ও চূড়ান্ত শর্ত সংশ্লিষ্ট কর্তৃপক্ষ নির্ধারণ করে।" : "Explore destination-specific entry guidance. The relevant authorities determine final requirements and visa decisions."}</p>
          </div>
          <VisaDirectoryCards guides={localizedVisas} isBn={isBn} />
        </section>
        <section className="max-w-4xl space-y-4 border-t border-slate-200 pt-9">
          <h2 className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "আবেদনের আগে সরকারি নিয়ম দেখুন" : "Before you apply"}</h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{isBn ? "ভ্রমণের উদ্দেশ্য ও পাসপোর্ট অনুযায়ী ভিসার ধরন বেছে নিন। সরকারি পোর্টাল বা দূতাবাসে বর্তমান নথি, ফি, পেমেন্ট ও প্রসেসিং নির্দেশনা যাচাই করুন। অনুমোদন নিশ্চিত নয়; অফেরতযোগ্য বুকিংয়ের আগে শর্ত বুঝে নিন।" : "Choose the route that fits your passport and purpose of travel. Check the current documents, fees, payment and processing instructions with the official portal or embassy. Approval is not guaranteed; understand the terms before making non-refundable bookings."}</p>
          <a href={isBn ? "/bn/visa-free-countries" : "/visa-free-countries"} className="inline-flex min-h-11 items-center font-semibold text-brand-navy underline underline-offset-4">{isBn ? "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া প্রবেশের গাইড" : "Explore visa-free and visa-on-arrival destinations"} →</a>
        </section>
        <section aria-labelledby="visa-hub-faqs" className="max-w-4xl space-y-5 border-t border-slate-200 pt-9">
          <h2 id="visa-hub-faqs" className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "ভিসা নিয়ে সাধারণ প্রশ্ন" : "Visa questions before you go"}</h2>
          <div>{faqs.map((faq) => <details key={faq.question} className="border-b border-slate-200 py-4"><summary className="cursor-pointer text-sm font-semibold leading-relaxed text-brand-navy sm:text-base">{faq.question}</summary><p className="max-w-prose pt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}</div>
        </section>
        <nav aria-label={isBn ? "সম্পর্কিত ভ্রমণ পরিকল্পনা" : "Related trip planning"} className="border-t border-slate-200 pt-8">
          <h2 className="ural-section-title text-xl text-brand-navy">{isBn ? "ভ্রমণের বাকি পরিকল্পনা" : "Plan the rest of your trip"}</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-brand-navy">{[
            { path: "/destinations", en: "Destination guides", bn: "গন্তব্য গাইড" },
            { path: "/flights", en: "Flight routes", bn: "ফ্লাইট রুট" },
            { path: "/hotels", en: "Hotel guides", bn: "হোটেল গাইড" },
            { path: "/costs", en: "Trip costs", bn: "ভ্রমণ খরচ" },
          ].map((link) => <a key={link.path} href={getLocalizedRouteHref ? getLocalizedRouteHref(link.path) : `${isBn ? "/bn" : ""}${link.path}`} className="underline decoration-slate-300 underline-offset-4 hover:decoration-brand-navy">{isBn ? link.bn : link.en}</a>)}</div>
        </nav>
      </div>
    );
  }

  return (

    <div className="space-y-10 sm:space-y-12">

      {/* Show the visa context before the country selector on mobile. */}

      <div className="space-y-6">

        <a href={isBn ? "/bn/visa" : "/visa"} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy">← {isBn ? "সব ভিসা গাইড" : "All visa guides"}</a>
        <ImageOverlayHero
          eyebrow={isBn ? "বাংলাদেশি নাগরিকদের প্রবেশ-নিয়ম" : "ENTRY GUIDANCE FOR BANGLADESHI CITIZENS"}
          title={isBn ? (activeVisa.id === "saudi-arabia-visa" ? "সৌদি ভিসা (বাংলাদেশি পাসপোর্ট): কোন পথটি আপনার জন্য প্রযোজ্য" : `${countryLabel} ভিসা (বাংলাদেশি পাসপোর্ট): নিয়ম, ডকুমেন্ট ও খরচ (২০২৬)`) : `${activeVisa.country} Visa Requirements for Bangladeshi Citizens`}
          description={isBn ? `${countryLabel}-এ প্রবেশের ধরন, প্রয়োজনীয় নথি ও আবেদন ধাপ পর্যালোচনা করুন। নিয়ম ও ফি বদলাতে পারে—আবেদনের আগে সরকারি নির্দেশনা যাচাই করুন।` : `Review the entry route, required documents and application steps for ${activeVisa.country}. Rules and fees can change, so verify current instructions with official sources before applying.`}
          imageSrc="/assets/images/visa_directory_hero_20261112-1200.webp"
          imageAlt={isBn ? "বিমানবন্দরে ভ্রমণের নথির AI-তৈরি চিত্র" : "AI-generated illustration of travel documents at an airport"}
          credit={isBn ? "AI-তৈরি চিত্র" : "AI-generated illustration"}
        />

        {activeVisa.id === "saudi-arabia-visa" && <p className="text-sm text-slate-700">{isBn ? "ওমরাহ পরিকল্পনার বিস্তারিত " : "For Umrah-specific planning, see the "}<a href={isBn ? "/bn/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" : "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost"} className="font-bold text-brand-navy underline underline-offset-4">{isBn ? "ওমরাহ ভিসা গাইড" : "Umrah visa guide"}</a>.</p>}
        <QuickAnswer
          id="visa-aeo-box"
          label={isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
        >
          <span lang={contentLanguage(activeVisa.quickAnswer)}>{activeVisa.quickAnswer}</span>
        </QuickAnswer>

        <GuideJumpNav

          isBn={isBn}

          links={[

            { id: "visa-key-facts", en: "Visa facts at a glance", bn: "এক নজরে ভিসার তথ্য" },

            { id: "visa-steps", en: "Application steps", bn: "আবেদনের ধাপ" },

            { id: "visa-documents", en: "Document checklist", bn: "ডকুমেন্ট চেকলিস্ট" },

            { id: "official-visa-sources", en: "Official sources", bn: "সরকারি সূত্র" },

            { id: "visa-flight-booking", en: "Find flights from Dhaka", bn: "ঢাকা থেকে ফ্লাইট খুঁজুন" },

            { id: "visa-internal-loop", en: "Hotels, flights and eSIM", bn: "হোটেল, ফ্লাইট ও eSIM" },

            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

          ]}

        />

      </div>

      <div className="min-w-0 ural-route-stack animate-fade-in">

                    {/* Core facts */}

                    <div id="visa-key-facts" className="ural-guide-jump-target grid grid-cols-2 md:grid-cols-4 gap-4">

                      {activeVisa.keyFacts.map((fact) => (

                        <div key={fact.label} className="ural-card bg-white border border-border-subtle p-4 text-center shadow-sm">

                          <span lang={contentLanguage(fact.label)} className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>

                          <span lang={contentLanguage(fact.value)} className="text-xs font-semibold text-brand-navy font-mono block mt-1">{fact.value}</span>

                        </div>

                      ))}

                    </div>



                    {/* Step-by-step procedures */}

                    <div id="visa-steps" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title text-2xl text-brand-navy sm:text-3xl">

                        {isBn ? "ধাপে ধাপে ভিসা আবেদনের নিয়মাবলী" : "Step-by-Step Application Process"}

                      </h2>

                      <div className="space-y-3">

                        {activeVisa.stepByStep.map((step, idx) => (

                          <div key={idx} className="ural-card flex gap-4 text-sm sm:text-[14.5px] leading-relaxed text-slate-700 bg-white p-5 border border-border-subtle shadow-sm">

                            <span className="w-6 h-6 rounded-full bg-brand-navy text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>

                            <span lang={contentLanguage(step)}>{step}</span>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Document structures */}

                    <div id="visa-documents" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title text-2xl text-brand-navy sm:text-3xl">

                        {isBn ? "প্রয়োজনীয় ডকুমেন্ট চেকলিস্ট" : "Document Checklist"}

                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {activeVisa.documentChecklist.map((cat) => (

                          <div key={cat.category} className="ural-card bg-slate-50 border border-border-subtle p-5">

                            <span lang={contentLanguage(cat.category)} className="text-xs font-bold font-mono uppercase tracking-wider text-brand-navy block border-b border-slate-200 pb-2 mb-3"><FileText size={12} className="inline-block mr-1.5 -mt-0.5" />{cat.category}</span>

                            <ul className="space-y-2 text-sm sm:text-[14.5px] text-slate-700">

                              {cat.items.map((item, idx) => (

                                <li key={idx} className="flex items-start gap-2">

                                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>

                                  <span lang={contentLanguage(item)}>{item}</span>

                                </li>

                              ))}

                            </ul>

                          </div>

                        ))}

                      </div>

                    </div>



                    <section id="official-visa-sources" className="ural-guide-jump-target space-y-4 border-t border-slate-200 pt-8">
                      <h2 className="ural-section-title text-2xl text-brand-navy sm:text-3xl">{isBn ? "বর্তমান নিয়ম যাচাইয়ের সরকারি সূত্র" : "Official sources to verify current requirements"}</h2>
                      <p className="text-sm leading-relaxed text-slate-600">{isBn ? "আবেদন বা বুকিংয়ের আগে সংশ্লিষ্ট কর্তৃপক্ষের সর্বশেষ ভিসা, নথি ও ফি নির্দেশনা দেখুন।" : "Check the latest visa, document and fee instructions from the relevant authority before applying or booking."}</p>
                      <ul className="space-y-2 text-sm font-semibold text-brand-navy">{(VISA_OFFICIAL_SOURCES[activeVisa.id] ?? []).map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.label} ↗</a></li>)}</ul>
                      <p className="text-sm"><a href={isBn ? "/bn/visa-free-countries" : "/visa-free-countries"} className="font-semibold text-brand-navy underline underline-offset-4">{isBn ? "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া প্রবেশের গাইড" : "Explore visa-free and visa-on-arrival destinations"}</a></p>
                    </section>

                    {/* Flight booking CTA after visa checklist */}

                    <div id="visa-flight-booking" className="ural-guide-jump-target space-y-4 pt-4 border-t border-slate-200">

                      <div className="text-center text-sm font-semibold text-slate-600 py-2">

                        {isBn ? "আপনার ট্রিপ বুক করতে প্রস্তুত?" : "Ready to book your trip?"}

                      </div>



                      <div className="ural-panel bg-white border border-border-subtle p-5 shadow-sm space-y-3">

                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">

                          {isBn ? "ঢাকা থেকে ফ্লাইট খুঁজুন" : "Find flights from Dhaka"}

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

                              lang={isBn ? "bn" : "en"}

                              defaultDestination={activeVisa.id === "saudi-arabia-visa" ? "MED" : getCountryIata(activeVisa.country)}

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



                      <div className="flex flex-wrap gap-2.5">

                        <PartnerLinkButton

                          href={AFFILIATE_LINKS.yesim}

                          label={isBn ? `${activeVisa.country} Yesim eSIM অ্যাপ` : `Get Yesim eSIM (${activeVisa.country})`}

                        />

                        <PartnerLinkButton

                          href={AFFILIATE_LINKS.airalo}

                          label={isBn ? `${activeVisa.country} Airalo eSIM` : `Compare Airalo eSIM`}

                        />

                        <PartnerLinkButton

                          href={AFFILIATE_LINKS.getTransfer}

                          label={isBn ? "Airport Transfer (GetTransfer)" : "Book Airport Transfer (GetTransfer)"}

                        />

                      </div>

                    </div>



                    {/* 📶 Stay Connected widget block */}

                    <div id="visa-esim" className="ural-guide-jump-target ural-panel bg-slate-50 border border-border-subtle p-6 space-y-4 animate-fade-in">

                      <div className="space-y-1">

                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest block">

                          <Wifi size={12} className="text-brand-navy" />

                          <span>{isBn ? "ফ্লাইটে ওঠার আগে" : "Before You Fly"}</span>

                        </span>

                        <h2 className="ural-section-title font-serif text-lg font-bold text-slate-900">

                          {isBn ? `${activeVisa.country}-এর জন্য লোকাল eSIM সংগ্রহ করুন` : `Get a Local eSIM for ${activeVisa.country}`}

                        </h2>

                        <p className="text-xs text-slate-500">

                          {isBn ? "এয়ারপোর্টে নেমেই সাথে সাথে ইন্টারনেট চালু করুন — সিমের লাইনে দাঁড়ানোর ঝামেলা নেই।" : "Land with data already active — no SIM card counter, no roaming bill shock."}

                        </p>

                      </div>

                      <div className="ural-card bg-white p-2 sm:p-4 border border-border-subtle">

                        <AiraloEsimWidget lang={isBn ? "bn" : "en"} />

                      </div>

                    </div>



                    {/* Flight & Hotel loop structure */}

                    <div id="visa-internal-loop" className="ural-guide-jump-target bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">

                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">

                        {isBn ? "আপনার পুরো ট্রিপ প্ল্যান করুন" : "Plan Your Full Trip"}

                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">

                        <a

                          id={`lnk-view-hotel-from-visa-${activeVisa.id}`}

                          href={getLocalizedRouteHref(activeVisa.id === "saudi-arabia-visa" ? "/hotels" : `/hotels/${getCountryHotelId(activeVisa.country)}`)}

                          onClick={(e) => { e.preventDefault(); navigateTo(activeVisa.id === "saudi-arabia-visa" ? "/hotels" : `/hotels/${getCountryHotelId(activeVisa.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Building size={14} className="text-brand-navy shrink-0" />

                          <span>{activeVisa.id === "saudi-arabia-visa" ? (isBn ? "হোটেল গাইড দেখুন" : "Browse hotel guides") : (isBn ? `${activeVisa.country}-এর হোটেল এলাকা` : `${activeVisa.country} hotel areas`)}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          id={`lnk-view-flight-from-visa-${activeVisa.id}`}

                          href={getLocalizedRouteHref(`/flights/${activeVisa.id === "saudi-arabia-visa" ? "dhaka-madinah" : getCountryFlightId(activeVisa.country)}`)}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/flights/${activeVisa.id === "saudi-arabia-visa" ? "dhaka-madinah" : getCountryFlightId(activeVisa.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Plane size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "ঢাকা থেকে ফ্লাইট বুক করুন" : "Book Flights from Dhaka"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          href={AFFILIATE_LINKS.airalo}

                          target="_blank"

                          rel="noopener noreferrer sponsored"

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"

                        >

                          <Wifi size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? "লোকাল eSIM নিন" : "Get a Local eSIM"}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                      </div>

                    </div>



                    <TravelIntelligence

                      pageTitle={isBn ? `${activeVisa.country} ভিসা প্রসেসিং গাইড` : `${activeVisa.country} Outbound Visa Process`}

                      quickAnswer={activeVisa.quickAnswer}

                      keyFacts={activeVisa.keyFacts}

                      faqs={activeVisa.faqs}

                      lang={isBn ? "bn" : "en"}

                    />



      </div>

    </div>

        );

}
