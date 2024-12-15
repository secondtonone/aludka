import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: !import.meta.env.PROD,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
