// [Member 1 - Core] Gate for role-restricted areas (e.g. admin-only).
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from './routeConstants'

export default function RoleRoute({ allow = [] }) {
  const { user } = useAuth()
  const allowed = allow.includes(user?.role)
  return allowed ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} replace />
}
