"use client";

import { useParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeading } from "@/components/ui/section-heading";
import { DetailList } from "@/components/ui/detail-list";

const campaignData: Record<string, {
  name: string;
  type: string;
  status: string;
  voiceTier: string;
  agent: string;
  created: string;
  calls: number;
  answered: number;
  appointments: number;
  avgDuration: string;
  iceBreakers: string[];
}> = {
  cmp_001: {
    name: "US Enterprise Q1",
    type: "Outbound",
    status: "active",
    voiceTier: "Tier 1 (ElevenLabs)",
    agent: "Sales Pro v2",
    created: "Jan 15, 2026",
    calls: 1847,
    answered: 1203,
    appointments: 87,
    avgDuration: "2:34",
    iceBreakers: [
      "Hi {name}, I noticed your company recently expanded into {industry}. We help similar companies streamline their outreach...",
      "Hey {name}, quick question - are you still handling your sales outreach manually, or have you started exploring AI solutions?",
      "Good {timeOfDay} {name}, I saw your team is hiring for sales roles. We have a solution that could multiply your team's output...",
    ],
  },
};

const defaultCampaign = {
  name: "Campaign Detail",
  type: "Outbound",
  status: "active",
  voiceTier: "Tier 2 (Deepgram)",
  agent: "Default Agent",
  created: "Feb 01, 2026",
  calls: 456,
  answered: 312,
  appointments: 23,
  avgDuration: "2:12",
  iceBreakers: [
    "Hi {name}, I'm calling from {company}. Do you have a minute to discuss how we can help with {pain_point}?",
    "Hello {name}, I noticed your company is in {industry}. We specialize in helping businesses like yours...",
  ],
};

const statusBadge: Record<string, string> = {
  active: "badge-active",
  paused: "badge-paused",
  draft: "badge-draft",
  completed: "badge-completed",
};

export default function CampaignDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const campaign = campaignData[id] || defaultCampaign;

  const conversionRate = campaign.answered > 0
    ? ((campaign.appointments / campaign.answered) * 100).toFixed(1)
    : "0";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      <Breadcrumb items={[
        { label: "Campaigns", href: "/campaigns" },
        { label: campaign.name },
      ]} />

      {/* Header */}
      <div className="page-header">
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{campaign.name}</h2>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "0.5rem",
          }}>
            <span className={`badge ${statusBadge[campaign.status] || "badge-draft"}`}>
              {campaign.status}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              {campaign.type}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              Created {campaign.created}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {campaign.status === "active" ? (
            <button className="btn btn-secondary">Pause</button>
          ) : (
            <button className="btn btn-primary">Activate</button>
          )}
          <button className="btn btn-secondary">Edit</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-value">{campaign.calls.toLocaleString()}</div>
          <div className="stat-label">Total Calls</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--success)" }}>
            {campaign.answered.toLocaleString()}
          </div>
          <div className="stat-label">Answered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--accent)" }}>
            {campaign.appointments}
          </div>
          <div className="stat-label">Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{conversionRate}%</div>
          <div className="stat-label">Conversion Rate</div>
        </div>
      </div>

      {/* Details Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.675rem",
      }}>
        {/* Config */}
        <div className="card">
          <SectionHeading>Configuration</SectionHeading>
          <DetailList items={[
            { label: "Voice Tier", value: campaign.voiceTier },
            { label: "AI Agent", value: campaign.agent },
            { label: "Avg Duration", value: campaign.avgDuration },
            { label: "Type", value: campaign.type },
          ]} />
        </div>

        {/* Performance */}
        <div className="card">
          <SectionHeading>Performance</SectionHeading>
          <div className="chart-placeholder">
            Call volume chart coming soon
          </div>
        </div>
      </div>

      {/* Ice Breakers */}
      <div className="card">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}>
          <SectionHeading className="mb-0">
            Ice Breakers ({campaign.iceBreakers.length})
          </SectionHeading>
          <button className="btn btn-secondary" style={{ fontSize: "0.8125rem" }}>
            + Add Ice Breaker
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {campaign.iceBreakers.map((breaker, i) => (
            <div
              key={i}
              style={{
                padding: "1rem",
                background: "var(--bg-secondary)",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              <div style={{
                fontSize: "0.6875rem",
                color: "var(--text-muted)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Variant {i + 1}
              </div>
              {breaker}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
