'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  heading: '#25272C',
  body: '#40444C',
  amber: '#FBB931',
  bg: '#F9F9F9',
};

const HOLD_DURATION_MS = 1200;
const DECAY_DURATION_MS = 400;
const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

export default function Step1OpeningTransition({ isActive, onComplete }: StepProps) {
  const [progress, setProgress] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const raf = useRef<number | null>(null);
  const startT = useRef<number | null>(null);
  const prog = useRef(0);

  const startPress = useCallback(() => {
    if (done) return;
    setPressing(true);
    startT.current = performance.now() - (prog.current / 100) * HOLD_DURATION_MS;
    const tick = (now: number) => {
      if (startT.current == null) return;
      const p = Math.min((now - startT.current) / HOLD_DURATION_MS, 1);
      prog.current = p * 100;
      setProgress(p * 100);
      if (p >= 1) {
        setDone(true);
        setTimeout(() => setExiting(true), EXIT_DELAY_MS);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [done]);

  const endPress = useCallback(() => {
    setPressing(false);
    if (raf.current) cancelAnimationFrame(raf.current);
    if (done) return;
    const sp = prog.current;
    const t0 = performance.now();
    const decay = (now: number) => {
      const p = Math.max(sp - ((now - t0) / DECAY_DURATION_MS) * sp, 0);
      prog.current = p;
      setProgress(p);
      if (p > 0.1) {
        raf.current = requestAnimationFrame(decay);
      } else {
        prog.current = 0;
        setProgress(0);
      }
    };
    raf.current = requestAnimationFrame(decay);
  }, [done]);

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [exiting, onComplete]);

  if (!isActive) return null;

  const ringCirc = 2 * Math.PI * 36;

  return (
    <div
      data-step-1
      className="relative w-full h-full"
      style={{ background: C.bg }}
    >
      <style>{`
        [data-step-1] {
          --s1-fav: 128px;
          --s1-heading: 18px;
          --s1-caption: 16px;
          --s1-btn: 88px;
          --s1-chev: 22px;
          --s1-bottom: 48px;
        }
        @media (min-width: 768px) {
          [data-step-1] {
            --s1-fav: 160px;
            --s1-heading: 20px;
            --s1-caption: 18px;
            --s1-btn: 96px;
            --s1-chev: 24px;
            --s1-bottom: 64px;
          }
        }
        @media (min-width: 1200px) {
          [data-step-1] {
            --s1-fav: 192px;
            --s1-heading: 22px;
            --s1-caption: 20px;
            --s1-btn: 112px;
            --s1-chev: 28px;
            --s1-bottom: 80px;
          }
        }
      `}</style>

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
        {/* Logo + heading centered */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'env(safe-area-inset-top)',
          }}
        >
          <img
            src="/logos-and-icons/favicon.svg"
            alt="MoreHarvest"
            style={{
              display: 'block',
              width: 'var(--s1-fav)',
              height: 'var(--s1-fav)',
            }}
          />
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--s1-heading)',
              fontWeight: 600,
              color: C.heading,
              margin: '20px 0 0',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
            }}
          >
            Enter MoreHarvest world
          </h1>
        </div>

        {/* Bottom cluster — 48px from bottom of screen */}
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(var(--s1-bottom) + env(safe-area-inset-bottom))',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            onMouseDown={startPress}
            onMouseUp={endPress}
            onMouseLeave={endPress}
            onTouchStart={(e) => {
              e.preventDefault();
              startPress();
            }}
            onTouchEnd={endPress}
            onTouchCancel={endPress}
            role="button"
            aria-label="Hold to enter"
            style={{
              position: 'relative',
              width: 'var(--s1-btn)',
              height: 'var(--s1-btn)',
              cursor: 'pointer',
              transform: pressing ? 'scale(0.92)' : 'scale(1)',
              transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              touchAction: 'none',
            }}
          >
            {/* Glass circle background */}
            <div
              style={{
                position: 'absolute',
                inset: 4,
                borderRadius: '50%',
                background: C.bg,
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            />

            {/* Progress ring */}
            <svg
              viewBox="0 0 88 88"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                transform: 'rotate(-90deg)',
                pointerEvents: 'none',
              }}
            >
              <circle
                cx={44}
                cy={44}
                r={36}
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth={3}
              />
              <circle
                cx={44}
                cy={44}
                r={36}
                fill="none"
                stroke={C.amber}
                strokeWidth={3}
                strokeDasharray={ringCirc}
                strokeDashoffset={ringCirc - (progress / 100) * ringCirc}
                strokeLinecap="round"
              />
            </svg>

            {/* Chevron */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                style={{ width: 'var(--s1-chev)', height: 'var(--s1-chev)' }}
              >
                <path
                  d="M7.5 4L13.5 10L7.5 16"
                  stroke={C.heading}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--s1-caption)',
              color: C.body,
              marginTop: 20,
            }}
          >
            Hold to enter
          </p>
        </div>
      </div>
    </div>
  );
}
