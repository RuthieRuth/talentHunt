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

const AdminJobListings = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [applications, setApplications] = useState<Application[]>([])
    const navigate = useNavigate();
    const { user } = useAuth();

    const selectJob = (id: string) => {
        console.log("Job selected", id);
        navigate(`/admin/job-details/${id}`);
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
                console.log('Full response for data on jobs:', jobsData);
                setJobs(jobsData);
            } catch (error) {
                console.error('Error fetching job listings:', error);
            }
        };

        const fetchApplicants = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/applications`, { // change endpoint
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const applicantsData = await response.json();
                console.log('Full response of applicants data:', applicantsData);
                setApplications(applicantsData);

            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        }; 

        fetchApplicants();
        fetchJobs();
    }, [user]);

  return (
   <div className="flex flex-wrap gap-4 m-5">
        {jobs.length === 0 ? (
            <p>No jobs found</p>
        ) : (
                jobs.map((job) => {
                    const applicantCount = applications.filter(app => app.jobId === job.id).length;

                    return (
                        <div
                            key={job.id}
                            onClick={() => selectJob(job.id)}
                            className="flex flex-col min-w-[280px] max-w-[480px] flex-1 border p-4 rounded-md cursor-pointer hover:border-gray-400 transition-colors">

                            <div className="space-y-1">
                            <p><span className="font-medium">Company:</span> {job.company || 'N/A'}</p>
                            <p><span className="font-medium">Title:</span> {job.title}</p>
                            <p><span className="font-medium">Location:</span> {job.location || 'Not specified'}</p>
                            <p><span className="font-medium">Salary:</span> {job.salary || 'Not specified'}</p>
                            <p><span className="font-medium">Description:</span> {job.description}</p>

                            <p><span className="my-4 font-medium">Applicants: {applicantCount}</span></p>
                        </div>
                        <div className='my-4 flex gap-4'>
                            <p>
                                <span className="font-medium bg-teal-500 p-1 rounded">
                                    View Applicants
                                </span>
                            </p>
                           {/*  <p><span className="font-medium bg-yellow-500 p-1 rounded">Edit Job</span></p>
                            <p><span className="font-medium bg-red-500 p-1 rounded">Close</span></p> */}
                        </div>
                    </div>
                    )
                })
        )}
    </div>
  )
}

export default AdminJobListings