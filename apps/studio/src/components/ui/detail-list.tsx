interface DetailListProps {
  items: { label: string; value: string }[];
  columns?: 1 | 2;
}

export function DetailList({ items, columns = 1 }: DetailListProps) {
  if (columns === 2) {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.75rem",
      }}>
        {items.map((item) => (
          <div key={item.label}>
            <div className="detail-row-label">{item.label}</div>
            <div style={{ fontSize: "0.8125rem", fontWeight: 500, marginTop: "0.125rem" }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      {items.map((item) => (
        <div key={item.label} className="detail-row">
          <span className="detail-row-label">{item.label}</span>
          <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
