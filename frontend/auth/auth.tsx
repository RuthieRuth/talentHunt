// src/auth/callback.tsx
import { useEffect } from 'react';

export default function AuthCallback() {
  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      // Store token
      localStorage.setItem('authToken', token);
      
      // Redirect to dashboard using vanilla JS
      window.location.href = '/Dashboard';
    } else {
      // No token = error
      window.location.href = '/Login?error=no_token';
    }
  }, []);

  return (
    <div>
      <p>Completing sign in...</p>
    </div>
  );
}