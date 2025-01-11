import { BuyerRepositoryInterface } from '../../domain/repositories/BuyerRepositoryInterface';
import { ApiService } from '../services/ApiService';
import { Buyer } from '../../domain/entities/Buyer';
import { BuyersApiResponse, Pagination } from '../../types/Buyer'; // Assuming you've defined types in a separate file

export class BuyerRepositoryImpl implements BuyerRepositoryInterface {
    constructor(private apiService: ApiService) {}

    async getBuyers(identifier: string, page: number, limit: number, search: string): Promise<{
        buyers: Buyer[];
        currentPage: number;
        totalPages: number;
        totalBuyers: number;
    }> {
        try {
            const response = await this.apiService.get<BuyersApiResponse>('/api/buyers', undefined, {
                identifier, 
                page, 
                limit, 
                search
            });
            const { data, pagination } = response.data;  
            if (Array.isArray(data)) {
                const buyers = data.map(
                    (buyerData) => new Buyer(buyerData._id, buyerData.firstname, buyerData.lastname, buyerData.picture)
                );

                return {
                    buyers,
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalBuyers: pagination.totalBuyers,
                };
            } else {
                throw new Error('Expected data to be an array of buyers');
            }
        } catch (error) {
            console.error('Error fetching buyers:', error);
            throw new Error('Failed to fetch buyers');
        }
    }
}
