// [Member 2 - Dashboard] Animated summary tiles: count-up numbers + fade-in.
import { useEffect, useState } from 'react'
import Card from '../../../components/ui/Card'
import { ROLES } from '../../../constants/app'

// Count from 0 -> target with an easeOutCubic curve (runs in rAF, off the render path).
function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf
    const startTime = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

function StatTile({ label, value, index }) {
  const animated = useCountUp(value)
  return (
    <Card
      hover
      className="p-5 [animation:fcpFadeUp_.5s_ease-out_both]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums text-slate-900 dark:text-white">
        {animated}
      </p>
    </Card>
  )
}

export default function StatsCards({ users }) {
  const total = users.length
  const admins = users.filter((u) => u.role === ROLES.ADMIN).length
  const standard = total - admins

  const tiles = [
    { label: 'Total users', value: total },
    { label: 'Admins', value: admins },
    { label: 'Standard users', value: standard },
  ]

  return (
    <>
      {/* keyframes for the card entrance (respects reduced-motion via globals.css) */}
      <style>{`@keyframes fcpFadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tiles.map((t, i) => (
          <StatTile key={t.label} label={t.label} value={t.value} index={i} />
        ))}
      </div>
    </>
  )
}