// [Member 1 - Core] Mirrors the backend RBAC table (app/core/rbac.py).
import { ROLES } from '../constants/app'

export const PERMISSIONS = {
  [ROLES.ADMIN]: ['read', 'create', 'update', 'delete'],
  [ROLES.USER]: ['read'],
}

export const isAdmin = (role) => role === ROLES.ADMIN

export function can(role, action) {
  return (PERMISSIONS[role] || []).includes(action)
}
