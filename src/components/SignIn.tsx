import { useState, useEffect, useMemo } from 'react'
import { companies, groupLogo } from '../config/companies'
import type { Company } from '../types'

interface SignInProps {
  onSignIn: (companyId: string) => void
}

const tileLayout: { companyId: string; gridArea: string }[] = [
  { companyId: 'ota', gridArea: '1 / 1 / 7 / 2' },
  { companyId: 'tmc', gridArea: '1 / 2 / 8 / 3' },
  { companyId: 'b2b', gridArea: '1 / 3 / 6 / 4' },
  { companyId: 'academy', gridArea: '7 / 1 / 13 / 2' },
  { companyId: 'holidays', gridArea: '8 / 2 / 13 / 3' },
  { companyId: 'facilities', gridArea: '6 / 3 / 13 / 4' },
]

export function SignIn({ onSignIn }: SignInProps) {
  const [splash, setSplash] = useState(true)
  const [splashFading, setSplashFading] = useState(false)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setSplashFading(true), 1200)
    const hideTimer = setTimeout(() => setSplash(false), 1800)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (selectedCompanyId) {
    return (
      <SignInForm
        companyId={selectedCompanyId}
        onSignIn={onSignIn}
        onBack={() => setSelectedCompanyId(null)}
      />
    )
  }

  return (
    <>
      <BrandSelector onSelect={setSelectedCompanyId} />
      {splash && <SplashScreen fading={splashFading} />}
    </>
  )
}

function SplashScreen({ fading }: { fading: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-600 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <img
        src={groupLogo}
        alt="Finchglow Holdings"
        className="h-16 w-auto animate-[splash-in_0.8s_ease-out_both] sm:h-20"
      />
      <p className="mt-4 animate-[splash-in_0.8s_ease-out_0.3s_both] text-lg font-semibold text-gray-900">
        Group Staff Portal
      </p>
      <div className="mt-6 animate-[splash-in_0.8s_ease-out_0.5s_both]">
        <div className="h-1 w-24 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  )
}

const tileEntrance: Record<string, { x: string; y: string }> = {
  ota: { x: '-120%', y: '-60%' },
  tmc: { x: '0', y: '-120%' },
  b2b: { x: '120%', y: '-60%' },
  academy: { x: '-120%', y: '60%' },
  holidays: { x: '0', y: '120%' },
  facilities: { x: '120%', y: '60%' },
}

function BrandTile({ company, gridArea, index, onClick }: { company: Company; gridArea?: string; index: number; onClick: () => void }) {
  const [entered, setEntered] = useState(false)
  const entrance = tileEntrance[company.id] ?? { x: '0', y: '100%' }

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 80 + index * 120)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <button
      onClick={onClick}
      aria-label={`Sign in to ${company.name}`}
      className="group relative overflow-hidden rounded-xl focus:outline-2 focus:outline-offset-2"
      style={{
        outlineColor: company.accentColor,
        gridArea,
        transform: entered ? 'translate(0, 0) scale(1)' : `translate(${entrance.x}, ${entrance.y}) scale(0.7)`,
        opacity: entered ? 1 : 0,
        transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, opacity 0.6s ease ${index * 0.08}s`,
      }}
    >
      <img
        src={company.brandImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.15] group-hover:grayscale-0 group-focus-visible:scale-[1.15] group-focus-visible:grayscale-0"
      />
      <div className="absolute inset-0 bg-black/40 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:bg-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 pb-6">
        <img
          src={company.logo}
          alt={company.name}
          className="mb-2 h-8 w-auto object-contain brightness-0 invert sm:h-10"
        />
        <span className="text-xs font-medium text-white/80 sm:text-sm">
          {company.name}
        </span>
      </div>
    </button>
  )
}

function BrandSelector({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="flex h-screen flex-col bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 shrink-0 text-center">
        <img
          src={groupLogo}
          alt="Finchglow Holdings"
          className="mx-auto h-10 w-auto sm:h-12"
        />
        <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          Group Staff Portal
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Select your company to sign in
        </p>
      </div>

      {/* Desktop: staggered 3-col grid */}
      <div className="mx-auto hidden w-full max-w-5xl flex-1 sm:grid sm:grid-cols-3 sm:grid-rows-[repeat(12,1fr)] sm:gap-3">
        {tileLayout.map(({ companyId, gridArea }, i) => {
          const company = companies.find((c) => c.id === companyId)!
          return (
            <BrandTile
              key={companyId}
              company={company}
              gridArea={gridArea}
              index={i}
              onClick={() => onSelect(companyId)}
            />
          )
        })}
      </div>

      {/* Mobile: simple 2-col grid */}
      <div className="grid flex-1 grid-cols-2 grid-rows-3 gap-2 sm:hidden">
        {tileLayout.map(({ companyId }, i) => {
          const company = companies.find((c) => c.id === companyId)!
          return (
            <BrandTile
              key={companyId}
              company={company}
              index={i}
              onClick={() => onSelect(companyId)}
            />
          )
        })}
      </div>

      <p className="mt-3 shrink-0 text-center text-xs text-gray-400">
        In production, this would redirect to your organisation's SSO provider (Azure AD / Okta)
      </p>
    </div>
  )
}

function SignInForm({
  companyId,
  onSignIn,
  onBack,
}: {
  companyId: string
  onSignIn: (companyId: string) => void
  onBack: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const company = useMemo(
    () => companies.find((c) => c.id === companyId)!,
    [companyId],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSignIn(companyId)
    }, 800)
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: `
          radial-gradient(circle, #e2e8f0 1px, transparent 1px),
          radial-gradient(circle, #e2e8f0 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src={company.logo}
            alt={company.name}
            className="mx-auto h-12 w-auto"
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {company.name}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to access your workspace
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Work email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@finchglow.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-2"
              style={{ outlineColor: company.accentColor }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-2"
              style={{ outlineColor: company.accentColor }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors focus:outline-2 focus:outline-offset-2 disabled:opacity-60"
            style={{
              backgroundColor: company.accentColor,
              outlineColor: company.accentColor,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = company.accentColorDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = company.accentColor)}
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">
            In production, this would redirect to your organisation's SSO provider (Azure AD / Okta)
          </p>
        </form>

        <button
          onClick={onBack}
          className="mt-6 flex w-full items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Back to company selection
        </button>
      </div>
    </div>
  )
}
