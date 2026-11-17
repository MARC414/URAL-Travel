import React from "react";

/**
 * Last-resort boundary for the rendered app.
 *
 * WHY THIS EXISTS
 * ---------------
 * Every route in `App.tsx` is a `React.lazy` chunk (40+ of them). If one of
 * those chunks fails to arrive — a flaky mobile connection, an ad-blocker, a
 * corporate proxy, or a browser holding a stale HTML page that asks for a
 * hashed bundle the last deploy deleted — React throws during render. With no
 * boundary above it, the whole tree unmounts and the visitor gets a **blank
 * white page** with no message and no way forward. They do not report that; they
 * leave.
 *
 * This boundary turns that dead end into one sentence and a button. It is
 * mounted twice on purpose:
 *
 *   1. in `main.tsx`, around `<App />`, so a failure in the shell itself still
 *      renders something;
 *   2. in `App.tsx`, around the route content, so a single broken route keeps
 *      the header, navigation and footer usable instead of replacing the site.
 *
 * It deliberately does not retry automatically. React would immediately
 * re-throw on the same broken chunk and loop; a reload is the one action that
 * genuinely re-resolves the bundle graph.
 */

type RouteErrorBoundaryProps = {
  children: React.ReactNode;
  /** Rendered language. Omitted ⇒ derived from the URL so a shell failure is still localised. */
  lang?: "en" | "bn";
  /**
   * Change this to clear a caught error — `App` passes the current path, so
   * navigating away from a broken route does not leave the visitor stuck on the
   * fallback for the rest of the session.
   */
  resetKey?: string;
};

type RouteErrorBoundaryState = { error: Error | null };

function languageFromUrl(): "en" | "bn" {
  if (typeof window === "undefined") return "en";
  const path = window.location.pathname;
  return path === "/bn" || path.startsWith("/bn/") ? "bn" : "en";
}

export class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Never swallowed silently: a blank page is silent, a logged failure is
    // something the owner or a future maintainer can find in the console.
    console.error("[URAL] a route failed to render:", error, info?.componentStack);
  }

  componentDidUpdate(previous: RouteErrorBoundaryProps) {
    if (previous.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  /** Move the keyboard/screen-reader cursor to the message, not to the shell. */
  private focusHeading = (node: HTMLHeadingElement | null) => {
    if (!node) return;
    if (typeof document !== "undefined" && document.activeElement === node) return;
    node.focus();
  };

  private reload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    const lang = this.props.lang ?? languageFromUrl();
    const isBn = lang === "bn";
    const homeHref = isBn ? "/bn" : "/";

    return (
      <div
        role="alert"
        className="mx-auto my-10 max-w-2xl rounded-2xl border border-white/15 bg-brand-navy px-6 py-10 text-center sm:my-16 sm:px-10"
      >
        <h1
          ref={this.focusHeading}
          tabIndex={-1}
          className="font-serif text-2xl font-bold text-white outline-none sm:text-3xl"
        >
          {isBn ? "পৃষ্ঠাটি লোড হয়নি" : "This page didn’t load"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-200">
          {isBn
            ? "পৃষ্ঠাটি লোড করার সময় একটি সমস্যা হয়েছে। সাধারণত এটি সাময়িক — আবার লোড করলে ঠিক হয়ে যায়। আপনার তথ্য বা বুকিং কোথাও পাঠানো হয়নি।"
            : "Something went wrong while loading this page. It is usually temporary, and reloading fixes it. Nothing was sent or booked."}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={this.reload}
            className="min-h-11 rounded-xl bg-[#F6B73C] px-5 py-3 text-sm font-black uppercase tracking-wider text-brand-navy transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isBn ? "পৃষ্ঠাটি আবার লোড করুন" : "Reload the page"}
          </button>
          <a
            href={homeHref}
            className="min-h-11 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#F6B73C]/60 hover:text-[#F6B73C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isBn ? "হোমপেজে যান" : "Go to the homepage"}
          </a>
        </div>
      </div>
    );
  }
}
