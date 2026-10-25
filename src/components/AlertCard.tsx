import type { Alert } from '../types'

interface AlertCardProps {
  alert: Alert
  onClick: () => void
}

const severityConfig = {
  critical: {
    bg: 'bg-white dark:bg-gray-800',
    label: 'Critical',
    labelClass: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    iconPath: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
    iconColor: 'text-red-500',
  },
  warning: {
    bg: 'bg-white dark:bg-gray-800',
    label: 'Warning',
    labelClass: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    iconPath: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z',
    iconColor: 'text-amber-500',
  },
  info: {
    bg: 'bg-white dark:bg-gray-800',
    label: 'Info',
    labelClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    iconPath: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z',
    iconColor: 'text-blue-500',
  },
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return 'Yesterday'
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export function AlertCard({ alert, onClick }: AlertCardProps) {
  const config = severityConfig[alert.severity]

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`cursor-pointer rounded-lg border ${config.bg} border-gray-200 p-4 transition-shadow duration-200 hover:shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-accent dark:border-gray-700`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-4 w-4 ${config.iconColor}`} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={config.iconPath} />
          </svg>
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${config.labelClass}`}
          >
            {config.label}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{alert.source}</span>
        </div>
        <time className="text-xs text-gray-400 dark:text-gray-500" dateTime={alert.timestamp}>
          {formatTimestamp(alert.timestamp)}
        </time>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
        {alert.message}
      </p>
    </article>
  )
}
