import { LitigeRepositoryInterface } from '../../domain/repositories/LitigeRepositoryInterface';
import { Litige, LitigeResponse } from '../../types/Litige';
import { ApiService } from '../services/ApiService';

export class LitigeRepositoryImpl implements LitigeRepositoryInterface {
    private apiService: ApiService;

    constructor(apiService: ApiService) {
      this.apiService = apiService;
    }
  
    async createLitigeRequest(data: Litige,token: string) {
        const response = await this.apiService.post<LitigeResponse>('/api/litige', data,token);
      return response
    }
    
}
