# URAL × Impeccable — Audit & Safe Application Plan

**Status:** Analysis + Phase 0 and Phase 1 applied (see Part 7). Phase 2+ not started.
**Audited commit:** `0ded5c1` (`arena/ed7a9384-ural-travel`, branched from `main`)
**Audited:** 2026-10-13
**Subject:** [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable) v4.5.2

> **Corrections after applying Phase 0.** Two claims in the original analysis below were
> wrong and are corrected in place:
> 1. `side-tab` was reported as **6** findings; the true count is **8** (Part 3, row 1).
> 2. `App.tsx:4017` was described as a detector **false positive**. It was never flagged at
>    all — the detector correctly ignores a square box with no border-radius. The rule is
>    more precise than the analysis gave it credit for (Part 3, row 6).
>
> Adding `DESIGN.md` also switched the detector into **design-system mode**, which surfaced
> a new and genuinely important finding that was invisible without it: **≈390 usages of
> 9–11px type** (Part 7).

---

## Part 0 — Method & evidence

I did not guess at any of this. Everything below comes from running tools against your repo.

| What I ran | Result |
|---|---|
| `git log`, `git status`, branch check | Clean tree, 1 commit in history on this ref |
| `npx tsc --noEmit` | **Passes — 0 type errors** |
| `npm run build` | **Passes in 10s.** 90 EN + 83 BN = **173 prerendered routes** |
| `impeccable detect src/ index.html` | **14 findings** (12 warning, 2 advisory) |
| `impeccable detect . --json` | Structured output, 8 distinct rule families |
| Read `impeccable` `SKILL.md`, `craft-floor.md`, `critique.md`, `audit.md`, `quieter.md`, `typeset.md`, `polish.md`, `routing.md` | Full methodology |
| Read the Rust detector source (`crates/detect`, `crates/core/checks`) | Rule semantics, incl. the false-positive guards |

I could **not** run the browser/URL scan (`impeccable detect http://localhost:3000/`) — no Chrome/Chromium binary is installable in this sandbox (`googlechromelabs.github.io` is blocked). So the detector ran in **static mode**: it reads source text, not computed styles. Two consequences:

- Some truths only a rendered page reveals (real contrast, real line lengths, real CLS) are **not** verified. I flag those as "needs browser verification" rather than asserting them.
- Two of the 14 findings are almost certainly artifacts of static analysis. I separate those out honestly in Part 3.

The dev server is currently running on **port 3000** so you can look at the live site yourself.

---

## Part 1 — Senior-dev audit of the URAL repo

### 1.1 What is genuinely strong (do not let anyone touch this)

This repo is in the top few percent of projects I'd expect to see. Specifically:

**Engineering**
- **`tsc` is clean and `build` is reproducible.** 173 static routes with hreflang clusters, per-route OG images, RSS, and a sitemap that `scripts/verify-build.ts` asserts against. The CI workflow comment even explains *why* it exists (a real `lastmod` bug that only inspecting the artifact caught). That is a team that has learned from production incidents.
- **Deliberate chunking.** `manualChunks` matches on resolved paths, not package names, with a comment explaining the `react-dom` vs `react-dom/client` trap it avoids. Route bodies are lazy; `content-data` and `blog-content` are named chunks so the prerender can emit `modulepreload` for exactly the routes that need them.
- **Honest comments.** Nearly every non-obvious decision has a comment explaining the *counterfactual* — why the preconnect to `emrld.ltd` was removed, why `strokeDashoffset` and SVG `r` animations were replaced with composited properties, why `will-change` is absent. This is documentation of *reasoning*, not of *syntax*.

**Accessibility — already better than most commercial sites**
- Skip link, 69 `aria-label`s, 91 focus-ring/focus-visible usages.
- A contrast-aware token was added specifically for the brand: `--color-brand-gold-ink: #8A5A00`, with the comment recording that `#F6B73C` is 1.79:1 on white and `#D4941A` only 2.61:1, so **neither is usable as text**. Someone actually did the math. That is rare.
- `prefers-reduced-motion` is handled in two places, and the SVG animations were rewritten to composited properties for both performance *and* motion-safety reasons.

**Performance**
- Inline critical CSS with `size-adjust` / `ascent-override` font metrics to kill FOUT shift — a genuinely advanced technique.
- LCP preload with `imagesrcset`, self-hosted subsetted fonts, `unicode-range`-scoped Bengali faces, consent-gated deferred GTM with no speculative marketing connection.

**Verdict on engineering: A.** I have no structural concerns. Nothing in this plan requires you to restructure the app, the routes, the data layer, or the build.

### 1.2 The real problems I found

#### 🔴 P1 — You declare an editorial serif voice and ship a system fallback instead

This is the most important finding in this entire document, and **the detector never caught it** — I found it by cross-referencing tokens against assets.

- `src/index.css:89` declares `--font-serif: "Lora", "Playfair Display", Georgia, Cambria, ...`
- `font-serif` is applied to headings in **205 places** across `src/`
- `public/fonts/` contains **only** `inter-{400,600,700}` and `noto-sans-bengali-{400,600}`. There is **no Lora, no Playfair, no `@font-face` for either**, and no Google Fonts link.

**So every one of those 205 headings renders in Georgia, Cambria, or Times depending on the visitor's OS.**

Why this matters more than it sounds:

