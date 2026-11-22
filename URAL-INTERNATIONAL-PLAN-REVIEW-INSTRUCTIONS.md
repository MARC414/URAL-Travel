# URAL international expansion — instructions for reviewing tools

**Lifecycle:** review-only handoff. **Date:** 22 November 2026.
**Current owner instruction:** "Your task is to review."

**Later role update, 22 November:** the owner requested a new prompt to start a separate technical
implementation session and authorised sharing this documentation on GitHub. If you received that
implementation assignment, follow [the new start prompt](URAL-INTERNATIONAL-IMPLEMENTATION-START.md)
instead of treating this earlier review-only role as permanent. This file remains the reviewer entry
point; neither role includes unapproved content publication or production deployment.

**Owner's writing-role correction:** the AI that provided the review also owns implementation and
scope-approved content research/authoring, not just engineering. The implementation prompt removes
the separate-writer restriction and directs qualified A-D plan corrections. A reviewer reading only
this file must still verify the current assignment; this update is not permission to publish.

## 1. Your role and boundary

You are reviewing the proposed international expansion plan, not executing it. Check whether the
design is accurate, coherent, appropriately scoped and safely executable by a different tool.
Report evidence-backed findings and specific corrections. Do not implement application tasks,
rewrite articles, change partner settings, publish, stage, commit, push, merge or deploy.
Document corrections also require the owner to request them; this instruction file is not permission
to silently resolve pending findings. Current owner instructions and `AGENTS.md` govern scope.

## 2. Where the documents live

All paths below are relative to the repository root. The local workspace used for this handoff is:

```text
E:\e-COMMERCE BUSINESS\URAL\URAL-Travel-main
```

At this handoff the new plan files are **local, untracked and not committed or pushed by this task**.
An AI tool opening this folder can read them immediately. A remote/cloud tool or separate clone needs
the owner to supply the files, or a separately authorised documentation commit/branch/revision.
Do not assume a GitHub clone contains uncommitted local documents.

**Sharing update:** that paragraph describes the earlier local-only state. The owner subsequently
authorised a documentation-only commit/push to main from a clean worktree. Verify the published
commit/revision in Git; the original dirty checkout need not match main until safely reconciled.

Check actual state before reviewing:

```powershell
git status --short
git log -1 --oneline
git ls-files -- docs/superpowers/plans/2026-11-22-international-expansion-master.md docs/superpowers/specs/2026-11-22-international-expansion-design.md
```

These are read-only checks. No tracked-file output for an existing document means it is not tracked
in that checkout; it does not establish the state of a different branch. If the corrected documents
are absent, ask for the correct files/revision. Do not reconstruct them from withdrawn drafts.

## 3. Required read order

1. [AGENTS.md](AGENTS.md) — repository and authorisation rules.
2. [Strategy index](00-URAL-STRATEGY-INDEX.md) and [dated diagnostic baseline](00-URAL-CURRENT-AUDIT.md).
3. [Master plan](docs/superpowers/plans/2026-11-22-international-expansion-master.md) — task IDs, dependencies and gates.
4. [Corrected design](docs/superpowers/specs/2026-11-22-international-expansion-design.md) — actual proposal and constraints.
5. [Readiness plan](docs/superpowers/plans/2026-11-22-international-readiness.md) — R01–R06.
6. [Foundation plan](docs/superpowers/plans/2026-11-22-international-foundation.md) — F01–F10.
7. [Growth plan](docs/superpowers/plans/2026-11-22-international-growth.md) — G01–G08.
8. [Planning handoff](docs/handoff/2026-11-22-international-expansion-planning.md) — local state and decisions.
9. `PRODUCT.md`, `DESIGN.md`, relevant code and the separately approved navigation design/plan where needed.

For editorial acceptance questions also read `URAL-CONTENT-OPTIMIZATION-GUIDE.md`,
`docs/growth/10-CONTENT-UPGRADE-STANDARD.md`, `docs/growth/11-PUBLICATION-STANDARD-V2.md`
and `content/blog/README.md`. Do not audit a legacy article from its body file alone.

## 4. What the proposal means — do not substitute another strategy

- International-facing homepage, UK as focused growth, Bangladesh expertise retained.
- Preserve all existing public canonical paths and useful audience-specific articles.
- Proposed base: `/` and `/bn/` paired international homes; `/bangladesh` and `/bn/bangladesh` paired hubs.
- Optional `/uk` and `/bn/uk` need separate approval; inbound UK ETA is not outbound UK-passport advice.
- Different hubs are normal navigation destinations, not automatically hreflang alternatives.
- No domain migration, blanket "from Bangladesh" removal, fixed FX, guessed eligibility or income guarantee.
- Null homepage airport selection and selected-origin currency are proposals, not current implementation.
- A prior navbar screenshot approval is not approval for these changes or deployment.

