// [Member 3 - Profile] Reads/updates the signed-in user's own record.
import api from '../../../services/api/axios'
import { ENDPOINTS } from '../../../services/api/endpoints'

export const profileService = {
  // GET /users/{id}
  async getMe(id) {
    const { data } = await api.get(ENDPOINTS.USERS.BY_ID(id))
    return data
  },

  // PUT /users/{id}  (partial: name/email/password)
  async updateMe(id, payload) {
    const { data } = await api.put(ENDPOINTS.USERS.BY_ID(id), payload)
    return data
  },
}
