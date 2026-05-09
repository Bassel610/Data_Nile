import React, { useState } from "react";
import Btn from "../../Shared/ui/Btn";
import Icon from "../../Shared/icons/Icon";
import { api, setToken } from "../../../api/client";

export default function LoginForm({ onAuth }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      const { token } = await api.login(email, pw);
      setToken(token);
      onAuth();
    } catch (ex) {
      setToken("");
      setErr(
        ex.status === 401
          ? "Wrong email or password. Try again."
          : ex.status === 422
          ? "Email and password are required."
          : "Can't reach the server. Is it running?"
      );
      setTimeout(() => setErr(""), 2500);
    } finally {
      setBusy(false);
    }
  };

  const showError = !!err;

  const fieldStyle = {
    width: "100%",
    padding: "14px 16px",
    border: `1px solid ${showError ? "var(--terracotta)" : "var(--line)"}`,
    borderRadius: 10,
    fontSize: 15,
    background: "var(--sand)",
    color: "var(--ink)",
    transition: "border .2s",
  };

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        disabled={busy}
        placeholder="admin@datanile.local"
        autoComplete="username"
        style={fieldStyle}
      />
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        disabled={busy}
        placeholder="••••••••"
        autoComplete="current-password"
        style={{
          ...fieldStyle,
          marginTop: 12,
          letterSpacing: showError ? 0 : "0.2em",
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
  );
}
