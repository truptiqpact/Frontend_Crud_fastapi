// [Member 3 - UI Kit] Labelled input with error + helper text. forwardRef-friendly.
import { forwardRef, useId } from 'react'
import { cn } from '../../utils/helpers'

const Input = forwardRef(function Input(
  { label, error, hint, className, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id || autoId

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
      <input
        id={inputId}
        ref={ref}
        aria-invalid={Boolean(error)}
        className={cn(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-800 dark:text-slate-100',
          error
            ? 'border-red-400 focus:ring-red-500'
            : 'border-slate-300 dark:border-slate-600',
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{hint}</p>
      ) : null}
    </div>
  )
})

export default Input
