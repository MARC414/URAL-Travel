# URAL International Expansion — Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: `executing-plans`, or `subagent-driven-development` only when selected by the owner. Follow the master and its approval gates; checkbox completion is evidence, not permission.

**Goal:** establish an accurate source, route, build and commercial baseline before changing the site's presentation.
**Architecture:** capture public-only artefacts from a fresh isolated build; add a deterministic preservation check; verify consented event behaviour separately from authenticated partner reports.
**Tech Stack:** existing tsx/node:assert, happy-dom, fast-xml-parser, React SSR, Cloudflare build tooling.
**Spec:** [Corrected design](../specs/2026-11-22-international-expansion-design.md), sections 3/8–11; [master](2026-11-22-international-expansion-master.md).

## Global Constraints
- Master invariants apply verbatim: no existing URL changes, no unapproved publication or broad repairs, no private data in evidence.
- Baselines must name source revision, capture time and actual property/filter. Stale `dist/` is not production.
- No hardcoded expected URL/check count or assumption of finished/unpublished articles.
- Use `package.json` commands as they exist at execution; builds generate due posts and may alter generated modules.
- Tests and future commits cover only the assigned task; do not add `dist/` or use broad `git add .`.

## Review Focus
1. Local source/deployment mismatch or concurrent work: R01/R02.
2. Date-driven posts join a release silently: R03.
3. Paused partner/unsupported nationality appears eligible: R04.
4. Double clicks/pageviews, sharing misclassified as contact, denied consent leaks: R05.
5. Missing account data is recorded as zero or click revenue: R06.

---

## File map and evidence ownership

- `docs/handoff/2026-11-22-international-expansion-execution.md`: task state and approval/evidence summaries.
- `scripts/fixtures/international-route-baseline.json`: public-only build snapshot, source revision and route checks; create only from a freshly reconciled baseline.
- `scripts/routePreservation.ts`: pure comparison contract; no network or build side effects on import.
- `scripts/test-route-preservation.ts`: negative/positive controls for that comparison.
- `scripts/capture-route-baseline.ts`: explicit CLI to capture dist; never auto-overwrite the committed fixture.
- `docs/04-monetization/2026-11-22-international-programme-evidence.md`: eligibility/terms/routing evidence, not secrets.
- `scripts/test-affiliate-journey.ts`: mounted click classification and consent regression.
- `docs/growth/2026-11-22-international-scorecard.md`: public summary fields, hypotheses and unverified account checks.

## R01 — Approval, baseline and integration decisions

**Files:** create the execution record; read the master, spec, git status, `PRODUCT.md`, `DESIGN.md`, `package.json` and the approved 19 November navigation plan.
**Consumes:** owner approval. **Produces:** source/deployment/worktree identifiers and the allowed file list for the next task.

- [ ] Record design/base-scope approval separately from execution, navigation integration and deployment approval.
- [ ] Inspect HEAD, working changes and deployment evidence. Preserve other contributors' modified docs and owner images; no checkout/reset/stash.
- [ ] Select isolated implementation workspace using the applicable worktree workflow. Move the session only if that is its primary workspace.
- [ ] Check whether the approved `src/data/navigation.ts`/header implementation exists. If absent, mark F08's header integration BLOCKED; obtain the owner's choice to execute the separate navigation plan or explicitly allow a bounded current-header addition. Do not build another navigation model.
- [ ] Record stage/capture time and next task. Pass: a new agent can identify authorised source and files without guessing. Stop if source or scope is unresolved.

## R02 — Fresh URL/content baseline and preservation test

**Files:** create the three scripts and fixture in the file map; modify `package.json`/CI only to add `test:route-preservation`.
**Interfaces:** `RouteSnapshot = { path: string; canonical: string; title: string; h1: string; bodySha256: string }`;
`RouteBaseline = { sourceRevision: string; capturedAt: string; routes: RouteSnapshot[] }`;
`assertRoutePreservation(before: RouteBaseline, after: RouteBaseline, allowedAddedPaths: readonly string[], allowedChangedPaths: readonly string[]): void`.
The hash covers the main article/page body excluding shared nav/footer and volatile scripts; freeze that extraction in the capture script and its fixtures.

- [ ] Write failing tests: removing an old path, canonical changing, duplicate paths, unexpected additions and unapproved title/H1/body changes throw; an approved homepage change and two explicitly allowed new paths pass. Include `/bn/` versus `/bn` canonical handling.
- [ ] Run `npx tsx scripts/test-route-preservation.ts`; expect missing implementation failure, not a broken test fixture.
- [ ] Implement the pure comparison and CLI `npx tsx scripts/capture-route-baseline.ts --dist dist --revision <actual-revision> --output <explicit-file>`. Capture title/H1/canonical and parsed sitemap routes; a missing file fails, never becomes an empty baseline.
- [ ] After R03 reconciles baseline build/scheduling, run the CLI to the fixture once; subsequent comparisons write a separate temporary file. Also capture live canonical inventory, deployment revision if available, and public page headers to the execution evidence. Explain any source/live difference rather than treating the sets as equal.
- [ ] Run `npm run test:route-preservation` and check the fixture against fresh dist. Record pass evidence and review the exact diff. Checkpoint only these files if commits are authorised.

R02's pure test work can precede R03; its final baseline capture follows R03. Do not use an unverified historical URL count.

## R03 — Build failures and scheduled-publication boundaries

**Files:** read `scripts/generate-scheduled-blogs.ts`, `scripts/scheduledPosts.ts`, `content/blog/*.md`, generated modules, `scripts/verify-build.ts`; update execution record only unless a specific repair is authorised.
**Produces:** reconciled build logs and a release addition manifest: existing/approved due/unapproved due/draft.

