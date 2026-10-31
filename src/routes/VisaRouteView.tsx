import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { PartnerLinkButton, AFFILIATE_LINKS, AiraloEsimWidget } from "../components/AffiliatePartners";

import { ShieldCheck, ArrowRight, FileText, Wifi, Building, Plane, Globe } from "lucide-react";

import { TravelIntelligence } from "../components/AeoInspector";

import { EditorialPageHero } from "../components/EditorialPageHero";



type RouteViewProps = { context: Record<string, any> };



export default function VisaRouteView({ context }: RouteViewProps) {

  const { TravelpayoutsEmbed, TravelpayoutsWidgetSkeleton, areTpScriptsReady, getCountryFlightId, getCountryHotelId, getCountryIata, isBn, localizedVisas, navigateTo, parameterId, section, setAreTpScriptsReady } = context;

  const activeVisa = localizedVisas.find((visa) => visa.id === parameterId) || localizedVisas[0];

  if (!parameterId) {
    return (
      <div className="space-y-7">
        <EditorialPageHero
          eyebrow={isBn ? "বাংলাদেশি পাসপোর্টধারীদের জন্য" : "FOR BANGLADESHI PASSPORT HOLDERS"}
          title={isBn ? "বাংলাদেশি নাগরিকদের জন্য ভিসা গাইড" : "Visa Guides & Travel Document Checklists"}
          description={isBn
            ? "জনপ্রিয় গন্তব্যের প্রবেশের নিয়ম, প্রয়োজনীয় নথি, আবেদন ধাপ ও ফি-সংক্রান্ত নির্দেশনা দেখুন। নিয়ম বদলাতে পারে—আবেদনের আগে সরকারি সূত্র যাচাই করুন।"
            : "Review entry routes, document checklists, application steps and fee guidance for popular destinations. Rules change, so confirm details with official sources before applying."}
          imageSrc="/assets/images/visa_changi_immigration_20261101-1200.webp"
          imageAlt={isBn
            ? "সিঙ্গাপুরের চাঙ্গি বিমানবন্দর টার্মিনাল ১-এর আগমন ইমিগ্রেশন হলে যাত্রীরা"
            : "Travelers at the arrival immigration hall in Singapore Changi Airport Terminal 1"}
          imageSizes="(min-width: 1024px) 45vw, 100vw"
          credit={
            <>
              <a href="https://commons.wikimedia.org/wiki/File:Singapore_Changi_Airport_Terminal_1_Arrival_Immigration.jpg" target="_blank" rel="noopener noreferrer">
                Exec8 / Wikimedia Commons
              </a>
              <span aria-hidden="true"> · </span>
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
            </>
          }
        />

        <section aria-labelledby="visa-guide-index-title" className="space-y-3">
          <div>
            <h2 id="visa-guide-index-title" className="ural-section-title font-serif text-xl font-bold text-slate-900">
              {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "Visa guides by destination"}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {isBn ? "প্রতিটি দেশের গাইডে প্রবেশের ধরন, নথি ও আবেদন প্রক্রিয়ার সারাংশ রয়েছে। চূড়ান্ত সিদ্ধান্তের জন্য সরকারি কর্তৃপক্ষের নির্দেশনা অনুসরণ করুন।" : "Each country guide summarizes the entry route, documents and application process. Use official authority guidance for the final decision."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {localizedVisas.map((visa) => (
              <a
                key={visa.id}
                href={`/visa/${visa.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(`/visa/${visa.id}`);
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-navy">{visa.country}</h3>
                    <p className="text-xs font-semibold text-slate-500">{visa.requirementType}</p>
                  </div>
                  <ArrowRight size={16} className="mt-1 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-navy" aria-hidden="true" />
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{visa.quickAnswer}</p>
                <p className="mt-4 text-xs font-bold text-brand-navy">{isBn ? "চেকলিস্ট ও আবেদনের ধাপ দেখুন" : "View checklist and application steps"}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">

      {/* Show the visa context before the country selector on mobile. */}

      <header className="space-y-4 lg:col-start-2 lg:col-span-3 lg:row-start-1">

        <EditorialPageHero
          eyebrow={isBn ? "বাংলাদেশি নাগরিকদের প্রবেশ-নিয়ম" : "ENTRY GUIDANCE FOR BANGLADESHI CITIZENS"}
          title={isBn
            ? `${activeVisa.country} ভিসা (বাংলাদেশি পাসপোর্ট): নিয়ম, ডকুমেন্ট ও খরচ (২০২৬)`
            : `${activeVisa.country} Visa Requirements for Bangladeshi Citizens`}
          description={isBn
            ? `${activeVisa.country}-এ প্রবেশের ধরন, প্রয়োজনীয় নথি ও আবেদন ধাপ পর্যালোচনা করুন। নিয়ম ও ফি বদলাতে পারে—আবেদনের আগে সরকারি নির্দেশনা যাচাই করুন।`
            : `Review the entry route, required documents and application steps for ${activeVisa.country}. Rules and fees can change, so verify current instructions with official sources before applying.`}
          imageSrc="/assets/images/visa_changi_immigration_20261101-1200.webp"
          imageAlt={isBn
            ? "সিঙ্গাপুরের চাঙ্গি বিমানবন্দর টার্মিনাল ১-এর আগমন ইমিগ্রেশন হলে যাত্রীরা"
            : "Travelers at the arrival immigration hall in Singapore Changi Airport Terminal 1"}
          imageSizes="(min-width: 1024px) 45vw, 100vw"
          credit={
            <>
              <a href="https://commons.wikimedia.org/wiki/File:Singapore_Changi_Airport_Terminal_1_Arrival_Immigration.jpg" target="_blank" rel="noopener noreferrer">
                Exec8 / Wikimedia Commons
              </a>
              <span aria-hidden="true"> · </span>
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
            </>
          }
        >
          <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
            {activeVisa.requirementType}
          </span>
        </EditorialPageHero>

        <QuickAnswer
          id="visa-aeo-box"
          label={isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
        >
          {activeVisa.quickAnswer}
        </QuickAnswer>

        <GuideJumpNav

          isBn={isBn}

          links={[

            { id: "visa-key-facts", en: "Visa facts at a glance", bn: "এক নজরে ভিসার তথ্য" },

            { id: "visa-steps", en: "Application steps", bn: "আবেদনের ধাপ" },

            { id: "visa-documents", en: "Document checklist", bn: "ডকুমেন্ট চেকলিস্ট" },

            { id: "visa-flight-booking", en: "Find flights from Dhaka", bn: "ঢাকা থেকে ফ্লাইট খুঁজুন" },

            { id: "visa-internal-loop", en: "Hotels, flights and eSIM", bn: "হোটেল, ফ্লাইট ও eSIM" },

            { id: "travel-intelligence-panel", en: "FAQs and key answers", bn: "প্রশ্নোত্তর ও প্রয়োজনীয় তথ্য" },

          ]}

        />

      </header>



      <aside className="lg:col-start-1 lg:row-start-1 lg:row-span-2" aria-label={isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "Visa guides by country"}>

        <nav className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">

          <label htmlFor="mobile-visa-country-select" className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider text-slate-500">

            {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "VISA GUIDES BY COUNTRY"}

          </label>

          <select

            id="mobile-visa-country-select"

            value={parameterId}

            onChange={(event) => navigateTo(`/visa/${event.currentTarget.value}`)}

            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-brand-navy shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] lg:hidden"

          >

            {localizedVisas.map((visa) => (

              <option key={visa.id} value={visa.id}>

                {isBn ? `${visa.country} ভিসা রিকোয়ারমেন্টস` : `${visa.country} Visa Requirements`}

              </option>

            ))}

          </select>

          <div className="hidden space-y-2 lg:block">

            {localizedVisas.map((v) => (

              <button

                key={v.id}

                id={`btn-visa-select-${v.id}`}

                onClick={() => navigateTo(`/visa/${v.id}`)}

                className={`relative flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition-colors ${

                  parameterId === v.id

                    ? "border-brand-navy bg-brand-navy text-white shadow-md"

                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"

                }`}

              >

                <span className="inline-flex items-center gap-1.5">

                  <ShieldCheck size={13} className={parameterId === v.id ? "text-[#F6B73C]" : "text-brand-navy"} aria-hidden="true" />

                  <span>{isBn ? `${v.country} ভিসা রিকোয়ারমেন্টস` : `${v.country} Visa Requirements`}</span>

                </span>

                <ArrowRight size={12} className={parameterId === v.id ? "text-[#F6B73C]" : "text-text-muted"} aria-hidden="true" />

              </button>

            ))}

            <a
              href="/visa-free-countries"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("/visa-free-countries");
              }}
              className="mt-1 flex w-full cursor-pointer items-start gap-2 rounded-xl border border-[#F6B73C]/50 bg-[#F6B73C]/5 p-3.5 text-left text-xs font-semibold text-brand-navy transition-colors hover:bg-[#F6B73C]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
            >
              <Globe size={13} className="mt-0.5 shrink-0 text-[#F6B73C]" aria-hidden="true" />
              <span>
                {isBn ? "ভিসা ছাড়া যেসব দেশে যাওয়া যায়" : "Which countries are visa-free?"}
                <span className="mt-0.5 block font-normal text-text-muted">
                  {isBn ? "২০২৬ সালের যাচাই করা তালিকা" : "The verified 2026 list"}
                </span>
              </span>
            </a>

          </div>

        </nav>

      </aside>



      <div className="min-w-0 ural-route-stack animate-fade-in lg:col-start-2 lg:col-span-3 lg:row-start-2">

                    {/* Core facts */}

                    <div id="visa-key-facts" className="ural-guide-jump-target grid grid-cols-2 md:grid-cols-4 gap-4">

                      {activeVisa.keyFacts.map((fact) => (

                        <div key={fact.label} className="ural-card bg-white border border-border-subtle p-4 text-center shadow-sm">

                          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>

                          <span className="text-xs font-semibold text-brand-navy font-mono block mt-1">{fact.value}</span>

                        </div>

                      ))}

                    </div>



                    {/* Step-by-step procedures */}

                    <div id="visa-steps" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">

                        {isBn ? "ধাপে ধাপে ভিসা আবেদনের নিয়মাবলী" : "Step-by-Step Application Process"}

                      </h2>

                      <div className="space-y-3">

                        {activeVisa.stepByStep.map((step, idx) => (

                          <div key={idx} className="ural-card flex gap-4 text-sm sm:text-[14.5px] leading-relaxed text-slate-700 bg-white p-5 border border-border-subtle shadow-sm">

                            <span className="w-6 h-6 rounded-full bg-brand-navy text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>

                            <span>{step}</span>

                          </div>

                        ))}

                      </div>

                    </div>



                    {/* Document structures */}

                    <div id="visa-documents" className="ural-guide-jump-target space-y-4">

                      <h2 className="ural-section-title font-serif font-black text-lg text-slate-900">

                        {isBn ? "প্রয়োজনীয় ডকুমেন্ট চেকলিস্ট" : "Document Checklist"}

                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {activeVisa.documentChecklist.map((cat) => (

                          <div key={cat.category} className="ural-card bg-slate-50 border border-border-subtle p-5">

                            <span className="text-xs font-bold font-mono uppercase tracking-wider text-brand-navy block border-b border-slate-200 pb-2 mb-3"><FileText size={12} className="inline-block mr-1.5 -mt-0.5" />{cat.category}</span>

                            <ul className="space-y-2 text-sm sm:text-[14.5px] text-slate-700">

                              {cat.items.map((item, idx) => (

                                <li key={idx} className="flex items-start gap-2">

                                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>

                                  <span>{item}</span>

                                </li>

                              ))}

                            </ul>

                          </div>

                        ))}

                      </div>

                    </div>



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

                              defaultDestination={getCountryIata(activeVisa.country)}

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

                        <AiraloEsimWidget />

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

                          href={`/hotels/${getCountryHotelId(activeVisa.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/hotels/${getCountryHotelId(activeVisa.country)}`); }}

                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"

                        >

                          <Building size={14} className="text-brand-navy shrink-0" />

                          <span>{isBn ? `${activeVisa.country}-এর বাছাইকৃত হোটেল` : `Curated ${activeVisa.country} Hotels`}</span>

                          <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />

                        </a>

                        <a

                          id={`lnk-view-flight-from-visa-${activeVisa.id}`}

                          href={`/flights/${getCountryFlightId(activeVisa.country)}`}

                          onClick={(e) => { e.preventDefault(); navigateTo(`/flights/${getCountryFlightId(activeVisa.country)}`); }}

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

                    />



      </div>

    </div>

        );

}
