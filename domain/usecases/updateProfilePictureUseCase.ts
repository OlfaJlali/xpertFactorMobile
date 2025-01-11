import { UpdateProfilePictureResponse } from '../../types/User';
import { AuthRepositoryInterface } from '../repositories/AuthRepositoryInterface';

export class UpdateProfilePictureUseCase {
  private authRepository: AuthRepositoryInterface;

  constructor(authRepository: AuthRepositoryInterface) {
    this.authRepository = authRepository;
  }

  async execute(identifier: string, imageUri: string): Promise<UpdateProfilePictureResponse> {
    return await this.authRepository.updateProfilePicture(identifier, imageUri);
  }
}
