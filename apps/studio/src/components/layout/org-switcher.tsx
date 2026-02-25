'use client'

import { useState, useEffect } from 'react'
import { LayoutDashboard, ChevronsUpDown } from 'lucide-react'
import { Dropdown } from '@/components/ui/dropdown'

export function OrgSwitcher() {
  const [open, setOpen] = useState(false)
  const [subdomain, setSubdomain] = useState('')

  useEffect(() => {
    setSubdomain(window.location.hostname.split('.')[0].replace(/^\w/, c => c.toUpperCase()))
  }, [])

  // Mock orgs — replace with API call later
  const slug = subdomain.toLowerCase() || 'studio'
  const orgs = [
    { slug, name: subdomain, plan: 'ULTRA' },
    { slug: 'acme-sales', name: 'Acme Sales', plan: 'PREMIUM' },
    { slug: 'globex-corp', name: 'Globex Corp', plan: 'STANDARD' },
  ]
  const currentOrg = orgs[0]

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <LayoutDashboard className="h-3.5 w-3.5 text-foreground flex-shrink-0" />
        <span className="text-sm font-medium text-foreground whitespace-nowrap" style={{ fontFamily: 'var(--font-open-sans)' }}>
          {currentOrg.name}
        </span>
        <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ background: '#dcfce7', color: '#16a34a', border: '1px solid #a7f3d0' }}>{currentOrg.plan}</span>
        <ChevronsUpDown className="h-3.5 w-3.5 text-[#8a8a8a] flex-shrink-0" />
      </button>
      <Dropdown open={open} onClose={() => setOpen(false)} width="14rem">
        <div className="px-3 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-[#8a8a8a]">Organizations</div>
        {orgs.map(org => (
          <button
            key={org.slug}
            onClick={() => setOpen(false)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs cursor-pointer transition-colors ${
              org.slug === currentOrg.slug ? 'text-foreground bg-muted' : 'text-[#8a8a8a] hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="flex-1 truncate">{org.name}</span>
            <span className="text-[8px] font-bold tracking-wider px-1 py-0.5 rounded-full whitespace-nowrap" style={{ background: '#dcfce7', color: '#16a34a', border: '1px solid #a7f3d0' }}>{org.plan}</span>
          </button>
        ))}
      </Dropdown>
    </div>
  )
}
