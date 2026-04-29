'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const AMBER = '#FBB931';
const N = {
  950: '#25272C',
  800: '#40444C',
  600: '#5B616E',
  200: '#D8DBDF',
  100: '#EDEEF1',
};

const SLIDE_TIMINGS = [200, 1800, 3400, 5000];
const SLIDE_DONE_DELAY_MS = 800;
const EXIT_DELAY_MS = 100;
const EXIT_DURATION_MS = 350;

const SLIDES: Array<{
  number: string | null;
  suffix: string | null;
  text: string;
  label: string;
}> = [
  {
    number: null,
    suffix: null,
    text: 'The COVID-era chip shortage exposed a hard truth.',
    label: 'context',
  },
  {
    number: '10',
    suffix: ' trillion',
    text: 'Japan is rebuilding its chip industry.',
    label: 'investment',
  },
  {
    number: '47,000',
    suffix: null,
    text: 'Jobs being created in Kumamoto alone.',
    label: 'workforce',
  },
  {
    number: null,
    suffix: null,
    text: 'High-income engineers need housing. That is the opportunity.',
    label: 'thesis',
  },
];

export default function Step4Section2Bridge({ isActive, onComplete }: StepProps) {
  const [activeSlide, setActiveSlide] = useState(-1);
  const [bridgeDone, setBridgeDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const slideTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;
    slideTimers.current = [
      setTimeout(() => setActiveSlide(0), SLIDE_TIMINGS[0]),
      setTimeout(() => setActiveSlide(1), SLIDE_TIMINGS[1]),
      setTimeout(() => setActiveSlide(2), SLIDE_TIMINGS[2]),
      setTimeout(() => setActiveSlide(3), SLIDE_TIMINGS[3]),
      setTimeout(() => setBridgeDone(true), SLIDE_TIMINGS[3] + SLIDE_DONE_DELAY_MS),
    ];
    return () => {
      slideTimers.current.forEach(clearTimeout);
    };
  }, [isActive]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  if (!isActive) return null;

  return (
    <div data-step-4 className="relative w-full h-full" style={{ background: '#F9F9F9' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'scale(0.97)' : 'scale(1)',
          transition: `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            padding: '0 24px',
            paddingTop: 'calc(48px + env(safe-area-inset-top, 0px))',
            paddingBottom: 'calc(90px + env(safe-area-inset-bottom, 0px))',
            perspective: '1200px',
            perspectiveOrigin: '50% 45%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Progress dots */}
          <div
            style={{
              marginBottom: 20,
              paddingLeft: 4,
              transform: 'translateZ(20px)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: activeSlide === i ? 24 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: activeSlide >= i ? AMBER : N[200],
                    transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Slides */}
          <div
            style={{
              position: 'relative',
              minHeight: 220,
              transformStyle: 'preserve-3d',
            }}
          >
            {SLIDES.map((sl, i) => {
              const act = activeSlide === i;
              const past = activeSlide > i;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translateZ(${act ? 45 : past ? -10 : 20}px) rotateX(${
                      act ? 0.8 : past ? -2 : 2
                    }deg) scale(${act ? 1 : 0.88})`,
                    opacity: act ? 1 : 0,
                    transition: 'all 0.65s cubic-bezier(0.34,1.56,0.64,1)',
                    pointerEvents: act ? 'auto' : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
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
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: 8,
                          background: N[100],
                          border: '1px solid rgba(0,0,0,0.06)',
                          marginBottom: 16,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: N[600],
                            letterSpacing: '0.02em',
                          }}
                        >
                          {sl.label}
                        </span>
                      </div>
                    </div>

                    {sl.number && (
                      <div
                        style={{
                          transform: `translateZ(${act ? 40 : 20}px) scale(${act ? 1 : 0.88})`,
                          transformStyle: 'preserve-3d',
                          transition:
                            'transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          opacity: act ? 1 : 0,
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            fontSize: '4.5rem',
                            lineHeight: 1.05,
                            letterSpacing: '-0.03em',
                            color: N[950],
                          }}
                        >
                          {sl.number}
                          {sl.suffix && (
                            <span
                              style={{
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 600,
                                fontSize: '2rem',
                                color: N[800],
                                marginLeft: 4,
                              }}
                            >
                              {sl.suffix}
                            </span>
                          )}
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        transform: `translateZ(8px) translateY(${act ? 0 : 5}px)`,
                        transformStyle: 'preserve-3d',
                        opacity: act ? 1 : 0,
                        transition:
                          'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
                        marginTop: sl.number ? 8 : 0,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: N[600],
                          letterSpacing: '0.015em',
                          margin: 0,
                        }}
                      >
                        {sl.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 'calc(28px + env(safe-area-inset-bottom, 0px))',
            right: 24,
            opacity: bridgeDone ? 1 : 0,
            transform: `scale(${bridgeDone ? 1 : 0.6})`,
            transition:
              'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
            pointerEvents: bridgeDone ? 'auto' : 'none',
          }}
        >
          <button
            type="button"
            onClick={advance}
            aria-label="Continue to next step"
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#F9F9F9',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.5 3.5L12 9L6.5 14.5"
                stroke={N[800]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
