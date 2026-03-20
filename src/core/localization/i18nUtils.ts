import { I18nManager } from 'react-native';
import { i18n } from './i18n';
import RNRestart from 'react-native-restart';
import { AppLanguageStorageService } from '../storage/AppLanguageStorageService';
import ScriptDirectionType from '../../models/enums/ScriptDirectionType';

export namespace i18nUtils {
  export const changeAppLanguage = async (lng: any) => {
    console.log('Changing Lang to: ', lng);
    await AppLanguageStorageService.storeSelectedLanguage(lng);
    I18nManager.forceRTL(
      lng.writing_script_direction === ScriptDirectionType.RTL,
    );
    await i18n.changeLanguage(lng.language_code);

    RNRestart.restart();
  };

  export const isRTL = I18nManager.isRTL;
}
