import React, { useState } from "react";
import { Card, Field, Input, Textarea, SubHead } from "../common/primitives";
import { useContent } from "../../../store/DataNileStore";

export default function AboutEdit({ toast }) {
  const [c, patch] = useContent();
  const [about, setAbout] = useState(c.about);

  const save = () => {
    patch({ about });
    toast && toast("About saved");
  };

  return (
    <Card>
      <SubHead title="About section" onSave={save} />
      <Field label="Title">
        <Input
          value={about.title}
          onChange={(e) => setAbout((a) => ({ ...a, title: e.target.value }))}
        />
      </Field>
      <Field label="Description">
        <Textarea
          rows="4"
          value={about.description}
          onChange={(e) => setAbout((a) => ({ ...a, description: e.target.value }))}
        />
      </Field>
    </Card>
  );
}
