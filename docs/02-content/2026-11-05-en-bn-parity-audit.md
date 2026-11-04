# EN/BN article parity — 5 November 2026

**Lifecycle: supporting, dated diagnostic.**

**Baseline:** `e0c7936`, rebuilt locally on 5 November 2026. Scope: all **53 English/Bengali article pairs**,
their source data, saved HTML and the shared React article component. Schema and shared-presentation repairs were
verified after this baseline. Dated resolutions below distinguish those repairs from the open editorial findings.

## Owner's requirement

English and Bengali articles must provide the same complete experience: section hierarchy, features, components,
SEO/AEO coverage, structured data, reference destinations, internal-link journey and commercial actions.

Bengali must be fluent, accurate, native writing. Preserve the meaning, detail and qualifications while allowing
natural sentence rhythm and length. Keep precise technical, industry and aviation terms in English where useful,
including PNR, open-jaw, eSIM, IATA codes and official names. Ordinary prose should read naturally in Bengali.

Adding two links to an otherwise reduced page does not satisfy that requirement. Equal counts alone do not,
either: two lists of five links can take the reader to different destinations.

## Method and corrections to the interrupted audit

- Rebuilt `dist/` from the stated baseline and ran `verify:build`: **458 checks passed before this repair**.
- Inspected metadata and links in `src/constants.ts`, bodies in `src/data/blogContent.ts`, Bengali overrides in
  `src/data/bengaliContent.ts`, and the four Markdown-authored posts through their generated data.
- Followed the actual SEO and answer sources: `src/utils/seoCopy.ts`, `getBengaliRouteSeo`, the two snippet maps
  then in `src/App.tsx`, scheduled SEO/snippet data, and `src/utils/blogStructuredData.ts`. The shared-presentation
  repair subsequently moved the existing snippet maps to `src/utils/blogSnippets.ts`.
- Parsed **106 saved article documents** with the browser's DOM parser. Inspected another 106 HTML fixtures
  rendered by the real `BlogPostRouteView` component. These fixtures supply an inert author-card callback, a
  fixed cover-image path and a simple locale URL formatter; they establish component structure. App-head behavior,
  final routing and cover selection require the separate running-browser checks.
- Checked the running production-preview app on Bengali hotel, Singapore visa, DIY Umrah and Cox's Bazar pages,
  and on English Singapore visa/DIY Umrah pages. Browser checks revealed the schema failure that the fixtures
  and static verifier could not detect.
- Compared reference URLs and normalized editorial destinations, accounting for the legacy
  `/tools?tab=currency` alias. Inspected destination loss separately where the static renderer strips queries.

The initial temporary scripts produced three misleading readings, now corrected:

1. **“No Bengali SEO/AEO fields” was false.** Those fields live outside the Bengali article override object.
2. **“All heading structures match” was unproven.** Counting only `##` misses numbered and plain-text headings.
3. **“Bengali has no automatic recommendations” was too broad.** The React page has them; the saved Bengali HTML
   lacks the English static supplement. Different section IDs also do not prove that a block is absent.

`npx tsx scripts/audit-blog-parity.ts` regenerates the source manifest and local React fixtures after a build.
It is a diagnostic command, separate from the publishing scripts. The fixtures are marked `noindex`; rebuild
before using `dist/` for a release. This inventory measures structure and wiring, not rankings or every travel claim.

## Findings

### 1. Bengali schema values were corrupted after JavaScript — repaired first

**Evidence at the baseline:** the saved Bengali pages contained valid `Article`, `FAQPage` and `HowTo` types.
In the running browser, `syncPageSchemaCopy` sent every string through `localizePublicSiteUrl`, whose relative-URL
parser accepted ordinary text as a page path. Examples from the DIY Umrah and Singapore visa pages:

| Intended value | Value after the broken client pass |
|---|---|
| `Article` | `https://uraltravel.co.uk/bn/Article` |
| `bn-BD` | `https://uraltravel.co.uk/bn/bn-BD` |
| `2026-10-19T09:00:00+06:00` | `https://uraltravel.co.uk/bn/2026-10-19T09:00:00+06:00` |
| Bengali headline or FAQ answer | A percent-encoded URL instead of text |

