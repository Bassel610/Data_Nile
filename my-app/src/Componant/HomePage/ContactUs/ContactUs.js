import React, { useState } from "react";
import NileFlow from "../../../Shared/ui/NileFlow";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";
import { useContent } from "../../../store/DataNileStore";
import { api } from "../../../api/client";

const ContactBand = ({ onConnect }) => (
  <section
    id="connect"
    style={{
      padding: "clamp(70px, 9vw, 120px) clamp(24px, 5vw, 64px)",
      background: "var(--ink)",
      color: "var(--paper)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <NileFlow speed={0.5} opacity={0.3} />
    <div
      className="contact-grid"
      style={{
        position: "relative",
        maxWidth: 1280,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: 60,
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--gold)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 24,
              height: 1,
              background: "var(--gold)",
            }}
          />
          Contact
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(36px, 4.8vw, 64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Your data team is three clicks away.
        </h2>
        <p
          style={{
            fontSize: 17,
            opacity: 0.75,
            marginTop: 20,
            maxWidth: 520,
            textWrap: "pretty",
            lineHeight: 1.55,
          }}
        >
          Tell us what you're building, and we'll send a shortlist within the
          day.
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Btn
          kind="gold"
          size="lg"
          onClick={onConnect}
          icon={<Icon.Arrow s={14} />}
        >
          Connect with us
        </Btn>
      </div>
    </div>
  </section>
);

const ContactModal = ({ open, onClose }) => {
  const [c] = useContent();
  const [values, setValues] = useState({});
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      await api.createInvite(values);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setValues({});
        onClose();
      }, 1800);
    } catch {
      setErr("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

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
            <div
              style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 8 }}
            >
              We'll be in touch within a day.
            </div>
          </div>
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
                {f.type === "textarea" ? (
                  <textarea
                    required
                    rows="3"
                    value={values[f.id] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.id]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      background: "var(--sand)",
                      color: "var(--ink)",
                      resize: "vertical",
                    }}
                  />
                ) : f.type === "select" ? (
                  <select
                    required
                    value={values[f.id] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.id]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      background: "var(--sand)",
                      color: "var(--ink)",
                    }}
                  >
                    <option value="">Choose…</option>
                    {f.value.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    required
                    type={f.id === "email" ? "email" : "text"}
                    value={values[f.id] || ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.id]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      background: "var(--sand)",
                      color: "var(--ink)",
                    }}
                  />
                )}
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
};

export default function ContactUs({ toggleForm, setToggleForm }) {
  const onOpen = () => setToggleForm(true);
  const onClose = () => setToggleForm(false);
  return (
    <>
      <ContactBand onConnect={onOpen} />
      <ContactModal open={!!toggleForm} onClose={onClose} />
    </>
  );
}

export { ContactBand, ContactModal };
