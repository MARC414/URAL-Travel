import type { MouseEvent } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  CircleSlash,
  Globe2,
  Info,
  Landmark,
  ListChecks,
  Quote,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import {
  EVISAS_DISCLOSURE,
  EVISAS_WIDGET_PRIVACY,
  evisasDestinationUrl,
} from "../data/evisaProgram";
import {
  VISA_ASSISTANCE_COPY,
  VISA_ASSISTANCE_SNAPSHOT,
  type VisaAssistanceLocale,
} from "../utils/visaAssistanceCopy";

/**
 * `/visa-assistance` — the crawlable half is renderVisaAssistanceStaticHtml
 * (visaAssistancePage.ts); both halves read VISA_ASSISTANCE_COPY, so wording
 * cannot drift.
 *
 * The apply link and the checker note come from the eVisas programme module,
 * which is what pauses them when the programme is paused.
 */

interface VisaAssistancePageProps {
  lang: "en" | "bn";
  onNavigate: (path: string) => void;
}

const SOURCES: readonly { id: string; label: { en: string; bn: string }; url: string }[] = [
  {
    id: "about",
    label: { en: "eVisas — About us", bn: "eVisas — About us" },
    url: "https://evisas.com/about-us",
  },
  {
    id: "terms",
    label: {
      en: "eVisas — Terms & Conditions (\"About eVisas\", fees, refunds)",
      bn: "eVisas — Terms & Conditions (\"About eVisas\", ফি ও রিফান্ড)",
    },
    url: "https://evisas.com/terms-and-conditions",
  },
  {
    id: "faq",
    label: { en: "eVisas — FAQ", bn: "eVisas — FAQ" },
    url: "https://evisas.com/faq",
  },
];