1. It's an **uncontrolled, invisible design surface.** Your site looks materially different on macOS vs Windows vs Android, and you have never seen the version most of your users get. Bangladeshi visitors are overwhelmingly on Android — they are getting a different typeface than the one you're designing against on your machine.
2. It's a **brand-voice hole.** The serif is clearly meant to be the "editorial Travel Intelligence" voice vs Inter for UI. Right now that voice is accidental.
3. It's the single biggest reason the site reads as *assembled* rather than *authored* — and it's the exact failure mode Impeccable's craft floor names: *"A system display face as the display voice of an own-world page... the closest installed font is a failure, not a fallback."*

**This is not an Impeccable problem. It's a pre-existing bug that Impeccable gives you the vocabulary to name.**

#### 🟠 P2 — Seven copies of the same "quick answer" block, five files, drifting apart

The detector flagged these as `side-tab`, but the real issue is duplication:

| File | Line | Classes |
|---|---|---|
| `routes/FlightsRouteView.tsx` | 77 | `rounded-r-xl border-l-4 border-[#F6B73C] bg-slate-50 p-5` |
| `routes/HotelsRouteView.tsx` | 43 | `rounded-r-xl border-l-4 border-[#F6B73C] bg-slate-50 p-5` |
| `routes/VisaRouteView.tsx` | 57 | `rounded-r-xl border-l-4 border-[#F6B73C] bg-slate-50 p-5` |
| `routes/CostsRouteView.tsx` | 107 | `bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl` |
| `routes/DestinationsRouteView.tsx` | 439 | `bg-brand-navy/5 border-l-4 border-[#F6B73C] p-6 rounded-r-2xl space-y-3` |
| `routes/DestinationsRouteView.tsx` | 1113 | `bg-brand-navy/5 border-l-4 border-[#F6B73C] p-6 rounded-r-2xl space-y-3` |
| `routes/BlogPostRouteView.tsx` | 837 | `bg-slate-50 border-l-4 border-brand-navy p-5 rounded-r-xl space-y-1.5` |

