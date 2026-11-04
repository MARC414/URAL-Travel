import React from "react";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "./AffiliatePartners";
import { getJourneyHelp, type JourneyStage } from "../utils/journeyHelp";

/**
 * Journey Help panel — see docs/growth/10-CONTENT-UPGRADE-STANDARD.md §4.4.
 *
 * Deliberately NOT styled like the affiliate CTA card. The CTA is a single
 * recommendation; this is orientation. It uses a distinct, quieter surface so a
 * reader can tell the difference without reading the disclosure.
 *
 * Click tracking is handled by the document-level delegated listener in
 * `src/utils/analytics.ts` (capture phase). Adding an onClick here would emit a
 * SECOND `affiliate_partner_click` for the same press — the exact duplication
 * that was removed on 2026-10-24. The only thing this component must do is put
 * `data-affiliate-placement="journey_help"` on the anchor so the existing
 * listener can scope the event.
 */

export const JOURNEY_HELP_PLACEMENT = "journey_help";

export default function JourneyHelpPanel({
  stage,
  isBn,
}: {
  stage?: JourneyStage;
  isBn: boolean;
}) {
  const config = getJourneyHelp(stage);
  if (!config) return null;

  return (
    <section
      aria-labelledby="journey-help-heading"
      data-journey-stage={stage}
      className="my-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7"
    >
      <div className="mb-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-700">
          {isBn ? "যাত্রার পরের ধাপ" : "Your next step"}
        </p>
        <h2
          id="journey-help-heading"
          className="ural-section-title font-serif text-lg font-bold leading-snug text-slate-900 sm:text-xl"
        >
          {isBn ? config.headingBn : config.headingEn}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {isBn ? config.introBn : config.introEn}
        </p>
      </div>

      <ul className="space-y-3">
        {config.links.map((link) => {
          // A3/§4.1: never emit the raw registry URL. `resolvePartnerUrl` swaps
          // in the fallback when a programme is paused, so a dead partner cannot
          // leave a broken button on a live pilgrimage page.
          const href = resolvePartnerUrl(AFFILIATE_LINKS[link.partner]);
          const label = isBn ? link.labelBn : link.labelEn;
          const reason = isBn ? link.reasonBn : link.reasonEn;
          return (
            <li
              key={link.partner}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <p className="text-sm leading-relaxed text-slate-700">{reason}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                data-affiliate-placement={JOURNEY_HELP_PLACEMENT}
                data-affiliate-partner={link.partner}
                className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
              >
                {label}
                <span aria-hidden="true">→</span>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
        {isBn
          ? "এই লিংকগুলো affiliate অংশীদার — আপনি সেখান থেকে কিছু কিনলে URAL একটি কমিশন পেতে পারে, আপনার দাম একই থাকে। এগুলো কোনো সরকারি সেবা নয় এবং ভিসা, পারমিট বা অনুমোদনের নিশ্চয়তা দেয় না।"
          : "These are affiliate partner links. URAL may earn a commission if you buy through them, at no extra cost to you. They are not official services and do not guarantee a visa, permit or approval."}
      </p>
    </section>
  );
}
