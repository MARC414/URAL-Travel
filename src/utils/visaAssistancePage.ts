/**
 * Static (prerendered) HTML for `/visa-assistance`.
 *
 * The React half is src/components/VisaAssistancePage.tsx. Both halves read
 * `VISA_ASSISTANCE_COPY` in src/utils/visaAssistanceCopy.ts, so the crawlable
 * page and the rendered page cannot say different things.
 *
 * The apply link and the checker note come from the eVisas programme module,
 * which is also what pauses them when the programme is paused — this renderer
 * never writes an eVisas URL of its own.
 */

import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EvisaBanner } from "../components/EvisaPanels";
import {
  EVISAS_DISCLOSURE,
  EVISAS_WIDGET_PRIVACY,
  evisasDestinationUrl,
  type EvisaLang,
} from "../data/evisaProgram";
import {
  VISA_ASSISTANCE_COPY,
  VISA_ASSISTANCE_SNAPSHOT,
  type VisaAssistanceLocale,
} from "./visaAssistanceCopy";

export interface VisaAssistanceStaticHtmlOptions {
  /** Bengali twin pages pass the localised `<h1>` from the SEO copy table. */
  h1Override?: string;
}

const SOURCES: readonly { label: { en: string; bn: string }; url: string }[] = [
  {
    label: { en: "eVisas — About us", bn: "eVisas — About us" },
    url: "https://evisas.com/about-us",
  },
  {
    label: {
      en: "eVisas — Terms & Conditions (\"About eVisas\", fees, refunds)",
      bn: "eVisas — Terms & Conditions (\"About eVisas\", ফি ও রিফান্ড)",
    },
    url: "https://evisas.com/terms-and-conditions",
  },
  {
    label: { en: "eVisas — FAQ", bn: "eVisas — FAQ" },
    url: "https://evisas.com/faq",
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Render the full `/visa-assistance` body. */
export function renderVisaAssistanceStaticHtml(
  locale: VisaAssistanceLocale,
  h1Override?: string,
): string {
  const copy = VISA_ASSISTANCE_COPY[locale];
  const h1 = escapeHtml(h1Override ?? copy.h1);
  const lang: EvisaLang = locale;
  const applyHref = evisasDestinationUrl();
  const privacy = EVISAS_WIDGET_PRIVACY[lang];

  const bullets = (items: readonly string[], indent = "          ") =>
    items.map((item) => `${indent}<li>${escapeHtml(item)}</li>`).join("\n");

  const steps = copy.steps
    .map(
      (step, index) => `          <li>
            <h3>${index + 1}. ${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.body)}</p>
          </li>`,
    )
    .join("\n");

  const faqs = copy.faqs
    .map(
      (faq) => `          <div>
            <h3>${escapeHtml(faq.question)}</h3>
            <p>${escapeHtml(faq.answer)}</p>
          </div>`,
    )
    .join("\n");

  const sources = SOURCES.map(
    (source) =>
      `          <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label[locale])}</a></li>`,
  ).join("\n");

  return `      <article>
        <figure>
          <img src="/assets/images/visas_hero_20261117-1200.webp" width="1200" height="675" loading="eager" decoding="async" fetchpriority="high" alt="${escapeHtml(
            locale === "bn"
              ? "পাসপোর্ট, বোর্ডিং পাস ও ভিসার স্ট্যাম্প একটি ডেস্কে"
              : "A passport, boarding pass and visa stamps on a desk",
          )}" />
        </figure>
        <header>
          <p>${escapeHtml(copy.eyebrow)}</p>
          <h1>${h1}</h1>
          <p>${escapeHtml(copy.intro)}</p>
        </header>

        <section id="visa-assistance-quick-answer">
          <h2>${escapeHtml(copy.quickAnswerHeading)}</h2>
          <p>${escapeHtml(copy.quickAnswer)}</p>
        </section>

${renderToStaticMarkup(
  React.createElement(EvisaBanner, {
    size: "horizontal",
    lang: locale,
    placement: "evisas_visa_assistance_banner",
    campaign: undefined,
  })
)}

        <section id="visa-assistance-relationship">
          <h2>${escapeHtml(copy.relationshipHeading)}</h2>
          <ul>
${bullets(copy.relationshipPoints)}
          </ul>
        </section>

        <section id="visa-assistance-how-it-works">
          <h2>${escapeHtml(copy.howHeading)}</h2>
          <p>${escapeHtml(copy.howIntro)}</p>
          <ol>
${steps}
          </ol>
        </section>

        <section id="visa-assistance-who-evisas-is">
          <h2>${escapeHtml(copy.whoHeading)}</h2>
${copy.whoParagraphs.map((p) => `          <p>${escapeHtml(p)}</p>`).join("\n")}
          <p>${escapeHtml(copy.whoQuoteLead)}</p>
          <blockquote>
            <p>${escapeHtml(copy.whoQuote)}</p>
          </blockquote>
          <p><small>${escapeHtml(copy.whoChecked)}</small></p>
        </section>

        <section id="visa-assistance-destinations">
          <h2>${escapeHtml(copy.destinationsHeading)}</h2>
          <p>${escapeHtml(copy.destinationsIntro)}</p>
          <p>${escapeHtml(copy.destinationsSnapshotLead)}</p>
          <p>${escapeHtml(VISA_ASSISTANCE_SNAPSHOT.destinations)}.</p>
          <p>${escapeHtml(copy.destinationsNote)}</p>
          <p>${escapeHtml(copy.conditionalLead)}</p>
          <p>${escapeHtml(VISA_ASSISTANCE_SNAPSHOT.conditional)}.</p>
          <p><a href="${locale === "bn" ? "/bn/visa" : "/visa"}">${escapeHtml(copy.destinationsLinkLabel)}</a></p>
        </section>

        <section id="visa-assistance-official-first">
          <h2>${escapeHtml(copy.officialFirstHeading)}</h2>
          <ul>
${bullets(copy.officialFirstPoints)}
          </ul>
          <p><a href="${locale === "bn" ? "/bn/resources" : "/resources"}">${escapeHtml(copy.officialFirstLinkLabel)}</a></p>
        </section>

        <section id="visa-assistance-what-ural-does-not-do">
          <h2>${escapeHtml(copy.notHeading)}</h2>
          <ul>
${bullets(copy.notPoints)}
          </ul>
        </section>
${
  applyHref
    ? `
        <section id="visa-assistance-apply">
          <h2>${escapeHtml(copy.applyHeading)}</h2>
          <p>${escapeHtml(copy.applyBody)}</p>
          <p><a href="${escapeHtml(applyHref)}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(copy.applyLinkLabel)}</a></p>
          <p><small>${escapeHtml(EVISAS_DISCLOSURE[lang])}</small></p>
        </section>
`
    : ""
}
        <section id="visa-assistance-faq">
          <h2>${escapeHtml(copy.faqHeading)}</h2>
${faqs}
        </section>

        <section id="visa-assistance-checker">
          <h2>${escapeHtml(privacy.heading)}</h2>
          <p>${escapeHtml(privacy.body)}</p>
          <p><a href="https://evisas.com/privacy-policy" target="_blank" rel="noopener noreferrer">${escapeHtml(privacy.link)}</a></p>
        </section>

        <section id="visa-assistance-sources">
          <h2>${escapeHtml(copy.sourcesHeading)}</h2>
          <ul>
${sources}
          </ul>
          <p><small>${escapeHtml(copy.footerNote)}</small></p>
        </section>
      </article>`;
}