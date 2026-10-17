# Tools Workspace — Deep Analysis & Proposed Redesign

**Date:** 2026-10-17 · **Scope:** `/tools` hub + six tool pages, `/pre-departure`, `/sitemap` · **Status:** report first (per brief — destination menu/page discussed after this)

---

## 1. Executive summary

The tools half of the site now has the right *architecture* (shipped today, §2): seven indexable URLs instead of one hub plus query strings, and the cross-promo guides band moved below every page's own content. What remains is a **craft and depth pass on the tool surfaces themselves**, and it has three pillars:

1. **Readability** — the tools workspace is built almost entirely from 10–12px type. Both canonicals say this is wrong: DESIGN.md's ramp (`body = 1rem`, route H1 = `2.25rem`, micro floor = 10px *for labels only*) and the impeccable typeset rule ("1rem / 16px as the ordinary web body floor"). The user-visible symptom — "the text size seems less" — measures as: **43 `text-xs` (12px) and 19 sub-12px usages inside `InteractiveTools.tsx` alone, against exactly one `text-base`**.
2. **Depth** — each tool is a thin widget with one disclosure line. Post-value CTAs, per-tool FAQs, quiz-style flows and shareable state are the difference between "a demo" and "a tool a traveller bookmarks".
3. **Lucrativeness without gates** — revenue should attach to *moments after value is delivered*, never in front of it, so the tools stay fully usable free (the stated goal).

---

## 2. What already shipped today (foundation for everything below)

| # | Change | Why it matters |
|---|---|---|
| 1 | Six canonical tool URLs: `/tools/currency-converter`, `/tools/budget-calculator`, `/tools/packing-checklist`, `/tools/visa-checker`, `/tools/flight-delay-claim`, `/tools/airport-codes` (prerendered EN+BN, own titles/descriptions/breadcrumbs/H1s, in sitemap, hreflang-paired) | The menu's "no correct URL, no new page" complaint: every tool now ranks on its own intent |
| 2 | Legacy `?tab=` links → clean paths in-app (`normalizeRoutePath`) and at the edge (middleware 301, `_routes.json` include) | All old links, blog anchors and shares converge in one hop |
| 3 | `/pre-departure` split out of `/sitemap` (removed the `_redirects` 301); SitemapPage now has two disjoint variants — checklist hub vs directory | "Pre-Departure → /sitemap" bug fixed; two intents, two canonical URLs, no duplicate content |
| 4 | "Featured Travel Guides" band moved to the end of `<main>` on every page except blog/404, right above the subscription block | Every page now opens with its own content; blog promo only sits where it's contextually last |
| 5 | Menu rewrite: desktop tools panel split "Currency, Packing & Visa Odds" into three dedicated entries; mobile drawer gained quick-chips; footer split into two links | Navigation matches the new URL map |

Verification: `npm run build` → 103 EN + 103 BN routes; `npm run verify:build` → **179/179 checks**; `npm run test:sitemaps` → 23 negative controls pass; `npm run lint` clean. Live preview running against `dist/`.

---

## 3. Audit: typography (the "text size" complaint)

### 3.1 The rules we must satisfy

| Source | Rule |
|---|---|
| DESIGN.md → typography.body | **1rem / 16px** for prose; H1 = `page-title` **2.25rem (`text-4xl`)**; section headings = `text-2xl sm:text-3xl` |
| DESIGN.md → micro floor | Two micro steps only — `label-micro` 11px, `label-micro-sm` 10px — **for labels/pills/table hints, never prose**; "9px is a defect, not a step"; off-ramp sizes (13.5/14.5/15px) are "genuine drift… normalise as touched" |
| impeccable `typeset.md` | "**Use 1rem / 16px as the ordinary web body floor** unless a dense role, platform convention, or user setting justifies otherwise"; keep prose 45–75ch |
| impeccable `craft-floor.md` | Body/placeholder contrast ≥ 4.5:1; more space above a heading than below it; obvious scale steps |
| verify-build `BANNED_CLASS_PATTERNS` | slate-500 on ivory/white at small sizes (4.22:1) already banned elsewhere — same contrast problem still exists on tools surfaces |

### 3.2 Measurements (current code)

| File | `text-xs` (12px) | `text-[11x]` | `text-[10px]` | `text-sm` (14px) | `text-base` (16px) |
|---|---|---|---|---|---|
| `src/components/InteractiveTools.tsx` | **43** | 9 | 10 | 11 | **1** |
| `src/components/AirHelpWidget.tsx` | **35** | 3 | 0 | 2 | 1 |
| `src/components/SitemapPage.tsx` | **37** | 8 | 2 | 10 | 2 |
| `src/routes/ToolsRouteView.tsx` | 1 (subtitle) | 0 | 0 | 5 | 4 |

