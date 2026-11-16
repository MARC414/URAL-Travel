import React from "react";
import { AFFILIATE_LINKS, isSameOriginCtaHref, resolvePartnerUrl } from "./AffiliatePartners";
import { getJourneyHelp, type JourneyStage } from "../utils/journeyHelp";
import { resolveBookingCtaUrl } from "../utils/bookingCta";

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
  slug,
}: {
  stage?: JourneyStage;
  isBn: boolean;
  /** Article slug, so a flight link can carry its own per-placement sub_id. */
  slug?: string;
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
          //
          // Flight links are the exception: the `travel` stage offers fares, and
          // the raw registry entry points at the branded short link.
          // Every other flight surface in the site stops on our own /flights page
          // first (see `resolveBookingCtaUrl`), and this panel must not be the one
          // door that still sends a reader to someone else's brand. The build
          // cannot see it either: this panel is client-rendered, so the static-HTML
          // guard in `verify:build` never inspects it — `test-journey-help.ts`
          // renders it and asserts the host instead.
          const href =
            link.partner === "aviasales"
              ? resolveBookingCtaUrl("aviasales", { slug, locale: isBn ? "bn" : "en" })
              : resolvePartnerUrl(AFFILIATE_LINKS[link.partner]);
          const sameOrigin = isSameOriginCtaHref(href);
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
                target={sameOrigin ? undefined : "_blank"}
                rel={sameOrigin ? undefined : "noopener noreferrer sponsored"}
                data-affiliate-placement={sameOrigin ? undefined : JOURNEY_HELP_PLACEMENT}
                data-affiliate-partner={sameOrigin ? undefined : link.partner}
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
        {config.links.some((link) => link.partner === "aviasales")
          ? isBn
            ? "ফ্লাইট যাচাইয়ের লিংকটি URAL-এর নিজস্ব ফ্লাইট সার্চ পাতা খোলে (সেখান থেকে পার্টনার-চালিত ভাড়া অনুসন্ধান চলে), আর বাইরের লিংকগুলো affiliate অংশীদার—যোগ্য বুকিংয়ে আপনার অতিরিক্ত খরচ ছাড়াই URAL কমিশন পেতে পারে। এগুলো কোনো সরকারি সেবা নয় এবং ভিসা, পারমিট বা অনুমোদনের নিশ্চয়তা দেয় না।"
            : "Flight fare links open URAL's flight search page first (which hands off to a partner-powered fare search), and external links go to affiliate partners—URAL may earn a commission on qualifying bookings at no extra cost to you. They are not official services and do not guarantee a visa, permit or approval."
          : isBn
            ? "এই লিংকগুলো affiliate অংশীদার — আপনি সেখান থেকে কিছু কিনলে URAL একটি কমিশন পেতে পারে, আপনার দাম একই থাকে। এগুলো কোনো সরকারি সেবা নয় এবং ভিসা, পারমিট বা অনুমোদনের নিশ্চয়তা দেয় না।"
            : "These are affiliate partner links. URAL may earn a commission if you buy through them, at no extra cost to you. They are not official services and do not guarantee a visa, permit or approval."}
      </p>
    </section>
  );
}
