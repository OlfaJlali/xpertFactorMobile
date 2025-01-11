export interface Litige {
    documentId: string;
    type: string;
    litigeDate: Date;
    echeanceDate: Date;
  }
export interface LitigeResponse {
  message: string;
  request?: any
}