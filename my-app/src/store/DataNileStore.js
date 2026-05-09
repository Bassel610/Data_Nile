import { useEffect, useState } from "react";
import { api } from "../api/client";
import { DEFAULT_CONTENT } from "../data/seed";

const CACHE_KEY = "datanile_content_cache";

export { DEFAULT_CONTENT };

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONTENT;
  }
};

const writeCache = (content) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch {}
};

const notify = () =>
  window.dispatchEvent(new CustomEvent("datanile:content"));

let _current = readCache();

export const getContent = () => _current;

export const refreshContent = async () => {
  try {
    const fresh = await api.getSiteContent();
    _current = { ...DEFAULT_CONTENT, ...fresh };
    writeCache(_current);
  } catch {
    _current = { ...DEFAULT_CONTENT, ...readCache() };
  }
  notify();
  return _current;
};

export const patchContent = async (patch) => {
  const next = await api.patchSiteContent(patch);
  _current = { ...DEFAULT_CONTENT, ...next };
  writeCache(_current);
  notify();
  return _current;
};

export const useContent = () => {
  const [c, setC] = useState(_current);
  useEffect(() => {
    let alive = true;
    refreshContent().then((next) => alive && setC(next));
    const h = () => setC(_current);
    window.addEventListener("datanile:content", h);
    window.addEventListener("storage", h);
    return () => {
      alive = false;
      window.removeEventListener("datanile:content", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return [c, patchContent];
};
