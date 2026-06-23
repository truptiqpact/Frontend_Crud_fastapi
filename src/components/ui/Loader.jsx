// [Member 2 - UI Kit] Spinner with optional label + size.
import { cn } from '../../utils/helpers'

const SIZES = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-[3px]',
}

export default function Loader({ label, size = 'md', className }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 text-slate-500 dark:text-slate-400',
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          'animate-spin rounded-full border-violet-500 border-t-transparent',
          SIZES[size],
        )}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  )
}