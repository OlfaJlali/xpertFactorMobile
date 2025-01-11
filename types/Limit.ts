export interface Limit {
    buyerId: string;
    requestDate: Date;
    assurenceLimit: Number;
    financementLimit: Number;
    limitDate: Date;
    lastRequestDate:Date;
    requestedDelay: Number;
    type: string
  }
export interface LimitResponse {
  message: string;
  request?: any
}