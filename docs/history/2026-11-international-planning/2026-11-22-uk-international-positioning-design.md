# HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE

**Withdrawn planning draft, 22 November 2026. Do not execute the instructions or quote its diagnoses as facts.**
This draft overstated ccTLD neutrality, language-tag ranking effects, small-sample CTR evidence and
revenue timing, and proposed invalid/ambiguous locale relationships. Its old relative links describe
the original file location and are not current navigation. The corrected proposal starts at
`docs/superpowers/plans/2026-11-22-international-expansion-master.md`.

# URAL — International Front Door, Bangladesh Edition, UK Doors

**Lifecycle:** design, awaiting owner approval · **Date:** 22 November 2026 · **Not authorised for execution.**

The owner selected **Option B** on 22 November 2026: two doors, one URL added, no existing URL changed.
This document records the design. It supersedes the direction statements in `PRODUCT.md` and
`00-URAL-STRATEGY-INDEX.md` **only where they conflict on the front door**; it does not repeal the
6 November 2026 decision that Bangladesh is the home market, and it does not authorise any execution.

## 1. Intent and the why

URAL has a correct strategy that has never been executed. On 6 November 2026 the owner approved
"international travel intelligence, Bangladesh as home market and priority, currency follows the
reader's origin, tools named by function, no surface addresses a single passport as its only reader."
`MASTER-PLAN-2026-11-06.md` records nine work packages and states plainly that **none of them was applied**.

Meanwhile the diagnostic evidence says the binding constraint is not market choice:

| Evidence (GSC, 22–31 Oct 2026) | Value | What it means |
|---|---|---|
| Clicks | 2 in 10 days | Not a market problem |
| Impressions beyond position 50 | 47% | New domain with no authority |
| Page 1–2 pages with 0 clicks | 42% (522 impressions) | Title/CTR problem, fixable in hours |
| Impressions from Bangladesh | 656 (53%) | The `.co.uk` is **not** blocking Bangladesh |
| Impressions from UK | 110, with zero UK-targeted content | Latent UK demand, unserved |

The design goal is therefore not to change market. It is to make the front door international,
give the existing Bangladesh corpus a labelled home, and open three narrow UK doors that a
low-authority domain can actually win.

## 2. The `.co.uk` conflict, resolved

A ccTLD is automatically and permanently associated with its country; this cannot be overridden in
Search Console. That is real. But the empirical record shows the domain is **helping in the UK and
neutral in Bangladesh**: 53% of impressions already come from Bangladesh on a `.co.uk`.

Language and local entities (Bengali script, DAC, bKash, endorsement, NOC) are stronger country
signals than a TLD. Therefore:

- The domain is **not** the reason to act in either direction.
- No domain change, in any scenario. `.co.uk` is already correct if the UK becomes primary, and
  empirically harmless if Bangladesh remains primary.
- The conflict is resolved by **declaration**, not by moving: English becomes `en` with
  `x-default`; Bengali stays `bn-BD`; a new `/bangladesh` carries `en-BD`.

## 3. The decisive finding

English is currently declared `en-BD` in four places: `<html lang>`, `hreflang`, every schema
`inLanguage`, and `og:locale`. Changing the English declaration to `en` + `x-default` is the single
highest-leverage "make this international" change available, it is testable, and it changes no URL.

**Targeting and formatting are separate concerns and must not be conflated.** `hreflang`,
`inLanguage`, `og:locale` and `<html lang>` are *targeting*. `Intl.NumberFormat`/`DateTimeFormat`
locales are *presentation*. Targeting becomes `en`; number formatting may stay `en-BD` or move to
`en-GB` for GBP surfaces, decided per surface, never as a side effect of the targeting change.

## 4. Approaches considered

| Approach | Trade-off | Decision |
|---|---|---|
| Rebrand the site UK-first: strip "from Bangladesh", rewrite the 10 destination guides, move `dhaka-*` flight URLs into a BD hub, default everything to LHR/GBP | Trades live position-4–10 pages for pages that cannot rank; changes URLs that already carry impressions; resets hreflang pairs | **Rejected — actively destroys value** |
| One adaptive front door, no new URL | Ships in a day, but the homepage is then optimised for nobody and BD readers depend on detection working | Rejected |
| **Two doors: `/` international, new `/bangladesh` for the BD English edition, `/bn/` unchanged** | One new hub page; slight risk of `/` and `/bangladesh` competing on a few queries | **Chosen by owner** |
| Domain change to `.com` | Costs accumulated indexing, gains nothing the ccTLD does not already provide | Rejected |

## 5. Goals

