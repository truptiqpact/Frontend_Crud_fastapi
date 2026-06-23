// [Member 2 - Dashboard] User management screen.
//  - admin: stats + searchable/paginated table + create/edit/delete
//  - standard user: polished, aligned "account" card with entrance animation
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader' // (Member 3)
import Button from '../components/ui/Button' // (Member 3)
import Card from '../components/ui/Card'
import Loader from '../components/ui/Loader'
import { useAuth } from '../hooks/useAuth' // (Member 1)
import { ROUTES } from '../routes/routeConstants' // (Member 1)
import { getInitials } from '../utils/helpers' // (Member 1)
import { useUsers } from '../features/dashboard/hooks/useUsers'
import UserTable from '../features/dashboard/components/UserTable'
import StatsCards from '../features/dashboard/components/StatsCards'
import UserFormModal from '../features/dashboard/components/UserFormModal'
import DeleteUserDialog from '../features/dashboard/components/DeleteUserDialog'

// One aligned label/value row. Fixed label column keeps every value lined up.
function DetailRow({ label, value, index = 0 }) {
  return (
    <div
      className="grid grid-cols-[8.5rem_1fr] items-center gap-4 px-6 py-3.5 [animation:fcpFadeUp_.45s_ease-out_both]"
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      <dt className="text-sm text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="text-sm font-medium text-slate-800 dark:text-slate-100">
        {value}
      </dd>
    </div>
  )
}

export default function Dashboard() {
  const { isAdmin, user: me } = useAuth()
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers()

  const [formState, setFormState] = useState({
    open: false,
    mode: 'create',
    user: null,
  })
  const [deleteState, setDeleteState] = useState({ open: false, user: null })

  const openCreate = () =>
    setFormState({ open: true, mode: 'create', user: null })
  const openEdit = (u) => setFormState({ open: true, mode: 'edit', user: u })
  const closeForm = () => setFormState((s) => ({ ...s, open: false }))

  const openDelete = (u) => setDeleteState({ open: true, user: u })
  const closeDelete = () => setDeleteState((s) => ({ ...s, open: false }))

  if (loading) {
    return (
      <div className="grid place-items-center py-20">
        <Loader size="lg" label="Loading…" />
      </div>
    )
  }

  // --- Standard user: polished account card ---
  if (!isAdmin) {
    const self = users[0] || me
    const role = (self?.role || 'user').toString()
    return (
      <div>
        {/* entrance keyframes (reduced-motion is respected via globals.css) */}
        <style>{`@keyframes fcpFadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>

        <PageHeader title="Dashboard" subtitle="Your account at a glance." />

        {error ? (
          <Card className="max-w-lg p-5 text-sm text-red-600">{error}</Card>
        ) : (
          <Card className="max-w-lg overflow-hidden [animation:fcpFadeUp_.5s_ease-out_both]">
            {/* header: avatar + identity + role badge */}
            <div className="flex items-center gap-4 border-b border-slate-200 p-6 dark:border-slate-700">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-violet-100 text-lg font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                {getInitials(self?.name || self?.email || 'U')}
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-slate-900 dark:text-white">
                  {self?.name || '—'}
                </p>
                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                  {self?.email || '—'}
                </p>
              </div>
              <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {role}
              </span>
            </div>

            {/* aligned details */}
            <dl className="divide-y divide-slate-100 dark:divide-slate-800">
              <DetailRow label="Full name" value={self?.name || '—'} index={0} />
              <DetailRow
                label="Email address"
                value={self?.email || '—'}
                index={1}
              />
              <DetailRow
                label="Role"
                value={<span className="capitalize">{role}</span>}
                index={2}
              />
             
            </dl>

            {/* footer */}
            <div className="px-6 py-4">
              <Link to={ROUTES.PROFILE} className="inline-block">
                <Button variant="secondary" size="sm">
                  Edit profile
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    )
  }

  // --- Admin: full management ---
  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Manage everyone who can access the system."
        actions={<Button onClick={openCreate}>Add member</Button>}
      />

      {error && <Card className="mb-6 p-4 text-sm text-red-600">{error}</Card>}

      <StatsCards users={users} />

      <UserTable
        users={users}
        canManage
        onEdit={openEdit}
        onDelete={openDelete}
      />

      <UserFormModal
        open={formState.open}
        mode={formState.mode}
        user={formState.user}
        onClose={closeForm}
        onCreate={createUser}
        onUpdate={updateUser}
      />

      <DeleteUserDialog
        open={deleteState.open}
        user={deleteState.user}
        onClose={closeDelete}
        onConfirm={deleteUser}
      />
    </div>
  )
}