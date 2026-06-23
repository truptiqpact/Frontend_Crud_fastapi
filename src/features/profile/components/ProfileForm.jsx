// [Member 3 - Profile] Edit your own name / email / password.
import { useEffect, useState } from 'react'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { getErrorMessage } from '../../../services/api/axios'
import { MESSAGES } from '../../../constants/messages'
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../../utils/validators'

export default function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Populate the form when the loaded profile arrives/changes.
    if (profile)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ name: profile.name || '', email: profile.email || '', password: '' })
  }, [profile])

  const onChange = (e) => {
    setSaved(false)
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = {
      name: validateName(form.name),
      email: validateEmail(form.email),
    }
    if (form.password) errs.password = validatePassword(form.password)
    const cleaned = Object.fromEntries(Object.entries(errs).filter(([, v]) => v))
    setErrors(cleaned)
    if (Object.keys(cleaned).length) return

    setSubmitting(true)
    setServerError(null)
    try {
      const payload = { name: form.name, email: form.email }
      if (form.password) payload.password = form.password
      await onSave(payload)
      setSaved(true)
      setForm((f) => ({ ...f, password: '' }))
    } catch (err) {
      setServerError(getErrorMessage(err, 'Could not save changes.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">
        Edit details
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {serverError && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {serverError}
          </div>
        )}
        {saved && (
          <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">
            {MESSAGES.USER_UPDATED}
          </div>
        )}
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          error={errors.email}
        />
        <Input
          label="New password (optional)"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          hint="Leave blank to keep your current password."
        />
        <div>
          <Button type="submit" loading={submitting}>
            Save changes
          </Button>
        </div>
      </form>
    </Card>
  )
}
