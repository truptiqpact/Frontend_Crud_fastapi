# Team Tasks — 3-Member Split

This frontend is divided into three independent areas of ownership. Each file
carries a `// [Member N - Area]` header so it's clear who owns it. The seams are
chosen so people can work in parallel with minimal merge conflicts:

- **Member 1** builds the foundation (API, auth, routing) that 2 and 3 import.
- **Member 3** builds the shared UI kit that 1 and 2 import.
- **Member 2** builds the CRUD dashboard on top of both.

Agree on the shared "contracts" early (see the bottom of this file), then build.

---

## 👤 Member 1 — Core Infrastructure & Authentication

Owns the plumbing every other feature depends on.

| Area | Files |
|------|-------|
| HTTP client | `src/services/api/axios.js`, `src/services/api/endpoints.js` |
| Storage | `src/services/storage/localStorage.js` |
| Constants | `src/constants/api.js`, `app.js`, `messages.js` |
| Contexts | `src/context/AuthContext.jsx`, `ThemeContext.jsx`, `AppContext.jsx` |
| Shared hooks | `src/hooks/useAuth.js`, `useLocalStorage.js`, `useDebounce.js` |
| Routing | `src/routes/AppRoutes.jsx`, `ProtectedRoute.jsx`, `RoleRoute.jsx`, `routeConstants.js` |
| Auth feature | `src/features/auth/**` (service, hooks, `LoginForm`, `RegisterForm`) |
| Auth pages | `src/pages/Login.jsx`, `src/pages/Register.jsx` |
| Helpers/types | `src/utils/validators.js`, `permissions.js`, `helpers.js`, `src/types/**` |
| App wiring | `src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/styles/**`, `vite.config.js`, `.env` |

**Deliverables:** working login/register, JWT persistence + silent refresh,
protected and role-gated routes, the auth React context.

---

## 👤 Member 2 — Users / Dashboard (CRUD)

Owns the admin-facing user-management experience.

| Area | Files |
|------|-------|
| Data layer | `src/features/dashboard/services/userService.js` |
| State | `src/features/dashboard/hooks/useUsers.js` |
| Components | `src/features/dashboard/components/UserTable.jsx`, `UserFormModal.jsx`, `DeleteUserDialog.jsx`, `StatsCards.jsx` |
| Page | `src/pages/Dashboard.jsx` |
| Dashboard shell | `src/layouts/DashboardLayout.jsx`, `src/components/common/Navbar.jsx`, `Sidebar.jsx` |
| Utils | `src/utils/formatDate.js` |

**Deliverables:** list users (admin sees all, standard user sees self),
create / edit / delete users with validation, summary stats, the dashboard
layout + navigation.

---

## 👤 Member 3 — Shared UI Kit, Layouts, Profile & Public Pages

Owns the reusable design system and the lighter pages.

| Area | Files |
|------|-------|
| UI kit | `src/components/ui/Button.jsx`, `Input.jsx`, `Card.jsx`, `Loader.jsx`, `Modal.jsx` |
| Common | `src/components/common/Footer.jsx`, `PageHeader.jsx` |
| Layouts | `src/layouts/RootLayout.jsx`, `AuthLayout.jsx` |
| Public pages | `src/pages/Home.jsx`, `src/pages/NotFound.jsx` |
| Profile feature | `src/features/profile/**` (service, `useProfile`, `ProfileCard`, `ProfileForm`, `ProfilePage`) |

**Deliverables:** the component library used everywhere, the public landing +
404, and the self-service profile (view + edit own details).

---

## Shared contracts (agree on these first)

These are the interfaces the three areas meet at. Keep them stable.

- **UI kit props** (Member 3 → everyone)
  - `<Button variant="primary|secondary|danger|ghost" size="sm|md|lg" loading>`
  - `<Input label error hint />` (forwards ref + native props)
  - `<Modal open onClose title footer>`
- **Auth context** (Member 1 → everyone): `useAuth()` returns
  `{ user, isAuthenticated, isAdmin, loading, login, register, logout }`.
- **API shape** (Member 1 → Members 2 & 3): every call goes through
  `src/services/api/axios.js`; paths live in `endpoints.js`; surface errors with
  `getErrorMessage(err)`.
- **User model**: `{ id, name, email, role: 'admin' | 'user' }` (see `src/types/user.js`).

## How to run

```bash
npm install          # installs deps (incl. react-router-dom + axios)
npm run dev          # http://localhost:5173
```

Set the backend URL in `.env` (defaults to `http://localhost:8000`):

```
VITE_API_BASE_URL=http://localhost:8000
```

> The FastAPI backend must allow CORS from `http://localhost:5173`
> (add `http://localhost:5173` to `CORSMiddleware` `allow_origins`).
