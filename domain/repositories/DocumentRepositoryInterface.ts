import { Document } from '../entities/document';

export interface DocumentRepositoryInterface {
  getDocuments(buyerId: string, page: number, limit: number, search: string): Promise<{
    documents: Document[];
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
  }>;
}
