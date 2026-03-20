import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as NavigationRef from './NavigationRef';

/**
 * Helper methods for navigation related tasks
 */
export namespace AppNavigationUtils {
  /**
   * Method to return to home screen from anywhere in the app
   * @param navigation
   */
  export const goToHome = (
    navigation: NativeStackNavigationProp<any, any, any>,
  ) => {
    navigation.navigate('TabsScreen', {
      screen: 'HomeScreen',
    });
  };

  export const logout = () => {
    try {
      NavigationRef.navigate('HomeScreen');
      NavigationRef.navigate('LoginTempScreen');
    } catch (error) {
      console.log('Logout Navigation Error: ', error);
    }
  };

  export const goToLogin = () => {
    try {
      NavigationRef.navigate('HomeScreen');
      NavigationRef.navigate('LoginScreen');
    } catch (error) {
      console.log('goToLogin Navigation Error: ', error);
    }
  };

  export const showNetworkErrorPage = () => {
    try {
      NavigationRef.navigate('NetworkErrorScreen');
    } catch (error) {
      console.log('NetworkErrorScreen Error: ', error);
    }
  };
}
