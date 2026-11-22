# URAL — next prompt: implement the site and author its content

**Lifecycle:** implementation-and-authoring handoff, updated 22 November 2026. Not publication or UI-deployment approval.
**Owner correction:** the AI that supplied the plan review also owns implementation **and content
writing**. The earlier instruction to leave articles/homepage/hub/FAQ text and translations to a
separate tool is withdrawn. This publishing session reviews/prepares the handoff, not the site.
Documentation sharing remains authorised with `[CF-Pages-Skip]`; application publication is separate.

## Copy and paste this prompt into the implementing AI

```text
Switch from REVIEW ONLY to IMPLEMENTATION AND CONTENT AUTHORING. You are the AI that supplied the
review, and you now own both engineering and scope-approved writing. This prompt supersedes the
previous review-only assignment and the instruction to leave article/content writing to another AI.
Follow current owner instructions and AGENTS.md, not stale handoff roles.

Goal: make URAL international-facing, preserve Bangladesh expertise and every existing public URL,
and support a focused UK expansion. Do not turn the site into a UK-only product.

Read, in order:
1. AGENTS.md, 00-URAL-STRATEGY-INDEX.md and 00-URAL-CURRENT-AUDIT.md.
2. URAL-INTERNATIONAL-IMPLEMENTATION-START.md (this file).
3. docs/superpowers/plans/2026-11-22-international-expansion-master.md.
4. docs/superpowers/specs/2026-11-22-international-expansion-design.md.
5. The readiness, foundation and growth companion plans and the planning handoff.
6. docs/handoff/2026-11-19-approved-navigation-implementation.md for the already-landed header.
7. URAL-CONTENT-OPTIMIZATION-GUIDE.md, docs/growth/10-CONTENT-UPGRADE-STANDARD.md,
   docs/growth/11-PUBLICATION-STANDARD-V2.md and content/blog/README.md before any content work.

FIRST reconcile source safely:
- Run git status --short, git fetch origin and inspect HEAD versus origin/main.
- The old planning checkout was eight commits behind; navigation code is already in upstream main
  at f782dd7. Do not rebuild the header from the archived navigation plan or repeat finished work.
- Use a clean isolated implementation branch/worktree based on latest origin/main. Never reset,
  stash, force-pull or overwrite another tool's work. A dirty shared checkout is not a safe base.
- If this handoff is missing, obtain it from the owner's published documentation commit on main;
  do not reconstruct instructions from withdrawn drafts.

FIRST APPLY THE FOUR PLAN-DOCUMENT CORRECTIONS (A-D), with these qualifications:
A. Name docs/releases/<releaseId>-manifest.json and an owning task. Define releaseId, baselineRevision,
   baselineCapturedAt, approvalReference, approvedAddedPaths, approvedChangedPaths,
   scheduledPostAdditions and supersedes. Pin baseline/capture references, explicit release ID and
   union/comparison rules; no automatic permission generation. Drafts may change before approval;
   approved/released manifests are immutable, with a new approved ID superseding them. Define next-
   release baseline/lifecycle so ordinary future approved publishing is neither blocked nor hidden.
B. Correct acquisition tests, not an unsupported claim that landing/session attribution is lost.
   Initial pageview uses pathname+search and full href; language switching preserves queries;
   SPA pageviews carry pathname+search but canonical page_location; click events use pathname.
   Ordinary internal URLs may omit UTMs without proving GA4 session attribution is lost. Missing
   application UTM parsing is not itself a bug. Test initial landing -> navigation/language switch
   -> qualified affiliate/contact/share event and authenticated report attribution where authorised.
   Inventory all currently reachable WhatsApp anchors/actions, including generated/static markup,
   rather than freezing a claimed count or four files. Assign actual producers and consent/privacy
   tests; cover missing required sponsored markup/zero emission AND duplicate emission. Extend
   existing verify-build analytics guards; do not claim no analytics guards currently exist.
   Never forward arbitrary query strings/messages/PII or preserve UTMs on every internal link as a
   speculative fix. Do not infer partner commission attribution from GA4 receipt.
C. Check actual generated BN counterparts and every newly registered/touched public EN route,
   with an explicit authorised deferral for intentional EN-only publication. Test that unavailable
   counterparts never enter language switching, hreflang, navigation or sitemap. An empty deferral
   array alone is not a defect; the policy helper is not proof that content was generated. Inventory
   existing exceptions before introducing a blanket guard that fails unrelated baseline content.
D. Test the real baseline extractor: nonempty core body, nav-only edit leaves body hash unchanged,
   one-word body edit changes it. Test capture/normalisation failure, not just comparator fixtures;
   hash omissions do not replace separate shared-shell/navigation assertions.
Reconcile master/spec/companion plans with these corrections and record the dispositions before code.
Do not implement application changes merely to make the review's unverified assertions true.

Then start with this bounded technical batch:
R01 -> R02 preservation-test setup -> R03 fresh build/scheduling reconciliation -> R02 final baseline.
Create the execution record required by the master. Use the corrected A-D contracts in their owning
tasks. Authenticated GTM/provider operations need separate permission. Continue engineering and
approved content research/drafting in dependency order; do not stop because a separate writer is absent.

YOUR RESPONSIBILITIES:
- You own engineering, data interfaces, routing, language/head/schema plumbing, search/currency,
  consented event wiring, tests, build proof AND content authoring.
- You also research and write scope-approved articles, homepage/hub copy, FAQs, SEO wording,
  sources, contextual CTA wording and natural Bengali counterparts. Follow the article/source/link/
  commercial/category/maintenance contracts. Preserve existing URLs and useful old content.
- F01-F03 writing is yours. For G01-G08, inventory first, choose one evidence-led journey and prepare
  the exact G03 brief/claim ledger. Honour its scope approval before new articles or neighbouring edits;
  write approved assets yourself rather than delegating by default to an unspecified tool.
- If sources, applicability, assets or approvals are missing, record the real dependency and ask only
  the relevant question. Do not fabricate information, translations or publishable placeholders.
- Drafting distribution assets is permitted within the assigned plan; sending newsletters, posting,
  outreach, account changes and publication still require the separate operational approval.

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

Deliver corrected plan contracts and the first technical batch with its execution record, fresh
baseline, tests, actual source/approval dependencies and next task. Then proceed through the assigned
engineering-and-writing scope. Do not attempt all 24 tasks as one unreviewed change.
```

## Source and scope notes

The publication worktree is `E:\AI\Worktrees\international-handoff-docs`, on the documentation branch
`docs/international-implementation-handoff`, based on fetched upstream `f782dd7`. The shared older
checkout and its uncommitted navigation documents/owner images are left untouched. Executors must
recheck latest origin/main rather than freezing this source identifier.

Planning permission, implementation/authoring scope, publication approval and deployment permission
remain distinct. This AI writes the required EN/BN content; unavailable evidence is not permission to
invent it. The prior separate-writer instruction is withdrawn, not a reason to block assigned writing.
