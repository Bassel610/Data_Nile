import React, { useState } from "react";
import Panel from "../common/Panel";
import { Card, Field, Input, Textarea, Select, SubHead } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";
import { useContent } from "../../../store/DataNileStore";

export default function ManageHome({ toast }) {
  const [c, patch] = useContent();
  const [hero, setHero] = useState({ t: c.heroTitle, s: c.heroSub });
  const [about, setAbout] = useState(c.about);
  const [services, setServices] = useState(c.services);
  const [form, setForm] = useState(c.contactForm);

  const notify = (msg) => (toast ? toast(msg) : null);
  const saveHero = () => {
    patch({ heroTitle: hero.t, heroSub: hero.s });
    notify("Hero updated");
  };
  const saveAbout = () => {
    patch({ about });
    notify("About saved");
  };
  const saveServices = () => {
    patch({ services });
    notify("Services saved");
  };
  const saveForm = () => {
    patch({ contactForm: form });
    notify("Contact form saved");
  };

  return (
    <Panel
      kicker="Home page"
      title="Manage home page content"
      sub="Edit what visitors see on the landing page — hero, about, services and the contact form."
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Card>
          <SubHead title="Hero" onSave={saveHero} />
          <Field label="Headline">
            <Textarea
              rows="2"
              value={hero.t}
              onChange={(e) => setHero((h) => ({ ...h, t: e.target.value }))}
            />
          </Field>
          <Field label="Subtitle">
            <Textarea
              value={hero.s}
              onChange={(e) => setHero((h) => ({ ...h, s: e.target.value }))}
            />
          </Field>
        </Card>

        <Card>
          <SubHead title="About section" onSave={saveAbout} />
          <Field label="Title">
            <Input
              value={about.title}
              onChange={(e) =>
                setAbout((a) => ({ ...a, title: e.target.value }))
              }
            />
          </Field>
          <Field label="Description">
            <Textarea
              rows="4"
              value={about.description}
              onChange={(e) =>
                setAbout((a) => ({ ...a, description: e.target.value }))
              }
            />
          </Field>
        </Card>

        <Card>
          <SubHead title="Our Services" onSave={saveServices} />
          <Field label="Section title">
            <Input
              value={services.title}
              onChange={(e) =>
                setServices((s) => ({ ...s, title: e.target.value }))
              }
            />
          </Field>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--ink-3)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 12,
              marginTop: 8,
            }}
          >
            Items
          </div>
          {services.items.map((it, i) => (
            <div
              key={i}
              className="admin-item-row"
              style={{
                padding: 14,
                background: "var(--sand)",
                border: "1px solid var(--line-soft)",
                borderRadius: 10,
                marginBottom: 10,
                display: "grid",
                gridTemplateColumns: "1fr 1.8fr auto",
                gap: 12,
                alignItems: "start",
              }}
            >
              <Input
                value={it.t}
                onChange={(e) =>
                  setServices((s) => ({
                    ...s,
                    items: s.items.map((x, j) =>
                      j === i ? { ...x, t: e.target.value } : x
                    ),
                  }))
                }
              />
              <Textarea
                rows="2"
                value={it.d}
                onChange={(e) =>
                  setServices((s) => ({
                    ...s,
                    items: s.items.map((x, j) =>
                      j === i ? { ...x, d: e.target.value } : x
                    ),
                  }))
                }
              />
              <button
                onClick={() =>
                  setServices((s) => ({
                    ...s,
                    items: s.items.filter((_, j) => j !== i),
                  }))
                }
                aria-label="Remove service"
                style={{
                  padding: 8,
                  background: "transparent",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "var(--terracotta)",
                }}
              >
                <Icon.Close s={14} />
              </button>
            </div>
          ))}
          <Btn
            kind="secondary"
            size="sm"
            icon={<Icon.Plus s={12} />}
            onClick={() =>
              setServices((s) => ({
                ...s,
                items: [...s.items, { t: "New service", d: "Describe it" }],
              }))
            }
          >
            Add service
          </Btn>
        </Card>

        <Card>
          <SubHead title="Contact form fields" onSave={saveForm} />
          <div style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 16 }}>
            Build the fields visitors see when they click Connect.
          </div>
          {form.map((f, i) => (
            <div
              key={f.id}
              className="admin-field-row"
              style={{
                padding: 14,
                background: "var(--sand)",
                border: "1px solid var(--line-soft)",
                borderRadius: 10,
                marginBottom: 10,
                display: "grid",
                gridTemplateColumns: "120px 1fr 1fr auto",
                gap: 10,
                alignItems: "start",
              }}
            >
              <Select
                value={f.type}
                onChange={(e) =>
                  setForm((fs) =>
                    fs.map((x, j) =>
                      j === i ? { ...x, type: e.target.value } : x
                    )
                  )
                }
              >
                <option value="input">Input</option>
                <option value="textarea">Textarea</option>
                <option value="select">Dropdown</option>
              </Select>
              <Input
                placeholder="Label"
                value={f.label}
                onChange={(e) =>
                  setForm((fs) =>
                    fs.map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x
                    )
                  )
                }
              />
              {f.type === "select" ? (
                <Input
                  placeholder="Option 1, Option 2, …"
                  value={f.value.join(", ")}
                  onChange={(e) =>
                    setForm((fs) =>
                      fs.map((x, j) =>
                        j === i
                          ? {
                              ...x,
                              value: e.target.value
                                .split(",")
                                .map((v) => v.trim()),
                            }
                          : x
                      )
                    )
                  }
                />
              ) : (
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--ink-3)",
                    padding: "11px 0",
                  }}
                >
                  — user fills in —
                </div>
              )}
              <button
                onClick={() =>
                  setForm((fs) => fs.filter((_, j) => j !== i))
                }
                aria-label="Remove field"
                style={{
                  padding: 8,
                  background: "transparent",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "var(--terracotta)",
                }}
              >
                <Icon.Close s={14} />
              </button>
            </div>
          ))}
          <Btn
            kind="secondary"
            size="sm"
            icon={<Icon.Plus s={12} />}
            onClick={() =>
              setForm((fs) => [
                ...fs,
                {
                  id: "f" + Date.now(),
                  type: "input",
                  label: "New field",
                  value: [""],
                },
              ])
            }
          >
            Add field
          </Btn>
        </Card>
      </div>
    </Panel>
  );
}
