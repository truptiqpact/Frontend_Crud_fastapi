// [Member 3 - UI Kit] Accessible-ish modal: overlay, Esc to close, title.
import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
        {title && (
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-slate-700">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
            >
              ✕
            </button>
          </div>
        )}
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
