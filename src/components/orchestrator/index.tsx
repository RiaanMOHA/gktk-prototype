'use client';

import dynamic from 'next/dynamic';
import { useStepNavigation } from './useStepNavigation';

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

export default function Orchestrator() {
  const { currentStep, stepConfig, totalSteps, goToNext, goToPrev } = useStepNavigation();

  const ActiveStep = stepComponents[currentStep - 1];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <ActiveStep isActive={true} onComplete={goToNext} />

      {/* Dev navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-chrome flex items-center justify-between px-4 py-2 bg-base-black/80 backdrop-blur-sm">
        <button
          onClick={goToPrev}
          disabled={currentStep === 1}
          className="px-3 py-1 text-sm font-body text-neutral-200 disabled:text-neutral-600"
        >
          Prev
        </button>
        <span className="text-sm font-body text-neutral-200">
          {currentStep}/{totalSteps} — {stepConfig.name}
        </span>
        <button
          onClick={goToNext}
          disabled={currentStep === totalSteps}
          className="px-3 py-1 text-sm font-body text-neutral-200 disabled:text-neutral-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
