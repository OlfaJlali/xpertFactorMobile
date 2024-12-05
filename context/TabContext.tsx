import React, { createContext, useState, useContext, ReactNode } from 'react';

type TabContextType = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);
interface TabProviderProps {
    children: ReactNode;
  }
export const TabProvider: React.FC<TabProviderProps> =  ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};
