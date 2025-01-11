import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';

export class RecoverPasswordUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(email: string): Promise<void> {
    return await this.authRepository.recoverPassword(email);
  }
}
