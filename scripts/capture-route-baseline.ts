import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { captureBaselineFromDist } from "../src/utils/routeBaseline";

/**
 * CLI: npx tsx scripts/capture-route-baseline.ts --dist dist --revision <git-sha> --output <file>
 * A missing sitemap or route HTML fails loudly: an empty or partial baseline is
 * worse than no baseline at all. Comparisons write to a separate file.
 */
const args = process.argv.slice(2);
function arg(name: string) {
  const i = args.indexOf(`--${name}`);
  const value = i >= 0 ? args[i + 1] : undefined;
  if (!value || value.startsWith("--")) throw new Error(`--${name} requires a value`);
  return value;
}
const distDir = path.resolve(arg("dist"));
const revision = arg("revision");
const output = path.resolve(arg("output"));

const baseline = captureBaselineFromDist(distDir, revision);
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(baseline, null, 2)}\n`, "utf8");
console.log(
  `[route baseline] captured ${baseline.routes.length} routes from ${distDir} at ${revision} -> ${output}`,
);
