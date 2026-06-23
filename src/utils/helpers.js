// [Member 1 - Core] Small shared helpers.

// Merge truthy class names (tiny clsx).
export function cn(...parts) {
  return parts.filter(Boolean).join(' ')
}

// Decode a JWT payload without verifying the signature (client-side display only).
export function decodeJwt(token) {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

// Is the access token past its `exp` (seconds since epoch)?
export function isTokenExpired(token) {
  const payload = decodeJwt(token)
  if (!payload?.exp) return true
  return Date.now() >= payload.exp * 1000
}

// "Ada Lovelace" -> "AL"
export function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('')
}
