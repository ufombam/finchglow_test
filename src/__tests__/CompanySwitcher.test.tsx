import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PortalProvider } from '../context/PortalContext'
import { CompanySwitcher } from '../components/CompanySwitcher'

function renderSwitcher() {
  return render(
    <PortalProvider>
      <CompanySwitcher />
    </PortalProvider>,
  )
}

describe('CompanySwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the switcher button', () => {
    renderSwitcher()
    expect(screen.getByRole('button', { name: /company/i })).toBeInTheDocument()
  })

  it('opens dropdown and shows all companies', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole('button', { name: /company/i }))
    const listbox = screen.getByRole('listbox')
    expect(listbox).toBeInTheDocument()
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(7)
    expect(options[0]).toHaveTextContent('All Companies')
    expect(options[1]).toHaveTextContent('Academy')
    expect(options[2]).toHaveTextContent('Travels')
    expect(options[3]).toHaveTextContent('Travel Den')
    expect(options[4]).toHaveTextContent('FCM')
    expect(options[5]).toHaveTextContent('Holidays')
    expect(options[6]).toHaveTextContent('FinchGlobal')
  })

  it('switches company when an option is clicked', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole('button', { name: /company/i }))
    await user.click(screen.getByText('FCM'))
    expect(screen.getByRole('button', { name: /company.*fcm/i })).toBeInTheDocument()
  })

  it('updates the accent CSS variable when switching companies', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole('button', { name: /company/i }))
    await user.click(screen.getByText('Holidays'))
    const accent = document.documentElement.style.getPropertyValue('--accent')
    expect(accent).toBe('#F4A623')
  })

  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup()
    renderSwitcher()
    await user.click(screen.getByRole('button', { name: /company/i }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
