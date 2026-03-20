import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'app-storage' });

export const MMKVStorage = {
  getString: (key: string): string | undefined => storage.getString(key),

  setString: (key: string, value: string): void => storage.set(key, value),

  getBoolean: (key: string): boolean | undefined => storage.getBoolean(key),

  setBoolean: (key: string, value: boolean): void => storage.set(key, value),

  getObject: <T>(key: string): T | undefined => {
    const raw = storage.getString(key);
    if (!raw) {
      return undefined;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  },

  setObject: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  remove: (key: string): void => {
    storage.remove(key);
  },

  clear: (): void => storage.clearAll(),

  contains: (key: string): boolean => storage.contains(key),
};
