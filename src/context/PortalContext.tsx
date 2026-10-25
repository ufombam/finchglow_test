import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Company } from '../types'
import { companies } from '../config/companies'

interface PortalState {
  selectedCompany: Company | null
  darkMode: boolean
  searchQuery: string
  setSelectedCompany: (company: Company | null) => void
  toggleDarkMode: () => void
  setSearchQuery: (query: string) => void
}

const PortalContext = createContext<PortalState | undefined>(undefined)

function getInitialDarkMode(): boolean {
  const stored = localStorage.getItem('finchglow-dark-mode')
  if (stored !== null) return stored === 'true'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialCompany(): Company | null {
  const stored = localStorage.getItem('finchglow-company')
  if (stored) {
    const found = companies.find((c) => c.id === stored)
    if (found) return found
  }
  return companies[0]
}

function applyCompanyTheme(company: Company | null) {
  const root = document.documentElement
  if (company) {
    root.style.setProperty('--accent', company.accentColor)
    root.style.setProperty('--accent-light', company.accentColorLight)
    root.style.setProperty('--accent-dark', company.accentColorDark)
  } else {
    root.style.setProperty('--accent', '#0077B6')
    root.style.setProperty('--accent-light', '#E0F2FE')
    root.style.setProperty('--accent-dark', '#023E8A')
  }
}

export function PortalProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompanyState] = useState<Company | null>(getInitialCompany)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const [searchQuery, setSearchQuery] = useState('')

  const setSelectedCompany = useCallback((company: Company | null) => {
    setSelectedCompanyState(company)
    localStorage.setItem('finchglow-company', company?.id ?? '')
    applyCompanyTheme(company)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev
      localStorage.setItem('finchglow-dark-mode', String(next))
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    applyCompanyTheme(selectedCompany)
  }, [selectedCompany])

  return (
    <PortalContext.Provider
      value={{ selectedCompany, darkMode, searchQuery, setSelectedCompany, toggleDarkMode, setSearchQuery }}
    >
      {children}
    </PortalContext.Provider>
  )
}

export function usePortal(): PortalState {
  const context = useContext(PortalContext)
  if (!context) throw new Error('usePortal must be used within a PortalProvider')
  return context
}
