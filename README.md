# EduLearn – Landing & Authenticated Platform

This project turns the EduLearn landing page into a functioning education platform with a minimal but complete authentication system. The existing UI is preserved while adding a production-ready Express backend and frontend auth flows.

## Stack
- Frontend: Vite + React + TypeScript + Tailwind + shadcn/ui
- Backend: Node.js + Express + SQLite (better-sqlite3) + JWT (httpOnly cookies)

## Project Structure
- `src/` – React app (landing, courses, dashboard, etc.)
- `server/` – Express API with SQLite persistence
- `data/edu-platform.db` – Auto-created SQLite database
- `env.frontend.example` – Frontend environment template
- `server/env.example` – Backend environment template

## Quick Start
### 1) Frontend
```sh
cp env.frontend.example .env      # set VITE_API_URL if needed
npm install
npm run dev
# http://localhost:5173
```

### 2) Backend
```sh
cd server
cp env.example .env               # adjust CLIENT_URL/JWT_SECRET/PORT
npm install
npm run dev
# http://localhost:4000
```

The frontend expects the backend at `http://localhost:4000` (configured via `VITE_API_URL`).

## Auth Flow
- Register/Login at `/auth`; uses email + password.
- JWT is stored in an httpOnly, same-site cookie for safety.
- Protected routes: dashboard, course creation/editing, analytics, messaging, notifications, course progress, and reports redirect unauthenticated users to `/auth`.
- Navbar reflects auth state (Dashboard + Logout when signed in).

## API Overview
- `GET /api/health` – health check
- `POST /api/auth/register` – `{ name, email, password }`
- `POST /api/auth/login` – `{ email, password }`
- `POST /api/auth/logout` – clears session cookie
- `GET /api/auth/me` – returns current user (requires auth)

## Notes
- SQLite DB is file-based; delete `data/edu-platform.db` to reset locally.
- Cookies are secure-only in production; configure `CLIENT_URL` if the frontend runs elsewhere.
- Keep landing content and course pages as-is; only auth-related UX was added.
