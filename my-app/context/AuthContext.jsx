// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthLoading(false);
        return { success: false, error: data.error || 'Login failed' };
      }

      const { token, user } = data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      setAuthLoading(false);

      return { success: true, user };
    } catch (error) {
      setAuthLoading(false);
      return { success: false, error: error.message || 'Something went wrong' };
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      const response = await fetch('/api/auth/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } finally {
      setAuthLoading(false);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated,
    authLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;