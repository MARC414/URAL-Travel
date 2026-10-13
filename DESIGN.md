---
name: URAL Travel Intelligence
description: Bilingual editorial travel-intelligence platform for Bangladeshi travellers — navy/emerald/ivory/gold, Inter + Source Serif 4.
colors:
  navy: "#0B1426"
  navy-mid: "#1E293B"
  navy-soft: "#334155"
  navy-ramp-1: "#0F1F3D"
  navy-ramp-2: "#152844"
  navy-ramp-3: "#1A3055"
  emerald: "#0F4A3F"
  ivory: "#F5F1E8"
  ivory-subtle: "#FBF9F4"
  gold: "#F6B73C"
  gold-dark: "#D4941A"
  gold-ink: "#8A5A00"
  gold-light: "#FDF0CC"
  surface-white: "#FFFFFF"
  surface-soft: "#F1F5F9"
  text-secondary: "#475569"
  text-muted: "#64748B"
  border-faint: "#F1F5F9"
  border-subtle: "#E2E8F0"
  border-default: "#CBD5E1"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, Cambria, Times New Roman, serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  page-title:
    fontFamily: "Source Serif 4, Georgia, Cambria, Times New Roman, serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  hero:
    fontFamily: "Inter, Noto Sans Bengali, sans-serif"
    fontSize: "clamp(2.3rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter, Noto Sans Bengali, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "Inter, Noto Sans Bengali, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
  label-micro:
    fontFamily: "Inter, Noto Sans Bengali, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  label-micro-sm:
    fontFamily: "Inter, Noto Sans Bengali, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
  data:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "20px"
  xl2: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "80px"
  section-sm: "48px"
  container-max: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "{rounded.xl}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.xl}"
    padding: "14px 24px"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "20px"
  panel:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.xl}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.gold-light}"
    textColor: "{colors.emerald}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  quick-answer:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "20px"
---

# Design System: URAL Travel Intelligence

## Overview

URAL is a **Read-first, Persuade-second** product. Readers arrive with a concrete
question ("what does a Thailand tourist visa cost me, and how long does it take?") and
the interface earns their trust by answering it plainly, then offering the next action.

The visual world is **editorial travel journalism on a navy ground**: a deep navy that
reads as credible rather than corporate, ivory/soft-neutral reading surfaces that keep
long-form text comfortable, and gold used as a *highlighter* — small, warm, decisive —
never as a large fill. Emerald is the quieter brand voice; it carries trust marks,
verified states and section identity.

Two typefaces carry two jobs, and this split is the point of the system:

- **Inter** is the product's voice — UI, body copy, navigation, every control.
- **Source Serif 4** is the publication's voice — section and page headings only.

Nothing else is a third voice. The rule that produced this document: **a family may not be
named in `--font-*` unless its file ships in `public/fonts/`.** Lora and Playfair Display
were previously named and never shipped, which silently rendered 205 headings in
Georgia/Cambria/Times — or an unpredictable Android serif. That class of bug is invisible
in code review and only appears on real devices.

## Colors

### Primary
- **Navy** `#0B1426` — the grounded base. Hero ground, footer, dark panels, primary text.
- **Navy ramp** `#0F1F3D → #152844 → #1A3055` — the hero diagonal gradient's intermediate
  stops (`135deg` from `navy`). These are documented brand values, not drift: the hero
  ground is a ramp, and the pre-hydration critical CSS re-expresses it as
  `rgba(15,30,56,.75)` / `rgba(21,38,68,.85)` overlays over the hero photograph.
- **Gold** `#F6B73C` — the editorial highlight. Primary CTA fill, active states, icons and
  rules on navy. On light surfaces gold is **fill, border, icon or rule only — never text**.

### Secondary
- **Emerald** `#0F4A3F` — brand trust voice. Section eyebrows, verified/checked marks,
  quiet authority where gold would be too loud.

### Neutral
- **Ivory** `#F5F1E8` — the warm light surface, used sparingly (alternate sections).
- **Soft white / surface-soft** `#FBF9F4` / `#F1F5F9` — default alternating section fills.
- **Text secondary / muted** `#475569` / `#64748B` — both chosen against measured contrast,
  not by eye. Muted is 4.76:1 on white.

### Named Rules
- **The Gold Ink Rule.** `#F6B73C` is 1.79:1 on white and `#D4941A` only 2.61:1 — neither
  is legible as text. Any gold-toned *text* on a light surface must use **gold-ink
  `#8A5A00`** (5.93:1 on white, 5.26:1 on ivory). This token exists for this reason only.
