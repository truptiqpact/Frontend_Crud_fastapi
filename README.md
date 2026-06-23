# Frontend — FastAPI CRUD Admin

A React single-page app for the User Management API (FastAPI + JWT + RBAC).
It provides authentication, role-based access, an admin user-management
dashboard, and a self-service profile page.

Built as a **collaborative, 3-member** project — see **[TEAM_TASKS.md](./TEAM_TASKS.md)**
for who owns what.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **react-router-dom 7** for routing
- **axios** for HTTP (with a JWT refresh interceptor)
- JavaScript / JSX (no TypeScript)

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (production build), `npm run preview`
(serve the build), `npm run lint`.

## Configuration

Copy `.env.example` to `.env` and point it at your backend:

```
VITE_API_BASE_URL=http://localhost:8000
```

## Connecting to the backend

The app expects these endpoints (all under `VITE_API_BASE_URL`):

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/login` | `{ email, password }` → `{ access_token, refresh_token }` |
| POST | `/auth/refresh` | `{ refresh_token }` → `{ access_token }` |
| POST | `/users` | Register / create a user |
| GET | `/users/` | List (admin → all, user → self) |
| GET | `/users/{id}` | Fetch one user |
| PUT | `/users/{id}` | Update name / email / password |
| DELETE | `/users/{id}` | Delete a user (admin) |

**CORS:** add `http://localhost:5173` to the backend's `CORSMiddleware`
`allow_origins`, or the browser will block requests.

## Project structure

```
src/
├── components/        # ui/ (design system) + common/ (navbar, sidebar, footer…)
├── constants/         # api, app, messages
├── context/           # Auth, Theme, App providers
├── features/          # auth · dashboard · profile  (each: services/ hooks/ components/)
├── hooks/             # useAuth, useLocalStorage, useDebounce
├── layouts/           # Root, Auth, Dashboard shells
├── pages/             # Home, Login, Register, Dashboard, NotFound
├── routes/            # route table + ProtectedRoute / RoleRoute guards
├── services/          # api/ (axios + endpoints), storage/
├── styles/            # Tailwind entry + tokens + globals
├── types/             # JSDoc typedefs
└── utils/             # validators, permissions, helpers, formatDate
```

## Roles

- **admin** — manage all users (list, create, edit, delete).
- **user** — see and edit only their own account.

You can create an admin from the Register screen (role selector) to bootstrap.

## Notes on the backend (worth a look)

These came up while wiring the frontend and are backend-side, not frontend bugs:

1. **Open routes shadow protected ones.** In `main.py` the unauthenticated
   `update`/`delete` routers are included *before* the protected `user_router`,
   so `PUT`/`DELETE /users/{id}` currently resolve to the open handlers. Order
   the protected router first (or remove the duplicates) to enforce auth.
2. **`GET /users/{id}` returns the hashed password** (no `response_model`).
   Add a response schema that omits `password`.