This shared client pass applies to Bengali page schema; green static checks could not establish runtime parity.

**Resolution, 5 November — commit `5e7b051`:** `localizePublicSiteUrl` now requires an explicit URL or root-relative path before
performing URL localization. Schema types, dates, language codes and prose retain their values. Genuine page
URLs still localize, including query strings and fragments; external URLs and shared entities remain intact.

Two regression checks were added to `scripts/verify-build.ts`. The literal-value check failed against the
original helper before the fix. After the fix, the built browser pages for Bengali DIY Umrah, Singapore visa and
Cox's Bazar contained `Article`, correct language/date values and headlines matching their visible H1s. The DIY
page retained five FAQ questions and six HowTo steps. The English DIY page retained the same schema capabilities.

### 2. Saved Bengali header and reading sections — resolved; body formatting remains open

**Resolution, 5 November 2026:** all **53 pairs** now render the same shared header and reading components in
saved HTML and React: complete localized summary, byline, canonical dates, responsive cover, curated planning
panel, up to three related cards and five planning hubs. All four shared section IDs occur once per article.
Bengali's three missing static luggage-storage placements now use their existing localized placement data.

| Measured after repair | EN saved HTML | BN saved HTML | React, each locale |
|---|---:|---:|---:|
| Full summary in the shared QuickAnswer | 53 | 53 | 53 |
| Shared publication/update byline and cover | 53 | 53 | 53 |
| Curated planning section | 53 | 53 | 53 |
| Related-reading card section | 53 | 53 | 53 |
| Planning-hub section | 53 | 53 | 53 |
| Localized luggage-storage placement | 3 | 3 | 3 |

The two snippet maps and 46 explicit article-cover mappings were extracted without changing their values.
The shared header uses a 28–38px fluid title scale and relaxed Bengali line height; scoped CSS fixes the critical
shell's former 40px override. Planning labels wrap fully rather than being truncated to one line.

**Baseline evidence retained:**

| Feature at the baseline | English saved HTML | Bengali saved HTML | React article view |
|---|---:|---:|---|
| Full article summary appears verbatim, normalized for whitespace | 53 | 2 | 53 in each locale |
| Separate “Plan your trip” block | 52 | 0 | Curated next-step panel in both |
| Static related-article supplement | 53 | 0 | Related cards in both |
| Additional planning-hub block | 53 | 0 | Separate static/browser layout difference |
| Radical Storage contextual placement | 3 | 0 | 3 in each locale |
| Multi-partner contextual placement | 8 | 8 | 8 in each locale |
| Creator-referral placement | 3 | 3 | 3 in each locale |
| Klook hotel collection placement | 1 | 1 | 1 in each locale |
| Declared article affiliate next step | 48 | 48 | 48 in each locale |

At the baseline, the Bengali static branch started with its short SEO description and lacked the equivalent
publication/read-time byline. The shared header replaces that opening with the full summary and byline.

The restored static luggage-storage placement covers:

- `europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide`
- `hotel-savings-guide-bangkok-kl-dubai`
- `sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost`

The cover/QuickAnswer treatment is now shared. Many numbered body headings and lists still have different static
formatting, and other article/sidebar features retain separate rendering paths. Those need their own bounded
review. The two authored inline figures and the DIY budget table continue to render in both languages.

### 3. Authored link destinations — open; automatic selection and link routing resolved

- **25 pairs have different authored link counts:** Bengali is shorter on 18 and longer on 7.
- **31 pairs have different raw URL lists.** Four are legacy currency-tool aliases; after resolving those,
  **27 pairs have genuinely different editorial destination sets**.
- **Automatic recommendation differences: 38 → 0 pairs.** `getArticleRelatedPosts` now scores the canonical
  English graph and then supplies each locale's titles and URLs. Saved HTML and React expose the same ordered list.
- The Bengali DIY Umrah array repeats the hotel/Haramain article and omits the English Dubai destination link.
  Both arrays contain eleven entries, so a count-only parity check misses the problem.

