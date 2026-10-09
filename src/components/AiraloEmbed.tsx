import { ExternalLink, Wifi } from "lucide-react";

const AIRALO_AFFILIATE_URL = "https://airalo.tpo.li/mV2QXsXK";
const YESIM_AFFILIATE_URL = "https://yesim.tpo.li/O8Zvqr73";

/**
 * The affiliate URLs are provider-level redirects, not country-specific
 * deeplinks. Keep destination selection on the provider site until an approved
 * destination-aware link is available; do not imply the selection is passed
 * through to the partner.
 */
export function AiraloEmbed() {
  return (
    <section className="w-full space-y-3.5 overflow-hidden rounded-xl border border-slate-100 bg-slate-50/80 p-4 font-sans sm:p-5">
      <div className="flex items-center gap-2.5">
        <div className="rounded-lg bg-red-500/10 p-1.5 text-red-600" aria-hidden="true">
          <Wifi size={18} />
        </div>
        <div>
          <h4 className="font-serif text-sm font-black text-slate-900">
            Travel eSIM plans
          </h4>
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Airalo · Yesim
          </p>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-slate-600">
        Choose your destination and plan on the provider’s site. Check coverage,
        data allowance, validity, device compatibility, activation rules, and the
        current price before you buy.
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <a
          href={AIRALO_AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-slate-800"
        >
          <span>Browse Airalo plans</span>
          <ExternalLink size={11} aria-hidden="true" />
        </a>

        <a
          href={YESIM_AFFILIATE_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#F6B73C] px-3 py-2.5 text-center text-xs font-bold text-brand-navy transition-colors hover:bg-[#ffc654]"
        >
          <span>Browse Yesim plans</span>
          <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>

      <p className="text-[10px] leading-relaxed text-slate-500">
        Prices, country coverage, and plan terms can change. Confirm them with the
        provider. Keeping a Bangladesh SIM available for OTPs depends on your
        phone, mobile operator, and roaming settings; check possible charges.
      </p>
    </section>
  );
}
