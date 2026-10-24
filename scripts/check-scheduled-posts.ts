import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { loadScheduledBlogPosts } from "./scheduledPosts";
import { resolvePublishPlan, type PublishPlan } from "./publishPlan";

function planStepOutputs(plan: PublishPlan): string {
  return (
    `publish=${plan.publish}\n` +
    `today_dhaka=${plan.todayDhaka}\n` +
    `due_slugs=${plan.dueSlugs.join(",")}\n` +
    `missing_slugs=${plan.missingFromLive.join(",")}\n` +
    `sitemap_checked=${plan.sitemapChecked}\n` +
    `live_sitemap_urls=${plan.liveSitemapUrlCount ?? "unknown"}\n`
  );
}

// CLI entry only. When this file is imported (tests, verify scripts), the
// top-level body must not run: it would hit the network and touch
// GITHUB_OUTPUT as a side effect of an import.
const isMainEntry = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainEntry) {
  try {
    const now = new Date();
    const includeOverdue = process.env.INCLUDE_OVERDUE !== "false";
    const plan = await resolvePublishPlan(loadScheduledBlogPosts(), now, includeOverdue);
    console.log(JSON.stringify(plan));

    const outputPath = process.argv
      .find((argument) => argument.startsWith("--github-output="))
      ?.split("=", 2)[1];
    const outputFile =
      outputPath ?? (process.argv.includes("--github-output") ? process.env.GITHUB_OUTPUT : undefined);
    if (outputFile) {
      fs.appendFileSync(outputFile, planStepOutputs(plan));
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
