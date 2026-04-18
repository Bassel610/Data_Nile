import React from "react";

export default function ThemePaletteRow({ varKey, options, picked, onPick }) {
  const current = picked[varKey] || options[0];
  return (
    <div
      className="layout-row"
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px dashed var(--line)",
      }}
    >
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)" }}>
          {varKey}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "var(--ink-3)",
            marginTop: 4,
          }}
        >
          {current}
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        {options.map((v) => {
          const active = current === v;
          return (
            <button
              key={v}
              onClick={() => onPick(varKey, v)}
              aria-label={`Pick ${varKey} ${v}`}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: v,
                border: active ? "2px solid var(--ink)" : "1px solid var(--line)",
                outline: active ? "3px solid var(--sand)" : "none",
                outlineOffset: -5,
                cursor: "pointer",
                padding: 0,
                transition: "transform .15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          );
        })}
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1.5px dashed var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </span>
          custom
          <input
            type="color"
            style={{ display: "none" }}
            onChange={(e) => onPick(varKey, e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
