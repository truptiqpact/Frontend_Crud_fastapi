// [Member 1 - Core] Thin wrapper around localStorage for tokens + cached user.
import { STORAGE_KEYS } from '../../constants/api'

const read = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export const storage = {
  getAccessToken: () => read(STORAGE_KEYS.ACCESS_TOKEN),
  setAccessToken: (token) => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),

  getRefreshToken: () => read(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token) => localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token),

  getUser: () => {
    const raw = read(STORAGE_KEYS.USER)
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch {
      return null
    }
  },
  setUser: (user) =>
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),

  setSession: ({ accessToken, refreshToken }) => {
    if (accessToken) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    if (refreshToken)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  },
}
