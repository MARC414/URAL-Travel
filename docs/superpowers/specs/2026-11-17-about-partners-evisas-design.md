# Design: About page upgrade, About menu group, and two partner pages

**Date:** 17 November 2026 · **Status:** draft for owner approval
**Owner decisions already taken in conversation:** three pages grouped under an "About"
header menu (About URAL · Our Partners · Visa Assistance); About also enters the footer;
footer stays structurally light (F1); the eVisas "42+ destinations" claim is stated once,
cleanly, with the dated Bangladesh observation — no editorialising about the provider.

---

## Intent and why

URAL earns through two affiliate programmes — Travelpayouts (network for flights, stays,
tours, eSIM, transfers, compensation and more) and eVisas.com (paid visa-application
assistance) — but a reader cannot learn this anywhere on the site. `/about` exists, is
absent from the header and all footer columns, carries no partner or eVisas explanation,
and its crawlable half (`scripts/prerender.ts`) and its React half
(`src/routes/AboutRouteView.tsx`) have drifted apart. Meanwhile the footer's Travel
Services column lists six Travelpayouts brands but not eVisas, the newest earning pathway.

Goal: a reader (or an answer engine) can learn, in one click from the header or footer,
who URAL is, which partners power the booking actions, how the money works, and exactly
where URAL's role ends and the partner's begins — in English and Bengali, crawler-visible
and React-visible, without breaking any existing build guard.

## Goals

1. `/about` rewritten around the approved draft: what URAL does, the eVisas role split,
   the affiliate disclosure, commitments, contact. Both render halves unified in substance;
   Bengali parity throughout.
2. Two new static pages, both EN + BN, prerendered, in the sitemap:
   - `/partners` — the Travelpayouts network and every partner family, function + reader
     benefit + where to find it on URAL, with dated third-party trust facts.
   - `/visa-assistance` — what eVisas is, how it works, the URAL–eVisas relationship,
     when the official portal is the better route, what URAL does not do.
3. Header: a compact "About" dropdown (desktop) holding the three pages; mobile drawer
   entries; footer links in the brand column plus an eVisas entry heading the Travel
   Services column.
4. All money/trust claims carry an attribution and a "checked" date; links resolve through
   the affiliate registry.

## Non-goals

- No blog article in this release (a follow-up batch may add one under the six-gate standard).
- No footer restructure beyond the additions above (no support-band move, no column merge).
- No changes to the eVisas placement map, homepage widget, or `EVISAS.md` placements.
- No new languages, no domain/route-group changes, no edits to admin surfaces.

## Anti-goals (a failure even if it ships)

- Any sentence implying URAL processes visas, collects documents, or decides outcomes.
- Republished provider marketing claims stated as our findings (approval rates, "98%+").
- Any commission rate, rev-share figure or deal term in reader-facing copy.
- Hype wording from the C1 clutter list ("Trusted by", "Verified partner", "Best price…").
- Unattributed numbers — every figure dated and sourced, per the Number rule.

## Constraints

- **Registry only:** partner URLs resolve via `resolvePartnerUrl` / `evisasDestinationUrl`;
  `rel="noopener noreferrer sponsored"` on every outbound affiliate anchor; campaign links
  never hand-edited.
- **Dual rendering:** every page must exist as React route view *and* `prerender.ts`
  `bodyHtml` in substance; `verify:build` compares rendered content and link contracts.
- **Bengali parity:** same sections, facts, links, CTAs; Bengali authored, not machine
  word order; `BENGALI_SEO_COPY` entries added so the BN twins actually build.
- **Footer CI guard:** the 12-column row arithmetic and full-width band are asserted by
  `scripts/verify-build.ts`; this design does not disturb them.
- **eVisas widget consent:** any widget embed stays marketing-consent gated
  (`evisaWidgetConsent.ts`); direct partner link always available without consent.
