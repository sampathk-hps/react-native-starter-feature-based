import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { store } from './src/core/redux/store';
import { AppThemeProvider } from './src/core/theme/ThemeContext';
import { AuthProvider } from './src/core/auth/AuthContext';
import AppNavigationRoutes from './src/core/navigation/AppNavigationRoutes';
import { NetworkService } from './src/core/network/NetworkService';
import { BackgroundSync } from './src/core/sync/BackgroundSync';
import { registerJobsSyncHandler } from './src/features/jobs/sync/jobsSyncService';

const AppBoot = () => {
  useEffect(() => {
    NetworkService.start();
    registerJobsSyncHandler();
    BackgroundSync.configure();

    return () => {
      NetworkService.stop();
    };
  }, []);

  return <AppNavigationRoutes />;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <AuthProvider>
            <PaperProvider>
              <AppBoot />
            </PaperProvider>
          </AuthProvider>
        </AppThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
