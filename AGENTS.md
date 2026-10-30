# URAL Travel Intelligence — Agent & Contributor Guide (`AGENTS.md`)

This document serves as the canonical technical handoff and architectural reference for AI coding assistants (Claude Code, Cursor, GitHub Copilot, Codex, Google AI Studio) and developers working on **URAL Travel Intelligence** (`https://uraltravel.co.uk`).

## 0. Current baseline and task authority

Start with [`00-URAL-STRATEGY-INDEX.md`](00-URAL-STRATEGY-INDEX.md) and
[`00-URAL-CURRENT-AUDIT.md`](00-URAL-CURRENT-AUDIT.md), the owner's designated diagnostic baseline
from 25 October 2026. The current owner task controls scope; the audit's recommendations are not
automatic implementation approval.

The direction is **Bangladesh-first travel intelligence, with Umrah as the initial commercial/content
learning cycle**. Fard Hajj is a separate, linked topic. UK/diaspora, broader Muslim travel and Europe
are future research. Old cluster plans, calendars, freeze triggers and UK-pivot instructions in
`docs/history/` are historical, not current work orders. The owner-requested
[`URAL-CONTENT-OPTIMIZATION-GUIDE.md`](URAL-CONTENT-OPTIMIZATION-GUIDE.md) is the current editorial-method
standard. [`URAL-SOCIAL-CONTENT-ECOSYSTEM.md`](URAL-SOCIAL-CONTENT-ECOSYSTEM.md) contains the proposed
existing-content production programme. Guides and draft calendars do not authorize article rewrites,
site repairs or live publication outside the current owner task.

---

## 1. Mission & Product Identity

**URAL (উড়াল)** is an editorial **Travel Intelligence Platform** designed primarily for Bangladeshi travelers while serving global visitors worldwide.
- **Core Capabilities:**
  - Global flight search and hotel-partner handoffs using Travelpayouts White Label (`wl_id=22462`), Aviasales, and Kiwi.com (`marker=675992`, project `trs=589561`). The current audit records limitations in the hotel handoff.
  - Step-by-step Tourist, Medical, and Umrah Visa Checklists (`Nepal`, `Thailand`, `Malaysia`, `UAE/Dubai`, `Singapore`, `Maldives`, `Schengen`, `Saudi Arabia`).
  - Bilingual Support (`en` English & `bn` Bengali) with dynamic `<html lang>` synchronization.
  - Multi-Currency Display (`BDT`, `USD`, `EUR`, `GBP`, `SAR`, `AED`). The inspected widget conversions use fixed rates; do not describe them as live FX.
  - Static Prerendering (`scripts/prerender.ts`) generating crawlable HTML, OpenGraph metadata, and Schema.org JSON-LD (`FAQPage`, `Article`, `Organization`, `BreadcrumbList`) for English and Bengali routes. URAL is a travel-information and affiliate referral platform; partner products are not sold by URAL and must not be marked up as URAL `Product`/`Offer` listings.

---

## 2. Affiliate Partner Registry & Lifecycle Rules (`src/components/AffiliatePartners.tsx`)

The canonical registry for Travelpayouts partner links and promotional campaigns is
`src/components/AffiliatePartners.tsx`. The current audit records legacy embeds that bypass it;
the rules below are the required convention, not a claim that every existing call site complies.

### Single Source of Truth
- **`AFFILIATE_LINKS`**: Canonical dictionary of partner `.tpo.li` and short URLs (`aviasales`, `klook`, `tiqets`, `airhelp`, `kkday`, `kiwitaxi`, `welcomePickups`, `airalo`, `qeeq`, `radicalStorage`, `yesim`, `kiwi`, `getTransfer`, `goCity`). **Never hardcode raw `.tpo.li` URLs in UI components**—always import `AFFILIATE_LINKS` and resolve through `resolvePartnerUrl(...)` or `<PartnerLinkButton />`.
- **`AFFILIATE_OFFER_REGISTRY`**: Maps every partner key to its `status` (`"active" | "paused"`), `offerType` (`"evergreen" | "commission-boost" | "customer-promo"`), `fallbackPartner`, and optional `expiresAt` (`YYYY-MM-DD` evaluated in Bangladesh Standard Time `UTC+06:00`).
- **Automatic Fallback Behavior (`resolvePartnerUrl`)**: If a partner program is paused (`status: "paused"`), registry-based callers of `resolvePartnerUrl()` receive the active `fallbackPartner` URL. Hardcoded links bypass that behavior.
- **Automatic Promo Expiry (`isPromoActive` & `sanitizeExpiredPromoText`)**:
  - Time-limited customer promos (such as `KKDAY_PROMO` or `AIRHELP_PROMO`) must always be gated by `isPromoActive(PROMO.expiresAt)`.
  - Blog post body text and CTA headlines must pass through `sanitizeExpiredPromoText(text)` in both `src/App.tsx` and `scripts/prerender.ts` so expired coupon codes or sale dates never appear in live or prerendered HTML.