Seven near-identical blocks with **three different paddings, two border colors, two radii, and two background tints**, and the class order has already drifted. These are your AEO "quick answer" blocks — they serve a real purpose (LLM-extractable answer summaries, and they're genuinely useful to readers). The problem isn't that they exist; it's that they're a copy-paste pattern that no one owns, wearing the single most recognizable AI-generated-UI costume in the process.

**One component would fix the duplication, the drift, and the tell simultaneously.**

#### 🟠 P3 — A "monospace as costume" layer

`font-mono` is used heavily on non-code content — e.g. `App.tsx:2562`, `2629`, `2689`, `2876`, `3789`, `3915`, `4033`, `4732`, `5087`, mostly as `text-[10px] font-mono font-bold uppercase tracking-widest` pills and labels. Impeccable's craft floor refuses exactly this: *"Monospace as a costume for 'technical' rather than for code, data, or measurement."*

Your repo declares `--font-mono: "JetBrains Mono", SFMono-Regular, Consolas, monospace` — and **JetBrains Mono is also not loaded** (same P1 bug, smaller blast radius). So these labels are rendering in Consolas/Courier.

There *is* legitimate mono here — airport codes (`DAC`, `DXB`, `KUL`), dates, prices, flight numbers. Those are measurement/data roles and should keep it. The decorative 10px uppercase pills should not.

#### 🟡 P4 — Hero has five competing entrance animations

`index.css` defines `hero-badge` (0.1s), `hero-h1` (0.25s), `hero-subtitle` (0.4s), `hero-widget` (0.55s), `hero-links` (0.7s) — five separate `heroFadeUp` animations of the identical shape, staggered.

Craft floor: *"one authored moment, not scattered effects and not one identical entrance on every section."* This is the *same* animation five times with different delays — the visual signature of a generated page. Also: a 0.7s-delayed hero CTA is a real (if small) conversion cost, since the primary action is invisible for ~700ms.

#### 🟡 P5 — Zero-offset colored halos standing in for shadow

e.g. `App.tsx:3536` — `shadow-[0_10px_24px_-4px_rgba(246,183,60,0.5)]`. Craft floor: *"shadows carry an offset and a soft blur. A zero-offset colored halo is decoration."* Same family of issue as the glow on hover states.

#### 🟡 P6 — Flat heading hierarchy below H1

The detector reports `h2 16px, h3 16px, body 16px (largest adjacent step 1.00:1; target 1.25:1)` on `index.html`. **See Part 3** — I believe this is mostly a static-shell artifact, *but* the underlying thing it points at is real: there's no documented rule for how H2/H3 relate to each other, and `App.tsx` mixes `text-2xl`/`text-3xl`/`text-3.5xl` for what are conceptually the same role. `sm:text-3.5xl` isn't even a real Tailwind class — that's a silent no-op.

#### 🟡 P7 — No design-system documentation

There is no `PRODUCT.md`, no `DESIGN.md`, no `.impeccable/`. Your tokens live in `src/index.css` (`@theme`), your rules live in `AGENTS.md` (which covers *affiliate* rules thoroughly), and your visual intent lives in your head.

This is not a style nit — it is the **root cause** of both the P1 bug and the detector's false positives. A tool cannot know that gold `#F6B73C` is deliberate brand equity rather than slop, because nothing in the repo says so. And you cannot catch that Lora was declared but never loaded, because nothing reconciles intent against assets.

### 1.3 Not problems (I checked, so you don't have to re-litigate them)

- **Only 1 gradient-text usage in the whole codebase.** Good — that's the #1 AI tell and you've essentially avoided it.
- **No emoji-as-icons.** Icons come from `lucide-react` in one consistent stroke weight. Correct per craft floor.
- **`will-change` is used once, correctly, and released** on reduced-motion. Textbook.
- **43 hardcoded hex values total** across all TSX/TS/CSS. Given a 30k-line codebase that's *low* drift, not high — and 28 of them are the two brand colors (`#F6B73C` ×18, `#FFFFFF` ×10). This is a candidate for `impeccable extract`, not an emergency.
- `App.tsx` at **5,132 lines** is large, but it's a route-composition surface with deliberate structure, not a tangle. I'd flag it as a maintenance risk, **not** as something to refactor as part of this work. Refactoring it would violate your "don't break structure" constraint for no design gain.

---

## Part 2 — What Impeccable actually is (the correct mental model)

**First, the important correction:** Impeccable does **not** have "a design" that can be applied to your site. There is no Impeccable theme, palette, or layout to copy. Asking "can I apply Impeccable's design to URAL" is like asking whether you can apply a style guide's *proofreading*. What you apply is a **methodology plus a deterministic linter**.

It has three parts:

**1. A skill (process).** `SKILL.md` + ~50 reference playbooks that tell an AI agent how to do design work properly — with a strong governing principle that is *exactly* what you asked for:

> **"Refinement preserves; redesign replaces. Refinement keeps the incumbent identity, behavior, copy, and everything outside scope."**

That is your "don't break the design system" constraint, stated as the tool's own core rule. Impeccable is *built* for the safe path you want; `bolder`/`overdrive` are the disruptive commands and you simply won't invoke them.

**2. A quality floor (`craft-floor.md`).** The "Refuse" list — the category defaults that mark a page as generated:

- Same-size icon+heading+text cards as the page structure; nested cards
- The hero-metric template (big number, small label, stats)
- **A kicker/eyebrow above a heading — this one is an absolute ban, not a default**
- Section numbers (01/02/03) unless the sequence carries information
- **A colored `border-left` above 1px on cards, list items, or callouts** ← your `border-l-4` blocks
- Gradient text; glass/blur as decoration; hard offset shadows
- Zero-offset colored halos ← your gold glows
- Sparklines and progress rings standing in for content
- **Monospace as a costume for "technical"** ← your 10px mono pills
- Emoji or Unicode glyphs standing in for an icon system
- **A system display face as the display voice of an own-world page** ← your phantom Lora
- Light/dark picked by category rather than by use scene

Plus a "Verify" list — contrast, depth, spacing, type measure 65–75ch, tracking floor −0.04em, motion, states, and **browser surfaces**:

> *"Text selection, the caret, custom scrollbars, focus rings, underline offset, and the numerals in tabular data all ship with browser defaults that belong to no design system. Theme them from the palette. This is the cheapest signal that a page was built rather than assembled, and the one models skip most reliably."*

**3. A detector (evidence).** 59 deterministic rules, no LLM, no API key. I ran it on your code — Part 3.

### The 24 commands, mapped to *your* situation

| Command | What it does | Fit for URAL |
|---|---|---|
| `init` | Writes `PRODUCT.md` (durable product truth) | **Do first.** Fixes P7 |
| `document` | Generates `DESIGN.md` from existing code | **Do first.** Turns your `@theme` into a contract |
| `audit` | Technical checks: a11y, perf, theming, responsive | Excellent fit |
| `critique` | Design review + heuristic scoring + cognitive load | Excellent fit |
| `typeset` | Fix font roles, hierarchy, loading | **Highest value** (fixes P1, P3, P6) |
| `quiet`/`quieter` | Reduce intensity without losing personality | Good fit (P4, P5) |
| `distill` | Strip to essence | For the CTA-dense sections |
| `layout` | Spacing, rhythm, hierarchy | Selective |
| `polish` | Final pass against the design system | **Do last** |
| `harden` | Errors, i18n, overflow, edge cases | Good (bilingual edge cases) |
| `clarify` | UX copy, labels, error messages | Good |
| `extract` | Pull tokens/components into the system | For the 7 duplicated blocks |
| `animate` | Add purposeful motion | After P4 |
| `adapt` | Device/size adaptation | Good |
| `optimize` | UI performance | You already lead here |
| `live` / `generate` | In-browser variant iteration | Needs a browser |
| `bolder`, `overdrive`, `delight`, `colorize` | Amplify / add drama | ⛔ **Skip** — violates your constraints |
| `craft`, `shape`, `new-work` | Build new surfaces from scratch | Not now |

---

## Part 3 — What the detector actually found on URAL

**14 findings: 12 warning, 2 advisory.** I verified each one rather than passing them through.

### Real, worth fixing

| # | Rule | Count | Where |
|---|---|---|---|
| 1 | `side-tab` | **8** | `border-l-4` blocks — see P2 for the real fix |
| 2 | `overused-font` | 2 | `PartnerLogoMarquee.tsx:461`, `index.html` — "Inter" |
| 3 | `bounce-easing` *(advisory)* | 2 | `TravelpayoutsWidget.jsx:2085, 2120` — `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| 4 | `hero-eyebrow-chip` | 1 | `index.html`: tracked-caps chip *"Travel planning for Bangladeshi travelers"* above the H1 |

### Likely false positives — and why I'm telling you rather than hiding them

| # | Rule | Why it's suspect | What's actually true |
|---|---|---|---|
| 5 | `flat-type-hierarchy` | Detector read the **static pre-hydration shell**, where headings carry no size rules — so it measured 16/16/16. Your real type scale in `@theme` is rich (`--text-xs` → `--text-hero`). | The scale exists but **isn't applied consistently** (P6): mixed `text-2xl/3xl/3.5xl` for one role, and `sm:text-3.5xl` is not a real class. Worth a `typeset` pass. Needs browser verification to confirm rendered sizes. |
| 6 | ~~`side-tab` at `App.tsx:4017`~~ **— corrected: not flagged** | The original analysis called this a false positive. It is not a finding at all: `border-l-4 border-brand-navy pl-4` has **no border-radius**, and the detector's `is_rounded_away_from_side()` guard — verified in `crates/core/src/checks/rules.rs` — requires a rounded card before a side stripe counts as the AI tell. The detector checked all 11 `border-l-4` usages and correctly flagged only the 8 on rounded cards. | The three square `border-l-4` usages (`App.tsx:4017`, `DestinationsRouteView.tsx:215`, `:811`) are **deliberate pull quotes** and should stay. This codebase is more principled here than the first draft of this audit assumed. |

### The `overused-font` finding is the one you should *not* obey

Impeccable says Inter is overused and you should pick a face with personality. **I disagree for your body/UI text**, and here's the reasoning:

1. Your Inter is **metric-matched** to `Noto Sans Bengali` via `size-adjust`/`ascent-override` and hand-tuned `unicode-range`. Your bilingual architecture is *built on* that pairing. Swapping the sans is not a font change, it's a **bilingual layout regression** — every Bengali/English mixed line reflows differently.
2. Inter is a **UI/reading** face, and for a Persian Gulf/Android/South-Asian audience on variable networks it is the correct, most-legible, most-cached choice.
3. Craft floor says it out loud: *"A pinned brief or the committed visual world overrides anything here."* Your brand is the pinned brief. Inter **is** the committed world.

**But the finding is still pointing at something true:** URAL has only *one* voice, and it's a neutral tool voice. The fix isn't to replace Inter — it's to **finally give the serif voice you already declared in `--font-serif` a real face** (P1). That resolves the detector's actual complaint (no brand personality in type) using your own existing intent, with zero disruption to the sans.

This is exactly the "refinement preserves" path.

---

## Part 4 — Conflict map: where Impeccable fights URAL

| Impeccable says | URAL reality | Resolution |
|---|---|---|
| Don't use Inter | Bilingual metric-matched architecture + CWV budget | **Keep Inter.** Give the declared serif a real face so type has a second, brand-carrying voice. Then `ignore-value overused-font Inter` **with a written reason** in `.impeccable/config.json`. |
| Never a colored `border-left` >1px on cards | 7 AEO answer blocks — genuinely good for LLM extraction & readers | **Keep the blocks, change the form.** Extract one `<QuickAnswer>` component; replace the stripe with a header rule + tinted surface. Function preserved, tell removed. |
| Ban the hero eyebrow/kicker | The chip's copy is *redundant* — the H1 and subtitle already say it | **Delete the chip.** You lose nothing. |
| Don't use monospace as costume | Real mono uses: airport codes, prices, dates, flight numbers | Keep mono for **data/measurement**; convert the 10px uppercase decorative pills to Inter with tracking. |
| One authored motion moment | 5 identical staggered hero fades | **One** entrance for the hero, or two-tier (content, then widget). Removes ~0.7s of invisible CTA. |
| Shadows need offset + blur | Zero-offset gold halos | Offset + soft blur, same gold, softer alpha. |
| Pick light/dark from use scene | Navy hero + ivory light body | **Already correct.** Leave it. |
| Raise expressive boldness (`bolder`, `overdrive`, `delight`) | You don't want a redesign | ⛔ **Do not invoke.** |

---

## Part 5 — The safe application plan

Ordered by **risk ascending**. Every phase is independently revertable. Phases 0–2 cannot break layout.

### Phase 0 — Instrument, don't touch (zero visual risk)

```bash
cd /path/to/URAL-Travel
npx impeccable install          # installs the skill + detector hook into the harness
```
Then, inside the AI tool:
```
/impeccable init        → writes PRODUCT.md (audience, purpose, constraints, voice)
/impeccable document    → writes DESIGN.md from your existing tokens
```
Then commit a `.impeccable/config.json` recording your **intentional** decisions with reasons, so the detector stops reporting your brand as slop:

```jsonc
{
  "detector": {
    "ignoreValues": {
      "overused-font": ["Inter"],
      "bounce-easing": []
    }
  }
}
```
(Use `impeccable hooks ignore-value overused-font Inter --shared --reason "Bilingual metric-matched brand sans; see DESIGN.md"` to write this correctly rather than hand-editing.)

**Why this is step one:** it converts "the linter says my site is AI slop" into "the linter checks my site against *my own documented design system*." It is also what makes every later phase safe — `polish` and `audit` read `DESIGN.md`, and with it present they preserve your system instead of eroding it.

**Deliverable:** `PRODUCT.md`, `DESIGN.md`, `.impeccable/config.json`. **Zero files in `src/` change.**

### Phase 1 — Fix true defects (high value, low risk)

1. **Resolve the phantom serif (P1).** Two options:
   - **(a) Self-host a real display serif**, subsetted to Latin + a Bengali-compatible fallback chain. Best design outcome; adds one woff2 (target < 25 KB for the subset, one weight, `font-display: swap`, preload only on routes that use it). This is the change that most removes the "assembled" feeling.
   - **(b) Fail honestly:** change `--font-serif` to a deliberate, well-chosen *system* stack and accept it — but then those 205 headings must be re-examined, because you're no longer pretending.
   - Recommendation: **(a)**, and load it **only on editorial routes** (blog/destinations), not the homepage, so the LCP budget is untouched.
2. **Fix the mono declaration (P3).** Same decision, smaller: load JetBrains Mono or stop using it decoratively. I'd convert the decorative pills to Inter and load *no* mono face at all — that's +0 KB.
3. **Fix `bounce-easing` (2 lines).** `TravelpayoutsWidget.jsx:2085, 2120` → `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint).
4. **Fix the type-scale inconsistencies (P6).** Define `--text-h2` / `--text-h3` roles and apply one per level. Replace `sm:text-3.5xl` (invalid) with a real class. Also fix the `body 16 / h2 16` *rendered* relationship if the browser pass confirms it.

