import React from "react";
import Btn from "../ui/Btn";
import Logo from "../ui/Logo";
import Icon from "../icons/Icon";

const LINKS = [
  { l: "Home", id: "home" },
  { l: "About", id: "about" },
  { l: "Services", id: "services" },
  { l: "Contact", id: "connect" },
];

export default function Header({ onConnect }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px clamp(24px,5vw,64px)",
        background: "color-mix(in oklch, var(--sand) 88%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--line-soft)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={36} />
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            letterSpacing: "-0.01em",
          }}
        >
          Data Nile
        </div>
      </div>
      <div
        className="nav-links"
        style={{
          display: "flex",
          gap: 28,
          fontSize: 14,
          color: "var(--ink-2)",
        }}
      >
        {LINKS.map((n) => (
          <a key={n.id} href={`#${n.id}`}>
            {n.l}
          </a>
        ))}
      </div>
      <Btn
        kind="primary"
        size="sm"
        onClick={onConnect}
        icon={<Icon.Arrow s={12} />}
      >
        Connect
      </Btn>
    </nav>
  );
}
