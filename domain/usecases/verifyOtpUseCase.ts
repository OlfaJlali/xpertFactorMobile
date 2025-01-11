import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';

export class VerifyOtpUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(email: string,otp:number): Promise<void> {
    return await this.authRepository.verifyOtp(email,otp);
  }
}
