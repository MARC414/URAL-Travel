# eVisas — what each skill actually produced

> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.** These are the initial skill outputs. Asset measurements describe that conversion trial; later WebP output sizes differ. The homepage-only banner decision and assumed widget flow were superseded. See the [current integration and skill rationale](../../04-monetization/EVISAS.md).

**Lifecycle:** historical analysis and conversion trial
**Date:** 15 November 2026
**Purpose:** the owner asked to see the real outputs of `cro`, `image` and `ui-ux-pro-max` before deciding whether `impeccable` + `DESIGN.md` should keep governing the eVisas placements. This records what each produced, what it changed, and which skill owns which decision.

---

## 1. `cro` — output

**Method:** CTA hierarchy → above/below fold → friction → trust → test plan, per placement.

### Findings that change the spec

**1. The homepage body copy promises something unverified.**
The spec said *"see which online visas you can apply for, and what each one costs."* Prices are only known after a click, and the widget's filtering behaviour is unverified (§9 of the plan). A promise the UI cannot keep is the most common cause of a dead CTA. Rewrite to what is confirmed: which online visas are available for the reader's passport. Price stays out of the promise.

**2. The disclosure sits too far from the decision.**
"URAL may earn a commission" in 11px grey beneath a block is a legal fig leaf, not a trust signal. CRO placement: directly adjacent to the button, same visual weight as the supporting line, above the fold of the card. It costs nothing and it is the single highest-trust element in the block.

**3. The UAE page has real friction the spec ignored: double entry.**
The reader states passport + destination on URAL, then states it again on the eVisas landing page. Every re-entry is a drop-off point. Mitigation: the deep link already lands on `/destinations/uae-visa`, so only nationality is re-entered. Do not add a URAL-side form that duplicates what the destination page asks. Passport pre-fill is unverified and must not be claimed.

**4. One primary action per block is correct — but the secondary is not a competitor.**
CRO's rule is one primary CTA. The official-portal link looks like a second CTA. It is not: it is a friction reducer (it removes the "am I being sold to?" objection). Keep it, but render it as a link, never as a second filled button, and never above the primary.

**5. Primary metric is wrong in the current plan.**
Clicks are vanity for affiliate. Primary metric: **completed applications per placement**. Secondary: outbound click-through rate. Tertiary: engagement with the widget facade. The 90-day stop criteria in the plan already use completed applications — this confirms it and demotes clicks.

### Test plan (only tests with a real hypothesis)

| # | Test | Hypothesis | Metric |
|---|---|---|---|
| A | Homepage: facade-then-widget vs widget loaded inline | Facade wins on LCP and loses nothing on engagement | LCP + widget-open rate |
| B | Homepage button label: "Check my visa" vs "Check my passport" | "visa" implies a paid product; "passport" matches the mental model of a reader who does not yet know if they need one | widget-open rate |
| C | UAE page: CTA after the checklist (spec) vs after the step-by-step | Later placement converts better because intent is established | outbound CTR |
| D | Disclosure above the button vs below | Above converts equal or better and is more honest | outbound CTR |

Not worth testing: button colour (gold vs navy) — the site has one accent convention; changing it per page would break `DESIGN.md` for a rounding error.

---

## 2. `image` — output

**Method:** measure the supplied assets, convert, decide format/sizing/alt/LCP, and check the repo's own pipeline before inventing one.

### Measured, then converted (ffmpeg, this machine, 15 Nov 2026)

| Asset | Supplied PNG | WebP q82 | AVIF crf32 | Saving |
|---|---|---|---|---|
| `horizontal-640x120` | 100,849 B | 13,648 B | 7,417 B | **86% / 93%** |
| `skyscraper-160x600` | 154,429 B | 23,168 B | 12,609 B | 85% / 92% |
| `square-250x250` | 93,058 B | 14,896 B | 7,526 B | 84% / 92% |
| `vertical-120x240` | 44,528 B | 7,608 B | 4,544 B | 83% / 90% |

