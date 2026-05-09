import React from "react";
import Avatar from "../../Shared/ui/Avatar";
import Tag from "../../Shared/ui/Tag";

export default function HeroCard({ analyst }) {
  const a = analyst;
  return (
    <div
      style={{
        padding: 14,
        background: "var(--paper)",
        border: "1px solid var(--line)",
        borderRadius: 12,
        display: "flex",
        gap: 12,
        alignItems: "center",
        boxShadow: "0 20px 50px -20px rgba(20,30,50,0.25)",
      }}
    >
      <Avatar init={a.init} color={a.color} size={46} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
            }}
          >
            ${a.rate}/hr
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>
          {a.title}
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
          {a.skills.slice(0, 3).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
