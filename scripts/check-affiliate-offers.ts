import {
  AFFILIATE_OFFER_REGISTRY,
  isPromoActive,
  getPromoDaysRemaining,
  resolvePartnerUrl,
} from "../src/components/AffiliatePartners";

const checkHttp = process.argv.includes("--http");

async function main() {
  console.log("=== URAL Travelpayouts Offer Lifecycle & Link Health Audit ===");
  let hasHttpFailure = false;

  for (const offer of Object.values(AFFILIATE_OFFER_REGISTRY)) {
    const activePromo = isPromoActive(offer.expiresAt);
    const daysLeft = getPromoDaysRemaining(offer.expiresAt);
    const resolvedUrl = resolvePartnerUrl(offer.id);

    const statusBadge =
      offer.status === "paused"
        ? `PAUSED -> auto-routed to ${offer.fallbackPartner} (${resolvedUrl})`
        : offer.offerType === "evergreen"
        ? "EVERGREEN ACTIVE"
        : activePromo
        ? `PROMO/BOOST ACTIVE (${daysLeft} day(s) remaining until ${offer.expiresAt})`
        : `EVERGREEN FALLBACK MODE (Promo ended ${offer.expiresAt}; permanent link active)`;

    console.log(`\n• [${offer.partnerName}] (${offer.id})`);
    console.log(`  Status   : ${statusBadge}`);
    console.log(`  Live URL : ${resolvedUrl}`);
    console.log(`  Behavior : ${offer.expiredFallbackBehavior}`);

    if (checkHttp) {
      try {
        const res = await fetch(resolvedUrl, {
          method: "GET",
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; URALAffiliateHealthBot/1.0; +https://ural-travel.pages.dev)",
          },
        });
        const finalUrl = res.url || resolvedUrl;
        if (res.status >= 400) {
          console.error(`  [ERROR] HTTP ${res.status} on ${resolvedUrl} -> ${finalUrl}`);
          hasHttpFailure = true;
        } else {
          console.log(`  [HTTP OK] ${res.status} -> ${finalUrl}`);
        }
      } catch (err) {
        console.error(`  [ERROR] Network check failed for ${resolvedUrl}:`, (err as Error).message);
        hasHttpFailure = true;
      }
    }
  }

  if (hasHttpFailure) {
    process.exit(1);
  }
}

main();
