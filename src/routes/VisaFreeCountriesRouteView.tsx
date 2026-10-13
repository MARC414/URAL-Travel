import React from "react";

import { GuideJumpNav } from "../components/GuideJumpNav";
import { QuickAnswer } from "../components/QuickAnswer";

import { CheckCircle2, AlertTriangle, Plane, ArrowRight } from "lucide-react";

import {
  ALWAYS_CARRY,
  COMMONLY_MISREAD,
  LAST_VERIFIED,
  REMOTE_VISA_FREE,
  REMOTE_VOA,
  USABLE_NOW,
  VISA_FREE_FAQS,
} from "../data/visaFreeData";

type RouteViewProps = { context: Record<string, any> };

const JUMP_LINKS = [
  { id: "answer", en: "Quick answer", bn: "সংক্ষিপ্ত উত্তর" },
  { id: "usable", en: "Use it from Dhaka", bn: "ঢাকা থেকে যেগুলো সম্ভব" },
  { id: "remote", en: "The rest of the list", bn: "বাকি তালিকা" },
  { id: "misread", en: "Assumed easy, isn't", bn: "সহজ ভাবা হলেও নয়" },
  { id: "carry", en: "Always carry", bn: "সবসময় সঙ্গে রাখুন" },
  { id: "faq", en: "Questions", bn: "প্রশ্নোত্তর" },
];

