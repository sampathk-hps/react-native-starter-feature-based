import { StyleSheet } from 'react-native';
import { useAppTheme } from './ThemeContext';
import { ThemeConfiguration } from './ThemeConfiguration';

export default function useGlobalStyles() {
  const { colors } = useAppTheme();

  return StyleSheet.create({
    scrollViewContainer: {
      backgroundColor: colors.primaryBackground,
    },
    anyContainer: {
      backgroundColor: colors.primaryBackground,
    },
    mainPaddingH: {
      paddingHorizontal: 26,
    },
    mainPaddingV: {
      paddingVertical: 26,
    },
    subPaddingH: {
      paddingHorizontal: 20,
    },
    subPaddingV: {
      paddingVertical: 20,
    },
    midPaddingH: {
      paddingHorizontal: 16,
    },
    midPaddingV: {
      paddingVertical: 16,
    },
    minPaddingH: {
      paddingHorizontal: 12,
    },
    minPaddingL: {
      paddingLeft: 12,
    },
    minPaddingR: {
      paddingRight: 12,
    },
    minPaddingV: {
      paddingVertical: 12,
    },
    leastPaddingH: {
      paddingHorizontal: 8,
    },
    leastPaddingV: {
      paddingVertical: 8,
    },
    margin16H: {
      marginHorizontal: 16,
    },
    margin16V: {
      marginVertical: 16,
    },
    minMarginH: {
      marginHorizontal: 12,
    },
    minMarginV: {
      marginVertical: 12,
    },
    subMarginH: {
      marginHorizontal: 20,
    },
    subMarginV: {
      marginVertical: 20,
    },
    mainMarginH: {
      marginHorizontal: 26,
    },
    mainMarginV: {
      marginVertical: 26,
    },
    globalText8: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 8,
      fontWeight: '500',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText10: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 10,
      fontWeight: '400',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText12: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 12,
      fontWeight: '400',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText12Medium: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 12,
      fontWeight: '500',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText12Heavy: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 12,
      fontWeight: '700',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText13: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 13,
      fontWeight: '400',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText13Medium: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 13,
      fontWeight: '600',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText14: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 14,
      fontWeight: '400',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText14Medium: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 14,
      fontWeight: '600',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText14Dark: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 14,
      fontWeight: '800',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText14MediumLight: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 14,
      fontWeight: '500',
      fontStyle: 'normal',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText16: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 16,
      fontWeight: '500',
      fontStyle: 'normal',
      color: colors.primaryTextDeep,
      textAlign: 'left',
    },
    globalText16Medium: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 16,
      fontWeight: '600',
      fontStyle: 'normal',
      color: colors.primaryTextDeep,
      textAlign: 'left',
    },
    globalText16Dark: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 16,
      fontWeight: '800',
      fontStyle: 'normal',
      color: colors.primaryTextDeep,
      textAlign: 'left',
    },
    globalText18: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '600',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText18Dark: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '700',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText20: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '600',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText20Dark: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 20,
      fontStyle: 'normal',
      fontWeight: '700',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText24: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '700',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText24Light: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '400',
      color: colors.primaryText,
      textAlign: 'left',
    },
    globalText28: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '600',
      color: colors.primaryText,
      textAlign: 'left',
    },
    priceTextLight24: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '500',
      color: colors.secondaryText,
      lineHeight: 28,
      textAlign: 'left',
    },
    priceText18: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '700',
      color: colors.primaryText,
      lineHeight: 28,
      textAlign: 'left',
    },
    priceTextLight18: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '500',
      color: colors.secondaryText,
      lineHeight: 28,
      textAlign: 'left',
    },
    errorText: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 14,
      fontWeight: '400',
      fontStyle: 'normal',
      color: colors.alert,
      textAlign: 'left',
    },
    successText: {
      fontFamily: ThemeConfiguration.fontFamily,
      fontSize: 14,
      fontWeight: '400',
      fontStyle: 'normal',
      color: colors.success,
      textAlign: 'left',
    },
    cardFlatContainer: {
      overflow: 'hidden',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.alternate,
    },
    disabledStyle: {
      opacity: 0.4,
    },
    flipStyle: {
      transform: [{ scaleX: -1 }],
    },
    fullFlex: {
      flex: 1,
    },
    svgTransform180: {
      transform: [{ rotate: '180deg' }],
    },
    lottieAnimation: {
      width: '100%',
      height: '100%',
    },
  });
}
