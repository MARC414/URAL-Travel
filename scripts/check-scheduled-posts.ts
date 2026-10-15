import fs from "node:fs";
import {
  dhakaCalendarDate,
  getPostsDueForPublishing,
  loadScheduledBlogPosts,
} from "./scheduledPosts";

try {
  const now = new Date();
  const todayDhaka = dhakaCalendarDate(now);
  const includeOverdue = process.env.INCLUDE_OVERDUE === "true";
  const duePosts = getPostsDueForPublishing(loadScheduledBlogPosts(), now, includeOverdue);
  const result = {
    publish: duePosts.length > 0,
    todayDhaka,
    slugs: duePosts.map((post) => post.slug),
    mode: includeOverdue ? "include-overdue" : "publish-date-only",
  };
  console.log(JSON.stringify(result));

  const outputPath = process.argv.find((argument) => argument.startsWith("--github-output="))?.split("=", 2)[1];
  const outputFile = outputPath ?? (process.argv.includes("--github-output") ? process.env.GITHUB_OUTPUT : undefined);
  if (outputFile) {
    fs.appendFileSync(outputFile, `publish=${result.publish}\n`);
    fs.appendFileSync(outputFile, `today_dhaka=${todayDhaka}\n`);
    fs.appendFileSync(outputFile, `due_slugs=${result.slugs.join(",")}\n`);
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
