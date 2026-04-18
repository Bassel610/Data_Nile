import React, { useState } from "react";
import { Card, Field, Textarea, SubHead } from "../common/primitives";
import { useContent } from "../../../store/DataNileStore";

export default function HeroEdit({ toast }) {
  const [c, patch] = useContent();
  const [hero, setHero] = useState({ t: c.heroTitle, s: c.heroSub });

  const save = () => {
    patch({ heroTitle: hero.t, heroSub: hero.s });
    toast && toast("Hero updated");
  };

  return (
    <Card>
      <SubHead title="Hero" onSave={save} />
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
  );
}
