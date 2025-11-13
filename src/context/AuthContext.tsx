import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'admin' | 'student' | 'teacher' | 'parent') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const studentLoggedIn = sessionStorage.getItem('studentLoggedIn');
  const teacherLoggedIn = sessionStorage.getItem('teacherLoggedIn');
  const parentLoggedIn = sessionStorage.getItem('parentLoggedIn');
    
    if (adminLoggedIn) {
      const email = sessionStorage.getItem('adminEmail') || '';
      setUser({ email, role: 'admin', loggedIn: true });
    } else if (studentLoggedIn) {
      const email = sessionStorage.getItem('studentEmail') || '';
      setUser({ email, role: 'student', loggedIn: true });
    } else if (teacherLoggedIn) {
      const email = sessionStorage.getItem('teacherEmail') || '';
      setUser({ email, role: 'teacher', loggedIn: true });
    } else if (parentLoggedIn) {
      const email = sessionStorage.getItem('parentEmail') || '';
      setUser({ email, role: 'parent', loggedIn: true });
    }
  }, []);

  const login = (email: string, role: 'admin' | 'student' | 'teacher' | 'parent') => {
    sessionStorage.setItem(`${role}LoggedIn`, 'true');
    sessionStorage.setItem(`${role}Email`, email);
    setUser({ email, role, loggedIn: true });
  };

  const logout = () => {
    if (user) {
      sessionStorage.removeItem(`${user.role}LoggedIn`);
      sessionStorage.removeItem(`${user.role}Email`);
    }
    setUser(null);
  };

  const isAuthenticated = user !== null && user.loggedIn;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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
