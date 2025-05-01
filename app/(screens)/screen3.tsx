import React from 'react';
import StroopScreen from '../../components/StroopScreen';

export default function Screen3() {
  return (
    <StroopScreen 
      screenNumber={3} 
      nextScreen="/(screens)/screen4" 
      title="Stroop Test - Screen 3" 
    />
  );
} 