// [Member 3] Top bar: brand, animated theme toggle, motion profile dropdown.
// Uses framer-motion for micro-interactions and sonner for the sign-out toast.
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useAuth } from '../../hooks/useAuth'
import { AppContext } from '../../context/AppContext'
import { ThemeContext } from '../../context/ThemeContext'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../routes/routeConstants'
import { getInitials } from '../../utils/helpers'
import Button from '../ui/Button'

const Sun = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const Moon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)
const Chevron = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6" /></svg>
)
const UserGlyph = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)
const LogOut = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
)
const Burger = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M3 12h18M3 6h18M3 18h18" /></svg>
)

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { toggleSidebar } = useContext(AppContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const dark = theme === 'dark'

  useEffect(() => {
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const onLogout = () => {
    setOpen(false)
    logout()
    toast.success('Signed out')
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/70"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button onClick={toggleSidebar} aria-label="Toggle menu" className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 md:hidden dark:hover:bg-slate-800">
              <Burger className="h-5 w-5" />
            </button>
          )}
          <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME} className="group flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
            <motion.span whileHover={{ rotate: -8, scale: 1.06 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }} className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm text-white shadow-lg shadow-violet-500/30">
              F
            </motion.span>
            <span className="hidden tracking-tight sm:block">{APP_NAME}</span>
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.85, rotate: 30 }}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.span key="sun" initial={{ y: -14, opacity: 0, rotate: -90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 14, opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <Sun className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ y: -14, opacity: 0, rotate: 90 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: 14, opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Moon className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {isAuthenticated ? (
            <div className="relative" ref={ref}>
              <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-sm font-semibold text-white shadow-sm">
                  {getInitials(user?.name || user?.email || 'U')}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-medium leading-tight text-slate-700 dark:text-slate-200">{user?.name || user?.email || 'User'}</span>
                  <span className="block text-xs capitalize leading-tight text-slate-400">{user?.role}</span>
                </span>
                <Chevron className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:block ${open ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-700">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{user?.name || 'User'}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email || '—'}</p>
                    </div>
                    <Link to={ROUTES.PROFILE} role="menuitem" onClick={() => setOpen(false)} className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                      <UserGlyph className="h-4 w-4" /> My profile
                    </Link>
                    <button onClick={onLogout} role="menuitem" className="mt-0.5 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10">
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN}><Button size="sm">Sign in</Button></Link>
          )}
        </div>
      </div>
    </motion.header>
  )
}
