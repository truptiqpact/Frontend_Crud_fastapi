// [Member 1 - Auth] Account creation form (mirrors backend UserCreate rules).
import { useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { useRegister } from '../hooks/useRegister'
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../../utils/validators'
import { ROLES } from '../../../constants/app'

export default function RegisterForm() {
  const { submit, submitting, error, success } = useRegister()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.USER,
  })
  const [fieldErrors, setFieldErrors] = useState({})

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    }
    const cleaned = Object.fromEntries(
      Object.entries(errs).filter(([, v]) => v),
    )
    setFieldErrors(cleaned)
    if (Object.keys(cleaned).length) return
    submit(form)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-300">
          {success}
        </div>
      )}
      <Input
        label="Name"
        name="name"
        placeholder="Ada Lovelace"
        value={form.name}
        onChange={onChange}
        error={fieldErrors.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={onChange}
        error={fieldErrors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 6 characters"
        value={form.password}
        onChange={onChange}
        error={fieldErrors.password}
        hint="Minimum 6 characters, not all numbers."
      />
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="role"
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Role
        </label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={onChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value={ROLES.USER}>User</option>
          <option value={ROLES.ADMIN}>Admin</option>
        </select>
      </div>
      <Button type="submit" loading={submitting} className="mt-1 w-full">
        {submitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
