/**
 * F04 — the flight widget must support a truly unselected airport.
 *
 * The homepage crash of 23 November 2026 happened after mount: the widget
 * stored `null` in its committed query and then passed `undefined` into
 * `buildFlightSearchCode`, which trims its inputs. Server-rendered HTML and the
 * build gates stayed green while every visitor lost the page. These tests mount
 * the real component so the post-mount path is covered.
 *
 * Contract under test:
 *  - omitted `defaultOrigin`/`defaultDestination` keep the legacy DAC/KTM pair;
 *  - explicit `null` selects nothing and never falls back to directory[0];
 *  - unmatched free text is not an airport;
 *  - a partial swap is safe;
 *  - an incomplete form has no route-specific handoff or invented route banner,
 *    but still opens the hosted white-label search for any origin/destination.
 */
import assert from "node:assert/strict";
import { Window } from "happy-dom";

const win = new Window({ url: "https://uraltravel.co.uk/flights" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win;
scope.document = win.document;
for (const name of [
  "HTMLElement",
  "HTMLInputElement",
  "HTMLAnchorElement",
  "Element",
  "Node",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "CustomEvent",
  "MutationObserver",
]) {
  scope[name] = (win as unknown as Record<string, unknown>)[name];
}
scope.IS_REACT_ACT_ENVIRONMENT = true;

// The widget reads dated FX rates and provider autocomplete. Tests must not
// touch the network; a rejected fetch exercises the widget's offline path.
const offlineFetch = () => Promise.reject(new Error("offline test"));
scope.fetch = offlineFetch;
(win as unknown as Record<string, unknown>).fetch = offlineFetch;

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { renderToStaticMarkup } = await import("react-dom/server");
const { default: TravelpayoutsWidget } = await import("../src/components/TravelpayoutsWidget");
const { InteractiveTools } = await import("../src/components/InteractiveTools");

type WidgetProps = Record<string, unknown>;

const widget = (props: WidgetProps) =>
  React.createElement(TravelpayoutsWidget as unknown as React.ComponentType<WidgetProps>, props);

let checks = 0;
async function test(name: string, run: () => void | Promise<void>) {
  await run();
  checks++;
  console.log(`PASS ${name}`);
}

async function mount(props: WidgetProps) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  await React.act(async () => {
    root.render(widget(props));
  });
  return {
    host,
    async unmount() {
      await React.act(async () => root.unmount());
      host.remove();
    },
  };
}

const originInput = (host: HTMLElement) =>
  host.querySelector('input[role="combobox"]') as HTMLInputElement;
const destInput = (host: HTMLElement) =>
  host.querySelector("#ural-global-dest-input") as HTMLInputElement;
const submitLink = (host: HTMLElement) =>
  host.querySelector('[data-testid="search-flights-submit-btn"]') as HTMLAnchorElement;
const swapButton = (host: HTMLElement) =>
  host.querySelector('button[aria-label="Swap departure and destination airports"]') as HTMLButtonElement;

async function type(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(win.HTMLInputElement.prototype, "value")?.set;
  assert.ok(setter, "happy-dom exposes a native value setter");
  await React.act(async () => {
    setter!.call(input, value);
    input.dispatchEvent(new win.Event("input", { bubbles: true }) as unknown as Event);
  });
}

async function click(element: Element) {
  await React.act(async () => {
    element.dispatchEvent(
      new win.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }) as unknown as Event,
    );
  });
}

async function submitForm(host: HTMLElement) {
  const form = host.querySelector("form");
  assert.ok(form, "the widget renders a search form");
  await React.act(async () => {
    form!.dispatchEvent(new win.Event("submit", { bubbles: true, cancelable: true }) as unknown as Event);
  });
}

for (const lang of ["en", "bn"] as const) {
  await test(`explicit_null_origin_destination_are_unselected (${lang})`, () => {
    const html = renderToStaticMarkup(
      widget({ lang, defaultOrigin: null, defaultDestination: null }),
    );
    assert.ok(!html.includes("(DAC)"), "SSR must not select Dhaka when both props are null");
    assert.ok(!html.includes("(KTM)"), "SSR must not select Kathmandu when both props are null");
    assert.ok(
      (html.match(/value=""/g) || []).length >= 2,
      "both airport inputs render empty rather than a directory entry",
    );
    assert.ok(
      html.includes(lang === "bn" ? "বিমানবন্দর বেছে নিন" : "Select a departure airport"),
      "SSR shows localized departure guidance",
    );
    assert.ok(
      html.includes(lang === "bn" ? "গন্তব্য বিমানবন্দর বেছে নিন" : "Select a destination airport"),
      "SSR shows localized destination guidance",
    );
  });
}

