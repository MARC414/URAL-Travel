import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import JourneyHelpPanel, { JOURNEY_HELP_PLACEMENT } from "../src/components/JourneyHelpPanel";
import { BLOG_DATA } from "../src/constants";
import { AFFILIATE_LINKS, resolvePartnerUrl } from "../src/components/AffiliatePartners";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { JOURNEY_HELP, getJourneyHelp, type JourneyStage } from "../src/utils/journeyHelp";

/**
 * Journey Help acceptance test — docs/growth/10-CONTENT-UPGRADE-STANDARD.md §4.4.
 *
 * This test protects the *safety* of the panel, not its existence. The whole
 * argument for A2.2 was that a stage-gated panel cannot become an advertising
 * block, because a stage only offers partners that genuinely help. If someone
 * later adds a fare link to `perform`, or pads a stage to three links for
 * symmetry, that argument collapses silently. So it is asserted here.
 */

let count = 0;
function test(name: string, run: () => void) {
  run();
  console.log(`PASS ${name}`);
  count++;
}

const STAGES: JourneyStage[] = ["prepare", "travel", "perform", "return"];

/** Partners that must never appear in a stage, with the reason. A8. */
const FORBIDDEN: Record<JourneyStage, { key: string; why: string }[]> = {
  prepare: [
    { key: "tiqets", why: "attraction pass while planning a pilgrimage" },
    { key: "goCity", why: "attraction pass while planning a pilgrimage" },
    { key: "airhelp", why: "compensation before there is a flight" },
  ],
  travel: [
    { key: "qeeq", why: "self-drive, which does not apply to this audience" },
    { key: "goCity", why: "attraction pass on an airport leg" },
    { key: "tiqets", why: "attraction pass on an airport leg" },
  ],
  perform: [
    { key: "aviasales", why: "airfare while the pilgrim is inside the rites" },
    { key: "kiwi", why: "airfare while the pilgrim is inside the rites" },
    { key: "tiqets", why: "attraction pass inside the rites" },
    { key: "goCity", why: "attraction pass inside the rites" },
    { key: "airhelp", why: "compensation while performing the rites" },
  ],
  return: [
    { key: "klook", why: "hotel search on the way home" },
    { key: "klookHotels", why: "hotel search on the way home" },
    { key: "goCity", why: "attraction pass on the way home" },
  ],
};

test("every stage is defined and carries 2–3 links", () => {
  for (const stage of STAGES) {
    const config = JOURNEY_HELP[stage];
    assert.ok(config, `${stage}: missing config`);
    assert.ok(
      config.links.length >= 2 && config.links.length <= 3,
      `${stage}: ${config.links.length} links — the contract is 2 to 3`,
    );
  }
});

test("every partner is an approved AFFILIATE_LINKS key", () => {
  for (const stage of STAGES) {
    for (const link of JOURNEY_HELP[stage].links) {
      assert.ok(
        Object.prototype.hasOwnProperty.call(AFFILIATE_LINKS, link.partner),
        `${stage}: "${link.partner}" is not an approved partner key`,
      );
      assert.ok(
        String(AFFILIATE_LINKS[link.partner]).startsWith("https://"),
        `${stage}: ${link.partner} resolved to a non-https url`,
      );
    }
  }
});

test("no stage offers a partner its own row forbids (A8)", () => {
  for (const stage of STAGES) {
    const used = new Set(JOURNEY_HELP[stage].links.map((l) => l.partner));
    for (const banned of FORBIDDEN[stage]) {
      assert.ok(
        !used.has(banned.key as never),
        `${stage}: ${banned.key} is forbidden here (${banned.why})`,
      );
    }
  }
});

test("no stage repeats a partner", () => {
  for (const stage of STAGES) {
    const keys = JOURNEY_HELP[stage].links.map((l) => l.partner);
    assert.equal(new Set(keys).size, keys.length, `${stage}: duplicate partner`);
  }
});

test("every link explains itself in both locales, specifically", () => {
  for (const stage of STAGES) {
    for (const link of JOURNEY_HELP[stage].links) {
      for (const [field, value] of [
        ["labelEn", link.labelEn],
        ["labelBn", link.labelBn],
        ["reasonEn", link.reasonEn],
        ["reasonBn", link.reasonBn],
      ] as const) {
        assert.ok(value && value.trim().length > 12, `${stage}/${link.partner}: thin ${field}`);
      }
      // A4: a reason must be a reason, not a slogan.
      assert.ok(
        link.reasonEn.split(/\s+/).length >= 10,
        `${stage}/${link.partner}: reasonEn reads like a slogan`,
      );
      assert.ok(
        /[\u0980-\u09FF]/.test(link.reasonBn),
        `${stage}/${link.partner}: reasonBn carries no Bengali`,
      );
      assert.ok(
        !/book now|save big|don't miss|click here/i.test(link.reasonEn),
        `${stage}/${link.partner}: generic marketing language`,
      );
    }
  }
});

