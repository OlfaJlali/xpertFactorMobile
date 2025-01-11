import { useState } from 'react';
import { DIContainer } from '../di/container';

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const changePassword = async (oldPassword: string, newPassword: string  ) => {
    setLoading(true);
    try {
      await DIContainer.changePasswordUseCase.execute(oldPassword, newPassword);
      setErrorMessage('');
      setIsError(false);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, isError, changePassword };
};
