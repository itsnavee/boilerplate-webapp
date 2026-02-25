'use client'

import { useRef, useEffect } from 'react'

interface DropdownProps {
  open: boolean
  onClose: () => void
  align?: 'left' | 'right'
  width?: string
  offset?: number
  children: React.ReactNode
}

export function Dropdown({ open, onClose, align = 'left', width, offset = 8, children }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute border border-border rounded-lg shadow-2xl overflow-hidden z-50"
      style={{
        background: 'hsl(var(--card))',
        top: `calc(100% + ${offset}px)`,
        ...(align === 'right' ? { right: 0 } : { left: 0 }),
        ...(width ? { width } : {}),
      }}
    >
      {children}
    </div>
  )
}
