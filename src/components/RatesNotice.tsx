import React from "react";
import { ratesProviderUrl, ratesCaption, ratesFreshness, rateLine, type RatesPayload } from "../utils/rates";
import { useRates } from "../utils/rates-hook";

export function RatesNotice({ rates, isBn, fromCode, toCode = "BDT" }: {
  rates: RatesPayload | null; isBn: boolean; fromCode?: string; toCode?: string;
}) {
  const caption = ratesCaption(rates, isBn);
  if (!rates || !caption) return null;
  const line = fromCode ? rateLine(fromCode, toCode, rates, isBn) : null;
  return (
    <div data-rates-notice className="space-y-1 text-xs leading-relaxed text-slate-600">
      {line && <p className="font-mono font-semibold text-slate-800">{line}</p>}
      <p>{caption} · <a href={ratesProviderUrl(rates)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-navy">{rates.provider}</a></p>
      {ratesFreshness(rates) === "stale" && <p className="font-semibold text-amber-800">{isBn
        ? "উপরের তারিখের আগের রেট ব্যবহার করা হচ্ছে; নতুন রেটের জন্য আবার চেষ্টা করা হবে।"
        : "Using cached rates from the date above; a newer rate will be requested."}</p>}
      <p>{isBn
        ? "শুধু পরিকল্পনার রেফারেন্স; লেনদেনের রেট নয়। আপনার ব্যাংক বা সেবাদাতার রেট ও ফি ভিন্ন হতে পারে।"
        : "For planning only, not transaction rates. Your bank or provider may apply a different rate and fees."}</p>
    </div>
  );
}

export function DestinationRate({ code, isBn }: { code: string; isBn: boolean }) {
  const { rates } = useRates();
  return rates && rateLine(code, "BDT", rates, isBn) ? <RatesNotice rates={rates} isBn={isBn} fromCode={code} /> : null;
}
