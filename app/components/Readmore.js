"use client";

import { useState } from "react";

export default function ReadMore({
  children,
  collapsedHeight = 150,
  smartlink,
}) {
  const [hasRedirected, setHasRedirected] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (!hasRedirected) {
      // FIRST CLICK → SMARTLINK
      window.open(smartlink, "_blank", "noopener,noreferrer");
      setHasRedirected(true);
    } else {
      // SECOND CLICK → EXPAND CONTENT
      setExpanded(true);
    }
  };

  return (
    <div>
      <div
        style={{
          maxHeight: expanded ? "none" : `${collapsedHeight}px`,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        {children}
      </div>

      <button
        onClick={handleClick}
        style={{
          background: "none",
          border: "none",
          color: "#0070f3",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "0.6rem",
          padding: 0,
        }}
      >
        {expanded ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}
