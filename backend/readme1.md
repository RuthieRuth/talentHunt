frontend:

backend:
- npm init -y
-  npm install express cors dotenv
- npm install -D nodemon
- npm install -D typescript @types/node @types/express @types/cors nodemon ts-node
- npm install -D ts-node
- npm install --save-dev @types/express @types/cors

- npx tsc --init
- make folders  
    backend/
    ├── src/
    │   ├── index.ts
    │   ├── routes/
    │   └── middleware/
    ├── package.json
    ├── tsconfig.json
    └── .env

- routes for application
    GET    /jobs             → get all jobs (sub divisions)
    GET    /jobs/:id         → get single job (particular sub-division)
    POST   /jobs             → create a job (admin) 
    PUT    /jobs/:id         → update a job
    DELETE /jobs/:id         → delete a job

    POST   /candidates       → register candidate 
    GET    /candidates       → list candidates (admin only)

    POST   /applications     → apply for a job
    GET    /applications     → list all applications (admin only)



## Exact MVP Scope (NO overbuilding)
This MVP is small but very impressive.
🎯 Goal of the app
Help a recruitment company manage tech candidates and job applications.

- 👥 User roles (keep it simple)
Recruiter
Candidate

(You can mention Admin later, but don’t build it now.)

- Core features ONLY
Candidate
Sign up / log in (done)
Create profile (name, skills, experience)
View job listings
Apply to a job
See application status

- Recruiter
Log in
Create job postings
View applicants per job
Change application status
Add private notes

❌ What NOT to build (important)
No messaging system
No calendar
No payments
No AI matching (yet)
No fancy dashboards
Seniors LOVE restraint.

## Use Cases (before coding)
- 🧑‍💻 Candidate use cases
Candidate registers
Candidate completes profile
Candidate views open jobs
Candidate applies to a job
Candidate sees application status

- 🧑‍💼 Recruiter use cases
Recruiter logs in
Recruiter creates job posting
Recruiter views applicants
Recruiter updates status
Recruiter adds internal notes

⚠️ Edge cases (VERY important)
Candidate cannot apply twice
Candidate cannot apply without profile
Recruiter cannot edit closed jobs
Candidate cannot see recruiter notes

## Data model
User
- id
- role (candidate | recruiter)
- email
- password

CandidateProfile
- userId
- skills
- experience

Job
- id
- title
- description
- isOpen
- recruiterId

Application
- id
- jobId
- candidateId
- status (applied | interview | hired | rejected)
- notes (private)


## Backend routes (API mapping)
- Auth
POST   /auth/register
POST   /auth/login

- Jobs
GET    /jobs
POST   /jobs        (recruiter only)
PUT    /jobs/:id    (recruiter only)

- Applications
POST   /applications        (candidate applies)
GET    /applications/me     (candidate views own)
GET    /jobs/:id/applicants (recruiter views)
PUT    /applications/:id/status (recruiter)

## Frontend pages
- Public
Login
Register
Job listings

- Candidate
Profile page
My applications

- Recruiter
My jobs
Job details (applicants list)

## Business Logic
``
if (applicationExists) {
  throw new Error("Candidate already applied");
}
``

"
if (user.role !== 'recruiter') {
  throw new Error("Unauthorized");
}
"

"
if (!job.isOpen) {
  throw new Error("Job is closed");
}
"

## Priority 1: Role system (foundation)
Add role field to user model (admin/candidate/recruiter)
Include role in JWT token when generating it
Create API endpoint to fetch current user data (including role)

## Priority 2: Dashboard implementation
Fetch user data on Dashboard load (including role)
Conditional rendering based on role:
Admin dashboard: job management, view all candidates/applications
Candidate dashboard: view jobs, my applications, profile
Add loading states and error handling

## Priority 3: Dashboard features by role
Admin: create/edit jobs, view applicants, manage applications
Candidate: browse jobs, apply, view application status

