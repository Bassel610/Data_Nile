import React from "react";
import Logo from "../../../Shared/ui/Logo";

export default function LoginHeader() {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <Logo size={32} />
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>
          Data Nile · Admin
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: 6,
        }}
      >
        Password required
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          lineHeight: 1.2,
          marginBottom: 24,
        }}
      >
        Enter the key to the control room.
      </div>
    </>
  );
}
