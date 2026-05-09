import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../Shared/icons/Icon";

export default function SidebarFooter({ onLogout }) {
  return (
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
  );
}
