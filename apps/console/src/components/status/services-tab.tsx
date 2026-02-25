"use client";

const services = [
  { name: "API", url: "api.aerwave.ai/health", status: "healthy", responseTime: "12ms", lastCheck: "Just now" },
  { name: "Studio", url: "studio.aerwave.ai", status: "healthy", responseTime: "145ms", lastCheck: "5s ago" },
  { name: "Console", url: "console.aerwave.ai", status: "healthy", responseTime: "98ms", lastCheck: "3s ago" },
  { name: "Website", url: "aerwave.ai", status: "healthy", responseTime: "220ms", lastCheck: "8s ago" },
  { name: "WebSocket Gateway", url: "ws.aerwave.ai", status: "healthy", responseTime: "8ms", lastCheck: "2s ago" },
  { name: "Webhook Receiver", url: "api.aerwave.ai/webhooks", status: "healthy", responseTime: "15ms", lastCheck: "1s ago" },
];

export default function ServicesTab() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>URL</th>
            <th>Status</th>
            <th>Response Time</th>
            <th>Last Check</th>
          </tr>
        </thead>
        <tbody>
          {services.map((svc) => (
            <tr key={svc.name}>
              <td style={{ fontWeight: 500 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className={`status-dot ${svc.status}`} />
                  {svc.name}
                </div>
              </td>
              <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                {svc.url}
              </td>
              <td>
                <span
                  className="badge"
                  style={{
                    background: svc.status === "healthy" ? "#22c55e15" : svc.status === "degraded" ? "#f59e0b15" : "#ef444415",
                    color: svc.status === "healthy" ? "var(--success)" : svc.status === "degraded" ? "var(--warning)" : "var(--danger)",
                  }}
                >
                  {svc.status}
                </span>
              </td>
              <td>{svc.responseTime}</td>
              <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{svc.lastCheck}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
