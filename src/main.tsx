import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary.tsx";
import "./index.css";

// Prevent harmless ResizeObserver loop notifications or blocked third-party affiliate widget scripts from disrupting the page
if (typeof window !== "undefined") {
  window.addEventListener(
    "error",
    (e) => {
      const msg = String(e.message || "").toLowerCase();
      if (msg.includes("resizeobserver") || msg.includes("emrld")) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    },
    true
  );
}

// The boundary outside <App /> is the shell's own safety net: if the app tree
// throws before a route boundary can catch it, the visitor still gets a sentence
// and a reload button instead of a blank white page.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteErrorBoundary>
      <App />
    </RouteErrorBoundary>
  </StrictMode>
);
