'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useStepNavigation } from './useStepNavigation';
import { DevQaChrome } from './DevQaChrome';
import { StepNav } from './StepNav';

const stepComponents = [
  dynamic(() => import('../steps/step-1-opening-transition')),
  dynamic(() => import('../steps/step-2-section-1-entry')),
  dynamic(() => import('../steps/step-3-section-2-transition')),
  dynamic(() => import('../steps/step-4-section-2-bridge')),
  dynamic(() => import('../steps/step-5-section-3-transition')),
  dynamic(() => import('../steps/step-6-section-3-map')),
  dynamic(() => import('../steps/step-7-section-4-transition')),
  dynamic(() => import('../steps/step-8-section-4-persona')),
  dynamic(() => import('../steps/step-9-section-5-transition')),
  dynamic(() => import('../steps/step-10-section-5-current-options')),
  dynamic(() => import('../steps/step-11-section-6-transition')),
  dynamic(() => import('../steps/step-12-section-6-product-hardware')),
  dynamic(() => import('../steps/step-13-section-7-transition')),
  dynamic(() => import('../steps/step-14-section-7-product-software')),
  dynamic(() => import('../steps/step-15-section-8-transition')),
  dynamic(() => import('../steps/step-16-section-8-financials')),
  dynamic(() => import('../steps/step-17-section-9-transition')),
  dynamic(() => import('../steps/step-18-section-9-risk-factors')),
  dynamic(() => import('../steps/step-19-section-10-transition')),
  dynamic(() => import('../steps/step-20-section-10-exit-strategy')),
];

const IS_DEV = process.env.NODE_ENV !== 'production';

export default function Orchestrator() {
  const { currentStep, totalSteps, goToNext, goToPrev, goToStep } =
    useStepNavigation();
  const [reloadKey, setReloadKey] = useState(0);
  const reloadStep = useCallback(() => setReloadKey((k) => k + 1), []);

  const [mode, setMode] = useState<'loading' | 'parent' | 'preview'>('loading');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const inPreview = params.get('preview') === '1';
    setMode(inPreview ? 'preview' : 'parent');
  }, []);

  const ActiveStep = stepComponents[currentStep - 1];
  const stepEl = (
    <ActiveStep
      key={`${currentStep}-${reloadKey}`}
      isActive={true}
      onComplete={goToNext}
    />
  );

  if (!IS_DEV) {
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        {stepEl}
      </div>
    );
  }

  if (mode === 'loading') return null;

  const stepWithNav = (
    <>
      <div className="relative w-screen h-screen overflow-hidden">{stepEl}</div>
      <StepNav
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrev={goToPrev}
        onNext={goToNext}
        onJumpTo={goToStep}
        onReload={reloadStep}
      />
    </>
  );

  if (mode === 'preview') {
    return stepWithNav;
  }

  return <DevQaChrome>{stepWithNav}</DevQaChrome>;
}
