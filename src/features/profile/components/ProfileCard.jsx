// [Member 3 - Profile] Animated identity card with gradient banner + role badge.
// Keeps the contract: <ProfileCard profile={profile} />
import { motion } from 'framer-motion'
import Card from '../../../components/ui/Card'
import { getInitials } from '../../../utils/helpers'
import { ROLES } from '../../../constants/app'

const BADGE = {
  [ROLES.ADMIN]: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  [ROLES.USER]: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
}
const Mail = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
)
const Shield = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
)

export default function ProfileCard({ profile }) {
  const role = (profile?.role || 'user').toLowerCase()
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
      <Card className="overflow-hidden p-0">
        <div className="relative h-24 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700" />
        <div className="px-6 pb-6">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }} className="-mt-12 mb-4">
            <span className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 to-indigo-500 text-2xl font-semibold text-white shadow-lg dark:border-slate-800">
              {getInitials(profile?.name || profile?.email || 'U')}
            </span>
          </motion.div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{profile?.name || '—'}</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-slate-400"><Mail /></span>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Email</dt>
                <dd className="text-sm text-slate-700 dark:text-slate-200">{profile?.email || '—'}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-slate-400"><Shield /></span>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">Role</dt>
                <dd className="mt-0.5"><span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${BADGE[role] || BADGE[ROLES.USER]}`}>{profile?.role || 'user'}</span></dd>
              </div>
            </div>
          </dl>
        </div>
      </Card>
    </motion.div>
  )
}
