import React, { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, ExternalLink, Landmark, Search, X } from "lucide-react";

import {
  OFFICIAL_SOURCE_COUNTRIES,
  OFFICIAL_SOURCE_KINDS,
  countOfficialOrganisations,
  getOfficialSources,
  groupOfficialSources,
  type OfficialOrganisation,
  type OfficialSourceCountry,
  type OfficialSourceEntry,
  type OfficialSourceKind,
} from "../data/officialSources";
import type { Language } from "../translations";
import { toBengaliPath } from "../utils/localeRoutes";
import {
  OFFICIAL_RESOURCES_COPY,
  OFFICIAL_RESOURCES_VISIBLE_LINKS,
  fillResourceCopy,
  formatResourceCount,
  officialSourceSectionId,
} from "../utils/officialResourcesCopy";
import { QuickAnswer } from "./QuickAnswer";

interface OfficialResourcesPageProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

/** Emerald carries "verified authority" in this design system; gold-light is the standard badge. */
const KIND_TONE: Record<OfficialSourceKind, string> = {
  government: "bg-emerald-50 text-emerald-900 ring-emerald-600/20",
  press: "bg-slate-100 text-slate-700 ring-slate-400/30",
  international: "bg-emerald-50 text-emerald-900 ring-emerald-600/20",
  portal: "bg-brand-gold-light text-brand-gold-ink ring-brand-gold-dark/30",
  operator: "bg-slate-100 text-slate-700 ring-slate-400/30",
};

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald";

const FIELD_CLASS = `h-12 w-full rounded-lg border border-border-default bg-white px-3 text-sm text-brand-navy ${FOCUS_RING}`;

/**
 * `/resources` — the categorised directory of official websites URAL cites.
 *
 * Reading order follows DESIGN.md's "read first": what the list is, the tool to
 * narrow it, then topic → country → organisation → page. Data and wording are
 * shared with the prerendered body (`officialSourcesPage.ts`).
 */
