// [Member 1 - Auth] Sign-in page.
import { Link } from 'react-router-dom'
import LoginForm from '../features/auth/components/LoginForm'
import { ROUTES } from '../routes/routeConstants'

export default function Login() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Sign in to manage your account.
      </p>
      <div className="mt-6">
        <LoginForm />
      </div>
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        No account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
