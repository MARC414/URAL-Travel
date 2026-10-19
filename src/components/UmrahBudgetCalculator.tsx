import React, { useState } from "react";
import { calculateUmrahBudget, emptyUmrahBudget, UMRAH_BUDGET_ITEMS } from "../utils/umrahBudget";

/** Shared by the interactive hub and both prerendered locale pages. */
export function UmrahBudgetCalculator({ isBn }: { isBn: boolean }) {
  const [pilgrims, setPilgrims] = useState(2);
  const [inputs, setInputs] = useState(emptyUmrahBudget);
  const result = calculateUmrahBudget(inputs, pilgrims);
  const format = (value: number) => new Intl.NumberFormat(isBn ? "bn-BD" : "en-BD", {
    style: "currency", currency: "BDT", maximumFractionDigits: 2,
  }).format(value);
  const fieldClass = "mt-1 block w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:outline-2 focus:outline-brand-navy";

  return (
    <section id="umrah-calculator" aria-labelledby="umrah-budget-heading" className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold text-slate-600">{isBn ? "নিজের কোটেশনভিত্তিক BDT হিসাব · বাজারদর নয়" : "Your quote-based BDT worksheet · Not market prices"}</p>
        <h2 id="umrah-budget-heading" className="font-serif text-2xl font-bold text-slate-900">{isBn ? "আপনার পরিবারের ওমরাহ বাজেট কত হবে?" : "What will your family's Umrah budget be?"}</h2>
        <p className="text-sm text-slate-700 leading-relaxed">{isBn
          ? "সংক্ষিপ্ত উত্তর — একই তারিখের ফ্লাইট, ভিসা ও সেবা, আবাসন এবং যাতায়াতের কোটেশন সংগ্রহ করে নিচে BDT মোট লিখুন। URAL এখানে কোনো দাম বসিয়ে দেয় না, বিনিময় হার ধরে না এবং এজেন্সির তুলনায় সাশ্রয় দাবি করে না। টুল পর্যালোচনা: ১৮ অক্টোবর ২০২৬; এটি সরবরাহকারীর দাম যাচাইয়ের তারিখ নয়।"
          : "Quick answer — collect flight, visa/service, hotel and transport quotes for the same dates, then enter the BDT totals below. URAL supplies no preset prices, assumes no exchange rate and claims no agency savings. Tool reviewed 18 October 2026; this is not a supplier price-check date."}</p>
      </header>
      <div id="umrah-budget-instructions" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 space-y-2">
        <p>{isBn
          ? "প্রতিটি ঘরে পুরো দলের মোট খরচ লিখুন — জনপ্রতি বা প্রতি রাতের দাম নয়। দুই শহরের হোটেল আলাদা হিসাব করুন: রুম × রাত × করসহ রেট। বিদেশি মুদ্রার কোটেশন হলে নিজের ব্যাংক/পেমেন্ট সেবার প্রযোজ্য BDT পরিমাণ ও ফি ব্যবহার করুন।"
          : "Enter the whole party's total in each field — not a per-person or nightly rate. Price each city's hotels separately: rooms × nights × tax-inclusive rate. For foreign-currency quotes, use your bank/payment provider's applicable BDT amount and fees."}</p>
        <p>{isBn
          ? "প্যাকেজে হোটেল বা ট্রান্সফার অন্তর্ভুক্ত থাকলে সেই খরচ দুবার যোগ করবেন না। অন্তর্ভুক্ত বা প্রযোজ্য নয় এমন খাতে নিজে 0 লিখুন; অজানা খরচ ফাঁকা রাখুন। সব ঘর পূরণ না হলে পূর্ণ বাজেট দেখানো হবে না।"
          : "Do not count hotels or transfers twice if bundled in a service package. Explicitly enter 0 for included/not-applicable items; leave unknown costs blank. No complete budget appears until every field is filled."}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800" htmlFor="umrah-budget-pilgrims">
            {isBn ? "যাত্রী সংখ্যা (১–১০০)" : "Number of travellers (1–100)"}
            <input id="umrah-budget-pilgrims" type="number" min="1" max="100" step="1" value={Number.isNaN(pilgrims) ? "" : pilgrims}
              onChange={(event) => setPilgrims(event.target.value === "" ? NaN : Number(event.target.value))}
              aria-invalid={!result.validParty} className={fieldClass} />
          </label>
          <fieldset aria-describedby="umrah-budget-instructions" className="space-y-4">
            <legend className="text-sm font-bold text-slate-900">{isBn ? "পুরো দলের খাতওয়ারি মোট (BDT)" : "Whole-party totals by category (BDT)"}</legend>
            {UMRAH_BUDGET_ITEMS.map(({ key, en, bn }) => (
              <label key={key} htmlFor={`umrah-cost-${key}`} className="block text-sm font-semibold text-slate-700">
                {isBn ? bn : en}
                <input id={`umrah-cost-${key}`} type="number" inputMode="decimal" min="0" max="1000000000" step="0.01"
                  value={inputs[key]} onChange={(event) => setInputs((previous) => ({ ...previous, [key]: event.target.value }))}
                  placeholder={isBn ? "অজানা হলে ফাঁকা রাখুন" : "Leave blank if unknown"}
                  aria-invalid={result.invalid.includes(key)} className={fieldClass} />
                {result.invalid.includes(key) && <span className="block text-xs text-red-700 mt-1">{isBn ? "০–১,০০০,০০০,০০০ BDT; সর্বোচ্চ ২ দশমিক ঘর ব্যবহার করুন।" : "Use 0–1,000,000,000 BDT with up to 2 decimal places."}</span>}
              </label>
            ))}
          </fieldset>
          <button type="button" className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold" onClick={() => { setInputs(emptyUmrahBudget()); setPilgrims(2); }}>
            {isBn ? "হিসাব মুছে আবার শুরু করুন" : "Clear worksheet"}
          </button>
        </div>
        <div className="space-y-5">
          <div role="status" aria-live="polite" aria-atomic="true" className="rounded-2xl bg-brand-navy p-5 text-white space-y-3">
            <h3 className="font-bold">{isBn ? "আপনার লেখা অঙ্কের যোগফল" : "Sum of your entered amounts"}</h3>
            {result.complete ? <>
              <p data-umrah-budget-total="true" className="text-2xl font-bold text-[#F6B73C]">{format(result.totalBdt!)}</p>
              <p>{isBn ? "জনপ্রতি সমান ভাগ: " : "Equal share per traveller: "}{format(result.perPersonBdt!)}</p>
              <p className="text-xs text-slate-300">{isBn ? "সমান ভাগ আসল শিশু/প্রাপ্তবয়স্ক টিকিট বা রুমের মূল্যবণ্টন নয়।" : "Equal sharing is not an actual child/adult fare or room-price allocation."}</p>
            </> : <>
              <p>{isBn ? "হিসাব অসম্পূর্ণ — এখনো পূর্ণ বাজেট নয়।" : "Incomplete — not yet a complete budget."}</p>
              <p className="text-sm">{isBn ? "ফাঁকা খাত: " : "Missing categories: "}{result.missing.length}; {isBn ? "অগ্রহণযোগ্য খাত: " : "invalid categories: "}{result.invalid.length}</p>
            </>}
            {!result.validParty && <p>{isBn ? "যাত্রী সংখ্যা ১–১০০-এর মধ্যে পূর্ণসংখ্যা হতে হবে।" : "Traveller count must be a whole number from 1 to 100."}</p>}
            <p className="text-xs text-slate-300">{isBn
              ? "এই যোগফল কেবল আপনার দেওয়া খাতগুলোর জন্য; এটি বুকিং কোটেশন বা সব খরচ অন্তর্ভুক্ত থাকার নিশ্চয়তা নয়। তথ্য এখানে সংরক্ষণ বা পাঠানো হয় না; পৃষ্ঠা রিফ্রেশ করলে মুছে যাবে।"
              : "This sum covers only what you entered; it is not a booking quote or an all-inclusive guarantee. The worksheet does not save or submit these amounts; refreshing clears them."}</p>
          </div>
          <section className="rounded-xl border border-slate-200 p-4 space-y-2 text-sm text-slate-700">
            <h3 className="font-bold text-slate-900">{isBn ? "কোন তথ্য কোটেশনের সঙ্গে রাখবেন?" : "What should you keep with each quote?"}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{isBn ? "ইস্যুর তারিখ/মেয়াদ, সরবরাহকারীর নাম ও ভ্রমণের নির্দিষ্ট তারিখ।" : "Issue date/expiry, supplier name and exact travel dates."}</li>
              <li>{isBn ? "যাত্রীদের বয়স, রুম ও রাতের সংখ্যা, অনুমোদিত ওকুপেন্সি ও খাবার।" : "Traveller ages, rooms, nights, permitted occupancy and meals."}</li>
              <li>{isBn ? "কর, ব্যাগেজ, ভিসা-প্যাকেজে অন্তর্ভুক্ত সেবা, স্টেশন/বিমানবন্দর ট্রান্সফার।" : "Taxes, baggage, services bundled with the visa, station/airport transfers."}</li>
              <li>{isBn ? "পেমেন্ট/বিনিময় ফি, সহায়তা, বাতিল ও রিফান্ডের শর্ত।" : "Payment/FX fees, assistance, cancellation and refund terms."}</li>
            </ul>
            <p>{isBn ? "এজেন্সি ও DIY তুলনায় সবগুলো শর্ত একই রাখুন। কোটেশন না মিললে সাশ্রয়ের অঙ্ক নির্ভরযোগ্য নয়।" : "Match all of these when comparing an agency with DIY. Unmatched quotes cannot establish reliable savings."}</p>
          </section>
          <p className="text-xs text-slate-600">{isBn
            ? "আগের রেফারেন্স: ১০ দিন, ৪ জন শেয়ারিংয়ে জনপ্রতি BDT 1,16,000–1,32,000 (১৪ অক্টোবর ২০২৬; পুনরায় দাম যাচাই করা হয়নি)। এটি বর্তমান দাম নয় এবং এই হিসাবের কোনো ইনপুট বা সাশ্রয়ের প্রমাণ নয়।"
            : "Earlier reference: BDT 1,16,000–1,32,000 per person for 10 days, four-sharing (14 October 2026; not re-priced). It is not a current price or evidence for any worksheet input or saving."}</p>
        </div>
      </div>
    </section>
  );
}
