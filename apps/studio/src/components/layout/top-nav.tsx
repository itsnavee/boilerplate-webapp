'use client'

import Link from 'next/link'
import { Sun, Moon, Home, Settings, Sparkles, AudioLines, RefreshCw } from 'lucide-react'
import { useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { usePageHeader } from '@/lib/page-header-context'
import { useTheme } from '@/lib/theme-context'
import { findActiveSection, getSection } from '@/components/layout/nav-data'
import { OrgSwitcher } from '@/components/layout/org-switcher'
import { SearchPill } from '@/components/layout/search-pill'
import { ThemeColorPicker } from '@/components/layout/theme-color-picker'
import { UserNav } from '@/components/layout/user-nav'

type SystemStatus = 'operational' | 'degraded' | 'outage'

const STATUS_CONFIG: Record<SystemStatus, { color: string; bg: string; label: string }> = {
  operational: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', label: 'All systems operational' },
  degraded: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Services degraded' },
  outage: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Service outage' },
}

function StatusBadge() {
  // TODO: fetch from API — hardcoded for now
  const status: SystemStatus = 'operational'
  const { color, bg, label } = STATUS_CONFIG[status]

  return (
    <div
      className="h-8 flex items-center gap-1.5 px-3 rounded-full border border-border text-xs text-muted-foreground whitespace-nowrap"
      style={{ backgroundColor: bg }}
    >
      <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}

export function TopNav() {
  const { actions } = usePageHeader()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    router.refresh()
    setTimeout(() => setRefreshing(false), 600)
  }, [router])
  const activeKey = findActiveSection(pathname)
  const activeEntry = activeKey ? getSection(activeKey) : null

  return (
    <header className="studio-top-nav sticky top-0 z-30 bg-card border-b border-border">
      <div className="flex items-center justify-between h-12 px-6">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <AudioLines className="h-5 w-5 flex-shrink-0" style={{ color: '#22c55e' }} />
          <span className="text-sm font-semibold text-foreground whitespace-nowrap" style={{ fontFamily: 'var(--font-open-sans)' }}>aerwave</span>
          <span className="text-[#c0c0c0] text-sm px-1">/</span>
          <OrgSwitcher />
          {activeEntry && (
            <>
              <span className="text-[#c0c0c0] text-sm px-1">/</span>
              <span className="text-sm font-medium text-foreground truncate" style={{ fontFamily: 'var(--font-open-sans)' }}>{activeEntry.label}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {actions}
          <StatusBadge />
          <SearchPill />
          <div className="w-px h-5 bg-border mx-0" />
          <ThemeColorPicker />
          <Link
            href="/composer"
            title="Composer"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Sparkles className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            title="Home"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
          <Link
            href="/settings"
            title="Settings"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Settings className="h-4 w-4" />
          </Link>
          <button
            onClick={handleRefresh}
            title="Refresh data"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            className="h-8 w-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
          <div className="w-px h-5 bg-border mx-0" />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
