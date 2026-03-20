import { useState, useEffect } from 'react';
import { NetworkService } from './NetworkService';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean>(
    NetworkService.isOnline(),
  );

  useEffect(() => {
    const unsubscribe = NetworkService.addListener(connected => {
      setIsConnected(connected);
    });
    return unsubscribe;
  }, []);

  return { isConnected };
};
