import { useEffect, useState } from 'react';
import { Contract } from '../domain/entities/Contract';
import { transformData, TransformedDataItem } from '../domain/usecases/transformData';

export const useTransformData = (contracts: Contract[], currentIndex: number) => {
  const [details, setDetails] = useState<TransformedDataItem[]>([]);

  useEffect(() => {
    if (contracts.length > 0) {
      const transformedData = transformData(contracts[currentIndex]);
      setDetails(transformedData);
    }
  }, [contracts, currentIndex]);

  return details;
};
