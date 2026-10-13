# Performance & font work — October 2026 (historical record)

> ## ⚠️ HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE
>
> This is an archive of work completed on **2026-10-04**, merged from six separate
> status documents that had drifted apart and begun contradicting both each other and
> the code.
>
> **Line numbers, file counts, byte sizes and "expected gains" below are as they were on
> that date and are now stale.** They are recorded only where they explain a decision.
> For current state see `DESIGN.md`, `PRODUCT.md`, `AGENTS.md` and the code itself.
>
> **No status banner in this file is a claim about today.** Work listed as "complete" here
> means it was complete on 4 October; some of it has since been revised or reversed, and
> those reversals are noted inline.

---

## Why this file exists

Six documents were written across a single day, each summarising the same body of work from
a slightly different angle, each ending with a "COMPLETED ✅ / Production Ready" banner.
Within days they contained claims that were **verifiably false** — wrong line numbers for
code that had moved, a font file count that changed, and one decision that was later
reversed in the opposite direction.

An agent reading them would have acted on a 9-day-old snapshot while believing it was
current. That is the specific failure this consolidation fixes. The engineering reasoning
was worth keeping; the status theatre was not.

**Sources merged here:** `PHASE_1_COMPLETED.md`, `IMPLEMENTATION_SUMMARY.md`,
`FIXES_SUMMARY.md`, `CRITICAL_FIXES_APPLIED.md`,
`CRITICAL_OVERSIGHT_FIXES_2026-10-04.md`, `README_PERFORMANCE.md`.

---

## 1. The actual problem being solved

The site was loading Google Fonts from a third-party origin as a render-blocking resource
on the critical path. Self-hosting was chosen to remove that chain.

**The approach:** download and self-host Inter (400/600/700) and Noto Sans Bengali
(400/600) as WOFF2, inline the `@font-face` declarations into `<head>`, and preload only the
weights the first viewport needs.

**Still true today**, with three changes made later:

| Then | Now |
|---|---|
| 5 font files, ~263 KB | **6 files, ~310 KB** — Source Serif 4 was added on 2026-10-13 for the deferred editorial serif voice |
| Inter 400 + 600 preloaded | Inter 400/600 preloaded; **700 only on the homepage** (see `verify-build.ts`) |
| A preconnect to `emrld.ltd` was *added* here | **Removed.** Loading the affiliate script speculatively would contact a marketing processor before the visitor has consented. See the comment in `index.html`. |

### The `size-adjust` decision (still load-bearing)

Font-metric overrides (`size-adjust`, `ascent-override`, `descent-override`) were added to
the `@font-face` rules to keep fallback metrics close to the web font, so a font swap cannot
move the layout. `verify-build.ts` now guards the Bengali `unicode-range` split that keeps
the Taka sign ৳ (U+09F3) off every English route's critical path. **Do not undo either.**

---

## 2. Rejected recommendations — and why

**This is the most valuable section in the archive.** Each of these was proposed, evaluated
and deliberately declined. Re-proposing them is re-litigating a settled decision.

| Suggestion | Why it was declined |
|---|---|
| **Switch to Fontsource packages** | Self-hosted files already work. Fontsource adds an npm dependency and two build steps for identical output. |
| **Add the Critters plugin** (auto critical-CSS extraction) | Vite 6 + Tailwind v4 already generate CSS efficiently; Critters added ~40s to build time. Manual inlining covers what matters. |
| **Terser instead of esbuild** | esbuild is roughly 50× faster for equivalent output. |
| **Drop Safari < 15.4 entirely** | Feature detection was proposed instead; the decision was to keep the `es2020` target (Safari 14.1+). ~0.8% of users did not justify the detection overhead. |
| **Splitting the chunk configuration further** | `vite.config.ts` was already tuned and commented; more splitting was premature optimisation. |

> **Note on the last one:** this was declined on 4 October. Revisit only with evidence,
> since the current chunking exists specifically to keep `content-data` off the homepage's
> eager graph — a guarantee `verify-build.ts` now asserts.

---

## 3. Mistakes made and what they taught (still worth reading)

These are the genuinely durable lessons from that day. Every one is still applicable.

1. **Check CSS imports, not just HTML.** Fonts were self-hosted in `index.html` while
   `src/index.css` still `@import`ed Google Fonts — which silently undermined the entire
   optimisation. *Lesson: grep every layer (`<link>`, `@import`, component imports,
   CSS-in-JS), not just the obvious one.*
2. **Font-stack order matters.** A self-hosted family listed *second* never wins; the
   browser tries the first name and may trigger a network request for it before falling
   back. *Lesson: the self-hosted face goes first, and only there.*
3. **A generated file does nothing unless it is referenced.** `public/critical.css` was
   created and never inlined into `<head>` — so it had no effect at all while looking like
   a finished optimisation. *Lesson: verify the artefact is actually consumed.*
4. **`async` ≠ `deferred`.** The GTM snippet carried `async=true` but still executed during
   parse. Real deferral required wrapping it in an interaction listener. *Lesson: read what
   the attribute actually does, not what the name suggests.*
5. **Test in incognito with cache disabled and throttling on.** Cache hides exactly this
   class of bug. *Lesson: the tested condition must resemble the untested user's.*

> **These apply directly to the 2026-10-13 typography work**, which found the same shape of
> bug: `--font-serif` named two families whose files were never shipped, so 205 headings
> silently rendered in a fallback. A declared-but-unloaded font is the font equivalent of
> an unreferenced `critical.css`.

---

## 4. Guardrails established (superseded by newer documents, but historically true)

At that time, "do not change" meant the affiliate registry, `AGENTS.md`, the prerender
script, and the Travelpayouts identifiers (`wl_id=22462`, `marker=675992`, `trs=540277`).

**The same guardrails still hold**, but they now live in a better place:

- Affiliate and architecture rules → `AGENTS.md`
- Visual and typographic rules → `DESIGN.md`
- Product truth and hard constraints → `PRODUCT.md`

Do not treat this section as the authority; it records what was decided on the day.

---

## 5. Things listed as "to do" here that are now done

Recorded so nobody re-does them:

| Listed as pending on 2026-10-04 | Status |
|---|---|
| Add a 960w responsive image breakpoint | **Done** — `buildResponsiveSrcSet()` emits 640/960/1200 |
| Generate AVIF fallbacks | **Done** — `.avif` variants ship for every image |
| Add GTM Consent Mode | **Done** — default-denied, with `ConsentBanner.tsx` and a reopen path for GDPR Art. 7(3) |
| Update `srcset` in components for 960w | **Done** |
| Verify Bengali rendering | **Done** — `/bn/` routes prerender with their own preload and hreflang cluster |

**Not done, and still open:** a custom domain. `*.pages.dev` indexes slowly; a real domain
remains the single largest off-page lever. Tracked in `docs/MASTER-REMEDIATION-PLAN.md`.

---

## 6. What this archive deliberately does not contain

- **Performance scores and "expected gains."** The originals stated things like
  *"Mobile: 65 → 75-80"* as if measured. They were projections. Any figure here would be
  quoted as fact by the next reader, so none are carried forward. Measure with Lighthouse
  against a real deployment if you need a number.
- **Line numbers.** They rot within one commit.
- **Status banners.** Status belongs to git commits and pull requests, which are dated and
  immutable. A document's status rots silently — and then misleads.
