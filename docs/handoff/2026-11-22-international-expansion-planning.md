# Handoff — International expansion planning — 22 November 2026

**Goal:** fulfil the owner's request for an organised, small-unit plan that other AI tools can follow
to shift URAL international-facing while preserving Bangladesh usefulness and existing URLs.

**Branch:** `main`, observed HEAD `0e83b10`. **Uncommitted:** yes, documentation only for this task.
Other modified navigation documents and untracked owner images pre-existed this task; do not stage,
overwrite or remove them. No commit, push, build, publication or deployment was performed here.

## State

- Written: corrected international design, master checklist, readiness, foundation and growth plans.
- Withdrawn: the two earlier 22 November drafts, preserved in `docs/history/2026-11-international-planning/`
  with loud historical banners and compatibility pointers at their original locations.
- Discoverable: a proposed-plan section was added to the strategy index without replacing current product commitments.
- Documentation checks: 15 local Markdown links in the initial plan set resolved; 24 task sections and
  146 unchecked task/checklist steps were counted; `git diff --check` exited 0. These are document checks,
  not application test results. Recheck after subsequent edits.
- Fresh builder clarity review returned three wiring gaps; all were incorporated into the proposal:
  bilingual homepage FAQ source/visible/schema ownership (F03), actual WhatsApp contact/share marker
  producers (R05), and explicit unselected destination on scoped Bangladesh search (F06). The master
  records that feedback. This is not application verification or owner approval.
- Not started: R01–R06, F01–F10, G01–G08 application/content/account/distribution tasks.
- Not approved: detailed design/base scope, execution method, optional UK hub, content pilots,
  outbound communications, account changes, production release.

## Files touched

- `docs/superpowers/specs/2026-11-22-international-expansion-design.md` — corrected design, explicit
  proposal defaults, truthful SEO/eligibility interpretation and preserved constraints.
- `docs/superpowers/plans/2026-11-22-international-expansion-master.md` — single starting point,
  24-task checklist, dependency phases, approvals and reusable instruction for other tools.
- `docs/superpowers/plans/2026-11-22-international-readiness.md` — R01–R06 baseline/URL/build,
  programme evidence, consented tracking and actual outcome reporting.
- `docs/superpowers/plans/2026-11-22-international-foundation.md` — F01–F10 bilingual hub,
  homepage, nullable airports, currency, per-page locale/discovery and controlled release.
- `docs/superpowers/plans/2026-11-22-international-growth.md` — G01–G08 one evidence-led
  pilot, optional UK departure hub, limited distribution, outcome-based expansion.
- Old draft paths/history copies — prevent previous incorrect instructions being executed.
- `00-URAL-STRATEGY-INDEX.md` — additive proposal pointer only. Preserve its pre-existing navigation update.

Read, not changed: `PRODUCT.md`, `AGENTS.md`, `src/App.tsx`, `scripts/prerender.ts`, locale/SEO/flight/rates/
analytics modules, article source/acceptance contracts and approved navigation plan. No source code,
public assets, generated content, schema defaults or campaign configuration changed in this task.

## Decisions and why

- International-facing rather than UK-only: owner clarified this direction; UK remains a focused
  expansion, while Bangladesh material retains its distinct audience and value.
- Proposed base: `/` + `/bn/` equivalent international homes and `/bangladesh` + `/bn/bangladesh`
  equivalent departure hubs. Bengali homepage changes and the new BN hub are explicit approval choices.
- Hubs are not forced regional alternates of each other. Each has its own genuine translated pair,
  self-canonical and normal cross-links.
- Homepage selection is explicit, not detected: null airports, USD pending selected origin/manual
  currency; mapped UK origins -> GBP, Bangladesh -> BDT. Existing deep-route intent remains.
- Keep correct existing hero H1/brand; fix exclusive subtitle, feature/crawl copy and unsupported
  statistics. Do not perform another whole-site visual redesign.
- Readiness/distribution drafting need not wait for `/uk`; code edits to shared files remain serial.
- Add hub links inside the established Guides & Tools structure, not an eighth primary item. The
  approved navigation implementation is absent in this checkout and requires R01 reconciliation.

## Dead ends — do not repeat

