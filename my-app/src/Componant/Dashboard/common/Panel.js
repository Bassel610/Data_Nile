import React from "react";

export default function Panel({ kicker, title, sub, actions, children }) {
  return (
    <div style={{ padding: "clamp(28px, 4vw, 56px)", maxWidth: 1100 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 20,
          marginBottom: 36,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--nile-deep)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 20,
                height: 1,
                background: "var(--nile-deep)",
              }}
            />
            {kicker}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(32px, 3.6vw, 46px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          {sub && (
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                marginTop: 10,
                maxWidth: 620,
                textWrap: "pretty",
                lineHeight: 1.55,
              }}
            >
              {sub}
            </p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}
