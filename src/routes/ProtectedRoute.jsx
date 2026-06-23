// [Member 1 - Core] Gate for authenticated areas.
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from './routeConstants'
import Loader from '../components/ui/Loader'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader label="Loading…" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return <Outlet />
}
