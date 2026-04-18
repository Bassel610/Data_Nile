import React from "react";

export default function SidebarHeader() {
  return (
    <div
      style={{
        padding: "24px 24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <path
            d="M6 22 Q 12 14, 18 22 T 30 22"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M6 16 Q 12 8, 18 16 T 30 16"
            stroke="var(--paper)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            Data Nile
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              opacity: 0.6,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 3,
            }}
          >
            Admin Console
          </div>
        </div>
      </div>
    </div>
  );
}