- **Required Link Attributes**: Every outbound affiliate `<a>` element must include `target="_blank" rel="noopener noreferrer sponsored"`.

---

## 2b. Content Authoring Contract (normative)

**Before writing, upgrading, auditing or repurposing an article, read
[`URAL-CONTENT-OPTIMIZATION-GUIDE.md`](URAL-CONTENT-OPTIMIZATION-GUIDE.md) and
[`docs/growth/10-CONTENT-UPGRADE-STANDARD.md`](docs/growth/10-CONTENT-UPGRADE-STANDARD.md).** The master guide
reconciles editorial methods; the latter retains the field-level acceptance contract for one article.
Both apply to every AI tool and contributor. Social tasks also use the current asset register and source gates.

- **Fields live in three files, not one.** Bodies are in `src/data/blogContent.ts`; English metadata
  (`references`, `internalLinks`, `affiliateCTA`, dates) is in `src/constants.ts`; Bengali overrides are in
  `src/data/bengaliContent.ts`. An audit that greps only the body file will report a fully linked post as unlinked —
  that is what produced the false "blog-17 has no internal links" report on 2026-10-17. Verify in `dist/`, never from
  a single-file grep.
- **"Done" is six gates:** body, ≥3 primary references, ≥4 internal links (≥2 blog→blog, ≥1 hub/money), one relevant
  affiliate CTA, Bengali parity, and build proof. `verify:build` can only assert the structural half.
- **Bengali links have no fallback.** `getLocalizedBlogs("bn")` assigns `internalLinks` from the Bengali override
  only. Omitting the array ships a Bengali article with zero editorial links.
- **Every post category needs a listing filter.** The `/blog` tabs and the category labels they group are defined once
  in `src/utils/blogCategories.ts` (`BLOG_CATEGORY_TABS`, `BLOG_CATEGORY_GROUPINGS`). A new `category`/`categoryBn`
  string that no tab groups is invisible except under "All Guides" — which is how the affiliate-marketing experiment
  shipped unreachable. `verify:build` now fails when any published English *or* Bengali category has no filter, so add
  the label to the right grouping (or a new tab, in both locales) in the same change that publishes the post.
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
   - Opens the Klook partner link (`AFFILIATE_LINKS.klook`); the audited handoff does not carry city/date/guest selections. KKday stay search lives on its own `/kkday-hotels` page (`AFFILIATE_LINKS.kkday`).
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
2. **Use lifecycle labels, not completion badges.** Current, supporting, future and historical labels
   distinguish authority. "COMPLETED ✅" and "Production Ready" belong to dated commits and pull requests;
   they are not durable claims about present implementation.
3. **No line numbers.** They are wrong within one commit. Name the symbol or the surrounding text instead.
4. **Status updates go inline where they are read.** When a section becomes obsolete, replace it with a
   dated resolution note rather than leaving the stale claim standing. Current navigation lives in
   `00-URAL-STRATEGY-INDEX.md`; preserved old work orders must be explicitly historical.
5. **Delete work orders when the work lands.** A plan, checklist or audit that has been executed is not
   documentation — it is a to-do list someone already finished. Its results belong in the code, in
   `DESIGN.md`/`PRODUCT.md`, or in `docs/history/`.
6. **Never record a projected performance number as if measured.** A "Lighthouse: 65 → 80" that was never
   run will be quoted as fact forever. Measure, or say you did not.
7. **Content and growth work starts from the current owner task, index, audit and master optimization guide.**
   `URAL-CONTENT-OPTIMIZATION-GUIDE.md` is the reconciled method; `docs/growth/CONTENT-OS.md` supplies
   supporting workflow and `docs/growth/10-CONTENT-UPGRADE-STANDARD.md` retains acceptance requirements.
   The current social programme uses its own register, source gates and corrected GSC provenance.
   The former content queue, Banking/Umrah rollout plans, social calendars and post-migration roadmaps
   remain archived. Retained research and old approvals cannot reopen them.
