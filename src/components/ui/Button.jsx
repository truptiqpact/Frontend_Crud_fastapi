// [Member 3 - UI Kit] Button with variants, sizes, and a loading state.
import { cn } from '../../utils/helpers'

const VARIANTS = {
  primary:
    'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500 disabled:bg-violet-300',
  secondary:
    'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-600 dark:hover:bg-slate-700',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 disabled:bg-red-300',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:focus-visible:ring-offset-slate-900',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
