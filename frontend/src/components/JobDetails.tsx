import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";

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

const JobDetails = () => {
    console.log("Job Details component clicked"); // delete later
    const {id} = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [showApplyForm, setShowApplyForm] = useState(false);
    const navigate = useNavigate();

    const [applicationForm, setApplicationForm] = useState({
      fullName: "",
      email: "",
      cvLink: "",
      phoneNumber: ""
    });

    const [alreadyAppliedTo, setAlreadyAppliedTo] = useState(false);


    const submitApplication = async (event: React.FormEvent) => {
      event.preventDefault();
      console.log("Application submitted for job id:", job.id);

      // submit application logic here
      try {
        const response = await fetch('http://localhost:3000/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            jobId: job?.id,
            candidateId: user?.id,
            fullName: applicationForm.fullName,
            email: applicationForm.email,
            cvLink: applicationForm.cvLink,
            phoneNumber: applicationForm.phoneNumber,
            status: 'APPLIED'
          })
        });

        if (response.ok) {
          console.log('Application submitted successfully');
        } else {
          const data = await response.json().catch(() => ({}));
          if (response.status === 400 && data.error?.includes('already applied')) {
            setAlreadyAppliedTo(true);
          } else {
            console.error('Failed to submit application');
          }
        }
      } 
      catch (error) {
        console.error('Error submitting application:', error);
      }

      setShowApplyForm(false);
    };

    useEffect(() => {
        const fetchJobDetails = async () => {
            try{
                const response = await fetch(`http://localhost:3000/jobs/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const jobInfo = await response.json();
                setJob(jobInfo);
                console.log('Full response:', jobInfo);
            }
            catch (error) {
                console.error('Error fetching job details:', error);
            }
            finally {
                setLoading(false);
            }
        };
        
        fetchJobDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!job) return <div>No job found</div>;

  return (
    <div>
      <button 
        onClick={() => navigate(-1)}
        className="border p-2 my-5 rounded-md">Back
      </button>
      <h1>{job.title}</h1>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.description}</p>

      {/* Buttons depending on role */}
      {user?.role === 'ADMIN' && (
        <div>
            <button>Edit Job</button>
            <button>View Applications</button>
            <button>Close Job</button>
        </div>
      )}

      {user?.role === 'CANDIDATE' && job.status === 'ACTIVE' && (
        <div>
            <button onClick={() => {
                setShowApplyForm(true);
                setAlreadyAppliedTo(false);
                console.log("Apply button clicked");
            }}
                className="border p-2 my-5 rounded-md bg-blue-600">
                Apply</button>
        </div>
      )}

        {alreadyAppliedTo && (
          <p>You have already applied for this job.</p>
        )}

        {showApplyForm && user?.role === 'CANDIDATE' && (
          <div className="border p-4 my-6 rounded-md">
            <h2>Application Form</h2>
            <form className="flex flex-col gap-4" onSubmit={submitApplication}>
                <p>Job id here: {job.id}</p>
                <input type="text" 
                    placeholder="Full Name" 
                    value={applicationForm.fullName} 
                    onChange={e => setApplicationForm({...applicationForm, fullName: e.target.value})} />
                <input type="email" 
                    placeholder="Email" 
                    value={applicationForm.email} 
                    onChange={e => setApplicationForm({...applicationForm, email: e.target.value})} />    
                <input type="text" 
                    placeholder="cv link" 
                    value={applicationForm.cvLink} 
                    onChange={e => setApplicationForm({...applicationForm, cvLink: e.target.value})} />
                <input type="text" 
                    placeholder="phone number" 
                    value={applicationForm.phoneNumber} 
                    onChange={e => setApplicationForm({...applicationForm, phoneNumber: e.target.value})} />
                <button type="submit">Submit Application</button>
                <button type="button" onClick={() => setShowApplyForm(false)}>Cancel</button>
            </form>
          </div>
        )}
    </div>
  )
}

export default JobDetails
