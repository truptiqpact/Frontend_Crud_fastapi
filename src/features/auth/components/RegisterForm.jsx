// [Member 1 - Auth & Home UI] Account creation form (mirrors backend UserCreate rules).
import { useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import PasswordStrength from './PasswordStrength'
import { useRegister } from '../hooks/useRegister'
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../../../utils/validators'
import { ROLES } from '../../../constants/app'

const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const MailIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
)
const LockIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)
const ShieldIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3Z" />
  </svg>
)
const AlertIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0" {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" />
  </svg>
)
const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m22 4-10 10.01-3-3" />
  </svg>
)

export default function RegisterForm() {
  const { submit, submitting, error, success } = useRegister()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.USER,
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [shake, setShake] = useState(false)

  const checkField = (name, value) => {
    if (name === 'name') return validateName(value)
    if (name === 'email') return validateEmail(value)
    if (name === 'password') return validatePassword(value)
    return null
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (touched[name]) {
      setFieldErrors((errs) => ({ ...errs, [name]: checkField(name, value) }))
    }
  }

  const onBlur = (e) => {
    const { name, value } = e.target
    setTouched((t) => ({ ...t, [name]: true }))
    setFieldErrors((errs) => ({ ...errs, [name]: checkField(name, value) }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {
      name: checkField('name', form.name),
      email: checkField('email', form.email),
      password: checkField('password', form.password),
    }
    const cleaned = Object.fromEntries(Object.entries(errs).filter(([, v]) => v))
    setFieldErrors(cleaned)
    setTouched({ name: true, email: true, password: true })
    if (Object.keys(cleaned).length) {
      setShake(true)
      return
    }
    submit(form)
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      onAnimationEnd={() => setShake(false)}
      className={`flex flex-col gap-4 ${shake ? 'anim-shake' : ''}`}
    >
      {error && (
        <div className="anim-fade-in flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
          <AlertIcon />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="anim-fade-in flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckIcon />
          <span>{success}</span>
        </div>
      )}

      <div className="anim-fade-up anim-delay-1">
        <Input
          label="Name"
          name="name"
          placeholder="Ada Lovelace"
          leftIcon={<UserIcon />}
          value={form.name}
          onChange={onChange}
          onBlur={onBlur}
          error={fieldErrors.name}
          valid={touched.name && !fieldErrors.name && form.name.length > 0}
        />
      </div>

      <div className="anim-fade-up anim-delay-2">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          leftIcon={<MailIcon />}
          value={form.email}
          onChange={onChange}
          onBlur={onBlur}
          error={fieldErrors.email}
          valid={touched.email && !fieldErrors.email && form.email.length > 0}
        />
      </div>

      <div className="anim-fade-up anim-delay-3">
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          leftIcon={<LockIcon />}
          value={form.password}
          onChange={onChange}
          onBlur={onBlur}
          error={fieldErrors.password}
          hint={!form.password ? 'Minimum 6 characters, and not all numbers.' : undefined}
        />
        <PasswordStrength value={form.password} />
      </div>

      <div className="anim-fade-up anim-delay-4 flex flex-col gap-1.5">
        <label htmlFor="role" className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Role
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-slate-400">
            <ShieldIcon />
          </span>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={onChange}
            className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-9 text-sm text-slate-900 shadow-sm transition-all duration-200 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value={ROLES.USER}>User</option>
            <option value={ROLES.ADMIN}>Admin</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex w-9 items-center justify-center text-slate-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>

      <Button type="submit" loading={submitting} className="anim-fade-up anim-delay-5 mt-1 w-full">
        {submitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
