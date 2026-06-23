// [Member 1 - Auth & Home UI] Email/password sign-in form.
import { useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import { useLogin } from '../hooks/useLogin'
import { validateEmail } from '../../../utils/validators'

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
const AlertIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0" {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" />
  </svg>
)

export default function LoginForm() {
  const { submit, submitting, error } = useLogin()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [shake, setShake] = useState(false)

  const checkField = (name, value) => {
    if (name === 'email') return validateEmail(value)
    if (name === 'password') return value ? null : 'Password is required.'
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
      email: checkField('email', form.email),
      password: checkField('password', form.password),
    }
    const cleaned = Object.fromEntries(Object.entries(errs).filter(([, v]) => v))
    setFieldErrors(cleaned)
    setTouched({ email: true, password: true })
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

      <div className="anim-fade-up anim-delay-1">
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

      <div className="anim-fade-up anim-delay-2">
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          leftIcon={<LockIcon />}
          value={form.password}
          onChange={onChange}
          onBlur={onBlur}
          error={fieldErrors.password}
        />
      </div>

      <div className="anim-fade-up anim-delay-3 flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-800"
          />
          Remember me
        </label>
        <button
          type="button"
          className="font-medium text-violet-600 transition-colors hover:text-violet-700 hover:underline dark:text-violet-400"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" loading={submitting} className="anim-fade-up anim-delay-4 mt-1 w-full">
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
