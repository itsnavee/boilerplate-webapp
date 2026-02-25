"use client";

import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="header-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span className="header-label">Console</span>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Platform Administration
        </span>
      </div>
      <div className="header-user">
        <ThemeToggle />
        <span>super@aerwave.ai</span>
        <div className="header-avatar">SA</div>
      </div>
    </header>
  );
}
