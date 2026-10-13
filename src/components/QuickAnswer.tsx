import type { ReactNode } from "react";

/**
 * The AEO "Quick Answer" block — the direct, extractable answer to the page's
 * core question, placed before any affiliate CTA so the reader gets the answer
 * first (see PRODUCT.md, Product Principles #1).
 *
 * This component replaces seven near-identical copies that had drifted apart
 * across five route files: three different paddings, two radii, two background
 * tints, and a class order that no longer matched. It also removes the
 * `border-l-4` side stripe the copies shared.
 *
 * Why the stripe went. A thick coloured left border on a rounded card is the
 * single most recognisable tell of a generated interface, and it was the most
 * common finding the Impeccable detector raised against this repo (8 occurrences
 * across 5 files). The block's real job — "here is the answer, in a box" — is
 * carried by the tinted surface, the defined edge and the label instead. That is
 * a change of form, not of function: the anchor ids, the copy and the
 * machine-extractable paragraph structure are all unchanged, so GuideJumpNav
 * targets and the AEO/prerender tests keep working.
 *
 * The label is set in Inter, not monospace. Monospace is reserved for data and
 * measurement on this site (airport codes, prices, dates); using it for a
 * decorative label is a costume, and DESIGN.md records that rule.
 */
export interface QuickAnswerProps {
  /**
   * Preserve this verbatim when replacing an existing block. These ids are
   * referenced by GuideJumpNav, the guide-map link checks in
   * scripts/verify-build.ts, and the AEO structured-data copy.
   */
  id?: string;
  /** Translated label. Defaults to English "Quick Answer". */
  label?: string;
  children: ReactNode;
  /**
   * Body typography override. Blog prose runs at a larger measure than a
   * route-level panel, so BlogPostRouteView passes its own scale.
   */
  bodyClassName?: string;
  className?: string;
}

export function QuickAnswer({
  id,
  label = "Quick Answer",
  children,
  bodyClassName,
  className = "",
}: QuickAnswerProps) {
  return (
    <div
      id={id}
      className={`rounded-xl bg-bg-subtle p-5 ring-1 ring-brand-navy/[0.07] ${className}`}
    >
      <p className="mb-2 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy">
        {label}
      </p>
      <p
        className={
          bodyClassName ??
          "font-sans text-sm leading-relaxed text-slate-800 sm:text-base"
        }
      >
        {children}
      </p>
    </div>
  );
}

export default QuickAnswer;
