import React, { createContext, useState, useEffect } from 'react';
import { loginUser as loginApi } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to restore user from token on mount
    const token = localStorage.getItem('access');
    if (token) {
      // Decode token to get user info (basic implementation)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: payload.user_id,
          email: payload.email || '',
          username: payload.username || '',
          role: payload.role || '',
        });
      } catch (e) {
        // If token is invalid, clear it
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    // JWT login returns { access, refresh }
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    
    // Fetch user info from /auth/me/ endpoint
    try {
      const { getCurrentUser } = await import('../api/users.api');
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (e) {
      // Fallback if fetch fails - decode token
      try {
        const payload = JSON.parse(atob(data.access.split('.')[1]));
        setUser({
          id: payload.user_id,
          email: payload.email || email,
          username: payload.username || '',
          role: payload.role || '',
        });
      } catch (err) {
        setUser({ email, role: '' });
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
