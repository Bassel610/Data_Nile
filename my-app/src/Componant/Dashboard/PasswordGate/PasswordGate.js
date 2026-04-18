import React, { useState } from "react";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";
import Logo from "../../../Shared/ui/Logo";
import { api, setToken } from "../../../api/client";

export default function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      const { token } = await api.login(pw);
      setToken(token);
      onAuth();
    } catch (ex) {
      setToken("");
      setErr(
        ex.status === 401
          ? "Wrong password. Try again."
          : "Can't reach the server. Is it running?"
      );
      setTimeout(() => setErr(""), 2500);
    } finally {
      setBusy(false);
    }
  };

  const showError = !!err;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28,
          }}
        >
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
        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
            disabled={busy}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "14px 16px",
              border: `1px solid ${showError ? "var(--terracotta)" : "var(--line)"}`,
              borderRadius: 10,
              fontSize: 15,
              background: "var(--sand)",
              color: "var(--ink)",
              letterSpacing: showError ? 0 : "0.2em",
              transition: "border .2s",
            }}
          />
          {showError && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--terracotta)",
                marginTop: 8,
              }}
            >
              {err}
            </div>
          )}
          <Btn
            kind="primary"
            size="lg"
            type="submit"
            style={{ width: "100%", justifyContent: "center", marginTop: 16 }}
            icon={<Icon.Arrow s={14} />}
          >
            {busy ? "Checking…" : "Unlock"}
          </Btn>
        </form>
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
