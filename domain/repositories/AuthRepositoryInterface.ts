import { User } from '../../types/User';

export interface AuthRepositoryInterface {
  signIn(identifier: string, password: string): Promise<User>;
}
