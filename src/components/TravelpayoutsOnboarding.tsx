import React, { useState } from "react";
import { 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Info, 
  Users, 
  Layers, 
  Sparkles 
} from "lucide-react";
import {
  AFFILIATE_OFFER_REGISTRY,
  isPromoActive,
  getPromoDaysRemaining,
  resolvePartnerUrl,
} from "./AffiliatePartners";

export function TravelpayoutsOnboarding() {
  const [activeTab, setActiveTab] = useState<"checklist" | "drive-sandbox" | "referral-calculator" | "audit">("checklist");

  // 1. Interactive Onboarding Checklist State
  const [checklistItems, setChecklistItems] = useState([
    { id: "dashboard", category: "Account Setup", title: "Review Dashboard Snapshot", desc: "Monitor live clicks, conversions, potential earnings, and top performing programs in one central place.", timestamp: "0:58", completed: false },
    { id: "programs", category: "Account Setup", title: "Connect Major Partner Programs", desc: "Review each partner program’s current eligibility, commission, cookie and payment terms in your account before publishing a claim.", timestamp: "1:18", completed: false },
    { id: "widgets", category: "Monetization", title: "Configure Custom Search Widgets", desc: "Embed responsive widgets like the Flight and Hotel search tools on your main routes to capture search intent.", timestamp: "1:53", completed: false },
    { id: "deeplinks", category: "Monetization", title: "Verify partner placement-ID support", desc: "URAL records stable first-party link-placement labels. Do not append a Travelpayouts SubID unless the partner program and reporting support it and the account setup is verified.", timestamp: "3:15", completed: false },
    { id: "links-props", category: "Best Practices", title: "Configure Link Attributes (SEO Safety)", desc: "Ensure all manual affiliate outbound links are styled as sponsored, nofollow, and open in a new tab.", timestamp: "3:53", completed: false },
    { id: "drive-script", category: "Automation", title: "Review third-party scripts before enabling", desc: "Verify current product documentation, consent behavior, performance and affiliate-link changes before installing any monetization script.", timestamp: "2:47", completed: false },
    { id: "reports", category: "Analytics", title: "Reconcile clicks and bookings separately", desc: "A site-side click event is not a booking. Verify event forwarding, partner-side placement reporting and completed/approved bookings in the relevant accounts.", timestamp: "6:30", completed: false },
    { id: "referrals", category: "Referrals", title: "Check current referral terms", desc: "Referral rewards and eligibility can change. Review current official terms before describing potential earnings.", timestamp: "7:08", completed: false },
  ]);

  const toggleCheckItem = (id: string) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

  // 2. Drive Sandbox State
  const [selectedDriveTool, setSelectedDriveTool] = useState<number>(2); // Default to the area-comparison example
  const [clickOfferTriggered, setClickOfferTriggered] = useState(false);
  const [clickOfferLog, setClickOfferLog] = useState<string[]>([]);

  // 3. Referral Calculator State
  // Code-level status only; no live partner dashboard, GTM or booking report was inspected here.
  const auditChecks = [
    { name: "First-party partner-click event", status: "IMPLEMENTED", detail: "The site can record partner, link label and page path; hotel calls also include a stable affiliate_placement label. A click does not confirm a booking.", icon: "📍" },
    { name: "GTM / GA4 event forwarding", status: "NOT VERIFIED", detail: "Confirm the container receives affiliate_partner_click and registers affiliate_placement before using it for reporting.", icon: "🔎" },
    { name: "Travelpayouts SubID support", status: "NOT VERIFIED", detail: "No SubID is appended to hotel partner URLs. Check the specific program, generated link and dashboard reporting before enabling partner-side scopes.", icon: "🔗" },
    { name: "Completed booking attribution", status: "NOT VERIFIED", detail: "Use the partner's booking and approval reports to confirm commercial outcomes; site click events alone are not booking evidence.", icon: "📊" },
    { name: "Hotel handoff and disclosure", status: "CODE REVIEWED", detail: "The Klook hotel collection is a generic destination handoff. Visitors must re-enter destination, dates and guests; the CTA states the commission relationship.", icon: "🏨" },
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
              Partner Integration Review
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
              Partner Links &amp; Measurement Review
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              This page is a local checklist and illustrative mockup—not a live Travelpayouts account or booking audit. Verify current program terms, analytics forwarding, placement support and booking reports in the relevant accounts.
            </p>
          </div>
          
          <div className="flex bg-[#0c2033]/80 p-1.5 rounded-xl border border-white/10 text-xs shrink-0 items-center gap-3">
            <span className="text-[10px] text-slate-400 font-mono">STATUS:</span>
            <span className="bg-amber-500/20 text-amber-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              ACCOUNT REVIEW NEEDED
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
            Link UI Mockup
          </button>
          <button
            onClick={() => setActiveTab("referral-calculator")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "referral-calculator" ? "bg-[#F6B73C] text-brand-navy" : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users size={15} />
            Referral Terms
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

      {/* Self-Healing Affiliate Offer & Promo Lifecycle Monitor */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-brand-navy bg-[#F6B73C]/20 px-3 py-1 rounded-full mb-2">
              <Sparkles size={13} className="text-amber-600" />
              Configured Offer Registry — Manual Review Needed
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-black text-slate-900">
              Offer dates and destination checks
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              URAL stores configured offer dates in <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-[11px]">AFFILIATE_OFFER_REGISTRY</code>. This site configuration is not independent proof of current program terms or destination availability; re-check partner terms and links before promotion.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(AFFILIATE_OFFER_REGISTRY)
            .filter((offer) => offer.offerType !== "evergreen")
            .map((offer) => {
              const active = isPromoActive(offer.expiresAt);
              const daysLeft = getPromoDaysRemaining(offer.expiresAt);
              const resolvedHref = resolvePartnerUrl(offer.id);
              return (
                <div
                  key={offer.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-bold text-sm text-slate-900">{offer.partnerName}</span>
                      {offer.status !== "active" ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          Auto-Fallback Active
                        </span>
                      ) : active ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Boost Active ({daysLeft}d left)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          Evergreen Mode (Promo Ended)
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-brand-navy mb-1">
                      {offer.activeNote}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {offer.expiredFallbackBehavior}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono truncate max-w-[180px]" title={resolvedHref}>
                      {resolvedHref}
                    </span>
                    <a
                      href={resolvedHref}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-brand-navy font-bold hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      Test Link <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 sm:p-8">

        {/* TAB 1: CHECKLIST */}
        {activeTab === "checklist" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Partner and measurement checklist</h3>
                <p className="text-xs text-slate-500">Marks are local checklist state only; they do not inspect a partner account, tag container or booking report.</p>
              </div>
              <div className="bg-slate-100 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-slate-700">
                {completedCount} of {checklistItems.length} Steps Active
              </div>
            </div>

            {/* Progress Meter bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Local checklist progress</span>
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
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium">MANUAL REVIEW</span>
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
                <span className="font-bold text-text-primary block mb-1">💡 Measurement reminder</span>
                Treat clicks, bookings, eligible commissions and payouts as separate stages. Verify each with the relevant account report before making a performance claim.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DRIVE PREVIEW */}
        {activeTab === "drive-sandbox" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">Illustrative partner-link UI mockup</h3>
              <p className="text-xs text-slate-500">This local mockup is not connected to Travelpayouts Drive or a live account and does not verify product features, program terms, URL rewriting or bookings.</p>
            </div>

            {/* Split layout: Selector left, simulator display right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Selector Panel (Col 5) */}
              <div className="lg:col-span-5 space-y-2">
                {[
                  { id: 1, title: "1. Review Outbound Links", summary: "Check that each visible partner link reaches the intended destination and has the correct disclosure and link attributes." },
                  { id: 2, title: "2. Label a Link Placement", summary: "A site-side scope can identify a CTA location in analytics; it does not modify the partner URL or prove a booking." },
                  { id: 3, title: "3. Keep Recommendations Evidence-Based", summary: "Do not publish property rankings, ratings or rates without current, comparable evidence and a matching booking destination." },
                  { id: 4, title: "4. Preview Current Listing Details", summary: "Show property identity, availability, price and terms only when the provider supplies current matching information." },
                  { id: 5, title: "5. Use Clear User-Initiated Links", summary: "Partner links should be visible and optional. Do not trigger hidden redirects or promise cookie-based attribution without verified terms." }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setSelectedDriveTool(tool.id);
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
                <div className="absolute top-0 right-0 p-3 bg-slate-900 border-b border-l border-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
                  Illustrative Mockup — Not Connected to Travelpayouts Drive
                </div>

                {/* Display Area */}
                <div className="space-y-4 my-auto pt-6 pb-4">
                  {selectedDriveTool === 1 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Illustrative click scope (site analytics only):</span>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono text-[11px]">
                        <span className="text-slate-300 block">Partner URL:</span>
                        <code className="text-slate-300 block truncate">Configured destination link (unchanged)</code>
                        <span className="text-[#F6B73C] block mt-2">First-party event scope:</span>
                        <code className="text-[#F6B73C] block truncate font-bold">hotel_guide_kathmandu_klook_collection</code>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        This label scopes the site's click event only. It is not a Travelpayouts SubID, is not added to the partner URL, and does not confirm a booking.
                      </p>
                    </div>
                  )}

                  {selectedDriveTool === 2 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Area comparison (illustrative):</span>
                      <div className="p-4 bg-brand-navy rounded-xl border border-[#F6B73C]/20 text-slate-200 font-serif leading-relaxed text-sm">
                        "Compare Thamel, Boudha and Lazimpat against your itinerary, transport needs and preferred pace. Check the exact property address and current booking terms before choosing."

                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        No automatic linking is shown here. Use an explicit, user-initiated partner link and verify its destination and tracking terms.
                      </p>
                    </div>
                  )}

                  {selectedDriveTool === 3 && (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Hotel planning checklist — illustrative, no property offers:</span>
                      <div className="bg-white border border-slate-200 text-slate-900 p-4 rounded-xl shadow-md space-y-3 font-sans">
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded font-mono font-bold uppercase tracking-wide">Compare current listings yourself</span>
                        <ul className="space-y-2 text-xs">
                          <li><b>Area:</b> compare location and route against the itinerary.</li>
                          <li><b>Room:</b> confirm occupancy, bed setup and included meals.</li>
                          <li><b>Total:</b> inspect current checkout charges and cancellation terms.</li>
                        </ul>
                        <a href="/hotels/kathmandu-hotels" className="text-[10px] text-brand-navy font-bold hover:underline">Open the Kathmandu area guide <ExternalLink size={9} className="inline" /></a>
                      </div>
                    </div>
                  )}

                  {selectedDriveTool === 4 && (
                    <div className="space-y-4 text-center">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Partner-link preview — illustrative:</span>
                      <div className="mx-auto max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-4 text-left space-y-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#F6B73C] font-mono">CHECK LIVE LISTING</span>
                        <h5 className="font-bold text-sm text-white">Hotel details are not pre-filled</h5>
                        <p className="text-xs text-slate-300 leading-normal">Confirm property identity, current room availability, review date, total payable and booking terms on the provider’s page.</p>
                        <p className="text-[10px] text-slate-400">No static review score, nightly price or availability is shown in this demo.</p>
                      </div>
                    </div>
                  )}

                  {selectedDriveTool === 5 && (
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Show Targeted Offers:</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        A partner click is a user action. This local demo does not open a partner page, set a cookie, append a SubID or record a booking. Click below only to display an example site-side event:
                      </p>

                      <div 
                        onClick={() => {
                          setClickOfferTriggered(true);
                          const log = [...clickOfferLog, `[Local demo] ${new Date().toLocaleTimeString()} - Example affiliate_partner_click event; no partner request or booking recorded.`];
                          setClickOfferLog(log.slice(-3));
                          setTimeout(() => setClickOfferTriggered(false), 2000);
                        }}
                        className="bg-slate-900/80 border border-dashed border-slate-700 hover:bg-slate-800 hover:border-[#F6B73C]/50 py-8 text-center rounded-xl cursor-pointer select-none transition-all group"
                      >
                        <span className="text-xs text-slate-400 font-mono group-hover:text-white">
                          ▶ SHOW LOCAL DEMO EVENT
                        </span>
                      </div>

                      {clickOfferTriggered && (
                        <div className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-[#F6B73C] p-2.5 rounded font-mono text-center animate-pulse">
                          ℹ DEMO EVENT SHOWN: no cookie, partner click or booking
                        </div>
                      )}

                      {clickOfferLog.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-500 block uppercase">Browser Tracking Console:</span>
                          <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1">
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
                  <span>Partner URL: <b className="text-slate-300">not modified in this demo</b></span>
                  <span>Local UI simulation only</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REFERRAL TERMS */}
        {activeTab === "referral-calculator" && (
          <section className="space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-6" aria-labelledby="tp-referral-terms-title">
            <h3 id="tp-referral-terms-title" className="font-serif text-lg font-bold text-slate-900">Check the current referral terms before estimating earnings</h3>
            <p className="text-sm leading-relaxed text-slate-700">This page does not calculate or promise referral income. Reward amounts, eligibility, timing and revenue-share terms can change and may depend on the account or market. Review the current official terms in your Travelpayouts account before publishing any figures.</p>
            <p className="text-sm leading-relaxed text-slate-700">A referral click, signup or booking is not automatically an approved commission. Reconcile each stage against the relevant partner report.</p>
          </section>
        )}

        {/* TAB 4: AUDIT */}
        {activeTab === "audit" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-serif text-lg font-bold text-slate-900">Code-level integration notes</h3>
              <p className="text-xs text-slate-500">These notes are limited to repository code; they are not a live account or partner-dashboard audit.</p>
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
                  <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black border uppercase ${check.status === "IMPLEMENTED" || check.status === "CODE REVIEWED" ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-amber-100 text-amber-900 border-amber-200"}`}>
                    <Info size={12} />
                    {check.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <span className="text-xs font-mono font-bold text-amber-900 block uppercase tracking-wider">SCOPE NOTE</span>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">These statuses summarize repository code only. They do not verify Travelpayouts dashboard settings, GTM/GA4 delivery, partner SubID acceptance, completed bookings or approved commissions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
