# eVisas integration

**Lifecycle: current implementation reference · updated 16 November 2026**

Scope: the owner's request for prominent, contextual eVisas placements on the
homepage and related guides, varied banner formats, supplied destination campaigns
and a styling/correctness re-check. Repository implementation is not deployment.

## Placement map

Every listed surface has an English and Bengali version. Each page has at most
one visual eVisas ad; text assistance links are contextual. The homepage has one
combined section at the former banner position, before hotel search and Travel
Essentials. It replaces both the old horizontal ad and the lower handoff card.

| Surface | Creative | Campaign |
|---|---|---|
| Homepage, directly below the flight search | Prominent H2 and short introduction; actual widget left, 250×250 square right with the single partner button under it; stacked below 1024px | Account-level widget and destination chooser |
| Visa directory, after country cards | Horizontal; square below 768px | Account-level destination chooser |
| UAE visa checklist | 120×240 vertical inside the assistance panel | `sid=dubai` |
| Dubai destination guide | 250×250 square and descriptive visa-assistance link | `sid=dubai` |
| Chefchaouen/Morocco article | Square inside the declared article CTA | `sid=morocco` |
| Three UAE-related articles below | 160×600 skyscraper in the article rail; square below 1024px | `sid=dubai` |
| Thailand visa checklist | Official primary action and a qualified secondary text link | `sid=thailand` |
| Thailand destination guide and three articles below | Qualified descriptive text link | `sid=thailand` |

UAE article placements:

- `umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide` — explicitly the UAE leg.
- `abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide`.
- `chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai`.

Thailand article placements:

- `thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide`.
- `halal-food-guide-bangkok-bangladesh`.
- `nepal-vs-thailand-first-trip` — explicitly the Thailand option.

The shared article rail replaces its Saudi eSIM promotion on these selected
eVisas surfaces, avoiding stacked or unrelated advertising. Existing editorial
internal links retain their reading destinations.

## Implementation

- `src/components/AffiliatePartners.tsx` owns the account-level URL and programme
  status. The evergreen consumer handoff is independent of any private commission
  boost. Its self-referential fallback resolves to an empty URL on pause.
- `src/data/evisaProgram.ts` owns supplied campaigns, dated catalogue observations,
  contextual copy and explicit placement maps. Locale never determines passport
  eligibility.
- `src/components/EvisaPanels.tsx` renders the assistance panels, descriptive
  links and creatives. `scripts/prerender.ts` renders these same components,
  including `EvisaHomeSection` on both homepages; JavaScript is not needed to
  follow the partner fallback links. `index.html` supplies a `HOME_EVISAS` marker
  near its country-planning directory, rather than appending the section below FAQs.
- `src/utils/blogAffiliate.ts` resolves declared article CTAs, including their
  campaign. The client, prerenderer and declared-link verifier share it.
- `src/styles/evisa.css` uses the existing brand tokens. Artwork keeps its native
  aspect ratio and maximum width. A single `<picture>` chooses the appropriate
  creative, rather than downloading two hidden image elements.
- The supplied English artwork is not edited or translated. Bengali placements
  use a native, labelled promotion with the same campaign and localized copy.
  The partner's widget remains English in both locales, with Bengali instructions
  beside it. No invented language parameter is appended to the embed.
- All affiliate anchors have safe new-tab attributes, a nearby disclosure and
  `data-affiliate-placement`. These first-party placement IDs are not appended to
  eVisas URLs. The existing delegated tracker identifies the partner as `eVisas`
  and can read an image link's accessible label.

## Supplied links and evidence

Account link: `https://evisas.com/?ref=uraltravel`.

The owner supplied three campaign links. Earlier browser verification in this
task on 15 November 2026 observed their destination routing and referral cookie:

| URL | Observed destination |
|---|---|
| `https://evisas.com/?ref=uraltravel&sid=dubai` | `/destinations/uae-visa` |
| `https://evisas.com/?ref=uraltravel&sid=morocco` | `/destinations/morocco-visa` |
| `https://evisas.com/?ref=uraltravel&sid=thailand` | `/destinations/thailand-visa` |

These are destination campaigns shared by related pages, not unique per-page
campaigns. Cookie/routing evidence does not establish dashboard attribution or
completed applications.

Thailand: the provider's eligible-nationality list excluded Bangladesh when
checked on 15 November 2026. The Thai government portal remains the primary
application link. The paid alternative explicitly addresses other passports.

