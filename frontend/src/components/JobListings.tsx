import {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

import { useAuth } from '../hooks/useAuth';


interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string | null;
  salary: string | null;
  status: string;
  postedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Application {
  id:           string;
  jobId?:       string;
  candidateId:  string;
  status?:      string;
}

const JobListings = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [applications, setApplications] = useState<Application[]>([]);

    const selectJob = (id: string) => {
        console.log("Job selected", id);
        navigate(`/job-details/${id}`);
    };

     useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const jobsData = await response.json();
                console.log('Full response:', jobsData);
                setJobs(jobsData.filter(job => job.status === 'ACTIVE'));
            } catch (error) {
                console.error('Error fetching job listings:', error);
            }
        };

        const fetchApplications = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/applications/candidate/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const applicationsData = await response.json();
                console.log('Full response:', applicationsData);
                setApplications(applicationsData);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        if (user) {fetchApplications();}

        fetchJobs();
    }, [user]);

  return (
   <div>
        {jobs.length === 0 ? (
            <p>No jobs found</p>
        ) : (
            <div className="flex flex-wrap gap-4 items-stretch m-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        onClick={() => selectJob(job.id)}
                        className="flex flex-col min-w-[280px] max-w-[480px] flex-1 border p-4 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                    >
                        <div className="flex justify-end mb-2">
                            <span className="text-sm font-medium">
                                {applications.find((app) => app.jobId === job.id)?.status ?? 'APPLY'}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p><span className="font-medium">Company:</span> {job.company || 'N/A'}</p>
                            <p><span className="font-medium">Title:</span> {job.title}</p>
                            <p><span className="font-medium">Location:</span> {job.location || 'Not specified'}</p>
                            <p><span className="font-medium">Salary:</span> {job.salary || 'Not specified'}</p>
                            <p><span className="font-medium">Description:</span> {job.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default JobListings