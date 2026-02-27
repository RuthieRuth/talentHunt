import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

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
  id: string;
  jobId: string;
  candidateId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  cvLink: string;
  status: string;
  createdAt: string;
}

const AdminJobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false)
  //changes to form during edting: 
  const [newDetails, setNewDetails] = useState({
    id: "",
    company: "",
    title:"",
    location: "",
    salary: "",
    description: "" })

  const editJobPost = () => {
    if (job) {
      setNewDetails({ id: job.id, company: job.company, title: job.title, location: job.location || '', salary: job.salary || '', description: job.description });
    }
    setIsEditing(true);
  };

  const handleChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewDetails(values => ({...values, [name]: value}));
  });

  const saveJobPost = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('authToken')}` },
      body: JSON.stringify(newDetails)
    });
    setJob(prev => prev ? { ...prev, ...newDetails } : null);
    setIsEditing(false);
  };

  const closeJobPost = async() => {
    console.log("close button clicked")
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`, {
      method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ status: 'CLOSED' })
    });
    setJob(prev => prev ? { ...prev, status: 'CLOSED' } : null);
  }

  const deleteJobPost = async() => {
    console.log("delete button clicked")
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`, {
      method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
    });
    navigate(-1);
  }

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/jobs/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const jobData = await response.json();
        console.log('Job details:', jobData);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/applications/job/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const applicantsData = await response.json();
        console.log('Applicants:', applicantsData);
        setApplicants(applicantsData);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
      fetchApplicants();
    }
  }, [id]);

  if (loading) return <div className="m-5">Loading...</div>;
  if (!job) return <div className="m-5">No job found</div>;

  return (
    <div className="m-5">
      <button
        onClick={() => navigate(-1)}
        className="border p-2 mb-5 rounded-md hover:bg-gray-100"> Back
      </button>

      {/* Job Details Section */}
      <div className="border p-6 rounded-md mb-6">
        <h1 className="text-2xl font-bold mb-4">
          {isEditing ? <input name="title" value={newDetails.title} onChange={handleChange} /> :job.title}
        </h1>
        <div className="space-y-2">
          <p><span className="font-medium">Company:</span> {isEditing ? <input name="company" value={newDetails.company} onChange={handleChange} /> : job.company}</p>
          <p><span className="font-medium">Location:</span> {isEditing ? <input name="location" value={newDetails.location} onChange={handleChange} /> : job.location || 'Not specified'}</p>
          <p><span className="font-medium">Salary:</span> {isEditing ? <input name="salary" value={newDetails.salary} onChange={handleChange} /> : job.salary || 'Not specified'}</p>
          <p><span className="font-medium">Status:</span> {job.status}</p>
          <p><span className="font-medium">Description:</span> {isEditing ? <input name="description" value={newDetails.description} onChange={handleChange} /> : job.description}</p>
        </div>

        {/* Admin Actions */}
        <div className="flex gap-4 mt-6">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={isEditing ? saveJobPost : editJobPost}>
            {isEditing ? 'Save' : 'Edit Job'}
          </button>
          {job.status === 'ACTIVE' ? 
          (<button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeJobPost}>
              Close Job
            </button>
          ):(<button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeJobPost}>
              Closed
            </button>)}
          <button 
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={deleteJobPost}>
              Delete Job
            </button>
        </div>
      </div>

      {/* Applicants Section */}
      <div className="border p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">
          Applicants ({applicants.length})
        </h2>

        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants yet</p>
        ) : (
          <div className="space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="border p-4 rounded-md hover:bg-gray-50">
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {applicant.fullName}</p>
                  <p><span className="font-medium">Email:</span> {applicant.email}</p>
                  <p><span className="font-medium">Phone:</span> {applicant.phoneNumber}</p>
                  <p><span className="font-medium">CV:</span> <a href={applicant.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View CV</a></p>
                  <p><span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      applicant.status === 'ACCEPTED' ? 'bg-green-200' :
                      applicant.status === 'REJECTED' ? 'bg-red-200' :
                      'bg-yellow-200'
                    }`}>
                      {applicant.status}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminJobDetail
