"use client";
import { useState } from "react";

export default function ReadMore({ children, limit = 100 }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = children.length > limit;

  if (!isLong) return <p>{children}</p>;

  return (
    <p>
      {expanded ? children : `${children.slice(0, limit)}... `}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "none",
          border: "none",
          color: "#0070f3",
          cursor: "pointer",
          padding: 0,
          margin: 0,
          fontWeight: "bold",
        }}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </p>
  );
}
