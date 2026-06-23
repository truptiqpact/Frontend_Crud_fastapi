// [Member 3 - UI Kit] Surface container.
import { cn } from '../../utils/helpers'

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
