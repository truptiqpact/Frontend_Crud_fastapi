// [Member 3] Public shell: navbar + animated content + footer + toaster.
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export default function RootLayout() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-10"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <Toaster richColors position="top-right" theme="system" />
    </div>
  )
}
