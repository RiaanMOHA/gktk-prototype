'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapHost } from '../../shared/MapHost';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  heading: '#25272C',
  body: '#40444C',
  caption: '#5B616E',
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
  const [phase, setPhase] = useState<'descending' | 'resolved' | 'exiting'>('descending');
  const completedRef = useRef(false);

  const resolveRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const tapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const advance = useCallback(() => {
    setPhase((p) => (p === 'exiting' ? p : 'exiting'));
  }, []);

  // Run the descent + flash + reveal pipeline against the shared
  // MapHost. Because the iframe is the SAME one step-6 was using,
  // the user sees no blank-screen reload between steps 6 and 7.
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
          { duration: 800, easing: GENTLE }
        );
      }
      if (cancelled) return;
      await wait(300);
      if (cancelled) return;

      const res = resolveRef.current;
      const h = headingRef.current;
      const b = bodyRef.current;
      const tap = tapRef.current;
      if (res) {
        await animate(
          res,
          [
            { opacity: 0, transform: 'translateY(30px) scale(0.97)' },
            { opacity: 0.4, transform: 'translateY(15px) scale(0.985)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 700, easing: GENTLE }
        );
      }
      if (cancelled) return;
      await wait(200);
      if (h) {
        await animate(
          h,
          [
            { opacity: 0, transform: 'translateY(12px) scale(0.94)' },
            { opacity: 0.6, transform: 'translateY(5px) scale(0.98)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 600, easing: GENTLE }
        );
      }
      if (cancelled) return;
      await wait(150);
      if (b) {
        await animate(
          b,
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 450, easing: GENTLE }
        );
      }
      if (cancelled) return;
      await wait(300);
      if (tap) {
        animate(tap, [{ opacity: 0 }, { opacity: 1 }], {
          duration: 400,
          easing: GENTLE,
        });
      }
      if (cancelled) return;
      setPhase('resolved');
    })();

    return () => {
      cancelled = true;
    };
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
      {/* Light wash that hands the descent off to the resolve panel.
          Sits above the MapHost (z=0) but below the panel (z=12). */}
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

      <div
        ref={resolveRef}
        onClick={phase === 'resolved' ? advance : undefined}
        role={phase === 'resolved' ? 'button' : undefined}
        aria-label={phase === 'resolved' ? 'Continue' : undefined}
        tabIndex={phase === 'resolved' ? 0 : -1}
        onKeyDown={(e) => {
          if (phase !== 'resolved') return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            advance();
          }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 12,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 24px',
          background: C.bg,
          opacity: 0,
          cursor: phase === 'resolved' ? 'pointer' : 'default',
        }}
      >
        <div
          style={{
            background: '#F9F9F9',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: 28,
            padding: '28px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div
            ref={headingRef}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: C.heading,
              marginBottom: 12,
              opacity: 0,
            }}
          >
            3 to 5 million yen
          </div>
          <div
            ref={bodyRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.6,
              color: C.body,
              maxWidth: '72ch',
              opacity: 0,
            }}
          >
            Estimated replacement cost per engineer who repatriates early due to family maladjustment.
          </div>
        </div>
      </div>

      <div
        ref={tapRef}
        style={{
          position: 'absolute',
          bottom: 'calc(48px + env(safe-area-inset-bottom, 0px))',
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: C.caption,
            letterSpacing: '0.01em',
          }}
        >
          Tap to continue
        </div>
      </div>
    </div>
  );
}
