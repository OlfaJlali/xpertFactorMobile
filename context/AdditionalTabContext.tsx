import React, { createContext, useState, useContext, ReactNode } from 'react';

type AdditionalTabContextType = {
  selectedIndexBis: number;
  setSelectedIndexBis: (index: number) => void;
};

const AdditionalTabContext = createContext<AdditionalTabContextType | undefined>(undefined);
interface TabProviderProps {
    children: ReactNode;
  }
export const AdditionalTabProvider: React.FC<TabProviderProps> =  ({ children }) => {
  const [selectedIndexBis, setSelectedIndexBis] = useState(0);

  return (
    <AdditionalTabContext.Provider value={{ selectedIndexBis, setSelectedIndexBis }}>
      {children}
    </AdditionalTabContext.Provider>
  );
};

export const useAdditionalTab = (): AdditionalTabContextType => {
  const context = useContext(AdditionalTabContext);
  if (!context) {
    throw new Error('useAdditionalTab must be used within a TabProvider');
  }
  return context;
};