1. A reader landing on `/` reads an international English travel site, not a Bangladesh site.
2. A reader landing on `/bangladesh` reads an unmistakably Bangladeshi product: BDT, DAC, endorsement, NOC.
3. No existing URL changes, no new redirects, no page deletions, no domain change.
4. First revenue from pages that already rank, inside four weeks.
5. Three UK doors opened as **new** URLs, never as rewrites of ranking pages.
6. Every change is covered by an existing or added `verify:build` assertion.

## 6. Non-goals and anti-goals

**Non-goals.** No rewrite of the 10 existing destination guides. No removal of "from Bangladesh" from
titles that currently rank. No relocation of `dhaka-*` flight routes. No site-wide LHR/GBP default.
No domain change. No new language. No CMS migration. No homepage visual redesign beyond hero copy,
search defaults and the destination grid. No new dependency.

**Anti-goals — these mean the work failed even if it ships:**

- A ranking page loses position because its title was "de-Bangladeshified".
- A URL that had impressions returns a redirect.
- `/` becomes a page optimised for neither audience.
- A UK page is published claiming eVisas coverage that has not been verified for that passport.
- A money figure appears without a date and source (Number rule).
- The Bengali edition is degraded, hidden, or made unreachable from `/`.

## 7. Constraints carried from the repository

- **Number rule.** No fixed FX constants in `src/`. Currency detection uses the dated rates endpoint with attribution.
- **Consent.** Scripts/iframes stay gated through `src/utils/consent.ts`; no direct `localStorage`/`document.cookie`.
- **Affiliate integrity.** All outbound links via the registry; `rel="noopener noreferrer sponsored"`; promo expiry gated.
- **Build contract.** `npm run lint`, `npm run build`, `npm run verify:build` must exit 0; no eager-JS or font-budget increase.
- **Both locales first-class.** A feature that only works in English is unfinished.
- **No fabricated claims.** No invented schedules, prices, or provider coverage.

## 8. The structure

```text
/                      en, x-default      International English front door (UK-facing in defaults and voice)
/bangladesh            en-BD              Bangladesh edition, English (BDT, DAC, endorsement, NOC)
/bn/                   bn-BD              Bengali edition (unchanged)
/…  (all existing)     inherited          Unchanged URLs, reachable from all three doors
```

hreflang relationship: `/` ↔ `/bangladesh` ↔ `/bn/` as an `en` / `en-BD` / `bn-BD` cluster with
`x-default` on `/`. Every existing deep page keeps its current pair; only the homepage cluster gains
a third member.

## 9. Sequencing decision

Three lanes, two of them parallel, because they touch different files:

- **Lane A — Revenue.** Edits to pages that already rank. Independent of Lane B. Starts immediately.
- **Lane B — Foundation.** Locale declaration, `/bangladesh`, homepage, navigation entry. Depends on
  the already-approved navigation plan (`2026-11-19-approved-navigation.md`) shipping first, because
  that plan creates the `NavigationRecord` model the BD entry plugs into.
- **Lane C — UK doors.** New URLs only. Starts after Lane B, because its internal links need a settled
  front door. Specified at phase level here; becomes its own plan once B ships.

The lanes do not conflict because Lane A is **bespoke editing of existing pages** and Lane B/C are
**new surfaces plus declarations**. With one owner, bespoke work scales with judgement and templated
work scales with agent time — so Lane A stays small and Lane C is built from templates, not essays.

## 10. Success measures

| Lane | Measured | When | Pass condition |
|---|---|---|---|
| A | Impressions and clicks on the 5 touched pages | 30 days after deploy | Clicks > 0 on at least 3 of 5; no position loss > 2 |
| A | Tracked enquiry events | 14 days | At least one enquiry event received in GA4 (requires owner access) |
| B | `hreflang`/`inLanguage`/`og:locale` in `dist/` | At build | English emits `en` + `x-default`; Bengali emits `bn-BD` |
| B | URL inventory | At build | Same URL count plus exactly one (`/bangladesh`) and its `/bn/` twin if authored |
| B | UK impression share | 60–90 days | UK share rises from 9% without Bangladesh share falling |
| C | New UK URLs indexed | 60 days | At least half indexed and receiving impressions |

## 11. What is left to the builder

Exact component extraction, the `/bangladesh` body composition, hero copy wording, currency-detection
implementation detail, and the choice of which four visa pages Lane A touches first (driven by the
next GSC export). Not to be guessed: whether the navigation plan has shipped, current URL inventory
before any build, provider coverage for any passport, and owner approval to deploy.

## 12. Open decisions for the owner

1. Does Lane A start before Lane B, or concurrently? (Recommendation: A starts first — it is smaller and produces the first money.)
2. Is `/bangladesh` English-only, or does it get a Bengali twin at `/bn/bangladesh`? (Recommendation: English-only initially; `/bn/` is already the Bengali door.)
3. Does the homepage destination grid keep UK/London in the first row? (Recommendation: yes — it is the only existing UK asset.)
