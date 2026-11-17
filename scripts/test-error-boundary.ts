/**
 * Behavioural tests for `RouteErrorBoundary`.
 *
 * WHY THIS SUITE EXISTS
 * ---------------------
 * The boundary only ever renders when something has already gone wrong, which is
 * exactly the code a reviewer never exercises by hand and a screenshot never
 * shows. Every route in `App.tsx` is a lazy chunk, so the realistic failure is a
 * chunk that never arrives (flaky mobile connection, ad-blocker, stale HTML
 * asking for a bundle the last deploy deleted). Without the boundary React
 * unmounts the tree and the visitor sees a blank white page.
 *
 * These tests render the component for real in happy-dom — the same DOM the
 * route tests use — and assert the fallback appears, is localised, is announced
 * to assistive tech, logs rather than swallows the error, and clears when the
 * visitor navigates away.
 */

import assert from "node:assert/strict";
import { Window } from "happy-dom";

const win = new Window({ url: "https://uraltravel.co.uk/" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win;
scope.document = win.document;
for (const name of [
  "HTMLElement",
  "Element",
  "Node",
  "Event",
  "CustomEvent",
  "MutationObserver",
  "localStorage",
  "sessionStorage",
]) {
  scope[name] = (win as unknown as Record<string, unknown>)[name];
}
scope.IS_REACT_ACT_ENVIRONMENT = true;
scope.requestAnimationFrame = (callback: () => void) => setTimeout(callback, 1);
scope.cancelAnimationFrame = clearTimeout;
win.scrollTo = () => {};

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { RouteErrorBoundary } = await import("../src/components/RouteErrorBoundary");

type Mount = { container: HTMLElement; root: ReturnType<typeof createRoot> };

function mount(): Mount {
  const element = win.document.createElement("div");
  win.document.body.appendChild(element);
  // happy-dom's elements are structurally close to the DOM lib but not
  // identical; React only needs the DOM surface, so this cast is type-only.
  const container = element as unknown as HTMLElement;
  return { container, root: createRoot(container) };
}

async function render(mount: Mount, element: React.ReactElement): Promise<void> {
  await React.act(async () => {
    mount.root.render(element);
  });
}

/** Captures what the app logged while a render was expected to fail. */
async function renderCapturingLogs(mount: Mount, element: React.ReactElement): Promise<string[]> {
  const logs: string[] = [];
  const realError = console.error;
  console.error = (...args: unknown[]) => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };
  try {
    await render(mount, element);
  } finally {
    console.error = realError;
  }
  return logs;
}

function Boom(): React.ReactElement {
  throw new Error("simulated lazy-chunk failure");
}

/** `children` is a required prop, so build the element rather than passing it positionally. */
function boundary(props: { lang?: "en" | "bn"; resetKey?: string }, child: React.ReactElement) {
  return React.createElement(RouteErrorBoundary, { ...props, children: child });
}

const results: { name: string; ok: boolean; detail?: string }[] = [];
async function test(name: string, fn: () => Promise<void> | void): Promise<void> {
  try {
    await fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
}

await test("children render normally when nothing throws", async () => {
  const fixture = mount();
  await render(
    fixture,
    boundary({}, React.createElement("p", null, "the real page"))
  );
  assert.match(String(fixture.container.innerHTML), /the real page/);
  assert.doesNotMatch(String(fixture.container.innerHTML), /role="alert"/);
});

await test("a thrown chunk error shows a message instead of a blank page", async () => {
  const fixture = mount();
  const logs = await renderCapturingLogs(
    fixture,
    boundary({ lang: "en" }, React.createElement(Boom))
  );

  const html = String(fixture.container.innerHTML);
  assert.ok(html.length > 0, "the page must not be empty when a chunk fails — that is the whole point");
  assert.match(html, /role="alert"/, "the fallback must be announced to assistive tech");
  assert.match(html, /This page didn’t load/);
  assert.match(html, /Reload the page/, "the visitor needs a way forward");
  assert.match(html, /href="\/"/, "and a way back to a page that works");
  assert.ok(
    logs.some((line) => line.includes("[URAL]")),
    "the failure must be logged, not swallowed silently"
  );
});

await test("the fallback is Bengali on Bengali routes", async () => {
  const fixture = mount();
  await renderCapturingLogs(
    fixture,
    boundary({ lang: "bn" }, React.createElement(Boom))
  );
  const html = String(fixture.container.innerHTML);
  assert.match(html, /পৃষ্ঠাটি লোড হয়নি/);
  assert.match(html, /href="\/bn"/, "the Bengali fallback must link to the Bengali home");
});

await test("the language is derived from the URL when no prop is passed", async () => {
  // The shell-level boundary in main.tsx sits above the router and cannot know
  // the locale, so it reads it from the path.
  win.history.pushState({}, "", "/bn/blog/some-post");
  const fixture = mount();
  await renderCapturingLogs(fixture, boundary({}, React.createElement(Boom)));
  assert.match(String(fixture.container.innerHTML), /পৃষ্ঠাটি লোড হয়নি/);
  win.history.pushState({}, "", "/");
});

await test("navigating to another route clears the error", async () => {
  let shouldThrow = true;
  function MaybeBroken(): React.ReactElement {
    if (shouldThrow) throw new Error("simulated chunk failure");
    return React.createElement("p", null, "the route recovered");
  }

  const fixture = mount();
  await renderCapturingLogs(
    fixture,
    boundary({ lang: "en", resetKey: "/blog/broken" }, React.createElement(MaybeBroken))
  );
  assert.match(String(fixture.container.innerHTML), /This page didn’t load/);

  // The visitor clicks a working nav link: same boundary, new path.
  shouldThrow = false;
  await render(
    fixture,
    boundary({ lang: "en", resetKey: "/blog/working" }, React.createElement(MaybeBroken))
  );
  assert.match(
    String(fixture.container.innerHTML),
    /the route recovered/,
    "one broken route must not poison the rest of the session"
  );
});

const failed = results.filter((result) => !result.ok);
for (const result of results) {
  if (!result.ok) console.error(`  ✗ ${result.name}\n    ${result.detail}`);
}
if (failed.length > 0) {
  console.error(`\n[error boundary] ${failed.length} of ${results.length} checks failed.`);
  process.exit(1);
}
console.log(`[error boundary] All ${results.length} behavioural checks passed.`);
