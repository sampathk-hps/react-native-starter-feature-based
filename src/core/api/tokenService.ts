import { KeychainService } from '../storage/KeychainService';

const TOKEN_USERNAME = 'auth_tokens';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const TokenService = {
  save: async (tokens: TokenPair): Promise<void> => {
    await KeychainService.setCredentials(
      TOKEN_USERNAME,
      JSON.stringify(tokens),
    );
  },

  get: async (): Promise<TokenPair | null> => {
    const creds = await KeychainService.getCredentials();
    if (!creds) {
      return null;
    }
    try {
      return JSON.parse(creds.password) as TokenPair;
    } catch {
      return null;
    }
  },

  getAccessToken: async (): Promise<string | null> => {
    const tokens = await TokenService.get();
    return tokens?.accessToken ?? null;
  },

  getRefreshToken: async (): Promise<string | null> => {
    const tokens = await TokenService.get();
    return tokens?.refreshToken ?? null;
  },

  clear: async (): Promise<void> => {
    await KeychainService.clearCredentials();
  },
};
