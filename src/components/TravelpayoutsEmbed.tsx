import React from "react";
import TravelpayoutsWidget from "./TravelpayoutsWidget.jsx";

interface TravelpayoutsEmbedProps {
  defaultOrigin?: string;
  defaultDestination?: string;
  showQuickRoutes?: boolean;
  lang?: "en" | "bn";
  onOpenPriceAlert?: (dest?: string) => void;
}

export function TravelpayoutsEmbed({
  defaultOrigin = "DAC",
  defaultDestination = "KTM",
  showQuickRoutes = true,
  lang = "en",
  onOpenPriceAlert,
}: TravelpayoutsEmbedProps = {}) {
  return (
    <div id="tp-embed-container" className="w-full">
      <TravelpayoutsWidget
        defaultOrigin={defaultOrigin}
        defaultDestination={defaultDestination}
        showQuickRoutes={showQuickRoutes}
        lang={lang}
        onOpenPriceAlert={onOpenPriceAlert}
      />
    </div>
  );
}
