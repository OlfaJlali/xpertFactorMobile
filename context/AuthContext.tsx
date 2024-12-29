import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocalStorageService } from '../data/storage/LocalStorageService';
import { User } from '../domain/entities/User';

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean; // New loading state
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode; storageService: LocalStorageService }> = ({ children, storageService }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Default to true

  useEffect(() => {
    const checkAuth = async () => {
      const user = await storageService.get<User>('user');
      setIsAuthenticated(!!user?.token);
      setIsLoading(false); // Set loading to false after auth check
    };

    checkAuth();
  }, [storageService]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
