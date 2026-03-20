import { StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from '../../core/navigation/NavigationPropTypes';
import { useAppTheme } from '../../core/theme/ThemeContext';
import { useTypedTranslation } from '../../core/localization/useTypedTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = (_props: HomeScreenProps) => {
  const { colors } = useAppTheme();
  const { t } = useTypedTranslation();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primaryText }]}>{t('common.home')}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default HomeScreen;
