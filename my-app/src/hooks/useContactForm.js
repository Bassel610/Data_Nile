import { useState } from "react";
import { api } from "../api/client";

export default function useContactForm(onClose) {
  const [values, setValues] = useState({});
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const setField = (id, val) => setValues((v) => ({ ...v, [id]: val }));

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      await api.createInvite(values);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setValues({});
        onClose();
      }, 1800);
    } catch {
      setErr("Could not send. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return { values, sent, err, busy, setField, submit };
}
