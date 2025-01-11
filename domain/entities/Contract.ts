export interface Contract {
    contractId: string;
    amount: number;
    currentInvoices: number;
    guaranteeFund: number;
    reserveFund: number;
    overshootingBuyerLimit: number;
  }
  