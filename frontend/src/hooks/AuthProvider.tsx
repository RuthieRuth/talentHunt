import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./useAuth";
import type { User } from "./useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const tokenFromUrl = params.get('token');

            if (tokenFromUrl) {
                localStorage.setItem('authToken', tokenFromUrl);
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            const token = tokenFromUrl || localStorage.getItem('authToken');

            if (!token) {
                setLoading(false);
                setError(null);
                setUser(null);
                return;
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/google/userinfo`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log('Authenticated user data:', userData);
                    setUser(userData);
                    setError(null);
                } else {
                    localStorage.removeItem('authToken');
                    setUser(null);
                    setError('Failed to authenticate');
                }
            } catch (error) {
                console.error('Error during authentication check:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        navigate('/Login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
