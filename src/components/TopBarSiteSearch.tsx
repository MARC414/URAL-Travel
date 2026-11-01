import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { SiteSearchEntry } from "../utils/siteSearch";

type SiteSearchApi = typeof import("../utils/siteSearch");

type TopBarSiteSearchProps = {
  isBn: boolean;
  initialQuery: string;
  navigateTo: (path: string) => void;
  onOpenSearch: (query: string) => void;
  onSubmitQuery: (query: string) => Promise<boolean>;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function TopBarSiteSearch({ isBn, initialQuery, navigateTo, onOpenSearch, onSubmitQuery, inputRef }: TopBarSiteSearchProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [settledQuery, setSettledQuery] = useState("");
  const [entries, setEntries] = useState<SiteSearchEntry[] | null>(null);
  const [searchApi, setSearchApi] = useState<SiteSearchApi | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettledQuery(query.trim()), 120);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (settledQuery.length < 2 || entries) return;
    let cancelled = false;
    setIsLoading(true);
    setLoadError(false);
    import("../utils/siteSearch")
      .then(async (api) => {
        if (cancelled) return;
        setSearchApi(api);
        const nextEntries = await api.loadSiteSearchIndex();
        if (!cancelled) setEntries(nextEntries);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [settledQuery, entries]);

  const preparedEntries = useMemo(
    () => entries && searchApi ? searchApi.prepareSiteSearchIndex(entries) : [],
    [entries, searchApi],
  );
  const results = useMemo(
    () => settledQuery.length >= 2 && searchApi
      ? searchApi.searchSite(preparedEntries, settledQuery, isBn ? "bn" : "en", 5)
      : [],
    [preparedEntries, searchApi, settledQuery, isBn],
  );
  const hasQuery = query.trim().length > 0;
  const showPanel = isFocused || hasQuery;

  useEffect(() => setActiveIndex(0), [settledQuery, results.length]);

  const selectResult = (path: string) => {
    setIsFocused(false);
    setQuery("");
    setSettledQuery("");
    navigateTo(path);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (results.length > 0) {
      selectResult(results[Math.min(activeIndex, results.length - 1)].path);
      return;
    }
    setIsSubmitting(true);
    try {
      const didNavigate = await onSubmitQuery(query.trim());
      if (didNavigate) {
        setIsFocused(false);
        setQuery("");
        setSettledQuery("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <form
      ref={formRef}
      role="search"
      aria-label={isBn ? "URAL সাইটে খুঁজুন" : "Search this site"}
      aria-busy={isLoading || isSubmitting}
      onSubmit={onSubmit}
      className="relative z-[70] mx-auto flex h-9 w-full max-w-[360px] items-center gap-2 rounded-lg border border-white/20 bg-white/[0.08] px-3 text-white shadow-sm transition focus-within:border-[#F6B73C] focus-within:bg-white/[0.11] focus-within:ring-2 focus-within:ring-[#F6B73C]/40"
    >
      <Search size={15} aria-hidden="true" className="shrink-0 text-white/70" />
      <input
        ref={inputRef}
        id="top-bar-site-search"
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-controls={results.length > 0 ? "top-bar-site-search-results" : undefined}
        aria-expanded={Boolean(showPanel && hasQuery && results.length)}
        aria-activedescendant={results.length ? `top-bar-search-result-${activeIndex}` : undefined}
        value={query}
        onFocus={() => setIsFocused(true)}
        onBlur={() => window.setTimeout(() => {
          if (!formRef.current?.contains(document.activeElement)) setIsFocused(false);
        }, 120)}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          setActiveIndex(0);
          setIsFocused(true);
        }}
        onKeyDown={onInputKeyDown}
        aria-label={isBn ? "সার্চের শব্দ লিখুন" : "Search destinations, routes, guides and tools"}
        placeholder={isBn ? "গন্তব্য, ফ্লাইট, ভিসা বা গাইড খুঁজুন" : "Search destinations, flights, visas, guides..."}
        autoComplete="off"
        className="min-w-0 flex-1 select-text bg-transparent py-1 text-[13px] font-medium text-white outline-none placeholder:text-white/60"
      />
      {isLoading ? (
        <span aria-hidden="true" className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
      ) : null}
      <button
        type="submit"
        aria-label={isBn ? "সার্চ ফলাফল দেখুন" : "Open the best matching page"}
        disabled={isSubmitting}
        className="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-white/85 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] disabled:opacity-70"
      >
        <ArrowRight size={15} aria-hidden="true" />
      </button>

      {showPanel ? (
        <div className="absolute left-1/2 top-full z-[80] mt-2 w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xl">
          {!hasQuery ? (
            <p className="px-4 py-3 text-xs text-slate-600">
              {isBn ? "গন্তব্য, রুট, হোটেল এলাকা, ভিসা বা ভ্রমণ গাইড লিখুন" : "Type a destination, route, hotel area, visa or travel guide"}
            </p>
          ) : settledQuery.length < 2 ? (
            <p className="px-4 py-3 text-xs text-slate-600" role="status">
              {isBn ? "ফলাফল দেখতে অন্তত ২টি অক্ষর লিখুন" : "Enter at least 2 characters to see matches"}
            </p>
          ) : isLoading ? (
            <p className="px-4 py-3 text-xs text-slate-600" role="status">
              {isBn ? "গাইড খোঁজা হচ্ছে…" : "Searching URAL guides…"}
            </p>
          ) : loadError ? (
            <div className="space-y-2 px-4 py-3" role="status">
              <p className="text-xs text-slate-600">
                {isBn ? "সার্চ তালিকা লোড হয়নি। পূর্ণ সার্চ খুলে বিভাগ দেখুন।" : "Search suggestions are unavailable. Open full search to browse sections."}
              </p>
              <button type="button" onClick={() => onOpenSearch(query.trim())} className="text-xs font-semibold text-brand-navy underline underline-offset-2">
                {isBn ? "পূর্ণ সার্চ খুলুন" : "Open full search"}
              </button>
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500" aria-live="polite">
                {isBn ? "প্রাসঙ্গিক পেজ" : "Relevant pages"}
              </p>
              <ul id="top-bar-site-search-results" role="listbox" aria-label={isBn ? "সার্চ ফলাফল" : "Search results"} className="max-h-[min(60vh,24rem)] overflow-y-auto p-1.5">
                {results.map((result, index) => (
                  <li key={result.entry.id} role="presentation">
                    <a
                      id={`top-bar-search-result-${index}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      href={result.path}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={(event) => {
                        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                        event.preventDefault();
                        selectResult(result.path);
                      }}
                      className={`block rounded-lg px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${index === activeIndex ? "bg-slate-100" : "hover:bg-slate-50"}`}
                    >
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-brand-navy">{result.title}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-brand-emerald">
                          {searchApi?.siteSearchKindLabel(result.entry.kind, isBn ? "bn" : "en")}
                        </span>
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-slate-600">{result.summary}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onOpenSearch(query.trim())}
                className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-xs font-semibold text-brand-navy transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F6B73C]"
              >
                {isBn ? "সব ফলাফল দেখুন" : "See all results"}
              </button>
            </>
          ) : (
            <div className="space-y-2 px-4 py-3" role="status" aria-live="polite">
              <p className="text-xs text-slate-700">
                {isBn ? "এই শব্দের সঙ্গে মেলে এমন পেজ নেই।" : "No matching page found for this query."}
              </p>
              <button type="button" onClick={() => onOpenSearch(query.trim())} className="text-xs font-semibold text-brand-navy underline underline-offset-2">
                {isBn ? "বিভাগ ব্রাউজ করুন" : "Browse search sections"}
              </button>
            </div>
          )}
        </div>
      ) : null}
    </form>
  );
}
