# TalentHunt

A job board application where candidates can browse and apply for jobs, and admins can manage job listings and review applicants.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** Express, TypeScript, Prisma, PostgreSQL
- **Auth:** Google OAuth

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

The backend runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Features

### Candidate
- Google login
- Browse job listings
- View job details
- Apply to jobs

### Admin
- View all job listings with applicant counts
- View applicants per job
- Edit job details (inline editing)
- Close job listings
- Accept/reject applicants (in progress)
