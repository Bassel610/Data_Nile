import React from "react";
import Icon from "../../../Shared/icons/Icon";
import Btn from "../../../Shared/ui/Btn";
import { useContent } from "../../../store/DataNileStore";
import useContactForm from "../../../hooks/useContactForm";

function SuccessState() {
  return (
    <div style={{ padding: 60, textAlign: "center" }}>
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "var(--reed)",
          color: "var(--paper)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Icon.Check s={22} />
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          marginTop: 18,
        }}
      >
        Downstream.
      </div>
      <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}>
        We'll be in touch within a day.
      </div>
    </div>
  );
}

function FormField({ field, value, onChange }) {
  const sharedStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid var(--line)",
    borderRadius: 8,
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    background: "var(--sand)",
    color: "var(--ink)",
  };

  if (field.type === "textarea") {
    return (
      <textarea
        required
        rows="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...sharedStyle, resize: "vertical" }}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={sharedStyle}
      >
        <option value="">Choose…</option>
        {field.value.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      required
      type={field.id === "email" ? "email" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={sharedStyle}
    />
  );
}

export default function ContactModal({ open, onClose }) {
  const [c] = useContent();
  const { values, sent, err, busy, setField, submit } = useContactForm(onClose);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20,20,30,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn .25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 540,
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            padding: "22px 28px",
            borderBottom: "1px solid var(--line-soft)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--nile-deep)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Connect
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                marginTop: 4,
              }}
            >
              Let's flow together.
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              border: "none",
              background: "var(--sand-2)",
              width: 34,
              height: 34,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon.Close s={16} />
          </button>
        </div>
        {sent ? (
          <SuccessState />
        ) : (
          <form onSubmit={submit} style={{ padding: "24px 28px 28px" }}>
            {c.contactForm.map((f) => (
              <div key={f.id} style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10.5,
                    color: "var(--ink-3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 8,
                  }}
                >
                  {f.label}
                </label>
                <FormField
                  field={f}
                  value={values[f.id] || ""}
                  onChange={(val) => setField(f.id, val)}
                />
              </div>
            ))}
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
            <Btn
              kind="primary"
              size="lg"
              type="submit"
              style={{ width: "100%", justifyContent: "center" }}
              icon={<Icon.Arrow s={14} />}
            >
              {busy ? "Sending…" : "Send"}
            </Btn>
          </form>
        )}
      </div>
    </div>
  );
}
