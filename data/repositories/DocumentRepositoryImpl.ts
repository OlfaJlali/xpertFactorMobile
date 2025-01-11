import { DocumentRepositoryInterface } from '../../domain/repositories/DocumentRepositoryInterface';
import { ApiService } from '../services/ApiService';
import { DocumentsApiResponse, Pagination } from '../../types/Document'; // Assuming you've defined types in a separate file
import { Document } from '../../domain/entities/document';

export class DocumentRepositoryImpl implements DocumentRepositoryInterface {
    constructor(private apiService: ApiService) {}
    async getDocuments(buyerId: string, page: number, limit: number, search: string): Promise<{
        documents: Document[];
        currentPage: number;
        totalPages: number;
        totalDocuments: number;
    }> {
        try {
            const response = await this.apiService.get<DocumentsApiResponse>('/api/documents', undefined, {
                buyerId, 
                page, 
                limit, 
                search
            });
            const { data, pagination } = response.data;  
            if (Array.isArray(data)) {
                const documents = data.map(
                    (DocumentData) => new Document(DocumentData._id, DocumentData.buyerId, DocumentData.number, DocumentData.date,DocumentData.ttc,DocumentData.ouvert,DocumentData.retenu )
                );

                return {
                    documents,
                    currentPage: pagination.currentPage,
                    totalPages: pagination.totalPages,
                    totalDocuments: pagination.totalDocuments,
                };
            } else {
                throw new Error('Expected data to be an array of documents');
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
            throw new Error('Failed to fetch documents');
        }
    }
}
