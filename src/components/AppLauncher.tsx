import { useState } from 'react'
import { AppCard } from './AppCard'
import type { App } from '../types'

interface AppLauncherProps {
  apps: App[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

function AppSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-800/50">
        <svg viewBox="0 0 280 200" className="mb-6 h-40 w-auto" aria-hidden="true">
          {/* sky */}
          <circle cx="60" cy="35" r="18" fill="#e2e8f0" opacity="0.6" />
          <circle cx="80" cy="30" r="22" fill="#e2e8f0" opacity="0.5" />
          <circle cx="100" cy="35" r="16" fill="#e2e8f0" opacity="0.6" />
          <circle cx="200" cy="25" r="14" fill="#e2e8f0" opacity="0.4" />
          <circle cx="218" cy="22" r="18" fill="#e2e8f0" opacity="0.35" />
          {/* ground */}
          <ellipse cx="140" cy="175" rx="120" ry="12" fill="#e2e8f0" opacity="0.5" />
          {/* plane body - tilted nose-down */}
          <g transform="translate(90, 80) rotate(18)">
            <ellipse cx="0" cy="0" rx="60" ry="14" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <ellipse cx="50" cy="0" rx="12" ry="10" fill="#94a3b8" opacity="0.4" />
            <rect x="-30" y="-6" width="8" height="5" rx="1" fill="#94a3b8" opacity="0.6" />
            <rect x="-16" y="-6" width="8" height="5" rx="1" fill="#94a3b8" opacity="0.6" />
            <rect x="-2" y="-6" width="8" height="5" rx="1" fill="#94a3b8" opacity="0.6" />
            <rect x="12" y="-6" width="8" height="5" rx="1" fill="#94a3b8" opacity="0.6" />
          </g>
          {/* tail fin */}
          <path d="M52 72 L38 42 L58 58" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          {/* left wing - drooping */}
          <path d="M105 100 L70 140 L115 118" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          {/* right wing - tilted up */}
          <path d="M145 85 L195 60 L155 82" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          {/* propeller - bent */}
          <line x1="186" y1="98" x2="195" y2="85" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="186" y1="98" x2="192" y2="112" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          {/* smoke puffs */}
          <circle cx="200" cy="82" r="7" fill="#cbd5e1" opacity="0.7" />
          <circle cx="213" cy="74" r="9" fill="#cbd5e1" opacity="0.5" />
          <circle cx="228" cy="65" r="7" fill="#cbd5e1" opacity="0.35" />
          <circle cx="240" cy="58" r="5" fill="#cbd5e1" opacity="0.2" />
          {/* impact lines */}
          <line x1="185" y1="105" x2="195" y2="115" stroke="#94a3b8" strokeWidth="1" opacity="0.4" />
          <line x1="190" y1="102" x2="202" y2="108" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />
          <line x1="180" y1="110" x2="188" y2="120" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />
          {/* dizzy stars */}
          <text x="170" y="75" fontSize="12" opacity="0.4">*</text>
          <text x="182" y="68" fontSize="10" opacity="0.3">*</text>
          {/* bandaid on body */}
          <g transform="translate(120, 90) rotate(18)">
            <rect x="-8" y="-3" width="16" height="6" rx="2" fill="#fbbf24" opacity="0.6" />
            <line x1="-3" y1="-1" x2="-3" y2="1" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="0" y1="-1" x2="0" y2="1" stroke="#f59e0b" strokeWidth="0.8" />
            <line x1="3" y1="-1" x2="3" y2="1" stroke="#f59e0b" strokeWidth="0.8" />
          </g>
        </svg>
        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">
          Mayday, mayday! Apps failed to take off.
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          Our crew is looking into it. Try again?
        </p>
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-accent px-5 py-2 text-sm font-medium text-white hover:bg-accent-dark focus:outline-2 focus:outline-offset-2 focus:outline-accent"
        >
          Clear for takeoff
        </button>
      </div>
    </div>
  )
}

export function AppLauncher({ apps, loading, error, onRetry }: AppLauncherProps) {
  const [expanded, setExpanded] = useState(false)
  const COLLAPSED_LIMIT = 6

  const displayedApps = expanded ? apps : apps.slice(0, COLLAPSED_LIMIT)
  const hasMore = apps.length > COLLAPSED_LIMIT

  return (
    <section aria-label="Applications">
      <h2 className="mb-3 text-base font-bold text-gray-900 sm:mb-4 sm:text-lg dark:text-white">Your Apps</h2>
      {error ? (
        <ErrorState onRetry={onRetry} />
      ) : loading ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <AppSkeleton key={i} />
          ))}
        </div>
      ) : apps.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No apps found matching your search.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
            {displayedApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium text-accent hover:underline"
            >
              {expanded ? 'Show less' : `See all ${apps.length} apps`}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </>
      )}
    </section>
  )
}