Specific defects worth naming:

- **ToolsRouteView H1** is `text-3xl` (30px); the canonical route H1 is `text-4xl` (36px). The sitemap/pre-departure heroes already use `text-2xl sm:text-4xl` — the tools H1 is the odd one out.
- **ToolsRouteView subtitle** is `text-xs font-mono text-slate-500` — prose in monospace (DESIGN.md: "monospace as a costume" is a refuse item; "Small uppercase labels belong to Inter's Label role"), at 12px, in slate-500 (4.22:1 on the ivory surface — fails 4.5:1 for body text).
- **Paragraph-length prose inside InteractiveTools** sits at `text-xs`/`text-[10px]`: converter disclosure notes, cost-breakdown rows, result copy, budget-per-person strips. These are sentences users must *read*, not labels they scan.
- **Off-ramp sizes**: `text-[11.5px]` (checklist detail copy in SitemapPage), `text-[11px]` used as prose, `text-[13.5px]` in the drawer — all flagged by DESIGN.md as drift.
- **Emoji-led uppercase eyebrows** (`📋 INTERACTIVE PRE-FLIGHT VERIFICATION`, `🧭 ALL-IN-ONE…`) are a fixed pattern across tools/sitemap sections — impeccable's craft floor bans badge-as-sentence and treats emoji-as-icon as a refuse item; DESIGN.md caps badges at six words.

### 3.3 Proposed typography pass (P0)

Applies only to prose/H1 layers on tool surfaces — labels, pills and data stay on the micro ramp:

1. Route H1 → `ural-page-title … text-4xl` (and per-tool H1s keep their new unique strings).
2. Hero/tool subtitle → `text-sm sm:text-base text-slate-600 font-sans` (drop `font-mono`).
3. All paragraph prose in InteractiveTools / AirHelpWidget / SitemapPage variants → minimum `text-sm` now, `text-base` for lead paragraphs and result summaries; keep `text-xs`/micro **only** for labels, chips, badges, table hints.
4. Normalize off-ramp sizes as touched (11.5 → 12 label, 13.5 → 13/14 per ramp note).
5. Eyebrows: keep the uppercase Inter label, remove emoji, let the H2 carry the weight (heading gets more space above than below).
6. Gate: run `.claude/skills/impeccable/scripts/impeccable detect --json --scope type src/components/InteractiveTools.tsx src/components/AirHelpWidget.tsx src/components/SitemapPage.tsx src/routes/ToolsRouteView.tsx` before/after; add the new prose classes to verify-build's banned-pattern list so `text-xs … slate-500` sentences can't return.

---

## 4. Audit: interactivity & user-friendliness

What already works well (keep): localStorage checklist with readiness meter, tabbed workspace, visible FAQ accordion fed by checklist progress, searchable airport directory, embassy `tel:` links, promo-code-aware AirHelp copy.

Gaps and proposals:

| # | Gap | Proposal | Effort |
|---|---|---|---|
| I1 | Tab switches never change the URL — a user who lands on `/tools/currency-converter`, clicks "Flight Delay Claim" and shares the address bar shares the wrong page | Sync active tab → canonical path via `history.replaceState` (no scroll), and set `initialTool` from the path on load (prop already shipped) | S |
| I2 | Converter rates are a hardcoded indicative table (honestly disclosed) with no date | Show "rates as of <date> · confirm with your bank", link the dual-currency endorsement guide; consider a client-side fetch with static fallback later | S |
| I3 | Packing checklist is generic — same list for a 3-day Bangkok trip and a 2-week family tour | Trip-length + destination toggles that add/remove items; **print/export** action (travellers re-read at the airport, offline) | M |
| I4 | Visa checker is a static status matrix | 4-question mini-eligibility flow (passport age, purpose, prior visas, travel history) that *outputs* the matrix row, with a hard "verify with the embassy" disclaimer (consistent with existing fee-evidence rules) | M |
| I5 | Budget calculator ends in a number with nowhere to go | Results → WhatsApp flight-deal alert CTA + "save as trip brief" (shareable text summary) | S |
| I6 | Airport directory: search only | Add airline/region filter chips; keep the WhatsApp inquiry CTA | S |
| I7 | No cross-tool discovery after today's split | "Next tool" strip in ToolsRouteView footer linking the other five canonical URLs (crawlable + UX) | S |
| I8 | FAQ answers exist only on the hub (deliberate: no duplicate FAQPage graphs) | Write **unique** 2–3 Q&A pairs per tool page (visible + FAQPage schema each) — the AEO/answer-engine play that AGENTS.md's six content gates are designed for | M |

