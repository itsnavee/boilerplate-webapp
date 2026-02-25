"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "grid" },
  { href: "/tenants", label: "Tenants", icon: "users" },
  { href: "/calls", label: "Calls", icon: "phone" },
  { href: "/analytics", label: "Analytics", icon: "chart" },
  { href: "/status", label: "Status", icon: "activity" },
  { href: "/settings", label: "Settings", icon: "gear" },
];

const icons: Record<string, string> = {
  grid: "\u25A6",
  users: "\u2630",
  phone: "\u260E",
  chart: "\u2593",
  activity: "\u2665",
  gear: "\u2699",
};

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <h1>
          Aer<span>wave</span>
        </h1>
        <p>Console</p>
      </div>

      <div className="sidebar-section">Navigation</div>

      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
        >
          <span style={{ fontSize: "1.1rem", width: "20px", textAlign: "center" }}>
            {icons[item.icon]}
          </span>
          {item.label}
        </Link>
      ))}

      <div className="sidebar-section" style={{ marginTop: "auto", paddingTop: "2rem" }}>
        Platform
      </div>
      <div style={{ padding: "0.5rem 1.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
        v0.1.0 - Superadmin
      </div>
    </nav>
  );
}
