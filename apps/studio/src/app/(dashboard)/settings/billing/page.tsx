"use client";

import { SectionHeading } from "@/components/ui/section-heading";

export default function SettingsBilling() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Plan */}
      <div className="card">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Pro Plan</h3>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              5,000 minutes/month included
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>$299</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>/month</div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="card">
        <SectionHeading>Current Usage</SectionHeading>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { label: "Minutes Used", used: 4293, total: 5000 },
            { label: "Campaigns", used: 8, total: 20 },
            { label: "Knowledge Docs", used: 12, total: 50 },
          ].map((item) => (
            <div key={item.label}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.8125rem",
                marginBottom: "0.375rem",
              }}>
                <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                <span>
                  <span style={{ fontWeight: 600 }}>{item.used.toLocaleString()}</span>
                  <span style={{ color: "var(--text-muted)" }}> / {item.total.toLocaleString()}</span>
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(item.used / item.total) * 100}%`,
                    background: (item.used / item.total) > 0.8 ? "var(--warning)" : "var(--accent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Balance */}
      <div className="card">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <SectionHeading className="mb-0">Prepaid Balance</SectionHeading>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              Auto-refill enabled at $50
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--success)" }}>
              $1,847
            </div>
            <button className="btn btn-secondary">Add Funds</button>
          </div>
        </div>
      </div>
    </div>
  );
}
