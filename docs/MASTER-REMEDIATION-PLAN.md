# URAL Travel — MASTER REMEDIATION PLAN (Mentor Playbook)

> **Purpose & audience.** Single source of truth for finishing the Core Web
> Vitals (CWV) work, applying the *verified* subset of a third-party content
> audit, closing real a11y/schema gaps, and sequencing the deeper E-E-A-T
> roadmap. One session (the "mentor") starts execution; **other AI tools continue
> from this document**. Written to be executed without the author present.

## Context

- Site: React 19 + Vite 6 + Tailwind 4, Cloudflare Pages, static prerender. CWV
  had plateaued (~85 mobile). Root cause fixed on `perf/cwv-bengali-font-a11y`:
  the Bengali Taka sign `৳` (U+09F3) sat inside the Noto Bengali `unicode-range`,
  dragging a 57 KiB font onto every English page's critical path. Fixed by
  splitting the range (`U+0980-09F1` + `U+09F4-09FF`) + a `verify-build` guard.
- A third-party **content audit** was supplied. Verified against the live repo it
  is **substantially stale and contains one dangerous claim** — do NOT bulk-apply.

## Grounded findings (trust these over the audit — verified against current repo)

- **Biman baggage "20 kg outbound" = DANGEROUS / HOLD.** `blogContent.ts` already
  frames it correctly: *"WEIGHT CONCEPT (30 KG) VS. PIECE CONCEPT (2×23 KG =
  46 KG)"*. Weight-concept = **30 kg** (more correct than the audit's 20 kg).
  **Do not insert 20 kg anywhere.**
