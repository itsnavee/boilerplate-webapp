"use client";

const apiKeys = [
  { name: "Production Key", key: "aer_live_...x4f2", created: "Jan 15, 2026", lastUsed: "2 min ago" },
  { name: "Development Key", key: "aer_test_...k8m1", created: "Feb 01, 2026", lastUsed: "1 hour ago" },
];

export default function SettingsApiKeys() {
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          Manage your API keys for programmatic access
        </p>
        <button className="btn btn-primary">Create Key</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Created</th>
              <th>Last Used</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((k) => (
              <tr key={k.key}>
                <td style={{ fontWeight: 500 }}>{k.name}</td>
                <td style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>{k.key}</td>
                <td style={{ color: "var(--text-muted)" }}>{k.created}</td>
                <td style={{ color: "var(--text-muted)" }}>{k.lastUsed}</td>
                <td>
                  <button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
