// [Member 1 - Core] Lightweight global UI state (e.g. mobile sidebar toggle).
import { createContext, useCallback, useMemo, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const value = useMemo(
    () => ({ sidebarOpen, toggleSidebar, closeSidebar }),
    [sidebarOpen, toggleSidebar, closeSidebar],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
