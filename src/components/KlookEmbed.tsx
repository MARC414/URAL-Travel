import React, { useEffect, useState, useRef } from "react";
import { ExternalLink } from "lucide-react";

interface KlookEmbedProps {
  cityId?: number; // Optional city ID customizability
}

export function KlookEmbed({ cityId = 9 }: KlookEmbedProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptContainerRef.current) return;
    
    scriptContainerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = `https://tpemd.com/content?currency=usd&promo_id=4497&campaign_id=137&powered_by=true&amount=3&category=3&city_id=${cityId}&locale=en&shmarker=675992&trs=540277`;
    script.charset = "utf-8";
    script.async = true;
    
    script.onload = () => setStatus("loaded");
    script.onerror = () => setStatus("failed");
    
    const timer = setTimeout(() => {
      setStatus(prev => prev === "loading" ? "failed" : prev);
    }, 4500);
    
    scriptContainerRef.current.appendChild(script);

    return () => {
      clearTimeout(timer);
    };
  }, [cityId]);

  return (
    <div className="w-full bg-white rounded-xl p-2 min-h-[250px] overflow-hidden">
      {status === "failed" && (
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center space-y-3">
          <span className="text-xs text-slate-500 font-mono">Tours and activities widget is taking longer than expected.</span>
          <a
            href="https://klook.tpo.li/IYOU76Bn"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Browse Tours & Activities on Klook <ExternalLink size={12} />
          </a>
        </div>
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
          <div className="w-6.5 h-6.5 border-4 border-slate-100 border-t-[#F6B73C] animate-spin rounded-full mb-2"></div>
          <span className="text-[10px] font-mono tracking-wider">Loading handpicked activities & attractions...</span>
        </div>
      )}

      <div 
        ref={scriptContainerRef} 
        style={{ display: status === "loaded" ? "block" : "none" }}
      />
    </div>
  );
}
