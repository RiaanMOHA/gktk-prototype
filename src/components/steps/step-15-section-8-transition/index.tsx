'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import NextButton from '@/components/shared/NextButton';

interface StepProps {
  isActive: boolean;
  onComplete: () => void;
}

const C = {
  bg: '#F9F9F9',
  amber: '#FBB931',
  n950: '#25272C',
  n800: '#40444C',
};

const EASE = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  settle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const ELEMENTS = [
  'Property secretary',
  'Medical navigation',
  'Education support',
  'Admin support',
  'Mental wellness',
  'Cultural program',
];

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Step15Section8Transition({
  isActive,
  onComplete,
}: StepProps) {
  const elemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const datumRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [showNext, setShowNext] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elemRefsSnapshot = elemRefs;
    const datumRefSnapshot = datumRef;
    const headingRefSnapshot = headingRef;

    let cancelled = false;
    const run = async () => {
      const elems = elemRefsSnapshot.current.filter(
        (e): e is HTMLDivElement => Boolean(e)
      );
      const datum = datumRefSnapshot.current;
      const h = headingRefSnapshot.current;

      if (reduced) {
        elems.forEach((el) => {
          el.style.opacity = '0';
        });
        if (h) h.style.opacity = '1';
        if (!cancelled) setShowNext(true);
        return;
      }

      // Beat 1: snap to grid
      elems.forEach((el, i) => {
        el.animate(
          [
            {
              transform: 'translateX(0) translateY(0) scale(1)',
              borderRadius: '12px',
            },
            {
              transform: `translateX(${(i % 3 - 1) * 60}px) translateY(${
                Math.floor(i / 3) * 50 - 25
              }px) scale(0.7)`,
              borderRadius: '4px',
            },
          ],
          {
            duration: 400,
            delay: i * 60,
            easing: EASE.smooth,
            fill: 'forwards',
          }
        );
      });
      await wait(600);
      if (cancelled) return;

      // Beat 2: compress to center, then datum point pulse
      elems.forEach((el) => {
        el.animate(
          [
            { opacity: 1 },
            {
              transform: 'translateX(0) translateY(0) scale(0.1)',
              opacity: 0,
            },
          ],
          { duration: 350, easing: EASE.smooth, fill: 'forwards' }
        );
      });
      if (datum) {
        try {
          await datum.animate(
            [
              { opacity: 0, transform: 'translate(-50%,-50%) scale(0)' },
              { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
            ],
            { duration: 300, easing: EASE.spring, fill: 'forwards' }
          ).finished;
        } catch {
          /* cancelled */
        }
        if (cancelled) return;
        await wait(200);
        if (cancelled) return;
        datum.animate(
          [
            { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%,-50%) scale(3)' },
          ],
          { duration: 400, easing: EASE.smooth, fill: 'forwards' }
        );
      }
      await wait(400);
      if (cancelled) return;

      // Beat 3: resolve heading
      if (h) {
        try {
          await h.animate(
            [
              { opacity: 0, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 500, easing: EASE.settle, fill: 'forwards' }
          ).finished;
        } catch {
          /* cancelled */
        }
      }
      if (cancelled) return;
      await wait(600);
      if (cancelled) return;
      setShowNext(true);
    };
    run();

    return () => {
      cancelled = true;
      const elems = elemRefsSnapshot.current.filter(
        (e): e is HTMLDivElement => Boolean(e)
      );
      [...elems, datumRefSnapshot.current, headingRefSnapshot.current].forEach(
        (node) => {
          node?.getAnimations().forEach((a) => a.cancel());
        }
      );
    };
  }, [isActive]);

  const advance = useCallback(() => {
    if (exiting) return;
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(() => setExiting(true), EXIT_DELAY_MS);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(() => onComplete(), EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, onComplete]);

  useEffect(() => {
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: C.bg,
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(0.97)' : 'scale(1)',
        transition: `opacity 350ms ${EASE.settle}, transform 350ms ${EASE.settle}`,
      }}
    >
      {/* software ghost elements */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          paddingTop: 'calc(80px + env(safe-area-inset-top, 0px))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {ELEMENTS.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              elemRefs.current[i] = el;
            }}
            style={{
              background: C.bg,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              borderRadius: 12,
              padding: '10px 20px',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: C.n800,
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {/* datum point */}
      <div
        ref={datumRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%) scale(0)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: C.amber,
          zIndex: 10,
          opacity: 0,
        }}
      />

      {/* resolve heading */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <h1
          ref={headingRef}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.15,
            color: C.n950,
            letterSpacing: '-0.02em',
            opacity: 0,
            textAlign: 'left',
            maxWidth: 280,
            margin: 0,
          }}
        >
          The investment case.
        </h1>
      </div>

      <NextButton onClick={advance} visible={showNext && !exiting} />
    </div>
  );
}
