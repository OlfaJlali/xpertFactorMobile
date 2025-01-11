import { useState, useEffect } from 'react';
import { LocalStorageService } from '../data/storage/LocalStorageService';
import { User } from '../domain/entities/User';

export const useGetCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    const storageService = new LocalStorageService();
    try {
      const savedUser = await storageService.get<User>('user');
      setUser(savedUser || null);
      return savedUser
    } catch (error) {
      console.error('Error fetching user from storage:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading , setUser , fetchUser };
};
