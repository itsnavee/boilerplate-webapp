interface ProgressBarProps {
  value: number
  max?: number
  color?: string
}

export function ProgressBar({ value, max = 100, color }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${pct}%`, ...(color ? { background: color } : {}) }}
      />
    </div>
  )
}
