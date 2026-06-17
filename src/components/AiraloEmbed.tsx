import React, { useEffect, useState, useRef } from "react";
import { ExternalLink } from "lucide-react";

export function AiraloEmbed() {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptContainerRef.current) return;
    
    scriptContainerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = "https://tpemd.com/content?campaign_id=541&promo_id=8588&no_labels=true&plain=false&border_radius=5&special=%23C4C4C4&light=%23FFFFFF&dark=%2311100f&secondary=%230b1628&color_focused=%23C32B2Bff&color_button=%23315590ff&powered_by=true&locale=en&shmarker=675992&trs=540277";
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
  }, []);

  return (
    <div className="w-full bg-white rounded-xl p-2 min-h-[300px] overflow-hidden">
      {status === "failed" && (
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center space-y-3">
          <span className="text-xs text-slate-500 font-mono">Sim card / eSIM mobile data widget is taking longer than expected.</span>
          <a
            href="https://airalo.tpo.li/mV2QXsXK"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Buy Local eSIM Plans on Airalo <ExternalLink size={12} />
          </a>
        </div>
      )}

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <div className="w-6.5 h-6.5 border-4 border-slate-100 border-t-[#C32B2B] animate-spin rounded-full mb-2"></div>
          <span className="text-[10px] font-mono tracking-wider">Loading local eSIM plan search...</span>
        </div>
      )}

      <div 
        ref={scriptContainerRef} 
        style={{ display: status === "loaded" ? "block" : "none" }}
      />
    </div>
  );
}
