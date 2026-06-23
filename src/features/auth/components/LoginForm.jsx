// [Member 1 - Auth] Email/password sign-in form.
import { useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { useLogin } from '../hooks/useLogin'
import { validateEmail } from '../../../utils/validators'

export default function LoginForm() {
  const { submit, submitting, error } = useLogin()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    const emailErr = validateEmail(form.email)
    if (emailErr) errs.email = emailErr
    if (!form.password) errs.password = 'Password is required.'
    setFieldErrors(errs)
    if (Object.keys(errs).length) return
    submit(form)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {error && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}
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
        autoComplete="current-password"
        placeholder="••••••••"
        value={form.password}
        onChange={onChange}
        error={fieldErrors.password}
      />
      <Button type="submit" loading={submitting} className="mt-1 w-full">
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
