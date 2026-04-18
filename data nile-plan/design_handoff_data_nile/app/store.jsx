// Shared store — admin edits flow into landing via localStorage
const STORE_KEY = 'datanile_content_v1';
const DEFAULT_CONTENT = {
  about: {
    title: "About Data Nile",
    description: "We connect growing companies with vetted data analysts and engineers across the region. One contract, one dashboard, and a team that flows with your roadmap — not against it."
  },
  services: {
    title: "Our Services",
    items: [
      { t: "Analytics on demand", d: "SQL, dashboards, and data storytelling — delivered by senior analysts, billed by the hour." },
      { t: "Warehouse & dbt", d: "From event streams to a clean semantic layer. We model it, test it, document it." },
      { t: "ML & forecasting", d: "Churn, demand, and experimentation platforms shipped end-to-end." },
      { t: "Executive dashboards", d: "The numbers your board actually reads — pressure-tested against scrutiny." },
    ]
  },
  contactForm: [
    { id: 'name', type: 'input', label: 'Full name', value: [''] },
    { id: 'email', type: 'input', label: 'Work email', value: [''] },
    { id: 'role', type: 'select', label: "I'm a…", value: ['Company hiring', 'Analyst looking for work', 'Just exploring'] },
    { id: 'budget', type: 'select', label: 'Budget range', value: ['< $5k', '$5k – $15k', '$15k – $50k', '$50k+'] },
    { id: 'msg', type: 'textarea', label: 'Tell us about your project', value: [''] },
  ],
  invites: [
    { id: 'i1', name: 'Layla Hussein', email: 'layla@acaciafin.com', role: 'Company hiring', budget: '$15k – $50k', msg: 'Need a churn model built on our transactional data. Snowflake.', at: '2h ago' },
    { id: 'i2', name: 'Omar Farid', email: 'omar@felucca.travel', role: 'Company hiring', budget: '$5k – $15k', msg: 'Quarterly exec dashboard. Mostly Stripe + HubSpot.', at: '5h ago' },
    { id: 'i3', name: 'Nadia Shams', email: 'nadia.shams@proton.me', role: 'Analyst looking for work', budget: '—', msg: "10 years SQL + dbt. Fintech & B2B SaaS. Let's talk.", at: 'yesterday' },
  ],
  heroTitle: "Where companies meet the data minds that move them.",
  heroSub: "Data Nile connects growing companies with vetted analysts — hire for a project, a quarter, or a whole roadmap.",
};

const getContent = () => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
  } catch { return DEFAULT_CONTENT; }
};
const setContent = (next) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('datanile:content'));
};

const useContent = () => {
  const [c, setC] = React.useState(getContent());
  React.useEffect(() => {
    const h = () => setC(getContent());
    window.addEventListener('datanile:content', h);
    window.addEventListener('storage', h);
    return () => { window.removeEventListener('datanile:content', h); window.removeEventListener('storage', h); };
  }, []);
  return [c, (patch) => setContent({ ...getContent(), ...patch })];
};

window.DataNileStore = { getContent, setContent, useContent, DEFAULT_CONTENT, STORE_KEY };
