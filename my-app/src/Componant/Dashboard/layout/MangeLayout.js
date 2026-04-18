import React, { useState } from "react";
import Panel from "../common/Panel";
import { Card } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import {
  THEME_PALETTE,
  loadTheme,
  applyTheme,
  saveTheme,
  resetTheme,
} from "../../../store/theme";

export default function MangeLayout({ toast }) {
  const [picked, setPicked] = useState(() => loadTheme());

  const pick = (k, v) => {
    const next = { ...picked, [k]: v };
    setPicked(next);
    applyTheme(next);
    saveTheme(next);
  };

  const reset = () => {
    setPicked({});
    resetTheme();
    toast && toast("Theme reset");
  };

  return (
    <Panel
      kicker="Layout"
      title="Manage layout & theme"
      sub="Pick the palette visitors see on the landing page. Changes sync instantly."
      actions={
        <Btn kind="secondary" size="sm" onClick={reset}>
          Reset to defaults
        </Btn>
      }
    >
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {Object.entries(THEME_PALETTE).map(([key, options]) => (
            <div
              key={key}
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
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--ink-2)",
                  }}
                >
                  {key}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--ink-3)",
                    marginTop: 4,
                  }}
                >
                  {picked[key] || options[0]}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {options.map((v) => {
                  const active = (picked[key] || options[0]) === v;
                  return (
                    <button
                      key={v}
                      onClick={() => pick(key, v)}
                      aria-label={`Pick ${key} ${v}`}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: v,
                        border: active
                          ? "2px solid var(--ink)"
                          : "1px solid var(--line)",
                        outline: active ? "3px solid var(--sand)" : "none",
                        outlineOffset: -5,
                        cursor: "pointer",
                        padding: 0,
                        transition: "transform .15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
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
                    onChange={(e) => pick(key, e.target.value)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 18 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "var(--ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          Preview
        </div>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: 28,
              background:
                "linear-gradient(135deg, var(--nile-deep), var(--nile-mid))",
              color: "var(--paper)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                letterSpacing: "-0.015em",
              }}
            >
              The river flows.
            </div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
              This is how your landing hero will look.
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              padding: 16,
              gap: 10,
            }}
          >
            {["nile-deep", "terracotta", "reed", "gold"].map((t) => (
              <div
                key={t}
                style={{
                  padding: 14,
                  borderRadius: 8,
                  background: `var(--${t})`,
                  color: "var(--paper)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Panel>
  );
}
