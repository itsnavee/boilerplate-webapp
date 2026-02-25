'use client'

import { createContext, useContext, useState, useRef, ReactNode, useCallback } from 'react'

interface PageHeaderState {
  title: string
  description?: string
  actions?: ReactNode
}

interface PageHeaderContextValue extends PageHeaderState {
  setPageHeader: (header: PageHeaderState) => void
  clearPageHeader: () => void
}

const PageHeaderContext = createContext<PageHeaderContextValue | null>(null)

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [header, setHeader] = useState<PageHeaderState>({ title: '' })
  const prevTitleRef = useRef<string>('')
  const prevDescRef = useRef<string | undefined>()

  const setPageHeader = useCallback((newHeader: PageHeaderState) => {
    if (prevTitleRef.current !== newHeader.title || prevDescRef.current !== newHeader.description) {
      prevTitleRef.current = newHeader.title
      prevDescRef.current = newHeader.description
      setHeader(newHeader)
    }
  }, [])

  const clearPageHeader = useCallback(() => {
    prevTitleRef.current = ''
    prevDescRef.current = undefined
    setHeader({ title: '' })
  }, [])

  return (
    <PageHeaderContext.Provider value={{ ...header, setPageHeader, clearPageHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}

export function usePageHeader() {
  const context = useContext(PageHeaderContext)
  if (!context) {
    throw new Error('usePageHeader must be used within PageHeaderProvider')
  }
  return context
}
