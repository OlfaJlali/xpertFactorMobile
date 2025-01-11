import { FinancementRepositoryInterface } from '../../domain/repositories/FinancementRepositoryInterface';
import { FinancementRequest, FinancementRequestResponse } from '../../types/Financement';
import { ApiService } from '../services/ApiService';

export class FinancementRepositoryImpl implements FinancementRepositoryInterface {
    private apiService: ApiService;

    constructor(apiService: ApiService) {
      this.apiService = apiService;
    }
  
    async createFinancementRequest(data: FinancementRequest,token: string) {
        const response = await this.apiService.post<FinancementRequestResponse>('/api/financement-request', data,token);
      return response
    }
    
}