- [ ] In isolation run `npm run scheduled:check`, `npm run lint`, `npm run build`, then `npm run verify:build` as separate commands. Record actual exit codes, time and generated diff; no projected check counts.
- [ ] For every failure record reproducible condition, affected route/symbol and whether it existed before this change. Do not lower counts, delete assertions or invent missing content to pass.
- [ ] For every generated new post record source status/date, both locale readiness, route membership and owner publication approval. A due date or generated file is not release permission; verify production before calling a post unpublished.
- [ ] Request a narrowly scoped repair task for a blocking defect; test it red/green separately. Do not fix unrelated catalogue/content issues under readiness.
- [ ] Re-run failed commands after approved repairs; finish R02 capture only from the reconciled baseline. Stop release if due but unapproved posts cannot be cleanly separated without changing their publication contract.

## R04 — Programme evidence, not assumed eligibility

**Files:** create programme-evidence doc; read `src/data/evisaProgram.ts`, `src/components/AffiliatePartners.tsx`, `docs/04-monetization/EVISAS.md`, `FLIGHT-WHITE-LABEL.md`.
**Produces:** one evidence row per proposed handoff, with status VERIFIED / CONDITIONAL / UNVERIFIED / NOT_APPLICABLE.

- [ ] Record provider, exact existing supplied URL, destination, passport class, residence conditions, paid role, official alternative, checked date/source and supported attribution field. Record commission basis/payout rules only from the owner's current terms; keep private rates out of public UI.
- [ ] Verify link routing without application/payment submission. Check government eligibility separately; a provider catalogue or campaign is not government authority. Preserve all supplied URLs and IDs.
- [ ] Include explicit controls: `sid=uk` inbound UK ETA versus UK outbound travel; Bangladesh passport excluded from the observed Thailand intermediary list; Morocco residency conditions; no service required for a verified visa exemption.
- [ ] Check pause/expiry/fallback and whether a fallback still fits the task. Unverified or unsuitable action stays unpromoted; direct official/helpful links remain.
- [ ] Ask owner to verify account-level attribution and current terms where access is absent. Pass: every pilot action has a qualified documented disposition; UNVERIFIED blocks that action, not unrelated homepage work.

## R05 — Consent, classification and report receipt

**Files:** create `scripts/test-affiliate-journey.ts`; modify `src/utils/analytics.ts` only for reproduced defects and add purpose attributes to existing WhatsApp anchors in `src/App.tsx`, `src/routes/BlogPostRouteView.tsx`, `src/components/WhatsAppSupport.tsx`, `src/components/InteractiveTools.tsx`; read `src/utils/consent.ts`, `toolAnalytics.ts`; wire `test:affiliate-journey` in package/CI. Anchor tagging is bounded markup, not article/support-copy rewriting. Authentication is an owner operation, not a code patch.
**Consumes:** existing `pushDataLayerEvent`, `initGlobalClickTracking`, `trackAffiliateClick`, `trackWhatsAppInquiry`.
**Produces:** evidence for `affiliate_partner_click`, `travelpayouts_referral_click`, `virtual_page_view`, and distinct help/share semantics.

- [ ] Write tests with happy-dom: one sponsored eVisas click -> one partner event/placement; ordinary internal `/bangladesh` and article links -> zero partner exits; creator referral -> its own event; unset/denied/marketing-only consent -> zero analytics; granted analytics -> allowed event.
- [ ] Add help/share discriminator tests. Shared WhatsApp data attribute: `data-whatsapp-purpose="contact" | "share"`; App desk/contact anchors, support quick-contact anchors, inquiry action and blog desk anchors produce `contact`; the blog's recipient-free share action produces `share`. Emit `whatsapp_click` with `whatsapp_purpose` (`unknown` if absent), never log the `text` query/freeform note. `whatsapp_inquiry` is an attempt, not confirmed delivery. Test actual rendered support/contact and article-share anchors, plus source coverage of the four named owners, not only synthetic fixtures; contact/share emit once each with no message/PII fields.
- [ ] Run `npx tsx scripts/test-affiliate-journey.ts` and `npm run test:tool-analytics`; prove the targeted failure before implementing only the corresponding change. Audit touched anchors for duplicate explicit/delegated emission.
- [ ] Re-run those tests plus `npm run test:answer-desk` and `npm run test:sharing-citations`. Audit pageview paths for double emission; request a separate bounded fix if found outside this task.
- [ ] Owner operation: verify current GTM forwarding and GA4 DebugView receipt under granted consent. Record container/version and fields or UNVERIFIED. No publishing GTM/account changes without separate permission; a string in the bundle is not receipt proof.

## R06 — Comparable search and commercial scorecard

**Files:** create the scorecard; consume the historical corrected GSC evidence and owner exports/account summaries. No mandatory paid analytics service.

- [ ] Record GSC property, actual date window, country, device, page and query filters. Keep retired pages.dev separate. Without a current export, mark current baseline unavailable and preserve hypotheses rather than choosing title rewrites.
- [ ] Define stages: page/session, qualified partner click, desk attempt, confirmed reader enquiry, partner transaction if exposed, approved commission, payout. Missing provider stages stay unknown, not zero or inferred from clicks.
- [ ] Record supported source/placement attribution; no invented query parameters or assumed cross-domain identity. Summarise consent-related undercounting and pending GA4/provider checks.
- [ ] Define outcome review dates relative to actual release: +30/+60/+90 days, with weekly reader feedback. Small samples do not impose position/CTR/income pass thresholds.
- [ ] Pass: scorecard can distinguish technical readiness from observed outcomes; identify ready tasks and pending owner/account gates in the execution record. Review and checkpoint documents only if authorised.
