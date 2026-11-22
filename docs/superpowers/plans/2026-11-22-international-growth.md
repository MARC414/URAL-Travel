# URAL International Expansion — Traffic and First-Revenue Plan

> **For agentic workers:** REQUIRED SUB-SKILL: `executing-plans`, or `subagent-driven-development` when selected by the owner. This is a bounded evidence/content/distribution workflow, not permission to publish every candidate.

**Goal:** turn one useful travel decision journey into qualified visits and attributable commercial outcomes, then expand only what the evidence supports.
**Architecture:** audit existing assets first; choose one journey, approve its exact URL/claim/link/partner brief, author complete EN/BN output and distribute it. Optional UK departure hub reuses verified assets, not rewritten Bangladesh guides.
**Tech Stack:** existing content sources, React/static renderers, affiliate registry, consented GA4/GTM events, partner dashboards, approved owned/social channels. No new platform or paid tool required.
**Spec:** [Corrected design](../specs/2026-11-22-international-expansion-design.md), sections 3/8–11; [master](2026-11-22-international-expansion-master.md).

## Global Constraints
- Read the master content guide, article standard, publication standard and `content/blog/README.md` before any asset audit/write/repurpose.
- Research/draft is not publication. Exact pilot, `/uk`, newsletter sending, posting, outreach, account settings and new agreements have separate gates.
- Use official eligibility sources and verified supplier coverage; passport, residence and departure are separate.
- Preserve existing URLs and good content; no bulk title rewrites, mass destination/passport pages or unsupported market forecasts.
- Content minimums: body, >=3 primary references, >=4 curated links (>=2 blog-to-blog and >=1 hub/money), one relevant commercial action or explicit justified omission, full EN/BN decision parity, built/browser proof.
- New articles require >=2 relevant existing editorial inbound links in both languages in the same authorised release. Check actual category filters and scheduling rules.
- Every published money figure needs source/date; no guessed fees, commission basis, legal entitlement, prices or personal experience.
- Scripts/widgets consent-gated; direct affiliate anchors use existing registry/campaign helpers and safe sponsored attributes.
- Changes to shared code remain serial; qualified click, enquiry, approved commission and payout remain separate metrics.

## Review Focus
1. New article duplicates an existing owner or a dated URL is renamed: G01/G03.
2. An arrival-country campaign is mistaken for an outbound/passport opportunity: G03/G04.
3. BN exists in metadata but lacks full facts, links or commercial action: G04/G05.
4. Partner chooser is labelled exact product/live quote; messages shared without consent: G04/G06.
5. Sparse reports produce premature pivot or click-based earnings claim: G07/G08.

---

## File map

- `docs/02-content/2026-11-22-international-asset-register.md`: existing route, audience, primary job, source freshness, locale readiness and current publication evidence.
- `docs/growth/2026-11-22-international-pilot-selection.md`: one ranked selection, hypotheses and owner capacity/channel choices.
- `docs/02-content/2026-11-22-international-pilot-brief.md`: exact approved asset path, claims, sources, layout, links, CTA and source file ownership.
- `docs/03-social/2026-11-22-international-pilot-distribution.md`: adaptation drafts, permissions and observed sending/outreach records.
- Existing `docs/growth/2026-11-22-international-scorecard.md`: outcomes; create in R06, reuse, do not create competing dashboards.
- Legacy articles: body `src/data/blogContent.ts`, EN metadata `src/constants.ts`, BN override `src/data/bengaliContent.ts`.
- Scheduled articles: `content/blog/<existing-or-approved-slug>.md`; generated TS is output, never hand-edited.
- Optional hub: F01 `departureHubs.ts`/`DepartureHub.tsx`, App/prerender/SEO/discovery; no second hub framework.
- Targeted regression script chosen in G03, plus `scripts/verify-build.ts` and existing scheduling/category/CTA checks.

## G01 — Existing-asset inventory and source triage

