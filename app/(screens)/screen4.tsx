import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import StroopScreen from '../../components/StroopScreen';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth * 0.98;
const imageHeight = imageWidth * 0.45;

export default function Screen4() {
  return (
    <StroopScreen 
      screenNumber={4} 
      nextScreen="/(screens)/screen5" 
      title="Stroop Test - Screen 4"
      customContent={
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Bölüm IV: Renk İsmi Olmayan Kelime Rengi Söyleme</Text>
          <Image 
            source={require('../../assets/images/stroop4.png')} 
            style={[styles.image, { width: imageWidth, height: imageHeight }]}
            resizeMode="contain"
          />
          <Text style={styles.instructions}>
            Kelime renklerini sırayla söyleyiniz.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  contentTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  image: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 11,
    textAlign: 'center',
    color: '#555',
    marginBottom: 2,
  }
}); 