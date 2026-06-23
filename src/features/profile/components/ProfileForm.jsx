// [Member 3 - Profile] Edit your own name / email / password — with toast feedback.
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Card from '../../../components/ui/Card'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { getErrorMessage } from '../../../services/api/axios'
import { MESSAGES } from '../../../constants/messages'
import { validateName, validateEmail, validatePassword } from '../../../utils/validators'

export default function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (profile)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ name: profile.name || '', email: profile.email || '', password: '' })
  }, [profile])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = { name: validateName(form.name), email: validateEmail(form.email) }
    if (form.password) errs.password = validatePassword(form.password)
    const cleaned = Object.fromEntries(Object.entries(errs).filter(([, v]) => v))
    setErrors(cleaned)
    if (Object.keys(cleaned).length) {
      toast.error('Please fix the highlighted fields.')
      return
    }

    setSubmitting(true)
    const payload = { name: form.name, email: form.email }
    if (form.password) payload.password = form.password

    const request = Promise.resolve(onSave(payload))
    toast.promise(request, {
      loading: 'Saving changes…',
      success: MESSAGES.USER_UPDATED || 'Profile updated.',
      error: (err) => getErrorMessage(err, 'Could not save changes.'),
    })

    try {
      await request
      setForm((f) => ({ ...f, password: '' }))
    } catch {
      // toast.promise already surfaced the error message
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08, ease: 'easeOut' }}>
      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Edit details</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <Input label="Name" name="name" value={form.name} onChange={onChange} error={errors.name} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} />
          <Input label="New password (optional)" name="password" type="password" value={form.password} onChange={onChange} error={errors.password} hint="Leave blank to keep your current password." />
          <div>
            <Button type="submit" loading={submitting}>Save changes</Button>
          </div>
        </form>
      </Card>
    </motion.div>
  )
}
