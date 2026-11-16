import { resolveBookingCtaUrl } from "./bookingCta";
import { evisasDestinationUrl } from "../data/evisaProgram";
import type { BlogPost } from "../types";

/**
 * The article-CTA resolver: one place that turns a post's declared partner into
 * the URL its call-to-action links to.
 *
 * Most providers are delegated to `resolveBookingCtaUrl`, which keeps flight CTAs
 * on our own `/flights` page and passes the per-article placement id across the
 * hop. eVisas is not a Travelpayouts short link — it is the owner-supplied
 * campaign URL from the partner dashboard, so it resolves through
 * `evisasDestinationUrl` and ignores the slug. An unknown campaign returns "",
 * which suppresses the CTA rather than shipping an untracked link.
 */
export function resolveBlogAffiliateUrl(
  cta: BlogPost["affiliateCTA"] | null,
  options: { slug?: string; locale?: "en" | "bn" } = {}
): string {
  if (!cta) return "";
  if (cta.provider === "evisas") return evisasDestinationUrl(cta.campaign);
  return resolveBookingCtaUrl(cta.provider, options);
}
