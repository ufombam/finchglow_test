import { useState, useRef, useEffect } from 'react'
import { usePortal } from '../context/PortalContext'
import { companies, groupLogo } from '../config/companies'
import type { Company } from '../types'

export function CompanySwitcher() {
  const { selectedCompany, setSelectedCompany } = usePortal()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(company: Company | null) {
    setSelectedCompany(company)
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
  }

  const displayName = selectedCompany?.shortName ?? 'All Companies'

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Company: ${displayName}. Click to change`}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-2 focus:outline-offset-2 focus:outline-accent sm:gap-2 sm:px-3 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      >
        <img
          src={selectedCompany?.logo ?? groupLogo}
          alt=""
          className="h-5 w-5 shrink-0 object-contain"
          aria-hidden="true"
        />
        <span className="max-w-[80px] truncate sm:max-w-none">{displayName}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select a company"
          className="absolute left-0 z-50 mt-1 w-60 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg sm:left-auto sm:right-0 dark:border-gray-600 dark:bg-gray-800"
        >
          <li
            role="option"
            aria-selected={selectedCompany === null}
            onClick={() => handleSelect(null)}
            onKeyDown={(e) => e.key === 'Enter' && handleSelect(null)}
            tabIndex={0}
            className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
              selectedCompany === null ? 'bg-gray-50 font-semibold dark:bg-gray-700' : ''
            } text-gray-700 dark:text-gray-200`}
          >
            <img src={groupLogo} alt="" className="h-5 w-6 object-contain" aria-hidden="true" />
            All Companies
          </li>
          {companies.map((company) => (
            <li
              key={company.id}
              role="option"
              aria-selected={selectedCompany?.id === company.id}
              onClick={() => handleSelect(company)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(company)}
              tabIndex={0}
              className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selectedCompany?.id === company.id ? 'bg-gray-50 font-semibold dark:bg-gray-700' : ''
              } text-gray-700 dark:text-gray-200`}
            >
              <img
                src={company.logo}
                alt=""
                className="h-5 w-6 object-contain"
                aria-hidden="true"
              />
              {company.shortName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