**Files:** create asset register; read all three legacy fields or scheduled source, saved HTML and real browser for each selected asset. No editorial changes in this task.
**Produces:** READY_TO_PROMOTE / NEEDS_FACT_REVIEW / NEEDS_RENDER_FIX / DRAFT / UNKNOWN_DEPLOYMENT per asset, with evidence.

- [ ] Inventory actual UK/international and relevant Bangladesh URLs from fresh R02 build and production evidence. Do not assume "seven finished posts" or unpublished status from Markdown alone.
- [ ] Start with known source candidates: UK Umrah pillar, UK operator/ATOL checks, UK-passport Saudi pathways, UK–Saudi flights, Madinah-first routing, Ramadan and Hajj UK planning. Preserve existing dated slugs. Also inspect an existing eligible visa/assistance path and an in-destination logistics or disruption owner if relevant.
- [ ] For each record passport/residence/departure, reader decision, primary sources/check dates, prices/fees basis, curated inbound/outbound links, CTA eligibility, category, EN/BN parity, source vs saved/live body and publication status. Government policy, schedule, rail fare and supplier quote have different freshness requirements.
- [ ] Reopen volatile sources; unresolved claims stay flagged. A quoted flight snapshot cannot establish a current direct-service schedule; agency prose cannot prove UK261/ATOL or visa eligibility.
- [ ] Review the register for one useful complete journey and record limited approved facts. Pass: no recommended asset is called ready from a one-file grep or old source-check date. No changes/publication yet.

## G02 — Choose one value-creation and monetisation journey

**Files:** create pilot-selection doc; consume G01 register, R04 programme evidence, R06 current/historical search rows, actual reader questions (anonymised).
**Produces:** selected one reader job plus main asset and two distribution adaptations; no forced country expansion.

- [ ] Compare three bounded candidates: (a) existing UK DIY Umrah preparation/arrival decision, (b) one verified entry/application decision for a specified passport/residence, (c) one useful destination logistics/disruption decision. Score usefulness, evidence completeness, existing assets, genuine commercial fit, distribution access and maintenance effort; mark unmeasured demand honestly.
- [ ] For each choose existing owner or proposed genuinely new job; record the information it adds beyond official/top-result summaries (e.g. a usable decision checklist or supported comparison). If no extra value exists, improve/link/distribute the existing owner instead of duplicating it.
- [ ] Select one journey and disclose why. Do not infer eVisas revenue for British Turkey tourism or substitute UK ETA for UK outbound visas. Decline unverified partners rather than filling a quota of revenue streams.
- [ ] With owner, record available time, approved channels and contact/access constraints. Default work is a landing asset + two useful adaptations, not all-platform daily posting, ads or a huge calendar.
- [ ] Obtain approval for exact research/draft scope. Publishing/sending approval can follow review. Pass: a tool can name the reader, decision, owning URL, next action and permitted channels without guessing.

## G03 — Evidence ledger and executable content brief

**Files:** create pilot brief; no application changes. If a new slug is proposed, check canonical inventory, source and keyword map first.
**Interface between tasks (brief fields):** `assetPath`, `sourceFiles`, `audience`, `readerDecision`, `verdict: UPDATE | SECTION | LINK | NEW`, `claimLedger`, `sectionFormats`, `references`, `internalLinksEn`, `internalLinksBn`, `inboundSourcePaths`, `affiliateAction`, `category`, `maintenanceOwner`, `reviewInterval`, `testScript`, `approvedChangedPaths`, `approvedAddedPaths`.

