interface PageHeaderProps {
  title: string
  children?: React.ReactNode
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="page-header">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
