type BadgeVariant = 'active' | 'paused' | 'draft' | 'completed'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClass: Record<BadgeVariant, string> = {
  active: 'badge-active',
  paused: 'badge-paused',
  draft: 'badge-draft',
  completed: 'badge-completed',
}

export function Badge({ children, variant = 'draft', className = '' }: BadgeProps) {
  return (
    <span className={`badge ${variantClass[variant]} ${className}`}>
      {children}
    </span>
  )
}
