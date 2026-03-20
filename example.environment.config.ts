import { ForcedTheme } from './src/app/theme/ThemeContext';

type ClientConfig = {
  baseUrl: string;
  baseUrlCoupler: string;
  baseUrlStorage: string;
  storageProvider: 'aws' | 'gcp';
  storeName: string;
  storeId: number;
  userName?: string;
  password?: string;
  showFullBannerInHome: boolean;
  forceStoreLogo: boolean;
  forceTheme: ForcedTheme | undefined;
  enableLogs: boolean;
  homeCategoryDisplayUI:
    | 'general'
    | 'home_subcategory_section'
    | 'home_subcategory';
  hideHomeCategory: boolean;
  hideCopyrightMessage: boolean;
  pincodeFeature: boolean;
  isInitialPinCodeCaptureRequired: boolean;
  hideServiceProviderInPDP: boolean;
  enableBuyerPortal: boolean;
};

const CLIENT_CONFIGS = {
  clientName: {
    baseUrl: 'https://...',
    baseUrlCoupler: 'https://...',
    baseUrlStorage: 'https://...',
    storageProvider: 'aws',
    storeName: 'STORE_NAME',
    storeId: 0,
    // userName: '',
    // password: '',
    showFullBannerInHome: false,
    forceStoreLogo: false,
    forceTheme: undefined,
    enableLogs: true,
    homeCategoryDisplayUI: 'general',
    hideHomeCategory: false,
    hideCopyrightMessage: true,
    pincodeFeature: false,
    isInitialPinCodeCaptureRequired: false,
    hideServiceProviderInPDP: false,
    enableBuyerPortal: true,
  },
} satisfies Record<string, ClientConfig>;

type ClientName = keyof typeof CLIENT_CONFIGS;

// *** CHANGE THIS TO SWITCH CLIENTS ***
const ACTIVE_CLIENT: ClientName = 'clientName';

const config = CLIENT_CONFIGS[ACTIVE_CLIENT];

export namespace EnvironmentConfig {
  export const baseUrl = config.baseUrl;
  export const baseUrlCoupler = config.baseUrlCoupler;
  export const baseUrlStorage = config.baseUrlStorage;
  export const storageProvider = config.storageProvider;
  export const storeName = config.storeName;
  export const storeId = config.storeId;
  export const userName: string = (config as any).userName ?? '';
  export const password: string = (config as any).password ?? '';
  export const showFullBannerInHome = config.showFullBannerInHome;
  export const forceStoreLogo = config.forceStoreLogo;
  export const forceTheme: ForcedTheme | undefined = config.forceTheme;
  export const enableLogs = config.enableLogs;
  export const homeCategoryDisplayUI = config.homeCategoryDisplayUI;
  export const hideHomeCategory = config.hideHomeCategory;
  export const hideCopyrightMessage = config.hideCopyrightMessage;
  export const pincodeFeature = config.pincodeFeature;
  export const isInitialPinCodeCaptureRequired =
    config.isInitialPinCodeCaptureRequired;
  export const hideServiceProviderInPDP = config.hideServiceProviderInPDP;
  export const enableBuyerPortal = config.enableBuyerPortal;
}
