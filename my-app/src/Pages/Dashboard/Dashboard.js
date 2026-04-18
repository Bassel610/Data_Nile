import React, { useEffect, useState } from "react";
import PasswordGate from "../../Componant/Dashboard/PasswordGate/PasswordGate";
import Sidebar from "../../Componant/Dashboard/Sidebar/Sidebar";
import ManageHome from "../../Componant/Dashboard/EditHomePage";
import ManageImages from "../../Componant/Dashboard/Image/mange_Image";
import MangeLayout from "../../Componant/Dashboard/layout/MangeLayout";
import Invites from "../../Componant/Dashboard/Invites/Invites";
import ResetPassword from "../../Componant/Dashboard/ResetPassword/ResetPassword";
import useToast from "../../hooks/useToast";
import { refreshTheme } from "../../store/theme";
import { api, hasToken, setToken } from "../../api/client";
import "./Dashboard.css";

const SECTION_KEY = "datanile_admin_section";

export default function Dashboard() {
  const [authed, setAuthed] = useState(() => hasToken());
  const [active, setActive] = useState(
    () => localStorage.getItem(SECTION_KEY) || "home"
  );
  const [toastUI, toast] = useToast();

  useEffect(() => {
    localStorage.setItem(SECTION_KEY, active);
  }, [active]);

  useEffect(() => {
    refreshTheme();
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  const onLogout = async () => {
    try {
      await api.logout();
    } catch {}
    setToken("");
    setAuthed(false);
  };

  return (
    <div className="admin-shell" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={active} setActive={setActive} onLogout={onLogout} />
      <main
        className="admin-main"
        style={{
          flex: 1,
          background: "var(--sand-2)",
          minWidth: 0,
        }}
      >
        {active === "home" && <ManageHome toast={toast} />}
        {active === "images" && <ManageImages toast={toast} />}
        {active === "layout" && <MangeLayout toast={toast} />}
        {active === "invites" && <Invites toast={toast} />}
        {active === "password" && <ResetPassword toast={toast} />}
      </main>
      {toastUI}
    </div>
  );
}
