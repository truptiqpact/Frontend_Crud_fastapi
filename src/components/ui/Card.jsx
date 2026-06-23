// [Member 2 - UI Kit] Surface container. Pass padding/extra styles via className.
import { cn } from '../../utils/helpers'

export default function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800',
        hover && 'transition-shadow hover:shadow-md',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}