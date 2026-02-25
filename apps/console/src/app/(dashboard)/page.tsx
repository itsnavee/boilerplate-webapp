"use client";

const stats = [
  { label: "Total Tenants", value: "47", change: "+3 this week", up: true },
  { label: "Active Tenants", value: "38", change: "80.9% of total", up: true },
  { label: "Total Calls Today", value: "2,841", change: "+12% vs yesterday", up: true },
  { label: "Revenue Today", value: "$1,284", change: "+8% vs yesterday", up: true },
  { label: "Active Calls", value: "23", change: "Live right now", up: true },
  { label: "Error Rate", value: "0.3%", change: "-0.1% vs yesterday", up: false },
];

const recentActivity = [
  { tenant: "Apex Solutions", action: "New campaign started", time: "2 min ago" },
  { tenant: "GrowthCo PK", action: "Balance topped up ($500)", time: "8 min ago" },
  { tenant: "SalesForce LATAM", action: "Plan upgraded to Growth", time: "23 min ago" },
  { tenant: "CallMax India", action: "5 new agents added", time: "1 hr ago" },
  { tenant: "LeadGen Pro", action: "Campaign completed (342 calls)", time: "2 hr ago" },
];

const health = [
  { name: "API Gateway", status: "healthy", latency: "12ms" },
  { name: "PostgreSQL", status: "healthy", latency: "3ms" },
  { name: "Redis", status: "healthy", latency: "1ms" },
  { name: "Voice Pipeline", status: "healthy", latency: "45ms" },
];

export default function DashboardPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Overview</h1>
          <p className="page-subtitle">Aerwave superadmin dashboard</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Recent Activity
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Activity</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{a.tenant}</td>
                    <td style={{ color: "var(--text-secondary)" }}>{a.action}</td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            System Health
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {health.map((h) => (
              <div key={h.name} className="card" style={{ padding: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className={`status-dot ${h.status}`} />
                    <span style={{ fontWeight: 500 }}>{h.name}</span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    {h.latency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