export default function VisaAssistancePage({ lang, onNavigate }: VisaAssistancePageProps) {
  const locale: VisaAssistanceLocale = lang === "bn" ? "bn" : "en";
  const isBn = locale === "bn";
  const copy = VISA_ASSISTANCE_COPY[locale];
  const applyHref = evisasDestinationUrl();
  const privacy = EVISAS_WIDGET_PRIVACY[locale];
  const local = (path: string) => (isBn ? `/bn${path}` : path);

  const go = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(local(path));
  };

  return (
    <div className="ural-route-stack animate-fade-in font-sans max-w-4xl mx-auto px-6 sm:px-0">
      {/* Page Header */}
      <header className="bg-brand-navy rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <span className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-widest">
          <Stamp className="w-3.5 h-3.5" aria-hidden="true" strokeWidth={2.2} />
          {copy.eyebrow}
        </span>
        <h1 className="ural-page-title text-3xl sm:text-4xl font-bold text-white font-serif leading-tight">
          {copy.h1}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {copy.intro}
        </p>
      </header>

      {/* Quick answer */}
      <div className="ural-panel bg-white border border-border-subtle p-5 sm:p-6 flex gap-3">
        <Info
          className="w-5 h-5 text-brand-navy shrink-0 mt-0.5"
          aria-hidden="true"
          strokeWidth={1.9}
        />
        <div className="space-y-1">
          <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">
            {copy.quickAnswerHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{copy.quickAnswer}</p>
        </div>
      </div>

      {/* Relationship */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.relationshipHeading}
        </h2>
        <ul className="space-y-2">
          {copy.relationshipPoints.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
              <ShieldCheck
                className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"
                aria-hidden="true"
                strokeWidth={1.9}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.howHeading}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{copy.howIntro}</p>
        <ol className="space-y-2">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="ural-card bg-white border border-border-subtle p-4 flex gap-3">
              <span
                className="w-6 h-6 rounded-full bg-brand-navy text-brand-gold text-[11px] font-bold tabular-nums flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="space-y-0.5">
                <h3 className="ural-card-title font-serif text-sm font-bold text-brand-navy">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Who eVisas is */}
      <section className="ural-panel bg-slate-50 border border-border-subtle p-5 sm:p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">
          {copy.whoHeading}
        </h2>
        {copy.whoParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-slate-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
        <p className="text-sm text-slate-600 leading-relaxed pt-1">{copy.whoQuoteLead}</p>
        <blockquote className="ural-card bg-white border border-border-subtle p-4 flex gap-3">
          <Quote className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" aria-hidden="true" strokeWidth={1.9} />
          <p className="text-sm text-slate-700 leading-relaxed italic">{copy.whoQuote}</p>
        </blockquote>
        <p className="text-xs text-slate-500">{copy.whoChecked}</p>
      </section>

      {/* Destinations and passports */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy flex items-center gap-2">
          <Globe2 className="w-5 h-5 shrink-0" aria-hidden="true" strokeWidth={1.9} />
          {copy.destinationsHeading}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{copy.destinationsIntro}</p>
        <div className="ural-panel bg-white border border-border-subtle p-5 space-y-2">
          <p className="text-sm text-slate-600 leading-relaxed">{copy.destinationsSnapshotLead}</p>
          <p className="text-sm font-semibold text-brand-navy leading-relaxed">
            {VISA_ASSISTANCE_SNAPSHOT.destinations}.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">{copy.destinationsNote}</p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{copy.conditionalLead}</p>
        <p className="text-sm font-semibold text-brand-navy leading-relaxed">
          {VISA_ASSISTANCE_SNAPSHOT.conditional}.
        </p>
        <a
          href={local("/visa")}
          onClick={go("/visa")}
          className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink cursor-pointer"
        >
          {copy.destinationsLinkLabel} →
        </a>
      </section>

      {/* Official portal first */}
      <section className="space-y-2">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy flex items-center gap-2">
          <Landmark className="w-5 h-5 shrink-0" aria-hidden="true" strokeWidth={1.9} />
          {copy.officialFirstHeading}
        </h2>
        <ul className="space-y-2">
          {copy.officialFirstPoints.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
              <ListChecks
                className="w-4 h-4 text-brand-navy shrink-0 mt-0.5"
                aria-hidden="true"
                strokeWidth={1.9}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <a
          href={local("/resources")}
          onClick={go("/resources")}
          className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink cursor-pointer"
        >
          {copy.officialFirstLinkLabel} →
        </a>
      </section>

      {/* What URAL does not do */}
      <section className="ural-panel bg-white border border-border-subtle p-5 sm:p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy flex items-center gap-2">
          <CircleSlash className="w-5 h-5 shrink-0" aria-hidden="true" strokeWidth={1.9} />
          {copy.notHeading}
        </h2>
        <ul className="space-y-2">
          {copy.notPoints.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-slate-600 leading-relaxed">
              <span className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true">
                •
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Apply */}
      {applyHref && (
        <section className="bg-brand-navy rounded-2xl p-5 sm:p-6 space-y-3">
          <h2 className="ural-section-title text-white font-serif text-lg font-bold">
            {copy.applyHeading}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">{copy.applyBody}</p>
          <a
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-bold text-sm px-5 py-3 transition-colors"
          >
            {copy.applyLinkLabel}
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" strokeWidth={2.4} />
          </a>
          <p className="text-xs text-slate-400 leading-relaxed">
            {EVISAS_DISCLOSURE[locale]}
          </p>
        </section>
      )}

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="ural-section-title font-serif text-xl font-bold text-brand-navy">
          {copy.faqHeading}
        </h2>
        <div className="space-y-2">
          {copy.faqs.map((faq) => (
            <div key={faq.id} className="ural-card bg-white border border-border-subtle p-4 space-y-1">
              <h3 className="ural-card-title font-serif text-sm font-bold text-brand-navy">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Optional checker */}
      <section className="ural-panel bg-slate-50 border border-border-subtle p-5 sm:p-6 space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy">
          {privacy.heading}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">{privacy.body}</p>
        <a
          href="https://evisas.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs font-semibold text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink"
        >
          {privacy.link}
        </a>
      </section>

      {/* Sources */}
      <section className="space-y-2">
        <h2 className="ural-section-title font-serif text-lg font-bold text-brand-navy flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 shrink-0" aria-hidden="true" strokeWidth={1.9} />
          {copy.sourcesHeading}
        </h2>
        <ul className="space-y-1">
          {SOURCES.map((source) => (
            <li key={source.id}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-navy underline underline-offset-2 hover:text-brand-gold-ink"
              >
                {source.label[locale]}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">{copy.footerNote}</p>
      </section>
    </div>
  );
}