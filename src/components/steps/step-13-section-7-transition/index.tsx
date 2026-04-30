'use client';

import { useEffect, useRef } from 'react';
import { usePropertyMapHost } from '../../shared/PropertyMapHost';
import { IntroScreen } from '../step-14-section-7-product-software';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const LIFT_DURATION_MS = 2000;

const liftKeyframes: Keyframe[] = [
  { transform: 'perspective(900px) rotateX(0deg)', opacity: 1, offset: 0 },
  { transform: 'perspective(900px) rotateX(-1deg)', opacity: 1, offset: 0.05 },
  { transform: 'perspective(900px) rotateX(-2.5deg)', opacity: 1, offset: 0.10 },
  { transform: 'perspective(900px) rotateX(-4.5deg)', opacity: 1, offset: 0.16 },
  { transform: 'perspective(900px) rotateX(-7deg)', opacity: 1, offset: 0.22 },
  { transform: 'perspective(900px) rotateX(-10deg)', opacity: 0.98, offset: 0.28 },
  { transform: 'perspective(900px) rotateX(-14deg)', opacity: 0.96, offset: 0.34 },
  { transform: 'perspective(900px) rotateX(-19deg)', opacity: 0.93, offset: 0.40 },
  { transform: 'perspective(900px) rotateX(-25deg)', opacity: 0.88, offset: 0.46 },
  { transform: 'perspective(900px) rotateX(-32deg)', opacity: 0.80, offset: 0.52 },
  { transform: 'perspective(900px) rotateX(-40deg)', opacity: 0.70, offset: 0.58 },
  { transform: 'perspective(900px) rotateX(-49deg)', opacity: 0.56, offset: 0.64 },
  { transform: 'perspective(900px) rotateX(-58deg)', opacity: 0.40, offset: 0.70 },
  { transform: 'perspective(900px) rotateX(-66deg)', opacity: 0.26, offset: 0.77 },
  { transform: 'perspective(900px) rotateX(-74deg)', opacity: 0.14, offset: 0.84 },
  { transform: 'perspective(900px) rotateX(-81deg)', opacity: 0.06, offset: 0.92 },
  { transform: 'perspective(900px) rotateX(-88deg)', opacity: 0, offset: 1 },
];

export default function Step13Section7Transition({
  isActive,
  onComplete,
}: StepProps) {
  const propertyMapHost = usePropertyMapHost();
  const completedRef = useRef(false);

  // Lift the live property-map iframe wrapper. The iframe stays
  // mounted by PropertyMapHost across steps 11–13, so this animates
  // the actual map at whatever state the user left it in on step 12.
  // The step-14 intro is rendered behind the iframe and is gradually
  // revealed as the iframe rotates away.
  useEffect(() => {
    if (!isActive) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const wrapper = propertyMapHost?.getWrapper();
    let cancelled = false;
    let animation: Animation | null = null;

    // Raise the iframe above the step content during the lift, and
    // disable interaction so the user cannot drag the map mid-lift.
    // transform-origin + will-change are applied here (not on the
    // host's default wrapper) so they only exist while the lift is
    // active — leaving step 11/12's iframe hit-testing untouched.
    if (wrapper) {
      wrapper.style.zIndex = '5';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.transformOrigin = '50% 100%';
      wrapper.style.willChange = 'transform, opacity';
    }

    const finishOnce = () => {
      if (completedRef.current || cancelled) return;
      completedRef.current = true;
      onComplete();
    };

    const run = async () => {
      if (wrapper && !reduced) {
        animation = wrapper.animate(liftKeyframes, {
          duration: LIFT_DURATION_MS,
          easing: 'linear',
          fill: 'forwards',
        });
        try {
          await animation.finished;
        } catch {
          /* animation cancelled on unmount — fine */
        }
      } else if (wrapper) {
        wrapper.style.transform = 'perspective(900px) rotateX(-88deg)';
        wrapper.style.opacity = '0';
      }
      if (cancelled) return;
      finishOnce();
    };
    run();

    return () => {
      cancelled = true;
      animation?.cancel();
      // Reset the wrapper for back-nav: if the user returns to step
      // 11 or 12, the iframe should appear in its normal position
      // and not carry will-change (which creates a stacking context
      // that breaks the embedded sheet's hit-testing).
      if (wrapper) {
        wrapper.style.transform = '';
        wrapper.style.opacity = '';
        wrapper.style.zIndex = '';
        wrapper.style.pointerEvents = '';
        wrapper.style.transformOrigin = '';
        wrapper.style.willChange = '';
      }
    };
  }, [isActive, propertyMapHost, onComplete]);

  if (!isActive) return null;

  // Render the step-14 intro as the lift's destination. As the iframe
  // rotates away above, this is gradually revealed underneath.
  return <IntroScreen onContinue={() => {}} />;
}
