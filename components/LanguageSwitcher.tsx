import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useLanguage } from '../app/context/LanguageContext';
import { Image } from 'expo-image';
import { Language } from '../app/context/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; flag: any }[] = [
    { code: 'tr', flag: require('../assets/flags/tr.png') },
    { code: 'en', flag: require('../assets/flags/us.png') },
    { code: 'de', flag: require('../assets/flags/de.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        {languages.map((lang) => (
          <Pressable
            key={lang.code}
            style={[
              styles.flagButton,
              language === lang.code && styles.selectedFlag,
            ]}
            onPress={() => setLanguage(lang.code)}
          >
            <Image
              source={lang.flag}
              style={styles.flag}
              contentFit="cover"
              transition={200}
              cachePolicy="memory-disk"
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  flagButton: {
    width: 48,
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    transform: [{ scale: 1 }],
  },
  selectedFlag: {
    borderColor: '#3498db',
    shadowColor: '#3498db',
    shadowOpacity: 0.4,
    elevation: 4,
    transform: [{ scale: 1.05 }],
  },
  flag: {
    width: '100%',
    height: '100%',
  },
}); 