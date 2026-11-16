/**
 * Builds the site assistant's knowledge files from the prerendered pages.
 *
 * Input is the same `bodyHtml` the prerender writes into each static page, so
 * the assistant can only ever quote text that is published and crawlable.
 *
 * Output (inside the build output directory):
 *   assistant/index-en.json, assistant/index-bn.json
 *       every passage, loaded by the browser to find matches (no AI involved)
 *   assistant/pages/<lang>/<page-id>.json
 *       one small file per page, read by functions/api/ask.js so the function
 *       never has to parse the whole corpus (Workers Free allows ~10 ms CPU)
 */
import fs from "node:fs";
import path from "node:path";

import {
  OFFICIAL_SOURCE_COUNTRIES,
  OFFICIAL_SOURCE_SECTORS,
  getOfficialSources,
} from "../src/data/officialSources";
import {
  assistantPageId,
  type AssistantIndex,
  type AssistantLang,
  type AssistantPageFile,
} from "../src/utils/assistantCore";
import { toEnglishBasePath } from "../src/utils/localeRoutes";

export interface AssistantRouteInput {
  routePath: string;
  title: string;
  bodyHtml: string;
  lastmod?: string;
  articleModified?: string;
}

/** Pages whose body is navigation or legal text rather than travel guidance. */
const EXCLUDED_PATHS = new Set(["/privacy", "/sitemap", "/resources"]);

const TARGET_PASSAGE_CHARS = 700;
const MAX_PASSAGE_CHARS = 900;
const MIN_PASSAGE_CHARS = 60;

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", apos: "'", quot: '"', nbsp: " ", ldquo: '"', rdquo: '"', lsquo: "'", rsquo: "'",
  ndash: "–", mdash: "—", hellip: "…", lt: "<", gt: ">", rarr: "→", times: "×", middot: "·",
};

function decodeEntities(value: string): string {
  return value
    .replace(/&([a-z]+);/gi, (entity, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? entity)
    .replace(/&#(x[\da-f]+|\d+);/gi, (entity, code: string) => {
      const point = code[0].toLowerCase() === "x" ? Number.parseInt(code.slice(1), 16) : Number.parseInt(code, 10);
      return Number.isFinite(point) && point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    });
}

function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function splitLongText(text: string): string[] {
  if (text.length <= MAX_PASSAGE_CHARS) return [text];
  const sentences = text.match(/[^.!?।]+[.!?।]+["')\]]*\s*|[^.!?।]+$/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > TARGET_PASSAGE_CHARS) {
      chunks.push(current.trim());
      current = "";
    }
    current += sentence;
    while (current.length > MAX_PASSAGE_CHARS) {
      chunks.push(current.slice(0, MAX_PASSAGE_CHARS).trim());
      current = current.slice(MAX_PASSAGE_CHARS);
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

/** Split one page body into heading-scoped passages of readable size. */
export function extractAssistantPassages(bodyHtml: string): { heading: string; text: string }[] {
  const cleaned = bodyHtml
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|nav|svg|picture|figure|form|button|noscript)\b[\s\S]*?<\/\1>/gi, " ");
  const blockPattern = /<(h[1-4]|p|li|td|th|dd|dt|summary|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;

  const passages: { heading: string; text: string }[] = [];
  let heading = "";
  let buffer = "";
  const flush = () => {
    const text = buffer.trim();
    buffer = "";
    if (text.length >= MIN_PASSAGE_CHARS) passages.push({ heading, text });
  };

  for (const match of cleaned.matchAll(blockPattern)) {
    const tag = match[1].toLowerCase();
    const inner = match[2];
    const text = toPlainText(inner);
    if (!text) continue;
    if (tag === "h1") continue;
    if (/^h[2-4]$/.test(tag)) {
      flush();
      heading = text;
      continue;
    }
    // A list item that is nothing but a link is navigation, not guidance.
    if (tag === "li" && /^\s*<a\b[^>]*>[\s\S]*<\/a>\s*$/i.test(inner) && !/<\/a>[\s\S]*<a\b/i.test(inner)) continue;
    if (tag === "summary") flush(); // keep each FAQ question with its own answer
    for (const piece of splitLongText(text)) {
      if (buffer && buffer.length + piece.length + 1 > TARGET_PASSAGE_CHARS) flush();
      buffer = buffer ? `${buffer} ${piece}` : piece;
    }
  }
  flush();
  return passages;
}

function stripBrand(title: string): string {
  return title.replace(/\s*[|–—-]\s*URAL[^|]*$/i, "").trim() || title;
}

export function generateAssistantIndex(
  enRoutes: readonly AssistantRouteInput[],
  bnRoutes: readonly AssistantRouteInput[],
  outputDir: string,
  fallbackDate: string
): void {
  const officialSources = getOfficialSources();
  const baseDir = path.join(outputDir, "assistant");
  fs.rmSync(baseDir, { recursive: true, force: true });

  const summary: string[] = [];
  for (const [lang, routes] of [["en", enRoutes], ["bn", bnRoutes]] as [AssistantLang, readonly AssistantRouteInput[]][]) {
    const index: AssistantIndex = {
      version: 1,
      lang,
      pages: [],
      passages: [],
      sources: [],
      countryAliases: Object.fromEntries(
        Object.entries(OFFICIAL_SOURCE_COUNTRIES).map(([code, country]) => [code, [country.en, country.bn, ...country.aliases]])
      ),
      sectorKeywords: Object.fromEntries(OFFICIAL_SOURCE_SECTORS.map((sector) => [sector.id, [...sector.keywords]])),
    };
    const pageIndexByEnglishPath = new Map<string, number>();
    const pagesDir = path.join(baseDir, "pages", lang);
    fs.mkdirSync(pagesDir, { recursive: true });

    for (const route of routes) {
      const englishPath = toEnglishBasePath(route.routePath);
      if (EXCLUDED_PATHS.has(englishPath)) continue;
      const passages = extractAssistantPassages(route.bodyHtml);
      if (passages.length === 0) continue;
      const id = assistantPageId(englishPath);
      const title = stripBrand(route.title);
      const date = (route.articleModified || route.lastmod || fallbackDate).slice(0, 10);
      const pageIndex = index.pages.length;
      pageIndexByEnglishPath.set(englishPath, pageIndex);
      index.pages.push({ id, path: route.routePath, title, date });
      passages.forEach((passage, position) => {
        index.passages.push({ page: pageIndex, n: position, heading: passage.heading, text: passage.text });
      });
      const pageFile: AssistantPageFile = {
        path: route.routePath,
        title,
        date,
        passages,
        sources: officialSources
          .filter((source) => source.pages.includes(englishPath))
          .slice(0, 8)
          .map((source) => ({ url: source.url, name: lang === "bn" ? source.nameBn : source.nameEn })),
      };
      fs.writeFileSync(path.join(pagesDir, `${id}.json`), JSON.stringify(pageFile), "utf8");
    }

    index.sources = officialSources.map((source) => ({
      url: source.url,
      name: lang === "bn" ? source.nameBn : source.nameEn,
      sector: source.sector,
      country: source.country,
      pages: source.pages
        .map((page) => pageIndexByEnglishPath.get(page))
        .filter((value): value is number => value !== undefined),
    }));

    const file = path.join(baseDir, `index-${lang}.json`);
    fs.writeFileSync(file, JSON.stringify(index), "utf8");
    summary.push(`${lang}: ${index.pages.length} pages, ${index.passages.length} passages, ${Math.round(fs.statSync(file).size / 1024)} KB`);
  }
  console.log(`[Site assistant] Generated knowledge files (${summary.join("; ")}) and ${officialSources.length} official links.`);
}
