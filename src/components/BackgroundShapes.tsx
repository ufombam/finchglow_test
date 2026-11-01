export function BackgroundShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-right large circle */}
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-[0.04] dark:opacity-[0.06]"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* Bottom-left blob */}
      <div
        className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* Mid-right small circle */}
      <div
        className="absolute right-[10%] top-[45%] h-48 w-48 rounded-full opacity-[0.03] dark:opacity-[0.04]"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* Top-left rounded rectangle */}
      <div
        className="absolute -left-10 top-[15%] h-40 w-64 rotate-12 rounded-3xl opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* Bottom-right rounded rectangle */}
      <div
        className="absolute -right-8 bottom-[20%] h-36 w-56 -rotate-6 rounded-3xl opacity-[0.025] dark:opacity-[0.04]"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* Center-left small dot */}
      <div
        className="absolute left-[20%] top-[30%] h-20 w-20 rounded-full opacity-[0.04] dark:opacity-[0.05]"
        style={{ backgroundColor: 'var(--accent)' }}
      />
    </div>
  )
}

export function SignInBackgroundShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-right large circle */}
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gray-200/60" />

      {/* Bottom-left blob */}
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gray-200/50" />

      {/* Mid-left rounded rectangle */}
      <div className="absolute left-[5%] top-[40%] h-32 w-52 rotate-12 rounded-3xl bg-gray-200/30" />

      {/* Top-center small circle */}
      <div className="absolute left-[45%] top-[8%] h-24 w-24 rounded-full bg-gray-100/80" />

      {/* Bottom-right rounded rectangle */}
      <div className="absolute -right-6 bottom-[15%] h-40 w-60 -rotate-6 rounded-3xl bg-gray-200/40" />

      {/* Small accent dot */}
      <div className="absolute right-[25%] top-[25%] h-16 w-16 rounded-full bg-gray-300/30" />

      {/* Tiny scattered dots */}
      <div className="absolute left-[15%] top-[20%] h-3 w-3 rounded-full bg-gray-300/50" />
      <div className="absolute right-[30%] top-[60%] h-4 w-4 rounded-full bg-gray-300/40" />
      <div className="absolute left-[60%] bottom-[25%] h-3 w-3 rounded-full bg-gray-300/50" />
      <div className="absolute left-[35%] top-[75%] h-5 w-5 rounded-full bg-gray-300/30" />
    </div>
  )
}
