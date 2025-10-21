import i18next from 'i18next';
import fa from './locales/fa';
import en from './locales/en';
i18next.init({
  lng: 'fa',
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: false,
  resources: {
    en: en,
    fa: fa,
  },
});
export { i18next };
