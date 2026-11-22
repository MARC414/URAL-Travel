# URAL International Expansion — Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` or, when the owner explicitly chooses delegation, `subagent-driven-development`. Execute one task at a time; checkbox steps track work, not permission.

**Goal:** make URAL international-facing, preserve Bangladesh expertise and existing URLs, and develop measurable traffic and affiliate revenue through bounded releases.
**Architecture:** readiness and distribution can progress alongside an additive Bangladesh hub and international homepage. A UK departure hub and new content follow separate approval/research gates. Shared routing, locale and handoff contracts are tested before release.
**Tech Stack:** existing React 19, TypeScript, Vite 6, Tailwind CSS 4, tsx/node:assert, happy-dom, Cloudflare Pages. No new dependencies.
**Spec:** [Corrected design](../specs/2026-11-22-international-expansion-design.md).

**22 November handoff update:** the owner requested a next prompt for the other AI to start technical
implementation while leaving new content writing separate. Read
[`URAL-INTERNATIONAL-IMPLEMENTATION-START.md`](../../../URAL-INTERNATIONAL-IMPLEMENTATION-START.md)
for this bounded role and first batch; it does not approve application deployment. The owner also
authorised sharing these documents in a documentation-only `[CF-Pages-Skip]` commit/push to main.
Fetched source at `f782dd7` already has the approved navigation; older missing-header observations
describe the stale planning checkout, not current upstream. Do not re-execute that work order.

## Global Constraints

- This publishing session changes documentation only. Its documentation commit/push is authorised;
  the recipient's bounded technical start follows the new prompt. Publication, application main-branch
  integration and deployment remain separately gated; do not treat a document push as UI permission.
- Preserve every existing canonical path, useful audience-specific content, redirect, affiliate integration and brand asset.
- International homepage is not a UK-only rewrite; Bangladesh is a clearly labelled specialism, not quarantined content.
- Keep `Language = "en" | "bn"`; real EN/BN counterparts only; no forced hreflang between different hubs.
- No geolocation, new price engine, fixed FX constants, unsourced money, invented schedules, legal eligibility or earnings promises.
- Central consent and registry conventions remain binding. Clicks are not bookings, approved commissions or payouts.
- Preserve performance/font budgets; lint/build/verify:build and touched tests must pass before release claims.
- Run future builds in isolated approved work; reconcile scheduled publication separately.

## Review Focus

1. New hub language switching creates a nonexistent BN page: foundation F01/F02/F07.
2. Empty search silently selects DAC/KTM or fabricates an airport: foundation F04/F05.
3. Static head/body and React disagree after navigation: foundation F03/F07/F09.
4. Eligibility or paid-help placement is inferred from a campaign/name/language: readiness R04 and growth G03/G04.
5. New work hides previous URLs, lowers test guards or deploys unrelated due posts: readiness R02/R03 and foundation F09/F10.

---

## Read this first — cross-tool operating contract

1. Read the current owner request, `AGENTS.md`, strategy index, current audit, this master and corrected spec.
2. Read the companion plan for the assigned task. Content work also reads the master content guide,
   article standard, publication standard and `content/blog/README.md`.
3. Check `git status --short`, HEAD and the latest authorised source/deployment. Do not reset, stash,
   stage or overwrite other tools' work. Do not assume the newest local `dist/` is production.
4. Confirm the task ID, allowed files, pending approvals and dependency evidence. A task marked READY
   in a future tracker is not permission to push or deploy.
5. Load applicable skills. For implementation use isolation and test-first work; for unknown failures
   diagnose before fixing. Do not delegate unless the owner/approved workflow authorises it.
6. Do the smallest assigned unit. Do not execute neighbouring plans because they appear relevant.
7. Record tests, evidence paths, changed files, scope limitations and the next task in the execution record.
8. If interrupted, resume from that record and inspect the diff before repeating work. Completed work
   requires evidence; a saved plan or generated module is not implementation proof.

### Required task record

Create `docs/handoff/2026-11-22-international-expansion-execution.md` in R01. Use:

```text
Task ID / status: NOT_STARTED | ACTIVE | BLOCKED | VERIFIED_LOCAL | RELEASED
Owner scope approval and date:
Source revision / worktree / deployment revision if known:
Files changed:
Tests and exit codes:
Static + browser + source/account evidence:
Remaining blocker / authorised next task:
```

Never put credentials, passport details, reader messages or dashboard personal data in this record.

## Plan set and delivery order

| Phase | Companion plan | Deliverable | Dependency |
|---|---|---|---|
| 0 — readiness | [Readiness](2026-11-22-international-readiness.md) | verified baseline, safe URL guards, commercial evidence and report contract | Plan/scope approval |
| 1 — preserve and expose | [Foundation](2026-11-22-international-foundation.md), F01–F02 | useful EN/BN Bangladesh hub | R01–R03 |
| 2 — international front door | Foundation F03–F08 | truthful homepage, explicit search/currency, locale/discovery parity | Bangladesh hub exists |
| 3 — base release | Foundation F09–F10 | verified international release and durable docs | separate preview/deployment approval |
| 4 — traffic + revenue pilot | [Growth](2026-11-22-international-growth.md), G01–G04/G06–G08 | one useful approved journey, distribution and accountable outcomes | commercial/source gates; need not wait for UK hub |
| 5 — optional UK departure hub | Growth G05 | EN/BN hub connecting verified UK content | explicit `/uk` scope approval |

