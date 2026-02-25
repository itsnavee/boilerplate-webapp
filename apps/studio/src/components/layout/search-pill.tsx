'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { navigation } from '@/components/layout/nav-data'
import { Dropdown } from '@/components/ui/dropdown'
import { api } from '@/lib/api'

interface NavResult {
  title: string
  href: string
  section: string
  icon: React.ElementType
}

interface ApiResult {
  id: string
  type: string
  title: string
  table: string
}

const typeRoutes: Record<string, string> = {
  campaigns: '/campaigns',
  leads: '/leads',
  calls: '/calls',
  knowledge_documents: '/knowledge',
  agents: '/agents',
}

function getAllNavItems(): NavResult[] {
  const items: NavResult[] = []
  for (const group of navigation) {
    for (const entry of group.entries) {
      items.push({ title: entry.label, href: entry.href, section: '', icon: entry.icon })
      if (entry.items) {
        for (const sub of entry.items) {
          items.push({ title: sub.title, href: sub.href, section: entry.label, icon: sub.icon })
        }
      }
    }
  }
  return items
}

const allNavItems = getAllNavItems()

export function SearchPill() {
  const router = useRouter()
  const [active, setActive] = useState(false)
  const [query, setQuery] = useState('')
  const [navResults, setNavResults] = useState<NavResult[]>([])
  const [apiResults, setApiResults] = useState<ApiResult[]>([])
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const totalResults = navResults.length + apiResults.length

  const open = useCallback(() => {
    setActive(true)
    setQuery('')
    setNavResults(allNavItems.slice(0, 8))
    setApiResults([])
    setSelected(0)
    setTimeout(() => inputRef.current?.focus(), 30)
  }, [])

  const close = useCallback(() => {
    setActive(false)
    setQuery('')
    setNavResults([])
    setApiResults([])
    inputRef.current?.blur()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        active ? close() : open()
      }
      if (e.key === 'Escape' && active) close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [active, open, close])

  useEffect(() => {
    if (!active) return
    const q = query.toLowerCase().trim()
    if (!q) {
      setNavResults(allNavItems.slice(0, 8))
      setApiResults([])
      return
    }
    setNavResults(allNavItems.filter(
      n => n.title.toLowerCase().includes(q) || n.section.toLowerCase().includes(q)
    ))
    setSelected(0)

    if (q.length < 2) { setApiResults([]); return }
    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await api.search(q) as { results: ApiResult[] }
        setApiResults(res.results)
      } catch { setApiResults([]) }
      finally { setLoading(false) }
    }, 300)
    return () => { clearTimeout(timer); setLoading(false) }
  }, [query, active])

  const navigate = useCallback((href: string) => {
    router.push(href)
    close()
  }, [router, close])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, totalResults - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (selected < navResults.length) {
        navigate(navResults[selected].href)
      } else {
        const r = apiResults[selected - navResults.length]
        if (r) navigate(`${typeRoutes[r.table] || '/'}/${r.id}`)
      }
    }
  }

  return (
    <div className="relative">
      <div
        className="flex items-center h-8 border border-border px-3 gap-2 transition-all duration-200 cursor-text"
        style={{ borderRadius: '9999px', width: active ? '36rem' : '12rem' }}
        onClick={() => !active && open()}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={active ? 'Search navigation, pages and any content ...' : 'Search'}
          style={{ borderRadius: 0, background: 'transparent', border: 'none', padding: 0, width: '100%', fontSize: '0.75rem' }}
          className="flex-1 text-foreground placeholder:text-[#8a8a8a] outline-none"
          onFocus={() => !active && open()}
        />
        <Search className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      </div>

      <Dropdown open={active} onClose={close} align="right" width="36rem" offset={4}>
        <div className="max-h-72 overflow-y-auto">
          {navResults.length > 0 && (
            <>
              <div className="px-3 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">Pages</div>
              {navResults.map((r, i) => {
                const Icon = r.icon
                return (
                  <button
                    key={`${r.section}-${r.href}`}
                    onClick={() => navigate(r.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs cursor-pointer transition-colors ${
                      i === selected ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 truncate">{r.title}</span>
                    {r.section && <span className="text-[10px] text-muted-foreground/50">{r.section}</span>}
                  </button>
                )
              })}
            </>
          )}
          {apiResults.length > 0 && (
            <>
              <div className="px-3 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 border-t border-border">Data</div>
              {apiResults.map((r, i) => (
                <button
                  key={`${r.table}-${r.id}`}
                  onClick={() => navigate(`${typeRoutes[r.table] || '/'}/${r.id}`)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left text-xs cursor-pointer transition-colors ${
                    (i + navResults.length) === selected ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="flex-1 truncate">{r.title}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/50">{r.type}</span>
                </button>
              ))}
            </>
          )}
          {loading && <div className="px-3 py-4 text-center text-xs text-muted-foreground">Searching...</div>}
          {!loading && query.length >= 2 && navResults.length === 0 && apiResults.length === 0 && (
            <div className="px-3 py-4 text-center text-xs text-muted-foreground">No results</div>
          )}
        </div>
      </Dropdown>
    </div>
  )
}
