import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiGet, apiPost, setCsrfToken } from '../api/client';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const data = await apiGet('/method/hr_ess_api.api.permissions.get_logged_user');
      // Returns a string (user email) or "Guest"
      if (data && data.message && data.message !== 'Guest') {
        setUser(data.message);
        // Fetch and set CSRF token for authenticated user
        const csrfData = await apiGet('/method/hr_ess_api.api.permissions.get_csrf_token');
        if (csrfData && csrfData.message) {
          setCsrfToken(csrfData.message);
        }
      } else {
        setUser(null);
        setCsrfToken('');
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      await apiPost('/method/login', { usr: email, pwd: password });
      await checkSession();
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiPost('/method/logout');
    } catch (error) {
      console.warn('Server session already cleared or socket closed:', error.message);
    } finally {
      setUser(null);
      setCsrfToken('');
      window.location.href = '/signin';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
