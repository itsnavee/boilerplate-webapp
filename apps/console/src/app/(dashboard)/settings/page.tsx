"use client";

import { useState } from "react";

const plans = [
  { name: "Trial", price: "$0", calls: 100, minutes: 300, agents: 1, features: "Basic STT/TTS" },
  { name: "Starter", price: "$49/mo", calls: 2000, minutes: 6000, agents: 5, features: "Standard voices, 1 campaign" },
  { name: "Growth", price: "$149/mo", calls: 10000, minutes: 30000, agents: 15, features: "Premium voices, unlimited campaigns" },
  { name: "Enterprise", price: "Custom", calls: -1, minutes: -1, agents: -1, features: "Custom voices, dedicated support, SLA" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("plans");

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Settings</h1>
          <p className="page-subtitle">System configuration and plan management</p>
        </div>
      </div>

      <div className="tabs">
        {["plans", "system", "api-keys", "notifications"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {activeTab === "plans" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Plan Management</h3>
            <button className="btn btn-primary">+ Add Plan</button>
          </div>
          <div className="stats-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {plans.map((p) => (
              <div key={p.name} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.125rem" }}>{p.name}</div>
                    <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: "1rem", marginTop: "0.25rem" }}>
                      {p.price}
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">Edit</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <div>Calls: {p.calls === -1 ? "Unlimited" : p.calls.toLocaleString()}</div>
                  <div>Minutes: {p.minutes === -1 ? "Unlimited" : p.minutes.toLocaleString()}</div>
                  <div>Agents: {p.agents === -1 ? "Unlimited" : p.agents}</div>
                  <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid var(--border)" }}>
                    {p.features}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "system" && (
        <div className="card" style={{ maxWidth: "600px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>System Configuration</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label>Default Voice Provider</label>
              <select><option>Deepgram</option><option>ElevenLabs</option></select>
            </div>
            <div>
              <label>Default LLM</label>
              <select><option>GPT-4o-mini</option><option>Claude Sonnet</option></select>
            </div>
            <div>
              <label>Max Concurrent Calls (global)</label>
              <input type="number" defaultValue={500} />
            </div>
            <div>
              <label>Rate Limit (calls/min/tenant)</label>
              <input type="number" defaultValue={30} />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "api-keys" && (
        <div className="card" style={{ maxWidth: "600px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>API Provider Keys</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label>Telnyx API Key</label>
              <input type="password" defaultValue="tlx_sk_***************" />
            </div>
            <div>
              <label>Deepgram API Key</label>
              <input type="password" defaultValue="dg_***************" />
            </div>
            <div>
              <label>ElevenLabs API Key</label>
              <input type="password" defaultValue="el_***************" />
            </div>
            <div>
              <label>OpenAI API Key</label>
              <input type="password" defaultValue="sk-***************" />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Update Keys</button>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="card" style={{ maxWidth: "600px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.5rem" }}>Alert Notifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label>Alert Email</label>
              <input type="email" defaultValue="alerts@aerwave.ai" />
            </div>
            <div>
              <label>Slack Webhook URL</label>
              <input type="url" placeholder="https://hooks.slack.com/..." />
            </div>
            <div>
              <label>Error Rate Threshold (%)</label>
              <input type="number" defaultValue={5} />
            </div>
            <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Save Alerts</button>
          </div>
        </div>
      )}
    </>
  );
}
