const events = [
  {
    id: 1,
    title: 'Q3 Town Hall Meeting',
    subtitle: 'All Hands',
    date: '28 Oct 2026',
    location: 'Lagos HQ, Virtual',
    status: 'upcoming' as const,
  },
  {
    id: 2,
    title: 'Data Protection Training',
    subtitle: 'Compliance',
    date: '5 Nov 2026',
    location: 'Online',
    status: 'upcoming' as const,
  },
  {
    id: 3,
    title: 'Holiday Packages Launch',
    subtitle: 'Marketing',
    date: '12 Nov 2026',
    location: 'Lagos HQ',
    status: 'upcoming' as const,
  },
  {
    id: 4,
    title: 'Aviation Academy Open Day',
    subtitle: 'Recruitment',
    date: '20 Nov 2026',
    location: 'Murtala Muhammed Airport',
    status: 'upcoming' as const,
  },
  {
    id: 5,
    title: 'End of Year Party',
    subtitle: 'Social',
    date: '18 Dec 2026',
    location: 'Lagos, TBA',
    status: 'upcoming' as const,
  },
]

const statusStyles = {
  upcoming: 'bg-accent text-white',
}

export function UpcomingEvents() {
  return (
    <section aria-label="Upcoming Events" className="mt-6">
      <h2 className="mb-3 text-base font-bold text-gray-900 sm:mb-4 sm:text-lg dark:text-white">Upcoming Events</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="shrink-0 border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_120px_auto] md:grid-cols-[1fr_120px_1fr_auto] text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <div className="px-4 py-3">Event</div>
            <div className="hidden px-4 py-3 sm:block">Date</div>
            <div className="hidden px-4 py-3 md:block">Location</div>
            <div className="px-4 py-3 text-right">Action</div>
          </div>
        </div>
        <div>
          {events.map((event) => (
            <div key={event.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_120px_auto] md:grid-cols-[1fr_120px_1fr_auto] items-center border-b border-gray-100 bg-white last:border-b-0 hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800 dark:hover:bg-gray-700/30">
              <div className="flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent sm:h-9 sm:w-9">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{event.title}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{event.subtitle}</p>
                </div>
              </div>
              <div className="hidden px-4 py-2.5 text-xs text-gray-600 dark:text-gray-400 sm:block">
                {event.date}
              </div>
              <div className="hidden px-4 py-3 text-sm text-gray-600 dark:text-gray-400 md:block">
                {event.location}
              </div>
              <div className="px-4 py-3 text-right">
                <button className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${statusStyles[event.status]} hover:opacity-90`}>
                  View event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