await test("omitted_props_keep_the_legacy_dhaka_kathmandu_defaults", () => {
  const html = renderToStaticMarkup(widget({ lang: "en" }));
  assert.ok(html.includes("(DAC)"), "omitted defaultOrigin still selects Dhaka");
  assert.ok(html.includes("(KTM)"), "omitted defaultDestination still selects Kathmandu");
});

await test("explicit_null_props_keep_the_widget_mounted_and_empty", async () => {
  for (const lang of ["en", "bn"] as const) {
    const { host, unmount } = await mount({
      lang,
      defaultOrigin: null,
      defaultDestination: null,
    });
    try {
      assert.equal(originInput(host).value, "", "origin starts empty");
      assert.equal(destInput(host).value, "", "destination starts empty");
      const link = submitLink(host);
      const href = link.getAttribute("href");
      assert.ok(href, "the global hosted search is available before any route is chosen");
      assert.equal(
        new URL(href!).searchParams.has("flightSearch"),
        false,
        "no route code is invented for the unselected widget",
      );
      assert.equal(link.getAttribute("aria-disabled"), "false", "the action is enabled");
    } finally {
      await unmount();
    }
  }
});

await test("partial_swap_is_safe", async () => {
  const { host, unmount } = await mount({
    lang: "en",
    defaultOrigin: "DAC",
    defaultDestination: null,
  });
  try {
    assert.ok(originInput(host).value.includes("(DAC)"), "origin starts selected");
    assert.equal(destInput(host).value, "", "destination starts unselected");
    await click(swapButton(host));
    assert.equal(originInput(host).value, "", "swap moves the empty selection to origin");
    assert.ok(destInput(host).value.includes("(DAC)"), "swap moves Dhaka to destination");
    assert.ok(host.textContent?.includes("Select a departure airport"), "guidance replaces the empty origin");
  } finally {
    await unmount();
  }
});

await test("unmatched_text_is_not_an_airport", async () => {
  const { host, unmount } = await mount({
    lang: "en",
    defaultOrigin: null,
    defaultDestination: null,
  });
  try {
    const input = originInput(host);
    await React.act(async () => input.focus());
    await type(input, "zzzz");
    assert.equal(originInput(host).value, "zzzz", "the visitor's text stays in the field");
    assert.ok(!host.textContent?.includes("KTM"), "free text is never swapped for a guessed airport");
    assert.ok(!host.textContent?.includes("DAC"), "free text is never swapped for a guessed airport");

    await submitForm(host);
    assert.equal(originInput(host).value, "", "unmatched text does not become a selected airport");
    assert.equal(
      new URL(submitLink(host).getAttribute("href")!).searchParams.has("flightSearch"),
      false,
      "unmatched text never becomes a route code in the handoff",
    );
  } finally {
    await unmount();
  }
});

await test("incomplete_form_opens_the_generic_hosted_search_without_a_fabricated_route", async () => {
  const { host, unmount } = await mount({
    lang: "en",
    defaultOrigin: null,
    defaultDestination: null,
    showInlineResults: true,
  });
  try {
    assert.ok(
      !host.textContent?.includes("Ready to search on the provider"),
      "no committed-route banner is rendered before a route exists",
    );
    assert.ok(!host.textContent?.includes("Lowest Fare Found"), "no fare block is rendered");
    assert.ok(
      !host.querySelector('a[href*="aviasales.com/search/"]'),
      "no route-specific Aviasales link is offered without a route",
    );

    const href = submitLink(host).getAttribute("href");
    assert.ok(href, "the primary action still opens the hosted affiliate search");
    const url = new URL(href!);
    assert.equal(url.origin + url.pathname, "https://flights.uraltravel.co.uk/", "hosted white-label page");
    assert.equal(url.searchParams.has("flightSearch"), false, "no invented route code");
    assert.equal(url.searchParams.get("currency"), "USD", "no origin means the provider default");
    assert.equal(url.searchParams.get("locale"), "en", "the provider keeps the native locale");

    // The generic handoff is actionable: clicking it is not swallowed by validation.
    let opened = false;
    const click = new win.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 });
    submitLink(host).addEventListener("click", () => { opened = true; });
    await React.act(async () => { submitLink(host).dispatchEvent(click as unknown as Event); });
    assert.equal(click.defaultPrevented, false, "the click is not cancelled");
    assert.equal(opened, true, "the handler ran on the generic handoff");
  } finally {
    await unmount();
  }
});

await test("a_complete_selection_still_offers_the_route", async () => {
  const { host, unmount } = await mount({
    lang: "en",
    defaultOrigin: "DAC",
    defaultDestination: "DXB",
    showInlineResults: true,
  });
  try {
    const href = submitLink(host).getAttribute("href") ?? "";
    assert.ok(href.includes("flights.uraltravel.co.uk"), "a complete route hands off to the hosted Page");
    assert.ok(href.includes("flightSearch="), "the handoff carries a native search code");
    assert.ok(
      host.textContent?.includes("Ready to search on the provider"),
      "the committed-route banner returns once both airports are selected",
    );
  } finally {
    await unmount();
  }
});

