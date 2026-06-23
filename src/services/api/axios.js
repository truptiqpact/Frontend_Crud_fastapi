// [Member 1 - Core] Configured axios instance.
//  - attaches the Bearer access token on every request
//  - on a 401, tries ONE refresh via /auth/refresh, then replays the request
//  - if refresh fails, clears the session and sends the user to /login
import axios from 'axios'
import { API_BASE_URL, API_TIMEOUT } from '../../constants/api'
import { ENDPOINTS } from './endpoints'
import { storage } from '../storage/localStorage'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
})

// --- Request: attach access token ---
api.interceptors.request.use((config) => {
  const token = storage.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// --- Response: transparent refresh on 401 ---
let isRefreshing = false
let queue = []

const flushQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  queue = []
}

const forceLogout = () => {
  storage.clear()
  if (window.location.pathname !== '/login') {
    window.location.assign('/login')
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    // Not an auth problem, or we've already retried -> bubble up
    if (status !== 401 || original?._retry) {
      return Promise.reject(error)
    }

    const refreshToken = storage.getRefreshToken()
    if (!refreshToken) {
      forceLogout()
      return Promise.reject(error)
    }

    // A refresh is already in flight: queue this request until it resolves
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      // Bare axios (no interceptors) to avoid an infinite loop
      const { data } = await axios.post(
        `${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
        { refresh_token: refreshToken },
        { timeout: API_TIMEOUT },
      )
      const newToken = data.access_token
      storage.setAccessToken(newToken)
      flushQueue(null, newToken)
      original.headers.Authorization = `Bearer ${newToken}`
      return api(original)
    } catch (refreshError) {
      flushQueue(refreshError, null)
      forceLogout()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

// Normalize FastAPI error detail into a readable string.
export function getErrorMessage(error, fallback = 'Something went wrong.') {
  const detail = error?.response?.data?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
  return error?.message || fallback
}

export default api
