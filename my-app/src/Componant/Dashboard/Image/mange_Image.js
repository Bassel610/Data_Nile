import React from "react";
import Panel from "../common/Panel";
import { Card } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";

const CATEGORIES = [
  { k: "slider", l: "Slider" },
  { k: "gallery", l: "Gallery" },
  { k: "stored", l: "Stored photos" },
  { k: "logos", l: "Logos" },
];

const PLACEHOLDERS = {
  slider: [
    "oklch(0.55 0.10 230)",
    "oklch(0.58 0.12 45)",
    "oklch(0.55 0.10 150)",
  ],
  gallery: [
    "oklch(0.76 0.12 75)",
    "oklch(0.48 0.09 225)",
    "oklch(0.55 0.10 150)",
    "oklch(0.58 0.12 45)",
  ],
  stored: ["oklch(0.62 0.08 195)", "oklch(0.35 0.08 235)"],
  logos: ["oklch(0.32 0.07 235)", "oklch(0.20 0.02 250)"],
};

export default function ManageImages({ toast }) {
  const notify = (msg) => toast && toast(msg);
  return (
    <Panel
      kicker="Images"
      title="Manage images"
      sub="Drop in hero slider imagery, gallery shots, logos, and the photo library."
    >
      <div
        className="images-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 18,
        }}
      >
        {CATEGORIES.map((c) => (
          <Card key={c.k}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
                {c.l}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-3)",
                }}
              >
                {PLACEHOLDERS[c.k].length} items
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
              onClick={() => notify("Drag & drop (demo)")}
            >
              <div style={{ color: "var(--nile-deep)" }}>
                <Icon.Plus s={22} />
              </div>
              <div
                style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 8 }}
              >
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
              {PLACEHOLDERS[c.k].map((bg, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${bg}, color-mix(in oklch, ${bg} 60%, var(--ink)))`,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      i === 0 && c.k === "logos"
                        ? "2px solid var(--gold)"
                        : "none",
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
                    {c.k}_{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
        <Btn
          kind="primary"
          onClick={() => notify("Images uploaded")}
          icon={<Icon.Arrow s={13} />}
        >
          Upload all
        </Btn>
        <Btn kind="secondary" onClick={() => notify("Gallery opened")}>
          Open full gallery
        </Btn>
      </div>
    </Panel>
  );
}