---

## 5. Audit: lucrativeness (revenue without paying walls)

Current monetization: Travelpayouts flights/hotels widgets (booking steps 1–2), Klook activities (step 3), Airalo eSIM (step 4), AirHelp widget (eligibility → claim), footer affiliate links, subscription band (now correctly placed after the guides band).

The gap is **post-value moments** — CTAs that appear *after* the tool has done its job:

1. **After a conversion result** → "Lock this budget: endorse your card first" → dual-currency guide + (registry-listed) bank/partner link.
2. **After the packing checklist hits 100%** → "Fly covered" → insurance/eSIM partner block (already registered partners only).
3. **After visa odds output** → "Check the flight" → Travelpayouts widget anchor (same page, step-1 element already rendered).
4. **After flight-delay eligibility says "likely eligible"** → elevated AirHelp CTA (existing partner, promo-aware copy — already gated by `isPromoActive` + `sanitizeExpiredPromoText`).
5. **Subscription band** now follows the guides band on every page — one A/B test on its microcopy ("Get fare drops + visa-rule changes for your routes") is a cheap P1 win.

**Hard constraints (from AGENTS.md — non-negotiable):** every affiliate destination must come from `AFFILIATE_LINKS` via `resolvePartnerUrl`; sponsored links carry `rel="sponsored"`; promo copy passes `sanitizeExpiredPromoText`; no new partner appears outside the registry. Tools must remain fully usable with zero purchase — no CTA may block a result.

---

## 6. Content strategy alignment

- **One job per URL** (shipped): hub = workspace + FAQ; sub-pages = single intent; `/pre-departure` = readiness; `/sitemap` = directory. Keep new tool content on these URLs — don't spin blog posts that compete with them; blog posts *link* to tool URLs (internal-link sections already wired in prerender).
- **Answer-engine readiness:** per-tool key-facts (TravelIntelligence `keyFacts` are currently identical across all six pages — make them tool-specific), unique FAQs (I8), HowTo schema candidate for the packing checklist.
- **Free-value goal:** the six tools + pre-departure hub are the free layer a traveller can use end-to-end without buying anything; the audit's revenue ideas only attach *after* value. Measure: zero gates added behind the tools in any P1/P2 change.

---

## 7. Prioritized backlog

| Priority | Item | Acceptance criteria |
|---|---|---|
| **P0** | Typography pass (§3.3) on InteractiveTools, AirHelpWidget, ToolsRouteView, both SitemapPage variants | No prose below `text-sm`; H1 = `text-4xl`; every paragraph ≥4.5:1; `impeccable detect --scope type` clean on the four files; verify:build green with new banned patterns |
| **P0** | Tab → URL sync (I1) | Switching tabs on `/tools/...` rewrites the address bar to the canonical slug; refresh keeps the tool |
| **P1** | Unique per-tool FAQs + keyFacts (I8) | Each tool page emits its own visible Q&A + FAQPage node; hub keeps the shared four; no FAQ node duplicated across URLs (verify extension) |
| **P1** | Post-value CTAs (§5.1–5.4) | Each tool has exactly one contextual CTA after its result; all links from registry; expiry-gated |
| **P1** | Packing print/export + trip toggles (I3), converter rate date (I2), next-tool strip (I7) | Print view fits one A4; state survives reload; strip renders on all six pages |
| **P2** | Visa mini-flow (I4), airport filter chips (I6), calculator → WhatsApp brief (I5), subscription-band copy test | Flow disclaims official verification; filters keyboard-accessible; measurable CTR on new CTAs |
| **P2** | HowTo schema + per-tool AEO blocks; icon pass replacing emoji eyebrows | Schema validates; craft-floor checks green |

Estimated shape: P0 ≈ 1 focused session (mostly mechanical class swaps + a small hook), P1 ≈ 2 sessions (copy-heavy), P2 as needed.

---

## 8. Out of scope (queued)

- **Destination menu / destination pages** — explicitly parked for discussion after the tools topic is settled, per the brief. (First observations reserved for that discussion; nothing in this report touches them.)
- Blog/UX areas outside `/tools`, `/pre-departure`, `/sitemap`.

---

*Evidence: file/line metrics gathered from `src/components/InteractiveTools.tsx`, `src/components/AirHelpWidget.tsx`, `src/components/SitemapPage.tsx`, `src/routes/ToolsRouteView.tsx`; rules from `DESIGN.md` (typography ramp + micro floor), `.claude/skills/impeccable/reference/typeset.md` + `craft-floor.md`, `AGENTS.md` (affiliate registry, content gates), `scripts/verify-build.ts` (banned patterns, 179 checks).*