## 5. Carry forward the latest review findings

The latest review found no critical/high planning issue, but **two medium-priority handoff refinements
remain unresolved in the plan**. Verify them rather than presenting the plan as fully closed:

### Review finding A — release manifest and preservation lifecycle

R02/R03 and F09/F10 refer to an approved release manifest but do not fix its file/schema/lifecycle.
The suggested contract names `releaseId`, `baselineRevision`, `approvalReference`,
`approvedAddedPaths` and `approvedChangedPaths`. The actual built-output comparison and handling of
later approved publishing must be explicit. No auto-refresh of baseline to hide a regression.

### Review finding B — acquisition attribution acceptance

R05/R06 and G06/G07 need explicit evidence for campaign/source attribution, not only event receipt.
The observed `trackPageView` in `src/utils/analytics.ts` sends canonical URL as `page_location`;
campaign query survives in `page_path`. This **does not prove live attribution is broken** because
initial pageviews and GTM mapping may preserve it. Test initial UTM landing, SPA navigation,
language switching and qualified affiliate exit; authenticate report receipt separately when permitted.
SEO canonical URLs remain clean; do not forward arbitrary query strings or personal information.

Earlier builder gaps were incorporated into the proposal: bilingual homepage FAQs (F03), actual
WhatsApp contact/share marker producers (R05), and null destination for newly scoped Bangladesh search
(F06). Check their coverage; do not report them as still missing without new evidence.

### Later review A-D — qualification and next tool's work

The receiving reviewer confirmed A/B and proposed C/D (BN actual-counterpart assertions and body-
extractor fixture controls). The implementation-start prompt instructs applying all four document
corrections with these distinctions:
- Missing proposed directories before implementation is expected; missing artefact ownership/schema
  or executable acceptance is the plan gap.
- Initial pageview carries full href and query, and language switching preserves query. Ordinary
  internal navigation drops incoming query on bare routes. That does not establish loss of GA4
  session attribution; no application UTM parser is required merely because a search found none.
- Affiliate/contact/share events and report/session association need coverage. Inventory actual
  reachable WhatsApp producers instead of a fixed count/four-file list. Existing `verify-build.ts`
  already has delegated affiliate/WhatsApp consent guards; add targeted coverage rather than claim
  no analytics tests exist. Keep both zero-emission and duplicate-emission protections.
- An empty `DEFERRED_BN_GROUPS` is not inherently a defect. Test actual generated content and no fake
  alternate destinations, and classify baseline exceptions before a blanket failure policy.
- `quote()` rejects expired, not every stale, payload. A bounded labelled stale fallback is part of
  the current rates contract; do not weaken or accidentally remove it based on review wording.

These are proposed plan-contract corrections for the receiving tool, not application fixes performed
by this handoff publisher. Review completion is not publication approval.

## 6. Review method and required output

1. Recheck source revision and pending changes; do not overwrite another contributor's work.
2. Trace requirements across spec, master, companion tasks and actual callers/metadata/renderers.
3. Check dependencies, allowed files, exact interfaces, EN/BN parity, URL preservation, consent,
   provider applicability, scheduling/publication boundaries and realistic acceptance evidence.
4. Use read-only inspection and side-effect-free probes if needed. Do not run builds/generation in
   the shared workspace: those commands can change outputs or include due posts. Ask for explicit
   isolated verification permission if review needs it.
5. Report only meaningful, supported findings. Use file paths/task IDs/symbols, not fragile line numbers.
6. End with verdict, severity-ranked findings, exact proposed correction, confidence/evidence,
   what is solid, unverified items and approval decisions. Do not invent measurements or approval.

If the owner later authorises execution, move to the master task protocol and the assigned task ID;
do not treat this review instruction as that authorisation. Shipping documentation itself requires
separate permission, and must exclude unrelated changes, owner assets and secrets.

## 7. Paste into another AI tool

> Your task is REVIEW ONLY. Open `URAL-INTERNATIONAL-PLAN-REVIEW-INSTRUCTIONS.md` in the URAL
> repository and follow its read order. Review the corrected master/design and companion plans
> against the current code. Preserve the international-facing direction, Bangladesh usefulness,
> existing URLs and permission boundaries. Verify the two outstanding findings: release-manifest
> lifecycle and acquisition attribution tests. Report supported issues and concrete corrections;
> do not implement, edit application/content, commit, push, publish or deploy. If the files are
> missing in your checkout, ask the owner for the corrected documents or committed revision.
