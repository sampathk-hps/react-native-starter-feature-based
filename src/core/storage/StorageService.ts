import { MMKVStorage } from './MMKVStorage';
import { KeychainService } from './KeychainService';

export const StorageService = {
  // ─── Non-sensitive data (MMKV) ───────────────────────────────

  getString: (key: string) => MMKVStorage.getString(key),
  setString: (key: string, value: string) => MMKVStorage.setString(key, value),
  getBoolean: (key: string) => MMKVStorage.getBoolean(key),
  setBoolean: (key: string, value: boolean) =>
    MMKVStorage.setBoolean(key, value),
  getObject: <T>(key: string) => MMKVStorage.getObject<T>(key),
  setObject: <T>(key: string, value: T) => MMKVStorage.setObject(key, value),
  remove: (key: string) => MMKVStorage.remove(key),

  // ─── Sensitive data (Keychain) ───────────────────────────────

  setSecure: (username: string, secret: string) =>
    KeychainService.setCredentials(username, secret),

  getSecure: () => KeychainService.getCredentials(),

  clearSecure: () => KeychainService.clearCredentials(),
};
