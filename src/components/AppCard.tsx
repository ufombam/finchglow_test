import type { App } from '../types'
import { appIcons } from './icons'

interface AppCardProps {
  app: App
}

export function AppCard({ app }: AppCardProps) {
  const IconComponent = appIcons[app.id]

  return (
    <a
      href={app.url}
      className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:border-accent hover:shadow-md focus:outline-2 focus:outline-offset-2 focus:outline-accent sm:flex-col sm:items-center sm:gap-2 sm:p-5 sm:text-center dark:border-gray-700 dark:bg-gray-800 dark:hover:border-accent"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-light text-accent sm:h-10 sm:w-10">
        {IconComponent ? <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" /> : null}
      </div>
      <div className="min-w-0 sm:w-full">
        <h3 className="text-xs font-semibold text-gray-900 group-hover:text-accent sm:text-sm dark:text-white">
          {app.name}
        </h3>
        <p className="line-clamp-1 text-[11px] text-gray-500 sm:line-clamp-2 sm:text-xs dark:text-gray-400">
          {app.description}
        </p>
      </div>
    </a>
  )
}
