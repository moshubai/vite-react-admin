import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { languageKeys } from './languageKeys';
import { en, vi } from './languages';

const languages = {
  tieng_viet: 'vi',
  tieng_anh: 'en',
};

const resources = {
  [languages.tieng_anh]: {
    translation: en,
  },
  [languages.tieng_viet]: {
    translation: vi,
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: resources,
    fallbackLng: languages.tieng_viet,
    detection: {
      order: ['localStorage'],
    },
  });

export { languages, languageKeys, i18n as default };
