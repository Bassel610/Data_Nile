import React from "react";
import NileFlow from "../../Shared/ui/NileFlow";
import Btn from "../../Shared/ui/Btn";
import Icon from "../../Shared/icons/Icon";

export default function ContactBand({ onConnect }) {
  return (
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
          <Btn kind="gold" size="lg" onClick={onConnect} icon={<Icon.Arrow s={14} />}>
            Connect with us
          </Btn>
        </div>
      </div>
    </section>
  );
}
