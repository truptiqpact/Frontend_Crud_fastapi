// [Member 1 - Core] Auth state: current user, login/register/logout, hydration.
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import api, { getErrorMessage } from '../services/api/axios'
import { ENDPOINTS } from '../services/api/endpoints'
import { storage } from '../services/storage/localStorage'
import { authService } from '../features/auth/services/authService'
import { decodeJwt, isTokenExpired } from '../utils/helpers'
import { isAdmin as isAdminRole } from '../utils/permissions'

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

// Build a minimal user object from the access token, then enrich with profile.
async function buildUserFromToken(accessToken) {
  const payload = decodeJwt(accessToken)
  if (!payload?.sub) return null
  const base = { id: Number(payload.sub), role: (payload.role || 'user').toLowerCase() }
  try {
    const { data } = await api.get(ENDPOINTS.USERS.BY_ID(base.id))
    return {
      id: data.id ?? base.id,
      name: data.name ?? '',
      email: data.email ?? '',
      role: (data.role ?? base.role).toLowerCase(),
    }
  } catch {
    return base
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.getUser())
  const [loading, setLoading] = useState(true)

  // On first load, validate any stored session.
  useEffect(() => {
    const token = storage.getAccessToken()
    if (!token || isTokenExpired(token)) {
      // expired access tokens are fine if a refresh token exists; the axios
      // interceptor will refresh on the first real call. Only hard-clear when
      // there is no refresh token at all.
      if (!storage.getRefreshToken()) storage.clear()
    }
    // One-shot readiness flag on mount (not a render cascade).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false)
  }, [])

  const login = useCallback(async ({ email, password }) => {
    const data = await authService.login({ email, password })
    storage.setSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    })
    const fullUser = await buildUserFromToken(data.access_token)
    if (fullUser) {
      storage.setUser(fullUser)
      setUser(fullUser)
    }
    return fullUser
  }, [])

  const register = useCallback(async (payload) => {
    return authService.register(payload)
  }, [])

  const logout = useCallback(() => {
    storage.clear()
    setUser(null)
  }, [])

  // Keep cached user in sync if another tab logs out.
  const refreshUser = useCallback(() => {
    setUser(storage.getUser())
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: isAdminRole(user?.role),
      loading,
      login,
      register,
      logout,
      refreshUser,
      getErrorMessage,
    }),
    [user, loading, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
