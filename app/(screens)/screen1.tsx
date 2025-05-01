import React from 'react';
import StroopScreen from '../../components/StroopScreen';

export default function Screen1() {
  return (
    <StroopScreen 
      screenNumber={1} 
      nextScreen="/(screens)/screen2" 
      title="Stroop Test - Screen 1" 
    />
  );
} 