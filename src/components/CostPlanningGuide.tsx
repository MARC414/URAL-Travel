import React from "react";
import type { TripCostData } from "../types";
import { QuickAnswer } from "./QuickAnswer";
import { TripCostEstimator } from "./TripCostEstimator";
import { DestinationRate } from "./RatesNotice";
import { ESTIMATOR_COUNTRIES } from "../utils/tripCostEstimator";
import { LANDING_COST_FAQS } from "../utils/faqSchema";
import { BN_LANDING_COST_FAQS } from "../utils/bn-faq-schema";

const HOTEL_IDS: Record<string, string> = { nepal: "kathmandu", thailand: "bangkok", malaysia: "kuala-lumpur", dubai: "dubai", singapore: "singapore", maldives: "maldives" };
const linkClass = "font-semibold text-brand-emerald underline underline-offset-4 hover:text-brand-navy";
export const costCountryLabel = (cost: TripCostData, isBn: boolean) => isBn ? cost.countryBn : cost.country === "UAE" ? "Dubai, UAE" : cost.country;

export function CostPlanningHub({ costs, isBn }: { costs: TripCostData[]; isBn: boolean }) {
  const prefix = isBn ? "/bn" : "";
  return <article className="space-y-7">
    <header className="space-y-4">
      <h1 className="ural-page-title text-3xl text-slate-900 sm:text-4xl">{isBn ? "ট্রিপ বাজেট গাইড" : "Trip Budget Guides"}</h1>
      <p className="max-w-prose text-base leading-relaxed text-slate-700">{isBn
        ? "নেপাল, থাইল্যান্ড, মালয়েশিয়া, দুবাই, সিঙ্গাপুর ও মালদ্বীপের বাজেট পরিকল্পনা করুন নিজের তারিখ ও যাত্রী অনুযায়ী। প্রতিটি গাইডে কোটেশনের খাত, একক এবং কী মিলিয়ে দেখবেন তা আছে।"
        : "Plan a budget for Nepal, Thailand, Malaysia, Dubai, Singapore or the Maldives around your own dates and travellers. Each guide explains which quotes to gather, their units and what to compare."}</p>
      <p className="max-w-prose text-sm leading-relaxed text-slate-600">{isBn
        ? "ফ্লাইট, রুম-রাত ও দৈনিক খরচ আলাদা করে যোগ করুন। একই তারিখ, দল, কর ও অন্তর্ভুক্ত সেবা ছাড়া দুটি মোট তুলনাযোগ্য নয়। কোটেশন সংগ্রহ হলে এস্টিমেটরে উৎস ও তারিখসহ হিসাব করুন।"
        : "Add flights, room-nights and daily spending on their own basis. Two totals are comparable only when dates, party, taxes and inclusions match. Once you have quotes, calculate them with their sources and dates in the estimator."}</p>
      <a className={linkClass} href={`${prefix}/tools/budget-calculator`}>{isBn ? "ট্রিপ কস্ট এস্টিমেটর খুলুন" : "Open the Trip Cost Estimator"}</a>
    </header>
    <section aria-labelledby="costs-destinations-heading">
      <h2 id="costs-destinations-heading" className="ural-section-title mb-4 text-2xl text-slate-900">{isBn ? "গন্তব্য অনুযায়ী পরিকল্পনা" : "Plan by destination"}</h2>
      <div className="grid gap-x-8 sm:grid-cols-2">{costs.map((cost) => <div key={cost.id} className="space-y-3 border-t border-slate-200 py-6">
        <h3 className="font-serif text-xl font-bold"><a className={linkClass} href={`${prefix}/costs/${cost.id}`}>{costCountryLabel(cost, isBn)}</a></h3>
        <p className="text-sm leading-relaxed text-slate-700">{cost.quickAnswer}</p>
      </div>)}</div>
    </section>
    <section className="max-w-prose space-y-4 border-t border-slate-200 pt-6">
      <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "তুলনার আগে একই ভিত্তি রাখুন" : "Match the basis before comparing"}</h2>
      <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-700">
        <li>{isBn ? "Airline quote-এ route, date, cabin, baggage ও শিশু/ইনফ্যান্টের age band মিলিয়ে নিন।" : "Match the route, dates, cabin, baggage and child/infant age bands in airline quotes."}</li>
        <li>{isBn ? "হোটেলের occupied night, room occupancy, breakfast, কর ও cancellation terms নিন।" : "Record occupied nights, room occupancy, breakfast, taxes and hotel cancellation terms."}</li>
        <li>{isBn ? "দৈনিক বরাদ্দকে নিজের অনুমান হিসেবে চিহ্নিত করুন। Supplier quote-এর সঙ্গে মিশিয়ে নিশ্চিত দাম বলবেন না।" : "Label daily allowances as your own assumptions. Keep them distinct from confirmed supplier quotes."}</li>
        <li>{isBn ? "Visa, insurance, transfer, shopping ও reserve আলাদা রাখুন; package-এ থাকা খরচ একবারই গুনুন।" : "Keep visa, insurance, transfers, shopping and a reserve visible; count bundled costs only once."}</li>
      </ul>
      <p className="text-sm text-slate-700">{isBn ? "বাংলাদেশ থেকে পরিকল্পনার সহায়তা: " : "Help when planning from Bangladesh: "}<a className={linkClass} href={`${prefix}/banking`}>{isBn ? "কার্ড ও endorsement গাইড" : "card and endorsement guidance"}</a> · <a className={linkClass} href={`${prefix}/contact`}>{isBn ? "URAL তথ্য ডেস্ক" : "URAL information desk"}</a></p>
    </section>
    <section className="space-y-3">
      <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "বাজেট নিয়ে প্রশ্নোত্তর" : "Trip budget questions"}</h2>
      {(isBn ? BN_LANDING_COST_FAQS : LANDING_COST_FAQS).map((faq) => <details key={faq.question} className="border-b border-slate-200 py-3"><summary className="cursor-pointer py-1 font-semibold text-slate-900">{faq.question}</summary><p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-700">{faq.answer}</p></details>)}
    </section>
  </article>;
}

/** Shared editorial body: the saved page and both React locales read the same records. */
export function CostPlanningGuide({ cost, isBn }: { cost: TripCostData; isBn: boolean }) {
  const prefix = isBn ? "/bn" : "";
  const country = costCountryLabel(cost, isBn);
  const stem = cost.id.replace(/-costs$/, "");
  const estimatorCountry = ESTIMATOR_COUNTRIES.find((item) => item.costId === cost.id)!.key;
  const title = isBn ? `${country} ভ্রমণের বাজেট পরিকল্পনা` : `${country} Trip Budget Planning`;
  return <article className="ural-route-stack">
    <header className="space-y-4">
      <h1 className="ural-page-title text-2xl text-slate-900 sm:text-4xl">{title}</h1>
      <QuickAnswer id="cost-aeo-text-box" label={isBn ? "সংক্ষিপ্ত উত্তর" : "Quick answer"}>{cost.quickAnswer}</QuickAnswer>
    </header>
    <nav aria-label={isBn ? "এই গাইডে" : "In this guide"} className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
      <a className={linkClass} href="#cost-breakdown">{isBn ? "খরচের খাত" : "Cost categories"}</a>
      <a className={linkClass} href="#trip-cost-estimator">{isBn ? "ট্রিপ কস্ট এস্টিমেটর" : "Trip Cost Estimator"}</a>
      <a className={linkClass} href="#cost-sources">{isBn ? "Official source" : "Official sources"}</a>
    </nav>
    <section id="cost-breakdown" className="scroll-mt-24 space-y-4">
      <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "কোন খরচ কীভাবে হিসাব করবেন" : "What to quote and how to count it"}</h2>
      <p className="max-w-prose text-sm leading-relaxed text-slate-600">{isBn ? "এটি কোটেশন সংগ্রহের চেকলিস্ট। নিজের তারিখ ও দলের জন্য supplier-এর চূড়ান্ত অঙ্ক লিখুন; খাবার ও দৈনিক খরচে নিজের বরাদ্দ আলাদা চিহ্নিত করুন।" : "Use this as a quote-gathering checklist. Get final supplier amounts for your dates and party, and identify personal allowances for meals and daily spending."}</p>
      <dl className="divide-y divide-slate-200 border-y border-slate-200">{cost.categories.map((category) => <div key={category.name} className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <dt className="text-base font-bold text-slate-900">{category.name}</dt>
        <dd className="space-y-2 text-sm leading-relaxed text-slate-700"><p className="font-semibold">{category.basis}</p><p>{category.check}</p></dd>
      </div>)}</dl>
      <DestinationRate code={cost.currencyIso} isBn={isBn} />
    </section>
    <section id="cost-seasonality" className="scroll-mt-24 max-w-prose space-y-3">
      <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "তারিখ বদলালে যা দেখবেন" : "When comparing travel dates"}</h2>
      <p className="text-sm leading-relaxed text-slate-700">{cost.seasonalVariation}</p>
    </section>
    <section id="cost-saving-tips" className="scroll-mt-24 max-w-prose space-y-3">
      <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "কোটেশন তুলনার পরামর্শ" : "Quote comparison tips"}</h2>
      <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-700">{cost.moneyHacks.map((tip) => <li key={tip}>{tip}</li>)}</ul>
    </section>
    <section id="cost-internal-loop" className="scroll-mt-24 space-y-4 border-y border-slate-200 py-5">
      <h2 className="ural-section-title text-xl text-slate-900">{isBn ? "এই ট্রিপের বাকি পরিকল্পনা" : "Plan the rest of this trip"}</h2>
      <div className="flex flex-wrap gap-4 text-sm">
        <a className={linkClass} href={`${prefix}/visa/${stem}-visa`}>{isBn ? "ভিসা ও entry checklist" : "Visa & entry checklist"}</a>
        <a className={linkClass} href={`${prefix}/destinations/${stem}-guide`}>{isBn ? "ভ্রমণের itinerary" : "Travel itinerary"}</a>
        <a className={linkClass} href={`${prefix}/hotels/${HOTEL_IDS[stem]}-hotels`}>{isBn ? "হোটেল এলাকা ও booking check" : "Hotel areas & booking checks"}</a>
        {isBn && stem === "thailand" && (
          <a className={linkClass} href={`${prefix}/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide`}>
            {"অনলাইনে Thailand e-Visa করার নিয়ম (thaievisa.go.th গাইড)"}
          </a>
        )}
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{isBn ? "বাংলাদেশ থেকে পরিকল্পনায়: " : "When planning from Bangladesh: "}<a className={linkClass} href={`${prefix}/blog/dual-currency-card-endorsement-bangladesh`}>{isBn ? "কার্ড endorsement-এর ধাপ" : "card endorsement steps"}</a></p>
    </section>
    <TripCostEstimator key={cost.id} isBn={isBn} initialCountry={estimatorCountry} />
    <section aria-labelledby="cost-facts-heading" className="space-y-4 border-t border-slate-200 pt-6">
      <h2 id="cost-facts-heading" className="ural-section-title text-2xl text-slate-900">{isBn ? "হিসাবের ভিত্তি এক নজরে" : "Budget basis at a glance"}</h2>
      <dl className="grid gap-4 text-sm sm:grid-cols-2">{cost.keyFacts.map((fact) => <div key={fact.label}><dt className="font-bold text-slate-900">{fact.label}</dt><dd className="mt-1 leading-relaxed text-slate-700">{fact.value}</dd></div>)}</dl>
    </section>
    <section id="travel-intelligence-panel" className="scroll-mt-24 space-y-4">
      <h2 className="ural-section-title text-2xl text-slate-900">{isBn ? "বাজেট নিয়ে প্রশ্নোত্তর" : "Trip budget questions"}</h2>
      {cost.faqs.map((faq) => <details key={faq.question} className="border-b border-slate-200 py-3"><summary className="cursor-pointer py-1 font-semibold text-slate-900">{faq.question}</summary><p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-700">{faq.answer}</p></details>)}
    </section>
    <section id="cost-sources" className="scroll-mt-24 space-y-3 border-t border-slate-200 pt-6">
      <h2 className="ural-section-title text-xl text-slate-900">{isBn ? "Official planning source" : "Official planning sources"}</h2>
      <p className="text-sm leading-relaxed text-slate-600">{isBn ? "বর্তমান নিয়ম ও সেবা এখান থেকে যাচাই করুন। নিজের তারিখের চূড়ান্ত দাম সংশ্লিষ্ট supplier-এর কাছ থেকে নিন।" : "Check current rules and services here. Get final prices for your dates from the relevant supplier."}</p>
      <ul className="list-disc space-y-3 pl-5 text-sm">{cost.references.map((reference) => <li key={reference.url}><a className={linkClass} href={reference.url} target="_blank" rel="noopener noreferrer">{isBn ? reference.nameBn : reference.name}</a></li>)}</ul>
    </section>
  </article>;
}
