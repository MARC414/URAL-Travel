# URAL Travel Intelligence — Agent & Contributor Guide (`AGENTS.md`)

This document serves as the canonical technical handoff and architectural reference for AI coding assistants (Claude Code, Cursor, GitHub Copilot, Codex, Google AI Studio) and developers working on **URAL Travel Intelligence** (`https://ural-travel.pages.dev`).

---

## 1. Mission & Product Identity

**URAL (উড়াল)** is an editorial **Travel Intelligence Platform** designed primarily for Bangladeshi travelers while serving global visitors worldwide.
- **Core Capabilities:**
  - Global Flight & Hotel Search powered by Travelpayouts White Label (`wl_id=22462`), Aviasales, and Kiwi.com (`marker=675992`, `trs=540277`).
  - Step-by-step Tourist, Medical, and Umrah Visa Checklists (`Nepal`, `Thailand`, `Malaysia`, `UAE/Dubai`, `Singapore`, `Maldives`, `Schengen`, `Saudi Arabia`).
  - Bilingual Support (`en` English & `bn` Bengali) with dynamic `<html lang>` synchronization.
  - Real-time Multi-Currency Display (`BDT`, `USD`, `EUR`, `GBP`, `SAR`, `AED`).
  - Static Prerendering (`scripts/prerender.ts`) generating crawlable HTML, OpenGraph metadata, and Schema.org JSON-LD (`FAQPage`, `Article`, `TravelAgency`, `BreadcrumbList`) for all 206 routes (103 English + 103 Bengali).

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

## 2b. Content Authoring Contract (normative)

**Before writing, upgrading, or auditing an article, read
[`docs/growth/10-CONTENT-UPGRADE-STANDARD.md`](docs/growth/10-CONTENT-UPGRADE-STANDARD.md).** It is the acceptance
contract for one article and applies to every AI tool and contributor.

- **Fields live in three files, not one.** Bodies are in `src/data/blogContent.ts`; English metadata
  (`references`, `internalLinks`, `affiliateCTA`, dates) is in `src/constants.ts`; Bengali overrides are in
  `src/data/bengaliContent.ts`. An audit that greps only the body file will report a fully linked post as unlinked —
  that is what produced the false "blog-17 has no internal links" report on 2026-10-17. Verify in `dist/`, never from
  a single-file grep.
- **"Done" is six gates:** body, ≥3 primary references, ≥4 internal links (≥2 blog→blog, ≥1 hub/money), one relevant
  affiliate CTA, Bengali parity, and build proof. `verify:build` can only assert the structural half.
- **Bengali links have no fallback.** `getLocalizedBlogs("bn")` assigns `internalLinks` from the Bengali override
  only. Omitting the array ships a Bengali article with zero editorial links.
- **CI enforces the structure.** `npm run verify:build` fails on dead, duplicate, or self links, unknown affiliate
  providers, a Hajj & Umrah article with fewer than two blog links, and curated anchors missing from the rendered EN
  or BN page. It also prints a non-blocking `[content-debt]` report; green CI is not a pass on the debt.

---

## 3. Global Flight & Hotel Search Architecture

1. **Global Flight Scanner (`src/components/TravelpayoutsWidget.jsx`)**:
   - Defaults to `Dhaka (DAC)` for convenience, while supporting **any global origin or destination city/airport** via a 65+ international airport directory plus live autocomplete from `https://autocomplete.travelpayouts.com/places2`.
   - Verified Bangladesh departure routes render the curated benchmark schedule table + URAL White-Label toggle.
   - Unlisted global routes (e.g., `London → New York`, `Dhaka → Rome`, `Toronto → Istanbul`) **never display fake flight schedules**; instead, they automatically open the live **URAL White-Label Search Engine** (`public/travelpayouts-wl.html`) and provide one-click partner buttons for Aviasales Global (`marker=675992`) and Kiwi.com Multi-City.
