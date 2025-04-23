import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { authService } from '@/lib/aws/auth';
import { User, UserRole } from '@/types';

// Define the shape of our authentication context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
  hasRole: () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap our app and provide the auth context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // For local development, we'll start with a default admin user
  const defaultUser: User = {
    id: 'admin',
    username: 'admin',
    email: 'admin@assistmenow.org',
    role: UserRole.ADMIN,
    firstName: 'Admin',
    lastName: 'User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [user, setUser] = useState<User | null>(defaultUser);
  const [isLoading, setIsLoading] = useState(false);

  // Sign in function - simplified for local development
  const signIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // For local development, we'll just check if the username and password match our mock users
      if ((username === 'admin' && password === 'password') ||
          (username === 'staff' && password === 'password')) {

        const role = username === 'admin' ? UserRole.ADMIN : UserRole.STAFF;
        const newUser: User = {
          id: username,
          username,
          email: `${username}@assistmenow.org`,
          role,
          firstName: username.charAt(0).toUpperCase() + username.slice(1),
          lastName: 'User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setUser(newUser);
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setIsLoading(true);
    try {
      // For local development, just reset to the default user
      setUser(defaultUser);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a specific role
  const hasRole = (role: UserRole) => {
    return user?.role === role;
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
    hasRole,
  }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
