import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { loadLanguage, saveLanguage } from '@api/languageStorage';

import { LanguageType, TranslationResource } from './language';
import en from './en/en.json';
import ar from './ar/ar.json';

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lng: any) => void) => {
    const saveJSON = await loadLanguage();
    const lng = ((saveJSON) ? saveJSON : 'en');
    callback(lng);
  },
  init: () => {},
  cacheUserLanguage: async (lng: LanguageType) => {
    await saveLanguage(lng);
  }
}

i18n.use(languageDetector)
.use(initReactI18next)
.init<TranslationResource>({
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources: resources,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
