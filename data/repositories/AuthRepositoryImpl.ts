import { AuthRepositoryInterface } from '../../domain/repositories/AuthRepositoryInterface';
import { ApiService } from '../services/ApiService';
import { LocalStorageService } from '../storage/LocalStorageService';
import { User, SignInResponse , RecoverPasswordResponse, UpdateProfilePictureResponse } from '../../types/User';
import { UpdateProfileParams } from '../../domain/usecases/UpdateUserProfileUseCase';
import mime from "mime";
import { ContentType } from '@intercom/intercom-react-native';

interface UserResponse  {
  user : User
  message : string
}


export class AuthRepositoryImpl implements AuthRepositoryInterface {
  private apiService: ApiService;
  private localStorageService: LocalStorageService;


  constructor(apiService: ApiService, localStorageService: LocalStorageService) {
    this.apiService = apiService;
    this.localStorageService = localStorageService;
  }

  async signIn(identifier: string, password: string): Promise<User> {
    const response = await this.apiService.post<SignInResponse>('/api/signin', { identifier, password });
    const userData: User = {
      token: response.token,
      identifier: response.user.identifier,
      name: response.user.name || '',
      email: response.user.email,
      phoneNumber: response.user.phoneNumber || '',
      firstlogin: response.user.firstlogin,
      profilePicture: response.user.profilePicture
    };
    await this.localStorageService.save('user', userData);
    return userData;
  };
  async updateProfile(params: UpdateProfileParams, token: string): Promise<User> {
    const updatedUser = await this.apiService.patch<UserResponse>('/api/edit-profile', params, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(updatedUser)
    const currentUser = await this.localStorageService.get<User>('user');
    if (currentUser) {
      const newUserData = { ...currentUser, ...updatedUser.user };
      await this.localStorageService.save('user', newUserData);
    }
    return updatedUser.user;
  }
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    try {
      const currentUser = await this.localStorageService.get<User>('user');
      const token = currentUser?.token;
      if (!token) {
        throw new Error('Authentication token is missing.');
      }
      const response = await this.apiService.post<{ message: string }>(
        '/api/changepassword',
        { oldPassword, newPassword },
        token
      );
        console.log(response.message || 'Password changed successfully.');
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || 'Unexpected error occurred.';
        switch (statusCode) {
          case 400:
            throw new Error('All fields are required. Please check your input.');
          case 401:
            throw new Error('Invalid credentials. Please check your old password.');
          case 404:
            throw new Error('User not found.');
          case 500:
            throw new Error('Internal server error. Please try again later.');
          default:
            throw new Error(errorMessage);
        }
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      } else {
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  }
  async recoverPassword(email: string): Promise<void> {
    try {
      const response = await this.apiService.post<RecoverPasswordResponse>('/api/recover-password', { email });
      console.log(response,'response')
      if (response.message === 'OTP sent to email') {
        console.log('OTP sent to email successfully.');
      } else {
        console.error('Failed to  send OTP:', response.message);
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Error during recoverPassword:', error.message);
      throw error;
    }
  }
  async verifyOtp(email: string, otp:number): Promise<void> {
    try {
      const response = await this.apiService.post<RecoverPasswordResponse>('/api/verify-otp', { email,otp });
      console.log(response,'response')
      if (response.message === 'OTP is valid') {
        console.log('OTP is valid');
      } else {
        console.error('OTP invalid');
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Error during verify otp:', error.message);
      throw error;
    }
  }
  async createNewPassword(email: string, newPassword:string): Promise<void> {
    try {
      const response = await this.apiService.post<RecoverPasswordResponse>('/api/create-password', { email,newPassword });
      console.log(response,'response')
      if (response.message === 'Password changed successfully') {
        console.log('Password changed successfully');
      } else {
        console.error('error in the server');
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Error during change password:', error.message);
      throw error;
    }
  }
  async firstSignIn(email: string, newPassword:string): Promise<void> {
    try {
      const response = await this.apiService.post<RecoverPasswordResponse>('/api/first-login', { email,newPassword });
      console.log(response,'response')
      if (response.message === 'Password changed successfully') {
        console.log('Password changed successfully');
      } else {
        console.error('error in the server');
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.error('Error during change password:', error.message);
      throw error;
    }
  }
  
  
  async updateProfilePicture(identifier: string, imageUri: string): Promise<UpdateProfilePictureResponse> {
    const formData = new FormData();
    const newImageUri =  "file:///" + imageUri.split("file:/").join("");
    formData.append('profilePicture', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append('identifier', identifier);

    const response = await this.apiService.post<UpdateProfilePictureResponse>('/api/update-profile-picture', formData);
    console.log(response, 'response')
    return response
  }



  
      


}
