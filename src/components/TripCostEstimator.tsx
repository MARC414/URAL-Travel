import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Calculator, Plane } from "lucide-react";
import {
  ESTIMATOR_COUNTRIES, calculateTripCostEstimate, emptyEstimatorQuotes, estimatorReturnDate,
  type AirfareMode, type EstimatorCountry, type EstimatorLine,
} from "../utils/tripCostEstimator";
import { buildFlightSearchCode, buildWhiteLabelUrl, preferredCurrencyForOrigin } from "../utils/flightSearch";
import { useRates } from "../utils/rates-hook";
import { formatConverted, quote } from "../utils/rates";
import { RatesNotice } from "./RatesNotice";
import { durationBand, partySizeBand, trackToolResult } from "../utils/toolAnalytics";

const fieldClass = "mt-1 block min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald";

/** The same controls and honest empty state are rendered into EN/BN static HTML. */
export function TripCostEstimator({ isBn, initialCountry = "thailand" }: { isBn: boolean; initialCountry?: EstimatorCountry }) {
  const [country, setCountry] = useState<EstimatorCountry>(initialCountry);
  const [origin, setOrigin] = useState("DAC");
  const [days, setDays] = useState(5);
  const [nights, setNights] = useState(4);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [airfareMode, setAirfareMode] = useState<AirfareMode>("per-adult");
  const [quotes, setQuotes] = useState(emptyEstimatorQuotes);
  const [source, setSource] = useState("");
  const [checkedOn, setCheckedOn] = useState("");
  const [departure, setDeparture] = useState("");
  const [currencyChoice, setCurrencyChoice] = useState<"BDT" | "USD" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!submitted || !resultRef.current) return;
    const bounds = resultRef.current.getBoundingClientRect();
    if (bounds.top < 152 || bounds.bottom > window.innerHeight) {
      resultRef.current.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }, [submitted]);
  const displayCurrency = currencyChoice ?? preferredCurrencyForOrigin(origin);
  const { rates } = useRates();
  const result = calculateTripCostEstimate({
    country, origin, days, nights, rooms, party: { adults, children, infants }, airfareMode, quotes, source, checkedOn,
  });
  const selected = ESTIMATOR_COUNTRIES.find((item) => item.key === country)!;
  const prefix = isBn ? "/bn" : "";
  const number = (value: number) => new Intl.NumberFormat(isBn ? "bn-BD" : "en-GB").format(value);
  const showResult = submitted && result.complete;
  const effectiveCurrency = displayCurrency === "USD" && quote("USD", rates) !== null ? "USD" : "BDT";
  const amount = (value: number) => effectiveCurrency === "USD"
    ? formatConverted(value, "USD", rates, isBn)!
    : new Intl.NumberFormat(isBn ? "bn-BD" : "en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 2 }).format(value);
  const returnDate = estimatorReturnDate(departure, days);
  const flightSearch = result.validRoute && result.validDays && result.validParty && result.travellers <= 9
    ? buildFlightSearchCode({ origin, destination: selected.airportCode, departureDate: departure, returnDate, tripType: "roundtrip", adults }) : "";
  const flightUrl = buildWhiteLabelUrl({ flightSearch, currency: displayCurrency, locale: isBn ? "bn" : "en" });
  const labels: Record<EstimatorLine, { title: string; unit: string }> = {
    airfare: { title: isBn ? "রাউন্ডট্রিপ ফ্লাইট, ব্যাগেজ ও কর" : "Round-trip flights, baggage & taxes", unit: airfareMode === "whole-party" ? (isBn ? "সব প্রাপ্তবয়স্ক, শিশু ও ইনফ্যান্টের মোট" : "Total for every adult, child and infant") : (isBn ? "একজন প্রাপ্তবয়স্কের সম্পূর্ণ টিকিট" : "Complete ticket per adult") },
    childAirfare: { title: isBn ? "শিশুদের ফ্লাইটের কোটেশন" : "Children’s flight quote", unit: isBn ? "সব শিশুর রাউন্ডট্রিপ মোট; airline-এর age band দেখুন" : "Round-trip total for all children; check airline age bands" },
    infantAirfare: { title: isBn ? "ইনফ্যান্টদের ফ্লাইটের কোটেশন" : "Infants’ flight quote", unit: isBn ? "সব ইনফ্যান্টের মোট, কর ও ফিসহ" : "Total for all infants, including taxes and fees" },
    lodging: { title: isBn ? "আবাসনের করসহ রেট" : "Tax-inclusive accommodation", unit: isBn ? "প্রতি রুম, প্রতি রাত" : "Per room, per night" },
    meals: { title: isBn ? "খাবার ও পানীয় জল" : "Meals & drinking water", unit: isBn ? "প্রতি প্রাপ্তবয়স্ক/শিশু, প্রতি দিন" : "Daily allowance per adult/child" },
    transport: { title: isBn ? "স্থানীয় যাতায়াত ও ট্রান্সফার" : "Local transport & transfers", unit: isBn ? "প্রতি প্রাপ্তবয়স্ক/শিশু, প্রতি দিনের গড়" : "Average daily allowance per adult/child" },
    tickets: { title: isBn ? "প্রাপ্তবয়স্কদের attraction ticket" : "Adult attraction tickets", unit: isBn ? "একজন প্রাপ্তবয়স্কের পুরো ট্রিপের মোট" : "Per adult, for the entire trip" },
    childTickets: { title: isBn ? "শিশুদের attraction ticket" : "Children’s attraction tickets", unit: isBn ? "সব শিশুর পুরো ট্রিপের মোট; বয়স/উচ্চতার শর্ত দেখুন" : "All children, entire trip; check age/height rules" },
    extras: { title: isBn ? "ভিসা, ইনস্যুরেন্স ও অন্যান্য খরচ" : "Visas, insurance & other costs", unit: isBn ? "পুরো দলের মোট: shopping, infant extras, ফি ও reserve-সহ" : "Whole party: include shopping, infant extras, fees and reserve" },
  };
  const activeLines = result.lines.filter((line) => line.multiplier !== 0);
  const editNumber = (value: string) => value === "" ? NaN : Number(value);
  const displayNumber = (value: number) => Number.isFinite(value) ? value : "";

  return (
    <section id="trip-cost-estimator" aria-labelledby="trip-estimator-heading" className="scroll-mt-40 space-y-6">
      <header className="space-y-2 border-b border-slate-200 pb-5">
        <h2 id="trip-estimator-heading" className="flex items-center gap-2 font-sans text-xl font-bold text-brand-navy">
          <Calculator size={22} aria-hidden="true" className="shrink-0" />
          {isBn ? "ট্রিপ কস্ট এস্টিমেটর" : "Trip Cost Estimator"}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-slate-600">{isBn
          ? "আপনার তারিখ, যাত্রী ও থাকার পরিকল্পনা ঠিক করে বর্তমান কোটেশন এবং নিজের খরচের বরাদ্দ লিখুন। ফাঁকা ঘর অজানা খরচ বোঝায়; অন্তর্ভুক্ত বা প্রযোজ্য নয় এমন খাতে 0 লিখুন।"
          : "Set your dates, party and stay, then enter current quotes and your own spending allowances. Blank means unknown; enter 0 for an included or unnecessary item."}</p>
      </header>

      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <form noValidate className="min-w-0 space-y-7" onChange={() => setSubmitted(false)} onSubmit={(event) => {
          event.preventDefault(); setSubmitted(true);
          if (result.complete) trackToolResult("budget-estimator", { partySize: partySizeBand(result.travellers), duration: durationBand(days), currency: effectiveCurrency });
        }}>
          <fieldset className="space-y-4">
            <legend className="mb-3 text-base font-bold text-slate-900">{isBn ? "ভ্রমণ ও যাত্রীর তথ্য" : "Trip & travellers"}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="trip-destination" className="text-sm font-semibold text-slate-700">{isBn ? "গন্তব্য" : "Destination"}
                <select id="trip-destination" className={fieldClass} value={country} onChange={(e) => setCountry(e.target.value as EstimatorCountry)}>
                  {ESTIMATOR_COUNTRIES.map((item) => <option key={item.key} value={item.key}>{isBn ? item.labelBn : item.labelEn}</option>)}
                </select>
              </label>
              <label htmlFor="trip-origin" className="text-sm font-semibold text-slate-700">{isBn ? "যাত্রার বিমানবন্দর (IATA)" : "Departure airport (IATA)"}
                <input id="trip-origin" className={fieldClass} value={origin} maxLength={3} autoCapitalize="characters" spellCheck={false} list="trip-airport-options" onChange={(e) => setOrigin(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))} aria-invalid={!result.validRoute} aria-describedby="trip-origin-help" />
                <datalist id="trip-airport-options"><option value="DAC">Dhaka</option><option value="CGP">Chattogram</option><option value="ZYL">Sylhet</option><option value="LHR">London Heathrow</option><option value="JFK">New York JFK</option><option value="DXB">Dubai</option><option value="SIN">Singapore</option><option value="KUL">Kuala Lumpur</option></datalist>
              </label>
            </div>
            <p id="trip-origin-help" className="text-xs leading-relaxed text-slate-600">{isBn ? "যেকোনো বিমানবন্দরের ৩ অক্ষরের কোড লিখুন।" : "Enter any airport’s three-letter code."} <a href={`${prefix}/tools/airport-codes`} className="underline underline-offset-2">{isBn ? "বিমানবন্দরের কোড খুঁজুন" : "Look up an airport code"}</a></p>
            <div className="grid grid-cols-3 gap-3">
              {([
                ["adults", isBn ? "প্রাপ্তবয়স্ক" : "Adults", adults, setAdults, 1],
                ["children", isBn ? "শিশু" : "Children", children, setChildren, 0],
                ["infants", isBn ? "ইনফ্যান্ট" : "Infants", infants, setInfants, 0],
              ] as const).map(([key, label, value, setValue, min]) => <label key={key} htmlFor={`trip-${key}`} className="text-sm font-semibold text-slate-700">{label}
                <input id={`trip-${key}`} type="number" min={min} max={12} step={1} className={fieldClass} value={displayNumber(value)} onChange={(e) => setValue(editNumber(e.target.value))} aria-describedby="trip-party-help" aria-invalid={!result.validParty} />
              </label>)}
            </div>
            <p id="trip-party-help" className="text-xs leading-relaxed text-slate-600">{isBn
              ? "মোট ১–১২ জন, অন্তত ১ জন প্রাপ্তবয়স্ক। Airline-এর age band মেনে দল ভাগ করুন। ইনফ্যান্টের জন্য দৈনিক খাবার/যাতায়াত গুণ হয় না; প্রয়োজনীয় খরচ ‘অন্যান্য’ খাতে যোগ করুন।"
              : "1–12 travellers, at least one adult. Use your airline’s age bands. Infants have no daily meals/transport multiplier; add any needed costs under other costs."}</p>
            <div className="grid grid-cols-3 gap-3">
              <label htmlFor="trip-days" className="text-sm font-semibold text-slate-700">{isBn ? "দিন (১–৩০)" : "Days (1–30)"}<input id="trip-days" type="number" min={1} max={30} step={1} className={fieldClass} value={displayNumber(days)} onChange={(e) => { const value = editNumber(e.target.value); setDays(value); setNights(Number.isFinite(value) ? Math.max(0, value - 1) : NaN); }} aria-invalid={!result.validDays} /></label>
              <label htmlFor="trip-nights" className="text-sm font-semibold text-slate-700">{isBn ? "হোটেলের রাত" : "Hotel nights"}<input id="trip-nights" type="number" min={0} max={Number.isFinite(days) ? days : 30} step={1} className={fieldClass} value={displayNumber(nights)} onChange={(e) => setNights(editNumber(e.target.value))} aria-invalid={!result.validStay} /></label>
              <label htmlFor="trip-rooms" className="text-sm font-semibold text-slate-700">{isBn ? "রুম (১–১২)" : "Rooms (1–12)"}<input id="trip-rooms" type="number" min={1} max={12} step={1} className={fieldClass} value={displayNumber(rooms)} onChange={(e) => setRooms(editNumber(e.target.value))} aria-invalid={!result.validStay} /></label>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">{isBn ? "দিন বদলালে হোটেলের রাত প্রথমে দিন − ১ হয়; কোটেশন অনুযায়ী ঠিক করুন। রুমের ধারণক্ষমতা হোটেলের সঙ্গে নিশ্চিত করুন।" : "Changing duration starts hotel nights at days − 1; adjust to your quote. Confirm room occupancy with the property."}</p>
            <label htmlFor="trip-departure" className="block text-sm font-semibold text-slate-700">{isBn ? "ফ্লাইট সার্চের তারিখ (ঐচ্ছিক)" : "Departure date for flight search (optional)"}
              <input id="trip-departure" type="date" className={fieldClass} value={departure} onChange={(e) => setDeparture(e.target.value)} />
            </label>
            {returnDate && <p className="text-xs text-slate-600">{isBn ? "রাউন্ডট্রিপ সার্চের ফেরার তারিখ: " : "Round-trip search returns on: "}<time dateTime={returnDate}>{new Intl.DateTimeFormat(isBn ? "bn-BD" : "en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${returnDate}T00:00:00Z`))}</time></p>}
          </fieldset>

          <fieldset aria-describedby="trip-quotes-help" className="space-y-4 border-t border-slate-200 pt-5">
            <legend className="pr-3 text-base font-bold text-slate-900">{isBn ? "আপনার কোটেশন ও বরাদ্দ (BDT)" : "Your quotes & allowances (BDT)"}</legend>
            <p id="trip-quotes-help" className="text-xs leading-relaxed text-slate-600">{isBn
              ? "সব ইনপুট BDT-তে। বিদেশি মুদ্রার কোটেশনের জন্য আপনার ব্যাংক/পেমেন্ট সেবার প্রযোজ্য BDT অঙ্ক ব্যবহার করুন। Display currency শুধু ফল দেখানোর মুদ্রা বদলায়। প্যাকেজে অন্তর্ভুক্ত খরচ দুবার গুনবেন না।"
              : "All inputs stay in BDT. For foreign quotes, use your bank/payment provider’s applicable BDT amount. Display currency changes the result only. Avoid counting bundled costs twice."}</p>
            <label htmlFor="trip-airfare-mode" className="block text-sm font-semibold text-slate-700">{isBn ? "ফ্লাইট কোটেশনের ধরন" : "How is your airfare quoted?"}
              <select id="trip-airfare-mode" className={fieldClass} value={airfareMode} onChange={(e) => setAirfareMode(e.target.value as AirfareMode)}>
                <option value="per-adult">{isBn ? "প্রাপ্তবয়স্ক প্রতি; শিশু/ইনফ্যান্ট আলাদা" : "Per adult; children/infants separately"}</option>
                <option value="whole-party">{isBn ? "পুরো দলের একটি মোট" : "One total for the whole party"}</option>
              </select>
            </label>
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
              {activeLines.map(({ key }) => <label key={key} htmlFor={`trip-quote-${key}`} className="block text-sm font-semibold text-slate-800">
                {labels[key].title}
                <span id={`trip-unit-${key}`} className="mt-1 block text-xs font-normal leading-relaxed text-slate-600">{labels[key].unit}</span>
                <input id={`trip-quote-${key}`} type="text" inputMode="decimal" className={fieldClass} value={quotes[key]} maxLength={14} onChange={(e) => setQuotes((old) => ({ ...old, [key]: e.target.value }))} placeholder={isBn ? "অজানা হলে ফাঁকা রাখুন" : "Leave blank if unknown"} aria-invalid={result.invalid.includes(key)} aria-describedby={`trip-unit-${key}${result.invalid.includes(key) ? ` trip-error-${key}` : ""}`} />
                {result.invalid.includes(key) && <span id={`trip-error-${key}`} className="mt-1 block text-xs font-normal text-red-700">{isBn ? "ধনাত্মক অঙ্ক বা 0 লিখুন; কমা ছাড়া সর্বোচ্চ ২ দশমিক ঘর।" : "Use a positive amount or 0, without commas, up to two decimal places."}</span>}
              </label>)}
            </div>
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <label htmlFor="trip-quote-source" className="block text-sm font-semibold text-slate-700">{isBn ? "কোটেশন/বরাদ্দের উৎস" : "Quote / allowance sources"}
                <input id="trip-quote-source" type="text" className={fieldClass} maxLength={240} value={source} onChange={(e) => setSource(e.target.value)} placeholder={isBn ? "Airline checkout, হোটেলের ইমেইল, নিজের খাবারের বরাদ্দ" : "Airline checkout, hotel email, personal meal allowance"} aria-invalid={submitted && !result.validSource} />
              </label>
              <label htmlFor="trip-quote-date" className="block text-sm font-semibold text-slate-700">{isBn ? "কোটেশন/বরাদ্দ যাচাইয়ের তারিখ" : "Date you checked these quotes / allowances"}
                <input id="trip-quote-date" type="date" className={fieldClass} value={checkedOn} onChange={(e) => setCheckedOn(e.target.value)} aria-invalid={submitted && !result.validDate} />
              </label>
              <p className="text-xs leading-relaxed text-slate-600">{isBn ? "উৎস ও তারিখ আপনার দেওয়া তথ্য। গন্তব্য, তারিখ বা যাত্রী বদলালে হিসাব করার আগে কোটেশনগুলো আবার মিলিয়ে নিন।" : "Sources and dates are supplied by you. Recheck quotes before calculating after any change of destination, dates or party."}</p>
            </div>
          </fieldset>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-bold text-white hover:bg-brand-emerald focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald">{isBn ? "ট্রিপের হিসাব করুন" : "Calculate trip cost"}<ArrowRight size={16} aria-hidden="true" /></button>
            <button type="button" className="min-h-11 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-white focus-visible:outline-2 focus-visible:outline-brand-emerald" onClick={() => { setQuotes(emptyEstimatorQuotes()); setSource(""); setCheckedOn(""); setSubmitted(false); }}>{isBn ? "কোটেশন মুছুন" : "Clear quotes"}</button>
          </div>
          <noscript><p className="text-sm text-slate-700">{isBn ? "হিসাব করতে JavaScript চালু করুন। নিচের সার্চ ও গাইডের লিংকগুলো এখনই ব্যবহার করতে পারেন।" : "Enable JavaScript to calculate. The search and guide links below work now."}</p></noscript>
        </form>

        <aside aria-label={isBn ? "আপনার ট্রিপের হিসাব" : "Your trip estimate"} className="min-w-0 space-y-5 xl:sticky xl:top-24">
          <div ref={resultRef} className="scroll-mt-40 space-y-4 rounded-2xl bg-brand-navy p-5 text-white sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-sans text-lg font-bold">{isBn ? "আপনার পরিকল্পনার হিসাব" : "Your trip estimate"}</h3>
              <label htmlFor="trip-display-currency" className="text-xs text-white/80">{isBn ? "ফল দেখানোর মুদ্রা" : "Display currency"}
                <select id="trip-display-currency" className="ml-2 min-h-11 rounded-lg border border-white/30 bg-brand-navy px-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-brand-gold" value={displayCurrency} onChange={(e) => setCurrencyChoice(e.target.value as "BDT" | "USD")}><option value="BDT">BDT</option><option value="USD">USD</option></select>
              </label>
            </div>
            <div role="status" aria-live="polite" aria-atomic="true" className="space-y-3">
              {showResult ? <>
                <p data-trip-estimate-total className="break-words text-2xl font-bold tabular-nums text-brand-gold sm:text-3xl">{amount(result.totalBdt!)}</p>
                <p className="text-sm text-white/80">{isBn ? "পুরো দলের জন্য আপনার লেখা খরচের হিসাব।" : "Calculated from your entries for the whole party."}</p>
                <p className="text-sm text-white/80">{isBn ? "সমান ভাগে জনপ্রতি: " : "Equal share per traveller: "}<strong className="text-white">{amount(result.perPersonBdt!)}</strong></p>
                <p className="text-xs leading-relaxed text-white/80">{isBn ? "ইনফ্যান্টসহ সবার সমান ভাগ; এটি আসল শিশু/প্রাপ্তবয়স্ক ভাড়ার ভাগ নয়।" : "Equal division includes infants; it is not the actual adult/child fare allocation."}</p>
                <p data-trip-estimate-source className="break-words border-t border-white/20 pt-3 text-xs leading-relaxed text-white/80">{isBn ? "আপনার দেওয়া উৎস: " : "Sources you entered: "}{source.trim()} · <time dateTime={checkedOn}>{new Intl.DateTimeFormat(isBn ? "bn-BD" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${checkedOn}T00:00:00Z`))}</time></p>
              </> : <>
                <p className="text-base font-semibold">{isBn ? "কোটেশন যোগ করলে হিসাব তৈরি হবে" : "Start with the quotes for your trip"}</p>
                <p className="text-sm leading-relaxed text-white/80">{isBn ? "সব প্রয়োজনীয় খরচ, উৎস ও যাচাইয়ের তারিখ লিখে ‘ট্রিপের হিসাব করুন’ চাপুন।" : "Add every required cost, its sources and the checked date, then choose Calculate trip cost."}</p>
                {result.missing.length > 0 && <p className="text-xs leading-relaxed text-white/80">{isBn ? "এখনো বাকি: " : "Still needed: "}{result.missing.map((key) => labels[key].title).join(" · ")}</p>}
              </>}
              {submitted && !result.complete && <ul className="list-disc space-y-1 pl-4 text-sm text-white">
                {!result.validRoute && <li>{isBn ? "যাত্রা ও গন্তব্যের আলাদা, সঠিক IATA কোড দিন।" : "Use different, valid departure and destination IATA codes."}</li>}
                {(!result.validDays || !result.validStay) && <li>{isBn ? "১–৩০ দিন, ০ থেকে ভ্রমণের দিনসংখ্যা পর্যন্ত রাত এবং ১–১২ রুম দিন।" : "Use 1–30 days, hotel nights from 0 up to the trip duration, and 1–12 rooms."}</li>}
                {!result.validParty && <li>{isBn ? "অন্তত একজন প্রাপ্তবয়স্কসহ ১–১২ জন যাত্রী দিন।" : "Enter 1–12 travellers, including at least one adult."}</li>}
                {result.invalid.length > 0 && <li>{isBn ? "চিহ্নিত খরচের ঘরগুলো ঠিক করুন।" : "Correct the highlighted cost fields."}</li>}
                {!result.validSource && <li>{isBn ? "কোটেশন বা বরাদ্দের উৎস লিখুন।" : "Name the sources of your quotes or allowances."}</li>}
                {!result.validDate && <li>{isBn ? "আজ বা তার আগের একটি সঠিক যাচাইয়ের তারিখ দিন।" : "Enter a valid checked date on or before today."}</li>}
              </ul>}
            </div>
            {displayCurrency === "USD" && effectiveCurrency === "BDT" && <p className="text-xs leading-relaxed text-white/80">{isBn ? "USD রেফারেন্স রেট পাওয়া যায়নি। ফল BDT-তে দেখানো হবে।" : "USD reference rates are unavailable. Results are shown in BDT."}</p>}
          </div>
          {effectiveCurrency === "USD" && <RatesNotice rates={rates} isBn={isBn} fromCode="BDT" toCode="USD" />}
          {showResult && <section aria-labelledby="trip-breakdown-heading" className="space-y-3">
            <h3 id="trip-breakdown-heading" className="text-base font-bold text-slate-900">{isBn ? "খরচের ভাঙন" : "Cost breakdown"}</h3>
            <dl className="divide-y divide-slate-200 text-sm">{activeLines.map(({ key, multiplier, totalBdt }) => <div key={key} className="flex flex-wrap justify-between gap-x-3 gap-y-1 py-3"><dt className="min-w-0 flex-1 text-slate-700">{labels[key].title}<span className="mt-1 block text-xs text-slate-600">{labels[key].unit} × {number(multiplier)}</span></dt><dd className="font-semibold tabular-nums text-slate-900">{amount(totalBdt!)}</dd></div>)}</dl>
          </section>}
          <div className="space-y-3 border-t border-slate-200 pt-5 text-sm text-slate-700">
            <h3 className="font-bold text-slate-900">{isBn ? "বর্তমান কোটেশন সংগ্রহ করুন" : "Gather current quotes"}</h3>
            <a href={flightUrl} target="_blank" rel="noopener noreferrer sponsored" data-affiliate-placement="trip_estimator" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-emerald px-4 py-3 text-sm font-bold text-white hover:bg-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald"><Plane size={16} aria-hidden="true" />{flightSearch ? (isBn ? "এই রুটের ফ্লাইট খুঁজুন" : "Search this flight route") : (isBn ? "ফ্লাইট সার্চ খুলুন" : "Open flight search")}</a>
            <p className="text-xs leading-relaxed text-slate-600">{isBn ? "Affiliate partner-এ সার্চ খুলবে। সেখানে শিশু/ইনফ্যান্ট, বয়স, তারিখ ও ব্যাগেজ মিলিয়ে নিন। ৯ জনের বেশি দলের জন্য airline-এর group quote নিন।" : "Opens our affiliate partner’s search. Add children/infants and check ages, dates and baggage there. For more than nine travellers, request an airline group quote."}</p>
            <a className="block py-1 font-semibold underline underline-offset-4" href={`${prefix}/costs/${selected.costId}`}>{isBn ? `${selected.labelBn}: বাজেটে কী রাখবেন` : `${selected.labelEn}: what to include in your budget`}</a>
            <a className="block py-1 font-semibold underline underline-offset-4" href={`${prefix}/hotels`}>{isBn ? "হোটেল এলাকা ও partner collection" : "Hotel areas & partner collections"}</a>
            <p className="text-xs leading-relaxed text-slate-600">{isBn ? "এই হিসাব আপনার লেখা খরচের জন্য; booking quote বা সব খরচ অন্তর্ভুক্ত থাকার নিশ্চয়তা নয়। অঙ্ক ও কোটেশনের নোট সংরক্ষণ বা পাঠানো হয় না; রিফ্রেশ করলে মুছে যায়।" : "This estimate covers your entries; it is not a booking quote or an all-inclusive guarantee. Amounts and quote notes are not saved or sent; refreshing clears them."}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
