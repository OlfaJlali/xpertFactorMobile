export interface FinancementRequest {
    type: string;
    document_amount: string;
    document_date: Date;
    financement_type: string;
  }
export interface FinancementRequestResponse {
  message: string;
  request?: any
}