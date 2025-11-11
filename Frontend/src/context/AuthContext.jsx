import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from '../api/apiService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  const login = async ({ email, password }) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;
    setToken(token); setUser(user);
    localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(user));
  };

  const register = async ({ name, email, password }) => {
    const res = await api.post('/auth/register', { name, email, password });
    const { token, user } = res.data;
    setToken(token); setUser(user);
    localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null); setUser(null);
    localStorage.removeItem('token'); localStorage.removeItem('user');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
