import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, role: Role, token?: string) => void;
  logout: () => void;
  isLoading: boolean;
  addRefill: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('app_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Check for token in URL for NFC logic
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token && !savedUser) {
       // Mock login via token
       login('nfc-user@example.com', 'user', token);
    }

    setIsLoading(false);
  }, []);

  const login = (email: string, role: Role, token?: string) => {
    const mockUser: User = {
      id: token || Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      tokens: role === 'admin' ? 9999 : 100,
      refills: role === 'admin' ? 0 : 12,
      points: role === 'admin' ? 0 : 120,
      bottlesRegistered: [],
    };
    setUser(mockUser);
    localStorage.setItem('app_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app_user');
  };

  const addRefill = () => {
    if (user && user.role === 'user') {
      const updatedUser = {
        ...user,
        refills: user.refills + 1,
        points: user.points + 10
      };
      setUser(updatedUser);
      localStorage.setItem('app_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      isLoading,
      addRefill
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
