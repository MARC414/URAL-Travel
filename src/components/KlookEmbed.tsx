import React, { useState, useId } from "react";
import { ExternalLink, Compass, Search, Building } from "lucide-react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";

interface KlookEmbedProps {
  cityId?: number;
}

export function KlookEmbed({ cityId = 9 }: KlookEmbedProps) {
  const uid = useId();
  const [query, setQuery] = useState("");
  const klookPartnerUrl = resolvePartnerUrl(AFFILIATE_LINKS.klook);

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80 relative overflow-hidden font-sans">
      <div className="flex items-center justify-between gap-2.5 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#F6B73C]/15 text-brand-navy rounded-lg border border-[#F6B73C]/30">
            <Compass size={18} />
          </div>
          <div>
            <h4 className="font-serif font-black text-sm text-slate-900">
              Hotels, Tours &amp; Activities on Klook
            </h4>
            <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">
              Verified Global Hotels • Instant Entry Passes • Dual-Currency Cards
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
          <Building size={11} /> Hotels &amp; Tours
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <div>
          <label
            htmlFor={`${uid}-klook-query`}
            className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1"
          >
            <Search size={10} className="text-[#F6B73C]" /> Search Hotels, Tours or Attractions
          </label>
          <input
            id={`${uid}-klook-query`}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F6B73C] focus:border-[#F6B73C] transition-all"
            placeholder="e.g. Makkah Hotel, Bangkok Pratunam Stay, Burj Khalifa, Desert Safari..."
          />
        </div>

        <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
          Compare verified hotels, family resorts, theme parks, airport rail, and skip-the-line sightseeing passes with instant online confirmation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href={klookPartnerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full bg-brand-navy hover:bg-slate-800 text-[#F6B73C] font-bold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Search Klook Hotels &amp; Stays</span>
            <ExternalLink size={11} />
          </a>
          <a
            href={klookPartnerUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full bg-[#F6B73C] hover:bg-[#f5ad24] text-brand-navy font-bold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Explore Tours &amp; Passes</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </form>
    </div>
  );
}
