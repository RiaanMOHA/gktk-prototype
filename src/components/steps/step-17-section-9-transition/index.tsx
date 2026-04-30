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
  n600: '#5B616E',
  n100: '#EDEEF1',
  disabled: '#8E8F8F',
};

const PANEL_LEVEL_1 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
} as const;

const PANEL_LEVEL_2 = {
  background: C.bg,
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
} as const;

const EASE = {
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  settle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

// Default step-16 state: normal scenario, 5-year hold.
const SNAPSHOT = {
  ip: 10.6,
  ipo: 8.66,
  ep: 1.62,
  epo: 1.49,
  rp: 1616285098,
  rpo: 1490439681,
};

const fmtIrr = (v: number) => `${v.toFixed(2)}%`;
const fmtEm = (v: number) => `${v.toFixed(2)}x`;
const fmtYen = (v: number) => `¥${(v / 1e9).toFixed(2)}B`;

const RESOLVE_TEXT =
  'Every investment carries risk. Here is how this one is structured to mitigate them.';

const EXIT_DELAY_MS = 150;
const EXIT_DURATION_MS = 350;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function Step16Snapshot() {
  const heroBarPct = Math.min((SNAPSHOT.ip / 20) * 100, 100);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <div
        style={{
          width: '100%',
          maxWidth: 393,
          padding:
            'calc(70px + env(safe-area-inset-top, 0px)) 20px calc(40px + env(safe-area-inset-bottom, 0px))',
          boxSizing: 'border-box',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 18,
            color: C.n950,
            letterSpacing: '-0.01em',
            margin: 0,
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Return projections
        </h2>

        <div style={{ marginBottom: 14, display: 'flex', gap: 6 }}>
          {(['Bull', 'Normal', 'Bear'] as const).map((label) => {
            const active = label === 'Normal';
            return (
              <span
                key={label}
                style={{
                  padding: '8px 20px',
                  borderRadius: 12,
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  background: active ? C.bg : 'transparent',
                  color: active ? C.n950 : C.disabled,
                  boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {label}
              </span>
            );
          })}
        </div>

        <div style={{ marginBottom: 24, padding: '0 4px' }}>
          <div style={{ position: 'relative', height: 40 }}>
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 0,
                right: 0,
                height: 4,
                borderRadius: 2,
                background: 'rgba(0,0,0,0.06)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 16,
                left: 0,
                width: '66.6667%',
                height: 4,
                borderRadius: 2,
                background:
                  'linear-gradient(90deg, #FBB931 0%, rgba(251,185,49,0.6) 100%)',
                boxShadow: '0 0 6px rgba(251,185,49,0.2)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 6,
                left: '66.6667%',
                transform: 'translateX(-50%)',
                width: 24,
                height: 24,
                borderRadius: 12,
                background: C.amber,
                border: '3px solid #FEFEFE',
                boxShadow:
                  '0 2px 10px rgba(251,185,49,0.4), 0 1px 3px rgba(0,0,0,0.1)',
              }}
            />
            {[3, 4, 5, 6].map((y, i) => {
              const active = y === 5;
              return (
                <div
                  key={y}
                  style={{
                    position: 'absolute',
                    top: 30,
                    left: `${(i / 3) * 100}%`,
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    color: active ? C.n950 : C.disabled,
                  }}
                >
                  {y}Y
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            ...PANEL_LEVEL_2,
            borderRadius: 24,
            padding: '28px 24px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: C.n600,
              marginBottom: 8,
            }}
          >
            Estimated IRR (pre-tax)
          </div>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 56,
              color: C.n950,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {fmtIrr(SNAPSHOT.ip)}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: C.n600,
              marginTop: 8,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {fmtIrr(SNAPSHOT.ipo)} post-tax
          </div>
          <div
            style={{
              marginTop: 18,
              height: 3,
              borderRadius: 2,
              width: `${heroBarPct}%`,
              background:
                'linear-gradient(90deg, #FBB931 0%, rgba(251,185,49,0.3) 100%)',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div
            style={{
              ...PANEL_LEVEL_1,
              flex: 1,
              borderRadius: 12,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.n600,
                marginBottom: 4,
              }}
            >
              Equity multiple
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 20,
                color: C.n950,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fmtEm(SNAPSHOT.ep)}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.disabled,
                marginTop: 3,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fmtEm(SNAPSHOT.epo)} post-tax
            </div>
          </div>
          <div
            style={{
              ...PANEL_LEVEL_1,
              flex: 1,
              borderRadius: 12,
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.n600,
                marginBottom: 4,
              }}
            >
              Total return
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: 20,
                color: C.n950,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fmtYen(SNAPSHOT.rp)}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: C.disabled,
                marginTop: 3,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fmtYen(SNAPSHOT.rpo)} post-tax
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: C.n600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ display: 'inline-block', fontSize: 8 }}>▶</span>
            Fund terms and structure
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Step17Section9Transition({
  isActive,
  onComplete,
}: StepProps) {
  const snapshotRef = useRef<HTMLDivElement>(null);
  const topBandRef = useRef<HTMLDivElement>(null);
  const bottomBandRef = useRef<HTMLDivElement>(null);
  const resolveRef = useRef<HTMLDivElement>(null);

  const [showNext, setShowNext] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const top = topBandRef.current;
    const bottom = bottomBandRef.current;
    const snap = snapshotRef.current;
    const resolve = resolveRef.current;

    let cancelled = false;

    const run = async () => {
      if (reducedMotion()) {
        if (top) top.style.transform = 'translateY(-102%)';
        if (bottom) bottom.style.transform = 'translateY(102%)';
        if (snap) snap.style.opacity = '0';
        if (resolve) {
          resolve.style.opacity = '1';
          resolve.style.transform = 'scale(1)';
        }
        if (!cancelled) setShowNext(true);
        return;
      }

      // 1. bands close in from top and bottom
      const closeTop = top
        ? top.animate(
            [
              { transform: 'translateY(-100%)' },
              { transform: 'translateY(0)' },
            ],
            { duration: 750, easing: EASE.gentle, fill: 'forwards' }
          )
        : null;
      const closeBottom = bottom
        ? bottom.animate(
            [
              { transform: 'translateY(100%)' },
              { transform: 'translateY(0)' },
            ],
            { duration: 750, easing: EASE.gentle, fill: 'forwards' }
          )
        : null;
      try {
        await Promise.all(
          [closeTop, closeBottom].filter(Boolean).map((a) => a!.finished)
        );
      } catch {
        return;
      }
      if (cancelled) return;

      if (snap) snap.style.opacity = '0';

      // 2. amber-edge pulse on both bands
      if (top) {
        top.animate(
          [
            { boxShadow: '0 2px 0 rgba(251,185,49,0.6), 0 2px 16px rgba(251,185,49,0.2)' },
            { boxShadow: '0 2px 0 rgba(251,185,49,0.8), 0 2px 36px rgba(251,185,49,0.45)' },
            { boxShadow: '0 2px 0 rgba(251,185,49,0.6), 0 2px 16px rgba(251,185,49,0.2)' },
          ],
          { duration: 500, easing: EASE.smooth }
        );
      }
      if (bottom) {
        bottom.animate(
          [
            { boxShadow: '0 -2px 0 rgba(251,185,49,0.6), 0 -2px 16px rgba(251,185,49,0.2)' },
            { boxShadow: '0 -2px 0 rgba(251,185,49,0.8), 0 -2px 36px rgba(251,185,49,0.45)' },
            { boxShadow: '0 -2px 0 rgba(251,185,49,0.6), 0 -2px 16px rgba(251,185,49,0.2)' },
          ],
          { duration: 500, easing: EASE.smooth }
        );
      }
      await wait(550);
      if (cancelled) return;

      // 3. bands open outward
      const openTop = top
        ? top.animate(
            [{ transform: 'translateY(0)' }, { transform: 'translateY(-102%)' }],
            { duration: 650, easing: EASE.gentle, fill: 'forwards' }
          )
        : null;
      const openBottom = bottom
        ? bottom.animate(
            [{ transform: 'translateY(0)' }, { transform: 'translateY(102%)' }],
            { duration: 650, easing: EASE.gentle, fill: 'forwards' }
          )
        : null;

      // 4. resolve panel reveal, 120ms into the open
      await wait(120);
      if (cancelled) return;
      if (resolve) {
        resolve.animate(
          [
            { opacity: 0, transform: 'scale(0.97)' },
            { opacity: 1, transform: 'scale(1)' },
          ],
          { duration: 600, easing: EASE.settle, fill: 'forwards' }
        );
      }

      try {
        await Promise.all(
          [openTop, openBottom].filter(Boolean).map((a) => a!.finished)
        );
      } catch {
        return;
      }
      if (cancelled) return;

      await wait(400);
      if (cancelled) return;
      setShowNext(true);
    };

    run();

    return () => {
      cancelled = true;
      [top, bottom, snap, resolve].forEach((node) => {
        node?.getAnimations().forEach((a) => a.cancel());
      });
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

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    []
  );

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
        overflow: 'hidden',
      }}
    >
      <div ref={snapshotRef} style={{ position: 'absolute', inset: 0 }}>
        <Step16Snapshot />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 20,
          right: 20,
          transform: 'translateY(-50%)',
          zIndex: 6,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          ref={resolveRef}
          style={{
            ...PANEL_LEVEL_2,
            borderRadius: 28,
            padding: '32px 24px',
            width: '100%',
            maxWidth: 353,
            opacity: 0,
            transform: 'scale(0.97)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              lineHeight: 1.65,
              color: C.n800,
              margin: 0,
              textAlign: 'left',
            }}
          >
            {RESOLVE_TEXT}
          </p>
        </div>
      </div>

      <div
        ref={topBandRef}
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `linear-gradient(180deg, ${C.n100} 0%, ${C.bg} 80%)`,
          zIndex: 12,
          transform: 'translateY(-100%)',
          boxShadow:
            '0 2px 0 rgba(251,185,49,0.6), 0 2px 16px rgba(251,185,49,0.2)',
          willChange: 'transform, box-shadow',
        }}
      />
      <div
        ref={bottomBandRef}
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `linear-gradient(0deg, ${C.n100} 0%, ${C.bg} 80%)`,
          zIndex: 12,
          transform: 'translateY(100%)',
          boxShadow:
            '0 -2px 0 rgba(251,185,49,0.6), 0 -2px 16px rgba(251,185,49,0.2)',
          willChange: 'transform, box-shadow',
        }}
      />

      <NextButton onClick={advance} visible={showNext && !exiting} />
    </div>
  );
}
