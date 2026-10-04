import React, { useState, useId } from "react";
import { ExternalLink, Wifi, Globe, Loader2, ShieldCheck } from "lucide-react";

export function AiraloEmbed() {
  const uid = useId();
  const [selectedCountry, setSelectedCountry] = useState("Saudi Arabia");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://airalo.tpo.li/mV2QXsXK", "_blank", "noopener,noreferrer,sponsored");
    }, 600);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-100 relative overflow-hidden font-sans space-y-3.5">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-red-500/10 text-red-600 rounded-lg">
          <Wifi size={18} />
        </div>
        <div>
          <h4 className="font-serif font-black text-sm text-slate-900">Travel eSIM (Airalo &amp; Yesim) + EKTA Insurance</h4>
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Instant QR Activation • Keep BD SIM for Bank OTPs</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div>
          <label htmlFor={`${uid}-airalo-country`} className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Globe size={9} className="text-red-550" /> Destination Country
          </label>
          <select
            id={`${uid}-airalo-country`}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
          >
            <option value="Saudi Arabia">Saudi Arabia (Umrah / Nusuk) 🇸🇦</option>
            <option value="Thailand">Thailand 🇹🇭</option>
            <option value="Malaysia">Malaysia 🇲🇾</option>
            <option value="Singapore">Singapore 🇸🇬</option>
            <option value="UAE">United Arab Emirates (Dubai) 🇦🇪</option>
            <option value="Nepal">Nepal 🇳🇵</option>
            <option value="Maldives">Maldives 🇲🇻</option>
            <option value="Europe">Europe / Schengen / UK / USA 🌍</option>
            <option value="Global">Global / Multi-Country Asia Plan</option>
          </select>
        </div>

        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
          Install your digital eSIM in Dhaka so WhatsApp, Nusuk QR codes, and Grab/Careem work the moment your flight lands—while your Bangladeshi SIM stays active for free bank OTPs.
        </p>

        {/* Dual eSIM Partner Buttons: Airalo + Yesim (Mobile App & Web supported) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="submit"
            disabled={isRedirecting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
          >
            {isRedirecting ? (
              <>
                <Loader2 size={12} className="animate-spin text-white" />
                <span>Opening Airalo...</span>
              </>
            ) : (
              <>
                <span>Airalo eSIM ($4.50+)</span>
                <ExternalLink size={11} />
              </>
            )}
          </button>

          <a
            href="https://yesim.tpo.li/O8Zvqr73"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <span>Yesim Unlimited / App eSIM</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </form>

      {/* Contextual EKTA Travel Medical Insurance Bar ($0.99/day for Schengen, Thailand e-Visa & Elderly Umrah) */}
      <div className="pt-2.5 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start gap-1.5 text-[11px] text-slate-700">
          <ShieldCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Need <strong>Embassy-Compliant Travel Medical Insurance</strong> (Schengen, Thailand e-Visa, or Umrah Senior Coverage)?
          </span>
        </div>
        <a
          href="https://ektatraveling.tpo.li/vl11DEG6"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors shrink-0 whitespace-nowrap"
        >
          <span>EKTA Insurance ($0.99/day)</span>
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
