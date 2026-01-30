import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

type ApplicationFormDetails = {
    fullName: string;
    jobId: string;
    phoneNumber: string;
    email: string;
    cvLink: string;
    candidateId: string;
};

export const createApplicationHandler = async(req:Request, res:Response) =>{
    try{
        // Prefer authenticated user id; fallback to body (e.g. for testing)
        const candidateId = (req as any).user?.id ?? req.body.candidateId;
        if (!candidateId || typeof candidateId !== 'string') {
            return res.status(400).json({
                error: 'candidateId is required. Log in or send candidateId in the request body.',
            });
        }
        const application = await createApplication({ ...req.body, candidateId });
        res.status(201).json(application)
    }
    catch(error){
        console.error('Error creating application:', error);
        console.error('Request body:', req.body);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Failed to create application' });
        }
    };

export const createApplication = async (applicationForm: ApplicationFormDetails) => {
    const { fullName, jobId, phoneNumber,email, cvLink } = applicationForm;

    // Check if candidate has already applied for the job
    const existingApplication = await prisma.application.findFirst({
        where: {
            phoneNumber,
            jobId
        }
    });

    if (existingApplication) {
        throw new Error('Candidate has already applied for this job');
    }

    if (!fullName || !email || !cvLink) {
        throw new Error('fullName, email, and cvLink are required fields.');
    }

    if (!applicationForm.candidateId || typeof applicationForm.candidateId !== 'string') {
        throw new Error('candidateId is required.');
    }

    // Create new application
    const newApplication = await prisma.application.create({
        data: {
            fullName,
            phoneNumber,
            jobId,
            cvLink,
            email,
            candidateId: applicationForm.candidateId,
        }
    });

    return newApplication;
};


export const getAllApplicationsHandler = async(req:Request, res:Response) =>{
    try{
        const applications = await getAllApplications();
        res.status(200).json(applications);
    }
    catch(error){
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

export const getAllApplications = async () => {
    console.log("Fetching all applications");
    return prisma.application.findMany();
};




export const getApplicationById = () =>{};
export const getApplicationByJobId = () =>{};
export const getApplicationByCandidateId = () =>{};
export const uodateApplicationStatus = () =>{};
export const deleteApplication = () =>{};