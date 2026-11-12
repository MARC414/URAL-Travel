import React, { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck, Wifi } from "lucide-react";
import { AFFILIATE_OFFER_REGISTRY, AIRHELP_PROMO, YESIM_PROMO } from "./AffiliatePartners";

type PromoPartner = "airhelp" | "yesim";

// Follow the site's Bangladesh-time campaign convention. An absent/invalid date
// fails closed, rather than accidentally leaving an offer up indefinitely.
export function isCampaignLive(startsAt: string, expiresAt: string, now = Date.now()): boolean {
  const start = Date.parse(`${startsAt}T00:00:00+06:00`);
  const end = Date.parse(`${expiresAt}T23:59:59.999+06:00`);
  return Number.isFinite(start) && Number.isFinite(end) && now >= start && now <= end;
}

/** Client-only to prevent stale, permanently prerendered discounts after expiry. */
export function PromoCard({ partner, lang = "en" }: { partner: PromoPartner; lang?: "en" | "bn" }) {
  const [live, setLive] = useState(false);
  const campaign = partner === "airhelp" ? AIRHELP_PROMO : YESIM_PROMO;
  useEffect(() => {
    const refresh = () => setLive(isCampaignLive(campaign.startsAt, campaign.expiresAt));
    refresh();
    // Recheck even if a reader leaves a tab open over the expiry boundary.
    const timer = window.setInterval(refresh, 60_000);
    // Schedule the next boundary, including campaigns more than 25 days away
    // (the maximum delay accepted by browser timers).
    let boundaryTimer: number | undefined;
    const scheduleBoundary = () => {
      const now = Date.now();
      const start = Date.parse(`${campaign.startsAt}T00:00:00+06:00`);
      const end = Date.parse(`${campaign.expiresAt}T23:59:59.999+06:00`) + 1;
      const next = now < start ? start : end;
      if (Number.isFinite(next) && next > now) {
        boundaryTimer = window.setTimeout(() => { refresh(); scheduleBoundary(); }, Math.min(next - now, 2_147_483_647));
      }
    };
    scheduleBoundary();
    const onVisibility = () => refresh();
    document.addEventListener("visibilitychange", onVisibility);
    return () => { window.clearInterval(timer); window.clearTimeout(boundaryTimer); document.removeEventListener("visibilitychange", onVisibility); };
  }, [campaign]);

  if (!live || AFFILIATE_OFFER_REGISTRY[partner].status !== "active") return null;
  const isBn = lang === "bn";
  const airhelp = partner === "airhelp";
  const Icon = airhelp ? ShieldCheck : Wifi;
  return (
    <aside aria-label={isBn ? "পার্টনার অফার" : "Partner offer"} className="relative overflow-hidden rounded-2xl border border-amber-300/50 bg-brand-navy p-5 text-white shadow-sm sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full border-[24px] border-white/5" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300"><Icon size={16} aria-hidden="true" /> {isBn ? "সীমিত সময়ের পার্টনার অফার" : "Limited-time partner offer"}</div>
          <h3 className="font-serif text-xl font-bold leading-tight sm:text-2xl">{airhelp ? (isBn ? "TravelPass by AirHelp-এ ৯% ছাড়" : "9% off TravelPass by AirHelp") : (isBn ? "Yesim eSIM-এ ২০% ছাড়" : "20% off with Yesim")}</h3>
          <p className="text-sm leading-relaxed text-slate-200">{airhelp
            ? (isBn ? "Silver, Gold ও Platinum মেম্বারশিপে প্রযোজ্য। এটি ফ্লাইট দাবি-সেবা থেকে আলাদা। প্রোমো কোড দেখতে লিংকে যান।" : "For Silver, Gold and Platinum memberships, separate from the flight claims service. Follow the link to reveal the promo code.")
            : (isBn ? "ভ্রমণের জন্য eSIM ডাটা দেখুন। কেনার আগে Yesim-এ যোগ্যতা, কভারেজ, ডিভাইসের সামঞ্জস্য ও চূড়ান্ত মূল্য যাচাই করুন।" : "Explore travel eSIM data. Check eligibility, coverage, device compatibility and the final price with Yesim before buying.")}</p>
          <p className="text-xs text-slate-300">{airhelp ? (isBn ? "১০ নভেম্বর – ৩১ ডিসেম্বর ২০২৬" : "10 November – 31 December 2026") : (isBn ? "১১ নভেম্বর ২০২৬ – ২৮ ফেব্রুয়ারি ২০২৭" : "11 November 2026 – 28 February 2027")} · {isBn ? "শর্ত প্রযোজ্য; checkout-এ ছাড় যাচাই করুন।" : "Terms apply; confirm the discount at checkout."}</p>
          <p className="text-xs text-slate-300">{isBn ? "Affiliate লিংক: এর মাধ্যমে কেনাকাটা করলে URAL কমিশন পেতে পারে।" : "Affiliate link: URAL may earn a commission if you purchase through it."}</p>
        </div>
        <a href={campaign.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F6B73C] px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {airhelp ? (isBn ? "প্রোমো কোড দেখতে যান" : "Follow link to reveal code") : (isBn ? "Yesim অফার দেখুন" : "See Yesim offer")} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
