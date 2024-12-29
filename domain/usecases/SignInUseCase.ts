import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';
import { User } from '../../types/User';

export class SignInUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(identifier: string, password: string): Promise<User> {
    return await this.authRepository.signIn(identifier, password);
  }
}
