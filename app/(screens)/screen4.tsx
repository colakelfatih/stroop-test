import React from 'react';
import StroopScreen from '../../components/StroopScreen';

export default function Screen4() {
  return (
    <StroopScreen 
      screenNumber={4} 
      nextScreen="/(screens)/screen5" 
      title="Stroop Test - Screen 4" 
    />
  );
} 