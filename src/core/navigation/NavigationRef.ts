import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string) {
  if (navigationRef.isReady()) {
    try {
      navigationRef.navigate(name as never);
    } catch (error) {
      console.log('Navigation ref: error: ', error);
    }
  }
}
