import { useState } from 'react'
import type { Alert } from '../types'

interface CriticalBannerProps {
  alerts: Alert[]
}

export function CriticalBanner({ alerts }: CriticalBannerProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())

  const visible = alerts.filter((a) => !dismissedIds.has(a.id))

  if (visible.length === 0) return null

  function dismiss(id: string) {
    setDismissedIds((prev) => new Set(prev).add(id))
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-0 top-0 z-50 border-b border-red-300 bg-red-600 text-white shadow-lg dark:bg-red-700"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
        {visible.map((alert) => (
          <div key={alert.id} className="flex items-start gap-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-0.5 h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold">{alert.title}</p>
              <p className="text-xs text-red-100">{alert.message}</p>
            </div>
            <button
              onClick={() => dismiss(alert.id)}
              aria-label={`Dismiss alert: ${alert.title}`}
              className="mt-0.5 shrink-0 rounded p-1 hover:bg-red-500 focus:outline-2 focus:outline-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
