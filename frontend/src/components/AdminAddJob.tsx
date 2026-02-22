import { useState } from 'react';
import { useNavigate } from 'react-router'

const AdminAddJob = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const addNewJob = async () => {
        console.log('add new job', details);
        try{
            const response = await fetch('http://localhost:3000/jobs',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details)
            });

            if(response.ok) {
                const newJob = await response.json();
                console.log('New job created:', newJob);
                navigate('/AdminDashboard');
            } else {
                console.error('Failed to create job:', response.statusText);
            }
        }
        catch(error) {
            console.error('Error adding new job:', error);
        }
    };

  return (
    <div className='m-5'>
        <button 
            onClick={() => navigate(-1)}
            className="border p-2 my-5 rounded-md">Back
        </button>

        <h1>Add New Job</h1>
        <form className="flex flex-col max-w-md"
             onSubmit={(e) => {
                e.preventDefault();
                addNewJob();
             }}>
            <input type="text" placeholder="Job Title" className="border p-2 mb-4 w-full" value={details.title} onChange={(e) => setDetails({...details, title: e.target.value})} required/>
            <input type="text" placeholder="Company" className="border p-2 mb-4 w-full" value={details.company} onChange={(e) => setDetails({...details, company: e.target.value})} required/>
            <input type="text" placeholder="Location" className="border p-2 mb-4 w-full" value={details.location} onChange={(e) => setDetails({...details, location: e.target.value})} />
            <input type="text" placeholder="Salary" className="border p-2 mb-4 w-full" value={details.salary} onChange={(e) => setDetails({...details, salary: e.target.value})} />
            <textarea placeholder="Job Description" className="border p-2 mb-4 w-full h-32" value={details.description} onChange={(e) => setDetails({...details, description: e.target.value})} required ></textarea>
            <button 
                type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Create Job
            </button>
        </form>
    </div>
  )
}

export default AdminAddJob