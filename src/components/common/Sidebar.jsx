// [Member 3] Animated sidebar: motion collapse, sliding active pill (layoutId),
// and an AnimatePresence mobile drawer.
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../../context/AppContext'
import { ROUTES } from '../../routes/routeConstants'
import { cn } from '../../utils/helpers'

const Grid = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
)
const User = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)
const Chevrons = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m11 17-5-5 5-5M18 17l-5-5 5-5" /></svg>
)

const LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: Grid },
  { to: ROUTES.PROFILE, label: 'My profile', icon: User },
]

function NavItem({ to, label, icon: Icon, collapsed, onNavigate }) {
  return (
    <NavLink to={to} onClick={onNavigate} title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn('group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          collapsed && 'md:justify-center',
          isActive ? 'text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800')
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="sidebar-active-pill"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30"
            />
          )}
          <Icon className="h-5 w-5 shrink-0" />
          <span className={cn('whitespace-nowrap', collapsed && 'md:hidden')}>{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar({ collapsed = false, onToggleCollapse }) {
  const { sidebarOpen, closeSidebar } = useContext(AppContext)

  return (
    <>
      {/* Mobile drawer + overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden" onClick={closeSidebar}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 md:hidden"
            >
              <nav className="flex flex-col gap-1.5" onClick={closeSidebar}>
                {LINKS.map((l) => <NavItem key={l.to} {...l} collapsed={false} />)}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop rail (animated width) */}
      <motion.aside
        animate={{ width: collapsed ? '4.75rem' : '15rem' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="sticky top-14 z-20 hidden h-[calc(100vh-3.5rem)] shrink-0 border-r border-slate-200 bg-white/60 p-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/40 md:block"
      >
        <nav className="flex flex-col gap-1.5">
          {LINKS.map((l) => <NavItem key={l.to} {...l} collapsed={collapsed} />)}
        </nav>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <Chevrons className="h-4 w-4" />
            </motion.span>
            <span className={cn(collapsed && 'hidden')}>Collapse</span>
          </button>
        )}
      </motion.aside>
    </>
  )
}