- [ ] Write dated claim ledger: exact claim, responsible source, scope/exception, official fee versus supplier quote, checked date, supported statement and unresolved gap. Include >=3 useful primary sources, not padding.
- [ ] Set the exact canonical owner and sourceFiles. New source uses current scheduled Markdown contract; legacy owner uses body + EN metadata + BN override. Keep every existing slug, even with a year.
- [ ] Specify answer-first structure by decision, applicable conditions, practical checklist/comparison, official alternative and at most one genuinely fitting primary commercial action. Use actual supported render formats, not invented article components.
- [ ] Pin explicit >=4 links in each locale and >=2 relevant editorial inbound source paths for a new page, plus a reachable hub. Set existing grouped category or approve matching EN/BN filter addition. Define money/source/date tests, wrong-passport negative control, CTA scope and parity check in `testScript`.
- [ ] Record maintenance owner/review interval and obtain owner approval of exact scope, claim ledger, additions and changed paths. Unresolved eligibility/fees cannot be waved through; omit unsupported assertions. No automatic metadata rewrite from small GSC counts.

## G04 — Implement one complete EN/BN landing asset and handoff

**Files:** only G03's exact sourceFiles and inbound link arrays, named testScript, category filter if approved; preserve renderer/registry. Shared renderer change is separately scoped unless needed by a named failing test.
**Consumes:** complete G03 brief and R04 VERIFIED/CONDITIONAL partner evidence. **Produces:** one verified local content release, not live publication.

- [ ] Write failing tests pinned to brief: actual canonical path, title/H1, source count/destinations, editorial link destinations and expected CTA/exemption; no paid application requirement for an exempt passport; no undated money; EN/BN same material qualifications and actions.
- [ ] Run the exact `npx tsx <testScript>` from the brief; observe the targeted missing section/record/action failure.
- [ ] Draft/update the approved source and natural Bengali counterpart, complete metadata/date/source fields, matched sections/formats, category, explicit editorial links and relevant inbound links. Edit scheduled Markdown then regenerate; never generated TS manually. No fabricated firsthand claims or guaranteed outcomes.
- [ ] Resolve commercial action through existing registry or `evisasDestinationUrl`/`resolveBlogAffiliateUrl`; name provider/private paid role and official cheaper alternative where relevant. Paused/unsupported service is absent or honestly conditional. Generic hotel/activity handoff cannot promise preserved dates/guests or a specific booking.
- [ ] Run named tests, `npm run test:scheduling`, lint, build, verify:build; inspect saved and running EN/BN pages and actual next-action target without buying/submitting. Compare approved addition/change manifest against R02. Meet the full six article gates, not just test counts.
- [ ] Present asset/links/source evidence for publication permission. Release through F10's scoped procedure; this pilot need not wait for `/uk` or every foundation task if its approved release is independent. Record actual production URL/revision/date and do not deploy unrelated due content.

## G05 — Optional UK departure hub, built from verified existing content

**Gate:** explicit `/uk` + `/bn/uk` approval and G01 verified membership. This is not inbound UK visa publication permission.
**Files:** extend F01 hub record/component reuse; App/prerender/SEO, `pageLocale.ts`, discovery/search/nav and hub/locale tests. No new framework or unverified general UK visa body.

- [ ] Approve a record with `path="/uk"`, EN/BN H1 meaning "Travel from the UK", qualification that nationality/residence matter, and verified sections: UK Umrah orientation, travel logistics, protection/entry checks. If useful sections are not source-ready, wait rather than publish an empty generic portal.
- [ ] Add failing hub/static/discovery tests: two real routes, UK EN profile `en-GB/en_GB`, BN `bn-BD/bn_BD`, reciprocal own pair + x-default English hub, no cross-hub alternates; every article link exists and has a real localized target. Missing/draft articles absent; inbound UK ETA link is labelled "Visiting the UK" if included.
- [ ] Implement small UK record and both locale routes through F01/F02/F07 contracts. Do not reuse London as a UK-departure article merely because it is a UK destination. Avoid unsupported prices/statistics or assuming all UK residents have British passports.
- [ ] Add published hub links to homepage, Guides & Tools and footer only after route readiness; preserve primary menu structure. Integrate source-backed relevant article backlinks where separately in scope. No fake airport schedule or package seller role.
- [ ] Run hub/locale/flight/search/navigation tests and lint/build/verify:build; perform F09 representative browser/static checks and R02 preservation comparison with exactly two approved UK paths plus any separately approved content. Obtain F10 publication/deployment approval.

