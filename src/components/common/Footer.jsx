// [Member 3 - UI Kit] App footer.
import { APP_NAME } from '../../constants/app'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400 dark:border-slate-800">
      {APP_NAME} · Built with React + FastAPI
    </footer>
  )
}
