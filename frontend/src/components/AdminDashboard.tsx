// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
//import JobListings from './JobListings';
import { useAuth } from '../hooks/useAuth';
import AdminJobListings from './AdminJobListings';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading, error } = useAuth();

  const addNewJob = () => {
    navigate('/admin/addJob');
  }

  useEffect(() => {
    // not logged in, no user
    if(!loading && !user) {
      navigate('/Login');
    }
  }, [loading, user, navigate]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div>
      <h1 className='flex items-center justify-center mt-12'>ADMIN DASHBOARD - main view</h1>
      <button 
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-5"
        onClick={addNewJob}>
          Add New Job</button>
      {<AdminJobListings />}
    </div>
  );
}