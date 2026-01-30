import { Router } from "express";
import dotenv from 'dotenv';
import { googleAuth, googleAuthCallback } from "../controller/authController.js";
import { createApplication, createApplicationHandler, deleteApplication, getAllApplications, getApplicationByCandidateId, getApplicationById, getApplicationByJobId, uodateApplicationStatus } from "../controller/applicationController.js";
import { createJobListing, createJobListingHandler, deleteJobListing, deleteJobListingHandler, getAllJobListings, getAllJobListingsHandler, getJobListingById, getJobListingByIdHandler, updateJobListing, updateJobListingHandler } from "../controller/jobController.js";
import { getUserInfo, requireAuth } from "../middleware/authenticateUser.js";

dotenv.config();

const appRoutes = Router();

appRoutes.get('/auth/google', googleAuth); // start with Google Login
appRoutes.get('/auth/google/callback', googleAuthCallback); // After successful Google login, handle callback
appRoutes.get('/auth/google/userinfo', getUserInfo);

// Job Listings Routes
appRoutes.post('/jobs', createJobListingHandler);
appRoutes.get('/jobs', getAllJobListingsHandler);
appRoutes.get('/jobs/:id', getJobListingByIdHandler);
appRoutes.put('/jobs/:id', updateJobListingHandler);
appRoutes.delete('/jobs/:id', deleteJobListingHandler);

// Application Routes (POST requires login so server knows who is applying)
appRoutes.post('/applications', requireAuth, createApplicationHandler);
appRoutes.get('/applications', getAllApplications);
appRoutes.get('/applications/:id', getApplicationById);
appRoutes.get('/applications/job/:jobId', getApplicationByJobId);
appRoutes.get('/applications/candidate/:candidateId', getApplicationByCandidateId);
appRoutes.put('/applications/:id', uodateApplicationStatus);
appRoutes.delete('/applications/:id', deleteApplication);

export default appRoutes; 