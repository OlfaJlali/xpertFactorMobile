  
  
export interface BuyerApiResponse {
    _id: string;
    firstname: string;
    lastname: string;
    picture: string;
  }
  
  export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalBuyers: number;
    pageSize: number;
  }
  
  export interface BuyersApiResponse {
    data: BuyerApiResponse[]; 
    pagination: Pagination;
  }
  
  