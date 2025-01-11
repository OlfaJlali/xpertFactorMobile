import { ApiService } from '../data/services/ApiService';
import { LocalStorageService } from '../data/storage/LocalStorageService';
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl';
import { SignInUseCase } from '../domain/usecases/SignInUseCase';
import { ContractRepositoryImpl } from '../data/repositories/ContractRepositoryImpl';
import { GetContractsUseCase } from '../domain/usecases/GetContractsUseCase';
import { UpdateUserProfileUseCase } from '../domain/usecases/UpdateUserProfileUseCase';
import { ChangePasswordUseCase } from '../domain/usecases/ChangePasswordUseCase';
import { FinancementRequestUseCase } from '../domain/usecases/FinancementRequestUseCase';
import { LitigeRequestUseCase } from '../domain/usecases/LitigeRequestUseCase';
import { ProrogationRequestUseCase } from '../domain/usecases/ProrogationRequestUseCase';
import { LimitRequestUseCase } from '../domain/usecases/LimitRequestUseCase';

import { FinancementRepositoryImpl } from '../data/repositories/FinancementRepositoryImpl';
import { BuyerRepositoryImpl } from '../data/repositories/BuyerRepositoryImpl';
import { GetBuyersUseCase } from '../domain/usecases/getBuyersUsecase';
import { DocumentRepositoryImpl } from '../data/repositories/DocumentRepositoryImpl';
import { GetDocumentsUseCase } from '../domain/usecases/getDocumentsUseCase';
import { LitigeRepositoryImpl } from '../data/repositories/LitigeRepositoryImpl';
import { ProrogationRepositoryImpl } from '../data/repositories/ProrogationRepositoryImpl';
import { LimitRepositoryImpl } from '../data/repositories/LimitRepositoryImpl';
import { RecoverPasswordUseCase } from '../domain/usecases/recoverPasswordUseCase';
import { VerifyOtpUseCase } from '../domain/usecases/verifyOtpUseCase';
import { CreateNewPasswordUseCase } from '../domain/usecases/createNewPasswordUseCase';
import { FirstSignInUseCase } from '../domain/usecases/firstSignInUseCase';
import {UpdateProfilePictureUseCase} from '../domain/usecases/updateProfilePictureUseCase';
// Initialize shared services
const apiService = new ApiService('https://shamash.onrender.com');
const localStorageService = new LocalStorageService();

// Auth dependencies
const authRepository = new AuthRepositoryImpl(apiService, localStorageService);
const signInUseCase = new SignInUseCase(authRepository);

// Contract dependencies
const contractRepository = new ContractRepositoryImpl(apiService);
const getContractsUseCase = new GetContractsUseCase(contractRepository);

// update profile dependencies
const updateUserProfileUseCase = new UpdateUserProfileUseCase(authRepository);
const changePasswordUseCase = new ChangePasswordUseCase(authRepository);
const recoverPasswordUseCase = new RecoverPasswordUseCase(authRepository);
const verifyOtpUseCase = new VerifyOtpUseCase(authRepository);
const createNewPasswordUseCase = new CreateNewPasswordUseCase(authRepository);
const firstSignInUseCase = new FirstSignInUseCase(authRepository)
const updateProfilePictureUseCase = new UpdateProfilePictureUseCase(authRepository)

// financement dependencies
const financementRepositiry = new FinancementRepositoryImpl(apiService)
const requestFinancementUseCase = new FinancementRequestUseCase(financementRepositiry)

// buyers dependencies
const buyersRepository = new BuyerRepositoryImpl(apiService)
const getBuyersUseCase = new GetBuyersUseCase(buyersRepository)

// documents dependencies
const documentsRepository = new DocumentRepositoryImpl(apiService)
const getDocumentsUseCase = new GetDocumentsUseCase(documentsRepository)

// litige dependencies
const litigeRepositiry = new LitigeRepositoryImpl(apiService)
const requestLitigeUseCase = new LitigeRequestUseCase(litigeRepositiry)

// prorogation dependencies
const prorogationRepositiry = new ProrogationRepositoryImpl(apiService)
const requestProrogationUseCase = new ProrogationRequestUseCase(prorogationRepositiry)

// limit dependencies
const limitRepositiry = new LimitRepositoryImpl(apiService)
const requestLimitUseCase = new LimitRequestUseCase(limitRepositiry)



// Export as a DI container
export const DIContainer = {
  signInUseCase,
  getContractsUseCase,
  updateUserProfileUseCase,
  changePasswordUseCase,
  requestFinancementUseCase,
  getBuyersUseCase,
  getDocumentsUseCase,
  requestLitigeUseCase,
  requestProrogationUseCase,
  requestLimitUseCase,
  recoverPasswordUseCase,
  verifyOtpUseCase,
  createNewPasswordUseCase,
  firstSignInUseCase,
  updateProfilePictureUseCase
};
