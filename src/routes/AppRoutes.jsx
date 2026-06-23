// [Member 1 - Core] Route table wiring layouts + pages together.
import { Routes, Route } from 'react-router-dom'

import RootLayout from '../layouts/RootLayout'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import { ROUTES } from './routeConstants'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'
import ProfilePage from '../features/profile/components/ProfilePage'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<RootLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
