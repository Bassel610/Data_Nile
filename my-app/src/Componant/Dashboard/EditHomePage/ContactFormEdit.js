import React, { useState } from "react";
import { Card, Select, Input, SubHead } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import Icon from "../../../Shared/icons/Icon";
import { useContent } from "../../../store/DataNileStore";

export default function ContactFormEdit({ toast }) {
  const [c, patch] = useContent();
  const [form, setForm] = useState(c.contactForm);

  const save = () => {
    patch({ contactForm: form });
    toast && toast("Contact form saved");
  };

  const updateField = (i, changes) =>
    setForm((fs) => fs.map((x, j) => (j === i ? { ...x, ...changes } : x)));

  const removeField = (i) => setForm((fs) => fs.filter((_, j) => j !== i));

  const addField = () =>
    setForm((fs) => [
      ...fs,
      { id: "f" + Date.now(), type: "input", label: "New field", value: [""] },
    ]);

  return (
    <Card>
      <SubHead title="Contact form fields" onSave={save} />
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
            onChange={(e) => updateField(i, { type: e.target.value })}
          >
            <option value="input">Input</option>
            <option value="textarea">Textarea</option>
            <option value="select">Dropdown</option>
          </Select>
          <Input
            placeholder="Label"
            value={f.label}
            onChange={(e) => updateField(i, { label: e.target.value })}
          />
          {f.type === "select" ? (
            <Input
              placeholder="Option 1, Option 2, …"
              value={f.value.join(", ")}
              onChange={(e) =>
                updateField(i, {
                  value: e.target.value.split(",").map((v) => v.trim()),
                })
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
            onClick={() => removeField(i)}
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
      <Btn kind="secondary" size="sm" icon={<Icon.Plus s={12} />} onClick={addField}>
        Add field
      </Btn>
    </Card>
  );
}
