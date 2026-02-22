# TalentHunt

A job board application where candidates can browse and apply for jobs, and admins can manage job listings and review applicants.

**Live demo:** _coming soon_

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** Express, TypeScript, Prisma, PostgreSQL
- **Auth:** Google OAuth 2.0 + JWT

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Environment Variables

**Backend** — create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/talenthunt
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

**Frontend** — create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev        # development
npm run build      # production build (compiles TypeScript to dist/)
npm run start      # production start
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # development
npm run build      # production build
```

The backend runs on `http://localhost:3000`, the frontend on `http://localhost:5173`.

## Features

### Candidate
- Google login
- Browse job listings
- View job details
- Apply to jobs

### Admin
- View all job listings with applicant counts
- View applicants per job
- Inline job editing
- Close and delete job listings
- Accept / reject applicants (in progress)
