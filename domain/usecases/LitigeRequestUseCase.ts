import { Litige, LitigeResponse } from '../../types/Litige';
import { LitigeRepositoryInterface } from '../repositories/LitigeRepositoryInterface';

export class LitigeRequestUseCase {
  private LitigeInterface: LitigeRepositoryInterface;

  constructor(LitigeInterface: LitigeRepositoryInterface) {
    this.LitigeInterface = LitigeInterface;
  }

  async execute(data: Litige,token:string): Promise<LitigeResponse> {
    return await this.LitigeInterface.createLitigeRequest(data,token);
  }
}
