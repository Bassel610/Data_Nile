import React from "react";
import { Card } from "../common/primitives";
import Btn from "../../Shared/ui/Btn";
import Icon from "../../Shared/icons/Icon";

function EmptyState() {
  return (
    <div style={{ padding: 40, textAlign: "center", color: "var(--ink-3)" }}>
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
  );
}

export default function InviteDetail({ selected, onClose, onDelete }) {
  if (!selected) {
    return (
      <Card>
        <EmptyState />
      </Card>
    );
  }

  return (
    <Card>
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
          onClick={onClose}
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
          onClick={() => onDelete(selected.id)}
          style={{
            color: "var(--terracotta)",
            borderColor:
              "color-mix(in oklch, var(--terracotta) 35%, transparent)",
          }}
        >
          Delete
        </Btn>
      </div>
    </Card>
  );
}