function currencyButton(host: HTMLElement, code: string) {
  return [...host.querySelectorAll("button")].find((button) =>
    (button.textContent ?? "").includes(code),
  ) as HTMLButtonElement | undefined;
}

await test("manual_currency_survives_origin_change_and_swap", async () => {
  // Without a manual choice, the origin drives the provider currency.
  {
    const { host, unmount } = await mount({
      lang: "en",
      defaultOrigin: "DAC",
      defaultDestination: "DXB",
    });
    try {
      assert.ok(
        submitLink(host).getAttribute("href")?.includes("currency=BDT"),
        "Dhaka defaults the provider currency to BDT",
      );

      const input = originInput(host);
      await React.act(async () => input.focus());
      await type(input, "LHR");
      const lhrSuggestion = [...host.querySelectorAll('button[role="option"]')].find((button) =>
        button.textContent?.includes("LHR"),
      );
      assert.ok(lhrSuggestion, "London is offered as a real airport");
      await click(lhrSuggestion!);
      assert.ok(
        submitLink(host).getAttribute("href")?.includes("currency=GBP"),
        "a UK origin switches the provider currency to GBP",
      );
    } finally {
      await unmount();
    }
  }

  // A non-UK, non-BD origin falls back to USD.
  {
    const { host, unmount } = await mount({
      lang: "en",
      defaultOrigin: "DAC",
      defaultDestination: "DXB",
    });
    try {
      const input = originInput(host);
      await React.act(async () => input.focus());
      await type(input, "JFK");
      const jfkSuggestion = [...host.querySelectorAll('button[role="option"]')].find((button) =>
        button.textContent?.includes("JFK"),
      );
      assert.ok(jfkSuggestion, "New York is offered as a real airport");
      await click(jfkSuggestion!);
      assert.ok(
        submitLink(host).getAttribute("href")?.includes("currency=USD"),
        "a non-UK, non-BD origin falls back to USD",
      );
    } finally {
      await unmount();
    }
  }

  // A manual choice survives an origin change and a swap.
  {
    const { host, unmount } = await mount({
      lang: "en",
      defaultOrigin: "DAC",
      defaultDestination: "DXB",
    });
    try {
      const eurButton = currencyButton(host, "EUR");
      assert.ok(eurButton, "EUR is an explicit currency choice");
      await click(eurButton!);

      const input = originInput(host);
      await React.act(async () => input.focus());
      await type(input, "LHR");
      const lhrSuggestion = [...host.querySelectorAll('button[role="option"]')].find((button) =>
        button.textContent?.includes("LHR"),
      );
      assert.ok(lhrSuggestion, "London is offered as a real airport");
      await click(lhrSuggestion!);

      assert.ok(
        submitLink(host).getAttribute("href")?.includes("currency=EUR"),
        "a manual currency choice survives an origin change",
      );

      await click(swapButton(host));
      assert.ok(
        submitLink(host).getAttribute("href")?.includes("currency=EUR"),
        "a manual currency choice survives a swap",
      );
    } finally {
      await unmount();
    }
  }
});

await test("global_inquiry_does_not_assume_dhaka_or_passport", async () => {
  const host2 = document.createElement("div");
  document.body.appendChild(host2);
  const root2 = (await import("react-dom/client")).createRoot(host2);
  await React.act(async () => {
    root2.render(
      React.createElement(InteractiveTools as unknown as React.ComponentType<Record<string, unknown>>, {
        initialTool: "airports",
      }),
    );
  });
  try {
    const originSelect = host2.querySelector("#airport-inquiry-origin") as HTMLSelectElement | null;
    const destSelect = host2.querySelector("#airport-inquiry-destination") as HTMLSelectElement | null;
    assert.ok(originSelect, "inquiry origin select renders");
    assert.ok(destSelect, "inquiry destination select renders");
    assert.equal(originSelect!.value, "", "no silent Dhaka origin");
    assert.equal(destSelect!.value, "", "no silent Dubai destination");
    assert.ok(
      (host2.textContent ?? "").includes("any origin") || (host2.textContent ?? "").includes("any destination"),
      "the preview no longer claims a fabricated route",
    );
    const whatsapp = host2.querySelector('a[href*="wa.me"]') as HTMLAnchorElement | null;
    assert.ok(whatsapp, "free help via WhatsApp remains available");
  } finally {
    await React.act(async () => root2.unmount());
    host2.remove();
  }
});

console.log(`\n[test-flight-widget-state] ${checks} checks passed.`);
