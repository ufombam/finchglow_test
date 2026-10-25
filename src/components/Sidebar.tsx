import { useState } from 'react'
import { usePortal } from '../context/PortalContext'
import { groupLogo } from '../config/companies'

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'apps', label: 'Apps', icon: AppsIcon },
  { id: 'alerts', label: 'Alerts', icon: AlertsIcon },
  { id: 'events', label: 'Events', icon: EventsIcon },
  { id: 'messages', label: 'Messages', icon: MessagesIcon },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { selectedCompany } = usePortal()
  const [activeItem, setActiveItem] = useState('home')
  const [collapsed, setCollapsed] = useState(false)
  const logoSrc = selectedCompany?.logo ?? groupLogo

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 lg:pointer-events-none lg:hidden lg:opacity-0"
        onClick={onMobileClose}
        aria-hidden="true"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:relative lg:z-auto ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          width: collapsed ? 68 : 240,
          transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Logo area */}
        <div className="flex h-15 shrink-0 items-center gap-2.5 border-b border-gray-200 px-4 dark:border-gray-700">
          <img
            src={logoSrc}
            alt={selectedCompany?.name ?? 'Finchglow Holdings'}
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span
            className="overflow-hidden truncate text-sm font-bold text-gray-900 dark:text-white"
            style={{ opacity: collapsed ? 0 : 1, maxWidth: collapsed ? 0 : 192, transition: 'opacity 0.3s ease, max-width 0.3s ease' }}
          >
            {selectedCompany?.shortName ?? 'Finchglow'}
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Main navigation">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.id === activeItem
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveItem(item.id)
                      onMobileClose()
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon active={isActive} />
                    <span
                      className="overflow-hidden whitespace-nowrap"
                      style={{ opacity: collapsed ? 0 : 1, maxWidth: collapsed ? 0 : 192, transition: 'opacity 0.3s ease, max-width 0.3s ease' }}
                    >{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Collapse toggle — desktop only */}
        <div className="hidden shrink-0 border-t border-gray-200 p-2 lg:block dark:border-gray-700">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
            <span
                      className="overflow-hidden whitespace-nowrap"
                      style={{ opacity: collapsed ? 0 : 1, maxWidth: collapsed ? 0 : 192, transition: 'opacity 0.3s ease, max-width 0.3s ease' }}
                    >Collapse</span>
          </button>
        </div>
      </aside>
    </>
  )
}

/* ─── Icon components ─── */

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
    </svg>
  )
}

function AppsIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path fillRule="evenodd" d="M3.5 2A1.5 1.5 0 002 3.5V5a1.5 1.5 0 001.5 1.5H5A1.5 1.5 0 006.5 5V3.5A1.5 1.5 0 005 2H3.5zM3.5 8A1.5 1.5 0 002 9.5V11A1.5 1.5 0 003.5 12.5H5A1.5 1.5 0 006.5 11V9.5A1.5 1.5 0 005 8H3.5zM3.5 14A1.5 1.5 0 002 15.5V17A1.5 1.5 0 003.5 18.5H5A1.5 1.5 0 006.5 17v-1.5A1.5 1.5 0 005 14H3.5zM9.5 2A1.5 1.5 0 008 3.5V5a1.5 1.5 0 001.5 1.5H11A1.5 1.5 0 0012.5 5V3.5A1.5 1.5 0 0011 2H9.5zM9.5 8A1.5 1.5 0 008 9.5V11a1.5 1.5 0 001.5 1.5H11A1.5 1.5 0 0012.5 11V9.5A1.5 1.5 0 0011 8H9.5zM9.5 14A1.5 1.5 0 008 15.5V17a1.5 1.5 0 001.5 1.5H11A1.5 1.5 0 0012.5 17v-1.5A1.5 1.5 0 0011 14H9.5zM15.5 2A1.5 1.5 0 0014 3.5V5a1.5 1.5 0 001.5 1.5H17A1.5 1.5 0 0018.5 5V3.5A1.5 1.5 0 0017 2h-1.5zM15.5 8A1.5 1.5 0 0014 9.5V11a1.5 1.5 0 001.5 1.5H17A1.5 1.5 0 0018.5 11V9.5A1.5 1.5 0 0017 8h-1.5zM15.5 14a1.5 1.5 0 00-1.5 1.5V17a1.5 1.5 0 001.5 1.5H17A1.5 1.5 0 0018.5 17v-1.5A1.5 1.5 0 0017 14h-1.5z" clipRule="evenodd" />
    </svg>
  )
}

function AlertsIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
    </svg>
  )
}

function EventsIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
    </svg>
  )
}

function MessagesIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
      <path d="M14 6c.762 0 1.52.02 2.271.062C17.226 6.175 18 7.049 18 8.078v2.642c0 1.03-.774 1.903-1.729 2.016A38.87 38.87 0 0115 12.878v2.872a.75.75 0 01-1.28.53l-2.3-2.3A41.119 41.119 0 019.5 13.62C8.774 13.507 8 12.633 8 11.604V8.078C8 7.049 8.774 6.175 9.729 6.062A38.87 38.87 0 0114 6z" />
    </svg>
  )
}

function AnalyticsIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
    </svg>
  )
}

function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${active ? 'text-accent' : ''}`} aria-hidden="true">
      <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  )
}
