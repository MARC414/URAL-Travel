import React from "react";
import { Language } from "../translations";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  lang: Language;
  onToggle: (newLang: Language) => void;
  /** English URL of the current page, e.g. "/umrah" — real href for crawlers. */
  enHref?: string;
  /** Bengali URL of the current page, e.g. "/bn/umrah". */
  bnHref?: string;
  compact?: boolean;
}

/**
 * Both locales are real URLs (/umrah and /bn/umrah), so the switcher renders
 * anchors — not buttons. A <button onClick> is invisible to Googlebot, which is
 * why the Bengali pages were previously uncrawlable despite existing content.
 * The click handler keeps SPA behaviour (no full reload) while the href keeps
 * the link crawlable and "open in new tab" functional.
 */
export function LanguageSwitcher({
  lang,
  onToggle,
  enHref = "/",
  bnHref = "/bn",
  compact = false,
}: LanguageSwitcherProps) {
  const baseClass = `px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
    compact ? "text-[10px]" : ""
  }`;

  return (
    <div className="inline-flex items-center rounded-lg bg-white/10 p-0.5 border border-white/15 text-[11px] font-medium select-none">
      <a
        href={enHref}
        onClick={(event) => {
          event.preventDefault();
          onToggle("en");
        }}
        aria-current={lang === "en" ? "true" : undefined}
        className={`${baseClass} ${
          lang === "en"
            ? "bg-[#F6B73C] text-brand-navy font-bold shadow-xs"
            : "text-white/70 hover:text-white"
        }`}
        title="Switch to English"
      >
        <Globe className="w-3 h-3" aria-hidden="true" />
        <span>EN</span>
      </a>

      <a
        href={bnHref}
        onClick={(event) => {
          event.preventDefault();
          onToggle("bn");
        }}
        aria-current={lang === "bn" ? "true" : undefined}
        className={`${baseClass} ${
          lang === "bn"
            ? "bg-[#F6B73C] text-brand-navy font-bold shadow-xs"
            : "text-white/70 hover:text-white"
        }`}
        title="বাংলায় দেখুন"
        lang="bn"
      >
        <span>বাংলা</span>
      </a>
    </div>
  );
}
