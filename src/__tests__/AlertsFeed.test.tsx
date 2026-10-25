import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlertsFeed } from '../components/AlertsFeed'
import type { Alert } from '../types'

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight.',
    severity: 'info',
    companyId: 'ota',
    timestamp: '2026-10-22T08:00:00Z',
    source: 'Engineering',
  },
  {
    id: '2',
    title: 'Rate Update Delayed',
    message: 'Rates will be updated by EOD.',
    severity: 'warning',
    companyId: 'b2b',
    timestamp: '2026-10-22T09:00:00Z',
    source: 'Product',
  },
  {
    id: '3',
    title: 'New Training Available',
    message: 'IATA certification course available.',
    severity: 'info',
    companyId: 'academy',
    timestamp: '2026-10-21T11:00:00Z',
    source: 'Academy',
  },
]

describe('AlertsFeed', () => {
  it('renders all alerts', () => {
    render(<AlertsFeed alerts={mockAlerts} loading={false} error={null} onRetry={() => {}} onAlertClick={() => {}} />)
    expect(screen.getByText('System Maintenance')).toBeInTheDocument()
    expect(screen.getByText('Rate Update Delayed')).toBeInTheDocument()
    expect(screen.getByText('New Training Available')).toBeInTheDocument()
  })

  it('sorts alerts by severity (warning before info)', () => {
    render(<AlertsFeed alerts={mockAlerts} loading={false} error={null} onRetry={() => {}} onAlertClick={() => {}} />)
    const cards = screen.getAllByRole('button')
    expect(cards[0]).toHaveTextContent('Rate Update Delayed')
    expect(cards[1]).toHaveTextContent('System Maintenance')
  })

  it('shows loading skeletons when loading', () => {
    render(<AlertsFeed alerts={[]} loading={true} error={null} onRetry={() => {}} onAlertClick={() => {}} />)
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
  })

  it('shows error state with retry button', () => {
    render(
      <AlertsFeed
        alerts={[]}
        loading={false}
        error="Failed to load"
        onRetry={() => {}}
        onAlertClick={() => {}}
      />,
    )
    expect(screen.getByText(/turbulence on the feed/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('shows empty state when no alerts match search', () => {
    render(<AlertsFeed alerts={[]} loading={false} error={null} onRetry={() => {}} onAlertClick={() => {}} />)
    expect(screen.getByText(/no active alerts/i)).toBeInTheDocument()
  })
})
