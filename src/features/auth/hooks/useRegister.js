// [Member 1 - Auth] Registration submission state machine.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { getErrorMessage } from '../../../services/api/axios'
import { ROUTES } from '../../../routes/routeConstants'
import { MESSAGES } from '../../../constants/messages'

export function useRegister() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const submit = async (payload) => {
    setSubmitting(true)
    setError(null)
    setSuccess(null)
    try {
      await register(payload)
      setSuccess(MESSAGES.REGISTER_SUCCESS)
      setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 800)
    } catch (err) {
      setError(getErrorMessage(err, MESSAGES.GENERIC_ERROR))
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, error, success }
}
