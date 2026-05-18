import { createContext, useContext } from 'react';
import type { useRestiooStore } from '../state/useRestiooStore';

type RestiooStoreValue = ReturnType<typeof useRestiooStore>;

export const RestiooContext = createContext<RestiooStoreValue | null>(null);

export function useRestioo() {
  const context = useContext(RestiooContext);
  if (!context) {
    throw new Error('useRestioo must be used inside RestiooContext.Provider');
  }
  return context;
}
