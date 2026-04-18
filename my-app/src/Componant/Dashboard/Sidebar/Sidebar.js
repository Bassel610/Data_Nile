import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../Shared/icons/Icon";

export const SECTIONS = [
  { k: "home", l: "Manage Home Page", icon: "Database" },
  { k: "images", l: "Manage Images", icon: "Pyramid" },
  { k: "layout", l: "Manage Layout", icon: "Sun" },
  { k: "invites", l: "Invites", icon: "Bell" },
  { k: "password", l: "Reset Password", icon: "Shield" },
];

export default function Sidebar({ active, setActive, onLogout }) {
  return (
    <aside
      className="admin-sidebar"
      style={{
        width: 260,
        background: "var(--ink)",
        color: "var(--paper)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "24px 24px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            <path
              d="M6 22 Q 12 14, 18 22 T 30 22"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M6 16 Q 12 8, 18 16 T 30 16"
              stroke="var(--paper)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              Data Nile
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                opacity: 0.6,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: 3,
              }}
            >
              Admin Console
            </div>
          </div>
        </div>
      </div>
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
      <div
        style={{
          padding: 18,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "var(--paper)",
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Icon.Close s={12} /> Log out
        </button>
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            marginTop: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          view landing <Icon.External s={10} />
        </Link>
      </div>
    </aside>
  );
}
