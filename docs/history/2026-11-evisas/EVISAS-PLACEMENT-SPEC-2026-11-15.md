# eVisas Placement Spec — Homepage, Thailand, UAE, Morocco

> **HISTORICAL RECORD — DO NOT TREAT AS CURRENT STATE.** This is the initial design and intermediate implementation record. The owner subsequently requested more prominent, varied placements. The banner count, mobile/Bengali omissions, Morocco hold and claims about a widget fallback below are stale. See the [current eVisas integration reference](../../04-monetization/EVISAS.md).

**Lifecycle:** historical design proposal
**Date:** 15 November 2026
**Design authority:** `DESIGN.md` (Article affiliate next step, Callouts, QuickAnswer, Badges), `PRODUCT.md` (Product Principle #1: the reader's answer comes before any CTA), eVisas portal walkthrough chapters 5–7 (widget placement, banner use, disclosure rules)
**Skill:** `impeccable` — context launcher exited 1 partway through loading, so tokens below are read directly from `DESIGN.md` and the live components rather than from the generated brief.

---

## Implementation record — 15 November 2026

`npm run lint` and `npm run verify:build` both exit 0. What shipped, and what
changed against the spec written below:

| Area | Shipped | Difference from the spec |
|---|---|---|
| Homepage card | `src/components/EvisaPanels.tsx` → `EvisaHomeCard`, between `TravelEssentials` and the tools panel | **Lazy-loaded**, not eager. Eager import pushed the entry chunk past the gzip budget `verify:build` asserts. |
| Homepage widget | **Not shipped** | eVisas' embed URL is generated inside their dashboard and was not obtainable from the public site. Inventing one is the failure that produced a dead eVisas link before. The card's static link is already the no-JS fallback; adding the iframe later is a one-constant change. |
| Homepage banner | `EvisaHomeBanner`, English homepage only, `hidden md:block`, WebP | Converted 100,849 → 13,648 B. Never below 768px: at phone width the creative's small text lands near 4px. |
| Thailand | Two-track panel, official portal first, affiliate link second, gated on "another passport" | Unchanged from the spec. |
| UAE | Affiliate panel with the official ICP/u.ae link beside it | Unchanged from the spec. |
| Morocco | **Not shipped** | The plan's own gate: eVisas has not explained what the "Residency" flag requires. Publishing a CTA to a visa the reader may not qualify for is the one outcome worth refusing. |
| Data layer | `src/data/evisaProgram.ts` — copy, campaign URLs, the 16-destination eligibility list, the 5 conditional destinations | Campaign constants live here, not in `AffiliatePartners.tsx`, so they stay out of the eager graph. |

Six corrections carried over from `EVISAS-SKILL-OUTPUTS-2026-11-15.md`:

1. The homepage body no longer promises "what each one costs" — only that the reader can check which visas apply.
2. The disclosure is the last line of the panel, at `text-xs text-slate-600` directly under the actions, not detached in a footnote.
3. Banner: WebP + PNG master, plain `<img>` (not `ResponsiveImage`), `width`/`height`/`lazy`/`async`, no preload, `hidden md:block`, `alt` says "(advertisement)".
4. Primary metric remains completed applications; clicks are secondary.
5. No passport/destination select ships yet, so the "visible label, never placeholder-only" rule is unexercised — it binds whoever builds the eligibility UI.
6. The three-colour funnel pattern is rejected; one accent, one primary action per block.

One addition the spec did not anticipate: `AFFILIATE_OFFER_REGISTRY.evisas.fallbackPartner`
points at **itself**. Every other partner falls back to a comparable product, but a
paused visa intermediary has no comparable one — a "UAE visa" panel that silently
became a flight search would be worse than no panel. The self-reference makes
`resolvePartnerUrl` detect the cycle and return `""`, so both renderers drop the
block and leave the government link standing.

---

## 0. Three findings that shape every decision below

**1. The supplied banners are brand advertising, not destination CTAs.** The horizontal artwork reads *"eVisas — We make borders feel like open doors. Apply with eVisas. Skip paperworks, start your trip."* It names no country, no price, no eligibility. Beside a Thailand guide — where the reader's question is "can I get a Thai visa on my passport?" — it answers nothing. It is also **English-only**, which breaks EN/BN parity on any Bengali page.

**2. Green means "verified official" in this repo.** `MultiPartnerBlogCallout` is `bg-emerald-50/60 border-emerald-200/80` and carries the badge "Verified Official Partner". eVisas is a paid intermediary whose own footer says a traveller may apply cheaper directly. Reusing that treatment — or the banner's green — would imply an endorsement that does not exist.

**3. `QuickAnswer` must precede every affiliate block.** `DESIGN.md` states it explicitly, and it is Product Principle #1. All four placements below sit after the page's answer, never before it.

Consequence: **native panels carry the three contextual placements; the banner appears once, on the English homepage, as brand-level inventory.** That follows eVisas' "use the banners as supplied" rule by using them where supplied artwork fits, instead of forcing it into a context it cannot serve.

---

## 1. Homepage — the universal surface

**Where:** `src/App.tsx`, between `TravelEssentials` (SECTION 4.25) and the "Handy Travel Tools" panel. The reader has just seen who needs which entry permit; this is the check-your-own-passport moment.

**What:** one block, two layers.

| Layer | Behaviour |
|---|---|
| Static card | Always in the HTML: label, headline, body, two real links (checker + official-portals directory) |
| Widget | Loads **only on click** — a "Check my visa" button swaps the card for the iframe |

**Why click-to-load:** the iframe is third-party. Loading it eagerly sets provider cookies before consent and paints nothing in prerendered HTML. A facade keeps the static link, respects `ConsentBanner`, and costs nothing in LCP.

**Container:** `rounded-xl border border-border-subtle bg-white p-5 sm:p-6` · badge `bg-brand-navy text-[#F6B73C]` · headline `font-serif text-base sm:text-lg font-bold text-brand-navy` · body `text-xs sm:text-[13.5px] text-slate-700 leading-relaxed` · disclosure `text-[11px] text-slate-500`. **No side stripe. No emerald.**

**Copy — EN**

> Badge: `PAID SERVICE · NOT GOVERNMENT`
> Headline: **Check whether you need a visa for your passport**
> Body: Enter your passport and destination to see which online visas you can apply for, and what each one costs. Where an official government portal exists, we link that too — the paid route is optional.
> Primary: `Check my visa` → widget
> Secondary: `Official visa portals by country` → `/visa-free-countries`
> Disclosure: *URAL may earn a commission if you apply through eVisas, a private visa-assistance service. You pay the same price either way, and official portals are usually cheaper.*

**Copy — BN**

> Badge: `পেইড সার্ভিস · সরকারি নয়`
> Headline: **আপনার পাসপোর্টে ভিসা লাগবে কি না দেখে নিন**
> Body: আপনার পাসপোর্ট ও গন্তব্য দিন — কোন দেশের অনলাইন ভিসা আপনি নিতে পারবেন এবং খরচ কত, দেখতে পাবেন। যেখানে সরকারি পোর্টাল আছে, সেখানকার লিংকও দেওয়া থাকবে; পেইড সার্ভিসটি ঐচ্ছিক।
> Primary: `আমার ভিসা দেখুন`
> Secondary: `দেশ অনুযায়ী সরকারি ভিসা পোর্টাল`
> Disclosure: *eVisas একটি বেসরকারি ভিসা সহায়তা সার্ভিস। তাদের মাধ্যমে আবেদন করলে URAL কমিশন পেতে পারে। আপনার খরচ একই থাকে, আর সরকারি পোর্টালে সাধারণত খরচ কম।*

**Banner:** `horizontal-640x120.png`, English homepage only, between the tools panel and `TrustpilotReviews`. Max width 640px, centred, `loading="lazy"`, wrapped in an `<a>` to the main link with `rel="noopener noreferrer sponsored"`. Omitted entirely on `/bn/`.

**Mobile:** the card stacks; the widget iframe becomes full-width at 340px height, and the primary button goes full width (min 44px). No sticky variant.

---

## 2. Thailand — the two-track block

**Where:** `src/routes/VisaRouteView.tsx`, after `#visa-documents` and before `#official-visa-sources`. Gated on `activeVisa.id === "thailand-visa"`.

**Why here:** the reader has read the checklist and is at the decision point. `Official sources` immediately follows, so the official route is not displaced — it is reinforced.

**Eligibility gate:** two rows, always both visible.

| Row | Reader | Action |
|---|---|---|
| 1 | Bangladeshi passport (the default reader) | Official portal `thaievisa.go.th` — **no paid link at all** |
| 2 | Any other passport | `sid=thailand` campaign link, once created |

**Copy — EN**

> Badge: `THAILAND eVISA`
> Headline: **Bangladeshi passports: use the official Thai portal**
> Body: Thailand's tourist eVisa is applied for on the Royal Thai Government portal. We do not send Bangladeshi readers to a paid intermediary for this visa.
> Primary: `Open the official Thai e-Visa portal ↗`
> Secondary line: *Travelling on another passport? eVisas processes the same Thai eVisa for 87 nationalities, Bangladesh not among them.* → campaign link

**Copy — BN**

> Badge: `থাইল্যান্ড ই-ভিসা`
> Headline: **বাংলাদেশি পাসপোর্ট: সরকারি থাই পোর্টাল ব্যবহার করুন**
> Body: থাইল্যান্ডের ট্যুরিস্ট ই-ভিসা রয়েল থাই সরকারের পোর্টালে আবেদন করতে হয়। এই ভিসার জন্য আমরা বাংলাদেশি পাঠকদের কোনো পেইড মাধ্যমের কাছে পাঠাই না।
> Primary: `সরকারি থাই ই-ভিসা পোর্টালে যান ↗`
> Secondary: *অন্য দেশের পাসপোর্ট আছে? ৮৭টি জাতীয়তার জন্য eVisas একই থাই ই-ভিসা প্রসেস করে — বাংলাদেশ তাদের মধ্যে নেই।*

**Asset:** none. No banner here — the artwork cannot answer a Thailand eligibility question.

---

## 3. UAE — the one placement that earns today

**Where:** same component insertion in `VisaRouteView.tsx`, gated on `activeVisa.id === "dubai-visa"`, after `#visa-documents`.

**What:** the only page where a Bangladeshi passport can actually complete a purchase, so the block is commercial rather than a signpost.

**Link:** campaign `sid` when you create it; until then the tested deep link `https://evisas.com/destinations/uae-visa?ref=uraltravel`. Swap the constant later — no markup change.

**Copy — EN**

> Badge: `PAID APPLICATION SERVICE`
> Headline: **UAE tourist eVisa on a Bangladeshi passport**
> Body: A UAE tourist eVisa can be applied for online before you fly. eVisas is a private service that checks your documents and files the application for you; the government fee is included in its price.
> Primary: `Check UAE eVisa price and requirements` → campaign link
> Secondary: `Compare with the official UAE ICP portal ↗`
> Disclosure: *URAL may earn a commission if you apply through eVisas. You can apply directly with the UAE authorities instead.*

**Copy — BN**

> Badge: `পেইড আবেদন সার্ভিস`
> Headline: **বাংলাদেশি পাসপোর্টে UAE ট্যুরিস্ট ই-ভিসা**
> Body: ওড়ার আগে অনলাইনে UAE ট্যুরিস্ট ই-ভিসাতে আবেদন করা যায়। eVisas একটি বেসরকারি সার্ভিস — তারা ডকুমেন্ট যাচাই করে আপনার হয়ে আবেদন জমা দেয়; তাদের মূল্যে সরকারি ফি অন্তর্ভুক্ত।
> Primary: `UAE ই-ভিসার মূল্য ও শর্ত দেখুন`
> Secondary: `সরকারি UAE ICP পোর্টালে দেখুন ↗`
> Disclosure: *eVisas-এর মাধ্যমে আবেদন করলে URAL কমিশন পেতে পারে। সরাসরি UAE কর্তৃপক্ষের কাছেও আবেদন করা যায়।*

---

## 4. Morocco — the conditional test

**Where:** the Chefchaouen guide, using the existing **`affiliateCTA`** field (`provider: "evisas"`), which renders the standard "Article affiliate next step" panel at `BlogPostRouteView` and through `renderBlogAffiliateCtaHtml` in `scripts/prerender.ts`. No new component, no markup change.

**Why not the multi-partner callout:** that component is emerald and says "Verified Official Partner". Wrong signal for a paid intermediary.

**Copy — EN**

> Headline: **Morocco eVisa: check before you book the mountain route**
> Body: eVisas prepares the Morocco eVisa for eligible passports — note that Morocco is listed with a residency condition, so confirm you qualify before applying.

**Copy — BN**

> Headline: **মরক্কো ভিসা: পাহাড়ি রুটের বুকিংয়ের আগে যাচাই করুন**
> Body: যোগ্য পাসপোর্টে eVisas মরক্কো ই-ভিসা প্রস্তুত করে — তবে মরক্কোর সঙ্গে residency শর্ত উল্লেখ আছে, তাই আবেদনের আগে যোগ্যতা নিশ্চিত করুন।

**Gate:** ship this only after eVisas explains what "Residency" means. Until then the Marrakesh/Chefchaouen post keeps its existing non-eVisas CTA.

---

## 5. Rules that apply to all four

1. **One action per block.** Headline and body come from data, never re-worded in a renderer; the button label comes from a single helper so React and prerender cannot drift.
2. **Evergreen disclosure.** Commission language only — never the 30/45% rate, never the boost end date. Those are deal terms, not reader information (`DESIGN.md`).
3. **Paused partner = omitted block**, resolved through `resolvePartnerUrl`, never a link to nowhere.
4. **Both renderers.** Anything that does not appear in `scripts/prerender.ts` output does not exist for search or for `verify:build`.
5. **Bengali parity:** same placement, same destinations, same disclosure, natural Bengali; no English-only artwork on `/bn/`.
6. **Outbound links:** `target="_blank" rel="noopener noreferrer sponsored"`.
7. **Third-party surfaces stay third-party:** if the eVisas widget is shown, it keeps their branding and a "Powered by eVisas" label; it is never dressed as URAL content.
8. **No price without date and source** — eVisas prices carry "checked 15 November 2026" wherever a figure appears.

---

## 6. Build order

1. `AFFILIATE_LINKS.evisas` + campaign constants (real URLs only; no invented `sid`).
2. `"evisas"` added to the `affiliateCTA.provider` union in `src/types.ts`.
3. `EvisaNextStep` panel component (used by Thailand and UAE in `VisaRouteView`).
4. Homepage card + click-to-load widget at the `TravelEssentials` / tools boundary.
5. Morocco via `affiliateCTA` + Bengali override.
6. `scripts/prerender.ts` parity for all four.
7. `npm run verify:build` must exit 0.

**Blocked until you act:** the Dubai and Morocco campaign `sid`s (create in the dashboard and send the copied links), and confirmation of what "Residency" means. Nothing above requires them to start except the two campaign links.
