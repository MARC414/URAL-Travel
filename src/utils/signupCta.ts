/**
 * The header's "Sign Up" button.
 *
 * The button is the site's one primary conversion action, and all it does is put
 * the visitor in front of the signup card — a card that is rendered outside
 * `<main>` on every route, so this needs no navigation and no state. That is
 * exactly why it lives here as a plain function instead of inline in `App.tsx`:
 * a three-line handler buried in a 5,000-line component is the kind of thing
 * that stops working silently after a refactor, and there is no way to test it
 * there.
 *
 * Two details are deliberate and both were found by testing, not by reading:
 *
 *   1. **The delay.** On mobile the button sits inside the drawer, which locks
 *      `body` scroll while open, then on close hands focus back to the burger
 *      button on the next animation frame. Scroll or focus immediately and the
 *      page does not move, then the keyboard opens behind a focused menu button.
 *      Waiting one tick lets both settle.
 *   2. **The `preventScroll`.** Focus is applied while a smooth scroll is
 *      running; without it the browser cancels the scroll to bring the field into
 *      view, which makes the button appear to jump.
 *
 * When the visitor has already subscribed, the email field is replaced by a
 * confirmation panel — so focus lands on the card's heading instead of going
 * nowhere.
 */

export const SIGNUP_CARD_ID = "sitewide-subscription";
export const SIGNUP_EMAIL_ID = "sitewide-subscription-email";
export const SIGNUP_TITLE_ID = "sitewide-subscription-title";

/** One tick is enough for the drawer's scroll-lock and focus return to finish. */
const SETTLE_MS = 180;

export type FocusSitewideSignupOptions = {
  /** Called when the card is not on the page at all, so the click is not lost. */
  onMissing?: () => void;
  /** Overrides the settle delay; tests pass 0. */
  delayMs?: number;
};

export function focusSitewideSignup({
  onMissing,
  delayMs = SETTLE_MS,
}: FocusSitewideSignupOptions = {}): void {
  if (typeof document === "undefined") return;

  window.setTimeout(() => {
    const card = document.getElementById(SIGNUP_CARD_ID);
    if (!card) {
      onMissing?.();
      return;
    }

    card.scrollIntoView?.({ behavior: "smooth", block: "start" });

    const emailField = document.getElementById(SIGNUP_EMAIL_ID);
    if (emailField instanceof HTMLInputElement) {
      emailField.focus({ preventScroll: true });
      return;
    }
    document.getElementById(SIGNUP_TITLE_ID)?.focus();
  }, delayMs);
}
