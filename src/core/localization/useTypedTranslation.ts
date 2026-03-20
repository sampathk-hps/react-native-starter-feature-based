import {
  useTranslation as useTranslationOriginal,
  UseTranslationResponse,
} from 'react-i18next';
import { Translations } from './translations/en/translation';

type Namespace = 'translation';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type KeyType = NestedKeyOf<typeof Translations>;

type TypedTranslationResponse = Omit<
  UseTranslationResponse<Namespace, KeyType>,
  't'
> & {
  t: (key: KeyType, options?: Record<string, unknown>) => string;
};

export const useTypedTranslation = (): TypedTranslationResponse => {
  const { t, ...rest } = useTranslationOriginal();
  const typedT = (key: KeyType, options?: Record<string, unknown>) =>
    t(key, options) as string;
  return { t: typedT, ...rest };
};