- **DESIGN.md:** navy/ivory/gold/emerald tokens; Lucide icons, not emoji (the current
  About view's emoji icons get replaced); no border-left tells; verify at 390/768/1280.
- **Content standards:** `URAL-CONTENT-OPTIMIZATION-GUIDE.md` voice and structure;
  `docs/growth/10-CONTENT-UPGRADE-STANDARD.md` linking/affiliates/FAQ rules.

## Approaches considered

- **Header About placement:** top-level item rejected (crows 1280px); utility-strip link
  rejected (buried). Chosen: compact dropdown using the existing mega-menu pattern.
- **Footer depth:** full restructure (F2: fold support band into brand column) rejected —
  it must re-work a CI guard installed after a footer defect, for modest gain. Chosen: F1
  additions inside the existing grid.
- **Partner content shape:** one long About page rejected (mixes identity with directory);
  blog-first rejected (six gates are a separate lift). Chosen: two focused static pages.

## The decided design

### 1. `/about` (rewrite in place)

Sections, EN and BN (draft supplied by owner, adapted to house voice):
1. Hero: what URAL is — Bangladesh-first travel-intelligence platform, global readers.
2. What we do: five concrete capabilities (visa/entry information, flight options,
   accommodation research, trip budgets in BDT, destination guides) with links.
3. Visa application assistance through our partner (eVisas): the role split — URAL
   informs and refers; eVisas assists applications under its own terms; governments decide.
   Bulleted "our role" list from the approved draft.
4. Our affiliate disclosure: commissions possible on qualifying actions, no extra cost,
   provider sets price/terms.
5. Our editorial commitments (sources dated, links marked, corrections via contact).
6. Contact CTA (WhatsApp, email, form).

### 2. `/partners` — Our travel partners (new)

1. Quick answer: URAL links to partners who complete the booking; URAL may earn a
   commission at no extra cost; prices and terms are set by the partner.
2. How the model works: hosted flight search (Page 24232) and partner handoffs; no fake
   fares or invented schedules; affiliate links marked `sponsored`.
3. About Travelpayouts, with dated facts and sources: network operated by Go Travel Un
   Limited (registered in Hong Kong, 2011 — their published terms); Trustpilot 4.5/5 from
   257 reviews (checked 17 Nov 2026, linked); "100+ partner programmes, 300,000+ creators"
   presented as the company's own description (linked). URAL's account marker 675992.
4. Partner directory by job — one table per group (tabular data as tables):
   flights (Aviasales, Kiwi.com, URAL hosted search) · stays (Klook hotels, KKday hotels) ·
   tours & attractions (Klook, Tiqets, Go City) · connectivity (Airalo, Yesim) ·
   transfers (Kiwitaxi, GetTransfer, Welcome Pickups) · protection & extras (AirHelp,
   Qeeq car rental, Radical Storage). Columns: Partner / What it's for / What you get / Where on URAL.
5. What this means for you: free guides, marked links, official sources named first.
6. Link to `/visa-assistance` for the visa leg; disclosure line; contact.

   **Builder check resolution (partner-table links):** the Partner column in each table
   carries the registry-resolved outbound partner link (marked `sponsored`, ↗); the
   "Where on URAL" column stays internal. One outbound link per row, page-level
   disclosure present. *Builder's call, visible for owner review.*

   **Builder check resolution (source links):** verified 17 November 2026 by the author;
   these exact URLs are the attribution targets. If a figure is not reproducible at one
   of these pages at build time, the figure does not render (drop it; do not substitute):
   - Travelpayouts terms / Go Travel Un Limited registration:
     `https://support.travelpayouts.com/hc/en-us/articles/360004162111`
   - Trustpilot (4.5/5, 257 reviews): `https://www.trustpilot.com/review/travelpayouts.com`
   - G2 (4.7/5, 16 reviews): `https://www.g2.com/products/travelpayouts/reviews`
   - Travelpayouts company description (100+ programmes, 300k+ creators):
     `https://www.travelpayouts.com/about` (company's own claim, attributed as such)
   - eVisas About / operator identity: `https://evisas.com/about-us`
   - eVisas Terms (private service, not a government agency, fee structure):
     `https://evisas.com/terms-and-conditions`
   - eVisas FAQ (how it works): `https://evisas.com/faq`

### 3. `/visa-assistance` — Visa application assistance through eVisas (new)

1. Quick answer (~50 words, AEO): URAL provides information and referrals; eVisas.com
   provides paid application assistance for 42+ destinations (their catalogue); visa
   decisions rest with governments.
2. The URAL–eVisas relationship: referral partner since November 2026; commission on
   qualifying applications; URAL does not process, collect, decide or charge.
3. How eVisas works, four steps (their site, checked 17 Nov 2026): check requirements →
   guided application → pay government fee + service fee → receive decision; a consultant
   reviews each application.
4. Who eVisas is: TravelRox, Inc., registered in New York and Delaware; a private service
   that "is not a government agency" (their own words, linked); 9+ years, 10,000+ visas
   processed — stated as the company's figures (their About/Terms, dated links).
5. Destinations and your passport: 42+ destinations in their catalogue; the checker shows
   the live list for your passport — 16 destinations were listed for Bangladesh when
   checked 15 November 2026, and Thailand is not among them, so Bangladeshi passport
   holders use the official Thai e-Visa portal (link the existing guide). One clean
   paragraph, no editorialising.
6. Official portal first: when direct application is the better choice; the fee structure
   (government fee + separate service fee) and that applying direct pays only the
   government fee; link the site's official-source sections.
7. What URAL does not do (bullet list).
8. FAQ (five real questions: government site? who processes? cost? apply direct? who approves?).
9. Optional owner decision flagged below: embed the existing consent-gated eVisas checker
   in this page — its natural home, reusing `EVISAS_WIDGET`.

### 4. Navigation and footer

- Desktop header: "About" text item with chevron after Tools, opening a compact dropdown
  (same a11y pattern as the Destinations menu): About URAL `/about` · Our Partners
  `/partners` · Visa Assistance `/visa-assistance` — labels localized.
- Mobile drawer: "About URAL" and "Our Partners" added to the Tools & Help group's
  primaryLinks; "Visa Assistance (eVisas)" added to the Flights/Hotels/Visas group.
- Footer, brand column: About URAL · Our Partners · Visa Assistance · Contact · Privacy
  as normal-size links. Travel Services column: eVisas "Visa application assistance"
  entry first (registry URL, sponsored attributes), then existing seven.
- `/sitemap` page and prerender sitemap lists include both new routes, both locales.

### 5. Verification per batch

Each batch: `npm run lint`, `npm run build`, `npm run verify:build`; browser pass at 390,
768 and 1280 in EN and BN for the touched surfaces (header dropdown, footer, three pages),
including keyboard focus on the new dropdown; existing `evisaChecks` must stay green.

## Skills applied during execution

- `copywriting` then `copy-editing`: all three pages' prose (EN first, then authored BN).
- `ui-ux-pro-max` (design intelligence) and `ui-styling`: dropdown, footer links, page layouts.
- `verification-before-completion`: before any "done" claim.

## What's left to the builder

Exact section copy (drafts come back for review), table row wording, whether the
`/visa-assistance` page embeds the consent-gated widget (owner preference; default is yes),
final link anchors, and any additional `verify:build` assertion worth adding for the two
new routes (recommended: a render + parity check mirroring the contact-view stub).

## Builder-check resolutions (settled; owner can veto while reading)

1. **The owner's approved About draft exists** (supplied in conversation, 17 Nov 2026).
   Its role-split bullets and disclosure wording are normative starting points; the
   builder adapts them to house voice, it does not re-author role-split language. Key
   bullets preserved: URAL does not process applications; does not collect/submit
   passports or documents; does not charge visa fees or make decisions; assistance,
   document review, submission and support are eVisas' under its own terms; approval and
   entry decisions rest with governments; using eVisas is the reader's choice, and the
   official government route is always worth checking first.
2. **Founder block stays (builder's call).** The owner's draft has no founder section,
   but both current halves are single-editor E-E-A-T surfaces and the `<title>` names
   Farhan Momen. Resolution: keep a compact founder/editor block (two sentences, not the
   old full-width card) and keep the title's founder naming, so identity/E-E-A-T is not
   silently lost. Owner review welcome at draft-copy stage.
3. **If a trust figure is not reproducible on the day of the build, it is dropped,**
   never rounded or replaced from memory.
4. **Partner-table link shape:** outbound partner link in the Partner column (marked),
   internal link in the "Where on URAL" column (see §2).
5. **If the ninth header label overflows at 1280px,** the concession order is: tighten
   nav gaps (`xl:gap-4` → `xl:gap-3`), then CTA padding — copy-level only. Moving or
   merging an existing nav item is an owner decision and out of scope.

## Open questions for the owner

None blocking — the widget embed on `/visa-assistance` is the only true preference call
and defaults to yes.
