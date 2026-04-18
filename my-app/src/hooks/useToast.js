import React, { useState } from "react";
import Icon from "../Shared/icons/Icon";

export default function useToast() {
  const [t, setT] = useState(null);
  const show = (msg, tone = "ok") => {
    setT({ msg, tone });
    setTimeout(() => setT(null), 2400);
  };
  const ui = t && (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 500,
        padding: "14px 18px",
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: 10,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5)",
        animation: "slideInR .3s ease",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: t.tone === "ok" ? "var(--reed)" : "var(--terracotta)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--paper)",
        }}
      >
        <Icon.Check s={13} />
      </div>
      {t.msg}
    </div>
  );
  return [ui, show];
}
