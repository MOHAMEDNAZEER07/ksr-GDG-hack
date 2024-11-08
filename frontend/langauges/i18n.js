import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '../langauges/English.json';
import tamil from '../langauges/Tamil.json';
import 'intl-pluralrules';


i18n.use(initReactI18next).init({
    lng: 'en', // Set default language to 'en'
    fallbackLng: 'en', // Fallback language if the current language is not available
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: english, // Adjusted to use the correct key for translation resources
      },
      ta: {
        translation: tamil, // Adjusted to use the correct key for translation resources
      },
    },
    interpolation: {
      escapeValue: false, // React already safeguards against XSS
    },
});

export default i18n;