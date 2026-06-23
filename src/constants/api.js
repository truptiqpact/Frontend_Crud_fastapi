// [Member 1 - Core] API connection constants.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const API_TIMEOUT = 15000

// localStorage keys (namespaced to avoid collisions)
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'fcp_access_token',
  REFRESH_TOKEN: 'fcp_refresh_token',
  USER: 'fcp_user',
}
