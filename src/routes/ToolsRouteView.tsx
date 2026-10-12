import React from "react";

import { KlookActivitiesWidget, AiraloEsimWidget } from "../components/AffiliatePartners";

import { SERVICE_TOOLS_FAQS } from "../hooks/useSeoMeta";

import { TravelIntelligence } from "../components/AeoInspector";



type RouteViewProps = { context: Record<string, any> };



export default function ToolsRouteView({ context }: RouteViewProps) {

  const { InteractiveTools, TravelpayoutsCustomWidget, TravelpayoutsEmbed, TravelpayoutsOnboarding, TravelpayoutsWidgetSkeleton, areTpScriptsReady, isAdmin, isBn, section, setAreTpScriptsReady } = context;

  return (

          <div className="ural-route-stack">

            <div className="border-b border-slate-200 pb-4">

              <h1 className="ural-page-title font-serif text-3xl font-bold tracking-tight text-slate-900">

                {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য স্মার্ট ট্রাভেল টুলস" : "Outbound Travel Tools Workspace"}

              </h1>

              <p className="text-xs text-slate-500 font-mono">

                {isBn ? "BDT কারেন্সি কনভার্টার, ইমিগ্রেশন চেকলিস্ট এবং জরুরি ট্রাভেল ইউটিলিটি।" : "Dynamic calculators constructed specifically for South Asian travelers."}

              </p>

            </div>



            <React.Suspense fallback={null}>

              <InteractiveTools />

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

                        <TravelpayoutsCustomWidget initialTab="hotels" />

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

                      {isBn ? "ধাপ ৩: Klook-এ ট্যুর ও অ্যাক্টিভিটি বুক করুন" : "Step 3: Plan activities with Klook"}

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

              pageTitle={isBn ? "বাংলাদেশি ভ্রমণকারীদের ট্রাভেল টুলস" : "Bangladeshi Traveler Utility Tools"}

              quickAnswer={

                isBn

                  ? "আমাদের ট্রাভেল টুলস ড্যাশবোর্ডে বাংলাদেশি ভ্রমণকারীদের জন্য রয়েছে লাইভ BDT কারেন্সি কনভার্টার, বিভিন্ন দেশের পাওয়ার প্লাগ ও অ্যাডাপ্টার গাইড (Type C, D, G), ঢাকা এয়ারপোর্ট ইমিগ্রেশন চেকলিস্ট এবং জরুরি বিদেশি ভাষার ফ্রেজবুক।"

                  : "Our travel tool suite equips outbound tourists from Bangladesh with live mid-market exchange rate calculators, comprehensive plug type adapters (Type C, D, G) by destination, an interactive packing checklist for Dhaka airport immigration, and essential phrases in Thai, Malay, Nepali, and Arabic."

              }

              keyFacts={[

                { label: isBn ? "কারেন্সি রেট" : "Currency Rates", value: "Mid-Market BDT Live Tracker" },

                { label: isBn ? "বার্ষিক এন্ডোর্সমেন্ট কোটা" : "Annual FX Quota", value: "$18,000 USD / Adult Passport (FE Circular 33)" },

                { label: isBn ? "প্লাগ সাপোর্ট" : "Plug Compatibility", value: "Type C/D (Nepal), A/B (Thailand), G (MY/UAE)" },

                { label: isBn ? "ইমিগ্রেশন প্যাক" : "Immigration Pack", value: "Passport + Ticket + Hotel + Solvency" }

              ]}

              faqs={SERVICE_TOOLS_FAQS}

            />

          </div>

        );

}
