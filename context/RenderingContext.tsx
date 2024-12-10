import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RenderingContextType {
  renderingCurrent: boolean;
  setRenderingCurrent: (value: boolean) => void;
}

const RenderingContext = createContext<RenderingContextType | undefined>(undefined);

export const RenderingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [renderingCurrent, setRenderingCurrent] = useState(true);

  return (
    <RenderingContext.Provider value={{ renderingCurrent, setRenderingCurrent }}>
      {children}
    </RenderingContext.Provider>
  );
};

export const useRendering = (): RenderingContextType => {
  const context = useContext(RenderingContext);
  if (!context) {
    throw new Error('useRendering must be used within a RenderingProvider');
  }
  return context;
};
