// [Member 1 - Core] App root: Router + global providers wrap the route table.
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
