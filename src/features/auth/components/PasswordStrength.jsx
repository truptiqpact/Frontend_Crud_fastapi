// [Member 1 - Auth & Home UI] Live password strength meter + requirements checklist.
// Pure presentational component. The hard rules (>= 6 chars, not only numbers)
// mirror the backend schema (app/schemas/user_schema.py) and utils/validators.js.
import { useMemo } from 'react'

function scorePassword(value = '') {
  const len = value.length
  const hasLetter = /[a-z]/i.test(value)
  const hasNumber = /\d/.test(value)
  const hasUpperLower = /[a-z]/.test(value) && /[A-Z]/.test(value)
  const hasSymbol = /[^a-z0-9]/i.test(value)
  const notAllNumbers = len > 0 && !/^\d+$/.test(value)

  let score = 0
  if (len >= 6) score += 1
  if (len >= 10) score += 1
  if (hasUpperLower || (hasLetter && hasNumber)) score += 1
  if (hasSymbol) score += 1
  score = Math.min(score, 4)

  // Never show "strong" if the backend would reject it.
  if (len < 6 || !notAllNumbers) score = Math.min(score, 1)

  const requirements = [
    { label: 'At least 6 characters', met: len >= 6 },
    { label: 'Not only numbers', met: notAllNumbers },
    { label: 'Letters and numbers', met: hasLetter && hasNumber },
    { label: '8 characters or more', met: len >= 8 },
  ]

  return { score, requirements }
}

const LEVELS = [
  { label: 'Too weak', bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
  { label: 'Weak', bar: 'bg-red-500', text: 'text-red-600 dark:text-red-400' },
  { label: 'Fair', bar: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  { label: 'Good', bar: 'bg-violet-500', text: 'text-violet-600 dark:text-violet-400' },
  { label: 'Strong', bar: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
]

function Dot({ met }) {
  return met ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3.5 w-3.5 text-emerald-500" strokeLinecap="round" strokeLinejoin="round">
      <path d="m20 6-11 11-5-5" />
    </svg>
  ) : (
    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
  )
}

export default function PasswordStrength({ value = '' }) {
  const { score, requirements } = useMemo(() => scorePassword(value), [value])
  if (!value) return null

  const level = LEVELS[score]

  return (
    <div className="anim-fade-in mt-1 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i < score ? level.bar : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
        <span className={`w-16 text-right text-xs font-medium ${level.text}`}>
          {level.label}
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {requirements.map((r) => (
          <li
            key={r.label}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              r.met
                ? 'text-slate-600 dark:text-slate-300'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center">
              <Dot met={r.met} />
            </span>
            {r.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
