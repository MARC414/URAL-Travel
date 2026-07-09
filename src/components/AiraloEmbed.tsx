import React, { useState } from "react";
import { ExternalLink, Wifi, Globe, Loader2 } from "lucide-react";

export function AiraloEmbed() {
  const [selectedCountry, setSelectedCountry] = useState("Nepal");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://airalo.tpo.li/mV2QXsXK", "_blank", "noopener,noreferrer,sponsored");
    }, 1000);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-100 relative overflow-hidden font-sans">
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="p-1.5 bg-red-500/10 text-red-600 rounded-lg">
          <Wifi size={18} />
        </div>
        <div>
          <h4 className="font-serif font-black text-sm text-slate-900">Local eSIMs via Airalo</h4>
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Instant Activation • No Physical Card</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div>
          <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Globe size={9} className="text-red-550" /> Destination Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
          >
            <option value="Nepal">Nepal 🇳🇵</option>
            <option value="Thailand">Thailand 🇹🇭</option>
            <option value="Malaysia">Malaysia 🇲🇾</option>
            <option value="UAE">United Arab Emirates 🇦🇪</option>
            <option value="Global">Global / Worldwide Plan</option>
          </select>
        </div>

        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
          Airalo offers digital eSIM plans that activate on any compatible smartphone upon arrival, avoiding expensive roaming rates.
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
              <span>Get Local eSIM Plans</span>
              <ExternalLink size={11} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