test("stage headings and intros are localised", () => {
  for (const stage of STAGES) {
    const c = JOURNEY_HELP[stage];
    assert.ok(c.headingEn.length > 10 && c.headingBn.length > 10, `${stage}: heading`);
    assert.ok(c.introEn.length > 20 && c.introBn.length > 20, `${stage}: intro`);
    assert.ok(/[\u0980-\u09FF]/.test(c.headingBn), `${stage}: headingBn not Bengali`);
    assert.ok(/[\u0980-\u09FF]/.test(c.introBn), `${stage}: introBn not Bengali`);
  }
});

test("getJourneyHelp returns null for an absent stage", () => {
  assert.equal(getJourneyHelp(undefined), null);
});

test("every Hajj & Umrah post declares a stage", () => {
  const cluster = BLOG_DATA.filter((post) => post.category === "Hajj & Umrah");
  const missing = cluster.filter((post) => !post.journeyStage).map((post) => post.slug);
  assert.ok(cluster.length >= 10, `only ${cluster.length} cluster posts found`);
  assert.equal(
    missing.length,
    0,
    `cluster posts with no journeyStage: ${missing.join(", ")}`,
  );
});

test("declared stages are valid and cover more than one stage", () => {
  const stages = new Set<string>();
  for (const post of BLOG_DATA) {
    if (!post.journeyStage) continue;
    assert.ok(STAGES.includes(post.journeyStage), `${post.slug}: invalid stage`);
    stages.add(post.journeyStage);
  }
  assert.ok(
    stages.size >= 3,
    `cluster should span at least three stages, found ${[...stages].join(", ")}`,
  );
});

test("the tawaf guide is perform-stage and gets no fare link", () => {
  const post = BLOG_DATA.find((p) => p.slug === "tawaf-sai-seven-circuits-step-by-step-guide");
  assert.ok(post, "tawaf post missing");
  assert.equal(post!.journeyStage, "perform");
  const keys = JOURNEY_HELP.perform.links.map((l) => l.partner);
  assert.ok(!keys.includes("aviasales" as never), "perform stage must not carry airfare");
  assert.ok(!keys.includes("kiwi" as never), "perform stage must not carry airfare");
});

test("the panel renders, and every link is tracked as journey_help", () => {
  const html = renderToStaticMarkup(
    React.createElement(JourneyHelpPanel, { stage: "perform" as JourneyStage, isBn: false }),
  );
  assert.ok(html.includes("data-journey-stage=\"perform\""), "stage attribute missing");
  const anchors = html.match(/<a\b[^>]*>/g) ?? [];
  assert.equal(anchors.length, 2, `perform should render exactly 2 links, rendered ${anchors.length}`);
  for (const anchor of anchors) {
    assert.ok(
      anchor.includes(`data-affiliate-placement="${JOURNEY_HELP_PLACEMENT}"`),
      "link missing journey_help placement — clicks would be unattributable",
    );
    assert.ok(anchor.includes('rel="noopener noreferrer sponsored"'), "A5 disclosure attributes missing");
    assert.ok(anchor.includes('target="_blank"'), "external link should open in a new tab");
  }
  // §4.1 / A3: the RENDERED href must be the partner's real URL (that is the
  // point), but it must come through resolvePartnerUrl so a paused programme
  // falls back instead of dead-ending. The guard is therefore on the SOURCE,
  // not on the output.
  const source = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "src", "components", "JourneyHelpPanel.tsx"),
    "utf8",
  );
  assert.ok(
    !/tpo\.li/.test(source),
    "JourneyHelpPanel.tsx hardcodes a .tpo.li URL — route it through AFFILIATE_LINKS + resolvePartnerUrl",
  );
  assert.ok(
    source.includes("resolvePartnerUrl"),
    "JourneyHelpPanel.tsx does not resolve partner URLs, so a paused programme would dead-end",
  );
  for (const partner of ["airalo", "kiwitaxi"] as const) {
    assert.ok(
      html.includes(resolvePartnerUrl(AFFILIATE_LINKS[partner])),
      `rendered href for ${partner} is not the resolved registry URL`,
    );
  }
});

test("the Bengali panel renders Bengali copy, not the English fallback", () => {
  const html = renderToStaticMarkup(
    React.createElement(JourneyHelpPanel, { stage: "travel" as JourneyStage, isBn: true }),
  );
  // Count only visible text: className strings are ASCII and would swamp the
  // ratio on any page, so strip tags before counting.
  const text = html.replace(/<[^>]*>/g, " ");
  const bengali = (text.match(/[\u0980-\u09FF]/g) ?? []).length;
  const latin = (text.match(/[A-Za-z]/g) ?? []).length;
  assert.ok(bengali > 200, `only ${bengali} Bengali characters rendered`);
  assert.ok(bengali > latin, `Bengali ${bengali} vs Latin ${latin} — looks like a fallback`);
});

test("the panel renders nothing when a post has no stage", () => {
  const html = renderToStaticMarkup(React.createElement(JourneyHelpPanel, { isBn: false }));
  assert.equal(html, "", "panel must not render without a stage");
});

console.log(`\n${count} checks passed for Journey Help`);
