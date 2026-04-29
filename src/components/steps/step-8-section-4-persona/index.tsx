'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

export default function Step8Section4Persona({ isActive, onComplete }: StepProps) {
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <div className="relative w-full h-full" style={{ background: '#F9F9F9' }}>
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
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              color: '#25272C',
              margin: 0,
            }}
          >
            In progress
          </h4>
        </div>

        <NextButton onClick={advance} />
      </div>
    </div>
  );
}
