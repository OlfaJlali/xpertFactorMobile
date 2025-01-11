import { Prorogation, ProrogationResponse } from '../../types/Prorogation';
import { ProrogationRepositoryInterface } from '../repositories/ProrogationRepositoryInterface';

export class ProrogationRequestUseCase {
  private ProrogationInterface: ProrogationRepositoryInterface;

  constructor(ProrogationInterface: ProrogationRepositoryInterface) {
    this.ProrogationInterface = ProrogationInterface;
  }

  async execute(data: Prorogation,token:string): Promise<ProrogationResponse> {
    return await this.ProrogationInterface.createProrogationRequest(data,token);
  }
}
