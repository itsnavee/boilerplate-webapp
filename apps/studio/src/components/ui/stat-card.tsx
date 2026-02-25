interface StatCardProps {
  label: string
  value: string | number
  change?: string
  color?: string
}

export function StatCard({ label, value, change, color }: StatCardProps) {
  return (
    <div className="stat-card relative">
      {change && (
        <div className="absolute top-3 right-3 text-[0.7rem] font-semibold" style={{ color }}>
          {change}
        </div>
      )}
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