export default function OfficialResourcesPage({ lang, onNavigate }: OfficialResourcesPageProps) {
  const locale = lang === "bn" ? "bn" : "en";
  const isBn = locale === "bn";
  const copy = OFFICIAL_RESOURCES_COPY[locale];
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<OfficialSourceCountry | "all">("all");
  const [kind, setKind] = useState<OfficialSourceKind | "all">("all");

  const allSources = useMemo(() => getOfficialSources(), []);
  const organisationById = useMemo(() => {
    const map = new Map<string, OfficialOrganisation>();
    for (const group of groupOfficialSources(allSources)) {
      for (const block of group.countries) {
        for (const item of block.organisations) map.set(item.organisation.id, item.organisation);
      }
    }
    return map;
  }, [allSources]);
  const countriesInUse = useMemo(
    () =>
      (Object.keys(OFFICIAL_SOURCE_COUNTRIES) as OfficialSourceCountry[]).filter((code) =>
        allSources.some((source) => source.country === code)
      ),
    [allSources]
  );
  const kindsInUse = useMemo(
    () =>
      (Object.keys(OFFICIAL_SOURCE_KINDS) as OfficialSourceKind[]).filter((value) =>
        [...organisationById.values()].some((organisation) => organisation.kind === value)
      ),
    [organisationById]
  );

  const isFiltered = query.trim() !== "" || country !== "all" || kind !== "all";

  const filtered = useMemo(() => {
    const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return allSources.filter((source) => {
      if (country !== "all" && source.country !== country) return false;
      const organisation = organisationById.get(source.org);
      if (kind !== "all" && organisation?.kind !== kind) return false;
      if (words.length === 0) return true;
      const countryLabels = OFFICIAL_SOURCE_COUNTRIES[source.country];
      const haystack = [
        organisation?.en,
        organisation?.bn,
        source.titleEn,
        source.titleBn,
        source.host,
        countryLabels.en,
        countryLabels.bn,
        ...countryLabels.aliases,
      ]
        .join(" ")
        .toLocaleLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [allSources, country, kind, organisationById, query]);

  const groups = useMemo(() => groupOfficialSources(filtered), [filtered]);
  const count = (value: number) => formatResourceCount(value, locale);
  const localPath = (path: string) => (isBn ? toBengaliPath(path) : path);
  // Bengali has no capitals, and letter-spacing breaks its conjuncts.
  const labelCase = isBn ? "" : "uppercase tracking-[0.12em]";
  // JetBrains Mono has no Bengali digits; Bengali counts use the body face.
  const numberFont = isBn ? "font-sans" : "font-mono";

  const followInternalLink = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(path);
  };

  const clearFilters = () => {
    setQuery("");
    setCountry("all");
    setKind("all");
  };

  const renderLink = (source: OfficialSourceEntry) => (
    <li
      key={source.url}
      className="flex items-center justify-between gap-3 border-t border-border-faint first:border-t-0 sm:gap-4"
    >
      <div className="min-w-0 flex-1">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex min-h-11 max-w-full items-center gap-1.5 rounded-md py-2 text-sm font-semibold leading-snug text-brand-navy underline decoration-border-default underline-offset-4 transition-colors hover:text-brand-emerald hover:decoration-brand-gold active:text-brand-emerald ${FOCUS_RING}`}
        >
          <span className="min-w-0 [overflow-wrap:anywhere]">{isBn ? source.titleBn : source.titleEn}</span>
          <ExternalLink className="size-3.5 shrink-0 text-text-muted group-hover:text-brand-emerald" aria-hidden="true" />
          <span className="sr-only">({copy.opensNewTab})</span>
        </a>
        {source.historical && (
          <p className="-mt-1 pb-2">
            <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 ring-1 ring-slate-400/30">
              {copy.historical}
            </span>
          </p>
        )}
      </div>
      <a
        href={localPath(source.pages[0])}
        onClick={(event) => followInternalLink(event, source.pages[0])}
        aria-label={`${copy.guideLinkLabel}: ${isBn ? source.titleBn : source.titleEn}`}
        className={`inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap rounded-md text-xs font-semibold text-brand-emerald underline-offset-4 hover:underline active:text-brand-navy ${FOCUS_RING}`}
      >
        {copy.guideLink}
        <ArrowRight className="size-3" aria-hidden="true" />
      </a>
    </li>
  );

  return (
    <div className="ural-route-stack mx-auto max-w-5xl">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header data-resources-header className="ural-panel overflow-hidden border border-white/[0.08] bg-brand-navy p-6 text-white sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12 lg:p-10">
        {/* Flex gap, not margins: the critical shell resets heading margins. */}
        <div className="flex flex-col items-start gap-4">
          <p
            className={`inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/15 px-3 py-1.5 text-xs font-semibold text-brand-gold ${labelCase}`}
          >
            <Landmark className="size-3.5" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h1
            className={`ural-page-title max-w-[24ch] text-white ${isBn ? "!leading-[1.45] !tracking-normal" : ""}`}
          >
            {copy.h1}
          </h1>
          <p className="max-w-[60ch] text-sm leading-relaxed text-white/80 sm:text-base">{copy.intro}</p>
        </div>
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/[0.12] pt-5 lg:mt-0 lg:grid-cols-1 lg:gap-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          {[
            [allSources.length, copy.statLinks],
            [countOfficialOrganisations(allSources), copy.statOrganisations],
            [countriesInUse.length, copy.statCountries],
          ].map(([value, label]) => (
            <div key={String(label)} className="flex flex-col-reverse gap-1 lg:flex-row-reverse lg:items-baseline lg:justify-end lg:gap-3">
              <dt className="text-xs leading-snug text-white/75 lg:text-sm">{label}</dt>
              <dd className={`${numberFont} text-2xl font-bold tabular-nums text-brand-gold sm:text-3xl lg:min-w-[3ch] lg:text-right`}>
                {count(Number(value))}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <QuickAnswer id="official-sources-answer" label={copy.quickLabel}>
        {copy.quickBody}
      </QuickAnswer>

      {/* ── Finder ───────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="official-sources-finder"
        className="ural-panel border border-border-subtle bg-surface-soft p-5 sm:p-6"
      >
        <h2 id="official-sources-finder" className="ural-section-title font-serif text-xl text-brand-navy sm:text-2xl">
          {copy.findTitle}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="mb-1.5 block text-xs font-semibold text-brand-navy">{copy.searchLabel}</span>
            <span className="relative block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                className={`${FIELD_CLASS} select-text pl-9 placeholder:text-text-muted`}
              />
            </span>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-brand-navy">{copy.countryLabel}</span>
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value as OfficialSourceCountry | "all")}
              className={FIELD_CLASS}
            >
              <option value="all">{copy.allCountries}</option>
              {countriesInUse.map((code) => (
                <option key={code} value={code}>
                  {OFFICIAL_SOURCE_COUNTRIES[code][locale]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-brand-navy">{copy.kindLabel}</span>
            <select
              value={kind}
              onChange={(event) => setKind(event.target.value as OfficialSourceKind | "all")}
              className={FIELD_CLASS}
            >
              <option value="all">{copy.allKinds}</option>
              {kindsInUse.map((value) => (
                <option key={value} value={value}>
                  {OFFICIAL_SOURCE_KINDS[value][locale]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm font-semibold text-brand-navy">
            {fillResourceCopy(
              copy.resultCount,
              { links: filtered.length, organisations: countOfficialOrganisations(filtered) },
              locale
            )}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={clearFilters}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-border-default bg-white px-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy active:bg-slate-100 ${FOCUS_RING}`}
            >
              <X className="size-4" aria-hidden="true" />
              {copy.clear}
            </button>
          )}
        </div>

        {groups.length > 0 && (
          <nav aria-label={copy.jumpLabel} className="mt-4 border-t border-border-subtle pt-4">
            <p className={`mb-2 text-[11px] font-bold text-text-secondary ${isBn ? "" : "uppercase tracking-[0.1em]"}`}>
              {copy.jumpLabel}
            </p>
            <ul className="flex flex-wrap gap-2">
              {groups.map((group) => (
                <li key={group.sector.id}>
                  <a
                    href={`#${officialSourceSectionId(group.sector.id)}`}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default bg-white px-3.5 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-gold active:bg-slate-100 ${FOCUS_RING}`}
                  >
                    {group.sector[locale]}
                    <span className={`${numberFont} text-[11px] font-bold tabular-nums text-text-muted`}>
                      {count(group.total)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      {groups.length === 0 && (
        <div className="ural-card border border-border-subtle bg-white p-6 text-center">
          <p className="text-sm leading-relaxed text-text-secondary">{copy.empty}</p>
          <button
            type="button"
            onClick={clearFilters}
            className={`mt-4 inline-flex min-h-12 items-center rounded-xl bg-brand-gold px-6 text-sm font-black text-brand-navy transition-colors hover:bg-brand-gold-dark active:bg-brand-gold-dark ${FOCUS_RING}`}
          >
            {copy.clear}
          </button>
        </div>
      )}

      {/* ── Topic → country → organisation → pages ──────────────────────── */}
      {groups.map((group) => (
        <section
          key={group.sector.id}
          id={officialSourceSectionId(group.sector.id)}
          aria-labelledby={`${officialSourceSectionId(group.sector.id)}-title`}
          className="scroll-mt-40 lg:scroll-mt-32"
        >
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-border-subtle pb-3">
            <h2
              id={`${officialSourceSectionId(group.sector.id)}-title`}
              className="ural-section-title font-serif text-2xl text-brand-navy sm:text-3xl"
            >
              {group.sector[locale]}
            </h2>
            <p className={`${numberFont} text-xs font-bold tabular-nums text-text-muted`}>
              {fillResourceCopy(copy.linkCount, { count: group.total }, locale)}
            </p>
          </div>

          <div className="mt-5 space-y-7">
            {group.countries.map(({ code, organisations }) => (
              <div key={code}>
                <h3 className={`text-xs font-semibold text-brand-emerald ${labelCase}`}>
                  {OFFICIAL_SOURCE_COUNTRIES[code][locale]}
                </h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {organisations.map(({ organisation, sources }) => {
                    const hosts = [...new Set(sources.map((source) => source.host))];
                    const fold = !isFiltered && sources.length > OFFICIAL_RESOURCES_VISIBLE_LINKS;
                    const visible = fold ? sources.slice(0, OFFICIAL_RESOURCES_VISIBLE_LINKS) : sources;
                    const folded = fold ? sources.slice(OFFICIAL_RESOURCES_VISIBLE_LINKS) : [];
                    return (
                      <article
                        key={organisation.id}
                        className="ural-card flex flex-col border border-border-subtle bg-white p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="ural-card-title min-w-0 text-base text-brand-navy">{organisation[locale]}</h4>
                          <span
                            className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${KIND_TONE[organisation.kind]}`}
                          >
                            {OFFICIAL_SOURCE_KINDS[organisation.kind][locale]}
                          </span>
                        </div>
                        <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-xs text-text-muted">
                          {hosts.map((host) => (
                            <span key={host} className="break-all">
                              {host}
                            </span>
                          ))}
                        </p>
                        <ul className="mt-3 border-t border-border-subtle">{visible.map(renderLink)}</ul>
                        {folded.length > 0 && (
                          <details className="group/more border-t border-border-faint">
                            <summary
                              className={`flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-md text-sm font-semibold text-brand-emerald hover:underline [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}
                            >
                              <ChevronDown
                                className="size-4 transition-transform group-open/more:rotate-180 motion-reduce:transition-none"
                                aria-hidden="true"
                              />
                              {fillResourceCopy(copy.showMore, { count: folded.length }, locale)}
                            </summary>
                            <ul className="border-t border-border-faint">{folded.map(renderLink)}</ul>
                          </details>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── Method and correction route ─────────────────────────────────── */}
      <section
        aria-labelledby="official-sources-method"
        className="ural-panel border border-border-subtle bg-white p-5 sm:p-6"
      >
        <h2 id="official-sources-method" className="ural-section-title font-serif text-2xl text-brand-navy sm:text-3xl">
          {copy.howTitle}
        </h2>
        <ul className="mt-4 max-w-[75ch] list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-text-secondary sm:text-base">
          {copy.how.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="official-sources-report"
        className="ural-panel flex flex-col gap-4 bg-brand-ivory p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <div className="max-w-[60ch]">
          <h2 id="official-sources-report" className="ural-section-title font-serif text-xl text-brand-navy sm:text-2xl">
            {copy.reportTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{copy.reportBody}</p>
        </div>
        <a
          href={localPath("/contact")}
          onClick={(event) => followInternalLink(event, "/contact")}
          className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-brand-navy bg-white px-6 text-sm font-black text-brand-navy transition-colors hover:bg-brand-navy hover:text-white active:bg-brand-navy active:text-white ${FOCUS_RING}`}
        >
          {copy.reportCta}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
