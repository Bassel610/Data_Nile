import React from "react";
import Panel from "../common/Panel";
import HeroEdit from "./HeroEdit";
import AboutEdit from "./AboutEdit";
import ServicesEdit from "./ServicesEdit";
import ContactFormEdit from "./ContactFormEdit";

export default function ManageHome({ toast }) {
  return (
    <Panel
      kicker="Home page"
      title="Manage home page content"
      sub="Edit what visitors see on the landing page — hero, about, services and the contact form."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <HeroEdit toast={toast} />
        <AboutEdit toast={toast} />
        <ServicesEdit toast={toast} />
        <ContactFormEdit toast={toast} />
      </div>
    </Panel>
  );
}
