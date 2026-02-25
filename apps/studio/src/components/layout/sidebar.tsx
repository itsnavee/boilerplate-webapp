'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { navigation, findActiveSection, getSection } from './nav-data'
import { SubNav } from './sub-nav'

export function Sidebar() {
  const pathname = usePathname()
  const [sidebarUserCollapsed, setSidebarUserCollapsed] = useState(false)
  const [sidebarHovered, setSidebarHovered] = useState(false)
  const sidebarJustClicked = useRef(false)

  const [subNavUserCollapsed, setSubNavUserCollapsed] = useState(false)

  const activeSection = findActiveSection(pathname)
  const currentSection = activeSection ? getSection(activeSection) : null
  const showSubNav = !!(currentSection?.items?.length || currentSection?.sections?.length)

  const sidebarCollapsed = sidebarUserCollapsed && !sidebarHovered

  const toggleBtn = (
    <button
      onClick={() => setSidebarUserCollapsed((c) => !c)}
      className="p-1 rounded-full border border-[#666] text-[#666] bg-white dark:bg-[#1a1a1a] hover:text-foreground hover:border-foreground transition-colors"
    >
      {sidebarUserCollapsed
        ? <ChevronsRight className="h-3.5 w-3.5" />
        : <ChevronsLeft className="h-3.5 w-3.5" />
      }
    </button>
  )

  const handleSidebarLinkClick = () => {
    if (sidebarUserCollapsed) {
      sidebarJustClicked.current = true
      setSidebarHovered(false)
    }
  }

  return (
    <div className="flex min-h-0">
      {/* Sidebar rail */}
      <aside
        className={`${sidebarCollapsed ? 'w-[52px]' : 'w-[200px]'} flex flex-col bg-card border-r border-border transition-all`}
        onMouseEnter={() => {
          if (sidebarUserCollapsed && !sidebarJustClicked.current) setSidebarHovered(true)
        }}
        onMouseLeave={() => {
          sidebarJustClicked.current = false
          setSidebarHovered(false)
        }}
      >
        {/* Title row */}
        <div className={`h-12 flex items-center border-b border-border ${sidebarCollapsed ? 'justify-center' : 'justify-between px-5'}`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-foreground">Studio</span>
              <span className="text-xs text-[#8a8a8a]">v1.0</span>
            </div>
          )}
          {toggleBtn}
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          {navigation.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <div className="my-2 mx-2 border-t border-border" />}
              {group.entries.map((entry) => {
                const isActive = activeSection === entry.key
                return (
                  <Link
                    key={entry.key}
                    href={entry.href}
                    title={sidebarCollapsed ? entry.label : undefined}
                    onClick={handleSidebarLinkClick}
                    className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2.5'} px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'nav-item-active text-foreground'
                        : 'text-[#8a8a8a] hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <entry.icon className="h-3.5 w-3.5 flex-shrink-0" />
                    {!sidebarCollapsed && <span className="flex-1 truncate">{entry.label}</span>}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      {showSubNav && currentSection && (
        <SubNav
          section={currentSection}
          pathname={pathname}
          userCollapsed={subNavUserCollapsed}
          onToggle={() => setSubNavUserCollapsed((c) => !c)}
        />
      )}
    </div>
  )
}
