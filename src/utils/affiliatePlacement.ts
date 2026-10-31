/**
 * First-party placement scopes for outbound partner-click analytics.
 *
 * These IDs are emitted in site analytics only; they are not Travelpayouts
 * SubIDs and are never appended to partner URLs. Partner-side attribution must
 * be verified and configured separately before a URL parameter is added.
 */
export function getHotelGuideAffiliatePlacement(guideId: string): string {
  const city = guideId.replace(/-hotels$/, "").replace(/[^a-z0-9]+/gi, "_").toLowerCase();
  return `hotel_guide_${city}_klook_collection`;
}

export function getBlogHotelAffiliatePlacement(slug: string): string {
  const article = slug.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
  return `blog_${article}_klook_collection`;
}
