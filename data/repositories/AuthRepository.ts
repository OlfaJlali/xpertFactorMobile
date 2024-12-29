import { AuthRepositoryInterface } from '../../domain/repositories/AuthRepositoryInterface';
import { ApiService } from '../services/ApiService';
import { LocalStorageService } from '../storage/LocalStorageService';
import { User, SignInResponse } from '../../types/User';

export class AuthRepository implements AuthRepositoryInterface {
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
    };

    await this.localStorageService.save('user', userData);
    return userData;
  }
}
