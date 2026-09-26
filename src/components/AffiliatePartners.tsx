import React, { useEffect, useState, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { KlookEmbed } from "./KlookEmbed";
import { KiwitaxiEmbed } from "./KiwitaxiEmbed";
import { AiraloEmbed } from "./AiraloEmbed";
import { QeeqEmbed } from "./QeeqEmbed";
import { WelcomePickupsEmbed, WELCOME_PICKUPS_PARTNER_URL } from "./WelcomePickupsEmbed";

/* Single source of truth for the plain outbound URLs (used by
   PartnerLinkButton and any inline <a> tags). Do not edit these values. */
export const AFFILIATE_LINKS = {
  aviasales: "https://aviasales.tpo.li/8saJolX0",
  klook: "https://klook.tpo.li/IYOU76Bn",
  tiqets: "https://tiqets.tpo.li/KSc4uyIB",
  airhelp: "https://airhelp.tpo.li/XS95LnEC",
  kkday: "https://kkday.tpo.li/3Ecyxris",
  kiwitaxi: "https://kiwitaxi.tpo.li/GIhvhrtF",
  welcomePickups: WELCOME_PICKUPS_PARTNER_URL,
  airalo: "https://airalo.tpo.li/mV2QXsXK",
  qeeq: "https://qeeq.tpo.li/nooi5oSG"
};

export const AIRHELP_PROMO = {
  code: "AHTPO11",
  discount: "11% OFF",
  validUntil: "November 30, 2026",
  plans: "AirHelp+ Smart & AirHelp+ Pro",
  scriptSrc: "https://tpemd.com/content?promo_id=8679&campaign_id=120&powered_by=true&lang=en&shmarker=675992&trs=540277"
};

export const KKDAY_PROMO = {
  affiliateUrl: "https://kkday.tpo.li/3Ecyxris",
  campaignName: "KKday Southeast Asia 9.9 Travel Sale",
  discount: "30% OFF + Buy 1 Get 1",
  giveaway: "US$100 KKday Coupon (Top 5 Spenders)",
  bookingWindow: "Sept 9 – Sept 30, 2026",
  travelWindow: "Sept 9 – Dec 31, 2026",
  categories: "Southeast Asia Tours, Airport Transfers & Attraction Tickets"
};

export function LoadingSkeleton({ minHeight = 220, label }: { minHeight?: number; label: string }) {
  return (
    <div
      className="w-full flex flex-col justify-between p-5 bg-slate-50/80 border border-slate-200/60 rounded-xl animate-pulse"
      style={{ minHeight }}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-5/6" />
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-2/3" />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-4 border-t border-slate-200/40">
        <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
        <span className="text-[11px] font-mono tracking-tight font-medium text-slate-500">
          {label}
        </span>
      </div>
    </div>
  );
}

/* Generic script-injecting widget shell — mirrors the existing
   TravelpayoutsEmbed.tsx pattern already used for Aviasales in this project. */
function ScriptWidget({
  src,
  minHeight = 220,
  loadingLabel,
  fallbackUrl,
  fallbackText
}: {
  src: string;
  minHeight?: number;
  loadingLabel: string;
  fallbackUrl: string;
  fallbackText: string;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">("loading");
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptContainerRef.current) return;
    scriptContainerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = src;
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
  }, [src]);

  return (
    <div
      className="w-full bg-white rounded-lg p-2 overflow-hidden"
      style={{ minHeight }}
    >
      {status === "failed" && (
        <div className="flex flex-col items-center justify-center py-6 px-4 text-center space-y-3">
          <span className="text-xs text-slate-500 font-mono">This interactive tool is taking longer than expected to load.</span>
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1.5 bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            {fallbackText} <ExternalLink size={12} />
          </a>
        </div>
      )}

      {status === "loading" && (
        <LoadingSkeleton minHeight={minHeight - 20} label={loadingLabel} />
      )}

      <div 
        ref={scriptContainerRef} 
        style={{ display: status === "loaded" ? "block" : "none" }}
      />
    </div>
  );
}

/* 02. Klook — Activities & Things To Do widget */
export function KlookActivitiesWidget() {
  return <KlookEmbed />;
}

/* 04. Kiwitaxi — Airport Transfers / Shuttles widget */
export function KiwitaxiTransferWidget() {
  return <KiwitaxiEmbed />;
}

/* 04b. Welcome Pickups — Arrival Gate Meet-and-Greet Airport Transfers widget */
export function WelcomePickupsWidget({ defaultCountry }: { defaultCountry?: string }) {
  return <WelcomePickupsEmbed defaultCountry={defaultCountry} />;
}

/* 05. Airalo — eSIM / connectivity widget */
export function AiraloEsimWidget() {
  return <AiraloEmbed />;
}

/* 06. QEEQ — Car Rental widget */
export function QeeqCarRentalWidget() {
  return <QeeqEmbed />;
}


/* Styled outbound link button — used for KKday (link-only, no widget exists)
   and as a fallback/secondary CTA next to any widget above. */
export function PartnerLinkButton({
  href,
  label,
  variant = "light"
}: {
  href: string;
  label: string;
  variant?: "light" | "dark";
}) {
  const handleClick = () => {
    // 1. Log analytics tracking event to console
    console.log(`[Affiliate Partner Click] Label: "${label}" | URL: ${href} | Timestamp: ${new Date().toISOString()}`);

    // 2. Push event to standard web dataLayer if present
    if (typeof window !== "undefined") {
      const dataLayer = (window as any).dataLayer || [];
      dataLayer.push({
        event: "affiliate_partner_click",
        partner_label: label,
        partner_url: href,
        timestamp: new Date().toISOString()
      });
      (window as any).dataLayer = dataLayer;
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      className={
        variant === "dark"
          ? "inline-flex items-center gap-1.5 bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          : "inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#F6B73C] text-[#102A43] font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
      }
    >
      {label} <ExternalLink size={12} />
    </a>
  );
}
