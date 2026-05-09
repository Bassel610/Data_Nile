import React from "react";
import { Card } from "../common/primitives";
import Tag from "../../Shared/ui/Tag";
import Icon from "../../Shared/icons/Icon";

export default function InviteList({ invites, selected, onSelect }) {
  return (
    <Card style={{ padding: 0 }}>
      <div
        style={{
          padding: "16px 22px",
          borderBottom: "1px solid var(--line-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {invites.length} in inbox
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--reed)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon.Dot s={6} fill="var(--reed)" /> live
        </div>
      </div>
      {invites.length === 0 && (
        <div style={{ padding: 48, textAlign: "center", color: "var(--ink-3)" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              color: "var(--ink-2)",
            }}
          >
            No invites yet.
          </div>
          <div style={{ fontSize: 13, marginTop: 6 }}>
            Submissions will appear here in real time.
          </div>
        </div>
      )}
      {invites.map((inv) => (
        <div
          key={inv.id}
          onClick={() => onSelect(inv)}
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid var(--line-soft)",
            cursor: "pointer",
            background: selected?.id === inv.id ? "var(--sand)" : "transparent",
            transition: "background .15s",
          }}
          onMouseEnter={(e) => {
            if (selected?.id !== inv.id)
              e.currentTarget.style.background =
                "color-mix(in oklch, var(--sand) 60%, transparent)";
          }}
          onMouseLeave={(e) => {
            if (selected?.id !== inv.id)
              e.currentTarget.style.background = "transparent";
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 10,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14.5 }}>{inv.name || "—"}</div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--ink-3)",
              }}
            >
              {inv.at}
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 }}>
            {inv.email || "—"}
          </div>
          {inv.msg && (
            <div
              style={{
                fontSize: 13,
                color: "var(--ink-2)",
                marginTop: 10,
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {inv.msg}
            </div>
          )}
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            {inv.role && <Tag tone="nile">{inv.role}</Tag>}
            {inv.budget && inv.budget !== "—" && (
              <Tag tone="gold">{inv.budget}</Tag>
            )}
          </div>
        </div>
      ))}
    </Card>
  );
}
