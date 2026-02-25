"use client";

import { SectionHeading } from "@/components/ui/section-heading";

const weeklyData = [
  { day: "Mon", calls: 142, appointments: 12 },
  { day: "Tue", calls: 189, appointments: 18 },
  { day: "Wed", calls: 156, appointments: 14 },
  { day: "Thu", calls: 203, appointments: 21 },
  { day: "Fri", calls: 178, appointments: 16 },
  { day: "Sat", calls: 45, appointments: 3 },
  { day: "Sun", calls: 12, appointments: 1 },
];

const conversionData = [
  { campaign: "US Enterprise Q1", rate: 7.2, calls: 1847 },
  { campaign: "LATAM Outbound", rate: 5.8, calls: 923 },
  { campaign: "India Tech Sales", rate: 6.4, calls: 456 },
  { campaign: "UK Financial", rate: 4.1, calls: 312 },
  { campaign: "WhatsApp Follow-up", rate: 8.9, calls: 789 },
];

const tierBreakdown = [
  { tier: "Tier 1", label: "Premium", minutes: 1247, cost: 624, pct: 29 },
  { tier: "Tier 2", label: "Standard", minutes: 2103, cost: 420, pct: 49 },
  { tier: "Tier 3", label: "Economy", minutes: 943, cost: 94, pct: 22 },
];

const maxCalls = Math.max(...weeklyData.map((d) => d.calls));

export default function AnalyticsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Summary stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card">
          <div className="stat-value">925</div>
          <div className="stat-label">Calls This Week</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--success)" }}>85</div>
          <div className="stat-label">Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--accent)" }}>6.4%</div>
          <div className="stat-label">Avg Conversion</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "var(--warning)" }}>2:18</div>
          <div className="stat-label">Avg Duration</div>
        </div>
      </div>

      {/* Charts row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "0.675rem",
      }}>
        {/* Calls over time - bar chart */}
        <div className="card">
          <SectionHeading>Calls This Week</SectionHeading>
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "0.75rem",
            height: "180px",
            paddingBottom: "1.5rem",
          }}>
            {weeklyData.map((d) => (
              <div
                key={d.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  marginBottom: "0.375rem",
                  color: "var(--text-secondary)",
                }}>
                  {d.calls}
                </div>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "40px",
                    height: `${(d.calls / maxCalls) * 100}%`,
                    background: "var(--accent)",
                    borderRadius: "4px 4px 0 0",
                    minHeight: "4px",
                    opacity: 0.8,
                    transition: "height 0.3s ease",
                  }}
                />
                <div style={{
                  fontSize: "0.6875rem",
                  color: "var(--text-muted)",
                  marginTop: "0.5rem",
                }}>
                  {d.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice tier donut placeholder */}
        <div className="card">
          <SectionHeading>Voice Tier Usage</SectionHeading>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {tierBreakdown.map((t) => (
              <div key={t.tier}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.375rem",
                }}>
                  <div>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{t.tier}</span>
                    <span style={{
                      fontSize: "0.6875rem",
                      color: "var(--text-muted)",
                      marginLeft: "0.5rem",
                    }}>
                      {t.label}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>{t.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${t.pct}%` }} />
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.6875rem",
                  color: "var(--text-muted)",
                  marginTop: "0.25rem",
                }}>
                  <span>{t.minutes.toLocaleString()} min</span>
                  <span>${t.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion rates table */}
      <div className="card">
        <SectionHeading>Conversion Rates by Campaign</SectionHeading>
        <div className="table-container" style={{ border: "none" }}>
          <table>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Calls</th>
                <th>Conversion Rate</th>
                <th>Visual</th>
              </tr>
            </thead>
            <tbody>
              {conversionData
                .sort((a, b) => b.rate - a.rate)
                .map((c) => (
                  <tr key={c.campaign}>
                    <td style={{ fontWeight: 500 }}>{c.campaign}</td>
                    <td style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>
                      {c.calls.toLocaleString()}
                    </td>
                    <td style={{
                      fontWeight: 600,
                      color: c.rate > 6 ? "var(--success)" : "var(--text-secondary)",
                    }}>
                      {c.rate}%
                    </td>
                    <td>
                      <div className="progress-bar" style={{ width: "120px" }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(c.rate / 10) * 100}%`,
                            background: c.rate > 6 ? "var(--success)" : "var(--accent)",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
