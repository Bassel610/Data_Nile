import React from "react";
import HeroCard from "./HeroCard";
import { ANALYSTS } from "../../../data/analysts";

const CARDS = [
  { index: 0, top: 30, left: 30, rot: -3, z: 3 },
  { index: 4, top: 200, left: 70, rot: 2, z: 2 },
  { index: 1, top: 350, left: 10, rot: -1, z: 1 },
];

export default function HeroVisual() {
  return (
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
      {CARDS.map((c, i) => (
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
          <HeroCard analyst={ANALYSTS[c.index]} />
        </div>
      ))}
    </div>
  );
}
