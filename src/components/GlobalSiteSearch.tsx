import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";
import {
  prepareSiteSearchIndex,
  searchSite,
  siteSearchKindLabel,
  type SiteSearchEntry,
} from "../utils/siteSearch";

type GlobalSiteSearchProps = {
  isBn: boolean;
  onClose: () => void;
  navigateTo: (path: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

type SearchIndexResponse = { version: number; entries: SiteSearchEntry[] };

let cachedIndexPromise: Promise<SiteSearchEntry[]> | null = null;

function loadSearchIndex(): Promise<SiteSearchEntry[]> {
  if (!cachedIndexPromise) {
    cachedIndexPromise = fetch("/site-search-index.json", {
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Search index request failed (${response.status})`);
        return response.json() as Promise<SearchIndexResponse>;
      })
      .then((payload) => {
        if (payload.version !== 1 || !Array.isArray(payload.entries)) {
          throw new Error("Unsupported site search index");
        }
        return payload.entries;
      })
      .catch((error) => {
        cachedIndexPromise = null;
        throw error;
      });
  }
  return cachedIndexPromise;
}

function localePath(path: string, isBn: boolean): string {
  if (!isBn || path.startsWith("/bn/")) return path;
  return path === "/" ? "/bn/" : `/bn${path}`;
}

export function GlobalSiteSearch({ isBn, onClose, navigateTo, triggerRef }: GlobalSiteSearchProps) {
  const [entries, setEntries] = useState<SiteSearchEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState("");
  const [settledQuery, setSettledQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadSearchIndex()
      .then((nextEntries) => {
        if (!cancelled) setEntries(nextEntries);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    const focusTimer = window.requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [triggerRef]);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettledQuery(query.trim()), 90);
    return () => window.clearTimeout(timer);
  }, [query]);

  const preparedEntries = useMemo(
    () => entries ? prepareSiteSearchIndex(entries) : [],
    [entries],
  );
  const results = useMemo(
    () => settledQuery ? searchSite(preparedEntries, settledQuery, isBn ? "bn" : "en") : [],
    [preparedEntries, settledQuery, isBn],
  );
  const isBnLocale = isBn;
  const trimmedQuery = settledQuery.trim();
  const queryLooksLikeHotel = /hotel|hotels|stay|accommodation|হোটেল|থাক|আবাসন/i.test(trimmedQuery);

  const fallbackLinks = queryLooksLikeHotel
    ? [
        { path: "/hotels", label: isBn ? "সব হোটেল এলাকা গাইড দেখুন" : "Browse all hotel-area guides" },
        { path: "/destinations", label: isBn ? "গন্তব্য গাইড দেখুন" : "Browse destination guides" },
      ]
    : [
        { path: "/destinations", label: isBn ? "গন্তব্য গাইড" : "Destination guides" },
        { path: "/flights", label: isBn ? "ফ্লাইট রুট" : "Flight routes" },
        { path: "/visa", label: isBn ? "ভিসা গাইড" : "Visa guides" },
        { path: "/hotels", label: isBn ? "হোটেল এলাকা গাইড" : "Hotel-area guides" },
      ];

  const quickLinks = [
    { path: "/destinations", label: isBn ? "গন্তব্য" : "Destinations" },
    { path: "/flights", label: isBn ? "ফ্লাইট" : "Flights" },
    { path: "/hotels", label: isBn ? "হোটেল এলাকা" : "Hotel areas" },
    { path: "/visa", label: isBn ? "ভিসা" : "Visas" },
    { path: "/tools", label: isBn ? "টুলস" : "Tools" },
  ];

  const choosePath = (path: string) => {
    onClose();
    navigateTo(path);
  };

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && results.length > 0) {
      event.preventDefault();
      choosePath(results[Math.min(activeIndex, results.length - 1)].path);
    } else if (event.key === "Tab" && dialogRef.current) {
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'input:not([disabled]), button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/65 px-3 py-[8vh] backdrop-blur-[2px] sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="global-site-search-title"
        aria-describedby="global-site-search-note"
        onKeyDown={onDialogKeyDown}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
          <span aria-hidden="true" className="relative ml-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brand-navy after:absolute after:-bottom-1 after:-right-1 after:h-1.5 after:w-1 after:rotate-45 after:rounded-full after:bg-brand-navy" />
          <label id="global-site-search-title" htmlFor="global-site-search-input" className="sr-only">
            {isBn ? "URAL সাইটে খুঁজুন" : "Search URAL"}
          </label>
          <input
            ref={inputRef}
            id="global-site-search-input"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="global-site-search-results"
            aria-expanded={Boolean(trimmedQuery && results.length)}
            aria-activedescendant={results.length ? `global-search-result-${activeIndex}` : undefined}
            value={query}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setActiveIndex(0);
            }}
            placeholder={isBn
              ? "ফ্লাইট, হোটেল, ভিসা বা গাইড খুঁজুন..."
              : "Search flights, hotel guides, visas, articles..."}
            className="min-w-0 flex-1 border-0 bg-transparent py-1 text-base text-slate-900 outline-none placeholder:text-slate-400"
          />
          {entries === null && !loadError ? (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-slate-500" />
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label={isBn ? "সার্চ বন্ধ করুন" : "Close search"}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <p id="global-site-search-note" className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs leading-relaxed text-slate-600 sm:px-5">
          {isBn
            ? "URAL-এর গাইড ও টুল খুঁজুন; আপনার খোঁজ ডিভাইসেই থাকে। এটি লাইভ হোটেল রেট বা প্রাপ্যতা সার্চ নয়।"
            : "Search URAL guides and tools; your query stays on this device. Not live hotel rates or availability."}
        </p>

        <div className="max-h-[62vh] overflow-y-auto px-4 py-4 sm:px-5">
          {loadError ? (
            <div className="space-y-3" role="status">
              <p className="text-sm text-slate-700">
                {isBn ? "সার্চ তালিকা লোড হয়নি। নিচের বিভাগগুলো থেকে ব্রাউজ করুন।" : "The search index could not load. Browse a section instead."}
              </p>
              <FallbackLinks links={fallbackLinks} isBn={isBn} onChoose={choosePath} />
            </div>
          ) : null}

          {!loadError && !trimmedQuery ? (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {isBn ? "বিভাগ ব্রাউজ করুন" : "Browse a section"}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => choosePath(link.path)}
                    className="flex min-h-11 items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm font-semibold text-brand-navy transition hover:border-brand-navy/40 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                  >
                    <span>{link.label}</span><ArrowRight size={14} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {!loadError && trimmedQuery && entries === null ? (
            <p className="py-5 text-sm text-slate-600" role="status">
              {isBn ? "গাইড খোঁজা হচ্ছে…" : "Searching the site…"}
            </p>
          ) : null}

          {!loadError && trimmedQuery && entries !== null && results.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-500" aria-live="polite">
                {isBn ? `${results.length}টি প্রাসঙ্গিক পেজ` : `${results.length} relevant pages`}
              </p>
              <ul id="global-site-search-results" role="listbox" aria-label={isBn ? "সার্চ ফলাফল" : "Search results"} className="space-y-1">
                {results.map((result, index) => (
                  <li key={result.entry.id} role="presentation">
                    <a
                      id={`global-search-result-${index}`}
                      role="option"
                      aria-selected={index === activeIndex}
                      href={localePath(result.path, isBnLocale)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={(event) => {
                        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                        event.preventDefault();
                        choosePath(result.path);
                      }}
                      className={`block rounded-xl border px-3.5 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${index === activeIndex ? "border-brand-navy/30 bg-slate-50" : "border-transparent hover:bg-slate-50"}`}
                    >
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-brand-navy">{result.title}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-brand-emerald">
                          {siteSearchKindLabel(result.entry.kind, isBn ? "bn" : "en")}
                        </span>
                      </span>
                      <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-slate-600">{result.summary}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {!loadError && trimmedQuery && entries !== null && results.length === 0 ? (
            <div className="space-y-3" role="status" aria-live="polite">
              <p className="text-sm font-semibold text-slate-800">
                {isBn ? "এই খোঁজের সঙ্গে মেলে এমন গাইড পাওয়া যায়নি। কাছাকাছি বিভাগ দেখুন:" : "No matching guide found. These sections may help:"}
              </p>
              <FallbackLinks links={fallbackLinks} isBn={isBn} onChoose={choosePath} />
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500 sm:px-5">
          <span>{isBn ? "↑ ↓ নির্বাচন · Enter খুলুন" : "↑ ↓ to select · Enter to open"}</span>
          <span>Esc {isBn ? "বন্ধ" : "close"}</span>
        </div>
      </section>
    </div>,
    document.body,
  );
}

function FallbackLinks({
  links,
  isBn,
  onChoose,
}: {
  links: { path: string; label: string }[];
  isBn: boolean;
  onChoose: (path: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <button
          key={link.path}
          type="button"
          onClick={() => onChoose(link.path)}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-brand-navy hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
        >
          {link.label}<ArrowRight size={13} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
