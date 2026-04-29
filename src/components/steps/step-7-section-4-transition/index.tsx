'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapHost } from '../../shared/MapHost';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
};

const GENTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
const EXIT_DURATION_MS = 350;

const animate = (
  el: HTMLElement | null,
  kf: Keyframe[],
  opts: KeyframeAnimationOptions
) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: 'forwards', ...opts }).finished;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Step7Section4Transition({ isActive, onComplete }: StepProps) {
  const mapHost = useMapHost();
  const [phase, setPhase] = useState<'descending' | 'exiting'>('descending');
  const completedRef = useRef(false);

  const flashRef = useRef<HTMLDivElement>(null);

  const advance = useCallback(() => {
    setPhase((p) => (p === 'exiting' ? p : 'exiting'));
  }, []);

  // Run the descent + flash pipeline against the shared MapHost.
  // Because the iframe is the SAME one step-6 was using, the user
  // sees no blank-screen reload between steps 6 and 7.
  useEffect(() => {
    if (!isActive || !mapHost) return;
    mapHost.setChromeless(true);

    let cancelled = false;
    (async () => {
      // If the iframe loaded long ago (we entered step-7 from step-6)
      // it's already ready and runDescent runs immediately. If we
      // somehow reach step-7 with no map yet (e.g. dev jump), give
      // the iframe a moment to mark itself ready before descending.
      if (!mapHost.isReady) await wait(200);
      if (cancelled) return;
      await mapHost.runDescent();
      if (cancelled) return;

      const flash = flashRef.current;
      if (flash) {
        await animate(
          flash,
          [
            { opacity: 0 },
            { opacity: 0.7, offset: 0.35 },
            { opacity: 0.9, offset: 0.6 },
            { opacity: 1 },
          ],
          { duration: 400, easing: GENTLE }
        );
      }
      if (cancelled) return;
      await wait(100);
      if (cancelled) return;
      advance();
    })();

    return () => {
      cancelled = true;
    };
    // advance is stable (useCallback with empty deps) — referencing it inside
    // the async pipeline does not require it in the dependency list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, mapHost]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const t = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  // When step-7 unmounts (we've moved to step-8), reset the scene
  // transform so a future return to step-6 doesn't see a tilted map.
  useEffect(() => {
    return () => {
      mapHost?.resetScene();
      mapHost?.setChromeless(false);
    };
  }, [mapHost]);

  if (!isActive) return null;

  return (
    <div
      data-step-7
      className="relative w-full h-full"
      style={{
        background: 'transparent',
        opacity: phase === 'exiting' ? 0 : 1,
        transform: phase === 'exiting' ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity ${EXIT_DURATION_MS}ms ${GENTLE}, transform ${EXIT_DURATION_MS}ms ${GENTLE}`,
      }}
    >
      <div
        ref={flashRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          opacity: 0,
          background: C.bg,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