**Routing resolution, 5 November:** article planning links now use `articleLinkPath`, which resolves the four
Bengali currency-tool aliases to `/bn/tools/currency-converter` and preserves experience filters and fragments.
The rendered planning list deduplicates destinations; the DIY Umrah duplicate still needs removal from its
authored Bengali array alongside the missing Dubai link. The source inventory still measures **27 genuinely
different destination sets**. Fixing rendering does not reconcile those editorial choices.

### 4. Four articles change their primary affiliate partner by language — open

| Article | English | Bengali |
|---|---|---|
| Kathmandu/Pokhara itinerary (`blog-5`) | Aviasales — flights | Airalo — eSIM |
| Maldives budget (`blog-7`) | Klook — activities | Airalo — eSIM |
| Singapore visa (`blog-8`) | Airalo — eSIM | Klook — attractions |
| Dhaka departure immigration (`blog-10`) | Airalo — eSIM | Kiwitaxi — transfers |

Presence matches: 48 posts declare a CTA in each locale and five do not. Provider equality and editorial meaning
still need checking. Creator-referral placements are a separate commercial mechanism; an absent `affiliateCTA`
field is not proof that those creator articles lack an earning link.

### 5. Bengali search copy exists, but often receives less editorial treatment — open

| Source of title + description | English posts | Bengali posts |
|---|---:|---:|
| Authored SEO-copy table | 41 | 0 |
| Authored scheduled-post frontmatter | 4 | 4 |
| Derived from article title/summary | 8 | 49 |

Every saved Bengali article has Bengali title/description text. The issue is **41 English-specific SEO entries
without an equally authored Bengali counterpart**, plus the quality of fallback wording. Purpose-written Bengali
copy should serve the same query intent while using natural Bengali and accurate technical terms.

The AEO snippet inventory is better than the interrupted audit suggested: **45 authored snippets and four
scheduled snippets exist in each language**, with four summary fallbacks in each. The authored maps now live in
`src/utils/blogSnippets.ts`; the extraction was not an editorial rewrite. The shared QuickAnswer uses the complete
article summary, while cards and sharing use `getBlogAeoSnippet50Words`. These surfaces need coordinated editorial
review for natural Bengali, supported claims and equivalent qualifications.

### 6. Body outline and natural Bengali need section-level review — open

The real React article component produces different H2/H3 counts on **16 pairs**. Some differences concern
numbered steps or paragraph parsing; others concern coverage. The table below is a review signal, not a demand to
pad prose until counts match. A pair with equal counts still needs comparison of section meaning, facts and caveats.

For example, the English cheap-flight body has five numbered sections and the Bengali body has four. The English
Nepal/Thailand comparison separates shopping and transport discussion; the Bengali outline is more compressed.
Review the actual content before deciding whether to restore a section, improve its markup, or rewrite the Bengali
passage. Existing unsupported claims need evidence review in both languages before reuse.

## What already matches

- All 106 saved articles have the expected locale, self-canonical, reciprocal EN/BN alternates, `x-default` and
  page-specific `og:url`; the Bengali titles/descriptions contain Bengali text.
- Saved `Article` and `BreadcrumbList` occur on all 53 pairs. FAQ schema occurs on 20 pairs, with matching question
  counts. HowTo occurs on nine pairs, with matching step counts. The separate runtime corruption is resolved above.
- Declared reference URL lists and order match across all 53 pairs. The 29 non-empty lists render with Bengali
  `nameBn` labels on the Bengali page; 24 pairs have no article-specific reference array in either language.
- The React component provides a full-summary QuickAnswer, cover treatment, curated next steps, sharing features
  and automatic reading recommendations in both languages. Target/copy differences still matter.
- Both locales have the same supported inline figures and budget table. No active per-paragraph `callouts` arrays
  were found in this inventory, so their unused localization behavior was not counted as a live defect.

## Per-article inventory — baseline `e0c7936`

`Links` and `H2/H3` are **EN / BN**. Heading counts are inside the real React article component, with the supplied
author-card callback omitted identically in both fixtures. `Targets` compares canonical editorial destination sets;
`alias` means equivalent currency-tool source URLs whose saved rendering was corrected in the shared repair. `CTA` compares
provider keys only. All rows have matching reference destination lists and FAQ/HowTo counts where those are present.

