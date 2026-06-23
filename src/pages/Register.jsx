// [Member 1 - Auth & Home UI] Account creation page.
import { Link } from 'react-router-dom'
import RegisterForm from '../features/auth/components/RegisterForm'
import { ROUTES } from '../routes/routeConstants'

export default function Register() {
  return (
    <div className="w-full">
      <div className="anim-fade-up">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          It takes less than a minute.
        </p>
      </div>

      <div className="mt-7">
        <RegisterForm />
      </div>

      <p className="anim-fade-in anim-delay-5 mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-violet-600 transition-colors hover:text-violet-700 hover:underline dark:text-violet-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
