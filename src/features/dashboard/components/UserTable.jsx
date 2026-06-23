// [Member 2 - Dashboard] User table with search + pagination + row actions.
// Takes the full `users` array; filtering & paging happen client-side here.
import { useMemo, useState } from 'react'
import Button from '../../../components/ui/Button' // (Member 3 owns Button)
import { MESSAGES } from '../../../constants/messages'

const PAGE_SIZE = 8

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
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  // --- search (name / email / id) ---
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        String(u.id).includes(q),
    )
  }, [users, query])

  // --- pagination (page clamps automatically as results shrink) ---
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(start, start + PAGE_SIZE)

  const onSearch = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  const colSpan = canManage ? 5 : 4

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative max-w-xs">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <circle cx="8.5" cy="8.5" r="5.5" />
          <line x1="13" y1="13" x2="17.5" y2="17.5" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={onSearch}
          placeholder="Search name, email, or ID…"
          aria-label="Search users"
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              {canManage && (
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  {users.length === 0
                    ? MESSAGES.EMPTY_USERS
                    : `No users match “${query}”.`}
                </td>
              </tr>
            ) : (
              pageRows.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
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
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onEdit(u)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => onDelete(u)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {filtered.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>
            Showing {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of{' '}
            {filtered.length}
          </span>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span className="px-1">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}