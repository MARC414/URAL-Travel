# URAL Travel Intelligence — Agent & Contributor Guide (`AGENTS.md`)

This document serves as the canonical technical handoff and architectural reference for AI coding assistants (Claude Code, Cursor, GitHub Copilot, Codex, Google AI Studio) and developers working on **URAL Travel Intelligence** (`https://ural-travel.pages.dev`).

---

## 1. Mission & Product Identity

**URAL (উড়াল)** is an editorial **Travel Intelligence Platform** designed primarily for Bangladeshi travelers while serving global visitors worldwide.
- **Core Capabilities:**
  - Global Flight & Hotel Search powered by Travelpayouts White Label (`wl_id=22462`), Aviasales, Hotellook, and Kiwi.com (`marker=675992`, `trs=540277`).
  - Step-by-step Tourist, Medical, and Umrah Visa Checklists (`Nepal`, `Thailand`, `Malaysia`, `UAE/Dubai`, `Singapore`, `Maldives`, `Schengen`, `Saudi Arabia`).
  - Bilingual Support (`en` English & `bn` Bengali) with dynamic `<html lang>` synchronization.
  - Real-time Multi-Currency Display (`BDT`, `USD`, `EUR`, `GBP`, `SAR`, `AED`).
  - Static Prerendering (`scripts/prerender.ts`) generating crawlable HTML, OpenGraph metadata, and Schema.org JSON-LD (`FAQPage`, `Article`, `TravelAgency`, `BreadcrumbList`) for all 70+ routes.

---

## 2. Affiliate Partner Registry & Lifecycle Rules (`src/components/AffiliatePartners.tsx`)

All Travelpayouts partner links and promotional campaigns are managed centrally in `src/components/AffiliatePartners.tsx`.

### Single Source of Truth
- **`AFFILIATE_LINKS`**: Canonical dictionary of partner `.tpo.li` and short URLs (`aviasales`, `klook`, `tiqets`, `airhelp`, `kkday`, `kiwitaxi`, `welcomePickups`, `airalo`, `qeeq`, `radicalStorage`, `yesim`, `kiwi`, `getTransfer`, `goCity`). **Never hardcode raw `.tpo.li` URLs in UI components**—always import `AFFILIATE_LINKS` and resolve through `resolvePartnerUrl(...)` or `<PartnerLinkButton />`.
- **`AFFILIATE_OFFER_REGISTRY`**: Maps every partner key to its `status` (`"active" | "paused"`), `offerType` (`"evergreen" | "commission-boost" | "customer-promo"`), `fallbackPartner`, and optional `expiresAt` (`YYYY-MM-DD` evaluated in Bangladesh Standard Time `UTC+06:00`).
- **Automatic Fallback Behavior (`resolvePartnerUrl`)**: If a partner program is ever paused (`status: "paused"`), `resolvePartnerUrl()` automatically returns the active `fallbackPartner` URL across every CTA button, contextual callout, and prerendered link.
- **Automatic Promo Expiry (`isPromoActive` & `sanitizeExpiredPromoText`)**:
  - Time-limited customer promos (such as `KKDAY_PROMO` or `AIRHELP_PROMO`) must always be gated by `isPromoActive(PROMO.expiresAt)`.
  - Blog post body text and CTA headlines must pass through `sanitizeExpiredPromoText(text)` in both `src/App.tsx` and `scripts/prerender.ts` so expired coupon codes or sale dates never appear in live or prerendered HTML.
- **Required Link Attributes**: Every outbound affiliate `<a>` element must include `target="_blank" rel="noopener noreferrer sponsored"`.

---

## 3. Global Flight & Hotel Search Architecture

1. **Global Flight Scanner (`src/components/TravelpayoutsWidget.jsx`)**:
   - Defaults to `Dhaka (DAC)` for convenience, while supporting **any global origin or destination city/airport** via a 65+ international airport directory plus live autocomplete from `https://autocomplete.travelpayouts.com/places2`.
   - Verified Bangladesh departure routes render the curated benchmark schedule table + URAL White-Label toggle.
   - Unlisted global routes (e.g., `London → New York`, `Dhaka → Rome`, `Toronto → Istanbul`) **never display fake flight schedules**; instead, they automatically open the live **URAL White-Label Search Engine** (`public/travelpayouts-wl.html`) and provide one-click partner buttons for Aviasales Global (`marker=675992`) and Kiwi.com Multi-City.
2. **Global Hotel & Flight Custom Widget (`src/components/TravelpayoutsCustomWidget.tsx`)**:
   - Features the **Explore Popular Cities** 12-hub selector (`Makkah`, `Paris`, `Dubai`, `Madinah`, `Bangkok`, `Kuala Lumpur`, `London`, `Singapore`, `Maldives`, `Istanbul`, `Kathmandu`, `New York`) above the global search bar.
   - Supports any worldwide city or hotel query with live Travelpayouts autocomplete, check-in/check-out date pickers, guest counter, and 6-currency selector.
   - Dispatches live hotel searches to `https://search.hotellook.com/?marker=675992&trs=540277...` and Klook (`AFFILIATE_LINKS.klook`).
3. **Standalone & Embedded URAL White Label (`public/travelpayouts-wl.html`)**:
   - Uses Travelpayouts White Label `wl_id=22462` (`tpembd.com/wl_web/main.js?wl_id=22462`).
   - When opened in a new tab with `?standalone=1`, displays the full URAL Travel Intelligence Navy (`#0B192C`) & Gold (`#F6B73C`) header, navigation bar, and footer. When embedded inside an iframe, hides the standalone chrome and posts height updates to the parent window.

---

## 4. Admin / Internal Views

- `src/components/TravelpayoutsOnboarding.tsx` and `src/components/AeoInspector.tsx` are internal owner/operator diagnostics.
- They are strictly lazy-loaded and gated behind `isAdmin` (`?admin`, `?inspector`, or `?onboarding=true` URL query parameters) in `src/App.tsx` and are **never** included in `scripts/prerender.ts` or public sitemaps.

---

## 5. Build, Verification & Prerendering Commands

- `npm run lint` — Runs `tsc --noEmit` to verify TypeScript types across `src/`.
- `npm run build` — Runs `vite build` followed by `tsx scripts/prerender.ts` to generate static route HTML and sitemaps in `dist/`.
- `npm run build:spa` — Runs `vite build` only.
