const API_BASE =
  process.env.REACT_APP_API_BASE || "http://localhost:5000";

const TOKEN_KEY = "datanile_auth_token";

export const getToken = () => sessionStorage.getItem(TOKEN_KEY) || "";
export const setToken = (t) =>
  t ? sessionStorage.setItem(TOKEN_KEY, t) : sessionStorage.removeItem(TOKEN_KEY);
export const hasToken = () => !!getToken();

async function request(method, path, body, { auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    let detail;
    try {
      detail = await res.json();
    } catch {
      detail = { error: res.statusText };
    }
    const err = new Error(detail.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.detail = detail;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getSiteContent: () => request("GET", "/api/site-content"),
  patchSiteContent: (patch) =>
    request("PATCH", "/api/site-content", patch, { auth: true }),

  getInvites: () => request("GET", "/api/invites", undefined, { auth: true }),
  createInvite: (payload) => request("POST", "/api/invites", payload),
  deleteInvite: (id) =>
    request("DELETE", `/api/invites/${encodeURIComponent(id)}`, undefined, {
      auth: true,
    }),

  getTheme: () => request("GET", "/api/theme"),
  patchTheme: (patch) =>
    request("PATCH", "/api/theme", patch, { auth: true }),

  login: (password) => request("POST", "/api/admin/login", { password }),
  logout: () =>
    request("POST", "/api/admin/logout", undefined, { auth: true }),
  changePassword: (password) =>
    request("POST", "/api/admin/password", { password }, { auth: true }),
};

export { API_BASE, TOKEN_KEY };
