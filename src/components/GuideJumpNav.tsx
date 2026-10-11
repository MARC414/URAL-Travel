import React from "react";
import { ArrowRight, ChevronDown, List } from "lucide-react";

type GuideJumpLink = {
  id: string;
  en: string;
  bn: string;
};

type GuideJumpNavProps = {
  links: GuideJumpLink[];
  isBn: boolean;
};

/**
 * A compact, keyboard-native contents list for long travel guides. The guide
 * stays complete and readable in its normal order; readers can open this map
 * only when they want to jump directly to a specific section.
 */
export function GuideJumpNav({ links, isBn }: GuideJumpNavProps) {
  if (links.length === 0) return null;

  return (
    <details className="ural-guide-jump group rounded-2xl border border-slate-200 bg-white/80 shadow-xs transition-colors open:border-slate-300">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]">
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
            <List size={16} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {isBn ? "গাইডের মানচিত্র" : "Guide map"}
            </span>
            <span className="mt-0.5 block text-sm font-semibold leading-snug text-brand-navy">
              {isBn ? "প্রয়োজনীয় অংশে সরাসরি যান" : "Jump to the section you need"}
            </span>
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="hidden sm:inline">{isBn ? "অংশগুলো দেখুন" : "Browse sections"}</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="ural-guide-jump-chevron text-brand-navy transition-transform duration-200"
          />
        </span>
      </summary>

      <nav
        aria-label={isBn ? "এই গাইডের অংশসমূহ" : "Sections in this guide"}
        className="border-t border-slate-100 px-3 pb-3 pt-2"
      >
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, index) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="flex min-h-11 items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs font-medium leading-snug text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-[10px] font-bold text-brand-navy"
                >
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">{isBn ? link.bn : link.en}</span>
                <ArrowRight size={13} aria-hidden="true" className="shrink-0 text-brand-emerald" />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
