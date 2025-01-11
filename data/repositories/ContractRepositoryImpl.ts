import { ContractRepositoryInterface } from '../../domain/repositories/ContractRepositoryInterface';
import { Contract } from '../../domain/entities/Contract';
import { ApiService } from '../services/ApiService';

export class ContractRepositoryImpl implements ContractRepositoryInterface {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getContracts(identifier: string, token: string): Promise<Contract[]> {
    const response = await this.apiService.get<Contract[]>(`/api/contracts?userId=${identifier}`,token);

    return response.data as Contract[];
  }
  
}
