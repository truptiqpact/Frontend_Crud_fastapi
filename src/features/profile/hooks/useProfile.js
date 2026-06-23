// [Member 3 - Profile] Loads the current user's record and saves edits.
import { useCallback, useEffect, useState } from 'react'
import { profileService } from '../services/profileService'
import { useAuth } from '../../../hooks/useAuth'
import { storage } from '../../../services/storage/localStorage'
import { getErrorMessage } from '../../../services/api/axios'

export function useProfile() {
  const { user, refreshUser } = useAuth()
  const [profile, setProfile] = useState(user)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!user?.id) return
    setLoading(true)
    setError(null)
    try {
      const data = await profileService.getMe(user.id)
      const clean = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: (data.role || user.role || 'user').toLowerCase(),
      }
      setProfile(clean)
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load your profile.'))
      setProfile(user)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    // Initial load on mount; reload() is available for manual refresh.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  const save = useCallback(
    async (payload) => {
      await profileService.updateMe(user.id, payload)
      // reflect changes locally + in the cached session
      const next = { ...profile, ...payload }
      delete next.password
      setProfile(next)
      storage.setUser(next)
      refreshUser()
    },
    [user, profile, refreshUser],
  )

  return { profile, loading, error, save, reload: load }
}
