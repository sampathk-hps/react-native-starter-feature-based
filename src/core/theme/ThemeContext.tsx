import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import { AppThemeStorageService } from '../storage/AppThemeStorageService';
import LoadingOverlay from '../../components/loader/LoadingOverlay';
import { EnvironmentConfig } from '../../../environment.config';
import { ColorPalettes } from './ColorPalettes';
import { StatusTheme, StatusThemeType } from './StatusTheme';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ForcedTheme = Exclude<ThemeMode, 'system'>;

export interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;

  primaryAccentColor: string;
  secondaryAccentColor: string;

  primaryBackground: string;
  secondaryBackground: string;
  backgroundOpeque: string;

  primaryText: string;
  primaryTextDeep: string;
  secondaryText: string;

  alert: string;
  alertLight: string;
  alertBg: string;

  warning: string;
  success: string;
  successLight: string;
  alternate: string;

  headerBg: string;
  headerText: string;

  warningBg: string;

  info: string;
  infoDark: string;
  infoBg: string;

  ratingStar: string;

  white: string;
  black: string;

  gray: string;
  lightGray: string;
  darkGray: string;
  mediumGray: string;
  darkBgGray: string;
  lightBgGray: string;

  cyan: string;
  purple: string;

  blue: string;
  lightBgBlue: string;

  statusGreenBg: string;
  statusGreenLightBg: string;
  statusGreenText: string;

  statusRedBg: string;
  statusRedLightBg: string;
  statusRedText: string;

  statusYellowBg: string;
  statusYellowLightBg: string;
  statusYellowText: string;

  statusColors: StatusThemeType;

  orangeBg: string;
  orangeText: string;
  orangeBorder: string;
}

interface ThemeContextType {
  themeMode: ThemeMode;
  colors: ThemeColors;
  changeAppTheme: (mode: ThemeMode) => void;
  isDarkMode: boolean;
  updateThemeColors: (newColors: Partial<ThemeColors>) => void;
  fetchThemeFromAPI: () => Promise<void>;
  updateThemeFromStorage: () => Promise<void>;
  isInitialized: boolean;
}

// Default color schemes
const LIGHT_THEME: ThemeColors = {
  primaryColor: ColorPalettes.yellow400,
  secondaryColor: ColorPalettes.slate900,

  primaryAccentColor: ColorPalettes.slate950,
  secondaryAccentColor: ColorPalettes.white,

  primaryBackground: ColorPalettes.white,
  secondaryBackground: ColorPalettes.gray75,
  backgroundOpeque: ColorPalettes.blackAlpha50,

  primaryText: ColorPalettes.blackAlpha88,
  secondaryText: ColorPalettes.slate400,
  primaryTextDeep: ColorPalettes.slate950,

  alert: ColorPalettes.red500,
  alertLight: ColorPalettes.red200,
  alertBg: ColorPalettes.orangeAlpha13,

  warning: ColorPalettes.amber500,
  success: ColorPalettes.teal500,
  successLight: ColorPalettes.green300,
  alternate: ColorPalettes.gray75,

  headerBg: ColorPalettes.slate900,
  headerText: ColorPalettes.white,

  warningBg: ColorPalettes.orangeAlpha10,

  info: ColorPalettes.blue300,
  infoDark: ColorPalettes.sky500,
  infoBg: ColorPalettes.sky50,

  ratingStar: ColorPalettes.yellow300,

  white: ColorPalettes.white,
  black: ColorPalettes.black,

  gray: ColorPalettes.gray400,
  lightGray: ColorPalettes.slate200,
  darkGray: ColorPalettes.gray500,
  mediumGray: ColorPalettes.gray200,
  darkBgGray: ColorPalettes.gray150,
  lightBgGray: ColorPalettes.gray50,

  cyan: ColorPalettes.cyan500,
  purple: ColorPalettes.purple800,

  blue: ColorPalettes.blue600,
  lightBgBlue: ColorPalettes.blueAlpha10,

  statusGreenBg: ColorPalettes.green100,
  statusGreenLightBg: ColorPalettes.green50Alpha,
  statusGreenText: ColorPalettes.green800,

  statusRedBg: ColorPalettes.red100,
  statusRedLightBg: ColorPalettes.red50Alpha,
  statusRedText: ColorPalettes.red800,

  statusYellowBg: ColorPalettes.yellow100,
  statusYellowLightBg: ColorPalettes.yellow50,
  statusYellowText: ColorPalettes.yellow800,

  statusColors: StatusTheme,

  orangeBg: ColorPalettes.orange25,
  orangeText: ColorPalettes.orange500,
  orangeBorder: ColorPalettes.orange300,
};

