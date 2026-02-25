"use client";

const topTenants = [
  { name: "VoiceReach EU", calls: 15600, minutes: 46800, revenue: "$4,212", trend: "+18%" },
  { name: "GrowthCo PK", calls: 12890, minutes: 38670, revenue: "$3,480", trend: "+12%" },
  { name: "LeadGen Pro", calls: 8921, minutes: 26763, revenue: "$2,410", trend: "-3%" },
  { name: "Apex Solutions", calls: 3412, minutes: 10236, revenue: "$920", trend: "+24%" },
  { name: "SalesForce LATAM", calls: 2301, minutes: 6903, revenue: "$621", trend: "+8%" },
];

const voiceTiers = [
  { tier: "Standard (Deepgram)", tenants: 28, pct: 60 },
  { tier: "Premium (ElevenLabs)", tenants: 14, pct: 30 },
  { tier: "Ultra (Custom)", tenants: 5, pct: 10 },
];

const dailyStats = [
  { label: "Avg Calls / Day", value: "2,640" },
  { label: "Avg Revenue / Day", value: "$1,180" },
  { label: "Avg Call Duration", value: "2:48" },
  { label: "Conversion Rate", value: "12.4%" },
];

export default function AnalyticsPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Analytics</h1>
          <p className="page-subtitle">Aggregate metrics across all tenants</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <select style={{ maxWidth: "140px" }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="btn btn-secondary">Export</button>
        </div>
      </div>

      <div className="stats-grid">
        {dailyStats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Calls Per Day
          </h3>
          <div className="chart-placeholder">
            Calls chart - integrate with charting library
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Revenue Per Day
          </h3>
          <div className="chart-placeholder">
            Revenue chart - integrate with charting library
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Voice tier distribution */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Voice Tier Distribution
          </h3>
          <div className="card">
            {voiceTiers.map((v) => (
              <div key={v.tier} style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
                  <span style={{ fontSize: "0.875rem" }}>{v.tier}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    {v.tenants} tenants ({v.pct}%)
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${v.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top tenants by usage */}
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Top Tenants by Usage
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Calls</th>
                  <th>Revenue</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {topTenants.map((t) => (
                  <tr key={t.name}>
                    <td style={{ fontWeight: 500 }}>{t.name}</td>
                    <td>{t.calls.toLocaleString()}</td>
                    <td>{t.revenue}</td>
                    <td>
                      <span style={{ color: t.trend.startsWith("+") ? "var(--success)" : "var(--danger)" }}>
                        {t.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
