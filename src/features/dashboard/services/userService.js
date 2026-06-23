// [Member 2 - Dashboard] User CRUD against the FastAPI backend.
import api from '../../../services/api/axios'
import { ENDPOINTS } from '../../../services/api/endpoints'

export const userService = {
  // GET /users/  (Bearer) -> { message, data }  (data: array for admin, object for user)
  async getUsers() {
    const { data } = await api.get(ENDPOINTS.USERS.LIST)
    const payload = data?.data
    const list = Array.isArray(payload) ? payload : payload ? [payload] : []
    return { message: data?.message, users: list }
  },

  // GET /users/{id}
  async getUserById(id) {
    const { data } = await api.get(ENDPOINTS.USERS.BY_ID(id))
    return data
  },

  // POST /users  -> created user
  async createUser(payload) {
    const { data } = await api.post(ENDPOINTS.USERS.CREATE, payload)
    return data
  },

  // PUT /users/{id}  (partial: name/email/password)
  async updateUser(id, payload) {
    const { data } = await api.put(ENDPOINTS.USERS.BY_ID(id), payload)
    return data
  },

  // DELETE /users/{id}  (admin)
  async deleteUser(id) {
    const { data } = await api.delete(ENDPOINTS.USERS.BY_ID(id))
    return data
  },
}