These are dependency phases, not calendar or revenue guarantees. Readiness and offline research/
distribution drafting may overlap. Application edits to shared files remain serial. Base release
does not wait for a full UK programme, a new visa catalogue or account access unrelated to its function.

## Task checklist

### Readiness
- [ ] R01 — lock approval, workspace/source state and navigation dependencies.
- [ ] R02 — capture fresh route/content baseline and implement preservation guards.
- [ ] R03 — classify build failures and scheduled publication; resolve only authorised blockers.
- [ ] R04 — record programme eligibility, routing, terms and attribution evidence.
- [ ] R05 — prove event classification and consent; hand off authenticated forwarding.
- [ ] R06 — create comparable search and commercial scorecards.

### Site foundation
- [ ] F01 — shared lightweight Bangladesh hub content and real EN/BN links.
- [ ] F02 — register and prerender both Bangladesh hub pages with self-canonicals.
- [ ] F03 — truthful international homepage in both saved HTML and React.
- [ ] F04 — real unselected-airport state with safe search validation.
- [ ] F05 — origin-based BDT/GBP/USD defaults without overriding manual currency.
- [ ] F06 — apply explicit defaults to homepage/BD surfaces and preserve deep-page intent.
- [ ] F07 — scoped locale/head/schema policy and browser language-switch behaviour.
- [ ] F08 — discovery, navigation and directory scope clarity without menu redesign.
- [ ] F09 — complete URL/static/browser/accessibility/consent regression proof.
- [ ] F10 — obtain deployment permission, release, verify and update durable references.

### Traffic and first revenue
- [ ] G01 — inventory and source-review existing UK and international assets.
- [ ] G02 — select one evidence-led reader journey and two distribution adaptations.
- [ ] G03 — approve the exact existing-owner/new-page brief and eligibility evidence.
- [ ] G04 — publishable EN/BN answer and truthful partner next step, built and reviewed.
- [ ] G05 — optional UK departure hub; distinct from inbound UK entry advice.
- [ ] G06 — distribute through approved channels and earned-link outreach.
- [ ] G07 — measure sessions, qualified clicks, enquiries and commission/payout evidence separately.
- [ ] G08 — choose maintain/repair/expand and archive executed work orders.

## Owner gates — do not skip

| Gate | Approval needed |
|---|---|
| A | Corrected design and base scope: international `/` + `/bn/`, `/bangladesh` + `/bn/bangladesh`, empty homepage search, mapped-UK GBP defaults, bounded navigation additions |
| B | Execution method and isolated implementation; separate navigation-plan integration if missing |
| C | Base implementation preview/verification, then explicit permission to integrate/push/deploy |
| D | Exact pilot URL(s), content changes, provider placement and outbound communications |
| E | Optional `/uk` + `/bn/uk`; it is not assumed approved |
| F | Account settings, new commercial contracts, paid advice/lead fees, paid ads: separate operational decisions |

## Release invariants

Before = captured canonical set B. After = B plus only additions in the approved release manifest.
Base additions proposed: `/bangladesh`, `/bn/bangladesh`. Optional UK release: `/uk`, `/bn/uk`.
Approved scheduled posts are a separate addition set. No old path may disappear, redirect elsewhere,
become a generic fallback, lose its canonical or gain the wrong language. Changed `lastmod` and
approved annotations need not be byte-identical; unchanged article bodies/titles should remain so.

## Paste into another AI tool

> Read `AGENTS.md`, `00-URAL-STRATEGY-INDEX.md`,
> `docs/superpowers/plans/2026-11-22-international-expansion-master.md`, its corrected design,
> the companion plan and the execution record. Work ONLY on task [ID] under the owner's recorded
> scope. International-facing, not UK-only; existing URLs and Bangladesh usefulness are protected.
> Verify dependencies and the current source before editing. Use test-first implementation in an
> authorised isolated workspace. Stop for missing evidence or permission; do not guess visa rules,
> campaign IDs, geo behaviour or publication. Report changed files, test results and next task.
> Do not commit, push, publish or deploy unless explicitly authorised.

## Planning review record — 22 November 2026

A fresh read-only builder check identified three material wiring gaps. They were incorporated into
the proposal: F03 now owns the EN/BN homepage FAQ data/visible/schema path; R05 now owns bounded
purpose tagging on actual contact/share producers and rendered-anchor tests; F06 now pins an
unselected destination on newly scoped Bangladesh search while preserving deep-route defaults.
This review is design clarity feedback, not implementation verification or owner approval.
