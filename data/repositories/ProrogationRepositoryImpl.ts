import { ProrogationRepositoryInterface } from '../../domain/repositories/ProrogationRepositoryInterface';
import { Prorogation, ProrogationResponse } from '../../types/Prorogation';
import { ApiService } from '../services/ApiService';

export class ProrogationRepositoryImpl implements ProrogationRepositoryInterface {
    private apiService: ApiService;

    constructor(apiService: ApiService) {
      this.apiService = apiService;
    }
  
    async createProrogationRequest(data: Prorogation,token: string) {
        const response = await this.apiService.post<ProrogationResponse>('/api/prorogation', data,token);
      return response
    }
    
}
