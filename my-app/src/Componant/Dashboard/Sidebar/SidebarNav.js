import React from "react";
import Icon from "../../../Shared/icons/Icon";
import { SECTIONS } from "../constants/sections";

export default function SidebarNav({ active, setActive }) {
  return (
    <nav
      className="admin-sidebar-nav"
      style={{
        flex: 1,
        padding: "18px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {SECTIONS.map((s) => {
        const IconEl = Icon[s.icon] || Icon.Dot;
        const isActive = active === s.k;
        return (
          <button
            key={s.k}
            onClick={() => setActive(s.k)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              textAlign: "left",
              background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              color: isActive ? "var(--gold)" : "var(--paper)",
              fontSize: 13.5,
              fontWeight: isActive ? 600 : 400,
              borderLeft: `2px solid ${isActive ? "var(--gold)" : "transparent"}`,
              transition: "all .15s",
            }}
          >
            <IconEl s={14} />
            {s.l}
          </button>
        );
      })}
    </nav>
  );
}
