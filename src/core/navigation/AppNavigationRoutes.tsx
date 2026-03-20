import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationPropTypes';
import BottomTabs from './tabs/BottomTabRoutes';
import { StatusBar } from 'react-native';
import { useAuthContext } from '../auth/AuthContext';
import LoadingOverlay from '../../components/loader/LoadingOverlay';
import { navigationRef } from './NavigationRef';
import { useTypedTranslation } from '../localization/useTypedTranslation';
import { useRef } from 'react';
import { useAppTheme } from '../theme/ThemeContext';
import { ThemeConfiguration } from '../theme/ThemeConfiguration';
import LoginScreen from '../../features/auth/screens/LoginScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const UnAuthStack = () => {
  const { colors } = useAppTheme();
  const { t } = useTypedTranslation();

  return (
    <RootStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={() => ({
        headerTintColor: colors.headerText,
        headerStyle: {
          backgroundColor: colors.headerBg,
        },
        headerBackTitle: t('common.back'),
      })}
    >
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name="TabsScreen"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

const AuthStack = () => {
  const { colors } = useAppTheme();
  const { t } = useTypedTranslation();

  return (
    <RootStack.Navigator
      initialRouteName="TabsScreen"
      screenOptions={() => ({
        headerTintColor: colors.headerText,
        headerStyle: {
          backgroundColor: colors.headerBg,
        },
        headerBackTitle: t('common.back'),
      })}
    >
      <RootStack.Screen
        name="TabsScreen"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />

      {/* <RootStack.Screen
        name="NetworkErrorScreen"
        component={NetworkErrorScreen}
        options={{
          headerShown: true,
          title: t('common.error'),
        }}
      /> */}
    </RootStack.Navigator>
  );
};

const AppNavigationRoutes = () => {
  const { colors } = useAppTheme();
  const { authData, loading } = useAuthContext();

  const routeNameRef = useRef<string | undefined>(undefined);

  if (loading) {
    return <LoadingOverlay isVisible />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          // await AnalyticsService.logScreenView(currentRouteName ?? 'Not Found');
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <StatusBar
        barStyle={ThemeConfiguration.decideStatusBarStyle(colors.headerBg)}
        backgroundColor={colors.headerBg}
      />

      {authData?.isAuthenticated ? <AuthStack /> : <UnAuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigationRoutes;
