import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StroopScreen from '../../components/StroopScreen';

export default function Screen3() {
  return (
    <StroopScreen 
      screenNumber={3} 
      nextScreen="/(screens)/screen4" 
      title="Stroop Test - Screen 3"
      customContent={
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Bölüm III: Şekil Rengi Söyleme</Text>
          <Image 
            source={require('../../assets/images/stroop3.png')} 
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 8,
  }
}); 