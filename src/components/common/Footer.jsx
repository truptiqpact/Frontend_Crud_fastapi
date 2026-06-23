// [Member 3] App footer with a subtle entrance animation.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { APP_NAME } from '../../constants/app'
import { ROUTES } from '../../routes/routeConstants'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <motion.footer
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="border-t border-slate-200 bg-white/60 dark:border-slate-800 dark:bg-slate-900/40"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-slate-500 dark:text-slate-400 sm:flex-row">
        <p className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">F</span>
          <span>&copy; {year} <span className="font-medium text-slate-700 dark:text-slate-300">{APP_NAME}</span></span>
        </p>
        <nav className="flex items-center gap-5">
          <Link to={ROUTES.DASHBOARD} className="transition-colors hover:text-violet-600 dark:hover:text-violet-400">Dashboard</Link>
          <Link to={ROUTES.PROFILE} className="transition-colors hover:text-violet-600 dark:hover:text-violet-400">Profile</Link>
          <a href="https://github.com/truptiqpact/Frontend_Crud_fastapi" target="_blank" rel="noreferrer" className="transition-colors hover:text-violet-600 dark:hover:text-violet-400">GitHub</a>
        </nav>
      </div>
    </motion.footer>
  )
}
