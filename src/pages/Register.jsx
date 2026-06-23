// [Member 1 - Auth] Account creation page.
import { Link } from 'react-router-dom'
import RegisterForm from '../features/auth/components/RegisterForm'
import { ROUTES } from '../routes/routeConstants'

export default function Register() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        It takes less than a minute.
      </p>
      <div className="mt-6">
        <RegisterForm />
      </div>
      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-violet-600 hover:underline dark:text-violet-400"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
