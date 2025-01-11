import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';
import { User } from '../../types/User';

export interface UpdateProfileParams {
  email: string;
  phoneNumber: string;
}

export class UpdateUserProfileUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(params: UpdateProfileParams,token:string): Promise<User> {
    return await this.authRepository.updateProfile(params,token);
  }
}
