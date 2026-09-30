import React, { useState, useId } from "react";
import { ExternalLink, Car, Calendar, MapPin, Users, Loader2 } from "lucide-react";

export function KiwitaxiEmbed() {
  const uid = useId();
  const [pickup, setPickup] = useState("Kathmandu Airport (KTM)");
  const [destination, setDestination] = useState("Thamel City Center Hotel");
  const [date, setDate] = useState("2026-07-15");
  const [passengers, setPassengers] = useState("2");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://kiwitaxi.tpo.li/GIhvhrtF", "_blank", "noopener,noreferrer,sponsored");
    }, 1000);
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-100 relative overflow-hidden font-sans">
      <div className="flex items-center gap-2.5 mb-3.5">
        <div className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg">
          <Car size={18} />
        </div>
        <div>
          <h4 className="font-serif font-black text-sm text-slate-900">Book Transfers on Kiwitaxi</h4>
          <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">English-Speaking Drivers • Fixed Rates</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Pickup */}
          <div>
            <label htmlFor={`${uid}-pickup`} className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin size={9} className="text-emerald-500" /> From (Airport or City)
            </label>
            <input
              id={`${uid}-pickup`}
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="e.g. Dhaka Airport"
              required
            />
          </div>

          {/* Destination */}
          <div>
            <label htmlFor={`${uid}-destination`} className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <MapPin size={9} className="text-emerald-500" /> To (Hotel or Address)
            </label>
            <input
              id={`${uid}-destination`}
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="e.g. Hotel Radisson"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Date */}
          <div>
            <label htmlFor={`${uid}-date`} className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Calendar size={9} className="text-emerald-500" /> Transfer Date
            </label>
            <input
              id={`${uid}-date`}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              required
            />
          </div>

          {/* Passengers */}
          <div>
            <label htmlFor={`${uid}-passengers`} className="block text-[9px] font-bold text-slate-600 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Users size={9} className="text-emerald-500" /> Passengers
            </label>
            <select
              id={`${uid}-passengers`}
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            >
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4 Passengers</option>
              <option value="5">5+ Passengers</option>
            </select>
          </div>
        </div>

        {/* Dual Transfer Partner Buttons: Kiwitaxi + GetTransfer.com (Intercity Vans & Driver Bidding) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="submit"
            disabled={isRedirecting}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
          >
            {isRedirecting ? (
              <>
                <Loader2 size={12} className="animate-spin text-white" />
                <span>Opening Kiwitaxi...</span>
              </>
            ) : (
              <>
                <span>Fixed Rate on Kiwitaxi</span>
                <ExternalLink size={11} />
              </>
            )}
          </button>

          <a
            href="https://gettransfer.tpo.li/sekWRAM1"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-xs py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <span>Compare Driver Bids (GetTransfer)</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </form>
    </div>
  );
}
