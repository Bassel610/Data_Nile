import React, { useState } from "react";
import Panel from "../common/Panel";
import { Card, Field, Input } from "../common/primitives";
import Btn from "../../Shared/ui/Btn";
import Icon from "../../Shared/icons/Icon";
import { api } from "../../../api/client";

export default function ResetPassword({ toast }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!p1 || !p2) return setErr("Both fields are required.");
    if (p1 !== p2) return setErr("Passwords do not match.");
    if (p1.length < 6) return setErr("Use at least 6 characters.");
    setErr("");
    setBusy(true);
    try {
      await api.changePassword(p1);
      setP1("");
      setP2("");
      toast && toast("Password reset");
    } catch (ex) {
      setErr(ex.detail?.error || "Could not reset password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel
      kicker="Security"
      title="Reset admin password"
      sub="Change the password required to enter this console."
    >
      <Card style={{ maxWidth: 500 }}>
        <form onSubmit={submit}>
          <Field label="New password">
            <Input
              type="password"
              value={p1}
              onChange={(e) => setP1(e.target.value)}
              placeholder="At least 6 characters"
              disabled={busy}
            />
          </Field>
          <Field label="Confirm password">
            <Input
              type="password"
              value={p2}
              onChange={(e) => setP2(e.target.value)}
              placeholder="Re-enter it"
              disabled={busy}
            />
          </Field>
          {err && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                color: "var(--terracotta)",
                marginBottom: 14,
              }}
            >
              {err}
            </div>
          )}
          <Btn
            kind="primary"
            size="lg"
            type="submit"
            style={{ width: "100%", justifyContent: "center" }}
            icon={<Icon.Check s={14} />}
          >
            {busy ? "Saving…" : "Update password"}
          </Btn>
        </form>
        <div
          style={{
            marginTop: 20,
            paddingTop: 18,
            borderTop: "1px dashed var(--line)",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "var(--ink-3)",
            lineHeight: 1.6,
          }}
        >
          Password is stored server-side. Existing sessions stay valid until
          you log out.
        </div>
      </Card>
    </Panel>
  );
}
