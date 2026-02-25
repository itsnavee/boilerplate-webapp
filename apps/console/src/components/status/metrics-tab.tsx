"use client";

const latencyMetrics = [
  { label: "API Latency p50", value: "12", unit: "ms" },
  { label: "API Latency p95", value: "48", unit: "ms" },
  { label: "API Latency p99", value: "120", unit: "ms" },
  { label: "Voice Latency p50", value: "310", unit: "ms" },
  { label: "Voice Latency p95", value: "580", unit: "ms" },
  { label: "Voice Latency p99", value: "780", unit: "ms" },
];

const throughputMetrics = [
  { label: "Requests / min", value: "842", unit: "" },
  { label: "Active Connections", value: "156", unit: "" },
  { label: "WebSocket Connections", value: "23", unit: "" },
  { label: "Queue Depth", value: "7", unit: "jobs" },
];

const errorMetrics = [
  { label: "Error Rate (5xx)", value: "0.12", unit: "%" },
  { label: "Error Rate (4xx)", value: "1.8", unit: "%" },
  { label: "Failed Calls (today)", value: "34", unit: "" },
  { label: "Timeout Rate", value: "0.05", unit: "%" },
];

function MetricGroup({ title, metrics }: { title: string; metrics: typeof latencyMetrics }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>{title}</h3>
      <div className="metrics-grid">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <div className="metric-value">
              {m.value}
              {m.unit && <span className="metric-unit"> {m.unit}</span>}
            </div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MetricsTab() {
  return (
    <>
      <MetricGroup title="API Latency" metrics={latencyMetrics} />
      <MetricGroup title="Throughput" metrics={throughputMetrics} />
      <MetricGroup title="Errors" metrics={errorMetrics} />

      <div className="grid-2">
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Latency Over Time
          </h3>
          <div className="chart-placeholder">
            Latency chart - integrate with monitoring stack
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>
            Error Rate Over Time
          </h3>
          <div className="chart-placeholder">
            Error rate chart - integrate with monitoring stack
          </div>
        </div>
      </div>
    </>
  );
}
