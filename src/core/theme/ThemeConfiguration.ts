import { StatusBarStyle } from 'react-native';

export namespace ThemeConfiguration {
  export const fontFamily = 'Inter-Regular';

  export const decideStatusBarStyle = (hexColor: string): StatusBarStyle => {
    // Remove any hash symbol if present
    const color = hexColor.replace('#', '');

    // Parse the hex color
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 4), 16) / 255;
    const b = parseInt(color.substring(4, 6), 16) / 255;

    // Calculate relative luminance
    const luminance = (channel: number) =>
      channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);

    const lum =
      0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);

    return lum > 0.179 ? 'dark-content' : 'light-content';
  };
}
