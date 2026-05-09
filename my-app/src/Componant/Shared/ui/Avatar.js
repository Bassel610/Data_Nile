import React from "react";

export default function Avatar({ init, color, size = 36 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "var(--paper)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: size * 0.36,
        fontWeight: 600,
        letterSpacing: "0.05em",
        flexShrink: 0,
        boxShadow: "0 1px 0 rgba(0,0,0,0.04) inset",
      }}
    >
      {init}
    </div>
  );
}