Morocco: the [provider page](https://evisas.com/destinations/morocco-visa) and
[official Accès Maroc conditions](https://www.acces-maroc.ma/assets/docs/Conditions%20utilisation%20eVisa%20-%20An.pdf)
were checked on 15 November 2026. The official document distinguishes nationality,
residence-permit and existing-visa categories. The CTA therefore asks applicants
to verify their category and supporting documents on the
[official portal](https://www.acces-maroc.ma/) before payment. It does not promise
eligibility from a Bangladesh passport alone. This supersedes the earlier blanket
Morocco hold without claiming that the provider's catalogue flag has been clarified
by its support team.

No partner prices, approval probabilities or processing guarantees are added to
these placements. The dated catalogue list in the data module is research, not a
live eligibility checker.

## Asset sizes

WebP outputs measured on disk on 15 November 2026; only the four shipped WebP
files live in `public/assets/partners/evisas/` so unreferenced PNG originals are
not copied into `dist/`.

| Creative | PNG bytes | Shipped WebP bytes |
|---|---:|---:|
| Horizontal | 100,849 | 13,648 |
| Square | 93,058 | 14,626 |
| Vertical | 44,528 | 7,536 |
| Skyscraper | 154,429 | 21,916 |

## Homepage widget — owner-supplied code, 15 November 2026

The owner supplied this exact iframe URL:
`https://evisas.com/widget/wgt_4c9e559a2739a9d02b62f257`.
`EVISAS_WIDGET` retains it without query changes. The initial iframe attributes
match the supplied snippet: 100% width, 340px height, no border, lazy loading and
the title `eVisas visa checker`. The container stylesheet gives the unmodified
partner form more vertical room on narrow panels; its documents and script are
not copied, intercepted or rewritten. Browser measurements found the provider
form needed 476px at a 316px-wide panel and 561px at 246px. Container queries
reserve 500px and 580px respectively on the live frame slot
(`.home-evisa-frame`, `.home-evisa-widget-slot--live`), avoiding clipped
controls while keeping the unconsented fallback card (`.home-evisa-consent`)
compact on stacked mobile/tablet viewports, free of any fixed height so zoomed
or Bengali text expands naturally, and balanced at `min-height: 340px` beside
the square creative at `>= 1024px`. Wider frames retain the supplied 340px
height. On the client homepage, a pause-gated, `aria-hidden`, dimension-matched
`React.Suspense` skeleton reserves the section's footprint while the lazy
`EvisaPanels` chunk loads so downstream sections do not shift. These are layout
measurements, not processing times.

The public widget returned HTTP 200 with `frame-ancestors *` on 15 November 2026.
Its observed data endpoint returned 16 destinations for Bangladesh, excluding
Thailand, and 29 for the United Kingdom, including Thailand. Supplied application
URLs carry `ref=uraltravel` and `w=wgt_4c9e559a2739a9d02b62f257`; these are not the
separate destination-campaign `sid` links. Neither an HTTP response nor an encoded
referral parameter establishes dashboard receipt or a completed application.

`src/utils/consent.ts` (re-exported via `src/utils/evisaWidgetConsent.ts`)
requires `Marketing & Partner Tools` (`marketing`) consent. Missing, declined,
invalid or analytics-only choices leave the native explanation and direct link
visible, without requesting the remote frame. A neutral secondary
cookie-preferences button opens the central consent controls while preserving
the direct link under the square creative as the section's sole primary gold
action. Grant and withdrawal events mount/remove the frame immediately without
a client consent flash (`useSyncExternalStore` with a fail-closed server
snapshot), including when browser storage is unavailable, and synchronize across
tabs. The 12-second slow-load notice arms via `IntersectionObserver` only once
the widget slot enters the visible viewport (falling back immediately if
`IntersectionObserver` is unavailable), preventing premature slow-load messages
while a `loading="lazy"` iframe remains below the fold.

The direct partner link remains usable while the checker is loading, unavailable
or consent-blocked, and it is the section's only action: one button placed under
the square creative. There is no separate guide link, no footer recap and no
load-date stamp. The only in-block disclosure is the caption under the creative
("Advertisement · Private, paid visa service"); the commission statement stays in
the sitewide footer and the privacy policy instead of being repeated inside the
section. Both privacy pages describe the optional embed, its data handling and
the provider's privacy policy.

The widget also prints its own provider copy, which URAL neither edits nor hides:
`Apply now - Start from <price>` and `Apply today and your visa will be ready on
<date>`, both from the destination rows in its data endpoint. Those labels are
fixed strings supplied per destination, not calculated by this site. On 15
November 2026 they read 16–20 November 2026 across destinations, consistent with
a rolling business-day offset, but a lag in the provider's data would publish a
stale promise. That risk belongs to the provider's data, not to URAL copy, and it
is the reason no equivalent date or price appears anywhere in URAL's own text.

## Design rationale and checks

- **`ui-styling`:** responsive formats, semantic links, visible keyboard focus,
  touch-sized actions and readable localized disclosure.
- **`copywriting`:** the revised homepage introduces the service in natural,
  short copy under a prominent H2, with a paperwork-first hook. It adds no approval,
  price or processing-time promise.
- **`impeccable` + `DESIGN.md`:** editorial hierarchy, restrained advertising and
  one primary action per assistance block. The context launcher failed earlier;
  the project context and skill references were read directly.
- **Suggested next skill — `cro`:** assess placement and wording against observed
  visitor actions. Completed applications remain the business outcome; clicks
  alone are not evidence of commission. `analytics` is the follow-up for checking
  GTM/GA4 forwarding and partner reports.

Required commands: `npm run lint`, `npm run build`, `npm run verify:build`.
`scripts/evisaChecks.ts` covers exact campaign destinations, EN/BN saved-component
parity, one visual ad, disclosures, official-route qualifications, pause behavior,
asset presence and negative controls. Browser checks cover responsive image
selection, actual image decoding, focus, link behavior and click events.

### Initial integration verification — 15 November 2026

- `lint`, `build` and `verify:build` exit 0; **519 build checks passed**.
- Eager JavaScript: **213.0 KB gzip**, within the existing 214 KB ceiling from
  this task's measured baseline adjustment. The eVisas module remains lazy.
- Headless Microsoft Edge/Chromium at **390, 768 and 1280 CSS pixels**: 57 initial
  page/viewport combinations, followed by 24 scoped confirmation combinations.
  Images decoded successfully, formats matched breakpoints, and no horizontal
  overflow was observed. Final campaign links and new-tab attributes matched.
- The initial browser pass exposed a legacy mid-article flight-fare button
  routing Morocco readers to the generic account URL. That duplicate was removed;
  the full React article/static action comparison now guards the regression.
- Keyboard checks were run sequentially with explicit placement targets after a
  parallel probe conflated active-tab focus and lazy homepage insertion order.
  All 24 unique sampled route/width combinations showed visible focus; the six
  homepage combinations were independently reconfirmed.
- These are emulated viewport/browser checks, not physical-device or production
  measurements. The build's optional IndexNow notification failed with `fetch
  failed`; local build success does not establish indexing or deployment.

### Homepage widget revision — 15 November 2026

The owner requested the actual widget and square banner in one prominent section,
replacing the horizontal banner and the later standalone card. `lint`, `build`
and all **523 build checks** passed for the revised implementation; eager
JavaScript remained **213.0 KB gzip**.

The first browser pass identified clipped provider content on phones. After the
container-height correction, all ten confirmation cases passed: English and
Bengali at 320, 390, 768 and 1280px with consent, plus both languages at 390px
without consent. The widget's Bangladesh/UAE and United Kingdom/Thailand
selections produced the observed account-attributed URLs. The unmodified frame
content fits without horizontal overflow, and withdrawal removes the frame.
Without consent, no widget request was made; the preferences button opened the
existing consent controls with visible keyboard focus. This evidence is from
headless Microsoft Edge/Chromium, not physical devices or a production deployment.

### Placement and disclosure revision — 15 November 2026

The owner then moved the section directly below the flight search, swapped the
quick airport-code reference down under the "Where Are You Flying Next?" cards,
removed the three footer lines, and kept a single partner button under the square
creative (the guide link was deleted). The same date's checks assert that order in
`src/App.tsx`, that the section carries exactly one partner action inside the
creative's figure, that no disclosure footer or `/visa` link is reintroduced there,
and that every page either labels the ad beside it or carries the commission
statement. No URAL-authored date, price or processing time appears in the section.

The [initial proposal](../history/2026-11-evisas/EVISAS-AFFILIATE-PLAN-2026-11-15.md),
[initial placement spec](../history/2026-11-evisas/EVISAS-PLACEMENT-SPEC-2026-11-15.md)
and [early skill outputs](../history/2026-11-evisas/EVISAS-SKILL-OUTPUTS-2026-11-15.md)
remain historical evidence.
