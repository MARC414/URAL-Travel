import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Landmark, Search, X } from "lucide-react";

import { GLOSSARY_GROUPS, GLOSSARY_TERMS, glossaryTermsByGroup, type GlossaryGroupId, type GlossaryTerm } from "../data/glossary";
import type { Language } from "../translations";
import { GLOSSARY_COPY, formatGlossaryCount, glossaryGroupSectionId, glossaryTermAnchor } from "../utils/glossaryCopy";
import { toBengaliPath } from "../utils/localeRoutes";
import { OFFICIAL_RESOURCES_PATH } from "../utils/officialResourcesMeta";

interface GlossaryPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald";

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * `/glossary` — plain meanings of the Hajj, Umrah, visa, banking and flight
 * words used across URAL. Each term carries both language names, its other
 * spellings, the URAL guide and the official page. Data and wording are shared
 * with the prerendered body (`glossaryPage.ts`).
 */
export default function GlossaryPage({ lang, onNavigate }: GlossaryPageProps) {
  const locale = lang === "bn" ? "bn" : "en";
  const isBn = locale === "bn";
  const copy = GLOSSARY_COPY[locale];
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<GlossaryGroupId | "all">("all");

  const count = (value: number) => formatGlossaryCount(value, locale);
  const localPath = (path: string) => (isBn ? toBengaliPath(path) : path);
  // JetBrains Mono has no Bengali digits; Bengali counts use the body face.
  const numberFont = isBn ? "font-sans" : "font-mono";

  const groups = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches = (term: GlossaryTerm) => {
      if (words.length === 0) return true;
      const haystack = [term.en, term.bn, ...(term.aka ?? []), isBn ? term.defBn : term.defEn]
        .join(" ")
        .toLocaleLowerCase();
      return words.every((word) => haystack.includes(word));
    };
    return GLOSSARY_GROUPS.filter((group) => topic === "all" || group.id === topic)
      .map((group) => ({ group, terms: glossaryTermsByGroup(group.id, locale).filter(matches) }))
      .filter((entry) => entry.terms.length > 0);
  }, [isBn, query, topic]);
  const shown = groups.reduce((total, entry) => total + entry.terms.length, 0);

  // A link such as /glossary#term-miqat lands on that term once the list exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const followInternalLink = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(path);
  };

  const renderTerm = (term: GlossaryTerm) => {
    const primary = isBn ? term.bn : term.en;
    const secondary = isBn ? term.en : term.bn;
    return (
      <article
        key={term.id}
        id={glossaryTermAnchor(term.id)}
        className="ural-card flex scroll-mt-40 flex-col bg-white p-5 target:ring-2 target:ring-brand-gold-dark lg:scroll-mt-32"
      >
        <h3 className="ural-card-title flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-lg text-brand-navy">
          {primary}
          {secondary !== primary && (
            <span lang={isBn ? "en" : "bn"} className="text-sm font-semibold text-brand-emerald">
              {secondary}
            </span>
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[15px]">{isBn ? term.defBn : term.defEn}</p>
        {term.aka && term.aka.length > 0 && (
          <p className="mt-2 text-xs text-text-muted">
            {copy.alsoWritten}: {term.aka.join(" · ")}
          </p>
        )}
        {(term.guide || term.source) && (
          <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-2">
            {term.guide && (
              <a
                href={localPath(term.guide)}
                onClick={(event) => followInternalLink(event, term.guide as string)}
                aria-label={`${copy.guideLink}: ${primary}`}
                className={`inline-flex min-h-11 items-center gap-1 rounded-md text-xs font-semibold text-brand-emerald underline-offset-4 hover:underline ${FOCUS_RING}`}
              >
                {copy.guideLink}
                <ArrowRight className="size-3" aria-hidden="true" />
              </a>
            )}
            {term.source && (
              <a
                href={term.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.sourceLink}: ${primary} (${copy.opensNewTab})`}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-md text-xs font-semibold text-brand-navy underline-offset-4 hover:underline ${FOCUS_RING}`}
              >
                <Landmark className="size-3.5 text-brand-gold-ink" aria-hidden="true" />
                {hostOf(term.source)}
                <ExternalLink className="size-3 text-text-muted" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="ural-route-stack mx-auto max-w-5xl">
      <header
        data-glossary-header
        className="ural-panel overflow-hidden bg-brand-navy p-6 text-white sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:p-10"
      >
        {/* Flex gap, not margins: the critical shell resets heading margins. */}
        <div className="flex flex-col items-start gap-4">
          <h1 className={`ural-page-title max-w-[24ch] text-white ${isBn ? "!leading-[1.45] !tracking-normal" : ""}`}>
            {copy.h1}
          </h1>
          <p className="max-w-[60ch] text-sm leading-relaxed text-white/80 sm:text-base">{copy.intro}</p>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.12] pt-5 lg:mt-0 lg:grid-cols-1 lg:gap-5 lg:pt-0">
          {[
            [GLOSSARY_TERMS.length, copy.statTerms],
            [GLOSSARY_GROUPS.length, copy.statTopics],
          ].map(([value, label]) => (
            <div
              key={String(label)}
              className="flex flex-col-reverse gap-1 lg:flex-row-reverse lg:items-baseline lg:justify-end lg:gap-3"
            >
              <dt className="text-xs leading-snug text-white/75 lg:text-sm">{label}</dt>
              <dd className={`${numberFont} text-2xl font-bold tabular-nums text-brand-gold sm:text-3xl lg:min-w-[3ch] lg:text-right`}>
                {count(Number(value))}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ── Finder: one search box, one row of topics ────────────────────── */}
      <section aria-label={copy.searchLabel} className="ural-panel bg-surface-soft p-5 sm:p-6">
        <label className="block">
          <span className="sr-only">{copy.searchLabel}</span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className={`h-14 w-full select-text rounded-xl bg-white pl-12 pr-4 text-base text-brand-navy placeholder:text-text-muted ${FOCUS_RING}`}
            />
          </span>
        </label>
        <div role="group" aria-label={copy.topicsLabel} className="mt-4 flex flex-wrap gap-2">
          {[{ id: "all" as const, label: copy.allTopics, total: GLOSSARY_TERMS.length }, ...GLOSSARY_GROUPS.map((group) => ({
            id: group.id,
            label: group[locale],
            total: glossaryTermsByGroup(group.id).length,
          }))].map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={topic === option.id}
              onClick={() => setTopic(option.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 text-xs font-semibold transition-colors ${FOCUS_RING} ${topic === option.id ? "bg-brand-navy text-white" : "bg-white text-brand-navy hover:bg-brand-ivory"}`}
            >
              {option.label}
              <span
                className={`${numberFont} text-[11px] font-bold tabular-nums ${topic === option.id ? "text-brand-gold" : "text-text-muted"}`}
              >
                {count(option.total)}
              </span>
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="sr-only">
          {copy.resultCount.replace("{count}", count(shown))}
        </p>
      </section>

      {groups.length === 0 && (
        <div className="ural-card bg-white p-6 text-center">
          <p className="text-sm leading-relaxed text-text-secondary">{copy.empty}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTopic("all");
            }}
            className={`mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-gold px-6 text-sm font-black text-brand-navy transition-colors hover:bg-brand-gold-dark active:bg-brand-gold-dark ${FOCUS_RING}`}
          >
            <X className="size-4" aria-hidden="true" />
            {copy.clear}
          </button>
        </div>
      )}

      {groups.map(({ group, terms }) => (
        <section
          key={group.id}
          id={glossaryGroupSectionId(group.id)}
          aria-labelledby={`${glossaryGroupSectionId(group.id)}-title`}
          className="scroll-mt-40 lg:scroll-mt-32"
        >
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 pb-1">
            <h2
              id={`${glossaryGroupSectionId(group.id)}-title`}
              className="ural-section-title font-serif text-2xl text-brand-navy sm:text-3xl"
            >
              {group[locale]}
            </h2>
            <p className={`${numberFont} text-xs font-bold tabular-nums text-text-muted`}>
              {copy.resultCount.replace("{count}", count(terms.length))}
            </p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">{terms.map(renderTerm)}</div>
        </section>
      ))}

      <section className="ural-panel flex flex-col gap-4 bg-brand-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-[62ch] text-sm leading-relaxed text-text-secondary">{copy.note}</p>
        <a
          href={localPath(OFFICIAL_RESOURCES_PATH)}
          onClick={(event) => followInternalLink(event, OFFICIAL_RESOURCES_PATH)}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-navy px-6 text-sm font-bold text-white transition-colors hover:bg-brand-emerald active:bg-brand-emerald ${FOCUS_RING}`}
        >
          <Landmark className="size-4" aria-hidden="true" />
          {copy.resourcesCta}
        </a>
      </section>
    </div>
  );
}
