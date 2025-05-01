export type Language = 'en' | 'tr' | 'de';

export interface Translations {
  screenTitle: string;
  corrections: string;
  errors: string;
  pause: string;
  resume: string;
  finish: string;
  nextScreen: string;
  start: string;
  summary: string;
  startNewTest: string;
  exportToExcel: string;
  screen: string;
  time: string;
  results: string;
  totalResults: string;
  totalTime: string;
  totalCorrections: string;
  totalErrors: string;
  warning: string;
  startTestFirst: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    screenTitle: 'Screen',
    corrections: 'Corrections',
    errors: 'Errors',
    pause: 'Pause',
    resume: 'Resume',
    finish: 'Finish',
    nextScreen: 'Next Screen',
    start: 'Start',
    summary: 'Summary',
    startNewTest: 'Start New Test',
    exportToExcel: 'Export to Excel',
    screen: 'Screen',
    time: 'Time',
    results: 'Results',
    totalResults: 'Total Results',
    totalTime: 'Total Time',
    totalCorrections: 'Total Corrections',
    totalErrors: 'Total Errors',
    warning: 'Warning',
    startTestFirst: 'Please start the test first',
  },
  tr: {
    screenTitle: 'Ekran',
    corrections: 'Düzeltmeler',
    errors: 'Hatalar',
    pause: 'Duraklat',
    resume: 'Devam Et',
    finish: 'Bitir',
    nextScreen: 'Sonraki Ekran',
    start: 'Başlat',
    summary: 'Özet',
    startNewTest: 'Yeni Test Başlat',
    exportToExcel: 'Excel\'e Aktar',
    screen: 'Ekran',
    time: 'Süre',
    results: 'Sonuçlar',
    totalResults: 'Toplam Sonuçlar',
    totalTime: 'Toplam Süre',
    totalCorrections: 'Toplam Düzeltmeler',
    totalErrors: 'Toplam Hatalar',
    warning: 'Uyarı',
    startTestFirst: 'Lütfen önce testi başlatın',
  },
  de: {
    screenTitle: 'Bildschirm',
    corrections: 'Korrekturen',
    errors: 'Fehler',
    pause: 'Pause',
    resume: 'Fortsetzen',
    finish: 'Beenden',
    nextScreen: 'Nächster Bildschirm',
    start: 'Start',
    summary: 'Zusammenfassung',
    startNewTest: 'Neuen Test starten',
    exportToExcel: 'Nach Excel exportieren',
    screen: 'Bildschirm',
    time: 'Zeit',
    results: 'Ergebnisse',
    totalResults: 'Gesamtergebnisse',
    totalTime: 'Gesamtzeit',
    totalCorrections: 'Gesamtdüzeltmeler',
    totalErrors: 'Gesamthatalar',
    warning: 'Warnung',
    startTestFirst: 'Bitte starten Sie zuerst den Test',
  },
}; 
