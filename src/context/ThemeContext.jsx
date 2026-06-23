// [Member 1 - Core] Light/dark theme, persisted, applied as a class on <html>.
import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null)

const THEME_KEY = 'fcp_theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
