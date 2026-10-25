import { useMemo } from 'react'
import type { App, Alert } from '../types'

interface SearchResults {
  apps: App[]
  alerts: Alert[]
}

export function useSearch(
  query: string,
  apps: App[],
  alerts: Alert[],
): SearchResults {
  return useMemo(() => {
    if (!query.trim()) return { apps, alerts }

    const q = query.toLowerCase().trim()

    return {
      apps: apps.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q),
      ),
      alerts: alerts.filter(
        (alert) =>
          alert.title.toLowerCase().includes(q) ||
          alert.message.toLowerCase().includes(q) ||
          alert.source.toLowerCase().includes(q),
      ),
    }
  }, [query, apps, alerts])
}
