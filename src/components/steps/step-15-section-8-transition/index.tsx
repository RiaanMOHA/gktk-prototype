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
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const SERVICES = [
  'Property secretary',
  'Medical navigation',
  'Education support',
  'Admin support',
  'Mental wellness',
  'Cultural program',
];

const HEADING = 'The investment case.';

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function Step15Section8Transition({
  isActive,
  onComplete,
}: StepProps) {
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const ledgerRuleRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  const [showNext, setShowNext] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const rowSnap = rowRefs;
    const dotSnap = dotRefs;
    const ruleSnap = ledgerRuleRef;
    const hSnap = headingRef;
    const underSnap = underlineRef;

    let cancelled = false;
    const run = async () => {
      const rows = rowSnap.current.filter(
        (e): e is HTMLDivElement => Boolean(e)
      );
      const dots = dotSnap.current.filter(
        (e): e is HTMLSpanElement => Boolean(e)
      );
      const rule = ruleSnap.current;
      const h = hSnap.current;
      const under = underSnap.current;

      if (reduced) {
        rows.forEach((el) => {
          el.style.opacity = '1';
        });
        if (h) h.style.opacity = '1';
        if (under) under.style.transform = 'scaleX(1)';
        if (!cancelled) setShowNext(true);
        return;
      }

      // 1. rows fade and slide in
      rows.forEach((el, i) => {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 320, delay: i * 80, easing: EASE.smooth, fill: 'forwards' }
        );
      });
      await wait(320 + (rows.length - 1) * 80 + 60);
      if (cancelled) return;

      // 2. amber tally rule draws beneath rows (within row text bounds)
      if (rule) {
        rule.animate(
          [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
          { duration: 480, easing: EASE.smooth, fill: 'forwards' }
        );
      }
      await wait(420);
      if (cancelled) return;

      // 3. dots pulse and settle
      dots.forEach((d, i) => {
        d.animate(
          [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.6)', opacity: 1, offset: 0.5 },
            { transform: 'scale(1)', opacity: 1 },
          ],
          { duration: 420, delay: i * 40, easing: EASE.spring, fill: 'forwards' }
        );
      });
      await wait(420 + (dots.length - 1) * 40);
      if (cancelled) return;

      // 4. hold — rows readable
      await wait(1800);
      if (cancelled) return;

      // 5. fade ledger out (slower than the entrance so the loss is gentle)
      rows.forEach((el) =>
        el.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 520, easing: EASE.smooth, fill: 'forwards' }
        )
      );
      if (rule)
        rule.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 520, easing: EASE.smooth, fill: 'forwards' }
        );
      await wait(440);
      if (cancelled) return;

      // 6. heading fades in, underline draws (underline width = heading text width)
      if (h) {
        try {
          await h.animate(
            [
              { opacity: 0, transform: 'translateY(8px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 480, easing: EASE.smooth, fill: 'forwards' }
          ).finished;
        } catch {
          /* cancelled */
        }
      }
      if (cancelled) return;
      if (under) {
        under.animate(
          [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
          { duration: 520, easing: EASE.smooth, fill: 'forwards' }
        );
      }
      await wait(520);
      if (cancelled) return;
      setShowNext(true);
    };
    run();

    return () => {
      cancelled = true;
      const rows = rowSnap.current.filter(
        (e): e is HTMLDivElement => Boolean(e)
      );
      const dots = dotSnap.current.filter(
        (e): e is HTMLSpanElement => Boolean(e)
      );
      [...rows, ...dots, ruleSnap.current, hSnap.current, underSnap.current].forEach(
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
        transition: `opacity 350ms ${EASE.smooth}, transform 350ms ${EASE.smooth}`,
      }}
    >
      {/* centred phone-width column so the prototype's absolute positions survive on wider viewports */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 393,
        }}
      >
        {/* ledger rows */}
        <div
          style={{
            position: 'absolute',
            top: 'calc(120px + env(safe-area-inset-top, 0px))',
            left: 32,
            right: 32,
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                opacity: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: C.n800,
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>{s}</span>
              <span
                aria-hidden
                style={{
                  flex: 1,
                  height: 1,
                  background:
                    'repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 6px)',
                }}
              />
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: C.amber,
                  flex: 'none',
                }}
              />
            </div>
          ))}
        </div>

        {/* amber tally rule — same horizontal bounds as the rows */}
        <div
          ref={ledgerRuleRef}
          style={{
            position: 'absolute',
            top: 'calc(470px + env(safe-area-inset-top, 0px))',
            left: 32,
            right: 32,
            height: 2,
            background: C.amber,
            borderRadius: 1,
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            zIndex: 6,
          }}
        />

        {/* heading + underline; inline-flex wrapper keeps underline width = text width */}
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
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <h1
              ref={headingRef}
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 28,
                lineHeight: 1.15,
                color: C.n950,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                margin: 0,
                opacity: 0,
                textAlign: 'left',
              }}
            >
              {HEADING}
            </h1>
            <div
              ref={underlineRef}
              style={{
                width: '100%',
                height: 2,
                background: C.amber,
                borderRadius: 1,
                marginTop: 8,
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
              }}
            />
          </div>
        </div>
      </div>

      <NextButton onClick={advance} visible={showNext && !exiting} />
    </div>
  );
}
