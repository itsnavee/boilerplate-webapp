"use client";

const logs = [
  { id: "evt_1a2b", type: "call.started", agent: "Sales Agent v2", timestamp: "2026-02-24 14:32:01", status: "success" },
  { id: "evt_3c4d", type: "call.completed", agent: "Sales Agent v2", timestamp: "2026-02-24 14:35:18", status: "success" },
  { id: "evt_5e6f", type: "webhook.sent", agent: "Support Bot", timestamp: "2026-02-24 14:30:44", status: "success" },
  { id: "evt_7g8h", type: "call.failed", agent: "Lead Qualifier", timestamp: "2026-02-24 14:28:12", status: "error" },
  { id: "evt_9i0j", type: "campaign.started", agent: "—", timestamp: "2026-02-24 14:25:00", status: "success" },
  { id: "evt_k1l2", type: "stt.timeout", agent: "Sales Agent v2", timestamp: "2026-02-24 14:22:33", status: "warning" },
];

export default function EventLogsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Real-time event stream across all services
        </p>
        <button className="btn btn-secondary">Export</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Type</th>
              <th>Agent</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>{l.id}</td>
                <td style={{ fontWeight: 500 }}>{l.type}</td>
                <td style={{ color: "var(--text-secondary)" }}>{l.agent}</td>
                <td style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: "0.8125rem" }}>{l.timestamp}</td>
                <td>
                  <span className={`badge ${
                    l.status === "success" ? "badge-active" :
                    l.status === "error" ? "badge-completed" : "badge-paused"
                  }`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
