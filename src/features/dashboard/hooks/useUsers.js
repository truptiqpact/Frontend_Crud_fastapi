// [Member 2 - Dashboard] Loads + mutates the user list.
// Search/pagination are handled in the UI (UserTable); this hook owns the data.
import { useCallback, useEffect, useState } from 'react'
import { userService } from '../services/userService'
import { getErrorMessage } from '../../../services/api/axios'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { users: list } = await userService.getUsers()
      setUsers(list)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load users.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial load on mount; later loads are user-triggered via refetch().
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers()
  }, [fetchUsers])

  const createUser = useCallback(
    async (payload) => {
      await userService.createUser(payload)
      await fetchUsers()
    },
    [fetchUsers],
  )

  const updateUser = useCallback(
    async (id, payload) => {
      await userService.updateUser(id, payload)
      await fetchUsers()
    },
    [fetchUsers],
  )

  const deleteUser = useCallback(
    async (id) => {
      await userService.deleteUser(id)
      await fetchUsers()
    },
    [fetchUsers],
  )

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  }
}