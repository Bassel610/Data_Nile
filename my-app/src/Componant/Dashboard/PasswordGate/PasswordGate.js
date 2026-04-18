import React from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

export default function PasswordGate({ onAuth }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--sand-2)",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: 16,
          padding: 40,
          boxShadow: "0 30px 60px -30px rgba(0,0,0,0.2)",
        }}
      >
        <LoginHeader />
        <LoginForm onAuth={onAuth} />
        <div
          style={{
            marginTop: 28,
            paddingTop: 20,
            borderTop: "1px dashed var(--line)",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "var(--ink-3)",
          }}
        >
          Hint — demo password:{" "}
          <strong style={{ color: "var(--ink-2)" }}>datanile</strong>
        </div>
      </div>
    </div>
  );
}
