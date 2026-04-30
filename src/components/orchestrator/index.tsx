'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useStepNavigation } from './useStepNavigation';
import { DevQaChrome } from './DevQaChrome';
import { StepNav } from './StepNav';
import { MapHostProvider } from '../shared/MapHost';
import { PropertyMapHostProvider } from '../shared/PropertyMapHost';

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
  const { currentStep, totalSteps, goToNext, goToPrev, goToStep, goToPrevContent } =
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
      onBack={goToPrevContent}
    />
  );

  // MapHost is rendered for steps 5–7 so it preloads during the
  // step-5 transition, stays alive across the step-6 map, and
  // continues into step-7's descent — eliminating the "blank map
  // loading" frames the user used to see at each boundary.
  const mapVisible = currentStep >= 5 && currentStep <= 7;

  // PropertyMapHost mirrors that pattern for steps 11–13: the
  // property-map iframe preloads during step-11's tilt transition,
  // stays alive across the step-12 boundary so the user never sees
  // a reload, and remains live through step 13 so the lift transition
  // animates the actual map at its current state, not a duplicate.
  const propertyMapVisible = currentStep >= 11 && currentStep <= 13;

  // Steps 6 and 12 render no foreground content; the prototype's
  // nav arrows and sheet live inside the iframe behind them. Make
  // the wrapping div transparent to clicks on those steps so the
  // forward/back arrows remain reachable. Other steps capture
  // clicks normally.
  const wrapperStyle =
    currentStep === 6 || currentStep === 12
      ? ({ pointerEvents: 'none' } as const)
      : undefined;

  if (!IS_DEV) {
    return (
      <MapHostProvider visible={mapVisible}>
        <PropertyMapHostProvider visible={propertyMapVisible}>
          <div
            className="relative w-screen h-screen overflow-hidden"
            style={wrapperStyle}
          >
            {stepEl}
          </div>
        </PropertyMapHostProvider>
      </MapHostProvider>
    );
  }

  if (mode === 'loading') return null;

  const stepWithNav = (
    <MapHostProvider visible={mapVisible}>
      <PropertyMapHostProvider visible={propertyMapVisible}>
        <div
          className="relative w-screen h-screen overflow-hidden"
          style={wrapperStyle}
        >
          {stepEl}
        </div>
        <StepNav
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrev={goToPrev}
          onNext={goToNext}
          onJumpTo={goToStep}
          onReload={reloadStep}
        />
      </PropertyMapHostProvider>
    </MapHostProvider>
  );

  if (mode === 'preview') {
    return stepWithNav;
  }

  return <DevQaChrome>{stepWithNav}</DevQaChrome>;
}
