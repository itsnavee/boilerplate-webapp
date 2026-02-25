interface EmptyStateProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  )
}
