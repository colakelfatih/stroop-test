import { Stack } from 'expo-router';
import { StroopProvider } from '../context/StroopContext';
import { LanguageProvider } from '../context/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function ScreensLayout() {
  return (
    <LanguageProvider>
      <StroopProvider>
        <Stack>
          <Stack.Screen name="screen1" options={{ title: 'Ekran 1', headerShown: true, headerRight: () => <LanguageSwitcher /> }} />
          <Stack.Screen name="screen2" options={{ title: 'Ekran 2', headerShown: true, headerRight: () => <LanguageSwitcher /> }} />
          <Stack.Screen name="screen3" options={{ title: 'Ekran 3', headerShown: true, headerRight: () => <LanguageSwitcher /> }} />
          <Stack.Screen name="screen4" options={{ title: 'Ekran 4', headerShown: true, headerRight: () => <LanguageSwitcher /> }} />
          <Stack.Screen name="screen5" options={{ title: 'Ekran 5', headerShown: true, headerRight: () => <LanguageSwitcher /> }} />
          <Stack.Screen name="summary" options={{ title: 'Sonuçlar', headerShown: true, headerRight: () => <LanguageSwitcher /> }} />
        </Stack>
      </StroopProvider>
    </LanguageProvider>
  );
} 