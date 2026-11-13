import { AFFILIATE_LINKS, resolvePartnerUrl } from "../components/AffiliatePartners";
import { buildWhiteLabelUrl, flightSubIdForSlug } from "./flightWhiteLabel";

/**
 * The one place a booking CTA turns a partner key into a URL.
 *
 * Flight CTAs must land on the hosted white label (flights.uraltravel.co.uk),
 * never on the Aviasales-branded site: the white label keeps the reader inside
 * our brand, keeps the marker attached, and — with a per-article `sub_id` — lets
 * the Travelpayouts report say which article earned the click. Every other
 * provider keeps resolving through the tracked short link.
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
    return buildWhiteLabelUrl({
      locale: options.locale ?? "en",
      subId: flightSubIdForSlug(options.slug),
    });
  }
  return resolvePartnerUrl(AFFILIATE_LINKS[provider as keyof typeof AFFILIATE_LINKS]);
}
