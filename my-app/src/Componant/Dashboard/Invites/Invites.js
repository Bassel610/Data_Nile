import React, { useState } from "react";
import Panel from "../common/Panel";
import InviteList from "./InviteList";
import InviteDetail from "./InviteDetail";
import useInvites from "../../../hooks/useInvites";

export default function Invites({ toast }) {
  const { invites, err, remove } = useInvites(toast);
  const [selected, setSelected] = useState(null);

  const handleDelete = async (id) => {
    await remove(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <Panel
      kicker="Invites"
      title="Connect requests"
      sub="Every submission from the landing's Connect form lands here. Review and respond."
    >
      {err && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--terracotta)",
            marginBottom: 14,
          }}
        >
          {err}
        </div>
      )}
      <div
        className="invites-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 18,
        }}
      >
        <InviteList invites={invites} selected={selected} onSelect={setSelected} />
        <InviteDetail
          selected={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      </div>
    </Panel>
  );
}
