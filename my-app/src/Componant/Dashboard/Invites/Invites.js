import React, { useCallback, useEffect, useState } from "react";
import Panel from "../common/Panel";
import { Card } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import Tag from "../../../Shared/ui/Tag";
import Icon from "../../../Shared/icons/Icon";
import { api } from "../../../api/client";

export default function Invites({ toast }) {
  const [invites, setInvites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      const list = await api.getInvites();
      setInvites(list);
      setErr("");
    } catch (ex) {
      setErr(ex.detail?.error || "Failed to load invites.");
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, [load]);

  const remove = async (id) => {
    try {
      await api.deleteInvite(id);
      setInvites((list) => list.filter((i) => i.id !== id));
      if (selected && selected.id === id) setSelected(null);
      toast && toast("Invite deleted");
    } catch {
      toast && toast("Delete failed", "err");
    }
  };

  return (
    <Panel
      kicker="Invites"
      title="Connect requests"
      sub="Every submission from the landing's Connect form lands here. Review and respond."
    >
      {err && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--terracotta)",
            marginBottom: 14,
          }}
        >
          {err}
        </div>
      )}
      <div
        className="invites-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 18,
        }}
      >
        <Card style={{ padding: 0 }}>
          <div
            style={{
              padding: "16px 22px",
              borderBottom: "1px solid var(--line-soft)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--ink-3)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {invites.length} in inbox
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--reed)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon.Dot s={6} fill="var(--reed)" /> live
            </div>
          </div>
          {invites.length === 0 && (
            <div
              style={{
                padding: 48,
                textAlign: "center",
                color: "var(--ink-3)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  color: "var(--ink-2)",
                }}
              >
                No invites yet.
              </div>
              <div style={{ fontSize: 13, marginTop: 6 }}>
                Submissions will appear here in real time.
              </div>
            </div>
          )}
          {invites.map((inv) => (
            <div
              key={inv.id}
              onClick={() => setSelected(inv)}
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid var(--line-soft)",
                cursor: "pointer",
                background:
                  selected?.id === inv.id ? "var(--sand)" : "transparent",
                transition: "background .15s",
              }}
              onMouseEnter={(e) => {
                if (selected?.id !== inv.id)
                  e.currentTarget.style.background =
                    "color-mix(in oklch, var(--sand) 60%, transparent)";
              }}
              onMouseLeave={(e) => {
                if (selected?.id !== inv.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 10,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 14.5 }}>
                  {inv.name || "—"}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--ink-3)",
                  }}
                >
                  {inv.at}
                </div>
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--ink-2)",
                  marginTop: 2,
                }}
              >
                {inv.email || "—"}
              </div>
              {inv.msg && (
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink-2)",
                    marginTop: 10,
                    lineHeight: 1.5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {inv.msg}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 10,
                  flexWrap: "wrap",
                }}
              >
                {inv.role && <Tag tone="nile">{inv.role}</Tag>}
                {inv.budget && inv.budget !== "—" && (
                  <Tag tone="gold">{inv.budget}</Tag>
                )}
              </div>
            </div>
          ))}
        </Card>

        <Card>
          {selected ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--ink-3)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Invite · {selected.at}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      marginTop: 6,
                    }}
                  >
                    {selected.name || "—"}
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close detail"
                  style={{
                    border: "none",
                    background: "var(--sand-2)",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon.Close s={13} />
                </button>
              </div>
              <div
                style={{
                  marginTop: 22,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {Object.entries(selected)
                  .filter(([k]) => !["id", "at", "name"].includes(k))
                  .map(([k, v]) => (
                    <div key={k}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10.5,
                          color: "var(--ink-3)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 4,
                        }}
                      >
                        {k.replace(/_/g, " ")}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--ink)",
                          lineHeight: 1.5,
                          textWrap: "pretty",
                        }}
                      >
                        {String(v ?? "—")}
                      </div>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 24,
                  paddingTop: 20,
                  borderTop: "1px solid var(--line-soft)",
                }}
              >
                <Btn
                  kind="primary"
                  size="sm"
                  onClick={() => {
                    if (selected.email)
                      window.location.href = `mailto:${selected.email}`;
                  }}
                  icon={<Icon.Arrow s={12} />}
                >
                  Reply
                </Btn>
                <Btn
                  kind="secondary"
                  size="sm"
                  onClick={() => remove(selected.id)}
                  style={{
                    color: "var(--terracotta)",
                    borderColor:
                      "color-mix(in oklch, var(--terracotta) 35%, transparent)",
                  }}
                >
                  Delete
                </Btn>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                color: "var(--ink-3)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  color: "var(--ink-2)",
                }}
              >
                Select an invite
              </div>
              <div style={{ fontSize: 13, marginTop: 6 }}>
                Pick one from the list to see full details.
              </div>
            </div>
          )}
        </Card>
      </div>
    </Panel>
  );
}
