const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  tenantId?: string;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseUrl: string;
  private tenantId: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setTenant(tenantId: string) {
    this.tenantId = tenantId;
  }

  private async request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = opts;

    const reqHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (this.tenantId) {
      reqHeaders["x-tenant-id"] = this.tenantId;
    }
    if (opts.tenantId) {
      reqHeaders["x-tenant-id"] = opts.tenantId;
    }

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: reqHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const msg = await res.text().catch(() => "Unknown error");
      throw new ApiError(msg, res.status);
    }

    return res.json();
  }

  // Campaigns
  getCampaigns() { return this.request("/api/campaigns"); }
  getCampaign(id: string) { return this.request(`/api/campaigns/${id}`); }
  createCampaign(data: unknown) {
    return this.request("/api/campaigns", { method: "POST", body: data });
  }
  updateCampaign(id: string, data: unknown) {
    return this.request(`/api/campaigns/${id}`, { method: "PATCH", body: data });
  }

  // Calls
  getCalls(params?: Record<string, string>) {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return this.request(`/api/calls${qs}`);
  }
  getCall(id: string) { return this.request(`/api/calls/${id}`); }

  // Leads
  getLeads() { return this.request("/api/leads"); }
  getLead(id: string) { return this.request(`/api/leads/${id}`); }
  importLeads(data: unknown) {
    return this.request("/api/leads/import", { method: "POST", body: data });
  }

  // Agents
  getAgents() { return this.request("/api/agents"); }
  getAgent(id: string) { return this.request(`/api/agents/${id}`); }
  createAgent(data: unknown) {
    return this.request("/api/agents", { method: "POST", body: data });
  }
  updateAgent(id: string, data: unknown) {
    return this.request(`/api/agents/${id}`, { method: "PATCH", body: data });
  }

  // Knowledge
  getDocuments() { return this.request("/api/knowledge"); }
  uploadDocument(data: unknown) {
    return this.request("/api/knowledge", { method: "POST", body: data });
  }
  deleteDocument(id: string) {
    return this.request(`/api/knowledge/${id}`, { method: "DELETE" });
  }

  // Analytics
  getAnalytics(params?: Record<string, string>) {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return this.request(`/api/analytics${qs}`);
  }

  // Billing
  getBilling() { return this.request("/api/billing"); }
  getUsage() { return this.request("/api/billing/usage"); }

  // Members
  getMembers() { return this.request("/api/members"); }
  inviteMember(data: unknown) {
    return this.request("/api/members/invite", { method: "POST", body: data });
  }
  removeMember(id: string) {
    return this.request(`/api/members/${id}`, { method: "DELETE" });
  }

  // API Keys
  getApiKeys() { return this.request("/api/keys"); }
  createApiKey(data: unknown) {
    return this.request("/api/keys", { method: "POST", body: data });
  }
  revokeApiKey(id: string) {
    return this.request(`/api/keys/${id}`, { method: "DELETE" });
  }

  // Search
  search(q: string, limit = 10) {
    const qs = new URLSearchParams({ q, limit: String(limit) }).toString();
    return this.request(`/api/search?${qs}`);
  }

  // Settings
  getSettings() { return this.request("/api/settings"); }
  updateSettings(data: unknown) {
    return this.request("/api/settings", { method: "PATCH", body: data });
  }
}

export const api = new ApiClient(API_URL);
export { ApiError };
