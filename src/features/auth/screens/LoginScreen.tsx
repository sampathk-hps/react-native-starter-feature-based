import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../../core/theme/ThemeContext';
import { useTypedTranslation } from '../../../core/localization/useTypedTranslation';
import { useAuthContext } from '../../../core/auth/AuthContext';
import { loginThunk } from '../slice/authSlice';
import LoginForm, { LoginFormValues } from '../components/LoginForm';
import { AppDispatch, RootState } from '../../../core/redux/store';

const LoginScreen = () => {
  const { colors } = useAppTheme();
  const { t } = useTypedTranslation();
  const { login } = useAuthContext();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: LoginFormValues) => {
    const result = await dispatch(loginThunk(values));
    if (loginThunk.fulfilled.match(result)) {
      await login(
        {
          accessToken: result.payload.accessToken,
          refreshToken: result.payload.refreshToken,
        },
        result.payload.user,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.primaryBackground }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primaryTextDeep }]}>
            {t('auth.welcomeBack')}
          </Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
            {t('auth.signInToContinue')}
          </Text>
        </View>

        <View
          style={[styles.card, { backgroundColor: colors.secondaryBackground }]}
        >
          <LoginForm
            onSubmit={handleSubmit}
            isLoading={loading}
            serverError={error}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
  },
  card: {
    padding: 24,
    borderRadius: 16,
  },
});

export default LoginScreen;
