import { MMKVStorage } from './MMKVStorage';

interface SelectedLanguage {
  language_code: string;
}

const KEYS = {
  selectedLanguage: 'app_language_code',
  translations: (lang: string) => `app_translations_${lang}`,
} as const;

export const AppLanguageStorageService = {
  // ─── Selected language ───────────────────────────────────────

  getLanguage: (): string | undefined =>
    MMKVStorage.getString(KEYS.selectedLanguage),

  setLanguage: (languageCode: string): void =>
    MMKVStorage.setString(KEYS.selectedLanguage, languageCode),

  retrieveSelectedLanguage: async (): Promise<SelectedLanguage | null> => {
    const code = MMKVStorage.getString(KEYS.selectedLanguage);
    return code ? { language_code: code } : null;
  },

  storeSelectedLanguage: async (
    lng: Record<string, unknown>,
  ): Promise<void> => {
    if (typeof lng.language_code === 'string') {
      MMKVStorage.setString(KEYS.selectedLanguage, lng.language_code);
    }
    MMKVStorage.setObject(KEYS.selectedLanguage + '_full', lng);
  },

  // ─── Cached translations ─────────────────────────────────────

  storeLanguageTranslations: (translations: unknown, lang: string): void =>
    MMKVStorage.setObject(KEYS.translations(lang), translations),

  getLanguageTranslationByKey: async (lang: string): Promise<unknown | null> =>
    MMKVStorage.getObject(KEYS.translations(lang)) ?? null,
};
