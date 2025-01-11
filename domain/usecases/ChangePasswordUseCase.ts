import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';

export class ChangePasswordUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    if (!oldPassword || !newPassword) {
      throw new Error('Both old and new passwords are required.');
    }

    await this.authRepository.changePassword(oldPassword, newPassword);
  }
}
