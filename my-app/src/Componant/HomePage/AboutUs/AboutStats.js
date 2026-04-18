import React from "react";
import { ABOUT_STATS } from "../../../constants/aboutStats";

export default function AboutStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 24,
        marginTop: 48,
        paddingTop: 32,
        borderTop: "1px solid var(--line)",
      }}
    >
      {ABOUT_STATS.map((s) => (
        <div key={s.l}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {s.n}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--ink-3)",
              marginTop: 8,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}
