// [Member 3 - UI Kit] Public shell: navbar + content + footer.
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
