import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Download, ExternalLink, FileDown, FileText, Landmark, Search, X } from "lucide-react";

import {
  OFFICIAL_AUDIENCES,
  UK_PILGRIM_JOURNEY,
  URAL_DOWNLOADS,
  audienceIncludesCountry,
  resolveGuideDownloads,
  resolveJourney,
  type OfficialAudience,
} from "../data/officialJourneys";
import {
  OFFICIAL_HOSTS,
  OFFICIAL_SOURCE_COUNTRIES,
  OFFICIAL_SOURCE_KINDS,
  countOfficialOrganisations,
  getCommunitySources,
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
  OFFICIAL_COMMUNITY_SECTION_ID,
  OFFICIAL_DOWNLOADS_SECTION_ID,
  OFFICIAL_RESOURCES_COPY,
  OFFICIAL_RESOURCES_VISIBLE_LINKS,
  fillResourceCopy,
  formatResourceCount,
  formatResourceDate,
  officialSourceMeta,
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
  community: "bg-white text-slate-700 ring-slate-400/40",
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
  const [audience, setAudience] = useState<OfficialAudience>("all");
  /** Id of the section being sent to the printer; null when nothing is printing. */
  const [printTarget, setPrintTarget] = useState<string | null>(null);
  const pendingStep = useRef<string | null>(null);

  const allSources = useMemo(() => getOfficialSources(), []);
  const communitySources = useMemo(() => getCommunitySources(), []);
  const journey = useMemo(() => resolveJourney(UK_PILGRIM_JOURNEY, allSources), [allSources]);
  const guideDownloads = useMemo(() => resolveGuideDownloads(allSources), [allSources]);

  // A link to /resources#uk-hajj-umrah opens with the UK journey unfolded.
  useEffect(() => {
    if (window.location.hash === `#${UK_PILGRIM_JOURNEY.id}`) setAudience("uk");
  }, []);

  // After the journey unfolds, bring the step the visitor chose into view.
  useEffect(() => {
    if (audience !== "uk" || !pendingStep.current) return;
    document.getElementById(pendingStep.current)?.scrollIntoView({ block: "start" });
    pendingStep.current = null;
  }, [audience]);

  // "Save as PDF": print one section. The print stylesheet hides everything
  // outside the element that carries `data-print-target`.
  useEffect(() => {
    if (!printTarget) return;
    const done = () => setPrintTarget(null);
    document.body.classList.add("ural-print-target");
    window.addEventListener("afterprint", done);
    const frame = window.requestAnimationFrame(() => window.print());
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("afterprint", done);
      document.body.classList.remove("ural-print-target");
    };
  }, [printTarget]);
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
  const countryChoices = countriesInUse.filter((code) => audienceIncludesCountry(audience, code));
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
      if (!audienceIncludesCountry(audience, source.country)) return false;
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
  }, [allSources, audience, country, kind, organisationById, query]);

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

  const chooseAudience = (value: OfficialAudience) => {
    setAudience(value);
    // The country list changes with the starting point, so a stale choice is dropped.
    setCountry("all");
  };

  const openJourney = (stepId?: string) => {
    pendingStep.current = stepId ?? null;
    chooseAudience("uk");
  };

  const printHeader = (title: string) => {
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    return (
      <p data-print-only className="mb-3 text-sm text-black">
        <strong>URAL Travel · {title}</strong>
        <br />
        {copy.printedFrom.replace("{date}", formatResourceDate(iso, locale))}
      </p>
    );
  };

  const pdfButton = (target: string, title: string, onDark = false) => (
    <button
      type="button"
      data-print-hide
      onClick={() => setPrintTarget(target)}
      aria-label={`${copy.savePdfLabel}: ${title}`}
      className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-1 text-xs font-semibold underline-offset-4 hover:underline ${onDark ? "text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold" : `text-brand-emerald ${FOCUS_RING}`}`}
    >
      <FileDown className="size-4" aria-hidden="true" />
      {copy.savePdf}
    </button>
  );

  const clearFilters = () => {
    setQuery("");
    setCountry("all");
    setKind("all");
  };

  const renderLink = (source: OfficialSourceEntry) => {
    const meta = officialSourceMeta(source, locale);
    return (
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
        {meta.length > 0 && (
          <p className={`-mt-1 pb-2 text-xs text-text-muted ${isBn ? "font-sans" : ""}`}>{meta.join(" · ")}</p>
        )}
      </div>
      {source.pages.length > 0 && (
        <a
          href={localPath(source.pages[0])}
          onClick={(event) => followInternalLink(event, source.pages[0])}
          aria-label={`${copy.guideLinkLabel}: ${isBn ? source.titleBn : source.titleEn}`}
          data-print-hide
          className={`inline-flex min-h-11 shrink-0 items-center gap-1 whitespace-nowrap rounded-md text-xs font-semibold text-brand-emerald underline-offset-4 hover:underline active:text-brand-navy ${FOCUS_RING}`}
        >
          {copy.guideLink}
          <ArrowRight className="size-3" aria-hidden="true" />
        </a>
      )}
    </li>
    );
  };

  const renderCard = (organisation: OfficialOrganisation, sources: OfficialSourceEntry[], printing = false) => {
    const hosts = [...new Set(sources.map((source) => source.host))];
    const fold = !isFiltered && !printing && sources.length > OFFICIAL_RESOURCES_VISIBLE_LINKS;
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
          {host}{" "}
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
  };

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

      {/* ── Starting point: the whole page adapts to it ──────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p id="official-sources-audience" className={`text-xs font-semibold text-text-secondary ${labelCase}`}>
          {copy.audienceLabel}
        </p>
        <div
          role="group"
          aria-labelledby="official-sources-audience"
          className="inline-flex max-w-full rounded-full border border-border-default bg-white p-1"
        >
          {(Object.keys(OFFICIAL_AUDIENCES) as OfficialAudience[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={audience === value}
              onClick={() => chooseAudience(value)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${FOCUS_RING} ${audience === value ? "bg-brand-navy text-white" : "text-brand-navy hover:bg-surface-soft"}`}
            >
              {OFFICIAL_AUDIENCES[value][locale]}
            </button>
          ))}
        </div>
      </div>

      {/* ── UK Hajj and Umrah: the official page for each step of the trip ── */}
      {audience !== "bd" && (
        <section
          id={UK_PILGRIM_JOURNEY.id}
          data-journey={UK_PILGRIM_JOURNEY.id}
          aria-labelledby={`${UK_PILGRIM_JOURNEY.id}-title`}
          data-print-target={printTarget === UK_PILGRIM_JOURNEY.id ? "" : undefined}
          className="ural-panel scroll-mt-40 overflow-hidden border border-border-subtle bg-white lg:scroll-mt-32"
        >
          {printTarget === UK_PILGRIM_JOURNEY.id && printHeader(UK_PILGRIM_JOURNEY[locale])}
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-brand-navy px-5 py-3 sm:px-6">
            <h2
              id={`${UK_PILGRIM_JOURNEY.id}-title`}
              className="ural-section-title font-serif text-xl text-white sm:text-2xl"
            >
              {UK_PILGRIM_JOURNEY[locale]}
            </h2>
            {audience === "uk" ? (
              pdfButton(UK_PILGRIM_JOURNEY.id, UK_PILGRIM_JOURNEY[locale], true)
            ) : (
              <button
                type="button"
                onClick={() => openJourney()}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-brand-gold px-4 text-sm font-black text-brand-navy transition-colors hover:bg-brand-gold-dark active:bg-brand-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              >
                {fillResourceCopy(copy.journeyOpen, { count: journey.length }, locale)}
                <ChevronDown className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {audience === "uk" ? (
            <ol className="divide-y divide-border-subtle">
              {journey.map(({ stage, links }, index) => (
                <li
                  key={stage.id}
                  id={`${UK_PILGRIM_JOURNEY.id}-${stage.id}`}
                  className="grid scroll-mt-40 gap-3 px-5 py-5 sm:px-6 lg:scroll-mt-32 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-6"
                >
                  <div className="flex items-center gap-3 lg:items-start">
                    <span
                      aria-hidden="true"
                      data-print-inline
                      className={`${numberFont} grid size-9 shrink-0 place-items-center rounded-full bg-brand-navy text-sm font-bold text-brand-gold`}
                    >
                      {count(index + 1)}
                    </span>
                    <div data-print-inline className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-x-3 lg:block">
                      <h3 data-print-inline className="ural-card-title text-base text-brand-navy lg:pt-1.5">
                        <span className="sr-only">{fillResourceCopy(copy.journeyStep, { count: index + 1 }, locale)}: </span>
                        {stage[locale]}
                      </h3>
                      {stage.guide && (
                        <a
                          href={localPath(stage.guide)}
                          onClick={(event) => followInternalLink(event, stage.guide as string)}
                          aria-label={`${copy.guideLink}: ${stage[locale]}`}
                          data-print-hide
                          className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-md text-xs font-semibold text-brand-emerald underline-offset-4 hover:underline ${FOCUS_RING}`}
                        >
                          {copy.guideLink}
                          <ArrowRight className="size-3" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {links.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex h-full min-h-14 items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface-soft px-4 py-3 transition-colors hover:border-brand-gold-dark hover:bg-brand-ivory active:bg-brand-ivory ${FOCUS_RING}`}
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold leading-snug text-brand-navy [overflow-wrap:anywhere]">
                              {isBn ? source.titleBn : source.titleEn}
                            </span>
                            <span className="mt-0.5 block text-xs text-text-muted">
                              {[
                                source.host,
                                OFFICIAL_SOURCE_KINDS[OFFICIAL_HOSTS[source.host].kind][locale],
                                ...(source.pdf ? [copy.pdf] : []),
                              ].join(" · ")}
                            </span>
                          </span>
                          <ExternalLink
                            className="size-4 shrink-0 text-text-muted group-hover:text-brand-emerald"
                            aria-hidden="true"
                          />
                          <span className="sr-only">({copy.opensNewTab})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          ) : (
            <ol className="flex flex-wrap gap-2 px-5 py-4 sm:px-6">
              {journey.map(({ stage }, index) => (
                <li key={stage.id}>
                  <button
                    type="button"
                    onClick={() => openJourney(`${UK_PILGRIM_JOURNEY.id}-${stage.id}`)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default bg-white py-1 pl-1.5 pr-3.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-gold-dark hover:bg-brand-ivory active:bg-brand-ivory ${FOCUS_RING}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${numberFont} grid size-7 place-items-center rounded-full bg-brand-navy text-xs font-bold text-brand-gold`}
                    >
                      {count(index + 1)}
                    </span>
                    {stage[locale]}
                  </button>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

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
              {countryChoices.map((code) => (
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
              <li>
                <a
                  href={`#${OFFICIAL_DOWNLOADS_SECTION_ID}`}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-gold-dark/40 bg-brand-ivory px-3.5 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-gold-dark ${FOCUS_RING}`}
                >
                  <FileText className="size-3.5 text-brand-gold-ink" aria-hidden="true" />
                  {copy.downloadsTitle}
                </a>
              </li>
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
      {groups.map((group) => {
        const sectionId = officialSourceSectionId(group.sector.id);
        return (
        <section
          key={group.sector.id}
          id={sectionId}
          aria-labelledby={`${sectionId}-title`}
          data-print-target={printTarget === sectionId ? "" : undefined}
          className="scroll-mt-40 lg:scroll-mt-32"
        >
          {printTarget === sectionId && printHeader(group.sector[locale])}
          <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-b border-border-subtle pb-3">
            <h2
              id={`${officialSourceSectionId(group.sector.id)}-title`}
              className="ural-section-title font-serif text-2xl text-brand-navy sm:text-3xl"
            >
              {group.sector[locale]}
            </h2>
            <div className="flex items-center gap-4">
              <p className={`${numberFont} text-xs font-bold tabular-nums text-text-muted`}>
                {fillResourceCopy(copy.linkCount, { count: group.total }, locale)}
              </p>
              {pdfButton(sectionId, group.sector[locale])}
            </div>
          </div>

          <div className="mt-5 space-y-7">
            {group.countries.map(({ code, organisations }) => (
              <div key={code}>
                <h3 className={`text-xs font-semibold text-brand-emerald ${labelCase}`}>
                  {OFFICIAL_SOURCE_COUNTRIES[code][locale]}
                </h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {organisations.map(({ organisation, sources }) =>
                    renderCard(organisation, sources, printTarget === sectionId)
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        );
      })}

      {/* ── Guides to keep: URAL files are hosted, official files stay on their own site ── */}
      <section
        id={OFFICIAL_DOWNLOADS_SECTION_ID}
        aria-labelledby={`${OFFICIAL_DOWNLOADS_SECTION_ID}-title`}
        className="scroll-mt-40 lg:scroll-mt-32"
      >
        <div className="border-b border-border-subtle pb-3">
          <h2
            id={`${OFFICIAL_DOWNLOADS_SECTION_ID}-title`}
            className="ural-section-title font-serif text-2xl text-brand-navy sm:text-3xl"
          >
            {copy.downloadsTitle}
          </h2>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {URAL_DOWNLOADS.map((download) => {
            const facts: string[] = [copy.uralMade, copy.pdf, fillResourceCopy(copy.pageCount, { count: download.pages }, locale)];
            if (isBn && download.fileLanguage === "en") facts.push(copy.fileInEnglish);
            return (
              <li key={download.path} className="ural-card flex flex-col gap-4 bg-white p-5 ring-1 ring-inset ring-brand-gold-dark/60">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 size-7 shrink-0 text-brand-gold-ink" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="ural-card-title text-base text-brand-navy">{download[locale]}</h3>
                    <p className={`mt-1 text-xs text-text-secondary ${isBn ? "font-sans" : ""}`}>{facts.join(" · ")}</p>
                  </div>
                </div>
                <a
                  href={download.path}
                  download
                  className={`mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 text-sm font-bold text-white transition-colors hover:bg-brand-emerald active:bg-brand-emerald ${FOCUS_RING}`}
                >
                  <Download className="size-4" aria-hidden="true" />
                  {copy.downloadUral}
                </a>
              </li>
            );
          })}
          {guideDownloads.map((source) => (
            <li key={source.url} className="ural-card flex flex-col gap-4 border border-border-subtle bg-white p-5">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 size-7 shrink-0 text-brand-emerald" aria-hidden="true" />
                <div className="min-w-0">
                  <h3 className="ural-card-title text-base text-brand-navy">{isBn ? source.titleBn : source.titleEn}</h3>
                  <p className="mt-1 text-xs text-text-secondary">
                    {[OFFICIAL_HOSTS[source.host][locale], copy.pdf].join(" · ")}
                  </p>
                </div>
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-brand-navy ring-1 ring-inset ring-brand-navy/70 transition-colors hover:bg-brand-navy hover:text-white active:bg-brand-navy active:text-white ${FOCUS_RING}`}
              >
                {copy.downloadOfficial.replace("{host}", source.host)}
                <ExternalLink className="size-4" aria-hidden="true" />
                <span className="sr-only">({copy.opensNewTab})</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Community bodies: useful, kept apart, never counted as official ── */}
      {communitySources.length > 0 && audience !== "bd" && (
        <section
          id={OFFICIAL_COMMUNITY_SECTION_ID}
          data-community-sources
          aria-labelledby={`${OFFICIAL_COMMUNITY_SECTION_ID}-title`}
          className="ural-panel scroll-mt-40 bg-surface-soft p-5 sm:p-6 lg:scroll-mt-32"
        >
          <h2
            id={`${OFFICIAL_COMMUNITY_SECTION_ID}-title`}
            className="ural-section-title font-serif text-xl text-brand-navy sm:text-2xl"
          >
            {copy.communityTitle}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[...new Set(communitySources.map((source) => source.org))].map((orgId) => {
              const sources = communitySources.filter((source) => source.org === orgId);
              return renderCard(OFFICIAL_HOSTS[sources[0].host], sources);
            })}
          </div>
        </section>
      )}

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
