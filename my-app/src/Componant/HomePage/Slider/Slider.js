import React from "react";
import NileFlow from "../../../Shared/ui/NileFlow";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";
import { useContent } from "../../../store/DataNileStore";
import { buildSlides } from "../../../constants/heroSlides";
import HeroVisual from "./HeroVisual";
import useSlider from "../../../hooks/useSlider";

export default function Slider({ onConnect }) {
  const [c] = useContent();
  const slides = buildSlides(c.heroTitle, c.heroSub);
  const [i, setI] = useSlider(slides.length);

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
