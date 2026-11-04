# EN/BN article parity — 5 November 2026

**Lifecycle: supporting, dated diagnostic.**

**Baseline:** `e0c7936`, rebuilt locally on 5 November 2026. Scope: all **53 English/Bengali article pairs**,
their source data, saved HTML and the shared React article component. The first schema repair below was verified
after this baseline. The remaining findings are open; this document is not a declaration of full parity.

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
  in `src/App.tsx`, scheduled SEO/snippet data, and `src/utils/blogStructuredData.ts`.
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

### 2. Saved Bengali article structure is reduced — open

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

The Bengali static branch starts with its short SEO description rather than the full article summary and has no
equivalent of the English publication/read-time byline. It combines its authored planning/article links under one
heading. The complete body still exists; these are presentation and supporting-content gaps, not 51 empty articles.

The missing static luggage-storage placement affects:

- `europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide`
- `hotel-savings-guide-bangkok-kl-dubai`
- `sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost`

Both static renderers also omit the React cover/QuickAnswer-card treatment and leave many numbered headings and
lists as paragraph text. The two authored inline figures and the DIY budget table render in both languages.
Some parity work therefore belongs in shared rendering, rather than adding more Bengali-only conditions.

### 3. Link destinations and recommendations differ — open

- **25 pairs have different authored link counts:** Bengali is shorter on 18 and longer on 7.
- **31 pairs have different raw URL lists.** Four are legacy currency-tool aliases; after resolving those,
  **27 pairs have genuinely different editorial destination sets**.
- **38 pairs have different ordered automatic recommendation lists** from the current locale-dependent scorer.
  It reads translated titles and differing link arrays, so using the same helper does not produce the same selection.
- The Bengali DIY Umrah array repeats the hotel/Haramain article and omits the English Dubai destination link.
  Both arrays contain eleven entries, so a count-only parity check misses the problem.

Static URL handling also drops action details. `normalizeInternalHref` removes every query and fragment. For
`blog-6`, `blog-28`, `blog-30` and `blog-31`, the Bengali currency-tool alias becomes `/bn/tools`, losing the
converter selection. Experience filters are stripped on four English and two Bengali article lists. These are
destination/selection differences, not evidence that the hub URLs themselves return 404.

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

The AEO snippet inventory is better than the interrupted audit suggested: **45 App-authored snippets and four
scheduled snippets exist in each language**, with four summary fallbacks in each. The visible React QuickAnswer
uses the article summary, while cards and sharing use `getBlogAeoSnippet50Words`. These are distinct surfaces and
must stay aligned during editorial work.

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

## Per-article inventory

`Links` and `H2/H3` are **EN / BN**. Heading counts are inside the real React article component, with the supplied
author-card callback omitted identically in both fixtures. `Targets` compares canonical editorial destination sets;
`alias` means equivalent currency-tool source URLs whose saved rendering still needs correction. `CTA` compares
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

## Implementation order

1. **Schema string corruption:** resolved in this change, with a failing-before/passing-after regression check and
   real-browser verification.
2. **Shared article rendering:** give both locales the same full-summary/byline treatment, planning/related/hub
   blocks, contextual placements and source-supported body formatting in saved HTML and the browser.
3. **Shared reading journey:** reconcile the 27 destination differences, the duplicate and legacy query handling;
   select automatic recommendations consistently and supply native Bengali anchors.
4. **Editorial parity:** align the four primary CTA choices, purpose-write Bengali SEO copy where English already
   has it, and review native Bengali section coverage and qualifications by topic. A matched provider or count is
   not a language-quality review.

Keep each implementation bounded to one feature/topic, verify the affected EN/BN outputs, then commit and push.
The immediate next repair is the shared article-rendering layer.

## First-repair verification

- `npm run lint` — passed.
- `npm run build` — passed; 133 English and 133 Bengali canonical routes generated.
- `npm run verify:build` — **460 checks passed** after the two new schema-localization checks.
- `npm run test:sitemaps` — passed, including 23 negative controls.
- `npm run test:sharing-citations` — 21 checks passed.
- Running production-preview browser: Bengali DIY Umrah, Singapore visa and Cox's Bazar, plus English DIY Umrah:
  correct Article type, language, dates, visible-H1 alignment, expected FAQs/steps, and locale-correct canonicals.

These are local build/browser results. Search-engine processing and deployment status are separate observations.
