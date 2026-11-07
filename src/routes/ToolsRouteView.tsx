import React from "react";

import { KlookActivitiesWidget, AiraloEsimWidget } from "../components/AffiliatePartners";

import { SERVICE_TOOLS_FAQS } from "../hooks/useSeoMeta";
import { BN_SERVICE_TOOLS_FAQS } from "../utils/bn-faq-schema";

import { TravelIntelligence } from "../components/AeoInspector";

import { SLUG_TO_TOOL_TAB, TOOL_PAGE_SEO, type ToolTabId } from "../utils/toolRoutes";



type RouteViewProps = { context: Record<string, any> };

export default function ToolsRouteView({ context }: RouteViewProps) {

  const { InteractiveTools, TravelpayoutsCustomWidget, TravelpayoutsEmbed, TravelpayoutsOnboarding, TravelpayoutsWidgetSkeleton, areTpScriptsReady, isAdmin, isBn, lang, parameterId, section, setAreTpScriptsReady } = context;

  // Per-tool hero copy for /tools/<slug> — see TOOL_PAGE_SEO (single source
  // shared with seoCopy.ts, App.tsx breadcrumbs and scripts/prerender.ts).
  const toolCopy = parameterId ? TOOL_PAGE_SEO[parameterId] : undefined;
  const initialTool: ToolTabId | undefined = parameterId
    ? SLUG_TO_TOOL_TAB[parameterId]
    : undefined;

  return (

          <div className="ural-route-stack">

            <div className="border-b border-slate-200 pb-4">

              <h1 className="ural-page-title font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                {toolCopy
                  ? (isBn ? toolCopy.h1Bn : toolCopy.h1En)
                  : (isBn ? "ট্রাভেল টুলস" : "Travel Tools")}

              </h1>

              <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-600">

                {toolCopy
                  ? (isBn ? toolCopy.subBn : toolCopy.subEn)
                  : (isBn ? "কোটেশনভিত্তিক ট্রিপের হিসাব, তারিখসহ কারেন্সি রূপান্তর, বিমানবন্দরের কোড ও প্যাকিং চেকলিস্ট।" : "Quote-based trip estimates, dated currency conversion, airport codes and a packing checklist.")}

              </p>

            </div>



            <React.Suspense fallback={null}>

              <InteractiveTools initialTool={initialTool} />

            </React.Suspense>



            {isAdmin && (

              <React.Suspense fallback={null}>

                <TravelpayoutsOnboarding />

              </React.Suspense>

            )}



            {/* Book Your Trip - Visual Step-by-Step Booking Checklist Funnel */}

            <div className="ural-panel bg-white border border-border-subtle p-6 shadow-sm space-y-8">

              <div className="border-b border-slate-100 pb-4">

                <h2 className="ural-section-title font-serif text-xl font-bold text-slate-900">

                  {isBn ? "ধাপে ধাপে আপনার ট্রিপ বুক করুন" : "Book Your Trip"}

                </h2>

                <p className="text-sm text-slate-500">

                  {isBn

                    ? "বাংলাদেশ থেকে বিদেশ ভ্রমণের জন্য ৪ ধাপে সম্পূর্ণ বুকিং চেকলিস্ট।"

                    : "Your step-by-step planning and conversion dashboard built for outbound trips from Bangladesh."}

                </p>

              </div>



              <div className="space-y-8 divide-y divide-slate-100">

                {/* Step 1 */}

                <div className="space-y-4 pt-0">

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">

                      1

                    </div>

                    <h3 className="ural-card-title font-serif text-base font-bold text-brand-navy">

                      {isBn ? "ধাপ ১: আপনার ফ্লাইট খুঁজুন" : "Step 1: Find your flight"}

                    </h3>

                  </div>

                  <div className="pl-0 sm:pl-11">

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

                        <TravelpayoutsEmbed />

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



                {/* Step 2 */}

                <div className="space-y-4 pt-8">

                  <div className="flex items-center gap-3 font-medium">

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">

                      2

                    </div>

                    <h3 className="ural-card-title font-serif text-base font-bold text-brand-navy">

                      {isBn ? "ধাপ ২: আপনার হোটেল বুক করুন" : "Step 2: Book your hotel"}

                    </h3>

                  </div>

                  <div className="pl-0 sm:pl-11">

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
                          affiliatePlacement="tools_hotel_search"
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



                {/* Step 3 */}

                <div className="space-y-4 pt-8">

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">

                      3

                    </div>

                    <h3 className="ural-card-title font-serif text-base font-bold text-brand-navy">

                      {isBn ? "ধাপ ৩: Klook-এ টুর ও অ্যাক্টিভিটি বুক করুন" : "Step 3: Plan activities with Klook"}

                    </h3>

                  </div>

                  <div className="pl-0 sm:pl-11">

                    <KlookActivitiesWidget />

                  </div>

                </div>



                {/* Step 4 */}

                <div className="space-y-4 pt-8">

                  <div className="flex items-center gap-3">

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">

                      4

                    </div>

                    <h3 className="ural-card-title font-serif text-base font-bold text-brand-navy">

                      {isBn ? "ধাপ ৪: ট্রাভেল eSIM সংগ্রহ করুন" : "Step 4: Get your travel eSIM"}

                    </h3>

                  </div>

                  <div className="pl-0 sm:pl-11">

                    <AiraloEsimWidget />

                  </div>

                </div>

              </div>

            </div>



            {/* Traveler Utility Desk FAQs & Travel Intelligence */}

            <TravelIntelligence

              pageTitle={isBn ? "ট্রাভেল টুলস" : "Travel Tools"}

              quickAnswer={

                isBn

                  ? "নিজের কোটেশন দিয়ে ট্রিপের হিসাব করুন, তারিখসহ reference rate-এ BDT রূপান্তর করুন, বিমানবন্দরের কোড খুঁজুন এবং packing checklist ব্যবহার করুন।"

                  : "Calculate a trip from your own quotes, convert BDT with dated reference rates, look up airport codes and use the packing checklist."

              }

              keyFacts={[

                { label: isBn ? "কারেন্সি রেট" : "Currency rates", value: isBn ? "Provider ও তারিখসহ দৈনিক reference" : "Daily reference, with provider and date" },

                { label: isBn ? "সর্বোচ্চ দল" : "Party limit", value: isBn ? "১২ জন, শিশু ও ইনফ্যান্টসহ" : "12 travellers, including children and infants" },

                { label: isBn ? "সময়সীমা" : "Trip duration", value: isBn ? "১–৩০ দিন; হোটেলের রাত আলাদা" : "1–30 days; hotel nights separate" },

                { label: isBn ? "ইনপুটের ভিত্তি" : "Input basis", value: isBn ? "নিজের quote ও spending allowance" : "Your quotes and spending allowances" }

              ]}

              faqs={isBn ? BN_SERVICE_TOOLS_FAQS : SERVICE_TOOLS_FAQS}

            />

          </div>

        );

}
