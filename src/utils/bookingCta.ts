import { AFFILIATE_LINKS, resolvePartnerUrl } from "../components/AffiliatePartners";
import { flightSubIdForSlug } from "./flightWhiteLabel";

/**
 * The one place a booking CTA turns a partner key into a URL.
 *
 * Flight CTAs land on our own `/flights` page — the reader keeps our design and
 * the homepage hero — and the white-label widget there is what actually hands
 * off to flights.uraltravel.co.uk. The Aviasales-branded site is never the
 * destination. The `fsrc` query carries the per-article placement id across the
 * hop, so the widget can attach `sub_id` and the Travelpayouts report can still
 * say which article earned the click. Every other provider keeps resolving
 * through the tracked short link.
 *
 * Lives outside `AffiliatePartners.tsx` on purpose: that module is in the entry
 * chunk, and pulling the flight-search module in with it pushed eager JS over
 * the gzip budget. Only route-level code (article view, partner strip, the
 * prerenderer) imports this file.
 *
 * `verify:build` fails if a blog page ships a flight link to aviasales.com or
 * aviasales.tpo.li, so this cannot silently regress.
 */
export function resolveBookingCtaUrl(
  provider: string,
  options: { slug?: string; locale?: "en" | "bn" } = {}
): string {
  if (provider === "aviasales") {
    const subId = flightSubIdForSlug(options.slug);
    const lang = options.locale ?? "en";
    // Own-page stop first: the reader keeps our design and the homepage hero and
    // searches in the white-label widget embedded there, instead of landing on
    // the provider-hosted page with no branding of ours around it. `fsrc` carries
    // the placement id across the hop so the click is still attributable.
    const path = lang === "bn" ? "/bn/flights" : "/flights";
    return subId ? `${path}?fsrc=${encodeURIComponent(subId)}#flight-search` : path;
  }
  return resolvePartnerUrl(AFFILIATE_LINKS[provider as keyof typeof AFFILIATE_LINKS]);
}
