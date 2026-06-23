// [Member 3 - Profile] Read-only identity card.
import Card from '../../../components/ui/Card'
import { getInitials } from '../../../utils/helpers'

export default function ProfileCard({ profile }) {
  return (
    <Card className="flex items-center gap-4 p-6">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-violet-100 text-xl font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
        {getInitials(profile?.name || profile?.email || 'U')}
      </span>
      <div>
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          {profile?.name || '—'}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {profile?.email}
        </p>
        <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {profile?.role}
        </span>
      </div>
    </Card>
  )
}
