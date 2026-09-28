import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