## G06 — Distribution and earned links in bounded units

**Files:** create distribution doc; read current social source gates/register and approved landing asset. No sending/posting by default.

- [ ] Prepare one searchable/shareable main asset and two channel-appropriate adaptations: a concise decision checklist/visual outline and a short answer/script. Each repeats the asset's qualifications, official sources, checked date and supported next step. Do not commission new graphics/video tools simply to execute the plan.
- [ ] Prepare one newsletter draft using the real existing double opt-in list. Confirm audience fit and permissions; do not buy contacts, add scraped readers or auto-send a sequence. Record one idea and one useful link, not exaggerated savings.
- [ ] Prepare a small outreach batch (default five relevant publishers/community resource maintainers, for owner review): specific useful asset, actual resource gap and personalised helpful pitch. No paid-link schemes, fabricated affiliations or mass unsolicited posting.
- [ ] Check destinations, disclosure, applicable eligibility and incoming UTM naming. UTMs are campaign/source measurement, not automatic partner attribution. Do not append invented campaign/SubID fields or reader passport/document data.
- [ ] Obtain explicit send/post/outreach approval and any community permission. Execute only that batch, recording real date/URL/status and replies; draft copy does not count as impressions, traffic or earned links. If account/tool access is absent, deliver ready-to-send drafts.

## G07 — Measure traffic and real revenue separately

**Files:** update R06 scorecard and execution record; use authenticated summaries only with permission.

- [ ] Check technical/live landing health immediately after release. At weekly reader review record actual questions, link failures and missing answers, not guessed engagement.
- [ ] At +30/+60/+90 comparable windows, export actual GSC property/page/query/country/device data; compare UK, Bangladesh and other markets separately and in absolute counts, not only changing shares. Sparse counts remain inconclusive.
- [ ] Record consented sessions, qualified provider clicks/placements, confirmed enquiries, provider transactions where exposed, approved commission and payouts. Do not manufacture an eVisas conversion callback or count WhatsApp share as enquiry.
- [ ] Where terms/reporting allow, calculate approved commission per qualified partner click and per comparable session from actual denominators; retain correct commission basis/currency/source/date. Account evidence and payout can lag bookings; describe that lag rather than promising cash immediately.
- [ ] Identify funnel drop-off: no qualified visits -> improve approved distribution; visits/no partner actions -> inspect answer-to-action fit; clicks/no reported transactions -> verify eligibility/handoff/attribution; approved commission/no payout -> check programme thresholds/timing. Mark absence of evidence, not automatic failure.

## G08 — Maintain, repair or expand, without restarting the strategy

**Files:** scorecard, asset register, scoped next brief; durable docs/history only for actual landed work.

- [ ] Classify observed outcome: technical defect, changed official rule, useful but insufficient sample, wrong journey fit, or repeatable qualified outcome. Fix urgent factual/security/broken-link issues promptly under authorised scope.
- [ ] Select one next action with evidence: maintain current asset, a focused section/link/handoff repair, another distribution batch, or one adjacent reader decision. Do not use a quiet month to erase Bangladesh or add dozens of generic international pages.
- [ ] Propose any new commercial stream separately: operator referrals/paid advice require explicit contract/consent/business-role approval; paid ads need measured unit economics and permitted programme traffic; products, sponsorship and display ads need their own demand/maintenance case. They are not prerequisites for the first affiliate outcome.
- [ ] Update maintenance dates only after substantive checks; preserve supplier quote dates and old slugs. Archive executed plans with measured release results, and leave unfinished dependencies visibly pending.
- [ ] Obtain owner approval for the next bounded task. Keep the international direction and finite navigation architecture stable unless a concrete defect or approved capability requires change.
