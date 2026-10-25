import { useState, useEffect, useCallback } from 'react'

interface MockApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  retry: () => void
}

export function useMockApi<T>(fetcher: () => T, delay = 600): MockApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => {
    setLoading(true)
    setError(null)
    setData(null)
    setAttempt((a) => a + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    const willFail = Math.random() < 0.1
    const totalDelay = willFail ? delay + 5000 : delay

    const timer = setTimeout(() => {
      if (cancelled) return
      if (willFail) {
        setError('Failed to load data. Please try again.')
        setLoading(false)
      } else {
        setData(fetcher())
        setLoading(false)
      }
    }, totalDelay)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [fetcher, delay, attempt])

  return { data, loading, error, retry }
}
