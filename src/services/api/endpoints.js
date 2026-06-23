// [Member 1 - Core] Every backend path in one place.
// Derived from the FastAPI routers (auth_router, user_router, *_router).
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login', // POST {email, password} -> {access_token, refresh_token, token_type}
    REFRESH: '/auth/refresh', // POST {refresh_token} -> {access_token, token_type}
  },
  USERS: {
    CREATE: '/users', // POST UserCreate  (registration; no auth)
    LIST: '/users/', // GET  (Bearer; admin -> all, user -> self) -> {message, data}
    BY_ID: (id) => `/users/${id}`, // GET (public) / PUT (Bearer) / DELETE (Bearer, admin)
  },
}
