import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StroopScreen from '../../components/StroopScreen';

export default function Screen2() {
  return (
    <StroopScreen 
      screenNumber={2} 
      nextScreen="/(screens)/screen3" 
      title="Stroop Test - Screen 2"
      customContent={
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Bölüm II: Renkli Basılmış Renk İsmi Okuma</Text>
          <Image 
            source={require('../../assets/images/stroop2.png')} 
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