- **The Taka Rule.** ৳ (U+09F3) renders on English pages and is deliberately excluded from
  every web-font `unicode-range` — it falls back to the system font. Adding it back pulls
  57 KiB of Bengali onto English routes. Guarded by `scripts/verify-build.ts`.
- **Never gray on colour.** Secondary text on navy is a tinted white (`white/75`–`white/80`),
  never a neutral gray.

## Typography

### Hierarchy

| Role | Face | Size | Weight | Tracking | Used for |
|---|---|---|---|---|---|
| Display | Source Serif 4 | 1.875rem (`text-3xl`) | 900 | −0.02em | Section headings |
| Page title | Source Serif 4 | 2.25rem (`text-4xl`) | 800 | −0.02em | Route H1s |
| Hero | Inter | `clamp(2.3rem, 6vw, 4.5rem)` | 900 | −0.025em | Homepage H1 |
| Body | Inter | 1rem | 400 | 0 | Prose |
| Label | Inter | 0.75rem (12px) | 600 | 0.12em | Section eyebrows, field labels |
| Label micro | Inter | 0.6875rem (11px) | 700 | 0.1em | Metadata, pill text, table hints |
| Label micro-sm | Inter | 0.625rem (10px) | 700 | 0.1em | Chip text, dense table metadata |
| Data | system mono | 0.75rem | 700 | 0.06em | Airport codes, prices, dates, counts |

> **Micro type — the floor is 10px.** There are exactly two micro steps and nothing in the
> system sits below `label-micro-sm`:
>
> | Step | Size | Approx. usages |
> |---|---|---|
> | `label-micro` | 11px | ~189 |
> | `label-micro-sm` | 10px | ~185 |
>
> **A 9px step used to exist (37 usages, 14 of them on the destinations guide) and was
> raised to 10px.** 9px uppercase tracked text is not reliably readable for this audience,
> who read on mid-range Android screens; it was below the floor this system holds.
>
> **9px is therefore a defect, not a step.** Sizes still off this ramp (13.5px, 14.5px,
> 15px and similar one-offs) are genuine drift and should be normalised as they are touched.
> Prefer letting spacing and weight carry hierarchy over shrinking type.

Heading roles are **not** font-size-only: `text-2xl sm:text-3xl` is the standard section
heading step. A single heading at a different size in the same run is a defect, not a
variation — the invalid class `sm:text-3.5xl` once shrank one homepage section by 20%
against its siblings while type-checking cleanly.

### Named Rules
- **Two voices, two jobs.** Serif on headings; Inter on everything else. Do not set body
  copy in the serif, and do not set headings in Inter to "fix" a layout.
- **Headings are the serif — with two named exceptions.** 189 of 212 headings use Source
  Serif 4. The exceptions are deliberate and enumerable:
  1. **Tool, widget and admin surfaces** use Inter (21 headings in `InteractiveTools`,
     the Travelpayouts widgets, `WhatsAppSupport`, `AeoInspector`). A calculator's internal
     headings belong to the interface, not the publication. See *Visitor mode*: Operate.
  2. **The homepage hero H1** is Inter 900. It is the LCP element, and it is rendered twice
     — once in `index.html`'s pre-hydration hero and once in React — so switching it to the
     serif means either preloading Source Serif 4 onto the critical path (+50 KB competing
     with the hero image) or accepting a visible font swap on the largest text on the page.
     Neither is worth it for one heading.

  **Uppercase tracked label-headings stay in Inter.** Uppercase plus 0.1em tracking is
  muddy in a serif below ~14px, so a small uppercase element marked up as a heading is a
  *label* wearing a heading tag; it takes the Inter label role, not the display face.
- **The Declared-Is-Shipped Rule.** No font family may appear in a `--font-*` token unless
  the file is in `public/fonts/` and declared in `index.html`'s critical CSS.
- **A heading class carries its own face.** `.ural-page-title` and `.ural-section-title` set
  `font-family` themselves. Before that they set only weight, leading and tracking, so all
  16 of their unstyled usages silently rendered in Inter — which is how the Privacy Policy
  page came to look like a different site. Never reintroduce a title class that leaves the
  face to the caller. Respect the
  `unicode-range` comments in `public/fonts/fonts.css`; each records a measured reason.
