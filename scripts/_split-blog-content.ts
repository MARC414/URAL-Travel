/**
 * ONE-SHOT MIGRATION SCRIPT (safe to delete after running).
 *
 * Splits the heavy English blog `content` bodies out of src/constants.ts into a
 * lazily-loadable src/data/blogContent.ts, so ~115 KB gz stops shipping in the
 * eager `content-data` chunk on every page.
 *
 * It imports BLOG_DATA at runtime (so string concatenation / escaped backticks
 * in the source resolve to their true values) and re-emits each body as a
 * human-readable template literal with correct escaping. Then it strips the
 * `content:` field from constants.ts with a STRUCTURAL replace (content -> next
 * internalLinks marker), which is immune to whatever characters live inside the
 * body. Asserts exactly 43 replacements or aborts.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BLOG_DATA } from "../src/constants";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONSTANTS = path.join(ROOT, "src", "constants.ts");
const OUT = path.join(ROOT, "src", "data", "blogContent.ts");

/** Emit a runtime string as a safe, readable TS template literal. */
function toTemplateLiteral(s: string): string {
  const body = s
    .replace(/\\/g, "\\\\") // escape backslashes FIRST
    .replace(/`/g, "\\`") // escape backticks
    .replace(/\$\{/g, "\\${"); // escape template interpolation starts
  return "`" + body + "`";
}

// ---- 1. Build blogContent.ts from runtime values -------------------------
const entries = BLOG_DATA.map((p) => {
  if (typeof p.content !== "string" || p.content.length === 0) {
    throw new Error(`Post "${p.slug}" has no string content at migration time.`);
  }
  return `  ${JSON.stringify(p.slug)}: ${toTemplateLiteral(p.content)},`;
});

const header = `/**
 * LAZY-LOADED English blog article bodies.
 *
 * These long-form bodies (~115 KB gzipped across ${BLOG_DATA.length} posts) were split out of
 * src/constants.ts so they no longer ship in the eagerly-loaded \`content-data\`
 * chunk that every page downloads. They are imported dynamically — only when a
 * visitor opens a /blog/:slug article (see the import() in src/App.tsx) and at
 * build time by scripts/prerender.ts (Node, no client cost).
 *
 * Keyed by post slug. To edit an English article body, edit it here; the card
 * metadata (title/summary/category/date/author/readTime/internalLinks) still
 * lives in src/constants.ts BLOG_DATA. Bengali bodies live in
 * src/data/bengaliContent.ts.
 */
export const BLOG_CONTENT: Record<string, string> = {
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header + entries.join("\n") + "\n};\n", "utf8");
console.log(`[split] wrote ${OUT} with ${entries.length} entries`);

// ---- 2. Strip `content:` from constants.ts (structural, verified) --------
const src = fs.readFileSync(CONSTANTS, "utf8");
const STRIP = /\n    content: [\s\S]*?\n    internalLinks:/g;
const matches = src.match(STRIP) ?? [];
if (matches.length !== BLOG_DATA.length) {
  throw new Error(
    `[split] ABORT: expected ${BLOG_DATA.length} content blocks to strip, found ${matches.length}. constants.ts NOT modified.`,
  );
}
fs.writeFileSync(CONSTANTS + ".bak", src, "utf8");
const stripped = src.replace(STRIP, "\n    internalLinks:");

// Sanity: no 4-space `content:` field should remain.
const residual = (stripped.match(/^    content: /gm) ?? []).length;
if (residual !== 0) {
  throw new Error(`[split] ABORT: ${residual} content fields remain after strip.`);
}
fs.writeFileSync(CONSTANTS, stripped, "utf8");
console.log(
  `[split] stripped ${matches.length} content blocks from constants.ts ` +
    `(${src.length} -> ${stripped.length} chars, backup at constants.ts.bak)`,
);
