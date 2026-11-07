import React, { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { useRates } from "../utils/rates-hook";
import { formatConverted, rateLine } from "../utils/rates";
import { parseEstimatorAmount } from "../utils/tripCostEstimator";
import { trackToolResult } from "../utils/toolAnalytics";
import { RatesNotice } from "./RatesNotice";

const CURRENCIES = [
  ["USD", "US dollar", "মার্কিন ডলার"], ["EUR", "Euro", "ইউরো"], ["GBP", "Pound sterling", "ব্রিটিশ পাউন্ড"],
  ["SAR", "Saudi riyal", "সৌদি রিয়াল"], ["AED", "UAE dirham", "ইউএই দিরহাম"], ["NPR", "Nepali rupee", "নেপালি রুপি"],
  ["THB", "Thai baht", "থাই বাট"], ["MYR", "Malaysian ringgit", "মালয়েশিয়ান রিংগিট"],
  ["SGD", "Singapore dollar", "সিঙ্গাপুর ডলার"], ["MVR", "Maldivian rufiyaa", "মালদ্বীপের রুফিয়া"],
] as const;

export function CurrencyConverter({ isBn }: { isBn: boolean }) {
  const [input, setInput] = useState("");
  const { rates, status } = useRates();
  const minor = parseEstimatorAmount(input);
  const valid = minor !== null;
  useEffect(() => {
    if (!valid || !rates) return;
    const timer = setTimeout(() => trackToolResult("currency-converter", { currency: "BDT" }), 1200);
    return () => clearTimeout(timer);
  }, [input, valid, rates]);
  return (
    <section id="currency-converter" aria-labelledby="currency-converter-heading" className="mx-auto max-w-2xl space-y-5">
      <h2 id="currency-converter-heading" className="flex items-center gap-2 font-sans text-xl font-bold text-brand-navy"><Coins size={22} aria-hidden="true" />{isBn ? "কারেন্সি কনভার্টার" : "Currency Converter"}</h2>
      <p className="text-sm leading-relaxed text-slate-600">{isBn ? "BDT অঙ্ক লিখে provider-এর সর্বশেষ উপলব্ধ দৈনিক রেফারেন্স রেটে অন্য মুদ্রার হিসাব দেখুন।" : "Enter an amount in BDT to convert at the provider’s latest available daily reference rates."}</p>
      <label htmlFor="input-converter-bdt" className="block text-sm font-semibold text-slate-700">{isBn ? "আপনার অঙ্ক (BDT)" : "Your amount (BDT)"}
        <input id="input-converter-bdt" type="text" inputMode="decimal" value={input} maxLength={14} onChange={(e) => setInput(e.target.value)} aria-invalid={Boolean(input) && !valid} aria-describedby="converter-status" placeholder={isBn ? "BDT অঙ্ক লিখুন" : "Enter a BDT amount"} className="mt-2 block min-h-11 w-full rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald" />
      </label>
      <p id="converter-status" role="status" className="text-sm text-slate-600">{input && !valid
        ? (isBn ? "ধনাত্মক অঙ্ক বা 0 লিখুন; কমা ছাড়া সর্বোচ্চ দুই দশমিক ঘর।" : "Use a positive amount or 0, without commas, up to two decimal places.")
        : status === "loading" ? (isBn ? "রেফারেন্স রেট আনা হচ্ছে…" : "Loading reference rates…")
        : status === "unavailable" ? (isBn ? "রেট পাওয়া যায়নি — শুধু আপনার দেওয়া BDT অঙ্ক দেখানো হচ্ছে।" : "Rates unavailable — only your entered BDT amount can be shown.")
        : !input ? (isBn ? "অঙ্ক লিখলে রূপান্তর দেখা যাবে।" : "Enter an amount to see conversions.") : ""}</p>
      {valid && <p data-converter-base className="text-sm text-slate-700">{isBn ? "আপনার ইনপুট: " : "Your input: "}{new Intl.NumberFormat(isBn ? "bn-BD" : "en-BD", { style: "currency", currency: "BDT" }).format(minor / 100)}</p>}
      {valid && rates && <dl className="grid gap-x-6 sm:grid-cols-2">{CURRENCIES.map(([code, en, bn]) => {
        const converted = formatConverted(minor / 100, code, rates, isBn);
        return <div key={code} className="space-y-1 border-b border-slate-200 py-4">
          <dt className="text-sm font-semibold text-slate-700">{isBn ? bn : en} <span className="font-mono text-xs">{code}</span></dt>
          <dd data-converted-currency={code} className="break-words text-xl font-bold tabular-nums text-brand-navy">{converted ?? (isBn ? "রেট পাওয়া যায়নি" : "Rate unavailable")}</dd>
          {converted && <dd className="font-mono text-xs text-slate-600">{rateLine("BDT", code, rates, isBn)}</dd>}
        </div>;
      })}</dl>}
      <RatesNotice rates={rates} isBn={isBn} />
      <noscript><p className="text-sm text-slate-600">{isBn ? "রেট আনতে ও হিসাব করতে JavaScript চালু করুন।" : "Enable JavaScript to load rates and calculate."}</p></noscript>
    </section>
  );
}
