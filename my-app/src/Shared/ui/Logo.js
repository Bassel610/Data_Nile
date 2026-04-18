import React from "react";

export default function Logo({ size = 36, variant = "default" }) {
  const primary = variant === "dark" ? "var(--gold)" : "var(--nile-deep)";
  const mid = variant === "dark" ? "var(--paper)" : "var(--nile-mid)";
  const teal = variant === "dark" ? "var(--paper)" : "var(--nile-teal)";
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path
        d="M6 22 Q 12 14, 18 22 T 30 22"
        stroke={primary}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 16 Q 12 8, 18 16 T 30 16"
        stroke={mid}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M6 28 Q 12 20, 18 28 T 30 28"
        stroke={teal}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
