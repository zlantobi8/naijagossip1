"use client";
import { useState } from "react";

export default function ReadMore({ children, collapsedHeight = 150 }) {
  const [expanded, setExpanded] = useState(false);

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
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "none",
          color: "#0070f3",
          cursor: "pointer",
          padding: 0,
          marginTop: "0.5rem",
          fontWeight: "bold",
        }}
      >
        {expanded ? "Leer menos" : "Leer más"}
      </button>
    </div>
  );
}
