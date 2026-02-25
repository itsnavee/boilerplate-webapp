"use client";

import { useState } from "react";

const mockCalls = [
  { id: "c201", tenant: "Apex Solutions", from: "+1 650 555 0101", to: "+1 415 555 0102", duration: "3:42", status: "completed", cost: "$0.18", agent: "Sales Bot A", time: "2 min ago" },
  { id: "c202", tenant: "GrowthCo PK", from: "+1 212 555 0100", to: "+92 300 1234567", duration: "1:15", status: "completed", cost: "$0.12", agent: "Lead Qualifier", time: "5 min ago" },
  { id: "c203", tenant: "VoiceReach EU", from: "+44 20 7946 0100", to: "+44 20 7946 0958", duration: "0:00", status: "failed", cost: "$0.00", agent: "Outbound UK", time: "8 min ago" },
  { id: "c204", tenant: "SalesForce LATAM", from: "+1 310 555 0100", to: "+52 55 1234 5678", duration: "5:20", status: "completed", cost: "$0.28", agent: "LATAM Closer", time: "12 min ago" },
  { id: "c205", tenant: "CallMax India", from: "+1 408 555 0100", to: "+91 98765 43210", duration: "2:08", status: "completed", cost: "$0.14", agent: "India Outreach", time: "18 min ago" },
  { id: "c206", tenant: "Apex Solutions", from: "+1 650 555 0101", to: "+1 925 555 0188", duration: "0:45", status: "no-answer", cost: "$0.04", agent: "Sales Bot A", time: "22 min ago" },
  { id: "c207", tenant: "GrowthCo PK", from: "+1 212 555 0100", to: "+92 321 9876543", duration: "4:12", status: "completed", cost: "$0.22", agent: "Appointment Setter", time: "30 min ago" },
  { id: "c208", tenant: "LeadGen Pro", from: "+1 718 555 0100", to: "+1 305 555 0166", duration: "0:00", status: "failed", cost: "$0.00", agent: "Cold Caller", time: "35 min ago" },
  { id: "c209", tenant: "VoiceReach EU", from: "+44 20 7946 0100", to: "+49 30 1234 5678", duration: "6:30", status: "completed", cost: "$0.35", agent: "EU Qualifier", time: "42 min ago" },
  { id: "c210", tenant: "TeleSales BD", from: "+1 617 555 0100", to: "+880 1712 345678", duration: "1:55", status: "completed", cost: "$0.11", agent: "BD Outreach", time: "50 min ago" },
];

const badgeClass = (status: string) => {
  const map: Record<string, string> = {
    completed: "badge-active",
    failed: "badge-suspended",
    "no-answer": "badge-paused",
    "in-progress": "badge-trial",
  };
  return map[status] || "badge-draft";
};

export default function CallsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockCalls.filter(
    (c) =>
      c.tenant.toLowerCase().includes(search.toLowerCase()) ||
      c.to.includes(search) ||
      c.id.includes(search)
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Calls</h1>
          <p className="page-subtitle">All calls across all tenants</p>
        </div>
        <button className="btn btn-secondary">Export CSV</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by tenant, phone, or call ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={{ maxWidth: "160px" }}>
          <option>All Status</option>
          <option>Completed</option>
          <option>Failed</option>
          <option>No Answer</option>
          <option>In Progress</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tenant</th>
              <th>From</th>
              <th>To</th>
              <th>Agent</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{c.id}</td>
                <td style={{ fontWeight: 500 }}>{c.tenant}</td>
                <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{c.from}</td>
                <td style={{ fontSize: "0.8rem" }}>{c.to}</td>
                <td style={{ color: "var(--text-secondary)" }}>{c.agent}</td>
                <td>{c.duration}</td>
                <td><span className={`badge ${badgeClass(c.status)}`}>{c.status}</span></td>
                <td>{c.cost}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{c.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
