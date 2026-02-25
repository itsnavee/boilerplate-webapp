"use client";

import { DetailList } from "@/components/ui/detail-list";

interface Agent {
  id: string;
  name: string;
  type: string;
  voiceTier: string;
  model: string;
  campaigns: number;
  totalCalls: number;
  status: string;
  description: string;
}

const agents: Agent[] = [
  {
    id: "agt_001",
    name: "Sales Pro v2",
    type: "Outbound",
    voiceTier: "Tier 1",
    model: "GPT-4o-mini",
    campaigns: 3,
    totalCalls: 3226,
    status: "active",
    description: "Optimized for B2B SaaS sales. Handles objections, qualifies leads, books appointments.",
  },
  {
    id: "agt_002",
    name: "Support Agent",
    type: "Inbound",
    voiceTier: "Tier 1",
    model: "Claude Sonnet",
    campaigns: 1,
    totalCalls: 2103,
    status: "active",
    description: "Handles inbound support calls. Routes complex issues to human agents.",
  },
  {
    id: "agt_003",
    name: "LATAM Caller",
    type: "Outbound",
    voiceTier: "Tier 2",
    model: "GPT-4o-mini",
    campaigns: 1,
    totalCalls: 923,
    status: "active",
    description: "Spanish/English bilingual agent for Latin American market outreach.",
  },
  {
    id: "agt_004",
    name: "Re-engagement Bot",
    type: "Outbound",
    voiceTier: "Tier 3",
    model: "GPT-4o-mini",
    campaigns: 1,
    totalCalls: 0,
    status: "draft",
    description: "Re-engages cold leads with personalized follow-ups.",
  },
];

const statusBadge: Record<string, string> = {
  active: "badge-active",
  draft: "badge-draft",
  disabled: "badge-draft",
};

export default function AgentsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Header */}
      <div className="page-header">
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          {agents.length} agents configured
        </p>
        <button className="btn btn-primary">+ New Agent</button>
      </div>

      {/* Agent cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "0.675rem",
      }}>
        {agents.map((agent) => (
          <div key={agent.id} className="card" style={{ cursor: "pointer" }}>
            {/* Agent header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "0.75rem",
            }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{agent.name}</h3>
                <div style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0.375rem",
                }}>
                  <span className={`badge ${statusBadge[agent.status] || "badge-draft"}`}>
                    {agent.status}
                  </span>
                  <span className="badge badge-completed">{agent.type}</span>
                </div>
              </div>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "var(--bg-hover)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <circle cx="12" cy="5" r="2" /><path d="M12 7v4" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              marginBottom: "1rem",
            }}>
              {agent.description}
            </p>

            {/* Meta */}
            <div style={{
              padding: "0.75rem 0 0",
              borderTop: "1px solid var(--border)",
            }}>
              <DetailList
                columns={2}
                items={[
                  { label: "Model", value: agent.model },
                  { label: "Voice", value: agent.voiceTier },
                  { label: "Campaigns", value: agent.campaigns.toString() },
                  { label: "Total Calls", value: agent.totalCalls.toLocaleString() },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
