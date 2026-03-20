import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppTheme } from '../../../core/theme/ThemeContext';

const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface Props {
  onSubmit: (values: LoginFormValues) => void;
  isLoading: boolean;
  serverError?: string;
}

const LoginForm = ({ onSubmit, isLoading, serverError }: Props) => {
  const { colors } = useAppTheme();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const handleValidatedSubmit = (values: LoginFormValues) => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof LoginFormValues;
        setError(field, { message: err.message });
      });
      return;
    }
    onSubmit(result.data);
  };

  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.secondaryText }]}>
          Email
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.secondaryBackground,
                  color: colors.primaryText,
                  borderColor: errors.email ? colors.alert : colors.lightGray,
                },
              ]}
              placeholder="you@example.com"
              placeholderTextColor={colors.gray}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!isLoading}
            />
          )}
        />
        {errors.email && (
          <Text style={[styles.errorText, { color: colors.alert }]}>
            {errors.email.message}
          </Text>
        )}
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.secondaryText }]}>
          Password
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.secondaryBackground,
                  color: colors.primaryText,
                  borderColor: errors.password
                    ? colors.alert
                    : colors.lightGray,
                },
              ]}
              placeholder="••••••••"
              placeholderTextColor={colors.gray}
              secureTextEntry
              autoComplete="current-password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              editable={!isLoading}
            />
          )}
        />
        {errors.password && (
          <Text style={[styles.errorText, { color: colors.alert }]}>
            {errors.password.message}
          </Text>
        )}
      </View>

      {serverError && (
        <View style={[styles.serverError, { backgroundColor: colors.alertBg }]}>
          <Text style={[styles.errorText, { color: colors.alert }]}>
            {serverError}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.submitButton,
          { backgroundColor: colors.primaryColor },
          isLoading && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmit(handleValidatedSubmit)}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text
            style={[styles.submitLabel, { color: colors.primaryAccentColor }]}
          >
            Sign In
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
  },
  serverError: {
    padding: 12,
    borderRadius: 8,
  },
  submitButton: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginForm;
