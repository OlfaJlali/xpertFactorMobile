import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context state
interface ShowContextType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const ShowContext = createContext<ShowContextType | undefined>(undefined);

interface ShowProviderProps {
  children: ReactNode;
}

export const ShowProvider: React.FC<ShowProviderProps> = ({ children }) => {
  const [show, setShow] = useState(true);

  return (
    <ShowContext.Provider value={{ show, setShow }}>
      {children}
    </ShowContext.Provider>
  );
};

// Custom hook to use Show context
export const useShow = (): ShowContextType => {
  const context = useContext(ShowContext);
  if (!context) {
    throw new Error('useShow must be used within a ShowProvider');
  }
  return context;
};
