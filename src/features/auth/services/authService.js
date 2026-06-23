// [Member 1 - Auth] Calls the FastAPI /auth + registration endpoints.
import api from '../../../services/api/axios'
import { ENDPOINTS } from '../../../services/api/endpoints'

export const authService = {
  // POST /auth/login -> { access_token, refresh_token, token_type }
  async login({ email, password }) {
    const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password })
    return data
  },

  // POST /users  (registration) -> created user
  async register({ name, email, password, role = 'user' }) {
    const { data } = await api.post(ENDPOINTS.USERS.CREATE, {
      name,
      email,
      password,
      role,
    })
    return data
  },

  // POST /auth/refresh -> { access_token, token_type }
  async refresh(refreshToken) {
    const { data } = await api.post(ENDPOINTS.AUTH.REFRESH, {
      refresh_token: refreshToken,
    })
    return data
  },
}
