import { ForcedTheme } from './src/core/theme/ThemeContext';

// ============================================================
// STARTER TEMPLATE — ENVIRONMENT CONFIGURATION
// ============================================================
// Copy this file to a git-ignored config file per client, or
// configure via your CI/CD environment variable injection.
//
// To switch between clients, change ACTIVE_CLIENT below.
// ============================================================

type ClientConfig = {
  baseUrl: string;
  storeName: string;
  storeId: number;
  userName?: string;
  password?: string;
  forceTheme: ForcedTheme | undefined;
  enableLogs: boolean;
};

const CLIENT_CONFIGS = {
  // TODO: Replace 'starterClient' with your client name and fill in the values below.
  starterClient: {
    baseUrl: '__YOUR_API_BASE_URL__',
    storeName: '__YOUR_STORE_NAME__',
    storeId: 0,
    // userName: '__YOUR_USERNAME__',
    // password: '__YOUR_PASSWORD__',
    forceTheme: undefined,
    enableLogs: true,
  },
} satisfies Record<string, ClientConfig>;

type ClientName = keyof typeof CLIENT_CONFIGS;

// *** CHANGE THIS TO SWITCH CLIENTS ***
const ACTIVE_CLIENT: ClientName = 'starterClient';

const config = CLIENT_CONFIGS[ACTIVE_CLIENT];

export namespace EnvironmentConfig {
  export const baseUrl = config.baseUrl;
  export const storeName = config.storeName;
  export const storeId = config.storeId;
  export const userName: string = (config as any).userName ?? '';
  export const password: string = (config as any).password ?? '';
  export const forceTheme: ForcedTheme | undefined = config.forceTheme;
  export const enableLogs = config.enableLogs;
}
