import React from "react";
import TravelpayoutsWidget from "./TravelpayoutsWidget.jsx";

interface TravelpayoutsEmbedProps {
  defaultOrigin?: string;
  defaultDestination?: string;
  showQuickRoutes?: boolean;
}

export function TravelpayoutsEmbed({
  defaultOrigin = "DAC",
  defaultDestination = "KTM",
  showQuickRoutes = true,
}: TravelpayoutsEmbedProps = {}) {
  return (
    <div id="tp-embed-container" className="w-full">
      <TravelpayoutsWidget
        defaultOrigin={defaultOrigin}
        defaultDestination={defaultDestination}
        showQuickRoutes={showQuickRoutes}
      />
    </div>
  );
}
