"use client";

const containers = [
  { name: "aerwave-api", image: "aerwave/api:latest", status: "running", cpu: "2.4%", memory: "256MB / 512MB", network: "12.8 MB", uptime: "5d 14h" },
  { name: "aerwave-studio", image: "aerwave/studio:latest", status: "running", cpu: "0.8%", memory: "128MB / 256MB", network: "3.2 MB", uptime: "5d 14h" },
  { name: "aerwave-console", image: "aerwave/console:latest", status: "running", cpu: "0.6%", memory: "96MB / 256MB", network: "1.1 MB", uptime: "2d 8h" },
  { name: "aerwave-voice", image: "aerwave/voice:latest", status: "running", cpu: "8.2%", memory: "480MB / 1024MB", network: "892 MB", uptime: "5d 14h" },
  { name: "aerwave-worker", image: "aerwave/worker:latest", status: "running", cpu: "1.1%", memory: "192MB / 512MB", network: "45.6 MB", uptime: "5d 14h" },
  { name: "postgres", image: "postgres:16-alpine", status: "running", cpu: "3.5%", memory: "384MB / 1024MB", network: "2.1 GB", uptime: "12d 6h" },
  { name: "redis", image: "redis:7-alpine", status: "running", cpu: "0.3%", memory: "64MB / 256MB", network: "456 MB", uptime: "12d 6h" },
  { name: "neo4j", image: "neo4j:5-community", status: "running", cpu: "1.8%", memory: "512MB / 1024MB", network: "128 MB", uptime: "12d 6h" },
  { name: "loki", image: "grafana/loki:latest", status: "restarting", cpu: "0.0%", memory: "0MB / 512MB", network: "0 MB", uptime: "0m" },
  { name: "grafana", image: "grafana/grafana:latest", status: "running", cpu: "0.5%", memory: "148MB / 512MB", network: "34 MB", uptime: "12d 6h" },
];

function memoryPct(mem: string) {
  const match = mem.match(/(\d+)MB\s*\/\s*(\d+)MB/);
  if (!match) return 0;
  return Math.round((parseInt(match[1]) / parseInt(match[2])) * 100);
}

export default function DockerTab() {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Container</th>
            <th>Image</th>
            <th>Status</th>
            <th>CPU</th>
            <th>Memory</th>
            <th>Network I/O</th>
            <th>Uptime</th>
          </tr>
        </thead>
        <tbody>
          {containers.map((c) => (
            <tr key={c.name}>
              <td style={{ fontWeight: 500, fontFamily: "monospace", fontSize: "0.85rem" }}>
                {c.name}
              </td>
              <td style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                {c.image}
              </td>
              <td>
                <span className={`container-status ${c.status}`}>
                  <span
                    className={`status-dot ${c.status === "running" ? "healthy" : c.status === "restarting" ? "degraded" : "down"}`}
                    style={{ width: "6px", height: "6px" }}
                  />
                  {c.status}
                </span>
              </td>
              <td>{c.cpu}</td>
              <td>
                <div style={{ minWidth: "140px" }}>
                  <div style={{ fontSize: "0.8rem", marginBottom: "0.25rem" }}>{c.memory}</div>
                  <div className="progress-bar" style={{ height: "4px" }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${memoryPct(c.memory)}%`,
                        background: memoryPct(c.memory) > 80 ? "var(--danger)" : memoryPct(c.memory) > 60 ? "var(--warning)" : "var(--accent)",
                      }}
                    />
                  </div>
                </div>
              </td>
              <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{c.network}</td>
              <td style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{c.uptime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
