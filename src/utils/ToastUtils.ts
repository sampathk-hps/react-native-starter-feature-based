import Toast from 'react-native-root-toast';

export namespace ToastUtils {
  export function showBasicToast({
    message,
    duration = 5000,
    position = Toast.positions.BOTTOM,
    hideOnPress = true,
  }: {
    message: string;
    duration?: number;
    position?: number;
    hideOnPress?: boolean;
  }) {
    Toast.show(message, {
      duration: duration,
      position: position,
      shadow: true,
      animation: true,
      hideOnPress: hideOnPress,
      delay: 0,
      keyboardAvoiding: true,
    });
  }
}
