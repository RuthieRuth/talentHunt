// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import JobListings from './JobListings';
import { useAuth } from '../hooks/useAuth';


export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, error } = useAuth();

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
      {/* <Navbar /> */}
      <h1 className='flex items-center justify-center mt-12'>DASHBOARD - main view</h1>
      <JobListings/>
    </div>
  );
}