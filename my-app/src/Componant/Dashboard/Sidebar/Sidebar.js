import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

export { SECTIONS } from "../../../constants/sections";

export default function Sidebar({ active, setActive, onLogout }) {
  return (
    <aside
      className="admin-sidebar"
      style={{
        width: 260,
        background: "var(--ink)",
        color: "var(--paper)",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <SidebarHeader />
      <SidebarNav active={active} setActive={setActive} />
      <SidebarFooter onLogout={onLogout} />
    </aside>
  );
}
