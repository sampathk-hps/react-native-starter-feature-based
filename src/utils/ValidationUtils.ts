import { z } from 'zod';
import { RegExUtils } from './RegExUtils';
import { i18n } from '../core/localization/i18n';

export namespace ValidationUtils {
  export const emailField = () => z.email(i18n.t('validation.invalidEmail'));

  export const passwordField = (minLength: number = 6) =>
    z
      .string()
      .min(minLength, i18n.t('validation.passwordMinLength', { count: minLength }));

  export const phoneField = () =>
    z
      .string()
      .regex(
        RegExUtils.phoneNumberRegEx,
        i18n.t('validation.invalidPhone'),
      );

  export const requiredStringField = (label: string = 'This field') =>
    z.string().min(1, i18n.t('validation.fieldRequired', { label }));

  export const pinCodeField = () =>
    z.string().regex(RegExUtils.pinCodeRegEx, i18n.t('validation.invalidPin'));

  export const urlField = () =>
    z
      .string()
      .regex(RegExUtils.urlHttpOrHttpsRegEx, i18n.t('validation.invalidUrl'));

  export const loginSchema = z.object({
    email: emailField(),
    password: passwordField(),
  });
}
