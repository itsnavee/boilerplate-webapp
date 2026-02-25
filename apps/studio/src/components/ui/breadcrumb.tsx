import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div style={{
      fontSize: "0.8125rem",
      color: "var(--text-muted)",
      marginBottom: "1rem",
    }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label}>
            {i > 0 && " / "}
            {isLast || !item.href ? (
              <span style={{ color: isLast ? "var(--text-primary)" : undefined }}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
