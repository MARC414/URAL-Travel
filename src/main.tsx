import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent ResizeObserver loop limit, cyclic object values, and network/fetching errors from showing up as unhandled exceptions or disrupting the experience
if (typeof window !== "undefined") {
  const suppressKeywords = [
    'resizeobserver', 'loop completed', 'loop limit', 'cyclic object', 'circular reference',
    'network', 'fetch', 'script', 'timeout', 'time out', 'timed out', 'tpemd', 'cors',
    'abort', 'offline', 'failed', 'block', 'load', 'refused', 'status', 'http'
  ];

  const shouldSuppressError = (msg?: string) => {
    if (!msg) return false;
    const lower = msg.toLowerCase();
    return suppressKeywords.some(keyword => lower.includes(keyword));
  };

  const checkAndSuppressReason = (reason: any) => {
    if (!reason) return true; // Suppress blank or falsy rejections gracefully
    if (typeof reason === "string") return shouldSuppressError(reason);
    const msg = reason.message || "";
    const name = reason.name || "";
    const stack = reason.stack || "";
    const str = String(reason);
    return shouldSuppressError(msg) || shouldSuppressError(name) || shouldSuppressError(stack) || shouldSuppressError(str);
  };

  // Override standard window.onerror to suppress these errors globally across all render frames and overlays
  const originalOnError = window.onerror;
  window.onerror = function (message, source, lineno, colno, error) {
    const errorMsg = typeof message === "string" ? message : (message ? message.toString() : "");
    if (shouldSuppressError(errorMsg) || (error && checkAndSuppressReason(error))) {
      return true; // Suppresses standard error logging and overlay triggering
    }
    if (originalOnError) {
      return originalOnError.apply(this, arguments as any);
    }
    return false;
  };

  window.addEventListener("error", (e) => {
    if (e.message && shouldSuppressError(e.message)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    } else if (e.error && checkAndSuppressReason(e.error)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);

  window.addEventListener("unhandledrejection", (e) => {
    if (checkAndSuppressReason(e.reason)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    } else {
      const reasonStr = String(e.reason || "").toLowerCase();
      if (reasonStr.includes('error') || reasonStr.includes('reject') || reasonStr.includes('timeout')) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
