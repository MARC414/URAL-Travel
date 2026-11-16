/**
 * Read-only clutter inventory for the URAL interface.
 *
 * It prints counts only; it never edits a file. Run from the repository root:
 *   node scripts/ui-clutter-inventory.mjs
 *
 * The output backs `docs/growth/UI-CLUTTER-INVENTORY-2026-11-15.md`. Counts are
 * a starting point for a human decision, not a work order: a match can be a
 * label, a prose sentence, or a compliance line that must stay.
 */
import fs from "node:fs";
import path from "node:path";

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx|ts)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

const files = [...walk("src", []), path.join("scripts", "prerender.ts")];

const patterns = {
  "Popular labels": /Popular (?:Hubs|Searches|Routes|Destinations|hotel areas|Cities)/gi,
  "Quick labels": /Quick (?:links|reference|answer|tips|facts|checklist)/gi,
  "Related / read-next": /(?:Related (?:guides|reading|articles)|Read next|You may also|Also read)/gi,
  "At-a-glance blocks": /(?:At a glance|Key facts|Start here|How it works|Good to know)/gi,
  "Tip / note lines": /(?:Booking Tip|Pro tip|Note:|Tip:)/g,
  "Trust / hype badges": /(?:Trusted by|Verified partner|Official partner|100% Free|No travel agent needed|As seen in|Best price guaranteed)/gi,
  "Advertisement captions": /Advertisement \u00b7/g,
  "Uppercase eyebrow labels": /uppercase tracking-\[0\.1[0-9]em\]/g,
  "Repeated disclaimers": /(?:this is not a traveller discount|not a government (?:site|service)|we may earn a commission)/gi
};

const report = {};
for (const [name, re] of Object.entries(patterns)) {
  const perFile = {};
  let total = 0;
  for (const file of files) {
    const hits = fs.readFileSync(file, "utf8").match(re);
    if (hits) {
      perFile[file.replaceAll("\\", "/")] = hits.length;
      total += hits.length;
    }
  }
  report[name] = {
    total,
    files: Object.entries(perFile).sort((a, b) => b[1] - a[1])
  };
}

const furniture = [
  "MultiPartnerBlogCallout",
  "TravelpayoutsReferralCallout",
  "RadicalStorageContextualCallout",
  "JourneyHelpPanel",
  "TrustpilotReviews",
  "QuickAnswer",
  "TopicalAuthorityBlueprint",
  "EvisaHomeSection",
  "EvisaBlogBanner",
  "TravelEssentials",
  "TravelpayoutsWidget",
  "TravelpayoutsCustomWidget"
];

const usage = {};
for (const name of furniture) {
  const matcher = new RegExp(`<${name}\\b`);
  usage[name] = files
    .filter((file) => matcher.test(fs.readFileSync(file, "utf8")))
    .map((file) => file.replaceAll("\\", "/"));
}

console.log(JSON.stringify({ generatedAt: new Date().toISOString(), report, usage }, null, 2));
