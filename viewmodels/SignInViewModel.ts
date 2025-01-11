import { useState } from 'react';
import { SignInUseCase } from '../domain/usecases/SignInUseCase';
import { User } from '../types/User';

export function useSignInViewModel(signInUseCase: SignInUseCase) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (identifier: string, password: string): Promise<User | null> => {
    setLoading(true);
    setError(null);

    try {
      const user = await signInUseCase.execute(identifier, password);
      setLoading(false);
      return user;
    } catch (err: any) {
      if(err?.status === 401){
        setError('unvalid credentials please verify your identifier or password');
      }else {
        setError(err.message || 'Unknown error');
      }
      setLoading(false);
      return null;
    }
  };

  return { signIn, loading, error };
}
