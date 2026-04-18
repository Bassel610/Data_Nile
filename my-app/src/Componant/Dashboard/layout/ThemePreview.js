import React from "react";
import { Card } from "../common/primitives";

const PREVIEW_TOKENS = ["nile-deep", "terracotta", "reed", "gold"];

export default function ThemePreview() {
  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          color: "var(--ink-3)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 10,
        }}
      >
        Preview
      </div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: 28,
            background: "linear-gradient(135deg, var(--nile-deep), var(--nile-mid))",
            color: "var(--paper)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              letterSpacing: "-0.015em",
            }}
          >
            The river flows.
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
            This is how your landing hero will look.
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            padding: 16,
            gap: 10,
          }}
        >
          {PREVIEW_TOKENS.map((t) => (
            <div
              key={t}
              style={{
                padding: 14,
                borderRadius: 8,
                background: `var(--${t})`,
                color: "var(--paper)",
                fontSize: 12,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
