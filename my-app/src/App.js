import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { applyTheme, loadTheme, refreshTheme } from "./store/theme";
import "./App.css";
import "./Responsive.css";

export default function App() {
  useEffect(() => {
    applyTheme(loadTheme());
    refreshTheme();
    const onEvt = () => applyTheme(loadTheme());
    window.addEventListener("storage", onEvt);
    window.addEventListener("datanile:theme", onEvt);
    return () => {
      window.removeEventListener("storage", onEvt);
      window.removeEventListener("datanile:theme", onEvt);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
