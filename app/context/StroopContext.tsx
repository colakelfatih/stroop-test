import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define types for our screen data
export interface ScreenData {
  time: number;
  corrections: number;
  errors: number;
}

// Interface for the context value
interface StroopContextType {
  screenData: Record<number, ScreenData>;
  updateScreenData: (screen: number, data: Partial<ScreenData>) => void;
  resetData: () => void;
}

// Create context
const StroopContext = createContext<StroopContextType | undefined>(undefined);

// Provider component
export function StroopProvider({ children }: { children: ReactNode }) {
  const [screenData, setScreenData] = useState<Record<number, ScreenData>>({
    1: { time: 0, corrections: 0, errors: 0 },
    2: { time: 0, corrections: 0, errors: 0 },
    3: { time: 0, corrections: 0, errors: 0 },
    4: { time: 0, corrections: 0, errors: 0 },
    5: { time: 0, corrections: 0, errors: 0 },
  });

  const updateScreenData = (screen: number, data: Partial<ScreenData>) => {
    setScreenData(prevData => ({
      ...prevData,
      [screen]: {
        ...prevData[screen],
        ...data
      }
    }));
  };

  const resetData = () => {
    setScreenData({
      1: { time: 0, corrections: 0, errors: 0 },
      2: { time: 0, corrections: 0, errors: 0 },
      3: { time: 0, corrections: 0, errors: 0 },
      4: { time: 0, corrections: 0, errors: 0 },
      5: { time: 0, corrections: 0, errors: 0 },
    });
  };

  return (
    <StroopContext.Provider value={{ screenData, updateScreenData, resetData }}>
      {children}
    </StroopContext.Provider>
  );
}

// Hook for using the context
export function useStroop() {
  const context = useContext(StroopContext);
  if (context === undefined) {
    throw new Error('useStroop must be used within a StroopProvider');
  }
  return context;
} 