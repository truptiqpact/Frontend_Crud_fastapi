// [Member 1 - Auth & Home UI] Public landing page.
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../routes/routeConstants'
import { APP_NAME } from '../constants/app'
import hero from '../assets/hero.png'

const ArrowIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const FEATURES = [
  {
    title: 'Secure authentication',
    desc: 'JWT tokens with silent refresh keep every session safe and seamless.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3Z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Role-based access',
    desc: 'Admins manage everyone; standard users manage only themselves.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
      </svg>
    ),
  },
  {
    title: 'Full user CRUD',
    desc: 'Create, edit, and remove users from one focused dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 4v16" />
      </svg>
    ),
  },
]

export default function Home() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative">
      {/* Ambient backdrop, faded at the edges */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-[520px] home-aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-[520px] home-grid" aria-hidden="true" />

      {/* Hero */}
      <section className="relative grid items-center gap-12 py-8 lg:grid-cols-2 lg:py-16">
        <div className="text-center lg:text-left">
          <span className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-900/50 dark:bg-violet-900/30 dark:text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            React + FastAPI
          </span>

          <h1 className="anim-fade-up anim-delay-1 mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-gradient">{APP_NAME}</span>
          </h1>

          <p className="anim-fade-up anim-delay-2 mx-auto mt-4 max-w-lg text-base text-slate-500 dark:text-slate-400 lg:mx-0">
            A user management console with JWT authentication and role-based
            access. Admins manage everyone; users manage themselves.
          </p>

          <div className="anim-fade-up anim-delay-3 mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
              <Button size="lg" className="gap-2">
                {isAuthenticated ? 'Go to dashboard' : 'Sign in'}
                <ArrowIcon />
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" variant="secondary">
                  Create account
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Floating hero graphic */}
        <div className="anim-fade-in anim-delay-3 relative mx-auto hidden w-full max-w-xs md:block lg:max-w-sm">
          <div className="absolute inset-8 hero-glow" aria-hidden="true" />
          <img src={hero} alt="Stacked layers illustration" className="anim-float relative w-full drop-shadow-2xl" />
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative grid gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Card
            key={f.title}
            className={`anim-fade-up anim-delay-${i + 2} p-5 transition-transform duration-200 hover:-translate-y-1`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300">
              {f.icon}
            </span>
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
          </Card>
        ))}
      </section>
    </div>
  )
}
