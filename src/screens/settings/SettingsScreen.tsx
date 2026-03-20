import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SettingsScreenProps } from '../../core/navigation/NavigationPropTypes';
import { useAppTheme } from '../../core/theme/ThemeContext';
import { useTypedTranslation } from '../../core/localization/useTypedTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = (_props: SettingsScreenProps) => {
  const { colors, themeMode, changeAppTheme } = useAppTheme();
  const { t } = useTypedTranslation();

  const themes: Array<{ label: string; value: 'light' | 'dark' | 'system' }> = [
    { label: t('settings.themeLight'), value: 'light' },
    { label: t('settings.themeDark'), value: 'dark' },
    { label: t('settings.themeSystem'), value: 'system' },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          {t('common.settings')}
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.secondaryText }]}>
            {t('settings.appearance')}
          </Text>
          <View
            style={[
              styles.themeRow,
              { backgroundColor: colors.secondaryBackground },
            ]}
          >
            {themes.map(theme => (
              <TouchableOpacity
                key={theme.value}
                style={[
                  styles.themeOption,
                  themeMode === theme.value && {
                    backgroundColor: colors.primaryColor,
                  },
                ]}
                onPress={() => changeAppTheme(theme.value)}
              >
                <Text
                  style={[
                    styles.themeLabel,
                    {
                      color:
                        themeMode === theme.value
                          ? colors.white
                          : colors.primaryText,
                    },
                  ]}
                >
                  {theme.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  themeRow: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    gap: 4,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SettingsScreen;
