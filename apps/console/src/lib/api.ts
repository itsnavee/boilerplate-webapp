const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE}/admin${path}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getToken()}`,
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // Tenants
  getTenants: (params?: Record<string, string>) =>
    request("/tenants", { params }),
  getTenant: (id: string) =>
    request(`/tenants/${id}`),
  suspendTenant: (id: string) =>
    request(`/tenants/${id}/suspend`, { method: "POST" }),
  reactivateTenant: (id: string) =>
    request(`/tenants/${id}/reactivate`, { method: "POST" }),
  adjustBalance: (id: string, amount: number, reason: string) =>
    request(`/tenants/${id}/balance`, {
      method: "POST",
      body: JSON.stringify({ amount, reason }),
    }),

  // Calls
  getCalls: (params?: Record<string, string>) =>
    request("/calls", { params }),

  // Analytics
  getAnalytics: (params?: Record<string, string>) =>
    request("/analytics", { params }),

  // Status
  getHealth: () => request("/status/health"),
  getServices: () => request("/status/services"),
  getContainers: () => request("/status/docker"),
  getMetrics: () => request("/status/metrics"),

  // Settings
  getSettings: () => request("/settings"),
  updateSettings: (data: Record<string, unknown>) =>
    request("/settings", { method: "PUT", body: JSON.stringify(data) }),
};