| ID / article | Links | Targets | CTA | H2/H3 |
|---|---:|---|---|---:|
| blog-1 — Cheap flights from Dhaka | 4 / 5 | differ | same | 8 / 7 |
| blog-2 — Nepal vs Thailand | 8 / 5 | differ | same | 6 / 5 |
| blog-3 — Bangkok/KL/Dubai hotel areas | 10 / 6 | differ | same | 7 / 7 |
| blog-4 — Bangkok halal food | 5 / 5 | differ | same | 8 / 6 |
| blog-5 — Kathmandu/Pokhara itinerary | 4 / 5 | differ | different | 2 / 3 |
| blog-6 — Dual-currency endorsement | 6 / 6 | alias | same | 20 / 15 |
| blog-7 — Maldives budget | 4 / 5 | differ | different | 8 / 5 |
| blog-8 — Singapore visa | 4 / 5 | differ | different | 6 / 6 |
| blog-9 — Family destinations | 9 / 5 | differ | same | 8 / 8 |
| blog-10 — Dhaka departure immigration | 5 / 4 | differ | different | 6 / 6 |
| blog-11 — DIY Umrah | 11 / 11 | differ; BN duplicate | same | 26 / 23 |
| blog-12 — Hotel zones/Haramain | 8 / 8 | same | same | 21 / 21 |
| blog-13 — Hajj registration | 4 / 3 | differ | same | 12 / 13 |
| blog-14 — Umrah with elderly parents | 5 / 5 | same | same | 20 / 20 |
| blog-15 — Saudi stopover | 5 / 5 | same | same | 19 / 19 |
| blog-16 — Nusuk/Visa Bio | 5 / 5 | same | same | 28 / 28 |
| blog-17 — Women's Umrah | 7 / 7 | same | same | 20 / 20 |
| blog-18 — Saudi open-jaw flights | 7 / 7 | same | same | 22 / 22 |
| blog-19 — Ramadan/I'tikaf | 6 / 6 | same | same | 16 / 16 |
| blog-20 — Ihram/Miqat | 6 / 6 | same | same | 14 / 14 |
| blog-21 — Zamzam/dates/gold | 6 / 6 | same | same | 16 / 16 |
| blog-22 — Makkah/Madinah food | 6 / 6 | same | same | 20 / 20 |
| blog-23 — Ziyarah | 6 / 6 | same | same | 24 / 24 |
| blog-24 — Umrah/Dubai combo | 9 / 3 | differ | same | 13 / 13 |
| blog-25 — Abu Dhabi day trip | 7 / 3 | differ | same | 14 / 13 |
| blog-26 — Malaysia Islamic heritage | 7 / 3 | differ | same | 12 / 13 |
| blog-27 — Europe/UK/USA attractions | 3 / 3 | same | same | 14 / 14 |
| blog-28 — Islamic dual-currency cards | 6 / 6 | alias | same | 11 / 11 |
| blog-29 — RFCD/travel quota | 6 / 6 | same | same | 15 / 15 |
| blog-30 — BDT booking without a card | 7 / 7 | alias | same | 11 / 11 |
| blog-31 — Cash/cards/DCC | 6 / 6 | alias | same | 9 / 9 |
| blog-32 — Thailand e-Visa | 6 / 4 | differ | same | 10 / 10 |
| blog-33 — Malaysia eVisa/MDAC | 8 / 4 | differ | same | 8 / 10 |
| blog-34 — Fresh-passport travel history | 17 / 4 | differ | same | 7 / 7 |
| blog-35 — Singapore itinerary | 7 / 4 | differ | same | 5 / 5 |
| blog-36 — Bangkok medical travel | 8 / 4 | differ | same | 10 / 11 |
| blog-37 — eSIM/insurance | 4 / 4 | same | same | 16 / 16 |
| blog-38 — Sri Lanka/Maldives | 7 / 4 | differ | same | 8 / 9 |
| blog-39 — e-Passport | 5 / 4 | differ | same | 7 / 5 |
| blog-40 — Flight compensation | 5 / 5 | same | same | 13 / 13 |
| blog-41 — Airlines/baggage | 6 / 4 | differ | same | 4 / 5 |
| blog-42 — Airport codes | 5 / 7 | differ | same | 10 / 7 |
| blog-43 — Chattogram/Dubai flights | 6 / 8 | differ | same | 6 / 6 |
| blog-44 — Havana | 8 / 7 | differ | same | 11 / 11 |
| blog-45 — Chefchaouen | 8 / 7 | differ | same | 10 / 10 |
| blog-46 — Creator resources | 7 / 7 | same | absent both; referral | 16 / 16 |
| blog-48 — Dhaka/Kolkata | 5 / 5 | same | same | 20 / 20 |
| blog-49 — Tawaf/Sa'i | 8 / 8 | same | absent both | 13 / 13 |
| blog-50 — Hajj rites | 5 / 5 | same | absent both | 14 / 14 |
| Scheduled — Cox's Bazar guide | 6 / 6 | same | same | 20 / 20 |
| Scheduled — Kathmandu/Cox's Bazar | 4 / 4 | same | same | 12 / 12 |
| Scheduled — Affiliate experiment | 1 / 3 | differ | absent both; referral | 18 / 18 |
| Scheduled — Travel income without a website | 10 / 10 | same | absent both; referral | 15 / 15 |

