// [Member 2 - Dashboard] Create / edit user modal.
import { useEffect, useState } from 'react'
import Modal from '../../../components/ui/Modal'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { ROLES } from '../../../constants/app'
import { getErrorMessage } from '../../../services/api/axios'
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../../utils/validators'

const EMPTY = { name: '', email: '', password: '', role: ROLES.USER }

export default function UserFormModal({ open, mode, user, onClose, onCreate, onUpdate }) {
  const isEdit = mode === 'edit'
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    if (!open) return
    // Reset the form to match the row being edited each time the modal opens.
    /* eslint-disable react-hooks/set-state-in-effect */
    setForm(
      isEdit && user
        ? { name: user.name, email: user.email, password: '', role: user.role }
        : EMPTY,
    )
    setErrors({})
    setServerError(null)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, isEdit, user])

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const e = {
      name: validateName(form.name),
      email: validateEmail(form.email),
    }
    // Password required on create; optional on edit (only if provided)
    if (!isEdit || form.password) e.password = validatePassword(form.password)
    return Object.fromEntries(Object.entries(e).filter(([, v]) => v))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSubmitting(true)
    setServerError(null)
    try {
      if (isEdit) {
        // Backend update accepts name/email/password (partial)
        const payload = { name: form.name, email: form.email }
        if (form.password) payload.password = form.password
        await onUpdate(user.id, payload)
      } else {
        await onCreate(form)
      }
      onClose()
    } catch (err) {
      setServerError(getErrorMessage(err, 'Could not save user.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit user' : 'Add user'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={onSubmit} loading={submitting}>
            {isEdit ? 'Save changes' : 'Create user'}
          </Button>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        {serverError && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {serverError}
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
          label={isEdit ? 'New password (optional)' : 'Password'}
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          hint={isEdit ? 'Leave blank to keep the current password.' : undefined}
        />
        {!isEdit && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="user-role"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Role
            </label>
            <select
              id="user-role"
              name="role"
              value={form.role}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value={ROLES.USER}>User</option>
              <option value={ROLES.ADMIN}>Admin</option>
            </select>
          </div>
        )}
        <button type="submit" className="hidden" aria-hidden="true" />
      </form>
    </Modal>
  )
}
