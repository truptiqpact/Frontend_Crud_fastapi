// [Member 1 - Auth & Home UI] Labelled input with error + helper text.
// Shared UI kit component — preserves the existing contract used across the app:
//   <Input label error hint />  + forwardRef + native input props.
// Additions (all optional / backwards-compatible):
//   - leftIcon: ReactNode rendered inside the field
//   - valid:    show a success state (green ring + check)
//   - password fields automatically get a show/hide toggle
import { forwardRef, useId, useState } from 'react'
import { cn } from '../../utils/helpers'

function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
function EyeOffIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.05 3.95M6.6 6.6A17.6 17.6 0 0 0 2 11s3.5 7 10 7a9.1 9.1 0 0 0 4.07-.96" />
      <path d="m2 2 20 20" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  )
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  )
}

const Input = forwardRef(function Input(
  { label, error, hint, className, id, type = 'text', leftIcon, valid = false, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId
  const msgId = `${inputId}-msg`

  const isPassword = type === 'password'
  const [reveal, setReveal] = useState(false)
  const resolvedType = isPassword ? (reveal ? 'text' : 'password') : type

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex w-10 items-center justify-center text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          ref={ref}
          type={resolvedType}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? msgId : undefined}
          className={cn(
            'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100',
            leftIcon && 'pl-10',
            (isPassword || valid) && 'pr-10',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/40'
              : valid
                ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/40'
                : 'border-slate-300 focus:border-violet-500 focus:ring-violet-500/40 dark:border-slate-600',
            className,
          )}
          {...props}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? 'Hide password' : 'Show password'}
            aria-pressed={reveal}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-slate-400 transition-colors hover:text-slate-600 focus:outline-none focus-visible:text-violet-600 dark:hover:text-slate-200"
          >
            {reveal ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        ) : valid ? (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-emerald-500">
            <CheckIcon className="h-5 w-5" />
          </span>
        ) : null}
      </div>

      {error ? (
        <p id={msgId} className="anim-fade-in flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0">
            <circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={msgId} className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  )
})

export default Input
