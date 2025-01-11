import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';

export class CreateNewPasswordUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(email: string,newPassword:string): Promise<void> {
    return await this.authRepository.createNewPassword(email,newPassword);
  }
}
