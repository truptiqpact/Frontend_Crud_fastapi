// [Member 2 - Dashboard] Table of users with row actions (admin only).
import Button from '../../../components/ui/Button'
import { MESSAGES } from '../../../constants/messages'

function RoleBadge({ role }) {
  const isAdmin = role === 'admin'
  return (
    <span
      className={
        isAdmin
          ? 'rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
          : 'rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300'
      }
    >
      {role}
    </span>
  )
}

export default function UserTable({ users, canManage, onEdit, onDelete }) {
  if (!users.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        {MESSAGES.EMPTY_USERS}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            {canManage && <th className="px-4 py-3 text-right font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <td className="px-4 py-3 text-slate-400">#{u.id}</td>
              <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                {u.name}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {u.email}
              </td>
              <td className="px-4 py-3">
                <RoleBadge role={u.role} />
              </td>
              {canManage && (
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary" onClick={() => onEdit(u)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(u)}>
                      Delete
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
