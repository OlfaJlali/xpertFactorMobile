import { ApiService } from '../data/services/ApiService';
import { LocalStorageService } from '../data/storage/LocalStorageService';
import { AuthRepository } from '../data/repositories/AuthRepository';
import { SignInUseCase } from '../domain/usecases/SignInUseCase';

const apiService = new ApiService('https://shamash.onrender.com');
const localStorageService = new LocalStorageService();
const authRepository = new AuthRepository(apiService, localStorageService);
const signInUseCase = new SignInUseCase(authRepository);

export const DIContainer = {
  signInUseCase,
};
