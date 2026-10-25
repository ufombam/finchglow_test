import { AlertCard } from './AlertCard'
import { companies } from '../config/companies'
import type { Alert } from '../types'

interface AlertsFeedProps {
  alerts: Alert[]
  loading: boolean
  error: string | null
  onRetry: () => void
  onAlertClick: (alert: Alert) => void
  searchQuery?: string
}

const severityOrder = { critical: 0, warning: 1, info: 2 }

const fallbackBrandImages = [
  '/brands/finchglow-travels.jpg',
  '/brands/fcm.jpg',
  '/brands/travel-den.jpg',
  '/brands/lagos-aviation-academy.jpg',
  '/brands/finchglow-holidays.jpg',
  '/brands/finchglobal.jpg',
]

function getBrandImage(companyId: string, index: number): string {
  if (companyId === 'group') return fallbackBrandImages[index % fallbackBrandImages.length]
  const company = companies.find((c) => c.id === companyId)
  return company?.brandImage ?? fallbackBrandImages[index % fallbackBrandImages.length]
}

function AlertSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-12 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

function NewsSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl">
      <div className="h-28 bg-gray-200 dark:bg-gray-700" />
      <div className="bg-gray-50 p-3 dark:bg-gray-800">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 py-12 dark:border-gray-700 dark:bg-gray-800/50">
      <svg viewBox="0 0 120 100" className="mb-4 h-20 w-auto text-gray-300 dark:text-gray-600" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="25" y="20" width="70" height="55" rx="4" opacity="0.3" />
          <line x1="35" y1="35" x2="75" y2="35" opacity="0.2" />
          <line x1="35" y1="45" x2="65" y2="45" opacity="0.2" />
          <line x1="35" y1="55" x2="55" y2="55" opacity="0.2" />
          <circle cx="80" cy="60" r="15" fill="currentColor" opacity="0.1" />
          <line x1="74" y1="54" x2="86" y2="66" strokeWidth="2" opacity="0.4" />
          <line x1="86" y1="54" x2="74" y2="66" strokeWidth="2" opacity="0.4" />
        </g>
      </svg>
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Turbulence on the feed!
      </p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
        Fasten your seatbelt and try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      >
        Retry
      </button>
    </div>
  )
}

function formatNewsDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function NewsCard({ alert, index, onClick }: { alert: Alert; index: number; onClick: () => void }) {
  const bgImage = getBrandImage(alert.companyId, index)

  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-xl text-left focus:outline-2 focus:outline-offset-2 focus:outline-accent"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-3">
          <span className="mb-2 w-fit rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {alert.source}
          </span>
          <h3 className="text-sm font-bold leading-snug text-white">
            {alert.title}
          </h3>
          <p className="mt-0.5 text-[11px] text-white/60">
            {formatNewsDate(alert.timestamp)}
          </p>
        </div>
      </div>
      <div className="border border-t-0 border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          {alert.message}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:underline">
          Read more
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" aria-hidden="true">
            <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </button>
  )
}

export function AlertsFeed({ alerts, loading, error, onRetry, onAlertClick, searchQuery }: AlertsFeedProps) {
  const isSearching = Boolean(searchQuery?.trim())
  const sortedAlerts = [...alerts].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  )

  const alertItems = sortedAlerts.filter((a) => a.severity === 'critical' || a.severity === 'warning')
  const newsItems = sortedAlerts.filter((a) => a.severity === 'info')

  if (error) {
    return (
      <div>
        <section aria-label="Alerts">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Alerts</h2>
          <ErrorState onRetry={onRetry} />
        </section>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <section aria-label="Alerts">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Alerts</h2>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <AlertSkeleton key={i} />
            ))}
          </div>
        </section>
        <section aria-label="News" className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">News</h2>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex h-[400px] flex-col overflow-hidden rounded-xl border border-gray-200 sm:h-[500px] lg:h-full dark:border-gray-700">
      {/* Alerts section - independently scrollable */}
      <div className="relative flex h-1/2 flex-col border-b border-gray-200 dark:border-gray-700">
        <h2 className="shrink-0 px-4 pt-3 pb-2 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Alerts
        </h2>
        <div className="hide-scrollbar flex-1 overflow-y-auto px-3 pb-3">
          {alertItems.length === 0 ? (
            <p className="py-3 text-center text-sm text-gray-400 dark:text-gray-500">
              {isSearching ? 'No alerts match your search.' : 'No active alerts.'}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {alertItems.map((alert) => (
                <AlertCard key={alert.id} alert={alert} onClick={() => onAlertClick(alert)} />
              ))}
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white dark:from-gray-900" />
      </div>

      {/* News section - independently scrollable */}
      <div className="relative flex h-1/2 flex-col">
        <h2 className="shrink-0 px-4 pt-3 pb-2 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          News
        </h2>
        <div className="hide-scrollbar flex-1 overflow-y-auto px-3 pb-3">
          {newsItems.length === 0 ? (
            <p className="py-3 text-center text-sm text-gray-400 dark:text-gray-500">
              {isSearching ? 'No news matches your search.' : 'No news right now.'}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {newsItems.map((alert, i) => (
                <NewsCard key={alert.id} alert={alert} index={i} onClick={() => onAlertClick(alert)} />
              ))}
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 rounded-b-xl bg-gradient-to-t from-white dark:from-gray-900" />
      </div>
    </div>
  )
}
