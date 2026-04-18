import React from "react";

const sizes = {
  sm: { pad: "7px 12px", fs: 12 },
  md: { pad: "10px 16px", fs: 13 },
  lg: { pad: "14px 22px", fs: 15 },
};

const kinds = {
  primary: { bg: "var(--ink)", fg: "var(--paper)", bd: "var(--ink)" },
  secondary: { bg: "transparent", fg: "var(--ink)", bd: "var(--line)" },
  ghost: { bg: "transparent", fg: "var(--ink)", bd: "transparent" },
  nile: { bg: "var(--nile-deep)", fg: "var(--paper)", bd: "var(--nile-deep)" },
  gold: { bg: "var(--gold)", fg: "var(--ink)", bd: "var(--gold)" },
};

export default function Btn({
  children,
  kind = "primary",
  onClick,
  size = "md",
  icon,
  style,
  type = "button",
  ...rest
}) {
  const sz = sizes[size] || sizes.md;
  const kd = kinds[kind] || kinds.primary;
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: sz.pad,
        fontSize: sz.fs,
        fontWeight: 500,
        background: kd.bg,
        color: kd.fg,
        border: `1px solid ${kd.bd}`,
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        transition: "transform .12s ease, filter .18s ease",
        ...style,
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
