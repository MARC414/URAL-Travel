# URAL — Navigation, Catalogue Clarity and Affiliate Handoffs

**Lifecycle:** navigation implemented locally; independent review addressed; final review-fix CI being closed; deployment approval pending · **Date:** 19 November 2026.

The owner accepted the two-row header and the distinction between destination planning and Things to Do, then explicitly approved the revised local navbar preview on 19 November 2026 ("yes, approved") and authorized native implementation ("finally approval to implement"). The local React implementation follows Middle East first, Europe & UK second, Asia third and Americas fourth. It has not been pushed, merged into production or deployed. The broader catalogue/trust work described below is a separate subproject, not automatically authorized by approving the navbar's appearance.

**Storage approval, 19 November 2026:** the owner requested committing, merging and pushing the plan so other tools can follow it. This authorizes the documentation batch, not public implementation or deployment. It replaces the earlier no-commit/no-push boundary for this planning step. No new product code, public content, affiliate settings or redirects are changed by the documentation batch.

**Current next gate:** close the final review-fix CI evidence recorded in the
[implementation handoff](../../handoff/2026-11-19-approved-navigation-implementation.md), then obtain
separate final deployment approval. The visual and native-execution gates are satisfied. Do not
merge/push UI to the production branch or deploy before final approval. A saved plan, document
commit, or preview approval is not deployment permission. The earlier preview sequence below is
preserved as approval history, not an instruction to rebuild or reapprove the prototype.

## 1. Intent, goals and boundaries

URAL should help a reader find their next travel answer or booking option without understanding its internal providers, historic page names or route architecture. Its primary advantage remains practical, source-backed English/Bengali travel intelligence, serving international readers with Bangladesh as the home market and priority.

The owner wants one careful stabilization pass, followed by publishing and distribution rather than repeated cosmetic improvement cycles. The work therefore preserves the established URAL world and useful existing pages, rather than rebuilding the site.

### Goals

1. Visible Home and About Us links, organized desktop mega menus and equivalent mobile navigation.
2. A clear Things to Do entry, distinct from destination itineraries and with no competing top-level Attractions brand.
3. Discoverable existing country, city, visa, flight, hotel, cost and attraction guides.
4. Correct discovery for the owner's existing Pakistan destination, plus publication-gated support for future UK and Pakistan visa guides.
5. Reader-led affiliate actions with explicit provider identity and preserved attribution/consent.
6. Repair the named trust and discovery defects on touched surfaces, not undertake an unrestricted whole-site rewrite.
7. Regression coverage and a finite release checklist so routine publishing does not reopen the design.

### Non-goals

- No existing route/slug changes, redirect additions/removals, page deletions, consolidation redirects, domain change or additional language.
- No new city collection or attraction URL in this release; future UK/Pakistan visa publication is a separate content task.
- No logo redesign, new palette/font, broad homepage rearrangement, wholesale article rewrites or new comparison/availability engine.
- No new dependency, remote search service, account system, chatbot, booking fulfillment or payment/document collection.
- No automated partner-feed claim, speculative live price, invented product/campaign ID, new provider agreement or earnings forecast.
- No changes to the settled About/Partners page bodies or eVisas creative/widget placement merely to restyle them.

### Anti-goals

Failure includes a hidden Home/About link; a provider name used as a travel category; an affiliate doorway removed accidentally; partner identity hidden before an outbound action; an unpublished visa guide appearing in navigation; a stale price given a new checked date; or a layout so fragile that adding another published guide requires a new redesign.

## 2. Authority, current evidence and unresolved baseline

Read `AGENTS.md`, `00-URAL-STRATEGY-INDEX.md`, `00-URAL-CURRENT-AUDIT.md`, `PRODUCT.md`, `DESIGN.md`, `URAL-CONTENT-OPTIMIZATION-GUIDE.md` and the content acceptance/publication contracts before execution. The owner task controls scope; retained recommendations are not automatic approvals.

The earlier `2026-11-17-about-partners-evisas-design.md` describes a previous header placement decision. This design supersedes that navigation arrangement only, following the owner's current approval of visible utility links and a two-row header. It does not reopen that document's page-copy or affiliate placement work.

### Dated evidence from this conversation's audit

