import React from "react";
import { ExternalLink, Compass, Wifi, Car, ArrowRight } from "lucide-react";
import { KlookEmbed } from "./KlookEmbed";
import { KiwitaxiEmbed } from "./KiwitaxiEmbed";
import { AiraloEmbed } from "./AiraloEmbed";
import { QeeqEmbed } from "./QeeqEmbed";

interface TravelEssentialsProps {
  country: string;
}

export function TravelEssentials({ country }: TravelEssentialsProps) {
  // Helper to map country to appropriate Klook City ID
  const parseKlookCityId = (cName: string): number => {
    const formatted = cName.toLowerCase();
    if (formatted.includes("nepal")) return 98; // Kathmandu
    if (formatted.includes("thailand")) return 6; // Bangkok
    if (formatted.includes("malaysia")) return 14; // Kuala Lumpur
    if (formatted.includes("uae") || formatted.includes("dubai")) return 9; // Dubai
    return 9; // Fallback
  };

  const cityId = parseKlookCityId(country);

  return (
    <div className="space-y-10 py-4">
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-3">
        <span className="text-[10px] font-mono font-bold text-[#102A43] uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">
          In-Country Comfort Guides
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 mt-2">
          Travel Essentials for {country}
        </h3>
        <p className="text-xs text-slate-500 font-sans">
          Arrive with confidence. Search airport transfers, eSIM profiles, activities, and rentals synced directly to {country}'s local logistics.
        </p>
      </div>

      {/* PARENT RESPONSIVE COOP GRID (Flights -> Visa -> Hotel are already handled on the page) */}
      {/* 
          Order of "moment in the journey" specified:
          1. Getting Around (transfers [Kiwitaxi] + car rental [QEEQ])
          2. Activities (Klook / KKday)
          3. Stay Connected (Airalo eSIM)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 🚗 1. GETTING AROUND: AIRPORT TRANSFERS (Kiwitaxi) */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#102A43]/10 text-[#102A43] rounded-lg">
                <Car size={16} />
              </span>
              <div>
                <h4 className="font-serif font-black text-sm text-slate-900">Airport Taxi & Shuttles</h4>
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold">Recommended for families & late arrivals</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 font-light font-sans leading-relaxed">
              Skip taxi scams and language barriers at the gate. Pre-book an English-speaking private driver with a clean vehicle.
            </p>

            {/* Widget Container */}
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <KiwitaxiEmbed />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 mt-4 flex flex-col gap-2">
            <a
              href="https://kiwitaxi.tpo.li/GIhvhrtF"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-center transition-all inline-flex items-center justify-center gap-1.5"
            >
              Secure Driver Booking via Kiwitaxi <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* 🎟️ 2. ACTIVITIES: TOURS & ATTRACTIONS (Klook & KKday) */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#102A43]/10 text-[#102A43] rounded-lg">
                <Compass size={16} />
              </span>
              <div>
                <h4 className="font-serif font-black text-sm text-slate-900">Guided Tours & Local Passes</h4>
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold">Unmissable curated sightseeing</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-light font-sans leading-relaxed">
              Secure skip-the-line entries, amusement park vouchers, and private tour experiences at lowest guaranteed price.
            </p>

            {/* Widget Container */}
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <KlookEmbed cityId={cityId} />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 mt-4 space-y-3">
            <div className="space-y-2">
              {/* Klook Button - Primary */}
              <a
                href="https://klook.tpo.li/IYOU76Bn"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="w-full bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-center transition-all inline-flex items-center justify-center gap-1.5"
              >
                Search Attraction Passes on Klook <ExternalLink size={12} />
              </a>

              {/* KKday Button - Secondary (Always directly below Klook as requested in Rule 2) */}
              <div className="text-center pt-1">
                <span className="text-[10px] text-slate-450 uppercase font-mono tracking-wider block mb-1">Alternative activity booking:</span>
                <a
                  href="https://kkday.tpo.li/3Ecyxris"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full bg-white border border-slate-200 hover:border-[#F6B73C] text-[#102A43] font-bold text-xs py-2 px-4 rounded-xl text-center transition-all inline-flex items-center justify-center gap-1.5 hover:shadow-xs"
                >
                  Browse KKDay Activity Catalog <ArrowRight size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 📶 3. STAY CONNECTED: TRAVEL eSIM & MOBILE DATA (Airalo) */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#102A43]/10 text-[#102A43] rounded-lg">
                <Wifi size={16} />
              </span>
              <div>
                <h4 className="font-serif font-black text-sm text-slate-900">Stay Connected: Travel eSIM</h4>
                <p className="text-[10px] uppercase font-mono text-slate-400 font-bold">Instant eSIM activation on arrival</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-light font-sans leading-relaxed">
              Don't queue for local SIM cards or overpay for roaming. Download a digital eSIM for {country} immediately before takeoff.
            </p>

            {/* Widget Container */}
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <AiraloEmbed />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 mt-4 flex flex-col gap-2">
            <a
              href="https://airalo.tpo.li/mV2QXsXK"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-full bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-center transition-all inline-flex items-center justify-center gap-1.5"
            >
              Get Local Data Plans via Airalo eSIM <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* 🚙 4. GETTING AROUND: CAR RENTALS (QEEQ) */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left side: Info & Call to Action */}
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-[#102A43]/10 text-[#102A43] rounded-lg">
                    <Car size={16} />
                  </span>
                  <div>
                    <h4 className="font-serif font-black text-sm text-slate-900">Affordable Luxury Car Rentals</h4>
                    <p className="text-[10px] uppercase font-mono text-slate-400 font-bold">Unlimited mileage & free cancellation</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-light font-sans leading-relaxed">
                  Perfect for exploring locations at your own pace. Compare national rental agents and secure standard coverage policies instantly across top global operators.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-2">
                <a
                  href="https://qeeq.tpo.li/nooi5oSG"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full bg-[#F6B73C] text-[#102A43] hover:bg-[#ffc654] font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-center transition-all inline-flex items-center justify-center gap-1.5"
                >
                  Compare Rental Fleet Rates via QEEQ <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Right side: Embed Widget */}
            <div className="bg-white p-2 rounded-xl border border-slate-200 flex flex-col justify-center min-h-[180px]">
              <QeeqEmbed />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
