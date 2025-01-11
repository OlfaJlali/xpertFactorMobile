import { Buyer } from '../entities/Buyer';

export interface BuyerRepositoryInterface {
  getBuyers(identifier: string, page: number, limit: number, search: string): Promise<{
    buyers: Buyer[];
    currentPage: number;
    totalPages: number;
    totalBuyers: number;
  }>;
}
