import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'com.starter_app';

export const KeychainService = {
  setCredentials: async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      await Keychain.setGenericPassword(username, password, {
        service: SERVICE_NAME,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      return true;
    } catch {
      return false;
    }
  },

  getCredentials: async (): Promise<{
    username: string;
    password: string;
  } | null> => {
    try {
      const result = await Keychain.getGenericPassword({
        service: SERVICE_NAME,
      });
      if (result) {
        return { username: result.username, password: result.password };
      }
      return null;
    } catch {
      return null;
    }
  },

  clearCredentials: async (): Promise<boolean> => {
    try {
      await Keychain.resetGenericPassword({ service: SERVICE_NAME });
      return true;
    } catch {
      return false;
    }
  },
};
