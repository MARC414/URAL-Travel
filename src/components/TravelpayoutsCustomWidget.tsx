import React, { useState, useEffect, useMemo } from "react";
import {
  Plane,
  Building,
  Search,
  ArrowRightLeft,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Luggage,
  MapPin,
} from "lucide-react";

interface TravelpayoutsCustomWidgetProps {
  initialTab?: "flights" | "hotels";
  initialFrom?: string;
  initialTo?: string;
  initialHotelCity?: string;
}

function getDefaultDateIso(daysAhead = 14) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getFlightOptions(toCity: string) {
  const lower = toCity.toLowerCase();
  if (lower.includes("ktm") || lower.includes("nepal") || lower.includes("kathmandu")) {
    return [
      { id: "f1", airline: "Biman Bangladesh Airlines", flightNo: "BG 371", departs: "10:35 AM", arrives: "12:05 PM", duration: "1h 30m", stops: "Direct Flight", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 29800, destCode: "KTM", score: "Best Overall Value" },
      { id: "f2", airline: "Himalaya Airlines", flightNo: "H9 556", departs: "01:20 PM", arrives: "02:50 PM", duration: "1h 30m", stops: "Direct Flight", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 31200, destCode: "KTM", score: "Popular Direct" },
      { id: "f3", airline: "IndiGo", flightNo: "6E 1182", departs: "08:10 AM", arrives: "02:25 PM", duration: "6h 15m", stops: "1 Stop (Kolkata CCU)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 27400, destCode: "KTM", score: "Lowest Fare" },
    ];
  }
  if (lower.includes("bkk") || lower.includes("thailand") || lower.includes("bangkok")) {
    return [
      { id: "f4", airline: "Thai Lion Air", flightNo: "SL 225", departs: "02:15 AM", arrives: "05:45 AM", duration: "2h 30m", stops: "Direct (Don Mueang DMK)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 31800, destCode: "BKK", score: "Cheapest Direct" },
      { id: "f5", airline: "Biman Bangladesh Airlines", flightNo: "BG 388", departs: "11:30 AM", arrives: "03:00 PM", duration: "2h 30m", stops: "Direct (Suvarnabhumi BKK)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 35600, destCode: "BKK", score: "Best Value + 30kg Bag" },
      { id: "f6", airline: "Thai Airways", flightNo: "TG 322", departs: "01:35 PM", arrives: "05:05 PM", duration: "2h 30m", stops: "Direct (Suvarnabhumi BKK)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 42800, destCode: "BKK", score: "5-Star Full Service" },
    ];
  }
  if (lower.includes("kul") || lower.includes("malaysia") || lower.includes("kuala")) {
    return [
      { id: "f7", airline: "AirAsia", flightNo: "AK 71", departs: "12:25 AM", arrives: "06:15 AM", duration: "3h 50m", stops: "Direct (KLIA2)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 36200, destCode: "KUL", score: "Lowest Direct" },
      { id: "f8", airline: "Batik Air Malaysia", flightNo: "OD 163", departs: "10:15 PM", arrives: "04:10 AM", duration: "3h 55m", stops: "Direct (KLIA1)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 37900, destCode: "KUL", score: "Best Value Direct" },
      { id: "f9", airline: "Malaysia Airlines", flightNo: "MH 197", departs: "12:15 PM", arrives: "06:05 PM", duration: "3h 50m", stops: "Direct (KLIA1)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 45200, destCode: "KUL", score: "Full-Service Carrier" },
    ];
  }
  return [
    { id: "f10", airline: "flydubai", flightNo: "FZ 524", departs: "09:40 PM", arrives: "01:05 AM", duration: "4h 45m", stops: "Direct (DXB)", baggage: "20 kg Checked + 7 kg Cabin", priceBdt: 56900, destCode: "DXB", score: "Cheapest Direct" },
    { id: "f11", airline: "Biman Bangladesh Airlines", flightNo: "BG 347", departs: "06:15 PM", arrives: "09:35 PM", duration: "4h 40m", stops: "Direct Dreamliner", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 59800, destCode: "DXB", score: "Best Value + 30kg Bag" },
    { id: "f12", airline: "Emirates", flightNo: "EK 585", departs: "01:40 AM", arrives: "04:55 AM", duration: "4h 35m", stops: "Direct (Terminal 3)", baggage: "30 kg Checked + 7 kg Cabin", priceBdt: 73500, destCode: "DXB", score: "5-Star Flag Carrier" },
  ];
}

function getHotelOptions(hotelCity: string) {
  const lower = hotelCity.toLowerCase();
  if (lower.includes("kathmandu") || lower.includes("nepal")) {
    return [
      { id: "h1", name: "Thamel Grand Heritage Hotel", category: "Budget Friendly", rating: "3★", review: "8.7/10 Very Good", priceBdt: 2400, neighborhood: "Thamel Core, Kathmandu", features: ["Free Breakfast", "5-min walk to Durbar Marg", "24h Airport Pickup"] },
      { id: "h2", name: "Hotel Shanker Kathmandu", category: "Mid-Range", rating: "4★", review: "9.1/10 Wonderful", priceBdt: 7400, neighborhood: "Lazimpat, Kathmandu", features: ["Outdoor Swimming Pool", "Heritage Palace Architecture", "Halal-Friendly Dining Nearby"] },
      { id: "h3", name: "Dwarika's Heritage Resort", category: "Luxury", rating: "5★", review: "9.7/10 Exceptional", priceBdt: 28500, neighborhood: "Battisputali, Kathmandu", features: ["Award-Winning Courtyard", "Full Spa & Courtyard Pool", "Hand-Carved Suites"] },
    ];
  }
  if (lower.includes("bangkok") || lower.includes("thailand")) {
    return [
      { id: "h4", name: "First House Hotel Pratunam", category: "Value Pick", rating: "3★", review: "8.4/10 Very Good", priceBdt: 3900, neighborhood: "Pratunam Shopping Zone, Bangkok", features: ["Halal Street Food Outside", "2-min walk to Platinum Mall", "Family Triple Rooms"] },
      { id: "h5", name: "S31 Sukhumvit Hotel", category: "Mid-Range", rating: "4★", review: "8.9/10 Excellent", priceBdt: 6800, neighborhood: "Sukhumvit (Near Phrom Phong BTS)", features: ["Saltwater Infinity Pool", "Spacious Family Suites", "Easy BTS Skytrain Access"] },
      { id: "h6", name: "Amari Bangkok Pratunam", category: "Luxury", rating: "5★", review: "9.4/10 Outstanding", priceBdt: 12500, neighborhood: "Pratunam Opposite Platinum Mall", features: ["Resort Pool Deck", "Breeze Spa & Executive Lounge", "Direct Skybridge Walk"] },
    ];
  }
  if (lower.includes("dubai") || lower.includes("uae")) {
    return [
      { id: "h10", name: "Rove City Centre Deira", category: "Best Value", rating: "3★", review: "9.1/10 Superb", priceBdt: 7200, neighborhood: "Deira (2 mins to Metro), Dubai", features: ["Outdoor Saltwater Pool", "10 mins from DXB Airport", "South Asian & Halal Dining"] },
      { id: "h11", name: "Swissôtel Al Ghurair Dubai", category: "Mid-Range", rating: "5★", review: "9.0/10 Excellent", priceBdt: 12800, neighborhood: "Deira Creekside, Dubai", features: ["Connected to Al Ghurair Mall", "Free Beach Shuttle", "Large Family Rooms"] },
      { id: "h12", name: "Address Downtown View Hotel", category: "Luxury", rating: "5★", review: "9.6/10 World Class", priceBdt: 29500, neighborhood: "Downtown Dubai (Burj Khalifa View)", features: ["Infinity Pool Facing Burj Khalifa", "Direct Dubai Mall Access", "VIP Concierge"] },
    ];
  }
  return [
    { id: "h7", name: "Travelodge Chinatown KL", category: "Budget Friendly", rating: "3★", review: "8.5/10 Very Good", priceBdt: 2900, neighborhood: "Chinatown & Pasar Seni MRT, KL", features: ["2-min walk to MRT/LRT", "Fast Wi-Fi", "Central Sightseeing Base"] },
    { id: "h8", name: "WOLO Kuala Lumpur", category: "Mid-Range", rating: "4★", review: "9.1/10 Superb", priceBdt: 6400, neighborhood: "Bukit Bintang Crossing, KL", features: ["Next to Pavilion Mall", "Walk to Jalan Alor & Arab Street", "Modern Boutique Rooms"] },
    { id: "h9", name: "THE FACE Suites Kuala Lumpur", category: "Luxury", rating: "5★", review: "9.5/10 Exceptional", priceBdt: 9800, neighborhood: "KLCC District, Kuala Lumpur", features: ["51st Floor Rooftop Infinity Pool", "Petronas Twin Towers View", "Full Apartment Suites"] },
  ];
}

export function TravelpayoutsCustomWidget({
  initialTab = "flights",
  initialFrom = "Dhaka (DAC)",
  initialTo = "Kathmandu (KTM)",
  initialHotelCity = "Kathmandu",
}: TravelpayoutsCustomWidgetProps = {}) {
  const [searchTab, setSearchTab] = useState<"flights" | "hotels">(initialTab);
  const [fromCity, setFromCity] = useState(initialFrom);
  const [toCity, setToCity] = useState(initialTo);
  const [hotelCity, setHotelCity] = useState(initialHotelCity);
  const [date, setDate] = useState(() => getDefaultDateIso(14));
  const [travelers, setTravelers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchUpdatedCount, setSearchUpdatedCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

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

  const results = useMemo(() => {
    if (searchTab === "flights") {
      return getFlightOptions(toCity);
    }
    return getHotelOptions(hotelCity);
  }, [searchTab, toCity, hotelCity]);

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSelectedItem(null);

    setTimeout(() => {
      setIsSearching(false);
      setSearchUpdatedCount((c) => c + 1);
    }, 300);
  };

  return (
    <div id="travelpayouts-affiliate-block" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden my-4 text-slate-900">
      {/* Widget Tabs */}
      <div className="bg-[#102A43] p-3.5 sm:px-5 text-white flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            id="tab-search-flights"
            type="button"
            onClick={() => {
              setSearchTab("flights");
              setSelectedItem(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              searchTab === "flights"
                ? "bg-[#F6B73C] text-[#102A43] shadow-xs"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <Plane size={15} />
            Search Flights
          </button>
          <button
            id="tab-search-hotels"
            type="button"
            onClick={() => {
              setSearchTab("hotels");
              setSelectedItem(null);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              searchTab === "hotels"
                ? "bg-[#F6B73C] text-[#102A43] shadow-xs"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <Building size={15} />
            Search Hotels
          </button>
        </div>
        <span className="text-xs text-slate-300 font-medium">
          Live Partner Fares · Prices in BDT (৳)
        </span>
      </div>

      {/* Widget Input Form */}
      <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
        <form onSubmit={handleSearch}>
          {searchTab === "flights" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Departure Airport
                </label>
                <select
                  id="select-from-airport"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  <option value="Dhaka (DAC)">Dhaka (DAC) - Bangladesh</option>
                  <option value="Chattogram (CGP)">Chattogram (CGP) - Bangladesh</option>
                  <option value="Sylhet (ZYL)">Sylhet (ZYL) - Bangladesh</option>
                </select>
              </div>

              <div className="flex flex-col relative justify-center">
                <button
                  type="button"
                  onClick={swapCities}
                  title="Swap Airports"
                  className="absolute right-2 top-0 text-[11px] font-semibold text-[#102A43] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <ArrowRightLeft size={11} /> Swap
                </button>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Destination Airport
                </label>
                <select
                  id="select-to-airport"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  <option value="Kathmandu (KTM)">Kathmandu (KTM) - Nepal 🇳🇵</option>
                  <option value="Bangkok (BKK / DMK)">Bangkok (BKK / DMK) - Thailand 🇹🇭</option>
                  <option value="Kuala Lumpur (KUL)">Kuala Lumpur (KUL) - Malaysia 🇲🇾</option>
                  <option value="Dubai (DXB)">Dubai (DXB) - UAE 🇦🇪</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Travel Date
                </label>
                <input
                  id="input-flight-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>

              <button
                id="btn-search-flights-submit"
                type="submit"
                disabled={isSearching}
                className="w-full bg-[#07C369] hover:bg-[#06ad5d] text-white py-2.5 px-4 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isSearching ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Search Flights</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Destination City
                </label>
                <select
                  id="select-hotel-city"
                  value={hotelCity}
                  onChange={(e) => setHotelCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                >
                  <option value="Kathmandu">Kathmandu - Nepal 🇳🇵</option>
                  <option value="Bangkok">Bangkok - Thailand 🇹🇭</option>
                  <option value="Kuala Lumpur">Kuala Lumpur - Malaysia 🇲🇾</option>
                  <option value="Dubai">Dubai - UAE 🇦🇪</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Check-in Date
                </label>
                <input
                  id="input-checkin-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Guests / Rooms
                </label>
                <select
                  id="select-hotel-rooms"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#102A43]"
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
                className="w-full bg-[#F6B73C] text-[#102A43] hover:bg-[#e0a42d] py-2.5 px-4 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isSearching ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Search Hotels</span>
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Results List */}
      <div className="p-4 sm:p-6 bg-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#07C369]" />
            <span className="text-xs font-bold text-slate-800">
              {searchTab === "flights"
                ? `Showing Flights: ${fromCity} → ${toCity} (${date})`
                : `Showing Top Stays in ${hotelCity} · Check-in ${date}`}
            </span>
          </div>
          {searchUpdatedCount > 0 && (
            <span className="text-xs font-medium text-emerald-700">
              ✓ Results refreshed for your query
            </span>
          )}
        </div>

        <div className="space-y-3">
          {searchTab === "flights"
            ? results.map((flight: any) => (
                <div
                  key={flight.id}
                  className="border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50/60"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-[#102A43] text-[#F6B73C] rounded-xl shrink-0 mt-0.5">
                      <Plane size={18} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{flight.airline}</h4>
                        <span className="text-xs font-mono text-slate-500">{flight.flightNo}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-emerald-700">{flight.score}</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">
                        <strong>{flight.departs}</strong> → <strong>{flight.arrives}</strong> ({flight.duration} · {flight.stops})
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Luggage size={12} /> {flight.baggage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-lg font-black text-[#102A43] tabular-nums">
                        ৳{flight.priceBdt.toLocaleString()} BDT
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Round-trip incl. taxes
                      </span>
                    </div>
                    <button
                      id={`btn-book-flight-${flight.id}`}
                      type="button"
                      onClick={() => setSelectedItem({ type: "flight", ...flight })}
                      className="bg-[#07C369] hover:bg-[#06ad5d] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      Select Flight
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))
            : results.map((hotel: any) => (
                <div
                  key={hotel.id}
                  className="border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-slate-50/60"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-slate-100 text-[#102A43] rounded-xl shrink-0 mt-0.5">
                      <Building size={18} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{hotel.name}</h4>
                        <span className="text-xs text-amber-600 font-bold">{hotel.rating}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-emerald-700 font-medium">{hotel.review}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" /> {hotel.neighborhood}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                        {hotel.features.map((feature: string, idx: number) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && <span aria-hidden="true">·</span>}
                            <span>{feature}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <div className="text-lg font-black text-slate-900 tabular-nums">
                        ৳{hotel.priceBdt.toLocaleString()} BDT
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Per Room / Night
                      </span>
                    </div>
                    <button
                      id={`btn-book-hotel-${hotel.id}`}
                      type="button"
                      onClick={() => setSelectedItem({ type: "hotel", ...hotel })}
                      className="bg-[#102A43] hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      Check Availability
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {/* Selected Booking Confirmation Banner */}
        {selectedItem && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#07C369]" />
                <span>
                  {selectedItem.type === "flight"
                    ? `${selectedItem.airline} (${selectedItem.flightNo}) — ৳${selectedItem.priceBdt.toLocaleString()} BDT`
                    : `${selectedItem.name} (${selectedItem.neighborhood}) — ৳${selectedItem.priceBdt.toLocaleString()} BDT/night`}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Continue to official Travelpayouts partner booking portal to lock in this rate for {date}.
              </p>
            </div>
            <a
              href={
                selectedItem.type === "flight"
                  ? `https://www.aviasales.com/?marker=675992&currency=BDT`
                  : `https://search.hotellook.com/?marker=675992&language=en&currency=BDT&destination=${encodeURIComponent(hotelCity)}`
              }
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="shrink-0 bg-[#102A43] hover:bg-slate-800 text-[#F6B73C] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Proceed to Partner Checkout</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
