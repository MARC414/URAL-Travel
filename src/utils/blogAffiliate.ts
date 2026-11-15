import { AFFILIATE_LINKS, resolvePartnerUrl } from "../components/AffiliatePartners";
import { evisasDestinationUrl } from "../data/evisaProgram";
import type { BlogPost } from "../types";

/** Shared by the article, prerenderer and rendered-link verifier. */
export function resolveBlogAffiliateUrl(cta: BlogPost["affiliateCTA"] | null): string {
  if (!cta) return "";
  return cta.provider === "evisas"
    ? evisasDestinationUrl(cta.campaign)
    : resolvePartnerUrl(AFFILIATE_LINKS[cta.provider]);
}
