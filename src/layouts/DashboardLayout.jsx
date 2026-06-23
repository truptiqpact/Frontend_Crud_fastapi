// [Member 2 - Dashboard] Protected shell: navbar + sidebar + content.
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar />
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
