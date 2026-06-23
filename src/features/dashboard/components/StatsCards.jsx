// [Member 2 - Dashboard] Summary tiles above the user table.
import Card from '../../../components/ui/Card'
import { ROLES } from '../../../constants/app'

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
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {tiles.map((t) => (
        <Card key={t.label} className="p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.label}</p>
          <p className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
            {t.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
