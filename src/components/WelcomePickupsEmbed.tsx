import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  Calendar,
  MapPin,
  Users,
  Plane,
  ShieldCheck,
  ExternalLink,
  Loader2,
  MessageCircle,
  Code2,
} from "lucide-react";

const WELCOME_PICKUPS_SCRIPT_SRC =
  "https://tpemd.com/content?promo_id=8951&campaign_id=627&powered_by=true&show_header=true&locale=en&shmarker=675992&trs=540277";

export const WELCOME_PICKUPS_PARTNER_URL =
  "https://tp.media/r?marker=675992&trs=540277&p=8951&u=https%3A%2F%2Fwww.welcomepickups.com&campaign_id=627";

interface RoutePreset {
  id: string;
  country: string;
  airport: string;
  defaultHotelZone: string;
  defaultFlightNo: string;
  sedanUsd: number;
  sedanBdt: number;
  minivanUsd: number;
  minivanBdt: number;
  duration: string;
  highlight: string;
}

const TRANSFER_ROUTES: RoutePreset[] = [
  {
    id: "bangkok",
    country: "Thailand",
    airport: "Bangkok Suvarnabhumi (BKK)",
    defaultHotelZone: "Sukhumvit / Pratunam Hotel",
    defaultFlightNo: "BG 388",
    sedanUsd: 32,
    sedanBdt: 3850,
    minivanUsd: 46,
    minivanBdt: 5500,
    duration: "40 mins",
    highlight: "Driver waits at Arrival Gate 3 with name sign · Highway tolls included",
  },
  {
    id: "kuala-lumpur",
    country: "Malaysia",
    airport: "Kuala Lumpur Intl (KUL / KLIA1 & KLIA2)",
    defaultHotelZone: "Bukit Bintang / KLCC City Center",
    defaultFlightNo: "BG 386",
    sedanUsd: 36,
    sedanBdt: 4300,
    minivanUsd: 54,
    minivanBdt: 6500,
    duration: "50 mins",
    highlight: "Ideal for late-night Dhaka arrivals (01:10 AM) · English-speaking driver",
  },
  {
    id: "dubai",
    country: "UAE",
    airport: "Dubai International (DXB Terminal 1/2/3)",
    defaultHotelZone: "Deira / Downtown Dubai / Marina",
    defaultFlightNo: "EK 585",
    sedanUsd: 39,
    sedanBdt: 4700,
    minivanUsd: 58,
    minivanBdt: 6950,
    duration: "25 mins",
    highlight: "60 mins free waiting time after landing for immigration clearance",
  },
  {
    id: "singapore",
    country: "Singapore",
    airport: "Singapore Changi Airport (SIN T1–T4)",
    defaultHotelZone: "Little India (Mustafa) / Bugis / Marina Bay",
    defaultFlightNo: "SQ 447",
    sedanUsd: 45,
    sedanBdt: 5400,
    minivanUsd: 65,
    minivanBdt: 7800,
    duration: "22 mins",
    highlight: "Door-to-door Changi pickup with luggage help & child booster seats",
  },
  {
    id: "nepal",
    country: "Nepal",
    airport: "Kathmandu Tribhuvan Airport (KTM)",
    defaultHotelZone: "Thamel / Lazimpat / Boudha",
    defaultFlightNo: "BG 371",
    sedanUsd: 18,
    sedanBdt: 2150,
    minivanUsd: 28,
    minivanBdt: 3350,
    duration: "20 mins",
    highlight: "Skip outside taxi haggling after Visa-on-Arrival counter",
  },
  {
    id: "maldives",
    country: "Maldives",
    airport: "Malé Velana International (MLE)",
    defaultHotelZone: "Hulhumalé Beachfront Hotel / Jetty Transfer",
    defaultFlightNo: "BS 337",
    sedanUsd: 24,
    sedanBdt: 2900,
    minivanUsd: 35,
    minivanBdt: 4200,
    duration: "15 mins",
    highlight: "Direct bridge transfer to Hulhumalé hotels or speedboat jetty",
  },
];

