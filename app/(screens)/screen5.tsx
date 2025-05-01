import React from 'react';
import StroopScreen from '../../components/StroopScreen';

export default function Screen5() {
  return (
    <StroopScreen 
      screenNumber={5} 
      nextScreen="/(screens)/summary" 
      title="Stroop Test - Screen 5" 
    />
  );
} 