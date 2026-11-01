import { useState, useCallback, useMemo } from 'react'
import { usePortal } from './context/PortalContext'
import { SignIn } from './components/SignIn'
import { SkipLink } from './components/SkipLink'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { CriticalBanner } from './components/CriticalBanner'
import { AppLauncher } from './components/AppLauncher'
import { AlertsFeed } from './components/AlertsFeed'
import { AlertDetail } from './components/AlertDetail'
import { UpcomingEvents } from './components/UpcomingEvents'
import { BackgroundShapes } from './components/BackgroundShapes'
import { useSearch } from './hooks/useSearch'
import { useMockApi } from './hooks/useMockApi'
import { mockApps, mockAlerts } from './data/mockData'
import { companies } from './config/companies'
import type { User, Alert } from './types'

function getStoredUser(): User | null {
  try {
    const stored = sessionStorage.getItem('portal-user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export default function App() {
  const { setSelectedCompany } = usePortal()
  const [user, setUser] = useState<User | null>(() => {
    const stored = getStoredUser()
    if (stored) {
      const company = companies.find((c) => c.id === stored.companyId)
      if (company) setSelectedCompany(company)
    }
    return stored
  })

  function handleSignIn(companyId: string) {
    const company = companies.find((c) => c.id === companyId)
    if (company) setSelectedCompany(company)
    const newUser = { name: 'Moses', role: 'Travel Consultant', companyId }
    sessionStorage.setItem('portal-user', JSON.stringify(newUser))
    setUser(newUser)
  }

  function handleSignOut() {
    sessionStorage.removeItem('portal-user')
    setUser(null)
  }

  if (!user) {
    return <SignIn onSignIn={handleSignIn} />
  }

  return <Portal user={user} onSignOut={handleSignOut} />
}

function Portal({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const { selectedCompany, searchQuery } = usePortal()
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const fetchApps = useCallback(() => mockApps, [])
  const fetchAlerts = useCallback(() => mockAlerts, [])

  const { data: allApps, loading: appsLoading, error: appsError, retry: retryApps } = useMockApi(fetchApps)
  const { data: allAlerts, loading: alertsLoading, error: alertsError, retry: retryAlerts } = useMockApi(fetchAlerts)

  const filteredApps = useMemo(() => {
    if (!allApps) return []
    if (!selectedCompany) return allApps
    return allApps.filter((app) => app.companyIds.includes(selectedCompany.id))
  }, [allApps, selectedCompany])

  const filteredAlerts = useMemo(() => {
    if (!allAlerts) return []
    if (!selectedCompany) return allAlerts
    return allAlerts.filter(
      (alert) => alert.companyId === selectedCompany.id || alert.companyId === 'group',
    )
  }, [allAlerts, selectedCompany])

  const { apps: searchedApps, alerts: searchedAlerts } = useSearch(
    searchQuery,
    filteredApps,
    filteredAlerts,
  )

  const criticalAlerts = useMemo(() => {
    if (!allAlerts) return []
    return allAlerts.filter(
      (alert) =>
        alert.severity === 'critical' &&
        (alert.companyId === 'group' ||
          !selectedCompany ||
          alert.companyId === selectedCompany.id),
    )
  }, [allAlerts, selectedCompany])

  return (
    <div className="flex min-h-screen bg-gray-50/80 text-gray-900 lg:h-screen lg:overflow-hidden dark:bg-gray-900 dark:text-gray-100">
      <BackgroundShapes />
      <SkipLink />
      <Sidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <CriticalBanner alerts={criticalAlerts} />
        <Header user={user} onSignOut={onSignOut} onMenuToggle={() => setSidebarOpen((v) => !v)} />

        <main id="main-content" className="min-h-0 flex-1 px-4 py-6 sm:px-6 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:h-full">
            <div className="flex flex-col gap-6 lg:h-full lg:flex-row lg:gap-8">
              <div className="hide-scrollbar min-w-0 flex-1 lg:overflow-y-auto">
                <AppLauncher
                  apps={searchedApps}
                  loading={appsLoading}
                  error={appsError}
                  onRetry={retryApps}
                />
                <UpcomingEvents />
              </div>
              <aside className="w-full shrink-0 lg:max-w-sm lg:overflow-hidden">
                <AlertsFeed
                  alerts={searchedAlerts}
                  loading={alertsLoading}
                  error={alertsError}
                  onRetry={retryAlerts}
                  onAlertClick={setSelectedAlert}
                  searchQuery={searchQuery}
                />
              </aside>
            </div>
          </div>
        </main>

        <footer className="relative shrink-0 border-t border-gray-200 bg-white/80 py-4 text-center text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Finchglow Holdings. Group Staff Portal.
        </footer>
      </div>

      {selectedAlert && (
        <AlertDetail alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
      )}
    </div>
  )
}