interface WelcomePickupsEmbedProps {
  defaultCountry?: string;
}

export function WelcomePickupsEmbed({ defaultCountry = "Thailand" }: WelcomePickupsEmbedProps) {
  const resolveInitialPreset = (cName: string): RoutePreset => {
    const lower = cName.toLowerCase();
    if (lower.includes("malaysia") || lower.includes("kuala")) return TRANSFER_ROUTES[1];
    if (lower.includes("dubai") || lower.includes("uae")) return TRANSFER_ROUTES[2];
    if (lower.includes("singapore")) return TRANSFER_ROUTES[3];
    if (lower.includes("nepal") || lower.includes("kathmandu")) return TRANSFER_ROUTES[4];
    if (lower.includes("maldives") || lower.includes("male")) return TRANSFER_ROUTES[5];
    return TRANSFER_ROUTES[0];
  };

  const initialPreset = resolveInitialPreset(defaultCountry);

  const [selectedRouteId, setSelectedRouteId] = useState<string>(initialPreset.id);
  const [hotelAddress, setHotelAddress] = useState<string>(initialPreset.defaultHotelZone);
  const [flightNumber, setFlightNumber] = useState<string>(initialPreset.defaultFlightNo);
  const [pickupDate, setPickupDate] = useState<string>("2026-10-15");
  const [passengers, setPassengers] = useState<number>(3);
  const [vehicleType, setVehicleType] = useState<"sedan" | "minivan">("sedan");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [showLiveScriptEmbed, setShowLiveScriptEmbed] = useState<boolean>(false);
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  // Sync when parent country changes
  useEffect(() => {
    const next = resolveInitialPreset(defaultCountry);
    setSelectedRouteId(next.id);
    setHotelAddress(next.defaultHotelZone);
    setFlightNumber(next.defaultFlightNo);
  }, [defaultCountry]);

  // Inject official Travelpayouts Welcome Pickups script (shmarker=675992, promo_id=8951) when toggled
  useEffect(() => {
    if (!showLiveScriptEmbed || !scriptContainerRef.current) return;
    scriptContainerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = WELCOME_PICKUPS_SCRIPT_SRC;
    script.async = true;
    script.charset = "utf-8";
    scriptContainerRef.current.appendChild(script);
  }, [showLiveScriptEmbed]);

  const activePreset =
    TRANSFER_ROUTES.find((r) => r.id === selectedRouteId) || TRANSFER_ROUTES[0];

  const handleRouteChange = (newId: string) => {
    setSelectedRouteId(newId);
    const found = TRANSFER_ROUTES.find((r) => r.id === newId);
    if (found) {
      setHotelAddress(found.defaultHotelZone);
      setFlightNumber(found.defaultFlightNo);
    }
  };

  const handlePassengerChange = (count: number) => {
    setPassengers(count);
    if (count >= 4) {
      setVehicleType("minivan");
    } else {
      setVehicleType("sedan");
    }
  };

  const estimatedUsd =
    vehicleType === "minivan" ? activePreset.minivanUsd : activePreset.sedanUsd;
  const estimatedBdt =
    vehicleType === "minivan" ? activePreset.minivanBdt : activePreset.sedanBdt;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      setIsRedirecting(false);
      window.open(WELCOME_PICKUPS_PARTNER_URL, "_blank", "noopener,noreferrer,sponsored");
    }, 600);
  };

  const whatsappPersonalBookingUrl = `https://wa.me/8801784385335?text=${encodeURIComponent(
    `Hi URAL Desk! Please help me book a Welcome Pickups airport transfer (BDT payment):\n• Route: ${activePreset.airport} → ${hotelAddress}\n• Flight: ${flightNumber} on ${pickupDate}\n• Passengers: ${passengers} (${vehicleType === "minivan" ? "Family Minivan" : "Private Sedan"})\n• Est. Fare: ~$${estimatedUsd} (৳${estimatedBdt.toLocaleString()} BDT)`
  )}`;

  return (
    <div className="w-full bg-white rounded-xl p-4 sm:p-5 border border-slate-200 font-sans space-y-4">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#102A43] text-[#F6B73C] rounded-lg shrink-0 mt-0.5">
            <Car size={18} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-serif font-bold text-base text-slate-900">
                Welcome Pickups — Arrival Gate Meet & Greet
              </h4>
              <span className="text-xs text-emerald-700 font-medium">
                · Flight Delay Monitoring Included
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              English-speaking driver waits inside the airport terminal holding your name sign · Flat pre-paid fare
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowLiveScriptEmbed((prev) => !prev)}
          className="self-start sm:self-center inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer"
        >
          <Code2 size={12} />
          <span>{showLiveScriptEmbed ? "Hide Official Embed" : "Official Widget"}</span>
        </button>
      </div>

      {/* Optional Official Travelpayouts Script Embed Container */}
      {showLiveScriptEmbed && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Travelpayouts Official Script (shmarker=675992 · promo_id=8951)</span>
            <a
              href={WELCOME_PICKUPS_PARTNER_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-[#102A43] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Open Direct</span>
              <ExternalLink size={10} />
            </a>
          </div>
          <div ref={scriptContainerRef} className="min-h-[120px] w-full overflow-x-auto" />
        </div>
      )}

      {/* Interactive Transfer Planner Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Airport Pickup */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin size={11} className="text-[#102A43]" /> Arrival Airport
            </label>
            <select
              value={selectedRouteId}
              onChange={(e) => handleRouteChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#102A43] transition-colors cursor-pointer"
            >
              {TRANSFER_ROUTES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.airport}
                </option>
              ))}
            </select>
          </div>

          {/* Drop-off Hotel / District */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin size={11} className="text-[#D4941A]" /> Destination Hotel / Area
            </label>
            <input
              type="text"
              value={hotelAddress}
              onChange={(e) => setHotelAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#102A43] transition-colors"
              placeholder="e.g. Sukhumvit Hotel, Bangkok"
              required
            />
          </div>

          {/* Flight Number + Arrival Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Plane size={11} className="text-[#102A43]" /> Flight #
              </label>
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#102A43] transition-colors"
                placeholder="BG 388"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar size={11} className="text-[#102A43]" /> Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#102A43] transition-colors"
                required
              />
            </div>
          </div>

          {/* Passengers & Vehicle Type */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Users size={11} className="text-[#102A43]" /> Travelers & Vehicle
            </label>
            <select
              value={passengers}
              onChange={(e) => handlePassengerChange(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#102A43] transition-colors cursor-pointer"
            >
              <option value={1}>1–2 Pax · Private Sedan</option>
              <option value={3}>3 Pax · Private Sedan</option>
              <option value={4}>4–5 Pax · Family Minivan</option>
              <option value={6}>6–7 Pax · Large Family Van</option>
            </select>
          </div>
        </div>

        {/* Live Route Summary & Action Bar */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Est. Flat Rate ({vehicleType === "minivan" ? "Family Minivan" : "Private Sedan"}):
              </span>
              <span className="font-mono font-bold text-[#102A43] tabular-nums">
                ৳{estimatedBdt.toLocaleString()} BDT
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-slate-500 tabular-nums">${estimatedUsd} USD</span>
              <span aria-hidden="true">·</span>
              <span>~{activePreset.duration} to hotel</span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
              <span>{activePreset.highlight}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="submit"
              disabled={isRedirecting}
              className="bg-[#F6B73C] hover:bg-[#ffc654] text-[#102A43] font-bold text-xs py-2.5 px-4 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer disabled:opacity-70"
            >
              {isRedirecting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Opening Welcome Pickups...</span>
                </>
              ) : (
                <>
                  <span>Book Driver on Welcome Pickups</span>
                  <ExternalLink size={12} />
                </>
              )}
            </button>

            <a
              href={whatsappPersonalBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs py-2.5 px-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
              title="No dual-currency card? URAL can book your pickup for you and you pay in BDT/bKash"
            >
              <MessageCircle size={13} className="text-emerald-600" />
              <span>No USD Card? Book via WhatsApp (BDT)</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
