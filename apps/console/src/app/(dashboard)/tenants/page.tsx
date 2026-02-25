"use client";

import { useState } from "react";
import Link from "next/link";

const mockTenants = [
  { id: "t1", name: "Apex Solutions", slug: "apex", plan: "Growth", status: "active", balance: "$1,240", calls: 3412, members: 8, created: "2025-11-15" },
  { id: "t2", name: "GrowthCo PK", slug: "growthco", plan: "Enterprise", status: "active", balance: "$5,800", calls: 12890, members: 24, created: "2025-10-02" },
  { id: "t3", name: "SalesForce LATAM", slug: "sf-latam", plan: "Growth", status: "active", balance: "$890", calls: 2301, members: 6, created: "2025-12-08" },
  { id: "t4", name: "CallMax India", slug: "callmax", plan: "Starter", status: "active", balance: "$120", calls: 456, members: 3, created: "2026-01-10" },
  { id: "t5", name: "LeadGen Pro", slug: "leadgen", plan: "Growth", status: "suspended", balance: "$0", calls: 8921, members: 12, created: "2025-09-20" },
  { id: "t6", name: "VoiceReach EU", slug: "voicereach", plan: "Enterprise", status: "active", balance: "$3,400", calls: 15600, members: 18, created: "2025-08-14" },
  { id: "t7", name: "TeleSales BD", slug: "telesales", plan: "Trial", status: "trial", balance: "$25", calls: 89, members: 2, created: "2026-02-18" },
  { id: "t8", name: "Outreach Corp", slug: "outreach", plan: "Starter", status: "paused", balance: "$45", calls: 1230, members: 4, created: "2025-12-30" },
];

const badgeClass = (status: string) => {
  const map: Record<string, string> = {
    active: "badge-active",
    suspended: "badge-suspended",
    paused: "badge-paused",
    trial: "badge-trial",
  };
  return map[status] || "badge-draft";
};

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockTenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tenants</h1>
          <p className="page-subtitle">{mockTenants.length} registered tenants</p>
        </div>
        <button className="btn btn-primary">+ Add Tenant</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tenants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={{ maxWidth: "160px" }}>
          <option>All Plans</option>
          <option>Starter</option>
          <option>Growth</option>
          <option>Enterprise</option>
          <option>Trial</option>
        </select>
        <select style={{ maxWidth: "160px" }}>
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
          <option>Paused</option>
          <option>Trial</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Calls (month)</th>
              <th>Members</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td style={{ fontWeight: 500 }}>
                  <Link href={`/tenants/${t.id}`} style={{ color: "var(--text-primary)", textDecoration: "none" }}>
                    {t.name}
                  </Link>
                </td>
                <td style={{ color: "var(--text-secondary)", fontFamily: "monospace", fontSize: "0.8rem" }}>
                  {t.slug}
                </td>
                <td>{t.plan}</td>
                <td><span className={`badge ${badgeClass(t.status)}`}>{t.status}</span></td>
                <td>{t.balance}</td>
                <td>{t.calls.toLocaleString()}</td>
                <td>{t.members}</td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{t.created}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={`/tenants/${t.id}`} className="btn btn-secondary btn-sm">View</Link>
                    {t.status === "active" ? (
                      <button className="btn btn-danger btn-sm">Suspend</button>
                    ) : t.status === "suspended" ? (
                      <button className="btn btn-success btn-sm">Reactivate</button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
