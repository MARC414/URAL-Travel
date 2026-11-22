# URAL — next prompt: start technical implementation

**Lifecycle:** technical-executor handoff, 22 November 2026. Not publication or UI-deployment approval.
The owner requested a new prompt for the other AI to start implementation, with content writing kept
separate, and authorised publishing this documentation-only handoff to GitHub main with `[CF-Pages-Skip]`.
This session prepares/shares the handoff; it does not implement the website.

## Copy and paste this prompt into the implementing AI

```text
Switch from REVIEW ONLY to TECHNICAL IMPLEMENTATION. This prompt supersedes the previous review-only
assignment for this session. Follow current owner instructions and AGENTS.md, not stale handoff roles.

Goal: make URAL international-facing, preserve Bangladesh expertise and every existing public URL,
and support a focused UK expansion. Do not turn the site into a UK-only product.

Read, in order:
1. AGENTS.md, 00-URAL-STRATEGY-INDEX.md and 00-URAL-CURRENT-AUDIT.md.
2. URAL-INTERNATIONAL-IMPLEMENTATION-START.md (this file).
3. docs/superpowers/plans/2026-11-22-international-expansion-master.md.
4. docs/superpowers/specs/2026-11-22-international-expansion-design.md.
5. The readiness and foundation companion plans and the planning handoff.
6. docs/handoff/2026-11-19-approved-navigation-implementation.md for the already-landed header.

FIRST reconcile source safely:
- Run git status --short, git fetch origin and inspect HEAD versus origin/main.
- The old planning checkout was eight commits behind; navigation code is already in upstream main
  at f782dd7. Do not rebuild the header from the archived navigation plan or repeat finished work.
- Use a clean isolated implementation branch/worktree based on latest origin/main. Never reset,
  stash, force-pull or overwrite another tool's work. A dirty shared checkout is not a safe base.
- If this handoff is missing, obtain it from the owner's published documentation commit on main;
  do not reconstruct instructions from withdrawn drafts.

Start with this bounded technical batch:
R01 -> R02 preservation-test setup -> R03 fresh build/scheduling reconciliation -> R02 final baseline.
Create the execution record required by the master. Close the two review refinements before relying
on their checks: explicit approved release-manifest/schema/lifecycle and acquisition attribution
acceptance (initial UTM landing, SPA navigation, language switching and affiliate exit).
Do not assert broken live attribution without evidence; authenticated GTM/provider operations need
separate permission. Then proceed through independent technical tasks in their dependency order.

WORK DIVISION:
- You own engineering, data interfaces, routing, language/head/schema plumbing, search/currency,
  consented event wiring, tests, build proof and integration of supplied approved copy.
- Another AI owns new articles, travel-rule research, editorial homepage/hub/FAQ text, SEO wording,
  sources, CTA wording and Bengali translations. Do not write these yourself or change old articles.
- Reuse existing approved interface text where appropriate. For missing editorial input create a
  content-request handoff stating exact task ID, fields, EN/BN parity, evidence and link requirements.
- Mark affected tasks BLOCKED_CONTENT and continue independent engineering. Do not register/publish
  empty hubs, fake translations or placeholders just to pass tests. F01-F03 contain editorial work;
  split their engineering from supplied-copy acceptance rather than executing their prose instructions.
- G01-G08 editorial/distribution work is not yours; do not send newsletters, post or contact publishers.

PRESERVE:
- Existing URLs, correct guide audiences, real 404s, affiliate registry/campaign IDs and consent.
- EN/BN decision parity and genuine translated hreflang pairs; no forced multi-hub alternates.
- Page 24232 and native en/bn provider locale. No fake airports, schedules, prices or FX constants.
- Manual currency choice, dated/attributed rate rules, BDT worksheet inputs and performance budgets.
- No site-wide London defaults, global en-BD replacement, domain migration or unnecessary visa sales.

PER TASK:
Load relevant skills; use test-first work, actual red/green evidence and the master execution record.
Record changed files, exact tests/exit codes, rulings, content dependencies and next task. Do not
weaken guards or silently fix unrelated issues. Due scheduled posts must be reconciled separately;
a build or date does not authorise their publication. Tests from an earlier session are not your baseline.

GIT/RELEASE:
Commit only your scoped, verified task changes on the implementation branch. Do not stage owner
assets, credentials, unrelated changes or dist. Push an implementation branch only when the owner
explicitly authorises sharing it; this documentation-main push is not permission for application pushes.
Never merge/push application code to main or deploy until the owner accepts the verified preview
and explicitly authorises production release. The optional /uk pair also has a separate scope gate.

Deliver the first technical batch with its execution record, fresh baseline, tests, remaining content
requests and proposed next task. Do not attempt all 24 tasks as one unreviewed change.
```

## Source and scope notes

The publication worktree is `E:\AI\Worktrees\international-handoff-docs`, on the documentation branch
`docs/international-implementation-handoff`, based on fetched upstream `f782dd7`. The shared older
checkout and its uncommitted navigation documents/owner images are left untouched. Executors must
recheck latest origin/main rather than freezing this source identifier.

Planning permission, technical-executor permission, editorial approval and deployment permission
remain distinct. Missing approved EN/BN copy is a content dependency, not permission to invent it.
