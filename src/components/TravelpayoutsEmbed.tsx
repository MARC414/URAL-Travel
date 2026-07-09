import React, { useEffect, useState, useRef } from "react";

export function TravelpayoutsEmbed() {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptContainerRef.current) return;
    
    // Clear previous elements to prevent multiple widgets mounting on rerenders
    scriptContainerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = "https://tpemd.com/content?currency=usd&campaign_id=100&promo_id=7879&plain=false&border_radius=0&color_focused=%2332a8dd&special=%23C4C4C4&secondary=%23FFFFFF&light=%23FFFFFF&dark=%23262626&color_icons=%2332a8dd&color_button=%2332a8dd&primary_override=%2332a8dd&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=true&show_hotels=false&shmarker=675992&trs=540277";
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
    <div id="tp-embed-container" className="w-full bg-white rounded-lg p-2 min-h-[250px] overflow-hidden">
      {status === "failed" && (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
          <span className="text-xs text-slate-500 font-mono">Interactive search form is taking too long to load.</span>
          <a 
            href="https://aviasales.tpo.li/8saJolX0" 
            target="_blank" 
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Search Flights & Hotels on Aviasales ✈️
          </a>
        </div>
      )}
      
      {status === "loading" && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-[#32a8dd] animate-spin rounded-full mb-3"></div>
          <span className="text-xs font-mono tracking-tight font-medium">Initializing live Travelpayouts search engines...</span>
        </div>
      )}

      <div 
        ref={scriptContainerRef} 
        style={{ display: status === "loaded" ? "block" : "none" }}
      />
    </div>
  );
}