const DARK_THEME: ThemeColors = {
  primaryColor: ColorPalettes.white,
  secondaryColor: ColorPalettes.black,

  primaryAccentColor: ColorPalettes.black,
  secondaryAccentColor: ColorPalettes.white,

  primaryBackground: ColorPalettes.gray950,
  secondaryBackground: ColorPalettes.gray900,
  backgroundOpeque: ColorPalettes.blackAlpha70,

  primaryText: ColorPalettes.white,
  secondaryText: ColorPalettes.gray450,
  primaryTextDeep: ColorPalettes.white,

  alert: ColorPalettes.red500,
  alertLight: ColorPalettes.red200,
  alertBg: ColorPalettes.orangeAlpha13,

  warning: ColorPalettes.amber500,
  success: ColorPalettes.green500,
  successLight: ColorPalettes.green300,
  alternate: ColorPalettes.gray900,

  headerBg: ColorPalettes.gray950,
  headerText: ColorPalettes.white,

  warningBg: ColorPalettes.orangeAlpha10,

  info: ColorPalettes.blue400,
  infoDark: ColorPalettes.blue700,
  infoBg: ColorPalettes.blue950,

  ratingStar: ColorPalettes.yellow300,

  white: ColorPalettes.white,
  black: ColorPalettes.black,

  gray: ColorPalettes.gray400,
  lightGray: ColorPalettes.gray800,
  darkGray: ColorPalettes.gray500,
  mediumGray: ColorPalettes.gray200,
  darkBgGray: ColorPalettes.gray150,
  lightBgGray: ColorPalettes.gray50,

  cyan: ColorPalettes.cyan500,
  purple: ColorPalettes.purple800,

  blue: ColorPalettes.blue600,
  lightBgBlue: ColorPalettes.blueAlpha10,

  statusGreenBg: ColorPalettes.green100,
  statusGreenLightBg: ColorPalettes.green50Alpha,
  statusGreenText: ColorPalettes.green800,

  statusRedBg: ColorPalettes.red100,
  statusRedLightBg: ColorPalettes.red50Alpha,
  statusRedText: ColorPalettes.red800,

  statusYellowBg: ColorPalettes.yellow100,
  statusYellowLightBg: ColorPalettes.yellow50,
  statusYellowText: ColorPalettes.yellow800,

  statusColors: StatusTheme,

  orangeBg: ColorPalettes.orange25,
  orangeText: ColorPalettes.orange500,
  orangeBorder: ColorPalettes.orange300,
};

const AppThemeContext = createContext<ThemeContextType>({
  themeMode: EnvironmentConfig.forceTheme ?? 'light',
  colors: EnvironmentConfig.forceTheme
    ? EnvironmentConfig.forceTheme === 'light'
      ? LIGHT_THEME
      : DARK_THEME
    : LIGHT_THEME,
  isDarkMode: EnvironmentConfig.forceTheme
    ? EnvironmentConfig.forceTheme === 'dark'
      ? true
      : false
    : false,
  isInitialized: false,
  updateThemeColors: () => {},
  fetchThemeFromAPI: async () => {},
  updateThemeFromStorage: async () => {},
  changeAppTheme: () => {},
});

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    EnvironmentConfig.forceTheme ? EnvironmentConfig.forceTheme : 'system',
  );
  const [customLightTheme, setCustomLightTheme] =
    useState<ThemeColors>(LIGHT_THEME);
  const [customDarkTheme, setCustomDarkTheme] =
    useState<ThemeColors>(DARK_THEME);

  const isDarkMode =
    themeMode === 'dark' || (themeMode === 'system' && systemScheme === 'dark');

  const colors = isDarkMode ? customDarkTheme : customLightTheme;

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        // Try to load saved theme from storage
        const savedMode = await AppThemeStorageService.getSelectedThemeMode();
        if (savedMode) {
          setThemeMode(savedMode as ThemeMode);
        }
        // Fetch theme from API
        await updateThemeFromStorage();
        await fetchThemeFromAPI();
      } catch (error) {
        console.error('Theme initialization failed', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeTheme();
  }, []);

  const changeAppTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
    AppThemeStorageService.storeSelectedThemeMode(mode);
  };

  const updateThemeColors = (newColors: Partial<ThemeColors>) => {
    if (isDarkMode) {
      setCustomDarkTheme(prev => ({ ...prev, ...newColors }));
    } else {
      setCustomLightTheme(prev => ({ ...prev, ...newColors }));
    }
  };

  const updateThemeFromStorage = async () => {
    const savedeTheme = await AppThemeStorageService.getSelectedThemeColors();
    if (savedeTheme) {
      if (isDarkMode) {
        setCustomDarkTheme(savedeTheme);
      } else {
        setCustomLightTheme(savedeTheme);
      }
    }
  };

  // TODO: Replace with real API call to fetch custom theme colors from your backend
  const fetchThemeFromAPI = async () => {};

  useEffect(() => {
    if (isInitialized) {
      AppThemeStorageService.storeSelectedThemeColors(
        themeMode === 'dark' ||
          (themeMode === 'system' && systemScheme === 'dark')
          ? customDarkTheme
          : customLightTheme,
      );
    }
  }, [themeMode]);

  // Show loading indicator while initializing
  if (!isInitialized) {
    return <LoadingOverlay isVisible={!isInitialized} />;
  }

  return (
    <AppThemeContext.Provider
      value={{
        themeMode,
        colors,
        isDarkMode,
        isInitialized,
        fetchThemeFromAPI,
        updateThemeColors,
        updateThemeFromStorage,
        changeAppTheme,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(AppThemeContext);
