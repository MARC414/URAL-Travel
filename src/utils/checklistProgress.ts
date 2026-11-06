/**
 * Packing-checklist progress, as a pure function.
 *
 * Extracted from `InteractiveTools` so the arithmetic can be tested directly.
 * The previous inline version multiplied by **105** instead of 100
 * (`Math.round((checkedCount / checklist.length) * 105)`), which inflated every
 * value: 3 of 12 items read 26% instead of 25%, 11 of 12 read 96% instead of
 * 92%, and any list long enough would report a clamped **100% while an item was
 * still unticked**. The `Math.min(…, 100)` guards at the two render sites hid
 * the ceiling case but not the inflation, so the bug was invisible in review and
 * visible to every reader.
 *
 * Contract:
 * - 0 checked            -> 0
 * - all checked          -> 100
 * - monotonic: never decreases as items are ticked
 * - never above 100, never below 0
 * - an empty list is 0, not NaN
 * - a count outside the list is clamped, not trusted
 */
export function checklistProgress(checkedCount: number, totalCount: number): number {
  if (!Number.isFinite(checkedCount) || !Number.isFinite(totalCount)) return 0;
  if (totalCount <= 0) return 0;
  const checked = Math.min(Math.max(checkedCount, 0), totalCount);
  return Math.round((checked / totalCount) * 100);
}
