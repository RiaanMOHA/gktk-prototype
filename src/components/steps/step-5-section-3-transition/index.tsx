'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  n100: '#EDEEF1',
  n600: '#5B616E',
  amber: '#FBB931',
};

const GENTLE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

const playKeyframes = async (
  el: HTMLDivElement | null,
  kf: Keyframe[],
  opts: KeyframeAnimationOptions
) => {
  if (!el) return;
  await el.animate(kf, opts).finished;
};

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function GhostBridge() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        paddingTop: 'calc(48px + env(safe-area-inset-top, 0px))',
        paddingBottom: 'calc(90px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div style={{ marginBottom: 20, paddingLeft: 4 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: C.amber }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, background: C.amber }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, background: C.amber }} />
          <div style={{ width: 24, height: 6, borderRadius: 3, background: C.amber }} />
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          background: '#F9F9F9',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
          borderRadius: 20,
          overflow: 'hidden',
          padding: 28,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: 8,
            background: C.n100,
            border: '1px solid rgba(0,0,0,0.06)',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: C.n600,
              letterSpacing: '0.02em',
            }}
          >
            thesis
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: C.n600,
            letterSpacing: '0.015em',
            margin: 0,
          }}
        >
          High-income engineers need housing. That is the opportunity.
        </p>
      </div>
    </div>
  );
}

export default function Step5Section3Transition({ isActive, onComplete }: StepProps) {
  const [phase, setPhase] = useState<'ready' | 'closing' | 'opening' | 'done'>('ready');
  const ghostRef = useRef<HTMLDivElement>(null);
  const topBandRef = useRef<HTMLDivElement>(null);
  const botBandRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const completed = useRef(false);

  const runShutter = useCallback(async () => {
    if (phase !== 'ready') return;
    setPhase('closing');

    await playKeyframes(
      ghostRef.current,
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.6, transform: 'scale(0.99)' },
        { opacity: 0.3, transform: 'scale(0.98)' },
        { opacity: 0, transform: 'scale(0.96)' },
      ],
      { duration: 600, easing: GENTLE, fill: 'forwards' }
    );

    await wait(200);

    void playKeyframes(
      topBandRef.current,
      [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0%)' }],
      { duration: 750, easing: GENTLE, fill: 'forwards' }
    );
    await playKeyframes(
      botBandRef.current,
      [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
      { duration: 750, easing: GENTLE, fill: 'forwards' }
    );

    await playKeyframes(
      seamRef.current,
      [
        { opacity: 0 },
        { opacity: 0.6 },
        { opacity: 0.8 },
        { opacity: 0.6 },
        { opacity: 0 },
      ],
      { duration: 500, easing: 'ease-in-out', fill: 'forwards' }
    );

    await wait(150);

    setPhase('opening');
    void playKeyframes(
      topBandRef.current,
      [{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }],
      { duration: 650, easing: GENTLE, fill: 'forwards' }
    );
    await playKeyframes(
      botBandRef.current,
      [{ transform: 'translateY(0%)' }, { transform: 'translateY(100%)' }],
      { duration: 650, easing: GENTLE, fill: 'forwards' }
    );

    await wait(200);
    setPhase('done');
    if (!completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [phase, onComplete]);

  useEffect(() => {
    completed.current = false;
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      data-step-5
      className="relative w-full h-full"
      style={{ background: C.bg, overflow: 'hidden' }}
    >
      <div ref={ghostRef} style={{ position: 'absolute', inset: 0 }}>
        <GhostBridge />
      </div>

      <div
        ref={topBandRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: C.n100,
          transform: 'translateY(-100%)',
          zIndex: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      />

      <div
        ref={botBandRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: C.n100,
          transform: 'translateY(100%)',
          zIndex: 20,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        }}
      />

      <div
        ref={seamRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 2,
          transform: 'translateY(-50%)',
          background: C.amber,
          opacity: 0,
          zIndex: 25,
        }}
      />

      <NextButton onClick={runShutter} visible={phase === 'ready'} />
    </div>
  );
}
