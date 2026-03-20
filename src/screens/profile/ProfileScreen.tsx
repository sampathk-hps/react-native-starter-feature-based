import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileScreenProps } from '../../core/navigation/NavigationPropTypes';
import { useAppTheme } from '../../core/theme/ThemeContext';
import { useAuthContext } from '../../core/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = (_props: ProfileScreenProps) => {
  const { colors } = useAppTheme();
  const { authData, logout } = useAuthContext();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.primaryText }]}>
          Profile
        </Text>

        {authData.user && (
          <View style={styles.userInfo}>
            <Text style={[styles.label, { color: colors.secondaryText }]}>
              {authData.user.name}
            </Text>
            <Text style={[styles.label, { color: colors.secondaryText }]}>
              {authData.user.email}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.alert }]}
          onPress={logout}
        >
          <Text style={[styles.logoutText, { color: colors.white }]}>
            Logout
          </Text>
        </TouchableOpacity>
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
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 14,
  },
  logoutButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
