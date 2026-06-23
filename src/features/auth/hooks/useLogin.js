// [Member 1 - Auth] Login submission state machine.
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { getErrorMessage } from '../../../services/api/axios'
import { ROUTES } from '../../../routes/routeConstants'
import { MESSAGES } from '../../../constants/messages'

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const submit = async ({ email, password }) => {
    setSubmitting(true)
    setError(null)
    try {
      await login({ email, password })
      const dest = location.state?.from?.pathname || ROUTES.DASHBOARD
      navigate(dest, { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, MESSAGES.LOGIN_FAILED))
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, error }
}
