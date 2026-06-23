// [Member 1 - Core] Client-side validation that mirrors the backend schema rules
// (app/schemas/user_schema.py) so users get instant feedback.

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

// Backend: name 3..50 chars
export function validateName(name) {
  if (!name || name.trim().length < 3) return 'Name must be at least 3 characters.'
  if (name.trim().length > 50) return 'Name must be 50 characters or fewer.'
  return null
}

export function validateEmail(email) {
  if (!email) return 'Email is required.'
  if (!isValidEmail(email)) return 'Enter a valid email address.'
  return null
}

// Backend: min 6 chars and not all digits
export function validatePassword(password) {
  if (!password || password.length < 6)
    return 'Password must be at least 6 characters.'
  if (/^\d+$/.test(password)) return "Password can't be only numbers."
  return null
}
