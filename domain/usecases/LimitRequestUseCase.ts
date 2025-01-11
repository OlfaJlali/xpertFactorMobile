import { Limit, LimitResponse } from '../../types/Limit';
import { LimitRepositoryInterface } from '../repositories/LimitRepositoryInterface';

export class LimitRequestUseCase {
  private LimitInterface: LimitRepositoryInterface;

  constructor(LimitInterface: LimitRepositoryInterface) {
    this.LimitInterface = LimitInterface;
  }

  async execute(data: Limit,token:string): Promise<LimitResponse> {
    return await this.LimitInterface.createLimitRequest(data,token);
  }
}
