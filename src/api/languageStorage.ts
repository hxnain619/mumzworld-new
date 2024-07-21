import { LanguageType } from '@assets/translations/language';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_STORAGE_KEY = 'language';

export const loadLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return language !== null ? language : 'en'; // Default to 'en' if language is not set
  } catch (error) {
    console.error('Error loading language from AsyncStorage:', error);
    return 'en'; // Fallback to default language on error
  }
};

export const saveLanguage = async (language: LanguageType) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language to AsyncStorage:', error);
  }
};
