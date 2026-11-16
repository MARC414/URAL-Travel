/** `npm run test:official-sources` — see scripts/officialSourcesChecks.ts. */
import { runOfficialSourcesChecks } from "./officialSourcesChecks";

const results = runOfficialSourcesChecks();
for (const result of results) console.log(`  ${result.ok ? "\u2713" : "\u2717"} ${result.label}`);
const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`\n[test:official-sources] ${failed.length} check(s) FAILED.`);
  process.exitCode = 1;
} else {
  console.log(`\n[test:official-sources] All ${results.length} checks passed.`);
}
