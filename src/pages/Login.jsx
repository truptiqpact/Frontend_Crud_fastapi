// [Member 1 - Auth & Home UI] Sign-in page.
import { Link } from 'react-router-dom'
import LoginForm from '../features/auth/components/LoginForm'
import { ROUTES } from '../routes/routeConstants'

export default function Login() {
  return (
    <div className="w-full">
      <div className="anim-fade-up">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Sign in to manage your account.
        </p>
      </div>

      <div className="mt-7">
        <LoginForm />
      </div>

      <p className="anim-fade-in anim-delay-5 mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
        No account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-violet-600 transition-colors hover:text-violet-700 hover:underline dark:text-violet-400"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
