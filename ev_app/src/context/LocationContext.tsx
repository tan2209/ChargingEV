// LocationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LocationContextProps {
  latitude: number | null;
  longitude: number | null;
  setLatitude: (latitude: number | null) => void;
  setLongitude: (longitude: number | null) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  return (
    <LocationContext.Provider value={{ latitude, longitude, setLatitude, setLongitude }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