- **Bengali falls back correctly.** Bengali glyphs in a `font-serif` heading resolve to
  Noto Sans Bengali (Source Serif 4 contains no Bengali). This is expected and correct.
- **Mono is for data, not decoration.** Airport codes, prices, dates and tabular figures
  earn monospace. Small uppercase *labels* belong to Inter's Label role.

## Layout

- Container max `1200px`; mobile side padding `24px`.
- Section rhythm: `80px` vertical on desktop, `48px` on smaller sections, `40px` between
  major route sections (`28px` on small screens).
- Backgrounds alternate to separate sections; the navy hero and footer bracket the page.
- Prose measure is constrained to roughly 65–75ch in article bodies. Long-form guides
  breathe; dense search/tool surfaces stay spatially predictable.
- Homepage hero is left-aligned from `sm:` up, centred below it.

## Elevation & Depth

- Cards lift on hover (`translateY(-3px)`) with a soft offset shadow
  `0 12px 32px rgba(11,20,38,0.08)`.
- **Shadows carry an offset and a soft blur.** A zero-offset coloured halo is decoration,
  not depth — the gold CTA glow was replaced with a downward-offset, blurred shadow in
  brand gold at low alpha.
- Dark panels use a `1px` white-alpha border (`rgba(255,255,255,0.08)`) instead of a shadow.

### Named Rules (motion)
- **The One Moment Rule.** The hero plays **one** authored entrance (`.hero-enter`:
  0.7s, `cubic-bezier(0.16, 1, 0.3, 1)`, 20px of travel). It previously ran the same
  fade-up on three elements with three different delays, which reads as an effect applied
  to the page rather than a composition arriving. Do not re-stagger a hero.
- **Never bounce or elastic.** Decelerating ease-out only. A spring or overshoot curve is
  the one motion pattern this system refuses outright.
- **The No-Crawl-Without-Control Rule.** A continuously scrolling strip must have a pause
  affordance for whoever is watching it. `PartnerLogoMarquee` pauses on `:hover` and
  `:focus-within`, which covers a mouse and a keyboard — but neither exists on a touch
  screen, where the majority of this site's readers are. There is deliberately **no Pause
  button**; instead, on `@media (hover: none)` the strip stops animating and becomes a
  swipeable, snapping rail, so the reader sets the pace. Reduced-motion gets the same
  treatment. **If you ever re-enable the animation on touch, you must restore a control.**
- **Animate from a visible default.** Reach for `animation-fill-mode: both` rather than
  setting `opacity: 0` in the base rule. A base `opacity: 0` leaves the heading permanently
  invisible if the animation never runs.

## Shapes

Radius scale: `6 / 10 / 16 / 20 / 24 / 9999px`. Cards use `lg` (16px); large panels and the
hero search widget use `xl`–`2xl`; pills and chips use `full`. Icon tiles avoid the
`24px`-square-plus-rounded-corners default. **Corner radius is a deliberate signal:
a square box is a pull quote or a table marker; a rounded box with a thick side stripe is
not used anywhere in this system.**

## Components

### Buttons
- **Primary:** gold fill, navy text, `rounded-xl`, `font-black`, `14px 24px`. Hover deepens
  to `gold-dark` with a slightly stronger offset shadow.
- **Secondary:** white/transparent fill with a visible border, navy or white text; on navy,
  `white/10` fill with a `white/30` border.
- **Minimum height 48px** on the primary hero action.

### Chips / Badges
- `rounded-full`, `12px`–`14px` horizontal padding, `text-xs` weight 600, tracking `0.12em`
  when uppercase. Badge fills are `gold-light` on light surfaces and `gold/15` on navy.
- Badges are **labels, not sentences** — keep them under six words.

### Cards / Containers
- **Corner Style:** `rounded-lg` (16px) standard, `rounded-xl` panels.
- **Background:** white on soft-white sections; `bg-brand-navy/5` for inset callouts.
- **Shadow Strategy:** see Elevation. Flat at rest, soft offset lift on hover.
- **Border:** `border-subtle` `#E2E8F0` where a boundary is needed. **Never a thick
  coloured side stripe** — see Do's and Don'ts.
- **Internal Padding:** `20px` card, `24px` panel, scaled down on mobile.

### QuickAnswer (AEO answer block)
- **Purpose:** the direct, extractable answer to the page's core question. It appears
  **before** any affiliate CTA — see PRODUCT.md, Product Principles #1.
