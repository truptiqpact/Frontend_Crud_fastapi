// [Member 2 - Dashboard] User management screen.
//  - admin: stats + full table + create/edit/delete
//  - standard user: read-only view of their own record
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Loader from '../components/ui/Loader'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../routes/routeConstants'
import { useUsers } from '../features/dashboard/hooks/useUsers'
import UserTable from '../features/dashboard/components/UserTable'
import StatsCards from '../features/dashboard/components/StatsCards'
import UserFormModal from '../features/dashboard/components/UserFormModal'
import DeleteUserDialog from '../features/dashboard/components/DeleteUserDialog'

export default function Dashboard() {
  const { isAdmin, user: me } = useAuth()
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers()

  const [formState, setFormState] = useState({ open: false, mode: 'create', user: null })
  const [deleteState, setDeleteState] = useState({ open: false, user: null })

  const openCreate = () => setFormState({ open: true, mode: 'create', user: null })
  const openEdit = (u) => setFormState({ open: true, mode: 'edit', user: u })
  const closeForm = () => setFormState((s) => ({ ...s, open: false }))

  const openDelete = (u) => setDeleteState({ open: true, user: u })
  const closeDelete = () => setDeleteState((s) => ({ ...s, open: false }))

  if (loading) {
    return (
      <div className="grid place-items-center py-20">
        <Loader label="Loading users…" />
      </div>
    )
  }

  // --- Standard user: just their own record ---
  if (!isAdmin) {
    const self = users[0] || me
    return (
      <div>
        <PageHeader title="Dashboard" subtitle="Your account at a glance." />
        {error ? (
          <Card className="p-5 text-sm text-red-600">{error}</Card>
        ) : (
          <Card className="max-w-md p-6">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Name</dt>
                <dd className="font-medium text-slate-900 dark:text-white">
                  {self?.name || '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium text-slate-900 dark:text-white">
                  {self?.email || '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Role</dt>
                <dd className="font-medium capitalize text-slate-900 dark:text-white">
                  {self?.role}
                </dd>
              </div>
            </dl>
            <Link to={ROUTES.PROFILE} className="mt-5 inline-block">
              <Button variant="secondary" size="sm">
                Edit profile
              </Button>
            </Link>
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
        actions={<Button onClick={openCreate}>Add user</Button>}
      />

      {error && (
        <Card className="mb-6 p-4 text-sm text-red-600">{error}</Card>
      )}

      <StatsCards users={users} />

      <UserTable users={users} canManage onEdit={openEdit} onDelete={openDelete} />

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
