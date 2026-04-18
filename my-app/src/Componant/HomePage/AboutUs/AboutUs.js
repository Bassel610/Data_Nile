import React from "react";
import { useContent } from "../../../store/DataNileStore";

const STATS = [
  { n: "2,400+", l: "vetted analysts" },
  { n: "94%", l: "retention rate" },
  { n: "3.2 days", l: "avg. time to hire" },
];

export default function AboutUs() {
  const [c] = useContent();
  return (
    <section
      id="about"
      style={{
        padding: "clamp(70px, 9vw, 120px) clamp(24px, 5vw, 64px)",
        background: "var(--sand-2)",
        borderTop: "1px solid var(--line-soft)",
      }}
    >
      <div
        className="about-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        <div className="about-sticky" style={{ position: "sticky", top: 100 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--nile-deep)",
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
                background: "var(--nile-deep)",
              }}
            />
            About
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontStyle: "italic",
              color: "var(--ink-3)",
              lineHeight: 1.5,
              textWrap: "pretty",
            }}
          >
            "The river doesn't hurry, yet it arrives."
          </div>
        </div>
        <div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.6vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {c.about.title}
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--ink-2)",
              lineHeight: 1.6,
              marginTop: 28,
              textWrap: "pretty",
            }}
          >
            {c.about.description}
          </p>
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
            {STATS.map((s) => (
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
        </div>
      </div>
    </section>
  );
}
