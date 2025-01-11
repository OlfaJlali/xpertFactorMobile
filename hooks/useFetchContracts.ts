import { useEffect, useState } from 'react';
import { LocalStorageService } from '../data/storage/LocalStorageService';
import { DIContainer } from '../di/container';
import { Contract } from '../domain/entities/Contract';
import { User } from '../domain/entities/User';

export const useFetchContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const storageService = new LocalStorageService();
        const user = await storageService.get<User>('user');
        if (!user || !user.identifier) {
          console.error('No user or user identifier found in storage.');
          return;
        }
        const contracts = await DIContainer.getContractsUseCase.execute(user.identifier, user.token);
        setContracts(contracts);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  return { contracts, loading };
};
