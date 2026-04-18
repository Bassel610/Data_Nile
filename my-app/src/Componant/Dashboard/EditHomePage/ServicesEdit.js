import React, { useState } from "react";
import { Card, Field, Input, Textarea, SubHead } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";
import { useContent } from "../../../store/DataNileStore";

export default function ServicesEdit({ toast }) {
  const [c, patch] = useContent();
  const [services, setServices] = useState(c.services);

  const save = () => {
    patch({ services });
    toast && toast("Services saved");
  };

  const updateItem = (i, field, val) =>
    setServices((s) => ({
      ...s,
      items: s.items.map((x, j) => (j === i ? { ...x, [field]: val } : x)),
    }));

  const removeItem = (i) =>
    setServices((s) => ({ ...s, items: s.items.filter((_, j) => j !== i) }));

  const addItem = () =>
    setServices((s) => ({
      ...s,
      items: [...s.items, { t: "New service", d: "Describe it" }],
    }));

  return (
    <Card>
      <SubHead title="Our Services" onSave={save} />
      <Field label="Section title">
        <Input
          value={services.title}
          onChange={(e) => setServices((s) => ({ ...s, title: e.target.value }))}
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
          <Input value={it.t} onChange={(e) => updateItem(i, "t", e.target.value)} />
          <Textarea rows="2" value={it.d} onChange={(e) => updateItem(i, "d", e.target.value)} />
          <button
            onClick={() => removeItem(i)}
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
      <Btn kind="secondary" size="sm" icon={<Icon.Plus s={12} />} onClick={addItem}>
        Add service
      </Btn>
    </Card>
  );
}
