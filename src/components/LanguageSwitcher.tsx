import React from "react";
import { Language } from "../translations";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  lang: Language;
  onToggle: (newLang: Language) => void;
  /**
   * Real, crawlable destination URLs for each locale (e.g. "/umrah" and
   * "/bn/umrah"). Rendering these as <a href> with hrefLang lets search engines
   * discover the Bengali counterpart of every page and reinforces the hreflang
   * cluster with on-page links, while onClick keeps switching instant (SPA).
   */
  enHref: string;
  bnHref: string;
  compact?: boolean;
}

export function LanguageSwitcher({
  lang,
  onToggle,
  enHref,
  bnHref,
  compact = false,
}: LanguageSwitcherProps) {
  const baseClass = `px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
    compact ? "text-[10px]" : ""
  }`;

  return (
    <div className="inline-flex items-center rounded-lg bg-white/10 p-0.5 border border-white/15 text-[11px] font-medium select-none">
      <a
        href={enHref}
        hrefLang="en-bd"
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
        hrefLang="bn-bd"
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
