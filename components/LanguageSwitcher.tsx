import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useLanguage } from '../app/context/LanguageContext';
import { Language } from '../app/context/translations';

// React Native için Picker
import { Picker } from '@react-native-picker/picker';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue: Language) => setLanguage(itemValue)}
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor="#333"
      >
        <Picker.Item label="TR" value="tr" />
        <Picker.Item label="EN" value="en" />
        <Picker.Item label="DE" value="de" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 10 : 40,
    right: 10,
    zIndex: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 70,
  },
  picker: {
    height: 32,
    width: 70,
    fontSize: 13,
    color: '#333',
    backgroundColor: 'transparent',
  },
}); 