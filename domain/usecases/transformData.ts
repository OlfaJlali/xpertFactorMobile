import { Contract } from '../entities/Contract';

export interface TransformedDataItem {
  id: string;
  code: string;
  label: string;
  amount: string;
  color: string;
}

export const transformData = (data: Contract): TransformedDataItem[] => {
    const labels: { [key: string]: string } = {
        currentInvoices: 'Current Invoices',
      guaranteeFund: 'Guarantee Fund',
      overshootingBuyerLimit: 'Overshooting Buyer Limit',
      reserveFund: 'Reserve Fund',
    };
    const getColor = (value: number): string => {
        return value > 0 ? 'green' : 'red';
      };
    
    return Object.keys(labels).map((key, index) => {

      // Ensure that key is one of the known keys from Contract
      const typedKey = key as keyof Contract;
  
      // Skip non-relevant fields
      if (typedKey === 'contractId' || typedKey === 'amount') return null;
  
      // Sum of values for that key
      const amount = data[typedKey];
      return {
        code: typedKey.charAt(0).toUpperCase(), // First letter, capitalized
        label: labels[typedKey],                // Map field name to label
        amount: amount.toFixed(2),                         // Sum of values
        color: getColor(data[typedKey]),     // Get color based on value
        id: `${typedKey}-${index}`,
      };
    }).filter((item): item is TransformedDataItem => item !== null); // Type guard to filter nulls
  };
