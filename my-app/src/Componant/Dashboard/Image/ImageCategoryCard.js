import React from "react";
import { Card } from "../common/primitives";
import Icon from "../../../Shared/icons/Icon";
import { IMAGE_PLACEHOLDERS } from "../constants/imageCategories";

export default function ImageCategoryCard({ k, l, onNotify }) {
  const placeholders = IMAGE_PLACEHOLDERS[k];
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>{l}</div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>
          {placeholders.length} items
        </span>
      </div>
      <div
        style={{
          border: "1.5px dashed var(--line)",
          borderRadius: 10,
          padding: 24,
          background: "var(--sand)",
          textAlign: "center",
          cursor: "pointer",
          transition: "all .2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--nile-deep)";
          e.currentTarget.style.background =
            "color-mix(in oklch, var(--nile-deep) 4%, var(--sand))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
          e.currentTarget.style.background = "var(--sand)";
        }}
        onClick={() => onNotify("Drag & drop (demo)")}
      >
        <div style={{ color: "var(--nile-deep)" }}>
          <Icon.Plus s={22} />
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 8 }}>
          Drop files or click to browse
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "var(--ink-3)",
            marginTop: 4,
          }}
        >
          PNG, JPG, WebP · up to 10 MB
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginTop: 16,
        }}
      >
        {placeholders.map((bg, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${bg}, color-mix(in oklch, ${bg} 60%, var(--ink)))`,
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              border: i === 0 && k === "logos" ? "2px solid var(--gold)" : "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                padding: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {k}_{i + 1}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
