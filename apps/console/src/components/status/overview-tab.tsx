"use client";

const healthServices = [
  { name: "API Gateway", status: "healthy", latency: "12ms", uptime: "99.98%", lastCheck: "Just now" },
  { name: "PostgreSQL", status: "healthy", latency: "3ms", uptime: "99.99%", lastCheck: "Just now" },
  { name: "Redis", status: "healthy", latency: "1ms", uptime: "100%", lastCheck: "Just now" },
  { name: "Voice Pipeline", status: "healthy", latency: "45ms", uptime: "99.95%", lastCheck: "2s ago" },
  { name: "Loki (Logs)", status: "degraded", latency: "230ms", uptime: "99.2%", lastCheck: "5s ago" },
  { name: "Grafana", status: "healthy", latency: "85ms", uptime: "99.97%", lastCheck: "3s ago" },
];

function getOverallStatus() {
  const hasDown = healthServices.some((s) => s.status === "down");
  const hasDegraded = healthServices.some((s) => s.status === "degraded");
  if (hasDown) return { label: "Major Outage Detected", className: "outage" };
  if (hasDegraded) return { label: "Partial Degradation", className: "degraded" };
  return { label: "All Systems Operational", className: "operational" };
}

export default function OverviewTab() {
  const overall = getOverallStatus();

  return (
    <>
      <div className={`status-banner ${overall.className}`}>
        <span className={`status-dot ${overall.className === "operational" ? "healthy" : overall.className}`} />
        {overall.label}
      </div>

      <div className="status-grid">
        {healthServices.map((svc) => (
          <div key={svc.name} className="glass-card">
            <div className="status-card-header">
              <div className="status-card-title">
                <span className={`status-dot ${svc.status}`} />
                {svc.name}
              </div>
              <span
                className="badge"
                style={{
                  background:
                    svc.status === "healthy"
                      ? "#22c55e15"
                      : svc.status === "degraded"
                      ? "#f59e0b15"
                      : "#ef444415",
                  color:
                    svc.status === "healthy"
                      ? "var(--success)"
                      : svc.status === "degraded"
                      ? "var(--warning)"
                      : "var(--danger)",
                }}
              >
                {svc.status}
              </span>
            </div>
            <div className="status-card-meta">
              <div className="row">
                <span>Latency</span>
                <span className="value">{svc.latency}</span>
              </div>
              <div className="row">
                <span>Uptime (30d)</span>
                <span className="value">{svc.uptime}</span>
              </div>
              <div className="row">
                <span>Last Check</span>
                <span className="value">{svc.lastCheck}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
