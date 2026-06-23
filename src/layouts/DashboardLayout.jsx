// [Member 3] Protected shell: navbar + animated collapsible sidebar + toaster.
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'

const COLLAPSE_KEY = 'fcp_sidebar_collapsed'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSE_KEY) === '1')
  const location = useLocation()

  const toggleCollapse = () =>
    setCollapsed((c) => {
      const next = !c
      localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0')
      return next
    })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar collapsed={collapsed} onToggleCollapse={toggleCollapse} />
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 px-4 py-8 sm:px-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <Toaster richColors position="top-right" theme="system" />
    </div>
  )
}
