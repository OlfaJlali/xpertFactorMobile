import { BuyerRepositoryInterface } from '../repositories/BuyerRepositoryInterface';
import { Buyer } from '../entities/Buyer';

export class GetBuyersUseCase {
  constructor(private buyerRepository: BuyerRepositoryInterface) {}

  async execute(identifier: string, page: number, limit: number, search: string): Promise<{
    buyers: Buyer[];
    currentPage: number;
    totalPages: number;
    totalBuyers: number;
  }> {
    return this.buyerRepository.getBuyers(identifier, page, limit, search);
  }
}