- Production sitemap: 310 fetched URLs, 310 HTTP 200 responses, 155 per locale, matching static canonicals and no duplicate English titles/descriptions in that crawl.
- 18 attraction detail URLs per locale; the interface's repeated 59-attraction claim is not supported by the current detail inventory.
- Seven representative routes at 390/1280px in EN/BN: 28 checks, plus four route/filter probes; no horizontal overflow in that sample.
- Attraction/experience interfaces overlap. Initial HTML and interactive catalogues have different discovery/content surfaces; sampled English attraction metadata becomes a numeric product-ID title after JavaScript.
- A sampled family-category record shows Not Family-Friendly and Not Wheelchair Accessible because missing optional fields are coerced to false.
- Local availability labels/time windows are fixed arrays, while generic Book Slot links do not preserve the purported reservation.
- Public GTM code includes `virtual_page_view`, but not the reviewed named affiliate/WhatsApp/referral event strings. This is evidence to investigate forwarding, not authenticated GA4 receipt or revenue proof.

Local supporting evidence: `C:\Users\HP\AppData\Local\Temp\opencode\ural-site-audit-2026-11-19\` (`crawl.json`, `summary.json`, `browser.json`, screenshots, public GTM download). These files are not build inputs or portable repository dependencies. No fresh build, field Core Web Vitals, physical-device test or exhaustive article fact-check was claimed.

### Baseline lock before implementation

**Resolved during documentation integration, 19 November 2026:** the earlier local checkout was stale at `dfb7f6f`. A fetch and safe fast-forward to upstream `main` at `374cbe6` recovered the existing `/destinations/kashmir-guide` (Azad Kashmir under Pakistan), `/flights/dhaka-islamabad`, and their source/mapping work. The apparent production-only absence was not lost content. Preserve it; do not recreate, overwrite, retire or rename it. Reconfirm the latest source/deployment baseline before implementation because other tools are actively contributing.

The refreshed `src/data/evisaProgram.ts` also includes Pakistan and UK campaign entries. Their presence is a code observation, not proof of provider eligibility, live destination routing or dashboard attribution. Preserve the existing entries and independently verify the applicable service before promoting it.

Use the actual published Pakistan guide and its real scope. A Pakistan menu label may have an Azad Kashmir subtitle when the guide covers that region; it must not imply an existing all-Pakistan itinerary. Keep Pakistan-administered Azad Kashmir separate from India-side Kashmir entry/access advice.

## 3. Approaches considered and chosen

| Approach | Trade-off | Decision |
|---|---|---|
| Put everything inside Destinations | Few labels, but conflates choosing a trip with choosing tickets and tours | Rejected |
| Keep three competing visitor sections: Destinations, Attractions and Experiences | Preserves every label but perpetuates duplicate catalogues and maintenance | Rejected |
| Destinations + Things to Do, with different roles for existing URLs | Preserves URLs while creating one public activity-navigation entry and a useful guide directory | **Chosen by owner in conversation** |
| Merge `/attractions` into `/experiences` with a redirect | Simplifies URL inventory but violates the owner's subsequent no-URL-change instruction | **Withdrawn; explicitly excluded** |
| Replace the visual identity or add a new commercial dashboard | Much larger cost/scope and inconsistent with the stabilization goal | Rejected |

## 4. Design and branding contract

This is refinement, not a new visual world. Preserve the existing URAL logo and source assets; navy/emerald/ivory/gold palette; Inter UI/body and Source Serif 4 editorial heading roles; Bengali font rules; existing corner/spacing/reading-width conventions; scoped focus and hover feedback; and restrained reduced-motion behavior.

- Use existing semantic/component tokens, not a parallel stylesheet theme or new font downloads.
- Navy remains the navigation ground, gold a controlled active/action accent, emerald the quieter guide/trust accent. Gold text must not be placed on light backgrounds in place of the documented gold-ink token.
- Inter is the menu face. Do not make mega-menu links serif or shrink text to force a fit.
- Preserve page imagery and the optimized supplied partner creatives. Do not crop, translate or rebrand partner artwork as URAL's.
- Major guide cards keep the current visual language. Name, region/type, short decision-oriented description and one clear action supply hierarchy; private product/marker/commission codes do not.
- Existing header height is the starting constraint. Fit utility links and primary tasks by layout/grouping, not a third fixed bar or tiny text. At a width that cannot accommodate the full primary row, use the mobile/navigation-drawer treatment rather than letting it wrap unpredictably.
- Preserve search, EN/BN controls, WhatsApp and subscription entry. If the visible label Sign Up opens email updates rather than an account, label it Email Updates / ইমেইল আপডেট; do not add or imply a new account system.
- Do not restyle unrelated homepage sections, About/Partners bodies, subscription forms or existing editorial article layouts as part of this work.

## 5. Navigation specification

### 5.1 Desktop header

```text
Utility row: Home · About Us · Our Partners · Contact | Search · WhatsApp · EN / বাংলা
Primary row: URAL logo | Destinations ▾ · Things to Do ▾ · Flights · Hotels · Visa Guides ▾ · Umrah & Hajj · Guides & Tools ▾
```

Home `/` and About Us `/about` must be visible, normally readable header links, not merely inside a submenu or footer. Logo remains a Home link. `/partners` and `/contact` remain explicit trust/help links.

Destination, Things to Do, Visa Guides, and Guides & Tools receive compact mega-menu panels using the existing disclosure pattern. Flights `/flights`, Hotels `/hotels`, and Umrah & Hajj `/umrah` remain direct links. No mega menu for a single link merely for visual uniformity.

### 5.2 Menu destinations

**Destinations — geographic groups, owner-approved order and Saudi cross-links**

- Parent/all: `/destinations`.
- First — Middle East: Saudi Arabia — Umrah & Hajj `/umrah`; Saudi Arabia visa guide `/visa/saudi-arabia-visa`; Dubai & Abu Dhabi `/destinations/dubai-guide`. The first two are explicitly labelled existing planning/entry cross-links, not invented Saudi destination pages.
- Second — Europe & UK: London `/destinations/london-guide`, Paris `/destinations/paris-guide`, Italy `/destinations/italy-guide`.
- Third — Asia: existing Nepal, Thailand, Malaysia, Singapore, Maldives and the owner's Pakistan/Azad-Kashmir guide.
- Fourth — Americas: New York `/destinations/new-york-guide`.
- Four desktop columns for Destinations supersede the earlier three-column limit. The other panels retain three columns; mobile renders these groups in the same order. More countries are handled by records and the all-guides directory, not another fixed header item.
- No partner slogans, visa fees, FX quotas, booking-volume claims or attraction ticket labels in these columns.

**Things to Do — activity discovery**

- Browse all activities and passes: `/experiences`.
- Asia & Middle East: `/experiences/asia`.
- Europe, UK & USA: `/experiences/europe`; the label acknowledges its current USA coverage without renaming the route.
- Individual attraction guides: `/attractions`.
- Useful existing city shortcuts may use the already-supported regional `?city=` filters. The canonical page path remains unchanged and each shortcut must open its actual selected city. Do not reuse the same unfiltered URL under three different city promises.
- Browse-by-type controls belong inside the catalogue. A type label becomes a menu link only if it has a real functioning target; no invented category URLs or non-functional mega-menu chips.
- An attraction receives a direct menu link only when its guide exists. Listing a venue in a catalogue does not invent a Burj Khalifa/Universal Studios URL.

**Visa Guides — rules and application routes**

- Parent/all: `/visa`; current country guides as published.
- Visa-free and arrival guidance: `/visa-free-countries`.
- Application Assistance: `/visa-assistance`. No provider in the menu label; the destination page continues explicitly naming eVisas and its private paid role.
- Group existing guides by region, with a separate compact preparation/assistance column. UK and Pakistan only enter this menu after their full published EN/BN records pass verification.
- Visa-free, visa on arrival, eVisa and advance applications are not interchangeable; do not label the complete visa collection Free VOA & eVisa once UK is added.

**Guides & Tools — existing planning support**

- Read: `/blog`, `/costs`.
- Tools: `/tools` and existing currency converter, trip estimator, packing and airport-code routes.
- Prepare/help: `/banking`, `/pre-departure`, `/resources`, `/glossary`, existing flight-disruption check if the panel remains legible.
- Long lists link to their current hub rather than filling the header with every article/tool. No rates, savings guarantees or dates embedded in menu descriptions.

### 5.3 Interaction and accessibility

- Native parent anchors retain their destination, with an adjacent disclosure button to open the panel. Opening a menu must not accidentally navigate.
- Click/keyboard opening is required; do not rely on hover. At most one mega menu is open.
- Escape closes and returns focus to the trigger; outside interaction and route changes close menus predictably.
- Use disclosure-region navigation semantics, visible focus, localized accessible names and correct `aria-expanded`/`aria-controls`. Do not apply application `menu` roles without their required behavior.
- All link names wrap; touch targets at least 44px where interaction is touch-driven. Preserve modifier clicks, open-in-new-tab behavior, browser Back, language choice, filters and fragments.
- On mobile/tablet, use a drawer with Home/About near the top and expandable groups in the same order. Do not squeeze desktop mega menus onto phones or duplicate Umrah in several primary groups.
- Consent controls and search/navigation dialogs must not obscure or trap one another. Fix stacking/focus/scroll containment without deleting consent or mounting partner tools before permission.

### 5.4 Footer

Preserve the current support band and responsive grid. Reorganize link wording/membership inside the existing structure into trip planning, Things to Do, guides/tools and URAL/trust/legal groups. No new giant footer and no changes to the existing support fulfillment promises.

Home/About/Partners/Contact, privacy and cookie controls, `/sitemap`, official sources and existing commercial entry routes remain reachable. Use the same labels/destinations as the header. Consumer footer link labels are service-led; provider identity remains adjacent to outbound commercial actions and on `/partners`.

## 6. Existing page roles — all URLs retained

| Existing surface | Primary reader job | Bounded change |
|---|---|---|
| `/destinations` | Choose a destination guide | Geographic grouping and complete current inventory; no provider grouping |
| `/destinations/<existing-id>` | Plan a trip/itinerary | Compact in-destination next-step panel; keep existing useful body and imagery |
| `/experiences` | Discover activity types/destinations and compare booking choices | Activity catalogue, clear filters and guide/partner next steps rather than another unverified bundle engine |
| `/experiences/asia`, `/experiences/europe` | Browse existing regional activity coverage | Same membership/source rules as parent, correctly scoped labels |
| `/attractions` | Find published individual attraction guides | Genuine guide directory with native links; no competing city-bundle/availability calculator |
| `/attractions/<existing-id>` | Understand one attraction/ticket decision | Descriptive metadata, essential decision guidance, verified/unknown conditions, sources, native related-guide links and honest partner actions |
| `/visa`, `/visa/<existing-id>` | Find/understand visa rules | Discovery future-proofing; no new country-rule bodies in this release |
| `/partners`, `/visa-assistance` | Understand providers and role split | Preserve actual relationship/disclosures; navigation labels may change, URLs and body scope do not |

Individual attraction details need a useful answer in saved HTML and React, not a word-count target. Their present evidence is insufficient for blanket instant-entry/queue-saving/accessibility claims: remove unsupported assertions on these touched surfaces or explicitly mark the necessary check. Substantive research beyond this bounded correction is deferred to an owner-approved content task, not filled from memory.

The destination next-step panel links only to available same-destination owners: entry rules, flight route/search, hotel area guide, cost guide and Things to Do selection. Missing guides stay absent or route to a clearly labelled general hub; never fall back to an unrelated country. London and future UK entry guidance remain distinct from UK-passport Saudi/Umrah articles.

## 7. Shared discovery data and future publication

Keep content in its established authoring files; do not migrate the whole CMS or copy all prices into a new master database. Introduce a small typed discovery/navigation adapter over existing published records and scoped display metadata.

Needed fields: canonical path, EN/BN label and subtitle, geographic region/country/city, content kind, published/locale availability, relevant existing guide relationships and optional activity type. Affiliate state and editorial publication are separate. A paused supplier does not erase a useful guide.

- Generate header, mobile and directory groups/counts from this adapter rather than three independent hardcoded lists.
- Match existing entities across experience rows and attraction guides where verified; do not invent equivalence between different ticket packages.
- Retain existing partner link helpers and evidence records. Metadata and H1 resolve from the same entity; no product-ID titles.
- Extend the existing lazy local site-search index, not a new remote search service. Test destination/visa/activity synonyms and EN/BN results. A missing future guide produces an honest relevant hub/no-result state, not the wrong-country article.
- Preserve existing image mappings. A newly published visa entry can use the existing generic visa image when no verified country asset exists; no blank card solely because a fixed mapping has not been extended.
- Negative controls must prove unpublished UK/Pakistan visa entries stay out of the header, search, card directory and public sitemap. Positive controls prove adding a complete published test record reaches all discovery surfaces without editing header layout.

Future content order remains UK visitor visa from Bangladesh first, then Pakistan visa guidance. Their exact slugs are chosen in their publication tasks and must not collide with a page added by the owner meanwhile. This no-URL-change design preserves all existing URLs; it does not prohibit separately approved genuinely new guides later.

## 8. Affiliate doorway protection and naming

### 8.1 Public language

Service/decision names lead navigation and editorial headings. Appropriate examples: Find flights, Compare hotel options, Explore activities, Check visa requirements and Application Assistance.

Provider names are **not removed globally**. The reader must know who receives their data/money and handles support before following a commercial action. In a compact provider/disclosure line or accessible link label, name eVisas, Klook, Tiqets or the actual supplier. `/partners` explains the network/brands; `/visa-assistance` explicitly explains eVisas.

Example presentation, not finalized copy:

```text
Visa application assistance
Optional help with documents and submission.
[Check assistance options]
Provided by eVisas · Private paid service · Affiliate link
```

```text
Compare activity ticket options
[Search current listings]
Opens Klook · Choose dates and ticket conditions on the partner site · Affiliate link
```

Do not relabel a generic provider homepage as a confirmed ticket, booked slot or live reservation. Exact product/destination search/generic chooser are three different handoff types and must be described accordingly. No affiliate label may imply URAL sells the partner product.

### 8.2 Preserve integrations

- `src/components/AffiliatePartners.tsx` remains the status/link registry, with normal resolution and approved fallbacks. Do not print private commissions, marker/project IDs or boost terms in consumer cards.
- Preserve the hosted flight Page 24232 at `flights.uraltravel.co.uk`, supported route/date/passenger/currency/locale handoffs, compatibility routes and existing project/account configuration. Do not restore an embedded engine or add fabricated timetables.
- Preserve all owner-supplied eVisas account/campaign URLs and the exact widget URL via `src/data/evisaProgram.ts`, including the existing Pakistan and UK entries recovered from upstream. Do not invent, rename or replace campaign IDs. An existing campaign string alone does not prove service coverage or attribution.
- Preserve the prominent homepage eVisas section and existing contextual placement map. No additional banner blast, no removal of the existing earning doorway and no editing supplied remote widget copy/artwork.
- The new navigation label Application Assistance changes only how the reader finds `/visa-assistance`, not what provider that page describes.
- For future Pakistan visa guidance, verify the passport/category service and the existing Pakistan campaign before a CTA. Any replacement/new campaign must come from the owner's dashboard; an explicitly labelled existing account chooser is a possible fallback, not a fabricated destination deep link. Preserve the current destination placement while checking it rather than declaring the campaign missing.
- Do not promote UK visitor visas through eVisas without verified service coverage. Existing research does not establish it. The official UK application path remains the visa action; related flights/stays/activity handoffs follow the reader's actual planning stage.
- Thailand's Bangladeshi-passport official-route qualification and conditional Morocco/residency qualifications remain. Site language is not passport nationality.
- All outbound affiliate anchors retain new-tab safe/sponsored attributes; disclosures remain readable. Direct partner links remain available without embed consent, while scripts/iframes remain centrally consent-gated.
- General hotel or activity links must not promise carried dates/guests. Verified deep-link helpers may preserve only the intent supported by the provider.
- Supplier fallback must still fit the labelled task. If a paused partner's configured fallback is an unrelated service, do not present that as the same offer: omit the specific action and retain a useful editorial/official next step. Do not change registry-wide fallback agreements without a separate approval.

### 8.3 Measurement

Audit the first-party classifier, consent behavior, pageview duplication and named GTM forwarding before judging the release commercially. Preserve the distinction between creator referrals and traveller bookings, sharing and desk contact, a contact attempt and a received enquiry.

Use stable first-party placement fields and supported partner SubIDs/campaigns; incoming UTMs are not automatically outgoing attribution. Verify Klook's supported paths separately from eVisas' supplied campaigns and other suppliers. Never append guessed parameters or passport/document data to analytics.

GTM publishing and authenticated GA4/partner dashboard verification require owner account access and explicit operational permission. Website code and URL observations alone do not establish report receipt. If access is unavailable, state that exact remaining task; do not claim earnings readiness or add a tracking bypass. Click counts are not bookings, approved commissions or payouts.

## 9. Named stabilization repairs and stopping boundary

### Include in the proposed release

1. Shared mega-menu/mobile/footer discovery, current-page state, keyboard/Back behavior and all-existing-URL preservation.
2. Published Pakistan coverage/source reconciliation and future complete visa-entry discovery without placeholders.
3. `/experiences` versus `/attractions` role separation and real native links to guide details.
4. Source/static/client alignment for touched catalogue content, counts, entity titles, sources and primary next actions.
5. Unknown-as-false facility bug, malformed Bengali on touched commercial panels, and unsupported universal booking/queue/instant-entry statements.
6. Remove or safely suppress undated/unsourced published money on touched catalogue surfaces and their stale local calculators. Preserve quote-based existing tools; do not build a replacement pricing engine. Any retained converted figure must use the dated/attributed rate contract.
7. Preserve and validate existing earning doorways, with truthful action labels, lifecycle behavior, consent and tracking coverage.
8. Targeted regressions and bounded browser/keyboard verification.

### Do not turn into a new improvement programme

Do not scan every paragraph into a new rewrite queue, rebuild the homepage, introduce city subroutes, replace the footer grid, fetch new testimonial/rating badges or revise article titles on thin GSC data. Further serious defects found during execution are reported with their exact scope; unrelated issues do not silently join this release.

### After the release

Freeze navigation architecture and visual styling once verified and accepted. Routine work becomes publishing complete guides, promotion, answering questions and reading outcome reports. Reopen design only for a reproducible defect or a new owner-approved capability that the existing structure cannot represent.

Keep a narrow maintenance exception: broken commercial links, security/privacy/accessibility regressions, visa/advisory changes and expired/misleading claims must still be corrected. No travel-information site can responsibly freeze visa facts forever. Use existing review ownership and intervals; do not create a recurring cosmetic audit calendar. Supplier-controlled live widgets remain a supplier-data risk, not something URAL may rewrite or guarantee.

## 10. Execution sequence and verification contract

The owner's preview-first instruction controls the sequence. **19 November resolution:** the local EN/BN desktop/mobile preview and its four-column destination revision were shown and explicitly approved, followed by native implementation authorization. The isolated branch implements navigation only; catalogue roles, article bodies and analytics repair still need separate work orders/owner scope approval. The sequence below is approval history and the remaining deployment contract; stages already satisfied must not be repeated.

1. **Store the plan:** commit and integrate this documentation batch into `main`, making it discoverable through the strategy index and handoff. For this documentation-only push use Cloudflare Pages' documented `[CF-Pages-Skip]` commit-message prefix. Do not invoke deployment hooks or alter build controls. Existing unrelated scheduled publication remains outside this task.
2. **Reconfirm the baseline:** snapshot existing URLs, partner destinations and key page captures from the latest approved source before making a preview. Preserve work added by other tools.
3. **Produce only the mega-menu preview:** a local/isolated non-production visual prototype showing the utility row, all four desktop panels, mobile groups, search/language/control placement and EN/BN text. Existing page links may illustrate destinations, but do not submit forms, mount partner widgets, initiate real affiliate bookings, or introduce public routes. Use a separate preview artifact outside the deployable `src/` and `public/` graph. Do not merge preview/UI changes to the production branch.
4. **STOP — visual approval:** show the preview to the owner and wait for explicit approval. Revisions remain bounded to that preview. Record approved captures/decisions in the plan. Do not begin the broader catalogue or public-navigation implementation before this gate.
5. **Plan and implement approved work:** use the bounded navigation plan for the shared navigation records, header/mobile/footer labels, existing search integration and regressions. Keep work isolated from production `main` until final release approval. The proposed catalogue-role, destination next-step and commercial trust repairs above remain a separate subproject; a screenshot approval does not authorize those edits.
6. **Verify:** check website analytics paths, complete or hand off authenticated GTM/GA4/dashboard checks, run the release suite and one batched browser inspection, fix observed defects in one batch and confirm. Present the implementation preview and the exact remaining limitations; do not loop through aesthetic variants.
7. **STOP — deployment approval:** obtain the owner's explicit approval of the verified implementation before any production UI merge/push or live deploy. Only then integrate/deploy the approved release and perform production checks. A main-branch code push can itself trigger Cloudflare deployment; it must not be used as a way around this gate.

### Required release proof

- `npm run lint`, `npm run build`, `npm run verify:build` exit 0; relevant existing flight/visa/hotel/consent/eVisas/tool-analytics/sitemap tests and added regressions pass. Build generation/scheduled content remains separate from permission to publish unrelated due posts.
- Every baseline existing canonical EN/BN path still exists and serves its intended page; no new redirects or broad hub fallbacks. Any scheduled additions are explicitly reconciled, not silently dropped or deployed under this task.
- Saved HTML and React have the same material guide/collection membership, entity title, source qualifications, localized link targets and primary commercial actions on touched surfaces.
- Home/About/search/language/help are visible and usable at 390, 768 and 1280px in both locales; 320px stress test for the header/drawer/consent stack. No horizontal overflow, inaccessible menu links, hover-only operation or obscured primary controls.
- Keyboard Escape/focus restoration/Tab, native modified clicks, browser Back, locale switching, query filters and fragments work. Unknown routes remain genuine 404s.
- Positive/negative discovery controls for future published/unpublished UK/Pakistan visa records and missing-image fallback pass.
- Counts reflect actual published records or are omitted. No false live availability, fabricated prices/rates, unverified-as-negative facility labels, public private deal terms or duplicate content-only commercial surfaces.
- Affiliate pause/fallback/expiry and consent-grant/withdrawal behavior are tested; direct links remain. Exact existing hosted/eVisas destinations and supported attribution fields are unchanged unless a separately approved new campaign is supplied.
- Each intended consented website action produces one correctly named event with the intended scope; internal navigation does not become an affiliate exit. Authenticated report evidence is recorded separately or marked unavailable.
- Preserve the existing performance/font budgets. No new eagerly loaded catalogue/search/partner library, no benchmark claim without a measured run.

### Planning checklist

- [x] Owner's intent, selected approach, no-URL-change rule and incumbent brand recorded.
- [x] Existing Pakistan/new visa integration and affiliate-role boundaries specified.
- [x] Named defects, bounded scope, maintenance exceptions and release gates specified.
- [x] Independent builder check: the reviewer reported "nothing important left" on 19 November 2026. This is a design-clarity check, not implementation or factual certification.
- [x] Owner authorized documentation commit/merge/push; upstream Pakistan/source absence reconciled on 19 November 2026.
- [x] Non-production mega-menu preview shown in EN/BN, desktop and mobile.
- [x] Owner's explicit visual-preview approval recorded, including the revised four-column order.
- [x] Bounded navigation plan written after preview approval; owner authorized native execution.
- [x] Navigation implemented on an isolated local branch; independent whole-branch review performed and both material findings fixed with passing regressions.
- [ ] Owner's final deployment approval recorded after implementation verification.
- [ ] Production integration, deployment and production acceptance — pending separate approval.

## 11. What is left to the builder

Exact component extraction and typed adapter location, responsive panel widths, column distribution, localized short labels, regression implementation and minor spacing within the existing tokens are builder decisions. Reuse the present framework and components; do not ask the owner to choose CSS values.

What a builder must not guess: the current approved deployment/source baseline; an unpublished visa slug; a new eVisas campaign/product ID; partner service coverage, dashboard receipt or commission; the owner's visual/deployment approval; permission to change URLs, deploy account settings, rewrite unrelated bodies or publish scheduled new posts.

**Next action:** follow the [implementation handoff](../../handoff/2026-11-19-approved-navigation-implementation.md)
to close verification and request separate deployment approval. All existing URLs remain protected.
The local implementation evidence does not certify site-wide repairs or a production deployment.
