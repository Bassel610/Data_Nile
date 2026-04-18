import React, { useState } from "react";
import Panel from "../common/Panel";
import { Card } from "../common/primitives";
import Btn from "../../../Shared/ui/Btn";
import { THEME_PALETTE, loadTheme, applyTheme, saveTheme, resetTheme } from "../../../store/theme";
import ThemePaletteRow from "./ThemePaletteRow";
import ThemePreview from "./ThemePreview";

export default function MangeLayout({ toast }) {
  const [picked, setPicked] = useState(() => loadTheme());

  const pick = (k, v) => {
    const next = { ...picked, [k]: v };
    setPicked(next);
    applyTheme(next);
    saveTheme(next);
  };

  const reset = () => {
    setPicked({});
    resetTheme();
    toast && toast("Theme reset");
  };

  return (
    <Panel
      kicker="Layout"
      title="Manage layout & theme"
      sub="Pick the palette visitors see on the landing page. Changes sync instantly."
      actions={
        <Btn kind="secondary" size="sm" onClick={reset}>
          Reset to defaults
        </Btn>
      }
    >
      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {Object.entries(THEME_PALETTE).map(([key, options]) => (
            <ThemePaletteRow
              key={key}
              varKey={key}
              options={options}
              picked={picked}
              onPick={pick}
            />
          ))}
        </div>
      </Card>
      <ThemePreview />
    </Panel>
  );
}
