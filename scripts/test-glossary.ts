/** `npm run test:glossary` — see scripts/glossaryChecks.ts. */
import { runGlossaryChecks } from "./glossaryChecks";

const results = runGlossaryChecks();
for (const result of results) console.log(`  ${result.ok ? "\u2713" : "\u2717"} ${result.label}`);
const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`\n[test:glossary] ${failed.length} check(s) FAILED.`);
  process.exitCode = 1;
} else {
  console.log(`\n[test:glossary] All ${results.length} checks passed.`);
}
