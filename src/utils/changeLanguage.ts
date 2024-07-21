import i18n from '@assets/translations';
import { saveLanguage } from '@api/languageStorage';
import { LanguageType } from '@assets/translations/language';

export const changeLanguage = async (lang: LanguageType) => {
  i18n
    .changeLanguage(lang)
    .then(async () => {
      await saveLanguage(lang);
    })
    .catch((err) => {
      console.log('error', err);
    });
};
