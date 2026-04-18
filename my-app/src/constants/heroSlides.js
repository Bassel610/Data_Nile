import React from "react";

export const STATIC_SLIDES = [
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

export const buildSlides = (heroTitle, heroSub) => [
  {
    kicker: "Vetted data talent",
    title: heroTitle,
    sub: heroSub,
    tint: "var(--nile-deep)",
  },
  ...STATIC_SLIDES,
];
