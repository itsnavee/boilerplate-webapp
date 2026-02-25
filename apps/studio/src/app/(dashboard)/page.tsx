"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePageHeader } from "@/lib/page-header-context";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  { label: "Active Campaigns", value: "12", change: "+3 this week", color: "var(--accent)", action: "+ New", href: "/campaigns" },
  { label: "Calls Today", value: "847", change: "+12% vs yesterday", color: "var(--success)", action: "View all", href: "/calls" },
  { label: "Minutes Used", value: "4,293", change: "68% of quota", color: "var(--warning)", action: "Details", href: "/usage" },
  { label: "Balance", value: "$1,847", change: "Auto-refill on", color: "var(--info)", action: "Top up", href: "/credits" },
];

const recentCalls = [
  { id: "c001", lead: "Sarah Johnson", campaign: "US Enterprise Q1", duration: "3:42", outcome: "Appointment Set", tier: "Tier 1", time: "2 min ago" },
  { id: "c002", lead: "Mike Chen", campaign: "LATAM Outbound", duration: "1:18", outcome: "Callback Requested", tier: "Tier 2", time: "8 min ago" },
  { id: "c003", lead: "Priya Sharma", campaign: "India Tech Sales", duration: "5:01", outcome: "Qualified Lead", tier: "Tier 1", time: "15 min ago" },
  { id: "c004", lead: "James Wilson", campaign: "US Enterprise Q1", duration: "0:34", outcome: "No Answer", tier: "Tier 3", time: "22 min ago" },
  { id: "c005", lead: "Ana Rodriguez", campaign: "LATAM Outbound", duration: "2:56", outcome: "Meeting Booked", tier: "Tier 1", time: "31 min ago" },
  { id: "c006", lead: "Tom Baker", campaign: "UK Financial", duration: "4:12", outcome: "Interested", tier: "Tier 2", time: "45 min ago" },
];

const outcomeColors: Record<string, string> = {
  "Appointment Set": "badge-active",
  "Meeting Booked": "badge-active",
  "Qualified Lead": "badge-completed",
  "Interested": "badge-completed",
  "Callback Requested": "badge-paused",
  "No Answer": "badge-draft",
};

export default function DashboardPage() {
  const { setPageHeader } = usePageHeader();

  useEffect(() => {
    setPageHeader({
      title: "Home",
      description: "Overview of your voice campaigns",
    });
  }, [setPageHeader]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="stat-card" style={{ position: "relative", textDecoration: "none", color: "inherit" }}>
            <div style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: stat.color,
            }}>
              {stat.change}
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="stat-label">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Calls */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem" }}>
          <SectionHeading className="mb-0">Recent Calls</SectionHeading>
          <Link
            href="/calls"
            style={{
              fontSize: "0.6875rem",
              color: "hsl(var(--primary))",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            View all
          </Link>
        </div>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>Lead</th>
                <th>Campaign</th>
                <th>Duration</th>
                <th>Outcome</th>
                <th>Tier</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr key={call.id}>
                  <td style={{ color: "hsl(var(--muted-foreground))" }}>{call.time}</td>
                  <td style={{ fontWeight: 500 }}>{call.lead}</td>
                  <td style={{ color: "hsl(var(--muted-foreground))" }}>{call.campaign}</td>
                  <td style={{ fontFamily: "monospace" }}>{call.duration}</td>
                  <td>
                    <span className={`badge ${outcomeColors[call.outcome] || "badge-draft"}`}>
                      {call.outcome}
                    </span>
                  </td>
                  <td style={{ color: "hsl(var(--muted-foreground))" }}>{call.tier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity & Pipeline */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.675rem",
      }}>
        <div className="card">
          <SectionHeading>Pipeline Today</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Queued", value: 234, max: 500, color: "hsl(var(--muted-foreground))" },
              { label: "In Progress", value: 12, max: 500, color: "hsl(var(--primary))" },
              { label: "Completed", value: 601, max: 500, color: "hsl(var(--success))" },
              { label: "Failed", value: 18, max: 500, color: "hsl(var(--destructive))" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8125rem",
                  marginBottom: "0.375rem",
                }}>
                  <span style={{ color: "hsl(var(--muted-foreground))" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: item.color }}>{item.value}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(item.value / item.max) * 100}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <SectionHeading>Voice Tier Usage</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { tier: "Tier 1", desc: "Premium (ElevenLabs)", mins: 1247, pct: 45 },
              { tier: "Tier 2", desc: "Standard (Deepgram)", mins: 2103, pct: 35 },
              { tier: "Tier 3", desc: "Economy (Deepgram)", mins: 943, pct: 20 },
            ].map((item) => (
              <div key={item.tier}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.25rem",
                }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{item.tier}</span>
                  <span style={{
                    fontSize: "0.75rem",
                    color: "hsl(var(--muted-foreground))",
                  }}>
                    {item.mins} min
                  </span>
                </div>
                <div style={{
                  fontSize: "0.6875rem",
                  color: "hsl(var(--muted-foreground))",
                  marginBottom: "0.375rem",
                }}>
                  {item.desc}
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
