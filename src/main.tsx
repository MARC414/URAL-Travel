import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent ResizeObserver loop limit errors from showing up as unhandled exceptions or disrupting the experience
if (typeof window !== "undefined") {
  const isResizeObserverError = (msg?: string) => {
    if (!msg) return false;
    return (
      msg.includes("ResizeObserver") ||
      msg.includes("loop completed with undelivered notifications") ||
      msg.includes("loop limit exceeded")
    );
  };

  // Override standard window.onerror to suppress these errors globally across all render frames and overlays
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const errorMsg = typeof message === "string" ? message : (message ? message.toString() : "");
    if (isResizeObserverError(errorMsg) || (error && isResizeObserverError(error.message))) {
      return true; // Suppresses standard error logging and overlay triggering
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener("error", (e) => {
    if (e.message && isResizeObserverError(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });

  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason && e.reason.message && isResizeObserverError(e.reason.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