Scheduled source files are the four articles in `content/blog/`; their IDs use `blog-scheduled-<slug>`.
There is no `blog-47` in the current published set.

## Remaining implementation order

1. **Curated reading journey:** reconcile the 27 authored destination differences and the duplicate, with natural
   Bengali anchors and a useful prerequisite/next-step order.
2. **Editorial parity:** align the four primary CTA choices, purpose-write Bengali SEO copy where English already
   has it, and review native Bengali section coverage and qualifications by topic. A matched provider or count is
   not a language-quality review.
3. **Remaining rendering features:** reconcile body formatting and other independently rendered article/sidebar
   features against the owner's complete-experience requirement.

Keep each implementation bounded to one feature/topic, verify the affected EN/BN outputs, then commit and push.
The immediate next step is curated-link reconciliation.

## First-repair verification

- `npm run lint` — passed.
- `npm run build` — passed; 133 English and 133 Bengali canonical routes generated.
- `npm run verify:build` — **460 checks passed** after the two new schema-localization checks.
- `npm run test:sitemaps` — passed, including 23 negative controls.
- `npm run test:sharing-citations` — 21 checks passed.
- Running production-preview browser: Bengali DIY Umrah, Singapore visa and Cox's Bazar, plus English DIY Umrah:
  correct Article type, language, dates, visible-H1 alignment, expected FAQs/steps, and locale-correct canonicals.

These are local build/browser results. Search-engine processing and deployment status are separate observations.

## Shared-presentation repair verification — 5 November 2026

- `npm run lint`, `npm run build`, `npm run verify:build` — passed; **468 checks**, with 133 routes per locale.
- Twelve relevant suites passed: DIY Umrah, Nusuk, stopover, hotel/rail, flight strategy, elderly travellers,
  women's Umrah, sharing/citations, sitemaps, Journey Help, Tawaf/Sa'i and Hajj rites.
- All **106 saved documents and 106 React fixtures** were parsed with the browser DOM parser. Headers, canonical
  dates, planning lists and ordered localized related cards matched their corresponding React/static surfaces.
- **24 running-app layout cases:** DIY Umrah, hotel-area comparison, dual-currency endorsement and the scheduled
  Cox's Bazar guide; English/Bengali at 390, 768 and 1280 CSS pixels. **Eight no-JavaScript cases:** DIY Umrah and
  hotel-area comparison in both locales at 390 and 1280 pixels. Checked in headless Microsoft Edge via Playwright.
- The scoped shared components had no horizontal overflow or clipped labels. Checked link targets were at least
  **44px** high; the lowest measured text contrast was **7.22:1**. Keyboard focus and reduced-motion behavior passed.
- Native Ctrl-click opened the localized related article in a new tab and retained the source page. Normal
  related-card navigation, the Bengali currency-converter link and an experience link's region/city filters passed.
- Local-only diagnostic fixtures were moved outside `dist/` after inspection. The build's optional IndexNow
  request failed at the network step; these checks do not establish indexing or deployment.

This verifies the bounded shared-presentation repair. The open editorial and remaining rendering findings above
still define the work needed for full article parity.