Outputs written to `C:\Users\HP\AppData\Local\Temp\opencode\evisas-opt\` for inspection; nothing in `public/` is changed.

### Four decisions this settled

**1. Do not route these through `ResponsiveImage`.**
`src/components/ResponsiveImage.tsx` is a photography wrapper: it normalises to a 1200w canonical form, builds `-640/-960/-1200` srcsets, and reads dimensions from the table in `src/utils/imageAssets.ts`. A fixed 640×120 advertising creative is not that. Adding it to the dimension table would imply variants that do not exist. Render a plain `<img>` with `width`/`height`/`loading="lazy"`/`decoding="async"` and serve WebP with a PNG fallback.

**2. The horizontal banner is illegible below 640 CSS px.**
At 340px viewport width the 640px artwork is scaled to 53%, so its smallest text lands around 4px. It must never render inside a container narrower than 640px — that rules out every phone and every sidebar. That is what `vertical-120x240` exists for, and why the plan already assigns it to mobile. This is now a hard rule, not a preference.

**3. It is not an LCP candidate, so lazy is correct and no preload is needed.**
Both homepage placements sit well below the fold and after the hero. `loading="lazy"` + `decoding="async"` is right. Do not add a `<link rel="preload">` — the repo's preload machinery is coupled to the AVIF LCP hero and adding a second consumer would double-fetch.

**4. Alt text must say it is an advert.**
The creative carries marketing copy ("We make borders feel like open doors"). Repeating ad copy in `alt` is noise for a screen reader and for search. Use `alt="eVisas — paid visa application service (advertisement)"` (Bengali equivalent where shown), and let the anchor text carry the instruction. Never `alt=""` on a link-wrapped image with no other label — that leaves the link unnamed.

### Honest limits

- These are fixed-size creatives; there is no responsive variant to produce, only re-encoding.
- Text baked into the image is not translatable, not crawlable and does not scale. That is a content decision above this skill's pay grade — which is why the banner is English-homepage-only.
- The walkthrough asks that the design not be altered. Re-encoding to WebP is not a redesign.

---

## 3. `ui-ux-pro-max` — output

**Method:** its local database, searched live (`scripts/search.py`), not recalled from memory.

### What it returned

**Palette — `--domain color`, "travel trustworthy blue navy":**

| Match | Primary | Accent | Verdict |
|---|---|---|---|
| Government/Public Service | `#0F172A` | `#0369A1` | Closest to URAL's `#0B1426` brand-navy |
| B2B Service | `#0F172A` | `#0369A1` | Same family |
| Travel/Tourism Agency | `#0EA5E9` | `#EA580C` | Sky blue + orange — wrong for this site |

Confirms the existing navy with a restrained accent and specifically warns against adopting a travel-industry sky-blue/orange palette. URAL keeps its own tokens.

**Landing pattern — "trust-authority-conversion":**

> Navy/Grey corporate. Trust blue. Accent for CTA only. … Security badges. Transparent pricing. Low-friction form.

This is the pattern the four blocks should follow, and "accent for CTA only" is a direct argument against giving eVisas its own green treatment.

**Landing pattern — "funnel-3-step-conversion":** rejected. It prescribes red/orange/green step colours and a multi-step wizard. Both contradict `DESIGN.md` (no decorative colour semantics) and CRO (one primary action, no wizard for a two-field question).

**UX guidance — three rules with severity that apply directly:**

| Rule | Severity | Applies to |
|---|---|---|
| Input labels: every input needs a visible label, never placeholder-only | **High** | The passport/destination selects in any eligibility UI |
| Third-party scripts: load async/defer, never synchronous | Medium | Confirms the click-to-load facade for the widget |
| Inline validation: validate on blur, not on submit | Medium | Only relevant if a URAL-side form ever exists |

**Style database:** searched for a restrained opposite-of-hype affiliate pattern — **no match**. Stated plainly rather than falling back to a default. The style library is a library of visual aesthetics (glassmorphism, brutalism, editorial), and none of them is the question being asked here.

---

## 4. Which skill governs which decision

| Decision | Owner | Why |
|---|---|---|
| Palette, radius, badge, type, container | **`impeccable` + `DESIGN.md`** | It is the repo's own system. A foreign palette fragments the site; `ui-ux-pro-max` only confirms the one already chosen |
| Where each block sits, CTA hierarchy, what the copy promises | **`cro`** | The only skill that asks whether the block earns its position, and the only one that caught the unsupportable price promise |
| Image format, dimensions, alt text, loading strategy | **`image`** | Measured, not asserted |
| Form fields, labels, validation, accessibility severities | **`ui-ux-pro-max`** | Severity-ranked rules from a local database |
| Disclosure wording, evergreen terms, no-rate-publishing rule | **`impeccable` + `DESIGN.md`** | Already settled policy; no other skill overrides it |

### The verdict

`impeccable` + `DESIGN.md` stays the **authority on how it looks**. None of the three replaces it, and `ui-ux-pro-max` — the one that could have — returned no style match and a palette that agrees with what is already there.

But the other three are not decoration:

- **`cro` overrode `impeccable` on one substantive point.** `impeccable` asks for bold, distinct, out-of-distribution work. For an affiliate disclosure block that instinct is actively wrong — restraint and honesty convert, and a distinctive treatment would look like an endorsement. That is a `cro` win, and the copy fix follows from it.
- **`image` produced a number that changes the build** — 100 KB to 13.6 KB, and the hard rule that the horizontal banner never renders under 640px.
- **`ui-ux-pro-max` supplied the severity-ranked form and script rules** and confirmed the palette. It cannot author this design, and says so by returning no match.

### Changes applied to the placement spec

1. Homepage body copy: drop "and what each one costs" — promise only what is verified.
2. Disclosure moves adjacent to the button, not to a footnote.
3. Banner rules: WebP + PNG fallback, plain `<img>`, `width`/`height`/`lazy`/`async`, no preload, no render under 640px, `alt` says advertisement.
4. Primary metric is completed applications; clicks are secondary.
5. Visible labels on any passport/destination select — no placeholder-only.
6. Rejected the three-colour funnel pattern; one accent, one primary action.

Nothing in the code is touched. These are edits to the spec, ready to implement on your word.
