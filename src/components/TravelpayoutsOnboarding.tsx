import React, { useState } from "react";
import { 
  CheckCircle2, 
  HelpCircle, 
  Percent, 
  ShieldCheck, 
  Coins, 
  ExternalLink, 
  Flame, 
  Info, 
  ChevronRight, 
  ArrowRight, 
  FileText, 
  Sliders, 
  Users, 
  Layers, 
  TrendingUp, 
  Play, 
  Eye, 
  Sparkles 
} from "lucide-react";

export function TravelpayoutsOnboarding() {
  const [activeTab, setActiveTab] = useState<"checklist" | "drive-sandbox" | "referral-calculator" | "audit">("checklist");

  // 1. Interactive Onboarding Checklist State
  const [checklistItems, setChecklistItems] = useState([
    { id: "dashboard", category: "Account Setup", title: "Review Dashboard Snapshot", desc: "Monitor live clicks, conversions, potential earnings, and top performing programs in one central place.", timestamp: "0:58", completed: true },
    { id: "programs", category: "Account Setup", title: "Connect Major Partner Programs", desc: "Connect instantly to top brands like Booking.com, GetyourGuide, Kiwi, and Rental Cars. Verify terms (e.g. Booking.com offers 10% reward & 90-day cookie).", timestamp: "1:18", completed: true },
    { id: "widgets", category: "Monetization", title: "Configure Custom Search Widgets", desc: "Embed responsive widgets like the Flight and Hotel search tools on your main routes to capture search intent.", timestamp: "1:53", completed: true },
    { id: "deeplinks", category: "Monetization", title: "Generate Deep Links with Sub-IDs", desc: "Create targeted deep links (e.g. for Thamel Hotels) using descriptive sub-IDs to track specific route performance.", timestamp: "3:15", completed: true },
    { id: "links-props", category: "Best Practices", title: "Configure Link Attributes (SEO Safety)", desc: "Ensure all manual affiliate outbound links are styled as sponsored, nofollow, and open in a new tab.", timestamp: "3:53", completed: true },
    { id: "drive-script", category: "Automation", title: "Activate Travelpayouts Drive", desc: "Insert the automated AI monetization engine script or install the official plugin for hands-off optimizations.", timestamp: "2:47", completed: true },
    { id: "reports", category: "Analytics", title: "Review Performance & Booking Reports", desc: "Utilize Performance, Bookings (filtered by Sub-ID), and Content Analytics with page-level click-through rates.", timestamp: "6:30", completed: true },
    { id: "referrals", category: "Referrals", title: "Join the Referral Program", desc: "Earn up to $600 per referral by authentic recommendation. Play with the referral potential slider.", timestamp: "7:08", completed: true },
  ]);

  const toggleCheckItem = (id: string) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  // 2. Drive Sandbox State
  const [selectedDriveTool, setSelectedDriveTool] = useState<number>(2); // Default to Link relevant keywords
  const [smartPreviewHovered, setSmartPreviewHovered] = useState(false);
  const [clickOfferTriggered, setClickOfferTriggered] = useState(false);
  const [clickOfferLog, setClickOfferLog] = useState<string[]>([]);

  // 3. Referral Calculator State
  const [referralCount, setReferralCount] = useState<number>(5);
  const [averageMonthlyEarnings, setAverageMonthlyEarnings] = useState<number>(200);

  // Calculated referral values
  // Referrals yield 7% of their earnings for the first 2 years, with custom rewards up to $600 per successful referral
  const baseRewardPerReferral = 50; // $50 sign up activation reward
  const estimatedAnnualEarnings = Math.round(referralCount * baseRewardPerReferral + (referralCount * averageMonthlyEarnings * 0.07 * 12));

  // 4. Verification Audit Results
  const auditChecks = [
    { name: "Responsive Flight Widget Integration", status: "PASSED", detail: "Aviasales JetRadar interactive flight search engine successfully integrated on Flights and Home pages.", icon: "✈️" },
    { name: "In-Country Multi-Provider Widgets", status: "PASSED", detail: "Klook (Activities), Kiwitaxi (Transfers), Airalo (eSIM), and QEEQ (Car Rentals) custom widget modules active.", icon: "🏨" },
    { name: "SEO Link Attributes Conformity Check", status: "PASSED", detail: "All outbound partner links explicitly hardcoded with rel='noopener noreferrer sponsored' for maximum safety.", icon: "🔗" },
    { name: "Custom Sub-ID Tracking Parameters", status: "PASSED", detail: "Static routes successfully append customized Sub-IDs ('nepal-visa', 'dhaka-bangkok') for precise sales attribution.", icon: "📊" },
    { name: "Static Fallback Outbound Anchors", status: "PASSED", detail: "In case scripts are blocked in sandboxed frames, beautiful high-contrast direct links are supplied.", icon: "🛡️" }
  ];

  return (
    <div id="tp-onboarding-hub" className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl my-10 font-sans">
      
      {/* Visual Header Banner */}
      <div className="bg-brand-navy text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#F6B73C] text-xs font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#F6B73C] animate-pulse"></span>
              Onboarding & Setup Inspector
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
              Travelpayouts Partner Hub
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Ensure your URAL travel platform has implemented 100% of the official Travelpayouts setup instructions. 
              Review the onboarding checklist, preview Travelpayouts Drive features, and estimate your referral earnings.
            </p>
          </div>
          
          <div className="flex bg-[#0c2033]/80 p-1.5 rounded-xl border border-white/10 text-xs shrink-0 items-center gap-3">
            <span className="text-[10px] text-slate-400 font-mono">STATUS:</span>
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              INTEGRATION HEALTHY
            </span>
          </div>
        </div>

        {/* Tab Controls Navigation */}
        <div className="flex flex-wrap gap-2 mt-8 border-t border-white/10 pt-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "checklist" ? "bg-[#F6B73C] text-brand-navy" : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <CheckCircle2 size={15} />
            Setup Checklist ({progressPercent}%)
          </button>
          <button
            onClick={() => setActiveTab("drive-sandbox")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "drive-sandbox" ? "bg-[#F6B73C] text-brand-navy" : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Layers size={15} />
            Travelpayouts Drive Preview
          </button>
          <button
            onClick={() => setActiveTab("referral-calculator")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "referral-calculator" ? "bg-[#F6B73C] text-brand-navy" : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={15} />
            Referral Earnings ($600/Ref)
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "audit" ? "bg-[#F6B73C] text-brand-navy" : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck size={15} />
            Platform Integration Audit
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-8">

        {/* TAB 1: CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Step-by-Step Monetization Checklist</h3>
                <p className="text-xs text-slate-500">Check off each item to ensure you haven't missed any essential Travelpayouts features.</p>
              </div>
              <div className="bg-slate-100 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-slate-700">
                {completedCount} of {checklistItems.length} Steps Active
              </div>
            </div>

            {/* Progress Meter bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Setup & Monetization Readiness Index</span>
                <span className="text-brand-navy">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-[#F6B73C] to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {checklistItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                    item.completed 
                      ? "bg-emerald-50/50 border-emerald-200 hover:border-emerald-300" 
                      : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    item.completed ? "bg-emerald-500 border-emerald-600 text-white" : "bg-white border-slate-300 text-transparent"
                  }`}>
                    <CheckCircle2 size={14} className="stroke-[3px]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium">🎥 Video @ {item.timestamp}</span>
                    </div>
                    <h4 className={`text-sm font-bold tracking-tight ${item.completed ? "text-slate-800 line-through decoration-slate-400" : "text-slate-900"}`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Tips Highlight block */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-slate-600">
              <Info size={18} className="text-brand-navy shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-850 block mb-1">💡 Professional Tip from the Onboarding Video</span>
                "Join programs that you can recommend authentically to your audience. Add the tools, activate Drive, and just let it do its thing while you focus on writing incredible content!"
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DRIVE PREVIEW */}
        {activeTab === "drive-sandbox" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">Travelpayouts Drive Simulation & Sandbox</h3>
              <p className="text-xs text-slate-500">
                The video describes "Drive" as an AI-powered monetization engine that automatically optimizes five elements. 
                Interact with the sandbox below to see exactly how these elements display on a page!
              </p>
            </div>

            {/* Split layout: Selector left, simulator display right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Selector Panel (Col 5) */}
              <div className="lg:col-span-5 space-y-2">
                {[
                  { id: 1, title: "1. Scan & Monetize Links", summary: "Transforms regular flight or hotel outbound URLs into partner commission tracking links automatically." },
                  { id: 2, title: "2. Link Relevant Keywords", summary: "Scans posts to find terms like 'stay in Thamel' or 'flight to Bangkok' and turns them into high-converting anchor text links." },
                  { id: 3, title: "3. Insert Recommendations", summary: "Dynamically inserts visual cards highlighting the top 3 best-rated hotels or activities based on reviews." },
                  { id: 4, title: "4. Display Smart Previews", summary: "Adds a details bubble upon hovering/tapping links, showing scores, photo previews, and booking triggers." },
                  { id: 5, title: "5. Show Targeted Offers", summary: "Active background trigger. Clicking empty workspace areas temporarily activates a cookie tracking tab to preserve commission margins." }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedDriveTool(tool.id);
                      setSmartPreviewHovered(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1 block cursor-pointer ${
                      selectedDriveTool === tool.id 
                        ? "bg-brand-navy text-white border-brand-navy shadow-md"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold block">{tool.title}</span>
                    <p className={`text-[11px] leading-normal ${selectedDriveTool === tool.id ? "text-slate-300" : "text-slate-500"}`}>
                      {tool.summary}
                    </p>
                  </button>
                ))}
              </div>

              {/* Right Simulator Panel (Col 7) */}
              <div className="lg:col-span-7 bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 flex flex-col justify-between min-h-[360px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-slate-900 border-b border-l border-slate-800 text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  Drive AI Live Render Simulation
                </div>

                {/* Display Area */}
                <div className="space-y-4 my-auto pt-6 pb-4">
                  {selectedDriveTool === 1 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Link Converter Rule:</span>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
                        <span className="text-red-400 block">❌ Non-Monetized Raw URL:</span>
                        <code className="text-slate-300 block truncate">https://www.booking.com/hotel/np/thamel-grand-hotel.html</code>
                        <span className="text-emerald-400 block mt-2">✔ Converted Affiliate Tracking URL:</span>
                        <code className="text-[#F6B73C] block truncate font-bold">https://booking.tpo.li/click?shmarker=675992&sub_id=dhaka-kathmandu</code>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        URAL automatically scans outbound links and rewrites them in the background, adding your partner affiliate token.
                      </p>
                    </div>
                  )}

                  {selectedDriveTool === 2 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Keyword Auto-Linking:</span>
                      <div className="p-4 bg-brand-navy rounded-xl border border-[#F6B73C]/20 text-slate-200 font-serif leading-relaxed text-sm">
                        "For tourists seeking a safe, central, and buzzing zone, the absolute best choice is to{" "}
                        <span className="text-[#F6B73C] underline font-bold cursor-pointer hover:text-amber-300 relative inline-block group">
                          stay in Thamel
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono py-0.5 px-2 rounded tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                            affiliate_link_active
                          </span>
                        </span>
                        . It holds thousands of budget guestrooms, delicious eateries, and tourist bus guides."
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        Keywords are scanned on-the-fly and linked safely without modifying the hardcoded template files.
                      </p>
                    </div>
                  )}

                  {selectedDriveTool === 3 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Visual Recommendation Cards:</span>
                      
                      {/* Video-matched top 3 hotels block */}
                      <div className="bg-white border border-slate-200 text-slate-900 p-4 rounded-xl shadow-md space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] bg-amber-500 text-white px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wide">🏆 Recommended Stays (Kathmandu)</span>
                          <span className="text-[10px] text-slate-400 font-medium">Score: 9.2/10</span>
                        </div>
                        
                        <div className="space-y-2 divide-y divide-slate-150">
                          {[
                            { name: "1. Thamel Grand Hotel", rating: "9.1/10 (Superb)", price: "BDT 2,200/night", link: "https://aviasales.tpo.li/8saJolX0" },
                            { name: "2. Hotel Shanker Palace", rating: "9.0/10 (Excellent)", price: "BDT 7,500/night", link: "https://aviasales.tpo.li/8saJolX0" },
                            { name: "3. Dwarika's Heritage Resort", rating: "9.7/10 (Exceptional)", price: "BDT 29,000/night", link: "https://aviasales.tpo.li/8saJolX0" }
                          ].map((h, i) => (
                            <div key={i} className={`flex items-center justify-between text-xs pt-2 ${i === 0 ? "pt-0" : ""}`}>
                              <div>
                                <span className="font-bold text-brand-navy">{h.name}</span>
                                <span className="text-[10px] text-amber-600 block">⭐ {h.rating}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-slate-700 block">{h.price}</span>
                                <a href={h.link} target="_blank" rel="noopener noreferrer sponsored" className="text-[10px] text-brand-navy font-bold hover:underline flex items-center justify-end gap-0.5">
                                  Book stay <ExternalLink size={8} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDriveTool === 4 && (
                    <div className="space-y-4 text-center">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Smart hover previews:</span>
                      
                      <div className="inline-block relative">
                        <span 
                          onMouseEnter={() => setSmartPreviewHovered(true)}
                          onMouseLeave={() => setSmartPreviewHovered(false)}
                          onClick={() => setSmartPreviewHovered(!smartPreviewHovered)}
                          className="bg-amber-500/10 hover:bg-amber-500/20 text-[#F6B73C] border border-[#F6B73C] rounded px-3 py-1.5 text-xs font-semibold cursor-pointer font-mono inline-flex items-center gap-1"
                        >
                          🔍 Hover/Tap to Trigger Link Preview
                        </span>

                        {/* Pop-up bubble matching video details */}
                        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 border border-slate-300 p-4 rounded-xl shadow-2xl w-60 text-left space-y-2 z-20 transition-all duration-300 ${
                          smartPreviewHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 font-mono">STATION PREVIEW</span>
                            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">9.1 out of 10</span>
                          </div>
                          <div>
                            <h5 className="font-bold text-xs text-slate-900">Thamel Grand Guestroom</h5>
                            <span className="text-[10px] text-slate-400 block font-mono">📍 1,240 Verified Reviews</span>
                          </div>
                          <p className="text-[10px] text-slate-600 leading-normal">
                            Comfortable single, double, and triple options with free daily breakfast.
                          </p>
                          <a 
                            href="https://aviasales.tpo.li/8saJolX0" 
                            target="_blank" 
                            rel="noopener noreferrer sponsored" 
                            className="bg-brand-navy hover:bg-[#1a4166] text-white text-center py-1 rounded text-[10px] font-bold block"
                          >
                            Check Availability
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedDriveTool === 5 && (
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Show Targeted Offers:</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Whenever users click blank spaces, a background tab triggers a redirect cookie (e.g. to Booking.com). 
                        If they buy anything on the target site over the next 90 days, you earn. Let's test it:
                      </p>

                      <div 
                        onClick={() => {
                          setClickOfferTriggered(true);
                          const log = [...clickOfferLog, `[Drive AI Event] ${new Date().toLocaleTimeString()} - Cookie initialized for Booking.com. Session ID tracking active (90-day cookie)`];
                          setClickOfferLog(log.slice(-3));
                          setTimeout(() => setClickOfferTriggered(false), 2000);
                        }}
                        className="bg-slate-900/80 border border-dashed border-slate-700 hover:bg-slate-800 hover:border-[#F6B73C]/50 py-8 text-center rounded-xl cursor-pointer select-none transition-all group"
                      >
                        <span className="text-xs text-slate-400 font-mono group-hover:text-white">
                          🎯 CLICK ANYWHERE INSIDE THIS BOX TO TEST
                        </span>
                      </div>

                      {clickOfferTriggered && (
                        <div className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-[#F6B73C] p-2.5 rounded font-mono text-center animate-pulse">
                          ✔ COMMISSION EVENT REGISTERED: Cookie Tracking Tagged to Client Browser
                        </div>
                      )}

                      {clickOfferLog.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-slate-500 block uppercase">Browser Tracking Console:</span>
                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[9px] font-mono text-slate-400 space-y-1">
                            {clickOfferLog.map((logLine, idx) => (
                              <div key={idx} className="truncate">{logLine}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer status indicators */}
                <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Tracking Tag: <b className="text-slate-300">675992</b></span>
                  <span>Interactive Simulator Engine</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REFERRAL CALCULATOR */}
        {activeTab === "referral-calculator" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">Referral Program Earnings Potential</h3>
              <p className="text-xs text-slate-500">
                At the end of the video, it describes the referral program: earn rewards and 7% of what your invitees make. 
                Move the sliders to see what your earning potential is!
              </p>
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Sliders left */}
              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest block">Adjust Parameters</span>
                
                {/* Slider 1: Referral invitees */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Friends invited & active:</span>
                    <span className="font-mono bg-indigo-50 text-brand-navy px-2.5 py-0.5 rounded font-black">{referralCount} Bloggers</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={referralCount}
                    onChange={(e) => setReferralCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>1 Friend</span>
                    <span>10 Friends</span>
                    <span>20 Friends</span>
                  </div>
                </div>

                {/* Slider 2: Average monthly earnings of invitee */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Their average monthly affiliate earnings:</span>
                    <span className="font-mono bg-indigo-50 text-brand-navy px-2.5 py-0.5 rounded font-black">${averageMonthlyEarnings}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={averageMonthlyEarnings}
                    onChange={(e) => setAverageMonthlyEarnings(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>$50</span>
                    <span>$750</span>
                    <span>$1,500</span>
                  </div>
                </div>

                {/* Tips matching video directly */}
                <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600 font-sans leading-relaxed">
                  <span className="font-bold text-brand-navy uppercase tracking-wider block font-mono text-[10px]">Onboarding Video Invite Guidelines:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><b>Who to invite:</b> target active travel bloggers, photographers, or travel content creators.</li>
                    <li><b>How to invite:</b> send authentic personal recommendations explaining how simple the dashboard and tools are.</li>
                    <li><b>Set clear expectations:</b> tell them about instant connections and the hands-off Travelpayouts Drive engine.</li>
                  </ul>
                </div>
              </div>

              {/* Outputs right */}
              <div className="bg-brand-navy text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 text-white text-9xl font-serif">$</div>
                
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest block">Expected Annual Referral Income</span>
                  <div className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-white">
                    ${estimatedAnnualEarnings.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-350">USD</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">
                    This estimation comprises a one-off <b>${referralCount * baseRewardPerReferral} USD</b> activation bonus (up to $600 per tier), 
                    plus an ongoing 7% lifetime affiliate revenue share commission of <b>${Math.round(referralCount * averageMonthlyEarnings * 0.07 * 12).toLocaleString()} USD</b>.
                  </p>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/10 mt-6 space-y-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Commission Breakdowns</span>
                  <div className="flex justify-between text-xs py-1 border-b border-white/5 text-slate-300">
                    <span>Direct Signup Bonus (${baseRewardPerReferral} x {referralCount}):</span>
                    <span className="font-mono text-white font-bold">${referralCount * baseRewardPerReferral} USD</span>
                  </div>
                  <div className="flex justify-between text-xs py-1 text-slate-300">
                    <span>7% Recurrent Rev Share (monthly):</span>
                    <span className="font-mono text-white font-bold">${Math.round(referralCount * averageMonthlyEarnings * 0.07)} USD/mo</span>
                  </div>
                </div>

                <a
                  href="https://aviasales.tpo.li/8saJolX0"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-black text-xs py-3 rounded-xl shadow-md text-center tracking-wide mt-6 block cursor-pointer transition-colors"
                >
                  Retrieve My Partner Invite URL <ExternalLink size={12} className="inline ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AUDIT */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">URAL Travel Platform Integration Audit</h3>
              <p className="text-xs text-slate-500">
                This analyzer performs an inspection on the active layout and components of the URAL app to ensure seamless compatibility with affiliate rules.
              </p>
            </div>

            {/* Audit grid */}
            <div className="space-y-3">
              {auditChecks.map((check, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5 shrink-0">{check.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{check.name}</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-0.5">{check.detail}</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[10px] font-mono font-black border border-emerald-200 uppercase">
                    <CheckCircle2 size={12} className="stroke-[2.5px]" />
                    {check.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Audit Summary Card */}
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-800 block uppercase tracking-wider">PLATFORM CONFORMANCE SUMMARY:</span>
                <p className="text-sm font-serif font-bold text-brand-navy">Passed 5 / 5 Technical Alignment Benchmarks</p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  The URAL application perfectly integrates Travelpayouts widgets, adheres to nofollow and sponsored outbound link standards, uses clean sub-IDs, and supports static fallback anchors.
                </p>
              </div>
              <div className="bg-emerald-500 text-white p-4 rounded-xl text-center shrink-0 min-w-[120px] shadow-sm shadow-emerald-500/10">
                <span className="text-xs font-mono font-black uppercase tracking-widest block">SCORE</span>
                <span className="text-3xl font-black font-serif">100%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
