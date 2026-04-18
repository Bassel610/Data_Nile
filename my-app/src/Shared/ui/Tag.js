import React from "react";

const tones = {
  neutral: { bg: "var(--sand-2)", fg: "var(--ink-2)", bd: "var(--line)" },
  nile: {
    bg: "color-mix(in oklch, var(--nile-deep) 12%, transparent)",
    fg: "var(--nile-deep)",
    bd: "color-mix(in oklch, var(--nile-deep) 25%, transparent)",
  },
  reed: {
    bg: "color-mix(in oklch, var(--reed) 14%, transparent)",
    fg: "var(--reed)",
    bd: "color-mix(in oklch, var(--reed) 30%, transparent)",
  },
  gold: {
    bg: "color-mix(in oklch, var(--gold) 18%, transparent)",
    fg: "color-mix(in oklch, var(--gold) 80%, var(--ink) 20%)",
    bd: "color-mix(in oklch, var(--gold) 40%, transparent)",
  },
  terra: {
    bg: "color-mix(in oklch, var(--terracotta) 14%, transparent)",
    fg: "var(--terracotta)",
    bd: "color-mix(in oklch, var(--terracotta) 30%, transparent)",
  },
};

export default function Tag({ children, tone = "neutral" }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        letterSpacing: "0.04em",
        padding: "3px 8px",
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        borderRadius: 4,
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}
