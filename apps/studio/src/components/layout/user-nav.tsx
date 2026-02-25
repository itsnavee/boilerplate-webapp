'use client'

import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Dropdown } from '@/components/ui/dropdown'

// Mock user — replace with auth context later
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@aerwave.io',
}

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase()
}

export function UserNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-8 pl-1 pr-2.5 rounded-full border border-border hover:bg-muted transition-colors cursor-pointer"
      >
        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-semibold text-primary-foreground flex-shrink-0">
          {getInitials(user.firstName, user.lastName)}
        </div>
        <span className="text-xs font-medium text-foreground whitespace-nowrap">
          {user.firstName} {user.lastName}
        </span>
        <ChevronsUpDown className="h-3 w-3 text-muted-foreground flex-shrink-0" />
      </button>

      <Dropdown open={open} onClose={() => setOpen(false)} align="right" width="12rem">
        <div className="px-3 py-2.5 border-b border-border">
          <div className="text-xs font-medium text-foreground">{user.firstName} {user.lastName}</div>
          <div className="text-[11px] text-muted-foreground">{user.email}</div>
        </div>
        <div className="py-1">
          {[
            { label: 'Profile', href: '/settings/general' },
            { label: 'Billing', href: '/settings/billing' },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              className="block px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="border-t border-border py-1">
          <button className="w-full text-left px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
            Sign out
          </button>
        </div>
      </Dropdown>
    </div>
  )
}
