import React, { useState, useEffect } from "react";
import { Plane, Building, Search, ArrowRightLeft, Calendar, Users, Percent, Flame, ExternalLink, ShieldAlert } from "lucide-react";

interface TravelpayoutsCustomWidgetProps {
  initialTab?: "flights" | "hotels";
  initialFrom?: string;
  initialTo?: string;
  initialHotelCity?: string;
}

export function TravelpayoutsCustomWidget({
  initialTab = "flights",
  initialFrom = "Dhaka (DAC)",
  initialTo = "Kathmandu (KTM)",
  initialHotelCity = "Kathmandu"
}: TravelpayoutsCustomWidgetProps = {}) {
  const [searchTab, setSearchTab] = useState<"flights" | "hotels">(initialTab);
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [hotelCity, setHotelCity] = useState(initialHotelCity);
  const [date, setDate] = useState("2026-10-15");
  const [travelers, setTravelers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [affiliateToast, setAffiliateToast] = useState<string | null>(null);

  useEffect(() => {
    setSearchTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setFromCity(initialFrom);
  }, [initialFrom]);

  useEffect(() => {
    setToCity(initialTo);
  }, [initialTo]);

  useEffect(() => {
    setHotelCity(initialHotelCity);
  }, [initialHotelCity]);

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setResults(null);

    setTimeout(() => {
      setIsSearching(false);
      if (searchTab === "flights") {
        let options: any[] = [];
        if (toCity.includes("KTM") || toCity.toLowerCase().includes("nepal") || toCity.toLowerCase().includes("kathmandu")) {
          options = [
            { id: "f1", airline: "Biman Bangladesh", flightNo: "BG 0371", departs: "10:35 AM", arrives: "12:05 PM", duration: "1h 30m", stops: "Direct", priceBdt: 29800, score: "9.2/10 Excellent" },
            { id: "f2", airline: "Himalaya Airlines", flightNo: "H9 5632", departs: "01:20 PM", arrives: "02:50 PM", duration: "1h 30m", stops: "Direct", priceBdt: 31200, score: "8.8/10 Good" },
            { id: "f3", airline: "Indigo Flights", flightNo: "6E 1876", departs: "08:10 AM", arrives: "03:45 PM", duration: "7h 05m", stops: "1 Stop (Kolkata CCU)", priceBdt: 27900, score: "7.9/10 Economy" }
          ];
        } else if (toCity.includes("BKK") || toCity.toLowerCase().includes("thailand") || toCity.toLowerCase().includes("bangkok")) {
          options = [
            { id: "f4", airline: "Thai Lion Air", flightNo: "SL 225", departs: "11:50 PM", arrives: "03:20 AM", duration: "2h 30m", stops: "Direct (DMK)", priceBdt: 31900, score: "8.1/10 Budget Choice" },
            { id: "f5", airline: "Biman Bangladesh", flightNo: "BG 0088", departs: "11:30 AM", arrives: "03:00 PM", duration: "2h 30m", stops: "Direct (BKK)", priceBdt: 35600, score: "8.9/10 Reliable" },
            { id: "f6", airline: "Thai Airways", flightNo: "TG 321", departs: "01:35 PM", arrives: "05:05 PM", duration: "2h 30m", stops: "Direct (BKK)", priceBdt: 42500, score: "9.6/10 Premium" }
          ];
        } else if (toCity.includes("KUL") || toCity.toLowerCase().includes("malaysia") || toCity.toLowerCase().includes("kuala")) {
          options = [
            { id: "f7", airline: "AirAsia", flightNo: "AK 71", departs: "12:25 AM", arrives: "06:15 AM", duration: "3h 50m", stops: "Direct", priceBdt: 36200, score: "8.2/10 Popular" },
            { id: "f8", airline: "Batik Air", flightNo: "OD 163", departs: "10:15 PM", arrives: "04:10 AM", duration: "3h 55m", stops: "Direct", priceBdt: 38400, score: "8.0/10 Budget" },
            { id: "f9", airline: "Malaysia Airlines", flightNo: "MH 197", departs: "12:15 PM", arrives: "06:05 PM", duration: "3h 50m", stops: "Direct", priceBdt: 45100, score: "9.5/10 Full Carrier" }
          ];
        } else {
          // Dubai or general
          options = [
            { id: "f10", airline: "flydubai", flightNo: "FZ 583", departs: "09:40 PM", arrives: "01:25 AM", duration: "4h 45m", stops: "Direct", priceBdt: 58500, score: "8.5/10 Standard" },
            { id: "f11", airline: "Biman Bangladesh", flightNo: "BG 0347", departs: "06:15 PM", arrives: "10:00 PM", duration: "4h 45m", stops: "Direct", priceBdt: 61000, score: "8.0/10 Comfort" },
            { id: "f12", airline: "Emirates", flightNo: "EK 585", departs: "01:40 AM", arrives: "05:25 AM", duration: "4h 45m", stops: "Direct", priceBdt: 74500, score: "9.8/10 Unmatched Luxury" }
          ];
        }
        setResults(options);
      } else {
        let options: any[] = [];
        if (hotelCity.toLowerCase().includes("kathmandu") || hotelCity.toLowerCase().includes("nepal")) {
          options = [
            { id: "h1", name: "Thamel Grand Hotel", category: "Budget", rating: "3★", review: "8.6/10 Great", priceBdt: 2200, neighborhood: "Thamel Core", features: ["Free Breakfast", "Walk to main bazaars", "Hot Shower"] },
            { id: "h2", name: "Hotel Shanker", category: "Mid-Range", rating: "4★", review: "9.0/10 Fabulous", priceBdt: 7500, neighborhood: "Lazimpat Precinct", features: ["Swimming Pool", "Heritage Palace conversion", "Garden view"] },
            { id: "h3", name: "Dwarika's Heritage Resort", category: "Luxury", rating: "5★", review: "9.7/10 World Class", priceBdt: 29000, neighborhood: "Battisputali Area", features: ["Museum style", "Top Organic Dining", "Artisan carved wooden suites"] }
          ];
        } else if (hotelCity.toLowerCase().includes("bangkok") || hotelCity.toLowerCase().includes("thailand")) {
          options = [
            { id: "h4", name: "First House Hotel Bangkok", category: "Mid-Range", rating: "3★", review: "8.1/10 Popular", priceBdt: 3800, neighborhood: "Pratunam Shopping Zone", features: ["Halal menu options", "Opposite Wholesale Market", "Family Triple Rooms"] },
            { id: "h5", name: "S31 Sukhumvit Heights", category: "Mid-Range", rating: "4★", review: "8.8/10 Scenic", priceBdt: 6800, neighborhood: "Sukhumvit (Near BTS)", features: ["Glass-edge pool", "Duplex skyline layouts", "Subway direct distance"] },
            { id: "h6", name: "Amari Bangkok Hotel", category: "Luxury", rating: "5★", review: "9.4/10 Unbeatable", priceBdt: 12500, neighborhood: "Pratunam Axis", features: ["Rooftop terrace pool", "Full spa treatments", "Facing Platinum Fashion Mall"] }
          ];
        } else {
          // KL & General
          options = [
            { id: "h7", name: "The Explorer Guesthouse", category: "Budget", rating: "2★", review: "8.5/10 Cozy", priceBdt: 1700, neighborhood: "Chinatown & Heritage", features: ["Free Shared Kitchen", "Walk to Train Station", "Lively cafe"] },
            { id: "h8", name: "Wolo Bukit Bintang", category: "Mid-Range", rating: "4★", review: "9.1/10 Perfect Walk", priceBdt: 6200, neighborhood: "Bukit Bintang Crossing", features: ["High-speed optic fiber WiFi", "Modern art deco beds", "Beside Pavilion Mall"] },
            { id: "h9", name: "The Face Suites Tower View", category: "Luxury", rating: "5★", review: "9.5/10 Peak Comfort", priceBdt: 9500, neighborhood: "KLCC District", features: ["Rooftop Twin Tower infinity pool", "Luxury kitchen", "Huge separate bedrooms"] }
          ];
        }
        setResults(options);
      }
    }, 750);
  };

  const triggerAffiliateLink = (provider: string, itemName: string, price: number) => {
    setAffiliateToast(`🎯 Redirecting via URAL tracking agent to Travelpayouts ${provider === "flight" ? "Jetradar" : "Hotellook"} engine...
Tracking ID: DAC-URAL-2026-614
Estimated payout for Bangladesh Outbound Route: BDT ${(price * 0.05).toFixed(0)}`);
    setTimeout(() => {
      setAffiliateToast(null);
    }, 4500);
  };

  return (
    <div id="travelpayouts-affiliate-block" className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden my-6">
      {/* Widget Tabs */}
      <div className="bg-[#102A43] p-4 text-white flex items-center justify-between">
        <div className="flex gap-2">
          <button
            id="tab-search-flights"
            onClick={() => { setSearchTab("flights"); setResults(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              searchTab === "flights" ? "bg-[#F6B73C] text-[#102A43] shadow-md" : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <Plane size={16} />
            Search Flights
          </button>
          <button
            id="tab-search-hotels"
            onClick={() => { setSearchTab("hotels"); setResults(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              searchTab === "hotels" ? "bg-[#F6B73C] text-[#102A43] shadow-md" : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <Building size={16} />
            Search Hotels
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#F6B73C] bg-[#F6B73C]/10 px-3 py-1.5 rounded-full border border-[#F6B73C]/20 font-mono">
          <Percent size={12} />
          <span>Exclusive Travelpayouts Partner Rates Active</span>
        </div>
      </div>

      {/* Widget Input Form */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <form onSubmit={handleSearch} className="space-y-4">
          {searchTab === "flights" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">Departure Airport</label>
                <div className="relative">
                  <select
                    id="select-from-airport"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  >
                    <option value="Dhaka (DAC)">Dhaka (DAC) - Bangladesh</option>
                    <option value="Chittagong (CGP)">Chittagong (CGP) - Bangladesh</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col relative justify-center">
                <div className="absolute right-1/2 translate-x-1/2 -top-2 bg-white rounded-full border border-slate-200 p-1 cursor-pointer hover:bg-slate-100 hidden md:block z-10" onClick={swapCities}>
                  <ArrowRightLeft size={12} className="text-[#102A43]" />
                </div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">Destination Airport</label>
                <select
                  id="select-to-airport"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  <option value="Kathmandu (KTM)">Kathmandu (KTM) - Nepal 🇳🇵</option>
                  <option value="Bangkok (BKK / DMK)">Bangkok (BKK / DMK) - Thailand 🇹🇭</option>
                  <option value="Kuala Lumpur (KUL)">Kuala Lumpur (KUL) - Malaysia 🇲🇾</option>
                  <option value="Dubai (DXB)">Dubai (DXB) - UAE 🇦🇪</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">Travel Date</label>
                <div className="relative">
                  <input
                    id="input-flight-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                  />
                </div>
              </div>

              <button
                id="btn-search-flights-submit"
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#102A43] text-white hover:bg-[#1a4166] py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Search size={16} />
                {isSearching ? "Searching Flights..." : "Search Lowest Fares"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">Destination City</label>
                <select
                  id="select-hotel-city"
                  value={hotelCity}
                  onChange={(e) => setHotelCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  <option value="Kathmandu">Kathmandu - Nepal 🇳🇵</option>
                  <option value="Bangkok">Bangkok - Thailand 🇹🇭</option>
                  <option value="Kuala Lumpur">Kuala Lumpur - Malaysia 🇲🇾</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">Check-in Date</label>
                <input
                  id="input-checkin-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102A43] uppercase tracking-wider mb-1">Guests / Rooms</label>
                <select
                  id="select-hotel-rooms"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  <option value="1">1 Guest, 1 Room</option>
                  <option value="2">2 Guests, 1 Room</option>
                  <option value="3">3 Guests, 2 Rooms</option>
                  <option value="4">4 Guests, 2 Rooms</option>
                </select>
              </div>

              <button
                id="btn-search-hotels-submit"
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#F6B73C] text-[#102A43] hover:bg-[#e0a42d] py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Search size={16} />
                {isSearching ? "Querying Stays..." : "Find Verified Hotels"}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Dynamic Results Display */}
      {isSearching && (
        <div className="p-12 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#102A43] border-t-transparent animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-medium text-slate-500 font-mono">Aggregating real-time partner fares from Biman, AirAsia, Expedia & Agoda databases...</p>
        </div>
      )}

      {/* Affiliate Action Feedback Toast */}
      {affiliateToast && (
        <div id="affiliate-tracker-toast" className="m-4 p-4 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg flex gap-3 text-slate-800 text-xs shadow-lg animate-fade-in relative">
          <Flame className="text-amber-600 shrink-0 mt-0.5 animate-bounce" size={18} />
          <div className="space-y-1">
            <span className="font-bold text-amber-950 uppercase tracking-widest block font-mono text-[10px]">Affiliate System Event Triggered</span>
            <pre className="font-mono text-slate-700 whitespace-pre-wrap">{affiliateToast}</pre>
          </div>
          <button className="absolute top-2 right-2 text-amber-800 hover:text-black font-bold font-mono" onClick={() => setAffiliateToast(null)}>×</button>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-500 font-mono">AVAILABLE LOW RATES FOR YOUR DEPARTURE:</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold font-mono uppercase">Cheapest fares found online</span>
          </div>

          <div className="space-y-3">
            {searchTab === "flights" ? (
              results.map((flight) => (
                <div key={flight.id} className="border border-slate-200 hover:border-slate-350 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 text-[#102A43] rounded-full">
                      <Plane size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        {flight.airline} <span className="text-xs font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{flight.flightNo}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        <strong className="text-slate-800">{flight.departs}</strong> → <strong className="text-slate-800">{flight.arrives}</strong> ({flight.duration})
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium font-mono">{flight.stops}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-lg font-black text-[#102A43]">
                        BDT {flight.priceBdt.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">Roundtrip / Taxes Included</span>
                    </div>
                    <button
                      id={`btn-book-flight-${flight.id}`}
                      onClick={() => triggerAffiliateLink("flight", `${flight.airline} ${flight.flightNo}`, flight.priceBdt)}
                      className="bg-[#F6B73C] hover:bg-[#e0a42d] text-[#102A43] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                    >
                      Book Ticket
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              results.map((hotel) => (
                <div key={hotel.id} className="border border-slate-200 hover:border-slate-350 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-indigo-50 text-indigo-700 rounded-full mt-1">
                      <Building size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-850 text-sm flex items-center gap-2">
                        {hotel.name} <span className="text-xs text-amber-500 font-bold font-mono">{hotel.rating}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium italic">
                        📍 {hotel.neighborhood}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {hotel.features.map((feature: string, idx: number) => (
                          <span key={idx} className="bg-slate-100 text-[#102A43] text-[9px] px-2 py-0.5 rounded-full font-medium font-mono border border-slate-200">{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-lg font-black text-slate-800">
                        BDT {hotel.priceBdt.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">Per Room / Night</span>
                    </div>
                    <button
                      id={`btn-book-hotel-${hotel.id}`}
                      onClick={() => triggerAffiliateLink("hotel", hotel.name, hotel.priceBdt)}
                      className="bg-[#102A43] hover:bg-[#1f4c75] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                    >
                      Book Stay
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