/** Renders the entry-type badge. Colour carries meaning, so it is applied consistently. */
function EntryBadge({ entry }: { entry: string }) {
  const isGood = entry === "Visa on arrival" || entry === "Visa-free";
  const isWarning = entry === "Visa required";
  const tone = isGood
    ? "bg-emerald-50 text-emerald-900 ring-emerald-600/20"
    : isWarning
      ? "bg-slate-100 text-slate-700 ring-slate-400/30"
      : "bg-[#FDF0CC] text-[#8A5A00] ring-[#D4941A]/30";
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 font-sans text-[11px] font-bold ring-1 ${tone}`}
    >
      {entry}
    </span>
  );
}

export default function VisaFreeCountriesRouteView({ context }: RouteViewProps) {
  const { isBn, navigateTo } = context;

  const go = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigateTo(path);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <h1 className="ural-page-title font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {isBn
            ? "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া যেসব দেশে যাওয়া যায় (২০২৬)"
            : "Visa-Free Countries for a Bangladeshi Passport (2026)"}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600">
          {isBn
            ? "বাংলাদেশি পাসপোর্টে ভিসা ছাড়া বা অন-অ্যারাইভাল ভিসায় যেসব দেশে যাওয়া যায় — এবং তার মধ্যে ঢাকা থেকে বাস্তবে কোনগুলো ব্যবহার করা যায়। প্রতিটি নিয়ম যাচাই করা, তার তারিখসহ।"
            : "Which countries a Bangladeshi passport actually opens without a prior visa \u2014 and, more usefully, which of them you can realistically use from Dhaka. Every rule below is dated and sourced."}
        </p>
        <p className="text-xs font-medium text-slate-500">
          {isBn ? "সর্বশেষ যাচাই" : "Last verified"}: <time dateTime={LAST_VERIFIED}>{LAST_VERIFIED}</time>
        </p>
      </header>

      <GuideJumpNav links={JUMP_LINKS} isBn={isBn} />

      {/* ── Quick answer ─────────────────────────────────────────────────── */}
      <section id="answer" className="scroll-mt-24">
        <QuickAnswer id="visa-free-answer" label={isBn ? "সংক্ষিপ্ত উত্তর" : "Quick Answer"}>
          {isBn
            ? "বাংলাদেশি পাসপোর্টে সরাসরি ঢাকা থেকে আগে কিছু না করে যাওয়া যায় মাত্র তিনটি দেশে — নেপাল ও মালদ্বীপে ফ্রি অন-অ্যারাইভাল ভিসা, আর শ্রীলংকায় অনলাইন ETA (SAARC রেট ২০ ডলার, উড়ার আগেই অনুমোদন লাগবে)। বাকি নামগুলো — ক্যারিবিয়ান ও প্রশান্ত মহাসাগরের দ্বীপ রাষ্ট্র — সত্যিই ভিসা-মুক্ত, কিন্তু সেখানে পৌঁছাতে যেসব দেশ দিয়ে ট্রানজিট করতে হয়, সেগুলোর জন্য বাংলাদেশিদের আগেই ভিসা নিতে হয়। তাই তালিকাটি যত বড় দেখায়, বাস্তবে ব্যবহারযোগ্য অংশটি ছোট।"
            : "Direct from Dhaka, only three destinations require nothing arranged in advance: Nepal and the Maldives on free visa on arrival, and Sri Lanka with an online ETA approved before you fly (USD 20 at the SAARC rate). The rest of the well-publicised list \u2014 Caribbean and Pacific island states \u2014 is genuinely visa-free, but reaching them means transiting a country a Bangladeshi passport holder needs a visa for. The list is long; the usable part is not."}
        </QuickAnswer>
      </section>

      {/* ── 1. Usable now ────────────────────────────────────────────────── */}
      <section id="usable" className="scroll-mt-24 space-y-5">
        <div className="space-y-2">
          <h2 className="ural-section-title font-serif text-2xl font-bold text-slate-900">
            {isBn ? "১. ঢাকা থেকে সত্যিই ব্যবহার করা যায়" : "1. The ones you can actually use from Dhaka"}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            {isBn
              ? "তিনটিই সরাসরি ফ্লাইটে যাওয়া যায়, আর কোনোটিতেই দূতাবাসে যেতে হয় না।"
              : "All three have direct flights from Dhaka, and none require a visit to an embassy."}
          </p>
        </div>

        <div className="space-y-4">
          {USABLE_NOW.map((entry) => (
            <article
              key={entry.country}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="ural-card-title font-serif text-lg font-bold text-slate-900">
                  <span aria-hidden="true" className="mr-1.5">
                    {entry.flag}
                  </span>
                  {entry.country}
                </h3>
                <EntryBadge entry={entry.entry} />
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
                <div>
                  <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    {isBn ? "সর্বোচ্চ অবস্থান" : "Maximum stay"}
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold text-slate-800">{entry.maxStay}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    {isBn ? "খরচ" : "Cost"}
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold text-slate-800">{entry.cost}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    {isBn ? "ঢাকা থেকে" : "From Dhaka"}
                  </dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 font-mono text-sm font-semibold text-slate-800">
                    <Plane size={14} aria-hidden="true" className="text-emerald-700" />
                    {entry.reach}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-sm leading-relaxed text-slate-700">{entry.note}</p>

              {entry.caveat ? (
                <p className="mt-3 flex gap-2 rounded-lg bg-bg-subtle p-3 text-sm leading-relaxed text-slate-700">
                  <AlertTriangle size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8A5A00]" />
                  <span>{entry.caveat}</span>
                </p>
              ) : null}

              <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                {isBn ? "সূত্র" : "Source"}: {entry.source}
              </p>
            </article>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-slate-600">
          {isBn ? "প্রতিটি দেশের বিস্তারিত চেকলিস্ট: " : "Full step-by-step checklists for each: "}
          <a
            href="/visa/nepal-visa"
            onClick={(e) => go(e, "/visa/nepal-visa")}
            className="font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-emerald"
          >
            {isBn ? "নেপাল" : "Nepal"}
          </a>
          {", "}
          <a
            href="/visa/maldives-visa"
            onClick={(e) => go(e, "/visa/maldives-visa")}
            className="font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-emerald"
          >
            {isBn ? "মালদ্বীপ" : "Maldives"}
          </a>
          {". "}
          <a
            href="/visa"
            onClick={(e) => go(e, "/visa")}
            className="font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-emerald"
          >
            {isBn ? "সব ভিসা গাইড" : "All visa guides"}
          </a>
        </p>
      </section>

      {/* ── 2. The rest of the list ──────────────────────────────────────── */}
      <section id="remote" className="scroll-mt-24 space-y-5">
        <div className="space-y-2">
          <h2 className="ural-section-title font-serif text-2xl font-bold text-slate-900">
            {isBn ? "২. তালিকার বাকি অংশ — এবং কেন সেটি বিভ্রান্তিকর" : "2. The rest of the list \u2014 and why it misleads"}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            {isBn
              ? "নিচের দেশগুলোতে বাংলাদেশি পাসপোর্টে আগে থেকে ভিসা লাগে না। কিন্তু ঢাকা থেকে সেখানে পৌঁছাতে সাধারণত আমেরিকা, ব্রিটেন, ইউরোপ বা উপসাগরীয় দেশ দিয়ে ট্রানজিট করতে হয় — আর সেই ট্রানজিটের জন্যই বাংলাদেশিদের ভিসা লাগে। ট্রানজিট যদি বৈধ না হয়, তবে গন্তব্য ভিসা-মুক্ত হওয়া কোনো কাজে আসে না।"
              : "These destinations require no visa in advance for a Bangladeshi passport. But getting to them from Dhaka almost always means transiting the United States, the United Kingdom, Europe or the Gulf \u2014 and a Bangladeshi passport holder needs a visa for those transit countries. A visa-free destination you cannot legally reach is not visa-free in any useful sense."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
              {isBn ? "সম্পূর্ণ ভিসা-মুক্ত" : "Visa-free entry"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {isBn ? "প্রায় সবই ক্যারিবিয়ান ও প্রশান্ত মহাসাগরীয় দ্বীপ" : "Almost entirely Caribbean and Pacific islands"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {REMOTE_VISA_FREE.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-bg-subtle px-2.5 py-1 font-sans text-xs font-medium text-slate-700"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
              {isBn ? "অন-অ্যারাইভাল ভিসা" : "Visa on arrival"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {isBn ? "ভিসা এয়ারপোর্টেই, তবে পৌঁছানোই আসল প্রশ্ন" : "Issued at the airport \u2014 but getting there is the real question"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {REMOTE_VOA.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-bg-subtle px-2.5 py-1 font-sans text-xs font-medium text-slate-700"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 3. Commonly misread ──────────────────────────────────────────── */}
      <section id="misread" className="scroll-mt-24 space-y-5">
        <div className="space-y-2">
          <h2 className="ural-section-title font-serif text-2xl font-bold text-slate-900">
            {isBn
              ? "৩. যেগুলো সহজ ভাবা হয়, কিন্তু সহজ নয়"
              : "3. The ones people assume are easy \u2014 and aren't"}
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            {isBn
              ? "এই অংশটিই সবচেয়ে বেশি কাজে দেয়। বাংলাদেশি পাসপোর্টে এই গন্তব্যগুলোতে আগে থেকে ভিসা ছাড়া ওঠা যায় না — কিন্তু ধরে নেওয়া হয় যায়।"
              : "This is the part worth reading twice. None of these will admit an ordinary Bangladeshi passport without a visa arranged first \u2014 and all of them are commonly assumed to."}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {COMMONLY_MISREAD.map((entry, index) => (
            <div
              key={entry.country}
              className={`p-5 ${index > 0 ? "border-t border-slate-200" : ""}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
                  <span aria-hidden="true" className="mr-1.5">
                    {entry.flag}
                  </span>
                  {entry.country}
                </h3>
                <EntryBadge entry={entry.entry} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{entry.note}</p>
              {entry.caveat ? (
                <p className="mt-2 text-sm leading-relaxed text-[#8A5A00]">{entry.caveat}</p>
              ) : null}
              <p className="mt-3 font-mono text-xs text-slate-500">
                {entry.cost} · {entry.maxStay}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Always carry ──────────────────────────────────────────────── */}
      <section id="carry" className="scroll-mt-24 space-y-5">
        <h2 className="ural-section-title font-serif text-2xl font-bold text-slate-900">
          {isBn ? "৪. গন্তব্য যেটিই হোক, সঙ্গে রাখুন" : "4. Whatever the destination, carry these"}
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ALWAYS_CARRY.map((row) => (
            <li key={row.item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-700" />
              <div>
                <p className="font-sans text-sm font-bold text-slate-900">{row.item}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{row.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 5. FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-24 space-y-4">
        <h2 className="ural-section-title font-serif text-2xl font-bold text-slate-900">
          {isBn ? "৫. সাধারণ প্রশ্ন" : "5. Common questions"}
        </h2>
        <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {VISA_FREE_FAQS.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]">
                <h3 className="ural-card-title font-serif text-base font-bold text-slate-900">
                  {faq.question}
                </h3>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-slate-400 transition-transform group-open:rotate-90"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Verification note ────────────────────────────────────────────── */}
      <aside className="rounded-2xl bg-bg-subtle p-5 ring-1 ring-brand-navy/[0.07]">
        <p className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy">
          {isBn ? "যাচাই ও দায়বদ্ধতা" : "How this list was verified"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {isBn
            ? "এই পাতার প্রতিটি নিয়ম বিভিন্ন সূত্র মিলিয়ে যাচাই করা হয়েছে — সংশ্লিষ্ট দেশের ইমিগ্রেশন কর্তৃপক্ষ, দূতাবাসের নির্দেশনা এবং আন্তর্জাতিক পাসপোর্ট সূচক। ভিসা নিয়ম প্রায়ই বদলায় এবং আগে জানানো হয় না, তাই টিকিট বা হোটেল অফেরতযোগ্য করে বুক করার আগে সংশ্লিষ্ট দেশের ইমিগ্রেশন ওয়েবসাইট বা ঢাকার দূতাবাসে সর্বশেষ তথ্য যাচাই করে নিন। URAL কোনো ভিসা আবেদন প্রক্রিয়া করে না বা ভিসা দেয় না।"
            : "Every rule on this page was cross-checked against the destination's immigration authority, embassy guidance and international passport indexing. Visa rules change often and rarely with notice, so confirm the current requirement on the destination's own immigration site or at its embassy in Dhaka before you book anything non-refundable. URAL does not process visa applications or issue visas."}
        </p>
      </aside>
    </div>
  );
}
