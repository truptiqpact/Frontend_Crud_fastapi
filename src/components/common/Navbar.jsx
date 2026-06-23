// [Member 2 - Dashboard] Top bar: brand, theme toggle, auth actions.
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AppContext } from '../../context/AppContext'
import { ThemeContext } from '../../context/ThemeContext'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../routes/routeConstants'
import { getInitials } from '../../utils/helpers'
import Button from '../ui/Button'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { toggleSidebar } = useContext(AppContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="flex h-14 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={toggleSidebar}
              aria-label="Toggle menu"
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
            >
              ☰
            </button>
          )}
          <Link
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.HOME}
            className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-violet-600 text-sm text-white">
              F
            </span>
            {APP_NAME}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-right sm:block">
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  {user?.name || user?.email || 'User'}
                </span>
                <span className="block text-xs capitalize text-slate-400">
                  {user?.role}
                </span>
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-100 text-sm font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                {getInitials(user?.name || user?.email || 'U')}
              </span>
              <Button variant="secondary" size="sm" onClick={onLogout}>
                Sign out
              </Button>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
