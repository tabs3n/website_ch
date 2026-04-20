export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero skeleton */}
      <div className="relative h-[55vh] w-full animate-pulse bg-ink-800" />

      <div className="container mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6">
          <div className="h-3 w-24 rounded bg-ink-700 animate-pulse" />
          <div className="h-10 w-3/4 rounded bg-ink-700 animate-pulse" />
          <div className="space-y-3 pt-4">
            <div className="h-4 rounded bg-ink-800 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-ink-800 animate-pulse" />
            <div className="h-4 w-4/6 rounded bg-ink-800 animate-pulse" />
          </div>
        </div>
        <aside className="md:col-span-5 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded-lg bg-ink-800 animate-pulse" />
          ))}
        </aside>
      </div>
    </div>
  );
}
