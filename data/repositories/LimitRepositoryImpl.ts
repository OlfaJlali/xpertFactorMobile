import { LimitRepositoryInterface } from '../../domain/repositories/LimitRepositoryInterface';
import { Limit, LimitResponse } from '../../types/Limit';
import { ApiService } from '../services/ApiService';

export class LimitRepositoryImpl implements LimitRepositoryInterface {
    private apiService: ApiService;

    constructor(apiService: ApiService) {
      this.apiService = apiService;
    }
  
    async createLimitRequest(data: Limit,token: string) {
        const response = await this.apiService.post<LimitResponse>('/api/limit', data,token);
      return response
    }
    
}
