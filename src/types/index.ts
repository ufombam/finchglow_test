export interface Company {
  id: string
  name: string
  shortName: string
  accentColor: string
  accentColorLight: string
  accentColorDark: string
  logo: string
  brandImage: string
}

export interface App {
  id: string
  name: string
  description: string
  url: string
  companyIds: string[]
}

export type AlertSeverity = 'critical' | 'warning' | 'info'

export interface Alert {
  id: string
  title: string
  message: string
  severity: AlertSeverity
  companyId: string | 'group'
  timestamp: string
  source: string
}

export interface User {
  name: string
  role: string
  companyId: string
}
