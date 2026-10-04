import React, { useState } from "react";
import { ExternalLink, Compass, Wifi, Car, KeyRound, ArrowRight } from "lucide-react";
import { KlookEmbed } from "./KlookEmbed";
import { KiwitaxiEmbed } from "./KiwitaxiEmbed";
import { AiraloEmbed } from "./AiraloEmbed";
import { QeeqEmbed } from "./QeeqEmbed";
import { WelcomePickupsEmbed } from "./WelcomePickupsEmbed";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";

export type EssentialsTab = "transfers" | "activities" | "esim" | "rentals";

interface TravelEssentialsProps {
  country: string;
  defaultTab?: EssentialsTab;
  compactHeader?: boolean;
  lang?: "en" | "bn";
}

export function TravelEssentials({
  country,
  defaultTab = "transfers",
  compactHeader = false,
  lang = "en",
}: TravelEssentialsProps) {
  const [activeTab, setActiveTab] = useState<EssentialsTab>(defaultTab);
  const [transferProvider, setTransferProvider] = useState<"welcome" | "kiwitaxi">("welcome");
  const isBn = lang === "bn";

  // Helper to map country to appropriate Klook City ID
  const parseKlookCityId = (cName: string): number => {
    const formatted = cName.toLowerCase();
    if (formatted.includes("nepal") || formatted.includes("kathmandu")) return 98;
    if (formatted.includes("thailand") || formatted.includes("bangkok")) return 6;
    if (formatted.includes("malaysia") || formatted.includes("kuala")) return 14;
    if (formatted.includes("singapore")) return 15;
    if (formatted.includes("maldives")) return 110;
    if (formatted.includes("uae") || formatted.includes("dubai")) return 9;
    return 9;
  };

  const cityId = parseKlookCityId(country);

  const tabs: Array<{
    id: EssentialsTab;
    label: string;
    partnerSummary: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "transfers",
      label: isBn ? "Airport Transfer ও Pickup" : "Airport Pickups",
      partnerSummary: "Welcome Pickups · Kiwitaxi",
      icon: <Car size={15} />,
    },
    {
      id: "activities",
      label: isBn ? "Tours ও Theme Park Pass" : "Tours & Passes",
      partnerSummary: "Klook · KKday",
      icon: <Compass size={15} />,
    },
    {
      id: "esim",
      label: isBn ? "Travel eSIM (ডাটা)" : "Travel eSIM",
      partnerSummary: "Airalo Instant Data",
      icon: <Wifi size={15} />,
    },
    {
      id: "rentals",
      label: isBn ? "Car Rental (গাড়ি ভাড়া)" : "Car Rental",
      partnerSummary: "QEEQ Global Fleet",
      icon: <KeyRound size={15} />,
    },
  ];

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
      {/* Clean Header + Segmented Tab Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-brand-navy">
              {isBn ? "ভ্রমণের জরুরি সেবাসমূহ (Travel Essentials)" : "In-Country Travel Essentials"}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? `${country}-এর জন্য প্রযোজ্য` : `Synced for ${country}`}</span>
            <span aria-hidden="true">·</span>
            <span>{isBn ? "সব সেবা এক জায়গায়" : "Single-View Booking Hub"}</span>
          </div>
          <h3
            className={`font-serif font-bold text-slate-900 tracking-tight ${
              compactHeader ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            {isBn
              ? "Airport Transfer, Sightseeing Tour, Travel eSIM ও Car Rental"
              : "Airport Transfers, Activities, eSIM & Car Rental"}
          </h3>
        </div>

        {/* Interactive Segmented Tab Bar */}
        <div
          role="tablist"
          aria-label="Travel Essentials Categories"
          className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto shrink-0"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-brand-navy text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className={isActive ? "text-[#F6B73C]" : "text-slate-500"}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: AIRPORT PICKUPS & TRANSFERS (Welcome Pickups + Kiwitaxi) */}
      {activeTab === "transfers" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/80">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-slate-900">
                Choose Your Airport Transfer Partner for {country}
              </div>
              <p className="text-[11px] text-slate-500">
                Welcome Pickups includes arrival-gate meet & greet with flight tracking; Kiwitaxi offers budget point-to-point shuttles.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg shrink-0 self-start sm:self-center">
              <button
                type="button"
                onClick={() => setTransferProvider("welcome")}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  transferProvider === "welcome"
                    ? "bg-white text-brand-navy font-semibold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Welcome Pickups (Meet & Greet)
              </button>
              <button
                type="button"
                onClick={() => setTransferProvider("kiwitaxi")}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  transferProvider === "kiwitaxi"
                    ? "bg-white text-brand-navy font-semibold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Kiwitaxi (Standard Shuttle)
              </button>
            </div>
          </div>

          {transferProvider === "welcome" ? (
            <WelcomePickupsEmbed defaultCountry={country} />
          ) : (
            <div className="space-y-3">
              <KiwitaxiEmbed />
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                <span>Fixed price per car · Free cancellation up to 24h before arrival</span>
                <a
                  href={resolvePartnerUrl(AFFILIATE_LINKS.kiwitaxi)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="font-semibold text-brand-navy hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Kiwitaxi Direct</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TOURS & ATTRACTION PASSES (Klook + Go City + KKday) */}
      {activeTab === "activities" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fade-in">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">Hotels, Tours &amp; All-Inclusive City Passes</span>
              <span aria-hidden="true">·</span>
              <span>Instant Mobile QR Vouchers</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Hotels, Guided Day Tours &amp; All-Inclusive / Explorer Passes in {country}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Book verified hotels, theme parks, and sightseeing tours on Klook, or bundle 3 to 10+ top landmarks on a single <strong>Go City All-Inclusive Pass</strong> or <strong>Explorer Pass</strong> to save up to 50% at the gate.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.klook)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-bold text-xs py-2.5 px-4 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Klook Hotels &amp; Tours</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.goCity)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-brand-navy text-[#F6B73C] hover:bg-slate-800 font-bold text-xs py-2.5 px-4 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Go City All-Inclusive &amp; Explorer Pass</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.kkday)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Browse KKday Catalog</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <KlookEmbed cityId={cityId} />
          </div>
        </div>
      )}

      {/* TAB 3: STAY CONNECTED (Airalo Travel eSIM) */}
      {activeTab === "esim" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fade-in">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">Digital Travel eSIM</span>
              <span aria-hidden="true">·</span>
              <span>Zero Roaming Bill Shock</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Land in {country} with High-Speed 4G/5G Data Already Active
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Skip long airport SIM queues and passport registration counters. Install an Airalo digital eSIM in Dhaka before takeoff so Grab, Uber, Google Maps, and WhatsApp work the moment your plane touches down.
            </p>
            <div className="pt-2">
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.airalo)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-bold text-xs py-2.5 px-4 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>View All Airalo eSIM Plans</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AiraloEmbed />
          </div>
        </div>
      )}

      {/* TAB 4: SELF-DRIVE CAR RENTAL (QEEQ) */}
      {activeTab === "rentals" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center animate-fade-in">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">Self-Drive & Family Rentals</span>
              <span aria-hidden="true">·</span>
              <span>Free Cancellation</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Compare Airport & City Car Rental Fleets in {country}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exploring Malaysia's highways, Phuket's beaches, or Dubai's boulevards with an International Driving Permit? Compare verified global rental operators with transparent insurance coverage on QEEQ.
            </p>
            <div className="pt-2">
              <a
                href={resolvePartnerUrl(AFFILIATE_LINKS.qeeq)}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-bold text-xs py-2.5 px-4 rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Compare Car Rental Rates on QEEQ</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QeeqEmbed />
          </div>
        </div>
      )}

      {/* Quiet Quick-Access Partner Bar at Bottom */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>Direct Verified Partner Links:</span>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={resolvePartnerUrl(AFFILIATE_LINKS.welcomePickups)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hover:text-brand-navy hover:underline font-medium"
          >
            Welcome Pickups
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={resolvePartnerUrl(AFFILIATE_LINKS.kiwitaxi)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hover:text-brand-navy hover:underline font-medium"
          >
            Kiwitaxi
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={resolvePartnerUrl(AFFILIATE_LINKS.klook)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hover:text-brand-navy hover:underline font-medium"
          >
            Klook
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={resolvePartnerUrl(AFFILIATE_LINKS.kkday)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hover:text-brand-navy hover:underline font-medium"
          >
            KKday
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={resolvePartnerUrl(AFFILIATE_LINKS.airalo)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hover:text-brand-navy hover:underline font-medium"
          >
            Airalo eSIM
          </a>
          <span aria-hidden="true">·</span>
          <a
            href={resolvePartnerUrl(AFFILIATE_LINKS.qeeq)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="hover:text-brand-navy hover:underline font-medium"
          >
            QEEQ Cars
          </a>
        </div>
      </div>
    </section>
  );
}
