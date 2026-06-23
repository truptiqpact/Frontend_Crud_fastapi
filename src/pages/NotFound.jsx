// [Member 3 - UI Kit] 404 page.
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { ROUTES } from '../routes/routeConstants'

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <div>
        <p className="text-6xl font-bold text-violet-600">404</p>
        <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          The page you’re looking for doesn’t exist.
        </p>
        <Link to={ROUTES.HOME} className="mt-6 inline-block">
          <Button>Back home</Button>
        </Link>
      </div>
    </div>
  )
}
