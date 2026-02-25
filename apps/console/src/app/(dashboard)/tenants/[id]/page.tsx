"use client";

import { useState } from "react";
import Link from "next/link";

const tenant = {
  id: "t2",
  name: "GrowthCo PK",
  slug: "growthco",
  plan: "Enterprise",
  status: "active",
  balance: 5800,
  totalCalls: 12890,
  totalMinutes: 38670,
  members: 24,
  created: "2025-10-02",
  domain: "growthco.aerwave.ai",
};

const members = [
  { name: "Ahmad Khan", email: "ahmad@growthco.pk", role: "owner", lastLogin: "2 hrs ago" },
  { name: "Sara Ali", email: "sara@growthco.pk", role: "admin", lastLogin: "5 hrs ago" },
  { name: "Usman Raza", email: "usman@growthco.pk", role: "agent", lastLogin: "1 day ago" },
  { name: "Fatima Noor", email: "fatima@growthco.pk", role: "agent", lastLogin: "3 hrs ago" },
];

const recentCalls = [
  { id: "c101", to: "+1 415 555 0102", duration: "3:42", status: "completed", cost: "$0.18", time: "10 min ago" },
  { id: "c102", to: "+1 212 555 0199", duration: "1:15", status: "completed", cost: "$0.08", time: "25 min ago" },
  { id: "c103", to: "+44 20 7946 0958", duration: "0:00", status: "failed", cost: "$0.00", time: "32 min ago" },
  { id: "c104", to: "+1 310 555 0147", duration: "5:20", status: "completed", cost: "$0.28", time: "1 hr ago" },
];

export default function TenantDetailPage() {
  const [adjAmount, setAdjAmount] = useState("");
  const [adjReason, setAdjReason] = useState("");

  return (
    <>
      <div className="page-header">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
            <Link href="/tenants" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem" }}>
              Tenants
            </Link>
            <span style={{ color: "var(--text-muted)" }}>/</span>
            <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{tenant.name}</span>
          </div>
          <h1 className="page-title">{tenant.name}</h1>
          <p className="page-subtitle">{tenant.domain}</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Suspend</button>
        </div>
      </div>

      {/* Overview cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>{tenant.plan}</div>
          <div className="stat-label">Plan</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>
            <span className={`badge badge-active`}>{tenant.status}</span>
          </div>
          <div className="stat-label">Status</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>{tenant.members}</div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>{tenant.totalCalls.toLocaleString()}</div>
          <div className="stat-label">Total Calls</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>{tenant.totalMinutes.toLocaleString()}</div>
          <div className="stat-label">Total Minutes</div>
        </div>
      </div>

      <div className="grid-2">
        {/* Balance section */}
        <div className="detail-section">
          <div className="detail-section-title">Balance Management</div>
          <div className="card">
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Current Balance
              </span>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent)" }}>
                ${tenant.balance.toLocaleString()}
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <label>Adjustment ($)</label>
                <input
                  type="number"
                  placeholder="+100 or -50"
                  value={adjAmount}
                  onChange={(e) => setAdjAmount(e.target.value)}
                />
              </div>
              <div style={{ flex: 2 }}>
                <label>Reason</label>
                <input
                  type="text"
                  placeholder="Top-up, refund, correction..."
                  value={adjReason}
                  onChange={(e) => setAdjReason(e.target.value)}
                />
              </div>
              <button className="btn btn-primary">Apply</button>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="detail-section">
          <div className="detail-section-title">Members</div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.email}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{m.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{m.email}</div>
                    </td>
                    <td><span className="badge badge-draft">{m.role}</span></td>
                    <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{m.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent calls */}
      <div className="detail-section">
        <div className="detail-section-title">Recent Calls</div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Call ID</th>
                <th>To</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{c.id}</td>
                  <td>{c.to}</td>
                  <td>{c.duration}</td>
                  <td>
                    <span className={`badge ${c.status === "completed" ? "badge-active" : "badge-suspended"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>{c.cost}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
