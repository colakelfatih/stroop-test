import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Share } from 'react-native';
import { useStroop } from '../context/StroopContext';
import { useRouter } from 'expo-router';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function SummaryScreen() {
  const { screenData, resetData } = useStroop();
  const { t } = useLanguage();
  const router = useRouter();

  // Format time as mm:ss:ms
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    resetData();
    router.push('/(screens)/screen1' as any);
  };

  const totalCorrections = Object.values(screenData).reduce((sum, data) => sum + data.corrections, 0);
  const totalErrors = Object.values(screenData).reduce((sum, data) => sum + data.errors, 0);
  const totalTime = Object.values(screenData).reduce((sum, data) => sum + data.time, 0);

  const exportToExcel = async () => {
    try {
      // Excel başlıkları
      const headers = [
        t('screen'),
        t('time'),
        t('corrections'),
        t('errors')
      ].join('\t');

      // Her ekran için verileri topla
      const rows = Object.entries(screenData).map(([screen, data]) => {
        return [
          screen,
          data.time || 0,
          data.corrections || 0,
          data.errors || 0
        ].join('\t');
      });

      // Tüm verileri birleştir
      const csvContent = [headers, ...rows].join('\n');

      // Dosyayı paylaş
      await Share.share({
        message: csvContent,
        title: 'Stroop Test Results',
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LanguageSwitcher />
      
      <Text style={styles.title}>{t('results')}</Text>

      {[1, 2, 3, 4, 5].map((screenNum) => (
        <View key={screenNum} style={styles.screenResult}>
          <Text style={styles.screenTitle}>{t('screen')} {screenNum}</Text>
          <View style={styles.resultRow}>
            <Text style={styles.label}>{t('time')}:</Text>
            <Text style={styles.value}>{formatTime(screenData[screenNum].time)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.label}>{t('corrections')}:</Text>
            <Text style={styles.value}>{screenData[screenNum].corrections}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.label}>{t('errors')}:</Text>
            <Text style={styles.value}>{screenData[screenNum].errors}</Text>
          </View>
        </View>
      ))}

      <View style={styles.totalResults}>
        <Text style={styles.totalTitle}>{t('totalResults')}</Text>
        <View style={styles.resultRow}>
          <Text style={styles.labelResult}>{t('totalTime')}:</Text>
          <Text style={styles.value}>{formatTime(totalTime)}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.labelResult}>{t('totalCorrections')}:</Text>
          <Text style={styles.value}>{totalCorrections}</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.labelResult}>{t('totalErrors')}:</Text>
          <Text style={styles.value}>{totalErrors}</Text>
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>{t('startNewTest')}</Text>
      </Pressable>

      <Pressable style={styles.exportButton} onPress={exportToExcel}>
        <Text style={styles.buttonText}>{t('exportToExcel')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  screenResult: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  labelResult: {
    fontSize: 16,
    color: '#fff',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
  },
  totalResults: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exportButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
}); 