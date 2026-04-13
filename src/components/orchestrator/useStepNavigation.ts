'use client';

import { useState, useCallback } from 'react';
import { STEPS } from '@/types/steps';

export function useStepNavigation() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const stepConfig = STEPS[currentStep - 1];

  return {
    currentStep,
    stepConfig,
    totalSteps: STEPS.length,
    goToNext,
    goToPrev,
  };
}
