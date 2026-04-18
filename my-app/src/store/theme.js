import { api } from "../api/client";

const CACHE_KEY = "datanile_theme_cache";

export const THEME_PALETTE = {
  "--nile-deep": [
    "oklch(0.32 0.07 235)",
    "oklch(0.28 0.08 260)",
    "oklch(0.35 0.08 155)",
    "oklch(0.30 0.09 20)",
    "oklch(0.25 0.05 280)",
  ],
  "--terracotta": [
    "oklch(0.58 0.12 45)",
    "oklch(0.62 0.14 30)",
    "oklch(0.55 0.13 60)",
    "oklch(0.50 0.15 15)",
    "oklch(0.60 0.10 80)",
  ],
  "--reed": [
    "oklch(0.55 0.10 150)",
    "oklch(0.58 0.12 140)",
    "oklch(0.50 0.09 170)",
    "oklch(0.62 0.11 130)",
    "oklch(0.48 0.08 180)",
  ],
  "--gold": [
    "oklch(0.76 0.12 75)",
    "oklch(0.80 0.14 70)",
    "oklch(0.72 0.13 85)",
    "oklch(0.78 0.11 60)",
    "oklch(0.70 0.10 90)",
  ],
  "--sand": [
    "oklch(0.94 0.025 82)",
    "oklch(0.96 0.02 90)",
    "oklch(0.92 0.03 70)",
    "oklch(0.93 0.02 200)",
    "oklch(0.95 0.02 150)",
  ],
  "--ink": [
    "oklch(0.20 0.018 250)",
    "oklch(0.15 0.02 250)",
    "oklch(0.22 0.02 30)",
    "oklch(0.18 0.01 150)",
    "oklch(0.25 0.025 280)",
  ],
};

const readCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeCache = (tokens) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(tokens));
  } catch {}
};

export const applyTheme = (tokens) => {
  Object.entries(tokens || {}).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
};

const clearThemeVars = () => {
  Object.keys(THEME_PALETTE).forEach((k) =>
    document.documentElement.style.removeProperty(k)
  );
};

export const loadTheme = () => readCache();

export const refreshTheme = async () => {
  try {
    const tokens = await api.getTheme();
    writeCache(tokens);
    applyTheme(tokens);
    window.dispatchEvent(new CustomEvent("datanile:theme"));
    return tokens;
  } catch {
    const cached = readCache();
    applyTheme(cached);
    return cached;
  }
};

export const saveTheme = async (tokens) => {
  writeCache(tokens);
  applyTheme(tokens);
  window.dispatchEvent(new CustomEvent("datanile:theme"));
  try {
    await api.patchTheme(tokens);
  } catch {}
};

export const resetTheme = async () => {
  writeCache({});
  clearThemeVars();
  window.dispatchEvent(new CustomEvent("datanile:theme"));
  try {
    await api.patchTheme({});
  } catch {}
};
