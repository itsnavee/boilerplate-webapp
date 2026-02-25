"use client";

import { useState, useEffect } from "react";
import OverviewTab from "@/components/status/overview-tab";
import ServicesTab from "@/components/status/services-tab";
import DockerTab from "@/components/status/docker-tab";
import MetricsTab from "@/components/status/metrics-tab";

const tabs = ["Overview", "Services", "Docker", "Metrics"];

export default function StatusPage() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Auto-refresh every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const timeSince = () => {
    const diff = Math.floor((Date.now() - lastRefresh.getTime()) / 1000);
    if (diff < 5) return "Just now";
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff / 60)}m ago`;
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">System Status</h1>
          <p className="page-subtitle">Real-time platform health monitoring</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="refresh-indicator">
            <span className="refresh-dot" />
            Auto-refresh: {timeSince()}
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setLastRefresh(new Date())}
          >
            Refresh Now
          </button>
        </div>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && <OverviewTab />}
      {activeTab === "Services" && <ServicesTab />}
      {activeTab === "Docker" && <DockerTab />}
      {activeTab === "Metrics" && <MetricsTab />}
    </>
  );
}
