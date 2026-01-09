'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_profile_completed?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = api.getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await api.getProfile();
        setUser({
          id: userData.id,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
          is_profile_completed: userData.is_profile_completed,
        });
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
        api.clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, otp: string) => {
    setIsLoading(true);

    try {
      const response = await api.confirmOTP(email, otp);

      setUser({
        id: response.user_id,
        email: response.email,
        is_profile_completed: response.is_profile_completed,
      });
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    } finally {
      api.clearToken();
      setUser(null);
      window.location.href = '/auth/login';
    }
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