- **Markup:** `src/components/QuickAnswer.tsx`. Props: `id` (preserve verbatim — GuideJumpNav
  and the guide-map checks depend on these anchors), `label`, `children`, `bodyClassName`.
- **Style:** `rounded-xl`, `bg-bg-subtle` (the warm ivory surface), `p-5`, and a
  `ring-1 ring-brand-navy/[0.07]` edge. Label is Inter at `label-micro`, uppercase,
  `tracking-[0.1em]`.
- **It has no side stripe.** The seven copies it replaced each carried a 4px left border,
  which is the most recognisable generated-UI tell and the most common detector finding on
  this repo. The tinted surface, the defined edge and the label carry the block instead.
- Variants: route-level blocks use the default body (`text-sm sm:text-base`); blog prose
  passes `bodyClassName="text-base leading-[1.75] text-slate-800"` because article measure
  runs larger.

### Callouts (blog body)
- Four semantic types — Pro Tip (emerald), Key Fact (sky), Heads Up (amber), Insider Insight
  (violet) — set in `src/routes/BlogPostRouteView.tsx`.
- **Colour carries the type**, so it stays. What changed: the 4px left stripe became a full
  1px border in the same colour, and the emoji that stood in for icons (💡 🔑 ⚠️ 🔎) became
  drawn Lucide icons at 14px. Emoji as an icon system is refused by this design system.

### Inputs / Fields
- **Style:** white fill, `border-default` `#CBD5E1`, `rounded-md`/`rounded-lg`.
- **Focus:** visible ring in brand gold or navy at 2–3px with offset. Never remove outline
  without an equivalent.
- **Disabled / error:** must be defined wherever a field exists; the flight and hotel
  search widgets are the highest-risk surfaces.

### Navigation
- Fixed navy bar, `backdrop-blur`, `rgba(11,20,38,0.9)`; Inter `text-sm`, weight 600.
- Mobile treatment is the primary case — verify at 390px width, including the language
  switcher and the search entry point.

## Do's and Don'ts

### Do:
- **Do** answer the reader's question before presenting any affiliate CTA.
- **Do** text a date, price or code with `tabular-nums` so digits keep their column.
- **Do** use the navy/ivory/gold/emerald tokens from `@theme`; if a value is genuinely
  missing, add a token rather than a hex literal.
- **Do** ship a font file before naming it in `--font-*`, and keep
  `index.html`'s critical CSS and `public/fonts/fonts.css` in sync.
- **Do** keep both locales in step — a feature that works only in English is unfinished.
- **Do** verify changes at 390px, 768px and 1280px, and honour `prefers-reduced-motion`.
- **Do** theme the browser's own surfaces — `::selection` is brand gold on navy text, links
  carry a 3px underline offset, and the scrollbar is tinted via `scrollbar-color` in
  `src/index.css`. This is the cheapest signal that a page was built rather than assembled.
- **Do** give every interactive element a pressed `:active` state, not just hover and focus.
  The gap between tap and result is where a reader on a slow connection needs reassurance.

### Don't:
- **Don't** name a font family that has no file in `public/fonts/`. This is the defect that
  made 205 headings render in an accidental typeface.
- **Don't** put gold `#F6B73C` or `#D4941A` text on a light surface — use `gold-ink`.
- **Don't** use a thick coloured `border-left`/`border-right` on a rounded card, list item
  or callout. It is the most recognisable AI-generated-UI tell; the quick-answer blocks use
  a tinted surface with a label instead.
- **Don't** set grey text on navy or on any coloured ground — tint from the surface colour.
- **Don't** use monospace for decorative labels, or as a costume for "technical".
- **Don't** let an emoji stand in for an icon. Emoji render as a different picture in every
  OS and font stack; use Lucide (already bundled) or an authored SVG, one stroke weight.
- **Don't** write `opacity: 0` as a resting state for animated content — a blocked stylesheet
  then hides it permanently. Use `animation-fill-mode: both`.
- **Don't** set type below 10px.
- **Don't** add another staggered entrance animation per hero element, and never bounce or
  elastic easing.
- **Don't** add gradient text, glass/blur as decoration, or a zero-offset coloured halo.
- **Don't** fabricate flight schedules, statistics, testimonials or savings claims.
- **Don't** restyle third-party review or affiliate widgets as URAL's own content.
- **Don't** use `sm:text-3.5xl`-style invented class names — verify a class exists in the
  built CSS before relying on it.
