// [Member 3 - UI Kit] Centered card shell for login/register.
import { Outlet } from 'react-router-dom'
import Card from '../components/ui/Card'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
      <Card className="w-full max-w-sm p-8">
        <Outlet />
      </Card>
    </div>
  )
}
