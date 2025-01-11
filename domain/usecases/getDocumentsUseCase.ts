import { DocumentRepositoryInterface } from '../repositories/DocumentRepositoryInterface';
import { Document } from '../entities/document';

export class GetDocumentsUseCase {
  constructor(private documentRepository: DocumentRepositoryInterface) {}

  async execute(userId: string, page: number, limit: number, search: string): Promise<{
    documents: Document[];
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
  }> {
    return this.documentRepository.getDocuments(userId, page, limit, search);
  }
}
