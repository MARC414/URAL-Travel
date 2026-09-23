import { useEffect, useState } from 'react';

/**
 * Travelpayouts White Label search widget.
 * Renders the search form (#tpwl-search) and tickets (#tpwl-tickets) inside
 * an isolated sandbox so Travelpayouts' universal CSS resets cannot leak
 * into the main document or disrupt any host site fonts, margins, or Tailwind styling.
 */
export default function TravelpayoutsWidget() {
  const [iframeHeight, setIframeHeight] = useState(240);

  useEffect(() => {
    // Remove any previously injected global Travelpayouts CSS resets that may have leaked into host <head>
    const staleStyles = document.querySelectorAll('style[data-style-id="travelpayouts-css"], style[data-tpwl-style]');
    staleStyles.forEach((s) => s.remove());

    const staleScripts = document.querySelectorAll('script[data-tpwl-widget]');
    staleScripts.forEach((s) => s.remove());

    const handleMessage = (event) => {
      if (event.data && event.data.type === 'tpwl-resize' && typeof event.data.height === 'number') {
        const measured = Math.ceil(event.data.height);
        if (measured >= 100) {
          setIframeHeight((prev) => {
            // Guard against micro-fluctuations and infinite loops
            if (Math.abs(prev - measured) >= 6) {
              return measured;
            }
            return prev;
          });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow-sm">
      <iframe
        src="/travelpayouts-wl.html"
        title="Travelpayouts White Label Flight Search"
        className="w-full border-0 block"
        style={{
          height: `${iframeHeight}px`,
          minHeight: '180px',
          width: '100%',
          display: 'block'
        }}
        loading="lazy"
      />
    </div>
  );
}
