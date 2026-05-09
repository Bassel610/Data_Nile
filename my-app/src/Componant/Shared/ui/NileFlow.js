import React, { useEffect, useState } from "react";

export default function NileFlow({ speed = 1, opacity = 0.35 }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      setT((x) => x + 0.4 * speed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const path = (offset, amp, freq) => {
    const pts = [];
    for (let x = 0; x <= 1200; x += 20) {
      const y =
        300 + Math.sin((x + t * (1 + offset * 0.3)) * freq) * amp + offset;
      pts.push(`${x},${y}`);
    }
    return `M0,600 L${pts.join(" L")} L1200,600 Z`;
  };

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
      }}
    >
      <defs>
        <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--nile-teal)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--nile-deep)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d={path(-20, 18, 0.012)} fill="var(--nile-teal)" opacity="0.22" />
      <path d={path(20, 22, 0.009)} fill="var(--nile-mid)" opacity="0.35" />
      <path d={path(60, 28, 0.007)} fill="url(#riverGrad)" opacity="0.55" />
    </svg>
  );
}
