import { en, TranslationType } from './en';

type LanguageCode = 'en' | 'fa' | 'ar' | 'es' | 'pt' | 'id' | 'fr' | 'de' | 'tr';

const translations: Record<LanguageCode, TranslationType> = {
  en,
  // Future languages can be added here
  // fa: faTranslations,
  // ar: arTranslations,
  // es: esTranslations,
  // pt: ptTranslations,
  // id: idTranslations,
  // fr: frTranslations,
  // de: deTranslations,
  // tr: trTranslations,
};

export type { LanguageCode };

class I18nService {
  private language: LanguageCode = 'en';

  setLanguage(lang: LanguageCode) {
    if (translations[lang]) {
      this.language = lang;
      localStorage.setItem('language', lang);
    }
  }

  getLanguage(): LanguageCode {
    const stored = localStorage.getItem('language') as LanguageCode;
    if (stored && translations[stored]) {
      return stored;
    }
    return 'en';
  }

  getTranslation(key: string): string {
    const keys = key.split('.');
    let value: unknown = translations[this.language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        // Fallback to English
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = (value as Record<string, unknown>)[fallbackKey];
          } else {
            return key;
          }
        }
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  }

  t(key: string): string {
    return this.getTranslation(key);
  }
}

export const i18n = new I18nService();

export const useTranslation = () => ({
  t: (key: string) => i18n.t(key),
  language: i18n.getLanguage(),
  setLanguage: (lang: LanguageCode) => i18n.setLanguage(lang),
});
