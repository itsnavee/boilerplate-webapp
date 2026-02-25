"use client";

import { useState } from "react";
import Link from "next/link";

interface Call {
  id: string;
  date: string;
  lead: string;
  phone: string;
  campaign: string;
  duration: string;
  outcome: string;
  tier: string;
  sentiment: string;
}

const calls: Call[] = [
  { id: "call_001", date: "Feb 22, 10:42 AM", lead: "Sarah Johnson", phone: "+1 (555) 234-5678", campaign: "US Enterprise Q1", duration: "3:42", outcome: "Appointment Set", tier: "Tier 1", sentiment: "Positive" },
  { id: "call_002", date: "Feb 22, 10:38 AM", lead: "Mike Chen", phone: "+1 (555) 876-5432", campaign: "LATAM Outbound", duration: "1:18", outcome: "Callback Requested", tier: "Tier 2", sentiment: "Neutral" },
  { id: "call_003", date: "Feb 22, 10:31 AM", lead: "Priya Sharma", phone: "+91 98765 43210", campaign: "India Tech Sales", duration: "5:01", outcome: "Qualified Lead", tier: "Tier 1", sentiment: "Positive" },
  { id: "call_004", date: "Feb 22, 10:24 AM", lead: "James Wilson", phone: "+1 (555) 345-6789", campaign: "US Enterprise Q1", duration: "0:34", outcome: "No Answer", tier: "Tier 3", sentiment: "--" },
  { id: "call_005", date: "Feb 22, 10:15 AM", lead: "Ana Rodriguez", phone: "+52 55 1234 5678", campaign: "LATAM Outbound", duration: "2:56", outcome: "Meeting Booked", tier: "Tier 1", sentiment: "Positive" },
  { id: "call_006", date: "Feb 22, 10:08 AM", lead: "Tom Baker", phone: "+44 7700 900123", campaign: "UK Financial", duration: "4:12", outcome: "Interested", tier: "Tier 2", sentiment: "Positive" },
  { id: "call_007", date: "Feb 22, 09:55 AM", lead: "David Park", phone: "+1 (555) 456-7890", campaign: "US Enterprise Q1", duration: "0:12", outcome: "Voicemail", tier: "Tier 3", sentiment: "--" },
  { id: "call_008", date: "Feb 22, 09:48 AM", lead: "Lisa Wang", phone: "+1 (555) 567-8901", campaign: "WhatsApp Follow-up", duration: "3:27", outcome: "Appointment Set", tier: "Tier 1", sentiment: "Positive" },
  { id: "call_009", date: "Feb 22, 09:40 AM", lead: "Raj Patel", phone: "+91 87654 32109", campaign: "India Tech Sales", duration: "1:45", outcome: "Not Interested", tier: "Tier 2", sentiment: "Negative" },
  { id: "call_010", date: "Feb 22, 09:32 AM", lead: "Emma Brown", phone: "+1 (555) 678-9012", campaign: "US Enterprise Q1", duration: "2:18", outcome: "Callback Requested", tier: "Tier 2", sentiment: "Neutral" },
];

const outcomeColors: Record<string, string> = {
  "Appointment Set": "badge-active",
  "Meeting Booked": "badge-active",
  "Qualified Lead": "badge-completed",
  "Interested": "badge-completed",
  "Callback Requested": "badge-paused",
  "No Answer": "badge-draft",
  "Voicemail": "badge-draft",
  "Not Interested": "badge-draft",
};

const sentimentColors: Record<string, string> = {
  Positive: "var(--success)",
  Neutral: "var(--warning)",
  Negative: "var(--danger)",
  "--": "var(--text-muted)",
};

const filters = ["All Outcomes", "Appointment Set", "Meeting Booked", "Qualified Lead", "Callback Requested", "No Answer", "Voicemail", "Not Interested"];

export default function CallsPage() {
  const [outcomeFilter, setOutcomeFilter] = useState("All Outcomes");

  const filtered = outcomeFilter === "All Outcomes"
    ? calls
    : calls.filter((c) => c.outcome === outcomeFilter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.675rem" }}>
      {/* Header */}
      <div className="page-header">
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
          {calls.length} calls today
        </p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            style={{ width: "auto", minWidth: "180px" }}
          >
            {filters.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <button className="btn btn-secondary">Export CSV</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Lead</th>
              <th>Campaign</th>
              <th>Duration</th>
              <th>Outcome</th>
              <th>Tier</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((call) => (
              <tr key={call.id}>
                <td style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                  {call.date}
                </td>
                <td>
                  <Link
                    href={`/calls/${call.id}`}
                    style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: 500 }}
                  >
                    {call.lead}
                  </Link>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {call.phone}
                  </div>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{call.campaign}</td>
                <td style={{ fontFamily: "monospace" }}>{call.duration}</td>
                <td>
                  <span className={`badge ${outcomeColors[call.outcome] || "badge-draft"}`}>
                    {call.outcome}
                  </span>
                </td>
                <td style={{ color: "var(--text-secondary)" }}>{call.tier}</td>
                <td>
                  <span style={{
                    fontSize: "0.8125rem",
                    color: sentimentColors[call.sentiment] || "var(--text-muted)",
                  }}>
                    {call.sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No matching calls</h3>
          <p>Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
