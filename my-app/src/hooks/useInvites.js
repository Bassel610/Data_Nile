import { useCallback, useEffect, useState } from "react";
import { api } from "../api/client";

export default function useInvites(toast) {
  const [invites, setInvites] = useState([]);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      const list = await api.getInvites();
      setInvites(list);
      setErr("");
    } catch (ex) {
      setErr(ex.detail?.error || "Failed to load invites.");
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, [load]);

  const remove = async (id) => {
    try {
      await api.deleteInvite(id);
      setInvites((list) => list.filter((i) => i.id !== id));
      toast && toast("Invite deleted");
    } catch {
      toast && toast("Delete failed", "err");
    }
  };

  return { invites, err, remove };
}
