"use client";

const members = [
  { name: "John Doe", email: "john@demo.com", role: "Owner", joined: "Dec 2025" },
  { name: "Jane Smith", email: "jane@demo.com", role: "Admin", joined: "Jan 2026" },
  { name: "Alex Kim", email: "alex@demo.com", role: "Member", joined: "Feb 2026" },
];

export default function SettingsMembers() {
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          {members.length} team members
        </p>
        <button className="btn btn-primary">Invite Member</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email}>
                <td style={{ fontWeight: 500 }}>{m.name}</td>
                <td style={{ color: "var(--text-secondary)" }}>{m.email}</td>
                <td>
                  <span className={`badge ${m.role === "Owner" ? "badge-active" : "badge-draft"}`}>
                    {m.role}
                  </span>
                </td>
                <td style={{ color: "var(--text-muted)" }}>{m.joined}</td>
                <td>
                  {m.role !== "Owner" && (
                    <button className="btn btn-danger" style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
