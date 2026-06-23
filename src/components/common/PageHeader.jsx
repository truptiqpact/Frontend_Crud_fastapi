// [Member 3] Animated page header with optional breadcrumbs + actions.
// Backwards-compatible: <PageHeader title subtitle actions /> still works.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Chevron = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>
)

export default function PageHeader({ title, subtitle, actions, breadcrumbs = [] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-6">
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            {breadcrumbs.map((c, i) => {
              const last = i === breadcrumbs.length - 1
              return (
                <li key={i} className="flex items-center gap-1.5">
                  {c.to && !last ? (
                    <Link to={c.to} className="transition-colors hover:text-violet-600 dark:hover:text-violet-400">{c.label}</Link>
                  ) : (
                    <span className={last ? 'font-medium text-slate-700 dark:text-slate-300' : ''}>{c.label}</span>
                  )}
                  {!last && <Chevron />}
                </li>
              )
            })}
          </ol>
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </motion.div>
  )
}
