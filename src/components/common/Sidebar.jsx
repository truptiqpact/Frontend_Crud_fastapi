// [Member 2 - Dashboard] Side navigation for the protected area.
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { ROUTES } from '../../routes/routeConstants'
import { cn } from '../../utils/helpers'

const LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard' },
  { to: ROUTES.PROFILE, label: 'My profile' },
]

export default function Sidebar() {
  const { sidebarOpen, closeSidebar } = useContext(AppContext)

  const linkClass = ({ isActive }) =>
    cn(
      'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-violet-600 text-white'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    )

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={cn(
          'fixed z-40 h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r border-slate-200 bg-white p-3 transition-transform dark:border-slate-700 dark:bg-slate-900 md:sticky md:top-14 md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <nav className="flex flex-col gap-1" onClick={closeSidebar}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}