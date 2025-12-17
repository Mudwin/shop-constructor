'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_profile_completed: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await api.getProfile();
      setUser(userData);
    } catch (error) {
      console.error(`Failed to load user: ${error}`);
      api.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, otp: string) => {
    setIsLoading(true);

    try {
      const response = await api.confirmOTP(email, otp);
      api.setToken(response.access_token);

      setUser({
        id: response.user_id,
        email: response.email,
        is_profile_completed: response.is_profile_completed,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    window.location.href = '/auth/login';
  };

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
