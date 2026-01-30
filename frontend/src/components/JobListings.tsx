import {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

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

const JobListings = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const navigate = useNavigate();

    const selectJob = (id: string) => {
        console.log("Job selected", id);
        navigate(`/job-details/${id}`);
        
    };

     useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:3000/jobs', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const jobsData = await response.json();
                console.log('Full response:', jobsData);
                setJobs(jobsData);
            } catch (error) {
                console.error('Error fetching job listings:', error);
            }
        };

        fetchJobs();
    }, []);

  return (
   <div>
        <h1>Job Listings</h1>
        {jobs.length === 0 ? (
            <p>No jobs found</p>
        ) : (
            jobs.map((job, index) => (
                <div key={index}
                     className="border p-4 my-2 rounded-md"
                     onClick={() => selectJob(job.id)}>
                    <p>Company name: {job.company || 'N/A'}</p>
                    <p>Title: {job.title}</p>
                    <p>Location: {job.location || 'Not specified'}</p>
                    <p>Salary: {job.salary || 'Not specified'}</p>
                    <p>Description: {job.description}</p>
                </div>
                
            ))
        )}
    </div>
  )
}

export default JobListings