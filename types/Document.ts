  
  
export interface DocumentApiResponse {
    _id: string;
    buyerId: string;
    number: Number;
    date: Date,
    ttc: Number;
    ouvert:Number;
    retenu:Number;
  }
  
  export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
    pageSize: number;
  }
  
  export interface DocumentsApiResponse {
    data: DocumentApiResponse[]; 
    pagination: Pagination;
  }
  
  