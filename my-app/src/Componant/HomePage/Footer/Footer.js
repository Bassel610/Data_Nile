import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Shared/ui/Logo";
import Icon from "../../Shared/icons/Icon";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "48px clamp(24px,5vw,64px) 32px",
        background: "var(--sand)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={36} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>
            Data Nile
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              marginLeft: 16,
            }}
          >
            © {new Date().getFullYear()} · Flowing since forever
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
          }}
        >
          <Link
            to="/admin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            Admin <Icon.External s={10} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