**Verify:** `npx tsc --noEmit` + `npm run build` + re-run detector.

### Phase 2 — De-slop the recurring patterns (medium risk, contained)

5. **Extract `<QuickAnswer>` (P2).** One component in `src/components/`. Replace 7 blocks in 5 route files. New visual form: tinted surface + a small uppercase *label* ("Quick answer") rendered in Inter with tracking, or a 1px top rule — **not** a 4px left stripe. Preserves AEO extractability and the `id` anchors (`#aeo-quick-answer-card` etc.) that your SEO work depends on.
   > ⚠️ Keep every existing `id=` attribute — the `GuideJumpNav` and your AEO copy reference them.
6. **Delete the hero eyebrow chip (P3/#4).** Copy is redundant with the subtitle.
7. **Collapse the hero's five animations into one authored moment (P4).**
8. **Fix the gold halos → offset + blur (P5).**

**Verify:** screenshot before/after at 390 / 768 / 1280; confirm no CLS change.

### Phase 3 — Craft floor / browser surfaces (systemic, safe, high perceived value)

9. **Theme the browser surfaces** — text selection (`::selection` in brand gold on navy), caret color, scrollbar, focus-ring consistency, `text-underline-offset` on body links, and `font-variant-numeric: tabular-nums` on **all** prices, dates, and durations (your flight tables currently jitter as digits change width).
10. **Audit states:** hover / disabled / loading / error / empty on the search widgets — particularly the empty state of the flight and hotel search, which is the highest-intent moment on the site.
11. **`clarify` pass on CTA copy** — 59 `<a>` + 29 `<button>` on the homepage alone. Reduce competing primary actions; make labels name their action.

### Phase 4 — Per-surface mode tuning

Impeccable's modes applied to URAL:
- **Home** = *Persuade* — hierarchy and one primary action.
- **Blog / Destinations** = *Read* — 65–75ch measure, line height tuned inversely to measure, more paragraph rhythm.
- **Widgets / Tools / Visa checklists** = *Operate* — scanability first, brand only in precise details.

### Phase 5 — Verify

```
/impeccable audit       (or: /impeccable audit src/routes/)
/impeccable critique    (heuristic scoring + cognitive load)
npx impeccable detect . (must be clean or explicable)
npm run lint && npm run build && npm run verify:build
```
Re-baseline Core Web Vitals after Phases 1 and 3.

---

## Part 6 — What I recommend you decide now

**Answer these four and I can start:**

1. **The serif (P1).** Self-host a real display serif for editorial pages, or converge everything onto Inter? *This is the highest-impact decision in the document.*
2. **Scope.** Phases 0–1 only (instrument + true defects) / through Phase 2 / through Phase 3?
3. **The AEO blocks.** Restyle in place, or extract the shared `<QuickAnswer>` component (my recommendation — it fixes duplication and the tell together)?
4. **Impeccable install.** Install the skill into this repo now (Phase 0), or keep me applying the methodology by hand without adding repo files?

### My honest bottom line

You asked whether Impeccable can make URAL "more supreme" without breaking what you've built. Yes — with two caveats.

**It will help most with:** naming what's wrong. Your repo has world-class *engineering* and much less *authored design language*. Impeccable's 59 rules and craft floor give you precise vocabulary — and proved it by surfacing 6 real `border-l-4` blocks, the mono-as-costume layer, and the hero-animation stack that I would otherwise have described only vaguely.

**It will hurt if applied literally.** It would tell you to delete Inter, redesign your palette, and rename your hero. Every one of those would damage a site with a real brand and a bilingual architecture that Inter is load-bearing for. The detector is *evidence*, not a mandate — and its own documentation says the committed visual world overrides it.

**The single most important thing I found was not a detector finding at all:** 205 headings are rendering in a serif you never loaded. Fixing that one thing will change how the site feels more than everything else in this document combined — and it costs one subsetted font file.

---

## Part 7 — What was applied (Phase 0 + Phase 1)

### Phase 0 — Instrumentation

| Artefact | What it is |
|---|---|
| `.claude/skills/impeccable/` | The Impeccable skill (57 files: `SKILL.md`, ~50 reference playbooks, scripts). |
| `.claude/agents/impeccable-*.md` | The 4 sub-agent definitions (documenter, finish-reviewer, asset-producer, manual-edit-applier). |
| `PRODUCT.md` | Durable product truth: audience, positioning, hard constraints, evidence vs. must-not-fabricate, 5 principles, WCAG AA stance. |
| `DESIGN.md` | The visual contract: token frontmatter + the 8 canonical sections + Named Rules + Do's/Don'ts. |
| `.impeccable/config.json` | Detector exceptions, each with a written reason. |

The official `npx impeccable install` **could not run** in this environment (its bundle host,
`impeccable.style`, is unreachable here — see Errors in the session log). The skill was
therefore placed by hand from a verified clone of the public repo, with every internal
`.agent/skills/impeccable` path rewritten to `.claude/skills/impeccable` (16 files, 75 refs,
0 leftovers). Contents are byte-identical to the upstream v4.5.2 bundle. `npx impeccable`
itself works normally and supplies the detector.

### Phase 1 — The four fixes

| # | Change | File(s) |
|---|---|---|
| 1a | **Source Serif 4 is now actually shipped.** One 50 KiB variable file (`wght` 200–900) covers every weight, so `font-black` headings and `font-bold` card titles share a single download. Declared in `index.html`'s critical CSS and `fonts.css`; `--font-serif` now names it first, with Lora/Playfair (never shipped) removed. | `public/fonts/source-serif-4-latin-v1.woff2` (new), `index.html`, `public/fonts/fonts.css`, `src/index.css` |
| 1b | **Bounce easing removed** — `cubic-bezier(0.34,1.56,0.64,1)` → `cubic-bezier(0.22,1,0.36,1)` (ease-out-quint) on the swap-rotation icons. | `src/components/TravelpayoutsWidget.jsx` (2085, 2120) |
| 1c | **Invalid class fixed** — `sm:text-3.5xl` (never existed in the built CSS) → `sm:text-3xl`. This heading was rendering 24px while all six sibling section headings rendered 30px. | `src/App.tsx:3918` |
| 1d | **Mono made honest** — `--font-mono` no longer names JetBrains Mono (never shipped). Replaced with a deliberate system mono stack: 0 bytes, metrically interchangeable fallbacks, same lookup-table look. | `src/index.css` |

**Deliberate choices in 1a**, recorded in the code comments:
- **Not preloaded.** Every `.ural-section-title` is below the hero (the hero H1 is Inter), so
  a preload would only contend with the LCP image. `font-display: swap` means no text is
  hidden.
- **Metric-matched to Georgia** (`size-adjust: 101%` from Source Serif 4's x-height of
  0.475em vs Georgia's 0.4814em). Headings carry unitless `leading-*`, so a swap cannot move
  the line box — this only keeps glyph widths close enough that a heading cannot rewrap
  mid-swap.
- **`unicode-range` is Inter's latin set and excludes ৳ U+09F3** for exactly the reason the
  Taka Rule exists: that glyph appears in prices on English pages, and including it would
  pull this face onto every English route to render a glyph it does not contain.
- **Bengali headings still fall back to Noto Sans Bengali.** Source Serif 4 has no Bengali
  glyphs. This is correct and expected, not a regression.

### Verification

```
npx tsc --noEmit      → clean
npm run build         → 173 routes (90 EN + 83 BN), 159 + 48 modulepreloads
npm run verify:build  → All 80 checks passed (eager JS 184.4 KB gzip / 200 KB budget)
impeccable detect     → primary 12 → 11, and the remaining items are real work
```

Confirmed in `dist/`: `source-serif-4-latin-v1.woff2` (50,936 B) is shipped, the `@font-face`
reaches the prerendered HTML with the correct overrides, and **no route preloads it**.

### The finding that only appeared after writing DESIGN.md

With `DESIGN.md` present, the detector switched to **design-system mode** and began checking
code against the documented system. Its first pass produced **505 advisory notes** — and
almost all of them were pointing at one real thing:

> **≈390 usages of 9–11px type** (228×11px, 163×10px, 34×9px), plus a long tail of one-off
> sizes (13.5px, 14.5px, 15px).

This is a genuine finding that no amount of reading the design tokens would have surfaced,
because the tokens never described the micro range at all. Handling:

- The **11px and 10px steps are now documented** as `label-micro` / `label-micro-sm` in
  DESIGN.md, because they are systematic and clearly deliberate.
- The **9px step was deliberately NOT documented**, so the detector keeps flagging those 34
  usages. 9px uppercase tracked text is below the floor this system should hold, for an
  audience reading on mid-range Android screens.
- A **"Known open item"** note was added to DESIGN.md recording the intended Phase 3
  direction: raise the floor to 10px minimum, reduce three micro steps to two, and let
  spacing and weight carry the hierarchy instead of shrinking type.

Result: advisory noise fell **505 → 111**. What remains (97 font-size, 9 color, 5 radius) is
a genuine to-do list rather than noise — mostly partner-brand colours in the logo marquee,
noscript fallbacks, and the one-off sizes above.

### Not done, and intentionally still open

- Phase 2 (the 8 `border-l-4` blocks → shared `<QuickAnswer>`, hero eyebrow chip, the five
  staggered hero animations, the gold halos).
- Phase 3 (browser surfaces: `::selection`, caret, scrollbars, `tabular-nums` on prices;
  the micro-type floor).
- The 8 side-tab findings and 1 hero-eyebrow-chip finding remain in the primary count on
  purpose — they are the Phase 2 work list.

---

## Part 8 — Phase 2 + Phase 3 applied

### Three more corrections to this document

Applying the work surfaced three more errors in the original audit. Each is corrected in
place above, and the reasoning matters more than the number:

| # | Original claim | Reality |
|---|---|---|
| 1 | P4: "Hero has **five** competing entrance animations" | **Three** were live (badge 0.1s / h1 0.25s / subtitle 0.4s). `.hero-widget` and `.hero-links` were **dead CSS** — no element referenced them. |
| 2 | P4: "a 0.7s-delayed hero CTA is a real conversion cost" | The CTA bar had **no animation at all** and was always visible. There was no delayed CTA. The 0.7s delay belonged to the unused `.hero-links`. |
| 3 | P5: "zero-offset colored halos" | **Both shadow claims were wrong.** `shadow-[0_10px_24px_-4px_...]` has a 10px Y offset and a 24px blur — offset *and* blur, exactly what craft floor asks for. The `0_0_0_2px` values in `TravelpayoutsWidget.jsx` are **focus rings** combined with a real offset shadow, which is the correct technique. No zero-offset halo exists in this repo. |

Also corrected: the flat black-ink claim was about `index.html`'s **static 404/noscript
fallback page**, not the app.

**What this says about tooling.** Every one of these came from reading the code rather than
trusting a prior summary — mine included. The detector was right, the prose around it was
sloppy. That is the honest failure mode of this kind of audit, and it is why the Phase 2
work was verified against built output rather than against the plan.

### What changed

**Phase 2 — the recurring patterns**

| Change | Detail |
|---|---|
| **`<QuickAnswer>` component** | New `src/components/QuickAnswer.tsx`. Replaced **5** drifted copies (flights, hotels, visa, costs, blog). Every `id` preserved verbatim, so GuideJumpNav and the 36 guide-map link assertions still pass. |
| **Side stripe removed** | The 4px `border-l-4` is gone from all 8 flagged locations. Replaced by a tinted surface (`bg-bg-subtle`, the ivory token), a `ring-1 ring-brand-navy/[0.07]` edge, and a label set in Inter instead of monospace. |
| **2 Destinations insight panels** | These were *not* quick-answer blocks — they are sections with a heading and a grid, so they kept their structure and only lost the stripe (`ring-1` in its place). |
| **Blog callouts de-slopped** | The 4 semantic colours stayed (colour carries the type), the stripe became a full 1px border, and the **emoji that stood in for icons (💡 🔑 ⚠️ 🔎) became Lucide icons** at 14px — free, since `vendor-icons` is already eager. |
| **Hero eyebrow chip deleted** | Removed from `App.tsx` **and from `index.html`'s pre-hydration hero**, which had its own copy. Leaving that one would have flashed the chip and removed it on hydration. |
| **Hero collapsed to one moment** | One `.hero-enter` on the container replaces three staggered fades: 0.7s, `cubic-bezier(0.16, 1, 0.3, 1)`, 20px travel. |

**Phase 3 — craft floor and browser surfaces**

| Change | Detail |
|---|---|
| **Micro-type floor** | **37 usages of 9px raised to 10px** across 8 files. 9px is no longer a step in `DESIGN.md` — it is now a defect. |
| **`::selection`** | Brand gold background with navy text — one rule that holds contrast on both the light sections and the navy hero. |
| **Link underlines** | `text-underline-offset: 3px` so descenders stop colliding with the rule. |
| **Scrollbar** | `scrollbar-color` only — deliberately **not** `scrollbar-width: thin`, because shrinking the drag target is a usability cost on a touch-first audience. |
| **Pressed states** | `.btn-gold:active` and `.card-hover:active`, plus `active:scale-[0.985]` on the hero CTA. Hover and focus existed everywhere; the press itself was unacknowledged. |
| **Latent bug fixed** | The hero's old animation rules set `opacity: 0` as the resting state, so a blocked stylesheet left the H1 **permanently invisible**. Now `animation-fill-mode: both` from a visible default. |

### Verification

```
npx tsc --noEmit      → clean
npm run build         → 173 routes
npm run verify:build  → All 80 checks passed
react-dom/server      → QuickAnswer + all 4 Lucide icons render valid markup (৳ passes through)
```

**Detector progress — the headline result:**

| | At start | After Phase 1 | After Phase 2/3 |
|---|---|---|---|
| **Primary findings** | **12** | 11 | **2** |
| `side-tab` | 8 | 8 | **0** |
| `overused-font` | 2 | 1 | **0** |
| `bounce-easing` | 2 | 0 | **0** |
| `hero-eyebrow-chip` | 1 | 1 | **0** |
| Advisory | 2 | 111 | **70** |

The **2 remaining primary findings are both the known static-shell artifacts** already
documented in Part 3: `flat-type-hierarchy` (the detector measures the pre-hydration shell,
where headings carry no size rules) and `design-system-font` (a `font-family: Sans-Serif`
in the static 404 fallback, not the app).

### What is deliberately still open

- **One-off type sizes** (13.5px, 14.5px, 15px — 56 advisory hits). Real drift, but each
  lives inside a different component's layout. They should be normalised **as those
  components are touched**, not in a sweep that risks reflowing a dozen layouts at once.
- **9 colour advisories** — mostly partner-brand colours in the logo marquee (correct: those
  are third-party marks) and print `#555`/`#ccc`.
- **5 radius advisories** — `2px`/`15px` in the marquee, `12px` in `.dark-panel`.
- **Per-component focus audit** on the search widgets, which need real interaction testing.

### Footer fixes (reported by the site owner)

**1. Misfiled directory link.** `Dhaka Airport (DAC) Checklist & All Guides Directory →`
sat directly beneath the five social icons in the brand column, where it read as a sixth
social link. Moved to the foot of the **Flight Routes** column: the target page is an
airside departure resource (DAC pre-departure checklist, baggage rules, embassy helplines,
then the 83-page directory), so it belongs with the Dhaka routes. It is styled like the
other column-terminal gold link so the pattern — the last gold entry in a column is its
"see everything" link — stays consistent with the Visa Checklists and Support columns.

**2. Affiliate disclosure.** The owner asked for the disclosure to sit under the social
icons. **It already existed** — the full statement was already in the footer's bottom
compliance bar, in both English and Bengali, word for word as quoted. Duplicating a
60-word legal paragraph 200px below itself would have read as a mistake, and at
`lg:col-span-3` the brand column is the narrowest on the grid: that paragraph would have
wrapped to ~10 lines and made column 1 the tallest cell by a wide margin, stretching every
sibling column with it (`stretch` is the grid default).

What was done instead:

- A **short single-sentence disclosure** now sits under the social icons, separated by a
  hairline rule — a scannable trust note in the brand column.
- The **full statement stays** in the compliance bar, where the partner names and
  editorial-independence wording satisfy the transparency requirement.

The short version also drops "URAL is independent — not a ticket-selling agency", because
the brand column already makes that claim twice (the tagline *"Travel Intelligence System ·
Beyond a Typical Agency"* and the description *"Independent flight fare intelligence…"*).
A third repetition was pure length with no added meaning. Net cost is three lines.

Both fixes verified: `tsc` clean, build clean, **all 80 checks pass**, and the footer
contains exactly one `/sitemap` link, one short disclosure, and one full disclosure.

### Footer & typography follow-up (reported by the site owner)

**1. Footer column headers.** The four column labels (`Flight Routes`, `Visa Checklists`,
`Travel Services`, `Direct Support Desk`) were set in `font-mono`. They are labels, not
data or headings, so monospace was costume — and after Phase 1 the stack resolved to a
system mono. Now Inter at the documented label role (`text-xs`, `tracking-[0.12em]`),
matching every other section label on the site.

**2. Are there multiple heading fonts? Yes — and that was a real defect.**

A full audit of all **212** `h1`–`h4` elements found:

| Face | Count | Cause |
|---|---|---|
| Source Serif 4 | 166 | correct |
| Inter (inherited) | 39 | **omission — the heading simply never set a face** |
| Monospace | 5 | costume |
| Inter (explicit) | 2 | deliberate |

The root cause was structural: `.ural-page-title`, `.ural-section-title` and
`.ural-card-title` set font-weight, line-height and letter-spacing but **not
`font-family`**. Every one of their 161 usages therefore depended on the caller remembering
to add `font-serif`. 16 did not — the entire Privacy Policy page among them, which
rendered its headings in Inter while every other page used the serif. It looked like a
different website.

Fixed:

- `.ural-page-title` and `.ural-section-title` now declare `font-family: var(--font-serif)`
  themselves. Verified first that **no** usage pairs either class with `font-sans`, so the
  declaration cannot override a deliberate choice.
- `.ural-card-title` is shared by editorial cards and tool cards, so it deliberately leaves
  the face to the caller; `font-serif` was added to the 4 editorial headings that lacked it.
- The 5 monospace headings were all small uppercase label-headings, so they took the
  **Inter label role**, not the serif: uppercase with 0.1em tracking is muddy in a serif
  below ~14px.

Result: **166 → 189 serif, 39 → 21 Inter, 5 → 0 monospace.** The 21 remaining Inter
headings are all tool/widget/admin surface headings, which is correct — see *Visitor mode*.

Two exceptions are documented in DESIGN.md rather than "fixed":
`App.tsx:3887` (a deliberate `font-sans` card title) and **the homepage hero H1**, which
stays Inter because it is the LCP element rendered twice (pre-hydration + React); moving it
to the serif means either +50 KB on the critical path or a visible swap on the largest text.

**3. The partner carousel Pause button.** Removed, as requested — along with its `isPaused`
state, the `Play`/`Pause` imports, the `partner-marquee--paused` class and ~20 lines of
now-dead toggle CSS.

**But the stated reason needed correcting.** *"It already stops when hovering"* is only
true for a mouse. Touch screens have no hover state at all, so for the majority of this
site's readers — mid-range Android — the strip scrolled with **no way to stop it**, which
is precisely what WCAG 2.2.2 (Pause, Stop, Hide) exists to prevent. Deleting the button
alone would have traded a visible control for no control.

So the removal ships with a replacement that needs no button: under `@media (hover: none)`
the strip stops animating and becomes a **swipeable, snapping rail**, exactly mirroring the
treatment the component already applied under `prefers-reduced-motion`. Nothing is lost —
every partner is still reachable, the reader sets the pace, and desktop keeps the elegant
auto-scroll with hover and focus-within pause.

### Honest note on what remains unverified

There is still **no browser in this environment**, so the following need one look on a real
device before this work is called done:

1. **The serif swap** — that Source Serif 4 reads well in your headings, and the metric
   overrides hold CLS at zero on a real network.
2. **The blue-on-dark heading** behind the Cost & Budgeting panel — `text-brand-navy` on a
   near-black background. This looks like a genuine contrast bug from reading the code, but
   only a rendered page can confirm it.
3. **The new QuickAnswer surface** — that the ivory tint reads as intended against both the
   white and soft-white section backgrounds.

---

*Prepared against commit `0ded5c1`. Phases 0–3 applied and verified. No layout, route, SEO,
affiliate-logic or content changes were made — every edit was surface-level styling, one new
presentational component, and documentation.*
