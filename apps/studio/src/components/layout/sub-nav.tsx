'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import type { NavEntry, SubNavItem } from './nav-data'

interface SubNavProps {
  section: NavEntry
  pathname: string
  userCollapsed: boolean
  onToggle: () => void
}

function NavLink({ item, active, onClick }: { item: SubNavItem; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'nav-item-active text-foreground'
          : 'text-[#8a8a8a] hover:text-foreground hover:bg-muted/50'
      }`}
    >
      <item.icon className="h-3.5 w-3.5" />
      <span className="flex-1">{item.title}</span>
    </Link>
  )
}

export function SubNav({ section, pathname, userCollapsed, onToggle }: SubNavProps) {
  const hasSections = section.sections && section.sections.length > 0
  if (!section.items && !hasSections) return null

  const [hovered, setHovered] = useState(false)
  const justClicked = useRef(false)

  const collapsed = userCollapsed && !hovered

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  const handleLinkClick = () => {
    if (userCollapsed) {
      justClicked.current = true
      setHovered(false)
    }
  }

  const toggleBtn = (
    <button
      onClick={onToggle}
      className="p-1 rounded-full border border-[#666] text-[#666] bg-white dark:bg-[#1a1a1a] hover:text-foreground hover:border-foreground transition-colors"
    >
      {userCollapsed
        ? <ChevronsRight className="h-3.5 w-3.5" />
        : <ChevronsLeft className="h-3.5 w-3.5" />
      }
    </button>
  )

  return (
    <aside
      className={`${collapsed ? 'w-[52px]' : ''} flex flex-col bg-card border-r border-border transition-all`}
      style={collapsed ? undefined : { width: section.subNavWidth || 220 }}
      onMouseEnter={() => {
        if (userCollapsed && !justClicked.current) setHovered(true)
      }}
      onMouseLeave={() => {
        justClicked.current = false
        setHovered(false)
      }}
    >
      {/* Title bar */}
      <div className={`h-12 flex items-center border-b border-border ${collapsed ? 'justify-center' : 'justify-between px-5'}`}>
        {!collapsed && <span className="text-sm font-semibold text-foreground">{section.label}</span>}
        {toggleBtn}
      </div>

      {/* Items */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {collapsed
          ? (hasSections
            ? section.sections!.map((sec, i) => (
                <div key={sec.heading}>
                  {i > 0 && <div className="my-2 mx-2 border-t border-border" />}
                  {sec.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={item.title}
                        onClick={handleLinkClick}
                        className={`flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-all ${
                          active
                            ? 'nav-item-active text-foreground'
                            : 'text-[#8a8a8a] hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                      </Link>
                    )
                  })}
                </div>
              ))
            : (section.items || []).map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    onClick={handleLinkClick}
                    className={`flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'nav-item-active text-foreground'
                        : 'text-[#8a8a8a] hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                  </Link>
                )
              })
          )
          : hasSections
            ? section.sections!.map((sec, i) => (
                <div key={sec.heading}>
                  {i > 0 && <div className="my-2 mx-2 border-t border-border" />}
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#666]">
                    {sec.heading}
                  </div>
                  {sec.items.map((item) => (
                    <NavLink key={item.href} item={item} active={isActive(item.href)} onClick={handleLinkClick} />
                  ))}
                </div>
              ))
            : section.items!.map((item) => (
                <NavLink key={item.href} item={item} active={isActive(item.href)} onClick={handleLinkClick} />
              ))
        }
      </nav>
    </aside>
  )
}
