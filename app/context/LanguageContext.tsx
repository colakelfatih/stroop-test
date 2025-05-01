import React, { createContext, useContext, useState } from 'react';
import { Language, translations } from './translations';
import * as Localization from 'expo-localization';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Cihaz dilini desteklenen dillere dönüştür
const getDeviceLanguage = (): Language => {
  const deviceLocale = Localization.locale.split('-')[0]; // 'tr-TR' -> 'tr'
  switch (deviceLocale) {
    case 'tr':
      return 'tr';
    case 'de':
      return 'de';
    default:
      return 'en'; // Varsayılan olarak İngilizce
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(getDeviceLanguage());

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 