// [Member 1 - Core] Convenience accessor for AuthContext.
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
