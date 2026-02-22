import { PrismaClient } from '../generated/prisma';
import { Request, Response } from 'express';

const prisma= new PrismaClient();

type JobListing = {
  title: string;
  description: string;
  company: string;
  location?: string;
  salary?: string;
  postedBy?: string;
}; 

// functions + handlers
export const createJobListingHandler = async (req:Request, res:Response) => {
  try {
    const job = await createJobListing(req.body);
    res.status(201).json(job);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const createJobListing = async (jobData: JobListing) => {
    const { title, description, company, location, salary, postedBy } = jobData;
    
    // Validate required fields
    if (!title || !description || !company) {
        throw new Error('Title, description, and company are required fields.');
    }

    // Create and return new job
    const newJob = await prisma.job.create({
        data: { title, description, company, location, salary, postedBy }
    });
    
    return newJob;
};

export const getAllJobListingsHandler = async (req: Request, res: Response) => {
  try {
    const {status} = req.query;
    const jobs = await getAllJobListings(status as string | undefined);
    res.status(200).json(jobs);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllJobListings = async (status?: string) => {
    console.log("Fetching all job listings");
    const where: any = {};
    if (status) {
        where.status = status;
    } 
    return prisma.job.findMany({where});
};

export const getJobListingByIdHandler = async (req: Request, res: Response) => {
  try {
    const job = await getJobListingById(req.params.id);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getJobListingById = async (id: string) => {
    console.log(`Fetching job listing with id: ${id}`);
    return prisma.job.findUnique({
        where: { id }
    });
};

export const updateJobListingHandler = async (req: Request, res: Response) => {
  try {
    const updatedJob = await updateJobListing(req.params.id, req.body);
    res.status(200).json(updatedJob);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateJobListing = async (id: string, jobData: any) => {
    return prisma.job.update({
        where: { id },
        data: jobData
    });
};

export const deleteJobListingHandler = async (req: Request, res: Response) => {
  try {
    await deleteJobListing(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteJobListing = async (id: string) => {
    return prisma.job.delete({
        where: { id }
    });
};