import React from "react";

export default function ServiceCard({ service, index, isLastInRow }) {
  return (
    <div
      style={{
        padding: "clamp(28px, 3vw, 44px)",
        borderRight: isLastInRow ? "none" : "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        transition: "background .2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sand)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.1em",
        }}
      >
        0{index + 1}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          marginTop: 14,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          textWrap: "balance",
        }}
      >
        {service.t}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "var(--ink-2)",
          lineHeight: 1.55,
          marginTop: 14,
          textWrap: "pretty",
        }}
      >
        {service.d}
      </div>
    </div>
  );
}
