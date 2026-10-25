import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget for the /contact form (2026-10-25).
 *
 * ── Why it is optional, not required ────────────────────────────────────────
 * The site key is a **build-time** value (`VITE_TURNSTILE_SITE_KEY`). If it is
 * absent the component renders nothing, the form sends no token, and
 * `/api/contact` skips verification because no secret is configured either. That
 * keeps local development, previews and a partially-configured production
 * deployment working instead of locking every visitor out of the form.
 *
 * ── Why the script is loaded here, not in index.html ────────────────────────
 * Turnstile is a security control for one form. Loading it in the document head
 * would ship a third-party script (and its cost) to all 260 prerendered pages
 * for a widget that only exists on one of them.
 *
 * ── Privacy ────────────────────────────────────────────────────────────────
 * Turnstile is a bot check, not analytics: it sets no advertising cookies and is
 * listed in the Privacy Policy as a security processor (Cloudflare). It is
 * therefore not gated behind analytics consent — declining analytics must not
 * disable form protection.
 */

const SCRIPT_ID = "cloudflare-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// `import.meta.env` exists under Vite but is undefined when Node imports this
// module (scripts/verify-build.ts walks the same graph), so read it defensively.
const BUILD_ENV = (import.meta as ImportMeta & { env?: Record<string, unknown> }).env ?? {};
const SITE_KEY =
  typeof BUILD_ENV.VITE_TURNSTILE_SITE_KEY === "string" ? BUILD_ENV.VITE_TURNSTILE_SITE_KEY.trim() : "";

export const isTurnstileConfigured = SITE_KEY.length > 0;

type TurnstileWidgetProps = {
  /** Receives the token, or an empty string when the token expires or errors. */
  onToken: (token: string) => void;
  lang?: "en" | "bn";
  className?: string;
};

/** Minimal shape of the parts of `window.turnstile` this component uses. */
type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

function getTurnstile(): TurnstileApi | undefined {
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile;
}

export function TurnstileWidget({ onToken, lang = "en", className = "" }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  // Keep the latest callback without re-rendering the widget: `onToken` is often
  // an inline arrow in the parent, and an effect dependency on it would tear the
  // widget down on every keystroke.
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    const renderWidget = () => {
      const turnstile = getTurnstile();
      if (cancelled || !turnstile || !containerRef.current || widgetIdRef.current) return;
      widgetIdRef.current = turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        size: "flexible",
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => onTokenRef.current(""),
      });
    };

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (getTurnstile()) {
      renderWidget();
    } else if (existing) {
      existing.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      existing?.removeEventListener("load", renderWidget);
      const turnstile = getTurnstile();
      if (turnstile && widgetIdRef.current) {
        try {
          turnstile.remove(widgetIdRef.current);
        } catch {
          // The widget is already gone; nothing to clean up.
        }
      }
      widgetIdRef.current = null;
    };
  }, []);

  if (!SITE_KEY) return null;

  return (
    <div className={`space-y-1.5 ${className}`} data-turnstile-widget>
      <div ref={containerRef} className="min-h-[65px]" />
      <p className="text-[10px] leading-relaxed text-slate-500">
        {lang === "bn"
          ? "এই ফর্মটি স্প্যাম থেকে সুরক্ষিত। যাচাইকরণ Cloudflare Turnstile দ্বারা সম্পন্ন হয় — এটি কোনো বিজ্ঞাপন কুকি ব্যবহার করে না।"
          : "This form is protected against spam. Verification is provided by Cloudflare Turnstile, which sets no advertising cookies."}
      </p>
    </div>
  );
}
