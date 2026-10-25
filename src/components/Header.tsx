import { usePortal } from '../context/PortalContext'
import { SearchBar } from './SearchBar'
import { CompanySwitcher } from './CompanySwitcher'
import { ThemeToggle } from './ThemeToggle'
import type { User } from '../types'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

interface HeaderProps {
  user: User
  onSignOut: () => void
  onMenuToggle?: () => void
}

export function Header({ user, onSignOut, onMenuToggle }: HeaderProps) {
  const { selectedCompany } = usePortal()

  return (
    <header className="relative z-40 shrink-0 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
      <div className="px-4 sm:px-6">
        <div className="flex h-15 items-center justify-between gap-2 sm:gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
            )}
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold leading-tight text-gray-900 sm:text-lg dark:text-white">
                {getGreeting()}, {user.name}
              </h1>
              <p className="truncate text-[11px] text-gray-500 sm:text-xs dark:text-gray-400">
                {user.role} · {selectedCompany?.shortName ?? 'All Companies'}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="hidden sm:block">
              <SearchBar />
            </div>
            <CompanySwitcher />
            <ThemeToggle />
            <button
              onClick={onSignOut}
              aria-label="Sign out"
              title="Sign out"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile-only: search bar on its own row */}
        <div className="pb-2 sm:hidden">
          <SearchBar />
        </div>
      </div>
    </header>
  )
}
