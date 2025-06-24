import { useRouter } from 'expo-router';
import React, { useState, ReactNode } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLanguage } from '../app/context/LanguageContext';
import { useStroop } from '../app/context/StroopContext';
import Chronometer from './Chronometer';
import LanguageSwitcher from './LanguageSwitcher';

interface StroopScreenProps {
  screenNumber: number;
  nextScreen: string;
  title: string;
  customContent?: ReactNode;
}

export default function StroopScreen({ screenNumber, nextScreen, title, customContent }: StroopScreenProps) {
  const [chronometerActive, setChronometerActive] = useState(false);
  const [corrections, setCorrections] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const { updateScreenData } = useStroop();
  const { t } = useLanguage();
  const router = useRouter();

  const handleTimeUpdate = (time: number) => {
    updateScreenData(screenNumber, { time });
  };

  const startTest = () => {
    setChronometerActive(true);
    setIsStarted(true);
  };

  const incrementCorrections = () => {
    if (!isStarted) {
      Alert.alert(t('warning'), t('startTestFirst'));
      return;
    }
    const newValue = corrections + 1;
    setCorrections(newValue);
    updateScreenData(screenNumber, { corrections: newValue });
  };

  const decrementCorrections = () => {
    if (!isStarted) {
      Alert.alert(t('warning'), t('startTestFirst'));
      return;
    }
    const newValue = Math.max(0, corrections - 1);
    setCorrections(newValue);
    updateScreenData(screenNumber, { corrections: newValue });
  };

  const incrementErrors = () => {
    if (!isStarted) {
      Alert.alert(t('warning'), t('startTestFirst'));
      return;
    }
    const newValue = errors + 1;
    setErrors(newValue);
    updateScreenData(screenNumber, { errors: newValue });
  };

  const decrementErrors = () => {
    if (!isStarted) {
      Alert.alert(t('warning'), t('startTestFirst'));
      return;
    }
    const newValue = Math.max(0, errors - 1);
    setErrors(newValue);
    updateScreenData(screenNumber, { errors: newValue });
  };

  const toggleChronometer = () => {
    setChronometerActive(!chronometerActive);
  };

  const completeTest = () => {
    setChronometerActive(false);
    setIsCompleted(true);
  };

  const handleNext = () => {
    router.push(nextScreen as any);
  };

  return (
    <ScrollView style={styles.container}>
      <LanguageSwitcher />
      
      <Text style={styles.title}>{`${t('screenTitle')} ${screenNumber}`}</Text>
      
      {/* Özel içerik */}
      {customContent}
      
      <View style={styles.chronometerContainer}>
        <Chronometer isActive={chronometerActive} onTimeUpdate={handleTimeUpdate} />
      </View>
      
      <View style={styles.inputsContainer}>
        <View style={styles.counterWrapper}>
          <Text style={styles.label}>{t('corrections')}:</Text>
          <View style={styles.counterContainer}>
            <Pressable 
              style={[
                styles.button, 
                styles.incrementButton,
                !isStarted && styles.disabledButton
              ]} 
              onPress={decrementCorrections}
            >
              <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.counterValue}>{corrections}</Text>
            <Pressable 
              style={[
                styles.button, 
                styles.incrementButton,
                !isStarted && styles.disabledButton
              ]} 
              onPress={incrementCorrections}
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>
        </View>
        
        <View style={styles.counterWrapper}>
          <Text style={styles.label}>{t('errors')}:</Text>
          <View style={styles.counterContainer}>
            <Pressable 
              style={[
                styles.button, 
                styles.incrementButton,
                !isStarted && styles.disabledButton
              ]} 
              onPress={decrementErrors}
            >
              <Text style={styles.buttonText}>-</Text>
            </Pressable>
            <Text style={styles.counterValue}>{errors}</Text>
            <Pressable 
              style={[
                styles.button, 
                styles.incrementButton,
                !isStarted && styles.disabledButton
              ]} 
              onPress={incrementErrors}
            >
              <Text style={styles.buttonText}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        {!isStarted ? (
          <Pressable style={[styles.button, styles.startButton]} onPress={startTest}>
            <Text style={styles.buttonText}>{t('start')}</Text>
          </Pressable>
        ) : !isCompleted ? (
          <>
            <Pressable 
              style={[styles.button, chronometerActive ? styles.pauseButton : styles.resumeButton]} 
              onPress={toggleChronometer}
            >
              <Text style={styles.buttonText}>
                {chronometerActive ? t('pause') : t('resume')}
              </Text>
            </Pressable>
            <Pressable style={[styles.button, styles.completeButton]} onPress={completeTest}>
              <Text style={styles.buttonText}>{t('finish')}</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {nextScreen === '/(screens)/summary' ? t('finish') : t('nextScreen')}
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  chronometerContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  inputsContainer: {
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    minWidth: 120,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    minWidth: 50,
    textAlign: 'center',
    color: '#2c3e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2ecc71',
    width: '80%',
  },
  pauseButton: {
    backgroundColor: '#e74c3c',
  },
  resumeButton: {
    backgroundColor: '#3498db',
  },
  completeButton: {
    backgroundColor: '#f39c12',
  },
  disabledButton: {
    opacity: 0.5,
  },
  incrementButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },
}); 