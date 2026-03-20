import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Configuration } from '../configuration/Configuration';
import { AppLanguageStorageService } from '../storage/AppLanguageStorageService';
import { Translations } from './translations/en/translation';
import { GlobalUtils } from '../../utils/GlobalUtils';

export interface TranslationStorageModel {
  [key: string]: {
    translation: any;
  };
}

// const modules = Object.keys(Translations) as string[];

const fetchTranslations = async (lang: string): Promise<any> => {
  try {
    console.log('fetchTranslations for lang: ', lang);
    const translations: any = { ...Translations };

    // for (const module of modules) {
    // const response = await TranslationViewModel.getTranslationJson(
    //   module,
    //   lang,
    // );
    // translations[module] = {
    //   ...translations[module],
    //   ...response,
    // };
    // }

    AppLanguageStorageService.storeLanguageTranslations(translations, lang);

    const resources: Resource = {
      [lang]: { translation: translations },
    };

    await i18n.use(initReactI18next).init({
      fallbackLng: Configuration.defaultAppLanguageCode,
      lng: lang,
      resources: resources,
      interpolation: {
        escapeValue: false,
      },
    });

    return translations;
  } catch (error) {
    console.log('Error fetching translations:', error);
    return Translations;
  }
};

const initI18n = async () => {
  try {
    const lng = await AppLanguageStorageService.retrieveSelectedLanguage();
    const languageCode =
      lng?.language_code ?? Configuration.defaultAppLanguageCode;

    GlobalUtils.setCurrentLanguageCode(languageCode);

    const storedTranslations =
      await AppLanguageStorageService.getLanguageTranslationByKey(languageCode);

    if (storedTranslations) {
      const resources: Resource = {
        [languageCode]: { translation: storedTranslations },
      };

      await i18n.use(initReactI18next).init({
        fallbackLng: Configuration.defaultAppLanguageCode,
        lng: languageCode,
        resources: resources,
        interpolation: {
          escapeValue: false,
        },
      });
      fetchTranslations(languageCode);
    } else {
      await fetchTranslations(languageCode);
    }
  } catch (error) {
    console.log('Error loading translations:', error);
  }
};

export { initI18n };
export { i18n };
