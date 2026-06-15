import React, { useEffect, useRef } from "react";

export function TravelpayoutsEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous elements to prevent multiple widgets mounting on rerenders
    containerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = "https://tpemd.com/content?currency=usd&campaign_id=100&promo_id=7879&plain=false&border_radius=0&color_focused=%2332a8dd&special=%23C4C4C4&secondary=%23FFFFFF&light=%23FFFFFF&dark=%23262626&color_icons=%2332a8dd&color_button=%2332a8dd&primary_override=%2332a8dd&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=true&show_hotels=true&shmarker=675992&trs=462865";
    script.charset = "utf-8";
    script.async = true;
    
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div id="tp-embed-container" className="w-full bg-white rounded-lg p-2 min-h-[250px] overflow-hidden" ref={containerRef}>
      {/* High contrast, styled loader/fallback while widget code executes */}
      <div className="flex flex-col items-center justify-center py-12 text-slate-500">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[#32a8dd] animate-spin rounded-full mb-3"></div>
        <span className="text-xs font-mono tracking-tight font-medium">Initializing live Travelpayouts search engines...</span>
      </div>
    </div>
  );
}
