import React from "react";
import Panel from "../common/Panel";
import Btn from "../../Shared/ui/Btn";
import Icon from "../../Shared/icons/Icon";
import ImageCategoryCard from "./ImageCategoryCard";
import { IMAGE_CATEGORIES } from "../../../constants/imageCategories";

export default function ManageImages({ toast }) {
  const notify = (msg) => toast && toast(msg);
  return (
    <Panel
      kicker="Images"
      title="Manage images"
      sub="Drop in hero slider imagery, gallery shots, logos, and the photo library."
    >
      <div
        className="images-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 18,
        }}
      >
        {IMAGE_CATEGORIES.map((c) => (
          <ImageCategoryCard key={c.k} k={c.k} l={c.l} onNotify={notify} />
        ))}
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
        <Btn
          kind="primary"
          onClick={() => notify("Images uploaded")}
          icon={<Icon.Arrow s={13} />}
        >
          Upload all
        </Btn>
        <Btn kind="secondary" onClick={() => notify("Gallery opened")}>
          Open full gallery
        </Btn>
      </div>
    </Panel>
  );
}
