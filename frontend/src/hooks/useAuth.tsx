import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth =  async () => {
        // Check if there's a token in URL (from Google login)
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get('token');
       
        if (tokenFromUrl) {
        // Store token
        localStorage.setItem('authToken', tokenFromUrl);
        // clean URL?
        window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Get token (either from URL or localStorage)
        const token = tokenFromUrl || localStorage.getItem('authToken');

        // Not logged in , no token - redirect to login
        if (!token) {
        setLoading(false);
        setError(null);
        setUser(null);
        return;
        }

            try {
                const response = await fetch('http://localhost:3000/auth/google/userinfo', {
                    headers: { Authorization: `Bearer ${token }` }
                    });
                if (response.ok) {
                    const userData = await response.json();
                    console.log('Authenticated user data:', userData);
                    setUser (userData);
                    setError (null);
                } 
                else {
                    localStorage.removeItem('authToken');
                    setUser(null);
                    setError('Failed to authenticate');
                }
            }
            catch (error) {
                console.error('Error during authentication check:', error);
            } finally {
                    setLoading (false);
            }
        };

        checkAuth();
    }, []);

        const logout = () => {
           localStorage.removeItem('authToken');
           setUser(null);
           navigate('/Login');
       };
    

    return { user, loading, error , logout };
}