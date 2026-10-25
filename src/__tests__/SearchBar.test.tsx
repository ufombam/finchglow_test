import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PortalProvider } from '../context/PortalContext'
import { SearchBar } from '../components/SearchBar'

function renderSearch() {
  return render(
    <PortalProvider>
      <SearchBar />
    </PortalProvider>,
  )
}

describe('SearchBar', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the search input with accessible label', () => {
    renderSearch()
    expect(screen.getByLabelText(/search apps and alerts/i)).toBeInTheDocument()
  })

  it('shows clear button when input has text', async () => {
    const user = userEvent.setup()
    renderSearch()
    const input = screen.getByLabelText(/search apps and alerts/i)
    await user.type(input, 'booking')
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument()
  })

  it('clears the input when clear button is clicked', async () => {
    const user = userEvent.setup()
    renderSearch()
    const input = screen.getByLabelText(/search apps and alerts/i) as HTMLInputElement
    await user.type(input, 'booking')
    await user.click(screen.getByLabelText(/clear search/i))
    await waitFor(() => expect(input.value).toBe(''))
  })

  it('has the search role for accessibility', () => {
    renderSearch()
    expect(screen.getByRole('search')).toBeInTheDocument()
  })
})
