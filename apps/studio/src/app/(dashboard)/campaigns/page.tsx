"use client";

import { useState } from "react";
import Link from "next/link";

type CampaignStatus = "active" | "paused" | "draft" | "completed";

interface Campaign {
  id: string;
  name: string;
  type: string;
  voiceTier: string;
  status: CampaignStatus;
  calls: number;
  totalLeads: number;
  created: string;
}

const campaigns: Campaign[] = [
  { id: "cmp_001", name: "US Enterprise Q1", type: "Outbound", voiceTier: "Tier 1", status: "active", calls: 1847, totalLeads: 3200, created: "Jan 15, 2026" },
  { id: "cmp_002", name: "LATAM Outbound", type: "Outbound", voiceTier: "Tier 2", status: "active", calls: 923, totalLeads: 1800, created: "Jan 22, 2026" },
  { id: "cmp_003", name: "India Tech Sales", type: "Outbound", voiceTier: "Tier 1", status: "active", calls: 456, totalLeads: 900, created: "Feb 01, 2026" },
  { id: "cmp_004", name: "UK Financial Services", type: "Outbound", voiceTier: "Tier 2", status: "paused", calls: 312, totalLeads: 600, created: "Feb 05, 2026" },
  { id: "cmp_005", name: "Inbound Support Line", type: "Inbound", voiceTier: "Tier 1", status: "active", calls: 2103, totalLeads: 0, created: "Dec 10, 2025" },
  { id: "cmp_006", name: "Re-engagement Q4 Leads", type: "Outbound", voiceTier: "Tier 3", status: "draft", calls: 0, totalLeads: 450, created: "Feb 18, 2026" },
  { id: "cmp_007", name: "Holiday Promo Blast", type: "Outbound", voiceTier: "Tier 2", status: "completed", calls: 5420, totalLeads: 5420, created: "Nov 20, 2025" },
  { id: "cmp_008", name: "WhatsApp Follow-up", type: "Omnichannel", voiceTier: "Tier 2", status: "active", calls: 789, totalLeads: 1200, created: "Feb 10, 2026" },
];

const tabs = ["All", "Active", "Paused", "Draft", "Completed"] as const;

const statusBadge: Record<CampaignStatus, string> = {
  active: "badge-active",
  paused: "badge-paused",
  draft: "badge-draft",
  completed: "badge-completed",
};

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered = activeTab === "All"
    ? campaigns
    : campaigns.filter((c) => c.status === activeTab.toLowerCase());

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Header */}
      <div className="page-header">
        <div>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {campaigns.length} campaigns total
          </p>
        </div>
        <button className="btn btn-primary">+ New Campaign</button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span style={{
              marginLeft: "0.375rem",
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
            }}>
              {tab === "All"
                ? campaigns.length
                : campaigns.filter((c) => c.status === tab.toLowerCase()).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Voice Tier</th>
              <th>Status</th>
              <th>Calls</th>
              <th>Progress</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((campaign) => (
              <tr key={campaign.id}>
                <td>
                  <Link
                    href={`/campaigns/${campaign.id}`}
                    style={{
                      color: "var(--text-primary)",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {campaign.name}
                  </Link>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{campaign.type}</td>
                <td style={{ color: "var(--text-secondary)" }}>{campaign.voiceTier}</td>
                <td>
                  <span className={`badge ${statusBadge[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </td>
                <td style={{ fontFamily: "monospace" }}>
                  {campaign.calls.toLocaleString()}
                </td>
                <td>
                  {campaign.totalLeads > 0 ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div className="progress-bar" style={{ width: "80px" }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${Math.min((campaign.calls / campaign.totalLeads) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {Math.round((campaign.calls / campaign.totalLeads) * 100)}%
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>--</span>
                  )}
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
                  {campaign.created}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No {activeTab.toLowerCase()} campaigns</h3>
          <p>Create a new campaign to get started.</p>
        </div>
      )}
    </div>
  );
}