- **Already DONE (do not redo):** `document.documentElement.lang` (`App.tsx`,
  sets `bn-BD`/`en-BD`); sitemap `<lastmod>` (verify:build asserts 0 missing);
  `_headers` cache rules; `twitter:card` (`index.html`); `$12k→$18k` quota
  (`blogContent.ts` already says "$18,000 … raised from $12,000 under FE Circular
  No. 33"); Thailand stated as **e-Visa** not VoA; EC261 base scope present.
- **Audit line numbers are from an older snapshot. Grep the exact current string
  before every edit — never edit by line number.**

## RULES FOR ALL EXECUTORS (no-mistake safeguards)

1. **SYNC FIRST.** `git fetch origin`; integrate the owner's latest `main` before
   editing. Owner changed CWV files — re-locate every target by grep.
2. **Never hardcode an unverified figure.** Biman outbound number is HOLD until a
   primary source (biman-airlines.com / the e-ticket) confirms it.
3. **Bilingual parity.** Every EN edit in `src/data/blogContent.ts` needs its BN
   counterpart in `src/data/bengaliContent.ts` (or an explicit note why not).
4. **One branch per concern; small single-purpose commits.** End messages with
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
5. **Validate before every commit:** `npm run lint`; then (Windows: run directly,
   `npm run build` fails on the `NODE_ENV=` prefix via cmd):
   `NODE_ENV=production node_modules/.bin/vite build && node_modules/.bin/tsx scripts/prerender.ts`
   then `node_modules/.bin/tsx scripts/verify-build.ts` (all-green).
6. **Never `git add -A`.** Stage explicit paths so unrelated working-tree churn
   (e.g. the brand-asset move) never lands in the wrong PR.
7. **Add/keep `verify-build.ts` guards** for regression-prone changes.
8. `gh` is not installed here & no token — open PRs by URL:
   `https://github.com/MARC414/URAL-Travel/pull/new/<branch>`.

## Branch strategy

- `perf/cwv-bengali-font-a11y` (exists, pushed) — **Workstream A**.
- `content/accuracy-fixes` (new) — **Workstream B**.
- `a11y/schema-fixes` (new) — **Workstream C**.
- `chore/de-nest-brand-assets` (new) — **Workstream E**.
- **Workstream D** (deeper E-E-A-T) — later, owner-guided, own branches.

---

## Workstream A — Finish CWV (`perf/cwv-bengali-font-a11y`)

Committed already: font range split (`index.html`, `public/fonts/fonts.css`),
`verify-build` guard, hero animations (`src/index.css`), footer link a11y
(`App.tsx`). Remaining:

- **A1. Three measured contrast fixes** (re-locate by grep; line #s may have moved):
  - `src/components/TravelpayoutsWidget.jsx` "Popular Hubs:" `text-slate-400` → `text-slate-600` (2.6:1 on white FAIL → 7.6:1).
  - `src/App.tsx` "Featured Travel Guides / Verified Playbooks" wrapper `text-slate-500` (on brand-ivory) → `text-slate-600` (4.2:1 FAIL → 6.7:1).
  - `src/App.tsx` footer compliance bar `text-slate-500` (on brand-navy) → `text-slate-400` (3.9:1 FAIL → 7.3:1). *(dark bg → lighter text; light bg → darker.)*
- **A2. Guide write-up:** `CORE_WEB_VITALS_OPTIMIZATION_GUIDE.md` new "Appendix H" — correct the old Appendix B Bengali-font misdiagnosis; record font/animation/a11y/guard + measured before/after.
- **A3.** lint + build + verify → commit → push → PR to `main`.
- **A4.** Post-deploy: mobile PageSpeed on the Cloudflare preview; confirm `noto-sans-bengali-600-v1.woff2` is NOT requested on an English route; record LCP/FCP in the guide.

## Workstream B — Verified content corrections (`content/accuracy-fixes`)

Each: grep exact string → edit EN (`blogContent.ts`) + BN (`bengaliContent.ts`) +
any `App.tsx` meta → one commit per fix → validate.

- **B1. Vaccine validity (ENHANCE).** At ACWY/Meningococcal mentions add: conjugate
  = 5-yr / polysaccharide = 3-yr validity; ≥10 days before travel; COVID now
  **selective** (65+, pregnant, immunocompromised); flu recommended. Src: Saudi MOH.
- **B2. Thailand fees and financial evidence (SOURCE-SAFE — completed 2026-10-14).**
  Keep three costs distinct: the current government Tourist e-Visa fee (check the
  live portal/Embassy schedule), separate bank/payment-provider charges, and
  optional agency service fees (provider-set; request an itemized quote). Do not
  publish a current government amount or agency range until its primary/current
  source is confirmed. Preserve the dated evidence carefully: the Dhaka Embassy
  TR checklist last updated **November 30, 2022** lists six-month statements and
  BDT 60,000 per person / BDT 120,000 per family; the general Tourist Visa page
  differs, so users must confirm the current Dhaka prompt in the portal. Retire
  stale sticker/VFS instructions; do not imply approval or timing is guaranteed.
  Sources: [official fee schedule](https://dhaka.thaiembassy.org/en/content/consular-service-fee-updated-september-2025?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e),
  [payment notice](https://dhaka.thaiembassy.org/en/content/facilitation-ofe-visa-payment?page=5d83296215e39c2540006a05&menu=5d83296215e39c2540006a0e),
  [dated TR checklist](https://dhaka.thaiembassy.org/en/publicservice/tourist-visa-tr?page=5d83296315e39c2540006a6c&menu=5d83296315e39c2540006a6d).
- **B3. EC261 carrier carve-out (ENHANCE).** Add: *"covers flights departing an
  EU/UK airport or on an EU/UK carrier; generally does NOT cover Biman, Saudia,
  Emirates, Qatar on Dhaka↔Jeddah."*
- **B4. Endorsement fee (ENHANCE, verify).** Add *"money changers max BDT 300;
  banks ~BDT 100–200"* (Bangladesh Bank FEPD-2 Circular 01/2026 — verify). Grep to locate.
- **B5. SKIP (already correct):** `$12k→$18k`; Thailand VoA removal; `document.lang`;
  sitemap lastmod; cache headers; twitter:card.
- **B6. HOLD — Biman baggage.** Do NOT change any number to 20 kg. Only acceptable
  edit: make route/fare/concept dependency explicit where a bare "46 kg" appears,
  e.g. *"piece concept on Americas/UK/EU routes; Middle-East uses weight concept
  (~30 kg) — confirm on biman-airlines.com / your e-ticket."* Real outbound figure
  must be owner-confirmed before any number change.

## Workstream C — a11y / schema (`a11y/schema-fixes`)

- **C1. Skip-to-content link.** First focusable element `<a href="#main-content">`;
  ensure the primary content landmark has `id="main-content"`; `.skip-link` +
  `:focus` CSS in `src/index.css` (off-screen until focused, brand-gold ring).
- **C2. twitter:site / twitter:creator** = `@uraltravelbd` in `index.html` + the
  dynamic `src/hooks/useSeoMeta.ts`. (`twitter:card` already exists — don't dupe.)
- **C3. isLiveBlog review.** `TopicalAuthorityBlueprint.tsx` has **36** occurrences.
  If posts aren't continuously updated, set `false` or pair with real `dateModified`.
- **C4. BN FAQ schema — INVESTIGATE first.** `App.tsx` gates `isBn ? null :
  getFaqSchemaForPage(...)` (~11 sites). Enabling BN needs Bengali FAQ content in
  `src/utils/faqSchema.ts`; flipping the gate naively emits English FAQ on BN pages
  (worse than none). Only enable after BN FAQ strings exist.
- **C5. articleSection (optional).** Add to BlogPosting JSON-LD.

## Workstream D — deeper E-E-A-T / growth (owner-guided, later)

D1. "15+ years" author claim — owner confirms honest figure (YMYL; HOLD).
D2. `/glossary`; D3. `/sources` hub; D4. inline citations + `VERIFIED_SOURCES`;
D5. `/editorial-policy`; D6. image sitemap + `VideoObject` + pillar pages;
D7. **custom domain** (biggest ranking lever; `*.pages.dev` indexes slowly —
meanwhile submit sitemap in GSC + request indexing).

## Workstream E — brand-asset de-nesting ✅ DONE (2026-10-13)

Resolved in the cleanup pass. The double nesting is gone and the kit no longer
sits in `src/` (where it read as application code):

- `src/URAL-brand-assets/ural-brand-assets/*` → **`brand-kit/*`** (63 files).
- Reference updated in this file.
- The kit is a **live asset library**, not dead weight: the social/marketing
  workflow uses its PNG exports for avatars, covers and carousels. It was
  relocated, not deleted.
- Shipped favicons remain in `public/assets/brand/favicon/` and are unaffected. 7 of the
  kit's 8 favicon files are byte-identical to the shipped set (only `favicon.ico` differs);
  they are kept so the kit stays a complete, hand-off-ready bundle.
- A backup archive exists at `URAL-brand-kit-backup.zip` outside the repo.

## Workstream F — carried forward from the Impeccable design pass (owner-guided, later)

The 2026-10-13 typography/de-slopping work shipped in PR #27. These items were deliberately
**not** done and are the honest remainder. None are defects; all are polish with real reflow risk.

- **One-off type sizes** — `13.5px`, `14.5px`, `15px` (56 advisory hits). Genuine drift, but each
  lives inside a different component's layout. Normalise **as those components are touched**, not in
  a sweep that risks reflowing a dozen layouts at once.
- **9 colour advisories** — mostly partner-brand colours in the logo marquee (those are third-party
  marks and are *correct*), plus print `#555`/`#ccc`.
- **5 radius advisories** — `2px`/`15px` in the marquee, `12px` in `.dark-panel`.
- **Per-component focus audit** on the search widgets — needs real interaction testing.
- **The 2 remaining primary detector findings** are both known static-shell artifacts, not app bugs.

**Needs a real device — no browser exists in the build environment:**

1. The serif swap reads well and the metric overrides hold CLS near zero on a real network.
2. The new `QuickAnswer` surface reads as intended against both the white and soft-white sections.
3. The `@media (hover: none)` swipeable rail behaves on a touch device.

> The "blue-on-dark heading" contrast item previously listed here was **investigated and disproved**
> on 2026-10-13: every `text-brand-navy` occurrence was walked to its nearest ancestor background and
> all pair with gold or white. **No contrast bug exists.** Do not re-open it without a screenshot.

---

## Unshipped surfaces — built, never wired (decision needed, not urgent)

Code that exists, looks finished, and does **nothing**. Nothing is broken; the risk is that a
future agent mistakes these for live code, or that genuinely good work is lost.

### Global attractions hub — `src/components/GlobalAttractionsHub.tsx` (~49 KB, 871 lines)

- **Status:** unwired. Nothing imports it; it is tree-shaken out of the bundle entirely.
- **What it is:** an attractions surface for **nine** cities — Amsterdam, Florence, Lisbon, London,
  Milan, New York, Paris, Rome, Venice — backed by `src/data/tiqetsAttractionsData.ts`
  (**59 curated Tiqets entries**).
- **Why it is probably not junk:** the live `ExperiencesPage` covers only **London, New York and
  Paris**. This is a superset of that surface, which reads like a stalled next iteration.
- **Decision required (owner):** wire it up, or abandon it. Both files now carry a header saying so.
- **If abandoning:** deleting both files is provably safe — verified by rebuilding and confirming
  `dist/` is byte-identical (612 files).

> ⚠️ Do **not** delete the data file on tidiness grounds alone. The 59 curated entries are researched
> affiliate content, not scaffolding, and re-creating them would mean re-sourcing every product ID.

---

## Verification (per branch, before PR)

1. `npm run lint` clean.
2. `NODE_ENV=production node_modules/.bin/vite build && node_modules/.bin/tsx scripts/prerender.ts` succeeds.
3. `node_modules/.bin/tsx scripts/verify-build.ts` all-green (incl. the Noto-range guard; 69+ checks).
4. Content branches: EN/BN parity; prerendered HTML still contains edited passages.
5. CWV branch: mobile PageSpeed on preview; Noto font absent on EN routes.

## Execution order (credit-aware — durable first)

1. Persist this plan to `docs/MASTER-REMEDIATION-PLAN.md`, commit, push. ✅ (this file)
2. Sync: `git fetch`; integrate owner's latest `main`.
3. Workstream A (finish CWV).
4. Then B, C, E; D later.
5. Hand off: report branch/PR status + remaining work, pointing tools here.
