export const DEFAULT_CONTENT = {
  heroTitle: "Where companies meet the data minds that move them.",
  heroSub:
    "Data Nile connects growing companies with vetted analysts — hire for a project, a quarter, or a whole roadmap.",
  about: {
    title: "About Data Nile",
    description:
      "We connect growing companies with vetted data analysts and engineers across the region. One contract, one dashboard, and a team that flows with your roadmap — not against it.",
  },
  services: {
    title: "Our Services",
    items: [
      { t: "Analytics on demand", d: "SQL, dashboards, and data storytelling — delivered by senior analysts, billed by the hour." },
      { t: "Warehouse & dbt", d: "From event streams to a clean semantic layer. We model it, test it, document it." },
      { t: "ML & forecasting", d: "Churn, demand, and experimentation platforms shipped end-to-end." },
      { t: "Executive dashboards", d: "The numbers your board actually reads — pressure-tested against scrutiny." },
    ],
  },
  contactForm: [
    { id: "name", type: "input", label: "Full name", value: [""] },
    { id: "email", type: "input", label: "Work email", value: [""] },
    { id: "role", type: "select", label: "I'm a…", value: ["Company hiring", "Analyst looking for work", "Just exploring"] },
    { id: "budget", type: "select", label: "Budget range", value: ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"] },
    { id: "msg", type: "textarea", label: "Tell us about your project", value: [""] },
  ],
};
