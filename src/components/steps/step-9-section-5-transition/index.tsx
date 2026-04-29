'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const N950 = '#25272C';
const BG = '#F9F9F9';

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

export default function Step9Section5Transition({ isActive, onComplete }: StepProps) {
  const [beat, setBeat] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const t1 = setTimeout(() => setBeat(1), 300);
    const t2 = setTimeout(() => setBeat(2), 900);
    const t3 = setTimeout(() => setBeat(3), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="relative w-full h-full" style={{ background: BG }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition:
            'opacity 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 32px',
          }}
        >
          <h1
            aria-live="polite"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.15,
              color: N950,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: 280,
              opacity: beat >= 1 ? 1 : 0,
              transform: beat >= 1 ? 'translateY(0)' : 'translateY(24px)',
              transition:
                'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            So what does a real solution look like?
          </h1>
        </div>

        <NextButton onClick={advance} visible={beat >= 3} />
      </div>
    </div>
  );
}
