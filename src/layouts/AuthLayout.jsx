// [Member 1 - Auth & Home UI] Split-screen shell for login/register:
// an animated brand panel (image-backed) beside the form card.
import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import { ThemeContext } from '../context/ThemeContext'
import { APP_NAME } from '../constants/app'
import { ROUTES } from '../routes/routeConstants'
import logo from '../assets/images/logo.svg'

const FEATURES = [
  'JWT authentication with silent refresh',
  'Role-based access for admins and users',
  'Full user management dashboard',
]

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3" strokeLinecap="round" strokeLinejoin="round">
        <path d="m20 6-11 11-5-5" />
      </svg>
    </span>
  )
}

function ThemeToggle() {
  const ctx = useContext(ThemeContext)
  if (!ctx) return null
  const { theme, toggleTheme } = ctx
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur transition-colors hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  )
}

export default function AuthLayout() {
  return (
    <div className="relative grid min-h-screen bg-slate-50 dark:bg-slate-950 lg:grid-cols-2">
      {/* Brand panel (large screens) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden p-12 text-white lg:flex">
        <div className="absolute inset-0 auth-mesh" />
        <div className="absolute inset-0 auth-aurora opacity-70" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute inset-0 auth-noise" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent" />

        <Link to={ROUTES.HOME} className="relative z-10 flex items-center gap-3 anim-fade-up">
          <img src={logo} alt="" className="h-9 w-9 drop-shadow" />
          <span className="text-lg font-semibold tracking-tight">{APP_NAME}</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="anim-fade-up anim-delay-1 text-4xl font-bold leading-tight tracking-tight">
            User management,
            <br />
            done right.
          </h2>
          <p className="anim-fade-up anim-delay-2 mt-4 text-violet-100/90">
            A secure console for your team. Admins manage everyone; each user
            manages themselves — all backed by a FastAPI service.
          </p>
          <ul className="anim-fade-up anim-delay-3 mt-8 flex flex-col gap-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-violet-50/90">
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/60 anim-fade-in anim-delay-4">
          Built with React + FastAPI
        </p>
      </aside>

      {/* Form panel */}
      <main className="relative flex items-center justify-center px-4 py-12 sm:px-8">
        <ThemeToggle />
        <div className="w-full max-w-md anim-scale-in">
          {/* Compact brand for small screens (panel hidden) */}
          <Link to={ROUTES.HOME} className="mb-7 flex items-center justify-center gap-2 lg:hidden">
            <img src={logo} alt="" className="h-8 w-8" />
            <span className="text-base font-semibold text-slate-900 dark:text-white">{APP_NAME}</span>
          </Link>

          <Card className="auth-card w-full p-7 shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5 dark:ring-white/5 sm:p-8">
            <Outlet />
          </Card>

          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} {APP_NAME}
          </p>
        </div>
      </main>
    </div>
  )
}