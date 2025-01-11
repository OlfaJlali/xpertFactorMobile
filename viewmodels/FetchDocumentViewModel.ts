import { useState, useCallback } from 'react';
import { DIContainer } from '../di/container';
import { Document } from '../domain/entities/document';

interface FetchDocumentsResult {
  documents: Document[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
}

export function useFetchDocuments() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
  const fetchDocuments = useCallback(async ( page: number, search: string,id?: string) => {
    setLoading(true);
    setError(null);

    try {
      const { documents: fetchedDocuments, currentPage, totalPages, totalDocuments }: FetchDocumentsResult =
        await DIContainer.getDocumentsUseCase.execute(id || '', page, 5, search);

      setDocuments(prevDocuments => (page === 1 ? fetchedDocuments : [...prevDocuments, ...fetchedDocuments]));
      setPagination({ currentPage, totalPages, totalDocuments });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { documents, pagination, fetchDocuments, loading, error };
}
