import { FinancementRequest, FinancementRequestResponse } from '../../types/Financement';
import { FinancementRepositoryInterface } from '../repositories/FinancementRepositoryInterface';

export class FinancementRequestUseCase {
  private financementRequestInterface: FinancementRepositoryInterface;

  constructor(financementRequestInterface: FinancementRepositoryInterface) {
    this.financementRequestInterface = financementRequestInterface;
  }

  async execute(data: FinancementRequest,token:string): Promise<FinancementRequestResponse> {
    return await this.financementRequestInterface.createFinancementRequest(data,token);
  }
}
