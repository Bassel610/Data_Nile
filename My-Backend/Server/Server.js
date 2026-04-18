const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const DATA_FILE = path.join(__dirname, "data.json");

const DEFAULT_DATA = {
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
  invites: [],
  theme: {},
  adminPassword: "datanile",
  sessions: [],
};

const CONTENT_KEYS = [
  "heroTitle",
  "heroSub",
  "about",
  "services",
  "contactForm",
];

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return { ...DEFAULT_DATA, ...JSON.parse(raw) };
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
      return { ...DEFAULT_DATA };
    }
    throw err;
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

function publicContent(data) {
  const out = {};
  CONTENT_KEYS.forEach((k) => (out[k] = data[k]));
  return out;
}

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ error: "Missing token" });
  readData()
    .then((data) => {
      if (!data.sessions.includes(token))
        return res.status(401).json({ error: "Invalid token" });
      next();
    })
    .catch(next);
}

app.get("/api/site-content", async (_req, res, next) => {
  try {
    const data = await readData();
    res.json(publicContent(data));
  } catch (err) {
    next(err);
  }
});

app.patch("/api/site-content", requireAuth, async (req, res, next) => {
  try {
    const data = await readData();
    const patch = req.body || {};
    CONTENT_KEYS.forEach((k) => {
      if (patch[k] !== undefined) data[k] = patch[k];
    });
    await writeData(data);
    res.json(publicContent(data));
  } catch (err) {
    next(err);
  }
});

app.get("/api/invites", requireAuth, async (_req, res, next) => {
  try {
    const data = await readData();
    res.json(data.invites);
  } catch (err) {
    next(err);
  }
});

app.post("/api/invites", async (req, res, next) => {
  try {
    const data = await readData();
    const entry = {
      id: "i" + Date.now(),
      at: "just now",
      ...req.body,
    };
    data.invites = [entry, ...data.invites];
    await writeData(data);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/invites/:id", requireAuth, async (req, res, next) => {
  try {
    const data = await readData();
    const before = data.invites.length;
    data.invites = data.invites.filter((i) => i.id !== req.params.id);
    if (data.invites.length === before)
      return res.status(404).json({ error: "Not found" });
    await writeData(data);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.get("/api/theme", async (_req, res, next) => {
  try {
    const data = await readData();
    res.json(data.theme || {});
  } catch (err) {
    next(err);
  }
});

app.patch("/api/theme", requireAuth, async (req, res, next) => {
  try {
    const data = await readData();
    data.theme = { ...(data.theme || {}), ...(req.body || {}) };
    await writeData(data);
    res.json(data.theme);
  } catch (err) {
    next(err);
  }
});

app.post("/api/admin/login", async (req, res, next) => {
  try {
    const { password } = req.body || {};
    const data = await readData();
    if (!password || password !== data.adminPassword)
      return res.status(401).json({ error: "Wrong password" });
    const token = crypto.randomBytes(24).toString("hex");
    data.sessions = [...(data.sessions || []), token].slice(-20);
    await writeData(data);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

app.post("/api/admin/logout", requireAuth, async (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
    const data = await readData();
    data.sessions = (data.sessions || []).filter((t) => t !== token);
    await writeData(data);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.post("/api/admin/password", requireAuth, async (req, res, next) => {
  try {
    const { password } = req.body || {};
    if (!password || password.length < 6)
      return res.status(400).json({ error: "Password too short" });
    const data = await readData();
    data.adminPassword = password;
    await writeData(data);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Data Nile API running on :${port}`);
});
