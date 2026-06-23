// [Member 3 - UI Kit] Page title block with an optional actions slot.
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
