import en from './en/en.json';
import ar from './ar/ar.json';

export type LanguageType = 'en' | 'ar';
export interface TranslationResource {
    en: {translation: typeof en},
    ar: {translation: typeof ar}
}