import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/ar';
import 'intl-pluralrules';
import enTranslations from './en/en.json';
import arTranslations from './ar/ar.json';
import { loadLanguage } from '@api/languageStorage';
import { I18nManager } from 'react-native';

const resources = {
  en: {
    translation: enTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

Promise.resolve(loadLanguage()).then((storedLanguage) => {
  i18n.use(initReactI18next).init({
    
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
});

export default i18n;