2. **Global Hotel & Flight Custom Widget (`src/components/TravelpayoutsCustomWidget.tsx`)**:
   - Features the **Explore Popular Cities** 12-hub selector (`Makkah`, `Paris`, `Dubai`, `Madinah`, `Bangkok`, `Kuala Lumpur`, `London`, `Singapore`, `Maldives`, `Istanbul`, `Kathmandu`, `New York`) above the global search bar.
   - Supports any worldwide city or hotel query with live Travelpayouts autocomplete, check-in/check-out date pickers, guest counter, and 6-currency selector.
   - Dispatches live hotel searches to Klook (`AFFILIATE_LINKS.klook`); KKday stay search lives on its own `/kkday-hotels` page (`AFFILIATE_LINKS.kkday`).
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
- `npm run verify:build` — Runs the post-build assertions against `dist/` (metadata, sitemap `lastmod`, schema,
  rendered content, and the content-linking contract). It must exit 0 before a change is reported as shipped.
- `npm run build:spa` — Runs `vite build` only.

---

## 6. Source Assets & Backups (outside this repository)

Some asset masters deliberately live **outside** the repo, on the site owner's machine, because they
are large and the optimized derivatives are what ships. Do not assume a missing original is lost:

- **Image masters:** `E:\e-COMMERCE BUSINESS WEBSITE\URAL\image-masters-backup\` — the full-resolution
  originals behind `public/img/` and `src/assets/optimized-social/`. This is where to go if a re-encode
  at a different size or quality is ever needed.
- **Brand kit backup:** `URAL-brand-kit-backup.zip` (workspace root, outside the repo) — a copy of
  `brand-kit/` as it stood before the 2026-10-13 cleanup, in case the relocation needs reverting.
- The parent folder also holds `Gemini AP Key.txt` and `Doamin.txt`. **Never `git add` them, never
  initialize a repository in that parent folder, never print their contents.**

## 7. Documentation Lifecycle — keep docs honest

This repository accumulated documents that described a past state in the present tense, and then
misled the next reader. The rule that prevents it:

1. **A document states facts that are true today, or it says loudly that it is historical.**
   Archived material goes in `docs/history/` behind a `HISTORICAL RECORD — DO NOT TREAT AS CURRENT
   STATE` banner, with stale details marked as stale. Read `docs/history/2026-10-performance-and-fonts.md`
   for the pattern.
2. **No status banners in documents.** "COMPLETED ✅" and "Production Ready" belong to git commits and
   pull requests, which are dated and immutable. A document's status rots silently — and then misleads.
3. **No line numbers.** They are wrong within one commit. Name the symbol or the surrounding text instead.
4. **Status updates go inline where they are read.** When a section becomes obsolete, replace it with a
   dated resolution note rather than leaving the stale claim standing (see `docs/growth/README.md` §0
   rule 6 for the pattern).
5. **Delete work orders when the work lands.** A plan, checklist or audit that has been executed is not
   documentation — it is a to-do list someone already finished. Its results belong in the code, in
   `DESIGN.md`/`PRODUCT.md`, or in `docs/history/`.
6. **Never record a projected performance number as if measured.** A "Lighthouse: 65 → 80" that was never
   run will be quoted as fact forever. Measure, or say you did not.
7. **Content and growth work starts from the execution layer, not from a sprint list.** Read
   `docs/growth/CONTENT-OS.md` §1 for the order, then the **active cluster plan**
   (`docs/growth/UMRAH-CLUSTER-PLAN.md`) and its row in `docs/growth/CONTENT-QUEUE.md`. Release order comes
   from the cluster plan and queue. `docs/growth/CONTENT-STRATEGY-2026.md` is the site-wide gap inventory and
   scoring model — its §6 gap register and §12 sprints are **analysis, not schedule**: its India pillar
   ("Dhaka↔Kolkata land route") is the largest *content* gap and is explicitly **not** the next work item.
   The cluster in progress is **Umrah**; **Fard Hajj is a separate, linked topic**. `docs/growth/README.md`
   §2A carries the same precedence note.
