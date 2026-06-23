// [Member 3 - UI Kit] Public landing page.
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../routes/routeConstants'
import { APP_NAME } from '../constants/app'

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="py-12 text-center">
      <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
        React + FastAPI
      </span>
      <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        {APP_NAME}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">
        A user management console with JWT authentication and role-based access.
        Admins manage everyone; users manage themselves.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
          <Button size="lg">{isAuthenticated ? 'Go to dashboard' : 'Sign in'}</Button>
        </Link>
        {!isAuthenticated && (
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" variant="secondary">
              Create account
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
