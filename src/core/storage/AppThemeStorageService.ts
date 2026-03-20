import { MMKVStorage } from './MMKVStorage';
import { ThemeColors, ThemeMode } from '../theme/ThemeContext';

const KEYS = {
  themeMode: 'app_theme_mode',
  themeColors: 'app_theme_colors',
} as const;

export const AppThemeStorageService = {
  getSelectedThemeMode: async (): Promise<ThemeMode | undefined> => {
    return MMKVStorage.getString(KEYS.themeMode) as ThemeMode | undefined;
  },

  storeSelectedThemeMode: (mode: ThemeMode): void => {
    MMKVStorage.setString(KEYS.themeMode, mode);
  },

  getSelectedThemeColors: async (): Promise<ThemeColors | undefined> => {
    return MMKVStorage.getObject<ThemeColors>(KEYS.themeColors);
  },

  storeSelectedThemeColors: (colors: ThemeColors): void => {
    MMKVStorage.setObject(KEYS.themeColors, colors);
  },
};
