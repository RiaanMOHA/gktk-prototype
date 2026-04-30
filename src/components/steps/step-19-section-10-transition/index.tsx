'use client';

import { useEffect, useRef } from 'react';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  n950: '#25272C',
  n600: '#5B616E',
};

const PANEL_LEVEL_1 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
} as const;

const EASE = {
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

const FAQ_GHOST = [
  'What if TSMC slows down or pulls out?',
  'JPY volatility and rising rates?',
  'Construction over budget or delayed?',
  'How is GK-TK structure tax-efficient?',
  'What stops major hotel chains?',
  'What governance rights do TK investors have?',
];

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CARD_DURATION_MS = 600;
const CARD_STAGGER_MS = 100;
const TRAILING_BUFFER_MS = 250;

export default function Step19Section10Transition({
  isActive,
  onComplete,
}: StepProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!isActive) return;
    const label = labelRef.current;
    const cards = cardRefs.current;
    let cancelled = false;
    let advanceTimer: ReturnType<typeof setTimeout> | null = null;

    const run = async () => {
      if (reducedMotion()) {
        if (label) label.style.opacity = '0';
        cards.forEach((card) => {
          if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-140px)';
          }
        });
        advanceTimer = setTimeout(() => {
          if (!cancelled) onComplete();
        }, 200);
        return;
      }

      if (label) {
        label.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 300, easing: EASE.gentle, fill: 'forwards' }
        );
      }
      await wait(200);
      if (cancelled) return;

      for (let i = FAQ_GHOST.length - 1; i >= 0; i--) {
        const card = cards[i];
        if (card) {
          card.animate(
            [
              { opacity: 1, transform: 'translateY(0)' },
              { opacity: 0.6, transform: 'translateY(-30px)', offset: 0.4 },
              { opacity: 0.2, transform: 'translateY(-80px)', offset: 0.75 },
              { opacity: 0, transform: 'translateY(-140px)' },
            ],
            { duration: CARD_DURATION_MS, easing: EASE.gentle, fill: 'forwards' }
          );
        }
        if (i > 0) await wait(CARD_STAGGER_MS);
      }

      await wait(CARD_DURATION_MS + TRAILING_BUFFER_MS);
      if (cancelled) return;

      onComplete();
    };
    run();

    return () => {
      cancelled = true;
      if (advanceTimer) clearTimeout(advanceTimer);
      [label, ...cards].forEach((node) => {
        node?.getAnimations().forEach((a) => a.cancel());
      });
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 393,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding:
                'calc(64px + env(safe-area-inset-top, 0px)) 20px calc(56px + env(safe-area-inset-bottom, 0px))',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              ref={labelRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 12,
                color: C.n600,
                marginBottom: 12,
                letterSpacing: '0.01em',
              }}
            >
              Risk factors
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {FAQ_GHOST.map((q, i) => (
                <div
                  key={q}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{
                    ...PANEL_LEVEL_1,
                    borderRadius: 20,
                    padding: '12px 14px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-body)',
                        fontWeight: 500,
                        fontSize: 13,
                        lineHeight: 1.35,
                        color: C.n950,
                      }}
                    >
                      {q}
                    </div>
                    <div
                      aria-hidden
                      style={{
                        fontSize: 14,
                        color: C.n600,
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      ▾
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
