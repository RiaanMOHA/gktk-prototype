'use client';

import { useEffect, useRef } from 'react';
import { usePropertyMapHost } from '../../shared/PropertyMapHost';

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
  n400: '#8B8F98',
  n100: '#EDEEF1',
};

const NAV_BOTTOM_PAD = 100;

const GAPS = [
  'Medical navigation',
  'Mental health support',
  'Education integration',
  'Spouse career support',
  'Operational friction',
];

const TILT_DURATION_MS = 2200;
const TILT_BREATH_MS = 200;
// The iframe fires gktk-map-ready at the same instant the sheet
// starts its 520ms slide-up. Hold step-11 opaque for one full
// slide-up + a small buffer so step-12 always mounts onto the
// settled end-state — never onto a partial entrance.
const SHEET_SETTLE_MS = 600;

const animate = (
  el: HTMLElement | null,
  kf: Keyframe[],
  opts: KeyframeAnimationOptions
) => {
  if (!el) return Promise.resolve();
  return el.animate(kf, { fill: 'forwards', ...opts }).finished;
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const READY_TIMEOUT_MS = 4000;

type Host = ReturnType<typeof usePropertyMapHost>;

const waitForMapReady = (host: Host, isCancelled: () => boolean) =>
  new Promise<void>((resolve) => {
    if (!host || host.isReady) {
      resolve();
      return;
    }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      unsub();
      resolve();
    };
    const timer = setTimeout(finish, READY_TIMEOUT_MS);
    const unsub = host.subscribe((event) => {
      if (event.type === 'ready' || isCancelled()) finish();
    });
  });

const tiltKeyframes: Keyframe[] = [
  { transform: 'perspective(600px) rotateX(0deg) translateY(0px)', opacity: 1, offset: 0 },
  { transform: 'perspective(600px) rotateX(1.5deg) translateY(2px)', opacity: 1, offset: 0.06 },
  { transform: 'perspective(600px) rotateX(3deg) translateY(5px)', opacity: 1, offset: 0.12 },
  { transform: 'perspective(600px) rotateX(5.5deg) translateY(10px)', opacity: 1, offset: 0.18 },
  { transform: 'perspective(600px) rotateX(8deg) translateY(17px)', opacity: 1, offset: 0.24 },
  { transform: 'perspective(600px) rotateX(11.5deg) translateY(28px)', opacity: 1, offset: 0.30 },
  { transform: 'perspective(600px) rotateX(15deg) translateY(42px)', opacity: 0.98, offset: 0.36 },
  { transform: 'perspective(600px) rotateX(20deg) translateY(62px)', opacity: 0.95, offset: 0.42 },
  { transform: 'perspective(600px) rotateX(26deg) translateY(90px)', opacity: 0.90, offset: 0.48 },
  { transform: 'perspective(600px) rotateX(33deg) translateY(130px)', opacity: 0.82, offset: 0.54 },
  { transform: 'perspective(600px) rotateX(40deg) translateY(180px)', opacity: 0.72, offset: 0.60 },
  { transform: 'perspective(600px) rotateX(47deg) translateY(240px)', opacity: 0.58, offset: 0.66 },
  { transform: 'perspective(600px) rotateX(54deg) translateY(310px)', opacity: 0.42, offset: 0.72 },
  { transform: 'perspective(600px) rotateX(60deg) translateY(380px)', opacity: 0.28, offset: 0.78 },
  { transform: 'perspective(600px) rotateX(65deg) translateY(450px)', opacity: 0.16, offset: 0.84 },
  { transform: 'perspective(600px) rotateX(70deg) translateY(520px)', opacity: 0.08, offset: 0.90 },
  { transform: 'perspective(600px) rotateX(73deg) translateY(560px)', opacity: 0.03, offset: 0.95 },
  { transform: 'perspective(600px) rotateX(75deg) translateY(600px)', opacity: 0, offset: 1 },
];

export default function Step11Section6Transition({ isActive, onComplete }: StepProps) {
  const propertyMapHost = usePropertyMapHost();

  const tiltRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    (async () => {
      if (!reduced) {
        await animate(tiltRef.current, tiltKeyframes, {
          duration: TILT_DURATION_MS,
          easing: 'linear',
        });
      } else if (tiltRef.current) {
        tiltRef.current.style.opacity = '0';
      }
      if (cancelled) return;
      await wait(TILT_BREATH_MS);
      if (cancelled) return;
      // Hold the opaque white wrapper until the property map iframe
      // has fully framed itself AND its sheet has slid up. Then snap
      // straight to step-12 (no exit fade) so the user never sees
      // the iframe through a partial reveal — same hand-off pattern
      // as step-5 → step-6.
      await waitForMapReady(propertyMapHost, () => cancelled);
      if (cancelled) return;
      await wait(SHEET_SETTLE_MS);
      if (cancelled) return;
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isActive, propertyMapHost, onComplete]);

  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: C.bg,
        overflow: 'hidden',
      }}
    >
      {/* Tilting bridge content. Recap of the investment + jobs figures
          peeling away from camera as we hand off to the property map. */}
      <div
        ref={tiltRef}
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '50% 0%',
          willChange: 'transform, opacity',
        }}
      >
        <BridgeContent />
      </div>
    </div>
  );
}

/* Mirrors the final on-screen state of step 10 (beat 3, solved=true):
   the "MoreHarvest residence" image, the "MoreHarvest solves all five."
   subhead, and the five gap rows with amber dots. This is what the
   user sees the moment they tap forward out of step 10, and it is
   what tilts away here on step 11. */
function BridgeContent() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: `calc(56px + env(safe-area-inset-top, 0px)) 24px calc(${NAV_BOTTOM_PAD}px + env(safe-area-inset-bottom, 0px))`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <ResidenceImage />
      </div>

      <div style={{ marginBottom: 16, minHeight: 28 }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 600,
            color: C.n950,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}
        >
          MoreHarvest solves all five.
        </p>
      </div>

      <div style={{ flex: 1 }}>
        {GAPS.map((g, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '9px 0',
              borderBottom: i < GAPS.length - 1 ? `1px solid ${C.n100}` : 'none',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: C.amber,
                flexShrink: 0,
                marginLeft: 5,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 16,
                fontWeight: 600,
                color: C.n950,
                marginLeft: 17,
              }}
            >
              {g}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResidenceImage() {
  return (
    <div
      style={{
        width: '100%',
        height: 120,
        borderRadius: 12,
        background: C.n100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 500,
          color: C.n400,
          letterSpacing: '0.01em',
        }}
      >
        MoreHarvest residence
      </span>
    </div>
  );
}
