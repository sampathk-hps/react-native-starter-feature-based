import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from '@react-native-community/netinfo';
import { logger } from '../logger/Logger';

type NetworkListener = (isConnected: boolean) => void;

let currentState: boolean = true;
const listeners: Set<NetworkListener> = new Set();

const notifyListeners = (isConnected: boolean) => {
  listeners.forEach(listener => listener(isConnected));
};

let subscription: NetInfoSubscription | null = null;

export const NetworkService = {
  start: (): void => {
    if (subscription) {
      return;
    }

    subscription = NetInfo.addEventListener((state: NetInfoState) => {
      const connected =
        state.isConnected === true && state.isInternetReachable !== false;
      if (connected !== currentState) {
        currentState = connected;
        logger.info(
          `[Network] Status changed: ${connected ? 'online' : 'offline'}`,
        );
        notifyListeners(connected);
      }
    });

    NetInfo.fetch().then((state: NetInfoState) => {
      currentState =
        state.isConnected === true && state.isInternetReachable !== false;
    });
  },

  stop: (): void => {
    subscription?.();
    subscription = null;
  },

  isOnline: (): boolean => currentState,

  addListener: (listener: NetworkListener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
