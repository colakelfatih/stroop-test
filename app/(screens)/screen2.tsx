import React from 'react';
import StroopScreen from '../../components/StroopScreen';

export default function Screen2() {
  return (
    <StroopScreen 
      screenNumber={2} 
      nextScreen="/(screens)/screen3" 
      title="Stroop Test - Screen 2" 
    />
  );
} 