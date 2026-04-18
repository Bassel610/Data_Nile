import React from "react";
import { useContent } from "../../../store/DataNileStore";

export default function OurService() {
  const [c] = useContent();
  return (
    <section
      id="services"
      style={{
        padding: "clamp(70px, 9vw, 120px) clamp(24px, 5vw, 64px)",
        background: "var(--sand-2)",
        borderTop: "1px solid var(--line-soft)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--terracotta)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 1,
                  background: "var(--terracotta)",
                }}
              />
              What we do
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontSize: "clamp(36px, 4.6vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: 0,
                textWrap: "balance",
                maxWidth: 700,
              }}
            >
              {c.services.title}
            </h2>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-l)",
            overflow: "hidden",
            background: "var(--paper)",
          }}
        >
          {c.services.items.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "clamp(28px, 3vw, 44px)",
                borderRight:
                  (i + 1) % 4 !== 0 ? "1px solid var(--line)" : "none",
                borderBottom: "1px solid var(--line)",
                transition: "background .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--sand)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  letterSpacing: "0.1em",
                }}
              >
                0{i + 1}
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
                {s.t}
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
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
