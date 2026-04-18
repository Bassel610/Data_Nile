// Mock data for Data Nile

const ANALYSTS = [
  { id: 'a1', name: 'Amira Saleh', title: 'Senior Data Analyst', loc: 'Cairo · remote', rate: 95, rating: 4.9, jobs: 142,
    skills: ['SQL', 'Python', 'Looker', 'dbt'], industries: ['Fintech', 'E-commerce'], avail: 'Available now',
    color: 'oklch(0.76 0.12 75)', init: 'AS',
    bio: 'Ten years turning messy transactional data into revenue retention models. Former lead at two Series-B fintechs.' },
  { id: 'a2', name: 'Marcus Okafor', title: 'ML & Analytics Engineer', loc: 'Lagos · remote', rate: 120, rating: 4.95, jobs: 87,
    skills: ['Python', 'PyTorch', 'Snowflake', 'Airflow'], industries: ['SaaS', 'Logistics'], avail: 'Available in 1wk',
    color: 'oklch(0.58 0.12 45)', init: 'MO',
    bio: 'Builds forecasting pipelines that actually ship. Owns the full stack from warehouse to dashboard.' },
  { id: 'a3', name: 'Leila Haddad', title: 'BI Lead', loc: 'Beirut · hybrid', rate: 85, rating: 4.8, jobs: 204,
    skills: ['Tableau', 'SQL', 'BigQuery', 'LookML'], industries: ['Retail', 'Media'], avail: 'Available now',
    color: 'oklch(0.55 0.10 150)', init: 'LH',
    bio: 'Executive dashboards that survive scrutiny. I translate KPIs into stories boards trust.' },
  { id: 'a4', name: 'Ravi Chandran', title: 'Data Scientist', loc: 'Bangalore · remote', rate: 105, rating: 4.85, jobs: 61,
    skills: ['Python', 'R', 'Causal Inference', 'Experimentation'], industries: ['Marketplaces', 'Consumer'], avail: 'Booked until May',
    color: 'oklch(0.48 0.09 225)', init: 'RC',
    bio: 'Experimentation platforms & A/B analytics. I sniff out p-hacking from three rooms away.' },
  { id: 'a5', name: 'Sofia Moretti', title: 'Analytics Engineer', loc: 'Milan · remote', rate: 90, rating: 4.7, jobs: 118,
    skills: ['dbt', 'SQL', 'Snowflake', 'GitHub'], industries: ['B2B SaaS', 'Fintech'], avail: 'Available now',
    color: 'oklch(0.62 0.08 195)', init: 'SM',
    bio: 'I make your warehouse legible. Clean models, tested everywhere, documented like a textbook.' },
  { id: 'a6', name: 'Jordan Pierce', title: 'Product Data Scientist', loc: 'Austin · hybrid', rate: 115, rating: 4.9, jobs: 73,
    skills: ['Python', 'Mixpanel', 'SQL', 'Amplitude'], industries: ['Consumer', 'SaaS'], avail: 'Available in 2wk',
    color: 'oklch(0.35 0.08 235)', init: 'JP',
    bio: 'Product analytics from first event to quarterly OKR. I write the metric spec AND defend it.' },
];

const PROJECTS = [
  { id: 'p1', title: 'Revenue cohort analysis', co: 'Harbor Logistics', budget: '$4,800', status: 'active', analyst: 'Amira Saleh', progress: 62, due: 'May 02', tasks: 18, done: 11 },
  { id: 'p2', title: 'Churn prediction model', co: 'Acacia Financial', budget: '$12,400', status: 'active', analyst: 'Marcus Okafor', progress: 34, due: 'May 18', tasks: 24, done: 8 },
  { id: 'p3', title: 'Warehouse rebuild (dbt)', co: 'Noon Commerce', budget: '$8,900', status: 'review', analyst: 'Sofia Moretti', progress: 88, due: 'Apr 25', tasks: 12, done: 11 },
  { id: 'p4', title: 'Exec KPI dashboard', co: 'Minaret Media', budget: '$3,200', status: 'active', analyst: 'Leila Haddad', progress: 45, due: 'May 10', tasks: 9, done: 4 },
  { id: 'p5', title: 'Pricing experiment readout', co: 'Felucca Travel', budget: '$5,600', status: 'draft', analyst: '—', progress: 0, due: '—', tasks: 6, done: 0 },
];

const APPLICATIONS = [
  { id: 'ap1', role: 'Cohort analysis', analyst: 'Amira Saleh', at: '3m ago', match: 96 },
  { id: 'ap2', role: 'Churn model', analyst: 'Jordan Pierce', at: '14m ago', match: 92 },
  { id: 'ap3', role: 'Cohort analysis', analyst: 'Ravi Chandran', at: '38m ago', match: 89 },
  { id: 'ap4', role: 'KPI dashboard', analyst: 'Leila Haddad', at: '1h ago', match: 94 },
  { id: 'ap5', role: 'Pricing readout', analyst: 'Marcus Okafor', at: '2h ago', match: 87 },
];

// Simulated time-series — "flow" data
const FLOW_SERIES = [
  { k: 'Mon', matches: 28, applications: 94, hires: 6 },
  { k: 'Tue', matches: 44, applications: 112, hires: 9 },
  { k: 'Wed', matches: 39, applications: 128, hires: 8 },
  { k: 'Thu', matches: 58, applications: 146, hires: 12 },
  { k: 'Fri', matches: 71, applications: 168, hires: 14 },
  { k: 'Sat', matches: 52, applications: 102, hires: 7 },
  { k: 'Sun', matches: 46, applications: 88, hires: 5 },
];

const SKILLS_ALL = ['SQL','Python','dbt','Snowflake','BigQuery','Tableau','Looker','LookML','Airflow','PyTorch','R','Mixpanel','Amplitude','GitHub','Causal Inference','Experimentation'];
const INDUSTRIES = ['All industries','Fintech','E-commerce','SaaS','Logistics','Retail','Media','Marketplaces','Consumer','B2B SaaS'];

Object.assign(window, { ANALYSTS, PROJECTS, APPLICATIONS, FLOW_SERIES, SKILLS_ALL, INDUSTRIES });
