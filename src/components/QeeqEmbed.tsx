import React, { useState } from "react";
import { ExternalLink, Car, Calendar, MapPin, Loader2 } from "lucide-react";

export function QeeqEmbed() {
  const [pickupLocation, setPickupLocation] = useState("Kathmandu Airport (KTM)");
  const [dropoffLocation, setDropoffLocation] = useState("Kathmandu Airport (KTM)");
  const [pickupDate, setPickupDate] = useState("2026-07-15");
  const [dropoffDate, setDropoffDate] = useState("2026-07-22");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    // Simulate premium affiliate routing delay for visual feedback
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://qeeq.tpo.li/nooi5oSG", "_blank", "noopener,noreferrer,sponsored");
    }, 1000);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-100 relative overflow-hidden font-sans">
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="p-1.5 bg-[#F6B73C]/10 text-[#F6B73C] rounded-lg">
          <Car size={18} />
        </div>
        <div>
          <h4 className="font-serif font-black text-sm text-slate-900">Find Car Rentals on QEEQ</h4>
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Best Price Guarantee • Free Cancellation</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Pickup */}
          <div>
            <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin size={9} className="text-[#F6B73C]" /> Pick-up Location
            </label>
            <input
              type="text"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6B73C] focus:border-[#F6B73C] transition-all"
              placeholder="City, airport, or hotel"
              required
            />
          </div>

          {/* Dropoff */}
          <div>
            <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin size={9} className="text-[#F6B73C]" /> Drop-off Location
            </label>
            <input
              type="text"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#F6B73C] focus:border-[#F6B73C] transition-all"
              placeholder="Same as pick-up location"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Pickup Date */}
          <div>
            <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar size={9} className="text-[#F6B73C]" /> Pick-up Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#F6B73C] focus:border-[#F6B73C] transition-all"
              required
            />
          </div>

          {/* Dropoff Date */}
          <div>
            <label className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar size={9} className="text-[#F6B73C]" /> Drop-off Date
            </label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#F6B73C] focus:border-[#F6B73C] transition-all"
              required
            />
          </div>
        </div>

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
              <span>Search Cars on QEEQ</span>
              <ExternalLink size={11} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
