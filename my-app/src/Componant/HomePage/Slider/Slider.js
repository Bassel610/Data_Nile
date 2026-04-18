import React, { useEffect, useState } from "react";
import NileFlow from "../../../Shared/ui/NileFlow";
import Btn from "../../../Shared/ui/Btn";
import Tag from "../../../Shared/ui/Tag";
import Avatar from "../../../Shared/ui/Avatar";
import Icon from "../../../Shared/icons/Icon";
import { useContent } from "../../../store/DataNileStore";
import { ANALYSTS } from "../../../data/analysts";

const HeroCard = ({ a }) => (
  <div
    style={{
      padding: 14,
      background: "var(--paper)",
      border: "1px solid var(--line)",
      borderRadius: 12,
      display: "flex",
      gap: 12,
      alignItems: "center",
      boxShadow: "0 20px 50px -20px rgba(20,30,50,0.25)",
    }}
  >
    <Avatar init={a.init} color={a.color} size={46} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
          }}
        >
          ${a.rate}/hr
        </div>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>
        {a.title}
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
        {a.skills.slice(0, 3).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </div>
  </div>
);

const HeroVisual = () => (
  <div className="hero-visual" style={{ position: "relative", height: 520 }}>
    <div
      style={{
        position: "absolute",
        right: 10,
        top: -20,
        opacity: 0.1,
        color: "var(--nile-deep)",
      }}
    >
      <svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M90 20 L170 160 L10 160 Z" />
        <path d="M90 20 L90 160 M10 160 L90 120 L170 160" />
        <path d="M30 160 L90 60 L150 160" />
      </svg>
    </div>
    {[
      { a: ANALYSTS[0], top: 30, left: 30, rot: -3, z: 3 },
      { a: ANALYSTS[4], top: 200, left: 70, rot: 2, z: 2 },
      { a: ANALYSTS[1], top: 350, left: 10, rot: -1, z: 1 },
    ].map((c, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: c.top,
          left: c.left,
          width: 340,
          transform: `rotate(${c.rot}deg)`,
          zIndex: c.z,
          animation: `floaty 8s ease-in-out ${i * -2}s infinite`,
        }}
      >
        <HeroCard a={c.a} />
      </div>
    ))}
  </div>
);

export default function Slider({ onConnect }) {
  const [c] = useContent();
  const slides = [
    {
      kicker: "Vetted data talent",
      title: c.heroTitle,
      sub: c.heroSub,
      tint: "var(--nile-deep)",
    },
    {
      kicker: "Shortlist in one hour",
      title: (
        <>
          Three analysts,{" "}
          <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
            ranked by fit.
          </em>
        </>
      ),
      sub: "Our matching engine screens thousands of profiles against your stack, industry, and timeline.",
      tint: "var(--terracotta)",
    },
    {
      kicker: "One contract, one dashboard",
      title: (
        <>
          No agencies.{" "}
          <em style={{ fontStyle: "italic", color: "var(--reed)" }}>
            No overhead.
          </em>
        </>
      ),
      sub: "Post a project, approve milestones, pay on delivery. Everything flows through one place.",
      tint: "var(--reed)",
    },
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, [slides.length]);

  const onLearnMore = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--sand)",
        padding:
          "clamp(60px, 8vw, 110px) clamp(24px, 5vw, 64px) clamp(40px, 5vw, 80px)",
      }}
    >
      <NileFlow speed={0.8} opacity={0.3} />
      <div
        className="hero-grid"
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          gap: 60,
          alignItems: "center",
          minHeight: 520,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11.5,
              color: slides[i].tint,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "color .6s",
            }}
          >
            <Icon.Wave s={14} /> {slides[i].kicker}
          </div>
          <h1
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(44px, 6.5vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              margin: "24px 0 0",
              textWrap: "balance",
              animation: "fadeUp .7s ease",
            }}
          >
            {slides[i].title}
          </h1>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--ink-2)",
              marginTop: 24,
              maxWidth: 560,
              textWrap: "pretty",
            }}
          >
            {slides[i].sub}
          </p>
          <div
            style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}
          >
            <Btn
              kind="primary"
              size="lg"
              icon={<Icon.Arrow s={14} />}
              onClick={onConnect}
            >
              Connect with us
            </Btn>
            <Btn kind="secondary" size="lg" onClick={onLearnMore}>
              Learn more
            </Btn>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 42 }}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`slide ${idx + 1}`}
                style={{
                  width: idx === i ? 36 : 10,
                  height: 4,
                  borderRadius: 2,
                  background: idx === i ? "var(--ink)" : "var(--line)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all .4s",
                }}
              />
            ))}
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
