import React from "react";
import { Language } from "../translations";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  lang: Language;
  onToggle: (newLang: Language) => void;
  compact?: boolean;
}

export function LanguageSwitcher({ lang, onToggle, compact = false }: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-white/10 p-0.5 border border-white/15 text-[11px] font-medium select-none">
      <button
        type="button"
        onClick={() => onToggle("en")}
        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
          lang === "en"
            ? "bg-[#F6B73C] text-[#0F172A] font-bold shadow-xs"
            : "text-white/70 hover:text-white"
        }`}
        title="Switch to English"
      >
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => onToggle("bn")}
        className={`px-2 py-0.5 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
          lang === "bn"
            ? "bg-[#F6B73C] text-[#0F172A] font-bold shadow-xs"
            : "text-white/70 hover:text-white"
        }`}
        title="বাংলায় পরিবর্তন করুন"
      >
        <span>বাংলা</span>
      </button>
    </div>
  );
}
