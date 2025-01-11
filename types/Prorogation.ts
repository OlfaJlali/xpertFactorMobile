export interface Prorogation {
    documentId: string;
    type: string;
    dueDate: Date;
    motif: String;
    echeanceDate: Date;
  }
export interface ProrogationResponse {
  message: string;
  request?: any
}