import React, { useState } from "react";
import { ExternalLink, Compass, Search, Loader2 } from "lucide-react";

interface KlookEmbedProps {
  cityId?: number;
}

export function KlookEmbed({ cityId = 9 }: KlookEmbedProps) {
  const [query, setQuery] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://klook.tpo.li/IYOU76Bn", "_blank", "noopener,noreferrer,sponsored");
    }, 1000);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-100 relative overflow-hidden font-sans">
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="p-1.5 bg-[#F6B73C]/10 text-[#F6B73C] rounded-lg">
          <Compass size={18} />
        </div>
        <div>
          <h4 className="font-serif font-black text-sm text-slate-900">Explore Activities on Klook</h4>
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Lowest Price Guarantee • Direct Entry Passes</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div>
          <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Search size={9} className="text-[#F6B73C]" /> Search Tours or Attractions
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6B73C] focus:border-[#F6B73C] transition-all"
            placeholder="e.g. Burj Khalifa, Private City Tour"
          />
        </div>

        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
          Search over 100,000+ local attractions, day tours, transport passes, and unique experiences at exclusive discounted rates.
        </p>

        {/* Search button with redirect loader */}
        <button
          type="submit"
          disabled={isRedirecting}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
        >
          {isRedirecting ? (
            <>
              <Loader2 size={12} className="animate-spin text-white" />
              <span>Redirecting Securely...</span>
            </>
          ) : (
            <>
              <span>Search Klook Activities</span>
              <ExternalLink size={11} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
