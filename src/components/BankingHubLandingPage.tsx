import React from "react";
import {
  ArrowRight,
  ExternalLink,
  Check,
  AlertTriangle,
  CreditCard,
  Banknote,
  Wallet,
  Smartphone,
  FileText,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import type { Language } from "../translations";
import {
  BANKING_CLUSTER_NODES,
  BANKING_ENDORSEMENT_STEPS,
  BANKING_HUB_CLOSING,
  BANKING_HUB_FAQS,
  BANKING_HUB_INTRO,
  BANKING_HUB_LAST_CHECKED,
  BANKING_HUB_QUICK_ANSWER,
  BANKING_HUB_REFERENCES,
  BANKING_HUB_STATS,
  BANKING_NOC_COPY,
  BANKING_PAYMENT_METHODS,
  BANKING_RELATED_HUBS,
} from "../data/bankingHubData";

interface BankingHubLandingPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

const METHOD_ICONS: Record<string, typeof CreditCard> = {
  "travel-quota-card": CreditCard,
  rfcd: Wallet,
  "bdt-desk": Smartphone,
  cash: Banknote,
};

const CHECKED_LABEL = new Intl.DateTimeFormat("en-BD", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(new Date(`${BANKING_HUB_LAST_CHECKED}T12:00:00+06:00`));

export const BankingHubLandingPage: React.FC<BankingHubLandingPageProps> = ({
  lang,
  onNavigate,
}) => {
  const isBn = lang === "bn";
  const blogHref = (slug: string) => (isBn ? "/bn/blog/" : "/blog/") + slug;

  const jumpLinks = [
    { href: "#banking-methods", label: isBn ? "১. পেমেন্টের ৪ উপায়" : "1. Four ways to pay" },
    { href: "#banking-endorsement", label: isBn ? "২. এনডোর্সমেন্টের ধাপ" : "2. Endorsement steps" },
    { href: "#banking-noc", label: isBn ? "৩. NOC আসলে কী" : "3. What NOC is" },
    { href: "#banking-guides", label: isBn ? "৪. পাঁচটি গাইড" : "4. The five guides" },
    { href: "#banking-faq", label: isBn ? "৫. সাধারণ প্রশ্ন" : "5. Questions" },
    { href: "#banking-sources", label: isBn ? "৬. তথ্যসূত্র" : "6. Sources" },
  ];

  const handleInPageClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <div className="space-y-14 sm:space-y-16 animate-fade-in">
      {/* 1. HERO ------------------------------------------------------------ */}
      <section
        aria-label={isBn ? "ব্যাংকিং ও ফরেক্স হাব" : "Banking and foreign exchange hub"}
        className="w-screen relative left-1/2 -translate-x-1/2 -mt-10 sm:-mt-12 bg-brand-navy text-white border-b border-slate-800 overflow-hidden shadow-2xl"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(900px 420px at 12% -10%, rgba(246, 183, 60, 0.16), transparent 62%), radial-gradient(700px 340px at 92% 8%, rgba(16, 185, 129, 0.12), transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-9">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-emerald-300">
            <ShieldCheck size={13} aria-hidden="true" />
            <span>
              {isBn
                ? `✓ বাংলাদেশ ব্যাংকের সার্কুলার ও ব্যাংকের শর্তের সঙ্গে মিলিয়ে দেখা (${CHECKED_LABEL})`
                : `✓ Checked against Bangladesh Bank circulars and bank terms (${CHECKED_LABEL})`}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-5">
              <h1
                className="ural-page-title font-serif text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.15]"
                style={{ textWrap: "balance" }}
              >
                {isBn ? (
                  <>
                    পাসপোর্টে ডলার এনডোর্সমেন্ট,{" "}
                    <span className="text-[#F6B73C]">ডুয়েল কারেন্সি কার্ড ও NOC</span>
                  </>
                ) : (
                  <>
                    Dollar endorsement,{" "}
                    <span className="text-[#F6B73C]">dual-currency cards and NOC</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                {isBn ? BANKING_HUB_INTRO.bn : BANKING_HUB_INTRO.en}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#banking-methods"
                  onClick={(event) => handleInPageClick(event, "#banking-methods")}
                  className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-[#F6B73C]/20 inline-flex items-center gap-2"
                >
                  <span>{isBn ? "কোন উপায় আপনার জন্য" : "Compare the four routes"}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
                <a
                  href="#banking-faq"
                  onClick={(event) => handleInPageClick(event, "#banking-faq")}
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <span>{isBn ? "সরাসরি উত্তর দেখুন" : "Jump to the direct answers"}</span>
                </a>
              </div>
            </div>

            {/* Quick-answer card */}
            <div className="lg:col-span-4 bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-3xl p-6 space-y-3">
              <div className="text-[11px] font-mono font-semibold text-[#F6B73C] uppercase tracking-wider">
                {isBn ? "সংক্ষিপ্ত উত্তর" : "Quick answer"}
              </div>
              <h2 className="font-serif text-lg font-bold text-white">
                {isBn ? "পাসপোর্টে ডলার এনডোর্সমেন্টের সীমা কত?" : "Dollar endorsement limit in a passport?"}
              </h2>
              <p className="text-xs text-slate-200 leading-relaxed">
                {isBn ? BANKING_HUB_QUICK_ANSWER.bn : BANKING_HUB_QUICK_ANSWER.en}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-3">
                {isBn
                  ? "এটি ceiling — ব্যাংক কাগজ দেখে ছাড়ে। কার্ডের অনলাইন কেনাকাটায় আলাদা USD 300-এর নিয়ম প্রযোজ্য।"
                  : "A ceiling, released by the bank against documents. The card's online-purchase rule is separate."}
              </p>
            </div>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-white/15">
            {BANKING_HUB_STATS.map((stat) => (
              <div key={stat.value}>
                <div className="text-lg sm:text-xl font-bold text-[#F6B73C] font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-300 leading-snug">
                  {isBn ? stat.labelBn : stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Jump nav */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-mono text-[#F6B73C] uppercase tracking-wider shrink-0 mr-1">
              {isBn ? "দ্রুত নেভিগেশন:" : "Jump to:"}
            </span>
            {jumpLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleInPageClick(event, item.href)}
                className="text-xs font-medium text-slate-200 hover:text-brand-navy bg-white/8 hover:bg-[#F6B73C] border border-white/12 px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FOUR PAYMENT ROUTES --------------------------------------------- */}
      <section
        id="banking-methods"
        aria-labelledby="banking-methods-heading"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn ? "পেমেন্টের চারটি পথ · একটি অন্যটির বিকল্প নয়" : "Four payment routes · none is universally cheaper"}
          </span>
          <h2
            id="banking-methods-heading"
            className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {isBn
              ? "বিদেশ ভ্রমণের টাকা কোন উপায়ে দেবেন?"
              : "How should you pay for a trip from Bangladesh?"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "আপনার হাতে কী আছে তার ওপর উপায়টি নির্ভর করে — কোনটি শুনতে সস্তা তার ওপর নয়। প্রতিটি কার্ডে নিয়ম ও যে জায়গায় সমস্যা হয়, দুটোই আলাদা করে লেখা আছে।"
              : "Pick by what you already hold, not by which sounds cheapest. Each route below states the rule it runs on and the point where it usually goes wrong."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANKING_PAYMENT_METHODS.map((method) => {
            const Icon = METHOD_ICONS[method.id] ?? CreditCard;
            return (
              <article
                key={method.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-9 h-9 rounded-xl bg-brand-navy text-[#F6B73C] flex items-center justify-center shrink-0">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <h3 className="ural-card-title font-serif text-base font-bold text-slate-900 leading-snug">
                        {isBn ? method.labelBn : method.label}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-navy bg-[#F6B73C]/20 border border-[#F6B73C]/40 rounded-full px-2.5 py-1 whitespace-nowrap">
                      {isBn ? method.badgeBn : method.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-900">
                      {isBn ? "কাদের জন্য: " : "Best for: "}
                    </span>
                    {isBn ? method.bestForBn : method.bestFor}
                  </p>

                  <div className="pt-3 border-t border-slate-200 space-y-2.5 text-xs leading-relaxed">
                    <div>
                      <span className="font-bold text-slate-900 block mb-0.5">
                        {isBn ? "যে নিয়মে চলে" : "The rule"}
                      </span>
                      <span className="text-slate-600">{isBn ? method.ruleBn : method.rule}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-900 block mb-0.5 inline-flex items-center gap-1.5">
                        <AlertTriangle size={12} aria-hidden="true" />
                        {isBn ? "যেখানে আটকায়" : "Where it snags"}
                      </span>
                      <span className="text-slate-600">{isBn ? method.watchBn : method.watch}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={blogHref(method.nodeSlug)}
                  onClick={(event) => {
                    event.preventDefault();
                    onNavigate(blogHref(method.nodeSlug));
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-navy/70 transition-colors"
                >
                  <span>{isBn ? method.nodeLabelBn : method.nodeLabel}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. ENDORSEMENT STEPS ----------------------------------------------- */}
      <section
        id="banking-endorsement"
        aria-labelledby="banking-endorsement-heading"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn ? "পাসপোর্ট এনডোর্সমেন্ট · ধাপে ধাপে" : "Passport endorsement · step by step"}
          </span>
          <h2
            id="banking-endorsement-heading"
            className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {isBn ? BANKING_ENDORSEMENT_STEPS.heading.bn : BANKING_ENDORSEMENT_STEPS.heading.en}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn ? BANKING_ENDORSEMENT_STEPS.intro.bn : BANKING_ENDORSEMENT_STEPS.intro.en}
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BANKING_ENDORSEMENT_STEPS.steps.map((step, index) => (
            <li
              key={step.title}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex gap-3.5"
            >
              <span className="w-7 h-7 rounded-lg bg-brand-navy text-[#F6B73C] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-1">
                <h3 className="ural-card-title font-serif text-sm font-bold text-slate-900">
                  {isBn ? step.titleBn : step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isBn ? step.bodyBn : step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed rounded-2xl px-4 py-3 flex items-start gap-2.5">
          <Landmark size={15} className="shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            {isBn
              ? "লাইসেন্সপ্রাপ্ত মানি চেঞ্জাররা পাসপোর্ট এনডোর্সমেন্টে প্রতি পাসপোর্টে সর্বোচ্চ BDT 300 নিতে পারে — জানুয়ারি ২০২৬-এর বাংলাদেশ ব্যাংক নির্দেশনায় এমনটাই জানিয়েছে বিএসএস। এটি চেঞ্জারের ফি; ব্যাংকের এনডোর্সমেন্ট বা সার্ভিস চার্জ আলাদা।"
              : "A licensed money changer may charge at most BDT 300 per passport for endorsement — the January 2026 Bangladesh Bank instruction as reported by BSS. That is the changer's fee; bank endorsement and service charges are separate."}
          </p>
        </div>
      </section>

      {/* 4. NOC ------------------------------------------------------------- */}
      <section
        id="banking-noc"
        aria-labelledby="banking-noc-heading"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-5 shadow-xs"
      >
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn ? "এনডোর্সমেন্টের কাগজ নয়" : "Not an endorsement document"}
          </span>
          <h2
            id="banking-noc-heading"
            className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {isBn ? BANKING_NOC_COPY.heading.bn : BANKING_NOC_COPY.heading.en}
          </h2>
        </div>

        <div className="space-y-3 text-sm text-slate-700 leading-relaxed max-w-3xl">
          {BANKING_NOC_COPY.paragraphs.map((paragraph, index) => (
            <p key={index}>{isBn ? paragraph.bn : paragraph.en}</p>
          ))}
        </div>

        <a
          href={blogHref(BANKING_NOC_COPY.linkPath.replace("/blog/", ""))}
          onClick={(event) => {
            event.preventDefault();
            onNavigate(blogHref(BANKING_NOC_COPY.linkPath.replace("/blog/", "")));
          }}
          className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <FileText size={14} aria-hidden="true" />
          <span>{isBn ? BANKING_NOC_COPY.linkLabel.bn : BANKING_NOC_COPY.linkLabel.en}</span>
          <ArrowRight size={13} aria-hidden="true" />
        </a>
      </section>

      {/* 5. CLUSTER DIRECTORY ----------------------------------------------- */}
      <section
        id="banking-guides"
        aria-labelledby="banking-guides-heading"
        className="scroll-mt-24 space-y-5"
      >
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn ? "পাঁচটি গাইড · একটি ক্রম" : "Five guides · one sequence"}
          </span>
          <h2
            id="banking-guides-heading"
            className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {isBn ? "এই ক্লাস্টারের পাঁচটি বিস্তারিত গাইড" : "The five guides in this cluster"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isBn
              ? "একটি এনডোর্সমেন্ট, একটি $300-এর সমস্যা, একটি ইসলামিক কার্ডের তুলনা, একটি কার্ডহীন BDT পথ এবং একটি ক্যাশ-বনাম-কার্ড সিদ্ধান্ত — পাঁচটি আলাদা প্রশ্ন, একই টাকার গল্প।"
              : "One endorsement, one USD 300 problem, one Islamic-card comparison, one card-free BDT route, and one cash-versus-card decision — five questions about the same money."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BANKING_CLUSTER_NODES.map((node, index) => (
            <a
              key={node.id}
              href={blogHref(node.slug)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(blogHref(node.slug));
              }}
              className={`block bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl p-5 space-y-2 transition-colors ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <span className="text-[11px] font-mono text-brand-navy font-semibold">
                {isBn ? node.kickerBn : node.kicker}
              </span>
              <h3 className="ural-card-title font-serif text-lg font-bold text-slate-900">
                {isBn ? node.titleBn : node.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn ? node.descriptionBn : node.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy pt-1">
                {isBn ? "গাইডটি খুলুন" : "Read the guide"}
                <ArrowRight size={13} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="ural-card-title font-serif text-sm font-bold text-slate-900">
            {isBn ? "এই ক্লাস্টারের বাইরে যেতে হবে যা" : "Where this cluster connects next"}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {BANKING_RELATED_HUBS.map((hub) => {
              const basePath = hub.path.split("?")[0];
              const localized = isBn ? `/bn${basePath}` : basePath;
              return (
                <li key={hub.path}>
                  <a
                    href={hub.path}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(localized + (hub.path.includes("?") ? `?${hub.path.split("?")[1]}` : ""));
                    }}
                    className="inline-flex items-center gap-1.5 font-semibold text-brand-navy hover:text-brand-navy/70"
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    {isBn ? hub.labelBn : hub.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. FAQ -------------------------------------------------------------- */}
      <section
        id="banking-faq"
        aria-labelledby="banking-faq-heading"
        className="scroll-mt-24 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 space-y-5 shadow-xs"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-5">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn ? "সংক্ষিপ্ত, সূত্রভিত্তিক উত্তর" : "Short, sourced answers"}
          </span>
          <h2
            id="banking-faq-heading"
            className="ural-section-title font-serif text-2xl sm:text-3xl font-bold text-slate-900"
          >
            {isBn
              ? "ডলার এনডোর্সমেন্ট, কার্ড ও NOC নিয়ে সাধারণ প্রশ্ন"
              : "Dollar endorsement, cards and NOC: common questions"}
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {BANKING_HUB_FAQS.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-sm font-bold text-slate-900">
                <span>{isBn ? faq.questionBn : faq.question}</span>
                <span className="text-brand-navy shrink-0 transition-transform group-open:rotate-45 text-lg leading-none">
                  +
                </span>
              </summary>
              <p className="pt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                {isBn ? faq.answerBn : faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 7. SOURCES ---------------------------------------------------------- */}
      <section
        id="banking-sources"
        aria-labelledby="banking-sources-heading"
        className="scroll-mt-24 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-brand-navy">
            {isBn
              ? `তথ্যসূত্র দেখা হয়েছে: ${CHECKED_LABEL}`
              : `References checked: ${CHECKED_LABEL}`}
          </span>
          <h2
            id="banking-sources-heading"
            className="ural-section-title font-serif text-xl font-bold text-slate-900"
          >
            {isBn ? "এই পাতার প্রাথমিক সূত্র" : "Primary sources used on this page"}
          </h2>
          <p className="text-xs text-slate-600 max-w-3xl">
            {isBn
              ? "সার্কুলার, ফি ও ব্যাংকের শর্ত বদলাতে পারে। সিদ্ধান্তের আগে নিচের সূত্রগুলো থেকে বর্তমান অবস্থা মিলিয়ে নিন। প্রতিটি লিংক এই পাতার প্রতিটি বাক্যের প্রমাণ নয়।"
              : "Circulars, fees and bank terms change. Confirm the current position on the sources below before you act. Not every link supports every sentence on this page."}
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs list-none p-0">
          {BANKING_HUB_REFERENCES.map((reference, index) => (
            <li key={reference.url}>
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full bg-white border border-slate-200 hover:border-brand-navy rounded-xl p-3 flex items-start justify-between gap-2 text-slate-700 hover:text-brand-navy transition-colors"
              >
                <span className="font-medium leading-snug">
                  <span className="font-mono text-slate-400 mr-1.5">[{index + 1}]</span>
                  {isBn ? reference.nameBn : reference.name}
                </span>
                <ExternalLink size={13} className="shrink-0 text-slate-400 mt-0.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>

        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl border-t border-slate-200 pt-4">
          {isBn ? BANKING_HUB_CLOSING.bn : BANKING_HUB_CLOSING.en}
        </p>

        <div className="flex items-start gap-2 text-[11px] text-slate-500">
          <Check size={13} className="shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
          <span>
            {isBn
              ? "URAL টিকিট বিক্রি করে না এবং ভিসা প্রসেস করে না। এই পাতাটি তথ্য দেয়, অনুমোদনের নিশ্চয়তা দেয় না।"
              : "URAL does not sell tickets or process visas. This page explains the rules; it does not promise an approval."}
          </span>
        </div>
      </section>
    </div>
  );
};
