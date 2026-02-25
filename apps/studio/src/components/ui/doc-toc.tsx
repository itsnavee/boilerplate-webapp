'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface TocItem {
  id: string
  text: string
  level: number
}

export function DocToc() {
  const pathname = usePathname()
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  // Extract headings from doc-content on mount / route change
  useEffect(() => {
    const container = document.querySelector('.doc-content')
    if (!container) return

    const headings = container.querySelectorAll('h2, h3')
    const tocItems: TocItem[] = []

    headings.forEach((el, i) => {
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `heading-${i}`
      }
      tocItems.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H3' ? 3 : 2,
      })
    })

    setItems(tocItems)
    setActiveId(tocItems[0]?.id || '')
  }, [pathname])

  // Track active heading on scroll
  useEffect(() => {
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible?.target.id) setActiveId(visible.target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav className="doc-toc">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#666] mb-2">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
            setActiveId(item.id)
          }}
          className={`doc-toc-item ${item.level === 3 ? 'doc-toc-h3' : ''} ${activeId === item.id ? 'doc-toc-active' : ''}`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
