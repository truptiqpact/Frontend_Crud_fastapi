// [Member 3 - UI Kit] Spinner with optional label.
export default function Loader({ label }) {
  return (
    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  )
}
