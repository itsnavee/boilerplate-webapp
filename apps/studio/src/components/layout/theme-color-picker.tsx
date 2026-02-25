'use client'

import { useState } from 'react'
import { useTheme, accentOptions } from '@/lib/theme-context'
import { Dropdown } from '@/components/ui/dropdown'

export function ThemeColorPicker() {
  const { accent, setAccent } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        title="Theme color"
        className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
      >
        <div className="h-4 w-4 rounded-full" style={{ background: accentOptions.find(o => o.key === accent)?.color || '#6b7280' }} />
      </button>
      <Dropdown open={open} onClose={() => setOpen(false)} align="right" width="10rem">
        <div className="px-3 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-[#8a8a8a]">Theme color</div>
        {accentOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => { setAccent(opt.key); setOpen(false) }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs cursor-pointer transition-colors ${
              accent === opt.key ? 'text-foreground bg-muted' : 'text-[#8a8a8a] hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <div className="h-3.5 w-3.5 rounded-full flex-shrink-0" style={{ background: opt.color }} />
            <span>{opt.label}</span>
          </button>
        ))}
      </Dropdown>
    </div>
  )
}
