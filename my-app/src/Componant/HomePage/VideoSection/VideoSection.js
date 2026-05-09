import React from "react";
import NileFlow from "../../Shared/ui/NileFlow";

export default function VideoSection() {
  return (
    <section
      style={{
        padding: "clamp(60px, 7vw, 100px) clamp(24px, 5vw, 64px)",
        background: "var(--sand)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 8.5",
            borderRadius: "var(--radius-l)",
            background:
              "linear-gradient(135deg, var(--nile-deep), var(--nile-mid) 60%, var(--nile-teal))",
            overflow: "hidden",
            boxShadow: "0 30px 80px -30px rgba(20,30,50,0.35)",
          }}
        >
          <NileFlow speed={0.6} opacity={0.45} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "var(--paper)",
            }}
          >
            <button
              aria-label="Play video"
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              <svg width="22" height="24" viewBox="0 0 22 24" fill="white">
                <path d="M0 0 L22 12 L0 24 Z" />
              </svg>
            </button>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 28,
                opacity: 0.8,
              }}
            >
              Our story · 2 min
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3.2vw, 40px)",
                marginTop: 10,
                textWrap: "balance",
                maxWidth: 640,
                textAlign: "center",
                lineHeight: 1.2,
                padding: "0 40px",
              }}
            >
              How three companies built their data teams in under a week.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
