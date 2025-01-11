import { UpdateProfilePictureResponse, User } from '../../types/User';
import { UpdateProfileParams } from '../usecases/UpdateUserProfileUseCase';

export interface AuthRepositoryInterface {
  signIn(identifier: string, password: string): Promise<User>;
  updateProfile(params: UpdateProfileParams, token: string): Promise<User>;
  changePassword(oldPassword: string, newPassword: string): Promise<void>;
  recoverPassword(email:string): Promise<void>;
  verifyOtp(email:string,otp:number): Promise<void>;
  createNewPassword(email:string, newPassword:string) : Promise<void>;
  firstSignIn(email:string, newPassword:string) : Promise<void>;
  updateProfilePicture(identifier:string,imageUri:string) : Promise<UpdateProfilePictureResponse>



}