- Ten-day GSC zero clicks do not prove bad snippets; the source document explicitly withdrew that verdict.
- A UK ccTLD is not neutralised by `en`, schema or x-default; HTML lang is not Google's language detector.
- UK eVisas `sid=uk` was observed to lead to inbound UK ETA assistance, not British outbound visas.
- British citizen Turkey tourism was visa-exempt under checked official conditions; do not sell an unnecessary visa.
- Empty string in the existing main flight widget becomes its first airport; a prop-only blanking change is insufficient.
- Rates endpoint does not detect geography. Fixed FX and Western-budget substitutions are not allowed.
- `dist/` was stale during prior review; claimed 286/290 URLs, five failures or 513 passes were not current verified baselines.
- New EN routes do not magically acquire complete Bengali content. No fake `/bn/` target is permitted.
- A PowerShell-to-Node diagnostic converted an em dash in a string literal into `?` through the pipe;
  the Markdown file itself was intact. Use ASCII regexes or Unicode escapes in these diagnostic
  commands rather than changing correct documentation to satisfy a corrupted test literal.

## Next step

Ask the owner to review the corrected master/spec and approve Gate A's proposed base scope. After
that, record execution choice and start R01 only. The execution record named by the master is created
then; this file is the planning handoff, not proof that R01 or any application task is complete.

## Open questions / gates

- Owner: base scope including both home languages/new hub pair and explicit currency/search behaviour.
- Owner: native execution or independently reviewed delegated execution; separate header-plan integration.
- Owner: optional `/uk` pair, precise pilot URL/provider action, permitted communications and deployment.
- Account holder: current GTM/GA4 receipt, provider eligibility/terms/attribution evidence where unavailable.

## Getting back to work

Read the master and companion for the assigned ID, then check source/worktree/approval before edits.
Do not run generation/builds in the shared workspace just to read this plan. After execution is
approved and isolated, the existing commands include:

```powershell
git status --short
npm run scheduled:check
npm run lint
npm run build
npm run verify:build
```

New `test:*` commands in the plans are proposed outputs of their tasks, not commands that exist today.
No document promises accuracy, ranking or revenue without the stated source, test and report evidence.

## Later update — review-only discovery instructions, 22 November 2026

The owner asked where other tools can find the documents and clarified: **"Your task is to review."**
Added `URAL-INTERNATIONAL-PLAN-REVIEW-INSTRUCTIONS.md` at the repository root, and linked it from
`AGENTS.md` and the strategy index. The earlier "AGENTS.md read, not changed" description above is
the initial planning snapshot; this later change adds a review-discovery pointer only, not a product
direction rewrite. Existing implementation/publication gates remain unchanged.

Availability rechecked: the corrected master/design/handoff were untracked; HEAD was `0e83b10`.
This session has not committed or pushed these documents. Tools in the same local workspace can
read them; remote clones need the owner to supply files or separately authorise documentation sharing.

The subsequent plan review identified **two medium-priority, unresolved refinements**:
1. An explicit approved release-manifest file/schema and preservation-check lifecycle (R02/R03/F09/F10).
2. Acquisition source/UTM acceptance tests beyond event receipt (R05/R06/G06/G07).

The source probe showed canonical URL in SPA `page_location` and campaign query in `page_path`;
it did not establish broken live GTM/initial-session attribution. No code or plan corrections were
implemented during that review. The new reviewer instruction carries both findings forward.

**Next action:** another tool reads the root reviewer instruction and delivers a scoped review.
No application task, outbound communication, commit/push or deployment is approved by this handoff.

## Later update — authorised documentation sharing and implementation prompt, 22 November 2026

The owner requested a new prompt for the implementing AI and explicitly selected **Publish docs to
main** from a clean worktree, using `[CF-Pages-Skip]`. This authorises publishing the selected
documents, not implementing the site in this session or deploying application changes.

Fetched upstream was eight commits ahead at `f782dd7`, including the completed navigation model,
header/static nav, tests and archived navigation work order. The initial "navigation missing"
description was a stale-checkout observation, not current upstream. Do not repeat that implementation.

Created a clean publication worktree at `E:\AI\Worktrees\international-handoff-docs`, fast-forwarded
it to upstream and selected documentation branch `docs/international-implementation-handoff`.
Only the planning/review/handoff/history documents were copied. Shared old checkout, unrelated
modified navigation documents and untracked owner images remain untouched.

New entry point: `URAL-INTERNATIONAL-IMPLEMENTATION-START.md`. It scopes technical preparation and
engineering for the recipient; articles and new homepage/hub/FAQ text/translations stay with the
editorial tool. Content-dependent tasks are BLOCKED_CONTENT until supplied and approved; no empty
hubs or placeholders publish. The two review refinements remain first-batch dependencies.

The document push must be verified against GitHub after commit. No application build/test result
or deployment is claimed by this documentation batch. Recheck the latest remote revision before
starting R01; source/runtime/account checks remain the implementing tool's responsibility.
